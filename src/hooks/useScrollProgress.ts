import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Maps window scroll over the hero's ~90vh range to a 0-1 progress value,
 * exposed as a ref so the hero's rAF loop can read it without re-renders.
 */
export function useScrollProgress() {
  const progress = useRef(0)

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: () => window.innerHeight * 0.9,
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress
      },
    })
  })

  return progress
}
