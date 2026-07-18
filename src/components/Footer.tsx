export function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-black px-6 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-xs font-light text-neutral-600 md:flex-row md:justify-between">
        <span className="font-display tracking-[0.15em] text-neutral-400">Das Safe</span>

        <p className="text-center md:text-left">
          SAFE Wertfachvermietungs Ges.m.b.H. · Auerspergstraße 1 · A-1080 Wien · Tel.:
          +43-1-406 61 74 · info@dassafe.com
        </p>

        <div className="flex items-center gap-4">
          <a href="#" className="text-neutral-600 transition hover:text-neutral-400">
            Datenschutzerklärung
          </a>
          <a href="#" className="text-neutral-600 transition hover:text-neutral-400">
            Impressum
          </a>
          <span className="text-neutral-700">© 2026</span>
        </div>
      </div>
    </footer>
  )
}
