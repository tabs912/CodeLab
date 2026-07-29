# **\#1 Codex Implementation Corrections**

Here is the complete, production-ready **Master Codex Refactoring Prompt** containing all the individual resolutions for the 20 implementation verification items.

Copy and paste this prompt directly into Codex to apply every fix across your codebase in a single execution pass:

Plaintext

```
TASK INSTRUCTION:
Refactor `v1.8.9.8.2_Current_Script` to implement all required resolutions from the Implementation Verification audit across Base Templates, Monthly Formatted Sheets, Refined Data, Disenrolled Exclusion, Monthly Change, Master List, Sub-Headers, and Performance/Purge routines.

IMPLEMENTATION REQUIREMENTS:

1. BASE TEMPLATE ENGINE (BT-08, BT-10, BT-11):
   - Delete `enforceTemplateDateAndNumberFormats_()`. Rely 100% on `applyGovernedTextAndNumberFormats_()` during the single baseline build pass.
   - Hardcode all template builders (`buildTemplateFromDashboard_`, `updateBaseTemplateCanvas_`) to use the strict `100` baseline row constant. Purge `resolveTemplateRowCount_()`.
   - Strip redundant typography repaints (`.setFontFamily`, `.setFontSize`, `.setAlignment`, `.setWrapStrategy`) from `updateBaseTemplateCanvas_`, inheriting properties natively from `RFF_BASE_TEMPLATE`.

2. FORMAT MONTHLY SHEETS (FM-06):
   - In `mapRowsToHeaders_()`, explicitly coerce PMR numbers, Phone numbers, and ZIP codes into string primitives before array mapping to preserve leading zeros during `.setValues()` flushes.

3. REFINED DATA / DEMO P ENGINE (RD-05, RD-06, RD-07, RD-09):
   - Refactor `flattenDemoPContactRowsInMemory_()` with a per-PMR `try...catch` block. If contact parsing fails for an individual participant, fall back to selecting their Primary PMR row safely without halting the run or generating duplicate rows.
   - Initialize all inner transformation arrays to explicit lengths matching header counts (`new Array(headers.length)`), assigning elements by index (`row[colIdx] = val`) rather than dynamic `.push()`.
   - Remove format-copy brushes from scratch and delta write paths. Rely strictly on native template grid formatting.
   - Refactor `processDemoP()` to be a 1-line compatibility alias pointing directly to `buildRefinedDataFromScratch()`. Delete obsolete helpers `processDemoPAsWorkingSource_` and `getOrCreateDemoPProcessingSheet_`.

4. DISENROLLED EXCLUSION ENGINE (DE-04, DE-06, DE-07):
   - In `stampDisenrollmentReportDateInMemory_()`, stamp empty cells with native JavaScript Date objects formatted as `mm/dd/yyyy` (preserving existing historical dates).
   - Add preflight guard: If `Refined Data` is missing or empty, prompt via `notify_()` and output an uncorrupted, empty `Disenrolled Exclusion` canvas (Title block and Row 4 headers only).
   - Delete the post-insertion format brush (`copyTo(PASTE_FORMAT)`). Allow inserted rows to inherit clean, unformatted grid properties.

5. MONTHLY CHANGE & MASTER LIST (MC-05, ML-05):
   - Wire `applySubHeaderBlock_` directly into `Monthly Change` section rendering to apply Level 5 purple fills (Offset 1) and Level 2 tint fills (Offset 3).
   - Audit Master List callers, delete obsolete helper `buildBannerLookupMap_()`, and ensure all Master List builds route strictly through `buildMasterListFromRefinedData()`.

6. 5-ROW SUB-HEADER BLOCK & BOUNDARY ENGINE (SH-01, SH-02, SH-03):
   - Hook up `applySubHeaderBlock_` as the single shared header builder across `Monthly Change`, `Framework Timing Report`, `Dashboard Quality Report`, and `Format Dashboard`.
   - Enforce layout: Offset 0 (21px buffer), Offset 1 (Title bar, Level 5 fill, 28px), Offset 2 (10px spacer), Offset 3 (Column headers, Level 2 fill, 35px), Offset 4 (Data insertion anchor row).
   - Update `replaceSectionDataInTemplate_` to target data writes at Offset 4 (`startRow + 4`). When expanding capacity, execute `sheet.insertRowsAfter(startRow + 4, ...)` so new rows inherit clean, unformatted cell properties.

7. PERFORMANCE & LEGACY PURGE (PF-04, PF-05, PF-06, PF-07, PF-09, PF-10):
   - Strip all runtime `setColumnWidth` calls, font styling, and fill applications from report generators. Restrict runtime grid formatting strictly to Care Plan `C1:D1` merges, 25px row heights, and Section G column hiding.
   - Pre-calculate total section row capacity in RAM upfront; execute a single batch `sheet.insertRowsAfter()` prior to flushing.
   - Consolidate `Dashboard Quality` (11 sections) and `Framework Timing` (8 columns) payload construction into single master 2D buffers in RAM, issuing EXACTLY ONE `.setValues()` write per report onto their respective prepainted template canvases.
   - Execute a dynamic string/callback audit and permanently purge `processDemoPAsWorkingSource_`, `getOrCreateDemoPProcessingSheet_`, `enforceTemplateDateAndNumberFormats_`, and legacy signature helpers.

Verify clean compilation, confirm Raw Data runs in < 3s, verify system surfaces execute in a single .setValues() write, and ensure all multi-section tabs correctly utilize the 5-row sub-header standard.
```

