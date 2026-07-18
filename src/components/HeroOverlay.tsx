import { useEffect, useRef } from 'react'

interface HeroOverlayProps {
  progress: React.RefObject<number>
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export function HeroOverlay({ progress }: HeroOverlayProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const p = progress.current ?? 0
      // Exit choreography plays out over the first 60% of hero progress:
      // scale down, drift up, letter-spacing widens, then fully faded by p=0.6.
      const t = clamp01(p / 0.6)
      if (textRef.current) {
        textRef.current.style.opacity = String(1 - t)
      }
      if (titleRef.current) {
        const scale = 1 - t * 0.08
        const y = -t * 20
        const tracking = 0.15 + t * 0.04
        titleRef.current.style.transform = `translateY(${y}px) scale(${scale})`
        titleRef.current.style.letterSpacing = `${tracking}em`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(clamp01(1 - p / 0.15))
      }
      if (fadeRef.current) {
        // Phase 4: fade toward black at the end of the hero
        fadeRef.current.style.opacity = String(clamp01((p - 0.86) / 0.14) * 0.9)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progress])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 select-none">
      <div
        ref={textRef}
        className="absolute inset-x-0 bottom-[8vh] flex flex-col items-center gap-3 sm:bottom-[15vh]"
      >
        <h1
          ref={titleRef}
          className="font-display pl-[0.15em] text-[42px] font-extralight tracking-[0.15em] text-white sm:text-[56px]"
        >
          Das Safe
        </h1>
        <p className="font-display pl-[0.5em] text-[11px] font-light uppercase tracking-[0.5em] text-neutral-400">
          SEIT 1984
        </p>
        <p className="font-display pl-[0.3em] text-[10px] font-light tracking-[0.3em] text-neutral-600">
          Wien · Palais Auersperg
        </p>
      </div>

      <div ref={hintRef} className="absolute inset-x-0 bottom-5 flex justify-center">
        <div className="flex h-9 w-5 justify-center rounded-full border border-neutral-700 pt-1.5">
          <div className="scroll-hint-dot h-1.5 w-[3px] rounded-full bg-neutral-400" />
        </div>
      </div>

      <div ref={fadeRef} className="absolute inset-0 bg-black opacity-0" />
    </div>
  )
}
