import { ProjectCard, type ProjectCardProps } from "../components/projectCard";

const projects: Omit<ProjectCardProps, "index">[] = [
  {
    title: "Developer Portfolio",
    category: "Frontend Development",
    description:
      "A modern developer portfolio featuring a custom preloader, interactive animations, smooth scrolling, responsive layouts, and a clean component-based architecture.",
    technologies: ["HTML", "CSS", "TypeScript", "Vite"],
    image: "/projects/portfolio.jpg",
    url: "https://github.com/",
  },
  {
    title: "AI Development Project",
    category: "Artificial Intelligence",
    description:
      "An AI-powered application built with a scalable architecture, modern user interface, and intelligent workflows focused on performance and usability.",
    technologies: ["Python", "AI", "Cloud", "REST API"],
    image: "/projects/ai-project.jpg",
    url: "https://github.com/",
  },
  {
    title: "Cloud Application",
    category: "Cloud Computing",
    description:
      "A cloud-native application focused on deployment, scalability, automation, and modern software architecture using industry best practices.",
    technologies: ["Azure", "Docker", "Linux", "Git"],
    image: "/projects/cloud-project.jpg",
    url: "https://github.com/",
  },
  {
    title: "Dashboard UI",
    category: "Frontend Development",
    description:
      "A responsive dashboard interface featuring reusable components, data visualization, intuitive navigation, and a modern user experience.",
    technologies: ["TypeScript", "CSS", "Responsive UI"],
    image: "/projects/dashboard.jpg",
    url: "https://github.com/",
  },
  {
    title: "Java Application",
    category: "Software Development",
    description:
      "An object-oriented Java application developed with a focus on maintainability, modular architecture, and clean software design principles.",
    technologies: ["Java", "OOP", "Git"],
    image: "/projects/java-project.jpg",
    url: "https://github.com/",
  },
  {
    title: "Landing Page",
    category: "Web Design",
    description:
      "A modern landing page designed with engaging animations, responsive layouts, optimized performance, and a strong visual identity.",
    technologies: ["HTML", "CSS", "Animations"],
    image: "/projects/landing-page.jpg",
    url: "https://github.com/",
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
