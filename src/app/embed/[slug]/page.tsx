import type { Metadata } from 'next'
import BubbleWrap from '@/app/games/bubble-wrap/page'
import SlimeSimulator from '@/app/games/slime-simulator/page'
import ZenGarden from '@/app/games/zen-garden/page'
import StressBall from '@/app/games/stress-ball/page'
import FidgetSpinner from '@/app/games/fidget-spinner/page'
import SandCutting from '@/app/games/sand-cutting/page'
import { games } from '@/lib/games'
import { siteUrl } from '@/lib/seo'
import EmbedHeight from '@/components/EmbedHeight'

const registry = {
  'bubble-wrap': BubbleWrap,
  'slime-simulator': SlimeSimulator,
  'zen-garden': ZenGarden,
  'stress-ball': StressBall,
  'fidget-spinner': FidgetSpinner,
  'sand-cutting': SandCutting,
} as const

type Slug = keyof typeof registry

export function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const game = games.find((g) => g.href === `/games/${slug}`)
  const title = game ? `${game.title} — playable widget` : 'Stress Relief Game Widget'

  return {
    title: { absolute: title },
    // The widget page exists to be framed. It must not compete with the real game
    // page in search results, so it is noindex but still follows its credit link.
    robots: { index: false, follow: true },
    alternates: { canonical: `/embed/${slug}` },
  }
}

export default async function EmbedGame({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const Game = registry[slug as Slug]
  const game = games.find((g) => g.href === `/games/${slug}`)

  if (!Game || !game) return null

  return (
    <>
      {/* The root layout is shared with the public site, so the widget route hides
          the site header/footer instead of duplicating a whole document. */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            'body > header, body > footer { display: none !important; } body { background: #0f172a; }',
        }}
      />
      <div id="embed-root" className="flex flex-col">
        <EmbedHeight slug={slug} />
        <div className="flex-1">
          <Game embed />
        </div>
        <div className="border-t border-slate-800 px-3 py-1.5 text-center text-xs text-slate-500">
          <a
            href={`${siteUrl}${game.href}?utm_source=embed&utm_medium=widget&utm_campaign=${slug}`}
            target="_blank"
            rel="noopener"
            className="transition hover:text-violet-300"
          >
            {game.emoji} {game.title} — Stress Relief Games
          </a>
        </div>
      </div>
    </>
  )
}
