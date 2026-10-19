import type { ReactNode } from 'react'
import { games } from '@/lib/games'
import { posts, postHref, type Block, type Post } from '@/lib/posts'
import RelatedGames from '@/components/RelatedGames'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/** Rendered on the server only, but parse by hand so the date can't shift by a timezone. */
function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return `${MONTHS[month - 1]} ${day}, ${year}`
}

/**
 * Tiny inline formatter for the article bodies: `[text](/path)` becomes a link
 * and `**text**` becomes bold. The bodies are trusted, author-written strings —
 * not user input — so we deliberately do not pull in a markdown parser.
 */
function inline(text: string): ReactNode {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  const parts: ReactNode[] = []
  let last = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))

    if (match[1] !== undefined) {
      const href = match[2]
      const external = /^https?:\/\//.test(href)
      parts.push(
        <a
          key={`link-${key++}`}
          href={href}
          className="text-violet-400 underline underline-offset-2 transition hover:text-violet-300"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {match[1]}
        </a>,
      )
    } else {
      parts.push(
        <strong key={`bold-${key++}`} className="font-semibold text-slate-100">
          {match[3]}
        </strong>,
      )
    }

    last = match.index + match[0].length
  }

  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.t) {
          case 'h2':
            return (
              <h2 key={index} className="mt-10 mb-4 text-2xl font-bold text-white">
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={index} className="mt-6 mb-2 text-lg font-semibold text-white">
                {block.text}
              </h3>
            )
          case 'p':
            return (
              <p key={index} className="mb-4 leading-relaxed text-slate-300">
                {inline(block.text)}
              </p>
            )
          case 'ul':
            return (
              <ul key={index} className="mb-5 space-y-2 pl-5">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="list-disc leading-relaxed text-slate-300 marker:text-violet-400"
                  >
                    {inline(item)}
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={index} className="mb-5 space-y-2 pl-5">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="list-decimal leading-relaxed text-slate-300 marker:text-violet-400"
                  >
                    {inline(item)}
                  </li>
                ))}
              </ol>
            )
          case 'note':
            return (
              <aside
                key={index}
                className="my-6 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm leading-relaxed text-slate-400"
              >
                {inline(block.text)}
              </aside>
            )
          default:
            return null
        }
      })}
    </>
  )
}

export default function BlogArticle({ post, blocks }: { post: Post; blocks: Block[] }) {
  const game = games.find((g) => g.href === post.game)
  const moreGuides = posts.filter((p) => p.slug !== post.slug)

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pt-10 pb-4">
        <a href="/blog" className="text-sm text-slate-400 transition hover:text-white">
          ← All guides
        </a>

        <header className="mt-4 mb-8">
          <h1 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
          <p className="text-sm text-slate-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.minutes} min read
          </p>
        </header>

        <Blocks blocks={blocks} />

        {game && (
          <div className="mt-10 rounded-2xl border border-violet-500/30 bg-violet-500/10 px-6 py-6 text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-violet-300">
              Try it right now
            </p>
            <p className="mb-4 text-lg font-semibold text-white">
              Play {game.title} — free, no signup, no download
            </p>
            <a
              href={game.href}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              <span aria-hidden="true">{game.emoji}</span>
              Open {game.title}
            </a>
          </div>
        )}

        <section className="mt-12">
          <h2 className="mb-4 text-lg font-bold">More Stress Relief Guides</h2>
          <ul className="space-y-2">
            {moreGuides.map((other) => (
              <li key={other.slug}>
                <a
                  href={postHref(other)}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 rounded-lg border border-slate-800 px-4 py-3 text-sm transition hover:border-violet-500 hover:bg-slate-800/50"
                >
                  <span className="text-slate-200">{other.title}</span>
                  <span className="text-xs text-slate-400">{other.minutes} min read</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <RelatedGames current={post.game} />
    </>
  )
}
