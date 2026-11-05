'use client';

import React, { useState } from 'react';
import { Profile } from '@/types';
import { submitContactMessage } from '@/lib/data';

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email || 'dmswijanarko@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          text: 'Pesan gagal dikirim. Silakan hubungi langsung via email atau WhatsApp.',
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Pesan gagal dikirim. Silakan hubungi langsung via email atau WhatsApp.',
      });
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(null), 6000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Halo Dimas Wijanarko, saya tertarik dengan portofolio Anda dan ingin berdiskusi mengenai peluang proyek / kerja sama.'
  );

  return (
    <section id="contact" className="py-20 sm:py-28 relative bg-[#06090f] overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb w-[500px] h-[500px] bg-cyan-600/10 top-1/3 right-[-15%]" />
      <div className="glow-orb w-[500px] h-[500px] bg-indigo-600/10 bottom-10 left-[-15%]" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <div className="section-tag">
            <i className="ri-chat-smile-2-line text-cyan-400" />
            <span>Kolaborasi &amp; Rekrutmen</span>
          </div>
          <h2 className="section-heading mb-4">
            Mari Mulai <span className="gradient-text-cyan">Kolaborasi Digital</span>
          </h2>
          <p className="section-description">
            Apakah Anda memiliki proyek inovatif, kebutuhan software engineer full-stack, 
            atau peluang karir profesional? Saya siap berdiskusi dan memberikan dampak nyata.
          </p>
        </div>

        {/* 2-Column Split Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Access Hub (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Availability Banner */}
            <div className="glass-panel p-6 border-cyan-400/25 relative overflow-hidden">
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

            {/* Quick Email Copy Card */}
            <div className="glass-panel p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 truncate">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-lg shrink-0">
                  <i className="ri-mail-line" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Alamat Email Resmi
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                    {profile.email || 'dmswijanarko@gmail.com'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 text-xs font-mono transition-colors shrink-0 flex items-center gap-1.5"
                title="Salin Email ke Clipboard"
              >
                <i className={emailCopied ? 'ri-checkbox-circle-line text-emerald-400' : 'ri-file-copy-line'} />
                <span>{emailCopied ? 'Tersalin!' : 'Salin'}</span>
              </button>
            </div>

            {/* Direct WhatsApp Button */}
            <a
              href={`https://wa.me/6281210850284?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-5 flex items-center justify-between gap-3 hover:border-emerald-500/40 group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-xl shrink-0 group-hover:scale-105 transition-transform">
                  <i className="ri-whatsapp-line" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Respons Cepat
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Diskusi Langsung via WhatsApp
                  </span>
                </div>
              </div>

              <i className="ri-arrow-right-up-line text-slate-400 group-hover:text-emerald-300 text-lg transition-colors" />
            </a>

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
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 hover:border-white/20 flex flex-col items-center gap-1 text-center transition-all group"
                >
                  <i className="ri-github-fill text-xl text-slate-300 group-hover:text-white" />
                  <span className="text-xs font-medium text-slate-300">GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/in/dimas-wijanarko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-500/15 border border-white/8 hover:border-cyan-400/30 flex flex-col items-center gap-1 text-center transition-all group"
                >
                  <i className="ri-linkedin-box-fill text-xl text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-slate-300 group-hover:text-cyan-300">LinkedIn</span>
                </a>

                <a
                  href="https://instagram.com/dimsswijanark_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-pink-500/15 border border-white/8 hover:border-pink-400/30 flex flex-col items-center gap-1 text-center transition-all group"
                >
                  <i className="ri-instagram-line text-xl text-pink-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-slate-300 group-hover:text-pink-300">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Interactive Form (7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-9 relative">
            <h3 className="text-xl font-bold text-white mb-2">
              Kirimkan Pesan atau Brief Proyek
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Isi formulir di bawah ini, saya akan meninjau dan merespons dalam kurun waktu 1x24 jam.
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:bg-white/[0.06] transition-all"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:bg-white/[0.06] transition-all"
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
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:bg-white/[0.06] transition-all resize-none"
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
                className="w-full btn-primary py-3.5 text-sm font-bold shadow-lg"
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
