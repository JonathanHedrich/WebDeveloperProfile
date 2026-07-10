export function Contact(): string {
  return `
    <section id="contact" class="section contact">
      <div class="contact-background" aria-hidden="true">
        <div class="contact-glow contact-glow-left"></div>
        <div class="contact-glow contact-glow-right"></div>
      </div>

      <canvas
        id="contact-particle-canvas"
        class="section-particle-canvas"
      ></canvas>

      <div class="contact-content">
        <header class="contact-heading reveal">

          <h2>
            Get in
            <span>Touch</span>
          </h2>

          <p>
            Have a project in mind, an interesting opportunity,
            or just want to say hello? Feel free to reach out.
          </p>
        </header>

        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-info-header">
              <h3>Let's connect</h3>

              <p>
                I am always open to discussing new projects,
                development opportunities, or interesting ideas.
              </p>
            </div>

            <div class="contact-details">
              <a
                class="contact-detail"
                href="mailto:personalcontact.jhedrich@gmail.com"
              >
                <span class="contact-detail-icon" aria-hidden="true">
                   <i class="bi bi-envelope-fill"></i>
                </span>

                <span>
                  <small>Email</small>
                  <strong>personalcontact.jhedrich@gmail.com</strong>
                </span>
              </a>

              <div class="contact-detail">
                <span class="contact-detail-icon" aria-hidden="true">
                    <i class="bi bi-geo-alt-fill"></i>
                </span>

                <span>
                  <small>Location</small>
                  <strong>Leipzig, Germany</strong>
                </span>
              </div>

              <div class="contact-detail">
                <span class="contact-detail-icon" aria-hidden="true">
                    <i class="bi bi-clock-fill"></i>
                </span>

                <span>
                  <small>Response time</small>
                  <strong>Usually within 24–48 hours</strong>
                </span>
              </div>
            </div>

            <div class="contact-socials">
              <a
                href="https://github.com/JonathanHedrich"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <span aria-hidden="true"></span>
              </a>

              <a
                href="https://www.linkedin.com/in/jonathan-hedrich-9b4492235/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <span aria-hidden="true"></span>
              </a>
            </div>
          </div>

          <form
            id="contact-form"
            class="contact-form"
            novalidate
          >

            <div class="form-honeypot" aria-hidden="true">
              <label for="contact-secondary-address">
                Leave this field empty
              </label>

              <input
                id="contact-secondary-address"
                name="secondaryAddress"
                type="text"
                value=""
                tabindex="-1"
                autocomplete="off"
              />
            </div>
            <div class="form-row">
              <div class="form-field">
                <label for="first-name">
                  First name
                  <span aria-hidden="true">*</span>
                </label>

                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  placeholder="Jonathan"
                  autocomplete="given-name"
                  required
                />
              </div>

              <div class="form-field">
                <label for="last-name">
                  Last name
                  <span aria-hidden="true">*</span>
                </label>

                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  placeholder="Hedrich"
                  autocomplete="family-name"
                  required
                />
              </div>
            </div>

            <div class="form-field">
              <label for="email">
                Email
                <span aria-hidden="true">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="personalcontact.jhedrich@gmail.com"
                autocomplete="email"
                required
              />
            </div>

            <div class="select-wrapper">
                <select id="subject" name="subject" required>
                    <option value="" selected disabled>
                        Select a subject
                    </option>
                    <option value="project">
                    Project inquiry
                    </option>

                    <option value="job">
                    Job opportunity
                    </option>

                    <option value="collaboration">
                    Collaboration
                    </option>

                    <option value="other">
                    Other
                    </option>
                </select>

                <span class="select-arrow" aria-hidden="true"></span>
            </div>

            <div class="form-field">
              <label for="message">
                Message
                <span aria-hidden="true">*</span>
              </label>

              <textarea
                id="message"
                name="message"
                rows="7"
                minlength="10"
                placeholder="Tell me about your project or how I can help..."
                required
              ></textarea>
            </div>

            <label class="form-consent">
              <input
                id="privacy-consent"
                name="privacyConsent"
                type="checkbox"
                required
              />

              <span>
                I have read the
                <a 
                  href="#privacy"
                  data-legal-target="privacy"
                  aria-controls="footer-legal-panel"
                  aria-expanded="false">
                  Privacy Policy
                </a>
                 and agree that my information may be processed in order to respond to my inquiry.
              </span>
            </label>

            <p
              id="form-status"
              class="form-status"
              role="status"
              aria-live="polite"
            ></p>

            <button class="contact-submit" type="submit">
              <span>Send message</span>
              <span aria-hidden="true"></span>
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}
