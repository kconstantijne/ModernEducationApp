(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const activityIcon = (entry) => entry.type === 'shop-purchase' ? '🎁' : entry.type === 'lesson-improvement' ? '📈' : '🪙';
  const activityTitle = (entry) => entry.type === 'shop-purchase' ? 'Відкрито нагороду' : entry.type === 'lesson-improvement' ? 'Покращено результат уроку' : entry.type === 'lesson-base' ? 'Успішно завершено урок' : 'Навчальна активність';
  const PROFILE_KEY = 'learningLabLocalProfile';
  const GOALS_KEY = 'learning-lab-weekly-goals-v1';
  let lessons = [];
  const readGoals = () => { try { const value = JSON.parse(localStorage.getItem(GOALS_KEY) || '[]'); return Array.isArray(value) ? value : []; } catch (_) { return []; } };
  const writeGoals = goals => { try { localStorage.setItem(GOALS_KEY, JSON.stringify(goals)); return true; } catch (_) { return false; } };
  const plural = n => n === 1 ? 'ціль' : n >= 2 && n <= 4 ? 'цілі' : 'цілей';
  const tips = [
    ['Твій крок має значення', 'Навіть маленький крок сьогодні наближає до великої мети.'],
    ['Помилятися — це вчитися', 'Кожна помилка підказує, що спробувати наступного разу.'],
    ['Ти можеш більше, ніж здається', 'Обери одне завдання й дай собі шанс його розв’язати.'],
    ['Цікавість — твоя суперсила', 'Став запитання, досліджуй і відкривай нове щодня.'],
    ['Прогрес не змагається з часом', 'Навчайся у власному темпі — головне продовжувати.'],
    ['Спробуй інший підхід', 'Якщо не вийшло одразу, зміни стратегію та спробуй знову.'],
    ['Кожен урок — відкриття', 'Сьогодні ти можеш дізнатися щось, чого не знав учора.'],
    ['Твоя наполегливість працює', 'Регулярні невеликі зусилля складаються у справжній результат.'],
    ['Дозволь собі цікавитися', 'Найкращі ідеї часто починаються зі слова «чому?».'],
    ['Почни з одного кроку', 'Не потрібно зробити все одразу — почни з першого завдання.']
  ];
  function showFreshTip() {
    if (!$('sidebarTipTitle') || !$('sidebarTipText')) return;
    let previous = -1;
    try { previous = Number(localStorage.getItem('learningLabLastTip') ?? -1); } catch (_) {}
    let index = Math.floor(Math.random() * tips.length);
    if (tips.length > 1 && index === previous) index = (index + 1 + Math.floor(Math.random() * (tips.length - 1))) % tips.length;
    $('sidebarTipTitle').textContent = tips[index][0];
    $('sidebarTipText').textContent = tips[index][1];
    try { localStorage.setItem('learningLabLastTip', String(index)); } catch (_) {}
  }
  function readLocalProfile() {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}') || {}; } catch (_) { return {}; }
  }
  function initAccount() {
    const data = readLocalProfile();
    if ($('accountNameInput')) $('accountNameInput').value = data.name || '';
    if (data.photo) setAvatar(data.photo);
    $('saveProfileButton')?.addEventListener('click', () => {
      const profile = readLocalProfile();
      profile.name = ($('accountNameInput')?.value || '').trim().slice(0, 48);
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        $('profileAccountFeedback').textContent = profile.name ? `Збережено. Вітаємо, ${profile.name}!` : 'Зміни збережено.';
        
      } catch (_) {
        $('profileAccountFeedback').textContent = 'Не вдалося зберегти зміни. Спробуй фото меншого розміру.';
      }
    });
    $('accountPhotoInput')?.addEventListener('change', (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) { $('profileAccountFeedback').textContent = 'Обери файл зображення.'; return; }
      if (file.size > 2 * 1024 * 1024) { $('profileAccountFeedback').textContent = 'Фото має бути до 2 МБ.'; event.target.value = ''; return; }
      const reader = new FileReader();
      reader.onload = () => {
        const profile = readLocalProfile(); profile.photo = String(reader.result || '');
        try {
          localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); setAvatar(profile.photo);
          $('profileAccountFeedback').textContent = 'Фото профілю збережено на цьому пристрої.';
        } catch (_) { $('profileAccountFeedback').textContent = 'Не вдалося зберегти фото. Спробуй зображення меншого розміру.'; }
      };
      reader.readAsDataURL(file);
    });

  }
  function setAvatar(src) {
    const img = $('accountAvatarPreview'), fallback = $('accountAvatarFallback');
    if (!img || !fallback) return;
    img.src = src; img.hidden = false; fallback.hidden = true;
  }
  let earnedAchievements = [];
  let achievementPage = 0;
  const achievementPageSize = 4;
  function renderAchievementCarousel() {
    const node = $('profileEarnedAchievements');
    if (!node) return;
    const pageCount = Math.max(1, Math.ceil(earnedAchievements.length / achievementPageSize));
    achievementPage = Math.max(0, Math.min(achievementPage, pageCount - 1));
    const visible = earnedAchievements.slice(achievementPage * achievementPageSize, (achievementPage + 1) * achievementPageSize);
    node.innerHTML = visible.length ? visible.map(item => `<article class="profile-reward-item collection-item-card collection-achievement-card"><span class="profile-achievement-icon" aria-hidden="true">${esc(item.icon || '🏆')}</span><div class="profile-reward-copy"><strong>${esc(item.title)}</strong><p>${esc(item.description || 'Навчальне досягнення')}</p></div></article>`).join('') : '<p class="achievement-intro collection-empty">Твої перші досягнення ще попереду. <a href="achievements.html">Переглянь список досягнень</a>.</p>';
    const controls = $('profileAchievementControls');
    if (controls) controls.hidden = earnedAchievements.length <= achievementPageSize;
    if ($('profileAchievementPage')) $('profileAchievementPage').textContent = `${achievementPage + 1} / ${pageCount}`;
    if ($('profileAchievementPrev')) $('profileAchievementPrev').disabled = achievementPage === 0;
    if ($('profileAchievementNext')) $('profileAchievementNext').disabled = achievementPage >= pageCount - 1;
  }
  function renderGoals() {
    const host = $('profileGoalList'); if (!host) return;
    const goals = readGoals();
    const done = goals.filter(goal => goal.done).length;
    if ($('profileGoalCount')) $('profileGoalCount').textContent = `${done}/${goals.length} ${plural(goals.length)}`;
    host.classList.toggle('has-scroll', goals.length > 2);
    host.innerHTML = goals.length ? goals.map((goal, index) => `<div class="profile-goal-item ${goal.done ? 'done' : ''}"><label><input type="checkbox" data-profile-goal-check="${index}" ${goal.done ? 'checked' : ''}><span>${esc(goal.text)}</span></label><button type="button" data-profile-goal-delete="${index}" aria-label="Видалити ціль">×</button></div>`).join('') : '<p class="achievement-intro profile-goal-empty">Додай першу ціль, щоб спланувати свій навчальний тиждень.</p>';
  }
  $('profileGoalForm')?.addEventListener('submit', event => {
    event.preventDefault(); const input = $('profileGoalInput'); const value = input?.value.trim(); if (!value) return;
    const goals = readGoals(); goals.push({ text: value, done: false, createdAt: new Date().toISOString() });
    if (writeGoals(goals)) { input.value = ''; renderGoals(); }
  });
  $('profileGoalList')?.addEventListener('change', event => {
    const control = event.target.closest('[data-profile-goal-check]'); if (!control) return;
    const goals = readGoals(), index = Number(control.dataset.profileGoalCheck); if (goals[index]) { goals[index].done = control.checked; writeGoals(goals); renderGoals(); }
  });
  $('profileGoalList')?.addEventListener('click', event => {
    const control = event.target.closest('[data-profile-goal-delete]'); if (!control) return;
    const goals = readGoals(); goals.splice(Number(control.dataset.profileGoalDelete), 1); writeGoals(goals); renderGoals();
  });
  function render() {
    const api = window.LearningGamification;
    if (!api) return;
    const p = api.profile();
    const catalog = lessons;
    const completed = p.completed || [];
    const doneCount = catalog.length ? completed.filter(id => catalog.some(l => l.id === id)).length : completed.length;
    const percent = catalog.length ? Math.min(100, Math.round(doneCount / catalog.length * 100)) : 0;
    if ($('profileAchievementCount')) $('profileAchievementCount').textContent = (p.achievements || []).length;
    // Серія рахується за календарними днями, у які учень уперше успішно завершив урок.
    const completionDays = [...new Set((p.ledger || [])
      .filter(entry => entry.type === 'lesson-base' && entry.at)
      .map(entry => { const date = new Date(entry.at); return Number.isNaN(date.getTime()) ? '' : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; })
      .filter(Boolean))].sort();
    const dayMs = 24 * 60 * 60 * 1000;
    const localDayKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const today = new Date();
    const todayKey = localDayKey(today);
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const yesterdayKey = localDayKey(yesterday);
    let currentStreak = 0, bestStreak = 0, runningStreak = 0, previousDay = null;
    const dayNumbers = completionDays.map(key => { const [y, m, d] = key.split('-').map(Number); return Math.floor(new Date(y, m - 1, d).getTime() / dayMs); });
    dayNumbers.forEach(day => {
      runningStreak = previousDay !== null && day === previousDay + 1 ? runningStreak + 1 : 1;
      bestStreak = Math.max(bestStreak, runningStreak);
      previousDay = day;
    });
    if (completionDays.includes(todayKey) || completionDays.includes(yesterdayKey)) {
      const latestDay = completionDays.includes(todayKey) ? Math.floor(new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() / dayMs) : Math.floor(yesterday.getTime() / dayMs);
      currentStreak = 1;
      for (let day = latestDay - 1; dayNumbers.includes(day); day--) currentStreak++;
    }
    if ($('profileStreakCurrent')) $('profileStreakCurrent').textContent = `${currentStreak} ${currentStreak === 1 ? 'день' : currentStreak >= 2 && currentStreak <= 4 ? 'дні' : 'днів'}`;
    if ($('profileStreakBest')) $('profileStreakBest').textContent = `Рекорд: ${bestStreak} ${bestStreak === 1 ? 'день' : bestStreak >= 2 && bestStreak <= 4 ? 'дні' : 'днів'}`;
    const xp = (completed.length * 50) + ((p.perfect || []).length * 20) + Object.values(p.lessonResults || {}).filter(r => Number(r.bestScore ?? r.score ?? 0) >= 70).length * 10;
    const level = Math.floor(xp / 150) + 1;
    const levelNames = ['Новачок', 'Дослідник', 'Практик', 'Майстер', 'Експерт', 'Легенда'];
    if ($('profileXp')) $('profileXp').textContent = `${xp} XP`;
    if ($('profileLevel')) $('profileLevel').textContent = `Рівень ${level} · ${levelNames[Math.min(level - 1, levelNames.length - 1)]}`;
    if ($('profileProgressPercent')) $('profileProgressPercent').textContent = `${percent}%`;
    if ($('profileProgressBar')) $('profileProgressBar').style.width = `${percent}%`;
    if ($('profileCompletedLabel')) $('profileCompletedLabel').textContent = `${doneCount} ${doneCount === 1 ? 'урок' : doneCount >= 2 && doneCount <= 4 ? 'уроки' : 'уроків'}`;
    if ($('profileTotalLabel')) $('profileTotalLabel').textContent = catalog.length ? `із ${catalog.length} доступних уроків` : 'доступних уроків';
    if ($('profileProgressText')) $('profileProgressText').textContent = doneCount ? 'Кожен урок наближає тебе до наступного відкриття.' : 'Твоя подорож тільки починається — обери перший урок!';
    const results = p.lessonResults || {};
    const nextLesson = catalog.find(item => !(completed || []).includes(item.id)) || catalog.find(item => Number(results[item.id]?.bestScore ?? results[item.id]?.score ?? 100) < 80);
    if ($('profileNextTitle')) $('profileNextTitle').textContent = nextLesson?.title || (doneCount ? 'Чудовий поступ!' : 'Обери перший урок');
    if ($('profileNextDescription')) $('profileNextDescription').textContent = nextLesson ? (nextLesson.description || 'Продовжуй навчатися крок за кроком.') : 'Спробуй нову тему або повтори те, що вже вивчив.';
    if ($('profileNextLink')) { $('profileNextLink').href = nextLesson?.url || 'index.html#lessons'; $('profileNextLink').textContent = nextLesson ? 'Перейти до уроку ↗' : 'Переглянути уроки ↗'; }
    if ($('profileRecommendationNote')) $('profileRecommendationNote').textContent = doneCount ? 'Порада: повертайся до тем, де результат був нижчим за 80%, і спробуй покращити його.' : 'Порада: почни з одного короткого уроку — результат збережеться в твоєму профілі.';
    renderGoals();
    const activity = $('profileActivityList');
    if (activity) {
      const entries = [...(p.ledger || [])].reverse().slice(0, 3);
      activity.innerHTML = entries.length ? entries.map(entry => {
        const amount = Number(entry.amount || 0);
        const amountLabel = amount > 0 ? `+🪙 ${amount}` : amount < 0 ? `−🪙 ${Math.abs(amount)}` : '';
        const date = entry.at ? new Date(entry.at).toLocaleString('uk-UA', { dateStyle: 'medium', timeStyle: 'short' }) : '';
        return `<article class="profile-activity-item"><span class="profile-activity-icon" aria-hidden="true">${activityIcon(entry)}</span><div class="profile-activity-copy"><strong>${esc(activityTitle(entry))}</strong><p>${esc(entry.description || '')}${date ? ` · ${esc(date)}` : ''}</p></div><span class="profile-activity-amount">${amountLabel}</span></article>`;
      }).join('') : '<p class="achievement-intro">Тут з’являться події після проходження уроків або відкриття нагород.</p>';
    }
    const rewardIcons = { 'avatar-neon': '🌈', 'profile-frame': '🖼️', 'hint-token': '💡', 'title-inventor': '🏅' };
    const itemsNode = $('profileRewards');
    const purchases = p.purchases || [];
    const activePurchases = purchases.filter(item => item.status !== 'consumed');
    const itemGroups = [...new Map(activePurchases.map(item => [item.itemId, activePurchases.filter(other => other.itemId === item.itemId)])).entries()];
    if ($('profileItemCount')) $('profileItemCount').textContent = activePurchases.length;
    if (itemsNode) {
      itemsNode.innerHTML = itemGroups.length ? itemGroups.map(([itemId, group]) => {
        const item = group[group.length - 1];
        const icon = rewardIcons[itemId] || '✨';
        const date = item.purchasedAt ? new Date(item.purchasedAt).toLocaleDateString('uk-UA') : '';
        const quantity = group.length;
        return `<article class="profile-reward-item collection-item-card"><span aria-hidden="true">${icon}</span><div class="profile-reward-copy"><strong>${esc(item.title || 'Навчальна нагорода')}</strong><p>${date ? `Останнє отримання: ${esc(date)}` : 'Нагороду отримано'}</p>${item.type === 'utility' || itemId === 'hint-token' ? `<small class="collection-quantity">×${quantity} на акаунті</small>` : ''}</div></article>`;
      }).join('') : '<p class="achievement-intro collection-empty">Поки що предметів немає. <a href="achievements.html#rewards">Переглянь простір нагород</a>.</p>';
    }
    const earnedIds = new Set(p.achievements || []);
    earnedAchievements = (api.achievements || []).filter(item => earnedIds.has(item.id));
    if ($('profileEarnedCount')) $('profileEarnedCount').textContent = earnedAchievements.length;
    renderAchievementCarousel();
  }
  $('profileAchievementPrev')?.addEventListener('click', () => { achievementPage--; renderAchievementCarousel(); });
  $('profileAchievementNext')?.addEventListener('click', () => { achievementPage++; renderAchievementCarousel(); });

  const RESET_KEYS = ['learning-lab-profile-v2', 'learning-lab-completed', 'learning-lab-weekly-goals-v1', 'learningLabLocalProfile'];
  $('resetProgressButton')?.addEventListener('click', async () => {
    const confirmed = window.confirm('Скинути весь навчальний прогрес цього акаунта? Буде видалено комп’юшки, завершені уроки, результати, досягнення, покупки та навчальні цілі. Цю дію неможливо скасувати.');
    if (!confirmed) return;
    const button = $('resetProgressButton');
    button.disabled = true;
    const feedback = $('profileAccountFeedback');
    try {
      if (window.FIREBASE_ENABLED) {
        const [{ auth, db }, authApi, store] = await Promise.all([
          import('./firebase-client.js'),
          import('https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js'),
          import('https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js')
        ]);
        const user = authApi.getAuth ? auth.currentUser : null;
        if (user) {
          await store.setDoc(store.doc(db, 'users', user.uid, 'privateData', 'progress'), {
            profile: { coins: 0, completed: [], perfect: [], achievements: [], lessonRewards: {}, lessonResults: {}, purchases: [], ledger: [] },
            updatedAt: store.serverTimestamp()
          });
        }
      }
      RESET_KEYS.forEach(key => localStorage.removeItem(key));
      window.dispatchEvent(new Event('storage'));
      if (feedback) feedback.textContent = 'Навчальний прогрес скинуто.';
      window.location.reload();
    } catch (error) {
      console.error('Не вдалося скинути прогрес:', error);
      if (feedback) feedback.textContent = 'Не вдалося скинути хмарний прогрес. Перевір підключення та правила Firestore і спробуй ще раз.';
      button.disabled = false;
    }
  });
  showFreshTip();
  initAccount();
  window.addEventListener('storage', render);
  window.addEventListener('learningcatalogready', render);
  fetch('data/lessons.json').then(response => response.ok ? response.json() : Promise.reject()).then(data => { lessons = Array.isArray(data) ? data : (data.lessons || []); render(); }).catch(() => { lessons = []; render(); });
  document.addEventListener('DOMContentLoaded', render);
  render();
})();
