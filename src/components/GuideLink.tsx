import { postForGame, postHref } from '@/lib/posts'

/**
 * Bridges a game page to its long-form guide, so the informational page and
 * the playable page link to each other instead of competing for one query.
 * Rendered from the game layout (a server component), so it ships no JS.
 */
export default function GuideLink({ gameHref }: { gameHref: string }) {
  const post = postForGame(gameHref)
  if (!post) return null

  return (
    <section className="mx-auto max-w-4xl px-4 pt-2">
      <a
        href={postHref(post)}
        className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm transition hover:border-violet-500 hover:bg-slate-800"
      >
        <span aria-hidden="true" className="text-base leading-6">
          📖
        </span>
        <span>
          <span className="block font-semibold text-slate-100">Read the guide: {post.title}</span>
          <span className="block text-slate-400">
            Why it works and how to get the most out of it · {post.minutes} min read
          </span>
        </span>
      </a>
    </section>
  )
}
