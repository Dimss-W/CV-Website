'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Normalised mouse coordinates (-1 to 1) for 3D parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Check if mouse is within or near the hero section
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      setPixelPos({ x: relX, y: relY });

      // Normalise coordinates from -1 to 1 relative to center
      const normX = ((relX / rect.width) - 0.5) * 2;
      const normY = ((relY / rect.height) - 0.5) * 2;

      // Clamp between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, normX));
      const clampedY = Math.max(-1, Math.min(1, normY));

      setMousePos({ x: clampedX, y: clampedY });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      // Smoothly return to center when mouse leaves
      setMousePos({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const heroEl = containerRef.current;
    if (heroEl) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (heroEl) {
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const cvDownloadUrl =
    profile.resume_url && profile.resume_url !== '#contact'
      ? profile.resume_url
      : '/CV_Dimas_Wijanarko_ATS.pdf';

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-14 px-4 sm:px-6 select-none bg-[var(--body-color)]"
      id="home"
    >
      {/* 1. INTERACTIVE MOUSE SPOTLIGHT (Mengikuti Kursor) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: isHovered
            ? `radial-gradient(750px circle at ${pixelPos.x}px ${pixelPos.y}px, rgba(56, 189, 248, 0.18), transparent 70%)`
            : `radial-gradient(800px circle at 50% 40%, rgba(56, 189, 248, 0.12), transparent 75%)`,
        }}
      />

      {/* 2. AMBIENT ATMOSPHERIC GLOW CIRCLE (Center Halo) */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[620px] h-[340px] md:h-[620px] rounded-full bg-gradient-to-tr from-[var(--first-color)]/20 via-sky-600/10 to-transparent blur-[120px] -z-10" />

      {/* 3. GIANT BACKGROUND 3D TEXT "PORTFOLIO" (Counter-Parallax Depth) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-[1] flex items-center justify-center overflow-hidden will-change-transform"
        style={{
          transform: `translate3d(${-mousePos.x * 32}px, calc(-50% + ${-mousePos.y * 18}px), 0)`,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span
          className="text-[17vw] lg:text-[15vw] font-black uppercase tracking-tighter leading-none select-none text-transparent whitespace-nowrap opacity-75 md:opacity-85"
          style={{
            WebkitTextStroke: '1.5px rgba(56, 189, 248, 0.35)',
            textShadow: '0 0 60px rgba(56, 189, 248, 0.15)',
          }}
        >
          PORTFOLIO
        </span>
      </div>

      {/* 4. MAIN THREE-COLUMN HERO GRID (Left: Identity, Center: Cutout Photo, Right: Quick Stats) */}
      <div className="relative z-10 container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

        {/* LEFT COLUMN: IDENTITY & CALL TO ACTIONS (Span 5) */}
        <div className="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1 pt-4 lg:pt-0">
          {/* Script / Cursive Warm Accent */}
          <span className="font-serif italic text-2xl sm:text-3xl text-[var(--first-color)] drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] mb-1">
            Hello, I&apos;m
          </span>

          {/* Massive Display Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08] mb-3">
            DIMAS<br className="hidden sm:inline" /> WIJANARKO<span className="text-[var(--first-color)]">.</span>
          </h1>

          {/* Role Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--first-color)]/60 bg-[var(--first-color)]/10 backdrop-blur-md text-xs sm:text-sm font-bold tracking-wider text-white uppercase mb-4 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[var(--first-color)] animate-ping" />
            <span>Full Stack Web &amp; Mobile Engineer</span>
          </div>

          {/* Bio Tagline */}
          <p className="text-sm sm:text-base text-[var(--text-color)]/90 leading-relaxed max-w-md mb-6 font-normal">
            Mahasiswa S1 Sistem Informasi UBSI yang memadukan rekayasa perangkat lunak modern, arsitektur basis data tersertifikasi BNSP, dan analitik interaktif menjadi solusi digital bernilai tinggi.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
            <a
              href={cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--first-color)] text-[var(--black-color)] text-xs sm:text-sm font-bold hover:brightness-110 transition-all shadow-[0_0_25px_rgba(56,189,248,0.5)] cursor-pointer group"
            >
              <i className="ri-file-download-line text-base transition-transform group-hover:-translate-y-0.5" />
              <span>UNDUH CV ATS</span>
            </a>

            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[var(--first-color)] text-xs sm:text-sm font-bold text-white hover:text-[var(--first-color)] transition-all bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-sm cursor-pointer group"
            >
              <span>LIHAT KARYA</span>
              <i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* CENTER COLUMN: 3D PARALLAX SUBJECT PHOTO (Span 4) */}
        <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2 relative">
          <div
            className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] aspect-[3/4] flex items-end justify-center will-change-transform"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 9}deg) rotateX(${-mousePos.y * 7}deg) translate3d(${mousePos.x * 16}px, ${mousePos.y * 12}px, 0)`,
              transition: 'transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Halo Backdrop Glow Circle */}
            <div className="absolute inset-0 m-auto w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full border border-[var(--first-color)]/30 bg-gradient-to-b from-[var(--first-color)]/15 to-transparent blur-md -z-10" />

            {/* Subtle Rotating Tech Ring */}
            <div
              className="absolute inset-0 m-auto w-[270px] sm:w-[330px] h-[270px] sm:h-[330px] rounded-full border border-dashed border-[var(--first-color)]/25 -z-10"
              style={{
                transform: `rotate(${mousePos.x * 25}deg)`,
                transition: 'transform 0.3s ease-out',
              }}
            />

            {/* Cutout Photo Layer with smooth fade to bottom */}
            <img
              src="/dimas-cutout.png"
              alt={profile.full_name}
              className="relative z-10 w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
              }}
              onError={(e) => {
                // Fallback jika cutout sedang diproses
                const target = e.currentTarget;
                if (!target.src.includes('dimas-profile.jpg')) {
                  target.src = '/dimas-profile.jpg';
                }
              }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: VERTICAL QUICK STATS (Span 3) */}
        <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5 justify-center items-center lg:items-start order-3 max-w-sm mx-auto lg:mx-0 w-full">
          {/* Stat 1: Proyek Korporat & Mandiri */}
          <div
            className="w-full p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[var(--first-color)]/50 backdrop-blur-md transition-all duration-300 flex items-center gap-4 group"
            style={{
              transform: `translate3d(${mousePos.x * 6}px, ${mousePos.y * 4}px, 0)`,
              transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, background-color 0.3s',
            }}
          >
            <span className="text-3xl sm:text-4xl font-black text-[var(--first-color)] group-hover:scale-105 transition-transform tracking-tight">
              03+
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Proyek Skala Nasional
              </span>
              <span className="text-[11px] text-[var(--text-color)]/80">
                PGNCOM, Otokeep &amp; FindIt UBSI
              </span>
            </div>
          </div>

          {/* Stat 2: Total Karya & Produk Rekayasa */}
          <div
            className="w-full p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[var(--first-color)]/50 backdrop-blur-md transition-all duration-300 flex items-center gap-4 group"
            style={{
              transform: `translate3d(${mousePos.x * 9}px, ${mousePos.y * 6}px, 0)`,
              transition: 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, background-color 0.3s',
            }}
          >
            <span className="text-3xl sm:text-4xl font-black text-[var(--first-color)] group-hover:scale-105 transition-transform tracking-tight">
              06+
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Karya Unggulan Rilis
              </span>
              <span className="text-[11px] text-[var(--text-color)]/80">
                Aplikasi Web, Mobile &amp; AI OCR
              </span>
            </div>
          </div>

          {/* Stat 3: Sertifikasi Resmi BNSP & Juara 1 */}
          <div
            className="w-full p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[var(--first-color)]/50 backdrop-blur-md transition-all duration-300 flex items-center gap-4 group"
            style={{
              transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 8}px, 0)`,
              transition: 'transform 0.26s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, background-color 0.3s',
            }}
          >
            <span className="text-3xl sm:text-4xl font-black text-[var(--first-color)] group-hover:scale-105 transition-transform tracking-tight">
              02+
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Sertifikasi Profesi BNSP
              </span>
              <span className="text-[11px] text-[var(--text-color)]/80">
                Database Admin &amp; Analis Program
              </span>
            </div>
          </div>

          {/* Extra Achievement Tag */}
          <div
            className="w-full flex items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-[var(--first-color)]/95 font-semibold"
            style={{
              transform: `translate3d(${mousePos.x * 6}px, ${mousePos.y * 4}px, 0)`,
              transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <i className="ri-award-fill text-base text-[var(--first-color)]" />
            <span>Juara 1 IT Bootcamp Software Development</span>
          </div>
        </div>

      </div>

      {/* 5. SMOOTH SCROLL DOWN INDICATOR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
        <a
          href="#about"
          className="flex flex-col items-center text-[10px] uppercase tracking-widest text-[var(--text-color)] hover:text-white"
        >
          <span>Scroll</span>
          <i className="ri-arrow-down-s-line text-lg animate-bounce text-[var(--first-color)]" />
        </a>
      </div>
    </section>
  );
}
