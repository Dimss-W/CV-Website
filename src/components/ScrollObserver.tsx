'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollObserver() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    // 1. Custom Cursor following mouse (Bedimcode Bianca exact behavior)
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX - 16}px, ${currentY - 16}px, 0)`;
      }
      rafId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateCursor);

    // Hide custom cursor on links & buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !cursorRef.current) return;
      if (target.closest('a, button, input, textarea, [role="button"]')) {
        cursorRef.current.classList.add('hide-cursor');
      } else {
        cursorRef.current.classList.remove('hide-cursor');
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // 2. Show Scroll Up button
    const handleScroll = () => {
      setShowScrollUp(window.scrollY >= 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3. ScrollReveal IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-init');
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Bedimcode Bianca Custom Cursor */}
      <div ref={cursorRef} className="cursor" aria-hidden="true" />

      {/* Bedimcode Bianca Scroll Up Button */}
      <a
        href="#home"
        className={`scrollup ${showScrollUp ? 'show-scroll' : ''}`}
        id="scroll-up"
        aria-label="Scroll to top"
      >
        <i className="ri-arrow-up-line" />
      </a>
    </>
  );
}
