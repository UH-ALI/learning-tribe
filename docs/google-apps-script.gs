/**
 * The Learning Tribe — lead capture endpoint.
 * Paste this into Extensions → Apps Script on your Google Sheet,
 * then deploy it as a Web App (see lead-webhook-setup.md).
 *
 * It receives each form submission and appends a row to the right tab:
 *   - Free-trial enquiries  → the "Leads" tab (or the first tab)
 *   - Crash-course sign-ups → a "Crash Course Leads" tab, created
 *                             automatically on the first sign-up
 */

var CRASH_COURSE_TAB = 'Crash Course Leads';

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    var subjects = Array.isArray(data.subjects) ? data.subjects.join(', ') : (data.subjects || '');
    var receivedAt = data.submittedAt || new Date().toISOString();
    var whatsapp = "'" + (data.whatsapp || ''); // leading ' keeps the 0 in 03xx numbers

    var sheet, row, details, emailSubject;

    if (data.form === 'crash-course') {
      sheet = ss.getSheetByName(CRASH_COURSE_TAB) ||
        ss.insertSheet(CRASH_COURSE_TAB, ss.getSheets().length); // add as the last tab
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Received At', 'Name', 'WhatsApp', 'Level', 'Exam Session', 'Subjects']);
      }
      row = [receivedAt, data.name || '', whatsapp, data.level || '', data.session || '', subjects];
      emailSubject = 'New crash-course sign-up: ' + (data.name || 'Unknown') + ' (' + (data.level || '?') + ')';
      details =
        'Name:          ' + (data.name || '') + '\n' +
        'WhatsApp:      ' + (data.whatsapp || '') + '\n' +
        'Level:         ' + (data.level || '') + '\n' +
        'Exam session:  ' + (data.session || '') + '\n' +
        'Subjects:      ' + subjects + '\n';
    } else {
      sheet = ss.getSheetByName('Leads') || ss.getSheets()[0];
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Received At', 'Name', 'WhatsApp', 'Grade/Level', 'Batch', 'Subjects']);
      }
      row = [receivedAt, data.name || '', whatsapp, data.grade || '', data.batch || '', subjects];
      emailSubject = 'New trial-class lead: ' + (data.name || 'Unknown') + ' (' + (data.grade || '?') + ')';
      details =
        'Name:      ' + (data.name || '') + '\n' +
        'WhatsApp:  ' + (data.whatsapp || '') + '\n' +
        'Grade:     ' + (data.grade || '') + '\n' +
        'Batch:     ' + (data.batch || '') + '\n' +
        'Subjects:  ' + subjects + '\n';
    }

    sheet.appendRow(row);

    // --- Email alert on every new submission ------------------------------
    // Sends to the Google account that owns this script. To alert a
    // different/extra address, replace the recipient line with e.g.:
    //   var recipient = 'coordinator@example.com';
    // The email failing must never lose the lead, hence its own try/catch.
    try {
      var recipient = Session.getEffectiveUser().getEmail();
      MailApp.sendEmail({
        to: recipient,
        subject: emailSubject,
        body:
          'A new submission just came in from the website.\n\n' +
          details +
          'Received:  ' + receivedAt + '\n\n' +
          'Reply on WhatsApp: https://wa.me/92' + String(data.whatsapp || '').replace(/^(\+?92|0)/, '') + '\n' +
          'Sheet: ' + ss.getUrl() + '#gid=' + sheet.getSheetId()
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
