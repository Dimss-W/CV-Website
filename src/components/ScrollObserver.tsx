'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollObserver() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    // 1. Custom Cursor with Dynamic Gradient Motion Shadow & Glow Trail
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let trailX = -100;
    let trailY = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;

      currentX += dx * 0.22;
      currentY += dy * 0.22;

      trailX += (mouseX - trailX) * 0.11;
      trailY += (mouseY - trailY) * 0.11;

      const speed = Math.min(Math.hypot(dx, dy), 60);
      const isMoving = speed > 0.6;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX - 15}px, ${currentY - 15}px, 0)`;

        // Directional gradient shadow that blooms and trails opposite to movement
        const offsetX = Math.max(-22, Math.min(22, -dx * 0.38));
        const offsetY = Math.max(-22, Math.min(22, -dy * 0.38));
        const glowBlur1 = 16 + speed * 0.45;
        const glowBlur2 = 34 + speed * 0.85;
        const glowAlpha = isMoving ? Math.min(0.85, 0.45 + speed * 0.012) : 0.38;

        cursorRef.current.style.boxShadow = `
          0 0 14px hsla(110, 100%, 82%, ${glowAlpha}),
          ${offsetX * 0.55}px ${offsetY * 0.55}px ${glowBlur1}px hsla(110, 85%, 62%, ${glowAlpha * 0.9}),
          ${offsetX}px ${offsetY}px ${glowBlur2}px hsla(145, 90%, 55%, ${glowAlpha * 0.65})
        `;
      }

      if (trailRef.current) {
        const trailScale = 1 + (speed / 60) * 0.45;
        const trailOpacity = isMoving ? Math.min(0.95, 0.45 + (speed / 60) * 0.5) : 0.32;
        trailRef.current.style.transform = `translate3d(${trailX - 32}px, ${trailY - 32}px, 0) scale(${trailScale.toFixed(2)})`;
        trailRef.current.style.opacity = String(trailOpacity.toFixed(2));
      }

      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateCursor);

    // Hide custom cursor on links & buttons
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

    // 2. Show Scroll Up button
    const handleScroll = () => {
      setShowScrollUp(window.scrollY >= 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3. ScrollReveal IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-init');
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Gradient Shadow Trail following cursor movement */}
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
