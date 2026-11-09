'use client';

import React, { useState } from 'react';
import { Profile } from '@/types';
import { submitContactMessage } from '@/lib/data';
import { playTactileClick } from '@/lib/sound';

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const contactEmail = profile.email || 'dmswijanarko@gmail.com';

  const handleCopyEmail = () => {
    playTactileClick();
    navigator.clipboard.writeText(contactEmail);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    if (!formData.sender_name || !formData.sender_email || !formData.message) {
      setStatusMessage({ type: 'error', text: 'Mohon lengkapi Nama, Email, dan Pesan Anda.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await submitContactMessage({
        sender_name: formData.sender_name,
        sender_email: formData.sender_email,
        subject: `Pesan baru dari ${formData.sender_name} via Portfolio`,
        message: formData.message,
      });

      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: 'Terima kasih! Pesan Anda telah terkirim langsung ke Dimas Wijanarko.',
        });
        setFormData({ sender_name: '', sender_email: '', message: '' });
      } else {
        setStatusMessage({
          type: 'error',
          text: `Pesan gagal dikirim. Silakan hubungi langsung via email ke ${contactEmail}.`,
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: `Pesan gagal dikirim. Silakan hubungi langsung via email ke ${contactEmail}.`,
      });
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(null), 6000);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative border-t border-zinc-800/80">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16 reveal-on-scroll">
          <div className="section-tag">
            <span>Kontak &amp; Kolaborasi</span>
          </div>
          <h2 className="section-heading mb-4">
            Mari Terhubung &amp; Berdiskusi
          </h2>
          <p className="section-description">
            Apakah Anda memiliki proyek aplikasi, kebutuhan software engineer, 
            atau peluang karir profesional? Hubungi saya langsung melalui formulir atau email resmi di bawah ini.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Direct Access Hub (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 reveal-left">
            {/* Availability Banner */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator" />
                <span>Ketersediaan: Aktif</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Terbuka untuk Peluang Kerja &amp; Proyek
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Siap berkontribusi secara Full-Time, Kontrak, maupun Freelance dalam pengembangan 
                aplikasi Web, Mobile (Flutter), dan Analitika Data Enterprise.
              </p>
            </div>

            {/* Official Email Direct Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 text-lg shrink-0">
                    <i className="ri-mail-line" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                      Email Resmi
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                      {contactEmail}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono transition-colors shrink-0 flex items-center gap-1.5 active:scale-95"
                  title="Salin Alamat Email"
                >
                  <i className={emailCopied ? 'ri-check-line text-emerald-400' : 'ri-file-copy-line'} />
                  <span>{emailCopied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              {/* Direct Mailto */}
              <a
                href={`mailto:${contactEmail}?subject=Diskusi%20Peluang%20Proyek%20/%20Rekrutmen%20-%20Dimas%20Wijanarko`}
                onClick={playTactileClick}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors text-center"
              >
                <i className="ri-external-link-line text-xs text-zinc-400" />
                <span>Buka Aplikasi Email</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider block mb-3">
                Jaringan Profesional
              </span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com/Dimss-W"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playTactileClick}
                  className="p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 flex flex-col items-center gap-1 text-center transition-colors group"
                >
                  <i className="ri-github-fill text-lg text-zinc-400 group-hover:text-white" />
                  <span className="text-xs font-medium text-zinc-300">GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/in/dmswijanarko"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playTactileClick}
                  className="p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 flex flex-col items-center gap-1 text-center transition-colors group"
                >
                  <i className="ri-linkedin-box-fill text-lg text-zinc-400 group-hover:text-white" />
                  <span className="text-xs font-medium text-zinc-300">LinkedIn</span>
                </a>

                <a
                  href="https://instagram.com/dimsswijanark_"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playTactileClick}
                  className="p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 flex flex-col items-center gap-1 text-center transition-colors group"
                >
                  <i className="ri-instagram-line text-lg text-zinc-400 group-hover:text-white" />
                  <span className="text-xs font-medium text-zinc-300">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Form (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 reveal-right delay-100 spotlight-card">
            <h3 className="text-lg font-semibold text-white mb-1.5">
              Kirimkan Pesan atau Brief Kebutuhan
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Silakan kirimkan pesan, saya akan membalas via email dalam 1x24 jam.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="user_name" className="text-xs font-mono text-zinc-300 block mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    id="user_name"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.sender_name}
                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:border-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="user_email" className="text-xs font-mono text-zinc-300 block mb-1.5">
                    Alamat Email *
                  </label>
                  <input
                    id="user_email"
                    type="email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={formData.sender_email}
                    onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:border-zinc-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="user_message" className="text-xs font-mono text-zinc-300 block mb-1.5">
                  Pesan / Rincian Kebutuhan *
                </label>
                <textarea
                  id="user_message"
                  required
                  rows={5}
                  placeholder="Ceritakan gambaran proyek atau topik yang ingin didiskusikan..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:border-zinc-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                      : 'bg-red-950/60 border border-red-800 text-red-300'
                  }`}
                >
                  <i
                    className={
                      statusMessage.type === 'success'
                        ? 'ri-check-line text-base'
                        : 'ri-error-warning-line text-base'
                    }
                  />
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-sm font-semibold active:scale-98"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <i className="ri-loader-4-line animate-spin text-base" />
                    <span>Mengirimkan Pesan...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <i className="ri-send-plane-line text-base" />
                    <span>Kirim Pesan Sekarang</span>
                  </span>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
