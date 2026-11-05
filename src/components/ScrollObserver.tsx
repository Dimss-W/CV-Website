'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const SECTIONS = [
  { id: 'home', label: 'Beranda' },
  { id: 'about', label: 'Tentang' },
  { id: 'projects', label: 'Proyek' },
  { id: 'skills', label: 'Keahlian' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'certificates', label: 'Sertifikat' },
  { id: 'education', label: 'Pendidikan' },
  { id: 'contact', label: 'Kontak' },
];

export default function ScrollObserver() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle smooth scroll to section
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Touch detection & reduced motion
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // Dynamic scroll tracking & Section Spying
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollProgress(progress);
      }
      setShowScrollUp(window.scrollY > 320);

      // Section spy
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Multi-Archetype Intersection Observer for Optical Focus Reveals
    const revealElements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .reveal-card'
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

    // Smooth Magnetic Cursor & Interactive Spotlight Tracking (Desktop Only)
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

        // Spotlight card coordinate tracking
        const target = e.target as HTMLElement | null;
        const card = target?.closest('.spotlight-card') as HTMLElement | null;
        if (card) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
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
          target.closest('.spotlight-card') ||
          target.closest('[role="button"]');

        isHoveringInteractive = Boolean(isClickable);
        setIsHovering(Boolean(isClickable));
      };

      const handleMouseLeave = () => {
        if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
        if (cursorRingRef.current) cursorRingRef.current.style.opacity = '0';
      };

      // Silky spring physics loop for follower ring
      const animateCursor = () => {
        const ringLerp = 0.18;
        ringX += (mouseX - ringX) * ringLerp;
        ringY += (mouseY - ringY) * ringLerp;

        if (cursorRingRef.current) {
          const scale = isHoveringInteractive ? 1.5 : 1;
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

  return (
    <>
      {/* Hairline Top Progress Indicator with Subtle Glow Tip */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-zinc-500 via-zinc-200 to-white z-[100] transition-all duration-150 ease-out pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.4)]"
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
                ? 'border border-white/60 bg-white/[0.08] backdrop-blur-[2px]'
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

      {/* Interactive Desktop Section Floating Rail (Right Edge) */}
      <div
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-auto select-none"
        aria-label="Navigasi bagian halaman"
      >
        <div className="p-2 rounded-2xl bg-zinc-950/70 backdrop-blur-md border border-zinc-800/80 shadow-2xl flex flex-col items-center gap-2.5">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className="group relative flex items-center justify-center p-1 focus:outline-none"
                aria-label={`Gulir ke bagian ${sec.label}`}
              >
                {/* Tooltip Label on Hover */}
                <span className="absolute right-7 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700/80 text-[11px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-lg -translate-x-1 group-hover:translate-x-0">
                  {sec.label}
                </span>

                {/* Dot / Pill Indicator */}
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-2 h-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                      : 'w-2 h-2 bg-zinc-600 group-hover:bg-zinc-300 group-hover:scale-125'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Refined Scroll-To-Top Button with Circular Progress Accent */}
      {showScrollUp && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700/70 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-500 active:scale-95 flex items-center justify-center shadow-2xl transition-all duration-200 group"
          aria-label="Kembali ke atas halaman"
        >
          <i className="ri-arrow-up-line text-lg group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>
      )}
    </>
  );
}
