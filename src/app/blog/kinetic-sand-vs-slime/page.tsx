import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('kinetic-sand-vs-slime')
const keywords = [
  'kinetic sand vs slime',
  'which is more satisfying',
  'kinetic sand benefits',
  'slime for stress relief',
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
    text: 'Kinetic sand and slime are both texture-first toys, but they ask for different things. Sand resists, holds a shape and gives you a clean edge. Slime yields, stretches and never keeps a shape for long. Which one is more satisfying depends on which sensation you are chasing.',
  },

  { t: 'h2', text: 'Kinetic sand: resistance and clean edges' },
  {
    t: 'p',
    text: 'Kinetic sand is about resistance and precision. A tool cuts a trench, the sand holds the wall, and the light catches the edge. The feedback is visual and immediate: what you cut is what stays.',
  },
  {
    t: 'p',
    text: 'The [Sand Cutting](/games/sand-cutting) version stores the sand as a height map, so a cut stays exactly where you made it. Slice leaves a sharp edge, Scoop digs a crater, and Smooth presses it flat. The sound is crisp and short.',
  },
  {
    t: 'p',
    text: 'The trade-off is precision: sand rewards slow, deliberate movement more than fast tapping. If you want to switch off by making something neat, this is the one.',
  },

  { t: 'h2', text: 'Slime: stretch and squish' },
  {
    t: 'p',
    text: 'Slime is about yield. It stretches, sags, snaps back and squishes. There is no edge to preserve and no pattern to finish; the point is the movement and the sound.',
  },
  {
    t: 'p',
    text: 'The [Slime Simulator](/games/slime-simulator) uses a soft-body model: a ring of control points is pulled toward the pointer, then springs back. Six palettes change the colour, not the physics. The squish is synthesised, quiet by design.',
  },
  {
    t: 'p',
    text: 'The trade-off is mess and texture. Real slime can be sticky and pick up lint; the browser version removes the mess but also the temperature and weight.',
  },

  { t: 'h2', text: 'The sound difference' },
  {
    t: 'p',
    text: 'Sand sounds like a short, crisp cut. Slime sounds like a soft, wet squish. Both can trigger an ASMR-like response in people who are sensitive to those sounds, and both can be irritating to people who are not.',
  },
  {
    t: 'p',
    text: 'The research on ASMR is real but not universal: studies find reliable changes in affect and physiology in people who experience ASMR, not in everyone. Treat the sound as a personal preference, not a guarantee.',
  },

  { t: 'h2', text: 'Which one suits which mood?' },
  {
    t: 'ul',
    items: [
      '**Precise, visual, want a clean result:** kinetic sand.',
      '**Slow, tactile, want to stretch something:** slime.',
      '**Want a crisp sound:** sand.',
      '**Want a quiet squish:** slime.',
      '**Do not like mess:** either browser version.',
      '**Do not like the texture of slime:** try sand instead.',
    ],
  },

  { t: 'h2', text: 'A two-minute comparison' },
  {
    t: 'p',
    text: 'Try [Sand Cutting](/games/sand-cutting) for two minutes, then [Slime Simulator](/games/slime-simulator) for two minutes. Notice which one you want to keep touching, and which one you were ready to close. That preference is more useful than a general “best texture” claim.',
  },

  { t: 'h2', text: 'What neither one does' },
  {
    t: 'note',
    text: '**Honest limit:** neither kinetic sand nor slime treats anxiety or a stress-related condition. The evidence is indirect, based on ASMR and pleasant-touch research. They are short sensory breaks; if stress is persistent, talk to a qualified professional.',
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
