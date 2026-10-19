(function () {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  const message = document.getElementById('shopMessage');
  const owned = document.getElementById('ownedItems');
  const icons = {
    'course-focus': '🧠', 'course-stem': '🔬', 'course-digital': '💻',
    'resource-planner': '🗓️', 'resource-notes': '📝', 'resource-flashcards': '🧩'
  };
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  let activeCategory = 'all';
  let toastTimer = null;
  function showToast(text, success) {
    if (!message) return;
    message.hidden = false;
    message.textContent = text;
    message.classList.toggle('reward-error', !success);
    message.classList.toggle('reward-success', !!success);
    message.classList.remove('toast-visible');
    requestAnimationFrame(() => message.classList.add('toast-visible'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      message.classList.remove('toast-visible');
      setTimeout(() => { message.hidden = true; }, 220);
    }, 4200);
  }
  function render() {
    const api = window.LearningGamification;
    if (!api) return;
    const profile = api.profile();
    const items = api.getShopItems();
    document.querySelectorAll('[data-coins]').forEach(node => { node.textContent = profile.coins; });
    const visibleItems = items.filter(item => activeCategory === 'all' || item.category === activeCategory);
    grid.innerHTML = visibleItems.map(item => `
      <article class="reward-card ${item.owned ? 'is-owned' : ''}">
        <div class="reward-art reward-art-${esc(item.art)}" aria-hidden="true"><span class="reward-art-spark spark-one">✦</span><span class="reward-art-icon">${icons[item.id] || '📘'}</span><span class="reward-art-spark spark-two">✧</span></div>
        <div class="reward-card-body">
          <span class="reward-category-label">${item.category === 'course' ? '🎓 Навчальний курс' : '📚 Цифровий матеріал'}</span>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.description)}</p>
          <div class="reward-card-footer"><strong class="reward-price">🪙 ${item.price} <small>комп’юшок</small></strong><span class="reward-available">${item.owned ? '✓ Уже придбано' : 'Можеш придбати'}</span></div>
          <button class="reward-open-button" type="button" data-buy="${esc(item.id)}" ${item.owned ? 'disabled' : ''}>${item.owned ? '✓ У твоїх покупках' : 'Придбати за ' + item.price + ' 🪙'}</button>
        </div>
      </article>`).join('');
    if (!visibleItems.length) grid.innerHTML = '<p class="achievement-intro">У цій категорії поки немає нагород.</p>';

    const purchases = [...(profile.purchases || [])].filter(item => item.status !== 'consumed').sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt));
    if (owned) {
      owned.innerHTML = purchases.length ? purchases.map(item => `
        <article class="owned-reward owned-reward-card"><span class="owned-reward-icon" aria-hidden="true">${icons[item.itemId] || '📘'}</span><div><strong>${esc(item.title)}</strong><p>Придбано ${item.purchasedAt ? new Date(item.purchasedAt).toLocaleDateString('uk-UA') : 'щойно'}</p><span class="owned-price">Вартість: 🪙 ${Number(item.price) || 0}</span></div><span class="owned-check" aria-label="Придбано">✓</span></article>`).join('') : '<div class="owned-empty"><span aria-hidden="true">🎒</span><strong>Тут з’являться твої покупки</strong><p>Обери курс або корисний навчальний матеріал у Просторі нагород.</p></div>';
    }
    const count = document.getElementById('ownedCount');
    if (count) count.textContent = `${purchases.length} ${purchases.length === 1 ? 'покупка' : purchases.length > 1 && purchases.length < 5 ? 'покупки' : 'покупок'}`;
  }
  document.querySelectorAll('.reward-filter').forEach(button => button.addEventListener('click', () => {
    activeCategory = button.dataset.category || 'all';
    document.querySelectorAll('.reward-filter').forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    render();
  }));
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-buy]');
    if (!button) return;
    const itemId = button.dataset.buy;
    const item = (window.LearningGamification?.getShopItems() || []).find(entry => entry.id === itemId);
    if (!item || item.owned) return;
    if (window.LearningGamification.profile().coins < item.price) {
      showToast(`Не вистачає ${item.price - window.LearningGamification.profile().coins} комп’юшок. Зароби ще монети за навчання й спробуй знову!`, false);
      return;
    }
    const confirmed = window.confirm(`Придбати «${item.title}» за ${item.price} комп’юшок?`);
    if (!confirmed) return;
    button.disabled = true;
    Promise.resolve(window.LearningGamification.purchaseReward(itemId)).then(result => {
      if (result.success) showToast(`🎉 Покупку підтверджено! «${item.title}» додано до секції «Мої покупки».`, true);
      else showToast(result.message || 'Не вдалося виконати покупку. Спробуй ще раз.', false);
      render();
    }).catch(error => {
      showToast(error.message || 'Не вдалося виконати покупку. Перевір з’єднання й спробуй ще раз.', false);
    }).finally(() => { button.disabled = false; });
  });
  window.addEventListener('storage', render);
  window.addEventListener('learninglab:cloud-restored', render);
  window.addEventListener('learninglab:progress-changed', render);
  document.addEventListener('DOMContentLoaded', render);
  render();
})();