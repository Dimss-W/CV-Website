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

  // Smooth lerp coordinates for subtle organic 3D parallax
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
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
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [handleMouseMove]);

  // Spring animation loop
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

  // Subtle 3D tilt values (smooth and gentle)
  const photoRotateX = reducedMotion ? 0 : -currentPos.y * 7;
  const photoRotateY = reducedMotion ? 0 : currentPos.x * 8;
  const photoTranslateX = reducedMotion ? 0 : currentPos.x * 12;
  const photoTranslateY = reducedMotion ? 0 : currentPos.y * 8;

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 sm:py-28 overflow-hidden"
      aria-label="Beranda Profil Dimas Wijanarko"
    >
      {/* Subtle organic background spotlight */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Human Content & Value Proposition (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1 reveal-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium w-fit mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator" />
              <span>Tersedia untuk Peluang Full-Time &amp; Proyek Industri</span>
            </div>

            {/* Name & Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-3">
              Dimas Wijanarko
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-medium leading-relaxed mb-4">
              Full Stack Software Engineer &amp; Mahasiswa Sistem Informasi
            </p>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mb-8">
              Mahasiswa aktif S1 Sistem Informasi Universitas Bina Sarana Informatika (UBSI) Semester 7 dengan IPK 3.82. 
              Berfokus pada rekayasa perangkat lunak Web &amp; Mobile (Laravel &amp; Flutter) serta pengolahan analitik data 
              (Power BI &amp; SQL), dengan pengalaman industri di PT PGAS Telekomunikasi Nusantara (PGNCOM) dan tersertifikasi Database Administrator BNSP.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <a
                href="#projects"
                onClick={playTactileClick}
                className="btn-primary"
                aria-label="Jelajahi portofolio proyek"
              >
                <span>Lihat Portofolio</span>
                <i className="ri-arrow-right-line text-base" />
              </a>

              <a
                href="/CV_Dimas_Wijanarko_ATS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTactileClick}
                className="btn-secondary"
                aria-label="Unduh CV ATS resmi Dimas Wijanarko"
              >
                <i className="ri-file-pdf-2-line text-zinc-300 text-base" />
                <span>Unduh CV (ATS)</span>
              </a>

              <a
                href="#contact"
                onClick={playTactileClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
              >
                <i className="ri-mail-line text-base" />
                <span>Hubungi via Email</span>
              </a>
            </div>

            {/* Key Metrics Bento */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-zinc-800/80">
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-left">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  6+
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Proyek Nyata
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-left">
                <div className="text-xl sm:text-2xl font-bold text-zinc-200 font-mono">
                  2 BNSP
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Sertifikasi Resmi
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-left">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  Juara 1
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  IT Bootcamp UBSI
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center order-1 lg:order-2 reveal-right delay-100">
            
            {/* Minimalist Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900 border border-zinc-800 mb-4 z-20">
              <button
                type="button"
                onClick={() => {
                  setHeroMode('photo');
                  playSoftPop();
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  heroMode === 'photo'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <i className="ri-user-line text-sm" />
                <span>Foto Profil</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setHeroMode('lanyard');
                  playSoftPop();
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  heroMode === 'lanyard'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <i className="ri-id-card-line text-sm" />
                <span>Kartu ID Interaktif</span>
              </button>
            </div>

            {/* Stage Container */}
            {heroMode === 'photo' ? (
              <div
                className="relative w-full max-w-[320px] sm:max-w-[380px] aspect-[4/5] flex items-center justify-center"
                style={{ perspective: '1000px' }}
              >
                {/* Clean Frame Background */}
                <div
                  className="hero-photo-frame-bg absolute inset-2 rounded-2xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/80 via-zinc-900/50 to-zinc-950/90 backdrop-blur-sm overflow-hidden shadow-2xl"
                  style={{
                    transform: `rotateX(${photoRotateX * 0.5}deg) rotateY(${photoRotateY * 0.5}deg)`,
                    transition: reducedMotion ? 'none' : 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Portrait Image with subtle tilt */}
                <div
                  className="relative z-10 w-full h-full flex items-end justify-center select-none"
                  style={{
                    transform: `translate3d(${photoTranslateX}px, ${photoTranslateY}px, 20px) rotateX(${photoRotateX}deg) rotateY(${photoRotateY}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: reducedMotion ? 'none' : 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <img
                    src="/dimas-cutout.png"
                    alt="Dimas Wijanarko - Software Engineer"
                    className="w-auto h-[96%] object-contain drop-shadow-xl"
                    loading="eager"
                  />
                </div>

                {/* Refined Floating Badge 1: BNSP */}
                <div
                  className="absolute -top-2 -right-2 z-20 p-2.5 sm:p-3 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 shadow-xl flex items-center gap-2.5"
                  style={{
                    transform: `translate3d(${photoTranslateX * 0.8}px, ${photoTranslateY * 0.8}px, 30px)`,
                    transition: reducedMotion ? 'none' : 'transform 0.14s ease-out',
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 text-base shrink-0">
                    <i className="ri-shield-check-line" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      BNSP Certified
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      Database Administrator
                    </div>
                  </div>
                </div>

                {/* Refined Floating Badge 2: Juara 1 */}
                <div
                  className="absolute -bottom-2 -left-2 z-20 p-2.5 sm:p-3 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 shadow-xl flex items-center gap-2.5"
                  style={{
                    transform: `translate3d(${-photoTranslateX * 0.8}px, ${photoTranslateY * 0.8}px, 30px)`,
                    transition: reducedMotion ? 'none' : 'transform 0.14s ease-out',
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-300 text-base shrink-0">
                    <i className="ri-trophy-line" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Juara 1 IT Bootcamp
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      Software Development 2025
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Mode 2: Interactive ID Card */
              <div className="w-full max-w-[360px] py-2">
                <LanyardCard profile={profile} />
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
