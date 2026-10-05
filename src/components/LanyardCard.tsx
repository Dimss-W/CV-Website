'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Profile } from '@/types';
import { Award, Mic, QrCode, Sparkles, Terminal, ShieldCheck, MapPin, Cpu, CheckCircle2, ExternalLink } from 'lucide-react';
import InteractiveTerminal from './InteractiveTerminal';

interface LanyardCardProps {
  profile: Profile;
  onCopySuccess?: (msg: string) => void;
}

export default function LanyardCard({ profile, onCopySuccess }: LanyardCardProps) {
  const [viewMode, setViewMode] = useState<'lanyard' | 'terminal'>('lanyard');

  // Dynamic Supple Physics State
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [tilt3D, setTilt3D] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Mutable Physics Refs for Silky 60fps Loop
  const posRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef(0);
  const targetRotRef = useRef(0);
  const tiltRef = useRef({ x: 0, y: 0 });
  const targetTiltRef = useRef({ x: 0, y: 0 });

  const isDraggingRef = useRef(false);
  const isSimulatingRef = useRef(false);
  const velocityRef = useRef({ vx: 0, vy: 0, vr: 0 });
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0, time: 0 });
  const animFrameRef = useRef<number | null>(null);
  const idleTimeRef = useRef(0);

  // Main Continuous Silky Physics Engine Loop
  useEffect(() => {
    let active = true;

    const physicsLoop = () => {
      if (!active) return;

      if (viewMode === 'lanyard') {
        if (isDraggingRef.current) {
          // DRAGGING STATE: Ultra-Smooth, Low-Sensitivity Supple Lag (LERP interpolation)
          const lerpFactor = 0.16;
          const rotLerp = 0.14;
          const tiltLerp = 0.12;

          posRef.current.x += (targetPosRef.current.x - posRef.current.x) * lerpFactor;
          posRef.current.y += (targetPosRef.current.y - posRef.current.y) * lerpFactor;
          rotRef.current += (targetRotRef.current - rotRef.current) * rotLerp;
          tiltRef.current.x += (targetTiltRef.current.x - tiltRef.current.x) * tiltLerp;
          tiltRef.current.y += (targetTiltRef.current.y - tiltRef.current.y) * tiltLerp;

          setPosition({ x: posRef.current.x, y: posRef.current.y });
          setRotation(rotRef.current);
          setTilt3D({ x: tiltRef.current.x, y: tiltRef.current.y });
        } else if (isSimulatingRef.current) {
          // REBOUND STATE: Gentle, supple underdamped harmonic spring bounce
          const tensionK = 0.075;
          const friction = 0.925;
          const rotTension = 0.065;
          const rotFriction = 0.92;

          // Restoring forces
          const ax = -tensionK * posRef.current.x;
          const ay = -tensionK * posRef.current.y;
          const ar = -rotTension * rotRef.current - (posRef.current.x * 0.008);

          velocityRef.current.vx = (velocityRef.current.vx + ax) * friction;
          velocityRef.current.vy = (velocityRef.current.vy + ay) * friction;
          velocityRef.current.vr = (velocityRef.current.vr + ar) * rotFriction;

          posRef.current.x += velocityRef.current.vx;
          posRef.current.y += velocityRef.current.vy;
          rotRef.current += velocityRef.current.vr;

          tiltRef.current.x = tiltRef.current.x * 0.88 + (-posRef.current.y * 0.03 + velocityRef.current.vy * 0.2) * 0.12;
          tiltRef.current.y = tiltRef.current.y * 0.88 + (posRef.current.x * 0.04 + velocityRef.current.vx * 0.2) * 0.12;

          setPosition({ x: posRef.current.x, y: posRef.current.y });
          setRotation(rotRef.current);
          setTilt3D({ x: tiltRef.current.x, y: tiltRef.current.y });

          const energy =
            Math.abs(posRef.current.x) +
            Math.abs(posRef.current.y) +
            Math.abs(velocityRef.current.vx) +
            Math.abs(velocityRef.current.vy) +
            Math.abs(rotRef.current);

          if (energy <= 0.06) {
            posRef.current = { x: 0, y: 0 };
            rotRef.current = 0;
            tiltRef.current = { x: 0, y: 0 };
            setPosition({ x: 0, y: 0 });
            setRotation(0);
            setTilt3D({ x: 0, y: 0 });
            isSimulatingRef.current = false;
          }
        } else {
          // IDLE STATE: Subtle ambient breathing sway
          idleTimeRef.current += 0.028;
          const idleX = Math.sin(idleTimeRef.current) * 1.6;
          const idleY = Math.cos(idleTimeRef.current * 0.6) * 0.9;
          const idleRot = Math.sin(idleTimeRef.current * 0.8) * 0.6;

          posRef.current = { x: idleX, y: idleY };
          rotRef.current = idleRot;
          setPosition({ x: idleX, y: idleY });
          setRotation(idleRot);
        }
      }

      animFrameRef.current = requestAnimationFrame(physicsLoop);
    };

    animFrameRef.current = requestAnimationFrame(physicsLoop);
    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [viewMode]);

  // Handle Drag Start
  const handleStart = (clientX: number, clientY: number) => {
    if (viewMode !== 'lanyard') return;
    setIsDragging(true);
    isDraggingRef.current = true;
    isSimulatingRef.current = false;

    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      posX: posRef.current.x,
      posY: posRef.current.y,
    };
    lastMousePosRef.current = {
      x: clientX,
      y: clientY,
      time: performance.now(),
    };
    velocityRef.current = { vx: 0, vy: 0, vr: 0 };
  };

  // Handle Drag Move: Smooth supple movement
  const handleMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastMousePosRef.current.time, 8);

    const instantVx = ((clientX - lastMousePosRef.current.x) / dt) * 16;
    const instantVy = ((clientY - lastMousePosRef.current.y) / dt) * 16;
    velocityRef.current.vx = instantVx * 0.55 + velocityRef.current.vx * 0.45;
    velocityRef.current.vy = instantVy * 0.55 + velocityRef.current.vy * 0.45;

    lastMousePosRef.current = { x: clientX, y: clientY, time: now };

    const rawDx = clientX - dragStartRef.current.mouseX;
    const rawDy = clientY - dragStartRef.current.mouseY;

    const stretchFactor = 0.62;
    const dampX = rawDx * stretchFactor;
    const dampY = rawDy > 0 ? rawDy * stretchFactor : Math.max(rawDy * 0.35, -28);

    const targetRot = Math.min(Math.max(dampX * 0.08, -18), 18);
    const targetTiltX = Math.min(Math.max(-dampY * 0.04, -10), 10);
    const targetTiltY = Math.min(Math.max(dampX * 0.05, -12), 12);

    targetPosRef.current = { x: dampX, y: dampY };
    targetRotRef.current = targetRot;
    targetTiltRef.current = { x: targetTiltX, y: targetTiltY };
  };

  // Handle Drag End: Smooth spring return
  const handleEnd = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    isSimulatingRef.current = true;

    velocityRef.current.vx = Math.min(Math.max(velocityRef.current.vx, -22), 22);
    velocityRef.current.vy = Math.min(Math.max(velocityRef.current.vy, -22), 22);
    velocityRef.current.vr = velocityRef.current.vx * 0.28;
  };

  // Global window mouse & touch listeners
  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) handleMove(e.clientX, e.clientY);
    };
    const onWindowMouseUp = () => {
      if (isDraggingRef.current) handleEnd();
    };

    const onWindowTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onWindowTouchEnd = () => {
      if (isDraggingRef.current) handleEnd();
    };

    window.addEventListener('mousemove', onWindowMouseMove, { passive: true });
    window.addEventListener('mouseup', onWindowMouseUp);
    window.addEventListener('touchmove', onWindowTouchMove, { passive: true });
    window.addEventListener('touchend', onWindowTouchEnd);
    window.addEventListener('touchcancel', onWindowTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
      window.removeEventListener('touchmove', onWindowTouchMove);
      window.removeEventListener('touchend', onWindowTouchEnd);
      window.removeEventListener('touchcancel', onWindowTouchEnd);
    };
  }, []);

  // Center anchor point calculations for dual-ribbon lanyard SVG
  const anchorLeftX = 155;
  const anchorRightX = 205;
  const anchorY = 0;
  const clipX = 180 + position.x;
  const clipY = 78 + position.y;

  const sag = Math.max(22, 34 - position.y * 0.2);
  const leftCtrlX = anchorLeftX + position.x * 0.35 - sag * 0.25;
  const leftCtrlY = (anchorY + clipY) * 0.45;
  const rightCtrlX = anchorRightX + position.x * 0.35 + sag * 0.25;
  const rightCtrlY = (anchorY + clipY) * 0.45;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Modern Pill Switcher: Lanyard vs Terminal */}
      <div className="flex items-center gap-1 p-1 bg-slate-950/90 border border-slate-800/90 rounded-full mb-4 z-20 shadow-xl backdrop-blur-md">
        <button
          onClick={() => setViewMode('lanyard')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            viewMode === 'lanyard'
              ? 'bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles size={13} />
          <span>Modern Dev Badge</span>
        </button>

        <button
          onClick={() => setViewMode('terminal')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            viewMode === 'terminal'
              ? 'bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal size={13} />
          <span>Interactive CLI</span>
        </button>
      </div>

      {viewMode === 'terminal' ? (
        <div className="w-full animate-in fade-in zoom-in-95 duration-300">
          <InteractiveTerminal profile={profile} onCopySuccess={onCopySuccess} />
        </div>
      ) : (
        <div
          ref={containerRef}
          className="relative w-full max-w-sm flex flex-col items-center pt-4 pb-2 select-none touch-none"
          style={{ perspective: '1100px' }}
        >
          {/* Top Industrial Mount / Stealth Anchor */}
          <div className="absolute top-0 w-24 h-3 bg-gradient-to-b from-slate-800 to-slate-950 rounded-b-md border-x border-b border-slate-700/80 shadow-xl z-30 flex items-center justify-between px-3">
            <div className="w-2 h-1 bg-sky-400/80 rounded-full shadow-[0_0_6px_#38bdf8]" />
            <div className="text-[7px] font-mono tracking-widest text-slate-500 uppercase">DEV-SYS</div>
            <div className="w-2 h-1 bg-emerald-400/80 rounded-full shadow-[0_0_6px_#34d399]" />
          </div>

          {/* Dynamic Modern Woven Jacquard Straps (SVG) */}
          <svg
            className="absolute top-2 w-full h-36 pointer-events-none z-10 overflow-visible"
            viewBox="0 0 360 144"
          >
            <defs>
              {/* Futuristic Cyber Carbon & Indigo-Cyan Ribbon Gradient */}
              <linearGradient id="modernStrapGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="40%" stopColor="#4338ca" />
                <stop offset="85%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="modernStrapGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0369a1" />
                <stop offset="40%" stopColor="#6366f1" />
                <stop offset="85%" stopColor="#312e81" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
              <filter id="modernRibbonShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.7" />
              </filter>
            </defs>

            {/* Left Strap - Main Ribbon Body */}
            <path
              d={`M ${anchorLeftX} ${anchorY} Q ${leftCtrlX} ${leftCtrlY} ${clipX - 3} ${clipY}`}
              fill="none"
              stroke="url(#modernStrapGradLeft)"
              strokeWidth="15"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#modernRibbonShadow)"
            />
            {/* Left Strap - Edge Highlighting */}
            <path
              d={`M ${anchorLeftX} ${anchorY} Q ${leftCtrlX} ${leftCtrlY} ${clipX - 3} ${clipY}`}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
            {/* Left Strap - Jacquard Tech Dash Pattern */}
            <path
              d={`M ${anchorLeftX} ${anchorY} Q ${leftCtrlX} ${leftCtrlY} ${clipX - 3} ${clipY}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeOpacity="0.4"
            />

            {/* Right Strap - Main Ribbon Body */}
            <path
              d={`M ${anchorRightX} ${anchorY} Q ${rightCtrlX} ${rightCtrlY} ${clipX + 3} ${clipY}`}
              fill="none"
              stroke="url(#modernStrapGradRight)"
              strokeWidth="15"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#modernRibbonShadow)"
            />
            {/* Right Strap - Edge Highlighting */}
            <path
              d={`M ${anchorRightX} ${anchorY} Q ${rightCtrlX} ${rightCtrlY} ${clipX + 3} ${clipY}`}
              fill="none"
              stroke="#6366f1"
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
            {/* Right Strap - Jacquard Tech Dash Pattern */}
            <path
              d={`M ${anchorRightX} ${anchorY} Q ${rightCtrlX} ${rightCtrlY} ${clipX + 3} ${clipY}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeOpacity="0.4"
            />
          </svg>

          {/* Interactive Card Body Container (Moves with Spring Physics & 3D Tilt) */}
          <div
            onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
            onTouchStart={(e) => {
              if (e.touches[0]) handleStart(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchEnd={handleEnd}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${rotation}deg) rotateX(${tilt3D.x}deg) rotateY(${tilt3D.y}deg)`,
              transformOrigin: 'top center',
              cursor: isDragging ? 'grabbing' : 'grab',
              willChange: 'transform',
              transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
            }}
            className="relative z-20 w-full mt-14 group"
          >
            {/* Dynamic Ground / Floating Shadow that follows card movement */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-52 h-6 bg-black/70 rounded-full blur-xl pointer-events-none transition-opacity"
              style={{
                transform: `translateX(${-position.x * 0.4}px) scale(${Math.max(0.7, 1 - position.y * 0.003)})`,
                opacity: Math.max(0.2, 0.65 - position.y * 0.002),
              }}
            />

            {/* Modern Titanium Matte Black Carabiner & Swivel Hook */}
            <div className="flex flex-col items-center -mb-4 z-30 relative pointer-events-none">
              {/* Heavy Duty Swivel Ring */}
              <div className="w-5 h-5 rounded-full border-2 border-slate-400 bg-slate-900 shadow-md mb-[-4px] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
              </div>
              {/* Matte Titanium Carabiner Body */}
              <div className="w-6 h-8 rounded-md bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 border border-slate-600 shadow-xl flex flex-col items-center justify-between p-1">
                <div className="w-3.5 h-1 bg-sky-400/80 rounded-full" />
                <div className="w-2 h-3 bg-slate-900 rounded-sm border border-slate-700" />
              </div>
              {/* Badge Slot Gripper */}
              <div className="w-10 h-2.5 rounded-full bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 border border-slate-600 shadow-md" />
            </div>

            {/* The Ultra-Modern Glassmorphic ID Badge Card */}
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-slate-900/95 via-slate-950/90 to-black/95 border border-white/10 ring-1 ring-sky-500/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden transition-all duration-300 group-hover:border-sky-500/40 group-hover:ring-sky-500/30">
              
              {/* Prismatic Rainbow Holographic Reflection Layer */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color-dodge transition-opacity duration-300 group-hover:opacity-40"
                style={{
                  background: `linear-gradient(${115 + rotation * 2.5 + tilt3D.y * 2}deg, transparent 10%, rgba(56, 189, 248, 0.4) 30%, rgba(168, 85, 247, 0.4) 50%, rgba(244, 63, 94, 0.35) 70%, transparent 90%)`,
                }}
              />

              {/* Subtle Tech Grid Watermark inside Badge */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Slot Hole for Lanyard Clip */}
              <div className="w-14 h-2.5 bg-black border border-slate-700/80 rounded-full mx-auto mb-4 shadow-inner" />

              {/* Top Bar: Institution Brand & Holographic NFC Microchip */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800/80">
                <div>
                  <div className="text-[10px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-300 uppercase">
                    Universitas Bina Sarana Informatika
                  </div>
                  <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Sistem Informasi • Mahasiswa Aktif</span>
                  </div>
                </div>

                {/* Futuristic Gold NFC Smart Chip */}
                <div className="w-8 h-6 rounded-md bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 border border-amber-300/80 shadow-md shadow-amber-500/20 p-0.5 flex flex-col justify-between shrink-0">
                  <div className="flex justify-between">
                    <div className="w-2 h-1 bg-amber-800/40 rounded-sm" />
                    <div className="w-2 h-1 bg-amber-800/40 rounded-sm" />
                  </div>
                  <div className="w-full h-1.5 border-y border-amber-800/40 flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-amber-900/60" />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-2 h-1 bg-amber-800/40 rounded-sm" />
                    <div className="w-2 h-1 bg-amber-800/40 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Avatar Section: Full Portrait Pasfoto ID Card */}
              <div className="flex flex-col items-center text-center mb-4">
                <div className="relative mb-3.5">
                  <div className="w-28 h-36 rounded-2xl overflow-hidden ring-2 ring-sky-500/60 shadow-xl shadow-sky-500/20 bg-slate-950/90 relative group/avatar">
                    <img
                      src={profile.avatar_url || '/dimas-profile.jpg'}
                      alt={profile.full_name}
                      className="w-full h-full object-cover object-center scale-[1.02] group-hover/avatar:scale-105 transition-transform duration-300"
                    />
                    {/* Inner subtle glow vignette */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15 pointer-events-none" />
                  </div>

                  {/* Verified Shield Tech Badge */}
                  <div className="absolute -bottom-1.5 -right-1.5 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-slate-950 p-1.5 rounded-full shadow-lg ring-2 ring-slate-950 flex items-center justify-center">
                    <ShieldCheck size={14} className="stroke-[2.5]" />
                  </div>
                </div>

                {/* Identity Name & Tech Badges */}
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                  <span>{profile.full_name}</span>
                </h3>

                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-950/70 border border-sky-500/40 text-[11px] font-bold text-sky-300 mt-1 shadow-sm">
                  <Cpu size={12} className="text-sky-400" />
                  <span>Full Stack Web & Mobile Engineer</span>
                </div>

                <div className="text-[11px] text-slate-400 font-mono mt-1.5 select-all hover:text-sky-300 transition-colors">
                  dmswijanarko@gmail.com
                </div>
              </div>

              {/* Achievements Highlight (Modern Tech Capsules) */}
              <div className="space-y-2 mb-4 bg-slate-950/80 p-3 rounded-2xl border border-slate-800/90 text-xs backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-300 font-medium">
                  <div className="w-5 h-5 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Award size={13} className="text-amber-400" />
                  </div>
                  <span className="truncate font-semibold text-[11px]">Juara 1 IT Bootcamp Software Dev (2025)</span>
                </div>

                <div className="flex items-center gap-2 text-sky-300 font-medium">
                  <div className="w-5 h-5 rounded-md bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                    <Mic size={13} className="text-sky-400" />
                  </div>
                  <span className="truncate font-semibold text-[11px]">Pembicara Bootcamp Software SMK (2025)</span>
                </div>
              </div>

              {/* Modern Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300">
                  Flutter
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300">
                  Dart
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                  Laravel
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                  PHP
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  Power BI
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300">
                  Next.js
                </span>
              </div>

              {/* Modern Card Footer: Digital Barcode & Pass Serial */}
              <div className="pt-3 border-t border-slate-800/90 flex items-center justify-between text-[10px] font-mono text-slate-400">
                {/* Visual Barcode Graphic */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-[2px] h-4">
                    <div className="w-[1.5px] h-full bg-slate-400" />
                    <div className="w-[2.5px] h-full bg-slate-300" />
                    <div className="w-[1px] h-full bg-slate-500" />
                    <div className="w-[3px] h-full bg-slate-400" />
                    <div className="w-[1px] h-full bg-slate-600" />
                    <div className="w-[2px] h-full bg-slate-300" />
                    <div className="w-[1.5px] h-full bg-slate-500" />
                    <div className="w-[3px] h-full bg-slate-300" />
                    <div className="w-[1px] h-full bg-slate-400" />
                  </div>
                  <span className="text-[9px] text-slate-400">DW-SI-2026</span>
                </div>

                {/* Location & Status */}
                <div className="flex items-center gap-1 text-slate-300">
                  <MapPin size={11} className="text-sky-400" />
                  <span>JAKARTA, ID</span>
                </div>
              </div>
            </div>

            {/* Interactive Drag Hint */}
            <div className="text-center mt-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-medium text-slate-400 shadow-sm backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                <span>Sentuh dan ayunkan kartu lanyard ini</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
