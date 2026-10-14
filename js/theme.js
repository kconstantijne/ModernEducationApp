(() => {
  const root = document.documentElement;
  const key = "learning-lab-theme";
  let saved = null;
  try { saved = localStorage.getItem(key); } catch (_) { }
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  function apply(theme) {
    const actual = theme === "system" ? (media.matches ? "dark" : "light") : theme;
    root.dataset.theme = actual;
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.setAttribute("aria-label", actual === "dark" ? "Увімкнути світлу тему" : "Увімкнути темну тему");
      const track = button.querySelector(".toggle-track");
      if (track) track.style.background = actual === "dark" ? "rgba(139,114,223,.25)" : "";
      const icon = button.querySelector(".theme-icon");
      if (icon) icon.textContent = actual === "dark" ? "☀" : "☾";
    });
  }
  apply(saved || "system");
  media.addEventListener?.("change", () => {
    let current = null; try { current = localStorage.getItem(key); } catch (_) { }
    if (!current || current === "system") apply("system");
  });
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-theme-toggle]");
    if (!button) return;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(key, next); } catch (_) { }
    apply(next);
  });
})();