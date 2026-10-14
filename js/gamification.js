/* Єдина система прогресу для GitHub Pages. Дані зберігаються локально в браузері. */
(function () {
  const KEY = 'learning-lab-profile-v2';
  const legacyKey = 'learning-lab-completed';
  const defaults = { coins: 0, completed: [], perfect: [], achievements: [], lessonRewards: {} };
  function read() { try { const p = JSON.parse(localStorage.getItem(KEY) || 'null'); if (p && typeof p === 'object') return { ...defaults, ...p }; } catch (e) { }; let old = []; try { old = JSON.parse(localStorage.getItem(legacyKey) || '[]') } catch (e) { }; return { ...defaults, completed: Array.isArray(old) ? old : [] }; }
  function save(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); localStorage.setItem(legacyKey, JSON.stringify(p.completed)); } catch (e) { console.warn('Не вдалося зберегти прогрес', e) } }
  const achievements = [
    { id: 'first-lesson', title: 'Перший крок', description: 'Заверши свій перший урок', icon: '🌱', test: p => p.completed.length >= 1 },
    { id: 'three-lessons', title: 'Дослідник', description: 'Заверши 3 різні уроки', icon: '🧭', test: p => p.completed.length >= 3 },
    { id: 'five-lessons', title: 'Невтомний учень', description: 'Заверши 5 уроків', icon: '📚', test: p => p.completed.length >= 5 },
    { id: 'eight-lessons', title: 'Майстер практики', description: 'Заверши 8 уроків', icon: '🛠️', test: p => p.completed.length >= 8 },
    { id: 'ten-lessons', title: 'Десятка відкриттів', description: 'Заверши 10 уроків', icon: '🔟', test: p => p.completed.length >= 10 },
    { id: 'all-lessons', title: 'Легенда лабораторії', description: 'Заверши всі уроки з каталогу', icon: '👑', test: (p, all) => all.length > 0 && all.every(l => p.completed.includes(l.id)) },
    { id: 'both-subjects', title: 'На двох фронтах', description: 'Пройди уроки з математики й інформатики', icon: '⚖️', test: (p, all) => all.some(l => l.category === 'math' && p.completed.includes(l.id)) && all.some(l => l.category === 'informatics' && p.completed.includes(l.id)) },
    { id: 'math-explorer', title: 'Математичний розум', description: 'Заверши 3 уроки з математики', icon: '∑', test: (p, all) => all.filter(l => l.category === 'math' && p.completed.includes(l.id)).length >= 3 },
    { id: 'math-master', title: 'Повелитель чисел', description: 'Заверши 6 уроків з математики', icon: '📐', test: (p, all) => all.filter(l => l.category === 'math' && p.completed.includes(l.id)).length >= 6 },
    { id: 'code-starter', title: 'Перший алгоритм', description: 'Заверши 1 урок з інформатики', icon: '💻', test: (p, all) => all.some(l => l.category === 'informatics' && p.completed.includes(l.id)) },
    { id: 'code-explorer', title: 'Цифровий дослідник', description: 'Заверши 3 уроки з інформатики', icon: '🧑‍💻', test: (p, all) => all.filter(l => l.category === 'informatics' && p.completed.includes(l.id)).length >= 3 },
    { id: 'code-master', title: 'Архітектор коду', description: 'Заверши 5 уроків з інформатики', icon: '⌘', test: (p, all) => all.filter(l => l.category === 'informatics' && p.completed.includes(l.id)).length >= 5 },
    { id: 'coin-collector', title: 'Скарбничка', description: 'Збери 100 комп’юшок', icon: '🪙', test: p => p.coins >= 100 },
    { id: 'coin-pouch', title: 'Золотий запас', description: 'Збери 250 комп’юшок', icon: '💰', test: p => p.coins >= 250 },
    { id: 'coin-treasure', title: 'Мисливець за скарбами', description: 'Збери 500 комп’юшок', icon: '💎', test: p => p.coins >= 500 },
    { id: 'perfect-lesson', title: 'Без помилок', description: 'Заверши урок із результатом 100%', icon: '⭐', test: p => p.perfect.length >= 1 },
    { id: 'perfect-three', title: 'Зірковий результат', description: 'Отримай 100% у трьох уроках', icon: '🌟', test: p => p.perfect.length >= 3 },
    { id: 'perfect-five', title: 'Перфекціоніст', description: 'Отримай 100% у п’яти уроках', icon: '🎯', test: p => p.perfect.length >= 5 },
    { id: 'perfect-ten', title: 'Абсолютна точність', description: 'Отримай 100% у десяти уроках', icon: '🏅', test: p => p.perfect.length >= 10 },
    { id: 'steady-start', title: 'Розігрів завершено', description: 'Заверши 2 уроки за свою подорож', icon: '🔥', test: p => p.completed.length >= 2 },
    { id: 'curious-mind', title: 'Допитливий розум', description: 'Відкрий щонайменше 4 різні уроки', icon: '🔎', test: p => new Set(p.completed).size >= 4 },
    { id: 'persistent', title: 'Наполегливість', description: 'Заверши 7 різних уроків', icon: '🧗', test: p => p.completed.length >= 7 },
    { id: 'double-perfect', title: 'Подвійний тріумф', description: 'Отримай 100% у двох уроках', icon: '🥈', test: p => p.perfect.length >= 2 },
    { id: 'first-reward', title: 'Нагорода за старання', description: 'Зароби перші 20 комп’юшок', icon: '🎁', test: p => p.coins >= 20 },
    { id: 'big-journey', title: 'Велика мандрівка', description: 'Заверши 12 уроків', icon: '🚀', test: p => p.completed.length >= 12 }
  ];
  function evaluate(all) { const p = read(); let changed = false; achievements.forEach(a => { if (!p.achievements.includes(a.id) && a.test(p, all)) { p.achievements.push(a.id); changed = true } }); if (changed) save(p); return p; }
  function awardLesson(id, score, maxScore, all) {
    const p = read(); const isNew = !p.completed.includes(id); if (isNew) { p.completed.push(id); const base = 20; p.coins += base; p.lessonRewards[id] = base; }
    const perfect = Number(maxScore) > 0 && Number(score) >= Number(maxScore); const newPerfect = perfect && !p.perfect.includes(id); if (newPerfect) { p.perfect.push(id); p.coins += 10; }
    save(p); const latest = evaluate(all || []); renderProfile(all || []); return { newCompletion: isNew, coins: isNew ? 20 : 0, perfectBonus: newPerfect ? 10 : 0, profile: latest };
  }
  function profile() { return read() }
  function renderProfile(all) {
    const p = evaluate(all || []); document.querySelectorAll('[data-coins]').forEach(el => el.textContent = p.coins); document.querySelectorAll('[data-completed]').forEach(el => el.textContent = p.completed.length); const wrap = document.getElementById('achievementList'); if (wrap) { wrap.innerHTML = achievements.map(a => { const earned = p.achievements.includes(a.id); return `<article class="achievement ${earned ? 'earned' : 'locked'}"><span class="achievement-icon">${a.icon}</span><div class="achievement-copy"><strong>${a.title}</strong><p>${a.description}</p></div><span class="achievement-state">${earned ? 'Отримано ✓' : 'Ще попереду'}</span></article>` }).join(''); } const earnedCount = document.getElementById('earnedCount'); if (earnedCount) earnedCount.textContent = p.achievements.length; const achievementProgress = document.getElementById('achievementProgress'); if (achievementProgress) achievementProgress.textContent = `${p.achievements.length} / ${achievements.length}`;
    const count = document.getElementById('completedCount'); if (count) count.textContent = p.completed.length;
    const bar = document.getElementById('progressBar'); if (bar) { const total = (all || []).length; bar.style.width = (total ? Math.min(100, Math.round(p.completed.filter(id => (all || []).some(l => l.id === id)).length / total * 100)) : 0) + '%'; }
    const label = document.getElementById('progressLabel'), detail = document.getElementById('progressDetail'); if (label) label.textContent = p.completed.length ? 'Кожен урок наближає до мети' : 'Твоя подорож тільки починається'; if (detail) detail.textContent = `${p.completed.length} уроків завершено · ${p.coins} комп’юшок`; return p;
  }
  window.LearningGamification = { profile, awardLesson, renderProfile, evaluate, achievements };
  const script = document.currentScript;
  if (script) { const rootUrl = new URL('../', script.src); fetch(new URL('data/lessons.json', rootUrl)).then(r => r.json()).then(d => { window.lessonCatalog = Array.isArray(d) ? d : (d.lessons || []); renderProfile(window.lessonCatalog) }).catch(() => { }); }
})();
