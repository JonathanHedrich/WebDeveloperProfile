type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

type ParticleNetworkOptions = {
  selector: string;
  particleCount?: number;
  maxDistance?: number;
  mouseDistance?: number;
  speed?: number;
  particleColor?: string;
  lineColor?: string;
  mouseLineColor?: string;
};

export type ParticleNetworkController = {
  destroy: () => void;
};

export function initParticleNetwork({
  selector,
  particleCount = 70,
  maxDistance = 145,
  mouseDistance = 180,
  speed = 0.45,
  particleColor = "255, 255, 255",
  lineColor = "255, 255, 255",
  mouseLineColor = "139, 92, 246",
}: ParticleNetworkOptions): ParticleNetworkController | null {
  const canvasQuery = document.querySelector<HTMLCanvasElement>(selector);

  if (!canvasQuery) {
    return null;
  }

  const contextQuery = canvasQuery.getContext("2d");

  if (!contextQuery) {
    return null;
  }

  const canvas: HTMLCanvasElement = canvasQuery;
  const context: CanvasRenderingContext2D = contextQuery;

  const particles: Particle[] = [];

  const mouse = {
    x: 0,
    y: 0,
    active: false,
  };

  let animationFrameId = 0;
  let isDestroyed = false;

  function getCanvasSize(): {
    width: number;
    height: number;
  } {
    const rectangle = canvas.getBoundingClientRect();

    return {
      width: Math.max(1, rectangle.width),
      height: Math.max(1, rectangle.height),
    };
  }

  function resizeCanvas(): void {
    const { width, height } = getCanvasSize();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function createParticles(): void {
    const { width, height } = getCanvasSize();

    particles.length = 0;

    for (let index = 0; index < particleCount; index += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 1.8 + 1.4,
      });
    }
  }

  function updateParticles(): void {
    const { width, height } = getCanvasSize();

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x <= 0) {
        particle.x = 0;
        particle.vx *= -1;
      } else if (particle.x >= width) {
        particle.x = width;
        particle.vx *= -1;
      }

      if (particle.y <= 0) {
        particle.y = 0;
        particle.vy *= -1;
      } else if (particle.y >= height) {
        particle.y = height;
        particle.vy *= -1;
      }
    });
  }

  function drawParticles(): void {
    particles.forEach((particle) => {
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

      context.fillStyle = `rgba(${particleColor}, 0.75)`;
      context.fill();
    });
  }

  function drawParticleLines(): void {
    const maxDistanceSquared = maxDistance * maxDistance;

    for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
      const firstParticle = particles[firstIndex];

      for (
        let secondIndex = firstIndex + 1;
        secondIndex < particles.length;
        secondIndex += 1
      ) {
        const secondParticle = particles[secondIndex];

        const differenceX = firstParticle.x - secondParticle.x;

        const differenceY = firstParticle.y - secondParticle.y;

        const distanceSquared =
          differenceX * differenceX + differenceY * differenceY;

        if (distanceSquared > maxDistanceSquared) {
          continue;
        }

        const distance = Math.sqrt(distanceSquared);
        const opacity = 1 - distance / maxDistance;

        context.beginPath();
        context.moveTo(firstParticle.x, firstParticle.y);
        context.lineTo(secondParticle.x, secondParticle.y);

        context.strokeStyle = `rgba(${lineColor}, ${opacity * 0.18})`;

        context.lineWidth = 1;
        context.stroke();
      }
    }
  }

  function drawMouseLines(): void {
    if (!mouse.active) {
      return;
    }

    const mouseDistanceSquared = mouseDistance * mouseDistance;

    particles.forEach((particle) => {
      const differenceX = particle.x - mouse.x;
      const differenceY = particle.y - mouse.y;

      const distanceSquared =
        differenceX * differenceX + differenceY * differenceY;

      if (distanceSquared > mouseDistanceSquared) {
        return;
      }

      const distance = Math.sqrt(distanceSquared);
      const opacity = 1 - distance / mouseDistance;

      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.lineTo(mouse.x, mouse.y);

      context.strokeStyle = `rgba(${mouseLineColor}, ${opacity * 0.55})`;

      context.lineWidth = 1;
      context.stroke();
    });
  }

  function animate(): void {
    if (isDestroyed || !canvas.isConnected) {
      return;
    }

    const { width, height } = getCanvasSize();

    context.clearRect(0, 0, width, height);

    updateParticles();
    drawParticleLines();
    drawMouseLines();
    drawParticles();

    animationFrameId = window.requestAnimationFrame(animate);
  }

  function handleResize(): void {
    resizeCanvas();
    createParticles();
  }

  function handlePointerMove(event: PointerEvent): void {
    const rectangle = canvas.getBoundingClientRect();

    mouse.x = event.clientX - rectangle.left;
    mouse.y = event.clientY - rectangle.top;
    mouse.active = true;
  }

  function handlePointerLeave(): void {
    mouse.active = false;
  }

  function destroy(): void {
    isDestroyed = true;

    window.cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", handleResize);

    canvas.removeEventListener("pointermove", handlePointerMove);

    canvas.removeEventListener("pointerleave", handlePointerLeave);

    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  window.addEventListener("resize", handleResize);

  canvas.addEventListener("pointermove", handlePointerMove);

  canvas.addEventListener("pointerleave", handlePointerLeave);

  resizeCanvas();
  createParticles();
  animate();

  return {
    destroy,
  };
}
