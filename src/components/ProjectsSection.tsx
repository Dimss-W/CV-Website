'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Project } from '@/types';

interface ProjectsSectionProps {
  projects: Project[];
}

function WorkCardSlider({
  images,
  captions,
  title,
  onImageClick,
}: {
  images: string[];
  captions?: string[];
  title: string;
  onImageClick: (img: string, caption?: string) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length, paused]);

  const currentCaption = captions?.[idx] || `${idx + 1} / ${images.length}`;

  return (
    <div
      className="work__link group relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={() => onImageClick(images[idx], currentCaption)}
    >
      {/* Silky-smooth GPU Horizontal Slide Track */}
      <div
        className="flex w-full h-full will-change-transform"
        style={{
          transform: `translate3d(-${idx * 100}%, 0, 0)`,
          transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative w-full h-full shrink-0 overflow-hidden bg-black/40"
          >
            <img
              src={img}
              alt={`${title} - ${i + 1}`}
              style={{
                objectPosition: img.includes('caltrack')
                  ? '50% 32%'
                  : '50% 50%',
              }}
              className="work__img w-full h-full object-cover transition-transform duration-700 ease-out"
            />
          </div>
        ))}
      </div>

      {/* Bedimcode Bianca Signature Hover Diagonal Arrow */}
      <div className="work__arrow" title="Lihat Ukuran Penuh">
        <i className="ri-arrow-right-up-line" />
      </div>

      {/* Multi-slide indicators & caption pill */}
      {images.length > 1 && (
        <div
          className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] text-white/90 truncate max-w-[68%] transition-all duration-300">
            {currentCaption}
          </span>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/75 backdrop-blur-md pointer-events-auto">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                aria-label={`Slide ${dotIdx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIdx(dotIdx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  idx === dotIdx
                    ? 'w-5 bg-[var(--first-color)] shadow-[0_0_8px_var(--first-color)]'
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

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    project: Project | null;
    imgIdx: number;
  }>({ open: false, project: null, imgIdx: 0 });

  const scrollToCard = (index: number) => {
    setActiveSlide(index);
    if (!trackRef.current) return;
    const card = trackRef.current.children[index] as HTMLElement | undefined;
    if (card) {
      trackRef.current.scrollTo({
        left: card.offsetLeft - 16,
        behavior: 'smooth',
      });
    }
  };

  const handleTrackScroll = () => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const cardWidth =
      (trackRef.current.children[0] as HTMLElement)?.offsetWidth || 320;
    const index = Math.round(scrollLeft / (cardWidth + 20));
    if (index >= 0 && index < projects.length) {
      setActiveSlide(index);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox((p) => ({ ...p, open: false }));
    };
    if (lightbox.open) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [lightbox.open]);

  return (
    <section className="work section" id="work">
      <h2 className="section__title reveal-init">
        Karya &amp; <span>Proyek Saya</span>
      </h2>

      <div className="work__container container reveal-init">
        {/* Mobile: Swipeable Carousel | Web/Desktop (md+): 2 & 3 Column Equal-Size Grid */}
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="work__grid scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => {
            const num = String(index + 1).padStart(2, '0');
            const imgs =
              project.images && project.images.length > 0
                ? project.images
                : project.image_url
                ? [project.image_url]
                : [];

            return (
              <article
                key={project.id || project.title}
                className="work__card snap-start shrink-0 w-[85vw] max-w-[340px] md:w-full md:max-w-none"
              >
                <WorkCardSlider
                  images={imgs}
                  captions={project.captions}
                  title={project.title}
                  onImageClick={(clickedImg) => {
                    const foundIdx = Math.max(0, imgs.indexOf(clickedImg));
                    setLightbox({ open: true, project, imgIdx: foundIdx });
                  }}
                />

                <div className="work__data">
                  <span className="work__number">{num}</span>
                  <h3 className="work__name" title={project.title}>
                    {project.title}
                  </h3>
                  <p className="work__description" title={project.description}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-0.5 rounded-full border border-[var(--first-color)]/40 text-white/90 font-medium whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10 mt-auto min-h-[44px]">
                    {project.demo_url &&
                    !project.demo_url.includes('github.com') ? (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--first-color)] text-[var(--black-color)] text-xs font-semibold hover:brightness-110 transition-all shadow-sm shrink-0"
                      >
                        <i className="ri-global-line text-sm" />
                        <span>Buka Website</span>
                        <i className="ri-arrow-right-up-line text-sm" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-color)]">
                        <i className="ri-verified-badge-line text-[var(--first-color)] text-sm" />
                        <span>Proyek Terverifikasi</span>
                      </span>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 hover:border-[var(--first-color)] text-xs font-semibold text-white hover:text-[var(--first-color)] transition-colors shrink-0 ml-auto"
                      >
                        <i className="ri-github-line text-sm" />
                        <span>Kode</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="blob-big" />
              </article>
            );
          })}
        </div>

        {/* Mobile Carousel Pagination Dots (Hidden on Desktop Grid) */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Pilih proyek ${i + 1}`}
              onClick={() => scrollToCard(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === i
                  ? 'w-6 bg-[var(--first-color)]'
                  : 'w-2 bg-[var(--first-color)]/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Uncropped Lightbox Modal */}
      {lightbox.open && lightbox.project && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
          onClick={() => setLightbox((p) => ({ ...p, open: false }))}
        >
          <div
            className="relative w-full max-w-5xl max-h-[94vh] bg-[var(--container-color)] border border-white/15 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10">
              <div className="min-w-0">
                <h4 className="font-semibold text-white text-sm sm:text-base truncate">
                  {lightbox.project.title}
                </h4>
                {lightbox.project.captions?.[lightbox.imgIdx] && (
                  <p className="text-xs text-[var(--first-color)] truncate mt-0.5">
                    {lightbox.project.captions[lightbox.imgIdx]}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {lightbox.project.demo_url &&
                  !lightbox.project.demo_url.includes('github.com') && (
                    <a
                      href={lightbox.project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--first-color)] text-[var(--black-color)] text-xs font-semibold hover:brightness-110 transition-all"
                    >
                      <i className="ri-global-line text-sm" />
                      <span>Buka Website</span>
                    </a>
                  )}

                <button
                  type="button"
                  onClick={() => setLightbox((p) => ({ ...p, open: false }))}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--first-color)] hover:text-black text-white grid place-items-center transition-colors shrink-0"
                  aria-label="Tutup"
                >
                  <i className="ri-close-large-line" />
                </button>
              </div>
            </div>

            <div className="lightbox-body">
              {(() => {
                const imgs =
                  lightbox.project.images && lightbox.project.images.length > 0
                    ? lightbox.project.images
                    : lightbox.project.image_url
                    ? [lightbox.project.image_url]
                    : [];
                return (
                  <img
                    src={imgs[lightbox.imgIdx]}
                    alt={lightbox.project.title}
                    className="lightbox-img"
                  />
                );
              })()}
            </div>

            {lightbox.project.images && lightbox.project.images.length > 1 && (
              <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setLightbox((p) => ({
                      ...p,
                      imgIdx:
                        (p.imgIdx - 1 + p.project!.images!.length) %
                        p.project!.images!.length,
                    }))
                  }
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[var(--first-color)] hover:text-black text-xs font-semibold text-white transition-colors flex items-center gap-1"
                >
                  <i className="ri-arrow-left-s-line" />
                  <span>Sebelumnya</span>
                </button>

                <span className="text-xs text-white/70">
                  Slide {lightbox.imgIdx + 1} / {lightbox.project.images.length}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setLightbox((p) => ({
                      ...p,
                      imgIdx: (p.imgIdx + 1) % p.project!.images!.length,
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
