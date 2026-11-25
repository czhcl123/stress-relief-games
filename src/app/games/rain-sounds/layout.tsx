import { gameJsonLd, gameMetadata } from '@/lib/seo'
import ToolLayout from '@/components/ToolLayout'

const seo = {
  title: 'Rain Sounds — Free Online Rain Noise',
  description:
    'Free online rain sounds for focus, reading or winding down. Choose light, medium or heavy rain, adjust the volume, and play in your browser.',
  path: '/games/rain-sounds',
  keywords: ['rain sounds', 'rain noise', 'rain sounds for focus', 'white noise', 'sleep sounds'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function RainSoundsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToolLayout seo={seo} jsonLd={jsonLd}>
      {children}
    </ToolLayout>
  )
}
