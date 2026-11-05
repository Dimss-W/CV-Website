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
    <section id="experience" className="py-20 sm:py-28 relative bg-[#06070a] overflow-hidden">
      {/* Background glow in Violet & Indigo */}
      <div className="glow-orb w-[500px] h-[500px] bg-violet-600/12 top-1/4 right-[-10%]" />
      <div className="glow-orb w-[450px] h-[450px] bg-indigo-600/10 bottom-10 left-[-10%]" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20 reveal-scale">
          <div className="section-tag">
            <i className="ri-briefcase-line text-violet-400" />
            <span>Rekam Jejak &amp; Pengabdian</span>
          </div>
          <h2 className="section-heading mb-4">
            Pengalaman <span className="gradient-text-violet">Profesional &amp; Industri</span>
          </h2>
          <p className="section-description">
            Keterlibatan nyata dalam membangun produk perangkat lunak berskala besar, 
            sistem korporasi, serta dedikasi transfer pengetahuan bagi generasi penerus teknologi.
          </p>
        </div>

        {/* Vertical Interactive Timeline with Directional Reveals */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-violet-500/20 space-y-10 sm:space-y-12">
          {experiences.map((item, index) => {
            const hasImages = Boolean(item.images && item.images.length > 0);
            const revealClass = index % 2 === 0 ? 'reveal-left' : 'reveal-right';

            return (
              <div key={item.id || index} className={`relative group ${revealClass}`}>
                {/* Glowing Node Marker in Electric Violet */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#06070a] border-2 border-violet-400 flex items-center justify-center group-hover:scale-125 group-hover:border-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.7)]">
                  <div className="w-2 h-2 rounded-full bg-violet-300" />
                </div>

                {/* Experience Card */}
                <div className="glass-panel glass-panel-hover p-6 sm:p-8">
                  {/* Card Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-mono font-semibold text-violet-400 tracking-wider uppercase block mb-1">
                        {item.company} {item.location ? `• ${item.location}` : ''}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">
                        {item.role}
                      </h3>
                    </div>

                    <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
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
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Documentation Photos Gallery if present */}
                  {hasImages && (
                    <div className="mb-6 pt-5 border-t border-white/8">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                          <i className="ri-camera-3-line text-violet-400 text-sm" />
                          Dokumentasi Pembelajaran ({item.images!.length} Foto)
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
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
                              className="group/img relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/10 hover:border-violet-400/60 transition-all text-left"
                            >
                              <img
                                src={img}
                                alt={caption}
                                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-2.5 opacity-90 group-hover/img:opacity-100 transition-opacity">
                                <span className="text-[11px] text-white/95 line-clamp-1 font-medium">
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
                    <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/8">
                      {item.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/8 text-xs font-mono text-slate-300"
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

      {/* High-Resolution Photo Lightbox Modal */}
      {modal.open && modal.exp && modal.exp.images && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModal((p) => ({ ...p, open: false }))}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0a0e17] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl modal-enter overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <span className="text-xs font-mono text-violet-400 uppercase">
                  {modal.exp.company}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {modal.exp.captions?.[modal.imgIdx] || `Dokumentasi ${modal.imgIdx + 1}`}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setModal((p) => ({ ...p, open: false }))}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg transition-colors"
                aria-label="Tutup pratinjau foto"
              >
                <i className="ri-close-line" />
              </button>
            </div>

            {/* Main high-res image */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/80 flex items-center justify-center">
              <img
                src={modal.exp.images[modal.imgIdx]}
                alt={modal.exp.captions?.[modal.imgIdx] || 'Dokumentasi'}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next buttons */}
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
                    className="absolute left-3 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all"
                    aria-label="Foto Sebelumnya"
                  >
                    <i className="ri-arrow-left-s-line text-xl" />
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
                    className="absolute right-3 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all"
                    aria-label="Foto Selanjutnya"
                  >
                    <i className="ri-arrow-right-s-line text-xl" />
                  </button>
                </>
              )}
            </div>

            {/* Slide counter & thumbnails */}
            <div className="flex items-center justify-between pt-4 mt-2">
              <span className="text-xs font-mono text-slate-400">
                {modal.imgIdx + 1} dari {modal.exp.images.length} foto
              </span>

              <div className="flex gap-2">
                {modal.exp.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setModal((p) => ({ ...p, imgIdx: idx }));
                      playTactileClick();
                    }}
                    className={`h-10 w-14 rounded-lg overflow-hidden border-2 transition-all ${
                      modal.imgIdx === idx
                        ? 'border-violet-400 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-100'
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
