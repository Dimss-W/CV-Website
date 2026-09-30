'use client';

import React, { useState, useEffect } from 'react';
import { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

const PROFESSIONS = [
  'Pengembang Web Full Stack',
  'Pengembang Aplikasi Mobile',
  'Analis Data & Power BI',
  'Administrator Basis Data',
];

const CIRCULAR_TEXT = 'JELAJAHI - LEBIH - LANJUT -';

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
  const angleStep = 300 / letters.length;

  return (
    <section className="home section" id="home">
      <div className="blob-small" />
      <div className="blob-small" />

      <div className="home__container container grid">
        <div className="home__data reveal-init">
          <h3 className="home__subtitle">
            Halo! Saya {profile.full_name} — Jakarta, Indonesia
          </h3>

          <h1 className="home__title">
            Rekayasa Perangkat Lunak &amp; <br />
            <span id="home-typed">
              {currentText}
              <span className="inline-block ml-0.5 animate-pulse">|</span>
            </span>
          </h1>

          <p className="home__description">
            Mahasiswa Sistem Informasi UBSI yang merancang dan membangun aplikasi Web, Mobile, serta Dashboard Analitik yang modern dan solutif.
          </p>
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
