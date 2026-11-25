import { gameJsonLd, gameMetadata } from '@/lib/seo'
import ToolLayout from '@/components/ToolLayout'

const seo = {
  title: 'Mandala Drawing — Free Online Symmetry Art',
  description:
    'Draw a mandala online with sixfold symmetry, six colours, brush sizes and PNG download. A free, quiet creative break in your browser.',
  path: '/games/mandala',
  keywords: ['mandala drawing', 'online mandala', 'symmetry drawing', 'art therapy', 'creative break'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function MandalaLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToolLayout seo={seo} jsonLd={jsonLd}>
      {children}
    </ToolLayout>
  )
}
