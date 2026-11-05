'use client';

import React from 'react';
import { Education } from '@/types';

interface EducationSectionProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 sm:py-28 relative bg-[#06070a] overflow-hidden">
      {/* Background glow in Violet & Amber */}
      <div className="glow-orb w-[450px] h-[450px] bg-violet-600/12 top-1/4 right-[-10%]" />
      <div className="glow-orb w-[450px] h-[450px] bg-indigo-600/10 bottom-10 left-[-10%]" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20 reveal-scale">
          <div className="section-tag">
            <i className="ri-graduation-cap-line text-violet-400" />
            <span>Pendidikan Tinggi &amp; Akademik</span>
          </div>
          <h2 className="section-heading mb-4">
            Latar Belakang <span className="gradient-text-violet">Studi Sistem Informasi</span>
          </h2>
          <p className="section-description">
            Pondasi keilmuan teknologi informasi terstruktur yang memadukan rekayasa perangkat lunak, 
            tata kelola data relasional, dan penyelesaian masalah bisnis komputasional.
          </p>
        </div>

        {/* Education Bento Cards with Scale Reveal */}
        <div className="space-y-6">
          {educations.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className="glass-panel glass-panel-hover p-6 sm:p-9 relative overflow-hidden group reveal-scale delay-100"
            >
              {/* Background gradient decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/8 rounded-full blur-3xl pointer-events-none group-hover:bg-violet-600/15 transition-colors" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600/25 to-purple-500/15 border border-violet-400/35 flex items-center justify-center text-violet-300 text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-violet-600/15">
                      <i className="ri-graduation-cap-fill" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider block mb-0.5">
                        {edu.institution}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">
                        {edu.degree}
                      </h3>
                    </div>
                  </div>

                  <span className="px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/25 text-violet-300 text-xs font-mono font-semibold">
                    {edu.start_year} — {edu.end_year || 'Sekarang (Aktif)'}
                  </span>
                </div>

                {edu.description && (
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 pt-3 border-t border-white/8">
                    {edu.description}
                  </p>
                )}

                {/* Academic Highlights & Coursework Tags */}
                <div className="pt-4 border-t border-white/8">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block mb-3">
                    Fokus Kurikulum &amp; Spesialisasi Terintegrasi
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8 text-slate-300">
                      Rekayasa Perangkat Lunak Web &amp; Mobile
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8 text-slate-300">
                      Arsitektur Basis Data Relasional
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8 text-slate-300">
                      Analisis &amp; Desain Sistem (UML / BPMN)
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8 text-slate-300">
                      Kecerdasan Bisnis &amp; Analitik Power BI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
