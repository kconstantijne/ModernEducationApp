import { auth, db } from './firebase-client.js';
import { onAuthStateChanged, updateProfile, signOut } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

const $ = id => document.getElementById(id);
const status = $('accountStatus');
const nameInput = $('accountNameInput');
const loginButton = $('loginPromptButton');
const saveButton = $('saveProfileButton');
const logoutButton = $('logoutAccountButton');
const feedback = $('profileAccountFeedback');
const photoInput = $('accountPhotoInput');
const avatar = $('accountAvatarPreview');
const fallback = $('accountAvatarFallback');
let currentUser = null;
let firestoreProfile = {};

function showPhoto(url) {
  if (!avatar || !fallback) return;
  if (url) { avatar.src = url; avatar.hidden = false; fallback.hidden = true; }
  else { avatar.removeAttribute('src'); avatar.hidden = true; fallback.hidden = false; }
}
function showStatus(message) { if (status) status.textContent = message; }
function showToast(message, type = 'success') {
  const existing = document.getElementById('profileToast');
  existing?.remove();
  const toast = document.createElement('div');
  toast.id = 'profileToast';
  toast.className = `profile-toast profile-toast-${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `<span class="profile-toast-icon" aria-hidden="true">${type === 'error' ? '!' : '✓'}</span><span>${message}</span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => toast.remove(), 250);
  }, 3500);
}
function localProfile() { try { return JSON.parse(localStorage.getItem('learningLabLocalProfile') || '{}') || {}; } catch { return {}; } }

onAuthStateChanged(auth, async user => {
  currentUser = user;
  if (!user) {
    firestoreProfile = {};
    const local = localProfile();
    if (nameInput) nameInput.value = local.name || '';
    showPhoto(local.photo || '');
    showStatus('Гостьовий режим · дані зберігаються на цьому пристрої');
    if (loginButton) loginButton.hidden = false;
    if (logoutButton) logoutButton.hidden = true;
    if (saveButton) saveButton.textContent = 'Зберегти зміни';
    return;
  }

  let profile = {};
  try {
    const snapshot = await getDoc(doc(db, 'users', user.uid));
    if (snapshot.exists()) profile = snapshot.data() || {};
  } catch (error) { console.warn('Не вдалося завантажити профіль користувача.', error); }
  firestoreProfile = profile;
  const name = user.displayName || profile.displayName || (user.email ? user.email.split('@')[0] : 'Користувач');
  if (nameInput) nameInput.value = name;
  const local = localProfile();
  showPhoto(user.photoURL || profile.photoURL || profile.photoUrl || local.photo || '');
  showStatus(`Ви увійшли як ${name}. Дані профілю синхронізуються з обліковим записом.`);
  if (loginButton) loginButton.hidden = true;
  if (logoutButton) logoutButton.hidden = false;
});


logoutButton?.addEventListener('click', async () => {
  if (!currentUser) return;
  logoutButton.disabled = true;
  if (feedback) feedback.textContent = 'Виходимо з акаунту…';
  try {
    await signOut(auth);
    if (feedback) feedback.textContent = '';
    showToast('Ви вийшли з акаунту.');
  } catch (error) {
    console.error('Не вдалося вийти з акаунту.', error);
    if (feedback) feedback.textContent = '';
    showToast('Не вдалося вийти з акаунту. Спробуй ще раз.', 'error');
  } finally {
    logoutButton.disabled = false;
  }
});

saveButton?.addEventListener('click', async () => {
  const name = (nameInput?.value || '').trim().slice(0, 48);
  if (!name) { if (feedback) feedback.textContent = 'Вкажи ім’я профілю.'; nameInput?.focus(); return; }
  try {
    if (currentUser) {
      await updateProfile(currentUser, { displayName: name });
      await setDoc(doc(db, 'users', currentUser.uid), {
        ...firestoreProfile, uid: currentUser.uid, displayName: name,
        email: currentUser.email || '', updatedAt: serverTimestamp()
      }, { merge: true });
      firestoreProfile = { ...firestoreProfile, displayName: name };
      showStatus(`Ви увійшли як ${name}. Дані профілю синхронізуються з обліковим записом.`);
      if (feedback) feedback.textContent = 'Ім’я профілю оновлено в акаунті.';
    } else {
      const local = localProfile(); local.name = name;
      localStorage.setItem('learningLabLocalProfile', JSON.stringify(local));
      if (feedback) feedback.textContent = `Збережено. Вітаємо, ${name}!`;
    }
  } catch (error) {
    console.error('Не вдалося зберегти ім’я профілю.', error);
    if (feedback) feedback.textContent = 'Не вдалося синхронізувати ім’я. Перевір з’єднання та права доступу Firebase.';
  }
});

photoInput?.addEventListener('change', event => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { if (feedback) feedback.textContent = 'Обери файл зображення.'; return; }
  if (file.size > 2 * 1024 * 1024) { if (feedback) feedback.textContent = 'Фото має бути до 2 МБ.'; event.target.value = ''; return; }
  const reader = new FileReader();
  reader.onload = () => {
    const local = localProfile(); local.photo = String(reader.result || '');
    try {
      localStorage.setItem('learningLabLocalProfile', JSON.stringify(local));
      showPhoto(local.photo);
      if (feedback) feedback.textContent = currentUser ? 'Фото оновлено на цьому пристрої. Фото облікового запису Google залишається без змін.' : 'Фото профілю збережено на цьому пристрої.';
    } catch { if (feedback) feedback.textContent = 'Не вдалося зберегти фото. Спробуй зображення меншого розміру.'; }
  };
  reader.readAsDataURL(file);
});
