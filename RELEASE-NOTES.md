# AGNT v1.43.0 — My Market

Baseline: v1.42.1 Appointment CSS Consolidation, including the approved My Market navigation changes.

## Included
- My Market replaces the Prospector tab label and becomes its landing section. Sub-navigation: My Market, Reach, Buyers, Contacts, Pipeline. Reach retains the existing calling dashboard; Pipeline also displays existing Insights.
- A full-width market hub with suburb and House/Strata/category filters, current listings, six months of sold and withdrawn results, price updates and auction results.
- Agency and agent shares of the imported properties in the selected view. Joint agents share credit equally. These figures describe imported records, not independently verified whole-market coverage.
- Per-property recorded outreach and pending/triggered follow-ups, using existing interaction records. A call or message attempt is not presented as proof of successful contact.
- The existing comparable-sold estimator is accessible for configured contact properties.
- Existing MarketPulse and Hot Spotting remain accessible. Photos are not included.

## Retention and storage
The daily opportunity queue keeps its existing behaviour. The separate history now retains compact property snapshots with agency/agent metadata and old event identifiers for interaction links. Current listings have no arbitrary 300-event expiry. Explicit sold/withdrawn events close listings; an auction result alone does not establish a sale. Relisting can reopen a property.

The hub displays six months of recent results using imported event dates. History keeps the latest snapshot per event type within that period, the latest lifecycle state indefinitely, and sold evidence for the existing twelve-month estimator. It is not a complete price-change ledger. Records already discarded by earlier builds cannot be reconstructed; the existing importer’s stale-email rules remain unchanged.

An import capacity preflight rejects oversized snapshots before mutating the existing data, rather than silently evicting active properties. The existing single-document storage still has finite capacity; this release does not create unlimited archival storage or guarantee capacity for later unrelated contact growth. History uses the same storage key and Firestore paths, with additional optional metadata.

## Files changed
- app.js: navigation, hub rendering/aggregation, history retention and import capacity preflight.
- index.html: navigation labels/order and hub markup.
- styles.css: styles scoped to the new hub, using existing theme tokens.
- runtime.js: release identifier only.
- service-worker.js: release identifier and matching asset-version checks only.
- RELEASE-NOTES.md: replaced previous notes with this release.

Firebase configuration, authentication, UID separation, security rules, manifest, icons, automation script and deployment configuration are unchanged. No Firebase Console, Firestore rules, Apps Script or GitHub settings changes are required. Existing workflows remain available.

## Verification
JavaScript syntax, local file references, duplicate HTML IDs, navigation wiring, archive lifecycle/compaction, metadata preservation, historical interaction links, shares, capacity rejection, empty/populated rendering and appointment/SMS regression checks were exercised. Package integrity was checked.

Physical iPhone layout, installed-PWA lifecycle, live Firebase/team sync and production deployment could not be tested in this environment. Verify these on the installed app after deployment; this release is not a claim that earlier intermittent device restarts have been reproduced or eliminated.
