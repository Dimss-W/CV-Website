'use client';

import React, { useState } from 'react';
import { 
  Code2, 
  Smartphone, 
  BarChart3, 
  Database, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ServiceItem {
  number: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  techStack: string[];
}

const services: ServiceItem[] = [
  {
    number: '01',
    icon: <Code2 className="text-emerald-400" size={28} />,
    title: 'Web Application & Enterprise SaaS Systems',
    subtitle: 'Laravel, React & Enterprise MVC Architecture',
    description: 'Membangun sistem web berskala enterprise, platform SaaS multi-tenant, dan portal operasional berperforma tinggi dengan arsitektur MVC bersih, role-based access control (RBAC), serta keamanan data tingkat korporat.',
    deliverables: [
      'Pengembangan Portal Operasional Enterprise & SaaS Multi-Tenant (Kastrix POS & PGNCOM)',
      'Arsitektur Clean MVC Berbasis Laravel, Blade, React & Tailwind CSS',
      'Sistem Verifikasi Berjenjang & Tata Kelola Multi-Kampus (FindIt 27 Kampus UBSI)',
      'Autentikasi Aman, Audit Log Keamanan, & Otomasi Alur Kerja Transaksional',
    ],
    techStack: ['Laravel', 'PHP', 'React', 'Tailwind CSS', 'MySQL', 'REST API'],
  },
  {
    number: '02',
    icon: <Smartphone className="text-cyan-400" size={28} />,
    title: 'Cross-Platform Mobile App Development',
    subtitle: 'Flutter & Dart Native Experience',
    description: 'Mengembangkan aplikasi mobile modern untuk Android dan iOS dengan framework Flutter & Dart yang terintegrasi secara mulus ke RESTful API Laravel, menghadirkan interaktivitas tinggi dan performa mulus.',
    deliverables: [
      'Antarmuka Mobile Modern Mengikuti Standar Material UI/UX (CalTrack Health App)',
      'Kalkulasi Data & Gauge Interaktif Real-Time (IMT/BMI Calculator & Health Progress)',
      'Manajemen State Reaktif, Autentikasi JWT & Pengingat Alarm Otomatis',
      'Integrasi Dinamis ke Backend RESTful API & Manajemen Basis Data Relasional',
    ],
    techStack: ['Flutter', 'Dart', 'Laravel API', 'REST API', 'MySQL', 'Mobile UI'],
  },
  {
    number: '03',
    icon: <BarChart3 className="text-indigo-400" size={28} />,
    title: 'Enterprise Monitoring & Power BI Analytics',
    subtitle: 'Microsoft Power BI, DAX & Executive Reporting',
    description: 'Merancang visualisasi data bisnis interaktif, monitoring serapan anggaran, dan KPI kinerja eksekutif dengan Microsoft Power BI terintegrasi langsung ke database operasional perusahaan (seperti implementasi di PT PGAS Telekomunikasi Nusantara).',
    deliverables: [
      'Dashboard Analitik Interaktif Power BI (Nilai Kontrak vs Realisasi vs Prognosa Rp309M)',
      'Pemodelan Data Relasional, Perhitungan DAX & Analisis Finansial per Vendor',
      'Tracking Status Transaksi Finansial (PAID, POPAY, WAIT INV) Berkelanjutan',
      'Monitoring Realisasi Biaya & Quality Control Berstandar Enterprise NOC',
    ],
    techStack: ['Microsoft Power BI', 'DAX', 'MySQL', 'Data Modeling', 'Laravel Backend'],
  },
  {
    number: '04',
    icon: <Database className="text-teal-400" size={28} />,
    title: 'Smart Automation & AI Vision Integration',
    subtitle: 'Gemini Vision AI, OCR & Automated Workflows',
    description: 'Mengintegrasikan teknologi kecerdasan buatan dan otomasi alur kerja modern untuk meningkatkan efisiensi operasional, akurasi data sistem, dan kenyamanan pengguna.',
    deliverables: [
      'Integrasi AI Speedometer Scanner (Gemini Vision) untuk input odometer otomatis (Otokeep)',
      'Sistem Pengingat Servis Berkala & Alarm Notifikasi Layar HP Otomatis',
      'Alur Verifikasi Fisik Barang, Loker/Brankas, dan Berita Acara Digital (FindIt UBSI)',
      'Audit Log Keamanan & Pelaporan Otomatis Aktivitas Pengguna Terpusat',
    ],
    techStack: ['Gemini Vision AI', 'OCR Detection', 'Automation', 'MySQL', 'Security Audit'],
  },
];

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-init">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
            <Sparkles size={14} />
            <span>Layanan Profesional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-slate-100 tracking-tight mb-4">
            Layanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Unggulan</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Solusi rekayasa perangkat lunak menyeluruh dari perancangan antarmuka, arsitektur database, hingga integrasi analitik data enterprise.
          </p>
        </div>

        {/* Services Accordion Cards in Bedimcode Style */}
        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          {services.map((service, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={service.number}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-xl shadow-emerald-950/20'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Header clickable bar */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-6 sm:px-8 sm:py-7 flex items-center justify-between text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-5 sm:gap-7 flex-1">
                    {/* Number Indicator */}
                    <span className="font-syne font-extrabold text-xl sm:text-2xl text-slate-500">
                      {service.number}
                    </span>

                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center flex-shrink-0 shadow-inner">
                      {service.icon}
                    </div>

                    {/* Title & subtitle */}
                    <div>
                      <h3 className="font-syne font-bold text-lg sm:text-xl text-slate-100 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Arrow */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 rotate-180'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-6 pb-7 sm:px-8 sm:pb-8 pt-2 border-t border-slate-800/60 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Cakupan Solusi & Deliverables:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.deliverables.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Pills & Contact Action */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group"
                      >
                        <span>Konsultasikan Proyek</span>
                        <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
