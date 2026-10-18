/* Хмарний профіль є джерелом істини для авторизованого учня.
   Цей модуль більше НЕ завантажує локальні coins/ledger назад у Firestore. */
import { auth, db } from './firebase-client.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';
const KEY = 'learning-lab-profile-v2';
const LEGACY = 'learning-lab-completed';
const EMPTY = { coins: 0, completed: [], perfect: [], achievements: [], lessonRewards: {}, lessonResults: {}, purchases: [], ledger: [] };
let lastUid = null;
function writeLocal(profile) {
  const safe = { ...EMPTY, ...(profile || {}) };
  localStorage.setItem(KEY, JSON.stringify(safe));
  localStorage.setItem(LEGACY, JSON.stringify(Array.isArray(safe.completed) ? safe.completed : []));
  window.dispatchEvent(new CustomEvent('learninglab:cloud-restored'));
}
async function restore(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'privateData', 'progress'));
  if (snap.exists() && snap.data().profile && typeof snap.data().profile === 'object') {
    writeLocal(snap.data().profile);
  } else {
    // Старі локальні монети не імпортуємо автоматично: інакше їх можна було б підробити в браузері.
    writeLocal(EMPTY);
  }
  document.documentElement.dataset.cloudSync = 'ok';
}
onAuthStateChanged(auth, async user => {
  if (!user) {
    lastUid = null;
    document.documentElement.dataset.cloudSync = 'signed-out';
    return;
  }
  if (lastUid === user.uid) return;
  lastUid = user.uid;
  try { await restore(user.uid); }
  catch (error) {
    console.error('Не вдалося завантажити хмарний прогрес:', error);
    document.documentElement.dataset.cloudSync = 'error';
  }
});
window.addEventListener('learninglab:cloud-restored', () => {
  if (window.LearningGamification) window.LearningGamification.renderProfile(window.lessonCatalog || []);
});
