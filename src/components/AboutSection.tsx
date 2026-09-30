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
        <h2 className="about__title">
          About Me: Mahasiswa <span>Sistem Informasi UBSI</span> yang berfokus pada{' '}
          <span>Web &amp; Mobile Development</span>, disiplin, berorientasi solusi, dan
          berpengalaman membangun produk nyata.
        </h2>

        <div className="about__info">
          <p className="about__description">
            {profile.bio}
          </p>

          <a href="#contact" className="about__button button">
            <span>Contact me</span>
            <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}
