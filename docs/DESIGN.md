---
version: 1.0.0
name: HK-continuous-sky
status: approved-design
structure: quote, personal journey, selected work, music, contact
colors:
  day: {page: '#c7e1f1', ink: '#172e40', body: '#354f62', surface: '#e8f2f7'}
  night: {page: '#101b30', ink: '#e9eff5', body: '#becedf', surface: '#20334b'}
typography:
  body: Jost Variable
  display: Josefin Sans Variable
layout:
  max-width: 1600px
  gutter: clamp(22px, 3vw, 58px)
  desktop-work-columns: 2
  mobile-work-columns: 1
motion:
  engine: Lenis with requestAnimationFrame
  smooth-wheel-duration: 1.15s
  hero: sticky interval, scale, type translation and opacity
  introduction: reading-order word focus
  content: reversible entry from top and bottom
  thumbnails: restrained internal parallax
  loading: finite musical count-in
---

## Composition

Preserve the approved small top-edge navigation, compact project grid, dedicated music section, and bottom day/night dock. The opening now centers an original quote connecting AI, making, and music. A subtle three-line score sits beneath it; the 3D object is fully removed, including its fallback, runtime, and dependency.

The sky is a fixed shared component in the base layout, so it continues through all homepage sections and both project pages. Day has pale blue gradients, drifting clouds and birds, and a warm sun clipped at the right edge. Night has a deep blue sky, scattered stars, restrained clouds, and a small moon. Theme changes crossfade the atmosphere and update all reading surfaces.

## Journey and work

About precedes Selected work. A connected timeline tells four short chapters: music, full-stack work at Vohra, applied AI at Vedlogic, and current study at NJIT. It reads horizontally on desktop and becomes a connected vertical path on mobile. A brief founder-outreach story and résumé action complete the panel.

Both project cards now open individual case studies, with separate GitHub actions. PatchPilot uses the verified repository URL. CareContext uses an explicitly labeled GitHub profile link until its exact repository is published. Project URLs are centralized in `src/data/projects.mjs`.

The two-column project grid and illustrations retain their existing proportions. Contrasting light-blue or navy panels anchor project descriptions and longer text against the sky. The retained CareContext case study and new PatchPilot page share the same atmosphere, navigation, reading panels, and reversible reveals.

## Music

The separate Music section retains the owner's performance and stated 15 years with London College of Music. A contrasting text panel sits beside the portrait recording. No autoplay, song-title inference, or qualification claims are added.

## Loading and scrolling

The head script begins a brief five-bar musical count-in on each navigation or reload. It releases after page readiness with a short minimum duration, has a 1.8-second JavaScript timeout, and an independent finite CSS escape. The overlay captures no input. Reduced motion and manual pause skip it; no-JavaScript pages never show it.

Reveals are a function of element position relative to both viewport edges. There is no once-only reveal flag or direction switch that jumps mid-animation: scrolling upward reverses the same continuous state. Browser-history restoration restarts the scroll loop. All core content is fully visible with motion paused or JavaScript disabled.

The background uses native CSS and SVG. No WebGL, Three.js, custom cursor, new backend, or additional project is introduced.

## Verification

Layout is responsive below 760px, with native touch scrolling and self-hosted fonts. Code, link, export, and logic checks passed. Browser rendering and actual smoothness remain unverified because the managed preview infrastructure was unavailable.
