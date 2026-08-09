# **Wave 4 v4Corrections**

````
TASK INSTRUCTION:
Refactor `v1.8.9.8.4_Current_Script` using the EXACT code replacements provided below to fix runtime crashes, decouple system setup, enforce 5-row subheaders on Monthly Change, apply 5pt font to Care Plan metadata, restore Raw Data post-processing, and add "Uses Subheaders" to Section E.

IMPLEMENTATION REQUIREMENTS:

1. SECTION E SCHEMA EXPANSION ("Uses Subheaders")
In `getDefaultSystemSurfaceRows_()`, update the column headers and default rows to explicitly include "Uses Subheaders". The headers array must be:
["System Sheet Name", "Display Name", "Sort Order", "Uses Title Rows", "Uses Filter", "Uses Alternating Colors", "Uses Subheaders", "Hidden Template", "Output Visibility", "Default Column Widths", "Title Fill Color", "Title Font Color", "Notes"]

2. DECOUPLE SYSTEM SHEET BUILDING & PREVENT BASE TEMPLATE BUILD
Add `buildSystemSheets()` and update `setupSystemSheets()` EXACTLY as follows:

```javascript
function buildSystemSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboard = loadDashboardConfig_();
  const surfaces = dashboard.systemSurfaces || {};
  
  Object.keys(surfaces).forEach(function(key) {
    const surface = surfaces[key];
    // EXPLICIT GUARD: Never build Base Template during system setup!
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

*Note: Ensure `onOpen()` maps "Build System Sheets" to `buildSystemSheets` and "Set up System Sheets" to `setupSystemSheets`.*

3. FIX THE QUALITY START UP CRASH (ReferenceError) Find `ensureDashboardQualitySheetShellForWorkflow_` and replace it ENTIRELY with this exact code to eradicate the legacy signature crash:

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

4.   
   FIX RAW DATA PRIMARY PMR CRASH (Missing Helper) Find `assignPrimaryPMRRowsInData_` and replace it ENTIRELY with this exact code so it no longer relies on missing block-sorting helpers:

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

5.   
   CARE PLAN 5PT METADATA & RAW DATA COLUMN UNHIDE In `formatMonthlySubReportViaTemplate_`, replace the `if (titleInfo)` and `RAW_DATA` blocks with this exact code:

JavaScript

```
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
    // EXPLICIT UNHIDE ALL COLUMNS
    outputSheet.showColumns(1, Math.max(outputSheet.getMaxColumns(), 1));
  }
```

6.   
   MONTHLY CHANGE 5-ROW SUB-HEADERS Find `formatMonthlyChangeSubsectionBlock_` and replace it ENTIRELY with this exact code to route it through the 5-row standard:

JavaScript

```
function formatMonthlyChangeSubsectionBlock_(sheet, titleRow, label, colCount, dashboard, sheetDef, writeLabel) {
  if (!writeLabel) return;
  const headers = getHeadersForSheetType_(dashboard, SHEET_TYPE.MONTHLY_CHANGE).slice(0, colCount);
  // Route directly to the 5-row standard sub-header builder (Offset 0 is titleRow - 1)
  applySubHeaderBlock_(sheet, titleRow - 1, label, null, headers, dashboard, sheetDef, { valuesAlreadyWritten: false });
}
```

Verify clean compilation. These explicit replacements will fix the Quality Start Up crash, decouple system building, restore Raw Data processing, and enforce 5-row formatting.

