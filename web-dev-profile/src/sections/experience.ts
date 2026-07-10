type ExperienceItem = {
  title: string;
  period: string;
  type: string;
  description: string;
};

const experiences: ExperienceItem[] = [
  {
    title: "AI Development & <br/> Cloud Computing",
    period: "2026 – Present",
    type: "Further Training · velpTEC edutainment",
    description:
      "Advanced training focused on AI development, cloud computing, container technologies, automation, and modern software engineering. Building practical skills in developing scalable AI-powered applications and cloud-based solutions.",
  },
  {
    title: "Software Developer",
    period: "2022 – 2025",
    type: "Apprenticeship as an IT Specialist for <br/> Application Development · Gesundheitsforen",
    description:
      "Designed and developed software solutions while gaining experience in object-oriented programming, databases, software architecture, and agile development. Worked on real-world applications throughout the apprenticeship.",
  },
];

function ExperienceCard(experience: ExperienceItem, index: number): string {
  const sideClass =
    index % 2 === 0 ? "timeline-item-right" : "timeline-item-left";
  const delayClass = `delay-${Math.min(index + 1, 4)}`;

  return `
    <article class="timeline-item ${sideClass}">
      <div class="timeline-dot" aria-hidden="true"></div>

      <div class="timeline-card reveal ${delayClass}">
        <div class="timeline-card-header">
          <span class="timeline-period">${experience.period}</span>
          <span class="timeline-type">${experience.type}</span>
        </div>

        <h3>${experience.title}</h3>

        <p>${experience.description}</p>
      </div>
    </article>
  `;
}

export function Experience(): string {
  return `
    <section id="experience" class="section experience">
      <div class="experience-heading reveal">

        <h2>
          My career &
          <span>experience</span>
        </h2>
      </div>

      <div class="timeline">
        <div class="timeline-line" aria-hidden="true">
          <div class="timeline-line-progress"></div>
        </div>

        ${experiences
          .map((experience, index) => ExperienceCard(experience, index))
          .join("")}
      </div>
    </section>
  `;
}
