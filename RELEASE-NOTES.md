# AGNT v1.44.2 — My Market opportunities

Baseline: v1.44.1 My Market Property View.

The bottom navigation label is Core. The market section is Market, while the page heading remains My Market. Section headings for Reach, Contacts and Pipeline are explicit so the Core tab label does not replace them.

Market Snapshot is first, followed by Refine, Show and the existing full-width property list. The redundant explanatory paragraph was removed. The Show control includes cumulative 60+, 90+ and 120+ current-campaign views. Property rows use compact status colours for current, 60+, 90+, 120+, sold and withdrawn. The duration for a current campaign uses reported days on market plus elapsed calendar time where present, or a conservative minimum since AGNT's first listing report; a relisting starts a new campaign. No age is claimed for a status-unconfirmed property. The property view makes clear that an imported report may not establish the live campaign status.

An exact saved property-address match is highlighted separately from street contacts, with an SMS-ready indicator only when the contact and campaign are eligible. This is a possible owner contact, not proof of ownership. For a 60+, 90+, 120+ or withdrawn campaign, an exact-address contact with a usable mobile and no Do Not Contact outcome can open a stage-specific draft in Messages. The agent reviews and edits there; AGNT asks whether it was sent on return and only then logs an SMS interaction against the existing property key. The logged note describes the prepared draft, since AGNT cannot read edits made in Messages. No message is sent automatically.

Changed: index.html (labels/order); app.js (campaign signals, exact-address matching, SMS draft and confirmation); styles.css (scoped colour and layout); runtime.js and service-worker.js (release identifiers); RELEASE-NOTES.md (current notes only).

No Firebase configuration/auth/UID paths, Firestore rules, sync architecture, storage shapes, MarketPulse parsing/retention, metrics, other SMS/call/task/appointment workflows, PWA lifecycle, manifest or icons changed. No Firebase Console, Firestore rules or GitHub settings changes are required.

Validation: JavaScript syntax, reference and ID checks, campaign threshold/owner match/message tests, existing My Market/storage regressions and ZIP integrity. A physical iPhone, Messages return and live Firebase sync still require device verification.
