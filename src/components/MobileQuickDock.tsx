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
      <div className="pointer-events-auto flex items-center justify-between gap-1 p-1.5 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 shadow-xl">
        
        {/* Proyek Button */}
        <a
          href="#projects"
          onClick={playTactileClick}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors text-center"
        >
          <i className="ri-folder-open-line text-base text-zinc-300" />
          <span className="text-[10px] font-medium mt-0.5">Proyek</span>
        </a>

        {/* Keahlian Button */}
        <a
          href="#skills"
          onClick={playTactileClick}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors text-center"
        >
          <i className="ri-cpu-line text-base text-zinc-300" />
          <span className="text-[10px] font-medium mt-0.5">Keahlian</span>
        </a>

        {/* Email Direct Hub */}
        <a
          href="mailto:dmswijanarko@gmail.com?subject=Peluang%20Proyek%20/%20Rekrutmen"
          onClick={playTactileClick}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors text-center"
        >
          <i className="ri-mail-line text-base text-zinc-300" />
          <span className="text-[10px] font-medium mt-0.5">Email</span>
        </a>

        {/* Unduh CV ATS Button */}
        <a
          href="/CV_Dimas_Wijanarko_ATS.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playTactileClick}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-white text-zinc-950 font-semibold active:scale-95 transition-all text-center"
        >
          <i className="ri-file-download-line text-base" />
          <span className="text-[10px] mt-0.5">CV ATS</span>
        </a>

      </div>
    </aside>
  );
}
