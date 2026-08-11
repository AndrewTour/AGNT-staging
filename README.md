# AGNT v1.32.5-staging — Teams v2

STAGING ONLY. Built from the stable pre-Teams v1.30.21 source. This package deliberately contains no production Firebase credentials.

## Core paths preserved
- `users/{uid}`
- `users/{uid}/days/{date}`
- `users/{uid}/prospecting/state`
- `leaderboard/{uid}` publication

`publishLeaderboard()` remains the stable writer to `leaderboard/{uid}`. Teams are additive and use a separate secure read/write mirror under `teams/{teamId}/leaderboard/{uid}`.

## Team layer
- Solo account mode
- Create Team
- Join Team by private code
- Verified membership under `teams/{teamId}/members/{uid}`
- Team account information in Settings
- Secure team-only leaderboard listener
- Separate team error state that does not set the main accountability Sync Error
- No automatic legacy migration on login

## Firestore schema
- `teams/{teamId}`
- `teams/{teamId}/members/{uid}`
- `teams/{teamId}/leaderboard/{uid}`
- `teamCodes/{code}`

Create Team and Join Team use atomic Firestore write batches. User profile team metadata is committed in the same atomic operation as the required team/membership records, preventing partial profile-first migration states.

## Staging setup required
1. Create a separate Firebase project for AGNT staging.
2. Enable Email/Password Authentication.
3. Create Firestore.
4. Replace the placeholders in `firebase-config.js` with the staging Web App config only.
5. Deploy the included `firestore.rules` to the staging project only.
6. Host this build on a staging-only GitHub Pages target. Do not point production Pages at this branch.

## Test accounts required
- Team Pana owner analogue
- Team Pana existing-member analogue
- Additional Team Pana member analogue
- New Team Pana joiner
- Solo user
- Team B owner
- Team B member

## Important
No production migration has been implemented. Existing users with no team metadata remain unassigned and continue normal core sync. They can explicitly configure Solo or join/create a team from Settings in staging.
