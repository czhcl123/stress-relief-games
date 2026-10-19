export interface Game {
  href: string
  emoji: string
  title: string
  desc: string
  tags: string[]
  /** Optional — a card without a route yet renders a "Coming Soon" badge. */
  coming?: boolean
}

/**
 * Single source of truth for the game list: the homepage grid and the
 * "try another game" block on every game page both read from here, so the
 * internal link mesh can never drift out of sync with the cards.
 */
export const games: Game[] = [
  {
    href: '/games/bubble-wrap',
    emoji: '🫧',
    title: 'Bubble Wrap Popper',
    desc: 'Pop virtual bubble wrap! Satisfying sounds, endless bubbles.',
    tags: ['satisfying', 'zen'],
  },
  {
    href: '/games/slime-simulator',
    emoji: '🟢',
    title: 'Slime Simulator',
    desc: 'Stretch and poke colorful slime. ASMR sounds included.',
    tags: ['relaxing', 'asmr'],
  },
  {
    href: '/games/zen-garden',
    emoji: '🪨',
    title: 'Zen Garden',
    desc: 'Arrange stones, rake sand, find your calm.',
    tags: ['calming', 'creative'],
  },
  {
    href: '/games/stress-ball',
    emoji: '🏀',
    title: 'Stress Relief Ball',
    desc: 'Squeeze and bounce a virtual stress ball.',
    tags: ['fidget', 'quick'],
  },
  {
    href: '/games/fidget-spinner',
    emoji: '🔄',
    title: 'Fidget Spinner',
    desc: 'Flick a virtual fidget spinner and listen to the whirr. Realistic spin physics.',
    tags: ['fidget', 'satisfying'],
  },
  {
    href: '/games/sand-cutting',
    emoji: '🏖️',
    title: 'Sand Cutting',
    desc: 'Slice and scoop kinetic sand with satisfying ASMR sounds.',
    tags: ['asmr', 'satisfying'],
  },
]
