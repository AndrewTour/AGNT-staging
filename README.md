# AGNT v1.32.7 STAGING — Team Sync Stability

STAGING ONLY. Built incrementally from the verified clean `AGNT-v1.32.5-STAGING-Teams-v2-MultiTab-Team-State-Fix.zip` package. No passkey backend, Firebase Function or Cloudflare Worker code is included.

## Stability improvements

- Restores the last verified Solo/Team identity from UID-specific local storage on launch.
- Starts the secure team leaderboard listener immediately for a remembered team.
- Re-verifies the profile, membership and team records against Firestore in the background.
- Reads the membership and team documents in parallel.
- Uses one controller for `TEAM SYNCING`, `TEAM LIVE`, `TEAM OFFLINE` and `TEAM ERROR`.
- Prevents the legacy leaderboard publisher from overwriting the team connection label.
- Keeps cached team statistics visible while Firebase confirms the live snapshot.
- Avoids rebuilding identical leaderboard rows during metadata-only cache/server transitions and unrelated profile renders.
- Invalid or changed membership clears the remembered team safely.
- Async team initialisation from an older login cannot apply to a newer user session.

The remembered state contains only account mode, team ID, role, name and the owner's join code. It is namespaced to the Firebase UID. Firestore security rules remain the authority and every launch re-verifies membership.

## Protected systems unchanged

- Firebase project configuration
- Email/password authentication and persistence
- Firestore collection and document paths
- Firestore security rules
- User UID separation
- Personal day/target/appointment data formats
- Prospecting data format and sync path
- Legacy `leaderboard/{uid}` publication path and payload
- Secure `teams/{teamId}/leaderboard/{uid}` path and payload
- Atomic Create Team and Join Team batches
- Offline Firestore cache
- Manifest and icons
- Service-worker behaviour, apart from the required release cache identifier

## Firestore paths

- `users/{uid}`
- `users/{uid}/days/{date}`
- `users/{uid}/prospecting/state`
- `leaderboard/{uid}`
- `teams/{teamId}`
- `teams/{teamId}/members/{uid}`
- `teams/{teamId}/leaderboard/{uid}`
- `teamCodes/{code}`

## Firebase configuration

No Firebase Console, Authentication, Firestore schema, index or billing change is required for this release. The included `firestore.rules` file is byte-for-byte unchanged from v1.32.5.

Deploy the frontend files only to the separate `AGNT-staging` GitHub Pages repository. Do not upload this build to BETA.
