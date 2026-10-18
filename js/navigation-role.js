const teacherLinks = [...document.querySelectorAll('.teacher-nav-item')];
teacherLinks.forEach(link => { link.hidden = true; link.setAttribute('aria-hidden', 'true'); });
const configPath = './firebase-config.js';
import(configPath).then(() => {
  if (!window.FIREBASE_ENABLED) return;
  const clientPath = './firebase-client.js';
  return import(clientPath).then(async ({ auth, db }) => {
    const { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js');
    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js');
    onAuthStateChanged(auth, async user => {
      let isTeacher = false;
      if (user) {
        try { const snap = await getDoc(doc(db, 'users', user.uid)); isTeacher = snap.exists() && snap.data().role === 'teacher'; }
        catch (error) { console.warn('Не вдалося перевірити роль користувача.', error); }
      }
      teacherLinks.forEach(link => { link.hidden = !isTeacher; link.setAttribute('aria-hidden', String(!isTeacher)); });
    });
  });
}).catch(error => console.warn('Не вдалося перевірити доступ до кабінету вчителя.', error));
