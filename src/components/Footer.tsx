export function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-black py-10 px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 text-xs font-light text-neutral-600 md:flex-row md:items-start md:justify-between">
        <div>
          <p>SAFE Wertfachvermietungs Ges.m.b.H.</p>
          <p>Auerspergstraße 1 · A-1080 Wien</p>
        </div>
        <div>
          <p>Tel.: +43-1-406 61 74 · E-Mail: info@dassafe.com</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-neutral-600 transition hover:text-neutral-400">
            Datenschutzerklärung
          </a>
          <a href="#" className="text-neutral-600 transition hover:text-neutral-400">
            Impressum
          </a>
        </div>
      </div>

      <p className="mt-6 pt-6 text-center text-xs text-neutral-700">
        Copyright © 2026 Das Safe
      </p>
    </footer>
  )
}
