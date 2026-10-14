(() => {
  "use strict";
  const track = document.getElementById("lessonGrid");
  if (!track) return;
  const prev = document.querySelector(".lesson-slider-prev");
  const next = document.querySelector(".lesson-slider-next");
  const step = () => {
    const card = track.querySelector(".lesson-card");
    if (!card) return Math.max(240, track.clientWidth * .8);
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap) || 16;
    return card.getBoundingClientRect().width + gap;
  };
  prev?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") { event.preventDefault(); track.scrollBy({ left: step(), behavior: "smooth" }); }
    if (event.key === "ArrowLeft") { event.preventDefault(); track.scrollBy({ left: -step(), behavior: "smooth" }); }
  });
  const update = () => {
    if (!prev || !next) return;
    const max = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
    const controls = document.querySelector(".lesson-slider-controls");
    if (controls) controls.hidden = track.querySelectorAll(".lesson-card").length < 2;
  };
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  document.addEventListener("learning:catalog-ready", () => requestAnimationFrame(update));
  const observer = new MutationObserver(() => requestAnimationFrame(update));
  observer.observe(track, { childList: true });
  requestAnimationFrame(update);
})();
