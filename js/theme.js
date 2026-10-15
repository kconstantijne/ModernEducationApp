(() => {
  "use strict";
  const root = document.documentElement;
  const key = "learning-lab-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const readSaved = () => { try { return localStorage.getItem(key); } catch (_) { return null; } };

  function prepareButtons() {
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.setAttribute("aria-pressed", "false");
      const svgIcon = button.querySelector(".theme-icon");
      if (svgIcon && svgIcon.tagName.toLowerCase() === "svg") {
        const replacement = document.createElement("span");
        replacement.className = "theme-icon top-theme-icon";
        replacement.setAttribute("aria-hidden", "true");
        replacement.textContent = "◐";
        svgIcon.replaceWith(replacement);
      }
      if (button.querySelector(".theme-switch-track")) return;
      const hasSidebarLabel = Boolean(button.querySelector(".theme-label")) || /Змінити тему/i.test(button.textContent || "");
      if ((button.classList.contains("sidebar-theme-toggle") || button.classList.contains("theme-toggle")) && hasSidebarLabel) {
        let track = button.querySelector(".toggle-track");
        if (!track) {
          track = document.createElement("span");
          track.className = "toggle-track theme-switch-track";
          track.setAttribute("aria-hidden", "true");
          track.innerHTML = "<i></i>";
          button.appendChild(track);
        } else track.classList.add("theme-switch-track");
      } else {
        // Preserve the button and replace only its icon (some lesson pages use SVG here).
        let icon = button.querySelector(".theme-icon");
        if (!icon || icon.tagName.toLowerCase() === "svg") {
          const replacement = document.createElement("span");
          replacement.className = "theme-icon top-theme-icon";
          replacement.setAttribute("aria-hidden", "true");
          replacement.textContent = "◐";
          if (icon) icon.replaceWith(replacement);
          else { button.textContent = ""; button.appendChild(replacement); }
          icon = replacement;
        } else {
          icon.classList.add("top-theme-icon");
        }
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