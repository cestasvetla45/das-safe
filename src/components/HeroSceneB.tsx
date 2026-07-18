import { useEffect, useRef, useState } from 'react'

interface HeroSceneBProps {
  progress: React.RefObject<number>
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/**
 * Version B hero: Higgsfield-generated cinematic film of the Das Safe
 * medallion (public/hero-video.mp4). The video carries its own subtle motion,
 * so unlike a still it needs no Ken Burns drift; scrolling still drives a
 * push-in zoom, upward parallax and a dim toward black so it hands off to the
 * content sections like Version A. Falls back to a static poster image when
 * the user prefers reduced motion or the video fails to load/play.
 */
export function HeroSceneB({ progress }: HeroSceneBProps) {
  const zoomRef = useRef<HTMLDivElement>(null)
  const dimRef = useRef<HTMLDivElement>(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mql.matches) setUseFallback(true)
    const onChange = (e: MediaQueryListEvent) => setUseFallback(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const p = progress.current ?? 0
      if (zoomRef.current) {
        const scale = 1 + p * 0.35
        const y = p * -8
        zoomRef.current.style.transform = `translateY(${y}%) scale(${scale})`
      }
      if (dimRef.current) {
        dimRef.current.style.opacity = String(clamp01((p - 0.55) / 0.45) * 0.9)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progress])

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div ref={zoomRef} className="absolute inset-0 will-change-transform">
        {useFallback ? (
          <img
            src="/hero-poster.webp"
            alt=""
            draggable={false}
            className="hero-b-drift h-full w-full object-cover"
          />
        ) : (
          <video
            src="/hero-video.mp4"
            poster="/hero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            onError={() => setUseFallback(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Vignette so the frame edges stay pure black at any zoom level */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 75% at 50% 42%, transparent 45%, rgba(0,0,0,0.9) 100%)',
        }}
      />
      {/* Bottom gradient keeps the overlay text legible over the metal */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh]"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
      />

      <div ref={dimRef} className="pointer-events-none absolute inset-0 bg-black opacity-0" />
    </div>
  )
}
