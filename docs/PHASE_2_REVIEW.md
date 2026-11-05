# Design review · Revision 4

Open `OPEN_PREVIEW.html` from the fresh extracted folder. The owner approved this design. It is preserved in the Phase 3 release; nothing has been published by this handoff.

1. The opening now uses the AI/music quote, with the sun visible at the right edge. No 3D object remains.
2. Scroll into the short connected journey before the projects.
3. Open both individual case studies and return to Selected work.
4. Switch day/night anywhere: the sky and contrasting text panels continue throughout all three pages.
5. Scroll down and back up. Cards and text enter from both viewport edges, and the introduction reverses its word focus.
6. Reload to see the brief musical loading animation. It is skipped when motion is paused or reduced motion is enabled.
7. Open the résumé: it is the newly attached PDF, unchanged.
8. Play or pause the performance from the dedicated Music section or top sound control.

PatchPilot links to its published repository. CareContext's GitHub action is labeled **GitHub profile** because its repository was not found; its URL can be replaced centrally when published. The new PDF's printed `HK0912` handle remains untouched, while website links use `HK0922`.

The portable exporter retains the fix for the earlier raw-JavaScript rendering failure. All scripts are checked against their source, compiled for syntax, and excluded from visible-text comparison. CSS, fonts, and scripts are embedded; the supplied media and PDF remain adjacent files.

Build and automated verification passed. Actual browser appearance, scroll feel, and playback still need review on a device because the managed preview service was unavailable.
