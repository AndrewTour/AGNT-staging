# AGNT v1.41.32 — Scheduled-day stack

Baseline: v1.41.31 Action Buttons, confirmed on production main before editing.
The supplied older project document versions are not used to overwrite this baseline.

## Formatting only

- Scheduled-day priority and MarketPulse now sit above the quick menu, in DOM and keyboard order.
- Priority uses the existing Next Workday heading size, six-pixel text rhythm and 38-pixel MarketPulse visual.
- Completion is a compact 32-pixel heading; momentum, status, progress bar and leaderboard remain present.
- Long priority headings can wrap. Existing timeline access, date context and all five quick actions remain.
- Off-day stack, metric styles/controls, bottom navigation, viewport and keyboard logic are unchanged.

## Changed files

- index.html: move the existing quick menu below the priority stack; update asset version references.
- cleanup.css: scoped scheduled-summary formatting using the off-day reference.
- app.js: backup release number only; executable application logic unchanged.
- service-worker.js: cache/asset version only; lifecycle behavior unchanged.
- cleanup-checks.cjs: release assertions and checks for retained content and reading order.
- RELEASE-v1.41.32.md: these release notes.

No feature or obsolete code removed. Firebase configuration, authentication, Firestore paths/rules,
UID separation, storage formats, data, sync architecture, manifest/icons and deployment settings are untouched.
No Firebase Console, Firestore rules or GitHub settings changes are required.

## Validation

Passed JavaScript syntax, dependency-free workflow/stability/priority regression tests,
duplicate-ID and local-reference checks, baseline preservation checks and ZIP integrity checks.
The absent-static-ID report includes existing dynamically rendered controls, unchanged by this release.
No browser rendering, physical-iPhone, live Firebase or production deployment testing was performed.
Small/large iPhone appearance, long-priority text and keyboard interactions require device confirmation.
