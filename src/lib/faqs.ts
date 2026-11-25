export interface GameFaq {
  q: string
  a: string
}

/**
 * FAQ copy for the game pages. Kept next to the structured data so the
 * FAQPage JSON-LD and the visible "Questions people ask" block describe the
 * same answers. If the visible copy changes, change it here too.
 */
export const gameFaqs: Record<string, GameFaq[]> = {
  '/games/bubble-wrap': [
    {
      q: 'Is it free?',
      a: 'Yes, completely free. No account, no sign-up, no download, no in-app purchase, and no limit on how many bubbles you pop.',
    },
    {
      q: 'Does it work on a phone?',
      a: 'Yes. Tap a bubble to pop it, or drag across a row to clear several at once. The sheet reflows to fit your screen width.',
    },
    {
      q: 'How many bubbles are there?',
      a: '192 bubbles per sheet. Popping one removes it and the rest close up around the gap, so the sheet never runs out early.',
    },
    {
      q: 'Is popping bubble wrap really good for stress?',
      a: 'It is a small, predictable, repeating action that gives immediate feedback, which is generally what people are after. A randomised controlled trial of fidget devices in adults with ADHD found calming effects for some participants, though it is not a substitute for treatment.',
    },
    {
      q: 'Do I need an account or anything installed?',
      a: 'No. It runs in your browser with nothing to install and nothing sent to a server.',
    },
  ],
  '/games/slime-simulator': [
    {
      q: 'Is it free?',
      a: 'Yes. No sign-up, no download, no in-app purchase. It runs entirely in the browser.',
    },
    {
      q: 'Does it work on a phone?',
      a: 'Yes. Drag with one finger. The canvas takes over touch gestures so the page stays still while you stretch.',
    },
    {
      q: 'Why is there no sound?',
      a: 'Browsers block audio until you interact with the page. Tap the slime once and the sound engine starts. Check the volume too — the squish is quiet by design.',
    },
    {
      q: 'Can I use it in a classroom or on a stream?',
      a: 'Yes. There is an embeddable version with the text stripped out, sized for an iframe.',
    },
    {
      q: 'Is it the same as real slime?',
      a: 'No. You get the movement and the sound, not the temperature or the texture. It is a substitute for the fidget, not for the material.',
    },
  ],
  '/games/zen-garden': [
    {
      q: 'Is it free?',
      a: 'Yes, completely free. There is no account, no sign-up, no download and no in-app purchase. The garden runs in your browser.',
    },
    {
      q: 'Does it work on a phone?',
      a: 'Yes. Drag with one finger to rake or to move a stone. The canvas captures touch events so the page will not scroll while you are drawing, and the garden resizes with the screen.',
    },
    {
      q: 'Is this the same as a real zen garden?',
      a: 'It is the same ritual without the sand, the tray, or the sweeping up afterwards. A real rock garden uses raked gravel around carefully placed stones; this is the same action rendered on a screen.',
    },
    {
      q: 'How do I clear the sand?',
      a: 'The Clear Sand button above the garden wipes every groove and returns the surface to its original grain. Your stones and plants stay where they are, so you can rake again without rebuilding the layout.',
    },
    {
      q: 'Can I add more stones?',
      a: 'Yes. The Add Stone button places another rock on the sand, and you can drag it anywhere afterwards. There is no upper limit.',
    },
    {
      q: 'Why is there no score or timer?',
      a: 'On purpose. A zen garden has no goal to complete, so adding one would turn a relaxing activity into a task. There is nothing to lose and nothing to chase.',
    },
  ],
  '/games/stress-ball': [
    {
      q: 'Is it free?',
      a: 'Yes, completely free. No account, no sign-up, no download and no in-app purchase. It runs in your browser.',
    },
    {
      q: 'Does it work on a phone?',
      a: 'Yes. Drag with one finger to grab, move and throw the ball. The canvas captures touch events so the page will not scroll while you are playing.',
    },
    {
      q: 'How do I count my squeezes?',
      a: 'The counter above the canvas tracks every throw. The Reset button puts the ball back in the middle and clears the count.',
    },
    {
      q: 'Is a real stress ball better?',
      a: 'A real one gives you a more varied surface and texture, and if tension in your hands is an ongoing problem a physical one is a reasonable thing to keep at a desk. This is the version you can use anywhere with nothing to carry.',
    },
    {
      q: 'Why is there no sound?',
      a: 'There is sound — a soft squish when you pull the ball and a thud when it hits a wall. It is synthesised in the browser as you play rather than played from a file.',
    },
  ],
  '/games/fidget-spinner': [
    {
      q: 'Is it free?',
      a: 'Yes, completely free. No account, no sign-up, no download and no in-app purchase. It runs in your browser.',
    },
    {
      q: 'Does it work on a phone?',
      a: 'Yes. Drag around the edge of the spinner to flick it, and use the Flick button if that is easier one-handed. The canvas captures touch events so the page will not scroll while you are playing.',
    },
    {
      q: 'How fast does it actually spin?',
      a: 'The counter shows real RPM and it climbs to roughly 2,500 on a good flick, then coasts down on its own. Holding the centre stops it much faster than simply waiting.',
    },
    {
      q: 'Do fidget spinners really help focus?',
      a: 'The research is genuinely mixed, and most of it is small-scale. They are a reasonable fidgeting option for some people and no help at all for others. Whether it works for you is easy to test.',
    },
    {
      q: 'Is this the same as a real fidget spinner?',
      a: 'Same idea, different material. A real one has a metal bearing and a plastic body you hold between your fingers; this one is on a screen, which means no weight and no sound you can feel through your hand.',
    },
  ],
  '/games/sand-cutting': [
    {
      q: 'Is it free?',
      a: 'Yes, completely free. No account, no sign-up, no download and no in-app purchase. It runs in your browser.',
    },
    {
      q: 'Does it work on a phone?',
      a: 'Yes. Drag with one finger to cut, scoop or smooth. The canvas captures touch events so the page will not scroll while you are working, and the tray resizes to fit your screen.',
    },
    {
      q: 'Do my cuts stay?',
      a: 'Yes. The sand is stored as a height map, so a cut stays exactly where you made it and at exactly the depth you cut it, however much you work on it afterwards.',
    },
    {
      q: 'What is the difference between slicing, scooping and smoothing?',
      a: 'Slice cuts a straight trench and leaves a raised edge. Scoop digs a rounded crater and piles the removed sand around its rim. Smooth presses an area back to flat.',
    },
    {
      q: 'Is this the same as real kinetic sand?',
      a: 'Same material behaviour, none of the mess. Real kinetic sand holds a cut edge exactly like this — it is about 98% sand and 2% silicone oil — but it also gets everywhere. This version behaves the same way and stays on the screen.',
    },
  ],
}
