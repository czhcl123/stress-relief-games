import type { Metadata } from 'next'
import { siteName, siteUrl } from '@/lib/seo'

const title = 'Disclaimer'
const description =
  'Stress Relief Games is for general information and relaxation. It is not medical advice and is not a substitute for professional care.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/disclaimer' },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/disclaimer`,
    title: `${title} | ${siteName}`,
    description,
  },
}

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-slate-300">
      <h1 className="mb-2 text-4xl font-bold text-white">Disclaimer</h1>
      <p className="mb-8 text-sm text-slate-500">Last updated November 25, 2026</p>

      <div className="space-y-6 leading-relaxed">
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">General information only</h2>
          <p>
            {siteName} publishes free browser games and short guides about stress, focus, and
            satisfying textures. The content is for general information and relaxation. It is
            not medical, psychological, or professional advice.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">No doctor-patient relationship</h2>
          <p>
            Reading the guides or playing the games does not create a doctor-patient,
            therapist-client, or other professional relationship. A browser game cannot
            diagnose or treat a health condition.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">When to seek help</h2>
          <p>
            If stress, anxiety, or low mood is affecting your sleep, work, appetite, or
            relationships for weeks at a time, talk to a doctor or a qualified mental health
            professional. If you are in immediate danger or crisis, contact your local
            emergency services or a crisis line in your country.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">No guarantees</h2>
          <p>
            The games are offered as a short break, not a treatment. Individual responses vary,
            and we make no promise that a game will reduce stress or improve focus for you.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">External sources</h2>
          <p>
            Guides may cite research papers and link to external sites. We try to describe the
            evidence accurately, but we do not control those sources and are not responsible
            for their content.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Contact</h2>
          <p>
            If you believe something on the site is inaccurate, email{' '}
            <a
              className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
              href="mailto:hello@stress-relief-games.com"
            >
              hello@stress-relief-games.com
            </a>
            . Corrections are welcome.
          </p>
        </section>
      </div>
    </div>
  )
}
