import { gameMetadata } from '@/lib/seo'

export const metadata = gameMetadata({
  title: 'Slime Simulator',
  description:
    'Stretch, poke, and squish virtual slime online for free. Six slime types with ASMR squish sounds and realistic physics — a satisfying stress relief break.',
  path: '/games/slime-simulator',
  keywords: ['slime simulator', 'virtual slime', 'squish slime', 'asmr slime game', 'stress relief game'],
})

export default function SlimeSimulatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
