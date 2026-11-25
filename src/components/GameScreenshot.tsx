import { games } from '@/lib/games'

/**
 * Real screenshot of the game, shown below the interactive canvas. Keeping it
 * in one component means every game page gets the same width, border, caption
 * and lazy-loading behaviour.
 */
export default function GameScreenshot({ gamePath }: { gamePath: string }) {
  const game = games.find((item) => item.href === gamePath)
  if (!game) return null

  return (
    <figure className="mx-auto mt-12 max-w-6xl px-4">
      <img
        src={game.image}
        alt={game.imageAlt}
        width={game.imageWidth}
        height={game.imageHeight}
        loading="lazy"
        className="w-full rounded-2xl border border-slate-800"
      />
      <figcaption className="mt-2 text-center text-xs text-slate-500">
        {game.title} {game.imageIsScreenshot ? 'screenshot' : 'illustration'} — the{' '}
        {game.kind === 'tool' ? 'tool' : 'game'} runs in the browser, no download required.
      </figcaption>
    </figure>
  )
}
