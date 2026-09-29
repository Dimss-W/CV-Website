'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  pulseSpeed: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Interactive mouse state with smooth lagging target
    const mouse = {
      x: width * 0.5,
      y: height * 0.3,
      targetX: width * 0.5,
      targetY: height * 0.3,
      active: false,
      connectDist: 150,
    };

    // Ripples array on mouse click or rapid motion
    const ripples: Ripple[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.28,
        alpha: 0.35,
      });
      if (ripples.length > 5) ripples.shift();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    // Particle Setup with optimal density & vibrant tech palette
    const particleCount = Math.min(Math.floor(width / 26), 48);
    const particles: Particle[] = [];

    const colors = [
      'rgba(99, 102, 241, ', // Indigo
      'rgba(56, 189, 248, ', // Sky
      'rgba(168, 85, 247, ', // Purple
      'rgba(14, 165, 233, ', // Cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      const baseR = Math.random() * 1.6 + 0.9;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: baseR,
        baseRadius: baseR,
        alpha: Math.random() * 0.4 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let lastTime = performance.now();
    let ambientAngle = 0;

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.6, 2);
      lastTime = time;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.08 * delta;
      mouse.y += (mouse.targetY - mouse.y) * 0.08 * delta;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Living Ambient Aurora Clouds in Background
      ambientAngle += 0.003 * delta;
      const aurora1X = width * 0.3 + Math.sin(ambientAngle) * (width * 0.12);
      const aurora1Y = height * 0.35 + Math.cos(ambientAngle * 0.8) * (height * 0.1);
      const grad1 = ctx.createRadialGradient(
        aurora1X,
        aurora1Y,
        0,
        aurora1X,
        aurora1Y,
        width * 0.45
      );
      grad1.addColorStop(0, 'rgba(79, 70, 229, 0.07)'); // Subtle Indigo
      grad1.addColorStop(0.6, 'rgba(56, 189, 248, 0.03)'); // Sky Blue
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const aurora2X = width * 0.75 - Math.cos(ambientAngle * 0.7) * (width * 0.1);
      const aurora2Y = height * 0.65 + Math.sin(ambientAngle * 0.9) * (height * 0.12);
      const grad2 = ctx.createRadialGradient(
        aurora2X,
        aurora2Y,
        0,
        aurora2X,
        aurora2Y,
        width * 0.4
      );
      grad2.addColorStop(0, 'rgba(168, 85, 247, 0.05)'); // Purple
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive Spotlight Follow Glow
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        mouseGlow.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
        mouseGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)');
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Render Click Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 3.5 * delta;
        rip.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // 4. Update & Draw Constellation Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * delta;
        p.y += p.vy * delta;

        // Smooth wrap
        if (p.x < -15) p.x = width + 15;
        else if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        else if (p.y > height + 15) p.y = -15;

        // Interactive gentle cursor attraction / illumination
        if (mouse.active) {
          const dxM = mouse.x - p.x;
          const dyM = mouse.y - p.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);

          if (distM < mouse.connectDist) {
            // Draw interactive connector line to cursor
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - distM / mouse.connectDist) * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Soft push effect
            const pushFactor = (1 - distM / mouse.connectDist) * 0.4;
            p.x -= (dxM / distM) * pushFactor * delta;
            p.y -= (dyM / distM) * pushFactor * delta;
          }
        }

        // Star pulsing effect
        p.alpha += Math.sin(time * p.pulseSpeed) * 0.005;
        const currentAlpha = Math.max(0.15, Math.min(0.65, p.alpha));

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.14 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ willChange: 'transform' }}
    />
  );
}
