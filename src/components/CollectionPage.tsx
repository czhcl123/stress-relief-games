import type { Collection } from '@/lib/collections'
import { collections } from '@/lib/collections'
import { collectionJsonLd } from '@/lib/collectionSeo'
import { games } from '@/lib/games'
import { posts, postHref } from '@/lib/posts'
import { authorName } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function CollectionPage({ collection }: { collection: Collection }) {
  const items = collection.items
    .map((href) => games.find((game) => game.href === href))
    .filter((game): game is NonNullable<typeof game> => Boolean(game))
  const guides = posts.filter((post) => collection.guideSlugs.includes(post.slug))
  const related = collections.filter((item) => collection.related.includes(item.slug))
  const jsonLd = collectionJsonLd(collection)

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Games & Tools', href: '/games' },
          { name: collection.h1, href: `/${collection.slug}` },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-violet-400">
            Collection · {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{collection.h1}</h1>
          <p className="mt-3 text-sm text-slate-500">
            By{' '}
            <a
              href="/authors/chen-lei"
              className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
            >
              {authorName}
            </a>{' '}
            · Updated November 25, 2026
          </p>
        </header>

        <section className="mx-auto mt-8 max-w-3xl space-y-4 leading-relaxed text-slate-400">
          {collection.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="mx-auto mt-10 max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold">Who it is for</h2>
          <p className="leading-relaxed text-slate-400">{collection.whoFor}</p>
        </section>

        <section className="mx-auto mt-8 max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold">How to choose</h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-slate-300">
            {collection.howToChoose.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">In this collection</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((game) => (
              <a
                key={game.href}
                href={game.href}
                className="group block rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:border-violet-500 hover:bg-slate-800 hover:shadow-lg hover:shadow-violet-500/10"
              >
                <img
                  src={game.thumb}
                  alt={game.imageAlt}
                  width={game.thumbWidth}
                  height={game.thumbHeight}
                  loading="lazy"
                  className="mb-4 aspect-video w-full rounded-xl border border-slate-700 object-cover"
                />
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {game.title}
                  {game.kind === 'tool' && (
                    <span className="ml-2 rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-300">
                      Tool
                    </span>
                  )}
                </h3>
                <p className="mb-3 text-sm text-slate-400">{game.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-700/50 px-2 py-0.5 text-xs text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {collection.note && (
          <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-slate-500">
            {collection.note}
          </p>
        )}

        {guides.length > 0 && (
          <section className="mx-auto mt-12 max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold">Read the guides</h2>
            <ul className="space-y-2">
              {guides.map((post) => (
                <li key={post.slug}>
                  <a
                    href={postHref(post)}
                    className="block rounded-xl border border-slate-800 px-4 py-3 text-sm text-slate-300 transition hover:border-violet-500 hover:bg-slate-800/50 hover:text-white"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mx-auto mt-12 max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold">Frequently asked questions</h2>
          <div className="space-y-3">
            {collection.faqs.map((faq) => (
              <details
                key={faq.q}
                className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3"
              >
                <summary className="cursor-pointer font-semibold text-white">{faq.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mx-auto mt-12 max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold">Related collections</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <a
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="rounded-xl border border-slate-800 px-4 py-3 text-sm text-slate-300 transition hover:border-violet-500 hover:bg-slate-800/50 hover:text-white"
                >
                  <span className="block font-semibold">{item.h1}</span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {item.items.length} games & tools
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        <p className="mt-12 text-center text-sm text-slate-400">
          <a
            href="/games"
            className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
          >
            See all games and tools →
          </a>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
