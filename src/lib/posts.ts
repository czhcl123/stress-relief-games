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
  /** Reading time shown on the index and the article header. */
  minutes: number
  /** The game this guide is paired with — drives the CTA and the cross-links. */
  game: string
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
    title: 'Does Popping Bubble Wrap Actually Relieve Stress?',
    description:
      'Popping bubble wrap really does take the edge off. Here is why the pop feels so good, and how to get the same effect online in about two minutes.',
    date: '2026-10-19',
    minutes: 6,
    game: '/games/bubble-wrap',
    tags: ['stress', 'satisfying', 'science'],
  },
  {
    slug: 'why-is-slime-calming',
    title: 'Why Is Slime So Calming? The Science of Slime',
    description:
      'Slime is one of the most satisfying textures there is. Here is what makes it calming, and how to get the effect without the sticky mess.',
    date: '2026-10-19',
    minutes: 5,
    game: '/games/slime-simulator',
    tags: ['anxiety', 'asmr', 'tactile'],
  },
  {
    slug: 'what-is-a-zen-garden',
    title: 'What Is a Zen Garden? And Why It Calms You Down',
    description:
      'A zen garden is a small raked sand garden used for quiet focus. Here is what it is, why raking works, and how to use one at your desk in five minutes.',
    date: '2026-10-19',
    minutes: 6,
    game: '/games/zen-garden',
    tags: ['calm', 'focus', 'design'],
  },
  {
    slug: 'stress-ball-exercises',
    title: '7 Stress Ball Exercises to Release Tension Fast',
    description:
      'Seven quick stress ball exercises you can do anywhere, matched to the tension you are actually feeling, plus how to do them virtually.',
    date: '2026-10-19',
    minutes: 5,
    game: '/games/stress-ball',
    tags: ['tension', 'hands', 'routine'],
  },
  {
    slug: 'do-fidget-spinners-help-focus',
    title: 'Do Fidget Spinners Help You Focus? The Evidence',
    description:
      'Fidget spinners are popular focus tools, but the evidence is mixed. Here is what research suggests, and who they tend to help most.',
    date: '2026-10-19',
    minutes: 6,
    game: '/games/fidget-spinner',
    tags: ['focus', 'adhd', 'evidence'],
  },
  {
    slug: 'why-is-cutting-kinetic-sand-satisfying',
    title: 'Why Is Cutting Kinetic Sand So Satisfying?',
    description:
      'Cutting kinetic sand is one of the most satisfying sensations there is. Here is why it feels so good, and how to try it instantly in your browser.',
    date: '2026-10-19',
    minutes: 5,
    game: '/games/sand-cutting',
    tags: ['asmr', 'satisfying', 'tactile'],
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
