'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Project } from '@/types';
import { ExternalLink, Star, Code2, ArrowUpRight, FolderGit2, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectsSectionProps {
  projects: Project[];
}

function ProjectImageSlider({
  images,
  captions,
  title,
  isMobile,
  onImageClick,
}: {
  images: string[];
  captions?: string[];
  title: string;
  isMobile?: boolean;
  onImageClick?: (img: string, caption?: string, isMobile?: boolean) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide effect every 6 seconds when not hovered (calm, comfortable to read)
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const currentCaption = captions && captions[currentIndex] ? captions[currentIndex] : `${currentIndex + 1} / ${images.length}`;

  return (
    <div
      className="relative w-full h-full overflow-hidden group/slider select-none bg-slate-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sliding Carousel Track with Ultra-Smooth Cubic Easing */}
      <div
        className="flex w-full h-full transition-transform duration-700 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={`w-full h-full shrink-0 relative cursor-pointer flex items-center justify-center overflow-hidden bg-slate-950 ${
              isMobile ? 'py-3 px-4' : 'p-1'
            }`}
            onClick={() => onImageClick?.(img, captions?.[i], isMobile)}
            title="Klik untuk melihat layar penuh (Fullscreen)"
          >
            {isMobile ? (
              <>
                {/* Soft ambient colored glow behind mobile screen */}
                <img
                  src={img}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-125 pointer-events-none select-none"
                />

                {/* Mobile Phone Mockup Screen - Tall, uncropped & clearly readable */}
                <div className="relative z-10 h-full max-h-[96%] flex items-center justify-center">
                  <img
                    src={img}
                    alt={`${title} screenshot ${i + 1}`}
                    className="h-full w-auto max-h-[350px] object-contain rounded-2xl drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] border border-slate-700/80 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </>
            ) : (
              /* Full Uncropped Desktop Screenshot with Ambient Backdrop */
              <div className="relative w-full h-full flex items-center justify-center p-2">
                <img
                  src={img}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none select-none"
                />
                <img
                  src={img}
                  alt={`${title} screenshot ${i + 1}`}
                  className="relative z-10 w-full h-full max-h-full object-contain rounded-lg drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Top Right Fullscreen Button */}
      <button
        type="button"
        onClick={() => onImageClick?.(images[currentIndex], currentCaption, isMobile)}
        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-slate-950/85 hover:bg-emerald-500 hover:text-slate-950 border border-slate-700/80 text-slate-300 flex items-center justify-center transition-all duration-200 shadow-md opacity-80 group-hover/slider:opacity-100"
        title="Klik untuk layar penuh"
      >
        <Maximize2 size={13} />
      </button>

      {/* Navigation Controls (Visible on hover or touch) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/90 hover:bg-emerald-500 hover:text-slate-950 border border-slate-700/80 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-200 z-10 shadow-lg"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/90 hover:bg-emerald-500 hover:text-slate-950 border border-slate-700/80 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-200 z-10 shadow-lg"
          >
            <ChevronRight size={16} />
          </button>

          {/* Bottom Bar: Caption & Slide Progress Dots */}
          <div className="absolute bottom-2.5 left-0 right-0 px-3 flex items-center justify-between pointer-events-none z-10">
            {/* Caption pill */}
            <span className="pointer-events-auto px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-[10px] text-slate-200 font-medium truncate max-w-[70%] shadow-md">
              {currentCaption}
            </span>

            {/* Slide Indicators */}
            <div className="pointer-events-auto flex items-center gap-1.5 ml-auto bg-slate-950/85 backdrop-blur-md px-2 py-1 rounded-full border border-slate-800 shadow-md">
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(dotIdx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === dotIdx
                      ? 'w-5 bg-emerald-400 shadow-sm shadow-emerald-400/60'
                      : 'w-1.5 bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpenPreview,
}: {
  project: Project;
  index: number;
  onOpenPreview: (img: string, title: string, caption?: string, isMobile?: boolean) => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const isMobile = Boolean(project.is_mobile || project.tags.some((t) => ['Flutter', 'Dart', 'Mobile'].includes(t)));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
      boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.85), 0 0 28px rgba(16, 185, 129, 0.22)',
      borderColor: 'rgba(16, 185, 129, 0.45)',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
    });
  };

  const formattedNumber = String(index + 1).padStart(2, '0');
  const delayClass = index % 3 === 0 ? '' : index % 3 === 1 ? 'reveal-delay-1' : 'reveal-delay-2';

  const hasMultipleImages = Boolean(project.images && project.images.length > 1);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card flex flex-col h-full rounded-2xl border border-slate-800/90 bg-slate-900/60 transition-all duration-300 ease-out group reveal-init ${delayClass}`}
      style={tiltStyle}
    >
      {/* Thumbnail Banner with Number Overlay & Auto-Slider (Uniform Landscape Ratio) */}
      <div
        className="w-full relative overflow-hidden bg-slate-950 rounded-t-2xl flex items-center justify-center border-b border-slate-800/80 h-56 sm:h-64"
      >
        {project.images && project.images.length > 0 ? (
          <ProjectImageSlider
            images={project.images}
            captions={project.captions}
            title={project.title}
            isMobile={isMobile}
            onImageClick={(img, caption, mob) => onOpenPreview(img, project.title, caption, mob)}
          />
        ) : project.image_url ? (
          <div
            className={`w-full h-full relative cursor-pointer flex items-center justify-center bg-slate-950 group/img ${
              isMobile ? 'py-3 px-4' : 'p-1'
            }`}
            onClick={() => onOpenPreview(project.image_url!, project.title, undefined, isMobile)}
            title="Klik untuk melihat layar penuh (Fullscreen)"
          >
            {isMobile ? (
              <div className="relative z-10 h-full max-h-[96%] flex items-center justify-center">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="h-full w-auto max-h-[350px] object-contain rounded-2xl drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] border border-slate-700/80 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            ) : (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02] opacity-95 group-hover:opacity-100"
              />
            )}
            <button
              type="button"
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-slate-950/85 hover:bg-emerald-500 hover:text-slate-950 border border-slate-700/80 text-slate-300 flex items-center justify-center transition-all duration-200 shadow-md opacity-0 group-hover/img:opacity-100"
              title="Klik untuk layar penuh"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-700">
            <Code2 size={48} />
          </div>
        )}

        {/* Bedimcode Number Badge: 01, 02, etc. */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-white font-syne font-extrabold text-xs tracking-wider shadow-lg z-10 pointer-events-none">
          <span className="text-emerald-400 font-mono">#{formattedNumber}</span>
        </div>

        {/* Featured Tag (Only if no custom slider to keep header clean) */}
        {project.featured && !hasMultipleImages && (
          <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md z-10 pointer-events-none">
            <Star size={11} className="fill-emerald-400 text-emerald-400" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-syne font-bold text-lg sm:text-xl text-slate-100 mb-2 tracking-tight group-hover:text-emerald-300 transition-colors">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Technology Badges */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800/90 border border-slate-700/70 text-slate-300 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons: GitHub Repository & Demo */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 text-slate-200 text-xs font-semibold transition-all hover:border-emerald-500/40 group/btn"
              title="Kunjungi Repository GitHub"
            >
              <GithubIcon size={14} className="text-emerald-400 group-hover/btn:scale-110 transition-transform" />
              <span>GitHub Repo</span>
            </a>
          )}

          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-colors"
              title="Lihat Demo / Detail"
            >
              <span>Preview</span>
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'WEB' | 'MOBILE' | 'ENTERPRISE'>('ALL');
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    caption?: string;
    isMobile?: boolean;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
    isMobile: false,
  });

  const handleOpenPreview = (imageUrl: string, title: string, caption?: string, isMobile?: boolean) => {
    setPreviewModal({
      isOpen: true,
      imageUrl,
      title,
      caption,
      isMobile,
    });
  };

  const handleClosePreview = () => {
    setPreviewModal((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClosePreview();
    };
    if (previewModal.isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [previewModal.isOpen]);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'WEB') {
      return project.tags.some((t) => ['Next.js', 'React', 'PHP', 'Laravel', 'Blade', 'Tailwind CSS'].includes(t));
    }
    if (activeFilter === 'MOBILE') {
      return project.tags.some((t) => ['Flutter', 'Dart', 'Mobile'].includes(t));
    }
    if (activeFilter === 'ENTERPRISE') {
      return project.tags.some((t) => ['Power BI', 'Enterprise', 'MySQL', 'Supabase'].includes(t));
    }
    return true;
  });

  return (
    <section id="works" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Bedimcode Section Title: View My Works */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal-init">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
            <FolderGit2 size={14} />
            <span>Portofolio & Repositori</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-slate-100 tracking-tight mb-4">
            Karya & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Proyek Unggulan</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Koleksi repositori GitHub open-source, aplikasi produksi, dan sistem enterprise nyata yang dibangun dengan standar rekayasa perangkat lunak modern.
          </p>

          {/* Bedimcode Category Filter Pills */}
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-full mt-8 flex-wrap justify-center shadow-lg">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeFilter === 'ALL'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Semua Karya ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter('WEB')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeFilter === 'WEB'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Web Systems
            </button>
            <button
              onClick={() => setActiveFilter('MOBILE')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeFilter === 'MOBILE'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Mobile Apps
            </button>
            <button
              onClick={() => setActiveFilter('ENTERPRISE')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeFilter === 'ENTERPRISE'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Enterprise & BI
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id || project.title}
              project={project}
              index={idx}
              onOpenPreview={handleOpenPreview}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Screenshot Preview Modal (Full Screen Lightbox) */}
      {previewModal.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-xl animate-fadeIn"
          onClick={handleClosePreview}
        >
          <div
            className={`relative w-full max-h-[96vh] bg-slate-900/95 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col ${
              previewModal.isMobile ? 'max-w-md' : 'max-w-6xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/90 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <div>
                  <h4 className="font-syne font-bold text-slate-100 text-sm sm:text-base">
                    {previewModal.title}
                  </h4>
                  {previewModal.caption && (
                    <p className="text-xs text-emerald-400 font-medium mt-0.5">
                      {previewModal.caption}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleClosePreview}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-md"
                title="Tutup (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Image Display (Full, uncropped, maximum clarity) */}
            <div className="p-3 sm:p-5 overflow-auto flex items-center justify-center bg-slate-950 max-h-[84vh]">
              <img
                src={previewModal.imageUrl}
                alt={previewModal.title}
                className={`max-w-full max-h-[78vh] w-auto h-auto object-contain shadow-2xl ${
                  previewModal.isMobile ? 'rounded-3xl border border-slate-700/80' : 'rounded-lg border border-slate-800/80'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
