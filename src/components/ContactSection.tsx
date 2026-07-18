import { useScrollReveal } from '../hooks/useScrollReveal'

const DETAILS = [
  { label: 'Adresse', value: 'Auerspergstrasse 1, A-1080 Wien, Austria' },
  { label: 'Telefon', value: '+43-1-406 61 74' },
  { label: 'E-Mail', value: 'info@dassafe.com' },
  {
    label: 'Öffnungszeiten',
    value:
      'Montag – Freitag: 10:00 bis 20:00 Uhr. Samstag, Sonntag und an Feiertagen geschlossen.',
  },
]

export function ContactSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="kontakt" ref={ref} className="bg-[#0a0a0a] py-32 px-6">
      <h2
        data-reveal
        className="text-center text-sm tracking-[0.3em] uppercase text-neutral-500"
      >
        Kontakt
      </h2>

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-10 sm:grid-cols-2">
        {DETAILS.map((detail) => (
          <div key={detail.label} data-reveal>
            <p className="text-xs uppercase tracking-wider text-neutral-600">{detail.label}</p>
            <p className="mt-2 text-base text-white">{detail.value}</p>
          </div>
        ))}
      </div>

      <div data-reveal className="mt-16 flex justify-center">
        <a
          href="mailto:info@dassafe.com"
          className="rounded-full border border-neutral-700 px-8 py-3 font-light tracking-wide text-white transition hover:bg-white hover:text-black"
        >
          Termin vereinbaren
        </a>
      </div>
    </section>
  )
}
