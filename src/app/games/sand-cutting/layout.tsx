import { gameJsonLd, gameMetadata } from '@/lib/seo'
import GuideLink from '@/components/GuideLink'
import RelatedGames from '@/components/RelatedGames'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Sand Cutting',
  description:
    'Cut, scoop and smooth virtual kinetic sand online. Crisp ASMR cutting sounds, six sand colors and three tools — free, no download, no signup.',
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
      {children}
      <GuideLink gameHref={seo.path} />
      <RelatedGames current={seo.path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
