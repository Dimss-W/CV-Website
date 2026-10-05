'use client';

import React, { useState, useEffect } from 'react';
import { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

const PROFESSIONS = [
  'Aplikasi Web Full Stack',
  'Aplikasi Mobile Flutter',
  'Analitik Data Power BI',
  'Arsitektur Basis Data',
];

const CIRCULAR_TEXT = 'JELAJAHI • LEBIH • LANJUT • ';

export default function Hero({ profile }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = PROFESSIONS[roleIndex];
    const typeSpeed = isDeleting ? 35 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % PROFESSIONS.length);
      } else {
        setCurrentText(
          fullText.substring(0, currentText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  const letters = CIRCULAR_TEXT.split('');
  const angleStep = 360 / letters.length;

  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__data reveal-init">
          <h3 className="home__subtitle">
            Halo! Saya {profile.full_name} —{' '}
            <span className="whitespace-nowrap">Jakarta, Indonesia</span>
          </h3>

          <h1 className="home__title">
            <span className="home__title-top">Pengembang Sistem &amp;</span>
            <span className="home__title-typed" id="home-typed">
              <span>{currentText}</span>
              <span className="home__cursor" aria-hidden="true">|</span>
            </span>
          </h1>

          <p className="home__description">
            Mahasiswa Sistem Informasi UBSI yang merancang dan membangun aplikasi Web, Mobile, serta Dashboard Analitik yang modern dan solutif.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--first-color)] text-[var(--black-color)] text-xs md:text-sm font-semibold hover:brightness-110 transition-all shadow-sm"
            >
              <span>Lihat Portofolio</span>
              <i className="ri-arrow-right-line" />
            </a>

            <a
              href={profile.resume_url && profile.resume_url !== '#contact' ? profile.resume_url : '/certificates/sertifikat-bnsp-database-administrator.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-[var(--first-color)] text-xs md:text-sm font-semibold text-white hover:text-[var(--first-color)] transition-colors shadow-sm"
            >
              <i className="ri-file-download-line text-sm" />
              <span>Unduh CV (PDF)</span>
            </a>
          </div>
        </div>

        <div className="home__images reveal-init">
          <div className="home__box-1" />
          <div className="home__box-2" />
          <div className="home__box-3" />

          <img
            src={profile.avatar_url || '/dimas-profile.jpg'}
            alt={profile.full_name}
            className="home__img"
          />

          <div className="home__circle">
            <span className="home__text" id="home-text">
              {letters.map((char, i) => (
                <span
                  key={i}
                  style={{ transform: `rotate(${i * angleStep}deg)` }}
                >
                  {char}
                </span>
              ))}
            </span>

            <a
              href="#about"
              className="home__arrow"
              aria-label="Gulir ke Tentang Saya"
            >
              <i className="ri-arrow-down-line" />
            </a>
          </div>

          <div className="blob-big" />
        </div>
      </div>
    </section>
  );
}
