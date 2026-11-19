import { gameJsonLd, gameMetadata } from '@/lib/seo'
import GuideLink from '@/components/GuideLink'
import RelatedGames from '@/components/RelatedGames'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Bubble Wrap Popper',
  description:
    'The bubble wrap popper game — pop virtual bubble wrap online for free. Satisfying sounds, Zen and Speed modes, 192 bubbles. No download, no signup.',
  path: '/games/bubble-wrap',
  keywords: ['bubble wrap popper', 'bubble wrap game', 'pop bubble wrap', 'virtual bubble wrap', 'satisfying game', 'antistress'],
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
