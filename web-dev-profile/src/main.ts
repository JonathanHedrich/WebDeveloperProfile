import "./styles/global.css";
import "./styles/preloader.css";
import "./styles/animations.css";
import "./styles/responsive.css";
import "devicon/devicon.min.css";

import { CONFIG } from "./config";

import { Preloader } from "./components/preloader";
import { Navbar } from "./components/navbar";

import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { Experience } from "./sections/experience";
import { Skills } from "./sections/skills";
import { Projects } from "./sections/projects";

import { initPreloader } from "./animations/preloader";
import { initParticleNetwork } from "./animations/particleNetwork";
import { initScrollAnimations } from "./animations/scrollAnimations";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App element not found");
}

app.innerHTML = `
  ${Preloader()}

  <div id="site-shell" class="site-shell">
    ${Navbar()}

    <main id="main-content" class="main-content">
      ${Hero()}
      ${About()}
      ${Experience()}
      ${Skills()}
      ${Projects()}
    </main>
  </div>
`;

/* ==========================================
   Website-Animationen
========================================== */

initScrollAnimations();

initParticleNetwork({
  selector: "#skills-particle-canvas",
  particleCount: 210,
  maxDistance: 105,
  mouseDistance: 220,
  speed: 0.55,
  particleColor: "220, 210, 255",
  lineColor: "160, 110, 255",
  mouseLineColor: "34, 211, 238",
});

/* ==========================================
   Preloader
========================================== */

if (CONFIG.development.skipPreloader) {
  document.querySelector("#preloader")?.remove();

  document.querySelector("#site-shell")?.classList.add("site-visible");

  document.querySelector("#main-content")?.classList.add("content-visible");
} else {
  const preloaderParticles = initParticleNetwork({
    selector: "#preloader-particle-canvas",
    particleCount: 85,
    maxDistance: 145,
    mouseDistance: 180,
    speed: 0.45,
    particleColor: "255, 255, 255",
    lineColor: "255, 255, 255",
    mouseLineColor: "139, 92, 246",
  });

  initPreloader();

  /*
   * Dein Preloader wird nach ungefähr 3,7 Sekunden entfernt.
   * Anschließend stoppen wir auch dessen Animationsschleife.
   */
  window.setTimeout(() => {
    preloaderParticles?.destroy();
  }, 4000);
}
