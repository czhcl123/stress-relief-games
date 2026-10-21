'use client'

import { useState } from 'react'

export default function CopyBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="relative rounded-xl border border-slate-700 bg-slate-900/80">
      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-1.5">
        <span className="text-xs text-slate-400">{label ?? 'HTML'}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 transition hover:border-violet-500 hover:text-white"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-3 py-3 text-xs leading-relaxed text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}
