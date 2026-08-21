# AGNT BETA v1.36.21 — Rollout Check

## Before release verification
1. Deploy the bundled `firestore.rules` to Firebase project `daily-accountability-be0ac`.
2. Confirm the complete BETA web package is live, including `icons/`.
3. Reopen the installed PWA and allow the new service worker/cache to activate.
4. Confirm an existing account loads historical Today, Contacts/Prospecting, Appointments and Insights data.
5. Confirm the existing Team and current members are still present.

## Core acceptance
1. Change Calls/Connects/Data for one member and confirm Daily leaderboard updates for another member.
2. Confirm current Weekly leaderboard data updates for another member.
3. Confirm personal Contacts/Prospecting data remains private to each UID.
4. Confirm existing appointments/history remain present.
5. Confirm Team owner management and ordinary member leave workflow still work.

## Daily Run Sheet acceptance
1. Open Home on a current workday and confirm the Daily Run Sheet shows one dominant Now action and no more than two queued priorities.
2. Confirm overdue contact or buyer follow-ups rank ahead of new pipeline work and open the unified Today follow-up flow.
3. Confirm an outstanding appointment outcome opens Past Appointments and an imminent appointment opens the selected day in Appointments.
4. Start a Pipeline or Hot Spotting session, return Home and confirm the dominant action changes to Resume with the correct remaining count and estimate.
5. With a current Market Pulse match and no active session, confirm the highest-priority opportunity opens directly into its Hot Spotting session.
6. Before 2:00pm, confirm knocking is presented as a scheduled later item. From 2:00pm to 5:00pm, confirm it becomes a Start or Resume action using the remaining minutes.
7. Complete or reschedule the current priority and confirm the Run Sheet recalculates without creating another task record.
8. Open a historical date and confirm the card changes to Review. Open a future date and confirm it changes to Plan.
9. Check light and dark mode at narrow iPhone width and confirm the primary action, queued rows, estimates and blue coaching states remain legible with no horizontal overflow.
10. On the returning snapshot, confirm Next Move matches the dominant Home Run Sheet action.

## Buyer UI acceptance
1. Open Prospector → Buyers on a narrow iPhone-sized viewport and confirm the search, add action, four quick filters, buyer cards and action controls remain contained with no horizontal overflow.
2. Confirm buyer cards show name/temperature, concise criteria, the next-action state and no more than one position tag plus `+N`.
3. Filter buyers by Position and by each Follow-up state: Overdue, Due today, Scheduled and Not set.
4. Add a buyer with budget, suburbs, configuration, position, property type and must-haves; confirm the detail view groups Next Action, Buyer Brief and Activity clearly.
5. Edit an existing buyer and open the follow-up dialog; confirm neither action forces the mobile keyboard open and that Escape, backdrop, × and Cancel all close the dialog.
6. Schedule a buyer follow-up and confirm its date appears on the buyer card, in buyer detail, in Activity and in the existing Today follow-up flow.
7. Archive a buyer with an outstanding follow-up; confirm the follow-up is cleared, history remains intact and the buyer moves to Archived. Restore the buyer and confirm it returns to the active list.
8. Confirm permanent deletion is offered only from Archived and displays an explicit confirmation.
9. Attempt to add the same mobile twice and confirm AGNT opens the existing buyer instead of creating a duplicate.
10. Cancel a buyer-list call and confirm no call/connect metric is added and the buyer remains outstanding in the session.
11. Sign out and into a different account on the same device; confirm buyer-list session state does not carry between UIDs.
12. Go offline with no imported call list and confirm the PDF import action explains that a connection is required; confirm an existing local list can still be continued.
13. Add a new buyer while simulating a prospecting cloud-write failure and confirm the buyer plus the Data credit remain local and show pending-sync feedback.
14. Open the buyer follow-up sheet in light and dark mode; confirm the sheet is fully opaque, the background is dimmed without blur and no underlying text competes with the form.
15. Open a buyer with a saved current address and confirm the mobile and address appear as equal-weight rows below the buyer's name.
16. Edit a buyer and confirm Stage, Temperature and Buyer notes use the same form-value weight in both themes.
17. Schedule a future buyer follow-up and confirm its card text appears blue; confirm due-today remains amber, overdue remains red and an unset follow-up remains neutral.
18. Confirm each buyer card shows configuration/budget and location on separate lines without clipping at iPhone width.
19. Confirm buyer-list budgets use compact notation while buyer detail retains the full currency amount.
20. Scroll Buyers and the buyer editor beneath the sticky Prospector toolbar in light and dark mode; confirm underlying controls and text do not show through.
21. Edit an existing buyer while online and confirm the updated profile appears immediately without waiting for the cloud sync indicator to clear.
22. Edit an existing buyer with a slow or unavailable connection; confirm the change remains available locally and the existing cloud-sync warning appears if required.
23. Add a new buyer and confirm the Data metric is still credited before the buyer cloud write, with no duplicate Data event.

## Team appointment acceptance
1. Member A books a LAP, MAP or BAP and assigns it to Member B.
2. Confirm the assignment popup uses the same first-name display as the Team leaderboard.
3. Confirm Member A receives the appointment statistic and sees `Booked for [Member B]` context.
4. Confirm Member B receives the appointment notification live or on next open.
5. Confirm Member B's appointment statistic does not increase.
6. Confirm Member B sees the assigned appointment in the relevant appointment/timeline surfaces.
7. Confirm Got it closes the notification cleanly.
8. Confirm Add to Calendar performs the calendar handoff and the notification does not reopen immediately.
9. Edit/delete the appointment as Member A and confirm the shared Team appointment updates/disappears for Member B.
