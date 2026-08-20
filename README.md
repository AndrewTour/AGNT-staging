# AGNT BETA v1.36.7 — Buyer Journey Foundation

Incremental BETA update built directly on the confirmed working AGNT BETA v1.36.6 package supplied on 20 August 2026.

## Release baseline
- Application/UI source: confirmed working `AGNT-beta-main 3.zip` (v1.36.6 baseline).
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

## Firebase
The frontend is connected to the existing BETA Firebase project `daily-accountability-be0ac`.
The bundled `firestore.rules` is unchanged from the supplied v1.36.6 baseline, including its existing Team/private-data and Team appointment permissions.
No Firebase Console, Firestore rule or data migration change is required for this release. The bundled rules are retained unchanged from the supplied baseline.

## Protected systems retained
Existing Firebase/Auth UIDs, `users/{uid}` personal data, days, contacts, prospecting, appointments, notes/history, Team membership/leaderboard data, UID-scoped local cache shapes, offline Firestore sync, manifest/icon identity and service-worker behaviour remain preserved. Only release cache identifiers were bumped.
