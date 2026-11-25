import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('best-free-stress-relief-games')
const keywords = [
  'best free stress relief games',
  'free online stress relief games',
  'relaxing browser games',
  'quick stress relief',
]

export const metadata: Metadata = articleMetadata({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  keywords,
  published: post.date,
  modified: post.evidenceChecked,
})

const jsonLd = articleJsonLd({
  title: post.title,
  description: post.description,
  path: `/blog/${post.slug}`,
  published: post.date,
  modified: post.evidenceChecked,
  keywords,
})

const blocks: Block[] = [
  {
    t: 'p',
    text: 'The best free stress relief game is not a title; it is a fit. A game that calms one person can irritate another, and the same game can be perfect at 3pm and useless at 11pm. The useful question is not “which is best?” but “which one will I actually use for two minutes?”',
  },
  {
    t: 'p',
    text: 'This shortlist is built around that question. Every pick is free, needs no signup, and has a clear stopping point. None of them is a treatment for stress or anxiety; they are short, low-stakes breaks.',
  },

  { t: 'h2', text: 'How we picked' },
  {
    t: 'p',
    text: 'We compared the 12 games and tools on this site against five criteria:',
  },
  {
    t: 'ul',
    items: [
      '**Free and no signup.** No account, no download, no paywall.',
      '**Short session.** One to five minutes is enough to get the effect.',
      '**A clear stopping point.** A sheet runs out, a timer ends, a page closes. A feed never does.',
      '**Honest claims.** No “cures anxiety” language; the evidence is described as indirect where it is indirect.',
      '**Low friction.** No autoplay, no ad wall, no five-step setup.',
    ],
  },

  { t: 'h2', text: 'The shortlist' },
  { t: 'h3', text: 'Best for restless hands: Bubble Wrap Popper or Pop It' },
  {
    t: 'p',
    text: 'If your hands want something to do, start with [Bubble Wrap Popper](/games/bubble-wrap). It is a 192-bubble sheet with Zen and Speed modes, and the sheet runs out — which is the point. [Pop It](/games/pop-it) is the same idea in a 6×6 silicone-style grid you can pop and unpop. Both are in the [bubble wrap games collection](/bubble-wrap-games).',
  },
  { t: 'h3', text: 'Best for slow texture: Slime Simulator or Sand Cutting' },
  {
    t: 'p',
    text: 'If you want slow, tactile input rather than fast tapping, try [Slime Simulator](/games/slime-simulator) or [Sand Cutting](/games/sand-cutting). Slime stretches and squishes; sand holds a cut edge and gives a crisp sound. Both are in the [slime and kinetic sand collection](/slime-and-kinetic-sand-games).',
  },
  { t: 'h3', text: 'Best for quiet visual: Zen Garden or Lava Lamp' },
  {
    t: 'p',
    text: 'If you want to look at something rather than touch it, [Zen Garden](/games/zen-garden) gives you raked sand and stones; [Lava Lamp](/games/lava-lamp) gives you slow drifting colour. Both are silent. They are in the [zen games collection](/zen-games).',
  },
  { t: 'h3', text: 'Best for a quick physical reset: Stress Relief Ball or Fidget Spinner' },
  {
    t: 'p',
    text: 'If you feel physically wound up, [Stress Relief Ball](/games/stress-ball) gives you a squeeze, throw and bounce. [Fidget Spinner](/games/fidget-spinner) gives you rhythmic motion and an RPM readout. Both are in the [fidget games collection](/fidget-games).',
  },
  { t: 'h3', text: 'Best for breathing: Box Breathing' },
  {
    t: 'p',
    text: 'If you want to slow down before a task, [Box Breathing](/games/breathing) walks you through a 4-4-4-4 cycle with an animated circle and a countdown. It is silent and needs no account.',
  },
  { t: 'h3', text: 'Best for sound: Rain Sounds' },
  {
    t: 'p',
    text: 'If you want a steady background texture, [Rain Sounds](/games/rain-sounds) synthesises light, medium or heavy rain with a volume control. It is not a recording, and it has no sleep timer.',
  },
  { t: 'h3', text: 'Best for a worry: Worry Jar' },
  {
    t: 'p',
    text: 'If your mind is circling, [Worry Jar](/games/worry-jar) lets you type a worry, drop it in a jar and release it. Nothing is saved or sent; refreshing clears the jar.',
  },
  { t: 'h3', text: 'Best for making something: Mandala Drawing' },
  {
    t: 'p',
    text: 'If you want a creative task, [Mandala Drawing](/games/mandala) repeats every stroke in sixfold symmetry and lets you download the result as a PNG. It is quiet, low-stakes and easy to stop.',
  },

  { t: 'h2', text: 'What we left out' },
  {
    t: 'p',
    text: 'We left out games that autoplay sound, require an account, hide the game behind an ad, or never end. We also left out anything that claims to treat a health condition. A browser game can be a good break; it is not a clinician.',
  },

  { t: 'h2', text: 'How to choose in 30 seconds' },
  {
    t: 'ul',
    items: [
      '**Restless hands:** Bubble Wrap Popper or Pop It.',
      '**Wound up:** Box Breathing or Stress Relief Ball.',
      '**Racing thoughts:** Worry Jar.',
      '**Need texture:** Slime Simulator or Sand Cutting.',
      '**Need quiet:** Zen Garden or Lava Lamp.',
      '**Need sound:** Rain Sounds.',
    ],
  },

  { t: 'h2', text: 'What these games are not' },
  {
    t: 'note',
    text: '**Honest limit:** none of these games treats anxiety, depression or a stress-related health condition. They are short breaks. If stress is persistent, affecting your sleep or work, or keeping you from functioning, talk to a doctor or therapist.',
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
