import { ProjectCard } from "../components/projectCard";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "Eine moderne Developer-Portfolio-Seite mit Scroll Animationen.",
    tech: "HTML / CSS / TS",
  },
  {
    title: "Dashboard UI",
    description:
      "Ein responsives Dashboard mit Cards, Navigation und Animationen.",
    tech: "TypeScript",
  },
  {
    title: "Landing Page",
    description: "Eine performante Landing Page mit starkem Hero-Bereich.",
    tech: "CSS Animations",
  },
];

export function Projects(): string {
  return `
    <section id="projects" class="section projects">
      <div class="section-header reveal">
        <p class="eyebrow">Projects</p>
        <h2>Meine Projekte</h2>
      </div>

      <div class="projects-grid">
        ${projects
          .map((project, index) =>
            ProjectCard({
              ...project,
              index,
            }),
          )
          .join("")}
      </div>
    </section>
  `;
}
