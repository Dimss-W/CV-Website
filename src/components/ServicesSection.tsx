'use client';

import React, { useState } from 'react';

interface ServiceItem {
  icon: string;
  name: string;
  description: string;
  items: string[];
}

const SERVICES: ServiceItem[] = [
  {
    icon: 'ri-code-box-line',
    name: 'Pengembangan Web & Enterprise',
    description:
      'Membangun sistem web berskala enterprise, platform SaaS multi-outlet (Kastrix POS), sistem informasi terpadu multi-kampus (FindIt 27 Kampus UBSI), dan portal operasional perusahaan dengan arsitektur MVC bersih.',
    items: [
      'Laravel & PHP',
      'React & Next.js',
      'Arsitektur MVC',
      'Kontrol Akses (RBAC)',
      'RESTful API',
      'Desain Responsif',
    ],
  },
  {
    icon: 'ri-smartphone-line',
    name: 'Pengembangan Aplikasi Mobile',
    description:
      'Mengembangkan aplikasi mobile cross-platform Android & iOS menggunakan Flutter & Dart yang terintegrasi dinamis dengan backend REST API Laravel (seperti aplikasi kesehatan CalTrack).',
    items: [
      'Flutter & Dart',
      'UI/UX Mobile',
      'Laravel REST API',
      'Autentikasi JWT',
      'Manajemen State',
      'Kalkulator IMT Real-Time',
    ],
  },
  {
    icon: 'ri-bar-chart-box-line',
    name: 'Analitik Data & Power BI',
    description:
      'Merancang dashboard visualisasi analitik interaktif Microsoft Power BI, pemodelan data relasional, dan pelaporan KPI eksekutif terintegrasi ke basis data operasional perusahaan.',
    items: [
      'Microsoft Power BI',
      'Kalkulasi DAX',
      'Dashboard Eksekutif',
      'Pemodelan Data',
      'Monitoring KPI',
      'Kontrol Kualitas (QC)',
    ],
  },
  {
    icon: 'ri-database-2-line',
    name: 'Arsitektur Database & AI',
    description:
      'Mengelola arsitektur basis data relasional berstandar kompetensi nasional BNSP (Database Administrator) serta mengintegrasikan otomasi cerdas Gemini Vision AI (Otokeep Speedometer OCR).',
    items: [
      'MySQL & PostgreSQL',
      'Perancangan Database',
      'Optimasi Query SQL',
      'Supabase Cloud',
      'Gemini Vision AI',
      'Keamanan Data',
    ],
  },
];

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="services section" id="service">
      <h2 className="section__title reveal-init">
        <span>Layanan</span> Unggulan
      </h2>

      <div className="services__container container grid reveal-init">
        {SERVICES.map((service, idx) => {
          const isOpen = openIndex === idx;
          return (
            <article
              key={service.name}
              className={`services__card ${
                isOpen ? 'services-open' : 'services-close'
              }`}
            >
              <button
                type="button"
                className="services__button"
                onClick={() => handleToggle(idx)}
                aria-expanded={isOpen}
              >
                <i className={`${service.icon} services__icon`} />
                <h3 className="services__name">{service.name}</h3>

                <div className="services__arrow">
                  <i className="ri-arrow-down-s-line" />
                </div>
              </button>

              <div className="services__data">
                <p className="services__description">{service.description}</p>

                <ul className="services__list">
                  {service.items.map((item) => (
                    <li key={item} className="services__item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="blob-small" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
