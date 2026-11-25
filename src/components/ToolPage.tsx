import type { ReactNode } from 'react'
import { gameFaqs } from '@/lib/faqs'

/**
 * Shared shell for the non-game calm tools. The interactive part is passed in
 * as children; this component owns the title, instructions, honest "why" copy
 * and the visible FAQ that matches the FAQPage JSON-LD in GameSeoExtras.
 */
export default function ToolPage({
  gamePath,
  emoji,
  title,
  subtitle,
  howTo,
  why,
  note,
  children,
}: {
  gamePath: string
  emoji: string
  title: string
  subtitle: string
  howTo: string[]
  why: string
  note?: string
  children: ReactNode
}) {
  const faqs = gameFaqs[gamePath] ?? []

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8 text-center">
        <div className="mb-3 text-5xl" aria-hidden="true">
          {emoji}
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-slate-400">{subtitle}</p>
      </header>

      {children}

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="mb-3 text-2xl font-bold">How to use it</h2>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-slate-300">
          {howTo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-8 max-w-3xl">
        <h2 className="mb-3 text-2xl font-bold">Why this helps</h2>
        <p className="leading-relaxed text-slate-400">{why}</p>
      </section>

      {note && (
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-slate-500">{note}</p>
      )}

      {faqs.length > 0 && (
        <section className="mx-auto mt-8 max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3"
              >
                <summary className="cursor-pointer font-semibold text-white">{faq.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
