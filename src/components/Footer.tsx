'use client';

import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 pt-16 pb-12 bg-slate-950/95 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Bedimcode Signature Big Footer Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase leading-tight mb-4">
            Collaborate with Dimas and build scalable digital solutions today.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Terbuka untuk kolaborasi proyek, full-time opportunity, dan konsultasi software engineering.
          </p>
        </div>

        {/* Quick Nav Links in Bedimcode Style */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-10 pb-10 border-b border-slate-800/80">
          <a href="#home" className="text-xs font-syne font-semibold uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition-colors">
            Home
          </a>
          <a href="#about" className="text-xs font-syne font-semibold uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition-colors">
            About
          </a>
          <a href="#works" className="text-xs font-syne font-semibold uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition-colors">
            Works
          </a>
          <a href="#services" className="text-xs font-syne font-semibold uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition-colors">
            Services
          </a>
          <a href="#skills" className="text-xs font-syne font-semibold uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition-colors">
            Skills
          </a>
          <a href="#contact" className="text-xs font-syne font-semibold uppercase tracking-wider text-slate-400 hover:text-emerald-400 transition-colors">
            Contact
          </a>
        </div>

        {/* Bottom row: Brand, Socials & Back to Top */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="font-syne font-extrabold text-xl text-white tracking-tight">
              Portofolio Dimas<span className="text-emerald-400">.</span>
            </span>
            <p className="text-xs text-slate-500 mt-0.5">
              Full Stack Web & Mobile Software Engineer • Jakarta, ID
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Dimss-W"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
            >
              <GithubIcon size={15} />
            </a>
            <a
              href="https://linkedin.com/in/dimas-wijanarko"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            >
              <LinkedinIcon size={15} />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Dimas Wijanarko. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Built with precision & passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
