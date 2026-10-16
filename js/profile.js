(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const activityIcon = (entry) => entry.type === 'shop-purchase' ? '🎁' : entry.type === 'lesson-improvement' ? '📈' : '🪙';
  const activityTitle = (entry) => entry.type === 'shop-purchase' ? 'Відкрито нагороду' : entry.type === 'lesson-improvement' ? 'Покращено результат уроку' : entry.type === 'lesson-base' ? 'Успішно завершено урок' : 'Навчальна активність';
  const PROFILE_KEY = 'learningLabLocalProfile';
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
        $('accountStatus').textContent = 'Гостьовий режим · дані зберігаються на цьому пристрої';
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
    $('loginPromptButton')?.addEventListener('click', () => $('loginInfoDialog')?.showModal());
    $('closeLoginInfo')?.addEventListener('click', () => $('loginInfoDialog')?.close());
    $('loginInfoDialog')?.addEventListener('click', (event) => { if (event.target === $('loginInfoDialog')) $('loginInfoDialog').close(); });
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
  function render() {
    const api = window.LearningGamification;
    if (!api) return;
    const p = api.profile();
    const catalog = window.lessonCatalog || [];
    const completed = p.completed || [];
    const doneCount = catalog.length ? completed.filter(id => catalog.some(l => l.id === id)).length : completed.length;
    const percent = catalog.length ? Math.min(100, Math.round(doneCount / catalog.length * 100)) : 0;
    if ($('profileAchievementCount')) $('profileAchievementCount').textContent = (p.achievements || []).length;
    if ($('profileProgressPercent')) $('profileProgressPercent').textContent = `${percent}%`;
    if ($('profileProgressBar')) $('profileProgressBar').style.width = `${percent}%`;
    if ($('profileCompletedLabel')) $('profileCompletedLabel').textContent = `${doneCount} ${doneCount === 1 ? 'урок' : doneCount >= 2 && doneCount <= 4 ? 'уроки' : 'уроків'}`;
    if ($('profileTotalLabel')) $('profileTotalLabel').textContent = catalog.length ? `із ${catalog.length} доступних уроків` : 'доступних уроків';
    if ($('profileProgressText')) $('profileProgressText').textContent = doneCount ? 'Кожен урок наближає тебе до наступного відкриття.' : 'Твоя подорож тільки починається — обери перший урок!';
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
  showFreshTip();
  initAccount();
  window.addEventListener('storage', render);
  window.addEventListener('learningcatalogready', render);
  document.addEventListener('DOMContentLoaded', render);
  render();
})();
