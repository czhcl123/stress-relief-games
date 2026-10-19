import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('what-is-a-zen-garden')
const keywords = [
  'what is a zen garden',
  'zen garden benefits',
  'japanese rock garden',
  'desk zen garden',
]

export const metadata: Metadata = articleMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  keywords,
  published: post.date,
})

const jsonLd = articleJsonLd({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  published: post.date,
  keywords,
})

const blocks: Block[] = [
  {
    t: 'p',
    text: 'A zen garden looks like decoration. A tray of sand, a few stones, a little rake. It is easy to walk past one in a gift shop and assume it is purely decorative — a miniature of something Japanese, sold to sit on a desk and gather dust.',
  },
  {
    t: 'p',
    text: 'It is not. A zen garden is a tool with a narrow, specific job, and the raking is the whole point.',
  },

  { t: 'h2', text: 'What a zen garden actually is' },
  {
    t: 'p',
    text: 'The Japanese term is **karesansui** — "dry landscape". These gardens developed in Japan during the Muromachi period, roughly the fourteenth to sixteenth centuries, and were built and maintained by Zen Buddhist temples. Instead of water, they use raked gravel or sand. Instead of islands, they use stones. A raked line stands in for a ripple; a cluster of rocks stands in for a mountain or a shoreline.',
  },
  {
    t: 'p',
    text: 'The most famous example is Ryōan-ji in Kyoto: a rectangle of raked gravel with fifteen stones arranged so that, from any single viewing position, at least one of them is hidden. Whether that was deliberate is debated, but the effect is not — the garden is designed to be studied rather than simply looked at.',
  },
  {
    t: 'p',
    text: 'The key detail for our purposes: these gardens were **maintained daily by the monks who used them**. The raking was not a chore that interrupted the practice. It was the practice.',
  },

  { t: 'h2', text: 'Why raking works' },
  { t: 'h3', text: 'It is low skill with immediate feedback' },
  {
    t: 'p',
    text: 'Almost everything difficult in your day requires judgement, memory or coordination. Raking requires one hand and a direction. You push, a line appears. There is no technique to get wrong, and the result is visible the instant you make it.',
  },
  { t: 'h3', text: 'It has no failure state' },
  {
    t: 'p',
    text: 'A wrong line is still a line. You can smooth it out and start again, and nobody will ever know. That is unusually rare: it is a task where the cost of doing it badly is zero, so the part of your brain that monitors for mistakes has nothing to watch.',
  },
  { t: 'h3', text: 'It ends' },
  {
    t: 'p',
    text: 'A garden is complete when the sand is raked. That gives you a stopping point, which matters more than people expect. A break that never ends turns into avoidance; a break with a finish line stays a break.',
  },
  {
    t: 'p',
    text: 'Put those three together and you get a task that absorbs attention without demanding anything — which is roughly the definition of a good mental microbreak.',
  },

  { t: 'h2', text: 'The desk version' },
  {
    t: 'p',
    text: 'Miniature sand gardens have been sold as desk objects since at least the 1990s, and they work on exactly the same principle at a much smaller scale: a shallow tray, fine sand, a plastic rake, three or four stones. They are popular for a reason — the effect survives the shrink.',
  },
  {
    t: 'p',
    text: 'The obvious problem is that sand on a desk eventually becomes sand in a keyboard. That is the gap a browser version fills: the same raked lines, none of the grit.',
  },

  { t: 'h2', text: 'How to use one in five minutes' },
  {
    t: 'ol',
    items: [
      'Start with a blank surface. Smooth the sand flat before you rake anything — the reset is part of the ritual.',
      'Rake one wide line across the whole tray. Do not plan it. Just notice the line appear.',
      'Parallel lines next, spaced by eye rather than by ruler. The small errors are what make it look hand-made.',
      'Add one stone and rake a ring around it. Watch how the rings change the way the straight lines read.',
      'Stop when the surface is covered. Do not keep going to make it perfect — that turns a break into a task.',
    ],
  },

  { t: 'h2', text: 'Three mistakes that kill the effect' },
  {
    t: 'ul',
    items: [
      '**Chasing a perfect pattern.** The moment you are trying to reproduce a specific design, you are working, not resting. Imperfect lines are the point.',
      '**Adding too many stones.** A crowded garden becomes a puzzle to solve. Three or four objects is plenty.',
      '**Taking a photo of it.** This is the quiet killer. Once the garden is content, you are performing rather than raking, and the attention goes back outward.',
    ],
  },

  { t: 'h2', text: 'What to look for in a virtual one' },
  {
    t: 'ul',
    items: [
      '**Multiple rake widths.** A single rake size makes every pattern look the same after a minute.',
      '**Stones you can place without rebuilding the whole garden.** If adding a rock resets your sand, you will stop adding rocks.',
      '**No timer and no score.** This is a calm-down tool; a countdown turns it into a challenge.',
      '**A reset that is instant.** You will want to start over more often than you expect.',
    ],
  },
  {
    t: 'p',
    text: 'The [Zen Garden](/games/zen-garden) on this site covers all four: three rake modes, movable stones and plants, and a smooth-sand reset that does not throw away the rest of the garden.',
  },

  { t: 'h2', text: 'It is not meditation' },
  {
    t: 'note',
    text: '**Honest limit:** raking a sand garden is a focusing task, not a meditation practice, and the two are not interchangeable. It gives your attention somewhere specific to go for a few minutes. If what you need is rest, sleep, or treatment for a health condition, a tray of sand will not provide it.',
  },
  {
    t: 'p',
    text: 'What it provides is a small, complete, controllable piece of the world — which is exactly what a stressful day tends to take away.',
  },
]

export default function Page() {
  return (
    <>
      <BlogArticle post={post} blocks={blocks} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
