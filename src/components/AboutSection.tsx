import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OutlineWord } from './OutlineWord'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = sectionRef.current
      if (!el) return
      const left = el.querySelector('[data-reveal-left]')
      const right = el.querySelector('[data-reveal-right]')

      if (left) {
        gsap.fromTo(
          left,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
          },
        )
      }
      if (right) {
        gsap.fromTo(
          right,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
          },
        )
      }
    },
    { scope: sectionRef },
  )

  return (
    <section id="ueber-uns" ref={sectionRef} className="relative bg-black py-16 px-6 sm:py-24">
      <OutlineWord word="WIEN" align="left" />

      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2">
        <div data-reveal-left>
          <span className="font-display text-sm tracking-[0.3em] uppercase text-neutral-500">Über uns</span>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-300">
            Das Safe ist ein sehr traditioneller, konservativer familiär geführter Betrieb mit
            Fokus auf Sicherheit rund um Wertgegenstände, Daten oder Verhandlungen. Seit 1984
            kümmern wir uns um das Absichern Ihrer wichtigen Dinge vom Schmuck über Dokumente bis
            hin zu Münzen oder Datenbändern und bieten Ihnen dafür Tresorschließfächer der
            höchsten Sicherheitsstufe zum Mieten. Unsere Mitarbeiter sind hervorragend geschult,
            vertrauenswürdig und absolut diskret – denn Ihre Privatsphäre hat für uns Priorität!
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-300">
            Es würde uns sehr freuen, wenn Sie uns persönlich besuchen, um sich von unserem
            Angebot zu überzeugen. DAS SAFE befindet sich im Palais Auersperg, nahe beim
            Parlament, in einer sehr angenehmen Gegend mitten im schönen Wien. Wir legen großen
            Wert auf ein konservatives Umfeld und haben unsere Räumlichkeiten darum auch
            luxuriös und einladend gestaltet. Sie werden sich schon beim Eintreten wohlfühlen,
            das versprechen wir!
          </p>
          <p className="mt-6 text-sm italic text-neutral-500">
            Ihr DAS SAFE TEAM in 1080 Wien
          </p>
        </div>

        <div data-reveal-right className="aspect-[4/5] overflow-hidden rounded-lg bg-[#111]">
          <img
            src="/img/discretion-room.webp"
            alt="Diskretionsraum im Palais Auersperg"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
