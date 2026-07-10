export function Hero(): string {
  return `
    <section class="hero" id="home">
      <div class="hero-layout">

        <div class="hero-intro">
          <p class="hero-kicker reveal">
            Hello! I'm
          </p>

          <h1 class="hero-name reveal delay-1">
            Jonathan
            <span>Hedrich</span>
          </h1>
        </div>

        <div class="hero-role">
          <p class="hero-kicker reveal">
          <br/>
          </p>

          <h2 class="hero-role-title reveal delay-1">
            Web Developer
            <span>Frontend Developer</span>
          </h2>
        </div>

        <div class="hero-bottom">
          <p class="hero-description reveal delay-2">
            Ich entwickle moderne, responsive und animierte Webseiten mit
            HTML, CSS und TypeScript. Mein Fokus liegt auf klarer Gestaltung,
            sauberem Code und einer angenehmen User Experience.
          </p>

          <a href="#projects" class="btn reveal delay-3">
            Projekte ansehen
          </a>
        </div>

      </div>

      <div class="hero-glow hero-glow-left"></div>
      <div class="hero-glow hero-glow-right"></div>
    </section>
  `;
}
