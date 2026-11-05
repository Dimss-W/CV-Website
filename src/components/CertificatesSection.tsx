'use client';

import React, { useState, useEffect } from 'react';
import { Certificate } from '@/types';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState<{ [certId: string]: number }>({});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedCert]);

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast(`ID Kredensial untuk "${title}" berhasil disalin!`);
    setTimeout(() => setCopyToast(null), 3000);
  };

  const getImgIdx = (id: string) => activeImgIdx[id] || 0;

  return (
    <section id="certificates" className="py-20 sm:py-28 relative bg-[#06090f] overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb w-[500px] h-[500px] bg-cyan-600/10 top-1/3 left-[-15%]" />
      <div className="glow-orb w-[500px] h-[500px] bg-amber-600/10 bottom-10 right-[-15%]" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <div className="section-tag">
            <i className="ri-award-line text-cyan-400" />
            <span>Kredensial &amp; Pengakuan Resmi</span>
          </div>
          <h2 className="section-heading mb-4">
            Sertifikasi <span className="gradient-text-cyan">Standar Kompetensi Nasional</span>
          </h2>
          <p className="section-description">
            Validasi keahlian teknis resmi dari Badan Nasional Sertifikasi Profesi (BNSP), 
            Lembaga Sertifikasi Profesi (LSP) UBSI, dan penghargaan prestisius Rektorat UBSI.
          </p>
        </div>

        {/* Certificates Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {certificates.map((cert) => {
            const hasMultipleImages = cert.images && cert.images.length > 1;
            const currentImgIdx = getImgIdx(cert.id);
            const currentImg = cert.images?.[currentImgIdx]?.url || cert.images?.[0]?.url;

            return (
              <article
                key={cert.id}
                className="spotlight-card flex flex-col justify-between group"
              >
                {/* Certificate Visual Preview */}
                <div
                  className="relative aspect-[16/11] w-full overflow-hidden bg-black/70 border-b border-white/8 cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <img
                    src={currentImg}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Issuer Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-cyan-300">
                      {cert.badge}
                    </span>
                  </div>

                  {/* Multi-page indicator */}
                  {hasMultipleImages && (
                    <div className="absolute bottom-2.5 right-2.5 z-10 flex gap-1.5">
                      {cert.images.map((_, dotI) => (
                        <button
                          key={dotI}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImgIdx((prev) => ({ ...prev, [cert.id]: dotI }));
                          }}
                          aria-label={`Lihat Halaman ${dotI + 1}`}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImgIdx === dotI ? 'bg-cyan-400 w-4' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Expand icon */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="ri-fullscreen-line text-xs" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-cyan-400 mb-1.5">
                      {cert.issuer}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {cert.description}
                    </p>

                    {/* Credential ID chip with 1-click copy */}
                    <div className="mb-4 p-2.5 rounded-xl bg-white/[0.03] border border-white/6 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="text-[10px] uppercase font-mono text-slate-400 block">
                          ID Kredensial
                        </span>
                        <span className="text-xs font-mono text-slate-200 truncate block">
                          {cert.credential_id}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(cert.credential_id, cert.title)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 text-[11px] font-mono transition-colors shrink-0 flex items-center gap-1"
                        title="Salin ID Kredensial"
                      >
                        <i className="ri-file-copy-line text-xs" />
                        <span>Salin</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    {/* Skills list preview */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cert.skills.slice(0, 3).map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/8 text-[11px] font-mono text-slate-300"
                        >
                          {sk}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-slate-500 font-mono">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/8">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Pratinjau Detail</span>
                        <i className="ri-arrow-right-up-line text-sm" />
                      </button>

                      {cert.pdf_url && (
                        <a
                          href={cert.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                          title="Unduh Berkas PDF Resmi"
                        >
                          <i className="ri-file-pdf-2-line text-red-400 text-sm" />
                          <span>PDF</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Toast Notification */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a0e17] border border-cyan-400/40 text-cyan-300 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom duration-200">
          <i className="ri-checkbox-circle-fill text-emerald-400 text-base" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* Detailed Certificate Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl bg-[#0a0e17] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl modal-enter my-auto overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">
                  {selectedCert.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedCert.issuer} • Diterbitkan: {selectedCert.issue_date}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg transition-colors shrink-0"
                aria-label="Tutup pratinjau sertifikat"
              >
                <i className="ri-close-line" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto space-y-6 py-4 pr-1">
              {/* Image viewer */}
              {selectedCert.images && selectedCert.images.length > 0 && (
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/80 border border-white/10 flex items-center justify-center">
                    <img
                      src={selectedCert.images[getImgIdx(selectedCert.id)]?.url || selectedCert.images[0].url}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {selectedCert.images.length > 1 && (
                    <div className="flex gap-2">
                      {selectedCert.images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImgIdx((prev) => ({ ...prev, [selectedCert.id]: idx }))}
                          className={`h-14 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                            getImgIdx(selectedCert.id) === idx
                              ? 'border-cyan-400 scale-105'
                              : 'border-white/20 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* In-depth details */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {selectedCert.description}
                </p>

                {selectedCert.details && (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8">
                    <h4 className="text-xs font-mono uppercase text-cyan-300 tracking-wider mb-2 flex items-center gap-2">
                      <i className="ri-shield-star-line text-sm" />
                      <span>Cakupan Standar Kompetensi Kerja Nasional (SKKNI)</span>
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedCert.details}
                    </p>
                  </div>
                )}

                {/* Skills tags */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2.5">
                    Unit Kompetensi Terverifikasi
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((sk, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-xs font-mono text-cyan-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs font-mono text-slate-400">
                {selectedCert.reg_number || selectedCert.credential_id}
              </span>

              {selectedCert.pdf_url && (
                <a
                  href={selectedCert.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-semibold hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all"
                >
                  <i className="ri-file-download-line text-sm" />
                  <span>Unduh Dokumen Asli (PDF)</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
