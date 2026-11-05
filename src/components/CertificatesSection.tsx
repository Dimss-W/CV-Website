'use client';

import React, { useState, useEffect } from 'react';
import { Certificate } from '@/types';
import { playTactileClick } from '@/lib/sound';

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
    playTactileClick();
    navigator.clipboard.writeText(text);
    setCopyToast(`ID Kredensial untuk "${title}" berhasil disalin.`);
    setTimeout(() => setCopyToast(null), 3000);
  };

  const getImgIdx = (id: string) => activeImgIdx[id] || 0;

  return (
    <section id="certificates" className="py-20 sm:py-28 relative border-t border-zinc-800/80">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16 reveal-on-scroll">
          <div className="section-tag">
            <span>Sertifikasi &amp; Prestasi</span>
          </div>
          <h2 className="section-heading mb-4">
            Standar Kompetensi &amp; Pengakuan Resmi
          </h2>
          <p className="section-description">
            Validasi keahlian teknis resmi dari Badan Nasional Sertifikasi Profesi (BNSP), 
            Lembaga Sertifikasi Profesi (LSP) UBSI, dan penghargaan akademik Juara 1 Software Development.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
          {certificates.map((cert) => {
            const hasMultipleImages = cert.images && cert.images.length > 1;
            const currentImgIdx = getImgIdx(cert.id);
            const currentImg = cert.images?.[currentImgIdx]?.url || cert.images?.[0]?.url;

            return (
              <article
                key={cert.id}
                className="flex flex-col justify-between rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 overflow-hidden group h-full reveal-on-scroll"
              >
                {/* Visual Preview */}
                <div
                  className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-950 border-b border-zinc-800 cursor-pointer"
                  onClick={() => {
                    setSelectedCert(cert);
                    playTactileClick();
                  }}
                >
                  <img
                    src={currentImg}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-103 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Issuer Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700 text-[10px] font-mono text-zinc-300">
                      {cert.badge}
                    </span>
                  </div>

                  {/* Multi-page dots */}
                  {hasMultipleImages && (
                    <div className="absolute bottom-2.5 right-2.5 z-10 flex gap-1">
                      {cert.images.map((_, dotI) => (
                        <button
                          key={dotI}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImgIdx((prev) => ({ ...prev, [cert.id]: dotI }));
                            playTactileClick();
                          }}
                          aria-label={`Halaman ${dotI + 1}`}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImgIdx === dotI ? 'bg-white w-4' : 'bg-zinc-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Expand icon */}
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-zinc-950/80 border border-zinc-700 flex items-center justify-center text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="ri-fullscreen-line text-xs" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400 mb-1">
                      {cert.issuer}
                    </div>

                    <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                      {cert.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {cert.description}
                    </p>

                    {/* Credential ID chip with 1-click copy */}
                    <div className="mb-4 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="text-[10px] uppercase font-mono text-zinc-500 block">
                          ID Kredensial
                        </span>
                        <span className="text-xs font-mono text-zinc-300 truncate block">
                          {cert.credential_id}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(cert.credential_id, cert.title)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-[11px] font-mono transition-colors shrink-0 flex items-center gap-1 active:scale-95"
                        title="Salin ID Kredensial"
                      >
                        <i className="ri-file-copy-line text-xs" />
                        <span>Salin</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    {/* Skills list */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cert.skills.slice(0, 3).map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCert(cert);
                          playTactileClick();
                        }}
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                      >
                        <span>Pratinjau Detail</span>
                        <i className="ri-arrow-right-line text-xs" />
                      </button>

                      {cert.pdf_url && (
                        <a
                          href={cert.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playTactileClick}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                          title="Unduh Berkas PDF Resmi"
                        >
                          <i className="ri-file-pdf-2-line text-xs text-zinc-400" />
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
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium animate-in fade-in duration-200">
          <i className="ri-check-line text-emerald-400 text-base" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* Detailed Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-2xl my-auto overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800 shrink-0">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase">
                  {selectedCert.badge}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {selectedCert.issuer} • Diterbitkan: {selectedCert.issue_date}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors shrink-0"
                aria-label="Tutup jendela sertifikat"
              >
                <i className="ri-close-line" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto space-y-5 py-4 pr-1">
              {/* Document Image */}
              <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-black border border-zinc-800 flex items-center justify-center p-2">
                <img
                  src={selectedCert.images?.[getImgIdx(selectedCert.id)]?.url || selectedCert.images?.[0]?.url}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnails */}
              {selectedCert.images && selectedCert.images.length > 1 && (
                <div className="flex gap-2">
                  {selectedCert.images.map((imgObj, idx) => {
                    const isCur = getImgIdx(selectedCert.id) === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActiveImgIdx((prev) => ({ ...prev, [selectedCert.id]: idx }));
                          playTactileClick();
                        }}
                        className={`h-12 w-16 rounded-lg overflow-hidden border transition-all ${
                          isCur ? 'border-white' : 'border-zinc-800 opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img src={imgObj.url} alt="Page" className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-400 mb-1">
                  Deskripsi Kredensial
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2">
                  Unit Kompetensi Teruji
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs font-mono text-zinc-500 truncate">
                ID: {selectedCert.credential_id}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(selectedCert.credential_id, selectedCert.title)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  Salin ID
                </button>

                {selectedCert.pdf_url && (
                  <a
                    href={selectedCert.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playTactileClick}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors"
                  >
                    Buka PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
