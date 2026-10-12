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
    let hasMovedMouse = false;
    let lastScrollUpState = (typeof window !== 'undefined' ? window.scrollY : 0) >= 350;

    // Scroll state tracking
    let smoothScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let targetScrollY = smoothScrollY;
    let isScrolling = false;
    let scrollActivity = 0; // 0 = mode kursor mouse, 1 = mode gelombang mengalir saat scroll
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

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

    const setCursorOpacity = (opacity: string) => {
      if (cursorRef.current) cursorRef.current.style.opacity = opacity;
      if (trailRef.current) trailRef.current.style.opacity = opacity;
      if (auraRef.current) auraRef.current.style.opacity = opacity;
      if (spotlightRef.current) spotlightRef.current.style.opacity = opacity;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMovedMouse) {
        hasMovedMouse = true;
        currentX = e.clientX;
        currentY = e.clientY;
        trailX = e.clientX;
        trailY = e.clientY;
        auraX = e.clientX;
        auraY = e.clientY;
        setCursorOpacity('1');
      }
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;

      // Saat mouse digerakkan aktif, kurangi mode scroll agar kursor lekas diprioritaskan
      scrollActivity = Math.max(0, scrollActivity - 0.25);
      isScrolling = false;

      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        if (!hasMovedMouse) {
          hasMovedMouse = true;
          currentX = e.touches[0].clientX;
          currentY = e.touches[0].clientY;
          trailX = e.touches[0].clientX;
          trailY = e.touches[0].clientY;
          auraX = e.touches[0].clientX;
          auraY = e.touches[0].clientY;
          setCursorOpacity('1');
        }
        rawMouseX = e.touches[0].clientX;
        rawMouseY = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      setCursorOpacity('0');
    };

    const handleMouseEnter = (e: MouseEvent) => {
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
      setCursorOpacity('1');
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      targetScrollY = currentScrollY;

      // Masuk ke mode scroll mulus
      isScrolling = true;
      scrollActivity = Math.min(1.0, scrollActivity + 0.35);

      if (scrollTimer) clearTimeout(scrollTimer);
      // Ketika berhenti scroll selama 220ms, perlahan kembali ke kursor mouse
      scrollTimer = setTimeout(() => {
        isScrolling = false;
      }, 220);

      const shouldShow = currentScrollY >= 350;
      if (shouldShow !== lastScrollUpState) {
        lastScrollUpState = shouldShow;
        setShowScrollUp(shouldShow);
      }
    };

    const animateCursor = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.0);
      lastTime = now;

      // Interpolasi scroll halus
      targetScrollY = window.scrollY;
      smoothScrollY += (targetScrollY - smoothScrollY) * (0.08 * dt);

      // Redam aktivitas scroll secara kontinu jika tidak sedang aktif scroll
      if (!isScrolling) {
        scrollActivity *= Math.pow(0.91, dt);
        if (scrollActivity < 0.005) scrollActivity = 0;
      }

      // Kurva blend halus (Hermite smoothstep)
      const blend = scrollActivity * scrollActivity * (3 - 2 * scrollActivity);

      // 1. Target Posisi saat Mode Scroll (Gelombang tenang melayang di tengah layar, tidak ke pinggir)
      const timePhase = now * 0.001;
      const scrollPhase = smoothScrollY * 0.0018;
      const waveX = winW * 0.5 + Math.sin(timePhase + scrollPhase) * 55;
      const waveY = winH * 0.45 + Math.cos(timePhase * 0.8 + scrollPhase * 0.9) * 40;

      // 2. Target Posisi saat Mode Kursor Mouse
      const mouseTargetX = hasMovedMouse ? rawMouseX : winW * 0.5;
      const mouseTargetY = hasMovedMouse ? rawMouseY : winH * 0.45;

      // 3. Interpolasi Posisi: Saat scroll -> melayang anggun di tengah; saat berhenti -> meluncur halus ke kursor
      const targetX = (1 - blend) * mouseTargetX + blend * waveX;
      const targetY = (1 - blend) * mouseTargetY + blend * waveY;

      // 4. Fisika Fluida Organik (Tidak kaku dikunci, bergerak lembut & elastis)
      const springK = (1 - blend) * 0.28 + blend * 0.12;
      const leadFactor = 1 - Math.pow(1 - springK, dt);
      const trailFactor = 1 - Math.pow(1 - 0.11, dt);
      const auraFactor = 1 - Math.pow(1 - 0.055, dt);

      currentX += (targetX - currentX) * leadFactor;
      currentY += (targetY - currentY) * leadFactor;

      trailX += (currentX - trailX) * trailFactor;
      trailY += (currentY - trailY) * trailFactor;

      auraX += (trailX - auraX) * auraFactor;
      auraY += (trailY - auraY) * auraFactor;

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const instantSpeed = Math.hypot(dx, dy);
      smoothSpeed += (instantSpeed - smoothSpeed) * (0.15 * dt);

      const mobile = isMobileView();
      const halfCursor = mobile ? 11 : 16;
      const halfTrail = mobile ? 26 : 32;
      const halfAura = mobile ? 40 : 48;

      // Render 100% GPU Hardware Accelerated (translate3d)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${(
          currentX - halfCursor
        ).toFixed(2)}px, ${(currentY - halfCursor).toFixed(2)}px, 0)`;
      }

      if (trailRef.current) {
        const trailScale = 1 + Math.min(0.35, (smoothSpeed / 80) * 0.28);
        trailRef.current.style.transform = `translate3d(${(
          trailX - halfTrail
        ).toFixed(2)}px, ${(trailY - halfTrail).toFixed(2)}px, 0) scale(${trailScale.toFixed(2)})`;
      }

      if (auraRef.current) {
        const auraScale = 1 + Math.min(0.25, (smoothSpeed / 90) * 0.18);
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
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
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
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (scrollTimer) clearTimeout(scrollTimer);
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
