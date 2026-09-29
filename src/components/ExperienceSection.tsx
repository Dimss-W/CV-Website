'use client';

import React from 'react';
import { Experience } from '@/types';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 bg-slate-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-init">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
            <Briefcase size={14} />
            <span>Karier & Perjalanan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-slate-100 tracking-tight mb-4">
            Pengalaman <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Profesional</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Jejak langkah karier saya dalam merancang solusi digital, memimpin implementasi arsitektur web modern, dan membangun produk yang andal.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Spine Line */}
          <div className="absolute top-4 bottom-4 left-5 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-400 to-slate-900 z-0" />

          <div className="flex flex-col gap-10">
            {experiences.map((item, index) => {
              const delayClass = index === 0 ? '' : index === 1 ? 'reveal-delay-1' : 'reveal-delay-2';
              return (
                <div
                  key={item.id || index}
                  className={`flex gap-6 sm:gap-8 relative z-10 reveal-init ${delayClass}`}
                >
                  {/* Timeline Icon Node */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 transition-transform ${
                      item.is_current
                        ? 'bg-gradient-to-tr from-emerald-400 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 ring-4 ring-slate-950'
                        : 'bg-slate-900 border border-slate-700 text-emerald-400 ring-4 ring-slate-950'
                    }`}
                  >
                    <Briefcase size={17} />
                  </div>

                  {/* Experience Card */}
                  <div className="glass-card p-6 sm:p-7 flex-1 border border-slate-800/90 bg-slate-900/60 shadow-lg shadow-black/30">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
                          {item.role}
                        </h3>
                        <div className="text-sm sm:text-base font-semibold text-sky-400 mt-0.5">
                          {item.company}
                        </div>
                      </div>

                      {/* Date & Status Pill */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60 font-medium">
                          <Calendar size={13} />
                          <span>
                            {item.start_date} – {item.is_current ? 'Sekarang' : item.end_date}
                          </span>
                        </div>

                        {item.is_current && (
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/20">
                            Aktif
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    {item.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                        <MapPin size={13} />
                        <span>{item.location}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Technologies tags */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 rounded-md bg-slate-800/70 border border-slate-700/60 text-slate-300 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
