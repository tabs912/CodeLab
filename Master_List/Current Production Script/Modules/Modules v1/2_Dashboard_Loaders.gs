// ============================================================================
// 2_DASHBOARD_LOADERS.GS
// Dynamic Format Dashboard Parser & Single Source-of-Truth Engine
// ============================================================================

const RFF_SECTION_GLOBALS = "SECTION A";
const RFF_SECTION_TITLES = "SECTION B";
const RFF_SECTION_DEFINITIONS = "SECTION C";
const RFF_SECTION_BEHAVIORS = "SECTION D";
const RFF_SECTION_SURFACES = "SECTION E";
const RFF_SECTION_TAB_ORGANIZATION = "SECTION F";
const RFF_SECTION_COLUMNS = "SECTION G";
const RFF_SECTION_HEADERS = "SECTION H";

// --- CORE DASHBOARD LOADER & CACHE MANAGER -----------------------------------

/**
 * Reads and parses all sections of the Format Dashboard into memory.
 * Caches the config object for fast execution across workflow steps.
 */
function loadDashboardConfig_(forceRefresh) {
  const cache = getRuntimeCache_();
  if (!forceRefresh && cache.dashboardConfig) return cache.dashboardConfig;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
  if (!dashboardSheet) throw new Error("Format Dashboard sheet is missing.");

  const config = {
    globals: loadGlobalSettings_(dashboardSheet),
    titleRows: loadTitleRows_(dashboardSheet),
    sheetDefinitions: loadSheetDefinitions_(dashboardSheet),
    behaviors: loadSheetBehaviors_(dashboardSheet),
    systemSurfaces: loadSystemSurfaces_(dashboardSheet),
    tabOrganization: loadTabOrganization_(dashboardSheet),
    columnDefinitions: loadColumnDefinitions_(dashboardSheet),
    sheetHeaders: loadSheetHeaders_(dashboardSheet)
  };

  cache.dashboardConfig = config;
  return config;
}

function clearDashboardConfigCache_() {
  getRuntimeCache_().dashboardConfig = null;
}

/**
 * Generic row reader for any section on the Format Dashboard.
 * Finds the section header banner and returns clean data rows.
 */
function readDashboardSectionRows_(sheet, sectionMarker) {
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  let start = -1;

  for (let i = 0; i < data.length; i++) {
    const val = String(data[i][0] || "").trim();
    if (val.indexOf(sectionMarker) === 0) {
      start = i + 4; // Data rows start 4 rows below section title banner
      break;
    }
  }

  if (start === -1 || start >= data.length) return [];

  const rows = [];
  for (let i = start; i < data.length; i++) {
    const firstCell = String(data[i][0] || "").trim();
    if (firstCell.indexOf("SECTION ") === 0) break; // Next section boundary reached
    if (data[i].some(cell => String(cell || "").trim() !== "")) {
      rows.push(data[i]);
    }
  }
  return rows;
}

function normalizeDashboardSheetTypeKey_(sheetType) {
  const text = normalizeKey_(sheetType);
  if (text === "banners" || text === "banner") return SHEET_TYPE.BANNER;
  if (text === "cp due date" || text === "care plan due" || text === "cp due") return SHEET_TYPE.CARE_PLAN_DUE;
  if (text === "unlock cp" || text === "unlocked cp" || text === "unlock care plan") return SHEET_TYPE.UNLOCKED;
  if (text === "raw data" || text === "raw") return SHEET_TYPE.RAW_DATA;
  if (text === "refined data" || text === "demo p") return SHEET_TYPE.DEMO_P;
  if (text === "disenrolled exclusion" || text === "disenrolled") return SHEET_TYPE.DISENROLLED_EXCLUSION;
  if (text === "master list" || text === "master") return SHEET_TYPE.MASTER_LIST;
  if (text === "monthly change" || text === "monthly change report") return SHEET_TYPE.MONTHLY_CHANGE;
  return String(sheetType || "").trim();
}

// --- SECTION PARSERS (A - H) ------------------------------------------------

/**
 * SECTION A: Global Settings
 */
function loadGlobalSettings_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_GLOBALS);
  const settings = {
    headerRow: 4, dataStartRow: 5, freezeRows: 4, freezeColumns: 2,
    defaultColumnWidth: 105, defaultDateFormat: "mm/dd/yyyy", standardFont: "Arial",
    standardFontSize: 10, hslLevel1: 60, hslLevel2: 75, hslLevel3: 85, hslLevel4: 90, hslLevel5: 97
  };

  rows.forEach(row => {
    const key = String(row[0] || "").trim();
    const val = row[1];
    if (!key) return;

    if (key === "Header Row") settings.headerRow = numberOrDefault_(val, 4);
    else if (key === "Data Start Row") settings.dataStartRow = numberOrDefault_(val, 5);
    else if (key === "Freeze Rows") settings.freezeRows = numberOrDefault_(val, 4);
    else if (key === "Freeze Columns") settings.freezeColumns = numberOrDefault_(val, 2);
    else if (key === "Default Column Width") settings.defaultColumnWidth = numberOrDefault_(val, 105);
    else if (key === "Default Date Format") settings.defaultDateFormat = String(val || "mm/dd/yyyy").trim();
    else if (key === "Standard Font") settings.standardFont = String(val || "Arial").trim();
    else if (key === "Standard Font Size") settings.standardFontSize = numberOrDefault_(val, 10);
    else if (key === "HSL Level 1 Lightness %") settings.hslLevel1 = numberOrDefault_(val, 60);
    else if (key === "HSL Level 2 Lightness %") settings.hslLevel2 = numberOrDefault_(val, 75);
    else if (key === "HSL Level 3 Lightness %") settings.hslLevel3 = numberOrDefault_(val, 85);
    else if (key === "HSL Level 4 Lightness %") settings.hslLevel4 = numberOrDefault_(val, 90);
    else if (key === "HSL Level 5 Lightness %") settings.hslLevel5 = numberOrDefault_(val, 97);
  });

  return settings;
}

/**
 * SECTION B: Title Rows
 */
function loadTitleRows_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_TITLES);
  const titleRows = {};

  rows.forEach(row => {
    const sheetType = normalizeDashboardSheetTypeKey_(row[0] || "GLOBAL");
    const rowNum = numberOrDefault_(row[1], 1);
    if (!titleRows[sheetType]) titleRows[sheetType] = {};

    titleRows[sheetType][rowNum] = parseTitleRowConfigRow_(row, {}, { row: rowNum, sheetType });
  });

  return titleRows;
}

function parseTitleRowConfigRow_(row, globals, base) {
  row = row || [];
  base = base || {};
  const rowNumber = numberOrDefault_(row[1], base.row || 1);
  return {
    sheetType: String(row[0] || base.sheetType || "GLOBAL").trim(),
    row: rowNumber,
    purpose: String(row[2] || base.purpose || "").trim(),
    valueSource: String(row[3] || base.valueSource || "").trim(),
    label: String(row[4] || base.label || "").trim(),
    targetCell: normalizeTitleTargetCell_(row[5] || base.targetCell, rowNumber),
    height: numberOrDefault_(row[6], 25),
    fontSize: numberOrDefault_(row[7], 10),
    fontWeight: String(row[8] || "normal").toLowerCase() === "bold" ? "bold" : "normal",
    fillLevel: String(row[9] || "Level 1").trim(),
    alignment: String(row[10] || "left").trim().toLowerCase(),
    wrap: String(row[11] || "CLIP").trim().toUpperCase()
  };
}

function normalizeTitleTargetCell_(value, rowNumber) {
  const text = String(value || "").trim();
  if (/^[A-Za-z]+[1-9][0-9]*$/.test(text)) return text.toUpperCase();
  return "A" + Math.max(Number(rowNumber || 1), 1);
}

/**
 * SECTION C: Sheet Definitions
 */
function loadSheetDefinitions_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_DEFINITIONS);
  return rows.filter(row => String(row[0] || "").trim() !== "").map(row => {
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

/**
 * SECTION D: Sheet Behaviors
 */
function loadSheetBehaviors_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_BEHAVIORS);
  const behaviors = {};

  rows.forEach(row => {
    const key = normalizeDashboardSheetTypeKey_(row[0]);
    if (!key) return;
    behaviors[key] = {
      usesTitleRows: parseBoolean_(row[1]),
      usesFilter: parseBoolean_(row[2]),
      usesAlternatingColors: parseBoolean_(row[3]),
      usesSubheaders: parseBoolean_(row[4]),
      hiddenTemplate: parseBoolean_(row[5]),
      outputVisibility: String(row[6] || "VISIBLE").trim().toUpperCase()
    };
  });

  return behaviors;
}

/**
 * SECTION E: System Sheet Surfaces
 */
function loadSystemSurfaces_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_SURFACES);
  const surfaces = {};

  rows.forEach(row => {
    const name = String(row[0] || "").trim();
    if (!name) return;
    surfaces[name] = {
      systemSheetName: name,
      displayName: String(row[1] || name).trim(),
      sortOrder: numberOrDefault_(row[2], 500),
      usesTitleRows: parseBoolean_(row[3]),
      usesFilter: parseBoolean_(row[4]),
      usesAlternatingColors: parseBoolean_(row[5]),
      usesSubheaders: parseBoolean_(row[6]),
      hiddenTemplate: parseBoolean_(row[7]),
      outputVisibility: String(row[8] || "VISIBLE").trim().toUpperCase(),
      baseColor: normalizeHex_(row[11] || "#79B5D2")
    };
  });

  return surfaces;
}

/**
 * SECTION F: Tab Organization & Index
 */
function loadTabOrganization_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_TAB_ORGANIZATION);
  const profiles = [];

  rows.forEach((row, idx) => {
    const name = String(row[0] || "").trim();
    if (!name) return;
    profiles.push({
      nameOrPrefix: name,
      group: String(row[1] || "Other").trim(),
      rankBase: numberOrDefault_(row[2], (idx + 1) * 100),
      special: String(row[3] || "").trim()
    });
  });

  return profiles;
}

function getTabOrganizationProfilesForSort_() {
  const dashboard = loadDashboardConfig_();
  return dashboard.tabOrganization || [];
}

/**
 * SECTION G: Column Definitions
 */
function loadColumnDefinitions_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_COLUMNS);
  const map = {};

  rows.forEach(row => {
    const header = normalizeHeader_(row[0]);
    if (!header) return;
    map[header] = {
      header: header,
      width: isBlankCell_(row[1]) ? null : numberOrDefault_(row[1], null),
      headerFontSize: isBlankCell_(row[2]) ? null : numberOrDefault_(row[2], null),
      dateColumn: parseBoolean_(row[3]),
      hideColumn: parseBoolean_(row[4]),
      dataWrap: String(row[5] || "CLIP").trim().toUpperCase(),
      horizontalAlignment: String(row[6] || "left").trim().toLowerCase(),
      verticalAlignment: String(row[7] || "middle").trim().toLowerCase(),
      numberFormat: String(row[8] || "").trim()
    };
  });

  return map;
}

/**
 * SECTION H: Sheet Headers
 */
function loadSheetHeaders_(sheet) {
  const rows = readDashboardSectionRows_(sheet, RFF_SECTION_HEADERS);
  const map = {};

  rows.forEach(row => {
    const sheetType = normalizeDashboardSheetTypeKey_(row[0]);
    const order = numberOrDefault_(row[1], 9999);
    const header = normalizeHeader_(row[2]);
    const source = String(row[3] || "").trim();

    if (!sheetType || !header) return;
    if (!map[sheetType]) map[sheetType] = [];

    map[sheetType].push({ order: order, header: header, source: source });
  });

  Object.keys(map).forEach(sheetType => {
    map[sheetType].sort((a, b) => a.order - b.order);
  });

  return map;
}

// --- QUERY & LOOKUP HELPERS -------------------------------------------------

function getSheetDefinitionByTypeOrNull_(dashboard, sheetType) {
  const normalized = normalizeDashboardSheetTypeKey_(sheetType);
  return (dashboard.sheetDefinitions || []).filter(item => {
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
  return {
    sheetType: normalized,
    reportTitle: String(sheetType).trim(),
    templateName: "Template - " + String(sheetType).trim(),
    outputNamingPattern: "",
    baseColor: "#65A9CC",
    usePromptDate: true,
    endDateSource: "",
    templateRowCount: 100,
    templateColumnCount: 0,
    templateRowMode: "FIXED",
    minimumRows: 100,
    bufferRows: 100
  };
}

function getBehaviorForSheetType_(dashboard, sheetType) {
  const normalized = normalizeDashboardSheetTypeKey_(sheetType);
  const behaviors = dashboard && dashboard.behaviors ? dashboard.behaviors : {};
  return behaviors[normalized] || behaviors[sheetType] || getDefaultBehavior_();
}

function getDefaultBehaviorForSheetType_(sheetType) {
  return getDefaultBehavior_();
}

function getDefaultBehavior_() {
  return {
    usesTitleRows: true,
    usesFilter: true,
    usesAlternatingColors: true,
    usesSubheaders: false,
    hiddenTemplate: true,
    outputVisibility: "VISIBLE"
  };
}

function getHeadersForSheetType_(dashboard, sheetType) {
  const normalized = normalizeDashboardSheetTypeKey_(sheetType);
  const items = dashboard.sheetHeaders[normalized] || dashboard.sheetHeaders[sheetType] || [];
  return items.map(item => item.header);
}

function getTitleRowConfigForSheet_(dashboard, sheetDef, rowNumber) {
  const allTitleRows = (dashboard && dashboard.titleRows) || {};
  const sheetType = sheetDef ? normalizeDashboardSheetTypeKey_(sheetDef.sheetType) : "";
  const sheetRows = allTitleRows[sheetType] || {};
  const globalRows = allTitleRows.GLOBAL || {};
  return sheetRows[rowNumber] || globalRows[rowNumber] || parseTitleRowConfigRow_([], dashboard.globals || {}, { row: rowNumber });
}

// --- COLOR & THEME CALCULATION ENGINE ---------------------------------------

function normalizeHex_(color) {
  let hex = String(color || "#65A9CC").trim();
  if (hex.charAt(0) !== "#") hex = "#" + hex;
  return hex.length === 7 ? hex.toUpperCase() : "#65A9CC";
}

function getThemeColorsFromBase_(baseHex, globals) {
  globals = globals || {};
  const cache = getRuntimeCache_();
  const hex = normalizeHex_(baseHex);
  
  if (cache.themeColors[hex]) return cache.themeColors[hex];

  const hsl = hexToHsl_(hex);
  const l1 = numberOrDefault_(globals.hslLevel1, 60);
  const l2 = numberOrDefault_(globals.hslLevel2, 75);
  const l3 = numberOrDefault_(globals.hslLevel3, 85);
  const l4 = numberOrDefault_(globals.hslLevel4, 90);
  const l5 = numberOrDefault_(globals.hslLevel5, 97);

  const theme = {
    base: hex,
    level1: hslToHex_(hsl.h, hsl.s, l1),
    level2: hslToHex_(hsl.h, hsl.s, l2),
    level3: hslToHex_(hsl.h, hsl.s, l3),
    level4: hslToHex_(hsl.h, hsl.s, l4),
    level5: hslToHex_(hsl.h, hsl.s, l5)
  };

  cache.themeColors[hex] = theme;
  return theme;
}

function getThemeFillForTitleRow_(theme, fillLevel) {
  const level = String(fillLevel || "Level 1").trim().toLowerCase();
  if (level === "level 2") return theme.level2;
  if (level === "level 3") return theme.level3;
  if (level === "level 4") return theme.level4;
  if (level === "level 5") return theme.level5;
  return theme.level1;
}

function getSectionEThemeForSheet_(targetSheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
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
      if (name === targetSheetName) {
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
