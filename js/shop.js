(function () {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  const message = document.getElementById('shopMessage');
  const owned = document.getElementById('ownedItems');
  const icons = { 'avatar-neon': '🌈', 'profile-frame': '🖼️', 'hint-token': '💡', 'title-inventor': '🏅' };
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

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
    toastTimer = setTimeout(() => { message.classList.remove('toast-visible'); setTimeout(() => { message.hidden = true; }, 220); }, 3200);
  }
  const OWNED_PAGE_SIZE = 4;
  function render() {
    const api = window.LearningGamification;
    if (!api) return;
    const profile = api.profile();
    const items = api.getShopItems();
    document.querySelectorAll('[data-coins]').forEach(node => { node.textContent = profile.coins; });
    grid.innerHTML = items.map(item => `
      <article class="achievement reward-item ${item.owned ? 'earned' : 'locked'}">
        <span class="achievement-icon" aria-hidden="true">${icons[item.id] || '✨'}</span>
        <div class="achievement-copy"><strong>${esc(item.title)}</strong><p>${esc(item.description)}</p><span class="reward-cost">🪙 ${item.price} комп’юшок</span>${item.type === 'utility' && item.quantity ? `<span class="reward-quantity">×${item.quantity} на акаунті</span>` : ''}</div>
        <button class="reward-open-button" type="button" data-buy="${esc(item.id)}" ${item.owned ? 'disabled' : ''}>${item.owned ? '🔓 Отримано' : 'Відкрити'}</button>
      </article>`).join('');
    const ownedCarousel = document.getElementById('ownedCarousel');
    const ownedItems = profile.purchases || [];
    if (ownedCarousel && owned) {
      const pages = Math.max(1, Math.ceil(ownedItems.length / OWNED_PAGE_SIZE));
      let page = Math.max(0, Math.min(pages - 1, Number(ownedCarousel.dataset.page || 0)));
      ownedCarousel.dataset.page = String(page);
      owned.innerHTML = ownedItems.length
        ? ownedItems.slice(page * OWNED_PAGE_SIZE, page * OWNED_PAGE_SIZE + OWNED_PAGE_SIZE).map(item => `<article class="owned-reward"><span aria-hidden="true">${icons[item.itemId] || '✨'}</span><div><strong>${esc(item.title)}</strong><p>Відкрито ${new Date(item.purchasedAt).toLocaleDateString('uk-UA')}</p></div></article>`).join('')
        : '<p class="achievement-intro">Поки що нагород не відкрито. Обери першу нагороду, коли назбираєш достатньо комп’юшок!</p>';
      const pageLabel = document.getElementById('ownedPage'); if (pageLabel) pageLabel.textContent = `${page + 1} / ${pages}`;
      const prev = document.getElementById('ownedPrev'), next = document.getElementById('ownedNext');
      if (prev) prev.disabled = page === 0 || ownedItems.length === 0;
      if (next) next.disabled = page >= pages - 1 || ownedItems.length === 0;
    } else if (owned) {
      owned.innerHTML = ownedItems.map(item => `<article class="owned-reward"><span aria-hidden="true">${icons[item.itemId] || '✨'}</span><div><strong>${esc(item.title)}</strong><p>Відкрито ${new Date(item.purchasedAt).toLocaleDateString('uk-UA')}</p></div></article>`).join('') || '<p class="achievement-intro">Поки що нагород не відкрито.</p>';
    }
  }

  document.getElementById('ownedPrev')?.addEventListener('click', () => { const c = document.getElementById('ownedCarousel'); c.dataset.page = String(Math.max(0, Number(c.dataset.page || 0) - 1)); render(); });
  document.getElementById('ownedNext')?.addEventListener('click', () => { const c = document.getElementById('ownedCarousel'); const total = (window.LearningGamification?.profile().purchases || []).length; c.dataset.page = String(Math.min(Math.max(0, Math.ceil(total / OWNED_PAGE_SIZE) - 1), Number(c.dataset.page || 0) + 1)); render(); });
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-buy]');
    if (!button) return;
    const result = window.LearningGamification.purchaseReward(button.dataset.buy);
    showToast(result.message, result.success);
    render();
  });
  window.addEventListener('storage', render);
  document.addEventListener('DOMContentLoaded', render);
  render();
})();