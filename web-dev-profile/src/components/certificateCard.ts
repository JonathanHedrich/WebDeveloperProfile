export type CertificateCardProps = {
  index: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  description: string;
  technologies?: string[];
  pdfUrl: string;
};

export function CertificateCard({
  index,
  title,
  issuer,
  date,
  category,
  description,
  technologies = [],
  pdfUrl,
}: CertificateCardProps): string {
  const number = String(index + 1).padStart(2, "0");

  return `
    <a
      class="certificate-card reveal"
      href="${pdfUrl}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${title} certificate PDF"
    >
      <div class="certificate-preview">
        <canvas
          class="certificate-canvas"
          data-certificate-pdf="${pdfUrl}"
          aria-label="First page preview of ${title}"
        ></canvas>

        <div class="certificate-preview-placeholder">
          <span class="certificate-loading-spinner"></span>
          <span>Loading certificate...</span>
        </div>

        <span class="certificate-number">
          ${number}
        </span>

        <span class="certificate-open-icon" aria-hidden="true">
          <i class="bi bi-box-arrow-up-right"></i>
        </span>

        <div class="certificate-preview-overlay"></div>
      </div>

      <div class="certificate-card-content">
        <div class="certificate-meta">
          <span class="certificate-category">
            ${category}
          </span>

          <span class="certificate-date">
            ${date}
          </span>
        </div>

        <h3>${title}</h3>

        <p class="certificate-issuer">
          Issued by
          <strong>${issuer}</strong>
        </p>

        <p class="certificate-description">
          ${description}
        </p>

        ${
          technologies.length > 0
            ? `
              <div class="certificate-technologies">
                ${technologies
                  .map(
                    (technology) => `
                      <span>${technology}</span>
                    `,
                  )
                  .join("")}
              </div>
            `
            : ""
        }

        <div class="certificate-action">
          <span>View certificate</span>
          <i class="bi bi-arrow-up-right"></i>
        </div>
      </div>
    </a>
  `;
}
