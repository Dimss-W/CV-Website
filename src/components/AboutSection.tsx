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
      res: 'TERSEDIA UNTUK FULL-TIME & KONTRAK INDUSTRI',
    },
  ]);

  const handleRunCommand = (cmd: string) => {
    playTactileClick();
    let res = '';
    if (cmd === 'dimas.getTechStack()') {
      res = 'Flutter, Dart, Laravel, PHP, React, Next.js, Power BI, DAX, MySQL, PostgreSQL';
    } else if (cmd === 'dimas.getCertifications()') {
      res = 'BNSP Database Administrator (No. Reg. DMS.1241.00936 2026) | BNSP Analis Program';
    } else if (cmd === 'dimas.getHonors()') {
      res = 'Juara 1 IT Bootcamp Software Development se-Seluruh Kampus Cabang UBSI';
    } else if (cmd === 'dimas.getEducation()') {
      res = 'S1 Sistem Informasi (Semester 7, IPK 3.82) - Universitas Bina Sarana Informatika';
    }

    setCliHistory((prev) => [...prev, { cmd, res }]);
  };

  return (
    <section id="about" className="py-20 sm:py-28 relative border-t border-zinc-800/80">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16 reveal-on-scroll">
          <div className="section-tag">
            <span>Profil &amp; Filosofi</span>
          </div>
          <h2 className="section-heading mb-4">
            Ketajaman Analisis Bisnis &amp; Rekayasa Kode
          </h2>
          <p className="section-description">
            Sebagai mahasiswa aktif S1 Sistem Informasi Universitas Bina Sarana Informatika (Semester 7, IPK 3.82), 
            saya memadukan disiplin rekayasa kode bersih, arsitektur basis data relasional, dan pengembangan aplikasi interaktif modern.
          </p>
        </div>

        {/* 12-Column Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Bento Card 1: Narasi Profil Utama (Col 7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between reveal-left spotlight-card">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                <i className="ri-user-line text-sm" />
                <span>Dedikasi Profesional</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
                Fokus Pada Solusi Digital yang Bekerja Nyata di Lingkungan Produksi.
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
                {profile.bio}
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Tidak sekadar menulis baris kode, saya menaruh perhatian besar pada 
                arsitektur sistem yang bersih (*clean architecture*), integritas relasi basis data, 
                efisiensi kueri SQL, serta kenyamanan antarmuka pengguna di berbagai resolusi layar.
              </p>
            </div>

            {/* Core Values Badges */}
            <div className="pt-5 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <i className="ri-code-box-line text-zinc-300 text-lg mb-1 block" />
                <span className="text-xs font-medium text-zinc-300">Clean Code</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <i className="ri-database-2-line text-zinc-300 text-lg mb-1 block" />
                <span className="text-xs font-medium text-zinc-300">Relational DB</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <i className="ri-speed-up-line text-zinc-300 text-lg mb-1 block" />
                <span className="text-xs font-medium text-zinc-300">High Speed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <i className="ri-shield-keyhole-line text-zinc-300 text-lg mb-1 block" />
                <span className="text-xs font-medium text-zinc-300">Security</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Clean Developer Terminal (Col 5) */}
          <div className="interactive-terminal-box lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between font-mono text-xs shadow-xl reveal-right delay-100">
            <div>
              {/* Window chrome header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>

                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-zinc-900 border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCodeTab('spec');
                      playSoftPop();
                    }}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                      activeCodeTab === 'spec'
                        ? 'bg-zinc-800 text-white font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200'
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
                    className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                      activeCodeTab === 'cli'
                        ? 'bg-zinc-800 text-white font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    interactive_cli.sh
                  </button>
                </div>
              </div>

              {/* Tab 1: TypeScript Specification */}
              {activeCodeTab === 'spec' ? (
                <div className="space-y-1.5 text-zinc-300 leading-relaxed overflow-x-auto py-1">
                  <div>
                    <span className="text-zinc-400">interface</span> <span className="text-white font-semibold">EngineerProfile</span> &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-500">name:</span> <span className="text-zinc-200">&quot;Dimas Wijanarko&quot;</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-500">degree:</span> <span className="text-zinc-200">&quot;S1 Sistem Informasi (UBSI)&quot;</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-500">status:</span> <span className="text-emerald-400">&quot;Active Student &amp; Builder&quot;</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-500">specialization:</span> [
                  </div>
                  <div className="pl-8 text-zinc-300">
                    &quot;Flutter &amp; Dart Mobile&quot;,<br />
                    &quot;Laravel &amp; RESTful API&quot;,<br />
                    &quot;Power BI &amp; DAX Analytics&quot;,<br />
                    &quot;PostgreSQL &amp; MySQL DB&quot;
                  </div>
                  <div className="pl-4">];</div>
                  <div className="pl-4">
                    <span className="text-zinc-500">certifications:</span> &#123;
                  </div>
                  <div className="pl-8 text-zinc-300">
                    bnsp_dba: <span className="text-zinc-100 font-semibold">true</span>,<br />
                    bnsp_analyst: <span className="text-zinc-100 font-semibold">true</span>,<br />
                    juara1_bootcamp: <span className="text-zinc-100 font-semibold">true</span>
                  </div>
                  <div className="pl-4">&#125;;</div>
                  <div>&#125;</div>
                </div>
              ) : (
                /* Tab 2: Interactive Terminal CLI */
                <div className="space-y-3 py-1">
                  <div className="text-[11px] text-zinc-400">
                    Pilih perintah di bawah untuk mengeksekusi langsung:
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleRunCommand('dimas.getTechStack()')}
                      className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[11px] font-mono transition-colors"
                    >
                      $ dimas.getTechStack()
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunCommand('dimas.getCertifications()')}
                      className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[11px] font-mono transition-colors"
                    >
                      $ dimas.getCertifications()
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunCommand('dimas.getHonors()')}
                      className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[11px] font-mono transition-colors"
                    >
                      $ dimas.getHonors()
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunCommand('dimas.getEducation()')}
                      className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[11px] font-mono transition-colors"
                    >
                      $ dimas.getEducation()
                    </button>
                  </div>

                  {/* Output Terminal Console */}
                  <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2 max-h-36 overflow-y-auto">
                    {cliHistory.map((item, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-zinc-400 text-[11px]">
                          &gt; {item.cmd}
                        </div>
                        <div className="text-zinc-200 text-[11px] pl-2 border-l border-zinc-600">
                          {item.res}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer status bar */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 mt-4">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-indicator" />
                Interaktif • Ready
              </span>
              <span>Dimas Studio</span>
            </div>
          </div>

          {/* Bento Card 3: Pengalaman Industri (Col 6) */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between reveal-left delay-150 spotlight-card">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 text-xl">
                  <i className="ri-building-4-line" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">
                    Pengalaman di Industri BUMN / Telekomunikasi
                  </h4>
                  <p className="text-xs text-zinc-400">
                    PT PGAS Telekomunikasi Nusantara (PGNCOM)
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                Mengembangkan sistem web operasional *Monitoring Realisasi Biaya &amp; Quality Control*, 
                mengintegrasikan validasi dokumen BASTO, serta merancang dashboard Microsoft Power BI 
                untuk pemantauan real-time deviasi anggaran dan prognosa proyek.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs pt-2">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                Power BI &amp; DAX
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                Laravel &amp; MySQL
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                Pengawasan QC
              </span>
            </div>
          </div>

          {/* Bento Card 4: Pengabdian & Mentoring (Col 6) */}
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between reveal-right delay-200 spotlight-card">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 text-xl">
                  <i className="ri-presentation-line" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">
                    Mentoring &amp; Berbagi Pengetahuan
                  </h4>
                  <p className="text-xs text-zinc-400">
                    SMK Muhammadiyah 15 Jakarta
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                Menjadi instruktur tamu bagi siswa jurusan Rekayasa Perangkat Lunak (RPL). 
                Mengajarkan praktik pengembangan web modern menggunakan Framework Laravel, 
                arsitektur MVC, pemodelan basis data relasional, dan kolaborasi Git.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs pt-2">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                Instruktur RPL
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                Komunikasi Publik
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono">
                Git Workflow
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
