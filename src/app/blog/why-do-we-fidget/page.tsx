import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('why-do-we-fidget')
const keywords = [
  'why do we fidget',
  'fidgeting and attention',
  'fidget toys adhd',
  'does fidgeting help focus',
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
    text: 'Almost everyone fidgets. You tap a pen, bounce a knee, roll a ring, or click a lighter. It is not a rare symptom and it is not automatically a sign of ADHD. The more interesting question is what the movement is doing for your attention.',
  },

  { t: 'h2', text: 'What fidgeting is' },
  {
    t: 'p',
    text: 'Fidgeting is small, repetitive movement that is not part of the task: hands, feet, fingers, or an object. It can be a habit, a response to restlessness, or a way to stay alert when a task is under-stimulating.',
  },
  {
    t: 'p',
    text: 'The key word is small. A fidget that demands your eyes, both hands, or a loud sound is no longer a background movement; it is a second task.',
  },

  { t: 'h2', text: 'The compensation hypothesis' },
  {
    t: 'p',
    text: 'One influential idea is that hyperactivity in ADHD is not only a deficit but can be compensatory: movement may help regulate attention and arousal. A study by Sarver and colleagues (2015) framed hyperactivity as potentially serving a function, not just getting in the way.',
  },
  {
    t: 'p',
    text: 'That does not mean every fidget is helpful. It means the relationship between movement and attention is more complicated than “sit still and focus”. For some people, a small amount of movement makes sitting still possible.',
  },

  { t: 'h2', text: 'What the evidence says about fidget toys' },
  {
    t: 'p',
    text: 'The evidence for fidget toys is mixed. A classroom study of fidget spinners in young children with ADHD did not find a clear benefit, while a study of fidget devices in adults with ADHD found calming effects for some participants. Most studies are small and short.',
  },
  {
    t: 'p',
    text: 'The honest summary: fidgeting in general has a plausible attention-regulation function; fidget toys are a mixed picture; and no toy is a treatment for ADHD.',
  },

  { t: 'h2', text: 'Why a spinner is not automatically helpful' },
  {
    t: 'ul',
    items: [
      '**Visual attention:** a spinner asks you to look at it. If you are reading or coding, that is a cost.',
      '**Sound:** a bearing hum can be soothing or distracting, depending on the room.',
      '**Social context:** in a meeting or a classroom, a visible spinner can draw attention you did not want.',
      '**Novelty:** a new toy is interesting for five minutes; that is not the same as useful for a task.',
    ],
  },

  { t: 'h2', text: 'How to test a fidget' },
  {
    t: 'ol',
    items: [
      'Pick a real task that takes at least five minutes.',
      'Use the fidget for two minutes, then put it down.',
      'Notice whether you returned to the task faster or slower, and whether you were more or less scattered.',
      'Try a quiet alternative — a stress ball, pop-it or slime — and compare.',
    ],
  },
  {
    t: 'p',
    text: 'If the fidget costs attention, it is not working, even if it feels nice. The [fidget games collection](/fidget-games) has four options to test: a spinner, a stress ball, a pop-it and slime.',
  },

  { t: 'h2', text: 'When to seek help' },
  {
    t: 'note',
    text: '**Honest limit:** fidgeting alone does not diagnose ADHD. If restlessness, impulsivity or attention problems are affecting your work, relationships or sleep, talk to a qualified clinician. A browser toy is not an assessment.',
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
