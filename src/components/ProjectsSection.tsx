'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Project } from '@/types';
import { playTactileClick, playSoftPop } from '@/lib/sound';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState<{ [key: string]: number }>({});

  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const categories = [
    { id: 'all', label: 'Semua Proyek', icon: 'ri-apps-2-line' },
    { id: 'web', label: 'Web Platform', icon: 'ri-global-line' },
    { id: 'mobile', label: 'Mobile App', icon: 'ri-smartphone-line' },
    { id: 'data-ai', label: 'Data & BI', icon: 'ri-line-chart-line' },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      activeCategory === 'all'
        ? true
        : activeCategory === 'mobile'
        ? p.is_mobile || p.category === 'mobile'
        : activeCategory === 'data-ai'
        ? p.category === 'data-ai' || p.tags.some((t) => t.includes('Power BI') || t.includes('AI'))
        : p.category === 'web' || (!p.is_mobile && p.category !== 'data-ai');

    if (!matchesCat) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const getSlideIdx = (projTitle: string) => activeSlideIdx[projTitle] || 0;

  const setSlideIdx = (projTitle: string, idx: number) => {
    setActiveSlideIdx((prev) => ({ ...prev, [projTitle]: idx }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent, projTitle: string, totalSlides: number) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (Math.abs(diff) > 40) {
      const current = getSlideIdx(projTitle);
      if (diff > 0) {
        setSlideIdx(projTitle, (current + 1) % totalSlides);
        playTactileClick();
      } else {
        setSlideIdx(projTitle, (current - 1 + totalSlides) % totalSlides);
        playTactileClick();
      }
    }
    touchStartRef.current = null;
  };

  return (
    <section id="projects" className="py-20 sm:py-28 relative border-t border-zinc-800/80">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14 reveal-on-scroll">
          <div className="section-tag">
            <span>Portofolio</span>
          </div>
          <h2 className="section-heading mb-4">
            Produk Digital &amp; Solusi Rekayasa
          </h2>
          <p className="section-description">
            Koleksi aplikasi web enterprise, aplikasi mobile terintegrasi, dan dashboard analitik
            data yang dirancang dengan arsitektur tangguh dan digunakan secara nyata.
          </p>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 w-full max-w-2xl">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
              <input
                type="text"
                placeholder="Cari proyek / teknologi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:border-zinc-600 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <i className="ri-close-line text-xs" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-full bg-zinc-900 border border-zinc-800">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      playSoftPop();
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                    }`}
                  >
                    <i className={`${cat.icon} text-sm`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-zinc-500 mt-3 font-mono">
            Menampilkan {filteredProjects.length} dari {projects.length} proyek
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
          {filteredProjects.map((project, idx) => {
            const images = project.images && project.images.length > 0 
              ? project.images 
              : project.image_url 
                ? [project.image_url] 
                : ['/projects/otokeep-landing.png'];

            const currentSlide = getSlideIdx(project.title);
            const currentCaption = project.captions?.[currentSlide] || `${currentSlide + 1} / ${images.length}`;

            return (
              <article
                key={project.id || project.title || idx}
                className="flex flex-col justify-between rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden group h-full reveal-card spotlight-card"
                style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
              >
                {/* Media Showcase */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 border-b border-zinc-800 select-none"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, project.title, images.length)}
                >
                  <div
                    className="flex w-full h-full transition-transform duration-500 ease-out"
                    style={{
                      transform: `translate3d(-${currentSlide * 100}%, 0, 0)`,
                    }}
                  >
                    {images.map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="relative w-full h-full shrink-0 overflow-hidden cursor-pointer"
                        onClick={() => {
                          setSelectedProject(project);
                          playTactileClick();
                        }}
                      >
                        <img
                          src={img}
                          alt={`${project.title} - ${imgIdx + 1}`}
                          className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-20 pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700 text-[10px] font-mono text-zinc-300">
                      {project.is_mobile ? 'Mobile App' : project.category === 'data-ai' ? 'Data & BI' : 'Web Platform'}
                    </span>
                  </div>

                  {/* Slide controls */}
                  {images.length > 1 && (
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur-md text-[10px] text-zinc-300 truncate max-w-[65%]">
                        {currentCaption}
                      </span>

                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md pointer-events-auto">
                        {images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSlideIdx(project.title, dotIdx);
                              playTactileClick();
                            }}
                            aria-label={`Slide ${dotIdx + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-200 ${
                              currentSlide === dotIdx
                                ? 'w-3.5 bg-white'
                                : 'w-1.5 bg-zinc-600 hover:bg-zinc-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expand button */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(project);
                      playTactileClick();
                    }}
                    className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-zinc-950/80 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-opacity opacity-0 group-hover:opacity-100"
                    title="Buka Pratinjau Penuh"
                    aria-label="Lihat detail lengkap proyek"
                  >
                    <i className="ri-fullscreen-line text-xs" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {project.technical_highlight && (
                      <div className="mb-4 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 leading-tight">
                        {project.technical_highlight}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-800 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProject(project);
                          playTactileClick();
                        }}
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                      >
                        <span>Detail Studi Kasus</span>
                        <i className="ri-arrow-right-line text-xs" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={playTactileClick}
                            className="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            title="Repositori GitHub"
                            aria-label={`GitHub repositori ${project.title}`}
                          >
                            <i className="ri-github-fill text-sm" />
                          </a>
                        )}

                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={playTactileClick}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 hover:text-white transition-colors"
                            title="Buka Demo Langsung"
                          >
                            <span>Demo</span>
                            <i className="ri-external-link-line text-xs" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-2xl my-auto overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800 shrink-0">
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  {selectedProject.is_mobile ? 'Aplikasi Mobile' : selectedProject.category === 'data-ai' ? 'Sistem Data & BI' : 'Aplikasi Web'}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors shrink-0"
                aria-label="Tutup jendela studi kasus"
              >
                <i className="ri-close-line" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto space-y-5 py-4 pr-1">
              {/* Media Carousel */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="space-y-3">
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-zinc-800">
                    <img
                      src={selectedProject.images[getSlideIdx(selectedProject.title)] || selectedProject.images[0]}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Thumbnail Row */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {selectedProject.images.map((img, thumbIdx) => {
                        const isCurrent = getSlideIdx(selectedProject.title) === thumbIdx;
                        return (
                          <button
                            key={thumbIdx}
                            type="button"
                            onClick={() => {
                              setSlideIdx(selectedProject.title, thumbIdx);
                              playTactileClick();
                            }}
                            className={`relative h-12 w-18 shrink-0 rounded-lg overflow-hidden border transition-all ${
                              isCurrent ? 'border-white' : 'border-zinc-800 opacity-50 hover:opacity-100'
                            }`}
                          >
                            <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Description & In-Depth Details */}
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-400 mb-1">
                    Ringkasan Proyek
                  </h4>
                  <p className="text-zinc-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.details && (
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <h4 className="text-xs font-mono uppercase text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <i className="ri-settings-4-line text-sm" />
                      <span>Arsitektur &amp; Fitur</span>
                    </h4>
                    <p className="text-zinc-300 leading-relaxed">
                      {selectedProject.details}
                    </p>
                  </div>
                )}

                {selectedProject.technical_highlight && (
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <h4 className="text-xs font-mono uppercase text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <i className="ri-flashlight-line text-sm" />
                      <span>Sorotan Teknis</span>
                    </h4>
                    <p className="text-zinc-300 leading-relaxed">
                      {selectedProject.technical_highlight}
                    </p>
                  </div>
                )}
              </div>

              {/* Technologies Used */}
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2">
                  Teknologi &amp; Framework
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-zinc-500 font-mono">
                Portofolio Dimas Wijanarko
              </span>

              <div className="flex items-center gap-2">
                {selectedProject.github_url && (
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playTactileClick}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-xs font-medium transition-colors"
                  >
                    <i className="ri-github-fill text-sm" />
                    <span>Lihat di GitHub</span>
                  </a>
                )}

                {selectedProject.demo_url && (
                  <a
                    href={selectedProject.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playTactileClick}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors"
                  >
                    <span>Buka Aplikasi</span>
                    <i className="ri-external-link-line text-xs" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
