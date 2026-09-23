# AGNT v1.43.2 — My Market Refinement

Baseline: v1.43.1 Campaign History.

My Market now leads with a concise count and the property list. A single view selector retains Current, Sold, Withdrawn, Price changes and Auction results. Suburb and category remain available under Refine. The MarketPulse icon still opens today's activity. Insights and the comparable-sold estimator follow the list as optional disclosures.

Property rows use a compact Contacts-style hierarchy: address, suburb/configuration, price and report date. Expanded rows show the existing campaign figures. Campaign history and property-linked outreach have their own disclosures; their open state is preserved when market data rerenders.

No campaign records, calculations, matching, follow-up triggers, call/SMS workflows, data keys, Firebase paths or service-worker behaviour changed. Historical import limitations and the finite capacity guard from v1.43.1 still apply. Photos remain excluded.

Changed: index.html (layout and controls), app.js (view selector, compact row presentation, disclosure state), styles.css (scoped My Market presentation), runtime.js and service-worker.js (release identifiers), RELEASE-NOTES.md (replaced prior notes). Configuration, rules, manifest, icons and automation unchanged. No Firebase Console or GitHub settings changes required.

Verification: JavaScript syntax, local references, duplicate IDs, all five status options, core campaign and appointment/SMS/storage regression tests, version coherence and ZIP integrity. Physical iPhone and live Firebase were not tested.
