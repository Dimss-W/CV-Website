'use client';

import React from 'react';
import { Profile } from '@/types';
import { Award, Briefcase, FolderCheck, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Profile Card with Bedimcode Floating Accent */}
          <div className="lg:col-span-5 reveal-init">
            <div className="relative mx-auto max-w-[280px] sm:max-w-[310px]">
              {/* Neon Glow Blobs behind the image */}
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Main Photo Card Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl p-2 sm:p-2.5">
                <div className="relative rounded-xl overflow-hidden aspect-[3/3.8] bg-slate-950 flex items-center justify-center">
                  <img
                    src={profile.avatar_url || '/dimas-profile.jpg'}
                    alt={profile.full_name}
                    className="w-full h-full object-cover object-[center_25%] scale-[0.93] origin-center filter grayscale-[5%] hover:grayscale-0 hover:scale-[0.96] transition-all duration-500"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Experience Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-2.5 flex items-center gap-2.5 shadow-md pointer-events-none">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-xs">
                      3+
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white font-syne">Tahun Pengalaman Aktif</div>
                      <div className="text-[9px] text-slate-400">Web, Mobile & Data Analytics</div>
                    </div>
                  </div>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-syne text-slate-100 leading-snug tracking-tight mb-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <span>Hubungi Saya</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-syne font-semibold text-xs uppercase tracking-wider transition-all"
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
