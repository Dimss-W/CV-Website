'use client';

import React, { useState } from 'react';
import { Profile } from '@/types';
import { playTactileClick, playSoftPop } from '@/lib/sound';

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const [activeCodeTab, setActiveCodeTab] = useState<'spec' | 'cli'>('spec');
  const [cliHistory, setCliHistory] = useState<Array<{ cmd: string; res: string }>>([
    {
      cmd: 'dimas.checkStatus()',
      res: '🟢 STATUS: TERSEDIA UNTUK FULL-TIME & KONTRAK INDUSTRI',
    },
  ]);

  const handleRunCommand = (cmd: string) => {
    playTactileClick();
    let res = '';
    if (cmd === 'dimas.getTechStack()') {
      res = '⚡ Flutter, Dart, Laravel, PHP, React, Next.js, Power BI, DAX, MySQL, Gemini AI';
    } else if (cmd === 'dimas.getCertifications()') {
      res = '🛡️ BNSP Database Administrator (No. Reg. DMS.1241.00936 2026) | BNSP Analis Program';
    } else if (cmd === 'dimas.getHonors()') {
      res = '🏆 JUARA 1 IT Bootcamp Software Development se-Seluruh Kampus Cabang UBSI';
    } else if (cmd === 'dimas.getEducation()') {
      res = '🎓 S1 Sistem Informasi - Universitas Bina Sarana Informatika (2023 - Sekarang)';
    }

    setCliHistory((prev) => [...prev, { cmd, res }]);
  };

  return (
    <section id="about" className="py-20 sm:py-28 relative bg-[#06070a] overflow-hidden">
      {/* Decorative background glow in Violet & Amber */}
      <div className="glow-orb w-[450px] h-[450px] bg-violet-600/12 top-1/4 right-[-10%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-indigo-600/10 bottom-10 left-[-10%]" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 reveal-scale">
          <div className="section-tag">
            <i className="ri-user-smile-line text-violet-400" />
            <span>Tentang &amp; Filosofi Rekayasa</span>
          </div>
          <h2 className="section-heading mb-4">
            Menggabungkan <span className="gradient-text-violet">Ketajaman Analisis</span> <br className="hidden sm:inline" />
            dengan Presisi Rekayasa Perangkat Lunak
          </h2>
          <p className="section-description">
            Sebagai mahasiswa Sistem Informasi Universitas Bina Sarana Informatika (UBSI), saya memadukan
            pemodelan proses bisnis terstruktur, disiplin arsitektur basis data, dan pengembangan aplikasi interaktif modern.
          </p>
        </div>

        {/* 12-Column Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Bento Card 1: Narasi Profil Utama (Col 7 on Desktop) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group reveal-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-bl-full pointer-events-none group-hover:bg-violet-600/20 transition-colors" />

            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono font-semibold text-violet-300 uppercase tracking-wider mb-4">
                <i className="ri-compass-3-line text-sm" />
                <span>Profil &amp; Dedikasi Profesional</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
                Fokus Pada Solusi Digital yang Bekerja Nyata di Lingkungan Produksi.
              </h3>

              <p className="text-xs sm:text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                {profile.bio}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Tidak sekadar menulis baris kode, saya menaruh perhatian besar pada 
                arsitektur sistem yang dapat diskalakan (*clean architecture*), integritas relasi basis data, 
                efisiensi kueri SQL, serta kenyamanan antarmuka pengguna di berbagai resolusi perangkat.
              </p>
            </div>

            {/* Core Values Badges */}
            <div className="pt-5 border-t border-white/8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-400/40 transition-all">
                <i className="ri-code-box-line text-violet-400 text-lg mb-1 block" />
                <span className="text-xs font-semibold text-slate-200">Clean Code</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-400/40 transition-all">
                <i className="ri-database-2-line text-violet-400 text-lg mb-1 block" />
                <span className="text-xs font-semibold text-slate-200">Relational DB</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-400/40 transition-all">
                <i className="ri-speed-up-line text-violet-400 text-lg mb-1 block" />
                <span className="text-xs font-semibold text-slate-200">High Speed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-400/40 transition-all">
                <i className="ri-shield-keyhole-line text-violet-400 text-lg mb-1 block" />
                <span className="text-xs font-semibold text-slate-200">Security</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Interactive Developer Terminal (Col 5 on Desktop) */}
          <div className="lg:col-span-5 glass-panel p-5 sm:p-6 flex flex-col justify-between font-mono text-xs border-violet-500/25 shadow-xl bg-[#090d16] reveal-right">
            <div>
              {/* Window chrome header with tab toggle */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/40 border border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCodeTab('spec');
                      playSoftPop();
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                      activeCodeTab === 'spec'
                        ? 'bg-violet-600/25 text-violet-200 border border-violet-400/35'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    dimas_spec.ts
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveCodeTab('cli');
                      playSoftPop();
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                      activeCodeTab === 'cli'
                        ? 'bg-violet-600/25 text-violet-200 border border-violet-400/35'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    interactive_cli.sh
                  </button>
                </div>
              </div>

              {/* Tab 1: TypeScript Specification */}
              {activeCodeTab === 'spec' ? (
                <div className="space-y-1.5 text-slate-300 leading-relaxed overflow-x-auto py-1">
                  <div>
                    <span className="text-violet-400">interface</span> <span className="text-amber-300">EngineerProfile</span> &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">name:</span> <span className="text-emerald-400">&quot;Dimas Wijanarko&quot;</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">degree:</span> <span className="text-emerald-400">&quot;S1 Sistem Informasi (UBSI)&quot;</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">status:</span> <span className="text-violet-300">&quot;Active Student &amp; Builder&quot;</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">specialization:</span> [
                  </div>
                  <div className="pl-8 text-violet-200">
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
                    bnsp_dba: <span className="text-violet-400">true</span>,<br />
                    bnsp_analyst: <span className="text-violet-400">true</span>,<br />
                    juara1_bootcamp: <span className="text-violet-400">true</span>
                  </div>
                  <div className="pl-4">&#125;;</div>
                  <div>&#125;</div>
                </div>
              ) : (
                /* Tab 2: Interactive Terminal CLI */
                <div className="space-y-3 py-1">
                  <div className="text-[11px] text-slate-400">
                    Klik perintah interaktif di bawah untuk mengeksekusi langsung:
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleRunCommand('dimas.getTechStack()')}
                      className="px-2.5 py-1 rounded bg-violet-600/15 hover:bg-violet-600/30 border border-violet-400/30 text-violet-300 text-[11px] font-mono transition-colors"
                    >
                      $ dimas.getTechStack()
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunCommand('dimas.getCertifications()')}
                      className="px-2.5 py-1 rounded bg-indigo-600/15 hover:bg-indigo-600/30 border border-indigo-400/30 text-indigo-300 text-[11px] font-mono transition-colors"
                    >
                      $ dimas.getCertifications()
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunCommand('dimas.getHonors()')}
                      className="px-2.5 py-1 rounded bg-amber-500/15 hover:bg-amber-500/30 border border-amber-400/30 text-amber-300 text-[11px] font-mono transition-colors"
                    >
                      $ dimas.getHonors()
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunCommand('dimas.getEducation()')}
                      className="px-2.5 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono transition-colors"
                    >
                      $ dimas.getEducation()
                    </button>
                  </div>

                  {/* Output Terminal Console */}
                  <div className="p-3 rounded-xl bg-black/60 border border-white/8 space-y-2 max-h-40 overflow-y-auto">
                    {cliHistory.map((item, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-violet-400 text-[11px]">
                          &gt; {item.cmd}
                        </div>
                        <div className="text-slate-300 text-[11px] pl-2 border-l border-violet-500/40">
                          {item.res}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer status bar */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 mt-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-indicator" />
                Interaktif • Ready
              </span>
              <span>Dimas Studio v2.0</span>
            </div>
          </div>

          {/* Bento Card 3: Keunggulan Kompetensi & Pengalaman Industri (Col 6 on Desktop) */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-7 flex flex-col justify-between reveal-left delay-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-600/15 border border-violet-400/35 flex items-center justify-center text-violet-400 text-xl">
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

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
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

          {/* Bento Card 4: Pengabdian & Mentoring Teknis (Col 6 on Desktop) */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-7 flex flex-col justify-between reveal-right delay-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-400/35 flex items-center justify-center text-indigo-400 text-xl">
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

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
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
