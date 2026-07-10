export function SkillBadge(name: string, index: number): string {
  const delayClass = `delay-${Math.min((index % 4) + 1, 4)}`;

  return `
    <span class="skill-badge reveal ${delayClass}">
      ${name}
    </span>
  `;
}
