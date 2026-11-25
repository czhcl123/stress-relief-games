export type GameKind = 'game' | 'tool'

export interface Game {
  href: string
  emoji: string
  title: string
  desc: string
  tags: string[]
  /** Games are interactive toys with a win/score loop; tools are calm utilities. */
  kind: GameKind
  /** Illustration/screenshot used on the page and as the guide hero. */
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  /** True only for real gameplay screenshots, not generated illustrations. */
  imageIsScreenshot: boolean
  /** 1200×630 image used for Open Graph / Article image. */
  ogImage: string
  /** 800×450 crop used on the homepage and /games cards. */
  thumb: string
  thumbWidth: number
  thumbHeight: number
  /** One-sentence description for llms.txt. */
  llmsDescription: string
  /** Optional — a card without a route yet renders a "Coming Soon" badge. */
  coming?: boolean
}

/**
 * Single source of truth for the game/tool list: the homepage grid, the /games
 * hub, the related block, the sitemap, llms.txt and the comparison table all
 * read from here, so the internal link mesh can never drift out of sync.
 */
export const games: Game[] = [
  {
    href: '/games/bubble-wrap',
    emoji: '🫧',
    title: 'Bubble Wrap Popper',
    desc: 'Pop virtual bubble wrap! Satisfying sounds, endless bubbles.',
    tags: ['satisfying', 'zen'],
    kind: 'game',
    image: '/images/games/bubble-wrap.webp',
    imageAlt: 'Bubble Wrap Popper screenshot — a grid of virtual bubble wrap with Zen and Speed modes',
    imageWidth: 1174,
    imageHeight: 727,
    imageIsScreenshot: true,
    ogImage: '/images/og/bubble-wrap.jpg',
    thumb: '/images/thumbs/bubble-wrap.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'Pop 192 virtual bubble wrap bubbles with satisfying popping sounds. Includes Zen mode and Speed mode.',
  },
  {
    href: '/games/slime-simulator',
    emoji: '🟢',
    title: 'Slime Simulator',
    desc: 'Stretch and poke colorful slime. ASMR sounds included.',
    tags: ['relaxing', 'asmr'],
    kind: 'game',
    image: '/images/games/slime-simulator.webp',
    imageAlt: 'Slime Simulator screenshot — a stretchy green slime blob with six color options',
    imageWidth: 1155,
    imageHeight: 738,
    imageIsScreenshot: true,
    ogImage: '/images/og/slime-simulator.jpg',
    thumb: '/images/thumbs/slime-simulator.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'Stretch, poke, and squish six types of virtual slime with 24-point soft-body physics and ASMR squish sounds.',
  },
  {
    href: '/games/zen-garden',
    emoji: '🪨',
    title: 'Zen Garden',
    desc: 'Arrange stones, rake sand, find your calm.',
    tags: ['calming', 'creative'],
    kind: 'game',
    image: '/images/games/zen-garden.webp',
    imageAlt: 'Zen Garden screenshot — raked sand with stones and plants in a virtual rock garden',
    imageWidth: 1147,
    imageHeight: 725,
    imageIsScreenshot: true,
    ogImage: '/images/og/zen-garden.jpg',
    thumb: '/images/thumbs/zen-garden.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'Arrange stones, rake sand, and place plants in a relaxing Japanese-style rock garden.',
  },
  {
    href: '/games/stress-ball',
    emoji: '🏀',
    title: 'Stress Relief Ball',
    desc: 'Squeeze and bounce a virtual stress ball.',
    tags: ['fidget', 'quick'],
    kind: 'game',
    image: '/images/games/stress-ball.webp',
    imageAlt: 'Stress Relief Ball screenshot — a tennis ball being thrown across a virtual room',
    imageWidth: 1137,
    imageHeight: 736,
    imageIsScreenshot: true,
    ogImage: '/images/og/stress-ball.jpg',
    thumb: '/images/thumbs/stress-ball.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'Squeeze, throw, and bounce a virtual stress ball. Six ball types with distinct bounce and squash physics.',
  },
  {
    href: '/games/fidget-spinner',
    emoji: '🔄',
    title: 'Fidget Spinner',
    desc: 'Flick a virtual fidget spinner and listen to the whirr. Real RPM readout.',
    tags: ['fidget', 'satisfying'],
    kind: 'game',
    image: '/images/games/fidget-spinner.webp',
    imageAlt: 'Fidget Spinner screenshot — a purple Ninja Star spinner with RPM and spin counters',
    imageWidth: 1133,
    imageHeight: 735,
    imageIsScreenshot: true,
    ogImage: '/images/og/fidget-spinner.jpg',
    thumb: '/images/thumbs/fidget-spinner.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'Flick a virtual fidget spinner with a real RPM readout — about 2,500 on a good flick. Six designs, variable friction, bearing hum that rises with RPM.',
  },
  {
    href: '/games/sand-cutting',
    emoji: '🏖️',
    title: 'Sand Cutting',
    desc: 'Slice and scoop kinetic sand with satisfying ASMR sounds.',
    tags: ['asmr', 'satisfying'],
    kind: 'game',
    image: '/images/games/sand-cutting.webp',
    imageAlt: 'Sand Cutting screenshot — carved kinetic sand with slice, scoop and smooth tools',
    imageWidth: 1135,
    imageHeight: 729,
    imageIsScreenshot: true,
    ogImage: '/images/og/sand-cutting.jpg',
    thumb: '/images/thumbs/sand-cutting.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'Slice, scoop, and smooth virtual kinetic sand. Six sand colors, three tools, crisp ASMR cutting sounds.',
  },
  {
    href: '/games/breathing',
    emoji: '🫁',
    title: 'Box Breathing',
    desc: 'Follow a 4-4-4-4 breathing circle. A quiet two-minute reset.',
    tags: ['calm', 'focus'],
    kind: 'tool',
    image: '/images/games/breathing.webp',
    imageAlt: 'Box Breathing illustration — a glowing circle expanding and contracting',
    imageWidth: 1200,
    imageHeight: 750,
    imageIsScreenshot: false,
    ogImage: '/og?title=Box%20Breathing&subtitle=Free%204-4-4-4%20breathing%20exercise',
    thumb: '/images/thumbs/breathing.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'A guided 4-4-4-4 box-breathing exercise with an animated circle, phase countdown and cycle counter. No signup, no audio.',
  },
  {
    href: '/games/rain-sounds',
    emoji: '🌧️',
    title: 'Rain Sounds',
    desc: 'Steady rain noise for focus, reading or winding down.',
    tags: ['focus', 'sleep'],
    kind: 'tool',
    image: '/images/games/rain-sounds.webp',
    imageAlt: 'Rain Sounds illustration — rain streaks on a dark window',
    imageWidth: 1200,
    imageHeight: 750,
    imageIsScreenshot: false,
    ogImage: '/og?title=Rain%20Sounds&subtitle=Free%20online%20rain%20noise',
    thumb: '/images/thumbs/rain-sounds.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'A browser rain-noise generator with light, medium and heavy intensity, volume and play/pause. Synthesised with the Web Audio API; no download.',
  },
  {
    href: '/games/lava-lamp',
    emoji: '🫧',
    title: 'Lava Lamp',
    desc: 'Slow, drifting colour blobs. Pick a palette and watch.',
    tags: ['visual', 'calm'],
    kind: 'tool',
    image: '/images/games/lava-lamp.webp',
    imageAlt: 'Lava Lamp illustration — soft violet and pink blobs drifting in a lamp',
    imageWidth: 1200,
    imageHeight: 750,
    imageIsScreenshot: false,
    ogImage: '/og?title=Lava%20Lamp&subtitle=Free%20online%20visual%20relaxation',
    thumb: '/images/thumbs/lava-lamp.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'A CSS-animated lava lamp with four palettes, adjustable speed and pause. No audio, no signup.',
  },
  {
    href: '/games/mandala',
    emoji: '🌀',
    title: 'Mandala Drawing',
    desc: 'Draw once; the pattern repeats in sixfold symmetry.',
    tags: ['creative', 'focus'],
    kind: 'tool',
    image: '/images/games/mandala.webp',
    imageAlt: 'Mandala Drawing illustration — a symmetrical violet mandala pattern',
    imageWidth: 1200,
    imageHeight: 750,
    imageIsScreenshot: false,
    ogImage: '/og?title=Mandala%20Drawing&subtitle=Free%20online%20symmetry%20art',
    thumb: '/images/thumbs/mandala.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'A canvas mandala drawing tool with sixfold symmetry, six colours, brush size, clear and PNG download. No signup.',
  },
  {
    href: '/games/worry-jar',
    emoji: '🫙',
    title: 'Worry Jar',
    desc: 'Write a worry, drop it in the jar, and let it go.',
    tags: ['calm', 'journal'],
    kind: 'tool',
    image: '/images/games/worry-jar.webp',
    imageAlt: 'Worry Jar illustration — a glass jar with folded paper slips',
    imageWidth: 1200,
    imageHeight: 750,
    imageIsScreenshot: false,
    ogImage: '/og?title=Worry%20Jar&subtitle=Free%20online%20letting-go%20exercise',
    thumb: '/images/thumbs/worry-jar.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'A private worry jar: type a worry, add it as a paper slip, then release all. Nothing is saved or sent; no account.',
  },
  {
    href: '/games/pop-it',
    emoji: '🟣',
    title: 'Pop It',
    desc: 'Pop and unpop a 6×6 silicone bubble grid.',
    tags: ['fidget', 'satisfying'],
    kind: 'tool',
    image: '/images/games/pop-it.webp',
    imageAlt: 'Pop It illustration — a colourful 6×6 pop-it grid with some bubbles pressed',
    imageWidth: 1200,
    imageHeight: 750,
    imageIsScreenshot: false,
    ogImage: '/og?title=Pop%20It&subtitle=Free%20online%20pop-it%20toy',
    thumb: '/images/thumbs/pop-it.webp',
    thumbWidth: 800,
    thumbHeight: 450,
    llmsDescription:
      'A 6×6 pop-it toy: tap to pop or unpop, with synthesised pops, a counter, colour themes and reset. No signup.',
  },
]
