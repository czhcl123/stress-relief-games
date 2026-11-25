import type { ReactNode } from 'react'
import GameSeoExtras from '@/components/GameSeoExtras'
import GameScreenshot from '@/components/GameScreenshot'
import GameDetails from '@/components/GameDetails'
import GuideLink from '@/components/GuideLink'
import RelatedGames from '@/components/RelatedGames'

/**
 * Shared chrome for the calm tools: breadcrumbs/FAQ schema, the illustration,
 * first-hand build notes, related items and the WebApplication JSON-LD.
 */
export default function ToolLayout({
  seo,
  jsonLd,
  children,
}: {
  seo: { title: string; description: string; path: string; keywords?: string[] }
  jsonLd: object
  children: ReactNode
}) {
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
