import { gameJsonLd, gameMetadata } from '@/lib/seo'
import RelatedGames from '@/components/RelatedGames'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Slime Simulator',
  description:
    'Stretch, poke, and squish virtual slime online for free. Six slime types with ASMR squish sounds and realistic physics — a satisfying stress relief break.',
  path: '/games/slime-simulator',
  keywords: ['slime simulator', 'virtual slime', 'squish slime', 'asmr slime game', 'stress relief game'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function SlimeSimulatorLayout({ children }: { children: React.ReactNode }) {
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
