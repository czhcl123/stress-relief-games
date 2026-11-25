export type EvidenceStrength =
  | 'Strong'
  | 'Moderate'
  | 'Mixed'
  | 'Indirect'
  | 'Background'

export interface GuideReference {
  /** Full citation, author–year–title–journal–DOI. */
  citation: string
  url: string
  strength: EvidenceStrength
  /** What the source actually studies, so the badge is not misleading. */
  note?: string
}

export interface GuideFaq {
  q: string
  a: string
}

export interface GuideExtra {
  quickAnswer: string
  takeaways: string[]
  methodology: string
  limitations: string[]
  faqs: GuideFaq[]
  references: GuideReference[]
}

/**
 * The answer-first, evidence-aware layer for each guide. Keeping it separate
 * from the narrative body lets the renderer show the same Quick answer,
 * takeaways, method, limitations and references on every article, and lets
 * the Article JSON-LD emit the same citations.
 */
export const guideExtras: Record<string, GuideExtra> = {
  'does-popping-bubble-wrap-relieve-stress': {
    quickAnswer:
      'Popping bubble wrap can take the edge off for a minute or two, but there is no strong evidence that it treats stress or anxiety. The likely mechanism is a short, predictable, repetitive action with a clear finish line — not the bubble wrap itself.',
    takeaways: [
      'Direct evidence on bubble wrap is thin; most support comes from research on micro-breaks, fidgeting and repetitive touch.',
      'The useful part is the stopping point: a sheet runs out, unlike a feed.',
      'It is a break, not a treatment. Persistent anxiety needs professional support.',
      'Zen mode suits winding down; Speed mode suits a bored, foggy brain.',
    ],
    methodology:
      'We searched Crossref for micro-break, fidgeting and repetitive-behaviour research, checked the cited studies’ abstracts and DOI records, and separated direct bubble-wrap evidence from indirect mechanisms. The evidence was last checked on November 19, 2026.',
    limitations: [
      'No randomised trial of bubble wrap itself was found.',
      'Most studies use students or ADHD samples, not a general stress-relief population.',
      'Short-term mood effects are hard to separate from taking any break at all.',
      'This guide is general information, not medical advice.',
    ],
    faqs: [
      {
        q: 'Does popping bubble wrap actually relieve stress?',
        a: 'It can provide a short, low-stakes break, and many people find it satisfying. The evidence is indirect: studies support micro-breaks and fidgeting in general, not bubble wrap as a treatment for anxiety.',
      },
      {
        q: 'How long should a bubble wrap break be?',
        a: 'About two minutes. Set a timer, stop at a clean point, and stand up before going back to the task. The stopping point is what keeps a break from turning into twenty minutes of scrolling.',
      },
      {
        q: 'Is Zen mode or Speed mode better?',
        a: 'Zen mode is better when you are wound up and want no pressure. Speed mode is better when you are bored or foggy and want a small goal to restart your attention.',
      },
      {
        q: 'Is popping bubble wrap bad for you?',
        a: 'There is no known harm from popping virtual bubble wrap. If you have hand or wrist pain, stop; a browser game is not worth aggravating an injury.',
      },
    ],
    references: [
      {
        citation:
          'Sharpe, B. T., Trotter, M. G., & Hale, B. J. (2025). Sustaining student concentration: the effectiveness of micro-breaks in a classroom setting. Frontiers in Psychology, 16, 1589411.',
        url: 'https://doi.org/10.3389/fpsyg.2025.1589411',
        strength: 'Indirect',
        note: 'Micro-breaks in a classroom; not bubble wrap.',
      },
      {
        citation:
          'Elahi, H., Son, H. M., Calub, C. A., Nasiri, N., Shapiro, D., & Isbister, K. (2025). Impact of fidget devices on anxiety and physiological responses in adults with ADHD. Research in Developmental Disabilities, 158, 104944.',
        url: 'https://doi.org/10.1016/j.ridd.2025.104944',
        strength: 'Indirect',
        note: 'Fidget devices in adults with ADHD; not bubble wrap.',
      },
      {
        citation:
          'Graziano, P. A., Garcia, A. M., & Landis, T. D. (2018). To fidget or not to fidget, that is the question: a systematic classroom evaluation of fidget spinners among young children with ADHD. Journal of Attention Disorders, 24(1), 163–171.',
        url: 'https://doi.org/10.1177/1087054718770009',
        strength: 'Mixed',
        note: 'Fidget spinners in children with ADHD; mixed classroom results.',
      },
    ],
  },

  'why-is-slime-calming': {
    quickAnswer:
      'Slime is calming for many people because it combines pleasant touch, repetitive movement and ASMR-like sound. The evidence is indirect — studies look at ASMR and pleasant touch, not slime itself — so treat it as a short sensory break, not a treatment.',
    takeaways: [
      'Slow, predictable touch and sound are the likely active ingredients.',
      'ASMR studies show reliable calming in people who experience ASMR, not everyone.',
      'Texture matters: if slime feels gross, it will not relax you.',
      'It is a fidget substitute, not a substitute for therapy.',
    ],
    methodology:
      'We reviewed ASMR and pleasant-touch research via Crossref, checked the DOIs, and separated direct slime evidence from indirect sensory mechanisms. The evidence was last checked on November 19, 2026.',
    limitations: [
      'No controlled trial of slime itself was found.',
      'ASMR response varies widely; some people feel nothing.',
      'A browser slime cannot reproduce temperature or real texture.',
      'This guide is general information, not medical advice.',
    ],
    faqs: [
      {
        q: 'Why is slime calming?',
        a: 'The likely ingredients are pleasant touch, slow repetitive movement and soft sound. Research on ASMR and pleasant touch supports the general idea, but it does not test slime specifically.',
      },
      {
        q: 'Does slime help anxiety?',
        a: 'Some people find it calming, but there is no serious evidence that slime treats anxiety. It is a short sensory break, not a substitute for professional care.',
      },
      {
        q: 'Is slime a fidget toy?',
        a: 'It can serve the same function for some people: it gives restless hands something to do. It is not a traditional fidget, and the texture is the point.',
      },
      {
        q: 'What if slime makes me feel disgusted?',
        a: 'Then it is not a good fit. Disgust is a strong signal; try a stress ball, kinetic sand or a different texture instead.',
      },
    ],
    references: [
      {
        citation:
          'Barratt, E. L., & Davis, N. J. (2015). Autonomous Sensory Meridian Response (ASMR): a flow-like mental state. PeerJ, 3, e851.',
        url: 'https://doi.org/10.7717/peerj.851',
        strength: 'Moderate',
        note: 'ASMR, not slime.',
      },
      {
        citation:
          'Poerio, G. L., Blakey, E., Hostler, T. J., & Veltri, T. (2018). More than a feeling: autonomous sensory meridian response (ASMR) is characterized by reliable changes in affect and physiology. PLOS ONE, 13(6), e0196645.',
        url: 'https://doi.org/10.1371/journal.pone.0196645',
        strength: 'Moderate',
        note: 'ASMR physiology, not slime.',
      },
      {
        citation:
          'Löken, L. S., Wessberg, J., Morrison, I., McGlone, F., & Olausson, H. (2009). Coding of pleasant touch by unmyelinated afferents in humans. Nature Neuroscience, 12(5), 547–548.',
        url: 'https://doi.org/10.1038/nn.2312',
        strength: 'Indirect',
        note: 'Pleasant touch, not slime.',
      },
    ],
  },

  'what-is-a-zen-garden': {
    quickAnswer:
      'A zen garden is a small raked gravel or sand garden with carefully placed stones, used for quiet attention rather than display. There is no strong trial of virtual zen gardens; the calming rationale comes from attention-restoration and nature-exposure research, plus the simplicity of the task.',
    takeaways: [
      'The ritual is the point: rake a pattern, stop, start again.',
      'Nature-restoration research supports the general idea, not this specific game.',
      'No score or timer is deliberate; adding a goal changes the activity.',
      'A real garden and a browser version are different; the browser one is a short break.',
    ],
    methodology:
      'We reviewed attention-restoration and nature-exposure research, checked the DOIs, and used a garden-history source for cultural background. Direct evidence for virtual zen gardens is absent. The evidence was last checked on November 19, 2026.',
    limitations: [
      'No direct trial of zen gardens or virtual raking was found.',
      'Nature studies often use real outdoor exposure, not a screen.',
      'Cultural claims vary by garden tradition.',
      'This guide is general information, not medical advice.',
    ],
    faqs: [
      {
        q: 'What is a zen garden?',
        a: 'A zen garden is a small dry landscape garden, usually raked gravel or sand with carefully placed stones. The Japanese dry landscape garden is the best-known form; the point is quiet attention, not plant variety.',
      },
      {
        q: 'Why does raking sand calm people?',
        a: 'It gives attention a simple, repeatable task with immediate visual feedback. Attention-restoration research supports the general idea of restorative environments, but it does not test virtual raking specifically.',
      },
      {
        q: 'Is a virtual zen garden as good as a real one?',
        a: 'No. The browser version gives you the gesture and the pattern, not the sand, the weight or the outdoor setting. It is a short break, not a replacement for a real garden.',
      },
      {
        q: 'Why is there no score or timer?',
        a: 'Because the activity is not a game with a goal. Adding a score would turn a quiet ritual into a task, which is the opposite of the point.',
      },
    ],
    references: [
      {
        citation:
          'Kaplan, S. (1995). The restorative benefits of nature: toward an integrative framework. Journal of Environmental Psychology, 15(3), 169–182.',
        url: 'https://doi.org/10.1016/0272-4944(95)90001-2',
        strength: 'Indirect',
        note: 'Attention Restoration Theory; nature, not zen gardens.',
      },
      {
        citation:
          'Ulrich, R. S. (1984). View through a window may influence recovery from surgery. Science, 224(4647), 420–421.',
        url: 'https://doi.org/10.1126/science.6143402',
        strength: 'Indirect',
        note: 'Nature view and recovery; not zen gardens.',
      },
      {
        citation:
          'Raggett, J., Berthier, F., & Parkes, G. (2000). Reading Zen in the rocks: the Japanese dry landscape garden. Garden History, 28(2).',
        url: 'https://doi.org/10.2307/1587286',
        strength: 'Background',
        note: 'Japanese dry landscape garden history.',
      },
    ],
  },

  'stress-ball-exercises': {
    quickAnswer:
      'A stress ball works best as a brief, firm squeeze followed by a full release — the same contrast principle as progressive muscle relaxation. The direct evidence for stress balls is limited; the stronger evidence is for the relaxation technique they borrow from.',
    takeaways: [
      'The release, not the squeeze, is the relaxing part.',
      'Aim for about 70% effort, not maximum; pain is a stop signal.',
      'Two minutes is enough; a routine beats random squeezing.',
      'If you have hand or wrist pain, ask a clinician first.',
    ],
    methodology:
      'We reviewed systematic reviews of progressive muscle relaxation and hand-exercise guidance, checked the DOIs, and adapted the exercises for a stress ball. Direct trials of stress balls are scarce. The evidence was last checked on November 19, 2026.',
    limitations: [
      'Most evidence is for progressive muscle relaxation, not stress balls specifically.',
      'Hand pain, arthritis and nerve conditions need professional advice.',
      'A virtual ball cannot reproduce real texture or resistance.',
      'This guide is general information, not medical advice.',
    ],
    faqs: [
      {
        q: 'How many times should you squeeze a stress ball?',
        a: 'A simple pattern is a five-second squeeze at about 70% effort, followed by a ten-second full release, repeated three times. Stop if you feel sharp pain or numbness.',
      },
      {
        q: 'Do stress balls lower blood pressure?',
        a: 'There is no strong evidence that stress balls themselves lower blood pressure. Relaxation techniques such as progressive muscle relaxation may help some people feel calmer, but they are not a treatment for hypertension.',
      },
      {
        q: 'Can stress balls help anxiety?',
        a: 'Some people find them calming, but the evidence is indirect. They are a portable fidget, not a treatment for an anxiety disorder.',
      },
      {
        q: 'How hard should I squeeze?',
        a: 'About 70% of maximum — firm, controlled and sustainable. Squeezing as hard as you can adds strain and defeats the purpose.',
      },
    ],
    references: [
      {
        citation:
          'Li, K., Chen, S., Liu, Y., & Yu, N. (2026). The effects of progressive muscle relaxation on sleep quality in adults: a systematic review and meta-analysis of randomized controlled trials. Frontiers in Public Health, 14, 1906525.',
        url: 'https://doi.org/10.3389/fpubh.2026.1906525',
        strength: 'Strong',
        note: 'PMR systematic review; not stress balls.',
      },
      {
        citation:
          'Wang, Z., Wu, C., & Jiang, X. (2026). Effectiveness of progressive muscle relaxation for psychological outcomes in older adults: a systematic review and meta-analysis. Behavioral Medicine, 1–11.',
        url: 'https://doi.org/10.1080/08964289.2026.2751215',
        strength: 'Strong',
        note: 'PMR systematic review; not stress balls.',
      },
      {
        citation:
          'Wessel, J. (2004). The effectiveness of hand exercises for persons with rheumatoid arthritis: a systematic review. Journal of Hand Therapy, 17(2), 174–180.',
        url: 'https://doi.org/10.1197/j.jht.2004.02.006',
        strength: 'Indirect',
        note: 'Hand exercise in rheumatoid arthritis; not stress balls.',
      },
    ],
  },

  'do-fidget-spinners-help-focus': {
    quickAnswer:
      'The evidence is mixed. Some small studies find fidget devices can help some people with ADHD or restlessness; others find no benefit or a distraction. A spinner is worth testing on yourself, but it is not a proven focus treatment.',
    takeaways: [
      'Effects vary by person and by task.',
      'A spinner may help restless hands but distract from reading.',
      'The evidence is stronger for fidgeting in general than for spinners specifically.',
      'If it costs attention, it is not working.',
    ],
    methodology:
      'We reviewed classroom and ADHD studies of fidget spinners and devices, checked the DOIs, and included the patent/history source. The evidence is mixed. The evidence was last checked on November 19, 2026.',
    limitations: [
      'Most studies are small and short.',
      'Classroom studies may not generalize to adults at work.',
      'Spinner design and speed differ from other fidgets.',
      'This guide is general information, not medical advice.',
    ],
    faqs: [
      {
        q: 'Do fidget spinners help focus?',
        a: 'The evidence is mixed. Some people find a spinner helps them sit with restlessness; others find it distracting. Test it on a real task rather than assuming it works.',
      },
      {
        q: 'Do fidget spinners help ADHD?',
        a: 'Some studies suggest fidget devices can have calming effects for some people with ADHD, but the evidence is not strong enough to call them a treatment. They are a tool to test, not a prescription.',
      },
      {
        q: 'Do fidget spinners help anxiety?',
        a: 'There is limited direct evidence. Some people find the rhythm calming; others find the sound or motion distracting. A short self-test is more useful than a general claim.',
      },
      {
        q: 'What is a good alternative?',
        a: 'A stress ball, a piece of slime or a quiet fidget that does not demand visual attention. The best fidget is the one that occupies your hands without taking your eyes off the task.',
      },
    ],
    references: [
      {
        citation:
          'Elahi, H., Son, H. M., Calub, C. A., Nasiri, N., Shapiro, D., & Isbister, K. (2025). Impact of fidget devices on anxiety and physiological responses in adults with ADHD. Research in Developmental Disabilities, 158, 104944.',
        url: 'https://doi.org/10.1016/j.ridd.2025.104944',
        strength: 'Moderate',
        note: 'Fidget devices in adults with ADHD.',
      },
      {
        citation:
          'Graziano, P. A., Garcia, A. M., & Landis, T. D. (2018). To fidget or not to fidget, that is the question: a systematic classroom evaluation of fidget spinners among young children with ADHD. Journal of Attention Disorders, 24(1), 163–171.',
        url: 'https://doi.org/10.1177/1087054718770009',
        strength: 'Mixed',
        note: 'Spinners in young children with ADHD; mixed results.',
      },
      {
        citation:
          'Sarver, D. E., Rapport, M. D., Kofler, M. J., Raiker, J. S., & Friedman, L. M. (2015). Hyperactivity in attention-deficit/hyperactivity disorder (ADHD): impairing deficit or compensatory behavior? Journal of Abnormal Child Psychology, 43(7), 1219–1232.',
        url: 'https://doi.org/10.1007/s10802-015-0011-1',
        strength: 'Indirect',
        note: 'Fidgeting/ADHD mechanism; not spinners specifically.',
      },
      {
        citation:
          'Hettinger, C. A. Spinning toy. US Patent 5,591,062.',
        url: 'https://patents.google.com/patent/US5591062A',
        strength: 'Background',
        note: 'Spinner history/patent; no health claim.',
      },
    ],
  },

  'why-is-cutting-kinetic-sand-satisfying': {
    quickAnswer:
      'Cutting kinetic sand is satisfying because it combines resistance, clean edges and a crisp sound — a predictable sensory loop. The evidence is indirect (ASMR and pleasant-touch research), not a direct trial of kinetic sand.',
    takeaways: [
      'Kinetic sand holds a cut edge, which gives immediate visual feedback.',
      'The sound and resistance are part of the effect, not extras.',
      'The mess is the main trade-off; the browser version removes it.',
      'It is a sensory break, not a treatment.',
    ],
    methodology:
      'We reviewed ASMR and pleasant-touch research, checked the DOIs, and separated direct kinetic-sand evidence from indirect sensory mechanisms. The evidence was last checked on November 19, 2026.',
    limitations: [
      'No controlled trial of kinetic sand was found.',
      'ASMR response varies; some people feel nothing.',
      'A screen cannot reproduce the material’s temperature or weight.',
      'This guide is general information, not medical advice.',
    ],
    faqs: [
      {
        q: 'Why is cutting kinetic sand satisfying?',
        a: 'It combines resistance, clean edges and a crisp sound. The material holds the shape you cut, so you get immediate visual feedback — a predictable sensory loop.',
      },
      {
        q: 'Is kinetic sand good for anxiety?',
        a: 'Some people find it calming, but there is no direct evidence that kinetic sand treats anxiety. ASMR and pleasant-touch research support the general idea of a sensory break.',
      },
      {
        q: 'Is virtual kinetic sand the same?',
        a: 'It behaves similarly — cuts stay where you make them — but it does not reproduce the temperature, weight or mess of the real material. It is a browser approximation.',
      },
      {
        q: 'What if I do not like the sound?',
        a: 'Mute it. The visual and tactile part may still work; if the sound is the main appeal, a silent version will feel flatter.',
      },
    ],
    references: [
      {
        citation:
          'Barratt, E. L., & Davis, N. J. (2015). Autonomous Sensory Meridian Response (ASMR): a flow-like mental state. PeerJ, 3, e851.',
        url: 'https://doi.org/10.7717/peerj.851',
        strength: 'Moderate',
        note: 'ASMR, not kinetic sand.',
      },
      {
        citation:
          'Poerio, G. L., Blakey, E., Hostler, T. J., & Veltri, T. (2018). More than a feeling: autonomous sensory meridian response (ASMR) is characterized by reliable changes in affect and physiology. PLOS ONE, 13(6), e0196645.',
        url: 'https://doi.org/10.1371/journal.pone.0196645',
        strength: 'Moderate',
        note: 'ASMR physiology, not kinetic sand.',
      },
      {
        citation:
          'Löken, L. S., Wessberg, J., Morrison, I., McGlone, F., & Olausson, H. (2009). Coding of pleasant touch by unmyelinated afferents in humans. Nature Neuroscience, 12(5), 547–548.',
        url: 'https://doi.org/10.1038/nn.2312',
        strength: 'Indirect',
        note: 'Pleasant touch, not kinetic sand.',
      },
    ],
  },
}
