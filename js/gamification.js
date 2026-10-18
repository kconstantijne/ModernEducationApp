/* Єдина система прогресу для GitHub Pages. Дані зберігаються локально в браузері. */
(function () {
  const KEY = 'learning-lab-profile-v2';
  const legacyKey = 'learning-lab-completed';
  const defaults = { coins: 0, completed: [], perfect: [], achievements: [], lessonRewards: {}, lessonResults: {}, purchases: [], ledger: [] };
  function read() { try { const p = JSON.parse(localStorage.getItem(KEY) || 'null'); if (p && typeof p === 'object') return { ...defaults, ...p }; } catch (e) { }; let old = []; try { old = JSON.parse(localStorage.getItem(legacyKey) || '[]') } catch (e) { }; return { ...defaults, completed: Array.isArray(old) ? old : [] }; }
  function save(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); localStorage.setItem(legacyKey, JSON.stringify(p.completed)); window.dispatchEvent(new Event('learninglab:progress-changed')); } catch (e) { console.warn('Не вдалося зберегти прогрес', e) } }
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
    { id: 'coin-collector', title: 'Скарбничка', description: 'Збери 🪙 100 комп’юшок', icon: '🪙', test: p => p.coins >= 100 },
    { id: 'coin-pouch', title: 'Запас комп’юшок', description: 'Збери 🪙 250 комп’юшок', icon: '🪙', test: p => p.coins >= 250 },
    { id: 'coin-treasure', title: 'Мисливець за скарбами', description: 'Збери 🪙 500 комп’юшок', icon: '🪙', test: p => p.coins >= 500 },
    { id: 'perfect-lesson', title: 'Без помилок', description: 'Заверши урок із результатом 100%', icon: '⭐', test: p => p.perfect.length >= 1 },
    { id: 'perfect-three', title: 'Зірковий результат', description: 'Отримай 100% у трьох уроках', icon: '🌟', test: p => p.perfect.length >= 3 },
    { id: 'perfect-five', title: 'Перфекціоніст', description: 'Отримай 100% у п’яти уроках', icon: '🎯', test: p => p.perfect.length >= 5 },
    { id: 'perfect-ten', title: 'Абсолютна точність', description: 'Отримай 100% у десяти уроках', icon: '🏅', test: p => p.perfect.length >= 10 },
    { id: 'steady-start', title: 'Розігрів завершено', description: 'Заверши 2 уроки за свою подорож', icon: '🔥', test: p => p.completed.length >= 2 },
    { id: 'curious-mind', title: 'Допитливий розум', description: 'Відкрий щонайменше 4 різні уроки', icon: '🔎', test: p => new Set(p.completed).size >= 4 },
    { id: 'persistent', title: 'Наполегливість', description: 'Заверши 7 різних уроків', icon: '🧗', test: p => p.completed.length >= 7 },
    { id: 'double-perfect', title: 'Подвійний тріумф', description: 'Отримай 100% у двох уроках', icon: '🥈', test: p => p.perfect.length >= 2 },
    { id: 'first-reward', title: 'Нагорода за старання', description: 'Зароби перші 🪙 20 комп’юшок', icon: '🎁', test: p => p.coins >= 20 },
    { id: 'big-journey', title: 'Велика мандрівка', description: 'Заверши 12 уроків', icon: '🚀', test: p => p.completed.length >= 12 }
  ];
  function evaluate(all) { const p = read(); let changed = false; achievements.forEach(a => { if (!p.achievements.includes(a.id) && a.test(p, all)) { p.achievements.push(a.id); changed = true } }); if (changed) save(p); return p; }
  // Винагорода накопичується до вартості найвищої успішно пройденої складності.
  // Підвищення складності видає лише різницю; покращення найкращого результату має окремий бонус.
  const BASE_REWARDS = { simple: 5, medium: 10, hard: 20 };
  const SHOP_ITEMS = [
    { id: 'avatar-neon', title: 'Неоновий аватар', description: 'Косметичне оформлення профілю', price: 30, type: 'cosmetic' },
    { id: 'profile-frame', title: 'Рамка дослідника', description: 'Особлива рамка профілю', price: 45, type: 'cosmetic' },
    { id: 'hint-token', title: 'Жетон підказки', description: 'Жетон для майбутніх інтерактивних уроків', price: 20, type: 'utility' },
    { id: 'title-inventor', title: 'Звання «Винахідник»', description: 'Декоративне звання учня', price: 60, type: 'cosmetic' }
  ];
  function normalizeDifficulty(value) {
    const v = String(value || '').toLowerCase();
    if (['hard', 'advanced', 'difficult', 'складний'].includes(v)) return 'hard';
    if (['simple', 'easy', 'beginner', 'початковий', 'простий'].includes(v)) return 'simple';
    return 'medium';
  }
  function ensureProfile(p) {
    p.coins = Math.max(0, Math.floor(Number(p.coins) || 0));
    p.completed = Array.isArray(p.completed) ? [...new Set(p.completed)] : [];
    p.perfect = Array.isArray(p.perfect) ? p.perfect : [];
    p.achievements = Array.isArray(p.achievements) ? p.achievements : [];
    p.lessonRewards = p.lessonRewards && typeof p.lessonRewards === 'object' ? p.lessonRewards : {};
    p.lessonResults = p.lessonResults && typeof p.lessonResults === 'object' ? p.lessonResults : {};
    p.purchases = Array.isArray(p.purchases) ? p.purchases : [];
    p.ledger = Array.isArray(p.ledger) ? p.ledger : [];
    return p;
  }
  function pushLedger(p, entry) {
    p.ledger.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, at: new Date().toISOString(), ...entry });
    if (p.ledger.length > 500) p.ledger = p.ledger.slice(-500);
  }
  function awardTestResult(id, scorePercent, difficulty = 'medium') {
    if (!id || !Number.isFinite(Number(scorePercent))) return { success: false, reason: 'invalid-result', coinsAwarded: 0 };
    // Для Firebase нагорода обчислюється на клієнті та записується у Firestore транзакцією.
    if (window.FIREBASE_ENABLED) {
      const sourceScript = Array.from(document.scripts).find(item => /(?:^|\/)gamification\.js(?:[?#].*)?$/.test(item.src));
      const moduleUrl = sourceScript ? new URL('cloud-rewards.js', sourceScript.src).href : new URL('js/cloud-rewards.js', document.baseURI).href;
      return import(moduleUrl)
        .then(({ awardTestResultCloud }) => awardTestResultCloud(id, scorePercent, difficulty))
        .catch(error => {
          console.error('Не вдалося отримати хмарну винагороду:', error);
          return { success: false, passed: false, coinsAwarded: 0, message: 'Не вдалося зберегти нагороду в хмарі. Перевір інтернет і спробуй ще раз.' };
        });
    }
    const score = Math.max(0, Math.min(100, Math.round(Number(scorePercent))));
    const level = normalizeDifficulty(difficulty);
    const levelRank = { simple: 1, medium: 2, hard: 3 };
    const p = ensureProfile(read());
    const previous = p.lessonResults[id] || { bestScore: null, baseAwarded: false, baseReward: 0 };
    const previousBest = previous.bestScore === null || previous.bestScore === undefined ? null : Number(previous.bestScore);
    if (score < 70) {
      return { success: true, passed: false, coinsAwarded: 0, score, message: 'Потрібно набрати щонайменше 70%, щоб отримати базову винагороду.' };
    }

    // Міграція старих записів: раніше зберігався лише факт базової нагороди.
    let highestRewardedLevel = previous.highestRewardedLevel || (previous.baseAwarded
      ? (previous.lastDifficulty || (Number(previous.baseReward) >= 20 ? 'hard' : Number(previous.baseReward) >= 10 ? 'medium' : 'simple'))
      : null);
    if (highestRewardedLevel && !BASE_REWARDS[highestRewardedLevel]) highestRewardedLevel = normalizeDifficulty(highestRewardedLevel);

    let coinsAwarded = 0;
    let baseAward = 0;
    let improvementBonus = 0;
    const currentRank = levelRank[level];
    const previousRank = highestRewardedLevel ? levelRank[highestRewardedLevel] : 0;

    if (currentRank > previousRank) {
      // Нараховуємо лише різницю між новою і вже отриманою винагородою.
      baseAward = BASE_REWARDS[level] - (BASE_REWARDS[highestRewardedLevel] || 0);
      if (baseAward > 0) {
        coinsAwarded += baseAward;
        highestRewardedLevel = level;
        previous.highestRewardedLevel = level;
        previous.baseAwarded = true;
        previous.baseReward = BASE_REWARDS[level];
        if (!p.completed.includes(id)) p.completed.push(id);
        pushLedger(p, { type: 'lesson-base', lessonId: id, amount: baseAward, score, difficulty: level, description: `Доплата за рівень складності (${level})` });
      }
    }

    if (previousBest !== null && score > previousBest) {
      const delta = score - previousBest;
      improvementBonus = Math.max(1, Math.round((previous.baseReward || BASE_REWARDS[level]) * delta / 100));
      coinsAwarded += improvementBonus;
      pushLedger(p, { type: 'lesson-improvement', lessonId: id, amount: improvementBonus, previousScore: previousBest, score, difficulty: level, description: `Бонус за покращення результату на ${delta} в. п.` });
    }

    if (previousBest === null || score > previousBest) previous.bestScore = score;
    previous.lastScore = score;
    previous.lastDifficulty = level;
    previous.lastAttemptAt = new Date().toISOString();
    previous.highestRewardedLevel = highestRewardedLevel;
    previous.baseAwarded = Boolean(highestRewardedLevel);
    previous.baseReward = highestRewardedLevel ? BASE_REWARDS[highestRewardedLevel] : 0;
    p.lessonResults[id] = previous;
    p.coins += coinsAwarded;
    if (score === 100 && !p.perfect.includes(id)) p.perfect.push(id);
    save(p);
    const all = window.lessonCatalog || [];
    const latest = evaluate(all);
    renderProfile(all);
    const message = baseAward
      ? `🪙 +${baseAward} комп’юшок за перехід на рівень «${level === 'simple' ? 'Легкий' : level === 'medium' ? 'Середній' : 'Важкий'}»!`
      : improvementBonus
        ? `🪙 +${improvementBonus} комп’юшок за покращення результату!`
        : 'Нових комп’юшок цього разу немає. Покращуй свій найкращий результат!';
    showRewardNotice(message, coinsAwarded);
    return { success: true, passed: true, coinsAwarded, baseAward, improvementBonus, score, bestScore: previous.bestScore, highestRewardedLevel, profile: latest, message };
  }
  let rewardNoticeTimer = null;
  function showRewardNotice(message, amount) {
    let node = document.getElementById('learningCoinNotice');
    if (!node) {
      node = document.createElement('div'); node.id = 'learningCoinNotice'; node.setAttribute('role', 'status');
      Object.assign(node.style, { position: 'fixed', right: '18px', bottom: '18px', zIndex: '99999', maxWidth: 'min(360px, calc(100vw - 36px))', padding: '14px 18px', borderRadius: '14px', background: 'var(--surface, #172033)', color: 'var(--text, #fff)', border: '1px solid var(--border, #475569)', boxShadow: '0 8px 30px #0003', font: '600 14px/1.45 system-ui, sans-serif', opacity: '0', transform: 'translateY(8px)', transition: 'opacity .2s ease, transform .2s ease' });
      document.body.appendChild(node);
    }
    node.textContent = `${message} Баланс: 🪙 ${profile().coins} комп’юшок.`;
    // Lesson stylesheets can contain broad !important color rules. Force an explicit,
    // theme-aware foreground/background so the toast is readable without selecting it.
    const darkTheme = document.documentElement.dataset.theme === 'dark';
    node.style.setProperty('color', darkTheme ? '#f4f6ff' : '#20263a', 'important');
    node.style.setProperty('-webkit-text-fill-color', darkTheme ? '#f4f6ff' : '#20263a', 'important');
    node.style.setProperty('background', darkTheme ? '#20283b' : '#ffffff', 'important');
    node.style.setProperty('border-color', darkTheme ? '#46516c' : '#cbd3e6', 'important');
    node.style.setProperty('text-shadow', 'none', 'important');
    node.style.setProperty('user-select', 'text');
    node.hidden = false;
    requestAnimationFrame(() => { node.style.opacity = '1'; node.style.transform = 'translateY(0)'; });
    clearTimeout(rewardNoticeTimer);
    rewardNoticeTimer = setTimeout(() => { node.style.opacity = '0'; node.style.transform = 'translateY(8px)'; setTimeout(() => { node.hidden = true; }, 220); }, 3200);
  }
  function purchaseReward(itemId) {
    if (window.FIREBASE_ENABLED) {
      const sourceScript = Array.from(document.scripts).find(item => /(?:^|\/)gamification\.js(?:[?#].*)?$/.test(item.src));
      const moduleUrl = sourceScript ? new URL('cloud-rewards.js', sourceScript.src).href : new URL('js/cloud-rewards.js', document.baseURI).href;
      return import(moduleUrl).then(({ purchaseRewardCloud }) => purchaseRewardCloud(itemId)).catch(error => { console.error('Не вдалося списати комп’юшки:', error); return { success: false, message: error.message || 'Не вдалося зберегти покупку. Перевір інтернет і спробуй ще раз.' }; });
    }
    const item = SHOP_ITEMS.find(x => x.id === itemId);
    if (!item) return { success: false, reason: 'not-found', message: 'Такої винагороди немає.' };
    const p = ensureProfile(read());
    if (p.purchases.some(x => x.itemId === itemId && x.status !== 'consumed' && item.type === 'cosmetic')) return { success: false, reason: 'already-owned', message: 'Цю нагороду вже відкрито.' };
    if (p.coins < item.price) return { success: false, reason: 'insufficient-funds', message: 'Поки бракує комп’юшок для цієї нагороди.' };
    p.coins -= item.price;
    const purchase = { itemId, title: item.title, price: item.price, type: item.type, purchasedAt: new Date().toISOString(), status: 'owned' };
    p.purchases.push(purchase);
    pushLedger(p, { type: 'shop-purchase', itemId, amount: -item.price, description: `Відкрито нагороду: ${item.title}` });
    save(p); renderProfile(window.lessonCatalog || []);
    return { success: true, item, purchase, profile: p, message: `Нагороду відкрито: ${item.title}.` };
  }
  function getShopItems() { const p = profile(); return SHOP_ITEMS.map(item => { const quantity = p.purchases.filter(x => x.itemId === item.id && x.status !== 'consumed').length; return { ...item, quantity, owned: item.type === 'cosmetic' && quantity > 0 }; }); }
  // Зворотна сумісність для старих викликів. Старі окремі бонуси за 100% більше не нараховуються.
  function awardLesson(id, score, maxScore, all, difficulty = 'medium') {
    const pct = Number(maxScore) > 0 ? Math.round(Number(score) / Number(maxScore) * 100) : 0;
    const result = awardTestResult(id, pct, difficulty);
    return { newCompletion: result.baseAward > 0, newLevel: result.baseAward > 0, coins: result.baseAward || 0, coinsAwarded: result.coinsAwarded || 0, difficulty: normalizeDifficulty(difficulty), perfectBonus: 0, profile: profile(), ...result };
  }
  function profile() { return ensureProfile(read()) }
  function renderProfile(all) {
    const p = evaluate(all || []); document.querySelectorAll('[data-coins]').forEach(el => el.textContent = p.coins); document.querySelectorAll('[data-completed]').forEach(el => el.textContent = p.completed.length); const wrap = document.getElementById('achievementList'); if (wrap) { const pageSize = 8; const carousel = document.getElementById('achievementCarousel'); let page = Number(carousel && carousel.dataset.page || 0); const pages = Math.max(1, Math.ceil(achievements.length / pageSize)); page = Math.min(Math.max(0, page), pages - 1); if (carousel) carousel.dataset.page = String(page); const visible = achievements.slice(page * pageSize, page * pageSize + pageSize); wrap.innerHTML = visible.map(a => { const earned = p.achievements.includes(a.id); return `<article class="achievement ${earned ? 'earned' : 'locked'}"><span class="achievement-icon">${a.icon}</span><div class="achievement-copy"><strong>${a.title}</strong><p>${a.description}</p></div><span class="achievement-state" aria-label="${earned ? 'Отримано' : 'Не отримано'}">${earned ? '🔓 Отримано' : '🔒 Не отримано'}</span></article>` }).join(''); const pageLabel = document.getElementById('achievementPage'); if (pageLabel) pageLabel.textContent = `${page + 1} / ${pages}`; const prev = document.getElementById('achievementPrev'), next = document.getElementById('achievementNext'); if (prev) prev.disabled = page === 0; if (next) next.disabled = page >= pages - 1; } const earnedCount = document.getElementById('earnedCount'); if (earnedCount) earnedCount.textContent = p.achievements.length; const achievementProgress = document.getElementById('achievementProgress'); if (achievementProgress) achievementProgress.textContent = `${p.achievements.length} / ${achievements.length}`;
    const count = document.getElementById('completedCount'); if (count) count.textContent = p.completed.length;
    const bar = document.getElementById('progressBar'); if (bar) { const total = (all || []).length; bar.style.width = (total ? Math.min(100, Math.round(p.completed.filter(id => (all || []).some(l => l.id === id)).length / total * 100)) : 0) + '%'; }
    const label = document.getElementById('progressLabel'), detail = document.getElementById('progressDetail'); if (label) label.textContent = p.completed.length ? 'Кожен урок наближає до мети' : 'Твоя подорож тільки починається'; if (detail) detail.textContent = `${p.completed.length} уроків завершено · 🪙 ${p.coins} комп’юшок`; return p;
  }
  document.getElementById('achievementPrev')?.addEventListener('click', () => { const c = document.getElementById('achievementCarousel'); c.dataset.page = String(Math.max(0, Number(c.dataset.page || 0) - 1)); renderProfile(window.lessonCatalog || []); });
  document.getElementById('achievementNext')?.addEventListener('click', () => { const c = document.getElementById('achievementCarousel'); const pages = Math.ceil(achievements.length / 8); c.dataset.page = String(Math.min(pages - 1, Number(c.dataset.page || 0) + 1)); renderProfile(window.lessonCatalog || []); });
  window.LearningGamification = { profile, awardLesson, awardTestResult, purchaseReward, getShopItems, renderProfile, evaluate, achievements, baseRewards: BASE_REWARDS };
  const script = document.currentScript;
  if (script) { const rootUrl = new URL('../', script.src); fetch(new URL('data/lessons.json', rootUrl)).then(r => r.json()).then(d => { window.lessonCatalog = Array.isArray(d) ? d : (d.lessons || []); renderProfile(window.lessonCatalog); window.dispatchEvent(new Event('learningcatalogready')) }).catch(() => { }); }
})();
