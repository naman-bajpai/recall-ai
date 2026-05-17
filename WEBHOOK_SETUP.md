# Recall — Webhook Setup (Google Apps Script)

This document explains how to set up the Google Apps Script that receives early access signups and writes them to a Google Sheet.

---

## 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Name it something like **Recall Leads**.
3. The script will automatically create a tab called **Leads** with headers on the first submission — you don't need to set up columns manually.

---

## 2. Open Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**.
2. Delete any placeholder code in the editor.
3. Paste the script below.

---

## 3. The Script

```javascript
// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Set this to the name of the sheet tab you want to write to.
var SHEET_NAME = "Leads";

// ─── Column order ─────────────────────────────────────────────────────────────
var HEADERS = [
  "Timestamp",
  "Email",
  "Name",
  "Role",
  "Custom Answer",
  "Source",
  "Channel",
  "Campaign",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Content",
  "Referrer",
  "Landing Page URL",
  "Consent",
  "Product",
  "Candidate ID",
];

// ─── POST handler ─────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    var raw = e.postData && e.postData.contents;
    if (!raw) throw new Error("Empty request body");

    var data = JSON.parse(raw);

    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet + header row if they don't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
           .setFontWeight("bold")
           .setBackground("#f3f3f3");
      sheet.setFrozenRows(1);
    }

    // If the sheet exists but has no headers, write them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
           .setFontWeight("bold")
           .setBackground("#f3f3f3");
      sheet.setFrozenRows(1);
    }

    // Append the lead row
    sheet.appendRow([
      new Date(),                          // Timestamp
      data.lead_email        || "",        // Email
      data.lead_name         || "",        // Name
      data.lead_company_role || "",        // Role
      data.custom_answer     || "",        // Custom Answer
      data.source            || "direct",  // Source
      data.channel           || "organic", // Channel
      data.campaign          || "",        // Campaign
      data.utm_source        || "",        // UTM Source
      data.utm_medium        || "",        // UTM Medium
      data.utm_campaign      || "",        // UTM Campaign
      data.utm_content       || "",        // UTM Content
      data.referrer          || "",        // Referrer
      data.landing_page_url  || "",        // Landing Page URL
      data.consent_captured  || "",        // Consent
      data.product_name      || "",        // Product
      data.candidate_id      || "",        // Candidate ID
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── GET handler — quick health check ────────────────────────────────────────
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Recall webhook is live" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 4. Deploy as a Web App

1. Click **Deploy → New deployment** in the Apps Script editor.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the settings:
   - **Description:** Recall leads webhook (or anything)
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Copy the deployment URL — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
6. If the URL differs from the one in `components/waitlist.tsx`, update the `WEBHOOK_URL` constant at the top of that file.

> **Important:** Every time you edit the script, you must create a **new deployment** for changes to take effect. Editing the code does not update the live URL automatically.

---

## 5. Test the Endpoint

Visit your deployment URL directly in a browser. You should see:

```json
{ "status": "ok", "message": "Recall webhook is live" }
```

If you see an error or a Google login page, the access setting is wrong — re-deploy with **Who has access: Anyone**.

---

## 6. Update the Webhook URL in Code

The webhook URL lives in one place:

```
components/waitlist.tsx  →  const WEBHOOK_URL = "..."
```

Change only that constant to point to a new deployment.

---

## Payload Reference

This is the full JSON body the form sends on submission:

| Field | Value |
|---|---|
| `candidate_id` | `"recall"` |
| `product_name` | `"Recall"` |
| `product_slug` | `"recall"` |
| `subdomain` | `"https://recall.remyndai.com"` |
| `lead_name` | Name field value |
| `lead_email` | Email field value |
| `lead_company_role` | Role field value |
| `company_school` | `""` |
| `source` | `utm_source` or `"direct"` |
| `channel` | `utm_medium` or `"organic"` |
| `campaign` | `utm_campaign` or `"phase2"` |
| `utm_source` | From URL param |
| `utm_medium` | From URL param |
| `utm_campaign` | From URL param |
| `utm_content` | From URL param |
| `referrer` | `document.referrer` |
| `landing_page_url` | `window.location.href` |
| `confirmation_page_url` | `"https://recall.remyndai.com/thank-you"` |
| `intent_signal` | Custom answer field value |
| `notes_from_lead` | Custom answer field value |
| `custom_question` | `"What would you use Recall for?"` |
| `custom_answer` | Custom answer field value |
| `consent_captured` | `"Yes"` |
