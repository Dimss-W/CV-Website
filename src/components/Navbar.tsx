'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Send } from 'lucide-react';

interface NavbarProps {
  resumeUrl?: string;
}

export default function Navbar({ resumeUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Bedimcode active section detection
      const sections = ['home', 'about', 'works', 'services', 'skills', 'contact'];
      const scrollPos = window.scrollY + 220;

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home', href: '#home' },
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Works', id: 'works', href: '#works' },
    { name: 'Services', id: 'services', href: '#services' },
    { name: 'Skills', id: 'skills', href: '#skills' },
    { name: 'Contact', id: 'contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/30'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo in Syne font */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="font-syne font-extrabold text-2xl text-white tracking-tight group-hover:text-emerald-400 transition-colors">
            Dimas<span className="text-emerald-400">.</span>
          </span>
        </a>

        {/* Desktop Nav Links with Bedimcode Dot Indicator */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 m-0 p-0 list-none">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`relative text-xs uppercase tracking-widest font-syne font-semibold transition-all duration-300 py-1 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-emerald-400 font-bold'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                    )}
                    <span>{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right CTA Button matching Bedimcode .nav__contact */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:scale-95"
          >
            <span>Contact me</span>
            <Send size={13} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer in Bedimcode Style */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-slate-800/80 backdrop-blur-2xl px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-syne uppercase tracking-wider font-semibold block py-1.5 transition-colors ${
                      isActive
                        ? 'text-emerald-400 pl-3 border-l-2 border-emerald-400'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
            <li className="pt-3 border-t border-slate-800/80 mt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Contact me</span>
                <Send size={14} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
