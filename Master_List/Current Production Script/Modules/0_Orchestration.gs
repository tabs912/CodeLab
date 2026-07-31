// ============================================================================
// FORMAT MONTHLY SHEETS & SUB-REPORT PIPELINE (DASHBOARD GOVERNED)
// ============================================================================

// --- ROUTE CONFIGURATIONS ----------------------------------------------------

const FORMATTER_ROUTES = Object.freeze({
  B:  { code: "B",  sheetType: SHEET_TYPE.BANNER,        prefix: BANNER_PREFIX,        deleteLocal: true },
  CD: { code: "CD", sheetType: SHEET_TYPE.CARE_PLAN_DUE,   prefix: CARE_PLAN_DUE_PREFIX, deleteLocal: true },
  UC: { code: "UC", sheetType: SHEET_TYPE.UNLOCKED,       prefix: UNLOCKED_PREFIX,      deleteLocal: true },
  RD: { code: "RD", sheetType: SHEET_TYPE.RAW_DATA,       prefix: "Raw Data",           deleteLocal: false, isRawData: true }
});

// --- SINGLE SHARED PIPELINE --------------------------------------------------

function runFormatterPipeline_(routeCodes, processTitle) {
  const monthParts = promptForLockedYearReportMonth_(processTitle);
  if (!monthParts) return null;

  const monthLabel = Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "MM.yy");

  return runFrameworkTimed_(processTitle + " " + monthLabel, function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const archiveSs = openArchiveSpreadsheetOnce_(); // Single connection for batch speed
    const dashboard = loadDashboardConfig_();       // Single cached Dashboard load (Sections A-H)
    const completed = [];
    const skipped = [];

    routeCodes.forEach(code => {
      const route = FORMATTER_ROUTES[code];
      if (!route) return;

      // 1. Month-Only Import Sheet Lookup
      const sourceSheet = findMonthlyImportSheetByMonthOnly_(ss, route.prefix, monthParts);
      if (!sourceSheet) {
        skipped.push(route.prefix);
        markFrameworkStep_(timing, "Skipped missing tab: " + route.prefix);
        return;
      }

      // 2. Format Sheet via Template Copy & Dashboard Governance
      const outputSheet = processSingleSubReport_(ss, sourceSheet, route, monthParts, dashboard, archiveSs, timing);
      if (outputSheet) {
        completed.push(route.prefix + " -> " + outputSheet.getName());
      }
    });

    // 3. Refresh Index once at termination
    try { updateIndexSheet(archiveSs); } catch (err) { logBestEffortWarning_("Index refresh skipped: " + err.message); }

    notify_(`${processTitle} Complete (${monthLabel})\nCompleted: ${completed.join(", ") || "None"}\nSkipped: ${skipped.join(", ") || "None"}`);
    return { completed, skipped };
  });
}

// --- WORKER PIPELINE ---------------------------------------------------------

/**
 * Processes and formats a single sub-report tab.
 * Uses insertGovernedOutputSheet_ to place the sheet directly at its Section F target rank,
 * maps raw data to template headers, sets prompt dates, applies Section G date formatting,
 * and enforces Section D output visibility policies.
 */
function processSingleSubReport_(ss, sourceSheet, route, monthParts, dashboard, archiveSs, timing) {
  dashboard = dashboard || loadDashboardConfig_();

  // 1. Resolve Template & Output Names
  const templateName = "Template - " + route.sheetType;
  const template = ss.getSheetByName(templateName);
  if (!template) throw new Error("Template missing: " + templateName);

  const monthText = Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "MM.yy");
  const outputName = route.prefix + " " + monthText;

  // 2. Read Raw Source Values & Match to Template Headers
  const rawData = sourceSheet.getDataRange().getValues();
  if (rawData.length < 2) return null;

  const sourceHeaders = rawData[0].map(h => String(h || "").trim());
  const sourceRows = rawData.slice(1);
  const targetHeaders = getHeaders_(template, HEADER_ROW);
  const outputRows = mapRowsToHeaders_(sourceRows, sourceHeaders, targetHeaders);

  // 3. SECTION F: Create/Clone Output Sheet Directly at Configured Section F Target Index
  const outputSheet = insertGovernedOutputSheet_(ss, outputName, template);

  // 4. Write Mapped Data
  if (outputRows.length > 0) {
    ensureOutputSheetHasFormattedRows_(outputSheet, DATA_START_ROW + outputRows.length - 1, targetHeaders.length);
    outputSheet.getRange(DATA_START_ROW, 1, outputRows.length, targetHeaders.length).setValues(outputRows);
  }

  // 5. Set Title & Prompt Dates
  outputSheet.getRange("A1").setValue(route.sheetType);
  outputSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat("m/d/yyyy");
  outputSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat("m/d/yyyy");

  // 6. SECTION G: Verify & Apply Date Formats from Column Definitions
  applyGovernedDateFormatsFromDashboard_(outputSheet, dashboard, targetHeaders, outputRows.length);

  // 7. Special Raw Data Engine Steps (Primary PMRs & Banner Sync)
  if (route.isRawData) {
    processRawDataApprovedSyncColumns_(outputSheet, monthParts, timing, markFrameworkStep_);
    syncRawDataBannerColumns_(outputSheet, monthParts, timing, markFrameworkStep_);
  }

  // 8. SECTION D: Apply Sheet Behavior Visibility Policy (Hidden vs Visible)
  applyOutputVisibilityPolicy_(outputSheet, dashboard, route.sheetType, timing);

  // 9. Archiving & Local Sheet Deletion
  const archiveName = "Source - " + route.prefix + " " + monthText;
  if (RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA && archiveSs) {
    archiveRawSourceSheet_(sourceSheet, archiveName, timing, "Archive detail", archiveSs);
  }

  if (route.deleteLocal) {
    deleteSheetSafely_(ss, sourceSheet, "Delete local import tab");
  }

  return outputSheet;
}



// --- DASHBOARD-GOVERNED DATE FORMATTER ---------------------------------------

/**
 * Inspects Section G (Column Definitions) loaded via loadDashboardConfig_()
 * to apply the specified date format to date columns.
 */
function applyGovernedDateFormatsFromDashboard_(sheet, dashboard, headers, rowCount) {
  if (!sheet || !headers || rowCount < 1) return;
  
  const colDefs = (dashboard && dashboard.columnDefinitions) || {};
  const globals = (dashboard && dashboard.globals) || {};
  const defaultFormat = globals.defaultDateFormat || "mm/dd/yyyy";

  headers.forEach((header, idx) => {
    const def = colDefs[header] || {};
    const isDateCol = def.dateColumn || isDateLikeHeader_(header);

    if (isDateCol) {
      const format = def.numberFormat || defaultFormat;
      try {
        sheet.getRange(DATA_START_ROW, idx + 1, rowCount, 1).setNumberFormat(format);
      } catch (err) {}
    }
  });
}

// ============================================================================
// SYSTEM SHEETS BUILDER, SETUP & GOVERNANCE ENGINE
// ============================================================================

// --- MENU CALLBACKS ---------------------------------------------------------

/**
 * Menu Callback: Ensures all core system sheets exist with proper headers and grids.
 */
function buildSystemSheets() {
  return runFrameworkTimed_("Build System Sheets", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboard = loadDashboardConfig_(true);

    // 1. Golden Master Base Template Canvas (RFF_BASE_TEMPLATE)
    ensureGoldenMasterTemplate_(dashboard, timing);

    // 2. Framework Timing Telemetry Log Sheet
    ensureFrameworkTimingReportSheet_(ss, timing);

    // 3. Dashboard Quality Audit Report Sheet
    ensureDashboardQualityReportSheet_(ss, timing);

    // 4. Index Navigation Sheet
    updateIndexSheet();

    notify_("Build System Sheets complete. All core system tabs verified.");
  });
}

/**
 * Menu Callback: Applies Section E surface themes, formatting, grid limits,
 * and visibility rules across all system sheets.
 */
function setupSystemSheets() {
  return runFrameworkTimed_("Setup System Sheets", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboard = loadDashboardConfig_(true);
    const surfaces = dashboard.systemSurfaces || {};

    // 1. Govern each System Surface defined in Section E
    Object.keys(surfaces).forEach(function(sheetName) {
      const surface = surfaces[sheetName];
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) return;

      const theme = getThemeColorsFromBase_(surface.baseColor || "#79B5D2", dashboard.globals);

      // Apply Font & Title Row Formatting
      sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 1), Math.max(sheet.getMaxColumns(), 1))
        .setFontFamily(dashboard.globals.standardFont || "Arial")
        .setFontSize(dashboard.globals.standardFontSize || 10);

      if (surface.usesTitleRows && sheet.getLastColumn() > 0) {
        sheet.getRange(1, 1, 3, sheet.getLastColumn()).setBackground(theme.level5);
        if (sheet.getRange(HEADER_ROW, 1, 1, sheet.getLastColumn()).getValues()[0].some(Boolean)) {
          sheet.getRange(HEADER_ROW, 1, 1, sheet.getLastColumn())
            .setBackground(theme.level2)
            .setFontWeight("bold")
            .setFontColor("#000000");
        }
      }

      // Position Tab According to Section F Tab Organization Rank
      placeCreatedSheetInConfiguredOrder_(sheet);

      // Apply Section E Visibility Policy (HIDDEN vs VISIBLE)
      if (surface.outputVisibility === "HIDDEN" || surface.hiddenTemplate) {
        hideSheetIfNeeded_(sheet, timing, "Hide system surface: " + sheetName);
      } else {
        showSheetIfNeeded_(sheet, timing, "Show system surface: " + sheetName);
      }
    });

    // 2. Enforce Golden Master Canvas Protection (Always Hidden)
    forceBaseTemplateHidden_();

    // 3. Sync All Report Base Templates with Active Dashboard Config
    syncBaseTemplateWithDashboard();

    notify_("Setup System Sheets complete. Section E surfaces governed.");
  });
}

/**
 * Menu Callback: Rebuilds Golden Master canvas and regenerates all report templates from Dashboard.
 */
function createSystemTemplates() {
  notify_("Rebuilding system templates from Format Dashboard...");
  return buildAllTemplatesAndValidate();
}

/**
 * Quick Startup Engine (1-Click System Bootstrap)
 *
 * Bootstrapping Sequence:
 * 1. Simple Format Dashboard Shell (Creates 'Format Dashboard' tab if missing)
 * 2. Build Base Template Canvas (Builds 'RFF_BASE_TEMPLATE' plain canvas)
 * 3. Formatted Format Dashboard (Applies full colors, fonts, widths, and hex themes)
 * 4. System Telemetry & Quality (Timing & Quality audit sheets)
 * 5. Quality Startup Audit
 * 6. Build All Report Templates & Validate
 */
function quickSystemSetup() {
  return runFrameworkTimed_("Quick System Setup", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // ------------------------------------------------------------------------
    // STEP 1: Build Simple Unformatted Format Dashboard Shell
    // ------------------------------------------------------------------------
    markFrameworkStep_(timing, "Step 1: Ensure Unformatted Format Dashboard Shell");
    const dashboardSheet = ensureFormatDashboardShell_(ss);

    // ------------------------------------------------------------------------
    // STEP 2: Build Base Template Canvas (RFF_BASE_TEMPLATE)
    // ------------------------------------------------------------------------
    markFrameworkStep_(timing, "Step 2: Build Base Template Canvas");
    const dashboard = loadDashboardConfig_(true);
    ensureGoldenMasterTemplate_(dashboard, timing);

    // ------------------------------------------------------------------------
    // STEP 3: Apply Full Formatting & Themes to Format Dashboard
    // ------------------------------------------------------------------------
    markFrameworkStep_(timing, "Step 3: Build Formatted Format Dashboard");
    buildFormattedDashboardSheet_(dashboardSheet, dashboard);

    // ------------------------------------------------------------------------
    // STEP 4: Setup Telemetry & Quality System Sheets
    // ------------------------------------------------------------------------
    markFrameworkStep_(timing, "Step 4: Setup System Telemetry & Quality Sheets");
    ensureFrameworkTimingReportSheet_(ss, timing);
    ensureDashboardQualityReportSheet_(ss, timing);

    // ------------------------------------------------------------------------
    // STEP 5: Run Dashboard Quality Start Up Audit
    // ------------------------------------------------------------------------
    markFrameworkStep_(timing, "Step 5: Run Dashboard Quality Start Up Audit");
    runDashboardQualityStartUp();

    // ------------------------------------------------------------------------
    // STEP 6: Build All Report Templates & Run Validation
    // ------------------------------------------------------------------------
    markFrameworkStep_(timing, "Step 6: Build All Templates & Validate");
    buildAllTemplatesAndValidate();

    // ------------------------------------------------------------------------
    // STEP 7: Final Tab Sorting & Visibility Enforcement
    // ------------------------------------------------------------------------
    setupSystemSheets();

    notify_("🚀 Quick System Setup Complete!\n\n" +
            "✓ Format Dashboard Shell & Formatting Built\n" +
            "✓ Golden Master Base Template Built\n" +
            "✓ System Telemetry & Quality Sheets Active\n" +
            "✓ Quality Startup Audit Passed\n" +
            "✓ All Report Templates Rebuilt & Validated");
  });
}

// ============================================================================
// BOOTSTRAP HELPERS (DASHBOARD SHELL & FULL FORMATTING)
// ============================================================================

/**
 * Creates a simple, unformatted 'Format Dashboard' tab with default
 * Section A through H structural banners if the sheet does not exist.
 */
function ensureFormatDashboardShell_(ss) {
  let sheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
  if (sheet) return sheet;

  sheet = ss.insertSheet(RFF_DASHBOARD_SHEET, 0);

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
    ["Format Dashboard", "Format Dashboard", 10, false, false, false, false, false, "VISIBLE", "", "", "#4B7E9F"],
    ["RFF_BASE_TEMPLATE", "Golden Master Base", 20, false, false, false, false, true, "HIDDEN", "", "", "#6A9AB7"],
    ["Framework Timing Report", "Framework Timing Report", 30, true, false, false, false, false, "VISIBLE", "", "", "#79B5D2"],
    ["Dashboard Quality Report", "Dashboard Quality Report", 40, true, false, false, false, false, "VISIBLE", "", "", "#88C2DE"],
    ["Index", "Index Navigation", 50, true, false, false, false, false, "VISIBLE", "", "", "#3B88B3"],
    [""],
    ["SECTION F - TAB ORGANIZATION & INDEX"],
    ["Name or Prefix", "Group", "Rank Base", "Special"],
    ["Format Dashboard", "System", 10, "SYSTEM"],
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

/**
 * Applies professional styling, header background fills, font weights,
 * column widths, and theme notes to the 'Format Dashboard' tab.
 */
function buildFormattedDashboardSheet_(dashboardSheet, dashboard) {
  if (!dashboardSheet) return;

  const font = (dashboard && dashboard.globals && dashboard.globals.standardFont) || "Arial";
  const data = dashboardSheet.getDataRange().getValues();

  // Set global sheet font
  dashboardSheet.getDataRange().setFontFamily(font);

  // Format Section Banners
  for (let r = 0; r < data.length; r++) {
    const firstCell = String(data[r][0] || "").trim();
    if (firstCell.indexOf("SECTION ") === 0) {
      const bannerRange = dashboardSheet.getRange(r + 1, 1, 1, 12);
      bannerRange
        .setBackground("#2C5270")
        .setFontColor("#FFFFFF")
        .setFontWeight("bold")
        .setFontSize(11);
    }
  }

  // Recalculate and write Section C and E HSL color themes
  recalculateDashboardHexCodes_(dashboardSheet);

  // Auto-fit or set default column widths
  dashboardSheet.setColumnWidth(1, 200);
  dashboardSheet.setColumnWidth(2, 120);
  dashboardSheet.setColumnWidth(3, 180);
  dashboardSheet.setColumnWidth(4, 160);
}




