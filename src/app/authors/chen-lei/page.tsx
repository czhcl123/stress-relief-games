import type { Metadata } from 'next'
import { games } from '@/lib/games'
import { posts, postHref } from '@/lib/posts'
import {
  authorBio,
  authorName,
  authorRole,
  authorUrl,
  siteName,
  siteUrl,
} from '@/lib/seo'

const title = 'Chen Lei — Author & Developer'
const description =
  'Chen Lei is an independent developer and programming enthusiast who builds Stress Relief Games and writes its evidence-aware guides.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/authors/chen-lei' },
  openGraph: {
    type: 'profile',
    url: authorUrl,
    siteName,
    title,
    description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: authorName }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: authorName,
  jobTitle: authorRole,
  url: authorUrl,
  description: authorBio,
  worksFor: { '@id': `${siteUrl}/#organization` },
  knowsAbout: [
    'Browser games',
    'HTML5 Canvas',
    'Web Audio',
    'JavaScript',
    'Stress relief',
  ],
}

export default function AuthorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-slate-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <header className="mb-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div
          aria-hidden="true"
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 text-3xl font-bold text-violet-300"
        >
          CL
        </div>
        <div>
          <h1 className="mb-1 text-4xl font-bold text-white">{authorName}</h1>
          <p className="text-lg text-violet-300">{authorRole}</p>
        </div>
      </header>

      <section className="mb-10 space-y-4 leading-relaxed">
        <p>
          {authorName} is an independent developer and programming enthusiast who builds
          small, focused browser games. He created {siteName}, a collection of six free
          browser games designed for short, satisfying breaks.
        </p>
        <p>
          Every game is hand-coded in HTML, JavaScript, the Canvas API and the Web Audio
          API — no game engines, no advertising, and no account required. The site runs
          entirely in the browser.
        </p>
        <p>
          He also writes the site&apos;s guides. Each guide is checked against the cited
          research and carries the date the evidence was last reviewed, so readers can see
          what is supported, what is uncertain, and what the games cannot do.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">Games</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {games.map((game) => (
            <li key={game.href}>
              <a
                href={game.href}
                className="flex items-center gap-3 rounded-xl border border-slate-800 px-4 py-3 text-sm text-slate-300 transition hover:border-violet-500 hover:bg-slate-800/50 hover:text-white"
              >
                <span aria-hidden="true" className="text-xl">{game.emoji}</span>
                {game.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">Guides</h2>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <a
                href={postHref(post)}
                className="block rounded-lg border border-slate-800 px-4 py-3 text-sm text-slate-300 transition hover:border-violet-500 hover:bg-slate-800/50 hover:text-white"
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-4 text-sm leading-relaxed text-slate-400">
        <h2 className="mb-2 text-lg font-semibold text-white">Contact</h2>
        <p>
          Bug reports, corrections and suggestions are welcome at{' '}
          <a
            className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
            href="mailto:hello@stress-relief-games.com"
          >
            hello@stress-relief-games.com
          </a>
          .
        </p>
      </section>
    </div>
  )
}
