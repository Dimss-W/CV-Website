'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container grid">
        <h2 className="footer__title">
          MARI BERKOLABORASI <span>MEMBANGUN SOLUSI</span> <br />
          DIGITAL INOVATIF &amp; <span>BERKELANJUTAN.</span>
        </h2>

        <div className="footer__content">
          <div className="footer__links">
            <a href="#work" className="footer__link">
              Proyek
            </a>
            <a href="#skills" className="footer__link">
              Keahlian
            </a>
            <a href="#experience" className="footer__link">
              Pengalaman
            </a>
            <a href="#certificates" className="footer__link">
              Sertifikat
            </a>
          </div>

          <div className="footer__social">
            <a
              href="https://github.com/Dimss-W"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              <i className="ri-github-line" />
            </a>

            <a
              href="https://instagram.com/dimsswijanark_"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              <i className="ri-instagram-line" />
            </a>

            <a
              href="https://linkedin.com/in/dimas-wijanarko"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-box-line" />
            </a>

            <a
              href="https://wa.me/6285794770824"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="WhatsApp"
            >
              <i className="ri-whatsapp-line" />
            </a>
          </div>
        </div>
      </div>

      {/* Informasi Spesifikasi & Teknologi Pembuatan Website */}
      <div className="container max-w-4xl mx-auto mt-12 pt-8 border-t border-[var(--border-color)]/50 relative z-[2]">
        <div className="bg-[var(--container-color)]/70 border border-[var(--border-color)]/80 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-[var(--border-color)]/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--first-color)]">
                  Teknologi Pembuatan Website
                </span>
              </div>
              <p className="text-xs text-[var(--text-color)] max-w-xl leading-relaxed">
                Website CV ini dibangun menggunakan Next.js 14, TypeScript, Tailwind CSS, dan generator CV ATS berbasis Python.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[var(--body-color)] border border-[var(--border-color)] text-[var(--first-color)] whitespace-nowrap self-start md:self-auto">
              v2.4 Production
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-[var(--body-color)]/60 border border-[var(--border-color)] flex flex-col gap-1">
              <span className="text-[10px] text-[var(--text-color-light)] font-mono">Framework</span>
              <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Next.js 14
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[var(--body-color)]/60 border border-[var(--border-color)] flex flex-col gap-1">
              <span className="text-[10px] text-[var(--text-color-light)] font-mono">Bahasa</span>
              <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> TypeScript
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[var(--body-color)]/60 border border-[var(--border-color)] flex flex-col gap-1">
              <span className="text-[10px] text-[var(--text-color-light)] font-mono">Styling UI</span>
              <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span> Tailwind CSS
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[var(--body-color)]/60 border border-[var(--border-color)] flex flex-col gap-1">
              <span className="text-[10px] text-[var(--text-color-light)] font-mono">Engine CV ATS</span>
              <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Python (ReportLab)
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[var(--body-color)]/60 border border-[var(--border-color)] flex flex-col gap-1">
              <span className="text-[10px] text-[var(--text-color-light)] font-mono">Deployment</span>
              <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Vercel Cloud
              </span>
            </div>
          </div>
        </div>
      </div>

      <span className="footer__copy">
        &#169; 2026 Dimas Wijanarko. Hak Cipta Dilindungi.
      </span>

      <div className="blob-big" />
    </footer>
  );
}
