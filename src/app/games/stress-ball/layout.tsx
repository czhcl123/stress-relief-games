import { gameJsonLd, gameMetadata } from '@/lib/seo'
import GuideLink from '@/components/GuideLink'
import RelatedGames from '@/components/RelatedGames'
import GameSeoExtras from '@/components/GameSeoExtras'
import GameScreenshot from '@/components/GameScreenshot'
import GameDetails from '@/components/GameDetails'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Stress Ball Game — Free Online Stress Relief Ball',
  description:
    'Squeeze, throw and bounce a virtual stress ball online for free. Six ball types with distinct physics — a quick, satisfying stress relief game.',
  path: '/games/stress-ball',
  keywords: ['stress ball', 'virtual stress ball', 'squeeze ball game', 'fidget game', 'antistress game'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function StressBallLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSeoExtras gamePath={seo.path} />
      {children}
      <GameScreenshot gamePath={seo.path} />
      <GameDetails gamePath={seo.path} />
      <GuideLink gameHref={seo.path} />
      <RelatedGames current={seo.path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
