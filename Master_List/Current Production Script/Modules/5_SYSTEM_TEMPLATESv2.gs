// ============================================================================
// 5_SYSTEM_TEMPLATES.GS
// Base Template Stamping, HSL Color Theme Engine, System Structure Painter,
// & Streamlined Framework Timing Engine
// ============================================================================

// ============================================================================
// STREAMLINED FRAMEWORK TIMING ENGINE (2 FUNCTIONS)
// ============================================================================

let ML_TIMING_CACHE_ = { startTime: null, lastStepTime: null, logs: [] };

/**
 * 1. LOG TIMING STEP (Collector)
 * Handles auto-initialization, step delta calculations, and log caching in memory.
 */
function logFrameworkTiming_(process, step, severity = "INFO", details = "") {
  const now = new Date();
  
  if (!ML_TIMING_CACHE_.startTime) {
    ML_TIMING_CACHE_.startTime = now;
    ML_TIMING_CACHE_.lastStepTime = now;
  }
  
  const stepSec = (now.getTime() - ML_TIMING_CACHE_.lastStepTime.getTime()) / 1000;
  const totalSec = (now.getTime() - ML_TIMING_CACHE_.startTime.getTime()) / 1000;
  const timestampStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "HH:mm:ss.SSS");

  ML_TIMING_CACHE_.logs.push([
    timestampStr,
    process,
    step,
    Number(stepSec.toFixed(3)),
    Number(totalSec.toFixed(3)),
    severity,
    details
  ]);

  ML_TIMING_CACHE_.lastStepTime = now;
}

/**
 * 2. FLUSH TIMING REPORT (Writer)
 * Writes all cached timing logs directly into the Framework Timing surface in 1 batch.
 */
function flushFrameworkTimingReport_() {
  if (!ML_TIMING_CACHE_.logs || ML_TIMING_CACHE_.logs.length === 0) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Template - Framework Timing Report") || ss.getSheetByName("Framework Timing Report");
  if (!sheet) return;

  const values = sheet.getDataRange().getValues();
  let anchorRow = -1;
  for (let r = 0; r < values.length; r++) {
    if (String(values[r][0] || "").toUpperCase().indexOf("SECTION D") !== -1) {
      anchorRow = r + 1;
      break;
    }
  }

  const startRow = anchorRow !== -1 ? anchorRow + 4 : Math.max(sheet.getLastRow() + 1, 5);
  const totalNeededRows = startRow + ML_TIMING_CACHE_.logs.length - 1;

  if (sheet.getMaxRows() < totalNeededRows) {
    sheet.insertRowsAfter(sheet.getMaxRows(), totalNeededRows - sheet.getMaxRows());
  }

  sheet.getRange(startRow, 1, ML_TIMING_CACHE_.logs.length, 7).setValues(ML_TIMING_CACHE_.logs);

  ML_TIMING_CACHE_ = { startTime: null, lastStepTime: null, logs: [] };
}

/**
 * Menu Callback: Clear Diagnostics & Timing Logs
 */
function clearDiagnosticsAndTimingLogs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Template - Framework Timing Report") || ss.getSheetByName("Framework Timing Report");
  
  if (sheet) {
    const values = sheet.getDataRange().getValues();
    let anchorRow = -1;
    for (let r = 0; r < values.length; r++) {
      if (String(values[r][0] || "").toUpperCase().indexOf("SECTION D") !== -1) {
        anchorRow = r + 1;
        break;
      }
    }

    if (anchorRow !== -1) {
      const startRow = anchorRow + 4;
      const rowsToClear = Math.max(sheet.getLastRow() - startRow + 1, 20);
      if (rowsToClear > 0) {
        sheet.getRange(startRow, 1, rowsToClear, 7).clearContent().setBackground(null);
      }
    }
  }

  ML_TIMING_CACHE_ = { startTime: null, lastStepTime: null, logs: [] };
  ss.toast("Diagnostics & Timing logs cleared.", "Timing Engine", 3);
}

// ============================================================================
// SYSTEM SURFACE TEMPLATE BUILDER
// ============================================================================

/**
 * Destructively rebuilds the Core System Surface Templates from the RFF_BASE_TEMPLATE mold.
 */
function createSystemTemplates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Stamping System Surface Templates from Base Template...", "Building", 5);

  logFrameworkTiming_("CREATE_SYSTEM_TEMPLATES", "Start Stamping", "INFO", "Beginning surface build");

  const timestampStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss");

  function getOrCreateCleanSheet_(name) {
    let sheet = ss.getSheetByName(name);
    if (sheet) ss.deleteSheet(sheet);
    return ss.insertSheet(name);
  }

  function createTemplateFromBase_(targetName) {
    const existing = ss.getSheetByName(targetName);
    if (existing) ss.deleteSheet(existing);
    const template = ss.getSheetByName("RFF_BASE_TEMPLATE");
    if (!template) throw new Error("RFF_BASE_TEMPLATE is missing. Cannot build system template sheets.");
    
    const newSheet = template.copyTo(ss);
    newSheet.setName(targetName);
    newSheet.showSheet();
    return newSheet;
  }

  // =========================================================================
  // STEP 1: CREATE CLEAN "RFF_BASE_TEMPLATE"
  // =========================================================================
  const baseTemplate = getOrCreateCleanSheet_("RFF_BASE_TEMPLATE");
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
  logFrameworkTiming_("CREATE_SYSTEM_TEMPLATES", "RFF_BASE_TEMPLATE Built", "INFO", "Baseline frozen block ready");

  // =========================================================================
  // STEP 2: BUILD "Default - Format Dashboard"
  // =========================================================================
  const dashboardSheet = createTemplateFromBase_("Default - Format Dashboard");
  const dashWidth = 19;
  const dashRows = [];

  const titleRow = new Array(dashWidth).fill("");
  titleRow[0] = "Format Dashboard"; titleRow[1] = "- v1.8.9.8.4 -"; 
  dashRows.push(titleRow);

  const dateRow = new Array(dashWidth).fill("");
  dateRow[0] = "Date Created"; dateRow[1] = timestampStr;
  dashRows.push(dateRow);

  dashRows.push(new Array(dashWidth).fill(""));
  dashRows.push(new Array(dashWidth).fill(""));

  // Append Dashboard Subheader Sections
  appendDashboardSectionRows_(dashRows, "SECTION A - GLOBAL SETTINGS", ["Setting", "Value", "Options"], getDefaultGlobalSettingsRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION B - TITLE ROWS", ["Sheet Type", "Row", "Purpose", "Value Source", "Label", "Target Cell", "Height", "Font Size", "Font Weight", "Fill Level", "Alignment", "Wrap", "Notes"], getDefaultTitleRowRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION B2 - SUBHEADER ROWS", ["Sheet Type", "Row", "Purpose", "Target Cell", "Height", "Font Size", "Font Weight", "Fill Level", "Wrap", "Notes"], getDefaultSubheaderRowRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION C - SHEET DEFINITIONS", ["Sheet Type", "Report Title", "Template Name", "Output Naming Pattern", "Base Color", "Level 1 Hex", "Level 2 Hex", "Level 3 Hex", "Level 4 Hex", "Level 5 Hex", "Use Prompt Date", "End Date Source", "Template Row Count", "Template Column Count", "Template Row Mode", "Minimum Rows", "Buffer Rows"], getDefaultSheetDefinitionRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION D - SHEET BEHAVIORS", ["Sheet Type", "Uses Title Rows", "Uses Filter", "Uses Alternating Colors", "Uses Subheaders", "Hidden Template", "Output Visibility"], getDefaultBehaviorRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION E - SYSTEM SHEET SURFACES", ["System Sheet Name", "Display Name", "Sort Order", "Uses Title Rows", "Uses Filter", "Uses Alternating Colors", "Uses Subheaders", "Hidden Template", "Output Visibility", "Default Column Widths", "Column Count", "Base Color", "Level 1 Hex", "Level 2 Hex", "Level 3 Hex", "Level 4 Hex", "Level 5 Hex", "Title Font Color", "Notes"], getDefaultSystemSurfaceRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION F - TAB ORGANIZATION & INDEX", ["Sheet Name / Prefix", "Group", "Rank / Range", "Special"], getDefaultTabOrganizationRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION G - COLUMN DEFINITIONS", ["Header", "Width", "Header Font Size", "Date Column", "Hide Column", "Data Wrap", "Horizontal Alignment", "Vertical Alignment", "Number Format"], getDefaultColumnDefinitionRows_(), dashWidth);
  appendDashboardSectionRows_(dashRows, "SECTION H - SHEET HEADERS", ["Sheet Type", "Column Order", "Header", "Source of Data"], getDefaultSheetHeaderRows_(), dashWidth);

  dashboardSheet.getRange(1, 1, dashRows.length, dashWidth).setValues(dashRows);

  recalculateDashboardHexCodes_(dashboardSheet);
  applySystemStructure_(dashboardSheet, dashWidth, [], "Default - Format Dashboard", timestampStr);
  logFrameworkTiming_("CREATE_SYSTEM_TEMPLATES", "Default - Format Dashboard Built", "INFO", "Defaults populated & structure painted");

  // =========================================================================
  // STEP 3: BUILD "Template - Framework Timing Report"
  // =========================================================================
  const frameworkTimingSheet = createTemplateFromBase_("Template - Framework Timing Report");
  const frameworkTimingRows = [
    ["Framework Timing Report", "- v1.8.9.8.4 -", "", ""],
    ["Date Created", timestampStr, "", ""],
    [], [],
    [], ["SECTION A - PROCESS SUMMARY"], [], ["Process", "Runtime (Sec)", "Status", "Benchmark", "Variance", "Notes"], [], ["Enter Data here"],
    [], ["SECTION B - PERFORMANCE ISSUES"], [], ["Priority", "Process", "Runtime (Sec)", "Threshold", "Issue", "Recommendation"], [], ["Enter Data here"],
    [], ["SECTION C - OPTIMIZATION RECOMMENDATIONS"], [], ["Process", "Finding", "Impact", "Recommendation", "Priority", "Status"], [], ["Enter Data here"],
    [], ["SECTION D - DETAILED TIMING LOG"], [], ["Timestamp", "Process", "Step", "Step Seconds", "Total Seconds", "Severity", "Details"], [], ["Enter Data here"]
  ];
  applySystemStructure_(frameworkTimingSheet, 8, frameworkTimingRows, "Template - Framework Timing Report", timestampStr);
  logFrameworkTiming_("CREATE_SYSTEM_TEMPLATES", "Template - Framework Timing Report Built", "INFO", "Timing template ready");

  // =========================================================================
  // STEP 4: BUILD "Template - Dashboard Quality Report"
  // =========================================================================
  const qualitySheet = createTemplateFromBase_("Template - Dashboard Quality Report");
  const qualityRows = [
    ["Dashboard Quality Report", "- v1.8.9.8.4 -", "", ""],
    ["Date Created", timestampStr, "", ""],
    [], [],
    [], ["SECTION A - FORMAT DASHBOARD VALIDATION"], [], ["Dashboard Section", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION B - TEMPLATE VALIDATION"], [], ["Template / Sheet Name", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION C - RAW DATA VALIDATION"], [], ["Validation Item", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION D - DEMO P QUALITY VALIDATION"], [], ["Check Item", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION E - DISENROLLED EXCLUSION VALIDATION"], [], ["Audit Item", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION F - MONTHLY CHANGE VALIDATION"], [], ["Layout Item", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION G - MASTER LIST VALIDATION"], [], ["Audit Item", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION H - SUMMARY"], [], ["Metric / Action", "Result", "Notes", "Signoff Details"], [], ["Enter Data here"]
  ];
  applySystemStructure_(qualitySheet, 7, qualityRows, "Template - Dashboard Quality Report", timestampStr);
  logFrameworkTiming_("CREATE_SYSTEM_TEMPLATES", "Template - Dashboard Quality Report Built", "INFO", "Quality template ready");

  // =========================================================================
  // STEP 5: BUILD "Template - Index"
  // =========================================================================
  updateIndexSheet("Template - Index");
  logFrameworkTiming_("CREATE_SYSTEM_TEMPLATES", "Template - Index Built", "INFO", "Index template ready");

  flushFrameworkTimingReport_();
  ss.toast("System Surface Templates created from Base Template!", "Complete", 5);
}

// ============================================================================
// RECALCULATE HEX CODES ENGINE (OPTION B: Plain Text Values, Clear Notes)
// ============================================================================

function recalculateDashboardHexCodes_(dashboardSheet) {
  if (!dashboardSheet) return;

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

  // Section C: Report Definitions
  if (secCRow !== -1) {
    for (let r = secCRow + 2; r < rawDashData.length; r++) {
      const sheetType = String(rawDashData[r][0] || "").trim();
      if (sheetType && sheetType.indexOf("SECTION ") === -1) {
        const baseHex = String(rawDashData[r][4] || "#66AACC").trim();
        const theme = calculateThemeLevels_(baseHex, hslPercents);
        const targetRange = dashboardSheet.getRange(r + 1, 6, 1, 5);
        targetRange.clearNote();
        targetRange.setValues([[theme.level1, theme.level2, theme.level3, theme.level4, theme.level5]]);
      } else if (sheetType.indexOf("SECTION ") !== -1) break;
    }
  }

  // Section E: System Sheet Surfaces
  if (secERow !== -1) {
    for (let r = secERow + 2; r < rawDashData.length; r++) {
      const name = String(rawDashData[r][0] || "").trim();
      if (name && name.indexOf("SECTION ") === -1) {
        const baseHex = String(rawDashData[r][11] || "#79B5D2").trim();
        const theme = calculateThemeLevels_(baseHex, hslPercents);
        const targetRange = dashboardSheet.getRange(r + 1, 13, 1, 5);
        targetRange.clearNote();
        targetRange.setValues([[theme.level1, theme.level2, theme.level3, theme.level4, theme.level5]]);
      } else if (name.indexOf("SECTION ") !== -1) break;
    }
  }
}

// ============================================================================
// HSL COLOR LEVEL CALCULATOR HELPERS
// ============================================================================

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
  const dashboardSheet = ss.getSheetByName("Default - Format Dashboard") || ss.getSheetByName("Format Dashboard");
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
      if (name === targetSheetName || (targetSheetName.indexOf("Framework Timing Report") !== -1 && name.indexOf("Framework Timing Report") !== -1)) {
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
// GEOMETRY & STRUCTURE PAINTER
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

  // Top Frozen Block
  sheet.getRange(1, 1, 1, maxCols).setFontSize(14).setFontWeight("bold").setBackground(theme.level3);
  sheet.getRange(2, 1, 1, maxCols).setFontSize(10).setFontWeight("normal").setBackground(theme.level3);
  sheet.getRange(3, 1, 1, maxCols).setFontSize(10).setFontWeight("normal").setBackground(theme.level1);
  sheet.getRange(4, 1, 1, maxCols).setFontSize(10).setFontWeight("bold").setBackground(theme.level2);

  // Native Banding from Row 5 Down
  applyNativeBandingSafe_(sheet, 5, maxCols, totalRows, theme.level4, theme.level5);

  // Dynamic Subheader Formatting
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

      if (sheet.getName().indexOf("Format Dashboard") === -1 && maxCols >= 3 && timestampStr) {
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
  sheet.setRowHeight(1, 25);
  sheet.setRowHeight(2, 20);
  sheet.setRowHeight(3, 10);
  sheet.setRowHeight(4, 25);

  const values = sheet.getDataRange().getValues();
  for (let r = 0; r < values.length; r++) {
    const cellVal = String(values[r][0] || "").trim().toUpperCase();

    if (cellVal.indexOf("SECTION ") === 0) {
      const bufferTopRow   = r;
      const titleSheetRow  = r + 1;
      const spacerSheetRow = r + 2;
      const headerSheetRow = r + 3;
      const bufferBotRow   = r + 4;

      if (bufferTopRow > 0) sheet.setRowHeight(bufferTopRow, 25);
      sheet.setRowHeight(titleSheetRow, 25);
      sheet.setRowHeight(spacerSheetRow, 10);
      if (headerSheetRow <= sheet.getMaxRows()) sheet.setRowHeight(headerSheetRow, 25);
      if (bufferBotRow <= sheet.getMaxRows()) sheet.setRowHeight(bufferBotRow, 25);
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

