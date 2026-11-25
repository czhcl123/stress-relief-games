import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('bubble-wrap-vs-fidget-spinner-vs-stress-ball')
const keywords = [
  'bubble wrap vs fidget spinner',
  'stress ball vs fidget spinner',
  'best fidget for stress',
  'fidget toys for anxiety',
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
    text: 'Bubble wrap, fidget spinners and stress balls are often lumped together as “fidget toys”, but they do different jobs. One gives you a clear finish line, one gives you rhythmic motion, and one gives you a firm squeeze followed by a release. The right choice depends on what kind of restless you are.',
  },

  { t: 'h2', text: 'Bubble wrap: the clear finish line' },
  {
    t: 'p',
    text: 'Bubble wrap is the most completion-oriented of the three. You press, it pops, and that bubble is finished. A sheet has a finite number of bubbles, so there is a natural end — which is exactly what a feed lacks.',
  },
  {
    t: 'p',
    text: 'The [Bubble Wrap Popper](/games/bubble-wrap) has 192 bubbles and two modes. Zen mode removes the timer and the score; Speed mode adds a clock. If you are wound up and want no pressure, Zen. If you are foggy and want a small goal, Speed.',
  },
  {
    t: 'p',
    text: 'The sound matters more than people admit. A pop is a short, sharp, safe startle that you caused. If sound irritates you, mute it; the visual completion still works.',
  },

  { t: 'h2', text: 'Fidget spinner: rhythmic motion' },
  {
    t: 'p',
    text: 'A spinner is about motion, not completion. You flick it, it coasts, and the RPM readout gives you a small piece of feedback. The [Fidget Spinner](/games/fidget-spinner) has six designs and a bearing hum that rises with speed.',
  },
  {
    t: 'p',
    text: 'The catch is visual attention. A spinner is more distracting than a stress ball because it asks you to look at it. For some people that is fine; for reading or deep work, it can cost more attention than it saves.',
  },
  {
    t: 'p',
    text: 'The research on spinners is mixed. A classroom study in children with ADHD found no clear benefit, while a study of fidget devices in adults with ADHD found calming effects for some participants. The honest summary is: test it on yourself, on a real task.',
  },

  { t: 'h2', text: 'Stress ball: physical release' },
  {
    t: 'p',
    text: 'A stress ball is the most physical of the three. The useful pattern is a brief, firm squeeze followed by a full release — the same contrast principle as progressive muscle relaxation. The release is the relaxing part, not the grip.',
  },
  {
    t: 'p',
    text: 'The [Stress Relief Ball](/games/stress-ball) lets you squeeze, throw and bounce. Six ball types change the bounce and squash. Use about seventy percent effort, not maximum; pain is a stop signal.',
  },
  {
    t: 'p',
    text: 'A physical ball is still the best version because the resistance is real. The browser version is for the train, the meeting, or the desk with nothing within reach.',
  },

  { t: 'h2', text: 'What the evidence says' },
  {
    t: 'p',
    text: 'None of these has a strong direct trial behind it. The support is indirect: research on micro-breaks, fidgeting and progressive muscle relaxation. That does not make them useless; it makes them small tools, not treatments.',
  },
  {
    t: 'ul',
    items: [
      '**Micro-breaks:** brief pauses can help sustain attention, but the effect depends on the task and the person.',
      '**Fidgeting:** movement may help regulate attention for some people; fidget toys are a mixed picture.',
      '**Progressive muscle relaxation:** a strong evidence base for the squeeze-and-release pattern, not for stress balls specifically.',
    ],
  },

  { t: 'h2', text: 'Which one should you pick?' },
  {
    t: 'ul',
    items: [
      '**You want a clear end:** Bubble Wrap Popper.',
      '**You want motion and rhythm:** Fidget Spinner.',
      '**You feel physically wound up:** Stress Relief Ball.',
      '**You want something quiet:** Stress Relief Ball (slow squeeze) or Pop It.',
      '**You are not sure:** try each for two minutes and notice which one you stop thinking about.',
    ],
  },

  { t: 'h2', text: 'A two-minute test' },
  {
    t: 'ol',
    items: [
      'Pick one tool and set a two-minute timer.',
      'Use it without switching tabs.',
      'When the timer ends, notice: did your breathing change, did your shoulders drop, or are you more scattered?',
      'If it helped, keep it; if it distracted you, try a different one.',
    ],
  },

  { t: 'h2', text: 'What none of them do' },
  {
    t: 'note',
    text: '**Honest limit:** none of these toys treats anxiety or a stress-related condition. They are short breaks. If stress is persistent or affecting your sleep or work, talk to a qualified professional.',
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
