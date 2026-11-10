import { games } from '@/lib/games'

/**
 * Measured widget heights at 640px wide (content height + 4px slack).
 * Kept in sync with the /embed install page so a widget never gets cut off.
 */
const HEIGHTS: Record<string, number> = {
  '/games/bubble-wrap': 624,
  '/games/slime-simulator': 744,
  '/games/zen-garden': 704,
  '/games/stress-ball': 740,
  '/games/fidget-spinner': 900,
  '/games/sand-cutting': 900,
}

function slugOf(href: string) {
  return href.replace('/games/', '')
}

/**
 * Embeds the matching game directly in a guide page.
 *
 * Why this exists (2026-11-10 GSC): the guides were already ranking on page
 * one — `why-is-slime-calming` at position 14.71, `why-is-cutting-kinetic-sand-satisfying`
 * at 5.92 — and still converted nothing. 331 impressions across the six guides
 * produced 1 click (0.30% CTR), while the game pages converted at 14.12%.
 *
 * The CTA existed, but it sat after ~1000 words of body copy. A visitor who
 * searched "does popping bubble wrap relieve stress" got a wall of text and
 * had to read to the bottom before finding a link to the thing they wanted to
 * play. This puts the game above the fold: the guide answers the "why" and the
 * widget answers the "do it", on the same page.
 */
export default function GameEmbed({ gameHref }: { gameHref: string }) {
  const game = games.find((g) => g.href === gameHref)
  if (!game) return null

  const height = HEIGHTS[gameHref] ?? 700

  return (
    <section className="mb-8">
      <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-white">
            <span aria-hidden="true" className="mr-1">
              {game.emoji}
            </span>
            Try {game.title} — free, no signup, no download
          </p>
          <a
            href={game.href}
            className="text-xs text-violet-300 underline underline-offset-2 transition hover:text-violet-200"
          >
            Open full screen →
          </a>
        </div>
        <iframe
          src={`/embed/${slugOf(gameHref)}`}
          title={`${game.title} — playable widget`}
          width="100%"
          height={height}
          loading="lazy"
          style={{ border: 0, borderRadius: 12, maxWidth: 640 }}
          className="mx-auto block max-w-full bg-slate-900"
        />
      </div>
    </section>
  )
}
