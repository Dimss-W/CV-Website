'use client';

import React from 'react';
import { Education } from '@/types';

interface EducationSectionProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section className="section" id="education">
      <h2 className="section__title reveal-init">
        Pendidikan <span>Tinggi</span>
      </h2>

      <div className="container max-w-3xl mx-auto">
        {educations.map((edu, idx) => (
          <article
            key={edu.id || idx}
            className="education__card relative bg-[var(--container-color)] p-6 sm:p-8 rounded-2xl border border-slate-800/80 hover:border-[var(--first-color)]/50 transition-all duration-300 shadow-sm"
          >
            <div className="relative z-[5]">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[var(--first-color)]/10 border border-[var(--first-color)]/30 flex items-center justify-center text-2xl text-[var(--first-color)] shrink-0">
                    <i className="ri-graduation-cap-line" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-[var(--first-color)] mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <span className="px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-200">
                  {edu.start_year} — {edu.end_year || 'Sekarang'}
                </span>
              </div>

              {edu.description && (
                <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/60">
                  {edu.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-400 font-mono">
                <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                  Fokus: Rekayasa Perangkat Lunak Web &amp; Mobile
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                  Arsitektur Basis Data Relasional
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                  Analisis &amp; Desain Sistem
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
