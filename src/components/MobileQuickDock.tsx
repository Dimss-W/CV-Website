'use client';

import React, { useState, useEffect } from 'react';
import { playTactileClick } from '@/lib/sound';

export default function MobileQuickDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      className={`lg:hidden fixed bottom-4 left-4 right-4 z-40 max-w-sm mx-auto transition-all duration-300 pointer-events-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      aria-label="Aksi Cepat Seluler"
    >
      <div className="pointer-events-auto flex items-center justify-between gap-1 p-2 rounded-2xl bg-[#0b0e15]/95 backdrop-blur-2xl border border-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(139,92,246,0.2)]">
        
        {/* Proyek Button */}
        <a
          href="#projects"
          onClick={playTactileClick}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-white/5 active:scale-95 transition-all text-center"
        >
          <i className="ri-folder-open-line text-lg text-violet-400" />
          <span className="text-[10px] font-semibold mt-0.5">Proyek</span>
        </a>

        {/* Keahlian Button */}
        <a
          href="#skills"
          onClick={playTactileClick}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-white/5 active:scale-95 transition-all text-center"
        >
          <i className="ri-cpu-line text-lg text-indigo-400" />
          <span className="text-[10px] font-semibold mt-0.5">Keahlian</span>
        </a>

        {/* Email Direct Hub */}
        <a
          href="mailto:dmswijanarko@gmail.com?subject=Peluang%20Proyek%20/%20Rekrutmen"
          onClick={playTactileClick}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-white/5 active:scale-95 transition-all text-center"
        >
          <i className="ri-mail-line text-lg text-amber-400" />
          <span className="text-[10px] font-semibold mt-0.5">Email</span>
        </a>

        {/* Unduh CV ATS Button */}
        <a
          href="/CV_Dimas_Wijanarko_ATS.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playTactileClick}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold active:scale-95 shadow-md shadow-violet-600/35 transition-all text-center"
        >
          <i className="ri-file-download-line text-lg" />
          <span className="text-[10px] mt-0.5">Unduh CV</span>
        </a>

      </div>
    </aside>
  );
}
