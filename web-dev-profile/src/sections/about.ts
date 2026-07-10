import profileImage from "../assets/images/profile01.jpg";

export function About(): string {
  return `
    <section id="about" class="section about">

      <div class="about-grid">

        <div class="about-image reveal">

         <div class="about-kicker">
          About Me
         </div>

          <div class="about-image-frame">
            <img
              src="${profileImage}"
              alt="Jonathan Hedrich"
            />
          </div>

        </div>

        <div class="about-content">

          <h1 class="about-title reveal">
            I'm
            <span>Jonathan Hedrich</span>,
            a Frontend Developer building modern
            and interactive web experiences.
          </h1>

          <p class="about-text reveal delay-1">
            I develop modern websites with a focus on performance, 
            usability, and clear user interfaces. My goal is to transform 
            ideas into high-quality digital experiences.
          </p>

          <p class="about-text reveal delay-2">
            I particularly enjoy working with 
            <span>HTML</span>,
            <span>CSS</span>,
            <span>TypeScript</span>,
            <span>Animations</span>, 
            and modern frontend technologies. 
            I place great importance on clean code, responsive design, 
            and high-quality animations.
          </p>

        </div>

      </div>

    </section>
  `;
}
