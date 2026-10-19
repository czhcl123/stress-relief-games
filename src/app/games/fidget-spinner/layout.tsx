import { gameMetadata } from '@/lib/seo'

export const metadata = gameMetadata({
  title: 'Fidget Spinner',
  description:
    'A free virtual fidget spinner with realistic spin physics. Flick it, hold the center to slow it down, and enjoy six designs with a rising whirr.',
  path: '/games/fidget-spinner',
  keywords: [
    'fidget spinner',
    'virtual fidget spinner',
    'online fidget spinner',
    'fidget spinner game',
    'spinner game',
    'stress relief toy',
  ],
})

export default function FidgetSpinnerLayout({ children }: { children: React.ReactNode }) {
  return children
}
