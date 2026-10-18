/**
 * Crudify consultation form → Google Sheets.
 *
 * Setup:
 *  1. Create a Google Sheet .
 *  2. Extensions → Apps Script, paste this file, save.
 *  3. Project Settings → Script properties → add SHARED_SECRET (any long random string).
 *  4. Deploy → New deployment → Web app
 *       Execute as: Me   ·   Who has access: Anyone
 *  5. Copy the Web app URL into .env.local as GOOGLE_SHEETS_WEBHOOK_URL,
 *     and the same secret as GOOGLE_SHEETS_SECRET.
 */

const SHEET_NAME = "Leads";
const NOTIFY_EMAIL = "singhharinder662@gmail.com";
const HEADERS = ["Timestamp", "Name / Business", "Phone", "Service", "Page", "User Agent"];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (!secret || data.secret !== secret) {
      return json({ ok: false, error: "unauthorized" });
    }

    const sheet = getSheet();
    const row = [
      new Date(),
      data.name || "",
      // Leading apostrophe keeps Sheets from treating "+91..." as a formula/number.
      "'" + (data.phone || ""),
      data.service || "",
      data.page || "",
      data.userAgent || "",
    ];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New Crudify consultation request — " + (data.name || "Unknown"),
        body:
          "Name / Business: " + (data.name || "") + "\n" +
          "Phone: " + (data.phone || "") + "\n" +
          "Service: " + (data.service || "—") + "\n\n" +
          "Sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      });
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
