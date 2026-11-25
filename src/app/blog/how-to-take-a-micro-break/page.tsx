import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('how-to-take-a-micro-break')
const keywords = [
  'how to take a micro break',
  'two minute break',
  'micro break routine',
  'desk break ideas',
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
    text: 'A micro-break is not a nap, a workout or a scroll session. It is a short, low-stakes pause with a clear end — usually thirty seconds to five minutes. The point is not to escape the work; it is to interrupt it long enough for your attention to reset.',
  },
  {
    t: 'p',
    text: 'The most common mistake is choosing an activity with no stopping point. A feed scrolls forever. A two-minute timer does not. That difference matters more than whether you choose bubble wrap, breathing or rain sounds.',
  },

  { t: 'h2', text: 'What counts as a micro-break?' },
  {
    t: 'ul',
    items: [
      '**Short:** thirty seconds to five minutes. Two minutes is a good default.',
      '**Low-stakes:** nothing to win, nothing to lose, no account.',
      '**Single-task:** one activity, not a menu of options.',
      '**Finished:** a timer, a sheet of bubbles, a breathing cycle, a track that ends.',
      '**Optional:** you can skip it without guilt. A break that feels mandatory is just another task.',
    ],
  },

  { t: 'h2', text: 'The 2-minute routine' },
  {
    t: 'ol',
    items: [
      '**Stop at a clean point.** Save the file, close the tab, or write one line about where you were.',
      '**Set a two-minute timer.** This is the step that turns a fidget into a break.',
      '**Pick one activity.** Do not browse for the perfect one; choose from the list below.',
      '**Do it without switching.** One tab, one game, one sound.',
      '**Stand up and look away.** Ten seconds at something far away is part of the reset.',
      '**Return to one named task.** Not “work” — the next specific thing.',
    ],
  },

  { t: 'h2', text: 'What to do in the two minutes' },
  {
    t: 'ul',
    items: [
      '**Wound up:** [Box Breathing](/games/breathing) or [Stress Relief Ball](/games/stress-ball).',
      '**Restless hands:** [Bubble Wrap Popper](/games/bubble-wrap) or [Pop It](/games/pop-it).',
      '**Racing thoughts:** [Worry Jar](/games/worry-jar).',
      '**Need texture:** [Slime Simulator](/games/slime-simulator) or [Sand Cutting](/games/sand-cutting).',
      '**Need quiet:** [Zen Garden](/games/zen-garden) or [Lava Lamp](/games/lava-lamp).',
      '**Need sound:** [Rain Sounds](/games/rain-sounds).',
    ],
  },
  {
    t: 'p',
    text: 'If you want a pre-grouped list, the [work break collection](/games-for-work) and the [student collection](/games-for-students) are the same idea sorted by situation.',
  },

  { t: 'h2', text: 'What makes a break fail' },
  {
    t: 'ul',
    items: [
      '**No stopping point.** A feed, a video autoplay queue, or a game with no end.',
      '**Choice overload.** Spending the break deciding what to do is not a break.',
      '**Guilt.** If you spend the break telling yourself you should be working, you get neither rest nor work.',
      '**A break that is too long.** Twenty minutes of scrolling is not a micro-break; it is a different activity with a cost.',
    ],
  },

  { t: 'h2', text: 'What the evidence says' },
  {
    t: 'p',
    text: 'Research on micro-breaks is mixed but not empty. A classroom study found that brief pauses can help sustain concentration, and a meta-analysis of supplementary short rest breaks found benefits for task performance. The effects depend on the task, the person and the length of the break.',
  },
  {
    t: 'p',
    text: 'That is a modest claim, and it is the right one. A micro-break is not a cure for burnout, a bad workload or an anxiety disorder. It is a small tool for making a day more workable.',
  },

  { t: 'h2', text: 'A note on work' },
  {
    t: 'note',
    text: '**Honest limit:** if your workload is impossible, a two-minute break will not fix it. Breaks help you pace the work; they do not change the amount of it. If stress is persistent, talk to a manager, a doctor or a therapist — not just a browser game.',
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
