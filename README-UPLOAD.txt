AGNT v1.36.7 — CARD LANGUAGE — STAGING DROP-IN
===============================================

BASELINE
Current AGNT-staging main branch, commit:
4aa1dbfa98b692996769fa969af50bdad31dc41c

HOW TO UPLOAD
1. Unzip this package.
2. Upload agnt-card-language-v1.36.7.css to the ROOT of AGNT-staging.
3. Open the CURRENT index.html already in AGNT-staging.
4. Follow INDEX-EDIT.txt and add the single stylesheet link directly below the existing styles.css link.
5. Commit the two changes.

IMPORTANT
This is a DROP-IN update for the current staging repository. Do NOT delete the rest of the repository before uploading it. The current staging build is newer than the v1.28.2 recovery ZIP, so packaging that older ZIP as a full replacement would roll back current team, appointment, Prospector and UI work.

CHANGED
- New: agnt-card-language-v1.36.7.css
- Existing index.html: one stylesheet reference only

UNCHANGED
- app.js and application logic
- Firebase configuration and authentication
- Firestore paths and rules
- UID separation
- local cache/storage shapes
- sync behaviour
- contacts, appointments and leaderboard data formats
- manifest and service worker behaviour
- GitHub Pages configuration

FIREBASE CHANGES REQUIRED
None.

ROLLBACK
Remove the added stylesheet line from index.html and delete agnt-card-language-v1.36.7.css.
