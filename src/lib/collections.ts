export interface CollectionFaq {
  q: string
  a: string
}

export interface Collection {
  /** Top-level URL slug, e.g. /fidget-games */
  slug: string
  /** <title> / OG title */
  title: string
  /** Visible H1 */
  h1: string
  /** Meta description, kept under 160 characters. */
  description: string
  intro: string[]
  whoFor: string
  howToChoose: string[]
  /** Game/tool hrefs, resolved against src/lib/games.ts. */
  items: string[]
  /** Guide slugs, resolved against src/lib/posts.ts. */
  guideSlugs: string[]
  faqs: CollectionFaq[]
  /** Related collection slugs. */
  related: string[]
  /** Optional note, e.g. the medical disclaimer on the anxiety page. */
  note?: string
}

export const collections: Collection[] = [
  {
    slug: 'bubble-wrap-games',
    title: 'Bubble Wrap Games — Free Online Pop Games',
    h1: 'Bubble Wrap Games',
    description:
      'Free bubble wrap games online: pop a 192-bubble sheet or a 6×6 pop-it toy. Satisfying sounds, no signup, no download.',
    intro: [
      'Bubble wrap games are the simplest kind of break: a sheet of bubbles, a pop sound, and a clear finish line. This collection has two takes on it — a classic 192-bubble sheet and a 6×6 pop-it toy you can pop and unpop.',
      'Both run in the browser, need no account, and take a minute or two. They are not therapy; they are a short, low-stakes pause.',
    ],
    whoFor:
      'For restless hands, a boring five-minute gap, or the moment before you open another tab.',
    howToChoose: [
      'Want a long sheet with Zen and Speed modes? Start with Bubble Wrap Popper.',
      'Want a toy you can pop and reset, with a counter? Try Pop It.',
      'Want a longer, more visual session? Add Sand Cutting from the texture collection.',
    ],
    items: ['/games/bubble-wrap', '/games/pop-it'],
    guideSlugs: ['does-popping-bubble-wrap-relieve-stress'],
    faqs: [
      {
        q: 'Are these bubble wrap games free?',
        a: 'Yes. Both run in the browser with no signup, no download and no ads.',
      },
      {
        q: 'What is the difference between Bubble Wrap Popper and Pop It?',
        a: 'Bubble Wrap Popper is a 192-bubble sheet with Zen and Speed modes. Pop It is a 6×6 silicone-style toy you can pop and unpop, with a counter and colour themes.',
      },
      {
        q: 'Do they work on a phone?',
        a: 'Yes. Tap or drag on the bubbles; the layouts adapt to phone screens.',
      },
      {
        q: 'Is popping bubble wrap good for stress?',
        a: 'It can provide a short, satisfying break. The evidence is indirect — research looks at micro-breaks and fidgeting, not bubble wrap as a treatment.',
      },
    ],
    related: ['fidget-games', 'asmr-games'],
  },
  {
    slug: 'slime-and-kinetic-sand-games',
    title: 'Slime & Kinetic Sand Games — Free Online',
    h1: 'Slime & Kinetic Sand Games',
    description:
      'Free online slime and kinetic sand games: stretch virtual slime or slice and scoop kinetic sand with ASMR sounds. No signup, no download.',
    intro: [
      'Slime and kinetic sand are texture-first toys: the point is how they push back, hold a shape and sound when you touch them. These two browser versions keep the movement and the sound, without the mess.',
      'They are sensory breaks, not therapy. If a texture makes you feel disgusted, skip it; if it absorbs you for two minutes, it is doing its job.',
    ],
    whoFor: 'For people who like slow, tactile input more than fast tapping.',
    howToChoose: [
      'Want stretch, poke and squish? Start with Slime Simulator.',
      'Want cuts that stay where you make them? Try Sand Cutting.',
      'Want sound with the texture? Both have synthesised ASMR-style audio; mute if it is not for you.',
    ],
    items: ['/games/slime-simulator', '/games/sand-cutting'],
    guideSlugs: ['why-is-slime-calming', 'why-is-cutting-kinetic-sand-satisfying'],
    faqs: [
      {
        q: 'Are the slime and sand games free?',
        a: 'Yes. Both run in the browser with no signup, no download and no ads.',
      },
      {
        q: 'Do they work on a phone?',
        a: 'Yes. Drag with one finger; the canvas captures touch gestures so the page does not scroll while you play.',
      },
      {
        q: 'Is virtual slime the same as real slime?',
        a: 'No. You get the movement and sound, not the temperature or real texture. It is a screen approximation.',
      },
      {
        q: 'Why is kinetic sand satisfying?',
        a: 'It holds a cut edge and gives immediate visual feedback, with a crisp sound. The evidence is indirect (ASMR and pleasant-touch research), not a direct trial.',
      },
    ],
    related: ['asmr-games', 'zen-games'],
  },
  {
    slug: 'zen-games',
    title: 'Zen Games — Free Online Calming Games',
    h1: 'Zen Games — Calm Browser Games',
    description:
      'Free online zen games and calm tools: rake a sand garden, watch a lava lamp, draw a mandala, play rain sounds or follow a breathing circle.',
    intro: [
      'Zen games are not about winning. They give your attention a slow, repeatable task — raking sand, watching colour drift, drawing a symmetrical pattern, following a breath — and then let you stop.',
      'This collection mixes interactive games with quiet tools. All are free, browser-based and designed for short sessions.',
    ],
    whoFor: 'For winding down, waiting, or a quiet minute between tasks.',
    howToChoose: [
      'Want to make something? Try Zen Garden or Mandala Drawing.',
      'Want to watch something? Try Lava Lamp.',
      'Want sound or breathing? Try Rain Sounds or Box Breathing.',
    ],
    items: [
      '/games/zen-garden',
      '/games/lava-lamp',
      '/games/mandala',
      '/games/rain-sounds',
      '/games/breathing',
      '/games/worry-jar',
    ],
    guideSlugs: ['what-is-a-zen-garden'],
    faqs: [
      {
        q: 'Are these zen games free?',
        a: 'Yes. They run in the browser with no signup, no download and no ads.',
      },
      {
        q: 'Which one should I start with?',
        a: 'If you want to make something, start with Zen Garden or Mandala Drawing. If you want to watch, try Lava Lamp. If you want sound, try Rain Sounds.',
      },
      {
        q: 'Do they work on a phone?',
        a: 'Yes. The games support touch, and the layouts adapt to phone screens.',
      },
      {
        q: 'Are these games a substitute for meditation?',
        a: 'No. They are short, low-stakes breaks. If you want to build a meditation practice, a guided practice is a better starting point.',
      },
    ],
    related: ['games-for-anxiety', 'asmr-games'],
  },
  {
    slug: 'fidget-games',
    title: 'Fidget Games — Free Online Fidget Toys',
    h1: 'Fidget Games — Free Online Fidget Toys',
    description:
      'Free online fidget games: spin a virtual fidget spinner, squeeze a stress ball, pop a pop-it grid or stretch slime. No signup, no download.',
    intro: [
      'Fidget games give restless hands something to do without asking for much attention. The best one is the one you can use without looking away from the thing you are trying to focus on.',
      'This collection has four options: a spinner, a stress ball, a pop-it grid and slime. Try one for a minute and notice whether it helps or distracts.',
    ],
    whoFor: 'For restless hands, short focus breaks, or people who think better while moving.',
    howToChoose: [
      'Want motion and sound? Fidget Spinner.',
      'Want a quick physical release? Stress Relief Ball.',
      'Want a quiet, repetitive pop? Pop It.',
      'Want slow tactile input? Slime Simulator.',
    ],
    items: [
      '/games/fidget-spinner',
      '/games/stress-ball',
      '/games/pop-it',
      '/games/slime-simulator',
    ],
    guideSlugs: ['do-fidget-spinners-help-focus', 'stress-ball-exercises'],
    faqs: [
      {
        q: 'Are these fidget games free?',
        a: 'Yes. They run in the browser with no signup, no download and no ads.',
      },
      {
        q: 'Do fidget spinners help focus?',
        a: 'The evidence is mixed. Some people find a spinner helps with restlessness; others find it distracting. Test it on a real task rather than assuming it works.',
      },
      {
        q: 'Which fidget is quietest?',
        a: 'Pop It and Slime Simulator are the quietest; Fidget Spinner has a synthesised bearing hum, and Stress Relief Ball has soft squish/thud sounds.',
      },
      {
        q: 'Do they work on a phone?',
        a: 'Yes. Tap, drag or flick; the layouts adapt to touch screens.',
      },
    ],
    related: ['bubble-wrap-games', 'games-for-students'],
  },
  {
    slug: 'asmr-games',
    title: 'ASMR Games — Free Online Satisfying Sounds',
    h1: 'ASMR Games — Satisfying Sounds Online',
    description:
      'Free online ASMR games: stretch slime, cut kinetic sand, play rain sounds or pop a 6×6 pop-it toy. Synthesised sounds, no download.',
    intro: [
      'ASMR games are built around sound and texture: a squish, a cut, a pop, rain on a window. The response is not universal — some people feel it strongly, some feel nothing — so treat this as a self-test, not a guarantee.',
      'All sounds here are synthesised in the browser, not recorded files. Headphones help; volume is yours.',
    ],
    whoFor: 'For people who find soft, repetitive sound calming or absorbing.',
    howToChoose: [
      'Want texture and sound? Slime Simulator or Sand Cutting.',
      'Want steady background sound? Rain Sounds.',
      'Want short, sharp pops? Pop It.',
    ],
    items: [
      '/games/slime-simulator',
      '/games/sand-cutting',
      '/games/rain-sounds',
      '/games/pop-it',
    ],
    guideSlugs: ['why-is-slime-calming', 'why-is-cutting-kinetic-sand-satisfying'],
    faqs: [
      {
        q: 'Are these ASMR games free?',
        a: 'Yes. They run in the browser with no signup, no download and no ads.',
      },
      {
        q: 'Do the sounds loop?',
        a: 'Rain Sounds loops continuously. The other sounds are triggered by your actions (a squish, a cut, a pop).',
      },
      {
        q: 'Why is there no sound at first?',
        a: 'Browsers block audio until you interact with the page. Tap or press Play first, then check the volume.',
      },
      {
        q: 'Does ASMR work for everyone?',
        a: 'No. Some people experience a strong response; others feel nothing. It is not a treatment for anxiety or a medical condition.',
      },
    ],
    related: ['slime-and-kinetic-sand-games', 'zen-games'],
  },
  {
    slug: 'games-for-anxiety',
    title: 'Stress Relief Games for Anxiety — Free Online',
    h1: 'Stress Relief Games for Anxiety',
    description:
      'Free online games for anxiety: box breathing, a worry jar, a zen garden, rain sounds and a stress ball. Short, low-pressure breaks; not medical advice.',
    intro: [
      'When anxiety is loud, a browser game is not a cure. What a short, low-pressure activity can do is give your attention somewhere specific to land for a minute — a breath, a repetitive motion, a simple visual task.',
      'This collection is for the smaller, everyday version of anxiety: the pre-meeting jitter, the racing thoughts at bedtime, the moment you cannot settle. It is not a substitute for professional care.',
    ],
    whoFor:
      'For everyday restlessness and short breaks; not for crisis or ongoing anxiety treatment.',
    howToChoose: [
      'Wound up, need to slow down? Box Breathing.',
      'Racing thoughts? Worry Jar.',
      'Need a quiet visual task? Zen Garden or Lava Lamp.',
      'Need background sound? Rain Sounds.',
      'Need something physical? Stress Relief Ball.',
    ],
    items: [
      '/games/breathing',
      '/games/worry-jar',
      '/games/zen-garden',
      '/games/lava-lamp',
      '/games/rain-sounds',
      '/games/stress-ball',
    ],
    guideSlugs: ['what-is-a-zen-garden', 'stress-ball-exercises'],
    faqs: [
      {
        q: 'Can games help with anxiety?',
        a: 'A short, low-pressure activity can help some people interrupt a thought loop for a minute. It is not a treatment for an anxiety disorder, and responses vary.',
      },
      {
        q: 'Which one should I try first?',
        a: 'If you feel physically wound up, try Box Breathing. If your mind is racing, try Worry Jar. If you need something quiet and visual, try Zen Garden.',
      },
      {
        q: 'Is this a substitute for therapy?',
        a: 'No. If anxiety is affecting your sleep, work or daily life, talk to a qualified professional. This page is general information, not medical advice.',
      },
      {
        q: 'What if a game makes me feel worse?',
        a: 'Stop and do something else. A browser game should be optional; if it is not helping, it is not the right tool.',
      },
    ],
    related: ['zen-games', 'games-for-work'],
    note: 'This page is general information, not medical advice. If anxiety is affecting your sleep, work or daily life, talk to a qualified professional. See the full disclaimer.',
  },
  {
    slug: 'games-for-students',
    title: 'Stress Relief Games for Students — Free Online',
    h1: 'Stress Relief Games for Students',
    description:
      'Free online stress relief games for students: two-minute bubble wrap, breathing, fidget spinner, stress ball and rain sounds. No signup.',
    intro: [
      'Student stress is usually a pile of small open loops: a reading you have not finished, a message you have not answered, a deadline that keeps moving. A two-minute break will not fix the pile, but it can interrupt the loop.',
      'These games are short, quiet and free. They work on a phone or a laptop, and none of them need an account.',
    ],
    whoFor: 'For study breaks, lecture gaps, and the ten minutes before an exam.',
    howToChoose: [
      'Need to slow your breathing? Box Breathing.',
      'Need to occupy your hands? Bubble Wrap Popper or Fidget Spinner.',
      'Need background sound while reading? Rain Sounds.',
      'Need a quick physical reset? Stress Relief Ball.',
    ],
    items: [
      '/games/breathing',
      '/games/fidget-spinner',
      '/games/bubble-wrap',
      '/games/stress-ball',
      '/games/rain-sounds',
    ],
    guideSlugs: ['do-fidget-spinners-help-focus', 'stress-ball-exercises'],
    faqs: [
      {
        q: 'Are these games free for students?',
        a: 'Yes. They are free for everyone, with no signup, no download and no ads.',
      },
      {
        q: 'Can I use them during a study break?',
        a: 'Yes. Most take one to three minutes. Set a timer so the break does not turn into a longer distraction.',
      },
      {
        q: 'Do they work on a school laptop?',
        a: 'They run in a modern browser. Audio may be blocked until you click or tap; the visual games work without sound.',
      },
      {
        q: 'Are they a substitute for study support?',
        a: 'No. They are short breaks, not a fix for workload or academic pressure. If stress is persistent, talk to a teacher, counsellor or health professional.',
      },
    ],
    related: ['games-for-work', 'fidget-games'],
  },
  {
    slug: 'games-for-work',
    title: 'Stress Relief Games for Work — Free Desk Breaks',
    h1: 'Stress Relief Games for Work — Desk Breaks',
    description:
      'Free online stress relief games for work: two-minute desk breaks with breathing, a stress ball, fidget spinner, rain sounds or a lava lamp.',
    intro: [
      'A work break needs to be short enough to take and quiet enough not to be noticed. These tools are built for the gap between meetings: no account, no download, no sound unless you choose it.',
      'They are not a fix for a bad workload. They are a way to put a clean stopping point in the middle of a messy day.',
    ],
    whoFor: 'For desk workers, remote workers, and anyone who needs a two-minute reset.',
    howToChoose: [
      'Need to slow down before a call? Box Breathing.',
      'Need something for your hands? Stress Relief Ball or Fidget Spinner.',
      'Need background noise? Rain Sounds.',
      'Need a visual break? Lava Lamp or Zen Garden.',
      'Need a quick pop? Bubble Wrap Popper.',
    ],
    items: [
      '/games/breathing',
      '/games/stress-ball',
      '/games/fidget-spinner',
      '/games/rain-sounds',
      '/games/lava-lamp',
      '/games/zen-garden',
      '/games/bubble-wrap',
    ],
    guideSlugs: ['stress-ball-exercises', 'do-fidget-spinners-help-focus'],
    faqs: [
      {
        q: 'Are these work break games free?',
        a: 'Yes. They run in the browser with no signup, no download and no ads.',
      },
      {
        q: 'Which ones are silent?',
        a: 'Box Breathing, Lava Lamp, Zen Garden and Mandala Drawing are silent. Rain Sounds, Bubble Wrap, Stress Ball and Fidget Spinner have sound; you can mute your device or pause.',
      },
      {
        q: 'How long should a desk break be?',
        a: 'Two to five minutes. Set a timer and stop at a clean point; the stopping point is what keeps a break from becoming a distraction.',
      },
      {
        q: 'Will my employer see this?',
        a: 'These are ordinary websites; your network or device policies may still apply. There is no account and no personal data is required to play.',
      },
    ],
    related: ['games-for-students', 'zen-games'],
  },
]

export function getCollection(slug: string): Collection {
  const collection = collections.find((item) => item.slug === slug)
  if (!collection) throw new Error(`Unknown collection slug: ${slug}`)
  return collection
}
