// ============================================================================
// SYSTEM_TEMPLATES.GS
// Template Stamping, Canvas Synchronization & Validation Engine
// ============================================================================

const RFF_BASE_TEMPLATE_NAME = "RFF_BASE_TEMPLATE";

// --- TEMPLATE UTILITIES & HELPERS -------------------------------------------

function isTemplateSheetName_(sheetName) {
  return String(sheetName || "").trim().indexOf("Template - ") === 0;
}

function applyTemplateColumnWidths_(sheet, template, width) {
  const widths = [];
  for (let col = 1; col <= width; col++) widths.push(template.getColumnWidth(col));
  applyColumnWidthsInRuns_(sheet, widths);
}

function getDashboardConfigForTemplateVisibility_(dashboardOverride) {
  if (dashboardOverride) return dashboardOverride;
  try {
    return loadDashboardConfig_();
  } catch (err) {
    logBestEffortWarning_("Template visibility dashboard config unavailable: " + err.message);
    return { sheetDefinitions: [] };
  }
}

function hideTemplateIfNeeded_(sheet, sheetDef, timing) {
  try {
    if (typeof sheet.isSheetHidden === "function" && sheet.isSheetHidden()) {
      if (timing) markFrameworkStep_(timing, "Template already hidden: " + sheetDef.templateName);
      return;
    }
    hideSheetIfNeeded_(sheet, timing, "Hide template: " + sheetDef.templateName);
  } catch (err) {
    logBestEffortWarning_("Template hide skipped for " + sheetDef.templateName + ": " + err.message);
  }
}

// --- GOLDEN MASTER & BASE CANVAS ENGINE -------------------------------------

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

function forceBaseTemplateHidden_() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RFF_BASE_TEMPLATE_NAME);
    if (sheet && !sheet.isSheetHidden()) sheet.hideSheet();
  } catch (err) {
    logBestEffortWarning_("RFF_BASE_TEMPLATE hide enforcement skipped: " + err.message);
  }
}

// --- TEMPLATE BUILDER & STAMPING ENGINE -------------------------------------

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
  
  buildTemplateFromDashboard_(sheet, dashboard, sheetDef, headers, baselineRows, columns, behavior, timing, existed);
  
  sheet.showColumns(1, sheet.getMaxColumns());
  hideSheetIfNeeded_(sheet, timing, "Hide built template: " + sheetDef.templateName);
  return sheet;
}

function buildTemplateFromDashboard_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing, templateExisted) {
  markFrameworkStep_(timing, "Full template build required: " + sheetDef.templateName);

  resizeSheetGrid_(sheet, rowCount, colCount);
  clearTemplateForFullBuild_(sheet, sheetDef, timing, templateExisted);
  
  applyTemplateBaseFormatting_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing);
  writeTemplateMetadata_(sheet, dashboard, sheetDef, colCount);
  applyTemplateFreezeAndTabColor_(sheet, dashboard, sheetDef, colCount, timing);

  markFrameworkStep_(timing, "Complete full template build: " + sheetDef.templateName);
  return sheet;
}

function clearTemplateForFullBuild_(sheet, sheetDef, timing, templateExisted) {
  if (!templateExisted) return;

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
    } catch (fallbackErr) {}
  }
  markFrameworkStep_(timing, "Clear governed template range: " + sheetDef.templateName);
}

function applyTemplateBaseFormatting_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing) {
  const globals = dashboard.globals;
  const theme = getThemeColorsFromBase_(sheetDef.baseColor, globals);
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
  applyHeaderRow_(sheet, dashboard, sheetDef, headers, theme, colCount);
  applyDataRows_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing);
  applyColumnWidths_(sheet, dashboard, headers);
  applyGovernedTextAndNumberFormats_(sheet, dashboard, headers, dataStartRow, rowCount - dataStartRow + 1);

  sheet.showColumns(1, Math.max(sheet.getMaxColumns(), 1));

  if (behavior.usesFilter) {
    ensureTemplateFilter_(sheet, globals.headerRow, rowCount, colCount, sheetDef, timing);
  }
}

function ensureTemplateFilter_(sheet, headerRow, rowCount, colCount, sheetDef, timing) {
  const expectedRows = Math.max(rowCount - headerRow + 1, 1);
  let existing = null;

  try { existing = sheet.getFilter(); } catch (err) {}

  if (existing) {
    try {
      const range = existing.getRange();
      if (RFF_FAST_TEMPLATE_REFRESH && range.getRow() === headerRow && range.getColumn() === 1 && range.getNumRows() === expectedRows && range.getNumColumns() === colCount) {
        if (timing) markFrameworkStep_(timing, "Filter already correct: " + sheetDef.templateName);
        return;
      }
      existing.remove();
    } catch (err) {}
  }

  try {
    sheet.getRange(headerRow, 1, expectedRows, colCount).createFilter();
    if (timing) markFrameworkStep_(timing, "Create filter: " + sheetDef.templateName);
  } catch (err) {}
}

function applyTemplateFreezeAndTabColor_(sheet, dashboard, sheetDef, colCount, timing) {
  const globals = dashboard.globals;
  const expectedFrozenRows = globals.freezeRows;
  const expectedFrozenCols = Math.min(globals.freezeColumns, colCount);
  const expectedTabColor = getThemeColorsFromBase_(sheetDef.baseColor, globals).level1;

  try { if (sheet.getFrozenRows() !== expectedFrozenRows) sheet.setFrozenRows(expectedFrozenRows); } catch (err) {}
  try { if (sheet.getFrozenColumns() !== expectedFrozenCols) sheet.setFrozenColumns(expectedFrozenCols); } catch (err) {}
  try { if (String(sheet.getTabColor() || "").toUpperCase() !== expectedTabColor) sheet.setTabColor(expectedTabColor); } catch (err) {}
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
  } catch (err) {}
}

// --- BATCH BUILD, VISIBILITY & VALIDATION WORKFLOWS ------------------------

function buildAllTemplatesAndValidate() {
  const buildResult = runFrameworkTimed_("Build All Templates And Validate", function(timing) {
    const dashboard = loadDashboardConfig_(true);
    ensureGoldenMasterTemplate_(dashboard, timing);
    const results = [];
    
    RFF_DEFER_TEMPLATE_HIDE_DURING_BATCH_ = true;
    
    sortSheetDefinitionsByProductionOrder_(dashboard.sheetDefinitions).forEach(function(sheetDef) {
      try {
        const template = createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, timing);
        results.push({ templateName: sheetDef.templateName, status: "PASS" });
      } catch (err) {
        results.push({ templateName: sheetDef.templateName, status: "FAIL", issue: err.message });
        logBestEffortWarning_("Template build failed for " + sheetDef.templateName + ": " + err.message);
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

function quickBuildAllTemplates() {
  notify_("Quick Build All Templates: building hidden templates and validating...");
  buildAllTemplatesAndValidate();
  notify_("Quick Build All Templates complete.");
}

function setReportTemplateVisibility_(dashboard, hidden, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetMap = {};
  ss.getSheets().forEach(function(sheet) { sheetMap[sheet.getName()] = sheet; });

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
}

function hideTemplates() { return setReportTemplateVisibility_(getDashboardConfigForTemplateVisibility_(), true, null); }
function showTemplates() { return setReportTemplateVisibility_(getDashboardConfigForTemplateVisibility_(), false, null); }

function validateReportTemplates() {
  return runFrameworkTimed_("Validate Templates", function(timing) {
    const dashboard = loadDashboardConfig_();
    return validateTemplateFromDashboard_(dashboard, timing);
  });
}

function validateTemplateFromDashboard_(dashboard, sheetDef) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetDef.templateName);
  const issues = [];
  const globals = dashboard.globals;
  const expectedHeaders = getHeadersForSheetType_(dashboard, sheetDef.sheetType);
  const behavior = getBehaviorForSheetType_(dashboard, sheetDef.sheetType);

  if (!sheet) return { templateName: sheetDef.templateName, sheetType: sheetDef.sheetType, status: "FAIL", issues: "Template missing" };
  if (expectedHeaders.length === 0) issues.push("No headers defined in dashboard");

  try {
    if (sheet.getFrozenRows() !== globals.freezeRows) issues.push("Frozen rows mismatch");
    if (sheet.getFrozenColumns() > globals.freezeColumns) issues.push("Frozen columns mismatch");
  } catch (err) { issues.push("Frozen check failed: " + err.message); }

  try {
    const actualHeaders = sheet.getRange(globals.headerRow, 1, 1, Math.max(expectedHeaders.length, 1)).getValues()[0].map(normalizeHeader_);
    expectedHeaders.forEach(function(expected, index) {
      if (actualHeaders[index] !== expected) issues.push("Header mismatch col " + (index + 1) + ": expected " + expected + ", found " + actualHeaders[index]);
    });
  } catch (err) { issues.push("Header check failed: " + err.message); }

  try {
    if (behavior.usesFilter && !sheet.getFilter()) issues.push("Filter missing");
  } catch (err) { issues.push("Filter check failed: " + err.message); }

  return {
    templateName: sheetDef.templateName,
    sheetType: sheetDef.sheetType,
    status: issues.length === 0 ? "PASS" : "FAIL",
    issues: issues.length === 0 ? "OK" : issues.join("; ")
  };
}

function ensureRequiredMasterListTemplate_(dashboard, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSheetByName("Template - Master List")) return ss.getSheetByName("Template - Master List");

  const sheetDef = getSheetDefinitionByTypeOrNull_(dashboard, SHEET_TYPE.MASTER_LIST) || getDefaultSheetDefinitionByType_(SHEET_TYPE.MASTER_LIST);
  const template = createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, timing);
  markFrameworkStep_(timing, "Required Master List template verified: " + sheetDef.templateName);
  return template;
}

// --- CONVENIENCE WRAPPERS (OUTPUT & PRODUCTION PIPELINES) ------------------

function createOrRefreshDemoPTemplate_(ss) {
  const dashboard = loadDashboardConfig_();
  return createOrRefreshTemplateFromDashboard_(dashboard, getSheetDefinitionByType_(dashboard, SHEET_TYPE.DEMO_P), null);
}

function createOrRefreshMasterListTemplate_(ss) {
  const dashboard = loadDashboardConfig_();
  return createOrRefreshTemplateFromDashboard_(dashboard, getSheetDefinitionByType_(dashboard, SHEET_TYPE.MASTER_LIST), null);
}

function createMasterListSheetFromTemplate_(ss, targetName, monthParts, timing, timingLabel) {
  return createOutputSheetFromDashboardTemplate_(
    SHEET_TYPE.MASTER_LIST, targetName, [], monthParts.firstDay, monthParts.lastDay, timing, timingLabel || "Master List template copy"
  );
}
