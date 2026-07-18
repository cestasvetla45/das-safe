import { useScrollReveal } from '../hooks/useScrollReveal'

const DETAILS = [
  { label: 'Adresse', value: 'Auerspergstrasse 1, 1080 Wien' },
  { label: 'Telefon', value: '+43-1-406 61 74', href: 'tel:+43140661174' },
  { label: 'E-Mail', value: 'info@dassafe.com', href: 'mailto:info@dassafe.com' },
  { label: 'Öffnungszeiten', value: 'Mo–Fr 10:00–20:00' },
]

export function ContactSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="kontakt" ref={ref} className="bg-[#0a0a0a] px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <div>
          <h2
            data-reveal
            className="font-display text-sm tracking-[0.3em] uppercase text-neutral-500"
          >
            Kontakt
          </h2>

          <div className="mt-10">
            {DETAILS.map((detail) => (
              <div
                key={detail.label}
                data-reveal
                className="group grid grid-cols-[120px_1fr] gap-x-4 items-baseline border-t border-neutral-900 py-4 last:border-b sm:grid-cols-[190px_1fr]"
              >
                <p className="font-display text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                  {detail.label}
                </p>
                <div className="flex items-center gap-2">
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="text-base text-neutral-200 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <span className="text-base text-neutral-200 transition-transform duration-300 ease-out group-hover:translate-x-1">
                      {detail.value}
                    </span>
                  )}
                  <span
                    aria-hidden="true"
                    className="text-[#da3020] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                  >
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="flex flex-col items-start gap-6 border-t border-neutral-900 pt-10 md:items-end md:border-t-0 md:border-l md:pl-12 md:pt-0"
        >
          <p className="max-w-xs text-base text-neutral-300 md:text-right">
            Vereinbaren Sie einen persönlichen Termin — diskret, unverbindlich, in aller Ruhe.
          </p>
          <a
            href="mailto:info@dassafe.com"
            className="font-display rounded-full border border-neutral-700 px-8 py-3 font-light tracking-wide text-white transition-colors duration-300 ease-out hover:border-[#da3020] hover:bg-[#da3020] hover:text-white"
          >
            Termin vereinbaren
          </a>
        </div>
      </div>
    </section>
  )
}
