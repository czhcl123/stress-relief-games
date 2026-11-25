'use client'

import { useEffect, useRef, useState } from 'react'

type Intensity = 'light' | 'medium' | 'heavy'

const SETTINGS: Record<Intensity, { freq: number; gain: number }> = {
  light: { freq: 1600, gain: 0.1 },
  medium: { freq: 900, gain: 0.16 },
  heavy: { freq: 500, gain: 0.22 },
}

export default function RainSoundsTool() {
  const ctxRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const filterRef = useRef<BiquadFilterNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const [playing, setPlaying] = useState(false)
  const [intensity, setIntensity] = useState<Intensity>('medium')
  const [volume, setVolume] = useState(0.7)

  async function start() {
    if (playing) return
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return

    const ctx = new Ctx()
    await ctx.resume()

    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < data.length; i++) {
      // Brown-ish noise: less harsh than pure white noise.
      last = 0.985 * last + 0.015 * (Math.random() * 2 - 1)
      data[i] = last * 3.2
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = SETTINGS[intensity].freq

    const gain = ctx.createGain()
    gain.gain.value = SETTINGS[intensity].gain * volume

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start()

    ctxRef.current = ctx
    sourceRef.current = source
    filterRef.current = filter
    gainRef.current = gain
    setPlaying(true)
  }

  function stop() {
    sourceRef.current?.stop()
    sourceRef.current?.disconnect()
    ctxRef.current?.close()
    sourceRef.current = null
    filterRef.current = null
    gainRef.current = null
    ctxRef.current = null
    setPlaying(false)
  }

  useEffect(() => {
    return () => {
      sourceRef.current?.stop()
      ctxRef.current?.close()
    }
  }, [])

  useEffect(() => {
    if (!playing) return
    const ctx = ctxRef.current
    const filter = filterRef.current
    const gain = gainRef.current
    if (!ctx || !filter || !gain) return
    const now = ctx.currentTime
    filter.frequency.setTargetAtTime(SETTINGS[intensity].freq, now, 0.2)
    gain.gain.setTargetAtTime(SETTINGS[intensity].gain * volume, now, 0.2)
  }, [intensity, volume, playing])

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
      <div className="mb-6 flex h-40 items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-b from-slate-800/80 to-slate-900">
        <div className="flex gap-2 text-3xl text-sky-300/70" aria-hidden="true">
          <span className="animate-pulse">💧</span>
          <span className="animate-pulse [animation-delay:200ms]">💧</span>
          <span className="animate-pulse [animation-delay:400ms]">💧</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => (playing ? stop() : start())}
          className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          {playing ? 'Pause rain' : 'Play rain'}
        </button>
        {(['light', 'medium', 'heavy'] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setIntensity(level)}
            aria-pressed={intensity === level}
            className={`rounded-xl border px-4 py-2 text-sm capitalize transition ${
              intensity === level
                ? 'border-violet-500 bg-violet-500/20 text-white'
                : 'border-slate-700 text-slate-300 hover:border-violet-500 hover:text-white'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <label className="mx-auto mt-6 flex max-w-sm items-center gap-3 text-sm text-slate-400">
        <span className="w-16">Volume</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="w-full accent-violet-500"
        />
      </label>

      <p className="mt-4 text-center text-xs text-slate-500">
        Synthesised rain, not a field recording. Audio starts only after you press Play.
      </p>
    </div>
  )
}
