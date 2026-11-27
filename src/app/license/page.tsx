import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import { siteName, siteUrl } from '@/lib/seo'

const title = 'License Calm-Down Games for Your School, Clinic or Team'
const description =
  'Embed 12 quiet, ad-free browser games and calm tools on a school counseling page, clinic site or staff intranet. No student accounts, no tracking, no ads. Free for personal use; organization licenses from $29/month.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/license' },
  openGraph: {
    type: 'website',
    url: '/license',
    siteName,
    title,
    description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
}

const contactEmail = 'hello@stress-relief-games.com'
const proCheckout = process.env.NEXT_PUBLIC_STRIPE_LICENSE_PRO
const whiteCheckout = process.env.NEXT_PUBLIC_STRIPE_LICENSE_WHITE

const mailto = (subject: string) =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`

const plans = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    summary: 'For a personal blog, a hobby page, or trying the games in your own classroom.',
    features: [
      'All 12 games and calm tools',
      'Public embed snippet',
      '“Powered by” credit link',
      'Email support, best effort',
    ],
    cta: 'Get the embed code',
    href: '/embed',
    secondary: null as string | null,
    featured: false,
  },
  {
    name: 'Organization',
    price: '$29',
    cadence: 'per month',
    summary: 'For one school, clinic or team that needs a clean, branded embed and a real invoice.',
    features: [
      'Everything in Free',
      'Remove the credit link',
      'Your logo in the embed header',
      'One domain',
      'Email support within 2 business days',
      'Annual invoice or purchase order',
      '14-day trial',
    ],
    cta: 'Start a 14-day trial',
    href: mailto('Organization license — 14-day trial'),
    secondary: proCheckout ?? null,
    featured: true,
  },
  {
    name: 'White-label',
    price: '$99',
    cadence: 'per month',
    summary: 'For a platform, agency or multi-site organization that needs the games to look like their own.',
    features: [
      'Everything in Organization',
      'Remove all Stress Relief Games branding',
      'Custom accent colour',
      'Unlimited domains',
      'Self-hosted bundle',
      'Priority support',
    ],
    cta: 'Talk to us',
    href: mailto('White-label license'),
    secondary: whiteCheckout ?? null,
    featured: false,
  },
]

const audiences = [
  {
    title: 'School counselors',
    body: 'A calm-down corner on the counseling page that works on the Chromebooks and tablets students already use. No app install, no student account.',
  },
  {
    title: 'Therapists and coaches',
    body: 'A between-session tool for grounding, fidgeting or a two-minute reset. Send a link; there is nothing for the client to sign up for.',
  },
  {
    title: 'HR and wellness teams',
    body: 'A quiet break on the staff intranet that does not track employees, send notifications, or turn a break into another feed.',
  },
  {
    title: 'Libraries and coworking spaces',
    body: 'A public screen that is safe to leave open: no ads, no chat, no accounts, no infinite scroll.',
  },
]

const faqs = [
  {
    q: 'Is the free embed still free?',
    a: 'Yes. The public embed code on /embed stays free, including the credit link. The license is for organizations that need the credit removed, their own logo, support, or an invoice.',
  },
  {
    q: 'What does a license actually add?',
    a: 'Three things: branding control (remove the credit link or all of our branding), support with a response-time commitment, and paperwork your finance team can process — an invoice, a purchase order, or an annual contract.',
  },
  {
    q: 'Do you collect student or patient data?',
    a: 'No. The games have no accounts, no login, no chat and no personal-data forms. The public site loads one privacy-friendly analytics script that counts page loads anonymously. The embed loads the same page, so we see an anonymous page load — not who viewed it.',
  },
  {
    q: 'Is this COPPA or FERPA compliant?',
    a: 'We designed it to avoid collecting personal data, which makes a compliance review simpler, but we are not your compliance officer and we do not provide legal advice. Your institution should review the data flow. We can send a one-page summary of what the embed loads and stores (nothing personal).',
  },
  {
    q: 'Can we host the games ourselves?',
    a: 'Yes, on the White-label plan. You receive a self-hosted bundle and a license to serve it from your own infrastructure. The public embed is not affected.',
  },
  {
    q: 'Do you offer a trial?',
    a: 'Yes — 14 days, by email. Tell us the organization and the domain, and we will send a trial snippet. No credit card is required for the trial.',
  },
  {
    q: 'Can we pay by invoice or purchase order?',
    a: 'Yes. Annual plans can be invoiced. Send the organization name, billing address, and any PO number to the contact address below.',
  },
  {
    q: 'Can we cancel?',
    a: 'Yes, anytime. A monthly plan stays active until the end of the paid month; an annual plan stays active until the end of the paid year. We do not trap the embed behind a cancellation flow.',
  },
  {
    q: 'Do you offer a discount for Title I schools or small nonprofits?',
    a: 'We keep a small budget for that. Write to us with a sentence about the organization; if we can, we will.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Stress Relief Games — Organization License',
  serviceType: 'Embeddable calm-down browser games for schools, clinics and teams',
  description:
    'A license to embed ad-free, account-free calm-down browser games on a school, clinic or staff website, with optional white-label branding and support.',
  provider: { '@id': `${siteUrl}/#organization` },
  areaServed: 'Worldwide',
  offers: [
    {
      '@type': 'Offer',
      name: 'Organization',
      price: '29',
      priceCurrency: 'USD',
      url: `${siteUrl}/license`,
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'White-label',
      price: '99',
      priceCurrency: 'USD',
      url: `${siteUrl}/license`,
      availability: 'https://schema.org/InStock',
    },
  ],
}

export default function LicensePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'License', href: '/license' },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-400">
            For schools, clinics and teams
          </p>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            License calm-down games for your website
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-400">
            Embed 12 quiet, ad-free browser games and calm tools on a counseling page, classroom site or staff
            intranet. No student accounts, no tracking, no ads. The public games stay free; a
            license is for organizations that need branding, support and paperwork.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={mailto('Organization license — 14-day trial')}
              className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Start a 14-day trial
            </a>
            <a
              href="#pricing"
              className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-violet-500 hover:text-white"
            >
              See pricing
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            No credit card for the trial · Cancel anytime · Invoice or purchase order available
          </p>
        </header>

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 text-sm text-slate-400 sm:grid-cols-4">
          {['No ads', 'No accounts', 'No personal data', 'Works on mobile'].map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-center"
            >
              <span aria-hidden="true" className="text-violet-400">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <section className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Who it is for</h2>
            <p className="mt-3 leading-relaxed text-slate-400">
              The games are deliberately small: a clear start, a clear finish, and no reason to stay
              longer than a few minutes. That is the point.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {audiences.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="mt-16 scroll-mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Pricing</h2>
            <p className="mt-3 leading-relaxed text-slate-400">
              One license covers one organization. Prices are in USD. The public embed stays free
              either way.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  plan.featured
                    ? 'border-violet-500 bg-slate-800/70 shadow-xl shadow-violet-500/10'
                    : 'border-slate-800 bg-slate-900/40'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                    Most common
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-slate-500">{plan.cadence}</span>
                </p>
                <p className="mt-2 min-h-12 text-sm leading-relaxed text-slate-400">
                  {plan.summary}
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span aria-hidden="true" className="mt-0.5 text-violet-400">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-2">
                  <a
                    href={plan.href}
                    className={`block rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition ${
                      plan.featured
                        ? 'bg-violet-600 text-white hover:bg-violet-500'
                        : 'border border-slate-700 text-slate-200 hover:border-violet-500 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </a>
                  {plan.secondary && (
                    <a
                      href={plan.secondary}
                      className="block text-center text-xs text-slate-500 underline underline-offset-2 transition hover:text-slate-300"
                    >
                      Buy now
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
            Need a purchase order, a 30-day pilot, or a quote for multiple sites? Email{' '}
            <a
              className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
              href={mailto('License quote / purchase order')}
            >
              {contactEmail}
            </a>{' '}
            with the organization name and the number of sites.
          </p>
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">How it works</h2>
            <ol className="mt-6 space-y-4">
              {[
                'Choose a plan, or start with the free embed and upgrade when you need the credit removed.',
                'We send a license key and the embed snippet — or a self-hosted bundle on the White-label plan.',
                'Paste the snippet into your page. No build step, no API key, no student login.',
              ].map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-sm font-semibold text-violet-300">
                    {index + 1}
                  </span>
                  <p className="pt-1 leading-relaxed text-slate-300">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Why organizations choose this</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: 'Nothing to sign up for, nothing to monitor.',
                  body: 'There are no accounts, no chat, no notifications and no user-generated content. A student or client can open a game and close it; there is no profile left behind.',
                },
                {
                  title: 'Designed to end.',
                  body: 'No streaks, no leaderboards that punish leaving, no infinite feed. The games have a clear finish because the goal is a short break, not more time on site.',
                },
                {
                  title: 'Runs on the devices you already have.',
                  body: 'Desktop Chrome and Edge, Android Chrome, and touch screens. Nothing to install. The games are static pages served from the edge.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
                >
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-6 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3"
                >
                  <summary className="cursor-pointer font-semibold text-white">{faq.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-3xl rounded-2xl border border-violet-500/30 bg-violet-500/5 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Start with a 14-day trial</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-400">
            Tell us the organization and the domain. We will send a trial snippet and a one-page
            data-flow summary you can forward to whoever handles compliance.
          </p>
          <a
            href={mailto('Organization license — 14-day trial')}
            className="mt-6 inline-block rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Request the trial
          </a>
          <p className="mt-4 text-xs text-slate-500">
            The public games remain free and ad-free. Licensing pays for the work behind them.
          </p>
        </section>
      </div>
    </>
  )
}
