'use client';

import React from 'react';
import { Profile } from '@/types';

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-28 relative bg-[#06090f] overflow-hidden">
      {/* Decorative background glow */}
      <div className="glow-orb w-[450px] h-[450px] bg-cyan-600/10 top-1/4 right-[-10%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-indigo-600/10 bottom-10 left-[-10%]" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <div className="section-tag">
            <i className="ri-user-smile-line text-cyan-400" />
            <span>Tentang &amp; Filosofi Rekayasa</span>
          </div>
          <h2 className="section-heading mb-4">
            Menggabungkan <span className="gradient-text-cyan">Ketajaman Analisis</span> <br className="hidden sm:inline" />
            dengan Presisi Rekayasa Perangkat Lunak
          </h2>
          <p className="section-description">
            Sebagai mahasiswa Sistem Informasi Universitas Bina Sarana Informatika (UBSI), saya memadukan
            pemodelan proses bisnis terstruktur, disiplin arsitektur basis data, dan pengembangan aplikasi interaktif modern.
          </p>
        </div>

        {/* 12-Column Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Bento Card 1: Narasi Profil Utama (Col 7) */}
          <div className="md:col-span-7 glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/20 transition-colors" />

            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono font-semibold text-cyan-300 uppercase tracking-wider mb-4">
                <i className="ri-compass-3-line text-sm" />
                <span>Profil &amp; Dedikasi Profesional</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
                Fokus Pada Solusi Digital yang Bekerja Nyata di Lingkungan Produksi.
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                {profile.bio}
              </p>

              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Tidak sekadar menulis baris kode, saya menaruh perhatian besar pada 
                arsitektur sistem yang dapat diskalakan (*clean architecture*), integritas relasi basis data, 
                efisiensi kueri SQL, serta kenyamanan antarmuka pengguna di berbagai resolusi perangkat.
              </p>
            </div>

            {/* Core Values Badges */}
            <div className="pt-5 border-t border-white/8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <i className="ri-code-box-line text-cyan-400 text-lg mb-1 block" />
                <span className="text-xs font-semibold text-slate-200">Clean Code</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <i className="ri-database-2-line text-cyan-400 text-lg mb-1 block" />
                <span className="text-xs font-semibold text-slate-200">Relational DB</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <i className="ri-speed-up-line text-cyan-400 text-lg mb-1 block" />
                <span className="text-xs font-semibold text-slate-200">High Speed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <i className="ri-shield-keyhole-line text-cyan-400 text-lg mb-1 block" />
                <span className="text-xs font-semibold text-slate-200">Security</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Interaktif Developer Workspace / Code Card (Col 5) */}
          <div className="md:col-span-5 glass-panel p-5 sm:p-6 flex flex-col justify-between font-mono text-xs border-cyan-500/20 shadow-xl bg-[#090d16]">
            {/* Window chrome header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] text-slate-400 tracking-wider">dimas_spec.ts</span>
              <span className="text-[10px] text-cyan-400">TypeScript 5.x</span>
            </div>

            {/* Code content */}
            <div className="space-y-1.5 text-slate-300 leading-relaxed overflow-x-auto py-1">
              <div>
                <span className="text-indigo-400">interface</span> <span className="text-yellow-300">EngineerProfile</span> &#123;
              </div>
              <div className="pl-4">
                <span className="text-slate-400">name:</span> <span className="text-emerald-400">&quot;Dimas Wijanarko&quot;</span>;
              </div>
              <div className="pl-4">
                <span className="text-slate-400">degree:</span> <span className="text-emerald-400">&quot;S1 Sistem Informasi (UBSI)&quot;</span>;
              </div>
              <div className="pl-4">
                <span className="text-slate-400">status:</span> <span className="text-cyan-300">&quot;Active Student &amp; Builder&quot;</span>;
              </div>
              <div className="pl-4">
                <span className="text-slate-400">specialization:</span> [
              </div>
              <div className="pl-8 text-sky-300">
                &quot;Flutter &amp; Dart Mobile&quot;,<br />
                &quot;Laravel &amp; RESTful API&quot;,<br />
                &quot;Power BI &amp; DAX Analytics&quot;,<br />
                &quot;Gemini Vision OCR AI&quot;
              </div>
              <div className="pl-4">];</div>
              <div className="pl-4">
                <span className="text-slate-400">certifications:</span> &#123;
              </div>
              <div className="pl-8 text-amber-300">
                bnsp_dba: <span className="text-cyan-400">true</span>,<br />
                bnsp_analyst: <span className="text-cyan-400">true</span>,<br />
                juara1_bootcamp: <span className="text-cyan-400">true</span>
              </div>
              <div className="pl-4">&#125;;</div>
              <div>&#125;</div>
            </div>

            {/* Footer status bar */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 mt-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Compiled 0 errors
              </span>
              <span>UTF-8 • Jakarta, ID</span>
            </div>
          </div>

          {/* Bento Card 3: Keunggulan Kompetensi & Pengalaman Industri (Col 6) */}
          <div className="md:col-span-6 glass-panel p-6 sm:p-7 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-xl">
                <i className="ri-building-4-line" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Pengalaman di Industri Telekomunikasi &amp; BUMN
                </h4>
                <p className="text-xs text-slate-400">
                  PT PGAS Telekomunikasi Nusantara (PGNCOM)
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Mengembangkan sistem web operasional *Monitoring Realisasi Biaya &amp; Quality Control*, 
              mengintegrasikan validasi dokumen BASTO, serta merancang dashboard Microsoft Power BI 
              untuk pemantauan real-time deviasi anggaran dan prognosa proyek skala enterprise.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono">
                Power BI &amp; DAX
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono">
                Laravel &amp; MySQL
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono">
                Pengawasan Mutu QC
              </span>
            </div>
          </div>

          {/* Bento Card 4: Pengabdian & Mentoring Teknis (Col 6) */}
          <div className="md:col-span-6 glass-panel p-6 sm:p-7 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-400 text-xl">
                <i className="ri-presentation-line" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Mentoring &amp; Berbagi Dampak Pengetahuan
                </h4>
                <p className="text-xs text-slate-400">
                  SMK Muhammadiyah 15 Jakarta
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Menjadi instruktur tamu bagi siswa jurusan Rekayasa Perangkat Lunak (RPL). 
              Mengajarkan praktik pengembangan web modern menggunakan Framework Laravel, 
              arsitektur MVC, pemodelan basis data relasional, dan etika kolaborasi Git industri.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono">
                Instruktur RPL
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono">
                Komunikasi Publik
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono">
                Git Workflow
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
