'use client';

import React from 'react';
import { Education } from '@/types';

interface EducationSectionProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 sm:py-28 relative bg-[#05070b] overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb w-[450px] h-[450px] bg-cyan-600/10 top-1/4 right-[-10%]" />
      <div className="glow-orb w-[450px] h-[450px] bg-indigo-600/10 bottom-10 left-[-10%]" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <div className="section-tag">
            <i className="ri-graduation-cap-line text-cyan-400" />
            <span>Pendidikan Tinggi &amp; Akademik</span>
          </div>
          <h2 className="section-heading mb-4">
            Latar Belakang <span className="gradient-text-cyan">Studi Sistem Informasi</span>
          </h2>
          <p className="section-description">
            Pondasi keilmuan teknologi informasi terstruktur yang memadukan rekayasa perangkat lunak, 
            tata kelola data relasional, dan penyelesaian masalah bisnis komputasional.
          </p>
        </div>

        {/* Education Bento Cards */}
        <div className="space-y-6">
          {educations.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className="glass-panel glass-panel-hover p-6 sm:p-9 relative overflow-hidden group"
            >
              {/* Background gradient decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-sky-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-cyan-500/10">
                      <i className="ri-graduation-cap-fill" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block mb-0.5">
                        {edu.institution}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {edu.degree}
                      </h3>
                    </div>
                  </div>

                  <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono font-semibold">
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
