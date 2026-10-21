import type { Metadata } from 'next'
import { games } from '@/lib/games'
import { posts, postHref } from '@/lib/posts'
import { siteName, siteUrl } from '@/lib/seo'

const title = 'Free Online Stress Relief Games'
const description =
  'Six free online stress relief games: bubble wrap, slime, zen garden, stress ball, fidget spinner and kinetic sand. No signup, no download.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/games' },
  openGraph: {
    type: 'website',
    url: '/games',
    siteName,
    title: `${title} | ${siteName}`,
    description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${siteName}`,
    description,
    images: ['/opengraph-image'],
  },
}

// An ItemList is accurate here: this page is literally an ordered collection of
// the six games, and each entry points at the page that hosts the game. No
// ratings or review counts are invented.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Online Stress Relief Games',
  numberOfItems: games.length,
  itemListElement: games.map((game, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: game.title,
    description: game.desc,
    url: `${siteUrl}${game.href}`,
  })),
}

export default function GamesIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Six Free Online Stress Relief Games</h1>
        <p className="mx-auto max-w-2xl leading-relaxed text-slate-400">
          Six small games you can finish in a couple of minutes. Everything runs in the browser: no
          signup, no download, nothing to install. Pick one and start with the thing itself.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <a
            key={game.href}
            href={game.coming ? undefined : game.href}
            className={`group block rounded-2xl border p-6 transition-all ${
              game.coming
                ? 'cursor-default border-slate-800 bg-slate-900/40'
                : 'border-slate-700 bg-slate-800/50 hover:border-violet-500 hover:bg-slate-800 hover:shadow-lg hover:shadow-violet-500/10'
            }`}
          >
            <div className="mb-3 text-4xl" aria-hidden="true">
              {game.emoji}
            </div>
            <h2 className="mb-2 text-xl font-semibold">{game.title}</h2>
            <p className="mb-3 text-sm text-slate-400">{game.desc}</p>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <span key={tag} className="rounded bg-slate-700/50 px-2 py-0.5 text-xs text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">Which One to Pick</h2>
        <p className="mb-6 leading-relaxed text-slate-400">
          The six games are not six flavours of the same thing. They ask for different kinds of
          attention, so the right choice depends on what kind of break you actually have time for.
        </p>
        <ul className="space-y-4 leading-relaxed text-slate-400">
          <li>
            <strong className="text-white">Restless, need something to do with your hands</strong> —
            <a href="/games/bubble-wrap" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              {' '}
              Bubble Wrap Popper
            </a>{' '}
            or{' '}
            <a href="/games/sand-cutting" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Sand Cutting
            </a>
            . Both reward fast, repeated motion and have a clear finish line.
          </li>
          <li>
            <strong className="text-white">Can&apos;t settle, need something slow</strong> —
            <a href="/games/zen-garden" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              {' '}
              Zen Garden
            </a>{' '}
            or{' '}
            <a href="/games/slime-simulator" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Slime Simulator
            </a>
            . There is no score and no way to lose, which is the point.
          </li>
          <li>
            <strong className="text-white">Two minutes between meetings</strong> —
            <a href="/games/stress-ball" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              {' '}
              Stress Relief Ball
            </a>{' '}
            or{' '}
            <a href="/games/fidget-spinner" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Fidget Spinner
            </a>
            . Open, play, close. Nothing to set up and nothing to leave behind.
          </li>
        </ul>
      </section>

      <section className="mx-auto mt-14 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">What These Games Are Not</h2>
        <p className="mb-4 leading-relaxed text-slate-400">
          They are not therapy and they are not a substitute for one. What they are is a real break:
          a minute or two of low-stakes, repetitive attention that gives the part of your head that
          has been grinding something else to do.
        </p>
        <p className="leading-relaxed text-slate-400">
          If stress is affecting your sleep, your work or your appetite for weeks at a time, a
          browser game is not the answer — talking to a doctor or a therapist is. These are for the
          smaller, more ordinary version of the problem.
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">Why Each Game Works</h2>
        <p className="mb-5 leading-relaxed text-slate-400">
          Every game has a guide behind it that looks at what the research actually supports — and
          where the claim falls apart. {posts.length} of them, all short:
        </p>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <a
                href={postHref(post)}
                className="block rounded-xl border border-slate-800 px-4 py-3 text-sm text-slate-300 transition hover:border-violet-500 hover:bg-slate-800/50 hover:text-white"
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
