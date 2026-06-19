type ProjectCardProps = {
  title: string;
  description: string;
  tech: string;
};

export function ProjectCard({ title, description, tech }: ProjectCardProps): string {
  return `
    <article class="project-card reveal">
      <span>${tech}</span>
      <h3>${title}</h3>
      <p>${description}</p>
    </article>
  `;
}