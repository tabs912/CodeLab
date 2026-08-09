// ============================================================================
// 1_CONFIG.GS
// Open Menu Builder, Global Constants, Versioning, Locks & Index Generator
// ============================================================================

// --- ON OPEN MENU BUILDER ---------------------------------------------------

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
        .addItem("🪄 Clear Diagnostics & Timing", "clearDiagnosticsAndTimingLogs")
        .addItem("⏱️ Framework Timing on/off", "toggleFrameworkTiming")
        .addItem("🧭 Organize Tabs", "enforceGlobalSheetSortOrder")))
    .addSubMenu(ui.createMenu("🧩 Start - up")
      .addItem("Build System Sheets", "buildSystemSheets")
      .addItem("📜 Set up System Sheets", "setupSystemSheets")
      .addItem("🎨 Format Dashboard", "rebuildFormatDashboardDefaults")
      .addItem("💾 Save Active Layout as Dashboard Settings", "saveActiveLayoutToDashboardSettings")
      .addItem("🖼️ Build All Templates + Validate", "buildAllTemplatesAndValidate"))
    .addSubMenu(ui.createMenu("📇 Index")
      .addItem("📇 Build / Update Index", "updateIndexSheet")
      .addItem("↩️ Restore Selected Archive Row", "restoreSheetFromActiveIndexRow")
      .addItem("🌐 Configure Index Restore Web App URL", "configureIndexRestoreWebAppUrl")
      .addItem("🔗 Configure Archive Spreadsheet ID", "configureArchiveSpreadsheetId"))
    .addToUi();
}

// --- VERSIONING & GLOBAL CONSTANTS -----------------------------------------

const MASTER_LIST_MERGE_ML_VERSION = "1.8.9.8.4.0";
const RFF_VERSION = MASTER_LIST_MERGE_ML_VERSION;
const MASTER_LIST_MERGE_REBUILD_SECTION = "FULL_SCRIPT";

const HEADER_ROW = 4;
const DATA_START_ROW = 5;
const RFF_TEMPLATE_BASELINE_ROWS = 100;

const RFF_FAST_TEMPLATE_REFRESH = true;
const RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA = true;
const RFF_DELETE_LOCAL_RAW_AFTER_ARCHIVE = true;
const RFF_OUTPUT_EXTEND_TEMPLATE_FORMATTING = true;

let RFF_DEFER_TEMPLATE_HIDE_DURING_BATCH_ = false;
let ML_RUNTIME_CACHE_STORE_ = null;

// --- SHEET PREFIXES & IDENTIFIERS ------------------------------------------

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
const DEMO_P_ARCHIVE_SHEET = "Archive - Refined Data";

const RFF_DASHBOARD_SHEET = "Default - Format Dashboard";
const RFF_VALIDATION_SHEET = "Template - Dashboard Quality Report";
const RFF_TIMING_SHEET = "Template - Framework Timing Report";
const RFF_INDEX_TEMPLATE_SHEET = "Template - Index";

const SYSTEM_SHEETS_TO_HIDE = Object.freeze([
  "Template - Framework Timing Report",
  "Template - Dashboard Quality Report",
  "Template - Index",
  "Framework Timing Report",
  "Dashboard Quality Report",
  "Index"
]);

const RFF_ARCHIVE_SPREADSHEET_ID = "1PEEoXzPG-xRFuqDW_ZjPzyqdTUd_5AOwx0nbbzmMwBc";

// --- QUICK START-UP PIPELINE -----------------------------------------------

/**
 * Quick System Setup Entry Point
 * Step 1: Stamp Base Template & System Surface Templates
 * Step 2: Refresh Navigation Matrix
 */
function quickSystemSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  logFrameworkTiming_("QUICK_SETUP", "Pipeline Start", "INFO", "Initializing Quick System Setup");

  ss.toast("Quick System Setup [Step 1/2]: Stamping System Surface Templates...", "Setup", 5);
  createSystemTemplates();
  logFrameworkTiming_("QUICK_SETUP", "Templates Stamped", "INFO", "System templates generated");

  ss.toast("Quick System Setup [Step 2/2]: Refreshing Navigation Matrix...", "Setup", 5);
  updateIndexSheet("Template - Index");
  logFrameworkTiming_("QUICK_SETUP", "Index Updated", "INFO", "Navigation index generated");

  flushFrameworkTimingReport_();
  ss.toast("🚀 Quick System Setup Complete!", "Complete", 5);
}

// --- INDEX GENERATOR WITH TITLE ROWS & TEMPLATE SUPPORT -------------------

/**
 * Builds or refreshes the Index navigation surface (defaults to "Template - Index").
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

  applySystemStructure_(sheet, 4, rawRows, sheetName, timestampStr);
  
  sheet.setFrozenRows(4);
  sheet.setFrozenColumns(1);
}

// --- WORKFLOW BUSY LOCKS ----------------------------------------------------

const ML_WORKFLOW_BUSY_KEY = "ML_WORKFLOW_BUSY";
const ML_WORKFLOW_BUSY_STARTED_KEY = "ML_WORKFLOW_BUSY_STARTED";

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

// --- RUNTIME CACHE MANAGEMENT -----------------------------------------------

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

function getArchiveSpreadsheetId_() {
  return getDocumentPropertiesCached_().getProperty("RFF_ARCHIVE_SPREADSHEET_ID") || RFF_ARCHIVE_SPREADSHEET_ID;
}

function openArchiveSpreadsheetOnce_() {
  if (!RFF_ENABLE_AUTO_ARCHIVE_RAW_DATA) return null;
  return SpreadsheetApp.openById(getArchiveSpreadsheetId_());
}

// --- ENUM DATA SETS ---------------------------------------------------------

const GLOBAL_DATE_FORMAT_HEADERS = Object.freeze([
  "AD1 - Phone Valid Dates From", "AD1 - Phone Valid Dates To", "AD2 - Phone Valid Dates From",
  "AD2 - Phone Valid Dates To", "AD3 - Phone Valid Dates From", "AD3 - Phone Valid Dates To",
  "Capitation Date", "Care Plan Start Date", "Date of Birth", "Date of Death", "Disenrollment Date",
  "Disenrollment Effective Date", "Enrollment Date", "IDT Meeting Date", "Last Care Plan", "Next Care Plan Due"
]);

const SHEET_TYPE = Object.freeze({
  BANNER: "Banners",
  CARE_PLAN_DUE: "CP Due Date",
  UNLOCKED: "Unlock CP",
  RAW_DATA: "Raw Data",
  REFINED_DATA: "Refined Data",
  DEMO_P: "Refined Data",
  DISENROLLED_EXCLUSION: "Disenrolled Exclusion",
  MASTER_LIST: "Master List",
  MONTHLY_CHANGE: "Monthly Change"
});

const RFF_MONTHLY_CHANGE_SUBSECTIONS = [
  "Enrollment", "Disenrolled", "Demographic Changes", "Caseload Changes",
  "Contact Changes", "Banner Summary Changes", "Other Changes"
];

const RAW_DEMO_P_DEMOGRAPHIC_FIELDS = ["Last Name", "First Name", "Preferred Name", "Date of Birth", "Participant PMR#", "Phone Number", "Address Line 1", "Address Line 2", "City", "State", "Zip", "Oxygen", "Primary Language", "Residence Type", "Additional Important Information"];
const RAW_DEMO_P_CONTACT_FIELDS = ["Contact - Last Name", "Contact - First Name", "Type of Contact", "Contact - Primary Language", "Relationship", "AD1 - Phone", "AD1 - Phone Valid Dates From", "AD1 - Phone Valid Dates To", "AD2 - Phone", "AD2 - Phone Valid Dates From", "AD2 - Phone Valid Dates To", "AD3 - Phone", "AD3 - Phone Valid Dates From", "AD3 - Phone Valid Dates To", "Company", "Contact - Notes"];
const RAW_DEMO_P_CASELOAD_FIELDS = ["Caseload - Social Work", "Caseload - RN", "Caseload - PCP", "Caseload - HCC", "Caseload - Activities", "Caseload - OT", "Caseload - PT", "Caseload - RD", "Caseload - Supervising MD"];
const RAW_DEMO_P_BANNER_FIELDS = ["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"];
const RAW_DEMO_P_ENROLLMENT_FIELDS = ["Capitation Date", "Enrollment Status"];
const RAW_DEMO_P_DISENROLLMENT_FIELDS = ["Disenrollment Date", "Disenrollment Effective Date", "Disenrollment Reason", "Date of Death"];

const BANNER_SYNC_FIELDS = ["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"];
const UNLOCKED_SYNC_FIELDS = ["IDT Meeting Date", "Care Plan Start Date"];
const CARE_PLAN_DUE_SYNC_FIELDS = ["Enrollment Date", "Last Care Plan", "Next Care Plan Due", "CP Type"];
