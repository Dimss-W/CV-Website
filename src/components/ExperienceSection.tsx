'use client';

import React, { useState, useEffect } from 'react';
import { Experience } from '@/types';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Camera, 
  Sparkles 
} from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  // Track active image index for each experience
  const [activeImageIndices, setActiveImageIndices] = useState<{ [key: number]: number }>({
    2: 0,
    3: 0,
  });

  // Modal lightbox state for full-screen photo viewing
  const [lightboxData, setLightboxData] = useState<{
    images: string[];
    captions?: string[];
    currentIndex: number;
    title: string;
  } | null>(null);

  // Auto-slide for experiences with multiple images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndices((prev) => {
        const nextState = { ...prev };
        experiences.forEach((exp, idx) => {
          if (exp.images && exp.images.length > 1) {
            const current = prev[idx] ?? 0;
            nextState[idx] = (current + 1) % exp.images.length;
          }
        });
        return nextState;
      });
    }, 5500);

    return () => clearInterval(interval);
  }, [experiences]);

  const openLightbox = (images: string[], captions: string[] | undefined, startIndex: number, title: string) => {
    setLightboxData({
      images,
      captions,
      currentIndex: startIndex,
      title,
    });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxData(null);
    document.body.style.overflow = 'unset';
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxData) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') {
        setLightboxData((prev) =>
          prev ? { ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length } : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxData((prev) =>
          prev
            ? {
                ...prev,
                currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
              }
            : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxData]);

  return (
    <section id="experience" className="py-24 bg-slate-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-init">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
            <Briefcase size={14} />
            <span>Karier & Perjalanan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-slate-100 tracking-tight mb-4">
            Pengalaman <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Profesional</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Jejak langkah nyata dalam rekayasa perangkat lunak, mentoring teknis generasi muda, dan kepemimpinan proyek kompetisi berskala industri.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Spine Line */}
          <div className="absolute top-4 bottom-4 left-4 sm:left-5 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-400 to-slate-900 z-0" />

          <div className="flex flex-col gap-8 sm:gap-10">
            {experiences.map((item, index) => {
              const delayClass = index === 0 ? '' : index === 1 ? 'reveal-delay-1' : 'reveal-delay-2';
              const hasImages = item.images && item.images.length > 0;
              const currentImgIdx = activeImageIndices[index] ?? 0;

              return (
                <div
                  key={item.id || index}
                  className={`flex gap-3.5 sm:gap-6 lg:gap-8 relative z-10 reveal-init ${delayClass}`}
                >
                  {/* Timeline Icon Node */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 mt-1 transition-transform ${
                      item.is_current
                        ? 'bg-gradient-to-tr from-emerald-400 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 ring-4 ring-slate-950'
                        : 'bg-slate-900 border border-slate-700 text-emerald-400 ring-4 ring-slate-950'
                    }`}
                  >
                    <Briefcase size={15} className="sm:w-[17px] sm:h-[17px]" />
                  </div>

                  {/* Experience Card */}
                  <div className="glass-card p-4 sm:p-7 flex-1 border border-slate-800/90 bg-slate-900/60 shadow-lg shadow-black/30 rounded-2xl">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
                          {item.role}
                        </h3>
                        <div className="text-sm sm:text-base font-semibold text-sky-400 mt-0.5">
                          {item.company}
                        </div>
                      </div>

                      {/* Date & Status Pill */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60 font-medium">
                          <Calendar size={13} />
                          <span>
                            {item.start_date} – {item.is_current ? 'Sekarang' : item.end_date}
                          </span>
                        </div>

                        {item.is_current && (
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/20">
                            Aktif
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    {item.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                        <MapPin size={13} />
                        <span>{item.location}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Documentation Carousel if images exist */}
                    {hasImages && item.images && (
                      <div className="mb-6 rounded-xl border border-slate-800 bg-slate-950/70 p-3 sm:p-4 shadow-inner">
                        <div className="flex items-center justify-between mb-2 px-1">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                            <Camera size={13} />
                            <span>Dokumentasi Kegiatan</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {currentImgIdx + 1} / {item.images.length}
                          </span>
                        </div>

                        {/* Interactive Photo Frame: Uniform Landscape Ratio with Silky Smooth Cross-fade */}
                        <div
                          onClick={() =>
                            openLightbox(item.images!, item.captions, currentImgIdx, item.role)
                          }
                          className="relative w-full aspect-[16/10] sm:h-72 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 group cursor-pointer flex items-center justify-center"
                        >
                          {item.images.map((imgUrl, imgIdx) => (
                            <div
                              key={imgIdx}
                              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                                imgIdx === currentImgIdx
                                  ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                                  : 'opacity-0 scale-[0.97] z-0 pointer-events-none'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={item.captions ? item.captions[imgIdx] : item.role}
                                className="w-full h-full object-cover object-center block drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          ))}

                          {/* Hover Zoom Overlay */}
                          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-20 pointer-events-none">
                            <div className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-100 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                              <Maximize2 size={13} className="text-emerald-400" />
                              <span>Perbesar Foto</span>
                            </div>
                          </div>

                          {/* Left / Right Nav Arrows */}
                          {item.images.length > 1 && (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImageIndices((prev) => ({
                                    ...prev,
                                    [index]: (currentImgIdx - 1 + item.images!.length) % item.images!.length,
                                  }));
                                }}
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/90 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 flex items-center justify-center transition-all duration-200 z-30 shadow-md"
                                aria-label="Foto Sebelumnya"
                              >
                                <ChevronLeft size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImageIndices((prev) => ({
                                    ...prev,
                                    [index]: (currentImgIdx + 1) % item.images!.length,
                                  }));
                                }}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/90 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 flex items-center justify-center transition-all duration-200 z-30 shadow-md"
                                aria-label="Foto Berikutnya"
                              >
                                <ChevronRight size={16} />
                              </button>
                            </>
                          )}
                        </div>

                        {/* Caption Below Frame */}
                        {item.captions && item.captions[currentImgIdx] && (
                          <p className="text-xs text-slate-300 mt-2.5 px-1 leading-snug text-center italic">
                            {item.captions[currentImgIdx]}
                          </p>
                        )}

                        {/* Thumbnail indicator dots */}
                        {item.images.length > 1 && (
                          <div className="flex items-center justify-center gap-2 mt-3">
                            {item.images.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                type="button"
                                onClick={() =>
                                  setActiveImageIndices((prev) => ({ ...prev, [index]: dotIdx }))
                                }
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  currentImgIdx === dotIdx
                                    ? 'w-6 bg-emerald-400'
                                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                                }`}
                                aria-label={`Pilih foto ${dotIdx + 1}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Technologies tags */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 rounded-md bg-slate-800/70 border border-slate-700/60 text-slate-300 font-medium"
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
      </div>

      {/* Fullscreen Lightbox Modal for Experience Photos */}
      {lightboxData && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-syne text-slate-100 leading-snug">
                  {lightboxData.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Foto {lightboxData.currentIndex + 1} dari {lightboxData.images.length}
                </p>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700/60 flex items-center justify-center transition-colors shrink-0"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950/90">
              <img
                src={lightboxData.images[lightboxData.currentIndex]}
                alt="Dokumentasi Fullscreen"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg border border-slate-800 shadow-2xl"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  setLightboxData((prev) =>
                    prev
                      ? {
                          ...prev,
                          currentIndex:
                            (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
                        }
                      : null
                  )
                }
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <ChevronLeft size={16} />
                <span>Sebelumnya</span>
              </button>

              {lightboxData.captions && lightboxData.captions[lightboxData.currentIndex] && (
                <p className="text-xs text-slate-300 text-center italic max-w-lg px-2">
                  {lightboxData.captions[lightboxData.currentIndex]}
                </p>
              )}

              <button
                type="button"
                onClick={() =>
                  setLightboxData((prev) =>
                    prev
                      ? {
                          ...prev,
                          currentIndex: (prev.currentIndex + 1) % prev.images.length,
                        }
                      : null
                  )
                }
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <span>Berikutnya</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
