import { Suspense, useState } from 'react'
import { HeroScene } from './components/HeroScene'
import { HeroSceneB } from './components/HeroSceneB'
import { HeroOverlay } from './components/HeroOverlay'
import { useScrollProgress } from './hooks/useScrollProgress'
import { Navigation } from './components/Navigation'
import { WelcomeSection } from './components/WelcomeSection'
import { ServicesSection } from './components/ServicesSection'
import { StatementSection } from './components/StatementSection'
import { GallerySection } from './components/GallerySection'
import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

type HeroVariant = 'a' | 'b'

function initialVariant(): HeroVariant {
  return new URLSearchParams(window.location.search).get('hero') === 'b' ? 'b' : 'a'
}

export default function App() {
  const progress = useScrollProgress()
  const [variant, setVariant] = useState<HeroVariant>(initialVariant)

  const toggleVariant = () => {
    const next: HeroVariant = variant === 'a' ? 'b' : 'a'
    setVariant(next)
    const url = new URL(window.location.href)
    url.searchParams.set('hero', next)
    window.history.replaceState(null, '', url)
  }

  return (
    <>
      <Navigation />

      <div id="hero-container">
        {variant === 'a' ? (
          <Suspense fallback={null}>
            <HeroScene progress={progress} />
          </Suspense>
        ) : (
          <HeroSceneB progress={progress} />
        )}
        <HeroOverlay progress={progress} />
      </div>
      {/* Scroll spacer: 100vh viewport + 120vh of hero scroll range */}
      <div style={{ height: '220vh' }} aria-hidden="true" />

      <main className="relative z-[15] bg-black">
        <WelcomeSection />
        <ServicesSection />
        <StatementSection />
        <GallerySection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>

      <button
        type="button"
        onClick={toggleVariant}
        title={variant === 'a' ? 'Zu Hero B (Higgsfield) wechseln' : 'Zu Hero A (3D) wechseln'}
        className="fixed bottom-4 left-4 z-50 rounded-full border border-neutral-700 bg-black/70 px-3 py-1.5 text-[10px] font-light uppercase tracking-[0.2em] text-neutral-400 backdrop-blur-sm transition-colors hover:border-neutral-500 hover:text-white"
      >
        Hero {variant === 'a' ? 'A · 3D' : 'B · Film'}
      </button>
    </>
  )
}
