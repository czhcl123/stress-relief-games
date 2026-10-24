'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  homeX: number
  homeY: number
}

const SLIME_TYPES = [
  { name: '🟢 Classic', color: '#4ade80', glow: '#22c55e', highlight: '#86efac', viscosity: 0.92 },
  { name: '🟣 Galaxy', color: '#a78bfa', glow: '#8b5cf6', highlight: '#c4b5fd', viscosity: 0.88 },
  { name: '🩷 Pink', color: '#f472b6', glow: '#ec4899', highlight: '#f9a8d4', viscosity: 0.90 },
  { name: '🔵 Ocean', color: '#60a5fa', glow: '#3b82f6', highlight: '#93c5fd', viscosity: 0.94 },
  { name: '🟡 Gold', color: '#fbbf24', glow: '#f59e0b', highlight: '#fde68a', viscosity: 0.86 },
  { name: '🔴 Lava', color: '#f87171', glow: '#ef4444', highlight: '#fca5a5', viscosity: 0.90 },
]

export default function SlimeSimulator({ embed = false }: { embed?: boolean } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const centerRef = useRef<Point>({ x: 0, y: 0, vx: 0, vy: 0, homeX: 0, homeY: 0 })
  const dragRef = useRef<{ active: boolean; pointIndex: number; offsetX: number; offsetY: number }>({
    active: false, pointIndex: -1, offsetX: 0, offsetY: 0,
  })
  const animRef = useRef<number>(0)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const squishSoundRef = useRef<number>(0)

  const [slimeType, setSlimeType] = useState(0)
  const [pokeCount, setPokeCount] = useState(0)

  const POINTS = 24
  const RADIUS = 120

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
    return audioCtxRef.current
  }, [])

  // Squish sound - continuous while dragging
  const playSquish = useCallback((velocity: number) => {
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()

      const now = ctx.currentTime
      if (now - squishSoundRef.current < 0.05) return // throttle
      squishSoundRef.current = now

      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2)
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 600 + velocity * 2000
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(Math.min(0.15, 0.02 + velocity * 0.1), now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
      src.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      src.start(now)
    } catch { /* ignore */ }
  }, [getAudioCtx])

  // Pop/bubble sound on poke
  const playPoke = useCallback(() => {
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime

      // Bubble pop
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.frequency.setValueAtTime(400 + Math.random() * 300, t)
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.06)
      osc.type = 'sine'
      g.gain.setValueAtTime(0.2, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.08)
      osc.connect(g); g.connect(ctx.destination)
      osc.start(t); osc.stop(t + 0.08)

      // Noise layer
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4)
      const src = ctx.createBufferSource()
      src.buffer = buf
      const g2 = ctx.createGain()
      g2.gain.setValueAtTime(0.15, t)
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.03)
      src.connect(g2); g2.connect(ctx.destination)
      src.start(t)
    } catch { /* ignore */ }
  }, [getAudioCtx])

  // Stretch/release sound
  const playStretch = useCallback((amount: number) => {
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.frequency.value = 150 + amount * 400
      osc.type = 'triangle'
      g.gain.setValueAtTime(0.06, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
      osc.connect(g); g.connect(ctx.destination)
      osc.start(t); osc.stop(t + 0.15)
    } catch { /* ignore */ }
  }, [getAudioCtx])

  // Init slime points
  const initSlime = useCallback((cx: number, cy: number) => {
    const pts: Point[] = []
    for (let i = 0; i < POINTS; i++) {
      const angle = (i / POINTS) * Math.PI * 2
      const x = cx + Math.cos(angle) * RADIUS
      const y = cy + Math.sin(angle) * RADIUS
      pts.push({ x, y, vx: 0, vy: 0, homeX: x, homeY: y })
    }
    pointsRef.current = pts
    centerRef.current = { x: cx, y: cy, vx: 0, vy: 0, homeX: cx, homeY: cy }
  }, [])

  // Physics step
  const step = useCallback(() => {
    const pts = pointsRef.current
    const center = centerRef.current
    const drag = dragRef.current
    const type = SLIME_TYPES[slimeType]
    const springK = 0.08
    const damping = type.viscosity
    const gravity = 0.15

    // Update center
    const dx = center.homeX - center.x
    const dy = center.homeY - center.y
    center.vx += dx * springK
    center.vy += dy * springK
    center.vx *= damping
    center.vy *= damping
    center.x += center.vx
    center.y += center.vy

    // Update perimeter points
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]

      // Spring back to home
      const hx = p.homeX - p.x
      const hy = p.homeY - p.y
      p.vx += hx * springK
      p.vy += hy * springK

      // Attract to center (keeps shape)
      const cx = center.x - p.x
      const cy = center.y - p.y
      const dist = Math.sqrt(cx * cx + cy * cy)
      if (dist > RADIUS * 0.3) {
        p.vx += cx * 0.002
        p.vy += cy * 0.002
      }

      // Neighbor springs (maintains perimeter shape)
      const prev = pts[(i - 1 + pts.length) % pts.length]
      const next = pts[(i + 1) % pts.length]
      const targetDist = RADIUS * 2 * Math.sin(Math.PI / pts.length) // chord length

      const dnx = next.x - p.x
      const dny = next.y - p.y
      const dn = Math.sqrt(dnx * dnx + dny * dny)
      if (dn > 0) {
        const diff = (dn - targetDist) * 0.03
        p.vx += (dnx / dn) * diff
        p.vy += (dny / dn) * diff
      }

      const dpx = prev.x - p.x
      const dpy = prev.y - p.y
      const dp = Math.sqrt(dpx * dpx + dpy * dpy)
      if (dp > 0) {
        const diff = (dp - targetDist) * 0.03
        p.vx += (dpx / dp) * diff
        p.vy += (dpy / dp) * diff
      }

      // Gravity (slight sag)
      p.vy += gravity

      // Damping
      p.vx *= damping
      p.vy *= damping

      // If being dragged
      if (drag.active && drag.pointIndex === i) {
        p.x = p.x // held in place by mouse handler
        p.y = p.y
        p.vx = 0
        p.vy = 0
      } else {
        p.x += p.vx
        p.y += p.vy
      }
    }

    // Calculate velocity for sound
    if (drag.active && drag.pointIndex >= 0) {
      const dp = pts[drag.pointIndex]
      const vel = Math.sqrt(dp.vx * dp.vx + dp.vy * dp.vy)
      if (vel > 1) playSquish(vel / 10)
    }
  }, [slimeType, playSquish])

  // Draw
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const type = SLIME_TYPES[slimeType]
    const pts = pointsRef.current
    const center = centerRef.current
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)

    if (pts.length < 3) return

    // Draw shadow
    ctx.save()
    ctx.translate(0, 8)
    ctx.beginPath()
    ctx.moveTo((pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2)
    for (let i = 0; i < pts.length; i++) {
      const curr = pts[i]
      const next = pts[(i + 1) % pts.length]
      const cpx = curr.x
      const cpy = curr.y
      const ex = (curr.x + next.x) / 2
      const ey = (curr.y + next.y) / 2
      ctx.quadraticCurveTo(cpx, cpy, ex, ey)
    }
    ctx.closePath()
    ctx.fillStyle = 'rgba(0,0,0,0.15)'
    ctx.fill()
    ctx.restore()

    // Draw slime body
    ctx.beginPath()
    ctx.moveTo((pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2)
    for (let i = 0; i < pts.length; i++) {
      const curr = pts[i]
      const next = pts[(i + 1) % pts.length]
      const ex = (curr.x + next.x) / 2
      const ey = (curr.y + next.y) / 2
      ctx.quadraticCurveTo(curr.x, curr.y, ex, ey)
    }
    ctx.closePath()

    // Gradient fill
    const grad = ctx.createRadialGradient(
      center.x - 20, center.y - 30, 10,
      center.x, center.y, RADIUS * 1.2
    )
    grad.addColorStop(0, type.highlight)
    grad.addColorStop(0.6, type.color)
    grad.addColorStop(1, type.glow)
    ctx.fillStyle = grad
    ctx.fill()

    // Glossy highlight
    ctx.beginPath()
    ctx.ellipse(center.x - 15, center.y - 25, 30, 18, -0.3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.fill()

    // Smaller highlight
    ctx.beginPath()
    ctx.ellipse(center.x + 20, center.y + 15, 12, 8, 0.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.fill()

    // Bubbles inside (decorative)
    const bubblePositions = [
      { x: center.x - 30, y: center.y + 10, r: 4 },
      { x: center.x + 15, y: center.y - 15, r: 3 },
      { x: center.x - 10, y: center.y + 30, r: 5 },
      { x: center.x + 35, y: center.y + 5, r: 3 },
    ]
    for (const b of bubblePositions) {
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.2)'
      ctx.fill()
    }

    // Draw drag point indicator
    if (dragRef.current.active && dragRef.current.pointIndex >= 0) {
      const dp = pts[dragRef.current.pointIndex]
      ctx.beginPath()
      ctx.arc(dp.x, dp.y, 8, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.fill()
    }
  }, [slimeType])

  // Animation loop
  const loop = useCallback(() => {
    step()
    draw()
    animRef.current = requestAnimationFrame(loop)
  }, [step, draw])

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const parent = canvas.parentElement!
      canvas.width = parent.clientWidth
      canvas.height = Math.min(500, window.innerHeight * 0.55)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      initSlime(cx, cy)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [initSlime])

  // Start animation
  useEffect(() => {
    animRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animRef.current)
  }, [loop])

  // Mouse/Touch handlers
  const getCanvasPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    return { x: clientX - rect.left, y: clientY - rect.top }
  }, [])

  const findNearestPoint = useCallback((mx: number, my: number) => {
    const pts = pointsRef.current
    let minDist = Infinity
    let minIdx = -1
    for (let i = 0; i < pts.length; i++) {
      const d = Math.hypot(pts[i].x - mx, pts[i].y - my)
      if (d < minDist) { minDist = d; minIdx = i }
    }
    // Also check center
    const dc = Math.hypot(centerRef.current.x - mx, centerRef.current.y - my)
    if (dc < minDist && dc < RADIUS) {
      // Find nearest point to the touch
      return minIdx
    }
    return minIdx < 0 ? -1 : (minDist < RADIUS * 1.5 ? minIdx : -1)
  }, [])

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const pos = getCanvasPos(e)
    const idx = findNearestPoint(pos.x, pos.y)
    if (idx >= 0) {
      dragRef.current = { active: true, pointIndex: idx, offsetX: 0, offsetY: 0 }
      playPoke()
      setPokeCount(c => c + 1)
    }
  }, [getCanvasPos, findNearestPoint, playPoke])

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!dragRef.current.active) return
    const pos = getCanvasPos(e)
    const pts = pointsRef.current
    const idx = dragRef.current.pointIndex
    if (idx >= 0 && idx < pts.length) {
      const oldX = pts[idx].x
      const oldY = pts[idx].y
      pts[idx].x = pos.x
      pts[idx].y = pos.y
      pts[idx].vx = (pos.x - oldX) * 0.5
      pts[idx].vy = (pos.y - oldY) * 0.5

      // Move neighbors slightly (stretch effect)
      const prev = (idx - 1 + pts.length) % pts.length
      const next = (idx + 1) % pts.length
      pts[prev].x += (pos.x - oldX) * 0.15
      pts[prev].y += (pos.y - oldY) * 0.15
      pts[next].x += (pos.x - oldX) * 0.15
      pts[next].y += (pos.y - oldY) * 0.15

      // Move center slightly
      centerRef.current.x += (pos.x - oldX) * 0.05
      centerRef.current.y += (pos.y - oldY) * 0.05

      // Stretch sound
      const stretch = Math.hypot(pos.x - oldX, pos.y - oldY)
      if (stretch > 3) playStretch(stretch / 30)
    }
  }, [getCanvasPos, playStretch])

  const handleEnd = useCallback(() => {
    if (dragRef.current.active) {
      // Release sound - snap back
      playPoke()
    }
    dragRef.current = { active: false, pointIndex: -1, offsetX: 0, offsetY: 0 }
  }, [playPoke])

  return (
    <div className={embed ? 'mx-auto px-2 py-3' : 'max-w-4xl mx-auto px-4 py-8'}>
      {/* Header */}
      <div className={embed ? 'hidden' : 'text-center mb-6'}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          🟢 Slime Simulator
        </h1>
        <p className="text-slate-400">
          Drag, stretch, and poke the slime. ASMR sounds included.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        {SLIME_TYPES.map((s, i) => (
          <button
            key={i}
            onClick={() => setSlimeType(i)}
            className={`px-3 py-1.5 rounded-full text-sm transition border ${
              slimeType === i
                ? 'border-white bg-white/10 text-white'
                : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Poke counter */}
      <div className="text-center mb-4">
        <span className="text-slate-400 text-sm">Pokes: </span>
        <span className="text-violet-400 font-bold">{pokeCount}</span>
      </div>

      {/* Canvas */}
      <div className="w-full rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden mb-6"
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
          className="w-full cursor-grab active:cursor-grabbing"
        />
      </div>

      {/* Instructions */}
      <div className="text-center text-slate-400 text-sm mb-8">
        <p>👆 <strong className="text-slate-200">Drag</strong> the slime to stretch it</p>
        <p>👆 <strong className="text-slate-200">Poke</strong> anywhere to squish it</p>
      </div>

      {/* SEO Content */}
      <div className={embed ? 'hidden' : 'max-w-2xl mx-auto'}>
        <h2 className="text-xl font-bold mb-3">What this slime simulator does</h2>
        <p className="text-slate-400 mb-4">
          This is a free slime simulator that runs in the browser. There is nothing to download and
          no account to create. The slime on screen is a soft body: twenty-four points around the
          edge are connected to each other and pulled toward the centre, so when you drag one part
          of it, the rest follows and slowly settles back into shape. That is why it stretches
          instead of tearing, and why it sags a little at the bottom like the real thing.
        </p>
        <p className="text-slate-400 mb-6">
          Sound is generated live rather than played from a file. A short burst of filtered noise
          becomes the squish when you drag, and a quick falling tone becomes the pop when you poke.
          The pitch follows how fast you move, so a slow stretch sounds different from a quick flick.
        </p>

        <h2 className="text-xl font-bold mb-3">How to play</h2>
        <ul className="text-slate-400 mb-6 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-slate-200">Drag</strong> any point on the edge to stretch the
            slime. The further you pull, the harder it snaps back.
          </li>
          <li>
            <strong className="text-slate-200">Poke</strong> the surface to squish it and hear a
            pop. The counter above the canvas keeps track.
          </li>
          <li>
            <strong className="text-slate-200">Switch slime types</strong> with the buttons above
            the canvas. Each type has a different viscosity, so some stretch further before they
            recover.
          </li>
          <li>
            <strong className="text-slate-200">On a phone</strong>, drag with one finger. The canvas
            captures touch events, so the page will not scroll while you are stretching.
          </li>
        </ul>

        <h2 className="text-xl font-bold mb-3">Six slime types</h2>
        <p className="text-slate-400 mb-3">
          All six are the same physics model with different colours and stiffness values. Stiffness
          changes how quickly the slime returns to its resting shape:
        </p>
        <ul className="text-slate-400 mb-6 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-slate-200">Classic green</strong> — the middle of the range.
            Stretches a long way and recovers slowly.
          </li>
          <li>
            <strong className="text-slate-200">Galaxy purple</strong> — looser, so it wobbles for
            longer after a poke.
          </li>
          <li>
            <strong className="text-slate-200">Pink</strong> — close to classic, slightly softer on
            release.
          </li>
          <li>
            <strong className="text-slate-200">Ocean blue</strong> — the stiffest of the six. Short
            pulls, fast snap-back.
          </li>
          <li>
            <strong className="text-slate-200">Gold</strong> — the loosest. Best one for long,
            slow stretches.
          </li>
          <li>
            <strong className="text-slate-200">Lava red</strong> — firm, with a quick rebound.
          </li>
        </ul>

        <h2 className="text-xl font-bold mb-3">Why slime feels satisfying</h2>
        <p className="text-slate-400 mb-4">
          Slime gives your hands something to do with a predictable result. You pull, it resists;
          you let go, it settles. That loop is the same reason people tap pens or knead a stress
          ball: the feedback is immediate and it takes just enough attention to crowd out whatever
          you were stuck on.
        </p>
        <p className="text-slate-400 mb-6">
          The sound matters as much as the movement. The squish is a low, filtered noise burst, close
          to the sound of the real thing, and it lands at the same moment as the stretch. If you want
          the longer explanation of why slime is calming, read{' '}
          <a
            href="/blog/why-is-slime-calming"
            className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
          >
            why slime is calming
          </a>
          , which covers the tactile and auditory side in more detail.
        </p>

        <h2 className="text-xl font-bold mb-3">Virtual slime vs real slime</h2>
        <ul className="text-slate-400 mb-6 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-slate-200">No cleanup.</strong> Real slime picks up dust, hair
            and carpet fibres within a day. This one starts clean every time you open the page.
          </li>
          <li>
            <strong className="text-slate-200">No cost per batch.</strong> A homemade batch needs
            glue, activator and colouring. A shop-bought tub is a few dollars and dries out.
          </li>
          <li>
            <strong className="text-slate-200">Safe around furniture.</strong> Nothing to spill on a
            sofa or press into a keyboard.
          </li>
          <li>
            <strong className="text-slate-200">But it is not the same sensation.</strong> Screen
            slime gives you the movement and the sound, not the temperature or the stickiness. If
            the tactile part is what you are after, real slime still wins.
          </li>
        </ul>

        <h2 className="text-xl font-bold mb-3">Getting more out of a two-minute break</h2>
        <ul className="text-slate-400 mb-6 space-y-2 list-disc pl-5">
          <li>Turn the sound on. The squish is half the effect, and it is muted by default on most browsers.</li>
          <li>Stretch slowly rather than flicking. Slow pulls produce the lower, longer sound.</li>
          <li>Pick one slime type and stay with it for the whole break instead of switching every few seconds.</li>
          <li>Stop after a couple of minutes. Like any fidget, it works better as a pause than as a background activity.</li>
        </ul>

        <h2 className="text-xl font-bold mb-3">Questions people ask</h2>
        <div className="text-slate-400 space-y-4 mb-6">
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">Is it free?</h3>
            <p>Yes. No sign-up, no download, no in-app purchase. It runs entirely in the browser.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">Does it work on a phone?</h3>
            <p>
              Yes. Drag with one finger. The canvas takes over touch gestures so the page stays still
              while you stretch.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">Why is there no sound?</h3>
            <p>
              Browsers block audio until you interact with the page. Tap the slime once and the sound
              engine starts. Check the volume too — the squish is quiet by design.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">Can I use it in a classroom or on a stream?</h3>
            <p>
              Yes. There is an{' '}
              <a href="/embed/slime-simulator" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
                embeddable version
              </a>{' '}
              with the text stripped out, sized for an iframe.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">Is it the same as real slime?</h3>
            <p>
              No. You get the movement and the sound, not the temperature or the texture. It is a
              substitute for the fidget, not for the material.
            </p>
          </div>
        </div>

        <p className="text-slate-400 mb-4">
          If you want something with more resistance, try the{' '}
          <a href="/games/stress-ball" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
            stress ball
          </a>
          . If you want a slower, quieter break, the{' '}
          <a href="/games/zen-garden" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
            zen garden
          </a>{' '}
          is the opposite pace.
        </p>
      </div>
    </div>
  )
}