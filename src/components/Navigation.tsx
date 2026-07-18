import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Schließfach', href: '#leistungen' },
  { label: 'Data Storage', href: '#leistungen' },
  { label: 'Bürodienste', href: '#leistungen' },
  { label: 'Preisliste', href: '#leistungen' },
  { label: 'Kontakt', href: '#kontakt' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 2.0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-20 flex w-full items-center justify-between px-6 py-5 transition-colors duration-300 sm:px-10',
          scrolled ? 'bg-black/80 border-b border-neutral-900 backdrop-blur' : 'bg-transparent',
        ].join(' ')}
      >
        <a
          href="#"
          className="font-extralight tracking-[0.15em] text-white text-lg"
        >
          Das Safe
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.15em] uppercase text-neutral-400 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Menü öffnen"
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
        </button>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-black md:hidden">
          <button
            type="button"
            aria-label="Menü schließen"
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-5 text-3xl font-extralight text-white"
          >
            ×
          </button>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-extralight tracking-[0.1em] text-neutral-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </>
  )
}
