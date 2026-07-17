/**
 * The Learning Tribe — lead capture endpoint.
 * Paste this into Extensions → Apps Script on your Google Sheet,
 * then deploy it as a Web App (see lead-webhook-setup.md).
 *
 * It receives each form submission and appends a row to the sheet.
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Leads') || ss.getSheets()[0];

    var data = JSON.parse(e.postData.contents);

    // Write a header row the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Received At', 'Name', 'WhatsApp', 'Grade/Level', 'Batch', 'Subjects']);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || '',
      "'" + (data.whatsapp || ''), // leading ' keeps the 0 in 03xx numbers
      data.grade || '',
      data.batch || '',
      Array.isArray(data.subjects) ? data.subjects.join(', ') : (data.subjects || '')
    ]);

    // --- Email alert on every new lead -----------------------------------
    // Sends to the Google account that owns this script. To alert a
    // different/extra address, replace the recipient line with e.g.:
    //   var recipient = 'coordinator@example.com';
    // The email failing must never lose the lead, hence its own try/catch.
    try {
      var recipient = Session.getEffectiveUser().getEmail();
      var subjects = Array.isArray(data.subjects) ? data.subjects.join(', ') : (data.subjects || '');
      MailApp.sendEmail({
        to: recipient,
        subject: 'New trial-class lead: ' + (data.name || 'Unknown') + ' (' + (data.grade || '?') + ')',
        body:
          'A new inquiry just came in from the website.\n\n' +
          'Name:      ' + (data.name || '') + '\n' +
          'WhatsApp:  ' + (data.whatsapp || '') + '\n' +
          'Grade:     ' + (data.grade || '') + '\n' +
          'Batch:     ' + (data.batch || '') + '\n' +
          'Subjects:  ' + subjects + '\n' +
          'Received:  ' + (data.submittedAt || new Date().toISOString()) + '\n\n' +
          'Reply on WhatsApp: https://wa.me/92' + String(data.whatsapp || '').replace(/^(\+?92|0)/, '') + '\n' +
          'Leads sheet: ' + ss.getUrl()
      });
    } catch (mailErr) {
      // Ignore — the row is already saved in the sheet.
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
