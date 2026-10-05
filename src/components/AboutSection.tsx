'use client';

import React from 'react';
import { Profile } from '@/types';

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="about section" id="about">
      <div className="about__container container grid reveal-init">
        <div>
          <span className="text-xs font-bold tracking-widest text-[var(--first-color)] uppercase">
            Filosofi &amp; Profil Rekayasa
          </span>
          <h2 className="about__title mt-2">
            Membangun sistem web &amp; mobile yang <span>terukur, aman,</span> dan berdampak nyata bagi operasional.
          </h2>

          <div className="about__info mt-4">
            <p className="about__description text-slate-300 leading-relaxed text-sm sm:text-base">
              {profile.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <span className="text-xs text-[var(--first-color)] font-mono block mb-1">01 / PRODUK NYATA</span>
                <h4 className="text-white font-semibold text-sm">5+ Aplikasi Produksi</h4>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Sistem aktif berarsitektur MVC, RESTful API, dan AI OCR yang teruji di lapangan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <span className="text-xs text-[var(--first-color)] font-mono block mb-1">02 / KOMPETENSI RESMI</span>
                <h4 className="text-white font-semibold text-sm">Sertifikasi BNSP</h4>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Database Administrator terverifikasi BNSP &amp; Juara 1 IT Bootcamp Software Development.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <span className="text-xs text-[var(--first-color)] font-mono block mb-1">03 / PENGALAMAN KORPORAT</span>
                <h4 className="text-white font-semibold text-sm">Sistem Internal PGNCOM</h4>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  Monitoring realisasi biaya &amp; integrasi dashboard Power BI analitik berbasis DAX.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#contact" className="about__button button">
                <span>Inisiasi Kolaborasi</span>
                <i className="ri-arrow-right-line" />
              </a>

              <a
                href="https://github.com/Dimss-W"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-[var(--first-color)] transition-colors"
              >
                <i className="ri-github-fill text-lg" />
                <span>Kunjungi GitHub (@Dimss-W)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="blob-big" />
      </div>
    </section>
  );
}
