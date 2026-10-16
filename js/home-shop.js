(() => {
  const grid = document.getElementById('homeRewardGrid');
  if (!grid) return;
  const icons = { 'avatar-neon': '🌈', 'profile-frame': '🖼️', 'hint-token': '💡', 'title-inventor': '🏅' };
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function render() {
    const api = window.LearningGamification;
    if (!api) return;
    const items = api.getShopItems().slice(0, 3);
    if (!items.length) return;
    grid.innerHTML = items.map(item => `<article class="reward-preview"><span class="reward-preview-icon" aria-hidden="true">${icons[item.id] || '✨'}</span><div class="reward-preview-copy"><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><span class="reward-cost">🪙 ${item.price} комп’юшок</span></div></article>`).join('');
    document.querySelectorAll('[data-coins]').forEach(node => node.textContent = api.profile().coins);
  }
  document.addEventListener('DOMContentLoaded', render);
  window.addEventListener('storage', render);
  render();
})();
