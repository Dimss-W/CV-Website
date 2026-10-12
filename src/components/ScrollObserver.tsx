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
    let scrollEnergy = 0;
    let lastScrollTime = 0;
    let lastPointerTime = 0;
    let scrollBlend = 0; // 0 = mouse kursor, 1 = floating center wave saat scroll
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
      lastPointerTime = performance.now();
      // Saat pointer aktif digerakkan, redam energi scroll secara halus
      scrollEnergy = Math.max(0, scrollEnergy - 0.15);
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        hasPointerMoved = true;
        rawMouseX = e.touches[0].clientX;
        rawMouseY = e.touches[0].clientY;
        lastPointerTime = performance.now();
        scrollEnergy = Math.max(0, scrollEnergy - 0.15);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      lastScrollTime = performance.now();

      // Akumulasi energi scroll secara proporsional dan halus (tanpa hentakan timer)
      scrollEnergy = Math.min(1.0, scrollEnergy + Math.min(0.35, scrollDiff * 0.015 + 0.12));

      const shouldShow = currentScrollY >= 350;
      if (shouldShow !== lastScrollUpState) {
        lastScrollUpState = shouldShow;
        setShowScrollUp(shouldShow);
      }
    };

    const animateCursor = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.0);
      lastTime = now;

      // 1. Interpolasi posisi scroll sangat halus
      rawScrollY = window.scrollY;
      smoothScrollY += (rawScrollY - smoothScrollY) * (0.08 * dt);

      // Redam energi scroll secara alami menggunakan continuous exponential decay
      scrollEnergy *= Math.pow(0.94, dt);
      if (scrollEnergy < 0.001) scrollEnergy = 0;

      // 2. Transisi mulus antara posisi pointer vs mode melayang di tengah layar saat scroll
      const isRecentScroll = scrollEnergy > 0.03 || (now - lastScrollTime < 650);
      const isRecentPointer = hasPointerMoved && (now - lastPointerTime < 500);

      let targetBlend = 0;
      if (isRecentScroll && !isRecentPointer) {
        targetBlend = 1.0;
      } else if (isRecentScroll && isRecentPointer) {
        targetBlend = 0.35; // Perpaduan elegan jika user scroll sambil gerak mouse
      } else {
        targetBlend = 0.0;
      }

      const blendSpeed = targetBlend > scrollBlend ? 0.08 : 0.05;
      scrollBlend += (targetBlend - scrollBlend) * (blendSpeed * dt);
      // Hermite smoothstep untuk kurva transisi super mulus
      const easedBlend = scrollBlend * scrollBlend * (3 - 2 * scrollBlend);

      // 3. Gelombang harmonik lembut di tengah layar (Organic Center Wave)
      const scrollPhase = smoothScrollY * 0.0016;
      const timePhase = now * 0.0008;
      const centerWaveX =
        winW * 0.5 +
        Math.sin(scrollPhase + timePhase) * (winW * 0.17) +
        Math.cos(scrollPhase * 1.4 + timePhase * 0.5) * 24;
      const centerWaveY =
        winH * 0.44 +
        Math.cos(scrollPhase * 0.9 + timePhase * 0.7) * (winH * 0.13) +
        Math.sin(scrollPhase * 0.5 + timePhase) * 16;

      let targetX: number;
      let targetY: number;

      if (!hasPointerMoved || isMobileView()) {
        targetX = centerWaveX;
        targetY = centerWaveY;
      } else {
        targetX = (1 - easedBlend) * rawMouseX + easedBlend * centerWaveX;
        targetY = (1 - easedBlend) * rawMouseY + easedBlend * centerWaveY;
      }

      targetX = Math.max(16, Math.min(winW - 16, targetX));
      targetY = Math.max(16, Math.min(winH - 16, targetY));

      // 4. Spring Damping Buttery-Smooth (Tanpa Jitter)
      const leadFactor = 1 - Math.pow(1 - 0.115, dt);
      const trailFactor = 1 - Math.pow(1 - 0.062, dt);
      const auraFactor = 1 - Math.pow(1 - 0.035, dt);

      currentX += (targetX - currentX) * leadFactor;
      currentY += (targetY - currentY) * leadFactor;

      trailX += (currentX - trailX) * trailFactor;
      trailY += (currentY - trailY) * trailFactor;

      auraX += (trailX - auraX) * auraFactor;
      auraY += (trailY - auraY) * auraFactor;

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const instantSpeed = Math.hypot(dx, dy);
      smoothSpeed += (instantSpeed - smoothSpeed) * (0.10 * dt);

      const mobile = isMobileView();
      const halfCursor = mobile ? 11 : 16;
      const halfTrail = mobile ? 26 : 32;
      const halfAura = mobile ? 40 : 48;

      // 5. Render 100% GPU Hardware Accelerated (translate3d & scale)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${(
          currentX - halfCursor
        ).toFixed(2)}px, ${(currentY - halfCursor).toFixed(2)}px, 0)`;
      }

      if (trailRef.current) {
        const trailScale = 1 + Math.min(0.35, (smoothSpeed / 90) * 0.28);
        trailRef.current.style.transform = `translate3d(${(
          trailX - halfTrail
        ).toFixed(2)}px, ${(trailY - halfTrail).toFixed(2)}px, 0) scale(${trailScale.toFixed(2)})`;
      }

      if (auraRef.current) {
        const auraScale = 1 + Math.min(0.25, (smoothSpeed / 100) * 0.18);
        auraRef.current.style.transform = `translate3d(${(
          auraX - halfAura
        ).toFixed(2)}px, ${(auraY - halfAura).toFixed(2)}px, 0) scale(${auraScale.toFixed(2)})`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX.toFixed(
          2
        )}px, ${currentY.toFixed(2)}px, 0)`;
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
