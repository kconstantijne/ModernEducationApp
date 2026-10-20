// Каталог предмета використовує спільну бібліотеку data/lessons.json і клас із профілю.
document.addEventListener('DOMContentLoaded', async () => {
  const subject = document.body.dataset.subject;
  const search = document.getElementById('searchInput');
  const grid = document.getElementById('lessonGrid');
  const count = document.getElementById('lessonCount');
  const empty = document.getElementById('emptyState');
  let allLessons = [];
  let completed = [];
  try { completed = JSON.parse(localStorage.getItem('learning-lab-completed') || '[]'); } catch (_) {}
  const api = window.LearningGamification;
  function selectedGrade() {
    try { const profile = JSON.parse(localStorage.getItem('learningLabLocalProfile') || '{}'); return Number(profile.grade) >= 1 && Number(profile.grade) <= 11 ? Number(profile.grade) : 5; }
    catch (_) { return 5; }
  }
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function render(q = '') {
    const grade = selectedGrade();
    const filtered = allLessons.filter(lesson => lesson.category === subject && (!Array.isArray(lesson.grades) || lesson.grades.includes(grade)) && (lesson.title + ' ' + lesson.description + ' ' + lesson.tag + ' ' + lesson.subject).toLocaleLowerCase('uk').includes(q.toLocaleLowerCase('uk')));
    grid.innerHTML = filtered.map(lesson => {
      const url = new URL(lesson.url, new URL('../', document.baseURI)).href;
      const done = (api?.profile()?.completed || completed).includes(lesson.id);
      return `<a class="lesson-card" href="${url}"><div class="lesson-visual ${esc(lesson.visual || '')}"></div><span class="lesson-tag">${esc(lesson.tag || lesson.subject || 'УРОК')}</span><h3>${esc(lesson.title)}</h3><p>${esc(lesson.description || '')}</p><div class="lesson-meta"><span>Клас${(lesson.grades || []).length > 1 ? 'и' : ''}: ${esc((lesson.grades || []).join(', ') || '1–11')}</span><span>${esc(lesson.difficulty || 'Практика')}</span></div><div class="lesson-card-bottom"><span>${esc(lesson.duration || '10 хв')}</span><span class="${done ? 'lesson-status' : 'lesson-open'}">${done ? '✓ Пройдено' : 'Почати урок →'}</span></div></a>`;
    }).join('');
    if (count) count.textContent = `${filtered.length} ${filtered.length === 1 ? 'урок' : filtered.length >= 2 && filtered.length <= 4 ? 'уроки' : 'уроків'} · ${grade} клас`;
    empty?.classList.toggle('hidden', filtered.length > 0);
  }
  try {
    const response = await fetch(new URL('../data/lessons.json', document.baseURI));
    if (!response.ok) throw new Error('Каталог недоступний');
    const data = await response.json();
    allLessons = Array.isArray(data) ? data : (data.lessons || []);
    render();
    search?.addEventListener('input', event => render(event.target.value));
    window.addEventListener('storage', event => { if (event.key === 'learningLabLocalProfile') render(search?.value || ''); });
    document.addEventListener('learninglab:grade-changed', () => render(search?.value || ''));
  } catch (error) {
    if (grid) grid.innerHTML = '<p class="empty-state">Не вдалося завантажити бібліотеку уроків. Перевір data/lessons.json.</p>';
    console.error(error);
  }
  const sidebar = document.getElementById('sidebar'), scrim = document.getElementById('mobileScrim');
  document.getElementById('mobileMenu')?.addEventListener('click', () => { sidebar?.classList.toggle('open'); scrim?.classList.toggle('show'); });
  scrim?.addEventListener('click', () => { sidebar?.classList.remove('open'); scrim?.classList.remove('show'); });
});
