'use client';

import React, { useState, useEffect } from 'react';
import { Profile } from '@/types';
import { Mail, MapPin, ArrowRight, Download, Sparkles, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import CircularBadge from './CircularBadge';

interface HeroProps {
  profile: Profile;
}

const typedRoles = [
  'Full Stack Web Developer',
  'Mobile Software Engineer',
  'Laravel & Flutter Specialist',
  'Data Integration Engineer',
];

export default function Hero({ profile }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect matching Bedimcode typed.js
  useEffect(() => {
    const fullText = typedRoles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText.length < fullText.length) {
      timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, 90);
    } else if (!isDeleting && currentText.length === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && currentText.length > 0) {
      timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length - 1));
      }, 45);
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % typedRoles.length);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section id="home" className="pt-32 sm:pt-36 pb-20 relative overflow-hidden">
      {/* Bedimcode ambient blur blobs */}
      <div className="blob-big top-20 left-10 opacity-20 pointer-events-none" />
      <div className="blob-small bottom-20 right-10 opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text in Bedimcode Typography */}
          <div className="lg:col-span-7 reveal-init">
            {/* Top Subtitle Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-300 text-xs font-medium mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
              <span>Hi! I&apos;m <strong className="text-white font-semibold">{profile.full_name}</strong></span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Jakarta, ID</span>
            </div>

            {/* Big Headline in Syne font */}
            <h1 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-4">
              Creative Engineer & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {currentText}
              </span>
              <span className="text-emerald-400 animate-pulse">|</span>
            </h1>

            {/* Hero Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              Membangun sistem web berskala enterprise, aplikasi cross-platform modern, dan integrasi analitik visual untuk solusi digital berdampak nyata.
            </p>

            {/* Location & Contact Bar */}
            <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-400 mb-9">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-emerald-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-cyan-400" />
                <a href={`mailto:${profile.email}`} className="hover:text-emerald-400 transition-colors">
                  {profile.email}
                </a>
              </div>
            </div>

            {/* Bedimcode Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <Send size={15} />
                <span>Hubungi Saya</span>
              </a>

              <a
                href="#works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-syne font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:border-slate-600 hover:-translate-y-0.5"
              >
                <span>Lihat Karya</span>
                <ArrowRight size={15} />
              </a>

              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200 font-syne font-semibold text-xs uppercase tracking-wider transition-all"
                  title="Download Curriculum Vitae"
                >
                  <Download size={14} />
                  <span>CV PDF</span>
                </a>
              )}
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-4 mt-10 pt-6 border-t border-slate-800/70">
              <span className="text-xs text-slate-400 font-syne font-semibold uppercase tracking-wider">Ikuti Saya:</span>
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all hover:scale-105"
                >
                  <GithubIcon size={16} />
                </a>
              )}
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-105"
                >
                  <LinkedinIcon size={16} />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email Dimas"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all hover:scale-105"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame + Circular Badge */}
          <div className="lg:col-span-5 reveal-init reveal-delay-2 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Circular Rotating Badge in top right corner */}
              <div className="absolute -top-12 -right-4 sm:-top-14 sm:-right-8 z-20">
                <CircularBadge text="EXPLORE • WORK WITH ME • DIMAS WIJANARKO •" />
              </div>

              {/* Main Portrait Frame with Bedimcode Curve */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl p-3">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-950">
                  <img
                    src={profile.avatar_url || '/dimas-profile.jpg'}
                    alt={profile.full_name}
                    className="w-full h-full object-cover object-center filter grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Overlaid Achievement Chips */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <div className="bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3.5 py-2.5 shadow-lg">
                      <div className="text-base font-extrabold text-emerald-400 font-syne">10+ Proyek</div>
                      <div className="text-[10px] text-slate-400">Web & Mobile Apps</div>
                    </div>
                    <div className="bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3.5 py-2.5 shadow-lg text-right">
                      <div className="text-base font-extrabold text-cyan-400 font-syne">Juara 1</div>
                      <div className="text-[10px] text-slate-400">IT Bootcamp 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
