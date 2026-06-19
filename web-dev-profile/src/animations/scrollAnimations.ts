export function initScrollAnimations(): void {
  const animatedElements = document.querySelectorAll<HTMLElement>(
    ".reveal, .reveal-left, .reveal-right",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.18,
    },
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}
