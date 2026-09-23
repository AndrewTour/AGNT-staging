# AGNT v1.44.1 — My Market property view

Baseline: v1.44.0 My Market Insights.

The My Market Refine control now has a full-width section header and a readable selected-filter summary. The flat property rows follow the contact-list pattern and show a factual count of saved contacts on the same street. Opening a property now shows a dedicated in-app property screen, with a back action that restores the list position. Current listings, sold results and campaign changes get distinct conversation context. The screen brings together saved street contacts, existing campaign facts, reported price history and property-linked outreach. It makes no claim that a contact has been spoken to merely because they match the street.

Changed: index.html (Refine header and property screen); app.js (screen routing and existing-data presentation); styles.css (scoped flat rows, detail and Refine layout); runtime.js and service-worker.js (release IDs); RELEASE-NOTES.md (this release only).

No data model, matching rules, retention, Firebase configuration, authentication, UID separation, Firestore paths/rules, storage keys, sync, MarketPulse import, call/SMS/task/appointment workflows or service-worker lifecycle changed. No Firebase Console, Firestore rules or GitHub settings change is required.

Validation: JavaScript syntax, source/reference checks, My Market model and interaction regressions, archive integrity. Visual layout on a physical iPhone and live Firebase sync require device verification.
