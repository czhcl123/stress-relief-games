import { gameJsonLd, gameMetadata } from '@/lib/seo'
import ToolLayout from '@/components/ToolLayout'

const seo = {
  title: 'Lava Lamp — Free Online Visual Relaxation',
  description:
    'A free online lava lamp with four palettes, adjustable speed and pause. A slow visual break for your desk; no signup, no download, no audio.',
  path: '/games/lava-lamp',
  keywords: ['lava lamp', 'online lava lamp', 'visual relaxation', 'calming visuals', 'desk break'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function LavaLampLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToolLayout seo={seo} jsonLd={jsonLd}>
      {children}
    </ToolLayout>
  )
}
