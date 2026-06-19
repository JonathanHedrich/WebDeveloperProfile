export function initPreloader(): void {
  const preloader = document.querySelector<HTMLDivElement>("#preloader");
  const loaderPill = document.querySelector<HTMLDivElement>("#loader-pill");
  const progress = document.querySelector<HTMLDivElement>("#loader-progress");
  const percent = document.querySelector<HTMLSpanElement>("#loader-percent");
  const loaderText = document.querySelector<HTMLElement>("#loader-text");
  const appContent = document.querySelector<HTMLDivElement>("#main-content");

  if (
    !preloader ||
    !loaderPill ||
    !progress ||
    !percent ||
    !loaderText ||
    !appContent
  ) {
    return;
  }

  let value = 0;

  const createLetterSpans = (text: string): string => {
    return text
      .split("")
      .map((letter, index) => {
        return `<span style="--delay: ${index * 0.045}s">${letter}</span>`;
      })
      .join("");
  };

  const loadingInterval = window.setInterval(() => {
    value += 1;

    progress.style.width = `${value}%`;
    percent.textContent = `${value}%`;

    if (value >= 100) {
      clearInterval(loadingInterval);

      window.setTimeout(() => {
        loaderText.innerHTML = createLetterSpans("WILLKOMMEN");
        percent.style.display = "none";
        loaderPill.classList.add("loader-complete");
      }, 300);

      window.setTimeout(() => {
        loaderText.classList.add("loader-dissolve");
      }, 900);

      window.setTimeout(() => {
        preloader.classList.add("preloader-zoom");
      }, 1700);

      window.setTimeout(() => {
        appContent.classList.add("content-visible");
        preloader.classList.add("preloader-hidden");
      }, 2700);

      window.setTimeout(() => {
        preloader.remove();
      }, 3700);
    }
  }, 22);
}
