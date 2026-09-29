'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Send, Download, X, ChevronUp, Sparkles, CheckCircle } from 'lucide-react';
import { Profile } from '@/types';

interface RecruiterQuickBarProps {
  profile: Profile;
}

export default function RecruiterQuickBar({ profile }: RecruiterQuickBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating bar after scrolling past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-40 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xl shadow-indigo-600/30 transition-all transform hover:scale-105 border border-indigo-400/40"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Briefcase size={14} />
          <span>Rekrut Dimas</span>
          <ChevronUp size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="glass-card p-3 sm:p-3.5 rounded-2xl bg-slate-950/90 border border-slate-700/80 shadow-2xl shadow-black/80 backdrop-blur-xl flex items-center justify-between gap-3">
        {/* Left: Open to Work Status Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-emerald-500/60">
              <img
                src={profile.avatar_url || '/dimas-profile.jpg'}
                alt={profile.full_name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 tracking-tight">
              <span>OPEN TO WORK</span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="hidden sm:inline text-slate-300">Siap Bergabung Segera</span>
            </div>
            <div className="text-[10px] text-slate-400 truncate hidden xs:block">
              Full Stack & Mobile Engineer
            </div>
          </div>
        </div>

        {/* Right: Fast Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-syne text-[11px] sm:text-xs font-bold shadow-md shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Send size={12} />
            <span>Rekrut</span>
            <span className="hidden sm:inline">/ Diskusi</span>
          </a>

          <button
            onClick={() => setIsMinimized(true)}
            aria-label="Tutup bar rekrutmen"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
