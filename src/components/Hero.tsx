'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Profile } from '@/types';
import LanyardCard from './LanyardCard';
import { playTactileClick, playSoftPop } from '@/lib/sound';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  // Stage View Mode: 'photo' or 'lanyard'
  const [heroMode, setHeroMode] = useState<'photo' | 'lanyard'>('photo');

  // Smooth lerping coordinates for 60fps buttery physics
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Pointer / Mouse Move Handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const normX = ((relX / rect.width) - 0.5) * 2;
    const normY = ((relY / rect.height) - 0.5) * 2;

    setTargetPos({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY)),
    });
    setIsHovered(true);
  }, []);

  // Gyroscope / Device Orientation for mobile
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const normX = Math.max(-1, Math.min(1, e.gamma / 25));
        const normY = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
        setTargetPos({ x: normX, y: normY });
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [reducedMotion]);

  // Event listeners for container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onLeave = () => {
      setTargetPos({ x: 0, y: 0 });
      setIsHovered(false);
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [handleMouseMove]);

  // Spring animation loop (Lerp with friction)
  useEffect(() => {
    if (reducedMotion) {
      setCurrentPos({ x: 0, y: 0 });
      return;
    }

    let rafId: number;
    const lerpFactor = 0.08;

    const animate = () => {
      setCurrentPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        if (Math.abs(dx) < 0.0005 && Math.abs(dy) < 0.0005) {
          return targetPos;
        }
        return {
          x: prev.x + dx * lerpFactor,
          y: prev.y + dy * lerpFactor,
        };
      });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [targetPos, reducedMotion]);

  // Computed 3D transformations
  const photoRotateX = reducedMotion ? 0 : -currentPos.y * 12;
  const photoRotateY = reducedMotion ? 0 : currentPos.x * 14;
  const photoTranslateX = reducedMotion ? 0 : currentPos.x * 18;
  const photoTranslateY = reducedMotion ? 0 : currentPos.y * 12;

  const bgTextTranslateX = reducedMotion ? 0 : -currentPos.x * 30;
  const bgTextTranslateY = reducedMotion ? 0 : -currentPos.y * 12;

  const badge1TranslateX = reducedMotion ? 0 : currentPos.x * 24;
  const badge1TranslateY = reducedMotion ? 0 : currentPos.y * 18;

  const badge2TranslateX = reducedMotion ? 0 : -currentPos.x * 20;
  const badge2TranslateY = reducedMotion ? 0 : currentPos.y * 16;

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 sm:py-28 overflow-hidden bg-cyber-grid"
      aria-label="Beranda Profil Dimas Wijanarko"
    >
      {/* Background Glowing Ambient Orbs (Violet & Indigo & Amber) */}
      <div
        className="glow-orb w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-violet-600/18 top-[-10%] left-[-10%]"
        style={{
          transform: `translate3d(${currentPos.x * 35}px, ${currentPos.y * 35}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
      />
      <div
        className="glow-orb w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-indigo-700/15 bottom-[-15%] right-[-10%]"
        style={{
          transform: `translate3d(${-currentPos.x * 35}px, ${-currentPos.y * 35}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
      />
      <div className="glow-orb w-[300px] h-[300px] bg-amber-500/10 top-[40%] left-[25%]" />

      {/* Parallax Background Typographic Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        style={{
          transform: `translate3d(${bgTextTranslateX}px, ${bgTextTranslateY}px, 0)`,
          transition: reducedMotion ? 'none' : 'transform 0.1s linear',
        }}
        aria-hidden="true"
      >
        <span className="text-[12vw] font-black uppercase tracking-tighter text-white/[0.02] leading-none whitespace-nowrap">
          DIMAS WIJANARKO
        </span>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content & Value Proposition (7 Cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1 reveal-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/25 text-violet-300 text-xs font-semibold w-fit mb-4 sm:mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator" />
              <span>Tersedia untuk Peluang Full-Time &amp; Proyek Industri</span>
            </div>

            {/* Name & Role */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-3 sm:mb-4">
              Halo, Saya <br className="hidden sm:inline" />
              <span className="gradient-text-violet">Dimas Wijanarko</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 font-medium leading-snug mb-3">
              Full Stack Web &amp; Mobile Software Engineer <br className="hidden sm:inline" />
              <span className="text-violet-400">&amp; Enterprise Data Analytics Specialist</span>
            </p>

            <p className="text-xs sm:text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mb-7 sm:mb-8">
              Mahasiswa Sistem Informasi Universitas Bina Sarana Informatika (UBSI). Berpengalaman 
              merancang arsitektur aplikasi mobile berbasis Flutter terintegrasi backend Laravel, 
              serta membangun dashboard analitik Power BI &amp; kecerdasan visual Gemini AI untuk sistem operasional nyata.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a
                href="#projects"
                onClick={playTactileClick}
                className="btn-primary flex-1 sm:flex-initial active:scale-95 transition-transform"
                aria-label="Jelajahi portofolio proyek"
              >
                <span>Eksplorasi Proyek</span>
                <i className="ri-arrow-right-line text-lg" />
              </a>

              <a
                href="/CV_Dimas_Wijanarko_ATS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTactileClick}
                className="btn-secondary flex-1 sm:flex-initial active:scale-95 transition-transform"
                aria-label="Unduh CV ATS resmi Dimas Wijanarko"
              >
                <i className="ri-file-pdf-2-line text-violet-400 text-lg" />
                <span>Unduh CV (ATS PDF)</span>
              </a>

              <a
                href="#contact"
                onClick={playTactileClick}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 active:scale-95 transition-all w-full sm:w-auto"
              >
                <i className="ri-mail-line text-violet-400 text-base" />
                <span>Hubungi Saya</span>
              </a>
            </div>

            {/* Quick Metrics Bento Bar with Scroll Scale Animation */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-5 sm:pt-6 border-t border-white/8 reveal-scale delay-200">
              <div className="glass-panel p-3 sm:p-4 text-center sm:text-left hover:border-violet-500/40 transition-all">
                <div className="text-lg sm:text-2xl font-black text-white font-mono">
                  6+
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">
                  Proyek Produksi
                </div>
              </div>

              <div className="glass-panel p-3 sm:p-4 text-center sm:text-left hover:border-violet-500/40 transition-all">
                <div className="text-lg sm:text-2xl font-black text-violet-400 font-mono">
                  2 BNSP
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">
                  Sertifikasi Resmi
                </div>
              </div>

              <div className="glass-panel p-3 sm:p-4 text-center sm:text-left hover:border-amber-500/40 transition-all">
                <div className="text-lg sm:text-2xl font-black text-amber-400 font-mono">
                  Juara 1
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">
                  IT Bootcamp UBSI
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Stage with Dual Modes (5 Cols on Desktop) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center order-1 lg:order-2 reveal-right">
            
            {/* Interactive Mode Segmented Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md mb-4 z-30 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setHeroMode('photo');
                  playSoftPop();
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  heroMode === 'photo'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className="ri-user-smile-line text-sm" />
                <span>Foto 3D Parallax</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setHeroMode('lanyard');
                  playSoftPop();
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  heroMode === 'lanyard'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <i className="ri-id-card-line text-sm" />
                <span>Kartu ID 3D (Tarik/Goyang)</span>
              </button>
            </div>

            {/* Stage Container */}
            {heroMode === 'photo' ? (
              <div
                className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[450px] aspect-[4/5] flex items-center justify-center"
                style={{
                  perspective: '1200px',
                }}
              >
                {/* Backing Luminous Halo Ring in Violet & Indigo */}
                <div
                  className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-violet-600/25 via-purple-600/15 to-indigo-600/25 border border-violet-400/25 blur-xl opacity-80"
                  style={{
                    transform: `translate3d(${-photoTranslateX * 0.5}px, ${-photoTranslateY * 0.5}px, -40px)`,
                    transition: reducedMotion ? 'none' : 'transform 0.15s ease-out',
                  }}
                />

                {/* Geometric Cyber Frame */}
                <div
                  className="absolute inset-2 sm:inset-4 rounded-3xl border border-white/10 bg-slate-950/45 backdrop-blur-md overflow-hidden shadow-2xl"
                  style={{
                    transform: `rotateX(${photoRotateX * 0.6}deg) rotateY(${photoRotateY * 0.6}deg)`,
                    transition: reducedMotion ? 'none' : 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="absolute inset-0 bg-cyber-dots opacity-40" />
                  <div className="absolute top-3 left-3 text-[10px] font-mono text-violet-400/70 uppercase">
                    UBSI // SYS-INF // 2026
                  </div>
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500">
                    LAT: -6.2088 • LONG: 106.8456
                  </div>
                </div>

                {/* 3D Parallax Cutout Photo with Lerp Physics */}
                <div
                  className="relative z-20 w-full h-full flex items-end justify-center select-none pointer-events-none"
                  style={{
                    transform: `translate3d(${photoTranslateX}px, ${photoTranslateY}px, 30px) rotateX(${photoRotateX}deg) rotateY(${photoRotateY}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: reducedMotion ? 'none' : 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <img
                    src="/dimas-cutout.png"
                    alt="Dimas Wijanarko - Full Stack Engineer"
                    className="w-auto h-[95%] sm:h-[98%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter brightness-105 contrast-105"
                    loading="eager"
                  />

                  {/* Specular Light Glint */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${(currentPos.x + 1) * 50}% ${(currentPos.y + 1) * 50}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
                      mixBlendMode: 'overlay',
                      opacity: isHovered ? 0.8 : 0.3,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                </div>

                {/* Floating Glass Bento Badge 1: BNSP Certified */}
                <div
                  className="absolute -top-3 -right-2 sm:-right-4 z-30 glass-panel p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 shadow-xl border-violet-400/35 animate-float"
                  style={{
                    transform: `translate3d(${badge1TranslateX}px, ${badge1TranslateY}px, 60px)`,
                    transition: reducedMotion ? 'none' : 'transform 0.14s ease-out',
                  }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-violet-600/20 border border-violet-400/40 flex items-center justify-center text-violet-300 text-lg sm:text-xl shrink-0">
                    <i className="ri-shield-check-fill" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                      Tersertifikasi BNSP RI
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-violet-300/80 font-mono">
                      Database Administrator
                    </div>
                  </div>
                </div>

                {/* Floating Glass Bento Badge 2: Juara 1 IT Bootcamp */}
                <div
                  className="absolute -bottom-4 -left-2 sm:-left-4 z-30 glass-panel p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 shadow-xl border-amber-400/35"
                  style={{
                    transform: `translate3d(${badge2TranslateX}px, ${badge2TranslateY}px, 70px)`,
                    transition: reducedMotion ? 'none' : 'transform 0.16s ease-out',
                  }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 text-lg sm:text-xl shrink-0">
                    <i className="ri-trophy-fill" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                      Juara 1 IT Bootcamp
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-amber-300/80 font-mono">
                      Seluruh Kampus UBSI
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Mode 2: Interactive Draggable 3D Lanyard Card */
              <div className="w-full max-w-[380px] sm:max-w-[420px] py-4">
                <LanyardCard profile={profile} />
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
