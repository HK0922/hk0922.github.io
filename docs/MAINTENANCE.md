# Maintain the portfolio

| Change | Edit |
| --- | --- |
| Opening quote, journey, work cards, music copy | `src/pages/index.astro` |
| PatchPilot case study | `src/pages/work/patchpilot.astro` |
| CareContext case study | `src/pages/work/carecontext.astro` |
| GitHub links for projects | `src/data/projects.mjs` |
| Email, LinkedIn, footer links | `src/components/Footer.astro` |
| Page titles and default description | `src/layouts/Base.astro`, plus each page's Base props |
| Colors, typography, spacing, responsive layout | `src/styles/site.css` |
| Sky decorations | `src/components/Sky.astro` |
| Scrolling behavior | `src/scripts/scroll.js` and `src/scripts/scene-state.mjs` |
| Loading animation timing | `public/scripts/loading.js` |
| Résumé | Replace `public/Harikrishna_Trivedi_Resume.pdf`, keeping its filename |
| Performance video and poster | `public/media/harikrishna-keyboard.mp4` and `public/media/keyboard-poster.jpg` |
| Search-engine URLs after adding a page | `public/sitemap.xml`; keep canonical URLs and robots.txt consistent |
| Deployment workflow | `.github/workflows/deploy.yml` |

## CareContext repository

When it is published, change `carecontextRepository` from `null` to its exact URL in `src/data/projects.mjs`. The existing card and case-study links then use that URL and automatically change their label to **GitHub repository**. Do not use a guessed repository path.

## New résumé

Replace the PDF at the existing path. There is no need to modify the header, journey or footer link. The current supplied PDF is preserved byte-for-byte and has `HK0912` printed in it; the website uses `HK0922`.

## Verify an edit locally

Use Node.js 24. After cloning, run `npm ci`. Then:

```bash
npm run dev
```

Before publishing a change:

```bash
npm test
npm run build
npm run check
npm run export:review
```

The GitHub workflow runs the same checks. `npm run preview` lets you inspect the production build locally. `npm run package` regenerates the handoff ZIP using Python 3.

## Preserve the portable export fix

The export script embeds actual built CSS, JavaScript, and fonts. Keep its callback replacements and safe closing-script-tag escaping: the regression tests protect against script code being printed as page content. Rebuild and export after source changes; editing only `OPEN_PREVIEW.html` will not update the source or deployed site.

## Content boundaries

Project illustrations remain explicitly labeled. The portfolio does not execute agents or answer medical questions. The supplied music and résumé are personal assets. Keep the stated experience and qualifications accurate when updating their copy.
