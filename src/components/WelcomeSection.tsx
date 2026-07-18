import { useScrollReveal } from '../hooks/useScrollReveal'

export function WelcomeSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      id="willkommen"
      ref={ref}
      className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center"
    >
      <h2
        data-reveal
        className="font-extralight text-4xl sm:text-6xl text-white tracking-tight"
      >
        Willkommen im Wiener Traditionshaus
      </h2>
      <p data-reveal className="mt-4 text-neutral-400">
        DAS SAFE in 1080 Wien
      </p>
      <p
        data-reveal
        className="mt-10 max-w-2xl mx-auto text-neutral-300 text-base leading-relaxed"
      >
        Wir freuen uns über Ihr Interesse an unserem Wertfachvermietungs-Unternehmen im 8. Wiener
        Bezirk/Josefstadt und stellen Ihnen gerne unsere Leistungen rund um die sichere Verwahrung
        Ihrer Wertgegenstände oder Daten vor. Die legitimen Fächer befinden sich in einem
        Hochsicherheitsgebäude – 1.000 Tonnen Stahlbeton ummanteln den Saferaum, die gesamte
        Anlage wird Tag und Nacht bewacht – in einer sehr weitläufigen, offenen Lage, was noch
        zusätzlich zur Sicherheit beiträgt. Unsere Serviceleistungen sind vielfältig und umfassen
        vom Schließfach über Meetings für Ihr Büro ein gut durchdachtes, bestens funktionierendes
        Sicherheitsangebot.
      </p>
    </section>
  )
}
