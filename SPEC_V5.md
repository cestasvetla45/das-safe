# Das Safe V5 — single hero, tight layout, display type, scroll choreography

Repo: /root/das-safe (React 19 + TS + Vite 6 + Tailwind v4 + GSAP/ScrollTrigger). German luxury safe-deposit one-pager. Palette: black, steel neutrals, red #da3020. Read every file in src/ first.

## 1. Hero B becomes THE hero
- Delete HeroScene.tsx, MetalLogo.tsx, Ground.tsx, ImpactEffects.tsx and the A/B variant logic + toggle button in App.tsx. HeroSceneB is the only hero (keep filename).
- `npm uninstall three @react-three/fiber @react-three/drei @types/three` (whichever exist in package.json). Build must still pass.
- Tighten the hero scroll: reduce the scroll spacer (currently 220vh) to ~170vh and the ScrollTrigger range in useScrollProgress from 120vh to ~90vh so the handoff to content feels quick. Refine HeroSceneB: video scale 1→~1.18, overlay dim starts ~0.5.
- HeroOverlay: title "Das Safe" moves to the display font (see §2), add scroll-driven exit: as progress grows title scales 1→0.92, translates up slightly, letter-spacing widens a touch, fades by ~0.6 progress. Scroll cue fades out by 0.15.

## 2. Typography — geometric display font matching the logo wordmark
- Add Google Font "Space Grotesk" (weights 300;400;500;600) alongside Inter Tight in index.html.
- CSS: `--font-display: 'Space Grotesk', 'Inter Tight', sans-serif`. Apply to: nav wordmark + links, hero title + subtitle, ALL section headings/labels, stats numerals, gallery captions, marquee, CTA buttons, footer wordmark. Inter Tight stays for body paragraphs.
- Headings get a modern treatment: tighter leading, slight negative tracking on large headings (-0.02em), labels stay uppercase with wide tracking.

## 3. Kill dead space
- Section padding rhythm: replace py-32 everywhere with a tighter scale (roughly py-16/20 mobile, py-24 desktop max). No section should have >30vh of empty black between content blocks.
- Gallery: max-w-7xl, gap-6, reduce the alternating offset to md:mt-10; images aspect-[16/10].
- Statement section: reduce its vertical padding; it currently floats in a huge void.
- Contact + Footer: merge visual rhythm — contact as two-column (info block + big CTA), footer slim single row.

## 4. Scroll choreography (ties it together)
a) **Lenis smooth scroll**: `npm i lenis`. Init in App (skip entirely under prefers-reduced-motion): gsap ticker drives `lenis.raf`, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.lagSmoothing(0)`. Ensure existing ScrollTriggers still fire.
b) **Scroll progress line**: fixed top, 2px, #da3020, scaleX 0→1 across full document scroll (scrub). Sits above nav border.
c) **Smart nav**: hides (translateY(-100%)) when scrolling down past the hero, reappears on scroll up. Keep blur/solid state.
d) **Gallery parallax**: each figure's inner img wrapper gets a scrub parallax (yPercent ±8, alternating direction per card) in addition to the existing reveal.
e) **Stats strip** — new `StatsSection.tsx` between WelcomeSection and ServicesSection: 4 stats — "1.000" (Tonnen Stahlbeton), "24/7" (Videoüberwachung), "40+" (Jahre Erfahrung), "1080" (Wien, Palais Auersperg). Big Space Grotesk numerals (clamp ~3-5rem), small uppercase labels. Numeric ones count up from 0 when scrolled into view (gsap snap, once); "24/7" just fades in. Subtle top/bottom hairline borders (border-neutral-900).
f) **Marquee divider** — new `Marquee.tsx` above ContactSection: one row of repeating text "DISKRET · SICHER · PRIVAT · SEIT 1984 · WIEN ·" in outlined text (text-transparent with -webkit-text-stroke 1px rgb(64,64,64)), Space Grotesk, ~5rem, infinite loop leftwards (gsap to xPercent -50 repeat -1, duration ~24s, linear; duplicate content twice for seamless loop). Slight speed-up factor from scroll velocity is a bonus, not required.
g) **Statement scrub**: upgrade word-by-word reveal — pin the section for ~+60% viewport and scrub each word from opacity 0.15 → 1 sequentially as the user scrolls through (ScrollTrigger pin + scrub timeline). Under prefers-reduced-motion: no pin, simple fade.
h) Existing reveals (welcome, services, about, contact) stay but retune to start 'top 80%' with y 30 so content arrives sooner.

## 5. Constraints
- Content/copy unchanged (German). Contact data unchanged. No other new deps beyond `lenis`.
- `npx tsc --noEmit` and `npx vite build` must pass. Mobile must remain clean (marquee/stats scale down, no horizontal overflow — set overflow-x clip on body).
- Verify no ScrollTrigger double-registration; keep useGSAP scope patterns.
