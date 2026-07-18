import { Fragment, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const STATEMENT = 'Unser Ziel: Ihr Recht auf Diskretion und Privatsphäre!'

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const words = STATEMENT.split(' ')

  useGSAP(
    () => {
      const el = sectionRef.current
      if (!el) return
      const targets = el.querySelectorAll('[data-reveal]')
      const line = el.querySelector('[data-line]')
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduceMotion) {
        gsap.fromTo(
          targets,
          { opacity: 0.15 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.04,
            scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none none' },
          },
        )
        gsap.fromTo(
          line,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.6,
            scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none none' },
          },
        )
        return
      }

      gsap.set(targets, { opacity: 0.15 })
      gsap.set(line, { opacity: 0, scaleX: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.4,
        },
      })

      tl.to(targets, { opacity: 1, stagger: 0.5, ease: 'none' }).to(
        line,
        { opacity: 1, scaleX: 1, duration: 0.5, ease: 'none' },
        '-=0.3',
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center bg-black px-6 py-16 sm:py-32"
    >
      <h2 className="max-w-4xl text-center font-extralight text-3xl sm:text-5xl text-white tracking-tight leading-tight">
        {words.map((word, i) => (
          // The separating space must live OUTSIDE the inline-block span —
          // trailing collapsible whitespace inside an inline-block is stripped.
          <Fragment key={i}>
            <span data-reveal className="inline-block">
              {word}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </h2>
      <div data-line className="mt-8 h-px w-[60px] bg-[#da3020]" />
    </section>
  )
}
