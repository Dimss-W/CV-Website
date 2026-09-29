'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollObserver() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Smooth Scroll Progress Indicator
    let progressTicking = false;
    const handleScroll = () => {
      if (!progressTicking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            setScrollProgress((window.scrollY / totalScroll) * 100);
          }
          progressTicking = false;
        });
        progressTicking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Liquid-Smooth LERP Mouse Follower Spotlight
    const spotlightEl = document.getElementById('ambient-spotlight');
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const updateSpotlight = () => {
      // Linear Interpolation (LERP) factor for silky-smooth trailing
      const ease = 0.09;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (spotlightEl && currentX > -500) {
        spotlightEl.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
      }

      animId = requestAnimationFrame(updateSpotlight);
    };

    animId = requestAnimationFrame(updateSpotlight);

    // 3. Optimized Intersection Observer for Scroll Reveals
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12,
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-init');
    elementsToReveal.forEach((el) => revealObserver.observe(el));

    // Handle any dynamic elements
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll('.reveal-init:not(.is-revealed)');
      newElements.forEach((el) => revealObserver.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Ambient Mouse Spotlight */}
      <div id="ambient-spotlight" className="mouse-spotlight" />
    </>
  );
}
