# AGNT v1.32.6-staging — Teams v2 + Passkey POC

STAGING ONLY. Built incrementally from the confirmed v1.32.5 STAGING Teams v2 MultiTab Team State Fix package. This package targets Firebase project `agnt-staging-cb6ce` and deliberately contains no production Firebase credentials.

## Passkey proof-of-concept

- Optional Apple/Android WebAuthn passkey sign-in
- Passkey registration, status and removal in Settings
- Existing Firebase UID preserved through a staging custom token
- Email/password, account creation, device-only mode and Teams v2 preserved
- Separate deployable staging Firebase Function included

The Function must be deployed before passkey registration or sign-in can work. Follow `PASSKEY-STAGING-SETUP.md` and do not deploy it to the OG/BETA project.

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
1. Confirm the Firebase CLI is using `agnt-staging-cb6ce`.
2. Enable Email/Password Authentication and Firestore in staging.
3. Deploy the included `firestore.rules` to the staging project only if the Teams v2 rules are not already active.
4. Upgrade the staging project to Blaze and deploy only `functions:passkeyApi` for the passkey test.
5. Host this build on a staging-only HTTPS target. Do not point production Pages at this branch.

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
