# Master List v1.9.74.1 — Exhaustive Engineering Code Review

**Review date:** 2026-08-18
**Governing production source:** `Master_List/Current Production Script/v1.9.74.1` from `origin/main`
**Review prompt:** `Master_List/Prompts/ML_Exhaustive_Review_v2`
**Method:** complete static parse and top-level AST inventory; call-graph and entry-point tracing; targeted execution-path inspection; v1.9.74 delta analysis; comparison with current framework specifications and normalized historical timing evidence. No production code was modified and no live workbook execution was performed.

## 1. Executive Review Summary

| Measure | Result |
|---|---|
| Overall health | **66/100 — major prior defects were addressed, but the release introduces or retains material Index and two-sheet commit defects** |
| Production readiness | **Not approved until the four High findings are corrected** |
| Critical | **0** |
| High | **4** |
| Medium | **3** |
| Low | **2** |
| Highest-risk workflows | Index refresh after a restore image exists; Disenrolled Exclusion rewrite; Refined Data write; governed overwrite final swap |
| Primary bottlenecks | Historical averages remain Monthly Update 144.679 s, Monthly Start 123.196 s, Format Monthly Sheets 106.731 s, and template refresh 85.917 s; v1.9.74.1 removes row-by-row exclusion deletion but has no current timing evidence |
| Primary maintainability concerns | Two intentional legacy stubs, silent best-effort catches, expanded smoke checks that still do not execute dependencies, and an unused `archiveSs` parameter |
| Recommended next action | Correct the Index image API, make both replacement paths fail-safe, enforce PMR and matrix-width preconditions, then execute focused Index/disenrollment/factory regression tests. |

### Production-readiness conclusion

v1.9.74.1 correctly removes the stray `JavaScript` startup token, eliminates all duplicate top-level declarations, changes the sheet factory to build a temporary output before replacement, moves disenrollment filtering to memory, removes row-by-row deletion, expands smoke symbol coverage, and logs `onEdit` failures. Those are meaningful improvements. The release is still not ready because the new Index helper invokes a nonexistent method, the governed swap still deletes the old target before the final rename succeeds, and the rewritten disenrollment commit can erase or partially rewrite related sheets under realistic schema or width conditions.

## 2. Repository and File Inventory

| Artifact | Role | Review status |
|---|---|---|
| `origin/main:Master_List/Current Production Script/v1.9.74.1` | Governing executable; 7,896 lines / 380,596 bytes | Reviewed completely from the synchronized remote object |
| `Master_List/Current Production Script/v1.9.74` | Prior local production baseline | Used only for remediation/delta verification |
| `Master_List/Audit Summary/v1.9.74/Exhaustive_Engineering_Code_Review.md` | Prior findings register | Every prior finding revalidated |
| `Master_List/Prompts/ML_Exhaustive_Review_v2` | Exhaustive review contract | Applied |
| `prompts/Projects/Exhaustive_Review_Remediation` | Findings-validation and remediation-plan contract | Applied in the companion remediation plan |
| `Framework/spec/EXHAUSTIVE_CODE_REVIEW_PROTOCOL.md` | Repository review protocol | Applied |
| `Framework/spec/GOOGLE_APPS_SCRIPT_STANDARDS.md` | Apps Script standard | Applied |
| `Framework/spec/DEPENDENCY_REVIEW_STANDARD.md` | Dependency/orphan standard | Applied |
| `Framework/spec/PERFORMANCE_STANDARD.md` | Performance standard | Applied |
| `Master_List/Specs/Current_Working_Framework_Spec_v2.0.md` | Current project architecture/workflow specification | Compared to implementation |
| Normalized timing CSV files | Historical runtime evidence | Reviewed as directional evidence; not treated as v1.9.74.1 benchmark proof |

The synchronization tool confirmed that `v1.9.74.1` exists on `origin/main`. The current `work` branch has one unique local commit and is six commits behind `origin/main`, so repository policy prevented an automatic merge or rebase. The review therefore used `git show origin/main:...` without changing branches or altering the governing source.

## 3. Function and Dependency Inventory

| Metric | Result |
|---|---:|
| Top-level function declarations | **290** |
| Unique top-level function names | **290** |
| Duplicate declarations | **0** |
| Menu callback strings | **39** |
| Missing menu callbacks | **0** |
| Confirmed undefined top-level function dependencies | **0** |
| Functions with conservative write/destructive operations | **83** |
| Suspected no-static-path declarations before manual classification | **19** |

Lexical unresolved names are nested local helpers/callback parameters (`appendDefaultDashboardSection_`, `buildHeaderPairs_`, `checkPairsChanged_`, `getIndex`, `getRowTime_`, `mapFallbackRows`, `parseSectionRows_`, `setIfPresent`, `f`, and `func`) plus the guarded optional hook `buildMasterListMenu_`. None is a confirmed missing top-level dependency. The invalid `getAssignScript()` member call is an API-method defect, not a missing top-level function.

The complete compact function inventory appears in Appendix A.

## 4. Complete Findings Register

### ML19741-001 — Invalid OverGridImage getter breaks repeat Index refreshes

- **Severity:** HIGH
- **Confidence:** Confirmed
- **Category:** Correctness / Apps Script API / Index
- **Function/workflow:** `ensureRestoreButtonOnIndex_` → `populateIndexData` → `populateActiveIndex`
- **Description:** The helper calls `images[i].getAssignScript()`. `OverGridImage` exposes `getScript()` as the getter and `assignScript()` as the setter; `getAssignScript()` does not exist.
- **Execution path:** An empty Index can add the restore image on the first refresh. On the next refresh, `getImages()` returns it and the invalid method throws before timestamps, active-sheet inventory, or matrix output are updated.
- **Operational impact:** Monthly Start, Monthly Update, sheet creation, menu Index updates, and other finalization paths can fail or leave a stale Index after the image has been added.
- **Recommended correction:** Use `images[i].getScript()`. Put optional image inspection/insertion behind a best-effort boundary that logs context but always permits Index data population. Route `buildRestoreButtonIcon` through the same idempotent helper.
- **Breaking-change risk:** None for the getter; low for wrapper consolidation.
- **Focused testing:** No image, matching image, unrelated image, blocked fetch, repeated Index refresh, manual button command, Monthly Start/Update finalization.

### ML19741-002 — Temporary factory still deletes the prior target before final rename succeeds

- **Severity:** HIGH
- **Confidence:** High
- **Category:** Data integrity / governed sheet factory
- **Function/workflow:** `resolveSheetGovernance_` → `createGovernedSheet_`
- **Description:** v1.9.74.1 safely builds and populates a temporary sheet, but the final swap calls `deleteSheet(existingTargetSheet)` before `sheet.setName(finalName)`. If the rename fails after deletion, the catch deletes the temporary sheet, leaving neither old nor new output.
- **Execution path:** Old target exists → temporary build completes → old target deletion succeeds → rename encounters a transient service error or invalid overlength temporary/final name state → catch deletes temporary output.
- **Operational impact:** A rerun can remove the last valid Refined Data, Master List, Monthly Change, monthly report, or template output despite the intended safe-commit remediation.
- **Recommended correction:** Preserve the old target under a unique backup name, rename the completed temporary output to the final name, validate it, then delete the backup. On failure, restore the backup name. Cap temporary names within the 100-character Sheets limit.
- **Breaking-change risk:** Low-medium; public final names remain unchanged.
- **Focused testing:** Failure injection at copy, write, old-target rename, new-target rename, validation, and backup deletion; 100-character target name; hidden active target; only-sheet guard.

### ML19741-003 — Refined Data rewrite can use a range wider than its row matrices

- **Severity:** HIGH
- **Confidence:** Confirmed
- **Category:** Correctness / data write / disenrollment
- **Function/workflow:** `createDisenrolledListForMonth_`
- **Description:** `refinedWidth` is the maximum of governed header count and physical sheet columns. `mappedRetainedRefined` rows are produced at governed-header width, but `setValues` uses `refinedWidth` columns without normalizing the rows.
- **Execution path:** Refined Data has more physical columns than the current governed header list → `refinedWidth > refinedHeaders.length` → exclusion sheet has already been rewritten → Refined Data `setValues` throws a column-count mismatch.
- **Operational impact:** Disenrolled Exclusion is committed while Refined Data remains cleared or unchanged/partial, producing cross-sheet inconsistency in a supported core workflow.
- **Recommended correction:** Either write exactly `refinedHeaders.length` columns or normalize every retained row to `refinedWidth`. Validate dimensions before clearing either sheet.
- **Breaking-change risk:** Low.
- **Focused testing:** Physical width equal to, less than, and greater than governed headers; zero retained rows; extra legacy columns; injected `setValues` failure.

### ML19741-004 — Missing exclusion PMR schema fails open and can erase durable exclusion rows

- **Severity:** HIGH
- **Confidence:** High
- **Category:** Data integrity / schema validation
- **Function/workflow:** `createDisenrolledListForMonth_`
- **Description:** When `getPMRIndex_(exclusionData.headerMap)` returns `-1`, the code does not fail. It leaves `retainedExclusionRows` empty and later clears and replaces the entire exclusion body with only newly mapped rows.
- **Execution path:** Existing Disenrolled Exclusion header is renamed/missing/misaligned → PMR index is `-1` → existing rows are not retained → commit clears the existing body → historical durable exclusions disappear.
- **Operational impact:** Required historical exclusion records can be removed, and duplicate prevention is disabled. This is a realistic schema-drift path and is not merely a formatting concern.
- **Recommended correction:** Require PMR indexes in existing exclusion, target headers, Refined Data, and mapped output before any mutation. Throw a schema-specific error and leave both sheets unchanged.
- **Breaking-change risk:** None; fail-closed behavior preserves approved logic.
- **Focused testing:** Missing/renamed/duplicate PMR headers in each surface; empty new sheet; existing historical rows; mapped row with blank PMR.

### ML19741-005 — Two-sheet disenrollment commit remains non-atomic

- **Severity:** MEDIUM
- **Confidence:** Confirmed
- **Category:** Data flow / partial completion
- **Function/workflow:** `createDisenrolledListForMonth_`
- **Description:** In-memory calculation is an improvement, but the workflow still clears/writes Disenrolled Exclusion and then clears/writes Refined Data without a recovery snapshot. Any second-stage failure leaves only the first sheet committed.
- **Operational impact:** Transient service failures can leave the two operational sheets inconsistent. ML19741-003 makes this path immediately plausible.
- **Recommended correction:** Validate all dimensions first, retain both pre-write matrices in memory, and restore the first sheet if the second write fails. This is a narrow two-sheet recovery measure, not general transaction infrastructure.
- **Breaking-change risk:** Medium because stateful ordering and hidden rows must remain stable.
- **Focused testing:** Failure before/after each clear/write; restoration failure logging; repeat execution remains idempotent.

### ML19741-006 — Expanded smoke validation still validates symbols rather than executable dependencies

- **Severity:** MEDIUM
- **Confidence:** Confirmed
- **Category:** Diagnostics / testability
- **Function/workflow:** `runFrameworkSmokeValidation`
- **Description:** The function now checks 19 important symbols and three sheets, but it does not exercise safe dependency probes. It therefore reports PASS while `populateActiveIndex` contains the invalid image method and while matrix/schema preconditions are unsafe.
- **Operational impact:** The diagnostic can provide misleading readiness confidence, although it remains useful for missing symbols and system sheets.
- **Recommended correction:** Add side-effect-free dependency checks: verify supported image methods on an existing image when present, validate required Index/Refined/Exclusion headers, and validate configured templates without running destructive workflows.
- **Breaking-change risk:** None.
- **Focused testing:** Missing symbol, missing sheet, invalid image method, missing PMR header, no images, and valid configuration.

### ML19741-007 — `onOpen` attempts cross-file archive access from a simple trigger

- **Severity:** MEDIUM
- **Confidence:** High
- **Category:** Trigger / authorization / diagnostics
- **Function/workflow:** `onOpen` → `syncArchiveIndexToActiveIndex_`
- **Description:** A reserved simple `onOpen` trigger calls `SpreadsheetApp.openById` for an external archive workbook. Simple triggers execute without user authorization and cannot use services requiring authorization. The inner catch logs and returns, so the menu survives but the promised automatic archive pull is unreliable.
- **Operational impact:** The active Index may remain stale on open even though comments state it automatically synchronizes. The installed 15-minute trigger remains the correct authorized mechanism.
- **Recommended correction:** Keep `onOpen` limited to menu/local setup, or install an authorized open trigger explicitly. Continue using the scheduled trigger/manual sync for archive access.
- **Breaking-change risk:** Low.
- **Focused testing:** Simple open trigger execution log, installed trigger owner, scheduled sync, manual sync, inaccessible archive.

### ML19741-008 — Legacy disenrollment helpers are confirmed no-op orphans

- **Severity:** LOW
- **Confidence:** Confirmed
- **Category:** Orphan/compatibility cleanup
- **Function/workflow:** `removeReenrolledRowsFromExclusion_`, `appendDisenrolledRowsAtBottom_`
- **Description:** Both helpers are retained as zero-return stubs, have no static callers, are underscore-private, are absent from menus/triggers/string callbacks, and their former behavior is embedded in `createDisenrolledListForMonth_`.
- **Operational impact:** No runtime defect, but future callers could silently do nothing and maintainers may mistake the stubs for supported behavior.
- **Recommended correction:** Remove both in the cleanup wave after one final dynamic-reference search. Do not retain silent compatibility stubs for private helpers.
- **Breaking-change risk:** Low.
- **Focused testing:** Static/dynamic reference search and complete disenrollment regression suite.

### ML19741-009 — `updateIndexSheet` retains an unused archive parameter

- **Severity:** LOW
- **Confidence:** Confirmed
- **Category:** Maintainability / interface clarity
- **Function/workflow:** `updateIndexSheet(archiveSs)`
- **Description:** `archiveSs` is never read. The menu calls the function without arguments, and archive sync independently opens its configured workbook.
- **Operational impact:** Minor ambiguity about whether a caller-supplied archive object is honored.
- **Recommended correction:** Remove the parameter if no external/manual caller depends on it, or pass it into the sync path consistently. Preserve the zero-argument menu contract.
- **Breaking-change risk:** Low but externally callable Apps Script functions require a usage check.
- **Focused testing:** Menu Index update, direct no-argument invocation, and any documented/manual parameterized call.

## 5. Supported Entry-Point Report

### Menu/admin callbacks

All 39 `.addItem()` callback strings resolve. The updated menu exposes monthly formatting/start/update, quality/startup/template validation, data processing, Index update/restore/configuration, layout/archive/hide/show actions, dashboard/system setup, and individual formatter workflows.

### Trigger/web entry points

- `onOpen` — startup/menu trigger; syntax defect corrected, but external archive sync has the authorization limitation in ML19741-007.
- `onEdit` — dashboard recalculation/highlighting trigger; now logs failures through `logBestEffortWarning_`.
- `syncArchiveIndexToActiveIndex_` — installed time-trigger/manual target.
- `doGet` — locked archive-restore web entry point.

### Public workflows

`formatMonthlySheets`, `runMonthlyStart`, `runMonthlyUpdate`, `buildRefinedDataFromScratch`, `updateRefinedDataMonthlySync`, `createDisenrolledList`, `buildMonthlyChangeReport`, `createMasterList`, `quickSystemSetup`, `quickBuildAllTemplates`, and quality/index administration remain supported.

### Compatibility and uncertain surfaces

Manual/admin functions without menu roots include `runManualArchiveSync`, `buildRestoreButtonIcon`, `configureArchiveWebAppUrl`, `runFormatDashboardUpdates`, and `restoreFormatDashboardFromDefault`. They are retained manual surfaces until live assignments/operator usage are checked.

## 6. Orphan and Duplicate Code Report

- **Confirmed duplicate declarations:** none. v1.9.74.1 resolves all six duplicate names from v1.9.74.
- **Confirmed orphans:** the two private no-op legacy disenrollment stubs (ML19741-008).
- **Probable orphans:** none recommended for immediate deletion.
- **Dynamic/uncertain helpers:** `logFrameworkTiming_`, `valuesAreEqual_`, `getMonthDateParts_`, `setRequiredSheetName_`, `ensureOutputSheetHasFormattedRows_`, `applyColumnWidths_`, `refreshIndexAfterSheetWorkflow_`, `appendSourceOnlyHeaders_`, `getSourceOnlyHeaders_`, `verifyRawNumberColumnPreserved_`, `normalizeDashboardTargetA1_`, and `configReportTitleCheck_` remain uncertain or bypassed, not confirmed removal candidates.

## 7. Performance Report

| Rank | Workflow/path | Evidence and impact | Recommendation | Risk |
|---|---|---|---|---|
| 1 | Monthly Update | Historical mean 144.679 s; range 87.237–303.289 s over 11 runs | Obtain v1.9.74.1 stage timing after correctness fixes; consolidate demonstrated redundant Index/timing refreshes only | Medium |
| 2 | Monthly Start | Historical mean 123.196 s; range 95.672–148.866 s over 6 runs | Reuse loaded dashboard/workflow context and refresh Index once at finalization | Low-medium |
| 3 | Format Monthly Sheets | Historical mean 106.731 s; range 34.696–267.257 s over 25 runs | Preserve batched mapping; use current timing to isolate copy/archive/flush costs | Low |
| 4 | Template refresh | Historical mean 85.917 s; range 11.140–164.340 s over 7 runs | Continue template-first inheritance and avoid redundant Index/config refreshes | Low |
| 5 | Disenrollment | Row-by-row deletion removed; now two matrix rewrites | Correct width/preflight/recovery defects before benchmarking; avoid reintroducing structural row loops | Medium |
| 6 | Index | Every refresh inspects images; first refresh may perform external URL fetch | Make image setup an explicit/idempotent best-effort step; do not let it block matrix refresh | Low |

No current timing report proves v1.9.74.1 runtime, so historical evidence is not used to claim remediation success.

## 8. Data-Flow and Data-Integrity Report

### Material risks

1. Governed factory swap still has a delete-before-final-rename window (ML19741-002).
2. Disenrollment range width can fail after the first sheet commit (ML19741-003).
3. Missing exclusion PMR schema can erase historical rows (ML19741-004).
4. Related sheet writes lack a recovery boundary (ML19741-005).

### Strengths

- Required monthly imports are preflighted before formatter mutation.
- Source reports are archived before local deletion where applicable.
- Raw source preservation remains explicit.
- Refined and disenrollment row selection is now computed in memory.
- PMR/header checks exist across most core mapping paths.
- Master List rejects zero-row output.
- The approved Monthly Change → Refined sync → Disenrollment → Master List sequence is preserved.

## 9. Trigger and Concurrency Report

Document locks continue to protect the major formatting, Refined Data, disenrollment, Master List, Monthly Change, archive, and restore write paths. This remains proportionate for the one-to-three-user workbook. Trigger creation removes prior scheduled sync triggers before creating a new one. No enterprise orchestration is recommended.

Required trigger changes are limited to preventing optional Index image work from failing core refreshes and avoiding cross-file archive access in a simple `onOpen` path.

## 10. Error Handling and Logging Review

### Improvements

- `onEdit` now records contextual best-effort warnings.
- Core workflow errors continue to propagate into timing output.
- Temporary factory build errors attempt cleanup.
- Archive failures prevent local source deletion.

### Remaining weaknesses

- Restore-button fetch errors are silently swallowed and image inspection errors occur outside its catch.
- Index registration catches remain empty in the factory.
- The factory logs old-target deletion failure and continues into a predictable name collision rather than treating swap failure coherently.
- Disenrollment has no recovery handler around its two write stages.

## 11. Maintainability and Architecture Review

The approved single-file, dashboard-governed, template-first design remains intact. Header row 4/data row 5, centralized system-sheet names, Maps/Sets, in-memory matrices, Primary PMR ownership, and workflow/helper separation are preserved. No modularization rewrite is recommended.

v1.9.74.1 materially improves duplicate cleanup and comments, but no-op private stubs should be removed rather than retained indefinitely. The compressed factory code is harder to audit than the prior expanded form; future correctness edits should favor explicit commit-state names over terse expressions.

## 12. Prioritized Remediation Plan

A full prompt-compliant validation and wave plan is provided in `Master_List/Audit Summary/v1.9.74.1/Exhaustive_Review_Remediation_Plan.md`.

Summary order:

1. **Wave 1:** PMR fail-closed validation, matrix-width correction, two-sheet recovery.
2. **Wave 2:** Correct Index image API and isolate optional button work.
3. **Wave 3:** Complete safe factory swap and trigger authorization correction.
4. **Wave 4:** Collect current timing and optimize demonstrated bottlenecks.
5. **Wave 5:** Remove confirmed legacy stubs and resolve unused parameter.
6. **Wave 6:** Improve diagnostics/comments only where touched.

## 13. Focused Regression Test Plan

| Area | Focused tests |
|---|---|
| Index image | No image, correct image, unrelated image, download failure, repeated refresh, monthly finalization |
| Factory replacement | No target, existing target, copy/write/rename/delete failures, 100-character name, hidden target, cleanup/restore |
| Disenrollment schema | Missing/renamed/duplicate PMR headers on all participating sheets; blank PMR values |
| Disenrollment dimensions | Physical columns less/equal/greater than governed headers; zero and many retained rows |
| Disenrollment recovery | Inject failure before/after each clear/write; verify both pre-write matrices restored or neither committed |
| Workflow behavior | New disenrollment, already durable, re-enrollment, mixed update, repeated safety-notice run, historical hiding/totals |
| Triggers | Simple `onOpen`, installed scheduled sync, manual archive sync, inaccessible archive, concurrent menu workflow |
| Cleanup | No dynamic references to legacy stubs; menu and manual Index contracts remain stable |
| Performance | Compare identical-input v1.9.74.1 corrected runs against recorded baseline at process and stage level |

## 14. Final Conclusion

**Not approved due to identified code defects.** v1.9.74.1 closes the prior startup, duplicate-declaration, row-by-row deletion, and `onEdit` diagnostic issues, and partially improves overwrite/disenrollment safety. Four High findings remain: the invalid Index image API, incomplete factory swap, Refined Data width mismatch, and fail-open exclusion PMR handling. Correcting those items does not require changing approved business logic or abandoning the current single-file architecture.

---

## Appendix A — Complete Compact Top-Level Function Inventory

**Legend:** “Write” conservatively marks direct structural/content/property mutation calls. Callers and dependencies are direct static top-level edges; dynamic Apps Script assignments may not appear.

| Function | Line | Classification | Direct callers | Direct dependencies | Write |
|---|---:|---|---|---|:---:|
| `onOpen` | 84 | Trigger/web entry | — | checkSheetDeletionAndUpdateIndex_, syncArchiveIndexToActiveIndex_ | No |
| `executeMonthlyFormatterWorkflow_` | 206 | Internal helper | formatBannerReport, formatCarePlanDueReport, formatRawData, formatUnlockedCarePlanReport, menuFormatMonthlySheets | runFormatterPipeline_ | No |
| `menuFormatMonthlySheets` | 211 | Workflow/public helper | formatMonthlySheets | executeMonthlyFormatterWorkflow_ | No |
| `formatMonthlySheets` | 215 | Menu/admin entry | — | menuFormatMonthlySheets | No |
| `formatBannerReport` | 216 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `formatCarePlanDueReport` | 217 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `formatUnlockedCarePlanReport` | 218 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `formatRawData` | 219 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `hideTemplates` | 221 | Menu/admin entry | — | hideTemplates_ | No |
| `showTemplates` | 222 | Menu/admin entry | — | showTemplates_ | No |
| `enforceGlobalSheetSortOrder` | 223 | Menu/admin entry | — | organizeTabs | No |
| `setupSystemSheets` | 224 | Menu/admin entry | — | createActiveSystemSheets | No |
| `rebuildFormatDashboardDefaults` | 225 | Menu/admin entry | — | menuBuildDashboardTemplate | No |
| `saveActiveLayoutToDashboardSettings` | 226 | Menu/admin entry | — | saveActiveLayoutAsRebuildDefault | No |
| `createOrRefreshAllReportTemplates` | 227 | Menu/admin entry | — | createAllReportTemplates | No |
| `runMonthlyStart` | 230 | Menu/admin entry | — | promptForLockedYearReportMonth_, markFrameworkStep_, processRefinedDataUpdate_, finalizeSharedMonthlyWorkflow_, runFrameworkTimed_ | No |
| `assertMonthlyUpdateStageComplete_` | 243 | Internal helper | finalizeSharedMonthlyWorkflow_, runMonthlyUpdate | — | No |
| `runMonthlyUpdate` | 251 | Menu/admin entry | — | promptForLockedYearReportMonth_, markFrameworkStep_, buildMonthlyChangeReportForMonth_, assertMonthlyUpdateStageComplete_, processRefinedDataUpdate_, finalizeSharedMonthlyWorkfl… | No |
| `finalizeSharedMonthlyWorkflow_` | 276 | Internal helper | runMonthlyStart, runMonthlyUpdate | markFrameworkStep_, createDisenrolledListForMonth_, assertMonthlyUpdateStageComplete_, createMasterListForMonth_, populateActiveIndex, notify_ | No |
| `menuBuildDashboardTemplate` | 333 | Workflow/public helper | rebuildFormatDashboardDefaults | buildFormatDashboardTemplate_ | No |
| `quickSystemSetup` | 342 | Menu/admin entry | — | ensureDocumentPropertiesInitialized_, notify_, markFrameworkStep_, createSystemSheetTemplates, createActiveSystemSheets, runFrameworkTimed_, runDashboardQualityStartUp, createIn… | No |
| `ensureDocumentPropertiesInitialized_` | 376 | Internal helper | quickSystemSetup | — | Yes |
| `createSystemSheetTemplates` | 389 | Workflow/public helper | quickSystemSetup | markFrameworkStep_, createOrRefreshBaseTemplate_, buildFormatDashboardTemplate_, createSystemTemplates | No |
| `createActiveSystemSheets` | 399 | Workflow/public helper | quickSystemSetup, setupSystemSheets | markFrameworkStep_, createActiveSheetFromTemplate_, stampActiveSubheaderTimestampNote_ | Yes |
| `createActiveSheetFromTemplate_` | 448 | Internal helper | createActiveSystemSheets, createIndexSheet, ensureDashboardQualityReport_, ensureFrameworkTimingReport_ | markFrameworkStep_, createGovernedSheet_ | No |
| `stampActiveSubheaderTimestampNote_` | 465 | Internal helper | createActiveSystemSheets | — | Yes |
| `quickBuildAllTemplates` | 477 | Menu/admin entry | — | notify_, markFrameworkStep_, createAllReportTemplates, runFrameworkTimed_, runDashboardQualityValidateTemplates | No |
| `clearDiagnosticsAndTimingLogs` | 497 | Menu/admin entry | — | ensureFrameworkTimingReport_, getFrameworkTimingSectionRegistry_, resetSubheaderSectionData_, getSubheadersFromDashboardConfig_, notify_ | No |
| `isFrameworkTimingEnabled_` | 518 | Internal helper | runFrameworkTimed_, toggleFrameworkTiming | — | No |
| `toggleFrameworkTiming` | 526 | Menu/admin entry | — | isFrameworkTimingEnabled_ | Yes |
| `startRuntimeTiming_` | 534 | Internal helper | runFrameworkTimed_ | — | No |
| `markRuntimeStep_` | 546 | Internal helper | markFrameworkStep_, runFrameworkTimed_ | getRuntimeTimingSeverity_, formatSeconds_, logRuntimeTiming_ | No |
| `logRuntimeWarning_` | 580 | Internal helper | logBestEffortWarning_ | — | No |
| `logBestEffortWarning_` | 587 | Internal helper | archiveMonthlySheetsBySpecs_, assertParticipantTotalsMatch_, collectMovedTitleInfoCells_, createGovernedSheet_, deleteSheetSafely_, enfor… | logRuntimeWarning_ | No |
| `logFrameworkTiming_` | 594 | Internal helper | — | — | No |
| `logRuntimeTiming_` | 600 | Internal helper | markRuntimeStep_ | formatSeconds_ | No |
| `getRuntimeTimingSeverity_` | 607 | Internal helper | markRuntimeStep_ | — | No |
| `formatSeconds_` | 615 | Internal helper | logRuntimeTiming_, markRuntimeStep_ | — | No |
| `writeRuntimeTimingReport_` | 623 | Internal helper | runFrameworkTimed_ | ensureFrameworkTimingReport_, appendDataToSubheaderSection_, refreshFrameworkTimingSummarySections_, logBestEffortWarning_ | No |
| `runFrameworkTimed_` | 659 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets, buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterLi… | isFrameworkTimingEnabled_, startRuntimeTiming_, markRuntimeStep_, writeRuntimeTimingReport_ | No |
| `markFrameworkStep_` | 677 | Internal helper | appendRefinedDataArchiveRows_, applyRefinedDataProcesses_, archiveMonthlySheetsBySpecs_, archiveRawSourceSheet_, assertRequiredMonthlyImp… | markRuntimeStep_ | No |
| `normalizeSubheaderColumnName_` | 683 | Internal helper | getSubheaderSectionRecords_, mapRowsToSubheaderColumns_ | — | No |
| `getSubheaderSectionHeaders_` | 695 | Internal helper | getSubheaderSectionRecords_, mapRowsToSubheaderColumns_, writeDashboardQualitySection_ | getSubheaderSectionBounds_ | No |
| `mapRowsToSubheaderColumns_` | 704 | Internal helper | appendDataToSubheaderSection_, replaceSubheaderSectionData_ | getSubheaderSectionHeaders_, normalizeSubheaderColumnName_ | No |
| `getSubheaderSectionRecords_` | 723 | Internal helper | getFrameworkTimingDetailRows_ | getSubheaderSectionBounds_, getSubheaderSectionHeaders_, normalizeSubheaderColumnName_ | No |
| `appendDataToSubheaderSection_` | 744 | Internal helper | appendMonthlyChangeRowsWithHighlights_, writeDashboardQualitySection_, writeRuntimeTimingReport_ | mapRowsToSubheaderColumns_, getSubheaderSectionBounds_, resizeSheetGrid_, applySubheaderDataRowFormatting_ | Yes |
| `applySubheaderDataRowFormatting_` | 785 | Internal helper | appendDataToSubheaderSection_, replaceSubheaderSectionData_ | — | Yes |
| `findSubheaderDataAnchorRow_` | 794 | Internal helper | getSubheaderSectionBounds_ | — | No |
| `resetSubheaderSectionData_` | 807 | Internal helper | clearDiagnosticsAndTimingLogs | getSubheaderSectionBounds_ | Yes |
| `getSubheaderSectionBounds_` | 817 | Internal helper | appendDataToSubheaderSection_, applyMonthlyChangeSectionHHeaders_, getSubheaderSectionHeaders_, getSubheaderSectionRecords_, replaceSubhe… | findSubheaderDataAnchorRow_ | No |
| `getFrameworkTimingSectionRegistry_` | 841 | Internal helper | clearDiagnosticsAndTimingLogs, hasFrameworkTimingSections_ | — | No |
| `ensureFrameworkTimingReport_` | 850 | Internal helper | clearDiagnosticsAndTimingLogs, writeRuntimeTimingReport_ | hasFrameworkTimingSections_, buildFrameworkTimingTemplate_, createActiveSheetFromTemplate_ | No |
| `hasFrameworkTimingSections_` | 863 | Internal helper | ensureFrameworkTimingReport_ | getFrameworkTimingSectionRegistry_ | No |
| `getFrameworkTimingDetailRows_` | 872 | Internal helper | refreshFrameworkTimingSummarySections_ | getSubheaderSectionRecords_ | No |
| `replaceSubheaderSectionData_` | 876 | Internal helper | refreshFrameworkTimingSummarySections_ | mapRowsToSubheaderColumns_, getSubheaderSectionBounds_, resizeSheetGrid_, applySubheaderDataRowFormatting_ | Yes |
| `refreshFrameworkTimingSummarySections_` | 897 | Internal helper | writeRuntimeTimingReport_ | getFrameworkTimingDetailRows_, worseRuntimeTimingSeverity_, getRuntimeTimingRecommendation_, getRuntimeTimingThreshold_, replaceSubheaderSectionData_ | No |
| `worseRuntimeTimingSeverity_` | 978 | Internal helper | refreshFrameworkTimingSummarySections_ | — | No |
| `getRuntimeTimingThreshold_` | 983 | Internal helper | refreshFrameworkTimingSummarySections_ | — | No |
| `getRuntimeTimingRecommendation_` | 989 | Internal helper | refreshFrameworkTimingSummarySections_ | — | No |
| `getDataValues_` | 1000 | Internal helper | buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterListForMonth_, finalizeMonthlyParticipantTotals_, getHeade… | buildHeaderIndexMap_ | No |
| `getHeaders_` | 1015 | Internal helper | createMasterListForMonth_ | getDataValues_ | No |
| `buildHeaderIndexMap_` | 1019 | Internal helper | appendRefinedDataArchiveRows_, applyRefinedDataProcesses_, assignPrimaryPMRRowsToMatrix_, combineRefinedDataNotesSummary_, countUniquePar… | — | No |
| `getPMRIndex_` | 1028 | Internal helper | applyRefinedDataProcesses_, assignPrimaryPMRRowsToMatrix_, buildUnlockCPLookupMap_, computeMonthlyChange_, countUniqueParticipantsByStatu… | findHeaderIndex_ | No |
| `normalizePMR_` | 1033 | Internal helper | buildUnlockCPLookupMap_, mergeMasterListData_ | — | No |
| `findHeaderIndex_` | 1042 | Internal helper | appendRefinedDataArchiveRows_, buildCPDueLookupMap_, buildUnlockCPLookupMap_, combineRefinedDataNotesSummary_, computeMonthlyChange_, cou… | — | No |
| `mapRowsToHeaders_` | 1052 | Internal helper | appendMonthlyChangeGroup_, createDisenrolledListForMonth_, processRefinedDataUpdate_, processSingleSubReport_, replaceChangedRefinedDataP… | buildHeaderIndexMap_, findHeaderIndex_ | No |
| `padRowToWidth_` | 1062 | Internal helper | normalizeRowsToWidth_ | — | No |
| `normalizeRowsToWidth_` | 1069 | Internal helper | createDisenrolledListForMonth_ | padRowToWidth_ | No |
| `isPrimaryPMRRowValue_` | 1073 | Internal helper | applyRefinedDataProcesses_, getPrimaryMonthlyChangeRows_, pruneAgedDisenrolledNonPrimaryRows_, replaceChangedRefinedDataPMRs_ | — | No |
| `valuesAreEqual_` | 1078 | Internal helper | — | — | No |
| `getMonthDateParts_` | 1087 | Internal helper | — | buildPromptedMonthContext_ | No |
| `formatReportDateLabel_` | 1092 | Internal helper | buildMonthlySheetName_ | — | No |
| `buildMonthlySheetName_` | 1097 | Internal helper | createGovernedSheet_, getMonthlyChangeSectionMap_ | formatReportDateLabel_ | No |
| `getLatestSheetByPrefix_` | 1107 | Internal helper | runDashboardQualityProcessValidationSections_ | extractFirstDateFromSheetName_ | Yes |
| `getCurrentRawDataSheet_` | 1119 | Internal helper | createDisenrolledListForMonth_, finalizeMonthlyParticipantTotals_, processRefinedDataUpdate_ | — | No |
| `getCurrentRefinedDataSheet_` | 1125 | Internal helper | createDisenrolledListForMonth_, createMasterListForMonth_, processRefinedDataUpdate_ | — | No |
| `getCurrentCarePlanDueSheet_` | 1129 | Internal helper | createMasterListForMonth_ | — | No |
| `getCurrentUnlockedCarePlanSheet_` | 1135 | Internal helper | createMasterListForMonth_ | — | No |
| `setRequiredSheetName_` | 1141 | Internal helper | — | — | Yes |
| `ensureOutputSheetHasFormattedRows_` | 1153 | Internal helper | — | resizeSheetGrid_ | No |
| `resizeSheetGrid_` | 1160 | Internal helper | BuildDefaultFormatDashboard, appendDataToSubheaderSection_, applyOperationalFormatting_, buildGeneralTemplate_, createOrRefreshBaseTempla… | — | Yes |
| `trimCreatedSheetToSize_` | 1168 | Internal helper | applyOperationalFormatting_, buildGeneralTemplate_, createOrRefreshBaseTemplate_, trimCreatedSheetToData_ | resizeSheetGrid_ | Yes |
| `trimCreatedSheetToData_` | 1182 | Internal helper | createDisenrolledListForMonth_, createGovernedSheet_ | trimCreatedSheetToSize_ | No |
| `applyNativeBandingSafe_` | 1189 | Internal helper | buildGeneralTemplate_ | — | Yes |
| `applyColumnWidths_` | 1199 | Internal helper | — | — | Yes |
| `openArchiveSpreadsheetOnce_` | 1206 | Internal helper | archiveRawSourceSheet_, processSingleSubReport_, restoreSheetFromArchiveWorkbook | — | No |
| `notify_` | 1214 | Internal helper | clearDiagnosticsAndTimingLogs, finalizeSharedMonthlyWorkflow_, hideMonthlySheetsBySpecs_, hideSystemSheetsNow, notifyParticipantSafetyNot… | — | No |
| `deleteSheetSafely_` | 1218 | Internal helper | processSingleSubReport_ | logBestEffortWarning_ | Yes |
| `promptForLockedYearReportMonth_` | 1223 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets, buildMonthlyChangeReport, buildRefinedDataFromScratch, createDisenrolledList, cre… | buildPromptedMonthContext_ | No |
| `buildPromptedMonthContext_` | 1232 | Internal helper | getMonthDateParts_, promptForLockedYearReportMonth_ | — | No |
| `refreshIndexAfterSheetWorkflow_` | 1255 | Internal helper | — | populateActiveIndex, logBestEffortWarning_ | No |
| `hideSheetIfNeeded_` | 1259 | Internal helper | createGovernedSheet_, hideSystemSheetsNow, organizeTabs, processSingleSubReport_, runFormatterPipeline_, setReportTemplateVisibility_ | activateVisibleSheetBeforeHiding_, markFrameworkStep_ | Yes |
| `showSheetIfNeeded_` | 1268 | Internal helper | createGovernedSheet_, setReportTemplateVisibility_, showSystemSheetsNow | markFrameworkStep_ | Yes |
| `activateVisibleSheetBeforeHiding_` | 1276 | Internal helper | copySheetToArchiveAndDeleteLocal_, createGovernedSheet_, hideMonthlySheetsBySpecs_, hideSheetIfNeeded_ | — | Yes |
| `extractFirstDateFromSheetName_` | 1284 | Internal helper | findArchiveMonthlyCandidateSheetsUpToDate_, getLatestSheetByPrefix_, populateIndexData | — | No |
| `getUniqueArchiveSheetName_` | 1295 | Internal helper | archiveRawSourceSheet_ | — | No |
| `archiveRawSourceSheet_` | 1303 | Internal helper | copySheetToArchiveAndDeleteLocal_, processSingleSubReport_ | openArchiveSpreadsheetOnce_, getUniqueArchiveSheetName_, markFrameworkStep_ | Yes |
| `filterBlankRows_` | 1319 | Internal helper | buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterListForMonth_, finalizeMonthlyParticipantTotals_, processR… | — | No |
| `buildLookupMap_` | 1326 | Internal helper | syncBannerFieldsIntoRawRows_ | — | Yes |
| `setupArchiveSyncTrigger` | 1336 | Workflow/public helper | quickSystemSetup | syncArchiveIndexToActiveIndex_ | Yes |
| `createIndexSheet` | 1363 | Workflow/public helper | quickSystemSetup | createActiveSheetFromTemplate_, populateActiveIndex, applyIndexGroupDividerRules_ | No |
| `resolveSheetGovernance_` | 1414 | Internal helper | createGovernedSheet_ | calculateDynamicRank_, loadDashboardConfig_, getRankForSheetName_ | No |
| `getRankForSheetName_` | 1502 | Internal helper | processSingleSubReport_, resolveSheetGovernance_ | loadDashboardConfig_, getTemplateCreationRule_, calculateDynamicRank_ | No |
| `getTemplateCreationRule_` | 1545 | Internal helper | createGovernedSheet_, getRankForSheetName_, writeConfiguredSheetGovernanceNote_ | — | No |
| `calculateDynamicRank_` | 1567 | Internal helper | getRankForSheetName_, processSingleSubReport_, resolveSheetGovernance_, writeConfiguredSheetGovernanceNote_ | extractDynamicRankMonth_ | No |
| `extractDynamicRankMonth_` | 1588 | Internal helper | calculateDynamicRank_ | — | No |
| `writeSheetGovernanceNote_` | 1600 | Internal helper | createGovernedSheet_, processSingleSubReport_, writeConfiguredSheetGovernanceNote_ | — | Yes |
| `getGovernedSheetTypeForName_` | 1638 | Internal helper | restoreSheetFromArchiveWorkbook | loadDashboardConfig_ | No |
| `writeConfiguredSheetGovernanceNote_` | 1653 | Internal helper | buildGeneralTemplate_, createOrRefreshBaseTemplate_ | loadDashboardConfig_, getTemplateCreationRule_, calculateDynamicRank_, writeSheetGovernanceNote_ | No |
| `createGovernedSheet_` | 1679 | Internal helper | appendRefinedDataArchiveRows_, buildMonthlyChangeReportForMonth_, createActiveSheetFromTemplate_, createDisenrolledListForMonth_, createM… | loadDashboardConfig_, getFallbackDashboardConfig_, buildMonthlySheetName_, getTemplateCreationRule_, resolveSheetGovernance_, markFrameworkStep_, logBestEffortWarning_, position… | Yes |
| `applyGovernedNumberFormatsFromDashboard_` | 1802 | Internal helper | createGovernedSheet_ | — | No |
| `enforceDataRowHeights_` | 1806 | Internal helper | createGovernedSheet_ | logBestEffortWarning_ | Yes |
| `collectMovedTitleInfoCells_` | 1837 | Internal helper | processSingleSubReport_ | logBestEffortWarning_ | No |
| `normalizeRawPreservationHeader_` | 1855 | Internal helper | appendSourceOnlyHeaders_, getMonthlyChangeSectionMap_, getSourceOnlyHeaders_ | — | No |
| `appendSourceOnlyHeaders_` | 1859 | Internal helper | — | normalizeRawPreservationHeader_ | No |
| `getSourceOnlyHeaders_` | 1874 | Internal helper | — | normalizeRawPreservationHeader_ | No |
| `readValidSourceDate_` | 1885 | Internal helper | stampMonthlySubReportSourceDates_ | — | No |
| `stampMonthlySubReportSourceDates_` | 1896 | Internal helper | processSingleSubReport_ | readValidSourceDate_, logBestEffortWarning_, markFrameworkStep_ | Yes |
| `normalizePreservedValue_` | 1912 | Internal helper | verifyRawDataSourceOnlyColumns_, verifyRawNumberColumnPreserved_, verifyRawSourceSheetUntouched_ | — | No |
| `verifyRawSourceSheetUntouched_` | 1928 | Internal helper | finalizeFormattedMonthlyOutput_ | getDataValues_, normalizePreservedValue_, markFrameworkStep_ | No |
| `verifyRawDataSourceOnlyColumns_` | 1952 | Internal helper | finalizeFormattedMonthlyOutput_ | markFrameworkStep_, buildHeaderIndexMap_, findHeaderIndex_, normalizePreservedValue_ | No |
| `writeRawDataParticipantTotals_` | 1993 | Internal helper | finalizeMonthlyParticipantTotals_ | buildHeaderIndexMap_, findHeaderIndex_, writeParticipantTotalTimestamp_, markFrameworkStep_ | Yes |
| `writeUniqueParticipantTotalToG1_` | 2045 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, writeParticipantTotalTimestamp_, markFrameworkStep_ | Yes |
| `writeParticipantTotalTimestamp_` | 2079 | Internal helper | writeRawDataParticipantTotals_, writeUniqueParticipantTotalToG1_ | — | Yes |
| `countUniqueParticipantsByStatus_` | 2084 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_ | No |
| `assertParticipantTotalsMatch_` | 2099 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | logBestEffortWarning_ | No |
| `notifyParticipantSafetyNotices_` | 2106 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | notify_ | No |
| `sortRowsByLastName_` | 2113 | Internal helper | processRefinedDataUpdate_ | buildHeaderIndexMap_, findHeaderIndex_ | Yes |
| `runFormatterPipeline_` | 2121 | Internal helper | executeMonthlyFormatterWorkflow_ | promptForLockedYearReportMonth_, markFrameworkStep_, loadDashboardConfig_, assertRequiredMonthlyImportsPresent_, processSingleSubReport_, logBestEffortWarning_, finalizeMonthlyP… | Yes |
| `assertRequiredMonthlyImportsPresent_` | 2195 | Internal helper | runFormatterPipeline_ | markFrameworkStep_, findSourceSheetForSubReport_ | No |
| `processSingleSubReport_` | 2221 | Internal helper | runFormatterPipeline_ | markFrameworkStep_, findSourceSheetForSubReport_, collectMovedTitleInfoCells_, getDataValues_, findHeaderIndex_, getHeadersForSheetType_, mapRowsToHeaders_, buildHeaderIndexMap_… | Yes |
| `verifyRawNumberColumnPreserved_` | 2365 | Internal helper | — | buildHeaderIndexMap_, findHeaderIndex_, normalizePreservedValue_, markFrameworkStep_ | No |
| `finalizeFormattedMonthlyOutput_` | 2384 | Internal helper | processSingleSubReport_ | verifyRawDataSourceOnlyColumns_, verifyRawSourceSheetUntouched_ | No |
| `finalizeMonthlyParticipantTotals_` | 2402 | Internal helper | runFormatterPipeline_ | getCurrentRawDataSheet_, markFrameworkStep_, getDataValues_, filterBlankRows_, writeRawDataParticipantTotals_ | No |
| `syncBannerFieldsIntoRawRows_` | 2420 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, buildLookupMap_ | No |
| `assignPrimaryPMRRowsToMatrix_` | 2462 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_ | Yes |
| `pruneAgedDisenrolledNonPrimaryRows_` | 2602 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, isPrimaryPMRRowValue_ | Yes |
| `findSourceSheetForSubReport_` | 2637 | Internal helper | assertRequiredMonthlyImportsPresent_, processSingleSubReport_ | isSheetNameMatchingMonth_ | No |
| `isSheetNameMatchingMonth_` | 2703 | Internal helper | findSourceSheetForSubReport_ | — | No |
| `buildRefinedDataFromScratch` | 2741 | Menu/admin entry | — | promptForLockedYearReportMonth_, processRefinedDataUpdate_ | No |
| `updateRefinedDataMonthlySync` | 2747 | Menu/admin entry | — | promptForLockedYearReportMonth_, processRefinedDataUpdate_ | No |
| `processRefinedDataUpdate_` | 2753 | Internal helper | buildRefinedDataFromScratch, runMonthlyStart, runMonthlyUpdate, updateRefinedDataMonthlySync | loadDashboardConfig_, getCurrentRawDataSheet_, getDataValues_, filterBlankRows_, getHeadersForSheetType_, mapRowsToHeaders_, stampRefinedTrackingFields_, getCurrentRefinedDataSh… | Yes |
| `normalizeMonthlyChangeSectionName_` | 2836 | Internal helper | getMonthlyChangeSectionMap_ | — | No |
| `getMonthlyChangeSectionMap_` | 2848 | Internal helper | processRefinedDataUpdate_ | buildMonthlySheetName_, normalizeMonthlyChangeSectionName_, normalizeRawPreservationHeader_ | Yes |
| `replaceChangedRefinedDataPMRs_` | 2877 | Internal helper | processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, mapRowsToHeaders_, isPrimaryPMRRowValue_, stampRefinedTrackingFields_, applyRefinedDataProcesses_, markFrameworkStep_ | Yes |
| `appendRefinedDataArchiveRows_` | 2957 | Internal helper | processRefinedDataUpdate_ | createGovernedSheet_, buildHeaderIndexMap_, findHeaderIndex_, markFrameworkStep_ | Yes |
| `stampRefinedTrackingFields_` | 2990 | Internal helper | processRefinedDataUpdate_, replaceChangedRefinedDataPMRs_ | buildHeaderIndexMap_ | No |
| `applyRefinedDataProcesses_` | 3007 | Internal helper | processRefinedDataUpdate_, replaceChangedRefinedDataPMRs_ | buildHeaderIndexMap_, getPMRIndex_, isPrimaryPMRRowValue_, markFrameworkStep_, combineRefinedDataNotesSummary_ | Yes |
| `combineRefinedDataNotesSummary_` | 3094 | Internal helper | applyRefinedDataProcesses_ | buildHeaderIndexMap_, findHeaderIndex_ | No |
| `createDisenrolledList` | 3125 | Menu/admin entry | — | promptForLockedYearReportMonth_, createDisenrolledListForMonth_ | No |
| `createDisenrolledListForMonth_` | 3131 | Internal helper | createDisenrolledList, finalizeSharedMonthlyWorkflow_ | loadDashboardConfig_, getCurrentRefinedDataSheet_, getDataValues_, getHeadersForSheetType_, findHeaderIndex_, getPMRIndex_, createGovernedSheet_, filterBlankRows_, buildHeaderIn… | Yes |
| `removeReenrolledRowsFromExclusion_` | 3294 | Internal helper | — | — | No |
| `appendDisenrolledRowsAtBottom_` | 3299 | Internal helper | — | — | No |
| `hideHistoricalDisenrollmentRows_` | 3303 | Internal helper | createDisenrolledListForMonth_ | — | Yes |
| `createMasterList` | 3327 | Menu/admin entry | — | promptForLockedYearReportMonth_, createMasterListForMonth_ | No |
| `createMasterListForMonth_` | 3333 | Internal helper | createMasterList, finalizeSharedMonthlyWorkflow_ | loadDashboardConfig_, getCurrentRefinedDataSheet_, getCurrentCarePlanDueSheet_, getCurrentUnlockedCarePlanSheet_, markFrameworkStep_, getDataValues_, filterBlankRows_, getHeader… | No |
| `normalizeNameKey_` | 3390 | Internal helper | buildNameKeyVariants_ | — | No |
| `buildNameKeyVariants_` | 3395 | Internal helper | buildCPDueLookupMap_, buildUnlockCPLookupMap_, mergeMasterListData_ | normalizeNameKey_ | No |
| `buildCPDueLookupMap_` | 3437 | Internal helper | mergeMasterListData_ | findHeaderIndex_, buildNameKeyVariants_ | Yes |
| `buildUnlockCPLookupMap_` | 3453 | Internal helper | mergeMasterListData_ | getPMRIndex_, findHeaderIndex_, normalizePMR_, buildNameKeyVariants_ | Yes |
| `getMappedValue_` | 3480 | Internal helper | mergeMasterListData_ | findHeaderIndex_ | No |
| `mergeMasterListData_` | 3486 | Internal helper | createMasterListForMonth_ | getPMRIndex_, buildCPDueLookupMap_, buildUnlockCPLookupMap_, findHeaderIndex_, normalizePMR_, buildNameKeyVariants_, getMappedValue_ | Yes |
| `buildMonthlyChangeReport` | 3551 | Menu/admin entry | — | promptForLockedYearReportMonth_, buildMonthlyChangeReportForMonth_ | No |
| `buildMonthlyChangeReportForMonth_` | 3557 | Internal helper | buildMonthlyChangeReport, runMonthlyUpdate | loadDashboardConfig_, getDataValues_, filterBlankRows_, markFrameworkStep_, getSubheadersFromDashboardConfig_, getHeadersForSheetType_, computeMonthlyChange_, createGovernedShee… | Yes |
| `applyMonthlyChangeSectionHHeaders_` | 3600 | Internal helper | buildMonthlyChangeReportForMonth_ | getSubheaderSectionBounds_ | Yes |
| `computeMonthlyChange_` | 3617 | Internal helper | buildMonthlyChangeReportForMonth_ | getPMRIndex_, groupMonthlyChangeRowsByPMR_, findHeaderIndex_, normalizeMonthlyChangeValue_, getMonthlyChangeParticipantEligibility_, getPrimaryMonthlyChangeRows_, isSameReportDa… | No |
| `getMonthlyChangeParticipantEligibility_` | 3765 | Internal helper | computeMonthlyChange_ | isSameReportDate_ | No |
| `getPrimaryMonthlyChangeRows_` | 3779 | Internal helper | computeMonthlyChange_ | findHeaderIndex_, isPrimaryPMRRowValue_ | No |
| `groupMonthlyChangeRowsByPMR_` | 3786 | Internal helper | computeMonthlyChange_ | — | Yes |
| `isSameReportDate_` | 3797 | Internal helper | computeMonthlyChange_, getMonthlyChangeParticipantEligibility_ | — | No |
| `getChangedHeadersAcrossAllRows_` | 3804 | Internal helper | computeMonthlyChange_ | findHeaderIndex_, normalizeMonthlyChangeValue_ | Yes |
| `normalizeMonthlyChangeValue_` | 3816 | Internal helper | computeMonthlyChange_, getChangedHeadersAcrossAllRows_ | — | No |
| `appendMonthlyChangeGroup_` | 3821 | Internal helper | computeMonthlyChange_ | mapRowsToHeaders_ | No |
| `appendMonthlyChangeRowsWithHighlights_` | 3831 | Internal helper | buildMonthlyChangeReportForMonth_ | appendDataToSubheaderSection_ | Yes |
| `organizeTabs` | 3864 | Workflow/public helper | enforceGlobalSheetSortOrder | getTargetRankForSheet_, getUnformattedSheetSortKey_, hideSheetIfNeeded_ | Yes |
| `getUnformattedSheetSortKey_` | 3956 | Internal helper | organizeTabs, populateIndexData | — | No |
| `positionSheetBySectionFRank_` | 4000 | Internal helper | buildGeneralTemplate_, createGovernedSheet_, processSingleSubReport_ | getTargetRankForSheet_, logBestEffortWarning_ | Yes |
| `getTargetRankForSheet_` | 4068 | Internal helper | matchSheetToSectionFRule_, organizeTabs, positionSheetBySectionFRank_ | — | No |
| `matchSheetToSectionFRule_` | 4134 | Internal helper | populateIndexData | getTargetRankForSheet_ | No |
| `hideMonthlyImportSheets` | 4152 | Menu/admin entry | — | promptForLockedYearReportMonth_, hideMonthlySheetsBySpecs_ | No |
| `hideMonthlyActiveSheets` | 4164 | Menu/admin entry | — | promptForLockedYearReportMonth_, hideMonthlySheetsBySpecs_ | No |
| `hideTemplates_` | 4175 | Internal helper | hideTemplates | hideReportTemplates | No |
| `showTemplates_` | 4176 | Internal helper | showTemplates | showReportTemplates | No |
| `getDashboardConfigForTemplateVisibility_` | 4178 | Internal helper | hideReportTemplates, showReportTemplates | loadDashboardConfig_, logBestEffortWarning_ | No |
| `hideReportTemplates` | 4188 | Workflow/public helper | hideTemplates_ | getDashboardConfigForTemplateVisibility_, setReportTemplateVisibility_, runFrameworkTimed_ | No |
| `showReportTemplates` | 4195 | Workflow/public helper | showTemplates_ | getDashboardConfigForTemplateVisibility_, setReportTemplateVisibility_, runFrameworkTimed_ | No |
| `setReportTemplateVisibility_` | 4202 | Internal helper | hideReportTemplates, showReportTemplates | hideSheetIfNeeded_, showSheetIfNeeded_, markFrameworkStep_ | No |
| `hideSystemSheets_` | 4236 | Menu/admin entry | — | hideSystemSheetsNow | No |
| `showSystemSheets_` | 4237 | Menu/admin entry | — | showSystemSheetsNow | No |
| `hideSystemSheetsNow` | 4239 | Workflow/public helper | hideSystemSheets_ | hideSheetIfNeeded_, notify_, runFrameworkTimed_ | No |
| `showSystemSheetsNow` | 4256 | Workflow/public helper | showSystemSheets_ | showSheetIfNeeded_, notify_, runFrameworkTimed_ | No |
| `hideMonthlySheetsBySpecs_` | 4273 | Internal helper | hideMonthlyActiveSheets, hideMonthlyImportSheets | findArchiveMonthlyCandidateSheetsUpToDate_, activateVisibleSheetBeforeHiding_, notify_, runFrameworkTimed_ | Yes |
| `archiveMonthlyImportSheets` | 4305 | Menu/admin entry | — | promptForLockedYearReportMonth_, archiveMonthlySheetsBySpecs_, populateActiveIndex, notifyArchiveMonthlySheetsResult_, runFrameworkTimed_ | No |
| `archiveMonthlyActiveSheets` | 4323 | Menu/admin entry | — | promptForLockedYearReportMonth_, archiveMonthlySheetsBySpecs_, populateActiveIndex, notifyArchiveMonthlySheetsResult_, runFrameworkTimed_ | No |
| `archiveMonthlySheetsBySpecs_` | 4341 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets | markFrameworkStep_, findArchiveMonthlyCandidateSheetsUpToDate_, logBestEffortWarning_, copySheetToArchiveAndDeleteLocal_, pingArchiveIndexUpdate_ | No |
| `pingArchiveIndexUpdate_` | 4385 | Internal helper | archiveMonthlySheetsBySpecs_ | logBestEffortWarning_ | No |
| `findArchiveMonthlyCandidateSheetsUpToDate_` | 4396 | Internal helper | archiveMonthlySheetsBySpecs_, hideMonthlySheetsBySpecs_ | extractFirstDateFromSheetName_ | Yes |
| `notifyArchiveMonthlySheetsResult_` | 4428 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets | — | No |
| `copySheetToArchiveAndDeleteLocal_` | 4435 | Internal helper | archiveMonthlySheetsBySpecs_ | archiveRawSourceSheet_, activateVisibleSheetBeforeHiding_ | Yes |
| `applyDelimitedProperty_` | 4447 | Internal helper | applyDashboardRowFormattingSpec_, applyTitleRows_ | applySingleCellProperty_ | No |
| `applySingleCellProperty_` | 4470 | Internal helper | applyDelimitedProperty_ | getWrapStrategyEnum_ | Yes |
| `getWrapStrategyEnum_` | 4492 | Internal helper | applyGeneralSheetDefaults_, applyOperationalFormatting_, applySingleCellProperty_, createOrRefreshBaseTemplate_ | — | No |
| `getBorderStyleEnum_` | 4500 | Internal helper | applyGeneralSheetDefaults_, createOrRefreshBaseTemplate_ | — | No |
| `createOrRefreshBaseTemplate_` | 4518 | Internal helper | createAllReportTemplates, createSystemSheetTemplates | createGovernedSheet_, loadDashboardConfig_, hasDashboardFormattingValue_, resizeSheetGrid_, getWrapStrategyEnum_, requireDashboardFormattingValue_, getBorderStyleEnum_, trimCrea… | Yes |
| `createTemplateFromBase_` | 4598 | Internal helper | BuildDefaultFormatDashboard, buildGeneralTemplate_ | createGovernedSheet_ | No |
| `buildGeneralTemplate_` | 4612 | Internal helper | BuildDefaultFormatDashboard, buildDashboardQualityTemplate_, buildFrameworkTimingTemplate_, buildIndexTemplate_, buildOperationalReportTe… | markFrameworkStep_, createTemplateFromBase_, positionSheetBySectionFRank_, resizeSheetGrid_, applyGeneralSheetDefaults_, validateDashboardFormattingConfig_, applyNativeBandingSa… | Yes |
| `applyGeneralSheetDefaults_` | 4675 | Internal helper | buildGeneralTemplate_ | requireDashboardFormattingValue_, getWrapStrategyEnum_, getBorderStyleEnum_ | Yes |
| `requireDashboardFormattingValue_` | 4710 | Internal helper | applyColumnWidthsEngine_, applyDashboardRowFormattingSpec_, applyGeneralSheetDefaults_, applyOperationalFormatting_, applyTitleRows_, bui… | — | No |
| `hasDashboardFormattingValue_` | 4717 | Internal helper | createOrRefreshBaseTemplate_ | — | No |
| `validateDashboardFormattingConfig_` | 4721 | Internal helper | buildGeneralTemplate_ | requireDashboardFormattingValue_ | No |
| `getDashboardSectionRowSpecs_` | 4747 | Internal helper | applyExistingSectionFormatting_, applySubheaderBlocks_, applyTitleRows_ | — | No |
| `applyExistingSectionFormatting_` | 4767 | Internal helper | buildGeneralTemplate_, buildOperationalReportTemplate_ | getDashboardSectionRowSpecs_, getDashboardRowFormattingSpec_, applyDashboardRowFormattingSpec_ | No |
| `getDashboardRowFormattingSpec_` | 4803 | Internal helper | applyExistingSectionFormatting_, applySubheaderBlocks_ | — | No |
| `applyDashboardRowFormattingSpec_` | 4811 | Internal helper | applyExistingSectionFormatting_, applyTitleRows_ | requireDashboardFormattingValue_, applyDelimitedProperty_ | Yes |
| `applyTitleRows_` | 4822 | Internal helper | buildGeneralTemplate_ | getDashboardSectionRowSpecs_, applyDelimitedProperty_, requireDashboardFormattingValue_, applyDashboardRowFormattingSpec_ | Yes |
| `applySubheaderBlocks_` | 4849 | Internal helper | buildGeneralTemplate_ | getDashboardSectionRowSpecs_, getDashboardRowFormattingSpec_ | Yes |
| `applyColumnWidthsEngine_` | 4903 | Internal helper | buildGeneralTemplate_ | loadDashboardConfig_, requireDashboardFormattingValue_ | Yes |
| `applyOperationalFormatting_` | 4938 | Internal helper | buildOperationalReportTemplate_, buildTemplateArchiveRefinedData | loadDashboardConfig_, getStandardSheetKey_, resizeSheetGrid_, requireDashboardFormattingValue_, getWrapStrategyEnum_, trimCreatedSheetToSize_ | Yes |
| `writeTemplateMetadata_` | 5008 | Internal helper | buildGeneralTemplate_ | — | Yes |
| `createSystemTemplates` | 5015 | Workflow/public helper | createSystemSheetTemplates | buildFrameworkTimingTemplate_, buildDashboardQualityTemplate_, buildIndexTemplate_ | No |
| `buildFrameworkTimingTemplate_` | 5021 | Internal helper | createSystemTemplates, ensureFrameworkTimingReport_ | getTemplateConfigFromDashboard_, buildGeneralTemplate_ | No |
| `buildDashboardQualityTemplate_` | 5027 | Internal helper | createSystemTemplates | getTemplateConfigFromDashboard_, buildGeneralTemplate_ | No |
| `buildIndexTemplate_` | 5033 | Internal helper | createSystemTemplates | getTemplateConfigFromDashboard_, buildGeneralTemplate_, requireDashboardFormattingValue_, applyIndexGroupDividerRules_ | Yes |
| `createAllReportTemplates` | 5050 | Workflow/public helper | createOrRefreshAllReportTemplates, quickBuildAllTemplates | loadDashboardConfig_, createOrRefreshBaseTemplate_, buildTemplateBannerReport, buildTemplateCarePlanDue, buildTemplateUnlockedCarePlan, buildTemplateRawData, buildTemplateRefine… | No |
| `buildOperationalReportTemplate_` | 5072 | Internal helper | buildTemplateBannerReport, buildTemplateCarePlanDue, buildTemplateDisenrolledExclusion, buildTemplateMasterList, buildTemplateMonthlyChan… | getTemplateConfigFromDashboard_, buildGeneralTemplate_, applyOperationalFormatting_, applyExistingSectionFormatting_, applyOperationalTemplateSort_ | No |
| `applyOperationalTemplateSort_` | 5086 | Internal helper | buildOperationalReportTemplate_, buildTemplateArchiveRefinedData | — | No |
| `buildTemplateArchiveRefinedData` | 5098 | Workflow/public helper | createAllReportTemplates | getTemplateConfigFromDashboard_, getHeadersForSheetType_, buildGeneralTemplate_, applyOperationalFormatting_, applyOperationalTemplateSort_ | No |
| `buildTemplateBannerReport` | 5113 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateCarePlanDue` | 5114 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateUnlockedCarePlan` | 5115 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateRawData` | 5116 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateRefinedData` | 5117 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateDisenrolledExclusion` | 5118 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateMasterList` | 5119 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateMonthlyChange` | 5120 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `updateIndexSheet` | 5131 | Menu/admin entry | configureArchiveSpreadsheetId, configureIndexRestoreWebAppUrl | populateIndexData, populateActiveIndex, syncArchiveIndexToActiveIndex_ | No |
| `populateActiveIndex` | 5143 | Workflow/public helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets, checkSheetDeletionAndUpdateIndex_, createGovernedSheet_, createIndexSheet, finali… | populateIndexData | No |
| `populateIndexData` | 5147 | Workflow/public helper | populateActiveIndex, updateIndexSheet | ensureRestoreButtonOnIndex_, loadDashboardConfig_, matchSheetToSectionFRule_, extractFirstDateFromSheetName_, getUnformattedSheetSortKey_, resizeSheetGrid_ | Yes |
| `ensureRestoreButtonOnIndex_` | 5327 | Internal helper | populateIndexData | — | Yes |
| `applyIndexGroupDividerRules_` | 5350 | Internal helper | buildIndexTemplate_, createIndexSheet | getTemplateTheme_ | Yes |
| `syncArchiveIndexToActiveIndex_` | 5387 | Trigger/web entry | onOpen, runManualArchiveSync, setupArchiveSyncTrigger, updateIndexSheet | logBestEffortWarning_, resizeSheetGrid_ | Yes |
| `checkSheetDeletionAndUpdateIndex_` | 5508 | Internal helper | onOpen | populateActiveIndex | Yes |
| `runManualArchiveSync` | 5524 | Manual/admin or uncertain | — | syncArchiveIndexToActiveIndex_ | No |
| `buildRestoreButtonIcon` | 5536 | Manual/admin or uncertain | — | — | Yes |
| `restoreSheetFromActiveIndexRow` | 5562 | Menu/admin entry | — | restoreSheetFromArchiveWorkbook | Yes |
| `restoreSheetFromArchiveWorkbook` | 5627 | Workflow/public helper | doGet, restoreSheetFromActiveIndexRow | openArchiveSpreadsheetOnce_, loadDashboardConfig_, getGovernedSheetTypeForName_, createGovernedSheet_, populateActiveIndex | Yes |
| `escapeHtml_` | 5659 | Internal helper | doGet | — | No |
| `doGet` | 5668 | Trigger/web entry | — | restoreSheetFromArchiveWorkbook, escapeHtml_ | No |
| `configureIndexRestoreWebAppUrl` | 5683 | Menu/admin entry | — | updateIndexSheet | Yes |
| `configureArchiveSpreadsheetId` | 5702 | Menu/admin entry | — | updateIndexSheet | Yes |
| `configureArchiveWebAppUrl` | 5728 | Manual/admin or uncertain | — | — | Yes |
| `runDashboardQualityConfigVerificationSections_` | 5751 | Internal helper | runDashboardQualityStartUp, runFormatDashboardUpdates | — | No |
| `writeDashboardQualitySection_` | 5780 | Internal helper | runDashboardQualityProcessValidationSections_, runDashboardQualityStartUp, runDashboardQualityValidateTemplates, runFormatDashboardUpdate… | ensureDashboardQualityReport_, appendDataToSubheaderSection_, getSubheaderSectionHeaders_ | Yes |
| `ensureDashboardQualityReport_` | 5803 | Internal helper | writeDashboardQualitySection_ | buildFormatDashboardTemplate_, getTemplateConfigFromDashboard_, buildGeneralTemplate_, createActiveSheetFromTemplate_ | No |
| `runDashboardQualityStartUp` | 5820 | Menu/admin entry | quickSystemSetup | runDashboardQualityConfigVerificationSections_, writeDashboardQualitySection_, markFrameworkStep_, runFrameworkTimed_ | No |
| `runDashboardQualityValidateTemplates` | 5829 | Menu/admin entry | quickBuildAllTemplates | writeDashboardQualitySection_, runTemplateDateFormatValidation_, markFrameworkStep_, runFrameworkTimed_ | No |
| `runTemplateDateFormatValidation_` | 5867 | Internal helper | runDashboardQualityValidateTemplates | loadDashboardConfig_, writeDashboardQualitySection_ | Yes |
| `runDashboardQualityWorkflow` | 5949 | Menu/admin entry | runFullQualityCheck | runDashboardQualityProcessValidationSections_, markFrameworkStep_, runFrameworkTimed_ | No |
| `getExpectedNumberFormat_` | 5960 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `getGoogleSheetsNumberFormat_` | 5967 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `numberFormatsMatch_` | 5980 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `runDashboardQualityProcessValidationSections_` | 5992 | Internal helper | runDashboardQualityWorkflow | loadDashboardConfig_, getHeadersForSheetType_, getLatestSheetByPrefix_, getExpectedNumberFormat_, getGoogleSheetsNumberFormat_, numberFormatsMatch_, writeDashboardQualitySection_ | No |
| `runFrameworkSmokeValidation` | 6153 | Menu/admin entry | runFullQualityCheck | notify_ | No |
| `runFullQualityCheck` | 6214 | Menu/admin entry | — | runFrameworkSmokeValidation, runDashboardQualityWorkflow, notify_ | No |
| `runFormatDashboardUpdates` | 6222 | Manual/admin or uncertain | — | runDashboardQualityConfigVerificationSections_, writeDashboardQualitySection_, notify_ | No |
| `getFormatDashboardDefaultSection_` | 6925 | Internal helper | BuildDefaultFormatDashboard, getFallbackDashboardConfig_, getSubheadersFromDashboardConfig_ | — | No |
| `buildFormatDashboardTemplate_` | 6938 | Internal helper | createSystemSheetTemplates, ensureDashboardQualityReport_, menuBuildDashboardTemplate | BuildDefaultFormatDashboard | No |
| `BuildDefaultFormatDashboard` | 6947 | Workflow/public helper | buildFormatDashboardTemplate_ | getFallbackDashboardConfig_, getFormatDashboardDefaultSection_, isValidHex_, calculateThemeLevels_, createTemplateFromBase_, resizeSheetGrid_, getTemplateConfigFromDashboard_, b… | Yes |
| `saveActiveLayoutAsRebuildDefault` | 7065 | Workflow/public helper | saveActiveLayoutToDashboardSettings | notify_ | Yes |
| `restoreFormatDashboardFromDefault` | 7086 | Manual/admin or uncertain | — | resizeSheetGrid_, recalculateDashboardHexCodes_, notify_ | Yes |
| `getFallbackDashboardConfig_` | 7143 | Internal helper | BuildDefaultFormatDashboard, createGovernedSheet_, loadDashboardConfig_ | getFormatDashboardDefaultSection_ | No |
| `loadDashboardConfig_` | 7291 | Internal helper | applyColumnWidthsEngine_, applyOperationalFormatting_, buildMonthlyChangeReportForMonth_, configReportTitleCheck_, createAllReportTemplat… | getFallbackDashboardConfig_, buildDashboardSectionIndex_ | Yes |
| `buildDashboardSectionIndex_` | 7522 | Internal helper | loadDashboardConfig_ | — | No |
| `getHeadersForSheetType_` | 7538 | Internal helper | buildMonthlyChangeReportForMonth_, buildTemplateArchiveRefinedData, createDisenrolledListForMonth_, createMasterListForMonth_, getSubhead… | — | No |
| `getTemplateConfigFromDashboard_` | 7555 | Internal helper | BuildDefaultFormatDashboard, buildDashboardQualityTemplate_, buildFrameworkTimingTemplate_, buildIndexTemplate_, buildOperationalReportTe… | loadDashboardConfig_, calculateThemeLevels_, getTemplateTheme_, getHeadersForSheetType_, getDashboardRowFormattingSpecs_, getSubheadersFromDashboardConfig_ | No |
| `getDashboardRowFormattingSpecs_` | 7613 | Internal helper | getTemplateConfigFromDashboard_ | — | No |
| `getSubheadersFromDashboardConfig_` | 7626 | Internal helper | buildMonthlyChangeReportForMonth_, clearDiagnosticsAndTimingLogs, getTemplateConfigFromDashboard_ | getFormatDashboardDefaultSection_, loadDashboardConfig_, getHeadersForSheetType_ | No |
| `getStandardSheetKey_` | 7680 | Internal helper | applyOperationalFormatting_ | — | No |
| `normalizeDashboardTargetA1_` | 7690 | Internal helper | — | — | No |
| `configReportTitleCheck_` | 7696 | Internal helper | — | loadDashboardConfig_ | No |
| `onEdit` | 7712 | Trigger/web entry | — | recalculateDashboardHexCodes_, handleFormatDashboardValueHighlighting_, logBestEffortWarning_ | No |
| `handleFormatDashboardValueHighlighting_` | 7729 | Internal helper | onEdit | — | Yes |
| `isValidHex_` | 7753 | Internal helper | BuildDefaultFormatDashboard, getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `hexToHsl_` | 7755 | Internal helper | calculateThemeLevels_ | — | No |
| `hslToHex_` | 7772 | Internal helper | calculateThemeLevels_ | — | No |
| `calculateThemeLevels_` | 7783 | Internal helper | BuildDefaultFormatDashboard, getTemplateConfigFromDashboard_, getTemplateTheme_, recalculateDashboardHexCodes_ | hexToHsl_, hslToHex_ | No |
| `getHslPercentsFromDashboard_` | 7800 | Internal helper | getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `getDashboardStructuralSectionBounds_` | 7821 | Internal helper | getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `getTemplateTheme_` | 7847 | Internal helper | applyIndexGroupDividerRules_, getTemplateConfigFromDashboard_ | getHslPercentsFromDashboard_, getDashboardStructuralSectionBounds_, isValidHex_, calculateThemeLevels_ | No |
| `recalculateDashboardHexCodes_` | 7872 | Internal helper | BuildDefaultFormatDashboard, onEdit, restoreFormatDashboardFromDefault | getHslPercentsFromDashboard_, getDashboardStructuralSectionBounds_, isValidHex_, calculateThemeLevels_ | Yes |
