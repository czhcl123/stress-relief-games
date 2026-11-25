export interface Game {
  href: string
  emoji: string
  title: string
  desc: string
  tags: string[]
  /** Screenshot used on the game page and as the guide hero. */
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  /** 1200×630 crop used for Open Graph / Article image. */
  ogImage: string
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
    image: '/images/games/bubble-wrap.webp',
    imageAlt: 'Bubble Wrap Popper screenshot — a grid of virtual bubble wrap with Zen and Speed modes',
    imageWidth: 1174,
    imageHeight: 727,
    ogImage: '/images/og/bubble-wrap.jpg',
  },
  {
    href: '/games/slime-simulator',
    emoji: '🟢',
    title: 'Slime Simulator',
    desc: 'Stretch and poke colorful slime. ASMR sounds included.',
    tags: ['relaxing', 'asmr'],
    image: '/images/games/slime-simulator.webp',
    imageAlt: 'Slime Simulator screenshot — a stretchy green slime blob with six color options',
    imageWidth: 1155,
    imageHeight: 738,
    ogImage: '/images/og/slime-simulator.jpg',
  },
  {
    href: '/games/zen-garden',
    emoji: '🪨',
    title: 'Zen Garden',
    desc: 'Arrange stones, rake sand, find your calm.',
    tags: ['calming', 'creative'],
    image: '/images/games/zen-garden.webp',
    imageAlt: 'Zen Garden screenshot — raked sand with stones and plants in a virtual rock garden',
    imageWidth: 1147,
    imageHeight: 725,
    ogImage: '/images/og/zen-garden.jpg',
  },
  {
    href: '/games/stress-ball',
    emoji: '🏀',
    title: 'Stress Relief Ball',
    desc: 'Squeeze and bounce a virtual stress ball.',
    tags: ['fidget', 'quick'],
    image: '/images/games/stress-ball.webp',
    imageAlt: 'Stress Relief Ball screenshot — a tennis ball being thrown across a virtual room',
    imageWidth: 1137,
    imageHeight: 736,
    ogImage: '/images/og/stress-ball.jpg',
  },
  {
    href: '/games/fidget-spinner',
    emoji: '🔄',
    title: 'Fidget Spinner',
    desc: 'Flick a virtual fidget spinner and listen to the whirr. Real RPM readout.',
    tags: ['fidget', 'satisfying'],
    image: '/images/games/fidget-spinner.webp',
    imageAlt: 'Fidget Spinner screenshot — a purple Ninja Star spinner with RPM and spin counters',
    imageWidth: 1133,
    imageHeight: 735,
    ogImage: '/images/og/fidget-spinner.jpg',
  },
  {
    href: '/games/sand-cutting',
    emoji: '🏖️',
    title: 'Sand Cutting',
    desc: 'Slice and scoop kinetic sand with satisfying ASMR sounds.',
    tags: ['asmr', 'satisfying'],
    image: '/images/games/sand-cutting.webp',
    imageAlt: 'Sand Cutting screenshot — carved kinetic sand with slice, scoop and smooth tools',
    imageWidth: 1135,
    imageHeight: 729,
    ogImage: '/images/og/sand-cutting.jpg',
  },
]
