import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** Fixed 2px indicator at the very top of the viewport, above the nav border,
 * scaling from 0 to 1 across the full document scroll range. */
export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    gsap.set(ref.current, { scaleX: 0, transformOrigin: 'left center' })
    ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: true,
      onUpdate: (self) => {
        if (ref.current) gsap.set(ref.current, { scaleX: self.progress })
      },
    })
  })

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[25] h-[2px] bg-[#da3020]"
      aria-hidden="true"
    />
  )
}
