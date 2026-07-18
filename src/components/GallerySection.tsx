import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const IMAGES = [
  {
    src: '/img/vault-corridor.webp',
    caption: 'Tresorraum',
    alt: 'Korridor im Tresorraum mit Schließfachwänden',
    offset: false,
  },
  {
    src: '/img/box-1984.webp',
    caption: 'Schließfach Nr. 1984',
    alt: 'Geöffnetes Schließfach mit der Nummer 1984',
    offset: true,
  },
  {
    src: '/img/vault-door.webp',
    caption: 'Hinter 1.000 Tonnen Stahlbeton',
    alt: 'Massive Tresortür aus Stahl',
    offset: false,
  },
  {
    src: '/img/facility-corridor.webp',
    caption: 'Die Anlage',
    alt: 'Korridor der Hochsicherheitsanlage',
    offset: true,
  },
]

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = sectionRef.current
      if (!el) return
      const cards = el.querySelectorAll('[data-reveal]')
      gsap.fromTo(
        cards,
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

      const wrappers = el.querySelectorAll<HTMLElement>('[data-parallax]')
      wrappers.forEach((wrapper, i) => {
        const direction = i % 2 === 0 ? 1 : -1
        gsap.fromTo(
          wrapper,
          { yPercent: -8 * direction },
          {
            yPercent: 8 * direction,
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
      <span className="font-display block text-center text-sm tracking-[0.3em] uppercase text-neutral-500">
        Einblicke
      </span>

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
        {IMAGES.map((image) => (
          <figure key={image.src} data-reveal className={image.offset ? 'md:mt-10' : undefined}>
            <div className="group aspect-[16/10] overflow-hidden rounded-lg">
              <div data-parallax className="h-[120%] w-full will-change-transform">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full scale-100 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <figcaption className="font-display mt-4 text-xs tracking-[0.2em] uppercase text-neutral-500">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
