import type { Metadata } from 'next'
import CopyBlock from '@/components/CopyBlock'
import { games } from '@/lib/games'
import { siteName, siteUrl } from '@/lib/seo'

const title = 'Embed a Stress Relief Game on Your Site'

// Measured with the widget rendered at 640px wide (content height + 4px slack).
const heights: Record<string, number> = {
  '/games/bubble-wrap': 624,
  '/games/slime-simulator': 744,
  '/games/zen-garden': 704,
  '/games/stress-ball': 740,
  '/games/fidget-spinner': 900,
  '/games/sand-cutting': 900,
}

const description =
  'Six free games you can embed with one iframe: bubble wrap, slime, zen garden, stress ball, fidget spinner and sand cutting. No signup, no API key.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/embed' },
  openGraph: {
    type: 'website',
    url: '/embed',
    siteName,
    title,
    description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
}

const slugOf = (href: string) => href.replace('/games/', '')

const fixedSnippet = (href: string, name: string) =>
  `<iframe src="${siteUrl}/embed/${slugOf(href)}"\n  width="100%" height="${heights[href]}"\n  style="border:0;border-radius:12px;max-width:640px"\n  title="${name}" loading="lazy"></iframe>`

const autoSnippet = (href: string, name: string) =>
  `<iframe id="srg-game" src="${siteUrl}/embed/${slugOf(href)}"\n  width="100%" height="${heights[href]}"\n  style="border:0;border-radius:12px;max-width:640px"\n  title="${name}" loading="lazy"></iframe>\n<script>\n  addEventListener('message', function (e) {\n    if (e.data && e.data.type === 'srg-embed-height') {\n      var f = document.getElementById('srg-game');\n      if (f) f.style.height = e.data.height + 'px';\n    }\n  });\n</script>`

const creditSnippet = `<a href="${siteUrl}/games/bubble-wrap">Bubble Wrap Popper — Stress Relief Games</a>`

export default function EmbedIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Embed a Game on Your Site</h1>
        <p className="leading-relaxed text-slate-400">
          All six games can be dropped into a class page, a blog post or a staff intranet with one
          iframe. No signup, no API key, no build step — paste the snippet and it works.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">Live example</h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          This is the real widget, loaded from the same URL your snippet uses:
        </p>
        <iframe
          src="/embed/bubble-wrap"
          width="100%"
          height={heights['/games/bubble-wrap']}
          style={{ border: 0, borderRadius: 12, maxWidth: 640 }}
          title="Bubble Wrap Popper"
          loading="lazy"
        />
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">The snippet</h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          Pick a game, change the slug if you want a different one. This version keeps the height
          fixed, which is the simplest option:
        </p>
        <CopyBlock code={fixedSnippet('/games/bubble-wrap', 'Bubble Wrap Popper')} label="Iframe" />

        <p className="mb-4 mt-6 text-sm leading-relaxed text-slate-400">
          Or use the auto-resizing version. The widget reports its own height, so it stays correct
          when the container is narrower than 640px — where the games get taller:
        </p>
        <CopyBlock code={autoSnippet('/games/bubble-wrap', 'Bubble Wrap Popper')} label="Iframe + resize" />
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">All six games</h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          Heights below are measured at 640px wide. If your column is narrower, use the auto-resizing
          snippet instead of these numbers.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-300">
              <tr>
                <th className="px-3 py-2 font-medium">Game</th>
                <th className="px-3 py-2 font-medium">Embed URL</th>
                <th className="px-3 py-2 font-medium">Height @640px</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              {games.map((game) => (
                <tr key={game.href} className="border-t border-slate-800">
                  <td className="px-3 py-2 text-slate-200">
                    <span aria-hidden="true">{game.emoji}</span> {game.title}
                  </td>
                  <td className="break-all px-3 py-2 font-mono text-xs">/embed/{slugOf(game.href)}</td>
                  <td className="px-3 py-2">{heights[game.href]}px</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">If you want to credit the source</h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          The widget already includes a small link back to the full game. A plain text link next to
          the iframe is more useful for readers than the credit inside it, and it is the only part of
          this that helps us — so it is appreciated, not required:
        </p>
        <CopyBlock code={creditSnippet} label="Credit link" />
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold">What it does and doesn&apos;t do</h2>
        <ul className="space-y-2 text-sm leading-relaxed text-slate-400">
          <li>
            <strong className="text-slate-200">No signup, no cookies for you to ask about.</strong> The
            games have no accounts and no login.
          </li>
          <li>
            <strong className="text-slate-200">Works on mobile.</strong> Every game is touch-ready;
            the sand and slime games block page scrolling inside their canvas so drags don&apos;t
            scroll the page.
          </li>
          <li>
            <strong className="text-slate-200">Sound is on by default</strong> for the games that have
            it (bubble wrap, slime, sand, stress ball). Browsers only start audio after a click, so
            nothing plays on load.
          </li>
          <li>
            <strong className="text-slate-200">We do count visits.</strong> The embed loads the same
            page as the site, so our analytics see it the same way. We don&apos;t know who is viewing.
          </li>
        </ul>
      </section>

      <p className="text-sm text-slate-400">
        Want a different size, a light theme or a version without the credit bar? Reply to{' '}
        <a href="/about" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">
          the contact address on the about page
        </a>{' '}
        and it can be arranged.
      </p>
    </div>
  )
}
