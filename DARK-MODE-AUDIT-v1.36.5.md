# AGNT v1.36.5 — Dark Mode Contrast Audit

This release is a visual-only dark-mode hardening pass.

## Areas reviewed

- Persistent PWA chrome and bottom navigation
- Home metric controls and pace indicators
- Today overview / schedule / scorecard / daily log
- Welcome screen / returning snapshot / off-day review / day review
- Appointments / OFI / follow-up / outcomes
- Appointment assignment popup / booked-for-you notification
- Leaderboard / agent summary / period controls
- Prospector Today / Contacts / Pipeline / Market Pulse / Broadcast / Insights
- Prospecting sessions and review overlays
- Knocking session / Hot Spotting / capture / history
- Settings / appearance / workday / calendar preferences
- Team onboarding / team manager / remove / leave / delete / invite-code refresh
- Calendar
- Manual dialler / manual call outcome
- Generic action sheets and confirmation overlays

## Contrast corrections

- Raised inactive navigation and secondary-label contrast.
- Increased placeholder and disabled-control legibility.
- Darkened blue CTA backgrounds where small white labels required more contrast.
- Corrected green completion-button foreground contrast.
- Added dark-native Broadcast progress, readiness, token, warning and success states.
- Added dark-native OFI summary and appointment outcome colours.
- Strengthened borders between cards, fields and overlays.
- Normalised secondary buttons, dropdowns, inputs and modal controls.
- Preserved semantic blue / green / amber / red states while making them readable on dark surfaces.
- Kept the consumer authentication screen intentionally light, matching the existing product decision.

## Protected systems

No changes to app logic, Firebase, Authentication, Firestore rules or paths,
UID separation, storage/data formats, sync behaviour, Team logic, appointment
attribution, Pipeline logic, leaderboard calculations or snapshot cadence.
