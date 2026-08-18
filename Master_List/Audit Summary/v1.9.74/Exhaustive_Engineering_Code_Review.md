# Master List v1.9.74 — Exhaustive Engineering Code Review

**Review date:** 2026-08-18
**Governing source:** `Master_List/Current Production Script/v1.9.74`, supplemented by the user-supplied Module 4 v2.1.11 update (`ensureRestoreButtonOnIndex_`)
**Review prompt:** `Master_List/Prompts/ML_Exhaustive_Review_v2`
**Method:** static syntax/AST inventory, call-graph review, execution-path inspection, specification comparison, review of the normalized timing extracts, and a focused API/dependency delta review of the supplied Module 4 update. No production code was modified and no live workbook execution was performed.

## 1. Executive Review Summary

| Measure | Result |
|---|---|
| Overall health | **57/100 — materially functional architecture with startup, Index-refresh, and unsafe replacement defects** |
| Production readiness | **Not approved pending Phase A corrections** |
| Critical | **1** |
| High | **3** |
| Medium | **3** |
| Low | **1** |
| Highest-risk workflows | `onOpen`; every Index refresh after the restore image exists; governed overwrite paths; Disenrolled Exclusion mutation |
| Primary bottlenecks | Historical averages: Monthly Update 144.679 s, Monthly Start 123.196 s, Format Monthly Sheets 106.731 s, template refresh 85.917 s; targeted row deletion and repeated index/report refresh remain secondary costs |
| Primary maintainability concerns | Six duplicate declarations; an invalid OverGridImage getter in the Module 4 update; broad best-effort catches; a smoke test that checks symbol presence but not executable paths |
| Recommended next action | Remove the stray startup identifier, replace `getAssignScript()` with the supported `getScript()` image getter, make governed replacement safe, and stage disenrollment changes before committing both sheets. |

The script retains the approved single-file, dashboard-driven, template-first architecture, fixed header row 4/data row 5 convention, batched matrix transforms, Primary PMR ownership, document locks on material write workflows, and source-archive behavior. No missing menu callback or confirmed missing top-level helper was found. The supplied Module 4 delta adds one function but also introduces a confirmed invalid method call. The blocking issues are narrow and correctable without redesigning business logic.

## 2. Repository and File Inventory

| Artifact | Role in review | Status |
|---|---|---|
| `Master_List/Current Production Script/v1.9.74` | Governing executable baseline; 7,908 lines / 383,329 bytes | Reviewed completely through AST inventory, targeted path inspection, and searches |
| User-supplied Module 4 v2.1.11 delta | Adds `ensureRestoreButtonOnIndex_` and invokes it from `populateIndexData` | Reviewed as the proposed/current Module 4 correction; the clean first copy in the prompt was treated as authoritative and the duplicated escaped rendering was ignored |
| `Master_List/Prompts/ML_Exhaustive_Review_v2` | Required review scope and output contract | Applied |
| `Framework/spec/EXHAUSTIVE_CODE_REVIEW_PROTOCOL.md` | Repository exhaustive-review protocol | Applied |
| `Framework/spec/GOOGLE_APPS_SCRIPT_STANDARDS.md` | Apps Script service-call/batching standard | Applied |
| `Framework/spec/DEPENDENCY_REVIEW_STANDARD.md` | Dependency and orphan classification standard | Applied |
| `Framework/spec/PERFORMANCE_STANDARD.md` | Performance standard | Applied |
| `Master_List/Specs/Current_Working_Framework_Spec_v2.0.md` | Current workflow/architecture specification | Compared to implementation |
| `Master_List/Audit Summary/Timing_Log_Average_Runtime_Review_CSV/*.csv` | Normalized historical timing evidence | Reviewed; evidence predates v1.9.74 and is directional, not proof of current timing |
| `Master_List/Reports/*` | Prior reports and binary runtime/quality exports | Inventory reviewed; binaries were not modified or committed |
| Apps Script manifest | External/container-bound per project README | Optional; absence is not a finding |

The repository copy already labels Module 4 as v2.1.11 but does not contain the supplied restore-button helper/call; therefore the audit distinguishes the committed baseline from the supplied delta. The active branch had no configured remote and GitHub authentication was unavailable, so repository synchronization could not be attempted without violating the repository authentication policy. The requested production artifact was present and was used as supplied.

## 3. Function and Dependency Inventory

| Metric | Count / result |
|---|---|
| Top-level function declarations | **296** after applying the supplied Module 4 delta (**295** in the committed baseline) |
| Unique top-level function names | **290** after the delta (**289** baseline) |
| Duplicate declarations | **6 declarations beyond uniqueness, across 6 names** |
| Menu `.addItem()` callbacks | **37 references; 0 missing** |
| Confirmed undefined top-level call dependencies | **0** |
| Functions containing write/destructive-style service operations | **85** after the delta (**84** baseline; conservative AST classification) |
| No-static-path candidates | **23 declarations** before manual classification |
| Supported/simple trigger entry points | `onOpen`, `onEdit` |
| Web-app entry point | `doGet` |

The raw unresolved-call list from lexical AST analysis consisted of nested local helpers (`getRowTime_`, `buildHeaderPairs_`, `checkPairsChanged_`, `setIfPresent`, `mapFallbackRows`, `parseSectionRows_`), callback parameters (`f`, `func`), the built-in `isFinite`, and one nested closure (`getIndex`). Manual review resolves all of them; there is no confirmed missing production dependency. `buildMasterListMenu_` is guarded by `typeof` and is therefore an optional compatibility hook, not an undefined-call defect.

The complete compact inventory is in Appendix A. “No static path” means no call path from menu strings, simple triggers, `doGet`, or other statically reached functions; it does **not** prove an orphan.

## 4. Complete Findings Register

### ML1974-001 — Stray identifier aborts every `onOpen` execution

- **Severity:** CRITICAL
- **Confidence:** Confirmed
- **Category:** Correctness / trigger / startup
- **Function/workflow:** `onOpen`
- **Description:** A bare `JavaScript` identifier is evaluated immediately after the menu is added. No variable with that name is declared.
- **Evidence/execution path:** Opening the workbook invokes `onOpen`; menu construction reaches the standalone identifier; JavaScript name resolution throws `ReferenceError: JavaScript is not defined`; the later optional menu builder, deletion/index check, and archive-index synchronization do not execute.
- **Operational impact:** Every workbook open records a failed simple-trigger execution and skips three intended startup operations. The visible menu may already have been added, which can disguise the failure.
- **Recommended correction:** Delete only the stray identifier line. Do not alter the guarded startup calls.
- **Breaking-change risk:** None.
- **Focused test:** Open/reload the bound workbook; confirm no failed `onOpen` execution, menu presence, sheet-count property update, and archive-index sync behavior.

### ML1974-008 — Restore-button detection calls a nonexistent OverGridImage method and breaks later Index refreshes

- **Severity:** HIGH
- **Confidence:** Confirmed
- **Category:** Correctness / API dependency / Index workflow
- **Function/workflow:** Supplied `ensureRestoreButtonOnIndex_` → `populateIndexData` → `populateActiveIndex`
- **Description:** The new helper calls `images[i].getAssignScript()`. The Apps Script `OverGridImage` API provides `getScript()` to read the assigned function and `assignScript()` to set it; `getAssignScript()` is not a supported method.
- **Evidence/execution path:** The first Index refresh can insert and assign the restore image because an empty image list skips the bad call. On the next refresh, `sheet.getImages()` returns that image, the loop invokes `getAssignScript()`, and execution throws a `TypeError` before the Index matrix is rebuilt. The call to `ensureRestoreButtonOnIndex_` is outside a protective best-effort boundary in `populateIndexData`.
- **Operational impact:** Once the restore image exists—or whenever any over-grid image exists—menu workflows and finalization paths that call `populateActiveIndex()` can fail during Index refresh. This can turn an otherwise completed monthly workflow into an apparent failure at its final Index stage and leave the Index stale.
- **Recommended correction:** Change the comparison to `images[i].getScript() === "restoreSheetFromActiveIndexRow"`. Keep `assignScript()` for setting the callback. Wrap only the optional image inspection/insertion in a contextual best-effort warning so Index data population always continues. Also route manual `buildRestoreButtonIcon` through the idempotent helper to prevent duplicate buttons.
- **Breaking-change risk:** None for the getter correction; low for wrapper consolidation.
- **Focused test:** Index with no images; Index with the assigned restore image; Index with an unrelated image; blocked icon download; repeated `populateActiveIndex()`; Monthly Start/Update final Index refresh.

### ML1974-002 — Governed overwrite deletes the valid target before replacement exists

- **Severity:** HIGH
- **Confidence:** Confirmed
- **Category:** Data integrity / sheet factory
- **Function/workflow:** `resolveSheetGovernance_` → `createGovernedSheet_`; exercised by Refined Data, Master List, Monthly Change, monthly formatting, and template refresh
- **Description:** `resolveSheetGovernance_` performs the destructive overwrite itself. It deletes and flushes the existing sheet before `createGovernedSheet_` copies the template/source, names the copy, writes the data, applies layout, or validates completion.
- **Evidence/execution path:** Any later Apps Script service error (copy quota/transient error, setName/write dimension mismatch, formatting/placement failure) occurs after the prior output has already been removed.
- **Operational impact:** A routine rerun can remove the last valid output and leave no replacement or a partially created replacement. Generated sheets are recreatable, but the interruption materially disrupts the supported workflow and can leave downstream stages without their expected source.
- **Recommended correction:** Make governance preflight side-effect free. Build under a temporary unique name, write and validate it, then delete/rename the old target as the final commit step. Clean up the temporary copy on failure.
- **Breaking-change risk:** Low; names and business output remain unchanged.
- **Focused test:** Inject failures at template copy, data write, formatting, and final rename; verify the original survives until the replacement is complete and exactly one final target remains after success.

### ML1974-003 — Disenrollment commits two-sheet mutations incrementally with no recoverable commit boundary

- **Severity:** HIGH
- **Confidence:** High
- **Category:** Data flow / partial completion
- **Function/workflow:** `createDisenrolledListForMonth_`, `removeReenrolledRowsFromExclusion_`, `appendDisenrolledRowsAtBottom_`
- **Description:** The workflow deletes re-enrolled exclusion rows first, appends new exclusion rows next, and only then clears/rewrites Refined Data. Later write, trim, total, or visibility failures leave one or both sheets partially updated. The copy/remove equality assertion occurs after the append, so even that failure leaves mutations behind.
- **Evidence/execution path:** Lines 3154 and 3199 mutate Disenrolled Exclusion; lines 3215–3221 clear and rewrite Refined Data; there is no rollback or idempotent commit marker around the group.
- **Operational impact:** A transient service failure can produce duplicated/removed exclusion entries or an exclusion list that no longer matches Refined Data. Automatic repeat after a safety notice increases the importance of idempotence.
- **Recommended correction:** Compute re-enrollment removals, additions, retained Refined rows, and equality checks entirely in memory first. Then write complete matrices to both sheets with the least destructive order; retain a pre-write snapshot in memory and restore the first sheet if the second write fails. This is a narrow two-sheet safeguard, not general transaction infrastructure.
- **Breaking-change risk:** Medium because disenrollment is stateful; preserve ordering, hidden-row rules, totals, and current duplicate semantics.
- **Focused test:** Re-enrollment only, disenrollment only, mixed update, already-durable PMR, injected failure before each write, and automatic repeat after safety notice.

### ML1974-004 — Re-enrollment cleanup deletes rows one by one

- **Severity:** MEDIUM
- **Confidence:** Confirmed
- **Category:** Performance
- **Function/workflow:** `removeReenrolledRowsFromExclusion_`
- **Description:** Every matching exclusion row calls `deleteRow` separately in a descending loop.
- **Evidence/execution path:** A re-enrollment sweep with N matches performs N structural Spreadsheet service calls.
- **Operational impact:** Moderate recurring latency and sheet recalculation churn when many historical rows are reactivated; not expected to time out alone for the current small user base.
- **Recommended correction:** Prefer one in-memory filter plus one batched rewrite (naturally aligned with ML1974-003), or group contiguous row numbers and call `deleteRows` once per group.
- **Breaking-change risk:** Low if descending/group logic is tested.
- **Focused test:** Noncontiguous and contiguous re-enrollment rows; verify identical retained order and counts.

### ML1974-005 — Event-trigger failures are silently swallowed

- **Severity:** MEDIUM
- **Confidence:** Confirmed
- **Category:** Error handling / diagnostics
- **Function/workflow:** `onEdit`; also `configReportTitleCheck_` and index-registration best-effort catches are weaker instances
- **Description:** `onEdit` catches every exception and does nothing. A broken dashboard color recalculation or highlight handler becomes invisible to the operator.
- **Evidence/execution path:** Edit either dashboard; either helper throws; catch block returns without log, toast, or diagnostic row.
- **Operational impact:** Dashboard-derived configuration can appear accepted even when edit-time presentation/recalculation failed, making configuration problems harder to diagnose. The core workflow remains available.
- **Recommended correction:** Call the existing `logBestEffortWarning_` with sheet/range/helper context. Keep the trigger non-blocking.
- **Breaking-change risk:** None.
- **Focused test:** Force each edit helper to throw; confirm the edit remains non-blocking and one actionable warning is recorded.

### ML1974-006 — Smoke validation reports symbol health while missing executable startup failure

- **Severity:** MEDIUM
- **Confidence:** Confirmed
- **Category:** Diagnostics / testability
- **Function/workflow:** `runFrameworkSmokeValidation`
- **Description:** The smoke test checks only 11 `typeof` values and three sheet names. It can pass while `onOpen` immediately fails in the committed baseline or while `populateActiveIndex()` calls the invalid image API in the supplied Module 4 delta.
- **Evidence/execution path:** `typeof onOpen` is not checked and the function is never invoked with mocked services; the stray identifier is outside the required-symbol checks.
- **Operational impact:** The built-in smoke result is misleading for startup readiness, although it remains useful for missing workflow symbols/sheets.
- **Recommended correction:** Add a side-effect-safe callback registry validation and a dedicated startup self-check that validates the startup call chain without invoking UI/service mutations. Do not turn this into broad release certification.
- **Breaking-change risk:** None.
- **Focused test:** Introduce an unresolved startup reference in a test copy and confirm the self-check fails with its line/callback context.

### ML1974-007 — Duplicate declarations obscure the effective implementation

- **Severity:** LOW
- **Confidence:** Confirmed
- **Category:** Duplicate code / maintainability
- **Function/workflow:** `createIndexSheet`, `refreshIndexAfterSheetWorkflow_`, `archiveRawSourceSheet_`, `getExpectedNumberFormat_`, `getGoogleSheetsNumberFormat_`, `numberFormatsMatch_`
- **Description:** Six names are declared twice. The three number-format helpers and two utility helpers are byte-equivalent/behavior-equivalent duplicates; the later `createIndexSheet` silently overrides the earlier wrapper and adds behavior.
- **Evidence/execution path:** Apps Script/JavaScript function declaration hoisting makes the last declaration effective, so source order does not communicate the actual implementation clearly.
- **Operational impact:** Low current runtime impact, but future edits can target an inactive declaration and appear to have no effect.
- **Recommended correction:** Retain one authoritative declaration per name. Keep the richer `createIndexSheet` behavior and remove only the shadowed wrapper after confirming menu/compatibility intent.
- **Breaking-change risk:** Low for exact duplicates; medium-low for `createIndexSheet`, requiring a menu and quick-setup test.
- **Focused test:** Build Index from the menu and quick setup; validate number-format quality comparisons.

## 5. Supported Entry-Point Report

### Menu and administrative functions

All 37 string callbacks used by `addItem` resolve. Major supported entries include monthly formatting/start/update, Refined Data build/sync, Disenrolled Exclusion, Monthly Change, Master List, tab organization/hide/archive actions, system/template creation, Index build/restore/configuration, Dashboard Quality, smoke validation, and individual report formatters.

### Trigger and web entry points

- `onOpen` — supported simple trigger, currently broken by ML1974-001.
- `onEdit` — supported simple trigger for dashboard recalculation/highlighting; diagnostic weakness in ML1974-005.
- `syncArchiveIndexToActiveIndex_` — installed time-trigger target created by `setupArchiveSyncTrigger` and optional startup sync.
- `doGet` — archive restore web-app entry point, guarded by a document lock and HTML escaping.

### Workflow functions

Supported workflow entry points are `formatMonthlySheets`, `runMonthlyStart`, `runMonthlyUpdate`, `buildRefinedDataFromScratch`, `updateRefinedDataMonthlySync`, `createDisenrolledList`, `buildMonthlyChangeReport`, `createMasterList`, `quickSystemSetup`, `quickBuildAllTemplates`, and `runDashboardQualityWorkflow`.

### Diagnostics

`runFrameworkSmokeValidation`, `runDashboardQualityWorkflow`, `runFullQualityCheck`, `runFormatDashboardUpdates`, and `runTemplateDateFormatValidation_` are diagnostic/admin surfaces. The latter three include non-menu supported-public or compatibility surfaces.

### Compatibility wrappers

One-line wrappers such as `formatMonthlySheets`, the individual format functions, hide/show template functions, setup/dashboard/template/index wrappers, and `enforceGlobalSheetSortOrder` preserve menu naming and should remain unless all dynamic/menu references are migrated.

### Removal candidates

Only the shadowed duplicate declarations in ML1974-007 are confirmed removal candidates. No unique top-level function is confirmed orphaned solely from static reachability.

## 6. Orphan and Duplicate Code Report

### Confirmed duplicates

- `refreshIndexAfterSheetWorkflow_` at lines 1224 and 5525 — equivalent.
- `archiveRawSourceSheet_` at lines 1272 and 4461 — equivalent.
- `getExpectedNumberFormat_` at lines 5992 and 6023 — exact repeated logic.
- `getGoogleSheetsNumberFormat_` at lines 5999 and 6030 — exact repeated logic.
- `numberFormatsMatch_` at lines 6012 and 6043 — exact repeated logic.
- `createIndexSheet` at lines 197 and 1332 — conflicting wrapper/richer implementation; later declaration wins.

### Confirmed orphans

None. Static analysis alone cannot confirm externally assigned image scripts, installed trigger targets, web deployments, or manually run administrative functions as dead.

### Probable orphans

None are recommended for deletion in this review.

### Compatibility / supported public functions

`runManualArchiveSync`, `buildRestoreButtonIcon`, `configureArchiveWebAppUrl`, `runFullQualityCheck`, `runFormatDashboardUpdates`, and `restoreFormatDashboardFromDefault` have no menu-based static root in this file but are coherent administrative/manual functions. Treat them as retained public/admin compatibility surfaces until the live script assignments and operator usage are checked.

### Dynamic or uncertain

`logFrameworkTiming_`, `padRowToWidth_`, `normalizeRowsToWidth_`, `valuesAreEqual_`, `getMonthDateParts_`, `setRequiredSheetName_`, `ensureOutputSheetHasFormattedRows_`, `applyColumnWidths_`, `appendSourceOnlyHeaders_`, `getSourceOnlyHeaders_`, `verifyRawNumberColumnPreserved_`, `normalizeDashboardTargetA1_`, and `configReportTitleCheck_` have no confirmed static root or are currently bypassed helpers. They are **uncertain**, not deletion candidates. `onEdit` and its highlighting helper are dynamic trigger-reachable.

## 7. Performance Report

| Rank | Workflow/path | Cause | Approximate evidence/impact | Correction | Change risk / logic preservation |
|---|---|---|---|---|---|
| 1 | Monthly Update | Multi-stage output rebuild, repeated index/timing writes and service synchronization | Historical normalized mean **144.679 s**, range **87.237–303.289 s** over 11 runs; one run approaches practical execution limits | First correct the commit boundaries; then profile v1.9.74 stage rows and remove redundant index refreshes within the all-in-one path | Medium; business order must remain unchanged |
| 2 | Monthly Start | Refined build + disenrollment + Master List + Index | Historical mean **123.196 s**, range **95.672–148.866 s** over 6 runs | Pass a shared workflow context/config/index-dirty flag through stages; refresh Index once at finalization | Low-medium; outputs unchanged |
| 3 | Format Monthly Sheets | Four report transformations, copies, archive work, flushes, index refresh | Historical mean **106.731 s**, range **34.696–267.257 s** over 25 runs | Retain batched matrices; use current timing rows to isolate copy/archive/flush bottlenecks before changing code | Low when limited to redundant refresh/flush removal |
| 4 | Template refresh | Multiple template copies and formatting | Historical mean **85.917 s**, range **11.140–164.340 s** over 7 runs | Continue template-first inheritance; avoid per-template dashboard reloads and refresh Index once | Low |
| 5 | Re-enrollment cleanup | `deleteRow` per match | N structural calls for N matches | Batch filter/rewrite or grouped `deleteRows` | Low; same rows/order |

Strengths: source and output data are generally read in matrices; mapping uses Maps/Sets; main write workflows use document locks; only seven explicit `flush()` calls exist; there are no pervasive `getValue`/`setValue` calls inside data loops. Timing evidence is historical and should not be presented as v1.9.74 benchmark proof.

## 8. Data-Flow and Data-Integrity Report

1. **Unsafe overwrite boundary (ML1974-002):** deletion precedes construction and validation.
2. **Partial disenrollment commit (ML1974-003):** two related persistent sheets are mutated incrementally.
3. **Positive controls:** monthly formatting preflights required imports before batch mutation; non-Raw source reports are copied to the archive before local deletion; Refined sync calculates final rows in memory; Primary PMR assignment and PMR/header failures are fail-fast; Master List rejects zero-row output; source Raw Data is retained/hidden rather than deleted.
4. **Accepted recreatability:** monthly outputs and templates are generated artifacts, so the recommendation is a small replacement-order fix—not general rollback infrastructure.
5. **Business-rule alignment:** observed workflow ordering matches the specification: Monthly Change precedes monthly Refined sync; disenrollment precedes Master List; participant-level merge behavior uses Primary PMR ownership. No additional material mapping, date, sorting, or off-by-one defect was confirmed by static review.

## 9. Trigger and Concurrency Report

Document locks protect formatting, Refined Data, disenrollment, Master List, Monthly Change, archive batches, and web restoration. This is proportionate to a one-to-three-user workbook. Trigger creation deletes prior triggers for the same handler before creating a 15-minute sync trigger, preventing duplicates.

The critical trigger issue is ML1974-001. The installed/archive sync itself remains proportionate, but the supplied restore-button hook makes every later Index refresh vulnerable to ML1974-008. `onEdit` is intentionally lightweight and non-locking, appropriate for formatting/config presentation, but its silent catch should log a best-effort warning. No enterprise orchestration, global busy service, or broader locking scheme is recommended.

## 10. Error Handling and Logging Review

### Strengths

- Core workflow exceptions generally propagate and timing captures terminal errors.
- Schema-critical checks throw before writes in many paths.
- Formatter subreport failures are surfaced in the completion notification.
- Archive copy failure prevents local source deletion.
- Best-effort formatting/index operations often avoid turning optional presentation work into core workflow failure.

### Weaknesses

- `onEdit` fully suppresses failures (ML1974-005).
- The factory's destructive preflight makes later propagated errors too late to preserve the previous output (ML1974-002).
- Several empty catches around optional dashboard/index reads erase diagnostic context. Use the existing warning helper; do not make those optional failures fatal.
- `runFrameworkSmokeValidation` validates names, not executable startup readiness (ML1974-006).

## 11. Maintainability and Architecture Review

The approved single-file architecture remains recognizable: modules are separated by headings, central constants govern header/data rows and system sheet names, dashboard loaders drive sheet rules/headers/layout, templates are the formatting source, workflow entry points are separated from underscore helpers, and transformations are predominantly in memory. No modularization recommendation is made.

Maintainability is reduced by duplicate declarations, stale comments such as “NEW”/“OPTIMIZATION” embedded as history, guarded references to optional compatibility hooks, and mixed semantics in `createIndexSheet`. The README's governing-source examples are also stale relative to v1.9.74, but that documentation issue is outside this code-review implementation diff and is not scored as a code defect.

## 12. Prioritized Remediation Plan

### Phase A — Confirmed correctness defects

1. Remove the lone `JavaScript` token from `onOpen`.
2. Replace `getAssignScript()` with `getScript()` and keep image-button work best-effort so Index population cannot be blocked.
3. Add a focused startup/Index self-check and verify the simple trigger path.

### Phase B — Broken dependencies and runtime stability

1. Refactor `resolveSheetGovernance_` into a pure preflight.
2. Implement create/write/validate/swap behavior in `createGovernedSheet_`.
3. Stage disenrollment changes and add a narrow two-sheet recovery path.

There are no missing menu callbacks or confirmed undefined dependencies to repair.

### Phase C — Material performance improvements

1. Replace row-by-row re-enrollment deletion with a batched rewrite/grouped deletion.
2. Use v1.9.74 timing rows to confirm whether nested Index/timing refreshes are material, then consolidate only demonstrated redundancies.
3. Avoid additional flushes; do not remove existing ones without stage-specific timing/behavior tests.

### Phase D — Orphan and duplicate cleanup

1. Remove the five behavior-equivalent second/first duplicate pairs, retaining one authoritative location.
2. Consolidate `createIndexSheet` to the richer implementation and preserve its menu/quick-setup contract.
3. Inventory live manually assigned scripts/triggers before touching uncertain no-static-path functions.

### Phase E — Maintainability cleanup

1. Replace empty best-effort catches with contextual warnings.
2. Update historical “NEW/OPTIMIZATION” comments to current behavioral rationale where touched.
3. Document the public/admin status of manual archive and diagnostic functions.

## 13. Focused Regression Test Plan

| Change area | Focused tests |
|---|---|
| Startup token | Reload workbook; check `onOpen` execution log, complete menu, sheet-count property, archive sync; test absent optional hooks |
| Restore button / Index | No image, correct image, unrelated image, failed fetch, repeated refresh, manual icon command, and monthly final Index refresh; confirm no duplicate button and no blocked Index write |
| Governed replacement | Existing/no-existing target; template copy failure; data write failure; final rename collision; hidden/visible output; dynamic rank; temporary-sheet cleanup |
| Refined Data | Scratch and sync; no-change path; changed contact/participant; archive rows; injected factory failure preserves prior Refined Data |
| Disenrollment | New, already-durable, re-enrolled, mixed, no-op; failure before/after each write; repeat-on-notice remains idempotent; totals and hidden historical rows |
| Duplicate removal | Menu Index build, quick setup Index build, archive workflows, template date-format validation and number-format comparison |
| Event diagnostics | Dashboard edit success; injected recalculation and highlighting errors generate warnings without blocking edit |
| Performance | Compare v1.9.74 baseline vs corrected run for monthly start/update/format and re-enrollment sweep with identical input; verify outputs rather than imposing arbitrary targets |

## 14. Final Conclusion

**Not approved due to identified code defects.** The critical `onOpen` failure and the supplied Module 4 invalid `getAssignScript()` call are certain, and the governed overwrite/disenrollment commit ordering creates plausible partial-output paths in supported workflows. The framework does not require redesign: the approved single-file, dashboard-driven, template-first, Primary PMR architecture can remain unchanged. After the four Phase A/B corrections and focused regression tests, the remaining medium/low items should not independently block production use.

---

## Appendix A — Complete Compact Top-Level Function Inventory

**Baseline inventory note:** The table below inventories the committed v1.9.74 file. The supplied Module 4 delta adds `ensureRestoreButtonOnIndex_`; see Appendix B for its adjusted edge and classification.

**Legend:** Role is inferred from menu/trigger reachability and naming. “Write” is a conservative AST flag for Spreadsheet/Properties/trigger or structural mutation calls in the function body. Callers and dependencies show direct top-level static edges only; callbacks/dynamic calls may not appear.

| Function | Line | Classification | Direct callers | Direct top-level dependencies | Write |
|---|---:|---|---|---|:---:|
| `onOpen` | 84 | Trigger/web entry | — | checkSheetDeletionAndUpdateIndex_, syncArchiveIndexToActiveIndex_ | No |
| `executeMonthlyFormatterWorkflow_` | 175 | Internal helper | formatBannerReport, formatCarePlanDueReport, formatRawData, formatUnlockedCarePlanReport, menuFormatMonthlySheets | runFormatterPipeline_ | No |
| `menuFormatMonthlySheets` | 180 | Workflow/public helper | formatMonthlySheets | executeMonthlyFormatterWorkflow_ | No |
| `formatMonthlySheets` | 184 | Menu/admin entry | — | menuFormatMonthlySheets | No |
| `formatBannerReport` | 185 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `formatCarePlanDueReport` | 186 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `formatUnlockedCarePlanReport` | 187 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `formatRawData` | 188 | Menu/admin entry | — | executeMonthlyFormatterWorkflow_ | No |
| `hideTemplates` | 190 | Menu/admin entry | — | hideTemplates_ | No |
| `showTemplates` | 191 | Menu/admin entry | — | showTemplates_ | No |
| `enforceGlobalSheetSortOrder` | 192 | Menu/admin entry | — | organizeTabs | No |
| `setupSystemSheets` | 193 | Menu/admin entry | — | createActiveSystemSheets | No |
| `rebuildFormatDashboardDefaults` | 194 | Menu/admin entry | — | menuBuildDashboardTemplate | No |
| `saveActiveLayoutToDashboardSettings` | 195 | Menu/admin entry | — | saveActiveLayoutAsRebuildDefault | No |
| `createOrRefreshAllReportTemplates` | 196 | Menu/admin entry | — | createAllReportTemplates | No |
| `createIndexSheet` | 197 | Menu/admin entry | quickSystemSetup | createActiveSheetFromTemplate_, populateActiveIndex, applyIndexGroupDividerRules_ | No |
| `runMonthlyStart` | 199 | Menu/admin entry | — | promptForLockedYearReportMonth_, markFrameworkStep_, processRefinedDataUpdate_, finalizeSharedMonthlyWorkflow_, runFrameworkTimed_ | No |
| `assertMonthlyUpdateStageComplete_` | 212 | Internal helper | finalizeSharedMonthlyWorkflow_, runMonthlyUpdate | — | No |
| `runMonthlyUpdate` | 220 | Menu/admin entry | — | promptForLockedYearReportMonth_, markFrameworkStep_, buildMonthlyChangeReportForMonth_, assertMonthlyUpdateStageComplete_, processRefinedDataUpdate_, finalizeSharedMonthlyWorkfl… | No |
| `finalizeSharedMonthlyWorkflow_` | 245 | Internal helper | runMonthlyStart, runMonthlyUpdate | markFrameworkStep_, createDisenrolledListForMonth_, assertMonthlyUpdateStageComplete_, createMasterListForMonth_, populateActiveIndex, notify_ | No |
| `menuBuildDashboardTemplate` | 302 | Workflow/public helper | rebuildFormatDashboardDefaults | buildFormatDashboardTemplate_ | No |
| `quickSystemSetup` | 311 | Menu/admin entry | — | ensureDocumentPropertiesInitialized_, notify_, markFrameworkStep_, createSystemSheetTemplates, createActiveSystemSheets, runFrameworkTimed_, runDashboardQualityStartUp, createIn… | No |
| `ensureDocumentPropertiesInitialized_` | 345 | Internal helper | quickSystemSetup | — | Yes |
| `createSystemSheetTemplates` | 358 | Workflow/public helper | quickSystemSetup | markFrameworkStep_, createOrRefreshBaseTemplate_, buildFormatDashboardTemplate_, createSystemTemplates | No |
| `createActiveSystemSheets` | 368 | Workflow/public helper | quickSystemSetup, setupSystemSheets | markFrameworkStep_, createActiveSheetFromTemplate_, stampActiveSubheaderTimestampNote_ | Yes |
| `createActiveSheetFromTemplate_` | 417 | Internal helper | createActiveSystemSheets, createIndexSheet, ensureDashboardQualityReport_, ensureFrameworkTimingReport_ | markFrameworkStep_, createGovernedSheet_ | No |
| `stampActiveSubheaderTimestampNote_` | 434 | Internal helper | createActiveSystemSheets | — | Yes |
| `quickBuildAllTemplates` | 446 | Menu/admin entry | — | notify_, markFrameworkStep_, createAllReportTemplates, runFrameworkTimed_, runDashboardQualityValidateTemplates | No |
| `clearDiagnosticsAndTimingLogs` | 466 | Menu/admin entry | — | ensureFrameworkTimingReport_, getFrameworkTimingSectionRegistry_, resetSubheaderSectionData_, getSubheadersFromDashboardConfig_, notify_ | No |
| `isFrameworkTimingEnabled_` | 487 | Internal helper | runFrameworkTimed_, toggleFrameworkTiming | — | No |
| `toggleFrameworkTiming` | 495 | Menu/admin entry | — | isFrameworkTimingEnabled_ | Yes |
| `startRuntimeTiming_` | 503 | Internal helper | runFrameworkTimed_ | — | No |
| `markRuntimeStep_` | 515 | Internal helper | markFrameworkStep_, runFrameworkTimed_ | getRuntimeTimingSeverity_, formatSeconds_, logRuntimeTiming_ | No |
| `logRuntimeWarning_` | 549 | Internal helper | logBestEffortWarning_ | — | No |
| `logBestEffortWarning_` | 556 | Internal helper | archiveMonthlySheetsBySpecs_, assertParticipantTotalsMatch_, collectMovedTitleInfoCells_, createGovernedSheet_, deleteSheetSafely_, enforceDataRowH… | logRuntimeWarning_ | No |
| `logFrameworkTiming_` | 563 | Internal helper | — | — | No |
| `logRuntimeTiming_` | 569 | Internal helper | markRuntimeStep_ | formatSeconds_ | No |
| `getRuntimeTimingSeverity_` | 576 | Internal helper | markRuntimeStep_ | — | No |
| `formatSeconds_` | 584 | Internal helper | logRuntimeTiming_, markRuntimeStep_ | — | No |
| `writeRuntimeTimingReport_` | 592 | Internal helper | runFrameworkTimed_ | ensureFrameworkTimingReport_, appendDataToSubheaderSection_, refreshFrameworkTimingSummarySections_, logBestEffortWarning_ | No |
| `runFrameworkTimed_` | 628 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets, buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterListForMonth… | isFrameworkTimingEnabled_, startRuntimeTiming_, markRuntimeStep_, writeRuntimeTimingReport_ | No |
| `markFrameworkStep_` | 646 | Internal helper | appendDisenrolledRowsAtBottom_, appendRefinedDataArchiveRows_, applyRefinedDataProcesses_, archiveMonthlySheetsBySpecs_, archiveRawSourceSheet_, as… | markRuntimeStep_ | No |
| `normalizeSubheaderColumnName_` | 652 | Internal helper | getSubheaderSectionRecords_, mapRowsToSubheaderColumns_ | — | No |
| `getSubheaderSectionHeaders_` | 664 | Internal helper | getSubheaderSectionRecords_, mapRowsToSubheaderColumns_, writeDashboardQualitySection_ | getSubheaderSectionBounds_ | No |
| `mapRowsToSubheaderColumns_` | 673 | Internal helper | appendDataToSubheaderSection_, replaceSubheaderSectionData_ | getSubheaderSectionHeaders_, normalizeSubheaderColumnName_ | No |
| `getSubheaderSectionRecords_` | 692 | Internal helper | getFrameworkTimingDetailRows_ | getSubheaderSectionBounds_, getSubheaderSectionHeaders_, normalizeSubheaderColumnName_ | No |
| `appendDataToSubheaderSection_` | 713 | Internal helper | appendMonthlyChangeRowsWithHighlights_, writeDashboardQualitySection_, writeRuntimeTimingReport_ | mapRowsToSubheaderColumns_, getSubheaderSectionBounds_, resizeSheetGrid_, applySubheaderDataRowFormatting_ | Yes |
| `applySubheaderDataRowFormatting_` | 754 | Internal helper | appendDataToSubheaderSection_, replaceSubheaderSectionData_ | — | Yes |
| `findSubheaderDataAnchorRow_` | 763 | Internal helper | getSubheaderSectionBounds_ | — | No |
| `resetSubheaderSectionData_` | 776 | Internal helper | clearDiagnosticsAndTimingLogs | getSubheaderSectionBounds_ | Yes |
| `getSubheaderSectionBounds_` | 786 | Internal helper | appendDataToSubheaderSection_, applyMonthlyChangeSectionHHeaders_, getSubheaderSectionHeaders_, getSubheaderSectionRecords_, replaceSubheaderSectio… | findSubheaderDataAnchorRow_ | No |
| `getFrameworkTimingSectionRegistry_` | 810 | Internal helper | clearDiagnosticsAndTimingLogs, hasFrameworkTimingSections_ | — | No |
| `ensureFrameworkTimingReport_` | 819 | Internal helper | clearDiagnosticsAndTimingLogs, writeRuntimeTimingReport_ | hasFrameworkTimingSections_, buildFrameworkTimingTemplate_, createActiveSheetFromTemplate_ | No |
| `hasFrameworkTimingSections_` | 832 | Internal helper | ensureFrameworkTimingReport_ | getFrameworkTimingSectionRegistry_ | No |
| `getFrameworkTimingDetailRows_` | 841 | Internal helper | refreshFrameworkTimingSummarySections_ | getSubheaderSectionRecords_ | No |
| `replaceSubheaderSectionData_` | 845 | Internal helper | refreshFrameworkTimingSummarySections_ | mapRowsToSubheaderColumns_, getSubheaderSectionBounds_, resizeSheetGrid_, applySubheaderDataRowFormatting_ | Yes |
| `refreshFrameworkTimingSummarySections_` | 866 | Internal helper | writeRuntimeTimingReport_ | getFrameworkTimingDetailRows_, worseRuntimeTimingSeverity_, getRuntimeTimingRecommendation_, getRuntimeTimingThreshold_, replaceSubheaderSectionData_ | No |
| `worseRuntimeTimingSeverity_` | 947 | Internal helper | refreshFrameworkTimingSummarySections_ | — | No |
| `getRuntimeTimingThreshold_` | 952 | Internal helper | refreshFrameworkTimingSummarySections_ | — | No |
| `getRuntimeTimingRecommendation_` | 958 | Internal helper | refreshFrameworkTimingSummarySections_ | — | No |
| `getDataValues_` | 969 | Internal helper | buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterListForMonth_, finalizeMonthlyParticipantTotals_, getHeaders_, proce… | buildHeaderIndexMap_ | No |
| `getHeaders_` | 984 | Internal helper | createMasterListForMonth_ | getDataValues_ | No |
| `buildHeaderIndexMap_` | 988 | Internal helper | appendRefinedDataArchiveRows_, applyRefinedDataProcesses_, assignPrimaryPMRRowsToMatrix_, combineRefinedDataNotesSummary_, countUniqueParticipantsB… | — | No |
| `getPMRIndex_` | 997 | Internal helper | applyRefinedDataProcesses_, assignPrimaryPMRRowsToMatrix_, buildUnlockCPLookupMap_, computeMonthlyChange_, countUniqueParticipantsByStatus_, create… | findHeaderIndex_ | No |
| `normalizePMR_` | 1002 | Internal helper | buildUnlockCPLookupMap_, mergeMasterListData_ | — | No |
| `findHeaderIndex_` | 1011 | Internal helper | appendRefinedDataArchiveRows_, buildCPDueLookupMap_, buildUnlockCPLookupMap_, combineRefinedDataNotesSummary_, computeMonthlyChange_, countUniquePa… | — | No |
| `mapRowsToHeaders_` | 1021 | Internal helper | appendMonthlyChangeGroup_, createDisenrolledListForMonth_, processRefinedDataUpdate_, processSingleSubReport_, replaceChangedRefinedDataPMRs_ | buildHeaderIndexMap_, findHeaderIndex_ | No |
| `padRowToWidth_` | 1031 | Internal helper | normalizeRowsToWidth_ | — | No |
| `normalizeRowsToWidth_` | 1038 | Internal helper | — | padRowToWidth_ | No |
| `isPrimaryPMRRowValue_` | 1042 | Internal helper | applyRefinedDataProcesses_, getPrimaryMonthlyChangeRows_, pruneAgedDisenrolledNonPrimaryRows_, replaceChangedRefinedDataPMRs_ | — | No |
| `valuesAreEqual_` | 1047 | Internal helper | — | — | No |
| `getMonthDateParts_` | 1056 | Internal helper | — | buildPromptedMonthContext_ | No |
| `formatReportDateLabel_` | 1061 | Internal helper | buildMonthlySheetName_ | — | No |
| `buildMonthlySheetName_` | 1066 | Internal helper | createGovernedSheet_, getMonthlyChangeSectionMap_ | formatReportDateLabel_ | No |
| `getLatestSheetByPrefix_` | 1076 | Internal helper | runDashboardQualityProcessValidationSections_ | extractFirstDateFromSheetName_ | Yes |
| `getCurrentRawDataSheet_` | 1088 | Internal helper | createDisenrolledListForMonth_, finalizeMonthlyParticipantTotals_, processRefinedDataUpdate_ | — | No |
| `getCurrentRefinedDataSheet_` | 1094 | Internal helper | createDisenrolledListForMonth_, createMasterListForMonth_, processRefinedDataUpdate_ | — | No |
| `getCurrentCarePlanDueSheet_` | 1098 | Internal helper | createMasterListForMonth_ | — | No |
| `getCurrentUnlockedCarePlanSheet_` | 1104 | Internal helper | createMasterListForMonth_ | — | No |
| `setRequiredSheetName_` | 1110 | Internal helper | — | — | Yes |
| `ensureOutputSheetHasFormattedRows_` | 1122 | Internal helper | — | resizeSheetGrid_ | No |
| `resizeSheetGrid_` | 1129 | Internal helper | BuildDefaultFormatDashboard, appendDataToSubheaderSection_, applyOperationalFormatting_, buildGeneralTemplate_, createOrRefreshBaseTemplate_, ensur… | — | Yes |
| `trimCreatedSheetToSize_` | 1137 | Internal helper | applyOperationalFormatting_, buildGeneralTemplate_, createOrRefreshBaseTemplate_, trimCreatedSheetToData_ | resizeSheetGrid_ | Yes |
| `trimCreatedSheetToData_` | 1151 | Internal helper | createDisenrolledListForMonth_, createGovernedSheet_ | trimCreatedSheetToSize_ | No |
| `applyNativeBandingSafe_` | 1158 | Internal helper | buildGeneralTemplate_ | — | Yes |
| `applyColumnWidths_` | 1168 | Internal helper | — | — | Yes |
| `openArchiveSpreadsheetOnce_` | 1175 | Internal helper | archiveRawSourceSheet_, processSingleSubReport_, restoreSheetFromArchiveWorkbook | — | No |
| `notify_` | 1183 | Internal helper | clearDiagnosticsAndTimingLogs, finalizeSharedMonthlyWorkflow_, hideMonthlySheetsBySpecs_, hideSystemSheetsNow, notifyParticipantSafetyNotices_, qui… | — | No |
| `deleteSheetSafely_` | 1187 | Internal helper | processSingleSubReport_ | logBestEffortWarning_ | Yes |
| `promptForLockedYearReportMonth_` | 1192 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets, buildMonthlyChangeReport, buildRefinedDataFromScratch, createDisenrolledList, createMasterL… | buildPromptedMonthContext_ | No |
| `buildPromptedMonthContext_` | 1201 | Internal helper | getMonthDateParts_, promptForLockedYearReportMonth_ | — | No |
| `refreshIndexAfterSheetWorkflow_` | 1224 | Internal helper | — | populateActiveIndex, logBestEffortWarning_ | No |
| `hideSheetIfNeeded_` | 1228 | Internal helper | createGovernedSheet_, hideSystemSheetsNow, organizeTabs, processSingleSubReport_, runFormatterPipeline_, setReportTemplateVisibility_ | activateVisibleSheetBeforeHiding_, markFrameworkStep_ | Yes |
| `showSheetIfNeeded_` | 1237 | Internal helper | createGovernedSheet_, setReportTemplateVisibility_, showSystemSheetsNow | markFrameworkStep_ | Yes |
| `activateVisibleSheetBeforeHiding_` | 1245 | Internal helper | copySheetToArchiveAndDeleteLocal_, hideMonthlySheetsBySpecs_, hideSheetIfNeeded_ | — | Yes |
| `extractFirstDateFromSheetName_` | 1253 | Internal helper | findArchiveMonthlyCandidateSheetsUpToDate_, getLatestSheetByPrefix_, populateIndexData | — | No |
| `getUniqueArchiveSheetName_` | 1264 | Internal helper | archiveRawSourceSheet_ | — | No |
| `archiveRawSourceSheet_` | 1272 | Internal helper | copySheetToArchiveAndDeleteLocal_, processSingleSubReport_ | openArchiveSpreadsheetOnce_, getUniqueArchiveSheetName_, markFrameworkStep_ | Yes |
| `filterBlankRows_` | 1288 | Internal helper | buildMonthlyChangeReportForMonth_, createDisenrolledListForMonth_, createMasterListForMonth_, finalizeMonthlyParticipantTotals_, processRefinedData… | — | No |
| `buildLookupMap_` | 1295 | Internal helper | syncBannerFieldsIntoRawRows_ | — | Yes |
| `setupArchiveSyncTrigger` | 1305 | Workflow/public helper | quickSystemSetup | syncArchiveIndexToActiveIndex_ | Yes |
| `createIndexSheet` | 1332 | Menu/admin entry | quickSystemSetup | createActiveSheetFromTemplate_, populateActiveIndex, applyIndexGroupDividerRules_ | No |
| `resolveSheetGovernance_` | 1383 | Internal helper | createGovernedSheet_ | calculateDynamicRank_, loadDashboardConfig_, getRankForSheetName_ | Yes |
| `getRankForSheetName_` | 1474 | Internal helper | processSingleSubReport_, resolveSheetGovernance_ | loadDashboardConfig_, getTemplateCreationRule_, calculateDynamicRank_ | No |
| `getTemplateCreationRule_` | 1517 | Internal helper | createGovernedSheet_, getRankForSheetName_, writeConfiguredSheetGovernanceNote_ | — | No |
| `calculateDynamicRank_` | 1539 | Internal helper | getRankForSheetName_, processSingleSubReport_, resolveSheetGovernance_, writeConfiguredSheetGovernanceNote_ | extractDynamicRankMonth_ | No |
| `extractDynamicRankMonth_` | 1560 | Internal helper | calculateDynamicRank_ | — | No |
| `writeSheetGovernanceNote_` | 1573 | Internal helper | createGovernedSheet_, processSingleSubReport_, writeConfiguredSheetGovernanceNote_ | — | Yes |
| `getGovernedSheetTypeForName_` | 1613 | Internal helper | restoreSheetFromArchiveWorkbook | loadDashboardConfig_ | No |
| `writeConfiguredSheetGovernanceNote_` | 1628 | Internal helper | buildGeneralTemplate_, createOrRefreshBaseTemplate_ | loadDashboardConfig_, getTemplateCreationRule_, calculateDynamicRank_, writeSheetGovernanceNote_ | No |
| `createGovernedSheet_` | 1654 | Internal helper | appendRefinedDataArchiveRows_, buildMonthlyChangeReportForMonth_, createActiveSheetFromTemplate_, createDisenrolledListForMonth_, createMasterListF… | loadDashboardConfig_, getFallbackDashboardConfig_, buildMonthlySheetName_, getTemplateCreationRule_, resolveSheetGovernance_, markFrameworkStep_, logBestEffortWarning_, position… | Yes |
| `applyGovernedNumberFormatsFromDashboard_` | 1786 | Internal helper | createGovernedSheet_ | — | No |
| `enforceDataRowHeights_` | 1793 | Internal helper | createGovernedSheet_ | logBestEffortWarning_ | Yes |
| `collectMovedTitleInfoCells_` | 1824 | Internal helper | processSingleSubReport_ | logBestEffortWarning_ | No |
| `normalizeRawPreservationHeader_` | 1842 | Internal helper | appendSourceOnlyHeaders_, getMonthlyChangeSectionMap_, getSourceOnlyHeaders_ | — | No |
| `appendSourceOnlyHeaders_` | 1846 | Internal helper | — | normalizeRawPreservationHeader_ | No |
| `getSourceOnlyHeaders_` | 1861 | Internal helper | — | normalizeRawPreservationHeader_ | No |
| `readValidSourceDate_` | 1872 | Internal helper | stampMonthlySubReportSourceDates_ | — | No |
| `stampMonthlySubReportSourceDates_` | 1883 | Internal helper | processSingleSubReport_ | readValidSourceDate_, logBestEffortWarning_, markFrameworkStep_ | Yes |
| `normalizePreservedValue_` | 1899 | Internal helper | verifyRawDataSourceOnlyColumns_, verifyRawNumberColumnPreserved_, verifyRawSourceSheetUntouched_ | — | No |
| `verifyRawSourceSheetUntouched_` | 1915 | Internal helper | finalizeFormattedMonthlyOutput_ | getDataValues_, normalizePreservedValue_, markFrameworkStep_ | No |
| `verifyRawDataSourceOnlyColumns_` | 1939 | Internal helper | finalizeFormattedMonthlyOutput_ | markFrameworkStep_, buildHeaderIndexMap_, findHeaderIndex_, normalizePreservedValue_ | No |
| `writeRawDataParticipantTotals_` | 1980 | Internal helper | finalizeMonthlyParticipantTotals_ | buildHeaderIndexMap_, findHeaderIndex_, writeParticipantTotalTimestamp_, markFrameworkStep_ | Yes |
| `writeUniqueParticipantTotalToG1_` | 2032 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, writeParticipantTotalTimestamp_, markFrameworkStep_ | Yes |
| `writeParticipantTotalTimestamp_` | 2066 | Internal helper | writeRawDataParticipantTotals_, writeUniqueParticipantTotalToG1_ | — | Yes |
| `countUniqueParticipantsByStatus_` | 2071 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_ | No |
| `assertParticipantTotalsMatch_` | 2086 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | logBestEffortWarning_ | No |
| `notifyParticipantSafetyNotices_` | 2093 | Internal helper | createDisenrolledListForMonth_, processRefinedDataUpdate_ | notify_ | No |
| `sortRowsByLastName_` | 2100 | Internal helper | processRefinedDataUpdate_ | buildHeaderIndexMap_, findHeaderIndex_ | Yes |
| `runFormatterPipeline_` | 2108 | Internal helper | executeMonthlyFormatterWorkflow_ | promptForLockedYearReportMonth_, markFrameworkStep_, loadDashboardConfig_, assertRequiredMonthlyImportsPresent_, processSingleSubReport_, logBestEffortWarning_, finalizeMonthlyP… | No |
| `assertRequiredMonthlyImportsPresent_` | 2182 | Internal helper | runFormatterPipeline_ | markFrameworkStep_, findSourceSheetForSubReport_ | No |
| `processSingleSubReport_` | 2208 | Internal helper | runFormatterPipeline_ | markFrameworkStep_, findSourceSheetForSubReport_, collectMovedTitleInfoCells_, getDataValues_, findHeaderIndex_, getHeadersForSheetType_, mapRowsToHeaders_, buildHeaderIndexMap_… | Yes |
| `verifyRawNumberColumnPreserved_` | 2352 | Internal helper | — | buildHeaderIndexMap_, findHeaderIndex_, normalizePreservedValue_, markFrameworkStep_ | No |
| `finalizeFormattedMonthlyOutput_` | 2371 | Internal helper | processSingleSubReport_ | verifyRawDataSourceOnlyColumns_, verifyRawSourceSheetUntouched_ | No |
| `finalizeMonthlyParticipantTotals_` | 2389 | Internal helper | runFormatterPipeline_ | getCurrentRawDataSheet_, markFrameworkStep_, getDataValues_, filterBlankRows_, writeRawDataParticipantTotals_ | No |
| `syncBannerFieldsIntoRawRows_` | 2407 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, buildLookupMap_ | No |
| `assignPrimaryPMRRowsToMatrix_` | 2449 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_ | Yes |
| `pruneAgedDisenrolledNonPrimaryRows_` | 2589 | Internal helper | processSingleSubReport_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, isPrimaryPMRRowValue_ | Yes |
| `findSourceSheetForSubReport_` | 2624 | Internal helper | assertRequiredMonthlyImportsPresent_, processSingleSubReport_ | isSheetNameMatchingMonth_ | No |
| `isSheetNameMatchingMonth_` | 2690 | Internal helper | findSourceSheetForSubReport_ | — | No |
| `buildRefinedDataFromScratch` | 2728 | Menu/admin entry | — | promptForLockedYearReportMonth_, processRefinedDataUpdate_ | No |
| `updateRefinedDataMonthlySync` | 2734 | Menu/admin entry | — | promptForLockedYearReportMonth_, processRefinedDataUpdate_ | No |
| `processRefinedDataUpdate_` | 2740 | Internal helper | buildRefinedDataFromScratch, runMonthlyStart, runMonthlyUpdate, updateRefinedDataMonthlySync | loadDashboardConfig_, getCurrentRawDataSheet_, getDataValues_, filterBlankRows_, getHeadersForSheetType_, mapRowsToHeaders_, stampRefinedTrackingFields_, getCurrentRefinedDataSh… | Yes |
| `normalizeMonthlyChangeSectionName_` | 2823 | Internal helper | getMonthlyChangeSectionMap_ | — | No |
| `getMonthlyChangeSectionMap_` | 2835 | Internal helper | processRefinedDataUpdate_ | buildMonthlySheetName_, normalizeMonthlyChangeSectionName_, normalizeRawPreservationHeader_ | Yes |
| `replaceChangedRefinedDataPMRs_` | 2864 | Internal helper | processRefinedDataUpdate_ | buildHeaderIndexMap_, getPMRIndex_, findHeaderIndex_, mapRowsToHeaders_, isPrimaryPMRRowValue_, stampRefinedTrackingFields_, applyRefinedDataProcesses_, markFrameworkStep_ | Yes |
| `appendRefinedDataArchiveRows_` | 2944 | Internal helper | processRefinedDataUpdate_ | createGovernedSheet_, buildHeaderIndexMap_, findHeaderIndex_, markFrameworkStep_ | Yes |
| `stampRefinedTrackingFields_` | 2977 | Internal helper | processRefinedDataUpdate_, replaceChangedRefinedDataPMRs_ | buildHeaderIndexMap_ | No |
| `applyRefinedDataProcesses_` | 2994 | Internal helper | processRefinedDataUpdate_, replaceChangedRefinedDataPMRs_ | buildHeaderIndexMap_, getPMRIndex_, isPrimaryPMRRowValue_, markFrameworkStep_, combineRefinedDataNotesSummary_ | Yes |
| `combineRefinedDataNotesSummary_` | 3081 | Internal helper | applyRefinedDataProcesses_ | buildHeaderIndexMap_, findHeaderIndex_ | No |
| `createDisenrolledList` | 3112 | Menu/admin entry | — | promptForLockedYearReportMonth_, createDisenrolledListForMonth_ | No |
| `createDisenrolledListForMonth_` | 3118 | Internal helper | createDisenrolledList, finalizeSharedMonthlyWorkflow_ | loadDashboardConfig_, getCurrentRefinedDataSheet_, getDataValues_, getHeadersForSheetType_, findHeaderIndex_, getPMRIndex_, createGovernedSheet_, filterBlankRows_, removeReenrol… | Yes |
| `removeReenrolledRowsFromExclusion_` | 3267 | Internal helper | createDisenrolledListForMonth_ | getDataValues_, getPMRIndex_, markFrameworkStep_ | Yes |
| `appendDisenrolledRowsAtBottom_` | 3282 | Internal helper | createDisenrolledListForMonth_ | markFrameworkStep_ | Yes |
| `hideHistoricalDisenrollmentRows_` | 3322 | Internal helper | createDisenrolledListForMonth_ | — | Yes |
| `createMasterList` | 3346 | Menu/admin entry | — | promptForLockedYearReportMonth_, createMasterListForMonth_ | No |
| `createMasterListForMonth_` | 3352 | Internal helper | createMasterList, finalizeSharedMonthlyWorkflow_ | loadDashboardConfig_, getCurrentRefinedDataSheet_, getCurrentCarePlanDueSheet_, getCurrentUnlockedCarePlanSheet_, markFrameworkStep_, getDataValues_, filterBlankRows_, getHeader… | No |
| `normalizeNameKey_` | 3409 | Internal helper | buildNameKeyVariants_ | — | No |
| `buildNameKeyVariants_` | 3414 | Internal helper | buildCPDueLookupMap_, buildUnlockCPLookupMap_, mergeMasterListData_ | normalizeNameKey_ | No |
| `buildCPDueLookupMap_` | 3456 | Internal helper | mergeMasterListData_ | findHeaderIndex_, buildNameKeyVariants_ | Yes |
| `buildUnlockCPLookupMap_` | 3472 | Internal helper | mergeMasterListData_ | getPMRIndex_, findHeaderIndex_, normalizePMR_, buildNameKeyVariants_ | Yes |
| `getMappedValue_` | 3499 | Internal helper | mergeMasterListData_ | findHeaderIndex_ | No |
| `mergeMasterListData_` | 3505 | Internal helper | createMasterListForMonth_ | getPMRIndex_, buildCPDueLookupMap_, buildUnlockCPLookupMap_, findHeaderIndex_, normalizePMR_, buildNameKeyVariants_, getMappedValue_ | Yes |
| `buildMonthlyChangeReport` | 3570 | Menu/admin entry | — | promptForLockedYearReportMonth_, buildMonthlyChangeReportForMonth_ | No |
| `buildMonthlyChangeReportForMonth_` | 3576 | Internal helper | buildMonthlyChangeReport, runMonthlyUpdate | loadDashboardConfig_, getDataValues_, filterBlankRows_, markFrameworkStep_, getSubheadersFromDashboardConfig_, getHeadersForSheetType_, computeMonthlyChange_, createGovernedShee… | Yes |
| `applyMonthlyChangeSectionHHeaders_` | 3619 | Internal helper | buildMonthlyChangeReportForMonth_ | getSubheaderSectionBounds_ | Yes |
| `computeMonthlyChange_` | 3636 | Internal helper | buildMonthlyChangeReportForMonth_ | getPMRIndex_, groupMonthlyChangeRowsByPMR_, findHeaderIndex_, normalizeMonthlyChangeValue_, getMonthlyChangeParticipantEligibility_, getPrimaryMonthlyChangeRows_, isSameReportDa… | No |
| `getMonthlyChangeParticipantEligibility_` | 3784 | Internal helper | computeMonthlyChange_ | isSameReportDate_ | No |
| `getPrimaryMonthlyChangeRows_` | 3798 | Internal helper | computeMonthlyChange_ | findHeaderIndex_, isPrimaryPMRRowValue_ | No |
| `groupMonthlyChangeRowsByPMR_` | 3805 | Internal helper | computeMonthlyChange_ | — | Yes |
| `isSameReportDate_` | 3816 | Internal helper | computeMonthlyChange_, getMonthlyChangeParticipantEligibility_ | — | No |
| `getChangedHeadersAcrossAllRows_` | 3823 | Internal helper | computeMonthlyChange_ | findHeaderIndex_, normalizeMonthlyChangeValue_ | Yes |
| `normalizeMonthlyChangeValue_` | 3835 | Internal helper | computeMonthlyChange_, getChangedHeadersAcrossAllRows_ | — | No |
| `appendMonthlyChangeGroup_` | 3840 | Internal helper | computeMonthlyChange_ | mapRowsToHeaders_ | No |
| `appendMonthlyChangeRowsWithHighlights_` | 3850 | Internal helper | buildMonthlyChangeReportForMonth_ | appendDataToSubheaderSection_ | Yes |
| `organizeTabs` | 3883 | Workflow/public helper | enforceGlobalSheetSortOrder | getTargetRankForSheet_, getUnformattedSheetSortKey_, hideSheetIfNeeded_ | Yes |
| `getUnformattedSheetSortKey_` | 3975 | Internal helper | organizeTabs, populateIndexData | — | No |
| `positionSheetBySectionFRank_` | 4019 | Internal helper | buildGeneralTemplate_, createGovernedSheet_, processSingleSubReport_ | getTargetRankForSheet_, logBestEffortWarning_ | Yes |
| `getTargetRankForSheet_` | 4087 | Internal helper | matchSheetToSectionFRule_, organizeTabs, positionSheetBySectionFRank_ | — | No |
| `matchSheetToSectionFRule_` | 4153 | Internal helper | populateIndexData | getTargetRankForSheet_ | No |
| `hideMonthlyImportSheets` | 4171 | Menu/admin entry | — | promptForLockedYearReportMonth_, hideMonthlySheetsBySpecs_ | No |
| `hideMonthlyActiveSheets` | 4183 | Menu/admin entry | — | promptForLockedYearReportMonth_, hideMonthlySheetsBySpecs_ | No |
| `hideTemplates_` | 4194 | Internal helper | hideTemplates | hideReportTemplates | No |
| `showTemplates_` | 4195 | Internal helper | showTemplates | showReportTemplates | No |
| `getDashboardConfigForTemplateVisibility_` | 4197 | Internal helper | hideReportTemplates, showReportTemplates | loadDashboardConfig_, logBestEffortWarning_ | No |
| `hideReportTemplates` | 4207 | Workflow/public helper | hideTemplates_ | getDashboardConfigForTemplateVisibility_, setReportTemplateVisibility_, runFrameworkTimed_ | No |
| `showReportTemplates` | 4214 | Workflow/public helper | showTemplates_ | getDashboardConfigForTemplateVisibility_, setReportTemplateVisibility_, runFrameworkTimed_ | No |
| `setReportTemplateVisibility_` | 4221 | Internal helper | hideReportTemplates, showReportTemplates | hideSheetIfNeeded_, showSheetIfNeeded_, markFrameworkStep_ | No |
| `hideSystemSheets_` | 4255 | Menu/admin entry | — | hideSystemSheetsNow | No |
| `showSystemSheets_` | 4256 | Menu/admin entry | — | showSystemSheetsNow | No |
| `hideSystemSheetsNow` | 4258 | Workflow/public helper | hideSystemSheets_ | hideSheetIfNeeded_, notify_, runFrameworkTimed_ | No |
| `showSystemSheetsNow` | 4275 | Workflow/public helper | showSystemSheets_ | showSheetIfNeeded_, notify_, runFrameworkTimed_ | No |
| `hideMonthlySheetsBySpecs_` | 4292 | Internal helper | hideMonthlyActiveSheets, hideMonthlyImportSheets | findArchiveMonthlyCandidateSheetsUpToDate_, activateVisibleSheetBeforeHiding_, notify_, runFrameworkTimed_ | Yes |
| `archiveMonthlyImportSheets` | 4324 | Menu/admin entry | — | promptForLockedYearReportMonth_, archiveMonthlySheetsBySpecs_, populateActiveIndex, notifyArchiveMonthlySheetsResult_, runFrameworkTimed_ | No |
| `archiveMonthlyActiveSheets` | 4342 | Menu/admin entry | — | promptForLockedYearReportMonth_, archiveMonthlySheetsBySpecs_, populateActiveIndex, notifyArchiveMonthlySheetsResult_, runFrameworkTimed_ | No |
| `archiveMonthlySheetsBySpecs_` | 4360 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets | markFrameworkStep_, findArchiveMonthlyCandidateSheetsUpToDate_, logBestEffortWarning_, copySheetToArchiveAndDeleteLocal_, pingArchiveIndexUpdate_ | No |
| `pingArchiveIndexUpdate_` | 4404 | Internal helper | archiveMonthlySheetsBySpecs_ | logBestEffortWarning_ | No |
| `findArchiveMonthlyCandidateSheetsUpToDate_` | 4415 | Internal helper | archiveMonthlySheetsBySpecs_, hideMonthlySheetsBySpecs_ | extractFirstDateFromSheetName_ | Yes |
| `notifyArchiveMonthlySheetsResult_` | 4447 | Internal helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets | — | No |
| `copySheetToArchiveAndDeleteLocal_` | 4454 | Internal helper | archiveMonthlySheetsBySpecs_ | archiveRawSourceSheet_, activateVisibleSheetBeforeHiding_ | Yes |
| `archiveRawSourceSheet_` | 4461 | Internal helper | copySheetToArchiveAndDeleteLocal_, processSingleSubReport_ | openArchiveSpreadsheetOnce_, getUniqueArchiveSheetName_, markFrameworkStep_ | Yes |
| `applyDelimitedProperty_` | 4482 | Internal helper | applyDashboardRowFormattingSpec_, applyTitleRows_ | applySingleCellProperty_ | No |
| `applySingleCellProperty_` | 4505 | Internal helper | applyDelimitedProperty_ | getWrapStrategyEnum_ | Yes |
| `getWrapStrategyEnum_` | 4527 | Internal helper | applyGeneralSheetDefaults_, applyOperationalFormatting_, applySingleCellProperty_, createOrRefreshBaseTemplate_ | — | No |
| `getBorderStyleEnum_` | 4535 | Internal helper | applyGeneralSheetDefaults_, createOrRefreshBaseTemplate_ | — | No |
| `createOrRefreshBaseTemplate_` | 4553 | Internal helper | createAllReportTemplates, createSystemSheetTemplates | createGovernedSheet_, loadDashboardConfig_, hasDashboardFormattingValue_, resizeSheetGrid_, getWrapStrategyEnum_, requireDashboardFormattingValue_, getBorderStyleEnum_, trimCrea… | Yes |
| `createTemplateFromBase_` | 4633 | Internal helper | BuildDefaultFormatDashboard, buildGeneralTemplate_ | createGovernedSheet_ | No |
| `buildGeneralTemplate_` | 4647 | Internal helper | BuildDefaultFormatDashboard, buildDashboardQualityTemplate_, buildFrameworkTimingTemplate_, buildIndexTemplate_, buildOperationalReportTemplate_, b… | markFrameworkStep_, createTemplateFromBase_, positionSheetBySectionFRank_, resizeSheetGrid_, applyGeneralSheetDefaults_, validateDashboardFormattingConfig_, applyNativeBandingSa… | Yes |
| `applyGeneralSheetDefaults_` | 4710 | Internal helper | buildGeneralTemplate_ | requireDashboardFormattingValue_, getWrapStrategyEnum_, getBorderStyleEnum_ | Yes |
| `requireDashboardFormattingValue_` | 4745 | Internal helper | applyColumnWidthsEngine_, applyDashboardRowFormattingSpec_, applyGeneralSheetDefaults_, applyOperationalFormatting_, applyTitleRows_, buildIndexTem… | — | No |
| `hasDashboardFormattingValue_` | 4752 | Internal helper | createOrRefreshBaseTemplate_ | — | No |
| `validateDashboardFormattingConfig_` | 4756 | Diagnostic/validation | buildGeneralTemplate_ | requireDashboardFormattingValue_ | No |
| `getDashboardSectionRowSpecs_` | 4782 | Internal helper | applyExistingSectionFormatting_, applySubheaderBlocks_, applyTitleRows_ | — | No |
| `applyExistingSectionFormatting_` | 4802 | Internal helper | buildGeneralTemplate_, buildOperationalReportTemplate_ | getDashboardSectionRowSpecs_, getDashboardRowFormattingSpec_, applyDashboardRowFormattingSpec_ | No |
| `getDashboardRowFormattingSpec_` | 4838 | Internal helper | applyExistingSectionFormatting_, applySubheaderBlocks_ | — | No |
| `applyDashboardRowFormattingSpec_` | 4846 | Internal helper | applyExistingSectionFormatting_, applyTitleRows_ | requireDashboardFormattingValue_, applyDelimitedProperty_ | Yes |
| `applyTitleRows_` | 4857 | Internal helper | buildGeneralTemplate_ | getDashboardSectionRowSpecs_, applyDelimitedProperty_, requireDashboardFormattingValue_, applyDashboardRowFormattingSpec_ | Yes |
| `applySubheaderBlocks_` | 4884 | Internal helper | buildGeneralTemplate_ | getDashboardSectionRowSpecs_, getDashboardRowFormattingSpec_ | Yes |
| `applyColumnWidthsEngine_` | 4938 | Internal helper | buildGeneralTemplate_ | loadDashboardConfig_, requireDashboardFormattingValue_ | Yes |
| `applyOperationalFormatting_` | 4973 | Internal helper | buildOperationalReportTemplate_, buildTemplateArchiveRefinedData | loadDashboardConfig_, getStandardSheetKey_, resizeSheetGrid_, requireDashboardFormattingValue_, getWrapStrategyEnum_, trimCreatedSheetToSize_ | Yes |
| `writeTemplateMetadata_` | 5043 | Internal helper | buildGeneralTemplate_ | — | Yes |
| `createSystemTemplates` | 5050 | Workflow/public helper | createSystemSheetTemplates | buildFrameworkTimingTemplate_, buildDashboardQualityTemplate_, buildIndexTemplate_ | No |
| `buildFrameworkTimingTemplate_` | 5056 | Internal helper | createSystemTemplates, ensureFrameworkTimingReport_ | getTemplateConfigFromDashboard_, buildGeneralTemplate_ | No |
| `buildDashboardQualityTemplate_` | 5062 | Diagnostic/validation | createSystemTemplates | getTemplateConfigFromDashboard_, buildGeneralTemplate_ | No |
| `buildIndexTemplate_` | 5068 | Internal helper | createSystemTemplates | getTemplateConfigFromDashboard_, buildGeneralTemplate_, requireDashboardFormattingValue_, applyIndexGroupDividerRules_ | Yes |
| `createAllReportTemplates` | 5085 | Workflow/public helper | createOrRefreshAllReportTemplates, quickBuildAllTemplates | loadDashboardConfig_, createOrRefreshBaseTemplate_, buildTemplateBannerReport, buildTemplateCarePlanDue, buildTemplateUnlockedCarePlan, buildTemplateRawData, buildTemplateRefine… | No |
| `buildOperationalReportTemplate_` | 5107 | Internal helper | buildTemplateBannerReport, buildTemplateCarePlanDue, buildTemplateDisenrolledExclusion, buildTemplateMasterList, buildTemplateMonthlyChange, buildT… | getTemplateConfigFromDashboard_, buildGeneralTemplate_, applyOperationalFormatting_, applyExistingSectionFormatting_, applyOperationalTemplateSort_ | No |
| `applyOperationalTemplateSort_` | 5121 | Internal helper | buildOperationalReportTemplate_, buildTemplateArchiveRefinedData | — | No |
| `buildTemplateArchiveRefinedData` | 5133 | Workflow/public helper | createAllReportTemplates | getTemplateConfigFromDashboard_, getHeadersForSheetType_, buildGeneralTemplate_, applyOperationalFormatting_, applyOperationalTemplateSort_ | No |
| `buildTemplateBannerReport` | 5148 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateCarePlanDue` | 5149 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateUnlockedCarePlan` | 5150 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateRawData` | 5151 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateRefinedData` | 5152 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateDisenrolledExclusion` | 5153 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateMasterList` | 5154 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `buildTemplateMonthlyChange` | 5155 | Workflow/public helper | createAllReportTemplates | buildOperationalReportTemplate_ | No |
| `updateIndexSheet` | 5166 | Workflow/public helper | configureArchiveSpreadsheetId, configureIndexRestoreWebAppUrl | populateIndexData, populateActiveIndex, syncArchiveIndexToActiveIndex_ | No |
| `populateActiveIndex` | 5178 | Workflow/public helper | archiveMonthlyActiveSheets, archiveMonthlyImportSheets, checkSheetDeletionAndUpdateIndex_, createGovernedSheet_, createIndexSheet, finalizeSharedMo… | populateIndexData | No |
| `populateIndexData` | 5182 | Workflow/public helper | populateActiveIndex, updateIndexSheet | loadDashboardConfig_, matchSheetToSectionFRule_, extractFirstDateFromSheetName_, getUnformattedSheetSortKey_, resizeSheetGrid_ | Yes |
| `applyIndexGroupDividerRules_` | 5359 | Internal helper | buildIndexTemplate_, createIndexSheet | getTemplateTheme_ | Yes |
| `syncArchiveIndexToActiveIndex_` | 5401 | Trigger/web entry | onOpen, runManualArchiveSync, setupArchiveSyncTrigger, updateIndexSheet | logBestEffortWarning_, resizeSheetGrid_ | Yes |
| `refreshIndexAfterSheetWorkflow_` | 5525 | Internal helper | — | populateActiveIndex, logBestEffortWarning_ | No |
| `checkSheetDeletionAndUpdateIndex_` | 5529 | Internal helper | onOpen | populateActiveIndex | Yes |
| `runManualArchiveSync` | 5550 | Manual/admin or uncertain | — | syncArchiveIndexToActiveIndex_ | No |
| `buildRestoreButtonIcon` | 5563 | Manual/admin or uncertain | — | — | Yes |
| `restoreSheetFromActiveIndexRow` | 5594 | Menu/admin entry | — | restoreSheetFromArchiveWorkbook | Yes |
| `restoreSheetFromArchiveWorkbook` | 5659 | Workflow/public helper | doGet, restoreSheetFromActiveIndexRow | openArchiveSpreadsheetOnce_, loadDashboardConfig_, getGovernedSheetTypeForName_, createGovernedSheet_, populateActiveIndex | Yes |
| `escapeHtml_` | 5691 | Internal helper | doGet | — | No |
| `doGet` | 5700 | Trigger/web entry | — | restoreSheetFromArchiveWorkbook, escapeHtml_ | No |
| `configureIndexRestoreWebAppUrl` | 5715 | Menu/admin entry | — | updateIndexSheet | Yes |
| `configureArchiveSpreadsheetId` | 5734 | Menu/admin entry | — | updateIndexSheet | Yes |
| `configureArchiveWebAppUrl` | 5760 | Manual/admin or uncertain | — | — | Yes |
| `runDashboardQualityConfigVerificationSections_` | 5783 | Diagnostic/validation | runDashboardQualityStartUp, runFormatDashboardUpdates | — | No |
| `writeDashboardQualitySection_` | 5812 | Diagnostic/validation | runDashboardQualityProcessValidationSections_, runDashboardQualityStartUp, runDashboardQualityValidateTemplates, runFormatDashboardUpdates, runTemp… | ensureDashboardQualityReport_, appendDataToSubheaderSection_, getSubheaderSectionHeaders_ | Yes |
| `ensureDashboardQualityReport_` | 5835 | Diagnostic/validation | writeDashboardQualitySection_ | buildFormatDashboardTemplate_, getTemplateConfigFromDashboard_, buildGeneralTemplate_, createActiveSheetFromTemplate_ | No |
| `runDashboardQualityStartUp` | 5852 | Diagnostic/validation | quickSystemSetup | runDashboardQualityConfigVerificationSections_, writeDashboardQualitySection_, markFrameworkStep_, runFrameworkTimed_ | No |
| `runDashboardQualityValidateTemplates` | 5861 | Diagnostic/validation | quickBuildAllTemplates | writeDashboardQualitySection_, runTemplateDateFormatValidation_, markFrameworkStep_, runFrameworkTimed_ | No |
| `runTemplateDateFormatValidation_` | 5899 | Menu/admin entry | runDashboardQualityValidateTemplates | loadDashboardConfig_, writeDashboardQualitySection_ | Yes |
| `runDashboardQualityWorkflow` | 5981 | Menu/admin entry | runFullQualityCheck | runDashboardQualityProcessValidationSections_, markFrameworkStep_, runFrameworkTimed_ | No |
| `getExpectedNumberFormat_` | 5992 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `getGoogleSheetsNumberFormat_` | 5999 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `numberFormatsMatch_` | 6012 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `getExpectedNumberFormat_` | 6023 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `getGoogleSheetsNumberFormat_` | 6030 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `numberFormatsMatch_` | 6043 | Internal helper | runDashboardQualityProcessValidationSections_ | — | No |
| `runDashboardQualityProcessValidationSections_` | 6054 | Diagnostic/validation | runDashboardQualityWorkflow | loadDashboardConfig_, getHeadersForSheetType_, getLatestSheetByPrefix_, getExpectedNumberFormat_, getGoogleSheetsNumberFormat_, numberFormatsMatch_, writeDashboardQualitySection_ | No |
| `runFrameworkSmokeValidation` | 6211 | Menu/admin entry | runFullQualityCheck | notify_ | No |
| `runFullQualityCheck` | 6229 | Diagnostic/validation | — | runFrameworkSmokeValidation, runDashboardQualityWorkflow, notify_ | No |
| `runFormatDashboardUpdates` | 6237 | Manual/admin or uncertain | — | runDashboardQualityConfigVerificationSections_, writeDashboardQualitySection_, notify_ | No |
| `getFormatDashboardDefaultSection_` | 6940 | Internal helper | BuildDefaultFormatDashboard, getFallbackDashboardConfig_, getSubheadersFromDashboardConfig_ | — | No |
| `buildFormatDashboardTemplate_` | 6953 | Internal helper | createSystemSheetTemplates, ensureDashboardQualityReport_, menuBuildDashboardTemplate | BuildDefaultFormatDashboard | No |
| `BuildDefaultFormatDashboard` | 6962 | Workflow/public helper | buildFormatDashboardTemplate_ | getFallbackDashboardConfig_, getFormatDashboardDefaultSection_, isValidHex_, calculateThemeLevels_, createTemplateFromBase_, resizeSheetGrid_, getTemplateConfigFromDashboard_, b… | Yes |
| `saveActiveLayoutAsRebuildDefault` | 7080 | Workflow/public helper | saveActiveLayoutToDashboardSettings | notify_ | Yes |
| `restoreFormatDashboardFromDefault` | 7101 | Manual/admin or uncertain | — | resizeSheetGrid_, recalculateDashboardHexCodes_, notify_ | Yes |
| `getFallbackDashboardConfig_` | 7158 | Internal helper | BuildDefaultFormatDashboard, createGovernedSheet_, loadDashboardConfig_ | getFormatDashboardDefaultSection_ | No |
| `loadDashboardConfig_` | 7306 | Internal helper | applyColumnWidthsEngine_, applyOperationalFormatting_, buildMonthlyChangeReportForMonth_, configReportTitleCheck_, createAllReportTemplates, create… | getFallbackDashboardConfig_, buildDashboardSectionIndex_ | No |
| `buildDashboardSectionIndex_` | 7537 | Internal helper | loadDashboardConfig_ | — | No |
| `getHeadersForSheetType_` | 7553 | Internal helper | buildMonthlyChangeReportForMonth_, buildTemplateArchiveRefinedData, createDisenrolledListForMonth_, createMasterListForMonth_, getSubheadersFromDas… | — | No |
| `getTemplateConfigFromDashboard_` | 7570 | Internal helper | BuildDefaultFormatDashboard, buildDashboardQualityTemplate_, buildFrameworkTimingTemplate_, buildIndexTemplate_, buildOperationalReportTemplate_, b… | loadDashboardConfig_, calculateThemeLevels_, getTemplateTheme_, getHeadersForSheetType_, getDashboardRowFormattingSpecs_, getSubheadersFromDashboardConfig_ | No |
| `getDashboardRowFormattingSpecs_` | 7628 | Internal helper | getTemplateConfigFromDashboard_ | — | No |
| `getSubheadersFromDashboardConfig_` | 7641 | Internal helper | buildMonthlyChangeReportForMonth_, clearDiagnosticsAndTimingLogs, getTemplateConfigFromDashboard_ | getFormatDashboardDefaultSection_, loadDashboardConfig_, getHeadersForSheetType_ | No |
| `getStandardSheetKey_` | 7695 | Internal helper | applyOperationalFormatting_ | — | No |
| `normalizeDashboardTargetA1_` | 7705 | Internal helper | — | — | No |
| `configReportTitleCheck_` | 7711 | Diagnostic/validation | — | loadDashboardConfig_ | No |
| `onEdit` | 7727 | Trigger/web entry | — | recalculateDashboardHexCodes_, handleFormatDashboardValueHighlighting_ | No |
| `handleFormatDashboardValueHighlighting_` | 7740 | Internal helper | onEdit | — | Yes |
| `isValidHex_` | 7764 | Internal helper | BuildDefaultFormatDashboard, getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `hexToHsl_` | 7766 | Internal helper | calculateThemeLevels_ | — | No |
| `hslToHex_` | 7783 | Internal helper | calculateThemeLevels_ | — | No |
| `calculateThemeLevels_` | 7794 | Internal helper | BuildDefaultFormatDashboard, getTemplateConfigFromDashboard_, getTemplateTheme_, recalculateDashboardHexCodes_ | hexToHsl_, hslToHex_ | No |
| `getHslPercentsFromDashboard_` | 7811 | Internal helper | getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `getDashboardStructuralSectionBounds_` | 7832 | Internal helper | getTemplateTheme_, recalculateDashboardHexCodes_ | — | No |
| `getTemplateTheme_` | 7858 | Internal helper | applyIndexGroupDividerRules_, getTemplateConfigFromDashboard_ | getHslPercentsFromDashboard_, getDashboardStructuralSectionBounds_, isValidHex_, calculateThemeLevels_ | No |
| `recalculateDashboardHexCodes_` | 7883 | Internal helper | BuildDefaultFormatDashboard, onEdit, restoreFormatDashboardFromDefault | getHslPercentsFromDashboard_, getDashboardStructuralSectionBounds_, isValidHex_, calculateThemeLevels_ | Yes |

## Appendix B — Supplied Module 4 v2.1.11 Delta

| Function / edge | Classification | Direct callers | Direct dependencies | Write | Review result |
|---|---|---|---|:---:|---|
| `ensureRestoreButtonOnIndex_` | Internal best-effort UI helper | `populateIndexData` | `UrlFetchApp.fetch`; `sheet.getImages`; `sheet.insertImage`; `OverGridImage.getScript`; `OverGridImage.assignScript` | Yes | **Correction required:** supplied code uses invalid `getAssignScript()` instead of `getScript()` |
| `populateIndexData` → `ensureRestoreButtonOnIndex_` | New direct edge | All `populateActiveIndex` and `updateIndexSheet` paths | Restore-button inspection before Index matrix construction | Indirect | Move/guard the optional image operation so failure cannot prevent Index data refresh |

### Delta disposition

The Module 4 update does **not** resolve any of ML1974-001 through ML1974-007. It adds one new High finding, ML1974-008, and changes the aggregate counts to **1 Critical / 3 High / 3 Medium / 1 Low**. With `getScript()` substituted and image handling made non-blocking, the automatic restore-button feature is otherwise compatible with the existing Index architecture. The second escaped/Markdown-rendered copy in the supplied prompt is not executable source and was not treated as a separate module.
