import {
  CertificateCard,
  type CertificateCardProps,
} from "../components/certificateCard";

const certificates: Omit<CertificateCardProps, "index">[] = [
  {
    title: "velpTEC AI Management",
    issuer: "velpTEC edutainment",
    date: "2026",
    category: "Further Training",
    description:
      "Advanced training in the strategic management of artificial intelligence, covering data as a foundation for AI, technology selection, AI project implementation, governance, privacy, risk assessment, business model development, stakeholder management, and current AI trends.",
    technologies: [
      "AI Governance",
      "AI Strategy",
      "Data Privacy",
      "Technology Evaluation",
    ],
    pdfUrl: "/certificates/KI-Management.pdf",
  },
  {
    title: "velpTEC Project Work AI Management",
    issuer: "velpTEC edutainment",
    date: "2026",
    category: "Further Training",
    description:
      "Practical qualification project focused on the application of AI management concepts and the development of a structured approach to managing artificial intelligence initiatives.",
    technologies: [
      "AI Management",
      "AI Strategy",
      "AI Governance",
      "Project Management",
    ],
    pdfUrl: "/certificates/Projektarbeit-KI-Management.pdf",
  },
  {
    title: "velpTEC Cloud Computing",
    issuer: "velpTEC edutainment",
    date: "2026",
    category: "Further Training",
    description:
      "Advanced training in cloud computing and DevOps, covering cloud service and deployment models, AWS, Azure and Google Cloud, containerization with Docker, Kubernetes orchestration and scaling, Infrastructure as Code, automation, monitoring, security, compliance, high availability, and cloud cost management.",
    technologies: [
      "Kubernetes",
      "Docker",
      "Terraform",
      "Ansible",
      "AWS",
      "Azure",
      "Google Cloud",
      "Prometheus",
      "Grafana",
      "Git",
      "DevOps",
      "Infrastructure as Code",
    ],
    pdfUrl: "/certificates/Cloud-Computing.pdf",
  },
  {
    title: "velpTEC Project Work Cloud Computing",
    issuer: "velpTEC edutainment",
    date: "2026",
    category: "Further Training",
    description:
      "Practical qualification project focused on the application of cloud computing concepts and the implementation of cloud systems in industrial environments.",
    technologies: [
      "Cloud Computing",
      "Cloud Systems",
      "Industrial Cloud",
      "Cloud Architecture",
    ],
    pdfUrl: "/certificates/Projektarbeit-Cloud-Computing.pdf",
  },
  {
    title: "velpTEC DevOps Foundation",
    issuer: "velpTEC edutainment",
    date: "2026",
    category: "Further Training",
    description:
      "Foundation training in DevOps principles and practices, covering continuous integration and delivery, automated testing, deployment pipelines, release automation, continuous security, information security, telemetry, A/B testing, risk reduction, and DevOps collaboration models.",
    technologies: [
      "DevOps",
      "CI/CD",
      "Continuous Integration",
      "Continuous Delivery",
      "Deployment Pipelines",
      "Automated Testing",
      "Continuous Security",
      "Release Automation",
    ],
    pdfUrl: "/certificates/DevOps-Foundation.pdf",
  },
  {
    title: "Prompt Engineering",
    issuer: "velpTEC edutainment",
    date: "2026",
    category: "Further Training",
    description:
      "Practical training in designing, optimizing, and evaluating prompts for modern AI models, covering structured prompting techniques, adaptive prompt optimization, token efficiency, AI-assisted text and code generation, bias management, and automation with AI APIs.",
    technologies: [
      "Prompt Engineering",
      "AI APIs",
      "Prompt Optimization",
      "Generative AI",
    ],
    pdfUrl: "/certificates/Prompt-Engineering.pdf",
  },
  {
    title: "velpTEC Project Work Prompt Engineering",
    issuer: "velpTEC edutainment",
    date: "2026",
    category: "Further Training",
    description:
      "Practical qualification project focused on the application of prompt engineering concepts and the structured design, optimization, and evaluation of prompts for AI and large language model applications.",
    technologies: [
      "Prompt Engineering",
      "Generative AI",
      "Large Language Models",
      "Prompt Optimization",
    ],
    pdfUrl: "/certificates/Projektarbeit-Prompt-Engineering.pdf",
  },
  {
    title: "velpTEC AI Development",
    issuer: "velpTEC edutainment",
    date: "2026",
    category: "Further Training",
    description:
      "Advanced training in AI development, covering natural language processing, conversational AI, voice-based AI systems, multi-channel chatbots, model training and optimization, evaluation and continuous improvement, and advanced techniques for language and dialogue processing.",
    technologies: [
      "Artificial Intelligence",
      "Natural Language Processing",
      "Conversational AI",
      "Chatbots",
      "Voice Bots",
      "AI Model Training",
      "Model Optimization",
      "Model Evaluation",
    ],
    pdfUrl: "/certificates/AI-Development.pdf",
  },
  {
    title: "velpTEC Project Work AI Development",
    issuer: "velpTEC edutainment",
    date: "2026",
    category: "Further Training",
    description:
      "Practical qualification project focused on the application of AI development concepts and the implementation of artificial intelligence solutions.",
    technologies: [
      "Artificial Intelligence",
      "AI Development",
      "AI Applications",
      "AI Systems",
    ],
    pdfUrl: "/certificates/Projektarbeit-AI-Development.pdf",
  },
];

export function Certificates(): string {
  return `
    <section
      id="certificates"
      class="section certificates"
    >
      <div
        class="certificates-background"
        aria-hidden="true"
      >
        <div class="certificates-grid-background"></div>

        <div
          class="
            certificates-glow
            certificates-glow-left
          "
        ></div>

        <div
          class="
            certificates-glow
            certificates-glow-right
          "
        ></div>
      </div>

      <div class="certificates-content">
        <header class="certificates-heading reveal">

          
          <h2>
            My
            <span>Certificates</span>
          </h2>

          <p>
            A selection of professional qualifications,
            completed training programs, and certificates
            documenting my continuous development.
          </p>
        </header>

        <div class="certificates-grid">
          ${certificates
            .map((certificate, index) =>
              CertificateCard({
                ...certificate,
                index,
              }),
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
