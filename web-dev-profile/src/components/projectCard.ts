type ProjectCardProps = {
  title: string;
  description: string;
  tech: string;
  index: number;
};

export function ProjectCard({
  title,
  description,
  tech,
  index,
}: ProjectCardProps): string {
  const delayClass = `delay-${Math.min((index % 4) + 1, 4)}`;

  return `
    <article class="project-card reveal ${delayClass}">
      <span>${tech}</span>
      <h3>${title}</h3>
      <p>${description}</p>
    </article>
  `;
}
