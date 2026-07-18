import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OutlineWord } from './OutlineWord'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const SERVICES = [
  {
    number: '01',
    title: 'Schließfächer',
    text: 'Legitime Schließfächer, für Dinge, die Sie nicht zu Hause aufbewahren sollten.',
    image: '/img/box-1984.webp',
    alt: 'Geöffnetes Schließfach mit der Nummer 1984',
  },
  {
    number: '02',
    title: 'Data Storage',
    text: 'Unser Data Storage mit Hochsicherheits-Schließfächern für Ihre sensiblen Daten.',
    image: '/img/vault-corridor.webp',
    alt: 'Korridor im Tresorraum mit Schließfachwänden',
  },
  {
    number: '03',
    title: 'Bürodienste',
    text: 'Sicherheits-Meetings im Verhandlungsraum bzw. Konferenzraum.',
    image: '/img/discretion-room.webp',
    alt: 'Diskretionsraum für vertrauliche Meetings',
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = sectionRef.current
      if (!el) return
      const cards = el.querySelectorAll('[data-reveal]')

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none none' },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section id="leistungen" ref={sectionRef} className="relative bg-black py-16 px-6 sm:py-24">
      <OutlineWord word="SICHERHEIT" align="right" position="top-0" />

      <div className="relative z-10">
        <h2 className="font-display text-center text-3xl font-extralight text-white">
          Diskret &amp; transparent
        </h2>
        <p className="mt-3 text-center text-sm text-neutral-500">Wir bieten Ihnen:</p>
      </div>

      <div className="relative z-10 mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
        {SERVICES.map((service) => (
          <div
            key={service.number}
            data-reveal
            className="service-card group relative overflow-hidden rounded-lg"
          >
            <img
              src={service.image}
              alt={service.alt}
              loading="lazy"
              className="service-card-img absolute inset-0 h-full w-full scale-100 object-cover grayscale-[45%] transition-all duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,transparent_45%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="font-display text-sm text-neutral-500">{service.number}</span>
              <div className="service-card-line mt-3 h-[2px] w-0 bg-[#da3020] transition-all duration-500 ease-out group-hover:w-8" />
              <h3 className="font-display mt-3 text-2xl font-light text-white sm:text-3xl">
                {service.title}
              </h3>
              <p className="mt-3 line-clamp-3 max-w-[36ch] text-sm leading-relaxed text-neutral-300">
                {service.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
