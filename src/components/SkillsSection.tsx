'use client';

import React from 'react';
import { Skill } from '@/types';

interface SkillsSectionProps {
  skills?: Skill[];
}

interface BiancaSkillCategory {
  title: string;
  icon: string;
  items: { name: string; img: string }[];
}

const BIANCA_SKILLS: BiancaSkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'ri-layout-3-line',
    items: [
      { name: 'Flutter', img: '/skills/flutter.svg' },
      { name: 'Dart', img: '/skills/dart.svg' },
      { name: 'React', img: '/skills/skills-frontend-4.svg' },
      { name: 'Next.js', img: '/skills/nextjs.svg' },
      { name: 'Tailwind CSS', img: '/skills/tailwindcss.svg' },
      { name: 'HTML', img: '/skills/skills-frontend-1.svg' },
      { name: 'CSS', img: '/skills/skills-frontend-2.svg' },
      { name: 'JavaScript', img: '/skills/skills-frontend-3.svg' },
    ],
  },
  {
    title: 'Backend',
    icon: 'ri-database-line',
    items: [
      { name: 'Laravel', img: '/skills/skills-backend-1.svg' },
      { name: 'PHP', img: '/skills/php.svg' },
      { name: 'MySQL', img: '/skills/mysql.svg' },
      { name: 'PostgreSQL', img: '/skills/skills-backend-2.svg' },
      { name: 'Supabase', img: '/skills/skills-backend-4.svg' },
      { name: 'Node Js', img: '/skills/skills-backend-3.svg' },
    ],
  },
  {
    title: 'Data & Tools',
    icon: 'ri-pencil-rule-2-line',
    items: [
      { name: 'Power BI', img: '/skills/powerbi.svg' },
      { name: 'Git', img: '/skills/skills-frontend-6.svg' },
      { name: 'GitHub', img: '/skills/skills-frontend-7.svg' },
      { name: 'Figma', img: '/skills/skills-design-1.svg' },
      { name: 'Framer', img: '/skills/skills-design-6.svg' },
    ],
  },
];

export default function SkillsSection({}: SkillsSectionProps) {
  return (
    <section className="skills section" id="skills">
      <h2 className="section__title reveal-init">
        My <span>Skills</span>
      </h2>

      <p className="skills__description reveal-init">
        Keahlian teknis yang saya pelajari dan kembangkan secara konsisten melalui
        studi Sistem Informasi UBSI, proyek nyata, dan kompetisi nasional.
      </p>

      <div className="skills__container container grid reveal-init">
        {BIANCA_SKILLS.map((group) => (
          <article key={group.title} className="skills__card">
            <div className="skills__profession">
              <i className={`${group.icon} skills__icon`} />
              <h2 className="skills__title">{group.title}</h2>
            </div>

            <ul className="skills__list">
              {group.items.map((item) => (
                <li key={item.name} className="skills__item">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="skills__img"
                  />
                  <span className="skills__name">{item.name}</span>
                </li>
              ))}
            </ul>

            <div className="blob-small" />
          </article>
        ))}
      </div>
    </section>
  );
}
