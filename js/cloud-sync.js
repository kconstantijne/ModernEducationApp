/* Повна синхронізація студентських даних. Firestore є джерелом істини для авторизованого користувача. */
import { auth, db } from './firebase-client.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

const KEY = 'learning-lab-profile-v2';
const LEGACY = 'learning-lab-completed';
const ACCOUNT_KEY = 'learningLabLocalProfile';
const GOALS_KEY = 'learning-lab-weekly-goals-v1';
const EMPTY = { coins: 0, completed: [], perfect: [], achievements: [], lessonRewards: {}, lessonResults: {}, purchases: [], ledger: [] };
let activeUid = null;
let restoring = false;
let saveTimer = null;
const parse = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key) || 'null'); return value ?? fallback; } catch { return fallback; } };
function writeLocal(data = {}) {
  const profile = { ...EMPTY, ...(data.profile || {}) };
  localStorage.setItem(KEY, JSON.stringify(profile));
  localStorage.setItem(LEGACY, JSON.stringify(Array.isArray(profile.completed) ? profile.completed : []));
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(data.accountProfile || {}));
  localStorage.setItem(GOALS_KEY, JSON.stringify(Array.isArray(data.weeklyGoals) ? data.weeklyGoals : []));
  window.dispatchEvent(new CustomEvent('learninglab:cloud-restored'));
  window.dispatchEvent(new Event('learninglab:progress-changed'));
}
function clearStudentData() {
  // Не залишаємо приватні дані попереднього користувача доступними в гостьовому режимі.
  [KEY, LEGACY, ACCOUNT_KEY, GOALS_KEY].forEach(key => localStorage.removeItem(key));
  window.dispatchEvent(new CustomEvent('learninglab:cloud-restored'));
  window.dispatchEvent(new Event('learninglab:progress-changed'));
}
async function restore(uid) {
  restoring = true;
  try {
    const snap = await getDoc(doc(db, 'users', uid, 'privateData', 'progress'));
    if (snap.exists()) writeLocal(snap.data());
    else writeLocal({ profile: EMPTY, accountProfile: {}, weeklyGoals: [] });
    document.documentElement.dataset.cloudSync = 'ok';
  } finally { restoring = false; }
  // Save any derived profile updates (for example newly evaluated achievements) after restore.
  await persist();
}
async function persist() {
  if (!activeUid || restoring || auth.currentUser?.uid !== activeUid) return;
  const uid = activeUid;
  const profile = { ...EMPTY, ...(parse(KEY, {}) || {}) };
  const accountProfile = parse(ACCOUNT_KEY, {}) || {};
  const weeklyGoals = parse(GOALS_KEY, []);
  try {
    await setDoc(doc(db, 'users', uid, 'privateData', 'progress'), {
      profile, accountProfile, weeklyGoals: Array.isArray(weeklyGoals) ? weeklyGoals : [],
      updatedAt: serverTimestamp(), syncVersion: 2, rewardSource: 'client'
    }, { merge: true });
    document.documentElement.dataset.cloudSync = 'ok';
  } catch (error) {
    console.error('Не вдалося синхронізувати дані учня:', error);
    document.documentElement.dataset.cloudSync = 'error';
    window.dispatchEvent(new CustomEvent('learninglab:sync-error', { detail: error }));
  }
}
function queueSave() {
  if (!activeUid || restoring) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => { persist(); }, 250);
}
onAuthStateChanged(auth, async user => {
  clearTimeout(saveTimer);
  if (!user) {
    activeUid = null;
    document.documentElement.dataset.cloudSync = 'signed-out';
    clearStudentData();
    return;
  }
  if (activeUid === user.uid && document.documentElement.dataset.cloudSync === 'ok') return;
  activeUid = user.uid;
  document.documentElement.dataset.cloudSync = 'loading';
  try { await restore(user.uid); }
  catch (error) {
    console.error('Не вдалося завантажити хмарні дані учня:', error);
    document.documentElement.dataset.cloudSync = 'error';
  }
});
window.addEventListener('learninglab:progress-changed', queueSave);
window.addEventListener('learninglab:cloud-restored', () => {
  if (window.LearningGamification) window.LearningGamification.renderProfile(window.lessonCatalog || []);
});
