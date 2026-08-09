# **Update Guidelines**

Here is the recommended execution sequence to work through the updates logically, followed by a dedicated **Codex Prompt** designed to identify and purge all deprecated functions, legacy helpers, and redundant wrappers.

### **🗺️ Recommended Order of Implementation**

To prevent broken dependencies or runtime references during migration, execute the updates in **6 sequential phases** based on underlying data flows:

```
[Phase 1: Core Utilities & Schemas] ➔ [Phase 2: Base Templates] ➔ [Phase 3: Formatting Engine]
                                                                        │
[Phase 6: Menus, Orchestration & Purge] ◄─ [Phase 5: System Surfaces] ◄─┴─ [Phase 4: Data Cores]
```

#### **Phase 1: Foundational Utilities & Dashboard Parsing**

* **Goal:** Establish ultra-fast primitive helpers, HSL color caching, and Section E system surface reading before building templates or processing data.  
* **Tasks:**  
  1. Deploy updated loadDashboardConfig\_ and loadSystemSurfaces\_ (Section E parsing).  
  2. Implement cached single-pass getThemeColorsFromBase\_ (Levels 1–5 palette).  
  3. Deploy ultra-fast primitive normalizers (normalizeCompareValue\_, normalizeToDateObject\_).

#### **Phase 2: Master Base Templates & Canvas Sync**

* **Goal:** Create clean, pre-formatted, 100% visible template canvases for all downstream engines.  
* **Tasks:**  
  1. Update ensureGoldenMasterTemplate\_ to bake @ (Plain Text) formatting into RFF\_BASE\_TEMPLATE.  
  2. Implement single-pass updateBaseTemplateCanvas\_ and syncBaseTemplateWithDashboard.  
  3. Implement rebuildTemplateCanvas\_ and rebuildAllTemplates.

#### **Phase 3: Sub-Report Formatting Engine**

* **Goal:** Consolidate sub-report formatting onto the single high-speed template-copy pipeline.  
* **Tasks:**  
  1. Deploy unified formatMonthlySubReportViaTemplate\_ for Banners, CP Due, Unlocked CP, and Raw Data.  
  2. Deploy executeSingleFormatterWorkflow\_ wrapper with active page and abbreviation fallback (B, CD, UC, RD).

#### **Phase 4: Core Data Processing Engines (RAM Fusion)**

* **Goal:** Transition heavy processing logic to in-memory $O(1)$ Hash Maps and Set operations.  
* **Tasks:**  
  1. Implement **Refined Data (Demo P)** pipeline (buildRefinedDataFromScratch, safeFlattenAndProcessContacts\_, processRefinedDataUnified\_).  
  2. Implement **Disenrolled Exclusion Engine** (createDisenrolledList, re-enrollment purge).  
  3. Implement **Monthly Change Engine** (buildMonthlyChangeReport, $O(1)$ primitive comparison matrix).  
  4. Implement **Master List Engine** (createMasterList, RAM fusion of Refined Data and Care Plan maps).

#### **Phase 5: System Surfaces & Navigation**

* **Goal:** Eliminate manual styling loops on system sheets.  
* **Tasks:**  
  1. Deploy template-insertion/boundary writing for **Dashboard Quality Report**.  
  2. Deploy memory buffer write for **Framework Timing Report** (purging styleFrameworkTimingReport\_).  
  3. Deploy updateIndexSheet with dynamic hyperlink generation and Section F tab anchoring.

#### **Phase 6: UI Menus, Batch Orchestration, & Code Base Purge**

* **Goal:** Wire up UI triggers, establish connection pooling, and delete all legacy dead code.  
* **Tasks:**  
  1. Refactor onOpen() into a continuous fluent menu chain.  
  2. Implement connection pooling in runMonthlyUpdate and runMonthlyStart.  
  3. Run the **Codebase Deprecation & Dead Code Purge Prompt** below.

### **📜 Codex Prompt: Codebase Deprecation & Dead Code Purge Engine**

Plaintext

```
TASK INSTRUCTION:
Perform a comprehensive audit of the Google Apps Script codebase to identify, unhook, and permanently purge all deprecated legacy functions, obsolete helper routines, redundant styling loops, and duplicate menu wrappers that have been superseded by the optimized architecture.

OVERVIEW:
With the deployment of the O(1) Template-Copy and Staged Memory Buffer architecture, multiple legacy functions are now dead code. To prevent script bloat, variable shadowing, and maintenance confusion, all legacy routines listed below must be safely removed or replaced as specified.

REQUIREMENTS & DEPRECATION LIST:

1. PURGE LEGACY STYLING & PAINTING LOOPS:
   - Completely DELETE `styleFrameworkTimingReport_()` and any associated cell-by-cell range painting routines for timing logs.
   - Completely DELETE manual grid painting loops previously used for Dashboard Quality formatting (now using template insertion/boundary inheritance).
   - Completely DELETE secondary formatting extension calls (`.copyTo(..., { formatOnly: true })`) executed after data writes.

2. PURGE DUPLICATE & REDUNDANT DATE/REGEX HELPERS:
   - DELETE legacy regex-heavy date parsing routines (`coerceToValidDate_`, `RFF_RE_DATE_MDY` checks) previously invoked inside inner comparison loops.
   - DELETE redundant passes of `enforceTemplateDateAndNumberFormats_()` and duplicate `applyGovernedTextAndNumberFormats_()` calls during template builds (formatting is now handled in a single pass).

3. PURGE OBSOLETE SUB-REPORT FORMATTER ORCHESTRATORS:
   - DELETE standalone legacy orchestrators for individual formatting:
     * `formatCarePlanDueOrUnlockedFromDashboard_()`
     * `formatMonthlyBannerSheet_()`
     * In-place Raw Data cell-shifting handlers replaced by `formatMonthlySubReportViaTemplate_()`
   - Ensure the four menu callbacks (`formatBannerReport`, `formatCarePlanDueReport`, `formatUnlockedCarePlanReport`, `formatRawData`) cleanly delegate strictly to `executeSingleFormatterWorkflow_()`.

4. PURGE REDUNDANT DATA PROCESSING ROUTINES:
   - DELETE legacy Demo P multi-pass processing functions that iterated through uncompressed raw rows to check for "Primary PMR Row".
   - DELETE separate "Banners Sheet Lookup Map" builders inside Master List logic (Banner Summary is now pulled directly from Refined Data).
   - DELETE legacy cell-by-cell sheet comparison loops in Monthly Change (`compareRawDemoPForSectionReport_`).

5. AUDIT & VERIFICATION POLICY:
   - Before removing any function, verify via static analysis/AST references that NO active function, menu trigger, or scheduled job calls the targeted routine.
   - Remove unused global variables, unused regex constants, and obsolete fallback definitions associated with the deleted routines.
   - Ensure no dangling JSDoc blocks or orphaned helper references remain in the codebase.

--------------------------------------------------------------------------------
PURGE VERIFICATION CHECKLIST:

[ ] styleFrameworkTimingReport_ deleted
[ ] Redundant coerceToValidDate_ calls removed from inner loops
[ ] formatCarePlanDueOrUnlockedFromDashboard_ deleted
[ ] Legacy Demo P primary-row loop checkers removed
[ ] Independent Banners Map lookup in Master List removed
[ ] All menu triggers verified to point strictly to active unified orchestrators

Confirm that the codebase compiles cleanly without missing function errors and that execution timings remain fully optimized. 
```

