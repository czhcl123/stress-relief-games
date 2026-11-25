'use client'

import { useEffect, useState } from 'react'

const PHASES = [
  { label: 'Inhale', seconds: 4, scale: 1 },
  { label: 'Hold', seconds: 4, scale: 1 },
  { label: 'Exhale', seconds: 4, scale: 0.62 },
  { label: 'Hold', seconds: 4, scale: 0.62 },
] as const

export default function BreathingTool() {
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState(0)
  const [remaining, setRemaining] = useState<number>(PHASES[0].seconds)
  const [cycles, setCycles] = useState(0)

  useEffect(() => {
    if (!running) return

    if (remaining <= 0) {
      const next = (phase + 1) % PHASES.length
      setPhase(next)
      setRemaining(PHASES[next].seconds)
      if (next === 0) setCycles((value) => value + 1)
      return
    }

    const timer = window.setTimeout(() => setRemaining((value) => value - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [running, remaining, phase])

  function reset() {
    setRunning(false)
    setPhase(0)
    setRemaining(PHASES[0].seconds)
    setCycles(0)
  }

  const current = PHASES[phase]

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10">
      <div className="flex flex-col items-center">
        <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
          <div className="absolute inset-0 rounded-full border border-violet-500/20" />
          <div
            className="flex h-48 w-48 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20 shadow-[0_0_80px_rgba(139,92,246,0.25)] sm:h-64 sm:w-64"
            style={{
              transform: `scale(${running ? current.scale : 0.62})`,
              transition: running ? 'transform 4s linear' : 'transform 0.4s ease',
            }}
          >
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-300" aria-live="polite">
                {running ? current.label : 'Ready'}
              </p>
              <p className="mt-1 text-5xl font-bold text-white">{running ? remaining : 4}</p>
              <p className="mt-1 text-xs text-slate-400">seconds</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setRunning((value) => !value)}
            className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-xl border border-slate-700 px-6 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-violet-500 hover:text-white"
          >
            Reset
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Cycles completed: <span className="font-semibold text-white">{cycles}</span>
        </p>
      </div>
    </div>
  )
}
