// ============================================================================
// 4_SYSTEM_INDEX.GS
// Workbook Navigation Index Generator, Link Matrix Builder, & Web App Config
// ============================================================================

/**
 * Builds or refreshes the Index navigation surface (defaults to "Template - Index").
 * Stamps directly from RFF_BASE_TEMPLATE and applies applySystemStructure_.
 *
 * @param {string} [targetName="Template - Index"] The target sheet name to update or create.
 */
function updateIndexSheet(targetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = targetName || "Template - Index";
  
  let sheet = ss.getSheetByName(sheetName);
  const baseTemplate = ss.getSheetByName("RFF_BASE_TEMPLATE");

  if (!sheet) {
    if (baseTemplate) {
      sheet = baseTemplate.copyTo(ss);
      sheet.setName(sheetName);
      sheet.showSheet();
    } else {
      sheet = ss.insertSheet(sheetName, 0);
    }
  } else {
    sheet.clear();
  }

  const timestampStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss");
  const headers = ["Sheet Name", "Group / Type", "Status", "Quick Link"];
  const sheets = ss.getSheets();

  const rawRows = [
    ["Workbook Navigation Index", "- v1.8.9.8.4 -", "", ""],
    ["Date Created", timestampStr, "", ""],
    ["", "", "", ""],
    headers
  ];

  sheets.forEach(s => {
    const name = s.getName();
    if (name !== sheetName && name !== "Index") {
      const visibility = s.isSheetHidden() ? "HIDDEN" : "VISIBLE";
      
      let group = "Operational";
      if (name.indexOf("Template - ") === 0 || name === "RFF_BASE_TEMPLATE") {
        group = "Template";
      } else if (name.indexOf("Source - ") === 0) {
        group = "Source Data";
      } else if (name.indexOf("Format Dashboard") !== -1 || 
                 name.indexOf("Dashboard Quality Report") !== -1 || 
                 name.indexOf("Framework Timing Report") !== -1 ||
                 name.indexOf("Index") !== -1) {
        group = "System & Configuration";
      }

      const link = `=HYPERLINK("#gid=${s.getSheetId()}", "Jump to ${name}")`;
      rawRows.push([name, group, visibility, link]);
    }
  });

  // Apply full Title Rows structural painting & row heights via framework engine
  applySystemStructure_(sheet, 4, rawRows, sheetName, timestampStr);
  
  sheet.setFrozenRows(4);
  sheet.setFrozenColumns(1);
}

/**
 * UI Callback: Prompts user to configure Index Restore Web App URL.
 */
function configureIndexRestoreWebAppUrl() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getDocumentProperties();
  const currentUrl = props.getProperty("INDEX_RESTORE_WEB_APP_URL") || "";

  const response = ui.prompt(
    "Configure Restore Web App URL",
    `Current URL: ${currentUrl || "Not Set"}\n\nEnter the published Web App URL for archive restores:`,
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() === ui.Button.OK) {
    const newUrl = response.getResponseText().trim();
    props.setProperty("INDEX_RESTORE_WEB_APP_URL", newUrl);
    ui.alert("Success", "Web App URL successfully updated.", ui.ButtonSet.OK);
  }
}

/**
 * UI Callback: Prompts user to configure Archive Spreadsheet ID.
 */
function configureArchiveSpreadsheetId() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getDocumentProperties();
  const currentId = props.getProperty("RFF_ARCHIVE_SPREADSHEET_ID") || RFF_ARCHIVE_SPREADSHEET_ID;

  const response = ui.prompt(
    "Configure Archive Spreadsheet ID",
    `Current ID: ${currentId}\n\nEnter the Spreadsheet ID for central archiving:`,
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() === ui.Button.OK) {
    const newId = response.getResponseText().trim();
    if (newId) {
      props.setProperty("RFF_ARCHIVE_SPREADSHEET_ID", newId);
      ui.alert("Success", "Archive Spreadsheet ID updated.", ui.ButtonSet.OK);
    }
  }
}

/**
 * UI Callback: Restores and navigates to the selected sheet row from the Index tab.
 */
function restoreSheetFromActiveIndexRow() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = ss.getActiveSheet();
  
  if (activeSheet.getName().indexOf("Index") === -1) {
    SpreadsheetApp.getUi().alert("Please select a row on the Index sheet to restore.");
    return;
  }

  const activeRow = activeSheet.getActiveRange().getRow();
  if (activeRow < 5) {
    SpreadsheetApp.getUi().alert("Please select a valid data row (Row 5 or lower).");
    return;
  }

  const sheetName = String(activeSheet.getRange(activeRow, 1).getValue() || "").trim();
  if (!sheetName) {
    SpreadsheetApp.getUi().alert("No valid sheet name found in the selected row.");
    return;
  }

  const targetSheet = ss.getSheetByName(sheetName);
  if (targetSheet) {
    targetSheet.showSheet();
    ss.setActiveSheet(targetSheet);
    ss.toast(`Unhid and navigated to ${sheetName}.`, "Index Engine", 3);
  } else {
    SpreadsheetApp.getUi().alert(`Sheet "${sheetName}" was not found in the local spreadsheet.`);
  }
}
