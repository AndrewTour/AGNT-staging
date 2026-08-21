# Prospector Map — staging setup

## Mapbox setup

1. Create a Mapbox account and add a valid payment method so permanent geocoding is available.
2. Create a new **public** token beginning with `pk.`. Do not use a secret token.
3. Restrict that token to the exact staging origin, for example `https://andrewtour.github.io/AGNT-staging/`.
4. Deploy this complete ZIP to staging and reopen the installed PWA so the new cache activates.
5. Open **Prospector → Contacts → Map**, paste the public token and select **Save & load map**.
6. Select **Map addresses**. AGNT maps up to 100 waiting addresses per run.

The token remains on the testing device. Coordinates are stored separately from the main Prospector state so buyer and contact saves remain fast.

## Accuracy workflow

- A confident address result is shown as mapped.
- An interpolated or approximate result is marked **Needs review**.
- An address that cannot be resolved stays off the map.
- Open a client pin and select **Correct pin location** to tap or drag the pin to its confirmed position.
- Changing the client's address invalidates the previous location and returns the record to the mapping queue.

## Staging limitations

- A network connection is required for the basemap and new geocoding requests.
- Archived records are excluded.
- Mapbox billing and usage are external to Firebase.
- The token should remain restricted to the staging URL before testing begins.
