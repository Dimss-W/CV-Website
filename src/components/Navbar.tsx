'use client';

import React, { useState, useEffect } from 'react';
import { playTactileClick } from '@/lib/sound';
import { getInitialTheme, applyTheme, Theme } from '@/lib/theme';

interface NavbarProps {
  resumeUrl?: string;
}

export default function Navbar({ resumeUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(getInitialTheme());

    const handleThemeChange = (e: Event) => {
      const custom = e as CustomEvent<{ theme: Theme }>;
      if (custom.detail?.theme) setTheme(custom.detail.theme);
    };
    window.addEventListener('themechange', handleThemeChange);

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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  const handleThemeToggle = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    playTactileClick();
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
      {/* Floating Minimalist Header */}
      <header
        className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 transition-all duration-300 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 max-w-5xl w-full ${
            scrolled
              ? 'bg-zinc-950/85 backdrop-blur-xl border border-zinc-800 shadow-xl'
              : 'bg-zinc-950/60 backdrop-blur-md border border-zinc-800/80 shadow-md'
          }`}
          aria-label="Navigasi Utama"
        >
          {/* Brand Logo & Minimalist Availability Dot */}
          <a
            href="#home"
            onClick={playTactileClick}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Kembali ke Beranda"
          >
            <div className="relative w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200 font-mono font-bold text-xs group-hover:border-zinc-500 transition-colors">
              DW
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-zinc-950 pulse-indicator" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold text-zinc-100 tracking-tight">
                Dimas Wijanarko
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="nav-links-bar hidden lg:flex items-center gap-1 p-1 rounded-full">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={playTactileClick}
                  className={`nav-link-item px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 ${
                    isActive ? 'is-active' : ''
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Dark & Light Mode Theme Switcher */}
            <button
              type="button"
              onClick={handleThemeToggle}
              className="theme-toggle-btn w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
              title={theme === 'dark' ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)'}
              aria-label="Ganti mode tampilan tema"
            >
              {theme === 'dark' ? (
                <i className="ri-sun-line text-sm text-amber-300 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <i className="ri-moon-line text-sm text-slate-800 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Unduh CV ATS */}
            <a
              href={cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTactileClick}
              className="nav-cv-btn inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-medium transition-all duration-150 shadow-sm"
              title="Unduh Berkas CV ATS Resmi (PDF)"
            >
              <i className="ri-file-download-line text-sm" />
              <span className="hidden xs:inline">CV ATS</span>
            </a>

            {/* Hubungi Button */}
            <a
              href="#contact"
              onClick={playTactileClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 active:scale-98 transition-all duration-150"
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
              className="lg:hidden w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-6 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Header Mobile Drawer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200 font-mono font-bold text-sm">
                DW
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Dimas Wijanarko</div>
                <div className="text-[11px] text-zinc-400 font-mono">Sistem Informasi UBSI</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Drawer Theme Toggle */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleThemeToggle();
                }}
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
                aria-label="Toggle theme mode"
              >
                {theme === 'dark' ? (
                  <i className="ri-sun-line text-base text-amber-300" />
                ) : (
                  <i className="ri-moon-line text-base text-slate-800" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  playTactileClick();
                }}
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                aria-label="Tutup Menu Navigasi"
              >
                <i className="ri-close-line text-lg" />
              </button>
            </div>
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
                  className={`flex items-center justify-between px-5 py-3 rounded-2xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-800 text-white border border-zinc-700 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <span>{link.name}</span>
                  <i className="ri-arrow-right-s-line text-lg opacity-40" />
                </a>
              );
            })}

            <a
              href="#contact"
              onClick={() => {
                setMobileMenuOpen(false);
                playTactileClick();
              }}
              className="flex items-center justify-between px-5 py-3 rounded-2xl text-base font-semibold text-zinc-950 bg-white mt-3"
            >
              <span>Hubungi Saya via Email</span>
              <i className="ri-mail-send-line text-lg" />
            </a>
          </div>

          {/* Mobile Footer Drawer */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator" />
              Siap Menerima Peluang Proyek
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Dimss-W"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-zinc-400 hover:text-white"
                aria-label="GitHub Dimas"
              >
                <i className="ri-github-fill" />
              </a>
              <a
                href="https://linkedin.com/in/dmswijanarko"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-zinc-400 hover:text-white"
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
