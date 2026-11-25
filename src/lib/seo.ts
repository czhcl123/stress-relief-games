import type { Metadata } from 'next'
import { games } from '@/lib/games'
import { guideExtras } from '@/lib/guideExtras'
import { posts } from '@/lib/posts'

// Canonical site origin. Override with NEXT_PUBLIC_SITE_URL in the environment.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stress-relief-games.com'
).replace(/\/$/, '')

export const siteName = 'Stress Relief Games'

export const siteDescription =
  'Free online stress relief games: pop bubble wrap, stretch slime, spin a fidget spinner, rake a zen garden. Relaxing, satisfying, no signup.'

/**
 * The real, named author behind the site. Keeping this in one place means the
 * byline, the Article JSON-LD, the About page and the author page cannot drift.
 * No credentials are invented: "programming enthusiast" is what the author
 * supplied, and the bio sticks to what the site actually does.
 */
export const authorName = 'Chen Lei'
export const authorRole = 'Independent developer & programming enthusiast'
export const authorUrl = `${siteUrl}/authors/chen-lei`
export const authorBio =
  'Chen Lei is an independent developer and programming enthusiast who builds small, focused browser games. He created Stress Relief Games and writes its guides, checking each claim against the cited research.'

/** Per-page OG image, generated at request time from the page title. */
export function ogUrl(title: string, subtitle: string) {
  return `${siteUrl}/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`
}

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
  const game = games.find((item) => item.href === path)
  const image = game
    ? {
        url: game.ogImage,
        width: 1200,
        height: 630,
        alt: game.imageAlt,
      }
    : {
        url: ogUrl(title, 'Free online game — no signup, no download'),
        width: 1200,
        height: 630,
        alt: `${title} — ${siteName}`,
      }

  return {
    // Game titles already carry the query modifiers; appending the 22-character
    // brand suffix would push most of them past the SERP truncation point.
    title: { absolute: title },
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
      images: [image.url],
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
  const game = games.find((item) => item.href === path)
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: title,
    description,
    url: `${siteUrl}${path}`,
    ...(game ? { screenshot: `${siteUrl}${game.image}` } : {}),
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
      '@id': `${siteUrl}/#organization`,
    },
    genre: ['Casual', 'Simulation'],
    gamePlatform: 'Web browser',
    playMode: 'SinglePlayer',
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
  const post = posts.find((item) => `/blog/${item.slug}` === path)
  const game = post ? games.find((item) => item.href === post.game) : undefined
  const image = game
    ? {
        url: game.ogImage,
        width: 1200,
        height: 630,
        alt: game.imageAlt,
      }
    : {
        url: ogUrl(title, 'Evidence-aware guide — Stress Relief Games'),
        width: 1200,
        height: 630,
        alt: title,
      }

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
      authors: [authorName],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
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
  const post = posts.find((item) => `/blog/${item.slug}` === path)
  const game = post ? games.find((item) => item.href === post.game) : undefined
  const extra = post ? guideExtras[post.slug] : undefined
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
    image: [
      game
        ? `${siteUrl}${game.ogImage}`
        : ogUrl(title, 'Evidence-aware guide — Stress Relief Games'),
    ],
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
      sameAs: ['https://github.com/czhcl123'],
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    ...(extra ? { citation: extra.references.map((ref) => ref.url) } : {}),
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
  }
}
