# Master List v1.9.7.4.4 — Exhaustive Engineering Code Review

**Review date:** 2026-08-18
**Governing source:** `origin/main:Master_List/Current Production Script/v1.9.7.4.4`
**Prompt:** `Master_List/Prompts/ML_Exhaustive_Review_v2`
**Method:** complete static parse/AST inventory, call-path and entry-point inspection, v1.9.7.4.3 remediation-delta verification, specification comparison, and historical timing review. Production code was not modified; no live Apps Script execution was performed.

## 1. Executive Review Summary

| Measure | Result |
|---|---|
| Overall health | **86/100 — core corrections are substantially complete, with one post-commit factory loss path remaining** |
| Production readiness | **Not approved until ML19744-001 is corrected and focused recovery tests pass** |
| Critical | **0** |
| High | **1** |
| Medium | **1** |
| Low | **2** |
| Highest-risk workflow | Governed output replacement after the backup has been deleted |
| Primary bottleneck concern | Automatic quality validation remains inside primary workflow locks; current timing evidence is still required |
| Primary maintainability concerns | Cleanup logic does not distinguish pre-commit from post-commit state; six-digit timestamp names are not collision-proof; manual button toast cannot tell whether setup failed |
| Recommended next action | Make the factory commit state explicit and never delete the committed final sheet after the backup is gone. |

v1.9.7.4.4 corrects dual-sheet rollback, exact-target quality routing, contextual quality warnings, quality-stage timing, Monthly Change formatting bounds/duplication, workflow duplicate statements, manual restore-button delegation, and protected unique-name setup. Most v1.9.7.4.3 findings are closed. The remaining blocker is in the factory's outer catch: after a successful swap deletes the backup, a later `SpreadsheetApp.flush()` failure causes the catch to delete the newly committed final sheet, leaving no old or new target.

## 2. Repository and File Inventory

| Artifact | Role | Status |
|---|---|---|
| `origin/main:Master_List/Current Production Script/v1.9.7.4.4` | Governing executable; 8,103 lines / 389,759 bytes | Fully reviewed from synchronized remote object |
| `origin/main:Master_List/Current Production Script/v1.9.7.4.3` | Prior reviewed baseline | Used for delta validation only |
| v1.9.7.4.3 review/remediation documents | Prior findings and waves | Every finding revalidated |
| `Master_List/Audit Summary/v1.9.74.1/All_Waves_Correction_Checklist.md` | Consolidated tracker | Updated for v1.9.7.4.4 |
| Requested review/remediation prompts and applicable specifications | Standards | Applied |

The working branch has unique documentation commits and is behind `origin/main`; the synchronization tool correctly did not merge or rebase. The governing source was reviewed with `git show` without switching branches.

## 3. Function and Dependency Inventory

| Metric | Result |
|---|---:|
| Top-level declarations | **288** |
| Unique top-level names | **288** |
| Duplicate declarations | **0** |
| Menu callback strings | **39** |
| Missing menu callbacks | **0** |
| Confirmed undefined top-level dependencies | **0** |
| Conservative write/destructive functions | **83** |
| Initial no-static-path candidates | **17** |

Lexically unresolved names are nested local helpers/callback parameters or the guarded optional `buildMasterListMenu_` hook. None is a confirmed missing production dependency. Appendix A contains the complete compact inventory.

## 4. Complete Findings Register

### ML19744-001 — Post-commit factory error deletes the only completed target

- **Severity:** HIGH
- **Confidence:** High
- **Category:** Data integrity / governed replacement
- **Function/workflow:** `createGovernedSheet_`
- **Description:** The outer build catch always deletes `sheet` when non-null. During overwrite, the swap renames the old target to backup, renames the temporary sheet to the final name, and deletes the backup. `SpreadsheetApp.flush()` then runs inside the same outer try. If that flush throws after backup deletion, the outer catch deletes the committed final sheet. The old sheet is already gone.
- **Execution path:** New sheet built → backup rename succeeds → new final rename succeeds → backup deletion succeeds → flush throws → outer catch deletes new final → error propagates with no target remaining.
- **Operational impact:** A transient post-commit service error can remove the last valid Refined Data, Master List, Monthly Change, report, or template output.
- **Recommended correction:** Track explicit lifecycle state (`tempCreated`, `swapStarted`, `backupAvailable`, `commitComplete`). Delete the temporary sheet only before commit. Do not delete the final sheet after backup deletion; move nonessential flush/index work after the protected commit or retain the backup until final verification succeeds.
- **Breaking-change risk:** Low-medium; final names and business logic remain unchanged.
- **Focused tests:** Inject failures before/after temp naming, backup rename, final rename, backup deletion, flush, and Index refresh; verify one valid target always remains.

### ML19744-002 — Automatic quality checks still execute inside primary workflow locks

- **Severity:** MEDIUM
- **Confidence:** High
- **Category:** Performance / workflow boundaries
- **Function/workflow:** formatter, Refined, Disenrollment, Master List, and Monthly Change completion paths
- **Description:** v1.9.7.4.4 correctly passes the exact output and records contextual warnings/timing, but calls full quality validation before each locked workflow returns. Quality performs additional reads and Dashboard Quality report writes.
- **Operational impact:** Lock duration and primary runtime increase, potentially materially for Monthly Start/Update. No current timing report has yet demonstrated that the added cost is proportionate.
- **Recommended correction:** Use the new timing evidence to decide whether exact-target quality remains inline or becomes one explicit post-commit quality stage. Never remove it solely on speculation.
- **Breaking-change risk:** Low.
- **Focused tests:** Per-output quality duration, full Monthly Start/Update duration, concurrent second user, exact output results, and behavior when quality fails.

### ML19744-003 — Six-digit timestamp suffix does not guarantee a unique temporary name

- **Severity:** LOW
- **Confidence:** Confirmed
- **Category:** Runtime edge case / naming
- **Function/workflow:** `createGovernedSheet_`
- **Description:** The “unique” identifier is the final six digits of epoch milliseconds. It repeats approximately every 16.7 minutes and can collide with a leftover temp/backup or same-millisecond concurrent call.
- **Operational impact:** Replacement can fail at `setName`; cleanup now removes the copied sheet and preserves the old target, so this is a limited availability issue rather than data loss.
- **Recommended correction:** Resolve uniqueness against current sheet names with an incrementing/randomized bounded suffix.
- **Breaking-change risk:** None.
- **Focused tests:** Existing matching temp/backup, same-millisecond calls, repeated suffix cycle, and maximum final-name length.

### ML19744-004 — Manual restore-button command always reports success

- **Severity:** LOW
- **Confidence:** Confirmed
- **Category:** Diagnostics / manual administration
- **Function/workflow:** `buildRestoreButtonIcon` → `ensureRestoreButtonOnIndex_`
- **Description:** The manual function delegates correctly, but the helper catches setup failure and returns no status. The caller always displays “Restore icon ensured and script assigned,” even when image download/insertion failed.
- **Operational impact:** The operator may believe the button exists when only a warning was logged.
- **Recommended correction:** Return `{success, added, existing, error}` or a boolean from the helper and make the toast reflect the result.
- **Breaking-change risk:** None; the menu callback remains unchanged.
- **Focused tests:** Existing button, new button, failed fetch, failed insert, and missing helper.

## 5. Supported Entry-Point Report

All 39 menu callbacks resolve. Workflow, administrative, trigger, assigned-image, and web entry points remain compatible. `onOpen` remains local-only; scheduled/manual archive sync is retained. `onEdit` and automated quality failures now log context. `doGet` remains the locked restore web surface.

## 6. Orphan and Duplicate Code Report

- Duplicate top-level declarations: none.
- Prior no-op disenrollment stubs: removed.
- Prior duplicate/unreachable workflow statements: corrected.
- Confirmed unique-function orphans: none recommended for removal.
- Manual/dynamic surfaces remain retained pending live usage evidence.

## 7. Performance Report

Historical timing is directional only. v1.9.7.4.4 now records per-output automatic-quality duration, enabling a current evidence decision. Primary optimization priority is to measure these new stages within Monthly Start/Update and determine whether they should run once post-commit. Batched number formatting is retained; Monthly Change now supplies a bounded data-row count and invokes formatting once.

## 8. Data-Flow and Data-Integrity Report

Dual-sheet rollback now restores both Exclusion and Refined matrices and differentiates full recovery failure. PMR preflight, width normalization, backup swap, and source preservation remain strengths. ML19744-001 is the sole material remaining data-loss path: generic outer cleanup can delete the committed final target after its backup is gone.

## 9. Trigger and Concurrency Report

Document locks remain proportionate for the small user base. Simple-trigger cross-file access remains removed. Exact-target quality checks run while locks are held; timing and a two-user overlap test are needed. No enterprise orchestration is recommended.

## 10. Error Handling and Logging Review

Quality and restore-button errors now generate contextual warnings. Dual rollback distinguishes complete and failed recovery. The factory still conflates build cleanup and post-commit error handling, causing ML19744-001. Manual restore-button feedback is misleading on helper failure.

## 11. Maintainability and Architecture Review

The approved single-file, dashboard-driven, template-first, Primary PMR architecture is preserved. No modularization or business-logic redesign is recommended. Remaining changes are localized lifecycle-state, measured workflow-boundary, unique-name, and result-reporting corrections.

## 12. Prioritized Remediation Plan

See `Master_List/Audit Summary/v1.9.7.4.4/Exhaustive_Review_Remediation_Plan.md`:

1. Correct factory commit-state cleanup.
2. Measure and decide automatic-quality placement.
3. Make temporary names collision-proof.
4. Return truthful manual restore-button status.

## 13. Focused Regression Test Plan

- Factory failure injection at every lifecycle boundary.
- Monthly Start/Update automatic-quality timing and two-user lock overlap.
- Temp/backup collision and maximum-name cases.
- Restore-button success/existing/failure feedback.
- Full monthly, Refined, Disenrollment, Monthly Change, Master List, Index, Quality, and smoke regressions.

## 14. Final Conclusion

**Not approved due to one remaining High data-integrity defect.** v1.9.7.4.4 closes the prior dual-sheet rollback and most Medium/Low findings. Once factory cleanup is state-aware and focused failure tests confirm one valid target always survives, the script can move to conditional approval while runtime quality-stage timing is evaluated.

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
| `logBestEffortWarning_` | 585 | Internal helper | applyGovernedNumberFormatsFromDashboard_, archiveMonthlySheetsBySpecs_, assertParticipantTotalsMatch_, buildMonthlyChangeReportForMonth_,… | logRuntimeWarning_ | No |
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
| `applyGovernedNumberFormatsFromDashboard_` | 1799 | Internal helper | buildMonthlyChangeReportForMonth_, createGovernedSheet_ | getGoogleSheetsNumberFormat_, logBestEffortWarning_ | Yes |
| `enforceDataRowHeights_` | 1860 | Internal helper | createGovernedSheet_ | logBestEffortWarning_ | Yes |
| `collectMovedTitleInfoCells_` | 1891 | Internal helper | processSingleSubReport_ | logBestEffortWarning_ | No |
| `normalizeRawPreservationHeader_` | 1909 | Internal helper | appendSourceOnlyHeaders_, getMonthlyChangeSectionMap_, getSourceOnlyHeaders_ | — | No |
| `appendSourceOnlyHeaders_` | 1913 | Internal helper | — | normalizeRawPreservationHeader_ | No |
| `getSourceOnlyHeaders_` | 1928 | Internal helper | — | normalizeRawPreservationHeader_ | No |
| `readValidSourceDate_` | 1939 | Internal helper | stampMonthlySubReportSourceDates_ | — | No |
| `stampMonthlySubReportSourceDates_` | 1950 | Internal helper | processSingleSubReport_ | readValidSourceDate_, logBestEffortWarning_, markFrameworkStep_ | Yes |
| `normalizePreservedValue_` | 1966 | Internal helper | verifyRawDataSourceOnlyColumns_, verifyRawNumberColumnPreserved_, verifyRawSourceSheetUntouched_ | — | No |
| `verifyRawSourceSheetUntouched_` | 1982 | Internal helper | finalizeFormattedMonthlyOutput_ | getDataValues_, normalizePreservedValue_, markFrameworkStep_ | No |
| `verifyRawDataSourceOnlyColumns_` | 2006 | Internal helper | finalizeFormattedMonthlyOutput_ | markFrameworkStep_, buildHeaderIndexMap_, findHeaderIndex_, normalizePreservedValue_ | No |
| `writeRawDataParticipantTotals_` | 2047 | Internal helper | finalizeMonthlyParticipantTotals_ | buildHeaderIndexMap_, findHeaderIndex_, writeParticipantTotalTimestamp_, markFrameworkStep_ | Yes |
| `writeUniqueParticipantTotalToG1_` | 2099 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, writeParticipantTotalTimestamp_, markFrameworkStep_ | Yes |
| `writeParticipantTotalTimestamp_` | 2133 | Internal helper | writeRawDataParticipantTotals_, writeUniqueParticipantTotalToG1_ | — | Yes |
| `countUniqueParticipantsByStatus_` | 2138 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_ | No |
| `assertParticipantTotalsMatch_` | 2153 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | logBestEffortWarning_ | No |
| `notifyParticipantSafetyNotices_` | 2160 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | notify_ | No |
| `sortRowsByLastName_` | 2167 | Internal helper | processRefinedDataUpdate_ | buildHeaderIndexMap_, findHeaderIndex_ | Yes |
| `runFormatterPipeline_` | 2175 | Internal helper | executeMonthlyFormatterWorkflow_ | promptForLockedYearReportMonth_, markFrameworkStep_, loadDashboardConfig_, assertRequiredMonthlyImportsPresent_, processSingleSubReport_, logBestEffortWarning_, finalizeMonthlyP… | Yes |
| `assertRequiredMonthlyImportsPresent_` | 2263 | Internal helper | runFormatterPipeline_ | markFrameworkStep_, findSourceSheetForSubReport_ | No |
| `processSingleSubReport_` | 2289 | Internal helper | runFormatterPipeline_ | markFrameworkStep_, findSourceSheetForSubReport_, collectMovedTitleInfoCells_, getDataValues_, findHeaderIndex_, getHeadersForSheetType_, mapRowsToHeaders_, buildHeaderIndexMap_… | Yes |
| `verifyRawNumberColumnPreserved_` | 2433 | Internal helper | — | buildHeaderIndexMap_, findHeaderIndex_, normalizePreservedValue_, markFrameworkStep_ | No |
| `finalizeFormattedMonthlyOutput_` | 2452 | Internal helper | processSingleSubReport_ | verifyRawDataSourceOnlyColumns_, verifyRawSourceSheetUntouched_ | No |
| `finalizeMonthlyParticipantTotals_` | 2470 | Internal helper | runFormatterPipeline_ | getCurrentRawDataSheet_, markFrameworkStep_, getDataValues_, filterBlankRows_, writeRawDataParticipantTotals_ | No |
| `syncBannerFieldsIntoRawRows_` | 2488 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, buildLookupMap_ | No |
| `assignPrimaryPMRRowsToMatrix_` | 2530 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_ | Yes |
| `pruneAgedDisenrolledNonPrimaryRows_` | 2670 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, isPrimaryPMRRowValue_ | Yes |
| `findSourceSheetForSubReport_` | 2705 | Internal helper | assertRequiredMonthlyImportsPresent_, processSingleSubReport_ | isSheetNameMatchingMonth_ | No |
| `isSheetNameMatchingMonth_` | 2771 | Internal helper | findSourceSheetForSubReport_ | — | No |
| `buildRefinedDataFromScratch` | 2809 | Menu/admin entry | — | promptForLockedYearReportMonth_, processRefinedDataUpdate_ | No |
| `updateRefinedDataMonthlySync` | 2815 | Menu/admin entry | — | promptForLockedYearReportMonth_, processRefinedDataUpdate_ | No |
| `processRefinedDataUpdate_` | 2821 | Internal helper | buildRefinedDataFromScratch, runMonthlyStart, runMonthlyUpdate, updateRefinedDataMonthlySync | loadDashboardConfig_, getCurrentRawDataSheet_, getDataValues_, filterBlankRows_, getHeadersForSheetType_, mapRowsToHeaders_, stampRefinedTrackingFields_, getCurrentRefinedDataSh… | Yes |
| `normalizeMonthlyChangeSectionName_` | 2914 | Internal helper | getMonthlyChangeSectionMap_ | — | No |
| `getMonthlyChangeSectionMap_` | 2926 | Internal helper | processRefinedDataUpdate_ | buildMonthlySheetName_, normalizeMonthlyChangeSectionName_, normalizeRawPreservationHeader_ | Yes |
| `replaceChangedRefinedDataPMRs_` | 2955 | Internal helper | processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, mapRowsToHeaders_, isPrimaryPMRRowValue_, stampRefinedTrackingFields_, applyRefinedDataProcesses_, markFrameworkStep_ | Yes |
| `appendRefinedDataArchiveRows_` | 3035 | Internal helper | processRefinedDataUpdate_ | createGovernedSheet_, buildHeaderIndexMap_, findHeaderIndex_, markFrameworkStep_ | Yes |
| `stampRefinedTrackingFields_` | 3068 | Internal helper | processRefinedDataUpdate_, replaceChangedRefinedDataPMRs_ | buildHeaderIndexMap_ | No |
| `applyRefinedDataProcesses_` | 3085 | Internal helper | processRefinedDataUpdate_, replaceChangedRefinedDataPMRs_ | buildHeaderIndexMap_, getPMRIndex_, isPrimaryPMRRowValue_, markFrameworkStep_, combineRefinedDataNotesSummary_ | Yes |
| `combineRefinedDataNotesSummary_` | 3172 | Internal helper | applyRefinedDataProcesses_ | buildHeaderIndexMap_, findHeaderIndex_ | No |
| `createDisenrolledList` | 3203 | Menu/admin entry | — | promptForLockedYearReportMonth_, createDisenrolledListForMonth_ | No |
| `createDisenrolledListForMonth_` | 3209 | Internal helper | createDisenrolledList, finalizeSharedMonthlyWorkflow_ | loadDashboardConfig_, getCurrentRefinedDataSheet_, getDataValues_, getHeadersForSheetType_, findHeaderIndex_, getPMRIndex_, createGovernedSheet_, buildHeaderIndexMap_, filterBla… | Yes |
| `hideHistoricalDisenrollmentRows_` | 3431 | Internal helper | createDisenrolledListForMonth_ | — | Yes |
| `createMasterList` | 3455 | Menu/admin entry | — | promptForLockedYearReportMonth_, createMasterListForMonth_ | No |
| `createMasterListForMonth_` | 3461 | Internal helper | createMasterList, finalizeSharedMonthlyWorkflow_ | loadDashboardConfig_, getCurrentRefinedDataSheet_, getCurrentCarePlanDueSheet_, getCurrentUnlockedCarePlanSheet_, markFrameworkStep_, getDataValues_, filterBlankRows_, getHeader… | No |
| `normalizeNameKey_` | 3527 | Internal helper | buildNameKeyVariants_ | — | No |
| `buildNameKeyVariants_` | 3532 | Internal helper | buildCPDueLookupMap_, buildUnlockCPLookupMap_, mergeMasterListData_ | normalizeNameKey_ | No |
| `buildCPDueLookupMap_` | 3574 | Internal helper | mergeMasterListData_ | findHeaderIndex_, buildNameKeyVariants_ | Yes |
| `buildUnlockCPLookupMap_` | 3590 | Internal helper | mergeMasterListData_ | getPMRIndex_, findHeaderIndex_, normalizePMR_, buildNameKeyVariants_ | Yes |
| `getMappedValue_` | 3617 | Internal helper | mergeMasterListData_ | findHeaderIndex_ | No |
| `mergeMasterListData_` | 3623 | Internal helper | createMasterListForMonth_ | getPMRIndex_, buildCPDueLookupMap_, buildUnlockCPLookupMap_, findHeaderIndex_, normalizePMR_, buildNameKeyVariants_, getMappedValue_ | Yes |
| `buildMonthlyChangeReport` | 3688 | Menu/admin entry | — | promptForLockedYearReportMonth_, buildMonthlyChangeReportForMonth_ | No |
| `buildMonthlyChangeReportForMonth_` | 3694 | Internal helper | buildMonthlyChangeReport, runMonthlyUpdate | loadDashboardConfig_, getDataValues_, filterBlankRows_, markFrameworkStep_, getSubheadersFromDashboardConfig_, getHeadersForSheetType_, computeMonthlyChange_, createGovernedShee… | Yes |
| `applyMonthlyChangeSectionHHeaders_` | 3753 | Internal helper | buildMonthlyChangeReportForMonth_ | getSubheaderSectionBounds_ | Yes |
| `computeMonthlyChange_` | 3770 | Internal helper | buildMonthlyChangeReportForMonth_ | getPMRIndex_, groupMonthlyChangeRowsByPMR_, findHeaderIndex_, normalizeMonthlyChangeValue_, getMonthlyChangeParticipantEligibility_, getPrimaryMonthlyChangeRows_, isSameReportDa… | No |
| `getMonthlyChangeParticipantEligibility_` | 3918 | Internal helper | computeMonthlyChange_ | isSameReportDate_ | No |
| `getPrimaryMonthlyChangeRows_` | 3932 | Internal helper | computeMonthlyChange_ | findHeaderIndex_, isPrimaryPMRRowValue_ | No |
| `groupMonthlyChangeRowsByPMR_` | 3939 | Internal helper | computeMonthlyChange_ | — | Yes |
| `isSameReportDate_` | 3950 | Internal helper | computeMonthlyChange_, getMonthlyChangeParticipantEligibility_ | — | No |
| `getChangedHeadersAcrossAllRows_` | 3957 | Internal helper | computeMonthlyChange_ | findHeaderIndex_, normalizeMonthlyChangeValue_ | Yes |
| `normalizeMonthlyChangeValue_` | 3969 | Internal helper | computeMonthlyChange_, getChangedHeadersAcrossAllRows_ | — | No |
| `appendMonthlyChangeGroup_` | 3974 | Internal helper | computeMonthlyChange_ | mapRowsToHeaders_ | No |
| `appendMonthlyChangeRowsWithHighlights_` | 3984 | Internal helper | buildMonthlyChangeReportForMonth_ | appendDataToSubheaderSection_ | Yes |
| `organizeTabs` | 4017 | Workflow/public helper | enforceGlobalSheetSortOrder | getTargetRankForSheet_, getUnformattedSheetSortKey_, hideSheetIfNeeded_ | Yes |
| `getUnformattedSheetSortKey_` | 4109 | Internal helper | organizeTabs, populateIndexData | — | No |
| `positionSheetBySectionFRank_` | 4153 | Internal helper | buildGeneralTemplate_, createGovernedSheet_, processSingleSubReport_ | getTargetRankForSheet_, logBestEffortWarning_ | Yes |
| `getTargetRankForSheet_` | 4221 | Internal helper | matchSheetToSectionFRule_, organizeTabs, positionSheetBySectionFRank_ | — | No |
| `matchSheetToSectionFRule_` | 4287 | Internal helper | populateIndexData | getTargetRankForSheet_ | No |
| `hideMonthlyImportSheets` | 4305 | Menu/admin entry | — | promptForLockedYearReportMonth_, hideMonthlySheetsBySpecs_ | No |
| `hideMonthlyActiveSheets` | 4317 | Menu/admin entry | — | promptForLockedYearReportMonth_, hideMonthlySheetsBySpecs_ | No |
| `hideTemplates_` | 4328 | Internal helper | hideTemplates | hideReportTemplates | No |
| `showTemplates_` | 4329 | Internal helper | showTemplates | showReportTemplates | No |
| `getDashboardConfigForTemplateVisibility_` | 4331 | Internal helper | hideReportTemplates, showReportTemplates | loadDashboardConfig_, logBestEffortWarning_ | No |
| `hideReportTemplates` | 4341 | Workflow/public helper | hideTemplates_ | getDashboardConfigForTemplateVisibility_, setReportTemplateVisibility_, runFrameworkTimed_ | No |
| `showReportTemplates` | 4348 | Workflow/public helper | showTemplates_ | getDashboardConfigForTemplateVisibility_, setReportTemplateVisibility_, runFrameworkTimed_ | No |
| `setReportTemplateVisibility_` | 4355 | Internal helper | hideReportTemplates, showReportTemplates | hideSheetIfNeeded_, showSheetIfNeeded_, markFrameworkStep_ | No |
| `hideSystemSheets_` | 4389 | Menu/admin entry | — | hideSystemSheetsNow | No |
| `showSystemSheets_` | 4390 | Menu/admin entry | — | showSystemSheetsNow | No |
| `hideSystemSheetsNow` | 4392 | Workflow/public helper | hideSystemSheets_ | hideSheetIfNeeded_, notify_, runFrameworkTimed_ | No |
| `showSystemSheetsNow` | 4409 | Workflow/public helper | showSystemSheets_ | showSheetIfNeeded_, notify_, runFrameworkTimed_ | No |
| `hideMonthlySheetsBySpecs_` | 4426 | Internal helper | hideMonthlyActiveSheets, hideMonthlyImportSheets | findArchiveMonthlyCandidateSheetsUpToDate_, activateVisibleSheetBeforeHiding_, notify_, runFrameworkTimed_ | Yes |
| `archiveMonthlyImportSheets` | 4458 | Menu/admin entry | — | promptForLockedYearReportMonth_, archiveMonthlySheetsBySpecs_, populateActiveIndex, notifyArchiveMonthlySheetsResult_, runFrameworkTimed_ | No |
| `archiveMonthlyActiveSheets` | 4476 | Menu/admin entry | — | promptForLockedYearReportMonth_, archiveMonthlySheetsBySpecs_, populateActiveIndex, notifyArchiveMonthlySheetsResult_, runFrameworkTimed_ | No |
| `archiveMonthlySheetsBySpecs_` | 4494 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets | markFrameworkStep_, findArchiveMonthlyCandidateSheetsUpToDate_, logBestEffortWarning_, copySheetToArchiveAndDeleteLocal_, pingArchiveIndexUpdate_ | No |
| `pingArchiveIndexUpdate_` | 4538 | Internal helper | archiveMonthlySheetsBySpecs_ | logBestEffortWarning_ | No |
| `findArchiveMonthlyCandidateSheetsUpToDate_` | 4549 | Internal helper | archiveMonthlySheetsBySpecs_, hideMonthlySheetsBySpecs_ | extractFirstDateFromSheetName_ | Yes |
| `notifyArchiveMonthlySheetsResult_` | 4581 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets | — | No |
| `copySheetToArchiveAndDeleteLocal_` | 4588 | Internal helper | archiveMonthlySheetsBySpecs_ | archiveRawSourceSheet_, activateVisibleSheetBeforeHiding_ | Yes |
| `applyDelimitedProperty_` | 4600 | Internal helper | applyDashboardRowFormattingSpec_, applyTitleRows_ | applySingleCellProperty_ | No |
| `applySingleCellProperty_` | 4623 | Internal helper | applyDelimitedProperty_ | getWrapStrategyEnum_ | Yes |
| `getWrapStrategyEnum_` | 4645 | Internal helper | applyGeneralSheetDefaults_, applyOperationalFormatting_, applySingleCellProperty_, createOrRefreshBaseTemplate_ | — | No |
| `getBorderStyleEnum_` | 4653 | Internal helper | applyGeneralSheetDefaults_, createOrRefreshBaseTemplate_ | — | No |
| `createOrRefreshBaseTemplate_` | 4671 | Internal helper | createAllReportTemplates, createSystemSheetTemplates | createGovernedSheet_, loadDashboardConfig_, hasDashboardFormattingValue_, resizeSheetGrid_, getWrapStrategyEnum_, requireDashboardFormattingValue_, getBorderStyleEnum_, trimCrea… | Yes |
| `createTemplateFromBase_` | 4751 | Internal helper | BuildDefaultFormatDashboard, buildGeneralTemplate_ | createGovernedSheet_ | No |
| `buildGeneralTemplate_` | 4765 | Internal helper | BuildDefaultFormatDashboard, buildDashboardQualityTemplate_, buildFrameworkTimingTemplate_, buildIndexTemplate_, buildOperationalReportTe… | markFrameworkStep_, createTemplateFromBase_, positionSheetBySectionFRank_, resizeSheetGrid_, applyGeneralSheetDefaults_, validateDashboardFormattingConfig_, applyNativeBandingSa… | Yes |
| `applyGeneralSheetDefaults_` | 4828 | Internal helper | buildGeneralTemplate_ | requireDashboardFormattingValue_, getWrapStrategyEnum_, getBorderStyleEnum_ | Yes |
| `requireDashboardFormattingValue_` | 4863 | Internal helper | applyColumnWidthsEngine_, applyDashboardRowFormattingSpec_, applyGeneralSheetDefaults_, applyOperationalFormatting_, applyTitleRows_, bui… | — | No |
| `hasDashboardFormattingValue_` | 4870 | Internal helper | createOrRefreshBaseTemplate_ | — | No |
| `validateDashboardFormattingConfig_` | 4874 | Internal helper | buildGeneralTemplate_ | requireDashboardFormattingValue_ | No |
| `getDashboardSectionRowSpecs_` | 4900 | Internal helper | applyExistingSectionFormatting_, applySubheaderBlocks_, applyTitleRows_ | — | No |
| `applyExistingSectionFormatting_` | 4920 | Internal helper | buildGeneralTemplate_, buildOperationalReportTemplate_ | getDashboardSectionRowSpecs_, getDashboardRowFormattingSpec_, applyDashboardRowFormattingSpec_ | No |
| `getDashboardRowFormattingSpec_` | 4956 | Internal helper | applyExistingSectionFormatting_, applySubheaderBlocks_ | — | No |
| `applyDashboardRowFormattingSpec_` | 4964 | Internal helper | applyExistingSectionFormatting_, applyTitleRows_ | requireDashboardFormattingValue_, applyDelimitedProperty_ | Yes |
| `applyTitleRows_` | 4975 | Internal helper | buildGeneralTemplate_ | getDashboardSectionRowSpecs_, applyDelimitedProperty_, requireDashboardFormattingValue_, applyDashboardRowFormattingSpec_ | Yes |
| `applySubheaderBlocks_` | 5002 | Internal helper | buildGeneralTemplate_ | getDashboardSectionRowSpecs_, getDashboardRowFormattingSpec_ | Yes |
| `applyColumnWidthsEngine_` | 5056 | Internal helper | buildGeneralTemplate_ | loadDashboardConfig_, requireDashboardFormattingValue_ | Yes |
| `applyOperationalFormatting_` | 5091 | Internal helper | buildOperationalReportTemplate_, buildTemplateArchiveRefinedData | loadDashboardConfig_, getStandardSheetKey_, resizeSheetGrid_, requireDashboardFormattingValue_, getWrapStrategyEnum_, trimCreatedSheetToSize_ | Yes |
| `writeTemplateMetadata_` | 5161 | Internal helper | buildGeneralTemplate_ | — | Yes |
| `createSystemTemplates` | 5168 | Workflow/public helper | createSystemSheetTemplates | buildFrameworkTimingTemplate_, buildDashboardQualityTemplate_, buildIndexTemplate_ | No |
| `buildFrameworkTimingTemplate_` | 5174 | Internal helper | createSystemTemplates, ensureFrameworkTimingReport_ | getTemplateConfigFromDashboard_, buildGeneralTemplate_ | No |
| `buildDashboardQualityTemplate_` | 5180 | Internal helper | createSystemTemplates | getTemplateConfigFromDashboard_, buildGeneralTemplate_ | No |
| `buildIndexTemplate_` | 5186 | Internal helper | createSystemTemplates | getTemplateConfigFromDashboard_, buildGeneralTemplate_, requireDashboardFormattingValue_, applyIndexGroupDividerRules_ | Yes |
| `createAllReportTemplates` | 5203 | Workflow/public helper | createOrRefreshAllReportTemplates, quickBuildAllTemplates | loadDashboardConfig_, createOrRefreshBaseTemplate_, buildTemplateBannerReport, buildTemplateCarePlanDue, buildTemplateUnlockedCarePlan, buildTemplateRawData, buildTemplateRefine… | No |
| `buildOperationalReportTemplate_` | 5225 | Internal helper | buildTemplateBannerReport, buildTemplateCarePlanDue, buildTemplateDisenrolledExclusion, buildTemplateMasterList, buildTemplateMonthlyChan… | getTemplateConfigFromDashboard_, buildGeneralTemplate_, applyOperationalFormatting_, applyExistingSectionFormatting_, applyOperationalTemplateSort_ | No |
| `applyOperationalTemplateSort_` | 5239 | Internal helper | buildOperationalReportTemplate_, buildTemplateArchiveRefinedData | — | No |
| `buildTemplateArchiveRefinedData` | 5251 | Workflow/public helper | createAllReportTemplates | getTemplateConfigFromDashboard_, getHeadersForSheetType_, buildGeneralTemplate_, applyOperationalFormatting_, applyOperationalTemplateSort_ | No |
| `buildTemplateBannerReport` | 5266 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateCarePlanDue` | 5267 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateUnlockedCarePlan` | 5268 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateRawData` | 5269 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateRefinedData` | 5270 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateDisenrolledExclusion` | 5271 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateMasterList` | 5272 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateMonthlyChange` | 5273 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `updateIndexSheet` | 5284 | Menu/admin entry | configureArchiveSpreadsheetId, configureIndexRestoreWebAppUrl | populateIndexData, populateActiveIndex, syncArchiveIndexToActiveIndex_ | No |
| `populateActiveIndex` | 5296 | Workflow/public helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets, checkSheetDeletionAndUpdateIndex_, createGovernedSheet_, createIndexSheet, finali… | populateIndexData | No |
| `populateIndexData` | 5300 | Workflow/public helper | populateActiveIndex, updateIndexSheet | ensureRestoreButtonOnIndex_, loadDashboardConfig_, matchSheetToSectionFRule_, extractFirstDateFromSheetName_, getUnformattedSheetSortKey_, resizeSheetGrid_ | Yes |
| `ensureRestoreButtonOnIndex_` | 5480 | Internal helper | buildRestoreButtonIcon, populateIndexData | logBestEffortWarning_ | Yes |
| `applyIndexGroupDividerRules_` | 5505 | Internal helper | buildIndexTemplate_, createIndexSheet | getTemplateTheme_ | Yes |
| `syncArchiveIndexToActiveIndex_` | 5542 | Trigger/web entry | runManualArchiveSync, setupArchiveSyncTrigger, updateIndexSheet | logBestEffortWarning_, resizeSheetGrid_ | Yes |
| `checkSheetDeletionAndUpdateIndex_` | 5663 | Internal helper | onOpen | populateActiveIndex | Yes |
| `runManualArchiveSync` | 5679 | Manual/admin or uncertain | — | syncArchiveIndexToActiveIndex_ | No |
| `buildRestoreButtonIcon` | 5691 | Manual/admin or uncertain | — | ensureRestoreButtonOnIndex_ | No |
| `restoreSheetFromActiveIndexRow` | 5714 | Menu/admin entry | — | restoreSheetFromArchiveWorkbook | Yes |
| `restoreSheetFromArchiveWorkbook` | 5779 | Workflow/public helper | doGet, restoreSheetFromActiveIndexRow | openArchiveSpreadsheetOnce_, loadDashboardConfig_, getGovernedSheetTypeForName_, createGovernedSheet_, populateActiveIndex | Yes |
| `escapeHtml_` | 5811 | Internal helper | doGet | — | No |
| `doGet` | 5820 | Trigger/web entry | — | restoreSheetFromArchiveWorkbook, escapeHtml_ | No |
| `configureIndexRestoreWebAppUrl` | 5835 | Menu/admin entry | — | updateIndexSheet | Yes |
| `configureArchiveSpreadsheetId` | 5854 | Menu/admin entry | — | updateIndexSheet | Yes |
| `configureArchiveWebAppUrl` | 5880 | Manual/admin or uncertain | — | — | Yes |
| `runDashboardQualityConfigVerificationSections_` | 5903 | Internal helper | runDashboardQualityStartUp, runFormatDashboardUpdates | — | No |
| `writeDashboardQualitySection_` | 5932 | Internal helper | runDashboardQualityProcessValidationSections_, runDashboardQualityStartUp, runDashboardQualityValidateTemplates, runFormatDashboardUpdate… | ensureDashboardQualityReport_, appendDataToSubheaderSection_, getSubheaderSectionHeaders_ | Yes |
| `ensureDashboardQualityReport_` | 5955 | Internal helper | writeDashboardQualitySection_ | buildFormatDashboardTemplate_, getTemplateConfigFromDashboard_, buildGeneralTemplate_, createActiveSheetFromTemplate_ | No |
| `runDashboardQualityStartUp` | 5972 | Menu/admin entry | quickSystemSetup | runDashboardQualityConfigVerificationSections_, writeDashboardQualitySection_, markFrameworkStep_, runFrameworkTimed_ | No |
| `runDashboardQualityValidateTemplates` | 5981 | Menu/admin entry | quickBuildAllTemplates | writeDashboardQualitySection_, runTemplateDateFormatValidation_, markFrameworkStep_, runFrameworkTimed_ | No |
| `runTemplateDateFormatValidation_` | 6019 | Internal helper | runDashboardQualityValidateTemplates | loadDashboardConfig_, writeDashboardQualitySection_ | Yes |
| `runDashboardQualityWorkflow` | 6101 | Menu/admin entry | runFullQualityCheck | runDashboardQualityProcessValidationSections_, markFrameworkStep_, runFrameworkTimed_ | No |
| `getExpectedNumberFormat_` | 6112 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `getGoogleSheetsNumberFormat_` | 6119 | Internal helper | applyGovernedNumberFormatsFromDashboard_, runDashboardQualityProcessValidationSections_ | — | No |
| `numberFormatsMatch_` | 6132 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `runDashboardQualityProcessValidationSections_` | 6143 | Internal helper | buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterListForMonth_, processRefinedDataUpdate_, runDashboardQual… | loadDashboardConfig_, getHeadersForSheetType_, getLatestSheetByPrefix_, getExpectedNumberFormat_, getGoogleSheetsNumberFormat_, numberFormatsMatch_, writeDashboardQualitySection_ | No |
| `runFrameworkSmokeValidation` | 6322 | Menu/admin entry | runFullQualityCheck | loadDashboardConfig_, getHeadersForSheetType_, buildHeaderIndexMap_, getPMRIndex_, notify_ | No |
| `runFullQualityCheck` | 6421 | Menu/admin entry | — | runFrameworkSmokeValidation, runDashboardQualityWorkflow, notify_ | No |
| `runFormatDashboardUpdates` | 6429 | Manual/admin or uncertain | — | runDashboardQualityConfigVerificationSections_, writeDashboardQualitySection_, notify_ | No |
| `getFormatDashboardDefaultSection_` | 7132 | Internal helper | BuildDefaultFormatDashboard, getFallbackDashboardConfig_, getSubheadersFromDashboardConfig_ | — | No |
| `buildFormatDashboardTemplate_` | 7145 | Internal helper | createSystemSheetTemplates, ensureDashboardQualityReport_, menuBuildDashboardTemplate | BuildDefaultFormatDashboard | No |
| `BuildDefaultFormatDashboard` | 7154 | Workflow/public helper | buildFormatDashboardTemplate_ | getFallbackDashboardConfig_, getFormatDashboardDefaultSection_, isValidHex_, calculateThemeLevels_, createTemplateFromBase_, resizeSheetGrid_, getTemplateConfigFromDashboard_, b… | Yes |
| `saveActiveLayoutAsRebuildDefault` | 7272 | Workflow/public helper | saveActiveLayoutToDashboardSettings | notify_ | Yes |
| `restoreFormatDashboardFromDefault` | 7293 | Manual/admin or uncertain | — | resizeSheetGrid_, recalculateDashboardHexCodes_, notify_ | Yes |
| `getFallbackDashboardConfig_` | 7350 | Internal helper | BuildDefaultFormatDashboard, createGovernedSheet_, loadDashboardConfig_ | getFormatDashboardDefaultSection_ | No |
| `loadDashboardConfig_` | 7498 | Internal helper | applyColumnWidthsEngine_, applyOperationalFormatting_, buildMonthlyChangeReportForMonth_, configReportTitleCheck_, createAllReportTemplat… | getFallbackDashboardConfig_, buildDashboardSectionIndex_ | Yes |
| `buildDashboardSectionIndex_` | 7729 | Internal helper | loadDashboardConfig_ | — | No |
| `getHeadersForSheetType_` | 7745 | Internal helper | buildMonthlyChangeReportForMonth_, buildTemplateArchiveRefinedData, createDisenrolledListForMonth_, createMasterListForMonth_, getSubhead… | — | No |
| `getTemplateConfigFromDashboard_` | 7762 | Internal helper | BuildDefaultFormatDashboard, buildDashboardQualityTemplate_, buildFrameworkTimingTemplate_, buildIndexTemplate_, buildOperationalReportTe… | loadDashboardConfig_, calculateThemeLevels_, getTemplateTheme_, getHeadersForSheetType_, getDashboardRowFormattingSpecs_, getSubheadersFromDashboardConfig_ | No |
| `getDashboardRowFormattingSpecs_` | 7820 | Internal helper | getTemplateConfigFromDashboard_ | — | No |
| `getSubheadersFromDashboardConfig_` | 7833 | Internal helper | buildMonthlyChangeReportForMonth_, clearDiagnosticsAndTimingLogs, getTemplateConfigFromDashboard_ | getFormatDashboardDefaultSection_, loadDashboardConfig_, getHeadersForSheetType_ | No |
| `getStandardSheetKey_` | 7887 | Internal helper | applyOperationalFormatting_ | — | No |
| `normalizeDashboardTargetA1_` | 7897 | Internal helper | — | — | No |
| `configReportTitleCheck_` | 7903 | Internal helper | — | loadDashboardConfig_ | No |
| `onEdit` | 7919 | Trigger/web entry | — | recalculateDashboardHexCodes_, handleFormatDashboardValueHighlighting_, logBestEffortWarning_ | No |
| `handleFormatDashboardValueHighlighting_` | 7936 | Internal helper | onEdit | — | Yes |
| `isValidHex_` | 7960 | Internal helper | BuildDefaultFormatDashboard, getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `hexToHsl_` | 7962 | Internal helper | calculateThemeLevels_ | — | No |
| `hslToHex_` | 7979 | Internal helper | calculateThemeLevels_ | — | No |
| `calculateThemeLevels_` | 7990 | Internal helper | BuildDefaultFormatDashboard, getTemplateConfigFromDashboard_, getTemplateTheme_, recalculateDashboardHexCodes_ | hexToHsl_, hslToHex_ | No |
| `getHslPercentsFromDashboard_` | 8007 | Internal helper | getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `getDashboardStructuralSectionBounds_` | 8028 | Internal helper | getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `getTemplateTheme_` | 8054 | Internal helper | applyIndexGroupDividerRules_, getTemplateConfigFromDashboard_ | getHslPercentsFromDashboard_, getDashboardStructuralSectionBounds_, isValidHex_, calculateThemeLevels_ | No |
| `recalculateDashboardHexCodes_` | 8079 | Internal helper | BuildDefaultFormatDashboard, onEdit, restoreFormatDashboardFromDefault | getHslPercentsFromDashboard_, getDashboardStructuralSectionBounds_, isValidHex_, calculateThemeLevels_ | Yes |
