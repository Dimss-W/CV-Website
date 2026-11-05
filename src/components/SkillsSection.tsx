'use client';

import React, { useState } from 'react';
import { Skill } from '@/types';

interface SkillsSectionProps {
  skills?: Skill[];
}

interface SkillItem {
  name: string;
  category: 'Frontend & Mobile' | 'Backend & API' | 'Basis Data & Cloud' | 'Analitik & DevOps';
  level: number;
  icon: string;
  highlight: string;
}

const SKILL_ITEMS: SkillItem[] = [
  // Frontend & Mobile
  {
    name: 'Flutter & Dart',
    category: 'Frontend & Mobile',
    level: 95,
    icon: '/skills/flutter.svg',
    highlight: 'Aplikasi mobile CalTrack, state management & arsitektur MVVM',
  },
  {
    name: 'Laravel Blade & Tailwind',
    category: 'Frontend & Mobile',
    level: 94,
    icon: '/skills/tailwindcss.svg',
    highlight: 'Antarmuka multi-kampus FindIt & Kastrix POS responsif',
  },
  {
    name: 'React.js & Next.js',
    category: 'Frontend & Mobile',
    level: 92,
    icon: '/skills/nextjs.svg',
    highlight: 'Komponen dinamis, SSR, TypeScript, & performa tinggi',
  },
  {
    name: 'UI/UX Responsif',
    category: 'Frontend & Mobile',
    level: 91,
    icon: '/skills/skills-design-1.svg',
    highlight: 'Desain mobile-first, prototipe Figma & aksesibilitas WCAG',
  },

  // Backend & API
  {
    name: 'Laravel & PHP',
    category: 'Backend & API',
    level: 95,
    icon: '/skills/php.svg',
    highlight: 'Pola MVC, service repository, dan otentikasi aman JWT/Sanctum',
  },
  {
    name: 'RESTful API Architecture',
    category: 'Backend & API',
    level: 93,
    icon: '/skills/skills-backend-3.svg',
    highlight: 'Endpoint efisien untuk integrasi web & mobile tanpa overhead',
  },
  {
    name: 'Role-Based Access Control (RBAC)',
    category: 'Backend & API',
    level: 92,
    icon: '/skills/skills-backend-1.svg',
    highlight: 'Partisi hak akses Super Admin, Auditor, Mitra & Kasir',
  },
  {
    name: 'Google Gemini Vision AI',
    category: 'Backend & API',
    level: 90,
    icon: '/skills/antigravity.png',
    highlight: 'Pipeline OCR cerdas pengenal angka odometer & speedometer',
  },

  // Basis Data & Cloud
  {
    name: 'MySQL & Relational Design',
    category: 'Basis Data & Cloud',
    level: 94,
    icon: '/skills/mysql.svg',
    highlight: 'Tersertifikasi BNSP Database Administrator, indeks & ERD',
  },
  {
    name: 'Optimalisasi Kueri SQL',
    category: 'Basis Data & Cloud',
    level: 92,
    icon: '/skills/skills-backend-2.svg',
    highlight: 'Query profiling, normalisasi data 3NF, mitigasi slow query',
  },
  {
    name: 'Supabase & PostgreSQL',
    category: 'Basis Data & Cloud',
    level: 89,
    icon: '/skills/skills-backend-4.svg',
    highlight: 'Cloud database, row-level security, & integrasi BaaS',
  },

  // Analitik & DevOps
  {
    name: 'Microsoft Power BI & DAX',
    category: 'Analitik & DevOps',
    level: 94,
    icon: '/skills/powerbi.svg',
    highlight: 'Dashboard operasional PGNCOM monitoring deviasi anggaran',
  },
  {
    name: 'Git & GitHub Workflow',
    category: 'Analitik & DevOps',
    level: 93,
    icon: '/skills/skills-frontend-7.svg',
    highlight: 'Branching strategy, pull request review, & kolaborasi tim',
  },
  {
    name: 'System Analysis & SDLC',
    category: 'Analitik & DevOps',
    level: 92,
    icon: '/skills/skills-design-3.svg',
    highlight: 'Tersertifikasi BNSP Analis Program, UML, BPMN & DFD',
  },
];

export default function SkillsSection({}: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Bidang' },
    { id: 'Frontend & Mobile', label: 'Frontend & Mobile' },
    { id: 'Backend & API', label: 'Backend & API' },
    { id: 'Basis Data & Cloud', label: 'Basis Data & Cloud' },
    { id: 'Analitik & DevOps', label: 'Analitik & DevOps' },
  ];

  const filteredSkills = activeTab === 'all' 
    ? SKILL_ITEMS 
    : SKILL_ITEMS.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="py-20 sm:py-28 relative bg-[#06090f] overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb w-[450px] h-[450px] bg-sky-500/10 top-1/3 left-[-10%]" />
      <div className="glow-orb w-[450px] h-[450px] bg-cyan-600/10 bottom-10 right-[-10%]" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="section-tag">
            <i className="ri-cpu-line text-cyan-400" />
            <span>Matriks Kompetensi Teknis</span>
          </div>
          <h2 className="section-heading mb-4">
            Keahlian <span className="gradient-text-cyan">&amp; Instrumen Rekayasa</span>
          </h2>
          <p className="section-description">
            Kombinasi kemampuan pengembangan aplikasi full-stack, tata kelola arsitektur basis data, 
            dan analitik kecerdasan bisnis yang teruji di lingkungan akademik dan industri.
          </p>

          {/* Interactive Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-full bg-white/[0.04] border border-white/8 backdrop-blur-md">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-2 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all shrink-0">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain filter drop-shadow"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] font-mono text-cyan-400/80">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-sm font-mono font-bold text-slate-300">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated progress bar */}
                <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.7)] transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Real-world highlight */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {skill.highlight}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Penggunaan Produksi</span>
                <i className="ri-checkbox-circle-fill text-cyan-400/80 text-xs" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
