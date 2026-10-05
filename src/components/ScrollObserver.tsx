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

    // Autonomous position generator based on scroll progress
    const getAutoPosition = (scrollY: number) => {
      const w = winW;
      const h = winH;
      const t = scrollY * 0.0036;
      const autoX =
        w * 0.5 +
        Math.sin(t) * (w * 0.32) +
        Math.cos(t * 1.9) * (w * 0.08);
      const autoY =
        h * 0.42 +
        Math.cos(t * 1.25) * (h * 0.22) +
        Math.sin(t * 0.65) * (h * 0.06);
      return { x: autoX, y: autoY };
    };

    const initialPos = getAutoPosition(
      typeof window !== 'undefined' ? window.scrollY : 0
    );

    let targetX = initialPos.x;
    let targetY = initialPos.y;
    let currentX = targetX;
    let currentY = targetY;
    let trailX = targetX;
    let trailY = targetY;
    let auraX = targetX;
    let auraY = targetY;

    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollVelocity = 0;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let hasPointerMoved = false;
    let lastScrollUpState = lastScrollY >= 350;

    let lastTime = performance.now();
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Jangan override posisi saat user sedang aktif scrolling atau di mobile
      if (isScrolling || isMobileView()) return;
      hasPointerMoved = true;
      targetX = e.clientX;
      targetY = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const animateCursor = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.5);
      lastTime = now;

      // Di mobile ATAU saat sedang scroll ATAU sebelum mouse digerakkan:
      // Bulat biru bergerak meliuk-liuk mengikuti gelombang scroll & ayunan ambient
      if (isMobileView() || isScrolling || !hasPointerMoved) {
        const autoPos = getAutoPosition(window.scrollY);
        const idleWaveX = Math.sin(now * 0.0014) * 20;
        const idleWaveY = Math.cos(now * 0.0018) * 16;
        targetX = autoPos.x + idleWaveX;
        targetY = autoPos.y + idleWaveY;
      }

      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Frame-rate independent exponential smoothing (3 lapis untuk bayangan ekor yang sangat halus)
      const leadFactor = 1 - Math.pow(1 - 0.16, dt);
      const trailFactor = 1 - Math.pow(1 - 0.09, dt);
      const auraFactor = 1 - Math.pow(1 - 0.05, dt);

      currentX += dx * leadFactor;
      currentY += dy * leadFactor;

      trailX += (currentX - trailX) * trailFactor;
      trailY += (currentY - trailY) * trailFactor;

      auraX += (trailX - auraX) * auraFactor;
      auraY += (trailY - auraY) * auraFactor;

      scrollVelocity *= 0.9;
      const pointerSpeed = Math.hypot(dx, dy);
      const speed = Math.min(pointerSpeed + Math.abs(scrollVelocity) * 0.65, 65);
      const isMoving = speed > 0.4;

      const mobile = isMobileView();
      const halfCursor = mobile ? 11 : 14;
      const halfTrail = mobile ? 26 : 32;
      const halfAura = mobile ? 40 : 48;

      // 100% GPU Compositor (translate3d)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${(
          currentX - halfCursor
        ).toFixed(1)}px, ${(currentY - halfCursor).toFixed(1)}px, 0)`;

        const offsetX = Math.max(-24, Math.min(24, -dx * 0.38));
        const offsetY = Math.max(
          -28,
          Math.min(28, -dy * 0.38 + scrollVelocity * 0.45)
        );
        const glowBlur1 = 16 + speed * 0.45;
        const glowBlur2 = 32 + speed * 0.85;
        const glowAlpha = isMoving
          ? Math.min(0.9, 0.48 + speed * 0.01)
          : 0.38;

        cursorRef.current.style.boxShadow = `
          0 0 16px hsla(196, 100%, 82%, ${glowAlpha.toFixed(2)}),
          ${(offsetX * 0.55).toFixed(1)}px ${(offsetY * 0.55).toFixed(1)}px ${glowBlur1.toFixed(0)}px hsla(208, 92%, 64%, ${(glowAlpha * 0.88).toFixed(2)}),
          ${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px ${glowBlur2.toFixed(0)}px hsla(232, 88%, 62%, ${(glowAlpha * 0.65).toFixed(2)})
        `;
      }

      if (trailRef.current) {
        const trailScale = 1 + (speed / 60) * 0.35;
        const trailOpacity = isMoving
          ? Math.min(0.92, 0.44 + (speed / 60) * 0.45)
          : 0.28;
        trailRef.current.style.transform = `translate3d(${(
          trailX - halfTrail
        ).toFixed(1)}px, ${(trailY - halfTrail).toFixed(1)}px, 0) scale(${trailScale.toFixed(2)})`;
        trailRef.current.style.opacity = String(trailOpacity.toFixed(2));
      }

      if (auraRef.current) {
        const auraScale = 1 + (speed / 70) * 0.25;
        auraRef.current.style.transform = `translate3d(${(
          auraX - halfAura
        ).toFixed(1)}px, ${(auraY - halfAura).toFixed(1)}px, 0) scale(${auraScale.toFixed(2)})`;
      }

      // Soft ambient background spotlight mengikuti pergerakan bulat biru
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
    rafId = requestAnimationFrame(animateCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !cursorRef.current || !trailRef.current || !auraRef.current)
        return;
      if (target.closest('a, button, input, textarea, [role="button"], .spotlight-card, article')) {
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

      // Saat user sedang scroll, bulat biru aktif bergerak mengalir sendiri mengikuti gelombang
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 350);

      const autoPos = getAutoPosition(currentScrollY);
      targetX = autoPos.x;
      targetY = autoPos.y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver untuk efek fokus kartu saat di-scroll di Mobile
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

    // IntersectionObserver untuk animasi kemunculan halus saat di-scroll (Smooth ScrollReveal)
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

      // Jika elemen sudah berada dalam viewport atau dekat dengan viewport pada awal render, langsung tampilkan
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
        <div ref={spotlightRef} className="ambient-bg__spotlight" />
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
