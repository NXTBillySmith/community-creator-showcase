import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  hue: number;
  life: number;
  type: 'glow' | 'spark' | 'nebula';
  depth: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < particleCount; i++) {
        const types: Particle['type'][] = ['glow', 'spark', 'nebula'];
        const type = types[Math.floor(Math.random() * types.length)];
        const depth = Math.random();
        
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (0.3 + depth * 0.7),
          vy: (Math.random() - 0.5) * (0.3 + depth * 0.7),
          size: type === 'nebula' ? 8 + Math.random() * 12 : 2 + Math.random() * 4,
          opacity: 0.1 + Math.random() * 0.4,
          baseOpacity: 0.1 + Math.random() * 0.4,
          hue: 200 + Math.random() * 80, // Blue to purple range
          life: Math.random() * 1000,
          type,
          depth
        });
      }
    };

    const drawParticle = (particle: Particle, time: number) => {
      const { x, y, size, opacity, hue, type, depth } = particle;
      
      // Pulsing effect
      const pulse = 0.7 + 0.3 * Math.sin(time * 0.003 + particle.life * 0.01);
      const currentSize = size * pulse;
      const currentOpacity = opacity * pulse;

      if (type === 'glow') {
        // Create glowing orb with radial gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, currentSize * 2);
        gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${currentOpacity})`);
        gradient.addColorStop(0.3, `hsla(${hue}, 70%, 50%, ${currentOpacity * 0.6})`);
        gradient.addColorStop(1, `hsla(${hue}, 70%, 40%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, currentSize * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.fillStyle = `hsla(${hue}, 80%, 80%, ${currentOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(x, y, currentSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === 'spark') {
        // Sharp, bright sparks
        ctx.fillStyle = `hsla(${hue + 20}, 90%, 70%, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(x, y, currentSize * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Add sparkle effect
        ctx.strokeStyle = `hsla(${hue + 40}, 100%, 80%, ${currentOpacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - currentSize, y);
        ctx.lineTo(x + currentSize, y);
        ctx.moveTo(x, y - currentSize);
        ctx.lineTo(x, y + currentSize);
        ctx.stroke();
      } else if (type === 'nebula') {
        // Large, soft nebula-like particles
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, currentSize);
        gradient.addColorStop(0, `hsla(${hue - 20}, 60%, 40%, ${currentOpacity * 0.3})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 50%, 30%, ${currentOpacity * 0.2})`);
        gradient.addColorStop(1, `hsla(${hue + 20}, 40%, 20%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawConnections = (time: number) => {
      const connectionDistance = 120;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particleA = particlesRef.current[i];
        if (particleA.type !== 'glow') continue;
        
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particleB = particlesRef.current[j];
          if (particleB.type !== 'glow') continue;
          
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            const hue = (particleA.hue + particleB.hue) / 2;
            
            ctx.strokeStyle = `hsla(${hue}, 60%, 50%, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      timeRef.current += 16;
      const time = timeRef.current;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Organic movement with sine wave influence
        const waveInfluence = 0.2;
        particle.vx += Math.sin(time * 0.001 + particle.y * 0.01) * waveInfluence * particle.depth;
        particle.vy += Math.cos(time * 0.001 + particle.x * 0.01) * waveInfluence * particle.depth;
        
        // Apply movement
        particle.x += particle.vx * particle.depth;
        particle.y += particle.vy * particle.depth;
        
        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        // Gentle friction
        particle.vx *= 0.999;
        particle.vy *= 0.999;
        
        // Dynamic opacity breathing
        particle.opacity = particle.baseOpacity + Math.sin(time * 0.002 + particle.life) * 0.1;
        
        particle.life += 1;
      });
      
      // Draw connections first (behind particles)
      drawConnections(time);
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        drawParticle(particle, time);
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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