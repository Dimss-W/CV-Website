'use client';

import React from 'react';
import { ArrowDownRight, Sparkles } from 'lucide-react';

interface CircularBadgeProps {
  text?: string;
  className?: string;
}

export default function CircularBadge({
  text = 'EXPLORE • WORK WITH ME • DIMAS WIJANARKO •',
  className = '',
}: CircularBadgeProps) {
  return (
    <div className={`relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center select-none ${className}`}>
      {/* Rotating SVG Circular Text */}
      <svg
        className="w-full h-full animate-[spin_12s_linear_infinite] hover:animate-[spin_4s_linear_infinite] transition-all"
        viewBox="0 0 100 100"
      >
        <path
          id="circlePath"
          d="M 50, 50 m -36, 0 a 36, 36 0 1, 1 72, 0 a 36, 36 0 1, 1 -72, 0"
          fill="none"
        />
        <text className="fill-slate-300 font-syne font-bold text-[9px] uppercase tracking-[0.22em]">
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Icon Circle */}
      <a
        href="#works"
        aria-label="Scroll to Works"
        className="absolute w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:scale-110 hover:bg-emerald-500 hover:text-slate-950 transition-all duration-300 cursor-pointer"
      >
        <ArrowDownRight size={18} />
      </a>
    </div>
  );
}
