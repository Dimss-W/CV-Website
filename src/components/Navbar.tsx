'use client';

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  resumeUrl?: string;
}

export default function Navbar({}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50);

      const sections = ['home', 'work', 'service', 'skills', 'experience', 'certificates', 'contact'];
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
    { name: 'Home', id: 'home', href: '#home' },
    { name: 'Works', id: 'work', href: '#work' },
    { name: 'My Services', id: 'service', href: '#service' },
    { name: 'Skills', id: 'skills', href: '#skills' },
    { name: 'Experience', id: 'experience', href: '#experience' },
    { name: 'Certificates', id: 'certificates', href: '#certificates' },
  ];

  return (
    <header className={`header ${scrolled ? 'scroll-header' : ''}`} id="header">
      <nav className="nav container">
        <a href="#home" className="nav__logo">
          Dimas
        </a>

        <div className={`nav__menu ${mobileMenuOpen ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`nav__link ${activeSection === link.id ? 'active-link' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            ))}

            <li>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="nav__contact"
              >
                Contact me
              </a>
            </li>
          </ul>

          {/* Close */}
          <button
            type="button"
            className="nav__close"
            id="nav-close"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="ri-close-large-line" />
          </button>
        </div>

        {/* Toggle */}
        <button
          type="button"
          className="nav__toggle"
          id="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <i className="ri-menu-line" />
        </button>
      </nav>
    </header>
  );
}
