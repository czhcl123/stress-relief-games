import type { Metadata } from 'next'

// Canonical site origin. Override with NEXT_PUBLIC_SITE_URL in the environment.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stress-relief-games.com'
).replace(/\/$/, '')

export const siteName = 'Stress Relief Games'

export const siteDescription =
  'Free online stress relief games: pop bubble wrap, stretch slime, spin a fidget spinner, rake a zen garden. Relaxing, satisfying, no signup.'

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

/**
 * Per-game structured data. `VideoGame` is a `SoftwareApplication` subclass,
 * so applicationCategory / operatingSystem / offers are all valid on it.
 * No aggregateRating: we have no real ratings, and inventing them is a
 * structured-data violation.
 */
export function gameJsonLd({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: title,
    description,
    url: `${siteUrl}${path}`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web browser',
    browserRequirements: 'Requires JavaScript',
    inLanguage: 'en',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
  }
}

/**
 * Metadata for a guide (blog) article.
 *
 * Unlike game pages this uses `title.absolute`, so the brand suffix is *not*
 * appended: guide titles already carry the long-tail keyword, and a 23-character
 * " | Stress Relief Games" tail would push most of them past 60 characters.
 */
export function articleMetadata({
  title,
  description,
  path,
  keywords,
  published,
  modified,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  published: string
  modified?: string
}): Metadata {
  const url = `${siteUrl}${path}`
  const image = { url: '/opengraph-image', width: 1200, height: 630, alt: title }

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url,
      siteName,
      title,
      description,
      publishedTime: published,
      modifiedTime: modified ?? published,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
  }
}

/**
 * Article structured data. The author is the same (real, named) entity the
 * /about page declares, and there is no `aggregateRating` or invented citation:
 * everything here is something the site can actually back up.
 */
export function articleJsonLd({
  title,
  description,
  path,
  published,
  modified,
  keywords,
}: {
  title: string
  description: string
  path: string
  published: string
  modified?: string
  keywords?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${siteUrl}${path}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}${path}` },
    datePublished: published,
    dateModified: modified ?? published,
    inLanguage: 'en',
    isAccessibleForFree: true,
    image: [`${siteUrl}/opengraph-image`],
    author: {
      '@type': 'Person',
      name: 'Stress Relief Games Team',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
  }
}
