export function Footer(): string {
  const currentYear = new Date().getFullYear();

  return `
    <footer id="footer" class="footer">
      <div class="footer-content">
        <a class="footer-logo" href="#home">
          Jonathan Hedrich
        </a>

        <nav class="footer-links" aria-label="Legal navigation">
          <button
            class="footer-legal-link"
            type="button"
            data-legal-target="imprint"
            aria-controls="footer-legal-panel"
            aria-expanded="false"
          >
            Imprint
          </button>

          <button
            class="footer-legal-link"
            type="button"
            data-legal-target="privacy"
            aria-controls="footer-legal-panel"
            aria-expanded="false"
          >
            Privacy Policy
          </button>
        </nav>

        <p>
          © ${currentYear} Jonathan Hedrich.
          Built with HTML, CSS and TypeScript.
        </p>
      </div>

      <div
        id="footer-legal-panel"
        class="footer-legal-panel"
        aria-hidden="true"
      >
        <div class="footer-legal-inner">
          <button
            id="footer-legal-close"
            class="footer-legal-close"
            type="button"
            aria-label="Close legal information"
          >
            <i class="bi bi-x-lg" aria-hidden="true"></i>
          </button>

          <section
            id="imprint"
            class="legal-section"
            data-legal-section="imprint"
            hidden
          >
            <h2>Imprint</h2>

            <div class="legal-content">
              <h3>Information according to § 5 DDG</h3>

              <address>
                Jonathan Hedrich<br />
                Zirkonstraße 21<br />
                04319 Leipzig<br />
                Germany
              </address>

              <h3>Contact</h3>

              <p>
                Email:
                <a href="mailto:personalcontact.jhedrich@gmail.com">
                  personalcontact.jhedrich@gmail.com
                </a>
              </p>

              <h3>Responsible for editorial content</h3>

              <p>
                Jonathan Hedrich<br />
                Address as stated above
              </p>

              <h3>Liability for content</h3>

              <p>
                The contents of this website have been created with due care.
                However, no guarantee is given that the information is complete,
                accurate or up to date.
              </p>

              <h3>Liability for external links</h3>

              <p>
                This website contains links to external websites operated by
                third parties. I have no influence over their current or future
                content. The respective provider is responsible for the content
                of linked websites.
              </p>

              <h3>Copyright</h3>

              <p>
                The content and works created for this website are subject to
                German copyright law. Reproduction, editing or distribution
                beyond the limits of copyright law requires prior written
                permission.
              </p>
            </div>
          </section>

          <section
            id="privacy"
            class="legal-section"
            data-legal-section="privacy"
            hidden
          >
            <h2>Privacy Policy</h2>

            <div class="legal-content">
              <h3>1. Controller</h3>

              <p>
                The controller responsible for processing personal data on this
                website is:
              </p>

              <address>
                Jonathan Hedrich<br />
                Zirkonstraße 21<br />
                04319 Leipzig<br />
                Germany
              </address>

              <p>
                Email:
                <a href="mailto:personalcontact.jhedrich@gmail.com">
                  personalcontact.jhedrich@gmail.com
                </a>
              </p>

              <h3>2. Hosting and server log files</h3>

              <p>
                When this website is accessed, the hosting provider may
                automatically process technical information such as the IP
                address, date and time of access, requested resource, referrer,
                browser type, operating system and HTTP status code.
              </p>

              <p>
                This processing is necessary to provide the website, maintain
                technical stability and protect the service against misuse and
                attacks. The legal basis is Article 6(1)(f) GDPR. The legitimate
                interest lies in the secure and reliable operation of this
                website.
              </p>

              <p>
                Hosting provider:
                <strong>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA</strong>
              </p>

              <p>
                 Server log files are retained in accordance with the hosting provider's 
                 retention policy, unless longer storage is required to investigate a 
                 security incident.
              </p>

              <h3>3. Contact form</h3>

              <p>
                When you contact me through the contact form, the information
                you provide is processed in order to respond to your inquiry.
                This includes your first name, last name, email address,
                selected subject and message.
              </p>

              <p>
                If your inquiry relates to a possible contract or an existing
                contractual relationship, processing is based on Article
                6(1)(b) GDPR. In all other cases, processing is based on Article
                6(1)(f) GDPR.
              </p>

              <p>
                Form data is transmitted to my Express backend and forwarded to
                my email inbox through
                <strong>Google LLC (Gmail)</strong>.
              </p>

              <p>
                Messages are retained only for as long as necessary to process
                the inquiry. Statutory retention obligations remain unaffected.
              </p>

              <h3>4. Spam prevention and rate limiting</h3>

              <p>
                The contact form uses a hidden honeypot field and technical rate
                limiting to protect the website against automated submissions
                and misuse.
              </p>

              <h3>5. External links</h3>

              <p>
                This website may contain links to external services such as
                GitHub, LinkedIn and technology websites. Data is transmitted
                to those providers only after you actively open such a link.
              </p>

              <h3>6. Icons and external resources</h3>

              <p>
                This website uses Devicon and Bootstrap Icons. If these
                resources are bundled locally through project dependencies, no
                connection to an external icon provider is established when
                the website is loaded.
              </p>

              <h3>7. Cookies and analytics</h3>

              <p>
                This website currently does not use analytics, advertising
                tracking or non-essential cookies.
              </p>

              <h3>8. Recipients of personal data</h3>

              <p>
                Personal data may be processed by technical service providers
                involved in hosting, email delivery and website security.
              </p>

              <h3>9. International data transfers</h3>

              <p>
                Some service providers may process data outside the European
                Union or the European Economic Area. In that case, appropriate
                safeguards must be used.
              </p>

              <h3>10. Storage duration</h3>

              <p>
                Personal data is stored only for as long as required for the
                respective purpose or for as long as legal retention
                obligations apply.
              </p>

              <h3>11. Your rights</h3>

              <p>
                You have the right to request access, correction, deletion,
                restriction of processing, data portability and objection,
                subject to the applicable legal requirements.
              </p>

              <h3>12. Right to object</h3>

              <p>
                Where personal data is processed on the basis of Article
                6(1)(f) GDPR, you have the right to object to the processing on
                grounds relating to your particular situation.
              </p>

              <h3>13. Security</h3>

              <p>
                Appropriate technical and organisational measures are used to
                protect personal data against accidental loss, unauthorised
                access, alteration or disclosure.
              </p>

              <h3>14. Changes to this Privacy Policy</h3>

              <p>
                This Privacy Policy may be updated when the website, hosting
                environment or services used on the website change.
              </p>

              <p>Last updated: July 2026</p>
            </div>
          </section>
        </div>
      </div>
    </footer>
  `;
}
