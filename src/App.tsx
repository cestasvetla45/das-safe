import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenisRef } from './lib/lenis'
import { HeroSceneB } from './components/HeroSceneB'
import { HeroOverlay } from './components/HeroOverlay'
import { useScrollProgress } from './hooks/useScrollProgress'
import { Navigation } from './components/Navigation'
import { ScrollProgressBar } from './components/ScrollProgressBar'
import { WelcomeSection } from './components/WelcomeSection'
import { StatsSection } from './components/StatsSection'
import { ServicesSection } from './components/ServicesSection'
import { StatementSection } from './components/StatementSection'
import { GallerySection } from './components/GallerySection'
import { AboutSection } from './components/AboutSection'
import { Marquee } from './components/Marquee'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const progress = useScrollProgress()

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const lenis = new Lenis({ autoRaf: false })
    lenisRef.current = lenis
    document.documentElement.classList.add('lenis')

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenisRef.current = null
      lenis.destroy()
      document.documentElement.classList.remove('lenis')
    }
  }, [])

  return (
    <>
      <ScrollProgressBar />
      <Navigation />

      <div id="hero-container">
        <HeroSceneB progress={progress} />
        <HeroOverlay progress={progress} />
      </div>
      {/* Scroll spacer: 100vh viewport + ~70vh of hero scroll range */}
      <div style={{ height: '170vh' }} aria-hidden="true" />

      <main className="relative z-[15] bg-black">
        <WelcomeSection />
        <StatsSection />
        <Marquee
          text="SCHLIESSFACH · DATA STORAGE · BÜRODIENSTE · "
          reverse
          size="text-2xl sm:text-[3rem]"
        />
        <ServicesSection />
        <StatementSection />
        <GallerySection />
        <AboutSection />
        <Marquee text="DISKRET · SICHER · PRIVAT · SEIT 1984 · WIEN · " />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
