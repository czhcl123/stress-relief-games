import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('why-is-cutting-kinetic-sand-satisfying')
const keywords = [
  'why is cutting kinetic sand satisfying',
  'kinetic sand asmr',
  'kinetic sand benefits',
  'satisfying sand cutting',
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
    text: 'Kinetic sand looks like a magic trick the first time you touch it. It pours, but slowly. It holds a cut edge instead of collapsing. You can press a shape into it and the shape stays.',
  },
  {
    t: 'p',
    text: 'The recipe is not magic at all: it is sand with a small amount of a polymer binder — usually a silicone-based oil — that makes the grains stick to each other just enough to behave like a very slow liquid. Change that one ingredient and you get a material that is genuinely satisfying to cut.',
  },

  { t: 'h2', text: 'What makes it different from beach sand' },
  {
    t: 'p',
    text: 'Beach sand is loose. It falls through your fingers, it does not hold a shape, and if you drag a finger through it, the groove fills back in immediately. Dry sand is a pile; wet sand is a mould.',
  },
  {
    t: 'p',
    text: 'Kinetic sand sits between the two. The binder gives the grains a weak bond, so the material flows under pressure but stays put when the pressure stops. That single property is what makes the cut possible: a line you draw stays a line.',
  },

  { t: 'h2', text: 'Why the cut is the satisfying part' },
  { t: 'h3', text: 'Three signals arrive at once' },
  {
    t: 'p',
    text: 'When you drag a tool through a smooth surface, you get a visual change, a tactile change and an auditory change in the same instant, all caused by the same movement. That alignment is rare. Most things you do during a workday produce feedback in one channel, late, and ambiguously — you send an email and find out next week whether it was the right one.',
  },
  { t: 'h3', text: 'The surface remembers what you did' },
  {
    t: 'p',
    text: 'A cut groove is permanent until you deliberately smooth it. That is a small but real thing: you changed the world in a way that is visible, not imagined. In a day of documents and messages, that is surprisingly rare.',
  },
  { t: 'h3', text: 'It is a clean line, not a mess' },
  {
    t: 'p',
    text: 'There is a specific pleasure in a crisp edge appearing through a uniform surface — the same pleasure as cutting a cake, scoring card, or peeling a screen protector. The sand version gives it to you over and over, and an imperfect line can be smoothed away in a second.',
  },

  { t: 'h2', text: 'The ASMR piece' },
  {
    t: 'p',
    text: 'Cutting sand produces a close, dry, low-volume crunch — the kind of sound that ASMR videos are built around. Many people report a tingling, relaxing response to sounds like this, and the effect is real for them. Research on ASMR is still early and relies heavily on self-report, so it is fair to say "a lot of people find this pleasant" and not much more than that.',
  },
  {
    t: 'note',
    text: '**Honest limit:** ASMR responses vary enormously. Some people find these sounds deeply relaxing; others find them irritating or simply neutral. If the sound does nothing for you, the visual and tactile parts still work — but there is no reason to force it.',
  },

  { t: 'h2', text: 'Why it is easier to stop than most fidgets' },
  {
    t: 'p',
    text: 'This is the underrated part. Most digital fidgets are endless, which is exactly why they eat time. Kinetic sand is self-limiting: every cut changes the surface, and eventually the surface is "done". There is no score to beat and no level to finish — you stop because the sand looks finished.',
  },
  {
    t: 'p',
    text: 'A natural stopping point is worth a lot in a break. It is the difference between five minutes away from your work and forty minutes gone.',
  },

  { t: 'h2', text: 'Three ways to use it' },
  {
    t: 'ul',
    items: [
      '**Slice.** Drag a blade in a straight line and keep the lines parallel. Best when you want rhythm and a clear visual result.',
      '**Scoop.** Dig a hollow with a rounded tool and watch the edges pile up. Best when you are irritated and want to move something with force.',
      '**Smooth.** Flatten the whole surface back to blank. Best as the ending — it gives the session a deliberate close instead of just stopping.',
    ],
  },

  { t: 'h2', text: 'Virtual versus real' },
  {
    t: 'p',
    text: 'Real kinetic sand wins on texture, and it is not close — the whole appeal is in your fingers. Virtual sand wins on everything else: no grit on the desk, no drying out, no crumbs in the carpet, unlimited colours, and a reset that takes one tap.',
  },
  {
    t: 'p',
    text: 'If you are buying sand for a child, buy the real thing. If you want five minutes at a keyboard, the [Sand Cutting](/games/sand-cutting) game models a real height field — cuts, scoops and smoothed areas persist, and the shading follows the surface, so the grooves actually look like grooves rather than a drawn-on pattern.',
  },

  { t: 'h2', text: 'A five-minute session' },
  {
    t: 'ol',
    items: [
      'Smooth the surface first. Starting from blank makes the first cut land properly.',
      'Pick one tool and one direction. Do not switch for the first two minutes — repetition is what makes it settle.',
      'Cut until the surface is covered, then stop and look at it for a second.',
      'Smooth it back to blank before you leave. Ending on a reset is what stops the session from feeling unfinished.',
    ],
  },
  {
    t: 'p',
    text: 'That is the whole trick: a material that responds immediately, a task with no way to fail, and an ending you choose.',
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
