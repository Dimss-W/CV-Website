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

  // Mutable Physics Refs
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

  // Silky 60fps Physics Engine Loop
  useEffect(() => {
    let active = true;

    const physicsLoop = () => {
      if (!active) return;

      if (viewMode === 'lanyard') {
        if (isDraggingRef.current) {
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
          const tensionK = 0.075;
          const friction = 0.925;
          const rotTension = 0.065;
          const rotFriction = 0.92;

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
          idleTimeRef.current += 0.024;
          const idleX = Math.sin(idleTimeRef.current) * 1.2;
          const idleY = Math.cos(idleTimeRef.current * 0.6) * 0.8;
          const idleRot = Math.sin(idleTimeRef.current * 0.8) * 0.5;

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

    const stretchFactor = 0.55;
    const dampX = rawDx * stretchFactor;
    const dampY = rawDy > 0 ? rawDy * stretchFactor : Math.max(rawDy * 0.35, -28);

    const targetRot = Math.min(Math.max(dampX * 0.08, -16), 16);
    const targetTiltX = Math.min(Math.max(-dampY * 0.04, -8), 8);
    const targetTiltY = Math.min(Math.max(dampX * 0.05, -10), 10);

    targetPosRef.current = { x: dampX, y: dampY };
    targetRotRef.current = targetRot;
    targetTiltRef.current = { x: targetTiltX, y: targetTiltY };
  };

  const handleEnd = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    isSimulatingRef.current = true;

    velocityRef.current.vx = Math.min(Math.max(velocityRef.current.vx, -20), 20);
    velocityRef.current.vy = Math.min(Math.max(velocityRef.current.vy, -20), 20);
    velocityRef.current.vr = velocityRef.current.vx * 0.25;
  };

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
      {/* View Switcher */}
      <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-full mb-4 z-20 shadow-md">
        <button
          onClick={() => setViewMode('lanyard')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
            viewMode === 'lanyard'
              ? 'bg-zinc-800 text-white font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sparkles size={12} />
          <span>Kartu ID</span>
        </button>

        <button
          onClick={() => setViewMode('terminal')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
            viewMode === 'terminal'
              ? 'bg-zinc-800 text-white font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Terminal size={12} />
          <span>Interactive CLI</span>
        </button>
      </div>

      {viewMode === 'terminal' ? (
        <div className="w-full animate-in fade-in duration-200">
          <InteractiveTerminal profile={profile} onCopySuccess={onCopySuccess} />
        </div>
      ) : (
        <div
          ref={containerRef}
          className="relative w-full max-w-sm flex flex-col items-center pt-2 pb-2 select-none touch-none"
          style={{ perspective: '1100px' }}
        >
          {/* Top Anchor Mount */}
          <div className="absolute top-0 w-20 h-2.5 bg-zinc-900 rounded-b-md border-x border-b border-zinc-700 z-30 flex items-center justify-center">
            <div className="w-2 h-1 bg-zinc-600 rounded-full" />
          </div>

          {/* Minimalist Woven Straps (SVG) */}
          <svg
            className="absolute top-1 w-full h-36 pointer-events-none z-10 overflow-visible"
            viewBox="0 0 360 144"
          >
            <defs>
              <linearGradient id="lanyardStrapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#18181b" />
                <stop offset="50%" stopColor="#27272a" />
                <stop offset="100%" stopColor="#18181b" />
              </linearGradient>
            </defs>

            {/* Left Strap */}
            <path
              d={`M ${anchorLeftX} ${anchorY} Q ${leftCtrlX} ${leftCtrlY} ${clipX - 2} ${clipY}`}
              fill="none"
              stroke="url(#lanyardStrapGrad)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d={`M ${anchorLeftX} ${anchorY} Q ${leftCtrlX} ${leftCtrlY} ${clipX - 2} ${clipY}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeOpacity="0.2"
            />

            {/* Right Strap */}
            <path
              d={`M ${anchorRightX} ${anchorY} Q ${rightCtrlX} ${rightCtrlY} ${clipX + 2} ${clipY}`}
              fill="none"
              stroke="url(#lanyardStrapGrad)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d={`M ${anchorRightX} ${anchorY} Q ${rightCtrlX} ${rightCtrlY} ${clipX + 2} ${clipY}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeOpacity="0.2"
            />
          </svg>

          {/* Card Body */}
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
            }}
            className="relative z-20 w-full mt-12 group"
          >
            {/* Subtle Ground Shadow */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-4 bg-black/60 rounded-full blur-lg pointer-events-none"
              style={{
                transform: `translateX(${-position.x * 0.3}px)`,
                opacity: 0.5,
              }}
            />

            {/* Titanium Matte Swivel Clip */}
            <div className="flex flex-col items-center -mb-3 z-30 relative pointer-events-none">
              <div className="w-4 h-4 rounded-full border border-zinc-600 bg-zinc-800 mb-[-3px]" />
              <div className="w-5 h-7 rounded-sm bg-zinc-800 border border-zinc-700 shadow-md flex items-center justify-center">
                <div className="w-2.5 h-1 bg-zinc-600 rounded-full" />
              </div>
              <div className="w-9 h-2 rounded-full bg-zinc-700" />
            </div>

            {/* Clean ID Badge Card */}
            <div className="relative rounded-2xl p-6 bg-zinc-950/95 border border-zinc-800 shadow-2xl backdrop-blur-xl overflow-hidden transition-colors duration-200 hover:border-zinc-700">
              {/* Badge Slot */}
              <div className="w-12 h-2 bg-black border border-zinc-800 rounded-full mx-auto mb-4" />

              {/* Institution Bar */}
              <div className="pb-3.5 mb-4 border-b border-zinc-800/80 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                    Universitas Bina Sarana Informatika
                  </div>
                  <div className="text-[11px] text-zinc-300 font-medium mt-0.5">
                    Sistem Informasi • Mahasiswa Aktif
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator" />
              </div>

              {/* Portrait & Role */}
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-24 h-32 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 mb-3 shadow-md">
                  <img
                    src={profile.avatar_url || '/dimas-profile-web.jpg'}
                    alt={profile.full_name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {profile.full_name}
                </h3>

                <div className="text-xs text-zinc-400 mt-0.5 font-medium">
                  Full Stack Software Engineer
                </div>

                <div className="text-[11px] text-zinc-500 font-mono mt-1 select-all">
                  dmswijanarko@gmail.com
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-1.5 mb-4 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 text-xs text-left">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Award size={13} className="text-amber-400 shrink-0" />
                  <span className="truncate text-[11px]">Juara 1 IT Bootcamp Software Dev (2025)</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Mic size={13} className="text-zinc-400 shrink-0" />
                  <span className="truncate text-[11px]">Pembicara Bootcamp Software SMK (2025)</span>
                </div>
              </div>

              {/* Clean Tech Pills */}
              <div className="flex flex-wrap gap-1.5 justify-center mb-4 text-[10px]">
                <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">Flutter</span>
                <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">Dart</span>
                <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">Laravel</span>
                <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">Next.js</span>
                <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">Power BI</span>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>DW-SI-2026</span>
                <div className="flex items-center gap-1">
                  <MapPin size={11} />
                  <span>JAKARTA, ID</span>
                </div>
              </div>
            </div>

            {/* Drag Hint */}
            <div className="text-center mt-2.5">
              <span className="text-[11px] text-zinc-500">
                Ayunkan kartu dengan sentuhan atau kursor
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
