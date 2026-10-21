'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

interface Skin {
  id: string
  name: string
  lobes: number
  body: string
  lobe: string
  lobeLight: string
  lobeDark: string
  rim: string
}

// Six spinner designs, matching the "six variants" convention of the other games.
const SKINS: Skin[] = [
  { id: 'classic', name: 'Classic Tri', lobes: 3, body: '#3b82f6', lobe: '#2563eb', lobeLight: '#93c5fd', lobeDark: '#1e3a8a', rim: '#dbeafe' },
  { id: 'steel', name: 'Quad Steel', lobes: 4, body: '#64748b', lobe: '#475569', lobeLight: '#e2e8f0', lobeDark: '#1e293b', rim: '#f8fafc' },
  { id: 'bar', name: 'Dual Bar', lobes: 2, body: '#f43f5e', lobe: '#e11d48', lobeLight: '#fda4af', lobeDark: '#881337', rim: '#ffe4e6' },
  { id: 'ninja', name: 'Ninja Star', lobes: 5, body: '#8b5cf6', lobe: '#7c3aed', lobeLight: '#c4b5fd', lobeDark: '#3b0764', rim: '#ede9fe' },
  { id: 'gold', name: 'Hex Gold', lobes: 6, body: '#f59e0b', lobe: '#d97706', lobeLight: '#fde68a', lobeDark: '#78350f', rim: '#fef3c7' },
  { id: 'turbine', name: 'Turbine', lobes: 8, body: '#14b8a6', lobe: '#0d9488', lobeLight: '#99f6e4', lobeDark: '#134e4a', rim: '#ccfbf1' },
]

const RAD_TO_RPM = 60 / (Math.PI * 2)

// Spin model tuned so a hard flick lands near 1000-1600 RPM and coasts for
// roughly a minute, like a real bearing-based spinner.
const MAX_OMEGA = 260 // rad/s ceiling (~2480 RPM)
const VISCOUS = 0.05 // drag proportional to speed (air + bearing)
const DRY_FRICTION = 0.34 // constant bearing friction, rad/s²
const HOLD_DECEL = 280 // extra deceleration while pinching the center

/** Draws the rotating body of the spinner (arms, lobe caps, hub). */
function drawBody(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  R: number,
  angle: number,
  skin: Skin,
  alpha: number
) {
  const lobes = skin.lobes
  // The arm has to clear the hub plus the lobe cap, otherwise the circles
  // cover it completely and the spinner loses its spokes.
  const armLen = R * 0.7
  const lobeR = R * (lobes >= 6 ? 0.17 : lobes >= 5 ? 0.21 : lobes >= 4 ? 0.24 : 0.27)
  const armW = R * (lobes >= 6 ? 0.14 : lobes >= 4 ? 0.18 : 0.22)
  const hubR = R * 0.27

  ctx.save()
  ctx.globalAlpha = alpha
  ctx.translate(cx, cy)
  ctx.rotate(angle)

  // Arms
  ctx.lineCap = 'round'
  ctx.strokeStyle = skin.body
  ctx.lineWidth = armW
  for (let i = 0; i < lobes; i++) {
    const a = (i / lobes) * Math.PI * 2 - Math.PI / 2
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(a) * armLen, Math.sin(a) * armLen)
    ctx.stroke()
  }

  // Lobe caps
  for (let i = 0; i < lobes; i++) {
    const a = (i / lobes) * Math.PI * 2 - Math.PI / 2
    const x = Math.cos(a) * armLen
    const y = Math.sin(a) * armLen
    const g = ctx.createRadialGradient(x - lobeR * 0.4, y - lobeR * 0.42, lobeR * 0.05, x, y, lobeR)
    g.addColorStop(0, skin.lobeLight)
    g.addColorStop(0.55, skin.lobe)
    g.addColorStop(1, skin.lobeDark)
    ctx.beginPath()
    ctx.arc(x, y, lobeR, 0, Math.PI * 2)
    ctx.fillStyle = g
    ctx.fill()

    // Rim highlight
    ctx.beginPath()
    ctx.arc(x, y, lobeR * 0.92, -2.5, -0.9)
    ctx.strokeStyle = skin.rim
    ctx.lineWidth = R * 0.018
    ctx.stroke()
  }

  // Hub disc (the bearing sits on top of this)
  const hg = ctx.createRadialGradient(-hubR * 0.3, -hubR * 0.32, hubR * 0.08, 0, 0, hubR)
  hg.addColorStop(0, skin.lobeLight)
  hg.addColorStop(0.62, skin.body)
  hg.addColorStop(1, skin.lobeDark)
  ctx.beginPath()
  ctx.arc(0, 0, hubR, 0, Math.PI * 2)
  ctx.fillStyle = hg
  ctx.fill()

  ctx.restore()
}

/** Draws the steel bearing. It turns at a different rate from the body. */
function drawBearing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  R: number,
  bearingAngle: number
) {
  const outerR = R * 0.225

  const mg = ctx.createRadialGradient(cx - outerR * 0.4, cy - outerR * 0.4, outerR * 0.1, cx, cy, outerR)
  mg.addColorStop(0, '#f8fafc')
  mg.addColorStop(0.5, '#94a3b8')
  mg.addColorStop(1, '#2f3b4d')
  ctx.beginPath()
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2)
  ctx.fillStyle = mg
  ctx.fill()

  // Balls inside the race
  const orbit = outerR * 0.6
  const ballR = outerR * 0.2
  for (let i = 0; i < 6; i++) {
    const a = bearingAngle + (i / 6) * Math.PI * 2
    const x = cx + Math.cos(a) * orbit
    const y = cy + Math.sin(a) * orbit
    const bg = ctx.createRadialGradient(x - ballR * 0.4, y - ballR * 0.4, ballR * 0.08, x, y, ballR)
    bg.addColorStop(0, '#ffffff')
    bg.addColorStop(0.7, '#cbd5e1')
    bg.addColorStop(1, '#64748b')
    ctx.beginPath()
    ctx.arc(x, y, ballR, 0, Math.PI * 2)
    ctx.fillStyle = bg
    ctx.fill()
  }

  // Center cap (where you put your finger)
  const capR = outerR * 0.42
  const cg = ctx.createRadialGradient(cx - capR * 0.4, cy - capR * 0.4, capR * 0.05, cx, cy, capR)
  cg.addColorStop(0, '#ffffff')
  cg.addColorStop(0.6, '#e2e8f0')
  cg.addColorStop(1, '#94a3b8')
  ctx.beginPath()
  ctx.arc(cx, cy, capR, 0, Math.PI * 2)
  ctx.fillStyle = cg
  ctx.fill()

  // Specular arc on the outer ring
  ctx.beginPath()
  ctx.arc(cx, cy, outerR * 0.84, -2.6, -1.2)
  ctx.strokeStyle = 'rgba(255,255,255,0.75)'
  ctx.lineWidth = R * 0.012
  ctx.stroke()
}

export default function FidgetSpinner({ embed = false }: { embed?: boolean } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const lastTimeRef = useRef(0)

  // Simulation state lives in refs so UI changes can never restart the spin.
  const angleRef = useRef(0)
  const omegaRef = useRef(0) // rad/s
  const spunRef = useRef(0) // total radians travelled
  const maxRpmRef = useRef(0)
  const holdRef = useRef(false)
  const dragRef = useRef({ active: false, lastAngle: 0, lastTime: 0, est: 0 })

  const [skin, setSkin] = useState(0)
  const skinRef = useRef(0)
  const [rpm, setRpm] = useState(0)
  const [bestRpm, setBestRpm] = useState(0)
  const [spins, setSpins] = useState(0)
  const lastStatRef = useRef(0)
  const lastSpinsRef = useRef(0)

  const audioRef = useRef<AudioContext | null>(null)
  const whirrRef = useRef<{ filter: BiquadFilterNode; gain: GainNode; lfo: OscillatorNode } | null>(null)

  // Keep the drawing loop independent of React state.
  useEffect(() => {
    skinRef.current = skin
  }, [skin])

  const getCtx = useCallback(() => {
    if (!audioRef.current) audioRef.current = new AudioContext()
    return audioRef.current
  }, [])

  // --- Sound -------------------------------------------------------------

  // Neutral short tick, used for grabbing the bearing or stopping.
  const playTouch = useCallback(() => {
    try {
      const ctx = getCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime
      const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 8)
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 1800
      bp.Q.value = 1.4
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.12, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
      src.connect(bp)
      bp.connect(gain)
      gain.connect(ctx.destination)
      src.start(t)
    } catch { /* ignore */ }
  }, [getCtx])

  // Finger flick: a bright click plus a filtered noise whoosh.
  // Deliberately avoids a long low sine, which reads as a "hum"/"boom".
  const playFlick = useCallback(() => {
    try {
      const ctx = getCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime

      const clickBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate)
      const cd = clickBuf.getChannelData(0)
      for (let i = 0; i < cd.length; i++) {
        cd[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / cd.length, 7)
      }
      const click = ctx.createBufferSource()
      click.buffer = clickBuf
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.setValueAtTime(3200, t)
      bp.frequency.exponentialRampToValueAtTime(1400, t + 0.05)
      bp.Q.value = 1.1
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.16, t)
      cg.gain.exponentialRampToValueAtTime(0.001, t + 0.07)
      click.connect(bp)
      bp.connect(cg)
      cg.connect(ctx.destination)
      click.start(t)

      const wBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.35), ctx.sampleRate)
      const wd = wBuf.getChannelData(0)
      for (let i = 0; i < wd.length; i++) {
        wd[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / wd.length, 2)
      }
      const whoosh = ctx.createBufferSource()
      whoosh.buffer = wBuf
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.setValueAtTime(900, t)
      lp.frequency.exponentialRampToValueAtTime(260, t + 0.32)
      const wg = ctx.createGain()
      wg.gain.setValueAtTime(0.001, t)
      wg.gain.linearRampToValueAtTime(0.085, t + 0.05)
      wg.gain.exponentialRampToValueAtTime(0.001, t + 0.34)
      whoosh.connect(lp)
      lp.connect(wg)
      wg.connect(ctx.destination)
      whoosh.start(t)
    } catch { /* ignore */ }
  }, [getCtx])

  // The continuous whirr. Built once, then steered by the current RPM.
  const ensureWhirr = useCallback((ctx: AudioContext) => {
    if (whirrRef.current) return whirrRef.current

    const len = Math.floor(ctx.sampleRate * 1.5)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1

    const src = ctx.createBufferSource()
    src.buffer = buf
    src.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 420
    filter.Q.value = 2.5

    const gain = ctx.createGain()
    gain.gain.value = 0

    // Bearing imperfection: a slow amplitude wobble that tracks rotation speed.
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 6
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.006
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)

    src.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    src.start()
    lfo.start()

    const node = { filter, gain, lfo }
    whirrRef.current = node
    return node
  }, [])

  const updateWhirr = useCallback((speed: number) => {
    const ctx = audioRef.current
    if (!ctx || ctx.state !== 'running') return
    const node = ensureWhirr(ctx)
    const t = ctx.currentTime

    if (speed < 1.2) {
      node.gain.gain.setTargetAtTime(0, t, 0.06)
      return
    }

    const r = speed * RAD_TO_RPM
    // Signature spinner sound: the whirr rises in pitch with RPM.
    node.filter.frequency.setTargetAtTime(300 + Math.min(r, 2400) * 0.6, t, 0.05)
    node.filter.Q.setTargetAtTime(2.2 + Math.min(r, 2400) / 800, t, 0.1)
    node.gain.gain.setTargetAtTime(Math.min(0.05, 0.004 + r / 30000), t, 0.1)
    node.lfo.frequency.setTargetAtTime(Math.max(3, Math.min(70, r / 60)), t, 0.1)
  }, [ensureWhirr])

  // --- Canvas ------------------------------------------------------------

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement!

    const apply = () => {
      const w = parent.clientWidth
      const h = Math.min(560, window.innerHeight * 0.6)
      if (w === canvas.width && h === canvas.height) return
      // Resizing only changes the frame; the spin state is untouched.
      canvas.width = w
      canvas.height = h
    }

    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const cx = w / 2
    const cy = h / 2
    const R = Math.min(w, h) * 0.37
    const skin = SKINS[skinRef.current]
    const omega = omegaRef.current

    // Table
    const bg = ctx.createRadialGradient(cx, cy, R * 0.15, cx, cy, Math.max(w, h) * 0.75)
    bg.addColorStop(0, '#1f2937')
    bg.addColorStop(1, '#0b1120')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)

    // Contact shadow
    const sh = ctx.createRadialGradient(cx + 5, cy + 11, R * 0.1, cx + 5, cy + 11, R * 1.12)
    sh.addColorStop(0, 'rgba(0,0,0,0.45)')
    sh.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.arc(cx + 5, cy + 11, R * 1.12, 0, Math.PI * 2)
    ctx.fillStyle = sh
    ctx.fill()

    // Motion blur: ghost frames trailing behind the body at high RPM.
    const blur = Math.min(1, Math.abs(omega) / 55)
    const ghosts = blur > 0.12 ? 4 : 1
    for (let g = ghosts - 1; g >= 0; g--) {
      const offset = ghosts === 1 ? 0 : omega * 0.006 * g
      const alpha = g === 0 ? 1 : 0.1 + 0.22 * blur * (1 - g / ghosts)
      drawBody(ctx, cx, cy, R, angleRef.current - offset, skin, alpha)
    }

    // The bearing turns at its own rate, independent of the body.
    drawBearing(ctx, cx, cy, R, angleRef.current * 0.45)
  }, [])

  // --- Loop --------------------------------------------------------------

  useEffect(() => {
    const tick = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000)
      lastTimeRef.current = now

      if (!dragRef.current.active) {
        let w = omegaRef.current
        w *= Math.exp(-VISCOUS * dt)
        const dry = (holdRef.current ? HOLD_DECEL : DRY_FRICTION) * dt
        if (Math.abs(w) <= dry) w = 0
        else w -= Math.sign(w) * dry
        omegaRef.current = w
      }

      angleRef.current += omegaRef.current * dt
      spunRef.current += Math.abs(omegaRef.current) * dt

      updateWhirr(Math.abs(omegaRef.current))
      draw()

      if (now - lastStatRef.current > 120) {
        lastStatRef.current = now
        const r = Math.abs(omegaRef.current) * RAD_TO_RPM
        setRpm(Math.round(r))
        if (r > maxRpmRef.current) {
          maxRpmRef.current = r
          setBestRpm(Math.round(r))
        }
        const s = Math.floor(spunRef.current / (Math.PI * 2))
        if (s !== lastSpinsRef.current) {
          lastSpinsRef.current = s
          setSpins(s)
        }
      }

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frameRef.current)
      lastTimeRef.current = 0
      const ctx = audioRef.current
      if (ctx) {
        whirrRef.current = null
        audioRef.current = null
        ctx.close().catch(() => {})
      }
    }
  }, [draw, updateWhirr])

  // --- Input -------------------------------------------------------------

  const geometry = useCallback(() => {
    const canvas = canvasRef.current!
    const w = canvas.width
    const h = canvas.height
    return { cx: w / 2, cy: h / 2, R: Math.min(w, h) * 0.37 }
  }, [])

  const getLocal = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    }
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      canvas.setPointerCapture(e.pointerId)
    } catch { /* capture is a nicety here; dragging still works without it */ }

    const ctx = getCtx()
    if (ctx.state === 'suspended') ctx.resume()

    const p = getLocal(e)
    const { cx, cy, R } = geometry()

    // Pinching the center grips the bearing, so it slows down instead of turning.
    if (Math.hypot(p.x - cx, p.y - cy) < R * 0.34) {
      holdRef.current = true
      playTouch()
      return
    }

    dragRef.current = {
      active: true,
      lastAngle: Math.atan2(p.y - cy, p.x - cx),
      lastTime: performance.now(),
      est: 0,
    }
    omegaRef.current = 0 // catching an arm stops the spin in your hand
  }, [getCtx, getLocal, geometry, playTouch])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.active) return
    e.preventDefault()

    const p = getLocal(e)
    const { cx, cy } = geometry()

    const a = Math.atan2(p.y - cy, p.x - cx)
    let d = a - dragRef.current.lastAngle
    while (d > Math.PI) d -= Math.PI * 2
    while (d < -Math.PI) d += Math.PI * 2
    dragRef.current.lastAngle = a
    angleRef.current += d
    spunRef.current += Math.abs(d)

    // Smoothed angular velocity estimate, used as the release speed.
    const now = performance.now()
    const dt = Math.max(0.008, (now - dragRef.current.lastTime) / 1000)
    dragRef.current.lastTime = now
    const inst = d / dt
    dragRef.current.est = dragRef.current.est * 0.55 + inst * 0.45
  }, [getLocal, geometry])

  const endDrag = useCallback(() => {
    holdRef.current = false
    if (!dragRef.current.active) return
    dragRef.current.active = false
    const v = Math.max(-MAX_OMEGA, Math.min(MAX_OMEGA, dragRef.current.est))
    omegaRef.current = Math.abs(v) < 1.2 ? 0 : v
    if (omegaRef.current !== 0) playFlick()
  }, [playFlick])

  const flick = useCallback(() => {
    const ctx = getCtx()
    if (ctx.state === 'suspended') ctx.resume()
    omegaRef.current = (Math.random() < 0.5 ? -1 : 1) * (110 + Math.random() * 110)
    playFlick()
  }, [getCtx, playFlick])

  const stop = useCallback(() => {
    omegaRef.current = 0
    playTouch()
  }, [playTouch])

  const reset = useCallback(() => {
    omegaRef.current = 0
    spunRef.current = 0
    maxRpmRef.current = 0
    lastSpinsRef.current = 0
    setRpm(0)
    setBestRpm(0)
    setSpins(0)
    playTouch()
  }, [playTouch])

  const stats = [
    { label: 'RPM', value: rpm },
    { label: 'Best RPM', value: bestRpm },
    { label: 'Spins', value: spins },
  ]

  return (
    <div className={embed ? 'mx-auto px-2 py-3' : 'max-w-4xl mx-auto px-4 py-8'}>
      {/* Header */}
      <div className={embed ? 'hidden' : 'text-center mb-6'}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">🔄 Fidget Spinner</h1>
        <p className="text-slate-400">Flick it. Watch it coast. Listen to the whirr.</p>
      </div>

      {/* Spinner designs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
        {SKINS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSkin(i)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition ${
              skin === i
                ? 'bg-violet-600 border-violet-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        <button
          onClick={flick}
          className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium text-white transition"
        >
          ⚡ Flick
        </button>
        <button
          onClick={stop}
          className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-white hover:border-slate-500 transition"
        >
          ⏹ Stop
        </button>
        <button
          onClick={reset}
          className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-white hover:border-slate-500 transition"
        >
          🔄 Reset
        </button>
      </div>

      {/* Canvas */}
      <div
        className="w-full rounded-2xl overflow-hidden border border-slate-700 mb-4"
        style={{ touchAction: 'none' }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="w-full cursor-grab active:cursor-grabbing"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-700 bg-slate-800/50 py-3 text-center"
          >
            <div className="text-xl sm:text-2xl font-bold tabular-nums">{s.value.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center text-slate-400 text-sm mb-8">
        <p>👆 <strong className="text-slate-200">Drag</strong> around the outside to spin it up</p>
        <p>🤏 <strong className="text-slate-200">Hold the center</strong> to slow it down</p>
      </div>

      {/* SEO Content */}
      <div className={embed ? 'hidden' : 'max-w-2xl mx-auto'}>
        <h2 className="text-xl font-bold mb-3">About Fidget Spinners</h2>
        <p className="text-slate-400 mb-4">
          Fidget spinners were designed as a simple way to release restless energy. A flick sends the
          bearing spinning, and the smooth whirr that slowly fades out gives your hands and ears
          something calming to follow — the same reason bubble wrap and slime are so satisfying.
        </p>
        <h2 className="text-xl font-bold mb-3">How to Play</h2>
        <p className="text-slate-400">
          Pick one of six designs, then drag around the outside to flick it into motion. Grab the
          center to slow it down, or hit <strong className="text-slate-200">Flick</strong> for an instant
          random spin. Watch the RPM climb and coast — can you beat your best?
        </p>
      </div>
    </div>
  )
}
