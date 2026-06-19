import { SkillBadge } from '../components/skillBadge';

const skills = [
  'HTML',
  'CSS',
  'TypeScript',
  'Responsive Design',
  'Animations',
  'Git',
  'VS Code',
  'UI Design',
];

export function Skills(): string {
  return `
    <section id="skills" class="section skills">
      <div class="section-header reveal">
        <p class="eyebrow">Skills</p>
        <h2>Technologien</h2>
      </div>

      <div class="skills-grid">
        ${skills.map(skill => SkillBadge(skill)).join('')}
      </div>
    </section>
  `;
}