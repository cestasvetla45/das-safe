import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const TEXT = 'DISKRET · SICHER · PRIVAT · SEIT 1984 · WIEN · '

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    gsap.to(track, {
      xPercent: -50,
      duration: 24,
      ease: 'linear',
      repeat: -1,
    })
  })

  return (
    <div className="overflow-hidden border-y border-neutral-900 bg-black py-6 sm:py-8">
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden={i === 1}
            className="text-stroke font-display px-2 text-[2.5rem] font-medium uppercase leading-none sm:text-[5rem]"
          >
            {TEXT.repeat(4)}
          </span>
        ))}
      </div>
    </div>
  )
}
