import { gameJsonLd, gameMetadata } from '@/lib/seo'
import ToolLayout from '@/components/ToolLayout'

const seo = {
  title: 'Box Breathing — Free 4-4-4-4 Breathing Exercise',
  description:
    'A free 4-4-4-4 box breathing exercise with an animated circle, phase countdown and cycle counter. No signup, no download, no audio.',
  path: '/games/breathing',
  keywords: ['box breathing', '4-4-4-4 breathing', 'breathing exercise', 'calm down', 'stress relief'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function BreathingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToolLayout seo={seo} jsonLd={jsonLd}>
      {children}
    </ToolLayout>
  )
}
