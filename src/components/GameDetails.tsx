import { gameDetails } from '@/lib/gameDetails'

/**
 * First-hand implementation, testing and limitation notes. This is the
 * Experience/Expertise layer that makes a game page more than a marketing
 * description.
 */
export default function GameDetails({ gamePath }: { gamePath: string }) {
  const detail = gameDetails[gamePath]
  if (!detail) return null

  return (
    <section className="mx-auto mt-12 max-w-3xl px-4">
      <h2 className="mb-3 text-2xl font-bold">How this game was built</h2>
      <p className="mb-6 leading-relaxed text-slate-400">{detail.built}</p>

      <h2 className="mb-3 text-2xl font-bold">What we tested</h2>
      <ul className="mb-2 list-disc space-y-2 pl-5 leading-relaxed text-slate-400">
        {detail.tested.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mb-6 text-xs leading-relaxed text-slate-500">
        Scope: tested on Chrome and Edge on desktop and Android Chrome on mobile. Safari and
        Firefox are not formally tested yet.
      </p>

      <h2 className="mb-3 text-2xl font-bold">Known limitations</h2>
      <ul className="list-disc space-y-2 pl-5 leading-relaxed text-slate-400">
        {detail.limitations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-slate-500">Last updated: {detail.updated}</p>
    </section>
  )
}
