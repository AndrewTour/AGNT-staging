# AGNT v1.34.1 STAGING — UI Polish + Weekly Leaderboard Sync

## Appointment correction

- Restored the Appointments surface to the v1.33.2 Staging 12 presentation.
- Removed appointment-specific v1.34.0 polish overrides that could surface/restyle controls unexpectedly.
- No appointment workflow, data or booking logic changed.
- Weekly leaderboard live-sync fix remains unchanged.

Built incrementally from AGNT Staging 12 / v1.33.2 Complete Team Workflow.

## Changes in this staging build

- Adds a universal nested-screen/back-navigation treatment across prospecting sessions, buyer sessions, appointment flows, knocking history, team onboarding and secondary prospecting screens.
- Standardises touch targets, selected states, form radii, nested-card hierarchy and session control spacing for the installed iPhone PWA.
- Adds explicit dark-mode contrast for secondary buttons, segmented controls, modal close controls, forms and nested session surfaces.
- Fixes current-week leaderboard freshness by deriving the current weekly row from the same synced daily records used by the daily leaderboard, while retaining published `weekHistory` for historical weeks and backward compatibility.
- Publishes `weeklyKnockTarget` inside the existing leaderboard document so the derived weekly score can preserve the configured weekly knocking target without adding a new Firestore path or schema migration.
- Bumps the service-worker cache key so installed staging PWAs receive the updated CSS and JavaScript.

## Protected systems unchanged

Firebase configuration, authentication, UID separation, Firestore paths/rules, personal data documents, local cache, prospecting persistence, team membership writes, invite-code workflow and deployment model are unchanged.

---

# AGNT v1.33.2 STAGING — Complete Team Workflow

STAGING ONLY. Built directly from the verified v1.32.8 Team Refinement release. BETA and the BETA Firebase project are not changed by this package.

## Refined onboarding

- Team creation now finishes on a dedicated success screen showing the team name and invite code.
- The owner can immediately **Share invite**, **Copy code** or select **Done**.
- Native iOS and Android sharing is used when available; copy is the fallback.
- A valid join code now shows the team name and code for confirmation before any membership write occurs.
- Active members must leave their current team before selecting Solo, creating a team or joining another team.

## Owner invite controls

- Team Management now includes **Share**, **Copy** and **Refresh invite code**.
- Refreshing uses one atomic batch to update the team, create the replacement lookup and delete the previous lookup.
- The previous code stops working immediately while all current members remain connected.
- Duplicate refresh submissions and offline attempts are blocked.

## Member leave experience

- Adds **Leave team** in Settings for ordinary members only.
- Team owners continue to see **Manage members** and cannot leave through the member workflow.
- Requires a clear confirmation before any team access changes.
- Explains that contacts, notes, appointments, activity history and account data remain protected.
- Removes the member's team membership and private team leaderboard row in one atomic batch.
- Updates only the member's team-selection fields; all other `users/{uid}` data remains untouched.
- Opens one next-step screen after leaving: continue Solo, create a team or join another team.
- Keeps Create, Join and Solo unavailable to an active team member until they leave first.

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
- Opens the existing setup sheet so the user can select Solo, create a team or join another team.

This also works after a later login: server membership is re-verified before team access is restored.

Voluntary member leave uses the same protected recovery layer, with wording that confirms the member chose to leave and presents all three next-step options.

## Firebase requirements

No Firebase configuration, Firestore rule, index, Function, billing or schema migration is required. The existing staging rules already permit owners to manage access and rotate invite codes, and ordinary members to delete their own membership and team leaderboard row. Members can also update their own team-selection fields without changing personal records.

## Protected systems unchanged

- Staging Firebase project configuration
- Email/password authentication and persistence
- Personal `users/{uid}` data paths and formats
- Day, appointment, contact, note and prospecting persistence
- UID separation and offline Firestore cache
- Leaderboard payload format and one-writer behaviour
- Underlying Solo/Create/Join Firebase writes and document formats
- Join-code confirmation and post-creation handoff are UI workflow layers over the same existing writes
- Manifest and icons
- Service-worker behaviour apart from the required cache version
