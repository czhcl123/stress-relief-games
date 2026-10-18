'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

export default function BubbleWrapGame() {
  const ROWS = 12
  const COLS = 16
  const total = ROWS * COLS

  const [popped, setPopped] = useState<Set<number>>(new Set())
  const [score, setScore] = useState(0)
  const [bump, setBump] = useState(false)
  const [mode, setMode] = useState<'zen' | 'speed'>('zen')
  const [timer, setTimer] = useState(0)
  const [started, setStarted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Init audio context on first interaction
  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    return audioCtxRef.current
  }, [])

  // Bubble colors with matching sound profiles
  const bubbleStyles = [
    { gradient: 'from-violet-400/30 to-purple-500/30', filterFreq: 1500, Q: 3 },   // 深沉
    { gradient: 'from-blue-400/30 to-cyan-500/30',     filterFreq: 3000, Q: 2 },   // 清脆
    { gradient: 'from-pink-400/30 to-rose-500/30',     filterFreq: 4500, Q: 4 },   // 尖细
    { gradient: 'from-emerald-400/30 to-teal-500/30',  filterFreq: 2000, Q: 1.5 }, // 厚实
    { gradient: 'from-amber-400/30 to-orange-500/30',  filterFreq: 3500, Q: 2.5 }, // 明亮
  ]

  // Pop sound using Web Audio API - rich multi-layer
  const playPopSound = useCallback((colorIndex: number) => {
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()

      const style = bubbleStyles[colorIndex % bubbleStyles.length]
      const variant = Math.random()

      // === Layer 1: Noise burst (always) ===
      const bufLen = ctx.sampleRate * (0.03 + Math.random() * 0.05)
      const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufLen; i++) {
        const t = i / bufLen
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2 + Math.random() * 3)
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = style.filterFreq + (Math.random() - 0.5) * 1200
      filter.Q.value = style.Q + (Math.random() - 0.5) * 2
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.3 + Math.random() * 0.2, ctx.currentTime)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06 + Math.random() * 0.04)
      noise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noise.start(ctx.currentTime)

      // === Layer 2: Tone chirp (70%) ===
      if (variant > 0.3) {
        const osc = ctx.createOscillator()
        const oscGain = ctx.createGain()
        const baseFreq = style.filterFreq * 0.25 + Math.random() * 600
        osc.frequency.setValueAtTime(baseFreq + Math.random() * 800, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.3, ctx.currentTime + 0.02 + Math.random() * 0.03)
        osc.type = variant > 0.7 ? 'triangle' : 'sine'
        oscGain.gain.setValueAtTime(0.04 + Math.random() * 0.06, ctx.currentTime)
        oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03 + Math.random() * 0.03)
        osc.connect(oscGain)
        oscGain.connect(ctx.destination)
        osc.start(ctx.currentTime)
      }

      // === Layer 3: Click transient (40%) ===
      if (variant > 0.6) {
        const clickBuf = ctx.createBuffer(1, ctx.sampleRate * 0.008, ctx.sampleRate)
        const clickData = clickBuf.getChannelData(0)
        for (let i = 0; i < clickData.length; i++) {
          clickData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / clickData.length, 8)
        }
        const click = ctx.createBufferSource()
        click.buffer = clickBuf
        const clickGain = ctx.createGain()
        clickGain.gain.setValueAtTime(0.25, ctx.currentTime)
        clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.01)
        click.connect(clickGain)
        clickGain.connect(ctx.destination)
        click.start(ctx.currentTime)
      }

      // === Layer 4: Air hiss (25%) ===
      if (variant > 0.75) {
        const hissBuf = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate)
        const hissData = hissBuf.getChannelData(0)
        for (let i = 0; i < hissData.length; i++) {
          hissData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / hissData.length, 1.5) * 0.3
        }
        const hiss = ctx.createBufferSource()
        hiss.buffer = hissBuf
        const hissFilter = ctx.createBiquadFilter()
        hissFilter.type = 'highpass'
        hissFilter.frequency.value = 4000 + Math.random() * 3000
        const hissGain = ctx.createGain()
        hissGain.gain.setValueAtTime(0.12, ctx.currentTime + 0.01)
        hissGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
        hiss.connect(hissFilter)
        hissFilter.connect(hissGain)
        hissGain.connect(ctx.destination)
        hiss.start(ctx.currentTime + 0.005)
      }

      // === Layer 5: Resonance tail (30%) ===
      if (variant > 0.7) {
        const resOsc = ctx.createOscillator()
        const resGain = ctx.createGain()
        resOsc.frequency.value = 100 + Math.random() * 200
        resOsc.type = 'sine'
        resGain.gain.setValueAtTime(0.02, ctx.currentTime + 0.02)
        resGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
        resOsc.connect(resGain)
        resGain.connect(ctx.destination)
        resOsc.start(ctx.currentTime + 0.01)
        resOsc.stop(ctx.currentTime + 0.12)
      }
    } catch {
      // Audio not supported, silently ignore
    }
  }, [getAudioCtx])

  // === Surprise sounds (8% chance) ===
  const surpriseNames = ['🔔 Doorbell', '💧 Water Drop', '🎐 Wind Chime', '🎵 Xylophone', '🐦 Bird Chirp', '✨ Sparkle', '🎹 Piano', '🎶 Chime', '🪙 Gold Drop', '💥 Boom!']
  const [surprise, setSurprise] = useState<string | null>(null)
  const surpriseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const playSurpriseSound = useCallback((index: number) => {
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime
      const type = index % 10

      if (type === 0) {
        // 🔔 Doorbell ding-dong
        const ding = ctx.createOscillator()
        const dong = ctx.createOscillator()
        const g1 = ctx.createGain()
        const g2 = ctx.createGain()
        ding.frequency.value = 880
        dong.frequency.value = 660
        ding.type = 'sine'
        dong.type = 'sine'
        g1.gain.setValueAtTime(0.2, t)
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.4)
        g2.gain.setValueAtTime(0, t)
        g2.gain.setValueAtTime(0.2, t + 0.2)
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.7)
        ding.connect(g1); g1.connect(ctx.destination)
        dong.connect(g2); g2.connect(ctx.destination)
        ding.start(t); ding.stop(t + 0.4)
        dong.start(t + 0.2); dong.stop(t + 0.7)
      }

      else if (type === 1) {
        // 💧 Water drop plop
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.frequency.setValueAtTime(1600, t)
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.08)
        osc.type = 'sine'
        gain.gain.setValueAtTime(0.3, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
        osc.connect(gain); gain.connect(ctx.destination)
        osc.start(t); osc.stop(t + 0.15)
      }

      else if (type === 2) {
        // 🎐 Wind chime - multiple high tones
        const notes = [2093, 2637, 3136, 3520, 3951]
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.frequency.value = freq
          osc.type = 'sine'
          const start = t + i * 0.06
          gain.gain.setValueAtTime(0, start)
          gain.gain.linearRampToValueAtTime(0.12, start + 0.01)
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6)
          osc.connect(gain); gain.connect(ctx.destination)
          osc.start(start); osc.stop(start + 0.6)
        })
      }

      else if (type === 3) {
        // 🎵 Xylophone - ascending 3 notes
        const notes = [523, 659, 784]
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.frequency.value = freq
          osc.type = 'triangle'
          const start = t + i * 0.1
          gain.gain.setValueAtTime(0.2, start)
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3)
          osc.connect(gain); gain.connect(ctx.destination)
          osc.start(start); osc.stop(start + 0.3)
        })
      }

      else if (type === 4) {
        // 🐦 Bird chirp
        for (let i = 0; i < 3; i++) {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          const start = t + i * 0.12
          osc.frequency.setValueAtTime(3000 + Math.random() * 1500, start)
          osc.frequency.exponentialRampToValueAtTime(2000 + Math.random() * 1000, start + 0.06)
          osc.type = 'sine'
          gain.gain.setValueAtTime(0.1, start)
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.08)
          osc.connect(gain); gain.connect(ctx.destination)
          osc.start(start); osc.stop(start + 0.08)
        }
      }

      else if (type === 5) {
        // ✨ Sparkle - fast ascending shimmer
        for (let i = 0; i < 6; i++) {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.frequency.value = 1000 + i * 400 + Math.random() * 200
          osc.type = 'sine'
          const start = t + i * 0.03
          gain.gain.setValueAtTime(0.08, start)
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15)
          osc.connect(gain); gain.connect(ctx.destination)
          osc.start(start); osc.stop(start + 0.15)
        }
      }

      else if (type === 6) {
        // 🎹 Piano chord (C major)
        const notes = [261.6, 329.6, 392]
        notes.forEach((freq) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.frequency.value = freq
          osc.type = 'triangle'
          gain.gain.setValueAtTime(0.15, t)
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8)
          osc.connect(gain); gain.connect(ctx.destination)
          osc.start(t); osc.stop(t + 0.8)
        })
      }

      else if (type === 7) {
        // 🎶 Chime - two harmonious notes
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const g1 = ctx.createGain()
        const g2 = ctx.createGain()
        osc1.frequency.value = 1046
        osc2.frequency.value = 1318
        osc1.type = 'sine'
        osc2.type = 'sine'
        g1.gain.setValueAtTime(0.15, t)
        g1.gain.exponentialRampToValueAtTime(0.001, t + 0.5)
        g2.gain.setValueAtTime(0, t)
        g2.gain.setValueAtTime(0.12, t + 0.15)
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.6)
        osc1.connect(g1); g1.connect(ctx.destination)
        osc2.connect(g2); g2.connect(ctx.destination)
        osc1.start(t); osc1.stop(t + 0.5)
        osc2.start(t + 0.15); osc2.stop(t + 0.6)
      }

      else if (type === 8) {
        // 🪙 Gold coin - classic arcade coin pickup (like Mario)
        const t0 = t
        // Two ascending notes: E6 -> B6 (classic coin sound)
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const g1 = ctx.createGain()
        const g2 = ctx.createGain()
        osc1.frequency.value = 1318
        osc2.frequency.value = 1975
        osc1.type = 'square'
        osc2.type = 'square'
        g1.gain.setValueAtTime(0.12, t0)
        g1.gain.exponentialRampToValueAtTime(0.001, t0 + 0.12)
        g2.gain.setValueAtTime(0, t0)
        g2.gain.setValueAtTime(0.12, t0 + 0.08)
        g2.gain.exponentialRampToValueAtTime(0.001, t0 + 0.25)
        osc1.connect(g1); g1.connect(ctx.destination)
        osc2.connect(g2); g2.connect(ctx.destination)
        osc1.start(t0); osc1.stop(t0 + 0.12)
        osc2.start(t0 + 0.08); osc2.stop(t0 + 0.25)
        // Subtle overtone shimmer
        const shimmer = ctx.createOscillator()
        const shG = ctx.createGain()
        shimmer.frequency.value = 3951
        shimmer.type = 'sine'
        shG.gain.setValueAtTime(0.04, t0 + 0.08)
        shG.gain.exponentialRampToValueAtTime(0.001, t0 + 0.3)
        shimmer.connect(shG); shG.connect(ctx.destination)
        shimmer.start(t0 + 0.08); shimmer.stop(t0 + 0.3)
      }

      else if (type === 9) {
        // 💥 Fun cartoon boom - satisfying bass pop
        // Layer 1: punchy sine drop
        const bass = ctx.createOscillator()
        const bassGain = ctx.createGain()
        bass.frequency.setValueAtTime(200, t)
        bass.frequency.exponentialRampToValueAtTime(40, t + 0.25)
        bass.type = 'sine'
        bassGain.gain.setValueAtTime(0.35, t)
        bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35)
        bass.connect(bassGain); bassGain.connect(ctx.destination)
        bass.start(t); bass.stop(t + 0.35)
        // Layer 2: noise burst (the "crack")
        const crackBuf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate)
        const crackData = crackBuf.getChannelData(0)
        for (let i = 0; i < crackData.length; i++) {
          crackData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / crackData.length, 6)
        }
        const crack = ctx.createBufferSource()
        crack.buffer = crackBuf
        const crackGain = ctx.createGain()
        crackGain.gain.setValueAtTime(0.4, t)
        crackGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05)
        crack.connect(crackGain); crackGain.connect(ctx.destination)
        crack.start(t)
        // Layer 3: fun wobble tail
        const wobble = ctx.createOscillator()
        const wobbleGain = ctx.createGain()
        wobble.frequency.setValueAtTime(120, t + 0.05)
        wobble.frequency.setValueAtTime(90, t + 0.1)
        wobble.frequency.setValueAtTime(110, t + 0.15)
        wobble.frequency.setValueAtTime(70, t + 0.2)
        wobble.type = 'sine'
        wobbleGain.gain.setValueAtTime(0, t)
        wobbleGain.gain.setValueAtTime(0.15, t + 0.05)
        wobbleGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
        wobble.connect(wobbleGain); wobbleGain.connect(ctx.destination)
        wobble.start(t + 0.05); wobble.stop(t + 0.3)
      }

      // Show surprise name
      setSurprise(surpriseNames[type])
      if (surpriseTimerRef.current) clearTimeout(surpriseTimerRef.current)
      surpriseTimerRef.current = setTimeout(() => setSurprise(null), 1500)

    } catch {
      // ignore
    }
  }, [getAudioCtx])

  // Speed mode timer
  useEffect(() => {
    if (mode === 'speed' && started && popped.size < total) {
      timerRef.current = setInterval(() => {
        setTimer((t) => t + 10)
      }, 10)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [mode, started, popped.size, total])

  // Stop timer when all popped (speed mode)
  useEffect(() => {
    if (mode === 'speed' && popped.size === total && timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [mode, popped.size, total])

  const popBubble = useCallback(
    (index: number) => {
      if (popped.has(index)) return

      // Start timer on first pop in speed mode
      if (mode === 'speed' && !started) {
        setStarted(true)
      }

      playPopSound(index % 5)

      // 8% chance surprise sound
      if (Math.random() < 0.08) {
        playSurpriseSound(index)
      }

      setPopped((prev) => {
        const next = new Set(prev)
        next.add(index)
        return next
      })
      setScore((s) => s + 1)
      setBump(true)
      setTimeout(() => setBump(false), 200)
    },
    [popped, mode, started, playPopSound, playSurpriseSound]
  )

  const reset = useCallback(() => {
    setPopped(new Set())
    setScore(0)
    setTimer(0)
    setStarted(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  const formatTime = (ms: number) => {
    const secs = Math.floor(ms / 1000)
    const cents = Math.floor((ms % 1000) / 10)
    return `${secs}.${cents.toString().padStart(2, '0')}s`
  }

  const progress = ((popped.size / total) * 100).toFixed(0)

  // Bubble colors (pastel gradient) - uses bubbleStyles from above
  const getBubbleGradient = (index: number) => {
    return bubbleStyles[index % bubbleStyles.length].gradient
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          🫧 Bubble Wrap Popper
        </h1>
        <p className="text-slate-400">
          Pop every bubble. Feel the satisfaction.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        {/* Mode toggle */}
        <div className="flex bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
          <button
            onClick={() => { setMode('zen'); reset() }}
            className={`px-4 py-2 text-sm transition ${mode === 'zen' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            🧘 Zen
          </button>
          <button
            onClick={() => { setMode('speed'); reset() }}
            className={`px-4 py-2 text-sm transition ${mode === 'speed' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            ⚡ Speed
          </button>
        </div>

        {/* Score */}
        <div className="flex items-center gap-3 bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
          <span className="text-slate-400 text-sm">Popped:</span>
          <span className={`text-xl font-bold text-violet-400 ${bump ? 'score-bump' : ''}`}>
            {score}
          </span>
          <span className="text-slate-400 text-sm">/ {total}</span>
        </div>

        {/* Timer (speed mode) */}
        {mode === 'speed' && (
          <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
            <span className="text-slate-400 text-sm">Time: </span>
            <span className="text-xl font-mono font-bold text-amber-400">
              {formatTime(timer)}
            </span>
          </div>
        )}

        {/* Reset */}
        <button
          onClick={reset}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-white hover:border-slate-500 transition"
        >
          🔄 Reset
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Surprise notification */}
      {surprise && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold">
            {surprise}
          </div>
        </div>
      )}

      {/* Completion message */}
      {popped.size === total && (
        <div className="text-center mb-6 p-4 bg-violet-500/10 border border-violet-500/30 rounded-xl">
          <p className="text-2xl font-bold text-violet-400 mb-1">🎉 All Popped!</p>
          <p className="text-slate-400">
            {mode === 'speed'
              ? `You popped all ${total} bubbles in ${formatTime(timer)}!`
              : `You popped all ${total} bubbles. Feeling relaxed?`}
          </p>
          <button
            onClick={reset}
            className="mt-3 px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-white text-sm font-medium transition"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Bubble Grid */}
      <div
        className="grid gap-1.5 sm:gap-2 mx-auto select-none"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          maxWidth: '640px',
        }}
      >
        {Array.from({ length: total }, (_, i) => {
          const isPopped = popped.has(i)
          return (
            <button
              key={i}
              onClick={() => popBubble(i)}
              onTouchStart={(e) => {
                e.preventDefault()
                popBubble(i)
              }}
              className={`bubble aspect-square rounded-full cursor-pointer border-0 outline-none bg-gradient-to-br ${getBubbleGradient(i)} ${
                isPopped ? 'popping bg-slate-800/50' : ''
              }`}
              style={{
                boxShadow: isPopped
                  ? 'none'
                  : 'inset 0 -2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)',
                background: isPopped
                  ? 'rgba(30, 41, 59, 0.3)'
                  : undefined,
              }}
              aria-label={isPopped ? 'Popped' : 'Pop this bubble'}
            />
          )
        })}
      </div>

      {/* SEO Content */}
      <div className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-3">How to Play</h2>
        <p className="text-slate-400 mb-4">
          Click or tap each bubble to pop it. In <strong className="text-slate-300">Zen mode</strong>,
          take your time — there&apos;s no rush. In <strong className="text-slate-300">Speed mode</strong>,
          race against the clock to pop all {total} bubbles as fast as you can.
        </p>
        <h2 className="text-xl font-bold mb-3">Why Pop Bubble Wrap?</h2>
        <p className="text-slate-400">
          There&apos;s a reason bubble wrap is so satisfying. The combination of tactile feedback,
          the popping sound, and the repetitive action triggers a small dopamine release in your brain.
          It&apos;s the same principle behind fidget toys and stress balls — simple, repetitive actions
          that help you decompress. Our virtual bubble wrap gives you the same satisfaction without
          the waste.
        </p>
      </div>
    </div>
  )
}