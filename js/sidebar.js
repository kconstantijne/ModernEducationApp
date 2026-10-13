(() => {
  "use strict";
  const shell = document.querySelector(".app-shell");
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("mobileMenu");
  const scrim = document.getElementById("mobileScrim");
  const desktopQuery = window.matchMedia("(min-width: 761px)");
  const storageKey = "learning-lab-sidebar-collapsed";
  if (!shell || !sidebar || !toggle) return;
  const isDesktop = () => desktopQuery.matches;

  function setOpen(open, persist = true) {
    if (isDesktop()) {
      shell.classList.toggle("sidebar-collapsed", !open);
      sidebar.classList.remove("open");
      scrim?.classList.remove("show");
      if (persist) {
        try { localStorage.setItem(storageKey, open ? "false" : "true"); } catch (_) {}
      }
    } else {
      sidebar.classList.toggle("open", open);
      scrim?.classList.toggle("show", open);
      shell.classList.remove("sidebar-collapsed");
    }
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Згорнути бічну панель" : "Відкрити бічну панель");
    toggle.title = open ? "Згорнути бічну панель" : "Відкрити бічну панель";
    toggle.classList.toggle("is-open", open);
  }

  let collapsed = false;
  try { collapsed = localStorage.getItem(storageKey) === "true"; } catch (_) {}
  if (isDesktop()) setOpen(!collapsed, false);
  else setOpen(false, false);

  toggle.addEventListener("click", () => {
    const open = isDesktop()
      ? !shell.classList.contains("sidebar-collapsed")
      : sidebar.classList.contains("open");
    setOpen(!open);
  });
  scrim?.addEventListener("click", () => setOpen(false));
  sidebar.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    if (!isDesktop()) setOpen(false, false);
  }));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !isDesktop() && sidebar.classList.contains("open")) {
      setOpen(false, false); toggle.focus();
    }
  });
  const viewportChanged = () => {
    if (isDesktop()) {
      let isCollapsed = false;
      try { isCollapsed = localStorage.getItem(storageKey) === "true"; } catch (_) {}
      setOpen(!isCollapsed, false);
    } else setOpen(false, false);
  };
  if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", viewportChanged);
  else window.addEventListener("resize", viewportChanged);
})();