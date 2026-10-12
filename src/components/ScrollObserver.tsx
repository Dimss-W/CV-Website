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
    let rawMouseY = winH * 0.42;
    let hasPointerMoved = false;

    let rawScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let smoothScrollY = rawScrollY;
    let lastScrollY = rawScrollY;
    let scrollVelocity = 0;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let scrollBlend = 0; // 0 = kursor mouse, 1 = otomatis pindah ke tengah layar saat scroll
    let lastScrollUpState = rawScrollY >= 350;

    // Koordinat animasi 3-layer (Inti, Bayangan Ekor, dan Aura)
    let currentX = rawMouseX;
    let currentY = rawMouseY;
    let trailX = rawMouseX;
    let trailY = rawMouseY;
    let auraX = rawMouseX;
    let auraY = rawMouseY;
    let smoothSpeed = 0;

    let lastTime = performance.now();
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      hasPointerMoved = true;
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
      // Responsif instan: jika mouse digerakkan, kurangi mode scroll agar kursor langsung responsif
      scrollBlend = Math.max(0, scrollBlend - 0.2);
      isScrolling = false;
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        hasPointerMoved = true;
        rawMouseX = e.touches[0].clientX;
        rawMouseY = e.touches[0].clientY;
        scrollBlend = Math.max(0, scrollBlend - 0.2);
        isScrolling = false;
      }
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

      // Saat user scroll, aktifkan mode otomatis pindah ke tengah secara lembut & elegan
      isScrolling = true;
      scrollBlend = Math.min(1.0, scrollBlend + 0.25);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 300);
    };

    const animateCursor = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.5);
      lastTime = now;

      // Interpolasi scrollY super mulus
      rawScrollY = window.scrollY;
      smoothScrollY += (rawScrollY - smoothScrollY) * (0.09 * dt);

      // Transisi lembut ke tengah saat scroll dan kembali ke posisi mouse
      const targetBlend = isScrolling ? 1.0 : 0.0;
      const blendRate = isScrolling ? 0.15 : 0.06;
      scrollBlend += (targetBlend - scrollBlend) * (blendRate * dt);

      // Gelombang matematis anggun di area tengah layar (Center Undulating Wave)
      const scrollPhase = smoothScrollY * 0.0032;
      const centerWaveX =
        winW * 0.5 +
        Math.sin(scrollPhase) * (winW * 0.20) +
        Math.cos(scrollPhase * 1.6) * 30;
      const centerWaveY =
        winH * 0.45 +
        Math.cos(scrollPhase * 1.1) * (winH * 0.16) +
        Math.sin(scrollPhase * 0.55) * 20;

      let targetX: number;
      let targetY: number;

      if (!hasPointerMoved || isMobileView()) {
        targetX = centerWaveX + Math.sin(now * 0.001) * 12;
        targetY = centerWaveY + Math.cos(now * 0.0014) * 8;
      } else {
        const easeFactor = scrollBlend * scrollBlend * (3 - 2 * scrollBlend);
        targetX = (1 - easeFactor) * rawMouseX + easeFactor * centerWaveX;
        targetY = (1 - easeFactor) * rawMouseY + easeFactor * centerWaveY;
      }

      targetX = Math.max(16, Math.min(winW - 16, targetX));
      targetY = Math.max(16, Math.min(winH - 16, targetY));

      // Damping sangat halus & nyaman (Ultra-Smooth Fluid Damping)
      const leadFactor = 1 - Math.pow(1 - 0.18, dt);
      const trailFactor = 1 - Math.pow(1 - 0.09, dt);
      const auraFactor = 1 - Math.pow(1 - 0.045, dt);

      currentX += (targetX - currentX) * leadFactor;
      currentY += (targetY - currentY) * leadFactor;

      trailX += (currentX - trailX) * trailFactor;
      trailY += (currentY - trailY) * trailFactor;

      auraX += (trailX - auraX) * auraFactor;
      auraY += (trailY - auraY) * auraFactor;

      scrollVelocity *= 0.90;
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const instantSpeed = Math.hypot(dx, dy);
      smoothSpeed += (instantSpeed - smoothSpeed) * (0.16 * dt);

      const mobile = isMobileView();
      const halfCursor = mobile ? 11 : 16;
      const halfTrail = mobile ? 26 : 32;
      const halfAura = mobile ? 40 : 48;

      // Render Inti Bulat Biru
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${(
          currentX - halfCursor
        ).toFixed(2)}px, ${(currentY - halfCursor).toFixed(2)}px, 0)`;

        const offsetX = Math.max(-26, Math.min(26, -dx * 0.35));
        const offsetY = Math.max(-28, Math.min(28, -dy * 0.35));
        const glowBlur1 = 16 + smoothSpeed * 0.35;
        const glowBlur2 = 32 + smoothSpeed * 0.65;
        const glowAlpha = Math.min(0.95, 0.46 + smoothSpeed * 0.012);

        cursorRef.current.style.boxShadow = `
          0 0 16px hsla(196, 100%, 85%, ${glowAlpha.toFixed(2)}),
          ${(offsetX * 0.5).toFixed(1)}px ${(offsetY * 0.5).toFixed(1)}px ${glowBlur1.toFixed(0)}px hsla(208, 95%, 65%, ${(glowAlpha * 0.9).toFixed(2)}),
          ${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px ${glowBlur2.toFixed(0)}px hsla(232, 90%, 62%, ${(glowAlpha * 0.68).toFixed(2)})
        `;
      }

      // Render Bayangan Ekor yang Mengikuti (Trailing Shadow 1)
      if (trailRef.current) {
        const trailScale = 1 + (smoothSpeed / 80) * 0.35;
        const trailOpacity = Math.min(0.92, 0.36 + (smoothSpeed / 80) * 0.45);
        trailRef.current.style.transform = `translate3d(${(
          trailX - halfTrail
        ).toFixed(2)}px, ${(trailY - halfTrail).toFixed(2)}px, 0) scale(${trailScale.toFixed(2)})`;
        trailRef.current.style.opacity = String(trailOpacity.toFixed(2));
      }

      // Render Aura Atmosfer Terluar (Aura Shadow 2)
      if (auraRef.current) {
        const auraScale = 1 + (smoothSpeed / 90) * 0.22;
        auraRef.current.style.transform = `translate3d(${(
          auraX - halfAura
        ).toFixed(2)}px, ${(auraY - halfAura).toFixed(2)}px, 0) scale(${auraScale.toFixed(2)})`;
      }

      // Ambient Spotlight Responsif di Latar Belakang
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(620px circle at ${currentX.toFixed(
          1
        )}px ${currentY.toFixed(
          1
        )}px, hsla(210, 90%, 62%, 0.08), transparent 70%)`;
      }

      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
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
      }, 500);
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

    // Smooth ScrollReveal Observer Responsif
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
      el.style.transitionDelay = `${siblingIndex * 40}ms`;

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
      window.removeEventListener('touchmove', handleTouchMove);
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
      <div
        ref={auraRef}
        className="cursor-aura"
        aria-hidden="true"
        style={{ transform: 'translate3d(calc(50vw - 48px), calc(45vh - 48px), 0)' }}
      />

      {/* Layer 2: Sky-Blue Gradient Shadow Trail (Tengah - Bayangan yang ngikutin) */}
      <div
        ref={trailRef}
        className="cursor-trail"
        aria-hidden="true"
        style={{ transform: 'translate3d(calc(50vw - 32px), calc(45vh - 32px), 0)' }}
      />

      {/* Layer 1: Core Luminous Blue Orb (Utama) */}
      <div
        ref={cursorRef}
        className="cursor"
        aria-hidden="true"
        style={{ transform: 'translate3d(calc(50vw - 16px), calc(45vh - 16px), 0)' }}
      />

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
