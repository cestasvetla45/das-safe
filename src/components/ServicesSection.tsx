import { useScrollReveal } from '../hooks/useScrollReveal'

const SERVICES = [
  {
    number: '01',
    title: 'Schließfächer',
    text: 'Legitime Schließfächer, für Dinge, die Sie nicht zu Hause aufbewahren sollten.',
  },
  {
    number: '02',
    title: 'Data Storage',
    text: 'Unser Data Storage mit Hochsicherheits-Schließfächern für Ihre sensiblen Daten.',
  },
  {
    number: '03',
    title: 'Bürodienste',
    text: 'Sicherheits-Meetings im Verhandlungsraum bzw. Konferenzraum.',
  },
]

export function ServicesSection() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.15 })

  return (
    <section id="leistungen" ref={ref} className="bg-black py-32 px-6">
      <h2
        data-reveal
        className="text-center text-3xl font-extralight text-white"
      >
        Diskret &amp; transparent
      </h2>
      <p data-reveal className="mt-3 text-center text-sm text-neutral-500">
        Wir bieten Ihnen:
      </p>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {SERVICES.map((service) => (
          <div
            key={service.number}
            data-reveal
            className="rounded-lg border border-[#222] bg-[#111] p-8 transition hover:border-[#da3020]"
          >
            <span className="text-sm text-neutral-600">{service.number}</span>
            <h3 className="mt-4 text-xl font-light text-white">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
