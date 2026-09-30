'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollObserver() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const isMobileView = () =>
      typeof window !== 'undefined' && window.innerWidth < 860;

    let winW = typeof window !== 'undefined' ? window.innerWidth : 390;
    let winH = typeof window !== 'undefined' ? window.innerHeight : 800;

    const handleResize = () => {
      winW = window.innerWidth;
      winH = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let rawScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let smoothScrollY = rawScrollY;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let lastScrollUpState = rawScrollY >= 350;

    // Posisi kursor manual (hanya dipakai di Desktop saat tidak scroll)
    let pointerX = winW * 0.5;
    let pointerY = winH * 0.38;
    let hasPointerMoved = false;

    let currentX = pointerX;
    let currentY = pointerY;
    let trailX = pointerX;
    let trailY = pointerY;
    let auraX = pointerX;
    let auraY = pointerY;

    let lastTime = performance.now();
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (isScrolling || isMobileView()) return;
      hasPointerMoved = true;
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    const animateCursor = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.5);
      lastTime = now;

      // Interpolasi scrollY secara mulus di setiap frame agar tidak patah-patah di mobile
      rawScrollY = window.scrollY;
      smoothScrollY += (rawScrollY - smoothScrollY) * (0.09 * dt);

      const mobile = winW < 860;
      let targetX = pointerX;
      let targetY = pointerY;

      // Di mobile ATAU saat sedang di-scroll, bulat biru bergerak mengalir sendiri secara halus
      if (mobile || isScrolling || !hasPointerMoved) {
        const scrollPhase = smoothScrollY * 0.0038;
        const timePhase = now * 0.00085;
        const phase = scrollPhase + timePhase;

        targetX =
          winW * 0.5 +
          Math.sin(phase) * (winW * 0.3) +
          Math.cos(phase * 1.7) * (winW * 0.07);
        targetY =
          winH * 0.44 +
          Math.cos(phase * 1.15) * (winH * 0.2) +
          Math.sin(phase * 0.65) * (winH * 0.06);

        pointerX = targetX;
        pointerY = targetY;
      }

      // Frame-rate independent exponential smoothing (3 lapis untuk efek gradasi bayangan ekor)
      const leadFactor = 1 - Math.pow(1 - 0.16, dt);
      const trailFactor = 1 - Math.pow(1 - 0.095, dt);
      const auraFactor = 1 - Math.pow(1 - 0.055, dt);

      currentX += (targetX - currentX) * leadFactor;
      currentY += (targetY - currentY) * leadFactor;

      trailX += (currentX - trailX) * trailFactor;
      trailY += (currentY - trailY) * trailFactor;

      auraX += (trailX - auraX) * auraFactor;
      auraY += (trailY - auraY) * auraFactor;

      const halfCursor = mobile ? 10 : 14;
      const halfTrail = mobile ? 24 : 30;
      const halfAura = mobile ? 38 : 46;

      // 100% GPU Compositor (hanya translate3d, 0% CPU repaint)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${(
          currentX - halfCursor
        ).toFixed(2)}px, ${(currentY - halfCursor).toFixed(2)}px, 0)`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${(
          trailX - halfTrail
        ).toFixed(2)}px, ${(trailY - halfTrail).toFixed(2)}px, 0)`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${(
          auraX - halfAura
        ).toFixed(2)}px, ${(auraY - halfAura).toFixed(2)}px, 0)`;
      }

      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateCursor);

    const handleMouseOver = (e: MouseEvent) => {
      if (isMobileView()) return;
      const target = e.target as HTMLElement | null;
      if (!target || !cursorRef.current || !trailRef.current || !auraRef.current)
        return;
      if (target.closest('a, button, input, textarea, [role="button"]')) {
        cursorRef.current.classList.add('hide-cursor');
        trailRef.current.classList.add('hide-cursor');
        auraRef.current.classList.add('hide-cursor');
      } else {
        cursorRef.current.classList.remove('hide-cursor');
        trailRef.current.classList.remove('hide-cursor');
        auraRef.current.classList.remove('hide-cursor');
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      rawScrollY = currentScrollY;

      const shouldShow = currentScrollY >= 350;
      if (shouldShow !== lastScrollUpState) {
        lastScrollUpState = shouldShow;
        setShowScrollUp(shouldShow);
      }

      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 240);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver untuk efek fokus kartu saat di-scroll di Mobile (0% layout thrashing)
    const interactiveCards = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.work__card, .services__card, .skills__card, #experience article, #education article, .contact__card'
      )
    );

    const focusObserver = new IntersectionObserver(
      (entries) => {
        if (!isMobileView()) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-focus');
          } else {
            entry.target.classList.remove('scroll-focus');
          }
        });
      },
      { threshold: 0.25, rootMargin: '-22% 0px -22% 0px' }
    );

    interactiveCards.forEach((card) => focusObserver.observe(card));

    // IntersectionObserver untuk animasi kemunculan (ScrollReveal)
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

    const revealObserver = new IntersectionObserver(
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

    allTargets.forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      cancelAnimationFrame(rafId);
      focusObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Clean, Minimalist Architectural Background */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-bg__dots" />
      </div>

      {/* Layer 3: Deep Indigo-Cyan Gradient Shadow Aura (Paling Belakang) */}
      <div ref={auraRef} className="cursor-aura" aria-hidden="true" />

      {/* Layer 2: Sky-Blue Gradient Shadow Trail (Tengah) */}
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />

      {/* Layer 1: Core Luminous Blue Orb (Utama) */}
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
