'use client';

import React, { useState, useEffect } from 'react';
import { Certificate } from '@/types';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [activeImageMap, setActiveImageMap] = useState<Record<string, number>>({});
  const [pausedCardId, setPausedCardId] = useState<string | null>(null);
  const [modalCert, setModalCert] = useState<Certificate | null>(null);
  const [modalPageIndex, setModalPageIndex] = useState<number>(0);

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

      <div className="container grid grid-cols-1 lg:grid-cols-2 auto-rows-fr gap-8 reveal-init">
        {certificates.map((cert, index) => {
          const currentPage = activeImageMap[cert.id] ?? 0;
          const currentImg = cert.images[currentPage] || cert.images[0];
          const num = String(index + 1).padStart(2, '0');

          return (
            <article
              key={cert.id}
              className="work__card h-full"
              onMouseEnter={() => setPausedCardId(cert.id)}
              onMouseLeave={() => setPausedCardId(null)}
            >
              {/* Uniform Landscape Preview Frame with Bianca Hover Arrow */}
              <div
                className="work__link"
                onClick={() => {
                  setModalCert(cert);
                  setModalPageIndex(currentPage);
                }}
              >
                {cert.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={`${cert.title} - ${img.title}`}
                    className={`work__img absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-in-out ${
                      i === currentPage
                        ? 'opacity-100 scale-100 z-[2]'
                        : 'opacity-0 scale-105 z-[1] pointer-events-none'
                    }`}
                  />
                ))}

                <div className="work__arrow" title="Lihat Ukuran Penuh">
                  <i className="ri-arrow-right-up-line" />
                </div>

                {cert.images.length > 1 && (
                  <div
                    className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] text-white/90 truncate max-w-[70%]">
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
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            currentPage === dotIdx
                              ? 'w-4 bg-[var(--first-color)]'
                              : 'w-1.5 bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="work__data">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="work__number !mb-0">{num}</span>
                  <span className="px-3 py-1 rounded-full border border-[var(--first-color)] text-xs font-semibold text-white truncate">
                    {cert.badge}
                  </span>
                </div>

                <h3 className="work__name mt-2">{cert.title}</h3>
                <p className="text-xs text-[var(--first-color)] font-medium mb-2 truncate">
                  {cert.issuer} • {cert.issue_date}
                </p>

                <p className="work__description">{cert.description}</p>

                <ul className="services__list mt-auto pt-3 border-t border-white/10">
                  {cert.skills.slice(0, 4).map((s) => (
                    <li key={s} className="services__item !text-xs">
                      {s}
                    </li>
                  ))}
                </ul>
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

            <div className="p-3 sm:p-6 overflow-auto flex items-center justify-center bg-black/70 max-h-[75vh]">
              <img
                src={modalCert.images[modalPageIndex]?.url}
                alt={modalCert.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
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
