import { gameMetadata } from '@/lib/seo'

export const metadata = gameMetadata({
  title: 'Bubble Wrap Popper',
  description:
    'Pop virtual bubble wrap online for free. Satisfying popping sounds, Zen and Speed modes, and 192 bubbles to pop through — no download, no signup.',
  path: '/games/bubble-wrap',
  keywords: ['bubble wrap game', 'pop bubble wrap', 'virtual bubble wrap', 'satisfying game', 'antistress'],
})

export default function BubbleWrapLayout({ children }: { children: React.ReactNode }) {
  return children
}
