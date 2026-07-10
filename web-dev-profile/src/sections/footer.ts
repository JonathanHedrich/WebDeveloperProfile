export function Footer(): string {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="footer-content">
        <a class="footer-logo" href="#home">
          Jonathan Hedrich
        </a>

        <nav class="footer-links" aria-label="Legal navigation">
          <a href="#imprint">Imprint</a>
          <a href="#privacy">Privacy</a>
        </nav>

        <p>
          © ${currentYear} Jonathan Hedrich.
          Built with HTML, CSS and TypeScript.
        </p>
      </div>
    </footer>
  `;
}
