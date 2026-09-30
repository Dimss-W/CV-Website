'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function ScrollObserver() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    // 1. Shared Pointer & Scroll State
    let mouseX = typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500;
    let mouseY = typeof window !== 'undefined' ? window.innerHeight * 0.35 : 300;
    let currentX = mouseX;
    let currentY = mouseY;
    let trailX = mouseX;
    let trailY = mouseY;
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollVelocity = 0;
    let time = 0;
    let rafId: number;

    // 2. Initialize Interactive Canvas Background (Particles + Flowing Aurora Waves + Spotlight Grid)
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    let width = typeof window !== 'undefined' ? window.innerWidth : 1280;
    let height = typeof window !== 'undefined' ? window.innerHeight : 800;
    let particles: Particle[] = [];

    const initParticles = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const count = width < 768 ? 38 : 72;
      const hues = [195, 208, 222, 245];
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        radius: Math.random() * 2.2 + 1.2,
        hue: hues[i % hues.length],
        alpha: Math.random() * 0.55 + 0.35,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    };

    initParticles();
    window.addEventListener('resize', initParticles, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    const renderFrame = () => {
      time += 0.014;

      const dx = mouseX - currentX;
      const dy = mouseY - currentY;

      currentX += dx * 0.22;
      currentY += dy * 0.22;

      trailX += (mouseX - trailX) * 0.11;
      trailY += (mouseY - trailY) * 0.11;

      scrollVelocity *= 0.88;

      const pointerSpeed = Math.hypot(dx, dy);
      const speed = Math.min(pointerSpeed + Math.abs(scrollVelocity) * 0.6, 65);
      const isMoving = speed > 0.6;

      // Update Custom Cursor & Gradient Shadow
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX - 15}px, ${currentY - 15}px, 0)`;

        const offsetX = Math.max(-22, Math.min(22, -dx * 0.38));
        const offsetY = Math.max(
          -26,
          Math.min(26, -dy * 0.38 + scrollVelocity * 0.45)
        );
        const glowBlur1 = 16 + speed * 0.45;
        const glowBlur2 = 34 + speed * 0.85;
        const glowAlpha = isMoving ? Math.min(0.88, 0.45 + speed * 0.012) : 0.38;

        cursorRef.current.style.boxShadow = `
          0 0 14px hsla(196, 100%, 85%, ${glowAlpha}),
          ${offsetX * 0.55}px ${offsetY * 0.55}px ${glowBlur1}px hsla(208, 92%, 64%, ${glowAlpha * 0.9}),
          ${offsetX}px ${offsetY}px ${glowBlur2}px hsla(235, 88%, 62%, ${glowAlpha * 0.65})
        `;
      }

      if (trailRef.current) {
        const trailScale = 1 + (speed / 60) * 0.45;
        const trailOpacity = isMoving
          ? Math.min(0.95, 0.45 + (speed / 60) * 0.5)
          : 0.32;
        trailRef.current.style.transform = `translate3d(${trailX - 32}px, ${trailY - 32}px, 0) scale(${trailScale.toFixed(2)})`;
        trailRef.current.style.opacity = String(trailOpacity.toFixed(2));
      }

      // Draw Interactive Canvas Background
      if (ctx && canvas) {
        ctx.clearRect(0, 0, width, height);

        // A. Interactive Cursor / Scroll Spotlight Aura on Background
        const spotlightRadius = width < 768 ? 260 : 420;
        const spotGrad = ctx.createRadialGradient(
          currentX,
          currentY,
          10,
          currentX,
          currentY,
          spotlightRadius
        );
        spotGrad.addColorStop(0, 'hsla(206, 95%, 62%, 0.14)');
        spotGrad.addColorStop(0.45, 'hsla(225, 90%, 58%, 0.06)');
        spotGrad.addColorStop(1, 'hsla(222, 30%, 5%, 0)');
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);

        // B. Flowing Cyber-Aurora Sine Waves (Parallax with Scroll)
        const scrollOffset = lastScrollY * 0.18;
        const waveConfigs = [
          {
            yBase: height * 0.26,
            amp: 48,
            freq: 0.0026,
            speed: 1.1,
            color: 'hsla(202, 95%, 64%, 0.12)',
            lineWidth: 2,
          },
          {
            yBase: height * 0.55,
            amp: 62,
            freq: 0.002,
            speed: -0.85,
            color: 'hsla(222, 92%, 66%, 0.10)',
            lineWidth: 1.8,
          },
          {
            yBase: height * 0.8,
            amp: 44,
            freq: 0.003,
            speed: 1.35,
            color: 'hsla(250, 88%, 68%, 0.09)',
            lineWidth: 1.5,
          },
        ];

        waveConfigs.forEach((w) => {
          ctx.beginPath();
          const step = width < 768 ? 24 : 16;
          for (let x = 0; x <= width + step; x += step) {
            const y =
              ((w.yBase - scrollOffset * 0.35 + height * 10) % height) +
              Math.sin(x * w.freq + time * w.speed) * w.amp +
              Math.cos(x * w.freq * 0.5 - time * 0.6) * (w.amp * 0.45);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = w.color;
          ctx.lineWidth = w.lineWidth;
          ctx.stroke();
        });

        // C. Update & Draw Constellation Particles + Interactive Laser Links
        const linkDist = width < 768 ? 115 : 150;
        const mouseLinkDist = width < 768 ? 150 : 210;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy - scrollVelocity * 0.04;
          p.pulsePhase += p.pulseSpeed;

          // Wrap around screen edges smoothly
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          const currentAlpha =
            p.alpha * (0.7 + 0.3 * Math.sin(p.pulsePhase));

          // Connect particle to nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < linkDist) {
              const lineAlpha = (1 - dist / linkDist) * 0.22;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `hsla(${p.hue}, 92%, 68%, ${lineAlpha.toFixed(3)})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }

          // Interactive Connection to Cursor / Touch Point
          const distToMouse = Math.hypot(p.x - currentX, p.y - currentY);
          if (distToMouse < mouseLinkDist) {
            const factor = 1 - distToMouse / mouseLinkDist;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = `hsla(198, 100%, 75%, ${(factor * 0.48).toFixed(3)})`;
            ctx.lineWidth = 1.25;
            ctx.stroke();

            // Gentle magnetic attraction toward cursor
            p.x += (currentX - p.x) * 0.003 * factor;
            p.y += (currentY - p.y) * 0.003 * factor;
          }

          // Draw Glowing Particle Node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 95%, 76%, ${currentAlpha.toFixed(2)})`;
          ctx.fill();

          // Soft Outer Halo on Larger Nodes
          if (p.radius > 2.1) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 95%, 68%, ${(currentAlpha * 0.18).toFixed(2)})`;
            ctx.fill();
          }
        }
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    rafId = requestAnimationFrame(renderFrame);

    // Hide custom cursor on links & buttons when hovered on desktop
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !cursorRef.current || !trailRef.current) return;
      if (target.closest('a, button, input, textarea, [role="button"]')) {
        cursorRef.current.classList.add('hide-cursor');
        trailRef.current.classList.add('hide-cursor');
      } else {
        cursorRef.current.classList.remove('hide-cursor');
        trailRef.current.classList.remove('hide-cursor');
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // 3. Scroll Interactivity (Scroll-Up Button + Scroll Velocity + Mobile Viewport Active Focus)
    const interactiveCardsSelector =
      '.work__card, .services__card, .skills__card, #experience article, #education article, .contact__card';

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity = Math.max(-45, Math.min(45, deltaY));

      setShowScrollUp(currentScrollY >= 350);

      if (window.innerWidth < 860) {
        const waveX =
          window.innerWidth * 0.5 +
          Math.sin(currentScrollY * 0.006) * (window.innerWidth * 0.28);
        const waveY = window.innerHeight * 0.38;
        mouseX = waveX;
        mouseY = waveY;

        const viewportCenter = window.innerHeight * 0.52;
        const cards = document.querySelectorAll<HTMLElement>(
          interactiveCardsSelector
        );
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const dist = Math.abs(cardCenter - viewportCenter);
          if (dist < Math.min(220, rect.height * 0.65)) {
            card.classList.add('scroll-focus');
          } else {
            card.classList.remove('scroll-focus');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 4. Staggered & Reversible ScrollReveal on Both Web & Mobile
    const revealTargetsSelector = [
      '.reveal-init',
      '.work__card',
      '.services__card',
      '.skills__card',
      '#experience article',
      '#education article',
      '.contact__form',
      '.contact__card',
      '.footer__container',
    ].join(', ');

    const allTargets = Array.from(
      document.querySelectorAll<HTMLElement>(revealTargetsSelector)
    );

    allTargets.forEach((el, index) => {
      if (!el.classList.contains('reveal-init')) {
        el.classList.add('reveal-init');
      }
      const siblingIndex = index % 4;
      el.style.transitionDelay = `${siblingIndex * 65}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight * 0.92 || rect.bottom < 40) {
              entry.target.classList.remove('is-revealed');
            }
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    allTargets.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('resize', initParticles);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Interactive 60fps Canvas Background + Cyber Grid + Aurora */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-bg__grid" />
        <div className="ambient-bg__orb ambient-bg__orb--1" />
        <div className="ambient-bg__orb ambient-bg__orb--2" />
        <div className="ambient-bg__orb ambient-bg__orb--3" />
        <canvas ref={canvasRef} className="ambient-bg__canvas" />
        <span className="ambient-bg__meteor ambient-bg__meteor--1" />
        <span className="ambient-bg__meteor ambient-bg__meteor--2" />
        <span className="ambient-bg__meteor ambient-bg__meteor--3" />
      </div>

      {/* Gradient Shadow Trail following cursor/scroll movement */}
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />

      {/* Bedimcode Bianca Custom Cursor with Gradient Glow */}
      <div ref={cursorRef} className="cursor" aria-hidden="true" />

      {/* Bedimcode Bianca Scroll Up Button */}
      <a
        href="#home"
        className={`scrollup ${showScrollUp ? 'show-scroll' : ''}`}
        id="scroll-up"
        aria-label="Gulir ke atas"
      >
        <i className="ri-arrow-up-line" />
      </a>
    </>
  );
}
