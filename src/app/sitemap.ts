import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'
import { posts, postHref } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/about', priority: 0.5 },
    { path: '/blog', priority: 0.6 },
    // Guides come from the registry so the sitemap can never miss one.
    ...posts.map((post) => ({ path: postHref(post), priority: 0.7 })),
    { path: '/games/bubble-wrap', priority: 0.8 },
    { path: '/games/slime-simulator', priority: 0.8 },
    { path: '/games/zen-garden', priority: 0.8 },
    { path: '/games/stress-ball', priority: 0.8 },
    { path: '/games/fidget-spinner', priority: 0.8 },
    { path: '/games/sand-cutting', priority: 0.8 },
  ]

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route.priority,
  }))
}
