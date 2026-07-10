type SkillLevel = "advanced" | "basic";

type Skill = {
  name: string;
  fullName?: string;
  icon?: string;
  url: string;
  level: SkillLevel;
};

const skills: Skill[] = [
  /* ==================================================
     ADVANCED SKILLS
  ================================================== */

  {
    name: "MySQL",
    fullName: "MySQL Database",
    icon: "devicon-mysql-original colored",
    url: "https://www.mysql.com/",
    level: "advanced",
  },
  {
    name: "Databases",
    fullName: "Database Development",
    icon: "devicon-azuresqldatabase-plain colored",
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction",
    level: "advanced",
  },
  {
    name: "HTML",
    fullName: "HTML5",
    icon: "devicon-html5-plain colored",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    level: "advanced",
  },
  {
    name: "XML",
    fullName: "Extensible Markup Language",
    icon: "devicon-xml-plain colored",
    url: "https://developer.mozilla.org/en-US/docs/Web/XML",
    level: "advanced",
  },
  {
    name: "XHTML",
    fullName: "Extensible HyperText Markup Language",
    icon: "devicon-html5-plain colored",
    url: "https://developer.mozilla.org/en-US/docs/Glossary/XHTML",
    level: "advanced",
  },
  {
    name: "XAML",
    fullName: "Extensible Application Markup Language",
    icon: "devicon-dotnetcore-plain colored",
    url: "https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/",
    level: "advanced",
  },
  {
    name: "XSLT",
    fullName: "Extensible Stylesheet Language Transformations",
    icon: "devicon-xml-plain colored",
    url: "https://developer.mozilla.org/en-US/docs/Web/XML/XSLT",
    level: "advanced",
  },
  {
    name: "Bootstrap",
    fullName: "HTML and CSS Framework Bootstrap",
    icon: "devicon-bootstrap-plain colored",
    url: "https://getbootstrap.com/",
    level: "advanced",
  },
  {
    name: "YAML CSS",
    fullName: "HTML and CSS Framework YAML",
    icon: "devicon-css3-plain colored",
    url: "http://www.yaml.de/",
    level: "advanced",
  },
  {
    name: "Angular",
    fullName: "JavaScript Framework Angular",
    icon: "devicon-angularjs-plain colored",
    url: "https://angular.dev/",
    level: "advanced",
  },
  {
    name: "Node.js",
    fullName: "JavaScript Runtime Node.js",
    icon: "devicon-nodejs-plain colored",
    url: "https://nodejs.org/",
    level: "advanced",
  },
  {
    name: "Next.js",
    fullName: "React Framework Next.js",
    icon: "devicon-nextjs-plain",
    url: "https://nextjs.org/",
    level: "advanced",
  },
  {
    name: "Express.js",
    fullName: "Node.js Framework Express.js",
    icon: "devicon-express-original",
    url: "https://expressjs.com/",
    level: "advanced",
  },
  {
    name: "React",
    fullName: "JavaScript Library React",
    icon: "devicon-react-original colored",
    url: "https://react.dev/",
    level: "advanced",
  },
  {
    name: "Java",
    fullName: "Java Programming Language",
    icon: "devicon-java-plain colored",
    url: "https://dev.java/",
    level: "advanced",
  },
  {
    name: "JavaScript",
    fullName: "JavaScript Programming Language",
    icon: "devicon-javascript-plain colored",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    level: "advanced",
  },
  {
    name: "TypeScript",
    fullName: "TypeScript Programming Language",
    icon: "devicon-typescript-plain colored",
    url: "https://www.typescriptlang.org/",
    level: "advanced",
  },
  {
    name: "Git",
    fullName: "Git Version Control",
    icon: "devicon-git-plain colored",
    url: "https://git-scm.com/",
    level: "advanced",
  },
  {
    name: "GitLab",
    fullName: "GitLab Version Control Platform",
    icon: "devicon-gitlab-plain colored",
    url: "https://gitlab.com/",
    level: "advanced",
  },
  {
    name: "Jira",
    fullName: "Jira – Agile Project Management",
    icon: "devicon-jira-plain colored",
    url: "https://www.atlassian.com/software/jira",
    level: "advanced",
  },
  {
    name: "Responsive UI / UX",
    fullName: "Responsive User Interface and User Experience Design",
    icon: "devicon-figma-plain colored",
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
    level: "advanced",
  },
  {
    name: "Sourcetree",
    fullName: "Sourcetree Git Client",
    icon: "devicon-sourcetree-original colored",
    url: "https://www.sourcetreeapp.com/",
    level: "advanced",
  },
  {
    name: "VS Code",
    fullName: "Visual Studio Code",
    icon: "devicon-vscode-plain colored",
    url: "https://code.visualstudio.com/",
    level: "advanced",
  },
  {
    name: "IntelliJ IDEA",
    fullName: "JetBrains IntelliJ IDEA",
    icon: "devicon-intellij-plain colored",
    url: "https://www.jetbrains.com/idea/",
    level: "advanced",
  },
  {
    name: "Postman",
    fullName: "Postman – API Testing",
    icon: "devicon-postman-plain colored",
    url: "https://www.postman.com/",
    level: "advanced",
  },
  {
    name: "WordPress",
    fullName: "WordPress Content Management System",
    icon: "devicon-wordpress-plain colored",
    url: "https://wordpress.org/",
    level: "advanced",
  },

  /* ==================================================
     BASIC SKILLS
  ================================================== */

  {
    name: "Software Tests",
    fullName: "Software Testing",
    icon: "devicon-pytest-plain colored",
    url: "https://en.wikipedia.org/wiki/Software_testing",
    level: "basic",
  },
  {
    name: "Microsoft 365",
    fullName: "Microsoft Office and Microsoft 365",
    url: "https://www.microsoft.com/microsoft-365",
    level: "basic",
  },
  {
    name: "GitHub",
    fullName: "GitHub Version Control Platform",
    icon: "devicon-github-original",
    url: "https://github.com/",
    level: "basic",
  },
  {
    name: "Notepad++",
    fullName: "Notepad++ Source Code Editor",
    url: "https://notepad-plus-plus.org/",
    level: "basic",
  },
];

/* ==================================================
   ICON OR FALLBACK
================================================== */

function getSkillIcon(skill: Skill): string {
  if (skill.icon) {
    return `
      <i
        class="${skill.icon} skill-icon"
        aria-hidden="true"
      ></i>
    `;
  }

  const initials = skill.name
    .split(/[\s.-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return `
    <span
      class="skill-icon-fallback"
      aria-hidden="true"
    >
      ${initials}
    </span>
  `;
}

/* ==================================================
   SKILL CARD
================================================== */

function createSkillCard(skill: Skill): string {
  const accessibleName = skill.fullName ?? skill.name;

  return `
    <a
      class="skill-card reveal"
      href="${skill.url}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${accessibleName} – offizielle Website öffnen"
      title="${accessibleName}"
    >
      <span
        class="skill-card-glow"
        aria-hidden="true"
      ></span>

      ${getSkillIcon(skill)}

      <span class="skill-name">
        ${skill.name}
      </span>

      <span
        class="skill-link-icon"
        aria-hidden="true"
      >
        ↗
      </span>
    </a>
  `;
}

/* ==================================================
   SKILL GROUP
================================================== */

function createSkillGroup(
  title: string,
  description: string,
  level: SkillLevel,
): string {
  const filteredSkills = skills.filter((skill) => skill.level === level);

  return `
    <div class="skill-group">
      <div class="skill-group-heading reveal">
        <h3>${title}</h3>
        <p>${description}</p>
      </div>

      <div class="skills-grid">
        ${filteredSkills.map((skill) => createSkillCard(skill)).join("")}
      </div>
    </div>
  `;
}

/* ==================================================
   SKILLS SECTION
================================================== */

export function Skills(): string {
  return `
    <section
      id="skills"
      class="section skills"
    >
      <canvas
        id="skills-particle-canvas"
        class="skills-particle-canvas"
        aria-hidden="true"
      ></canvas>

      <div
        class="skills-background"
        aria-hidden="true"
      >
        <div class="skills-grid-lines"></div>
        <div class="skills-orb skills-orb-left"></div>
        <div class="skills-orb skills-orb-center"></div>
        <div class="skills-orb skills-orb-right"></div>
      </div>

      <div class="skills-content">
        <div class="skills-heading reveal">
          <h2>
            Tech
            <span>Stack</span>
          </h2>

          <p>
            Technologies, tools, and areas of expertise
            I have worked with.
          </p>
        </div>

        <div class="skill-groups">
          ${createSkillGroup(
            "Advanced Skills",
            "Technologies and areas of expertise I have worked with intensively.",
            "advanced",
          )}

          ${createSkillGroup(
            "Basic Skills",
            "Tools and topics in which I have gained initial practical experience.",
            "basic",
          )}
        </div>
      </div>
    </section>
  `;
}
