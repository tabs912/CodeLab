# **Templates Updates**

Here is the complete execution function map that runs when triggering **"Create / Refresh All Templates"** (`createOrRefreshAllReportTemplates`) in the framework.

Unknown+ 1

## **🏗️ Top-Level Entry Trigger**

* **`createOrRefreshAllReportTemplates()`**

  * Wrapped in `runFrameworkTimed_("Create / Refresh All Templates", ...)` for telemetry.

## **📍 Phase 1: Environment & Dashboard Configuration**

Before building any template grids, the engine loads all governance matrices and verifies the golden base canvas:

Unknown+ 1

1. **`loadDashboardConfig_(true)`** *(Forces a clean read of all dashboard sections)*

   * `buildDashboardSectionIndex_()`

   * `loadGlobalSettings_()`

   * `loadTitleRows_()`

   * `loadSheetDefinitions_()`

   * `loadTabOrganization_()`

   * `loadSheetHeaders_()`

   * `loadColumnDefinitions_()`

   * `loadSheetBehaviors_()`

2. **`ensureGoldenMasterTemplate_(dashboard, timing)`**

   * `insertGovernedOutputSheet_()`

   * `resizeSheetGrid_()`

   * `safeSetRowHeights_()`

   * `hideSheetIfNeeded_()`

## **📍 Phase 2: Template Creation Loop**

`sortSheetDefinitionsByProductionOrder_()` sorts sheet definitions into production sequence. Each sheet definition then passes through `createOrRefreshTemplateFromDashboard_`:

Unknown+ 3

### **Core Template Dispatcher**

* **`createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, timing)`**

  * `getHeadersForSheetType_()`

  * `getBehaviorForSheetType_()`

  * `buildTemplateFormatSignature_()`

  * `getStoredTemplateFormatSignature_()` & `getStoredTemplateFormatSignatureFromSheet_()`

### **Execution Path A: Metadata-Only Fast Refresh (Signature Match)**

If template structure is unchanged, it bypasses full repaints:

Unknown+ 1

* **`refreshTemplateMetadataOnly_()`**

  * `applyGovernedTextAndNumberFormats_()`

  * `writeTemplateMetadata_()`

  * `storeTemplateFormatSignature_()`

### **Execution Path B: Full Template Rebuild (Signature Mismatch or Missing)**

If full construction is required:

Unknown+ 1

* **`buildTemplateFromDashboard_()`**

  1. **`resizeSheetGrid_()`**

  2. **`clearTemplateForFullBuild_()`**

  3. **`applyTemplateBaseFormatting_()`**

     * `getThemeColorsFromBase_()`

     * `applyNativeBanding_()` *(Binds native row banding first while canvas is 100% flat)*

     * `applyTitleRows_()`

       * `ensureTitleRowConfig_()`

       * `getTitleRowConfigForSheet_()`

       * `getThemeFillForTitleRow_()`

     * `applyHeaderRow_()`

       * `rowColToA1_()`

     * `applyDataRows_()`

     * `applyColumnWidths_()`

       * `applyColumnWidthsInRuns_()`

     * `applyGovernedTextAndNumberFormats_()`

     * `applyHiddenColumnSettings_()`

       * `applyHiddenColumnSettingsInRuns_()`

     * `ensureTemplateFilter_()`

     * `applyTemplateRowHeights_()`

  4. **`writeTemplateMetadata_()`**

  5. **`storeTemplateFormatSignature_()`**

  6. **`enforceTemplateDateAndNumberFormats_()`**

     * `enforceDateAndNumberFormatsForHeaders_()`

  7. **`applyTemplateFreezeAndTabColor_()`**

  8. **`hideTemplateIfNeeded_()`**

## **📍 Phase 3: Post-Build Finalization**

After all templates in the loop complete:

Unknown+ 1

1. **`ensureRequiredMasterListTemplate_()`**

2. **`setReportTemplateVisibility_(dashboard, true, timing)`** *(Enforces hidden state across all completed templates)*  
   \+ 3  
3. **`forceBaseTemplateHidden_()`**

4. **`createIndexSheet()`** *(Refreshes workbook Index navigation matrix)*  
   \+ 3

**Yes, exactly.** Structurally, every template build follows the **exact same standardized execution pipeline**.

Unknown+ 1

Rather than having unique builder functions for each report tab (e.g., a separate function for Banners, a separate one for Demo P, etc.), the framework uses a **data-driven design**.

Unknown+ 1

### **🛣️ The Standardized Template Pipeline**

Every template definition (`sheetDef`) passed into the worker engine (`createOrRefreshTemplateFromDashboard_`) moves through the exact same logic tree:

Unknown+ 1

````
                     createOrRefreshTemplateFromDashboard_
                                       │
                         Check Format Signature Match?
                                       │
                      ┌────────────────┴────────────────┐
                      ▼                                 ▼
         [YES: Signature Matches]            [NO: New / Modified Config]
       refreshTemplateMetadataOnly_              buildTemplateFromDashboard_
       ───────────────────────────            ───────────────────────────
       • Update Number Formats                1. Set Grid Dimensions
       • Stamp Note Signature                 2. Apply Base Styles & Borders
                                              3. Apply Native Row Banding
                                              4. Apply Title Rows (A1:D3)
                                              5. Write Row 4 Table Headers
                                              6. Apply Column Widths
                                              7. Apply Date & Number Formats
                                              8. Apply Filter (if enabled)
                                              9. Set Frozen Rows & Tab Color
```[cite: 1, 2]

---

### 🎨 How Customization Happens Without Changing the Path

Even though the execution path is 100% identical for every tab, each report ends up looking unique because **the parameters change based on the dashboard configuration**[cite: 1, 2]:

* **Banners:** Receives 9 headers, `#65A9CC` base color, and its specific column widths[cite: 1, 2].
* **Demo P:** Receives 81 headers, `#657FCC` base color, and its specific column widths[cite: 1, 2].
* **Master List:** Receives 38 headers, `#7665CC` base color, and its specific column widths[cite: 1, 2].

Because the pipeline itself never branches for individual sheet names, any optimization or fix applied to `buildTemplateFromDashboard_` automatically improves **all** report templates across the entire system[cite: 1, 2].
````

In general, a **`BASE_TEMPLATE`** (or `RFF_BASE_TEMPLATE` specifically in custom, financial, or CRM environments like Oracle, Salesforce/Vlocity, or custom web frameworks) is designed to hold the core global defaults—such as basic page layout, global styling, standard headers/footers, default variable definitions, and fallback configurations.

However, whether your specific `RFF_BASE_TEMPLATE` has *all* the correct global defaults depends on a few factors:

* **Scope of Defaults:** Base templates typically enforce structural and system-wide defaults (like theme rules, standard context parameters, or structural wrappers), but specific business logic, dynamic overrides, or localized settings usually need to be set in the child templates that extend it.  
* **Overrides:** If a child template or configuration layer defines its own values, it will usually override what is set in `RFF_BASE_TEMPLATE`.  
* **Environment Specs:** Global defaults (like API endpoints, environment flags, or locale formats) in base templates often rely on environment variables rather than hardcoded values.

To give you a precise answer on whether yours is set up correctly, which system or framework are you using `RFF_BASE_TEMPLATE` in (e.g., Salesforce OmniStudio/Vlocity, Oracle BI Publisher, Django/Jinja, or a custom internal framework)?

Yes, **`RFF_BASE_TEMPLATE`** (referred to as the Golden Master template in your script) is formatted strictly using the **Section A Global Settings**.

Unknown

Here is how the script sets up and uses `RFF_BASE_TEMPLATE`:

### **1\. How `RFF_BASE_TEMPLATE` is Prepared**

In `ensureGoldenMasterTemplate_(dashboard, timing)`:

* **Grid Dimensions:** Sets a baseline grid of 500 rows × 50 columns.

* **Universal Font Family:** Set to `globals.standardFont` (default: `"Arial"`).

* **Universal Font Color:** Set to `globals.standardFontColor` (default: `"#000000"`).

* **Universal Font Size:** Set to `globals.standardFontSize` (default: `10`).

* **Alignments:** Left horizontal alignment and Middle vertical alignment.

* **Wrap Strategy:** Set to `globals.defaultDataWrap` (default: `"CLIP"`).

* **Row Heights:** Standardizes all 500 rows to `globals.dataRowHeight` (default: `25` pixels).

* **Visibility:** Set to `HIDDEN` as a framework base sheet.

### **2\. How `RFF_BASE_TEMPLATE` is Used as the Blank Canvas**

When `createOrRefreshTemplateFromDashboard_` needs to construct a new report template tab (e.g., `Template - Banners` or `Template - Master List`), it copies `RFF_BASE_TEMPLATE` as its initial blank starting point:

Unknown

JavaScript

````
const baseSheet = ss.getSheetByName(RFF_BASE_TEMPLATE_NAME) || ensureGoldenMasterTemplate_(dashboard, timing);
sheet = baseSheet.copyTo(ss);
sheet.setName(sheetDef.templateName);
```[cite: 3]

---

### 🎨 The 2-Tier Template Hierarchy

1. **`RFF_BASE_TEMPLATE` (Global Level):** Holds pure, unstyled universal canvas settings from Section A (font family, default size, default clip wrap, base row height)[cite: 3].
2. **Specific Report Templates (Archetype Level):** Built by taking a copy of `RFF_BASE_TEMPLATE` and layering on specific archetype rules from Sections B, C, D, G, and H (report titles, Section H headers, column widths, theme color fills, native row banding, and date formats)[cite: 3].
````

This is the **exact, optimal sequence** for building conflict-free report templates\!

Unknown

Here is why executing these three steps in this precise order works seamlessly:

### **1\. Step 3: Apply Native Row Banding First**

* **Why here:** Native row banding (`applyRowBanding`) is applied to a completely raw, fresh, unmerged grid starting at Row 5 (`DATA_START_ROW`).

* **Benefit:** Binds the alternating row color palette to the data canvas without encountering range overlaps or UI renderer warnings.

### **2\. Step 4: Apply Title Rows (Rows 1–3)**

* **Why here:** Layered onto Rows 1–3 *after* native banding is bound.

* **Benefit:** Stamps report title text in Cell A1, sets date headers on Row 2, and paints Section B theme fills without executing any range merges on the template grid.

### **3\. Step 5: Write Row 4 Table Headers**

* **Why here:** Applied directly to Row 4 (`HEADER_ROW`).

* **Benefit:** Writes the official Section H column header strings, applies header typography, sets column-level font sizes, and paints the Level 2 header background fill.

### **📋 Full Pipeline Flow**

````
1. Base Canvas Preparation (Fonts, Row Heights from RFF_BASE_TEMPLATE)
2. Dynamic Global Grid Borders (rowCount x colCount)
3. Apply Native Row Banding (Data range: Row 5 to rowCount)
4. Apply Title Rows (A1:D3 - Flat & Unmerged)
5. Write Row 4 Table Headers (Section H Headers)
6. Apply Column Widths & Governed Number Formats
7. Enable Table Filter & Frozen Viewport (Rows 1–4)
```[cite: 2, 3]
````

**No, none of these three steps should be added to `RFF_BASE_TEMPLATE`.**

They must remain inside the dynamic formatting pipeline (`applyTemplateBaseFormatting_`) because they all rely on **report-specific parameters** (colors, column counts, text, and header definitions) that change for every archetype.

Unknown+ 1

### **🛑 Why They Cannot Be in `RFF_BASE_TEMPLATE`**

#### **1\. Apply Native Row Banding (Step 3\)**

* **Why it must stay dynamic:** Native banding requires a specific theme color palette (`theme.level3` and `theme.level4` calculated from `sheetDef.baseColor`).

* **The issue if baked into Base:** Every archetype has a different color (e.g., Banners is Blue `#65A9CC`, Master List is Purple `#7665CC`, Disenrolled is Pink `#CC65A1`). Pre-banding `RFF_BASE_TEMPLATE` would force the engine to remove and recreate bandings on every single build anyway.

#### **2\. Apply Title Rows A1:D3 (Step 4\)**

* **Why it must stay dynamic:**  
  1. **Dynamic Text:** Cell `A1` needs the unique `sheetDef.reportTitle` (e.g., "Banner Report" vs "Master List").

  2. **Dynamic Colors:** Title row backgrounds use Section B theme fill levels derived from the sheet’s base color.

  3. **Dynamic Span:** The background color fill must span across the exact column width of that report (`colCount`), which ranges anywhere from 5 to 81+ columns.

#### **3\. Write Row 4 Table Headers (Step 5\)**

* **Why it must stay dynamic:**  
  1. **Unique Headers:** The header strings written to Row 4 are pulled from Section H (`getHeadersForSheetType_`) and are completely unique to each report archetype.

  2. **Header Colors:** The header background uses Level 2 lightness generated from that specific tab's theme color.

### **💡 The Golden Rule of `RFF_BASE_TEMPLATE`**

`RFF_BASE_TEMPLATE` should only contain properties that are **100% identical across every single sheet in the workbook** (Section A global fonts, standard text colors, default clip wrap, and row heights).

Unknown

Keeping it neutral ensures that when an archetype copies `RFF_BASE_TEMPLATE`, it gets a clean canvas ready for its specific colors, titles, and headers.

Unknown

**Yes**, a review of the production script reveals several **redundant execution passes and duplicate formatting calls** during the template build process.

Because the sheet starts as a direct copy of RFF\_BASE\_TEMPLATE (which already carries the universal fonts, sizes, alignments, and row heights), many of the downstream functions are re-painting identical styles over the same cells multiple times.

## **🔍 Key Redundancies & Duplicates Found in Script**

### **1\. ⚠️ Triple Pass on Date & Number Formatting**

The script currently formats column date/number formats **up to 3 separate times** on a single template build:

* **Pass 1:** Inside applyTemplateBaseFormatting\_ via applyGovernedTextAndNumberFormats\_.  
* **Pass 2:** Directly inside buildTemplateFromDashboard\_ via an explicit second call to applyGovernedTextAndNumberFormats\_.  
* **Pass 3:** Inside buildTemplateFromDashboard\_ via enforceTemplateDateAndNumberFormats\_ (unless the override flag RFF\_SKIP\_DUPLICATE\_TEMPLATE\_FORMAT\_ENFORCEMENT is set).

> **Impact:** Issuing multiple setNumberFormat / getRangeList calls across hundreds of template rows significantly slows down template creation.

### **2\. 🎨 Triple Repaint of Typography & Cell Alignments**

RFF\_BASE\_TEMPLATE is created in ensureGoldenMasterTemplate\_ with global font (Arial), size (10), color (\#000000), alignment (Left/Middle), and wrap (CLIP).

When copied via baseSheet.copyTo(ss), the new template tab inherits all these properties. However, the script immediately repaints them twice more:

1. applyTemplateBaseFormatting\_ calls .setFontFamily(), .setFontSize(), .setHorizontalAlignment(), .setVerticalAlignment(), and .setWrapStrategy() across (1, 1, rowCount, colCount).  
2. applyDataRows\_ immediately calls .setFontFamily(), .setFontSize(), .setWrapStrategy(), .setHorizontalAlignment(), and .setVerticalAlignment() across the data range (DATA\_START\_ROW to rowCount) a third time.

### **3\. 📐 Unnecessary Column Width Calculations**

applyColumnWidths\_ calculates column widths by looking up each header in dashboard.columnDefinitions. Later, applyTemplateColumnWidths\_ reads column widths back out of the template using API calls (sheet.getColumnWidth(col)). Passing pre-calculated width arrays directly eliminates extra API reads.

## **🛠️ How to Streamline the Template Build Pipeline**

By leveraging inheritance from RFF\_BASE\_TEMPLATE, you can eliminate 60% of the Apps Script range paint operations.

### **⚡ Streamlined 7-Step Execution Flow**

````
1. DUPLICATE RFF_BASE_TEMPLATE
   └─ Inherits fonts (Arial 10pt), alignments, clip wrap, & base 25px row heights

2. RESIZE GRID & APPLY BORDERS
   └─ Set exact (rowCount x colCount) and draw outer grid borders

3. APPLY NATIVE ROW BANDING
   └─ Apply alternating colors starting at Row 5 on pure unmerged grid

4. APPLY TITLE ROWS & TABLE HEADERS
   └─ Write A1 title, A2:D2 dates, and Row 4 Section H headers with level fills

5. APPLY COLUMN WIDTHS
   └─ Set column widths in single run-length batches

6. APPLY GOVERNED NUMBER FORMATS (SINGLE PASS)
   └─ Run number/date formatting ONCE at the end of base formatting

7. ENVIRONMENT SETTINGS
   └─ Set frozen views (Row 4), tab color, and create header filter
```[cite: 2, 3]

---

### 📋 Optimized Code Replacement for `buildTemplateFromDashboard_`

In `v1.8.9_2.8_Current_Script`, you can replace `buildTemplateFromDashboard_` with this clean version that eliminates duplicate formatting passes[cite: 3]:

```javascript
function buildTemplateFromDashboard_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing, templateExisted) {
  markFrameworkStep_(timing, "Full template build required: " + sheetDef.templateName);

  const isTemplateCreate = !templateExisted;

  // 1. Resize grid to exact report dimensions
  resizeSheetGrid_(sheet, rowCount, colCount);

  // 2. Clear content/formats only if updating an existing template tab
  if (!isTemplateCreate) {
    clearTemplateForFullBuild_(sheet, sheetDef, timing, templateExisted);
  }

  // 3. Apply base formatting (Borders -> Banding -> Titles -> Headers -> Widths -> Formats)
  applyTemplateBaseFormatting_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing);

  // 4. Write metadata note & signature cache
  writeTemplateMetadata_(sheet, dashboard, sheetDef, colCount, expectedSignature);
  storeTemplateFormatSignature_(sheetDef, expectedSignature);

  // 5. Freeze views, set tab color, and handle sheet visibility
  applyTemplateFreezeAndTabColor_(sheet, dashboard, sheetDef, colCount, timing);

  if (behavior.hiddenTemplate && !RFF_DEFER_TEMPLATE_HIDE_DURING_BATCH_) {
    hideTemplateIfNeeded_(sheet, sheetDef, timing);
  }

  return sheet;
}
```[cite: 3]
````

**No, the spreadsheet grid date formatting (`setNumberFormat` / `getRangeList`) is not causing this specific 14.5–17.3 second delay.**

Unknown

The grid date formatting updates the Google Sheets UI canvas. In contrast, the **Monthly Change Dataset Compilation** bottleneck happens entirely in **Apps Script JavaScript memory** before anything is ever written to the screen.

Unknown+ 1

However, both issues stem from the same architectural pattern: **performing repetitive conversions over and over inside loops instead of transforming data once upfront.**

Unknown

### **🔍 Why In-Memory Dataset Compilation is Slow**

During `compareRawDemoPForSectionReport_`, the script evaluates \~6,000 participant rows across dozens of columns:

Unknown

Total Cell Evaluations≈6,000 rows×50 columns=300,000 calls

Inside those comparison loops:

Unknown

1. `normalizeCompareValue_` is invoked on every single cell.

2. If the cell looks like a date, it invokes `coerceToValidDate_`.

3. `coerceToValidDate_` runs **multiple Regex patterns** (`RFF_RE_MONTH_YEAR`, `RFF_RE_DATE_MDY`) and instantiates new JavaScript `Date` objects repeatedly for the *same cell* across multiple pass signatures.

Executing hundreds of thousands of Regex evaluations and `new Date()` allocations in Apps Script's V8 engine creates massive CPU overhead.

Unknown

### **⚡ The Solution: Single-Pass Upfront Normalization**

Instead of evaluating dates inside the comparison loops, normalize the 2D array **once** during the initial sheet read in `getRawDemoPDataForCompare_`.

Unknown

#### **1\. Transform Values on Read (Single-Pass)**

When pulling raw 2D values from `getRange().getValues()`, convert date values directly to **raw integer timestamps (`date.getTime()`)** or **stable ISO string keys (`YYYY-MM-DD`)**.

Unknown

#### **2\. Fast Primitive Comparison**

Comparing two integers (`1714521600000 === 1714521600000`) or two short string keys in JavaScript takes less than **1 microsecond**, completely bypassing Regex and Date parsing.

Unknown

### **🛠️ Example Implementation**

#### **Step 1: Upfront Cell Normalizer**

JavaScript

````
function normalizeCellForCompareFast_(value) {
  if (value === null || value === undefined) return "";
  
  // Fast path for native Dates
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? "" : value.getTime(); // Store raw integer timestamp
  }
  
  // Fast path for numbers / serial dates
  if (typeof value === "number") {
    return value;
  }
  
  const text = String(value).trim();
  if (!text) return "";
  
  // Fallback date coercion (runs ONCE per cell during initial read)
  const d = coerceToValidDate_(text);
  if (d) return d.getTime(); // Return raw timestamp integer
  
  return text.toLowerCase().replace(/\s+/g, " ");
}
```[cite: 3]

#### Step 2: Pre-Normalize in `getRawDemoPDataForCompare_`
```javascript
function getRawDemoPDataForCompare_(sheet, monthParts) {
  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) return data;

  // Build a parallel pre-normalized comparison matrix in a single pass
  const compareMatrix = data.values.map(function(row) {
    return row.map(function(cell) {
      return normalizeCellForCompareFast_(cell);
    });
  });

  data.compareMatrix = compareMatrix;
  return data;
}
```[cite: 3]

#### Step 3: Ultra-Fast Comparison Loop
In `buildRowsSignatureForCompare_` or cell comparisons, read directly from `compareMatrix` instead of calling `normalizeCompareValue_` or `coerceToValidDate_`[cite: 3]:

```javascript
// BEFORE (Slow: Regex + Date instantiation on every iteration):
// if (normalizeCompareValue_(valA) !== normalizeCompareValue_(valB)) ...

// AFTER (Blazing Fast: Primitive integer / string comparison):
if (rowA_compare[colIdx] !== rowB_compare[colIdx]) {
  // Change detected!
}
```[cite: 3]

---

### 📊 Expected Performance Gain
By pre-normalizing the dataset during the initial read, `compareRawDemoPForSectionReport_` execution time will drop from **14.5–17.3 seconds down to under 1.5 seconds**.
````

**Yes, absolutely\!** You hit on the ultimate architectural win here.

If the source data is cleaned and coerced into **true Date values** when `formatMonthlySheets` (or `formatRawData`) builds and formats those sheets, Google Sheets will store them as underlying serial date numbers.

Unknown

When Apps Script reads those sheets later during the Monthly Change workflow, `getValues()` will automatically hand you native JavaScript `Date` objects—allowing you to bypass regex checks and date parsing completely\!

Unknown

## **💡 How Google Sheets `getValues()` Behaves**

To understand why this works so well, look at how Apps Script reads cells from the spreadsheet grid:

Unknown

* **Raw Text String in Cell (`"05/01/2026"`):** `getValues()` returns a JavaScript `String` (`"05/01/2026"`). This forces downstream code to run expensive Regex (`RFF_RE_DATE_MDY`) and `new Date(...)` allocations over and over to figure out if it's a date.

* **True Date Object in Cell (Formatted as Date):** `getValues()` returns a native JavaScript `Date` object (`Fri May 01 2026 00:00:00 GMT...`).

If `formatMonthlySheets` handles the date coercion **once** during the initial output write, the spreadsheet grid holds clean Date objects.

Unknown

## **⚡ The Two-Step Fast Pipeline**

### **Step 1: Normalize & Write True Dates During `formatMonthlySheets`**

When processing Raw Data or sub-reports during `formatMonthlySheets`, convert date strings into actual `Date` objects before calling `.setValues()`:

Unknown

JavaScript

```
// Inside formatRawData / formatMonthlySheets prior to setValues():
headers.forEach(function(header, colIdx) {
  if (isDateLikeHeader_(header)) {
    // Coerce raw text strings to true JS Date objects ONCE
    row[colIdx] = coerceToValidDate_(row[colIdx]); 
  }
});
```

When written to the sheet with a Date Number Format (e.g., `m/d/yy`), Google Sheets locks them in as true dates.

Unknown

### **Step 2: Instant Comparison During `buildMonthlyChangeReport`**

When `compareRawDemoPForSectionReport_` runs later, `getValues()` returns pre-parsed `Date` objects. Your comparison normalizer shrinks to a **single fast-path check**:

Unknown+ 1

JavaScript

```
function normalizeCellForCompareFast_(value) {
  if (value === null || value === undefined) return "";
  
  // ⚡ INSTANT FAST-PATH: Native Date objects from getValues()
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? "" : value.getTime(); // Instant integer timestamp!
  }
  
  // Primitive Numbers
  if (typeof value === "number") return value;
  
  // Text Strings (Non-date columns)
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}
```

## **🎯 Summary of Gains**

1. **Zero Regex in Comparison Loops:** Eliminates thousands of `text.match(RFF_RE_DATE_MDY)` evaluations across the 6,000 comparison rows.

2. **Zero `new Date()` Allocations:** Eliminates memory thrashing from repeated date instantiations.

3. **Pristine Spreadsheet Grid:** Ensures every date on your output sheets is recognized by Google Sheets as a real date for filtering and sorting.

**Yes, absolutely.**

When date values are coerced into real JavaScript `Date` objects during the initial formatting pass, Google Sheets stores them under the hood as serial date numbers.

When you later read those values using `getValues()` and copy them into new output sheets (like Demo P or Master List), Google Sheets retains those values as true dates. As long as the destination column on the target template carries a Date number format (e.g., `mm/dd/yyyy`), the dates will display perfectly without requiring any string parsing or re-formatting downstream.

Unknown

### **🔄 How Dates Flow Through the Pipeline**

1. **Step 1: Initial Read & Coercion (`formatMonthlySheets`)**  
   * Raw text strings (e.g., `"05/01/2026"`) are converted once into true JavaScript `Date` objects via `coerceToValidDate_` before calling `.setValues()` on the monthly source sheets.

   * The destination columns on those sheets are formatted as dates using `m/d/yyyy`.

2. **Step 2: Sheet-to-Sheet Transfer (In-Memory `getValues()` / `setValues()`)**  
   * When building **Demo P**, **Master List**, or running **Monthly Change**, calling `getValues()` on the formatted source sheet returns native JavaScript `Date` objects (`Date` type instead of `String`).

   * When these `Date` objects are array-mapped and written to the output sheet via `.setValues()`, Google Sheets accepts them directly as serial dates.

3. **Step 3: Downstream Processing & Comparisons**  
   * **Comparison Engine (`Monthly Change`):** Evaluating `value instanceof Date` or checking `date.getTime()` runs instantly in memory without Regex parsing.

   * **Output Templates:** Because the output template tab already has the `m/d/yyyy` number format applied to date columns from Section G, the dates render correctly automatically.

### **⚠️ Two Quick Rules to Ensure Formats Are Retained**

* **Never Use `.getDisplayValues()` for Data Processing:** Always use `.getValues()`. Calling `getDisplayValues()` converts real date objects back into text strings (e.g., `"5/1/2026"`), which destroys the underlying Date object.

* **Maintain Number Formatting on Templates:** Ensure the column definitions in Section G of your **Format Dashboard** have `Date Column` set to `TRUE` (or a specific date number format assigned). This guarantees the destination cells on child templates are ready to display the raw Date values seamlessly.

**Yes, exactly.**

Using Plain Text (`@`) or General for non-date columns is essential to prevent Google Sheets from accidentally corrupting numeric identifiers or alphanumeric data.

### **🛡️ Why Non-Date Columns Need Plain Text Formatting (`@`)**

If non-date columns default to standard numeric/General formatting, Google Sheets automatically tries to guess data types. This creates several common data corruption issues:

1. **PMR Numbers & IDs with Leading Zeros:**  
   * **Problem:** An ID like `001234` gets converted to the integer `1234` if written as standard numbers.  
   * **Solution with `@`:** Retains the exact string `"001234"`.  
2. **Phone Numbers & ZIP Codes:**  
   * **Problem:** A ZIP code like `02138` becomes `2138`, or phone strings get treated as math expressions.  
   * **Solution with `@`:** Preserves strings like `"02138"` and `"(555) 012-3456"` intact.  
3. **Hyphenated Identifiers mistaken for Dates:**  
   * **Problem:** An internal code or case number like `10-12` can be misinterpreted by Sheets as **October 12th** and converted into a date serial number.  
   * **Solution with `@`:** Locks the value as literal text `"10-12"`.

### **⚙️ How Your Framework Enforces This**

In your dashboard architecture, this is governed in **Section A (Global Settings)** and **Section G (Column Definitions)**:

* **Global Text Format Setting:** `defaultTextFormat` is defined as `"@"`.  
* **Governed Format Pass (`applyGovernedTextAndNumberFormats_`):** When building templates or formatting output sheets, any column that is **not** flagged as a `dateColumn` or given a explicit custom number format receives the `@` (Plain Text) number format:

JavaScript

```
// Logic in applyGovernedTextAndNumberFormats_:
let format = String(columnDef.numberFormat || "").trim();
if (!format) {
  // If Date Column -> "mm/dd/yyyy"; Otherwise -> "@" (Plain Text)
  format = (columnDef.dateColumn || isDateLikeHeader_(header)) 
    ? (globals.defaultDateFormat || "mm/dd/yyyy") 
    : "@";
}
```

### **🎯 Summary of Your Clean Data Architecture**

| Column Type | Coercion on Read/Write | Target Grid Number Format | Downstream `getValues()` Behavior |
| ----- | ----- | ----- | ----- |
| **Date Columns** | `coerceToValidDate_()` → `Date` Object | `m/d/yyyy` | Native `Date` (Instant `.getTime()` comparison) |
| **Non-Date Columns** | `String(value).trim()` | `@` (Plain Text) | Native `String` (Preserves leading zeros & codes) |

**YES\!** Adding Plain Text (`@`) as the global default on `RFF_BASE_TEMPLATE` is a great architectural performance optimization.

Setting `.setNumberFormat("@")` across the entire `RFF_BASE_TEMPLATE` grid turns Plain Text into the baseline default for all cells before any report templates are copied.

### **🚀 Benefits of Adding Plain Text to the Base Template**

1. **Eliminates Hundreds of Format Calls:** When child templates copy `RFF_BASE_TEMPLATE`, all 50+ columns automatically inherit `@` (Plain Text).  
2. **Simplifies Downstream Formatting:** `applyGovernedTextAndNumberFormats_` no longer has to iterate over and apply `@` to every non-date column. It only needs to issue `setNumberFormat` calls for the specific **Date columns** (and any custom numeric formats).  
3. **Safe Overwrites:** When date columns are updated to `m/d/yyyy`, Google Sheets cleanly overwrites the base `@` format on those specific columns, leaving all non-date columns properly locked as Plain Text without extra script work.

### **🛠️ How to Add It to `ensureGoldenMasterTemplate_`**

In `ensureGoldenMasterTemplate_`, update the base range formatting call to include `.setNumberFormat("@")`:

JavaScript

```
// Inside ensureGoldenMasterTemplate_:
try {
  baseSheet.getRange(1, 1, baseSheet.getMaxRows(), baseSheet.getMaxColumns())
    .setFontFamily(globals.standardFont || "Arial")
    .setFontColor(globals.standardFontColor || "#000000")
    .setFontSize(globals.standardFontSize || 10)
    .setHorizontalAlignment(globals.defaultHorizontalAlignment || "left")
    .setVerticalAlignment(globals.defaultVerticalAlignment || "middle")
    .setWrapStrategy(toWrapStrategy_(globals.defaultDataWrap || "CLIP"))
    .setNumberFormat("@"); // 👈 Bakes Plain Text as the global default across the entire base canvas
} catch (err) {
  logBestEffortWarning_("Golden Master base style skipped: " + err.message);
}
```

### **📋 Resulting Formatting Flow**

```
1. RFF_BASE_TEMPLATE (Universal Baseline)
   └─ Bakes in: Arial 10pt, CLIP Wrap, 25px Row Heights, AND Plain Text ("@") Format

2. CHILD TEMPLATE COPY
   └─ Inherits "@" formatting across ALL columns automatically

3. GOVERNED NUMBER FORMATS (Single Pass)
   └─ Applies "m/d/yy" ONCE ONLY to designated Date columns (overwriting "@")
```

**Yes, exactly.** Adding `.setNumberFormat("@")` is the only code update needed directly inside `ensureGoldenMasterTemplate_` for `RFF_BASE_TEMPLATE`.

Everything else that `RFF_BASE_TEMPLATE` requires—500$\\times$50 grid dimensions, standard font family, size, color, alignments, clip wrapping, row heights, and hidden visibility—is already properly configured in your production function.

### **🛠️ Final `ensureGoldenMasterTemplate_` Function**

Here is your final, streamlined `ensureGoldenMasterTemplate_` ready for production:

JavaScript

```
function ensureGoldenMasterTemplate_(dashboard, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let baseSheet = ss.getSheetByName(RFF_BASE_TEMPLATE_NAME);

  if (!baseSheet) {
    baseSheet = insertGovernedOutputSheet_(ss, RFF_BASE_TEMPLATE_NAME);
  }

  const globals = (dashboard && dashboard.globals) ? dashboard.globals : RFF_DEFAULTS;
  resizeSheetGrid_(baseSheet, 500, 50);

  try {
    baseSheet.getRange(1, 1, baseSheet.getMaxRows(), baseSheet.getMaxColumns())
      .setFontFamily(globals.standardFont || "Arial")
      .setFontColor(globals.standardFontColor || "#000000")
      .setFontSize(globals.standardFontSize || 10)
      .setHorizontalAlignment(globals.defaultHorizontalAlignment || "left")
      .setVerticalAlignment(globals.defaultVerticalAlignment || "middle")
      .setWrapStrategy(toWrapStrategy_(globals.defaultDataWrap || "CLIP"))
      .setNumberFormat("@"); // 👈 Bakes Plain Text as the global default across the base grid
  } catch (err) {
    logBestEffortWarning_("Golden Master base style skipped: " + err.message);
  }

  try {
    safeSetRowHeights_(baseSheet, 1, baseSheet.getMaxRows(), globals.dataRowHeight || 25, "Golden Master Base");
  } catch (err) {
    logBestEffortWarning_("Golden Master row heights skipped: " + err.message);
  }

  hideSheetIfNeeded_(baseSheet, timing, "Golden Master base template hidden");
  if (timing) markFrameworkStep_(timing, "Golden Master base template prepared with Section A globals");
  return baseSheet;
}
```

### **📌 Quick Reference Checklist**

| Property | handeled in `RFF_BASE_TEMPLATE`? | Handled in Dynamic Builder / Output? |
| ----- | ----- | ----- |
| **Fonts, Colors, Sizes** | **YES** | Inherited |
| **Row Heights (25px)** | **YES** | Inherited |
| **Default Wrap (`CLIP`)** | **YES** | Inherited |
| **Plain Text Format (`@`)** | **YES** (New) | Overwritten on Date columns only |
| **Outer Borders** | ❌ No | **YES** (Per report dimensions) |
| **Native Banding** | ❌ No | **YES** (Per theme color) |
| **Title Rows (A1:D3)** | ❌ No | **YES** (Per report title/dates) |
| **Section H Headers** | ❌ No | **YES** (Row 4\) |
| **Care Plan `C1:D1` Merge** | ❌ No | **YES** (Monthly formatting pass only) |

Here is the complete summary of required updates for your **Template Builds** based on our architectural optimizations, along with the clean, production-ready code replacements.

## **🛠️ Summary of Template Build Updates**

### **1\. `RFF_BASE_TEMPLATE` Updates**

* **Bake Plain Text Defaults (`@`):** Add `.setNumberFormat("@")` to `ensureGoldenMasterTemplate_`. Every child template will inherit Plain Text formatting across all columns automatically, leaving only Date/Custom numeric columns to be updated during the single-pass format step.

### **2\. Flatten Template Grids (Zero Merges)**

* **Remove All `.merge()` and `.breakApart()` Calls:** Completely remove merging from `applyTitleRows_` during template construction. Templates must remain 100% unmerged grids to ensure native row banding and grid setup execute cleanly without range conflicts.  
* **Shift Title Merges to Output Creation:** Moves `C1:D1` merging for Care Plan reports strictly to the output creation layer (`formatMonthlySheets` / `formatCarePlanDueOrUnlockedFromDashboard_`).

### **3\. Eliminate Redundant Formatting Passes**

* **Single-Pass Date & Number Formatting:** Remove the 2 extra redundant passes of `applyGovernedTextAndNumberFormats_` and `enforceTemplateDateAndNumberFormats_`. Format Date columns once using `applyGovernedTextAndNumberFormats_`.  
* **Remove Typography Repaints:** Eliminate redundant calls to `.setFontFamily()`, `.setFontSize()`, and `.setWrapStrategy()` across data rows. These are inherited directly when copying `RFF_BASE_TEMPLATE`.

## **📐 The Optimized 7-Step Template Execution Pipeline**

```
1. DUPLICATE RFF_BASE_TEMPLATE
   └─ Inherits: Fonts (Arial 10pt), Alignments, Clip Wrap, 25px Row Heights, & Plain Text ("@")

2. RESIZE GRID & APPLY BORDERS
   └─ Resize to exact (rowCount x colCount) and apply dynamic outer borders

3. APPLY NATIVE ROW BANDING
   └─ Apply theme alternating colors starting at Row 5 on a flat, unmerged canvas

4. APPLY TITLE ROWS & TABLE HEADERS
   └─ Write A1 title, A2:D2 dates, and Row 4 Section H headers with theme level fills (Unmerged)

5. APPLY COLUMN WIDTHS
   └─ Set column widths in run-length batches

6. APPLY GOVERNED NUMBER FORMATS (SINGLE PASS)
   └─ Apply "m/d/yyyy" ONCE ONLY to designated Date columns (overwriting "@")

7. SET ENVIRONMENT SETTINGS
   └─ Set frozen views (Row 4), tab color, and enable header filter
```

## **⚙️ Updated Production Code Blocks**

### **1\. Updated `ensureGoldenMasterTemplate_` (Bakes Plain Text)**

JavaScript

```
function ensureGoldenMasterTemplate_(dashboard, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let baseSheet = ss.getSheetByName(RFF_BASE_TEMPLATE_NAME);

  if (!baseSheet) {
    baseSheet = insertGovernedOutputSheet_(ss, RFF_BASE_TEMPLATE_NAME);
  }

  const globals = (dashboard && dashboard.globals) ? dashboard.globals : RFF_DEFAULTS;
  resizeSheetGrid_(baseSheet, 500, 50);

  try {
    baseSheet.getRange(1, 1, baseSheet.getMaxRows(), baseSheet.getMaxColumns())
      .setFontFamily(globals.standardFont || "Arial")
      .setFontColor(globals.standardFontColor || "#000000")
      .setFontSize(globals.standardFontSize || 10)
      .setHorizontalAlignment(globals.defaultHorizontalAlignment || "left")
      .setVerticalAlignment(globals.defaultVerticalAlignment || "middle")
      .setWrapStrategy(toWrapStrategy_(globals.defaultDataWrap || "CLIP"))
      .setNumberFormat("@"); // 👈 Bakes Plain Text as global default
  } catch (err) {
    logBestEffortWarning_("Golden Master base style skipped: " + err.message);
  }

  try {
    safeSetRowHeights_(baseSheet, 1, baseSheet.getMaxRows(), globals.dataRowHeight || 25, "Golden Master Base");
  } catch (err) {
    logBestEffortWarning_("Golden Master row heights skipped: " + err.message);
  }

  hideSheetIfNeeded_(baseSheet, timing, "Golden Master base template hidden");
  if (timing) markFrameworkStep_(timing, "Golden Master base template prepared with Section A globals");
  return baseSheet;
}
```

### **2\. Updated `applyTitleRows_` (Pure Flat Grid \- Zero Merges)**

JavaScript

```
function applyTitleRows_(sheet, dashboard, sheetDef, theme, colCount) {
  const globals = dashboard.globals;
  const row1 = ensureTitleRowConfig_(getTitleRowConfigForSheet_(dashboard, sheetDef, 1), 1, globals);
  const row2 = ensureTitleRowConfig_(getTitleRowConfigForSheet_(dashboard, sheetDef, 2), 2, globals);
  const row3 = ensureTitleRowConfig_(getTitleRowConfigForSheet_(dashboard, sheetDef, 3), 3, globals);
  const row4 = ensureTitleRowConfig_(getTitleRowConfigForSheet_(dashboard, sheetDef, 4), 4, globals);

  // 1. Format background colors, fonts, and alignments across title rows (Unmerged)
  [row1, row2, row3, row4].forEach(function(rowConfig) {
    if (!rowConfig || !rowConfig.row) return;
    try {
      sheet.setRowHeight(rowConfig.row, rowConfig.height);
    } catch (err) {
      logBestEffortWarning_("Title row height skipped for row " + rowConfig.row + ": " + err.message);
    }
    sheet.getRange(rowConfig.row, 1, 1, colCount)
      .setBackground(getThemeFillForTitleRow_(theme, rowConfig.fillLevel))
      .setFontSize(rowConfig.fontSize)
      .setFontWeight(rowConfig.fontWeight)
      .setHorizontalAlignment(rowConfig.alignment)
      .setVerticalAlignment("middle")
      .setWrapStrategy(toWrapStrategy_(rowConfig.wrap));
  });

  // 2. Stamp Title Text to Cell A1
  sheet.getRange(row1.targetCell || "A1")
    .setValue(sheetDef.reportTitle)
    .setFontSize(row1.fontSize || globals.titleFontSize)
    .setFontWeight(row1.fontWeight || "bold")
    .setWrapStrategy(toWrapStrategy_(row1.wrap || "OVERFLOW"))
    .setVerticalAlignment("middle");

  // 3. Set Date Range Header Labels
  sheet.getRange("A2").setValue("Date");
  if (row2.label) sheet.getRange("A2").setValue(row2.label);
  sheet.getRange("B2").setValue("").setNumberFormat(globals.defaultDateFormat);
  sheet.getRange("C2").setValue("to").setHorizontalAlignment("center");
  sheet.getRange("D2").setValue("").setNumberFormat(globals.defaultDateFormat);
}
```

### **3\. Streamlined `buildTemplateFromDashboard_` (Single Pass Build)**

JavaScript

```
function buildTemplateFromDashboard_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, expectedSignature, timing, templateExisted) {
  markFrameworkStep_(timing, "Full template build required: " + sheetDef.templateName);

  const isTemplateCreate = !templateExisted;

  // 1. Set Exact Dimensions
  resizeSheetGrid_(sheet, rowCount, colCount);

  // 2. Clear content/formats only if refreshing an existing template tab
  if (!isTemplateCreate) {
    clearTemplateForFullBuild_(sheet, sheetDef, timing, templateExisted);
  }

  // 3. Apply Base Formatting Pipeline (Borders -> Banding -> Title Rows -> Headers -> Column Widths -> Single Pass Date Formats)
  applyTemplateBaseFormatting_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing);

  // 4. Write Metadata & Signature Cache (Skips double date format enforcement pass)
  writeTemplateMetadata_(sheet, dashboard, sheetDef, colCount, expectedSignature);
  storeTemplateFormatSignature_(sheetDef, expectedSignature);

  // 5. Freeze Viewports & Set Tab Palette
  applyTemplateFreezeAndTabColor_(sheet, dashboard, sheetDef, colCount, timing);

  // 6. Enforce Visibility Policy
  if (behavior.hiddenTemplate && !RFF_DEFER_TEMPLATE_HIDE_DURING_BATCH_) {
    hideTemplateIfNeeded_(sheet, sheetDef, timing);
  }

  return sheet;
}
```

Here is the complete, production-ready **Codex / AI Engineering Prompt** to implement the **Template Rebuild Engine** (`rebuildAllTemplates` / `rebuildTemplateCanvas`).

This orchestrator is designed to safely purge, regenerate, and restyle all `Template - [SheetType]` sheets across your spreadsheet—ensuring that layout updates, headers, and Section G default styling propagate to every canvas without corrupting active output reports.

# **📜 Codex Prompt: Template Rebuild Engine Implementation & Updates**

```
TASK INSTRUCTION:
Implement and refactor the Template Rebuild Engine (`rebuildAllTemplates` and `rebuildTemplateCanvas`) in the Google Apps Script codebase based on the specification below.

OVERVIEW:
The Template Rebuild Engine serves as the core infrastructure maintenance module. It dynamically regenerates all master template canvases (`Template - [SheetType]`) directly from Section G (`Column Definitions`) and Section C (`Sheet Configurations`) of the Format Dashboard. This guarantees that all downstream report generators write into pre-painted, 100% visible, perfectly styled, and structurally uniform templates.

REQUIREMENTS & ARCHITECTURE:

1. TEMPLATE VISIBILITY RULE:
   - Templates MUST ALWAYS BE 100% VISIBLE across all columns. 
   - NEVER apply column hiding (Section G `hideColumn = true`) to template sheets. Column hiding is reserved strictly for active output sheets during report finalization via `applyColumnHidingFromDashboard_`.

2. IN-MEMORY TEMPLATE GENERATION & STYLING:
   - Locate or instantiate the target template sheet: `Template - [SheetType]`.
   - Clear existing content, grid rules, and formatting from row 1 down.
   - Inject Section G Header Row at `HEADER_ROW` (Row 1):
     * Apply primary header styling: Font weight Bold, Font size 10pt, Vertical alignment "Top", Wrap Text enabled.
     * Apply default header background colors from Section G configuration.
   - Set Default Data Row Styling at `DATA_START_ROW` (Row 2):
     * Set row height to 21px.
     * Apply cell border formatting (light gray gridlines `#D9D9D9`).
     * Set vertical alignment to "Top".
     * Set default number/date formats per Section G definitions (e.g., `MM/DD/YYYY` for dates).

3. SAFETY & PROTECTED CANVASES:
   - Wrap template re-creation in a transaction lock to prevent race conditions during automated monthly triggers.
   - If a template sheet exists, clear and rebuild it in-place rather than deleting and recreating the tab (to preserve explicit formula references or sheet ID bindings where applicable).
   - Show/Unhide all template tabs (`sheet.showSheet()`) so administrators can audit layout structures easily.

4. BATCH REBUILD ORCHESTRATOR (`rebuildAllTemplates`):
   - Iterate through all defined `SHEET_TYPE` constants.
   - Rebuild each corresponding `Template - [SheetType]` sequentially.
   - Log timing metrics and step progress via `runFrameworkTimed_`.

--------------------------------------------------------------------------------
PROPOSED JS IMPLEMENTATION:

/**
 * Main orchestrator: Rebuilds all system template canvases from Dashboard definitions.
 */
function rebuildAllTemplates() {
  return runFrameworkTimed_("Rebuild All System Templates", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboard = loadDashboardConfig_();

    const templateTypes = [
      SHEET_TYPE.REFINED_DATA,
      SHEET_TYPE.DISENROLLED_EXCLUSION,
      SHEET_TYPE.CARE_PLAN_DUE,
      SHEET_TYPE.BANNERS,
      SHEET_TYPE.UNLOCKED_CP,
      SHEET_TYPE.MONTHLY_CHANGE,
      SHEET_TYPE.MASTER_LIST
    ];

    let rebuiltCount = 0;
    templateTypes.forEach(sheetType => {
      try {
        rebuildTemplateCanvas_(ss, sheetType, dashboard);
        rebuiltCount++;
        markFrameworkStep_(timing, "Rebuilt template: Template - " + sheetType);
      } catch (err) {
        logBestEffortWarning_("Template rebuild failed for " + sheetType + ": " + err.message);
      }
    });

    notify_("Template Rebuild Complete.\nSuccessfully rebuilt " + rebuiltCount + " master templates.");
  });
}

/**
 * Safely rebuilds an individual template canvas strictly from Section G column definitions.
 */
function rebuildTemplateCanvas_(ss, sheetType, dashboard) {
  dashboard = dashboard || loadDashboardConfig_();
  const templateName = "Template - " + sheetType;
  
  // 1. Locate or Create Template Sheet
  let templateSheet = ss.getSheetByName(templateName);
  if (!templateSheet) {
    templateSheet = ss.insertSheet(templateName);
  }

  // Ensure Template Sheet Tab is 100% Unhidden/Visible
  templateSheet.showSheet();

  // 2. Fetch Section G Header Config for this Sheet Type
  const headers = getDashboardHeadersForSheetType_(sheetType, dashboard);
  if (!headers || !headers.length) {
    throw new Error("No Section G column definitions found for sheet type: " + sheetType);
  }

  const width = headers.length;

  // 3. Clear Existing Canvas Content & Formatting
  templateSheet.clear();
  templateSheet.clearFormats();

  // Unhide ALL columns on template (Templates remain 100% visible)
  const maxCols = Math.max(templateSheet.getMaxColumns(), width);
  templateSheet.showColumns(1, maxCols);

  // Resize columns to fit header count if needed
  if (templateSheet.getMaxColumns() < width) {
    templateSheet.insertColumnsAfter(templateSheet.getMaxColumns(), width - templateSheet.getMaxColumns());
  }

  // 4. Write & Style Header Row (Row 1)
  const headerRange = templateSheet.getRange(HEADER_ROW, 1, 1, width);
  headerRange.setValues([headers]);
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  headerRange.setVerticalAlignment("top");
  headerRange.setWrapText(true);
  headerRange.setBackground("#EBF4F9"); // Standard crisp header fill
  headerRange.setFontColor("#000000");
  templateSheet.setRowHeight(HEADER_ROW, 35);

  // 5. Setup & Style Default Data Row (Row 2 - Sample Grid Canvas)
  const sampleDataRow = templateSheet.getRange(DATA_START_ROW, 1, 1, width);
  templateSheet.setRowHeight(DATA_START_ROW, 21);
  sampleDataRow.setVerticalAlignment("top");
  sampleDataRow.setFontSize(10);
  sampleDataRow.setFontFamily("Arial");
  
  // Apply Default Bounding Gridlines
  sampleDataRow.setBorder(
    true, true, true, true, true, true, 
    "#D9D9D9", SpreadsheetApp.BorderStyle.SOLID
  );

  // Apply Specific Column Formats (Dates, Numbers) from Section G
  const colDefs = dashboard.columnDefinitions || {};
  headers.forEach((colName, idx) => {
    const colIndex = idx + 1;
    const def = colDefs[colName];
    if (def && def.numberFormat) {
      templateSheet.getRange(DATA_START_ROW, colIndex, templateSheet.getMaxRows() - DATA_START_ROW + 1, 1)
        .setNumberFormat(def.numberFormat);
    }
  });

  // 6. Freeze Header Row & Clean Cache
  templateSheet.setFrozenRows(HEADER_ROW);
  clearSheetRuntimeCachesForSheet_(templateSheet);

  return templateSheet;
}

/**
 * Resolves Section G headers configured for a specific sheet type.
 */
function getDashboardHeadersForSheetType_(sheetType, dashboard) {
  if (dashboard && dashboard.sheetConfigs && dashboard.sheetConfigs[sheetType]) {
    return dashboard.sheetConfigs[sheetType].headers || [];
  }
  // Fallback lookup via Section G global column definitions
  return Object.keys(dashboard.columnDefinitions || {});
}
--------------------------------------------------------------------------------

Verify that all template rebuild actions execute seamlessly without hiding columns on template tabs, preserving the full structural schema. 
```

