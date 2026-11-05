'use client';

import React, { useState, useEffect } from 'react';
import { Experience } from '@/types';
import { playTactileClick } from '@/lib/sound';

interface ExperienceSectionProps {
  experiences: Experience[];
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
      if (e.key === 'ArrowRight' && modal.exp?.images) {
        setModal((p) => ({
          ...p,
          imgIdx: (p.imgIdx + 1) % (p.exp?.images?.length || 1),
        }));
      }
      if (e.key === 'ArrowLeft' && modal.exp?.images) {
        setModal((p) => ({
          ...p,
          imgIdx: (p.imgIdx - 1 + (p.exp?.images?.length || 1)) % (p.exp?.images?.length || 1),
        }));
      }
    };

    if (modal.open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modal.open, modal.exp?.images]);

  return (
    <section id="experience" className="py-20 sm:py-28 relative border-t border-zinc-800/80">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16 reveal-on-scroll">
          <div className="section-tag">
            <span>Rekam Jejak</span>
          </div>
          <h2 className="section-heading mb-4">
            Pengalaman Industri &amp; Pengabdian
          </h2>
          <p className="section-description">
            Keterlibatan nyata dalam membangun produk perangkat lunak, sistem operasional, 
            serta dedikasi transfer pengetahuan bagi generasi siswa teknologi.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-zinc-800 space-y-10">
          {experiences.map((item, index) => {
            const hasImages = Boolean(item.images && item.images.length > 0);

            return (
              <div
                key={item.id || index}
                className={`relative group ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              >
                {/* Clean Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-600 flex items-center justify-center group-hover:border-zinc-300 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-white transition-colors" />
                </div>

                {/* Experience Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 spotlight-card">
                  {/* Card Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider block mb-1">
                        {item.company} {item.location ? `• ${item.location}` : ''}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {item.role}
                      </h3>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
                      {item.is_current
                        ? `${item.start_date} — Sekarang`
                        : item.start_date === item.end_date
                        ? item.start_date
                        : item.end_date?.toLowerCase().includes('bulan')
                        ? `${item.start_date} (${item.end_date})`
                        : `${item.start_date} — ${item.end_date}`}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Documentation Photos Gallery if present */}
                  {hasImages && (
                    <div className="mb-5 pt-4 border-t border-zinc-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-zinc-300">
                          Dokumentasi Kegiatan ({item.images!.length} Foto)
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          Klik untuk memperbesar
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {item.images!.map((img, i) => {
                          const caption = item.captions?.[i] || `Dokumentasi ${i + 1}`;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setModal({ open: true, exp: item, imgIdx: i });
                                playTactileClick();
                              }}
                              className="group/img relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all text-left"
                            >
                              <img
                                src={img}
                                alt={caption}
                                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                                <span className="text-[11px] text-zinc-200 line-clamp-1">
                                  {caption}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Technologies Tags */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-zinc-800">
                      {item.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {modal.open && modal.exp && modal.exp.images && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModal((p) => ({ ...p, open: false }))}
        >
          <div
            className="relative max-w-3xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase">
                  {modal.exp.company}
                </span>
                <h4 className="text-base font-semibold text-white">
                  {modal.exp.captions?.[modal.imgIdx] || `Dokumentasi ${modal.imgIdx + 1}`}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setModal((p) => ({ ...p, open: false }))}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                aria-label="Tutup pratinjau foto"
              >
                <i className="ri-close-line" />
              </button>
            </div>

            {/* Main image */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={modal.exp.images[modal.imgIdx]}
                alt={modal.exp.captions?.[modal.imgIdx] || 'Dokumentasi'}
                className="w-full h-full object-contain"
              />

              {modal.exp.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setModal((p) => ({
                        ...p,
                        imgIdx: (p.imgIdx - 1 + (modal.exp?.images?.length || 1)) % (modal.exp?.images?.length || 1),
                      }));
                      playTactileClick();
                    }}
                    className="absolute left-3 w-9 h-9 rounded-full bg-zinc-900/80 border border-zinc-700 text-white flex items-center justify-center transition-colors"
                    aria-label="Foto Sebelumnya"
                  >
                    <i className="ri-arrow-left-s-line text-lg" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setModal((p) => ({
                        ...p,
                        imgIdx: (p.imgIdx + 1) % (modal.exp?.images?.length || 1),
                      }));
                      playTactileClick();
                    }}
                    className="absolute right-3 w-9 h-9 rounded-full bg-zinc-900/80 border border-zinc-700 text-white flex items-center justify-center transition-colors"
                    aria-label="Foto Selanjutnya"
                  >
                    <i className="ri-arrow-right-s-line text-lg" />
                  </button>
                </>
              )}
            </div>

            {/* Slide counter & thumbnails */}
            <div className="flex items-center justify-between pt-4 mt-2">
              <span className="text-xs font-mono text-zinc-400">
                {modal.imgIdx + 1} dari {modal.exp.images.length} foto
              </span>

              <div className="flex gap-1.5">
                {modal.exp.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setModal((p) => ({ ...p, imgIdx: idx }));
                      playTactileClick();
                    }}
                    className={`h-9 w-12 rounded-md overflow-hidden border transition-all ${
                      modal.imgIdx === idx
                        ? 'border-white'
                        : 'border-zinc-800 opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
