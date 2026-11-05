'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollObserver() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Touch detection & reduced motion
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // Scroll Progress
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
      setShowScrollUp(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Natural Intersection Observer for Subtle Fade-Up
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
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Smooth, Human-Crafted Magnetic Cursor (Desktop Only)
    if (!touch && !mediaQuery.matches) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let ringX = mouseX;
      let ringY = mouseY;
      let isHoveringInteractive = false;
      let rafId: number;

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

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
      };

      // Silky spring physics loop for the ring follower
      const animateCursor = () => {
        const ringLerp = 0.16;
        ringX += (mouseX - ringX) * ringLerp;
        ringY += (mouseY - ringY) * ringLerp;

        if (cursorRingRef.current) {
          const scale = isHoveringInteractive ? 1.6 : 1;
          cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
          cursorRingRef.current.style.opacity = '1';
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
      {/* Refined, Hairline Top Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-white/70 z-[100] transition-all duration-150 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Human-Crafted Magnetic Cursor (Desktop Only) */}
      {!isTouchDevice && !reducedMotion && (
        <>
          {/* Smooth Follower Ring */}
          <div
            ref={cursorRingRef}
            className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full pointer-events-none z-[9998] opacity-0 transition-[border-color,background-color] duration-200 ease-out flex items-center justify-center ${
              isHovering
                ? 'border border-white/50 bg-white/10 backdrop-blur-[2px]'
                : 'border border-white/25 bg-transparent'
            }`}
            style={{ willChange: 'transform' }}
          />

          {/* Precision Center Dot */}
          <div
            ref={cursorDotRef}
            className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white pointer-events-none z-[9999] opacity-0 transition-opacity duration-150 ${
              isHovering ? 'scale-75' : 'scale-100'
            }`}
            style={{ willChange: 'transform' }}
          />
        </>
      )}

      {/* Refined Scroll-To-Top Button */}
      {showScrollUp && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-500 active:scale-95 flex items-center justify-center shadow-lg transition-all duration-200 group"
          aria-label="Kembali ke atas halaman"
        >
          <i className="ri-arrow-up-line text-base group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </>
  );
}
