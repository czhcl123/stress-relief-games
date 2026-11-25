import type { Metadata } from 'next'
import { authorName, siteName, siteUrl } from '@/lib/seo'

const title = 'Terms of Use'
const description =
  'The terms that apply when you use Stress Relief Games: free browser games provided as-is, acceptable use, and contact details.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/terms' },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/terms`,
    title: `${title} | ${siteName}`,
    description,
  },
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-slate-300">
      <h1 className="mb-2 text-4xl font-bold text-white">Terms of Use</h1>
      <p className="mb-8 text-sm text-slate-500">Last updated November 25, 2026</p>

      <div className="space-y-6 leading-relaxed">
        <p>
          These terms apply when you use {siteName}. By using the site, you agree to them. If
          you do not agree, please do not use the site.
        </p>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">The service</h2>
          <p>
            {siteName} provides free browser-based games and guides. The games are provided
            &quot;as is&quot; and &quot;as available&quot;. We do not promise that the site will
            be uninterrupted, error-free, or available on every device.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Not medical advice</h2>
          <p>
            The site is for general information and relaxation. It is not medical advice, and
            using it does not create a doctor-patient relationship. If stress or anxiety is
            affecting your daily life, speak to a qualified professional. See the{' '}
            <a
              className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
              href="/disclaimer"
            >
              full disclaimer
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Acceptable use</h2>
          <p>
            You may play the games, embed them using the provided embed code, and link to the
            site. You may not attempt to disrupt the site, attack its infrastructure, scrape it
            at a volume that degrades service, or use it for unlawful activity.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Intellectual property</h2>
          <p>
            The games, code, text, and visual design are owned by {authorName} or used with
            permission. You may not copy or redistribute the games as your own product. Short
            quotations from the guides with a link back to the original page are welcome.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">External links</h2>
          <p>
            The guides link to research papers and other external sites. We are not responsible
            for their content or availability.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Changes</h2>
          <p>
            We may update these terms as the site changes. The date at the top of this page
            shows the latest version. Continued use of the site after a change means you accept
            the updated terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a
              className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
              href="mailto:hello@stress-relief-games.com"
            >
              hello@stress-relief-games.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
