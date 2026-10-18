export default function Home() {
  const games = [
    {
      href: '/games/bubble-wrap',
      emoji: '🫧',
      title: 'Bubble Wrap Popper',
      desc: 'Pop virtual bubble wrap! Satisfying sounds, endless bubbles.',
      tags: ['satisfying', 'zen'],
    },
    {
      href: '/games/slime-simulator',
      emoji: '🟢',
      title: 'Slime Simulator',
      desc: 'Stretch and poke colorful slime. ASMR sounds included.',
      tags: ['relaxing', 'asmr'],
    },
    {
      href: '/games/zen-garden',
      emoji: '🪨',
      title: 'Zen Garden',
      desc: 'Arrange stones, rake sand, find your calm.',
      tags: ['calming', 'creative'],
    },
    {
      href: '/games/stress-ball',
      emoji: '🏀',
      title: 'Stress Relief Ball',
      desc: 'Squeeze and bounce a virtual stress ball.',
      tags: ['fidget', 'quick'],
    },
    {
      href: '#',
      emoji: '🔄',
      title: 'Fidget Spinner',
      desc: 'Spin a virtual fidget spinner with realistic physics.',
      tags: ['fidget', 'satisfying'],
      coming: true,
    },
    {
      href: '#',
      emoji: '🏖️',
      title: 'Sand Cutting',
      desc: 'Cut through sand with satisfying ASMR sounds.',
      tags: ['asmr', 'satisfying'],
      coming: true,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Free Online <span className="text-violet-400">Stress Relief</span> Games
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Take a break. Pop some bubble wrap, stretch some slime, or spin a fidget toy.
          No signup, no download — just click and relax.
        </p>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <a
            key={game.title}
            href={game.coming ? undefined : game.href}
            className={`group block rounded-2xl border p-6 transition-all ${
              game.coming
                ? 'border-slate-800 bg-slate-900/40 cursor-default'
                : 'border-slate-700 bg-slate-800/50 hover:border-violet-500 hover:bg-slate-800 hover:shadow-lg hover:shadow-violet-500/10'
            }`}
          >
            <div className="text-4xl mb-3">{game.emoji}</div>
            <h2 className="text-xl font-semibold mb-2">
              {game.title}
              {game.coming && (
                <span className="ml-2 text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              )}
            </h2>
            <p className="text-slate-400 text-sm mb-3">{game.desc}</p>
            <div className="flex gap-2 flex-wrap">
              {game.tags.map((tag) => (
                <span key={tag} className="text-xs bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Why Play Stress Relief Games?</h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          Studies show that brief mental breaks with simple, repetitive activities can reduce cortisol levels
          and improve focus. Our free online games give you that micro-break — pop some virtual bubble wrap,
          spin a fidget toy, or arrange a zen garden. No accounts, no downloads, no distractions.
        </p>
        <p className="text-slate-400 leading-relaxed">
          Whether you&apos;re at work, school, or just need a moment to decompress, these satisfying games
          are designed to help you relax in under 5 minutes. Pick a game above and start unwinding.
        </p>
      </div>
    </div>
  )
}