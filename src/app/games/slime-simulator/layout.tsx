import { gameJsonLd, gameMetadata } from '@/lib/seo'
import GuideLink from '@/components/GuideLink'
import RelatedGames from '@/components/RelatedGames'
import GameSeoExtras from '@/components/GameSeoExtras'
import GameScreenshot from '@/components/GameScreenshot'
import GameDetails from '@/components/GameDetails'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Slime Simulator — Free Online Slime Game',
  description:
    'Stretch, poke and squish virtual slime online for free. Six slime types, ASMR squish sounds and soft-body physics — a satisfying stress relief break.',
  path: '/games/slime-simulator',
  keywords: ['slime simulator', 'virtual slime', 'squish slime', 'asmr slime game', 'stress relief game'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function SlimeSimulatorLayout({ children }: { children: React.ReactNode }) {
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
