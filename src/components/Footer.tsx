'use client';

import React from 'react';
import { playTactileClick } from '@/lib/sound';

export default function Footer() {
  const scrollToTop = () => {
    playTactileClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070709] border-t border-zinc-800/80 pt-12 pb-8 text-zinc-400">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-zinc-800">
          
          {/* Brand & Identity */}
          <div className="md:col-span-5 flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 font-mono font-bold text-xs">
                DW
              </div>
              <span className="text-base font-semibold text-white tracking-tight">
                Dimas Wijanarko
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Full Stack Web &amp; Mobile Software Engineer. Mahasiswa Sistem Informasi UBSI berdedikasi membangun produk digital teruji skala produksi.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-5 flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <a href="#home" onClick={playTactileClick} className="hover:text-white transition-colors">Beranda</a>
            <a href="#about" onClick={playTactileClick} className="hover:text-white transition-colors">Tentang</a>
            <a href="#projects" onClick={playTactileClick} className="hover:text-white transition-colors">Proyek</a>
            <a href="#skills" onClick={playTactileClick} className="hover:text-white transition-colors">Keahlian</a>
            <a href="#experience" onClick={playTactileClick} className="hover:text-white transition-colors">Pengalaman</a>
            <a href="#certificates" onClick={playTactileClick} className="hover:text-white transition-colors">Sertifikasi</a>
            <a href="#contact" onClick={playTactileClick} className="hover:text-white transition-colors">Kontak</a>
          </div>

          {/* Back to top button */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-400 hover:text-white transition-all active:scale-95"
              aria-label="Kembali ke atas halaman"
            >
              <span>Ke Atas</span>
              <i className="ri-arrow-up-line text-xs" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 font-mono text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Dimas Wijanarko. Hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Next.js</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span className="text-emerald-400">Production Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
