import type { Metadata } from 'next'
import type { Collection } from '@/lib/collections'
import { games } from '@/lib/games'
import { authorName, authorUrl, ogUrl, siteName, siteUrl } from '@/lib/seo'

export function collectionMetadata(collection: Collection): Metadata {
  const url = `${siteUrl}/${collection.slug}`
  const image = {
    url: ogUrl(collection.title, 'Games and tools collection'),
    width: 1200,
    height: 630,
    alt: collection.title,
  }

  return {
    title: { absolute: collection.title },
    description: collection.description,
    alternates: { canonical: `/${collection.slug}` },
    openGraph: {
      type: 'website',
      url,
      siteName,
      title: collection.title,
      description: collection.description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: collection.title,
      description: collection.description,
      images: [image.url],
    },
  }
}

export function collectionJsonLd(collection: Collection) {
  const url = `${siteUrl}/${collection.slug}`
  const items = collection.items
    .map((href) => games.find((game) => game.href === href))
    .filter((game): game is NonNullable<typeof game> => Boolean(game))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: collection.title,
        description: collection.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        author: {
          '@type': 'Person',
          name: authorName,
          url: authorUrl,
        },
        dateModified: '2026-11-25',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: items.length,
          itemListElement: items.map((game, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: game.title,
            url: `${siteUrl}${game.href}`,
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: collection.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  }
}
