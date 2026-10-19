import type { Metadata } from 'next'
import { games } from '@/lib/games'
import { posts, postHref } from '@/lib/posts'
import { siteName } from '@/lib/seo'

const title = 'Stress Relief Guides'
const description =
  'Practical, evidence-aware guides to the games on this site: why popping bubble wrap calms you down, how slime affects anxiety, and more.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: '/blog',
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

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Stress Relief Guides</h1>
        <p className="mx-auto max-w-2xl leading-relaxed text-slate-400">
          Short, honest reads about the games on this site — what the evidence actually says, which
          version suits which mood, and how to use each one as a real two-minute break.
        </p>
      </header>

      <ul className="space-y-4">
        {posts.map((post) => {
          const game = games.find((g) => g.href === post.game)
          return (
            <li key={post.slug}>
              <a
                href={postHref(post)}
                className="group flex gap-4 rounded-2xl border border-slate-700 bg-slate-800/50 p-5 transition hover:border-violet-500 hover:bg-slate-800"
              >
                <span aria-hidden="true" className="text-3xl leading-none">
                  {game?.emoji}
                </span>
                <span className="min-w-0">
                  <span className="mb-1 block text-lg font-semibold text-white group-hover:text-violet-300">
                    {post.title}
                  </span>
                  <span className="mb-2 block text-sm leading-relaxed text-slate-400">
                    {post.description}
                  </span>
                  <span className="block text-xs text-slate-400">{post.minutes} min read</span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      <p className="mt-10 text-center text-sm text-slate-400">
        Just want to play?{' '}
        <a href="/" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
          All six games are on the homepage
        </a>
        .
      </p>
    </div>
  )
}
