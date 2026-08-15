# AGNT v1.32.7 Team Sync Stability — Staging Validation Record

## Status

Static preparation and local simulated-Firebase validation complete. Runtime Firebase, GitHub Pages and physical-device validation have not been performed.

This build must remain in staging until the runtime checks below pass.

## Static safeguards confirmed

- Built directly from the verified v1.32.5 staging ZIP.
- No passkey backend, Firebase Function or Cloudflare Worker files are included.
- Firebase project configuration is unchanged.
- `firestore.rules` is byte-for-byte unchanged.
- Manifest and PWA icons are byte-for-byte unchanged.
- Core Firestore paths and document formats are unchanged.
- `persistDayToCloud()`, `saveDay()`, `saveTargets()` and `saveProspecting()` remain unchanged.
- Legacy `leaderboard/{uid}` writes remain present.
- Secure `teams/{teamId}/leaderboard/{uid}` reads/writes remain present.
- Create Team and Join Team remain atomic Firestore batches.
- Verified team identity cache is UID-specific and contains no credentials or detailed statistics.
- Remembered membership is re-verified against Firestore on every launch.
- Membership and team document checks run in parallel.
- Stale async team initialisation is rejected after a user/session change.
- Leaderboard status has one state controller.
- Metadata-only snapshots do not rebuild unchanged leaderboard statistics.
- Unrelated profile renders do not rebuild identical leaderboard rows.
- JavaScript syntax validation passes.

## Automated local scenarios passed

- Existing cached-team launch restored the team listener before profile verification completed.
- Fresh team launch verified membership and loaded the correct secure leaderboard.
- Both membership documents were requested concurrently.
- Both scenarios progressed from `TEAM SYNCING` to `TEAM LIVE` without generic `LIVE` or legacy transition labels.
- Cached and server snapshots with identical statistics preserved the existing leaderboard row nodes.
- Both scenarios rendered the expected Andrew and George team rows.

## Runtime test matrix

### Startup and status stability

- [ ] Existing team user signs in normally.
- [ ] First launch verifies the correct team and displays its members.
- [ ] Second launch restores the correct team immediately from cache.
- [ ] Cached statistics remain visible while Firebase confirms the server snapshot.
- [ ] Status progresses from `TEAM SYNCING` to `TEAM LIVE` without reverting or flashing generic `LIVE`.
- [ ] Unchanged cache/server metadata does not visibly redraw the leaderboard.
- [ ] Going offline shows `TEAM OFFLINE` without removing cached statistics.
- [ ] Reconnecting returns to `TEAM LIVE` and publishes current statistics.

### Membership safety

- [ ] A changed team profile stops the old listener and loads the new verified team.
- [ ] A removed membership cannot continue reading the team leaderboard.
- [ ] Invalid membership clears the remembered team state.
- [ ] Logging out and into another UID never displays the previous UID's team.
- [ ] Solo accounts restore as Solo and display only their own row.
- [ ] Unconfigured accounts remain private and can still enter onboarding.

### Core regression

- [ ] Existing days, targets and appointments load.
- [ ] Calls, connects, data and knocking save and sync.
- [ ] Prospecting data saves and syncs.
- [ ] Offline activity remains locally available.
- [ ] Reconnect flushes normal core writes.
- [ ] Legacy `leaderboard/{uid}` still publishes.
- [ ] Team leaderboard publication updates only the signed-in member's row.
- [ ] Team errors do not set the main accountability Sync Error.
- [ ] Core personal-data permission errors still set the main Sync Error.

### Team isolation

- [ ] Team Pana cannot read Team B's leaderboard.
- [ ] Team B cannot read Team Pana's leaderboard.
- [ ] Legacy leaderboard documents remain self-readable only.
- [ ] `teamCodes` cannot be listed.

### PWA update

- [ ] GitHub Pages serves v1.32.7 files.
- [ ] Browser refresh loads v1.32.7.
- [ ] Installed iPhone PWA replaces the v1.32.5/v1.32.6 cache.
- [ ] Closing and reopening the PWA retains the correct team.

## Promotion gate

Do not promote to BETA until the runtime matrix passes with at least one team owner, one team member, one Solo user and a logout/login test between two UIDs.
