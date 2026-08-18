# Master List v1.9.7.4.3 — Exhaustive Engineering Code Review

**Review date:** 2026-08-18
**Governing source:** `origin/main:Master_List/Current Production Script/v1.9.7.4.3`
**Prompt:** `Master_List/Prompts/ML_Exhaustive_Review_v2`
**Method:** complete static parse and AST inventory, entry-point/call-path inspection, v1.9.74.1 remediation delta verification, specification comparison, and historical timing review. Production code was not modified and live Apps Script execution was not performed.

## 1. Executive Review Summary

| Measure | Result |
|---|---|
| Overall health | **78/100 — most prior findings are corrected, with one material recovery defect remaining** |
| Production readiness | **Not approved until the remaining High data-recovery finding is corrected** |
| Critical | **0** |
| High | **1** |
| Medium | **3** |
| Low | **2** |
| Highest-risk workflow | Disenrolled Exclusion → Refined Data two-sheet commit |
| Primary bottlenecks | New automatic quality checks and repeated full-column number-format work were added without current timing evidence |
| Primary maintainability concerns | Duplicate/unreachable statements, silent automated-quality catches, nonunique temporary naming, and two restore-button implementations |
| Recommended next action | Restore Refined Data as well as Exclusion on second-stage failure, then correct the formatting/quality follow-up defects before release. |

v1.9.7.4.3 closes the invalid image getter, PMR fail-open path, Refined matrix-width mismatch, simple-trigger archive sync, legacy stubs, unused Index parameter, duplicate declarations, startup token, row-by-row deletion, and silent `onEdit` catch. The governed replacement now uses a backup swap and is materially safer. The release still cannot be approved because its claimed cross-sheet rollback restores only Disenrolled Exclusion after a Refined Data failure; Refined Data may remain cleared or partially written.

## 2. Repository and File Inventory

| Artifact | Role | Status |
|---|---|---|
| `origin/main:Master_List/Current Production Script/v1.9.7.4.3` | Governing executable; 8,056 lines / 387,596 bytes | Fully reviewed from synchronized remote object |
| `origin/main:Master_List/Current Production Script/v1.9.74.1` | Prior reviewed baseline | Used only for delta/finding validation |
| `Master_List/Audit Summary/v1.9.74.1/Exhaustive_Engineering_Code_Review.md` | Prior review | All nine findings revalidated |
| `Master_List/Audit Summary/v1.9.74.1/Exhaustive_Review_Remediation_Plan.md` | Prior plan | All six waves revalidated |
| `Master_List/Audit Summary/v1.9.74.1/All_Waves_Correction_Checklist.md` | Operational checklist | Updated with completion status and remaining actions |
| Review/remediation prompts and framework/project specifications | Governing standards | Applied |

The current branch contains unique documentation commits and is behind `origin/main`; the synchronization tool correctly did not merge or rebase. The source was reviewed with `git show` without switching branches.

## 3. Function and Dependency Inventory

| Metric | Result |
|---|---:|
| Top-level declarations | **288** |
| Unique top-level names | **288** |
| Duplicate declarations | **0** |
| Menu callback strings | **39** |
| Missing menu callbacks | **0** |
| Confirmed undefined top-level dependencies | **0** |
| Conservative write/destructive functions | **84** |
| Initial no-static-path candidates | **17** |

Lexical unresolved identifiers are nested/local helpers or callback parameters; none is a missing top-level production dependency. The complete compact inventory is in Appendix A.

## 4. Complete Findings Register

### ML19743-001 — Rollback restores Exclusion but not cleared/partial Refined Data

- **Severity:** HIGH
- **Confidence:** Confirmed
- **Category:** Data integrity / partial commit
- **Function/workflow:** `createDisenrolledListForMonth_`
- **Description:** The workflow catches a Refined Data clear/write failure and restores the prior Disenrolled Exclusion matrix, but it never restores the prior Refined Data matrix already available in `refinedData.values`.
- **Execution path:** Exclusion write succeeds → Refined `clearContent()` succeeds → Refined `setValues()` fails → catch rewrites Exclusion only → throws. Refined Data remains blank or partial.
- **Operational impact:** A supported Monthly Start/Update path can lose the active Refined Data body even though the error claims the operation “was rolled back.”
- **Recommended correction:** Capture the exact pre-write Refined matrix/width and restore both sheets in the catch. Report recovery failure separately and never claim complete rollback unless both restorations verify.
- **Breaking-change risk:** Medium implementation risk; no business-rule/interface change.
- **Focused tests:** Failure before/after each clear/write, successful dual restore, one restore failure, zero-row matrices, and repeat execution.

### ML19743-002 — Factory temporary name is deterministic and setup occurs outside cleanup protection

- **Severity:** MEDIUM
- **Confidence:** Confirmed
- **Category:** Runtime stability / sheet lifecycle
- **Function/workflow:** `createGovernedSheet_`
- **Description:** Overwrites always use `finalName + " __TEMP"` truncated to 100 characters. A leftover temp/colliding sheet causes `sheet.setName(tempName)` to throw before the surrounding build `try`, leaving the newly copied default-named sheet uncleaned. A 100-character final name truncates the temp name to the final name and necessarily collides.
- **Operational impact:** Governed replacement can fail and litter an extra copied sheet. The old target is preserved, so this is not a High data-loss path.
- **Recommended correction:** Generate a unique bounded temp name and move copy/name setup inside the cleanup-protected block.
- **Breaking-change risk:** Low.
- **Focused tests:** Existing temp collision, two rapid calls, 100-character name, copy/name failure, and cleanup verification.

### ML19743-003 — Monthly Change number-format calls exceed the intended grid and run twice

- **Severity:** MEDIUM
- **Confidence:** Confirmed
- **Category:** Formatting correctness / performance
- **Function/workflow:** `buildMonthlyChangeReportForMonth_`, `applyGovernedNumberFormatsFromDashboard_`
- **Description:** Monthly Change passes `changeSheet.getMaxRows()` as `rowCount`; the formatter starts at row 5 and calculates an end row of `startRow + rowCount - 1`, extending four rows beyond the current grid. The same formatter and completion timing step are called twice consecutively.
- **Operational impact:** `getRangeList` can reject out-of-grid A1 ranges; the catch converts this into a warning, leaving expected formats unapplied. Duplicate calls add avoidable service work.
- **Recommended correction:** Treat `rowCount` as data-row count, cap the end row at `getMaxRows()`, and retain one format call and one completion step.
- **Breaking-change risk:** Low.
- **Focused tests:** Empty/small/full Monthly Change sections, last physical row, date/text columns, warning count, and timing-step uniqueness.

### ML19743-004 — Automatic quality checks add hidden workflow cost and can validate a different monthly sheet

- **Severity:** MEDIUM
- **Confidence:** High
- **Category:** Performance / diagnostics
- **Function/workflow:** formatter, Refined, Disenrollment, Master List, and Monthly Change completion paths
- **Description:** Each workflow now invokes `runDashboardQualityProcessValidationSections_` inside its main execution/lock and swallows any error. The validator resolves a sheet by type/latest-prefix rather than receiving the exact output sheet, so an older-month run can validate the latest sheet instead of the sheet just created.
- **Operational impact:** Core workflows perform additional full-sheet reads/report writes with no current timing evidence, while failures are invisible and results may describe the wrong month.
- **Recommended correction:** Pass the exact output sheet/name, record a contextual nonfatal warning, and measure the cost. Prefer one explicit post-workflow quality stage rather than multiple hidden calls if timing is material.
- **Breaking-change risk:** Low-medium.
- **Focused tests:** Current and older month outputs, exact target selection, quality failure visibility, lock duration, and identical-output timing.

### ML19743-005 — Duplicate and unreachable statements remain in core workflow bodies

- **Severity:** LOW
- **Confidence:** Confirmed
- **Category:** Maintainability
- **Functions:** `processRefinedDataUpdate_`, `createMasterListForMonth_`, `buildMonthlyChangeReportForMonth_`
- **Description:** Refined and Master List contain duplicate return statements; Master List duplicates the completion timing mark; Monthly Change duplicates formatting, completion timing, and return statements. Statements after the first return are unreachable.
- **Operational impact:** Limited immediate runtime impact except the pre-return duplicated Monthly Change calls, which are covered by ML19743-003. The duplication obscures effective control flow.
- **Recommended correction:** Retain one authoritative mark/format/return sequence in each workflow.
- **Breaking-change risk:** None.
- **Focused tests:** Return object equality and single timing/quality/format invocation.

### ML19743-006 — Manual restore-button command remains non-idempotent

- **Severity:** LOW
- **Confidence:** Confirmed
- **Category:** Maintainability / manual administration
- **Functions:** `ensureRestoreButtonOnIndex_`, `buildRestoreButtonIcon`
- **Description:** The automatic helper now correctly uses `getScript()` and prevents duplicates, but the manual command still directly inserts a new image without checking existing assignments.
- **Operational impact:** Repeated manual use can create duplicate restore buttons, although normal Index refresh is corrected.
- **Recommended correction:** Make `buildRestoreButtonIcon()` delegate to `ensureRestoreButtonOnIndex_` and report whether a button was added or already present.
- **Breaking-change risk:** None.
- **Focused tests:** Repeated manual invocation and mixed automatic/manual invocation.

## 5. Supported Entry-Point Report

All 39 menu callbacks resolve. Supported workflow, admin, trigger, and web entry points remain compatible. `onOpen` no longer performs cross-file archive access; scheduled/manual sync remains available. `onEdit` retains contextual warning behavior. `doGet` remains the locked archive restore surface.

## 6. Orphan and Duplicate Code Report

- Duplicate top-level declarations: **none**.
- Prior no-op disenrollment stubs: **removed**.
- Confirmed unique-function orphans: **none recommended for removal**.
- Dynamic/manual surfaces remain `runManualArchiveSync`, `buildRestoreButtonIcon`, `configureArchiveWebAppUrl`, `runFormatDashboardUpdates`, and `restoreFormatDashboardFromDefault`.
- Unreachable statements are reported under ML19743-005, not as top-level orphans.

## 7. Performance Report

Historical timing remains directional only: Monthly Update 144.679 s average, Monthly Start 123.196 s, Format Monthly Sheets 106.731 s, and template refresh 85.917 s. v1.9.7.4.3 removes row-by-row deletion but adds number-format range-list operations and automatic quality validation within primary workflows. Current timing is required before claiming a net improvement.

Priority performance actions:

1. Correct duplicate/out-of-grid Monthly Change formatting.
2. Measure automatic quality stages individually.
3. Validate the exact output sheet rather than rescanning/selecting by latest prefix.
4. Consolidate only service calls shown to be material.

## 8. Data-Flow and Data-Integrity Report

Improvements include fail-closed PMR schema checks, normalized matrices, backup-based governed replacement, and Exclusion rollback. The remaining material defect is asymmetric rollback: Refined Data is the failing/cleared sheet but is not restored. The factory's deterministic temporary-name issue is operational rather than destructive because the old target remains intact when setup fails.

## 9. Trigger and Concurrency Report

Core document locks remain proportionate. The simple-trigger cross-file sync finding is closed because `onOpen` no longer calls archive sync. Scheduled/manual archive synchronization remains the authorized path. Automatic quality checks currently run while core locks are held; this should be measured and, if material, moved to an explicit post-commit stage without weakening data locks.

## 10. Error Handling and Logging Review

The Index helper and `onEdit` now log contextual warnings. Remaining weaknesses are empty catches around automated quality calls and factory cleanup, plus a rollback error message that overstates recovery. Optional quality/formatting failures may remain nonfatal, but they must identify the affected workflow and output.

## 11. Maintainability and Architecture Review

The single-file, dashboard-driven, template-first, Primary PMR architecture remains intact. Public menus and operational workflows are preserved. No modularization or architectural rewrite is recommended. Cleanup should be limited to duplicated statements, unified restore-button behavior, explicit temporary/swap state, and contextual warnings.

## 12. Prioritized Remediation Plan

See `Master_List/Audit Summary/v1.9.7.4.3/Exhaustive_Review_Remediation_Plan.md`. Priority order:

1. Complete dual-sheet rollback.
2. Correct temporary naming/cleanup.
3. Correct Monthly Change formatting bounds/duplication.
4. Make automatic quality exact-target, visible, and measured.
5. Remove unreachable statements and unify the manual restore button.

## 13. Focused Regression Test Plan

- Dual-sheet failure injection and verified restoration.
- Factory collision, maximum-name, and cleanup cases.
- Monthly Change format bounds and single invocation.
- Exact-month quality targeting and measured runtime.
- Repeated manual/automatic restore-button actions.
- Monthly Start/Update, formatting, Refined, Disenrollment, Monthly Change, Master List, Index, Dashboard Quality, and smoke workflows.

## 14. Final Conclusion

**Not approved due to one remaining High data-integrity defect.** v1.9.7.4.3 closes most v1.9.74.1 findings and is materially improved. Approval should follow completion of dual-sheet rollback and focused regression testing. The Medium/Low corrections should be included in the same minor correction release when practical because they are localized and low risk.

---

## Appendix A — Complete Compact Top-Level Function Inventory

| Function | Line | Classification | Direct callers | Direct dependencies | Write |
|---|---:|---|---|---|:---:|
| `onOpen` | 84 | Trigger/web entry | — | checkSheetDeletionAndUpdateIndex_ | No |
| `executeMonthlyFormatterWorkflow_` | 204 | Internal helper | formatBannerReport, formatCarePlanDueReport, formatRawData, formatUnlockedCarePlanReport, menuFormatMonthlySheets | runFormatterPipeline_ | No |
| `menuFormatMonthlySheets` | 209 | Workflow/public helper | formatMonthlySheets | executeMonthlyFormatterWorkflow_ | No |
| `formatMonthlySheets` | 213 | Menu/admin entry | — | menuFormatMonthlySheets | No |
| `formatBannerReport` | 214 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `formatCarePlanDueReport` | 215 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `formatUnlockedCarePlanReport` | 216 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `formatRawData` | 217 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `hideTemplates` | 219 | Menu/admin entry | — | hideTemplates_ | No |
| `showTemplates` | 220 | Menu/admin entry | — | showTemplates_ | No |
| `enforceGlobalSheetSortOrder` | 221 | Menu/admin entry | — | organizeTabs | No |
| `setupSystemSheets` | 222 | Menu/admin entry | — | createActiveSystemSheets | No |
| `rebuildFormatDashboardDefaults` | 223 | Menu/admin entry | — | menuBuildDashboardTemplate | No |
| `saveActiveLayoutToDashboardSettings` | 224 | Menu/admin entry | — | saveActiveLayoutAsRebuildDefault | No |
| `createOrRefreshAllReportTemplates` | 225 | Menu/admin entry | — | createAllReportTemplates | No |
| `runMonthlyStart` | 228 | Menu/admin entry | — | promptForLockedYearReportMonth_, markFrameworkStep_, processRefinedDataUpdate_, finalizeSharedMonthlyWorkflow_, runFrameworkTimed_ | No |
| `assertMonthlyUpdateStageComplete_` | 241 | Internal helper | finalizeSharedMonthlyWorkflow_, runMonthlyUpdate | — | No |
| `runMonthlyUpdate` | 249 | Menu/admin entry | — | promptForLockedYearReportMonth_, markFrameworkStep_, buildMonthlyChangeReportForMonth_, assertMonthlyUpdateStageComplete_, processRefinedDataUpdate_, finalizeSharedMonthlyWorkfl… | No |
| `finalizeSharedMonthlyWorkflow_` | 274 | Internal helper | runMonthlyStart, runMonthlyUpdate | markFrameworkStep_, createDisenrolledListForMonth_, assertMonthlyUpdateStageComplete_, createMasterListForMonth_, populateActiveIndex, notify_ | No |
| `menuBuildDashboardTemplate` | 331 | Workflow/public helper | rebuildFormatDashboardDefaults | buildFormatDashboardTemplate_ | No |
| `quickSystemSetup` | 340 | Menu/admin entry | — | ensureDocumentPropertiesInitialized_, notify_, markFrameworkStep_, createSystemSheetTemplates, createActiveSystemSheets, runFrameworkTimed_, runDashboardQualityStartUp, createIn… | No |
| `ensureDocumentPropertiesInitialized_` | 374 | Internal helper | quickSystemSetup | — | Yes |
| `createSystemSheetTemplates` | 387 | Workflow/public helper | quickSystemSetup | markFrameworkStep_, createOrRefreshBaseTemplate_, buildFormatDashboardTemplate_, createSystemTemplates | No |
| `createActiveSystemSheets` | 397 | Workflow/public helper | quickSystemSetup, setupSystemSheets | markFrameworkStep_, createActiveSheetFromTemplate_, stampActiveSubheaderTimestampNote_ | Yes |
| `createActiveSheetFromTemplate_` | 446 | Internal helper | createActiveSystemSheets, createIndexSheet, ensureDashboardQualityReport_, ensureFrameworkTimingReport_ | markFrameworkStep_, createGovernedSheet_ | No |
| `stampActiveSubheaderTimestampNote_` | 463 | Internal helper | createActiveSystemSheets | — | Yes |
| `quickBuildAllTemplates` | 475 | Menu/admin entry | — | notify_, markFrameworkStep_, createAllReportTemplates, runFrameworkTimed_, runDashboardQualityValidateTemplates | No |
| `clearDiagnosticsAndTimingLogs` | 495 | Menu/admin entry | — | ensureFrameworkTimingReport_, getFrameworkTimingSectionRegistry_, resetSubheaderSectionData_, getSubheadersFromDashboardConfig_, notify_ | No |
| `isFrameworkTimingEnabled_` | 516 | Internal helper | runFrameworkTimed_, toggleFrameworkTiming | — | No |
| `toggleFrameworkTiming` | 524 | Menu/admin entry | — | isFrameworkTimingEnabled_ | Yes |
| `startRuntimeTiming_` | 532 | Internal helper | runFrameworkTimed_ | — | No |
| `markRuntimeStep_` | 544 | Internal helper | markFrameworkStep_, runFrameworkTimed_ | getRuntimeTimingSeverity_, formatSeconds_, logRuntimeTiming_ | No |
| `logRuntimeWarning_` | 578 | Internal helper | logBestEffortWarning_ | — | No |
| `logBestEffortWarning_` | 585 | Internal helper | applyGovernedNumberFormatsFromDashboard_, archiveMonthlySheetsBySpecs_, assertParticipantTotalsMatch_, collectMovedTitleInfoCells_, creat… | logRuntimeWarning_ | No |
| `logFrameworkTiming_` | 592 | Internal helper | — | — | No |
| `logRuntimeTiming_` | 598 | Internal helper | markRuntimeStep_ | formatSeconds_ | No |
| `getRuntimeTimingSeverity_` | 605 | Internal helper | markRuntimeStep_ | — | No |
| `formatSeconds_` | 613 | Internal helper | logRuntimeTiming_, markRuntimeStep_ | — | No |
| `writeRuntimeTimingReport_` | 621 | Internal helper | runFrameworkTimed_ | ensureFrameworkTimingReport_, appendDataToSubheaderSection_, refreshFrameworkTimingSummarySections_, logBestEffortWarning_ | No |
| `runFrameworkTimed_` | 657 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets, buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterLi… | isFrameworkTimingEnabled_, startRuntimeTiming_, markRuntimeStep_, writeRuntimeTimingReport_ | No |
| `markFrameworkStep_` | 675 | Internal helper | appendRefinedDataArchiveRows_, applyRefinedDataProcesses_, archiveMonthlySheetsBySpecs_, archiveRawSourceSheet_, assertRequiredMonthlyImp… | markRuntimeStep_ | No |
| `normalizeSubheaderColumnName_` | 681 | Internal helper | getSubheaderSectionRecords_, mapRowsToSubheaderColumns_ | — | No |
| `getSubheaderSectionHeaders_` | 693 | Internal helper | getSubheaderSectionRecords_, mapRowsToSubheaderColumns_, writeDashboardQualitySection_ | getSubheaderSectionBounds_ | No |
| `mapRowsToSubheaderColumns_` | 702 | Internal helper | appendDataToSubheaderSection_, replaceSubheaderSectionData_ | getSubheaderSectionHeaders_, normalizeSubheaderColumnName_ | No |
| `getSubheaderSectionRecords_` | 721 | Internal helper | getFrameworkTimingDetailRows_ | getSubheaderSectionBounds_, getSubheaderSectionHeaders_, normalizeSubheaderColumnName_ | No |
| `appendDataToSubheaderSection_` | 742 | Internal helper | appendMonthlyChangeRowsWithHighlights_, writeDashboardQualitySection_, writeRuntimeTimingReport_ | mapRowsToSubheaderColumns_, getSubheaderSectionBounds_, resizeSheetGrid_, applySubheaderDataRowFormatting_ | Yes |
| `applySubheaderDataRowFormatting_` | 783 | Internal helper | appendDataToSubheaderSection_, replaceSubheaderSectionData_ | — | Yes |
| `findSubheaderDataAnchorRow_` | 792 | Internal helper | getSubheaderSectionBounds_ | — | No |
| `resetSubheaderSectionData_` | 805 | Internal helper | clearDiagnosticsAndTimingLogs | getSubheaderSectionBounds_ | Yes |
| `getSubheaderSectionBounds_` | 815 | Internal helper | appendDataToSubheaderSection_, applyMonthlyChangeSectionHHeaders_, getSubheaderSectionHeaders_, getSubheaderSectionRecords_, replaceSubhe… | findSubheaderDataAnchorRow_ | No |
| `getFrameworkTimingSectionRegistry_` | 839 | Internal helper | clearDiagnosticsAndTimingLogs, hasFrameworkTimingSections_ | — | No |
| `ensureFrameworkTimingReport_` | 848 | Internal helper | clearDiagnosticsAndTimingLogs, writeRuntimeTimingReport_ | hasFrameworkTimingSections_, buildFrameworkTimingTemplate_, createActiveSheetFromTemplate_ | No |
| `hasFrameworkTimingSections_` | 861 | Internal helper | ensureFrameworkTimingReport_ | getFrameworkTimingSectionRegistry_ | No |
| `getFrameworkTimingDetailRows_` | 870 | Internal helper | refreshFrameworkTimingSummarySections_ | getSubheaderSectionRecords_ | No |
| `replaceSubheaderSectionData_` | 874 | Internal helper | refreshFrameworkTimingSummarySections_ | mapRowsToSubheaderColumns_, getSubheaderSectionBounds_, resizeSheetGrid_, applySubheaderDataRowFormatting_ | Yes |
| `refreshFrameworkTimingSummarySections_` | 895 | Internal helper | writeRuntimeTimingReport_ | getFrameworkTimingDetailRows_, worseRuntimeTimingSeverity_, getRuntimeTimingRecommendation_, getRuntimeTimingThreshold_, replaceSubheaderSectionData_ | No |
| `worseRuntimeTimingSeverity_` | 976 | Internal helper | refreshFrameworkTimingSummarySections_ | — | No |
| `getRuntimeTimingThreshold_` | 981 | Internal helper | refreshFrameworkTimingSummarySections_ | — | No |
| `getRuntimeTimingRecommendation_` | 987 | Internal helper | refreshFrameworkTimingSummarySections_ | — | No |
| `getDataValues_` | 998 | Internal helper | buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterListForMonth_, finalizeMonthlyParticipantTotals_, getHeade… | buildHeaderIndexMap_ | No |
| `getHeaders_` | 1013 | Internal helper | createMasterListForMonth_ | getDataValues_ | No |
| `buildHeaderIndexMap_` | 1017 | Internal helper | appendRefinedDataArchiveRows_, applyRefinedDataProcesses_, assignPrimaryPMRRowsToMatrix_, combineRefinedDataNotesSummary_, countUniquePar… | — | No |
| `getPMRIndex_` | 1026 | Internal helper | applyRefinedDataProcesses_, assignPrimaryPMRRowsToMatrix_, buildUnlockCPLookupMap_, computeMonthlyChange_, countUniqueParticipantsByStatu… | findHeaderIndex_ | No |
| `normalizePMR_` | 1031 | Internal helper | buildUnlockCPLookupMap_, mergeMasterListData_ | — | No |
| `findHeaderIndex_` | 1040 | Internal helper | appendRefinedDataArchiveRows_, buildCPDueLookupMap_, buildUnlockCPLookupMap_, combineRefinedDataNotesSummary_, computeMonthlyChange_, cou… | — | No |
| `mapRowsToHeaders_` | 1050 | Internal helper | appendMonthlyChangeGroup_, createDisenrolledListForMonth_, processRefinedDataUpdate_, processSingleSubReport_, replaceChangedRefinedDataP… | buildHeaderIndexMap_, findHeaderIndex_ | No |
| `padRowToWidth_` | 1060 | Internal helper | normalizeRowsToWidth_ | — | No |
| `normalizeRowsToWidth_` | 1067 | Internal helper | createDisenrolledListForMonth_ | padRowToWidth_ | No |
| `isPrimaryPMRRowValue_` | 1071 | Internal helper | applyRefinedDataProcesses_, getPrimaryMonthlyChangeRows_, pruneAgedDisenrolledNonPrimaryRows_, replaceChangedRefinedDataPMRs_ | — | No |
| `valuesAreEqual_` | 1076 | Internal helper | — | — | No |
| `getMonthDateParts_` | 1085 | Internal helper | — | buildPromptedMonthContext_ | No |
| `formatReportDateLabel_` | 1090 | Internal helper | buildMonthlySheetName_ | — | No |
| `buildMonthlySheetName_` | 1095 | Internal helper | createGovernedSheet_, getMonthlyChangeSectionMap_ | formatReportDateLabel_ | No |
| `getLatestSheetByPrefix_` | 1105 | Internal helper | runDashboardQualityProcessValidationSections_ | extractFirstDateFromSheetName_ | Yes |
| `getCurrentRawDataSheet_` | 1117 | Internal helper | createDisenrolledListForMonth_, finalizeMonthlyParticipantTotals_, processRefinedDataUpdate_ | — | No |
| `getCurrentRefinedDataSheet_` | 1123 | Internal helper | createDisenrolledListForMonth_, createMasterListForMonth_, processRefinedDataUpdate_ | — | No |
| `getCurrentCarePlanDueSheet_` | 1127 | Internal helper | createMasterListForMonth_ | — | No |
| `getCurrentUnlockedCarePlanSheet_` | 1133 | Internal helper | createMasterListForMonth_ | — | No |
| `setRequiredSheetName_` | 1139 | Internal helper | — | — | Yes |
| `ensureOutputSheetHasFormattedRows_` | 1151 | Internal helper | — | resizeSheetGrid_ | No |
| `resizeSheetGrid_` | 1158 | Internal helper | BuildDefaultFormatDashboard, appendDataToSubheaderSection_, applyOperationalFormatting_, buildGeneralTemplate_, createOrRefreshBaseTempla… | — | Yes |
| `trimCreatedSheetToSize_` | 1166 | Internal helper | applyOperationalFormatting_, buildGeneralTemplate_, createOrRefreshBaseTemplate_, trimCreatedSheetToData_ | resizeSheetGrid_ | Yes |
| `trimCreatedSheetToData_` | 1180 | Internal helper | createDisenrolledListForMonth_, createGovernedSheet_ | trimCreatedSheetToSize_ | No |
| `applyNativeBandingSafe_` | 1187 | Internal helper | buildGeneralTemplate_ | — | Yes |
| `applyColumnWidths_` | 1197 | Internal helper | — | — | Yes |
| `openArchiveSpreadsheetOnce_` | 1204 | Internal helper | archiveRawSourceSheet_, processSingleSubReport_, restoreSheetFromArchiveWorkbook | — | No |
| `notify_` | 1212 | Internal helper | clearDiagnosticsAndTimingLogs, finalizeSharedMonthlyWorkflow_, hideMonthlySheetsBySpecs_, hideSystemSheetsNow, notifyParticipantSafetyNot… | — | No |
| `deleteSheetSafely_` | 1216 | Internal helper | processSingleSubReport_ | logBestEffortWarning_ | Yes |
| `promptForLockedYearReportMonth_` | 1221 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets, buildMonthlyChangeReport, buildRefinedDataFromScratch, createDisenrolledList, cre… | buildPromptedMonthContext_ | No |
| `buildPromptedMonthContext_` | 1230 | Internal helper | getMonthDateParts_, promptForLockedYearReportMonth_ | — | No |
| `refreshIndexAfterSheetWorkflow_` | 1253 | Internal helper | — | populateActiveIndex, logBestEffortWarning_ | No |
| `hideSheetIfNeeded_` | 1257 | Internal helper | createGovernedSheet_, hideSystemSheetsNow, organizeTabs, processSingleSubReport_, runFormatterPipeline_, setReportTemplateVisibility_ | activateVisibleSheetBeforeHiding_, markFrameworkStep_ | Yes |
| `showSheetIfNeeded_` | 1266 | Internal helper | createGovernedSheet_, setReportTemplateVisibility_, showSystemSheetsNow | markFrameworkStep_ | Yes |
| `activateVisibleSheetBeforeHiding_` | 1274 | Internal helper | copySheetToArchiveAndDeleteLocal_, createGovernedSheet_, hideMonthlySheetsBySpecs_, hideSheetIfNeeded_ | — | Yes |
| `extractFirstDateFromSheetName_` | 1282 | Internal helper | findArchiveMonthlyCandidateSheetsUpToDate_, getLatestSheetByPrefix_, populateIndexData | — | No |
| `getUniqueArchiveSheetName_` | 1293 | Internal helper | archiveRawSourceSheet_ | — | No |
| `archiveRawSourceSheet_` | 1301 | Internal helper | copySheetToArchiveAndDeleteLocal_, processSingleSubReport_ | openArchiveSpreadsheetOnce_, getUniqueArchiveSheetName_, markFrameworkStep_ | Yes |
| `filterBlankRows_` | 1317 | Internal helper | buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterListForMonth_, finalizeMonthlyParticipantTotals_, processR… | — | No |
| `buildLookupMap_` | 1324 | Internal helper | syncBannerFieldsIntoRawRows_ | — | Yes |
| `setupArchiveSyncTrigger` | 1334 | Workflow/public helper | quickSystemSetup | syncArchiveIndexToActiveIndex_ | Yes |
| `createIndexSheet` | 1361 | Workflow/public helper | quickSystemSetup | createActiveSheetFromTemplate_, populateActiveIndex, applyIndexGroupDividerRules_ | No |
| `resolveSheetGovernance_` | 1412 | Internal helper | createGovernedSheet_ | calculateDynamicRank_, loadDashboardConfig_, getRankForSheetName_ | No |
| `getRankForSheetName_` | 1500 | Internal helper | processSingleSubReport_, resolveSheetGovernance_ | loadDashboardConfig_, getTemplateCreationRule_, calculateDynamicRank_ | No |
| `getTemplateCreationRule_` | 1543 | Internal helper | createGovernedSheet_, getRankForSheetName_, writeConfiguredSheetGovernanceNote_ | — | No |
| `calculateDynamicRank_` | 1565 | Internal helper | getRankForSheetName_, processSingleSubReport_, resolveSheetGovernance_, writeConfiguredSheetGovernanceNote_ | extractDynamicRankMonth_ | No |
| `extractDynamicRankMonth_` | 1586 | Internal helper | calculateDynamicRank_ | — | No |
| `writeSheetGovernanceNote_` | 1598 | Internal helper | createGovernedSheet_, processSingleSubReport_, writeConfiguredSheetGovernanceNote_ | — | Yes |
| `getGovernedSheetTypeForName_` | 1636 | Internal helper | restoreSheetFromArchiveWorkbook | loadDashboardConfig_ | No |
| `writeConfiguredSheetGovernanceNote_` | 1651 | Internal helper | buildGeneralTemplate_, createOrRefreshBaseTemplate_ | loadDashboardConfig_, getTemplateCreationRule_, calculateDynamicRank_, writeSheetGovernanceNote_ | No |
| `createGovernedSheet_` | 1677 | Internal helper | appendRefinedDataArchiveRows_, buildMonthlyChangeReportForMonth_, createActiveSheetFromTemplate_, createDisenrolledListForMonth_, createM… | loadDashboardConfig_, getFallbackDashboardConfig_, buildMonthlySheetName_, getTemplateCreationRule_, resolveSheetGovernance_, markFrameworkStep_, logBestEffortWarning_, position… | Yes |
| `applyGovernedNumberFormatsFromDashboard_` | 1797 | Internal helper | buildMonthlyChangeReportForMonth_, createGovernedSheet_ | getGoogleSheetsNumberFormat_, logBestEffortWarning_ | Yes |
| `enforceDataRowHeights_` | 1858 | Internal helper | createGovernedSheet_ | logBestEffortWarning_ | Yes |
| `collectMovedTitleInfoCells_` | 1889 | Internal helper | processSingleSubReport_ | logBestEffortWarning_ | No |
| `normalizeRawPreservationHeader_` | 1907 | Internal helper | appendSourceOnlyHeaders_, getMonthlyChangeSectionMap_, getSourceOnlyHeaders_ | — | No |
| `appendSourceOnlyHeaders_` | 1911 | Internal helper | — | normalizeRawPreservationHeader_ | No |
| `getSourceOnlyHeaders_` | 1926 | Internal helper | — | normalizeRawPreservationHeader_ | No |
| `readValidSourceDate_` | 1937 | Internal helper | stampMonthlySubReportSourceDates_ | — | No |
| `stampMonthlySubReportSourceDates_` | 1948 | Internal helper | processSingleSubReport_ | readValidSourceDate_, logBestEffortWarning_, markFrameworkStep_ | Yes |
| `normalizePreservedValue_` | 1964 | Internal helper | verifyRawDataSourceOnlyColumns_, verifyRawNumberColumnPreserved_, verifyRawSourceSheetUntouched_ | — | No |
| `verifyRawSourceSheetUntouched_` | 1980 | Internal helper | finalizeFormattedMonthlyOutput_ | getDataValues_, normalizePreservedValue_, markFrameworkStep_ | No |
| `verifyRawDataSourceOnlyColumns_` | 2004 | Internal helper | finalizeFormattedMonthlyOutput_ | markFrameworkStep_, buildHeaderIndexMap_, findHeaderIndex_, normalizePreservedValue_ | No |
| `writeRawDataParticipantTotals_` | 2045 | Internal helper | finalizeMonthlyParticipantTotals_ | buildHeaderIndexMap_, findHeaderIndex_, writeParticipantTotalTimestamp_, markFrameworkStep_ | Yes |
| `writeUniqueParticipantTotalToG1_` | 2097 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, writeParticipantTotalTimestamp_, markFrameworkStep_ | Yes |
| `writeParticipantTotalTimestamp_` | 2131 | Internal helper | writeRawDataParticipantTotals_, writeUniqueParticipantTotalToG1_ | — | Yes |
| `countUniqueParticipantsByStatus_` | 2136 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_ | No |
| `assertParticipantTotalsMatch_` | 2151 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | logBestEffortWarning_ | No |
| `notifyParticipantSafetyNotices_` | 2158 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | notify_ | No |
| `sortRowsByLastName_` | 2165 | Internal helper | processRefinedDataUpdate_ | buildHeaderIndexMap_, findHeaderIndex_ | Yes |
| `runFormatterPipeline_` | 2173 | Internal helper | executeMonthlyFormatterWorkflow_ | promptForLockedYearReportMonth_, markFrameworkStep_, loadDashboardConfig_, assertRequiredMonthlyImportsPresent_, processSingleSubReport_, logBestEffortWarning_, finalizeMonthlyP… | Yes |
| `assertRequiredMonthlyImportsPresent_` | 2254 | Internal helper | runFormatterPipeline_ | markFrameworkStep_, findSourceSheetForSubReport_ | No |
| `processSingleSubReport_` | 2280 | Internal helper | runFormatterPipeline_ | markFrameworkStep_, findSourceSheetForSubReport_, collectMovedTitleInfoCells_, getDataValues_, findHeaderIndex_, getHeadersForSheetType_, mapRowsToHeaders_, buildHeaderIndexMap_… | Yes |
| `verifyRawNumberColumnPreserved_` | 2424 | Internal helper | — | buildHeaderIndexMap_, findHeaderIndex_, normalizePreservedValue_, markFrameworkStep_ | No |
| `finalizeFormattedMonthlyOutput_` | 2443 | Internal helper | processSingleSubReport_ | verifyRawDataSourceOnlyColumns_, verifyRawSourceSheetUntouched_ | No |
| `finalizeMonthlyParticipantTotals_` | 2461 | Internal helper | runFormatterPipeline_ | getCurrentRawDataSheet_, markFrameworkStep_, getDataValues_, filterBlankRows_, writeRawDataParticipantTotals_ | No |
| `syncBannerFieldsIntoRawRows_` | 2479 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, buildLookupMap_ | No |
| `assignPrimaryPMRRowsToMatrix_` | 2521 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_ | Yes |
| `pruneAgedDisenrolledNonPrimaryRows_` | 2661 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, isPrimaryPMRRowValue_ | Yes |
| `findSourceSheetForSubReport_` | 2696 | Internal helper | assertRequiredMonthlyImportsPresent_, processSingleSubReport_ | isSheetNameMatchingMonth_ | No |
| `isSheetNameMatchingMonth_` | 2762 | Internal helper | findSourceSheetForSubReport_ | — | No |
| `buildRefinedDataFromScratch` | 2800 | Menu/admin entry | — | promptForLockedYearReportMonth_, processRefinedDataUpdate_ | No |
| `updateRefinedDataMonthlySync` | 2806 | Menu/admin entry | — | promptForLockedYearReportMonth_, processRefinedDataUpdate_ | No |
| `processRefinedDataUpdate_` | 2812 | Internal helper | buildRefinedDataFromScratch, runMonthlyStart, runMonthlyUpdate, updateRefinedDataMonthlySync | loadDashboardConfig_, getCurrentRawDataSheet_, getDataValues_, filterBlankRows_, getHeadersForSheetType_, mapRowsToHeaders_, stampRefinedTrackingFields_, getCurrentRefinedDataSh… | Yes |
| `normalizeMonthlyChangeSectionName_` | 2900 | Internal helper | getMonthlyChangeSectionMap_ | — | No |
| `getMonthlyChangeSectionMap_` | 2912 | Internal helper | processRefinedDataUpdate_ | buildMonthlySheetName_, normalizeMonthlyChangeSectionName_, normalizeRawPreservationHeader_ | Yes |
| `replaceChangedRefinedDataPMRs_` | 2941 | Internal helper | processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, mapRowsToHeaders_, isPrimaryPMRRowValue_, stampRefinedTrackingFields_, applyRefinedDataProcesses_, markFrameworkStep_ | Yes |
| `appendRefinedDataArchiveRows_` | 3021 | Internal helper | processRefinedDataUpdate_ | createGovernedSheet_, buildHeaderIndexMap_, findHeaderIndex_, markFrameworkStep_ | Yes |
| `stampRefinedTrackingFields_` | 3054 | Internal helper | processRefinedDataUpdate_, replaceChangedRefinedDataPMRs_ | buildHeaderIndexMap_ | No |
| `applyRefinedDataProcesses_` | 3071 | Internal helper | processRefinedDataUpdate_, replaceChangedRefinedDataPMRs_ | buildHeaderIndexMap_, getPMRIndex_, isPrimaryPMRRowValue_, markFrameworkStep_, combineRefinedDataNotesSummary_ | Yes |
| `combineRefinedDataNotesSummary_` | 3158 | Internal helper | applyRefinedDataProcesses_ | buildHeaderIndexMap_, findHeaderIndex_ | No |
| `createDisenrolledList` | 3189 | Menu/admin entry | — | promptForLockedYearReportMonth_, createDisenrolledListForMonth_ | No |
| `createDisenrolledListForMonth_` | 3195 | Internal helper | createDisenrolledList, finalizeSharedMonthlyWorkflow_ | loadDashboardConfig_, getCurrentRefinedDataSheet_, getDataValues_, getHeadersForSheetType_, findHeaderIndex_, getPMRIndex_, createGovernedSheet_, buildHeaderIndexMap_, filterBla… | Yes |
| `hideHistoricalDisenrollmentRows_` | 3387 | Internal helper | createDisenrolledListForMonth_ | — | Yes |
| `createMasterList` | 3411 | Menu/admin entry | — | promptForLockedYearReportMonth_, createMasterListForMonth_ | No |
| `createMasterListForMonth_` | 3417 | Internal helper | createMasterList, finalizeSharedMonthlyWorkflow_ | loadDashboardConfig_, getCurrentRefinedDataSheet_, getCurrentCarePlanDueSheet_, getCurrentUnlockedCarePlanSheet_, markFrameworkStep_, getDataValues_, filterBlankRows_, getHeader… | No |
| `normalizeNameKey_` | 3481 | Internal helper | buildNameKeyVariants_ | — | No |
| `buildNameKeyVariants_` | 3486 | Internal helper | buildCPDueLookupMap_, buildUnlockCPLookupMap_, mergeMasterListData_ | normalizeNameKey_ | No |
| `buildCPDueLookupMap_` | 3528 | Internal helper | mergeMasterListData_ | findHeaderIndex_, buildNameKeyVariants_ | Yes |
| `buildUnlockCPLookupMap_` | 3544 | Internal helper | mergeMasterListData_ | getPMRIndex_, findHeaderIndex_, normalizePMR_, buildNameKeyVariants_ | Yes |
| `getMappedValue_` | 3571 | Internal helper | mergeMasterListData_ | findHeaderIndex_ | No |
| `mergeMasterListData_` | 3577 | Internal helper | createMasterListForMonth_ | getPMRIndex_, buildCPDueLookupMap_, buildUnlockCPLookupMap_, findHeaderIndex_, normalizePMR_, buildNameKeyVariants_, getMappedValue_ | Yes |
| `buildMonthlyChangeReport` | 3642 | Menu/admin entry | — | promptForLockedYearReportMonth_, buildMonthlyChangeReportForMonth_ | No |
| `buildMonthlyChangeReportForMonth_` | 3648 | Internal helper | buildMonthlyChangeReport, runMonthlyUpdate | loadDashboardConfig_, getDataValues_, filterBlankRows_, markFrameworkStep_, getSubheadersFromDashboardConfig_, getHeadersForSheetType_, computeMonthlyChange_, createGovernedShee… | Yes |
| `applyMonthlyChangeSectionHHeaders_` | 3706 | Internal helper | buildMonthlyChangeReportForMonth_ | getSubheaderSectionBounds_ | Yes |
| `computeMonthlyChange_` | 3723 | Internal helper | buildMonthlyChangeReportForMonth_ | getPMRIndex_, groupMonthlyChangeRowsByPMR_, findHeaderIndex_, normalizeMonthlyChangeValue_, getMonthlyChangeParticipantEligibility_, getPrimaryMonthlyChangeRows_, isSameReportDa… | No |
| `getMonthlyChangeParticipantEligibility_` | 3871 | Internal helper | computeMonthlyChange_ | isSameReportDate_ | No |
| `getPrimaryMonthlyChangeRows_` | 3885 | Internal helper | computeMonthlyChange_ | findHeaderIndex_, isPrimaryPMRRowValue_ | No |
| `groupMonthlyChangeRowsByPMR_` | 3892 | Internal helper | computeMonthlyChange_ | — | Yes |
| `isSameReportDate_` | 3903 | Internal helper | computeMonthlyChange_, getMonthlyChangeParticipantEligibility_ | — | No |
| `getChangedHeadersAcrossAllRows_` | 3910 | Internal helper | computeMonthlyChange_ | findHeaderIndex_, normalizeMonthlyChangeValue_ | Yes |
| `normalizeMonthlyChangeValue_` | 3922 | Internal helper | computeMonthlyChange_, getChangedHeadersAcrossAllRows_ | — | No |
| `appendMonthlyChangeGroup_` | 3927 | Internal helper | computeMonthlyChange_ | mapRowsToHeaders_ | No |
| `appendMonthlyChangeRowsWithHighlights_` | 3937 | Internal helper | buildMonthlyChangeReportForMonth_ | appendDataToSubheaderSection_ | Yes |
| `organizeTabs` | 3970 | Workflow/public helper | enforceGlobalSheetSortOrder | getTargetRankForSheet_, getUnformattedSheetSortKey_, hideSheetIfNeeded_ | Yes |
| `getUnformattedSheetSortKey_` | 4062 | Internal helper | organizeTabs, populateIndexData | — | No |
| `positionSheetBySectionFRank_` | 4106 | Internal helper | buildGeneralTemplate_, createGovernedSheet_, processSingleSubReport_ | getTargetRankForSheet_, logBestEffortWarning_ | Yes |
| `getTargetRankForSheet_` | 4174 | Internal helper | matchSheetToSectionFRule_, organizeTabs, positionSheetBySectionFRank_ | — | No |
| `matchSheetToSectionFRule_` | 4240 | Internal helper | populateIndexData | getTargetRankForSheet_ | No |
| `hideMonthlyImportSheets` | 4258 | Menu/admin entry | — | promptForLockedYearReportMonth_, hideMonthlySheetsBySpecs_ | No |
| `hideMonthlyActiveSheets` | 4270 | Menu/admin entry | — | promptForLockedYearReportMonth_, hideMonthlySheetsBySpecs_ | No |
| `hideTemplates_` | 4281 | Internal helper | hideTemplates | hideReportTemplates | No |
| `showTemplates_` | 4282 | Internal helper | showTemplates | showReportTemplates | No |
| `getDashboardConfigForTemplateVisibility_` | 4284 | Internal helper | hideReportTemplates, showReportTemplates | loadDashboardConfig_, logBestEffortWarning_ | No |
| `hideReportTemplates` | 4294 | Workflow/public helper | hideTemplates_ | getDashboardConfigForTemplateVisibility_, setReportTemplateVisibility_, runFrameworkTimed_ | No |
| `showReportTemplates` | 4301 | Workflow/public helper | showTemplates_ | getDashboardConfigForTemplateVisibility_, setReportTemplateVisibility_, runFrameworkTimed_ | No |
| `setReportTemplateVisibility_` | 4308 | Internal helper | hideReportTemplates, showReportTemplates | hideSheetIfNeeded_, showSheetIfNeeded_, markFrameworkStep_ | No |
| `hideSystemSheets_` | 4342 | Menu/admin entry | — | hideSystemSheetsNow | No |
| `showSystemSheets_` | 4343 | Menu/admin entry | — | showSystemSheetsNow | No |
| `hideSystemSheetsNow` | 4345 | Workflow/public helper | hideSystemSheets_ | hideSheetIfNeeded_, notify_, runFrameworkTimed_ | No |
| `showSystemSheetsNow` | 4362 | Workflow/public helper | showSystemSheets_ | showSheetIfNeeded_, notify_, runFrameworkTimed_ | No |
| `hideMonthlySheetsBySpecs_` | 4379 | Internal helper | hideMonthlyActiveSheets, hideMonthlyImportSheets | findArchiveMonthlyCandidateSheetsUpToDate_, activateVisibleSheetBeforeHiding_, notify_, runFrameworkTimed_ | Yes |
| `archiveMonthlyImportSheets` | 4411 | Menu/admin entry | — | promptForLockedYearReportMonth_, archiveMonthlySheetsBySpecs_, populateActiveIndex, notifyArchiveMonthlySheetsResult_, runFrameworkTimed_ | No |
| `archiveMonthlyActiveSheets` | 4429 | Menu/admin entry | — | promptForLockedYearReportMonth_, archiveMonthlySheetsBySpecs_, populateActiveIndex, notifyArchiveMonthlySheetsResult_, runFrameworkTimed_ | No |
| `archiveMonthlySheetsBySpecs_` | 4447 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets | markFrameworkStep_, findArchiveMonthlyCandidateSheetsUpToDate_, logBestEffortWarning_, copySheetToArchiveAndDeleteLocal_, pingArchiveIndexUpdate_ | No |
| `pingArchiveIndexUpdate_` | 4491 | Internal helper | archiveMonthlySheetsBySpecs_ | logBestEffortWarning_ | No |
| `findArchiveMonthlyCandidateSheetsUpToDate_` | 4502 | Internal helper | archiveMonthlySheetsBySpecs_, hideMonthlySheetsBySpecs_ | extractFirstDateFromSheetName_ | Yes |
| `notifyArchiveMonthlySheetsResult_` | 4534 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets | — | No |
| `copySheetToArchiveAndDeleteLocal_` | 4541 | Internal helper | archiveMonthlySheetsBySpecs_ | archiveRawSourceSheet_, activateVisibleSheetBeforeHiding_ | Yes |
| `applyDelimitedProperty_` | 4553 | Internal helper | applyDashboardRowFormattingSpec_, applyTitleRows_ | applySingleCellProperty_ | No |
| `applySingleCellProperty_` | 4576 | Internal helper | applyDelimitedProperty_ | getWrapStrategyEnum_ | Yes |
| `getWrapStrategyEnum_` | 4598 | Internal helper | applyGeneralSheetDefaults_, applyOperationalFormatting_, applySingleCellProperty_, createOrRefreshBaseTemplate_ | — | No |
| `getBorderStyleEnum_` | 4606 | Internal helper | applyGeneralSheetDefaults_, createOrRefreshBaseTemplate_ | — | No |
| `createOrRefreshBaseTemplate_` | 4624 | Internal helper | createAllReportTemplates, createSystemSheetTemplates | createGovernedSheet_, loadDashboardConfig_, hasDashboardFormattingValue_, resizeSheetGrid_, getWrapStrategyEnum_, requireDashboardFormattingValue_, getBorderStyleEnum_, trimCrea… | Yes |
| `createTemplateFromBase_` | 4704 | Internal helper | BuildDefaultFormatDashboard, buildGeneralTemplate_ | createGovernedSheet_ | No |
| `buildGeneralTemplate_` | 4718 | Internal helper | BuildDefaultFormatDashboard, buildDashboardQualityTemplate_, buildFrameworkTimingTemplate_, buildIndexTemplate_, buildOperationalReportTe… | markFrameworkStep_, createTemplateFromBase_, positionSheetBySectionFRank_, resizeSheetGrid_, applyGeneralSheetDefaults_, validateDashboardFormattingConfig_, applyNativeBandingSa… | Yes |
| `applyGeneralSheetDefaults_` | 4781 | Internal helper | buildGeneralTemplate_ | requireDashboardFormattingValue_, getWrapStrategyEnum_, getBorderStyleEnum_ | Yes |
| `requireDashboardFormattingValue_` | 4816 | Internal helper | applyColumnWidthsEngine_, applyDashboardRowFormattingSpec_, applyGeneralSheetDefaults_, applyOperationalFormatting_, applyTitleRows_, bui… | — | No |
| `hasDashboardFormattingValue_` | 4823 | Internal helper | createOrRefreshBaseTemplate_ | — | No |
| `validateDashboardFormattingConfig_` | 4827 | Internal helper | buildGeneralTemplate_ | requireDashboardFormattingValue_ | No |
| `getDashboardSectionRowSpecs_` | 4853 | Internal helper | applyExistingSectionFormatting_, applySubheaderBlocks_, applyTitleRows_ | — | No |
| `applyExistingSectionFormatting_` | 4873 | Internal helper | buildGeneralTemplate_, buildOperationalReportTemplate_ | getDashboardSectionRowSpecs_, getDashboardRowFormattingSpec_, applyDashboardRowFormattingSpec_ | No |
| `getDashboardRowFormattingSpec_` | 4909 | Internal helper | applyExistingSectionFormatting_, applySubheaderBlocks_ | — | No |
| `applyDashboardRowFormattingSpec_` | 4917 | Internal helper | applyExistingSectionFormatting_, applyTitleRows_ | requireDashboardFormattingValue_, applyDelimitedProperty_ | Yes |
| `applyTitleRows_` | 4928 | Internal helper | buildGeneralTemplate_ | getDashboardSectionRowSpecs_, applyDelimitedProperty_, requireDashboardFormattingValue_, applyDashboardRowFormattingSpec_ | Yes |
| `applySubheaderBlocks_` | 4955 | Internal helper | buildGeneralTemplate_ | getDashboardSectionRowSpecs_, getDashboardRowFormattingSpec_ | Yes |
| `applyColumnWidthsEngine_` | 5009 | Internal helper | buildGeneralTemplate_ | loadDashboardConfig_, requireDashboardFormattingValue_ | Yes |
| `applyOperationalFormatting_` | 5044 | Internal helper | buildOperationalReportTemplate_, buildTemplateArchiveRefinedData | loadDashboardConfig_, getStandardSheetKey_, resizeSheetGrid_, requireDashboardFormattingValue_, getWrapStrategyEnum_, trimCreatedSheetToSize_ | Yes |
| `writeTemplateMetadata_` | 5114 | Internal helper | buildGeneralTemplate_ | — | Yes |
| `createSystemTemplates` | 5121 | Workflow/public helper | createSystemSheetTemplates | buildFrameworkTimingTemplate_, buildDashboardQualityTemplate_, buildIndexTemplate_ | No |
| `buildFrameworkTimingTemplate_` | 5127 | Internal helper | createSystemTemplates, ensureFrameworkTimingReport_ | getTemplateConfigFromDashboard_, buildGeneralTemplate_ | No |
| `buildDashboardQualityTemplate_` | 5133 | Internal helper | createSystemTemplates | getTemplateConfigFromDashboard_, buildGeneralTemplate_ | No |
| `buildIndexTemplate_` | 5139 | Internal helper | createSystemTemplates | getTemplateConfigFromDashboard_, buildGeneralTemplate_, requireDashboardFormattingValue_, applyIndexGroupDividerRules_ | Yes |
| `createAllReportTemplates` | 5156 | Workflow/public helper | createOrRefreshAllReportTemplates, quickBuildAllTemplates | loadDashboardConfig_, createOrRefreshBaseTemplate_, buildTemplateBannerReport, buildTemplateCarePlanDue, buildTemplateUnlockedCarePlan, buildTemplateRawData, buildTemplateRefine… | No |
| `buildOperationalReportTemplate_` | 5178 | Internal helper | buildTemplateBannerReport, buildTemplateCarePlanDue, buildTemplateDisenrolledExclusion, buildTemplateMasterList, buildTemplateMonthlyChan… | getTemplateConfigFromDashboard_, buildGeneralTemplate_, applyOperationalFormatting_, applyExistingSectionFormatting_, applyOperationalTemplateSort_ | No |
| `applyOperationalTemplateSort_` | 5192 | Internal helper | buildOperationalReportTemplate_, buildTemplateArchiveRefinedData | — | No |
| `buildTemplateArchiveRefinedData` | 5204 | Workflow/public helper | createAllReportTemplates | getTemplateConfigFromDashboard_, getHeadersForSheetType_, buildGeneralTemplate_, applyOperationalFormatting_, applyOperationalTemplateSort_ | No |
| `buildTemplateBannerReport` | 5219 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateCarePlanDue` | 5220 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateUnlockedCarePlan` | 5221 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateRawData` | 5222 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateRefinedData` | 5223 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateDisenrolledExclusion` | 5224 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateMasterList` | 5225 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateMonthlyChange` | 5226 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `updateIndexSheet` | 5237 | Menu/admin entry | configureArchiveSpreadsheetId, configureIndexRestoreWebAppUrl | populateIndexData, populateActiveIndex, syncArchiveIndexToActiveIndex_ | No |
| `populateActiveIndex` | 5249 | Workflow/public helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets, checkSheetDeletionAndUpdateIndex_, createGovernedSheet_, createIndexSheet, finali… | populateIndexData | No |
| `populateIndexData` | 5253 | Workflow/public helper | populateActiveIndex, updateIndexSheet | ensureRestoreButtonOnIndex_, loadDashboardConfig_, matchSheetToSectionFRule_, extractFirstDateFromSheetName_, getUnformattedSheetSortKey_, resizeSheetGrid_ | Yes |
| `ensureRestoreButtonOnIndex_` | 5433 | Internal helper | populateIndexData | logBestEffortWarning_ | Yes |
| `applyIndexGroupDividerRules_` | 5458 | Internal helper | buildIndexTemplate_, createIndexSheet | getTemplateTheme_ | Yes |
| `syncArchiveIndexToActiveIndex_` | 5495 | Trigger/web entry | runManualArchiveSync, setupArchiveSyncTrigger, updateIndexSheet | logBestEffortWarning_, resizeSheetGrid_ | Yes |
| `checkSheetDeletionAndUpdateIndex_` | 5616 | Internal helper | onOpen | populateActiveIndex | Yes |
| `runManualArchiveSync` | 5632 | Manual/admin or uncertain | — | syncArchiveIndexToActiveIndex_ | No |
| `buildRestoreButtonIcon` | 5644 | Manual/admin or uncertain | — | — | Yes |
| `restoreSheetFromActiveIndexRow` | 5670 | Menu/admin entry | — | restoreSheetFromArchiveWorkbook | Yes |
| `restoreSheetFromArchiveWorkbook` | 5735 | Workflow/public helper | doGet, restoreSheetFromActiveIndexRow | openArchiveSpreadsheetOnce_, loadDashboardConfig_, getGovernedSheetTypeForName_, createGovernedSheet_, populateActiveIndex | Yes |
| `escapeHtml_` | 5767 | Internal helper | doGet | — | No |
| `doGet` | 5776 | Trigger/web entry | — | restoreSheetFromArchiveWorkbook, escapeHtml_ | No |
| `configureIndexRestoreWebAppUrl` | 5791 | Menu/admin entry | — | updateIndexSheet | Yes |
| `configureArchiveSpreadsheetId` | 5810 | Menu/admin entry | — | updateIndexSheet | Yes |
| `configureArchiveWebAppUrl` | 5836 | Manual/admin or uncertain | — | — | Yes |
| `runDashboardQualityConfigVerificationSections_` | 5859 | Internal helper | runDashboardQualityStartUp, runFormatDashboardUpdates | — | No |
| `writeDashboardQualitySection_` | 5888 | Internal helper | runDashboardQualityProcessValidationSections_, runDashboardQualityStartUp, runDashboardQualityValidateTemplates, runFormatDashboardUpdate… | ensureDashboardQualityReport_, appendDataToSubheaderSection_, getSubheaderSectionHeaders_ | Yes |
| `ensureDashboardQualityReport_` | 5911 | Internal helper | writeDashboardQualitySection_ | buildFormatDashboardTemplate_, getTemplateConfigFromDashboard_, buildGeneralTemplate_, createActiveSheetFromTemplate_ | No |
| `runDashboardQualityStartUp` | 5928 | Menu/admin entry | quickSystemSetup | runDashboardQualityConfigVerificationSections_, writeDashboardQualitySection_, markFrameworkStep_, runFrameworkTimed_ | No |
| `runDashboardQualityValidateTemplates` | 5937 | Menu/admin entry | quickBuildAllTemplates | writeDashboardQualitySection_, runTemplateDateFormatValidation_, markFrameworkStep_, runFrameworkTimed_ | No |
| `runTemplateDateFormatValidation_` | 5975 | Internal helper | runDashboardQualityValidateTemplates | loadDashboardConfig_, writeDashboardQualitySection_ | Yes |
| `runDashboardQualityWorkflow` | 6057 | Menu/admin entry | runFullQualityCheck | runDashboardQualityProcessValidationSections_, markFrameworkStep_, runFrameworkTimed_ | No |
| `getExpectedNumberFormat_` | 6068 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `getGoogleSheetsNumberFormat_` | 6075 | Internal helper | applyGovernedNumberFormatsFromDashboard_, runDashboardQualityProcessValidationSections_ | — | No |
| `numberFormatsMatch_` | 6088 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `runDashboardQualityProcessValidationSections_` | 6099 | Internal helper | buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterListForMonth_, processRefinedDataUpdate_, runDashboardQual… | loadDashboardConfig_, getHeadersForSheetType_, getLatestSheetByPrefix_, getExpectedNumberFormat_, getGoogleSheetsNumberFormat_, numberFormatsMatch_, writeDashboardQualitySection_ | No |
| `runFrameworkSmokeValidation` | 6275 | Menu/admin entry | runFullQualityCheck | loadDashboardConfig_, getHeadersForSheetType_, buildHeaderIndexMap_, getPMRIndex_, notify_ | No |
| `runFullQualityCheck` | 6374 | Menu/admin entry | — | runFrameworkSmokeValidation, runDashboardQualityWorkflow, notify_ | No |
| `runFormatDashboardUpdates` | 6382 | Manual/admin or uncertain | — | runDashboardQualityConfigVerificationSections_, writeDashboardQualitySection_, notify_ | No |
| `getFormatDashboardDefaultSection_` | 7085 | Internal helper | BuildDefaultFormatDashboard, getFallbackDashboardConfig_, getSubheadersFromDashboardConfig_ | — | No |
| `buildFormatDashboardTemplate_` | 7098 | Internal helper | createSystemSheetTemplates, ensureDashboardQualityReport_, menuBuildDashboardTemplate | BuildDefaultFormatDashboard | No |
| `BuildDefaultFormatDashboard` | 7107 | Workflow/public helper | buildFormatDashboardTemplate_ | getFallbackDashboardConfig_, getFormatDashboardDefaultSection_, isValidHex_, calculateThemeLevels_, createTemplateFromBase_, resizeSheetGrid_, getTemplateConfigFromDashboard_, b… | Yes |
| `saveActiveLayoutAsRebuildDefault` | 7225 | Workflow/public helper | saveActiveLayoutToDashboardSettings | notify_ | Yes |
| `restoreFormatDashboardFromDefault` | 7246 | Manual/admin or uncertain | — | resizeSheetGrid_, recalculateDashboardHexCodes_, notify_ | Yes |
| `getFallbackDashboardConfig_` | 7303 | Internal helper | BuildDefaultFormatDashboard, createGovernedSheet_, loadDashboardConfig_ | getFormatDashboardDefaultSection_ | No |
| `loadDashboardConfig_` | 7451 | Internal helper | applyColumnWidthsEngine_, applyOperationalFormatting_, buildMonthlyChangeReportForMonth_, configReportTitleCheck_, createAllReportTemplat… | getFallbackDashboardConfig_, buildDashboardSectionIndex_ | Yes |
| `buildDashboardSectionIndex_` | 7682 | Internal helper | loadDashboardConfig_ | — | No |
| `getHeadersForSheetType_` | 7698 | Internal helper | buildMonthlyChangeReportForMonth_, buildTemplateArchiveRefinedData, createDisenrolledListForMonth_, createMasterListForMonth_, getSubhead… | — | No |
| `getTemplateConfigFromDashboard_` | 7715 | Internal helper | BuildDefaultFormatDashboard, buildDashboardQualityTemplate_, buildFrameworkTimingTemplate_, buildIndexTemplate_, buildOperationalReportTe… | loadDashboardConfig_, calculateThemeLevels_, getTemplateTheme_, getHeadersForSheetType_, getDashboardRowFormattingSpecs_, getSubheadersFromDashboardConfig_ | No |
| `getDashboardRowFormattingSpecs_` | 7773 | Internal helper | getTemplateConfigFromDashboard_ | — | No |
| `getSubheadersFromDashboardConfig_` | 7786 | Internal helper | buildMonthlyChangeReportForMonth_, clearDiagnosticsAndTimingLogs, getTemplateConfigFromDashboard_ | getFormatDashboardDefaultSection_, loadDashboardConfig_, getHeadersForSheetType_ | No |
| `getStandardSheetKey_` | 7840 | Internal helper | applyOperationalFormatting_ | — | No |
| `normalizeDashboardTargetA1_` | 7850 | Internal helper | — | — | No |
| `configReportTitleCheck_` | 7856 | Internal helper | — | loadDashboardConfig_ | No |
| `onEdit` | 7872 | Trigger/web entry | — | recalculateDashboardHexCodes_, handleFormatDashboardValueHighlighting_, logBestEffortWarning_ | No |
| `handleFormatDashboardValueHighlighting_` | 7889 | Internal helper | onEdit | — | Yes |
| `isValidHex_` | 7913 | Internal helper | BuildDefaultFormatDashboard, getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `hexToHsl_` | 7915 | Internal helper | calculateThemeLevels_ | — | No |
| `hslToHex_` | 7932 | Internal helper | calculateThemeLevels_ | — | No |
| `calculateThemeLevels_` | 7943 | Internal helper | BuildDefaultFormatDashboard, getTemplateConfigFromDashboard_, getTemplateTheme_, recalculateDashboardHexCodes_ | hexToHsl_, hslToHex_ | No |
| `getHslPercentsFromDashboard_` | 7960 | Internal helper | getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `getDashboardStructuralSectionBounds_` | 7981 | Internal helper | getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `getTemplateTheme_` | 8007 | Internal helper | applyIndexGroupDividerRules_, getTemplateConfigFromDashboard_ | getHslPercentsFromDashboard_, getDashboardStructuralSectionBounds_, isValidHex_, calculateThemeLevels_ | No |
| `recalculateDashboardHexCodes_` | 8032 | Internal helper | BuildDefaultFormatDashboard, onEdit, restoreFormatDashboardFromDefault | getHslPercentsFromDashboard_, getDashboardStructuralSectionBounds_, isValidHex_, calculateThemeLevels_ | Yes |
