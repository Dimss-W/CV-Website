'use client';

import React, { useState, useRef } from 'react';
import { Project } from '@/types';
import { ExternalLink, Star, Code2, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectsSectionProps {
  projects: Project[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card flex flex-col h-full rounded-2xl border border-slate-800/90 bg-slate-900/60 transition-all duration-300 ease-out group reveal-init ${delayClass}`}
      style={tiltStyle}
    >
      {/* Thumbnail Banner with Number Overlay */}
      <div className="h-52 w-full relative overflow-hidden bg-slate-950/90 rounded-t-2xl">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-700">
            <Code2 size={48} />
          </div>
        )}

        {/* Ambient Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Bedimcode Number Badge: 01, 02, etc. */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-white font-syne font-extrabold text-xs tracking-wider shadow-lg">
          <span className="text-emerald-400 font-mono">#{formattedNumber}</span>
        </div>

        {/* Featured Tag */}
        {project.featured && (
          <div className="absolute top-3.5 right-3.5 bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id || project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
