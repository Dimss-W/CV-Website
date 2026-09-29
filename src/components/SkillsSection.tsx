'use client';

import React from 'react';
import { Skill } from '@/types';
import { Cpu, Layout, Server, Database, Wrench, CheckCircle2 } from 'lucide-react';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const categories: Array<'Frontend' | 'Backend' | 'Database & Cloud' | 'Tools & DevOps'> = [
    'Frontend',
    'Backend',
    'Database & Cloud',
    'Tools & DevOps',
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Layout size={19} className="text-emerald-400" />;
      case 'Backend':
        return <Server size={19} className="text-cyan-400" />;
      case 'Database & Cloud':
        return <Database size={19} className="text-teal-400" />;
      case 'Tools & DevOps':
        return <Wrench size={19} className="text-indigo-400" />;
      default:
        return <Cpu size={19} className="text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-init">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
            <Cpu size={14} />
            <span>Keahlian Teknis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-slate-100 tracking-tight mb-4">
            Keahlian & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Kompetensi</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Teknologi, framework, dan tools yang saya kuasai untuk membangun produk digital berstandar industri dengan performa tinggi.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const catSkills = skills.filter((s) => s.category === cat);
            if (catSkills.length === 0) return null;
            const delayClass = idx === 0 ? '' : idx === 1 ? 'reveal-delay-1' : idx === 2 ? 'reveal-delay-2' : 'reveal-delay-3';

            return (
              <div
                key={cat}
                className={`glass-card p-6 rounded-2xl flex flex-col border border-slate-800/90 bg-slate-900/60 shadow-lg shadow-black/20 hover:border-emerald-500/30 transition-all duration-300 reveal-init ${delayClass}`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0">
                    {getCategoryIcon(cat)}
                  </div>
                  <h3 className="text-base font-bold font-syne text-slate-100">{cat}</h3>
                </div>

                {/* Skill Items */}
                <div className="flex flex-col gap-4 flex-1">
                  {catSkills.map((skill, sIdx) => (
                    <div key={skill.id || sIdx}>
                      <div className="flex justify-between items-center mb-1.5 text-sm">
                        <div className="flex items-center gap-1.5 text-slate-200 font-medium text-xs">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          <span>{skill.name}</span>
                        </div>
                        {skill.level && (
                          <span className="text-[11px] text-slate-400 font-mono">
                            {skill.level}%
                          </span>
                        )}
                      </div>

                      {/* Progress Bar with Emerald-Cyan Gradient */}
                      {skill.level && (
                        <div className="w-full h-1.5 bg-slate-800/90 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
