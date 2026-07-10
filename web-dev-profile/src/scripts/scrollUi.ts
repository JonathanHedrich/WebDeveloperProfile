export function initScrollUi(): void {
  const progressFill = document.querySelector<HTMLDivElement>(
    "#scroll-progress-fill",
  );

  const backToTop = document.querySelector<HTMLButtonElement>("#back-to-top");

  if (!progressFill || !backToTop) {
    return;
  }

  let ticking = false;

  const updateScrollUi = (): void => {
    const scrollTop = window.scrollY;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollableHeight > 0 ? Math.min(scrollTop / scrollableHeight, 1) : 0;

    progressFill.style.transform = `scaleY(${progress})`;

    backToTop.classList.toggle("visible", scrollTop > 500);

    ticking = false;
  };

  const requestUpdate = (): void => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateScrollUi);
  };

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", requestUpdate, {
    passive: true,
  });

  window.addEventListener("resize", requestUpdate);

  window.requestAnimationFrame(updateScrollUi);
}
