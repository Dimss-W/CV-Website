'use client';

import React from 'react';
import { Profile } from '@/types';
import LanyardCard from './LanyardCard';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="home section pt-20 lg:pt-24 min-h-[90vh] flex items-center" id="home">
      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Kolom Kiri: Pernyataan Rekayasa & Aksi Utama */}
        <div className="lg:col-span-7 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-400 mb-4 shadow-[0_0_16px_rgba(56,189,248,0.15)]">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-semibold tracking-wide">SOFTWARE &amp; DATA SYSTEMS 2026</span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold tracking-widest text-[var(--first-color)] uppercase mb-2">
            Dimas Wijanarko • Jakarta, Indonesia
          </h3>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-4">
            Full Stack Web &amp; Mobile <br />
            <span className="text-[var(--first-color)] drop-shadow-[0_0_24px_rgba(56,189,248,0.35)]">
              Software Engineer
            </span>
          </h1>

          <p className="max-w-xl text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            Mahasiswa Sistem Informasi UBSI bersertifikasi resmi BNSP Database Administrator. Mengkhususkan diri pada perancangan sistem web performa tinggi (Laravel, REST API, SQL), aplikasi mobile lintas platform (Flutter), serta integrasi analitik korporat (Microsoft Power BI &amp; DAX).
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--first-color)] text-[var(--black-color)] text-xs md:text-sm font-bold hover:brightness-110 transition-all shadow-[0_0_24px_rgba(56,189,248,0.4)]"
            >
              <span>Jelajahi Karya Terpilih</span>
              <i className="ri-arrow-right-line" />
            </a>

            <a
              href={profile.resume_url && profile.resume_url !== '#contact' ? profile.resume_url : '/certificates/sertifikat-bnsp-database-administrator.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700/80 hover:border-[var(--first-color)] bg-slate-900/80 hover:bg-slate-900 text-xs md:text-sm font-semibold text-white hover:text-[var(--first-color)] transition-all shadow-sm"
            >
              <i className="ri-file-download-line text-sm" />
              <span>Unduh CV Resmi (PDF)</span>
            </a>
          </div>

          {/* Core Technical Highlights */}
          <div className="flex flex-wrap items-center gap-2 mt-8 pt-5 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
            <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-sky-500/40 transition-colors">
              # Laravel &amp; PHP
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-sky-500/40 transition-colors">
              # Flutter &amp; Dart
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-sky-500/40 transition-colors">
              # Relational SQL &amp; ERD
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-sky-500/40 transition-colors">
              # Microsoft Power BI
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-sky-500/40 transition-colors">
              # Gemini Vision AI (OCR)
            </span>
          </div>
        </div>

        {/* Kolom Kanan: 3D Physics Lanyard Card & Terminal Interaktif */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[460px] py-4">
          <LanyardCard profile={profile} />
        </div>
      </div>
    </section>
  );
}
