import { ProjectCard, type ProjectCardProps } from "../components/projectCard";
import forgeTestModdingImage from "../assets/images/projects/ProjectCard-ForgeTestModding.png";
import cateriumModImage from "../assets/images/projects/ProjectCard-CateriumMinecraftMod.png";
import webDevProfileImage from "../assets/images/projects/ProjectCard-DevWebpage01.png";
import flipLearnImage from "../assets/images/projects/ProjectCard-FlipLearn-MobileApp.png";
import percolationLabImage from "../assets/images/projects/ProjectCard-PercolationLab.png";

const projects: Omit<ProjectCardProps, "index">[] = [
  {
    title: "WebDeveloperProfile",
    category: "Frontend Development",
    description:
      "A responsive developer portfolio built with TypeScript, HTML, CSS, and Vite. It features a custom preloader, scroll-triggered animations, interactive particle backgrounds, project showcases, and a contact form connected to an Express backend.",
    technologies: ["TypeScript", "HTML", "CSS", "Vite", "Express", "Node.js"],
    image: webDevProfileImage,
    url: "https://github.com/JonathanHedrich/WebDeveloperProfile",
  },
  {
    title: "CateriumMod",
    category: "Minecraft Mod Development",
    description:
      "A private Java-based Minecraft modding project created to explore custom content creation, gameplay mechanics, and world generation by developing new blocks, items, and custom ore generation.",
    technologies: ["Java", "Minecraft", "Modding", "Gradle"],
    image: cateriumModImage,
    url: "https://github.com/JonathanHedrich/CateriumMod",
  },
  {
    title: "Forge Test Modding 1.20.X",
    category: "Minecraft Forge Development",
    description:
      "A private development and testing project for experimenting with Minecraft Forge 1.20.x, including mod setup, custom features, event handling, and Forge APIs.",
    technologies: ["Java", "Minecraft Forge", "Gradle", "Modding"],
    image: forgeTestModdingImage,
    url: "https://github.com/JonathanHedrich/Forge-Test-Modding-1.20.X",
  },
  {
    title: "FlipLearn",
    category: "Full-Stack Web Application",
    description:
      "A full-stack flashcard learning platform featuring secure JWT authentication, Google OAuth, password reset via email, spaced repetition, statistics, and responsive web/mobile support. Built with Angular, Ionic, Spring Boot, PostgreSQL, and Docker. A live demo is available.",
    technologies: [
      "Angular",
      "Ionic",
      "Capacitor",
      "TypeScript",
      "Spring Boot",
      "Java",
      "Spring Security",
      "JWT",
      "PostgreSQL",
      "Flyway",
      "Docker",
      "Nginx",
      "Render",
      "Vercel",
    ],
    image: flipLearnImage,
    url: "https://github.com/JonathanHedrich/fliplearn-demo",
  },
  {
    title: "Percolation Lab",
    category: "Interactive Simulation",
    description:
      "A browser-based simulation of site percolation on a two-dimensional lattice. The application demonstrates the emergence of critical thresholds through animated simulations and data visualization, making complex systems and network theory accessible to a broad audience.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Recharts",
      "Canvas API",
      "CSS3",
    ],
    image: percolationLabImage,
    url: "https://percolation-lab-simulation.vercel.app/",
  },
];

export function Projects(): string {
  return `
    <section id="projects" class="section projects">
      <div class="projects-background" aria-hidden="true">
        <div class="projects-glow projects-glow-left"></div>
        <div class="projects-glow projects-glow-right"></div>
      </div>

      <div class="projects-content">
        <div class="projects-heading reveal">

          <h2>
            My
            <span>Projects</span>
          </h2>

          <p>
            A selection of projects showcasing my experience in frontend
            development, software engineering, artificial intelligence,
            and cloud computing.
          </p>
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
      </div>
    </section>
  `;
}
