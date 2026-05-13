import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  twinkle: number;
}

const COLORS = ['#FFB6C1', '#FFC0CB', '#D4AF37', '#B5E7CF', '#FFFFFF', '#FF8FA3'];

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createParticle = (): Particle => {
      const maxLife = 120 + Math.random() * 180;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(0.4 + Math.random() * 1.2),
        radius: 1 + Math.random() * 3.5,
        opacity: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife,
        twinkle: Math.random() * Math.PI * 2,
      };
    };

    // Seed initial particles across full height
    for (let i = 0; i < 60; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles
      if (particlesRef.current.length < 90 && Math.random() < 0.5) {
        particlesRef.current.push(createParticle());
      }

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

      particlesRef.current.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += 0.06;

        const progress = p.life / p.maxLife;
        const twinkleAmt = 0.4 + 0.6 * Math.abs(Math.sin(p.twinkle));
        if (progress < 0.15) {
          p.opacity = (progress / 0.15) * twinkleAmt;
        } else if (progress > 0.75) {
          p.opacity = ((1 - progress) / 0.25) * twinkleAmt;
        } else {
          p.opacity = twinkleAmt;
        }

        // Draw sparkle (4-pointed star shape)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.globalAlpha = p.opacity * 0.85;

        if (p.radius > 2.5) {
          // Draw star
          ctx.beginPath();
          const r = p.radius;
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
            ctx.lineTo(Math.cos(angle + Math.PI / 4) * (r * 0.35), Math.sin(angle + Math.PI / 4) * (r * 0.35));
          }
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}