import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface Stat {
  value: number
  suffix: string
  format: (n: number) => string
  label: string
  countUp: boolean
}

const STATS: Stat[] = [
  {
    value: 1000,
    suffix: '',
    format: (n) => n.toLocaleString('de-DE'),
    label: 'Tonnen Stahlbeton',
    countUp: true,
  },
  {
    value: 0,
    suffix: '',
    format: () => '24/7',
    label: 'Videoüberwachung',
    countUp: false,
  },
  {
    value: 40,
    suffix: '+',
    format: (n) => String(n),
    label: 'Jahre Erfahrung',
    countUp: true,
  },
  {
    value: 1080,
    suffix: '',
    format: (n) => String(n),
    label: 'Wien, Palais Auersperg',
    countUp: true,
  },
]

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = sectionRef.current
      if (!el) return
      const items = el.querySelectorAll<HTMLElement>('[data-stat]')

      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        },
      )

      items.forEach((item) => {
        const numeral = item.querySelector<HTMLElement>('[data-numeral]')
        if (!numeral) return
        const index = Number(item.dataset.index)
        const stat = STATS[index]
        if (!stat || !stat.countUp) return

        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: stat.value,
          duration: 1.6,
          ease: 'power1.out',
          snap: { val: 1 },
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          onUpdate: () => {
            numeral.textContent = `${stat.format(proxy.val)}${stat.suffix}`
          },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="border-y border-neutral-900 bg-black px-6 py-10 sm:py-16"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div key={stat.label} data-stat data-index={i} className="text-center">
            <div
              data-numeral
              className="font-display text-4xl font-medium leading-none text-white sm:text-6xl"
            >
              {stat.countUp ? '0' : stat.format(0)}
            </div>
            <p className="font-display mt-3 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
