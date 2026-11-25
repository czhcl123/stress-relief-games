import { siteUrl } from '@/lib/seo'

export interface BreadcrumbItem {
  name: string
  href: string
}

export default function Breadcrumbs({
  items,
  className = 'mx-auto max-w-6xl px-4 pt-4',
}: {
  items: BreadcrumbItem[]
  className?: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.href} className="flex items-center gap-1">
                {index > 0 && <span aria-hidden="true">/</span>}
                {isLast ? (
                  <span aria-current="page" className="text-slate-400">
                    {item.name}
                  </span>
                ) : (
                  <a href={item.href} className="transition hover:text-slate-300">
                    {item.name}
                  </a>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
