'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollObserver() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const isMobileView = () =>
      typeof window !== 'undefined' && window.innerWidth < 860;

    // Initial autonomous coordinates
    const getAutoPosition = (scrollY: number) => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 390;
      const h = typeof window !== 'undefined' ? window.innerHeight : 800;
      const t = scrollY * 0.0045;
      const autoX =
        w * 0.5 +
        Math.sin(t) * (w * 0.32) +
        Math.cos(t * 2.1) * (w * 0.08);
      const autoY =
        h * 0.42 +
        Math.cos(t * 1.3) * (h * 0.22) +
        Math.sin(t * 0.7) * (h * 0.06);
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
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollVelocity = 0;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Jangan ikuti posisi user jika sedang di-scroll atau di layar mobile
      if (isScrolling || isMobileView()) return;
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animateCursor = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      currentX += dx * 0.14;
      currentY += dy * 0.14;

      trailX += (targetX - trailX) * 0.08;
      trailY += (targetY - trailY) * 0.08;

      scrollVelocity *= 0.9;

      const pointerSpeed = Math.hypot(dx, dy);
      const speed = Math.min(pointerSpeed + Math.abs(scrollVelocity) * 0.65, 65);
      const isMoving = speed > 0.5;

      if (cursorRef.current) {
        const halfSize = isMobileView() ? 10 : 14;
        cursorRef.current.style.transform = `translate3d(${(
          currentX - halfSize
        ).toFixed(1)}px, ${(currentY - halfSize).toFixed(1)}px, 0)`;

        const offsetX = Math.max(-24, Math.min(24, -dx * 0.42));
        const offsetY = Math.max(
          -28,
          Math.min(28, -dy * 0.42 + scrollVelocity * 0.5)
        );
        const glowBlur1 = 16 + speed * 0.45;
        const glowBlur2 = 32 + speed * 0.85;
        const glowAlpha = isMoving
          ? Math.min(0.85, 0.45 + speed * 0.01)
          : 0.32;

        cursorRef.current.style.boxShadow = `
          0 0 14px hsla(196, 100%, 82%, ${glowAlpha.toFixed(2)}),
          ${(offsetX * 0.55).toFixed(1)}px ${(offsetY * 0.55).toFixed(1)}px ${glowBlur1.toFixed(0)}px hsla(208, 92%, 64%, ${(glowAlpha * 0.85).toFixed(2)}),
          ${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px ${glowBlur2.toFixed(0)}px hsla(232, 88%, 62%, ${(glowAlpha * 0.6).toFixed(2)})
        `;
      }

      if (trailRef.current) {
        const trailHalf = isMobileView() ? 26 : 32;
        const trailScale = 1 + (speed / 60) * 0.45;
        const trailOpacity = isMoving
          ? Math.min(0.9, 0.42 + (speed / 60) * 0.48)
          : 0.26;
        trailRef.current.style.transform = `translate3d(${(
          trailX - trailHalf
        ).toFixed(1)}px, ${(trailY - trailHalf).toFixed(1)}px, 0) scale(${trailScale.toFixed(2)})`;
        trailRef.current.style.opacity = String(trailOpacity.toFixed(2));
      }

      // Subtle interactive ambient spotlight on background
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(560px circle at ${currentX.toFixed(
          0
        )}px ${currentY.toFixed(
          0
        )}px, hsla(210, 90%, 62%, 0.07), transparent 70%)`;
      }

      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateCursor);

    const handleMouseOver = (e: MouseEvent) => {
      if (isMobileView()) return;
      const target = e.target as HTMLElement | null;
      if (!target || !cursorRef.current || !trailRef.current) return;
      if (target.closest('a, button, input, textarea, [role="button"]')) {
        cursorRef.current.classList.add('hide-cursor');
        trailRef.current.classList.add('hide-cursor');
      } else {
        cursorRef.current.classList.remove('hide-cursor');
        trailRef.current.classList.remove('hide-cursor');
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    const interactiveCardsSelector =
      '.work__card, .services__card, .skills__card, #experience article, #education article, .contact__card';

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity = Math.max(-45, Math.min(45, deltaY));

      setShowScrollUp(currentScrollY >= 350);

      // Saat user sedang scroll, bulat biru bergerak sendiri secara otonom
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 220);

      const autoPos = getAutoPosition(currentScrollY);
      targetX = autoPos.x;
      targetY = autoPos.y;

      if (isMobileView()) {
        const viewportCenter = window.innerHeight * 0.52;
        const cards = document.querySelectorAll<HTMLElement>(
          interactiveCardsSelector
        );
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const dist = Math.abs(cardCenter - viewportCenter);
          if (dist < Math.min(220, rect.height * 0.65)) {
            card.classList.add('scroll-focus');
          } else {
            card.classList.remove('scroll-focus');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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

    const observer = new IntersectionObserver(
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

    allTargets.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Clean, Minimalist Architectural Background */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-bg__dots" />
        <div ref={spotlightRef} className="ambient-bg__spotlight" />
      </div>

      {/* Gradient Shadow Trail following cursor/scroll movement */}
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />

      {/* Bedimcode Bianca Custom Cursor with Gradient Glow */}
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
