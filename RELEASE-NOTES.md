# AGNT v1.44.3 — My Market contacts

Baseline: v1.44.2 My Market Opportunities.

The property detail keeps all existing headings and campaign/owner actions. Recorded Outreach appears before People on This Street. It uses the same flat contact-row format as street contacts, without initials circles; each row opens the existing contact profile. Confirmed connected call outcomes sort ahead of sent SMS, followed by other attempts, with the latest outcome and date shown without treating an SMS as a conversation. Existing requested/triggered follow-up context remains visible.

People on This Street is a collapsed disclosure. Contacts already present in property-linked outreach are omitted from that secondary list, and the count describes remaining street contacts. The street-address caveat remains. The disclosure stays open during a data refresh of the same property.

Changed: app.js (property detail contact rows/order, disclosure state); styles.css (scoped row/disclosure appearance); index.html, runtime.js and service-worker.js (matching release identifiers); RELEASE-NOTES.md (current notes only).

Firebase configuration, authentication, UID/Firestore paths and rules, storage data shapes, MarketPulse parsing and retention, SMS actions, all other navigation and PWA lifecycle behaviour are unchanged. No Firebase Console, Firestore rules or GitHub settings changes are required.

Validation: JavaScript syntax, property-detail markup/order and contact grouping checks, release reference consistency and ZIP integrity. Physical iPhone, live Firebase and production testing were not performed.
