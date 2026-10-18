import { auth, db } from './firebase-client.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';
// Fail closed: the teacher navigation is hidden unless the signed-in account has role "teacher".
const links = [...document.querySelectorAll('.teacher-nav-item, a[href*="teacher-dashboard.html"]')];
links.forEach(link => { link.hidden = true; link.setAttribute('aria-hidden', 'true'); });
onAuthStateChanged(auth, async user => {
  if (!user) return;
  try {
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists() && String(snap.data().role || '').toLowerCase() === 'teacher') {
      links.forEach(link => { link.hidden = false; link.removeAttribute('aria-hidden'); });
    }
  } catch (error) { console.warn('Не вдалося перевірити роль учителя.', error); }
});
