# Prospector Map — staging setup

## Free map setup

1. Create a free Geoapify account at `https://myprojects.geoapify.com/`. No payment card is required for the free plan.
2. Create a project and copy its API key.
3. Deploy this complete ZIP to staging and reopen the installed PWA so the new cache activates.
4. Open **Prospector → Contacts → Map**, paste the Geoapify API key and select **Save & continue**.
5. Select **Map addresses**. AGNT maps up to 100 waiting addresses per run and stays below the free request-rate limit.

The key remains on the testing device. Coordinates are stored separately from the main Prospector state so buyer and contact saves remain fast. OpenFreeMap loads without a token, while Geoapify is used only for new or changed addresses.

## Accuracy workflow

- A confident address result is shown as mapped.
- An interpolated or approximate result is marked **Needs review**.
- An address that cannot be resolved stays off the map.
- Open a client pin and select **Correct pin location** to tap or drag the pin to its confirmed position.
- Changing the client's address invalidates the previous location and returns the record to the mapping queue.

## Staging limitations

- A network connection is required for the basemap and new geocoding requests.
- Archived records are excluded.
- OpenFreeMap is a best-effort public basemap service and requires a network connection.
- Geoapify's free allowance is currently 3,000 credits per day. AGNT stores successful and failed matching attempts so unchanged addresses are not repeatedly submitted.
- Existing coordinates created by the earlier Mapbox staging build remain compatible and do not require re-mapping.
