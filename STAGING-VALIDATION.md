# AGNT v1.32.6 Teams v2 + Passkey — Staging Validation Record

## Status
Code preparation complete. The separate staging Firebase config is present. Runtime Teams v2 and passkey validation has NOT YET BEEN COMPLETED.

This build must not be promoted to production until every runtime test below passes against the staging project.

## Static safeguards confirmed
- Built from stable v1.30.21 source.
- `publishLeaderboard()` is byte-for-byte unchanged from stable.
- `persistDayToCloud()` is byte-for-byte unchanged from stable.
- `saveDay()` is byte-for-byte unchanged from stable.
- `saveTargets()` is byte-for-byte unchanged from stable.
- `saveProspecting()` is byte-for-byte unchanged from stable.
- Stable `leaderboard/{uid}` publication remains present.
- Secure parallel `teams/{teamId}/leaderboard/{uid}` publication is additive.
- No `ensureLegacyTeamPana` automatic migration exists.
- No global leaderboard collection listener exists in the Teams UI.
- Team code does not call `syncHasError` or `endSyncOperation({error:true})`.
- Create Team and Join Team use Firestore write batches.
- Production Firebase project ID is absent from staging `firebase-config.js`.
- Manifest and PWA icons are unchanged.
- JavaScript syntax check passes.
- Passkey UI is additive to the v1.32.5 STAGING baseline.
- Passkey authentication returns the same Firebase UID through a staging custom token.
- Passkey server collections are accessed only by the staging Function; `firestore.rules` is unchanged.
- The passkey Function target and `.firebaserc` reference `agnt-staging-cb6ce` only.

## Runtime test matrix
### Core regression
- [ ] Existing account signs in
- [ ] Existing days load
- [ ] Calls sync
- [ ] Connects sync
- [ ] Data sync
- [ ] Knocking sync
- [ ] Targets sync
- [ ] Prospecting sync
- [ ] Appointments sync
- [ ] Offline activity remains locally available
- [ ] Reconnect flushes normal core writes
- [ ] `leaderboard/{uid}` still publishes

### Existing / legacy analogue
- [ ] Existing account with no team metadata loads normally
- [ ] No automatic Team Pana migration occurs
- [ ] Account shows private/self leaderboard until explicitly configured
- [ ] Team setup failure does not set main Sync Error

### Solo
- [ ] New account can choose Solo
- [ ] Solo sees only self in leaderboard
- [ ] Solo core sync remains normal
- [ ] Interrupted Solo setup does not block app

### Create Team
- [ ] Team owner can create a team
- [ ] Team, owner membership, join code and profile metadata commit atomically
- [ ] Owner receives/retains join code
- [ ] Owner appears in secure team leaderboard
- [ ] Failure leaves core sync unaffected
- [ ] Retry does not create a partial membership/profile state

### Join Team
- [ ] Valid code joins expected team
- [ ] Invalid code is rejected
- [ ] Team membership and profile metadata commit atomically
- [ ] Joined user appears in team leaderboard
- [ ] Joined user cannot see another team's leaderboard
- [ ] Duplicate join is safe/idempotent

### Team B isolation
- [ ] Team B owner/member cannot read Team Pana leaderboard
- [ ] Team Pana cannot read Team B leaderboard
- [ ] Global legacy leaderboard is self-readable only under staging rules
- [ ] teamCodes collection cannot be listed

### Failure / recovery
- [ ] Offline during Create Team is contained and core app remains usable
- [ ] Offline during Join Team is contained and core app remains usable
- [ ] Missing membership with stale profile falls back safely
- [ ] Team leaderboard permission error does not set main Sync Error
- [ ] Core personal-data permission error still sets main Sync Error
- [ ] App closed during onboarding resumes core app safely
- [ ] Logout/login between two UIDs keeps local cache separated
- [ ] Installed iPhone PWA cache updates correctly

### Passkey / Face ID
- [ ] Existing staging email/password user can add a passkey
- [ ] Passkey appears as Active in Settings
- [ ] iPhone Safari Face ID sign-in succeeds
- [ ] Installed iPhone PWA Face ID sign-in succeeds
- [ ] Android Chrome passkey sign-in succeeds
- [ ] Passkey sign-in returns the original Firebase UID
- [ ] Solo account state remains unchanged after passkey sign-in
- [ ] Team membership and secure leaderboard remain unchanged after passkey sign-in
- [ ] Existing days, targets, appointments and prospecting data load normally
- [ ] Removing a passkey disables that credential
- [ ] Email/password recovery remains available
- [ ] Passkey service failure does not set the main AGNT Sync Error

## Promotion gate
Production changes are prohibited until all boxes above are passed and the exact tested staging rules/configuration are reviewed separately.
