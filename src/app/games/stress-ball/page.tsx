'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

const BALL_TYPES = [
  { name: '🏀 Basketball', color: '#e8751a', stripe: '#c25e0f', bounce: 0.85, squish: 0.6 },
  { name: '⚽ Soccer', color: '#f5f5f5', stripe: '#333', bounce: 0.80, squish: 0.55 },
  { name: '🎾 Tennis', color: '#c8e632', stripe: '#a8cc1a', bounce: 0.90, squish: 0.50 },
  { name: '🏐 Volleyball', color: '#fffde7', stripe: '#42a5f5', bounce: 0.75, squish: 0.65 },
  { name: '🟣 Stress Ball', color: '#ab47bc', stripe: '#8e24aa', bounce: 0.40, squish: 0.80 },
  { name: '🔴 Rubber', color: '#ef5350', stripe: '#c62828', bounce: 0.95, squish: 0.45 },
]

export default function StressBall({ embed = false }: { embed?: boolean } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const [ballType, setBallType] = useState(0)
  const [squeezeCount, setSqueezeCount] = useState(0)
  const lastBounceRef = useRef<{ x: boolean; y: boolean; time: number }>({ x: false, y: false, time: 0 })

  const ballRef = useRef({
    x: 200, y: 200,
    vx: 0, vy: 0,
    radius: 60,
    scaleX: 1, scaleY: 1,
    targetScaleX: 1, targetScaleY: 1,
    rotation: 0,
    isDragging: false,
    dragOffsetX: 0, dragOffsetY: 0,
    lastDragX: 0, lastDragY: 0,
    lastDragTime: 0,
    isSqueezing: false,
  })

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
    return audioCtxRef.current
  }, [])

  // Squeeze sound
  const playSqueeze = useCallback((amount: number) => {
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime

      // Noise burst - rubbery squish
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2)
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 300 + amount * 500
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.12 + amount * 0.08, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
      src.connect(lp); lp.connect(gain); gain.connect(ctx.destination)
      src.start(t)

      // Sub tone
      const osc = ctx.createOscillator()
      const g2 = ctx.createGain()
      osc.frequency.value = 80 + amount * 60
      osc.type = 'sine'
      g2.gain.setValueAtTime(0.08, t)
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.08)
      osc.connect(g2); g2.connect(ctx.destination)
      osc.start(t); osc.stop(t + 0.08)
    } catch { /* ignore */ }
  }, [getAudioCtx])

  // Bounce sound
  const playBounce = useCallback((velocity: number) => {
    if (velocity < 0.5) return
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime
      const vol = Math.min(0.2, velocity * 0.015)

      // Layer 1: Thud noise (dominant - the "tap" sound)
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 6)
      const src = ctx.createBufferSource()
      src.buffer = buf
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 800
      bp.Q.value = 1.5
      const g1 = ctx.createGain()
      g1.gain.setValueAtTime(vol * 1.2, t)
      g1.gain.exponentialRampToValueAtTime(0.001, t + 0.04)
      src.connect(bp); bp.connect(g1); g1.connect(ctx.destination)
      src.start(t)

      // Layer 2: Short tone (very brief, not "boom")
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.setValueAtTime(280 + velocity * 4, t)
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.05)
      osc.type = 'sine'
      gain.gain.setValueAtTime(vol * 0.5, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
      osc.connect(gain); gain.connect(ctx.destination)
      osc.start(t); osc.stop(t + 0.06)
    } catch { /* ignore */ }
  }, [getAudioCtx])

  // Throw/release sound
  const playThrow = useCallback((speed: number) => {
    try {
      const ctx = getAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()
      const t = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.setValueAtTime(300 + speed * 10, t)
      osc.frequency.exponentialRampToValueAtTime(150, t + 0.15)
      osc.type = 'triangle'
      gain.gain.setValueAtTime(0.1, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
      osc.connect(gain); gain.connect(ctx.destination)
      osc.start(t); osc.stop(t + 0.15)
    } catch { /* ignore */ }
  }, [getAudioCtx])

  // Physics
  const step = useCallback(() => {
    const ball = ballRef.current
    const canvas = canvasRef.current
    if (!canvas) return
    const type = BALL_TYPES[ballType]
    const gravity = 0.4
    const friction = 0.995
    const w = canvas.width
    const h = canvas.height
    const r = ball.radius

    if (!ball.isDragging) {
      // Gravity
      ball.vy += gravity

      // Velocity
      ball.x += ball.vx
      ball.y += ball.vy

      // Friction
      ball.vx *= friction
      ball.vy *= friction

      const now = performance.now()
      const minBounceInterval = 80 // ms - prevent rapid-fire bounces causing hum

      // Wall collisions
      if (ball.x - r < 0) {
        ball.x = r
        ball.vx = Math.abs(ball.vx) * type.bounce
        if (now - lastBounceRef.current.time > minBounceInterval) {
          playBounce(Math.abs(ball.vx))
          lastBounceRef.current.time = now
        }
        ball.targetScaleX = 0.75
      }
      if (ball.x + r > w) {
        ball.x = w - r
        ball.vx = -Math.abs(ball.vx) * type.bounce
        if (now - lastBounceRef.current.time > minBounceInterval) {
          playBounce(Math.abs(ball.vx))
          lastBounceRef.current.time = now
        }
        ball.targetScaleX = 0.75
      }
      if (ball.y - r < 0) {
        ball.y = r
        ball.vy = Math.abs(ball.vy) * type.bounce
        if (now - lastBounceRef.current.time > minBounceInterval) {
          playBounce(Math.abs(ball.vy))
          lastBounceRef.current.time = now
        }
        ball.targetScaleY = 0.75
      }
      if (ball.y + r > h) {
        ball.y = h - r
        ball.vy = -Math.abs(ball.vy) * type.bounce
        if (now - lastBounceRef.current.time > minBounceInterval) {
          playBounce(Math.abs(ball.vy))
          lastBounceRef.current.time = now
        }
        ball.targetScaleY = 0.75
        // Rolling friction on ground
        ball.vx *= 0.98
      }
    }

    // Squeeze animation (spring back)
    const springK = 0.15
    ball.scaleX += (ball.targetScaleX - ball.scaleX) * springK
    ball.scaleY += (ball.targetScaleY - ball.scaleY) * springK
    ball.targetScaleX += (1 - ball.targetScaleX) * 0.08
    ball.targetScaleY += (1 - ball.targetScaleY) * 0.08

    // Rotation from horizontal velocity
    ball.rotation += ball.vx * 0.02
  }, [ballType, playBounce])

  // Draw
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const ball = ballRef.current
    const type = BALL_TYPES[ballType]
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)

    // Ground shadow
    ctx.beginPath()
    ctx.ellipse(ball.x, h - 8, ball.radius * ball.scaleX * 0.8, 8, 0, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0,0,0,0.15)'
    ctx.fill()

    ctx.save()
    ctx.translate(ball.x, ball.y)
    ctx.rotate(ball.rotation)
    ctx.scale(ball.scaleX, ball.scaleY)

    // Ball shadow (below)
    ctx.beginPath()
    ctx.arc(2, 3, ball.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.fill()

    // Ball body
    ctx.beginPath()
    ctx.arc(0, 0, ball.radius, 0, Math.PI * 2)
    const grad = ctx.createRadialGradient(-ball.radius * 0.3, -ball.radius * 0.3, 5, 0, 0, ball.radius)
    grad.addColorStop(0, '#fff')
    grad.addColorStop(0.3, type.color)
    grad.addColorStop(1, type.stripe)
    ctx.fillStyle = grad
    ctx.fill()

    // Pattern based on ball type
    if (ballType === 0) {
      // Basketball: 2 curves + horizontal seam
      ctx.strokeStyle = '#3d1500'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(0, 0, ball.radius * 0.7, -0.6, 0.6)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(0, 0, ball.radius * 0.7, Math.PI - 0.6, Math.PI + 0.6)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-ball.radius, 0)
      ctx.lineTo(ball.radius, 0)
      ctx.stroke()
    } else if (ballType === 1) {
      // Soccer: pentagon pattern
      ctx.fillStyle = '#222'
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
        ctx.beginPath()
        for (let j = 0; j < 5; j++) {
          const a = angle + (j / 5) * Math.PI * 2
          const r = ball.radius * 0.18
          const x = Math.cos(a) * r
          const y = Math.sin(a) * r
          if (j === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
      }
    } else if (ballType === 2) {
      // Tennis: 2 white curves on green
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.arc(-ball.radius * 0.5, -ball.radius * 0.3, ball.radius * 0.4, 0, Math.PI * 1.3)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(ball.radius * 0.5, ball.radius * 0.3, ball.radius * 0.4, Math.PI * 1.3, Math.PI * 0.3)
      ctx.stroke()
    } else if (ballType === 3) {
      // Volleyball: 6 curved panels (3 visible: 2 white + 1 blue)
      const panelCount = 3
      const panelWidth = (Math.PI * 2) / panelCount
      // Center panel (blue)
      ctx.fillStyle = '#1565c0'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      for (let a = -panelWidth/2; a <= panelWidth/2; a += 0.05) {
        const x1 = Math.sin(a) * ball.radius
        const y1 = -Math.cos(a) * ball.radius
        ctx.lineTo(x1, y1)
      }
      ctx.closePath()
      ctx.fill()
      // Right panel (white)
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      for (let a = panelWidth/2; a <= panelWidth/2 + panelWidth; a += 0.05) {
        const x1 = Math.sin(a) * ball.radius
        const y1 = -Math.cos(a) * ball.radius
        ctx.lineTo(x1, y1)
      }
      ctx.closePath()
      ctx.fill()
      // Left panel (white)
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      for (let a = -panelWidth/2 - panelWidth; a <= -panelWidth/2; a += 0.05) {
        const x1 = Math.sin(a) * ball.radius
        const y1 = -Math.cos(a) * ball.radius
        ctx.lineTo(x1, y1)
      }
      ctx.closePath()
      ctx.fill()
      // Seam lines
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1.5
      for (let i = 0; i < panelCount; i++) {
        const a = -panelWidth/2 + i * panelWidth
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(Math.sin(a) * ball.radius, -Math.cos(a) * ball.radius)
        ctx.stroke()
      }
      // Outline
      ctx.beginPath()
      ctx.arc(0, 0, ball.radius, 0, Math.PI * 2)
      ctx.stroke()
    } else if (ballType === 4) {
      // Stress ball: wrinkled texture
      ctx.strokeStyle = 'rgba(0,0,0,0.15)'
      ctx.lineWidth = 1
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(Math.cos(angle) * ball.radius * 0.3, Math.sin(angle) * ball.radius * 0.3)
        ctx.quadraticCurveTo(
          Math.cos(angle + 0.4) * ball.radius * 0.6,
          Math.sin(angle + 0.4) * ball.radius * 0.6,
          Math.cos(angle + 0.8) * ball.radius * 0.8,
          Math.sin(angle + 0.8) * ball.radius * 0.8
        )
        ctx.stroke()
      }
    } else if (ballType === 5) {
      // Rubber: dotted texture
      ctx.fillStyle = 'rgba(80,20,20,0.4)'
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * ball.radius * 0.8
        const dotR = 1 + Math.random() * 1.5
        ctx.beginPath()
        ctx.arc(Math.cos(angle) * dist, Math.sin(angle) * dist, dotR, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Glossy highlight
    ctx.beginPath()
    ctx.ellipse(-ball.radius * 0.25, -ball.radius * 0.3, ball.radius * 0.35, ball.radius * 0.2, -0.4, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.fill()

    // Small highlight
    ctx.beginPath()
    ctx.arc(ball.radius * 0.2, ball.radius * 0.25, ball.radius * 0.08, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.fill()

    ctx.restore()

    // Velocity indicator (when moving fast)
    const speed = Math.hypot(ball.vx, ball.vy)
    if (speed > 3 && !ball.isDragging) {
      ctx.beginPath()
      ctx.moveTo(ball.x - ball.vx * 2, ball.y - ball.vy * 2)
      ctx.lineTo(ball.x - ball.vx * 5, ball.y - ball.vy * 5)
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'
      ctx.lineWidth = ball.radius * 0.3
      ctx.lineCap = 'round'
      ctx.stroke()
    }
  }, [ballType])

  // Loop
  const loop = useCallback(() => {
    step()
    draw()
    animRef.current = requestAnimationFrame(loop)
  }, [step, draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement!
    const resize = () => {
      canvas.width = parent.clientWidth
      canvas.height = Math.min(450, window.innerHeight * 0.5)
      ballRef.current.x = canvas.width / 2
      ballRef.current.y = canvas.height / 2
    }
    resize()
    window.addEventListener('resize', resize)
    animRef.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [loop])

  // Reset ball position
  const resetBall = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    ballRef.current.x = canvas.width / 2
    ballRef.current.y = canvas.height / 3
    ballRef.current.vx = 0
    ballRef.current.vy = 0
    ballRef.current.scaleX = 1
    ballRef.current.scaleY = 1
    ballRef.current.rotation = 0
    setSqueezeCount(0)
  }, [])

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const cx = 'touches' in e ? e.touches[0].clientX : e.clientX
    const cy = 'touches' in e ? e.touches[0].clientY : e.clientY
    return { x: cx - rect.left, y: cy - rect.top }
  }, [])

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const pos = getPos(e)
    const ball = ballRef.current
    const d = Math.hypot(pos.x - ball.x, pos.y - ball.y)
    if (d < ball.radius * 1.3) {
      ball.isDragging = true
      ball.dragOffsetX = pos.x - ball.x
      ball.dragOffsetY = pos.y - ball.y
      ball.lastDragX = pos.x
      ball.lastDragY = pos.y
      ball.lastDragTime = Date.now()
      ball.vx = 0
      ball.vy = 0
    }
  }, [getPos])

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const ball = ballRef.current
    if (!ball.isDragging) return
    const pos = getPos(e)
    const newX = pos.x - ball.dragOffsetX
    const newY = pos.y - ball.dragOffsetY

    // Track velocity for throw
    const now = Date.now()
    const dt = now - ball.lastDragTime
    if (dt > 0) {
      ball.vx = (pos.x - ball.lastDragX) / Math.max(dt / 16, 0.5) * 0.6
      ball.vy = (pos.y - ball.lastDragY) / Math.max(dt / 16, 0.5) * 0.6
    }
    ball.lastDragX = pos.x
    ball.lastDragY = pos.y
    ball.lastDragTime = now

    // Squeeze effect based on drag distance from center
    const canvas = canvasRef.current!
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const dx = newX - cx
    const dy = newY - cy
    const dist = Math.hypot(dx, dy)
    const maxDist = Math.min(canvas.width, canvas.height) * 0.3

    // Horizontal squeeze
    const squeezeAmount = Math.min(1, dist / maxDist)
    const type = BALL_TYPES[ballType]
    ball.targetScaleX = 1 - squeezeAmount * type.squish * 0.3
    ball.targetScaleY = 1 + squeezeAmount * type.squish * 0.2

    ball.x = newX
    ball.y = newY

    if (squeezeAmount > 0.1) {
      playSqueeze(squeezeAmount)
      ball.isSqueezing = true
    }
  }, [getPos, ballType, playSqueeze])

  const handleEnd = useCallback(() => {
    const ball = ballRef.current
    if (ball.isDragging) {
      ball.isDragging = false
      const speed = Math.hypot(ball.vx, ball.vy)
      if (speed > 2) {
        playThrow(speed)
        setSqueezeCount(c => c + 1)
      }
      // Snap back
      ball.targetScaleX = 0.8
      ball.targetScaleY = 1.2
      setTimeout(() => {
        ball.targetScaleX = 1
        ball.targetScaleY = 1
      }, 100)
      ball.isSqueezing = false
    }
  }, [playThrow])

  return (
    <div className={embed ? 'mx-auto px-2 py-3' : 'max-w-4xl mx-auto px-4 py-8'}>
      <div className={embed ? 'hidden' : 'text-center mb-6'}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          🏀 Stress Relief Ball
        </h1>
        <p className="text-slate-400">
          Squeeze, throw, and bounce. Let it all out.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {BALL_TYPES.map((b, i) => (
          <button
            key={i}
            onClick={() => { setBallType(i); resetBall() }}
            className={`px-3 py-1.5 rounded-full text-sm transition border ${
              ballType === i
                ? 'border-white bg-white/10 text-white'
                : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-6 mb-4 text-sm">
        <span className="text-slate-400">Throws: <span className="text-violet-400 font-bold">{squeezeCount}</span></span>
        <button
          onClick={resetBall}
          className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition"
        >
          🔄 Reset
        </button>
      </div>

      {/* Canvas */}
      <div className="w-full rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden mb-6" style={{ touchAction: 'none' }}>
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

      <div className="text-center text-slate-400 text-sm mb-8">
        <p>👆 <strong className="text-slate-200">Drag</strong> the ball to throw it</p>
        <p>🏀 <strong className="text-slate-200">Watch</strong> it bounce off the walls</p>
      </div>

      <div className={embed ? 'hidden' : 'max-w-2xl mx-auto'}>
        <h2 className="text-xl font-bold mb-3">About Stress Ball</h2>
        <p className="text-slate-400">
          Drag the ball and release to throw it around. Watch it bounce off walls with realistic
          physics. Each ball type has different bounce and squish properties — the purple stress ball
          is extra squishy, while the rubber ball bounces the highest. Squeeze and throw as much as
          you need.
        </p>
      </div>
    </div>
  )
}