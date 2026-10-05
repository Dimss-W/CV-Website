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
      output: 'Full Stack Web Developer & Software Engineer | Next.js, React, Supabase, TypeScript',
    },
    {
      command: 'dimas.checkAvailability()',
      output: 'STATUS: READY FOR NEW CONTRACTS & FULL-TIME OPPORTUNITIES',
    },
  ]);

  const runCommand = (cmd: string) => {
    let out = '';
    if (cmd === 'dimas.getTechStack()') {
      out = '[Mobile & Web: Flutter, Dart, Next.js, React, Tailwind] | [Backend & DB: Laravel, PHP, Supabase, MySQL, PostgreSQL]';
    } else if (cmd === 'dimas.hireMe()') {
      out = `Hubungi langsung via: ${profile.email} atau formulir kontak di bawah`;
    } else if (cmd === 'dimas.getPhilosophy()') {
      out = '"Clean architecture, high-performance web, and delightful user experiences."';
    } else {
      out = `Command '${cmd}' executed successfully.`;
    }

    setCliHistory((prev) => [...prev, { command: cmd, output: out }]);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    if (onCopySuccess) {
      onCopySuccess(`Alamat email ${profile.email} berhasil disalin!`);
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass-card tilt-card p-6 border border-slate-800 bg-slate-900/60 shadow-xl shadow-black/40">
      {/* Title Bar & Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        {/* Mac OS Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950/80 border border-slate-800/80">
          <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
              activeTab === 'config'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode2 size={13} />
            <span>developer.ts</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
              activeTab === 'cli'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal size={13} />
            <span>cli.sh</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
              activeTab === 'architecture'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu size={13} />
            <span>architecture.json</span>
          </button>
        </div>

        {/* Copy Email Button */}
        <button
          onClick={copyEmail}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
            copied
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
              : 'bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700/60 text-slate-300'
          }`}
          title="Salin Email ke Clipboard"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copied!' : 'Copy Email'}</span>
        </button>
      </div>

      {/* Terminal Screen */}
      <div className="font-mono text-xs sm:text-sm leading-relaxed text-slate-300 bg-slate-950/90 p-4 rounded-xl border border-slate-800/90 min-h-[220px] max-h-[250px] overflow-y-auto">
        {activeTab === 'config' && (
          <div className="space-y-1 animate-in fade-in duration-300">
            <div>
              <span className="text-purple-400">export const</span>{' '}
              <span className="text-sky-400">softwareEngineer</span> = &#123;
            </div>
            <div className="pl-4">
              nama: <span className="text-emerald-400">&apos;{profile.full_name}&apos;</span>,
            </div>
            <div className="pl-4">
              peran: <span className="text-emerald-400">&apos;{profile.title}&apos;</span>,
            </div>
            <div className="pl-4">
              email: <span className="text-emerald-400">&apos;{profile.email}&apos;</span>,
            </div>
            <div className="pl-4">
              kampus: <span className="text-emerald-400">&apos;UBSI - Sistem Informasi (2023 - Sekarang)&apos;</span>,
            </div>
            <div className="pl-4">
              keahlian: [
              <span className="text-amber-300">&apos;Flutter&apos;</span>,{' '}
              <span className="text-amber-300">&apos;Dart&apos;</span>,{' '}
              <span className="text-amber-300">&apos;Laravel&apos;</span>,{' '}
              <span className="text-amber-300">&apos;PHP&apos;</span>,{' '}
              <span className="text-amber-300">&apos;Next.js&apos;</span>,{' '}
              <span className="text-amber-300">&apos;Power BI&apos;</span>,{' '}
              <span className="text-amber-300">&apos;MySQL&apos;</span>
              ],
            </div>
            <div className="pl-4">
              domisili: <span className="text-emerald-400">&apos;{profile.location}&apos;</span>,
            </div>
            <div className="pl-4">
              status: <span className="text-indigo-400">&apos;Terbuka untuk Kerja Sama & Proyek&apos;</span>,
            </div>
            <div className="pl-4">
              prestasi: <span className="text-emerald-400">&apos;Juara 1 IT Bootcamp Software Development 2025&apos;</span>
            </div>
            <div>&#125;;</div>
          </div>
        )}

        {activeTab === 'cli' && (
          <div className="animate-in fade-in duration-300">
            {cliHistory.map((item, i) => (
              <div key={i} className="mb-3">
                <div className="flex items-center gap-2 text-sky-400">
                  <span className="text-purple-400">❯</span>
                  <span>{item.command}</span>
                </div>
                <div className="text-slate-400 text-xs pl-4 mt-0.5">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Quick Interactive Command Buttons */}
            <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t border-slate-800">
              <button
                onClick={() => runCommand('dimas.getTechStack()')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-sky-400 text-xs transition-colors active:scale-95"
              >
                <Play size={10} className="fill-sky-400" />
                <span>dimas.getTechStack()</span>
              </button>

              <button
                onClick={() => runCommand('dimas.getPhilosophy()')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-purple-300 text-xs transition-colors active:scale-95"
              >
                <Play size={10} className="fill-purple-300" />
                <span>dimas.getPhilosophy()</span>
              </button>

              <button
                onClick={() => runCommand('dimas.hireMe()')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-emerald-400 text-xs transition-colors active:scale-95"
              >
                <Play size={10} className="fill-emerald-400" />
                <span>dimas.hireMe()</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-1 animate-in fade-in duration-300">
            <span className="text-amber-400">&#123;</span>
            <div className="pl-4">
              <span className="text-sky-400">&quot;prinsipCoding&quot;</span>:{' '}
              <span className="text-emerald-400">&quot;Bersih, Terstruktur, Modular, Type-Safe&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-sky-400">&quot;arsitekturMobile&quot;</span>:{' '}
              <span className="text-emerald-400">&quot;Flutter, Dart, Clean Architecture & BLoC&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-sky-400">&quot;arsitekturBackend&quot;</span>:{' '}
              <span className="text-emerald-400">&quot;Laravel REST API, Relational DB & Supabase&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-sky-400">&quot;analisisData&quot;</span>:{' '}
              <span className="text-emerald-400">&quot;Microsoft Power BI Executive Dashboard&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-sky-400">&quot;standarKualitas&quot;</span>:{' '}
              <span className="text-emerald-400">&quot;Performa Tinggi, Pengalaman Pengguna Mulus&quot;</span>
            </div>
            <span className="text-amber-400">&#125;</span>
          </div>
        )}
      </div>
    </div>
  );
}
