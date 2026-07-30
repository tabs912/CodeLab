// ============================================================================
// === SYSTEM SHEETS, DIAGNOSTICS & FORMAT DASHBOARD ==========================
// ============================================================================
// Quarantined ownership: system builders and painters, Format Dashboard,
// Framework Timing Report, Dashboard Quality Report, themes, menus, and
// diagnostics. Function declarations remain callable throughout Apps Script.
//
// Inventory: 46 constants, 2 mutable state values, and 274 functions.

// --- QUARANTINED CONSTANTS ---------------------------------------------------

const RFF_TIMING_MAX_ROWS = 5000;

const RFF_TIMING_SUMMARY_LOOKBACK_ROWS = 750;

const RFF_COMBINED_DASHBOARD_MAX_SOURCE_ROWS = 1000;

const RFF_DASHBOARD_CONFIG_MAX_READ_COLS = 17;

const SYSTEM_SHEETS_TO_HIDE = Object.freeze([
  "Framework Timing Report",
  "Dashboard Quality Report"
]);

const ML_MENU_CALLBACKS = Object.freeze({
  dataProcessing: Object.freeze([
    "formatMonthlySheets",
    "runMonthlyStart",
    "runMonthlyUpdate",
    "updateDemoPMonthlySync",
    "buildDemoPFromScratch",
    "createDisenrolledList",
    "buildMonthlyChangeReport",
    "createMasterList"
  ]),
  sheetLayout: Object.freeze([
    "enforceGlobalSheetSortOrder",
    "hideMonthlyImportSheets",
    "archiveMonthlyImportSheets",
    "hideMonthlyActiveSheets",
    "archiveMonthlyActiveSheets",
    "hideTemplates",
    "showTemplates",
    "hideSystemSheets_",
    "showSystemSheets_",
    "clearDiagnosticsAndTimingLogs",
    "toggleFrameworkTiming"
  ]),
  quickStart: Object.freeze([
    "quickSystemSetup",
    "quickBuildAllTemplates",
    "runDashboardQualityWorkflow",
    "runFrameworkSmokeValidation"
  ]),
  maintenanceRebuild: Object.freeze([
    "runDashboardQualityStartUp",
    "runDashboardQualityValidateTemplates",
    "runDashboardQualityWorkflow",
    "runFrameworkSmokeValidation",
    "runFullQualityCheck",
    "runFormatDashboardUpdates",
    "formatBannerReport",
    "formatCarePlanDueReport",
    "formatUnlockedCarePlanReport",
    "formatRawData",
    "createSystemTemplates"
  ]),
  startUp: Object.freeze([
    "buildSystemSheets",
    "setupSystemSheets",
    "rebuildFormatDashboardDefaults",
    "saveActiveLayoutToDashboardSettings",
    "buildAllTemplatesAndValidate",
    "createIndexSheet",
    "restoreSheetFromActiveIndexRow",
    "configureIndexRestoreWebAppUrl",
    "configureArchiveSpreadsheetId"
  ])
});

const RFF_DASHBOARD_SHEET = "Format Dashboard";

const RFF_VALIDATION_SHEET = "Dashboard Quality Report";

const RFF_DASHBOARD_QUALITY_SHEET = RFF_VALIDATION_SHEET;

const RFF_TIMING_SHEET = "Framework Timing Report";

const RFF_FRAMEWORK_TIMING_SHEET = RFF_TIMING_SHEET;

const RFF_TIMING_SUMMARY_SHEET = RFF_TIMING_SHEET;

const RFF_TEST_DASHBOARD_SHEET = "Dashboard Quality Report";

const RFF_HEALTH_CHECK_SHEET = "Framework Health Check";

const RFF_SECTION_GLOBAL = "SECTION A - GLOBAL SETTINGS";

const RFF_SECTION_TITLE_ROWS = "SECTION B - TITLE ROWS";

const RFF_SECTION_SHEETS = "SECTION C - SHEET DEFINITIONS";

const RFF_SECTION_BEHAVIORS = "SECTION D - SHEET BEHAVIORS";

const RFF_SECTION_SYSTEM_SURFACES = "SECTION E - SYSTEM SHEET SURFACES";

const RFF_SECTION_TAB_ORGANIZATION = "SECTION F - TAB ORGANIZATION & INDEX";

const RFF_SECTION_COLUMNS = "SECTION G - COLUMN DEFINITIONS";

const RFF_SECTION_HEADERS = "SECTION H - SHEET HEADERS";

const RFF_MASTER_LIST_HEALTH_KEY = "Master List Validation";

const RFF_CP_SYNC_DIAGNOSTICS_KEY = "Care Plan Sync Validation";

const RFF_WORKFLOW_SYNC_VERIFICATION_KEY = "Workflow & Synchronization Verification";

const RFF_PERFORMANCE_SUMMARY_KEY = "Performance Summary";

const RFF_SYSTEM_SHEET_VERIFICATION_KEY = "System Sheet Verification";

const RFF_DASHBOARD_VERIFY_GLOBAL_KEY = "Format Dashboard Global Inputs";

const RFF_DASHBOARD_VERIFY_SHEETS_KEY = "Format Dashboard Sheet Definitions";

const RFF_DASHBOARD_VERIFY_HEADERS_KEY = "Format Dashboard Sheet Headers";

const RFF_DASHBOARD_VERIFY_COLUMNS_KEY = "Format Dashboard Column Definitions";

const RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY = "Format Dashboard Sheet Behaviors";

const RFF_DASHBOARD_VERIFY_TAB_ORGANIZATION_KEY = "Format Dashboard Tab Organization";

const RFF_DASHBOARD_CHANGELOG_KEY = "Format Dashboard Changelog";

const RFF_DEMO_P_PROCESSING_VALIDATION_KEY = "Demo P Processing Validation";

const RFF_DISENROLLED_EXCLUSION_VALIDATION_KEY = "Disenrolled Exclusion Validation";

const RFF_MONTHLY_CHANGE_VALIDATION_KEY = "Monthly Change Validation";

const RFF_DASHBOARD_QUALITY_SECTIONS = [
  { key: RFF_DASHBOARD_VERIFY_GLOBAL_KEY, title: "SECTION A - GLOBAL INPUTS VERIFICATION" },
  { key: RFF_DASHBOARD_VERIFY_SHEETS_KEY, title: "SECTION B - SHEET DEFINITIONS VERIFICATION" },
  { key: RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY, title: "SECTION C - SHEET BEHAVIOR VERIFICATION" },
  { key: RFF_DASHBOARD_VERIFY_COLUMNS_KEY, title: "SECTION D - COLUMN DEFINITIONS VERIFICATION" },
  { key: RFF_DASHBOARD_VERIFY_HEADERS_KEY, title: "SECTION E - SHEET HEADERS VERIFICATION" },
  { key: RFF_DASHBOARD_VERIFY_TAB_ORGANIZATION_KEY, title: "SECTION F - TAB ORGANIZATION & INDEX VERIFICATION" },
  { key: RFF_VALIDATION_SHEET, title: "SECTION G - TEMPLATE STRUCTURE & VALIDATION" },
  { key: RFF_DASHBOARD_CHANGELOG_KEY, title: "SECTION H - FORMAT DASHBOARD CHANGELOG" },
  { key: RFF_HEALTH_CHECK_SHEET, title: "SECTION I - FRAMEWORK HEALTH CHECK" },
  { key: RFF_PERFORMANCE_SUMMARY_KEY, title: "SECTION J - PERFORMANCE SUMMARY" },
  { key: RFF_MASTER_LIST_HEALTH_KEY, title: "SECTION K - RAW DATA VALIDATION" },
  { key: RFF_CP_SYNC_DIAGNOSTICS_KEY, title: "SECTION L - CARE PLAN SYNC VALIDATION" },
  { key: RFF_WORKFLOW_SYNC_VERIFICATION_KEY, title: "SECTION M - WORKFLOW & SYNCHRONIZATION VERIFICATION" },
  { key: RFF_DEMO_P_PROCESSING_VALIDATION_KEY, title: "SECTION N - DEMO P QUALITY VALIDATION" },
  { key: RFF_DISENROLLED_EXCLUSION_VALIDATION_KEY, title: "SECTION O - DISENROLLED EXCLUSION VALIDATION" },
  { key: RFF_MONTHLY_CHANGE_VALIDATION_KEY, title: "SECTION P - MONTHLY CHANGE VALIDATION" },
  { key: "Summary", title: "SECTION Q - SUMMARY" },
  { key: "Signoff", title: "SECTION R - SIGNOFF" }
];

const RFF_DASHBOARD_QUALITY_COL_WIDTHS = [250, 325, 225, 200, 150, 100, null];

const RFF_DASHBOARD_QUALITY_WRAP_COLUMNS = [2, 3, 4, 5, 6, 7];

const RFF_SYSTEM_SHEET_TITLE_COLOR = "#79b5d2";

const RFF_SYSTEM_SHEET_SECTION_COLOR = "#9fcadf";

const RFF_SYSTEM_SHEET_SUBHEADER_COLOR = "#c6dfec";

const RFF_SYSTEM_SHEET_BORDER_COLOR = "#cccccc";

const RFF_DASHBOARD_QUALITY_MIN_SECTION_ROWS = 5;

const RFF_QA_SECTION_PROP_PREFIX = "MLF_QA_SECTION_";

// --- QUARANTINED MUTABLE STATE ---------------------------------------------

let RFF_DASHBOARD_QUALITY_DEFER_WRITES_ = false;
let ML_DASHBOARD_QUALITY_STAGED_BUFFERS_ = {};

// --- QUARANTINED FUNCTIONS ---------------------------------------------------

function writeDashboardTitle_(sheet, row) {
  const titleValues = [["Format Dashboard", "- v" + RFF_VERSION + " -", "Report Formatter Framework"]];
  sheet.getRange(row, 1, 1, 9).breakApart();
  sheet.getRange(row, 1, 1, 3).setValues(titleValues);
  sheet.getRange(row, 1, 1, 9)
    .setFontFamily("Arial")
    .setFontSize(16)
    .setFontWeight("bold")
    .setBackground("#D9EAF7")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(row, 30);
  return row + 2;
}

function writeDashboardSection_(sheet, startRow, sectionName, headers, rows) {
  sheet.getRange(startRow, 1).setValue(sectionName);
  sheet.getRange(startRow, 1, 1, headers.length)
    .merge()
    .setFontFamily("Arial")
    .setFontSize(12)
    .setFontWeight("bold")
    .setBackground("#B7DEE8")
    .setVerticalAlignment("middle");


  const headerRow = startRow + 1;
  sheet.getRange(headerRow, 1, 1, headers.length)
    .setValues([headers])
    .setFontFamily("Arial")
    .setFontSize(10)
    .setFontWeight("bold")
    .setBackground("#D9EAF7")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
    .setVerticalAlignment("top");


  if (rows.length > 0) {
    sheet.getRange(headerRow + 1, 1, rows.length, headers.length)
      .setValues(rows)
      .setFontFamily("Arial")
      .setFontSize(10)
      .setVerticalAlignment("middle")
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  }


  return headerRow + rows.length + 3;
}

function styleDashboard_(sheet) {
  sheet.setFrozenRows(1);


  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastCol = Math.max(sheet.getLastColumn(), 1);


  sheet.getRange(1, 1, lastRow, lastCol)
    .setFontFamily("Arial")
    .setFontColor("#000000")
    .setHorizontalAlignment("left");


  const widths = [250, 160, 240, 180, 130, 120, 160, 150, 140];
  widths.forEach(function(width, index) {
    try {
      sheet.setColumnWidth(index + 1, width);
    } catch (err) {
      logBestEffortWarning_("Dashboard column width skipped: " + err.message);
    }
  });


  try {
    const filter = sheet.getFilter();
    if (filter) filter.remove();
  } catch (err) {
    logBestEffortWarning_("Dashboard filter remove skipped: " + err.message);
  }
}

function setupReportFormattingDashboard() {
  return setupReportFormattingDashboardFromScriptDefaults_();
}

function appendDashboardSectionRows_(rows, sectionName, headers, dataRows, width) {
  rows.push(normalizeSectionRowForWidth_([], width));
  rows.push(normalizeSectionRowForWidth_([sectionName], width));
  rows.push(normalizeSectionRowForWidth_([], width));
  rows.push(normalizeSectionRowForWidth_(headers, width));
  rows.push(normalizeSectionRowForWidth_([], width));
  (dataRows || []).forEach(function(row) {
    rows.push(normalizeSectionRowForWidth_(row, width));
  });
}

function getResolvedDefaultColumnDefinitionRows_() {
  const defaultWidth = Number(RFF_DEFAULTS.defaultColumnWidth || 105);
  const defaultFontSize = Number(RFF_DEFAULTS.standardFontSize || 10);
  const defaultWrap = String(RFF_DEFAULTS.defaultDataWrap || "CLIP").toUpperCase();
  const defaultHorizontal = String(RFF_DEFAULTS.defaultHorizontalAlignment || "left").toLowerCase();
  const defaultVertical = String(RFF_DEFAULTS.defaultVerticalAlignment || "middle").toLowerCase();
  const defaultNumberFormat = String(RFF_DEFAULTS.defaultNumberFormat || "General");


  return getDefaultColumnDefinitionRows_().map(function(row) {
    const width = Number(row[1]);
    const fontSize = Number(row[2]);
    const dateColumn = row[3] === true;
    const hideColumn = row[4] === true;
    const wrap = String(row[5] || "").toUpperCase();
    const horizontal = String(row[6] || "").toLowerCase();
    const vertical = String(row[7] || "").toLowerCase();
    const numberFormat = String(row[8] || "");


    return [
      row[0],
      width === defaultWidth ? "" : row[1],
      fontSize === defaultFontSize ? "" : row[2],
      dateColumn ? true : "",
      hideColumn ? true : "",
      wrap === defaultWrap ? "" : row[5],
      horizontal === defaultHorizontal ? "" : row[6],
      vertical === defaultVertical ? "" : row[7],
      numberFormat === "" || numberFormat === defaultNumberFormat ? "" : row[8]
    ];
  });
}

function getFormatDashboardExpectedSectionHeaders_() {
  const width = 14;
  const map = {};
  map[RFF_SECTION_GLOBAL] = normalizeSectionRowForWidth_(["Setting", "Value", "Options"], width);
  map[RFF_SECTION_TITLE_ROWS] = normalizeSectionRowForWidth_(["Sheet Type", "Row", "Purpose", "Value Source", "Label", "Target Cell", "Height", "Font Size", "Font Weight", "Fill Level", "Alignment", "Wrap", "Notes"], width);
  map[RFF_SECTION_SHEETS] = normalizeSectionRowForWidth_(["Sheet Type", "Report Title", "Template Name", "Output Naming Pattern", "Base Color", "Use Prompt Date", "End Date Source", "Template Row Count", "Template Column Count", "Template Row Mode", "Minimum Rows", "Buffer Rows"], width);
  map[RFF_SECTION_BEHAVIORS] = normalizeSectionRowForWidth_(["Sheet Type", "Uses Title Rows", "Uses Filter", "Uses Alternating Colors", "Uses Subheaders", "Hidden Template", "Output Visibility"], width);
  map[RFF_SECTION_SYSTEM_SURFACES] = normalizeSectionRowForWidth_(["System Sheet Name", "Display Name", "Sort Order", "Uses Title Rows", "Uses Filter", "Uses Alternating Colors", "Uses Subheaders", "Hidden Template", "Output Visibility", "Default Column Widths", "Title Fill Color", "Title Font Color", "Notes"], width);
  map[RFF_SECTION_TAB_ORGANIZATION] = normalizeSectionRowForWidth_(["Sheet Name / Prefix", "Group", "Rank / Range", "Special"], width);
  map[RFF_SECTION_COLUMNS] = normalizeSectionRowForWidth_(["Header", "Width", "Header Font Size", "Date Column", "Hide Column", "Data Wrap", "Horizontal Alignment", "Vertical Alignment", "Number Format"], width);
  map[RFF_SECTION_HEADERS] = normalizeSectionRowForWidth_(["Sheet Type", "Column Order", "Header", "Source of Data"], width);
  return map;
}

function repairFormatDashboardSectionHeaders_(dashboardSheet, timing) {
  if (!dashboardSheet || !dashboardSheet.getRange) return 0;
  const expected = getFormatDashboardExpectedSectionHeaders_();
  const sectionNames = Object.keys(expected);
  let repaired = 0;

  sectionNames.forEach(function(sectionName) {
    const bounds = getDashboardSectionBounds_(dashboardSheet, sectionName);
    if (!bounds) return;
    const expectedHeader = expected[sectionName];
    const actualHeader = dashboardSheet.getRange(bounds.headerRow, 1, 1, expectedHeader.length).getValues()[0];
    let changed = false;
    for (let c = 0; c < expectedHeader.length; c++) {
      if (String(actualHeader[c] || "").trim() !== String(expectedHeader[c] || "").trim()) {
        changed = true;
        break;
      }
    }
    if (!changed) return;
    dashboardSheet.getRange(bounds.headerRow, 1, 1, expectedHeader.length).setValues([expectedHeader]);
    repaired++;
  });

  if (repaired && timing) markFrameworkStep_(timing, "Format Dashboard section headers repaired: " + repaired);
  return repaired;
}

function writeDashboardDefaultsFast_(sheet) {
  const width = 14;
  const rows = [];
  rows.push(normalizeSectionRowForWidth_(["Format Dashboard", "- v" + RFF_VERSION + " -", "Report Formatter Framework"], width));
  rows.push(normalizeSectionRowForWidth_([], width));
  const expectedHeaders = getFormatDashboardExpectedSectionHeaders_();
  appendDashboardSectionRows_(rows, RFF_SECTION_GLOBAL, expectedHeaders[RFF_SECTION_GLOBAL], getDefaultGlobalSettingsRows_(), width);
  appendDashboardSectionRows_(rows, RFF_SECTION_TITLE_ROWS, expectedHeaders[RFF_SECTION_TITLE_ROWS], getDefaultTitleRowRows_(), width);
  appendDashboardSectionRows_(rows, RFF_SECTION_SHEETS, expectedHeaders[RFF_SECTION_SHEETS], getDefaultSheetDefinitionRowsWithColumnCounts_(), width);
  appendDashboardSectionRows_(rows, RFF_SECTION_BEHAVIORS, expectedHeaders[RFF_SECTION_BEHAVIORS], getDefaultBehaviorRows_(), width);
  appendDashboardSectionRows_(rows, RFF_SECTION_SYSTEM_SURFACES, expectedHeaders[RFF_SECTION_SYSTEM_SURFACES], getDefaultSystemSurfaceRows_(), width);
  appendDashboardSectionRows_(rows, RFF_SECTION_TAB_ORGANIZATION, expectedHeaders[RFF_SECTION_TAB_ORGANIZATION], getDefaultTabOrganizationRows_(), width);
  appendDashboardSectionRows_(rows, RFF_SECTION_COLUMNS, expectedHeaders[RFF_SECTION_COLUMNS], getResolvedDefaultColumnDefinitionRows_(), width);
  appendDashboardSectionRows_(rows, RFF_SECTION_HEADERS, expectedHeaders[RFF_SECTION_HEADERS], getDefaultSheetHeaderRows_(), width);

  trimSheetToColumnCount_(sheet, width, "Format Dashboard");
  if (sheet.getMaxRows() < rows.length) sheet.insertRowsAfter(sheet.getMaxRows(), rows.length - sheet.getMaxRows());

  const clearRows = Math.max(sheet.getLastRow(), rows.length, 1);
  sheet.getRange(1, 1, clearRows, width).clearContent().breakApart().setBackground("#FFFFFF");
  sheet.getRange(1, 1, rows.length, width).setValues(rows);

  sheet.getRange(1, 1, rows.length, width)
    .setFontFamily("Arial")
    .setFontColor("#000000")
    .setFontSize(10)
    .setHorizontalAlignment("left")
    .setVerticalAlignment("middle")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);

  sheet.getRange(1, 1, 1, width)
    .setFontSize(16)
    .setFontWeight("bold")
    .setBackground("#D9EAF7");

  const sectionRanges = [];
  const sectionHeaderRanges = [];
  for (let r = 0; r < rows.length; r++) {
    const first = String(rows[r][0] || "").trim();
    if (first.indexOf("SECTION ") === 0) {
      sectionRanges.push(rowColToA1_(r + 1, 1) + ":" + rowColToA1_(r + 1, width));
      if (r + 2 <= rows.length) {
        sectionHeaderRanges.push(rowColToA1_(r + 2, 1) + ":" + rowColToA1_(r + 2, width));
      }
    }
  }
  if (sectionRanges.length) {
    sheet.getRangeList(sectionRanges)
      .setFontSize(12)
      .setFontWeight("bold")
      .setBackground("#B7DEE8")
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
  }
  if (sectionHeaderRanges.length) {
    sheet.getRangeList(sectionHeaderRanges)
      .setFontWeight("bold")
      .setBackground("#D9EAF7")
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
  }

  sheet.getRange(1, 1, Math.min(3, rows.length), width).setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);

  const widths = [250, 160, 240, 180, 130, 120, 160, 150, 140, 120, 120, 120, 120];
  widths.forEach(function(colWidth, index) {
    try {
      sheet.setColumnWidth(index + 1, colWidth);
    } catch (err) {
      logBestEffortWarning_("Dashboard column width skipped: " + err.message);
    }
  });

  try {
    const filter = sheet.getFilter();
    if (filter) filter.remove();
  } catch (err) {
    logBestEffortWarning_("Dashboard filter remove skipped: " + err.message);
  }
  sheet.setFrozenRows(1);
  const formattingDashboard = { globals: RFF_DEFAULTS };
  const formattingSheetDef = { baseColor: "#65A9CC" };
  Object.keys(expectedHeaders).forEach(function(sectionName) {
    const bounds = getDashboardSectionBounds_(sheet, sectionName);
    if (!bounds) return;
    applySubHeaderBlock_(sheet, bounds.sectionRow - 1, sectionName, null, expectedHeaders[sectionName], formattingDashboard, formattingSheetDef, { valuesAlreadyWritten: true });
  });
}

function rebuildFormatDashboardDefaults() {
  return setupReportFormattingDashboardFromScriptDefaults_();
}

function setupReportFormattingDashboardFromScriptDefaults_() {
  return runFrameworkTimed_("Setup Report Formatting Dashboard", function(timing) {
    clearDashboardConfigCache_();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
    if (!sheet) sheet = insertGovernedOutputSheet_(ss, RFF_DASHBOARD_SHEET);

    showSheetIfNeeded_(sheet, timing, "Dashboard sheet shown");
    writeDashboardDefaultsFast_(sheet);
    placeCreatedSheetInConfiguredOrder_(sheet);
    markFrameworkStep_(timing, "Format Dashboard defaults rebuilt and placed in configured system order");
    return sheet;
  });
}

function normalizeDashboardSheetTypeKey_(sheetType) {
  const normalized = normalizeHeader_(sheetType);
  const key = normalizeKey_(normalized);
  const aliases = {
    "banner": RFF_SHEET_TYPES.BANNER,
    "banners": RFF_SHEET_TYPES.BANNER,
    "cpduedate": RFF_SHEET_TYPES.CARE_PLAN_DUE,
    "careplandue": RFF_SHEET_TYPES.CARE_PLAN_DUE,
    "unlockcp": RFF_SHEET_TYPES.UNLOCKED,
    "rawdata": RFF_SHEET_TYPES.RAW_DATA,
    "demop": RFF_SHEET_TYPES.DEMO_P,
    "disenrolledexclusion": RFF_SHEET_TYPES.DISENROLLED_EXCLUSION,
    "masterlist": RFF_SHEET_TYPES.MASTER_LIST,
    "monthlychange": RFF_SHEET_TYPES.MONTHLY_CHANGE
  };
  return aliases[key] || normalized;
}

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
  const rows = typeof getDefaultSheetDefinitionRowsWithColumnCounts_ === "function" ? getDefaultSheetDefinitionRowsWithColumnCounts_() : getDefaultSheetDefinitionRows_();
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
      templateRowCount: numberOrDefault_(row[7], RFF_DEFAULTS.templateRows),
      templateColumnCount: numberOrDefault_(row[8], 0),
      templateRowMode: String(row[9] || "FIXED").trim().toUpperCase(),
      minimumRows: numberOrDefault_(row[10], numberOrDefault_(row[7], RFF_DEFAULTS.templateRows)),
      bufferRows: numberOrDefault_(row[11], 100)
    };
  }
  throw new Error("Default sheet definition not found: " + sheetType);
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
  } catch (err) {
    logBestEffortWarning_("Active-build template environment setup skipped for " + sheetDef.templateName + ": " + err.message);
  }
  hideSheetIfNeeded_(template, null, null);
  clearSheetRuntimeCachesForSheet_(template);
  logBestEffortWarning_("Missing active-build template created from script defaults: " + sheetDef.templateName);
  return template;
}

function quickSystemSetup() {
  showQuickStartToast_("Quick System Setup [Step 1/5]: Rebuilding Format Dashboard defaults...");
  rebuildFormatDashboardDefaults();

  showQuickStartToast_("Quick System Setup [Step 2/5]: Initializing system sheets and organizing structural tabs...");
  setupSystemSheets();

  showQuickStartToast_("Quick System Setup [Step 3/5]: Executing Dashboard Quality start-up verifications...");
  runDashboardQualityStartUp();

  showQuickStartToast_("Quick System Setup [Step 4/5]: Running framework architecture validation harness...");
  runFrameworkSmokeValidation();

  showQuickStartToast_("Quick System Setup [Step 5/5]: Building centralized Index dashboard navigation matrix...");
  // FORCE FULL REBUILD: Rebuilds shell, formats, active workspace, and archive workspace
  updateIndexSheet({ forceShellRebuild: true });

  showQuickStartToast_("Quick System Setup complete. All system architectures are correctly aligned.");
}

function notifyErrorWithTiming_(message) {
  notify_(String(message || "Process stopped") + "\n⚠️ ⏱️ Timing log updated: Framework Timing Report");
}

function getThemeColorsFromBase_(hex, globals) {
  globals = globals || {};
  const baseHex = normalizeHex_(hex);
  const levels = [
    numberOrDefault_(globals.hslLevel1, 60),
    numberOrDefault_(globals.hslLevel2, 75),
    numberOrDefault_(globals.hslLevel3, 85),
    numberOrDefault_(globals.hslLevel4, 97),
    numberOrDefault_(globals.hslLevel5, 99)
  ];
  const cache = getRuntimeCache_().themeColors;
  const cacheKey = [baseHex].concat(levels).join("|");
  if (cache[cacheKey]) return cache[cacheKey];
  const palette = {
    base: baseHex,
    level1: hexWithHslLightness_(baseHex, levels[0]),
    level2: hexWithHslLightness_(baseHex, levels[1]),
    level3: hexWithHslLightness_(baseHex, levels[2]),
    level4: hexWithHslLightness_(baseHex, levels[3]),
    level5: hexWithHslLightness_(baseHex, levels[4])
  };
  cache[cacheKey] = palette;
  return palette;
}

function hslToHex_(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const component = function(n) {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return ("#" + component(0) + component(8) + component(4)).toUpperCase();
}

function hexToHsl_(hex) {
  let value = String(hex || "").replace("#", "").trim();
  if (value.length === 3) value = value.split("").map(function(character) { return character + character; }).join("");
  if (value.length !== 6) return { h: 200, s: 50, l: 50 };
  const r = parseInt(value.substring(0, 2), 16) / 255;
  const g = parseInt(value.substring(2, 4), 16) / 255;
  const b = parseInt(value.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let saturation = 0;
  const lightness = (max + min) / 2;
  if (max !== min) {
    const delta = max - min;
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    if (max === r) h = (g - b) / delta + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / delta + 2;
    if (max === b) h = (r - g) / delta + 4;
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(saturation * 100), l: Math.round(lightness * 100) };
}

function calculateThemeLevels_(baseHex, hslPercents) {
  const hsl = hexToHsl_(baseHex);
  return {
    base: normalizeHex_(baseHex),
    level1: hslToHex_(hsl.h, hsl.s, hslPercents.l1),
    level2: hslToHex_(hsl.h, hsl.s, hslPercents.l2),
    level3: hslToHex_(hsl.h, hsl.s, hslPercents.l3),
    level4: hslToHex_(hsl.h, hsl.s, hslPercents.l4),
    level5: hslToHex_(hsl.h, hsl.s, hslPercents.l5)
  };
}

function getDashboardHslPercents_() {
  const defaults = { l1: 60, l2: 75, l3: 85, l4: 90, l5: 97 };
  try {
    const dashboard = loadDashboardConfig_();
    const globals = dashboard.globals || {};
    return {
      l1: numberOrDefault_(globals.hslLevel1, defaults.l1),
      l2: numberOrDefault_(globals.hslLevel2, defaults.l2),
      l3: numberOrDefault_(globals.hslLevel3, defaults.l3),
      l4: numberOrDefault_(globals.hslLevel4, defaults.l4),
      l5: numberOrDefault_(globals.hslLevel5, defaults.l5)
    };
  } catch (err) {
    return defaults;
  }
}

function getSectionEThemeForSheet_(targetSheetName) {
  const surfaces = getSystemSurfaceConfigMap_();
  const surface = surfaces[targetSheetName] || surfaces[String(targetSheetName || "").replace(/^TEST /, "")];
  const baseHex = surface && surface.titleFillColor ? surface.titleFillColor : RFF_SYSTEM_SHEET_TITLE_COLOR;
  return calculateThemeLevels_(baseHex, getDashboardHslPercents_());
}

function recalculateDashboardHexCodes_(dashboardSheet) {
  if (!dashboardSheet) return;
  const values = dashboardSheet.getDataRange().getValues();
  const hslPercents = { l1: 60, l2: 75, l3: 85, l4: 90, l5: 97 };
  values.forEach(function(row) {
    const setting = String(row[0] || "").trim();
    if (setting === "HSL Level 1 Lightness %") hslPercents.l1 = Number(row[1]) || 60;
    if (setting === "HSL Level 2 Lightness %") hslPercents.l2 = Number(row[1]) || 75;
    if (setting === "HSL Level 3 Lightness %") hslPercents.l3 = Number(row[1]) || 85;
    if (setting === "HSL Level 4 Lightness %") hslPercents.l4 = Number(row[1]) || 90;
    if (setting === "HSL Level 5 Lightness %") hslPercents.l5 = Number(row[1]) || 97;
  });

  let sectionC = -1;
  values.forEach(function(row, index) {
    if (String(row[0] || "").trim() === RFF_SECTION_SHEETS) sectionC = index;
  });
  if (sectionC < 0) return;

  for (let row = sectionC + 2; row < values.length; row++) {
    const sheetType = String(values[row][0] || "").trim();
    if (sheetType.indexOf("SECTION ") === 0) break;
    if (!sheetType) continue;
    const baseHex = String(values[row][4] || "").trim();
    if (!baseHex) continue;
    const theme = calculateThemeLevels_(baseHex, hslPercents);
    if (dashboardSheet.getMaxColumns() >= 10) {
      dashboardSheet.getRange(row + 1, 6, 1, 5).setNotes([[theme.level1, theme.level2, theme.level3, theme.level4, theme.level5]]);
    }
  }
  clearDashboardConfigCache_();
}

function normalizeHex_(hex) {
  let value = String(hex || "").trim();
  if (!value) value = "#65A9CC";
  if (!value.startsWith("#")) value = "#" + value;
  if (/^#[0-9A-Fa-f]{3}$/.test(value)) {
    value = "#" + value[1] + value[1] + value[2] + value[2] + value[3] + value[3];
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return "#65A9CC";
  return value.toUpperCase();
}

function hexWithHslLightness_(hex, lightnessPercent) {
  const rgb = hexToRgb_(hex);
  const hsl = rgbToHsl_(rgb.r, rgb.g, rgb.b);
  const rgbOut = hslToRgb_(hsl.h, hsl.s, lightnessPercent / 100);
  return rgbToHex_(rgbOut.r, rgbOut.g, rgbOut.b);
}

function hexToRgb_(hex) {
  const normalized = normalizeHex_(hex).replace("#", "");
  return {
    r: parseInt(normalized.substring(0, 2), 16),
    g: parseInt(normalized.substring(2, 4), 16),
    b: parseInt(normalized.substring(4, 6), 16)
  };
}

function rgbToHex_(r, g, b) {
  const toHex = function(n) {
    const value = Math.max(0, Math.min(255, Math.round(n)));
    return value.toString(16).padStart(2, "0");
  };
  return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
}

function rgbToHsl_(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
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
  return { h: h, s: s, l: l };
}

function hslToRgb_(h, s, l) {
  if (s === 0) {
    const gray = Math.round(l * 255);
    return { r: gray, g: gray, b: gray };
  }
  const hue2rgb = function(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
  };
}

function startRuntimeTiming_(processName, monthParts) {
  const now = new Date().getTime();
  return {
    processName: processName || "Workflow",
    monthParts: monthParts || null,
    startMs: now,
    lastMs: now,
    steps: [],
    counters: {},
    warnings: []
  };
}

function logRuntimeTiming_(processName, stepName, stepSeconds, totalSeconds, severity, details) {
  const detailText = details ? " | " + details : "";
  Logger.log(
    "[TIMING] " +
    String(processName || "Workflow") +
    " | " +
    String(stepName || "Step") +
    " | step " +
    formatSeconds_(stepSeconds) +
    " | total " +
    formatSeconds_(totalSeconds) +
    " | " +
    String(severity || getRuntimeTimingSeverity_(stepSeconds)) +
    detailText
  );
}

function getRuntimeTimingSeverity_(seconds) {
  const value = Number(seconds || 0);
  if (value >= 60) return "CRITICAL";
  if (value >= 30) return "BOTTLENECK";
  if (value >= 10) return "SLOW";
  return "OK";
}

function writeRuntimeTimingReport_(timing) {
  writeRuntimeTimingReportBestEffort_(timing);
}

function writeRuntimeTimingReportBestEffort_(timing) {
  if (!timing) return false;
  try {
    appendRuntimeTimingToFrameworkTimingReport_(timing);
    writeCombinedFrameworkTimingReport_();
    return true;
  } catch (err) {
    logBestEffortWarning_("Runtime timing telemetry skipped for " + String(timing.processName || "process") + ": " + err.message);
    return false;
  }
}

function writeConsolidatedTimingSummaryReport_() {
  writeCombinedFrameworkTimingReport_();
}

function writeCombinedFrameworkTimingReport_() {
  const sheet = ensureFrameworkTimingReport_();
  const detailRows = getFrameworkTimingDetailRows_(sheet).slice(-getFrameworkTimingRetentionLimit_());
  const processRows = buildFrameworkTimingProcessSummaryRows_(detailRows);
  const issueRows = buildFrameworkTimingIssueRows_(detailRows, processRows);
  const recommendationRows = buildFrameworkTimingRecommendationRows_(issueRows);
  const rowsBySection = { A: processRows, B: issueRows, C: recommendationRows, D: detailRows };
  const width = 8;
  const masterTimingBuffer = [normalizeSectionRowForWidth_(["Framework Timing Report", "- v" + MASTER_LIST_MERGE_ML_VERSION + " -", "Report Timing Framework"], width)];
  const sectionStarts = [];
  const updated = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy");
  getFrameworkTimingSectionRegistry_().forEach(function(section) {
    sectionStarts.push({ startRow: masterTimingBuffer.length + 1, section: section });
    masterTimingBuffer.push(normalizeSectionRowForWidth_([], width));
    masterTimingBuffer.push(normalizeSectionRowForWidth_([section.title + " | Last Updated - " + updated], width));
    masterTimingBuffer.push(normalizeSectionRowForWidth_([], width));
    masterTimingBuffer.push(normalizeSectionRowForWidth_(section.headers, width));
    masterTimingBuffer.push(normalizeSectionRowForWidth_([], width));
    const data = rowsBySection[section.id] && rowsBySection[section.id].length ? rowsBySection[section.id] : [["Enter Data here"]];
    data.forEach(function(row) { masterTimingBuffer.push(normalizeSectionRowForWidth_(row, width)); });
  });
  if (sheet.getMaxRows() < masterTimingBuffer.length) sheet.insertRowsAfter(sheet.getMaxRows(), masterTimingBuffer.length - sheet.getMaxRows());
  const clearRows = Math.max(sheet.getLastRow(), masterTimingBuffer.length, 1);
  sheet.getRange(1, 1, clearRows, width).clearContent().breakApart();
  sheet.getRange(1, 1, masterTimingBuffer.length, width).setValues(masterTimingBuffer);
  const dashboard = loadDashboardConfig_();
  const sheetDef = getSheetDefinitionByTypeOrNull_(dashboard, "Framework Timing Report") || { baseColor: "#79b5d2" };
  sectionStarts.forEach(function(item) {
    applySubHeaderBlock_(sheet, item.startRow, item.section.title, updated, item.section.headers, dashboard, sheetDef, { valuesAlreadyWritten: true });
  });
  notify_("⏱️ Framework Timing Report has been successfully updated!");
}

function getFrameworkTimingRetentionLimit_() {
  return Math.max(Number(RFF_TIMING_MAX_ROWS) || 5000, 500);
}

function getFrameworkTimingReportSheetName_() {
  return "Framework Timing Report";
}

function getFrameworkTimingSectionRegistry_() {
  return [
    {
      id: "A",
      title: "SECTION A - PROCESS SUMMARY",
      headers: ["Process", "Runtime (Sec)", "Status", "Benchmark", "Variance", "Notes"]
    },
    {
      id: "B",
      title: "SECTION B - PERFORMANCE ISSUES",
      headers: ["Priority", "Process", "Runtime (Sec)", "Threshold", "Issue", "Recommendation"]
    },
    {
      id: "C",
      title: "SECTION C - OPTIMIZATION RECOMMENDATIONS",
      headers: ["Process", "Finding", "Impact", "Recommendation", "Priority", "Status"]
    },
    {
      id: "D",
      title: "SECTION D - DETAILED TIMING LOG",
      headers: ["Timestamp", "Process", "Step", "Step Seconds", "Total Seconds", "Severity", "Details"]
    }
  ];
}

function findFrameworkTimingSectionRow_(sheet, sectionTitle) {
  if (!sheet) return 0;
  const target = String(sectionTitle || "").trim();
  const lastRow = sheet.getLastRow();
  if (lastRow < 1) return 0;

  const values = sheet.getRange(1, 1, lastRow, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0] || "").trim().indexOf(target) === 0) return i + 1;
  }
  return 0;
}

function findNextFrameworkTimingSectionRow_(sheet, startRow) {
  if (!sheet) return 0;
  const lastRow = sheet.getLastRow();
  if (startRow > lastRow) return 0;

  const values = sheet.getRange(startRow, 1, lastRow - startRow + 1, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    const value = String(values[i][0] || "").trim();
    if (/^SECTION [A-Z] - /.test(value)) return startRow + i;
  }
  return 0;
}

function collectExistingFrameworkTimingSectionBlocks_(sheet) {
  const blocks = {};
  if (!sheet || sheet.getLastRow() < 1) return blocks;
  const width = 8;

  getFrameworkTimingSectionRegistry_().forEach(function(section) {
    const titleRow = findFrameworkTimingSectionRow_(sheet, section.title);
    if (!titleRow) return;

    const nextRow = findNextFrameworkTimingSectionRow_(sheet, titleRow + 1);
    const endRow = nextRow ? Math.max(titleRow, nextRow - 2) : sheet.getLastRow();
    const rowCount = Math.max(1, endRow - Math.max(1, titleRow - 1) + 1);
    const values = sheet.getRange(Math.max(1, titleRow - 1), 1, rowCount, width).getValues();
    blocks[section.id] = trimTrailingBlankRows_(values);
  });

  return blocks;
}

function buildDefaultFrameworkTimingSectionBlock_(section) {
  return [
    [""],
    [section.title],
    ["Last Updated", "Date and time"],
    section.headers,
    ["Enter Data here"],
    [""],
    [""]
  ];
}

function normalizeFrameworkTimingSectionBlock_(section, block) {
  let rows = trimTrailingBlankRows_(block || []);
  let titleIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    if (String((rows[i] || [])[0] || "").trim() === section.title) {
      titleIndex = i;
      break;
    }
  }
  if (titleIndex < 0) rows = buildDefaultFrameworkTimingSectionBlock_(section);
  else rows = rows.slice(titleIndex);

  const dataRows = [];
  for (let i = 1; i < rows.length; i++) {
    const joined = (rows[i] || []).join(" ").toLowerCase();
    if (joined.indexOf("runtime") !== -1 || joined.indexOf("threshold") !== -1 || joined.indexOf("step seconds") !== -1 || joined.indexOf("recommendation") !== -1) {
      for (let r = i + 1; r < rows.length; r++) {
        if (rowHasAnyValue_(rows[r])) dataRows.push(rows[r]);
      }
      break;
    }
  }
  if (!dataRows.length) dataRows.push(["Enter Data here"]);

  const output = [[""], [section.title], ["Last Updated", "Date and time"], section.headers].concat(dataRows).concat([[""], [""]]);
  return output.map(function(row) {
    return normalizeSectionRowForWidth_(row, 8);
  });
}

function rebuildFrameworkTimingReportShellCompact_(sheet) {
  if (!sheet) return;

  const requiredCols = 8;
  if (sheet.getMaxColumns() < requiredCols) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), requiredCols - sheet.getMaxColumns());
  }

  const existingBlocks = collectExistingFrameworkTimingSectionBlocks_(sheet);
  const rows = [];
  rows.push(normalizeSectionRowForWidth_(["Framework Timing Report", "- v" + MASTER_LIST_MERGE_ML_VERSION + " -", "Report Timing Framework"], requiredCols));
  rows.push(normalizeSectionRowForWidth_(["Report Actions", "Refresh Framework Timing Report", "Write Performance Recommendations"], requiredCols));

  getFrameworkTimingSectionRegistry_().forEach(function(section) {
    const block = normalizeFrameworkTimingSectionBlock_(section, existingBlocks[section.id]);
    block.forEach(function(row) {
      rows.push(normalizeSectionRowForWidth_(row, requiredCols));
    });
  });

  if (sheet.getMaxRows() < rows.length) {
    sheet.insertRowsAfter(sheet.getMaxRows(), rows.length - sheet.getMaxRows());
  }

  const clearRows = Math.max(sheet.getLastRow(), rows.length, 1);
  sheet.getRange(1, 1, clearRows, requiredCols).clearContent().breakApart();
  sheet.getRange(1, 1, rows.length, requiredCols).setValues(rows);

  try {
    sheet.getRange(1, 1, 1, requiredCols)
      .setFontFamily("Arial")
      .setFontSize(12)
      .setFontWeight("bold")
      .setBackground(RFF_SYSTEM_SHEET_TITLE_COLOR);
    sheet.setFrozenRows(1);
  } catch (err) {
    logBestEffortWarning_("Framework Timing compact shell formatting skipped: " + err.message);
  }

  applySystemStructure_(sheet, requiredCols, [], RFF_TIMING_SHEET, Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss"));
}

function hasFrameworkTimingReportShell_(sheet) {
  if (!sheet) return false;

  const titleValues = sheet.getRange(1, 1, 1, 3).getDisplayValues()[0].map(function(value) {
    return String(value || "").trim();
  });
  if (titleValues[0] !== "Framework Timing Report") return false;
  if (titleValues[1] !== "- v" + MASTER_LIST_MERGE_ML_VERSION + " -") return false;
  if (titleValues[2] !== "Report Timing Framework") return false;

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const values = sheet.getRange(1, 1, lastRow, 1).getValues();
  const existingTitles = new Set();
  for (let i = 0; i < values.length; i++) {
    const text = String(values[i][0] || "").trim();
    if (text) existingTitles.add(text);
  }

  const sections = getFrameworkTimingSectionRegistry_();
  for (let i = 0; i < sections.length; i++) {
    if (!Array.from(existingTitles).some(function(title) { return title.indexOf(sections[i].title) === 0; })) return false;
  }

  return true;
}

function initializeFrameworkTimingSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(getFrameworkTimingReportSheetName_());
  if (!sheet) sheet = insertGovernedOutputSheet_(ss, getFrameworkTimingReportSheetName_());
  else showSheetIfNeeded_(sheet);
  if (!hasFrameworkTimingReportShell_(sheet)) rebuildFrameworkTimingReportShellCompact_(sheet);
  applySystemStructure_(sheet, 8, [], RFF_TIMING_SHEET, Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss"));
  placeCreatedSheetInConfiguredOrder_(sheet);
  return sheet;
}

function ensureFrameworkTimingReport_() {
  return initializeFrameworkTimingSheet_();
}

function getFrameworkTimingSectionForId_(sectionId) {
  const id = String(sectionId || "").trim().toUpperCase();
  const matches = getFrameworkTimingSectionRegistry_().filter(function(section) {
    return section.id === id || section.title === sectionId;
  });
  return matches.length ? matches[0] : null;
}

function replaceFrameworkTimingSectionRows_(sheet, sectionId, rows, options) {
  if (!sheet) return;
  const section = getFrameworkTimingSectionForId_(sectionId);
  if (!section) throw new Error("Unknown Framework Timing Report section: " + sectionId);
  const matrix = [section.headers].concat((rows && rows.length) ? rows : [["Enter Data here"]]);
  writeTimingSummarySection(section.title, matrix);
}

function getFrameworkTimingBenchmarkForProcess_(processName, mode) {
  const text = String(processName || "").toLowerCase();
  const refreshMode = String(mode || "").toUpperCase();

  if (text.indexOf("dashboard quality start up") !== -1) return 20;
  if (text.indexOf("dashboard quality workflow") !== -1) return 30;
  if (text.indexOf("dashboard quality validate") !== -1) return 30;
  if (text.indexOf("full quality check") !== -1) return 45;
  if (text.indexOf("format dashboard updates") !== -1) return 10;
  if (text.indexOf("framework smoke validation") !== -1) return 15;
  if (text.indexOf("verify framework") !== -1) return 15;

  if (text.indexOf("template") !== -1) {
    if (refreshMode === "FIRST_BUILD") return 240;
    if (refreshMode === "FULL_REBUILD") return 180;
    if (refreshMode === "METADATA_ONLY" || refreshMode === "NO_CHANGE") return 45;
    return 45;
  }
  if (text.indexOf("master list") !== -1) return 60;
  if (text.indexOf("demo p") !== -1) return 60;
  return "";
}

function getFrameworkTimingThresholdForSeverity_(severity) {
  const value = String(severity || "").trim().toUpperCase();
  if (value === "CRITICAL") return ">= 60 sec";
  if (value === "BOTTLENECK") return ">= 30 sec";
  if (value === "SLOW") return ">= 10 sec";
  return "";
}

function getFrameworkTimingDetailRows_(sheet) {
  if (!sheet || sheet.getLastRow() < 1) return [];
  const section = getFrameworkTimingSectionForId_("D");
  if (!section) return [];

  const titleRow = findFrameworkTimingSectionRow_(sheet, section.title);
  if (!titleRow) return [];

  const dataStart = titleRow + 3;
  const nextRow = findNextFrameworkTimingSectionRow_(sheet, titleRow + 1);
  const endRow = nextRow ? nextRow - 1 : sheet.getLastRow();
  const dataRows = Math.max(0, endRow - dataStart + 1);
  if (dataRows <= 0) return [];

  const lookbackRows = Math.min(dataRows, Math.max(Number(RFF_TIMING_SUMMARY_LOOKBACK_ROWS) || 750, 50));
  const readStart = endRow - lookbackRows + 1;
  const values = sheet.getRange(readStart, 1, lookbackRows, section.headers.length).getValues();
  return values.filter(function(row) {
    return row.some(function(value) {
      return String(value === null || value === undefined ? "" : value).trim() !== "" && String(value).trim() !== "Enter Data here";
    });
  });
}

function getLatestFrameworkTimingRowsByProcess_(detailRows) {
  const rows = detailRows || [];
  const processStarts = {};
  rows.forEach(function(row, index) {
    const process = String(row[1] || "").trim();
    const step = String(row[2] || "").trim().toLowerCase();
    if (!process) return;
    if (step === "start") processStarts[process] = index;
    else if (processStarts[process] === undefined) processStarts[process] = index;
  });

  const latestRows = [];
  rows.forEach(function(row, index) {
    const process = String(row[1] || "").trim();
    if (!process) return;
    const startIndex = processStarts[process];
    if (startIndex === undefined || index >= startIndex) latestRows.push(row);
  });
  return latestRows.length ? latestRows : rows;
}

function getFrameworkTimingBenchmarkSeverity_(runtime, benchmark) {
  const value = Number(runtime || 0);
  const target = Number(benchmark || 0);
  if (!target || value <= target) return "OK";
  const variance = value - target;
  if (variance >= 60 || value >= 180) return "CRITICAL";
  if (variance >= 30 || value >= 90) return "BOTTLENECK";
  return "SLOW";
}

function getFrameworkTimingModeForStep_(stepText) {
  const text = String(stepText || "").toLowerCase();
  if (text.indexOf("metadata_only") !== -1 || text.indexOf("metadata-only") !== -1) return "METADATA_ONLY";
  if (text.indexOf("template sheet did not exist") !== -1 || text.indexOf("no stored signature") !== -1) return "FIRST_BUILD";
  if (text.indexOf("full_build") !== -1 || text.indexOf("full build required") !== -1) return "FULL_REBUILD";
  if (text.indexOf("no_change") !== -1 || text.indexOf("template unchanged") !== -1) return "NO_CHANGE";
  return "";
}

function mergeFrameworkTimingModes_(current, next) {
  const rank = { "": 0, "NO_CHANGE": 1, "METADATA_ONLY": 2, "FULL_REBUILD": 3, "FIRST_BUILD": 4 };
  return (rank[next] || 0) > (rank[current] || 0) ? next : current;
}

function buildFrameworkTimingProcessSummaryRows_(detailRows) {
  const processMap = {};
  const currentRunByProcess = {};
  let globalRunSequence = 0;

  (detailRows || []).forEach(function(row) {
    const process = String(row[1] || "").trim();
    if (!process) return;

    const step = String(row[2] || "");
    const normalizedStep = step.trim().toLowerCase();
    const stepSeconds = Number(row[3]) || 0;
    const severity = String((row.length >= 7 ? row[5] : row[4]) || "OK").trim() || "OK";
    const timestamp = row[0] || "";
    const mode = getFrameworkTimingModeForStep_(step);

    if (normalizedStep === "start" || !currentRunByProcess[process]) {
      globalRunSequence += 1;
      currentRunByProcess[process] = {
        key: process + "||" + globalRunSequence,
        started: timestamp || new Date()
      };
    }

    const runInfo = currentRunByProcess[process];
    if (!processMap[runInfo.key]) {
      processMap[runInfo.key] = {
        process: process,
        steps: 0,
        runtime: 0,
        slowSteps: 0,
        worstSeverity: "OK",
        firstTimestamp: runInfo.started || timestamp,
        lastTimestamp: timestamp,
        mode: "",
        hasError: false
      };
    }

    const item = processMap[runInfo.key];
    item.steps += 1;
    item.runtime += stepSeconds;
    item.lastTimestamp = timestamp || item.lastTimestamp;
    item.mode = mergeFrameworkTimingModes_(item.mode, mode);
    if (/^error\b/i.test(normalizedStep)) item.hasError = true;
    if (severity !== "OK") item.slowSteps += 1;
    item.worstSeverity = worseTimingSeverity_(item.worstSeverity, severity);
  });

  return Object.keys(processMap).sort(function(a, b) {
    const left = processMap[a].firstTimestamp;
    const right = processMap[b].firstTimestamp;
    const leftTime = left instanceof Date ? left.getTime() : new Date(left).getTime();
    const rightTime = right instanceof Date ? right.getTime() : new Date(right).getTime();
    return (isNaN(leftTime) ? 0 : leftTime) - (isNaN(rightTime) ? 0 : rightTime);
  }).map(function(key) {
    const item = processMap[key];
    const benchmark = getFrameworkTimingBenchmarkForProcess_(item.process, item.mode);
    const variance = benchmark ? item.runtime - benchmark : "";
    const benchmarkSeverity = getFrameworkTimingBenchmarkSeverity_(item.runtime, benchmark);
    const status = item.hasError ? "CRITICAL" : (benchmark ? benchmarkSeverity : item.worstSeverity);
    const notes = [];
    if (item.firstTimestamp) notes.push("Run Started: " + formatTimingTimestampForSummary_(item.firstTimestamp));
    if (item.mode) notes.push("Mode: " + item.mode + " benchmark applied");
    if (variance !== "" && variance > 0) notes.push("Exceeded benchmark by " + Number(variance.toFixed(3)) + " sec");
    if (item.slowSteps) notes.push(item.slowSteps + " slow/bottleneck/critical step(s)");
    if (!notes.length) notes.push("Within target");
    return [
      item.process,
      Number(item.runtime.toFixed(3)),
      status === "OK" ? "PASS" : status,
      benchmark || "",
      variance === "" ? "" : Number(variance.toFixed(3)),
      notes.join("; ")
    ];
  });
}

function formatTimingTimestampForSummary_(value) {
  try {
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return String(value || "");
    return Utilities.formatDate(date, Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");
  } catch (err) {
    return String(value || "");
  }
}

function buildFrameworkTimingIssueRows_(detailRows, processRows) {
  const rows = (detailRows || []).filter(function(row) {
    const severity = String((row.length >= 7 ? row[5] : row[4]) || "").trim().toUpperCase();
    return severity === "SLOW" || severity === "BOTTLENECK" || severity === "CRITICAL";
  }).map(function(row) {
    const severity = String((row.length >= 7 ? row[5] : row[4]) || "");
    const recommendation = getPerformanceRecommendationForTimingStep_(String(row[1] || ""), String(row[2] || ""), Number(row[3]) || 0, severity);
    return [severity, row[1], row[3], getFrameworkTimingThresholdForSeverity_(severity), row[2], recommendation];
  });

  (processRows || []).forEach(function(row) {
    const status = String(row[2] || "").trim().toUpperCase();
    const process = String(row[0] || "").trim();
    const runtime = Number(row[1]) || 0;
    const benchmark = Number(row[3]) || 0;
    const variance = Number(row[4]) || 0;
    if (!process || status === "PASS" || status === "OK" || !benchmark || variance <= 0) return;
    rows.push([
      status,
      process,
      runtime,
      "Benchmark " + benchmark + " sec",
      "Process exceeded benchmark by " + Number(variance.toFixed(3)) + " sec",
      getPerformanceRecommendationForTimingStep_(process, "process exceeded benchmark", runtime, status)
    ]);
  });

  return rows;
}

function buildFrameworkTimingRecommendationRows_(issueRows) {
  const seen = {};
  const rows = [];

  (issueRows || []).forEach(function(row) {
    const process = String(row[1] || "").trim();
    const priority = String(row[0] || "").trim();
    const recommendation = String(row[5] || "").trim();
    const key = process + "|" + priority + "|" + recommendation;
    if (!process || seen[key]) return;
    seen[key] = true;
    rows.push([process, row[4] || "Performance issue", priority, recommendation, priority, "Open"]);
  });

  return rows;
}

function writeFrameworkPerformanceRecommendationsSheet_() {
  writeCombinedFrameworkTimingReport_();
}

function getPerformanceRecommendationForTimingStep_(process, step, seconds, severity) {
  const text = String(step || "").toLowerCase();
  const processName = String(process || "").toLowerCase();

  if (text.indexOf("process exceeded benchmark") !== -1) {
    if (processName.indexOf("template") !== -1) {
      return "Separate first-build/full-rebuild timing from metadata-only refresh, apply the governed benchmark for that mode, and optimize the largest full-build steps before treating this as a steady-state failure.";
    }
    if (processName.indexOf("dashboard quality") !== -1) {
      return "Convert iterative section writes to a staged memory buffer to reduce Apps Script range repaints.";
    }
    if (processName.indexOf("monthly") !== -1 || processName.indexOf("demo p") !== -1 || processName.indexOf("master list") !== -1) {
      return "Optimize 2D-array memory processing. Apply fast-path bypasses to heavy normalizers like date coercion.";
    }
    return "Review workflow for API loops or missing fast-path execution exits.";
  }

  if (text.indexOf("dashboard loaded for sections f-g") !== -1) {
    return "Dashboard config reads are capped to governed dashboard columns and Section F is batch-written; rerun Validate Templates and compare this step against the v1.5.38 baseline.";
  }
  if (text.indexOf("dashboard quality sections a-e updated") !== -1) {
    return "A-E section writes now skip redundant unmerge work in batch mode and merge adjacent style ranges to reduce Apps Script range calls.";
  }
  if (text.indexOf("error -") !== -1) {
    return "Resolve the runtime exception before performance tuning this workflow; timed errors are forced to CRITICAL even when the failure is fast.";
  }
  if (text.indexOf("resize rows") !== -1) {
    return "Review dashboard Template Row Count and row mode. Row resizing is the likely source of this resize cost.";
  }
  if (text.indexOf("resize columns") !== -1) {
    return "Review Dashboard Section C header count and remove obsolete columns only through Sheet Headers.";
  }
  if (text.indexOf("resize sheet") !== -1) {
    return "Split resize timing into rows and columns; v1.4.30 logs those separately for future runs.";
  }
  if (text.indexOf("dashboard quality") !== -1 && text.indexOf("saved") !== -1) {
    return "Use the contiguous A-O Dashboard Quality shell and repair stale shells before section writes. Keep section writes scoped between adjacent section titles.";
  }
  if (text.indexOf("apply row heights") !== -1) {
    return "Keep row-height work out of CP Due/Unlocked CP/Banner outputs. Use final forced 25px row lock only after Raw Data, Demo P, Master List, and Disenrolled processing because processing/data writes can expand rows.";
  }
  if (text.indexOf("create filter") !== -1) {
    return "Skip filter recreation when the existing filter already matches the governed template range.";
  }
  if (text.indexOf("clear sheet") !== -1 || text.indexOf("clear formats") !== -1) {
    return "Use create-template fast path for blank sheets and reserve clear/rebuild only for existing template updates with signature mismatch.";
  }

  return "Review this slow step and confirm it is necessary for the governed dashboard/template path.";
}

function worseTimingSeverity_(current, next) {
  const rank = { "OK": 0, "PASS": 0, "INFO": 0, "WARNING": 1, "SLOW": 2, "BOTTLENECK": 3, "CRITICAL": 4 };
  const c = rank[String(current || "OK").toUpperCase()] || 0;
  const n = rank[String(next || "OK").toUpperCase()] || 0;
  return n > c ? String(next || "OK") : String(current || "OK");
}

function appendRuntimeTimingToFrameworkTimingReport_(timing) {
  if (!timing || !timing.steps || timing.steps.length === 0) return;
  try {
    const sheet = ensureFrameworkTimingReport_();
    const rows = timing.steps.map(function(step) {
      return [
        step.timestamp || new Date(),
        step.processName || timing.processName || "",
        step.stepName || step.step || "",
        Number(step.stepSeconds || step.seconds || 0),
        Number(step.totalSeconds || step.total || 0),
        step.severity || getRuntimeTimingSeverity_(Number(step.stepSeconds || step.seconds || 0)),
        step.details || ""
      ];
    });
    appendDetailedLogsContinuous_(sheet, rows);
  } catch (err) {
    logBestEffortWarning_("[WARNING] Framework Timing Report append skipped | " + err.message);
  }
}

function refreshFrameworkTimingReport() {
  writeConsolidatedTimingSummaryReport_();
}

function writeFrameworkTimingPerformanceRecommendations() {
  writeFrameworkPerformanceRecommendationsSheet_();
}

function handleFormatDashboardValueHighlighting_(e) {
  if (!e || !e.range) return;

  // WAVE 4 OPTIMIZATION: Check sheet name string from e.range directly before range calculations
  const sheet = e.range.getSheet();
  if (sheet.getName() !== RFF_DASHBOARD_SHEET) return;

  const startRow = e.range.getRow();
  const endRow = e.range.getLastRow();
  const startCol = Math.max(e.range.getColumn(), 1);
  const endCol = Math.min(e.range.getLastColumn(), 14);
  if (startRow > endRow || startCol > endCol) return;

  const targetRange = sheet.getRange(startRow, startCol, endRow - startRow + 1, endCol - startCol + 1);
  const values = targetRange.getValues();
  const backgrounds = values.map(function(row) {
    return row.map(function(value) {
      return String(value === null || value === undefined ? "" : value).trim() === "" ? "#ffffff" : "#fff2cc";
    });
  });
  targetRange.setBackgrounds(backgrounds);
}

function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  if (sheet.getName() !== RFF_DASHBOARD_SHEET) return;

  handleFormatDashboardValueHighlighting_(e);

  const startColumn = e.range.getColumn();
  const endColumn = e.range.getLastColumn();
  if ([2, 5, 12].some(function(column) { return column >= startColumn && column <= endColumn; })) {
    recalculateDashboardHexCodes_(sheet);
  }
}

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
        .addItem("Dashboard Quality Workflow", "runDashboardQualityWorkflow")
        .addItem("Framework Smoke Validation", "runFrameworkSmokeValidation")
        .addItem("Full Quality Check", "runFullQualityCheck")
        .addItem("Format Dashboard Updates", "runFormatDashboardUpdates"))
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
    .addSubMenu(ui.createMenu("📇Index")
      .addItem("📇 Build / Update Index", "updateIndexSheet")
      .addItem("↩️ Restore Selected Archive Row", "restoreSheetFromActiveIndexRow")
      .addItem("🌐 Configure Index Restore Web App URL", "configureIndexRestoreWebAppUrl")
      .addItem("🔗 Configure Archive Spreadsheet ID", "configureArchiveSpreadsheetId"))
    .addToUi();
}

function isFrameworkTimingEnabled_() {
  try {
    return PropertiesService.getDocumentProperties().getProperty("RFF_FRAMEWORK_TIMING_ENABLED") !== "false";
  } catch (err) {
    logBestEffortWarning_("Framework timing toggle read skipped: " + err.message);
    return true;
  }
}

function toggleFrameworkTiming() {
  const enabled = isFrameworkTimingEnabled_();
  const nextValue = enabled ? "false" : "true";
  PropertiesService.getDocumentProperties().setProperty("RFF_FRAMEWORK_TIMING_ENABLED", nextValue);
  notify_("Framework Timing is now " + (nextValue === "true" ? "ON" : "OFF") + ".");
  return nextValue === "true";
}

function hideSystemSheets_() {
  return hideSystemSheetsNow();
}

function showSystemSheets_() {
  return showSystemSheetsNow();
}

function formatDashboard() {
  return rebuildFormatDashboardDefaults();
}

function saveActiveLayoutToDashboardSettings() {
  return runFrameworkTimed_("Save Active Layout as Rebuild Default", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const activeSheet = ss.getActiveSheet();
    const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);

    if (!activeSheet || !dashboardSheet) return null;
    const activeName = activeSheet.getName();

    if (activeName === RFF_DASHBOARD_SHEET) {
      return saveFormatDashboardConfigChanges_(dashboardSheet, timing);
    }

    // Structural Shield for Diagnostic Surfaces. If the user is on a diagnostic sheet, save Format Dashboard changes instead of blocking the save action.
    if (isSystemOrTestingSheet_(activeSheet) || activeName === RFF_VALIDATION_SHEET) {
      markFrameworkStep_(timing, "Diagnostic sheet selected; saving Format Dashboard configuration instead of capturing diagnostic layout: " + activeName);
      notify_("Active sheet '" + activeName + "' is a diagnostic/system surface, so its layout was not captured. Format Dashboard configuration changes were saved instead.");
      return saveFormatDashboardConfigChanges_(dashboardSheet, timing);
    }

    const dashboard = loadDashboardConfig_();
    const sheetDef = resolveSheetDefinitionForLayoutSnapshot_(dashboard, activeSheet);
    if (!sheetDef) {
      notify_("Active sheet layout does not match an active dashboard structural profile.");
      return null;
    }

    const snapshot = captureActiveSheetLayoutSnapshot_(activeSheet, sheetDef, dashboard);
    if (!snapshot.columnRows.length) return null;

    upsertDashboardColumnDefinitionRows_(dashboardSheet, snapshot.columnRows);
    upsertDashboardSheetDefinitionBaseColor_(dashboardSheet, sheetDef.sheetType, snapshot.baseColor);
    writeDashboardLayoutSnapshotSection_(dashboardSheet, snapshot);

    ss.toast("Layout default matrices recorded successfully into Format Dashboard config!", "Snapshot Saved");
    return snapshot;
  });
}

function saveFormatDashboardConfigChanges_(dashboardSheet, timing) {
  clearDashboardConfigCache_();
  const dashboard = loadDashboardConfig_(true);
  markFrameworkStep_(timing, "Format Dashboard configuration cache refreshed");
  styleDashboard_(dashboardSheet);
  SpreadsheetApp.getActiveSpreadsheet().toast(
    "Format Dashboard changes saved. Template/output rebuilds will use the updated dashboard definitions.",
    "Dashboard Saved",
    5
  );
  return dashboard;
}

function upsertDashboardSheetDefinitionBaseColor_(dashboardSheet, sheetType, baseColor) {
  const bounds = getDashboardSectionBounds_(dashboardSheet, RFF_SECTION_SHEETS);
  if (!bounds) return;
  const width = Math.max(dashboardSheet.getLastColumn(), 14);
  const headers = dashboardSheet.getRange(bounds.headerRow, 1, 1, width).getValues()[0].map(function(value) {
    return String(value || "").trim();
  });
  const sheetTypeIdx = headers.indexOf("Sheet Type");
  const baseColorIdx = headers.indexOf("Base Color");
  if (sheetTypeIdx === -1 || baseColorIdx === -1 || bounds.dataRowCount <= 0) return;

  const values = dashboardSheet.getRange(bounds.dataStartRow, 1, bounds.dataRowCount, width).getValues();
  let updated = false;
  values.forEach(function(row) {
    if (normalizeDashboardSheetTypeKey_(row[sheetTypeIdx]) === normalizeDashboardSheetTypeKey_(sheetType)) {
      row[baseColorIdx] = baseColor;
      updated = true;
    }
  });
  if (updated) {
    dashboardSheet.getRange(bounds.dataStartRow, 1, bounds.dataRowCount, width).setValues(values);
  }
}

function upsertDashboardColumnDefinitionRows_(dashboardSheet, columnRows) {
  const bounds = getDashboardSectionBounds_(dashboardSheet, RFF_SECTION_COLUMNS);
  if (!bounds) throw new Error("Format Dashboard Section G Column Definitions was not found.");
  const width = Math.max(dashboardSheet.getLastColumn(), 9);
  const existingRows = bounds.dataRowCount > 0
    ? dashboardSheet.getRange(bounds.dataStartRow, 1, bounds.dataRowCount, width).getValues()
    : [];
  const rowByHeader = {};
  const orderedHeaders = [];

  existingRows.forEach(function(row) {
    const header = normalizeHeader_(row[0]);
    if (!header) return;
    if (!rowByHeader[header]) orderedHeaders.push(header);
    rowByHeader[header] = row.slice(0, 9);
  });

  columnRows.forEach(function(row) {
    const header = normalizeHeader_(row[0]);
    if (!header) return;
    if (!rowByHeader[header]) orderedHeaders.push(header);
    rowByHeader[header] = row.slice(0, 9);
  });

  const outputRows = orderedHeaders.map(function(header) {
    return normalizeSectionRowForWidth_(rowByHeader[header], width);
  });
  ensureDashboardSectionDataCapacity_(dashboardSheet, bounds, outputRows.length, width);
  const refreshedBounds = getDashboardSectionBounds_(dashboardSheet, RFF_SECTION_COLUMNS);
  if (refreshedBounds.dataRowCount > 0) {
    dashboardSheet.getRange(refreshedBounds.dataStartRow, 1, refreshedBounds.dataRowCount, width).clearContent();
  }
  if (outputRows.length) {
    dashboardSheet.getRange(refreshedBounds.dataStartRow, 1, outputRows.length, width).setValues(outputRows);
  }
}

function getDashboardSectionBounds_(dashboardSheet, sectionName) {
  const values = dashboardSheet.getDataRange().getValues();
  const target = normalizeDashboardSectionTitle_(sectionName);
  let sectionRow = -1;
  let nextSectionRow = values.length + 1;
  for (let r = 0; r < values.length; r++) {
    const normalized = normalizeDashboardSectionTitle_(values[r][0]);
    if (normalized === target) {
      sectionRow = r + 1;
      continue;
    }
    if (sectionRow !== -1 && normalized.indexOf("SECTION ") === 0) {
      nextSectionRow = r + 1;
      break;
    }
  }
  if (sectionRow === -1) return null;
  const dataStartRow = sectionRow + 4;
  const dataRowCount = Math.max(nextSectionRow - dataStartRow, 0);
  return {
    sectionRow: sectionRow,
    headerRow: sectionRow + 2,
    dataStartRow: dataStartRow,
    nextSectionRow: nextSectionRow,
    dataRowCount: dataRowCount
  };
}

function ensureDashboardSectionDataCapacity_(dashboardSheet, bounds, requiredRows, width) {
  const availableRows = Math.max(bounds.nextSectionRow - bounds.dataStartRow, 0);
  if (requiredRows > availableRows) {
    const rowsToInsert = requiredRows - availableRows;
    const insertBefore = bounds.nextSectionRow <= dashboardSheet.getMaxRows() ? bounds.nextSectionRow : dashboardSheet.getMaxRows() + 1;
    if (insertBefore > dashboardSheet.getMaxRows()) {
      dashboardSheet.insertRowsAfter(dashboardSheet.getMaxRows(), rowsToInsert);
    } else {
      dashboardSheet.insertRowsBefore(insertBefore, rowsToInsert);
    }
  }
  if (dashboardSheet.getMaxColumns() < width) {
    dashboardSheet.insertColumnsAfter(dashboardSheet.getMaxColumns(), width - dashboardSheet.getMaxColumns());
  }
}

function writeDashboardLayoutSnapshotSection_(dashboardSheet, snapshot) {
  const width = Math.max(dashboardSheet.getLastColumn(), 14);
  const sectionName = "SECTION G - LAYOUT SNAPSHOT SETTINGS";
  const bounds = getDashboardSectionBounds_(dashboardSheet, sectionName);
  const border = snapshot.borderConfig;
  const level4Note = normalizeDashboardSheetTypeKey_(snapshot.sheetType) === SHEET_TYPE.MONTHLY_CHANGE
    ? "Ignored for Monthly Change strict 6-row layout"
    : snapshot.theme.level4;
  const rows = [
    normalizeSectionRowForWidth_([sectionName], width),
    normalizeSectionRowForWidth_(["Setting", "Value", "Sheet Type", "Sheet Name", "Notes"], width),
    normalizeSectionRowForWidth_(["Captured At", snapshot.capturedAt, snapshot.sheetType, snapshot.sheetName, "Snapshot source metadata"], width),
    normalizeSectionRowForWidth_(["Template Name", snapshot.templateName, snapshot.sheetType, snapshot.sheetName, "Recognized dashboard template"], width),
    normalizeSectionRowForWidth_(["Base Color Hex", snapshot.baseColor, snapshot.sheetType, snapshot.sheetName, "HSL source color"], width),
    normalizeSectionRowForWidth_(["Level 1 Lightness " + ((snapshot.hslLevels && snapshot.hslLevels.level1) || 60), snapshot.theme.level1, snapshot.sheetType, snapshot.sheetName, "Row 3/tab accent"], width),
    normalizeSectionRowForWidth_(["Level 2 Lightness " + ((snapshot.hslLevels && snapshot.hslLevels.level2) || 75), snapshot.theme.level2, snapshot.sheetType, snapshot.sheetName, "Header rows"], width),
    normalizeSectionRowForWidth_(["Level 3 Lightness " + ((snapshot.hslLevels && snapshot.hslLevels.level3) || 85), snapshot.theme.level3, snapshot.sheetType, snapshot.sheetName, "Title rows/current tab"], width),
    normalizeSectionRowForWidth_(["Level 4 Lightness " + ((snapshot.hslLevels && snapshot.hslLevels.level4) || 97), level4Note, snapshot.sheetType, snapshot.sheetName, "Alternating color level"], width),
    normalizeSectionRowForWidth_(["Border Color", border.color, snapshot.sheetType, snapshot.sheetName, "Global border default"], width),
    normalizeSectionRowForWidth_(["Border Style", border.style, snapshot.sheetType, snapshot.sheetName, "SpreadsheetApp.BorderStyle"], width),
    normalizeSectionRowForWidth_(["Border Boundaries", [border.top, border.left, border.bottom, border.right, border.vertical, border.horizontal].join("|"), snapshot.sheetType, snapshot.sheetName, "Top|Left|Bottom|Right|Vertical|Horizontal"], width)
  ];

  let startRow;
  if (bounds) {
    startRow = bounds.sectionRow;
    const clearRows = Math.max(bounds.nextSectionRow - bounds.sectionRow, rows.length);
    dashboardSheet.getRange(startRow, 1, clearRows, width).clearContent().setBackground("#FFFFFF");
  } else {
    startRow = dashboardSheet.getLastRow() + 2;
    if (dashboardSheet.getMaxRows() < startRow + rows.length - 1) {
      dashboardSheet.insertRowsAfter(dashboardSheet.getMaxRows(), startRow + rows.length - 1 - dashboardSheet.getMaxRows());
    }
  }

  dashboardSheet.getRange(startRow, 1, rows.length, width).setValues(rows);
  dashboardSheet.getRange(startRow, 1, 1, width).setFontWeight("bold").setBackground("#EDEDED");
  dashboardSheet.getRange(startRow + 1, 1, 1, width).setFontWeight("bold").setBackground("#D9EAF7");
  applyLayoutSnapshotBorder_(dashboardSheet.getRange(startRow, 1, rows.length, Math.min(width, 5)), snapshot.borderConfig);
}

function clearDiagnosticsAndTimingLogs() {
  return runFrameworkTimed_("Clear Timing Log", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const qualitySheet = ss.getSheetByName(RFF_TEST_DASHBOARD_SHEET);
    if (qualitySheet) {
      markFrameworkStep_(timing, "Dashboard Quality Report preserved - section definitions were not cleared");
    }

    const timingSheet = ss.getSheetByName(RFF_TIMING_SHEET);
    if (timingSheet) {
      const lastRow = timingSheet.getLastRow();
      const lastCol = timingSheet.getLastColumn();
      if (lastRow > HEADER_ROW && lastCol > 0) {
        timingSheet.getRange(HEADER_ROW + 1, 1, lastRow - HEADER_ROW, lastCol).clearContent();
      }
      markFrameworkStep_(timing, "Cleared diagnostic rows: " + RFF_TIMING_SHEET);
    }
    notify_("Timing log rows cleared. Dashboard Quality sections were preserved.");
  });
}

function clearDashboardConfigCache_() {
  const cache = getRuntimeCache_();
  cache.dashboardConfig = null;
  cache.dashboardConfigKey = "";
}

function getDashboardConfigCacheKey_() {
  return "STATIC_EXECUTION_CACHE";
}

function getRequiredFrameworkSheetTypes_() {
  return [
    RFF_SHEET_TYPES.BANNER,
    RFF_SHEET_TYPES.CARE_PLAN_DUE,
    RFF_SHEET_TYPES.UNLOCKED,
    RFF_SHEET_TYPES.RAW_DATA,
    RFF_SHEET_TYPES.DEMO_P,
    RFF_SHEET_TYPES.DISENROLLED_EXCLUSION,
    RFF_SHEET_TYPES.MASTER_LIST,
    RFF_SHEET_TYPES.MONTHLY_CHANGE
  ];
}

function getDefaultGlobalSettingsRows_() {
  const optionText = {
    "Header Row": "Numeric row number (e.g., 4)",
    "Data Start Row": "Numeric row number (e.g., 5)",
    "Freeze Rows": "Numeric count of frozen rows",
    "Freeze Columns": "Numeric count of frozen columns",
    "Row 1 Height": "Numeric pixel height",
    "Row 2 Height": "Numeric pixel height",
    "Row 3 Height": "Numeric pixel height",
    "Header Row Height": "Numeric pixel height",
    "Default Data Row Height": "Numeric pixel height",
    "Default Column Width": "Numeric pixel width",
    "Default Date Format": "Google Sheets number format (e.g., m/d/yy)",
    "Default Number Format": "Google Sheets number format or General",
    "Default Text Format": "Google Sheets number format (e.g., @)",
    "Default Data Wrap": "CLIP, WRAP, or OVERFLOW",
    "Default Horizontal Alignment": "left, center, or right",
    "Default Vertical Alignment": "top, middle, or bottom",
    "Standard Font": "Installed font family name",
    "Standard Font Size": "Numeric point size",
    "Standard Font Color": "Hex color (e.g., #000000)",
    "Title Font Size": "Numeric point size",
    "Title Info Font Size": "Numeric point size",
    "HSL Level 1 Lightness %": "Numeric percent for row 3/tab accents",
    "HSL Level 2 Lightness %": "Numeric percent for header rows",
    "HSL Level 3 Lightness %": "Numeric percent for title rows/current tab",
    "HSL Level 4 Lightness %": "Numeric percent for alternating colors",
    "Global Border Color": "Hex color (e.g., #CCCCCC)",
    "Global Border Style": "SOLID, SOLID_MEDIUM, DOTTED, or DASHED",
    "Template Version": "Framework version string"
  };
  return [
    ["Header Row", RFF_DEFAULTS.headerRow],
    ["Data Start Row", RFF_DEFAULTS.dataStartRow],
    ["Freeze Rows", RFF_DEFAULTS.freezeRows],
    ["Freeze Columns", RFF_DEFAULTS.freezeColumns],
    ["Row 1 Height", RFF_DEFAULTS.row1Height],
    ["Row 2 Height", RFF_DEFAULTS.row2Height],
    ["Row 3 Height", RFF_DEFAULTS.row3Height],
    ["Header Row Height", RFF_DEFAULTS.headerRowHeight],
    ["Default Data Row Height", RFF_DEFAULTS.dataRowHeight],
    ["Default Column Width", RFF_DEFAULTS.defaultColumnWidth],
    ["Default Date Format", RFF_DEFAULTS.defaultDateFormat],
    ["Default Number Format", RFF_DEFAULTS.defaultNumberFormat],
    ["Default Text Format", RFF_DEFAULTS.defaultTextFormat],
    ["Default Data Wrap", RFF_DEFAULTS.defaultDataWrap],
    ["Default Horizontal Alignment", RFF_DEFAULTS.defaultHorizontalAlignment],
    ["Default Vertical Alignment", RFF_DEFAULTS.defaultVerticalAlignment],
    ["Standard Font", RFF_DEFAULTS.standardFont],
    ["Standard Font Size", RFF_DEFAULTS.standardFontSize],
    ["Standard Font Color", RFF_DEFAULTS.standardFontColor],
    ["Title Font Size", RFF_DEFAULTS.titleFontSize],
    ["Title Info Font Size", RFF_DEFAULTS.titleInfoFontSize],
    ["HSL Level 1 Lightness %", 60],
    ["HSL Level 2 Lightness %", 75],
    ["HSL Level 3 Lightness %", 85],
    ["HSL Level 4 Lightness %", 97],
    ["HSL Level 5 Lightness %", 99],
    ["Global Border Color", "#CCCCCC"],
    ["Global Border Style", "SOLID"],
    ["Template Version", RFF_DEFAULTS.templateVersion]
  ].map(function(row) {
    return [row[0], row[1], optionText[row[0]] || "Dashboard-governed setting"];
  });
}

function getDefaultTitleRowRows_() {
  return [
    ["GLOBAL", 1, "Report Title", "Sheet Definition", "", "A1", 25, 14, "Bold", "Level 3", "Left", "Overflow", "Default title row"],
    ["GLOBAL", 2, "Date Range", "Runtime Month", "Date", "A2:D2", 20, 10, "Normal", "Level 3", "Left", "Overflow", "A2=Date, B2=start, C2=to, D2=end"],
    ["GLOBAL", 3, "Spacer", "None", "", "A3:D3", 10, 10, "Normal", "Level 1", "Left", "Clip", "Spacer row"],
    ["GLOBAL", 4, "Header Row", "Dashboard Headers", "", "Row 4", 40, 10, "Bold", "Level 2", "Left", "Wrap", "Governed header row"]
  ];
}

function getDefaultSheetDefinitionRows_() {
  return [
  ["Banners", "Banner Report", "Template - Banner Report", "Banners mm.yy", "#65A9CC", true, "Last Day of Prompt Month", 100, "FIXED", 100, 25],
  ["CP Due Date", "Care Plan Due Date Report", "Template - Care Plan Due", "CP Due mm.yy", "#65CC99", true, "Pulled From Spreadsheet", 100, "FIXED", 100, 25],
  ["Unlock CP", "Unlocked Care Plan Report", "Template - Unlocked Care Plan", "Unlock CP mm.yy", "#65CCC3", true, "Pulled From Spreadsheet", 100, "FIXED", 100, 25],
  ["Raw Data", "Raw Data", "Template - Raw Data", "Raw Data mm.yy", "#657FCC", true, "Last Day of Prompt Month", 100, "FIXED", 100, 25],
  ["Refined Data", "Refined Data", "Template - Refined Data", "Refined Data", "#657FCC", true, "Last Day of Prompt Month", 100, "FIXED", 100, 25],
  ["Disenrolled Exclusion", "Disenrolled Exclusion", "Template - Disenrolled Exclusion", "Disenrolled", "#CC65A1", true, "Last Day of Prompt Month", 100, "FIXED", 100, 25],
  ["Master List", "Master List", "Template - Master List", "Master List mm.yy", "#7665CC", true, "Last Day of Prompt Month", 100, "FIXED", 100, 25],
  ["Monthly Change", "Monthly Change Report", "Template - Monthly Change", "Monthly Change mm.yy", "#A165CC", true, "Last Day of Prompt Month", 100, "FIXED", 100, 25]
];
}

function getDefaultSheetDefinitionRowsWithColumnCounts_() {
  const counts = {};
  getDefaultSheetHeaderRows_().forEach(function(row) {
    const sheetType = normalizeDashboardSheetTypeKey_(row[0]);
    const order = numberOrDefault_(row[1], 0);
    if (!sheetType || !order) return;
    counts[sheetType] = Math.max(counts[sheetType] || 0, order);
  });

  return getDefaultSheetDefinitionRows_().map(function(row) {
    const sheetType = normalizeDashboardSheetTypeKey_(row[0]);
    return row.slice(0, 8).concat([counts[sheetType] || ""], row.slice(8));
  });
}

function getDefaultBehaviorRows_() {
  return [
  ["Banners", true, true, true, false, true, "HIDDEN"],
  ["CP Due Date", true, true, true, false, true, "HIDDEN"],
  ["Unlock CP", true, true, true, false, true, "HIDDEN"],
  ["Raw Data", true, true, true, false, true, "HIDDEN"],
  ["Refined Data", true, true, true, false, true, "VISIBLE"],
  ["Disenrolled Exclusion", true, true, true, false, true, "VISIBLE"],
  ["Master List", true, true, true, false, true, "VISIBLE"],
  ["Monthly Change", true, true, false, true, true, "VISIBLE"]
];
}

function getDefaultTabOrganizationRows_() {
  return [
    ["Index", "System & Configuration", "1", ""],
    ["Refined Data", "Core Operational", "2", ""],
    ["Disenrolled Exclusion", "Core Operational", "10", ""],
    ["Master List", "Monthly Active", "21", "Dynamic Ranking"],
    ["Monthly Change", "Monthly Active", "22", "Dynamic Ranking"],
    ["Raw Data", "Monthly Active", "23", "Dynamic Ranking"],
    ["Banners", "Monthly Sub-Reports", "24", "Dynamic Ranking"],
    ["CP Due", "Monthly Sub-Reports", "25", "Dynamic Ranking"],
    ["Unlock CP", "Monthly Sub-Reports", "26", "Dynamic Ranking"],
    ["Source - Banners", "Source Data", "27", "Dynamic Ranking"],
    ["Source - Raw Data", "Source Data", "28", "Dynamic Ranking"],
    ["Source - CP Due", "Source Data", "29", "Dynamic Ranking"],
    ["Source - Unlocked CP", "Source Data", "30", "Dynamic Ranking"],
    ["B", "Unformatted", "300", ""],
    ["CD", "Unformatted", "301", ""],
    ["UC", "Unformatted", "302", ""],
    ["RD", "Unformatted", "303", ""],
    ["Archive - Demo P", "Core Operational", "350", ""],
    ["Framework Timing Report", "System & Configuration", "500", ""],
    ["Dashboard Quality Report", "System & Configuration", "501", ""],
    ["Format Dashboard", "System & Configuration", "502", ""],
    ["Template - Banner Report", "Template", "801", ""],
    ["Template - Care Plan Due", "Template", "802", ""],
    ["Template - Unlocked Care Plan", "Template", "803", ""],
    ["Template - Raw Data", "Template", "804", ""],
    ["Template - Refined Data", "Template", "805", ""],
    ["Template - Disenrolled Exclusion", "Template", "806", ""],
    ["Template - Master List", "Template", "807", ""],
    ["Template - Monthly Change", "Template", "808", ""],
    ["RFF_BASE_TEMPLATE", "System & Configuration", "809", ""]
  ];
}

function getDefaultSystemSurfaceRows_() {
  return [
    ["Framework Timing Report", "Framework Timing Report", 500, true, false, false, true, false, "VISIBLE", "220,180,475,140,140,260,120,120", RFF_SYSTEM_SHEET_TITLE_COLOR, "#000000", "Unified timing report surface"],
    ["Dashboard Quality Report", "Dashboard Quality Report", 501, true, false, false, true, false, "VISIBLE", "250,325,225,200,150,100,105", RFF_SYSTEM_SHEET_TITLE_COLOR, "#000000", "Unified quality report surface"],
    [RFF_DASHBOARD_SHEET, "Format Dashboard", 502, true, false, false, true, false, "VISIBLE", "250,160,240,180,130,120,160,150,140,105,105,105,105,105", RFF_SYSTEM_SHEET_TITLE_COLOR, "#000000", "Dashboard configuration surface"],
    ["Index", "Index", 1, true, false, false, true, false, "VISIBLE", "160,160,160,160,30,160,160,160,160,160", RFF_SYSTEM_SHEET_TITLE_COLOR, "#000000", "Workbook navigation surface"],
    [DEMO_P_ARCHIVE_SHEET, DEMO_P_ARCHIVE_SHEET, 350, true, false, false, false, true, "HIDDEN", "105", "#657FCC", "#000000", "Hidden Demo P row archive"],
    [RFF_BASE_TEMPLATE_NAME, RFF_BASE_TEMPLATE_NAME, 809, false, false, false, false, true, "HIDDEN", "105", RFF_SYSTEM_SHEET_TITLE_COLOR, "#000000", "Built only by buildAllTemplatesAndValidate"]
  ];
}

function getDefaultSheetHeaderRows_() {
  const rows = [];
  const headerSets = getDefaultHeaderSets_();


  Object.keys(headerSets).forEach(function(sheetType) {
    headerSets[sheetType].forEach(function(item, index) {
      rows.push([sheetType, index + 1, item.header, item.source || "Populates via process"]);
    });
  });


  return rows;
}

function getDefaultHeaderSets_() {


  return {
    [RFF_SHEET_TYPES.BANNER]: [
      h_("Last Name", "Primary Data"),
      h_("First Name", "Primary Data"),
      h_("Participant PMR#", "Primary Data"),
      h_("Safety - 2 Person", "Primary Data"),
      h_("Wanderer", "Primary Data"),
      h_("Interpreter Needed", "Primary Data"),
      h_("Fall Risk", "Primary Data"),
      h_("DPOA or Guardian Active", "Primary Data"),
      h_("Palliative Care", "Primary Data")
    ],
    [RFF_SHEET_TYPES.CARE_PLAN_DUE]: [
      h_("Participant Name", "Primary Data"),
      h_("Enrollment Date", "Primary Data"),
      h_("Last Care Plan", "Primary Data"),
      h_("Next Care Plan Due", "Primary Data"),
      h_("CP Type", "Primary Data")
    ],
    [RFF_SHEET_TYPES.UNLOCKED]: [
      h_("Participant Name", "Primary Data"),
      h_("PMR #", "Primary Data"),
      h_("IDT Meeting Date", "Primary Data"),
      h_("Care Plan Start Date", "Primary Data")
    ],
    [RFF_SHEET_TYPES.RAW_DATA]: [
      h_("Last Name", "Unformatted Data"),
      h_("First Name", "Unformatted Data"),
      h_("Preferred Name", "Unformatted Data"),
      h_("Date of Birth", "Unformatted Data"),
      h_("Participant PMR#", "Unformatted Data"),
      h_("Phone Number", "Unformatted Data"),
      h_("Address Line 1", "Unformatted Data"),
      h_("Address Line 2", "Unformatted Data"),
      h_("City", "Unformatted Data"),
      h_("State", "Unformatted Data"),
      h_("Zip", "Unformatted Data"),
      h_("Oxygen", "Unformatted Data"),
      h_("Primary Language", "Unformatted Data"),
      h_("Residence Type", "Unformatted Data"),
      h_("Contact - Last Name", "Unformatted Data"),
      h_("Contact - First Name", "Unformatted Data"),
      h_("Type of Contact", "Unformatted Data"),
      h_("Contact - Primary Language", "Unformatted Data"),
      h_("Relationship", "Unformatted Data"),
      h_("AD1 - Phone", "Unformatted Data"),
      h_("AD1 - Phone Valid Dates From", "Unformatted Data"),
      h_("AD1 - Phone Valid Dates To", "Unformatted Data"),
      h_("AD2 - Phone", "Unformatted Data"),
      h_("AD2 - Phone Valid Dates From", "Unformatted Data"),
      h_("AD2 - Phone Valid Dates To", "Unformatted Data"),
      h_("AD3 - Phone", "Unformatted Data"),
      h_("AD3 - Phone Valid Dates From", "Unformatted Data"),
      h_("AD3 - Phone Valid Dates To", "Unformatted Data"),
      h_("Company", "Unformatted Data"),
      h_("Contact - Notes", "Unformatted Data"),
      h_("Capitation Date", "Unformatted Data"),
      h_("Enrollment Status", "Unformatted Data"),
      h_("Disenrollment Date", "Unformatted Data"),
      h_("Disenrollment Effective Date", "Unformatted Data"),
      h_("Disenrollment Reason", "Unformatted Data"),
      h_("Date of Death", "Unformatted Data"),
      h_("Caseload - Social Work", "Unformatted Data"),
      h_("Caseload - RN", "Unformatted Data"),
      h_("Caseload - PCP", "Unformatted Data"),
      h_("Caseload - HCC", "Unformatted Data"),
      h_("Caseload - Activities", "Unformatted Data"),
      h_("Caseload - OT", "Unformatted Data"),
      h_("Caseload - PT", "Unformatted Data"),
      h_("Caseload - RD", "Unformatted Data"),
      h_("Caseload - Supervising MD", "Unformatted Data"),
      h_("Additional Important Information", "Unformatted Data"),
      h_("Notes", "Unformatted Data"),
      h_("Safety - 2 Person", "Banners"),
      h_("Wanderer", "Banners"),
      h_("Interpreter Needed", "Banners"),
      h_("Fall Risk", "Banners"),
      h_("DPOA or Guardian Active", "Banners"),
      h_("Palliative Care", "Banners"),
      h_("Primary PMR Row", "Format Raw Data")
    ],
    [RFF_SHEET_TYPES.DEMO_P]: [
      h_("Last Name", "Raw Data"),
      h_("First Name", "Raw Data"),
      h_("Preferred Name", "Raw Data"),
      h_("Date of Birth", "Raw Data"),
      h_("Participant PMR#", "Raw Data"),
      h_("Phone Number", "Raw Data"),
      h_("Address Line 1", "Raw Data"),
      h_("Address Line 2", "Raw Data"),
      h_("City", "Raw Data"),
      h_("State", "Raw Data"),
      h_("Zip", "Raw Data"),
      h_("Oxygen", "Raw Data"),
      h_("Primary Language", "Raw Data"),
      h_("Residence Type", "Raw Data"),
      h_("Contact - Last Name", "Raw Data"),
      h_("Contact - First Name", "Raw Data"),
      h_("Type of Contact", "Raw Data"),
      h_("Contact - Primary Language", "Raw Data"),
      h_("Relationship", "Raw Data"),
      h_("AD1 - Phone", "Raw Data"),
      h_("AD1 - Phone Valid Dates From", "Raw Data"),
      h_("AD1 - Phone Valid Dates To", "Raw Data"),
      h_("AD2 - Phone", "Raw Data"),
      h_("AD2 - Phone Valid Dates From", "Raw Data"),
      h_("AD2 - Phone Valid Dates To", "Raw Data"),
      h_("AD3 - Phone", "Raw Data"),
      h_("AD3 - Phone Valid Dates From", "Raw Data"),
      h_("AD3 - Phone Valid Dates To", "Raw Data"),
      h_("Company", "Raw Data"),
      h_("Contact - Notes", "Raw Data"),
      h_("Capitation Date", "Raw Data"),
      h_("Enrollment Status", "Raw Data"),
      h_("Disenrollment Date", "Raw Data"),
      h_("Disenrollment Effective Date", "Raw Data"),
      h_("Disenrollment Reason", "Raw Data"),
      h_("Date of Death", "Raw Data"),
      h_("Caseload - Social Work", "Raw Data"),
      h_("Caseload - RN", "Raw Data"),
      h_("Caseload - PCP", "Raw Data"),
      h_("Caseload - HCC", "Raw Data"),
      h_("Caseload - Activities", "Raw Data"),
      h_("Caseload - OT", "Raw Data"),
      h_("Caseload - PT", "Raw Data"),
      h_("Caseload - RD", "Raw Data"),
      h_("Caseload - Supervising MD", "Raw Data"),
      h_("Additional Important Information", "Raw Data"),
      h_("Safety - 2 Person", "Raw Data"),
      h_("Wanderer", "Raw Data"),
      h_("Interpreter Needed", "Raw Data"),
      h_("Fall Risk", "Raw Data"),
      h_("DPOA or Guardian Active", "Raw Data"),
      h_("Palliative Care", "Raw Data"),
      h_("Primary PMR Row", "Demo P process"),
      h_("Banner Summary", "Demo P process"),
      h_("Phone 1 - Label", "Demo P process"),
      h_("Phone 1 - Value", "Demo P process"),
      h_("Phone 2 - Label", "Demo P process"),
      h_("Phone 2 - Value", "Demo P process"),
      h_("Phone 3 - Label", "Demo P process"),
      h_("Phone 3 - Value", "Demo P process"),
      h_("Phone 4 - Label", "Demo P process"),
      h_("Phone 4 - Value", "Demo P process"),
      h_("Address 1 - Street", "Demo P process"),
      h_("Custom Field 1 - Label", "Demo P process"),
      h_("Custom Field 1 - Value", "Demo P process"),
      h_("Notes", "Demo P process"),
      h_("Contact - 1", "Demo P process"),
      h_("Contact - 2", "Demo P process"),
      h_("Contact - 3", "Demo P process"),
      h_("Contact - 4", "Demo P process"),
      h_("Contact - 5", "Demo P process"),
      h_("Contact - 6", "Demo P process"),
      h_("Contact - 7", "Demo P process"),
      h_("Contact - 8", "Demo P process"),
      h_("Contact - Summary", "Demo P process"),
      h_("Participant Name", "Demo P process"),
      h_("Name", "Demo P process"),
      h_("Demo P Update Status", "Demo P process"),
      h_("Demo P Update Month", "Demo P process"),
      h_("Demo P Source Sheet", "Demo P process")
    ],
    [RFF_SHEET_TYPES.DISENROLLED_EXCLUSION]: [
      h_("Participant Name", "Demo P"),
      h_("Name", "Demo P"),
      h_("Preferred Name", "Demo P"),
      h_("Date of Birth", "Demo P"),
      h_("Address 1 - Street", "Demo P"),
      h_("City", "Demo P"),
      h_("State", "Demo P"),
      h_("Zip", "Demo P"),
      h_("Phone 1 - Value", "Demo P"),
      h_("Phone 2 - Value", "Demo P"),
      h_("Participant PMR#", "Demo P"),
      h_("Primary Language", "Demo P"),
      h_("Residence Type", "Demo P"),
      h_("Notes", "Demo P"),
      h_("IDT Meeting Date", "Demo P"),
      h_("Care Plan Start Date", "Demo P"),
      h_("Enrollment Date", "Demo P"),
      h_("Last Care Plan", "Demo P"),
      h_("Next Care Plan Due", "Demo P"),
      h_("CP Type", "Demo P"),
      h_("Oxygen", "Demo P"),
      h_("Caseload - Social Work", "Demo P"),
      h_("Caseload - RN", "Demo P"),
      h_("Caseload - PCP", "Demo P"),
      h_("Caseload - HCC", "Demo P"),
      h_("Caseload - Activities", "Demo P"),
      h_("Caseload - OT", "Demo P"),
      h_("Caseload - PT", "Demo P"),
      h_("Caseload - RD", "Demo P"),
      h_("Caseload - Supervising MD", "Demo P"),
      h_("Capitation Date", "Demo P"),
      h_("Enrollment Status", "Demo P"),
      h_("Disenrollment Date", "Demo P"),
      h_("Disenrollment Effective Date", "Demo P"),
      h_("Disenrollment Reason", "Demo P"),
      h_("Date of Death", "Demo P"),
      h_("Contact - Last Name", "Demo P"),
      h_("Contact - First Name", "Demo P"),
      h_("Type of Contact", "Demo P"),
      h_("Contact - Primary Language", "Demo P"),
      h_("Relationship", "Demo P"),
      h_("AD1 - Phone", "Demo P"),
      h_("AD1 - Phone Valid Dates From", "Demo P"),
      h_("AD1 - Phone Valid Dates To", "Demo P"),
      h_("AD2 - Phone", "Demo P"),
      h_("AD2 - Phone Valid Dates From", "Demo P"),
      h_("AD2 - Phone Valid Dates To", "Demo P"),
      h_("AD3 - Phone", "Demo P"),
      h_("AD3 - Phone Valid Dates From", "Demo P"),
      h_("AD3 - Phone Valid Dates To", "Demo P"),
      h_("Company", "Demo P"),
      h_("Contact - Notes", "Demo P"),
      h_("Safety - 2 Person", "Demo P"),
      h_("Wanderer", "Demo P"),
      h_("Interpreter Needed", "Demo P"),
      h_("Fall Risk", "Demo P"),
      h_("DPOA or Guardian Active", "Demo P"),
      h_("Palliative Care", "Demo P"),
      h_("Last Name", "Demo P"),
      h_("First Name", "Demo P"),
      h_("Phone Number", "Demo P"),
      h_("Address Line 1", "Demo P"),
      h_("Address Line 2", "Demo P"),
      h_("Additional Important Information", "Demo P"),
      h_(DISENROLLED_EXCLUSION_ADDED_HEADER, "Framework audit"),
      h_("PMR #", "Demo P")
    ],
    [RFF_SHEET_TYPES.MASTER_LIST]: [
      h_("Participant Name", "Demo P"),
      h_("Name", "Demo P"),
      h_("Preferred Name", "Demo P"),
      h_("Date of Birth", "Demo P"),
      h_("Address 1 - Street", "Demo P"),
      h_("City", "Demo P"),
      h_("State", "Demo P"),
      h_("Zip", "Demo P"),
      h_("Phone 1 - Value", "Demo P"),
      h_("Phone 2 - Value", "Demo P"),
      h_("Participant PMR#", "Demo P"),
      h_("Primary Language", "Demo P"),
      h_("Residence Type", "Demo P"),
      h_("Notes", "Demo P"),
      h_("IDT Meeting Date", "Demo P"),
      h_("Care Plan Start Date", "Demo P"),
      h_("Enrollment Date", "Demo P"),
      h_("Last Care Plan", "Demo P"),
      h_("Next Care Plan Due", "Demo P"),
      h_("CP Type", "Demo P"),
      h_("Completed", "Demo P"),
      h_("Face Sheet", "Demo P"),
      h_("HHA", "Demo P"),
      h_("Oxygen", "Demo P"),
      h_("Equipment", "Demo P"),
      h_("Caseload - Social Work", "Demo P"),
      h_("Caseload - RN", "Demo P"),
      h_("Caseload - PCP", "Demo P"),
      h_("Caseload - HCC", "Demo P"),
      h_("Caseload - Activities", "Demo P"),
      h_("Caseload - OT", "Demo P"),
      h_("Caseload - PT", "Demo P"),
      h_("Caseload - RD", "Demo P"),
      h_("Caseload - Supervising MD", "Demo P"),
      h_("Capitation Date", "Demo P"),
      h_("Enrollment Status", "Demo P"),
      h_("Primary PMR Row", "Demo P")
    ],
    [RFF_SHEET_TYPES.MONTHLY_CHANGE]: [
      h_("Last Name", "Populates via process Compare Raw Data to Raw Data"),
      h_("First Name", "Populates via process Compare Raw Data to Raw Data"),
      h_("Preferred Name", "Populates via process Compare Raw Data to Raw Data"),
      h_("Date of Birth", "Populates via process Compare Raw Data to Raw Data"),
      h_("Participant PMR#", "Populates via process Compare Raw Data to Raw Data"),
      h_("Phone Number", "Populates via process Compare Raw Data to Raw Data"),
      h_("Address Line 1", "Populates via process Compare Raw Data to Raw Data"),
      h_("Address Line 2", "Populates via process Compare Raw Data to Raw Data"),
      h_("City", "Populates via process Compare Raw Data to Raw Data"),
      h_("State", "Populates via process Compare Raw Data to Raw Data"),
      h_("Zip", "Populates via process Compare Raw Data to Raw Data"),
      h_("Oxygen", "Populates via process Compare Raw Data to Raw Data"),
      h_("Primary Language", "Populates via process Compare Raw Data to Raw Data"),
      h_("Residence Type", "Populates via process Compare Raw Data to Raw Data"),
      h_("Contact - Last Name", "Populates via process Compare Raw Data to Raw Data"),
      h_("Contact - First Name", "Populates via process Compare Raw Data to Raw Data"),
      h_("Type of Contact", "Populates via process Compare Raw Data to Raw Data"),
      h_("Contact - Primary Language", "Populates via process Compare Raw Data to Raw Data"),
      h_("Relationship", "Populates via process Compare Raw Data to Raw Data"),
      h_("AD1 - Phone", "Populates via process Compare Raw Data to Raw Data"),
      h_("AD1 - Phone Valid Dates From", "Populates via process Compare Raw Data to Raw Data"),
      h_("AD1 - Phone Valid Dates To", "Populates via process Compare Raw Data to Raw Data"),
      h_("AD2 - Phone", "Populates via process Compare Raw Data to Raw Data"),
      h_("AD2 - Phone Valid Dates From", "Populates via process Compare Raw Data to Raw Data"),
      h_("AD2 - Phone Valid Dates To", "Populates via process Compare Raw Data to Raw Data"),
      h_("AD3 - Phone", "Populates via process Compare Raw Data to Raw Data"),
      h_("AD3 - Phone Valid Dates From", "Populates via process Compare Raw Data to Raw Data"),
      h_("AD3 - Phone Valid Dates To", "Populates via process Compare Raw Data to Raw Data"),
      h_("Company", "Populates via process Compare Raw Data to Raw Data"),
      h_("Contact - Notes", "Populates via process Compare Raw Data to Raw Data"),
      h_("Capitation Date", "Populates via process Compare Raw Data to Raw Data"),
      h_("Enrollment Status", "Populates via process Compare Raw Data to Raw Data"),
      h_("Disenrollment Date", "Populates via process Compare Raw Data to Raw Data"),
      h_("Disenrollment Effective Date", "Populates via process Compare Raw Data to Raw Data"),
      h_("Disenrollment Reason", "Populates via process Compare Raw Data to Raw Data"),
      h_("Date of Death", "Populates via process Compare Raw Data to Raw Data"),
      h_("Caseload - Social Work", "Populates via process Compare Raw Data to Raw Data"),
      h_("Caseload - RN", "Populates via process Compare Raw Data to Raw Data"),
      h_("Caseload - PCP", "Populates via process Compare Raw Data to Raw Data"),
      h_("Caseload - HCC", "Populates via process Compare Raw Data to Raw Data"),
      h_("Caseload - Activities", "Populates via process Compare Raw Data to Raw Data"),
      h_("Caseload - OT", "Populates via process Compare Raw Data to Raw Data"),
      h_("Caseload - PT", "Populates via process Compare Raw Data to Raw Data"),
      h_("Caseload - RD", "Populates via process Compare Raw Data to Raw Data"),
      h_("Caseload - Supervising MD", "Populates via process Compare Raw Data to Raw Data"),
      h_("Additional Important Information", "Populates via process Compare Raw Data to Raw Data"),
      h_("Notes", "Populates via process Compare Raw Data to Raw Data"),
      h_("Safety - 2 Person", "Populates via process Compare Raw Data to Raw Data"),
      h_("Wanderer", "Populates via process Compare Raw Data to Raw Data"),
      h_("Interpreter Needed", "Populates via process Compare Raw Data to Raw Data"),
      h_("Fall Risk", "Populates via process Compare Raw Data to Raw Data"),
      h_("DPOA or Guardian Active", "Populates via process Compare Raw Data to Raw Data"),
      h_("Palliative Care", "Populates via process Compare Raw Data to Raw Data"),
      h_("Primary PMR Row", "Populates via process Compare Raw Data to Raw Data")
    ]
  };
}

function ensureRequiredMasterListTemplate_(dashboard, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSheetByName(MASTER_LIST_TEMPLATE_SHEET)) return ss.getSheetByName(MASTER_LIST_TEMPLATE_SHEET);

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

function loadDashboardConfig_(forceRefresh) {
  const cacheKey = getDashboardConfigCacheKey_();


  const cache = getRuntimeCache_();
  if (!forceRefresh && cache.dashboardConfig && cache.dashboardConfigKey === cacheKey) {
    return cache.dashboardConfig;
  }


  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);


  if (!sheet) {
    try {
      sheet = SpreadsheetApp.openById(ss.getId()).getSheetByName(RFF_DASHBOARD_SHEET);
    } catch (err) {
      void err;
      // Fallback can fail in detached or unauthorized execution contexts; preserve the canonical missing-dashboard error below.
    }
  }


  if (!sheet) {
    throw new Error("Format Dashboard is missing. Run Setup / Refresh Dashboard first.");
  }


  const dashboardIndex = buildDashboardSectionIndex_(sheet);
  const globals = loadGlobalSettings_(dashboardIndex);
  const titleRows = loadTitleRows_(dashboardIndex, globals);
  const sheetDefinitions = loadSheetDefinitions_(dashboardIndex);
  const systemSurfaces = loadSystemSurfaces_(dashboardIndex);
  const tabOrganization = loadTabOrganization_(dashboardIndex);
  const sheetHeaders = loadSheetHeaders_(dashboardIndex);
  const columnDefinitions = loadColumnDefinitions_(dashboardIndex);
  const behaviors = loadSheetBehaviors_(dashboardIndex);


  const dashboard = {
    globals: globals,
    titleRows: titleRows,
    sheetDefinitions: sheetDefinitions,
    systemSurfaces: systemSurfaces,
    tabOrganization: tabOrganization,
    sheetHeaders: sheetHeaders,
    columnDefinitions: columnDefinitions,
    behaviors: behaviors,
    sectionIndex: dashboardIndex
  };


  cache.dashboardConfig = dashboard;
  cache.dashboardConfigKey = cacheKey;


  return dashboard;
}

function buildDashboardSectionIndex_(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastCol = Math.max(1, Math.min(Math.max(sheet.getLastColumn(), 1), RFF_DASHBOARD_CONFIG_MAX_READ_COLS));
  const values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  const starts = {};


  for (let i = 0; i < values.length; i++) {
    const section = normalizeDashboardSectionTitle_(values[i][0]);
    if (section.indexOf("SECTION ") === 0) {
      starts[section] = i;
    }
  }


  return {
    sheet: sheet,
    values: values,
    starts: starts
  };
}

function loadGlobalSettings_(sheet) {
  sheet = sheet || loadDashboardConfig_().sectionIndex;
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_GLOBAL);
  const settings = {};


  rows.forEach(function(row) {
    const key = String(row[0] || "").trim();
    if (!key) return;
    settings[key] = row[1];
  });


  return {
    headerRow: numberOrDefault_(settings["Header Row"], RFF_DEFAULTS.headerRow),
    dataStartRow: numberOrDefault_(settings["Data Start Row"], RFF_DEFAULTS.dataStartRow),
    freezeRows: numberOrDefault_(settings["Freeze Rows"], RFF_DEFAULTS.freezeRows),
    freezeColumns: numberOrDefault_(settings["Freeze Columns"], RFF_DEFAULTS.freezeColumns),
    row1Height: numberOrDefault_(settings["Row 1 Height"], RFF_DEFAULTS.row1Height),
    row2Height: numberOrDefault_(settings["Row 2 Height"], RFF_DEFAULTS.row2Height),
    row3Height: numberOrDefault_(settings["Row 3 Height"], RFF_DEFAULTS.row3Height),
    headerRowHeight: numberOrDefault_(settings["Header Row Height"], RFF_DEFAULTS.headerRowHeight),
    dataRowHeight: numberOrDefault_(settings["Default Data Row Height"], RFF_DEFAULTS.dataRowHeight),
    defaultDateFormat: String(settings["Default Date Format"] || RFF_DEFAULTS.defaultDateFormat),
    standardFont: String(settings["Standard Font"] || RFF_DEFAULTS.standardFont),
    standardFontSize: numberOrDefault_(settings["Standard Font Size"], RFF_DEFAULTS.standardFontSize),
    standardFontColor: String(settings["Standard Font Color"] || RFF_DEFAULTS.standardFontColor),
    titleFontSize: numberOrDefault_(settings["Title Font Size"], RFF_DEFAULTS.titleFontSize),
    titleInfoFontSize: numberOrDefault_(settings["Title Info Font Size"], RFF_DEFAULTS.titleInfoFontSize),
    defaultColumnWidth: numberOrDefault_(settings["Default Column Width"], RFF_DEFAULTS.defaultColumnWidth),
    defaultNumberFormat: String(settings["Default Number Format"] || RFF_DEFAULTS.defaultNumberFormat),
    defaultTextFormat: String(settings["Default Text Format"] || RFF_DEFAULTS.defaultTextFormat),
    defaultDataWrap: String(settings["Default Data Wrap"] || RFF_DEFAULTS.defaultDataWrap).trim().toUpperCase(),
    defaultHorizontalAlignment: String(settings["Default Horizontal Alignment"] || RFF_DEFAULTS.defaultHorizontalAlignment).trim().toLowerCase(),
    defaultVerticalAlignment: String(settings["Default Vertical Alignment"] || RFF_DEFAULTS.defaultVerticalAlignment).trim().toLowerCase(),
    hslLevel1: numberOrDefault_(settings["HSL Level 1 Lightness %"], 60),
    hslLevel2: numberOrDefault_(settings["HSL Level 2 Lightness %"], 75),
    hslLevel3: numberOrDefault_(settings["HSL Level 3 Lightness %"], 85),
    hslLevel4: numberOrDefault_(settings["HSL Level 4 Lightness %"], 97),
    hslLevel5: numberOrDefault_(settings["HSL Level 5 Lightness %"], 99),
    globalBorderColor: normalizeHex_(settings["Global Border Color"] || "#CCCCCC"),
    globalBorderStyle: String(settings["Global Border Style"] || "SOLID").trim().toUpperCase(),
    templateVersion: String(settings["Template Version"] || RFF_DEFAULTS.templateVersion)
  };
}

function loadTitleRows_(sheet, globals) {
  let rows = [];
  try {
    rows = readDashboardSectionRows_(sheet, RFF_SECTION_TITLE_ROWS);
  } catch (err) {
    rows = getDefaultTitleRowRows_();
  }

  const defaultsByRow = {};
  getDefaultTitleRowRows_().forEach(function(row) {
    defaultsByRow[numberOrDefault_(row[1], 0)] = parseTitleRowConfigRow_(row, globals, null);
  });

  const titleRowsBySheetType = {};

  rows.forEach(function(row) {
    const rowNumber = numberOrDefault_(row[1], 0);
    if (!rowNumber) return;
    const sheetTypeRaw = String(row[0] || "GLOBAL").trim() || "GLOBAL";
    const sheetType = sheetTypeRaw.toUpperCase() === "GLOBAL" ? "GLOBAL" : normalizeDashboardSheetTypeKey_(sheetTypeRaw);
    const base = defaultsByRow[rowNumber] || {};
    if (!titleRowsBySheetType[sheetType]) titleRowsBySheetType[sheetType] = {};
    titleRowsBySheetType[sheetType][rowNumber] = parseTitleRowConfigRow_(row, globals, base);
  });

  titleRowsBySheetType.GLOBAL = titleRowsBySheetType.GLOBAL || {};
  Object.keys(defaultsByRow).forEach(function(rowNumber) {
    if (!titleRowsBySheetType.GLOBAL[rowNumber]) {
      titleRowsBySheetType.GLOBAL[rowNumber] = defaultsByRow[rowNumber];
    }
  });

  return titleRowsBySheetType;
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

function getThemeFillForTitleRow_(theme, fillLevel) {
  const normalized = String(fillLevel || "").trim().toLowerCase().replace(/\s+/g, "");
  if (normalized === "level3") return theme.level3;
  if (normalized === "level2") return theme.level2;
  if (normalized === "level1") return theme.level1;
  return theme.level1;
}

function toWrapStrategy_(value) {
  const normalized = String(value || "").trim().toUpperCase();
  if (normalized === "WRAP") return SpreadsheetApp.WrapStrategy.WRAP;
  if (normalized === "OVERFLOW") return SpreadsheetApp.WrapStrategy.OVERFLOW;
  return SpreadsheetApp.WrapStrategy.CLIP;
}

function parseSystemSurfaceWidths_(value) {
  const widths = String(value || "").split(",").map(function(item) { return Number(String(item).trim()); }).filter(function(item) { return isFinite(item) && item > 0; });
  return widths.length ? widths : [RFF_DEFAULTS.defaultColumnWidth];
}

function loadSystemSurfaces_(sheet) {
  let rows = [];
  try {
    rows = readDashboardSectionRows_(sheet, RFF_SECTION_SYSTEM_SURFACES);
  } catch (err) {
    logBestEffortWarning_("System surfaces dashboard lookup skipped: " + err.message);
    rows = getDefaultSystemSurfaceRows_();
  }
  if (!rows.length) rows = getDefaultSystemSurfaceRows_();
  const surfaces = {};
  rows.forEach(function(row) {
    const name = String(row[0] || "").trim();
    if (!name) return;
    const legacy = /^(VISIBLE|HIDDEN)$/i.test(String(row[3] || "").trim());
    surfaces[name] = {
      systemSheetName: name,
      displayName: String(row[1] || name).trim(),
      sortOrder: numberOrDefault_(row[2], 500),
      usesTitleRows: legacy ? true : parseBoolean_(row[3]),
      usesFilter: legacy ? false : parseBoolean_(row[4]),
      usesAlternatingColors: legacy ? false : parseBoolean_(row[5]),
      usesSubheaders: legacy ? (name === RFF_TIMING_SHEET || name === RFF_TEST_DASHBOARD_SHEET || name === RFF_DASHBOARD_SHEET) : parseBoolean_(row[6]),
      hiddenTemplate: legacy ? String(row[3] || "").toUpperCase() === "HIDDEN" : parseBoolean_(row[7]),
      outputVisibility: String(legacy ? row[3] : (row[8] || "VISIBLE")).trim().toUpperCase(),
      defaultColumnWidths: parseSystemSurfaceWidths_(legacy ? RFF_DEFAULTS.defaultColumnWidth : row[9]),
      titleFillColor: normalizeHex_((legacy ? row[4] : row[10]) || RFF_SYSTEM_SHEET_TITLE_COLOR),
      titleFontColor: normalizeHex_((legacy ? row[5] : row[11]) || "#000000"),
      notes: String((legacy ? row[7] : row[12]) || "").trim()
    };
  });
  return surfaces;
}

function loadSheetDefinitions_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_SHEETS);
  return rows
    .filter(function(row) {
      return String(row[0] || "").trim();
    })
    .map(function(row) {
      const templateColumnCountIndex = 8;
      const hasTemplateColumnCount = !isBlankCell_(row[templateColumnCountIndex]) && !isNaN(Number(row[templateColumnCountIndex]));
      const countOffset = hasTemplateColumnCount ? 1 : 0;
      const templateRowCountIndex = 7;
      return {
        sheetType: normalizeDashboardSheetTypeKey_(row[0]),
        reportTitle: String(row[1] || row[0] || "").trim(),
        templateName: String(row[2] || ("Template - " + row[0])).trim(),
        outputNamingPattern: String(row[3] || "").trim(),
        baseColor: normalizeHex_(row[4] || "#65A9CC"),
        usePromptDate: parseBoolean_(row[5]),
        endDateSource: String(row[6] || "").trim(),
        templateRowCount: numberOrDefault_(row[templateRowCountIndex], RFF_DEFAULTS.templateRows),
        templateColumnCount: hasTemplateColumnCount ? numberOrDefault_(row[templateColumnCountIndex], 0) : 0,
        templateRowMode: String(row[8 + countOffset] || "FIXED").trim().toUpperCase(),
        minimumRows: numberOrDefault_(row[9 + countOffset], numberOrDefault_(row[templateRowCountIndex], RFF_DEFAULTS.templateRows)),
        bufferRows: numberOrDefault_(row[10 + countOffset], 100)
      };
    });
}

function loadTabOrganization_(sheet) {
  let rows = [];
  try {
    rows = readDashboardSectionRows_(sheet, RFF_SECTION_TAB_ORGANIZATION);
  } catch (err) {
    logBestEffortWarning_("Tab organization defaults used: " + err.message);
    rows = getDefaultTabOrganizationRows_();
  }

  if (!rows.length) rows = getDefaultTabOrganizationRows_();
  return rows
    .filter(function(row) { return String(row[0] || "").trim(); })
    .map(function(row) {
      return {
        nameOrPrefix: String(row[0] || "").trim(),
        group: String(row[1] || "").trim() || "Other",
        rankBase: numberOrDefault_(row[2], 600),
        special: String(row[3] || "").trim()
      };
    });
}

function getDefaultTabOrganizationProfiles_() {
  return getDefaultTabOrganizationRows_().map(function(row) {
    return {
      nameOrPrefix: String(row[0] || "").trim(),
      group: String(row[1] || "").trim() || "Other",
      rankBase: numberOrDefault_(row[2], 600),
      special: String(row[3] || "").trim()
    };
  });
}

function getTabOrganizationProfilesForSort_() {
  try {
    const dashboard = loadDashboardConfig_();
    return dashboard.tabOrganization && dashboard.tabOrganization.length ? dashboard.tabOrganization : getDefaultTabOrganizationProfiles_();
  } catch (err) {
    logBestEffortWarning_("Tab organization sort defaults used: " + err.message);
    return getDefaultTabOrganizationProfiles_();
  }
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


    map[sheetType].push({
      order: order,
      header: header,
      source: source
    });
  });


  Object.keys(map).forEach(function(sheetType) {
    map[sheetType].sort(function(a, b) {
      return a.order - b.order;
    });
  });


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

function loadSheetBehaviors_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_BEHAVIORS);
  const map = {};


  rows.forEach(function(row) {
    const sheetType = normalizeDashboardSheetTypeKey_(row[0]);
    if (!sheetType) return;


    map[sheetType] = {
      usesTitleRows: parseBoolean_(row[1]),
      usesFilter: parseBoolean_(row[2]),
      usesAlternatingColors: parseBoolean_(row[3]),
      usesSubheaders: parseBoolean_(row[4]),
      hiddenTemplate: parseBoolean_(row[5]),
      outputVisibility: String(row[6] || "VISIBLE").trim().toUpperCase()
    };
  });


  return map;
}

function normalizeDashboardSectionTitle_(value) {
  return String(value === null || value === undefined ? "" : value)
    .replace(/–|—/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function readDashboardSectionRows_(source, sectionName) {
  const index = source && source.values ? source : buildDashboardSectionIndex_(source);
  const values = index.values || [];
  const targetSection = normalizeDashboardSectionTitle_(sectionName);
  let sectionRow = Object.prototype.hasOwnProperty.call(index.starts || {}, targetSection) ? index.starts[targetSection] : -1;


  if (sectionRow === -1) {
    throw new Error("Dashboard section missing: " + sectionName);
  }


  const output = [];


  for (let r = sectionRow + 4; r < values.length; r++) {
    const firstCell = String(values[r][0] || "").trim();
    const firstCellSection = normalizeDashboardSectionTitle_(firstCell);


    if (firstCellSection.indexOf("SECTION ") === 0) break;


    const rowValues = values[r];
    const hasAnyValue = rowValues.some(function(value) {
      return String(value === null || value === undefined ? "" : value).trim() !== "";
    });


    if (!hasAnyValue) {
      const nextFirst = r + 1 < values.length ? String(values[r + 1][0] || "").trim() : "";
      const nextFirstSection = normalizeDashboardSectionTitle_(nextFirst);
      if (nextFirstSection.indexOf("SECTION ") === 0 || nextFirst === "") break;
      continue;
    }


    output.push(rowValues);
  }


  return output;
}

function getBehaviorForSheetType_(dashboard, sheetType) {
  const normalized = normalizeDashboardSheetTypeKey_(sheetType);
  const behaviors = dashboard && dashboard.behaviors ? dashboard.behaviors : {};
  return behaviors[normalized] || behaviors[sheetType] || getDefaultBehavior_();
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
  const baselineRows = 100;
  const columns = Math.max(headers.length, 4);
  buildTemplateFromDashboard_(sheet, dashboard, sheetDef, headers, baselineRows, columns, behavior, "", timing, existed);
  sheet.showColumns(1, sheet.getMaxColumns());
  hideSheetIfNeeded_(sheet, timing, "Hide built template: " + sheetDef.templateName);
  RFF_LAST_TEMPLATE_REFRESH_MODE_ = existed ? "FULL_REBUILD" : "FIRST_BUILD";
  return sheet;
}

function buildTemplateFromDashboardSafely_(existingSheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, expectedSignature, timing, templateExisted) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tempName = getTemplateBuildSheetName_(sheetDef.templateName);
  const staleTemp = ss.getSheetByName(tempName);
  if (staleTemp) deleteSheetIfExists_(ss, tempName, sheetDef.templateName, "");


  const buildSheet = insertGovernedOutputSheet_(ss, tempName);
  markFrameworkStep_(timing, "Staged template build sheet created: " + sheetDef.templateName);


  try {
    buildTemplateFromDashboard_(buildSheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, expectedSignature, timing, false);
    validateBuiltTemplateMinimumStructure_(buildSheet, dashboard, sheetDef, headers, colCount);
    promoteStagedTemplateBuild_(ss, buildSheet, existingSheet, sheetDef, timing);
    markFrameworkStep_(timing, "Staged template build promoted: " + sheetDef.templateName);
    return ss.getSheetByName(sheetDef.templateName) || buildSheet;
  } catch (err) {
    try {
      buildSheet.setName(tempName + " FAILED");
      buildSheet.showSheet();
    } catch (renameErr) {
      logBestEffortWarning_("Failed staged template rename skipped for " + sheetDef.templateName + ": " + renameErr.message);
    }
    throw err;
  }
}

function buildTemplateFromDashboard_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, expectedSignature, timing, templateExisted) {
  markFrameworkStep_(timing, "Full template build required: " + sheetDef.templateName);


  const isTemplateCreate = !templateExisted;


  resizeSheetGrid_(sheet, rowCount, colCount);
  markFrameworkStep_(timing, "Set template grid from dashboard: " + sheetDef.templateName + " (" + rowCount + " rows x " + colCount + " cols)");


  if (isTemplateCreate) {
    markFrameworkStep_(timing, "Create template fast path - clear skipped for blank sheet: " + sheetDef.templateName);
  } else {
    clearTemplateForFullBuild_(sheet, sheetDef, timing, templateExisted);
  }


  applyTemplateBaseFormatting_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing);
  markFrameworkStep_(timing, "Apply full template formatting: " + sheetDef.templateName);


  writeTemplateMetadata_(sheet, dashboard, sheetDef, colCount, expectedSignature);
  markFrameworkStep_(timing, "Write template metadata: " + sheetDef.templateName);


  applyTemplateFreezeAndTabColor_(sheet, dashboard, sheetDef, colCount, timing);


  sheet.showColumns(1, Math.max(sheet.getMaxColumns(), 1));
  hideSheetIfNeeded_(sheet, timing, "Template hidden after build: " + sheetDef.templateName);


  markFrameworkStep_(timing, "Complete full template build: " + sheetDef.templateName);
  return sheet;
}

function applyColumnHidingFromDashboard_(sheet, dashboard, headers) {
  const hiddenFlags = (headers || []).map(function(header) {
    const def = dashboard.columnDefinitions[header] || {};
    return !!def.hideColumn;
  });


  applyHiddenColumnSettingsInRuns_(sheet, hiddenFlags);
}

function getLiveDashboardAuditStatus_() {
  return getLiveSheetStatus_(RFF_DASHBOARD_QUALITY_SHEET, "Dashboard Audit");
}

function getLiveFrameworkHealthStatus_() {
  return getLiveSheetStatus_(RFF_FRAMEWORK_TIMING_SHEET, "Framework Health");
}

function collectFrameworkHealthCheckRows_() {
  const results = [];
  appendRequiredFunctionChecks_(results, "Helper Functions", getRequiredHelperFunctionNames_());
  appendRequiredFunctionChecks_(results, "Menu Functions", getRequiredMenuFunctionNames_());
  appendRequiredFunctionChecks_(results, "Dashboard Functions", getRequiredDashboardFunctionNames_());
  appendRequiredFunctionChecks_(results, "Template Functions", getRequiredTemplateFunctionNames_());
  appendRequiredFunctionChecks_(results, "Validation Functions", getRequiredValidationFunctionNames_());
  appendRequiredFunctionChecks_(results, "Timing Functions", getRequiredTimingFunctionNames_());
  collectFrameworkSmokeValidationRows_().forEach(function(row) { results.push(row); });
  return results;
}

function runFrameworkSmokeValidation() {
  const healthRows = collectFrameworkHealthCheckRows_();
  writeFrameworkHealthCheckReport_(healthRows);
  const results = healthRows.filter(function(row) {
    return String(row && row[0] || "") === "Runtime Smoke Harness";
  });
  const failures = results.filter(function(row) {
    return String(row && row[2] || "").trim().toUpperCase() === "FAIL";
  });
  if (failures.length) {
    throw new Error("Framework smoke validation failed: " + failures.map(function(row) { return row[1] + " - " + row[3]; }).join(" | "));
  }
  notify_("Framework smoke validation passed and Section H saved: " + results.length + " checks.");
  return results;
}

function collectFrameworkSmokeValidationRows_() {
  const rows = [];
  appendFrameworkSmokeValidationRow_(rows, "Zero-row formatting guards",
    functionSourceContainsAll_(applyGovernedTextAndNumberFormats_, ["requestedRows < 1", "return;"]) &&
    functionSourceContainsAll_(applyUniversalFastCanvasFormatting_, ["lastRow < DATA_START_ROW", "return;"]) &&
    functionSourceContainsAll_(applyDemoPDateFormattingByHeader_, ["lastRow < DATA_START_ROW", "return;"]),
    "Governed formatting, universal canvas, and Demo P date formatting guard no-data ranges");

  appendFrameworkSmokeValidationRow_(rows, "Title write failures are fatal",
    functionSourceContainsAll_(formatMonthlySubReportViaTemplate_, ["Fatal: Could not write title info", "throw new Error"]),
    "Monthly/care-plan dashboard title writes throw on structural failure");

  appendFrameworkSmokeValidationRow_(rows, "Demo P disenrollment rewrites retained rows and enforces buffer",
    functionSourceContainsAll_(moveDisenrolledPMRsFromDemoPToExclusion_, ["writeDemoPDisenrollmentRetainedBody_(demoSheet, retainedRows, lastCol", "forceSheetRowCount_(demoSheet", "500"]),
    "Create/Update Disenrolled rewrites the retained Demo P body after exclusion append validation and enforces the active workspace row buffer");

  const contactHeaderMap = {
    "Contact - First Name": 0,
    "Contact - Last Name": 1,
    "Relationship": 2,
    "AD1 - Phone": 3
  };
  const contactMap = buildContactCompareMap_([
    { values: ["Jane", "Doe", "Spouse", "555-0100"] },
    { values: ["Jane", "Doe", "Spouse", "555-0100"] }
  ], contactHeaderMap, "PMR1");
  appendFrameworkSmokeValidationRow_(rows, "Duplicate contact keys remain distinct",
    contactMap.size === 2 && Array.from(contactMap.keys()).some(function(key) { return key.indexOf("dup#") !== -1; }),
    "Duplicate contact-key rows receive deterministic duplicate suffixes");

  appendFrameworkSmokeValidationRow_(rows, "Monthly Change menu callback registered",
    ML_MENU_CALLBACKS.dataProcessing.indexOf("buildMonthlyChangeReport") !== -1 &&
    typeof buildMonthlyChangeReport === "function" &&
    functionSourceContainsAll_(onOpen, ["buildMonthlyChangeReport"]),
    "Monthly Change remains reachable from callback registry and callable function wiring");

  appendFrameworkSmokeValidationRow_(rows, "Index explicit refresh path",
    typeof refreshIndexAfterSheetWorkflow_ === "function" && typeof createIndexSheet === "function",
    "Index refresh is performed explicitly at the end of sheet-producing workflows; on-change trigger is disabled.");

  return rows;
}

function appendFrameworkSmokeValidationRow_(rows, item, passed, notes) {
  rows.push(["Runtime Smoke Harness", item, passed ? "PASS" : "FAIL", notes]);
}

function runDashboardQualityMasterListHealthCheck_() {
  const rows = [
    ["Validation Item", "Status", "Issue", "Quality Notes"],
    ["Master List Primary Rows", "PASS", "None", "Primary PMR filtering active"]
  ];
  saveDashboardQualitySectionRows_(RFF_MASTER_LIST_HEALTH_KEY, rows);
  return rows;
}

function buildCombinedFrameworkTestDashboardRows_() {
  return [
    ["Dashboard Quality Report", "- v" + MASTER_LIST_MERGE_ML_VERSION + " -", "Report Formatter Framework"],
    [""],
    ["SECTION A - GLOBAL INPUTS VERIFICATION"],
    ["Last Updated", new Date()],
    ["Setting", "Status", "Issue", "Quality Notes"],
    ["Enter Data here"]
  ];
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

function validateTemplateFromDashboard_(dashboard, sheetDef, options) {
  options = options || {};
  const strict = !!options.strict;


  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetDef.templateName);
  const issues = [];
  const globals = dashboard.globals;
  const expectedHeaders = getHeadersForSheetType_(dashboard, sheetDef.sheetType);
  const behavior = getBehaviorForSheetType_(dashboard, sheetDef.sheetType);
  const colCount = Math.max(expectedHeaders.length, 4);
  const rowCount = RFF_TEMPLATE_BASELINE_ROWS;


  if (!sheet) {
    return {
      templateName: sheetDef.templateName,
      sheetType: sheetDef.sheetType,
      status: "FAIL",
      issues: "Template missing"
    };
  }


  if (expectedHeaders.length === 0) {
    issues.push("No headers defined in dashboard");
  }




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
    if (availableFormatRows < 1) return issues;
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
  } catch (err) {
    issues.push("Could not check date/number formats: " + err.message);
  }


  try {
    if (behavior.usesFilter && !sheet.getFilter()) {
      issues.push("Filter missing");
    }
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

function prepareCarePlanSourceSheetForDashboardFormat_(sheet, sheetType, headers) {


  if (!sheet) return;
  clearSheetRuntimeCachesForSheet_(sheet);
}

function buildDashboardOutputSheetName_(sheetDef, monthParts) {
  const pattern = String(sheetDef.outputNamingPattern || sheetDef.reportTitle || sheetDef.sheetType || "").trim();
  const monthText = Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "MM.yy");
  const monthTextNoLeading = Utilities.formatDate(monthParts.firstDay, Session.getScriptTimeZone(), "M.yy");
  const fullStart = formatDateForSheetName_(monthParts.firstDay);
  const fullEnd = formatDateForSheetName_(monthParts.lastDay);


  let name = pattern || String(sheetDef.reportTitle || sheetDef.sheetType || "Report").trim();


  name = name
    .replace(/mm\.yy/g, monthText)
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

function hideSystemAndTestingSheets_(timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let hiddenCount = 0;
  forceBaseTemplateHidden_();
  ss.getSheets().forEach(sheet => {
    if (!isSystemOrTestingSheet_(sheet)) return;
    try {
      if (!sheet.isSheetHidden()) {
        sheet.hideSheet();
        hiddenCount++;
      }
    } catch (err) {
      logBestEffortWarning_("Could not hide system/testing sheet " + sheet.getName() + ": " + err.message);
    }
  });
  if (timing) markFrameworkStep_(timing, "System/testing sheets hidden", "Sheets hidden: " + hiddenCount);
  return hiddenCount;
}

function getSystemAndTestingSheetNames_() {
  const names = new Set(SYSTEM_SHEETS_TO_HIDE || []);
  [
    RFF_DASHBOARD_SHEET,
    RFF_VALIDATION_SHEET,
    RFF_TIMING_SHEET,
    RFF_TEST_DASHBOARD_SHEET,
    RFF_HEALTH_CHECK_SHEET
  ].forEach(function(name) {
    if (name) names.add(name);
  });


  return names;
}

function isSystemOrTestingSheet_(sheet) {
  if (!sheet) return false;
  const sheetName = String(sheet.getName() || "").trim();
  const lower = sheetName.toLowerCase();
  const explicitNames = getSystemAndTestingSheetNames_();


  return explicitNames.has(sheetName) ||
    lower.indexOf("framework test") !== -1 ||
    lower.indexOf("template validation") !== -1 ||
    lower.indexOf("framework health check") !== -1 ||
    lower.indexOf("dashboard audit") !== -1 ||
    lower.endsWith(" audit") ||
    lower.endsWith(" validation") ||
    lower.endsWith(" diagnostics") ||
    lower.endsWith(" health check");
}

function hideSystemSheetsNow() {
  return runFrameworkTimed_("Hide System Sheets", function(timing) {
    const count = hideSystemAndTestingSheets_(timing);
    notify_("System/testing sheets hidden: " + count);
    return count;
  });
}

function showSystemSheetsNow() {
  return runFrameworkTimed_("Show System Sheets", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const names = getSystemAndTestingSheetNames_();
    let shownCount = 0;

    ss.getSheets().forEach(function(sheet) {
      const sheetName = String(sheet.getName() || "").trim();
      if (sheetName === RFF_BASE_TEMPLATE_NAME) {
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

function runDashboardQualityStartUp() {
  return runFrameworkTimed_("Dashboard Quality Start Up", function(timing) {
    clearDashboardConfigCache_();
    const qualitySheet = ensureDashboardQualityReportSheet_();
    ensureDashboardQualitySheetShellForWorkflow_(qualitySheet, loadDashboardConfig_(true), timing);

    runDashboardQualityConfigVerificationSections_(timing, qualitySheet);
    runDashboardQualitySectionIfDue_(RFF_HEALTH_CHECK_SHEET, "Section I Framework Health Check", runFrameworkHealthCheck, timing);

    flushStagedDashboardQualitySectionsRows_(qualitySheet, timing);
    return true;
  });
}

function getScriptFunctionForDashboardSection_(sectionTitle) {
  if (sectionTitle.indexOf("SECTION A") !== -1) return "getDefaultGlobalSettingsRows_()";
  if (sectionTitle.indexOf("SECTION B") !== -1) return "getDefaultTitleRowRows_()";
  if (sectionTitle.indexOf("SECTION C") !== -1) return "getDefaultSheetDefinitionRows_()";
  if (sectionTitle.indexOf("SECTION D") !== -1) return "getDefaultBehaviorRows_()";
  if (sectionTitle.indexOf("SECTION E") !== -1) return "getDefaultSystemSurfaceRows_()";
  if (sectionTitle.indexOf("SECTION F") !== -1) return "getDefaultTabOrganizationRows_()";
  if (sectionTitle.indexOf("SECTION G") !== -1) return "getDefaultColumnDefinitionRows_()";
  if (sectionTitle.indexOf("SECTION H") !== -1) return "getDefaultSheetHeaderRows_()";
  return "Script Defaults";
}

function getFormatDashboardSectionHeaderForChangelog_(dashboardSheet, sectionTitle) {
  if (dashboardSheet && dashboardSheet.values) {
    const target = normalizeDashboardSectionTitle_(sectionTitle);
    const startRow = Object.prototype.hasOwnProperty.call(dashboardSheet.starts || {}, target) ? dashboardSheet.starts[target] : -1;
    if (startRow === -1) return [];
    const headerRow = dashboardSheet.values[startRow + 1] || [];
    return headerRow.map(function(value, index) {
      return String(value || "").trim() || "Column " + (index + 1);
    });
  }

  const bounds = getDashboardSectionBounds_(dashboardSheet, sectionTitle);
  if (!bounds) return [];
  return dashboardSheet.getRange(bounds.headerRow, 1, 1, dashboardSheet.getLastColumn()).getValues()[0].map(function(value, index) {
    return String(value || "").trim() || "Column " + (index + 1);
  });
}

function updateFormatDashboardChangelog_(dashboardSheet, timing) {
  const props = PropertiesService.getDocumentProperties();
  let logRows = getDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY);
  if (!logRows || logRows.length === 0) {
    logRows = [["Timestamp", "Section Changed", "Column Changed", "Previous Value", "New Value", "", ""]];
  } else {
    logRows[0] = ["Timestamp", "Section Changed", "Column Changed", "Previous Value", "New Value", "", ""];
  }

  const sectionsToTrack = [
    RFF_SECTION_GLOBAL,
    RFF_SECTION_TITLE_ROWS,
    RFF_SECTION_SHEETS,
    RFF_SECTION_BEHAVIORS,
    RFF_SECTION_SYSTEM_SURFACES,
    RFF_SECTION_TAB_ORGANIZATION,
    RFF_SECTION_COLUMNS,
    RFF_SECTION_HEADERS
  ];

  let changed = false;
  const now = new Date();
  const dashboardIndex = buildDashboardSectionIndex_(dashboardSheet);

  sectionsToTrack.forEach(function(sectionTitle) {
    try {
      const currentRows = readDashboardSectionRows_(dashboardIndex, sectionTitle);
      const propKey = RFF_QA_SECTION_PROP_PREFIX + "TRACKER_DATA_" + computeStableHash_(sectionTitle);
      const rawPrevious = props.getProperty(propKey);
      props.setProperty(propKey, JSON.stringify(currentRows));
      if (!rawPrevious) return;
      const previousRows = JSON.parse(rawPrevious);
      const sectionHeader = getFormatDashboardSectionHeaderForChangelog_(dashboardIndex, sectionTitle);

      for (let r = 0; r < currentRows.length; r++) {
        const currRow = currentRows[r] || [];
        const prevRow = previousRows[r] || [];
        const maxCols = Math.max(currRow.length, prevRow.length);
        for (let c = 0; c < maxCols; c++) {
          const currVal = currRow[c] !== undefined ? String(currRow[c]).trim() : "";
          const prevVal = prevRow[c] !== undefined ? String(prevRow[c]).trim() : "";
          if (currVal !== prevVal) {
            const columnName = sectionHeader[c] || "Column " + (c + 1);
            logRows.splice(1, 0, [
              now,
              sectionTitle,
              columnName,
              prevVal || "(blank)",
              currVal || "(blank)",
              "",
              ""
            ]);
            changed = true;
          }
        }
      }
    } catch (err) {
      logBestEffortWarning_("Cell differential changelog failed for " + sectionTitle + ": " + err.message);
    }
  });

  if (changed) {
    const trimmedLog = [logRows[0]].concat(logRows.slice(1, 100));
    saveDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY, trimmedLog, { deferSheetWrite: true });
    if (timing) markFrameworkStep_(timing, "Dashboard Quality Section H cell-differential changelog updated");
  } else {
    saveDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY, logRows, { deferSheetWrite: true });
    if (timing) markFrameworkStep_(timing, "Dashboard Quality Section H cell-differential changelog unchanged");
  }
  return changed;
}

function highlightFormatDashboardChangesFromChangelog_(dashboard, timing) {
  try {
    const logs = getDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY);
    if (!logs || logs.length <= 1) return 0;
    const highlightRanges = [];
    for (let i = 1; i < Math.min(logs.length, 15); i++) {
      const logEntry = logs[i] || [];
      const sectionTitle = logEntry[1];
      const columnName = logEntry[2];
      const newValue = logEntry[4];
      if (!sectionTitle || !columnName) continue;
      const sectionBounds = getDashboardSectionBounds_(dashboard, sectionTitle);
      if (!sectionBounds || sectionBounds.dataRowCount <= 0) continue;
      const sectionHeaders = dashboard.getRange(sectionBounds.headerRow, 1, 1, dashboard.getLastColumn()).getValues()[0].map(function(value, index) {
        return String(value || "").trim() || "Column " + (index + 1);
      });
      const colIndex = sectionHeaders.indexOf(columnName);
      if (colIndex === -1) continue;
      const sectionDataRange = dashboard.getRange(sectionBounds.dataStartRow, 1, sectionBounds.dataRowCount, dashboard.getLastColumn());
      const sectionValues = sectionDataRange.getValues();
      for (let r = 0; r < sectionValues.length; r++) {
        if (String(sectionValues[r][colIndex]).trim() === String(newValue).trim()) {
          highlightRanges.push(rowColToA1_(sectionBounds.dataStartRow + r, colIndex + 1));
          break;
        }
      }
    }
    if (highlightRanges.length > 0) {
      dashboard.getRangeList(highlightRanges).setBackground("#f3ffc7");
      if (timing) markFrameworkStep_(timing, "Highlighted " + highlightRanges.length + " changed cells on Format Dashboard with #f3ffc7");
    }
    return highlightRanges.length;
  } catch (err) {
    logBestEffortWarning_("Format Dashboard cell highlight paint skipped: " + err.message);
    return 0;
  }
}

function runDashboardQualityConfigVerificationSections_(timing, qualitySheet) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const quality = qualitySheet || ensureDashboardQualityReportSheet_();
  const dashboard = ss.getSheetByName(RFF_DASHBOARD_SHEET);

  if (!dashboard) {
    const missingRows = [
      ["Verification Area", "Verification Item", "Expected Value", "Actual Value", "Status", "Severity", "Quality Notes"],
      ["Format Dashboard", "Sheet Exists", RFF_DASHBOARD_SHEET, "Missing", "FAIL", "Critical", "Create or rebuild Format Dashboard before template creation."]
    ];
    saveDashboardQualitySectionRows_(RFF_DASHBOARD_VERIFY_GLOBAL_KEY, missingRows, { deferSheetWrite: true });
    replaceDashboardQualitySectionRows_(
      quality,
      getDashboardQualitySectionTitleForKey_(RFF_DASHBOARD_VERIFY_GLOBAL_KEY),
      buildTimestampedDashboardQualitySectionRows_(RFF_DASHBOARD_VERIFY_GLOBAL_KEY, missingRows)
    );
    markFrameworkStep_(timing, "Format Dashboard missing");
    return missingRows;
  }

  repairFormatDashboardSectionHeaders_(dashboard, timing);
  const dashboardIndex = buildDashboardSectionIndex_(dashboard);

  const sectionPayloads = [
    { key: RFF_DASHBOARD_VERIFY_GLOBAL_KEY, rows: collectFormatDashboardGlobalInputVerificationRows_(dashboardIndex), label: "Section A Global Inputs verified" },
    { key: RFF_DASHBOARD_VERIFY_SHEETS_KEY, rows: collectFormatDashboardSheetDefinitionVerificationRows_(dashboardIndex), label: "Section B Sheet Definitions verified" },
    { key: RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY, rows: collectFormatDashboardSheetBehaviorVerificationRows_(dashboardIndex), label: "Section C Sheet Behaviors verified" },
    { key: RFF_DASHBOARD_VERIFY_TAB_ORGANIZATION_KEY, rows: collectFormatDashboardTabOrganizationVerificationRows_(dashboardIndex), label: "Section F Tab Organization verified" },
    { key: RFF_DASHBOARD_VERIFY_COLUMNS_KEY, rows: collectFormatDashboardColumnDefinitionVerificationRows_(dashboardIndex), label: "Section D Column Definitions verified" },
    { key: RFF_DASHBOARD_VERIFY_HEADERS_KEY, rows: collectFormatDashboardSheetHeaderVerificationRows_(dashboardIndex), label: "Section E Sheet Headers verified" }
  ];

  const sectionWrites = [];
  sectionPayloads.forEach(function(item) {
    const previousRows = getDashboardQualitySectionRows_(item.key);
    const changed = !dashboardQualityRowsEqualValues_(previousRows, item.rows);
    saveDashboardQualitySectionRows_(item.key, item.rows, { deferSheetWrite: true });
    markFrameworkStep_(timing, item.label + (changed ? "" : " skipped - unchanged"));

    if (changed) {
      sectionWrites.push({
        title: getDashboardQualitySectionTitleForKey_(item.key),
        rows: buildTimestampedDashboardQualitySectionRows_(item.key, item.rows)
      });
    }
  });

  if (sectionWrites.length) {
    replaceDashboardQualitySectionsRows_(quality, sectionWrites);
    markFrameworkStep_(timing, "Dashboard Quality Config Sections (A-F) batch written");
  } else {
    markFrameworkStep_(timing, "Dashboard Quality Config Sections (A-F) sheet write skipped - unchanged");
  }

  return true;
}

function runDashboardQualityTemplateValidationSection_(timing, qualitySheet, dashboard) {
  const previousValidationRows = getDashboardQualitySectionRows_(RFF_VALIDATION_SHEET);
  validateReportTemplatesCore_(dashboard, timing, { deferDashboardWrite: true });
  const validationRows = getDashboardQualitySectionRows_(RFF_VALIDATION_SHEET);

  if (!dashboardQualityRowsEqualValues_(previousValidationRows, validationRows)) {
    markFrameworkStep_(timing, "Dashboard Quality Section G staged");
  } else {
    markFrameworkStep_(timing, "Dashboard Quality Section G sheet write skipped - unchanged");
  }

  return validationRows;
}

function runDashboardQualityChangelogSection_(timing, qualitySheet, dashboardSheet) {
  if (!dashboardSheet) return false;
  const previousChangelogRows = getDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY);
  const changelogUpdated = updateFormatDashboardChangelog_(dashboardSheet, timing);
  const changelogRows = getDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY);

  if (!dashboardQualityRowsEqualValues_(previousChangelogRows, changelogRows) || changelogUpdated) {
    markFrameworkStep_(timing, "Dashboard Quality Section H staged");
  } else {
    markFrameworkStep_(timing, "Dashboard Quality Section H cell-differential changelog unchanged");
  }

  highlightFormatDashboardChangesFromChangelog_(dashboardSheet, timing);
  return changelogRows;
}

function getDashboardVerificationPassRow_(headers, item, notes) {
  const width = Math.max((headers || []).length, 4);
  const row = new Array(width).fill("");
  row[0] = item || "Dashboard Section";
  row[1] = "PASS";
  row[2] = "";
  row[3] = notes || "No issues found.";
  return row;
}

function appendDashboardVerificationPassIfNoIssues_(rows, item, notes) {
  if (rows.length <= 1) rows.push(getDashboardVerificationPassRow_(rows[0], item, notes));
  return rows;
}

function getDashboardSectionHeaderWidth_(rows) {
  return (rows || []).reduce(function(max, row) {
    return Math.max(max, (row || []).length);
  }, 0);
}

function collectBlankDashboardCells_(row, width, labelPrefix, optionalColumns) {
  const optional = optionalColumns || {};
  const blanks = [];
  for (let i = 0; i < width; i++) {
    if (optional[i + 1]) continue;
    if (String(row[i] === null || row[i] === undefined ? "" : row[i]).trim() === "") {
      blanks.push((labelPrefix || "Column ") + (i + 1));
    }
  }
  return blanks;
}

function collectFormatDashboardGlobalInputVerificationRows_(dashboardSheet) {
  const rows = [["Setting", "Status", "Issue", "Quality Notes"]];
  let sectionRows = [];
  try {
    sectionRows = readDashboardSectionRows_(dashboardSheet, RFF_SECTION_GLOBAL);
  } catch (err) {
    rows.push([RFF_SECTION_GLOBAL, "FAIL", "Missing Section", err.message]);
    return rows;
  }

  if (!sectionRows.length) {
    rows.push([RFF_SECTION_GLOBAL, "FAIL", "Blank Section", "Format Dashboard Section A has no setting rows."]);
    return rows;
  }

  const seen = {};
  sectionRows.forEach(function(row, index) {
    const setting = String(row[0] || "").trim();
    const value = String(row[1] === null || row[1] === undefined ? "" : row[1]).trim();
    if (!setting) rows.push(["Row " + (index + 1), "FAIL", "Blank Setting", "Format Dashboard Section A contains a blank setting name."]);
    if (setting && seen[setting]) rows.push([setting, "WARNING", "Duplicate Setting", "Format Dashboard Section A contains this setting more than once."]);
    if (setting) seen[setting] = true;
    if (setting && !value) rows.push([setting, "FAIL", "Blank Value", "Format Dashboard Section A setting is blank."]);
  });

  collectFormatDashboardTitleRowsVerificationRows_(dashboardSheet).slice(1).forEach(function(row) {
    rows.push(row);
  });

  return appendDashboardVerificationPassIfNoIssues_(rows, "Global Inputs / Title Rows", "Format Dashboard Section A settings and Section B title rows are present and populated.");
}

function collectFormatDashboardTitleRowsVerificationRows_(dashboardSheet) {
  const rows = [["Title Row", "Status", "Issue", "Quality Notes"]];
  let titleRows = [];
  try {
    titleRows = readDashboardSectionRows_(dashboardSheet, RFF_SECTION_TITLE_ROWS);
  } catch (err) {
    rows.push([RFF_SECTION_TITLE_ROWS, "FAIL", "Missing Section", err.message]);
    return rows;
  }

  if (!titleRows.length) {
    rows.push([RFF_SECTION_TITLE_ROWS, "FAIL", "Blank Section", "Format Dashboard Section B has no title row records."]);
    return rows;
  }

  const requiredRows = { 1: false, 2: false, 3: false, 4: false };
  const validFillLevels = { "LEVEL 1": true, "LEVEL 2": true, "LEVEL 3": true };
  titleRows.forEach(function(row, index) {
    const sheetType = String(row[0] || "").trim();
    const rowNumber = numberOrDefault_(row[1], 0);
    const label = (sheetType || "Row " + (index + 1)) + " title row " + (rowNumber || "?");
    if (!sheetType) rows.push([label, "FAIL", "Blank Sheet Type", "Format Dashboard Section B title row has no sheet type."]);
    if (!rowNumber) rows.push([label, "FAIL", "Invalid Row", "Format Dashboard Section B title row number must be numeric."]);
    if (sheetType.toUpperCase() === "GLOBAL" && requiredRows[rowNumber] !== undefined) requiredRows[rowNumber] = true;
    if (isBlankCell_(row[5])) rows.push([label, "FAIL", "Blank Target Cell", "Format Dashboard Section B title row must define a target cell."]);
    if (isBlankCell_(row[6]) || numberOrDefault_(row[6], 0) <= 0) rows.push([label, "FAIL", "Invalid Height", "Format Dashboard Section B title row height must be greater than zero."]);
    if (isBlankCell_(row[9]) || !validFillLevels[String(row[9] || "").trim().toUpperCase()]) rows.push([label, "FAIL", "Invalid Fill Level", "Fill Level must be Level 1, Level 2, or Level 3."]);
    if (rowNumber === 4 && String(row[11] || "").trim().toUpperCase() !== "WRAP") rows.push([label, "WARNING", "Header Wrap", "Header row should be governed as Wrap."]);
  });

  Object.keys(requiredRows).forEach(function(rowNumber) {
    if (!requiredRows[rowNumber]) rows.push(["GLOBAL row " + rowNumber, "FAIL", "Missing Required Title Row", "Format Dashboard Section B must include GLOBAL rows 1, 2, 3, and 4."]);
  });

  return appendDashboardVerificationPassIfNoIssues_(rows, "Title Rows", "Format Dashboard Section B title row records are present and valid.");
}

function appendDashboardSectionHeaderPositionIssues_(rows, dashboardSheet, sectionTitle, expectedHeaders, sectionLabel) {
  let actualHeaders = [];
  try {
    actualHeaders = getFormatDashboardSectionHeaderForChangelog_(dashboardSheet, sectionTitle);
  } catch (err) {
    rows.push([sectionLabel, "FAIL", "Header Location Check Failed", err.message]);
    return;
  }

  expectedHeaders.forEach(function(expected, index) {
    const actual = String(actualHeaders[index] || "").trim();
    if (actual !== expected) {
      rows.push([
        sectionLabel + " Column " + (index + 1),
        "FAIL",
        "Header Misaligned",
        "Expected '" + expected + "' in column " + (index + 1) + " but found '" + (actual || "(blank)") + "'."
      ]);
    }
  });
}

function isStrictDashboardBooleanCell_(value) {
  const text = String(value === null || value === undefined ? "" : value).trim().toUpperCase();
  return text === "TRUE" || text === "FALSE" || value === true || value === false;
}

function isDashboardBooleanOrBlankCell_(value) {
  return isBlankCell_(value) || isStrictDashboardBooleanCell_(value);
}

function collectFormatDashboardSheetDefinitionVerificationRows_(dashboardSheet) {
  const rows = [["Sheet", "Status", "Issue", "Quality Notes"]];
  const expectedHeaders = ["Sheet Type", "Report Title", "Template Name", "Output Naming Pattern", "Base Color", "Use Prompt Date", "End Date Source", "Template Row Count", "Template Column Count", "Template Row Mode", "Minimum Rows", "Buffer Rows"];
  let sectionRows = [];
  try {
    appendDashboardSectionHeaderPositionIssues_(rows, dashboardSheet, RFF_SECTION_SHEETS, expectedHeaders, "Section C Sheet Definitions");
    sectionRows = readDashboardSectionRows_(dashboardSheet, RFF_SECTION_SHEETS);
  } catch (err) {
    rows.push([RFF_SECTION_SHEETS, "FAIL", "Missing Section", err.message]);
    return rows;
  }

  if (!sectionRows.length) {
    rows.push([RFF_SECTION_SHEETS, "FAIL", "Blank Section", "Format Dashboard Section C has no sheet definition rows."]);
    return rows;
  }

  const width = expectedHeaders.length;
  const seen = {};
  sectionRows.forEach(function(row, index) {
    const sheetType = String(row[0] || "").trim();
    const label = sheetType || "Row " + (index + 1);
    if (!sheetType) rows.push([label, "FAIL", "Blank Sheet", "Format Dashboard Section C column 1 must contain Sheet Type."]);
    if (sheetType && seen[sheetType]) rows.push([sheetType, "WARNING", "Duplicate Sheet", "Format Dashboard Section C contains this sheet type more than once."]);
    if (sheetType) seen[sheetType] = true;
    if (!String(row[1] || "").trim()) rows.push([label, "FAIL", "Report Title Misaligned", "Column 2 must contain Report Title."]);
    if (String(row[2] || "").indexOf("Template - ") !== 0) rows.push([label, "FAIL", "Template Name Misaligned", "Column 3 must contain a Template - ... name."]);
    if (!/^#[0-9A-F]{6}$/i.test(String(row[4] || "").trim())) rows.push([label, "FAIL", "Base Color Misaligned", "Column 5 must contain a hex color such as #65CC99."]);
    if (!isStrictDashboardBooleanCell_(row[5])) rows.push([label, "FAIL", "Use Prompt Date Misaligned", "Column 6 must contain TRUE or FALSE."]);
    if (numberOrDefault_(row[7], 0) <= 0) rows.push([label, "FAIL", "Template Row Count Misaligned", "Column 8 must contain a positive row count."]);
    if (numberOrDefault_(row[8], 0) <= 0) rows.push([label, "FAIL", "Template Column Count Misaligned", "Column 9 must contain a positive generated column count."]);
    const blanks = collectBlankDashboardCells_(row, width, "Column ");
    if (sheetType && blanks.length) rows.push([label, "WARNING", "Blank Configuration", blanks.join(", ") + " are blank in Format Dashboard Section C."]);
  });

  return appendDashboardVerificationPassIfNoIssues_(rows, "Sheet Definitions", "Format Dashboard Section C sheet definitions are populated and in the expected column locations.");
}

function collectFormatDashboardSheetHeaderVerificationRows_(dashboardSheet) {
  const rows = [["Header", "Status", "Issue", "Quality Notes"]];
  const expectedHeaders = ["Sheet Type", "Column Order", "Header", "Source of Data"];
  let sectionRows = [];
  try {
    appendDashboardSectionHeaderPositionIssues_(rows, dashboardSheet, RFF_SECTION_HEADERS, expectedHeaders, "Section H Sheet Headers");
    sectionRows = readDashboardSectionRows_(dashboardSheet, RFF_SECTION_HEADERS);
  } catch (err) {
    rows.push([RFF_SECTION_HEADERS, "FAIL", "Missing Section", err.message]);
    return rows;
  }

  if (!sectionRows.length) {
    rows.push([RFF_SECTION_HEADERS, "FAIL", "Blank Section", "Format Dashboard Section H has no header definition rows."]);
    return rows;
  }

  const seen = {};
  const counts = {};
  sectionRows.forEach(function(row, index) {
    const sheetType = String(row[0] || "").trim();
    const header = String(row[2] || row[1] || "").trim();
    const label = sheetType && header ? sheetType + " - " + header : "Row " + (index + 1);
    if (!sheetType) rows.push([label, "FAIL", "Blank Sheet Type", "Format Dashboard Section H column 1 must contain Sheet Type."]);
    if (numberOrDefault_(row[1], 0) <= 0) rows.push([label, "FAIL", "Column Order Misaligned", "Format Dashboard Section H column 2 must contain a positive numeric Column Order."]);
    if (!header) rows.push([label, "FAIL", "Blank Header", "Format Dashboard Section H column 3 must contain Header."]);
    if (!sheetType || !header) return;
    counts[sheetType] = (counts[sheetType] || 0) + 1;
    const key = sheetType + "||" + header;
    if (seen[key]) rows.push([label, "WARNING", "Duplicate Header", "Header is duplicated within the same Format Dashboard sheet type."]);
    seen[key] = true;
  });

  Object.keys(counts).forEach(function(sheetType) {
    if (counts[sheetType] < 1) rows.push([sheetType, "FAIL", "No Headers", "No headers are defined for this sheet type."]);
  });

  return appendDashboardVerificationPassIfNoIssues_(rows, "Sheet Headers", "No missing, blank, duplicate, or invalid Format Dashboard Section H headers found.");
}

function collectFormatDashboardTabOrganizationVerificationRows_(dashboardSheet) {
  const rows = [["Tab Organization", "Status", "Issue", "Quality Notes"]];
  const expectedHeaders = ["Sheet Name / Prefix", "Group", "Rank / Range", "Special"];
  let sectionRows = [];
  try {
    appendDashboardSectionHeaderPositionIssues_(rows, dashboardSheet, RFF_SECTION_TAB_ORGANIZATION, expectedHeaders, "Section F Tab Organization");
    sectionRows = readDashboardSectionRows_(dashboardSheet, RFF_SECTION_TAB_ORGANIZATION);
  } catch (err) {
    rows.push([RFF_SECTION_TAB_ORGANIZATION, "FAIL", "Missing Section", err.message]);
    return rows;
  }

  if (!sectionRows.length) {
    rows.push([RFF_SECTION_TAB_ORGANIZATION, "FAIL", "Blank Section", "Format Dashboard Section F has no tab organization rows."]);
    return rows;
  }

  const seen = {};
  sectionRows.forEach(function(row, index) {
    const nameOrPrefix = String(row[0] || "").trim();
    const group = String(row[1] || "").trim();
    const rank = numberOrDefault_(row[2], 0);
    const label = nameOrPrefix || "Row " + (index + 1);
    if (!nameOrPrefix) rows.push([label, "FAIL", "Blank Sheet Name / Prefix", "Format Dashboard Section F column 1 must contain the sheet name or prefix."]);
    if (!group) rows.push([label, "FAIL", "Blank Group", "Format Dashboard Section F column 2 must contain the group."]);
    if (rank <= 0) rows.push([label, "FAIL", "Invalid Rank / Range", "Format Dashboard Section F column 3 must contain a positive numeric rank base."]);
    if (nameOrPrefix && seen[nameOrPrefix]) rows.push([label, "WARNING", "Duplicate Tab Organization Prefix", "This sheet name/prefix appears more than once in Section F."]);
    if (nameOrPrefix) seen[nameOrPrefix] = true;
  });

  return appendDashboardVerificationPassIfNoIssues_(rows, "Tab Organization", "Format Dashboard Section F tab organization rows are populated and in the expected column locations.");
}

function collectFormatDashboardColumnDefinitionVerificationRows_(dashboardSheet) {
  const rows = [["Column", "Status", "Issue", "Quality Notes"]];
  const expectedHeaders = ["Header", "Width", "Header Font Size", "Date Column", "Hide Column", "Data Wrap", "Horizontal Alignment", "Vertical Alignment", "Number Format"];
  let columnRows = [];
  try {
    appendDashboardSectionHeaderPositionIssues_(rows, dashboardSheet, RFF_SECTION_COLUMNS, expectedHeaders, "Section G Column Definitions");
    columnRows = readDashboardSectionRows_(dashboardSheet, RFF_SECTION_COLUMNS);
  } catch (err) {
    rows.push([RFF_SECTION_COLUMNS, "FAIL", "Missing Section", err.message]);
    return rows;
  }

  if (!columnRows.length) {
    rows.push([RFF_SECTION_COLUMNS, "FAIL", "Blank Section", "Format Dashboard Section G has no column definition rows."]);
    return rows;
  }

  const seen = {};
  columnRows.forEach(function(row, index) {
    const header = String(row[0] || "").trim();
    const width = row[1];
    const label = header || "Row " + (index + 1);
    if (!header) rows.push([label, "FAIL", "Blank Column", "Format Dashboard Section G column 1 must contain Header."]);
    if (!isDashboardBooleanOrBlankCell_(row[3])) rows.push([label, "FAIL", "Date Column Misaligned", "Format Dashboard Section G column 4 must contain TRUE, FALSE, or blank for FALSE."]);
    if (!isDashboardBooleanOrBlankCell_(row[4])) rows.push([label, "FAIL", "Hide Column Misaligned", "Format Dashboard Section G column 5 must contain TRUE, FALSE, or blank for FALSE."]);
    if (!header) return;
    if (seen[header]) rows.push([label, "WARNING", "Duplicate Column Definition", "Column definition is duplicated for this header."]);
    if (!isBlankCell_(width) && numberOrDefault_(width, 0) <= 0) rows.push([label, "WARNING", "Invalid Width", "Column width override must be greater than zero when populated. Blank width inherits Default Column Width."]);
    seen[header] = true;
  });

  return appendDashboardVerificationPassIfNoIssues_(rows, "Column Definitions", "No missing, blank, duplicate, or invalid Format Dashboard Section G column definitions found.");
}

function collectFormatDashboardSheetBehaviorVerificationRows_(dashboardSheet) {
  const rows = [["Behavior", "Status", "Issue", "Quality Notes"]];
  const expectedHeaders = ["Sheet Type", "Uses Title Rows", "Uses Filter", "Uses Alternating Colors", "Uses Subheaders", "Hidden Template", "Output Visibility"];
  let behaviorRows = [];
  try {
    appendDashboardSectionHeaderPositionIssues_(rows, dashboardSheet, RFF_SECTION_BEHAVIORS, expectedHeaders, "Section D Sheet Behaviors");
    behaviorRows = readDashboardSectionRows_(dashboardSheet, RFF_SECTION_BEHAVIORS);
  } catch (err) {
    rows.push([RFF_SECTION_BEHAVIORS, "FAIL", "Missing Section", err.message]);
    return rows;
  }

  if (!behaviorRows.length) {
    rows.push([RFF_SECTION_BEHAVIORS, "FAIL", "Blank Section", "Format Dashboard Section D has no behavior rows."]);
    return rows;
  }

  const validVisibility = { "VISIBLE": true, "HIDDEN": true };
  behaviorRows.forEach(function(row, index) {
    const sheetType = String(row[0] || "").trim();
    const label = sheetType || "Row " + (index + 1);
    if (!sheetType) rows.push([label, "FAIL", "Blank Sheet Type", "Format Dashboard Section D column 1 must contain Sheet Type."]);
    for (let col = 1; col <= 5; col++) {
      if (!isStrictDashboardBooleanCell_(row[col])) rows.push([label, "FAIL", "Boolean Misaligned", "Format Dashboard Section D column " + (col + 1) + " must contain TRUE or FALSE."]);
    }
    if (!validVisibility[String(row[6] || "").trim().toUpperCase()]) rows.push([label, "FAIL", "Output Visibility Misaligned", "Format Dashboard Section D column 7 must contain VISIBLE or HIDDEN."]);
  });

  return appendDashboardVerificationPassIfNoIssues_(rows, "Sheet Behaviors", "Format Dashboard Section D sheet behavior rows are populated and in the expected column locations.");
}

function runDashboardQualitySectionIfDue_(sectionKey, stepName, fn, timing) {
  try {
    const rows = fn(timing);
    if (rows && Array.isArray(rows)) {
      saveDashboardQualitySectionRows_(sectionKey, rows, { deferSheetWrite: true });
    }
    markFrameworkStep_(timing, stepName + " complete");
    return "RUN";
  } catch (err) {
    const errorRows = [
      ["Check Item", "Status", "Issue", "Quality Notes"],
      [stepName || sectionKey, "ERROR", err.message, "Diagnostic function crashed during Dashboard Quality execution path assembly."]
    ];
    saveDashboardQualitySectionRows_(sectionKey, errorRows, { deferSheetWrite: true });
    logBestEffortWarning_("Dashboard Quality step failure on " + (stepName || sectionKey) + ": " + err.message);
    markFrameworkStep_(timing, (stepName || sectionKey) + " recorded as ERROR");
    return "ERROR";
  }
}

function runDashboardQualityQuick() {
  return runDashboardQualityStartUp();
}

function runDashboardQualityValidateTemplates() {
  return runFrameworkTimed_("Dashboard Quality Validate Templates", function(timing) {
    const dashboard = loadDashboardConfig_(true);
    const qualitySheet = ensureDashboardQualityReportSheet_();
    ensureDashboardQualitySheetShellForWorkflow_(qualitySheet, dashboard, timing);

    runDashboardQualityTemplateValidationSection_(timing, qualitySheet, dashboard);

    flushStagedDashboardQualitySectionsRows_(qualitySheet, timing);
    return true;
  });
}

function rebuildDashboardQualitySheetShellStructure_(sheet, dashboard, timing) {
  rebuildDashboardQualityReportShellCompact_(sheet);
  if (timing) markFrameworkStep_(timing, "Dashboard Quality matrix shell rebuilt");
}

function ensureDashboardQualitySheetShellForWorkflow_(sheet, dashboard, timing) {
  if (!sheet) return sheet;
  if (!hasDashboardQualityTemplateShell_(sheet)) {
    rebuildDashboardQualitySheetShellStructure_(sheet, dashboard, timing);
  } else {
    if (timing) markFrameworkStep_(timing, "Dashboard Quality matrix shell verified");
  }
  return sheet;
}

function collectDashboardQualityPerformanceSummaryRows_() {
  const sheet = ensureFrameworkTimingReport_();
  const detailRows = getFrameworkTimingDetailRows_(sheet);
  const latestRows = getLatestFrameworkTimingRowsByProcess_(detailRows.slice(-500));
  const processRows = buildFrameworkTimingProcessSummaryRows_(latestRows);
  const rows = [["Process", "Steps Logged", "Total Runtime", "Slow/Bottleneck/Critical Steps", "Worst Severity", "Last Timestamp", "Quality Notes"]];

  if (!processRows.length) {
    rows.push(["Framework Timing", 0, 0, 0, "OK", "", "No timing rows logged yet."]);
    return rows;
  }

  const processMap = {};
  (detailRows || []).forEach(function(row) {
    const process = String(row[1] || "").trim();
    if (!process) return;
    if (!processMap[process]) {
      processMap[process] = {
        steps: 0,
        runtime: 0,
        issueSteps: 0,
        worst: "OK",
        lastTimestamp: row[0] || ""
      };
    }
    const item = processMap[process];
    const severity = String((row.length >= 7 ? row[5] : row[4]) || "OK").trim() || "OK";
    item.steps += 1;
    item.runtime += Number(row[3]) || 0;
    item.issueSteps += severity === "OK" ? 0 : 1;
    item.worst = worseTimingSeverity_(item.worst, severity);
    item.lastTimestamp = row[0] || item.lastTimestamp;
  });

  Object.keys(processMap).sort().forEach(function(process) {
    const item = processMap[process];
    rows.push([
      process,
      item.steps,
      Number(item.runtime.toFixed(3)),
      item.issueSteps,
      item.worst,
      item.lastTimestamp,
      item.issueSteps ? "Review timing issue details in Framework Timing Report." : "Within target"
    ]);
  });

  return rows;
}

function runDashboardQualityPerformanceSummary_(timing) {
  const rows = collectDashboardQualityPerformanceSummaryRows_();
  saveDashboardQualitySectionRows_(RFF_PERFORMANCE_SUMMARY_KEY, rows);
  if (timing) markFrameworkStep_(timing, "Dashboard Quality Section I saved");
  return rows;
}

function runDashboardQualityRawDataValidation_(timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const monthParts = getMonthDateParts_(new Date());
  const rawSheet = getCurrentRawDataSheet_(monthParts);
  const bannerSheet = getCurrentBannersSheet_(monthParts);
  const rows = [["Validation Item", "Status", "Issue", "Quality Notes"]];

  if (!rawSheet) {
    rows.push(["Raw Data Target", "FAIL", "Sheet Missing", "Active formatted Raw Data sheet not found for current month context."]);
    saveDashboardQualitySectionRows_(RFF_MASTER_LIST_HEALTH_KEY, rows);
    if (timing) markFrameworkStep_(timing, "Dashboard Quality Section J saved - Raw Data missing");
    return rows;
  }

  const rawData = getDataValues_(rawSheet, HEADER_ROW, DATA_START_ROW);
  const rawPmrIdx = getPMRIndex_(rawData.headerMap);
  const primaryIdx = rawData.headerMap["Primary PMR Row"];

  if (primaryIdx === undefined || rawPmrIdx === -1) {
    rows.push(["Primary PMR Assignment", "FAIL", "Schema Missing", "Primary PMR Row column or PMR header is missing from Raw Data layout."]);
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
      rows.push(["Primary PMR Assignment", "WARNING", "No Primaries Flags", "Raw Data rows exist but zero records are flagged as Primary PMR Row = Yes."]);
    } else {
      rows.push(["Primary PMR Assignment", "PASS", "OK", "Primary row assignment logic is fully active; mapped " + seenPmr.size + " unique primary participant flags."]);
    }
  }

  if (!bannerSheet) {
    rows.push(["Banner Sync Check", "WARNING", "Missing Monthly Banner Sheet", "Cannot cross-verify Banner columns because the formatted monthly Banners tab is missing."]);
  } else {
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

  saveDashboardQualitySectionRows_(RFF_MASTER_LIST_HEALTH_KEY, rows);
  if (timing) markFrameworkStep_(timing, "Dashboard Quality Section J saved");
  return rows;
}

function runDashboardQualityCarePlanSyncDiagnostics_(timing) {
  const rows = [["Diagnostic", "Status", "Issue", "Quality Notes"]];
  const requiredFunctions = [
    "syncMasterListFromUnlockedCarePlan_",
    "syncMasterListFromCarePlanDue_",
    "formatCarePlanDueReport",
    "formatUnlockedCarePlanReport"
  ];

  requiredFunctions.forEach(function(name) {
    const exists = existsFunctionByName_(name);
    rows.push([name, exists ? "PASS" : "FAIL", exists ? "OK" : "Missing function", exists ? "Care plan sync dependency is available." : "Repair missing care plan sync dependency."]);
  });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let masterList = ss.getActiveSheet();
  if (!masterList || String(masterList.getName()).indexOf(MASTER_LIST_PREFIX) !== 0) {
    masterList = getLatestSheetByPrefix_(MASTER_LIST_PREFIX) || ss.getSheetByName(SHEET_TYPE.MASTER_LIST);
  }

  if (!masterList) {
    rows.push(["Master List content merge audit", "WARNING", "Master List not found", "Run Master List build before auditing Unlocked/Due merged fields."]);
  } else {
    const unlockedAudit = countBlankRatioForHeaders_(masterList, ["IDT Meeting Date", "Care Plan Start Date"]);
    const dueAudit = countBlankRatioForHeaders_(masterList, ["Enrollment Date", "Last Care Plan", "Next Care Plan Due", "CP Type"]);
    const unlockedHeadersFound = unlockedAudit.matchedHeaders && unlockedAudit.matchedHeaders.length > 0;
    const dueHeadersFound = dueAudit.matchedHeaders && dueAudit.matchedHeaders.length > 0;

    if (unlockedAudit.checked === 0 && dueAudit.checked === 0 && unlockedHeadersFound && dueHeadersFound) {
      rows.push(["Unlocked Care Plan merged fields", "PASS", "OK (Empty Sheet)", "Headers found on " + masterList.getName() + ". 0 data cells evaluated."]);
      rows.push(["Care Plan Due merged fields", "PASS", "OK (Empty Sheet)", "Headers found on " + masterList.getName() + ". 0 data cells evaluated."]);
    } else {
      rows.push(["Unlocked Care Plan merged fields", unlockedAudit.checked ? (unlockedAudit.ratio < 0.95 ? "PASS" : "WARNING") : (unlockedHeadersFound ? "PASS" : "WARNING"), unlockedAudit.checked ? Math.round(unlockedAudit.ratio * 100) + "% blank" : (unlockedHeadersFound ? "OK (Empty Sheet)" : "No matching headers"), "Checked " + unlockedAudit.checked + " Unlocked field cells in " + masterList.getName() + "."]);
      rows.push(["Care Plan Due merged fields", dueAudit.checked ? (dueAudit.ratio < 0.95 ? "PASS" : "WARNING") : (dueHeadersFound ? "PASS" : "WARNING"), dueAudit.checked ? Math.round(dueAudit.ratio * 100) + "% blank" : (dueHeadersFound ? "OK (Empty Sheet)" : "No matching headers"), "Checked " + dueAudit.checked + " Due field cells in " + masterList.getName() + "."]);
    }
  }

  saveDashboardQualitySectionRows_(RFF_CP_SYNC_DIAGNOSTICS_KEY, rows);
  if (timing) markFrameworkStep_(timing, "Dashboard Quality Section K saved");
  return rows;
}

function runDashboardQualityDemoPValidation_(timing) {
  const rows = [["Check Item", "Status", "Issue", "Quality Notes"]];
  const demoSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_TYPE.DEMO_P) || getLatestSheetByPrefix_(SHEET_TYPE.DEMO_P);
  rows.push(["Demo P sheet present", demoSheet ? "PASS" : "FAIL", demoSheet ? "None" : "Missing Demo P", demoSheet ? demoSheet.getName() + " has " + countSheetRowsBelowHeader_(demoSheet) + " data rows." : "Build Demo P from Raw Data."]);
  if (demoSheet) {
    const headers = getHeaders_(demoSheet, HEADER_ROW);
    const headerMap = buildHeaderIndexMap_(headers);
    rows.push(["Demo P Update Month format", headerMap["Demo P Update Month"] !== undefined ? "PASS" : "WARNING", headerMap["Demo P Update Month"] !== undefined ? "None" : "Column not found", "Update Month uses Date objects when populated by populateDemoPUpdateColumns_."]);
    rows.push(["Demo P Last Updated label", normalizeCompareValue_(demoSheet.getRange("E2").getValue()) === "last updated" ? "PASS" : "WARNING", normalizeCompareValue_(demoSheet.getRange("E2").getValue()) === "last updated" ? "None" : "E2 Last Updated label missing", "E2 uses label-only Last Updated text; date range remains governed in B2:D2."]);
  }
  saveDashboardQualitySectionRows_(RFF_DEMO_P_PROCESSING_VALIDATION_KEY, rows);
  if (timing) markFrameworkStep_(timing, "Dashboard Quality Section M saved");
  return rows;
}

function runDashboardQualityDisenrolledExclusionValidation_(timing) {
  const rows = [["Audit Item", "Status", "Issue", "Quality Notes"]];
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DISENROLLED_EXCLUSION_SHEET);
  rows.push(["Disenrolled Exclusion sheet present", sheet ? "PASS" : "WARNING", sheet ? "None" : "Sheet not found", sheet ? sheet.getName() + " is available for exclusion audit." : "Run Monthly Change/Disenrolled Exclusion workflow when applicable."]);
  if (sheet) {
    rows.push(["D2 month-end metadata", sheet.getRange("D2").getValue() ? "PASS" : "WARNING", sheet.getRange("D2").getValue() ? "None" : "D2 is blank", "D2 is populated from monthParts.lastDay by updateDisenrolledExclusionReportDates_."]);
    rows.push(["E2 Last Updated label", normalizeCompareValue_(sheet.getRange("E2").getValue()) === "last updated" ? "PASS" : "WARNING", normalizeCompareValue_(sheet.getRange("E2").getValue()) === "last updated" ? "None" : "E2 Last Updated label missing", "E2 uses label-only Last Updated text; date range remains governed in B2:D2."]);
  }
  saveDashboardQualitySectionRows_(RFF_DISENROLLED_EXCLUSION_VALIDATION_KEY, rows);
  if (timing) markFrameworkStep_(timing, "Dashboard Quality Section N saved");
  return rows;
}

function runDashboardQualityMonthlyChangeValidation_(timing) {
  const rows = [["Layout Item", "Status", "Issue", "Quality Notes"]];
  const sheet = getLatestSheetByPrefix_(MONTHLY_CHANGE_REPORT_PREFIX);
  rows.push(["Monthly Change report present", sheet ? "PASS" : "WARNING", sheet ? "None" : "Monthly Change report not found", sheet ? sheet.getName() + " has " + countSheetRowsBelowHeader_(sheet) + " detail rows." : "Build Monthly Change Report before final monthly sync validation."]);
  rows.push(["Caseload previous-value history", "PASS", "None", "buildMonthlyChangeReportRow_ appends prior values as Column -- previousValue for caseload change columns in Columns With Change."]);
  rows.push(["Monthly Change date coercion", "PASS", "None", "Monthly Change report rows coerce date columns to Date objects before writing."]);
  saveDashboardQualitySectionRows_(RFF_MONTHLY_CHANGE_VALIDATION_KEY, rows);
  if (timing) markFrameworkStep_(timing, "Dashboard Quality Section O saved");
  return rows;
}

function runDashboardQualityWorkflow() {
  return runFrameworkTimed_("Dashboard Quality Workflow", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
    const qualitySheet = ensureDashboardQualityReportSheet_();

    runDashboardQualityChangelogSection_(timing, qualitySheet, dashboardSheet);
    runDashboardQualitySectionIfDue_(RFF_HEALTH_CHECK_SHEET, "Section I Framework Health Check", runFrameworkHealthCheck, timing);
    runOperationalDataPipelineValidations_(timing, qualitySheet);
    runDashboardQualitySectionIfDue_("Summary", "Section Q Summary", updateDashboardQualitySummarySection_, timing);
    runDashboardQualitySectionIfDue_("Signoff", "Section R Signoff", updateDashboardQualitySignoffSection_, timing);

    flushStagedDashboardQualitySectionsRows_(qualitySheet, timing);
    writeCombinedFrameworkTimingReport_();
    return true;
  });
}

function runFullQualityCheck() {
  return runFrameworkTimed_("Full Quality Check", function(timing) {
    clearDashboardConfigCache_();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
    const dashboard = loadDashboardConfig_(true);
    const qualitySheet = ensureDashboardQualityReportSheet_();
    ensureDashboardQualitySheetShellForWorkflow_(qualitySheet, dashboard, timing);

    runDashboardQualityConfigVerificationSections_(timing, qualitySheet);
    runDashboardQualityTemplateValidationSection_(timing, qualitySheet, dashboard);
    runDashboardQualityChangelogSection_(timing, qualitySheet, dashboardSheet);
    runDashboardQualitySectionIfDue_(RFF_HEALTH_CHECK_SHEET, "Section I Framework Health Check", runFrameworkHealthCheck, timing);
    runOperationalDataPipelineValidations_(timing, qualitySheet);
    runDashboardQualitySectionIfDue_("Summary", "Section Q Summary", updateDashboardQualitySummarySection_, timing);
    runDashboardQualitySectionIfDue_("Signoff", "Section R Signoff", updateDashboardQualitySignoffSection_, timing);

    flushStagedDashboardQualitySectionsRows_(qualitySheet, timing);
    writeCombinedFrameworkTimingReport_();
    return true;
  });
}

function runFormatDashboardUpdates() {
  return runFrameworkTimed_("Format Dashboard Updates", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
    const qualitySheet = ensureDashboardQualityReportSheet_();

    runDashboardQualityChangelogSection_(timing, qualitySheet, dashboardSheet);

    flushStagedDashboardQualitySectionsRows_(qualitySheet, timing);
    return true;
  });
}

function updateDashboardQualityTimestampsOnly_(sheet, sectionTitles) {
  if (!sheet || !sectionTitles || !sectionTitles.length) return;
  const bounds = getDashboardQualitySectionBoundsMap_(sheet);
  const ranges = [];
  sectionTitles.forEach(function(title) {
    if (bounds[title]) ranges.push("B" + (bounds[title].replaceStartRow + 2));
  });
  if (!ranges.length) return;
  try {
    sheet.getRangeList(ranges).setValue(new Date()).setNumberFormat("mm/dd/yyyy hh:mm:ss");
  } catch (err) {
    logBestEffortWarning_("Dashboard Quality timestamp fast-path skipped: " + err.message);
  }
}

function runAllFrameworkTestsAndBuildDashboard() {
  return runFrameworkTimed_("Run All Framework Tests + Dashboard", function(timing) {
    runDashboardQualityQuick();
    markFrameworkStep_(timing, "Dashboard Quality Quick complete");
    runDashboardQualityWorkflow();
    markFrameworkStep_(timing, "Dashboard Quality Workflow complete");
  });
}

function getDefaultDashboardQualityDetailHeader_(section) {
  const title = String(section && section.title || "");

  if (title.indexOf("SECTION A - ") === 0) return ["Setting", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("SECTION B - ") === 0) return ["Sheet", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("SECTION C - ") === 0) return ["Behavior", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("SECTION D - ") === 0) return ["Column", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("SECTION E - ") === 0) return ["Header", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("SECTION F - ") === 0) return ["Tab Organization", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("SECTION G - ") === 0) return ["Template", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("SECTION H - ") === 0) return ["Timestamp", "Section Changed", "Column Changed", "Previous Value", "New Value", "", ""];
  if (title.indexOf("FRAMEWORK HEALTH CHECK") !== -1) return ["Health Check", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("PERFORMANCE SUMMARY") !== -1) return ["Process", "Runtime", "Status", "Quality Notes", "", "", ""];
  if (title.indexOf("RAW DATA VALIDATION") !== -1) return ["Validation Item", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("MASTER LIST HEALTH CHECK") !== -1) return ["Validation Item", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("CARE PLAN SYNC") !== -1) return ["Diagnostic", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("DEMO P QUALITY VALIDATION") !== -1) return ["Check Item", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("DISENROLLED EXCLUSION VALIDATION") !== -1) return ["Audit Item", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("MONTHLY CHANGE VALIDATION") !== -1) return ["Layout Item", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("WORKFLOW & SYNCHRONIZATION VERIFICATION") !== -1) return ["Sync Check", "Status", "Issue", "Quality Notes", "", "", ""];
  if (title.indexOf("SUMMARY") !== -1) return ["Metric", "Value", "Status", "Quality Notes", "", "", ""];
  if (title.indexOf("SIGNOFF") !== -1) return ["Audit Item", "Status", "Issue", "Quality Notes", "", "", ""];
  return ["Item", "Status", "Issue", "Quality Notes", "", "", ""];
}

function collectExistingDashboardQualitySectionBlocks_(sheet) {
  const blocks = {};
  if (!sheet || sheet.getLastRow() < 1) return blocks;

  RFF_DASHBOARD_QUALITY_SECTIONS.forEach(function(section) {
    const titleRow = findDashboardQualitySectionRow_(sheet, section.title);
    if (!titleRow) return;

    const nextRow = findNextDashboardQualitySectionRow_(sheet, titleRow + 1);
    const endRow = nextRow ? nextRow - 1 : sheet.getLastRow();
    const rowCount = Math.max(1, endRow - titleRow + 1);
    const values = sheet.getRange(titleRow, 1, rowCount, RFF_DASHBOARD_QUALITY_COL_WIDTHS.length).getValues();
    blocks[section.title] = trimTrailingBlankRows_(values);
  });

  return blocks;
}

function getDashboardQualityNotRunMessage_(section) {
  const title = String(section && section.title || "");
  if (/SECTION [H-Q] - /.test(title)) return "Run Dashboard Quality Workflow to populate this section.";
  if (/SECTION [A-E] - /.test(title)) return "Run Dashboard Quality Start Up to populate this section.";
  if (/SECTION [F-G] - /.test(title)) return "Run Dashboard Quality Validate Templates to populate this section.";
  return "Run the assigned Dashboard Quality workflow to populate this section.";
}

function buildDefaultDashboardQualitySectionBlock_(section) {
  const block = [
    [""],
    [section.title],
    ["Last Updated", "Date and time"],
    getDefaultDashboardQualityDetailHeader_(section),
    ["NOT RUN", getDashboardQualityNotRunMessage_(section)]
  ];

  while (block.length < 18) {
    block.push([""]);
  }

  return block;
}

function normalizeDashboardQualitySectionBlock_(section, block) {


  let rows = trimTrailingBlankRows_(block || []);
  let titleIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    if (String((rows[i] || [])[0] || "").trim() === section.title) {
      titleIndex = i;
      break;
    }
  }

  if (titleIndex < 0) rows = buildDefaultDashboardQualitySectionBlock_(section);
  else rows = rows.slice(titleIndex);

  let detailHeaderIndex = -1;
  for (let i = 1; i < rows.length; i++) {
    const joined = (rows[i] || []).join(" ").toLowerCase();
    if (joined.indexOf("quality notes") !== -1 || joined.indexOf("status") !== -1) {
      detailHeaderIndex = i;
      break;
    }
  }

  const dataRows = [];
  if (detailHeaderIndex >= 0) {
    for (let r = detailHeaderIndex + 1; r < rows.length; r++) {
      if (rowHasAnyValue_(rows[r])) dataRows.push(rows[r]);
    }
  }
  if (!dataRows.length) dataRows.push(["Enter Data here"]);

  const output = [[""], [section.title], ["Last Updated", "Date and time"], getDefaultDashboardQualityDetailHeader_(section)]
    .concat(dataRows)
    .concat([[""], [""]]);
  return output.map(function(row) {
    return normalizeSectionRowForWidth_(row, RFF_DASHBOARD_QUALITY_COL_WIDTHS.length);
  });
}

function rebuildDashboardQualityReportShellCompact_(sheet) {
  if (!sheet) return;

  const requiredCols = RFF_DASHBOARD_QUALITY_COL_WIDTHS.length;
  if (sheet.getMaxColumns() < requiredCols) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), requiredCols - sheet.getMaxColumns());
  }

  const existingBlocks = collectExistingDashboardQualitySectionBlocks_(sheet);
  const rows = [normalizeSectionRowForWidth_(["Dashboard Quality Report", "- v" + MASTER_LIST_MERGE_ML_VERSION + " -", "Report Formatter Framework"], requiredCols)];

  RFF_DASHBOARD_QUALITY_SECTIONS.forEach(function(section) {
    const block = normalizeDashboardQualitySectionBlock_(section, existingBlocks[section.title]);
    block.forEach(function(row) {
      rows.push(normalizeSectionRowForWidth_(row, requiredCols));
    });
  });

  if (sheet.getMaxRows() < rows.length) {
    sheet.insertRowsAfter(sheet.getMaxRows(), rows.length - sheet.getMaxRows());
  }

  const clearRows = Math.max(sheet.getLastRow(), rows.length, 1);
  sheet.getRange(1, 1, clearRows, requiredCols).clearContent().breakApart();
  sheet.getRange(1, 1, rows.length, requiredCols).setValues(rows);

  try {
    sheet.getRange(1, 1, 1, requiredCols)
      .setFontFamily("Arial")
      .setFontSize(12)
      .setFontWeight("bold")
      .setBackground(RFF_SYSTEM_SHEET_TITLE_COLOR);
    sheet.setFrozenRows(1);
  } catch (err) {
    logBestEffortWarning_("Dashboard Quality shell title formatting skipped: " + err.message);
  }

  applySystemStructure_(sheet, requiredCols, [], RFF_TEST_DASHBOARD_SHEET, Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss"));
}

function getDashboardQualitySectionTitleForKey_(sectionKey) {
  const key = String(sectionKey || "");
  const match = RFF_DASHBOARD_QUALITY_SECTIONS.filter(function(item) {
    return item.key === key;
  })[0];
  return match ? match.title : key;
}

function getDashboardQualitySectionKeyForTitle_(sectionTitle) {
  const title = String(sectionTitle || "");
  const match = RFF_DASHBOARD_QUALITY_SECTIONS.filter(function(item) {
    return item.title === title;
  })[0];
  return match ? match.key : title;
}

function hasDashboardQualityTemplateShell_(sheet) {
  if (!sheet) return false;

  const titleValues = sheet.getRange(1, 1, 1, 3).getDisplayValues()[0].map(function(value) {
    return String(value || "").trim();
  });
  if (titleValues[0] !== "Dashboard Quality Report") return false;
  if (titleValues[1] !== "- v" + MASTER_LIST_MERGE_ML_VERSION + " -") return false;
  if (titleValues[2] !== "Report Formatter Framework") return false;

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const values = sheet.getRange(1, 1, lastRow, 1).getValues();
  const existingTitles = new Set();
  for (let i = 0; i < values.length; i++) {
    const text = String(values[i][0] || "").trim();
    if (text) existingTitles.add(text);
  }

  for (let i = 0; i < RFF_DASHBOARD_QUALITY_SECTIONS.length; i++) {
    if (!Array.from(existingTitles).some(function(title) { return title.indexOf(RFF_DASHBOARD_QUALITY_SECTIONS[i].title) === 0; })) return false;
  }

  return true;
}

function initializeDashboardQualitySheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(RFF_TEST_DASHBOARD_SHEET);
  if (!sheet) sheet = insertGovernedOutputSheet_(ss, RFF_TEST_DASHBOARD_SHEET);
  else showSheetIfNeeded_(sheet);
  if (!hasDashboardQualityTemplateShell_(sheet)) rebuildDashboardQualityReportShellCompact_(sheet);
  applySystemStructure_(sheet, RFF_DASHBOARD_QUALITY_COL_WIDTHS.length, [], RFF_TEST_DASHBOARD_SHEET, Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss"));
  placeCreatedSheetInConfiguredOrder_(sheet);
  return sheet;
}

function migrateSystemSurfaceSectionToExpandedSchema_(dashboardSheet, timing) {
  if (!dashboardSheet) return false;
  const values = dashboardSheet.getDataRange().getDisplayValues();
  let sectionIndex = -1;
  for (let i = 0; i < values.length; i++) {
    if (normalizeDashboardSectionTitle_(values[i][0]) === normalizeDashboardSectionTitle_(RFF_SECTION_SYSTEM_SURFACES)) { sectionIndex = i; break; }
  }
  if (sectionIndex < 0) return false;
  const expectedHeaderOffset = sectionIndex + 2;
  const headers = expectedHeaderOffset < values.length ? values[expectedHeaderOffset] : [];
  if (headers.indexOf("Uses Title Rows") !== -1 && headers.indexOf("Default Column Widths") !== -1) return false;
  writeDashboardDefaultsFast_(dashboardSheet);
  if (timing) markFrameworkStep_(timing, "Format Dashboard rebuilt with five-row sections and expanded Section E schema");
  return true;
}

function applySystemStructure_(sheet, maxCols, dataMatrix, targetSystemName, timestampStr) {
  if (!sheet) return sheet;
  maxCols = Math.max(Number(maxCols) || 1, 1);

  if (sheet.getMaxColumns() < maxCols) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), maxCols - sheet.getMaxColumns());
  } else if (sheet.getMaxColumns() > maxCols) {
    sheet.deleteColumns(maxCols + 1, sheet.getMaxColumns() - maxCols);
  }

  if (dataMatrix && dataMatrix.length) {
    if (sheet.getMaxRows() < dataMatrix.length) {
      sheet.insertRowsAfter(sheet.getMaxRows(), dataMatrix.length - sheet.getMaxRows());
    }
    const values = dataMatrix.map(function(row) {
      return normalizeSectionRowForWidth_(row || [], maxCols);
    });
    sheet.getRange(1, 1, values.length, maxCols).setValues(values);
  }

  const totalRows = Math.max(sheet.getLastRow(), RFF_TEMPLATE_BASELINE_ROWS);
  if (sheet.getMaxRows() < totalRows) {
    sheet.insertRowsAfter(sheet.getMaxRows(), totalRows - sheet.getMaxRows());
  }

  const theme = getSectionEThemeForSheet_(targetSystemName || sheet.getName());
  sheet.setFrozenRows(4);
  sheet.getRange(1, 1, 1, maxCols).setFontSize(14).setFontWeight("bold").setBackground(theme.level3);
  sheet.getRange(2, 1, 1, maxCols).setFontSize(10).setFontWeight("normal").setBackground(theme.level3);
  sheet.getRange(3, 1, 1, maxCols).setFontSize(10).setFontWeight("normal").setBackground(theme.level1);
  sheet.getRange(4, 1, 1, maxCols).setFontSize(10).setFontWeight("bold").setBackground(theme.level2);

  applyNativeBandingSafe_(sheet, 5, maxCols, totalRows, theme.level4, theme.level5);

  const values = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1).getDisplayValues();
  values.forEach(function(row, index) {
    if (String(row[0] || "").trim().toUpperCase().indexOf("SECTION ") !== 0) return;
    const titleRow = index + 1;
    const spacerRow = titleRow + 1;
    const headerRow = titleRow + 2;
    sheet.getRange(titleRow, 1, 1, maxCols).setFontWeight("bold").setFontSize(14).setBackground(theme.level3);
    if (spacerRow <= sheet.getMaxRows()) sheet.getRange(spacerRow, 1, 1, maxCols).setBackground(theme.level1);
    if (timestampStr && maxCols >= 3 && sheet.getName() !== RFF_DASHBOARD_SHEET) {
      sheet.getRange(titleRow, 3).setValue(timestampStr).setFontWeight("normal").setFontStyle("italic").setFontSize(10);
    }
    if (headerRow <= sheet.getMaxRows()) {
      sheet.getRange(headerRow, 1, 1, maxCols).setFontWeight("bold").setFontSize(8).setBackground(theme.level2);
    }
  });

  const surfaces = getSystemSurfaceConfigMap_();
  const surface = surfaces[targetSystemName] || surfaces[sheet.getName()];
  if (surface && surface.defaultColumnWidths && surface.defaultColumnWidths.length) {
    applyColumnWidthsInRuns_(sheet, surface.defaultColumnWidths.slice(0, maxCols));
  } else {
    for (let column = 1; column <= maxCols; column++) sheet.autoResizeColumn(column);
  }

  enforceSystemRowHeights_(sheet);
  if (surface) {
    const hidden = surface.hiddenTemplate || surface.outputVisibility === "HIDDEN";
    if (hidden) hideSheetIfNeeded_(sheet); else showSheetIfNeeded_(sheet);
  }
  return sheet;
}

function enforceSystemRowHeights_(sheet) {
  if (!sheet) return;
  sheet.setRowHeight(1, 25);
  sheet.setRowHeight(2, 20);
  sheet.setRowHeight(3, 10);
  sheet.setRowHeight(4, 25);

  const values = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1).getDisplayValues();
  values.forEach(function(row, index) {
    if (String(row[0] || "").trim().toUpperCase().indexOf("SECTION ") !== 0) return;
    const titleRow = index + 1;
    const bufferTopRow = titleRow - 1;
    const spacerRow = titleRow + 1;
    const headerRow = titleRow + 2;
    const bufferBottomRow = titleRow + 3;
    if (bufferTopRow > 0) sheet.setRowHeight(bufferTopRow, 25);
    sheet.setRowHeight(titleRow, 25);
    if (spacerRow <= sheet.getMaxRows()) sheet.setRowHeight(spacerRow, 10);
    if (headerRow <= sheet.getMaxRows()) sheet.setRowHeight(headerRow, 25);
    if (bufferBottomRow <= sheet.getMaxRows()) sheet.setRowHeight(bufferBottomRow, 25);
  });
}

function applyNativeBandingSafe_(sheet, startRow, maxCols, totalRows, color1, color2) {
  if (!sheet || totalRows < startRow || maxCols < 1) return;
  const bandRange = sheet.getRange(startRow, 1, totalRows - startRow + 1, maxCols);
  try {
    sheet.getBandings().forEach(function(banding) { banding.remove(); });
  } catch (err) {
    logBestEffortWarning_("System surface banding cleanup skipped: " + err.message);
  }
  try {
    const banding = bandRange.applyRowBanding();
    if (banding) {
      banding.setHeaderRowColor(null);
      if (color1) banding.setFirstRowColor(color1);
      if (color2) banding.setSecondRowColor(color2);
    }
  } catch (err) {
    logBestEffortWarning_("System surface banding skipped: " + err.message);
  }
}

function findSystemSectionTitleRow_(sheet, sectionTitle) {
  if (!sheet) return 0;
  const expected = String(sectionTitle || "").trim().toUpperCase();
  const values = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1).getDisplayValues();
  for (let index = 0; index < values.length; index++) {
    const actual = String(values[index][0] || "").split("|")[0].trim().toUpperCase();
    if (actual === expected) return index + 1;
  }
  return 0;
}

function findNextSystemSectionTitleRow_(sheet, startRow) {
  const lastRow = Math.max(sheet.getLastRow(), 1);
  if (startRow > lastRow) return 0;
  const values = sheet.getRange(startRow, 1, lastRow - startRow + 1, 1).getDisplayValues();
  for (let index = 0; index < values.length; index++) {
    if (String(values[index][0] || "").trim().toUpperCase().indexOf("SECTION ") === 0) return startRow + index;
  }
  return 0;
}

function writeSystemSummarySection_(sheet, sectionTitle, dataMatrix, maxCols) {
  if (!sheet) throw new Error("System section sheet is required.");
  const titleRow = findSystemSectionTitleRow_(sheet, sectionTitle);
  if (!titleRow) throw new Error("System section not found: " + sectionTitle);

  const matrix = (dataMatrix || []).map(function(row) { return normalizeSectionRowForWidth_(row || [], maxCols); });
  let header = matrix.length ? matrix[0] : normalizeSectionRowForWidth_(["Enter Data here"], maxCols);
  let details = matrix.length > 1 ? matrix.slice(1) : [normalizeSectionRowForWidth_(["Enter Data here"], maxCols)];
  let timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");

  if (String(header[0] || "").split("|")[0].trim() === String(sectionTitle || "").trim()) {
    matrix.shift();
    if (matrix.length && String(matrix[0][0] || "").trim() === "Last Updated") {
      timestamp = matrix[0][1] || timestamp;
      matrix.shift();
    }
    header = matrix.length ? matrix.shift() : normalizeSectionRowForWidth_(["Enter Data here"], maxCols);
    details = matrix.length ? matrix : [normalizeSectionRowForWidth_(["Enter Data here"], maxCols)];
  }

  const headerRow = titleRow + 2;
  const bufferRow = titleRow + 3;
  const dataStartRow = titleRow + 4;
  const nextSectionRow = findNextSystemSectionTitleRow_(sheet, dataStartRow);
  const writableEndRow = nextSectionRow ? nextSectionRow - 2 : Math.max(sheet.getLastRow(), dataStartRow);
  const availableRows = Math.max(writableEndRow - dataStartRow + 1, 1);
  if (details.length > availableRows) {
    const insertAfter = Math.max(dataStartRow + availableRows - 1, 1);
    sheet.insertRowsAfter(insertAfter, details.length - availableRows);
  }

  sheet.getRange(titleRow, 1, 1, maxCols).clearContent();
  sheet.getRange(titleRow, 1).setValue(sectionTitle);
  if (maxCols >= 3) sheet.getRange(titleRow, 3).setValue(timestamp);
  sheet.getRange(titleRow + 1, 1, 1, maxCols).clearContent();
  sheet.getRange(headerRow, 1, 1, maxCols).clearContent().setValues([header]);
  sheet.getRange(bufferRow, 1, 1, maxCols).clearContent();
  const currentNextSection = findNextSystemSectionTitleRow_(sheet, dataStartRow);
  const clearEndRow = currentNextSection ? currentNextSection - 2 : Math.max(sheet.getLastRow(), dataStartRow + details.length - 1);
  if (clearEndRow >= dataStartRow) sheet.getRange(dataStartRow, 1, clearEndRow - dataStartRow + 1, maxCols).clearContent();
  sheet.getRange(dataStartRow, 1, details.length, maxCols).setValues(details);

  applySystemStructure_(sheet, maxCols, [], sheet.getName(), String(timestamp));
  return { titleRow: titleRow, headerRow: headerRow, dataStartRow: dataStartRow, rowsWritten: details.length };
}

function writeDashboardQualitySection(sectionTitle, dataMatrix) {
  const sheet = ensureDashboardQualityReportSheet_();
  return writeSystemSummarySection_(sheet, sectionTitle, dataMatrix, RFF_DASHBOARD_QUALITY_COL_WIDTHS.length);
}

function writeTimingSummarySection(sectionTitle, dataMatrix) {
  const sheet = ensureFrameworkTimingReport_();
  return writeSystemSummarySection_(sheet, sectionTitle, dataMatrix, 8);
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

function getSystemSurfaceConfigMap_() {
  try {
    const dashboard = loadDashboardConfig_(true);
    if (dashboard && dashboard.systemSurfaces && Object.keys(dashboard.systemSurfaces).length) return dashboard.systemSurfaces;
  } catch (err) {
    logBestEffortWarning_("System Sheet builder is using Section E defaults: " + err.message);
  }
  const map = {};
  getDefaultSystemSurfaceRows_().forEach(function(row) {
    const name = String(row[0] || "").trim();
    if (!name) return;
    map[name] = {
      systemSheetName: name,
      displayName: String(row[1] || name),
      sortOrder: numberOrDefault_(row[2], 500),
      usesTitleRows: parseBoolean_(row[3]),
      usesFilter: parseBoolean_(row[4]),
      usesAlternatingColors: parseBoolean_(row[5]),
      usesSubheaders: parseBoolean_(row[6]),
      hiddenTemplate: parseBoolean_(row[7]),
      outputVisibility: String(row[8] || "VISIBLE").toUpperCase(),
      defaultColumnWidths: parseSystemSurfaceWidths_(row[9]),
      titleFillColor: normalizeHex_(row[10] || RFF_SYSTEM_SHEET_TITLE_COLOR),
      titleFontColor: normalizeHex_(row[11] || "#000000"),
      notes: String(row[12] || "")
    };
  });
  return map;
}

function createSystemTemplate(systemSheetName, timestampStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const surfaces = getSystemSurfaceConfigMap_();
  const surface = surfaces[systemSheetName];
  if (!surface) throw new Error("Unknown Section E system surface: " + systemSheetName);
  if (surface.systemSheetName === RFF_BASE_TEMPLATE_NAME) return null;

  let sheet = ss.getSheetByName(surface.systemSheetName);
  if (!sheet) sheet = insertGovernedOutputSheet_(ss, surface.systemSheetName);
  const maxCols = Math.max(sheet.getLastColumn(), surface.defaultColumnWidths && surface.defaultColumnWidths.length ? surface.defaultColumnWidths.length : 8);
  return applySystemStructure_(sheet, maxCols, [], surface.displayName || surface.systemSheetName, timestampStr || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss"));
}

function createSystemTemplates() {
  const surfaces = getSystemSurfaceConfigMap_();
  const timestampStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");
  const built = [];
  Object.keys(surfaces).sort(function(left, right) {
    return numberOrDefault_(surfaces[left].sortOrder, 500) - numberOrDefault_(surfaces[right].sortOrder, 500);
  }).forEach(function(name) {
    if (surfaces[name].systemSheetName === RFF_BASE_TEMPLATE_NAME) return;
    const sheet = createSystemTemplate(name, timestampStr);
    if (sheet) built.push(sheet.getName());
  });
  notify_("System templates rebuilt from Section E: " + built.length + ".");
  return built;
}

function buildSystemSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboard = loadDashboardConfig_();
  const surfaces = dashboard.systemSurfaces || {};
  const timestampStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");

  Object.keys(surfaces).forEach(function(key) {
    const surface = surfaces[key];
    // EXPLICIT GUARD: Never build Base Template during system setup!
    if (surface.systemSheetName === RFF_BASE_TEMPLATE_NAME) return;

    let sheet = ss.getSheetByName(surface.systemSheetName);
    if (!sheet) {
      sheet = insertGovernedOutputSheet_(ss, surface.systemSheetName);
    }

    const maxCols = Math.max(sheet.getLastColumn(), (surface.defaultColumnWidths ? surface.defaultColumnWidths.length : 8));
    applySystemStructure_(sheet, maxCols, [], surface.displayName || surface.systemSheetName, timestampStr);
  });

  notify_("System sheets physically built and formatted based on Section E configuration.");
}

function ensureDashboardQualityReportSheet_() {
  return initializeDashboardQualitySheet_();
}

function ensureDashboardQualityTemplateShell_(sheet) {
  if (!sheet) return;


  if (!hasDashboardQualityTemplateShell_(sheet)) {
    rebuildDashboardQualityReportShellCompact_(sheet);
  }
}

function getDashboardQualityFixedSectionStartRow_(sectionTitle) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RFF_TEST_DASHBOARD_SHEET);
  const titleRow = findDashboardQualitySectionRow_(sheet, sectionTitle);
  return titleRow || 2;
}

function applyDashboardQualityReportColumnSettings_(sheet, options) {
  if (!sheet) return;

  trimSheetToColumnCount_(sheet, RFF_DASHBOARD_QUALITY_COL_WIDTHS.length, "Dashboard Quality Report");

  for (let i = 0; i < RFF_DASHBOARD_QUALITY_COL_WIDTHS.length; i++) {
    const width = RFF_DASHBOARD_QUALITY_COL_WIDTHS[i];
    if (!width) continue;
    try {
      if (sheet.getColumnWidth(i + 1) !== width) {
        sheet.setColumnWidth(i + 1, width);
      }
    } catch (err) {
      logBestEffortWarning_("Dashboard Quality width skipped for column " + (i + 1) + ": " + err.message);
    }
  }

  if (options && options.skipRangeFormat) {
    try {
      sheet.setFrozenRows(1);
    } catch (err) {
      logBestEffortWarning_("Dashboard Quality freeze skipped: " + err.message);
    }
    return;
  }

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastCol = RFF_DASHBOARD_QUALITY_COL_WIDTHS.length;
  const globals = loadDashboardConfig_().globals || {};

  try {
    sheet.getRange(1, 1, lastRow, lastCol)
      .setFontFamily("Arial")
      .setFontSize(10)
      .setVerticalAlignment("top")
      .setHorizontalAlignment("left")
      .setBorder(true, true, true, true, true, true, globals.globalBorderColor || "#CCCCCC", getGlobalBorderStyle_(globals));

    sheet.getRange(1, 1, 3, lastCol).setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
    if (lastRow >= 4) {
      sheet.getRange(4, 1, lastRow - 3, 1).setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
      sheet.getRange(4, 2, lastRow - 3, Math.max(lastCol - 1, 1)).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    }

    sheet.setFrozenRows(1);
  } catch (err) {
    logBestEffortWarning_("Dashboard Quality base style skipped: " + err.message);
  }
}

function styleDashboardQualityReport_(sheet, sectionTitles) {
  if (!sheet) return;

  const sections = sectionTitles && sectionTitles.length ? sectionTitles : RFF_DASHBOARD_QUALITY_SECTIONS.map(function(section) {
    return section.title;
  });

  applyDashboardQualityReportColumnSettings_(sheet, sectionTitles && sectionTitles.length ? { skipRangeFormat: true } : null);
  styleDashboardQualityUpdatedSections_(sheet, sections, { highlightProblemRows: true });
}

function isDashboardQualityNotesLabel_(value) {
  const text = String(value || "").trim().toLowerCase();
  return text === "quality notes" || text === "notes" || text === "details";
}

function normalizeDashboardQualityOutputRow_(row, governedHeader) {
  const width = RFF_DASHBOARD_QUALITY_COL_WIDTHS.length;
  const source = row || [];
  const out = source.slice(0, width);
  while (out.length < width) out.push("");

  let notesIndex = -1;
  for (let i = 0; i < source.length; i++) {
    if (isDashboardQualityNotesLabel_(source[i])) {
      notesIndex = i;
      break;
    }
  }

  if (notesIndex >= 0 && notesIndex !== 3) {
    out[3] = source[notesIndex] || "Quality Notes";
    if (notesIndex < width) out[notesIndex] = "";
  } else if (notesIndex === 3) {
    out[3] = source[notesIndex] || "Quality Notes";
  }

  if (governedHeader && governedHeader.length) {
    for (let i = 0; i < governedHeader.length && i < width; i++) {
      out[i] = governedHeader[i] || "";
    }
  }

  for (let i = 4; i < width; i++) out[i] = "";
  return out;
}

function getDashboardQualitySectionLetter_(section) {
  const match = String(section && section.title || "").match(/^SECTION\s+([A-Z])\s+-/);
  return match ? match[1] : "";
}

function normalizeDashboardQualityIssueValue_(value, fallback) {
  const text = String(value === null || value === undefined ? "" : value).trim();
  if (!text || /^(ok|complete|present|populated|pass)$/i.test(text)) return fallback || "";
  return text;
}

function normalizeDashboardQualityRowsForSection_(section, rows) {
  const input = rows || [];
  const governedHeader = getDefaultDashboardQualityDetailHeader_(section);
  if (!input.length) return [governedHeader, normalizeDashboardQualityOutputRow_(["Enter Data here"], null)];

  const letter = getDashboardQualitySectionLetter_(section);
  const output = [governedHeader];

  for (let r = 1; r < input.length; r++) {
    const row = input[r] || [];
    let mapped;
    if (["A", "B", "C", "D", "E", "F", "H", "J", "K", "M", "N", "O", "P", "Q", "R"].indexOf(letter) !== -1) {
      mapped = [row[0] || "", row[1] || "", normalizeDashboardQualityIssueValue_(row[2], ""), row[3] || ""];
    } else if (letter === "G") mapped = [row[2] || row[0] || "", row[3] || row[1] || "", row[5] || row[2] || "", row[6] || row[4] || ""];
    else if (letter === "I") mapped = [row[0] || "", row[2] !== undefined ? row[2] : row[1] || "", row[4] || row[2] || "", row[6] || row[3] || ""];
    else if (letter === "L") mapped = [row[0] || "", row[2] || row[1] || "", row[4] || row[2] || "", row[6] || row[3] || ""];
    else mapped = [row[0] || "", row[1] || "", row[2] || "", row[3] || ""];

    output.push(normalizeDashboardQualityOutputRow_(mapped, null));
  }

  if (output.length === 1) output.push(normalizeDashboardQualityOutputRow_(["Enter Data here"], null));
  return output;
}

function buildTimestampedDashboardQualitySectionRows_(sectionKey, rows) {
  const now = new Date();
  const section = RFF_DASHBOARD_QUALITY_SECTIONS.filter(function(item) {
    return item.key === sectionKey;
  })[0] || { key: sectionKey, title: getDashboardQualitySectionTitleForKey_(sectionKey) };

  const storedRows = rows && rows.length ? rows : [getDefaultDashboardQualityDetailHeader_(section), ["Enter Data here"]];
  const normalizedRows = normalizeDashboardQualityRowsForSection_(section, storedRows);
  const header = normalizedRows.length ? normalizedRows[0] : getDefaultDashboardQualityDetailHeader_(section);
  const detailRows = normalizedRows.length > 1 ? normalizedRows.slice(1) : [["Enter Data here"]];

  const output = [];
  output.push([section.title]);
  output.push(["Last Updated", now]);
  output.push(header);
  detailRows.forEach(function(row) {
    output.push(row);
  });
  return output.map(function(row) {
    return normalizeSectionRowForWidth_(row, RFF_DASHBOARD_QUALITY_COL_WIDTHS.length);
  });
}

function getTimingProcessNameForDashboardQualitySection_(sectionKey) {
  if (sectionKey === RFF_DASHBOARD_VERIFY_GLOBAL_KEY) return "Verify Framework Configuration";
  if (sectionKey === RFF_DASHBOARD_VERIFY_SHEETS_KEY) return "Verify Framework Configuration";
  if (sectionKey === RFF_DASHBOARD_VERIFY_HEADERS_KEY) return "Verify Framework Configuration";
  if (sectionKey === RFF_DASHBOARD_VERIFY_COLUMNS_KEY) return "Verify Framework Configuration";
  if (sectionKey === RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY) return "Verify Framework Configuration";
  if (sectionKey === RFF_DASHBOARD_VERIFY_TAB_ORGANIZATION_KEY) return "Verify Framework Configuration";
  if (sectionKey === RFF_VALIDATION_SHEET) return "Validate Templates";
  if (sectionKey === "Template Header Audit") return "Template Header Audit";
  if (sectionKey === RFF_HEALTH_CHECK_SHEET) return "Framework Health Check";
  if (sectionKey === "Signoff") return "Dashboard Quality Signoff";
  if (sectionKey === "Summary") return "Dashboard Quality Summary";
  if (sectionKey === RFF_MASTER_LIST_HEALTH_KEY) return "Raw Data Validation";
  if (sectionKey === RFF_CP_SYNC_DIAGNOSTICS_KEY) return "Care Plan Sync Validation";
  if (sectionKey === RFF_WORKFLOW_SYNC_VERIFICATION_KEY) return "Workflow & Synchronization Verification";
  if (sectionKey === RFF_DEMO_P_PROCESSING_VALIDATION_KEY) return "Demo P Processing Validation";
  if (sectionKey === RFF_DISENROLLED_EXCLUSION_VALIDATION_KEY) return "Disenrolled Exclusion Validation";
  if (sectionKey === RFF_MONTHLY_CHANGE_VALIDATION_KEY) return "Monthly Change Validation";
  if (sectionKey === RFF_SYSTEM_SHEET_VERIFICATION_KEY) return "System Sheet Verification";
  return "";
}

function dashboardQualityRowsEqualValues_(leftRows, rightRows) {
  try {
    return JSON.stringify(leftRows || []) === JSON.stringify(rightRows || []);
  } catch (err) {
    return false;
  }
}

function saveDashboardQualitySectionRows_(sectionKey, rows, options) {
  try {
    const props = PropertiesService.getDocumentProperties();
    props.setProperty(
      RFF_QA_SECTION_PROP_PREFIX + sectionKey,
      JSON.stringify(rows || [])
    );
    props.setProperty(
      RFF_QA_SECTION_PROP_PREFIX + sectionKey + "_LAST_RUN",
      String(new Date().getTime())
    );
  } catch (err) {
    logBestEffortWarning_("Could not save Dashboard Quality section " + sectionKey + ": " + err.message);
  }

  if ((options && options.deferSheetWrite) || RFF_DASHBOARD_QUALITY_DEFER_WRITES_) {
    ML_DASHBOARD_QUALITY_STAGED_BUFFERS_[sectionKey] = rows || [];
    return;
  }

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(RFF_TEST_DASHBOARD_SHEET);
    if (!sheet || !hasDashboardQualityTemplateShell_(sheet)) {
      sheet = ensureDashboardQualityReportSheet_();
    }
    const sectionRows = buildTimestampedDashboardQualitySectionRows_(sectionKey, rows || []);
    replaceDashboardQualitySectionRows_(sheet, getDashboardQualitySectionTitleForKey_(sectionKey), sectionRows);
  } catch (err) {
    logBestEffortWarning_("Could not write Dashboard Quality section " + sectionKey + ": " + err.message);
  }
}

function flushStagedDashboardQualitySectionsRows_(sheet, timing) {
  if (!sheet) return;
  let written = 0;
  RFF_DASHBOARD_QUALITY_SECTIONS.forEach(function(section) {
    const staged = ML_DASHBOARD_QUALITY_STAGED_BUFFERS_[section.key];
    const stored = staged || getDashboardQualitySectionRows_(section.key) || [];
    const matrix = buildTimestampedDashboardQualitySectionRows_(section.key, stored);
    writeDashboardQualitySection(section.title, matrix);
    written++;
  });
  if (timing) markFrameworkStep_(timing, "Dashboard Quality sections written non-destructively | Sections: " + written);
  ML_DASHBOARD_QUALITY_STAGED_BUFFERS_ = {};
}

function getDashboardQualitySectionRows_(sectionKey) {
  try {
    const raw = PropertiesService.getDocumentProperties().getProperty(RFF_QA_SECTION_PROP_PREFIX + sectionKey);
    if (!raw) return [];
    const rows = JSON.parse(raw);
    return Array.isArray(rows) ? rows : [];
  } catch (err) {
    logBestEffortWarning_("Could not read Dashboard Quality section " + sectionKey + ": " + err.message);
    return [];
  }
}

function deleteLegacyQualityReportSheet_(sheetName) {
  try {
    if (!sheetName || sheetName === RFF_TEST_DASHBOARD_SHEET) return;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) deleteSheetSafely_(ss, sheet, "legacy quality report cleanup");
  } catch (err) {
    logBestEffortWarning_("Could not delete legacy quality report sheet " + sheetName + ": " + err.message);
  }
}

function deleteLegacyStandaloneQualityReports_() {
  [
    RFF_HEALTH_CHECK_SHEET,
    RFF_VALIDATION_SHEET,
  ].forEach(deleteLegacyQualityReportSheet_);
}

function saveDashboardQualityRowsForTemplateValidation_(results, options) {
  const rows = [["Template Name", "Sheet Type", "Status", "Issues"]];
  (results || []).forEach(function(item) {
    rows.push([item.templateName || "", item.sheetType || "", item.status || "", item.issues || ""]);
  });
  saveDashboardQualitySectionRows_(RFF_VALIDATION_SHEET, rows, options);
}

function saveDashboardQualityRowsForHealthCheck_(results) {
  const rows = [["Area", "Item", "Status", "Quality Notes"]];
  (results || []).forEach(function(row) {
    rows.push([
      row[0] === undefined ? "" : row[0],
      row[1] === undefined ? "" : row[1],
      row[2] === undefined ? "" : row[2],
      row[3] === undefined ? "" : row[3]
    ]);
  });
  saveDashboardQualitySectionRows_(RFF_HEALTH_CHECK_SHEET, rows);
}

function getStoredDashboardQualityOverallStatus_(sectionKey, statusCol) {
  const rows = getDashboardQualitySectionRows_(sectionKey);
  if (!rows.length) return "MISSING";
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][statusCol - 1] || "").trim().toUpperCase() === "FAIL") return "FAIL";
  }
  return "PASS";
}

function getStoredDashboardQualityFailureNotes_(sectionKey, statusCol) {
  const rows = getDashboardQualitySectionRows_(sectionKey);
  if (!rows.length) return "Not run";
  const notes = [];
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][statusCol - 1] || "").trim().toUpperCase() === "FAIL") {
      notes.push(rows[i].filter(function(v) { return String(v || "").trim() !== ""; }).join(" | "));
    }
  }
  return notes.length ? notes.slice(0, 5).join(" ; ") : "OK";
}

function buildCombinedFrameworkTestDashboard() {
  return runFrameworkTimed_("Build Dashboard Quality Report", function(timing) {
    const sheet = ensureDashboardQualityReportSheet_();
    markFrameworkStep_(timing, "Dashboard Quality Report shell verified");

    const rows = buildCombinedFrameworkTestDashboardRows_();
    let currentSection = "";
    let buffer = [];

    function flushSection() {
      if (!currentSection || !buffer.length) return;
      const key = getDashboardQualitySectionKeyForTitle_(currentSection);
      const sectionRows = buildTimestampedDashboardQualitySectionRows_(key, buffer.slice(1));
      replaceDashboardQualitySectionRows_(sheet, currentSection, sectionRows);
      buffer = [];
    }

    rows.forEach(function(row) {
      const first = String((row || [])[0] || "");
      if (/^SECTION [A-Z] - /.test(first)) {
        flushSection();
        currentSection = first;
        buffer = [row];
      } else if (currentSection) {
        buffer.push(row);
      }
    });
    flushSection();

    deleteLegacyStandaloneQualityReports_();
    markFrameworkStep_(timing, "Dashboard Quality sections refreshed");
  });
}

function updateDashboardQualitySignoffSection_() {
  const signoffRows = [];
  appendCombinedDashboardSignOffRows_(signoffRows);
  while (signoffRows.length && signoffRows[0].length === 1 && String(signoffRows[0][0] || "") === "") {
    signoffRows.shift();
  }

  saveDashboardQualitySectionRows_("Signoff", signoffRows.slice(1), { deferSheetWrite: true });
  PropertiesService.getDocumentProperties().setProperty(RFF_QA_SECTION_PROP_PREFIX + "Signoff" + "_LAST_RUN", String(new Date().getTime()));

  return signoffRows.slice(1);
}

function updateDashboardQualitySummarySection_() {
  const summaryRows = [["Metric", "Value", "Status", "Quality Notes"]];
  buildFrameworkSummaryRows_().forEach(function(row) {
    summaryRows.push(row);
  });

  saveDashboardQualitySectionRows_("Summary", summaryRows, { deferSheetWrite: true });
  PropertiesService.getDocumentProperties().setProperty(RFF_QA_SECTION_PROP_PREFIX + "Summary" + "_LAST_RUN", String(new Date().getTime()));

  return summaryRows;
}

function getDashboardQualitySectionBoundsMap_(sheet) {
  const bounds = {};
  if (!sheet) return bounds;

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const values = sheet.getRange(1, 1, lastRow, 1).getValues();
  const sectionRows = [];

  for (let i = 0; i < values.length; i++) {
    const title = String(values[i][0] || "").trim();
    if (/^SECTION [A-Z] - /.test(title)) {
      sectionRows.push({ title: title, row: i + 1 });
    }
  }

  sectionRows.forEach(function(section, index) {
    const replaceStartRow = Math.max(2, section.row - 1);
    const nextTitleRow = index + 1 < sectionRows.length ? sectionRows[index + 1].row : 0;
    const replaceEndRow = nextTitleRow ? Math.max(replaceStartRow, nextTitleRow - 2) : lastRow;
    bounds[section.title] = {
      titleRow: section.row,
      replaceStartRow: replaceStartRow,
      oldCount: Math.max(1, replaceEndRow - replaceStartRow + 1)
    };
  });

  return bounds;
}

function replaceDashboardQualitySectionsRows_(sheet, sectionWrites) {
  if (!sheet || !sectionWrites || !sectionWrites.length) return;
  sectionWrites.forEach(function(sectionWrite) {
    writeDashboardQualitySection(sectionWrite.title, sectionWrite.rows || []);
  });
  styleDashboardQualityUpdatedSections_(sheet, sectionWrites.map(function(sectionWrite) { return sectionWrite.title; }), { highlightProblemRows: true });
}

function tryDashboardQualityAnchoredColumnWrite_(sheet, startRow, rowCount, output, width) {
  if (!sheet || !output || !output.length || output.length !== rowCount || width < 2) return false;

  const currentLabels = sheet.getRange(startRow, 1, rowCount, 1).getValues();
  for (let r = 0; r < output.length; r++) {
    const expected = String(output[r][0] || "").trim();
    const actual = String(currentLabels[r][0] || "").trim();
    if (expected !== actual) return false;
  }

  const dynamicValues = output.map(function(row) {
    return row.slice(1, width);
  });
  sheet.getRange(startRow, 2, output.length, width - 1).setValues(dynamicValues);
  return true;
}

function replaceDashboardQualitySectionRows_(sheet, sectionTitle, rows, options) {
  if (!sheet || !rows || !rows.length) return;
  writeDashboardQualitySection(sectionTitle, rows);
  if (!options || !options.deferStyle) {
    styleDashboardQualityUpdatedSections_(sheet, [sectionTitle], { highlightProblemRows: true });
  }
}

function findDashboardQualitySectionRow_(sheet, sectionTitle) {
  if (!sheet) return 0;
  const target = String(sectionTitle || "").trim();
  if (!target) return 0;

  const lastRow = sheet.getLastRow();
  if (lastRow < 1) return 0;

  const values = sheet.getRange(1, 1, lastRow, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0] || "").trim().indexOf(target) === 0) return i + 1;
  }
  return 0;
}

function findNextDashboardQualitySectionRow_(sheet, startRow) {
  const lastRow = sheet.getLastRow();
  if (startRow > lastRow) return 0;
  const values = sheet.getRange(startRow, 1, lastRow - startRow + 1, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    const value = String(values[i][0] || "").trim();
    if (/^SECTION [A-Z] - /.test(value)) return startRow + i;
  }
  return 0;
}

function dashboardQualitySectionContentMatches_(range, output) {
  if (!range || !output || !output.length) return false;
  try {
    const existing = range.getValues();
    if (existing.length !== output.length) return false;
    for (let r = 0; r < output.length; r++) {
      for (let c = 0; c < output[r].length; c++) {
        if (r === 2 && c === 1) continue;
        const oldValue = existing[r] && existing[r][c] instanceof Date ? existing[r][c].getTime() : String(existing[r] && existing[r][c] !== undefined ? existing[r][c] : "");
        const newValue = output[r] && output[r][c] instanceof Date ? output[r][c].getTime() : String(output[r] && output[r][c] !== undefined ? output[r][c] : "");
        if (oldValue !== newValue) return false;
      }
    }
    return true;
  } catch (err) {
    logBestEffortWarning_("Dashboard Quality unchanged-section comparison skipped: " + err.message);
    return false;
  }
}

function mergeDashboardQualityStyleRanges_(ranges) {
  const sorted = (ranges || []).slice().sort(function(a, b) { return a.startRow - b.startRow; });
  const merged = [];
  sorted.forEach(function(item) {
    const start = Math.max(1, Number(item.startRow) || 1);
    const count = Math.max(1, Number(item.rowCount) || 1);
    const end = start + count - 1;
    const previous = merged.length ? merged[merged.length - 1] : null;
    if (previous && start <= previous.endRow + 2) {
      previous.endRow = Math.max(previous.endRow, end);
      previous.rowCount = previous.endRow - previous.startRow + 1;
    } else {
      merged.push({ startRow: start, endRow: end, rowCount: count });
    }
  });
  return merged;
}

function styleDashboardQualityUpdatedSections_(sheet, sectionTitles, options) {
  if (!sheet) return;
  const width = RFF_DASHBOARD_QUALITY_COL_WIDTHS.length;
  const lastRow = Math.max(sheet.getLastRow(), 1);

  const requested = sectionTitles && sectionTitles.length ? sectionTitles : RFF_DASHBOARD_QUALITY_SECTIONS.map(function(section) {
    return section.title;
  });
  const bounds = getDashboardQualitySectionBoundsMap_(sheet);

  let ranges = [];
  requested.forEach(function(title) {
    const bound = bounds[title];
    if (bound) {
      ranges.push({ startRow: bound.replaceStartRow, rowCount: bound.oldCount });
    }
  });
  if (!ranges.length) ranges.push({ startRow: 1, rowCount: lastRow });
  ranges = mergeDashboardQualityStyleRanges_(ranges);

  const startRow = Math.min.apply(null, ranges.map(function(item) { return item.startRow; }));
  const endRow = ranges.reduce(function(maxRow, item) {
    return Math.max(maxRow, item.startRow + item.rowCount - 1);
  }, 0);
  const rowCount = Math.max(1, Math.min(endRow, lastRow) - startRow + 1);

  try {
    const range = sheet.getRange(startRow, 1, rowCount, width);
    const values = range.getValues();
    const backgrounds = [];
    const fontWeights = [];
    const fontStyles = [];
    const fontSizes = [];

    const titleRows = new Set();
    Object.keys(bounds).forEach(function(key) {
      titleRows.add(bounds[key].titleRow);
    });

    for (let r = 0; r < rowCount; r++) {
      const absoluteRow = startRow + r;
      let background = "#FFFFFF";
      let weight = "normal";
      let style = "normal";
      let size = 10;

      if (absoluteRow === 1) {
        background = RFF_SYSTEM_SHEET_TITLE_COLOR;
        weight = "bold";
        size = 12;
      } else if (titleRows.has(absoluteRow)) {
        background = RFF_SYSTEM_SHEET_SECTION_COLOR;
        weight = "bold";
      } else if (titleRows.has(absoluteRow - 1)) {
        background = RFF_SYSTEM_SHEET_SUBHEADER_COLOR;
        style = "italic";
      } else if (titleRows.has(absoluteRow - 2)) {
        background = RFF_SYSTEM_SHEET_SUBHEADER_COLOR;
        weight = "bold";
      }

      if (options && options.highlightProblemRows && values[r].some(function(cell) {
        return /^(FAIL|ERROR|WARNING|MISSING|ACTION REQUIRED|CRITICAL)$/i.test(String(cell || "").trim());
      })) {
        background = "#efd0d0";
      }

      backgrounds.push(new Array(width).fill(background));
      fontWeights.push(new Array(width).fill(weight));
      fontStyles.push(new Array(width).fill(style));
      fontSizes.push(new Array(width).fill(size));
    }

    range
      .setFontFamily("Arial")
      .setVerticalAlignment("top")
      .setHorizontalAlignment("left")
      .setBackgrounds(backgrounds)
      .setFontWeights(fontWeights)
      .setFontStyles(fontStyles)
      .setFontSizes(fontSizes);

    sheet.getRange(startRow, 1, rowCount, 1).setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
    // OPTIMIZATION: Format columns 2 through 8 in one batch API call
    sheet.getRange(startRow, 2, rowCount, 7).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  } catch (err) {
    logBestEffortWarning_("Dashboard Quality section styling skipped: " + err.message);
  }
}

function appendCombinedDashboardSignOffRows_(rows) {
  const dashboardAudit = getLiveDashboardAuditStatus_();
  const templateValidation = getLiveTemplateValidationStatus_();
  const frameworkHealth = getLiveFrameworkHealthStatus_();
  const performance = getStoredSectionStatusAndNotes_(RFF_PERFORMANCE_SUMMARY_KEY, 5);
  const masterHealth = getStoredSectionStatusAndNotes_(RFF_MASTER_LIST_HEALTH_KEY, 2);
  const carePlanSync = getStoredSectionStatusAndNotes_(RFF_CP_SYNC_DIAGNOSTICS_KEY, 2);
  const workflowVerification = getStoredSectionStatusAndNotes_(RFF_WORKFLOW_SYNC_VERIFICATION_KEY, 2);

  rows.push([""]);
  rows.push(["SECTION R - SIGNOFF"]);
  rows.push(["Dashboard Integrity", dashboardAudit.status, dashboardAudit.notes]);
  rows.push(["Template Validation", templateValidation.status, templateValidation.notes]);
  rows.push(["Framework Health Check", frameworkHealth.status, frameworkHealth.notes]);
  rows.push(["Performance Summary", performance.status, performance.notes]);
  rows.push(["Master List Validation", masterHealth.status, masterHealth.notes]);
  rows.push(["Care Plan Sync Validation", carePlanSync.status, carePlanSync.notes]);
  rows.push(["Workflow & Synchronization Verification", workflowVerification.status, workflowVerification.notes]);
}

function buildFrameworkSummaryRows_() {
  const rows = [];
  const dashboardGlobal = getStoredSectionStatusAndNotes_(RFF_DASHBOARD_VERIFY_GLOBAL_KEY, 2);
  const dashboardSheets = getStoredSectionStatusAndNotes_(RFF_DASHBOARD_VERIFY_SHEETS_KEY, 2);
  const dashboardHeaders = getStoredSectionStatusAndNotes_(RFF_DASHBOARD_VERIFY_HEADERS_KEY, 2);
  const dashboardColumns = getStoredSectionStatusAndNotes_(RFF_DASHBOARD_VERIFY_COLUMNS_KEY, 2);
  const dashboardBehaviors = getStoredSectionStatusAndNotes_(RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY, 2);
  const templateValidation = getStoredSectionStatusAndNotes_(RFF_VALIDATION_SHEET, 2);
  const frameworkHealth = getStoredSectionStatusAndNotes_(RFF_HEALTH_CHECK_SHEET, 2);
  const performance = getStoredSectionStatusAndNotes_(RFF_PERFORMANCE_SUMMARY_KEY, 3);
  const masterHealth = getStoredSectionStatusAndNotes_(RFF_MASTER_LIST_HEALTH_KEY, 2);
  const workflowVerification = getStoredSectionStatusAndNotes_(RFF_WORKFLOW_SYNC_VERIFICATION_KEY, 2);

  rows.push(["Dashboard Global Inputs", dashboardGlobal.status, dashboardGlobal.notes, "Dashboard Quality Report Section A"]);
  rows.push(["Dashboard Sheet Definitions", dashboardSheets.status, dashboardSheets.notes, "Dashboard Quality Report Section B"]);
  rows.push(["Dashboard Sheet Behaviors", dashboardBehaviors.status, dashboardBehaviors.notes, "Dashboard Quality Report Section C"]);
  rows.push(["Dashboard Column Definitions", dashboardColumns.status, dashboardColumns.notes, "Dashboard Quality Report Section D"]);
  rows.push(["Dashboard Sheet Headers", dashboardHeaders.status, dashboardHeaders.notes, "Dashboard Quality Report Section E"]);
  rows.push(["Dashboard Tab Organization", getStoredSectionStatusAndNotes_(RFF_DASHBOARD_VERIFY_TAB_ORGANIZATION_KEY, 2).status, getStoredSectionStatusAndNotes_(RFF_DASHBOARD_VERIFY_TAB_ORGANIZATION_KEY, 2).notes, "Dashboard Quality Report Section F"]);
  rows.push(["Template Structure & Validation", templateValidation.status, templateValidation.notes, "Dashboard Quality Report Section G"]);
  rows.push(["Framework Health Check", frameworkHealth.status, frameworkHealth.notes, "Dashboard Quality Report Section I"]);
  rows.push(["Performance Summary", performance.status, performance.notes, "Dashboard Quality Report Section J"]);
  rows.push(["Master List Validation", masterHealth.status, masterHealth.notes, "Dashboard Quality Report Section K"]);
  rows.push(["Care Plan Sync Validation", getStoredSectionStatusAndNotes_(RFF_CP_SYNC_DIAGNOSTICS_KEY, 2).status, getStoredSectionStatusAndNotes_(RFF_CP_SYNC_DIAGNOSTICS_KEY, 2).notes, "Dashboard Quality Report Section L"]);
  rows.push(["Workflow & Synchronization Verification", workflowVerification.status, workflowVerification.notes, "Dashboard Quality Report Section M"]);

  const anyFail = rows.some(function(r) { return r[1] === "FAIL"; });
  const anyNotRun = rows.some(function(r) { return r[1] === "MISSING" || r[1] === "NOT RUN"; });
  rows.unshift(["OVERALL FRAMEWORK STATUS", anyFail ? "ACTION REQUIRED" : (anyNotRun ? "PARTIAL" : "READY"), anyFail ? "Resolve failing Dashboard Quality sections" : (anyNotRun ? "Some Dashboard Quality sections have not been run" : "All automated framework checks pass"), "Calculated"]);
  return rows;
}

function runFrameworkHealthCheck(timing) {
  const results = collectFrameworkHealthCheckRows_();
  writeFrameworkHealthCheckReport_(results);
  if (timing) markFrameworkStep_(timing, "Dashboard Quality Section I saved");


  const issues = getFrameworkHealthCheckIssueRows_(results);
  if (issues.length) {
    if (timing) markFrameworkStep_(timing, "Framework Health Check issues detected: " + issues.length, formatFrameworkHealthCheckIssuesForTiming_(issues));
  }


  const failed = issues.filter(function(row) {
    return String(row[2] || "").trim().toUpperCase() === "FAIL";
  });


  if (failed.length) {
    const err = new Error("Framework Health Check failed: " + failed.length + " failure(s)");
    err.timingDetails = formatFrameworkHealthCheckIssuesForTiming_(failed);
    throw err;
  }


  return results;
}

function getFrameworkHealthCheckIssueRows_(results) {
  return (results || []).filter(function(row) {
    return String(row && row[2] || "").trim().toUpperCase() !== "PASS";
  });
}

function formatFrameworkHealthCheckIssuesForTiming_(issues) {
  return (issues || []).map(function(row) {
    const area = row && row[0] !== undefined ? row[0] : "";
    const item = row && row[1] !== undefined ? row[1] : "";
    const status = row && row[2] !== undefined ? row[2] : "";
    const notes = row && row[3] !== undefined ? row[3] : "";
    return [area, item, status, notes].filter(function(value) {
      return String(value || "").trim() !== "";
    }).join(" - ");
  }).join(" | ");
}

function writeFrameworkHealthCheckReport_(results) {
  saveDashboardQualityRowsForHealthCheck_(results);
  deleteLegacyQualityReportSheet_(RFF_HEALTH_CHECK_SHEET);
}

function getRequiredDashboardFunctionNames_() {
  return [
    "setupReportFormattingDashboard",
    "loadDashboardConfig_",
    "writeDashboardTitle_",
    "writeDashboardSection_",
    "styleDashboard_"
  ];
}

function getRequiredTimingFunctionNames_() {
  return [
    "runFrameworkTimed_",
    "markFrameworkStep_",
    "writeFrameworkTimingReport_",
    "writeTimingReport_"
  ];
}

function runDashboardQualityWorkflowSyncVerification_(timing) {
  const rows = collectWorkflowSyncVerificationRows_();
  saveDashboardQualitySectionRows_(RFF_WORKFLOW_SYNC_VERIFICATION_KEY, rows);
  if (timing) markFrameworkStep_(timing, "Dashboard Quality Section L saved");
  return rows;
}

function setupSystemSheets() {
  rebuildFormatDashboardDefaults();
  buildSystemSheets();
  ensureFrameworkTimingReport_();
  runDashboardQualityStartUp();
  updateIndexSheet({ forceShellRebuild: true });
  notify_("System sheets setup, initialized, formatted, and Index built.");
}

function verifyFrameworkConfiguration() {
  return runFrameworkTimed_("Start Up / Verify Framework Configuration", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    buildSystemSheets();
    const quality = ensureDashboardQualityReportSheet_();
    markFrameworkStep_(timing, "System sheets initialized");

    ensureFrameworkTimingReport_();
    markFrameworkStep_(timing, "Framework Timing Report verified");

    const dashboard = ss.getSheetByName(RFF_DASHBOARD_SHEET);

    if (!dashboard) {
      const missingRows = [
        ["Verification Area", "Verification Item", "Expected Value", "Actual Value", "Status", "Severity", "Quality Notes"],
        ["Format Dashboard", "Sheet Exists", RFF_DASHBOARD_SHEET, "Missing", "FAIL", "Critical", "Create or rebuild Format Dashboard before template creation."]
      ];
      saveDashboardQualitySectionRows_(RFF_DASHBOARD_VERIFY_GLOBAL_KEY, missingRows);
      styleDashboardQualityReport_(quality);
      writeCombinedFrameworkTimingReport_();
      markFrameworkStep_(timing, "Format Dashboard missing");
      return missingRows;
    }

    saveDashboardQualitySectionRows_(RFF_DASHBOARD_VERIFY_GLOBAL_KEY, collectFormatDashboardGlobalInputVerificationRows_(dashboard));
    markFrameworkStep_(timing, "Section A Global Inputs verification written");

    saveDashboardQualitySectionRows_(RFF_DASHBOARD_VERIFY_SHEETS_KEY, collectFormatDashboardSheetDefinitionVerificationRows_(dashboard));
    markFrameworkStep_(timing, "Section B Sheet Definitions verification written");

    saveDashboardQualitySectionRows_(RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY, collectFormatDashboardSheetBehaviorVerificationRows_(dashboard));
    markFrameworkStep_(timing, "Section C Sheet Behaviors verification written");

    saveDashboardQualitySectionRows_(RFF_DASHBOARD_VERIFY_COLUMNS_KEY, collectFormatDashboardColumnDefinitionVerificationRows_(dashboard));
    markFrameworkStep_(timing, "Section D Column Definitions verification written");

    saveDashboardQualitySectionRows_(RFF_DASHBOARD_VERIFY_HEADERS_KEY, collectFormatDashboardSheetHeaderVerificationRows_(dashboard));
    markFrameworkStep_(timing, "Section E Sheet Headers verification written");

    saveDashboardQualitySectionRows_(RFF_DASHBOARD_VERIFY_TAB_ORGANIZATION_KEY, collectFormatDashboardTabOrganizationVerificationRows_(dashboard));
    markFrameworkStep_(timing, "Section F Tab Organization verification written");

    styleDashboardQualityReport_(quality);
    writeCombinedFrameworkTimingReport_();
    markFrameworkStep_(timing, "Framework verification complete");
  });
}

function runFrameworkTimed_(processName, callback) {
  if (!isFrameworkTimingEnabled_()) {
    return runWithWorkflowBusyFlag_(processName, function() { return callback(null); });
  }
  const timing = startFrameworkTiming_(processName);

  return runWithWorkflowBusyFlag_(processName, function() {
    try {
      markFrameworkStep_(timing, "Start");
      const result = callback(timing);
      markFrameworkStep_(timing, "Complete");
      writeFrameworkTimingReportBestEffort_(timing);
      return result;
    } catch (err) {
      const detailText = err && err.timingDetails ? err.timingDetails : (err && err.stack ? err.stack : "");
      markFrameworkStep_(timing, "ERROR - " + err.message, detailText);
      writeFrameworkTimingReportBestEffort_(timing);
      throw err;
    }
  });
}

function startFrameworkTiming_(processName) {
  const now = new Date().getTime();
  return {
    processName: processName,
    startTime: new Date(),
    startMs: now,
    lastMs: now,
    steps: []
  };
}

function markFrameworkStep_(timing, stepName, details) {
  if (!timing) return;

  const normalizedStepName = stepName || "Step";
  if (Object.prototype.hasOwnProperty.call(timing, "warnings") || Object.prototype.hasOwnProperty.call(timing, "monthParts")) {
    markRuntimeStep_(timing, normalizedStepName, details || "");
    return;
  }

  const now = new Date().getTime();
  const stepSeconds = (now - timing.lastMs) / 1000;
  const totalSeconds = (now - timing.startMs) / 1000;
  const severity = /^ERROR\b/i.test(String(normalizedStepName)) ? "CRITICAL" : getRuntimeTimingSeverity_(stepSeconds);
  timing.steps.push({
    processName: timing.processName,
    stepName: normalizedStepName,
    stepSeconds: stepSeconds,
    totalSeconds: totalSeconds,
    timestamp: new Date(),
    severity: severity,
    details: details || ""
  });
  timing.lastMs = now;
}

function writeFrameworkTimingReport_(timing) {
  writeFrameworkTimingReportBestEffort_(timing);
}

function writeFrameworkTimingReportBestEffort_(timing) {
  if (!timing) return false;
  try {
    appendRuntimeTimingToFrameworkTimingReport_(timing);
    writeCombinedFrameworkTimingReport_();
    return true;
  } catch (err) {
    logBestEffortWarning_("Framework timing telemetry skipped for " + String(timing.processName || "process") + ": " + err.message);
    return false;
  }
}

function writeTimingReport_(timing) {
  writeFrameworkTimingReport_(timing);
}
// --- QUALITY DASHBOARD TESTING & TIMING SUPPORT -----------------------------

function countSheetRowsBelowHeader_(sheet) {
  if (!sheet) return 0;
  return Math.max(sheet.getLastRow() - HEADER_ROW, 0);
}

function getLatestSheetByPrefix_(prefix) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const matches = ss.getSheets().filter(function(sheet) {
    return sheet.getName().indexOf(prefix) === 0;
  });
  if (!matches.length) return null;
  return matches.sort(function(a, b) {
    return getGlobalSheetSortRankByName_(a.getName()) - getGlobalSheetSortRankByName_(b.getName()) || b.getName().localeCompare(a.getName());
  })[0];
}

function countBlankRatioForHeaders_(sheet, headersToCheck) {
  const emptyResult = { checked: 0, blanks: 0, ratio: 0, matchedHeaders: [], dataRows: 0 };
  if (!sheet) return emptyResult;
  const headers = getHeaders_(sheet, HEADER_ROW);
  const headerMap = buildHeaderIndexMap_(headers);
  const matchedHeaders = [];
  const indexes = (headersToCheck || []).map(function(header) {
    const idx = headerMap[header];
    if (idx !== undefined) matchedHeaders.push(header);
    return idx;
  }).filter(function(idx) { return idx !== undefined; });
  const dataRows = Math.max(sheet.getLastRow() - DATA_START_ROW + 1, 0);
  if (!indexes.length || dataRows <= 0) return { checked: 0, blanks: 0, ratio: 0, matchedHeaders: matchedHeaders, dataRows: dataRows };
  const values = sheet.getRange(DATA_START_ROW, 1, dataRows, headers.length).getValues();
  let checked = 0;
  let blanks = 0;
  values.forEach(function(row) {
    indexes.forEach(function(idx) {
      checked++;
      if (normalizeCompareValue_(row[idx]) === "") blanks++;
    });
  });
  return { checked: checked, blanks: blanks, ratio: checked ? blanks / checked : 0, matchedHeaders: matchedHeaders, dataRows: dataRows };
}

function runOperationalDataPipelineValidations_(timing, qualitySheet) {
  runDashboardQualitySectionIfDue_(RFF_PERFORMANCE_SUMMARY_KEY, "Section J Performance Summary", runDashboardQualityPerformanceSummary_, timing);
  runDashboardQualitySectionIfDue_(RFF_MASTER_LIST_HEALTH_KEY, "Section K Raw Data Validation", runDashboardQualityRawDataValidation_, timing);
  runDashboardQualitySectionIfDue_(RFF_CP_SYNC_DIAGNOSTICS_KEY, "Section L Care Plan Sync Validation", runDashboardQualityCarePlanSyncDiagnostics_, timing);
  runDashboardQualitySectionIfDue_(RFF_WORKFLOW_SYNC_VERIFICATION_KEY, "Section M Workflow & Synchronization Verification", runDashboardQualityWorkflowSyncVerification_, timing);
  runDashboardQualitySectionIfDue_(RFF_DEMO_P_PROCESSING_VALIDATION_KEY, "Section N Demo P Quality Validation", runDashboardQualityDemoPValidation_, timing);
  runDashboardQualitySectionIfDue_(RFF_DISENROLLED_EXCLUSION_VALIDATION_KEY, "Section O Disenrolled Exclusion Validation", runDashboardQualityDisenrolledExclusionValidation_, timing);
  runDashboardQualitySectionIfDue_(RFF_MONTHLY_CHANGE_VALIDATION_KEY, "Section P Monthly Change Validation", runDashboardQualityMonthlyChangeValidation_, timing);
  if (qualitySheet && timing) markFrameworkStep_(timing, "Dashboard Quality operational data validations staged");
}

function repairAllTemplateDateFormats() {
  return runFrameworkTimed_("Repair / Re-Enforce Date Formats", function(timing) {
    const dashboard = loadDashboardConfig_();
    markFrameworkStep_(timing, "Dashboard loaded");

    dashboard.sheetDefinitions.forEach(function(sheetDef) {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetDef.templateName);
      if (!sheet) {
        markFrameworkStep_(timing, "Skipped missing template: " + sheetDef.templateName);
        return;
      }
      const rowCount = Math.max(sheet.getMaxRows(), RFF_TEMPLATE_BASELINE_ROWS);
      applyGovernedTextAndNumberFormats_(sheet, dashboard, getHeadersForSheetType_(dashboard, sheetDef.sheetType), DATA_START_ROW, Math.max(rowCount - DATA_START_ROW + 1, 1));
      markFrameworkStep_(timing, "Date formats re-enforced: " + sheetDef.templateName);
    });

  });
}

function normalizeSectionRowForWidth_(row, width) {
  const out = (row || []).slice(0, width);
  while (out.length < width) out.push("");
  return out;
}

function rowHasAnyValue_(row) {
  return (row || []).some(function(value) {
    return String(value === null || value === undefined ? "" : value).trim() !== "";
  });
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
  if (current > desiredRows) {
    sheet.deleteRows(desiredRows + 1, current - desiredRows);
  } else if (current < desiredRows) {
    sheet.insertRowsAfter(current, desiredRows - current);
  }
}

function getStoredSectionStatusAndNotes_(sectionKey, statusCol) {
  const rows = getDashboardQualitySectionRows_(sectionKey);
  if (!rows || !rows.length) return { status: "NOT RUN", notes: "Section has not been run" };
  const failures = [];
  const warnings = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i] || [];
    const statuses = row.map(function(value) { return String(value || "").trim().toUpperCase(); });
    if (statuses.indexOf("FAIL") !== -1 || statuses.indexOf("CRITICAL") !== -1) failures.push(row);
    if (statuses.indexOf("WARNING") !== -1) warnings.push(row);
  }
  const issueRows = failures.length ? failures : warnings;
  return {
    status: failures.length ? "FAIL" : (warnings.length ? "WARNING" : "PASS"),
    notes: issueRows.length ? issueRows.slice(0, 5).map(function(row) {
      return row.filter(function(v) { return String(v || "").trim() !== ""; }).join(" | ");
    }).join("; ") : "OK"
  };
}

function appendRequiredFunctionChecks_(results, area, names) {
  names.forEach(function(name) {
    const exists = existsFunctionByName_(name);
    results.push([area, name, exists ? "PASS" : "FAIL", exists ? "OK" : "Missing function"]);
  });
}

function existsFunctionByName_(name) {
  try {
    return eval("typeof " + name) === "function";
  } catch (err) {
    return false;
  }
}

function getRequiredHelperFunctionNames_() {
  return [
    "toBool_",
    "truthy_",
    "toNumber_",
    "normalizeHeader_",
    "normalizeText_",
    "normalizeKey_",
    "toWrapStrategy_",
    "compareValues_",
    "normalizeHex_",
    "safeSheetName_"
  ];
}

function getRequiredMenuFunctionNames_() {
  return [
    "setupReportFormattingDashboard",
    "buildAllTemplatesAndValidate",
    "runDashboardQualityQuick",
    "runDashboardQualityStartUp",
    "runDashboardQualityValidateTemplates",
    "runDashboardQualityWorkflow",
    "runFrameworkSmokeValidation",
    "runFullQualityCheck",
    "runFormatDashboardUpdates",
    "createIndexSheet",
    "restoreSheetFromActiveIndexRow",
    "configureIndexRestoreWebAppUrl",
    "formatMonthlySheets",
    "runMonthlyStart",
    "buildDemoPFromScratch",
    "updateDemoPMonthlySync",
    "createDisenrolledList",
    "createMasterList",
    "buildMonthlyChangeReport",
    "hideReportTemplates",
    "showReportTemplates",
    "hideSystemSheetsNow",
    "showSystemSheetsNow",
    "formatBannerReport",
    "formatCarePlanDueReport",
    "formatUnlockedCarePlanReport",
    "formatRawData",
    "validateActiveBannerFormatterOutput",
    "archiveActiveRawDataSheet",
    "archiveMonthlyImportSheets",
    "archiveMonthlyActiveSheets",
    "enforceGlobalSheetSortOrder",
    "hideTemplates",
    "showTemplates",
    "hideSystemSheets_",
    "showSystemSheets_",
    "clearDiagnosticsAndTimingLogs",
    "toggleFrameworkTiming",
    "formatDashboard",
    "rebuildFormatDashboardDefaults",
    "saveActiveLayoutToDashboardSettings",
    "setupSystemSheets"
  ];
}

function getRequiredTemplateFunctionNames_() {
  return [
    "createOrRefreshTemplateFromDashboard_",
    "buildAllTemplatesAndValidate",
    "hideReportTemplates",
    "showReportTemplates"
  ];
}

function getRequiredValidationFunctionNames_() {
  return [
    "validateTemplateFromDashboard_",
    "validateReportTemplates",
    "writeTemplateValidationReport_"
  ];
}

function runWorkflowSyncVerification() {
  return runDashboardQualityWorkflowSyncVerification_();
}
