'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  // Smooth lerp coordinates for buttery 60fps physics
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion for accessibility
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Mouse / Pointer Move Handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    setPixelPos({ x: relX, y: relY });

    // Normalised coordinates (-1 to +1) from center
    const normX = ((relX / rect.width) - 0.5) * 2;
    const normY = ((relY / rect.height) - 0.5) * 2;

    setTargetPos({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY)),
    });
    setIsHovered(true);
  }, []);

  // Touch Move Handler for Mobile Devices
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!containerRef.current || !e.touches || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];

    const relX = touch.clientX - rect.left;
    const relY = touch.clientY - rect.top;
    setPixelPos({ x: relX, y: relY });

    const normX = ((relX / rect.width) - 0.5) * 2;
    const normY = ((relY / rect.height) - 0.5) * 2;

    setTargetPos({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY)),
    });
    setIsHovered(true);
  }, []);

  // Gyroscope / Device Orientation on supported mobile devices
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right tilt in [-90, 90]
        // beta: front-to-back tilt in [-180, 180]
        const normX = Math.max(-1, Math.min(1, e.gamma / 30));
        const normY = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
        setTargetPos({ x: normX, y: normY });
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [reducedMotion]);

  // Event Listeners for Container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onLeave = () => {
      setTargetPos({ x: 0, y: 0 });
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', onLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', onLeave);
    };
  }, [handleMouseMove, handleTouchMove]);

  // Smooth lerp animation loop (spring physics)
  useEffect(() => {
    if (reducedMotion) {
      setCurrentPos({ x: 0, y: 0 });
      return;
    }

    let rafId: number;
    const animate = () => {
      setCurrentPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        // Damp factor for silky response
        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12,
        };
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [targetPos, reducedMotion]);

  const cvDownloadUrl =
    profile.resume_url && profile.resume_url !== '#contact'
      ? profile.resume_url
      : '/CV_Dimas_Wijanarko_ATS.pdf';

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-x-clip overflow-y-hidden pt-24 md:pt-28 pb-12 px-4 sm:px-6 lg:px-8 select-none bg-[var(--body-color)] transition-colors duration-500"
      id="home"
      aria-label="Beranda Portofolio Dimas Wijanarko"
    >
      {/* 1. DYNAMIC CURSOR-TRACKING SPOTLIGHT (Cahaya Panggung Mengikuti Kursor) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: isHovered ? 1 : 0.45,
          background: isHovered
            ? `radial-gradient(850px circle at ${pixelPos.x}px ${pixelPos.y}px, rgba(56, 189, 248, 0.16) 0%, rgba(14, 165, 233, 0.05) 50%, transparent 75%)`
            : `radial-gradient(900px circle at 50% 45%, rgba(56, 189, 248, 0.12) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. ATMOSPHERIC AMBIENT HALO (Pijar Biru Neon di Tengah) */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[480px] lg:w-[680px] h-[300px] sm:h-[480px] lg:h-[680px] rounded-full bg-gradient-to-tr from-[var(--first-color)]/25 via-sky-500/10 to-transparent blur-[110px] md:blur-[140px] -z-10"
        aria-hidden="true"
      />

      {/* 3. FLOATING CYBER GEOMETRIC PARTICLES (Partikel Kedalaman Multi-Layer) */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden will-change-transform hidden sm:block"
        aria-hidden="true"
      >
        {/* Particle 1: Diamond top left */}
        <span
          className="absolute top-[22%] left-[12%] text-[var(--first-color)]/40 font-mono text-sm"
          style={{
            transform: `translate3d(${currentPos.x * 24}px, ${currentPos.y * 18}px, 0)`,
            transition: 'transform 0.1s linear',
          }}
        >
          ✦
        </span>

        {/* Particle 2: Plus marker mid left */}
        <span
          className="absolute top-[68%] left-[8%] text-white/30 font-mono text-lg font-bold"
          style={{
            transform: `translate3d(${currentPos.x * -18}px, ${currentPos.y * -14}px, 0)`,
            transition: 'transform 0.1s linear',
          }}
        >
          +
        </span>

        {/* Particle 3: Code bracket top right */}
        <span
          className="absolute top-[20%] right-[14%] text-[var(--first-color)]/35 font-mono text-base font-semibold"
          style={{
            transform: `translate3d(${currentPos.x * 30}px, ${currentPos.y * 22}px, 0)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {'{ }'}
        </span>

        {/* Particle 4: Tech dot bottom right */}
        <span
          className="absolute bottom-[24%] right-[10%] w-2 h-2 rounded-full bg-[var(--first-color)]/40 shadow-[0_0_12px_var(--first-color)]"
          style={{
            transform: `translate3d(${currentPos.x * -22}px, ${currentPos.y * -16}px, 0)`,
            transition: 'transform 0.1s linear',
          }}
        />
      </div>

      {/* 4. GIANT ARCHITECTURAL 3D DISPLAY TEXT "PORTFOLIO" (Teks Raksasa di Belakang Subjek) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[48%] -translate-y-1/2 z-[1] flex items-center justify-center overflow-hidden will-change-transform"
        style={{
          transform: `translate3d(${-currentPos.x * 38}px, calc(-50% + ${-currentPos.y * 22}px), 0)`,
          transition: 'transform 0.08s linear',
        }}
        aria-hidden="true"
      >
        <span
          className="text-[19vw] md:text-[16vw] lg:text-[14.5vw] font-black uppercase tracking-tighter leading-none select-none whitespace-nowrap opacity-80 md:opacity-90"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(56, 189, 248, 0.22) 55%, rgba(15, 23, 42, 0) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '1.2px rgba(56, 189, 248, 0.42)',
            textShadow: '0 0 70px rgba(56, 189, 248, 0.2)',
          }}
        >
          PORTFOLIO
        </span>
      </div>

      {/* 5. MAIN CONTAINER (PROPORTIONAL 3-COLUMN COMPOSITION) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">

        {/* LEFT COLUMN: IDENTITAS & CALL TO ACTION (Desktop: Span 5) */}
        <div className="w-full lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Cursive / Script Accent */}
          <span className="font-serif italic text-2xl sm:text-3xl text-[var(--first-color)] drop-shadow-[0_0_18px_rgba(56,189,248,0.45)] mb-1.5 tracking-wide">
            Hello, I&apos;m
          </span>

          {/* Main Headline Display Name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.06] mb-3">
            DIMAS<br className="hidden sm:inline" /> WIJANARKO<span className="text-[var(--first-color)]">.</span>
          </h1>

          {/* Professional Role Pill Badge with Live Beacon */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--first-color)]/60 bg-[var(--first-color)]/10 backdrop-blur-md text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase mb-4 shadow-[0_0_24px_rgba(56,189,248,0.25)] hover:border-[var(--first-color)] transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--first-color)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--first-color)]" />
            </span>
            <span>Full Stack Web &amp; Mobile Engineer</span>
          </div>

          {/* Concise Professional Summary */}
          <p className="text-xs sm:text-sm md:text-base text-[var(--text-color)]/95 leading-relaxed max-w-md lg:max-w-[430px] mb-6 font-normal">
            Mahasiswa S1 Sistem Informasi UBSI yang memadukan rekayasa perangkat lunak modern, arsitektur basis data relasional tersertifikasi BNSP, serta analitik data interaktif menjadi solusi digital bernilai tinggi.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
            <a
              href={cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Unduh CV Format ATS Dimas Wijanarko"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--first-color)] text-[var(--black-color)] text-xs sm:text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_28px_rgba(56,189,248,0.55)] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <i className="ri-file-download-line text-base transition-transform group-hover:-translate-y-0.5" />
              <span>UNDUH CV ATS</span>
            </a>

            <a
              href="#work"
              aria-label="Navigasi ke bagian karya dan proyek unggulan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[var(--first-color)] text-xs sm:text-sm font-bold text-white hover:text-[var(--first-color)] active:scale-95 transition-all bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-md cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <span>LIHAT KARYA</span>
              <i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* CENTER COLUMN: MAJESTIC 3D PARALLAX SUBJECT CUTOUT (Desktop: Span 4) */}
        <div className="w-full lg:col-span-4 flex items-center justify-center order-1 lg:order-2 relative my-2 lg:my-0">
          <div
            className="relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-[410px] xl:w-[450px] aspect-[3/4] flex items-end justify-center will-change-transform"
            style={{
              transform: reducedMotion
                ? 'none'
                : `perspective(1100px) rotateY(${currentPos.x * 10}deg) rotateX(${-currentPos.y * 8}deg) translate3d(${currentPos.x * 16}px, ${currentPos.y * 12}px, 0)`,
              transition: 'transform 0.08s linear',
            }}
          >
            {/* Ambient Aura Halo Circle behind head */}
            <div
              className="absolute inset-0 m-auto w-[220px] sm:w-[280px] lg:w-[320px] h-[220px] sm:h-[280px] lg:h-[320px] rounded-full border border-[var(--first-color)]/35 bg-gradient-to-b from-[var(--first-color)]/20 via-sky-500/10 to-transparent blur-md -z-10"
              style={{
                transform: `translate3d(${-currentPos.x * 12}px, ${-currentPos.y * 8}px, 0)`,
              }}
              aria-hidden="true"
            />

            {/* Futuristic Tech Compass Ring */}
            <div
              className="absolute inset-0 m-auto w-[250px] sm:w-[320px] lg:w-[360px] h-[250px] sm:h-[320px] lg:h-[360px] rounded-full border border-dashed border-[var(--first-color)]/30 -z-10 will-change-transform"
              style={{
                transform: `rotate(${currentPos.x * 28}deg)`,
                transition: 'transform 0.2s ease-out',
              }}
              aria-hidden="true"
            />

            {/* Specular Interactive Light Glare on Subject */}
            <div
              className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${50 + currentPos.x * 25}% ${35 + currentPos.y * 20}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`,
                opacity: isHovered ? 0.7 : 0.2,
              }}
              aria-hidden="true"
            />

            {/* Transparent Cutout Subject Photo */}
            <img
              src="/dimas-cutout.png"
              alt={`Foto profesional ${profile.full_name}`}
              className="relative z-10 w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_24px_50px_rgba(0,0,0,0.92)] select-none"
              style={{
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              }}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('dimas-profile.jpg')) {
                  target.src = '/dimas-profile.jpg';
                }
              }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: KEY HIGHLIGHT STATS (Desktop: Span 3 | Mobile: Adaptive Row/Grid) */}
        <div className="w-full lg:col-span-3 flex flex-col justify-center order-3 mt-2 lg:mt-0">

          {/* DESKTOP LAYOUT (Vertical Sleek Cards) */}
          <div className="hidden lg:flex flex-col gap-4 max-w-sm w-full">
            {/* Stat Item 1 */}
            <div
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[var(--first-color)]/60 backdrop-blur-md transition-all duration-300 flex items-center gap-4 group cursor-default shadow-sm hover:shadow-[0_8px_30px_rgba(56,189,248,0.18)]"
              style={{
                transform: reducedMotion ? 'none' : `translate3d(${currentPos.x * 8}px, ${currentPos.y * 6}px, 0)`,
                transition: 'transform 0.12s linear, border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
              }}
            >
              <span className="text-3xl xl:text-4xl font-black text-[var(--first-color)] group-hover:scale-110 transition-transform tracking-tight drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                03+
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs xl:text-sm font-bold text-white tracking-wide">
                  Proyek Skala Nasional
                </span>
                <span className="text-[11px] text-[var(--text-color)]/80">
                  PGNCOM, Otokeep &amp; FindIt UBSI
                </span>
              </div>
            </div>

            {/* Stat Item 2 */}
            <div
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[var(--first-color)]/60 backdrop-blur-md transition-all duration-300 flex items-center gap-4 group cursor-default shadow-sm hover:shadow-[0_8px_30px_rgba(56,189,248,0.18)]"
              style={{
                transform: reducedMotion ? 'none' : `translate3d(${currentPos.x * 12}px, ${currentPos.y * 9}px, 0)`,
                transition: 'transform 0.12s linear, border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
              }}
            >
              <span className="text-3xl xl:text-4xl font-black text-[var(--first-color)] group-hover:scale-110 transition-transform tracking-tight drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                06+
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs xl:text-sm font-bold text-white tracking-wide">
                  Karya Unggulan Rilis
                </span>
                <span className="text-[11px] text-[var(--text-color)]/80">
                  Aplikasi Web, Mobile &amp; AI OCR
                </span>
              </div>
            </div>

            {/* Stat Item 3 */}
            <div
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[var(--first-color)]/60 backdrop-blur-md transition-all duration-300 flex items-center gap-4 group cursor-default shadow-sm hover:shadow-[0_8px_30px_rgba(56,189,248,0.18)]"
              style={{
                transform: reducedMotion ? 'none' : `translate3d(${currentPos.x * 16}px, ${currentPos.y * 12}px, 0)`,
                transition: 'transform 0.12s linear, border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
              }}
            >
              <span className="text-3xl xl:text-4xl font-black text-[var(--first-color)] group-hover:scale-110 transition-transform tracking-tight drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                02+
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs xl:text-sm font-bold text-white tracking-wide">
                  Sertifikasi Profesi BNSP
                </span>
                <span className="text-[11px] text-[var(--text-color)]/80">
                  Database Admin &amp; Analis Program
                </span>
              </div>
            </div>

            {/* Extra Award Pill */}
            <div
              className="flex items-center gap-2 pt-1 text-xs text-[var(--first-color)] font-semibold"
              style={{
                transform: reducedMotion ? 'none' : `translate3d(${currentPos.x * 8}px, ${currentPos.y * 6}px, 0)`,
                transition: 'transform 0.12s linear',
              }}
            >
              <i className="ri-award-fill text-base text-[var(--first-color)]" />
              <span>Juara 1 IT Bootcamp Software Development</span>
            </div>
          </div>

          {/* MOBILE & TABLET LAYOUT (Sleek Horizontal 3-Column Compact Grid) */}
          <div className="lg:hidden w-full max-w-lg mx-auto flex flex-col gap-3 pt-2">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full">
              {/* Mobile Stat 1 */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black text-[var(--first-color)] drop-shadow-[0_0_10px_rgba(56,189,248,0.4)] leading-tight">
                  03+
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-white mt-1 leading-tight">
                  Proyek Nasional
                </span>
              </div>

              {/* Mobile Stat 2 */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black text-[var(--first-color)] drop-shadow-[0_0_10px_rgba(56,189,248,0.4)] leading-tight">
                  06+
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-white mt-1 leading-tight">
                  Karya Unggulan
                </span>
              </div>

              {/* Mobile Stat 3 */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black text-[var(--first-color)] drop-shadow-[0_0_10px_rgba(56,189,248,0.4)] leading-tight">
                  02+
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-white mt-1 leading-tight">
                  Sertifikat BNSP
                </span>
              </div>
            </div>

            {/* Mobile Award Badge */}
            <div className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[var(--first-color)]/10 border border-[var(--first-color)]/30 text-[11px] text-[var(--first-color)] font-semibold text-center mx-auto">
              <i className="ri-award-fill text-sm" />
              <span>Juara 1 IT Bootcamp Software Development se-UBSI</span>
            </div>
          </div>

        </div>

      </div>

      {/* 6. SUBTLE ACCESSIBLE SCROLL INDICATOR */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <a
          href="#about"
          aria-label="Gulir ke bagian Tentang Saya"
          className="flex flex-col items-center text-[10px] uppercase tracking-widest text-[var(--text-color)] hover:text-white transition-colors"
        >
          <span>Scroll</span>
          <i className="ri-arrow-down-s-line text-lg animate-bounce text-[var(--first-color)]" />
        </a>
      </div>
    </section>
  );
}
