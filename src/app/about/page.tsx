import type { Metadata } from 'next'
import { siteUrl } from '@/lib/seo'

const title = 'About'
const description =
  'Stress Relief Games is a small solo-built project offering free browser games for quick, satisfying mental breaks. Learn who builds it, why, and how the games are made.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/about`,
    title: `${title} | Stress Relief Games`,
    description,
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stress Relief Games Team',
  url: `${siteUrl}/about`,
  worksFor: {
    '@type': 'Organization',
    name: 'Stress Relief Games',
    url: siteUrl,
  },
  description:
    'Solo developer and editor behind Stress Relief Games — a small collection of free browser games for short, satisfying mental breaks.',
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stress Relief Games',
  url: siteUrl,
  description:
    'Free online stress relief games: pop bubble wrap, stretch slime, spin a fidget spinner, rake a zen garden, squeeze a stress ball, or cut kinetic sand.',
  foundingDate: '2026',
  knowsAbout: [
    'Browser games',
    'HTML5 Canvas',
    'Web Audio',
    'Stress relief',
    'Casual games',
  ],
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-slate-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
        About <span className="text-violet-400">Stress Relief Games</span>
      </h1>
      <p className="text-slate-400 text-lg mb-10">
        A small collection of free, browser-based games built for one purpose: a quick,
        satisfying break when you need it.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-3">What this site is</h2>
        <p className="leading-relaxed mb-3">
          Stress Relief Games hosts six free online games — bubble wrap popping, slime
          stretching, zen garden raking, stress ball squeezing, fidget spinner spinning, and
          kinetic sand cutting. Every game runs entirely in your browser. There is no signup,
          no account, no download, and no advertising. You click and play.
        </p>
        <p className="leading-relaxed">
          The games are designed for short breaks. Most sessions last under five minutes. The
          goal is not &quot;engagement&quot; or &quot;time on site&quot; — it is the opposite. We want you to
          pop a few bubbles, take a breath, and get back to whatever you were doing.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-3">Who builds it</h2>
        <p className="leading-relaxed mb-3">
          The site is built and maintained by a single developer. Every game is hand-coded in
          HTML, JavaScript, and the Canvas and Web Audio APIs. No game engines, no third-party
          tracking, no analytics scripts. The only third-party request your browser makes is
          loading the page itself.
        </p>
        <p className="leading-relaxed">
          The project started in late 2026 as a personal experiment in building small,
          focused, satisfying web experiences. The first game was a virtual bubble wrap
          popper. New games are added when an idea feels genuinely useful for a quick
          mental break.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-3">Editorial policy</h2>
        <p className="leading-relaxed mb-3">
          We do not run sponsored content, paid placements, or affiliate links on game pages.
          If the site ever adds such programs, they will be clearly labeled and never affect
          the gameplay itself.
        </p>
        <p className="leading-relaxed mb-3">
          Game descriptions and instructions are written by the developer. We do not generate
          or rewrite content using AI language models — every word on this site is human
          written. (The site code itself uses AI-assisted tooling, which we believe in being
          transparent about.)
        </p>
        <p className="leading-relaxed">
          We do not collect personal data. There is no newsletter, no email signup, and no
          third-party tracking pixels. The site does not set advertising cookies and does
          not require cookies to function.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-3">Why these specific games</h2>
        <p className="leading-relaxed mb-3">
          Each game is chosen because it offers a distinct kind of satisfying interaction:
        </p>
        <ul className="list-disc list-inside space-y-1 leading-relaxed mb-3">
          <li><strong>Bubble Wrap Popper</strong> — repetitive tactile satisfaction, Zen and Speed modes.</li>
          <li><strong>Slime Simulator</strong> — soft, stretchy, ASMR-style sensory input.</li>
          <li><strong>Zen Garden</strong> — slow, creative, pattern-making calm.</li>
          <li><strong>Stress Relief Ball</strong> — quick, sharp, physical release.</li>
          <li><strong>Fidget Spinner</strong> — rhythmic motion and sound, RPM-based feedback.</li>
          <li><strong>Sand Cutting</strong> — precise, visual, ASMR cutting and shaping.</li>
        </ul>
        <p className="leading-relaxed">
          Together they cover the main categories of &quot;oddly satisfying&quot; browser content. If
          you have a request for a new type, the contact email below is the best place to
          send it.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-3">Technical notes</h2>
        <p className="leading-relaxed mb-3">
          The site is a single Next.js application. Games are React client components using
          HTML5 Canvas for rendering and the Web Audio API for sound. The site is statically
          generated and served from edge infrastructure. No server-side state is required to
          play.
        </p>
        <p className="leading-relaxed">
          Compatibility: the games run in any modern desktop or mobile browser released in
          the last three years. Touch input is supported on mobile. Sound can be muted from
          each game&apos;s on-screen control.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
        <p className="leading-relaxed">
          For bug reports, suggestions, or general feedback, email{' '}
          <a className="text-violet-400 underline underline-offset-2 hover:text-violet-300" href="mailto:hello@stress-relief-games.com">
            hello@stress-relief-games.com
          </a>
          . Bug reports with a browser name, device, and a short description of what
          happened are the most useful.
        </p>
      </section>
    </div>
  )
}
