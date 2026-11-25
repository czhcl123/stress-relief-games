import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('stress-relief-games-for-adhd')
const keywords = [
  'stress relief games for adhd',
  'fidget toys for adhd',
  'do fidget toys help adhd',
  'adhd focus games',
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
    text: 'ADHD is a clinical condition, not a personality quirk, and a browser game is not a treatment for it. That said, many people with ADHD use short, repetitive activities to manage restlessness, and it is worth asking what the evidence actually says about fidget tools and focus games.',
  },
  {
    t: 'p',
    text: 'The short version: the evidence is mixed, the studies are small, and the effect is personal. A tool that helps one person may distract another. The useful move is to test one on a real task, not to assume a label makes it work.',
  },

  { t: 'h2', text: 'What the research actually looks at' },
  {
    t: 'p',
    text: 'Most studies look at fidget devices — spinners, stress balls, small objects — rather than browser games. They measure attention, anxiety, physiological arousal or classroom behaviour, usually over a short period and with small samples.',
  },
  {
    t: 'ul',
    items: [
      '**Classroom studies:** fidget spinners in children with ADHD have produced mixed results; some found no clear benefit.',
      '**Adult studies:** a study of fidget devices in adults with ADHD found calming effects for some participants.',
      '**Mechanism studies:** fidgeting may serve a compensatory function for attention and arousal, not simply a deficit.',
    ],
  },

  { t: 'h2', text: 'What the evidence suggests' },
  {
    t: 'p',
    text: 'The evidence does not support a blanket claim that fidget toys help ADHD. It supports a narrower claim: some people with ADHD find a small, repetitive activity calming or helpful for attention, and others find it distracting. The effect depends on the person, the task and the tool.',
  },
  {
    t: 'p',
    text: 'That is why the honest recommendation is a self-test, not a prescription. Try a tool for two minutes on a task that matters, then notice whether you returned to the task faster or slower.',
  },

  { t: 'h2', text: 'Why a game might help — and might not' },
  {
    t: 'p',
    text: 'A short game can help by giving restlessness a place to go, adding a predictable rhythm, or providing a clean stopping point. It can also hurt by adding visual noise, sound, novelty or one more tab to manage.',
  },
  {
    t: 'p',
    text: 'The difference is usually attention cost. A quiet stress ball or a pop-it can sit in the background; a spinner with a bright visual and a hum is more likely to become the task. Choose the lowest-attention tool that still gives your hands something to do.',
  },

  { t: 'h2', text: 'How to test a tool for yourself' },
  {
    t: 'ol',
    items: [
      'Pick a real task that takes at least five minutes.',
      'Choose one tool: a [Stress Relief Ball](/games/stress-ball), [Pop It](/games/pop-it) or [Fidget Spinner](/games/fidget-spinner).',
      'Use it for two minutes, then put it down.',
      'Rate your focus from 1 to 5 before and after.',
      'If it helped, keep it; if it distracted you, try a quieter option or stop.',
    ],
  },
  {
    t: 'p',
    text: 'The [fidget games collection](/fidget-games) groups the quiet and noisy options so you can compare without opening ten tabs.',
  },

  { t: 'h2', text: 'What to do if ADHD affects your life' },
  {
    t: 'p',
    text: 'If restlessness, impulsivity or attention problems are affecting your work, relationships, sleep or safety, talk to a qualified clinician. ADHD assessment and treatment are not something a browser game can provide. Evidence-based options exist, and they are worth discussing with a professional.',
  },

  { t: 'h2', text: 'A note on claims' },
  {
    t: 'note',
    text: '**Honest limit:** this page is general information, not medical advice. No game on this site treats ADHD, anxiety or any health condition. If you are considering a fidget tool for a child or an adult with ADHD, treat it as an experiment, not a treatment.',
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
