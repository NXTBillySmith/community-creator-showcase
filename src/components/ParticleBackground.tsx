import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create particles near cursor
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50;
        const particle: Particle = {
          id: Date.now() + Math.random(),
          x: e.clientX + Math.cos(angle) * distance,
          y: e.clientY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: 60 + Math.random() * 40
        };
        particlesRef.current.push(particle);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouse = mouseRef.current;
      
      particlesRef.current = particlesRef.current.filter(particle => {
        // Calculate distance from mouse
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply repulsion force
        if (distance < 150 && distance > 0) {
          const force = (150 - distance) * 0.01;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
        
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98; // Friction
        particle.vy *= 0.98;
        particle.life++;
        
        // Draw particle
        const alpha = (particle.maxLife - particle.life) / particle.maxLife;
        const size = alpha * 3;
        
        ctx.fillStyle = `hsla(var(--primary) / ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        return particle.life < particle.maxLife;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleBackground;