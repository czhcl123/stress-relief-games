import { gameMetadata } from '@/lib/seo'

export const metadata = gameMetadata({
  title: 'Stress Relief Ball',
  description:
    'Squeeze, throw, and bounce a virtual stress ball online for free. Six ball types with realistic physics and squish — let it all out in a satisfying minute.',
  path: '/games/stress-ball',
  keywords: ['stress ball', 'virtual stress ball', 'squeeze ball game', 'fidget game', 'antistress game'],
})

export default function StressBallLayout({ children }: { children: React.ReactNode }) {
  return children
}
