# AGNT v1.43.1 — Campaign History

Baseline: v1.43.0 My Market.

## My Market refinement
- Full-width data rows and fine dividers replace overview tiles and filter pills. The comparable-sold section also uses a flat treatment within My Market only.
- One AGNT-orange MarketPulse icon opens daily activity. Hot Spotting remains available through Reach.
- Listings show the latest recorded guide and campaign information. Sold rows show the result and reporting date, with agency/agent information where supplied.
- Properties expand to first/last recorded guides, sale price, dollar/percentage movement, recorded price changes, reported days on market and chronological history. Outreach stays accessible in its own disclosure.
- Market insights show median price/guide, median reported days on market, sale-to-first-guide movement or campaigns with price changes, plus agency/agent shares. Medians include sample sizes; suburb/category/status filters apply.

## History and calculation boundaries
Active campaigns retain their recorded event steps. Recently sold/withdrawn campaigns retain those steps for six calendar months after the terminal report. Relisting starts a separate campaign for comparisons. Existing twelve-month sold evidence and latest lifecycle markers remain retained.

History consists of imported reports, not independently verified listing dates or a complete live property feed. The existing importer identifies an event by property, type and report date; same-day corrections update that report. Earlier discarded steps cannot be restored. Report dates and missing-history limitations are labelled. Days on market use an explicit source figure, not an estimate from email dates.

Price ranges and undisclosed values remain visible but are excluded from numeric price analytics. Sold comparisons use the first/last recorded guide, not an assumed original asking price. Imported-data shares are not whole-market statistics. The oversized-import safeguard remains; storage capacity is finite.

## Scope
Changed: app.js, index.html, styles.css; release identifiers only in runtime.js and service-worker.js; these notes replace the previous release notes.

Matching, call/SMS workflows, follow-up triggers, metrics, authentication, UID separation, Firebase configuration, Firestore paths/rules, local keys, manifest, icons and service-worker lifecycle remain unchanged. No Firebase Console, Apps Script or GitHub settings changes are required.

## Validation
JavaScript syntax, unique HTML IDs, local references, version coherence, history retention/pruning, relisting isolation, price calculations, excluded price ranges, empty/populated rendering, escaped imported text, daily queue preservation, import-capacity rejection and prior appointment/SMS/storage-warning checks passed. ZIP integrity checked.

Physical iPhone layout, installed-PWA behaviour and live Firebase/team sync were not tested. Review these on device after deployment.
