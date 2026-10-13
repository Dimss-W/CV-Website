'use client';

import React, { useState, useEffect } from 'react';
import { Certificate } from '@/types';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

function getCertFocalPoint(url: string): string {
  if (url.includes('juara-1-bootcamp-penyerahan-piala')) return '50% 60%';
  if (url.includes('juara-1-bootcamp-tim-outdoor')) return '50% 72%';
  if (url.includes('serkom-database-administrator-units')) return '50% 22%';
  if (url.includes('serkom-database-administrator')) return '50% 32%';
  return '50% 50%';
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [activeImageMap, setActiveImageMap] = useState<Record<string, number>>({});
  const [expandedCerts, setExpandedCerts] = useState<Record<string, boolean>>({});
  const [pausedCardId, setPausedCardId] = useState<string | null>(null);
  const [modalCert, setModalCert] = useState<Certificate | null>(null);
  const [modalPageIndex, setModalPageIndex] = useState<number>(0);

  const toggleExpandCert = (id: string) => {
    setExpandedCerts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageMap((prev) => {
        const next = { ...prev };
        certificates.forEach((cert) => {
          if (cert.images.length > 1 && pausedCardId !== cert.id && !modalCert) {
            const current = prev[cert.id] ?? 0;
            next[cert.id] = (current + 1) % cert.images.length;
          }
        });
        return next;
      });
    }, 5200);
    return () => clearInterval(timer);
  }, [certificates, pausedCardId, modalCert]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalCert(null);
    };
    if (modalCert) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [modalCert]);

  return (
    <section className="section" id="certificates">
      <h2 className="section__title reveal-init">
        Sertifikat & <span>Penghargaan</span>
      </h2>

      <div className="container grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto items-start gap-6">
        {certificates.map((cert, index) => {
          const currentPage = activeImageMap[cert.id] ?? 0;
          const currentImg = cert.images[currentPage] || cert.images[0];
          const num = String(index + 1).padStart(2, '0');
          const certKey = cert.id || cert.title;
          const isExpanded = !!expandedCerts[certKey];

          return (
            <article
              key={cert.id}
              className={`work__card flex flex-col ${isExpanded ? 'is-expanded' : ''}`}
              onMouseEnter={() => setPausedCardId(cert.id)}
              onMouseLeave={() => setPausedCardId(null)}
            >
              {/* Uniform Landscape Preview Frame with Centered Subject Focus */}
              <div
                className="work__link group relative overflow-hidden"
                onClick={() => {
                  setModalCert(cert);
                  setModalPageIndex(currentPage);
                }}
              >
                {/* Silky-smooth GPU Horizontal Slide Track */}
                <div
                  className="flex w-full h-full will-change-transform"
                  style={{
                    transform: `translate3d(-${currentPage * 100}%, 0, 0)`,
                    transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {cert.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-full h-full shrink-0 overflow-hidden bg-black/40"
                    >
                      <img
                        src={img.url}
                        alt={`${cert.title} - ${img.title}`}
                        style={{ objectPosition: getCertFocalPoint(img.url) }}
                        className="work__img w-full h-full object-cover transition-transform duration-700 ease-out"
                      />
                    </div>
                  ))}
                </div>

                <div className="work__arrow" title="Lihat Ukuran Penuh">
                  <i className="ri-arrow-right-up-line" />
                </div>

                {cert.images.length > 1 && (
                  <div
                    className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] text-white/90 truncate max-w-[70%] transition-all duration-300">
                      {currentImg.title}
                    </span>

                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/75 backdrop-blur-md pointer-events-auto">
                      {cert.images.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          aria-label={`Halaman ${dotIdx + 1}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageMap((p) => ({ ...p, [cert.id]: dotIdx }));
                          }}
                          className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                            currentPage === dotIdx
                              ? 'w-5 bg-[var(--first-color)] shadow-[0_0_8px_var(--first-color)]'
                              : 'w-1.5 bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="work__data flex flex-col flex-grow">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="work__number !mb-0">{num}</span>
                  <span className="px-3 py-1 rounded-full border border-[var(--first-color)] text-xs font-semibold text-white truncate">
                    {cert.badge}
                  </span>
                </div>

                <h3 className="work__name mt-2">{cert.title}</h3>
                <p className="text-xs text-[var(--first-color)] font-medium mb-2 min-h-[2.6em] line-clamp-2 leading-snug">
                  {cert.issuer} • {cert.issue_date}
                </p>

                <p className="text-xs text-[var(--text-color)]/95 leading-relaxed min-h-[4.4em] line-clamp-3 mb-1">
                  {cert.description}
                </p>

                <div
                  className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pt-2 pb-2 text-xs text-white/90 leading-relaxed border-t border-white/10 mt-1 mb-2 bg-white/[0.03] px-3 py-2 rounded-xl border border-white/5">
                      <span className="text-[var(--first-color)] font-semibold block mb-1 text-[11px]">
                        Rincian Kompetensi & Penjelasan:
                      </span>
                      <p className="text-[var(--text-color)]/95 leading-relaxed">
                        {cert.details || cert.description}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleExpandCert(certKey)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--first-color)] hover:text-white transition-colors mb-3 self-start py-1 px-2 -ml-2 rounded-lg hover:bg-white/5 cursor-pointer group"
                >
                  <span>{isExpanded ? 'Tutup Detail' : 'Lihat Detail'}</span>
                  <i
                    className={`ri-arrow-down-s-line text-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isExpanded ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-3 border-t border-white/10">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--first-color)]/35 bg-[var(--first-color)]/5 text-white/90 font-medium whitespace-nowrap shadow-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="blob-big" />
            </article>
          );
        })}
      </div>

      {/* Fullscreen Uncropped Lightbox Modal */}
      {modalCert && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
          onClick={() => setModalCert(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[94vh] bg-[var(--container-color)] border border-white/15 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10">
              <div className="min-w-0">
                <h4 className="font-semibold text-white text-sm sm:text-base truncate">
                  {modalCert.title}
                </h4>
                <p className="text-xs text-[var(--first-color)] truncate mt-0.5">
                  {modalCert.credential_id} • {modalCert.issuer}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalCert(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--first-color)] hover:text-black text-white grid place-items-center transition-colors shrink-0"
                aria-label="Tutup"
              >
                <i className="ri-close-large-line" />
              </button>
            </div>

            <div className="lightbox-body">
              <img
                src={modalCert.images[modalPageIndex]?.url}
                alt={modalCert.title}
                className="lightbox-img"
              />
            </div>

            {modalCert.images.length > 1 && (
              <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setModalPageIndex(
                      (prev) => (prev - 1 + modalCert.images.length) % modalCert.images.length
                    )
                  }
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[var(--first-color)] hover:text-black text-xs font-semibold text-white transition-colors flex items-center gap-1"
                >
                  <i className="ri-arrow-left-s-line" />
                  <span>Sebelumnya</span>
                </button>

                <span className="text-xs text-white/70 truncate">
                  {modalCert.images[modalPageIndex]?.title}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setModalPageIndex((prev) => (prev + 1) % modalCert.images.length)
                  }
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[var(--first-color)] hover:text-black text-xs font-semibold text-white transition-colors flex items-center gap-1"
                >
                  <span>Selanjutnya</span>
                  <i className="ri-arrow-right-s-line" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
