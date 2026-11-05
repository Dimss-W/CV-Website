'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollObserver() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check touch device & reduced motion
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    if (touch || mediaQuery.matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHoveringInteractive = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update CSS variables for spotlight cards
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        cursorDotRef.current.style.opacity = '1';
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isClickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.spotlight-card');

      isHoveringInteractive = Boolean(isClickable);
    };

    const handleMouseLeave = () => {
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = '0';
    };

    // Smooth lerp loop for the outer cursor ring
    const animateRing = () => {
      const lerp = 0.18;
      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;

      if (cursorRingRef.current) {
        const scale = isHoveringInteractive ? 1.6 : 1;
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
        cursorRingRef.current.style.opacity = '1';
        cursorRingRef.current.style.borderColor = isHoveringInteractive
          ? 'rgba(56, 189, 248, 0.8)'
          : 'rgba(56, 189, 248, 0.35)';
      }

      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll to top button visibility observer
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Custom Fluid Cursor (Hidden on touch devices & reduced motion) */}
      {!isTouchDevice && !reducedMotion && (
        <>
          {/* Inner Sharp Dot */}
          <div
            ref={cursorDotRef}
            className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-cyan-400 pointer-events-none z-[9999] opacity-0 transition-opacity duration-200 shadow-[0_0_8px_rgba(56,189,248,0.9)]"
            style={{ willChange: 'transform' }}
          />
          {/* Outer Smooth Ring */}
          <div
            ref={cursorRingRef}
            className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-cyan-400/40 pointer-events-none z-[9998] opacity-0 transition-[transform,border-color,opacity] duration-150 ease-out"
            style={{ willChange: 'transform' }}
          />
        </>
      )}

      {/* Floating Scroll To Top Pill */}
      {showScrollUp && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#0a0e17]/85 backdrop-blur-md border border-cyan-400/30 text-cyan-300 hover:text-white hover:bg-cyan-500/20 hover:scale-110 flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300 group"
          aria-label="Kembali ke atas halaman"
        >
          <i className="ri-arrow-up-line text-lg group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </>
  );
}
