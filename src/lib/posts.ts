/**
 * Single source of truth for the guide (blog) section.
 *
 * The index page, the sitemap, llms.txt, the "read the guide" banner on each
 * game page and the related-guide lists all read from here, so a guide can
 * never be half-wired into the site.
 *
 * Each guide deliberately targets an *informational* query ("does popping
 * bubble wrap relieve stress"), while its game page targets the navigational
 * one ("bubble wrap game"). That keeps the two pages from competing for the
 * same search intent.
 */
export interface Post {
  slug: string
  /** Used as both the H1 and the <title>; kept under 60 characters. */
  title: string
  /** Kept under 155 characters. */
  description: string
  /** ISO publication date. */
  date: string
  /** ISO date the research claims in this guide were last checked against sources. */
  evidenceChecked: string
  /** Reading time shown on the index and the article header. */
  minutes: number
  /** Optional game this guide is paired with — drives the hero, embed and CTA. */
  game?: string
  tags: string[]
}

/**
 * A tiny, deliberately boring article model. The bodies are author-written
 * strings, so all they need is headings, paragraphs, lists and a callout.
 * Inline `[links](/path)` and `**bold**` are supported by the renderer.
 */
export type Block =
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'note'; text: string }

export const posts: Post[] = [
  {
    slug: 'does-popping-bubble-wrap-relieve-stress',
    title: 'Does Popping Bubble Wrap Relieve Stress? The Evidence',
    description:
      'Popping bubble wrap takes the edge off for many people. What the research does and does not show — and how to get the same effect online in two minutes.',
    date: '2026-10-19',
    evidenceChecked: '2026-11-19',
    minutes: 6,
    game: '/games/bubble-wrap',
    tags: ['stress', 'satisfying', 'science'],
  },
  {
    slug: 'why-is-slime-calming',
    title: 'Why Is Slime Calming? The Science of Slime & Anxiety',
    description:
      'Slime is one of the most satisfying textures there is. What makes it calming, what the evidence says about anxiety, and how to try it without the mess.',
    date: '2026-10-19',
    evidenceChecked: '2026-11-19',
    minutes: 5,
    game: '/games/slime-simulator',
    tags: ['anxiety', 'asmr', 'tactile'],
  },
  {
    slug: 'what-is-a-zen-garden',
    title: 'What Is a Zen Garden? Benefits, Meaning & How to Use One',
    description:
      'A zen garden is a small raked sand garden used for quiet focus. What it means, why raking works, and how to use one at your desk in five minutes.',
    date: '2026-10-19',
    evidenceChecked: '2026-11-19',
    minutes: 6,
    game: '/games/zen-garden',
    tags: ['calm', 'focus', 'design'],
  },
  {
    slug: 'stress-ball-exercises',
    title: 'Stress Ball Exercises: 7 Moves + 2-Minute Routine',
    description:
      '7 stress ball exercises ranked by tension type — squeeze, roll, drop, pass — with a 2-minute routine and an honest "stop if it hurts" limit.',
    date: '2026-10-19',
    evidenceChecked: '2026-11-19',
    minutes: 5,
    game: '/games/stress-ball',
    tags: ['tension', 'hands', 'routine'],
  },
  {
    slug: 'do-fidget-spinners-help-focus',
    title: 'Do Fidget Spinners Help Focus? The Evidence',
    description:
      'Fidget spinners are popular focus tools, but the evidence is mixed. Here is what research suggests, and who they tend to help most.',
    date: '2026-10-19',
    evidenceChecked: '2026-11-19',
    minutes: 6,
    game: '/games/fidget-spinner',
    tags: ['focus', 'adhd', 'evidence'],
  },
  {
    slug: 'why-is-cutting-kinetic-sand-satisfying',
    title: 'Why Is Cutting Kinetic Sand So Satisfying? Science + ASMR',
    description:
      'Cutting kinetic sand is one of the most satisfying sensations there is. Here is why it feels so good, and how to try it instantly in your browser.',
    date: '2026-10-19',
    evidenceChecked: '2026-11-19',
    minutes: 5,
    game: '/games/sand-cutting',
    tags: ['asmr', 'satisfying', 'tactile'],
  },
  {
    slug: 'best-free-stress-relief-games',
    title: 'Best Free Stress Relief Games (2026)',
    description:
      'The best free stress relief games and tools to try in 2026 — picked for quick breaks, honest claims and no signup.',
    date: '2026-11-25',
    evidenceChecked: '2026-11-25',
    minutes: 7,
    tags: ['roundup', 'stress', 'games'],
  },
  {
    slug: 'bubble-wrap-vs-fidget-spinner-vs-stress-ball',
    title: 'Bubble Wrap vs Fidget Spinner vs Stress Ball',
    description:
      'Bubble wrap, fidget spinners and stress balls all promise calm. A practical comparison of what each is good for, and what the evidence says.',
    date: '2026-11-25',
    evidenceChecked: '2026-11-25',
    minutes: 6,
    game: '/games/bubble-wrap',
    tags: ['comparison', 'fidget', 'stress'],
  },
  {
    slug: 'how-to-take-a-micro-break',
    title: 'How to Take a Micro-Break: The 2-Minute Routine',
    description:
      'A practical two-minute micro-break routine: what to do, how long to take, and why a clear stopping point matters more than the activity.',
    date: '2026-11-25',
    evidenceChecked: '2026-11-25',
    minutes: 5,
    tags: ['breaks', 'work', 'focus'],
  },
  {
    slug: 'why-do-we-fidget',
    title: 'Why Do We Fidget? A Short Explainer',
    description:
      'Fidgeting is not just restlessness. What the research says about movement, attention, and why some people focus better with something in their hands.',
    date: '2026-11-25',
    evidenceChecked: '2026-11-25',
    minutes: 5,
    game: '/games/fidget-spinner',
    tags: ['fidget', 'adhd', 'focus'],
  },
  {
    slug: 'kinetic-sand-vs-slime',
    title: 'Kinetic Sand vs Slime: Which Texture Is More Satisfying?',
    description:
      'Kinetic sand holds a cut edge; slime stretches and squishes. A practical comparison of the two textures, the sounds, and who each one suits.',
    date: '2026-11-25',
    evidenceChecked: '2026-11-25',
    minutes: 5,
    game: '/games/sand-cutting',
    tags: ['texture', 'asmr', 'comparison'],
  },
  {
    slug: 'stress-relief-games-for-adhd',
    title: 'Stress Relief Games for ADHD: What the Evidence Says',
    description:
      'Do fidget toys and stress relief games help ADHD? What the research actually shows, what it does not, and how to test a tool for yourself.',
    date: '2026-11-25',
    evidenceChecked: '2026-11-25',
    minutes: 6,
    game: '/games/fidget-spinner',
    tags: ['adhd', 'evidence', 'fidget'],
  },
]

export function postHref(post: Post): string {
  return `/blog/${post.slug}`
}

/** Throws on an unknown slug so a typo fails the build instead of shipping a blank page. */
export function getPost(slug: string): Post {
  const post = posts.find((p) => p.slug === slug)
  if (!post) throw new Error(`Unknown guide slug: ${slug}`)
  return post
}

export function postForGame(gameHref: string): Post | undefined {
  return posts.find((p) => p.game === gameHref)
}
