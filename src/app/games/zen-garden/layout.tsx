import { gameMetadata } from '@/lib/seo'

export const metadata = gameMetadata({
  title: 'Zen Garden',
  description:
    'Rake sand and arrange stones in a free virtual Japanese rock garden. Three rake patterns, movable stones and plants — a calm space for meditation and stress relief.',
  path: '/games/zen-garden',
  keywords: ['zen garden', 'virtual zen garden', 'japanese rock garden', 'sand raking game', 'relaxing game'],
})

export default function ZenGardenLayout({ children }: { children: React.ReactNode }) {
  return children
}
