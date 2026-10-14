(() => {
  "use strict";
  const shell = document.querySelector(".app-shell");
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("mobileMenu");
  const scrim = document.getElementById("mobileScrim");
  if (!shell || !sidebar || !toggle) return;

  const desktopQuery = window.matchMedia("(min-width: 761px)");
  const storageKey = "learning-lab-sidebar-collapsed";
  const isDesktop = () => desktopQuery.matches;
  const readCollapsed = () => {
    try { return localStorage.getItem(storageKey) === "true"; }
    catch (_) { return false; }
  };

  function setOpen(open, persist = true) {
    if (isDesktop()) {
      shell.classList.toggle("sidebar-collapsed", !open);
      sidebar.classList.remove("open");
      scrim?.classList.remove("show");
      if (persist) {
        try { localStorage.setItem(storageKey, open ? "false" : "true"); } catch (_) { }
      }
    } else {
      shell.classList.remove("sidebar-collapsed");
      sidebar.classList.toggle("open", open);
      scrim?.classList.toggle("show", open);
    }
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Закрити меню" : (isDesktop() ? "Розгорнути бічну панель" : "Відкрити меню"));
    toggle.title = open ? "Закрити меню" : (isDesktop() ? "Розгорнути бічну панель" : "Відкрити меню");
  }

  setOpen(isDesktop() ? !readCollapsed() : false, false);
  toggle.addEventListener("click", () => {
    const currentlyOpen = isDesktop()
      ? !shell.classList.contains("sidebar-collapsed")
      : sidebar.classList.contains("open");
    setOpen(!currentlyOpen);
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
  const onViewportChange = () => setOpen(isDesktop() ? !readCollapsed() : false, false);
  if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", onViewportChange);
  else window.addEventListener("resize", onViewportChange);
})();
