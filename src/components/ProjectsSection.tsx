'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Project } from '@/types';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState<{ [key: string]: number }>({});

  // Keyboard navigation for modal
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
    { id: 'web', label: 'Web Enterprise', icon: 'ri-global-line' },
    { id: 'mobile', label: 'Mobile App', icon: 'ri-smartphone-line' },
    { id: 'data-ai', label: 'Data & AI', icon: 'ri-brain-line' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'mobile') return p.is_mobile || p.category === 'mobile';
    if (activeCategory === 'data-ai') return p.category === 'data-ai' || p.tags.some(t => t.includes('Power BI') || t.includes('AI'));
    if (activeCategory === 'web') return p.category === 'web' || (!p.is_mobile && p.category !== 'data-ai');
    return true;
  });

  const getSlideIdx = (projTitle: string) => activeSlideIdx[projTitle] || 0;

  const setSlideIdx = (projTitle: string, idx: number) => {
    setActiveSlideIdx((prev) => ({ ...prev, [projTitle]: idx }));
  };

  return (
    <section id="projects" className="py-20 sm:py-28 relative bg-[#05070b] overflow-hidden">
      {/* Background radial glows */}
      <div className="glow-orb w-[500px] h-[500px] bg-cyan-500/10 top-20 left-[-15%]" />
      <div className="glow-orb w-[600px] h-[600px] bg-indigo-500/10 bottom-20 right-[-15%]" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="section-tag">
            <i className="ri-code-s-slash-line text-cyan-400" />
            <span>Karya &amp; Rekayasa Nyata</span>
          </div>
          <h2 className="section-heading mb-4">
            Portofolio <span className="gradient-text-cyan">Produk &amp; Solusi Digital</span>
          </h2>
          <p className="section-description">
            Koleksi aplikasi web enterprise, aplikasi mobile terintegrasi, dan dashboard analitik
            data yang dirancang dengan arsitektur tangguh dan digunakan secara nyata.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-full bg-white/[0.04] border border-white/8 backdrop-blur-md">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className={`${cat.icon} text-sm`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
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
                className="spotlight-card flex flex-col justify-between group"
              >
                {/* Media Showcase / Carousel */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60 border-b border-white/8">
                  {/* Image Track with smooth GPU sliding */}
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
                        onClick={() => setSelectedProject(project)}
                      >
                        <img
                          src={img}
                          alt={`${project.title} - ${imgIdx + 1}`}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-20 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
                      {project.is_mobile ? 'Mobile App' : project.category === 'data-ai' ? 'Data & AI' : 'Web App'}
                    </span>
                  </div>

                  {/* Slide controls & indicators */}
                  {images.length > 1 && (
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] text-white/90 truncate max-w-[65%]">
                        {currentCaption}
                      </span>

                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/80 backdrop-blur-md pointer-events-auto">
                        {images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSlideIdx(project.title, dotIdx);
                            }}
                            aria-label={`Slide ${dotIdx + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              currentSlide === dotIdx
                                ? 'w-4 bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                                : 'w-1.5 bg-white/40 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Click to expand overlay trigger */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-cyan-300 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                    title="Buka Pratinjau Penuh"
                    aria-label="Lihat detail lengkap proyek"
                  >
                    <i className="ri-fullscreen-line text-sm" />
                  </button>
                </div>

                {/* Card Body Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech highlight chip if present */}
                    {project.technical_highlight && (
                      <div className="mb-4 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2">
                        <i className="ri-flashlight-line text-amber-400 text-xs shrink-0 mt-0.5" />
                        <span className="text-[11px] text-slate-300 leading-tight">
                          {project.technical_highlight}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/8 text-[11px] font-mono text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-slate-500 font-mono">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/8 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Studi Kasus</span>
                        <i className="ri-arrow-right-up-line text-sm" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                            title="Repositori GitHub"
                            aria-label={`GitHub repositori ${project.title}`}
                          >
                            <i className="ri-github-fill text-base" />
                          </a>
                        )}

                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-xs font-semibold text-cyan-300 transition-colors"
                            title="Buka Demo Langsung"
                          >
                            <span>Live Demo</span>
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

      {/* Comprehensive Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div
            className="relative w-full max-w-4xl bg-[#090d16] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl modal-enter my-auto overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  <span>{selectedProject.is_mobile ? 'Aplikasi Mobile' : selectedProject.category === 'data-ai' ? 'Sistem Data & AI' : 'Web Aplikasi'}</span>
                  <span>•</span>
                  <span>Dimas Wijanarko</span>
                </div>
                <h3 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white text-lg transition-colors shrink-0"
                aria-label="Tutup jendela studi kasus"
              >
                <i className="ri-close-line" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto space-y-6 py-4 pr-1">
              {/* Media Gallery Carousel */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="space-y-3">
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/80 border border-white/10">
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
                            onClick={() => setSlideIdx(selectedProject.title, thumbIdx)}
                            className={`relative h-16 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                              isCurrent ? 'border-cyan-400 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
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
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                    Ringkasan Proyek
                  </h4>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.details && (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8">
                    <h4 className="text-xs font-mono uppercase text-cyan-300 tracking-wider mb-2 flex items-center gap-2">
                      <i className="ri-settings-4-line text-sm" />
                      <span>Arsitektur &amp; Fitur Unggulan</span>
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedProject.details}
                    </p>
                  </div>
                )}

                {selectedProject.technical_highlight && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                    <h4 className="text-xs font-mono uppercase text-amber-300 tracking-wider mb-1.5 flex items-center gap-2">
                      <i className="ri-flashlight-fill text-sm" />
                      <span>Sorotan Teknis Khusus</span>
                    </h4>
                    <p className="text-sm text-amber-100/90 leading-relaxed">
                      {selectedProject.technical_highlight}
                    </p>
                  </div>
                )}
              </div>

              {/* Technologies Used */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2.5">
                  Teknologi &amp; Framework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-xs font-mono text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500 font-mono">
                Portofolio Produksi Dimas Wijanarko
              </span>

              <div className="flex items-center gap-3">
                {selectedProject.github_url && (
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    <i className="ri-github-fill text-base" />
                    <span>Lihat Kode (GitHub)</span>
                  </a>
                )}

                {selectedProject.demo_url && (
                  <a
                    href={selectedProject.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-semibold hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all"
                  >
                    <span>Buka Aplikasi Langsung</span>
                    <i className="ri-external-link-line text-sm" />
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
