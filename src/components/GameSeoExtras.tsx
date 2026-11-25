import { gameFaqs } from '@/lib/faqs'
import { games } from '@/lib/games'
import Breadcrumbs from '@/components/Breadcrumbs'

/**
 * Visible breadcrumbs + FAQPage JSON-LD for a game page. Both are derived from
 * the shared game registry and the FAQ copy in src/lib/faqs.ts.
 */
export default function GameSeoExtras({ gamePath }: { gamePath: string }) {
  const game = games.find((item) => item.href === gamePath)
  const faqs = gameFaqs[gamePath]

  if (!game) return null

  const faqJsonLd = faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      }
    : null

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Games & Tools', href: '/games' },
          { name: game.title, href: gamePath },
        ]}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  )
}
