'use client';

import React from 'react';
import { Profile } from '@/types';

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="about section pt-20 lg:pt-24" id="about">
      <div className="about__container container max-w-5xl mx-auto">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-400 mb-3 shadow-[0_0_12px_rgba(56,189,248,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span className="font-semibold tracking-wider uppercase">FILOSOFI &amp; PROFIL REKAYASA</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mt-1">
            Membangun sistem web &amp; mobile yang <span className="text-[var(--first-color)] drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">terukur, aman,</span> dan berdampak langsung pada efisiensi operasional.
          </h2>

          <div className="about__info mt-5">
            <p className="about__description text-slate-300 leading-relaxed text-sm sm:text-base max-w-3xl">
              {profile.bio}
            </p>

            {/* 3 Interactive Spotlight Capability Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 my-8">
              {/* Card 1 */}
              <div className="spotlight-card p-5 rounded-2xl text-left group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-sky-400 font-bold tracking-wider">
                    01 / PRODUK NYATA
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
                <h4 className="text-white font-bold text-base group-hover:text-sky-300 transition-colors">
                  5+ Aplikasi Produksi
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Sistem aktif teruji nyata dengan arsitektur MVC, RESTful API terstruktur, otomasi AI OCR, dan pemodelan relasional database.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Otokeep • FindIt • CalTrack</span>
                  <span className="text-sky-400 font-semibold">Aktif</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="spotlight-card p-5 rounded-2xl text-left group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-sky-400 font-bold tracking-wider">
                    02 / KOMPETENSI RESMI
                  </span>
                  <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                </div>
                <h4 className="text-white font-bold text-base group-hover:text-sky-300 transition-colors">
                  Sertifikasi BNSP &amp; Juara 1
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Database Administrator terverifikasi BNSP &amp; LSP UBSI, serta predikat Juara 1 Nasional IT Bootcamp Software Development se-UBSI.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>BNSP RI • FTI Rektorat</span>
                  <span className="text-emerald-400 font-semibold">Terakreditasi</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="spotlight-card p-5 rounded-2xl text-left group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-sky-400 font-bold tracking-wider">
                    03 / PENGALAMAN KORPORAT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                </div>
                <h4 className="text-white font-bold text-base group-hover:text-sky-300 transition-colors">
                  Sistem Internal PGNCOM
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Mengembangkan sistem monitoring realisasi biaya operasional dan dashboard visualisasi Microsoft Power BI interaktif berbasis rumus DAX.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>QC BASTO • Power BI DAX</span>
                  <span className="text-amber-400 font-semibold">Korporat</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#contact" className="about__button button shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <span>Inisiasi Kolaborasi</span>
                <i className="ri-arrow-right-line" />
              </a>

              <a
                href="https://github.com/Dimss-W"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
              >
                <i className="ri-github-fill text-lg text-sky-400" />
                <span>Kunjungi Repositori GitHub (@Dimss-W)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
