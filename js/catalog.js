/* Каталог завантажує data/lessons.json — це єдине місце реєстрації уроків. */
(function () {
    const script = document.currentScript; const siteRoot = new URL('../', script.src); let allLessons = [];
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    function visualMarkup(type) {
        // Плашки уроків оформлюються виключно CSS-градієнтом, без SVG чи растрових зображень.
        return '';
    }
    function render() {
        const grid = document.getElementById('lessonGrid'); if (!grid) return; const q = (document.getElementById('searchInput')?.value || '').trim().toLocaleLowerCase('uk'); const grade = document.getElementById('gradeFilter')?.value || 'all'; const subject = document.body.dataset.subject || 'all'; const p = window.LearningGamification?.profile() || { completed: [], coins: 0 }; const list = allLessons.filter(l => (subject === 'all' || l.category === subject) && (grade === 'all' || (l.grades || []).includes(Number(grade))) && (l.title + ' ' + l.subject + ' ' + l.description + ' ' + l.tag + ' ' + (l.grades || []).join(' ')).toLocaleLowerCase('uk').includes(q));
        grid.innerHTML = list.map(l => { const done = p.completed.includes(l.id); const url = new URL(l.url, siteRoot).href; return `<a class="lesson-card" href="${url}"><div class="lesson-visual ${esc(l.visual)}">${visualMarkup(l.visual)}</div><span class="lesson-tag">${esc(l.tag)}</span><h3>${esc(l.title)}</h3><p>${esc(l.description)}</p><div class="lesson-meta"><span>Клас${l.grades?.length > 1 ? 'и' : ''}: ${esc(l.grades?.join(', ') || '1–11')}</span><span>${esc(l.difficulty || 'Практика')}</span></div><div class="lesson-card-bottom"><span>${esc(l.duration)} · 🪙 ${Number(l.coins) || 20}</span><span class="${done ? 'lesson-status' : 'lesson-open'}">${done ? '✓ Пройдено' : 'Почати урок →'}</span></div></a>` }).join('');
        const count = document.getElementById('lessonCount'); if (count) count.textContent = `${list.length} ${list.length === 1 ? 'урок' : list.length >= 2 && list.length <= 4 ? 'уроки' : 'уроків'}`; document.getElementById('emptyState')?.classList.toggle('hidden', list.length > 0); if (window.LearningGamification) window.LearningGamification.renderProfile(allLessons);
    }
    async function init() { try { const response = await fetch(new URL('data/lessons.json', siteRoot)); if (!response.ok) throw new Error('Не вдалося завантажити data/lessons.json'); const data = await response.json(); allLessons = Array.isArray(data) ? data : (data.lessons || []); render(); document.getElementById('searchInput')?.addEventListener('input', render); document.getElementById('gradeFilter')?.addEventListener('change', render); document.dispatchEvent(new CustomEvent('learning:catalog-ready', { detail: { lessons: allLessons } })); } catch (err) { const grid = document.getElementById('lessonGrid'); if (grid) grid.innerHTML = '<p class="empty-state">Не вдалося завантажити каталог. Перевір файл data/lessons.json та адресу GitHub Pages.</p>'; console.error(err) } }
    document.addEventListener('DOMContentLoaded', init);
})();
