import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'
import { posts, postHref } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  // Only the build time is meaningful for pages that are regenerated wholesale
  // (home, about, the game pages); guides have a real publication date.
  const buildTime = new Date()

  const routes: { path: string; priority: number; lastModified?: string }[] = [
    { path: '/', priority: 1 },
    { path: '/games', priority: 0.9 },
    { path: '/about', priority: 0.5 },
    { path: '/blog', priority: 0.6 },
    // Guides come from the registry so the sitemap can never miss one, and each
    // reports its own publish date rather than the build time — otherwise every
    // deploy claims all 15 URLs changed and Google learns to ignore lastmod.
    ...posts.map((post) => ({
      path: postHref(post),
      priority: 0.7,
      lastModified: post.date,
    })),
    { path: '/games/bubble-wrap', priority: 0.8 },
    { path: '/games/slime-simulator', priority: 0.8 },
    { path: '/games/zen-garden', priority: 0.8 },
    { path: '/games/stress-ball', priority: 0.8 },
    { path: '/games/fidget-spinner', priority: 0.8 },
    { path: '/games/sand-cutting', priority: 0.8 },
  ]

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: route.lastModified ?? buildTime,
    changeFrequency: 'monthly',
    priority: route.priority,
  }))
}
