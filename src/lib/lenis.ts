import type Lenis from 'lenis'

/**
 * Module-level handle to the single Lenis instance created in App.tsx.
 * Consumers (e.g. Navigation) read `lenisRef.current` to drive smooth-scroll
 * without prop-drilling or reaching for `window`.
 */
export const lenisRef: { current: Lenis | null } = { current: null }
