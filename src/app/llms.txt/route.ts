// LLM-friendly site index following the llmstxt.org standard.
// Served at /llms.txt so GPTBot, ClaudeBot, and other LLM crawlers can
// discover every game page with a one-sentence description.
const SITE = 'https://stress-relief-games-production.up.railway.app'

const body = `# Stress Relief Games

> Free online stress relief games you can play in your browser — pop bubble wrap, stretch slime, spin a fidget spinner, rake a zen garden, squeeze a stress ball, or cut kinetic sand. No signup, no download, no ads. Each game is a short, satisfying break designed to lower stress in under five minutes.

## Games
- [Bubble Wrap Popper](${SITE}/games/bubble-wrap): Pop 192 virtual bubble wrap bubbles with satisfying popping sounds. Includes Zen mode and Speed mode.
- [Slime Simulator](${SITE}/games/slime-simulator): Stretch, poke, and squish six types of virtual slime with realistic physics and ASMR squish sounds.
- [Zen Garden](${SITE}/games/zen-garden): Arrange stones, rake sand, and place plants in a relaxing Japanese-style rock garden.
- [Stress Relief Ball](${SITE}/games/stress-ball): Squeeze, throw, and bounce a virtual stress ball. Six ball types with realistic squish physics.
- [Fidget Spinner](${SITE}/games/fidget-spinner): Flick a virtual fidget spinner with realistic spin physics. Six designs, variable friction, bearing hum that rises with RPM.
- [Sand Cutting](${SITE}/games/sand-cutting): Slice, scoop, and smooth virtual kinetic sand. Six sand colors, three tools, crisp ASMR cutting sounds.

## Site info
- [Home](${SITE}/): Browse all six stress relief games on one page.
- [Sitemap](${SITE}/sitemap.xml): Full XML sitemap of every game page.
`

export function GET() {
  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
