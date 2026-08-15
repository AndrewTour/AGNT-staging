# AGNT v1.32.8 STAGING — Team Refinement

STAGING ONLY. Built incrementally from the verified v1.32.7 Team Sync Stability release, which was built from the clean v1.32.5 Teams v2 staging package. No passkey backend, Firebase Function or Cloudflare Worker code is included.

## Sync refinement

- Uses exactly one active leaderboard publication path per account.
- Team accounts publish only to `teams/{teamId}/leaderboard/{uid}`.
- Solo accounts publish only to `leaderboard/{uid}`.
- Removes the redundant legacy leaderboard write from team activity updates.
- Tracks secure team publication in the visible saving state without turning a team-only error into a core-data Sync Error.
- Retains the v1.32.7 cached-team launch, parallel membership verification, stable connection state and unchanged-row rendering improvements.

Personal days remain the source of truth at `users/{uid}/days/{date}`. Leaderboard publishing remains a derived summary and does not change personal data persistence.

## Team UI refinement

- Rebuilt Solo/Create/Join setup as a native AGNT bottom sheet on mobile and modal on larger screens.
- Matched existing AGNT typography, black primary actions, soft fields, spacing, borders and dark mode.
- Added clearer private-team explanations and account-state language.
- Added normalised uppercase invite-code entry and Enter-key submission.
- Added loading states, accessible status messages and duplicate-submission protection.
- Added owner invite-code presentation and one-tap copy in Settings.
- Added live, updating, offline, error and Solo states to the Team settings summary.

## Protected systems unchanged

- Firebase project configuration
- Email/password authentication and persistence
- Firestore collection and document paths
- Firestore security rules
- User UID separation
- Personal day, target and appointment formats
- Prospecting data format and sync path
- Leaderboard payload format
- Atomic Create Team and Join Team batches
- Offline Firestore cache
- Manifest and icons
- Service-worker behaviour, apart from the required release cache identifier

## Active publication paths

- Team account: `teams/{teamId}/leaderboard/{uid}` only
- Solo account: `leaderboard/{uid}` only

All existing Firestore paths remain available; this release only prevents team accounts from making the redundant legacy leaderboard write.

## Firebase configuration

No Firebase Console, Authentication, Firestore rules, schema, index or billing change is required. The included `firebase-config.js` and `firestore.rules` files are byte-for-byte unchanged from v1.32.7 and v1.32.5.

Deploy the frontend files only to the separate `AGNT-staging` GitHub Pages repository. Do not upload this build to BETA until the physical-device validation passes.
