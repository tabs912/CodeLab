// ============================================================================
// 3_CORE_HELPERS.GS
// Data Parsers, PMR Normalizers, Sheet Lookups, & Tab Visibility Management
// ============================================================================

// ============================================================================
// DATA MATRIX READERS & NORMALIZERS
// ============================================================================

/**
 * Reads a sheet range from headerRow and dataStartRow into a values array and headerMap.
 */
function getDataValues_(sheet, headerRow = HEADER_ROW, dataStartRow = DATA_START_ROW) {
  if (!sheet) return { headers: [], headerMap: {}, values: [] };

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow < headerRow || lastCol < 1) return { headers: [], headerMap: {}, values: [] };

  const headers = sheet.getRange(headerRow, 1, 1, lastCol).getValues()[0].map(h => String(h || "").trim());
  const headerMap = {};
  headers.forEach((h, idx) => {
    if (h && headerMap[h] === undefined) headerMap[h] = idx;
  });

  if (lastRow < dataStartRow) {
    return { headers: headers, headerMap: headerMap, values: [] };
  }

  const values = sheet.getRange(dataStartRow, 1, lastRow - dataStartRow + 1, lastCol).getValues();
  return { headers: headers, headerMap: headerMap, values: values };
}

/**
 * Locates PMR column index in a headerMap.
 */
function getPMRIndex_(headerMap) {
  if (headerMap["Participant PMR#"] !== undefined) return headerMap["Participant PMR#"];
  if (headerMap["PMR #"] !== undefined) return headerMap["PMR #"];
  if (headerMap["PMR"] !== undefined) return headerMap["PMR"];
  return -1;
}

/**
 * Standardizes PMR numbers by stripping non-alphanumeric noise.
 */
function normalizePMR_(val) {
  if (val === null || val === undefined) return "";
  return String(val).trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

/**
 * Normalizes text string keys for map lookups.
 */
function normalizeKeyPart_(val) {
  if (val === null || val === undefined) return "";
  return String(val).trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Checks if a cell value represents a Primary PMR flag.
 */
function isPrimaryPMRRowValue_(val) {
  const str = String(val || "").trim().toUpperCase();
  return str === "YES" || str === "TRUE" || str === "Y" || str === "PRIMARY";
}

/**
 * Checks if a header name represents a date column.
 */
function isDateLikeHeader_(headerName) {
  const str = String(headerName || "").toLowerCase();
  return str.includes("date") || str.includes("at") || str.includes("month") || str.includes("created") || str.includes("due");
}

/**
 * Safely converts mixed cell values to JavaScript Date objects.
 */
function normalizeToDateObject_(val) {
  if (!val) return null;
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
  const parsed = new Date(val);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Builds composite-key lookup maps from source import sheets (PMR + Names).
 */
function buildSourceMapByCompositeKeyForDemoPBanner_(sheet, headerRow, dataStartRow, keyHeaders) {
  const map = new Map();
  const data = getDataValues_(sheet, headerRow, dataStartRow);
  if (!data.values.length) return map;

  const keyIndices = keyHeaders.map(h => data.headerMap[h]);
  if (keyIndices.some(idx => idx === undefined)) return map;

  data.values.forEach(row => {
    const keyParts = keyIndices.map(idx => normalizeKeyPart_(row[idx]));
    const key = keyParts.join("|||");

    const rowObj = {};
    data.headers.forEach((h, idx) => {
      rowObj[h] = row[idx];
    });

    if (key && !map.has(key)) {
      map.set(key, rowObj);
    }
  });

  return map;
}

// ============================================================================
// SHEET FINDERS & MONTH DATE HELPERS
// ============================================================================

/**
 * Returns month parts object from a Date instance.
 */
function getMonthDateParts_(dateObj) {
  const d = dateObj || new Date();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const mm = String(month).padStart(2, "0");
  const yy = String(year).slice(-2);
  return { month: month, year: year, mm: mm, yy: yy, label: `${mm}.${yy}` };
}

/**
 * Locates current active sheet matching a prefix and month format.
 */
function getLatestSheetByPrefix_(prefix) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  let match = null;

  for (let i = 0; i < sheets.length; i++) {
    const name = sheets[i].getName();
    if (name.indexOf(prefix) === 0 && name.indexOf("Template - ") === -1 && name.indexOf("Source - ") === -1) {
      match = sheets[i];
      break;
    }
  }
  return match;
}

function getCurrentRawDataSheet_(monthParts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(`Raw Data ${monthParts.mm}.${monthParts.yy}`) || getLatestSheetByPrefix_("Raw Data");
}

function getCurrentBannersSheet_(monthParts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(`Banners ${monthParts.mm}.${monthParts.yy}`) || getLatestSheetByPrefix_("Banners") || ss.getSheetByName("Banners");
}

function getCurrentCarePlanDueSheet_(monthParts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(`CP Due ${monthParts.mm}.${monthParts.yy}`) || getLatestSheetByPrefix_("CP Due");
}

function getCurrentUnlockedCarePlanSheet_(monthParts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(`Unlock CP ${monthParts.mm}.${monthParts.yy}`) || getLatestSheetByPrefix_("Unlock CP");
}

// ============================================================================
// VISIBILITY & TAB ORGANIZATION
// ============================================================================

/**
 * Orders workbook tabs based on Section F on Default - Format Dashboard.
 */
function enforceGlobalSheetSortOrder() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const config = loadDashboardConfig_();
  if (!config || !config.tabOrganization) return;

  const sheets = ss.getSheets();
  const sheetMap = {};
  sheets.forEach(s => { sheetMap[s.getName()] = s; });

  let targetIndex = 0;
  config.tabOrganization.forEach(item => {
    const sheet = sheetMap[item.name];
    if (sheet) {
      ss.setActiveSheet(sheet);
      ss.moveActiveTab(++targetIndex);
    }
  });
}

function hideSystemSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  SYSTEM_SHEETS_TO_HIDE.forEach(name => {
    const s = ss.getSheetByName(name);
    if (s && !s.isSheetHidden()) s.hideSheet();
  });
}

function showSystemSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  SYSTEM_SHEETS_TO_HIDE.forEach(name => {
    const s = ss.getSheetByName(name);
    if (s && s.isSheetHidden()) s.showSheet();
  });
}

function hideReportTemplates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheets().forEach(s => {
    if (s.getName().indexOf("Template - ") === 0 || s.getName() === "RFF_BASE_TEMPLATE") {
      if (!s.isSheetHidden()) s.hideSheet();
    }
  });
}

function showReportTemplates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheets().forEach(s => {
    if (s.getName().indexOf("Template - ") === 0 || s.getName() === "RFF_BASE_TEMPLATE") {
      if (s.isSheetHidden()) s.showSheet();
    }
  });
}

function forceBaseTemplateHidden_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const base = ss.getSheetByName("RFF_BASE_TEMPLATE");
  if (base && !base.isSheetHidden()) base.hideSheet();
}

function runDeferredIndexRefreshIfNeeded_() {
  try {
    updateIndexSheet("Template - Index");
  } catch (e) {
    Logger.log("Index deferred refresh note: " + e.message);
  }
}
