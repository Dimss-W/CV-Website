'use client';

import React from 'react';

interface MilestoneItem {
  badgeLabel: string;
  badgeIcon: string;
  tag: string;
  title: string;
  description: string;
  issuer: string;
  role: string;
  img: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    badgeLabel: 'Juara 1 Nasional',
    badgeIcon: 'ri-award-line',
    tag: 'Kompetisi',
    title: 'IT Bootcamp Software Development',
    description:
      'Meraih peringkat pertama dalam kompetisi pengembangan perangkat lunak tingkat nasional, mengungguli perwakilan mahasiswa dari seluruh cabang universitas se-Indonesia dengan implementasi arsitektur sistem yang teruji.',
    issuer: 'FTI & Rektorat UBSI',
    role: 'Kompetisi Nasional Perangkat Lunak',
    img: '/documentation/juara-1-bootcamp-penyerahan-piala.jpg',
  },
  {
    badgeLabel: 'Lisensi Nasional',
    badgeIcon: 'ri-shield-check-line',
    tag: 'Sertifikasi BNSP',
    title: 'Sertifikat Kompetensi Database Administrator',
    description:
      'Tersertifikasi Kompeten secara resmi oleh Badan Nasional Sertifikasi Profesi (No. Reg. DMS.1241.00936 2026) dalam pemodelan data relasional, penulisan kueri tingkat lanjut, dan manajemen basis data.',
    issuer: 'Badan Nasional Sertifikasi Profesi',
    role: 'LSP Universitas Bina Sarana Informatika',
    img: '/certificates/serkom-database-administrator.png',
  },
  {
    badgeLabel: 'Sistem Produksi',
    badgeIcon: 'ri-building-line',
    tag: 'Implementasi Nyata',
    title: 'Monitoring Realisasi Biaya & QC BASTO',
    description:
      'Mengembangkan sistem web operasional perusahaan dan dashboard analitik Microsoft Power BI untuk pemantauan capaian proyek serta verifikasi mutu dokumen teknik secara real-time.',
    issuer: 'PT PGAS Telekomunikasi Nusantara',
    role: 'PGNCOM (Subholding Gas Pertamina)',
    img: '/projects/pgncom-login.png',
  },
  {
    badgeLabel: 'Instruktur Tamu',
    badgeIcon: 'ri-presentation-line',
    tag: 'Transfer Ilmu',
    title: 'Pelatihan Framework Web Modern',
    description:
      'Membawakan materi arsitektur MVC, pengembangan web dengan Framework Laravel, integrasi basis data MySQL, dan alur kolaborasi Git standar industri bagi siswa jurusan RPL.',
    issuer: 'SMK Muhammadiyah 15 Jakarta',
    role: 'Jurusan Rekayasa Perangkat Lunak',
    img: '/documentation/smk-muhammadiyah-pengajar-1.jpg',
  },
];

export default function TestimonialsSection() {
  // Gandakan item untuk seamless infinite horizontal marquee
  const marqueeItems = [...MILESTONES, ...MILESTONES];

  return (
    <section className="testimonials section" id="achievements">
      <h2 className="section__title reveal-init">
        <span>Validasi</span> &amp; Rekam Jejak
      </h2>

      <div className="testimonials__container container grid reveal-init">
        <div className="testimonials__content">
          {marqueeItems.map((item, idx) => (
            <article key={idx} className="testimonials__card">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 z-10 relative">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--first-color)]/10 text-[var(--first-color)] border border-[var(--first-color)]/30">
                    <i className={`${item.badgeIcon} text-sm`} />
                    <span>{item.badgeLabel}</span>
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-color)]/80">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-2 z-10 relative">
                  {item.title}
                </h3>

                <p className="testimonials__description text-xs">
                  {item.description}
                </p>
              </div>

              <div className="testimonials__profile">
                <img
                  src={item.img}
                  alt={item.issuer}
                  style={{ objectPosition: '50% 62%' }}
                  className="testimonials__img"
                />
                <div>
                  <cite className="testimonials__name block text-xs">
                    {item.issuer}
                  </cite>
                  <span className="text-[11px] text-[var(--text-color)]">
                    {item.role}
                  </span>
                </div>
              </div>

              <div className="blob-big" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
