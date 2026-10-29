# Associate operating system: Stage 1

29 October 2026, Australia/Sydney. Review build v1.49.0. Production and staging main remain unchanged.

## Baseline and branch

Built from AndrewTour/AGNT-staging commit `839cf99d3de4c0e0bfec74df4396a27e00263345`. All 13 runtime/source files in the v1.48.3 replacement ZIP match that commit byte for byte. The repository was missing the two manifest icons; these are restored from the matching ZIP. The v1.39.3 attached recovery archive and older production main were not used.

Development branch: `development/associate-stage-1` in AndrewTour/AGNT-staging. No merge, Pages setting change, Firebase publication or deployment is authorised by this delivery.

## What is implemented

* Existing operational profiles now support Tuesday/Wednesday regular-off presets, custom working days, normal hours, approved absence ranges, one-off working/off dates, authorised cover and configurable associate targets. Sunday defaults off. Explicit absence takes precedence over an exception that says work.
* Existing agent/associate/operations roles are reused. Team owners configure roles and optional operations task-manager authority. Agents can maintain their own profile and linked associate's roster without promoting either account. An operations task manager can oversee scheduled responsibilities without being made their default assignee.
* Team has a Responsibilities view within the existing subnavigation. Add/edit a once-off, daily or selected-day weekly responsibility. Configure ownership, lead, related campaign, priority, dates/time, mandatory status, cover, fixed deadline and an in-app assignment reminder. Pause or end without deleting history.
* A reviewable, idempotently installed 21-responsibility operating pack covers the supplied Monday–Saturday schedule. Detailed instructions group related actions, rather than creating a separate dashboard item for every sentence. Each responsibility remains editable. Wednesday second callbacks move to Thursday on a Wednesday-off roster. Tuesday reports, Friday vendor/open preparation and Saturday duties keep their deadline and use cover.
* Occurrences reuse `teams/{teamId}/tasks`, current task-completion handlers, offline completion outbox, workload, My tasks and activity. `taskSchedules` stores recurrence definitions only, not a second task database. Definition and roster edits retain immutable revision snapshots. Appointment/contact/calendar stores are unchanged.
* Automatic assignment follows the lead's current configured associate, then lead fallback. Explicit one-off allocation can use another authorised team member. No names or staff relationships are seeded into the real app.
* Daily operations shows a small due-today list with collapsible overflow and earlier outstanding work. Off/absence/inspection days show normal weekday KPIs as Not Applicable on this operations surface. New assignees see a new-assignment notice; starting/completing clears it through the normal saved task change. No email/SMS/push is sent.
* The server creates each occurrence under a stable template-and-original-date ID. Transactions, immutable completion records and revision checks prevent refresh/retry/concurrent-run duplication. Roster/template changes adjust eligible unstarted automatic work; manual, started and completed records retain ownership/history. Off-roster pinned work is visibly flagged for lead review.

## Minimal Firebase process

The existing `firebase.json` already declares `functions` with Node 22, but that source folder was absent. This delivery supplies it. No additional database, calendar, hosting platform or front-end build pipeline is introduced.

The process runs every 30 minutes in Australia/Sydney and also reacts to profile, responsibility and operations-setting changes. It prepares seven days ahead and reconciles fourteen days of recent history plus moved future occurrences whose original date is older. Earlier untouched history is retained. If a responsibility was never generated during an outage longer than fourteen days, that older gap requires review; it is not silently backfilled indefinitely.

Unchanged policies and occurrences are skipped. Invalid definitions are isolated and visibly flagged without blocking the other schedules. Two indexed task queries bound the history reads; system activity identifies AGNT scheduler as the actor. If no cover is available, the deadline stays with the lead with a coverage blocker. This is a responsibility warning, not proof that a vendor report was issued.

The scheduler supports up to 200 definitions per team in this first review version and fails explicitly above that bound. Review capacity before larger rollouts.

## Staging setup after review and approval

This ZIP is the complete application plus backend source, not just a frontend patch. Copying site files or rules alone does not activate unattended scheduling. Do not upload it to production.

1. Check the Firebase connection remains `agnt-staging-cb6ce`. Review the supplied rules and the two additive task indexes.
2. Use the Firebase CLI from this source directory. Confirm the selected account/project before any publication. The commands below are instructions only; none were run against staging or production:

   ```sh
   npm ci --prefix functions
   firebase deploy --project agnt-staging-cb6ce --only firestore:rules,firestore:indexes
   firebase deploy --project agnt-staging-cb6ce --only functions:associateDailySchedule,functions:associateScheduleChanged,functions:associateRosterChanged,functions:associateSettingsChanged
   ```

   Firebase may require billing/API enablement for scheduled functions. Review that in the console before approval. No credentials or billing changes were made here.
3. Deploy only the reviewed static application files to the staging site. The functions folder is deployed through Firebase, never executed by GitHub Pages.
4. As team owner, enable associate operations/scheduled tasks. Configure real members by their existing accounts: Brad as agent with Ray as associate; Andrew and George with None. Configure optional operations oversight separately. Choose the actual associate roster. These are settings to enter, not seeded assumptions.
5. Review and install the weekly operating schedule for the appropriate lead. Choose a start date that avoids duplicating an existing manually issued routine. Existing legacy routines/checklists are retained; the old Start routine generator is retired in favour of configured responsibilities. No legacy records are mass-migrated or deleted.
6. Confirm Responsibilities displays a successful scheduler run. Verify Tuesday report cover with Tuesday off, and Wednesday callbacks with Wednesday off, using staging accounts. Check the actual lead/associate devices before any production discussion.

## Preview

The separate self-contained HTML preview embeds the actual current app, styles, editors and shared scheduling policy. A clearly labelled sample-data adapter replaces Firebase. Screen/theme selectors allow 320, 390 and 430-pixel layouts. Roles can be switched within the preview; reload resets sample data. It is useful for workflow review, not a security or deployed-Firebase demonstration. It contains no real contact, staff, credential or financial data. Do not copy the preview adapter into the application.

## Stage boundaries and remaining work

Stage 1 is the roster/allocation/recurrence foundation. Stage 2 will integrate the associate work into the main Today landing screen, actual combined attempts/KPI progress, generated-appointment credit and buyer callback workflow. Existing Today/Performance/leaderboard calculations remain the existing agent calculations; the new target settings are not yet applied to those reports. Do not onboard associates to live performance reporting until that stage is complete.

Stage 3 will provide concise generated campaign summaries, hot-buyer oversight, blockers and full cross-workflow acceptance. This build supplies the responsibility/instructions to prepare reports; it does not yet generate their contents, read Campaign email, import inspection registrations or issue vendor reports automatically.

Private contacts and unrelated personal data are not shared. Existing team campaign visibility is unchanged from the selected baseline. Scoped buyer/campaign workflow access is to be reviewed as those later integrations are added. Existing appointment setter/lead metadata and private credit records are preserved; no duplicate calendar is created.

Roster hours and reminder settings are stored and visible. Reminders use in-app assignment notices; there is no new push/email service. Optional marketing, finance, AML, exchange or supplier actions remain with their existing approved systems and approvals.

## Changed files

Modified: `app.js`, `index.html`, `visual-system.css`, `runtime.js`, `service-worker.js`, `firestore.rules`, `firestore.indexes.json`, `RELEASE-NOTES.md`.

Added: `associate-core.js`; `functions/index.cjs`, `functions/scheduler.cjs`, `functions/associate-core.cjs`, `functions/package.json`, `functions/package-lock.json`; `tests/associate-core.cjs`, `tests/associate-integration.cjs`, `tests/associate-static.cjs`, `tests/VALIDATION.md`, `firebase.test.json`; this handoff. Icons are restored unchanged from the v1.48.3 ZIP.

Preserved: Firebase project configuration and authentication, existing paths and records, personal storage/outbox, appointment/contact systems, GitHub Pages architecture, base/cleanup CSS, manifest and original runtime protections. Shared policy copies are checked for byte equality. Service-worker release and precache include the new local policy script.

## Validation and limits

See `tests/VALIDATION.md` for completed checks, legacy test-fixture failures reproduced on the unmodified baseline, and unperformed physical-device/deployed-project acceptance.
