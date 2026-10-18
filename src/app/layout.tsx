import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stress Relief Games - Free Online Relaxing & Satisfying Games',
  description: 'Play free online stress relief games. Bubble wrap popping, slime simulator, fidget spinner, and more relaxing games to help you unwind.',
  keywords: 'stress relief games, satisfying games, relaxing games, bubble wrap, fidget spinner, antistress',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-bold">
              <span className="text-violet-400">🎮</span> Stress Relief Games
            </a>
            <nav className="hidden sm:flex gap-6 text-sm text-slate-400">
              <a href="/" className="hover:text-white transition">Home</a>
              <a href="/games/bubble-wrap" className="hover:text-white transition">Bubble Wrap</a>
              <a href="/games/slime-simulator" className="hover:text-white transition">Slime</a>
              <a href="/games/zen-garden" className="hover:text-white transition">Zen Garden</a>
              <a href="/games/stress-ball" className="hover:text-white transition">Stress Ball</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-slate-800 text-center py-6 text-sm text-slate-500">
          <p>Free online stress relief games. No signup, no download.</p>
          <p className="mt-1">© 2026 StressReliefGames.net</p>
        </footer>
      </body>
    </html>
  )
}