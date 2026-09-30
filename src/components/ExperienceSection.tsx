'use client';

import React, { useState, useEffect } from 'react';
import { Experience } from '@/types';

interface ExperienceSectionProps {
  experiences: Experience[];
}

function ExperienceGallery({
  images,
  captions,
  title,
  onOpenModal,
}: {
  images: string[];
  captions?: string[];
  title: string;
  onOpenModal: (imgIdx: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [images.length, paused]);

  const currentCaption = captions?.[idx] || `${idx + 1} / ${images.length}`;

  return (
    <div
      className="work__link !h-[220px] sm:!h-[285px] mb-5 group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={() => onOpenModal(idx)}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${title} - ${i + 1}`}
          className={`work__img absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${
            i === idx ? 'opacity-100 scale-100 z-[2]' : 'opacity-0 scale-105 z-[1] pointer-events-none'
          }`}
        />
      ))}

      <div className="work__arrow" title="Lihat Ukuran Penuh">
        <i className="ri-arrow-right-up-line" />
      </div>

      {images.length > 1 && (
        <div
          className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] text-white/90 truncate max-w-[70%]">
            {currentCaption}
          </span>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/75 backdrop-blur-md pointer-events-auto">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                aria-label={`Foto ${dotIdx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx(dotIdx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === dotIdx
                    ? 'w-4 bg-[var(--first-color)]'
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
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
              className="relative bg-[var(--container-color)] p-6 sm:p-8 rounded-[2rem] overflow-hidden"
            >
              {hasImages && (
                <ExperienceGallery
                  images={item.images!}
                  captions={item.captions}
                  title={`${item.role} - ${item.company}`}
                  onOpenModal={(imgIdx) =>
                    setModal({ open: true, exp: item, imgIdx })
                  }
                />
              )}

              <div className="relative z-[5]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-[var(--second-font)] font-semibold text-2xl sm:text-3xl text-[var(--first-color)]">
                    {num}
                  </span>
                  <span className="px-3.5 py-1 rounded-full border border-[var(--first-color)]/50 text-xs text-white font-medium">
                    {item.start_date} — {item.is_current ? 'Sekarang' : item.end_date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1">
                  {item.role}
                </h3>
                <p className="text-sm font-medium text-[var(--first-color)] mb-3">
                  {item.company} {item.location ? `• ${item.location}` : ''}
                </p>

                <p className="text-sm text-[var(--text-color)] leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.technologies && item.technologies.length > 0 && (
                  <ul className="services__list">
                    {item.technologies.map((tech) => (
                      <li key={tech} className="services__item text-xs">
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
