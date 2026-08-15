# AGNT v1.34.1 UI Polish + Weekly Sync — Staging Validation

## Added validation

- [x] JavaScript syntax check passes after weekly leaderboard derivation update.
- [x] Current weekly leaderboard can be reconstructed from each member's synced daily records.
- [x] Historical weekly leaderboard continues to read the existing published `weekHistory`.
- [x] No new Firestore collection, document path, index or rule is required.
- [x] Universal nested back controls share minimum 44px touch targets.
- [x] Session, appointment and knocking secondary headers share one visual navigation language.
- [x] Dark-mode secondary buttons, segmented controls, inputs and close controls receive explicit contrast.
- [ ] Verify two signed-in staging team members: change today's Calls/Connects/Data and confirm both Daily and current Weekly views update on the second device.
- [ ] Verify installed iPhone Home Screen PWA in Light, Dark and System appearance.
- [ ] Verify Buyer Session, Prospecting Session, Hot Spotting SMS, Appointment booking-from-session and Knocking History back navigation.

---

# AGNT v1.33.2 Complete Team Workflow — Staging Validation

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
- [x] Removed member loses team state and sees Solo/Create/Join setup with a data-safety message.
- [x] Cached-team, fresh-team, Solo, Create Team and Join Team regression scenarios still pass.
- [x] JavaScript and service-worker syntax validation passes.
- [x] Ordinary member sees **Leave team**; owner does not.
- [x] Leave confirmation names the current team and explicitly protects personal data.
- [x] Duplicate Leave taps produce one atomic batch.
- [x] Member leave deletes only their team membership and team leaderboard row.
- [x] Member leave updates only the signed-in user's team-selection fields.
- [x] Contacts, notes, days, appointments and prospecting paths are never deleted.
- [x] Failed leave remains in the existing team with no partial write.
- [x] Successful leave opens Solo, Create Team and Join Team choices.
- [x] An active member cannot open those choices before leaving.
- [x] Create Team completes with one batch and opens a dedicated invite handoff.
- [x] Created team name and invite code match the verified team state.
- [x] Native Share payload includes the team name, invite code and current app URL.
- [x] Copy fallback uses the same verified invite code.
- [x] Join code lookup displays the team name before any membership write.
- [x] Join membership is created only after explicit confirmation.
- [x] Duplicate Continue and Join submissions remain blocked.
- [x] Owner Share uses the current invite code.
- [x] Manual invite refresh uses only the team and `teamCodes` paths.
- [x] Manual refresh invalidates the previous code and does not disconnect current members.
- [x] No personal `users/{uid}` record is changed by Share or Refresh.

## Physical-device review

- [ ] Owner opens Settings and sees the correct member count.
- [ ] Member names, emails, roles and activity match the team.
- [ ] Copy invite code works on iPhone and Android.
- [ ] Removing a test member requires confirmation and cannot be double-submitted.
- [ ] Removed member disappears from the owner's list and leaderboard.
- [ ] Owner sees a new invite code after removal; old code can no longer join.
- [ ] Removed member's contacts, notes, appointments and historic activity remain intact.
- [ ] Removed member is prompted to choose Solo, create a team or join another team.
- [ ] Remaining members continue syncing almost instantly.
- [ ] UI matches AGNT in light mode, dark mode and installed PWA mode.
- [ ] Ordinary member sees **Leave team** in Settings; owner does not.
- [ ] Cancel leaves membership and leaderboard unchanged.
- [ ] Leaving removes the member from the owner's live member list and leaderboard.
- [ ] Leaving member retains contacts, notes, appointments and historic activity.
- [ ] Leaving member sees Solo, Create Team and Join Team immediately afterwards.
- [ ] Creating a team opens the invite handoff before returning to the app.
- [ ] Share invite opens the native iPhone and Android share sheet.
- [ ] Copy code works when native sharing is unavailable.
- [ ] Joining shows the correct team name and requires a second confirmation.
- [ ] Cancelling the join confirmation creates no membership.
- [ ] Refreshing an invite code keeps current members connected and disables the previous code.

## Promotion gate

Do not port this release to BETA until Create, Share, Join confirmation, manual invite refresh, owner removal and voluntary member leave have been reviewed in staging with at least one owner and one disposable member account.


## Appointments regression check

- Confirm the Appointments landing screen matches Staging 12 and no additional button is shown.
- Confirm Past and Upcoming Appointments still open normally.
- Confirm booking, editing and deleting an appointment behave exactly as before.
- Confirm the current-week leaderboard still updates from live daily records.
