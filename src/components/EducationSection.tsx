'use client';

import React from 'react';
import { Education } from '@/types';

interface EducationSectionProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 sm:py-28 relative border-t border-zinc-800/80">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16 reveal-on-scroll">
          <div className="section-tag">
            <span>Pendidikan Tinggi</span>
          </div>
          <h2 className="section-heading mb-4">
            Studi Sistem Informasi
          </h2>
          <p className="section-description">
            Pondasi keilmuan teknologi informasi terstruktur yang memadukan rekayasa perangkat lunak, 
            tata kelola basis data relasional, dan penyelesaian masalah proses bisnis.
          </p>
        </div>

        {/* Education Bento Cards */}
        <div className="space-y-6">
          {educations.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 relative overflow-hidden group reveal-scale spotlight-card"
            >
              <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 text-xl shrink-0">
                      <i className="ri-graduation-cap-line" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-zinc-400 font-medium uppercase tracking-wider block mb-0.5">
                        {edu.institution}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {edu.degree}
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
                    {edu.start_year} — {edu.end_year || 'Sekarang (Aktif)'}
                  </span>
                </div>

                {edu.description && (
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 pt-3 border-t border-zinc-800">
                    {edu.description}
                  </p>
                )}

                {/* Academic Highlights & Coursework Tags */}
                <div className="pt-4 border-t border-zinc-800">
                  <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider block mb-3">
                    Fokus Kurikulum &amp; Spesialisasi
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                      Rekayasa Perangkat Lunak Web &amp; Mobile
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                      Arsitektur Basis Data Relasional
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                      Analisis &amp; Desain Sistem (UML / BPMN)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
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
