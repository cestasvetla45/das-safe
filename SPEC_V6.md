# Das Safe V6 — kill remaining dead space, editorial image storytelling

Repo: /root/das-safe. Read src/App.tsx, ServicesSection, StatementSection, GallerySection, StatsSection, index.css first. Keep Space Grotesk/Inter Tight split, palette, Lenis + existing ScrollTriggers.

## 1. ServicesSection — image cards (kills the void, ties photos in)
Replace the three small text cards with three TALL image cards (grid md:grid-cols-3 gap-5, card height ~clamp(420px, 56vh, 560px)):
- 01 Schließfächer → bg image /img/box-1984.webp
- 02 Data Storage → bg image /img/vault-corridor.webp
- 03 Bürodienste → bg image /img/discretion-room.webp
Card: rounded-lg overflow-hidden relative; image absolute inset-0 object-cover with slow scale on hover (1.06, 900ms) and slight grayscale that lifts on hover; gradient overlay (black 85% bottom → transparent 45%); content pinned bottom-left: number (Space Grotesk, text-neutral-500), title (text-2xl/3xl font-display), description (existing copy, text-sm text-neutral-300 max-w-[36ch]); a 2px #da3020 line that grows width 0→32px on hover above the title. Reveal: existing stagger pattern but y 60 + clip or scale 0.97, start 'top 75%'. Remove the empty min-height/padding that caused the void — section height = content + py-16/24.

## 2. StatementSection — no more pin runway
Remove pin entirely. Keep word-by-word scrub tied to section position: one timeline with ScrollTrigger {trigger: section, start: 'top 80%', end: 'top 30%', scrub: 0.4} scrubbing words opacity 0.15→1 sequentially. Padding py-24/32 max. The red divider stays. Reduced-motion: simple fade. This removes the +60% pinned blank viewport.

## 3. GallerySection — editorial alternating layout with copy
Replace the 2x2 offset grid with a vertical editorial sequence (max-w-6xl):
Item 1 (full-bleed panorama): /img/facility-corridor.webp, aspect ~21/9, full width of container; overlay caption bottom-left on gradient.
Then 3 alternating rows (md:grid-cols-12 gap-8 items-center; image spans 7 cols, text 4 cols with 1 col gutter; alternate image left/right; stack on mobile image-first):
- /img/box-1984.webp — label "SEIT 1984", heading "Jedes Fach eine Festung", text: "Zwei Schlüssel, ein Nummernschild, absolute Anonymität. Unsere Schließfächer funktionieren heute wie am ersten Tag — nur die Technik dahinter ist von morgen."
- /img/vault-door.webp — label "1.000 TONNEN", heading "Stahlbeton und Panzerstahl", text: "Eine Tresortür, wie sie nur wenige Banken besitzen, trennt Ihre Werte von der Außenwelt. Rund um die Uhr überwacht, still und unbestechlich."
- /img/vault-corridor.webp — label "DER TRESORRAUM", heading "Präzision bis ins Detail", text: "Klimatisiert, versichert und diskret: Der Tresorraum im Herzen des Palais Auersperg verbindet Wiener Tradition mit modernster Sicherheitstechnik."
Panorama caption: label "DIE ANLAGE", heading "Hinter den Mauern des Palais", overlay text-white.
Typography: label = text-xs uppercase tracking-[0.3em] text-[#da3020]; heading = font-display text-2xl/4xl; text = text-neutral-400 leading-relaxed max-w-[44ch].
Motion: keep per-image parallax (yPercent ±6 scrub) + reveal; text blocks slide in from their outer side (x ±40, opacity) with slight delay after image. loading=lazy, German alts.
Keep section label "Einblicke" but place it as a small header directly above the panorama (no giant top margin).

## 4. Rhythm audit
- After changes, no stretch of viewport between hero end and footer may be >40vh of pure black without content. Check ServicesSection bottom, Statement top/bottom, Gallery top specifically — trim py values until tight (aim py-16 mobile / py-24 desktop everywhere, gap between sibling sections ≤ py values).
- Stats strip unchanged. Marquee unchanged. About/Contact/Footer unchanged.

## 5. Gates
`npx tsc --noEmit` + `npx vite build` clean; no horizontal overflow; content copy for existing sections unchanged except as specified here.
