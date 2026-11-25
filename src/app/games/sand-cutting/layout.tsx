import { gameJsonLd, gameMetadata } from '@/lib/seo'
import GuideLink from '@/components/GuideLink'
import RelatedGames from '@/components/RelatedGames'
import GameSeoExtras from '@/components/GameSeoExtras'
import GameScreenshot from '@/components/GameScreenshot'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Sand Cutting Game — Free Online Kinetic Sand',
  description:
    'Cut, scoop and smooth virtual kinetic sand online for free. Crisp ASMR cutting sounds, six sand colors and three tools — no download, no signup.',
  path: '/games/sand-cutting',
  keywords: [
    'sand cutting',
    'kinetic sand',
    'sand cutting asmr',
    'virtual sand',
    'asmr game',
    'satisfying game',
  ],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function SandCuttingLayout({ children }: { children: React.ReactNode }) {
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
