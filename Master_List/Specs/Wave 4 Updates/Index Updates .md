# **Index Updates** 

To integrate **System Sheets** seamlessly into your **Format Dashboard**, you need to update the configuration functions that read, write, and repair the dashboard definitions.

Specifically, the dashboard already has **`SECTION E - SYSTEM SHEET SURFACES`** defined in `getDefaultSystemSurfaceRows_()`. However, to make sure system surface properties (like tab colors, display titles, sort orders, and visibility) are dynamically governed during setup and template builds, you need to ensure Section E is included in the dashboard parser and section initializers.

### **🛠️ Key Updates Required for Format Dashboard**

#### **1\. Update `loadDashboardConfig_` to Parse Section E**

Currently, `loadDashboardConfig_` reads Sections A, B, C, F, G, and H, but leaves out system surfaces. You must add `loadSystemSurfaces_` to the returned dashboard object:

JavaScript

```
function loadDashboardConfig_(forceRefresh) {
  const cacheKey = getDashboardConfigCacheKey_();
  const cache = getRuntimeCache_();
  if (!forceRefresh && cache.dashboardConfig && cache.dashboardConfigKey === cacheKey) {
    return cache.dashboardConfig;
  }

  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
  if (!sheet) {
    try {
      sheet = SpreadsheetApp.openById(ss.getId()).getSheetByName(RFF_DASHBOARD_SHEET);
    } catch (err) {}
  }
  if (!sheet) throw new Error("Format Dashboard is missing. Run Setup / Refresh Dashboard first.");

  const dashboardIndex = buildDashboardSectionIndex_(sheet);
  const globals = loadGlobalSettings_(dashboardIndex);
  const titleRows = loadTitleRows_(dashboardIndex, globals);
  const sheetDefinitions = loadSheetDefinitions_(dashboardIndex);
  const tabOrganization = loadTabOrganization_(dashboardIndex);
  const sheetHeaders = loadSheetHeaders_(dashboardIndex);
  const columnDefinitions = loadColumnDefinitions_(dashboardIndex);
  const behaviors = loadSheetBehaviors_(dashboardIndex);
  const systemSurfaces = loadSystemSurfaces_(dashboardIndex); // 👈 Added Section E parsing

  const dashboard = {
    globals: globals,
    titleRows: titleRows,
    sheetDefinitions: sheetDefinitions,
    tabOrganization: tabOrganization,
    sheetHeaders: sheetHeaders,
    columnDefinitions: columnDefinitions,
    behaviors: behaviors,
    systemSurfaces: systemSurfaces, // 👈 Exposed to framework
    sectionIndex: dashboardIndex
  };

  cache.dashboardConfig = dashboard;
  cache.dashboardConfigKey = cacheKey;
  return dashboard;
}
```

#### **2\. Add `loadSystemSurfaces_` Parser Function**

Create the parser function to read the Section E rows from the dashboard canvas:

JavaScript

```
function loadSystemSurfaces_(sheet) {
  let rows = [];
  try {
    rows = readDashboardSectionRows_(sheet, RFF_SECTION_SYSTEM_SURFACES);
  } catch (err) {
    logBestEffortWarning_("System surfaces dashboard lookup skipped: " + err.message);
    rows = getDefaultSystemSurfaceRows_();
  }

  const map = {};
  (rows || []).forEach(function(row) {
    const systemName = String(row[0] || "").trim();
    if (!systemName) return;

    map[systemName] = {
      systemSheetName: systemName,
      displayName: String(row[1] || systemName).trim(),
      sortOrder: numberOrDefault_(row[2], 500),
      outputVisibility: String(row[3] || "VISIBLE").trim().toUpperCase(),
      titleFillColor: normalizeHex_(row[4] || "#D9EAF7"),
      titleFontColor: normalizeHex_(row[5] || "#000000"),
      useGlobalDefaults: parseBoolean_(row[6]),
      notes: String(row[7] || "").trim()
    };
  });

  return map;
}
```

#### **3\. Verify Default System Surface Definitions (`getDefaultSystemSurfaceRows_`)**

Confirm that your default system sheet surface definitions match the expected framework surfaces:

JavaScript

````
function getDefaultSystemSurfaceRows_() {
  return [
    ["Framework Timing Report", "Framework Timing Report", 500, "VISIBLE", RFF_SYSTEM_SHEET_TITLE_COLOR, "#000000", true, "Unified timing report surface"],
    ["Dashboard Quality Report", "Dashboard Quality Report", 501, "VISIBLE", RFF_SYSTEM_SHEET_TITLE_COLOR, "#000000", true, "Unified quality report surface"],
    [RFF_DASHBOARD_SHEET, "Format Dashboard", 502, "VISIBLE", RFF_SYSTEM_SHEET_TITLE_COLOR, "#000000", true, "Dashboard configuration surface"],
    [DEMO_P_ARCHIVE_SHEET, DEMO_P_ARCHIVE_SHEET, 350, "HIDDEN", "#657FCC", "#000000", true, "Hidden Demo P row archive"],
    [RFF_BASE_TEMPLATE_NAME, RFF_BASE_TEMPLATE_NAME, 809, "HIDDEN", RFF_SYSTEM_SHEET_TITLE_COLOR, "#000000", true, "Hidden framework base template"]
  ];
}
```[cite: 1]

---

### 📌 Summary of Architecture Results
* **Section E Dynamic Linking:** System surfaces (`Framework Timing Report`, `Dashboard Quality Report`, `Format Dashboard`, `Archive - Demo P`, and `RFF_BASE_TEMPLATE`) are now formally recognized in `dashboard.systemSurfaces`[cite: 1].
* **Consistent Visibility & Styling:** Any visibility policy or tab sorting applied across the workbook can query `dashboard.systemSurfaces[sheetName]` to enforce correct display states without hardcoded overrides[cite: 1].
````

### **1\. Columns Defined for Section E (`SECTION E - SYSTEM SHEET SURFACES`)**

Section E uses an **8-column structure**:

| Col \# | Column Header | Data Type / Example Value | Description / Purpose |
| ----- | ----- | ----- | ----- |
| **1** | **System Sheet Name** | `Framework Timing Report` | The exact string key/name of the system tab.  |
| **2** | **Display Name** | `Framework Timing Report` | UI label used for index and headers.  |
| **3** | **Sort Order** | `500` | Numeric rank for workbook tab order.  |
| **4** | **Output Visibility** | `VISIBLE` or `HIDDEN` | Controls whether the framework leaves it visible or hides it.  |
| **5** | **Title Fill Color** | `#D9EAF7` | Hex color used for title background styling.  |
| **6** | **Title Font Color** | `#000000` | Hex color for text inside title blocks.  |
| **7** | **Use Global Defaults** | `TRUE` / `FALSE` | Flag determining whether to inherit Section A fonts/sizes.  |
| **8** | **Notes** | `Unified timing report surface` | Reference documentation string.  |

### **2\. Code Updates Required to Target Section E Correctly**

Because `readDashboardSectionRows_` searches for section bounds dynamically using section title strings (`SECTION E - SYSTEM SHEET SURFACES`) rather than hardcoded row numbers, you do **not** need to worry about row shifts.

However, **two code updates** are required to ensure the system reads and exposes Section E during runtime:

#### **Update A: Add `loadSystemSurfaces_` to `loadDashboardConfig_`**

Currently, `loadDashboardConfig_` in your production script parses Sections A, B, C, F, G, and H, but skips Section E. Add `loadSystemSurfaces_` so the dashboard configuration object includes `systemSurfaces`:

JavaScript

````
// Inside loadDashboardConfig_(forceRefresh):
const dashboardIndex = buildDashboardSectionIndex_(sheet);
const globals = loadGlobalSettings_(dashboardIndex);
const titleRows = loadTitleRows_(dashboardIndex, globals);
const sheetDefinitions = loadSheetDefinitions_(dashboardIndex);
const tabOrganization = loadTabOrganization_(dashboardIndex);
const sheetHeaders = loadSheetHeaders_(dashboardIndex);
const columnDefinitions = loadColumnDefinitions_(dashboardIndex);
const behaviors = loadSheetBehaviors_(dashboardIndex);
const systemSurfaces = loadSystemSurfaces_(dashboardIndex); // 👈 ADD THIS READ

const dashboard = {
  globals: globals,
  titleRows: titleRows,
  sheetDefinitions: sheetDefinitions,
  tabOrganization: tabOrganization,
  sheetHeaders: sheetHeaders,
  columnDefinitions: columnDefinitions,
  behaviors: behaviors,
  systemSurfaces: systemSurfaces, // 👈 EXPOSE TO DASHBOARD OBJECT
  sectionIndex: dashboardIndex
};
```[cite: 1]

---

#### Update B: Add the `loadSystemSurfaces_` Reader Function
Add this function to parse Section E directly using the existing `readDashboardSectionRows_` engine[cite: 1]:

```javascript
function loadSystemSurfaces_(sheet) {
  let rows = [];
  try {
    rows = readDashboardSectionRows_(sheet, RFF_SECTION_SYSTEM_SURFACES);
  } catch (err) {
    logBestEffortWarning_("System surfaces dashboard lookup skipped: " + err.message);
    rows = getDefaultSystemSurfaceRows_();
  }

  const map = {};
  (rows || []).forEach(function(row) {
    const systemName = String(row[0] || "").trim();
    if (!systemName) return;

    map[systemName] = {
      systemSheetName: systemName,
      displayName: String(row[1] || systemName).trim(),
      sortOrder: numberOrDefault_(row[2], 500),
      outputVisibility: String(row[3] || "VISIBLE").trim().toUpperCase(),
      titleFillColor: normalizeHex_(row[4] || "#D9EAF7"),
      titleFontColor: normalizeHex_(row[5] || "#000000"),
      useGlobalDefaults: parseBoolean_(row[6]),
      notes: String(row[7] || "").trim()
    };
  });

  return map;
}
```[cite: 1]

---

### 🔍 Verification Checklist

1. **Header Alignment:** Ensure `getFormatDashboardExpectedSectionHeaders_()` defines Section E with the exact 8 headers above[cite: 1]. *(Already correct in your script)*[cite: 1].
2. **Default Generator:** Ensure `writeDashboardDefaultsFast_` appends `RFF_SECTION_SYSTEM_SURFACES` during dashboard default rebuilds[cite: 1]. *(Already correct in your script)*[cite: 1].
3. **Section Constant:** Confirm `const RFF_SECTION_SYSTEM_SURFACES = "SECTION E - SYSTEM SHEET SURFACES";` matches the text in your Format Dashboard tab[cite: 1]. *(Already correct in your script)*[cite: 1].
````

To add **Level 5** to your theme color palette and ensure HSL conversions execute **only once per hex color** (rather than running expensive RGB $\\leftrightarrow$ HSL math repeatedly across loops), you need to make three focused updates:

### **1\. Update Global Settings for Level 5**

Add hslLevel5 to your global defaults and dashboard loader.

#### **A. In RFF\_DEFAULTS (Constant definitions):**

JavaScript

```
// Add hslLevel5 default (e.g., 99% lightness for ultra-light fills/highlights)
hslLevel1: 60,
hslLevel2: 75,
hslLevel3: 85,
hslLevel4: 97,
hslLevel5: 99
```

#### **B. In getDefaultGlobalSettingsRows\_():**

JavaScript

```
// Add to the settings matrix:
["HSL Level 1 Lightness %", 60],
["HSL Level 2 Lightness %", 75],
["HSL Level 3 Lightness %", 85],
["HSL Level 4 Lightness %", 97],
["HSL Level 5 Lightness %", 99] // 👈 Added Level 5
```

#### **C. In loadGlobalSettings\_():**

JavaScript

```
hslLevel1: numberOrDefault_(settings["HSL Level 1 Lightness %"], 60),
hslLevel2: numberOrDefault_(settings["HSL Level 2 Lightness %"], 75),
hslLevel3: numberOrDefault_(settings["HSL Level 3 Lightness %"], 85),
hslLevel4: numberOrDefault_(settings["HSL Level 4 Lightness %"], 97),
hslLevel5: numberOrDefault_(settings["HSL Level 5 Lightness %"], 99) // 👈 Parsed from Dashboard
```

### **2\. Update Runtime Cache Store**

Add a theme cache object to getRuntimeCache\_() so theme palettes persist across the entire script execution lifecycle:

JavaScript

````
function getRuntimeCache_() {
  if (!ML_RUNTIME_CACHE_STORE_) {
    ML_RUNTIME_CACHE_STORE_ = {
      monthlySheets: {},
      headers: {},
      headerMaps: {},
      dimensions: {},
      themeColors: {}, // 👈 Caches theme color palettes by base hex key
      dashboardConfig: null,
      dashboardConfigKey: "",
      tabOrganization: null,
      docProps: null
    };
  }
  return ML_RUNTIME_CACHE_STORE_;
}
```[cite: 1]

---

### 3. Replace `getThemeColorsFromBase_` with Cached 5-Level Engine

Update `getThemeColorsFromBase_` to calculate Levels 1–5 on the first call for a base hex code, store the palette in memory, and return the cached palette on all subsequent calls.

```javascript
function getThemeColorsFromBase_(hex, globals) {
  globals = globals || {};
  const baseHex = normalizeHex_(hex);
  
  // Build a unique key incorporating lightness parameters
  const l1 = numberOrDefault_(globals.hslLevel1, 60);
  const l2 = numberOrDefault_(globals.hslLevel2, 75);
  const l3 = numberOrDefault_(globals.hslLevel3, 85);
  const l4 = numberOrDefault_(globals.hslLevel4, 97);
  const l5 = numberOrDefault_(globals.hslLevel5, 99);
  
  const cacheKey = [baseHex, l1, l2, l3, l4, l5].join("|");
  const cache = getRuntimeCache_().themeColors;

  // ⚡ FAST PATH: Return pre-computed theme if already calculated
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  // Single-pass HSL calculation
  const palette = {
    base: baseHex,
    level1: hexWithHslLightness_(baseHex, l1),
    level2: hexWithHslLightness_(baseHex, l2),
    level3: hexWithHslLightness_(baseHex, l3),
    level4: hexWithHslLightness_(baseHex, l4),
    level5: hexWithHslLightness_(baseHex, l5) // 👈 Added Level 5
  };

  // Cache and return
  cache[cacheKey] = palette;
  return palette;
}
````

### **📊 Performance Impact**

* **Before:** hexToRgb\_, rgbToHsl\_, hslToRgb\_, and rgbToHex\_ executed 4 times *per template/sheet build*.  
* **After:** HSL math runs **exactly once per base color** (e.g., once for Blue \#65A9CC, once for Purple \#7665CC, etc.). All subsequent calls across templates, outputs, or row-banding lookups are instant $O(1)$ memory reads.

Here is the comprehensive architectural review and precise update roadmap for integrating **System Sheets**, **Levels 1–5 Color Governance**, and **Index Navigation** into your framework.

## **🏛️ Executive Summary of Architectural Updates**

1. **System Sheet Integration (Section E):** Standardizes system surfaces (Index, Format Dashboard, Framework Timing Report, Dashboard Quality Report, Archive \- Demo P) into SECTION E — SYSTEM SHEET SURFACES. System surfaces inherit universal fonts, row heights, and borders from Section A while carrying surface-specific color fills, grid bounds, and column widths.  
2. **5-Tier Pre-Calculated Palette (Levels 1–5):** Eliminates runtime HSL/RGB math by exposing pre-calculated Hex codes directly on the dashboard.  
3. **Universal 4-Row Title Header:** Every system surface and report tab adheres to the standard 4-row title block structure (Row 1: Title, Row 2: Date/Metadata, Row 3: Visual Spacer, Row 4: Headers).  
4. **Standardized 3-Row Data Sub-Header Block:** Standardizes dynamic inline section headers across multi-section surfaces (Monthly Change Report, Framework Timing Report, Dashboard Quality Report) into a uniform 3-row tuple (Title Bar $\\rightarrow$ 10px Spacer $\\rightarrow$ Column Headers).

## **📊 1\. Updated Dashboard Schemas**

### **A. Section A (Global Settings Modifiers)**

Add percentage controls for pre-calculating or deriving Levels 1 through 5:

| Setting Parameter | Default Value | Usage Scope |
| :---- | :---- | :---- |
| **HSL Level 1 Lightness %** | 85% | Main Title Banners & System Top Banners (Row 1\) |
| **HSL Level 2 Lightness %** | 55% | Primary Table Headers & System Section Dividers (Row 4\) |
| **HSL Level 3 Lightness %** | 25% | Odd Row Native Banding |
| **HSL Level 4 Lightness %** | 5% | Even Row Native Banding |
| **HSL Level 5 Darken %** | 25% | Dynamic In-Line Sub-Header Banners (Dark Accent) |

### **B. SECTION E — SYSTEM SHEET SURFACES**

Replaces static code constants (RFF\_SYSTEM\_SHEET\_TITLE\_COLOR, hardcoded width arrays) with a fully governed Section E schema:

| System Sheet Name | Display Title | Tab Rank Order | Output Visibility | Grid Column Count | Grid Row Count | Frozen Rows | Frozen Columns | Tab Color | Level 1 Fill (Title Banner) | Level 2 Fill (Section/Header) | Level 3 Fill (Odd Banding) | Level 4 Fill (Even Banding) | Level 5 Fill (Sub-Header Accent) | Column Widths List | Use Global Defaults | Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Format Dashboard** | Format Dashboard | 1 | VISIBLE | 15 | 300 | 1 | 0 | \#65A9CC | \#D9EAF7 | \#A3CCE2 | \#EBF4F9 | \#FFFFFF | \#3D7999 | 250,160,240,180,130,120,160,150,140 | TRUE | Configuration hub |
| **Index** | Master Index | 2 | VISIBLE | 9 | 100 | 4 | 0 | \#65A9CC | \#D9EAF7 | \#A3CCE2 | \#EBF4F9 | \#FFFFFF | \#3D7999 | 100,200,250,80,10,100,200,250,80 | TRUE | Navigation matrix |
| **Framework Timing Report** | Framework Timing Report | 500 | VISIBLE | 8 | 5000 | 1 | 0 | \#D9EAF7 | \#F2F7FB | \#D9EAF7 | \#F7FAFC | \#FFFFFF | \#8CB4D6 | 220,180,475,140,140,260,120,120 | TRUE | Telemetry log |
| **Dashboard Quality Report** | Dashboard Quality Report | 501 | VISIBLE | 7 | 1000 | 1 | 0 | \#FCE5CD | \#FDF4EB | \#FCE5CD | \#FEF9F5 | \#FFFFFF | \#E09A52 | 180,150,350,120,120,200,100 | TRUE | Audit log |
| **Archive \- Demo P** | Archive \- Demo P | 900 | HIDDEN | 24 | 2000 | 4 | 2 | \#B7B7B7 | \#F5F5F5 | \#D9D9D9 | \#FAFAFA | \#FFFFFF | \#737373 | 120,150,150,200,180,140... | TRUE | Disenrollment archive |

## **💻 2\. Apps Script Code Modifications**

### **Update A: Dashboard Config Parser (loadDashboardConfig\_)**

Expose loadSystemSurfaces\_ in loadDashboardConfig\_ so system surface properties are available globally across the engine:

JavaScript

````
function loadDashboardConfig_(forceRefresh) {
  const cacheKey = getDashboardConfigCacheKey_();
  const cache = getRuntimeCache_();
  if (!forceRefresh && cache.dashboardConfig && cache.dashboardConfigKey === cacheKey) {
    return cache.dashboardConfig;
  }

  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
  if (!sheet) {
    try {
      sheet = SpreadsheetApp.openById(ss.getId()).getSheetByName(RFF_DASHBOARD_SHEET);
    } catch (err) {}
  }
  if (!sheet) throw new Error("Format Dashboard is missing. Run Setup / Refresh Dashboard first.");

  const dashboardIndex = buildDashboardSectionIndex_(sheet);
  const globals = loadGlobalSettings_(dashboardIndex);
  const titleRows = loadTitleRows_(dashboardIndex, globals);
  const sheetDefinitions = loadSheetDefinitions_(dashboardIndex);
  const tabOrganization = loadTabOrganization_(dashboardIndex);
  const sheetHeaders = loadSheetHeaders_(dashboardIndex);
  const columnDefinitions = loadColumnDefinitions_(dashboardIndex);
  const behaviors = loadSheetBehaviors_(dashboardIndex);
  const systemSurfaces = loadSystemSurfaces_(dashboardIndex); // 👈 Added Section E parser

  const dashboard = {
    globals: globals,
    titleRows: titleRows,
    sheetDefinitions: sheetDefinitions,
    tabOrganization: tabOrganization,
    sheetHeaders: sheetHeaders,
    columnDefinitions: columnDefinitions,
    behaviors: behaviors,
    systemSurfaces: systemSurfaces, // 👈 Exposed to framework
    sectionIndex: dashboardIndex
  };

  cache.dashboardConfig = dashboard;
  cache.dashboardConfigKey = cacheKey;
  return dashboard;
}
```[cite: 1]

---

### Update B: Add Section E Reader (`loadSystemSurfaces_`)

```javascript
function loadSystemSurfaces_(sheet) {
  let rows = [];
  try {
    rows = readDashboardSectionRows_(sheet, RFF_SECTION_SYSTEM_SURFACES);
  } catch (err) {
    logBestEffortWarning_("System surfaces dashboard lookup skipped: " + err.message);
    rows = getDefaultSystemSurfaceRows_();
  }

  const map = {};
  (rows || []).forEach(function(row) {
    const systemName = String(row[0] || "").trim();
    if (!systemName) return;

    map[systemName] = {
      systemSheetName: systemName,
      displayName: String(row[1] || systemName).trim(),
      sortOrder: numberOrDefault_(row[2], 500),
      outputVisibility: String(row[3] || "VISIBLE").trim().toUpperCase(),
      gridColumnCount: numberOrDefault_(row[4], 8),
      gridRowCount: numberOrDefault_(row[5], 100),
      frozenRows: numberOrDefault_(row[6], 1),
      frozenColumns: numberOrDefault_(row[7], 0),
      tabColor: normalizeHex_(row[8] || "#65A9CC"),
      level1Fill: normalizeHex_(row[9] || "#D9EAF7"),  // Title Banner
      level2Fill: normalizeHex_(row[10] || "#B7DEE8"), // Section / Header
      level3Fill: normalizeHex_(row[11] || "#EBF4F9"), // Odd Banding
      level4Fill: normalizeHex_(row[12] || "#FFFFFF"), // Even Banding
      level5Fill: normalizeHex_(row[13] || "#3D7999"), // Sub-Header Accent
      columnWidths: String(row[14] || "").split(",").map(Number).filter(Boolean),
      useGlobalDefaults: parseBoolean_(row[15]),
      notes: String(row[16] || "").trim()
    };
  });

  return map;
}
```[cite: 1]

---

### Update C: Standardized 3-Row Data Sub-Header Block Helper
Replaces ad-hoc inline section writes in `Monthly Change`, `Timing Report`, and `Quality Report` with this single, high-speed helper[cite: 1]:

```javascript
/**
 * Applies the standardized 3-row sub-header block (Title -> 10px Spacer -> Section Headers)
 */
function applySubHeaderBlock_(sheet, startRow, sectionTitle, headers, dashboard, sheetDef) {
  const colCount = Math.max(headers.length, 1);
  const theme = getThemeColorsFromBase_(sheetDef.baseColor, dashboard.globals);
  
  const titleRow = startRow;
  const spacerRow = startRow + 1;
  const headerRow = startRow + 2;

  // 1. ROW 1: Sub-Header Title Bar (Level 5 Accent Fill)
  const titleRange = sheet.getRange(titleRow, 1, 1, colCount);
  titleRange
    .merge()
    .setValue(sectionTitle)
    .setBackground(sheetDef.level5Fill || theme.level5 || "#3D7999")
    .setFontWeight("bold")
    .setFontSize(11)
    .setFontColor("#FFFFFF")
    .setVerticalAlignment("middle");
  safeSetRowHeights_(sheet, titleRow, 1, 28, "Sub-header title");

  // 2. ROW 2: Blank Visual Spacer Row (10px Height)
  const spacerRange = sheet.getRange(spacerRow, 1, 1, colCount);
  spacerRange
    .breakApart()
    .clearContent()
    .setBackground("#FFFFFF");
  safeSetRowHeights_(sheet, spacerRow, 1, 10, "Sub-header spacer");

  // 3. ROW 3: Section Table Headers (Level 2 Tint Fill)
  const headerRange = sheet.getRange(headerRow, 1, 1, colCount);
  headerRange
    .breakApart()
    .setValues([headers])
    .setBackground(sheetDef.level2Fill || theme.level2 || "#B7DEE8")
    .setFontWeight("bold")
    .setFontSize(10)
    .setFontColor("#000000")
    .setVerticalAlignment("middle");
  safeSetRowHeights_(sheet, headerRow, 1, 35, "Sub-header headers");
}
```[cite: 1]

---

## 📌 Index Navigation Sheet Specifics

1. **Top Title Structure:** The `Index` sheet uses the exact same 4-row header (Rows 1–4) governed by Section E (Title in `A1`, Date stamp in `B2`, Frozen Rows: 4)[cite: 1].
2. **Category Dividers vs Data Sub-Headers:** The body of the `Index` sheet uses **1-row category dividers** (e.g., *Core Operational*, *Monthly Sub-Reports*, *System Surfaces*) driven by Section F Tab Grouping, rather than the 3-row data sub-header tuple[cite: 1].
3. **Automated Order Alignment:** When `createIndexSheet()` runs, it queries `dashboard.systemSurfaces` and `dashboard.tabOrganization` to build the link matrix dynamically without hardcoded sheet names or colors[cite: 1].
````

### **🔄 How the Population Works in Practice**

#### **1\. On Dashboard Creation / Rebuild (writeDashboardDefaultsFast\_)**

When setupReportFormattingDashboard runs, it generates the exact 6-character Hex strings for Levels 1–5 for every sheet archetype (Section C) and system surface (Section E). It computes these directly from:

$$\\text{Base Hex (e.g., \\\#65A9CC)} \+ \\text{Section A Percentage Modifiers}$$

If you use Google Sheet custom formulas (\=CALC\_COLOR(E2, SecA\_L1)), editing either the **Base Color** or a **Section A percentage** instantly updates all derived Level 1–5 Hex cells on the dashboard.

#### **2\. At Script Runtime (getThemeColorsFromBase\_)**

When the script runs a workflow, loadDashboardConfig\_ reads those pre-calculated hex codes directly from Section C / Section E.

If a level cell is ever left blank on the dashboard, the cached engine falls back to evaluating the base color against Section A settings on the fly—calculating it **once** and storing it in memory:

JavaScript

````
// Runtime Single-Pass Theme Map
{
  base:   "#65A9CC", // Base Color
  level1: "#D9EAF7", // Title Banners (~85% Lighten)
  level2: "#A3CCE2", // Primary Headers (~55% Lighten)
  level3: "#EBF4F9", // Odd Row Banding (~25% Lighten)
  level4: "#FFFFFF", // Even Row Banding (~5% Lighten)
  level5: "#3D7999"  // Dynamic Sub-Headers (~25% Darken)
}
```[cite: 1, 2]

---

### 🎨 The Big Advantage: Instant Overrides

Because the final calculated values exist as **explicit Hex strings** in the table columns, you get full administrator control[cite: 1, 2]:
* **Automated:** By default, everything is mathematically harmonized based on Section A percentages[cite: 1, 2].
* **Manual Override:** If you want a specific sheet (like *Monthly Change*) to have a custom dark contrast color for its sub-headers, you can type or paste `#4A235A` directly into its **Level 5 Fill** cell, and the script will use your custom hex string instead[cite: 1, 2]!
````

 

When you run **Setup / Rebuild Format Dashboard** (rebuildFormatDashboardDefaults or setupReportFormattingDashboardFromScriptDefaults\_), it will automatically compute and write the exact Level 1 through Level 5 hex codes into every row of **Section C (Sheet Definitions)** and **Section E (System Sheet Surfaces)**.

### **🔄 What Happens When You Build the Format Dashboard**

When the script builds the dashboard tab, it executes this sequence:

````
                       rebuildFormatDashboardDefaults
                                     │
                   1. Read Section A HSL Percentages
                      (Level 1: 85%, Level 2: 55%, etc.)
                                     │
                   2. Loop Through Each Base Color
                      (e.g., Banners #65A9CC, Master List #7665CC)
                                     │
                   3. Run Single-Pass Color Engine
                      (getThemeColorsFromBase_)
                                     │
                   4. Flush Pre-Calculated Hex Columns to Canvas
                      (Level 1 Fill ──> Level 5 Fill)
```[cite: 1, 2]

---

### 🛠️ Code Update Required in Dashboard Builder

To ensure the dashboard builder automatically populates these columns during a setup or rebuild, update your default row builder functions (`getDefaultSheetDefinitionRows_` and `getDefaultSystemSurfaceRows_`) to compute the levels dynamically[cite: 1, 2]:

```javascript
function getDefaultSheetDefinitionRowsWithColumnCounts_() {
  const globals = RFF_DEFAULTS; // Reads Section A default lightness percentages
  
  return getDefaultSheetDefinitionRows_().map(function(row) {
    const sheetType = row[0];
    const baseColor = normalizeHex_(row[4] || "#65A9CC");
    
    // ⚡ Calculate Levels 1-5 automatically during dashboard build
    const theme = getThemeColorsFromBase_(baseColor, globals);
    
    // Return row array with calculated Level 1-5 Hex strings injected into Columns F-J
    return [
      row[0],               // Sheet Type
      row[1],               // Report Title
      row[2],               // Template Name
      row[3],               // Output Naming Pattern
      baseColor,            // Base Color
      theme.level1,         // Level 1 Fill (Title Banner)
      theme.level2,         // Level 2 Fill (Header Row)
      theme.level3,         // Level 3 Fill (Odd Row Banding)
      theme.level4,         // Level 4 Fill (Even Row Banding)
      theme.level5,         // Level 5 Fill (Sub-Header Accent)
      row[5],               // Use Prompt Date
      row[6],               // End Date Source
      row[7],               // Template Row Count
      row[8],               // Column Count
      row[9] || "FIXED"     // Template Row Mode
    ];
  });
}
```[cite: 1, 2]

---

### 💡 Result on the "Format Dashboard" Tab

After running **Rebuild Format Dashboard**, the grid cells in Sections C and E immediately populate with crisp, human-readable hex codes[cite: 1, 2]:

| Sheet Type | Base Color | Level 1 Fill | Level 2 Fill | Level 3 Fill | Level 4 Fill | Level 5 Fill |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Banners** | `#65A9CC` | `#D9EAF7` | `#A3CCE2` | `#EBF4F9` | `#FFFFFF` | `#3D7999` |
| **Master List** | `#7665CC` | `#E2DCF7` | `#B4A8E8` | `#F1EEFC` | `#FFFFFF` | `#483699` |
| **Monthly Change** | `#A165CC` | `#F0DCF7` | `#CE9BE8` | `#F7EEFC` | `#FFFFFF` | `#632999` |

No manual typing required—the entire palette is calculated, aligned, and ready for templat
````

Here is the complete, production-ready **Codex / AI Engineering Prompt** to implement and maintain the **Index Update Engine** (`updateIndexSheet` / `rebuildDashboardIndex`).

This module governs the central **Index / Table of Contents** sheet, automatically discovering active report tabs, categorizing them, logging key operational metadata (row counts, last update timestamps, month tags), and generating direct hyperlink navigation across the workbook.

# **📜 Codex Prompt: Index Sheet Updates Implementation & Maintenance**

```
TASK INSTRUCTION:
Implement and refactor the Index Sheet Updates Engine (`updateIndexSheet` and `rebuildDashboardIndex`) in the Google Apps Script codebase based on the specification below.

OVERVIEW:
The Index Engine dynamically generates and refreshes the workbook's central Table of Contents ("Index" or "Table of Contents"). It scans all active sheets in the spreadsheet, categorizes them by report type, calculates live metrics (row counts, update timestamps, report month), and builds direct internal hyperlinks (`#gid=...`) for instant navigation.

REQUIREMENTS & ARCHITECTURE:

1. DYNAMIC SHEET DISCOVERY & CATEGORIZATION:
   - Scan all sheets in the Spreadsheet except excluded tabs (e.g., "Index", "Format Dashboard", hidden system templates starting with "Template -").
   - Categorize discovered active sheets into clean functional groups:
     a) Primary Master Reports (Master List, Refined Data / Demo P)
     b) Monthly Delta Reports (Monthly Change)
     c) Sub-Reports & Rosters (CP Due, Banners, Unlocked CP, Disenrolled Exclusion)
     d) Raw Source Data (Raw Data MM.YY)

2. IN-MEMORY METRIC EXTRACTION:
   - For every discovered active sheet, evaluate metadata in RAM:
     * Sheet Name & Direct Hyperlink (`=HYPERLINK("#gid=" + sheetId, sheetName)`)
     * Total Data Rows (`sheet.getLastRow() - DATA_START_ROW + 1`)
     * Report Month / Period Tag (parsed from sheet name or metadata cells)
     * Last Updated Timestamp (`sheet.getRange(...)` or current execution timestamp)

3. SECTION F PLACEMENT LAW:
   - The "Index" sheet itself MUST ALWAYS be placed at Position #1 (Index 0) in the spreadsheet tab order.
   - Enforce index tab position using `ss.setActiveSheet(indexSheet)` and `ss.moveActiveSheet(1)`.

4. CANVAS WRITING & STYLING:
   - Duplicate `Template - Index` or construct the Index canvas directly.
   - Clear existing content from `DATA_START_ROW` down.
   - Write categorized summary blocks or a unified Table of Contents grid in a SINGLE `range.setValues(indexRows)` flush.
   - Apply clean styling: Alternate row fills, left-aligned clickable hyperlinks, centered metadata columns.
   - Lock row heights (`lockFinalOutputRowHeights_`) and clear runtime caches.

--------------------------------------------------------------------------------
PROPOSED JS IMPLEMENTATION:

/**
 * Main orchestrator: Scans workbook and rebuilds the central Index navigation sheet.
 */
function updateIndexSheet() {
  return runFrameworkTimed_("Update Index Navigation Sheet", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Locate or Create Index Sheet
    let indexSheet = ss.getSheetByName("Index") || ss.getSheetByName("Table of Contents");
    if (!indexSheet) {
      const template = ss.getSheetByName("Template - Index");
      if (template) {
        indexSheet = template.copyTo(ss);
        indexSheet.setName("Index");
      } else {
        indexSheet = ss.insertSheet("Index", 0);
      }
    }

    // Always enforce Index Sheet position at tab #1
    ss.setActiveSheet(indexSheet);
    ss.moveActiveSheet(1);
    indexSheet.showSheet();

    markFrameworkStep_(timing, "Index canvas located & anchored at tab position #1");

    // 2. Discover & Categorize Active Report Sheets
    const excludedNames = new Set(["Index", "Table of Contents", "Format Dashboard"]);
    const allSheets = ss.getSheets();

    const activeReportSheets = allSheets.filter(s => {
      const name = s.getName();
      if (excludedNames.has(name)) return false;
      if (name.startsWith("Template -")) return false; // Exclude system templates
      return !s.isSheetHidden(); // Include active visible sheets
    });

    markFrameworkStep_(timing, "Discovered active visible sheets | Count: " + activeReportSheets.length);

    // 3. Build Index Table Payload in RAM
    const indexHeaders = [
      "Report Category",
      "Sheet Name / Hyperlink",
      "Report Month",
      "Active Rows",
      "Last Refreshed"
    ];

    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm");
    const indexRows = [];

    activeReportSheets.forEach(s => {
      const name = s.getName();
      const sheetId = s.getSheetId();
      const lastRow = s.getLastRow();
      const dataRows = lastRow >= DATA_START_ROW ? (lastRow - DATA_START_ROW + 1) : 0;
      
      const category = categorizeSheetForIndex_(name);
      const monthTag = extractMonthTagFromSheetName_(name);
      const hyperlinkFormula = `=HYPERLINK("#gid=${sheetId}", "${name}")`;

      indexRows.push([
        category,
        hyperlinkFormula,
        monthTag,
        dataRows,
        timestamp
      ]);
    });

    // Sort index rows by Category then Sheet Name
    indexRows.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));

    markFrameworkStep_(timing, "Index payload constructed in RAM | Total Entries: " + indexRows.length);

    // 4. Single Bulk Write to Canvas
    indexSheet.clear();
    
    // Write Headers
    const headerRange = indexSheet.getRange(HEADER_ROW, 1, 1, indexHeaders.length);
    headerRange.setValues([indexHeaders]);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#333333");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setVerticalAlignment("middle");
    indexSheet.setRowHeight(HEADER_ROW, 32);

    // Write Data Rows
    if (indexRows.length > 0) {
      const dataRange = indexSheet.getRange(DATA_START_ROW, 1, indexRows.length, indexHeaders.length);
      dataRange.setValues(indexRows);
      dataRange.setFontSize(10);
      dataRange.setFontFamily("Arial");
      dataRange.setVerticalAlignment("middle");

      // Apply Alternating Row Shading for Scannability
      for (let i = 0; i < indexRows.length; i++) {
        const rowNum = DATA_START_ROW + i;
        const bg = (i % 2 === 0) ? "#FFFFFF" : "#F9FAFB";
        indexSheet.getRange(rowNum, 1, 1, indexHeaders.length).setBackground(bg);
        indexSheet.setRowHeight(rowNum, 24);
      }
    }

    // Freeze Header & Auto-Fit Grid
    indexSheet.setFrozenRows(HEADER_ROW);
    lockFinalOutputRowHeights_(indexSheet);
    clearSheetRuntimeCachesForSheet_(indexSheet);

    notify_("Index update complete.\nIndexed " + indexRows.length + " active sheets.");
    return indexSheet;
  });
}

/**
 * Assigns a functional category grouping for a sheet based on name heuristics.
 */
function categorizeSheetForIndex_(sheetName) {
  const name = sheetName.toLowerCase();
  if (name.includes("master list")) return "1. Master Reports";
  if (name.includes("refined data") || name.includes("demo p")) return "1. Master Reports";
  if (name.includes("monthly change")) return "2. Delta Reports";
  if (name.includes("disenrolled")) return "3. Sub-Reports & Rosters";
  if (name.includes("cp due") || name.includes("care plan")) return "3. Sub-Reports & Rosters";
  if (name.includes("banner")) return "3. Sub-Reports & Rosters";
  if (name.includes("unlock")) return "3. Sub-Reports & Rosters";
  if (name.includes("raw data")) return "4. Raw Source Data";
  return "5. Other Active Sheets";
}

/**
 * Extracts month tag string (e.g., MM.YY or Month Year) from sheet name.
 */
function extractMonthTagFromSheetName_(sheetName) {
  const match = sheetName.match(/\b(0[1-9]|1[0-2])\.\d{2}\b/);
  if (match) return match[0];
  return "Current";
}
--------------------------------------------------------------------------------

Verify that the Index update script executes inside framework timing wrappers, maintains tab position #1, and cleanly generates hyperlink formulas. 
```

