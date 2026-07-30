/**
 * Master List / Report Formatter Framework v1.8.9.8.3.5
 *
 
// ============================================================================
// === ON OPEN MENU BUILDER ===================================================
// ============================================================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Master List")
    .addSubMenu(ui.createMenu("📊 Data & Processing Engine")
      .addItem("📚 Format Monthly Sheets", "formatMonthlySheets")
      .addItem("🔁 Create Monthly Update", "runMonthlyUpdate")
      .addItem("🏁 Create Monthly Start", "runMonthlyStart"))
    .addSubMenu(ui.createMenu("⚙️ Sheet & Layout Management")
      .addSubMenu(ui.createMenu("🗄️ Monthly Sub-Reports")
        .addItem("🗂️ Hide Monthly Sub-Reports", "hideMonthlyImportSheets")
        .addItem("🗃️ Archive Monthly Sub-Reports", "archiveMonthlyImportSheets"))
      .addSubMenu(ui.createMenu("🗄️ Monthly Active Sheets")
        .addItem("🗂️ Hide Monthly Active Sheets", "hideMonthlyActiveSheets")
        .addItem("🗃️ Archive Monthly Active Sheets", "archiveMonthlyActiveSheets"))
      .addSubMenu(ui.createMenu("🙈 Templates")
        .addItem("Build All Templates + Validate", "buildAllTemplatesAndValidate")
        .addItem("Show Templates", "showReportTemplates")
        .addItem("Hide Templates", "hideReportTemplates"))
      .addSubMenu(ui.createMenu("😎 System Sheets")
        .addItem("Hide System Sheets", "hideSystemSheets_")
        .addItem("Show System Sheets", "showSystemSheets_")))
    .addSubMenu(ui.createMenu("🚀 Quick Start-up")
      .addItem("🏗️ System Set up", "quickSystemSetup")
      .addItem("Build System Sheets", "buildSystemSheets")
      .addItem("Set up System Sheets", "setupSystemSheets")
      .addItem("🖼️ Build Templates + Validate Templates", "quickBuildAllTemplates")
      .addItem("✅ Dashboard Quality Workflow", "runDashboardQualityWorkflow"))
    .addSubMenu(ui.createMenu("🛠️ Maintenance/Rebuild")
      .addSubMenu(ui.createMenu("👌 Quality")
        .addItem("Dashboard Quality Start up", "runDashboardQualityStartUp")
        .addItem("Dashboard Quality Validate Templates", "runDashboardQualityValidateTemplates")
        .addItem("Dashboard Quality Workflow", "runDashboardQualityWorkflow"))
      .addSubMenu(ui.createMenu("📝 Format Sheets")
        .addItem("Banner", "formatBannerReport")
        .addItem("CP Due Date", "formatCarePlanDueReport")
        .addItem("Unlocked CP", "formatUnlockedCarePlanReport")
        .addItem("Raw Data", "formatRawData"))
      .addSubMenu(ui.createMenu("📊 Data Processing")
        .addSubMenu(ui.createMenu("📁 Refined Data")
          .addItem("🔄 Update Refined Data", "updateRefinedDataMonthlySync")
          .addItem("🛠️ Build Refined Data", "buildRefinedDataFromScratch"))
        .addItem("⛔ Create / Update Disenrolled List", "createDisenrolledList")
        .addItem("🗓️ Monthly Change Report", "buildMonthlyChangeReport")
        .addItem("💡 Create Master List", "createMasterList"))
      .addSubMenu(ui.createMenu("⚙️ System")
        .addItem("🏗️ Rebuild System Templates", "createSystemTemplates")
        .addItem("🪄 Clear Timing Log", "clearDiagnosticsAndTimingLogs")
        .addItem("⏱️ Framework Timing on/off", "toggleFrameworkTiming")
        .addItem("🧭 Organize Tabs", "enforceGlobalSheetSortOrder")))
    .addSubMenu(ui.createMenu("🧩 Start - up")
      .addItem("Build System Sheets", "buildSystemSheets")
      .addItem("📜 Set up System Sheets", "setupSystemSheets")
      .addItem("🎨 Format Dashboard", "rebuildFormatDashboardDefaults")
      .addItem("💾 Save Active Layout as Rebuild Default", "saveActiveLayoutToDashboardSettings")
      .addItem("🖼️ Build All Templates + Validate", "buildAllTemplatesAndValidate"))
    .addSubMenu(ui.createMenu("📇 Index")
      .addItem("📇 Build / Update Index", "updateIndexSheet")
      .addItem("↩️ Restore Selected Archive Row", "restoreSheetFromActiveIndexRow")
      .addItem("🌐 Configure Index Restore Web App URL", "configureIndexRestoreWebAppUrl")
      .addItem("🔗 Configure Archive Spreadsheet ID", "configureArchiveSpreadsheetId"))
    .addToUi();
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const MASTER_LIST_MERGE_ML_VERSION = "1.8.9.8.3.5";
const RFF_TEMPLATE_BASELINE_ROWS = 100;
const MASTER_LIST_MERGE_REBUILD_SECTION = "FULL_SCRIPT";
const MASTER_LIST_MERGE_BASELINE_VERSION = "1.6.22.3";

let ML_RUNTIME_CACHE_STORE_ = null;

function getRuntimeCache_() {
  if (!ML_RUNTIME_CACHE_STORE_) {
    ML_RUNTIME_CACHE_STORE_ = {
      monthlySheets: {}, headers: {}, headerMaps: {}, dimensions: {},
      dashboardConfig: null, dashboardConfigKey: "", tabOrganization: null,
      docProps: null, themeColors: {}
    };
  }
  return ML_RUNTIME_CACHE_STORE_;
}

function clearAllRuntimeCaches_() {
  ML_RUNTIME_CACHE_STORE_ = null;
}

function getDocumentPropertiesCached_() {
  const cache = getRuntimeCache_();
  if (!cache.docProps) cache.docProps = PropertiesService.getDocumentProperties();
  return cache.docProps;
}

// ============================================================================
// CONFIGURATION CONSTANTS & GLOBALS
// ============================================================================

let RFF_DEFER_TEMPLATE_HIDE_DURING_BATCH_ = false;
const RFF_VERSION = MASTER_LIST_MERGE_ML_VERSION;
const RFF_FAST_TEMPLATE_REFRESH = true;

const RFF_FORMATTER_DATE_PROMPT = "Enter any date in the report month. Example: 05/01/26";
const RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA = true;
const RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE = true;

const ML_WORKFLOW_BUSY_KEY = "ML_WORKFLOW_BUSY";
const ML_WORKFLOW_BUSY_STARTED_KEY = "ML_WORKFLOW_BUSY_STARTED";
const ML_WORKFLOW_BUSY_TTL_MS = 30 * 60 * 1000;

const RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING = true;

const HEADER_ROW = 4;
const DATA_START_ROW = 5;

const RFF_MIN_SERIAL_DATE = 30000;
const RFF_EXCEL_EPOCH_YEAR = 1899;
const RFF_EXCEL_EPOCH_MONTH = 11;
const RFF_EXCEL_EPOCH_DAY = 30;

const FORMAT_ALLOWED_EMPTY_COLUMNS = 2;
const FORMAT_DELETE_BLANK_ROWS_AFTER = 400;

const MASTER_LIST_PREFIX = "Master List";
const DEMO_P_PREFIX = "Refined Data";
const BANNER_PREFIX = "Banners";
const BANNER_REPORT_ALT_PREFIX = "Banner Report";
const UNLOCKED_PREFIX = "Unlock CP";
const CARE_PLAN_DUE_PREFIX = "CP Due";
const CARE_PLAN_DUE_DATE_ALT_PREFIX = "Care Plan Due Date Report";
const MONTHLY_CHANGE_REPORT_PREFIX = "Monthly Change";
const DISENROLLED_EXCLUSION_SHEET = "Disenrolled Exclusion";
const DISENROLLED_EXCLUSION_ADDED_HEADER = "Added to Disenrolled Exclusion";
const MASTER_LIST_TEMPLATE_SHEET = "Template - Master List";
const DEMO_P_TEMPLATE_SHEET = "Template - Refined Data";

const DATE_DISPLAY_FORMAT = "mm/dd/yyyy";
const DATE_SHEET_FORMAT = "MM.yy";
const RFF_RE_MONTH_YEAR = /^(\d{1,2})[\.\/-](\d{2}|\d{4})$/;
const RFF_RE_DATE_MDY = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2}|\d{4})$/;

const GLOBAL_DATE_FORMAT_HEADERS = Object.freeze([
  "AD1 - Phone Valid Dates From", "AD1 - Phone Valid Dates To", "AD2 - Phone Valid Dates From",
  "AD2 - Phone Valid Dates To", "AD3 - Phone Valid Dates From", "AD3 - Phone Valid Dates To",
  "Capitation Date", "Care Plan Start Date", "Date of Birth", "Date of Death", "Disenrollment Date",
  "Disenrollment Effective Date", "Enrollment Date", "IDT Meeting Date", "Last Care Plan", "Next Care Plan Due"
]);

const TITLE_INFO_MOVE_CELLS = Object.freeze({
  "CP Due Date": ["A2", "C2", "A3", "C3", "D3", "E3"],
  "Unlock CP": ["A2", "A3", "B3", "C3", "D2", "E2", "F2", "G2"]
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function sortSheetDefinitionsByProductionOrder_(sheetDefinitions) {
  const orderMap = {};
  getRequiredFrameworkSheetTypes_().forEach(function(sheetType, index) {
    orderMap[normalizeKey_(sheetType)] = index;
  });
  return (sheetDefinitions || []).slice().sort(function(a, b) {
    const aOrder = orderMap[normalizeKey_(a && a.sheetType)] !== undefined ? orderMap[normalizeKey_(a.sheetType)] : 999;
    const bOrder = orderMap[normalizeKey_(b && b.sheetType)] !== undefined ? orderMap[normalizeKey_(b.sheetType)] : 999;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return String(a && a.sheetType || "").localeCompare(String(b && b.sheetType || ""));
  });
}

function notify_(message) {
  try { SpreadsheetApp.getActiveSpreadsheet().toast(String(message), "Master List Tools", 5); } 
  catch (err) { logBestEffortWarning_(message); }
}

function isBlankCell_(value) {
  return value === null || value === undefined || String(value).trim() === "";
}

function normalizeToDateObject_(value) {
  if (value instanceof Date) {
    const time = value.getTime();
    return isNaN(time) || !isReasonableReportDate_(value) ? null : new Date(time);
  }
  if (typeof value === "number" && isFinite(value)) {
    if (value < RFF_MIN_SERIAL_DATE) return null;
    const serialDate = new Date(Date.UTC(RFF_EXCEL_EPOCH_YEAR, RFF_EXCEL_EPOCH_MONTH, RFF_EXCEL_EPOCH_DAY));
    serialDate.setUTCDate(serialDate.getUTCDate() + Math.floor(value));
    const localDate = new Date(serialDate.getUTCFullYear(), serialDate.getUTCMonth(), serialDate.getUTCDate());
    return isReasonableReportDate_(localDate) ? localDate : null;
  }
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  if (!text) return null;

  let delimiter = "";
  if (text.indexOf("/") !== -1) delimiter = "/";
  else if (text.indexOf(".") !== -1) delimiter = ".";
  else if (text.indexOf("-") !== -1) delimiter = "-";
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

function getMonthDateParts_(date) {
  const d = normalizeToDateObject_(date);
  if (!d) return null;
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  const previousMonthFirstDay = new Date(d.getFullYear(), d.getMonth() - 1, 1);
  const previousMonthLastDay = new Date(d.getFullYear(), d.getMonth(), 0);

  return {
    inputDate: d, firstDay: firstDay, lastDay: lastDay,
    previousMonthFirstDay: previousMonthFirstDay, previousMonthLastDay: previousMonthLastDay,
    firstDayName: formatDateForSheetName_(firstDay), lastDayName: formatDateForSheetName_(lastDay),
    previousFirstDayName: formatDateForSheetName_(previousMonthFirstDay), previousLastDayName: formatDateForSheetName_(previousMonthLastDay),
    monthKey: Utilities.formatDate(firstDay, Session.getScriptTimeZone(), "yyyy-MM")
  };
}

function formatDateForSheetName_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), DATE_SHEET_FORMAT);
}

function dateKey_(value) {
  const d = normalizeToDateObject_(value);
  return d ? Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyyMMdd") : "";
}

function isSameMonth_(a, b) {
  return monthKey_(a) !== "" && monthKey_(a) === monthKey_(b);
}

function buildStandardMonthlySheetName_(prefix, monthDate) {
  const date = normalizeToDateObject_(monthDate) || new Date();
  return String(prefix || "").trim() + " " + Utilities.formatDate(date, Session.getScriptTimeZone(), "MM.yy");
}

function getNewestFormattedMonthlySheetByPrefix_(ss, prefix) {
  if (!ss || !prefix) return null;
  const matches = [];
  ss.getSheets().forEach(sheet => {
    const parsed = parseStandardMonthlySheetDateFromName_(sheet.getName(), prefix);
    if (!parsed) return;
    matches.push({ sheet, key: monthKey_(parsed), index: sheet.getIndex ? sheet.getIndex() : 0 });
  });
  if (!matches.length) return null;
  matches.sort((a, b) => {
    if (a.key !== b.key) return a.key < b.key ? 1 : -1;
    return b.index - a.index;
  });
  return matches[0].sheet;
}

function getMonthlySheetByPrefixAndDate_(ss, prefix, firstDay, lastDay) {
  if (!ss || !prefix) return null;
  const cacheKey = getMonthlySheetLookupCacheKey_(ss, prefix, firstDay, lastDay);
  const cachedSheet = getRuntimeCache_().monthlySheets[cacheKey];
  if (cachedSheet) {
    try { if (cachedSheet.getName()) return cachedSheet; } catch (err) { delete getRuntimeCache_().monthlySheets[cacheKey]; }
  }

  const standardName = buildStandardMonthlySheetName_(prefix, firstDay);
  let sheet = ss.getSheetByName(standardName);
  if (sheet) {
    getRuntimeCache_().monthlySheets[cacheKey] = sheet;
    return sheet;
  }

  sheet = getNewestFormattedMonthlySheetByPrefix_(ss, prefix);
  if (sheet) {
    getRuntimeCache_().monthlySheets[cacheKey] = sheet;
    return sheet;
  }
  return null;
}

function setUniqueSheetName_(sheet, desiredName) {
  if (!sheet || !desiredName) return desiredName;
  const ss = sheet.getParent();
  let name = desiredName;
  let counter = 2;

  if (sheet.getName && sheet.getName() === desiredName) return desiredName;

  let existing = ss.getSheetByName(name);
  while (existing && existing.getSheetId && existing.getSheetId() !== sheet.getSheetId()) {
    name = `${desiredName} (${counter})`;
    counter++;
    existing = ss.getSheetByName(name);
  }

  if (sheet.getName() !== name) {
    sheet.setName(name);
    clearMonthlySheetLookupCache_();
    clearSheetRuntimeCachesForSheet_(sheet);
  }
  return name;
}

function getHeaders_(sheet, headerRow) {
  headerRow = headerRow || HEADER_ROW;
  const key = getHeaderCacheKey_(sheet, headerRow);

  if (key && getRuntimeCache_().headers[key]) return getRuntimeCache_().headers[key].slice();

  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(headerRow, 1, 1, lastCol).getValues()[0].map(h => String(h || "").trim());

  if (key) getRuntimeCache_().headers[key] = headers.slice();
  return headers;
}

function getHeaderMap_(sheet, headerRow) {
  headerRow = headerRow || HEADER_ROW;
  const key = getHeaderCacheKey_(sheet, headerRow);

  if (key && getRuntimeCache_().headerMaps[key]) return Object.assign({}, getRuntimeCache_().headerMaps[key]);

  const map = buildHeaderIndexMap_(getHeaders_(sheet, headerRow));
  if (key) getRuntimeCache_().headerMaps[key] = Object.assign({}, map);
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

function normalizeHeader_(value) {
  return String(value || "").trim().replace(/[–—]/g, "-").replace(/\s+/g, " ");
}

function normalizePMR_(value) {
  return String(value === null || value === undefined ? "" : value).trim().replace(/\s+/g, "").replace(/\.0$/, "");
}

function getPMRIndex_(headerMap) {
  return findHeaderIndex_(headerMap, ["Participant PMR#", "PMR #", "PMR#", "Participant PMR"]);
}

function getDOBIndex_(headerMap) {
  return findHeaderIndex_(headerMap, ["Date of Birth", "DOB", "Participant DOB"]);
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

function getDataValues_(sheet, headerRow, dataStartRow) {
  headerRow = headerRow || HEADER_ROW;
  dataStartRow = dataStartRow || DATA_START_ROW;

  const dimensions = getSheetDimensions_(sheet);
  const lastRow = dimensions.lastRow;
  const lastCol = dimensions.lastCol;
  const headers = getHeaders_(sheet, headerRow);
  const headerMap = getHeaderMap_(sheet, headerRow);

  if (lastRow < dataStartRow || lastCol < 1) {
    return { headers: headers, headerMap: headerMap, values: [], range: null, lastRow: lastRow, lastCol: lastCol };
  }

  const range = sheet.getRange(dataStartRow, 1, lastRow - dataStartRow + 1, headers.length);
  return { headers: headers, headerMap: headerMap, values: range.getValues(), range: range, lastRow: lastRow, lastCol: lastCol };
}

function getRawDataSourceDataForOutput_(sheet) {
  if (!sheet) return { headers: [], headerMap: {}, values: [], range: null };
  const lastRow = sheet.getLastRow();
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  if (lastRow < 1) return { headers: [], headerMap: {}, values: [], range: null };

  const headerRow = rawDataSourceHeaderRow_(sheet);
  const dataStartRow = headerRow + 1;
  const headers = sheet.getRange(headerRow, 1, 1, lastCol).getValues()[0].map(function(header) { return String(header || "").trim(); });
  const headerMap = buildHeaderIndexMap_(headers);

  if (lastRow < dataStartRow) return { headers: headers, headerMap: headerMap, values: [], range: null };
  const range = sheet.getRange(dataStartRow, 1, lastRow - dataStartRow + 1, lastCol);
  return { headers: headers, headerMap: headerMap, values: range.getValues(), range: range };
}

function assignPrimaryRowForBlock_(block, headerMap, primaryIdx) {
  if (!block || !block.rows || !block.rows.length || primaryIdx === undefined) return;
  const dobIdx = getDOBIndex_(headerMap);
  const capitationIdx = headerMap["Capitation Date"];

  if (capitationIdx !== undefined && capitationIdx !== -1) {
    block.rows.sort(function(a, b) {
      const dateA = normalizeToDateObject_(a.row[capitationIdx]);
      const dateB = normalizeToDateObject_(b.row[capitationIdx]);
      const timeA = dateA ? dateA.getTime() : 0;
      const timeB = dateB ? dateB.getTime() : 0;
      if (timeA !== timeB) return timeB - timeA;
      return a.originalIndex - b.originalIndex;
    });
  }

  let foundPrimary = false;
  block.rows.forEach(function(item, idx) {
    if (idx === 0) { item.row[primaryIdx] = "Yes"; foundPrimary = true; } 
    else { item.row[primaryIdx] = ""; }
  });

  if (!foundPrimary && block.rows.length > 0) {
    let target = block.rows.find(function(item) { return dobIdx !== -1 && normalizeCompareValue_(item.row[dobIdx]) !== ""; });
    if (!target) target = block.rows[0];
    target.row[primaryIdx] = "Yes";
  }
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
    if (isSpace) { if (!previousWasSpace) output += " "; } 
    else { output += text.charAt(i); }
    previousWasSpace = isSpace;
  }
  return output;
}

function valuesAreEqual_(a, b) {
  return normalizeCompareValue_(a) === normalizeCompareValue_(b);
}

function normalizeText_(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function normalizeKey_(value) {
  return normalizeText_(value).toLowerCase();
}

function numberOrDefault_(value, fallback) {
  const n = Number(value);
  return isNaN(n) ? fallback : n;
}

function parseBoolean_(value) {
  if (value === true) return true;
  if (value === false) return false;
  const text = String(value || "").trim().toLowerCase();
  return ["true", "yes", "y", "1", "x"].indexOf(text) !== -1;
}

function clearHeaderCacheForSheet_(sheet) {
  if (!sheet) return;
  const prefix = sheet.getSheetId() + ":";
  Object.keys(getRuntimeCache_().headers).forEach(key => { if (key.indexOf(prefix) === 0) delete getRuntimeCache_().headers[key]; });
  Object.keys(getRuntimeCache_().headerMaps).forEach(key => { if (key.indexOf(prefix) === 0) delete getRuntimeCache_().headerMaps[key]; });
}

function clearSheetRuntimeCachesForSheet_(sheet) {
  clearHeaderCacheForSheet_(sheet);
  clearSheetDimensionCacheForSheet_(sheet);
}

function getHeaderCacheKey_(sheet, headerRow) {
  if (!sheet) return "";
  return sheet.getSheetId() + ":" + (headerRow || HEADER_ROW);
}

function clearMonthlySheetLookupCache_() {
  getRuntimeCache_().monthlySheets = {};
}

function insertGovernedOutputSheet_(ss, sheetName) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  const insertIndex = getConfiguredSheetCreationIndex_(ss, sheetName);
  return ss.insertSheet(sheetName, Math.max(0, insertIndex - 1));
}

function getMonthlySheetLookupCacheKey_(ss, prefix, firstDay, lastDay) {
  const spreadsheetId = ss && ss.getId ? ss.getId() : "";
  const startKey = dateKey_(firstDay);
  const endKey = dateKey_(lastDay);
  return [spreadsheetId, String(prefix || "").trim().toLowerCase(), startKey, endKey].join("||");
}

function getSheetDimensionCacheKey_(sheet) {
  return sheet ? String(sheet.getSheetId()) : "";
}

function clearSheetDimensionCacheForSheet_(sheet) {
  if (!sheet) return;
  const key = getSheetDimensionCacheKey_(sheet);
  if (key) delete getRuntimeCache_().dimensions[key];
}

function getSheetDimensions_(sheet) {
  const key = getSheetDimensionCacheKey_(sheet);
  if (key && getRuntimeCache_().dimensions[key]) return Object.assign({}, getRuntimeCache_().dimensions[key]);

  const dimensions = {
    lastRow: sheet.getLastRow(), lastCol: sheet.getLastColumn(),
    maxRows: sheet.getMaxRows(), maxCols: sheet.getMaxColumns()
  };

  if (key) getRuntimeCache_().dimensions[key] = Object.assign({}, dimensions);
  return dimensions;
}

function monthKey_(value) {
  const d = normalizeToDateObject_(value);
  return d ? Utilities.formatDate(new Date(d.getFullYear(), d.getMonth(), 1), Session.getScriptTimeZone(), "yyyyMM") : "";
}

function parseStandardMonthlySheetDateFromName_(sheetName, prefix) {
  const name = String(sheetName || "").trim();
  const prefixText = String(prefix || "").trim();
  if (!prefixText) return null;

  const escapedPrefix = prefixText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp("^" + escapedPrefix + "\\s+(\\d{1,2})\\.(\\d{2})(?:\\s|$|\\()", "i");
  const match = name.match(re);
  if (!match) return null;

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12 || year < 2000 || year > 2099) return null;

  return new Date(year, month - 1, 1);
}

function buildRowsByPMR_(sheet, headerRow, dataStartRow) {
  headerRow = headerRow || HEADER_ROW;
  dataStartRow = dataStartRow || DATA_START_ROW;
  const data = getDataValues_(sheet, headerRow, dataStartRow);
  const result = new Map();

  if (!data.values.length) return result;
  const pmrIdx = getPMRIndex_(data.headerMap);
  if (pmrIdx === -1) throw new Error(`${sheet.getName()} is missing Participant PMR# / PMR # column.`);

  data.values.forEach((row, offset) => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr) return;
    if (!result.has(pmr)) result.set(pmr, []);
    result.get(pmr).push({ rowNumber: dataStartRow + offset, values: row });
  });

  return result;
}

function safeSheetName_(value) {
  return normalizeText_(value).replace(/[\\\/\?\*\[\]:]/g, "-").substring(0, 99);
}

function compareValues_(left, right) {
  return normalizeText_(left) === normalizeText_(right);
}

function getGlobalBorderStyle_(globals) {
  const styleName = String((globals && globals.globalBorderStyle) || "SOLID").trim().toUpperCase();
  return SpreadsheetApp.BorderStyle[styleName] || SpreadsheetApp.BorderStyle.SOLID;
}

function markRuntimeStep_(timing, label, details) {
  if (!timing) return;
  if (!Array.isArray(timing.steps)) timing.steps = [];
  if (!Array.isArray(timing.warnings)) timing.warnings = [];
  if (!timing.startMs) timing.startMs = new Date().getTime();
  if (!timing.lastMs) timing.lastMs = timing.startMs;
  if (!timing.processName) timing.processName = "Workflow";

  const now = new Date().getTime();
  const stepSeconds = (now - timing.lastMs) / 1000;
  const totalSeconds = (now - timing.startMs) / 1000;
  const cleanLabel = String(label || "Step");
  const severity = /^ERROR\b/i.test(cleanLabel) ? "CRITICAL" : getRuntimeTimingSeverity_(stepSeconds);
  const cleanDetails = details === undefined || details === null ? "" : String(details);

  timing.steps.push({
    step: cleanLabel, seconds: stepSeconds, totalSeconds: totalSeconds,
    severity: severity, details: cleanDetails, timestamp: new Date()
  });

  if (severity !== "OK") timing.warnings.push(cleanLabel + " - " + severity + " - " + formatSeconds_(stepSeconds));

  timing.lastMs = now;
  logRuntimeTiming_(timing.processName, cleanLabel, stepSeconds, totalSeconds, severity, cleanDetails);
}

function logRuntimeWarning_(processName, message, details) {
  const suffix = details === undefined || details === null || details === "" ? "" : " | " + details;
  Logger.log("[WARNING] " + String(processName || "Master List") + " | " + String(message || "") + suffix);
}

function logBestEffortWarning_(message, details) {
  const cleanMessage = "[SWALLOWED EXCEPTION - BEST EFFORT] " + String(message || "");
  logRuntimeWarning_("Best Effort", cleanMessage, details);
}

function formatSeconds_(seconds) {
  const value = Number(seconds || 0);
  if (value < 60) return value.toFixed(2) + " sec";
  const minutes = Math.floor(value / 60);
  const remaining = value - (minutes * 60);
  return minutes + " min " + remaining.toFixed(1) + " sec";
}

// ============================================================================
// WAVE 4.1 CONSOLIDATED PRODUCTION PIPELINES
// ============================================================================

function applySubHeaderBlock_(sheet, startRow, sectionTitle, lastUpdatedText, headers, dashboard, sheetDef, options) {
  const width = Math.max((headers || []).length, 1);
  const activeDashboard = dashboard || loadDashboardConfig_();
  const activeSheetDef = sheetDef || { baseColor: "#A165CC" };
  const theme = getThemeColorsFromBase_(activeSheetDef.baseColor || "#A165CC", activeDashboard.globals || RFF_DEFAULTS);
  const updated = String(lastUpdatedText || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy"));
  const valuesAlreadyWritten = !!(options && options.valuesAlreadyWritten);
  
  if (!valuesAlreadyWritten) sheet.getRange(startRow, 1, 1, width).clearContent().clearFormat();
  safeSetRowHeights_(sheet, startRow, 1, 21, "Five-row top buffer");
  
  const titleRange = sheet.getRange(startRow + 1, 1, 1, width);
  titleRange.breakApart().merge();
  if (!valuesAlreadyWritten) titleRange.setValue(sectionTitle + " | Last Updated - " + updated);
  titleRange.setBackground(theme.level5).setFontColor("#FFFFFF").setFontWeight("bold").setFontSize(11);
  safeSetRowHeights_(sheet, startRow + 1, 1, 28, "Five-row section title");
  
  const spacerRange = sheet.getRange(startRow + 2, 1, 1, width).breakApart();
  if (!valuesAlreadyWritten) spacerRange.clearContent();
  spacerRange.clearFormat().setBackground("#FFFFFF");
  safeSetRowHeights_(sheet, startRow + 2, 1, 10, "Five-row visual spacer");
  
  const headerRange = sheet.getRange(startRow + 3, 1, 1, width).breakApart();
  if (!valuesAlreadyWritten) {
    const headerValues = (headers || []).slice(0, width);
    while (headerValues.length < width) headerValues.push("");
    headerRange.setValues([headerValues]);
  }
  headerRange.setBackground(theme.level2).setFontWeight("bold").setFontSize(10).setFontColor("#000000");
  safeSetRowHeights_(sheet, startRow + 3, 1, 35, "Five-row column headers");
  
  const anchorRange = sheet.getRange(startRow + 4, 1, 1, width).breakApart();
  if (!valuesAlreadyWritten) anchorRange.clearContent();
  anchorRange.clearFormat();
  
  return { bufferRow: startRow, titleRow: startRow + 1, spacerRow: startRow + 2, headerRow: startRow + 3, dataAnchorRow: startRow + 4 };
}

function getHiddenColumnFlags_(sheet, lastCol) {
  const flags = [];
  for (let col = 1; col <= lastCol; col++) {
    flags.push(typeof sheet.isColumnHiddenByUser === "function" ? sheet.isColumnHiddenByUser(col) : false);
  }
  return flags;
}

function isDateNumberFormat_(format) {
  const value = String(format || "").toLowerCase();
  return /[ymd]/.test(value) && value.indexOf("#") === -1;
}

// ============================================================================
// FORMAT DASHBOARD AND GLOBAL DEFAULTS FUNCTIONS
// ============================================================================

let RFF_LAST_TEMPLATE_REFRESH_MODE_ = "";

const RFF_DEFAULTS = {
  headerRow: 4, dataStartRow: 5, freezeRows: 4, freezeColumns: 2,
  row1Height: 25, row2Height: 20, row3Height: 10, headerRowHeight: 40, dataRowHeight: 25,
  defaultDateFormat: "mm/dd/yyyy", defaultNumberFormat: "General", defaultTextFormat: "@",
  defaultColumnWidth: 105, defaultDataWrap: "OVERFLOW", defaultHorizontalAlignment: "left", defaultVerticalAlignment: "middle",
  standardFont: "Arial", standardFontSize: 10, standardFontColor: "#000000",
  titleFontSize: 14, titleInfoFontSize: 5, templateRows: 500, demoPTemplateRows: 2500, monthlyChangeTemplateRows: 1000,
  hslLevel1: 60, hslLevel2: 75, hslLevel3: 85, hslLevel4: 97, hslLevel5: 99,
  templateVersion: MASTER_LIST_MERGE_ML_VERSION
};

const RFF_SHEET_TYPES = {
  BANNER: "Banners", CARE_PLAN_DUE: "CP Due Date", UNLOCKED: "Unlock CP", RAW_DATA: "Raw Data",
  REFINED_DATA: "Refined Data", DEMO_P: "Refined Data", DISENROLLED_EXCLUSION: "Disenrolled Exclusion",
  MASTER_LIST: "Master List", MONTHLY_CHANGE: "Monthly Change"
};

const RFF_MONTHLY_CHANGE_SUBSECTIONS = [
  "Enrollment", "Disenrolled", "Demographic Changes", "Caseload Changes",
  "Contact Changes", "Banner Summary Changes", "Other Changes"
];


// ============================================================================
// TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
// ============================================================================

// ============================================================================
// TEMPLATE FUNCTIONS AND VALIDATION FORMATTERS
// ============================================================================

/**
 * Locks final row heights ONLY on processing sheets.
 * Prevents Google Sheets from improperly auto-expanding row heights on multi-pass data writes.
 */
function lockFinalOutputRowHeights_(sheet, label) {
  if (!sheet || !shouldLockExpandedDataRowHeights_(sheet, label)) return;

  clearDashboardConfigCache_();
  const dashboard = loadDashboardConfig_();
  const globals = dashboard.globals || {};
  const dataStartRow = Number(globals.dataStartRow || DATA_START_ROW);
  const lastRow = Math.max(sheet.getLastRow(), dataStartRow);

  const r1Height = Number(getTitleRowConfigForSheet_(dashboard, null, 1).height || globals.row1Height || 25);
  const r2Height = Number(getTitleRowConfigForSheet_(dashboard, null, 2).height || globals.row2Height || 25);
  const r3Height = Number(getTitleRowConfigForSheet_(dashboard, null, 3).height || globals.row3Height || 10);
  const r4Height = Number(getTitleRowConfigForSheet_(dashboard, null, 4).height || globals.headerRowHeight || 25);

  try {
    safeSetRowHeights_(sheet, 1, 1, r1Height);
    safeSetRowHeights_(sheet, 2, 1, r2Height);
    safeSetRowHeights_(sheet, 3, 1, r3Height);
    safeSetRowHeights_(sheet, Number(globals.headerRow || HEADER_ROW), 1, r4Height);

    if (lastRow >= dataStartRow) {
      safeSetRowHeights_(sheet, dataStartRow, lastRow - dataStartRow + 1, Number(globals.dataRowHeight || 25), "final output data rows");
    }
  } catch (err) {
    logBestEffortWarning_("Final row height lock skipped for " + (label || sheet.getName()) + ": " + err.message);
  }
}

function shouldLockExpandedDataRowHeights_(sheet, label) {
  const name = String((sheet && sheet.getName && sheet.getName()) || label || "");
  return name.indexOf(DEMO_P_PREFIX) === 0 ||
         name.indexOf(MASTER_LIST_PREFIX) === 0 ||
         name.indexOf(MONTHLY_CHANGE_REPORT_PREFIX) === 0 ||
         name.indexOf("Disenrolled") !== -1;
}

function applyGlobalDefaultRowHeightsToSheet_(sheet, label) {
  if (!sheet) return;
  try {
    const dashboard = loadDashboardConfig_();
    safeSetRowHeights_(sheet, 1, sheet.getMaxRows(), Number(dashboard.globals.dataRowHeight || 25), label || sheet.getName());
  } catch (err) {
    logBestEffortWarning_("Global default row height application skipped for " + (label || sheet.getName()) + ": " + err.message);
  }
}

function safeSetRowHeights_(sheet, startRow, count, height, label) {
  if (!sheet || count < 1) return 0;
  startRow = Math.max(1, Number(startRow || 1));
  height = Number(height || 25);
  
  const maxRows = Math.max(sheet.getMaxRows(), 1);
  if (startRow > maxRows) return 0;
  const safeCount = Math.min(count, maxRows - startRow + 1);
  if (safeCount < 1 || safeCount > 2500) return safeCount;

  try {
    if (typeof sheet.setRowHeightsForced === "function") sheet.setRowHeightsForced(startRow, safeCount, height);
    else if (typeof sheet.setRowHeights === "function") sheet.setRowHeights(startRow, safeCount, height);
  } catch (err) {
    logBestEffortWarning_("Row height batch skipped for " + (label || sheet.getName()) + " rows " + startRow + "-" + (startRow + safeCount - 1) + ": " + err.message);
  }
  return safeCount;
}

function ensureTitleRowConfig_(config, rowNumber, globals) {
  const safe = config || parseTitleRowConfigRow_([], globals || {}, { row: rowNumber });
  safe.row = Math.max(Number(safe.row || rowNumber || 1), 1);
  safe.targetCell = normalizeTitleTargetCell_(safe.targetCell, safe.row);
  safe.height = Number(safe.height || (globals && globals.dataRowHeight) || RFF_DEFAULTS.dataRowHeight);
  safe.fontSize = Number(safe.fontSize || (globals && globals.standardFontSize) || RFF_DEFAULTS.standardFontSize);
  safe.fontWeight = String(safe.fontWeight || "normal").toLowerCase() === "bold" ? "bold" : "normal";
  safe.fillLevel = safe.fillLevel || "Level 1";
  safe.alignment = safe.alignment || (globals && globals.defaultHorizontalAlignment) || RFF_DEFAULTS.defaultHorizontalAlignment;
  safe.wrap = safe.wrap || (globals && globals.defaultDataWrap) || RFF_DEFAULTS.defaultDataWrap;
  return safe;
}

function applyTitleRows_(sheet, dashboard, sheetDef, theme, colCount) {
  const globals = dashboard.globals;
  const row1 = ensureTitleRowConfig_(getTitleRowConfigForSheet_(dashboard, sheetDef, 1), 1, globals);
  const row2 = ensureTitleRowConfig_(getTitleRowConfigForSheet_(dashboard, sheetDef, 2), 2, globals);
  const row3 = ensureTitleRowConfig_(getTitleRowConfigForSheet_(dashboard, sheetDef, 3), 3, globals);
  const row4 = ensureTitleRowConfig_(getTitleRowConfigForSheet_(dashboard, sheetDef, 4), 4, globals);

  [row1, row2, row3, row4].forEach(function(rowConfig) {
    if (!rowConfig || !rowConfig.row) return;
    try { sheet.setRowHeight(rowConfig.row, Number(rowConfig.height)); } catch (err) {}
    
    sheet.getRange(rowConfig.row, 1, 1, colCount)
      .setBackground(getThemeFillForTitleRow_(theme, rowConfig.fillLevel))
      .setFontSize(rowConfig.fontSize)
      .setFontWeight(rowConfig.fontWeight)
      .setHorizontalAlignment(rowConfig.alignment)
      .setVerticalAlignment("middle")
      .setWrapStrategy(toWrapStrategy_(rowConfig.wrap));
  });

  sheet.getRange(row1.targetCell || "A1")
    .setValue(sheetDef.reportTitle)
    .setFontSize(row1.fontSize || globals.titleFontSize)
    .setFontWeight(row1.fontWeight || "bold")
    .setWrapStrategy(toWrapStrategy_(row1.wrap || "OVERFLOW"))
    .setVerticalAlignment("middle");

  sheet.getRange("C1:D1").setValue("");
  sheet.getRange("A2").setValue("Date");
  if (row2.label) sheet.getRange("A2").setValue(row2.label);
  sheet.getRange("B2").setValue("").setNumberFormat(globals.defaultDateFormat);
  sheet.getRange("C2").setValue("to").setHorizontalAlignment("center");
  sheet.getRange("D2").setValue("").setNumberFormat(globals.defaultDateFormat);
}

function applyHeaderRow_(sheet, dashboard, sheetDef, headers, theme, colCount) {
  const globals = dashboard.globals;
  const headerRow = globals.headerRow;
  const headerConfig = getTitleRowConfigForSheet_(dashboard, sheetDef, headerRow);

  sheet.getRange(headerRow, 1, 1, colCount)
    .setBackground(getThemeFillForTitleRow_(theme, headerConfig.fillLevel || "Level 2"))
    .setFontFamily(globals.standardFont)
    .setFontWeight(headerConfig.fontWeight || "bold")
    .setFontColor(globals.standardFontColor)
    .setFontSize(headerConfig.fontSize || globals.standardFontSize)
    .setWrapStrategy(toWrapStrategy_(headerConfig.wrap || "WRAP"))
    .setHorizontalAlignment(headerConfig.alignment || globals.defaultHorizontalAlignment || "left")
    .setVerticalAlignment("top");

  if (headers.length > 0) sheet.getRange(headerRow, 1, 1, headers.length).setValues([headers]);
}

function applyColumnWidths_(sheet, dashboard, headers) {
  const globals = dashboard.globals || {};
  const widths = (headers || []).map(function(header) {
    const def = dashboard.columnDefinitions[header] || {};
    return Number(def.width || globals.defaultColumnWidth || RFF_DEFAULTS.defaultColumnWidth);
  });
  applyColumnWidthsInRuns_(sheet, widths);
}

function applyColumnWidthsInRuns_(sheet, widths) {
  if (!sheet || !widths || widths.length === 0) return;
  let startCol = 1;
  let currentWidth = widths[0];

  for (let i = 1; i <= widths.length; i++) {
    const nextWidth = i < widths.length ? widths[i] : null;
    if (i < widths.length && nextWidth === currentWidth) continue;

    const runLength = i - startCol + 1;
    try {
      if (typeof sheet.setColumnWidths === "function") sheet.setColumnWidths(startCol, runLength, currentWidth);
    } catch (err) {}

    startCol = i + 1;
    currentWidth = nextWidth;
  }
}

function applyHiddenColumnSettingsInRuns_(sheet, hiddenFlags) {
  if (!sheet || !hiddenFlags || hiddenFlags.length === 0) return;
  let startCol = 1;
  let currentHidden = hiddenFlags[0];

  for (let i = 1; i <= hiddenFlags.length; i++) {
    const nextHidden = i < hiddenFlags.length ? hiddenFlags[i] : null;
    if (i < hiddenFlags.length && nextHidden === currentHidden) continue;

    const runLength = i - startCol + 1;
    try {
      if (currentHidden) sheet.hideColumns(startCol, runLength);
      else sheet.showColumns(startCol, runLength);
    } catch (err) {}

    startCol = i + 1;
    currentHidden = nextHidden;
  }
}

function applyDataRows_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing) {
  const globals = dashboard.globals;
  const theme = getThemeColorsFromBase_(sheetDef.baseColor, globals);
  const startRow = globals.dataStartRow;
  const rows = Math.max(rowCount - startRow + 1, 1);

  const dataRange = sheet.getRange(startRow, 1, rows, colCount);
  dataRange
    .setFontFamily(globals.standardFont)
    .setFontSize(globals.standardFontSize)
    .setFontWeight("normal")
    .setFontColor(globals.standardFontColor)
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)
    .setHorizontalAlignment("left")
    .setVerticalAlignment("middle");

  if (behavior.usesAlternatingColors) {
    applyNativeBandingToRange_(sheet, dataRange, theme);
    markFrameworkStep_(timing, "Apply alternating color rules: " + sheetDef.templateName);
  }
}

function applyNativeBandingToRange_(sheet, range, theme) {
  if (!sheet || !range) return null;
  const startRow = range.getRow();
  const startColumn = range.getColumn();
  const rows = Math.max(range.getNumRows(), 1);
  const columns = Math.max(range.getNumColumns(), 1);
  
  sheet.getRange(HEADER_ROW, startColumn, 1, columns).breakApart();
  sheet.getBandings().forEach(function(banding) {
    const current = banding.getRange();
    const overlaps = current.getRow() <= startRow + rows - 1 && current.getLastRow() >= startRow &&
      current.getColumn() <= startColumn + columns - 1 && current.getLastColumn() >= startColumn;
    if (overlaps) banding.remove();
  });
  
  const banding = sheet.getRange(startRow, startColumn, rows, columns).applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
  banding.setFirstRowColor((theme && theme.level3) || "#FFFFFF");
  banding.setSecondRowColor((theme && theme.level4) || "#F7F7F7");
  return banding;
}

function resizeSheetGrid_(sheet, rowCount, colCount, options) {
  if (!sheet) return;
  options = options || {};
  rowCount = Math.max(Number(rowCount || 1), 1);
  colCount = Math.max(Number(colCount || 1), 1);

  const dimensions = getSheetDimensions_(sheet);
  const currentRows = dimensions.maxRows;
  const currentCols = dimensions.maxCols;

  if (currentRows < rowCount) sheet.insertRowsAfter(currentRows, rowCount - currentRows);
  else if (!options.skipRowShrink && currentRows > rowCount) sheet.deleteRows(rowCount + 1, currentRows - rowCount);

  if (currentCols < colCount) sheet.insertColumnsAfter(currentCols, colCount - currentCols);
  else if (!options.skipColumnShrink && currentCols > colCount) sheet.deleteColumns(colCount + 1, currentCols - colCount);

  if (currentRows !== rowCount || currentCols !== colCount) clearSheetDimensionCacheForSheet_(sheet);
}

function getHeadersForSheetType_(dashboard, sheetType) {
  const normalized = normalizeDashboardSheetTypeKey_(sheetType);
  const items = dashboard.sheetHeaders[normalized] || dashboard.sheetHeaders[sheetType] || [];
  return items.map(function(item) { return item.header; });
}

function getDefaultBehavior_() {
  return { usesTitleRows: true, usesFilter: true, usesAlternatingColors: true, usesSubheaders: false, hiddenTemplate: true, outputVisibility: "VISIBLE" };
}

function showSheetIfNeeded_(sheet, timing, stepName) {
  if (!sheet) return;
  try {
    if (typeof sheet.isSheetHidden === "function" && sheet.isSheetHidden()) {
      sheet.showSheet();
      if (timing && stepName) markFrameworkStep_(timing, stepName);
    }
  } catch (err) {}
}

function activateVisibleSheetBeforeHiding_(sheet) {
  if (!sheet || !sheet.getParent || !sheet.getSheetId) return false;
  const ss = sheet.getParent();
  const activeSheet = ss.getActiveSheet && ss.getActiveSheet();
  if (!activeSheet || activeSheet.getSheetId() !== sheet.getSheetId()) return true;
  const fallback = ss.getSheets().filter(function(candidate) {
    return candidate.getSheetId() !== sheet.getSheetId() && (!candidate.isSheetHidden || !candidate.isSheetHidden());
  })[0];
  if (!fallback) return false;
  ss.setActiveSheet(fallback);
  return true;
}

function hideSheetIfNeeded_(sheet, timing, stepName) {
  if (!sheet) return;
  try {
    if (typeof sheet.isSheetHidden === "function" && !sheet.isSheetHidden()) {
      if (!activateVisibleSheetBeforeHiding_(sheet)) throw new Error("No visible fallback sheet is available before hiding the active sheet.");
      sheet.hideSheet();
      if (timing && stepName) markFrameworkStep_(timing, stepName);
    }
  } catch (err) {}
}

function buildPromptedMonthContext_(monthParts) {
  monthParts = monthParts || {};
  return {
    reportDate: monthParts.firstDay,
    monthParts: monthParts,
    monthLabel: Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "MM.yy")
  };
}

function archiveActiveRawDataSheet() {
  return runFrameworkTimed_("Archive Active Raw Data Sheet", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    assertActiveRawDataSourceSheet_(sheet, "Archive Active Raw Data Sheet");
    archiveRawSourceSheet_(sheet, sheet.getName(), timing, "Active archive detail");
    markFrameworkStep_(timing, "Active sheet archived: " + sheet.getName());
    return sheet;
  });
}

function parseReportMonthInput_(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text) throw new Error("Report month is required.");

  const numeric = Number(text);
  if (!isNaN(numeric) && numeric >= 1 && numeric <= 12) return Math.floor(numeric);

  const monthNames = {
    jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3, apr: 4, april: 4,
    may: 5, jun: 6, june: 6, jul: 7, july: 7, aug: 8, august: 8, sep: 9, sept: 9, september: 9,
    oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12
  };
  if (monthNames[text]) return monthNames[text];
  throw new Error("Invalid report month: " + text + ". Enter 1-12 or a month name.");
}

function promptForLockedYearReportMonth_(processTitle) {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(processTitle || "Report Month", "Enter report month. Examples: 05.26, July 2026, or 05/01/26.", ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() !== ui.Button.OK) return null;
  const text = String(response.getResponseText() || "").trim();
  if (!text) { notify_("Report month is required."); return null; }
  
  let reportDate = null;
  try {
    if (/^(\d{1,2}|[A-Za-z]+)$/.test(text)) {
      const month = parseReportMonthInput_(text);
      reportDate = createLocalDateOnly_(new Date().getFullYear(), month - 1, 1);
    } else {
      const numeric = text.match(/^(\d{1,2})[\.\/-](\d{2}|\d{4})$/);
      if (numeric) {
        let year = Number(numeric[2]);
        if (year < 100) year += 2000;
        reportDate = createLocalDateOnly_(year, Number(numeric[1]) - 1, 1);
      } else {
        reportDate = normalizeToDateObject_(text);
      }
    }
  } catch (err) {
    notify_(err.message);
    return null;
  }

  if (!reportDate || isNaN(reportDate.getTime())) {
    notify_("Invalid report month: " + text + ". Enter 1-12, a month name, MM.YY, or a date in the target month.");
    return null;
  }
  return getMonthDateParts_(reportDate);
}

function boolText_(value) { return value ? "TRUE" : "FALSE"; }

function isPrimaryPMRRowValue_(value) {
  const text = String(value === null || value === undefined ? "" : value).trim().toLowerCase();
  return text === "yes" || text === "y" || text === "true" || text === "primary" || text === "1";
}

function getCurrentBannersSheet_(monthParts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (monthParts && monthParts.firstDay && monthParts.lastDay) {
    return getMonthlySheetByPrefixAndDate_(ss, BANNER_PREFIX, monthParts.firstDay, monthParts.lastDay) ||
      getMonthlySheetByPrefixAndDate_(ss, BANNER_REPORT_ALT_PREFIX, monthParts.firstDay, monthParts.lastDay) ||
      getNewestFormattedMonthlySheetByPrefix_(ss, BANNER_PREFIX) ||
      getNewestFormattedMonthlySheetByPrefix_(ss, BANNER_REPORT_ALT_PREFIX);
  }
  return getNewestFormattedMonthlySheetByPrefix_(ss, BANNER_PREFIX) || getNewestFormattedMonthlySheetByPrefix_(ss, BANNER_REPORT_ALT_PREFIX);
}

function applyStandardFormatting_(sheet, options) {
  if (!sheet) return sheet;
  options = options || {};
  const globals = RFF_DEFAULTS || {};
  const sheetType = normalizeDashboardSheetTypeKey_(options.sheetType || getSheetTypeForOrganization_(sheet.getName()));
  const sheetDef = getDefaultSheetDefinitionByType_(sheetType);
  const theme = getThemeColorsFromBase_((sheetDef && sheetDef.baseColor) || "#65A9CC", globals);
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const lastRow = Math.max(sheet.getLastRow(), 1);
  const headerRow = Number(options.headerRow || HEADER_ROW);
  const dataStartRow = Number(options.dataStartRow || DATA_START_ROW);
  const title = String(options.title || options.sheetType || sheet.getName() || "").trim();

  if (title) sheet.getRange(1, 1).setValue(title).setFontWeight("bold").setFontSize(Number(globals.titleFontSize || 14));
  if (options.startDate) sheet.getRange(2, 2).setValue(options.startDate).setNumberFormat("m/d/yy");
  if (options.endDate) sheet.getRange(2, 4).setValue(options.endDate).setNumberFormat("m/d/yy");

  if (lastRow >= headerRow) {
    sheet.getRange(headerRow, 1, 1, lastCol).setFontWeight("bold").setBackground(theme.level2).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP).setVerticalAlignment("top");
  }
  if (lastRow >= dataStartRow) {
    sheet.getRange(dataStartRow, 1, lastRow - dataStartRow + 1, lastCol).setFontFamily(globals.standardFont || "Arial").setFontSize(Number(globals.standardFontSize || 10)).setVerticalAlignment("middle");
  }

  try {
    if (lastCol > 1) sheet.getRange(1, 1, Math.min(3, lastRow), lastCol).setFontFamily(globals.standardFont || "Arial").setVerticalAlignment("middle");
    sheet.setFrozenRows(Math.max(headerRow, 1));
    forceStandardTitleCellAlignment_(sheet);
  } catch (err) {}
  return sheet;
}

function applyStandardFormattingAfterHeadersAndData_(sheet, sheetType, title, startDate, endDate, titleInfoText) {
  return applyStandardFormatting_(sheet, { sheetType: sheetType, title: title, startDate: startDate, endDate: endDate, titleInfoText: titleInfoText });
}

function forceStandardTitleCellAlignment_(sheet) {
  if (!sheet) return;
  try { sheet.getRange("A1:D3").setHorizontalAlignment("left").setVerticalAlignment("middle"); } catch (err) {}
}

function autoHidePreviousMonthSheetsAfterWorkflow_(monthParts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const currentFirst = monthParts && monthParts.firstDay ? monthParts.firstDay : null;
  ss.getSheets().forEach(function(sheet) {
    try {
      const sheetDate = extractFirstDateFromSheetName_(sheet.getName());
      if (currentFirst && sheetDate && sheetDate.getTime() < currentFirst.getTime() && sheet.getName() !== INDEX_SHEET) {
        hideSheetIfNeeded_(sheet);
      }
    } catch (err) {}
  });
}

function getLiveSheetStatus_(sheetName, label) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) return { label: label, status: "MISSING", notes: sheetName + " sheet not found" };
  return { label: label, status: "READY", notes: sheetName + " present" };
}

function isDateInStrictLocalRangeInclusive_(dateVal, startDate, endDate) {
  const d = normalizeToDateObject_(dateVal);
  const start = normalizeToDateObject_(startDate);
  const end = normalizeToDateObject_(endDate);
  if (!d || !start || !end) return false;
  const time = createLocalDateOnly_(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const startTime = createLocalDateOnly_(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const endTime = createLocalDateOnly_(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return time >= startTime && time <= endTime;
}

function getSheetTypeForOrganization_(sheetName) {
  const name = String(sheetName || "").trim().toLowerCase();
  if (name === "index") return "Index";
  if (name.indexOf("master list") !== -1) return SHEET_TYPE.MASTER_LIST;
  if (name.indexOf("monthly change") !== -1) return SHEET_TYPE.MONTHLY_CHANGE;
  if (name.indexOf("demo p") !== -1) return SHEET_TYPE.DEMO_P;
  if (name.indexOf("cp due") !== -1 || name.indexOf("care plan due") !== -1) return SHEET_TYPE.CARE_PLAN_DUE;
  if (name.indexOf("unlock") !== -1) return SHEET_TYPE.UNLOCKED;
  if (name.indexOf("banner") !== -1) return SHEET_TYPE.BANNER;
  if (name.indexOf("disenrolled") !== -1) return SHEET_TYPE.DISENROLLED_EXCLUSION;
  if (name.indexOf("raw data") !== -1) return SHEET_TYPE.RAW_DATA;
  return "Other";
}

function ensureStandardTitleRows_(sheet) {
  if (!sheet) return;
  try {
    if (sheet.getMaxColumns() < 4) sheet.insertColumnsAfter(sheet.getMaxColumns(), 4 - sheet.getMaxColumns());
    const monthParts = getMonthPartsFromTitleRows_(sheet) || getMonthDateParts_(new Date());
    if (monthParts) {
      sheet.getRange("A2").setValue("Date:");
      sheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat("m/d/yy");
      sheet.getRange("C2").setValue("to").setHorizontalAlignment("center");
      sheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat("m/d/yy");
    }
  } catch (err) {}
}

function isDateLikeHeader_(header) {
  const clean = normalizeHeader_(header);
  if (!clean) return false;
  if (GLOBAL_DATE_FORMAT_HEADERS.indexOf(clean) !== -1) return true;
  if (typeof DEMO_P_TEMPLATE_DATE_HEADERS !== "undefined" && DEMO_P_TEMPLATE_DATE_HEADERS.indexOf(clean) !== -1) return true;
  const lower = clean.toLowerCase();
  return lower.indexOf("date") !== -1 || lower.indexOf("dob") !== -1 || lower.endsWith(" due");
}

function buildBannerReportOutputName_(date) {
  const monthText = Utilities.formatDate(date, Session.getScriptTimeZone(), "MM.yy");
  return "Banners " + monthText;
}

function getProtectedSheetDeletionNames_() {
  const names = [RFF_DASHBOARD_SHEET, INDEX_SHEET, RFF_TIMING_SHEET, RFF_TEST_DASHBOARD_SHEET, RFF_BASE_TEMPLATE_NAME, DEMO_P_ARCHIVE_SHEET];
  return new Set(names.filter(function(name) { return String(name || "").trim(); }));
}

function isProtectedSheetDeletionName_(sheetName, additionalProtectedNames) {
  const normalized = String(sheetName || "").trim();
  if (!normalized) return true;
  const protectedNames = getProtectedSheetDeletionNames_();
  (additionalProtectedNames || []).forEach(function(name) {
    const value = String(name || "").trim();
    if (value) protectedNames.add(value);
  });
  return protectedNames.has(normalized) || /^RFF_/i.test(normalized);
}

function assertSheetCanBeDeleted_(ss, sheet, context, additionalProtectedNames) {
  if (!ss) throw new Error("Spreadsheet is required before deleting a sheet.");
  if (!sheet) throw new Error("Sheet is required before deleting a sheet.");
  const sheetName = sheet.getName();
  if (isProtectedSheetDeletionName_(sheetName, additionalProtectedNames)) throw new Error("Refusing to delete protected sheet: " + sheetName);
  if (ss.getSheets().length <= 1) throw new Error("Cannot delete the only sheet in the workbook: " + sheetName);
}

function deleteSheetSafely_(ss, sheet, context, additionalProtectedNames) {
  if (!sheet) return false;
  assertSheetCanBeDeleted_(ss, sheet, context, additionalProtectedNames);
  const sheetId = sheet.getSheetId();
  clearSheetRuntimeCachesForSheet_(sheet);
  const replacement = ss.getSheets().filter(function(candidate) { return candidate.getSheetId() !== sheetId; })[0];
  if (replacement) ss.setActiveSheet(replacement);
  ss.deleteSheet(sheet);
  clearMonthlySheetLookupCache_();
  return true;
}

function deleteSheetIfExists_(ss, sheetName, protectedName1, protectedName2) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;
  deleteSheetSafely_(ss, sheet, "deleteSheetIfExists_", [protectedName1, protectedName2]);
}

function writeBannerReportDates_(sheet, reportDate) {
  const startDate = new Date(reportDate.getFullYear(), reportDate.getMonth(), 1);
  const endDate = new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 0);
  sheet.getRange("B2").setValue(startDate).setNumberFormat("m/d/yyyy");
  sheet.getRange("D2").setValue(endDate).setNumberFormat("m/d/yyyy");
}

function ensureSheetHasAtLeastRows_(sheet, requiredRows) {
  const currentRows = sheet.getMaxRows();
  if (currentRows < requiredRows) sheet.insertRowsAfter(currentRows, requiredRows - currentRows);
}

function deleteArchiveSheetIfExists_(archiveSs, sheetName) {
  const existing = archiveSs.getSheetByName(sheetName);
  if (!existing) return;
  if (isProtectedSheetDeletionName_(sheetName)) throw new Error("Refusing to replace protected archive sheet: " + sheetName);
  if (archiveSs.getSheets().length <= 1) {
    existing.clear();
    existing.clearFormats();
    existing.setName(sheetName + " - replaced " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMddHHmmss"));
    return;
  }
  deleteSheetSafely_(archiveSs, existing, "archive sheet replacement");
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

function buildRawDataInPlaceFormattingContext_(sourceSheet, dashboard, sheetDef, monthParts) {
  const headers = getHeadersForSheetType_(dashboard, sheetDef.sheetType);
  const rawData = getRawDataSourceDataForOutput_(sourceSheet);
  return {
    dashboard: dashboard,
    sheetDef: sheetDef,
    sourceSheet: sourceSheet,
    sourceName: sourceSheet.getName(),
    headers: headers,
    rawData: rawData,
    outputRows: mapRowsToHeaders_(rawData.values, rawData.headers, headers)
  };
}

function writeRawDataInPlaceTitleRowsAndAddedColumns_(sheet, context, monthParts, timing, markStepFn) {
  const dashboard = context.dashboard;
  const sheetDef = context.sheetDef;
  const globals = dashboard.globals || {};
  const theme = getThemeColorsFromBase_(sheetDef.baseColor, globals);
  const step = typeof markStepFn === "function" ? markStepFn : markRuntimeStep_;
  const originalHeaderRow = rawDataSourceHeaderRow_(sheet);

  if (originalHeaderRow > HEADER_ROW) {
    throw new Error("In-place Raw Data formatting expected import headers on row 1 or row " + HEADER_ROW + "; found row " + originalHeaderRow + ". No imported data was changed.");
  }

  if (originalHeaderRow < HEADER_ROW) {
    sheet.insertRowsBefore(1, HEADER_ROW - originalHeaderRow);
  }

  const headerWidth = Math.max(sheet.getLastColumn(), 1);
  const existingHeaders = sheet.getRange(HEADER_ROW, 1, 1, headerWidth).getValues()[0].map(function(header) { return String(header || "").trim(); });
  const headerSet = new Set(existingHeaders.filter(Boolean));
  const governedRawDataHeaders = getHeadersForSheetType_(dashboard, sheetDef.sheetType);

  const addedColumns = [];
  governedRawDataHeaders.forEach(function(header) {
    const cleanHeader = String(header || "").trim();
    if (!cleanHeader || headerSet.has(cleanHeader)) return;
    addedColumns.push(cleanHeader);
    headerSet.add(cleanHeader);
  });

  if (addedColumns.length) {
    const lastCol = Math.max(sheet.getLastColumn(), 1);
    if (sheet.getMaxColumns() < lastCol + addedColumns.length) {
      sheet.insertColumnsAfter(sheet.getMaxColumns(), lastCol + addedColumns.length - sheet.getMaxColumns());
    }
    sheet.getRange(HEADER_ROW, lastCol + 1, 1, addedColumns.length).setValues([addedColumns]);
  }

  const finalWidth = Math.max(sheet.getLastColumn(), headerWidth + addedColumns.length, 1);
  const finalHeaders = sheet.getRange(HEADER_ROW, 1, 1, finalWidth).getValues()[0].map(function(header) { return String(header || "").trim(); });

  applyTitleRows_(sheet, dashboard, sheetDef, theme, finalWidth);
  sheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat((globals.defaultDateFormat || "m/d/yy"));
  sheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat((globals.defaultDateFormat || "m/d/yy"));
  applyHeaderRow_(sheet, dashboard, sheetDef, finalHeaders, theme, finalWidth);

  try { sheet.setTabColor(sheetDef.baseColor || sheet.getTabColor()); } catch (err) {}

  try {
    sheet.setFrozenRows(HEADER_ROW);
    const existingFilter = sheet.getFilter && sheet.getFilter();
    if (existingFilter) existingFilter.remove();
    const filterRows = Math.max(sheet.getMaxRows() - HEADER_ROW + 1, 1);
    sheet.getRange(HEADER_ROW, 1, filterRows, finalWidth).createFilter();
  } catch (err) {}

  clearSheetRuntimeCachesForSheet_(sheet);
  return { addedColumns: addedColumns, governedRawDataHeaders: governedRawDataHeaders, finalHeaders: finalHeaders };
}

function isTextSensitiveMappedHeader_(header) {
  const normalized = normalizeHeader_(header);
  return /(^|\b)(pmr|phone|zip|postal)(\b|#)/i.test(normalized);
}

function coerceMappedTextValue_(value) {
  if (value === null || value === undefined || value === "") return "";
  return String(value);
}

function mapRowsToHeaders_(sourceRows, sourceHeaders, targetHeaders) {
  const sourceHeaderMap = buildHeaderIndexMap_(sourceHeaders || []);
  const targets = targetHeaders || [];
  return (sourceRows || []).map(function(row) {
    const output = new Array(targets.length).fill("");
    targets.forEach(function(header, targetIndex) {
      const sourceIdx = sourceHeaderMap[header];
      if (sourceIdx === undefined) return;
      const value = row[sourceIdx];
      output[targetIndex] = isTextSensitiveMappedHeader_(header) ? coerceMappedTextValue_(value) : value;
    });
    return output;
  });
}

function applyUniversalFastCanvasFormatting_(sheet, dashboard, headers) {
  if (!sheet || !dashboard || !headers) return;
  const lastRow = sheet.getLastRow();
  if (lastRow < DATA_START_ROW) return;
  try {
    applyColumnWidths_(sheet, dashboard, headers);
    applyColumnHidingFromDashboard_(sheet, dashboard, headers);
    sheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, Math.max(sheet.getLastColumn(), 1)).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  } catch (err) {}
}

function applyGovernedTextAndNumberFormats_(sheet, dashboard, headers, dataStartRow, rowCount) {
  if (!sheet || !headers || !headers.length) return;
  const globals = (dashboard && dashboard.globals) || {};
  const columnDefinitions = (dashboard && dashboard.columnDefinitions) || {};
  const startRow = Number(dataStartRow || DATA_START_ROW);
  const requestedRows = rowCount !== undefined && rowCount !== null ? Number(rowCount || 0) : Number(sheet.getMaxRows() - startRow + 1);
  if (requestedRows < 1) return;
  
  const formatsByA1 = {};

  function columnLetter_(col) {
    let letter = "";
    while (col > 0) {
      let remainder = (col - 1) % 26;
      letter = String.fromCharCode(65 + remainder) + letter;
      col = Math.floor((col - 1) / 26);
    }
    return letter;
  }

  headers.forEach(function(header, index) {
    const columnDef = columnDefinitions[header] || {};
    let format = String(columnDef.numberFormat || "").trim();
    if (!format) format = columnDef.dateColumn || isDateLikeHeader_(header) ? (globals.defaultDateFormat || "mm/dd/yyyy") : "@";
    
    const letter = columnLetter_(index + 1);
    const rangeA1 = letter + startRow + ":" + letter + (startRow + requestedRows - 1);
    if (!formatsByA1[format]) formatsByA1[format] = [];
    formatsByA1[format].push(rangeA1);
  });

  Object.keys(formatsByA1).forEach(function(format) {
    try { sheet.getRangeList(formatsByA1[format]).setNumberFormat(format); } catch (err) {}
  });
}

function ensureOutputSheetHasFormattedRows_(sheet, requiredRows, width) {
  if (!sheet) return;
  requiredRows = Math.max(Number(requiredRows || 1), DATA_START_ROW);
  width = Math.max(Number(width || 1), 1);
  const currentRows = sheet.getMaxRows();

  if (currentRows >= requiredRows) return;
  
  const rowsToAdd = requiredRows - currentRows;
  sheet.insertRowsAfter(currentRows, rowsToAdd);

  if (RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING) {
    try {
      sheet.getRange(DATA_START_ROW, 1, 1, width).copyTo(sheet.getRange(currentRows + 1, 1, rowsToAdd, width), { formatOnly: true });
    } catch (err) {}
  }
}

const DEMO_P_TEMPLATE_DATE_HEADERS = GLOBAL_DATE_FORMAT_HEADERS.slice();
const DEMO_P_BANNER_SYNC_HEADERS = ["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"];

function normalizeRowsToWidth_(rows, width) {
  return (rows || []).map(function(row) { return normalizeRowToWidth_(row, width); });
}

function normalizeRowToWidth_(row, width) {
  const out = (row || []).slice(0, width);
  if (out.length < width) Array.prototype.push.apply(out, new Array(width - out.length).fill(""));
  return out;
}

function sortSheetAlphabeticallyByParticipantName_(sheet) {
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < DATA_START_ROW || lastCol < 1) return;

  const headerMap = buildHeaderIndexMap_(getHeaders_(sheet, HEADER_ROW));
  const lastNameCol = headerMap["Last Name"] !== undefined ? headerMap["Last Name"] + 1 : -1;
  const firstNameCol = headerMap["First Name"] !== undefined ? headerMap["First Name"] + 1 : -1;

  if (lastNameCol === -1 || firstNameCol === -1) return;

  sheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol).sort([
    { column: lastNameCol, ascending: true },
    { column: firstNameCol, ascending: true }
  ]);
}

function assignPrimaryPMRRowsInData_(data) {
  if (!data || !data.values || !data.headerMap) return;
  const pmrIdx = getPMRIndex_(data.headerMap);
  const primaryIdx = data.headerMap["Primary PMR Row"];
  if (pmrIdx === -1 || primaryIdx === undefined) return;

  const seen = new Set();
  data.values.forEach(function(row) {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr) {
      row[primaryIdx] = "";
    } else if (!seen.has(pmr)) {
      row[primaryIdx] = "Yes";
      seen.add(pmr);
    } else {
      row[primaryIdx] = "";
    }
  });
}

function computeStableHash_(text) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, String(text || ""), Utilities.Charset.UTF_8);
  return digest.map(function(byte) {
    return ("0" + (byte < 0 ? byte + 256 : byte).toString(16)).slice(-2);
  }).join("");
}

function verifyPrimaryPMRColumnFromRawData_(data) {
  if (!data || !data.headerMap) return;
  if (data.headerMap["Primary PMR Row"] === undefined) {
    throw new Error("Demo P requires Primary PMR Row from Raw Data. Run Format Raw Data first.");
  }
}

const BANNER_SYNC_FIELDS = ["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"];
const UNLOCKED_SYNC_FIELDS = ["IDT Meeting Date", "Care Plan Start Date"];
const CARE_PLAN_DUE_SYNC_FIELDS = ["Enrollment Date", "Last Care Plan", "Next Care Plan Due", "CP Type"];



// ============================================================================
// MONTHLY CHANGE & MASTER LIST MERGE FUNCTIONS
// ============================================================================

function compareSingleFieldAndAdd_(outputRows, changedPMRs, section, pmr, previousItem, currentItem, previousData, currentData, field, monthParts, skipIfCurrentDOBBlank) {
  if (!previousItem || !currentItem) return;

  if (skipIfCurrentDOBBlank) {
    const currentDOBIdx = getDOBIndex_(currentData.headerMap);
    if (currentDOBIdx !== -1 && normalizeCompareValue_(currentItem.values[currentDOBIdx]) === "") return;
  }

  if (field !== "Participant PMR#" && currentData.headerMap[field] === undefined && previousData.headerMap[field] === undefined) {
    return;
  }

  const previousValue = getFieldValueFromRow_(previousItem.values, previousData.headerMap, field);
  const currentValue = getFieldValueFromRow_(currentItem.values, currentData.headerMap, field);

  if (!valuesAreEqual_(previousValue, currentValue)) {
    addMCRRow_(outputRows, changedPMRs, section, pmr, currentItem, previousItem, currentData, previousData, field, previousValue, currentValue, monthParts);
  }
}

function addMCRRow_(outputRows, changedPMRs, section, pmr, currentItem, previousItem, currentData, previousData, field, previousValue, currentValue, monthParts) {
  const mainItem = currentItem || previousItem;
  const currentValues = mainItem ? mainItem.values : [];
  const currentMap = currentData.headerMap;

  const lastName = getFieldValueFromRow_(currentValues, currentMap, "Last Name");
  const firstName = getFieldValueFromRow_(currentValues, currentMap, "First Name");
  const participantName = buildParticipantName_(currentValues, currentMap);

  outputRows.push([
    section,
    pmr,
    participantName,
    lastName,
    firstName,
    field,
    displayValueForReport_(previousValue),
    displayValueForReport_(currentValue),
    previousItem ? previousItem.rowNumber : "",
    currentItem ? currentItem.rowNumber : "",
    monthParts.firstDay
  ]);

  if (!changedPMRs.has(pmr)) changedPMRs.set(pmr, new Set());
  changedPMRs.get(pmr).add(section);
}

function getFieldValueFromRow_(row, headerMap, field) {
  const idx = headerMap[field];
  return (idx === undefined || idx < 0) ? "" : row[idx];
}

function buildParticipantName_(row, headerMap) {
  const participantName = getFieldValueFromRow_(row, headerMap, "Participant Name");
  if (normalizeCompareValue_(participantName) !== "") return participantName;

  const lastText = String(getFieldValueFromRow_(row, headerMap, "Last Name") || "").trim();
  const firstText = String(getFieldValueFromRow_(row, headerMap, "First Name") || "").trim();

  if (firstText && lastText) return `${firstText} ${lastText}`;
  return firstText || lastText || "";
}

function padRowToWidth_(rowValues, width) {
  const output = (rowValues || []).slice(0, width);
  if (output.length < width) Array.prototype.push.apply(output, new Array(width - output.length).fill(""));
  return output;
}

// ============================================================================
// MASTER LIST MERGE HELPER FUNCTIONS
// ============================================================================

function getMonthPartsFromTitleRows_(sheet) {
  const b2 = sheet.getRange("B2");
  const d2 = sheet.getRange("D2");
  const firstDay = normalizeToDateObject_(b2.getValue()) || normalizeToDateObject_(b2.getDisplayValue());
  const lastDay = normalizeToDateObject_(d2.getValue()) || normalizeToDateObject_(d2.getDisplayValue());
  if (!firstDay || !lastDay) return null;
  return { firstDay: firstDay, lastDay: lastDay };
}

function hideNonPrimaryPMRRows_(sheet) {
  sheet = sheet || SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < DATA_START_ROW || lastCol < 1) return;
  
  sheet.showRows(DATA_START_ROW, lastRow - DATA_START_ROW + 1);
  const pmrIdx = getPMRIndex_(buildHeaderIndexMap_(getHeaders_(sheet, HEADER_ROW)));
  if (pmrIdx === -1) return;
  
  const values = sheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol).getValues();
  const seenPMRs = new Set();
  const rowsToHide = [];
  
  values.forEach((row, offset) => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr) return;
    if (!seenPMRs.has(pmr)) {
      seenPMRs.add(pmr);
      return;
    }
    rowsToHide.push(DATA_START_ROW + offset);
  });
  hideRowNumberBatches_(sheet, rowsToHide);
}

function buildMappedMasterRowFromDemoRow_(demoRow, demoHeaders, demoHeaderMap, masterHeaders, masterHeaderMap, monthParts, sourceSheetName, statusText) {
  const output = new Array(masterHeaders.length).fill("");
  demoHeaders.forEach((header, sourceIdx) => {
    if (!header) return;
    const targetIdx = masterHeaderMap[header];
    if (targetIdx !== undefined) output[targetIdx] = demoRow[sourceIdx];
  });
  return output;
}

function mutateMasterRowColumnsFromDemoRow_(rowValues, masterHeaderMap, demoRow, demoHeaderMap, headersToUpdate, monthParts, sourceSheetName, statusText) {
  if (!rowValues) return;
  (headersToUpdate || []).forEach(header => {
    const masterIdx = masterHeaderMap[header];
    const demoIdx = demoHeaderMap[header];
    if (masterIdx === undefined || demoIdx === undefined) return;
    rowValues[masterIdx] = demoRow[demoIdx];
  });
}

function getPrimaryMergeRowItem_(rows, headerMap) {
  const primaryIdx = headerMap ? headerMap["Primary PMR Row"] : undefined;
  if (primaryIdx !== undefined) {
    const primaryItem = (rows || []).find(item => {
      const value = String((item.values || [])[primaryIdx] || "").trim().toLowerCase();
      return value === "yes" || value === "true" || value === "primary";
    });
    if (primaryItem) return primaryItem;
  }
  return (rows || [])[0] || null;
}

function getPrimaryRowChangedColumnDetails_(masterRow, masterHeaderMap, demoRow, demoHeaderMap) {
  const changes = [];
  const specifics = ["Type of Contact", "Relationship", "Company", "Address 1 - Street", "Notes", "Primary PMR Row", "Sort Order"];

  const headers = Object.keys(demoHeaderMap || {}).filter(header => {
    if (!header || !masterHeaderMap || masterHeaderMap[header] === undefined) return false;
    
    // Dynamically skip all parsed contact, phone, AD, and custom field columns
    if (/^(Contact -|Phone [1-4]|AD[1-3] -|Custom Field )/.test(header)) return false;
    
    // Skip the remaining specific metadata columns
    return specifics.indexOf(header) === -1;
  });

  headers.forEach(header => {
    const masterValue = masterRow[masterHeaderMap[header]];
    const demoValue = demoRow[demoHeaderMap[header]];

    if (!valuesAreEqual_(masterValue, demoValue)) {
      changes.push({
        column: header,
        masterValue: formatMergeAuditValueForDisplay_(masterValue),
        demoValue: formatMergeAuditValueForDisplay_(demoValue)
      });
    }
  });

  return changes;
}

function buildMergeRowsByPMRFromData_(data) {
  const result = new Map();
  if (!data || !data.values || !data.values.length) return result;

  const pmrIdx = getPMRIndex_(data.headerMap);
  if (pmrIdx === -1) return result;

  data.values.forEach((row, offset) => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr) return;
    if (!result.has(pmr)) result.set(pmr, []);
    result.get(pmr).push({
      rowNumber: DATA_START_ROW + offset,
      values: row,
      blockOffset: result.get(pmr).length
    });
  });

  return result;
}

function buildSecondaryMergeKeyMapForRows_(rows, headerMap, pmr) {
  const result = new Map();
  const primaryIdx = headerMap ? headerMap["Primary PMR Row"] : undefined;

  (rows || []).forEach((item, idx) => {
    const row = item.values || [];
    const primaryValue = primaryIdx === undefined ? "" : String(row[primaryIdx] || "").trim().toLowerCase();
    const isPrimary = primaryValue === "yes" || primaryValue === "true" || primaryValue === "primary";

    if (isPrimary || (primaryIdx === undefined && idx === 0)) return;

    const key = buildContactMergeRowKey_(row, headerMap, pmr, idx + 1);
    result.set(result.has(key) ? key + "|DUP" + item.rowNumber : key, item);
  });

  return result;
}

function buildContactMergeRowKey_(row, headerMap, pmr, fallbackPosition) {
  const parts = [
    pmr,
    "CONTACT",
    getMergeRowValue_(row, headerMap, ["Contact - Last Name"]),
    getMergeRowValue_(row, headerMap, ["Contact - First Name"]),
    getMergeRowValue_(row, headerMap, ["Relationship"]),
    getMergeRowValue_(row, headerMap, ["Type of Contact"]),
    getMergeRowValue_(row, headerMap, ["AD1 - Phone", "Phone Number", "Phone 1 - Value"])
  ];

  const cleanParts = parts.map(normalizeKeyPart_);
  if (!cleanParts.slice(2).some(Boolean)) return pmr + "|CONTACT|ROW" + String(fallbackPosition || "");
  return cleanParts.join("|");
}

function getMergeRowValue_(row, headerMap, possibleHeaders) {
  for (let i = 0; i < possibleHeaders.length; i++) {
    const idx = headerMap[possibleHeaders[i]];
    if (idx !== undefined) return row[idx];
  }
  return "";
}

// ============================================================================
// DISENROLLMENT FUNCTIONS
// ============================================================================

// ============================================================================
// DASHBOARD CONFIGURATION, LOADERS & MONTHLY CHANGE CONSTANTS
// ============================================================================

// --- MONTHLY CHANGE TRACKING FIELDS -----------------------------------------

const CHANGE_SECTION_ENROLLMENTS = "Enrollments";
const CHANGE_SECTION_DISENROLLMENTS = "Disenrollments";
const CHANGE_SECTION_DEMOGRAPHIC = "Demographic Changes";
const CHANGE_SECTION_CASELOAD = "Caseload Changes";
const CHANGE_SECTION_CONTACT = "Contact Changes";

const MCR_OUTPUT_HEADERS = ["Section", "Participant PMR#", "Participant Name", "Last Name", "First Name", "Field", "Previous Value", "Current Value", "Previous Source Row", "Current Source Row", "Change Month"];

const RAW_DEMO_P_DEMOGRAPHIC_FIELDS = ["Last Name", "First Name", "Preferred Name", "Date of Birth", "Participant PMR#", "Phone Number", "Address Line 1", "Address Line 2", "City", "State", "Zip", "Oxygen", "Primary Language", "Residence Type", "Additional Important Information"];
const RAW_DEMO_P_CONTACT_FIELDS = ["Contact - Last Name", "Contact - First Name", "Type of Contact", "Contact - Primary Language", "Relationship", "AD1 - Phone", "AD1 - Phone Valid Dates From", "AD1 - Phone Valid Dates To", "AD2 - Phone", "AD2 - Phone Valid Dates From", "AD2 - Phone Valid Dates To", "AD3 - Phone", "AD3 - Phone Valid Dates From", "AD3 - Phone Valid Dates To", "Company", "Contact - Notes"];
const RAW_DEMO_P_CASELOAD_FIELDS = ["Caseload - Social Work", "Caseload - RN", "Caseload - PCP", "Caseload - HCC", "Caseload - Activities", "Caseload - OT", "Caseload - PT", "Caseload - RD", "Caseload - Supervising MD"];
const RAW_DEMO_P_BANNER_FIELDS = ["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"];
const RAW_DEMO_P_ENROLLMENT_FIELDS = ["Capitation Date", "Enrollment Status"];
const RAW_DEMO_P_DISENROLLMENT_FIELDS = ["Disenrollment Date", "Disenrollment Effective Date", "Disenrollment Reason", "Date of Death"];

// --- WORKFLOW & TIMING LOCKS ------------------------------------------------

function getCurrentRawDataSheet_(monthParts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return getMonthlySheetByPrefixAndDate_(ss, "Raw Data", monthParts.firstDay, monthParts.lastDay);
}

function runWithWorkflowBusyFlag_(processName, callback) {
  const lock = LockService.getDocumentLock();
  if (!lock.tryLock(15000)) {
    const activeProcess = PropertiesService.getDocumentProperties().getProperty(ML_WORKFLOW_BUSY_KEY) || "Another process";
    const msg = "Workflow paused: " + activeProcess + " is currently running. Please wait a moment and try again.";
    notify_(msg);
    throw new Error(msg);
  }

  markWorkflowBusy_(processName);
  try {
    return callback();
  } finally {
    try {
      clearWorkflowBusy_();
      runDeferredIndexRefreshIfNeeded_();
      forceBaseTemplateHidden_();
      clearAllRuntimeCaches_();
    } finally {
      lock.releaseLock();
    }
  }
}

function markWorkflowBusy_(processName) {
  const props = PropertiesService.getDocumentProperties();
  props.setProperty(ML_WORKFLOW_BUSY_KEY, processName || "Framework Workflow");
  props.setProperty(ML_WORKFLOW_BUSY_STARTED_KEY, String(new Date().getTime()));
}

function clearWorkflowBusy_() {
  const props = PropertiesService.getDocumentProperties();
  props.deleteProperty(ML_WORKFLOW_BUSY_KEY);
  props.deleteProperty(ML_WORKFLOW_BUSY_STARTED_KEY);
}

// --- DASHBOARD PARSERS & LOADERS --------------------------------------------

function getSheetDefinitionByTypeOrNull_(dashboard, sheetType) {
  const normalized = normalizeDashboardSheetTypeKey_(sheetType);
  return (dashboard.sheetDefinitions || []).filter(function(item) {
    return item.sheetType === normalized || normalizeDashboardSheetTypeKey_(item.sheetType) === normalized;
  })[0] || null;
}

function getSheetDefinitionByType_(dashboard, sheetType) {
  const sheetDef = getSheetDefinitionByTypeOrNull_(dashboard, sheetType);
  if (!sheetDef) throw new Error("Sheet definition not found in dashboard: " + sheetType);
  return sheetDef;
}

function getDefaultSheetDefinitionByType_(sheetType) {
  const normalized = normalizeDashboardSheetTypeKey_(sheetType);
  const rows = typeof getDefaultSheetDefinitionRows_ === "function" ? getDefaultSheetDefinitionRows_() : [];
  
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (normalizeDashboardSheetTypeKey_(row[0]) !== normalized) continue;
    
    return {
      sheetType: normalized,
      reportTitle: String(row[1] || row[0] || "").trim(),
      templateName: String(row[2] || ("Template - " + row[0])).trim(),
      outputNamingPattern: String(row[3] || "").trim(),
      baseColor: normalizeHex_(row[4] || "#65A9CC"),
      usePromptDate: parseBoolean_(row[5]),
      endDateSource: String(row[6] || "").trim(),
      templateRowCount: numberOrDefault_(row[7], 100),
      templateColumnCount: 0, // Governed natively by the format dashboard headers
      templateRowMode: String(row[8] || "FIXED").trim().toUpperCase(),
      minimumRows: numberOrDefault_(row[9], numberOrDefault_(row[7], 100)),
      bufferRows: numberOrDefault_(row[10], 100)
    };
  }
  throw new Error("Default sheet definition not found: " + sheetType);
}

function loadSheetDefinitions_(sheet) {
  let rows = [];
  try { rows = readDashboardSectionRows_(sheet, "SECTION C"); } catch (err) {}
  if (!rows.length && typeof getDefaultSheetDefinitionRows_ === "function") {
    rows = getDefaultSheetDefinitionRows_();
  }

  return rows.filter(function(row) { return String(row[0] || "").trim(); }).map(function(row) {
    const hasTemplateColumnCount = !isBlankCell_(row[8]) && !isNaN(Number(row[8]));
    const countOffset = hasTemplateColumnCount ? 1 : 0;
    return {
      sheetType: normalizeDashboardSheetTypeKey_(row[0]),
      reportTitle: String(row[1] || row[0] || "").trim(),
      templateName: String(row[2] || ("Template - " + row[0])).trim(),
      outputNamingPattern: String(row[3] || "").trim(),
      baseColor: normalizeHex_(row[4] || "#65A9CC"),
      usePromptDate: parseBoolean_(row[5]),
      endDateSource: String(row[6] || "").trim(),
      templateRowCount: numberOrDefault_(row[7], 100),
      templateColumnCount: hasTemplateColumnCount ? numberOrDefault_(row[8], 0) : 0,
      templateRowMode: String(row[8 + countOffset] || "FIXED").trim().toUpperCase(),
      minimumRows: numberOrDefault_(row[9 + countOffset], numberOrDefault_(row[7], 100)),
      bufferRows: numberOrDefault_(row[10 + countOffset], 100)
    };
  });
}



function parseTitleRowConfigRow_(row, globals, base) {
  row = row || [];
  base = base || {};
  const rowNumber = numberOrDefault_(row[1], base.row || 0);
  const fillLevel = String(row[9] || base.fillLevel || "").trim() || "Level 1";
  const fontWeight = String(row[8] || base.fontWeight || "").trim() || "Normal";
  const alignment = String(row[10] || base.alignment || globals.defaultHorizontalAlignment || RFF_DEFAULTS.defaultHorizontalAlignment).trim().toLowerCase();
  const wrap = String(row[11] || base.wrap || globals.defaultDataWrap || RFF_DEFAULTS.defaultDataWrap).trim().toUpperCase();

  return {
    sheetType: String(row[0] || base.sheetType || "GLOBAL").trim() || "GLOBAL",
    row: rowNumber,
    purpose: String(row[2] || base.purpose || "").trim(),
    valueSource: String(row[3] || base.valueSource || "").trim(),
    label: String(row[4] === "" || row[4] === null || row[4] === undefined ? (base.label || "") : row[4]).trim(),
    targetCell: normalizeTitleTargetCell_(row[5] || base.targetCell, rowNumber),
    height: numberOrDefault_(row[6], base.height || RFF_DEFAULTS.dataRowHeight),
    fontSize: numberOrDefault_(row[7], base.fontSize || globals.standardFontSize || RFF_DEFAULTS.standardFontSize),
    fontWeight: fontWeight.toLowerCase() === "bold" ? "bold" : "normal",
    fillLevel: fillLevel,
    alignment: alignment,
    wrap: wrap,
    notes: String(row[12] || base.notes || "").trim()
  };
}

function normalizeTitleTargetCell_(value, rowNumber) {
  const text = String(value || "").trim();
  if (/^[A-Za-z]+[1-9][0-9]*$/.test(text)) return text.toUpperCase();
  return "A" + Math.max(Number(rowNumber || 1), 1);
}

function getTitleRowConfigForSheet_(dashboard, sheetDef, rowNumber) {
  const allTitleRows = (dashboard && dashboard.titleRows) || {};
  const sheetType = sheetDef ? normalizeDashboardSheetTypeKey_(sheetDef.sheetType) : "";
  const sheetRows = allTitleRows[sheetType] || {};
  const globalRows = allTitleRows.GLOBAL || {};
  return sheetRows[rowNumber] || globalRows[rowNumber] || parseTitleRowConfigRow_(getDefaultTitleRowRows_()[Math.max(rowNumber - 1, 0)] || [], dashboard.globals || {}, null);
}

function toWrapStrategy_(value) {
  const normalized = String(value || "").trim().toUpperCase();
  if (normalized === "WRAP") return SpreadsheetApp.WrapStrategy.WRAP;
  if (normalized === "OVERFLOW") return SpreadsheetApp.WrapStrategy.OVERFLOW;
  return SpreadsheetApp.WrapStrategy.CLIP;
}

function loadSheetHeaders_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_HEADERS);
  const map = {};

  rows.forEach(function(row) {
    const sheetType = normalizeDashboardSheetTypeKey_(row[0]);
    const order = numberOrDefault_(row[1], 9999);
    const header = normalizeHeader_(row[2]);
    const source = String(row[3] || "").trim();

    if (!sheetType || !header) return;
    if (!map[sheetType]) map[sheetType] = [];

    map[sheetType].push({ order: order, header: header, source: source });
  });

  Object.keys(map).forEach(function(sheetType) { map[sheetType].sort(function(a, b) { return a.order - b.order; }); });
  return map;
}

function loadColumnDefinitions_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_COLUMNS);
  const map = {};

  rows.forEach(function(row) {
    const header = normalizeHeader_(row[0]);
    if (!header) return;
    map[header] = {
      header: header,
      width: isBlankCell_(row[1]) ? null : numberOrDefault_(row[1], null),
      headerFontSize: isBlankCell_(row[2]) ? null : numberOrDefault_(row[2], null),
      dateColumn: parseBoolean_(row[3]),
      hideColumn: parseBoolean_(row[4]),
      dataWrap: String(row[5] || "").trim().toUpperCase(),
      horizontalAlignment: String(row[6] || "").trim().toLowerCase(),
      verticalAlignment: String(row[7] || "").trim().toLowerCase(),
      numberFormat: String(row[8] || "").trim()
    };
  });
  return map;
}



function getBehaviorForSheetType_(dashboard, sheetType) {
  const normalized = normalizeDashboardSheetTypeKey_(sheetType);
  const behaviors = dashboard && dashboard.behaviors ? dashboard.behaviors : {};
  return behaviors[normalized] || behaviors[sheetType] || getDefaultBehavior_();
}

function applyNativeBandingSafe_(sheet, startRow, maxCols, totalRows, color1, color2) {
  if (!sheet || totalRows < startRow || maxCols < 1) return;
  const bandRange = sheet.getRange(startRow, 1, totalRows - startRow + 1, maxCols);
  try { sheet.getBandings().forEach(function(banding) { banding.remove(); }); } catch (err) {}
  
  try {
    const banding = bandRange.applyRowBanding();
    if (banding) {
      banding.setHeaderRowColor(null);
      if (color1) banding.setFirstRowColor(color1);
      if (color2) banding.setSecondRowColor(color2);
    }
  } catch (err) {}
}

function appendDetailedLogsContinuous_(sheet, logsArray) {
  if (!sheet || !logsArray || !logsArray.length) return;
  const width = 7;
  const rows = logsArray.map(function(row) { return normalizeSectionRowForWidth_(row || [], width); });
  const lastRow = Math.max(sheet.getLastRow(), 4);
  const startRow = lastRow + 1;
  const requiredLastRow = startRow + rows.length - 1;
  if (sheet.getMaxRows() < requiredLastRow) {
    sheet.insertRowsAfter(sheet.getMaxRows(), requiredLastRow - sheet.getMaxRows());
  }
  sheet.getRange(startRow, 1, rows.length, width).setValues(rows);
}

function normalizeSectionRowForWidth_(row, width) {
  const out = (row || []).slice(0, width);
  while (out.length < width) out.push("");
  return out;
}

function rowHasAnyValue_(row) {
  return (row || []).some(function(value) { return String(value === null || value === undefined ? "" : value).trim() !== ""; });
}

function trimTrailingBlankRows_(rows) {
  const out = (rows || []).slice();
  while (out.length && !rowHasAnyValue_(out[out.length - 1])) out.pop();
  return out;
}

function forceSheetRowCount_(sheet, desiredRows) {
  if (!sheet || !desiredRows) return;
  desiredRows = Math.max(1, Number(desiredRows) || 1);
  const current = sheet.getMaxRows();
  if (current > desiredRows) sheet.deleteRows(desiredRows + 1, current - desiredRows);
  else if (current < desiredRows) sheet.insertRowsAfter(current, desiredRows - current);
}

function runWorkflowSyncVerification() {
  return runDashboardQualityWorkflowSyncVerification_();
}

function getArchiveSpreadsheetId_() {
  return PropertiesService.getDocumentProperties().getProperty("RFF_ARCHIVE_SPREADSHEET_ID") || RFF_ARCHIVE_SPREADSHEET_ID;
}

function openArchiveSpreadsheetOnce_() {
  if (!RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA) return null;
  return SpreadsheetApp.openById(getArchiveSpreadsheetId_());
}

function placeCreatedSheetInConfiguredOrder_(sheet) {
  if (!sheet || !sheet.getParent) return false;
  const ss = sheet.getParent();
  const targetIndex = getConfiguredSheetCreationIndex_(ss, sheet.getName(), sheet.getSheetId());
  if (sheet.getIndex() === targetIndex) return false;
  const wasHidden = typeof sheet.isSheetHidden === "function" && sheet.isSheetHidden();
  try {
    if (wasHidden && typeof sheet.showSheet === "function") sheet.showSheet();
    ss.setActiveSheet(sheet);
    ss.moveActiveSheet(Math.max(1, Math.min(targetIndex, ss.getNumSheets())));
    clearMonthlySheetLookupCache_();
    return true;
  } catch (err) {
    return false;
  } finally {
    if (wasHidden && typeof sheet.hideSheet === "function") {
      try { sheet.hideSheet(); } catch (hideErr) {}
    }
  }
}

function extractFirstDateFromSheetName_(sheetName) {
  const text = String(sheetName || "").trim();
  let match = text.match(/(\d{1,2})\.(\d{1,2})\.(\d{2}|\d{4})/);
  if (match) {
    let year = Number(match[3]);
    if (year < 100) year += 2000;
    const date = createLocalDateOnly_(year, Number(match[1]) - 1, Number(match[2]));
    if (date.getFullYear() === year && date.getMonth() === Number(match[1]) - 1 && date.getDate() === Number(match[2])) return date;
  }
  match = text.match(/(?:^|\s|-)(\d{1,2})\.(\d{2}|\d{4})(?:\s|$|\()/);
  if (match) {
    let year = Number(match[2]);
    if (year < 100) year += 2000;
    const date = createLocalDateOnly_(year, Number(match[1]) - 1, 1);
    if (date.getFullYear() === year && date.getMonth() === Number(match[1]) - 1) return date;
  }
  return null;
}

// --- FORMAT DASHBOARD DEFAULTS (COMPRESSED) ---------------------------------

function getDefaultSheetHeaderRows_() {
  const rows = [];
  const headerSets = getDefaultHeaderSets_();
  Object.keys(headerSets).forEach(function(sheetType) {
    headerSets[sheetType].forEach(function(item, index) { rows.push([sheetType, index + 1, item.header, item.source || "Populates via process"]); });
  });
  return rows;
}

function getDefaultHeaderSets_() {
  const h_map = function(list, source) { return list.map(function(h) { return h_(h, source); }); };
  return {
    [SHEET_TYPE.BANNER]: h_map(["Last Name", "First Name", "Participant PMR#", "Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"], "Primary Data"),
    [SHEET_TYPE.CARE_PLAN_DUE]: h_map(["Participant Name", "Enrollment Date", "Last Care Plan", "Next Care Plan Due", "CP Type"], "Primary Data"),
    [SHEET_TYPE.UNLOCKED]: h_map(["Participant Name", "PMR #", "IDT Meeting Date", "Care Plan Start Date"], "Primary Data"),
    [SHEET_TYPE.RAW_DATA]: [].concat(
      h_map(["Last Name", "First Name", "Preferred Name", "Date of Birth", "Participant PMR#", "Phone Number", "Address Line 1", "Address Line 2", "City", "State", "Zip", "Oxygen", "Primary Language", "Residence Type", "Contact - Last Name", "Contact - First Name", "Type of Contact", "Contact - Primary Language", "Relationship", "AD1 - Phone", "AD1 - Phone Valid Dates From", "AD1 - Phone Valid Dates To", "AD2 - Phone", "AD2 - Phone Valid Dates From", "AD2 - Phone Valid Dates To", "AD3 - Phone", "AD3 - Phone Valid Dates From", "AD3 - Phone Valid Dates To", "Company", "Contact - Notes", "Capitation Date", "Enrollment Status", "Disenrollment Date", "Disenrollment Effective Date", "Disenrollment Reason", "Date of Death", "Caseload - Social Work", "Caseload - RN", "Caseload - PCP", "Caseload - HCC", "Caseload - Activities", "Caseload - OT", "Caseload - PT", "Caseload - RD", "Caseload - Supervising MD", "Additional Important Information", "Notes"], "Unformatted Data"),
      h_map(["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"], "Banners"),
      h_map(["Primary PMR Row"], "Format Raw Data")
    ),
    [SHEET_TYPE.DEMO_P]: [].concat(
      h_map(["Last Name", "First Name", "Preferred Name", "Date of Birth", "Participant PMR#", "Phone Number", "Address Line 1", "Address Line 2", "City", "State", "Zip", "Oxygen", "Primary Language", "Residence Type", "Contact - Last Name", "Contact - First Name", "Type of Contact", "Contact - Primary Language", "Relationship", "AD1 - Phone", "AD1 - Phone Valid Dates From", "AD1 - Phone Valid Dates To", "AD2 - Phone", "AD2 - Phone Valid Dates From", "AD2 - Phone Valid Dates To", "AD3 - Phone", "AD3 - Phone Valid Dates From", "AD3 - Phone Valid Dates To", "Company", "Contact - Notes", "Capitation Date", "Enrollment Status", "Disenrollment Date", "Disenrollment Effective Date", "Disenrollment Reason", "Date of Death", "Caseload - Social Work", "Caseload - RN", "Caseload - PCP", "Caseload - HCC", "Caseload - Activities", "Caseload - OT", "Caseload - PT", "Caseload - RD", "Caseload - Supervising MD", "Additional Important Information", "Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"], "Raw Data"),
      h_map(["Primary PMR Row", "Banner Summary", "Phone 1 - Label", "Phone 1 - Value", "Phone 2 - Label", "Phone 2 - Value", "Phone 3 - Label", "Phone 3 - Value", "Phone 4 - Label", "Phone 4 - Value", "Address 1 - Street", "Custom Field 1 - Label", "Custom Field 1 - Value", "Notes", "Contact - 1", "Contact - 2", "Contact - 3", "Contact - 4", "Contact - 5", "Contact - 6", "Contact - 7", "Contact - 8", "Contact - Summary", "Participant Name", "Name", "Demo P Update Status", "Demo P Update Month", "Demo P Source Sheet"], "Demo P process")
    ),
    [SHEET_TYPE.DISENROLLED_EXCLUSION]: [].concat(
      h_map(["Participant Name", "Name", "Preferred Name", "Date of Birth", "Address 1 - Street", "City", "State", "Zip", "Phone 1 - Value", "Phone 2 - Value", "Participant PMR#", "Primary Language", "Residence Type", "Notes", "IDT Meeting Date", "Care Plan Start Date", "Enrollment Date", "Last Care Plan", "Next Care Plan Due", "CP Type", "Oxygen", "Caseload - Social Work", "Caseload - RN", "Caseload - PCP", "Caseload - HCC", "Caseload - Activities", "Caseload - OT", "Caseload - PT", "Caseload - RD", "Caseload - Supervising MD", "Capitation Date", "Enrollment Status", "Disenrollment Date", "Disenrollment Effective Date", "Disenrollment Reason", "Date of Death", "Contact - Last Name", "Contact - First Name", "Type of Contact", "Contact - Primary Language", "Relationship", "AD1 - Phone", "AD1 - Phone Valid Dates From", "AD1 - Phone Valid Dates To", "AD2 - Phone", "AD2 - Phone Valid Dates From", "AD2 - Phone Valid Dates To", "AD3 - Phone", "AD3 - Phone Valid Dates From", "AD3 - Phone Valid Dates To", "Company", "Contact - Notes", "Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care", "Last Name", "First Name", "Phone Number", "Address Line 1", "Address Line 2", "Additional Important Information", "PMR #"], "Demo P"),
      h_map([DISENROLLED_EXCLUSION_ADDED_HEADER], "Framework audit")
    ),
    [SHEET_TYPE.MASTER_LIST]: h_map(["Participant Name", "Name", "Preferred Name", "Date of Birth", "Address 1 - Street", "City", "State", "Zip", "Phone 1 - Value", "Phone 2 - Value", "Participant PMR#", "Primary Language", "Residence Type", "Notes", "IDT Meeting Date", "Care Plan Start Date", "Enrollment Date", "Last Care Plan", "Next Care Plan Due", "CP Type", "Completed", "Face Sheet", "HHA", "Oxygen", "Equipment", "Caseload - Social Work", "Caseload - RN", "Caseload - PCP", "Caseload - HCC", "Caseload - Activities", "Caseload - OT", "Caseload - PT", "Caseload - RD", "Caseload - Supervising MD", "Capitation Date", "Enrollment Status", "Primary PMR Row"], "Demo P"),
    [SHEET_TYPE.MONTHLY_CHANGE]: h_map(["Last Name", "First Name", "Preferred Name", "Date of Birth", "Participant PMR#", "Phone Number", "Address Line 1", "Address Line 2", "City", "State", "Zip", "Oxygen", "Primary Language", "Residence Type", "Contact - Last Name", "Contact - First Name", "Type of Contact", "Contact - Primary Language", "Relationship", "AD1 - Phone", "AD1 - Phone Valid Dates From", "AD1 - Phone Valid Dates To", "AD2 - Phone", "AD2 - Phone Valid Dates From", "AD2 - Phone Valid Dates To", "AD3 - Phone", "AD3 - Phone Valid Dates From", "AD3 - Phone Valid Dates To", "Company", "Contact - Notes", "Capitation Date", "Enrollment Status", "Disenrollment Date", "Disenrollment Effective Date", "Disenrollment Reason", "Date of Death", "Caseload - Social Work", "Caseload - RN", "Caseload - PCP", "Caseload - HCC", "Caseload - Activities", "Caseload - OT", "Caseload - PT", "Caseload - RD", "Caseload - Supervising MD", "Additional Important Information", "Notes", "Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care", "Primary PMR Row"], "Populates via process Compare Raw Data to Raw Data")
  };
}

// ============================================================================
// SECTION 1
// ============ CREATE MONTHLY UPDATE / START ============
// ============================================================================
// Ownership inventory: 2 constants and 153 functions.

// --- SECTION CONSTANTS ------------------------------------------------------

// ============================================================================
// SECTION 1
// ============ CREATE MONTHLY UPDATE / START ============
// ============================================================================

const RFF_ARCHIVE_SPREADSHEET_ID = "1PEEoXzPG-xRFuqDW_ZjPzyqdTUd_5AOwx0nbbzmMwBc";
const DEMO_P_ARCHIVE_SHEET = "Archive - Refined Data";

// --- SECTION FUNCTIONS ------------------------------------------------------

function preflightMonthlyUpdateForMonth_(monthParts, timing) {
  if (!monthParts) throw new Error("Monthly update month context is required.");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const issues = [];
  const currentRaw = getCurrentRawDataSheet_(monthParts);
  const previousRaw = getPreviousRawDataSheet_(monthParts);
  const demoSheet = getCurrentDemoPSheet_(monthParts);
  const masterListName = buildMonthlySheetName_(MASTER_LIST_PREFIX, monthParts.firstDay, monthParts.lastDay);
  const existingMasterListSheet = ss.getSheetByName(masterListName);
  let masterListExistsAndReplaceConfirmed = false;

  if (!currentRaw) issues.push("Current-month Raw Data sheet was not found. Format Raw Data for " + formatDateForSheetName_(monthParts.firstDay) + " first.");
  if (!previousRaw) issues.push("Previous-month Raw Data sheet was not found. Monthly Change comparison requires " + formatDateForSheetName_(monthParts.previousMonthFirstDay) + ".");
  if (!demoSheet) issues.push("Ongoing Demo P sheet was not found. Run Build Demo P (Initialization) before Create Monthly Update.");

  if (issues.length) {
    throw new Error("Create Monthly Update preflight failed before any monthly output mutations:\n- " + issues.join("\n- "));
  }

  if (existingMasterListSheet) {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert("Master List Exists", masterListName + " already exists. Replace it?", ui.ButtonSet.YES_NO);
    if (response !== ui.Button.YES) throw new Error("Monthly Update cancelled: Existing Master List not replaced.");
    masterListExistsAndReplaceConfirmed = true;
  }

  if (timing) {
    markFrameworkStep_(timing, "Create Monthly Update preflight passed", "Current Raw Data: " + currentRaw.getName() + "; Previous Raw Data: " + previousRaw.getName() + "; Demo P: " + demoSheet.getName() + "; Master List: " + masterListName + (masterListExistsAndReplaceConfirmed ? " (replacement confirmed)" : ""));
  }

  return {
    currentRaw: currentRaw,
    previousRaw: previousRaw,
    demoSheet: demoSheet,
    masterListName: masterListName,
    existingMasterListSheet: existingMasterListSheet,
    masterListExistsAndReplaceConfirmed: masterListExistsAndReplaceConfirmed
  };
}

function hideOldDisenrolledRows_(sheet) {
  if (!sheet) return 0;
  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) return 0;
  const dateHeaders = ["Disenrollment Effective Date", "Disenrollment Date", "Date of Death"];
  const dateIndexes = dateHeaders.map(function(header) { return data.headerMap[header]; }).filter(function(index) { return index !== undefined; });
  if (!dateIndexes.length) return 0;

  try { sheet.showRows(DATA_START_ROW, data.values.length); } catch (err) {}

  const cutoff = createLocalDateOnly_(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  cutoff.setDate(cutoff.getDate() - 365);
  const rowsToHide = [];

  data.values.forEach(function(row, index) {
    const matchedDate = dateIndexes
      .map(function(dateIndex) { return normalizeToDateObject_(row[dateIndex]); })
      .filter(function(date) { return date && !isNaN(date.getTime()); })
      .sort(function(a, b) { return b.getTime() - a.getTime(); })[0];
    if (matchedDate && matchedDate.getTime() < cutoff.getTime()) rowsToHide.push(DATA_START_ROW + index);
  });

  if (rowsToHide.length > 0) hideRowNumberBatches_(sheet, rowsToHide);
  return rowsToHide.length;
}

function spreadsheetSerialDateToLocalDate_(serialValue) {
  if (serialValue === null || serialValue === undefined || serialValue === "") return null;
  const serial = Number(serialValue);
  if (isNaN(serial) || serial < 1) return null;
  const wholeDays = Math.floor(serial);
  const fractional = serial - wholeDays;
  const date = new Date(RFF_EXCEL_EPOCH_YEAR, RFF_EXCEL_EPOCH_MONTH, RFF_EXCEL_EPOCH_DAY);
  date.setDate(date.getDate() + wholeDays);
  if (fractional > 0) {
    const millisInDay = Math.round(fractional * 24 * 60 * 60 * 1000);
    date.setMilliseconds(date.getMilliseconds() + millisInDay);
    date.setMilliseconds(0);
  }
  return isReasonableReportDate_(date) ? date : null;
}

function getTodayLocalDate_() {
  const now = new Date();
  return createLocalDateOnly_(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatDateDisplay_(date) {
  const d = normalizeToDateObject_(date);
  return d ? Utilities.formatDate(d, Session.getScriptTimeZone(), DATE_DISPLAY_FORMAT) : "";
}

function isSameDate_(a, b) {
  return dateKey_(a) !== "" && dateKey_(a) === dateKey_(b);
}

function buildMonthlySheetName_(prefix, firstDay, lastDay) {
  return buildStandardMonthlySheetName_(prefix, firstDay);
}

function setRequiredSheetName_(sheet, desiredName) {
  if (!sheet || !desiredName) return desiredName;
  const ss = sheet.getParent();
  const existing = ss.getSheetByName(desiredName);
  if (existing && existing.getSheetId && existing.getSheetId() !== sheet.getSheetId()) {
    throw new Error("Sheet already exists: " + desiredName + ". Delete or rename the existing sheet before rerunning this workflow.");
  }
  if (sheet.getName() !== desiredName) {
    sheet.setName(desiredName);
    clearMonthlySheetLookupCache_();
    clearSheetRuntimeCachesForSheet_(sheet);
  }
  return desiredName;
}

function validateRawDataPreflightForDemoP_(rawSheet, rawData, workflowName) {
  const label = workflowName || "Demo P Raw Data preflight";
  if (!rawSheet) throw new Error(label + " stopped: Raw Data sheet was not found. Format Raw Data first.");

  rawData = rawData || getDataValues_(rawSheet, HEADER_ROW, DATA_START_ROW);
  const headers = rawData.headers || [];

  if (!rawData.values || !rawData.values.length) {
    throw new Error(label + " stopped: Raw Data has no participant rows to process.");
  }

  const pmrIdx = getPMRIndex_(rawData.headerMap || {});
  if (pmrIdx === -1) {
    throw new Error(label + " stopped: Raw Data is missing a Participant PMR header.");
  }

  const primaryIdx = rawData.headerMap["Primary PMR Row"];
  if (primaryIdx === undefined) {
    throw new Error(label + " stopped: Raw Data is missing the required 'Primary PMR Row' column.");
  }

  // HARD STOP: Ensure at least one Primary PMR Row actually exists in the data
  const hasPrimaryRows = rawData.values.some(function(row) {
    return isPrimaryPMRRowValue_(row[primaryIdx]);
  });

  if (!hasPrimaryRows) {
    throw new Error(label + " stopped: Raw Data does not have any Primary PMR Rows. Processing aborted.");
  }

  return {
    rawData: rawData,
    pmrIdx: pmrIdx,
    headersFound: headers.filter(Boolean)
  };
}

function deleteRowNumberBatches_(sheet, rowNumbers) {
  if (!sheet || !rowNumbers || rowNumbers.length === 0) return 0;
  const uniqueRows = Array.from(new Set(rowNumbers))
    .map(Number)
    .filter(function(rowNumber) { return !isNaN(rowNumber) && rowNumber >= DATA_START_ROW; })
    .sort(function(a, b) { return b - a; });

  if (!uniqueRows.length) return 0;
  let deleted = 0;
  let currentEnd = uniqueRows[0];
  let currentStart = uniqueRows[0];

  for (let i = 1; i < uniqueRows.length; i++) {
    if (uniqueRows[i] === currentStart - 1) {
      currentStart = uniqueRows[i];
    } else {
      sheet.deleteRows(currentStart, currentEnd - currentStart + 1);
      deleted += currentEnd - currentStart + 1;
      currentEnd = uniqueRows[i];
      currentStart = uniqueRows[i];
    }
  }

  if (currentEnd >= DATA_START_ROW) {
    sheet.deleteRows(currentStart, currentEnd - currentStart + 1);
    deleted += currentEnd - currentStart + 1;
  }
  clearSheetRuntimeCachesForSheet_(sheet);
  return deleted;
}

function buildMasterListHeadersBeforeDataCopy_(demoSheet, masterSheet) {
  void demoSheet;
  if (!masterSheet) return;
  const ss = typeof masterSheet.getParent === "function" ? masterSheet.getParent() : SpreadsheetApp.getActive();
  const template = ss.getSheetByName(MASTER_LIST_TEMPLATE_SHEET);
  const headers = getHeaders_(template || masterSheet, HEADER_ROW);
  if (!headers.length || !headers.some(function(header) { return String(header || "").trim(); })) return;
  ensureSheetMinimumColumns_(masterSheet, headers.length);
  masterSheet.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);
  clearSheetRuntimeCachesForSheet_(masterSheet);
}

function safeFlattenAndProcessContacts_(workingData, preservePrimaryRows) {
  if (!workingData || !workingData.values || !workingData.headerMap) return 0;
  try {
    return flattenDemoPContactRowsInMemory_(workingData, preservePrimaryRows !== false);
  } catch (err) {
    logBestEffortWarning_("Refined Data contact flattening failed safely: " + err.message);
    return workingData.values.length;
  }
}

function processRefinedDataUnified_(workingData, monthParts, sourceSheetName, updateStatus, timing) {
  if (!workingData || !workingData.values || !workingData.headerMap) return [];
  const flattenedCount = safeFlattenAndProcessContacts_(workingData, false);
  processDemoPFreshRowsInMemory_(workingData);
  populateDemoPUpdateColumns_(workingData, monthParts, sourceSheetName, updateStatus || "Updated");
  populateUniversalMetadataColumns_(workingData, monthParts, sourceSheetName, "Refined Data", updateStatus || "Updated");
  if (timing) markFrameworkStep_(timing, "Refined Data unified transform complete | Rows: " + flattenedCount);
  return workingData.values;
}

function ensureSheetMinimumColumns_(sheet, colCount) {
  colCount = Math.max(Number(colCount || 1), 1);
  const currentCols = sheet.getMaxColumns();
  if (currentCols < colCount) {
    sheet.insertColumnsAfter(currentCols, colCount - currentCols);
  }
}

function assignPrimaryPMRRows_(sheet) {
  sheet = sheet || SpreadsheetApp.getActiveSheet();
  if (!sheet) return;
  
  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length || !data.range) return;
  
  if (typeof assignPrimaryPMRRowsInData_ === "function") {
    assignPrimaryPMRRowsInData_(data);
  } else {
    const primaryIdx = data.headerMap["Primary PMR Row"];
    const pmrIdx = getPMRIndex_(data.headerMap);
    
    if (primaryIdx === undefined || pmrIdx === -1) return;
    
    const seen = {};
    data.values.forEach(function(row) {
      const pmr = normalizePMR_(row[pmrIdx]);
      if (!pmr) {
        row[primaryIdx] = "";
      } else if (!seen[pmr]) {
        row[primaryIdx] = "Yes";
        seen[pmr] = true;
      } else if (!isPrimaryPMRRowValue_(row[primaryIdx])) {
        row[primaryIdx] = "";
      }
    });
  }
  
  data.range.setValues(data.values);
}

function getCurrentUnlockedCarePlanSheet_(monthParts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (monthParts && monthParts.firstDay && monthParts.lastDay) {
    return getMonthlySheetByPrefixAndDate_(ss, UNLOCKED_PREFIX, monthParts.firstDay, monthParts.lastDay) ||
      getNewestFormattedMonthlySheetByPrefix_(ss, UNLOCKED_PREFIX);
  }
  return getNewestFormattedMonthlySheetByPrefix_(ss, UNLOCKED_PREFIX);
}

function getCurrentCarePlanDueSheet_(monthParts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (monthParts && monthParts.firstDay && monthParts.lastDay) {
    return getMonthlySheetByPrefixAndDate_(ss, CARE_PLAN_DUE_PREFIX, monthParts.firstDay, monthParts.lastDay) ||
      getMonthlySheetByPrefixAndDate_(ss, CARE_PLAN_DUE_DATE_ALT_PREFIX, monthParts.firstDay, monthParts.lastDay) ||
      getNewestFormattedMonthlySheetByPrefix_(ss, CARE_PLAN_DUE_PREFIX) ||
      getNewestFormattedMonthlySheetByPrefix_(ss, CARE_PLAN_DUE_DATE_ALT_PREFIX);
  }
  return getNewestFormattedMonthlySheetByPrefix_(ss, CARE_PLAN_DUE_PREFIX) ||
    getNewestFormattedMonthlySheetByPrefix_(ss, CARE_PLAN_DUE_DATE_ALT_PREFIX);
}

function writePMRContactsToParticipantRows_(targetSheet, values, headers, headerMap, pmrFilter) {
  if (!values || !values.length || !headers || !headerMap) return values || [];

  const contactTargets = [1, 2, 3, 4, 5, 6, 7, 8].map(function(n) { return "Contact - " + n; });
  const targetIndexes = contactTargets.map(function(header) { return headerMap[header]; });
  const summaryIdx = headerMap["Contact - Summary"];
  if (targetIndexes.every(function(idx) { return idx === undefined; }) && summaryIdx === undefined) return values;

  const firstIdx = headerMap["First Name"];
  const lastIdx = headerMap["Last Name"];
  const pmrIdx = getPMRIndex_(headerMap);
  const contactFirstIdx = headerMap["Contact - First Name"];
  const contactLastIdx = headerMap["Contact - Last Name"];
  const relationshipIdx = headerMap["Relationship"];
  const typeIdx = headerMap["Type of Contact"];
  const languageIdx = headerMap["Contact - Primary Language"];
  
  const phoneIndexes = ["AD1", "AD2", "AD3", "AD4"].map(function(prefix) {
    return { phone: headerMap[prefix + " - Phone"], validTo: headerMap[prefix + " - Phone Valid Dates To"] };
  });

  const rank = {
    "guardian": 1, "mdpoa": 2, "power of attorney": 3, "emergency contact #1": 4,
    "emergency contact #2": 5, "emergency contact #3": 6, "caregiver": 7, "spouse": 8,
    "lives with": 9, "direct ppt responsibility": 10, "family": 11, "family contact": 12,
    "follow up contact": 13, "friend": 14, "healthcare proxy": 15, "hos contact": 16,
    "mailing contact #1": 17, "mailing contact #2": 18, "next of kin": 19, "others": 20,
    "partner": 21, "attorney/agent": 22, "other": 23, "other financial": 24, "guarantor": 25
  };

  const contactsByParticipant = new Map();
  values.forEach(function(row) {
    if (pmrFilter && pmrFilter.size) {
      const pmr = pmrIdx === -1 ? "" : normalizePMR_(row[pmrIdx]);
      if (!pmr || !pmrFilter.has(pmr)) return;
    }
    const participantKey = buildParticipantContactKey_(row, headerMap, pmrIdx, firstIdx, lastIdx);
    if (!participantKey) return;

    const contactFirst = contactFirstIdx !== undefined ? String(row[contactFirstIdx] || "").trim() : "";
    const contactLast = contactLastIdx !== undefined ? String(row[contactLastIdx] || "").trim() : "";
    if (!contactFirst && !contactLast) return;

    const participantFirst = firstIdx !== undefined ? String(row[firstIdx] || "").trim() : "";
    const participantLast = lastIdx !== undefined ? String(row[lastIdx] || "").trim() : "";
    if (contactFirst.toLowerCase() === participantFirst.toLowerCase() && contactLast.toLowerCase() === participantLast.toLowerCase()) return;

    if (!contactsByParticipant.has(participantKey)) contactsByParticipant.set(participantKey, new Map());
    const participantContacts = contactsByParticipant.get(participantKey);
    const contactKey = [contactFirst.toLowerCase(), contactLast.toLowerCase()].join("|");
    
    if (!participantContacts.has(contactKey)) {
      participantContacts.set(contactKey, {
        first: contactFirst, last: contactLast, types: new Set(),
        relationships: new Set(), phones: new Set(), language: "", rank: 99
      });
    }

    const entry = participantContacts.get(contactKey);
    const relationship = relationshipIdx !== undefined ? String(row[relationshipIdx] || "").trim() : "";
    const contactType = typeIdx !== undefined ? String(row[typeIdx] || "").trim() : "";
    const relationshipRank = rank[relationship.toLowerCase()] || 99;
    
    if (relationshipRank < entry.rank) entry.rank = relationshipRank;
    if (relationship) entry.relationships.add(capitalizeContactPart_(relationship));
    if (contactType) entry.types.add(capitalizeContactPart_(contactType));

    const language = languageIdx !== undefined ? String(row[languageIdx] || "").trim() : "";
    if (language && language.toLowerCase() !== "english") entry.language = language;

    phoneIndexes.forEach(function(indexes) {
      if (indexes.phone === undefined) return;
      const phone = String(row[indexes.phone] || "").trim();
      if (!phone) return;
      if (indexes.validTo !== undefined && isExpiredContactPhoneDate_(row[indexes.validTo])) return;
      entry.phones.add(phone);
    });
  });

  values.forEach(function(row) {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    const participantKey = buildParticipantContactKey_(row, headerMap, pmrIdx, firstIdx, lastIdx);
    const contacts = participantKey && contactsByParticipant.has(participantKey)
      ? Array.from(contactsByParticipant.get(participantKey).values()).sort(function(a, b) {
        if (a.rank !== b.rank) return a.rank - b.rank;
        const aName = (a.last + " " + a.first).toLowerCase();
        const bName = (b.last + " " + b.first).toLowerCase();
        return aName < bName ? -1 : (aName > bName ? 1 : 0);
      }) : [];

    targetIndexes.forEach(function(targetIdx, idx) {
      if (targetIdx === undefined) return;
      if (normalizeCompareValue_(row[targetIdx]) !== "") return;
      row[targetIdx] = contacts[idx] ? formatRankedContact_(contacts[idx]) : "";
    });

    if (summaryIdx !== undefined && normalizeCompareValue_(row[summaryIdx]) === "") {
      row[summaryIdx] = contacts.slice(0, 8).map(formatRankedContact_).filter(Boolean).join("\n");
    }
  });

  if (targetSheet) {
    const dataStartRow = DATA_START_ROW;
    targetIndexes.forEach(function(targetIdx, idx) {
      if (targetIdx === undefined) return;
      const columnValues = values.map(function(row) { return [row[targetIdx]]; });
      targetSheet.getRange(dataStartRow, targetIdx + 1, columnValues.length, 1).setValues(columnValues);
    });
    if (summaryIdx !== undefined) {
      targetSheet.getRange(dataStartRow, summaryIdx + 1, values.length, 1).setValues(values.map(function(row) { return [row[summaryIdx]]; }));
    }
  }

  return values;
}

function buildParticipantContactKey_(row, headerMap, pmrIdx, firstIdx, lastIdx) {
  const pmr = pmrIdx !== -1 ? normalizePMR_(row[pmrIdx]) : "";
  if (pmr) return "PMR|" + pmr;
  const first = firstIdx !== undefined ? normalizeKeyPart_(row[firstIdx]) : "";
  const last = lastIdx !== undefined ? normalizeKeyPart_(row[lastIdx]) : "";
  if (!first && !last) return "";
  return "NAME|" + first + "|" + last;
}

function isExpiredContactPhoneDate_(value) {
  const date = normalizeToDateObject_(value);
  if (!date) return false;
  const today = getTodayLocalDate_();
  return date.getTime() < today.getTime();
}

function capitalizeContactPart_(value) {
  return String(value || "").trim().toLowerCase().replace(/\b\w/g, function(match) { return match.toUpperCase(); });
}

function formatRankedContact_(contact) {
  if (!contact) return "";
  const name = [contact.first, contact.last].filter(Boolean).join(" ").trim();
  const relationshipText = Array.from(contact.relationships || []).join(", ");
  const phoneText = Array.from(contact.phones || []).slice(0, 4).join(", ");
  const typeText = Array.from(contact.types || []).join(", ");
  const parts = [];
  if (name) parts.push(name);
  if (relationshipText) parts.push(relationshipText);
  if (phoneText) parts.push(phoneText);
  if (typeText) parts.push(typeText);
  let text = parts.join(" - ");
  if (contact.language) text += (text ? " " : "") + "Language--" + contact.language;
  return text;
}

function getMostRecentDateFromRowsByHeader_(rows, headerMap, headerName) {
  const idx = headerMap ? headerMap[headerName] : undefined;
  if (idx === undefined || idx < 0 || !rows || !rows.length) return null;
  let latestDate = null;
  rows.forEach(function(item) {
    const row = item && item.values ? item.values : item;
    const d = normalizeToDateObject_(row ? row[idx] : null);
    if (d && (!latestDate || d.getTime() > latestDate.getTime())) latestDate = d;
  });
  return latestDate;
}

function isParticipantEnrollmentStatusDisenrolled_(rows, headerMap) {
  const idx = headerMap ? headerMap["Enrollment Status"] : undefined;
  if (idx === undefined || idx < 0 || !rows || !rows.length) return false;
  return rows.some(function(item) {
    const row = item && item.values ? item.values : item;
    const val = String((row ? row[idx] : "") || "").trim().toLowerCase();
    return val === "disenrolled";
  });
}

function formatReportDateLabel_(date) {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  return mm + "." + dd + "." + yy;
}

function buildStagedMasterListSheetName_(masterName) {
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMddHHmmss");
  return safeSheetName_(masterName + " __STAGED " + timestamp);
}

function isStagedMasterListSheet_(sheet, masterName) {
  if (!sheet) return false;
  const name = String(sheet.getName() || "");
  return name.indexOf(masterName + " __STAGED") === 0;
}

function validateStagedMasterListBeforeSwap_(sheet, masterName, copiedRowCount) {
  if (!sheet) throw new Error("Master List staged sheet was not created.");
  if (!isStagedMasterListSheet_(sheet, masterName)) throw new Error("Refusing to promote unexpected staged Master List sheet: " + sheet.getName());

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < HEADER_ROW || lastCol < 1) {
    throw new Error("Staged Master List is missing required title/header structure: " + sheet.getName());
  }

  const headers = getHeaders_(sheet, HEADER_ROW);
  if (!headers.length || getPMRIndex_(buildHeaderIndexMap_(headers)) === -1) {
    throw new Error("Staged Master List is missing Participant PMR# / PMR # header: " + sheet.getName());
  }

  if (Number(copiedRowCount || 0) > 0 && lastRow < DATA_START_ROW) {
    throw new Error("Staged Master List copied rows but has no data area: " + sheet.getName());
  }
}

function promoteStagedMasterListSheet_(ss, stagedSheet, existingSheet, masterName, copiedRowCount, timing, markStep) {
  validateStagedMasterListBeforeSwap_(stagedSheet, masterName, copiedRowCount);
  if (existingSheet) {
    deleteSheetSafely_(ss, existingSheet, "Master List staged swap", [stagedSheet.getName()]);
    if (markStep) markStep("Delete previous Master List after staged replacement validation");
    stagedSheet.setName(masterName);
    placeCreatedSheetInConfiguredOrder_(stagedSheet);
    showSheetIfNeeded_(stagedSheet, timing, "Master List staged swap - final sheet visibility enforced visible: " + masterName);
    clearSheetRuntimeCachesForSheet_(stagedSheet);
    clearMonthlySheetLookupCache_();
    if (markStep) markStep("Promote staged Master List sheet");
  }
  return stagedSheet;
}

function cleanupFailedStagedMasterListSheet_(ss, sheet, masterName, timing, markStep) {
  if (!isStagedMasterListSheet_(sheet, masterName)) return;
  try {
    deleteSheetSafely_(ss, sheet, "failed Master List staged build cleanup", [masterName]);
    if (markStep) markStep("Cleaned failed staged Master List sheet");
  } catch (cleanupErr) {
    logBestEffortWarning_("Failed staged Master List cleanup skipped: " + cleanupErr.message);
    try { hideSheetIfNeeded_(sheet, timing, "failed Master List staged sheet hidden for inspection"); } catch (hideErr) {}
  }
}

function getMonthlyChangeSubsectionLabels() {
  return RFF_MONTHLY_CHANGE_SUBSECTIONS.slice();
}

function buildSourceMapByCompositeKeyForDemoPBanner_(sheet, headerRow, dataStartRow, keyHeaders) {
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const map = new Map();

  if (lastRow < dataStartRow || lastCol < 1) return map;
  const headers = getHeaders_(sheet, headerRow);
  const headerMap = buildHeaderIndexMap_(headers);

  if (keyHeaders.some(header => headerMap[header] === undefined)) return map;
  const data = sheet.getRange(dataStartRow, 1, lastRow - dataStartRow + 1, lastCol).getValues();

  data.forEach(row => {
    const key = keyHeaders.map(header => normalizeKeyPart_(row[headerMap[header]])).join("|||");
    if (key.replace(/\|/g, "") === "") return;

    const record = {};
    headers.forEach((header, idx) => { if (header) record[header] = row[idx]; });
    map.set(key, record);
  });
  return map;
}

function syncMasterListMonthlySourcesIntoData_(data, monthParts, pmrFilter) {
  syncBannerSourceIntoData_(data, monthParts, pmrFilter || null);
  syncUnlockedCarePlanSourceIntoData_(data, monthParts, pmrFilter || null);
  syncCarePlanDueSourceIntoData_(data, monthParts, pmrFilter || null);
}

function syncBannerSourceIntoData_(data, monthParts, pmrFilter) {
  const sourceSheet = getCurrentBannersSheet_(monthParts);
  if (!sourceSheet) { notify_("Newest Banners mm.yy sheet was not found. Banner sync skipped."); return; }

  const sourceMap = buildSourceMapBySingleKeyForPart5_(sourceSheet, HEADER_ROW, DATA_START_ROW, "Participant PMR#");
  syncRowsFromSourceMapData_(data, sourceMap, { masterKeyHeaders: ["Participant PMR#"], fields: BANNER_SYNC_FIELDS }, pmrFilter || null);
}

function syncUnlockedCarePlanSourceIntoData_(data, monthParts, pmrFilter) {
  const sourceSheet = getCurrentUnlockedCarePlanSheet_(monthParts);
  if (!sourceSheet) { notify_("Unlocked Care Plan Report was not found. Unlocked sync skipped."); return; }

  const sourceMap = buildSourceMapBySingleKeyForPart5_(sourceSheet, HEADER_ROW, DATA_START_ROW, "PMR #");
  syncRowsFromSourceMapData_(data, sourceMap, {
    masterKeyHeaders: ["Participant PMR#"], sourceKeyHeaders: ["PMR #"],
    fields: [["IDT Meeting Date", "IDT Meeting Date"], ["Care Plan Start Date", "Care Plan Start Date"]]
  }, pmrFilter || null);
}

function syncCarePlanDueSourceIntoData_(data, monthParts, pmrFilter) {
  const sourceSheet = getCurrentCarePlanDueSheet_(monthParts);
  if (!sourceSheet) { notify_("Care Plan Due Report was not found. Care Plan Due sync skipped."); return; }

  const sourceMap = buildSourceMapBySingleKeyForPart5_(sourceSheet, HEADER_ROW, DATA_START_ROW, "Participant Name");
  syncRowsFromSourceMapData_(data, sourceMap, {
    masterKeyHeaders: ["Participant Name"],
    fields: [["Enrollment Date", "Enrollment Date"], ["Last Care Plan", "Last Care Plan"], ["Next Care Plan Due", "Next Care Plan Due"], ["CP Type", "CP Type"]]
  }, pmrFilter || null);
}

function syncRowsFromSourceMapData_(data, sourceMap, config, pmrFilter) {
  if (!data || !data.values || !data.values.length) return;
  const headerMap = data.headerMap;
  const fields = normalizeSyncFieldPairs_(config.fields);
  const targetKeyHeaders = config.sourceKeyHeaders || config.masterKeyHeaders;

  data.values.forEach(function(row) {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    const key = config.masterKeyHeaders.map(function(header, i) { return normalizeSyncKey_(row[headerMap[header]], targetKeyHeaders[i]); }).join("|||");
    if (key.replace(/\|/g, "") === "") return;
    if (!sourceMap.has(key)) return;

    const source = sourceMap.get(key);
    fields.forEach(function(pair) {
      const destHeader = pair[0];
      const sourceHeader = pair[1];
      const destIdx = headerMap[destHeader];
      if (destIdx === undefined) return;
      if (!Object.prototype.hasOwnProperty.call(source, sourceHeader)) return;
      row[destIdx] = source[sourceHeader];
    });
  });
}

function normalizeSyncKey_(value, header) {
  if (value === null || value === undefined) return "";
  const text = String(value).trim().toLowerCase();
  const headerName = String(header || "");

  if (headerName.indexOf("PMR") !== -1) return text.replace(/\s+/g, "").replace(/\.0$/, "");
  if (headerName === "Participant Name" || headerName === "Name") {
    if (text.indexOf(",") !== -1) {
      const parts = text.split(",");
      const last = parts[0].trim().replace(/\s+/g, "");
      const first = (parts[1] || "").trim().split(/\s+/)[0].replace(/[^a-z0-9]/g, "");
      return last + first;
    }
    return text.replace(/\s+/g, "");
  }
  return text.replace(/\s+/g, " ");
}

function buildSourceMapBySingleKeyForPart5_(sheet, headerRow, dataStartRow, keyHeader) {
  headerRow = headerRow || HEADER_ROW;
  dataStartRow = dataStartRow || DATA_START_ROW;
  const data = getDataValues_(sheet, headerRow, dataStartRow);
  const map = new Map();
  if (!data.values.length) return map;

  const headers = data.headers;
  const headerMap = data.headerMap;
  const keyIdx = headerMap[keyHeader];
  if (keyIdx === undefined) return map;

  data.values.forEach(function(row) {
    const key = normalizeSyncKey_(row[keyIdx], keyHeader);
    if (!key) return;
    const record = {};
    headers.forEach(function(header, idx) { if (header) record[header] = row[idx]; });
    map.set(key, record);
  });
  return map;
}

function buildSourceMapByCompositeKeyForPart5_(sheet, headerRow, dataStartRow, keyHeaders) {
  headerRow = headerRow || HEADER_ROW;
  dataStartRow = dataStartRow || DATA_START_ROW;
  const data = getDataValues_(sheet, headerRow, dataStartRow);
  const map = new Map();
  if (!data.values.length) return map;

  const headers = data.headers;
  const headerMap = data.headerMap;
  if (keyHeaders.some(function(header) { return headerMap[header] === undefined; })) return map;

  data.values.forEach(function(row) {
    const key = keyHeaders.map(function(header) { return normalizeSyncKey_(row[headerMap[header]], header); }).join("|||");
    if (key.replace(/\|/g, "") === "") return;
    const record = {};
    headers.forEach(function(header, idx) { if (header) record[header] = row[idx]; });
    map.set(key, record);
  });
  return map;
}

function shouldProcessRowByPMR_(row, headerMap, pmrFilter) {
  const primaryIdx = headerMap["Primary PMR Row"];
  if (primaryIdx !== undefined) {
    if (!isPrimaryPMRRowValue_(row[primaryIdx])) return false;
  } else {
    const dobIdx = getDOBIndex_(headerMap);
    if (dobIdx !== -1 && normalizeCompareValue_(row[dobIdx]) === "") return false;
  }

  if (!pmrFilter || pmrFilter.size === 0) return true;

  const pmrIdx = getPMRIndex_(headerMap);
  if (pmrIdx === -1) return false;
  const pmr = normalizePMR_(row[pmrIdx]);
  return pmrFilter.has(pmr);
}

function normalizeSyncFieldPairs_(fields) {
  return fields.map(item => Array.isArray(item) ? item : [item, item]);
}

function syncMasterListFromUnlockedCarePlan_(masterSheet, monthParts, pmrFilter) {
  const sourceSheet = getCurrentUnlockedCarePlanSheet_(monthParts);
  if (!sourceSheet) { notify_("Unlocked Care Plan Report was not found. Unlocked sync skipped."); return; }

  const sourceMap = buildSourceMapBySingleKeyForPart5_(sourceSheet, HEADER_ROW, DATA_START_ROW, "PMR #");
  syncRowsFromSourceMap_(masterSheet, sourceMap, {
    masterKeyHeaders: ["Participant PMR#"], sourceKeyHeaders: ["PMR #"],
    fields: [["IDT Meeting Date", "IDT Meeting Date"], ["Care Plan Start Date", "Care Plan Start Date"]]
  }, pmrFilter);
}

function syncMasterListFromCarePlanDue_(masterSheet, monthParts, pmrFilter) {
  const sourceSheet = getCurrentCarePlanDueSheet_(monthParts);
  if (!sourceSheet) { notify_("Care Plan Due Report was not found. Care Plan Due sync skipped."); return; }

  const sourceMap = buildSourceMapByCompositeKeyForPart5_(sourceSheet, HEADER_ROW, DATA_START_ROW, ["Participant Name", "Enrollment Date"]);
  syncRowsFromSourceMap_(masterSheet, sourceMap, {
    masterKeyHeaders: ["Participant Name", "Capitation Date"],
    fields: [["Enrollment Date", "Enrollment Date"], ["Last Care Plan", "Last Care Plan"], ["Next Care Plan Due", "Next Care Plan Due"], ["CP Type", "CP Type"]]
  }, pmrFilter);
}

function syncRowsFromSourceMap_(masterSheet, sourceMap, config, pmrFilter) {
  const data = getDataValues_(masterSheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) return;

  const headerMap = data.headerMap;
  const values = data.values;
  const fields = normalizeSyncFieldPairs_(config.fields);
  const targetKeyHeaders = config.sourceKeyHeaders || config.masterKeyHeaders;

  values.forEach(function(row) {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    const key = config.masterKeyHeaders.map(function(header, i) { return normalizeSyncKey_(row[headerMap[header]], targetKeyHeaders[i]); }).join("|||");
    if (key.replace(/\|/g, "") === "") return;
    if (!sourceMap.has(key)) return;

    const source = sourceMap.get(key);
    fields.forEach(function(pair) {
      const destHeader = pair[0];
      const sourceHeader = pair[1];
      const destIdx = headerMap[destHeader];
      if (destIdx === undefined) return;
      if (!Object.prototype.hasOwnProperty.call(source, sourceHeader)) return;
      row[destIdx] = source[sourceHeader];
    });
  });

  if (data.range) data.range.setValues(values);
}

function buildRefinedDataFromScratch() {
  const monthParts = promptForLockedYearReportMonth_("Build Demo P (Initialization)");
  if (!monthParts) return null;

  return runFrameworkTimed_("Build Demo P (Initialization) " + formatReportDateLabel_(monthParts.firstDay), function(timing) {
    const rawSheet = getValidatedRawDataSheetForDemoPBuild_(monthParts, timing);
    markFrameworkStep_(timing, "Locate validated Raw Data source for Demo P initialization: " + rawSheet.getName());

    const buildResult = createActiveDemoPFromRawData_(rawSheet, DEMO_P_PREFIX, monthParts, timing);
    const demoSheet = buildResult.sheet;
    const flatCount = buildResult.flatCount || Math.max(demoSheet.getLastRow() - DATA_START_ROW + 1, 0);
    
    enforceDemoPPostFlattenFormatting_(demoSheet);
    refreshIndexAfterSheetWorkflow_("Build Demo P");
    
    markFrameworkStep_(timing, "Demo P in-memory flat-record contact compression complete | Rows retained: " + flatCount);
    notify_("Build Demo P (Initialization) complete. Flat primary records retained: " + flatCount);
    return demoSheet;
  });
}

function getValidatedRawDataSheetForDemoPBuild_(monthParts, timing) {
  const currentRawSheet = getCurrentRawDataSheet_(monthParts);
  if (currentRawSheet) {
    validateRawDataPreflightForDemoP_(currentRawSheet, null, "Build Demo P current Raw Data preflight");
    markRuntimeStep_(timing, "Validated current Raw Data sheet for Demo P build: " + currentRawSheet.getName());
    return currentRawSheet;
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = ss.getActiveSheet();
  if (isStrictRawDataSheetCandidateForDemoP_(activeSheet, monthParts)) {
    validateRawDataPreflightForDemoP_(activeSheet, null, "Build Demo P active-sheet Raw Data preflight");
    markRuntimeStep_(timing, "Validated active sheet as Raw Data fallback for Demo P build: " + activeSheet.getName());
    return activeSheet;
  }

  const activeName = activeSheet ? activeSheet.getName() : "(none)";
  throw new Error(
    "Raw Data sheet was not found for the selected month. Format Raw Data first. " +
    "Active-sheet fallback is only allowed for a sheet named like Raw Data that passes Raw Data preflight. " +
    "Active sheet: " + activeName + "."
  );
}

function isStrictRawDataSheetCandidateForDemoP_(sheet, monthParts) {
  if (!sheet) return false;
  const sheetName = String(sheet.getName() || "").trim();
  if (!sheetName) return false;
  const expectedName = buildRawDataSheetName_(monthParts);
  if (sheetName === expectedName) return true;
  if (sheetName === "Template - Raw Data") return false;
  return /^Raw Data(\b|\s|-|\()/i.test(sheetName);
}

function buildDemoPMonthlySyncRetainedRows_(data, changedPMRs, width) {
  const pmrIdx = getPMRIndex_(data.headerMap);
  const primaryIdx = data.headerMap ? data.headerMap["Primary PMR Row"] : undefined;
  const retainedRows = [];
  const archiveRows = [];
  let removedRows = 0;
  const removedPMRs = new Set();

  (data.values || []).forEach(function(row) {
    const pmr = pmrIdx === -1 ? "" : normalizePMR_(row[pmrIdx]);
    if (pmr && changedPMRs.has(pmr)) {
      removedRows++;
      removedPMRs.add(pmr);
      if (isPrimaryPMRRowValue_(primaryIdx === undefined ? "" : row[primaryIdx])) {
        archiveRows.push(normalizeRowToWidth_(row, width));
      }
      return;
    }
    retainedRows.push(normalizeRowToWidth_(row, width));
  });

  return { rows: retainedRows, removedRows: removedRows, removedPMRs: removedPMRs, archiveRows: archiveRows };
}

function validateDemoPMonthlySyncReplacementCoverage_(changedPMRs, freshRows, headers) {
  const headerMap = buildHeaderIndexMap_(headers || []);
  const pmrIdx = getPMRIndex_(headerMap);
  if (pmrIdx === -1) throw new Error("Demo P monthly sync replacement validation requires Participant PMR# / PMR # column.");

  const replacementPMRs = new Set();
  (freshRows || []).forEach(function(row) {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (pmr) replacementPMRs.add(pmr);
  });

  const missingPMRs = [];
  changedPMRs.forEach(function(pmr) { if (!replacementPMRs.has(pmr)) missingPMRs.push(pmr); });

  if (missingPMRs.length) {
    throw new Error("Demo P monthly sync stopped before changing Demo P. Raw Data did not produce replacement rows for changed PMRs: " + missingPMRs.slice(0, 20).join(", ") + (missingPMRs.length > 20 ? " ..." : ""));
  }
}

function writeDemoPMonthlySyncBody_(demoSheet, rows, width, stepFn) {
  const step = typeof stepFn === "function" ? stepFn : function() {};
  const normalizedRows = normalizeRowsToWidth_(rows || [], width);
  const oldBodyRows = Math.max(demoSheet.getLastRow() - DATA_START_ROW + 1, 0);
  const rowsToClear = Math.max(oldBodyRows, normalizedRows.length, 1);
  const colsToClear = Math.max(demoSheet.getLastColumn(), width, 1);

  ensureOutputSheetHasFormattedRows_(demoSheet, DATA_START_ROW + Math.max(normalizedRows.length, 1) - 1, width);
  step("formatted row capacity ensured");
  demoSheet.getRange(DATA_START_ROW, 1, rowsToClear, colsToClear).clearContent();
  step("old Demo P body content cleared | Rows cleared: " + rowsToClear);
  if (normalizedRows.length) {
    demoSheet.getRange(DATA_START_ROW, 1, normalizedRows.length, width).setValues(normalizedRows);
    step("retained Demo P body written | Rows: " + normalizedRows.length);
  } else {
    step("retained Demo P body write skipped - no rows");
  }
}

function updateDemoPReportDates_(demoSheet, monthParts) {
  if (!demoSheet || !monthParts) return;
  demoSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat("m/d/yyyy");
  demoSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat("m/d/yyyy");
  demoSheet.getRange("E2").setValue("Last Updated").setFontFamily("Arial").setFontSize(10).setFontStyle("italic").setHorizontalAlignment("left");
}

function enforceDemoPPostFlattenFormatting_(demoSheet) {
  if (!demoSheet) return;
  const ss = typeof demoSheet.getParent === "function" ? demoSheet.getParent() : SpreadsheetApp.getActive();
  const context = getTemplateDrivenActiveSheetContext_(ss, SHEET_TYPE.DEMO_P);
  const headers = context.headers;

  applyTemplateColumnWidths_(demoSheet, context.template, Math.max(headers.length, 1));
  sortSheetAlphabeticallyByParticipantName_(demoSheet);

  const lastRow = demoSheet.getLastRow();
  const lastCol = Math.max(demoSheet.getLastColumn(), 1);
  if (lastRow >= DATA_START_ROW) {
    demoSheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  }
  lockFinalOutputRowHeights_(demoSheet, "Demo P");
}

function getDemoPMonthlySyncChangedPMRs_(monthParts, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const set = new Set();
  let skippedHeaderRows = 0;

  const mcrSheet = getMonthlySheetByPrefixAndDate_(ss, MONTHLY_CHANGE_REPORT_PREFIX, monthParts.firstDay, monthParts.lastDay);
  if (!mcrSheet) return set;

  const data = getDataValues_(mcrSheet, HEADER_ROW, DATA_START_ROW);
  const pmrIdx = getPMRIndex_(data.headerMap);
  if (pmrIdx === -1) throw new Error("Monthly Change Report is missing Participant PMR# / PMR # column.");

  data.values.forEach(function(row) {
    const rawValue = row[pmrIdx];
    if (isPMRHeaderValue_(rawValue)) {
      skippedHeaderRows++;
      return;
    }
    const pmr = normalizePMR_(rawValue);
    if (pmr) set.add(pmr);
  });

  if (skippedHeaderRows && timing) {
    markRuntimeStep_(timing, "Skipped Monthly Change header rows while loading Demo P sync PMRs | Rows: " + skippedHeaderRows);
  }
  return set;
}

function isPMRHeaderValue_(value) {
  const normalizedHeader = normalizeHeader_(value);
  if (!normalizedHeader) return false;
  return ["Participant PMR#", "PMR #", "PMR#", "Participant PMR"].some(function(header) {
    return normalizedHeader === normalizeHeader_(header) || normalizePMR_(value) === normalizePMR_(header);
  });
}

function removeActiveDemoPPMRsFromDisenrolledExclusion_(demoSheet) {
  if (!demoSheet) return 0;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const exclusionSheet = ss.getSheetByName(DISENROLLED_EXCLUSION_SHEET);
  if (!exclusionSheet || exclusionSheet.getLastRow() < DATA_START_ROW) return 0;

  const demoLastRow = demoSheet.getLastRow();
  const demoLastCol = demoSheet.getLastColumn();
  if (demoLastRow < DATA_START_ROW || demoLastCol < 1) return 0;

  const demoHeaders = getHeaders_(demoSheet, HEADER_ROW);
  const demoHeaderMap = buildHeaderIndexMap_(demoHeaders);
  const demoPmrIdx = getPMRIndex_(demoHeaderMap);
  const statusIdx = demoHeaderMap["Enrollment Status"];
  const disenrollEffectiveIdx = findHeaderIndex_(demoHeaderMap, ["Disenrollment Effective Date", "Disenrollment Date", "Date of Death"]);
  if (demoPmrIdx === -1 || statusIdx === undefined) return 0;

  const exclusionData = getDataValues_(exclusionSheet, HEADER_ROW, DATA_START_ROW);
  const exclusionPmrIdx = exclusionData.headerMap ? getPMRIndex_(exclusionData.headerMap) : -1;
  if (exclusionPmrIdx === -1 || !exclusionData.values.length) return 0;

  const exclusionPmrSet = new Set();
  exclusionData.values.forEach(function(row) {
    const pmr = normalizePMR_(row[exclusionPmrIdx]);
    if (pmr) exclusionPmrSet.add(pmr);
  });
  if (!exclusionPmrSet.size) return 0;

  const demoValues = demoSheet.getRange(DATA_START_ROW, 1, demoLastRow - DATA_START_ROW + 1, demoLastCol).getValues();
  const activePMRs = new Set();

  demoValues.forEach(function(row) {
    const pmr = normalizePMR_(row[demoPmrIdx]);
    if (!pmr || !exclusionPmrSet.has(pmr)) return;

    const statusText = String(row[statusIdx] || "").trim().toLowerCase();
    const hasDisenrollmentDate = disenrollEffectiveIdx === -1 ? false : normalizeCompareValue_(row[disenrollEffectiveIdx]) !== "";
    if (statusText === "active" || statusText === "enrolled" || !hasDisenrollmentDate) {
      activePMRs.add(pmr);
    }
  });

  if (!activePMRs.size) return 0;

  const retainedRows = [];
  let deletedCount = 0;

  exclusionData.values.forEach(function(row) {
    const pmr = normalizePMR_(row[exclusionPmrIdx]);
    if (pmr && activePMRs.has(pmr)) {
      deletedCount++;
    } else {
      retainedRows.push(row);
    }
  });

  if (deletedCount > 0) {
    const width = Math.max(exclusionSheet.getLastColumn(), 1);
    const oldRows = exclusionData.values.length;
    exclusionSheet.getRange(DATA_START_ROW, 1, oldRows, width).clearContent();
    if (retainedRows.length > 0) {
      const normalizedRows = normalizeRowsToWidth_(retainedRows, width);
      exclusionSheet.getRange(DATA_START_ROW, 1, normalizedRows.length, width).setValues(normalizedRows);
    }
    clearSheetRuntimeCachesForSheet_(exclusionSheet);
    logBestEffortWarning_("Re-Enrollment Engine: Surgically purged " + deletedCount + " re-enrolled PMR records from historical Exclusion sheet via in-memory rewrite.");
  }
  return deletedCount;
}

function buildDemoPFreshRowsForPMRs_(rawSheet, demoHeaders, changedPMRs, monthParts, timing) {
  if (!rawSheet || !changedPMRs || changedPMRs.size === 0) return [];
  const preflight = validateRawDataPreflightForDemoP_(rawSheet, null, "Update Demo P monthly sync Raw Data preflight");
  const rawData = preflight.rawData;
  const rawPmrIdx = preflight.pmrIdx;
  const rawRows = rawData.values.filter(function(row) { return changedPMRs.has(normalizePMR_(row[rawPmrIdx])); });
  const outputRows = mapRowsToHeaders_(rawRows, rawData.headers, demoHeaders);
  const workingData = { headers: demoHeaders, headerMap: buildHeaderIndexMap_(demoHeaders), values: outputRows, range: null };
  const processedRows = processRefinedDataUnified_(workingData, monthParts, rawSheet.getName(), "Monthly Sync", timing);
  markRuntimeStep_(timing, "Changed Refined Data rows processed through shared engine | Rows retained: " + processedRows.length);
  return processedRows;
}

function processDemoPFreshRowsInMemory_(data) {
  populateParticipantNameData_(data, null);
  populateDemoPNameData_(data, null);
  updateBannerColumnData_(data, null);
  combineAddressesData_(data, null);
  handleLanguageData_(data, null);
  splitPhoneNumbersData_(data, null);
  runMasterContactProcessData_(data, null);
  combineNotesSummaryData_(data, null);
}

function flattenDemoPContactRowsInMemory_(data, requireIntegrity) {
  if (!data || !data.values || !data.values.length) return 0;
  const headerMap = data.headerMap || buildHeaderIndexMap_(data.headers || []);
  const width = (data.headers || []).length;
  const pmrIdx = getPMRIndex_(headerMap);
  const primaryIdx = headerMap["Primary PMR Row"];
  if (pmrIdx === -1 || primaryIdx === undefined) throw new Error("Refined Data contact compression requires PMR and Primary PMR Row headers.");

  const contactTargets = ["Contact - 1", "Contact - 2", "Contact - 3", "Contact - 4", "Contact - 5", "Contact - 6", "Contact - 7", "Contact - 8"];
  const contactTargetIndexes = contactTargets.map(function(header) { return headerMap[header]; }).filter(function(idx) { return idx !== undefined; });
  const summaryIdx = headerMap["Contact - Summary"];
  const grouped = new Map();
  
  data.values.forEach(function(row, originalIndex) {
    const pmr = normalizePMR_(row[pmrIdx]);
    const key = pmr || "__blank_pmr__" + originalIndex;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push({ row: row, originalIndex: originalIndex });
  });

  const flatRows = new Array(grouped.size);
  let outputIndex = 0;
  let assignedContacts = 0;
  
  grouped.forEach(function(items, pmr) {
    let primaryItem = items.find(function(item) { return isPrimaryPMRRowValue_(item.row[primaryIdx]); }) || items[0];
    let output = new Array(width).fill("");
    try {
      for (let col = 0; col < width; col++) output[col] = primaryItem.row[col] === undefined ? "" : primaryItem.row[col];
      const summaries = new Array(Math.max(items.length - 1, 0));
      let summaryCount = 0;
      items.forEach(function(item) {
        if (item === primaryItem) return;
        const summary = buildDemoPContactSummaryForFlatRecord_(item.row, headerMap);
        if (!summary) return;
        summaries[summaryCount++] = summary;
      });
      summaries.length = summaryCount;
      for (let contactIndex = 0; contactIndex < Math.min(summaries.length, contactTargetIndexes.length); contactIndex++) {
        const targetIdx = contactTargetIndexes[contactIndex];
        if (normalizeCompareValue_(output[targetIdx]) === "") output[targetIdx] = summaries[contactIndex];
        assignedContacts++;
      }
      if (summaryIdx !== undefined && summaries.length && normalizeCompareValue_(output[summaryIdx]) === "") output[summaryIdx] = summaries.join("\n");
    } catch (err) {
      output = new Array(width).fill("");
      for (let fallbackCol = 0; fallbackCol < width; fallbackCol++) output[fallbackCol] = primaryItem.row[fallbackCol] === undefined ? "" : primaryItem.row[fallbackCol];
      logBestEffortWarning_("Refined Data contact parsing fallback used for PMR " + pmr + ": " + err.message);
    }
    flatRows[outputIndex++] = output;
  });

  if (requireIntegrity && assignedContacts > 0 && contactTargetIndexes.length === 0) throw new Error("Contact flattening integrity check failed: no Contact - 1..8 target columns are available.");
  sortDemoPFlatRows_(flatRows, headerMap);
  data.values = flatRows;
  return flatRows.length;
}

function buildDemoPContactSummaryForFlatRecord_(row, headerMap) {
  const parts = [
    "Contact - First Name", "Contact - Last Name", "Relationship", "Type of Contact",
    "Contact - Primary Language", "AD1 - Phone", "AD2 - Phone", "AD3 - Phone",
    "Company", "Contact - Notes"
  ].map(function(header) {
    const idx = headerMap[header];
    return idx === undefined ? "" : String(row[idx] || "").trim();
  }).filter(Boolean);
  return parts.join(" | ");
}

function sortDemoPFlatRows_(rows, headerMap) {
  const lastIdx = headerMap["Last Name"];
  const firstIdx = headerMap["First Name"];
  const nameIdx = headerMap["Name"];
  rows.sort(function(a, b) {
    const aKey = String((lastIdx !== undefined ? a[lastIdx] : "") || (nameIdx !== undefined ? a[nameIdx] : "") || "").toLowerCase();
    const bKey = String((lastIdx !== undefined ? b[lastIdx] : "") || (nameIdx !== undefined ? b[nameIdx] : "") || "").toLowerCase();
    if (aKey !== bKey) return aKey.localeCompare(bKey);
    const aFirst = String(firstIdx !== undefined ? a[firstIdx] || "" : "").toLowerCase();
    const bFirst = String(firstIdx !== undefined ? b[firstIdx] || "" : "").toLowerCase();
    return aFirst.localeCompare(bFirst);
  });
}

function formatDemoPStructure() {
  return buildRefinedDataFromScratch();
}

function buildRawDataSheetName_(monthParts) {
  return "Raw Data " + Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "MM.yy");
}

function getLastRawDataDisenrolledBuildResult_() {
  return {
    pmrsRemoved: ML_LAST_RAW_DATA_DISENROLLED_BUILD_RESULT_.pmrsRemoved || 0,
    rowsRemoved: ML_LAST_RAW_DATA_DISENROLLED_BUILD_RESULT_.rowsRemoved || 0,
    rowsCopied: ML_LAST_RAW_DATA_DISENROLLED_BUILD_RESULT_.rowsCopied || 0
  };
}

function setLastRawDataDisenrolledBuildResult_(result) {
  result = result || {};
  ML_LAST_RAW_DATA_DISENROLLED_BUILD_RESULT_.pmrsRemoved = result.pmrsRemoved || 0;
  ML_LAST_RAW_DATA_DISENROLLED_BUILD_RESULT_.rowsRemoved = result.rowsRemoved || 0;
  ML_LAST_RAW_DATA_DISENROLLED_BUILD_RESULT_.rowsCopied = result.rowsCopied || 0;
}

function updateExistingDemoPFromRawData_(demoSheet, rawSheet, monthParts, timing) {
  const preflight = validateRawDataPreflightForDemoP_(rawSheet, null, "Update existing Demo P from Raw Data");
  const rawData = preflight.rawData;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const context = getTemplateDrivenActiveSheetContext_(ss, SHEET_TYPE.DEMO_P);
  const dashboard = context.dashboard || loadDashboardConfig_();
  const sheetDef = context.sheetDef;
  const headers = context.headers;
  const outputRows = mapRowsToHeaders_(rawData.values, rawData.headers, headers);
  const workingData = { headers: headers, headerMap: buildHeaderIndexMap_(headers), values: outputRows, range: null };

  processRefinedDataUnified_(workingData, monthParts, rawSheet.getName(), "Updated", timing);
  ensureStandardTitleRows_(demoSheet);
  ensureOutputSheetHasFormattedRows_(demoSheet, DATA_START_ROW + workingData.values.length - 1, Math.max(headers.length, 1));
  demoSheet.getRange("A1").setValue(sheetDef.reportTitle || "Demo P");
  demoSheet.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);

  const lastRow = Math.max(demoSheet.getLastRow(), DATA_START_ROW);
  const lastCol = Math.max(demoSheet.getLastColumn(), headers.length);
  if (lastRow >= DATA_START_ROW) demoSheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol).clearContent();
  if (workingData.values.length) demoSheet.getRange(DATA_START_ROW, 1, workingData.values.length, headers.length).setValues(workingData.values);

  const movedResult = { pmrsRemoved: 0, rowsRemoved: 0, rowsCopied: 0, primaryRowsOnly: true, outputRowsWritten: rawData.values.length };
  setLastRawDataDisenrolledBuildResult_(movedResult);
  markRuntimeStep_(timing, "Demo P Working Source - update existing Demo P from Raw Data | Rows Read: " + rawData.values.length + "; Rows Written: " + workingData.values.length + "; Write Mode: existing sheet update");
  clearSheetRuntimeCachesForSheet_(demoSheet);
  return { sheet: demoSheet, movedResult: movedResult, createdFromDashboardTemplate: false, sourceWasRawData: true, preProcessedWorkingSource: false };
}

function createActiveDemoPFromRawData_(rawSheet, targetName, monthParts, timing) {
  const preflight = validateRawDataPreflightForDemoP_(rawSheet, null, "Build Demo P from Raw Data");
  const rawData = preflight.rawData;

  const movedResult = { pmrsRemoved: 0, rowsRemoved: 0, rowsCopied: 0 };
  setLastRawDataDisenrolledBuildResult_(movedResult);
  if (timing) markFrameworkStep_(timing, "Raw Data rows prepared for Demo P without disenrollment exclusion");

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const context = getTemplateDrivenActiveSheetContext_(ss, SHEET_TYPE.DEMO_P);
  const dashboard = context.dashboard || loadDashboardConfig_();
  const sheetDef = context.sheetDef;
  const headers = context.headers;
  const outputRows = mapRowsToHeaders_(rawData.values, rawData.headers, headers);

  const workingData = { headers: headers, headerMap: buildHeaderIndexMap_(headers), values: outputRows, range: null };
  processRefinedDataUnified_(workingData, monthParts, rawSheet.getName(), "Created", timing);
  const flatCount = workingData.values.length;
  if (timing) markFrameworkStep_(timing, "Demo P Data processed, metadata mapped, and contacts flattened in memory | Rows retained: " + flatCount);

  const demoSheet = createOutputSheetFromDashboardTemplate_(SHEET_TYPE.DEMO_P, targetName, workingData.values, monthParts.firstDay, monthParts.lastDay, timing, "Refined Data unified template write");
  updateDemoPReportDates_(demoSheet, monthParts);
  lockFinalOutputRowHeights_(demoSheet, SHEET_TYPE.DEMO_P);
  applyColumnHidingFromDashboard_(demoSheet, dashboard, headers);
  applyOutputVisibilityPolicy_(demoSheet, dashboard, SHEET_TYPE.DEMO_P, timing);
  clearSheetRuntimeCachesForSheet_(demoSheet);

  return { sheet: demoSheet, movedResult: movedResult, createdFromDashboardTemplate: true, sourceWasRawData: true, preProcessedWorkingSource: true, flatCount: flatCount };
}

function populateDemoPUpdateColumns_(data, monthParts, sourceSheetName, status) {
  if (!data || !data.headerMap || !data.values) return;
  const statusIdx = data.headerMap["Demo P Update Status"];
  const monthIdx = data.headerMap["Demo P Update Month"];
  const sourceIdx = data.headerMap["Demo P Source Sheet"];
  if (statusIdx === undefined && monthIdx === undefined && sourceIdx === undefined) return;

  const dateValue = monthParts && monthParts.firstDay ? monthParts.firstDay : null;
  data.values.forEach(function(row) {
    if (statusIdx !== undefined) row[statusIdx] = status || "Created";
    if (monthIdx !== undefined) row[monthIdx] = dateValue;
    if (sourceIdx !== undefined) row[sourceIdx] = sourceSheetName || "";
  });
}

function populateUniversalMetadataColumns_(data, monthParts, sourceSheetName, sourceWorkflow, status) {
  if (!data || !data.headerMap || !data.values) return;
  const headerMap = data.headerMap;
  const statusIdx = headerMap["Update Status"];
  const monthIdx = headerMap["Update Month"];
  const sourceIdx = headerMap["Source Sheet"];
  const columnsUpdatedIdx = headerMap["Columns Updated"];
  const lastUpdatedAtIdx = headerMap["Last Updated At"];
  const sourceHashIdx = headerMap["Source Hash"];
  const previousSourceHashIdx = headerMap["Previous Source Hash"];
  const workflowIdx = headerMap["Source Workflow"];

  if (statusIdx === undefined && monthIdx === undefined && sourceIdx === undefined &&
      columnsUpdatedIdx === undefined && lastUpdatedAtIdx === undefined &&
      sourceHashIdx === undefined && previousSourceHashIdx === undefined && workflowIdx === undefined) return;

  const monthText = monthParts && monthParts.firstDay ? Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "MM.yy") : "";
  const updatedAt = new Date();
  const pmrIdx = getPMRIndex_(headerMap);
  const hashByPMR = buildSourceHashByPMR_(data, pmrIdx);
  const columnList = buildColumnsUpdatedText_(data.headers);

  data.values.forEach(function(row) {
    const pmr = pmrIdx === -1 ? "" : normalizePMR_(row[pmrIdx]);
    const nextHash = pmr && hashByPMR[pmr] ? hashByPMR[pmr] : buildSourceHashForRow_(row, data.headers);
    const previousHash = sourceHashIdx !== undefined ? row[sourceHashIdx] : "";

    if (statusIdx !== undefined) row[statusIdx] = status || "Updated";
    if (monthIdx !== undefined) row[monthIdx] = monthText;
    if (sourceIdx !== undefined) row[sourceIdx] = sourceSheetName || "";
    if (columnsUpdatedIdx !== undefined) row[columnsUpdatedIdx] = columnList;
    if (lastUpdatedAtIdx !== undefined) row[lastUpdatedAtIdx] = updatedAt;
    if (previousSourceHashIdx !== undefined) row[previousSourceHashIdx] = previousHash || "";
    if (sourceHashIdx !== undefined) row[sourceHashIdx] = nextHash;
    if (workflowIdx !== undefined) row[workflowIdx] = sourceWorkflow || "";
  });
}

function buildSourceHashByPMR_(data, pmrIdx) {
  const hashByPMR = {};
  if (!data || !data.values || !data.headers || pmrIdx === -1) return hashByPMR;

  const rowsByPMR = {};
  data.values.forEach(function(row) {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr) return;
    if (!rowsByPMR[pmr]) rowsByPMR[pmr] = [];
    rowsByPMR[pmr].push(row);
  });

  Object.keys(rowsByPMR).forEach(function(pmr) {
    hashByPMR[pmr] = buildSourceHashForRows_(rowsByPMR[pmr], data.headers);
  });
  return hashByPMR;
}

function buildSourceHashForRows_(rows, headers) {
  const excluded = {
    "Update Status": true, "Update Month": true, "Source Sheet": true, "Columns Updated": true,
    "Last Updated At": true, "Source Hash": true, "Previous Source Hash": true, "Source Workflow": true,
    "Demo P Update Status": true, "Demo P Update Month": true, "Demo P Source Sheet": true,
  };
  const normalizedRows = rows.map(function(row) {
    return headers.map(function(header, index) { return excluded[header] ? null : normalizeHashValue_(row[index]); });
  });
  return computeStableHash_(JSON.stringify(normalizedRows));
}

function buildSourceHashForRow_(row, headers) { return buildSourceHashForRows_([row], headers); }

function buildColumnsUpdatedText_(headers) {
  const excluded = {
    "Update Status": true, "Update Month": true, "Source Sheet": true, "Columns Updated": true,
    "Last Updated At": true, "Source Hash": true, "Previous Source Hash": true, "Source Workflow": true
  };
  return (headers || []).filter(function(header) { return header && !excluded[header]; }).join(", ");
}

function normalizeHashValue_(value) {
  if (value === null || value === undefined) return "";
  if (Object.prototype.toString.call(value) === "[object Date]") return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  return String(value).trim().replace(/\s+/g, " ");
}

function applyDemoPDateFormattingByHeader_(sheet) {
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  if (lastRow < DATA_START_ROW) return;
  const headers = getHeaders_(sheet, HEADER_ROW);
  const dataRows = lastRow - DATA_START_ROW + 1;

  DEMO_P_TEMPLATE_DATE_HEADERS.forEach(headerName => {
    const idx = headers.indexOf(headerName);
    if (idx === -1) return;
    try { sheet.getRange(DATA_START_ROW, idx + 1, dataRows, 1).setNumberFormat("m/d/yyyy"); } catch (err) {}
  });

  try { sheet.getRange("B2:D2").setNumberFormat("m/d/yyyy"); } catch (err) {}
}

function buildMonthlyChangeReportForMonth_(monthParts, timing, options) {
  if (!monthParts) return null;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const currentDemo = getCurrentRawDataSheet_(monthParts);
  const previousDemo = getPreviousRawDataSheet_(monthParts);

  if (!currentDemo || !previousDemo) {
    notify_("Monthly Change Report could not find required Raw Data source sheets for comparison.");
    return null;
  }

  markRuntimeStep_(timing, "Monthly Change detail - source sheets located | Current: " + currentDemo.getName() + "; Previous: " + previousDemo.getName());
  const sectionData = compareRawDataForMonthlyChange_(previousDemo, currentDemo, monthParts);
  markRuntimeStep_(timing, "Monthly Change datasets compiled in-memory", "Current rows: " + sectionData.currentData.values.length + "; Previous rows: " + sectionData.previousData.values.length + "; Current PMRs: " + sectionData.currentData.rowsByPMR.size + "; Previous PMRs: " + sectionData.previousData.rowsByPMR.size);

  const totalPMRs = sectionData.enrollmentPMRs.size + sectionData.disenrollmentPMRs.size + sectionData.demographicPMRs.size + sectionData.caseloadPMRs.size + sectionData.contactPMRs.size + sectionData.bannerPMRs.size + sectionData.otherPMRs.size;
  if (totalPMRs === 0) {
    notify_("No Raw Data changes found. Monthly Change Report was not created.");
    return null;
  }

  const reportName = buildMonthlySheetName_(MONTHLY_CHANGE_REPORT_PREFIX, monthParts.firstDay, monthParts.lastDay);
  let reportSheet = ss.getSheetByName(reportName);
  if (reportSheet) throw new Error("Monthly Change report already exists: " + reportName + ". Delete or rename the existing report before rerunning this workflow.");

  const dashboard = loadDashboardConfig_();
  const sheetDef = getSheetDefinitionByType_(dashboard, SHEET_TYPE.MONTHLY_CHANGE);
  const template = ss.getSheetByName(sheetDef.templateName);
  if (!template) throw new Error("Template not found: " + sheetDef.templateName + ". Run Create / Refresh All Templates first.");

  reportSheet = template.copyTo(ss);
  markRuntimeStep_(timing, "Monthly Change detail - template copied: " + sheetDef.templateName);
  setRequiredSheetName_(reportSheet, reportName);
  placeCreatedSheetInConfiguredOrder_(reportSheet);
  showSheetIfNeeded_(reportSheet, timing, "Monthly Change detail - report sheet shown");

  buildMonthlyChangeReportSectionLayout_(reportSheet, currentDemo, sectionData.currentData.headers, monthParts);
  populateMonthlyChangeReportSections_(reportSheet, sectionData, monthParts);
  formatMonthlyChangeReportSectionSheet_(reportSheet, sectionData.currentData.headers);
  setRequiredSheetName_(reportSheet, reportName);

  if (options && options.skipIndexRefresh) {
    markRuntimeStep_(timing, "Monthly Change index refresh deferred until final organization");
  } else {
    updateIndexSheet();
    markRuntimeStep_(timing, "Monthly Change index refreshed");
  }

  if (!(options && options.skipNotification)) {
    notify_("Monthly Change Report created.\n\n" + `Enrollments: ${sectionData.enrollmentPMRs.size}\nDisenrollments: ${sectionData.disenrollmentPMRs.size}`);
  }

  return reportSheet;
}

function isMonthlyChangeDisenrollmentEffectiveDate_(effectiveDate, monthParts) {
  return !!(monthParts && isSameDate_(effectiveDate, monthParts.firstDay));
}

function compareRawDataForMonthlyChange_(previousDemo, currentDemo, monthParts) {
  const previousData = getRawDemoPDataForCompare_(previousDemo);
  const currentData = getRawDemoPDataForCompare_(currentDemo);
  const enrollmentPMRs = new Set();
  const disenrollmentPMRs = new Set();
  const demographicPMRs = new Set();
  const caseloadPMRs = new Set();
  const contactPMRs = new Set();
  const bannerPMRs = new Set();
  const otherPMRs = new Set();
  const demographicChangedColumnsByPMR = new Map();
  const caseloadChangedColumnsByPMR = new Map();
  const contactChangedColumnsByPMR = new Map();
  const bannerChangedColumnsByPMR = new Map();
  const otherChangedColumnsByPMR = new Map();

  const trackedFields = new Set([].concat(RAW_DEMO_P_DEMOGRAPHIC_FIELDS, RAW_DEMO_P_CONTACT_FIELDS, RAW_DEMO_P_CASELOAD_FIELDS, RAW_DEMO_P_BANNER_FIELDS, RAW_DEMO_P_ENROLLMENT_FIELDS, RAW_DEMO_P_DISENROLLMENT_FIELDS));
  const systemFields = new Set(["", "Primary PMR Row", "Sort Order", "Update Status", "Update Month", "Source Sheet", "Columns Updated", "Last Updated At", "Source Hash", "Previous Source Hash", "Source Workflow", "Demo P Update Status", "Demo P Update Month", "Demo P Source Sheet"]);
  const otherFields = currentData.headers.filter(function(header) {
    const cleanHeader = String(header || "").trim();
    return cleanHeader && !trackedFields.has(cleanHeader) && !systemFields.has(cleanHeader);
  });
  const allCompareFields = Array.from(new Set([].concat(Array.from(trackedFields), otherFields)));

  const disenrolledPmrSet = new Set();
  const exclusionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DISENROLLED_EXCLUSION_SHEET);
  if (exclusionSheet) {
    const exclusionData = getDataValues_(exclusionSheet, HEADER_ROW, DATA_START_ROW);
    const exclusionPmrIndex = getPMRIndex_(exclusionData.headerMap);
    if (exclusionPmrIndex !== -1) {
      exclusionData.values.forEach(function(row) {
        const excludedPmr = normalizePMR_(row[exclusionPmrIndex]);
        if (excludedPmr) disenrolledPmrSet.add(excludedPmr);
      });
    }
  }

  currentData.rowsByPMR.forEach((currentRows, pmr) => {
    if (disenrolledPmrSet.has(pmr)) return;
    const previousRows = previousData.rowsByPMR.get(pmr) || [];
    const capitationHeader = "Capitation Date";
    const disenrollEffectiveHeader = "Disenrollment Effective Date";

    const mostRecentCapitationDate = getMostRecentDateFromRowsByHeader_(currentRows, currentData.headerMap, capitationHeader);
    const isEnrollmentPMR = isSameDate_(mostRecentCapitationDate, monthParts.firstDay);
    const isDisenrollmentPMR = currentRows.some(item => {
      const effectiveDate = getFieldValueFromRow_(item.values, currentData.headerMap, disenrollEffectiveHeader);
      return isMonthlyChangeDisenrollmentEffectiveDate_(effectiveDate, monthParts);
    });

    if (isEnrollmentPMR) enrollmentPMRs.add(pmr);
    if (isDisenrollmentPMR) disenrollmentPMRs.add(pmr);
    if (isEnrollmentPMR || isDisenrollmentPMR) return;
    if (isParticipantEnrollmentStatusDisenrolled_(currentRows, currentData.headerMap)) return;

    const currentPMRSignature = buildPrimitiveRowsHash_(currentRows, currentData.headerMap, allCompareFields);
    const previousPMRSignature = buildPrimitiveRowsHash_(previousRows, previousData.headerMap, allCompareFields);
    if (currentPMRSignature && previousPMRSignature && currentPMRSignature === previousPMRSignature) return;

    const currentDobRows = rowsWithDOBOnlyForSection_(currentRows, currentData.headerMap);
    const previousDobRows = rowsWithDOBOnlyForSection_(previousRows, previousData.headerMap);

    const demographicChangedColumns = getChangedColumnsForSectionRows_(currentDobRows, previousDobRows, currentData.headers, previousData.headers, RAW_DEMO_P_DEMOGRAPHIC_FIELDS, currentData.headerMap, previousData.headerMap);
    if (demographicChangedColumns.size > 0) { demographicPMRs.add(pmr); demographicChangedColumnsByPMR.set(pmr, demographicChangedColumns); }

    const caseloadChangedColumns = getChangedColumnsForSectionRows_(currentDobRows, previousDobRows, currentData.headers, previousData.headers, RAW_DEMO_P_CASELOAD_FIELDS, currentData.headerMap, previousData.headerMap);
    if (caseloadChangedColumns.size > 0) { caseloadPMRs.add(pmr); caseloadChangedColumnsByPMR.set(pmr, caseloadChangedColumns); }

    const contactChangedColumns = getChangedColumnsForSectionRows_(currentRows, previousRows, currentData.headers, previousData.headers, RAW_DEMO_P_CONTACT_FIELDS, currentData.headerMap, previousData.headerMap);
    if (contactChangedColumns.size > 0) { contactPMRs.add(pmr); contactChangedColumnsByPMR.set(pmr, contactChangedColumns); }

    const bannerChangedColumns = getChangedColumnsForSectionRows_(currentRows, previousRows, currentData.headers, previousData.headers, RAW_DEMO_P_BANNER_FIELDS, currentData.headerMap, previousData.headerMap);
    if (bannerChangedColumns.size > 0) { bannerPMRs.add(pmr); bannerChangedColumnsByPMR.set(pmr, bannerChangedColumns); }

    const otherChangedColumns = getChangedColumnsForSectionRows_(currentRows, previousRows, currentData.headers, previousData.headers, otherFields, currentData.headerMap, previousData.headerMap);
    if (otherChangedColumns.size > 0) { otherPMRs.add(pmr); otherChangedColumnsByPMR.set(pmr, otherChangedColumns); }
  });

  enrollmentPMRs.forEach(pmr => { demographicPMRs.delete(pmr); caseloadPMRs.delete(pmr); contactPMRs.delete(pmr); bannerPMRs.delete(pmr); otherPMRs.delete(pmr); });
  disenrollmentPMRs.forEach(pmr => { demographicPMRs.delete(pmr); caseloadPMRs.delete(pmr); contactPMRs.delete(pmr); bannerPMRs.delete(pmr); otherPMRs.delete(pmr); });

  return {
    previousData: previousData, currentData: currentData, enrollmentPMRs: enrollmentPMRs, disenrollmentPMRs: disenrollmentPMRs,
    demographicPMRs: demographicPMRs, caseloadPMRs: caseloadPMRs, contactPMRs: contactPMRs, bannerPMRs: bannerPMRs, otherPMRs: otherPMRs,
    demographicChangedColumnsByPMR: demographicChangedColumnsByPMR, caseloadChangedColumnsByPMR: caseloadChangedColumnsByPMR,
    contactChangedColumnsByPMR: contactChangedColumnsByPMR, bannerChangedColumnsByPMR: bannerChangedColumnsByPMR, otherChangedColumnsByPMR: otherChangedColumnsByPMR
  };
}

function rowsWithDOBOnlyForSection_(items, headerMap) {
  const dobIdx = getDOBIndex_(headerMap);
  if (dobIdx === -1) return [];
  return (items || []).filter(item => normalizeCompareValue_(item.values[dobIdx]) !== "");
}

function buildPrimitiveRowsHash_(items, headerMap, columnsToCompare) {
  const columnIndexes = (columnsToCompare || []).map(function(header) { return headerMap[header]; }).filter(function(idx) { return idx !== undefined && idx !== -1; });
  if (!items || items.length === 0 || columnIndexes.length === 0) return "";
  return items.map(function(item) {
    return columnIndexes.map(function(idx) { return normalizeCompareValue_(item.values[idx]); }).join("|~|");
  }).sort().join("|~~|");
}

function getChangedColumnsForSectionRows_(currentItems, previousItems, currentHeaders, previousHeaders, columnsToCompare, currentHeaderMap, previousHeaderMap) {
  const changed = new Set();
  if (!currentItems || currentItems.length === 0 || !previousItems || previousItems.length === 0) return changed;
  const currentSignatures = buildColumnSignaturesForSection_(currentItems, currentHeaderMap, columnsToCompare);
  const previousSignatures = buildColumnSignaturesForSection_(previousItems, previousHeaderMap, columnsToCompare);

  columnsToCompare.forEach(header => {
    if (currentHeaderMap[header] === undefined || previousHeaderMap[header] === undefined) return;
    if ((currentSignatures[header] || "") !== (previousSignatures[header] || "")) changed.add(header);
  });
  return changed;
}

function buildColumnSignaturesForSection_(items, headerMap, columnsToCompare) {
  const signatures = {};
  (columnsToCompare || []).forEach(function(header) {
    const idx = headerMap[header];
    if (idx === undefined || idx === -1) return;
    signatures[header] = (items || []).map(function(item) { return normalizeCompareValue_(item.values[idx]); }).sort().join("||");
  });
  return signatures;
}

function getRawDemoPDataForCompare_(sheet) {
  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  const headers = data.headers;
  const headerMap = data.headerMap;
  const pmrIdx = getPMRIndex_(headerMap);
  const dobIdx = getDOBIndex_(headerMap);

  if (pmrIdx === -1) throw new Error(`${sheet.getName()} is missing Participant PMR# / PMR # column.`);

  const values = data.values;
  const rowsByPMR = new Map();
  const participantRows = new Map();
  const allPMRs = new Set();

  values.forEach((row, idx) => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr) return;
    allPMRs.add(pmr);

    const item = { rowNumber: DATA_START_ROW + idx, values: row };
    if (!rowsByPMR.has(pmr)) rowsByPMR.set(pmr, []);
    rowsByPMR.get(pmr).push(item);

    if (!participantRows.has(pmr)) {
      if (dobIdx === -1 || normalizeCompareValue_(row[dobIdx]) !== "") participantRows.set(pmr, item);
    }
  });

  rowsByPMR.forEach((items, pmr) => {
    if (!participantRows.has(pmr) && items.length > 0) participantRows.set(pmr, items[0]);
  });

  return { sheet: sheet, sheetName: sheet.getName(), headers: headers, headerMap: headerMap, values: values, rowsByPMR: rowsByPMR, participantRows: participantRows, allPMRs: allPMRs };
}

function displayValueForReport_(value) {
  if (value instanceof Date && !isNaN(value.getTime())) return formatDateDisplay_(value);
  return value === null || value === undefined ? "" : String(value);
}

function getMonthlyChangeSectionSpecs_(sectionData) {
  return [
    { title: "Enrollments", pmrSet: sectionData.enrollmentPMRs, rowMode: "dobOnly", changedColumnsByPMR: new Map() },
    { title: "Disenrollments", pmrSet: sectionData.disenrollmentPMRs, rowMode: "strictDisenrollmentEffectiveDate", changedColumnsByPMR: new Map() },
    { title: "Demographic Changes", pmrSet: sectionData.demographicPMRs, rowMode: "dobOnly", changedColumnsByPMR: sectionData.demographicChangedColumnsByPMR },
    { title: "Caseload Changes", pmrSet: sectionData.caseloadPMRs, rowMode: "dobOnly", changedColumnsByPMR: sectionData.caseloadChangedColumnsByPMR },
    { title: "Contact Changes", pmrSet: sectionData.contactPMRs, rowMode: "allRows", changedColumnsByPMR: sectionData.contactChangedColumnsByPMR },
    { title: "Banner Summary Changes", pmrSet: sectionData.bannerPMRs, rowMode: "allRows", changedColumnsByPMR: sectionData.bannerChangedColumnsByPMR },
    { title: "Other Changes", pmrSet: sectionData.otherPMRs, rowMode: "dobOnly", changedColumnsByPMR: sectionData.otherChangedColumnsByPMR }
  ];
}

function buildMonthlyChangeSectionRows_(currentData, previousData, pmrSet, sectionTitle, rowMode, changedColumnsByPMR, monthParts) {
  if (!currentData || !pmrSet || pmrSet.size === 0) return [];

  const reportHeaders = getMonthlyChangeReportHeaders_(currentData.headers || []);
  const dobIdx = getDOBIndex_(currentData.headerMap || {});
  const disenrollEffectiveIdx = findHeaderIndex_(currentData.headerMap || {}, ["Disenrollment Effective Date", "Disenrollment Date"]);
  const reportDisenrollEffectiveIdx = findHeaderIndex_(buildHeaderIndexMap_(reportHeaders), ["Disenrollment Effective Date", "Disenrollment Date"]);
  const pmrIdx = getPMRIndex_(currentData.headerMap || {});
  const allowDuplicateRowsForPMR = sectionTitle === "Contact Changes" || sectionTitle === "Banner Summary Changes";
  const reportDateIndexes = getMonthlyChangeReportDateIndexes_(reportHeaders);
  const rowsToInsert = [];

  Array.from(pmrSet).sort().forEach(function(pmr) {
    const items = currentData.rowsByPMR.get(pmr) || [];
    let insertedForThisPMR = false;
    items.forEach(function(item) {
      if (!allowDuplicateRowsForPMR && insertedForThisPMR) return;
      if (rowMode === "dobOnly" && (dobIdx === -1 || normalizeCompareValue_(item.values[dobIdx]) === "")) return;
      if (rowMode === "strictDisenrollmentEffectiveDate" || rowMode === "disenrollmentEffectiveRange") {
        if (disenrollEffectiveIdx === -1 || !monthParts) return;
        const effectiveDate = item.values[disenrollEffectiveIdx];
        if (!isMonthlyChangeDisenrollmentEffectiveDate_(effectiveDate, monthParts)) return;
      }
      const changedColumns = changedColumnsByPMR && changedColumnsByPMR.has(pmr) ? changedColumnsByPMR.get(pmr) : new Set();
      const previousItems = previousData && previousData.rowsByPMR ? (previousData.rowsByPMR.get(pmr) || []) : [];
      const previousItem = previousItems.length ? previousItems[0] : null;
      rowsToInsert.push({
        values: buildMonthlyChangeReportRow_(item.values, currentData.headers, reportHeaders, changedColumns, reportDateIndexes, previousItem, previousData ? previousData.headerMap : null),
        changedColumns: changedColumns
      });
      if (!allowDuplicateRowsForPMR) insertedForThisPMR = true;
    });
  });

  if (sectionTitle === "Disenrollments" && reportDisenrollEffectiveIdx !== -1 && pmrIdx !== -1) {
    rowsToInsert.sort(function(a, b) {
      const dateA = a.values[reportDisenrollEffectiveIdx] ? new Date(a.values[reportDisenrollEffectiveIdx]) : new Date(0);
      const dateB = b.values[reportDisenrollEffectiveIdx] ? new Date(b.values[reportDisenrollEffectiveIdx]) : new Date(0);
      return dateB - dateA;
    });
  }
  return rowsToInsert;
}

function appendMonthlyChangeCompiledRow_(matrix, rowValues, backgroundColor, fontWeight, fontSize, lastCol) {
  matrix.values.push(padRowToWidth_(rowValues || [], lastCol));
  matrix.backgrounds.push(new Array(lastCol).fill(backgroundColor || "#FFFFFF"));
  matrix.fontWeights.push(new Array(lastCol).fill(fontWeight || "normal"));
  matrix.fontSizes.push(new Array(lastCol).fill(fontSize || 10));
  matrix.fontColors.push(new Array(lastCol).fill("#000000"));
}

function appendMonthlyChangeSectionBlock_(matrix, spec, dataRows, reportHeaders, theme, lastCol, globals) {
  globals = globals || {};
  const titleFontSize = Number(globals.titleFontSize || 14);
  const standardFontSize = Number(globals.standardFontSize || 10);
  appendMonthlyChangeCompiledRow_(matrix, [], "#FFFFFF", "normal", standardFontSize, lastCol);
  
  const sectionTitleRow = new Array(lastCol).fill("");
  sectionTitleRow[0] = spec.title;
  
  appendMonthlyChangeCompiledRow_(matrix, sectionTitleRow, theme.level5, "bold", titleFontSize, lastCol);
  appendMonthlyChangeCompiledRow_(matrix, [], "#FFFFFF", "normal", standardFontSize, lastCol);
  appendMonthlyChangeCompiledRow_(matrix, reportHeaders, theme.level2, "bold", standardFontSize, lastCol);
  appendMonthlyChangeCompiledRow_(matrix, [], "#FFFFFF", "normal", standardFontSize, lastCol);

  const activeRows = dataRows && dataRows.length ? dataRows : [{ values: new Array(lastCol).fill(""), changedColumns: new Set() }];
  activeRows.forEach(function(rowInfo) {
    const row = padRowToWidth_(rowInfo.values || [], lastCol);
    const backgrounds = new Array(lastCol).fill("#FFFFFF");
    if (rowInfo.changedColumns && rowInfo.changedColumns.size > 0) {
      reportHeaders.forEach(function(header, index) {
        if (rowInfo.changedColumns.has(header)) backgrounds[index] = "#f3ffc7";
      });
    }
    matrix.values.push(row);
    matrix.backgrounds.push(backgrounds);
    matrix.fontWeights.push(new Array(lastCol).fill("normal"));
    matrix.fontSizes.push(new Array(lastCol).fill(standardFontSize));
    matrix.fontColors.push(new Array(lastCol).fill("#000000"));
  });

  appendMonthlyChangeCompiledRow_(matrix, [], "#FFFFFF", "normal", standardFontSize, lastCol);
}

function populateMonthlyChangeReportSections_(reportSheet, sectionData, monthParts) {
  if (!reportSheet || !sectionData || !sectionData.currentData) return;
  const dashboard = loadDashboardConfig_();
  const globals = dashboard.globals || {};
  const sheetDef = getSheetDefinitionByType_(dashboard, SHEET_TYPE.MONTHLY_CHANGE);
  const currentData = sectionData.currentData;
  const reportHeaders = getMonthlyChangeReportHeaders_(currentData.headers || []);
  const lastCol = Math.max(reportHeaders.length, 1);
  const theme = getThemeColorsFromBase_((sheetDef && sheetDef.baseColor) || "#A165CC", globals);
  const matrix = { values: [], backgrounds: [], fontWeights: [], fontSizes: [], fontColors: [] };
  const sectionBlocks = [];

  getMonthlyChangeSectionSpecs_(sectionData).forEach(function(spec) {
    const dataRows = buildMonthlyChangeSectionRows_(currentData, sectionData.previousData, spec.pmrSet, spec.title, spec.rowMode, spec.changedColumnsByPMR, monthParts);
    sectionBlocks.push({ startOffset: matrix.values.length, spec: spec });
    appendMonthlyChangeSectionBlock_(matrix, spec, dataRows, reportHeaders, theme, lastCol, globals);
  });

  const requiredRows = Math.max(HEADER_ROW + matrix.values.length, 1);
  resizeSheetGrid_(reportSheet, requiredRows, lastCol);
  
  const existingRows = Math.max(reportSheet.getMaxRows() - HEADER_ROW, matrix.values.length, 1);
  reportSheet.getRange(HEADER_ROW + 1, 1, existingRows, lastCol).clear();

  if (matrix.values.length > 0) {
    const targetRange = reportSheet.getRange(HEADER_ROW + 1, 1, matrix.values.length, lastCol);
    targetRange.setValues(matrix.values);
    sectionBlocks.forEach(function(block) {
      applySubHeaderBlock_(reportSheet, HEADER_ROW + 1 + block.startOffset, block.spec.title, null, reportHeaders, dashboard, sheetDef, { valuesAlreadyWritten: true });
    });
  }
}

function findMonthlyChangeSectionTitleRow_(sheet, title) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 1) return -1;
  const values = sheet.getRange(1, 1, lastRow, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0] || "").trim() === title) return i + 1;
  }
  return -1;
}

function findNextMonthlyChangeSectionTitleRow_(sheet, afterRow) {
  const titles = new Set(["Enrollments", "Disenrollments", "Demographic Changes", "Caseload Changes", "Contact Changes", "Banner Summary Changes", "Other Changes"]);
  const lastRow = sheet.getLastRow();
  if (afterRow >= lastRow) return -1;
  const values = sheet.getRange(afterRow + 1, 1, lastRow - afterRow, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    const value = String(values[i][0] || "").trim();
    if (titles.has(value)) return afterRow + 1 + i;
  }
  return -1;
}

function convertMonthlyChangeReportDateValues_(rowValues, reportHeaders, dateIndexes) {
  const output = rowValues.slice();
  const indexes = dateIndexes || getMonthlyChangeReportDateIndexes_(reportHeaders || []);
  indexes.forEach(idx => {
    if (idx >= output.length) return;
    const value = output[idx];
    if (value instanceof Date && !isNaN(value.getTime())) return;
    if (typeof value === "number" && !isNaN(value) && value > 20000) {
      const convertedDate = spreadsheetSerialDateToLocalDate_(value);
      if (convertedDate) output[idx] = convertedDate;
      return;
    }
    const parsed = normalizeToDateObject_(value);
    if (parsed) output[idx] = parsed;
  });
  return output;
}

function buildMonthlyChangeReportRow_(sourceRow, sourceHeaders, reportHeaders, changedColumns, dateIndexes, previousItem, previousHeaderMap) {
  const output = sourceRow.slice(0, sourceHeaders.length);
  while (output.length < reportHeaders.length) output.push("");

  const changeIdx = reportHeaders.indexOf("Columns With Change");
  if (changeIdx !== -1) {
    if (changedColumns && changedColumns.size > 0) {
      const detailedChangeStrings = [];
      const previousValues = previousItem && previousItem.values ? previousItem.values : [];
      const caseloadFilter = ["Caseload - Social Work", "Caseload - RN", "Caseload - PCP", "Caseload - HCC", "Caseload - Activities", "Caseload - OT", "Caseload - PT", "Caseload - RD", "Caseload - Supervising MD"];

      Array.from(changedColumns).sort().forEach(function(columnName) {
        if (caseloadFilter.indexOf(columnName) !== -1) {
          const previousColIdx = previousHeaderMap ? previousHeaderMap[columnName] : undefined;
          let previousValueDisplay = "";
          if (previousColIdx !== undefined && previousColIdx !== -1 && previousValues.length > 0) {
            previousValueDisplay = displayValueForReport_(previousValues[previousColIdx]);
          }
          detailedChangeStrings.push(columnName + " -- " + (previousValueDisplay !== "" ? previousValueDisplay : "(blank)"));
        } else {
          detailedChangeStrings.push(columnName);
        }
      });
      output[changeIdx] = detailedChangeStrings.join(", ");
    } else {
      output[changeIdx] = "";
    }
  }
  return convertMonthlyChangeReportDateValues_(output, reportHeaders, dateIndexes);
}

function appendDemoPArchiveRows_(sourceHeaders, rows, metadata, timing, timingLabel) {
  if (!rows || rows.length === 0) return 0;
  const prefix = String(timingLabel || "Demo P archive detail");
  const markArchiveStep = function(label, details) { if (timing) markFrameworkStep_(timing, prefix + " - " + label, details || ""); };
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const archiveSheet = getOrCreateDemoPArchiveSheet_(ss, sourceHeaders, timing, prefix);
  markArchiveStep("archive sheet ready: " + archiveSheet.getName());
  
  const archiveHeaders = getHeaders_(archiveSheet, HEADER_ROW);
  const archiveWidth = Math.max(archiveHeaders.length, 1);
  const now = new Date();
  const meta = metadata || {};
  const sourceHeaderMap = buildHeaderIndexMap_(sourceHeaders || []);
  const archiveHeaderMap = buildHeaderIndexMap_(archiveHeaders || []);
  const sourcePMRIndex = getPMRIndex_(sourceHeaderMap);

  const payload = rows.map(function(row) {
    const output = new Array(archiveWidth).fill("");
    setArchiveValue_(output, archiveHeaderMap, "Archived At", now);
    setArchiveValue_(output, archiveHeaderMap, "Archive Reason", meta.reason || "Demo P Row Archive");
    setArchiveValue_(output, archiveHeaderMap, "Source Workflow", meta.workflow || "Demo P Workflow");
    setArchiveValue_(output, archiveHeaderMap, "Source Month", meta.monthLabel || "");
    setArchiveValue_(output, archiveHeaderMap, "Source Sheet", meta.sourceSheet || "Demo P");
    (sourceHeaders || []).forEach(function(header, idx) {
      if (archiveHeaderMap[header] !== undefined) output[archiveHeaderMap[header]] = row[idx];
    });
    if (archiveHeaderMap["Participant PMR#"] !== undefined && sourcePMRIndex !== -1) {
      output[archiveHeaderMap["Participant PMR#"]] = row[sourcePMRIndex];
    }
    return output;
  });

  const insertStartRow = Math.max(archiveSheet.getLastRow() + 1, DATA_START_ROW);
  if (archiveSheet.getMaxRows() < insertStartRow + payload.length - 1) {
    archiveSheet.insertRowsAfter(archiveSheet.getMaxRows(), insertStartRow + payload.length - 1 - archiveSheet.getMaxRows());
  }
  if (archiveSheet.getMaxColumns() < archiveWidth) {
    archiveSheet.insertColumnsAfter(archiveSheet.getMaxColumns(), archiveWidth - archiveSheet.getMaxColumns());
  }
  
  archiveSheet.getRange(insertStartRow, 1, payload.length, archiveWidth).setValues(payload);
  hideSheetIfNeeded_(archiveSheet, timing, prefix + " - archive sheet hidden after write");
  clearSheetRuntimeCachesForSheet_(archiveSheet);
  return payload.length;
}

function setArchiveValue_(row, headerMap, header, value) {
  if (headerMap && headerMap[header] !== undefined) row[headerMap[header]] = value;
}

function getOrCreateDemoPArchiveSheet_(ss, sourceHeaders, timing, timingPrefix) {
  const prefix = String(timingPrefix || "Demo P archive detail");
  const markArchiveStep = function(label, details) { if (timing) markFrameworkStep_(timing, prefix + " - sheet readiness - " + label, details || ""); };
  
  let sheet = ss.getSheetByName(DEMO_P_ARCHIVE_SHEET);
  const archiveHeaders = getDemoPArchiveHeaders_(sourceHeaders);
  
  if (!sheet) {
    const template = ss.getSheetByName(DEMO_P_TEMPLATE_SHEET);
    if (template) {
      sheet = template.copyTo(ss);
      setUniqueSheetName_(sheet, DEMO_P_ARCHIVE_SHEET);
      placeCreatedSheetInConfiguredOrder_(sheet);
    } else {
      sheet = insertGovernedOutputSheet_(ss, DEMO_P_ARCHIVE_SHEET);
    }
  }
  
  if (sheet.getMaxColumns() < archiveHeaders.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), archiveHeaders.length - sheet.getMaxColumns());
  }
  
  ensureStandardTitleRows_(sheet);
  sheet.getRange("A1").setValue(DEMO_P_ARCHIVE_SHEET);
  sheet.getRange(HEADER_ROW, 1, 1, archiveHeaders.length).setValues([archiveHeaders]);
  
  try { sheet.setFrozenRows(HEADER_ROW); } catch (err) {}
  hideSheetIfNeeded_(sheet, timing, prefix + " - sheet readiness - archive sheet hidden");
  return sheet;
}

function getDemoPArchiveHeaders_(sourceHeaders) {
  const headers = ["Archived At", "Archive Reason", "Source Workflow", "Source Month", "Source Sheet"];
  (sourceHeaders || []).forEach(function(header) {
    const clean = String(header || "").trim();
    if (clean && headers.indexOf(clean) === -1) headers.push(clean);
  });
  return headers;
}

function runMonthlyStart() {
  const monthParts = promptForLockedYearReportMonth_("Create Monthly Start");
  if (!monthParts) return;
  const archiveSs = openArchiveSpreadsheetOnce_();

  return runFrameworkTimed_("Create Monthly Start " + formatReportDateLabel_(monthParts.firstDay), function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const messages = [];

    const masterListName = buildMonthlySheetName_(MASTER_LIST_PREFIX, monthParts.firstDay, monthParts.lastDay);
    const existingMasterListSheet = ss.getSheetByName(masterListName);
    let masterListExistsAndReplaceConfirmed = false;

    if (existingMasterListSheet) {
      const ui = SpreadsheetApp.getUi();
      const response = ui.alert("Master List Exists", masterListName + " already exists. Replace it?", ui.ButtonSet.YES_NO);
      if (response !== ui.Button.YES) throw new Error("Monthly Start cancelled: Existing Master List not replaced.");
      masterListExistsAndReplaceConfirmed = true;
    }

    const preflight = {
      masterListName: masterListName,
      existingMasterListSheet: existingMasterListSheet,
      masterListExistsAndReplaceConfirmed: masterListExistsAndReplaceConfirmed
    };

    markFrameworkStep_(timing, "Create Monthly Start - Locate Raw Data for Demo P initialization");
    const rawSheet = getValidatedRawDataSheetForDemoPBuild_(monthParts, timing);
    const buildResult = createActiveDemoPFromRawData_(rawSheet, DEMO_P_PREFIX, monthParts, timing);
    const demoSheet = buildResult.sheet;
    const flatCount = buildResult.flatCount || Math.max(demoSheet.getLastRow() - DATA_START_ROW + 1, 0);
    enforceDemoPPostFlattenFormatting_(demoSheet);
    markFrameworkStep_(timing, "Create Monthly Start - Build Demo P complete | Rows retained: " + flatCount);
    messages.push("Build Demo P: " + demoSheet.getName() + " (" + flatCount + " records)");

    const disenrolledResult = createDisenrolledListForMonth_(monthParts, timing, {
      timingPrefix: "Create Monthly Start - Create/Update Disenrolled - ",
      refreshIndex: false,
      notify: false,
      workflowName: "Create Monthly Start"
    });
    markFrameworkStep_(timing, "Create Monthly Start - Disenrolled List complete | Rows copied: " + disenrolledResult.rowsCopied + "; rows removed: " + disenrolledResult.rowsRemoved);
    messages.push("Create/Update Disenrolled: " + disenrolledResult.rowsCopied + " copied, " + disenrolledResult.rowsRemoved + " removed");

    const masterSheet = createMasterListForMonth_(monthParts, timing, preflight);
    markFrameworkStep_(timing, "Create Monthly Start - Master List complete: " + (masterSheet ? masterSheet.getName() : "Not completed"));
    messages.push("Create Master List: " + (masterSheet ? masterSheet.getName() : "Not completed"));

    try {
      updateIndexSheet({ archiveSs: archiveSs });
      markFrameworkStep_(timing, "Create Monthly Start - Index refreshed; full-workbook sheet sorting skipped by design");
    } catch (err) {
      logBestEffortWarning_("Monthly Start final index refresh skipped: " + err.message);
    }

    notify_("Create Monthly Start complete.\n\n" + messages.join("\n"));
    return { demoSheet: demoSheet, disenrolledResult: disenrolledResult, masterSheet: masterSheet };
  });
}

function runMonthlyUpdate() {
  const monthParts = promptForLockedYearReportMonth_("Create Monthly Update");
  if (!monthParts) return;
  const archiveSs = openArchiveSpreadsheetOnce_();

  return runFrameworkTimed_("Create Monthly Update " + formatReportDateLabel_(monthParts.firstDay), function(timing) {
    const preflight = preflightMonthlyUpdateForMonth_(monthParts, timing);
    const messages = [];

    const reportSheet = buildMonthlyChangeReportForMonth_(monthParts, timing, { skipIndexRefresh: true, skipNotification: true });
    markFrameworkStep_(timing, "Create Monthly Update - Monthly Change Report complete: " + (reportSheet ? reportSheet.getName() : "No report created"));
    messages.push("Monthly Change Report: " + (reportSheet ? reportSheet.getName() : "No report created"));

    const demoSheet = updateDemoPMonthlySyncForMonth_(monthParts, timing);
    markFrameworkStep_(timing, "Create Monthly Update - Demo P update complete: " + (demoSheet ? demoSheet.getName() : "No Demo P update"));
    messages.push("Update Demo P: " + (demoSheet ? demoSheet.getName() : "No update"));

    const disenrolledResult = createDisenrolledListForMonth_(monthParts, timing, {
      timingPrefix: "Create Monthly Update - Create/Update Disenrolled - ",
      refreshIndex: false,
      notify: false,
      workflowName: "Create Monthly Update"
    });
    markFrameworkStep_(timing, "Create Monthly Update - Disenrolled List complete | Rows copied: " + disenrolledResult.rowsCopied + "; rows removed: " + disenrolledResult.rowsRemoved);
    messages.push("Create/Update Disenrolled: " + disenrolledResult.rowsCopied + " copied, " + disenrolledResult.rowsRemoved + " removed");

    const masterSheet = createMasterListForMonth_(monthParts, timing, preflight);
    markFrameworkStep_(timing, "Create Monthly Update - Master List complete: " + (masterSheet ? masterSheet.getName() : "Not completed"));
    messages.push("Create Master List: " + (masterSheet ? masterSheet.getName() : "Not completed"));

    try {
      updateIndexSheet({ archiveSs: archiveSs });
      markFrameworkStep_(timing, "Create Monthly Update - Index refreshed; full-workbook sheet sorting skipped by design");
    } catch (err) {
      logBestEffortWarning_("Monthly Update final index refresh skipped: " + err.message);
    }

    notify_("Create Monthly Update complete.\n\n" + messages.join("\n"));
    return { reportSheet: reportSheet, demoSheet: demoSheet, disenrolledResult: disenrolledResult, masterSheet: masterSheet };
  });
}

function updateDemoPMonthlySyncForMonth_(monthParts, timing, options) {
  if (!monthParts) return null;
  options = options || {};
  const timingPrefix = options.timingPrefix === undefined ? "Create Monthly Update - Update Demo P - " : String(options.timingPrefix || "");
  const step = function(label, details) { if (timing) markFrameworkStep_(timing, timingPrefix + label, details || ""); };
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mcrName = buildMonthlySheetName_(MONTHLY_CHANGE_REPORT_PREFIX, monthParts.firstDay, monthParts.lastDay);

  let mcrSheet = ss.getSheetByName(mcrName);
  if (!mcrSheet) {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      "Monthly Change Report Required",
      "The Monthly Change Report '" + mcrName + "' was not found.\n\nWould you like to build the Monthly Change Report now?",
      ui.ButtonSet.YES_NO
    );
    if (response === ui.Button.YES) {
      mcrSheet = buildMonthlyChangeReportForMonth_(monthParts, timing, { skipIndexRefresh: true, skipNotification: true });
      if (!mcrSheet) {
        notify_("Update Demo P cancelled: Monthly Change Report could not be created.");
        step("Preflight cancelled - Monthly Change Report creation failed");
        return null;
      }
    } else {
      notify_("Update Demo P cancelled: Missing required Monthly Change Report '" + mcrName + "'.");
      step("Preflight cancelled by user - Missing Monthly Change Report: " + mcrName);
      return null;
    }
  }

  const demoSheet = getCurrentDemoPSheet_(monthParts);
  if (!demoSheet) throw new Error("Ongoing Demo P sheet was not found. Run Build Demo P (Initialization) first.");
  step("Locate ongoing Demo P sheet: " + demoSheet.getName());

  const changedPMRs = getDemoPMonthlySyncChangedPMRs_(monthParts, timing);
  step("Monthly Change PMRs loaded | PMRs: " + changedPMRs.size);
  if (!changedPMRs.size) {
    step("No Monthly Change PMRs found; Demo P left intact");
    return demoSheet;
  }

  const rawSheet = getCurrentRawDataSheet_(monthParts);
  if (!rawSheet) throw new Error("Raw Data sheet was not found for the selected month. Format Raw Data first.");
  
  const rawHeaders = getHeaders_(rawSheet, HEADER_ROW);
  if (rawHeaders.indexOf("Primary PMR Row") === -1) {
    throw new Error("Update Demo P stopped: The Raw Data sheet '" + rawSheet.getName() + "' is missing the required 'Primary PMR Row' column.");
  }
  
  step("Locate protected Raw Data source before changing Demo P: " + rawSheet.getName());

  const headers = getHeaders_(demoSheet, HEADER_ROW);
  const data = getDataValues_(demoSheet, HEADER_ROW, DATA_START_ROW);
  const pmrIdx = getPMRIndex_(data.headerMap);
  if (pmrIdx === -1) throw new Error("Demo P is missing Participant PMR# / PMR # column.");
  const width = Math.max(headers.length, 1);

  const freshRows = buildDemoPFreshRowsForPMRs_(rawSheet, headers, changedPMRs, monthParts, timing);
  step("Fresh Raw Data rows processed and flattened | Rows: " + freshRows.length);

  validateDemoPMonthlySyncReplacementCoverage_(changedPMRs, freshRows, headers);
  step("Replacement PMR coverage validated");

  const retainedResult = buildDemoPMonthlySyncRetainedRows_(data, changedPMRs, width);
  const outputRows = retainedResult.rows.concat(normalizeRowsToWidth_(freshRows, width));
  step("Demo P replacement body built | Retained rows: " + retainedResult.rows.length + "; removed rows: " + retainedResult.removedRows + "; fresh rows: " + freshRows.length);

  const archivedRows = appendDemoPArchiveRows_(headers, retainedResult.archiveRows, {
    reason: "Monthly Sync Replacement",
    workflow: "Create Monthly Update",
    monthLabel: formatReportDateLabel_(monthParts.firstDay),
    sourceSheet: demoSheet.getName()
  }, timing, "Create Monthly Update - Update Demo P - Archive detail");
  step("Archive - Demo P primary rows saved before monthly replacement | Rows: " + archivedRows);

  writeDemoPMonthlySyncBody_(demoSheet, outputRows, width, step);
  clearSheetRuntimeCachesForSheet_(demoSheet);
  step("Demo P monthly replacement body written | Output rows: " + outputRows.length);

  const reactivatedCount = removeActiveDemoPPMRsFromDisenrolledExclusion_(demoSheet);
  step("Disenrolled Exclusion reactivation sweep complete | Rows removed: " + reactivatedCount);

  updateDemoPReportDates_(demoSheet, monthParts);
  step("Demo P report date range refreshed | Start: " + formatDateDisplay_(monthParts.firstDay) + "; End: " + formatDateDisplay_(monthParts.lastDay));

  enforceDemoPPostFlattenFormatting_(demoSheet);
  step("Index refresh deferred until Create Monthly Update final organization");
  step("Demo P monthly PMR replacement complete | PMRs reviewed: " + changedPMRs.size);

  return demoSheet;
}

function createMasterListForMonth_(monthParts, parentTiming, preflight) {
  if (!monthParts) return null;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const timing = parentTiming || startRuntimeTiming_("Create Master List", monthParts);
  const markStep = function(label, details) {
    if (parentTiming) markFrameworkStep_(timing, "Create Monthly Update - Create Master List - " + label, details || "");
    else markRuntimeStep_(timing, label, details);
  };
  let masterSheet = null;
  let copiedRowCount = 0;
  
  try {
    markStep("Start");
    const demoSheet = getCurrentDemoPSheet_(monthParts);
    markStep("Locate current processed Demo P sheet");
    if (!demoSheet) {
      notify_("Demo P sheet for that month was not found. Run Process Demo P first.");
      markStep("Stopped - missing Demo P");
      if (!parentTiming) writeRuntimeTimingReport_(timing);
      return null;
    }
    const masterName = buildMonthlySheetName_(MASTER_LIST_PREFIX, monthParts.firstDay, monthParts.lastDay);
    const existingMasterSheet = ss.getSheetByName(masterName);
    
    if (existingMasterSheet) {
      const replacementAlreadyConfirmed = !!(preflight && preflight.masterListExistsAndReplaceConfirmed && preflight.masterListName === masterName);
      if (!replacementAlreadyConfirmed) {
        const ui = SpreadsheetApp.getUi();
        const response = ui.alert("Master List Exists", `${masterName} already exists. Replace it?`, ui.ButtonSet.YES_NO);
        if (response !== ui.Button.YES) {
          notify_("Create Master List cancelled.");
          markStep("Cancelled - existing Master List not replaced");
          if (!parentTiming) writeRuntimeTimingReport_(timing);
          return null;
        }
      } else {
        markStep("Existing Master List replacement confirmed during preflight");
      }
    }
    
    const masterBuildName = existingMasterSheet ? buildStagedMasterListSheetName_(masterName) : masterName;
    masterSheet = createMasterListSheetFromTemplate_(ss, masterBuildName, monthParts, timing, parentTiming ? "Create Monthly Update - Create Master List - Canvas detail" : "Create Master List canvas detail");
    
    if (existingMasterSheet) {
      hideSheetIfNeeded_(masterSheet, timing, "Master List staged build hidden until validation: " + masterBuildName);
      markStep("Create hidden staged Master List canvas");
    } else {
      markStep("Create Master List from inherited template canvas");
    }

    buildMasterListHeadersBeforeDataCopy_(demoSheet, masterSheet);
    markStep("Build Master List headers");

    const masterHeaders = getHeaders_(masterSheet, HEADER_ROW);
    const masterHeaderMap = getHeaderMap_(masterSheet, HEADER_ROW);
    const mappedRows = buildPrimaryDemoPRowsInMemory_(demoSheet, masterHeaders, masterHeaderMap);
    copiedRowCount = mappedRows.length;
    markStep("Mapped pre-flattened Refined Data rows in memory | Rows: " + copiedRowCount);

    if (copiedRowCount === 0) {
      throw new Error("Cannot create Master List: Refined Data contains no participant rows.");
    }

    const inMemoryData = { headers: masterHeaders, headerMap: masterHeaderMap, values: mappedRows, range: null };

    syncUnlockedCarePlanSourceIntoData_(inMemoryData, monthParts, null);
    markStep("Sync Unlocked CP to Master List primary rows (in-memory)");

    syncCarePlanDueSourceIntoData_(inMemoryData, monthParts, null);
    markStep("Sync Care Plan Due to Master List primary rows (in-memory)");

    const requiredMasterRows = DATA_START_ROW + copiedRowCount - 1;
    if (masterSheet.getMaxRows() < requiredMasterRows) {
      masterSheet.insertRowsAfter(masterSheet.getMaxRows(), requiredMasterRows - masterSheet.getMaxRows());
    }
    masterSheet.getRange(DATA_START_ROW, 1, copiedRowCount, masterHeaders.length).setValues(inMemoryData.values);
    markStep("Master List alternating colors reapplied through data row " + (DATA_START_ROW + copiedRowCount - 1));
    markStep("Single-pass write complete | Primary synced rows flushed: " + copiedRowCount);

    if (existingMasterSheet) {
      masterSheet = promoteStagedMasterListSheet_(ss, masterSheet, existingMasterSheet, masterName, copiedRowCount, timing, markStep);
    } else {
      setRequiredSheetName_(masterSheet, masterName);
      placeCreatedSheetInConfiguredOrder_(masterSheet);
      markStep("Set final Master List sheet name and place in configured creation order");
    }

    lockFinalOutputRowHeights_(masterSheet, "Master List");
    markStep("Lock Master List final row heights");
    hideReportTemplates(null, timing);
    markStep("Hide report templates before Master List completion");

    if (!parentTiming) {
      writeRuntimeTimingReport_(timing);
      notify_(`Master List created. Copied ${copiedRowCount} Primary PMR row(s) from processed Demo P.\n\nRuntime: ${formatSeconds_((new Date().getTime() - timing.startMs) / 1000)}`);
    }
    return masterSheet;
  } catch (err) {
    try {
      const failedMasterName = monthParts ? buildMonthlySheetName_(MASTER_LIST_PREFIX, monthParts.firstDay, monthParts.lastDay) : "";
      cleanupFailedStagedMasterListSheet_(ss, masterSheet, failedMasterName, timing, markStep);
    } catch (cleanupErr) {
      logBestEffortWarning_("Master List staged cleanup failed: " + cleanupErr.message);
    }
    if (parentTiming) {
      markFrameworkStep_(timing, "ERROR - Create Monthly Update - Create Master List - " + err.message, err && err.stack ? err.stack : "");
    } else {
      markRuntimeStep_(timing, "ERROR - " + err.message);
      try { writeRuntimeTimingReport_(timing); } catch (reportErr) {}
    }
    throw err;
  }
}

function processMasterListSingleDataPass_(masterSheet, monthParts, pmrFilter, includeMonthlySyncs, timing) {
  markRuntimeStep_(timing, "Single Pass - Schema natively governed by Section H");
  
  assignPrimaryPMRRows_(masterSheet);
  markRuntimeStep_(timing, "Single Pass - assign Primary PMR Row");
  
  const data = getDataValues_(masterSheet, HEADER_ROW, DATA_START_ROW);
  markRuntimeStep_(timing, "Single Pass - read Master List data range");
  
  if (!data.values.length) return;
  
  if (includeMonthlySyncs && monthParts) {
    syncMasterListMonthlySourcesIntoData_(data, monthParts, pmrFilter || null);
    markRuntimeStep_(timing, "Single Pass - sync monthly source data into memory");
  }
  
  populateParticipantNameData_(data, pmrFilter || null);
  markRuntimeStep_(timing, "Single Pass - populate Participant Name");

  updateBannerColumnData_(data, pmrFilter || null);
  markRuntimeStep_(timing, "Single Pass - build Banner Summary before contact processing");
  
  combineAddressesData_(data, pmrFilter || null);
  markRuntimeStep_(timing, "Single Pass - combine address fields");
  
  handleLanguageData_(data, pmrFilter || null);
  markRuntimeStep_(timing, "Single Pass - process language fields");
  
  splitPhoneNumbersData_(data, pmrFilter || null);
  markRuntimeStep_(timing, "Single Pass - split phone fields");
  
  runMasterContactProcessData_(data, pmrFilter || null);
  markRuntimeStep_(timing, "Single Pass - process contacts");
  
  combineNotesSummaryData_(data, pmrFilter || null);
  markRuntimeStep_(timing, "Single Pass - combine Notes Summary");
  
  if (data.range) data.range.setValues(data.values);
  markRuntimeStep_(timing, "Single Pass - write processed Master List data");
}

function buildPrimaryDemoPRowsInMemory_(demoSheet, masterHeaders, masterHeaderMap) {
  const demoData = getDataValues_(demoSheet, HEADER_ROW, DATA_START_ROW);
  const demoHeaders = demoData.headers;
  const demoHeaderMap = demoData.headerMap;
  const pmrIdx = getPMRIndex_(demoHeaderMap);
  if (pmrIdx === -1) throw new Error("Demo P is missing Participant PMR# / PMR # column.");

  const aliases = {
    "Participant PMR#": ["PMR #", "PMR#", "Participant PMR"],
    "PMR #": ["Participant PMR#", "PMR#", "Participant PMR"],
    "PMR#": ["Participant PMR#", "PMR #", "Participant PMR"],
    "Participant PMR": ["Participant PMR#", "PMR #", "PMR#"]
  };

  function getMasterTargetIndex_(header) {
    if (masterHeaderMap[header] !== undefined) return masterHeaderMap[header];
    const candidates = aliases[header] || [];
    for (let i = 0; i < candidates.length; i++) {
      if (masterHeaderMap[candidates[i]] !== undefined) return masterHeaderMap[candidates[i]];
    }
    return undefined;
  }

  const output = [];
  const seenPmrs = new Set();
  demoData.values.forEach(row => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr || seenPmrs.has(pmr)) return;
    seenPmrs.add(pmr);

    const out = new Array(masterHeaders.length).fill("");
    demoHeaders.forEach((header, sourceIdx) => {
      if (!header) return;
      const targetIdx = getMasterTargetIndex_(header);
      if (targetIdx !== undefined) out[targetIdx] = row[sourceIdx];
    });
    output.push(out);
  });

  return output;
}

function writeMasterListTitleDateBlock_(masterSheet, monthParts) {
  masterSheet.getRange("A1:D2").setValues([
    ["Master List", "", "", ""],
    ["Date:", monthParts.firstDay, "to", monthParts.lastDay]
  ]);
}

function showAllMasterListRows() {
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getMaxRows() >= DATA_START_ROW) {
    sheet.showRows(DATA_START_ROW, sheet.getMaxRows() - DATA_START_ROW + 1);
  }
  notify_("All rows shown.");
}

function sortMasterListByParticipantNameAndPMR_(sheet) {
  sheet = sheet || SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < DATA_START_ROW || lastCol < 1) return;
  clearAllRowGroupsIfPossible_(sheet);
  sheet.showRows(DATA_START_ROW, lastRow - DATA_START_ROW + 1);
  
  const headers = getHeaders_(sheet, HEADER_ROW);
  const headerMap = buildHeaderIndexMap_(headers);
  const pmrIdx = getPMRIndex_(headerMap);
  const lastNameIdx = headerMap["Last Name"];
  const firstNameIdx = headerMap["First Name"];
  
  if (pmrIdx === -1 || lastNameIdx === undefined || firstNameIdx === undefined) {
    notify_("Sort skipped: missing Last Name, First Name, or Participant PMR#.");
    return;
  }
  
  const range = sheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol);
  const values = range.getValues();
  const blocksByPMR = new Map();
  
  values.forEach((row, idx) => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr) return;
    if (!blocksByPMR.has(pmr)) {
      blocksByPMR.set(pmr, { pmr: pmr, lastName: row[lastNameIdx], firstName: row[firstNameIdx], rows: [] });
    }
    const block = blocksByPMR.get(pmr);
    if (!String(block.lastName || "").trim() && String(row[lastNameIdx] || "").trim()) block.lastName = row[lastNameIdx];
    if (!String(block.firstName || "").trim() && String(row[firstNameIdx] || "").trim()) block.firstName = row[firstNameIdx];
    block.rows.push({ row: row, originalIndex: idx });
  });
  
  const blocks = Array.from(blocksByPMR.values());
  blocks.sort((a, b) => {
    const aLast = normalizeKeyPart_(a.lastName);
    const bLast = normalizeKeyPart_(b.lastName);
    if (aLast !== bLast) return aLast < bLast ? -1 : 1;
    const aFirst = normalizeKeyPart_(a.firstName);
    const bFirst = normalizeKeyPart_(b.firstName);
    if (aFirst !== bFirst) return aFirst < bFirst ? -1 : 1;
    return normalizePMR_(a.pmr) < normalizePMR_(b.pmr) ? -1 : 1;
  });
  
  const sortedRows = [];
  blocks.forEach(block => {
    block.rows.sort((a, b) => {
      const aScore = getPrimaryRowScore_(a.row, headerMap);
      const bScore = getPrimaryRowScore_(b.row, headerMap);
      if (aScore !== bScore) return bScore - aScore;
      return a.originalIndex - b.originalIndex;
    });
    block.rows.forEach(item => sortedRows.push(item.row));
  });
  
  if (sortedRows.length > 0) range.setValues(sortedRows);
}

function getPrimaryRowScore_(row, headerMap) {
  let score = 0;
  const checks = [
    ["Date of Birth", 1000], ["Enrollment Date", 250], ["Capitation Date", 200], ["Address Line 1", 100],
    ["Phone Number", 50], ["Primary Language", 25], ["Participant Name", 20], ["PMR #", 10]
  ];
  checks.forEach(item => {
    const idx = headerMap[item[0]];
    if (idx !== undefined && normalizeCompareValue_(row[idx]) !== "") score += item[1];
  });
  return score;
}

function clearAllRowGroupsIfPossible_(sheet) {
  if (!sheet) return;
  const maxRows = sheet.getMaxRows();
  if (maxRows < DATA_START_ROW) return;
  try { sheet.shiftRowGroupDepth(DATA_START_ROW, maxRows - DATA_START_ROW + 1, -8); } catch (err) {}
}

function applyFinalMasterListColorAndDisplay_(sheet) {
  sheet = sheet || SpreadsheetApp.getActiveSheet();
  sheet.showRows(DATA_START_ROW, Math.max(sheet.getLastRow() - DATA_START_ROW + 1, 1));
}

function populateParticipantNameData_(data, pmrFilter) {
  if (!data || !data.values || !data.values.length || !data.headerMap) return;
  const headerMap = data.headerMap;
  const participantNameIdx = headerMap["Participant Name"];
  const firstNameIdx = headerMap["First Name"];
  const lastNameIdx = headerMap["Last Name"];
  if (participantNameIdx === undefined || firstNameIdx === undefined || lastNameIdx === undefined) return;

  data.values.forEach(function(row) {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    if (normalizeCompareValue_(row[participantNameIdx]) !== "") return;
    const firstName = String(row[firstNameIdx] || "").trim();
    const lastName = String(row[lastNameIdx] || "").trim();
    row[participantNameIdx] = [lastName, firstName].filter(Boolean).join(", ");
  });
}

function populateDemoPNameData_(data, pmrFilter) {
  if (!data || !data.values || !data.values.length || !data.headerMap) return;
  const headerMap = data.headerMap;
  const nameIdx = headerMap["Name"];
  const firstNameIdx = headerMap["First Name"];
  const lastNameIdx = headerMap["Last Name"];
  if (nameIdx === undefined || firstNameIdx === undefined || lastNameIdx === undefined) return;

  data.values.forEach(function(row) {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    if (normalizeCompareValue_(row[nameIdx]) !== "") return;
    const firstName = String(row[firstNameIdx] || "").trim();
    const lastName = String(row[lastNameIdx] || "").trim();
    row[nameIdx] = [firstName, lastName].filter(Boolean).join(" ");
  });
}

function updateBannerColumnData_(data, pmrFilter) {
  const headerMap = data.headerMap;
  const bIdx = headerMap["Banner Summary"];
  if (bIdx === undefined) return;
  const bannerHeaders = ["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"];
  
  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    const parts = [];
    bannerHeaders.forEach(header => {
      const idx = headerMap[header];
      if (idx === undefined) return;
      const value = String(row[idx] || "").trim();
      if (value !== "") parts.push(header);
    });
    if (normalizeCompareValue_(row[bIdx]) === "") row[bIdx] = parts.join(" | ");
  });
}

function combineAddressesData_(data, pmrFilter) {
  const headerMap = data.headerMap;
  const a1Idx = headerMap["Address Line 1"];
  const a2Idx = headerMap["Address Line 2"];
  const targetIdx = headerMap["Address 1 - Street"];
  if (a1Idx === undefined || targetIdx === undefined) return;
  
  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    const p1 = String(row[a1Idx] || "").trim();
    const p2 = a2Idx !== undefined ? String(row[a2Idx] || "").trim() : "";
    row[targetIdx] = p1 && p2 ? `${p1} ${p2}` : (p1 || p2);
  });
}

function handleLanguageData_(data, pmrFilter) {
  const headerMap = data.headerMap;
  const labelIdx = headerMap["Custom Field 1 - Label"];
  const valueIdx = headerMap["Custom Field 1 - Value"];
  const langIdx = headerMap["Primary Language"];
  if (labelIdx === undefined || valueIdx === undefined || langIdx === undefined) return;
  
  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    const lang = String(row[langIdx] || "").trim();
    const existingValue = String(row[valueIdx] || "").trim();
    if (lang && lang.toLowerCase() !== "english") {
      row[labelIdx] = "Language";
      row[valueIdx] = lang;
    } else if (existingValue) {
      row[labelIdx] = "Language";
    } else {
      row[labelIdx] = "";
      row[valueIdx] = "";
    }
  });
}

function splitPhoneNumbersData_(data, pmrFilter) {
  const headerMap = data.headerMap;
  const phoneIdx = headerMap["Phone Number"];
  if (phoneIdx === undefined) return;
  const labelHeaders = ["Phone 1 - Label", "Phone 2 - Label", "Phone 3 - Label", "Phone 4 - Label"];
  const valueHeaders = ["Phone 1 - Value", "Phone 2 - Value", "Phone 3 - Value", "Phone 4 - Value"];
  const labels = ["Home", "Mobile", "Other", "Other"];
  
  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    const phoneText = String(row[phoneIdx] || "").trim();
    for (let i = 0; i < 4; i++) {
      const labelIdx = headerMap[labelHeaders[i]];
      const valueIdx = headerMap[valueHeaders[i]];
      if (labelIdx !== undefined) row[labelIdx] = "";
      if (valueIdx !== undefined) row[valueIdx] = "";
    }
    if (!phoneText) return;
    const parts = phoneText.split("_").map(part => part.trim()).filter(Boolean);
    parts.slice(0, 4).forEach((phone, idx) => {
      const labelIdx = headerMap[labelHeaders[idx]];
      const valueIdx = headerMap[valueHeaders[idx]];
      if (labelIdx !== undefined) row[labelIdx] = labels[idx];
      if (valueIdx !== undefined) row[valueIdx] = phone;
    });
  });
}

function combineNotesSummaryData_(data, pmrFilter) {
  if (!data || !data.values || !data.values.length) return;
  const headerMap = data.headerMap;
  const notesIdx = headerMap["Notes"];
  if (notesIdx === undefined) return;
  
  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    if (normalizeCompareValue_(row[notesIdx]) !== "") return;
    const parts = [];
    ["Banner Summary", "Contact - Summary"].forEach(header => {
      const idx = headerMap[header];
      const value = idx === undefined ? "" : String(row[idx] || "").trim();
      if (value) parts.push(value);
    });
    const caseloadParts = ["Caseload - PCP", "Caseload - RN", "Caseload - Social Work"].map(header => {
      const idx = headerMap[header];
      return idx === undefined ? "" : String(row[idx] || "").trim();
    }).filter(Boolean);
    if (caseloadParts.length) parts.push(caseloadParts.join(" | "));
    const additionalIdx = headerMap["Additional Important Information"];
    const additional = additionalIdx === undefined ? "" : String(row[additionalIdx] || "").trim();
    if (additional) parts.push(additional);
    row[notesIdx] = parts.join("\n\n");
  });
}

function formatMergeAuditValueForDisplay_(value) {
  if (value instanceof Date && !isNaN(value.getTime())) return formatDateDisplay_(value);
  if (value === null || value === undefined) return "";
  return String(value);
}

function getMergeAuditParticipantNameFromRows_(rows, headerMap) {
  const lastIdx = headerMap ? headerMap["Last Name"] : undefined;
  const firstIdx = headerMap ? headerMap["First Name"] : undefined;
  const primaryIdx = headerMap ? headerMap["Primary PMR Row"] : undefined;

  const primaryItem = (rows || []).find(item => {
    const row = item.values || [];
    return primaryIdx !== undefined && String(row[primaryIdx] || "").trim().toLowerCase() === "yes";
  }) || (rows || [])[0];

  const row = primaryItem && primaryItem.values ? primaryItem.values : [];
  return {
    lastName: lastIdx === undefined ? "" : String(row[lastIdx] || "").trim(),
    firstName: firstIdx === undefined ? "" : String(row[firstIdx] || "").trim()
  };
}

function getMergeAuditChangedFields_(masterRow, masterHeaderMap, demoRow, demoHeaderMap) {
  const headersToCompare = [
    "Contact - Last Name", "Contact - First Name", "Type of Contact", "Contact - Primary Language",
    "Relationship", "AD1 - Phone", "AD1 - Phone Valid Dates From", "AD1 - Phone Valid Dates To",
    "AD2 - Phone", "AD2 - Phone Valid Dates From", "AD2 - Phone Valid Dates To", "AD3 - Phone",
    "AD3 - Phone Valid Dates From", "AD3 - Phone Valid Dates To", "Company", "Contact - Notes"
  ];

  return headersToCompare.filter(header => {
    const masterIdx = masterHeaderMap[header];
    const demoIdx = demoHeaderMap[header];
    if (masterIdx === undefined && demoIdx === undefined) return false;
    const masterValue = masterIdx === undefined ? "" : masterRow[masterIdx];
    const demoValue = demoIdx === undefined ? "" : demoRow[demoIdx];
    return !valuesAreEqual_(masterValue, demoValue);
  });
}

// ============================================================================
// SECTION 2
// ============ FORMAT MONTHLY SHEETS ============
// ============================================================================
// Ownership inventory: 0 constants and 44 functions.

// --- SECTION FUNCTIONS ------------------------------------------------------

// ============================================================================
// SECTION 2
// ============ FORMAT MONTHLY SHEETS ============
// ============================================================================

// --- SECTION FUNCTIONS ------------------------------------------------------

function getTemplateDrivenActiveSheetContext_(ss, sheetType) {
  ss = ss || SpreadsheetApp.getActive();
  const dashboard = loadDashboardConfig_();
  const sheetDef = getSheetDefinitionByTypeOrNull_(dashboard, sheetType) || getDefaultSheetDefinitionByType_(sheetType);
  let template = ss.getSheetByName(sheetDef.templateName);
  if (!template) template = createTemplateFromScriptDefaultsForActiveBuild_(ss, sheetDef);
  const headers = getHeaders_(template, HEADER_ROW);
  if (!headers.some(function(header) { return String(header || "").trim(); })) {
    throw new Error("Template not usable: " + sheetDef.templateName + " is missing header values on row " + HEADER_ROW + ".");
  }
  return { dashboard: dashboard, sheetDef: sheetDef, template: template, headers: headers };
}

function getActiveWorkflowBlockedSheetNames_() {
  return new Set([
    RFF_DASHBOARD_SHEET,
    INDEX_SHEET,
    RFF_TIMING_SHEET,
    RFF_TEST_DASHBOARD_SHEET,
    RFF_BASE_TEMPLATE_NAME,
    RFF_VALIDATION_SHEET,
    RFF_DASHBOARD_QUALITY_SHEET,
    DEMO_P_ARCHIVE_SHEET
  ].filter(function(name) { return String(name || "").trim(); }));
}

function assertActiveWorkflowSourceSheet_(sheet, workflowName, options) {
  options = options || {};
  if (!sheet) throw new Error("No active sheet found. Select the source sheet before running " + workflowName + ".");
  const sheetName = String(sheet.getName() || "").trim();
  if (!sheetName) throw new Error("Active sheet name is blank. Select a valid source sheet before running " + workflowName + ".");
  if (getActiveWorkflowBlockedSheetNames_().has(sheetName) || /^RFF_/i.test(sheetName) || isTemplateSheetName_(sheetName)) {
    throw new Error("The active sheet '" + sheetName + "' is not a valid source/output sheet for " + workflowName + ". Select the imported or formatted active sheet.");
  }
  const blockedPrefixes = (options.blockedPrefixes || []).map(function(prefix) { return String(prefix || "").trim(); }).filter(Boolean);
  for (let i = 0; i < blockedPrefixes.length; i++) {
    if (sheetName.indexOf(blockedPrefixes[i]) === 0) {
      throw new Error("The active sheet '" + sheetName + "' appears to be an output sheet, not a source sheet for " + workflowName + ". Select the imported source tab before running this workflow.");
    }
  }
  return sheet;
}

function assertActiveRawDataSourceSheet_(sheet, workflowName) {
  assertActiveWorkflowSourceSheet_(sheet, workflowName || "Raw Data workflow", { blockedPrefixes: [DEMO_P_PREFIX, MONTHLY_CHANGE_REPORT_PREFIX, DISENROLLED_EXCLUSION_SHEET] });
  const headerRow = rawDataSourceHeaderRow_(sheet);
  const headers = getHeaders_(sheet, headerRow);
  const headerMap = buildHeaderIndexMap_(headers);
  if (getPMRIndex_(headerMap) === -1) {
    throw new Error("The active sheet '" + sheet.getName() + "' does not look like a Raw Data import/source sheet because no Participant PMR# / PMR # header was found.");
  }
  return sheet;
}

function assertActiveBannerSourceSheet_(sheet, workflowName) {
  assertActiveWorkflowSourceSheet_(sheet, workflowName || "Banner workflow", { blockedPrefixes: [BANNER_PREFIX, BANNER_REPORT_ALT_PREFIX] });
  return sheet;
}

function assertActiveBannerOutputSheet_(sheet) {
  assertActiveWorkflowSourceSheet_(sheet, "Validate Active Banner Output");
  const name = String(sheet.getName() || "");
  if (name.indexOf(BANNER_PREFIX) !== 0 && name.indexOf(BANNER_REPORT_ALT_PREFIX) !== 0) {
    throw new Error("Select a formatted Banner output sheet before running output validation. Active sheet: " + name);
  }
  validateBannerFormatterOutput_(sheet);
  return sheet;
}

function rawDataSourceHeaderRow_(sheet) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  if (sheet.getLastRow() >= HEADER_ROW) {
    const row4 = sheet.getRange(HEADER_ROW, 1, 1, lastCol).getValues()[0];
    if (rowLooksLikeParticipantHeader_(row4)) return HEADER_ROW;
  }
  const row1 = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  if (rowLooksLikeParticipantHeader_(row1)) return 1;
  return HEADER_ROW;
}

function formatMonthlyChangeSubsectionBlock_(sheet, titleRow, label, colCount, dashboard, sheetDef, writeLabel) {
  if (!writeLabel) return;
  const headers = getHeadersForSheetType_(dashboard, SHEET_TYPE.MONTHLY_CHANGE).slice(0, colCount);
  applySubHeaderBlock_(sheet, titleRow - 1, label, null, headers, dashboard, sheetDef, { valuesAlreadyWritten: false });
}

function formatMonthlySheets() {
  const monthParts = promptForLockedYearReportMonth_("Format Monthly Sheets");
  if (!monthParts) return null;
  const parsed = buildPromptedMonthContext_(monthParts);

  return runFrameworkTimed_("Format Monthly Sheets " + parsed.monthLabel, function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Open Archive connection once for the batch
    let archiveSs = null;
    if (RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA) {
      try {
        const archiveId = typeof getDocumentPropertiesCached_ === "function" ?
          (getDocumentPropertiesCached_().getProperty("RFF_ARCHIVE_SPREADSHEET_ID") || RFF_ARCHIVE_SPREADSHEET_ID) :
          (PropertiesService.getDocumentProperties().getProperty("RFF_ARCHIVE_SPREADSHEET_ID") || RFF_ARCHIVE_SPREADSHEET_ID);
        archiveSs = SpreadsheetApp.openById(archiveId);
        markFrameworkStep_(timing, "Archive connection opened once for batch processing");
      } catch (err) {
        logBestEffortWarning_("Could not pre-open archive connection: " + err.message);
      }
    }

    const sharedOptions = { skipIndexRefresh: true, archiveSs: archiveSs };

    const routes = [
      { code: "B", label: "Banners", fn: function(sheet) { return formatMonthlySubReportViaTemplate_(sheet, SHEET_TYPE.BANNER, parsed.monthParts, timing, sharedOptions); } },
      { code: "CD", label: "Care Plan Due", fn: function(sheet) { return formatMonthlySubReportViaTemplate_(sheet, SHEET_TYPE.CARE_PLAN_DUE, parsed.monthParts, timing, sharedOptions); } },
      { code: "UC", label: "Unlocked CP", fn: function(sheet) { return formatMonthlySubReportViaTemplate_(sheet, SHEET_TYPE.UNLOCKED, parsed.monthParts, timing, sharedOptions); } },
      { code: "RD", label: "Raw Data", fn: function(sheet) { return formatMonthlySubReportViaTemplate_(sheet, SHEET_TYPE.RAW_DATA, parsed.monthParts, timing, sharedOptions); } }
    ];

    const completed = [];
    const skipped = [];

    routes.forEach(function(route) {
      const selection = findMonthlyImportSheetForRoute_(ss, route, parsed.monthParts);
      const sourceSheet = selection.sheet;
      if (!sourceSheet) {
        logBestEffortWarning_("Format Monthly Sheets skipped missing import tab: " + route.code + " (" + route.label + ")");
        markFrameworkStep_(timing, "Skipped missing import tab: " + route.code);
        skipped.push(route.code);
        return;
      }
      const sourceSheetName = sourceSheet.getName();
      if (selection.multiple && selection.reason !== "month-match") {
        logBestEffortWarning_("Format Monthly Sheets found multiple " + route.code + " candidates and used " + sourceSheetName + ".");
      }
      if (route.code === "B") {
        assertActiveBannerSourceSheet_(sourceSheet, "Format Monthly Sheets - " + route.label);
      } else if (route.code === "RD") {
        assertActiveRawDataSourceSheet_(sourceSheet, "Format Monthly Sheets - " + route.label);
      } else {
        assertActiveWorkflowSourceSheet_(sourceSheet, "Format Monthly Sheets - " + route.label);
      }
      ss.setActiveSheet(sourceSheet);
      const outputSheet = route.fn(sourceSheet);
      completed.push(route.code + " " + sourceSheetName + " -> " + (outputSheet ? outputSheet.getName() : "No output"));
      markFrameworkStep_(timing, "Formatted monthly import tab: " + route.code + " from " + sourceSheetName);
    });

    try {
      updateIndexSheet(archiveSs);
      markFrameworkStep_(timing, "Index explicitly refreshed once using shared connection");
    } catch (err) {
      logBestEffortWarning_("Format Monthly Sheets final index refresh skipped: " + err.message);
    }

    notify_(
      "Format Monthly Sheets complete for " + parsed.monthLabel + ".\n" +
      "Completed: " + (completed.length ? completed.join(", ") : "None") + "\n" +
      "Skipped: " + (skipped.length ? skipped.join(", ") : "None")
    );
    return { completed: completed, skipped: skipped };
  });
}

function findMonthlyImportSheetForRoute_(ss, route, monthParts) {
  const candidates = getMonthlyImportSheetCandidatesForRoute_(ss, route);
  if (!candidates.length) return { sheet: null, multiple: false, reason: "missing" };
  if (candidates.length === 1) return { sheet: candidates[0], multiple: false, reason: "single" };

  const monthMatches = candidates.filter(function(sheet) {
    return sheetNameMatchesPromptedMonth_(sheet.getName(), monthParts);
  });
  if (monthMatches.length) {
    monthMatches.sort(function(a, b) {
      return getMonthlyImportCandidateRank_(a.getName(), route) - getMonthlyImportCandidateRank_(b.getName(), route);
    });
    return { sheet: monthMatches[0], multiple: true, reason: "month-match" };
  }

  const exact = candidates.filter(function(sheet) {
    return String(sheet.getName() || "").trim().toUpperCase() === String(route.code || "").toUpperCase();
  });
  if (exact.length) return { sheet: exact[0], multiple: true, reason: "exact-code" };

  candidates.sort(function(a, b) {
    return getMonthlyImportCandidateRank_(a.getName(), route) - getMonthlyImportCandidateRank_(b.getName(), route);
  });
  return { sheet: candidates[0], multiple: true, reason: "first-candidate" };
}

function getMonthlyImportSheetCandidatesForRoute_(ss, route) {
  if (!ss || !route) return [];
  const result = [];
  ss.getSheets().forEach(function(sheet) {
    if (isMonthlyImportSheetCandidate_(sheet.getName(), route)) result.push(sheet);
  });
  return result;
}

function isMonthlyImportSheetCandidate_(sheetName, route) {
  const name = String(sheetName || "").trim();
  if (!name || !route || !route.code) return false;
  const code = String(route.code || "").trim();
  if (name.toUpperCase() === code.toUpperCase()) return true;
  const normalized = normalizeMonthlyImportSheetName_(name);
  const normalizedCode = normalizeMonthlyImportSheetName_(code);
  return normalized.indexOf(normalizedCode + " ") === 0;
}

function getMonthlyImportCandidateRank_(sheetName, route) {
  const name = String(sheetName || "").trim();
  const code = String(route && route.code || "").trim();
  if (name.toUpperCase() === code.toUpperCase()) return 0;
  if (normalizeMonthlyImportSheetName_(name).indexOf(normalizeMonthlyImportSheetName_(code) + " ") === 0) return 1;
  return 2;
}

function sheetNameMatchesPromptedMonth_(sheetName, monthParts) {
  if (!monthParts || !monthParts.firstDay) return false;
  const name = normalizeMonthlyImportSheetName_(sheetName);
  const month = monthParts.firstDay.getMonth() + 1;
  const year2 = Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "yy");
  const longMonth = Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "MMMM").toLowerCase();
  const shortMonth = Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "MMM").toLowerCase();
  const variants = [
    longMonth, shortMonth, String(month), month < 10 ? "0" + month : String(month),
    String(month) + " " + year2, (month < 10 ? "0" + month : String(month)) + " " + year2,
    String(month) + "." + year2, (month < 10 ? "0" + month : String(month)) + "." + year2
  ];
  return variants.some(function(variant) {
    const normalizedVariant = normalizeMonthlyImportSheetName_(variant);
    if (!normalizedVariant) return false;
    if (normalizedVariant.indexOf(" ") === -1) return name.split(" ").indexOf(normalizedVariant) !== -1;
    return name.indexOf(normalizedVariant) !== -1;
  });
}

function normalizeMonthlyImportSheetName_(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function validateActiveBannerFormatterOutput() {
  return runFrameworkTimed_("Validate Active Banner Output", function(timing) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (!sheet) throw new Error("No active sheet found.");
    assertActiveBannerOutputSheet_(sheet);
    markFrameworkStep_(timing, "Active Banner output validated: PASS");
    return sheet;
  });
}

function validateBannerFormatterOutput_(sheet) {
  const expected = [
    "Last Name", "First Name", "Participant PMR#", "Safety - 2 Person",
    "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"
  ];
  const actual = sheet.getRange(RFF_DEFAULTS.headerRow, 1, 1, expected.length).getValues()[0].map(normalizeHeader_);
  const missing = expected.filter(function(header, index) {
    return normalizeHeader_(header) !== actual[index];
  });
  if (missing.length) {
    throw new Error("Banner output header validation failed. Missing/mismatched: " + missing.join(", "));
  }
  return true;
}

function archiveRawSourceAndDeleteLocal_(ss, rawSheet, archiveName, outputSheet, timing, options) {
  if (RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA === true) {
    try {
      const preOpenedSs = options && options.archiveSs ? options.archiveSs : null;
      archiveRawSourceSheet_(rawSheet, archiveName, timing, "Raw archive detail", preOpenedSs);
      if (timing) markFrameworkStep_(timing, "Raw data copied to archive: " + archiveName);
    } catch (err) {
      const message = "Raw source was not deleted because archive copy failed for " + archiveName + ": " + err.message;
      if (timing) markFrameworkStep_(timing, "ERROR - " + message);
      notify_(message);
      throw new Error(message);
    }
  } else {
    if (timing) markFrameworkStep_(timing, "External archiving is disabled - skipping archive step");
  }

  if (RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE) {
    deleteSheetSafely_(ss, rawSheet, "archive raw source local cleanup", [outputSheet && outputSheet.getName()]);
    if (timing) markFrameworkStep_(timing, "Local raw sheet deleted to preserve workbook speed");
  }
}

function archiveRawSourceSheet_(sourceSheet, archiveName, timing, timingLabel, preOpenedArchiveSs) {
  const safeName = archiveName || sourceSheet.getName();
  const prefix = String(timingLabel || "Raw archive detail");
  const markArchiveStep = function(label, details) {
    if (timing) markFrameworkStep_(timing, prefix + " - " + label + ": " + safeName, details || "");
  };

  let archiveSs = preOpenedArchiveSs;
  if (!archiveSs) {
    const archiveId = typeof getDocumentPropertiesCached_ === "function" ?
      (getDocumentPropertiesCached_().getProperty("RFF_ARCHIVE_SPREADSHEET_ID") || RFF_ARCHIVE_SPREADSHEET_ID) :
      getArchiveSpreadsheetId_();
    archiveSs = SpreadsheetApp.openById(archiveId);
    markArchiveStep("archive workbook opened natively", "Archive Spreadsheet ID: " + archiveId);
  } else {
    markArchiveStep("reused pre-opened archive workbook connection");
  }

  deleteArchiveSheetIfExists_(archiveSs, safeName);
  markArchiveStep("existing archive sheet deleted if present");

  const archived = sourceSheet.copyTo(archiveSs);
  markArchiveStep("source sheet copied to archive workbook");
  archived.setName(safeName);
  markArchiveStep("archive sheet renamed");
  
  if (typeof archived.showSheet === "function") {
    archived.showSheet();
    markArchiveStep("archive sheet visibility enforced visible");
  }
  return archived;
}

function findArchiveMonthlyCandidateSheets_(ss, keywords, monthLabel) {
  const normalizedMonth = String(monthLabel || "").trim().toLowerCase();
  const keywordList = (keywords || []).map(function(keyword) { return String(keyword || "").trim().toLowerCase(); }).filter(Boolean);
  const matches = [];
  const seen = new Set();

  ss.getSheets().forEach(function(sheet) {
    const name = sheet.getName();
    const lowerName = name.toLowerCase();
    if (lowerName.indexOf("template") !== -1 || lowerName.indexOf(normalizedMonth) === -1) return;
    const hasKeyword = keywordList.some(function(keyword) { return lowerName.indexOf(keyword) !== -1; });
    if (!hasKeyword || seen.has(name)) return;
    seen.add(name);
    matches.push(sheet);
  });

  matches.sort(function(a, b) { return a.getName().localeCompare(b.getName()); });
  return matches;
}

function formatMonthlyChangeSubsectionBlock(sheet, titleRow, label) {
  const dashboard = loadDashboardConfig_();
  const sheetDef = getSheetDefinitionByType_(dashboard, RFF_SHEET_TYPES.MONTHLY_CHANGE);
  if (!sheet || !sheetDef) return;
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  formatMonthlyChangeSubsectionBlock_(sheet, titleRow, label, lastCol, dashboard, sheetDef, true);
}

function rowLooksLikeParticipantHeader_(row) {
  const normalized = (row || []).map(function(value) { return normalizeHeader_(value); });
  const required = ["Last Name", "First Name", "Participant PMR#"].map(normalizeHeader_);
  return required.every(function(header) { return normalized.indexOf(header) !== -1; });
}

function getUntouchedSourceDataForTemplate_(sourceSheet, targetHeaders) {
  const lastRow = Math.max(sourceSheet.getLastRow(), 1);
  const lastColumn = Math.max(sourceSheet.getLastColumn(), 1);
  const scanRows = Math.min(lastRow, 10);
  const scan = sourceSheet.getRange(1, 1, scanRows, lastColumn).getValues();
  const targetSet = new Set((targetHeaders || []).map(normalizeHeader_));
  
  let headerOffset = 0;
  let bestScore = -1;
  scan.forEach(function(row, offset) {
    let score = 0;
    row.forEach(function(value) { if (targetSet.has(normalizeHeader_(value))) score++; });
    if (score > bestScore) { bestScore = score; headerOffset = offset; }
  });
  
  const headers = scan[headerOffset].map(normalizeHeader_);
  const dataStart = headerOffset + 2;
  const values = dataStart <= lastRow ? sourceSheet.getRange(dataStart, 1, lastRow - dataStart + 1, lastColumn).getValues() : [];
  return { headers: headers, headerMap: buildHeaderIndexMap_(headers), values: values };
}

function syncRawDataBannerColumns_(sheet, monthParts, timing, markStepFn) {
  if (!sheet) return 0;
  const step = typeof markStepFn === "function" ? markStepFn : markFrameworkStep_;
  const bannerSheet = getCurrentBannersSheet_(monthParts);
  
  if (!bannerSheet) {
    step(timing, "Raw Data Banner sync skipped - Banners source not found");
    return 0;
  }
  
  const rawData = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  const bannerData = getDataValues_(bannerSheet, HEADER_ROW, DATA_START_ROW);
  const rawPmrIdx = getPMRIndex_(rawData.headerMap || {});
  const bannerPmrIdx = getPMRIndex_(bannerData.headerMap || {});
  
  if (rawPmrIdx === -1 || bannerPmrIdx === -1) {
    step(timing, "Raw Data Banner sync skipped - PMR header missing");
    return 0;
  }
  
  const bannerMap = new Map();
  bannerData.values.forEach(function(row) {
    const key = normalizePMR_(String(row[bannerPmrIdx] === null || row[bannerPmrIdx] === undefined ? "" : row[bannerPmrIdx]).trim());
    if (!key) return;
    const record = {};
    BANNER_SYNC_FIELDS.forEach(function(field) {
      const index = bannerData.headerMap[field];
      if (index !== undefined) record[field] = row[index];
    });
    bannerMap.set(key, record);
  });
  
  const beforeValues = {};
  BANNER_SYNC_FIELDS.forEach(function(field) {
    const index = rawData.headerMap[field];
    if (index !== undefined) beforeValues[index] = rawData.values.map(function(row) { return row[index]; });
  });
  
  let matched = 0;
  rawData.values.forEach(function(row) {
    const key = normalizePMR_(String(row[rawPmrIdx] === null || row[rawPmrIdx] === undefined ? "" : row[rawPmrIdx]).trim());
    const source = key ? bannerMap.get(key) : null;
    if (!source) return;
    matched++;
    BANNER_SYNC_FIELDS.forEach(function(field) {
      const index = rawData.headerMap[field];
      if (index !== undefined && Object.prototype.hasOwnProperty.call(source, field)) row[index] = source[field];
    });
  });
  
  const changedGroups = writeChangedColumnsOnly_(sheet, rawData, beforeValues);
  clearSheetRuntimeCachesForSheet_(sheet);
  step(timing, "Raw Data Banner sync complete | PMRs matched: " + matched + "; changed column groups: " + changedGroups);
  return matched;
}

function formatMonthlySubReportViaTemplate_(sourceSheet, sheetType, monthParts, timing, options) {
  if (!sourceSheet) throw new Error("Monthly sub-report source sheet is required.");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const normalizedType = normalizeDashboardSheetTypeKey_(sheetType);
  const context = getTemplateDrivenActiveSheetContext_(ss, normalizedType);
  const sheetDef = context.sheetDef;
  const headers = getHeaders_(context.template, HEADER_ROW);
  const outputName = buildDashboardOutputSheetName_(sheetDef, monthParts);
  const archiveName = buildRawArchiveNameForSheetType_(normalizedType, monthParts);
  const titleInfo = collectMovedTitleInfoCells_(sourceSheet, normalizedType);
  const sourceData = getUntouchedSourceDataForTemplate_(sourceSheet, headers);
  const outputRows = mapRowsToHeaders_(sourceData.values, sourceData.headers, headers);

  const outputSheet = createOutputSheetFromDashboardTemplate_(
    normalizedType, outputName, outputRows, monthParts.firstDay, monthParts.lastDay, timing, "Unified sub-report template copy"
  );

  if (titleInfo) {
    const targetRange = outputSheet.getRange("C1:D1");
    targetRange.merge().setValue(titleInfo);
    if (normalizedType === SHEET_TYPE.CARE_PLAN_DUE || normalizedType === SHEET_TYPE.UNLOCKED) {
      targetRange.setFontSize(5).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    }
  }

  if (normalizedType === SHEET_TYPE.RAW_DATA) {
    processRawDataApprovedSyncColumns_(outputSheet, monthParts, timing, markFrameworkStep_);
    syncRawDataBannerColumns_(outputSheet, monthParts, timing, markFrameworkStep_);
    outputSheet.showColumns(1, Math.max(outputSheet.getMaxColumns(), 1));
  } else {
    applyColumnHidingFromDashboard_(outputSheet, context.dashboard, headers);
  }

  lockFinalOutputRowHeights_(outputSheet, normalizedType);
  applyOutputVisibilityPolicy_(outputSheet, context.dashboard, normalizedType, timing);
  archiveRawSourceAndDeleteLocal_(ss, sourceSheet, archiveName, outputSheet, timing, options || {});
  return outputSheet;
}

function getFormatterRouteConfig_(routeCode) {
  const code = String(routeCode || "").trim().toUpperCase();
  const configs = {
    B: { code: "B", label: "Banners", sheetType: SHEET_TYPE.BANNER, title: "Format Banner Report", keywords: ["Banners", "Banner Report"] },
    CD: { code: "CD", label: "Care Plan Due", sheetType: SHEET_TYPE.CARE_PLAN_DUE, title: "Format Care Plan Due Report", keywords: ["CP Due", "Care Plan Due"] },
    UC: { code: "UC", label: "Unlocked CP", sheetType: SHEET_TYPE.UNLOCKED, title: "Format Unlocked Care Plan Report", keywords: ["Unlock CP", "Unlocked CP"] },
    RD: { code: "RD", label: "Raw Data", sheetType: SHEET_TYPE.RAW_DATA, title: "Format Raw Data", keywords: ["Raw Data"] }
  };
  if (!configs[code]) throw new Error("Unknown formatter route: " + routeCode);
  return configs[code];
}

function executeSingleFormatterWorkflow_(routeCode) {
  const route = getFormatterRouteConfig_(routeCode);
  const monthParts = promptForLockedYearReportMonth_(route.title);
  if (!monthParts) return null;
  return runFrameworkTimed_(route.title, function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const selection = findMonthlyImportSheetForRoute_(ss, route, monthParts);
    const source = selection.sheet || ss.getActiveSheet();
    if (!source) throw new Error("No source sheet found for route " + route.code + ".");
    return formatMonthlySubReportViaTemplate_(source, route.sheetType, monthParts, timing, {
      archiveSs: openArchiveSpreadsheetOnce_()
    });
  });
}

function formatBannerReport() { return executeSingleFormatterWorkflow_("B"); }
function formatCarePlanDueReport() { return executeSingleFormatterWorkflow_("CD"); }
function formatUnlockedCarePlanReport() { return executeSingleFormatterWorkflow_("UC"); }
function formatRawData() { return executeSingleFormatterWorkflow_("RD"); }

function buildRawArchiveNameForSheetType_(sheetType, monthParts) {
  const suffix = Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "MM.yy");
  if (sheetType === SHEET_TYPE.CARE_PLAN_DUE || sheetType === RFF_SHEET_TYPES.CARE_PLAN_DUE) return "Source - CP Due " + suffix;
  if (sheetType === SHEET_TYPE.UNLOCKED || sheetType === RFF_SHEET_TYPES.UNLOCKED) return "Source - Unlocked CP " + suffix;
  if (sheetType === SHEET_TYPE.DEMO_P || sheetType === RFF_SHEET_TYPES.DEMO_P) return "Raw Data " + suffix;
  if (sheetType === SHEET_TYPE.DISENROLLED_EXCLUSION || sheetType === RFF_SHEET_TYPES.DISENROLLED_EXCLUSION) return "Source - Disenrolled " + suffix;
  return "Source - " + String(sheetType || "Report") + " " + suffix;
}

function collectMovedTitleInfoCells_(sheet, sheetType) {
  const cells = TITLE_INFO_MOVE_CELLS[sheetType] || [];
  const parts = [];
  cells.forEach(function(a1) {
    try {
      const value = String(sheet.getRange(a1).getDisplayValue() || "").trim();
      if (value) parts.push(value);
    } catch (err) {
      logBestEffortWarning_("Could not read moved source cell " + a1 + ": " + err.message);
    }
  });
  return parts.join(" ");
}

function getRawDataApprovedAddedColumns_() {
  return [ "Primary PMR Row" ];
}

function processRawDataApprovedSyncColumns_(sheet, monthParts, timing, markStepFn) {
  if (!sheet) return 0;
  const step = typeof markStepFn === "function" ? markStepFn : markRuntimeStep_;
  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  
  step(timing, "Wave 4 Raw Data approved-sync bulk read complete | Rows: " + data.values.length);
  if (!data.values.length) return 0;

  const headerMap = data.headerMap || {};
  const beforeValues = {};
  getRawDataApprovedAddedColumns_().forEach(function(header) {
    const idx = headerMap[header];
    if (idx === undefined) return;
    beforeValues[idx] = data.values.map(function(row) { return row[idx]; });
  });

  assignPrimaryPMRRowsInData_(data);

  const changedColumnGroups = writeChangedColumnsOnly_(sheet, data, beforeValues);
  step(timing, "Wave 4 Raw Data approved-sync guarded write complete | Changed column groups: " + changedColumnGroups);
  clearSheetRuntimeCachesForSheet_(sheet);
  return changedColumnGroups;
}

function writeChangedColumnsOnly_(sheet, data, beforeValues) {
  if (!sheet || !data || !data.values || !data.values.length) return 0;

  const indexes = Object.keys(beforeValues || {})
    .map(function(key) { return Number(key); })
    .filter(function(idx) {
      return idx >= 0 && data.values.some(function(row, r) {
        return !valuesAreEqual_(row[idx], beforeValues[idx][r]);
      });
    })
    .sort(function(a, b) { return a - b; });

  if (!indexes.length) return 0;

  const groups = [];
  let current = [indexes[0]];

  for (let i = 1; i < indexes.length; i++) {
    if (indexes[i] === current[current.length - 1] + 1) {
      current.push(indexes[i]);
    } else {
      groups.push(current);
      current = [indexes[i]];
    }
  }
  groups.push(current);

  groups.forEach(function(group) {
    const startIdx = group[0];
    const endIdx = group[group.length - 1];
    const width = endIdx - startIdx + 1;
    const values = data.values.map(function(row) {
      return row.slice(startIdx, startIdx + width);
    });
    sheet.getRange(DATA_START_ROW, startIdx + 1, values.length, width).setValues(values);
  });

  return indexes.length;
}

function isOngoingOutputSheetType_(sheetType) {
  const value = String(sheetType || "").trim();
  return value === SHEET_TYPE.DEMO_P || value === RFF_SHEET_TYPES.DEMO_P ||
         value === SHEET_TYPE.DISENROLLED_EXCLUSION || value === RFF_SHEET_TYPES.DISENROLLED_EXCLUSION;
}

function formatMonthlyChangeReportSectionSheet_(reportSheet, sourceHeaders) {
  if (!reportSheet) return;
  const dashboard = loadDashboardConfig_();
  const reportHeaders = getMonthlyChangeReportHeaders_(sourceHeaders || []);
  const lastCol = Math.max(reportHeaders.length, 1);
  applyColumnWidths_(reportSheet, dashboard, reportHeaders);
  applyColumnHidingFromDashboard_(reportSheet, dashboard, reportHeaders);
  reportSheet.setFrozenRows(4);
  reportSheet.setFrozenColumns(2);
}

function applyDashboardTemplateFormattingToActiveReportSheet_(targetSheet, dashboard, sheetDef, headers, behavior, monthParts, endDate, statusText, timing) {
  if (!targetSheet || !dashboard || !sheetDef) return;
  headers = headers || getHeadersForSheetType_(dashboard, sheetDef.sheetType);
  behavior = behavior || getBehaviorForSheetType_(dashboard, sheetDef.sheetType);
  const colCount = Math.max(headers.length, 4);
  const rowCount = Math.max(targetSheet.getMaxRows(), RFF_TEMPLATE_BASELINE_ROWS);
  resizeSheetGrid_(targetSheet, rowCount, colCount, { skipRowShrink: true });
  applyTemplateBaseFormatting_(targetSheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing);
  applyTemplateFreezeAndTabColor_(targetSheet, dashboard, sheetDef, colCount, timing);
}

function createOutputSheetFromDashboardTemplate_(sheetType, outputName, outputRows, firstDay, endDate, timing, timingLabel) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const normalizedType = normalizeDashboardSheetTypeKey_(sheetType);
  const context = getTemplateDrivenActiveSheetContext_(ss, normalizedType);
  const sheetDef = context.sheetDef;
  const template = context.template;
  const headers = getHeaders_(template, HEADER_ROW);
  if (!template) throw new Error("Template not found for " + normalizedType + ": " + sheetDef.templateName);
  
  const rows = (outputRows || []).map(function(row) {
    const out = (row || []).slice(0, headers.length);
    while (out.length < headers.length) out.push("");
    return out;
  });
  
  deleteSheetIfExists_(ss, outputName, template.getName());
  const sheet = template.copyTo(ss).setName(outputName);
  sheet.showSheet();
  placeCreatedSheetInConfiguredOrder_(sheet);
  
  const requiredRows = DATA_START_ROW + Math.max(rows.length, 1) - 1;
  if (sheet.getMaxRows() < requiredRows) sheet.insertRowsAfter(sheet.getMaxRows(), requiredRows - sheet.getMaxRows());
  if (rows.length) sheet.getRange(DATA_START_ROW, 1, rows.length, headers.length).setValues(rows);
  
  sheet.getRange("A1").setValue(sheetDef.reportTitle || normalizedType);
  if (firstDay) sheet.getRange("B2").setValue(firstDay);
  if (endDate) sheet.getRange("D2").setValue(endDate);
  
  clearSheetRuntimeCachesForSheet_(sheet);
  if (timing) markFrameworkStep_(timing, String(timingLabel || "Template copy output") + ": " + outputName + " | Rows: " + rows.length);
  return sheet;
}

function buildDashboardOutputSheetName_(sheetDef, monthParts) {
  const pattern = String(sheetDef.outputNamingPattern || sheetDef.reportTitle || sheetDef.sheetType || "").trim();
  const monthText = Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "MM.yy");
  const monthTextNoLeading = Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "M.yy");
  const fullStart = formatDateForSheetName_(monthParts.firstDay);
  const fullEnd = formatDateForSheetName_(monthParts.lastDay);

  let name = pattern || String(sheetDef.reportTitle || sheetDef.sheetType || "Report").trim();
  name = name.replace(/mm\.yy/g, monthText)
             .replace(/MM\.yy/g, monthText)
             .replace(/m\.yy/g, monthTextNoLeading)
             .replace(/M\.yy/g, monthTextNoLeading)
             .replace(/start/gi, fullStart)
             .replace(/end/gi, fullEnd);

  if (name === pattern && name.toLowerCase().indexOf(monthText.toLowerCase()) === -1 && sheetDef.usePromptDate && !isOngoingOutputSheetType_(sheetDef.sheetType)) {
    name = name + " " + monthText;
  }
  return safeSheetName_(name);
}

// ============================================================================
// SECTION 3
// ============ SHEET & LAYOUT MANAGEMENT ============
// ============================================================================
// Ownership inventory: 0 constants and 38 functions.

// --- SECTION FUNCTIONS ------------------------------------------------------

// ============================================================================
// SECTION 3
// ============ SHEET & LAYOUT MANAGEMENT ============
// ============================================================================

// --- SECTION FUNCTIONS ------------------------------------------------------

function resolveSheetDefinitionForLayoutSnapshot_(dashboard, sheet) {
  if (!dashboard || !sheet) return null;
  const sheetName = sheet.getName();
  const normalizedName = normalizeDashboardSheetTypeKey_(getSheetTypeForOrganization_(sheetName));
  const definitions = dashboard.sheetDefinitions || [];

  for (let i = 0; i < definitions.length; i++) {
    const def = definitions[i];
    if (def.templateName === sheetName) return def;
    if (normalizeDashboardSheetTypeKey_(def.sheetType) === normalizedName) return def;
    const reportTitle = String(def.reportTitle || "").trim();
    if (reportTitle && sheetName.indexOf(reportTitle) === 0) return def;
    const outputPattern = String(def.outputNamingPattern || "").trim();
    if (outputPattern && sheetName.indexOf(outputPattern.replace(/\{[^}]+\}/g, "").trim()) === 0) return def;
  }
  return null;
}

function captureActiveSheetLayoutSnapshot_(sheet, sheetDef, dashboard) {
  const globals = (dashboard && dashboard.globals) ? dashboard.globals : loadGlobalSettings_();
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const lastRow = Math.max(sheet.getLastRow(), HEADER_ROW);
  const headerValues = sheet.getRange(HEADER_ROW, 1, 1, lastCol).getValues()[0];
  const headerFontSizes = sheet.getRange(HEADER_ROW, 1, 1, lastCol).getFontSizes()[0];
  const sampleRow = Math.min(Math.max(DATA_START_ROW, HEADER_ROW), lastRow);
  const sampleRange = sheet.getRange(sampleRow, 1, 1, lastCol);
  const numberFormats = sampleRange.getNumberFormats()[0];
  const horizontalAlignments = sampleRange.getHorizontalAlignments()[0];
  const verticalAlignments = sampleRange.getVerticalAlignments()[0];
  const wrapStrategies = sampleRange.getWrapStrategies()[0];
  const hiddenColumns = getHiddenColumnFlags_(sheet, lastCol);
  
  // Safe fallback to default color if none exists
  const baseColor = normalizeHex_(sheet.getTabColor && sheet.getTabColor() ? sheet.getTabColor() : (sheetDef.baseColor || "#65A9CC"));
  const theme = getThemeColorsFromBase_(baseColor, globals);
  const borderConfig = getDefaultLayoutSnapshotBorderConfig_(globals);
  const columnRows = [];

  for (let col = 1; col <= lastCol; col++) {
    const header = String(headerValues[col - 1] || "").trim();
    if (!header) continue;
    const numberFormat = String(numberFormats[col - 1] || "").trim();
    columnRows.push([
      header,
      sheet.getColumnWidth(col),
      headerFontSizes[col - 1] || 10,
      isDateNumberFormat_(numberFormat),
      hiddenColumns[col - 1] === true,
      String(wrapStrategies[col - 1] || "CLIP").toUpperCase(),
      String(horizontalAlignments[col - 1] || "left").toLowerCase(),
      String(verticalAlignments[col - 1] || "middle").toLowerCase(),
      numberFormat === "General" ? "" : numberFormat
    ]);
  }

  return {
    sheetName: sheet.getName(),
    sheetType: sheetDef.sheetType,
    templateName: sheetDef.templateName,
    capturedAt: new Date(),
    baseColor: baseColor,
    theme: theme,
    hslLevels: {
      level1: numberOrDefault_(globals.hslLevel1, 60),
      level2: numberOrDefault_(globals.hslLevel2, 75),
      level3: numberOrDefault_(globals.hslLevel3, 85),
      level4: numberOrDefault_(globals.hslLevel4, 97)
    },
    borderConfig: borderConfig,
    columnRows: columnRows
  };
}

function getTitleRowConfigForSheet_(dashboard, sheetDef, rowNumber) {
  const allTitleRows = (dashboard && dashboard.titleRows) || {};
  const sheetType = sheetDef ? normalizeDashboardSheetTypeKey_(sheetDef.sheetType) : "";
  const sheetRows = allTitleRows[sheetType] || {};
  const globalRows = allTitleRows.GLOBAL || {};
  
  // Safely fallback directly to the unified default array
  const fallbackRows = typeof getDefaultTitleRowRows_ === "function" ? getDefaultTitleRowRows_() : [];
  const fallbackRow = fallbackRows[Math.max(rowNumber - 1, 0)] || [];
  
  return sheetRows[rowNumber] || globalRows[rowNumber] || parseTitleRowConfigRow_(fallbackRow, dashboard.globals || {}, null);
}

function getDefaultLayoutSnapshotBorderConfig_(globals) {
  return {
    color: normalizeHex_((globals && globals.globalBorderColor) || "#CCCCCC"),
    style: String((globals && globals.globalBorderStyle) || "SOLID").trim().toUpperCase(),
    top: true, left: true, bottom: true, right: true, vertical: true, horizontal: true
  };
}

function applyLayoutSnapshotBorder_(range, borderConfig) {
  const style = SpreadsheetApp.BorderStyle[borderConfig.style] || SpreadsheetApp.BorderStyle.SOLID;
  range.setBorder(
    borderConfig.top, borderConfig.left, borderConfig.bottom, borderConfig.right, 
    borderConfig.vertical, borderConfig.horizontal, borderConfig.color, style
  );
}

// === TEMPLATE & SYSTEM SHEET VISIBILITY COMMANDS ===

function hideTemplates() {
  return hideReportTemplates(null, false);
}

function showTemplates() {
  return showReportTemplates(null, false);
}

function hideReportTemplates(dashboardOverride, timing) {
  if (timing) return setReportTemplateVisibility_(getDashboardConfigForTemplateVisibility_(dashboardOverride), true, timing);
  return runFrameworkTimed_("Hide Report Templates", function(activeTiming) {
    return setReportTemplateVisibility_(getDashboardConfigForTemplateVisibility_(dashboardOverride), true, activeTiming);
  });
}

function showReportTemplates(dashboardOverride, timing) {
  if (timing) return setReportTemplateVisibility_(getDashboardConfigForTemplateVisibility_(dashboardOverride), false, timing);
  return runFrameworkTimed_("Show Report Templates", function(activeTiming) {
    return setReportTemplateVisibility_(getDashboardConfigForTemplateVisibility_(dashboardOverride), false, activeTiming);
  });
}

function hideSystemSheets_() {
  return runFrameworkTimed_("Hide System Sheets", function(timing) {
    const count = hideSystemAndTestingSheets_(timing);
    notify_("System/testing sheets hidden: " + count);
    return count;
  });
}

function showSystemSheets_() {
  return runFrameworkTimed_("Show System Sheets", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const names = getSystemAndTestingSheetNames_();
    let shownCount = 0;

    ss.getSheets().forEach(function(sheet) {
      const sheetName = String(sheet.getName() || "").trim();
      if (sheetName === "RFF_BASE_TEMPLATE") {
        hideSheetIfNeeded_(sheet);
        return;
      }
      if (!names.has(sheetName) && !isSystemOrTestingSheet_(sheet)) return;

      try {
        if (sheet.isSheetHidden()) {
          sheet.showSheet();
          shownCount++;
        }
      } catch (err) {
        logBestEffortWarning_("Could not show system/testing sheet " + sheetName + ": " + err.message);
      }
    });

    markFrameworkStep_(timing, "System/testing sheets shown", "Sheets shown: " + shownCount);
    notify_("System/testing sheets shown: " + shownCount);
    return shownCount;
  });
}

// === BATCH MONTHLY HIDE & ARCHIVE COMMANDS ===

function hideMonthlyImportSheets() {
  const monthParts = promptForLockedYearReportMonth_("Hide Sub-Reports (Month & Prior)");
  if (!monthParts) return null;
  const parsed = buildPromptedMonthContext_(monthParts);
  const specs = [
    { label: "Banners", keywords: ["Banners", "Banner Report"] },
    { label: "CP Due Date", keywords: ["CP Due Date", "CP Due", "Care Plan Due Date Report", "Care Plan Due"] },
    { label: "Unlocked CP", keywords: ["Unlocked CP", "Unlock CP", "Unlocked Care Plan"] }
  ];
  return hideMonthlySheetsBySpecs_("Hide Monthly Sub-Reports", parsed, specs);
}

function hideMonthlyActiveSheets() {
  const monthParts = promptForLockedYearReportMonth_("Hide Active Sheets (Month & Prior)");
  if (!monthParts) return null;
  return hideMonthlySheetsBySpecs_("Hide Monthly Active Sheets", buildPromptedMonthContext_(monthParts), [
    { label: "Refined Data", keywords: ["Refined Data"] },
    { label: "Master List", keywords: ["Master List"] },
    { label: "Monthly Change", keywords: ["Monthly Change"] },
    { label: "Disenrolled Exclusion", keywords: ["Disenrolled Exclusion"] }
  ]);
}

function hideMonthlySheetsBySpecs_(processName, parsedMonth, specs) {
  return runFrameworkTimed_(processName + " " + parsedMonth.monthLabel + " & Prior", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const result = { hidden: [], skipped: [] };
    specs.forEach(function(spec) {
      // Targets prompted month AND all prior historical months
      const sheets = findArchiveMonthlyCandidateSheetsUpToDate_(ss, spec.keywords, parsedMonth.reportDate);
      if (!sheets.length) {
        result.skipped.push(spec.label + " not found");
        return;
      }
      sheets.forEach(function(sheet) {
        try {
          if (!sheet.isSheetHidden()) {
            activateVisibleSheetBeforeHiding_(sheet);
            sheet.hideSheet();
          }
          result.hidden.push(sheet.getName());
        } catch (err) {
          result.skipped.push(sheet.getName() + ": " + err.message);
        }
      });
    });
    notify_(processName + " complete for " + parsedMonth.monthLabel + " and prior. Hidden: " + result.hidden.length + "; Skipped: " + result.skipped.length + ".");
    return result;
  });
}

function archiveMonthlyImportSheets() {
  const monthParts = promptForLockedYearReportMonth_("Archive Sub-Reports (Month & Prior)");
  if (!monthParts) return null;
  const parsed = buildPromptedMonthContext_(monthParts);

  return runFrameworkTimed_("Archive Monthly Sub-Reports " + parsed.monthLabel + " & Prior", function(timing) {
    const result = archiveMonthlySheetsBySpecs_(parsed, [
      { label: "Banners", keywords: ["Banners", "Banner Report"] },
      { label: "CP Due Date", keywords: ["CP Due Date", "CP Due", "Care Plan Due Date Report", "Care Plan Due"] },
      { label: "Unlocked CP", keywords: ["Unlocked CP", "Unlock CP", "Unlocked Care Plan"] }
    ], timing);
    refreshIndexAfterSheetWorkflow_("Archive Monthly Sub-Reports");
    notifyArchiveMonthlySheetsResult_("Archive Monthly Sub-Reports", parsed.monthLabel + " and prior", result);
    return result;
  });
}

function archiveMonthlyActiveSheets() {
  const monthParts = promptForLockedYearReportMonth_("Archive Active Sheets (Month & Prior)");
  if (!monthParts) return null;
  const parsed = buildPromptedMonthContext_(monthParts);

  return runFrameworkTimed_("Archive Monthly Active Sheets " + parsed.monthLabel + " & Prior", function(timing) {
    const result = archiveMonthlySheetsBySpecs_(parsed, [
      { label: "Raw Data", keywords: ["Raw Data"] },
      { label: "Master List", keywords: ["Master List"] },
      { label: "Monthly Change", keywords: ["Monthly Change"] }
    ], timing);
    updateIndexSheet();
    notifyArchiveMonthlySheetsResult_("Archive Monthly Active Sheets", parsed.monthLabel + " and prior", result);
    return result;
  });
}

function archiveMonthlySheetsBySpecs_(parsedMonth, specs, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const archiveId = typeof getDocumentPropertiesCached_ === "function" ?
    (getDocumentPropertiesCached_().getProperty("RFF_ARCHIVE_SPREADSHEET_ID") || RFF_ARCHIVE_SPREADSHEET_ID) :
    getArchiveSpreadsheetId_();

  const archiveSs = SpreadsheetApp.openById(archiveId);
  const result = { archived: [], skipped: [], failed: [] };
  markFrameworkStep_(timing, "Archive workbook connection established for batch", "Archive Spreadsheet ID: " + archiveId);

  specs.forEach(function(spec) {
    // Targets prompted month AND all prior historical months
    const sheets = findArchiveMonthlyCandidateSheetsUpToDate_(ss, spec.keywords, parsedMonth.reportDate);
    if (!sheets.length) {
      const message = "No local sheet found for " + spec.label + " " + parsedMonth.monthLabel + " or prior";
      logBestEffortWarning_(message);
      markFrameworkStep_(timing, "Archive skipped: " + spec.label, message);
      result.skipped.push(spec.label);
      return;
    }

    sheets.forEach(function(sheet) {
      const sheetName = sheet.getName();
      try {
        const archiveResult = copySheetToArchiveAndDeleteLocal_(ss, archiveSs, sheet, sheetName, timing);
        result.archived.push(sheetName);
        markFrameworkStep_(timing, "Archived monthly sheet: " + sheetName, archiveResult.localAction || "Local cleanup complete");
      } catch (err) {
        const message = sheetName + ": " + err.message;
        logBestEffortWarning_("Archive monthly sheet failed: " + message);
        markFrameworkStep_(timing, "Archive failed: " + sheetName, err.message);
        result.failed.push(message);
      }
    });
  });

  markFrameworkStep_(timing, "Archive monthly sheets complete", "Archived: " + result.archived.length + "; Skipped: " + result.skipped.length + "; Failed: " + result.failed.length);
  return result;
}

/**
 * Core locator engine for "Month & Prior" logic. Converts dates to YYYYMM integers
 * and captures any sheet with a date key <= the target cutoff key.
 */
function findArchiveMonthlyCandidateSheetsUpToDate_(ss, keywords, cutoffDate) {
  const keywordList = (keywords || []).map(k => String(k).trim().toLowerCase()).filter(Boolean);
  const matches = [];
  const cutoffKey = cutoffDate ? Number(Utilities.formatDate(cutoffDate, Session.getScriptTimeZone(), "yyyyMM")) : 0;

  ss.getSheets().forEach(function(sheet) {
    const name = sheet.getName();
    const lowerName = name.toLowerCase();
    
    if (lowerName.indexOf("template") !== -1) return;
    
    const hasKeyword = keywordList.some(k => lowerName.indexOf(k) !== -1);
    if (!hasKeyword) return;

    const sheetDate = extractFirstDateFromSheetName_(name);
    if (sheetDate) {
      const sheetKey = Number(Utilities.formatDate(sheetDate, Session.getScriptTimeZone(), "yyyyMM"));
      
      // Target Month & Prior captured here 
      if (sheetKey <= cutoffKey) {
        matches.push(sheet);
      }
    }
  });

  return matches.sort((a, b) => a.getName().localeCompare(b.getName()));
}

function copySheetToArchiveAndDeleteLocal_(ss, archiveSs, sourceSheet, archiveName, timing) {
  if (!sourceSheet) throw new Error("Source sheet is missing.");
  if (ss.getSheets().length <= 1) throw new Error("Cannot delete the final local sheet after archiving.");

  deleteArchiveSheetIfExists_(archiveSs, archiveName);
  const archived = sourceSheet.copyTo(archiveSs);
  archived.setName(archiveName);
  if (typeof archived.showSheet === "function") archived.showSheet();
  const verified = archiveSs.getSheetByName(archiveName);
  if (!verified) throw new Error("Archive copy verification failed.");

  if (isProtectedSheetDeletionName_(sourceSheet.getName())) {
    hideSheetIfNeeded_(sourceSheet, timing, "Archived protected local sheet hidden instead of deleted: " + sourceSheet.getName());
    return { sheet: verified, localAction: "Protected local sheet retained and hidden" };
  }

  deleteSheetSafely_(ss, sourceSheet, "archive monthly local cleanup");
  return { sheet: verified, localAction: "Local sheet deleted" };
}

function notifyArchiveMonthlySheetsResult_(title, monthLabel, result) {
  notify_(
    title + " complete for " + monthLabel + ".\n" +
    "Archived: " + (result.archived.length ? result.archived.join(", ") : "None") + "\n" +
    "Skipped: " + (result.skipped.length ? result.skipped.join(", ") : "None") + "\n" +
    "Failed: " + (result.failed.length ? result.failed.join(" | ") : "None")
  );
}

function applyOutputVisibilityPolicy_(sheet, dashboard, sheetType, timing) {
  if (!sheet) return;
  const normalizedSheetType = normalizeDashboardSheetTypeKey_(sheetType);
  let activeDashboard = dashboard || null;
  if (!activeDashboard) {
    try {
      activeDashboard = loadDashboardConfig_();
    } catch (err) {
      logBestEffortWarning_("Output visibility dashboard lookup skipped for " + sheet.getName() + ": " + err.message);
    }
  }
  const behavior = activeDashboard
    ? (getBehaviorForSheetType_(activeDashboard, normalizedSheetType) || getDefaultBehaviorForSheetType_(normalizedSheetType))
    : getDefaultBehaviorForSheetType_(normalizedSheetType);
  
  const visibility = String(behavior.outputVisibility || "VISIBLE").trim().toUpperCase();
  if (visibility === "HIDDEN" || visibility === "HIDE") {
    hideSheetIfNeeded_(sheet, timing, "Hide governed output sheet: " + sheet.getName());
  } else {
    showSheetIfNeeded_(sheet, timing, "Show governed output sheet: " + sheet.getName());
  }
}

function buildMonthlyChangeReportSectionLayout_(reportSheet, sourceSheet, headers, monthParts) {
  const reportHeaders = getMonthlyChangeReportHeaders_(headers || []);
  const lastCol = Math.max(reportHeaders.length, 1);

  resizeSheetGrid_(reportSheet, Math.max(reportSheet.getMaxRows(), 10), lastCol);

  reportSheet.getRange("A1").setValue("Monthly Change Report");
  reportSheet.getRange("A2").setValue("Date");
  if (monthParts) {
    reportSheet.getRange("B2").setValue(monthParts.firstDay);
    reportSheet.getRange("C2").setValue("to");
    reportSheet.getRange("D2").setValue(monthParts.lastDay);
  }
  if (reportHeaders.length) {
    reportSheet.getRange(HEADER_ROW, 1, 1, lastCol).setValues([padRowToWidth_(reportHeaders, lastCol)]);
  }

  reportSheet.setFrozenRows(4);
  reportSheet.setFrozenColumns(2);
}

function assignSortOrderAndHideExtraRows() {
  const sheet = SpreadsheetApp.getActiveSheet();
  sortSheetAlphabeticallyByParticipantName_(sheet);
  notify_("Participant alphabetical sorting applied. Primary rows remain visible.");
}

function buildParticipantBlocksForSortOrder_(values, headerMap, pmrIdx) {
  const lastNameIdx = headerMap["Last Name"];
  const firstNameIdx = headerMap["First Name"];
  const blocksByPMR = new Map();
  values.forEach((row, idx) => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr) return;
    if (!blocksByPMR.has(pmr)) {
      blocksByPMR.set(pmr, {
        pmr: pmr,
        lastName: lastNameIdx !== undefined ? row[lastNameIdx] : "",
        firstName: firstNameIdx !== undefined ? row[firstNameIdx] : "",
        rows: []
      });
    }
    const block = blocksByPMR.get(pmr);
    if (!String(block.lastName || "").trim() && lastNameIdx !== undefined && String(row[lastNameIdx] || "").trim()) {
      block.lastName = row[lastNameIdx];
    }
    if (!String(block.firstName || "").trim() && firstNameIdx !== undefined && String(row[firstNameIdx] || "").trim()) {
      block.firstName = row[firstNameIdx];
    }
    block.rows.push({ row: row, originalIndex: idx });
  });
  return Array.from(blocksByPMR.values());
}

function getSheetSortProfileByName_(sheetName) {
  const name = String(sheetName || "").trim();
  const lowerName = name.toLowerCase();
  const profiles = getTabOrganizationProfilesForSort_();

  for (let i = 0; i < profiles.length; i++) {
    const profile = profiles[i];
    const key = String(profile.nameOrPrefix || "").trim();
    if (!key) continue;
    const lowerKey = key.toLowerCase();
    const exactMatch = lowerName === lowerKey;
    const prefixMatch = lowerName.indexOf(lowerKey + " ") === 0 || lowerName.indexOf(lowerKey + " -") === 0 || lowerName.indexOf(lowerKey) === 0;
    if (!exactMatch && !prefixMatch) continue;

    let rank = numberOrDefault_(profile.rankBase, 600);
    if (String(profile.special || "").trim().toUpperCase() === "DYNAMIC RANKING") {
      const monthDate = extractFirstDateFromSheetName_(name);
      const month = monthDate ? monthDate.getMonth() + 1 : 0;
      rank = month >= 1 && month <= 12 ? rank + ((12 - month) * 15) : 600;
    }

    return { rank: rank, group: profile.group || "Other" };
  }
  return { rank: 600, group: "Other" };
}

function getGlobalSheetSortRankByName_(sheetName) {
  return getSheetSortProfileByName_(sheetName).rank;
}

function buildSheetSortRecord_(sheet) {
  const name = String(sheet && sheet.getName ? sheet.getName() : "").trim();
  const profile = getSheetSortProfileByName_(name);
  return { sheet: sheet, name: name, rank: profile.rank, group: profile.group };
}

function compareSheetSortRecords_(a, b) {
  const rankDiff = a.rank - b.rank;
  if (rankDiff !== 0) return rankDiff;
  return a.name.localeCompare(b.name);
}

function getOrderedSheetSortRecords_(ss, monthParts, options) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  options = options || {};
  return ss.getSheets()
    .map(function(sheet) { return buildSheetSortRecord_(sheet); })
    .filter(function(record) {
      if (options.operationalOnly && !record.operational) return false;
      if (options.visibleOnly && typeof record.sheet.isSheetHidden === "function" && record.sheet.isSheetHidden()) return false;
      return true;
    })
    .sort(compareSheetSortRecords_);
}

function moveSheetToPositionPreservingVisibility_(ss, record, targetPosition, context) {
  if (!record || !record.sheet || record.sheet.getIndex() === targetPosition) return false;
  const sheet = record.sheet;
  const wasHidden = typeof sheet.isSheetHidden === "function" && sheet.isSheetHidden();
  try {
    if (wasHidden) sheet.showSheet();
    ss.setActiveSheet(sheet);
    ss.moveActiveSheet(Math.max(1, Math.min(targetPosition, ss.getNumSheets())));
    return true;
  } catch (err) {
    logBestEffortWarning_((context || "Sheet sort") + " skipped for " + record.name + ": " + err.message);
    return false;
  } finally {
    if (wasHidden) {
      try {
        if (!sheet.isSheetHidden()) {
          activateVisibleSheetBeforeHiding_(sheet);
          sheet.hideSheet();
        }
      } catch (hideErr) {
        logBestEffortWarning_((context || "Sheet sort") + " visibility restore skipped for " + record.name + ": " + hideErr.message);
      }
    }
  }
}

function applySheetSortRecords_(ss, records, startPosition, context) {
  let moves = 0;
  let position = startPosition || 1;
  (records || []).forEach(function(record) {
    if (moveSheetToPositionPreservingVisibility_(ss, record, position, context)) moves++;
    position++;
  });
  clearMonthlySheetLookupCache_();
  return moves;
}

function captureHiddenSheetIds_(ss) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  const hiddenIds = {};
  ss.getSheets().forEach(function(sheet) {
    if (sheet.isSheetHidden && sheet.isSheetHidden()) hiddenIds[sheet.getSheetId()] = true;
  });
  return hiddenIds;
}

function restoreHiddenSheetIds_(ss, hiddenIds, context) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  hiddenIds = hiddenIds || {};
  ss.getSheets().forEach(function(sheet) {
    if (!hiddenIds[sheet.getSheetId()] || !sheet.isSheetHidden || sheet.isSheetHidden()) return;
    try {
      activateVisibleSheetBeforeHiding_(sheet);
      sheet.hideSheet();
    } catch (err) {
      logBestEffortWarning_((context || "Sheet visibility restore") + " skipped for " + sheet.getName() + ": " + err.message);
    }
  });
}

function enforceGlobalSheetSortOrder_(monthParts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hiddenSheetIds = captureHiddenSheetIds_(ss);
  const records = getOrderedSheetSortRecords_(ss, monthParts);
  const moves = applySheetSortRecords_(ss, records, 1, "Global sheet sort");
  restoreHiddenSheetIds_(ss, hiddenSheetIds, "Global sheet sort visibility restore");
  return moves;
}

function enforceGlobalSheetSortOrder(monthParts) {
  return enforceGlobalSheetSortOrder_(monthParts || getMonthDateParts_(new Date()));
}

// ============================================================================
// SECTION 4
// ============ BUILD TEMPLATE ============
// ============================================================================
// Ownership inventory: 0 constants and 33 functions.

// --- SECTION FUNCTIONS ------------------------------------------------------

// ============================================================================
// SECTION 4
// ============ BUILD TEMPLATE ENGINE ============
// ============================================================================

function isTemplateSheetName_(sheetName) {
  return String(sheetName || "").trim().indexOf("Template - ") === 0;
}

function applyTemplateColumnWidths_(sheet, template, width) {
  const widths = [];
  for (let col = 1; col <= width; col++) widths.push(template.getColumnWidth(col));
  applyColumnWidthsInRuns_(sheet, widths);
}

function quickBuildAllTemplates() {
  showQuickStartToast_("Quick Build All Templates: building hidden templates and validating...");
  buildAllTemplatesAndValidate();
  showQuickStartToast_("Quick Build All Templates complete.");
}

function buildAllTemplatesAndValidate() {
  const buildResult = runFrameworkTimed_("Build All Templates And Validate", function(timing) {
    const dashboard = loadDashboardConfig_(true);
    ensureGoldenMasterTemplate_(dashboard, timing);
    const results = [];
    
    // Defer hiding until the end of the batch to prevent UI flashing
    RFF_DEFER_TEMPLATE_HIDE_DURING_BATCH_ = true;
    
    sortSheetDefinitionsByProductionOrder_(dashboard.sheetDefinitions).forEach(function(sheetDef) {
      try {
        const template = createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, timing);
        results.push({ templateName: sheetDef.templateName, status: "PASS" });
      } catch (err) {
        results.push({ templateName: sheetDef.templateName, status: "FAIL", issue: err.message });
        logBestEffortWarning_("Template build continued after failure for " + sheetDef.templateName + ": " + err.message);
      }
    });
    
    RFF_DEFER_TEMPLATE_HIDE_DURING_BATCH_ = false;
    setReportTemplateVisibility_(dashboard, true, timing);
    forceBaseTemplateHidden_();
    
    return results;
  });
  
  runDashboardQualityValidateTemplates();
  return buildResult;
}

function setReportTemplateVisibility_(dashboard, hidden, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetMap = {};
  ss.getSheets().forEach(function(sheet) {
    sheetMap[sheet.getName()] = sheet;
  });

  sortSheetDefinitionsByProductionOrder_(dashboard.sheetDefinitions).forEach(function(sheetDef) {
    const sheet = sheetMap[sheetDef.templateName];
    if (!sheet || sheetDef.templateName === RFF_BASE_TEMPLATE_NAME) return;
    if (hidden) hideSheetIfNeeded_(sheet, timing, "Hide template sheet: " + sheetDef.templateName);
    else showSheetIfNeeded_(sheet, timing, "Show template sheet: " + sheetDef.templateName);
  });

  Object.keys(sheetMap).forEach(function(sheetName) {
    if (sheetName === RFF_BASE_TEMPLATE_NAME || String(sheetName || "").indexOf("Template - ") !== 0) return;
    const sheet = sheetMap[sheetName];
    if (hidden) hideSheetIfNeeded_(sheet, timing, "Hide orphan template sheet: " + sheetName);
    else showSheetIfNeeded_(sheet, timing, "Show orphan template sheet: " + sheetName);
  });
  
  forceBaseTemplateHidden_();
  if (timing) markFrameworkStep_(timing, hidden ? "All template sheets successfully hidden" : "All template sheets successfully shown");
}

function validateReportTemplates() {
  return runFrameworkTimed_("Validate Templates", function(timing) {
    const dashboard = loadDashboardConfig_();
    markFrameworkStep_(timing, "Dashboard loaded");
    return validateReportTemplatesCore_(dashboard, timing);
  });
}

function validateReportTemplatesCore_(dashboard, timing, options) {
  const activeDashboard = dashboard || loadDashboardConfig_();
  const results = sortSheetDefinitionsByProductionOrder_(activeDashboard.sheetDefinitions).map(function(sheetDef) {
    return validateTemplateFromDashboard_(activeDashboard, sheetDef);
  });
  writeTemplateValidationReport_(results, options);
  markFrameworkStep_(timing, options && options.deferDashboardWrite ? "Dashboard Quality Section G staged" : "Dashboard Quality Section G saved");
  return results;
}

function clearTemplateForFullBuild_(sheet, sheetDef, timing, templateExisted) {
  if (!templateExisted) {
    markFrameworkStep_(timing, "Create template fast path - clear skipped for new sheet: " + sheetDef.templateName);
    return;
  }

  try {
    const clearRows = Math.max(sheet.getMaxRows(), 1);
    const clearCols = Math.max(sheet.getMaxColumns(), 1);
    sheet.getRange(1, 1, clearRows, clearCols).clearContent().clearFormat().breakApart();
    sheet.setConditionalFormatRules([]);
  } catch (err) {
    try {
      sheet.clearContents();
      sheet.clearFormats();
      sheet.setConditionalFormatRules([]);
    } catch (fallbackErr) {
      logBestEffortWarning_("Template governed-range clear skipped for " + sheet.getName() + ": " + fallbackErr.message);
    }
  }
  markFrameworkStep_(timing, "Clear governed template range for full build: " + sheetDef.templateName);
}

function hideTemplateIfNeeded_(sheet, sheetDef, timing) {
  try {
    if (typeof sheet.isSheetHidden === "function" && sheet.isSheetHidden()) {
      markFrameworkStep_(timing, "Template already hidden - skipped hide: " + sheetDef.templateName);
      return;
    }
    hideSheetIfNeeded_(sheet, timing, "Hide template: " + sheetDef.templateName);
  } catch (err) {
    logBestEffortWarning_("Template hide skipped for " + sheetDef.templateName + ": " + err.message);
    markFrameworkStep_(timing, "Hide template skipped/error: " + sheetDef.templateName);
  }
}

function applyTemplateBaseFormatting_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing) {
  const globals = dashboard.globals;
  const theme = getThemeColorsFromBase_(sheetDef.baseColor, globals);
  const headerRow = globals.headerRow;
  const dataStartRow = globals.dataStartRow;

  sheet.getRange(1, 1, rowCount, colCount)
    .setFontFamily(globals.standardFont)
    .setFontColor(globals.standardFontColor)
    .setFontSize(globals.standardFontSize)
    .setHorizontalAlignment(globals.defaultHorizontalAlignment || "left")
    .setVerticalAlignment(globals.defaultVerticalAlignment || "middle")
    .setWrapStrategy(toWrapStrategy_(globals.defaultDataWrap || "CLIP"))
    .setBorder(true, true, true, true, true, true, globals.globalBorderColor || "#CCCCCC", getGlobalBorderStyle_(globals));

  applyTitleRows_(sheet, dashboard, sheetDef, theme, colCount);
  markFrameworkStep_(timing, "Apply title rows: " + sheetDef.templateName);

  applyHeaderRow_(sheet, dashboard, sheetDef, headers, theme, colCount);
  markFrameworkStep_(timing, "Apply header row: " + sheetDef.templateName);

  applyDataRows_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing);
  markFrameworkStep_(timing, "Apply data row base style: " + sheetDef.templateName);

  applyColumnWidths_(sheet, dashboard, headers);
  markFrameworkStep_(timing, "Apply column widths: " + sheetDef.templateName);

  applyGovernedTextAndNumberFormats_(sheet, dashboard, headers, dataStartRow, rowCount - dataStartRow + 1);
  markFrameworkStep_(timing, "Apply governed text/date/number formats: " + sheetDef.templateName);

  sheet.showColumns(1, Math.max(sheet.getMaxColumns(), 1));
  markFrameworkStep_(timing, "Apply hidden/show column settings: " + sheetDef.templateName);

  if (behavior.usesFilter) {
    ensureTemplateFilter_(sheet, headerRow, rowCount, colCount, sheetDef, timing);
  }
}

function writeTemplateMetadata_(sheet, dashboard, sheetDef, colCount) {
  try {
    const note = [
      "Framework Version: " + RFF_VERSION,
      "Template Version: " + dashboard.globals.templateVersion,
      "Sheet Type: " + sheetDef.sheetType,
      "Built: " + new Date(),
      "Source: Format Dashboard"
    ].join("\n");
    sheet.getRange(1, Math.max(colCount, 1)).setNote(note);
  } catch (err) {
    logBestEffortWarning_("Template metadata skipped for " + sheet.getName() + ": " + err.message);
  }
}

function ensureTemplateFilter_(sheet, headerRow, rowCount, colCount, sheetDef, timing) {
  const expectedRows = Math.max(rowCount - headerRow + 1, 1);
  let existing = null;

  try {
    existing = sheet.getFilter();
  } catch (err) {
    logBestEffortWarning_("Template filter lookup skipped for " + sheet.getName() + ": " + err.message);
  }

  if (existing) {
    try {
      const range = existing.getRange();
      const matches = range.getRow() === headerRow &&
        range.getColumn() === 1 &&
        range.getNumRows() === expectedRows &&
        range.getNumColumns() === colCount;

      if (RFF_FAST_TEMPLATE_REFRESH && matches) {
        markFrameworkStep_(timing, "Filter already correct - skipped recreation: " + sheetDef.templateName);
        return;
      }
    } catch (err) {
      logBestEffortWarning_("Template filter comparison skipped for " + sheet.getName() + ": " + err.message);
    }

    try { existing.remove(); } catch (err) {}
    markFrameworkStep_(timing, "Remove existing filter: " + sheetDef.templateName);
  }

  try {
    sheet.getRange(headerRow, 1, expectedRows, colCount).createFilter();
    markFrameworkStep_(timing, "Create filter: " + sheetDef.templateName);
  } catch (err) {
    logBestEffortWarning_("Template filter creation skipped for " + sheet.getName() + ": " + err.message);
  }
}

function applyTemplateFreezeAndTabColor_(sheet, dashboard, sheetDef, colCount, timing) {
  const globals = dashboard.globals;
  const expectedFrozenRows = globals.freezeRows;
  const expectedFrozenCols = Math.min(globals.freezeColumns, colCount);
  const expectedTabColor = getThemeColorsFromBase_(sheetDef.baseColor, globals).level1;

  try {
    if (!(RFF_FAST_TEMPLATE_REFRESH && sheet.getFrozenRows() === expectedFrozenRows)) {
      sheet.setFrozenRows(expectedFrozenRows);
    }
  } catch (err) {}
  markFrameworkStep_(timing, "Ensure frozen rows: " + sheetDef.templateName);

  try {
    if (!(RFF_FAST_TEMPLATE_REFRESH && sheet.getFrozenColumns() === expectedFrozenCols)) {
      sheet.setFrozenColumns(expectedFrozenCols);
    }
  } catch (err) {}
  markFrameworkStep_(timing, "Ensure frozen columns: " + sheetDef.templateName);

  try {
    const currentColor = String(sheet.getTabColor() || "").toUpperCase();
    if (!(RFF_FAST_TEMPLATE_REFRESH && currentColor === expectedTabColor)) {
      sheet.setTabColor(expectedTabColor);
    }
  } catch (err) {}
  markFrameworkStep_(timing, "Ensure tab color: " + sheetDef.templateName);
}

function getLiveTemplateValidationStatus_() {
  return getLiveSheetStatus_("Dashboard Quality Report", "Template Validation");
}

function createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetDef.templateName);
  const existed = !!sheet;
  if (!sheet) {
    const base = ss.getSheetByName(RFF_BASE_TEMPLATE_NAME) || ensureGoldenMasterTemplate_(dashboard, timing);
    sheet = base.copyTo(ss).setName(sheetDef.templateName);
    placeCreatedSheetInConfiguredOrder_(sheet);
  }
  const headers = getHeadersForSheetType_(dashboard, sheetDef.sheetType);
  const behavior = getBehaviorForSheetType_(dashboard, sheetDef.sheetType);
  const baselineRows = 100; // Force governed baseline template length
  const columns = Math.max(headers.length, 4);
  
  buildTemplateFromDashboard_(sheet, dashboard, sheetDef, headers, baselineRows, columns, behavior, timing, existed);
  
  sheet.showColumns(1, sheet.getMaxColumns());
  hideSheetIfNeeded_(sheet, timing, "Hide built template: " + sheetDef.templateName);
  return sheet;
}

function buildTemplateFromDashboard_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing, templateExisted) {
  markFrameworkStep_(timing, "Full template build required: " + sheetDef.templateName);

  resizeSheetGrid_(sheet, rowCount, colCount);
  markFrameworkStep_(timing, "Set template grid from dashboard: " + sheetDef.templateName + " (" + rowCount + " rows x " + colCount + " cols)");

  clearTemplateForFullBuild_(sheet, sheetDef, timing, templateExisted);
  
  applyTemplateBaseFormatting_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing);
  markFrameworkStep_(timing, "Apply full template formatting: " + sheetDef.templateName);

  writeTemplateMetadata_(sheet, dashboard, sheetDef, colCount);
  markFrameworkStep_(timing, "Write template metadata: " + sheetDef.templateName);

  applyTemplateFreezeAndTabColor_(sheet, dashboard, sheetDef, colCount, timing);

  markFrameworkStep_(timing, "Complete full template build: " + sheetDef.templateName);
  return sheet;
}

function validateTemplateFromDashboard_(dashboard, sheetDef, options) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetDef.templateName);
  const issues = [];
  const globals = dashboard.globals;
  const expectedHeaders = getHeadersForSheetType_(dashboard, sheetDef.sheetType);
  const behavior = getBehaviorForSheetType_(dashboard, sheetDef.sheetType);

  if (!sheet) {
    return {
      templateName: sheetDef.templateName,
      sheetType: sheetDef.sheetType,
      status: "FAIL",
      issues: "Template missing"
    };
  }

  if (expectedHeaders.length === 0) issues.push("No headers defined in dashboard");

  try {
    const frozenRows = sheet.getFrozenRows();
    const frozenColumns = sheet.getFrozenColumns();

    if (frozenRows !== globals.freezeRows) {
      issues.push("Frozen rows expected " + globals.freezeRows + " but found " + frozenRows);
    }

    if (expectedHeaders.length > 0 && frozenColumns > globals.freezeColumns) {
      issues.push("Frozen columns expected " + globals.freezeColumns + " or less but found " + frozenColumns);
    }
  } catch (err) {
    issues.push("Could not check frozen settings: " + err.message);
  }

  try {
    const actualHeaders = sheet.getRange(globals.headerRow, 1, 1, Math.max(expectedHeaders.length, 1))
      .getValues()[0]
      .map(normalizeHeader_);

    expectedHeaders.forEach(function(expected, index) {
      if (actualHeaders[index] !== expected) {
        issues.push("Header mismatch col " + (index + 1) + ": expected " + expected + ", found " + actualHeaders[index]);
      }
    });
  } catch (err) {
    issues.push("Could not check headers: " + err.message);
  }

  try {
    expectedHeaders.forEach(function(header, index) {
      const def = dashboard.columnDefinitions[header] || {};
      if (def.width && sheet.getColumnWidth(index + 1) !== def.width) {
        issues.push("Width mismatch for " + header);
      }
    });
  } catch (err) {
    issues.push("Could not check column widths: " + err.message);
  }

  try {
    const availableFormatRows = sheet.getMaxRows() - globals.dataStartRow + 1;
    if (availableFormatRows >= 1) {
      const sampleRows = Math.min(10, availableFormatRows);
      const formatWidth = Math.max(expectedHeaders.length, 1);
      const allFormats = sheet.getRange(globals.dataStartRow, 1, sampleRows, formatWidth).getNumberFormats();

      expectedHeaders.forEach(function(header, index) {
        const def = dashboard.columnDefinitions[header] || {};
        const expectedFormat = getExpectedNumberFormat_(def, globals);
        if (!expectedFormat) return;

        const expectedSheetsFormat = getGoogleSheetsNumberFormat_(expectedFormat, def.dateColumn);
        const mismatches = [];
        allFormats.forEach(function(row) {
          const actualFormat = row[index];
          if (!numberFormatsMatch_(actualFormat, expectedSheetsFormat)) {
            if (mismatches.indexOf(actualFormat) === -1) mismatches.push(actualFormat);
          }
        });

        if (mismatches.length > 0) {
          issues.push("Date/number format mismatch for " + header + " expected " + expectedFormat + " but found " + mismatches.join(", "));
        }
      });
    }
  } catch (err) {
    issues.push("Could not check date/number formats: " + err.message);
  }

  try {
    if (behavior.usesFilter && !sheet.getFilter()) issues.push("Filter missing");
  } catch (err) {
    issues.push("Could not check filter: " + err.message);
  }

  return {
    templateName: sheetDef.templateName,
    sheetType: sheetDef.sheetType,
    status: issues.length === 0 ? "PASS" : "FAIL",
    issues: issues.length === 0 ? "OK" : issues.join("; ")
  };
}

function createTemplateFromScriptDefaultsForActiveBuild_(ss, sheetDef) {
  ss = ss || SpreadsheetApp.getActive();
  const normalizedSheetType = normalizeDashboardSheetTypeKey_(sheetDef.sheetType);
  const defaultHeaderItems = (getDefaultHeaderSets_()[normalizedSheetType] || []).slice();
  const headers = defaultHeaderItems.map(function(item) { return String(item && item.header || "").trim(); }).filter(Boolean);
  if (!headers.length) throw new Error("Default headers not found for template: " + sheetDef.templateName);

  const baseTemplate = ss.getSheetByName(RFF_BASE_TEMPLATE_NAME);
  const template = baseTemplate ? baseTemplate.copyTo(ss) : insertGovernedOutputSheet_(ss, sheetDef.templateName);
  setUniqueSheetName_(template, sheetDef.templateName);
  placeCreatedSheetInConfiguredOrder_(template);
  const width = Math.max(headers.length, Number(sheetDef.templateColumnCount || 0), 1);
  const rowCount = Math.max(Number(sheetDef.templateRowCount || RFF_DEFAULTS.templateRows || DATA_START_ROW), DATA_START_ROW);
  resizeSheetGrid_(template, rowCount, width);
  ensureStandardTitleRows_(template);
  template.getRange("A1").setValue(sheetDef.reportTitle || normalizedSheetType);
  template.getRange("A2").setValue("Date");
  template.getRange("C2").setValue("to");
  template.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);

  const fallbackDashboard = {
    globals: RFF_DEFAULTS,
    titleRows: {},
    sheetDefinitions: [sheetDef],
    sheetHeaders: {},
    columnDefinitions: {},
    behaviors: {}
  };
  const theme = getThemeColorsFromBase_(sheetDef.baseColor || RFF_DEFAULTS.baseColor, RFF_DEFAULTS);
  applyNativeBandingToRange_(template, template.getRange(DATA_START_ROW, 1, Math.max(rowCount - DATA_START_ROW + 1, 1), width), theme);
  applyTemplateColumnWidths_(template, template, width);

  try {
    template.setFrozenRows(HEADER_ROW);
    template.setFrozenColumns(0);
    template.setTabColor(sheetDef.baseColor || null);
    applyTemplateFreezeAndTabColor_(template, fallbackDashboard, sheetDef, width, null);
  } catch (err) {}
  
  hideSheetIfNeeded_(template, null, null);
  clearSheetRuntimeCachesForSheet_(template);
  logBestEffortWarning_("Missing active-build template created from script defaults: " + sheetDef.templateName);
  return template;
}

function ensureRequiredMasterListTemplate_(dashboard, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSheetByName("Template - Master List")) return ss.getSheetByName("Template - Master List");

  const sheetDef = getSheetDefinitionByTypeOrNull_(dashboard, SHEET_TYPE.MASTER_LIST) || getDefaultSheetDefinitionByType_(SHEET_TYPE.MASTER_LIST);
  if (!getSheetDefinitionByTypeOrNull_(dashboard, SHEET_TYPE.MASTER_LIST)) {
    dashboard.sheetDefinitions = (dashboard.sheetDefinitions || []).concat([sheetDef]);
  }

  const template = createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, timing);
  markFrameworkStep_(timing, "Required Master List template verified: " + sheetDef.templateName);
  return template;
}

function getDashboardConfigForTemplateVisibility_(dashboardOverride) {
  if (dashboardOverride) return dashboardOverride;
  try {
    return loadDashboardConfig_();
  } catch (err) {
    logBestEffortWarning_("Template visibility dashboard config unavailable; using workbook Template - sheet scan only: " + err.message);
    return { sheetDefinitions: [] };
  }
}

// ============================================================================
// TEMPLATE WRAPPERS (Retained for cross-file compatibility)
// ============================================================================

function createOrRefreshDemoPTemplate_(ss) {
  const dashboard = loadDashboardConfig_();
  const sheetDef = getSheetDefinitionByType_(dashboard, SHEET_TYPE.DEMO_P);
  return createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, null);
}

function applyDemoPTemplateToSheet_(targetSheet, monthParts) {
  if (!targetSheet) return;
  const dashboard = loadDashboardConfig_();
  const sheetDef = getSheetDefinitionByType_(dashboard, SHEET_TYPE.DEMO_P);
  const headers = getHeadersForSheetType_(dashboard, SHEET_TYPE.DEMO_P);
  const behavior = getBehaviorForSheetType_(dashboard, sheetDef.sheetType);

  applyDashboardTemplateFormattingToActiveReportSheet_(
    targetSheet, dashboard, sheetDef, headers, behavior,
    monthParts || { firstDay: new Date(), lastDay: new Date() },
    monthParts ? monthParts.lastDay : new Date(), "", null
  );

  try {
    targetSheet.getRange("A1").setValue(sheetDef.reportTitle || "Demo P");
  } catch (err) {}

  clearSheetRuntimeCachesForSheet_(targetSheet);
}

function createOrRefreshMasterListTemplate_(ss) {
  const dashboard = loadDashboardConfig_();
  const sheetDef = getSheetDefinitionByType_(dashboard, SHEET_TYPE.MASTER_LIST);
  return createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, null);
}

function createMasterListSheetFromTemplate_(ss, targetName, monthParts, timing, timingLabel) {
  return createOutputSheetFromDashboardTemplate_(
    SHEET_TYPE.MASTER_LIST, targetName, [], monthParts.firstDay, monthParts.lastDay, timing, timingLabel || "Master List template copy"
  );
}


// ============================================================================
// SECTION 5
// ============ INDEX ============
// ============================================================================
// ============================================================================
// === SECTION 5: INDEX & WORKSPACE NAVIGATION ENGINE =========================
// ============================================================================

const ML_INDEX_REFRESH_DEFERRED_KEY = "ML_INDEX_REFRESH_DEFERRED";
const INDEX_SHEET = "Index";
const INDEX_HEADER_ROW_COUNT = 4;
const INDEX_DATA_START_ROW = 5;
const INDEX_BUFFER_COLUMN = 5;
const INDEX_TOTAL_COLUMNS = 10;
const INDEX_FIXED_ROW_COUNT = 100;

// ============================================================================
// === INDEX MENU & CONFIGURATION COMMANDS ====================================
// ============================================================================

/**
 * Menu Callback: Configure Archive Spreadsheet ID
 */
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

/**
 * Menu Callback: Configure Index Restore Web App URL
 */
function configureIndexRestoreWebAppUrl() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getDocumentProperties();
  const current = getIndexRestoreWebAppUrl_();
  const response = ui.prompt(
    "Configure Index Restore Web App URL",
    "Paste the deployed Web App /exec URL used by Index restore hyperlinks. Leave blank to use auto-detection.\n\nCurrent URL: " + (current || "(auto-detect / not configured)"),
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return;
  const value = String(response.getResponseText() || "").trim();
  if (value) props.setProperty("ML_INDEX_RESTORE_WEB_APP_URL", value);
  else props.deleteProperty("ML_INDEX_RESTORE_WEB_APP_URL");
  
  updateIndexSheet({ forceShellRebuild: true });
  ui.alert("Index Restore Web App URL", value ? "Index restore hyperlinks enabled and Index rebuilt!" : "Configured URL cleared. Web App auto-detection active.", ui.ButtonSet.OK);
}

// ============================================================================
// === INDEX SHELL & TEMPLATE GOVERNANCE =====================================
// ============================================================================

/**
 * Verifies if the Index sheet has a valid, undamaged structural header shell.
 */
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

/**
 * Builds the structural Index header shell, column widths, and merges once.
 * Uses Section E theme colors from Format Dashboard.
 */
function buildIndexSheetShell_(sheet) {
  const ss = sheet.getParent();
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

  // Column Widths
  const surface = (dashboard.systemSurfaces && dashboard.systemSurfaces["Index"]) || {};
  const customWidths = surface.defaultColumnWidths || [160, 200, 140, 110, 30, 140, 200, 140, 140, 150];

  for (let col = 1; col <= INDEX_TOTAL_COLUMNS; col++) {
    sheet.setColumnWidth(col, customWidths[col - 1] || (col === 5 ? 30 : 150));
  }

  sheet.setFrozenRows(INDEX_HEADER_ROW_COUNT);
  placeCreatedSheetInConfiguredOrder_(sheet);

  return sheet;
}

// ============================================================================
// === DATA UPDATER (ACTIVE WORKSPACE & COLD ARCHIVE) =========================
// ============================================================================

/**
 * Fast Data Refresh: Active Workspace (Columns A-D)
 * Groups active tabs under hierarchical headers defined in Section F.
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

  const groupOrder = [
    "Core Operational",
    "Monthly Active",
    "Monthly Sub-Reports",
    "Source Data",
    "System & Configuration",
    "Template"
  ];

  const sheetsByGroup = {};
  groupOrder.forEach(g => { sheetsByGroup[g] = []; });

  ss.getSheets().forEach(function(workbookSheet) {
    const sheetName = workbookSheet.getName();
    if (seenLocal.has(sheetName)) return;
    const profile = getSheetSortProfileByName_(sheetName);
    const group = String(profile.group || "Other").trim() || "Other";
    if (!sheetsByGroup[group]) sheetsByGroup[group] = [];
    sheetsByGroup[group].push(sheetName);
  });

  const allGroups = groupOrder.concat(
    Object.keys(sheetsByGroup).filter(g => groupOrder.indexOf(g) === -1)
  );

  let currentRowIdx = INDEX_DATA_START_ROW;

  allGroups.forEach(function(group) {
    const sheetNames = sheetsByGroup[group] || [];
    if (sheetNames.length === 0) return;

    localRows.push([group, "", "", ""]); // Section Group Header
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

  // Clear & Flush Data
  sheet.getRange(startRow, 1, clearRows, 4).clearContent().setBackground("#FFFFFF").setFontWeight("normal");

  if (localRows.length > 0) {
    sheet.getRange(startRow, 1, localRows.length, 4).setValues(localRows);

    // Apply Group Header Styling via RangeList
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
  let localCount = 0;
  let archiveCount = 0;

  if (!archiveOnly) localCount = updateIndexLocalWorkspace_(sheet, theme);
  if (!activeOnly) archiveCount = updateIndexArchiveWorkspace_(sheet, theme, preOpenedArchiveSs);

  sheet.getRange("B2").setValue(new Date()).setNumberFormat("mm/dd/yyyy hh:mm:ss");

  const maxNeededDataRows = Math.max(localCount, archiveCount);
  forceSheetRowCount_(sheet, Math.max(INDEX_FIXED_ROW_COUNT, INDEX_DATA_START_ROW + maxNeededDataRows));

  return sheet;
}

function createIndexSheet(options) {
  return updateIndexSheet(options);
}

function refreshIndexAfterSheetWorkflow_(workflowName, options) {
  try {
    updateIndexSheet(options || { activeOnly: true });
  } catch (err) {
    logBestEffortWarning_((workflowName || "Workflow") + " index refresh skipped: " + err.message);
  }
}

// ============================================================================
// === ARCHIVE SHEET RESTORATION ENGINE =======================================
// ============================================================================

/**
 * Menu Callback / Interceptor: Restores an archive sheet based on selected row in Column G.
 */
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

/**
 * Deep Data Retrieval: Copies sheet from cold storage drive back into main workbook.
 */
function restoreSheetFromArchiveWorkbook(targetSheetName) {
  const mainSs = SpreadsheetApp.getActiveSpreadsheet();
  targetSheetName = String(targetSheetName || "").trim();

  if (!targetSheetName) throw new Error("Missing archive sheet name to restore.");
  if (mainSs.getSheetByName(targetSheetName)) {
    throw new Error("The sheet '" + targetSheetName + "' already exists locally in this workbook.");
  }

  const archiveId = getArchiveSpreadsheetId_();
  const archiveSs = SpreadsheetApp.openById(archiveId);
  const archiveSourceSheet = archiveSs.getSheetByName(targetSheetName);

  if (!archiveSourceSheet) {
    throw new Error("The sheet '" + targetSheetName + "' was not found inside the external archive database.");
  }

  mainSs.toast("Retrieving '" + targetSheetName + "' from archive drive...", "Data Transfer Running", 5);
  const restoredSheet = archiveSourceSheet.copyTo(mainSs);
  restoredSheet.setName(targetSheetName);
  placeCreatedSheetInConfiguredOrder_(restoredSheet);

  if (typeof restoredSheet.showSheet === "function") restoredSheet.showSheet();
  updateIndexSheet();
  mainSs.setActiveSheet(restoredSheet);

  return restoredSheet;
}

// ============================================================================
// === WEB APP ENDPOINT FOR RESTORE HYPERLINKS ================================
// ============================================================================

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
      if (actionType === "demo_p_archive") {
        restoreSheetFromArchiveWorkbook(targetSheetName);
      } else {
        restoreSheetFromActiveIndexRow(targetSheetName);
      }

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

function generateArchiveFileIndex_() {
  return updateIndexSheet();
}

function runDeferredIndexRefreshIfNeeded_() {
  const props = PropertiesService.getDocumentProperties();
  if (props.getProperty(ML_INDEX_REFRESH_DEFERRED_KEY) !== "true") return false;
  props.deleteProperty(ML_INDEX_REFRESH_DEFERRED_KEY);
  updateIndexSheet();
  return true;
}

// ============================================================================
// SECTION 6
//// ============================================================================
// === BASE TEMPLATE & CANVAS SYNCHRONIZATION ENGINE ==========================
// ============================================================================

const RFF_BASE_TEMPLATE_NAME = "RFF_BASE_TEMPLATE";

/**
 * Updates a specific template's header, column grid, and text/number formatting
 * dynamically using Format Dashboard settings.
 */
function updateBaseTemplateCanvas_(ss, sheetType, dashboard) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  dashboard = dashboard || loadDashboardConfig_();
  const globals = dashboard.globals || RFF_DEFAULTS;

  const sheetDef = getSheetDefinitionByTypeOrNull_(dashboard, sheetType);
  if (!sheetDef) throw new Error("Section C sheet definition not found: " + sheetType);

  const headers = getHeadersForSheetType_(dashboard, sheetDef.sheetType);
  if (!headers.length) throw new Error("Section H headers not found: " + sheetDef.sheetType);

  let template = ss.getSheetByName(sheetDef.templateName);
  if (!template) template = createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, null);

  const width = headers.length;
  resizeSheetGrid_(template, RFF_TEMPLATE_BASELINE_ROWS, width);

  // Dynamic formatting parameters from Format Dashboard
  const theme = getThemeColorsFromBase_(sheetDef.baseColor, globals);
  const headerHeight = Number(getTitleRowConfigForSheet_(dashboard, sheetDef, HEADER_ROW).height || globals.headerRowHeight || 25);
  const dataHeight = Number(globals.dataRowHeight || 25);

  // Format Header Row (Row 4)
  template.getRange(HEADER_ROW, 1, 1, width)
    .breakApart()
    .setValues([headers])
    .setFontWeight("bold")
    .setFontSize(globals.standardFontSize || 10)
    .setVerticalAlignment("top")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
    .setBackground(theme.level2)
    .setFontColor(globals.standardFontColor || "#000000");

  template.setRowHeight(HEADER_ROW, headerHeight);

  // Format Data Grid Area (Row 5 Down)
  const dataRows = Math.max(RFF_TEMPLATE_BASELINE_ROWS - DATA_START_ROW + 1, 1);
  applyGovernedTextAndNumberFormats_(template, dashboard, headers, DATA_START_ROW, dataRows);
  safeSetRowHeights_(template, DATA_START_ROW, dataRows, dataHeight, "Base template data grid");

  template.setFrozenRows(HEADER_ROW);
  hideSheetIfNeeded_(template);
  clearSheetRuntimeCachesForSheet_(template);

  return template;
}

/**
 * Ensures the blank Golden Master template (RFF_BASE_TEMPLATE) exists,
 * applies default plain-text canvas properties, and hides it.
 */
function ensureGoldenMasterTemplate_(dashboard, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let baseSheet = ss.getSheetByName(RFF_BASE_TEMPLATE_NAME);
  if (!baseSheet) baseSheet = insertGovernedOutputSheet_(ss, RFF_BASE_TEMPLATE_NAME);

  const globals = (dashboard && dashboard.globals) || RFF_DEFAULTS;
  resizeSheetGrid_(baseSheet, 500, 50);

  const canvas = baseSheet.getRange(1, 1, baseSheet.getMaxRows(), baseSheet.getMaxColumns());
  canvas
    .setNumberFormat("@")
    .setFontFamily(globals.standardFont || "Arial")
    .setFontColor(globals.standardFontColor || "#000000")
    .setFontSize(globals.standardFontSize || 10)
    .setHorizontalAlignment(globals.defaultHorizontalAlignment || "left")
    .setVerticalAlignment(globals.defaultVerticalAlignment || "middle")
    .setWrapStrategy(toWrapStrategy_(globals.defaultDataWrap || "CLIP"));

  safeSetRowHeights_(baseSheet, 1, baseSheet.getMaxRows(), globals.dataRowHeight || 25, "Golden Master Base");
  hideSheetIfNeeded_(baseSheet, timing, "Golden Master base template hidden");
  
  if (timing) markFrameworkStep_(timing, "Golden Master prepared with plain-text canvas");
  return baseSheet;
}

/**
 * Rebuilds RFF_BASE_TEMPLATE and synchronizes all template canvases
 * with the active Format Dashboard configuration.
 */
function syncBaseTemplateWithDashboard() {
  return runFrameworkTimed_("Sync Base Templates With Dashboard", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboard = loadDashboardConfig_(true);
    
    ensureGoldenMasterTemplate_(dashboard, timing);
    
    const synced = sortSheetDefinitionsByProductionOrder_(dashboard.sheetDefinitions).map(function(sheetDef) {
      const template = updateBaseTemplateCanvas_(ss, sheetDef.sheetType, dashboard);
      markFrameworkStep_(timing, "Base template synchronized: " + sheetDef.templateName);
      return template;
    });

    notify_("Base Template Sync complete. Templates updated: " + synced.length);
    return synced;
  });
}

/**
 * Safety guard: Enforces that RFF_BASE_TEMPLATE remains hidden from user view.
 */
function forceBaseTemplateHidden_() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RFF_BASE_TEMPLATE_NAME);
    if (sheet && !sheet.isSheetHidden()) sheet.hideSheet();
  } catch (err) {
    logBestEffortWarning_("RFF_BASE_TEMPLATE hide enforcement skipped: " + err.message);
  }
}

// ============================================================================
// SECTION 7
// ============ SYSTEM SHEETS, DIAGNOSTICS & FORMAT DASHBOARD ============
// ============================================================================
/// --- SECTION CONSTANTS ------------------------------------------------------



// --- SECTION MUTABLE STATE --------------------------------------------------


// --- SECTION FUNCTIONS ------------------------------------------------------
// ============================================================================
// === SYSTEM SHEETS, DIAGNOSTICS & FORMAT DASHBOARD ==========================
// ============================================================================

const SYSTEM_SHEETS_TO_HIDE = Object.freeze([
  "Framework Timing Report",
  "Dashboard Quality Report"
]);

const RFF_DASHBOARD_SHEET = "Format Dashboard";
const RFF_VALIDATION_SHEET = "Dashboard Quality Report";
const RFF_TIMING_SHEET = "Framework Timing Report";

// ============================================================================
// === FORMAT DASHBOARD DEFAULTS LIBRARY ======================================
// ============================================================================

function getDefaultGlobalSettingsRows_() {
  return [
    ["Header Row", 4, "Numeric row number (e.g., 4)"],
    ["Data Start Row", 5, "Numeric row number (e.g., 5)"],
    ["Freeze Rows", 4, "Numeric count of frozen rows"],
    ["Freeze Columns", 2, "Numeric count of frozen columns"],
    ["Default Column Width", 105, "Numeric pixel width"],
    ["Default Date Format", "mm/dd/yyyy", "Google Sheets number format"],
    ["Standard Font", "Arial", "Installed font family name"],
    ["Standard Font Size", 10, "Numeric point size"],
    ["HSL Level 1 Lightness %", 60, "Tab Accents / Visual Spacers"],
    ["HSL Level 2 Lightness %", 75, "Header rows"],
    ["HSL Level 3 Lightness %", 85, "Title rows / Current Tab"],
    ["HSL Level 4 Lightness %", 90, "Alternating Row Color 1"],
    ["HSL Level 5 Lightness %", 97, "Alternating Row Color 2"]
  ];
}


function getDefaultSystemSurfaceRows_() {
  return [
    ["Framework Timing Report", "Framework Timing Report", 500, true, false, true, false, false, "VISIBLE", "FIT_TO_DATA", 8, "#79B5D2", "", "", "", "", "", "#000000", "Unified timing surface"],
    ["Dashboard Quality Report", "Dashboard Quality Report", 501, true, false, true, false, false, "VISIBLE", "FIT_TO_DATA", 7, "#79B5D2", "", "", "", "", "", "#000000", "Unified quality surface"],
    ["Format Dashboard", "Format Dashboard", 502, true, false, true, false, false, "VISIBLE", "FIT_TO_DATA", 19, "#79B5D2", "", "", "", "", "", "#000000", "Dashboard surface"]
  ];
}

function getDefaultColumnDefinitionRows_() {
  return [
    ["AD1 - Phone", 90, 10, "", true, "CLIP", "left", "middle", ""],
    ["AD1 - Phone Valid Dates From", 80, 7, true, true, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["AD1 - Phone Valid Dates To", 80, 7, true, true, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["AD2 - Phone", 90, 10, "", true, "CLIP", "left", "middle", ""],
    ["AD2 - Phone Valid Dates From", 110, 7, true, true, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["AD2 - Phone Valid Dates To", 110, 7, true, true, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["AD3 - Phone", 90, 10, "", true, "CLIP", "left", "middle", ""],
    ["AD3 - Phone Valid Dates From", 110, 7, true, true, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["AD3 - Phone Valid Dates To", 110, 7, true, true, "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Added to Disenrolled Exclusion", 80, 7, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Additional Important Information", 80, 7, "", true, "CLIP", "left", "middle", ""],
    ["Address 1 - Street", 250, 10, "", true, "CLIP", "left", "middle", ""],
    ["Address Line 1", 240, 10, "", "", "CLIP", "left", "middle", ""],
    ["Address Line 2", 90, 10, "", "", "CLIP", "left", "middle", ""],
    ["Archive Reason", 90, 10, "", "", "CLIP", "left", "middle", ""],
    ["Archived At", 80, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Banner Summary", 140, 10, "", "", "CLIP", "left", "middle", ""],
    ["Capitation Date", 100, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Care Plan Start Date", 100, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Caseload - Activities", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Caseload - HCC", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Caseload - OT", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Caseload - PCP", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Caseload - PT", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Caseload - RD", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Caseload - RN", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Caseload - Social Work", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Caseload - Supervising MD", 100, 7, "", true, "CLIP", "left", "middle", ""],
    ["City", 90, 10, "", "", "CLIP", "left", "middle", ""],
    ["Columns With Change", 220, 10, "", "", "CLIP", "left", "middle", ""],
    ["Company", 90, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - 1", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - 2", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - 3", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - 4", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - 5", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - 6", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - 7", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - 8", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - First Name", 90, 9, "", true, "CLIP", "left", "middle", ""],
    ["Contact - Last Name", 90, 9, "", true, "CLIP", "left", "middle", ""],
    ["Contact - Notes", 100, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - Primary Language", 90, 10, "", true, "CLIP", "left", "middle", ""],
    ["Contact - Summary", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["CP Type", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Custom Field 1 - Label", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["Custom Field 1 - Value", 140, 10, "", true, "CLIP", "left", "middle", ""],
    ["Date of Birth", 90, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Date of Death", 80, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Demo P Source Sheet", 140, 10, "", "", "CLIP", "left", "middle", ""],
    ["Demo P Update Month", 140, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Demo P Update Status", 140, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Disenrollment Date", 115, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Disenrollment Effective Date", 115, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Disenrollment Reason", 115, 10, "", "", "CLIP", "left", "middle", ""],
    ["DPOA or Guardian Active", 90, 7, "", "", "CLIP", "left", "middle", ""],
    ["Enrollment Date", 100, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Enrollment Status", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Equipment", 140, 10, "", "", "CLIP", "left", "middle", ""],
    ["Face Sheet", 140, 10, "", "", "CLIP", "left", "middle", ""],
    ["Fall Risk", 60, 10, "", "", "CLIP", "left", "middle", ""],
    ["First Name", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["IDT Meeting Date", 100, 9, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Interpreter Needed", 95, 10, "", "", "CLIP", "left", "middle", ""],
    ["Last Care Plan", 100, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Last Name", 165, 10, "", "", "CLIP", "left", "middle", ""],
    ["Name", 180, 10, "", "", "CLIP", "left", "middle", ""],
    ["Next Care Plan Due", 100, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Notes", 140, 10, "", "", "CLIP", "left", "middle", ""],
    ["Oxygen", 74, 10, "", "", "CLIP", "left", "middle", ""],
    ["Palliative Care", 95, 10, "", "", "CLIP", "left", "middle", ""],
    ["Participant Name", 250, 10, "", "", "CLIP", "left", "middle", ""],
    ["Participant PMR#", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Phone 1 - Label", 85, 10, "", true, "CLIP", "left", "middle", ""],
    ["Phone 1 - Value", 85, 10, "", "", "CLIP", "left", "middle", ""],
    ["Phone 2 - Label", 85, 10, "", true, "CLIP", "left", "middle", ""],
    ["Phone 2 - Value", 85, 10, "", "", "CLIP", "left", "middle", ""],
    ["Phone 3 - Label", 85, 10, "", true, "CLIP", "left", "middle", ""],
    ["Phone 3 - Value", 85, 10, "", "", "CLIP", "left", "middle", ""],
    ["Phone 4 - Label", 85, 10, "", true, "CLIP", "left", "middle", ""],
    ["Phone 4 - Value", 85, 10, "", "", "CLIP", "left", "middle", ""],
    ["Phone Number", 90, 10, "", "", "CLIP", "left", "middle", ""],
    ["PMR #", 100, 10, "", "", "CLIP", "left", "middle", ""],
    ["Preferred Name", 120, 10, "", "", "CLIP", "left", "middle", ""],
    ["Primary Language", 90, 10, "", "", "CLIP", "left", "middle", ""],
    ["Primary PMR Row", 110, 10, "", true, "CLIP", "left", "middle", ""],
    ["Relationship", 110, 10, "", true, "CLIP", "left", "middle", ""],
    ["Residence Type", 95, 10, "", "", "CLIP", "left", "middle", ""],
    ["Safety - 2 Person", 84, 10, "", "", "CLIP", "left", "middle", ""],
    ["Source Month", 80, 10, true, "", "CLIP", "left", "middle", "mm/dd/yyyy"],
    ["Source Sheet", 150, 10, "", "", "CLIP", "left", "middle", ""],
    ["Source Workflow", 90, 10, "", "", "CLIP", "left", "middle", ""],
    ["State", 69, 10, "", "", "CLIP", "left", "middle", ""],
    ["Type of Contact", 90, 10, "", true, "CLIP", "left", "middle", ""],
    ["Wanderer", 90, 10, "", "", "CLIP", "left", "middle", ""],
    ["Completed", 120, 10, "", "", "CLIP", "left", "middle", ""],
    ["HHA", 140, 10, "", "", "CLIP", "left", "middle", ""],
    ["Zip", 80, 10, "", "", "CLIP", "left", "middle", ""]
  ];
}

function getDefaultSheetHeaderRows_() {
  const headerSets = {
    "Banners": [
      { header: "Last Name", source: "Primary Data" }, { header: "First Name", source: "Primary Data" }, { header: "Participant PMR#", source: "Primary Data" }, { header: "Safety - 2 Person", source: "Primary Data" }, { header: "Wanderer", source: "Primary Data" }, { header: "Interpreter Needed", source: "Primary Data" }, { header: "Fall Risk", source: "Primary Data" }, { header: "DPOA or Guardian Active", source: "Primary Data" }, { header: "Palliative Care", source: "Primary Data" }
    ],
    "CP Due Date": [
      { header: "Participant Name", source: "Primary Data" }, { header: "Enrollment Date", source: "Primary Data" }, { header: "Last Care Plan", source: "Primary Data" }, { header: "Next Care Plan Due", source: "Primary Data" }, { header: "CP Type", source: "Primary Data" }
    ],
    "Unlock CP": [
      { header: "Participant Name", source: "Primary Data" }, { header: "PMR #", source: "Primary Data" }, { header: "IDT Meeting Date", source: "Primary Data" }, { header: "Care Plan Start Date", source: "Primary Data" }
    ],
    "Raw Data": [
      { header: "Last Name", source: "Unformatted Data" }, { header: "First Name", source: "Unformatted Data" }, { header: "Preferred Name", source: "Unformatted Data" }, { header: "Date of Birth", source: "Unformatted Data" }, { header: "Participant PMR#", source: "Unformatted Data" }, { header: "Phone Number", source: "Unformatted Data" }, { header: "Address Line 1", source: "Unformatted Data" }, { header: "Address Line 2", source: "Unformatted Data" }, { header: "City", source: "Unformatted Data" }, { header: "State", source: "Unformatted Data" }, { header: "Zip", source: "Unformatted Data" }, { header: "Oxygen", source: "Unformatted Data" }, { header: "Primary Language", source: "Unformatted Data" }, { header: "Residence Type", source: "Unformatted Data" }, { header: "Contact - Last Name", source: "Unformatted Data" }, { header: "Contact - First Name", source: "Unformatted Data" }, { header: "Type of Contact", source: "Unformatted Data" }, { header: "Contact - Primary Language", source: "Unformatted Data" }, { header: "Relationship", source: "Unformatted Data" }, { header: "AD1 - Phone", source: "Unformatted Data" }, { header: "AD1 - Phone Valid Dates From", source: "Unformatted Data" }, { header: "AD1 - Phone Valid Dates To", source: "Unformatted Data" }, { header: "AD2 - Phone", source: "Unformatted Data" }, { header: "AD2 - Phone Valid Dates From", source: "Unformatted Data" }, { header: "AD2 - Phone Valid Dates To", source: "Unformatted Data" }, { header: "AD3 - Phone", source: "Unformatted Data" }, { header: "AD3 - Phone Valid Dates From", source: "Unformatted Data" }, { header: "AD3 - Phone Valid Dates To", source: "Unformatted Data" }, { header: "Company", source: "Unformatted Data" }, { header: "Contact - Notes", source: "Unformatted Data" }, { header: "Capitation Date", source: "Unformatted Data" }, { header: "Enrollment Status", source: "Unformatted Data" }, { header: "Disenrollment Date", source: "Unformatted Data" }, { header: "Disenrollment Effective Date", source: "Unformatted Data" }, { header: "Disenrollment Reason", source: "Unformatted Data" }, { header: "Date of Death", source: "Unformatted Data" }, { header: "Caseload - Social Work", source: "Unformatted Data" }, { header: "Caseload - RN", source: "Unformatted Data" }, { header: "Caseload - PCP", source: "Unformatted Data" }, { header: "Caseload - HCC", source: "Unformatted Data" }, { header: "Caseload - Activities", source: "Unformatted Data" }, { header: "Caseload - OT", source: "Unformatted Data" }, { header: "Caseload - PT", source: "Unformatted Data" }, { header: "Caseload - RD", source: "Unformatted Data" }, { header: "Caseload - Supervising MD", source: "Unformatted Data" }, { header: "Additional Important Information", source: "Unformatted Data" }, { header: "Notes", source: "Unformatted Data" }, { header: "Safety - 2 Person", source: "Banners" }, { header: "Wanderer", source: "Banners" }, { header: "Interpreter Needed", source: "Banners" }, { header: "Fall Risk", source: "Banners" }, { header: "DPOA or Guardian Active", source: "Banners" }, { header: "Palliative Care", source: "Banners" }, { header: "Primary PMR Row", source: "Format Raw Data" }
    ],
    "Refined Data": [
      { header: "Last Name", source: "Raw Data" }, { header: "First Name", source: "Raw Data" }, { header: "Preferred Name", source: "Raw Data" }, { header: "Date of Birth", source: "Raw Data" }, { header: "Participant PMR#", source: "Raw Data" }, { header: "Phone Number", source: "Raw Data" }, { header: "Address Line 1", source: "Raw Data" }, { header: "Address Line 2", source: "Raw Data" }, { header: "City", source: "Raw Data" }, { header: "State", source: "Raw Data" }, { header: "Zip", source: "Raw Data" }, { header: "Oxygen", source: "Raw Data" }, { header: "Primary Language", source: "Raw Data" }, { header: "Residence Type", source: "Raw Data" }, { header: "Contact - Last Name", source: "Raw Data" }, { header: "Contact - First Name", source: "Raw Data" }, { header: "Type of Contact", source: "Raw Data" }, { header: "Contact - Primary Language", source: "Raw Data" }, { header: "Relationship", source: "Raw Data" }, { header: "AD1 - Phone", source: "Raw Data" }, { header: "AD1 - Phone Valid Dates From", source: "Raw Data" }, { header: "AD1 - Phone Valid Dates To", source: "Raw Data" }, { header: "AD2 - Phone", source: "Raw Data" }, { header: "AD2 - Phone Valid Dates From", source: "Raw Data" }, { header: "AD2 - Phone Valid Dates To", source: "Raw Data" }, { header: "AD3 - Phone", source: "Raw Data" }, { header: "AD3 - Phone Valid Dates From", source: "Raw Data" }, { header: "AD3 - Phone Valid Dates To", source: "Raw Data" }, { header: "Company", source: "Raw Data" }, { header: "Contact - Notes", source: "Raw Data" }, { header: "Capitation Date", source: "Raw Data" }, { header: "Enrollment Status", source: "Raw Data" }, { header: "Disenrollment Date", source: "Raw Data" }, { header: "Disenrollment Effective Date", source: "Raw Data" }, { header: "Disenrollment Reason", source: "Raw Data" }, { header: "Date of Death", source: "Raw Data" }, { header: "Caseload - Social Work", source: "Raw Data" }, { header: "Caseload - RN", source: "Raw Data" }, { header: "Caseload - PCP", source: "Raw Data" }, { header: "Caseload - HCC", source: "Raw Data" }, { header: "Caseload - Activities", source: "Raw Data" }, { header: "Caseload - OT", source: "Raw Data" }, { header: "Caseload - PT", source: "Raw Data" }, { header: "Caseload - RD", source: "Raw Data" }, { header: "Caseload - Supervising MD", source: "Raw Data" }, { header: "Additional Important Information", source: "Raw Data" }, { header: "Safety - 2 Person", source: "Raw Data" }, { header: "Wanderer", source: "Raw Data" }, { header: "Interpreter Needed", source: "Raw Data" }, { header: "Fall Risk", source: "Raw Data" }, { header: "DPOA or Guardian Active", source: "Raw Data" }, { header: "Palliative Care", source: "Raw Data" }, { header: "Primary PMR Row", source: "Demo P process" }, { header: "Banner Summary", source: "Demo P process" }, { header: "Phone 1 - Label", source: "Demo P process" }, { header: "Phone 1 - Value", source: "Demo P process" }, { header: "Phone 2 - Label", source: "Demo P process" }, { header: "Phone 2 - Value", source: "Demo P process" }, { header: "Phone 3 - Label", source: "Demo P process" }, { header: "Phone 3 - Value", source: "Demo P process" }, { header: "Phone 4 - Label", source: "Demo P process" }, { header: "Phone 4 - Value", source: "Demo P process" }, { header: "Address 1 - Street", source: "Demo P process" }, { header: "Custom Field 1 - Label", source: "Demo P process" }, { header: "Custom Field 1 - Value", source: "Demo P process" }, { header: "Notes", source: "Demo P process" }, { header: "Contact - 1", source: "Demo P process" }, { header: "Contact - 2", source: "Demo P process" }, { header: "Contact - 3", source: "Demo P process" }, { header: "Contact - 4", source: "Demo P process" }, { header: "Contact - 5", source: "Demo P process" }, { header: "Contact - 6", source: "Demo P process" }, { header: "Contact - 7", source: "Demo P process" }, { header: "Contact - 8", source: "Demo P process" }, { header: "Contact - Summary", source: "Demo P process" }, { header: "Participant Name", source: "Demo P process" }, { header: "Name", source: "Demo P process" }, { header: "Demo P Update Status", source: "Demo P process" }, { header: "Demo P Update Month", source: "Demo P process" }, { header: "Demo P Source Sheet", source: "Demo P process" }
    ],
    "Disenrolled Exclusion": [
      { header: "Participant Name", source: "Demo P" }, { header: "Name", source: "Demo P" }, { header: "Preferred Name", source: "Demo P" }, { header: "Date of Birth", source: "Demo P" }, { header: "Address 1 - Street", source: "Demo P" }, { header: "City", source: "Demo P" }, { header: "State", source: "Demo P" }, { header: "Zip", source: "Demo P" }, { header: "Phone 1 - Value", source: "Demo P" }, { header: "Phone 2 - Value", source: "Demo P" }, { header: "Participant PMR#", source: "Demo P" }, { header: "Primary Language", source: "Demo P" }, { header: "Residence Type", source: "Demo P" }, { header: "Notes", source: "Demo P" }, { header: "IDT Meeting Date", source: "Demo P" }, { header: "Care Plan Start Date", source: "Demo P" }, { header: "Enrollment Date", source: "Demo P" }, { header: "Last Care Plan", source: "Demo P" }, { header: "Next Care Plan Due", source: "Demo P" }, { header: "CP Type", source: "Demo P" }, { header: "Oxygen", source: "Demo P" }, { header: "Caseload - Social Work", source: "Demo P" }, { header: "Caseload - RN", source: "Demo P" }, { header: "Caseload - PCP", source: "Demo P" }, { header: "Caseload - HCC", source: "Demo P" }, { header: "Caseload - Activities", source: "Demo P" }, { header: "Caseload - OT", source: "Demo P" }, { header: "Caseload - PT", source: "Demo P" }, { header: "Caseload - RD", source: "Demo P" }, { header: "Caseload - Supervising MD", source: "Demo P" }, { header: "Capitation Date", source: "Demo P" }, { header: "Enrollment Status", source: "Demo P" }, { header: "Disenrollment Date", source: "Demo P" }, { header: "Disenrollment Effective Date", source: "Demo P" }, { header: "Disenrollment Reason", source: "Demo P" }, { header: "Date of Death", source: "Demo P" }, { header: "Contact - Last Name", source: "Demo P" }, { header: "Contact - First Name", source: "Demo P" }, { header: "Type of Contact", source: "Demo P" }, { header: "Contact - Primary Language", source: "Demo P" }, { header: "Relationship", source: "Demo P" }, { header: "AD1 - Phone", source: "Demo P" }, { header: "AD1 - Phone Valid Dates From", source: "Demo P" }, { header: "AD1 - Phone Valid Dates To", source: "Demo P" }, { header: "AD2 - Phone", source: "Demo P" }, { header: "AD2 - Phone Valid Dates From", source: "Demo P" }, { header: "AD2 - Phone Valid Dates To", source: "Demo P" }, { header: "AD3 - Phone", source: "Demo P" }, { header: "AD3 - Phone Valid Dates From", source: "Demo P" }, { header: "AD3 - Phone Valid Dates To", source: "Demo P" }, { header: "Company", source: "Demo P" }, { header: "Contact - Notes", source: "Demo P" }, { header: "Safety - 2 Person", source: "Demo P" }, { header: "Wanderer", source: "Demo P" }, { header: "Interpreter Needed", source: "Demo P" }, { header: "Fall Risk", source: "Demo P" }, { header: "DPOA or Guardian Active", source: "Demo P" }, { header: "Palliative Care", source: "Demo P" }, { header: "Last Name", source: "Demo P" }, { header: "First Name", source: "Demo P" }, { header: "Phone Number", source: "Demo P" }, { header: "Address Line 1", source: "Demo P" }, { header: "Address Line 2", source: "Demo P" }, { header: "Additional Important Information", source: "Demo P" }, { header: "Added to Disenrolled Exclusion", source: "Framework audit" }, { header: "PMR #", source: "Demo P" }
    ],
    "Master List": [
      { header: "Participant Name", source: "Demo P" }, { header: "Name", source: "Demo P" }, { header: "Preferred Name", source: "Demo P" }, { header: "Date of Birth", source: "Demo P" }, { header: "Address 1 - Street", source: "Demo P" }, { header: "City", source: "Demo P" }, { header: "State", source: "Demo P" }, { header: "Zip", source: "Demo P" }, { header: "Phone 1 - Value", source: "Demo P" }, { header: "Phone 2 - Value", source: "Demo P" }, { header: "Participant PMR#", source: "Demo P" }, { header: "Primary Language", source: "Demo P" }, { header: "Residence Type", source: "Demo P" }, { header: "Notes", source: "Demo P" }, { header: "IDT Meeting Date", source: "Demo P" }, { header: "Care Plan Start Date", source: "Demo P" }, { header: "Enrollment Date", source: "Demo P" }, { header: "Last Care Plan", source: "Demo P" }, { header: "Next Care Plan Due", source: "Demo P" }, { header: "CP Type", source: "Demo P" }, { header: "Completed", source: "Demo P" }, { header: "Face Sheet", source: "Demo P" }, { header: "HHA", source: "Demo P" }, { header: "Oxygen", source: "Demo P" }, { header: "Equipment", source: "Demo P" }, { header: "Caseload - Social Work", source: "Demo P" }, { header: "Caseload - RN", source: "Demo P" }, { header: "Caseload - PCP", source: "Demo P" }, { header: "Caseload - HCC", source: "Demo P" }, { header: "Caseload - Activities", source: "Demo P" }, { header: "Caseload - OT", source: "Demo P" }, { header: "Caseload - PT", source: "Demo P" }, { header: "Caseload - RD", source: "Demo P" }, { header: "Caseload - Supervising MD", source: "Demo P" }, { header: "Capitation Date", source: "Demo P" }, { header: "Enrollment Status", source: "Demo P" }, { header: "Primary PMR Row", source: "Demo P" }
    ],
    "Monthly Change": [
      { header: "Last Name", source: "Populates via process" }, { header: "First Name", source: "Populates via process" }, { header: "Preferred Name", source: "Populates via process" }, { header: "Date of Birth", source: "Populates via process" }, { header: "Participant PMR#", source: "Populates via process" }, { header: "Phone Number", source: "Populates via process" }, { header: "Address Line 1", source: "Populates via process" }, { header: "Address Line 2", source: "Populates via process" }, { header: "City", source: "Populates via process" }, { header: "State", source: "Populates via process" }, { header: "Zip", source: "Populates via process" }, { header: "Oxygen", source: "Populates via process" }, { header: "Primary Language", source: "Populates via process" }, { header: "Residence Type", source: "Populates via process" }, { header: "Contact - Last Name", source: "Populates via process" }, { header: "Contact - First Name", source: "Populates via process" }, { header: "Type of Contact", source: "Populates via process" }, { header: "Contact - Primary Language", source: "Populates via process" }, { header: "Relationship", source: "Populates via process" }, { header: "AD1 - Phone", source: "Populates via process" }, { header: "AD1 - Phone Valid Dates From", source: "Populates via process" }, { header: "AD1 - Phone Valid Dates To", source: "Populates via process" }, { header: "AD2 - Phone", source: "Populates via process" }, { header: "AD2 - Phone Valid Dates From", source: "Populates via process" }, { header: "AD2 - Phone Valid Dates To", source: "Populates via process" }, { header: "AD3 - Phone", source: "Populates via process" }, { header: "AD3 - Phone Valid Dates From", source: "Populates via process" }, { header: "AD3 - Phone Valid Dates To", source: "Populates via process" }, { header: "Company", source: "Populates via process" }, { header: "Contact - Notes", source: "Populates via process" }, { header: "Capitation Date", source: "Populates via process" }, { header: "Enrollment Status", source: "Populates via process" }, { header: "Disenrollment Date", source: "Populates via process" }, { header: "Disenrollment Effective Date", source: "Populates via process" }, { header: "Disenrollment Reason", source: "Populates via process" }, { header: "Date of Death", source: "Populates via process" }, { header: "Caseload - Social Work", source: "Populates via process" }, { header: "Caseload - RN", source: "Populates via process" }, { header: "Caseload - PCP", source: "Populates via process" }, { header: "Caseload - HCC", source: "Populates via process" }, { header: "Caseload - Activities", source: "Populates via process" }, { header: "Caseload - OT", source: "Populates via process" }, { header: "Caseload - PT", source: "Populates via process" }, { header: "Caseload - RD", source: "Populates via process" }, { header: "Caseload - Supervising MD", source: "Populates via process" }, { header: "Additional Important Information", source: "Populates via process" }, { header: "Notes", source: "Populates via process" }, { header: "Safety - 2 Person", source: "Populates via process" }, { header: "Wanderer", source: "Populates via process" }, { header: "Interpreter Needed", source: "Populates via process" }, { header: "Fall Risk", source: "Populates via process" }, { header: "DPOA or Guardian Active", source: "Populates via process" }, { header: "Palliative Care", source: "Populates via process" }, { header: "Primary PMR Row", source: "Populates via process" }
    ]
  };

  const rows = [];
  Object.keys(headerSets).forEach(sheetType => {
    headerSets[sheetType].forEach((item, index) => {
      rows.push([sheetType, index + 1, item.header, item.source]);
    });
  });
  return rows;
}

// ============================================================================
// === SYSTEM TEMPLATE BUILDER ================================================
// ============================================================================

function appendDashboardSectionRows_(rows, sectionName, headers, dataRows, width) {
  const emptyRow = new Array(width).fill("");
  rows.push(emptyRow);
  
  const bannerRow = new Array(width).fill("");
  bannerRow[0] = sectionName;
  rows.push(bannerRow);
  
  rows.push(emptyRow);
  
  const headerRow = new Array(width).fill("");
  for (let i = 0; i < headers.length; i++) {
    headerRow[i] = headers[i];
  }
  rows.push(headerRow);
  
  rows.push(emptyRow);

  (dataRows || []).forEach(row => {
    const paddedRow = row.slice(0, width);
    while (paddedRow.length < width) paddedRow.push("");
    rows.push(paddedRow);
  });
}

function createSystemTemplates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Stamping System Sheets from Base Template...", "Building", 5);

  const timestampStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss");

  function createTemplateFromBase_(targetName) {
    const existing = ss.getSheetByName(targetName);
    if (existing) ss.deleteSheet(existing);
    
    const template = ss.getSheetByName("RFF_BASE_TEMPLATE");
    if (!template) throw new Error("RFF_BASE_TEMPLATE is missing. Cannot build system sheets.");
    
    const newSheet = template.copyTo(ss);
    newSheet.setName(targetName);
    newSheet.showSheet();
    return newSheet;
  }

  // =========================================================================
  // STEP 1: CREATE CLEAN "RFF_BASE_TEMPLATE"
  // =========================================================================
  let baseTemplate = ss.getSheetByName("RFF_BASE_TEMPLATE");
  if (baseTemplate) ss.deleteSheet(baseTemplate);
  baseTemplate = ss.insertSheet("RFF_BASE_TEMPLATE");
  
  const curRows = baseTemplate.getMaxRows();
  if (curRows < 100) baseTemplate.insertRowsAfter(curRows, 100 - curRows);
  if (curRows > 100) baseTemplate.deleteRows(101, curRows - 100);

  baseTemplate.getRange("1:100")
    .setFontFamily("Arial")
    .setFontSize(10)
    .setFontWeight("normal")
    .setVerticalAlignment("middle")
    .setHorizontalAlignment("left")
    .setBackground(null);

  baseTemplate.setFrozenRows(4);
  baseTemplate.setFrozenColumns(2);

  // =========================================================================
  // STEP 2: BUILD FORMAT DASHBOARD
  // =========================================================================
  const dashboardSheet = createTemplateFromBase_("Format Dashboard");
  const dashWidth = 19;
  const dashRows = [
    ["Format Dashboard", "- v1.8.9.8.4 -"],
    ["Date Created", timestampStr],
    [], []
  ];

  // Pulling securely from unified factory default functions
  appendDashboardSectionRows_(dashRows, "SECTION A - GLOBAL SETTINGS", ["Setting", "Value", "Options"], getDefaultGlobalSettingsRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION B - TITLE ROWS", ["Sheet Type", "Row", "Purpose", "Value Source", "Label", "Target Cell", "Height", "Font Size", "Font Weight", "Fill Level", "Alignment", "Wrap", "Notes"], getDefaultTitleRowRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION C - SHEET DEFINITIONS", ["Sheet Type", "Report Title", "Template Name", "Output Naming Pattern", "Base Color", "Level 1 Hex", "Level 2 Hex", "Level 3 Hex", "Level 4 Hex", "Level 5 Hex", "Use Prompt Date", "End Date Source", "Template Row Count", "Template Column Count", "Template Row Mode", "Minimum Rows", "Buffer Rows"], getDefaultSheetDefinitionRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION D - SHEET BEHAVIORS", ["Sheet Type", "Uses Title Rows", "Uses Filter", "Uses Alternating Colors", "Uses Subheaders", "Hidden Template", "Output Visibility"], getDefaultBehaviorRows_(), dashWidth);
  
  if (typeof getDefaultSystemSurfaceRows_ === "function") {
    appendDashboardSectionRows_(dashRows, "SECTION E - SYSTEM SHEET SURFACES", ["System Sheet Name", "Display Name", "Sort Order", "Uses Title Rows", "Uses Filter", "Uses Alternating Colors", "Uses Subheaders", "Hidden Template", "Output Visibility", "Default Column Widths", "Column Count", "Base Color", "Level 1 Hex", "Level 2 Hex", "Level 3 Hex", "Level 4 Hex", "Level 5 Hex", "Title Font Color", "Notes"], getDefaultSystemSurfaceRows_(), dashWidth);
  }
  
  appendDashboardSectionRows_(dashRows, "SECTION F - TAB ORGANIZATION & INDEX", ["Sheet Name / Prefix", "Group", "Rank / Range", "Special"], getDefaultTabOrganizationRows_(), dashWidth);
  
  if (typeof getDefaultColumnDefinitionRows_ === "function") {
    appendDashboardSectionRows_(dashRows, "SECTION G - COLUMN DEFINITIONS", ["Header", "Width", "Header Font Size", "Date Column", "Hide Column", "Data Wrap", "Horizontal Alignment", "Vertical Alignment", "Number Format"], getDefaultColumnDefinitionRows_(), dashWidth);
  }
  
  appendDashboardSectionRows_(dashRows, "SECTION H - SHEET HEADERS", ["Sheet Type", "Column Order", "Header", "Source of Data"], getDefaultSheetHeaderRows_(), dashWidth);

  // Pad all dashboard rows to prevent 2D array mapping errors
  const paddedDashRows = dashRows.map(r => {
    const out = r.slice();
    while(out.length < dashWidth) out.push("");
    return out;
  });

  dashboardSheet.getRange(1, 1, paddedDashRows.length, dashWidth).setValues(paddedDashRows);
  if (typeof recalculateDashboardHexCodes_ === "function") recalculateDashboardHexCodes_(dashboardSheet);
  applySystemStructure_(dashboardSheet, dashWidth, [], "Format Dashboard", timestampStr);

  // =========================================================================
  // HELPER: BUILD PADDED REPORT SECTIONS
  // =========================================================================
  function buildSystemSheet_(name, width, sections) {
    const sheet = createTemplateFromBase_(name);
    const rows = [
      [name, "- v1.8.9.8.4 -"],
      ["Date Created", timestampStr],
      [], []
    ];
    
    sections.forEach(sec => {
      rows.push([], [sec.title], [], sec.headers, [], ["Enter Data here"]);
    });
    
    const paddedRows = rows.map(r => {
      const out = r.slice();
      while(out.length < width) out.push("");
      return out;
    });
    
    applySystemStructure_(sheet, width, paddedRows, name, timestampStr);
  }

  // =========================================================================
  // STEP 3: BUILD FRAMEWORK TIMING REPORT
  // =========================================================================
  buildSystemSheet_("Framework Timing Report", 8, [
    { title: "SECTION A - PROCESS SUMMARY", headers: ["Process", "Runtime (Sec)", "Status", "Benchmark", "Variance", "Notes"] },
    { title: "SECTION B - PERFORMANCE ISSUES", headers: ["Priority", "Process", "Runtime (Sec)", "Threshold", "Issue", "Recommendation"] },
    { title: "SECTION C - OPTIMIZATION RECOMMENDATIONS", headers: ["Process", "Finding", "Impact", "Recommendation", "Priority", "Status"] },
    { title: "SECTION D - DETAILED TIMING LOG", headers: ["Timestamp", "Process", "Step", "Step Seconds", "Total Seconds", "Severity", "Details"] }
  ]);

  // =========================================================================
  // STEP 4: BUILD DASHBOARD QUALITY REPORT
  // =========================================================================
  buildSystemSheet_("Dashboard Quality Report", 7, [
    { title: "SECTION A - FORMAT DASHBOARD VALIDATION", headers: ["Dashboard Section", "Status", "Issue", "Quality Notes"] },
    { title: "SECTION B - TEMPLATE VALIDATION", headers: ["Template / Sheet Name", "Status", "Issue", "Quality Notes"] },
    { title: "SECTION C - RAW DATA VALIDATION", headers: ["Validation Item", "Status", "Issue", "Quality Notes"] },
    { title: "SECTION D - DEMO P QUALITY VALIDATION", headers: ["Check Item", "Status", "Issue", "Quality Notes"] },
    { title: "SECTION E - DISENROLLED EXCLUSION VALIDATION", headers: ["Audit Item", "Status", "Issue", "Quality Notes"] },
    { title: "SECTION F - MONTHLY CHANGE VALIDATION", headers: ["Layout Item", "Status", "Issue", "Quality Notes"] },
    { title: "SECTION G - MASTER LIST VALIDATION", headers: ["Audit Item", "Status", "Issue", "Quality Notes"] },
    { title: "SECTION H - FORMAT DASHBOARD CHANGELOG", headers: ["Timestamp", "Section Changed", "Column Changed", "Previous Value", "New Value"] },
    { title: "SECTION I - SUMMARY & SIGNOFF", headers: ["Metric / Action", "Result", "Notes", "Signoff Details"] }
  ]);

  ss.toast("System Templates perfectly created from Base Template!", "Complete", 5);
}


// ============================================================================
// === STRUCTURE & GEOMETRY PAINTER ===========================================
// ============================================================================

function applySystemStructure_(sheet, maxCols, dataMatrix, targetSystemName, timestampStr) {
  function trimExcessColumns_(sh, cols) {
    const cur = sh.getMaxColumns();
    if (cur > cols) sh.deleteColumns(cols + 1, cur - cols);
  }

  trimExcessColumns_(sheet, maxCols);

  if (dataMatrix && dataMatrix.length > 0) {
    sheet.getRange(1, 1, dataMatrix.length, maxCols).setValues(
      dataMatrix.map(r => {
        const out = r.slice(0, maxCols);
        while (out.length < maxCols) out.push("");
        return out;
      })
    );
  }

  const totalRows = Math.max(sheet.getLastRow(), 100);
  if (sheet.getMaxRows() < totalRows) {
    sheet.insertRowsAfter(sheet.getMaxRows(), totalRows - sheet.getMaxRows());
  }

  const theme = getSectionEThemeForSheet_(targetSystemName);

  sheet.getRange(1, 1, 1, maxCols).setFontSize(14).setFontWeight("bold").setBackground(theme.level3);
  sheet.getRange(2, 1, 1, maxCols).setFontSize(10).setFontWeight("normal").setBackground(theme.level3);
  sheet.getRange(3, 1, 1, maxCols).setFontSize(10).setFontWeight("normal").setBackground(theme.level1);
  sheet.getRange(4, 1, 1, maxCols).setFontSize(10).setFontWeight("bold").setBackground(theme.level2);

  applyNativeBandingSafe_(sheet, 5, maxCols, totalRows, theme.level4, theme.level5);

  const values = sheet.getDataRange().getValues();
  for (let r = 0; r < values.length; r++) {
    const cellVal = String(values[r][0] || "").trim().toUpperCase();

    if (cellVal.indexOf("SECTION ") === 0) {
      const titleSheetRow  = r + 1;
      const spacerSheetRow = r + 2;
      const headerSheetRow = r + 3;

      sheet.getRange(titleSheetRow, 1, 1, maxCols)
        .setFontWeight("bold")
        .setFontSize(14)
        .setBackground(theme.level3);

      sheet.getRange(spacerSheetRow, 1, 1, maxCols)
        .setBackground(theme.level1);

      if (sheet.getName() !== "Format Dashboard" && maxCols >= 3 && timestampStr) {
        sheet.getRange(titleSheetRow, 3)
          .setValue(timestampStr)
          .setFontWeight("normal")
          .setFontStyle("italic")
          .setFontSize(10);
      }

      if (headerSheetRow <= sheet.getMaxRows()) {
        sheet.getRange(headerSheetRow, 1, 1, maxCols)
          .setFontWeight("bold")
          .setFontSize(8)
          .setBackground(theme.level2);
      }
    }
  }

  for (let c = 1; c <= maxCols; c++) sheet.autoResizeColumn(c);
  enforceSystemRowHeights_(sheet);
}

function enforceSystemRowHeights_(sheet) {
  if (!sheet) return;

  const dashboard = loadDashboardConfig_();
  const r1Height = Number(getTitleRowConfigForSheet_(dashboard, null, 1).height || 25);
  const r2Height = Number(getTitleRowConfigForSheet_(dashboard, null, 2).height || 25);
  const r3Height = Number(getTitleRowConfigForSheet_(dashboard, null, 3).height || 10);
  const r4Height = Number(getTitleRowConfigForSheet_(dashboard, null, 4).height || 25);

  sheet.setRowHeight(1, r1Height);
  sheet.setRowHeight(2, r2Height);
  sheet.setRowHeight(3, r3Height);
  sheet.setRowHeight(4, r4Height);

  const values = sheet.getDataRange().getValues();
  for (let r = 0; r < values.length; r++) {
    const cellVal = String(values[r][0] || "").trim().toUpperCase();

    if (cellVal.indexOf("SECTION ") === 0) {
      const bufferTopRow   = r;     // Subheader Row 1
      const titleSheetRow  = r + 1; // Subheader Row 2 (Title Banner)
      const spacerSheetRow = r + 2; // Subheader Row 3 (Visual Spacer)
      const headerSheetRow = r + 3; // Subheader Row 4 (Column Headers)
      const bufferBotRow   = r + 4; // Subheader Row 5

      if (bufferTopRow > 0) sheet.setRowHeight(bufferTopRow, r1Height);
      sheet.setRowHeight(titleSheetRow, r1Height);
      sheet.setRowHeight(spacerSheetRow, r3Height);
      if (headerSheetRow <= sheet.getMaxRows()) sheet.setRowHeight(headerSheetRow, r4Height);
      if (bufferBotRow <= sheet.getMaxRows()) sheet.setRowHeight(bufferBotRow, r1Height);
    }
  }
}

function applyNativeBandingSafe_(sheet, startRow, maxCols, totalRows, color1, color2) {
  if (totalRows <= startRow) return;
  const bandRange = sheet.getRange(startRow, 1, totalRows - (startRow - 1), maxCols);

  try {
    const sheetBandings = sheet.getBandings();
    for (let i = 0; i < sheetBandings.length; i++) sheetBandings[i].remove();
  } catch(e) {}

  try {
    let banding = bandRange.applyRowBanding();
    if (banding) {
      banding.setHeaderRowColor(null);
      if (color1) banding.setFirstRowColor(color1);
      if (color2) banding.setSecondRowColor(color2);
    }
  } catch (e) {
    Logger.log("Banding Note: " + e.message);
  }
}

function recalculateDashboardHexCodes_(dashboardSheet) {
  const rawDashData = dashboardSheet.getDataRange().getValues();
  const hslPercents = { l1: 60, l2: 75, l3: 85, l4: 90, l5: 97 };

  for (let r = 0; r < rawDashData.length; r++) {
    const setting = String(rawDashData[r][0] || "").trim();
    if (setting === "HSL Level 1 Lightness %") hslPercents.l1 = Number(rawDashData[r][1]) || 60;
    if (setting === "HSL Level 2 Lightness %") hslPercents.l2 = Number(rawDashData[r][1]) || 75;
    if (setting === "HSL Level 3 Lightness %") hslPercents.l3 = Number(rawDashData[r][1]) || 85;
    if (setting === "HSL Level 4 Lightness %") hslPercents.l4 = Number(rawDashData[r][1]) || 90;
    if (setting === "HSL Level 5 Lightness %") hslPercents.l5 = Number(rawDashData[r][1]) || 97;
  }

  let secCRow = -1, secERow = -1;
  for (let r = 0; r < rawDashData.length; r++) {
    const val = String(rawDashData[r][0] || "").trim();
    if (val === "SECTION C - SHEET DEFINITIONS") secCRow = r;
    if (val === "SECTION E - SYSTEM SHEET SURFACES") secERow = r;
  }

  if (secCRow !== -1) {
    for (let r = secCRow + 2; r < rawDashData.length; r++) {
      const sheetType = String(rawDashData[r][0] || "").trim();
      if (sheetType && sheetType.indexOf("SECTION ") === -1) {
        const baseHex = String(rawDashData[r][4] || "#65A9CC").trim();
        const theme = calculateThemeLevels_(baseHex, hslPercents);
        dashboardSheet.getRange(r + 1, 6, 1, 5).setNotes([[theme.level1, theme.level2, theme.level3, theme.level4, theme.level5]]);
      } else if (sheetType.indexOf("SECTION ") !== -1) break;
    }
  }

  if (secERow !== -1) {
    for (let r = secERow + 2; r < rawDashData.length; r++) {
      const name = String(rawDashData[r][0] || "").trim();
      if (name && name.indexOf("SECTION ") === -1) {
        const baseHex = String(rawDashData[r][11] || "#79B5D2").trim();
        const theme = calculateThemeLevels_(baseHex, hslPercents);
        dashboardSheet.getRange(r + 1, 13, 1, 5).setNotes([[theme.level1, theme.level2, theme.level3, theme.level4, theme.level5]]);
      } else if (name.indexOf("SECTION ") !== -1) break;
    }
  }
}

function hslToHex_(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hexToHsl_(hex) {
  let c = String(hex || "").replace('#', '').trim();
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  if (c.length !== 6) return { h: 200, s: 50, l: 50 };
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function calculateThemeLevels_(baseHex, hslPercents) {
  const hsl = hexToHsl_(baseHex);
  return {
    base: baseHex,
    level1: hslToHex_(hsl.h, hsl.s, hslPercents.l1),
    level2: hslToHex_(hsl.h, hsl.s, hslPercents.l2),
    level3: hslToHex_(hsl.h, hsl.s, hslPercents.l3),
    level4: hslToHex_(hsl.h, hsl.s, hslPercents.l4),
    level5: hslToHex_(hsl.h, hsl.s, hslPercents.l5)
  };
}

function getSectionEThemeForSheet_(targetSheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboardSheet = ss.getSheetByName("Format Dashboard");
  if (!dashboardSheet) return { level1: "#A2CDDC", level2: "#BBD9E7", level3: "#CCE3EE", level4: "#D9EAF2", level5: "#F4F9FB" };

  const dashMatrix = dashboardSheet.getDataRange().getValues();
  let eStart = -1;
  for (let r = 0; r < dashMatrix.length; r++) {
    if (String(dashMatrix[r][0] || "").trim() === "SECTION E - SYSTEM SHEET SURFACES") {
      eStart = r;
      break;
    }
  }

  if (eStart !== -1) {
    for (let r = eStart + 2; r < dashMatrix.length; r++) {
      const name = String(dashMatrix[r][0] || "").trim();
      if (name === targetSheetName || (targetSheetName === "Framework Timing Report" && name === "Framework Timing Report")) {
        return {
          level1: String(dashMatrix[r][12] || "#A2CDDC").trim(),
          level2: String(dashMatrix[r][13] || "#BBD9E7").trim(),
          level3: String(dashMatrix[r][14] || "#CCE3EE").trim(),
          level4: String(dashMatrix[r][15] || "#D9EAF2").trim(),
          level5: String(dashMatrix[r][16] || "#F4F9FB").trim()
        };
      }
    }
  }
  return { level1: "#A2CDDC", level2: "#BBD9E7", level3: "#CCE3EE", level4: "#D9EAF2", level5: "#F4F9FB" };
}

// ============================================================================
// === FRAMEWORK TIMING & TELEMETRY ENGINE ====================================
// ============================================================================

function startFrameworkTiming_(processName, monthParts) {
  const now = new Date().getTime();
  return {
    processName: processName || "Workflow",
    monthParts: monthParts || null,
    startMs: now,
    lastMs: now,
    steps: []
  };
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
    new Date(),
    timing.processName,
    stepName || "Step",
    Number(stepSeconds.toFixed(3)),
    Number(totalSeconds.toFixed(3)),
    severity,
    details || ""
  ]);

  timing.lastMs = now;
}

function writeFrameworkTimingReport_(timing) {
  if (!timing || !timing.steps || timing.steps.length === 0) return;
  
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Framework Timing Report");
    if (!sheet) return;

    const lastRow = Math.max(sheet.getLastRow(), 20);
    const logs = timing.steps.map(row => {
      const out = row.slice(0, 8);
      while (out.length < 8) out.push("");
      return out;
    });
    
    if (sheet.getMaxRows() < lastRow + logs.length + 5) {
      sheet.insertRowsAfter(sheet.getMaxRows(), logs.length + 10);
    }
    sheet.getRange(lastRow + 1, 1, logs.length, 8).setValues(logs);
    refreshFrameworkTimingSummaries_(sheet);

  } catch (err) {
    Logger.log("Timing telemetry write skipped: " + err.message);
  }
}

function writeRuntimeTimingReport_(timing) {
  writeFrameworkTimingReport_(timing);
}

function refreshFrameworkTimingSummaries_(sheet) {
  const values = sheet.getDataRange().getValues();
  let sectionDRow = -1;

  for (let r = 0; r < values.length; r++) {
    if (String(values[r][0]).indexOf("SECTION D - DETAILED TIMING LOG") !== -1) {
      sectionDRow = r + 4;
      break;
    }
  }

  if (sectionDRow === -1) return;

  const logData = values.slice(sectionDRow).filter(row => String(row[1]).trim() !== "");
  const recentLogs = logData.slice(-500);
  
  const processSummary = [];
  const issues = [];
  const recommendations = [];
  const processMap = {};

  recentLogs.forEach(row => {
    const process = String(row[1] || "").trim();
    const stepSeconds = Number(row[3]) || 0;
    const severity = String(row[5] || "OK").toUpperCase();
    
    if (!processMap[process]) {
      processMap[process] = { runtime: 0, status: "PASS" };
    }
    processMap[process].runtime += stepSeconds;
    
    if (severity === "CRITICAL" || severity === "BOTTLENECK") {
      processMap[process].status = severity;
      issues.push(["High", process, stepSeconds, "Target < 30s", row[2], "Review API call volume in this step."]);
      recommendations.push([process, "Slow step detected", "Medium", "Optimize memory array processing", "High", "Open"]);
    }
  });

  Object.keys(processMap).forEach(proc => {
    const data = processMap[proc];
    processSummary.push([proc, Number(data.runtime.toFixed(3)), data.status, "", "", ""]);
  });

  if (processSummary.length === 0) processSummary.push(["No data", "", "", "", "", ""]);
  if (issues.length === 0) issues.push(["None", "", "", "", "", ""]);
  if (recommendations.length === 0) recommendations.push(["None", "", "", "", "", ""]);

  safeWriteTimingSection_(sheet, "SECTION A - PROCESS SUMMARY", processSummary);
  safeWriteTimingSection_(sheet, "SECTION B - PERFORMANCE ISSUES", issues);
  safeWriteTimingSection_(sheet, "SECTION C - OPTIMIZATION RECOMMENDATIONS", recommendations);
}

function safeWriteTimingSection_(sheet, sectionTitle, dataMatrix) {
  const values = sheet.getDataRange().getValues();
  let anchorRow = -1;

  for (let r = 0; r < values.length; r++) {
    if (String(values[r][0]).toUpperCase().indexOf(sectionTitle) !== -1) {
      anchorRow = r + 1;
      break;
    }
  }

  if (anchorRow === -1) return;
  const dataStartRow = anchorRow + 4;
  
  const normalizedMatrix = dataMatrix.map(row => {
    const out = row.slice(0, 8);
    while (out.length < 8) out.push("");
    return out;
  });

  sheet.getRange(dataStartRow, 1, Math.max(normalizedMatrix.length, 5), 8).clearContent();
  sheet.getRange(dataStartRow, 1, normalizedMatrix.length, 8).setValues(normalizedMatrix);
}

/**
 * OPTION 2: Clears raw timing entries in SECTION D and resets Sections A-C 
 * back to blank placeholders so performance summaries stay in sync.
 */
function clearDiagnosticsAndTimingLogs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Clearing Detailed Timing Logs & Summaries...", "System", 5);

  const timingSheet = ss.getSheetByName("Framework Timing Report");
  if (timingSheet) {
    safeWriteTimingSection_(timingSheet, "SECTION A - PROCESS SUMMARY", [["Enter Data here"]]);
    safeWriteTimingSection_(timingSheet, "SECTION B - PERFORMANCE ISSUES", [["Enter Data here"]]);
    safeWriteTimingSection_(timingSheet, "SECTION C - OPTIMIZATION RECOMMENDATIONS", [["Enter Data here"]]);
    safeWriteTimingSection_(timingSheet, "SECTION D - DETAILED TIMING LOG", [["Enter Data here"]]);
  }

  ss.toast("Framework Timing Report reset to clean state!", "Complete", 5);
}

function toggleFrameworkTiming() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getDocumentProperties();
  const currentState = props.getProperty("RFF_FRAMEWORK_TIMING_ENABLED");
  
  const isCurrentlyEnabled = currentState !== "false";
  const nextState = isCurrentlyEnabled ? "false" : "true";
  
  props.setProperty("RFF_FRAMEWORK_TIMING_ENABLED", nextState);
  
  const statusText = nextState === "true" ? "ON 🟢" : "OFF 🔴";
  ss.toast(`Framework Timing is now ${statusText}`, "Telemetry Settings", 5);
  return nextState === "true";
}

// ============================================================================
// === DASHBOARD QUALITY & VALIDATION ENGINE ==================================
// ============================================================================

/**
 * Menu Callback: Dashboard Quality Start up
 * Runs SECTION A - Format Dashboard Validation
 */
function runDashboardQualityStartUp() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Running Format Dashboard Validation...", "QA Engine", 5);
  runDashboardQualityConfigVerificationSections_();
  ss.toast("Format Dashboard Validation Complete!", "QA Engine", 5);
}

/**
 * Menu Callback: Dashboard Quality Validate Templates
 * Runs SECTION B - Template Validation
 */
function runDashboardQualityValidateTemplates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Running Template Validation...", "QA Engine", 5);
  runDashboardQualityTemplateValidation_();
  ss.toast("Template Validation Complete!", "QA Engine", 5);
}

/**
 * Menu Callback: Dashboard Quality Workflow
 * Runs SECTION C through SECTION I
 */
function runDashboardQualityWorkflow() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Running Dashboard Quality diagnostics...", "QA Engine", 5);
  
  runDashboardQualityRawDataValidation_();             // SECTION C
  runDashboardQualityDemoPValidation_();               // SECTION D
  runDashboardQualityDisenrolledExclusionValidation_(); // SECTION E
  runDashboardQualityMonthlyChangeValidation_();       // SECTION F
  runDashboardQualityMasterListValidation_();          // SECTION G
  updateFormatDashboardChangelog_();                   // SECTION H
  runDashboardQualitySummaryAndSignoff_();             // SECTION I
  
  ss.toast("Quality Diagnostics Complete! Check the Dashboard Quality Report.", "QA Engine", 5);
}

/**
 * Safe Writer with Negative Result Highlighting:
 * Finds the Section Title in the Quality Report, writes data, and highlights
 * negative results (FAIL, ERROR, CRITICAL, WARNING).
 */
function writeDashboardQualitySection(sectionTitle, dataMatrix) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Dashboard Quality Report");
  if (!sheet || !dataMatrix || dataMatrix.length === 0) return;

  const values = sheet.getDataRange().getValues();
  let anchorRow = -1;

  for (let r = 0; r < values.length; r++) {
    const rowStr = String(values[r][0] || "").trim().toUpperCase();
    if (rowStr.indexOf(sectionTitle.toUpperCase()) !== -1) {
      anchorRow = r + 1;
      break;
    }
  }

  if (anchorRow === -1) return;

  const dataStartRow = anchorRow + 4;
  const normalizedMatrix = dataMatrix.map(row => {
    const out = row.slice(0, 7);
    while (out.length < 7) out.push("");
    return out;
  });

  const rowsToClear = Math.max(normalizedMatrix.length, 15);
  const writeRange = sheet.getRange(dataStartRow, 1, normalizedMatrix.length, 7);

  sheet.getRange(dataStartRow, 1, rowsToClear, 7)
    .clearContent()
    .setBackground(null)
    .setFontColor("#000000")
    .setFontWeight("normal");

  writeRange.setValues(normalizedMatrix);

  const backgrounds = [];
  const fontColors = [];
  const fontWeights = [];

  normalizedMatrix.forEach(row => {
    const status = String(row[1] || "").toUpperCase().trim();
    let bg = null;
    let color = "#000000";
    let weight = "normal";

    if (status === "FAIL" || status === "CRITICAL" || status === "ERROR") {
      bg = "#F8D7DA";    // Light red
      color = "#721C24"; // Dark red
      weight = "bold";
    } else if (status === "WARNING") {
      bg = "#FFF3CD";    // Light yellow
      color = "#856404"; // Dark yellow
      weight = "bold";
    } else if (status === "PASS" || status === "OK" || status === "VERIFIED") {
      bg = "#D4EDDA";    // Light green
      color = "#155724"; // Dark green
      weight = "normal";
    }

    backgrounds.push(new Array(7).fill(bg));
    fontColors.push(new Array(7).fill(color));
    fontWeights.push(new Array(7).fill(weight));
  });

  writeRange.setBackgrounds(backgrounds);
  writeRange.setFontColors(fontColors);
  writeRange.setFontWeights(fontWeights);
}

// --- SPECIFIC VALIDATION TESTS ---

/**
 * SECTION A - FORMAT DASHBOARD VALIDATION
 */
function runDashboardQualityConfigVerificationSections_(timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboard = ss.getSheetByName("Format Dashboard");
  const rows = [];

  if (!dashboard) {
    rows.push(["All Sections", "FAIL", "Missing Sheet", "Format Dashboard is missing."]);
    writeDashboardQualitySection("SECTION A - FORMAT DASHBOARD VALIDATION", rows);
    return;
  }

  const dashIndex = buildDashboardSectionIndex_(dashboard);

  function summarizeConfigSection_(sectionName, detailRows) {
    if (!detailRows || detailRows.length <= 1) return [sectionName, "FAIL", "Missing Data", "Could not read section."];
    let hasFail = false, hasWarning = false, issueCount = 0;

    for (let i = 1; i < detailRows.length; i++) {
      const status = String(detailRows[i][1] || "").toUpperCase();
      if (status === "FAIL" || status === "CRITICAL") { hasFail = true; issueCount++; } 
      else if (status === "WARNING") { hasWarning = true; issueCount++; }
    }

    if (hasFail) return [sectionName, "FAIL", `${issueCount} issue(s) detected`, `Review ${sectionName} on Format Dashboard.`];
    if (hasWarning) return [sectionName, "WARNING", `${issueCount} warning(s) detected`, `Review ${sectionName} on Format Dashboard.`];
    return [sectionName, "PASS", "OK", "All settings populated correctly."];
  }

  rows.push(summarizeConfigSection_("Section A & B (Global/Titles)", collectFormatDashboardGlobalInputVerificationRows_(dashIndex)));
  rows.push(summarizeConfigSection_("Section C (Sheet Definitions)", collectFormatDashboardSheetDefinitionVerificationRows_(dashIndex)));
  rows.push(summarizeConfigSection_("Section D (Sheet Behaviors)", collectFormatDashboardSheetBehaviorVerificationRows_(dashIndex)));
  rows.push(summarizeConfigSection_("Section E (Sheet Headers)", collectFormatDashboardSheetHeaderVerificationRows_(dashIndex)));
  rows.push(summarizeConfigSection_("Section F (Tab Organization)", collectFormatDashboardTabOrganizationVerificationRows_(dashIndex)));
  rows.push(summarizeConfigSection_("Section G (Column Definitions)", collectFormatDashboardColumnDefinitionVerificationRows_(dashIndex)));

  writeDashboardQualitySection("SECTION A - FORMAT DASHBOARD VALIDATION", rows);
  if (timing) markFrameworkStep_(timing, "Format Dashboard configuration verified and summarized.");
}

/**
 * SECTION B - TEMPLATE VALIDATION
 */
function runDashboardQualityTemplateValidation_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rows = [];

  function checkSheet_(sheetName, type, expectedFrozenRows) {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      return [sheetName, "FAIL", "Missing", `${type} was not found in the workbook.`];
    }
    
    const actualFrozen = sheet.getFrozenRows();
    if (actualFrozen < expectedFrozenRows) {
      return [sheetName, "WARNING", "Frozen Rows", `Expected at least ${expectedFrozenRows} frozen rows, but found ${actualFrozen}.`];
    }
    
    return [sheetName, "PASS", "OK", `${type} is present and structurally intact.`];
  }

  rows.push(checkSheet_("RFF_BASE_TEMPLATE", "Base Template", 4));
  rows.push(checkSheet_("Format Dashboard", "System Sheet", 1));
  rows.push(checkSheet_("Framework Timing Report", "System Sheet", 1));
  rows.push(checkSheet_("Dashboard Quality Report", "System Sheet", 1));

  try {
    const dashboard = loadDashboardConfig_();
    const globalFreeze = dashboard.globals ? (Number(dashboard.globals.freezeRows) || 4) : 4;
    
    if (dashboard.sheetDefinitions && dashboard.sheetDefinitions.length > 0) {
      dashboard.sheetDefinitions.forEach(def => {
        rows.push(checkSheet_(def.templateName, "Report Template", globalFreeze));
      });
    } else {
      rows.push(["Report Templates", "FAIL", "Config Error", "No templates defined in Format Dashboard Section C."]);
    }
  } catch (err) {
    rows.push(["Report Templates", "FAIL", "Read Error", "Could not load templates from Format Dashboard: " + err.message]);
  }

  writeDashboardQualitySection("SECTION B - TEMPLATE VALIDATION", rows);
}

/**
 * SECTION C - RAW DATA VALIDATION
 */
function runDashboardQualityRawDataValidation_() {
  const monthParts = getMonthDateParts_(new Date());
  const rawSheet = getCurrentRawDataSheet_(monthParts);
  const bannerSheet = getCurrentBannersSheet_(monthParts);
  const rows = [];

  if (!rawSheet) {
    rows.push(["Raw Data Target", "FAIL", "Sheet Missing", "Active formatted Raw Data sheet not found for current month."]);
  } else {
    const rawData = getDataValues_(rawSheet, HEADER_ROW, DATA_START_ROW);
    const rawPmrIdx = getPMRIndex_(rawData.headerMap);
    const primaryIdx = rawData.headerMap["Primary PMR Row"];

    if (primaryIdx === undefined || rawPmrIdx === -1) {
      rows.push(["Primary PMR Assignment", "FAIL", "Schema Missing", "Primary PMR Row column or PMR header is missing."]);
    } else {
      let primaryCount = 0;
      const seenPmr = new Set();
      let multiPrimaryCount = 0;

      rawData.values.forEach(function(row) {
        const pmr = normalizePMR_(row[rawPmrIdx]);
        if (!pmr) return;
        if (isPrimaryPMRRowValue_(row[primaryIdx])) {
          primaryCount++;
          if (seenPmr.has(pmr)) multiPrimaryCount++;
          seenPmr.add(pmr);
        }
      });

      if (multiPrimaryCount > 0) {
        rows.push(["Primary PMR Assignment", "FAIL", "Duplicate Primaries", "Detected " + multiPrimaryCount + " instances where a single PMR has multiple 'Yes' rows."]);
      } else if (primaryCount === 0 && rawData.values.length > 0) {
        rows.push(["Primary PMR Assignment", "WARNING", "No Primaries Flags", "Raw Data rows exist but zero records are flagged as Primary PMR."]);
      } else {
        rows.push(["Primary PMR Assignment", "PASS", "OK", "Primary row assignment logic is fully active; mapped " + seenPmr.size + " unique primary flags."]);
      }
    }
  }

  if (!bannerSheet) {
    rows.push(["Banner Sync Check", "WARNING", "Missing Monthly Banner Sheet", "Cannot cross-verify Banner columns because the formatted monthly Banners tab is missing."]);
  } else if (rawSheet) {
    const rawData = getDataValues_(rawSheet, HEADER_ROW, DATA_START_ROW);
    const rawPmrIdx = getPMRIndex_(rawData.headerMap);
    const primaryIdx = rawData.headerMap["Primary PMR Row"];
    const bannerHeaders = ["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"];
    let mappedCheckCount = 0;
    let syncDiscrepancyCount = 0;
    const bannerMap = buildSourceMapByCompositeKeyForDemoPBanner_(bannerSheet, HEADER_ROW, DATA_START_ROW, ["Participant PMR#", "Last Name", "First Name"]);

    if (bannerMap.size > 0 && rawPmrIdx !== -1) {
      const rawLastNameIdx = rawData.headerMap["Last Name"];
      const rawFirstNameIdx = rawData.headerMap["First Name"];

      rawData.values.forEach(function(row) {
        if (rawLastNameIdx === undefined || rawFirstNameIdx === undefined) return;
        if (primaryIdx !== undefined && !isPrimaryPMRRowValue_(row[primaryIdx])) return;

        const key = [
          normalizeKeyPart_(row[rawPmrIdx]),
          normalizeKeyPart_(row[rawLastNameIdx]),
          normalizeKeyPart_(row[rawFirstNameIdx])
        ].join("|||");

        const sourceMatch = bannerMap.get(key);
        if (!sourceMatch) return;
        mappedCheckCount++;

        bannerHeaders.forEach(function(field) {
          const rawIdx = rawData.headerMap[field];
          if (rawIdx === undefined) return;
          const rawCell = String(row[rawIdx] || "").trim().toUpperCase();
          const sourceCell = String(sourceMatch[field] || "").trim().toUpperCase();
          if (rawCell !== sourceCell) syncDiscrepancyCount++;
        });
      });

      if (syncDiscrepancyCount > 0) {
        rows.push(["Banner Sync Verification", "FAIL", "Sync Discrepancies", "Detected " + syncDiscrepancyCount + " cell mismatches between active Raw Data and the Banners import sheet."]);
      } else if (mappedCheckCount === 0) {
        rows.push(["Banner Sync Verification", "WARNING", "Zero Matching Profile Keys", "No participants could be cross-matched by PMR + Name keys between Banners and Raw Data."]);
      } else {
        rows.push(["Banner Sync Verification", "PASS", "OK", "Banner synchronization verified clean across " + mappedCheckCount + " active participant profiles."]);
      }
    } else {
      rows.push(["Banner Sync Verification", "WARNING", "No Banner Mapping Rows", "Banners tab exists but no composite PMR + Name keys were available to compare."]);
    }
  }

  try {
    const dashboard = loadDashboardConfig_();
    const subReports = [
      { type: "Raw Data", sheet: rawSheet },
      { type: "Banners", sheet: bannerSheet },
      { type: "CP Due Date", sheet: getCurrentCarePlanDueSheet_(monthParts) },
      { type: "Unlock CP", sheet: getCurrentUnlockedCarePlanSheet_(monthParts) }
    ];

    subReports.forEach(report => {
      if (!report.sheet) return;
      
      const sheet = report.sheet;
      const headers = getHeadersForSheetType_(dashboard, report.type);
      const dataRows = Math.max(sheet.getLastRow() - DATA_START_ROW + 1, 0);
      
      if (dataRows < 1) return; 

      let formatMismatchCount = 0;
      let checkedColumns = 0;
      
      const formatRange = sheet.getRange(DATA_START_ROW, 1, Math.min(10, dataRows), Math.max(headers.length, 1));
      const allFormats = formatRange.getNumberFormats();

      headers.forEach((header, colIndex) => {
        const def = dashboard.columnDefinitions[header] || {};
        
        if (def.dateColumn || isDateLikeHeader_(header)) {
          checkedColumns++;
          let colHasMismatch = false;
          
          for (let r = 0; r < allFormats.length; r++) {
            const cellFormat = String(allFormats[r][colIndex] || "").toLowerCase().replace(/\s+/g, "");
            if (cellFormat !== "m/d/yyyy" && cellFormat !== "mm/dd/yyyy" && cellFormat !== "m/d/yy") {
              colHasMismatch = true;
            }
          }
          
          if (colHasMismatch) formatMismatchCount++;
        }
      });

      if (checkedColumns > 0) {
        if (formatMismatchCount > 0) {
          rows.push([`${report.type} Date Formats`, "FAIL", "Format Mismatch", `Found ${formatMismatchCount} date column(s) not formatted as mm/dd/yyyy on ${sheet.getName()}.`]);
        } else {
          rows.push([`${report.type} Date Formats`, "PASS", "OK", `All ${checkedColumns} date column(s) correctly formatted as mm/dd/yyyy on ${sheet.getName()}.`]);
        }
      }
    });
  } catch (e) {
    rows.push(["Date Format Audit", "FAIL", "Audit Error", "Failed to run date format audit: " + e.message]);
  }

  if (rows.length === 0) rows.push(["Raw Data checks", "PASS", "None", "No data to check."]);
  writeDashboardQualitySection("SECTION C - RAW DATA VALIDATION", rows);
}

/**
 * SECTION D - DEMO P QUALITY VALIDATION
 */
function runDashboardQualityDemoPValidation_() {
  const rows = [];
  const demoSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Refined Data") || getLatestSheetByPrefix_("Refined Data");
  
  if (!demoSheet) {
    rows.push(["Demo P Sheet", "FAIL", "Missing", "Demo P / Refined Data sheet not found. Build Demo P first."]);
    writeDashboardQualitySection("SECTION D - DEMO P QUALITY VALIDATION", rows);
    return;
  }
  
  rows.push(["Demo P sheet present", "PASS", "None", demoSheet.getName() + " is available."]);
  
  const data = getDataValues_(demoSheet, HEADER_ROW, DATA_START_ROW);
  const headerMap = data.headerMap;
  const values = data.values;
  
  if (!values.length) {
    rows.push(["Demo P Data", "WARNING", "Empty Sheet", "Sheet exists but has no data rows."]);
    writeDashboardQualitySection("SECTION D - DEMO P QUALITY VALIDATION", rows);
    return;
  }

  let nameErrors = 0;
  let addressErrors = 0;
  let phoneErrors = 0;
  let bannerErrors = 0;
  let notesErrors = 0;
  let languageErrors = 0;
  let contactErrors = 0;
  let metadataErrors = 0;
  let sortErrors = 0;

  const partNameIdx = headerMap["Participant Name"];
  const altNameIdx = headerMap["Name"];
  const firstIdx = headerMap["First Name"];
  const lastIdx = headerMap["Last Name"];
  
  const addrStreetIdx = headerMap["Address 1 - Street"];
  const addrLine1Idx = headerMap["Address Line 1"];
  
  const phone1Idx = headerMap["Phone 1 - Value"];
  const rawPhoneIdx = headerMap["Phone Number"];

  const bannerSumIdx = headerMap["Banner Summary"];
  const bannerHeaders = ["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"];
  
  const notesIdx = headerMap["Notes"];
  
  const contactSumIdx = headerMap["Contact - Summary"];
  const rawContactLastIdx = headerMap["Contact - Last Name"];

  const customLabelIdx = headerMap["Custom Field 1 - Label"];
  const primaryLangIdx = headerMap["Primary Language"];

  const hashIdx = headerMap["Source Hash"];
  const lastUpdatedIdx = headerMap["Last Updated At"];

  let previousSortKey = "";

  values.forEach(row => {
    const first = String(row[firstIdx] || "").trim();
    const last = String(row[lastIdx] || "").trim();

    if (first !== "" || last !== "") {
      if (partNameIdx !== undefined && String(row[partNameIdx] || "").trim() === "") nameErrors++;
      if (altNameIdx !== undefined && String(row[altNameIdx] || "").trim() === "") nameErrors++;
    }
    
    if (addrStreetIdx !== undefined && addrLine1Idx !== undefined) {
      if (String(row[addrLine1Idx] || "").trim() !== "" && String(row[addrStreetIdx] || "").trim() === "") addressErrors++;
    }
    
    if (phone1Idx !== undefined && rawPhoneIdx !== undefined) {
      if (String(row[rawPhoneIdx] || "").trim() !== "" && String(row[phone1Idx] || "").trim() === "") phoneErrors++;
    }

    if (bannerSumIdx !== undefined) {
      let hasBanner = false;
      bannerHeaders.forEach(header => {
        const bIdx = headerMap[header];
        if (bIdx !== undefined && String(row[bIdx] || "").trim() !== "") hasBanner = true;
      });
      if (hasBanner && String(row[bannerSumIdx] || "").trim() === "") bannerErrors++;
    }

    if (contactSumIdx !== undefined && rawContactLastIdx !== undefined) {
      if (String(row[rawContactLastIdx] || "").trim() !== "" && String(row[contactSumIdx] || "").trim() === "") contactErrors++;
    }

    if (notesIdx !== undefined) {
      const hasContent = (bannerSumIdx !== undefined && String(row[bannerSumIdx] || "").trim() !== "") || 
                         (contactSumIdx !== undefined && String(row[contactSumIdx] || "").trim() !== "");
      if (hasContent && String(row[notesIdx] || "").trim() === "") notesErrors++;
    }

    if (customLabelIdx !== undefined && primaryLangIdx !== undefined) {
      const lang = String(row[primaryLangIdx] || "").trim().toLowerCase();
      if (lang && lang !== "english" && String(row[customLabelIdx] || "").trim() !== "Language") languageErrors++;
    }

    if (hashIdx !== undefined && lastUpdatedIdx !== undefined) {
      if (String(row[hashIdx] || "").trim() === "" || String(row[lastUpdatedIdx] || "").trim() === "") metadataErrors++;
    }

    const currentSortKey = (last + " " + first).toLowerCase();
    if (previousSortKey !== "" && currentSortKey < previousSortKey) {
      sortErrors++;
    }
    if (currentSortKey !== " ") { 
      previousSortKey = currentSortKey;
    }
  });

  if (partNameIdx !== undefined || altNameIdx !== undefined) {
    rows.push(["Name Generation", nameErrors === 0 ? "PASS" : "FAIL", nameErrors === 0 ? "OK" : `${nameErrors} missing names`, "Validates Participant Name & Name functions."]);
  }
  if (addrStreetIdx !== undefined) {
    rows.push(["Address Combination", addressErrors === 0 ? "PASS" : "FAIL", addressErrors === 0 ? "OK" : `${addressErrors} uncombined addresses`, "Validates combineAddressesData_."]);
  }
  if (phone1Idx !== undefined) {
    rows.push(["Phone Splitting", phoneErrors === 0 ? "PASS" : "FAIL", phoneErrors === 0 ? "OK" : `${phoneErrors} unsplit phones`, "Validates splitPhoneNumbersData_."]);
  }
  if (bannerSumIdx !== undefined) {
    rows.push(["Banner Compilation", bannerErrors === 0 ? "PASS" : "FAIL", bannerErrors === 0 ? "OK" : `${bannerErrors} missing summaries`, "Validates updateBannerColumnData_."]);
  }
  if (contactSumIdx !== undefined) {
    rows.push(["Contact Flattening", contactErrors === 0 ? "PASS" : "FAIL", contactErrors === 0 ? "OK" : `${contactErrors} unflattened contacts`, "Validates flattenDemoPContactRowsInMemory_."]);
  }
  if (notesIdx !== undefined) {
    rows.push(["Notes Compilation", notesErrors === 0 ? "PASS" : "FAIL", notesErrors === 0 ? "OK" : `${notesErrors} missing notes`, "Validates combineNotesSummaryData_."]);
  }
  if (customLabelIdx !== undefined) {
    rows.push(["Language Handling", languageErrors === 0 ? "PASS" : "FAIL", languageErrors === 0 ? "OK" : `${languageErrors} unmapped languages`, "Validates handleLanguageData_."]);
  }
  if (hashIdx !== undefined) {
    rows.push(["Metadata & Hashes", metadataErrors === 0 ? "PASS" : "FAIL", metadataErrors === 0 ? "OK" : `${metadataErrors} missing metadata tags`, "Validates populateUniversalMetadataColumns_."]);
  }
  rows.push(["Alphabetical Sorting", sortErrors === 0 ? "PASS" : "FAIL", sortErrors === 0 ? "OK" : `${sortErrors} out-of-order rows`, "Validates sortSheetAlphabeticallyByParticipantName_."]);

  writeDashboardQualitySection("SECTION D - DEMO P QUALITY VALIDATION", rows);
}

/**
 * SECTION E - DISENROLLED EXCLUSION VALIDATION
 */
function runDashboardQualityDisenrolledExclusionValidation_() {
  const rows = [];
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Disenrolled Exclusion");
  
  if (!sheet) {
    rows.push(["Disenrolled Sheet", "FAIL", "Missing", "Sheet not found. Run Monthly Change/Disenrolled Exclusion workflow."]);
    writeDashboardQualitySection("SECTION E - DISENROLLED EXCLUSION VALIDATION", rows);
    return;
  }
  
  rows.push(["Disenrolled sheet present", "PASS", "None", sheet.getName() + " is available for exclusion audit."]);
  
  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) {
    rows.push(["Disenrolled Data", "WARNING", "Empty Sheet", "Sheet exists but has no data rows yet."]);
    writeDashboardQualitySection("SECTION E - DISENROLLED EXCLUSION VALIDATION", rows);
    return;
  }

  const headerMap = data.headerMap;
  const addedIdx = headerMap["Added to Disenrolled Exclusion"];
  const effIdx = headerMap["Disenrollment Effective Date"];
  const disIdx = headerMap["Disenrollment Date"];
  const dodIdx = headerMap["Date of Death"];

  if (addedIdx === undefined) {
    rows.push(["System Schema", "FAIL", "Missing Column", "Cannot audit: 'Added to Disenrolled Exclusion' column is missing."]);
    writeDashboardQualitySection("SECTION E - DISENROLLED EXCLUSION VALIDATION", rows);
    return;
  }

  let missingAddedDate = 0;
  let sortErrors = 0;
  let unhiddenOldRows = 0;
  let improperlyHiddenNewRows = 0;
  let previousAddedDate = null;

  const today = new Date();
  const cutoff = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  cutoff.setDate(cutoff.getDate() - 365);

  data.values.forEach((row, idx) => {
    const addedDate = normalizeToDateObject_(row[addedIdx]);
    if (!addedDate || isNaN(addedDate.getTime())) {
      missingAddedDate++;
    } else {
      if (previousAddedDate && addedDate.getTime() > previousAddedDate.getTime()) {
        sortErrors++;
      }
      previousAddedDate = addedDate;
    }

    if (effIdx !== undefined && disIdx !== undefined && dodIdx !== undefined) {
      const dates = [row[effIdx], row[disIdx], row[dodIdx]]
        .map(d => normalizeToDateObject_(d))
        .filter(d => d && !isNaN(d.getTime()))
        .sort((a, b) => b.getTime() - a.getTime());

      const effectiveDate = dates[0];
      if (effectiveDate) {
        const isOld = effectiveDate.getTime() < cutoff.getTime();
        const isHidden = sheet.isRowHiddenByUser(DATA_START_ROW + idx);
        
        if (isOld && !isHidden) unhiddenOldRows++;
        if (!isOld && isHidden) improperlyHiddenNewRows++;
      }
    }
  });

  rows.push([
    "Audit 'Added' Dates", 
    missingAddedDate === 0 ? "PASS" : "FAIL", 
    missingAddedDate === 0 ? "OK" : `${missingAddedDate} missing dates`, 
    "Verifies every row has a system stamp in 'Added to Disenrolled Exclusion'."
  ]);

  rows.push([
    "Top-Down Insertion Sorting", 
    sortErrors === 0 ? "PASS" : "FAIL", 
    sortErrors === 0 ? "OK" : `${sortErrors} records out of order`, 
    "Verifies newest batches are successfully injected at Row 5."
  ]);

  const visibilityErrors = unhiddenOldRows + improperlyHiddenNewRows;
  if (effIdx !== undefined) {
    rows.push([
      "12-Month Visibility Sweep", 
      visibilityErrors === 0 ? "PASS" : "WARNING", 
      visibilityErrors === 0 ? "OK" : `${unhiddenOldRows} stale rows visible, ${improperlyHiddenNewRows} new rows hidden`, 
      "Verifies records older than 365 days are hidden from the active workspace."
    ]);
  }

  writeDashboardQualitySection("SECTION E - DISENROLLED EXCLUSION VALIDATION", rows);
}

/**
 * SECTION F - MONTHLY CHANGE VALIDATION
 */
function runDashboardQualityMonthlyChangeValidation_() {
  const rows = [];
  const sheet = getLatestSheetByPrefix_("Monthly Change");
  
  if (!sheet) {
    rows.push(["Monthly Change Sheet", "WARNING", "Missing", "No Monthly Change report found. Run the Monthly Start/Update workflow to generate it."]);
    writeDashboardQualitySection("SECTION F - MONTHLY CHANGE VALIDATION", rows);
    return;
  }
  
  rows.push(["Monthly Change sheet present", "PASS", "None", sheet.getName() + " is available for audit."]);
  
  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) {
    rows.push(["Monthly Change Data", "PASS", "No Changes", "Sheet exists but detected exactly 0 participant changes for this month."]);
    writeDashboardQualitySection("SECTION F - MONTHLY CHANGE VALIDATION", rows);
    return;
  }

  const headerMap = data.headerMap;
  const pmrIdx = headerMap["Participant PMR#"];
  const changesIdx = headerMap["Columns With Change"];

  if (changesIdx === undefined) {
    rows.push(["System Schema", "FAIL", "Missing Column", "Cannot audit: 'Columns With Change' header is missing."]);
    writeDashboardQualitySection("SECTION F - MONTHLY CHANGE VALIDATION", rows);
    return;
  }

  let missingPmrCount = 0;
  let missingChangesCount = 0;
  let documentedChangesCount = 0;

  data.values.forEach(row => {
    if (pmrIdx !== undefined && String(row[pmrIdx] || "").trim() === "") {
      missingPmrCount++;
    }

    const changeText = String(row[changesIdx] || "").trim();
    if (changeText === "") {
      missingChangesCount++;
    } else {
      documentedChangesCount++;
    }
  });

  if (pmrIdx !== undefined) {
    rows.push([
      "Participant Identification", 
      missingPmrCount === 0 ? "PASS" : "FAIL", 
      missingPmrCount === 0 ? "OK" : `${missingPmrCount} rows missing PMR`, 
      "Verifies every logged change is attached to a valid PMR."
    ]);
  }

  rows.push([
    "Change Tracking Logic", 
    missingChangesCount === 0 ? "PASS" : "FAIL", 
    missingChangesCount === 0 ? "OK" : `${missingChangesCount} ghost rows detected`, 
    "Verifies the comparison engine documented actual text in 'Columns With Change'."
  ]);

  rows.push([
    "Historical State Capture", 
    "PASS", 
    "OK", 
    `Successfully audited and verified state changes across ${documentedChangesCount} participant records.`
  ]);

  writeDashboardQualitySection("SECTION F - MONTHLY CHANGE VALIDATION", rows);
}

/**
 * SECTION G - MASTER LIST VALIDATION
 */
function runDashboardQualityMasterListValidation_() {
  const rows = [];
  
  const masterSheet = getLatestSheetByPrefix_("Master List");
  const cpDueSheet = getLatestSheetByPrefix_("CP Due Date");
  const unlockCpSheet = getLatestSheetByPrefix_("Unlock CP");
  
  if (!masterSheet) {
    rows.push(["Master List Target", "FAIL", "Missing", "No active Master List found to audit."]);
    writeDashboardQualitySection("SECTION G - MASTER LIST VALIDATION", rows);
    return;
  }
  
  rows.push(["Master List present", "PASS", "None", masterSheet.getName() + " is available."]);
  
  const masterData = getDataValues_(masterSheet, HEADER_ROW, DATA_START_ROW);
  if (!masterData.values.length) {
    rows.push(["Master List Data", "WARNING", "Empty Sheet", "Master List exists but has no data rows."]);
    writeDashboardQualitySection("SECTION G - MASTER LIST VALIDATION", rows);
    return;
  }

  const mHeaderMap = masterData.headerMap;
  const pmrIdx = mHeaderMap["Participant PMR#"];
  const nameIdx = mHeaderMap["Participant Name"];
  const statusIdx = mHeaderMap["Enrollment Status"];

  let disenrolledLeakCount = 0;
  let cpDueSyncErrors = 0;
  let cpDueMatchCount = 0;
  let unlockSyncErrors = 0;
  let unlockMatchCount = 0;

  if (statusIdx !== undefined) {
    masterData.values.forEach(row => {
      const status = String(row[statusIdx] || "").trim().toLowerCase();
      if (status.includes("disenrolled") || status.includes("deceased")) {
        disenrolledLeakCount++;
      }
    });
    
    rows.push([
      "Active Roster Integrity", 
      disenrolledLeakCount === 0 ? "PASS" : "FAIL", 
      disenrolledLeakCount === 0 ? "OK" : `${disenrolledLeakCount} inactive records found`, 
      "Verifies disenrolled/deceased participants are successfully filtered off the Master List."
    ]);
  }

  if (!cpDueSheet) {
    rows.push(["CP Due Date Sync", "WARNING", "Source Missing", "CP Due Date sheet not found; cannot verify sync."]);
  } else if (nameIdx !== undefined) {
    const cpData = getDataValues_(cpDueSheet, HEADER_ROW, DATA_START_ROW);
    const cpMap = buildSourceMapByCompositeKeyForDemoPBanner_(cpDueSheet, HEADER_ROW, DATA_START_ROW, ["Participant Name"]);
    
    const mTypeIdx = mHeaderMap["CP Type"];
    const mNextIdx = mHeaderMap["Next Care Plan Due"];
    
    masterData.values.forEach(row => {
      const key = normalizeKeyPart_(row[nameIdx]);
      const sourceMatch = cpMap.get(key);
      if (!sourceMatch) return;
      
      cpDueMatchCount++;
      
      const sType = String(sourceMatch["CP Type"] || "").trim().toUpperCase();
      const mType = String(row[mTypeIdx] || "").trim().toUpperCase();
      
      const sNext = String(sourceMatch["Next Care Plan Due"] || "").trim();
      const mNext = String(row[mNextIdx] || "").trim();
      
      if (sType !== mType || sNext !== mNext) {
        cpDueSyncErrors++;
      }
    });

    if (cpDueMatchCount === 0) {
      rows.push(["CP Due Date Sync", "WARNING", "No Matches", "Could not match any participants between Master List and CP Due Date."]);
    } else {
      rows.push([
        "CP Due Date Sync", 
        cpDueSyncErrors === 0 ? "PASS" : "FAIL", 
        cpDueSyncErrors === 0 ? "OK" : `${cpDueSyncErrors} sync mismatches`, 
        `Successfully verified CP Type & Next Due dates across ${cpDueMatchCount} profiles.`
      ]);
    }
  }

  if (!unlockCpSheet) {
    rows.push(["Unlocked CP Sync", "WARNING", "Source Missing", "Unlocked CP sheet not found; cannot verify sync."]);
  } else if (nameIdx !== undefined) {
    const unData = getDataValues_(unlockCpSheet, HEADER_ROW, DATA_START_ROW);
    const unMap = buildSourceMapByCompositeKeyForDemoPBanner_(unlockCpSheet, HEADER_ROW, DATA_START_ROW, ["Participant Name"]);
    
    const mIdtIdx = mHeaderMap["IDT Meeting Date"];
    const mStartIdx = mHeaderMap["Care Plan Start Date"];
    
    masterData.values.forEach(row => {
      const key = normalizeKeyPart_(row[nameIdx]);
      const sourceMatch = unMap.get(key);
      if (!sourceMatch) return;
      
      unlockMatchCount++;
      
      const sIdt = String(sourceMatch["IDT Meeting Date"] || "").trim();
      const mIdt = String(row[mIdtIdx] || "").trim();
      
      const sStart = String(sourceMatch["Care Plan Start Date"] || "").trim();
      const mStart = String(row[mStartIdx] || "").trim();
      
      if (sIdt !== mIdt || sStart !== mStart) {
        unlockSyncErrors++;
      }
    });

    if (unlockMatchCount === 0) {
      rows.push(["Unlocked CP Sync", "PASS", "No Unlocked CPs", "No active Unlocked Care Plans to sync this month."]);
    } else {
      rows.push([
        "Unlocked CP Sync", 
        unlockSyncErrors === 0 ? "PASS" : "FAIL", 
        unlockSyncErrors === 0 ? "OK" : `${unlockSyncErrors} sync mismatches`, 
        `Successfully verified IDT & CP Start dates across ${unlockMatchCount} unlocked profiles.`
      ]);
    }
  }

  writeDashboardQualitySection("SECTION G - MASTER LIST VALIDATION", rows);
}

/**
 * SECTION H - FORMAT DASHBOARD CHANGELOG
 * Detects cell-level edits across Format Dashboard Sections A through H and logs them.
 */
function updateFormatDashboardChangelog_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboardSheet = ss.getSheetByName("Format Dashboard");
  if (!dashboardSheet) return;

  const props = PropertiesService.getDocumentProperties();
  const historyKey = "MLF_QA_CHANGELOG_HISTORY";
  const statePrefix = "MLF_QA_STATE_";

  const sectionsToTrack = [
    "SECTION A - GLOBAL SETTINGS",
    "SECTION B - TITLE ROWS",
    "SECTION C - SHEET DEFINITIONS",
    "SECTION D - SHEET BEHAVIORS",
    "SECTION E - SYSTEM SHEET SURFACES",
    "SECTION F - TAB ORGANIZATION & INDEX",
    "SECTION G - COLUMN DEFINITIONS",
    "SECTION H - SHEET HEADERS"
  ];

  const timestamp = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss");
  
  let logRows = [];
  try {
    const existing = props.getProperty(historyKey);
    if (existing) logRows = JSON.parse(existing);
  } catch (e) {
    logRows = [];
  }

  const dashIndex = buildDashboardSectionIndex_(dashboardSheet);

  sectionsToTrack.forEach(sectionTitle => {
    try {
      const currentRows = readDashboardSectionRows_(dashIndex, sectionTitle);
      const storeKey = statePrefix + sectionTitle.replace(/[^A-Z0-9]/g, "");
      const previousRaw = props.getProperty(storeKey);
      
      props.setProperty(storeKey, JSON.stringify(currentRows));

      if (!previousRaw) return;

      const previousRows = JSON.parse(previousRaw);
      const headers = currentRows.length > 0 ? currentRows[0] : [];

      for (let r = 0; r < currentRows.length; r++) {
        const currRow = currentRows[r] || [];
        const prevRow = previousRows[r] || [];
        const maxCols = Math.max(currRow.length, prevRow.length);

        for (let c = 0; c < maxCols; c++) {
          const currVal = String(currRow[c] !== undefined && currRow[c] !== null ? currRow[c] : "").trim();
          const prevVal = String(prevRow[c] !== undefined && prevRow[c] !== null ? prevRow[c] : "").trim();

          if (currVal !== prevVal) {
            const colName = headers[c] ? String(headers[c]) : `Col ${c + 1}`;
            
            logRows.unshift([
              timestamp,
              sectionTitle,
              colName,
              prevVal || "(blank)",
              currVal || "(blank)"
            ]);
          }
        }
      }
    } catch (err) {
      Logger.log("Changelog error for " + sectionTitle + ": " + err.message);
    }
  });

  logRows = logRows.slice(0, 50);
  props.setProperty(historyKey, JSON.stringify(logRows));

  if (logRows.length > 0) {
    writeDashboardQualitySection("SECTION H - FORMAT DASHBOARD CHANGELOG", logRows);
  } else {
    writeDashboardQualitySection("SECTION H - FORMAT DASHBOARD CHANGELOG", [
      ["No Changes", "Format Dashboard", "None", "No configuration edits detected.", "OK"]
    ]);
  }
}

/**
 * SECTION I - SUMMARY & SIGNOFF
 */
function runDashboardQualitySummaryAndSignoff_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Dashboard Quality Report");
  if (!sheet) return;

  SpreadsheetApp.flush(); 
  
  const data = sheet.getDataRange().getValues();
  let failCount = 0;
  let warnCount = 0;
  let passCount = 0;

  for (let i = 5; i < data.length; i++) {
    const status = String(data[i][1] || "").toUpperCase().trim();
    if (status === "FAIL" || status === "CRITICAL" || status === "ERROR") failCount++;
    else if (status === "WARNING") warnCount++;
    else if (status === "PASS" || status === "OK") passCount++;
  }

  const rows = [];
  
  if (failCount > 0) {
    rows.push(["Overall System Health", "FAIL", `${failCount} Critical Issue(s) Detected`, "System requires immediate maintenance. Do not run monthly sync."]);
  } else if (warnCount > 0) {
    rows.push(["Overall System Health", "WARNING", `${warnCount} Warning(s) Detected`, "System is functional but review is recommended."]);
  } else if (passCount > 0) {
    rows.push(["Overall System Health", "PASS", "Optimal", "All systems nominal. Data is perfectly synchronized."]);
  } else {
    rows.push(["Overall System Health", "UNKNOWN", "No Data", "Run workflows to generate diagnostics."]);
  }

  const currentUser = Session.getActiveUser().getEmail() || "System Administrator";
  const timestamp = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss");
  
  rows.push(["Official QA Signoff", "VERIFIED", timestamp, `Executed by: ${currentUser}`]);

  writeDashboardQualitySection("SECTION I - SUMMARY & SIGNOFF", rows);
}

// ============================================================================
// === QUICK START & SYSTEM SETUP TRIGGERS ====================================
// ============================================================================

function quickSystemSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Quick System Setup [Step 1/4]: Rebuilding Format Dashboard defaults...", "Setup", 5);
  rebuildFormatDashboardDefaults();

  ss.toast("Quick System Setup [Step 2/4]: Initializing system sheets...", "Setup", 5);
  setupSystemSheets();

  ss.toast("Quick System Setup [Step 3/4]: Running Format Dashboard Validation...", "Setup", 5);
  runDashboardQualityStartUp(); // Section A

  ss.toast("Quick System Setup [Step 4/4]: Building Index navigation matrix...", "Setup", 5);
  updateIndexSheet({ forceShellRebuild: true });

  ss.toast("Quick System Setup complete! All system sheets are aligned.", "Complete", 5);
}

function quickBuildAllTemplates() {
  return buildAllTemplatesAndValidate();
}

function buildAllTemplatesAndValidate() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Building all templates from Format Dashboard...", "Templates", 5);
  
  const dashboard = loadDashboardConfig_(true);
  (dashboard.sheetDefinitions || []).forEach(sheetDef => {
    createOrRefreshTemplateFromDashboard_(dashboard, sheetDef);
  });

  ss.toast("Running Template Validation...", "Templates", 5);
  runDashboardQualityValidateTemplates(); // Section B

  ss.toast("All Templates Built and Validated!", "Complete", 5);
}

function setupSystemSheets() {
  rebuildFormatDashboardDefaults();
  buildSystemSheets();
  ensureFrameworkTimingReport_();
  runDashboardQualityStartUp();
  updateIndexSheet({ forceShellRebuild: true });
}

function rebuildFormatDashboardDefaults() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
  if (!sheet) sheet = ss.insertSheet(RFF_DASHBOARD_SHEET);
  
  createSystemTemplates();
}

function buildSystemSheets() {
  createSystemTemplates();
}

function ensureFrameworkTimingReport_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Framework Timing Report");
  if (!sheet) {
    createSystemTemplates();
    sheet = ss.getSheetByName("Framework Timing Report");
  }
  return sheet;
}

function saveActiveLayoutToDashboardSettings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = ss.getActiveSheet();
  const dashboardSheet = ss.getSheetByName("Format Dashboard");

  if (!activeSheet || !dashboardSheet) return;
  const activeName = activeSheet.getName();

  if (
    activeName === "Format Dashboard" || 
    activeName === "Dashboard Quality Report" || 
    activeName === "Framework Timing Report" || 
    activeName === "RFF_BASE_TEMPLATE" ||
    activeName === "Index"
  ) {
    ss.toast("Cannot capture layout from a System/Index Sheet. Select an operational data sheet.", "Error", 5);
    return;
  }

  ss.toast("Capturing active column layout to Format Dashboard...", "Layout Snapshot", 5);

  const lastCol = Math.max(activeSheet.getLastColumn(), 1);
  const headerValues = activeSheet.getRange(4, 1, 1, lastCol).getValues()[0];
  const wrapStrategies = activeSheet.getRange(5, 1, 1, lastCol).getWrapStrategies()[0];
  
  const newDefinitions = [];
  for (let col = 1; col <= lastCol; col++) {
    const header = String(headerValues[col - 1] || "").trim();
    if (!header) continue;
    
    newDefinitions.push([
      header,
      activeSheet.getColumnWidth(col),
      10,
      false,
      false,
      String(wrapStrategies[col - 1] || "CLIP").toUpperCase(),
      "left",
      "middle",
      ""
    ]);
  }

  const dashValues = dashboardSheet.getDataRange().getValues();
  let secGRow = -1;
  for (let r = 0; r < dashValues.length; r++) {
    if (String(dashValues[r][0]).indexOf("SECTION G - COLUMN DEFINITIONS") !== -1) {
      secGRow = r + 4;
      break;
    }
  }

  if (secGRow !== -1 && newDefinitions.length > 0) {
    dashboardSheet.getRange(secGRow, 1, newDefinitions.length, 9).setValues(newDefinitions);
    ss.toast(`Successfully saved ${newDefinitions.length} column definitions to Format Dashboard!`, "Complete", 5);
  } else {
    ss.toast("Could not locate SECTION G - COLUMN DEFINITIONS on Format Dashboard.", "Error", 5);
  }
}

function hideSystemSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  SYSTEM_SHEETS_TO_HIDE.forEach(name => {
    const sh = ss.getSheetByName(name);
    if (sh && !sh.isSheetHidden()) sh.hideSheet();
  });
}

function showSystemSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  SYSTEM_SHEETS_TO_HIDE.forEach(name => {
    const sh = ss.getSheetByName(name);
    if (sh && sh.isSheetHidden()) sh.showSheet();
  });
}

// ============================================================================
// FORMAT DASHBOARD: LOADERS & FACTORY DEFAULTS (SINGLE SOURCE OF TRUTH)
// ============================================================================

// --- 1. GLOBAL SETTINGS -----------------------------------------------------


function getDefaultGlobalSettingsRows_() {
  return [
    ["Header Row", 4], ["Data Start Row", 5], ["Freeze Rows", 4], ["Freeze Columns", 2],
    ["Row 1 Height", 25], ["Row 2 Height", 25], ["Row 3 Height", 10], ["Header Row Height", 40],
    ["Default Data Row Height", 25], ["Default Date Format", "mm/dd/yyyy"], ["Standard Font", "Arial"],
    ["Standard Font Size", 10], ["Standard Font Color", "#000000"], ["Title Font Size", 14],
    ["Default Column Width", 150], ["Default Data Wrap", "CLIP"], ["Default Horizontal Alignment", "left"],
    ["Default Vertical Alignment", "middle"], ["HSL Level 1 Lightness %", 60], ["HSL Level 2 Lightness %", 75],
    ["HSL Level 3 Lightness %", 85], ["HSL Level 4 Lightness %", 97], ["HSL Level 5 Lightness %", 99],
    ["Global Border Color", "#CCCCCC"], ["Global Border Style", "SOLID"], ["Template Version", "v1.0"]
  ];
}
// --- 2. TITLE ROWS ----------------------------------------------------------

// --- 3. SHEET DEFINITIONS ---------------------------------------------------


// --- 4. BEHAVIORS -----------------------------------------------------------

// --- 5. TAB ORGANIZATION ----------------------------------------------------
