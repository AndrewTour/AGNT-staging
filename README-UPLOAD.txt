AGNT v1.36.7 — CARD LANGUAGE — FULL STAGING REPLACEMENT
========================================================

BASELINE
AndrewTour/AGNT-staging main at commit:
947f3995271913eeb91bbfb53dcef6352fcbb524

DEPLOYMENT
This is a complete replacement package for the AGNT-staging GitHub Pages repository.
Replace the staging repository contents with the contents of this package, preserving the folder structure.

APPLIED UI UPDATE
- CMPN-inspired card hierarchy while retaining AGNT identity
- Refined Prospector contact detail profile, actions, Contact Snapshot, Next Action and history
- Shared card language across selected Prospector, Pipeline, Appointments, Today/Insights, Leaderboard and team-management surfaces
- Light and dark mode refinements

PROTECTED SYSTEMS LEFT UNCHANGED
- app.js application/business logic
- Firebase configuration and authentication
- Firestore paths and rules
- UID separation
- local storage/cache data shapes
- sync behaviour
- team, appointment and prospecting logic
- existing user data formats
- manifest behaviour and GitHub Pages settings

PWA PACKAGE NOTE
The source ZIP downloaded from staging omitted the icons directory while manifest.json and service-worker.js still reference it.
The required icon-192.png and icon-512.png files have therefore been restored from the confirmed v1.28.2 recovery package.
Service-worker behaviour is unchanged; only its cache identifier was bumped and the new v1.36.7 stylesheet was added to precache.

FIREBASE / FIRESTORE CHANGES REQUIRED
None.
