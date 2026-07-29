# **Base Template Updates** 

Here is the complete, production-ready **Codex / AI Engineering Prompt** to implement and maintain the **Base Template Updates Engine** (`updateBaseTemplateCanvas` / `syncBaseTemplateWithDashboard`).

This module governs the fundamental structural sync between your **Format Dashboard** (Sections C & G) and the core base template components—ensuring column headers, default formatting, text wrapping, frozen rows, and grid boundaries are propagated cleanly down to the base templates before any output generation or sub-report builds occur.

# **📜 Codex Prompt: Base Template Updates Implementation & Maintenance**

```
TASK INSTRUCTION:
Implement and refactor the Base Template Updates Module (`updateBaseTemplateCanvas` and `syncBaseTemplateWithDashboard`) in the Google Apps Script codebase based on the specification below.

OVERVIEW:
The Base Template Updates Engine acts as the foundational layout synchronizer. It ensures that master base templates (`Template - [SheetType]`) mirror the exact column schemas, default number/date formats, and grid structures defined in Section G (Column Definitions) and Section C (Sheet Configurations) of the Format Dashboard. This creates pristine, perfectly configured canvases for all downstream report engines.

REQUIREMENTS & ARCHITECTURE:

1. ABSOLUTE TEMPLATE VISIBILITY LAW:
   - Base templates MUST ALWAYS REMAIN 100% UNHIDDEN across all columns and sheet tabs.
   - NEVER apply Section G column hiding (`hideColumn = true`) or sheet tab hiding to base templates.
   - Column hiding is strictly enforced ONLY on generated active output sheets via `applyColumnHidingFromDashboard_`.

2. IN-MEMORY SCHEMA SYNC & CANVAS RE-ALIGNMENT:
   - Read Section G column definitions and Section C header mappings from the Format Dashboard via `loadDashboardConfig_()`.
   - Update `HEADER_ROW` (Row 1):
     * Synchronize header text labels directly from Section C/G definitions.
     * Apply default header styling: Bold, 10pt font, Top alignment, Wrap Text enabled, crisp background fill (`#EBF4F9`).
     * Explicitly unhide all columns up to the total header count.
   - Synchronize Data Grid (`DATA_START_ROW` down):
     * Set default row height to 21px.
     * Apply uniform border gridlines (`#D9D9D9` solid).
     * Apply column-specific number/date formats (e.g., `MM/DD/YYYY` for dates, `@` for text/PMRs) directly across data column ranges.

3. GRID CLEANUP & FROZEN BOUNDARIES:
   - Freeze `HEADER_ROW` (Row 1) on the base template.
   - Remove excess empty columns beyond the configured Section G header boundary to prevent bloated workbook files.
   - Ensure `templateSheet.showSheet()` is invoked so base templates are immediately available for auditing.

4. FAIL-SAFE TRANSFORMATION & CACHE CLEARING:
   - Execute in-place updates on existing template sheets to preserve sheet bindings where applicable.
   - Clear runtime sheet caches (`clearSheetRuntimeCachesForSheet_`) immediately following base template updates to ensure stale header indices are never passed to downstream mappers.

--------------------------------------------------------------------------------
PROPOSED JS IMPLEMENTATION:

/**
 * Main orchestrator: Syncs all base template canvases against active Dashboard definitions.
 */
function syncBaseTemplateWithDashboard() {
  return runFrameworkTimed_("Sync Base Templates with Dashboard", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboard = loadDashboardConfig_();

    const baseSheetTypes = [
      SHEET_TYPE.REFINED_DATA,
      SHEET_TYPE.DISENROLLED_EXCLUSION,
      SHEET_TYPE.CARE_PLAN_DUE,
      SHEET_TYPE.BANNERS,
      SHEET_TYPE.UNLOCKED_CP,
      SHEET_TYPE.MONTHLY_CHANGE,
      SHEET_TYPE.MASTER_LIST
    ];

    let syncedCount = 0;
    baseSheetTypes.forEach(sheetType => {
      try {
        updateBaseTemplateCanvas_(ss, sheetType, dashboard);
        syncedCount++;
        markFrameworkStep_(timing, "Base template updated: Template - " + sheetType);
      } catch (err) {
        logBestEffortWarning_("Base template update failed for " + sheetType + ": " + err.message);
      }
    });

    notify_("Base Template Sync Complete.\nSuccessfully updated " + syncedCount + " base templates.");
  });
}

/**
 * Updates an individual base template canvas strictly from Dashboard definitions.
 */
function updateBaseTemplateCanvas_(ss, sheetType, dashboard) {
  dashboard = dashboard || loadDashboardConfig_();
  const templateName = "Template - " + sheetType;

  // 1. Locate or Create Base Template Sheet
  let templateSheet = ss.getSheetByName(templateName);
  if (!templateSheet) {
    templateSheet = ss.insertSheet(templateName);
  }

  // Ensure Base Template Tab is 100% Unhidden/Visible
  templateSheet.showSheet();

  // 2. Fetch Dashboard Header Config for this Sheet Type
  const headers = getDashboardHeadersForSheetType_(sheetType, dashboard);
  if (!headers || !headers.length) {
    throw new Error("No Section G/C column definitions found for base template type: " + sheetType);
  }

  const width = headers.length;

  // 3. Ensure All Base Template Columns Are Unhidden (100% Visible)
  const currentMaxCols = templateSheet.getMaxColumns();
  if (currentMaxCols < width) {
    templateSheet.insertColumnsAfter(currentMaxCols, width - currentMaxCols);
  }
  templateSheet.showColumns(1, templateSheet.getMaxColumns());

  // 4. Synchronize Header Row (Row 1)
  const headerRange = templateSheet.getRange(HEADER_ROW, 1, 1, width);
  headerRange.setValues([headers]);
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  headerRange.setVerticalAlignment("top");
  headerRange.setWrapText(true);
  headerRange.setBackground("#EBF4F9");
  headerRange.setFontColor("#000000");
  templateSheet.setRowHeight(HEADER_ROW, 35);

  // 5. Synchronize Default Data Grid Styling (Row 2 Down)
  const dataRange = templateSheet.getRange(DATA_START_ROW, 1, Math.max(templateSheet.getMaxRows() - DATA_START_ROW + 1, 10), width);
  dataRange.setFontSize(10);
  dataRange.setFontFamily("Arial");
  dataRange.setVerticalAlignment("top");
  
  // Apply Uniform Light Gray Gridlines
  dataRange.setBorder(
    true, true, true, true, true, true, 
    "#D9D9D9", SpreadsheetApp.BorderStyle.SOLID
  );

  // Apply Section G Column Number & Date Formats
  const colDefs = dashboard.columnDefinitions || {};
  headers.forEach((colName, idx) => {
    const colIndex = idx + 1;
    const def = colDefs[colName];
    if (def && def.numberFormat) {
      templateSheet.getRange(DATA_START_ROW, colIndex, templateSheet.getMaxRows() - DATA_START_ROW + 1, 1)
        .setNumberFormat(def.numberFormat);
    }
  });

  // 6. Set Row Height & Freeze Boundaries
  templateSheet.setRowHeight(DATA_START_ROW, 21);
  templateSheet.setFrozenRows(HEADER_ROW);

  // 7. Clean Excess Empty Columns Beyond Defined Schema Width
  const maxCols = templateSheet.getMaxColumns();
  if (maxCols > width) {
    templateSheet.deleteColumns(width + 1, maxCols - width);
  }

  // 8. Clear Sheet Runtime Cache
  clearSheetRuntimeCachesForSheet_(templateSheet);

  return templateSheet;
}
--------------------------------------------------------------------------------

Verify that all base template updates execute smoothly without applying column hiding on template tabs. 
```

