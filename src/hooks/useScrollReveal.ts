import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** Fades in `[data-reveal]` children (y: 20 -> 0) when the container scrolls into view. */
export function useScrollReveal<T extends HTMLElement>(options?: { stagger?: number }) {
  const ref = useRef<T>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const targets = el.querySelectorAll('[data-reveal]')
      gsap.fromTo(
        targets,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: options?.stagger ?? 0.12,
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
        },
      )
    },
    { scope: ref },
  )
  return ref
}
