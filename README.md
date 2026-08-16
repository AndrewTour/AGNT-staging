# AGNT v1.34.5 STAGING — Persistent Pipeline Refresh

## v1.34.5 changes

- Pipeline Session refresh returns as a small control at the bottom of the session card.
- Refresh uses the existing eligibility and sorting logic unchanged.
- A per-user, per-day local served list excludes every contact already loaded in a Pipeline Session that day, so repeated refreshes advance A → B → C rather than cycling A → B → A.
- Refresh remains unavailable in Hot Spotting sessions.
- Confirmation is required before the queue changes. Existing logged activity and session statistics are retained.
- No Firebase, Firestore, authentication, leaderboard, Broadcast, team or other workflow changes.

---

# AGNT v1.34.3 STAGING — Broadcast + Pipeline Session Refinement

## v1.34.3 changes

- Fixed dark-mode contrast in the Broadcast campaign selector without changing the Broadcast workflow.
- Removed the dead Contacts back button from the normal Contacts database view.
- Constrained the Broadcast 1–2–3 progress indicator so it remains fully inside the iPhone viewport through the complete workflow.
- Added a small refresh action to active Pipeline Sessions. It asks for confirmation, then replaces the current queue with up to 50 new eligible contacts using the exact existing pipeline eligibility and ordering logic.
- Previously logged activity and session stats are preserved when refreshing; no prospecting criteria, Firebase paths, sync architecture or leaderboard behaviour changed.
- Preserved all v1.34.2 UI/button contrast corrections and the working current-week leaderboard sync fix.

# AGNT v1.34.2 STAGING — Button Contrast Restore

## v1.34.2 correction

- Restored button colour and contrast behaviour to the pre-polish Staging/BETA treatment in both light and dark mode.
- Corrected a selector that was applying disabled opacity/saturation to every button.
- Disabled styling now applies only to genuinely disabled or aria-disabled controls.
- Removed v1.34-specific dark-mode button recolouring so the proven existing button styles remain authoritative.
- Preserved the v1.34 button geometry/touch-target improvements, universal navigation treatment and weekly leaderboard sync fix.
- No Firebase, authentication, Firestore path/rule, team workflow or data changes.

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


## v1.34.6 — Returning Daily Snapshot
- Returning authenticated opens no longer flash the login form while Firebase restores a persisted session.
- Established users see a ~2.8 second time-aware snapshot using cached data first, with live values refreshed as sync arrives.
- Snapshot shows completion, activity remaining, appointments, pipeline availability/current session, knocking status and live leaderboard position where available.
- Signed-out users still receive the existing login screen. First-use welcome/team setup and off-day review behaviour are preserved.
- No Firebase paths, rules, auth persistence, UID separation, prospecting logic, leaderboard logic or team workflow changed.


## v1.34.7 — Expanded Returning Daily Snapshot

Incremental snapshot-only refinement built from v1.34.6. The returning PWA snapshot now uses the available iPhone viewport more deliberately with live Day Pulse and Leaderboard cards plus a full-width Next Block recommendation. Existing snapshot timing, auth restore, first-use flow, off-day flow and all application logic remain unchanged.


## v1.34.8 — Consumer Login + 4 Second Snapshot

- Returning daily snapshot handoff changed from 2.8 seconds to 4 seconds; tap-to-dismiss remains unchanged.
- Removed staging/debug/troubleshooting text from the login surface and replaced raw authentication errors with concise consumer-facing messages.
- No other application functionality or UI was changed.
