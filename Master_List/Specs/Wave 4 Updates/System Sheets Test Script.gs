/**
 * Simple Trigger: Fires on direct user edits in Google Sheets
 * Recalculates Hex levels dynamically if HSL % settings or Base Colors change.
 */
function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  if (sheet.getName() !== "TEST Format Dashboard") return;

  const col = e.range.getColumn();
  if (col === 2 || col === 5 || col === 12) {
    recalculateDashboardHexCodes_(sheet);
  }
}

/**
 * Phase 2: Master Pipeline (Scope Fix & 6-Row Subheader Engine)
 */
function buildPureStructuralSystemSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Executing Aligned 6-Row Subheader Pipeline...", "Test Pipeline", 5);

  const overallStartTime = new Date();
  const timestampStr = "Last Update: " + Utilities.formatDate(overallStartTime, ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss");

  // Logger Class
  class PerformanceLogger {
    constructor() {
      this.startTime = new Date();
      this.lastStepTime = new Date();
      this.summaryLogs = [];
      this.issueLogs = [];
      this.recommendationLogs = [];
      this.detailedLogs = [];
    }

    logStep(process, step, severity = "INFO", details = "") {
      const now = new Date();
      const stepSec = (now.getTime() - this.lastStepTime.getTime()) / 1000;
      const totalSec = (now.getTime() - this.startTime.getTime()) / 1000;
      const timestampFormatted = Utilities.formatDate(now, ss.getSpreadsheetTimeZone(), "HH:mm:ss.SSS");

      this.detailedLogs.push([
        timestampFormatted, process, step, Number(stepSec.toFixed(3)), Number(totalSec.toFixed(3)), severity, details
      ]);
      this.lastStepTime = now;
    }

    addSummary(process, runtimeSec, status, benchmarkSec, notes) {
      this.summaryLogs.push([process, Number(runtimeSec.toFixed(3)), status, benchmarkSec, Number((runtimeSec - benchmarkSec).toFixed(3)), notes]);
    }

    addRecommendation(process, finding, impact, recommendation, priority, status) {
      this.recommendationLogs.push([process, finding, impact, recommendation, priority, status]);
    }
  }

  const perfLogger = new PerformanceLogger();
  perfLogger.logStep("INITIALIZATION", "Pipeline Start", "INFO", "Started tracking");

  function getOrCreateCleanSheet_(name) {
    let sheet = ss.getSheetByName(name);
    if (sheet) ss.deleteSheet(sheet);
    return ss.insertSheet(name);
  }

  function createTemplateFromBase_(targetName) {
    const existing = ss.getSheetByName(targetName);
    if (existing) ss.deleteSheet(existing);
    const template = ss.getSheetByName("RFF_BASE_TEMPLATE");
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

  // =========================================================================
  // STEP 2: SPAWN "TEST Format Dashboard"
  // =========================================================================
  const dashboardSheet = createTemplateFromBase_("TEST Format Dashboard");
  const dashRows = [
    ["Format Dashboard", "- v1.8.9.8.4 -", "", ""],
    ["Date Created", overallStartTime, "", ""],
    [], [], 
    [],                             // Subheader Row 1: Buffer Row above SECTION A
    ["SECTION A - GLOBAL SETTINGS"], // Subheader Row 2: Title Banner
    [],                             // Subheader Row 3: Visual Spacer (10px)
    ["Setting", "Value", "Options"], // Subheader Row 4: Primary Column Headers (25px)
    [],                             // Subheader Row 5: Buffer Row below headers
    ["Header Row", 4, "Numeric row number (e.g., 4)"], // Subheader Row 6: First Data Entry Row
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
    ["HSL Level 5 Lightness %", 97, "Alternating Row Color 2"],
    
    [], ["SECTION B - TITLE ROWS"], [],
    ["Sheet Type", "Row", "Purpose", "Value Source", "Label", "Target Cell", "Height", "Font Size", "Font Weight", "Fill Level", "Alignment", "Wrap", "Notes"], [],
    ["GLOBAL", 1, "Report Title", "Sheet Definition", "", "A1", 25, 14, "Bold", "Level 3", "Left", "Overflow", "Default title row"],
    ["GLOBAL", 2, "Date Range", "Runtime Month", "Date Created", "A2:B2", 20, 10, "Normal", "Level 3", "Left", "Overflow", "A2=Date Created, B2=start"],
    ["GLOBAL", 3, "Spacer", "None", "", "A3:D3", 10, 10, "Normal", "Level 1", "Left", "Clip", "Spacer row"],
    ["GLOBAL", 4, "Header Row", "Dashboard Headers", "", "Row 4", 25, 10, "Bold", "Level 2", "Left", "Wrap", "Governed header row"],
    
    [], ["SECTION B2 - SUBHEADER ROWS"], [],
    ["Sheet Type", "Row", "Purpose", "Target Cell", "Height", "Font Size", "Font Weight", "Fill Level", "Wrap", "Notes"], [],
    ["GLOBAL", 1, "Intentional Blank", "", 25, 10, "Normal", "None", "Clip", "Blank buffer above section title"],
    ["GLOBAL", 2, "Section Header Title", "A", 25, 14, "Bold", "Level 3", "Overflow", "Section title banner"],
    ["GLOBAL", 2, "Section Header Timestamp Note", "C", 25, 10, "Italic", "Level 3", "Overflow", "Last update timestamp"],
    ["GLOBAL", 3, "Spacer Row", "", 10, 10, "Normal", "Level 1", "Clip", "Spacer row below section title"],
    ["GLOBAL", 4, "Header Row", "Primary Headers", "FIT_TO_DATA", 25, "Bold", "Level 2", "Wrap", "Governed column headers"],
    ["GLOBAL", 5, "Intentional Blank", "", 25, 10, "Normal", "None", "Clip", "Blank buffer right below headers"],
    ["GLOBAL", 6, "Enter Data Here", "Data Rows", 25, 10, "Normal", "Level 4/5", "Clip", "First data entry point"],
    
    [], ["SECTION C - SHEET DEFINITIONS"], [],
    ["Sheet Type", "Report Title", "Template Name", "Output Naming Pattern", "Base Color", "Level 1 Hex", "Level 2 Hex", "Level 3 Hex", "Level 4 Hex", "Level 5 Hex", "Use Prompt Date", "End Date Source", "Template Row Count", "Template Column Count", "Template Row Mode", "Minimum Rows", "Buffer Rows"], [],
    ["Banners", "Banner Report", "Template - Banner Report", "Banners mm.yy", "#65A9CC", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 9, "FIXED", 100, 25],
    ["CP Due Date", "Care Plan Due Date Report", "Template - Care Plan Due", "CP Due mm.yy", "#65CC99", "", "", "", "", "", true, "Pulled From Spreadsheet", 100, 5, "FIXED", 100, 25],
    ["Unlock CP", "Unlocked Care Plan Report", "Template - Unlocked Care Plan", "Unlock CP mm.yy", "#65CCC3", "", "", "", "", "", true, "Pulled From Spreadsheet", 100, 4, "FIXED", 100, 25],
    ["Raw Data", "Raw Data", "Template - Raw Data", "Raw Data mm.yy", "#657FCC", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 54, "FIXED", 100, 25],
    ["Refined Data", "Refined Data", "Template - Refined Data", "Refined Data", "#657FCC", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 80, "FIXED", 100, 25],
    ["Disenrolled Exclusion", "Disenrolled Exclusion", "Template - Disenrolled Exclusion", "Disenrolled", "#CC65A1", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 66, "FIXED", 100, 25],
    ["Master List", "Master List", "Template - Master List", "Master List mm.yy", "#7665CC", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 37, "FIXED", 100, 25],
    ["Monthly Change", "Monthly Change Report", "Template - Monthly Change", "Monthly Change mm.yy", "#A165CC", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 54, "FIXED", 100, 25],
    
    [], ["SECTION D - SHEET BEHAVIORS"], [],
    ["Sheet Type", "Uses Title Rows", "Uses Filter", "Uses Alternating Colors", "Uses Subheaders", "Hidden Template", "Output Visibility"], [],
    ["Banners", true, true, true, false, true, "HIDDEN"],
    ["CP Due Date", true, true, true, false, true, "HIDDEN"],
    ["Unlock CP", true, true, true, false, true, "HIDDEN"],
    ["Raw Data", true, true, true, false, true, "HIDDEN"],
    ["Refined Data", true, true, true, false, true, "VISIBLE"],
    ["Disenrolled Exclusion", true, true, true, false, true, "VISIBLE"],
    ["Master List", true, true, true, false, true, "VISIBLE"],
    ["Monthly Change", true, true, false, true, true, "VISIBLE"],
    
    [], ["SECTION E - SYSTEM SHEET SURFACES"], [],
    ["System Sheet Name", "Display Name", "Sort Order", "Uses Title Rows", "Uses Filter", "Uses Alternating Colors", "Uses Subheaders", "Hidden Template", "Output Visibility", "Default Column Widths", "Column Count", "Base Color", "Level 1 Hex", "Level 2 Hex", "Level 3 Hex", "Level 4 Hex", "Level 5 Hex", "Title Font Color", "Notes"], [],
    ["Framework Timing Report", "Framework Timing Report", 500, true, false, true, false, false, "VISIBLE", "FIT_TO_DATA", 8, "#79B5D2", "", "", "", "", "", "#000000", "Unified timing surface"],
    ["Dashboard Quality Report", "Dashboard Quality Report", 501, true, false, true, false, false, "VISIBLE", "FIT_TO_DATA", 5, "#79B5D2", "", "", "", "", "", "#000000", "Unified quality surface"],
    ["Format Dashboard", "Format Dashboard", 502, true, false, true, false, false, "VISIBLE", "FIT_TO_DATA", 19, "#79B5D2", "", "", "", "", "", "#000000", "Dashboard surface"]
  ];

  dashboardSheet.getRange(1, 1, dashRows.length, 19).setValues(
    dashRows.map(r => {
      const out = r.slice(0, 19);
      while (out.length < 19) out.push("");
      return out;
    })
  );

  // Initial Calculation of Dashboard Hex Codes
  recalculateDashboardHexCodes_(dashboardSheet);

  // Apply Subheader & Title formatting
  applySystemStructure_(dashboardSheet, 19, [], "Format Dashboard", timestampStr);

  // =========================================================================
  // STEP 4: SPAWN OTHER SYSTEM SURFACES
  // =========================================================================
  const frameworkTimingSheet = createTemplateFromBase_("TEST Framework Timing Report");
  const frameworkTimingRows = [
    ["Framework Timing Report", "- v1.8.9.8.4 -", "", ""],
    ["Date Created", overallStartTime, "", ""],
    [], [],
    [], ["SECTION A - PROCESS SUMMARY"], [], ["Process", "Runtime (Sec)", "Status", "Benchmark", "Variance", "Notes"], [], ["Enter Data here"],
    [], ["SECTION B - PERFORMANCE ISSUES"], [], ["Priority", "Process", "Runtime (Sec)", "Threshold", "Issue", "Recommendation"], [], ["Enter Data here"],
    [], ["SECTION C - OPTIMIZATION RECOMMENDATIONS"], [], ["Process", "Finding", "Impact", "Recommendation", "Priority", "Status"], [], ["Enter Data here"],
    [], ["SECTION D - DETAILED TIMING LOG"], [], ["Timestamp", "Process", "Step", "Step Seconds", "Total Seconds", "Severity", "Details"], [], ["Enter Data here"]
  ];
  applySystemStructure_(frameworkTimingSheet, 8, frameworkTimingRows, "Framework Timing Report", timestampStr);

  let testTimingSheet = ss.getSheetByName("TEST Timing");
  if (!testTimingSheet) {
    testTimingSheet = createTemplateFromBase_("TEST Timing");
    const initialTimingRows = [
      ["Framework Timing Report", "- v1.8.9.8.4 -", "", "", "", "", "", ""],
      ["Date Created", overallStartTime, "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["Timestamp", "Process", "Step", "Step Seconds", "Total Seconds", "Severity", "Details", ""]
    ];
    testTimingSheet.getRange(1, 1, 4, 8).setValues(initialTimingRows);
  }
  applySystemStructure_(testTimingSheet, 7, [], "Framework Timing Report", timestampStr);

  const qualitySheet = createTemplateFromBase_("TEST Dashboard Quality Report");
  const qualityRows = [
    ["Dashboard Quality Report", "- v1.8.9.8.4 -", "", ""],
    ["Date Created", overallStartTime, "", ""],
    [], [],
    [], ["SECTION A - GLOBAL INPUTS VERIFICATION"], [], ["Setting", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION B - SHEET DEFINITIONS VERIFICATION"], [], ["Sheet", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION C - SHEET BEHAVIOR VERIFICATION"], [], ["Behavior", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION D - COLUMN DEFINITIONS VERIFICATION"], [], ["Column", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION E - SHEET HEADERS VERIFICATION"], [], ["Header", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION F - TAB ORGANIZATION & INDEX VERIFICATION"], [], ["Tab Organization", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION G - TEMPLATE STRUCTURE & VALIDATION"], [], ["Template", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION H - FORMAT DASHBOARD CHANGELOG"], [], ["Timestamp", "Section Changed", "Column Changed", "Previous Value", "New Value"], [], ["Enter Data here"],
    [], ["SECTION I - FRAMEWORK HEALTH CHECK"], [], ["Health Check", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION J - PERFORMANCE SUMMARY"], [], ["Process", "Runtime", "Status", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION K - RAW DATA VALIDATION"], [], ["Validation Item", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION L - CARE PLAN SYNC VALIDATION"], [], ["Diagnostic", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION M - WORKFLOW & SYNCHRONIZATION VERIFICATION"], [], ["Sync Check", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION N - DEMO P QUALITY VALIDATION"], [], ["Check Item", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION O - DISENROLLED EXCLUSION VALIDATION"], [], ["Audit Item", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION P - MONTHLY CHANGE VALIDATION"], [], ["Layout Item", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION Q - SUMMARY"], [], ["Metric", "Value", "Status", "Quality Notes"], [], ["Enter Data here"],
    [], ["SECTION R - SIGNOFF"], [], ["Audit Item", "Status", "Issue", "Quality Notes"], [], ["Enter Data here"]
  ];
  applySystemStructure_(qualitySheet, 6, qualityRows, "Dashboard Quality Report", timestampStr);

  // Log append to TEST Timing
  perfLogger.logStep("COMPLETION", "Pipeline Complete", "INFO", "Subheaders aligned to 6-row offset.");
  appendDetailedLogsContinuous_(testTimingSheet, perfLogger.detailedLogs);

  ss.toast("Pipeline complete! 6-row subheader block mapped cleanly across all surfaces.", "Complete", 5);
}

// =========================================================================
// RECALCULATE HEX CODES ENGINE
// =========================================================================
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
        dashboardSheet.getRange(r + 1, 6, 1, 5).setValues([[theme.level1, theme.level2, theme.level3, theme.level4, theme.level5]]);
      } else if (sheetType.indexOf("SECTION ") !== -1) break;
    }
  }

  if (secERow !== -1) {
    for (let r = secERow + 2; r < rawDashData.length; r++) {
      const name = String(rawDashData[r][0] || "").trim();
      if (name && name.indexOf("SECTION ") === -1) {
        const baseHex = String(rawDashData[r][11] || "#79B5D2").trim();
        const theme = calculateThemeLevels_(baseHex, hslPercents);
        dashboardSheet.getRange(r + 1, 13, 1, 5).setValues([[theme.level1, theme.level2, theme.level3, theme.level4, theme.level5]]);
      } else if (name.indexOf("SECTION ") !== -1) break;
    }
  }
}

// Color Utility Helpers
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
  const dashboardSheet = ss.getSheetByName("TEST Format Dashboard");
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
      if (name === targetSheetName || (targetSheetName === "TEST Timing" && name === "Framework Timing Report")) {
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

// =========================================================================
// STRUCTURE & GEOMETRY PAINTER
// =========================================================================
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

  // Top Frozen Title Block (Rows 1-4)
  sheet.getRange(1, 1, 1, maxCols).setFontSize(14).setFontWeight("bold").setBackground(theme.level3);
  sheet.getRange(2, 1, 1, maxCols).setFontSize(10).setFontWeight("normal").setBackground(theme.level3);
  sheet.getRange(3, 1, 1, maxCols).setFontSize(10).setFontWeight("normal").setBackground(theme.level1);
  sheet.getRange(4, 1, 1, maxCols).setFontSize(10).setFontWeight("bold").setBackground(theme.level2);

  // Native Banding from Row 5 Down
  applyNativeBandingSafe_(sheet, 5, maxCols, totalRows, theme.level4, theme.level5);

  // Format Subheader Sections dynamically
  const values = sheet.getDataRange().getValues();
  for (let r = 0; r < values.length; r++) {
    const cellVal = String(values[r][0] || "").trim().toUpperCase();

    if (cellVal.indexOf("SECTION ") === 0) {
      const titleSheetRow  = r + 1; // Subheader Row 2
      const spacerSheetRow = r + 2; // Subheader Row 3
      const headerSheetRow = r + 3; // Subheader Row 4

      // Subheader Title Banner (Bold 14pt + Level 3 Fill)
      sheet.getRange(titleSheetRow, 1, 1, maxCols)
        .setFontWeight("bold")
        .setFontSize(14)
        .setBackground(theme.level3);

      // Subheader Visual Spacer (Level 1 Fill)
      sheet.getRange(spacerSheetRow, 1, 1, maxCols)
        .setBackground(theme.level1);

      // Subheader Timestamp in Column C (Col 3)
      if (sheet.getName() !== "TEST Format Dashboard" && maxCols >= 3 && timestampStr) {
        sheet.getRange(titleSheetRow, 3)
          .setValue(timestampStr)
          .setFontWeight("normal")
          .setFontStyle("italic")
          .setFontSize(10);
      }

      // Primary Section Column Headers (Bold 8pt + Level 2 Fill)
      if (headerSheetRow <= sheet.getMaxRows()) {
        sheet.getRange(headerSheetRow, 1, 1, maxCols)
          .setFontWeight("bold")
          .setFontSize(8)
          .setBackground(theme.level2);
      }
    }
  }

  for (let c = 1; c <= maxCols; c++) sheet.autoResizeColumn(c);

  // Explicit Height Governance
  enforceSystemRowHeights_(sheet);
}

function enforceSystemRowHeights_(sheet) {
  // Frozen Top Header Block
  sheet.setRowHeight(1, 25);
  sheet.setRowHeight(2, 20);
  sheet.setRowHeight(3, 10); // Frozen Top Visual Spacer -> STRICT 10PX
  sheet.setRowHeight(4, 25); // Primary Top Header Row -> STRICT 25PX

  const values = sheet.getDataRange().getValues();
  for (let r = 0; r < values.length; r++) {
    const cellVal = String(values[r][0] || "").trim().toUpperCase();

    if (cellVal.indexOf("SECTION ") === 0) {
      const bufferTopRow   = r;     // Subheader Row 1 (Buffer above) -> 25px
      const titleSheetRow  = r + 1; // Subheader Row 2 (Title Banner) -> 25px
      const spacerSheetRow = r + 2; // Subheader Row 3 (Visual Spacer) -> STRICT 10PX
      const headerSheetRow = r + 3; // Subheader Row 4 (Column Headers) -> STRICT 25PX
      const bufferBotRow   = r + 4; // Subheader Row 5 (Buffer below) -> 25px

      if (bufferTopRow > 0) sheet.setRowHeight(bufferTopRow, 25);
      sheet.setRowHeight(titleSheetRow, 25);
      sheet.setRowHeight(spacerSheetRow, 10); // Visual Spacer STRICT 10PX
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

function appendDetailedLogsContinuous_(sheet, logsArray) {
  if (!logsArray || logsArray.length === 0) return;
  const lastRow = Math.max(sheet.getLastRow(), 4);
  const startAppendRow = lastRow + 1;
  const neededRows = startAppendRow + logsArray.length - 1;
  if (sheet.getMaxRows() < neededRows) {
    sheet.insertRowsAfter(sheet.getMaxRows(), neededRows - sheet.getMaxRows());
  }
  sheet.getRange(startAppendRow, 1, logsArray.length, 7).setValues(logsArray);
}
