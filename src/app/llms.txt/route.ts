import { siteUrl } from '@/lib/seo'
import { collections } from '@/lib/collections'
import { games } from '@/lib/games'
import { posts, postHref } from '@/lib/posts'

// LLM-friendly site index following the llmstxt.org standard.
// Served at /llms.txt so GPTBot, ClaudeBot, and other LLM crawlers can
// discover every page with a one-sentence description.
// Derived from siteUrl so it can never drift from the canonical domain.
const SITE = siteUrl

// Generated from the same registries as the sitemap and the /blog index, so a
// new game, tool or guide can never be missing here.
const gameLines = games
  .map((game) => `- [${game.title}](${SITE}${game.href}): ${game.llmsDescription}`)
  .join('\n')

const guides = posts
  .map((post) => `- [${post.title}](${SITE}${postHref(post)}): ${post.description}`)
  .join('\n')

const collectionLines = collections
  .map((collection) => `- [${collection.h1}](${SITE}/${collection.slug}): ${collection.description}`)
  .join('\n')

const body = `# Stress Relief Games

> Free online stress relief games and calm tools you can play in your browser — pop bubble wrap, stretch slime, spin a fidget spinner, rake a zen garden, squeeze a stress ball, cut kinetic sand, follow a breathing circle, play rain sounds, draw a mandala, or use a worry jar. No signup, no download, no ads. Each is a short, satisfying break — most sessions take just a couple of minutes. Written and maintained by Chen Lei.

## Games & Tools
${gameLines}

## Collections
${collectionLines}

## Guides
${guides}

## Site info
- [Home](${SITE}/): Browse all games and tools on one page.
- [All collections](${SITE}/games#collections): Browse by mood, texture or situation.
- [All guides](${SITE}/blog): Every long-form article about how these games work and how to use them.
- [About](${SITE}/about): Who builds the site, editorial policy, and contact details.
- [Author: Chen Lei](${SITE}/authors/chen-lei): The developer and writer behind the site.
- [Privacy](${SITE}/privacy): Data handling, analytics, and contact details.
- [Terms](${SITE}/terms): Terms of use.
- [Disclaimer](${SITE}/disclaimer): General information, not medical advice.
- [Sitemap](${SITE}/sitemap.xml): Full XML sitemap of every page on the site.
`

export function GET() {
  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
