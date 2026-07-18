import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface MarqueeProps {
  /** Repeating strip text, including its own trailing separator/spacing. */
  text: string
  /** Scrolls right-to-left (default) or left-to-right when true. */
  reverse?: boolean
  /** Tailwind font-size classes for the strip, e.g. "text-2xl sm:text-[3rem]". */
  size?: string
}

export function Marquee({
  text,
  reverse = false,
  size = 'text-[2.5rem] sm:text-[5rem]',
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      {
        xPercent: reverse ? 0 : -50,
        duration: 24,
        ease: 'linear',
        repeat: -1,
      },
    )
  })

  return (
    <div className="overflow-hidden border-y border-neutral-900 bg-black py-6 sm:py-8">
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden={i === 1}
            className={`text-stroke font-display px-2 ${size} font-medium uppercase leading-none`}
          >
            {text.repeat(4)}
          </span>
        ))}
      </div>
    </div>
  )
}
