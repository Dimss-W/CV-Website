'use client';

import React, { useState } from 'react';
import { Profile } from '@/types';
import { submitContactMessage } from '@/lib/data';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { GithubIcon, InstagramIcon } from './Icons';

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sender_name || !formData.sender_email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Mohon lengkapi Nama, Email, dan Pesan Anda.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setStatus({
          type: 'success',
          message: 'Pesan berhasil terkirim! Terima kasih telah menghubungi saya.',
        });
        setFormData({
          sender_name: '',
          sender_email: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: res.message || 'Gagal mengirim pesan. Silakan coba lagi.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Terjadi gangguan jaringan saat mengirim pesan.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Bedimcode Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-init">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
            <Mail size={14} />
            <span>Kirim Pesan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-syne text-slate-100 tracking-tight mb-4">
            Hubungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Saya</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Tertarik untuk berkolaborasi, mendiskusikan peluang kerja sama proyek, atau kebutuhan rekrutmen? Saya siap membantu Anda.
          </p>
        </div>

        {/* Content Grid: Left Cards + Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Left Column: Bedimcode "Talk to me" Cards */}
          <div className="lg:col-span-5 reveal-init flex flex-col gap-4">
            <h3 className="font-syne font-bold text-xl text-slate-100 mb-2">
              Mari Diskusi Proyek
            </h3>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Mail size={20} />
              </div>
              <h4 className="font-syne font-bold text-sm text-slate-200">Email Langsung</h4>
              <p className="text-xs text-slate-400 mt-0.5 break-all">{profile.email}</p>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 mt-4 transition-colors"
              >
                <span>Tulis email</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                <Phone size={20} />
              </div>
              <h4 className="font-syne font-bold text-sm text-slate-200">WhatsApp / Telepon</h4>
              <p className="text-xs text-slate-400 mt-0.5">085794770824</p>
              <a
                href="https://wa.me/6285794770824"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 mt-4 transition-colors"
              >
                <span>Chat WhatsApp</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Instagram Card */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-pink-500/40 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mb-3">
                <InstagramIcon size={20} />
              </div>
              <h4 className="font-syne font-bold text-sm text-slate-200">Instagram</h4>
              <p className="text-xs text-slate-400 mt-0.5">@dimsswijanark_</p>
              <a
                href="https://instagram.com/dimsswijanark_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300 mt-4 transition-colors"
              >
                <span>Ikuti di Instagram</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* GitHub Card */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                <GithubIcon size={20} />
              </div>
              <h4 className="font-syne font-bold text-sm text-slate-200">GitHub Profile</h4>
              <p className="text-xs text-slate-400 mt-0.5">github.com/Dimss-W</p>
              <a
                href={profile.github_url || 'https://github.com/Dimss-W'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mt-4 transition-colors"
              >
                <span>Kunjungi Repositori</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Bedimcode Styled Form */}
          <div className="lg:col-span-7 reveal-init reveal-delay-1">
            <div className="p-7 sm:p-9 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-xl">
              <h3 className="font-syne font-bold text-xl text-slate-100 mb-6">
                Kirim Pesan Anda
              </h3>

              {status.type && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 mb-6 text-xs sm:text-sm font-medium ${
                    status.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 size={18} className="shrink-0" />
                  ) : (
                    <AlertCircle size={18} className="shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-syne font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={formData.sender_name}
                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                    placeholder="Contoh: Dimas Wijanarko"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-syne font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    value={formData.sender_email}
                    onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-syne font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Subjek Proyek / Pesan
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Diskusi Proyek Web / Penawaran Kerjasama"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-syne font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Pesan Detail
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan ide proyek, estimasi waktu, atau pertanyaan teknis Anda..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-98"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-slate-950" />
                      <span>Mengirimkan Pesan...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Pesan Sekarang</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
