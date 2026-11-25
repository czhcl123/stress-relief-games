export interface GameComparisonRow {
  href: string
  name: string
  bestFor: string
  session: string
  sound: string
  input: string
  evidence: string
}

/**
 * Structured comparison for the /games hub. The evidence column is deliberately
 * conservative: none of the games has a direct clinical trial behind it.
 */
export const gameComparison: GameComparisonRow[] = [
  {
    href: '/games/bubble-wrap',
    name: 'Bubble Wrap Popper',
    bestFor: 'Restless hands; a clear finish line',
    session: '2–5 min',
    sound: 'Yes (synth pops)',
    input: 'Click / tap / drag',
    evidence: 'Indirect (micro-breaks, fidgeting)',
  },
  {
    href: '/games/slime-simulator',
    name: 'Slime Simulator',
    bestFor: 'Slow, tactile wind-down',
    session: '2–4 min',
    sound: 'Yes (ASMR squish)',
    input: 'Drag / poke',
    evidence: 'Indirect (ASMR, pleasant touch)',
  },
  {
    href: '/games/zen-garden',
    name: 'Zen Garden',
    bestFor: 'Quiet, no-goal focus',
    session: '3–10 min',
    sound: 'No',
    input: 'Drag to rake',
    evidence: 'Indirect (nature restoration)',
  },
  {
    href: '/games/stress-ball',
    name: 'Stress Relief Ball',
    bestFor: 'Quick physical release',
    session: '1–3 min',
    sound: 'Yes (soft squish / thud)',
    input: 'Drag / throw',
    evidence: 'Indirect (progressive relaxation)',
  },
  {
    href: '/games/fidget-spinner',
    name: 'Fidget Spinner',
    bestFor: 'Rhythmic movement; short focus break',
    session: '1–3 min',
    sound: 'Yes (bearing hum)',
    input: 'Drag / flick',
    evidence: 'Mixed (ADHD / fidget studies)',
  },
  {
    href: '/games/sand-cutting',
    name: 'Sand Cutting',
    bestFor: 'Precise, visual sensory focus',
    session: '2–5 min',
    sound: 'Yes (ASMR cuts)',
    input: 'Drag with tools',
    evidence: 'Indirect (ASMR, touch)',
  },
]
