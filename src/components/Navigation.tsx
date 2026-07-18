import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { lenisRef } from '../lib/lenis'

const LINKS = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Einblicke', href: '#einblicke' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Kontakt', href: '#kontakt' },
]

function scrollToAnchor(href: string) {
  const id = href.slice(1)
  const target = document.getElementById(id)
  if (!target) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion && lenisRef.current) {
    lenisRef.current.scrollTo(target, { offset: -64, duration: 1.2 })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    const heroEnd = () => window.innerHeight * 1.1
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > window.innerHeight * 2.0)

      const delta = y - lastY.current
      if (y > heroEnd() && delta > 4) {
        setHidden(true)
      } else if (delta < -4 || y <= heroEnd()) {
        setHidden(false)
      }
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    scrollToAnchor(href)
  }

  const handleMobileNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setMenuOpen(false)
    scrollToAnchor(href)
  }

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-20 flex w-full items-center justify-between px-6 py-5 transition-[transform,background-color,border-color] duration-300 sm:px-10',
          scrolled ? 'bg-black/80 border-b border-neutral-900 backdrop-blur' : 'bg-transparent',
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0',
        ].join(' ')}
      >
        <a href="#" className="font-display font-extralight tracking-[0.15em] text-white text-lg">
          Das Safe
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="group relative font-display text-xs tracking-[0.15em] uppercase text-neutral-400 transition hover:text-white"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#da3020] transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
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
              onClick={(event) => handleMobileNavClick(event, link.href)}
              className="font-display text-2xl font-extralight tracking-[0.1em] text-neutral-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </>
  )
}
