import { gameJsonLd, gameMetadata } from '@/lib/seo'
import GuideLink from '@/components/GuideLink'
import RelatedGames from '@/components/RelatedGames'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Zen Garden',
  description:
    'Rake sand and arrange stones in a free virtual Japanese rock garden. Three rake patterns, movable stones and plants for calm, meditative stress relief.',
  path: '/games/zen-garden',
  keywords: ['zen garden', 'virtual zen garden', 'japanese rock garden', 'sand raking game', 'relaxing game'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function ZenGardenLayout({ children }: { children: React.ReactNode }) {
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
