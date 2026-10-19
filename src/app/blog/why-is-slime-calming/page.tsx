import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('why-is-slime-calming')
const keywords = [
  'why is slime calming',
  'does slime help anxiety',
  'slime asmr',
  'slime for anxiety',
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
    text: 'Slime is a strange thing to enjoy. It has no goal, no score and no ending. You put your hands in it, it does something, and then you do it again.',
  },
  {
    t: 'p',
    text: 'And yet people describe it as calming in a way that a puzzle cube never is. That difference is not imaginary — it comes from what slime asks of you, which is almost nothing, and what it gives back, which is immediate.',
  },

  { t: 'h2', text: 'Slime is not a toy that does something. It is a material that responds' },
  {
    t: 'p',
    text: 'Most fidget toys have a mechanism: a click, a spin, a snap. Slime has no mechanism at all. Its entire appeal is that it responds to you, continuously and predictably. Pull slowly and it stretches into a long thread. Pull fast and it snaps. Press and it spreads. Fold it and the fold stays.',
  },
  {
    t: 'p',
    text: 'So you are not operating it — you are in a two-way conversation with a material. That is a fundamentally different kind of attention, and it is why slime holds people who get bored of a spinner in thirty seconds.',
  },

  { t: 'h2', text: 'The two cues your body is looking for' },
  { t: 'h3', text: 'Resistance' },
  {
    t: 'p',
    text: 'Slime pushes back, but never enough to hurt. Occupational therapists call this kind of input proprioceptive: information from muscles and joints about how much force you are using. Firm, resistive touch is one of the standard ways to help a body feel settled, and it is why a heavy blanket or a firm handshake can feel grounding.',
  },
  { t: 'h3', text: 'Predictability' },
  {
    t: 'p',
    text: 'The second cue is that slime does the same thing every time. Same pull, same stretch, same snap. In a day full of ambiguous signals — a vague message from your boss, an unclear test result, a plan that might change — a material with completely predictable physics is oddly restful.',
  },

  { t: 'h2', text: 'What the evidence says, and what it does not' },
  {
    t: 'p',
    text: 'This is where most articles about slime oversell it, so here is the honest version. Tactile fidget tools are widely used by occupational therapists and are generally considered low-risk, but responses vary a lot from person to person. Research on ASMR — the tingling, relaxing response many people get from soft sounds and close-up textures — is still early and relies heavily on self-report. There is no serious body of evidence that slime treats anxiety.',
  },
  {
    t: 'note',
    text: '**Honest limit:** slime is a way to pass two minutes, not a therapy. If anxiety is interfering with work, sleep or relationships, a texture will not resolve it. Use slime as a small tool alongside real support, not instead of it.',
  },
  {
    t: 'p',
    text: 'What is well supported is much simpler: brief, absorbing, low-stakes activity can interrupt rumination and give attention a rest. Slime is a convenient way to do that with your hands.',
  },

  { t: 'h2', text: 'Match the motion to the mood' },
  {
    t: 'p',
    text: 'Not every way of playing with slime feels the same, and the motion you choose should depend on what you are actually feeling:',
  },
  {
    t: 'ul',
    items: [
      '**Agitated, sped up, cannot slow down:** long, slow pulls. Stretch it as far as it will go, let it hang, then fold it back. The slowness is the medicine.',
      '**Irritable, restless hands:** poke. Press a finger in and watch it fill back in. Repetitive and slightly forceful, which suits frustration better than gentle stretching.',
      '**Physically tense — jaw, shoulders, forearms:** squeeze and fold. Big, whole-hand movements use the muscles that are already clenched.',
      '**Winding down before sleep:** one slow stretch, then stop. The point is to end on a calm motion rather than keep going until you are bored.',
    ],
  },

  { t: 'h2', text: 'Why most people stop using real slime' },
  {
    t: 'p',
    text: 'Ask anyone who bought slime in the last few years why it is in a drawer, and you will hear the same four answers: it dries out, it picks up hair and lint, it stains fabric, and it is genuinely unpleasant to find on a sofa. The calming part lasts about a week; the maintenance lasts as long as the slime does.',
  },
  {
    t: 'p',
    text: 'A virtual version trades away the real texture — which is the main event — for zero mess, zero drying and unlimited colours. That is a real trade, not a strict upgrade. If the physical sensation is what settles you, real slime is better. If what you actually need is five minutes of your hands doing something, the browser version removes every reason you would stop using it.',
  },

  { t: 'h2', text: 'A three-minute slime session' },
  {
    t: 'ol',
    items: [
      'Put the phone face down. Slime is a break from screens or it is just more screen.',
      'Start with one slow stretch. Take a full breath in as you pull, and let it out as it snaps back.',
      'Do the same motion ten times before you change anything. Repetition is what makes it settle rather than stimulate.',
      'When three minutes are up, wipe your hands and look out of a window for ten seconds before you go back.',
    ],
  },
  {
    t: 'p',
    text: 'The [Slime Simulator](/games/slime-simulator) has six types of slime with different stretch behaviour and squish sounds, so you can test which motion suits you before deciding whether to buy the real thing — or instead of it.',
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
