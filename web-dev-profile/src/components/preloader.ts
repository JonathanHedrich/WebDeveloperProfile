export function Preloader(): string {
  return `
    <div id="preloader" class="preloader">
      <canvas id="particle-canvas"></canvas>

      <div class="preloader-name">
        Jonathan Hedrich
      </div>

      <div class="marquee marquee-top">
        <div class="marquee-track marquee-left">
          <span>WEB DEVELOPER • WEB DEVELOPER • WEB DEVELOPER • WEB DEVELOPER •</span>
        </div>
      </div>

      <div class="marquee marquee-bottom">
        <div class="marquee-track marquee-right">
          <span>FRONTEND DEVELOPER • FRONTEND DEVELOPER • FRONTEND DEVELOPER • FRONTEND DEVELOPER •</span>
        </div>
      </div>

      <div id="loader-pill" class="loader-pill">
        <strong id="loader-text">
          <span>LOADING</span>
        </strong>

        <span id="loader-percent">0%</span>

        <div class="loader-bar">
          <div id="loader-progress"></div>
        </div>
      </div>
    </div>
  `;
}
