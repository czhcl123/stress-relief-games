import type { Metadata } from 'next'
import { collections } from '@/lib/collections'
import { games } from '@/lib/games'
import { gameComparison } from '@/lib/gameComparison'
import { posts, postHref } from '@/lib/posts'
import { ogUrl, siteName, siteUrl } from '@/lib/seo'

const title = `All ${games.length} Stress Relief Games & Tools`
const description =
  'Free online stress relief games and calm tools: bubble wrap, slime, zen garden, stress ball, fidget spinner, breathing and rain sounds. Compare and pick one.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/games' },
  openGraph: {
    type: 'website',
    url: '/games',
    siteName,
    title: `${title} | ${siteName}`,
    description,
    images: [{ url: ogUrl(title, 'All games and tools — free online'), width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${siteName}`,
    description,
    images: [ogUrl(title, 'All games and tools — free online')],
  },
}

// An ItemList is accurate here: this page is literally an ordered collection of
// the games and tools, and each entry points at the page that hosts it. No
// ratings or review counts are invented.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Online Stress Relief Games & Tools',
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
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          All {games.length} Stress Relief Games &amp; Tools
        </h1>
        <p className="mx-auto max-w-2xl leading-relaxed text-slate-400">
          Short games and calm tools you can finish in a couple of minutes. Everything runs in the
          browser: no signup, no download, nothing to install. Pick one and start with the thing itself.
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
            <img
              src={game.thumb}
              alt={game.imageAlt}
              width={game.thumbWidth}
              height={game.thumbHeight}
              loading="lazy"
              className="mb-4 aspect-video w-full rounded-xl border border-slate-700 object-cover"
            />
            <h2 className="mb-2 text-xl font-semibold">
              {game.title}
              {game.kind === 'tool' && (
                <span className="ml-2 rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-300">
                  Tool
                </span>
              )}
            </h2>
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

      <section id="compare" className="mx-auto mt-16 max-w-5xl">
        <h2 className="mb-4 text-2xl font-bold">At a Glance</h2>
        <p className="mb-6 leading-relaxed text-slate-400">
          A quick comparison of the games and tools. The evidence column is deliberately
          conservative: none of these has a direct clinical trial behind it, so the labels describe
          how close the supporting research is.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full min-w-[800px] border-collapse text-left text-sm">
            <thead className="bg-slate-800/60 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Game / Tool</th>
                <th className="px-4 py-3 font-semibold">Best for</th>
                <th className="px-4 py-3 font-semibold">Session</th>
                <th className="px-4 py-3 font-semibold">Sound</th>
                <th className="px-4 py-3 font-semibold">Input</th>
                <th className="px-4 py-3 font-semibold">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {gameComparison.map((row) => (
                <tr key={row.href} className="border-t border-slate-800">
                  <td className="px-4 py-3">
                    <a
                      href={row.href}
                      className="font-semibold text-white transition hover:text-violet-300"
                    >
                      {row.name}
                    </a>
                    {row.kind === 'tool' && (
                      <span className="ml-2 rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-300">
                        Tool
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{row.bestFor}</td>
                  <td className="px-4 py-3 text-slate-400">{row.session}</td>
                  <td className="px-4 py-3 text-slate-400">{row.sound}</td>
                  <td className="px-4 py-3 text-slate-400">{row.input}</td>
                  <td className="px-4 py-3 text-slate-400">{row.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="collections" className="mx-auto mt-16 max-w-5xl">
        <h2 className="mb-4 text-2xl font-bold">Browse by Mood</h2>
        <p className="mb-6 leading-relaxed text-slate-400">
          Not sure where to start? These collections group the games and tools by what you want
          from the break — pop, texture, quiet, fidget, sound, or a specific situation.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <a
              key={collection.slug}
              href={`/${collection.slug}`}
              className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-4 transition hover:border-violet-500 hover:bg-slate-800/60"
            >
              <span className="block font-semibold text-white">{collection.h1}</span>
              <span className="mt-1 block text-xs text-slate-500">
                {collection.items.length} games & tools
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">Which One to Pick</h2>
        <p className="mb-6 leading-relaxed text-slate-400">
          The games and tools are not flavours of the same thing. They ask for different kinds of
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
          <li>
            <strong className="text-white">Wound up, need to slow the breath</strong> —{' '}
            <a href="/games/breathing" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Box Breathing
            </a>
            ,{' '}
            <a href="/games/rain-sounds" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Rain Sounds
            </a>{' '}
            or{' '}
            <a href="/games/worry-jar" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Worry Jar
            </a>
            . Quiet tools for a slower reset.
          </li>
          <li>
            <strong className="text-white">Want to make something</strong> —{' '}
            <a href="/games/mandala" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Mandala Drawing
            </a>{' '}
            or{' '}
            <a href="/games/lava-lamp" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
              Lava Lamp
            </a>
            . Visual, low-stakes and easy to stop.
          </li>
        </ul>
      </section>

      <section className="mx-auto mt-14 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">What These Games &amp; Tools Are Not</h2>
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
        <h2 className="mb-4 text-2xl font-bold">Why These Games Work</h2>
        <p className="mb-5 leading-relaxed text-slate-400">
          Each of the six original games has a guide behind it that looks at what the research
          actually supports — and where the claim falls apart. {posts.length} guides, all short:
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

      <p className="mt-10 text-center text-sm text-slate-400">
        Teachers and bloggers:{' '}
        <a href="/embed" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
          six of our games can be embedded on your own page
        </a>
        .
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
