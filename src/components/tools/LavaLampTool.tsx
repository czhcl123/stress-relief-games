'use client'

import { useState } from 'react'

const PALETTES = [
  { name: 'Violet', colors: ['#8b5cf6', '#c4b5fd', '#7c3aed', '#ddd6fe'] },
  { name: 'Ocean', colors: ['#0ea5e9', '#67e8f9', '#2563eb', '#a5f3fc'] },
  { name: 'Sunset', colors: ['#f97316', '#fb7185', '#f59e0b', '#fda4af'] },
  { name: 'Mono', colors: ['#e2e8f0', '#94a3b8', '#f8fafc', '#cbd5e1'] },
]

const BLOBS = [
  { left: '12%', top: '58%', size: 120, duration: 11, delay: 0 },
  { left: '45%', top: '20%', size: 150, duration: 14, delay: 2 },
  { left: '55%', top: '62%', size: 100, duration: 9, delay: 4 },
  { left: '20%', top: '15%', size: 80, duration: 12, delay: 1 },
  { left: '35%', top: '45%', size: 70, duration: 8, delay: 3 },
  { left: '60%', top: '35%', size: 60, duration: 10, delay: 5 },
]

export default function LavaLampTool() {
  const [palette, setPalette] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [paused, setPaused] = useState(false)

  const colors = PALETTES[palette].colors

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
      <style>{`
        @keyframes lavaFloat {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -26px) scale(1.08); }
          100% { transform: translate(-14px, 18px) scale(0.94); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lava-blob { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto flex w-56 flex-col items-center">
        <div className="relative h-80 w-52 overflow-hidden rounded-[46%_46%_38%_38%/30%_30%_12%_12%] border border-slate-700 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-[0_0_60px_rgba(139,92,246,0.18)]">
          {BLOBS.map((blob, index) => (
            <div
              key={index}
              className="lava-blob absolute rounded-full opacity-80 blur-[14px]"
              style={{
                left: blob.left,
                top: blob.top,
                width: blob.size,
                height: blob.size,
                background: colors[index % colors.length],
                animation: `lavaFloat ${blob.duration / speed}s ease-in-out ${blob.delay}s infinite alternate`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
            />
          ))}
          <div className="absolute inset-x-6 bottom-6 h-10 rounded-full bg-slate-950/70 blur-md" />
        </div>
        <div className="h-4 w-28 rounded-b-xl border border-t-0 border-slate-700 bg-slate-800" />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {PALETTES.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setPalette(index)}
            aria-pressed={palette === index}
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              palette === index
                ? 'border-violet-500 bg-violet-500/20 text-white'
                : 'border-slate-700 text-slate-300 hover:border-violet-500 hover:text-white'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <label className="mx-auto mt-6 flex max-w-sm items-center gap-3 text-sm text-slate-400">
        <span className="w-16">Speed</span>
        <input
          type="range"
          min={0.4}
          max={2}
          step={0.1}
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
          className="w-full accent-violet-500"
        />
      </label>

      <div className="mt-5 text-center">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="rounded-xl border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-violet-500 hover:text-white"
        >
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  )
}
