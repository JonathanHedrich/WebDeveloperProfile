export type ProjectCardProps = {
  index: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  url: string;
};

export function ProjectCard({
  index,
  title,
  category,
  description,
  technologies,
  image,
  url,
}: ProjectCardProps): string {
  const number = String(index + 1).padStart(2, "0");

  return `
    <a
      class="project-card reveal"
      href="${url}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${title} öffnen"
    >
      <div class="project-image-wrapper">
        <img
          class="project-image"
          src="${image}"
          alt="${title}"
          loading="lazy"
        />

        <span class="project-number">${number}</span>

        <span class="project-open-icon" aria-hidden="true">↗</span>
      </div>

      <div class="project-card-content">
        <h3>${title}</h3>

        <p class="project-category">${category}</p>

        <p class="project-description">
          ${description}
        </p>

        <div class="project-technologies">
          ${technologies
            .map((technology) => `<span>${technology}</span>`)
            .join("")}
        </div>
      </div>
    </a>
  `;
}
