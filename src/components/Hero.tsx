'use client';

import React from 'react';
import { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

const CIRCULAR_TEXT = 'JELAJAHI • LEBIH • LANJUT • ';

export default function Hero({ profile }: HeroProps) {
  const letters = CIRCULAR_TEXT.split('');
  const angleStep = 360 / letters.length;

  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__data reveal-init">
          {/* Status Badge Profesional */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 mb-4 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium tracking-wide">Terbuka untuk Peluang Kerja &amp; Rekayasa Sistem</span>
          </div>

          <h3 className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--first-color)] uppercase mb-2">
            Dimas Wijanarko • Jakarta, Indonesia
          </h3>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18] mb-3">
            Full Stack Web &amp; Mobile <br />
            <span className="text-[var(--first-color)]">Software Engineer</span>
          </h1>

          <p className="home__description max-w-xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Mahasiswa Sistem Informasi UBSI bersertifikasi BNSP Database Administrator. Berfokus pada perancangan arsitektur backend performa tinggi (Laravel, REST API, SQL), aplikasi mobile lintas platform (Flutter), serta integrasi visualisasi data analitik korporat (Power BI &amp; DAX).
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--first-color)] text-[var(--black-color)] text-xs md:text-sm font-semibold hover:brightness-110 transition-all shadow-sm"
            >
              <span>Lihat Portofolio</span>
              <i className="ri-arrow-right-line" />
            </a>

            <a
              href={profile.resume_url && profile.resume_url !== '#contact' ? profile.resume_url : '/certificates/sertifikat-bnsp-database-administrator.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-[var(--first-color)] text-xs md:text-sm font-semibold text-white hover:text-[var(--first-color)] transition-colors shadow-sm"
            >
              <i className="ri-file-download-line text-sm" />
              <span>Unduh CV Resmi (PDF)</span>
            </a>
          </div>

          {/* Core Technical Highlights */}
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
            <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300"># Laravel &amp; PHP</span>
            <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300"># Flutter &amp; Dart</span>
            <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300"># Relational SQL</span>
            <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300"># Microsoft Power BI</span>
            <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300"># Gemini Vision AI</span>
          </div>
        </div>

        <div className="home__images reveal-init">
          <div className="home__box-1" />
          <div className="home__box-2" />
          <div className="home__box-3" />

          <img
            src={profile.avatar_url || '/dimas-profile.jpg'}
            alt={profile.full_name}
            className="home__img"
          />

          <div className="home__circle">
            <span className="home__text" id="home-text">
              {letters.map((char, i) => (
                <span
                  key={i}
                  style={{ transform: `rotate(${i * angleStep}deg)` }}
                >
                  {char}
                </span>
              ))}
            </span>

            <a
              href="#about"
              className="home__arrow"
              aria-label="Gulir ke Tentang Saya"
            >
              <i className="ri-arrow-down-line" />
            </a>
          </div>

          <div className="blob-big" />
        </div>
      </div>
    </section>
  );
}
