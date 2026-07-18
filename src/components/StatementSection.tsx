import { Fragment } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const STATEMENT = 'Unser Ziel: Ihr Recht auf Diskretion und Privatsphäre!'

export function StatementSection() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.04 })
  const words = STATEMENT.split(' ')

  return (
    <section
      ref={ref}
      className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6"
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
      <div data-reveal className="mt-8 h-px w-[60px] bg-[#da3020]" />
    </section>
  )
}
