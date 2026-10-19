import type { Metadata } from 'next'
import { siteDescription, siteName, siteUrl } from '@/lib/seo'
import './globals.css'

const title = 'Stress Relief Games - Free Online Relaxing Games'

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
  alternates: { canonical: '/' },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  description: siteDescription,
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
            <a href="/" className="text-lg sm:text-xl font-bold">
              <span className="text-violet-400">🎮</span> Stress Relief Games
            </a>
            <nav className="hidden sm:flex flex-wrap items-center justify-end gap-x-4 md:gap-x-6 gap-y-1 text-sm text-slate-400">
              <a href="/" className="hover:text-white transition">Home</a>
              <a href="/games/bubble-wrap" className="hover:text-white transition">Bubble Wrap</a>
              <a href="/games/slime-simulator" className="hover:text-white transition">Slime</a>
              <a href="/games/zen-garden" className="hover:text-white transition">Zen Garden</a>
              <a href="/games/stress-ball" className="hover:text-white transition">Stress Ball</a>
              <a href="/games/fidget-spinner" className="hover:text-white transition">Spinner</a>
              <a href="/games/sand-cutting" className="hover:text-white transition">Sand</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-slate-800 text-center py-6 text-sm text-slate-400">
          <p>
            Free online stress relief games. No signup, no download.{' '}
            <a href="/about" className="text-violet-400 hover:underline">About</a>
          </p>
          <p className="mt-1">© 2026 StressReliefGames.net</p>
        </footer>
      </body>
    </html>
  )
}