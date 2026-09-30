'use client';

import React, { useState, useEffect } from 'react';
import { Experience } from '@/types';

interface ExperienceSectionProps {
  experiences: Experience[];
}

function getExpFocalPoint(url: string): string {
  if (url.includes('smk-muhammadiyah-pengajar-1')) return '50% 72%';
  if (url.includes('smk-muhammadiyah-pengajar-2')) return '50% 70%';
  if (url.includes('smk-muhammadiyah-pengajar-3')) return '50% 64%';
  return '50% 55%';
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [modal, setModal] = useState<{
    open: boolean;
    exp: Experience | null;
    imgIdx: number;
  }>({ open: false, exp: null, imgIdx: 0 });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal((p) => ({ ...p, open: false }));
    };
    if (modal.open) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [modal.open]);

  return (
    <section className="section" id="experience">
      <h2 className="section__title reveal-init">
        Pengalaman <span>Profesional</span>
      </h2>

      <div className="container grid max-w-4xl mx-auto gap-6 reveal-init">
        {experiences.map((item, index) => {
          const num = String(index + 1).padStart(2, '0');
          const hasImages = Boolean(item.images && item.images.length > 0);

          return (
            <article
              key={item.id || index}
              className="experience__card relative bg-[var(--container-color)] p-5 sm:p-7 rounded-[2rem] overflow-hidden"
            >
              <div className="relative z-[5]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="font-[var(--second-font)] font-semibold text-xl sm:text-2xl text-[var(--first-color)]">
                    {num}
                  </span>
                  <span className="px-3.5 py-1 rounded-full border border-[var(--first-color)]/50 text-xs text-white font-medium">
                    {item.is_current
                      ? `${item.start_date} — Sekarang`
                      : item.start_date === item.end_date
                        ? item.start_date
                        : item.end_date?.toLowerCase().includes('bulan')
                          ? `${item.start_date} (${item.end_date})`
                          : `${item.start_date} — ${item.end_date}`}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                  {item.role}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[var(--first-color)] mb-2.5">
                  {item.company} {item.location ? `• ${item.location}` : ''}
                </p>

                <p className="text-xs sm:text-sm text-[var(--text-color)] leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Galeri Dokumentasi Kompak & Informatif (3 Kolom Proporsional) */}
                {hasImages && (
                  <div className="mb-4 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90">
                        <i className="ri-camera-lens-line text-[var(--first-color)] text-sm" />
                        Dokumentasi Kegiatan ({item.images!.length} Foto)
                      </span>
                      <span className="text-[11px] text-[var(--text-color)]">
                        Klik foto untuk melihat ukuran penuh
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {item.images!.map((img, i) => {
                        const caption =
                          item.captions?.[i] || `Dokumentasi ${i + 1}`;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() =>
                              setModal({ open: true, exp: item, imgIdx: i })
                            }
                            className="group relative flex flex-col bg-black/40 border border-white/10 hover:border-[var(--first-color)]/60 rounded-2xl overflow-hidden text-left transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <div className="relative w-full h-[135px] sm:h-[125px] overflow-hidden bg-black/60">
                              <img
                                src={img}
                                alt={`${item.role} - ${caption}`}
                                style={{ objectPosition: getExpFocalPoint(img) }}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/75 text-white group-hover:bg-[var(--first-color)] group-hover:text-black grid place-items-center text-xs transition-colors">
                                <i className="ri-fullscreen-line" />
                              </span>
                              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/75 text-[10px] font-semibold text-[var(--first-color)]">
                                Foto {i + 1}
                              </span>
                            </div>

                            <div className="p-2.5">
                              <p className="text-[11px] text-white/90 font-medium leading-snug line-clamp-2">
                                {caption}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {item.technologies && item.technologies.length > 0 && (
                  <ul className="services__list pt-1">
                    {item.technologies.map((tech) => (
                      <li key={tech} className="services__item !text-xs !py-1 !px-3">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="blob-big -bottom-12 -right-12" />
            </article>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {modal.open && modal.exp && modal.exp.images && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
          onClick={() => setModal((p) => ({ ...p, open: false }))}
        >
          <div
            className="relative w-full max-w-4xl max-h-[94vh] bg-[var(--container-color)] border border-white/15 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10">
              <div className="min-w-0">
                <h4 className="font-semibold text-white text-sm sm:text-base truncate">
                  {modal.exp.role} — {modal.exp.company}
                </h4>
                {modal.exp.captions?.[modal.imgIdx] && (
                  <p className="text-xs text-[var(--first-color)] truncate mt-0.5">
                    {modal.exp.captions[modal.imgIdx]}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setModal((p) => ({ ...p, open: false }))}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--first-color)] hover:text-black text-white grid place-items-center transition-colors shrink-0"
                aria-label="Tutup"
              >
                <i className="ri-close-large-line" />
              </button>
            </div>

            <div className="lightbox-body">
              <img
                src={modal.exp.images[modal.imgIdx]}
                alt={modal.exp.role}
                className="lightbox-img"
              />
            </div>

            {modal.exp.images.length > 1 && (
              <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setModal((p) => ({
                      ...p,
                      imgIdx:
                        (p.imgIdx - 1 + p.exp!.images!.length) %
                        p.exp!.images!.length,
                    }))
                  }
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[var(--first-color)] hover:text-black text-xs font-semibold text-white transition-colors flex items-center gap-1"
                >
                  <i className="ri-arrow-left-s-line" />
                  <span>Sebelumnya</span>
                </button>

                <span className="text-xs text-white/70">
                  Foto {modal.imgIdx + 1} / {modal.exp.images.length}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setModal((p) => ({
                      ...p,
                      imgIdx: (p.imgIdx + 1) % p.exp!.images!.length,
                    }))
                  }
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[var(--first-color)] hover:text-black text-xs font-semibold text-white transition-colors flex items-center gap-1"
                >
                  <span>Selanjutnya</span>
                  <i className="ri-arrow-right-s-line" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
