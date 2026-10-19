import { gameMetadata } from '@/lib/seo'

export const metadata = gameMetadata({
  title: 'Sand Cutting',
  description:
    'Cut, scoop and smooth virtual kinetic sand online. Crisp ASMR cutting sounds, six sand colors and three tools — free, no download, no signup.',
  path: '/games/sand-cutting',
  keywords: [
    'sand cutting',
    'kinetic sand',
    'sand cutting asmr',
    'virtual sand',
    'asmr game',
    'satisfying game',
  ],
})

export default function SandCuttingLayout({ children }: { children: React.ReactNode }) {
  return children
}
