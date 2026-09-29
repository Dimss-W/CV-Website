'use client';

import React, { useState, useEffect } from 'react';
import { Certificate } from '@/types';
import { 
  Award, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Calendar, 
  Hash, 
  Building2,
  Sparkles
} from 'lucide-react';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  // Active page index for each certificate (e.g. page 1 vs page 2 for BNSP)
  const [activePages, setActivePages] = useState<{ [certId: string]: number }>({
    'serkom-database-administrator': 0,
    'juara-1-it-bootcamp': 0,
  });

  // Lightbox modal state
  const [modalCert, setModalCert] = useState<Certificate | null>(null);
  const [modalPageIndex, setModalPageIndex] = useState<number>(0);

  const openLightbox = (cert: Certificate, pageIdx: number = 0) => {
    setModalCert(cert);
    setModalPageIndex(pageIdx);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setModalCert(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-init">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
            <ShieldCheck size={14} />
            <span>Kredensial & Sertifikasi Resmi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-slate-100 tracking-tight mb-4">
            Sertifikasi Profesi &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              Prestasi Kejuaraan
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Bukti kompetensi terverifikasi nasional dari Badan Nasional Sertifikasi Profesi (BNSP) dan apresiasi kejuaraan software development berskala industri.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {certificates.map((cert) => {
            const currentPage = activePages[cert.id] ?? 0;
            const currentImg = cert.images[currentPage] || cert.images[0];
            const isBNSP = cert.id === 'serkom-database-administrator';

            return (
              <div
                key={cert.id}
                className="glass-card flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-xl shadow-black/30 hover:border-emerald-500/30 transition-all duration-300 group"
              >
                {/* Top Badge & Header */}
                <div className="p-6 pb-4 border-b border-slate-800/80 bg-slate-950/40">
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border shadow-sm ${
                        isBNSP
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-amber-500/10'
                      }`}
                    >
                      {isBNSP ? <ShieldCheck size={13} /> : <Award size={13} />}
                      {cert.badge}
                    </span>

                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Hash size={12} className="text-slate-500" />
                      {cert.credential_id}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-syne text-slate-100 group-hover:text-emerald-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-sky-400/90 mt-1 flex items-center gap-1.5">
                    <Building2 size={13} className="shrink-0 text-slate-400" />
                    <span>{cert.issuer}</span>
                  </p>
                </div>

                {/* Certificate Document Preview Frame (Uncropped) */}
                <div className="p-5 bg-slate-950/60 flex flex-col items-center">
                  {/* Page Tab Selector if multiple pages exist */}
                  {cert.images.length > 1 && (
                    <div className="w-full flex items-center justify-center gap-2 mb-3">
                      {cert.images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setActivePages((prev) => ({ ...prev, [cert.id]: idx }))
                          }
                          className={`px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 border ${
                            currentPage === idx
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-sm'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          {idx === 0 ? '📄 Halaman Depan' : '📋 7 Unit Kompetensi'}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Document Container */}
                  <div
                    onClick={() => openLightbox(cert, currentPage)}
                    className="relative w-full rounded-xl overflow-hidden bg-slate-900/90 border border-slate-800/90 shadow-inner group/preview cursor-pointer transition-all duration-300 hover:border-emerald-500/40"
                    style={{
                      minHeight: isBNSP ? '380px' : '260px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={currentImg.url}
                      alt={currentImg.title}
                      className="w-full h-auto max-h-[460px] object-contain block transition-transform duration-300 group-hover/preview:scale-[1.02]"
                      loading="lazy"
                    />

                    {/* Hover Overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Maximize2 size={20} />
                      </div>
                      <span className="text-xs font-semibold text-slate-100 tracking-wide bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700">
                        Klik untuk Pratinjau Fullscreen
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2 text-center italic">
                    {currentImg.title}
                  </p>
                </div>

                {/* Details & Metadata */}
                <div className="p-6 pt-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date / Validity Meta */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-emerald-400" />
                        <span>Diterbitkan: {cert.issue_date}</span>
                      </div>
                      {cert.valid_until && (
                        <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 font-medium">
                          {cert.valid_until}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {cert.description}
                    </p>

                    {/* Unit Kompetensi list if BNSP */}
                    {cert.competency_units && cert.competency_units.length > 0 && (
                      <div className="mb-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <span>Unit Kompetensi Standar Nasional (SKKNI):</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-400">
                          {cert.competency_units.map((unit) => (
                            <li key={unit.code} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 font-mono text-[11px] shrink-0 mt-0.5">
                                •
                              </span>
                              <span>
                                <strong className="text-slate-300 font-mono text-[11px]">{unit.code}</strong> — {unit.title}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/50 text-[11px] font-medium text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800/70 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openLightbox(cert, currentPage)}
                      className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 text-slate-100 text-xs font-semibold border border-slate-700 transition-colors shadow-sm"
                    >
                      <Maximize2 size={14} className="text-emerald-400" />
                      <span>Lihat Ukuran Penuh</span>
                    </button>

                    <a
                      href={cert.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-colors shadow-sm"
                    >
                      <FileText size={14} />
                      <span>Buka File Asli (PDF)</span>
                      <ExternalLink size={12} className="opacity-70" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {modalCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-1">
                  {modalCert.badge}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-syne text-slate-100 leading-snug">
                  {modalCert.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {modalCert.credential_id} • {modalCert.issuer}
                </p>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700/60 flex items-center justify-center transition-colors shrink-0"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: Uncropped Image Viewer */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950/90">
              <img
                src={modalCert.images[modalPageIndex]?.url || modalCert.images[0].url}
                alt={modalCert.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg border border-slate-800 shadow-2xl"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
              {/* Pagination if multiple pages */}
              {modalCert.images.length > 1 ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={modalPageIndex === 0}
                    onClick={() => setModalPageIndex((prev) => Math.max(0, prev - 1))}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs text-slate-300 font-medium">
                    Halaman {modalPageIndex + 1} dari {modalCert.images.length}:{' '}
                    <span className="text-slate-400 italic">
                      {modalCert.images[modalPageIndex]?.title}
                    </span>
                  </span>
                  <button
                    type="button"
                    disabled={modalPageIndex === modalCert.images.length - 1}
                    onClick={() =>
                      setModalPageIndex((prev) =>
                        Math.min(modalCert.images.length - 1, prev + 1)
                      )
                    }
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-xs text-slate-400">
                  {modalCert.images[0].title}
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <a
                  href={modalCert.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors shadow-md shadow-emerald-500/20"
                >
                  <FileText size={14} />
                  <span>Download / Buka PDF Asli</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
