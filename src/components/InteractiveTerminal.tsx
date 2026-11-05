'use client';

import React, { useState } from 'react';
import { Profile } from '@/types';
import { Terminal, Copy, Check, Play, FileCode2, Cpu } from 'lucide-react';

interface InteractiveTerminalProps {
  profile: Profile;
  onCopySuccess?: (msg: string) => void;
}

export default function InteractiveTerminal({ profile, onCopySuccess }: InteractiveTerminalProps) {
  const [activeTab, setActiveTab] = useState<'config' | 'cli' | 'architecture'>('config');
  const [copied, setCopied] = useState(false);
  const [cliHistory, setCliHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: 'npx dimas-wijanarko --status',
      output: 'Full Stack Software Engineer | Flutter, Laravel, Next.js, Power BI',
    },
    {
      command: 'dimas.checkAvailability()',
      output: 'STATUS: TERSEDIA UNTUK KONTRAK & PELUANG FULL-TIME',
    },
  ]);

  const runCommand = (cmd: string) => {
    let out = '';
    if (cmd === 'dimas.getTechStack()') {
      out = '[Mobile: Flutter, Dart] | [Backend: Laravel, PHP, REST API] | [Frontend: Next.js, React] | [Data: Power BI]';
    } else if (cmd === 'dimas.hireMe()') {
      out = `Hubungi langsung via: ${profile.email} atau formulir kontak di bawah`;
    } else if (cmd === 'dimas.getPhilosophy()') {
      out = '"Arsitektur kode bersih, performa tinggi, dan pengalaman pengguna yang andal."';
    } else {
      out = `Perintah '${cmd}' berhasil dijalankan.`;
    }

    setCliHistory((prev) => [...prev, { command: cmd, output: out }]);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    if (onCopySuccess) {
      onCopySuccess(`Alamat email ${profile.email} berhasil disalin.`);
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl">
      {/* Title Bar & Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-zinc-800">
        {/* macOS dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-zinc-950 border border-zinc-800">
          <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
              activeTab === 'config'
                ? 'bg-zinc-800 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileCode2 size={12} />
            <span>developer.ts</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
              activeTab === 'cli'
                ? 'bg-zinc-800 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal size={12} />
            <span>cli.sh</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
              activeTab === 'architecture'
                ? 'bg-zinc-800 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Cpu size={12} />
            <span>architecture.json</span>
          </button>
        </div>

        {/* Copy Email Button */}
        <button
          onClick={copyEmail}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
            copied
              ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-400'
              : 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300'
          }`}
          title="Salin Email ke Clipboard"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Tersalin' : 'Salin Email'}</span>
        </button>
      </div>

      {/* Terminal Screen */}
      <div className="font-mono text-xs sm:text-sm leading-relaxed text-zinc-300 bg-zinc-950 p-4 rounded-xl border border-zinc-800 min-h-[200px] max-h-[240px] overflow-y-auto">
        {activeTab === 'config' && (
          <div className="space-y-1 animate-in fade-in duration-200">
            <div>
              <span className="text-zinc-400">export const</span>{' '}
              <span className="text-white font-semibold">softwareEngineer</span> = &#123;
            </div>
            <div className="pl-4">
              nama: <span className="text-zinc-300">&apos;{profile.full_name}&apos;</span>,
            </div>
            <div className="pl-4">
              peran: <span className="text-zinc-300">&apos;{profile.title}&apos;</span>,
            </div>
            <div className="pl-4">
              email: <span className="text-zinc-300">&apos;{profile.email}&apos;</span>,
            </div>
            <div className="pl-4">
              kampus: <span className="text-zinc-300">&apos;UBSI - Sistem Informasi (2023 - Sekarang)&apos;</span>,
            </div>
            <div className="pl-4">
              keahlian: [
              <span className="text-zinc-200">&apos;Flutter&apos;</span>,{' '}
              <span className="text-zinc-200">&apos;Dart&apos;</span>,{' '}
              <span className="text-zinc-200">&apos;Laravel&apos;</span>,{' '}
              <span className="text-zinc-200">&apos;Next.js&apos;</span>,{' '}
              <span className="text-zinc-200">&apos;Power BI&apos;</span>
              ],
            </div>
            <div className="pl-4">
              domisili: <span className="text-zinc-300">&apos;{profile.location}&apos;</span>,
            </div>
            <div className="pl-4">
              status: <span className="text-emerald-400">&apos;Terbuka untuk Kerja Sama & Proyek&apos;</span>,
            </div>
            <div className="pl-4">
              prestasi: <span className="text-zinc-300">&apos;Juara 1 IT Bootcamp Software Development 2025&apos;</span>
            </div>
            <div>&#125;;</div>
          </div>
        )}

        {activeTab === 'cli' && (
          <div className="animate-in fade-in duration-200">
            {cliHistory.map((item, i) => (
              <div key={i} className="mb-2.5">
                <div className="flex items-center gap-2 text-zinc-200">
                  <span className="text-zinc-500">❯</span>
                  <span>{item.command}</span>
                </div>
                <div className="text-zinc-400 text-xs pl-4 mt-0.5">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Quick Interactive Command Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-zinc-800">
              <button
                onClick={() => runCommand('dimas.getTechStack()')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs transition-colors"
              >
                <Play size={10} />
                <span>dimas.getTechStack()</span>
              </button>

              <button
                onClick={() => runCommand('dimas.getPhilosophy()')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs transition-colors"
              >
                <Play size={10} />
                <span>dimas.getPhilosophy()</span>
              </button>

              <button
                onClick={() => runCommand('dimas.hireMe()')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs transition-colors"
              >
                <Play size={10} />
                <span>dimas.hireMe()</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-1 animate-in fade-in duration-200">
            <span className="text-zinc-500">&#123;</span>
            <div className="pl-4">
              <span className="text-zinc-400">&quot;prinsipCoding&quot;</span>:{' '}
              <span className="text-zinc-200">&quot;Bersih, Terstruktur, Modular, Type-Safe&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-zinc-400">&quot;arsitekturMobile&quot;</span>:{' '}
              <span className="text-zinc-200">&quot;Flutter, Dart, Clean Architecture & BLoC&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-zinc-400">&quot;arsitekturBackend&quot;</span>:{' '}
              <span className="text-zinc-200">&quot;Laravel REST API, Relational DB & Supabase&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-zinc-400">&quot;analisisData&quot;</span>:{' '}
              <span className="text-zinc-200">&quot;Microsoft Power BI Executive Dashboard&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-zinc-400">&quot;standarKualitas&quot;</span>:{' '}
              <span className="text-zinc-200">&quot;Performa Tinggi, Pengalaman Pengguna Mulus&quot;</span>
            </div>
            <span className="text-zinc-500">&#125;</span>
          </div>
        )}
      </div>
    </div>
  );
}
