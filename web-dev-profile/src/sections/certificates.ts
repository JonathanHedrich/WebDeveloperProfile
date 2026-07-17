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
