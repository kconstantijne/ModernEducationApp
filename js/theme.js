(() => {
  "use strict";
  const root = document.documentElement;
  const key = "learning-lab-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const readSaved = () => { try { return localStorage.getItem(key); } catch (_) { return null; } };

  function prepareButtons() {
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.setAttribute("aria-pressed", "false");
      if (button.querySelector(".theme-switch-track")) return;
      if (button.classList.contains("sidebar-theme-toggle") || button.classList.contains("theme-toggle")) {
        let track = button.querySelector(".toggle-track");
        if (!track) {
          track = document.createElement("span");
          track.className = "toggle-track theme-switch-track";
          track.setAttribute("aria-hidden", "true");
          track.innerHTML = "<i></i>";
          button.appendChild(track);
        } else track.classList.add("theme-switch-track");
      } else {
        // Wrap the icon glyph so the top-bar control can animate independently.
        const icon = document.createElement("span");
        icon.className = "theme-icon top-theme-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "◐";
        button.textContent = "";
        button.appendChild(icon);
      }
    });
  }

  function apply(theme) {
    const actual = theme === "system" ? (media.matches ? "dark" : "light") : theme;
    root.dataset.theme = actual;
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      const dark = actual === "dark";
      button.classList.toggle("is-dark", dark);
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute("aria-label", dark ? "Увімкнути світлу тему" : "Увімкнути темну тему");
      button.title = dark ? "Увімкнути світлу тему" : "Увімкнути темну тему";
      const icon = button.querySelector(".theme-icon");
      if (icon) {
        icon.textContent = dark ? "☀" : "☾";
        icon.classList.toggle("is-sun", dark);
      }
      const track = button.querySelector(".theme-switch-track");
      if (track) track.setAttribute("aria-hidden", "true");
    });
  }

  function init() {
    prepareButtons();
    apply(readSaved() || "system");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  media.addEventListener?.("change", () => {
    const saved = readSaved();
    if (!saved || saved === "system") apply("system");
  });

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-theme-toggle]");
    if (!button) return;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(key, next); } catch (_) {}
    apply(next);
  });
})();