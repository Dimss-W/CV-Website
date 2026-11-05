'use client';

import React, { useState, useEffect } from 'react';
import { playTactileClick, toggleSound, isSoundEnabled } from '@/lib/sound';

interface NavbarProps {
  resumeUrl?: string;
}

export default function Navbar({ resumeUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(isSoundEnabled());

    const handleScroll = () => {
      setScrolled(window.scrollY >= 40);

      const sections = [
        'home',
        'about',
        'projects',
        'skills',
        'experience',
        'certificates',
        'education',
        'contact',
      ];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) playTactileClick();
  };

  const navLinks = [
    { name: 'Beranda', id: 'home', href: '#home' },
    { name: 'Tentang', id: 'about', href: '#about' },
    { name: 'Proyek', id: 'projects', href: '#projects' },
    { name: 'Keahlian', id: 'skills', href: '#skills' },
    { name: 'Pengalaman', id: 'experience', href: '#experience' },
    { name: 'Sertifikasi', id: 'certificates', href: '#certificates' },
    { name: 'Pendidikan', id: 'education', href: '#education' },
  ];

  const cvDownloadUrl = resumeUrl || '/CV_Dimas_Wijanarko_ATS.pdf';

  return (
    <>
      {/* Floating Dynamic Island Navbar */}
      <header
        className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 transition-all duration-300 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-2.5 sm:gap-6 px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 max-w-5xl w-full ${
            scrolled
              ? 'bg-[#0b0e15]/90 backdrop-blur-xl border border-white/12 shadow-[0_12px_35px_-5px_rgba(0,0,0,0.8),0_0_25px_rgba(139,92,246,0.15)]'
              : 'bg-[#0b0e15]/55 backdrop-blur-md border border-white/8 shadow-lg'
          }`}
          aria-label="Navigasi Utama"
        >
          {/* Brand Logo & Live Pulse */}
          <a
            href="#home"
            onClick={playTactileClick}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Kembali ke Beranda"
          >
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600/30 to-purple-500/25 border border-violet-400/40 flex items-center justify-center text-violet-300 font-mono font-bold text-xs shadow-[0_0_15px_rgba(139,92,246,0.35)] group-hover:scale-105 transition-transform">
              DW
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0b0e15] pulse-indicator" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors">
                Dimas Wijanarko
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                FULL STACK &amp; ANALYTICS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={playTactileClick}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-violet-200 bg-violet-600/25 border border-violet-400/35 shadow-[0_0_15px_rgba(139,92,246,0.25)] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={handleSoundToggle}
              className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-violet-300 transition-colors"
              title={soundOn ? 'Nonaktifkan Efek Suara' : 'Aktifkan Efek Suara'}
              aria-label="Toggle audio effects"
            >
              <i className={soundOn ? 'ri-volume-up-line text-sm text-violet-400' : 'ri-volume-mute-line text-sm text-slate-500'} />
            </button>

            {/* Unduh CV Button */}
            <a
              href={cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTactileClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.06] hover:bg-violet-600/20 border border-white/12 hover:border-violet-400/40 text-xs font-semibold text-slate-200 hover:text-violet-300 active:scale-95 transition-all duration-200 shadow-sm"
              title="Unduh Berkas CV ATS Resmi (PDF)"
            >
              <i className="ri-file-download-line text-sm text-violet-400" />
              <span className="hidden xs:inline">Unduh CV</span>
            </a>

            {/* Hubungi Button */}
            <a
              href="#contact"
              onClick={playTactileClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold hover:shadow-[0_0_22px_rgba(139,92,246,0.5)] hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <span>Hubungi</span>
              <i className="ri-arrow-right-up-line text-xs" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(true);
                playTactileClick();
              }}
              className="lg:hidden w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Buka Menu Navigasi"
            >
              <i className="ri-menu-3-line text-base" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex flex-col justify-between p-6 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Header Mobile Drawer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-violet-600/25 border border-violet-400/40 flex items-center justify-center text-violet-300 font-mono font-bold text-sm">
                DW
              </div>
              <div>
                <div className="text-sm font-bold text-white">Dimas Wijanarko</div>
                <div className="text-[11px] text-violet-400 font-mono">Sistem Informasi UBSI</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                playTactileClick();
              }}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white text-lg hover:bg-white/20 transition-colors"
              aria-label="Tutup Menu Navigasi"
            >
              <i className="ri-close-line" />
            </button>
          </div>

          {/* Links list */}
          <div className="flex flex-col gap-2 my-auto py-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    playTactileClick();
                  }}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-300 border border-violet-400/35'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  <i className="ri-arrow-right-s-line text-lg opacity-60" />
                </a>
              );
            })}

            <a
              href="#contact"
              onClick={() => {
                setMobileMenuOpen(false);
                playTactileClick();
              }}
              className="flex items-center justify-between px-5 py-3.5 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 mt-2 shadow-lg shadow-violet-600/30"
            >
              <span>Hubungi Saya via Email</span>
              <i className="ri-mail-send-line text-lg" />
            </a>
          </div>

          {/* Mobile Footer Drawer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator" />
              Siap Menerima Peluang Proyek
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Dimss-W"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-slate-300 hover:text-violet-400"
                aria-label="GitHub Dimas"
              >
                <i className="ri-github-fill" />
              </a>
              <a
                href="https://linkedin.com/in/dimas-wijanarko"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-slate-300 hover:text-violet-400"
                aria-label="LinkedIn Dimas"
              >
                <i className="ri-linkedin-box-fill" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
