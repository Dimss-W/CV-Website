'use client';

import React from 'react';

interface TestimonialItem {
  rating: string;
  quote: string;
  name: string;
  role: string;
  img: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    rating: '5.0',
    quote:
      '“Sangat disiplin dan berorientasi solusi; berhasil membangun portal Monitoring Realisasi & dashboard analitik Power BI yang sangat membantu operasional perusahaan.”',
    name: 'Tim Operasional PGNCOM',
    role: 'PT PGAS Telekomunikasi Nusantara',
    img: '/projects/pgncom-login.png',
  },
  {
    rating: '5.0',
    quote:
      '“Berhasil meraih Juara 1 IT Bootcamp Software Development mengungguli perwakilan seluruh kampus cabang UBSI dengan kualitas arsitektur aplikasi web yang unggul.”',
    name: 'FTI & Rektorat UBSI',
    role: 'IT Bootcamp Software Development',
    img: '/documentation/juara-1-bootcamp-penyerahan-piala.jpg',
  },
  {
    rating: '5.0',
    quote:
      '“Penyampaian materi Framework Laravel & praktik coding kepada siswa jurusan Rekayasa Perangkat Lunak sangat jelas, interaktif, dan mudah dipahami.”',
    name: 'Jurusan RPL',
    role: 'SMK Muhammadiyah 15 Jakarta',
    img: '/documentation/smk-muhammadiyah-pengajar-1.jpg',
  },
  {
    rating: '5.0',
    quote:
      '“Tersertifikasi Kompeten secara nasional pada skema Database Administrator oleh BNSP & LSP UBSI dengan penguasaan SQL dan perancangan basis data yang solid.”',
    name: 'Asesor LSP & BNSP',
    role: 'Sertifikasi Kompetensi Nasional',
    img: '/certificates/serkom-database-administrator.png',
  },
];

export default function TestimonialsSection() {
  // Duplicate cards for seamless infinite marquee (exact Bedimcode Bianca JS logic)
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="testimonials section">
      <h2 className="section__title reveal-init">
        <span>What</span> They Say
      </h2>

      <div className="testimonials__container container grid reveal-init">
        <div className="testimonials__content">
          {marqueeItems.map((item, idx) => (
            <article key={idx} className="testimonials__card">
              <div>
                <div className="testimonials__rating">
                  <span className="testimonials__number">{item.rating}</span>

                  <div className="testimonials__stars">
                    <i className="ri-star-line" />
                    <i className="ri-star-line" />
                    <i className="ri-star-line" />
                    <i className="ri-star-line" />
                    <i className="ri-star-line" />
                  </div>
                </div>

                <blockquote className="testimonials__description">
                  {item.quote}
                </blockquote>
              </div>

              <div className="testimonials__profile">
                <img
                  src={item.img}
                  alt={item.name}
                  className="testimonials__img"
                />
                <div>
                  <cite className="testimonials__name block">{item.name}</cite>
                  <span className="text-xs text-[var(--text-color)]">
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
