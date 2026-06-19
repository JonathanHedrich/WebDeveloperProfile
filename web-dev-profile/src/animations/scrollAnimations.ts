export function initScrollAnimations(): void {
  const revealElements = document.querySelectorAll<HTMLElement>('.reveal');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealElements.forEach(element => {
    observer.observe(element);
  });
}