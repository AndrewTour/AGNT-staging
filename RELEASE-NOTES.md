# AGNT v1.44.0 — My Market Insights

Baseline: v1.43.2 My Market Refinement.

My Market now puts a concise market snapshot above the existing full-width property list. Current listings show new listing reports in the last seven days, campaigns with recorded guide changes and a median guide when at least three exact prices are available. Sold results show median disclosed sale price, source-reported days on market and sale movement from the first recorded guide when each metric has at least three valid records. Other views show their corresponding activity counts. Filters continue to apply to all figures.

The snapshot follows the useful hierarchy of agent-facing market products: inventory, campaign movement and sold evidence. AGNT does not receive listing views, enquiries or promotion data from Ignite or Domain Skylight, so it does not present those metrics or pretend the import is whole-market coverage. Agency/agent activity and the existing seller-contact comparable estimate remain available below the list. Campaign history, outreach and all status filters remain available.

New price figures exclude ranges and undisclosed results. Missing source days-on-market figures are not inferred from email dates. The snapshot is based only on imported records; medians require at least three valid observations from one suburb and one recorded property category. Mixed selections retain activity counts and prompt for a narrower comparison. Data that older builds discarded cannot be restored.

Changed: app.js (selection-based snapshot); index.html (snapshot placement and clear scope labels); styles.css (scoped flat snapshot); runtime.js and service-worker.js (release IDs); RELEASE-NOTES.md (current notes only).

Matching, retention, Firebase configuration/authentication/UIDs, Firestore paths/rules, storage keys, sync architecture, automation, manifest/icons, existing call/SMS/task/appointment flows and service-worker lifecycle remain unchanged. No Firebase Console, Firestore rules or GitHub settings changes are required.

Verification: JavaScript syntax; HTML references and IDs; snapshot calculations under empty, small and populated samples; status/filter routes; campaign and storage regressions; ZIP integrity. Physical-iPhone, installed-PWA and live Firebase tests were unavailable.
