import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface OutlineWordProps {
  word: string
  /** Which edge the word hugs; text overflows toward that edge. */
  align?: 'left' | 'right'
  /** Tailwind classes controlling vertical placement within the relative ancestor. */
  position?: string
}

/**
 * Huge outlined background word, marquee-DNA styling (transparent fill,
 * hairline stroke). Absolutely positioned so it never adds layout height —
 * render it as the first child of a `relative` section/container and give
 * the real content `relative z-10` so it stacks on top.
 */
export function OutlineWord({ word, align = 'right', position = 'top-1/2 -translate-y-1/2' }: OutlineWordProps) {
  const wordRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const el = wordRef.current
    if (!el) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: reduceMotion ? 0.01 : 1.2,
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      },
    )

    if (reduceMotion) return

    gsap.fromTo(
      el,
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  })

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-clip"
    >
      <span
        ref={wordRef}
        className={[
          'outline-word font-display absolute whitespace-nowrap font-medium uppercase leading-none opacity-0',
          align === 'right' ? 'right-0 text-right' : 'left-0 text-left',
          position,
        ].join(' ')}
        style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}
      >
        {word}
      </span>
    </div>
  )
}
