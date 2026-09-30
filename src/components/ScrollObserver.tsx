'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollObserver() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    // 1. Custom Cursor & Touch/Scroll Follower with Dynamic Gradient Shadow
    let mouseX = typeof window !== 'undefined' ? window.innerWidth / 2 : -100;
    let mouseY = typeof window !== 'undefined' ? window.innerHeight / 3 : -100;
    let currentX = mouseX;
    let currentY = mouseY;
    let trailX = mouseX;
    let trailY = mouseY;
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollVelocity = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    const animateCursor = () => {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;

      currentX += dx * 0.22;
      currentY += dy * 0.22;

      trailX += (mouseX - trailX) * 0.11;
      trailY += (mouseY - trailY) * 0.11;

      scrollVelocity *= 0.88;

      const pointerSpeed = Math.hypot(dx, dy);
      const speed = Math.min(pointerSpeed + Math.abs(scrollVelocity) * 0.6, 65);
      const isMoving = speed > 0.6;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX - 15}px, ${currentY - 15}px, 0)`;

        const offsetX = Math.max(-22, Math.min(22, -dx * 0.38));
        const offsetY = Math.max(
          -26,
          Math.min(26, -dy * 0.38 + scrollVelocity * 0.45)
        );
        const glowBlur1 = 16 + speed * 0.45;
        const glowBlur2 = 34 + speed * 0.85;
        const glowAlpha = isMoving ? Math.min(0.88, 0.45 + speed * 0.012) : 0.38;

        cursorRef.current.style.boxShadow = `
          0 0 14px hsla(196, 100%, 85%, ${glowAlpha}),
          ${offsetX * 0.55}px ${offsetY * 0.55}px ${glowBlur1}px hsla(208, 92%, 64%, ${glowAlpha * 0.9}),
          ${offsetX}px ${offsetY}px ${glowBlur2}px hsla(235, 88%, 62%, ${glowAlpha * 0.65})
        `;
      }

      if (trailRef.current) {
        const trailScale = 1 + (speed / 60) * 0.45;
        const trailOpacity = isMoving
          ? Math.min(0.95, 0.45 + (speed / 60) * 0.5)
          : 0.32;
        trailRef.current.style.transform = `translate3d(${trailX - 32}px, ${trailY - 32}px, 0) scale(${trailScale.toFixed(2)})`;
        trailRef.current.style.opacity = String(trailOpacity.toFixed(2));
      }

      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    rafId = requestAnimationFrame(animateCursor);

    // Hide custom cursor on links & buttons when hovered on desktop
    const handleMouseOver = (e: MouseEvent) => {
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

    // 2. Scroll Interactivity (Scroll-Up Button + Scroll Velocity + Mobile Viewport Active Focus)
    const interactiveCardsSelector =
      '.work__card, .services__card, .skills__card, #experience article, #education article, .contact__card';

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity = Math.max(-45, Math.min(45, deltaY));

      setShowScrollUp(currentScrollY >= 350);

      // On mobile/tablet (< 860px), gently wave the ambient orb & highlight cards in viewport center
      if (window.innerWidth < 860) {
        const waveX =
          window.innerWidth * 0.5 +
          Math.sin(currentScrollY * 0.006) * (window.innerWidth * 0.28);
        const waveY = window.innerHeight * 0.38;
        mouseX = waveX;
        mouseY = waveY;

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

    // 3. Staggered & Reversible ScrollReveal on Both Web & Mobile
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
      // Assign subtle stagger delay for sibling cards
      const siblingIndex = index % 4;
      el.style.transitionDelay = `${siblingIndex * 65}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            // Reset when scrolled completely out of view so scrolling up/down stays interactive
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
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
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
