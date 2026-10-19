import { gameJsonLd, gameMetadata } from '@/lib/seo'
import RelatedGames from '@/components/RelatedGames'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Stress Relief Ball',
  description:
    'Squeeze, throw, and bounce a virtual stress ball online for free. Six ball types with realistic physics and squish — let it all out in a satisfying minute.',
  path: '/games/stress-ball',
  keywords: ['stress ball', 'virtual stress ball', 'squeeze ball game', 'fidget game', 'antistress game'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function StressBallLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedGames current={seo.path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
