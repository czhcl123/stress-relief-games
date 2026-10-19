import { gameJsonLd, gameMetadata } from '@/lib/seo'
import RelatedGames from '@/components/RelatedGames'

// One object feeds both the page metadata and the structured data, so the
// description can never drift between the two.
const seo = {
  title: 'Fidget Spinner',
  description:
    'A free virtual fidget spinner with realistic spin physics. Flick it, hold the center to slow it down, and enjoy six designs with a rising whirr.',
  path: '/games/fidget-spinner',
  keywords: [
    'fidget spinner',
    'virtual fidget spinner',
    'online fidget spinner',
    'fidget spinner game',
    'spinner game',
    'stress relief toy',
  ],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function FidgetSpinnerLayout({ children }: { children: React.ReactNode }) {
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
