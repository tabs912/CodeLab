# **Wave 4 v5Corrections** 

###  **🛠️ The Hard-Coded Overwrite Prompt (No AI Interpretation)**

We have to force Codex to do a **literal text-replace** across the entire file, stripping out its iterative logic.

Copy and paste this exact prompt into Codex. **Do not modify it.** This will enforce the exact JavaScript strings we need.

Plaintext

````
TASK INSTRUCTION:
You must perform an EXACT text replacement in `v1.8.9.8.4_Current_Script` for the following functions. Do not interpret, optimize, or change a single character of the provided JavaScript. OVERWRITE the existing functions completely.

1. EXACT REPLACEMENT FOR `buildSystemSheets` and `setupSystemSheets`:
Find any existing declarations of `buildSystemSheets` or `setupSystemSheets` and completely replace them with:

```javascript
function buildSystemSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboard = loadDashboardConfig_();
  const surfaces = dashboard.systemSurfaces || {};
  
  Object.keys(surfaces).forEach(function(key) {
    const surface = surfaces[key];
    if (surface.systemSheetName === RFF_BASE_TEMPLATE_NAME) return;
    
    let sheet = ss.getSheetByName(surface.systemSheetName);
    if (!sheet) {
      sheet = insertGovernedOutputSheet_(ss, surface.systemSheetName);
    }
    if (surface.defaultColumnWidths && surface.defaultColumnWidths.length) {
      applyColumnWidthsInRuns_(sheet, surface.defaultColumnWidths);
    }
  });
  notify_("System sheets physically built based on Section E configuration.");
}

function setupSystemSheets() {
  buildSystemSheets();
  rebuildFormatDashboardDefaults();
  ensureFrameworkTimingReport_();
  runDashboardQualityStartUp();
  notify_("System sheets setup and initialized.");
}
````

2.   
   EXACT REPLACEMENT TO FIX THE QUALITY CRASH: Find `ensureDashboardQualitySheetShellForWorkflow_` and completely replace it with:

JavaScript

```
function ensureDashboardQualitySheetShellForWorkflow_(sheet, dashboard, timing) {
  if (!sheet) return sheet;
  if (!hasDashboardQualityTemplateShell_(sheet)) {
    rebuildDashboardQualitySheetShellStructure_(sheet, dashboard, timing);
  } else {
    if (timing) markFrameworkStep_(timing, "Dashboard Quality matrix shell verified");
  }
  return sheet;
}
```

3.   
   EXACT REPLACEMENT FOR PRIMARY PMR FLAGS: Find `assignPrimaryPMRRowsInData_` and completely replace it with:

JavaScript

```
function assignPrimaryPMRRowsInData_(data) {
  if (!data || !data.values || !data.headerMap) return;
  const headerMap = data.headerMap;
  const pmrIdx = getPMRIndex_(headerMap);
  const primaryIdx = headerMap["Primary PMR Row"];
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
```

4.   
   EXACT REPLACEMENT FOR RAW DATA FLUSH & CARE PLAN METADATA: Find `formatMonthlySubReportViaTemplate_` and completely replace it with:

JavaScript

```
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
```

5.   
   EXACT REPLACEMENT FOR MONTHLY CHANGE SUBHEADERS: Find `formatMonthlyChangeSubsectionBlock_` and completely replace it with:

JavaScript

```
function formatMonthlyChangeSubsectionBlock_(sheet, titleRow, label, colCount, dashboard, sheetDef, writeLabel) {
  if (!writeLabel) return;
  const headers = getHeadersForSheetType_(dashboard, SHEET_TYPE.MONTHLY_CHANGE).slice(0, colCount);
  applySubHeaderBlock_(sheet, titleRow - 1, label, null, headers, dashboard, sheetDef, { valuesAlreadyWritten: false });
}
```

6.   
   EXACT REPLACEMENT FOR SECTION E DEFAULTS: In `getDefaultSystemSurfaceRows_()`, replace the existing array return block with:

JavaScript

```
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
```

Verify compilation. Ensure ZERO legacy syntax remains for these specific functions.

