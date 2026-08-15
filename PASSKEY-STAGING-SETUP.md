# AGNT v1.32.6 STAGING — Passkey Proof-of-Concept

This package adds optional WebAuthn passkey sign-in to the confirmed v1.32.5 STAGING Teams v2 build. It targets Firebase project `agnt-staging-cb6ce` only. Do not deploy these files to the OG/BETA Firebase project or production Pages target.

## What this test proves

- An existing staging email/password account can add a passkey without changing its Firebase UID.
- Apple devices can use Face ID when the operating system offers it.
- Android uses the available passkey provider and may offer face, fingerprint, PIN or pattern verification.
- A verified passkey returns a staging Firebase custom token for the same UID.
- Existing Solo/Team metadata and secure team leaderboard behaviour continue through the normal `startCloud()` path.
- Email/password, account creation and device-only mode remain available.

A biometric prompt occurs when signing in with a passkey. AGNT still uses Firebase local authentication persistence, so it does not prompt again every time the installed PWA opens.

## 1. Keep the website isolated

Use a dedicated staging hostname where possible, for example:

`https://staging.andrewtour.com`

That gives the passkey test a separate WebAuthn relying-party domain from the BETA. A path such as `https://andrewtour.github.io/agnt-staging/` is a separate deployment path but the WebAuthn origin is still `https://andrewtour.github.io`.

The exact origin is the scheme and hostname, plus port when applicable. It never includes a path.

## 2. Firebase requirements

- Firebase project: `agnt-staging-cb6ce`
- Billing plan: Blaze
- Email/Password Authentication enabled
- Firestore enabled with the existing STAGING Teams v2 rules
- Exact staging hostname added under Firebase Authentication **Authorized domains**
- Node.js 22 and Firebase CLI available locally

The passkey service uses two server-only staging collections:

- `_agntPasskeyCredentials`
- `_agntPasskeyChallenges`

The Firebase Admin SDK accesses these collections from the Function. No changes to `firestore.rules` are required.

## 3. Set the permitted staging origin

Copy `functions/.env.example` to:

`functions/.env.agnt-staging-cb6ce`

Replace the placeholder with the exact staging origin:

```text
PASSKEY_ALLOWED_ORIGINS=https://staging.andrewtour.com
```

For more than one staging origin, use a comma-separated list. Do not add the BETA origin unless you intentionally want this staging Function callable from it.

## 4. Install and deploy only the passkey Function

From the package root:

```bash
cd functions
npm install
cd ..
firebase use agnt-staging-cb6ce
firebase deploy --only functions:passkeyApi
```

Expected Function URL:

`https://australia-southeast1-agnt-staging-cb6ce.cloudfunctions.net/passkeyApi`

That URL is already set in `firebase-config.js`.

Do not deploy the Function while the Firebase CLI shows the OG/BETA project. The `.firebaserc` included in this package points to staging, but the CLI project confirmation should still be checked before deployment.

## 5. Custom-token permission check

The Function must sign a Firebase custom token after successful passkey verification. If the final sign-in returns an `iam.serviceAccounts.signBlob` permission error, grant the Node.js 22 runtime service account the `Service Account Token Creator` role on itself, then retry.

## 6. Publish the frontend to STAGING only

Upload the frontend files to the staging hosting target. The following are deployment source files and do not need to be publicly served:

- `functions/`
- `.firebaserc`
- `firebase.json`
- `PASSKEY-STAGING-SETUP.md`
- `STAGING-VALIDATION.md`

Confirm the hosted origin exactly matches `PASSKEY_ALLOWED_ORIGINS`.

## 7. Test flow

### Apple / Face ID

1. Open the staging HTTPS site in Safari on an iPhone with Face ID and iCloud Keychain enabled.
2. Sign in using an existing STAGING email/password account.
3. Open Settings.
4. Select **Set up a passkey**.
5. Complete the Face ID prompt.
6. Confirm the Settings status becomes **Active**.
7. Sign out.
8. Select **Continue with passkey**.
9. Confirm Face ID signs into the same staging UID and the correct Solo/Team state loads.

Repeat the test from the installed Home Screen PWA.

### Android

Repeat the same flow in current Chrome and from the installed PWA. Confirm the device passkey provider completes user verification and the same staging UID and team state load.

## Acceptance checks

- Existing email/password login still works.
- Device-only mode still works.
- Account creation and Teams v2 onboarding still work.
- The same UID is used before and after passkey sign-in.
- Existing days, targets, appointments and prospecting data load normally.
- Solo accounts remain private.
- Team members still see only their verified team leaderboard.
- Adding or removing a passkey does not set the main AGNT Sync Error.
- Removing a passkey disables that credential while password recovery remains available.

## Before any BETA rollout

Complete every item in `STAGING-VALIDATION.md`, test multiple real Apple and Android devices, and review the exact staging Function configuration. Add Firebase App Check and production-grade distributed rate limiting before promoting the public passkey-start endpoint to BETA.
