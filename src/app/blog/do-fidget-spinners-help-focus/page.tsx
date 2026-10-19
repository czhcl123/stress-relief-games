import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { getPost, type Block } from '@/lib/posts'
import { articleJsonLd, articleMetadata } from '@/lib/seo'

const post = getPost('do-fidget-spinners-help-focus')
const keywords = [
  'do fidget spinners help you focus',
  'fidget spinner adhd',
  'are fidget toys good for concentration',
  'fidget spinner benefits',
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
    text: 'In 2017 fidget spinners went from a niche toy to a school-wide ban in the space of a few months. That whiplash is exactly why the question is so hard to answer: the tool and the trend got mixed together, and the marketing ran far ahead of the evidence.',
  },
  {
    t: 'p',
    text: 'So let us separate them properly — what the research actually suggests, who tends to benefit, and why a spinner is a strange choice for the job even when fidgeting does help.',
  },

  { t: 'h2', text: 'Fidgeting is not the same thing as being distracted' },
  {
    t: 'p',
    text: 'The idea behind fidget toys is that some people regulate attention better when part of them is moving. The movement occupies the restless, under-stimulated part of the system so the rest can stay on the task. Teachers see the opposite — a child fiddling instead of working — and both observations can be true at the same time, because it depends entirely on the person and the task.',
  },
  {
    t: 'p',
    text: 'This is not a new idea. Chewing a pen, bouncing a knee, doodling during a phone call — those are self-administered versions of the same strategy, and plenty of people who have never owned a fidget toy use them constantly.',
  },

  { t: 'h2', text: 'What the research actually says' },
  {
    t: 'p',
    text: 'The honest summary is: **mixed, and mostly from small studies.** Some research suggests that fidgeting or moving can help sustain attention for people with ADHD, particularly on long, low-stimulation tasks like listening. Other work finds that a fidget object can compete for attention rather than support it — especially on tasks that lean on working memory, where your hands are not the bottleneck but your attention is.',
  },
  {
    t: 'p',
    text: 'Both results are plausible and they are not contradictory. What seems to matter is whether the fidget is *automatic* or *engaging*. A movement you can do without thinking can soak up spare capacity. A movement you have to look at and manage becomes the task.',
  },
  {
    t: 'note',
    text: '**Honest limit:** there is no solid evidence that a fidget spinner improves focus in general, and no reputable source claims it treats ADHD. Anyone promising that is selling something. Treat a spinner as an experiment you run on yourself for a week, not a fix.',
  },

  { t: 'h2', text: 'Why a spinner specifically is a mixed bag' },
  {
    t: 'ul',
    items: [
      '**It is visual.** The rotation pulls your gaze. A fidget you have to watch is competing with the thing you are reading; a fidget you can feel but not look at is not.',
      '**It is loud, and it is loud at the wrong times.** Spinning a bearing lets everyone in the room know, which adds a social cost to using it.',
      '**It has a required interaction.** Unlike a ring or a piece of putty in a pocket, a spinner needs a flick every ten seconds or so. That is a recurring demand on your attention.',
      '**It is a toy, and it knows it.** Once a trick looks cool, doing tricks becomes more interesting than the lecture.',
    ],
  },

  { t: 'h2', text: 'Who tends to get something out of it' },
  {
    t: 'ul',
    items: [
      '**People who already fidget anyway.** If you chew pens or bounce your leg, you have already found the strategy. A spinner just formalises it.',
      '**Listening-only tasks.** Calls, lectures, long meetings where nobody expects your hands. This is where a passive fidget helps most.',
      '**Transition time.** The gap between two tasks, when your attention has nowhere to land yet.',
      '**Not:** tasks that need both hands, fine visual attention, or a lot of working memory — close reading, coding, maths, anything with a deadline.',
    ],
  },

  { t: 'h2', text: 'The better use case: winding down, not working' },
  {
    t: 'p',
    text: 'A spinner is unusually good at something it was never marketed for. Flick it, and it does the rest: the rotation decays slowly and predictably, the bearing note rises and falls with the speed. There is nothing to decide, nothing to aim at, and it finishes on its own.',
  },
  {
    t: 'p',
    text: 'That makes it a decent way to end a work session rather than enter one. The slowing motion is a fairly literal signal that the thing is over — which is why the [Fidget Spinner](/games/fidget-spinner) on this site models friction and RPM honestly: the spin you get is the spin the physics allows, and it always comes to a stop.',
  },

  { t: 'h2', text: 'How to use one well (if you are going to)' },
  {
    t: 'ol',
    items: [
      'Pick one context only. Use it for listening, not for reading. Do not carry it between the two.',
      'Give it a week. If your notes are worse or you keep rereading the same line, it is not working for you, and that is a real answer.',
      'Keep it quiet. If the bearing noise is the most interesting thing in the room for the people around you, you have moved the problem rather than solved it.',
      'Put it away when you need both hands and both eyes. There is no fidget worth half-reading a document for.',
    ],
  },

  { t: 'h2', text: 'If a spinner does not help, try these instead' },
  {
    t: 'ul',
    items: [
      'A piece of putty or a [stress ball](/games/stress-ball) — resistance you can feel without having to look at anything.',
      'A textured ring, which is silent and invisible.',
      'Standing up and walking for twenty seconds, which changes more variables at once than any fidget can.',
      'Letting your eyes follow one calm thing instead of a spinner — the [zen garden guide](/blog/what-is-a-zen-garden) covers why a low-stakes, visible-progress task is far easier to stop than a flick-and-watch toy.',
    ],
  },
  {
    t: 'p',
    text: 'The habit is worth keeping even if the spinner is not. The useful part was never the plastic — it was noticing that your hands wanted something to do, and giving them something that does not cost you the thing you were trying to pay attention to.',
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
