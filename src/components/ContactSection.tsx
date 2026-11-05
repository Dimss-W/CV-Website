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
    <section id="contact" className="py-20 sm:py-28 relative bg-[#06070a] overflow-hidden">
      {/* Background glow in Ruby Crimson & Scarlet */}
      <div className="glow-orb w-[500px] h-[500px] bg-rose-600/12 top-1/3 right-[-15%]" />
      <div className="glow-orb w-[500px] h-[500px] bg-red-600/10 bottom-10 left-[-15%]" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20 reveal-scale">
          <div className="section-tag">
            <i className="ri-mail-send-line text-rose-400" />
            <span>Kolaborasi &amp; Rekrutmen</span>
          </div>
          <h2 className="section-heading mb-4">
            Mari Mulai <span className="gradient-text-ruby">Kolaborasi Digital</span>
          </h2>
          <p className="section-description">
            Apakah Anda memiliki proyek inovatif, kebutuhan software engineer full-stack, 
            atau peluang karir profesional? Hubungi langsung via email resmi saya di bawah ini.
          </p>
        </div>

        {/* 2-Column Split Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Email Access Hub (5 Cols) with Reveal Left */}
          <div className="lg:col-span-5 space-y-5 reveal-left">
            {/* Availability Banner */}
            <div className="glass-panel p-6 border-rose-500/25 relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-indicator" />
                <span>Status Ketersediaan: Aktif</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Terbuka untuk Peluang Kerja &amp; Proyek
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Siap berkontribusi secara Full-Time, Kontrak, maupun Freelance dalam pengembangan 
                aplikasi Web, Mobile (Flutter), dan Analitika Data Enterprise.
              </p>
            </div>

            {/* Official Email Direct Card with 1-Click Copy */}
            <div className="glass-panel p-5 flex flex-col gap-4 border-rose-500/30">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-11 h-11 rounded-xl bg-rose-600/20 border border-rose-400/40 flex items-center justify-center text-rose-300 text-xl shrink-0">
                    <i className="ri-mail-check-fill" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono uppercase text-rose-400 block font-semibold">
                      Kanal Komunikasi Resmi
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white truncate block">
                      {contactEmail}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/15 hover:bg-rose-600/30 text-rose-300 border border-rose-400/30 text-xs font-mono transition-all shrink-0 flex items-center gap-1.5 active:scale-95"
                  title="Salin Alamat Email"
                >
                  <i className={emailCopied ? 'ri-checkbox-circle-line text-emerald-400' : 'ri-file-copy-line'} />
                  <span>{emailCopied ? 'Tersalin!' : 'Salin'}</span>
                </button>
              </div>

              {/* Direct Mailto Launcher */}
              <a
                href={`mailto:${contactEmail}?subject=Peluang%20Kolaborasi%20Proyek%20/%20Rekrutmen%20-%20Dimas%20Wijanarko`}
                onClick={playTactileClick}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-rose-600/20 border border-white/10 hover:border-rose-400/40 text-xs font-semibold text-slate-200 hover:text-white transition-all text-center"
              >
                <i className="ri-external-link-line text-rose-400" />
                <span>Buka Aplikasi Email &amp; Tulis Pesan</span>
              </a>
            </div>

            {/* Social Links Matrix */}
            <div className="glass-panel p-5">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block mb-3">
                Koneksi Jaringan Profesional
              </span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://github.com/Dimss-W"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playTactileClick}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 hover:border-white/20 flex flex-col items-center gap-1 text-center transition-all group"
                >
                  <i className="ri-github-fill text-xl text-slate-300 group-hover:text-white" />
                  <span className="text-xs font-medium text-slate-300">GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/in/dimas-wijanarko"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playTactileClick}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-rose-600/20 border border-white/8 hover:border-rose-400/35 flex flex-col items-center gap-1 text-center transition-all group"
                >
                  <i className="ri-linkedin-box-fill text-xl text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-slate-300 group-hover:text-rose-300">LinkedIn</span>
                </a>

                <a
                  href="https://instagram.com/dimsswijanark_"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playTactileClick}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-rose-500/20 border border-white/8 hover:border-rose-400/35 flex flex-col items-center gap-1 text-center transition-all group"
                >
                  <i className="ri-instagram-line text-xl text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-slate-300 group-hover:text-rose-300">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Interactive Form (7 Cols) with Reveal Right */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-9 relative reveal-right">
            <h3 className="text-xl font-bold text-white mb-2">
              Kirimkan Pesan atau Brief Proyek
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Isi formulir di bawah ini, saya akan meninjau dan merespons via email dalam kurun waktu 1x24 jam.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="user_name" className="text-xs font-mono text-slate-300 block mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    id="user_name"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.sender_name}
                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-rose-400 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="user_email" className="text-xs font-mono text-slate-300 block mb-1.5">
                    Alamat Email *
                  </label>
                  <input
                    id="user_email"
                    type="email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={formData.sender_email}
                    onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-rose-400 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="user_message" className="text-xs font-mono text-slate-300 block mb-1.5">
                  Pesan / Rincian Kebutuhan *
                </label>
                <textarea
                  id="user_message"
                  required
                  rows={5}
                  placeholder="Ceritakan gambaran proyek, target waktu pengerjaan, atau diskusi yang ingin dilakukan..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-rose-400 focus:bg-white/[0.06] transition-all resize-none"
                />
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-500/15 border border-emerald-400/40 text-emerald-300'
                      : 'bg-red-500/15 border border-red-400/40 text-red-300'
                  }`}
                >
                  <i
                    className={
                      statusMessage.type === 'success'
                        ? 'ri-checkbox-circle-fill text-base'
                        : 'ri-error-warning-fill text-base'
                    }
                  />
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 text-sm font-bold shadow-lg active:scale-98"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <i className="ri-loader-4-line animate-spin text-base" />
                    <span>Mengirimkan Pesan...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <i className="ri-send-plane-fill text-base" />
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
