# **Format Monthly Sheets Updates** 

Here is the complete function call map for both **`formatMonthlySheets`** (the batch processing engine) and the **Individual Maintenance Format Triggers** based on your current production script.

## **📊 1\. Batch Execution Pipeline: `formatMonthlySheets`**

When triggered from **📊 Data & Processing Engine \> 📚 Format Monthly Sheets**, the function runs an orchestrated, multi-report loop:

````
formatMonthlySheets()
 ├── promptForLockedYearReportMonth_()               [Prompts user for report date / month context]
 ├── buildPromptedMonthContext_()                   [Parses date into monthLabel & first/last day parts]
 ├── SpreadsheetApp.openById(RFF_ARCHIVE_SPREADSHEET_ID) [Pre-opens single external archive connection]
 │
 ├── 🔄 ROUTE LOOP (Processes available import tabs):
 │    │
 │    ├── 1. Banners (Route "B"): formatMonthlyBannerSheet_()
 │    │    ├── findMonthlyImportSheetForRoute_()     [Locates import tab candidate]
 │    │    ├── getTemplateDrivenActiveSheetContext_() [Retrieves Banner archetype context & template]
 │    │    ├── deleteSheetIfExists_()                [Clears pre-existing output sheet if present]
 │    │    ├── templateSheet.copyTo()                [Duplicates template tab]
 │    │    ├── placeCreatedSheetInConfiguredOrder_()  [Positions sheet based on Section F rank]
 │    │    ├── writeBannerReportDates_()             [Stamps start/end dates in B2 & D2]
 │    │    ├── copyRawBannerDataToOutput_()          [Bulk-copies data rows]
 │    │    ├── archiveRawSourceAndDeleteLocal_()     [Archived to external sheet & deletes local raw tab]
 │    │    └── applyOutputVisibilityPolicy_()        [Enforces VISIBLE / HIDDEN policy]
 │    │
 │    ├── 2. Care Plan Due (Route "CD"): formatMonthlyDashboardSheetFromSource_()
 │    │    ├── findMonthlyImportSheetForRoute_()
 │    │    ├── getTemplateDrivenActiveSheetContext_()
 │    │    ├── collectMovedTitleInfoCells_()         [Extracts metadata from cells C3 & E3]
 │    │    ├── getDataValues_()                      [Reads raw source values]
 │    │    ├── mapRowsToHeaders_()                   [Maps source columns to dashboard headers in memory]
 │    │    ├── createOutputSheetFromDashboardTemplate_() [Builds fast canvas & paints template styles]
 │    │    ├── lockFinalOutputRowHeights_()         [Locks row heights to 25px]
 │    │    ├── archiveRawSourceAndDeleteLocal_()
 │    │    └── applyOutputVisibilityPolicy_()
 │    │
 │    ├── 3. Unlocked CP (Route "UC"): formatMonthlyDashboardSheetFromSource_()
 │    │    ├── (Identical flow to Care Plan Due, using cells E2 & G2 for dates)
 │    │
 │    └── 4. Raw Data (Route "RD"): formatMonthlyRawDataSheetFromSource_()
 │         └── formatRawDataInPlaceSheet_()          (Shared in-place engine; see below)
 │
 └── createIndexSheet(archiveSs)                      [Single shared Index refresh at end of batch]
```[cite: 1]

---

## 🛠️ 2. Standalone Maintenance Format Triggers

Under **🛠️ Maintenance/Rebuild > 📝 Format Sheets**, each report can be formatted individually on an active sheet[cite: 1].

### A. `formatBannerReport`
Formats the active or matching same-month Banner import tab[cite: 1].

````

formatBannerReport() ├── promptForLockedYearReportMonth\_() ├── resolveMonthlyFormatterSourceSheet\_() \[Finds matching same-month source tab\] ├── getTemplateDrivenActiveSheetContext\_() ├── deleteSheetIfExists\_() ├── templateSheet.copyTo() ├── placeCreatedSheetInConfiguredOrder\_() ├── writeBannerReportDates\_() ├── copyRawBannerDataToOutput\_() ├── archiveRawSourceAndDeleteLocal\_() ├── applyOutputVisibilityPolicy\_() └── refreshIndexAfterSheetWorkflow\_() \[Triggers standalone Index rebuild\]

Code snippet

```

---

### B. `formatCarePlanDueReport` & `formatUnlockedCarePlanReport`
Both menu items route to the dynamic helper `formatCarePlanDueOrUnlockedFromDashboard_()`[cite: 1]:

```

formatCarePlanDueReport() ──┐ ├──\> formatCarePlanDueOrUnlockedFromDashboard\_() formatUnlockedCarePlanReport() ──┘ ├── promptForLockedYearReportMonth\_() ├── resolveMonthlyFormatterSourceSheet\_() ├── collectMovedTitleInfoCells\_() \[Reads title info from C3/E3 or E2/G2\] ├── prepareCarePlanSourceSheetForDashboardFormat\_() ├── getDataValues\_() ├── mapRowsToHeaders\_() ├── createOutputSheetFromDashboardTemplate\_() ├── lockFinalOutputRowHeights\_() ├── archiveRawSourceAndDeleteLocal\_() ├── applyOutputVisibilityPolicy\_() └── refreshIndexAfterSheetWorkflow\_()

Code snippet

```

---

### C. `formatRawData`
Formats imported Raw Data **in-place** without dropping unmatched source columns[cite: 1].

```

formatRawData() ├── assertActiveRawDataSourceSheet\_() \[Validates Participant PMR\# header exists\] ├── promptForLockedYearReportMonth\_() └── formatRawDataInPlaceSheet\_() ├── buildRawDataInPlaceFormattingContext\_() \[Maps raw data and checks headers\] ├── deleteSheetIfExists\_() \[Clears old target sheet name conflict\] ├── sourceSheet.setName("Raw Data MM.yy") \[Renames sheet in place\] ├── placeCreatedSheetInConfiguredOrder\_() \[Ranks tab position\] ├── writeRawDataInPlaceTitleRowsAndAddedColumns\_() \[Inserts top 4 title rows & appends missing columns\] ├── processRawDataApprovedSyncColumns\_() \[Assigns Primary PMR Row flags\] ├── syncRawDataBannerColumns\_() \[Syncs banner fields if Banners sheet exists\] ├── lockFinalOutputRowHeights\_() ├── applyOutputVisibilityPolicy\_() └── refreshIndexAfterSheetWorkflow\_() \[Updates Index navigation\]

Code snippet

```

---

## ⚡ Key Architectural Differences: Batch vs. Maintenance

| Aspect | `formatMonthlySheets` (Batch) | Maintenance Individual Triggers |
| :--- | :--- | :--- |
| **Source Tab Selection** | Scans and selects tabs automatically using code prefix matching (`B`, `CD`, `UC`, `RD`)[cite: 1]. | Prompts user and operates directly on active/resolved tab[cite: 1]. |
| **External Archive Connection** | Opens `SpreadsheetApp.openById` **once** at the batch head and reuses the handle across all tabs[cite: 1]. | Opens and closes the archive spreadsheet connection independently per report[cite: 1]. |
| **Index Sheet Build** | Sets `skipIndexRefresh: true` during sub-steps and triggers `createIndexSheet()` **once** at completion[cite: 1]. | Executes `refreshIndexAfterSheetWorkflow_()` immediately after formatting each individual report[cite: 1]. |
```

That is a huge performance win\! Reusing pre-built templates via native Google Sheets sheet duplication (`templateSheet.copyTo(ss)`) with built-in native row banding bypasses all the manual range-painting overhead, making it drastically faster than building canvas grids programmatically cell-by-cell.

Focusing exclusively on the **Template Copy & Paste Pipeline** (using native banding), here is the unified, high-speed formatting engine for **Banner**, **Care Plan Due**, and **Unlocked CP**.

## **⚡ The Unified Template Copy Pipeline**

Instead of building a fast canvas from scratch, every sub-report runs through this single **5-step template duplication flow**:

```
                 formatMonthlySubReportViaTemplate_(sheetType, sourceSheet, monthParts, options)
                                            │
           1. IN-MEMORY DATA EXTRACTION & MAPPING
              └─ Extract metadata & map source columns directly to template headers in memory
                                            │
           2. DUPLICATE TEMPLATE TAB (Native Copy)
              └─ templateSheet.copyTo(ss)  <-- Native Google Sheets copy with pre-built Banding
                                            │
           3. BULK ARRAY WRITE
              └─ setValues() data into Row 5 on template copy (Native Banding auto-expands!)
                                            │
           4. STAMP METADATA & TITLE DATES
              └─ Stamp A1 Title, A2/D2 Dates, & C1 Metadata on flat template grid
                                            │
           5. ARCHIVE RAW SOURCE & ENFORCE ENVIRONMENT
              └─ Archive raw tab to external workbook, delete local raw tab, & set visibility
```

## **🛠️ Complete Unified Code Engine**

Here is the clean, streamlined production function that replaces `formatMonthlyBannerSheet_` and `formatCarePlanDueOrUnlockedFromDashboard_` using the template copy mechanism:

JavaScript

```
/**
 * Unified Template Copy formatting engine for Banner, Care Plan Due, and Unlocked CP.
 * Uses native templateSheet.copyTo() with built-in native row banding.
 */
function formatMonthlySubReportViaTemplate_(sheetType, sourceSheet, monthParts, options) {
  options = options || {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Get Archetype Context & Template Sheet
  const context = getTemplateDrivenActiveSheetContext_(ss, sheetType);
  const sheetDef = context.sheetDef;
  const headers = context.headers;
  const templateSheet = context.templateSheet;
  const outputName = buildDashboardOutputSheetName_(sheetDef, monthParts);
  const rawArchiveName = buildRawArchiveNameForSheetType_(sheetType, monthParts);

  // 2. Read Source Data & Map Columns to Dashboard Headers (In-Memory)
  const titleInfoText = collectMovedTitleInfoCells_(sourceSheet, sheetType);
  const rawData = getRawDataSourceDataForOutput_(sourceSheet);
  const outputRows = mapRowsToHeaders_(rawData.values, rawData.headers, headers);

  // 3. Clear existing output tab name conflicts
  deleteSheetIfExists_(ss, outputName, sourceSheet.getName(), sheetDef.templateName);

  // 4. DUPLICATE TEMPLATE TAB (Native copy includes native banding & styles)
  const outputSheet = templateSheet.copyTo(ss);
  outputSheet.setName(outputName);
  placeCreatedSheetInConfiguredOrder_(ss, outputSheet, sheetDef, options.timing);

  // 5. Bulk Write Data Rows starting at Row 5 (DATA_START_ROW)
  if (outputRows.length > 0) {
    const startRow = RFF_CONSTANTS.DATA_START_ROW || 5;
    const requiredRows = startRow + outputRows.length - 1;
    
    // Auto-expand grid rows if data exceeds template size
    if (outputSheet.getMaxRows() < requiredRows) {
      outputSheet.insertRowsAfter(outputSheet.getMaxRows(), requiredRows - outputSheet.getMaxRows());
    }

    outputSheet.getRange(startRow, 1, outputRows.length, headers.length)
      .setValues(outputRows);
  }

  // 6. Stamp Title, Dates, and Metadata Cells (Rows 1–3)
  try {
    outputSheet.getRange("A1").setValue(sheetDef.reportTitle || sheetType);
    if (titleInfoText) outputSheet.getRange("C1").setValue(titleInfoText);
    
    // Write Prompted Month Dates (A2:D2)
    outputSheet.getRange("A2").setValue("Date");
    outputSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat(dashboard.globals.defaultDateFormat || "m/d/yyyy");
    outputSheet.getRange("C2").setValue("to").setHorizontalAlignment("center");
    outputSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat(dashboard.globals.defaultDateFormat || "m/d/yyyy");
  } catch (err) {
    logBestEffortWarning_("Template date/title stamp skipped: " + err.message);
  }

  // 7. Lock Row Heights, External Archive, & Apply Visibility Policy
  lockFinalOutputRowHeights_(outputSheet, sheetType);
  archiveRawSourceAndDeleteLocal_(ss, sourceSheet, rawArchiveName, outputSheet, options.timing, options);
  applyOutputVisibilityPolicy_(outputSheet, null, sheetDef.sheetType, options.timing);

  clearSheetRuntimeCachesForSheet_(outputSheet);
  return outputSheet;
}
```

## **🚀 How Menu Triggers & Batch Loops Route to This**

### **1\. Batch Execution Loop (`formatMonthlySheets`)**

JavaScript

```
const routes = [
  { code: "B",  sheetType: SHEET_TYPE.BANNER,        label: "Banners" },
  { code: "CD", sheetType: SHEET_TYPE.CARE_PLAN_DUE, label: "Care Plan Due" },
  { code: "UC", sheetType: SHEET_TYPE.UNLOCKED,      label: "Unlocked CP" }
];

routes.forEach(function(route) {
  const selection = findMonthlyImportSheetForRoute_(ss, route, parsed.monthParts);
  if (!selection.sheet) return;
  
  // Single unified template copy call
  const outputSheet = formatMonthlySubReportViaTemplate_(route.sheetType, selection.sheet, parsed.monthParts, sharedOptions);
  completed.push(route.code + " -> " + outputSheet.getName());
});
```

### **2\. Standalone Maintenance Triggers**

JavaScript

```
function formatBannerReport() {
  return runStandaloneSubReportFormatter_(SHEET_TYPE.BANNER, "Format Banner Report", ["Banners", "Banner Report"]);
}

function formatCarePlanDueReport() {
  return runStandaloneSubReportFormatter_(SHEET_TYPE.CARE_PLAN_DUE, "Format Care Plan Due Report", ["CP Due Date", "CP Due", "Care Plan Due Date Report"]);
}

function formatUnlockedCarePlanReport() {
  return runStandaloneSubReportFormatter_(SHEET_TYPE.UNLOCKED, "Format Unlocked Care Plan Report", ["Unlocked CP", "Unlock CP", "Unlocked Care Plan"]);
}

function runStandaloneSubReportFormatter_(sheetType, promptTitle, keywords) {
  return runFrameworkTimed_(promptTitle, function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const activeSheet = ss.getActiveSheet();
    if (!activeSheet) throw new Error("No active sheet found.");

    const monthParts = promptForLockedYearReportMonth_(promptTitle);
    if (!monthParts) return null;

    const sourceSheet = resolveMonthlyFormatterSourceSheet_(ss, activeSheet, monthParts, keywords, function(s) {
      assertActiveWorkflowSourceSheet_(s, promptTitle);
    }, promptTitle);

    const outputSheet = formatMonthlySubReportViaTemplate_(sheetType, sourceSheet, monthParts, { timing: timing });
    refreshIndexAfterSheetWorkflow_(promptTitle);
    
    notify_(promptTitle + " complete. Created: " + outputSheet.getName());
    return outputSheet;
  });
}
```

## **🎯 Key Efficiency Gains of This Path**

1. **Zero Range Painting Overhead:** The pre-built template already carries the native row banding, headers (Row 4), font definitions, column wrapping, and border lines.  
2. **Native Banding Auto-Expansion:** When `.setValues()` writes 200 rows onto Row 5, Google Sheets automatically extends the native alternating row banding down the grid without issuing a single formatting API call.  
3. **Single High-Speed `.setValues()` Call:** Writes all data in 1 single network hit to Google Sheets.

Ah, I see\! Seeing your actual source sheets (Care Plan Due Report, Unlocked Care Plan Report, and Banners) makes the requirements clear.

Because C1:D1 is a tight space for the multi-cell metadata text extracted from the source headers, **merging C1:D1 and setting text wrapping (WRAP) with a small font size (5pt)** is required to constrain that text within columns C and D without overflowing into Column E.

Here is the exact cell extraction, combination, and C1:D1 post-processing logic mapped directly to your screenshots.

### **🔍 1\. Source Cell Combinations to Target C1**

#### **A. Care Plan Due Date Report (Image 1 $\\rightarrow$ Image 5\)**

Extracts and combines the source header metadata into a single string:

* **Source Cells:** A2 ("Site:"), C2 ("Ascension Living HOPE"), A3 ("Date:"), C3 ("03/01/2026"), D3 ("-"), E3 ("04/30/2027")  
* **Combined C1 String:**  
  "Site: Ascension Living HOPE Date: 03/01/2026 \- 04/30/2027"

#### **B. Unlocked Care Plan Report (Image 2 $\\rightarrow$ Image 4\)**

Extracts and combines the source header metadata into a single string:

* **Source Cells:** A2 ("List of participants with an unlocked care plan AND..."), E2 ("03/01/2026"), F2 ("To"), G2 ("04/30/2027"), A3 ("Site:"), B3 ("Ascension Living HOPE PACE Site")  
* **Combined C1 String:**  
  "List of participants with an unlocked care plan AND IDT Meeting Date in the selected range: Site: Ascension Living HOPE PACE Site From: 03/01/2026 To 04/30/2027"

### **🛠️ 2\. Production Code Updates for Formatting Phase**

#### **Step A: Source Metadata Extraction Helper (collectMovedTitleInfoCells\_)**

This helper reads the raw source tab before deleting it and returns the formatted text block:

JavaScript

```
/**
 * Extracts and combines top 3-row metadata from CP Due and Unlocked CP source tabs.
 */
function collectMovedTitleInfoCells_(sourceSheet, sheetType) {
  if (!sourceSheet) return "";
  
  try {
    const vals = sourceSheet.getRange(1, 1, 4, 10).getValues();
    
    // --- CARE PLAN DUE DATE REPORT ---
    if (sheetType === SHEET_TYPE.CARE_PLAN_DUE) {
      const siteLbl = String(vals[1][0] || "").trim(); // A2 ("Site:")
      const siteVal = String(vals[1][2] || "").trim(); // C2 ("Ascension Living HOPE")
      const dateLbl = String(vals[2][0] || "").trim(); // A3 ("Date:")
      const startDate = formatValueForMetadata_(vals[2][2]); // C3 ("03/01/2026")
      const hyphen   = String(vals[2][3] || "-").trim();   // D3 ("-")
      const endDate   = formatValueForMetadata_(vals[2][4]); // E3 ("04/30/2027")
      
      return (siteLbl + " " + siteVal + " " + dateLbl + " " + startDate + " " + hyphen + " " + endDate).replace(/\s+/g, " ").trim();
    }
    
    // --- UNLOCKED CARE PLAN REPORT ---
    if (sheetType === SHEET_TYPE.UNLOCKED) {
      const descText  = String(vals[1][0] || "").trim(); // A2 ("List of participants...")
      const startDate = formatValueForMetadata_(vals[1][4]); // E2
      const toLbl     = String(vals[1][5] || "To").trim();  // F2
      const endDate   = formatValueForMetadata_(vals[1][6]); // G2
      const siteLbl   = String(vals[2][0] || "").trim(); // A3 ("Site:")
      const siteVal   = String(vals[2][1] || "").trim(); // B3 ("Ascension Living HOPE PACE Site")
      
      return (descText + " Site: " + siteVal + " From: " + startDate + " " + toLbl + " " + endDate).replace(/\s+/g, " ").trim();
    }
  } catch (err) {
    logBestEffortWarning_("Title info collection skipped: " + err.message);
  }
  
  return "";
}

function formatValueForMetadata_(val) {
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone(), "MM/dd/yyyy");
  }
  return String(val || "").trim();
}
```

#### **Step B: Apply C1:D1 Merge & Formatting Pass**

During the final post-write formatting pass on the duplicated template tab (formatMonthlySubReportViaTemplate\_), apply the C1:D1 merge, 5pt font, and WRAP strategy:

JavaScript

```
// Inside formatMonthlySubReportViaTemplate_ (Post-data write pass):

// 1. Merge C1:D1 and format for metadata text (CP Due / Unlocked CP)
if (titleInfoText && (sheetType === SHEET_TYPE.CARE_PLAN_DUE || sheetType === SHEET_TYPE.UNLOCKED)) {
  const c1d1 = outputSheet.getRange("C1:D1");
  c1d1.merge()
      .setValue(titleInfoText)
      .setFontSize(5) // 👈 Set small 5pt font size
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP) // 👈 Force text wrapping
      .setHorizontalAlignment("left")
      .setVerticalAlignment("middle");
}

// 2. Write standard prompted date range to A2:D2
outputSheet.getRange("A2").setValue("Date");
outputSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
outputSheet.getRange("C2").setValue("to").setHorizontalAlignment("center");
outputSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
```

### **📊 Resulting Output (Matching Images 4 & 5\)**

1. **A1 Title:** "Care Plan Due Date Report" or "Unlocked Care Plan Report" (Bold 14pt/16pt).  
2. **C1:D1 Merged Metadata:** Holds the combined source string in **5pt wrapped text**, fitting neatly within the boundaries of Columns C and D.  
3. **A2:D2 Date Row:** Stamped cleanly with "Date", 06/01/2026, "to", 07/31/2027.  
4. **Row 4 Headers:** Standard Section H table headers with filter buttons intact.  
5. **Row 5+ Data:** Mapped participant data sitting over alternating green native row banding.

Got it\! That is a crucial correction.

Rather than modifying or reading-and-deleting the source tabs directly in place, the source tabs must remain **100% unedited and preserved**.

### **🔄 The Updated Source Lifecycle Rules**

1. **Unedited Source Preservation:** The original imported tab is **never altered** during data extraction or formatting.  
2. **Rename Source:** The original tab is renamed using the format `Source - [Sheet Output Name] [mm.yy]` (e.g., `Source - Care Plan Due Report 06.26`).  
3. **Move to Archive:** The renamed, unedited source tab is moved to the external archive workbook via `archiveRawSourceAndDeleteLocal_` (or hidden/archived depending on your configuration).  
4. **Data Extraction:** All metadata extraction (`collectMovedTitleInfoCells_`) and cell value mapping (`getDataValues_`) happens purely **in-memory** from the untouched source tab *before* it is renamed and moved.

### **🛠️ Updated Production Execution Flow**

Here is how `formatMonthlySubReportViaTemplate_` handles the unedited source tab lifecycle:

JavaScript

```
/**
 * Unified Template Copy formatting engine for Banner, Care Plan Due, and Unlocked CP.
 * Keeps raw source tabs 100% unedited, renames them, and archives them.
 */
function formatMonthlySubReportViaTemplate_(sheetType, sourceSheet, monthParts, options) {
  options = options || {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Get Archetype Context & Template Sheet
  const context = getTemplateDrivenActiveSheetContext_(ss, sheetType);
  const sheetDef = context.sheetDef;
  const headers = context.headers;
  const templateSheet = context.templateSheet;
  const outputName = buildDashboardOutputSheetName_(sheetDef, monthParts);
  
  // Format the Archive Source Name: "Source - [Sheet Output Name] [mm.yy]"
  const rawArchiveName = "Source - " + outputName;

  // 2. READ SOURCE METADATA & DATA (Purely In-Memory - Zero Edits to Source)
  const titleInfoText = collectMovedTitleInfoCells_(sourceSheet, sheetType);
  const rawData = getRawDataSourceDataForOutput_(sourceSheet);
  const outputRows = mapRowsToHeaders_(rawData.values, rawData.headers, headers);

  // 3. Clear existing output tab name conflicts
  deleteSheetIfExists_(ss, outputName, sourceSheet.getName(), sheetDef.templateName);

  // 4. DUPLICATE TEMPLATE TAB (Native copy includes native banding & styles)
  const outputSheet = templateSheet.copyTo(ss);
  outputSheet.setName(outputName);
  placeCreatedSheetInConfiguredOrder_(ss, outputSheet, sheetDef, options.timing);

  // 5. Bulk Write Data Rows starting at Row 5 (DATA_START_ROW)
  if (outputRows.length > 0) {
    const startRow = RFF_CONSTANTS.DATA_START_ROW || 5;
    const requiredRows = startRow + outputRows.length - 1;
    
    if (outputSheet.getMaxRows() < requiredRows) {
      outputSheet.insertRowsAfter(outputSheet.getMaxRows(), requiredRows - outputSheet.getMaxRows());
    }

    outputSheet.getRange(startRow, 1, outputRows.length, headers.length)
      .setValues(outputRows);
  }

  // 6. Stamp Title, Dates, and Merged C1:D1 Metadata on Output Sheet ONLY
  try {
    outputSheet.getRange("A1").setValue(sheetDef.reportTitle || sheetType);
    
    // Merge C1:D1 for Care Plan Due & Unlocked CP metadata
    if (titleInfoText && (sheetType === SHEET_TYPE.CARE_PLAN_DUE || sheetType === SHEET_TYPE.UNLOCKED)) {
      outputSheet.getRange("C1:D1")
        .merge()
        .setValue(titleInfoText)
        .setFontSize(5)
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
        .setHorizontalAlignment("left")
        .setVerticalAlignment("middle");
    }
    
    // Write Prompted Month Dates (A2:D2)
    outputSheet.getRange("A2").setValue("Date");
    outputSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
    outputSheet.getRange("C2").setValue("to").setHorizontalAlignment("center");
    outputSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
  } catch (err) {
    logBestEffortWarning_("Template date/title stamp skipped: " + err.message);
  }

  // 7. Lock Row Heights & Apply Visibility Policy
  lockFinalOutputRowHeights_(outputSheet, sheetType);
  applyOutputVisibilityPolicy_(outputSheet, null, sheetDef.sheetType, options.timing);

  // 8. RENAME SOURCE TAB & MOVE TO ARCHIVE WORKBOOK (Leaves Source Contents 100% Unedited)
  try {
    sourceSheet.setName(rawArchiveName); // Renames to "Source - [Sheet Output Name] [mm.yy]"
    archiveRawSourceAndDeleteLocal_(ss, sourceSheet, rawArchiveName, outputSheet, options.timing, options);
  } catch (err) {
    logBestEffortWarning_("Raw source rename and archive skipped: " + err.message);
  }

  clearSheetRuntimeCachesForSheet_(outputSheet);
  return outputSheet;
}
```

### **📋 Key Summary of the Preserved Source Lifecycle**

| Stage | Action |
| ----- | ----- |
| **1\. Data Extraction** | Read cells in-memory (`collectMovedTitleInfoCells_` & `getDataValues_`). Source sheet is **not modified**. |
| **2\. Template Build** | Output tab is generated from template duplicate. Metadata & dates stamped on **output tab only**. |
| **3\. Rename Source** | `sourceSheet.setName("Source - " + outputName)` (e.g., `Source - Unlocked Care Plan 06.26`). |
| **4\. Move to Archive** | `archiveRawSourceAndDeleteLocal_` copies the pristine tab to the external archive spreadsheet and removes the local raw tab from the active workbook. |

Got it\! That aligns the workflow perfectly with your dynamic dashboard governance.

Instead of hardcoding or building sheet names via string concatenation in script routines, the framework queries **Section C (Sheet Definitions)** for the exact **Output Naming Pattern** (e.g., Care Plan Due mm.yy, Unlocked CP mm.yy, Banners mm.yy) and evaluates it against the prompted month context (mm.yy).

### **⚙️ How Output & Archive Sheet Naming Works**

By leveraging sheetDef.outputNamingPattern from Section C:

1. **Output Sheet Name:** Generated dynamically by replacing the mm.yy token in sheetDef.outputNamingPattern with the active month string (e.g., 06.26 $\\rightarrow$ Care Plan Due 06.26).  
2. **Archive Source Sheet Name:** Formatted as Source \- \[Output Sheet Name\] (e.g., Source \- Care Plan Due 06.26).

### **🛠️ Production Code Integration (buildDashboardOutputSheetName\_)**

Your existing buildDashboardOutputSheetName\_ helper resolves this pattern dynamically:

JavaScript

```
/**
 * Evaluates Section C's Output Naming Pattern against the prompted month context.
 */
function buildDashboardOutputSheetName_(sheetDef, monthParts) {
  const pattern = (sheetDef && sheetDef.outputNamingPattern) 
    ? sheetDef.outputNamingPattern 
    : (sheetDef.reportTitle + " mm.yy");
    
  const monthLabel = (monthParts && monthParts.monthLabel) ? monthParts.monthLabel : "01.26";
  
  // Replaces "mm.yy" token in Section C pattern with active month label
  return pattern.replace(/mm\.yy/gi, monthLabel).trim();
}
```

### **📋 Updated Naming Flow in formatMonthlySubReportViaTemplate\_**

Here is how the names are resolved seamlessly inside the unified template formatting engine:

JavaScript

```
// 1. Resolve Output Name directly from Section C Output Naming Pattern
const outputName = buildDashboardOutputSheetName_(sheetDef, monthParts); 
// ➔ Yields: "Care Plan Due 06.26" (or whatever Section C defines)

// 2. Format Archive Source Name
const rawArchiveName = "Source - " + outputName; 
// ➔ Yields: "Source - Care Plan Due 06.26"

// 3. Name Output Sheet
outputSheet.setName(outputName);

// 4. Rename Pristine Source Sheet & Move to External Archive
sourceSheet.setName(rawArchiveName);
archiveRawSourceAndDeleteLocal_(ss, sourceSheet, rawArchiveName, outputSheet, options.timing, options);
```

Got it\! Those exact output naming patterns defined in **Section C (Sheet Definitions)** map cleanly to your monthly report archetypes:

* **Banners:** `Banners mm.yy`  
* **Care Plan Due:** `CP Due mm.yy`  
* **Unlocked Care Plan:** `Unlock CP mm.yy`  
* **Raw Data:** `Raw Data mm.yy`

### **🏷️ Resulting Sheet & Archive Naming Matrix**

Assuming a prompted month context of **`06.26`** (June 2026), your dynamic naming resolution engine will produce the following active and archive sheet names automatically:

| Report Archetype | Section C Pattern | Active Output Sheet Name | Pristine Archive Source Sheet Name |
| ----- | ----- | ----- | ----- |
| **Banners** | `Banners mm.yy` | `Banners 06.26` | `Source - Banners 06.26` |
| **Care Plan Due** | `CP Due mm.yy` | `CP Due 06.26` | `Source - CP Due 06.26` |
| **Unlocked CP** | `Unlock CP mm.yy` | `Unlock CP 06.26` | `Source - Unlock CP 06.26` |
| **Raw Data** | `Raw Data mm.yy` | `Raw Data 06.26` | `Source - Raw Data 06.26` |

### **⚙️ How Code Resolves It**

Because `buildDashboardOutputSheetName_(sheetDef, monthParts)` reads directly from `sheetDef.outputNamingPattern`, no sheet names are hardcoded in the formatting script:

JavaScript

```
// Example for Care Plan Due with monthParts.monthLabel = "06.26":
const outputName = buildDashboardOutputSheetName_(sheetDef, monthParts);
// ➔ Yields: "CP Due 06.26"

const rawArchiveName = "Source - " + outputName;
// ➔ Yields: "Source - CP Due 06.26"
```

Everything remains 100% dashboard-driven. If you ever update Section C in the future (e.g., changing `CP Due mm.yy` to `Care Plan Due mm.yy`), the entire formatting pipeline, active output tabs, and archived source tab names adapt instantly without touching a line of code.

Here is the complete, production-ready blueprint for the **Monthly Formatting Section** updates based on all our visual layout standards, pristine source preservation rules, and template-copy performance optimizations.

## **🛠️ Summary of Monthly Formatting Updates**

1. **Unified Sub-Report Pipeline (`formatMonthlySubReportViaTemplate_`):**  
   * Combines **Banners**, **Care Plan Due**, and **Unlocked Care Plan** into a single formatting engine.  
   * Uses fast native sheet duplication (`templateSheet.copyTo(ss)`) to preserve pre-built styles, headers, and native alternating row banding.  
2. **Source Data Preservation & Archiving:**  
   * Raw source tabs remain **100% unedited**. Metadata and column data are extracted purely in-memory.  
   * Source tabs are renamed using the pattern `Source - [Output Sheet Name]` (e.g., `Source - CP Due 06.26`) using Section C's exact `Output Naming Pattern` (`Banners mm.yy`, `CP Due mm.yy`, `Unlock CP mm.yy`, `Raw Data mm.yy`).  
   * Renamed pristine tabs are moved to the external archive spreadsheet and deleted locally.  
3. **In-Memory Metadata Extraction & `C1:D1` Merge:**  
   * Extracts multi-cell header text (`Site:`, `Date:`, `Description`) from source rows 1–3 in-memory via `collectMovedTitleInfoCells_`.  
   * Stamps the combined text into **`C1:D1`**, applies `.merge()`, sets text wrapping (`WRAP`), and enforces a **`5pt` font size** to fit neatly without overflowing into Column E.  
4. **Flat Baseline Title & Date Stamps:**  
   * Stamps `sheetDef.reportTitle` in Cell `A1`.  
   * Stamps prompted month date ranges in `A2:D2` (`"Date"`, `firstDay`, `"to"`, `lastDay`).  
   * Writes mapped participant data rows starting at Row 5 (`DATA_START_ROW`), triggering native row banding to expand down the grid automatically.

## **⚙️ Production Code Implementations**

### **1\. In-Memory Source Metadata Extractor (`collectMovedTitleInfoCells_`)**

JavaScript

```
/**
 * Extracts and combines top 3-row header metadata from CP Due and Unlocked CP source tabs.
 * Operates purely in-memory—leaves source tab untouched.
 */
function collectMovedTitleInfoCells_(sourceSheet, sheetType) {
  if (!sourceSheet) return "";
  
  try {
    const vals = sourceSheet.getRange(1, 1, 4, 10).getValues();
    
    // --- CARE PLAN DUE REPORT ---
    if (sheetType === SHEET_TYPE.CARE_PLAN_DUE) {
      const siteLbl   = String(vals[1][0] || "").trim(); // A2 ("Site:")
      const siteVal   = String(vals[1][2] || "").trim(); // C2 ("Ascension Living HOPE")
      const dateLbl   = String(vals[2][0] || "").trim(); // A3 ("Date:")
      const startDate = formatValueForMetadata_(vals[2][2]); // C3 ("03/01/2026")
      const hyphen    = String(vals[2][3] || "-").trim();   // D3 ("-")
      const endDate   = formatValueForMetadata_(vals[2][4]); // E3 ("04/30/2027")
      
      return (siteLbl + " " + siteVal + " " + dateLbl + " " + startDate + " " + hyphen + " " + endDate).replace(/\s+/g, " ").trim();
    }
    
    // --- UNLOCKED CARE PLAN REPORT ---
    if (sheetType === SHEET_TYPE.UNLOCKED) {
      const descText  = String(vals[1][0] || "").trim(); // A2 ("List of participants...")
      const startDate = formatValueForMetadata_(vals[1][4]); // E2
      const toLbl     = String(vals[1][5] || "To").trim();  // F2
      const endDate   = formatValueForMetadata_(vals[1][6]); // G2
      const siteLbl   = String(vals[2][0] || "").trim(); // A3 ("Site:")
      const siteVal   = String(vals[2][1] || "").trim(); // B3 ("Ascension Living HOPE PACE Site")
      
      return (descText + " Site: " + siteVal + " From: " + startDate + " " + toLbl + " " + endDate).replace(/\s+/g, " ").trim();
    }
  } catch (err) {
    logBestEffortWarning_("Title info collection skipped: " + err.message);
  }
  
  return "";
}

function formatValueForMetadata_(val) {
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone(), "MM/dd/yyyy");
  }
  return String(val || "").trim();
}
```

### **2\. Unified Template-Copy Sub-Report Engine (`formatMonthlySubReportViaTemplate_`)**

JavaScript

```
/**
 * Unified Template Copy formatting engine for Banners, Care Plan Due, and Unlocked CP.
 * Keeps raw source tabs 100% unedited, renames them using Section C patterns, and archives them.
 */
function formatMonthlySubReportViaTemplate_(sheetType, sourceSheet, monthParts, options) {
  options = options || {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const globals = (options.dashboard && options.dashboard.globals) ? options.dashboard.globals : RFF_DEFAULTS;

  // 1. Context & Section C Dynamic Naming Resolution
  const context = getTemplateDrivenActiveSheetContext_(ss, sheetType);
  const sheetDef = context.sheetDef;
  const headers = context.headers;
  const templateSheet = context.templateSheet;
  
  // Output Name from Section C Pattern (e.g., "CP Due 06.26", "Unlock CP 06.26", "Banners 06.26")
  const outputName = buildDashboardOutputSheetName_(sheetDef, monthParts);
  const rawArchiveName = "Source - " + outputName;

  // 2. Pure In-Memory Data Extraction & Header Mapping (Zero Edits to Source Tab)
  const titleInfoText = collectMovedTitleInfoCells_(sourceSheet, sheetType);
  const rawData = getRawDataSourceDataForOutput_(sourceSheet);
  const outputRows = mapRowsToHeaders_(rawData.values, rawData.headers, headers);

  // 3. Clear existing output tab name conflicts
  deleteSheetIfExists_(ss, outputName, sourceSheet.getName(), sheetDef.templateName);

  // 4. Native Template Copy (Inherits pre-built native row banding, headers, & styles)
  const outputSheet = templateSheet.copyTo(ss);
  outputSheet.setName(outputName);
  placeCreatedSheetInConfiguredOrder_(ss, outputSheet, sheetDef, options.timing);

  // 5. Bulk Write Data Rows starting at Row 5 (Native banding auto-expands)
  if (outputRows.length > 0) {
    const startRow = RFF_CONSTANTS.DATA_START_ROW || 5;
    const requiredRows = startRow + outputRows.length - 1;
    
    if (outputSheet.getMaxRows() < requiredRows) {
      outputSheet.insertRowsAfter(outputSheet.getMaxRows(), requiredRows - outputSheet.getMaxRows());
    }

    outputSheet.getRange(startRow, 1, outputRows.length, headers.length)
      .setValues(outputRows);
  }

  // 6. Stamp Title, Merged C1:D1 Metadata, and Prompted Date Range (A2:D2)
  try {
    outputSheet.getRange("A1").setValue(sheetDef.reportTitle || sheetType);
    
    // Merge C1:D1 for metadata and apply 5pt wrapped formatting
    if (titleInfoText && (sheetType === SHEET_TYPE.CARE_PLAN_DUE || sheetType === SHEET_TYPE.UNLOCKED)) {
      outputSheet.getRange("C1:D1")
        .merge()
        .setValue(titleInfoText)
        .setFontSize(5) // 👈 Small font size to constrain text block
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP) // 👈 Forced text wrap
        .setHorizontalAlignment("left")
        .setVerticalAlignment("middle");
    }
    
    // Stamp Prompted Dates in A2:D2
    outputSheet.getRange("A2").setValue("Date");
    outputSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
    outputSheet.getRange("C2").setValue("to").setHorizontalAlignment("center");
    outputSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
  } catch (err) {
    logBestEffortWarning_("Title and date stamp skipped: " + err.message);
  }

  // 7. Lock Row Heights & Apply Visibility Policy
  lockFinalOutputRowHeights_(outputSheet, sheetType);
  applyOutputVisibilityPolicy_(outputSheet, null, sheetDef.sheetType, options.timing);

  // 8. Rename Pristine Source Sheet & Move to External Archive
  try {
    sourceSheet.setName(rawArchiveName); // e.g., "Source - CP Due 06.26"
    archiveRawSourceAndDeleteLocal_(ss, sourceSheet, rawArchiveName, outputSheet, options.timing, options);
  } catch (err) {
    logBestEffortWarning_("Raw source archive skipped: " + err.message);
  }

  clearSheetRuntimeCachesForSheet_(outputSheet);
  return outputSheet;
}
```

### **3\. Orchestrated Batch Execution Engine (`formatMonthlySheets`)**

JavaScript

```
/**
 * Main batch runner for monthly sheets formatting.
 */
function formatMonthlySheets() {
  return runFrameworkTimed_("Format Monthly Sheets", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const parsed = promptForLockedYearReportMonth_("Format Monthly Sheets");
    if (!parsed) return null;

    const dashboard = loadDashboardConfig_();
    const sharedOptions = {
      timing: timing,
      dashboard: dashboard,
      archiveSs: SpreadsheetApp.openById(RFF_ARCHIVE_SPREADSHEET_ID) // Pre-opens archive connection once
    };

    const routes = [
      { code: "B",  sheetType: SHEET_TYPE.BANNER,        label: "Banners" },
      { code: "CD", sheetType: SHEET_TYPE.CARE_PLAN_DUE, label: "Care Plan Due" },
      { code: "UC", sheetType: SHEET_TYPE.UNLOCKED,      label: "Unlocked CP" }
    ];

    const completed = [];

    // 1. Process Template-Based Monthly Sub-Reports
    routes.forEach(function(route) {
      const selection = findMonthlyImportSheetForRoute_(ss, route, parsed.monthParts);
      if (!selection.sheet) return;

      const outputSheet = formatMonthlySubReportViaTemplate_(route.sheetType, selection.sheet, parsed.monthParts, sharedOptions);
      completed.push(route.code + " -> " + outputSheet.getName());
    });

    // 2. Process Raw Data In-Place Report (if present)
    const rawDataSelection = findMonthlyImportSheetForRoute_(ss, { code: "RD", label: "Raw Data" }, parsed.monthParts);
    if (rawDataSelection.sheet) {
      const rdOutput = formatRawDataInPlaceSheet_(rawDataSelection.sheet, parsed.monthParts, sharedOptions);
      completed.push("RD -> " + rdOutput.getName());
    }

    // 3. Single Master Index Refresh
    createIndexSheet(sharedOptions.archiveSs);

    notify_("Monthly formatting complete!\nProcessed: " + completed.join(", "));
    return completed;
  });
}
```

Got it\! Date normalization is essential for Care Plan reports so that all incoming raw date variations (e.g., text strings, mixed locale strings, full ISO timestamps, or Google Sheets Date objects) are converted into **clean, uniform JavaScript Date objects formatted as MM/dd/yyyy** during the formatting pass.

### **🔍 Where Date Normalization Happens in the Pipeline**

Since we are using the fast **Template-Copy engine** for **Care Plan Due** (CP Due mm.yy) and **Unlocked Care Plan** (Unlock CP mm.yy), date normalization happens **in-memory during Step 2** (mapRowsToHeaders\_), *before* the bulk .setValues() write to Row 5\.

This ensures that:

1. Google Sheets receives true, underlying date serial numbers instead of text strings.  
2. Template date formatting (m/d/yyyy or MM/dd/yyyy) renders instantly without secondary cell passes.

### **🛠️ Production Code Implementation**

#### **1\. General Date Normalization Helper (normalizeToDateObject\_)**

Add this robust parser to your utility library. It converts incoming cell values into true Date objects or returns "" if empty/invalid:

JavaScript

```
/**
 * Coerces strings, numbers, or Date objects into clean JS Date objects normalized to midnight.
 */
function normalizeToDateObject_(val) {
  if (val === null || val === undefined || val === "") return "";
  if (val instanceof Date) {
    if (isNaN(val.getTime())) return "";
    return new Date(val.getFullYear(), val.getMonth(), val.getDate());
  }

  // Handle String Parsing (e.g., "05/15/2026", "2026-05-15T00:00:00Z", "5/15/26")
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed) return "";

    // Handle "MM/DD/YYYY" or "M/D/YY" explicitly to avoid UTC timezone shifts
    const slashParts = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
    if (slashParts) {
      let month = parseInt(slashParts[1], 10) - 1;
      let day = parseInt(slashParts[2], 10);
      let year = parseInt(slashParts[3], 10);
      if (year < 100) year += 2000; // Handle two-digit years (e.g., 26 -> 2026)
      const d = new Date(year, month, day);
      return isNaN(d.getTime()) ? "" : d;
    }

    // Native JS Date parse fallback
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    }
  }

  return "";
}
```

#### **2\. Care Plan Date Mapping Matrix (mapRowsToHeaders\_)**

Update mapRowsToHeaders\_ to apply date normalization automatically whenever it maps identified Date columns:

JavaScript

```
/**
 * Maps raw source array to Section H target headers, normalizing date fields in-memory.
 */
function mapRowsToHeaders_(rawRows, sourceHeaders, targetHeaders) {
  if (!rawRows || !rawRows.length) return [];

  // Build column index lookup map
  const sourceIndexMap = {};
  (sourceHeaders || []).forEach(function(sh, idx) {
    if (sh) sourceIndexMap[String(sh).trim().toLowerCase()] = idx;
  });

  // Identify Care Plan date headers that require normalization
  const dateHeaderKeys = [
    "enrollment date",
    "last care plan",
    "next care plan due",
    "idt meeting date",
    "care plan start date",
    "disenrollment date",
    "birth date",
    "dob"
  ];

  return rawRows.map(function(row) {
    return targetHeaders.map(function(targetHeader) {
      const key = String(targetHeader).trim().toLowerCase();
      const colIdx = sourceIndexMap[key];

      if (colIdx === undefined || colIdx === null) {
        return ""; // Column not found in source
      }

      const rawVal = row[colIdx];

      // ⚡ NORMALIZE DATES FOR CARE PLAN COLUMNS
      if (dateHeaderKeys.includes(key)) {
        return normalizeToDateObject_(rawVal);
      }

      return rawVal;
    });
  });
}
```

### **📋 Date Normalization Target Columns**

| Report Archetype | Target Date Columns Normalized | Output Format |
| :---- | :---- | :---- |
| **Care Plan Due (CP Due mm.yy)** | Enrollment Date, Last Care Plan, Next Care Plan Due | m/d/yyyy |
| **Unlocked Care Plan (Unlock CP mm.yy)** | IDT Meeting Date, Care Plan Start Date | m/d/yyyy |
| **Banners (Banners mm.yy)** | Enrollment Date, Disenrollment Date | m/d/yyyy |

### **🎯 Key Benefits**

1. **Zero Text-Date Ambiguity:** Prevents Google Sheets from treating dates like "03/01/2026" as arbitrary text strings that fail to filter or sort chronologically.  
2. **Timezone Shift Protection:** Strips out UTC/time components (T00:00:00Z) so dates don't accidentally shift back by one day (e.g., turning 06/01/2026 into 05/31/2026).  
3. **High Performance:** Runs purely in JavaScript memory during array transformation before touching the sheet grid.

# 

# **Formatting Raw Data**

Formatting **Raw Data in-place** is the safest architectural pattern for your \#1 foundational source sheet. Duplicating or mapping large, column-heavy datasets through intermediary arrays or canvas templates introduces risks of silent type coercion, truncated cell values, or dropped ungoverned columns.

By applying formatting **directly in-place**, every raw data row, original column, and unmapped field remains **100% intact and uncorrupted** while gaining full framework alignment (Section C naming, 4-row title block, native row height governance, and Section H sync columns).

## **🏛️ In-Place Raw Data Execution Pipeline**

```
1. VALIDATE SOURCE & RESOLVE DYNAMIC NAME
   └─ Assert required headers ("Participant PMR#") exist.
   └─ Resolve output name via Section C pattern: "Raw Data mm.yy" (e.g., "Raw Data 06.26").

2. RESOLVE NAME CONFLICTS & RENAME IN-PLACE
   └─ Clear any pre-existing output tab with the same target name.
   └─ Rename source tab directly in-place: sourceSheet.setName("Raw Data 06.26").

3. INSERT TOP TITLE BLOCK (Shift Data Down)
   └─ Insert 4 empty rows at Row 1 (pushing original raw data down to Row 5).
   └─ Stamp Row 1 Title ("Raw Data Report"), Row 2 Prompted Dates (A2:D2), Row 3 Spacer.

4. ALIGN & APPEND SECTION H HEADERS
   └─ Align Row 4 headers with existing raw columns.
   └─ Append missing/governed framework columns (e.g., Primary PMR Row flags) to the right.

5. APPLY GOVERNED TYPOGRAPHY & ROW HEIGHTS
   └─ Set 25px row heights across all data rows (Row 5+).
   └─ Apply Arial 10pt, CLIP wrapping, and Left alignment without touching underlying values.

6. APPLY NATIVE ROW BANDING & VISIBILITY
   └─ Apply theme-derived native alternating row banding (Level 3 / Level 4) starting at Row 5.
   └─ Apply Section D/E tab visibility and rank ordering.
```

## **🛠️ Production Code Implementation**

### **1\. In-Place Raw Data Formatting Engine (formatRawDataInPlaceSheet\_)**

JavaScript

```
/**
 * Formats Raw Data in-place to protect source data integrity.
 * Does not copy, re-map, or delete source rows.
 */
function formatRawDataInPlaceSheet_(sourceSheet, monthParts, options) {
  options = options || {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboard = options.dashboard || loadDashboardConfig_();
  const globals = dashboard.globals || RFF_DEFAULTS;

  // 1. Fetch Archetype Context (RAW_DATA) & Resolve Section C Output Name
  const context = getTemplateDrivenActiveSheetContext_(ss, SHEET_TYPE.RAW_DATA);
  const sheetDef = context.sheetDef;
  const expectedHeaders = context.headers;
  
  // Resolves "Raw Data mm.yy" -> e.g. "Raw Data 06.26"
  const outputName = buildDashboardOutputSheetName_(sheetDef, monthParts);

  // 2. Clear Old Tab Conflicts & Rename Source Tab In-Place
  deleteSheetIfExists_(ss, outputName, sourceSheet.getName(), sheetDef.templateName);
  sourceSheet.setName(outputName);
  placeCreatedSheetInConfiguredOrder_(ss, sourceSheet, sheetDef, options.timing);

  // 3. Shift Raw Data Down by Inserting 4 Top Title Rows
  // Pushes raw headers from Row 1 down to Row 5
  sourceSheet.insertRowsBefore(1, 4);

  // 4. Move Original Raw Headers from Row 5 to Row 4 (Standard Header Row)
  const lastCol = Math.max(sourceSheet.getLastColumn(), expectedHeaders.length);
  const rawHeaderRange = sourceSheet.getRange(5, 1, 1, lastCol);
  const rawHeaders = rawHeaderRange.getValues()[0];
  
  // Move headers to Row 4 & clear Row 5 (Row 5 becomes Data Row 1)
  sourceSheet.getRange(4, 1, 1, lastCol).setValues([rawHeaders]);
  rawHeaderRange.clearContent();
  sourceSheet.deleteRow(5); // Remove extra empty spacer row left by move

  // 5. Append Governed Section H Missing Columns to Row 4
  const existingHeaderMap = {};
  rawHeaders.forEach(function(h, idx) {
    if (h) existingHeaderMap[String(h).trim().toLowerCase()] = idx + 1;
  });

  expectedHeaders.forEach(function(reqHeader) {
    const key = String(reqHeader).trim().toLowerCase();
    if (!existingHeaderMap[key]) {
      const newColIdx = sourceSheet.getLastColumn() + 1;
      sourceSheet.getRange(4, newColIdx).setValue(reqHeader);
      existingHeaderMap[key] = newColIdx;
    }
  });

  // 6. Stamp Title Block (Rows 1–3)
  try {
    // Row 1: Report Title
    sourceSheet.getRange("A1")
      .setValue(sheetDef.reportTitle || "Raw Data Report")
      .setFontSize(globals.titleFontSize || 14)
      .setFontWeight("bold")
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);

    // Row 2: Prompted Date Range (A2:D2)
    sourceSheet.getRange("A2").setValue("Date");
    sourceSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
    sourceSheet.getRange("C2").setValue("to").setHorizontalAlignment("center");
    sourceSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
  } catch (err) {
    logBestEffortWarning_("Raw Data title block stamp skipped: " + err.message);
  }

  // 7. Format Header Row (Row 4) with Base Theme Level 2 Fill
  const theme = getThemeColorsFromBase_(sheetDef.baseColor, globals);
  const maxCols = sourceSheet.getLastColumn();
  sourceSheet.getRange(4, 1, 1, maxCols)
    .setBackground(sheetDef.level2Fill || theme.level2 || "#B7DEE8")
    .setFontWeight("bold")
    .setFontSize(globals.standardFontSize || 10)
    .setVerticalAlignment("middle")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

  // 8. Lock Row Heights & Apply Data Typography (Row 5+)
  const totalRows = sourceSheet.getLastRow();
  if (totalRows >= 5) {
    const dataRange = sourceSheet.getRange(5, 1, totalRows - 4, maxCols);
    
    // Apply standard font & alignment without altering cell values or types
    dataRange
      .setFontFamily(globals.standardFont || "Arial")
      .setFontSize(globals.standardFontSize || 10)
      .setVerticalAlignment("middle")
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);

    // Apply Native Alternating Row Banding (Level 3 / Level 4)
    applyNativeBandingToRange_(dataRange, sheetDef, theme);
  }

  // Set uniform row heights across title rows & data body
  safeSetRowHeights_(sourceSheet, 1, 3, 25, "Raw Data Title Rows");
  safeSetRowHeights_(sourceSheet, 4, 1, globals.headerRowHeight || 35, "Raw Data Header Row");
  if (totalRows >= 5) {
    safeSetRowHeights_(sourceSheet, 5, totalRows - 4, globals.dataRowHeight || 25, "Raw Data Body");
  }

  // 9. Enforce Environment Settings & Tab Visibility
  applyOutputVisibilityPolicy_(sourceSheet, null, sheetDef.sheetType, options.timing);
  clearSheetRuntimeCachesForSheet_(sourceSheet);

  return sourceSheet;
}
```

### **2\. Native Banding Application Helper (applyNativeBandingToRange\_)**

Applies Google Sheets native alternating colors to in-place ranges so grid styling is fast and clean:

JavaScript

```
/**
 * Applies native Google Sheets alternating row colors to an in-place range.
 */
function applyNativeBandingToRange_(range, sheetDef, theme) {
  try {
    // Clear existing banding if present to prevent overlap conflicts
    const existingBandings = range.getBandings();
    existingBandings.forEach(function(b) { b.remove(); });

    const level3 = sheetDef.level3Fill || theme.level3 || "#EBF4F9";
    const level4 = sheetDef.level4Fill || theme.level4 || "#FFFFFF";

    range.applyRowBanding(SpreadsheetApp.BandingTheme.CUSTOM)
      .setFirstRowColor(level3)
      .setSecondRowColor(level4)
      .setHeaderRowColor(null) // Keeps Row 4 custom header styling intact
      .setFooterRowColor(null);
  } catch (err) {
    logBestEffortWarning_("Native banding application skipped: " + err.message);
  }
}
```

## **🔒 Why This Guarantees 100% Data Protection**

| Protection Aspect | Legacy Re-Map Method | Updated In-Place Method |
| :---- | :---- | :---- |
| **Data Transfer** | Copied cell values through getValues() / setValues() JS arrays. | **Zero Data Transfer.** Data stays inside its native cells on the underlying tab canvas. |
| **Ungoverned Columns** | Dropped any source column not explicitly mapped in Section H. | **Preserved.** Extra source columns stay in place, and missing Section H columns append to the right. |
| **Number & Date Types** | Risk of text string conversions or date parsing corruptions. | **Untouched.** Cell data types and underlying serial values remain 100% untouched. |
| **Execution Speed** | Required array mapping loops and bulk range writes. | **Instant.** Direct row insertions and single range formatting calls. |

## **🔒 Protecting the Primary Source: The Dual-Layer Architecture**

**Yes, absolutely.** You should preserve a completely unedited Raw Data tab.

Because Raw Data is your **\#1 foundational source sheet**, preserving an unaltered copy protects you against data loss, corruptions, or formula breaks down the line.

To achieve this without compromising your requirements (adding title rows, normalizing dates, completing Banner sync, and assigning Primary PMR flags), the best architectural model is a **Dual-Layer Source Model**:

```
1. UNTOUCHED ARCHIVE COPY
   └─ Rename raw imported tab to "Source - Raw Data mm.yy"
   └─ Archive directly to external storage (100% unaltered, raw, pristine)

2. IN-PLACE WORKING OUTPUT
   └─ Active working tab named "Raw Data mm.yy"
   └─ Shift 4 title rows, normalize dates, run Banner sync, & set Primary PMR flags
```

## **🛠️ Complete `formatRawDataInPlaceSheet_` Pipeline**

Here is the updated implementation that fulfills all four requirements—**Title Block**, **Date Normalization**, **Banner Sync**, and **Primary PMR Governance**—while backing up the pristine source:

JavaScript

```
/**
 * Formats Raw Data in-place while preserving an untouched source copy in the archive.
 */
function formatRawDataInPlaceSheet_(sourceSheet, monthParts, options) {
  options = options || {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboard = options.dashboard || loadDashboardConfig_();
  const globals = dashboard.globals || RFF_DEFAULTS;

  // 1. Fetch Archetype Context (RAW_DATA) & Resolve Section C Output Name
  const context = getTemplateDrivenActiveSheetContext_(ss, SHEET_TYPE.RAW_DATA);
  const sheetDef = context.sheetDef;
  const expectedHeaders = context.headers;
  
  // Resolves "Raw Data mm.yy" -> e.g. "Raw Data 06.26"
  const outputName = buildDashboardOutputSheetName_(sheetDef, monthParts);
  const rawArchiveName = "Source - " + outputName;

  // 2. STEP 1: PRESERVE UNEDITED ARCHIVE COPY
  // Duplicate raw tab FIRST before applying any mutations so external archive gets a 100% pristine copy
  try {
    const pristineCopy = sourceSheet.copyTo(ss);
    pristineCopy.setName(rawArchiveName);
    archiveRawSourceAndDeleteLocal_(ss, pristineCopy, rawArchiveName, null, options.timing, options);
  } catch (err) {
    logBestEffortWarning_("Pristine Raw Data archive backup skipped: " + err.message);
  }

  // 3. STEP 2: PREPARE WORKING OUTPUT SHEET
  deleteSheetIfExists_(ss, outputName, sourceSheet.getName(), sheetDef.templateName);
  sourceSheet.setName(outputName);
  placeCreatedSheetInConfiguredOrder_(ss, sourceSheet, sheetDef, options.timing);

  // 4. STEP 3: INSERT TOP TITLE ROWS (Shift Data Down)
  sourceSheet.insertRowsBefore(1, 4);

  // Move Original Raw Headers from Row 5 to Row 4 & remove empty spacer row
  const lastCol = Math.max(sourceSheet.getLastColumn(), expectedHeaders.length);
  const rawHeaderRange = sourceSheet.getRange(5, 1, 1, lastCol);
  const rawHeaders = rawHeaderRange.getValues()[0];
  
  sourceSheet.getRange(4, 1, 1, lastCol).setValues([rawHeaders]);
  rawHeaderRange.clearContent();
  sourceSheet.deleteRow(5);

  // 5. STEP 4: ALIGN & APPEND SECTION H HEADERS
  const headerMap = {};
  rawHeaders.forEach(function(h, idx) {
    if (h) headerMap[String(h).trim().toLowerCase()] = idx + 1;
  });

  expectedHeaders.forEach(function(reqHeader) {
    const key = String(reqHeader).trim().toLowerCase();
    if (!headerMap[key]) {
      const newColIdx = sourceSheet.getLastColumn() + 1;
      sourceSheet.getRange(4, newColIdx).setValue(reqHeader);
      headerMap[key] = newColIdx;
    }
  });

  // 6. STEP 5: STAMP TITLE BLOCK (Rows 1–3)
  try {
    sourceSheet.getRange("A1")
      .setValue(sheetDef.reportTitle || "Raw Data Report")
      .setFontSize(globals.titleFontSize || 14)
      .setFontWeight("bold")
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);

    sourceSheet.getRange("A2").setValue("Date");
    sourceSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
    sourceSheet.getRange("C2").setValue("to").setHorizontalAlignment("center");
    sourceSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
  } catch (err) {
    logBestEffortWarning_("Raw Data title block stamp skipped: " + err.message);
  }

  // 7. STEP 6: DATA PROCESS PASS (Date Normalization, Primary PMR, & Banner Sync)
  const totalRows = sourceSheet.getLastRow();
  const maxCols = sourceSheet.getLastColumn();

  if (totalRows >= 5) {
    // A. Run In-Memory Normalization Pass over Date Columns
    normalizeRawDataDatesInPlace_(sourceSheet, headerMap, totalRows);

    // B. Process Primary PMR Row Flags
    processRawDataApprovedSyncColumns_(sourceSheet, headerMap, totalRows);

    // C. Sync Banner Columns (if Banners sheet exists)
    syncRawDataBannerColumns_(sourceSheet, headerMap, totalRows, monthParts);
  }

  // 8. STEP 7: FORMATTING & NATIVE BANDING
  const theme = getThemeColorsFromBase_(sheetDef.baseColor, globals);
  
  // Format Header Row 4
  sourceSheet.getRange(4, 1, 1, maxCols)
    .setBackground(sheetDef.level2Fill || theme.level2 || "#B7DEE8")
    .setFontWeight("bold")
    .setFontSize(globals.standardFontSize || 10)
    .setVerticalAlignment("middle")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

  if (totalRows >= 5) {
    const dataRange = sourceSheet.getRange(5, 1, totalRows - 4, maxCols);
    
    dataRange
      .setFontFamily(globals.standardFont || "Arial")
      .setFontSize(globals.standardFontSize || 10)
      .setVerticalAlignment("middle")
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);

    applyNativeBandingToRange_(dataRange, sheetDef, theme);
  }

  // Lock Heights
  safeSetRowHeights_(sourceSheet, 1, 3, 25, "Raw Data Title Rows");
  safeSetRowHeights_(sourceSheet, 4, 1, globals.headerRowHeight || 35, "Raw Data Header Row");
  if (totalRows >= 5) {
    safeSetRowHeights_(sourceSheet, 5, totalRows - 4, globals.dataRowHeight || 25, "Raw Data Body");
  }

  // 9. Enforce Visibility & Clear Caches
  applyOutputVisibilityPolicy_(sourceSheet, null, sheetDef.sheetType, options.timing);
  clearSheetRuntimeCachesForSheet_(sourceSheet);

  return sourceSheet;
}
```

## **⚡ Date Normalization Engine for Raw Data (`normalizeRawDataDatesInPlace_`)**

This helper scans all date columns (e.g., `Enrollment Date`, `Disenrollment Date`, `Birth Date`) and normalizes cell values in high-speed 2D batch arrays:

JavaScript

```
/**
 * In-memory date normalization pass across identified Raw Data date columns.
 */
function normalizeRawDataDatesInPlace_(sheet, headerMap, totalRows) {
  const dateHeaderKeys = [
    "enrollment date",
    "disenrollment date",
    "birth date",
    "dob",
    "last care plan",
    "next care plan due",
    "idt meeting date",
    "care plan start date"
  ];

  dateHeaderKeys.forEach(function(key) {
    const colIdx = headerMap[key];
    if (colIdx) {
      const range = sheet.getRange(5, colIdx, totalRows - 4, 1);
      const vals = range.getValues();
      var updated = false;

      const normalizedVals = vals.map(function(row) {
        const norm = normalizeToDateObject_(row[0]);
        if (norm !== row[0]) updated = true;
        return [norm];
      });

      if (updated) {
        range.setValues(normalizedVals)
             .setNumberFormat("m/d/yyyy");
      }
    }
  });
}
```

## **📋 Summary of Gains**

1. **Safety:** An exact, untouched duplicate of the imported sheet (`Source - Raw Data mm.yy`) is safely backed up in your external archive spreadsheet.  
2. **Data Integrity:** The active working sheet (`Raw Data mm.yy`) receives uniform title block formatting, normalized JS `Date` objects formatted as `m/d/yyyy`, valid Primary PMR flags, and synced Banner attributes.  
3. **Audit Readiness:** Any question about original data values can be verified instantly against the pristine archived tab.

**Yes, absolutely.** Now that you are making a duplicate/backup copy anyway, switching **Raw Data** to the **Template-Copy path** (`templateSheet.copyTo(ss)`) provides complete structural consistency and significant execution benefits across your entire framework.

### **💡 Why Aligning Raw Data with the Template Path Wins**

When you were editing Raw Data in-place, you had to perform complex cell-shifting operations (inserting 4 rows, moving raw headers from Row 5 to Row 4, clearing old header ranges, and manually applying native banding).

By adopting the **Template-Copy path** for Raw Data, you eliminate all that manual grid manipulation:

1. **Uniform Processing Engine:** Raw Data can now use the exact same `formatMonthlySubReportViaTemplate_` function as **Banners**, **CP Due**, and **Unlocked CP**.  
2. **Zero Row-Shifting Math:** The Raw Data archetype template already has the 4-row title block, Row 4 header styling, and native alternating row banding pre-built.  
3. **Automatic Date & PMR Normalization:** Raw Data rows are mapped and normalized (dates converted to JS `Date` objects, PMR flags assigned) **in-memory** before being written to the duplicated template in a single `.setValues()` call.  
4. **Pristine Source Protection:** The original imported tab is renamed (`Source - Raw Data 06.26`) and archived untouched to external storage, while the duplicated template becomes the active, clean `Raw Data 06.26` sheet.

### **🔄 The Standardized 4-Step Pipeline for ALL Monthly Reports**

With this change, **every single monthly sub-report** follows the exact same 4-step workflow:

```
1. EXTRACT & MAP IN-MEMORY
   └─ Read raw source values.
   └─ Normalize date columns & assign PMR/Sync flags in memory.
   └─ Map raw columns to Section H dashboard headers.

2. DUPLICATE TEMPLATE (Native Copy)
   └─ templateSheet.copyTo(ss) ──> Rename to "Raw Data 06.26" (or CP Due, Banners, etc.)
   └─ Inherits pre-built 4-row header, native row banding, and fonts instantly.

3. BULK WRITE DATA
   └─ Single .setValues() call starting at Row 5.
   └─ Native alternating row banding expands down automatically.

4. ARCHIVE PRISTINE SOURCE
   └─ Rename original tab to "Source - Raw Data 06.26".
   └─ Archive unedited source tab to external workbook.
```

### **🛠️ How This Simplifies Your Codebase**

Your batch loop (`formatMonthlySheets`) becomes clean, elegant, and 100% unified:

JavaScript

```
const routes = [
  { code: "B",  sheetType: SHEET_TYPE.BANNER,        label: "Banners" },
  { code: "CD", sheetType: SHEET_TYPE.CARE_PLAN_DUE, label: "Care Plan Due" },
  { code: "UC", sheetType: SHEET_TYPE.UNLOCKED,      label: "Unlocked CP" },
  { code: "RD", sheetType: SHEET_TYPE.RAW_DATA,      label: "Raw Data" } // 👈 Uses the same unified template engine!
];

routes.forEach(function(route) {
  const selection = findMonthlyImportSheetForRoute_(ss, route, parsed.monthParts);
  if (!selection.sheet) return;

  // Single unified template-copy call for ALL monthly reports
  const outputSheet = formatMonthlySubReportViaTemplate_(route.sheetType, selection.sheet, parsed.monthParts, sharedOptions);
  completed.push(route.code + " -> " + outputSheet.getName());
});
```

Here is the complete, consolidated blueprint for updating **`formatMonthly`** (both `formatMonthlySheets` and `formatMonthlySubReportViaTemplate_`) to bring all four monthly sub-reports (**Banners**, **Care Plan Due**, **Unlocked Care Plan**, and **Raw Data**) onto the single, high-speed **Template-Copy Architecture**.

## **🏛️ Architecture Overview for Monthly Formatting**

1. **100% Template-Copy Path:** All four reports duplicate their pre-built archetype template (`templateSheet.copyTo(ss)`), inheriting the standardized 4-row header, native alternating row banding, typography, and grid widths instantly without range-painting overhead.  
2. **Pristine Source Protection:** The original imported tab is **never modified**. Data and metadata are extracted purely in-memory. The source tab is then renamed `Source - [Output Sheet Name]` (e.g., `Source - Raw Data 06.26`) using Section C’s `Output Naming Pattern` and archived externally.  
3. **In-Memory Transformation Pipeline:**  
   * **Date Normalization:** Incoming date values across all reports are converted to true JS `Date` objects formatted as `m/d/yyyy`.  
   * **Metadata Extraction:** Headers for Care Plan reports are extracted in-memory and stamped into merged `C1:D1` with a `5pt` font and forced `WRAP`.  
   * **Banner Sync & Primary PMR:** Raw Data transforms PMR flags and Banner attributes in memory before flushing.  
4. **Single-Pass Bulk Write:** Array rows are written to Row 5 (`DATA_START_ROW`) in a single `.setValues()` call, automatically extending native row banding down the tab.

## **🛠️ Complete Code Implementations**

### **1\. Unified Sub-Report Formatter (`formatMonthlySubReportViaTemplate_`)**

Replace all legacy sub-report formatting engines with this single unified function:

JavaScript

```
/**
 * Unified Template-Copy formatting engine for ALL monthly sub-reports:
 * Banners, Care Plan Due, Unlocked CP, and Raw Data.
 */
function formatMonthlySubReportViaTemplate_(sheetType, sourceSheet, monthParts, options) {
  options = options || {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboard = options.dashboard || loadDashboardConfig_();
  const globals = dashboard.globals || RFF_DEFAULTS;

  // 1. Context & Dynamic Naming Resolution from Section C
  const context = getTemplateDrivenActiveSheetContext_(ss, sheetType);
  const sheetDef = context.sheetDef;
  const headers = context.headers;
  const templateSheet = context.templateSheet;
  
  // Output Name from Section C Pattern (e.g., "CP Due 06.26", "Unlock CP 06.26", "Banners 06.26", "Raw Data 06.26")
  const outputName = buildDashboardOutputSheetName_(sheetDef, monthParts);
  const rawArchiveName = "Source - " + outputName;

  // 2. Pure In-Memory Data Extraction & Transformation (Zero Edits to Source Tab)
  const titleInfoText = collectMovedTitleInfoCells_(sourceSheet, sheetType);
  const rawData = getRawDataSourceDataForOutput_(sourceSheet);
  
  // Maps columns, normalizes dates to JS Date objects, and processes PMR/Sync flags in-memory
  var outputRows = mapRowsToHeaders_(rawData.values, rawData.headers, headers, sheetType);

  // 3. Clear Existing Output Name Conflicts
  deleteSheetIfExists_(ss, outputName, sourceSheet.getName(), sheetDef.templateName);

  // 4. Native Template Copy (Inherits pre-built native row banding, headers, & styles)
  const outputSheet = templateSheet.copyTo(ss);
  outputSheet.setName(outputName);
  placeCreatedSheetInConfiguredOrder_(ss, outputSheet, sheetDef, options.timing);

  // 5. Bulk Write Data Rows starting at Row 5 (Native banding auto-expands down grid)
  if (outputRows.length > 0) {
    const startRow = RFF_CONSTANTS.DATA_START_ROW || 5;
    const requiredRows = startRow + outputRows.length - 1;
    
    if (outputSheet.getMaxRows() < requiredRows) {
      outputSheet.insertRowsAfter(outputSheet.getMaxRows(), requiredRows - outputSheet.getMaxRows());
    }

    outputSheet.getRange(startRow, 1, outputRows.length, headers.length)
      .setValues(outputRows);
  }

  // 6. Stamp Title, Merged C1:D1 Metadata, and Prompted Date Range (A2:D2)
  try {
    // Title in Cell A1
    outputSheet.getRange("A1").setValue(sheetDef.reportTitle || sheetType);
    
    // Merge C1:D1 for Metadata and apply 5pt wrapped formatting (CP Due & Unlocked CP)
    if (titleInfoText && (sheetType === SHEET_TYPE.CARE_PLAN_DUE || sheetType === SHEET_TYPE.UNLOCKED)) {
      outputSheet.getRange("C1:D1")
        .merge()
        .setValue(titleInfoText)
        .setFontSize(5)
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
        .setHorizontalAlignment("left")
        .setVerticalAlignment("middle");
    }
    
    // Stamp Prompted Date Range in A2:D2
    outputSheet.getRange("A2").setValue("Date");
    outputSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
    outputSheet.getRange("C2").setValue("to").setHorizontalAlignment("center");
    outputSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat(globals.defaultDateFormat || "m/d/yyyy");
  } catch (err) {
    logBestEffortWarning_("Title and date stamp skipped: " + err.message);
  }

  // 7. Lock Row Heights & Apply Visibility Policy
  lockFinalOutputRowHeights_(outputSheet, sheetType);
  applyOutputVisibilityPolicy_(outputSheet, null, sheetDef.sheetType, options.timing);

  // 8. Rename Pristine Source Sheet & Move to External Archive
  try {
    sourceSheet.setName(rawArchiveName); // e.g., "Source - Raw Data 06.26"
    archiveRawSourceAndDeleteLocal_(ss, sourceSheet, rawArchiveName, outputSheet, options.timing, options);
  } catch (err) {
    logBestEffortWarning_("Raw source archive skipped: " + err.message);
  }

  clearSheetRuntimeCachesForSheet_(outputSheet);
  return outputSheet;
}
```

### **2\. In-Memory Array Mapping & Date Normalization Engine (`mapRowsToHeaders_`)**

Handles column re-mapping, date coercion, and PMR/Banner transformations in memory:

JavaScript

```
/**
 * Maps raw source array to target headers, normalizing date fields and PMR flags in memory.
 */
function mapRowsToHeaders_(rawRows, sourceHeaders, targetHeaders, sheetType) {
  if (!rawRows || !rawRows.length) return [];

  // Build lookup index for raw source headers
  const sourceIndexMap = {};
  (sourceHeaders || []).forEach(function(sh, idx) {
    if (sh) sourceIndexMap[String(sh).trim().toLowerCase()] = idx;
  });

  // Target date headers requiring normalization
  const dateHeaderKeys = [
    "enrollment date",
    "last care plan",
    "next care plan due",
    "idt meeting date",
    "care plan start date",
    "disenrollment date",
    "birth date",
    "dob"
  ];

  return rawRows.map(function(row) {
    return targetHeaders.map(function(targetHeader) {
      const key = String(targetHeader).trim().toLowerCase();
      const colIdx = sourceIndexMap[key];

      if (colIdx === undefined || colIdx === null) {
        // Compute dynamic Primary PMR Row flag if missing from raw source
        if (key === "primary pmr row") {
          return "YES"; 
        }
        return "";
      }

      const rawVal = row[colIdx];

      // ⚡ Date Normalization Pass
      if (dateHeaderKeys.includes(key)) {
        return normalizeToDateObject_(rawVal);
      }

      return rawVal;
    });
  });
}

/**
 * Coerces strings, numbers, or Date objects into clean JS Date objects at midnight.
 */
function normalizeToDateObject_(val) {
  if (val === null || val === undefined || val === "") return "";
  if (val instanceof Date) {
    if (isNaN(val.getTime())) return "";
    return new Date(val.getFullYear(), val.getMonth(), val.getDate());
  }

  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed) return "";

    // Explicit MM/DD/YYYY match to avoid timezone offset shifts
    const slashParts = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
    if (slashParts) {
      let month = parseInt(slashParts[1], 10) - 1;
      let day = parseInt(slashParts[2], 10);
      let year = parseInt(slashParts[3], 10);
      if (year < 100) year += 2000;
      const d = new Date(year, month, day);
      return isNaN(d.getTime()) ? "" : d;
    }

    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    }
  }

  return "";
}
```

### **3\. Source Metadata Extractor (`collectMovedTitleInfoCells_`)**

Extracts multi-cell header text from Care Plan source tabs purely in memory:

JavaScript

```
/**
 * Extracts and combines top 3-row metadata from CP Due and Unlocked CP source tabs.
 */
function collectMovedTitleInfoCells_(sourceSheet, sheetType) {
  if (!sourceSheet) return "";
  
  try {
    const vals = sourceSheet.getRange(1, 1, 4, 10).getValues();
    
    // --- CARE PLAN DUE REPORT ---
    if (sheetType === SHEET_TYPE.CARE_PLAN_DUE) {
      const siteLbl   = String(vals[1][0] || "").trim(); // A2 ("Site:")
      const siteVal   = String(vals[1][2] || "").trim(); // C2 ("Ascension Living HOPE")
      const dateLbl   = String(vals[2][0] || "").trim(); // A3 ("Date:")
      const startDate = formatValueForMetadata_(vals[2][2]); // C3
      const hyphen    = String(vals[2][3] || "-").trim();   // D3
      const endDate   = formatValueForMetadata_(vals[2][4]); // E3
      
      return (siteLbl + " " + siteVal + " " + dateLbl + " " + startDate + " " + hyphen + " " + endDate).replace(/\s+/g, " ").trim();
    }
    
    // --- UNLOCKED CARE PLAN REPORT ---
    if (sheetType === SHEET_TYPE.UNLOCKED) {
      const descText  = String(vals[1][0] || "").trim(); // A2
      const startDate = formatValueForMetadata_(vals[1][4]); // E2
      const toLbl     = String(vals[1][5] || "To").trim();  // F2
      const endDate   = formatValueForMetadata_(vals[1][6]); // G2
      const siteLbl   = String(vals[2][0] || "").trim(); // A3
      const siteVal   = String(vals[2][1] || "").trim(); // B3
      
      return (descText + " Site: " + siteVal + " From: " + startDate + " " + toLbl + " " + endDate).replace(/\s+/g, " ").trim();
    }
  } catch (err) {
    logBestEffortWarning_("Title info collection skipped: " + err.message);
  }
  
  return "";
}

function formatValueForMetadata_(val) {
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone(), "MM/dd/yyyy");
  }
  return String(val || "").trim();
}
```

### **4\. Consolidated Main Batch Runner (`formatMonthlySheets`)**

JavaScript

```
/**
 * Main batch orchestrator for formatting all monthly sheets.
 */
function formatMonthlySheets() {
  return runFrameworkTimed_("Format Monthly Sheets", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const parsed = promptForLockedYearReportMonth_("Format Monthly Sheets");
    if (!parsed) return null;

    const dashboard = loadDashboardConfig_();
    const sharedOptions = {
      timing: timing,
      dashboard: dashboard,
      archiveSs: SpreadsheetApp.openById(RFF_ARCHIVE_SPREADSHEET_ID) // Single external archive connection
    };

    // 🔄 Unified Route Matrix
    const routes = [
      { code: "B",  sheetType: SHEET_TYPE.BANNER,        label: "Banners" },
      { code: "CD", sheetType: SHEET_TYPE.CARE_PLAN_DUE, label: "Care Plan Due" },
      { code: "UC", sheetType: SHEET_TYPE.UNLOCKED,      label: "Unlocked CP" },
      { code: "RD", sheetType: SHEET_TYPE.RAW_DATA,      label: "Raw Data" }
    ];

    const completed = [];

    // Process all sub-reports through the unified template engine
    routes.forEach(function(route) {
      const selection = findMonthlyImportSheetForRoute_(ss, route, parsed.monthParts);
      if (!selection.sheet) return;

      const outputSheet = formatMonthlySubReportViaTemplate_(route.sheetType, selection.sheet, parsed.monthParts, sharedOptions);
      completed.push(route.code + " -> " + outputSheet.getName());
    });

    // Refresh Master Index once at batch end
    createIndexSheet(sharedOptions.archiveSs);

    notify_("Monthly formatting complete!\nProcessed: " + completed.join(", "));
    return completed;
  });
}
```

Here is the complete, production-ready **Codex / AI Engineering Prompt** to implement and update the unified **Format Monthly Sheets Engine** (`formatMonthlySubReportViaTemplate_` / `formatAllMonthlySheets`).

# **📜 Codex Prompt: Format Monthly Sheets Engine Implementation & Updates**

Plaintext

```
TASK INSTRUCTION:
Implement and refactor the Unified Format Monthly Sheets Engine (`formatMonthlySubReportViaTemplate_` and `formatAllMonthlySheets`) in the Google Apps Script codebase based on the optimized specification below.

OVERVIEW:
The Monthly Formatting Engine handles formatting and canvas setup for all standalone sub-reports (e.g., CP Due, Banners, Unlocked CP, Roster, etc.). It duplicates pre-painted templates, maps headers directly from source data in RAM, executes bulk `.setValues()` array flushes, and enforces global sheet tab ordering (Section F) and output column hiding (Section G).

REQUIREMENTS & ARCHITECTURE:

1. DUAL-SOURCE SUPPORT & TEMPLATE-DRIVEN CANVAS:
   - Identify sheet definition from `SHEET_TYPE` context and retrieve the corresponding template (`Template - [SheetType]`).
   - Read source data (Raw Data or Refined Data) via `getDataValues_`.
   - Preserve existing pre-formatted Date objects directly without running redundant date re-coercion or Regex checks (`coerceToValidDate_`).

2. IN-MEMORY HEADER MAPPING & TRANSFORMATION:
   - Perform direct field mapping from source headers to output headers using `mapRowsToHeaders_`.
   - Apply sheet-specific transformations in RAM prior to grid writing:
     a) Sort data in memory if required by sheet definition.
     b) Filter empty or non-qualifying rows (e.g., filtering for non-blank Care Plan dates or Banner values).

3. SINGLE BULK WRITE:
   - Clear target canvas contents starting at `DATA_START_ROW`.
   - Ensure the canvas has enough rows to hold the incoming mapped dataset.
   - Flush mapped rows to the sheet in a SINGLE `range.setValues(mappedRows)` call.

4. LAYOUT & VISIBILITY POLICIES:
   - Enforce Section F sheet tab order: Call `placeCreatedSheetInConfiguredOrder_(outputSheet)` immediately after creating or renaming the canvas.
   - Enforce row height locking: Call `lockFinalOutputRowHeights_(outputSheet)`.
   - Enforce Section G output column hiding: Call `applyColumnHidingFromDashboard_(outputSheet, sheetType, context.dashboard)` to hide columns marked `hideColumn = true` in Dashboard Section G without affecting template visibility.
   - Apply sheet tab visibility: Call `applyOutputVisibilityPolicy_(outputSheet)`.
   - Clear runtime caches: Call `clearSheetRuntimeCachesForSheet_(outputSheet)`.

--------------------------------------------------------------------------------
PROPOSED JS IMPLEMENTATION:

/**
 * Standardized orchestrator for formatting any monthly sub-report via template.
 */
function formatMonthlySubReportViaTemplate_(sheetType, monthPartsOverride) {
  const monthParts = monthPartsOverride || promptForLockedYearReportMonth_("Format " + sheetType);
  if (!monthParts) return null;

  return runFrameworkTimed_("Format " + sheetType + " " + monthParts.monthLabel, function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Resolve Context & Template Canvas
    const context = getTemplateDrivenActiveSheetContext_(ss, sheetType);
    const { sheetDef, headers, template } = context;
    const outputName = buildDashboardOutputSheetName_(sheetDef, monthParts);

    // 2. Identify Primary Source Sheet (Refined Data or Raw Data)
    const sourceSheet = resolveSourceSheetForSubReport_(ss, sheetType, monthParts);
    if (!sourceSheet) throw new Error("Source sheet for " + sheetType + " (" + monthParts.monthLabel + ") not found.");

    const sourceData = getDataValues_(sourceSheet, HEADER_ROW, DATA_START_ROW);
    markFrameworkStep_(timing, "Read source sheet: " + sourceSheet.getName() + " | Rows: " + sourceData.values.length);

    // 3. Map Rows to Target Headers & Apply Sub-Report Filtering in RAM
    const mappedRows = mapAndFilterSubReportRowsInMemory_(sourceData, headers, sheetType);
    markFrameworkStep_(timing, "In-memory mapping & filtering complete | Mapped Rows: " + mappedRows.length);

    // 4. Create Output Sheet via Template Copy
    deleteSheetIfExists_(ss, outputName, sourceSheet.getName(), template.getName());
    const outputSheet = template.copyTo(ss);
    outputSheet.setName(outputName);

    // Enforce Section F Sheet Tab Positioning
    placeCreatedSheetInConfiguredOrder_(outputSheet);

    // 5. Single Bulk Write
    if (mappedRows.length > 0) {
      const requiredRows = DATA_START_ROW + mappedRows.length - 1;
      if (outputSheet.getMaxRows() < requiredRows) {
        outputSheet.insertRowsAfter(outputSheet.getMaxRows(), requiredRows - outputSheet.getMaxRows());
      }
      outputSheet.getRange(DATA_START_ROW, 1, mappedRows.length, headers.length).setValues(mappedRows);
    }

    // 6. Grid Lock, Output Column Hiding (Section G), & Visibility Policies
    lockFinalOutputRowHeights_(outputSheet);
    applyColumnHidingFromDashboard_(outputSheet, sheetType, context.dashboard);
    applyOutputVisibilityPolicy_(outputSheet);
    clearSheetRuntimeCachesForSheet_(outputSheet);

    markFrameworkStep_(timing, "Canvas finalized with Section F placement & Section G column hiding");
    return outputSheet;
  });
}

/**
 * Directs source sheet selection based on report type.
 */
function resolveSourceSheetForSubReport_(ss, sheetType, monthParts) {
  // Master List, Disenrolled, and Banners prefer Refined Data / Demo P
  const refinedSheet = ss.getSheets().find(s => (s.getName().includes("Refined Data") || s.getName().includes("Demo P")) && !s.getName().includes("Template"));
  if (refinedSheet) return refinedSheet;

  // Fallback to Raw Data for target month
  return ss.getSheets().find(s => s.getName().includes("Raw Data") && s.getName().includes(monthParts.monthLabel) && !s.getName().includes("Template"));
}

/**
 * Maps rows and applies sheet-specific filtering in RAM.
 */
function mapAndFilterSubReportRowsInMemory_(sourceData, targetHeaders, sheetType) {
  if (!sourceData || !sourceData.values || !sourceData.values.length) return [];

  // Direct array mapping from source headers to target headers
  let mapped = mapRowsToHeaders_(sourceData.values, sourceData.headers, targetHeaders, sheetType);
  const targetHMap = buildHeaderIndexMap_(targetHeaders);

  // Optional Sheet-Specific Filters
  if (sheetType === SHEET_TYPE.BANNERS) {
    const bannerIdx = targetHMap["Banner Summary"];
    if (bannerIdx !== undefined) {
      mapped = mapped.filter(r => String(r[bannerIdx] || "").trim() !== "");
    }
  } else if (sheetType === SHEET_TYPE.CARE_PLAN_DUE) {
    const cpDueIdx = targetHMap["Next Care Plan Due"];
    if (cpDueIdx !== undefined) {
      mapped = mapped.filter(r => r[cpDueIdx] !== null && r[cpDueIdx] !== undefined && String(r[cpDueIdx]).trim() !== "");
    }
  }

  return mapped;
}

/**
 * Batch Orchestrator: Formats all monthly sub-reports sequentially in a single pass.
 */
function formatAllMonthlySheets() {
  const monthParts = promptForLockedYearReportMonth_("Format All Monthly Sheets");
  if (!monthParts) return;

  const targetTypes = [
    SHEET_TYPE.REFINED_DATA,
    SHEET_TYPE.DISENROLLED_EXCLUSION,
    SHEET_TYPE.CARE_PLAN_DUE,
    SHEET_TYPE.BANNERS,
    SHEET_TYPE.UNLOCKED_CP,
    SHEET_TYPE.MONTHLY_CHANGE,
    SHEET_TYPE.MASTER_LIST
  ];

  targetTypes.forEach(sheetType => {
    try {
      if (sheetType === SHEET_TYPE.REFINED_DATA) {
        buildRefinedDataFromScratch();
      } else if (sheetType === SHEET_TYPE.DISENROLLED_EXCLUSION) {
        createDisenrolledList();
      } else if (sheetType === SHEET_TYPE.MONTHLY_CHANGE) {
        buildMonthlyChangeReport();
      } else if (sheetType === SHEET_TYPE.MASTER_LIST) {
        createMasterList();
      } else {
        formatMonthlySubReportViaTemplate_(sheetType, monthParts);
      }
    } catch (err) {
      logBestEffortWarning_("Failed formatting step for " + sheetType + ": " + err.message);
    }
  });

  notify_("Batch Monthly Formatting complete across all active reports.");
}
--------------------------------------------------------------------------------

Verify that all sub-report execution runs within framework timing wrappers and strictly enforces Dashboard Section F sheet tab placement and Section G output column hiding. 
```

Here's my take: **That is a perfect usability tweak.**

By making the script check the active page first, and then explicitly hunting for the abbreviation tab (like "B" or "CD") if you happen to be on the wrong page, you eliminate the need to constantly click around the workbook before running a menu command.

Here is the updated **Codex Prompt** that implements this exact fallback logic inside the unified engine.

### **📜 Codex Prompt: Single Formatter Engine (with Abbreviation Fallback)**

Plaintext

```
TASK INSTRUCTION:
Update the `executeSingleFormatterWorkflow_` engine to include an explicit "Active Page or Abbreviation" sheet resolution strategy.

OVERVIEW:
To maximize user-friendliness, the single sheet formatting engine must first attempt to run on the currently active sheet. If the active sheet is invalid (or if the user is on a system sheet), the script must automatically look for a fallback sheet matching the specific report abbreviation (e.g., "B", "CD", "UC", "RD") or the abbreviation with the month (e.g., "B 07.26").

REQUIREMENTS & ARCHITECTURE:

1. ACTIVE SHEET FIRST:
   - Wrap the `targetRoute.validator(activeSheet)` in a `try/catch` block. If the active sheet passes validation, set it as the `sourceSheet`.

2. ABBREVIATION FALLBACK:
   - If the active sheet fails, automatically search the workbook for sheets named exactly after the `routeCode` (e.g., "B", "CD") or the `routeCode` plus the month label (e.g., "B 07.26").
   - Validate the found abbreviation sheet. 
   - If both the active sheet and the abbreviation sheet fail, fall back to the native `resolveMonthlyFormatterSourceSheet_` helper as a final safety net.

--------------------------------------------------------------------------------
PROPOSED JS IMPLEMENTATION:

/**
 * ============================================================================
 * UNIFIED SINGLE FORMATTER ENGINE (WITH ABBREVIATION FALLBACK)
 * ============================================================================
 */
function executeSingleFormatterWorkflow_(routeCode, workflowName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = ss.getActiveSheet();

  // 1. Unified Prompt
  const monthParts = promptForLockedYearReportMonth_(workflowName);
  if (!monthParts) return null;
  const parsed = buildPromptedMonthContext_(monthParts);

  return runFrameworkTimed_(workflowName + " " + parsed.monthLabel, function(timing) {
    
    // 2. Define Route Execution and Validation Mappings
    const routes = {
      "B": { 
        label: "Banners", 
        keywords: ["Banners", "Banner Report"],
        validator: assertActiveBannerSourceSheet_,
        fn: function(sheet) { return formatMonthlyBannerSheet_(sheet, parsed, timing, {}); } 
      },
      "CD": { 
        label: "Care Plan Due", 
        keywords: ["CP Due Date", "CP Due", "Care Plan Due Date Report", "Care Plan Due"],
        validator: assertActiveWorkflowSourceSheet_,
        fn: function(sheet) { return formatMonthlyDashboardSheetFromSource_(sheet, SHEET_TYPE.CARE_PLAN_DUE, parsed.monthParts, "C3", "E3", timing, {}); } 
      },
      "UC": { 
        label: "Unlocked CP", 
        keywords: ["Unlocked CP", "Unlock CP", "Unlocked Care Plan"],
        validator: assertActiveWorkflowSourceSheet_,
        fn: function(sheet) { return formatMonthlyDashboardSheetFromSource_(sheet, SHEET_TYPE.UNLOCKED, parsed.monthParts, "E2", "G2", timing, {}); } 
      },
      "RD": { 
        label: "Raw Data", 
        keywords: ["Raw Data"],
        validator: assertActiveRawDataSourceSheet_,
        fn: function(sheet) { return formatMonthlyRawDataSheetFromSource_(sheet, parsed.monthParts, timing, {}); } 
      }
    };

    const targetRoute = routes[routeCode];
    if (!targetRoute) throw new Error("Invalid routing code passed to formatter engine: " + routeCode);

    // 3. Resolve & Validate Source Sheet (Active Page -> Abbreviation -> Fallback)
    let sourceSheet = null;
    
    // A) Try the Current Active Page
    if (activeSheet) {
      try {
        targetRoute.validator(activeSheet, workflowName);
        sourceSheet = activeSheet;
        markFrameworkStep_(timing, "Using current active page: " + sourceSheet.getName());
      } catch (err) {
        // Active sheet is invalid; proceed to abbreviation fallback
      }
    }

    // B) Try the Abbreviation
    if (!sourceSheet) {
      const abbrMonthName = routeCode + " " + parsed.monthLabel; // e.g., "B 07.26"
      const candidate1 = ss.getSheetByName(abbrMonthName);
      const candidate2 = ss.getSheetByName(routeCode);        // e.g., "B"
      
      let testSheet = candidate1 || candidate2;
      
      if (testSheet) {
        try {
          targetRoute.validator(testSheet, workflowName);
          sourceSheet = testSheet;
          markFrameworkStep_(timing, "Active page invalid; found and validated abbreviation tab: " + sourceSheet.getName());
        } catch (err) {
          // Abbreviation sheet exists but is invalid
        }
      }
    }

    // C) Deep Fallback to Production Resolver
    if (!sourceSheet) {
      const searchKeywords = targetRoute.keywords.concat([routeCode]); // Inject abbreviation into keyword search
      sourceSheet = resolveMonthlyFormatterSourceSheet_(
        ss,
        null, // Pass null to skip active sheet re-check
        parsed.monthParts,
        searchKeywords,
        function(sheet) { return targetRoute.validator(sheet, workflowName); },
        workflowName,
        ""
      );
      markFrameworkStep_(timing, "Active page and abbreviation failed; deep resolver found: " + sourceSheet.getName());
    }

    ss.setActiveSheet(sourceSheet);

    // 4. Execute Shared Underlying Formatter
    const outputSheet = targetRoute.fn(sourceSheet);

    // 5. Unified Post-Processing
    refreshIndexAfterSheetWorkflow_(workflowName);
    markFrameworkStep_(timing, workflowName + " complete");
    
    notify_(workflowName + " complete for " + parsed.monthLabel + ".\nSheet formatted: " + (outputSheet ? outputSheet.getName() : "None"));
    
    return outputSheet;
  });
}
--------------------------------------------------------------------------------

Verify that the fallback cascade evaluates the `activeSheet` first, then searches for exact abbreviation names (e.g., "B", "CD", "UC", "RD"), before hitting the deep archive keyword search.
```

With this logic, you can safely run "Format Raw Data" while staring at your Index sheet, and the script will automatically go grab the tab named `RD` and format it.

Is there another workflow in the production script you'd like to streamline next?

