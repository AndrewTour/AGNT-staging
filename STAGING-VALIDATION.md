# AGNT v1.32.8 Team Refinement — Staging Validation Record

## Status

Static preparation and local simulated-Firebase validation complete. Runtime Firebase, GitHub Pages and physical-device validation have not been performed.

This build must remain in staging until the runtime checks below pass.

## Static safeguards confirmed

- Built directly from the verified v1.32.7 staging release.
- No passkey backend, Firebase Function or Cloudflare Worker files are included.
- Firebase project configuration and Firestore rules are byte-for-byte unchanged.
- Manifest and PWA icons are byte-for-byte unchanged.
- Core Firestore paths, security boundaries and document formats are unchanged.
- `persistDayToCloud()`, `saveDay()`, `saveTargets()` and `saveProspecting()` remain unchanged.
- Create Team and Join Team remain atomic Firestore batches.
- Team accounts can publish only to their secure team leaderboard through the active publisher.
- Solo accounts can publish only to their personal legacy row through the active publisher.
- Team-only publication errors remain separate from core personal-data Sync Error state.
- JavaScript and service-worker syntax validation passes.

## Automated local scenarios passed

- Cached-team launch restored the secure listener before background profile verification.
- Fresh-team launch verified membership and loaded the correct secure leaderboard.
- Membership and team documents were requested concurrently.
- Solo launch stayed private and performed no team verification reads.
- Team scenarios wrote only `teams/{teamId}/leaderboard/{uid}`.
- Solo scenarios wrote only `leaderboard/{uid}`.
- No tested account issued both leaderboard writes.
- Status progressed from `TEAM SYNCING` to `TEAM LIVE` without generic `LIVE` or legacy labels.
- Offline and reconnect status changes preserved the existing leaderboard rows.
- Metadata-only cache/server snapshots preserved unchanged leaderboard row nodes.
- Create Team committed its four records once despite a simulated double tap.
- Join Team committed its two records once despite a simulated double tap.
- Create and Join both completed verification, secure publication and UID-specific caching.
- Owner invite code displayed and copied successfully; member view kept it hidden.
- Choice, Create and Join panels maintained correct accessible dialog labels.
- Team codes normalised to uppercase alphanumeric characters.

## Runtime test matrix

### Cross-device speed and reliability

- [ ] Change Calls on device A and time the update appearing on device B.
- [ ] Change Connects on device B and time the update appearing on device A.
- [ ] Confirm the team account creates no new `leaderboard/{uid}` write.
- [ ] Confirm only `teams/{teamId}/leaderboard/{uid}` changes for team activity.
- [ ] Repeat changes quickly and confirm the final value reaches both devices.
- [ ] Confirm the main badge progresses through Saving to Live.
- [ ] Confirm a team-only error appears on the leaderboard without changing core sync to Sync Error.

### Startup and status stability

- [ ] Existing team user signs in and sees the correct team.
- [ ] Second launch displays cached team statistics immediately.
- [ ] Status progresses from `TEAM SYNCING` to `TEAM LIVE` without flicker.
- [ ] Going offline shows `TEAM OFFLINE` without removing cached statistics.
- [ ] Reconnecting returns to `TEAM LIVE` and publishes the latest statistics.

### Team setup UI

- [ ] Solo, Create Team and Join Team choices match AGNT in light mode.
- [ ] The same screens match AGNT in dark mode.
- [ ] Team name submits from the keyboard and primary button.
- [ ] Team code uppercases automatically and submits from the keyboard and primary button.
- [ ] Slow submission shows a clear loading state and cannot be submitted twice.
- [ ] Invalid or offline setup shows a readable inline error.
- [ ] Owner Settings shows the invite code and Copy works.
- [ ] Member Settings shows the team name and Member badge without exposing the invite-code panel.
- [ ] The sheet remains usable with the iPhone keyboard open and on a short viewport.

### Core regression

- [ ] Existing days, targets and appointments load.
- [ ] Calls, connects, data and knocking save and sync.
- [ ] Prospecting saves and syncs.
- [ ] Offline activity remains locally available and reconnect flushes core writes.
- [ ] Solo accounts publish only `leaderboard/{uid}`.
- [ ] Team accounts publish only `teams/{teamId}/leaderboard/{uid}`.
- [ ] Create Team and Join Team each commit once.

### Team isolation

- [ ] Team Pana cannot read Team B's leaderboard.
- [ ] Team B cannot read Team Pana's leaderboard.
- [ ] Legacy leaderboard documents remain self-readable only.
- [ ] `teamCodes` cannot be listed.

### PWA update

- [ ] GitHub Pages serves v1.32.8 files.
- [ ] Browser refresh loads the v1.32.8 build marker.
- [ ] Installed iPhone PWA replaces the v1.32.7 cache.
- [ ] Closing and reopening retains the correct team.

## Promotion gate

Do not promote to BETA until the runtime matrix passes with a team owner, a team member, a Solo user and a logout/login test between two different UIDs.
