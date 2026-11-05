'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollObserver() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const cursorTrailRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check touch device & reduced motion
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // Scroll Progress & Scroll To Top Visibility Observer
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
      setShowScrollUp(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Intersection Observer for Smooth Directional Scroll Reveals
    const revealElements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Multi-Layer Cyber Ruby Cursor Physics (Desktop only)
    if (!touch && !mediaQuery.matches) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let ringX = mouseX;
      let ringY = mouseY;
      let trailX = mouseX;
      let trailY = mouseY;
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
        setIsHovering(Boolean(isClickable));
      };

      const handleMouseLeave = () => {
        if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
        if (cursorRingRef.current) cursorRingRef.current.style.opacity = '0';
        if (cursorTrailRef.current) cursorTrailRef.current.style.opacity = '0';
      };

      // 60fps Physics loop for dual concentric trailing layers
      const animateCursor = () => {
        // Fast ring lerp
        const ringLerp = 0.2;
        ringX += (mouseX - ringX) * ringLerp;
        ringY += (mouseY - ringY) * ringLerp;

        // Fluid lagging comet tail lerp
        const trailLerp = 0.09;
        trailX += (mouseX - trailX) * trailLerp;
        trailY += (mouseY - trailY) * trailLerp;

        if (cursorRingRef.current) {
          const scale = isHoveringInteractive ? 1.85 : 1;
          cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
          cursorRingRef.current.style.opacity = '1';
        }

        if (cursorTrailRef.current) {
          cursorTrailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
          cursorTrailRef.current.style.opacity = '1';
        }

        rafId = requestAnimationFrame(animateCursor);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseover', handleMouseOver, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);

      rafId = requestAnimationFrame(animateCursor);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseleave', handleMouseLeave);
        cancelAnimationFrame(rafId);
        observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Silky Top Scroll Progress Indicator in Ruby Flame */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-rose-600 via-red-500 to-amber-400 z-[100] transition-all duration-150 ease-out pointer-events-none shadow-[0_0_12px_rgba(244,63,94,0.8)]"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Spectacular Multi-Layer Cyber Ruby Cursor (Desktop only) */}
      {!isTouchDevice && !reducedMotion && (
        <>
          {/* Layer 3: Lagging Fluid Ambient Aura */}
          <div
            ref={cursorTrailRef}
            className="fixed top-0 left-0 w-12 h-12 -ml-6 -mt-6 rounded-full bg-rose-500/10 blur-md pointer-events-none z-[9997] opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{ willChange: 'transform' }}
          />

          {/* Layer 2: Cyber Reticle Aura Ring with Shadows & Crosshairs */}
          <div
            ref={cursorRingRef}
            className={`fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full pointer-events-none z-[9998] opacity-0 transition-[border-color,background-color] duration-200 ease-out flex items-center justify-center ${
              isHovering
                ? 'border-2 border-rose-400 bg-rose-500/15 backdrop-blur-[2px] shadow-[0_0_30px_rgba(244,63,94,0.65),inset_0_0_15px_rgba(244,63,94,0.35)]'
                : 'border border-rose-500/40 shadow-[0_0_20px_rgba(225,29,72,0.35),inset_0_0_8px_rgba(225,29,72,0.15)]'
            }`}
            style={{ willChange: 'transform' }}
          >
            {/* Subtle Crosshair Reticle Notches on Hover */}
            {isHovering && (
              <>
                <div className="absolute -top-1 w-1 h-1 rounded-full bg-rose-300" />
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-rose-300" />
                <div className="absolute -left-1 w-1 h-1 rounded-full bg-rose-300" />
                <div className="absolute -right-1 w-1 h-1 rounded-full bg-rose-300" />
              </>
            )}
          </div>

          {/* Layer 1: Core Glowing Ruby Nucleus with Deep Shadow */}
          <div
            ref={cursorDotRef}
            className={`fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-gradient-to-tr from-rose-500 to-amber-300 pointer-events-none z-[9999] opacity-0 transition-[transform,opacity] duration-150 shadow-[0_0_12px_#f43f5e,0_0_24px_#e11d48,0_0_36px_rgba(244,63,94,0.6)] ${
              isHovering ? 'scale-75' : 'scale-100'
            }`}
            style={{ willChange: 'transform' }}
          />
        </>
      )}

      {/* Floating Scroll To Top Pill with Ruby Glow */}
      {showScrollUp && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#0e0a0d]/90 backdrop-blur-md border border-rose-500/40 text-rose-300 hover:text-white hover:bg-rose-600/25 hover:scale-110 active:scale-95 flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.8),0_0_25px_rgba(225,29,72,0.4)] transition-all duration-300 group"
          aria-label="Kembali ke atas halaman"
        >
          <i className="ri-arrow-up-line text-lg group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </>
  );
}
