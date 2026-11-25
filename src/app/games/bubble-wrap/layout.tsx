import { gameJsonLd, gameMetadata } from '@/lib/seo'
import GuideLink from '@/components/GuideLink'
import RelatedGames from '@/components/RelatedGames'
import GameSeoExtras from '@/components/GameSeoExtras'
import GameScreenshot from '@/components/GameScreenshot'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Bubble Wrap Popper — Free Online Bubble Wrap Game',
  description:
    'Pop virtual bubble wrap online for free — 192 bubbles, satisfying sounds, Zen and Speed modes. No download, no signup, no ads.',
  path: '/games/bubble-wrap',
  keywords: ['bubble wrap popper', 'bubble wrap game', 'pop bubble wrap', 'virtual bubble wrap', 'satisfying game', 'antistress'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function BubbleWrapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSeoExtras gamePath={seo.path} />
      {children}
      <GameScreenshot gamePath={seo.path} />
      <GuideLink gameHref={seo.path} />
      <RelatedGames current={seo.path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
