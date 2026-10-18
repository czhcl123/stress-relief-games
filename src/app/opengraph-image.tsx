import { ImageResponse } from 'next/og'
import { siteName } from '@/lib/seo'

export const alt = 'Stress Relief Games — free online relaxing and satisfying games'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  const bubbles = [
    { size: 130, color: '#a78bfa' },
    { size: 90, color: '#c4b5fd' },
    { size: 70, color: '#8b5cf6' },
    { size: 56, color: '#ddd6fe' },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #4c1d95 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22 }}>
          {bubbles.map((b, i) => (
            <div
              key={i}
              style={{
                width: b.size,
                height: b.size,
                borderRadius: b.size / 2,
                background: b.color,
                display: 'flex',
              }}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 84,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: -1,
          }}
        >
          {siteName}
        </div>
        <div style={{ marginTop: 24, fontSize: 36, color: '#c4b5fd' }}>
          Pop · Squish · Rake · Squeeze — free, no download
        </div>
      </div>
    ),
    size
  )
}
