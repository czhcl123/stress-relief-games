import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
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
