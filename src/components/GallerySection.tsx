import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const PANORAMA = {
  src: '/img/facility-corridor.webp',
  alt: 'Korridor der Hochsicherheitsanlage im Palais Auersperg',
  label: 'DIE ANLAGE',
  heading: 'Hinter den Mauern des Palais',
}

const ROWS = [
  {
    src: '/img/box-1984.webp',
    alt: 'Geöffnetes Schließfach mit der Nummer 1984',
    label: 'SEIT 1984',
    heading: 'Jedes Fach eine Festung',
    text: 'Zwei Schlüssel, ein Nummernschild, absolute Anonymität. Unsere Schließfächer funktionieren heute wie am ersten Tag — nur die Technik dahinter ist von morgen.',
    imageSide: 'left' as const,
  },
  {
    src: '/img/vault-door.webp',
    alt: 'Massive Tresortür aus Stahl',
    label: '1.000 TONNEN',
    heading: 'Stahlbeton und Panzerstahl',
    text: 'Eine Tresortür, wie sie nur wenige Banken besitzen, trennt Ihre Werte von der Außenwelt. Rund um die Uhr überwacht, still und unbestechlich.',
    imageSide: 'right' as const,
  },
  {
    src: '/img/vault-corridor.webp',
    alt: 'Korridor im Tresorraum mit Schließfachwänden',
    label: 'DER TRESORRAUM',
    heading: 'Präzision bis ins Detail',
    text: 'Klimatisiert, versichert und diskret: Der Tresorraum im Herzen des Palais Auersperg verbindet Wiener Tradition mit modernster Sicherheitstechnik.',
    imageSide: 'left' as const,
  },
]

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = sectionRef.current
      if (!el) return

      const images = el.querySelectorAll('[data-reveal]')
      gsap.fromTo(
        images,
        { opacity: 0, y: 40, scale: 0.95 },
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

      const texts = el.querySelectorAll<HTMLElement>('[data-reveal-text]')
      texts.forEach((text) => {
        const x = Number(text.dataset.x)
        gsap.fromTo(
          text,
          { opacity: 0, x },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: 0.15,
            ease: 'power2.out',
            scrollTrigger: { trigger: text, start: 'top 85%', toggleActions: 'play none none none' },
          },
        )
      })

      const wrappers = el.querySelectorAll<HTMLElement>('[data-parallax]')
      wrappers.forEach((wrapper, i) => {
        const direction = i % 2 === 0 ? 1 : -1
        gsap.fromTo(
          wrapper,
          { yPercent: -6 * direction },
          {
            yPercent: 6 * direction,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="einblicke" ref={sectionRef} className="bg-black py-16 px-6 sm:py-24">
      <span className="font-display mb-8 block text-center text-sm tracking-[0.3em] uppercase text-neutral-500 sm:mb-10">
        Einblicke
      </span>

      <div className="mx-auto max-w-6xl">
        <div data-reveal className="relative overflow-hidden rounded-lg">
          <div className="aspect-[21/9] w-full overflow-hidden">
            <div data-parallax className="h-[112%] w-full will-change-transform">
              <img
                src={PANORAMA.src}
                alt={PANORAMA.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,transparent_45%)]" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <span className="text-xs uppercase tracking-[0.3em] text-[#da3020]">{PANORAMA.label}</span>
            <h3 className="font-display mt-2 text-2xl font-light text-white sm:text-4xl">
              {PANORAMA.heading}
            </h3>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-16 sm:mt-20 sm:gap-24">
          {ROWS.map((row) => (
            <div key={row.src} className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
              <div
                data-reveal
                className={
                  row.imageSide === 'right'
                    ? 'md:col-span-7 md:col-start-6 md:order-2'
                    : 'md:col-span-7 md:col-start-1 md:order-1'
                }
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <div data-parallax className="h-[112%] w-full will-change-transform">
                    <img
                      src={row.src}
                      alt={row.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div
                data-reveal-text
                data-x={row.imageSide === 'right' ? -40 : 40}
                className={
                  row.imageSide === 'right'
                    ? 'md:col-span-4 md:col-start-1 md:order-1'
                    : 'md:col-span-4 md:col-start-9 md:order-2'
                }
              >
                <span className="text-xs uppercase tracking-[0.3em] text-[#da3020]">{row.label}</span>
                <h3 className="font-display mt-3 text-2xl font-light text-white sm:text-4xl">
                  {row.heading}
                </h3>
                <p className="mt-4 max-w-[44ch] leading-relaxed text-neutral-400">{row.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
