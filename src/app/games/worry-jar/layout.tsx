import { gameJsonLd, gameMetadata } from '@/lib/seo'
import ToolLayout from '@/components/ToolLayout'

const seo = {
  title: 'Worry Jar — Free Online Letting-Go Exercise',
  description:
    'A private online worry jar: type a worry, add it as a paper slip, then release all. Nothing is saved or sent; free, no signup.',
  path: '/games/worry-jar',
  keywords: ['worry jar', 'letting go exercise', 'anxiety tool', 'expressive writing', 'calm down'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function WorryJarLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToolLayout seo={seo} jsonLd={jsonLd}>
      {children}
    </ToolLayout>
  )
}
