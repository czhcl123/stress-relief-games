import type { Metadata, Viewport } from 'next'
import {
  authorName,
  authorRole,
  authorUrl,
  siteDescription,
  siteName,
  siteUrl,
} from '@/lib/seo'
import './globals.css'

const title = 'Free Online Stress Relief Games — No Signup, No Ads'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'stress relief games',
    'satisfying games',
    'relaxing games',
    'bubble wrap',
    'slime simulator',
    'zen garden',
    'stress ball',
    'fidget spinner',
    'sand cutting',
    'kinetic sand',
    'antistress',
  ],
  applicationName: siteName,
  // Google Search Console ownership proof (HTML tag method). Kept in the root
  // layout so every page carries it and verification can never silently lapse.
  verification: {
    google: 'hdEepR7774uDLVmiuC7nLdplgpmLGUTiziYPMrGe2yg',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    siteName,
    url: siteUrl,
    title,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteDescription,
  },
  // Deliberately no `index`/`follow` here: the default is indexable, and a
  // global robots tag would collide with the noindex Next.js injects into the
  // 404 page. Only the Google-specific preview directives are global.
  robots: {
    googleBot: {
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      inLanguage: 'en',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/logo-512.png`,
      email: 'hello@stress-relief-games.com',
      foundingDate: '2026',
      founder: {
        '@type': 'Person',
        name: authorName,
        jobTitle: authorRole,
        url: authorUrl,
        sameAs: ['https://github.com/czhcl123'],
      },
      sameAs: [
        'https://github.com/czhcl123/stress-relief-games',
        'https://github.com/czhcl123',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'hello@stress-relief-games.com',
      },
      knowsAbout: [
        'Browser games',
        'HTML5 Canvas',
        'Web Audio',
        'Stress relief',
        'Casual games',
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <a href="/" className="flex items-center gap-2 text-lg font-bold sm:text-xl">
              <img
                src="/favicon-32x32.png"
                alt="Stress Relief Games logo"
                width={28}
                height={28}
                className="h-7 w-7 rounded-md"
              />
              Stress Relief Games
            </a>

            {/* CSS-only mobile menu: works without JavaScript and keeps the
                header usable below the 640px breakpoint. */}
            <details className="relative sm:hidden">
              <summary
                aria-label="Open site menu"
                className="flex cursor-pointer list-none items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-violet-500 hover:text-white [&::-webkit-details-marker]:hidden"
              >
                Menu <span aria-hidden="true">▾</span>
              </summary>
              <nav className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-700 bg-slate-900 p-2 text-sm shadow-2xl">
                <a href="/" className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">Home</a>
                <a href="/games" className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">All games</a>
                <a href="/games/bubble-wrap" className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">Bubble Wrap</a>
                <a href="/games/slime-simulator" className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">Slime</a>
                <a href="/games/zen-garden" className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">Zen Garden</a>
                <a href="/games/stress-ball" className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">Stress Ball</a>
                <a href="/games/fidget-spinner" className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">Spinner</a>
                <a href="/games/sand-cutting" className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">Sand</a>
                <a href="/blog" className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">Guides</a>
                <a href="/embed" className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">Embed</a>
              </nav>
            </details>

            <nav className="hidden sm:flex flex-wrap items-center justify-end gap-x-4 md:gap-x-6 gap-y-1 text-sm text-slate-400">
              <a href="/" className="hover:text-white transition">Home</a>
              <a href="/games/bubble-wrap" className="hover:text-white transition">Bubble Wrap</a>
              <a href="/games/slime-simulator" className="hover:text-white transition">Slime</a>
              <a href="/games/zen-garden" className="hover:text-white transition">Zen Garden</a>
              <a href="/games/stress-ball" className="hover:text-white transition">Stress Ball</a>
              <a href="/games/fidget-spinner" className="hover:text-white transition">Spinner</a>
              <a href="/games/sand-cutting" className="hover:text-white transition">Sand</a>
              <a href="/blog" className="hover:text-white transition">Guides</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-slate-800 text-center py-6 text-sm text-slate-400">
          <p>
            Free online stress relief games. No signup, no download.{' '}
            <a href="/games" className="text-violet-400 underline underline-offset-2 transition hover:text-violet-300">All Games</a>
            <span aria-hidden="true"> · </span>
            <a href="/blog" className="text-violet-400 underline underline-offset-2 transition hover:text-violet-300">Guides</a>
            <span aria-hidden="true"> · </span>
            <a href="/about" className="text-violet-400 underline underline-offset-2 transition hover:text-violet-300">About</a>
            <span aria-hidden="true"> · </span>
            <a href="/embed" className="text-violet-400 underline underline-offset-2 transition hover:text-violet-300">Embed</a>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            <a href="/authors/chen-lei" className="transition hover:text-slate-300">Author</a>
            <span aria-hidden="true"> · </span>
            <a href="/privacy" className="transition hover:text-slate-300">Privacy</a>
            <span aria-hidden="true"> · </span>
            <a href="/terms" className="transition hover:text-slate-300">Terms</a>
            <span aria-hidden="true"> · </span>
            <a href="/disclaimer" className="transition hover:text-slate-300">Disclaimer</a>
          </p>
          <p className="mt-1">© 2026 {siteName}</p>
        </footer>
        {/* Ahrefs Analytics — kept as a plain async script so the tag is present
            in the server-rendered HTML (next/script only preloads it), which is
            also what Ahrefs' site-ownership verification looks for. */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="+MKjZZJ84XCEYCstwH6e5Q"
          async
        />
      </body>
    </html>
  )
}