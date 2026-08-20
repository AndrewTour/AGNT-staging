# AGNT BETA v1.36.9 — Buyer Simplicity & Sydney Suburbs

Incremental BETA update built directly on the confirmed working AGNT BETA v1.36.8 Buyer UI Cleanup package supplied on 20 August 2026.

## Release baseline
- Application/UI source: confirmed working `AGNT-beta-v1.36.8-Buyer-UI-Cleanup.zip` (v1.36.8 baseline).
- Firebase environment: existing BETA project `daily-accountability-be0ac`.
- Existing Firebase Authentication accounts and UIDs are retained.
- Existing personal data remains under the current `users/{uid}` paths.
- Existing Team membership, invite-code and Team leaderboard paths are retained.
- No user-data migration is required.

## Included functionality
- Complete Team create/join/leave/owner-management workflow, including Team deletion.
- Daily and current-week Team leaderboard sync.
- Persistent Pipeline Session refresh with per-user/per-day served-contact exclusion.
- Broadcast contrast and viewport refinements.
- Universal nested/session navigation polish.
- Returning Daily Snapshot for four seconds on every second returning app open.
- Consumer-ready login with persistent Firebase authentication restore.
- Team appointment assignment after Book Appointment, defaulting to Me.
- Assignment choices use the live Team leaderboard display name and show first name only.
- The original setter keeps the appointment statistic and personal source appointment.
- The assigned teammate receives a Team-owned appointment mirror without another user writing into their private `users/{uid}` records.
- Recipient sees the appointment in their appointment/timeline surfaces without receiving the setter's appointment statistic.
- Live/next-open appointment notification with Got it and Add to Calendar.
- Setter-facing appointment/log/leaderboard context shows `Booked for [First name]` where applicable.
- Targeted dark-mode contrast fixes for appointment contact suggestions and Editing Appointment.

## Buyer journey added in v1.36.7
- Dedicated Buyers tab inside Prospector, separate from Contacts.
- Add as buyer from the quick-call/buyer-list call outcome flow.
- Fast buyer brief capture: budget, configuration, suburbs, property type and requirement tags.
- Buyer cards show requirement snapshots with one-tap Call and SMS actions.
- Quick and advanced buyer filtering by budget, suburb, configuration, property type, stage, temperature and requirements.
- Buyer journey stages: Looking, Inspecting and Negotiating, followed by Purchased/Owner conversion.
- Mark as Purchased converts the same record into an Owner contact while retaining buyer history and purchase details.
- Buyer records use the existing UID-scoped Prospector sync document; no new Firestore collection or rule is introduced.

## Buyer UI refinement added in v1.36.8
- Fixed Buyers-tab horizontal overflow and clipped content on iPhone-width viewports.
- Simplified the buyer database controls to All / Hot / Warm plus the existing advanced Filters control.
- Removed the duplicate in-panel + Buyer action; the existing Prospector + button remains the single add action.
- Shortened the buyer search placeholder so it remains readable beside the keypad and add controls.
- Buyer cards now use a containment-safe grid with compact Call/SMS actions beside the buyer name.
- Last-contact text now sits on its own contained line instead of competing with stage/temperature pills.
- Buyer overview, list and filter surfaces now use the same rounded nested-card geometry as the rest of AGNT.
- Buyer logic, data shape, filtering capability and Buyer → Owner conversion are unchanged.

## Buyer simplicity refinement added in v1.36.9
- Buyer database rows are now intentionally single-line: buyer name, maximum budget, Call and SMS.
- Buyers are sorted A–Z by name for fast scanning.
- Budget capture is now one maximum-budget slider; the previous minimum/maximum range UI is removed.
- Existing buyer records remain compatible; legacy minimum-budget data is only used as a fallback display value when no maximum was previously stored.
- New/edited buyer records save `buyerBudgetMin` as `0` and store the selected maximum in the existing `buyerBudgetMax` field, so no Firebase schema or migration is introduced.
- Buyer filtering now uses one `Buyer budget at least` slider, designed to find buyers whose maximum budget can meet a property price.
- The buyer suburb field now includes a preloaded searchable Sydney suburb list while still allowing manual suburb entry when required.
- Quick filters are reduced to All / Hot / Filters; stage, temperature, configuration, property type and requirements remain in advanced Filters.
- Buyer detail, call/SMS actions, call-result logging and Buyer → Owner conversion remain unchanged.

## Firebase
The frontend is connected to the existing BETA Firebase project `daily-accountability-be0ac`.
The bundled `firestore.rules` is unchanged from the supplied v1.36.6 baseline, including its existing Team/private-data and Team appointment permissions.
No Firebase Console, Firestore rule or data migration change is required for this release. The bundled rules are retained unchanged from the supplied baseline.

## Protected systems retained
Existing Firebase/Auth UIDs, `users/{uid}` personal data, days, contacts, prospecting, appointments, notes/history, Team membership/leaderboard data, UID-scoped local cache shapes, offline Firestore sync, manifest/icon identity and service-worker behaviour remain preserved. Only release cache identifiers were bumped.
