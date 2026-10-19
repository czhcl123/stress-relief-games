import { gameJsonLd, gameMetadata } from '@/lib/seo'
import GuideLink from '@/components/GuideLink'
import RelatedGames from '@/components/RelatedGames'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Bubble Wrap Popper',
  description:
    'Pop virtual bubble wrap online for free. Satisfying popping sounds, Zen and Speed modes, and 192 bubbles to pop through — no download, no signup.',
  path: '/games/bubble-wrap',
  keywords: ['bubble wrap game', 'pop bubble wrap', 'virtual bubble wrap', 'satisfying game', 'antistress'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function BubbleWrapLayout({ children }: { children: React.ReactNode }) {
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
