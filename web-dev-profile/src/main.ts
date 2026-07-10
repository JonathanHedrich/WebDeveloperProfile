import "./styles/global.css";
import "./styles/preloader.css";
import "./styles/animations.css";
import "./styles/responsive.css";

import "devicon/devicon.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { CONFIG } from "./config";

import { Preloader } from "./components/preloader";
import { Navbar } from "./components/navbar";
import { ScrollUi } from "./components/scrollUI";

import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { Experience } from "./sections/experience";
import { Skills } from "./sections/skills";
import { Projects } from "./sections/projects";
import { Contact } from "./sections/contact";
import { Footer } from "./sections/footer";

import { initPreloader } from "./animations/preloader";
import { initParticleNetwork } from "./animations/particleNetwork";
import { initScrollAnimations } from "./animations/scrollAnimations";

import { initContactForm } from "./scripts/contactForm";
import { initScrollUi } from "./scripts/scrollUi";
import { initLegalFooter } from "./scripts/legalFooter";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App element not found");
}

/* ==================================================
   PAGE RENDERING
================================================== */

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
      ${Contact()}
    </main>

    ${Footer()}
    ${ScrollUi()}

  </div>
`;

/* ==================================================
   GENERAL INITIALIZATION
================================================== */

initScrollAnimations();
initScrollUi();
initContactForm();
initLegalFooter();

/* ==================================================
   SKILLS PARTICLE NETWORK
================================================== */

const skillsParticles = initParticleNetwork({
  selector: "#skills-particle-canvas",

  particleCount: 210,

  maxDistance: 105,
  mouseDistance: 220,

  speed: 0.55,

  particleColor: "220, 210, 255",
  lineColor: "160, 110, 255",
  mouseLineColor: "34, 211, 238",
});

/* ==================================================
   CONTACT PARTICLE NETWORK
================================================== */

const contactParticles = initParticleNetwork({
  selector: "#contact-particle-canvas",

  particleCount: 120,

  maxDistance: 145,
  mouseDistance: 240,

  speed: 0.35,

  particleColor: "255, 255, 255",
  lineColor: "139, 92, 246",
  mouseLineColor: "34, 211, 238",
});

/* ==================================================
   PRELOADER
================================================== */

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

  window.setTimeout(() => {
    preloaderParticles?.destroy();
  }, 4000);
}

window.addEventListener("beforeunload", () => {
  skillsParticles?.destroy();
  contactParticles?.destroy();
});
