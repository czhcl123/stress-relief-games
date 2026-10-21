'use client'

import { useEffect } from 'react'

/**
 * Reports the widget's rendered height to the embedding page so the host can
 * resize the iframe instead of showing a scrollbar. Games change height with
 * width (canvas aspect ratios), so a fixed height only works for one width.
 */
export default function EmbedHeight({ slug }: { slug: string }) {
  useEffect(() => {
    const root = document.getElementById('embed-root')
    if (!root) return

    let frame = 0
    const send = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const height = Math.ceil(root.getBoundingClientRect().height)
        window.parent?.postMessage({ type: 'srg-embed-height', slug, height }, '*')
      })
    }

    send()
    const observer = new ResizeObserver(send)
    observer.observe(root)
    window.addEventListener('resize', send)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', send)
    }
  }, [slug])

  return null
}
