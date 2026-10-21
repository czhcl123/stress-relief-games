'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

type Tool = 'slice' | 'scoop' | 'smooth'

interface SandType {
  id: string
  name: string
  /** Mid-tone of the sand. Shading is applied on top of this. */
  base: [number, number, number]
}

// Six sand colors, matching the "six variants" convention of the other games.
const SANDS: SandType[] = [
  { id: 'beige', name: 'Beige', base: [197, 171, 136] },
  { id: 'ocean', name: 'Ocean', base: [112, 163, 203] },
  { id: 'blossom', name: 'Blossom', base: [219, 158, 173] },
  { id: 'lavender', name: 'Lavender', base: [170, 152, 210] },
  { id: 'cocoa', name: 'Cocoa', base: [150, 110, 79] },
  { id: 'charcoal', name: 'Charcoal', base: [98, 102, 111] },
]

const TOOLS: { id: Tool; icon: string; label: string }[] = [
  { id: 'slice', icon: '🔪', label: 'Slice' },
  { id: 'scoop', icon: '🥄', label: 'Scoop' },
  { id: 'smooth', icon: '🖐️', label: 'Smooth' },
]

// The sand is a height map. Everything visible (grooves, piled-up ridges,
// shaded slopes) comes from these numbers, so cuts stay crisp forever —
// which is exactly how real kinetic sand behaves.
const GRID_W = 176
const SLICE_DEPTH = 3.4 // cells
const SCOOP_R = 7 // cells
const SMOOTH_R = 9 // cells

export default function SandCutting({ embed = false }: { embed?: boolean } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)

  const gridRef = useRef({ w: GRID_W, h: 110 })
  const heightRef = useRef<Float32Array | null>(null)
  const grainRef = useRef<Float32Array | null>(null)
  const offRef = useRef<HTMLCanvasElement | null>(null)
  const imageRef = useRef<ImageData | null>(null)
  const dirtyRef = useRef(true)

  const drawingRef = useRef(false)
  const lastCellRef = useRef<{ x: number; y: number } | null>(null)
  const cursorRef = useRef({ x: 0, y: 0, angle: 0, active: false })
  const crunchDistRef = useRef(0)
  const lastCrunchRef = useRef(0)
  const lastMoveRef = useRef(0)
  const cutsRef = useRef(0)

  const sandRef = useRef(0)
  const toolRef = useRef<Tool>('slice')
  const [sand, setSand] = useState(0)
  const [tool, setTool] = useState<Tool>('slice')
  const [cuts, setCuts] = useState(0)
  const [cutPct, setCutPct] = useState(0)

  const audioRef = useRef<AudioContext | null>(null)

  // Keep the render loop independent of React state.
  useEffect(() => {
    sandRef.current = sand
    // Repaint: the base color lives in the cached sand bitmap.
    dirtyRef.current = true
  }, [sand])

  useEffect(() => {
    toolRef.current = tool
  }, [tool])

  const getCtx = useCallback(() => {
    if (!audioRef.current) audioRef.current = new AudioContext()
    return audioRef.current
  }, [])

  // --- Sound -------------------------------------------------------------

  // Granular crunch: a very short filtered noise burst. Deliberately avoids
  // long low sine tones, which read as a hum rather than sand.
  const playCrunch = useCallback(
    (intensity: number) => {
      try {
        const ctx = getCtx()
        if (ctx.state === 'suspended') ctx.resume()
        const t = ctx.currentTime
        const isScoop = toolRef.current === 'scoop'

        const dur = 0.03 + Math.min(0.05, intensity * 0.003)
        const len = Math.max(64, Math.floor(ctx.sampleRate * dur))
        const buf = ctx.createBuffer(1, len, ctx.sampleRate)
        const data = buf.getChannelData(0)
        for (let i = 0; i < len; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.7)
        }

        const src = ctx.createBufferSource()
        src.buffer = buf

        const bp = ctx.createBiquadFilter()
        bp.type = 'bandpass'
        bp.frequency.value = isScoop ? 900 + Math.random() * 700 : 2400 + Math.random() * 1900
        bp.Q.value = isScoop ? 0.9 : 1.7

        const hp = ctx.createBiquadFilter()
        hp.type = 'highpass'
        hp.frequency.value = isScoop ? 280 : 1100

        const gain = ctx.createGain()
        const vol =
          (isScoop ? 0.05 : 0.075) *
          (0.7 + Math.random() * 0.6) *
          Math.min(1.4, 0.6 + intensity * 0.02)
        gain.gain.setValueAtTime(vol, t)
        gain.gain.exponentialRampToValueAtTime(0.0008, t + dur + 0.02)

        src.connect(bp)
        bp.connect(hp)
        hp.connect(gain)
        gain.connect(ctx.destination)
        src.start(t)
      } catch {
        /* ignore */
      }
    },
    [getCtx]
  )

  // Soft squish when the tool first touches the sand.
  const playPress = useCallback(() => {
    try {
      const ctx = getCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime
      const len = Math.floor(ctx.sampleRate * 0.09)
      const buf = ctx.createBuffer(1, len, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 1100
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.05, t)
      gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.1)
      src.connect(lp)
      lp.connect(gain)
      gain.connect(ctx.destination)
      src.start(t)
    } catch {
      /* ignore */
    }
  }, [getCtx])

  // --- Height map --------------------------------------------------------

  const seedSurface = useCallback(() => {
    const hh = heightRef.current
    if (!hh) return
    const { w: gw, h: gh } = gridRef.current
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        // Gentle dunes plus a whisper of grain. Anything stronger turns the
        // normal-based shading into per-pixel speckle instead of sand.
        hh[y * gw + x] =
          Math.sin(x * 0.045) * 1.4 +
          Math.cos(y * 0.06) * 1.1 +
          (Math.random() - 0.5) * 0.07
      }
    }
    dirtyRef.current = true
  }, [])

  const clear = useCallback(() => {
    seedSurface()
    cutsRef.current = 0
    setCuts(0)
    setCutPct(0)
    playPress()
  }, [seedSurface, playPress])

  /** Carves (or smooths) a single spot of sand. Coordinates are in cells. */
  const applyBrush = useCallback((gx: number, gy: number, fromX: number, fromY: number) => {
    const hh = heightRef.current
    if (!hh) return
    const { w: gw, h: gh } = gridRef.current
    const t = toolRef.current
    const cx = Math.round(gx)
    const cy = Math.round(gy)

    if (t === 'slice') {
      // Blade runs along the stroke. Sample a smooth perpendicular profile
      // around the stamp point instead of rounding to whole cells — rounding
      // makes the groove hop between rows and leaves a dashed edge.
      let dx = gx - fromX
      let dy = gy - fromY
      const len = Math.hypot(dx, dy)
      if (len < 0.0001) {
        dx = 1
        dy = 0
      } else {
        dx /= len
        dy /= len
      }
      const nx = -dy
      const ny = dx

      const R = 4
      const x0 = Math.max(0, Math.floor(gx) - R)
      const x1 = Math.min(gw - 1, Math.floor(gx) + R)
      const y0 = Math.max(0, Math.floor(gy) - R)
      const y1 = Math.min(gh - 1, Math.floor(gy) + R)

      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const rx = x - gx
          const ry = y - gy
          // Keep the stamp short along the blade; neighbouring stamps blend.
          if (Math.abs(rx * dx + ry * dy) > 1.3) continue
          const pd = Math.abs(rx * nx + ry * ny)
          const i = y * gw + x

          if (pd <= 1.15) {
            // V-shaped groove
            const f = 1 - (pd / 1.5) * (pd / 1.5)
            const depth = SLICE_DEPTH * f
            if (hh[i] > -depth) hh[i] = -depth
          } else if (pd <= 3.1) {
            // Displaced sand. max() keeps overlapping stamps idempotent, so
            // the ridge comes out smooth instead of lumpy.
            const f = Math.max(0, 1 - Math.abs(pd - 2.1) / 1.0)
            const rise = 0.2 + 0.8 * f
            if (hh[i] < rise) hh[i] = rise
          }
        }
      }
      dirtyRef.current = true
      return
    }

    const R = t === 'scoop' ? SCOOP_R : SMOOTH_R
    const x0 = Math.max(0, cx - R)
    const x1 = Math.min(gw - 1, cx + R)
    const y0 = Math.max(0, cy - R)
    const y1 = Math.min(gh - 1, cy + R)

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const d = Math.hypot(x - gx, y - gy)
        if (d > R) continue
        const i = y * gw + x

        if (t === 'scoop') {
          const f = 1 - d / R
          if (d < R * 0.75) {
            hh[i] = Math.max(hh[i] - 1.5 * f, -5.5)
          } else {
            // Sand has to go somewhere: pile it on the rim.
            hh[i] = Math.min(hh[i] + 0.5 * f, 4)
          }
        } else {
          const k = 0.34 * (1 - d / R)
          hh[i] += (0 - hh[i]) * k
        }
      }
    }
    dirtyRef.current = true
  }, [])

  // --- Rendering ---------------------------------------------------------

  /** Rebuilds the shaded sand bitmap from the height map. */
  const render = useCallback(() => {
    const off = offRef.current
    const image = imageRef.current
    const hh = heightRef.current
    if (!off || !image || !hh) return

    const { w: gw, h: gh } = gridRef.current
    const base = SANDS[sandRef.current].base
    const grain = grainRef.current
    const data = image.data

    for (let y = 0; y < gh; y++) {
      const rowStart = y * gw
      for (let x = 0; x < gw; x++) {
        const i = rowStart + x
        const xm = x > 0 ? i - 1 : i
        const xp = x < gw - 1 ? i + 1 : i
        const ym = y > 0 ? i - gw : i
        const yp = y < gh - 1 ? i + gw : i

        const h = hh[i]
        const dx = hh[xp] - hh[xm]
        const dy = hh[yp] - hh[ym]
        const len = Math.sqrt(dx * dx + dy * dy + 1)
        // Diffuse light from the upper left, normalised so flat sand = 1.
        const diff = (0.45 * dx + 0.45 * dy + 1) / len
        let shade = 1 + (diff - 1) * 1.5
        if (shade < 0.5) shade = 0.5
        else if (shade > 1.28) shade = 1.28
        // Sunken areas read darker (cheap ambient occlusion).
        shade *= 1 + Math.max(-4, Math.min(0, h)) * 0.04

        const g = grain ? grain[i] : 1
        const o = i * 4
        // Uint8ClampedArray rounds and clamps for us.
        data[o] = base[0] * shade * g
        data[o + 1] = base[1] * shade * g
        data[o + 2] = base[2] * shade * g
        data[o + 3] = 255
      }
    }

    off.getContext('2d')!.putImageData(image, 0, 0)
    dirtyRef.current = false
  }, [])

  /** Where the sand block sits inside the canvas, in canvas pixels. */
  const sandRect = useCallback((canvas: HTMLCanvasElement, fit = 0.96) => {
    const { w: gw, h: gh } = gridRef.current
    const scale = Math.min(canvas.width / gw, canvas.height / gh) * fit
    const dw = gw * scale
    const dh = gh * scale
    return { scale, dw, dh, ox: (canvas.width - dw) / 2, oy: (canvas.height - dh) / 2 }
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (dirtyRef.current) render()

    const W = canvas.width
    const H = canvas.height
    const { scale, dw, dh, ox, oy } = sandRect(canvas)

    // Table
    const bg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.2, W / 2, H / 2, Math.max(W, H) * 0.75)
    bg.addColorStop(0, '#151d2e')
    bg.addColorStop(1, '#0a0f1a')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Tray behind the sand
    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.5)'
    ctx.shadowBlur = 16
    ctx.shadowOffsetY = 6
    ctx.fillStyle = '#243044'
    ctx.fillRect(ox - 7, oy - 7, dw + 14, dh + 14)
    ctx.restore()

    const off = offRef.current
    if (off) {
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(off, ox, oy, dw, dh)
    }

    // Tool cursor
    const cur = cursorRef.current
    if (cur.active) {
      const t = toolRef.current
      const rPx = (t === 'scoop' ? SCOOP_R : t === 'smooth' ? SMOOTH_R : 2.4) * scale
      ctx.save()
      ctx.beginPath()
      ctx.arc(cur.x, cur.y, rPx, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.font = '26px system-ui, "Segoe UI Emoji", sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.translate(cur.x, cur.y)
      if (t === 'slice') {
        ctx.rotate(cur.angle + Math.PI * 0.75)
        ctx.fillText('🔪', 0, -12)
      } else {
        ctx.fillText(t === 'scoop' ? '🥄' : '🖐️', 0, 0)
      }
      ctx.restore()
    }
  }, [render, sandRect])

  // --- Loop --------------------------------------------------------------

  useEffect(() => {
    const tick = () => {
      draw()
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frameRef.current)
      const ctx = audioRef.current
      if (ctx) {
        audioRef.current = null
        ctx.close().catch(() => {})
      }
    }
  }, [draw])

  // Size the canvas once and build the height map to match its aspect.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement!

    const size = () => ({
      w: parent.clientWidth,
      h: Math.min(560, window.innerHeight * 0.6),
    })

    const apply = () => {
      const { w, h } = size()
      if (w === canvas.width && h === canvas.height) return
      // Resizing only re-frames the sand; the sculpted surface is untouched.
      canvas.width = w
      canvas.height = h
    }

    if (!heightRef.current) {
      const { w, h } = size()
      canvas.width = w
      canvas.height = h
      const gw = GRID_W
      const gh = Math.max(60, Math.min(170, Math.round(gw * (h / w))))
      gridRef.current = { w: gw, h: gh }

      const n = gw * gh
      heightRef.current = new Float32Array(n)
      const grain = new Float32Array(n)
      for (let i = 0; i < n; i++) grain[i] = 0.975 + Math.random() * 0.05
      grainRef.current = grain

      const off = document.createElement('canvas')
      off.width = gw
      off.height = gh
      offRef.current = off
      imageRef.current = off.getContext('2d')!.createImageData(gw, gh)

      seedSurface()
    }

    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [seedSurface])

  // --- Input -------------------------------------------------------------

  const getLocal = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    }
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      const canvas = canvasRef.current
      if (!canvas) return
      try {
        canvas.setPointerCapture(e.pointerId)
      } catch {
        /* capture is a nicety here; drawing still works without it */
      }

      const ctx = getCtx()
      if (ctx.state === 'suspended') ctx.resume()

      const p = getLocal(e)
      const { scale, ox, oy } = sandRect(canvas)
      const cell = { x: (p.x - ox) / scale, y: (p.y - oy) / scale }

      drawingRef.current = true
      lastCellRef.current = cell
      cursorRef.current = { x: p.x, y: p.y, angle: cursorRef.current.angle, active: true }
      crunchDistRef.current = 0
      applyBrush(cell.x, cell.y, cell.x - 1, cell.y)
      playPress()
    },
    [applyBrush, getCtx, getLocal, playPress, sandRect]
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const p = getLocal(e)
      const { scale, ox, oy } = sandRect(canvas)
      const cell = { x: (p.x - ox) / scale, y: (p.y - oy) / scale }
      const from = lastCellRef.current

      cursorRef.current = {
        x: p.x,
        y: p.y,
        angle: from ? Math.atan2(cell.y - from.y, cell.x - from.x) : cursorRef.current.angle,
        active: true,
      }

      if (!drawingRef.current || !from) return
      const dist = Math.hypot(cell.x - from.x, cell.y - from.y)
      if (dist < 0.3) return
      e.preventDefault()

      // Stamp along the segment so fast drags never leave gaps.
      const steps = Math.max(1, Math.ceil(dist / 1.1))
      for (let s = 1; s <= steps; s++) {
        const a = s / steps
        applyBrush(from.x + (cell.x - from.x) * a, from.y + (cell.y - from.y) * a, from.x, from.y)
      }
      lastCellRef.current = cell

      const now = performance.now()
      crunchDistRef.current += dist
      if (crunchDistRef.current > 2.6 && now - lastCrunchRef.current > 38) {
        const speed = dist / Math.max(0.008, (now - lastMoveRef.current) / 1000)
        crunchDistRef.current = 0
        lastCrunchRef.current = now
        playCrunch(speed)
      }
      lastMoveRef.current = now
    },
    [applyBrush, getLocal, playCrunch, sandRect]
  )

  const endStroke = useCallback(() => {
    if (!drawingRef.current) return
    drawingRef.current = false
    lastCellRef.current = null
    crunchDistRef.current = 0
    cursorRef.current.active = false

    cutsRef.current += 1
    setCuts(cutsRef.current)

    const hh = heightRef.current
    if (hh) {
      let carved = 0
      let total = 0
      for (let i = 0; i < hh.length; i += 4) {
        total++
        if (hh[i] < -0.6) carved++
      }
      setCutPct(Math.round((carved / total) * 100))
    }
  }, [])

  const stats = [
    { label: 'Cuts', value: cuts.toLocaleString() },
    { label: 'Sand cut', value: `${cutPct}%` },
  ]

  return (
    <div className={embed ? 'mx-auto px-2 py-3' : 'max-w-4xl mx-auto px-4 py-8'}>
      {/* Header */}
      <div className={embed ? 'hidden' : 'text-center mb-6'}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">🏖️ Sand Cutting</h1>
        <p className="text-slate-400">Slice, scoop and smooth kinetic sand. Crisp cuts, crunchy sounds.</p>
      </div>

      {/* Sand colors */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
        {SANDS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSand(i)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition ${
              sand === i
                ? 'bg-violet-600 border-violet-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Tools */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`px-4 py-1.5 rounded-lg border text-sm font-medium transition ${
              tool === t.id
                ? 'bg-violet-600 border-violet-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
        <button
          onClick={clear}
          className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-white hover:border-slate-500 transition"
        >
          🔄 Reset sand
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
          onPointerUp={endStroke}
          onPointerCancel={endStroke}
          className="w-full cursor-crosshair"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6 max-w-md mx-auto">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-700 bg-slate-800/50 py-3 text-center">
            <div className="text-xl sm:text-2xl font-bold tabular-nums">{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center text-slate-400 text-sm mb-8">
        <p>🔪 <strong className="text-slate-200">Drag</strong> across the sand to cut a clean groove</p>
        <p>🥄 <strong className="text-slate-200">Scoop</strong> to dig in risers, 🖐️ <strong className="text-slate-200">Smooth</strong> to flatten it back</p>
      </div>

      {/* SEO Content */}
      <div className={embed ? 'hidden' : 'max-w-2xl mx-auto'}>
        <h2 className="text-xl font-bold mb-3">About Sand Cutting</h2>
        <p className="text-slate-400 mb-4">
          Kinetic sand holds whatever shape you press into it, which is why cutting it is so
          satisfying: a steady hand carves a crisp groove, the displaced sand rolls into little
          ridges either side, and the surface stays exactly as you left it. No mess, no vacuuming.
        </p>
        <h2 className="text-xl font-bold mb-3">How to Play</h2>
        <p className="text-slate-400">
          Pick a sand color and a tool, then drag across the tray. <strong className="text-slate-200">Slice</strong> leaves
          a sharp cut with raised edges, <strong className="text-slate-200">Scoop</strong> digs a rounded crater and piles the
          sand on the rim, and <strong className="text-slate-200">Smooth</strong> presses everything flat again when you want a
          fresh start. Try carving a grid, or slice thin strips and watch the light catch each edge.
        </p>
      </div>
    </div>
  )
}
