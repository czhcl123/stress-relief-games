export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-violet-400">404</p>
      <h1 className="mt-2 text-4xl font-bold text-white">Page not found</h1>
      <p className="mx-auto mt-4 max-w-lg leading-relaxed text-slate-400">
        The page you were looking for does not exist, or it may have moved. The games and
        guides are still here.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href="/"
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Home
        </a>
        <a
          href="/games"
          className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-violet-500 hover:text-white"
        >
          All games
        </a>
        <a
          href="/blog"
          className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-violet-500 hover:text-white"
        >
          Guides
        </a>
      </div>
    </div>
  )
}
