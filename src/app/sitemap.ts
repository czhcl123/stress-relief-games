import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'
import { collections } from '@/lib/collections'
import { games } from '@/lib/games'
import { posts, postHref } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  // Only the build time is meaningful for pages that are regenerated wholesale
  // (home, about, the game pages); guides have a real publication date.
  const buildTime = new Date()

  const routes: {
    path: string
    priority: number
    lastModified?: string
    images?: string[]
  }[] = [
    {
      path: '/',
      priority: 1,
      images: games.map((game) => `${siteUrl}${game.thumb}`),
    },
    {
      path: '/games',
      priority: 0.9,
      images: games.map((game) => `${siteUrl}${game.thumb}`),
    },
    { path: '/embed', priority: 0.8 },
    { path: '/about', priority: 0.5 },
    { path: '/blog', priority: 0.6 },
    { path: '/authors/chen-lei', priority: 0.4 },
    { path: '/privacy', priority: 0.2 },
    { path: '/terms', priority: 0.2 },
    { path: '/disclaimer', priority: 0.2 },
    // Guides come from the registry so the sitemap can never miss one, and each
    // reports its own publish date rather than the build time — otherwise every
    // deploy claims all 15 URLs changed and Google learns to ignore lastmod.
    ...posts.map((post) => {
      const game = games.find((item) => item.href === post.game)
      return {
        path: postHref(post),
        priority: 0.7,
        // The visible "Evidence last checked" date and the Article JSON-LD both
        // use evidenceChecked; the sitemap must report the same date or Google
        // sees three different freshness signals for one page.
        lastModified: post.evidenceChecked,
        images: game ? [`${siteUrl}${game.image}`] : undefined,
      }
    }),
    ...games.map((game) => ({
      path: game.href,
      priority: 0.8,
      images: [`${siteUrl}${game.image}`],
    })),
    ...collections.map((collection) => ({
      path: `/${collection.slug}`,
      priority: 0.8,
      lastModified: '2026-11-25',
      images: collection.items
        .map((href) => games.find((game) => game.href === href))
        .filter((game): game is NonNullable<typeof game> => Boolean(game))
        .map((game) => `${siteUrl}${game.thumb}`),
    })),
  ]

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: route.lastModified ?? buildTime,
    changeFrequency: 'monthly',
    priority: route.priority,
    ...(route.images ? { images: route.images } : {}),
  }))
}
