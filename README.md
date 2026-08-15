# AGNT v1.33.0 STAGING — Team Management

STAGING ONLY. Built directly from the verified v1.32.8 Team Refinement release. BETA and the BETA Firebase project are not changed by this package.

## Owner management experience

- Adds an owner-only **Manage members** action in Settings.
- Shows a live list of verified team members with name, email, role and current leaderboard activity.
- Keeps the owner visually identified and prevents owner self-removal.
- Includes the current invite code with one-tap copy.
- Uses the existing AGNT sheet, typography, fields, spacing and dark-mode language.
- Adds accessible confirmation, progress, success and failure states.

## Safe member removal

Removing a member uses one atomic Firestore batch to:

1. Delete `teams/{teamId}/members/{memberUid}`.
2. Delete `teams/{teamId}/leaderboard/{memberUid}`.
3. Replace the team's invite code.
4. Create the new `teamCodes/{newCode}` lookup.
5. Delete the previous invite-code lookup.

The code refresh prevents the removed member from rejoining with an invite code they already know. The removed member's `users/{uid}` profile, days, appointments, contacts, notes and prospecting state are never deleted or edited by the owner action.

## Removed-member recovery

Every team account now listens to its own membership document. After a confirmed removal, AGNT:

- Stops the private team leaderboard subscription.
- Clears the verified team cache on that device.
- Preserves all personal data and normal personal-data sync.
- Explains that team access changed.
- Opens the existing setup sheet so the user can select Solo or join another team.

This also works after a later login: server membership is re-verified before team access is restored.

## Firebase requirements

No Firebase configuration, Firestore rule, index, Function, billing or schema migration is required. The v1.32.8 staging rules already permit a team owner to remove a member, remove that member's team leaderboard summary, update the team invite code and replace its lookup atomically.

## Protected systems unchanged

- Staging Firebase project configuration
- Email/password authentication and persistence
- Personal `users/{uid}` data paths and formats
- Day, appointment, contact, note and prospecting persistence
- UID separation and offline Firestore cache
- Leaderboard payload format and one-writer behaviour
- Solo/Create/Join flows
- Manifest and icons
- Service-worker behaviour apart from the required cache version

