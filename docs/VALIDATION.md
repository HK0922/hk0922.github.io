# Validation · Release 1.0.0

Finalization: November 4, 2026. Phase 3, version 1.0.0. Design approved by the owner; prepared for owner publication. Not deployed by this handoff.

| Check | Result | Scope |
| --- | --- | --- |
| Astro production build | Passed | Homepage, PatchPilot and CareContext case studies, and custom 404 page |
| Automated tests | 26 passed, 0 failed | Preferences, audio controls, loader, reversible scroll state, and exporter regression |
| Build/link checks | Passed | 4 pages, 75 local references, 2 self-hosted fonts, anchors, unique IDs, and video without autoplay |
| Requested structure | Passed | Shared sky and edge sun on all pages; journey before work; distinct music section; no 3D object |
| New résumé | Passed | Uploaded PDF, public source, production build, and portable copy are byte-identical |
| Portable export | Passed | 5 entry pages including root alias; 25 parseable scripts; 49 local file/media links |
| Script/text integrity | Passed | Embedded scripts match built source; visible text matches production; no leaked JavaScript |
| Approved design preservation | Passed | 11 exact hashes match the approved page source, styles, navigation, sky, motion, résumé and video |
| Publishing metadata | Passed | Three sitemap entries, correct canonical URLs, indexable public pages and noindex 404 |
| Locked dependency install | Passed | npm ci completed through the environment installer; package URLs use the public npm registry |
| Workflow preparation | Passed locally | YAML parsed; official action tags verified; main-only deployment depends on a successful build |
| GitHub verification | Partial | PatchPilot README inspected; no CareContext repository found on the account |
| Browser rendering / actual scroll feel / playback | Unverified | Managed preview daemon unavailable |
| GitHub-hosted execution / deployment | Not attempted | Owner performs upload and publication using the included guide |

## Résumé integrity

File size: 177,820 bytes.

SHA-256: `c56478983a3e85030700322d5d80af4af58cdb754a5a7ec21753c9357704b188`

The uploaded PDF is included without editing its content, including its printed `HK0912` handle. Website links use the owner's confirmed `HK0922` handle.

## Motion and loading coverage

Scroll calculations cover entry from the bottom, upward entry from the top, reversible state without one-time flags, continuous transitions, hero clamping, ordered word focus, and reduced motion. The loader tests cover fast loads, failed/delayed assets, fresh initial and reload animations, a resolved paused preference, and browser-history restoration.

Preference/audio tests cover day/night persistence, active-choice behavior, unavailable browser storage, system/manual motion preferences, synchronized playback buttons, failure and replay behavior, and no autoplay. These are logic tests, not measurements of frame rate or physical-device media playback.

## Preserved export regression

An earlier portable export used a replacement string containing JavaScript's `$&` sequence, which expanded into an HTML script tag and exposed source as page text. The exporter now uses callback replacements and case-preserving script-tag escaping. The regression fixture covers dollar metasequences and closing script tags; production export checks compile every inline script and compare its exact source and visible page text.

## Browser limit

The prior preview attempt and the November 4 status check reported an unavailable preview daemon. No substitute browser route was used. The user's recording was inspected to identify the existing background break and 3D opening; it is not evidence of how this revision renders. No screenshot, visual audit, performance benchmark, or live deployment is claimed.


## Finalization checks

The same install, test, build, content checks, and portable-export sequence that the deployment workflow runs completed locally. The workflow's YAML was parsed and its triggers, build order, artifact path, deployment dependency, environment, and permission boundaries inspected. The referenced action tags were read from the official action repositories. This verifies the supplied configuration, not a GitHub-hosted run.

The previous three public pages' source and design files remain unchanged; shared metadata is now prepared for indexing. The added 404 page uses the same base layout and theme. The exact supplied résumé hash above continues to match its public, built and portable copies.

Local Markdown documentation links were checked. The release ZIP is checked for archive integrity, required deployment files, package version, and all file hashes in its manifest. The user performs the actual repository creation, upload and deployment described in `GITHUB_PAGES.md`.
