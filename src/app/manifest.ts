import type { MetadataRoute } from 'next'
import { siteDescription, siteName } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: 'Stress Relief',
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/logo-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
