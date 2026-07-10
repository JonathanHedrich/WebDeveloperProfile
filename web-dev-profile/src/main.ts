import "./styles/global.css";
import "./styles/preloader.css";
import "./styles/animations.css";
import "./styles/responsive.css";

import { CONFIG } from "./config";

import { Preloader } from "./components/preloader";
import { Navbar } from "./components/navbar";

import { Hero } from "./sections/hero";
import { About } from "./sections/about";
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
      ${Skills()}
      ${Projects()}
    </main>
  </div>
`;

/* ==========================================
   Animationen initialisieren
========================================== */

initParticleNetwork();
initScrollAnimations();

/* ==========================================
   Development Mode
========================================== */

if (CONFIG.development.skipPreloader) {
  document.querySelector("#preloader")?.remove();

  document.querySelector("#site-shell")?.classList.add("site-visible");

  document.querySelector("#main-content")?.classList.add("content-visible");
} else {
  initPreloader();
}
