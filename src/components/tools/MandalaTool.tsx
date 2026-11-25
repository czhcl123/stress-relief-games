'use client'

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

const COLORS = ['#c4b5fd', '#a78bfa', '#f0abfc', '#67e8f9', '#fda4af', '#fde68a']
const SIZES = [2, 4, 8]
const SYMMETRIES = [6, 8, 12]

export default function MandalaTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawingRef = useRef(false)
  const lastRef = useRef<{ x: number; y: number } | null>(null)

  const [color, setColor] = useState(0)
  const [size, setSize] = useState(1)
  const [symmetry, setSymmetry] = useState(6)
  const [hasDrawing, setHasDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  function pointFromEvent(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    }
  }

  function drawSegment(from: { x: number; y: number }, to: { x: number; y: number }) {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const cx = canvas.width / 2
    const cy = canvas.height / 2

    ctx.save()
    ctx.translate(cx, cy)
    ctx.strokeStyle = COLORS[color]
    ctx.lineWidth = SIZES[size]
    for (let index = 0; index < symmetry; index++) {
      ctx.save()
      ctx.rotate((Math.PI * 2 * index) / symmetry)
      ctx.beginPath()
      ctx.moveTo(from.x - cx, from.y - cy)
      ctx.lineTo(to.x - cx, to.y - cy)
      ctx.stroke()
      ctx.restore()
    }
    ctx.restore()
    setHasDrawing(true)
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    drawingRef.current = true
    const point = pointFromEvent(event)
    lastRef.current = point
    drawSegment(point, { x: point.x + 0.1, y: point.y + 0.1 })
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current || !lastRef.current) return
    const point = pointFromEvent(event)
    drawSegment(lastRef.current, point)
    lastRef.current = point
  }

  function handlePointerUp() {
    drawingRef.current = false
    lastRef.current = null
  }

  function clear() {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawing(false)
  }

  function download() {
    const canvas = canvasRef.current
    if (!canvas) return
    const out = document.createElement('canvas')
    out.width = canvas.width
    out.height = canvas.height
    const ctx = out.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, out.width, out.height)
    ctx.drawImage(canvas, 0, 0)
    const link = document.createElement('a')
    link.download = 'mandala.png'
    link.href = out.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
      <div className="mx-auto max-w-[600px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="aspect-square w-full touch-none cursor-crosshair"
          aria-label="Mandala drawing canvas. Draw with a mouse, pen or finger."
        />
      </div>

      <div className="mx-auto mt-5 flex max-w-[600px] flex-wrap items-center justify-center gap-2">
        {COLORS.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setColor(index)}
            aria-label={`Colour ${index + 1}`}
            aria-pressed={color === index}
            className={`h-8 w-8 rounded-full border-2 transition ${
              color === index ? 'scale-110 border-white' : 'border-slate-700'
            }`}
            style={{ backgroundColor: item }}
          />
        ))}
      </div>

      <div className="mx-auto mt-4 flex max-w-[600px] flex-wrap items-center justify-center gap-2">
        {SIZES.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setSize(index)}
            aria-pressed={size === index}
            className={`rounded-lg border px-3 py-1.5 text-xs transition ${
              size === index
                ? 'border-violet-500 bg-violet-500/20 text-white'
                : 'border-slate-700 text-slate-300 hover:border-violet-500'
            }`}
          >
            {item}px
          </button>
        ))}
        <span className="mx-1 text-slate-700">|</span>
        {SYMMETRIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSymmetry(item)}
            aria-pressed={symmetry === item}
            className={`rounded-lg border px-3 py-1.5 text-xs transition ${
              symmetry === item
                ? 'border-violet-500 bg-violet-500/20 text-white'
                : 'border-slate-700 text-slate-300 hover:border-violet-500'
            }`}
          >
            ×{item}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={clear}
          className="rounded-xl border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-violet-500 hover:text-white"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={download}
          disabled={!hasDrawing}
          className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Download PNG
        </button>
      </div>
    </div>
  )
}
