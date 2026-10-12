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

    // Scroll tracking untuk inersia fluida
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollVelocity = 0;

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
      const diff = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Inersia kecepatan scroll untuk efek fluida
      scrollVelocity = Math.max(-45, Math.min(45, diff));

      const shouldShow = currentScrollY >= 350;
      if (shouldShow !== lastScrollUpState) {
        lastScrollUpState = shouldShow;
        setShowScrollUp(shouldShow);
      }
    };

    const animateCursor = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.0);
      lastTime = now;

      // Redam inersia scroll secara kontinu
      scrollVelocity *= Math.pow(0.88, dt);

      // Target bergerak leluasa ke posisi kursor pengguna di manapun kursor berada (kiri, tengah, kanan)
      const targetX = hasMovedMouse ? rawMouseX : winW * 0.5;
      const targetY = hasMovedMouse ? rawMouseY : winH * 0.45;

      // Fisika pergerakan fluida yang leluasa, lincah, dan sangat halus (Fluid Spring)
      const leadFactor = 1 - Math.pow(1 - 0.35, dt);
      const trailFactor = 1 - Math.pow(1 - 0.16, dt);
      const auraFactor = 1 - Math.pow(1 - 0.075, dt);

      currentX += (targetX - currentX) * leadFactor;
      currentY += (targetY - currentY) * leadFactor;

      // Lapisan ekor dan aura merespons aliran scroll dengan inersia elastis
      trailX += (currentX - trailX) * trailFactor;
      trailY += (currentY - trailY + scrollVelocity * 0.25) * trailFactor;

      auraX += (trailX - auraX) * auraFactor;
      auraY += (trailY - auraY + scrollVelocity * 0.5) * auraFactor;

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const moveSpeed = Math.hypot(dx, dy);
      smoothSpeed += (moveSpeed - smoothSpeed) * (0.15 * dt);

      // Efek Fisika Hidup: Deformasi Bentuk Droplet Fluida (Squash & Stretch berdasarkan arah gerak)
      const angle = Math.atan2(dy, dx);
      const stretch = Math.min(0.42, (moveSpeed / 65) * 0.32 + (Math.abs(scrollVelocity) / 40) * 0.22);
      const scaleX = 1 + stretch;
      const scaleY = 1 / (1 + stretch * 0.65);

      // Render 100% GPU Hardware Accelerated - Terpusat Sempurna (-50%, -50%)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX.toFixed(
          2
        )}px, ${currentY.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${angle.toFixed(
          3
        )}rad) scale(${scaleX.toFixed(2)}, ${scaleY.toFixed(2)})`;
      }

      if (trailRef.current) {
        const trailScale = 1 + Math.min(0.35, (smoothSpeed / 80) * 0.28);
        trailRef.current.style.transform = `translate3d(${trailX.toFixed(
          2
        )}px, ${trailY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${trailScale.toFixed(2)})`;
      }

      if (auraRef.current) {
        const auraScale = 1 + Math.min(0.25, (smoothSpeed / 90) * 0.18);
        auraRef.current.style.transform = `translate3d(${auraX.toFixed(
          2
        )}px, ${auraY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${auraScale.toFixed(2)})`;
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

    // Efek Sentuhan Taktil Interaktif: MouseDown & MouseUp
    const handleMouseDown = () => {
      if (cursorRef.current) cursorRef.current.classList.add('cursor--click');
    };
    const handleMouseUp = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('cursor--click');
    };

    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

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

    // Efek Interaksi Cerdas: Respon Berbeda pada Tombol/Link vs Kartu Konten
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !cursorRef.current) return;

      const isAction = target.closest(
        'a, button, [role="button"], input, textarea, select, .tag-pill, .filter-btn, #scroll-up'
      );
      const isCard = target.closest(
        '.work__card, .skills__card, .experience__card, .services__card, #education article, #certificates article, .contact__card'
      );

      if (isAction) {
        cursorRef.current.classList.add('cursor--action');
        cursorRef.current.classList.remove('cursor--card');
        if (trailRef.current) trailRef.current.classList.add('cursor--action');
      } else if (isCard) {
        cursorRef.current.classList.add('cursor--card');
        cursorRef.current.classList.remove('cursor--action');
        if (trailRef.current) trailRef.current.classList.remove('cursor--action');
      } else {
        cursorRef.current.classList.remove('cursor--action', 'cursor--card');
        if (trailRef.current) trailRef.current.classList.remove('cursor--action');
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    rafId = requestAnimationFrame(animateCursor);

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
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
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
