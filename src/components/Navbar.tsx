'use client';

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  resumeUrl?: string;
}

export default function Navbar({ resumeUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50);

      const sections = [
        'home',
        'work',
        'service',
        'skills',
        'experience',
        'certificates',
        'contact',
      ];
      const scrollPos = window.scrollY + 260;

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

  const navLinks = [
    { name: 'Beranda', id: 'home', href: '#home' },
    { name: 'Karya', id: 'work', href: '#work' },
    { name: 'Layanan', id: 'service', href: '#service' },
    { name: 'Keahlian', id: 'skills', href: '#skills' },
    { name: 'Pengalaman', id: 'experience', href: '#experience' },
    { name: 'Sertifikat', id: 'certificates', href: '#certificates' },
  ];

  return (
    <header className={`header ${scrolled ? 'scroll-header' : ''}`} id="header">
      <nav className="nav container">
        <a href="#home" className="nav__logo">
          Dimas
        </a>

        <div
          className={`nav__menu ${mobileMenuOpen ? 'show-menu' : ''}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`nav__link ${
                    activeSection === link.id ? 'active-link' : ''
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}

            <li>
              <a
                href={resumeUrl && resumeUrl !== '#contact' ? resumeUrl : '/certificates/sertifikat-bnsp-database-administrator.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--first-color)] text-[var(--first-color)] hover:bg-[var(--first-color)] hover:text-[var(--black-color)] text-xs font-semibold transition-all"
                title="Unduh Berkas CV Resmi (PDF)"
              >
                <i className="ri-file-download-line text-sm" />
                <span>Unduh CV</span>
              </a>
            </li>

            <li>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="nav__contact"
              >
                Hubungi Saya
              </a>
            </li>
          </ul>

          {/* Tombol Tutup Mobile */}
          <button
            type="button"
            className="nav__close"
            id="nav-close"
            aria-label="Tutup menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="ri-close-large-line" />
          </button>
        </div>

        {/* Tombol Buka Mobile */}
        <button
          type="button"
          className="nav__toggle"
          id="nav-toggle"
          aria-label="Buka menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <i className="ri-menu-line" />
        </button>
      </nav>
    </header>
  );
}
