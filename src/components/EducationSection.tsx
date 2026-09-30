'use client';

import React from 'react';
import { Education } from '@/types';

interface EducationSectionProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section className="section" id="education">
      <h2 className="section__title reveal-init">
        Latar Belakang <span>Akademik</span>
      </h2>

      <div className="container grid max-w-2xl mx-auto reveal-init">
        {educations.map((edu, idx) => (
          <article
            key={edu.id || idx}
            className="relative bg-[var(--container-color)] p-6 sm:p-8 rounded-[2rem] overflow-hidden"
          >
            <div className="relative z-[5]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <i className="ri-graduation-cap-line text-3xl text-[var(--first-color)]" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-[var(--first-color)]">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <span className="px-3.5 py-1 rounded-full border border-[var(--first-color)] text-xs font-semibold text-white">
                  {edu.start_year} — {edu.end_year || 'Sekarang'}
                </span>
              </div>

              {edu.description && (
                <p className="text-sm text-[var(--text-color)] leading-relaxed mt-3">
                  {edu.description}
                </p>
              )}
            </div>

            <div className="blob-small -top-12 left-1/2 -translate-x-1/2" />
          </article>
        ))}
      </div>
    </section>
  );
}
