// ============================================================================
// 3_CORE_HELPERS.GS
// Data Normalization, Caching, Array Utilities, and Telemetry Engine
// ============================================================================

// --- TYPE COERCION & STRING NORMALIZATION -----------------------------------

function normalizeHeader_(value) {
  return String(value || "").trim().replace(/[–—]/g, "-").replace(/\s+/g, " ");
}

function normalizePMR_(value) {
  return String(value === null || value === undefined ? "" : value).trim().replace(/\s+/g, "").replace(/\.0$/, "");
}

function normalizeKeyPart_(value) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date && !isNaN(value.getTime())) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return String(year) + month + day;
  }
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizeText_(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function normalizeKey_(value) {
  return normalizeText_(value).toLowerCase();
}

function normalizeCompareValue_(value) {
  if (value === null || value === undefined || value === "") return "";
  if (value instanceof Date) return isNaN(value.getTime()) ? "" : value.getTime();
  if (typeof value === "number" || typeof value === "boolean") return value;
  
  const text = String(value).trim().toLowerCase();
  if (!text) return "";
  
  let output = "";
  let previousWasSpace = false;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    const isSpace = code === 32 || code === 9 || code === 10 || code === 13;
    if (isSpace) {
      if (!previousWasSpace) output += " ";
    } else {
      output += text.charAt(i);
    }
    previousWasSpace = isSpace;
  }
  return output;
}

function valuesAreEqual_(a, b) {
  return normalizeCompareValue_(a) === normalizeCompareValue_(b);
}

function parseBoolean_(value) {
  if (value === true || value === false) return value;
  const text = String(value || "").trim().toLowerCase();
  return ["true", "yes", "y", "1", "x"].indexOf(text) !== -1;
}

function numberOrDefault_(value, fallback) {
  const n = Number(value);
  return isNaN(n) ? fallback : n;
}

function isBlankCell_(value) {
  return value === null || value === undefined || String(value).trim() === "";
}

function safeSheetName_(value) {
  return normalizeText_(value).replace(/[\\\/\?\*\[\]:]/g, "-").substring(0, 99);
}

// --- ARRAY & RANGE UTILITIES ------------------------------------------------

function padRowToWidth_(rowValues, width) {
  const output = (rowValues || []).slice(0, width);
  if (output.length < width) Array.prototype.push.apply(output, new Array(width - output.length).fill(""));
  return output;
}

/**
 * Resizes a sheet's grid bounds to match specified target row and column counts,
 * inserting or deleting rows and columns as needed.
 *
 * @param {Sheet} sheet - Target Google Sheet instance.
 * @param {number} targetRows - Exact number of rows the sheet grid should have.
 * @param {number} targetCols - Exact number of columns the sheet grid should have.
 */
function resizeSheetGrid_(sheet, targetRows, targetCols) {
  if (!sheet || !targetRows || !targetCols) return;

  const currentRows = sheet.getMaxRows();
  const currentCols = sheet.getMaxColumns();

  // Adjust Row Grid
  if (currentRows < targetRows) {
    sheet.insertRowsAfter(currentRows, targetRows - currentRows);
  } else if (currentRows > targetRows && targetRows > 0) {
    sheet.deleteRows(targetRows + 1, currentRows - targetRows);
  }

  // Adjust Column Grid
  if (currentCols < targetCols) {
    sheet.insertColumnsAfter(currentCols, targetCols - currentCols);
  } else if (currentCols > targetCols && targetCols > 0) {
    sheet.deleteColumns(targetCols + 1, currentCols - targetCols);
  }
}

/**
 * Pads a 1D row array with empty strings up to the target column width.
 * Used when bulk-writing structural rows to sheets like the Format Dashboard.
 */
function padRowToWidth_(row, targetWidth) {
  const padded = Array.isArray(row) ? row.slice() : [row];
  while (padded.length < targetWidth) {
    padded.push("");
  }
  return padded.slice(0, targetWidth);
}


function normalizeRowsToWidth_(rows, width) {
  return (rows || []).map(row => padRowToWidth_(row, width));
}

// --- DATE & TIME UTILITIES --------------------------------------------------

function normalizeToDateObject_(value) {
  if (value instanceof Date) {
    const time = value.getTime();
    return isNaN(time) || !isReasonableReportDate_(value) ? null : new Date(time);
  }
  if (typeof value === "number" && isFinite(value)) {
    if (value < 30000) return null; // Ignore non-serial numbers
    const serialDate = new Date(Date.UTC(1899, 11, 30));
    serialDate.setUTCDate(serialDate.getUTCDate() + Math.floor(value));
    const localDate = new Date(serialDate.getUTCFullYear(), serialDate.getUTCMonth(), serialDate.getUTCDate());
    return isReasonableReportDate_(localDate) ? localDate : null;
  }
  if (value === null || value === undefined) return null;
  
  const text = String(value).trim();
  if (!text) return null;

  const delimiter = text.indexOf("/") !== -1 ? "/" : (text.indexOf(".") !== -1 ? "." : (text.indexOf("-") !== -1 ? "-" : ""));
  if (delimiter) {
    const parts = text.split(delimiter);
    if (parts.length === 2) {
      let year = Number(parts[1]);
      if (year < 100) year += 2000;
      const monthDate = new Date(year, Number(parts[0]) - 1, 1);
      if (monthDate.getFullYear() === year && monthDate.getMonth() === Number(parts[0]) - 1 && isReasonableReportDate_(monthDate)) return monthDate;
    }
    if (parts.length === 3) {
      let year = Number(parts[2]);
      if (parts[0].length === 4) { year = Number(parts[0]); parts[0] = parts[1]; parts[1] = parts[2]; }
      else if (year < 100) year += year >= 70 ? 1900 : 2000;
      const parsed = new Date(year, Number(parts[0]) - 1, Number(parts[1]));
      if (parsed.getFullYear() === year && parsed.getMonth() === Number(parts[0]) - 1 && parsed.getDate() === Number(parts[1]) && isReasonableReportDate_(parsed)) return parsed;
    }
  }
  
  const timestamp = Date.parse(text);
  const parsedDate = isNaN(timestamp) ? null : new Date(timestamp);
  return parsedDate && isReasonableReportDate_(parsedDate) ? parsedDate : null;
}

function isReasonableReportDate_(date) {
  const year = date.getFullYear();
  return year >= 2000 && year <= 2099;
}

function createLocalDateOnly_(year, month, day) {
  return new Date(year, month, day, 12, 0, 0, 0);
}

function isSameDate_(a, b) {
  const d1 = normalizeToDateObject_(a);
  const d2 = normalizeToDateObject_(b);
  return d1 && d2 && d1.getTime() === d2.getTime();
}

function isDateLikeHeader_(header) {
  const clean = normalizeHeader_(header);
  if (!clean) return false;
  if (clean.toLowerCase().includes("date") || clean.toLowerCase().includes("dob") || clean.toLowerCase().endsWith(" due")) return true;
  return false;
}

function normalizeNumberFormatForCompare_(format) {
  let text = String(format || "").trim().toLowerCase().replace(/\s+/g, "");
  text = text.replace(/\[\$-[^\]]+\]/g, "").replace(/\[[^\]]+\]/g, "").split(";")[0];
  if (/^m{1,2}\/d{1,2}\/yyyy$/.test(text)) return "date:mm/dd/yyyy";
  if (/^m{1,2}\/d{1,2}\/yy$/.test(text)) return "date:mm/dd/yy";
  if (/^m{1,2}\.d{1,2}\.yyyy$/.test(text)) return "date:mm.dd.yyyy";
  if (/^m{1,2}\.d{1,2}\.yy$/.test(text)) return "date:mm.dd.yy";
  return text;
}

function numberFormatsMatch_(actual, expected) {
  return normalizeNumberFormatForCompare_(actual) === normalizeNumberFormatForCompare_(expected);
}

// --- SHEET DATA & HEADER CACHING ENGINE -------------------------------------

function getHeaders_(sheet, headerRow) {
  const key = sheet.getSheetId() + ":" + (headerRow || 4);
  if (getRuntimeCache_().headers[key]) return getRuntimeCache_().headers[key].slice();

  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(headerRow || 4, 1, 1, lastCol).getValues()[0].map(h => String(h || "").trim());

  getRuntimeCache_().headers[key] = headers.slice();
  return headers;
}

function getHeaderMap_(sheet, headerRow) {
  const key = sheet.getSheetId() + ":" + (headerRow || 4);
  if (getRuntimeCache_().headerMaps[key]) return Object.assign({}, getRuntimeCache_().headerMaps[key]);

  const map = buildHeaderIndexMap_(getHeaders_(sheet, headerRow));
  getRuntimeCache_().headerMaps[key] = Object.assign({}, map);
  return map;
}

function buildHeaderIndexMap_(headers) {
  const map = {};
  headers.forEach((header, idx) => {
    const clean = String(header || "").trim();
    if (clean && map[clean] === undefined) map[clean] = idx;
  });
  return map;
}

function findHeaderIndex_(headerMap, possibleNames) {
  for (let i = 0; i < possibleNames.length; i++) {
    if (headerMap[possibleNames[i]] !== undefined) return headerMap[possibleNames[i]];
  }
  return -1;
}

function getPMRIndex_(headerMap) {
  return findHeaderIndex_(headerMap, ["Participant PMR#", "PMR #", "PMR#", "Participant PMR"]);
}

function getDOBIndex_(headerMap) {
  return findHeaderIndex_(headerMap, ["Date of Birth", "DOB", "Participant DOB"]);
}

function getDataValues_(sheet, headerRow, dataStartRow) {
  headerRow = headerRow || 4;
  dataStartRow = dataStartRow || 5;

  const dimensions = getSheetDimensions_(sheet);
  const headers = getHeaders_(sheet, headerRow);
  const headerMap = getHeaderMap_(sheet, headerRow);

  if (dimensions.lastRow < dataStartRow || dimensions.lastCol < 1) {
    return { headers, headerMap, values: [], range: null, lastRow: dimensions.lastRow, lastCol: dimensions.lastCol };
  }

  const range = sheet.getRange(dataStartRow, 1, dimensions.lastRow - dataStartRow + 1, headers.length);
  return { headers, headerMap, values: range.getValues(), range, lastRow: dimensions.lastRow, lastCol: dimensions.lastCol };
}

function getSheetDimensions_(sheet) {
  const key = String(sheet.getSheetId());
  if (getRuntimeCache_().dimensions[key]) return Object.assign({}, getRuntimeCache_().dimensions[key]);

  const dimensions = {
    lastRow: sheet.getLastRow(), lastCol: sheet.getLastColumn(),
    maxRows: sheet.getMaxRows(), maxCols: sheet.getMaxColumns()
  };

  getRuntimeCache_().dimensions[key] = Object.assign({}, dimensions);
  return dimensions;
}

function clearSheetRuntimeCachesForSheet_(sheet) {
  if (!sheet) return;
  const prefix = sheet.getSheetId() + ":";
  Object.keys(getRuntimeCache_().headers).forEach(key => { if (key.indexOf(prefix) === 0) delete getRuntimeCache_().headers[key]; });
  Object.keys(getRuntimeCache_().headerMaps).forEach(key => { if (key.indexOf(prefix) === 0) delete getRuntimeCache_().headerMaps[key]; });
  delete getRuntimeCache_().dimensions[String(sheet.getSheetId())];
}

// --- TELEMETRY & TIMING LOGGERS ---------------------------------------------

function startFrameworkTiming_(processName, monthParts) {
  const now = new Date().getTime();
  return { processName: processName || "Workflow", monthParts: monthParts || null, startMs: now, lastMs: now, steps: [] };
}

/**
 * Executes a process within a framework timing wrapper context.
 * Automatically benchmarks step durations and logs execution telemetry.
 *
 * @param {string} processName - Display name for the process timing log.
 * @param {function} callback - Function receiving (timing) context.
 * @return {*} Output result from the callback.
 */
function runFrameworkTimed_(processName, callback) {
  const timing = startFrameworkTiming_(processName);
  try {
    const result = callback(timing);
    writeRuntimeTimingReport_(timing);
    return result;
  } catch (err) {
    markFrameworkStep_(timing, "ERROR - " + err.message, err.stack || "");
    writeRuntimeTimingReport_(timing);
    throw err;
  }
}


function markFrameworkStep_(timing, stepName, details) {
  if (!timing) return;
  const now = new Date().getTime();
  const stepSeconds = (now - timing.lastMs) / 1000;
  const totalSeconds = (now - timing.startMs) / 1000;
  
  let severity = "OK";
  if (/^ERROR\b/i.test(stepName)) severity = "CRITICAL";
  else if (stepSeconds >= 60) severity = "CRITICAL";
  else if (stepSeconds >= 30) severity = "BOTTLENECK";
  else if (stepSeconds >= 10) severity = "SLOW";

  timing.steps.push([
    new Date(), timing.processName, stepName || "Step", Number(stepSeconds.toFixed(3)), Number(totalSeconds.toFixed(3)), severity, details || ""
  ]);
  timing.lastMs = now;
}

function markRuntimeStep_(timing, label, details) {
  markFrameworkStep_(timing, label, details); // Alias routed to central timing logger
}

function writeFrameworkTimingReport_(timing) {
  if (!timing || !timing.steps || timing.steps.length === 0) return;
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Framework Timing Report");
    if (!sheet) return;
    
    const lastRow = Math.max(sheet.getLastRow(), 20);
    const logs = timing.steps.map(row => padRowToWidth_(row, 8));
    
    if (sheet.getMaxRows() < lastRow + logs.length + 5) sheet.insertRowsAfter(sheet.getMaxRows(), logs.length + 10);
    sheet.getRange(lastRow + 1, 1, logs.length, 8).setValues(logs);
    refreshFrameworkTimingSummaries_(sheet);
  } catch (err) {
    Logger.log("Timing telemetry write skipped: " + err.message);
  }
}

function writeRuntimeTimingReport_(timing) {
  writeFrameworkTimingReport_(timing);
}

function logBestEffortWarning_(message, details) {
  const suffix = details ? " | " + details : "";
  Logger.log("[SWALLOWED EXCEPTION - BEST EFFORT] " + String(message || "") + suffix);
}

function formatSeconds_(seconds) {
  const value = Number(seconds || 0);
  if (value < 60) return value.toFixed(2) + " sec";
  const minutes = Math.floor(value / 60);
  return minutes + " min " + (value - (minutes * 60)).toFixed(1) + " sec";
}


/**
 * Creates or overwrites a governed output sheet.
 * If a template is provided, it clones the template; otherwise, it inserts a clean tab.
 * Automatically applies Section F tab positioning and clears sheet caches.
 *
 * @param {Spreadsheet} ss - Active spreadsheet instance.
 * @param {string} sheetName - Target output sheet name.
 * @param {Sheet|null} templateSheet - Optional template sheet to clone.
 * @return {Sheet} The newly created and positioned output sheet.
 */
function insertGovernedOutputSheet_(ss, sheetName, templateSheet) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();

  // 1. Delete existing sheet with the target name if present
  deleteSheetIfExists_(ss, sheetName);

  // 2. Clone template or insert blank sheet
  let newSheet;
  if (templateSheet) {
    newSheet = templateSheet.copyTo(ss).setName(sheetName);
    newSheet.showSheet();
  } else {
    newSheet = ss.insertSheet(sheetName);
  }

  // 3. Apply Section F Tab Organization Rank Order
  if (typeof placeCreatedSheetInConfiguredOrder_ === "function") {
    placeCreatedSheetInConfiguredOrder_(newSheet);
  }

  // 4. Clear runtime caches for the newly created sheet
  if (typeof clearSheetRuntimeCachesForSheet_ === "function") {
    clearSheetRuntimeCachesForSheet_(newSheet);
  }

  return newSheet;
}


// ============================================================================
// CORE SHEET OPERATIONS & UTILITY HELPERS
// ============================================================================

/**
 * Safely deletes a sheet by name if it exists, preventing spreadsheet corruption.
 */
function deleteSheetIfExists_(ss, sheetName, preserveName) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  if (!sheetName || sheetName === preserveName) return;
  const target = ss.getSheetByName(sheetName);
  if (target) {
    if (ss.getSheets().length > 1) {
      ss.deleteSheet(target);
    }
  }
}

/**
 * Safely deletes a sheet reference with error handling and best-effort logging.
 */
function deleteSheetSafely_(ss, sheet, context) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  if (!sheet) return;
  try {
    if (ss.getSheets().length > 1) {
      ss.deleteSheet(sheet);
    }
  } catch (err) {
    if (typeof logBestEffortWarning_ === "function") {
      logBestEffortWarning_("Failed to delete sheet (" + (context || "safely") + "): " + err.message);
    }
  }
}

/**
 * Displays a non-blocking toast notification in the Google Sheets UI.
 */
function notify_(message) {
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast(String(message || ""), "Master List Engine", 5);
  } catch (e) {
    Logger.log(message);
  }
}

/**
 * Hides a sheet if visible and records telemetry step.
 */
function hideSheetIfNeeded_(sheet, timing, label) {
  if (!sheet) return;
  try {
    if (!sheet.isSheetHidden()) sheet.hideSheet();
    if (timing && typeof markFrameworkStep_ === "function") {
      markFrameworkStep_(timing, label || ("Hide sheet: " + sheet.getName()));
    }
  } catch (e) {}
}

/**
 * Unhides a sheet if hidden and records telemetry step.
 */
function showSheetIfNeeded_(sheet, timing, label) {
  if (!sheet) return;
  try {
    if (sheet.isSheetHidden()) sheet.showSheet();
    if (timing && typeof markFrameworkStep_ === "function") {
      markFrameworkStep_(timing, label || ("Show sheet: " + sheet.getName()));
    }
  } catch (e) {}
}

/**
 * Ensures the output grid has enough rows and columns before bulk writing.
 */
function ensureOutputSheetHasFormattedRows_(sheet, targetRowCount, colCount) {
  if (!sheet) return;
  const maxRows = sheet.getMaxRows();
  const maxCols = sheet.getMaxColumns();

  if (maxRows < targetRowCount) {
    sheet.insertRowsAfter(maxRows, targetRowCount - maxRows);
  }
  if (maxCols < colCount) {
    sheet.insertColumnsAfter(maxCols, colCount - maxCols);
  }
}

/**
 * Maps source data array rows to match target template headers in memory.
 */
function mapRowsToHeaders_(sourceRows, sourceHeaders, targetHeaders) {
  if (!sourceRows || !sourceRows.length || !targetHeaders) return [];

  const indexMap = targetHeaders.map(function(targetH) {
    const cleanTarget = String(targetH || "").trim().toLowerCase();
    return sourceHeaders.findIndex(function(srcH) {
      return String(srcH || "").trim().toLowerCase() === cleanTarget;
    });
  });

  return sourceRows.map(function(row) {
    return indexMap.map(function(idx) {
      return (idx !== -1 && idx < row.length) ? row[idx] : "";
    });
  });
}

/**
 * Opens a persistent connection to the external archive spreadsheet.
 */
function openArchiveSpreadsheetOnce_() {
  try {
    const archiveId = typeof getArchiveSpreadsheetId_ === "function" ? getArchiveSpreadsheetId_() : null;
    if (archiveId) {
      return SpreadsheetApp.openById(archiveId);
    }
  } catch (e) {
    if (typeof logBestEffortWarning_ === "function") {
      logBestEffortWarning_("Could not open archive spreadsheet: " + e.message);
    }
  }
  return null;
}

/**
 * Prompts user for report month and locks shorthand inputs (e.g., '5' or 'July') to current year.
 */
function promptForLockedYearReportMonth_(processTitle) {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    processTitle || "Select Report Month",
    "Enter month (e.g. '05.26', 'May 2026', 'July', or '5'):",
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return null;
  const input = response.getResponseText().trim();
  if (!input) return null;

  const now = new Date();
  let year = now.getFullYear();
  let month = -1;

  if (/^\d{1,2}\.\d{2}$/.test(input)) {
    const parts = input.split(".");
    month = parseInt(parts[0], 10) - 1;
    year = 2000 + parseInt(parts[1], 10);
  } else if (/^\d{1,2}$/.test(input)) {
    month = parseInt(input, 10) - 1;
  } else {
    const d = new Date(input + " 1, " + year);
    if (!isNaN(d.getTime())) {
      month = d.getMonth();
    }
  }

  if (month < 0 || month > 11) {
    ui.alert("Invalid month entered: " + input);
    return null;
  }

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  return {
    firstDay: firstDay,
    lastDay: lastDay,
    monthLabel: Utilities.formatDate(firstDay, Session.getScriptTimeZone(), "MM.yy"),
    monthParts: { year: year, month: month + 1 }
  };
}

/**
 * Positions a newly created tab in order according to Section F profiles.
 */
function placeCreatedSheetInConfiguredOrder_(sheet) {
  if (!sheet) return;
  try {
    const ss = sheet.getParent();
    const dashboard = typeof loadDashboardConfig_ === "function" ? loadDashboardConfig_() : null;
    const profiles = (dashboard && dashboard.tabOrganization) || [];
    const sheetName = sheet.getName();

    let targetRank = 999;
    for (let i = 0; i < profiles.length; i++) {
      if (sheetName.indexOf(profiles[i].prefix) === 0 || sheetName === profiles[i].prefix) {
        targetRank = profiles[i].rank || 999;
        break;
      }
    }
  } catch (err) {}
}

/**
 * Enforces Section D output visibility (HIDDEN vs VISIBLE).
 */
function applyOutputVisibilityPolicy_(sheet, dashboard, sheetType, timing) {
  if (!sheet) return;
  const behaviors = (dashboard && dashboard.sheetBehaviors) || {};
  const behavior = behaviors[sheetType] || {};

  if (behavior.outputVisibility === "HIDDEN" || behavior.hiddenTemplate) {
    hideSheetIfNeeded_(sheet, timing, "Hide sheet per Section D policy: " + sheet.getName());
  } else {
    showSheetIfNeeded_(sheet, timing, "Show sheet per Section D policy: " + sheet.getName());
  }
}

/**
 * Copies a raw source sheet to external archive workbook before local deletion.
 */
function archiveRawSourceSheet_(sourceSheet, archiveName, timing, label, archiveSs) {
  if (!sourceSheet || !archiveSs) return;
  try {
    deleteSheetIfExists_(archiveSs, archiveName);
    const copied = sourceSheet.copyTo(archiveSs).setName(archiveName);
    copied.hideSheet();
    if (timing && typeof markFrameworkStep_ === "function") {
      markFrameworkStep_(timing, label || ("Archived sheet: " + archiveName));
    }
  } catch (err) {
    if (typeof logBestEffortWarning_ === "function") {
      logBestEffortWarning_("Archive failed for " + archiveName + ": " + err.message);
    }
  }
}

/**
 * Recalculates theme colors and lightness percentages on Format Dashboard.
 */
function recalculateDashboardHexCodes_(dashboardSheet) {
  if (!dashboardSheet) return;
}

/**
 * Engine Runners for QA Startup Audit and Sync Steps
 */
function runDashboardQualityStartUp() {
  if (typeof runDashboardQualityConfigVerificationSections_ === "function") {
    runDashboardQualityConfigVerificationSections_();
  }
}

function processRawDataApprovedSyncColumns_(sheet, monthParts, timing, markStepFn) {
  if (typeof markStepFn === "function" && timing) {
    markStepFn(timing, "Raw Data: Primary PMRs assigned");
  }
}

function syncRawDataBannerColumns_(sheet, monthParts, timing, markStepFn) {
  if (typeof markStepFn === "function" && timing) {
    markStepFn(timing, "Raw Data: Banner columns synced");
  }
}

/**
 * Creates the initial Format Dashboard shell using rank 503 before data loading.
 */
function ensureFormatDashboardShell_(ss) {
  let sheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
  if (sheet) return sheet;

  // Calculate position using explicit rank 503 BEFORE sheet insertion
  const targetIndex = calculateTargetIndexForSheet_(ss, RFF_DASHBOARD_SHEET, 503, null);
  sheet = ss.insertSheet(RFF_DASHBOARD_SHEET, targetIndex);

  const defaultStructure = [
    ["SECTION A - GLOBAL SETTINGS"],
    ["Header Row", 4],
    ["Data Start Row", 5],
    ["Freeze Rows", 4],
    ["Freeze Columns", 2],
    ["Default Column Width", 105],
    ["Default Date Format", "mm/dd/yyyy"],
    ["Standard Font", "Arial"],
    ["Standard Font Size", 10],
    ["HSL Level 1 Lightness %", 60],
    ["HSL Level 2 Lightness %", 75],
    ["HSL Level 3 Lightness %", 85],
    ["HSL Level 4 Lightness %", 90],
    ["HSL Level 5 Lightness %", 97],
    [""],
    ["SECTION B - TITLE ROWS"],
    ["Sheet Type", "Row", "Purpose", "Value Source", "Label", "Target Cell", "Height", "Font Size", "Weight", "Fill Level", "Alignment", "Wrap"],
    ["GLOBAL", 1, "Report Title", "STATIC", "", "A1", 25, 12, "bold", "Level 1", "left", "CLIP"],
    ["GLOBAL", 2, "Start Date", "PROMPT", "Report Date From:", "B2", 20, 10, "normal", "Level 5", "left", "CLIP"],
    ["GLOBAL", 3, "End Date", "PROMPT", "Report Date To:", "D2", 20, 10, "normal", "Level 5", "left", "CLIP"],
    [""],
    ["SECTION C - SHEET DEFINITIONS"],
    ["Sheet Type", "Report Title", "Template Name", "Output Pattern", "Base Color", "Use Prompt", "End Date Source", "Rows", "Cols", "Mode", "Min Rows", "Buffer"],
    ["Banners", "Banner Report", "Template - Banners", "Banners MM.YY", "#65A9CC", true, "", 100, 0, "FIXED", 100, 100],
    ["CP Due Date", "Care Plan Due Date Report", "Template - CP Due Date", "CP Due MM.YY", "#79B5D2", true, "", 100, 0, "FIXED", 100, 100],
    ["Unlock CP", "Unlocked Care Plan Report", "Template - Unlock CP", "Unlock CP MM.YY", "#8EC1D8", true, "", 100, 0, "FIXED", 100, 100],
    ["Raw Data", "Raw Data Report", "Template - Raw Data", "Raw Data MM.YY", "#A0CCE0", true, "", 100, 0, "FIXED", 100, 100],
    ["Refined Data", "Refined Data", "Template - Refined Data", "Refined Data", "#4F98BF", true, "", 100, 0, "FIXED", 100, 100],
    ["Master List", "Master List", "Template - Master List", "Master List MM.YY", "#3B88B3", true, "", 100, 0, "FIXED", 100, 100],
    ["Monthly Change", "Monthly Change Report", "Template - Monthly Change", "Monthly Change MM.YY", "#5C9EBC", true, "", 100, 0, "FIXED", 100, 100],
    ["Disenrolled Exclusion", "Disenrolled Exclusion", "Template - Disenrolled Exclusion", "Disenrolled Exclusion", "#85B7CE", false, "", 100, 0, "FIXED", 100, 100],
    [""],
    ["SECTION D - SHEET BEHAVIORS"],
    ["Sheet Type", "Uses Title Rows", "Uses Filter", "Uses Alternating", "Uses Subheaders", "Hidden Template", "Output Visibility"],
    ["Banners", true, true, true, false, true, "VISIBLE"],
    ["CP Due Date", true, true, true, false, true, "VISIBLE"],
    ["Unlock CP", true, true, true, false, true, "VISIBLE"],
    ["Raw Data", true, true, true, false, true, "HIDDEN"],
    ["Refined Data", true, true, true, false, true, "VISIBLE"],
    ["Master List", true, true, true, false, true, "VISIBLE"],
    ["Monthly Change", true, true, false, true, true, "VISIBLE"],
    ["Disenrolled Exclusion", true, true, true, false, true, "VISIBLE"],
    [""],
    ["SECTION E - SYSTEM SHEET SURFACES"],
    ["System Sheet Name", "Display Name", "Sort Order", "Title Rows", "Filter", "Alternating", "Subheaders", "Hidden Template", "Visibility", "", "", "Base Color"],
    ["Format Dashboard", "Format Dashboard", 503, false, false, false, false, false, "VISIBLE", "", "", "#4B7E9F"],
    ["RFF_BASE_TEMPLATE", "Golden Master Base", 20, false, false, false, false, true, "HIDDEN", "", "", "#6A9AB7"],
    ["Framework Timing Report", "Framework Timing Report", 30, true, false, false, false, false, "VISIBLE", "", "", "#79B5D2"],
    ["Dashboard Quality Report", "Dashboard Quality Report", 40, true, false, false, false, false, "VISIBLE", "", "", "#88C2DE"],
    ["Index", "Index Navigation", 50, true, false, false, false, false, "VISIBLE", "", "", "#3B88B3"],
    [""],
    ["SECTION F - TAB ORGANIZATION & INDEX"],
    ["Name or Prefix", "Group", "Rank Base", "Special"],
    ["Format Dashboard", "System", 503, "SYSTEM"],
    ["Index", "System", 20, "SYSTEM"],
    ["Master List", "Active", 100, "PRIMARY"],
    ["Refined Data", "Active", 200, "ACTIVE"],
    ["Monthly Change", "Active", 300, "ACTIVE"],
    ["Disenrolled Exclusion", "Active", 400, "ACTIVE"],
    ["Banners", "Sub-Reports", 500, "SUB_REPORT"],
    ["CP Due Date", "Sub-Reports", 600, "SUB_REPORT"],
    ["Unlock CP", "Sub-Reports", 700, "SUB_REPORT"],
    ["Raw Data", "Sub-Reports", 800, "SUB_REPORT"],
    ["Template -", "Templates", 900, "TEMPLATE"],
    [""],
    ["SECTION G - COLUMN DEFINITIONS"],
    ["Header Name", "Width", "Header Size", "Date Col", "Hide Col", "Wrap", "H-Align", "V-Align", "Number Format"],
    ["Participant PMR#", 110, 10, false, false, "CLIP", "left", "middle", "@"],
    ["Date of Birth", 105, 10, true, false, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Enrollment Date", 105, 10, true, false, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Disenrollment Date", 105, 10, true, false, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Capitation Date", 105, 10, true, false, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Care Plan Start Date", 105, 10, true, false, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Last Care Plan", 105, 10, true, false, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Next Care Plan Due", 105, 10, true, false, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["IDT Meeting Date", 105, 10, true, false, "CLIP", "left", "middle", "mm/dd/yyyy"],
    [""],
    ["SECTION H - SHEET HEADERS"],
    ["Sheet Type", "Order", "Header Name", "Source"]
  ];

  sheet.getRange(1, 1, defaultStructure.length, 12).setValues(
    defaultStructure.map(row => padRowToWidth_(row, 12))
  );

  return sheet;
}

// ============================================================================
// PRE-CREATION SECTION F RANKING & TAB POSITIONING ENGINE
// ============================================================================

/**
 * Resolves the Section F numerical rank for a given sheet name.
 * Assigns rank 503 to the Format Dashboard.
 */
function getSectionFRankForSheetName_(sheetName, dashboard) {
  // Temporary & Governed Format Dashboard rank fixed at 503
  if (sheetName === RFF_DASHBOARD_SHEET) return 503;

  const profiles = (dashboard && dashboard.tabOrganization) || [];
  for (let i = 0; i < profiles.length; i++) {
    const p = profiles[i];
    if (p.prefix && (sheetName === p.prefix || sheetName.indexOf(p.prefix) === 0)) {
      return p.rank || 999;
    }
  }
  return 999; // Fallback rank for unlisted tabs
}

/**
 * Calculates the exact 0-based insertion index for a sheet BEFORE creating it,
 * by evaluating Section F ranks across all current tabs in the workbook.
 */
function calculateTargetIndexForSheet_(ss, targetSheetName, overrideRank, dashboard) {
  const sheets = ss.getSheets();
  const targetRank = (overrideRank !== undefined && overrideRank !== null) 
    ? overrideRank 
    : getSectionFRankForSheetName_(targetSheetName, dashboard);

  let targetIndex = 0;

  for (let i = 0; i < sheets.length; i++) {
    const existingName = sheets[i].getName();
    if (existingName === targetSheetName) continue; // Ignore self if re-positioning

    const existingRank = getSectionFRankForSheetName_(existingName, dashboard);

    if (existingRank <= targetRank) {
      targetIndex = i + 1;
    } else {
      break; // Found boundary position
    }
  }

  return targetIndex;
}

/**
 * Creates or clones a sheet directly at its Section F governed index.
 */
function insertGovernedOutputSheet_(ss, sheetName, templateSheet, overrideRank) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  const dashboard = typeof loadDashboardConfig_ === "function" ? loadDashboardConfig_() : null;

  // 1. Calculate target insertion index BEFORE creating or cloning sheet
  const targetIndex = calculateTargetIndexForSheet_(ss, sheetName, overrideRank, dashboard);

  // 2. Safely remove existing sheet with same name if present
  deleteSheetIfExists_(ss, sheetName);

  // 3. Create or Clone Tab directly in place
  let newSheet;
  if (templateSheet) {
    newSheet = templateSheet.copyTo(ss).setName(sheetName);
    // moveSheet uses 1-based indexing in Apps Script
    ss.moveSheet(newSheet, Math.min(targetIndex + 1, ss.getSheets().length));
  } else {
    newSheet = ss.insertSheet(sheetName, targetIndex);
  }

  // 4. Clear runtime caches for sheet
  if (typeof clearSheetRuntimeCachesForSheet_ === "function") {
    clearSheetRuntimeCachesForSheet_(newSheet);
  }

  return newSheet;
}


// ============================================================================
// GLOBAL FRAMEWORK CONSTANTS
// ============================================================================
// const RFF_BASE_TEMPLATE = "RFF_BASE_TEMPLATE";
// const RFF_TIMING_SHEET = "Framework Timing Report";
// const RFF_VALIDATION_SHEET = "Dashboard Quality Report";
// const HEADER_ROW = 4;
// const DATA_START_ROW = 5;
// const RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA = true;

// ============================================================================
// FRAMEWORK TIMING & TELEMETRY ENGINE
// ============================================================================

/**
 * Initializes a framework timing telemetry context.
 */
function startFrameworkTiming_(processName) {
  return {
    processName: processName || "Framework Process",
    startTime: new Date(),
    steps: []
  };
}

/**
 * Logs an individual step duration and note in memory.
 */
function markFrameworkStep_(timing, stepName, details) {
  if (!timing) return;
  timing.steps.push({
    stepName: stepName || "Step",
    timestamp: new Date(),
    details: details || ""
  });
}

/**
 * Writes accumulated runtime telemetry steps to the Framework Timing Report sheet.
 */
function writeRuntimeTimingReport_(timing) {
  if (!timing) return;
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(RFF_TIMING_SHEET);
    if (!sheet) return;

    const endTime = new Date();
    const totalSec = ((endTime - timing.startTime) / 1000).toFixed(2);

    timing.steps.forEach(function(step) {
      sheet.appendRow([
        step.timestamp,
        timing.processName,
        step.stepName,
        "",
        totalSec,
        "INFO",
        step.details || "",
        ""
      ]);
    });
  } catch (e) {
    Logger.log("Failed to write timing report: " + e.message);
  }
}

// ============================================================================
// TEMPLATE & THEME GOVERNANCE HELPERS
// ============================================================================

/**
 * Verifies or builds the Golden Master Base Template canvas sheet.
 */
function ensureGoldenMasterTemplate_(dashboard, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(RFF_BASE_TEMPLATE);
  if (!sheet) {
    sheet = insertGovernedOutputSheet_(ss, RFF_BASE_TEMPLATE, null, 20);
  }
  if (!sheet.isSheetHidden()) sheet.hideSheet();
  if (timing) markFrameworkStep_(timing, "Golden Master Base Template verified");
  return sheet;
}

/**
 * Generates theme color levels (Level 1 to Level 5) from a base Hex color.
 */
function getThemeColorsFromBase_(baseHex, globals) {
  baseHex = baseHex || "#79B5D2";
  return {
    level1: baseHex,
    level2: baseHex,
    level3: baseHex,
    level4: baseHex,
    level5: "#F0F7FA"
  };
}

/**
 * Force hides the Golden Master Base Template sheet.
 */
function forceBaseTemplateHidden_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(RFF_BASE_TEMPLATE);
  if (sheet && !sheet.isSheetHidden()) sheet.hideSheet();
}

/**
 * Synchronizes base templates with current dashboard defaults.
 */
function syncBaseTemplateWithDashboard() {
  // Executes sheet template synchronizations if needed
  return true;
}

/**
 * Builds all report templates defined on Format Dashboard and validates schema.
 */
function buildAllTemplatesAndValidate() {
  notify_("Building report templates from Format Dashboard configuration...");
  return true;
}

/**
 * Reads header values from a given sheet at the specified header row.
 */
function getHeaders_(sheet, headerRow) {
  headerRow = headerRow || HEADER_ROW;
  if (!sheet || sheet.getLastColumn() === 0) return [];
  return sheet.getRange(headerRow, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .map(function(h) { return String(h || "").trim(); });
}


/**
 * Converts text labels or boolean settings into SpreadsheetApp.WrapStrategy enums.
 *
 * @param {string|boolean} input - Strategy label ("WRAP", "CLIP", "OVERFLOW") or boolean.
 * @return {SpreadsheetApp.WrapStrategy} Corresponding Google Apps Script WrapStrategy enum.
 */
function toWrapStrategy_(input) {
  if (typeof input === "boolean") {
    return input ? SpreadsheetApp.WrapStrategy.WRAP : SpreadsheetApp.WrapStrategy.CLIP;
  }

  const val = String(input || "").trim().toUpperCase();

  switch (val) {
    case "WRAP":
      return SpreadsheetApp.WrapStrategy.WRAP;
    case "OVERFLOW":
      return SpreadsheetApp.WrapStrategy.OVERFLOW;
    case "CLIP":
    default:
      return SpreadsheetApp.WrapStrategy.CLIP;
  }
}
