export interface GameComparisonRow {
  href: string
  name: string
  kind: 'game' | 'tool'
  bestFor: string
  session: string
  sound: string
  input: string
  evidence: string
}

/**
 * Structured comparison for the /games hub. The evidence column is deliberately
 * conservative: none of these games or tools has a direct clinical trial behind it.
 */
export const gameComparison: GameComparisonRow[] = [
  {
    href: '/games/bubble-wrap',
    name: 'Bubble Wrap Popper',
    kind: 'game',
    bestFor: 'Restless hands; a clear finish line',
    session: '2–5 min',
    sound: 'Yes (synth pops)',
    input: 'Click / tap / drag',
    evidence: 'Indirect (micro-breaks, fidgeting)',
  },
  {
    href: '/games/slime-simulator',
    name: 'Slime Simulator',
    kind: 'game',
    bestFor: 'Slow, tactile wind-down',
    session: '2–4 min',
    sound: 'Yes (ASMR squish)',
    input: 'Drag / poke',
    evidence: 'Indirect (ASMR, pleasant touch)',
  },
  {
    href: '/games/zen-garden',
    name: 'Zen Garden',
    kind: 'game',
    bestFor: 'Quiet, no-goal focus',
    session: '3–10 min',
    sound: 'No',
    input: 'Drag to rake',
    evidence: 'Indirect (nature restoration)',
  },
  {
    href: '/games/stress-ball',
    name: 'Stress Relief Ball',
    kind: 'game',
    bestFor: 'Quick physical release',
    session: '1–3 min',
    sound: 'Yes (soft squish / thud)',
    input: 'Drag / throw',
    evidence: 'Indirect (progressive relaxation)',
  },
  {
    href: '/games/fidget-spinner',
    name: 'Fidget Spinner',
    kind: 'game',
    bestFor: 'Rhythmic movement; short focus break',
    session: '1–3 min',
    sound: 'Yes (bearing hum)',
    input: 'Drag / flick',
    evidence: 'Mixed (ADHD / fidget studies)',
  },
  {
    href: '/games/sand-cutting',
    name: 'Sand Cutting',
    kind: 'game',
    bestFor: 'Precise, visual sensory focus',
    session: '2–5 min',
    sound: 'Yes (ASMR cuts)',
    input: 'Drag with tools',
    evidence: 'Indirect (ASMR, touch)',
  },
  {
    href: '/games/breathing',
    name: 'Box Breathing',
    kind: 'tool',
    bestFor: 'Winding down; before a task',
    session: '2–5 min',
    sound: 'No',
    input: 'Start / pause',
    evidence: 'Indirect (slow breathing)',
  },
  {
    href: '/games/rain-sounds',
    name: 'Rain Sounds',
    kind: 'tool',
    bestFor: 'Steady background noise',
    session: '10–60 min',
    sound: 'Yes (synth rain)',
    input: 'Play / intensity',
    evidence: 'Indirect (sound masking)',
  },
  {
    href: '/games/lava-lamp',
    name: 'Lava Lamp',
    kind: 'tool',
    bestFor: 'Visual wind-down',
    session: '3–10 min',
    sound: 'No',
    input: 'Palette / speed',
    evidence: 'Anecdotal (visual)',
  },
  {
    href: '/games/mandala',
    name: 'Mandala Drawing',
    kind: 'tool',
    bestFor: 'Creative focus',
    session: '5–15 min',
    sound: 'No',
    input: 'Draw / download',
    evidence: 'Indirect (art, mindfulness)',
  },
  {
    href: '/games/worry-jar',
    name: 'Worry Jar',
    kind: 'tool',
    bestFor: 'Racing thoughts; before bed',
    session: '2–5 min',
    sound: 'No',
    input: 'Type / release',
    evidence: 'Indirect (expressive writing)',
  },
  {
    href: '/games/pop-it',
    name: 'Pop It',
    kind: 'tool',
    bestFor: 'Restless hands; quick fidget',
    session: '1–3 min',
    sound: 'Yes (synth pops)',
    input: 'Tap / click',
    evidence: 'Indirect (fidgeting)',
  },
]
