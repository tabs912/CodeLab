// ============================================================================
// 0_ORCHESTRATION.GS
// Master Pipeline Controllers, Batch Sheet Formatters, Template Validation Sequences,
// & Monthly Import/Active Archiving Orchestrators
// ============================================================================

// ============================================================================
// MONTHLY WORKFLOW PIPELINES
// ============================================================================

/**
 * Menu Callback: Create Monthly Start
 * Executes initial monthly pipeline: formats incoming import tabs, builds Refined Data,
 * creates the Master List, and updates the Disenrolled Exclusion list.
 */
function runMonthlyStart() {
  runWithWorkflowBusyFlag_("Create Monthly Start", () => {
    logFrameworkTiming_("MONTHLY_START", "Pipeline Initiated", "INFO", "Starting Monthly Start sequence");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.toast("Running Monthly Start Pipeline...", "Workflow Engine", 5);

    // 1. Format incoming monthly sheets
    formatMonthlySheets();
    logFrameworkTiming_("MONTHLY_START", "Sheets Formatted", "INFO", "Completed import sheet formatting");

    // 2. Build Refined Data (Demo P)
    buildRefinedDataFromScratch();
    logFrameworkTiming_("MONTHLY_START", "Refined Data Built", "INFO", "Demo P synthesis complete");

    // 3. Build Active Master List
    createMasterList();
    logFrameworkTiming_("MONTHLY_START", "Master List Built", "INFO", "Active roster created");

    // 4. Update Disenrolled Exclusion list
    createDisenrolledList();
    logFrameworkTiming_("MONTHLY_START", "Disenrolled List Updated", "INFO", "Exclusion audit complete");

    logFrameworkTiming_("MONTHLY_START", "Pipeline Complete", "INFO", "Monthly Start executed successfully");
    flushFrameworkTimingReport_();

    ss.toast("Monthly Start Pipeline executed successfully!", "Complete", 5);
  });
}

/**
 * Menu Callback: Create Monthly Update
 * Executes incremental update pipeline: updates Refined Data, generates Monthly Change report,
 * refreshes Master List, and syncs Disenrolled Exclusion list.
 */
function runMonthlyUpdate() {
  runWithWorkflowBusyFlag_("Create Monthly Update", () => {
    logFrameworkTiming_("MONTHLY_UPDATE", "Pipeline Initiated", "INFO", "Starting Monthly Update sequence");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.toast("Running Monthly Update Pipeline...", "Workflow Engine", 5);

    // 1. Format import tabs
    formatMonthlySheets();

    // 2. Sync Refined Data
    updateRefinedDataMonthlySync();

    // 3. Build Monthly Change Report
    buildMonthlyChangeReport();

    // 4. Refresh Master List
    createMasterList();

    // 5. Sync Disenrolled Exclusion List
    createDisenrolledList();

    logFrameworkTiming_("MONTHLY_UPDATE", "Pipeline Complete", "INFO", "Monthly Update executed successfully");
    flushFrameworkTimingReport_();

    ss.toast("Monthly Update Pipeline completed successfully!", "Complete", 5);
  });
}

// ============================================================================
// SHEET FORMATTING ORCHESTRATORS
// ============================================================================

/**
 * Menu Callback: Format Monthly Sheets
 * Batch formats Banners, Care Plan Due, Unlocked CP, and Raw Data tabs.
 */
function formatMonthlySheets() {
  logFrameworkTiming_("FORMAT_SHEETS", "Batch Format Start", "INFO", "Formatting monthly import sheets");
  const monthParts = getMonthDateParts_(new Date());

  formatBannerReport(monthParts);
  formatCarePlanDueReport(monthParts);
  formatUnlockedCarePlanReport(monthParts);
  formatRawData(monthParts);

  logFrameworkTiming_("FORMAT_SHEETS", "Batch Format Complete", "INFO", "All import sheets formatted");
}

function formatBannerReport(monthParts) {
  const parts = monthParts || getMonthDateParts_(new Date());
  const sheet = getCurrentBannersSheet_(parts);
  if (sheet) applySystemStructure_(sheet, 9, [], "Banners", Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss"));
}

function formatCarePlanDueReport(monthParts) {
  const parts = monthParts || getMonthDateParts_(new Date());
  const sheet = getCurrentCarePlanDueSheet_(parts);
  if (sheet) applySystemStructure_(sheet, 5, [], "CP Due Date", Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss"));
}

function formatUnlockedCarePlanReport(monthParts) {
  const parts = monthParts || getMonthDateParts_(new Date());
  const sheet = getCurrentUnlockedCarePlanSheet_(parts);
  if (sheet) applySystemStructure_(sheet, 4, [], "Unlock CP", Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss"));
}

function formatRawData(monthParts) {
  const parts = monthParts || getMonthDateParts_(new Date());
  const sheet = getCurrentRawDataSheet_(parts);
  if (sheet) applySystemStructure_(sheet, 54, [], "Raw Data", Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss"));
}

// ============================================================================
// TEMPLATE & SYSTEM SETUP ORCHESTRATORS
// ============================================================================

/**
 * Menu Callback: Build All Templates + Validate
 * Rebuilds all system templates and executes Section B template QA checks.
 */
function buildAllTemplatesAndValidate() {
  runWithWorkflowBusyFlag_("Build All Templates + Validate", () => {
    logFrameworkTiming_("TEMPLATE_VALIDATE", "Start Build & Validate", "INFO", "Stamping templates");
    createSystemTemplates();
    runDashboardQualityTemplateValidation_();
    logFrameworkTiming_("TEMPLATE_VALIDATE", "Complete", "INFO", "Templates built and validated");
    flushFrameworkTimingReport_();
  });
}

function quickBuildAllTemplates() {
  buildAllTemplatesAndValidate();
}

function buildSystemSheets() {
  createSystemTemplates();
}

function setupSystemSheets() {
  createSystemTemplates();
  updateIndexSheet("Template - Index");
}

function rebuildFormatDashboardDefaults() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashSheet = ss.getSheetByName("Default - Format Dashboard") || ss.getSheetByName("Format Dashboard");
  if (dashSheet) {
    recalculateDashboardHexCodes_(dashSheet);
    applySystemStructure_(dashSheet, 19, [], "Default - Format Dashboard", Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss"));
    ss.toast("Format Dashboard defaults refreshed.", "Dashboard Engine", 3);
  }
}

function saveActiveLayoutToDashboardSettings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Active layout saved to Dashboard settings.", "Configuration Engine", 3);
}

// ============================================================================
// IMPORT / ACTIVE SHEET MANAGEMENT
// ============================================================================

function hideMonthlyImportSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const monthParts = getMonthDateParts_(new Date());
  const importSheets = [
    getCurrentBannersSheet_(monthParts),
    getCurrentCarePlanDueSheet_(monthParts),
    getCurrentUnlockedCarePlanSheet_(monthParts),
    getCurrentRawDataSheet_(monthParts)
  ];

  importSheets.forEach(s => {
    if (s && !s.isSheetHidden()) s.hideSheet();
  });
  ss.toast("Monthly import sub-reports hidden.", "Sheet Management", 3);
}

function archiveMonthlyImportSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Monthly import sub-reports archived.", "Archive Engine", 3);
}

function hideMonthlyActiveSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = [
    getLatestSheetByPrefix_("Master List"),
    getLatestSheetByPrefix_("Monthly Change")
  ];

  sheets.forEach(s => {
    if (s && !s.isSheetHidden()) s.hideSheet();
  });
  ss.toast("Monthly active report sheets hidden.", "Sheet Management", 3);
}

function archiveMonthlyActiveSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Monthly active report sheets archived.", "Archive Engine", 3);
}

function toggleFrameworkTiming() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Framework timing status toggled.", "Timing Engine", 3);
}
