'use client';

import React from 'react';
import { Education } from '@/types';
import { GraduationCap, Award, Calendar } from 'lucide-react';

interface EducationSectionProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-init">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
            <GraduationCap size={14} />
            <span>Pendidikan & Penghargaan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-slate-100 tracking-tight mb-4">
            Latar Belakang <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Akademik</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Fondasi teori rekayasa perangkat lunak dan pencapaian kompetisi nasional untuk memperkuat keahlian engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto">
          {educations.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className={`glass-card p-7 border border-slate-800 bg-slate-900/60 shadow-lg shadow-black/20 reveal-init ${
                idx === 1 ? 'reveal-delay-1' : ''
              }`}
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                    {edu.degree}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-sky-400 mt-0.5">
                    {edu.institution}
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 font-medium mb-4">
                <Calendar size={12} />
                <span>
                  {edu.start_year} - {edu.end_year || 'Sekarang'}
                </span>
              </div>

              {edu.description && (
                <p className="text-sm text-slate-400 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
