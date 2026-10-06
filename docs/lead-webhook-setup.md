# Connecting the Lead Form to a Google Sheet

The website is already built to send every form submission to a "webhook" (a
secret URL). You just need to create the Google Sheet side once and paste its
URL into the project. No coding required — about 10 minutes.

## What's already done (on the website)
- The form validates and POSTs to an internal endpoint (`/api/lead`).
- That endpoint forwards the submission to whatever URL you put in the
  `LEAD_WEBHOOK_URL` setting. The URL is kept server-side and never exposed
  to visitors.
- Until you set the URL, submissions are accepted and printed to the server
  log so nothing breaks while you set this up.

## Step 1 — Create the Sheet
1. Go to <https://sheets.new> and create a new spreadsheet.
2. Name it something like **Learning Tribe Leads**.
3. (Optional) Rename the bottom tab from "Sheet1" to **Leads**.

## Step 2 — Add the script
1. In the sheet menu: **Extensions → Apps Script**.
2. Delete whatever code is shown, and paste in the contents of
   [`google-apps-script.gs`](google-apps-script.gs) (in this same folder).
3. Click the **Save** icon.

## Step 3 — Publish it as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Set:
   - **Description:** anything (e.g. "Lead capture")
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**  ← required so the website can post to it
4. Click **Deploy**.
5. Google will ask you to **authorize** — click through, choose your account,
   click "Advanced" → "Go to (project)" if it warns, and **Allow**.
6. Copy the **Web app URL** it gives you. It ends in `/exec`.

> The "Anyone" setting only means the URL can receive data — it does not make
> your sheet public. The URL itself stays hidden inside the website's server
> settings.

## Step 4 — Give the URL to the website
1. In the project folder (`D:\Learning tribe SOEs\website`), create a file
   named exactly **`.env.local`**.
2. Put one line in it (paste your URL after the `=`):
   ```
   LEAD_WEBHOOK_URL=https://script.google.com/macros/s/AKfy...your-url.../exec
   ```
3. Save, then stop and restart the dev server (`npm run dev`).

When you deploy the live site later (e.g. on Vercel), add the same
`LEAD_WEBHOOK_URL` value in that host's **Environment Variables** settings.

## Step 5 — Test it
1. Open the site, fill in the form, and submit.
2. A new row should appear in your Google Sheet within a second or two:
   `Received At | Name | WhatsApp | Grade/Level | Subjects`.

## Email alerts (built in)
The script now emails you on every new lead — it sends to the Google account
that owns the script, with the student's details and a one-click WhatsApp
reply link. To send alerts somewhere else (or to a second person), edit the
`recipient` line inside the script.

### Already deployed before this change? Update it like this:
1. Open the sheet → **Extensions → Apps Script**.
2. Replace the old code with the new `google-apps-script.gs` contents, **Save**.
3. **Deploy → Manage deployments → ✏️ (edit) → Version: New version → Deploy.**
   The URL stays the same, so nothing changes on the website.
4. Google will ask to authorize once more (the script can now "send email as
   you") — approve it, then submit a test lead to confirm the email arrives.

> Free Gmail accounts can send ~100 emails/day from Apps Script — far more
> than you'll need for lead alerts.

## Batch column (added July 2026)
The form now asks students to pick a **Morning** or **Evening** batch, and the
script saves it as a new **Batch** column (between Grade/Level and Subjects) and
includes it in the email alert.

To activate it, **redeploy** the script using the same 4 steps above (paste the
new `google-apps-script.gs`, Save, New version, Deploy).

**One-time sheet cleanup** — because a new column was added in the middle, do
ONE of these so the columns line up:
- **Easiest (recommended):** delete every row in the sheet *including the header
  row*. The next lead will rewrite a fresh header with the Batch column in the
  right place. (You'll only lose test rows.)
- **Keep existing rows:** right-click the "Subjects" column → *Insert 1 column
  left* → type `Batch` in its header cell. Old rows stay blank in that column;
  new leads fill it correctly.

## Crash-course sign-ups (added October 2026)
The site now has a separate **Crash Courses** form. Its submissions go to
`/api/crash-course` and are saved in their **own tab**, so they never mix with
free-trial leads:

| Tab | Filled by | Columns |
|---|---|---|
| **Leads** (or your first tab) | "Book a free trial" form | Received At · Name · WhatsApp · Grade/Level · Batch · Subjects |
| **Crash Course Leads** | Crash Courses form | Received At · Name · WhatsApp · Level · Exam Session · Subjects |

The **Crash Course Leads** tab is created automatically the first time someone
registers — you don't need to make it. Email alerts arrive with the subject
"New crash-course sign-up: …".

### To switch it on — redeploy the script (required)
Until you do this, crash-course sign-ups go to the old script, which drops
them into the trial **Leads** tab with the Level and Exam Session missing.

1. Open the sheet → **Extensions → Apps Script**.
2. Replace the old code with the new `google-apps-script.gs` contents, **Save**.
3. **Deploy → Manage deployments → ✏️ (edit) → Version: New version → Deploy.**
   The URL stays the same, so nothing needs to change on Vercel.
4. Fill in the Crash Courses form on the site and check that a
   **Crash Course Leads** tab appears with your test row.

### Want crash courses in a completely separate spreadsheet instead?
1. Create a second Google Sheet (e.g. **Learning Tribe Crash Courses**) and
   repeat Steps 2–3 above in *that* sheet with the same script.
2. Copy its Web app URL and add it on Vercel (and in `.env.local`) as:
   ```
   CRASH_COURSE_WEBHOOK_URL=https://script.google.com/macros/s/AKfy...second-url.../exec
   ```
3. Redeploy the site. Crash-course sign-ups now go only to the second
   spreadsheet (into its **Crash Course Leads** tab); trial leads keep going to
   the first.

When `CRASH_COURSE_WEBHOOK_URL` is empty, the site uses `LEAD_WEBHOOK_URL` for
both forms and the script keeps them apart by tab.

### Changing the exam sessions on the form
The "Which exam are you preparing for?" options live in
`src/lib/crashCourseSchema.ts` (`EXAM_SESSIONS`). Edit that list as sessions
roll over — the form and the server-side validation both update together.

### Linking straight to the crash-course form
Both forms live in the same sign-up area at the bottom of the page, with a
**Free trial class | Crash course** switch. To send people (e.g. from an
Instagram ad or bio link) straight to the crash-course form, use:
```
https://<your-site>/#crash-course-form
```
The page opens with the sign-up area already switched to **Crash course**.
