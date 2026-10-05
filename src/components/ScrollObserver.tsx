'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollObserver() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
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

    let rawMouseX = winW * 0.5;
    let rawMouseY = winH * 0.38;
    let hasPointerMoved = false;

    let rawScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let smoothScrollY = rawScrollY;
    let lastScrollY = rawScrollY;
    let scrollVelocity = 0;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let lastScrollUpState = rawScrollY >= 350;

    // Koordinat animasi 3-layer (Inti, Bayangan Ekor Utama, dan Aura Pendaran)
    let currentX = rawMouseX;
    let currentY = rawMouseY;
    let trailX = rawMouseX;
    let trailY = rawMouseY;
    let auraX = rawMouseX;
    let auraY = rawMouseY;

    let lastTime = performance.now();
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      hasPointerMoved = true;
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;
      scrollVelocity = scrollDiff;
      lastScrollY = currentScrollY;

      const shouldShow = currentScrollY >= 350;
      if (shouldShow !== lastScrollUpState) {
        lastScrollUpState = shouldShow;
        setShowScrollUp(shouldShow);
      }

      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 350);
    };

    const animateCursor = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.5);
      lastTime = now;

      rawScrollY = window.scrollY;
      smoothScrollY += (rawScrollY - smoothScrollY) * (0.09 * dt);

      // Gelombang pergerakan matematis yang bereaksi terhadap posisi scroll
      const scrollPhase = smoothScrollY * 0.0035;
      const scrollWaveX =
        Math.sin(scrollPhase) * (winW * 0.16) +
        Math.cos(scrollPhase * 1.8) * (winW * 0.04);
      const scrollWaveY =
        Math.cos(scrollPhase * 1.2) * (winH * 0.12) +
        Math.sin(scrollPhase * 0.7) * (winH * 0.03);

      let targetX: number;
      let targetY: number;

      if (!hasPointerMoved || isMobileView()) {
        // Mode Otonom (Mobile & saat belum menggerakkan mouse):
        // Bulat biru meliuk-liuk di layar secara dinamis mengikuti scroll
        targetX =
          winW * 0.5 +
          Math.sin(scrollPhase) * (winW * 0.32) +
          Math.cos(scrollPhase * 1.9) * 35 +
          Math.sin(now * 0.0012) * 16;
        targetY =
          winH * 0.44 +
          Math.cos(scrollPhase * 1.25) * (winH * 0.22) +
          Math.sin(scrollPhase * 0.65) * 25 +
          Math.cos(now * 0.0016) * 12;
      } else {
        // Mode Kursor + Scroll Interaktif:
        // Bulat biru mengikuti kursor mouse, DAN saat di-scroll bulat biru ikut berayun dinamis dengan gelombang scroll
        const waveAmp = isScrolling ? 1.0 : 0.45;
        targetX = rawMouseX + scrollWaveX * waveAmp;
        targetY = rawMouseY + scrollWaveY * waveAmp - scrollVelocity * 0.32;

        targetX = Math.max(16, Math.min(winW - 16, targetX));
        targetY = Math.max(16, Math.min(winH - 16, targetY));
      }

      // Exponential smoothing bertingkat (Inti memimpin, Bayangan membuntuti)
      const leadFactor = 1 - Math.pow(1 - 0.2, dt);
      const trailFactor = 1 - Math.pow(1 - 0.1, dt);
      const auraFactor = 1 - Math.pow(1 - 0.055, dt);

      currentX += (targetX - currentX) * leadFactor;
      currentY += (targetY - currentY) * leadFactor;

      // Bayangan 1 membuntuti kursor inti (efek ekor komet)
      trailX += (currentX - trailX) * trailFactor;
      trailY += (currentY - trailY) * trailFactor;

      // Bayangan 2 membuntuti bayangan 1 (efek pendaran aura atmosfer)
      auraX += (trailX - auraX) * auraFactor;
      auraY += (trailY - auraY) * auraFactor;

      scrollVelocity *= 0.9;
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const pointerSpeed = Math.hypot(dx, dy);
      const speed = Math.min(pointerSpeed + Math.abs(scrollVelocity) * 0.65, 75);
      const isMoving = speed > 0.4;

      const mobile = isMobileView();
      const halfCursor = mobile ? 11 : 16;
      const halfTrail = mobile ? 26 : 32;
      const halfAura = mobile ? 40 : 48;

      // Render Inti Bulat Biru
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${(
          currentX - halfCursor
        ).toFixed(1)}px, ${(currentY - halfCursor).toFixed(1)}px, 0)`;

        const offsetX = Math.max(-28, Math.min(28, -dx * 0.4));
        const offsetY = Math.max(
          -32,
          Math.min(32, -dy * 0.4 + scrollVelocity * 0.45)
        );
        const glowBlur1 = 16 + speed * 0.45;
        const glowBlur2 = 34 + speed * 0.85;
        const glowAlpha = isMoving
          ? Math.min(0.95, 0.52 + speed * 0.01)
          : 0.42;

        cursorRef.current.style.boxShadow = `
          0 0 16px hsla(196, 100%, 85%, ${glowAlpha.toFixed(2)}),
          ${(offsetX * 0.55).toFixed(1)}px ${(offsetY * 0.55).toFixed(1)}px ${glowBlur1.toFixed(0)}px hsla(208, 95%, 65%, ${(glowAlpha * 0.9).toFixed(2)}),
          ${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px ${glowBlur2.toFixed(0)}px hsla(232, 90%, 62%, ${(glowAlpha * 0.68).toFixed(2)})
        `;
      }

      // Render Bayangan Mengikuti (Trailing Shadow 1)
      if (trailRef.current) {
        const trailScale = 1 + (speed / 70) * 0.4;
        const trailOpacity = isMoving
          ? Math.min(0.95, 0.45 + (speed / 70) * 0.5)
          : 0.3;
        trailRef.current.style.transform = `translate3d(${(
          trailX - halfTrail
        ).toFixed(1)}px, ${(trailY - halfTrail).toFixed(1)}px, 0) scale(${trailScale.toFixed(2)})`;
        trailRef.current.style.opacity = String(trailOpacity.toFixed(2));
      }

      // Render Bayangan Pendaran Aura Luar (Aura Shadow 2)
      if (auraRef.current) {
        const auraScale = 1 + (speed / 80) * 0.25;
        auraRef.current.style.transform = `translate3d(${(
          auraX - halfAura
        ).toFixed(1)}px, ${(auraY - halfAura).toFixed(1)}px, 0) scale(${auraScale.toFixed(2)})`;
      }

      // Spotlight Interaktif Mengikuti Bulat Biru
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(580px circle at ${currentX.toFixed(
          0
        )}px ${currentY.toFixed(
          0
        )}px, hsla(210, 90%, 62%, 0.08), transparent 70%)`;
      }

      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(animateCursor);

    // Efek Sentuhan Interaktif: Click Ripple Shockwave
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 550);
    };

    window.addEventListener('click', handleClick, { passive: true });

    // Efek Sentuhan Interaktif: Hover Reaction pada Elemen Interaktif
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !cursorRef.current || !trailRef.current || !auraRef.current)
        return;
      if (
        target.closest(
          'a, button, input, textarea, [role="button"], .work__card, .skills__card, .experience__card, article'
        )
      ) {
        cursorRef.current.classList.add('cursor-hover');
        trailRef.current.classList.add('cursor-hover');
        auraRef.current.classList.add('cursor-hover');
      } else {
        cursorRef.current.classList.remove('cursor-hover');
        trailRef.current.classList.remove('cursor-hover');
        auraRef.current.classList.remove('cursor-hover');
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // IntersectionObserver untuk fokus kartu saat di-scroll di Mobile
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

    // Smooth ScrollReveal Observer (Tanpa Pernah Menyembunyikan Bagian Konten)
    const revealTargetsSelector = [
      '.reveal-init',
      '.section__title',
      '.about__container',
      '.work__card',
      '.skills__card',
      '.experience__card',
      '#experience article',
      '#certificates article',
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
      const siblingIndex = index % 3;
      el.style.transitionDelay = `${siblingIndex * 60}ms`;

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.15 && rect.bottom > -50) {
        el.classList.add('is-revealed');
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 80px 0px' }
    );

    allTargets.forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
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
        <div ref={spotlightRef} className="ambient-bg__spotlight" />
      </div>

      {/* Layer 3: Deep Indigo-Cyan Gradient Shadow Aura (Paling Belakang) */}
      <div ref={auraRef} className="cursor-aura" aria-hidden="true" />

      {/* Layer 2: Sky-Blue Gradient Shadow Trail (Tengah - Bayangan yang ngikutin) */}
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
