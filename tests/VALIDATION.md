# Stage 1 validation record

29 October 2026. Review build v1.49.0, based on staging commit 839cf99d3de4c0e0bfec74df4396a27e00263345.

## Passed

* 122 dependency-free policy checks: Tuesday/Wednesday-off rosters, Sunday, Saturday KPI exclusion, working/absence overrides, cover and lead fallback, once/daily/weekly applicability, pause/end dates, stable identities, calendar arithmetic, Sydney date boundaries and all 21 operating-pack definitions.
* 53 Firestore emulator and actual scheduler checks, using a demo project: authorised and denied schedule/profile access, fixed-deadline cover, Wednesday callbacks moved to Thursday, concurrent/repeated scheduling without duplicates, completion preservation, manual reassignment preservation, profile authority without role escalation, pause/resume, once-off persistence/completion, absence changes, future moves beyond the normal history window, optional operations oversight, private user-record denial, and retained legacy task, 21-item campaign checklist and fee-save workflows.
* Real Chrome UI with actual app/styles/editors plus a sample-data adapter: once-off creation; weekly Tuesday/Thursday selection; editing and pausing; saving/reopening a Tuesday-off roster; a one-off day off showing Not Applicable and zero routine work due; associate role switching; completing a task and its removal from today's outstanding work.
* Responsibilities list at 320x740, 390x844 and 430x932, both themes: document scroll width equals viewport width. New form tested at 390px. Earlier profile editor test used the desktop viewport; physical iPhone keyboard/date-picker testing is outstanding.
* Ten completed rapid navigation transitions across Today, People, Market, Performance and Team: responsive with no observed app error. A longer unbounded browser-control batch hit the tool's execution timeout; it was not counted as a completed 50-transition test. This is not a long-duration or real-Firebase load test.
* JavaScript syntax, backend module loading, exact equality of browser/server policy copies and all 11 release precache assets pass.
* All 1272 baseline named functions are retained. Firebase config, firebase.json, base styles, cleanup CSS and manifest are unchanged. Two manifest icons are restored byte-for-byte from the matching v1.48.3 ZIP.

## Existing test-fixture failures

The repository's three older scripts were run against both this source and an unmodified checkout snapshot. They already fail on baseline:

* `stability-checks.cjs`: obsolete viewport expectations (expects hardware screen sizing superseded by v1.48.1).
* `priority-checks.cjs`: looks for removed `sellerPriorityTieBreak`.
* `cleanup-checks.cjs`: its isolated fixture omits `savedCallContactMarkup`.

These tests were not altered to manufacture a pass, and unrelated working app behaviour was not changed to satisfy stale fixtures. They do not provide a passing whole-app regression suite. Targeted checks above cover this change; broader maintained regression coverage remains desirable.

## Reproduce

From this source, after installing backend development dependencies:

```sh
npm ci --prefix functions
npm --prefix functions test
npm --prefix functions run test:integration
```

The integration command uses `firebase.test.json`, the Firestore emulator on port 8088 and the explicitly named demo project. Java is required by the emulator. Never substitute the production project for these tests.

## Not performed

No staging/production login, live customer-data test, Functions/Scheduler deployment or cloud trigger-delivery acceptance, billing/API change, production merge, GitHub Pages deployment, physical iPhone PWA/background/offline keyboard test or external Campaign/inspection-system integration was performed. Offline task completion reuses the existing outbox, but a physical-device offline/reconnect acceptance check is still required.
