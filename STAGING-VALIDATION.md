# AGNT v1.33.0 Team Management — Staging Validation

## Automated checks completed

- [x] Owner sees **Manage members**; a normal member does not.
- [x] Owner member list subscribes live; normal members do not load the management list.
- [x] Owner, Member and current-user states render correctly.
- [x] Owner cannot remove themselves through the interface.
- [x] Removal confirmation states that personal data will not be deleted.
- [x] Duplicate Remove taps produce one atomic batch.
- [x] Batch targets only the team membership, team leaderboard, team record and invite-code mappings.
- [x] No `users/{uid}` write or delete occurs during removal.
- [x] Old invite code is deleted and a new 10-character code is displayed.
- [x] Removed member loses team state and sees Solo/Join setup with a data-safety message.
- [x] Cached-team, fresh-team, Solo, Create Team and Join Team regression scenarios still pass.
- [x] JavaScript and service-worker syntax validation passes.

## Physical-device review

- [ ] Owner opens Settings and sees the correct member count.
- [ ] Member names, emails, roles and activity match the team.
- [ ] Copy invite code works on iPhone and Android.
- [ ] Removing a test member requires confirmation and cannot be double-submitted.
- [ ] Removed member disappears from the owner's list and leaderboard.
- [ ] Owner sees a new invite code after removal; old code can no longer join.
- [ ] Removed member's contacts, notes, appointments and historic activity remain intact.
- [ ] Removed member is prompted to choose Solo or join another team.
- [ ] Remaining members continue syncing almost instantly.
- [ ] UI matches AGNT in light mode, dark mode and installed PWA mode.

## Promotion gate

Do not port this release to BETA until the owner/removal workflow has been reviewed in staging with at least one owner and one disposable member account.
