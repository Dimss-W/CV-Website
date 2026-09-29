'use client';

import React from 'react';
import { Profile } from '@/types';
import { Award, Briefcase, FolderCheck, ArrowRight, UserCheck, Terminal, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Interactive Developer Spec & Architecture Card (No photo duplication) */}
          <div className="lg:col-span-5 reveal-init">
            <div className="relative mx-auto max-w-[320px] sm:max-w-[360px]">
              {/* Ambient Neon Glow Blobs */}
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Main Spec Card Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl p-5 backdrop-blur-xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal size={12} className="text-emerald-400" />
                    <span>dimas@engineer: ~/profile</span>
                  </div>
                </div>

                {/* Developer Profile Data Snippet */}
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-500">// Identitas & Peran</span>
                    <div className="text-slate-200 mt-0.5">
                      <span className="text-emerald-400">const</span> developer = &#123;
                    </div>
                    <div className="pl-4 text-slate-300">
                      name: <span className="text-amber-300">&quot;{profile.full_name}&quot;</span>,
                    </div>
                    <div className="pl-4 text-slate-300">
                      education: <span className="text-amber-300">&quot;Sistem Informasi (UBSI)&quot;</span>,
                    </div>
                    <div className="pl-4 text-slate-300">
                      focus: [<span className="text-cyan-300">&quot;Laravel&quot;</span>, <span className="text-cyan-300">&quot;Flutter&quot;</span>, <span className="text-cyan-300">&quot;Power BI&quot;</span>],
                    </div>
                    <div className="pl-4 text-slate-300">
                      status: <span className="text-emerald-400">&quot;🟢 Open for Hire&quot;</span>
                    </div>
                    <div className="text-slate-200">&#125;;</div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-slate-400 text-[11px] mb-2 font-syne uppercase tracking-wider font-semibold">
                      Nilai & Prinsip Kerja:
                    </div>
                    <div className="space-y-1.5 font-sans">
                      <div className="flex items-center gap-2 text-slate-300 text-xs">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span>Clean Code & Scalable Architecture</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-xs">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                        <span>High Performance & Mobile-First</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-xs">
                        <CheckCircle2 size={13} className="text-indigo-400 shrink-0" />
                        <span>Data-Driven Decision Making</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Highlight Badge */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-syne">
                    <Sparkles size={13} />
                    <span>Disiplin & Berorientasi Solusi</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[10px]">UBSI 2023-Now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bedimcode About Bio & 3 Metric Cards */}
          <div className="lg:col-span-7 reveal-init reveal-delay-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
              <UserCheck size={14} />
              <span>Tentang Saya</span>
            </div>

            {/* Bedimcode Signature Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-syne text-slate-100 leading-snug tracking-tight mb-5">
              Mahasiswa Sistem Informasi yang berdedikasi membangun{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                aplikasi web modern
              </span>{' '}
              dan sistem mobile berkualitas tinggi.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {profile.bio}
            </p>

            {/* 3 Bedimcode Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-emerald-500/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                  <Briefcase size={18} />
                </div>
                <div className="text-xl font-bold font-syne text-slate-100">3+ Tahun</div>
                <div className="text-xs text-slate-400 mt-0.5">Pengalaman Coding</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                  <FolderCheck size={18} />
                </div>
                <div className="text-xl font-bold font-syne text-slate-100">10+ Proyek</div>
                <div className="text-xs text-slate-400 mt-0.5">Selesai & Teruji</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                  <Award size={18} />
                </div>
                <div className="text-xl font-bold font-syne text-slate-100">Juara 1</div>
                <div className="text-xs text-slate-400 mt-0.5">IT Bootcamp Nasional</div>
              </div>
            </div>

            {/* CTA Link */}
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <span>Hubungi Saya</span>
                <ArrowRight size={15} />
              </a>

              <a
                href="#works"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-syne font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <span>Lihat Portofolio</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
