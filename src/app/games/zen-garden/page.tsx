'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

interface Stone {
  x: number
  y: number
  r: number
  color: string
  shadow: string
}

interface Plant {
  x: number
  y: number
  type: 'moss' | 'bamboo'
  sway: number // animation phase
  swaySpeed: number
}

// Stones placed when the garden is first created.
// Kept as a constant so the init effect never re-runs on "Add Stone".
const INITIAL_STONES = 3

export default function ZenGarden() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sandCanvasRef = useRef<HTMLCanvasElement | null>(null) // offscreen sand layer
  const isDrawingRef = useRef(false)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const animRef = useRef<number>(0)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const rakeSoundRef = useRef<number>(0)

  const [rakeStyle, setRakeStyle] = useState<'straight' | 'circle' | 'wave'>('straight')

  const stonesRef = useRef<Stone[]>([])
  const plantsRef = useRef<Plant[]>([])
  const dragStoneRef = useRef<{ active: boolean; index: number; offsetX: number; offsetY: number }>({
    active: false, index: -1, offsetX: 0, offsetY: 0,
  })
  const dragPlantRef = useRef<{ active: boolean; index: number; offsetX: number; offsetY: number }>({
    active: false, index: -1, offsetX: 0, offsetY: 0,
  })

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
    return audioCtxRef.current
  }, [])

  // Raking sound - soft sand scraping
  const playRakeSound = useCallback((speed: number) => {
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const now = ctx.currentTime
      if (now - rakeSoundRef.current < 0.03) return
      rakeSoundRef.current = now

      // White noise filtered to sound like sand
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 1.5)
      }
      const src = ctx.createBufferSource()
      src.buffer = buf

      // Bandpass for sandy texture
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 3000 + speed * 2000
      bp.Q.value = 0.8

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(Math.min(0.08, 0.01 + speed * 0.04), now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

      src.connect(bp)
      bp.connect(gain)
      gain.connect(ctx.destination)
      src.start(now)
    } catch { /* ignore */ }
  }, [getAudioCtx])

  // Stone placement sound - soft thud
  const playStoneSound = useCallback(() => {
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.setValueAtTime(120, t)
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.15)
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.15, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.2)

      // Noise thud
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4)
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 400
      const g2 = ctx.createGain()
      g2.gain.setValueAtTime(0.1, t)
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
      src.connect(lp)
      lp.connect(g2)
      g2.connect(ctx.destination)
      src.start(t)
    } catch { /* ignore */ }
  }, [getAudioCtx])

  // Generate random stones
  const generateStones = useCallback((w: number, h: number, count: number) => {
    const stones: Stone[] = []
    const colors = [
      { color: '#6b7280', shadow: '#4b5563' },
      { color: '#78716c', shadow: '#57534e' },
      { color: '#9ca3af', shadow: '#6b7280' },
      { color: '#a8a29e', shadow: '#78716c' },
    ]
    for (let i = 0; i < count; i++) {
      const c = colors[i % colors.length]
      stones.push({
        x: 80 + Math.random() * (w - 160),
        y: 80 + Math.random() * (h - 160),
        r: 20 + Math.random() * 25,
        color: c.color,
        shadow: c.shadow,
      })
    }
    return stones
  }, [])

  // Generate plants
  const generatePlants = useCallback((w: number, h: number) => {
    const plants: Plant[] = [
      { x: 60 + Math.random() * 80, y: 60 + Math.random() * 80, type: 'moss', sway: Math.random() * Math.PI * 2, swaySpeed: 0.5 + Math.random() * 0.5 },
      { x: w - 100 + Math.random() * 60, y: h - 100 + Math.random() * 60, type: 'bamboo', sway: Math.random() * Math.PI * 2, swaySpeed: 0.3 + Math.random() * 0.4 },
    ]
    return plants
  }, [])

  // Init
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement!

    const targetSize = () => ({
      w: parent.clientWidth,
      h: Math.min(500, window.innerHeight * 0.55),
    })

    // Fill a fresh sand layer with base color + grain noise
    const makeSand = (w: number, h: number) => {
      const sand = document.createElement('canvas')
      sand.width = w
      sand.height = h
      const ctx = sand.getContext('2d')!
      ctx.fillStyle = '#d4b896'
      ctx.fillRect(0, 0, w, h)
      const imgData = ctx.getImageData(0, 0, w, h)
      for (let i = 0; i < imgData.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 15
        imgData.data[i] += noise     // R
        imgData.data[i+1] += noise   // G
        imgData.data[i+2] += noise   // B
      }
      ctx.putImageData(imgData, 0, 0)
      return sand
    }

    const { w, h } = targetSize()
    canvas.width = w
    canvas.height = h
    sandCanvasRef.current = makeSand(w, h)

    stonesRef.current = generateStones(w, h, INITIAL_STONES)
    plantsRef.current = generatePlants(w, h)

    // Resize: rescale the sand art and keep objects within bounds
    const onResize = () => {
      const { w: nw, h: nh } = targetSize()
      if (nw === canvas.width && nh === canvas.height) return

      // Rebuild sand canvas, drawing the previous art scaled to the new size
      const prev = sandCanvasRef.current
      const sand = makeSand(nw, nh)
      if (prev && prev.width > 0 && prev.height > 0) {
        const ctx = sand.getContext('2d')!
        ctx.drawImage(prev, 0, 0, prev.width, prev.height, 0, 0, nw, nh)
      }
      sandCanvasRef.current = sand

      canvas.width = nw
      canvas.height = nh

      const clamp = (v: number, min: number, max: number) =>
        Math.min(Math.max(v, min), Math.max(min, max))

      for (const s of stonesRef.current) {
        s.x = clamp(s.x, s.r, nw - s.r)
        s.y = clamp(s.y, s.r, nh - s.r)
      }
      for (const p of plantsRef.current) {
        p.x = clamp(p.x, 20, nw - 20)
        p.y = clamp(p.y, 20, nh - 20)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [generateStones, generatePlants])

  // Draw rake lines on sand canvas
  const rakeLine = useCallback((x1: number, y1: number, x2: number, y2: number, style: string) => {
    const sand = sandCanvasRef.current
    if (!sand) return
    const ctx = sand.getContext('2d')!
    const dx = x2 - x1
    const dy = y2 - y1
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 1) return

    const angle = Math.atan2(dy, dx)
    const perpX = -Math.sin(angle)
    const perpY = Math.cos(angle)

    if (style === 'straight') {
      // 3 parallel lines
      for (let offset = -6; offset <= 6; offset += 6) {
        ctx.beginPath()
        ctx.moveTo(x1 + perpX * offset, y1 + perpY * offset)
        ctx.lineTo(x2 + perpX * offset, y2 + perpY * offset)
        ctx.strokeStyle = '#c4a882'
        ctx.lineWidth = 2
        ctx.stroke()

        // Highlight next to groove
        ctx.beginPath()
        ctx.moveTo(x1 + perpX * (offset + 1.5), y1 + perpY * (offset + 1.5))
        ctx.lineTo(x2 + perpX * (offset + 1.5), y2 + perpY * (offset + 1.5))
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
    } else if (style === 'circle') {
      // Concentric arcs
      const cx = x2
      const cy = y2
      for (let r = 10; r <= 40; r += 8) {
        ctx.beginPath()
        ctx.arc(cx, cy, r, angle - 0.5, angle + 0.5)
        ctx.strokeStyle = '#c4a882'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    } else if (style === 'wave') {
      // Wavy line
      ctx.beginPath()
      const steps = Math.max(1, Math.floor(dist / 3))
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const px = x1 + dx * t
        const py = y1 + dy * t
        const wave = Math.sin(t * Math.PI * 6) * 6
        const wx = px + perpX * wave
        const wy = py + perpY * wave
        if (i === 0) ctx.moveTo(wx, wy)
        else ctx.lineTo(wx, wy)
      }
      ctx.strokeStyle = '#c4a882'
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }, [])

  // Draw everything
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const sand = sandCanvasRef.current
    if (!canvas || !sand) return
    const ctx = canvas.getContext('2d')!
    const w = canvas.width
    const h = canvas.height

    // Draw sand layer
    ctx.drawImage(sand, 0, 0)

    // Draw stones
    for (const stone of stonesRef.current) {
      // Shadow
      ctx.beginPath()
      ctx.ellipse(stone.x + 2, stone.y + 4, stone.r, stone.r * 0.7, 0, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0,0,0,0.2)'
      ctx.fill()

      // Stone body
      ctx.beginPath()
      ctx.ellipse(stone.x, stone.y, stone.r, stone.r * 0.7, 0, 0, Math.PI * 2)
      const grad = ctx.createRadialGradient(
        stone.x - stone.r * 0.3, stone.y - stone.r * 0.3, 2,
        stone.x, stone.y, stone.r
      )
      grad.addColorStop(0, '#b0b0b0')
      grad.addColorStop(0.5, stone.color)
      grad.addColorStop(1, stone.shadow)
      ctx.fillStyle = grad
      ctx.fill()

      // Highlight
      ctx.beginPath()
      ctx.ellipse(stone.x - stone.r * 0.25, stone.y - stone.r * 0.2, stone.r * 0.3, stone.r * 0.15, -0.3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ctx.fill()
    }

    // Update time for animations
    const time = Date.now() / 1000

    // Draw plants (animated)
    for (const plant of plantsRef.current) {
      if (plant.type === 'moss') {
        // Pre-seeded positions (deterministic from plant.x/y)
        const mossDots = [
          { ox: -8, oy: -5, r: 6 },
          { ox: 6, oy: -7, r: 5 },
          { ox: -3, oy: 5, r: 7 },
          { ox: 9, oy: 3, r: 4 },
          { ox: -10, oy: 2, r: 5 },
        ]
        for (let i = 0; i < mossDots.length; i++) {
          const d = mossDots[i]
          const breathe = 1 + Math.sin(time * plant.swaySpeed + i * 1.2) * 0.25
          const r = d.r * breathe
          const hue = 130 + (i * 7)
          const light = 30 + (i * 3)
          ctx.beginPath()
          ctx.arc(plant.x + d.ox, plant.y + d.oy, r, 0, Math.PI * 2)
          ctx.fillStyle = `hsl(${hue}, 45%, ${light}%)`
          ctx.fill()
        }
      } else {
        // Bamboo with wind sway
        const swayAngle = Math.sin(time * plant.swaySpeed + plant.sway) * 0.04
        const height = 48 + Math.sin(time * 0.3) * 2 // slight breathing

        ctx.save()
        ctx.translate(plant.x, plant.y)
        ctx.rotate(swayAngle)

        // Stem
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -height)
        ctx.strokeStyle = '#4a7c59'
        ctx.lineWidth = 4
        ctx.lineCap = 'round'
        ctx.stroke()

        // Segments
        for (let seg = 0; seg < 3; seg++) {
          const sy = -12 - seg * 12
          ctx.beginPath()
          ctx.moveTo(-2, sy)
          ctx.lineTo(2, sy)
          ctx.strokeStyle = '#3d6b4a'
          ctx.lineWidth = 5
          ctx.stroke()
        }

        // Top Y leaves
        const topLeafSway = Math.sin(time * plant.swaySpeed * 1.5) * 4
        // Left leaf
        ctx.beginPath()
        ctx.moveTo(0, -height)
        ctx.quadraticCurveTo(-12 + topLeafSway, -height - 14, -22 + topLeafSway, -height - 4)
        ctx.quadraticCurveTo(-12 + topLeafSway, -height - 8, 0, -height)
        ctx.fillStyle = '#6ab07a'
        ctx.fill()
        // Right leaf
        ctx.beginPath()
        ctx.moveTo(0, -height)
        ctx.quadraticCurveTo(12 + topLeafSway, -height - 14, 22 + topLeafSway, -height - 4)
        ctx.quadraticCurveTo(12 + topLeafSway, -height - 8, 0, -height)
        ctx.fillStyle = '#6ab07a'
        ctx.fill()

        // Side leaves with independent sway
        for (let i = 0; i < 2; i++) {
          const ly = -16 - i * 14
          const dir = i % 2 === 0 ? 1 : -1
          const leafSway = Math.sin(time * plant.swaySpeed * 1.5 + i * 2) * 3
          ctx.beginPath()
          ctx.moveTo(0, ly)
          ctx.quadraticCurveTo(dir * 15 + leafSway, ly - 7, dir * 25 + leafSway, ly + 2)
          ctx.quadraticCurveTo(dir * 15 + leafSway, ly - 2, 0, ly)
          ctx.fillStyle = '#5a9c6a'
          ctx.fill()
        }

        ctx.restore()
      }
    }

    // Garden border
    ctx.strokeStyle = '#8b7355'
    ctx.lineWidth = 3
    ctx.strokeRect(5, 5, w - 10, h - 10)
  }, [])

  // Animation loop
  const loop = useCallback(() => {
    draw()
    animRef.current = requestAnimationFrame(loop)
  }, [draw])

  useEffect(() => {
    animRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animRef.current)
  }, [loop])

  // Get canvas position
  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const cx = 'touches' in e ? e.touches[0].clientX : e.clientX
    const cy = 'touches' in e ? e.touches[0].clientY : e.clientY
    return { x: cx - rect.left, y: cy - rect.top }
  }, [])

  // Check if clicking on a stone
  const findStone = useCallback((x: number, y: number) => {
    for (let i = stonesRef.current.length - 1; i >= 0; i--) {
      const s = stonesRef.current[i]
      const d = Math.hypot(x - s.x, y - s.y)
      if (d < s.r) return i
    }
    return -1
  }, [])

  // Check if clicking on a plant
  const findPlant = useCallback((x: number, y: number) => {
    for (let i = plantsRef.current.length - 1; i >= 0; i--) {
      const p = plantsRef.current[i]
      const hitR = p.type === 'bamboo' ? 30 : 20
      const d = Math.hypot(x - p.x, y - p.y)
      if (d < hitR) return i
    }
    return -1
  }, [])

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const pos = getPos(e)

    // Check if clicking stone
    const stoneIdx = findStone(pos.x, pos.y)
    if (stoneIdx >= 0) {
      dragStoneRef.current = {
        active: true,
        index: stoneIdx,
        offsetX: pos.x - stonesRef.current[stoneIdx].x,
        offsetY: pos.y - stonesRef.current[stoneIdx].y,
      }
      playStoneSound()
      return
    }

    // Check if clicking plant
    const plantIdx = findPlant(pos.x, pos.y)
    if (plantIdx >= 0) {
      dragPlantRef.current = {
        active: true,
        index: plantIdx,
        offsetX: pos.x - plantsRef.current[plantIdx].x,
        offsetY: pos.y - plantsRef.current[plantIdx].y,
      }
      playStoneSound()
      return
    }

    // Otherwise start raking
    isDrawingRef.current = true
    lastPosRef.current = pos
  }, [getPos, findStone, findPlant, playStoneSound])

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const pos = getPos(e)

    // Dragging stone
    if (dragStoneRef.current.active) {
      const s = stonesRef.current[dragStoneRef.current.index]
      s.x = pos.x - dragStoneRef.current.offsetX
      s.y = pos.y - dragStoneRef.current.offsetY
      return
    }

    // Dragging plant
    if (dragPlantRef.current.active) {
      const p = plantsRef.current[dragPlantRef.current.index]
      p.x = pos.x - dragPlantRef.current.offsetX
      p.y = pos.y - dragPlantRef.current.offsetY
      return
    }

    // Raking
    if (!isDrawingRef.current || !lastPosRef.current) return
    const last = lastPosRef.current
    const speed = Math.hypot(pos.x - last.x, pos.y - last.y) / 10

    rakeLine(last.x, last.y, pos.x, pos.y, rakeStyle)
    playRakeSound(speed)

    lastPosRef.current = pos
  }, [getPos, rakeStyle, rakeLine, playRakeSound])

  const handleEnd = useCallback(() => {
    isDrawingRef.current = false
    lastPosRef.current = null
    dragStoneRef.current = { active: false, index: -1, offsetX: 0, offsetY: 0 }
    dragPlantRef.current = { active: false, index: -1, offsetX: 0, offsetY: 0 }
  }, [])

  // Clear sand
  const clearSand = useCallback(() => {
    const sand = sandCanvasRef.current
    if (!sand) return
    const ctx = sand.getContext('2d')!
    const w = sand.width
    const h = sand.height
    ctx.fillStyle = '#d4b896'
    ctx.fillRect(0, 0, w, h)
    // Re-add grain
    const imgData = ctx.getImageData(0, 0, w, h)
    for (let i = 0; i < imgData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 15
      imgData.data[i] += noise
      imgData.data[i+1] += noise
      imgData.data[i+2] += noise
    }
    ctx.putImageData(imgData, 0, 0)
    playStoneSound()
  }, [playStoneSound])

  // Add stone
  const addStone = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const colors = [
      { color: '#6b7280', shadow: '#4b5563' },
      { color: '#78716c', shadow: '#57534e' },
      { color: '#9ca3af', shadow: '#6b7280' },
    ]
    const c = colors[stonesRef.current.length % colors.length]
    stonesRef.current.push({
      x: 80 + Math.random() * (canvas.width - 160),
      y: 80 + Math.random() * (canvas.height - 160),
      r: 20 + Math.random() * 25,
      color: c.color,
      shadow: c.shadow,
    })
    playStoneSound()
  }, [playStoneSound])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          🪨 Zen Garden
        </h1>
        <p className="text-slate-400">
          Rake the sand. Place stones. Find your calm.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        {/* Rake style */}
        <div className="flex bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
          {(['straight', 'circle', 'wave'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setRakeStyle(s)}
              className={`px-3 py-1.5 text-sm transition ${rakeStyle === s ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {s === 'straight' ? '||| Lines' : s === 'circle' ? '◎ Circles' : '〰 Waves'}
            </button>
          ))}
        </div>

        {/* Add stone */}
        <button
          onClick={addStone}
          className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-white hover:border-slate-500 transition"
        >
          🪨 Add Stone
        </button>

        {/* Clear */}
        <button
          onClick={clearSand}
          className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-white hover:border-slate-500 transition"
        >
          🔄 Clear Sand
        </button>
      </div>

      {/* Canvas */}
      <div
        className="w-full rounded-2xl overflow-hidden border border-slate-700 mb-6"
        style={{ touchAction: 'none' }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="w-full cursor-crosshair"
        />
      </div>

      {/* Instructions */}
      <div className="text-center text-slate-400 text-sm mb-8">
        <p>👆 <strong className="text-slate-200">Drag</strong> on sand to rake patterns</p>
        <p>🪨 <strong className="text-slate-200">Drag</strong> stones and plants to reposition them</p>
      </div>

      {/* SEO Content */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-3">About Zen Garden</h2>
        <p className="text-slate-400 mb-4">
          Japanese rock gardens (枯山水, karesansui) have been used for centuries as spaces for
          meditation and contemplation. This virtual zen garden lets you experience the calming
          ritual of raking sand and arranging stones — anywhere, anytime.
        </p>
        <h2 className="text-xl font-bold mb-3">How to Use</h2>
        <p className="text-slate-400">
          Choose your rake pattern — parallel lines, concentric circles, or flowing waves.
          Then drag across the sand to create your pattern. Place and move stones to complete
          your garden. There&apos;s no goal, no score — just the quiet satisfaction of creating
          something beautiful.
        </p>
      </div>
    </div>
  )
}