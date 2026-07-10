type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function initParticleNetwork(): void {
  const canvas = document.querySelector<HTMLCanvasElement>("#particle-canvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  const canvasElement: HTMLCanvasElement = canvas;
  const context: CanvasRenderingContext2D = ctx;

  const particles: Particle[] = [];
  const particleCount = 85;
  const maxDistance = 145;

  const mouse = {
    x: 0,
    y: 0,
    active: false,
  };

  function resizeCanvas(): void {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
  }

  function createParticles(): void {
    particles.length = 0;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvasElement.width,
        y: Math.random() * canvasElement.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
      });
    }
  }

  function drawParticles(): void {
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvasElement.width) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > canvasElement.height) {
        particle.vy *= -1;
      }

      context.beginPath();
      context.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      context.fillStyle = "rgba(255, 255, 255, 0.35)";
      context.fill();
    });
  }

  function drawLines(): void {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;

          context.beginPath();
          context.moveTo(particles[i].x, particles[i].y);
          context.lineTo(particles[j].x, particles[j].y);
          context.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.18})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }
    }
  }

  function drawMouseLines(): void {
    if (!mouse.active) return;

    particles.forEach((particle) => {
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 180) {
        const opacity = 1 - distance / 180;

        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(mouse.x, mouse.y);
        context.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.45})`;
        context.lineWidth = 1;
        context.stroke();
      }
    });
  }

  function animate(): void {
    drawParticles();
    drawLines();
    drawMouseLines();

    window.requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.active = true;
  });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  resizeCanvas();
  createParticles();
  animate();
}
