import { games } from '@/lib/games'

/**
 * Cross-links every game page to the other games. Rendered from the server
 * component layouts, so it adds no client JavaScript, and the anchor text is
 * the game title — which is also the keyword we want to rank for.
 */
export default function RelatedGames({ current }: { current: string }) {
  const others = games.filter((game) => game.href !== current && !game.coming)
  if (others.length === 0) return null

  return (
    <section className="max-w-4xl mx-auto px-4 pt-2 pb-12">
      <h2 className="text-lg font-bold mb-4 text-center">Try Another Stress Relief Game</h2>
      <ul className="flex flex-wrap justify-center gap-3">
        {others.map((game) => (
          <li key={game.href}>
            <a
              href={game.href}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 transition hover:border-violet-500 hover:bg-slate-800 hover:text-white"
            >
              <span aria-hidden="true" className="text-base">
                {game.emoji}
              </span>
              {game.title}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center text-sm text-slate-400">
        <a href="/games" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
          See all six stress relief games
        </a>
      </p>
    </section>
  )
}
