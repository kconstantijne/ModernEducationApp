/* Персональний блок головної сторінки. Не змінює наявний каталог, нагороди чи пошук. */
(() => {
  const $ = id => document.getElementById(id);
  const profileKey = 'learning-lab-profile-v2';
  const legacyKey = 'learning-lab-completed';
  const readProfile = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(profileKey) || 'null');
      if (saved && typeof saved === 'object') return { completed: [], coins: 0, ...saved };
    } catch (_) {}
    try { const completed = JSON.parse(localStorage.getItem(legacyKey) || '[]'); return { completed: Array.isArray(completed) ? completed : [], coins: 0 }; }
    catch (_) { return { completed: [], coins: 0 }; }
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(lessons) {
    if (!lessons.length) return;
    const profile = window.LearningGamification?.profile?.() || readProfile();
    const completed = new Set((profile.completed || []).filter(id => lessons.some(l => l.id === id)));
    const percent = Math.round(completed.size / lessons.length * 100);
    const next = lessons.find(l => !completed.has(l.id)) || lessons[0];
    const doneAll = completed.size === lessons.length;
    const subjectLabel = next.subject || (next.category === 'math' ? 'Математика' : next.category === 'informatics' ? 'Інформатика' : 'STEM');
    $('continueSubject').textContent = `${subjectLabel.toLocaleUpperCase('uk')} · ${next.grades?.length ? `КЛАСИ ${next.grades.join(', ')}` : 'НАВЧАЛЬНИЙ УРОК'}`;
    $('continueTitle').textContent = doneAll ? 'Час поглибити свої знання!' : next.title;
    $('continueDescription').textContent = doneAll ? 'Ти завершив усі уроки каталогу. Повтори улюблену тему або спробуй пройти її на вищому рівні.' : (next.description || 'Відкрий тему та зроби наступний крок у навчанні.');
    $('continueLessonLink').href = new URL(next.url, document.baseURI).href;
    $('continueLessonLink').innerHTML = doneAll ? 'Повторити урок <span aria-hidden="true">→</span>' : 'Продовжити навчання <span aria-hidden="true">→</span>';
    $('dashboardProgressText').textContent = `${percent}%`;
    $('dashboardProgressBar').style.width = `${percent}%`;
    $('dashboardGoal').textContent = doneAll ? 'Спробуй покращити результат або обрати новий напрям.' : 'Заверши ще один урок і закріпи нову навичку.';
    $('dashboardGoalStat').textContent = `${completed.size} з ${lessons.length}`;
    const remaining = lessons.length - completed.size;
    $('dashboardReview').textContent = completed.size ? `Уже пройдено ${completed.size}. Повертайся до складних тем і закріплюй результат.` : 'Почни з короткого уроку, а потім перевір, що запам’ятав.';
    $('dashboardRoute').textContent = doneAll ? 'Усі уроки пройдено — час досліджувати теми глибше.' : `Попереду ${remaining} ${remaining === 1 ? 'урок' : remaining >= 2 && remaining <= 4 ? 'уроки' : 'уроків'}. Кожен крок наближає до мети.`;
  }
  async function init() {
    try {
      const response = await fetch(new URL('data/lessons.json', document.baseURI));
      if (!response.ok) return;
      const data = await response.json();
      const lessons = Array.isArray(data) ? data : (data.lessons || []);
      render(lessons);
      window.addEventListener('learninglab:progress-changed', () => render(lessons));
      window.addEventListener('storage', event => { if (!event.key || event.key === profileKey || event.key === legacyKey) render(lessons); });
    } catch (error) { console.warn('Не вдалося оновити навчальний маршрут.', error); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();

/* Персональний маршрут доступний після входу; гостьовий перегляд залишається доступним. */
(() => {
  const section = document.getElementById('learningDashboard');
  const overlay = document.getElementById('guestDashboardOverlay');
  if (!section || !overlay) return;
  const setGuestMode = isGuest => {
    section.classList.toggle('is-guest-locked', Boolean(isGuest));
    overlay.hidden = !isGuest;
    section.setAttribute('aria-describedby', isGuest ? 'guestDashboardTitle' : 'learningDashboardTitle');
    if (isGuest) {
      section.setAttribute('aria-label', 'Попередній перегляд навчального маршруту. Увійдіть, щоб активувати персональні функції.');
    } else {
      section.removeAttribute('aria-label');
    }
  };
  if (!window.FIREBASE_ENABLED) {
    setGuestMode(true);
    return;
  }
  import('./firebase-client.js').then(async ({ auth }) => {
    const { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js');
    onAuthStateChanged(auth, user => setGuestMode(!user));
  }).catch(error => {
    console.warn('Не вдалося перевірити стан входу для навчального маршруту.', error);
    setGuestMode(true);
  });
})();
