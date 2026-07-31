// ============================================================================
// SYSTEM_INDEX.GS
// Index Workspace Builder, Navigation Engine, and Archive Restore Endpoint
// ============================================================================

const ML_INDEX_REFRESH_DEFERRED_KEY = "ML_INDEX_REFRESH_DEFERRED";
const INDEX_SHEET = "Index";
const INDEX_HEADER_ROW_COUNT = 4;
const INDEX_DATA_START_ROW = 5;
const INDEX_TOTAL_COLUMNS = 10;
const INDEX_FIXED_ROW_COUNT = 100;

// --- INDEX CONFIGURATION COMMANDS -------------------------------------------

function configureArchiveSpreadsheetId() {
  const ui = SpreadsheetApp.getUi();
  const currentId = getArchiveSpreadsheetId_();
  const response = ui.prompt(
    "Configure Archive Spreadsheet",
    "Enter the Google Sheets ID for the Archive workbook.\n\nCurrent ID: " + currentId,
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return;
  const newId = String(response.getResponseText() || "").trim();
  if (!newId) return notify_("Configuration cancelled: ID cannot be blank.");
  if (newId.length < 25) {
    ui.alert("Invalid ID", "That does not appear to be a valid Google Sheets ID.", ui.ButtonSet.OK);
    return;
  }
  PropertiesService.getDocumentProperties().setProperty("RFF_ARCHIVE_SPREADSHEET_ID", newId);
  notify_("Archive Spreadsheet ID successfully updated.");
}

function configureIndexRestoreWebAppUrl() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getDocumentProperties();
  const current = getIndexRestoreWebAppUrl_();
  const response = ui.prompt(
    "Configure Index Restore Web App URL",
    "Paste the deployed Web App /exec URL used by Index restore hyperlinks.\n\nCurrent URL: " + (current || "(auto-detect / not configured)"),
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return;
  const value = String(response.getResponseText() || "").trim();
  if (value) props.setProperty("ML_INDEX_RESTORE_WEB_APP_URL", value);
  else props.deleteProperty("ML_INDEX_RESTORE_WEB_APP_URL");
  
  updateIndexSheet({ forceShellRebuild: true });
  ui.alert("Index Restore Web App URL", value ? "Index restore hyperlinks enabled and Index rebuilt!" : "Configured URL cleared. Web App auto-detection active.", ui.ButtonSet.OK);
}

// --- INDEX SHELL & TEMPLATE GOVERNANCE -------------------------------------

function hasIndexSheetShell_(sheet) {
  if (!sheet || sheet.getLastRow() < INDEX_HEADER_ROW_COUNT) return false;
  try {
    const titleLeft = String(sheet.getRange("A1").getValue() || "").trim();
    const titleRight = String(sheet.getRange("F1").getValue() || "").trim();
    return titleLeft === "Active Operational Sheets Workspace" && titleRight === "External Drive Cold-Storage Archives";
  } catch (err) {
    return false;
  }
}

function buildIndexSheetShell_(sheet) {
  const dashboard = loadDashboardConfig_();
  const theme = getSectionEThemeForSheet_("Index");
  const archiveId = getArchiveSpreadsheetId_();

  sheet.clear(); // One-time structural wipe

  const headerMatrix = [
    ["Active Operational Sheets Workspace", "", "", "", "", "External Drive Cold-Storage Archives", "", "", "", ""],
    ["Last Updated", new Date(), "", "", "", "Archive File ID", archiveId, "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["Section / Group", "Sheet Tab Name", "Workspace Link", "Visibility", "", "Archive Month", "Archive Sheet Name", "Link to Sheet", "Status", "Restore Action"]
  ];

  sheet.getRange(1, 1, 4, INDEX_TOTAL_COLUMNS).setValues(headerMatrix);

  // Formatting Header Banners
  sheet.getRange("A1:D1").merge().setBackground(theme.level3).setFontWeight("bold").setFontColor("#000000").setFontSize(12);
  sheet.getRange("F1:J1").merge().setBackground(theme.level2).setFontWeight("bold").setFontColor("#000000").setFontSize(12);

  sheet.getRange("A2:D2").setBackground(theme.level4);
  sheet.getRange("F2:J2").setBackground(theme.level5);

  sheet.getRange("A4:D4").setBackground(theme.level2).setFontWeight("bold");
  sheet.getRange("F4:J4").setBackground(theme.level3).setFontWeight("bold");

  // Column Widths from Dashboard Section E
  const surface = (dashboard.systemSurfaces && dashboard.systemSurfaces["Index"]) || {};
  const customWidths = surface.defaultColumnWidths || [160, 200, 140, 110, 30, 140, 200, 140, 140, 150];

  for (let col = 1; col <= INDEX_TOTAL_COLUMNS; col++) {
    sheet.setColumnWidth(col, customWidths[col - 1] || (col === 5 ? 30 : 150));
  }

  sheet.setFrozenRows(INDEX_HEADER_ROW_COUNT);
  placeCreatedSheetInConfiguredOrder_(sheet);

  return sheet;
}

// --- DATA UPDATERS (DYNAMICALLY GOVERNED) -----------------------------------

/**
 * Fast Data Refresh: Active Workspace (Columns A-D)
 * Dynamically groups active tabs using Section F of the Format Dashboard.
 */
function updateIndexLocalWorkspace_(sheet, theme) {
  const ss = sheet.getParent();
  const localRows = [];
  const headerRowIndexes = [];
  const seenLocal = new Set([INDEX_SHEET]);

  function localSheetRow_(sheetName) {
    const sh = ss.getSheetByName(sheetName);
    if (!sh || seenLocal.has(sheetName)) return null;
    seenLocal.add(sheetName);
    return [
      "",
      sheetName,
      '=HYPERLINK("#gid=' + sh.getSheetId() + '","Open Live Tab")',
      sh.isSheetHidden() ? "Hidden 🙈" : "Visible 🟢"
    ];
  }

  // DYNAMIC: Pull tab groups directly from Dashboard Section F
  const tabProfiles = getTabOrganizationProfilesForSort_();
  const dynamicGroupOrder = Array.from(new Set(tabProfiles.map(p => p.group).filter(Boolean)));
  if (dynamicGroupOrder.indexOf("Other") === -1) dynamicGroupOrder.push("Other");

  const sheetsByGroup = {};
  dynamicGroupOrder.forEach(g => { sheetsByGroup[g] = []; });

  ss.getSheets().forEach(function(workbookSheet) {
    const sheetName = workbookSheet.getName();
    if (seenLocal.has(sheetName)) return;
    const profile = getSheetSortProfileByName_(sheetName);
    const group = String(profile.group || "Other").trim() || "Other";
    if (!sheetsByGroup[group]) sheetsByGroup[group] = [];
    sheetsByGroup[group].push(sheetName);
  });

  let currentRowIdx = INDEX_DATA_START_ROW;

  dynamicGroupOrder.forEach(function(group) {
    const sheetNames = sheetsByGroup[group] || [];
    if (sheetNames.length === 0) return;

    localRows.push([group, "", "", ""]);
    headerRowIndexes.push(currentRowIdx);
    currentRowIdx++;

    sheetNames.forEach(function(sheetName) {
      const row = localSheetRow_(sheetName);
      if (row) {
        localRows.push(row);
        currentRowIdx++;
      }
    });
  });

  const startRow = INDEX_DATA_START_ROW;
  const oldLastRow = Math.max(sheet.getLastRow(), startRow);
  const clearRows = Math.max(oldLastRow - startRow + 1, localRows.length, 1);

  sheet.getRange(startRow, 1, clearRows, 4).clearContent().setBackground("#FFFFFF").setFontWeight("normal");

  if (localRows.length > 0) {
    sheet.getRange(startRow, 1, localRows.length, 4).setValues(localRows);
    if (headerRowIndexes.length > 0) {
      const headerA1s = headerRowIndexes.map(r => `A${r}:D${r}`);
      sheet.getRangeList(headerA1s).setBackground(theme.level3).setFontWeight("bold");
    }
  }

  return localRows.length;
}

/**
 * Fast Data Refresh: Cold Storage Archive (Columns F-J)
 */
function updateIndexArchiveWorkspace_(sheet, theme, preOpenedArchiveSs) {
  const archiveRows = [];
  const archiveId = getArchiveSpreadsheetId_();

  try {
    const archiveSs = preOpenedArchiveSs || SpreadsheetApp.openById(archiveId);
    archiveSs.getSheets().forEach(function(ash) {
      const ashName = ash.getName();
      const ashDate = extractFirstDateFromSheetName_(ashName);
      const archiveMonthDisplay = ashDate ? Utilities.formatDate(ashDate, Session.getScriptTimeZone(), "MMMM yyyy") : "Cold Storage";
      
      archiveRows.push([
        archiveMonthDisplay,
        ashName,
        '=HYPERLINK("https://docs.google.com/spreadsheets/d/' + archiveId + '/edit#gid=' + ash.getSheetId() + '","Open Archive Tab")',
        ash.isSheetHidden() ? "Archived (Hidden)" : "Visible in Archive",
        buildIndexRestoreHyperlinkFormula_(ashName, "demo_p_archive")
      ]);
    });
    archiveRows.sort((a, b) => String(a[0]).localeCompare(String(b[0])));
  } catch (err) {
    archiveRows.push(["", "Archive Spreadsheet Unreachable", "", "Verify permissions/ID", ""]);
  }

  const startRow = INDEX_DATA_START_ROW;
  const oldLastRow = Math.max(sheet.getLastRow(), startRow);
  const clearRows = Math.max(oldLastRow - startRow + 1, archiveRows.length, 1);

  sheet.getRange(startRow, 6, clearRows, 5).clearContent().setBackground("#FFFFFF");

  if (archiveRows.length > 0) {
    sheet.getRange(startRow, 6, archiveRows.length, 5).setValues(archiveRows);
  }

  return archiveRows.length;
}

/**
 * Master Index Coordinator.
 */
function updateIndexSheet(options) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(INDEX_SHEET);

  let preOpenedArchiveSs = null;
  let activeOnly = false;
  let archiveOnly = false;
  let forceShellRebuild = false;

  if (options && typeof options.getSheets === "function") {
    preOpenedArchiveSs = options;
  } else if (options && typeof options === "object") {
    preOpenedArchiveSs = options.archiveSs || options.preOpenedArchiveSs || null;
    activeOnly = !!options.activeOnly;
    archiveOnly = !!options.archiveOnly;
    forceShellRebuild = !!options.forceShellRebuild;
  }

  if (!sheet || forceShellRebuild || !hasIndexSheetShell_(sheet)) {
    sheet = buildIndexSheetShell_(sheet || ss.insertSheet(INDEX_SHEET, 0));
  }

  const theme = getSectionEThemeForSheet_("Index");
  let localCount = 0, archiveCount = 0;

  if (!archiveOnly) localCount = updateIndexLocalWorkspace_(sheet, theme);
  if (!activeOnly) archiveCount = updateIndexArchiveWorkspace_(sheet, theme, preOpenedArchiveSs);

  sheet.getRange("B2").setValue(new Date()).setNumberFormat("mm/dd/yyyy hh:mm:ss");
  forceSheetRowCount_(sheet, Math.max(INDEX_FIXED_ROW_COUNT, INDEX_DATA_START_ROW + Math.max(localCount, archiveCount)));

  return sheet;
}

function createIndexSheet(options) { return updateIndexSheet(options); }
function generateArchiveFileIndex_() { return updateIndexSheet(); }

function refreshIndexAfterSheetWorkflow_(workflowName, options) {
  try {
    updateIndexSheet(options || { activeOnly: true });
  } catch (err) {
    logBestEffortWarning_((workflowName || "Workflow") + " index refresh skipped: " + err.message);
  }
}

function runDeferredIndexRefreshIfNeeded_() {
  const props = PropertiesService.getDocumentProperties();
  if (props.getProperty(ML_INDEX_REFRESH_DEFERRED_KEY) !== "true") return false;
  props.deleteProperty(ML_INDEX_REFRESH_DEFERRED_KEY);
  updateIndexSheet();
  return true;
}

// --- ARCHIVE SHEET RESTORATION ENGINE ---------------------------------------

function restoreSheetFromActiveIndexRow(optionalTargetSheetName) {
  const ui = SpreadsheetApp.getUi();
  const mainSs = SpreadsheetApp.getActiveSpreadsheet();
  const indexSheet = mainSs.getSheetByName(INDEX_SHEET);
  const activeRange = mainSs.getActiveRange();
  let targetSheetName = String(optionalTargetSheetName || "").trim();

  if (!targetSheetName) {
    if (!indexSheet || !activeRange || activeRange.getSheet().getSheetId() !== indexSheet.getSheetId()) {
      ui.alert("Selection Required", "Please click on a row within the 'External Drive Cold-Storage Archives' grid selection table first.", ui.ButtonSet.OK);
      return;
    }

    const row = activeRange.getRow();
    const col = activeRange.getColumn();

    if (row < INDEX_DATA_START_ROW || col < 6) {
      ui.alert("Invalid Selection", "Please click anywhere on an Archive entry row (Columns F through J) before requesting a restore.", ui.ButtonSet.OK);
      return;
    }

    targetSheetName = String(indexSheet.getRange(row, 7).getValue() || "").trim();
  }

  if (!targetSheetName || targetSheetName.indexOf("Open Archive") === 0 || targetSheetName.indexOf("Archive Sheet") === 0) {
    ui.alert("Empty Selection", "The chosen row index coordinate does not contain a valid archived sheet identifier.", ui.ButtonSet.OK);
    return;
  }

  if (mainSs.getSheetByName(targetSheetName)) {
    ui.alert("Conflict Detected", "The sheet '" + targetSheetName + "' already exists locally in this workbook. Please rename or delete the local copy first.", ui.ButtonSet.OK);
    return;
  }

  if (!optionalTargetSheetName) {
    const confirmation = ui.alert(
      "Confirm Sheet Retrieval",
      "Are you sure you want to retrieve '" + targetSheetName + "' from cold storage and restore it as an active workspace tab?",
      ui.ButtonSet.YES_NO
    );
    if (confirmation !== ui.Button.YES) return;
  }

  restoreSheetFromArchiveWorkbook(targetSheetName);
  if (!optionalTargetSheetName) {
    ui.alert("Success", "The sheet '" + targetSheetName + "' has been successfully restored from cold storage.", ui.ButtonSet.OK);
  }
}

function restoreSheetFromArchiveWorkbook(targetSheetName) {
  const mainSs = SpreadsheetApp.getActiveSpreadsheet();
  targetSheetName = String(targetSheetName || "").trim();

  if (!targetSheetName) throw new Error("Missing archive sheet name to restore.");
  if (mainSs.getSheetByName(targetSheetName)) throw new Error("The sheet '" + targetSheetName + "' already exists locally in this workbook.");

  const archiveId = getArchiveSpreadsheetId_();
  const archiveSs = SpreadsheetApp.openById(archiveId);
  const archiveSourceSheet = archiveSs.getSheetByName(targetSheetName);

  if (!archiveSourceSheet) throw new Error("The sheet '" + targetSheetName + "' was not found inside the external archive database.");

  mainSs.toast("Retrieving '" + targetSheetName + "' from archive drive...", "Data Transfer Running", 5);
  const restoredSheet = archiveSourceSheet.copyTo(mainSs);
  restoredSheet.setName(targetSheetName);
  placeCreatedSheetInConfiguredOrder_(restoredSheet);

  if (typeof restoredSheet.showSheet === "function") restoredSheet.showSheet();
  updateIndexSheet();
  mainSs.setActiveSheet(restoredSheet);

  return restoredSheet;
}

// --- WEB APP ENDPOINT FOR RESTORE HYPERLINKS --------------------------------

function buildIndexRestoreHyperlinkFormula_(targetSheetName, actionType) {
  const webAppUrl = getIndexRestoreWebAppUrl_();
  if (!webAppUrl || !targetSheetName) return "🔄 Click to Restore";
  const restoreAction = String(actionType || "demo_p_archive").trim();
  const compositeLinkUrl = webAppUrl + "?restoreTarget=" + encodeURIComponent(targetSheetName) + "&action=" + encodeURIComponent(restoreAction);
  return '=HYPERLINK("' + compositeLinkUrl + '", "🔄 Click to Restore")';
}

function getIndexRestoreWebAppUrl_() {
  try {
    const configuredUrl = String(PropertiesService.getDocumentProperties().getProperty("ML_INDEX_RESTORE_WEB_APP_URL") || "").trim();
    if (configuredUrl) return configuredUrl;
  } catch (err) {}

  try {
    const deployedUrl = String(ScriptApp.getService().getUrl() || "").trim();
    if (/^https:\/\/script\.google\.com\/macros\/s\//i.test(deployedUrl)) return deployedUrl;
  } catch (err) {}

  return "";
}

function escapeHtml_(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function doGet(e) {
  e = e || { parameter: {} };
  const targetSheetName = e.parameter && e.parameter.restoreTarget;
  const actionType = e.parameter && e.parameter.action;
  const safeTargetSheetName = escapeHtml_(targetSheetName);

  if (!targetSheetName) {
    return HtmlService.createHtmlOutput("<p style='font-family: sans-serif;color:#cc0000;'>⚠️ Error: Missing recovery sheet routing token parameter.</p>");
  }

  const lock = LockService.getDocumentLock();
  let lockAcquired = false;

  try {
    if (lock.tryLock(15000)) {
      lockAcquired = true;
      if (actionType === "demo_p_archive") restoreSheetFromArchiveWorkbook(targetSheetName);
      else restoreSheetFromActiveIndexRow(targetSheetName);

      return HtmlService.createHtmlOutput(
        "<script>window.top.close();</script>" +
        "<body style='font-family: sans-serif; text-align:center; padding-top: 35px; background-color:#f8f9fa;'>" +
        "  <h3 style='color:#2b7a78;'>🔄 Restoration Complete!</h3>" +
        "  <p>Processed pipeline synchronization parameters for target workspace: <b>" + safeTargetSheetName + "</b></p>" +
        "  <p style='color:#777;font-size:11px;'>This window can be safely closed.</p>" +
        "</body>"
      );
    }
    return HtmlService.createHtmlOutput("<p>⚠️ Server busy processing another execution string. Click the hyperlink tab again.</p>");
  } catch (err) {
    return HtmlService.createHtmlOutput("<p style='font-family:sans-serif;color:#cc0000;'>❌ Recovery Routing Execution Failed: " + escapeHtml_(err && err.message ? err.message : err) + "</p>");
  } finally {
    if (lockAcquired) {
      try { lock.releaseLock(); } catch (rErr) {}
    }
  }
}
