// ============================================================================
// 2_DASHBOARD_LOADERS.GS
// Format Dashboard Config Loader, Section Indexer, & Default Matrix Libraries
// ============================================================================

/**
 * Loads and caches global settings, definitions, and column rules from Default - Format Dashboard.
 */
function loadDashboardConfig_() {
  const cache = getRuntimeCache_();
  if (cache.dashboardConfig) return cache.dashboardConfig;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Default - Format Dashboard") || ss.getSheetByName("Format Dashboard");
  if (!sheet) throw new Error("Default - Format Dashboard sheet not found.");

  const values = sheet.getDataRange().getValues();
  const config = {
    globals: {},
    titleRows: [],
    subheaderRows: [],
    sheetDefinitions: [],
    behaviors: {},
    systemSurfaces: [],
    tabOrganization: [],
    columnDefinitions: {},
    sheetHeaders: {}
  };

  const dashIndex = buildDashboardSectionIndex_(sheet);

  // Section A - Global Settings
  const secA = dashIndex["SECTION A - GLOBAL SETTINGS"];
  if (secA) {
    for (let r = secA.startRow; r <= secA.endRow; r++) {
      const key = String(values[r][0] || "").trim();
      const val = values[r][1];
      if (key) {
        if (key === "Header Row") config.globals.headerRow = Number(val) || 4;
        else if (key === "Data Start Row") config.globals.dataStartRow = Number(val) || 5;
        else if (key === "Freeze Rows") config.globals.freezeRows = Number(val) || 4;
        else if (key === "Freeze Columns") config.globals.freezeColumns = Number(val) || 2;
        else if (key === "Default Column Width") config.globals.defaultWidth = Number(val) || 105;
        else if (key === "Default Date Format") config.globals.defaultDateFormat = String(val || "mm/dd/yyyy").trim();
        else if (key === "Standard Font") config.globals.standardFont = String(val || "Arial").trim();
        else if (key === "Standard Font Size") config.globals.standardFontSize = Number(val) || 10;
        else config.globals[key] = val;
      }
    }
  }

  // Section C - Sheet Definitions
  const secC = dashIndex["SECTION C - SHEET DEFINITIONS"];
  if (secC) {
    for (let r = secC.startRow; r <= secC.endRow; r++) {
      const type = String(values[r][0] || "").trim();
      if (type) {
        config.sheetDefinitions.push({
          type: type,
          title: String(values[r][1] || "").trim(),
          templateName: String(values[r][2] || "").trim(),
          namingPattern: String(values[r][3] || "").trim(),
          baseColor: String(values[r][4] || "#66AACC").trim(),
          usePromptDate: values[r][10] === true || String(values[r][10]).toUpperCase() === "TRUE",
          endDateSource: String(values[r][11] || "").trim(),
          templateRows: Number(values[r][12]) || 100,
          templateCols: Number(values[r][13]) || 50,
          minRows: Number(values[r][15]) || 100,
          bufferRows: Number(values[r][16]) || 25
        });
      }
    }
  }

  // Section D - Sheet Behaviors
  const secD = dashIndex["SECTION D - SHEET BEHAVIORS"];
  if (secD) {
    for (let r = secD.startRow; r <= secD.endRow; r++) {
      const type = String(values[r][0] || "").trim();
      if (type) {
        config.behaviors[type] = {
          usesTitleRows: values[r][1] === true || String(values[r][1]).toUpperCase() === "TRUE",
          usesFilter: values[r][2] === true || String(values[r][2]).toUpperCase() === "TRUE",
          usesAlternatingColors: values[r][3] === true || String(values[r][3]).toUpperCase() === "TRUE",
          usesSubheaders: values[r][4] === true || String(values[r][4]).toUpperCase() === "TRUE",
          hiddenTemplate: values[r][5] === true || String(values[r][5]).toUpperCase() === "TRUE",
          outputVisibility: String(values[r][6] || "VISIBLE").trim().toUpperCase()
        };
      }
    }
  }

  // Section G - Column Definitions
  const secG = dashIndex["SECTION G - COLUMN DEFINITIONS"];
  if (secG) {
    for (let r = secG.startRow; r <= secG.endRow; r++) {
      const header = String(values[r][0] || "").trim();
      if (header) {
        config.columnDefinitions[header] = {
          width: Number(values[r][1]) || config.globals.defaultWidth || 105,
          fontSize: Number(values[r][2]) || config.globals.standardFontSize || 10,
          dateColumn: values[r][3] === true || String(values[r][3]).toUpperCase() === "TRUE",
          hideColumn: values[r][4] === true || String(values[r][4]).toUpperCase() === "TRUE",
          wrap: String(values[r][5] || "CLIP").trim().toUpperCase(),
          align: String(values[r][6] || "left").trim().toLowerCase(),
          vAlign: String(values[r][7] || "middle").trim().toLowerCase(),
          format: String(values[r][8] || "").trim()
        };
      }
    }
  }

  // Section H - Sheet Headers
  const secH = dashIndex["SECTION H - SHEET HEADERS"];
  if (secH) {
    for (let r = secH.startRow; r <= secH.endRow; r++) {
      const sheetType = String(values[r][0] || "").trim();
      const header = String(values[r][2] || "").trim();
      if (sheetType && header) {
        if (!config.sheetHeaders[sheetType]) config.sheetHeaders[sheetType] = [];
        config.sheetHeaders[sheetType].push(header);
      }
    }
  }

  cache.dashboardConfig = config;
  return config;
}

/**
 * Builds row index boundaries for sections on Default - Format Dashboard.
 */
function buildDashboardSectionIndex_(dashboardSheet) {
  const values = dashboardSheet.getDataRange().getValues();
  const index = {};
  let currentSection = null;

  for (let r = 0; r < values.length; r++) {
    const val = String(values[r][0] || "").trim();
    if (val.indexOf("SECTION ") === 0) {
      if (currentSection) {
        index[currentSection].endRow = r - 1;
      }
      currentSection = val;
      index[currentSection] = { startRow: r + 2, endRow: values.length - 1 };
    }
  }
  return index;
}

/**
 * Retrieves ordered list of headers defined for a specific sheet type.
 */
function getHeadersForSheetType_(dashboardConfig, sheetType) {
  if (dashboardConfig && dashboardConfig.sheetHeaders && dashboardConfig.sheetHeaders[sheetType]) {
    return dashboardConfig.sheetHeaders[sheetType];
  }
  return [];
}

// ============================================================================
// FORMAT DASHBOARD DEFAULT ROW LIBRARIES
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

function getDefaultTitleRowRows_() {
  return [
    ["GLOBAL", 1, "Report Title", "Sheet Definition", "", "A1", 25, 14, "Bold", "Level 3", "Left", "Overflow", "Default title row"],
    ["GLOBAL", 2, "Date Range", "Runtime Month", "Date Created", "A2:B2", 25, 10, "Normal", "Level 3", "Left", "Overflow", "A2=Date Created, B2=start"],
    ["GLOBAL", 3, "Spacer", "None", "", "A3:D3", 10, 10, "Normal", "Level 1", "Left", "Clip", "Spacer row"],
    ["GLOBAL", 4, "Header Row", "Dashboard Headers", "", "Row 4", 25, 10, "Bold", "Level 2", "Left", "Wrap", "Governed header row"]
  ];
}

function getDefaultSubheaderRowRows_() {
  return [
    ["GLOBAL", 1, "Intentional Blank", "", 25, 10, "Normal", "None", "Clip", "Blank buffer above section title"],
    ["GLOBAL", 2, "Section Header Title", "A", 25, 14, "Bold", "Level 3", "Overflow", "Section title banner"],
    ["GLOBAL", 2, "Section Header Timestamp Note", "C", 25, 10, "Italic", "Level 3", "Overflow", "Last update timestamp"],
    ["GLOBAL", 3, "Spacer Row", "", 10, 10, "Normal", "Level 1", "Clip", "Spacer row below section title"],
    ["GLOBAL", 4, "Header Row", "Primary Headers", "FIT_TO_DATA", 25, "Bold", "Level 2", "Wrap", "Governed column headers"],
    ["GLOBAL", 5, "Intentional Blank", "", 25, 10, "Normal", "None", "Clip", "Blank buffer right below headers"],
    ["GLOBAL", 6, "Enter Data Here", "Data Rows", 25, 10, "Normal", "Level 4/5", "Clip", "First data entry point"]
  ];
}

function getDefaultSheetDefinitionRows_() {
  return [
    ["Banners", "Banner Report", "Template - Banner Report", "Banners mm.yy", "#66AACC", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 9, "FIXED", 100, 25],
    ["CP Due Date", "Care Plan Due Date Report", "Template - Care Plan Due", "CP Due mm.yy", "#66CC99", "", "", "", "", "", true, "Pulled From Spreadsheet", 100, 5, "FIXED", 100, 25],
    ["Unlock CP", "Unlocked Care Plan Report", "Template - Unlocked Care Plan", "Unlock CP mm.yy", "#66CCC3", "", "", "", "", "", true, "Pulled From Spreadsheet", 100, 4, "FIXED", 100, 25],
    ["Raw Data", "Raw Data", "Template - Raw Data", "Raw Data mm.yy", "#6680CC", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 54, "FIXED", 100, 25],
    ["Refined Data", "Refined Data", "Template - Refined Data", "Refined Data", "#6680CC", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 80, "FIXED", 100, 25],
    ["Disenrolled Exclusion", "Disenrolled Exclusion", "Template - Disenrolled Exclusion", "Disenrolled", "#CC66A1", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 66, "FIXED", 100, 25],
    ["Master List", "Master List", "Template - Master List", "Master List mm.yy", "#7766CC", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 37, "FIXED", 100, 25],
    ["Monthly Change", "Monthly Change Report", "Template - Monthly Change", "Monthly Change mm.yy", "#A166CC", "", "", "", "", "", true, "Last Day of Prompt Month", 100, 54, "FIXED", 100, 25]
  ];
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

function getDefaultSystemSurfaceRows_() {
  return [
    ["Template - Framework Timing Report", "Framework Timing Report", 500, true, false, true, false, false, "VISIBLE", "FIT_TO_DATA", 8, "#79B5D2", "", "", "", "", "", "#000000", "Unified timing surface"],
    ["Template - Dashboard Quality Report", "Dashboard Quality Report", 501, true, false, true, false, false, "VISIBLE", "FIT_TO_DATA", 7, "#79B5D2", "", "", "", "", "", "#000000", "Unified quality surface"],
    ["Template - Index", "Navigation Index", 502, true, false, true, false, false, "VISIBLE", "FIT_TO_DATA", 4, "#79B5D2", "", "", "", "", "", "#000000", "Navigation surface"],
    ["Default - Format Dashboard", "Format Dashboard", 503, true, false, true, false, false, "VISIBLE", "FIT_TO_DATA", 19, "#79B5D2", "", "", "", "", "", "#000000", "Dashboard surface"]
  ];
}

function getDefaultTabOrganizationRows_() {
  return [
    ["Index", "System & Configuration", 1, ""],
    ["Refined Data", "Core Operational", 2, ""],
    ["Disenrolled Exclusion", "Core Operational", 10, ""],
    ["Master List", "Monthly Active", 21, "Dynamic Ranking"],
    ["Monthly Change", "Monthly Active", 22, "Dynamic Ranking"],
    ["Raw Data", "Monthly Active", 23, "Dynamic Ranking"],
    ["Banners", "Monthly Sub-Reports", 24, "Dynamic Ranking"],
    ["CP Due", "Monthly Sub-Reports", 25, "Dynamic Ranking"],
    ["Unlock CP", "Monthly Sub-Reports", 26, "Dynamic Ranking"],
    ["Source - Banners", "Source Data", 27, "Dynamic Ranking"],
    ["Source - Raw Data", "Source Data", 28, "Dynamic Ranking"],
    ["Source - CP Due", "Source Data", 29, "Dynamic Ranking"],
    ["Source - Unlocked CP", "Source Data", 30, "Dynamic Ranking"],
    ["B", "Unformatted", 300, ""],
    ["CD", "Unformatted", 301, ""],
    ["UC", "Unformatted", 302, ""],
    ["RD", "Unformatted", 303, ""],
    ["Archive - Demo P", "Core Operational", 350, ""],
    ["Framework Timing Report", "System & Configuration", 500, ""],
    ["Dashboard Quality Report", "System & Configuration", 501, ""],
    ["Format Dashboard", "System & Configuration", 502, ""],
    ["Template Banner Report", "Template", 801, ""],
    ["Template - Care Plan Due", "Template", 802, ""],
    ["Template Unlocked Care Plan", "Template", 803, ""],
    ["Template Raw Data", "Template", 804, ""],
    ["Template Refined Data", "Template", 805, ""],
    ["Template - Disenrolled Exclusion", "Template", 806, ""],
    ["Template Master List", "Template", 807, ""],
    ["Template Monthly Change", "Template", 808, ""],
    ["RFF_BASE_TEMPLATE", "System & Configuration", 809, ""],
    ["Default - Format Dashboard", "System & Configuration", 810, ""],
    ["Template Framework Timing", "System & Configuration", 811, ""],
    ["Template Quality Dashboard", "System & Configuration", 812, ""],
    ["Template Index", "System & Configuration", 813, ""]
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

/**
 * Helper to append a cleanly formatted 6-row subheader section to Default - Format Dashboard.
 */
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
