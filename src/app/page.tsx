import type { Metadata } from 'next'
import { games } from '@/lib/games'
import { posts, postHref } from '@/lib/posts'
import { ogUrl, siteName, siteUrl } from '@/lib/seo'

const title = 'Free Online Stress Relief Games — No Signup, No Ads'
const description =
  'Play six free online stress relief games: bubble wrap, slime, zen garden, stress ball, fidget spinner and kinetic sand. No signup, no download, no ads.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title,
    description,
    images: [{ url: ogUrl(title, 'Free online · no signup · no ads'), width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogUrl(title, 'Free online · no signup · no ads')],
  },
}

const faqs = [
  {
    q: 'Are these stress relief games free?',
    a: 'Yes. All six games are free to play in your browser. There is no signup, no download, no in-app purchase and no advertising.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. The games are tested in current Chrome and Edge on desktop, and Android Chrome on mobile. Touch input is supported; Safari and Firefox are not formally tested yet. Sound is optional and can be muted from each game.',
  },
  {
    q: 'Which game is best for a quick break?',
    a: 'For one or two minutes, try the Stress Relief Ball or the Fidget Spinner. For a slower break, the Zen Garden or Slime Simulator works better. Bubble Wrap and Sand Cutting sit in between.',
  },
  {
    q: 'Are these games a substitute for therapy?',
    a: 'No. They are short, low-stakes breaks, not treatment. If stress is affecting your sleep, work or appetite for weeks, talk to a doctor or therapist. This site is general information, not medical advice.',
  },
  {
    q: 'Do the games work on a phone?',
    a: 'Yes. Every game supports touch input, and the layout adapts to phone screens. Headphones make the ASMR sounds more noticeable, but they are not required.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Free Online <span className="text-violet-400">Stress Relief</span> Games
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Take a break. Pop some bubble wrap, stretch some slime, or spin a fidget toy.
          No signup, no download — just click and relax.
        </p>
      </div>

      {/* Game Grid */}
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-bold">Six Games to Try</h2>
        <a href="/games" className="text-sm text-violet-400 underline underline-offset-2 hover:text-violet-300">
          All games →
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <a
            key={game.title}
            href={game.coming ? undefined : game.href}
            className={`group block rounded-2xl border p-6 transition-all ${
              game.coming
                ? 'border-slate-800 bg-slate-900/40 cursor-default'
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
            <h2 className="text-xl font-semibold mb-2">
              {game.title}
              {game.coming && (
                <span className="ml-2 text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              )}
            </h2>
            <p className="text-slate-400 text-sm mb-3">{game.desc}</p>
            <div className="flex gap-2 flex-wrap">
              {game.tags.map((tag) => (
                <span key={tag} className="text-xs bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Guides */}
      <section className="mt-16">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold">Stress Relief Guides</h2>
          <a href="/blog" className="text-sm text-violet-400 underline underline-offset-2 hover:text-violet-300">
            All guides →
          </a>
        </div>
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

      {/* SEO content */}
      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">What Are Stress Relief Games?</h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          Stress relief games are short, low-stakes browser games built around a simple,
          repetitive action: popping bubble wrap, stretching slime, raking sand, squeezing a
          stress ball. They are not therapy, and they are not a replacement for rest, exercise
          or professional support. What they do is interrupt an open-ended stress loop with
          something that has a clear finish line — which is often enough to make a two-minute
          break feel like a real break.
        </p>
        <p className="text-slate-400 leading-relaxed">
          Every game here runs entirely in your browser. There is no account, no download,
          no advertising and no timer pushing you to stay. Play for thirty seconds or five
          minutes, then close the tab and go back to your day.
        </p>
      </section>

      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">How to Choose in 30 Seconds</h2>
        <ul className="space-y-3 text-slate-400 leading-relaxed">
          <li>
            <strong className="text-white">Restless hands, need something to do</strong> —{' '}
            <a href="/games/bubble-wrap" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">Bubble Wrap Popper</a>{' '}
            or{' '}
            <a href="/games/sand-cutting" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">Sand Cutting</a>.
            Fast, repetitive and easy to stop.
          </li>
          <li>
            <strong className="text-white">Wound up, can&apos;t settle</strong> —{' '}
            <a href="/games/zen-garden" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">Zen Garden</a>{' '}
            or{' '}
            <a href="/games/slime-simulator" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">Slime Simulator</a>.
            Slow, quiet and no score.
          </li>
          <li>
            <strong className="text-white">Two minutes between meetings</strong> —{' '}
            <a href="/games/stress-ball" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">Stress Relief Ball</a>{' '}
            or{' '}
            <a href="/games/fidget-spinner" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">Fidget Spinner</a>.
            Open, play, close.
          </li>
        </ul>
        <p className="mt-4 text-sm">
          <a
            href="/games#compare"
            className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
          >
            See the full comparison table →
          </a>
        </p>
      </section>

      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Why Short Breaks Help</h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          Research on short breaks suggests that brief, low-stakes pauses help sustain
          concentration (
          <a href="https://doi.org/10.3389/fpsyg.2025.1589411" className="text-violet-400 underline underline-offset-2 hover:text-violet-300">Sharpe et al., 2025</a>
          ). The useful part is not the game itself; it is the stopping point. A feed scrolls
          forever. A sheet of bubble wrap runs out. That clear ending is what lets a two-minute
          break stay two minutes.
        </p>
        <p className="text-slate-400 leading-relaxed">
          Whether you are at work, at school or just need a moment to decompress, these games
          are built for short sessions. Pick one, play a round, and go back to what you were doing.
        </p>
      </section>

      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-white">{faq.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}