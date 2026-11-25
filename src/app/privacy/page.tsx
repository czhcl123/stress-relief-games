import type { Metadata } from 'next'
import { authorName, siteName, siteUrl } from '@/lib/seo'

const title = 'Privacy Policy'
const description =
  'How Stress Relief Games handles data: no accounts, no advertising cookies, cookieless analytics, and a contact email for privacy requests.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/privacy' },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/privacy`,
    title: `${title} | ${siteName}`,
    description,
  },
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-slate-300">
      <h1 className="mb-2 text-4xl font-bold text-white">Privacy Policy</h1>
      <p className="mb-8 text-sm text-slate-500">Last updated November 25, 2026</p>

      <div className="space-y-6 leading-relaxed">
        <p>
          {siteName} is a small collection of free browser games operated by {authorName}.
          This page explains what data is and is not processed when you use the site.
        </p>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">What we do not collect</h2>
          <p>
            There are no accounts, no sign-up forms, no newsletter, and no advertising
            cookies. The games do not require you to submit any personal information, and we
            do not sell or rent personal data.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Analytics</h2>
          <p>
            The site loads Ahrefs Analytics, a cookieless analytics script that counts
            aggregate page views. It is used to understand which games and guides are useful.
            It does not set advertising cookies and is not used to build a personal profile
            of you.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Server logs</h2>
          <p>
            Our hosting provider (Railway) and, where applicable, our CDN provider
            (Cloudflare) may process standard request data such as your IP address, browser
            type, and the page requested. This is used to deliver the site, keep it secure,
            and diagnose errors. Logs are retained only as long as needed for those purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Email</h2>
          <p>
            If you email{' '}
            <a
              className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
              href="mailto:hello@stress-relief-games.com"
            >
              hello@stress-relief-games.com
            </a>
            , we receive your email address and the contents of your message. We use them only
            to reply and to fix the issue you reported.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Cookies</h2>
          <p>
            The site does not set advertising cookies and does not require cookies to
            function. If that changes, this page will be updated before any new cookie is
            introduced.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, or delete
            personal data, or to object to certain processing. To make a request, email{' '}
            <a
              className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
              href="mailto:hello@stress-relief-games.com"
            >
              hello@stress-relief-games.com
            </a>
            . We will respond within a reasonable period.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Children</h2>
          <p>
            The site is a general-audience collection of browser games and is not directed at
            children under 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">Changes</h2>
          <p>
            If this policy changes, the updated date at the top of the page will change. Material
            changes will be described here.
          </p>
        </section>
      </div>
    </div>
  )
}
