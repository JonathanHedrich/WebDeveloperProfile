export function initScrollAnimations(): void {
  const animatedElements = Array.from(
    document.querySelectorAll<HTMLElement>(".reveal"),
  );

  if (animatedElements.length === 0) {
    return;
  }

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateElements = (): void => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const isScrollingDown = currentScrollY >= lastScrollY;

    // Früher einblenden
    const revealPoint = viewportHeight * 0.94;

    // Beim Hochscrollen früher abbauen
    const hidePoint = viewportHeight * 0.82;

    animatedElements.forEach((element) => {
      const rect = element.getBoundingClientRect();

      if (isScrollingDown) {
        const entersViewport = rect.top < revealPoint && rect.bottom > 0;

        if (entersViewport) {
          element.classList.add("active");
        }

        return;
      }

      const exitsAtBottom = rect.top >= hidePoint;

      if (exitsAtBottom) {
        element.classList.remove("active");
      } else if (rect.bottom > 0 && rect.top < viewportHeight) {
        element.classList.add("active");
      }
    });

    lastScrollY = currentScrollY;
    ticking = false;
  };

  const requestUpdate = (): void => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateElements);
  };

  window.addEventListener("scroll", requestUpdate, {
    passive: true,
  });

  window.addEventListener("resize", requestUpdate);

  window.requestAnimationFrame(updateElements);
}
