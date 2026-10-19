import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('stress-ball-exercises')
const keywords = [
  'stress ball exercises',
  'how to use a stress ball',
  'stress ball benefits',
  'hand exercises for tension',
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
    text: 'A stress ball is not magic. Squeeze one as hard as you can for ten seconds straight and you will mostly give yourself a sore forearm and a raised shoulder — which is the opposite of what you were after.',
  },
  {
    t: 'p',
    text: 'Used properly, though, it is one of the most portable ways to discharge tension: no screen, no setup, and it fits in a pocket. The difference between "squeezing a ball" and "a stress ball exercise" is entirely in the **release**.',
  },

  { t: 'h2', text: 'Why squeezing works, and when it backfires' },
  {
    t: 'p',
    text: 'The useful pattern is a brief, firm contraction followed by a full, deliberate release. That is the same principle behind progressive muscle relaxation, a well-established technique in which you tense a muscle group for a few seconds and then let go, paying attention to the contrast. The relaxation comes from the letting go, not the gripping.',
  },
  {
    t: 'p',
    text: 'It backfires in two ways. First, if you squeeze continuously while already tense, you are just adding load to muscles that are already working. Second, if you squeeze at maximum effort, the effort itself becomes the stressor. Aim for about seventy percent — firm, controlled, sustainable.',
  },

  { t: 'h2', text: 'The seven exercises' },
  {
    t: 'ol',
    items: [
      '**The five-second squeeze.** Squeeze at about seventy percent for five seconds, then release completely for ten. Notice the difference in your fingers on the release. Repeat three times. This is the baseline exercise and the one to use when you only have thirty seconds.',
      '**Finger-by-finger press.** Rest the ball in your palm and press one finger into it at a time, three seconds each, starting with the index finger and finishing with the little finger. Then do the other hand. Good when your hands feel restless rather than tired.',
      '**The palm roll.** Roll the ball slowly between both palms for twenty seconds. The rolling is rhythmic and bilateral, which suits the kind of tension that comes with a racing mind more than a tight grip.',
      '**Thumb press.** Hold the ball in one hand and press your thumb into it for five seconds, then release for five. Repeat three times per hand. Useful if you have been typing and your thumb base feels tight.',
      '**Drop and catch.** Hold the ball at knee height and drop it, catching it on the bounce. Do ten. This adds a small hand-eye element, which is more absorbing than pure squeezing when you are bored rather than wound up.',
      '**Hand-to-hand pass.** Pass the ball from one hand to the other without looking at it, twenty passes. It is deliberately easy, and that is the point — it occupies your hands while your attention rests.',
      '**The exhale squeeze.** Squeeze only while you breathe out, and release fully as you breathe in. Five slow breaths. This is the one to use before a difficult conversation or a meeting, because it pairs the physical release with a slower breathing rhythm.',
    ],
  },

  { t: 'h2', text: 'Pick the right resistance' },
  {
    t: 'ul',
    items: [
      '**Softer ball:** better if your hands are sore, if you have arthritis or a previous injury, or if you are using it for longer sessions.',
      '**Firmer ball:** better for short, deliberate squeezes when the tension is in your forearms and shoulders.',
      '**Never maximum:** if you cannot hold the squeeze for five seconds without your hand shaking, the ball is too firm or you are pushing too hard.',
    ],
  },

  { t: 'h2', text: 'A two-minute routine' },
  {
    t: 'ol',
    items: [
      'Thirty seconds: five-second squeezes, three repetitions, dominant hand.',
      'Thirty seconds: the same on the other hand.',
      'Thirty seconds: palm roll, slow and even.',
      'Thirty seconds: five slow exhale squeezes, then put the ball down.',
    ],
  },
  {
    t: 'p',
    text: 'Two minutes is deliberate. Long enough to change something, short enough that you will actually do it between meetings instead of saving it for a day that never comes.',
  },

  { t: 'h2', text: 'Doing it without a ball' },
  {
    t: 'p',
    text: 'A physical ball is still the best version, because the resistance is real. When you do not have one — on a train, in a meeting, at a desk with nothing within reach — the [virtual stress ball](/games/stress-ball) covers the same movements: squeeze and release, bounce for rhythm, and switch between six ball types with different squish behaviour.',
  },
  {
    t: 'p',
    text: 'The bouncing is worth calling out separately. A steady bounce is rhythmic and predictable, and rhythm is one of the fastest ways to settle a restless body — which is why people bounce their leg in the first place.',
  },

  { t: 'h2', text: 'Stop if it hurts' },
  {
    t: 'note',
    text: '**Honest limit:** this is general movement advice, not medical advice. Stop if you feel sharp pain, numbness, tingling or weakness in your hand or wrist, and do not use a stress ball to work through repetitive strain. If hand pain is persistent, see a clinician — squeezing harder is not a treatment.',
  },
  {
    t: 'p',
    text: 'Used for two minutes at seventy percent, a stress ball is a small, reliable reset. Used as a grip contest, it is just another thing to strain against.',
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
