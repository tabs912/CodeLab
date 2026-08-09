# **Wave 4 v3 Corrections**

Here is the updated, complete **Master Codex Refactoring Prompt** incorporating your requirement: **Section E (`System Sheet Surfaces`) in `Format Dashboard` is fully expanded to govern all structural and visual properties** for system sheets (`Uses Title Rows`, `Uses Filter`, `Uses Alternating Colors`, `Uses Subheaders`, `Hidden Template`, `Output Visibility`, `Column Widths`, etc.), ensuring the decoupled `buildSystemSheets()` engine has complete schema governance without relying on template build functions.

### **📜 Master Consolidated Codex Refactoring Prompt**

Copy and paste this prompt into Codex:

Plaintext

```
TASK INSTRUCTION:
Refactor `v1.8.9.8.3_Current_Script` to decouple System Sheet Building from System Setup, expand Section E schema governance, purge the legacy signature ReferenceError, restore Raw Data post-processing (Primary PMR & Banner Sync), remove Raw Data column hiding, enforce 5pt font on Care Plan C1 metadata, and connect 5-row subheaders across system surfaces.

IMPLEMENTATION REQUIREMENTS:

1. SECTION E SCHEMA EXPANSION & SYSTEM SHEET DECOUPLING:
   - Expand Section E (`SECTION E - SYSTEM SHEET SURFACES`) in `Format Dashboard` to serve as the complete, self-contained schema definition for system sheets (`Format Dashboard`, `Framework Timing Report`, `Dashboard Quality Report`, `Index`, `Archive - Demo P`, `RFF_BASE_TEMPLATE`).
   - Add governed columns to Section E: `Uses Title Rows`, `Uses Filter`, `Uses Alternating Colors`, `Uses Subheaders`, `Hidden Template`, `Output Visibility`, `Default Column Widths`, `Title Fill Color`, `Title Font Color`, `Notes`.
   - Create `buildSystemSheets()`: Dedicated function responsible strictly for physically instantiating, naming, and setting structural grid boundaries, column widths, and base formatting for system sheets based on Section E rules.
   - Refactor `setupSystemSheets()`: Dedicated execution function that calls `buildSystemSheets()`, populates default configurations, runs verifications, and enforces tab ordering.
   - DO NOT trigger `ensureGoldenMasterTemplate_()` or create `RFF_BASE_TEMPLATE` inside `setupSystemSheets()` or `buildSystemSheets()`. Reserve `RFF_BASE_TEMPLATE` creation strictly for `buildAllTemplatesAndValidate()`.

2. PURGE LEGACY SIGNATURE REFERENCE ERROR:
   - In `ensureDashboardQualitySheetShellForWorkflow_()` (and related quality shell helpers), REMOVE all calls to `getStoredTemplateFormatSignatureFromSheet_()` or `getStoredTemplateFormatSignature_()`.
   - Replace the check directly with `hasDashboardQualityTemplateShell_(sheet)`:
     if (!hasDashboardQualityTemplateShell_(sheet)) {
       rebuildDashboardQualitySheetShellStructure_(sheet, dashboard, timing);
     }
   - Ensure `quickSystemSetup()` (Step 3), `runDashboardQualityStartUp()`, `runDashboardQualityValidateTemplates()`, and `runFullQualityCheck()` execute without throwing ReferenceErrors.

3. RAW DATA POST-PROCESSING & NO HIDE COLUMNS:
   - In `formatMonthlySubReportViaTemplate_` (and `createRawDataOutputSheetFromTemplateFast_`), when processing `Raw Data`:
     a) Execute `processRawDataApprovedSyncColumns_(outputSheet, monthParts, timing, markFrameworkStep_)` to calculate and assign `Primary PMR Row = Yes` flags.
     b) Execute `syncRawDataBannerColumns_(outputSheet, monthParts, timing, markFrameworkStep_)` to cross-match PMRs against Banners and copy safety fields.
     c) DO NOT execute `sheet.hideColumns()` or apply Section G column hiding on `Raw Data` outputs. Keep all imported and added Raw Data columns 100% visible.
   - In `syncRawDataBannerColumns_`, ensure lookup keys pass through `normalizePMR_()` and string trimming (stripping spaces and trailing `.0`) to guarantee exact PMR profile cross-matching.

4. CARE PLAN C1 METADATA FONT SIZE (5PT):
   - On Care Plan Due ("CD") and Unlocked Care Plan ("UC") output sheets, whenever writing title metadata into cell `C1`, explicitly enforce 5pt font size:
     sheet.getRange("C1").setFontSize(5).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

5. SYSTEM SURFACES 5-ROW SUBHEADERS:
   - Connect `applySubHeaderBlock_` as the single shared header builder across `Framework Timing Report`, `Dashboard Quality Report`, `Format Dashboard`, and `Monthly Change` outputs.
   - Enforce layout: Offset 0 (21px buffer), Offset 1 (Title bar, Level 5 fill, 28px), Offset 2 (10px spacer), Offset 3 (Column headers, Level 2 fill, 35px), Offset 4 (Data insertion anchor row).
   - In `Template - Monthly Change`, keep the archetype canvas clean without pre-painted subheaders. Subheaders for Monthly Change sections (Enrollments, Disenrollments, Demographic, etc.) are injected dynamically at runtime via `applySubHeaderBlock_`.

6. MENU & QUICK START BINDINGS:
   - Update `onOpen()` and Quick Start menu bindings:
     * "Build System Sheets" -> `buildSystemSheets`
     * "Set up System Sheets" -> `setupSystemSheets`
     * "System Set up" -> `quickSystemSetup`

Verify clean compilation, confirm Section E governs system sheet attributes, verify `buildSystemSheets` and `setupSystemSheets` run as distinct functions, confirm `quickSystemSetup()` completes Step 3 without ReferenceErrors, verify `Raw Data` assigns Primary PMRs and syncs Banners with 0 hidden columns, and confirm Care Plan C1 metadata renders in 5pt font.
```

