(() => {
  "use strict";
  const track = document.getElementById("subjectSlider");
  if (!track) return;
  const prev = document.querySelector(".subject-slider-prev");
  const next = document.querySelector(".subject-slider-next");
  const step = () => {
    const card = track.querySelector(".subject-card");
    if (!card) return Math.max(240, track.clientWidth * .8);
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
    return card.getBoundingClientRect().width + gap;
  };
  prev?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") { event.preventDefault(); track.scrollBy({ left: step(), behavior: "smooth" }); }
    if (event.key === "ArrowLeft") { event.preventDefault(); track.scrollBy({ left: -step(), behavior: "smooth" }); }
  });
  const updateButtons = () => {
    if (!prev || !next) return;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  };
  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  requestAnimationFrame(updateButtons);
})();
