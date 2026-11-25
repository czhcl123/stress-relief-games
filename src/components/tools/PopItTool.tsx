'use client'

import { useRef, useState } from 'react'

const SIZE = 6
const TOTAL = SIZE * SIZE
const THEMES = [
  { name: 'Violet', color: '#a78bfa' },
  { name: 'Ocean', color: '#38bdf8' },
  { name: 'Sunset', color: '#fb7185' },
  { name: 'Mint', color: '#6ee7b7' },
]

export default function PopItTool() {
  const [popped, setPopped] = useState<boolean[]>(() => Array(TOTAL).fill(false))
  const [theme, setTheme] = useState(0)
  const audioRef = useRef<AudioContext | null>(null)

  const poppedCount = popped.filter(Boolean).length

  function playPop(index: number, unpop: boolean) {
    try {
      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!Ctx) return
      if (!audioRef.current) audioRef.current = new Ctx()
      const ctx = audioRef.current
      if (ctx.state === 'suspended') void ctx.resume()

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const base = unpop ? 180 : 420
      osc.type = unpop ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(base + (index % 6) * 22, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(base * 0.55, ctx.currentTime + 0.06)
      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.09)
    } catch {
      // Audio is optional; the visual pop still works.
    }
  }

  function toggle(index: number) {
    const unpop = popped[index]
    setPopped((current) => {
      const next = [...current]
      next[index] = !next[index]
      return next
    })
    playPop(index, unpop)
  }

  function reset() {
    setPopped(Array(TOTAL).fill(false))
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-8">
      <div className="mx-auto max-w-md">
        <div className="grid grid-cols-6 gap-2 sm:gap-3">
          {popped.map((isPopped, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggle(index)}
              aria-pressed={isPopped}
              aria-label={`Bubble ${index + 1}${isPopped ? ', popped' : ''}`}
              className="aspect-square rounded-full border border-black/20 transition-transform duration-100"
              style={{
                backgroundColor: THEMES[theme].color,
                opacity: isPopped ? 0.55 : 1,
                transform: isPopped ? 'scale(0.9)' : 'scale(1)',
                boxShadow: isPopped
                  ? 'inset 0 5px 10px rgba(0,0,0,0.45)'
                  : '0 5px 0 rgba(0,0,0,0.22), inset 0 2px 4px rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            Popped: <span className="font-semibold text-white">{poppedCount}</span> / {TOTAL}
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-violet-500 hover:text-white"
          >
            Reset
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {THEMES.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setTheme(index)}
              aria-pressed={theme === index}
              className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                theme === index
                  ? 'border-violet-500 bg-violet-500/20 text-white'
                  : 'border-slate-700 text-slate-300 hover:border-violet-500'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          Tap a bubble to pop it; tap again to push it back up. Sound starts after the first tap.
        </p>
      </div>
    </div>
  )
}
