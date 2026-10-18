import type { Metadata } from 'next'

// Canonical site origin. Override with NEXT_PUBLIC_SITE_URL in the environment.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stress-relief-games-production.up.railway.app'
).replace(/\/$/, '')

export const siteName = 'Stress Relief Games'

export const siteDescription =
  'Play free online stress relief games. Bubble wrap popping, slime simulator, zen garden, and stress balls — relaxing, satisfying games to help you unwind. No signup, no download.'

/**
 * Builds consistent per-game page metadata (title, description, canonical, Open Graph).
 * Titles are passed bare; the root layout's title template appends the site name.
 */
export function gameMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
}): Metadata {
  const url = `${siteUrl}${path}`
  const fullTitle = `${title} | ${siteName}`
  // The root-level file convention only covers the homepage, so declare the
  // shared Open Graph image explicitly for every game page.
  const image = {
    url: '/opengraph-image',
    width: 1200,
    height: 630,
    alt: `${title} — ${siteName}`,
  }

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url,
      siteName,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/opengraph-image'],
    },
  }
}
