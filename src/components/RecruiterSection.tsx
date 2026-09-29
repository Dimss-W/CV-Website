'use client';

import React, { useState } from 'react';
import { 
  Award, 
  Smartphone, 
  Database, 
  BarChart3, 
  CheckCircle2, 
  Zap, 
  Send, 
  Download, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users
} from 'lucide-react';
import { Profile } from '@/types';

interface RecruiterSectionProps {
  profile: Profile;
}

type RoleKey = 'mobile' | 'fullstack' | 'powerbi' | 'fastlearner';

interface RoleDetail {
  title: string;
  badge: string;
  icon: React.ReactNode;
  matchScore: number;
  highlight: string;
  readiness: string;
  competencies: string[];
  deliverables: string[];
}

export default function RecruiterSection({ profile }: RecruiterSectionProps) {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('mobile');

  const roleDetails: Record<RoleKey, RoleDetail> = {
    mobile: {
      title: 'Mobile App Developer (Flutter & Dart)',
      badge: 'Spesialisasi Unggulan',
      icon: <Smartphone className="text-sky-400" size={22} />,
      matchScore: 98,
      highlight: 'Membangun aplikasi mobile cross-platform (iOS & Android) berperforma tinggi dengan arsitektur bersih, reactive state management, dan konektivitas REST API.',
      readiness: 'Siap Onboard Segera (< 1 Minggu)',
      competencies: [
        'Flutter Framework & Dart Language',
        'State Management (Provider / Bloc / Riverpod)',
        'Integrasi RESTful API & JSON Serialization',
        'Offline Storage & Local Caching (SQLite/Hive)',
        'Push Notifications & Responsive Mobile UI',
      ],
      deliverables: [
        'Aplikasi mobile siap rilis ke store',
        'Integrasi backend terstruktur dengan Laravel',
        'UI pixel-perfect sesuai rancangan Figma',
      ],
    },
    fullstack: {
      title: 'Full Stack Web & API Developer (Laravel + Next.js)',
      badge: 'Solusi End-to-End',
      icon: <Database className="text-indigo-400" size={22} />,
      matchScore: 96,
      highlight: 'Menghubungkan frontend interaktif dengan backend API berbasis Laravel/PHP yang aman, terstruktur, dan siap diskalakan dengan database relasional.',
      readiness: 'Siap Onboard Segera (< 1 Minggu)',
      competencies: [
        'Laravel & PHP Backend Architecture',
        'REST API Design, JWT & Sanctum Auth',
        'MySQL & Supabase Database Management',
        'Next.js 13/14, React & Tailwind CSS',
        'Clean Code & MVC Design Patterns',
      ],
      deliverables: [
        'Sistem API cepat, aman, dan terdokumentasi',
        'Dashboard web responsif dan interaktif',
        'Optimasi query database & keamanan endpoint',
      ],
    },
    powerbi: {
      title: 'Business Intelligence & Dashboard Integrator',
      badge: 'Analitik Enterprise',
      icon: <BarChart3 className="text-amber-400" size={22} />,
      matchScore: 95,
      highlight: 'Membantu manajemen dan tim bisnis mengambil keputusan akurat lewat visualisasi data interaktif Power BI yang terhubung langsung ke database aplikasi.',
      readiness: 'Siap Onboard Segera (< 1 Minggu)',
      competencies: [
        'Microsoft Power BI & Data Modeling',
        'DAX Queries & Custom Measures',
        'Data Pipeline ETL dari Database ke Dashboard',
        'Real-time Executive KPI Monitoring',
        'Automated Reporting & Scheduled Refresh',
      ],
      deliverables: [
        'Executive dashboard interaktif satu layar',
        'Pipeline sinkronisasi data otomatis',
        'Laporan analisis performa bisnis yang mudah dipahami',
      ],
    },
    fastlearner: {
      title: 'High-Impact Junior / Graduate Software Engineer',
      badge: 'Pemenang Kompetisi',
      icon: <Award className="text-emerald-400" size={22} />,
      matchScore: 99,
      highlight: 'Terbukti memiliki etos kerja tinggi dan daya serap teknologi cepat dengan meraih Juara 1 IT Bootcamp Software Development 2025 di antara puluhan peserta.',
      readiness: 'Siap Bergabung Penuh Waktu / Magang',
      competencies: [
        'Grit & Problem Solving di Bawah Tekanan',
        'Kecepatan Adaptasi Stack Teknologi Baru',
        'Kemampuan Komunikasi & Presentasi Teknis (Speaker 2025)',
        'Kolaborasi Tim & Version Control (Git/GitHub)',
        'Mahasiswa Aktif Sistem Informasi UBSI (2023 - Sekarang)',
      ],
      deliverables: [
        'Eksekusi tugas cepat dengan inisiatif tinggi',
        'Sikap antusias belajar dan menerima masukan',
        'Kontribusi langsung pada sprint pengembangan tim',
      ],
    },
  };

  const active = roleDetails[selectedRole];

  return (
    <section id="why-hire-me" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Badge & Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 text-xs font-semibold mb-4 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>STATUS REKRUTMEN: TERSEDIA SEGERA</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
          Kenapa Merekrut <span className="gradient-text">Dimas Wijanarko?</span>
        </h2>
        
        <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
          Kombinasi langka antara kemampuan teknis <strong className="text-slate-200">Mobile (Flutter)</strong>, arsitektur <strong className="text-slate-200">Backend (Laravel)</strong>, analitik data <strong className="text-slate-200">(Power BI)</strong>, dan rekam jejak juara yang terbukti berdaya juang tinggi.
        </p>
      </div>

      {/* 4 Value Proposition Cards (High Conversion Pillars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {/* Pillar 1 */}
        <div className="glass-card p-6 border border-slate-800/80 bg-slate-900/60 hover:border-amber-500/50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-5 text-amber-400 group-hover:scale-110 transition-transform">
            <Award size={24} />
          </div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            Proven Winner 2025
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">
            Juara 1 IT Bootcamp
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Menjuarai kompetisi pengembangan perangkat lunak 2025. Terbiasa menyelesaikan masalah rumit dengan standar tinggi dan tenggat waktu ketat.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="glass-card p-6 border border-slate-800/80 bg-slate-900/60 hover:border-sky-500/50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-5 text-sky-400 group-hover:scale-110 transition-transform">
            <Smartphone size={24} />
          </div>
          <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
            Full-Cycle Development
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">
            Flutter + Laravel API
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mampu membangun solusi mobile dan web end-to-end tanpa gap komunikasi antara frontend dan backend. Menghemat waktu dan biaya tim.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="glass-card p-6 border border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-5 text-indigo-400 group-hover:scale-110 transition-transform">
            <BarChart3 size={24} />
          </div>
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            Enterprise Insight
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">
            Integrasi Power BI
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Memiliki keahlian data reporting yang menghubungkan database operasional perusahaan ke dashboard visualisasi Power BI untuk para eksekutif.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="glass-card p-6 border border-slate-800/80 bg-slate-900/60 hover:border-emerald-500/50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5 text-emerald-400 group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            Leadership & Speaker
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">
            Pembicara Bootcamp 2025
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dipercaya menjadi pembicara bootcamp SMK 2025. Memiliki kemampuan komunikasi prima dalam menjelaskan alur teknis kepada audiens maupun klien.
          </p>
        </div>
      </div>

      {/* Interactive Recruiter Match Assessment Matrix */}
      <div className="glass-card border border-slate-800 rounded-3xl p-6 sm:p-10 bg-slate-900/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Top Header inside Matrix */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Kalkulator Kesesuaian Kebutuhan Tim Anda</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              Pilih Posisi yang Sedang Anda Butuhkan:
            </h3>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/70 border border-slate-700/80 rounded-full text-xs text-slate-300 font-mono">
            <Clock size={13} className="text-emerald-400" />
            <span>Kesiapan: <strong>Segera / Full-Time / Magang</strong></span>
          </div>
        </div>

        {/* Role Selector Tabs with Silky Transitions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6">
          <button
            onClick={() => setSelectedRole('mobile')}
            className={`p-3.5 rounded-2xl text-left transition-all duration-300 ease-out border ${
              selectedRole === 'mobile'
                ? 'bg-sky-950/60 border-sky-500/80 text-white shadow-lg shadow-sky-500/15 scale-[1.02]'
                : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900/40'
            }`}
          >
            <div className="text-xs font-bold truncate">📱 Mobile Engineer</div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">Flutter & Dart</div>
          </button>

          <button
            onClick={() => setSelectedRole('fullstack')}
            className={`p-3.5 rounded-2xl text-left transition-all duration-300 ease-out border ${
              selectedRole === 'fullstack'
                ? 'bg-indigo-950/60 border-indigo-500/80 text-white shadow-lg shadow-indigo-500/15 scale-[1.02]'
                : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900/40'
            }`}
          >
            <div className="text-xs font-bold truncate">⚡ Full Stack Web</div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">Laravel + Next.js</div>
          </button>

          <button
            onClick={() => setSelectedRole('powerbi')}
            className={`p-3.5 rounded-2xl text-left transition-all duration-300 ease-out border ${
              selectedRole === 'powerbi'
                ? 'bg-amber-950/60 border-amber-500/80 text-white shadow-lg shadow-amber-500/15 scale-[1.02]'
                : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900/40'
            }`}
          >
            <div className="text-xs font-bold truncate">📊 Data & Power BI</div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">Monitoring Dashboard</div>
          </button>

          <button
            onClick={() => setSelectedRole('fastlearner')}
            className={`p-3.5 rounded-2xl text-left transition-all duration-300 ease-out border ${
              selectedRole === 'fastlearner'
                ? 'bg-emerald-950/60 border-emerald-500/80 text-white shadow-lg shadow-emerald-500/15 scale-[1.02]'
                : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900/40'
            }`}
          >
            <div className="text-xs font-bold truncate">🚀 Junior / Magang</div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">Juara 1 Bootcamp 2025</div>
          </button>
        </div>

        {/* Selected Role Deep-Dive Card with Gentle Fade Transition */}
        <div key={selectedRole} className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-400 ease-out">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                {active.icon}
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-bold text-sky-300 uppercase tracking-wider mb-1">
                  {active.badge}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-100">
                  {active.title}
                </h4>
              </div>
            </div>

            {/* Match Score Indicator */}
            <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-800 self-start lg:self-auto">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Tingkat Kecocokan
                </div>
                <div className="text-2xl font-black text-emerald-400">
                  {active.matchScore}% MATCH
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>

          {/* Description Highlight */}
          <p className="text-sm text-slate-300 leading-relaxed my-5 font-medium">
            "{active.highlight}"
          </p>

          {/* Grid of Competencies & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Zap size={14} className="text-amber-400" />
                <span>Keahlian Siap Pakai:</span>
              </div>
              <ul className="space-y-2">
                {active.competencies.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-sky-400" />
                <span>Nilai yang Akan Didapatkan Tim:</span>
              </div>
              <ul className="space-y-2">
                {active.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <ArrowRight size={14} className="text-sky-400 mt-0.5 shrink-0" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Direct Recruiter CTA Banner */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              Tertarik mendiskusikan peluang dengan Dimas? Respon cepat dalam 1x24 jam.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="#contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <Send size={14} />
                <span>Ajukan Tawaran / Wawancara</span>
              </a>

              <a
                href={`mailto:${profile.email}?subject=Tawaran%20Kerja%20untuk%20Dimas%20Wijanarko&body=Halo%20Dimas,%20kami%20tertarik%20dengan%20profil%20Anda.`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Email Langsung</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
