import { gameJsonLd, gameMetadata } from '@/lib/seo'
import ToolLayout from '@/components/ToolLayout'

const seo = {
  title: 'Pop It — Free Online Pop It Toy',
  description:
    'Pop and unpop a free online 6×6 pop-it toy with synthesised sounds, colour themes, a counter and reset. No signup, no download.',
  path: '/games/pop-it',
  keywords: ['pop it', 'pop it game', 'pop it online', 'fidget toy', 'satisfying toy'],
}

export const metadata = gameMetadata(seo)

const jsonLd = gameJsonLd(seo)

export default function PopItLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToolLayout seo={seo} jsonLd={jsonLd}>
      {children}
    </ToolLayout>
  )
}
