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
