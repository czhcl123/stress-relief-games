'use client'

import { useState } from 'react'

const MAX = 12

export default function WorryJarTool() {
  const [text, setText] = useState('')
  const [worries, setWorries] = useState<string[]>([])
  const [releasing, setReleasing] = useState(false)

  function add() {
    const value = text.trim()
    if (!value || worries.length >= MAX || releasing) return
    setWorries((current) => [...current, value])
    setText('')
  }

  function release() {
    if (worries.length === 0 || releasing) return
    setReleasing(true)
    window.setTimeout(() => {
      setWorries([])
      setReleasing(false)
    }, 600)
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
      <div className="mx-auto max-w-md">
        <div className="mx-auto w-64">
          <div className="mx-auto h-6 w-60 rounded-t-xl border border-slate-600 bg-slate-700/80" />
          <div className="relative h-72 overflow-hidden rounded-b-3xl border-2 border-t-0 border-slate-600 bg-slate-800/30">
            {worries.length === 0 && (
              <p className="absolute inset-0 flex items-center justify-center px-8 text-center text-sm text-slate-500">
                The jar is empty. Add a worry, then let it go.
              </p>
            )}
            {worries.map((worry, index) => (
              <div
                key={`${worry}-${index}`}
                title={worry}
                className={`absolute h-10 w-24 overflow-hidden rounded-sm border border-amber-200/40 bg-amber-100/85 px-1.5 py-1 text-[8px] leading-tight text-slate-800 shadow transition-all duration-500 ${
                  releasing ? '-translate-y-8 opacity-0' : 'opacity-100'
                }`}
                style={{
                  left: `${18 + (index % 3) * 26}%`,
                  bottom: `${6 + Math.floor(index / 3) * 17}%`,
                  transform: `rotate(${((index % 5) - 2) * 5}deg)`,
                }}
              >
                {worry}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="worry-input" className="mb-2 block text-sm font-semibold text-slate-200">
            What is on your mind?
          </label>
          <div className="flex gap-2">
            <input
              id="worry-input"
              type="text"
              maxLength={120}
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  add()
                }
              }}
              placeholder="A worry you want to put down…"
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-violet-500"
            />
            <button
              type="button"
              onClick={add}
              disabled={!text.trim() || worries.length >= MAX || releasing}
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500" aria-live="polite">
            {worries.length} / {MAX} slips. Nothing is saved or sent.
          </p>
        </div>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={release}
            disabled={worries.length === 0 || releasing}
            className="rounded-xl border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-violet-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Release all
          </button>
        </div>
      </div>
    </div>
  )
}
