import { ImageResponse } from 'next/og'

export const dynamic = 'force-dynamic'

const size = { width: 1200, height: 630 }

function clean(value: string | null, fallback: string, max: number) {
  const text = (value ?? '').trim()
  return (text || fallback).slice(0, max)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = clean(searchParams.get('title'), 'Stress Relief Games', 72)
  const subtitle = clean(
    searchParams.get('subtitle'),
    'Free online stress relief games — no signup, no download',
    90,
  )
  const titleSize = title.length > 52 ? 62 : title.length > 36 ? 74 : 88

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #4c1d95 100%)',
          fontFamily: 'sans-serif',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ display: 'flex', width: 48, height: 48, borderRadius: 24, background: '#a78bfa' }} />
          <div style={{ display: 'flex', fontSize: 28, color: '#c4b5fd', letterSpacing: 0.5 }}>
            Stress Relief Games
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.3,
              color: '#c4b5fd',
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
          <div style={{ display: 'flex', width: 120, height: 120, borderRadius: 60, background: '#8b5cf6' }} />
          <div style={{ display: 'flex', width: 78, height: 78, borderRadius: 39, background: '#c4b5fd' }} />
          <div style={{ display: 'flex', width: 54, height: 54, borderRadius: 27, background: '#ddd6fe' }} />
          <div style={{ display: 'flex', width: 36, height: 36, borderRadius: 18, background: '#ede9fe' }} />
        </div>
      </div>
    ),
    size,
  )
}
