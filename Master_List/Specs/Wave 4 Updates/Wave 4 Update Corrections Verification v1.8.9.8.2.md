# Wave 4 Update Corrections Verification — v1.8.9.8.2

## Review scope

| Item | Governing review input |
|---|---|
| Corrections source | **Master_List/Specs/Wave 4 Updates/Wave 4 Update Corrections.md** |
| Implementation source of truth | **Master_List/Current Production Script/v1.8.9.8.2_Current_Script** |
| Report pattern | **Master_List/Specs/Wave 4 Updates/Wave 4 Updates Required.md** |
| Review method | Exhaustive static comparison of each distinct correction directive against declarations, active references, workflow routing, menu callbacks, and relevant grid/API operations in the production script. |
| Review limitation | Static source review verifies that code exists and routes as described. Google Apps Script compilation, workbook execution, visual parity, archive behavior, and timing gains require runtime evidence and are not marked verified by source inspection alone. |

## Status definitions

| Status | Meaning |
|---|---|
| **Addressed** | The requested implementation and active routing are present in v1.8.9.8.2. |
| **Partially addressed** | The principal behavior exists, but one or more requested cleanup, uniformity, or performance details remain. |
| **Not addressed** | The requested behavior is absent or contradicted by an active implementation. |
| **Runtime verification required** | The source implementation is present, but the stated outcome cannot be proven without workbook execution or telemetry. |

## Executive result

v1.8.9.8.2 addresses the central Wave 4 corrections: the canonical template build, hidden-template policy with manual visibility controls, unified monthly sub-report template-copy/archive route, unified Refined Data transformation, Set-based disenrollment handling, Monthly Change prefilter/hash shortcuts, pooled archive access in monthly batch drivers, dynamic Index generation, and removal of the named legacy formatter and styling functions.

The production script does **not** fully satisfy the corrections document's strictest claims. Remaining gaps are concentrated in four areas:

1. template cleanup is incomplete because legacy row-count and final format-enforcement helpers remain active;
2. legacy Demo P processing functions remain active compatibility/processing paths rather than one-line aliases;
3. the five-row sub-header helpers exist but are not connected to production report builders;
4. the absolute Zero-Repaint and one-write system-surface rules are not fully met because active formatting, column-width, row-insertion, and multi-write routines remain.

Accordingly, the corrections document's final statement that every module is fully verified is **not supported** by v1.8.9.8.2 source inspection.

## A. Base template and template-build corrections

| ID | Correction/update | v1.8.9.8.2 evidence | Status | Required follow-up |
|---|---|---|---|---|
| BT-01 | Use one canonical public template workflow, `buildAllTemplatesAndValidate`. | The function exists, is registered as a startup/public callback, loads dashboard configuration once, prepares the golden master, loops over configured sheet definitions, and then runs template validation. Superseded `rebuildAllTemplates` and `createOrRefreshAllReportTemplates` declarations are absent. | **Addressed** | Runtime-test the menu callback and validation handoff. |
| BT-02 | Build `RFF_BASE_TEMPLATE` and all archetype templates to a 100-row baseline. | The canonical loop overrides each definition with a 100-row fixed baseline. `ensureGoldenMasterTemplate_` prepares the base canvas separately. | **Addressed** | Confirm actual workbook template capacities after a clean rebuild. |
| BT-03 | Continue processing after an individual template failure. | Each definition build is wrapped in a per-template `try`/`catch`; failures are recorded and logged while iteration continues. | **Addressed** | Confirm the final validation report clearly surfaces failed templates. |
| BT-04 | Keep report templates and the golden master hidden after automated builds. | Deferred hiding is enabled during the loop, followed by `setReportTemplateVisibility_(..., true, ...)` and `forceBaseTemplateHidden_()`. | **Addressed** | Runtime-check that at least one non-template sheet remains visible. |
| BT-05 | Retain `showReportTemplates`, `hideReportTemplates`, and `setReportTemplateVisibility_` for administration. | All three functions exist; public callbacks are timed when called independently and route to the shared visibility helper. | **Addressed** | Confirm both menu items resolve in the live workbook. |
| BT-06 | Keep every template column visible; do not apply output column-hiding rules during template builds. | The canonical build explicitly calls `showColumns(1, template.getMaxColumns())`. No `applyColumnHidingFromDashboard_` call appears in the template creation functions reviewed. | **Addressed** | Validate every generated archetype, including orphan templates. |
| BT-07 | Keep template grids flat; remove merge/break-apart work from `applyTitleRows_`; defer `C1:D1` merge to output creation. | `applyTitleRows_` contains no merge or break-apart call and clears `C1:D1` as ordinary cells. The unified output routine applies the `C1:D1` merge only when Care Plan metadata exists. | **Addressed** | Visually verify native banding on all template types. |
| BT-08 | Apply governed date/number formatting once and remove duplicate final enforcement. | `applyGovernedTextAndNumberFormats_` exists, but `enforceTemplateDateAndNumberFormats_` remains declared and referenced by an active template path. | **Partially addressed** | Trace the two calls at runtime and remove one only after proving format parity and caller safety. |
| BT-09 | Remove signature-cache and metadata-only refresh architecture. | `refreshTemplateMetadataOnly_`, `buildTemplateFormatSignature_`, and `RFF_USE_TEMPLATE_SIGNATURE_CACHE` are absent. | **Addressed** | None. |
| BT-10 | Retire dynamic/FIXED row-buffer calculations in favor of the canonical 100-row baseline. | The canonical build forces 100 rows, but `resolveTemplateRowCount_` remains declared and is still referenced by other template paths. | **Partially addressed** | Consolidate all active template entry paths on the baseline policy or explicitly document the exceptions. |
| BT-11 | Remove redundant full-data typography repaints and rely on golden-master inheritance. | The golden master establishes global font, size, color, alignment, wrap, and plain-text format. However, `updateBaseTemplateCanvas_` still applies full data-range font, size, alignment, borders, and per-column formats. | **Partially addressed** | Determine whether the base-sync workflow is an approved maintenance exception; otherwise remove inherited repaint work. |

## B. Format Monthly Sheets corrections

| ID | Correction/update | v1.8.9.8.2 evidence | Status | Required follow-up |
|---|---|---|---|---|
| FM-01 | Route Banners, Care Plan Due, Unlocked CP, and Raw Data through one `formatMonthlySubReportViaTemplate_` engine. | `executeSingleFormatterWorkflow_` resolves all four route codes and calls the same unified function. The four public menu callbacks are thin route-code wrappers. | **Addressed** | Runtime-test B, CD, UC, and RD independently and in a monthly batch. |
| FM-02 | Adopt Option A for Raw Data: duplicate **Template - Raw Data**, not in-place formatting. | Raw Data uses the common template context and `createOutputSheetFromDashboardTemplate_`. `formatRawDataInPlaceSheet_` is absent. | **Addressed** | Verify the generated Raw Data output against Section H headers. |
| FM-03 | Resolve sources consistently by route and prompted month, with active-sheet fallback. | The standalone workflow uses `findMonthlyImportSheetForRoute_` and falls back to the active sheet when no routed candidate is returned. | **Addressed** | Add runtime cases for ambiguous names and wrong-month active sheets. |
| FM-04 | Treat source sheets as read-only before archive. | `getUntouchedSourceDataForTemplate_` reads source values and the unified formatter performs mapping/output work without inserting, styling, or rewriting the source. | **Addressed** | Compare a source sheet checksum before and after output generation, before archival. |
| FM-05 | Map all routes in memory to governed target headers. | All routes use `mapRowsToHeaders_` before the common output call. `copyRawBannerDataToOutput_` is absent. | **Addressed** | Test missing, duplicate, and reordered source headers. |
| FM-06 | Preserve PMR, phone, ZIP, and other text-sensitive values through template plain-text inheritance. | The unified route writes to duplicated governed templates; the golden master establishes `@` as the baseline. | **Runtime verification required** | Test leading-zero values and mixed numeric/text source cells in Google Sheets. |
| FM-07 | Write Care Plan metadata once to merged `C1:D1` on the output, not the source. | The unified formatter collects title metadata before archive and performs one conditional output merge/write. | **Addressed** | Verify both CP report types and blank metadata behavior. |
| FM-08 | Archive the pristine source externally, use a pooled archive handle, then remove the local source. | The common route calls `archiveRawSourceAndDeleteLocal_` with options; standalone routes open the archive once and batch drivers pass a shared `archiveSs`. | **Addressed** | Runtime-test copy verification, collision replacement, rollback behavior, and local deletion safety. |
| FM-09 | Remove legacy branch formatters and copy helpers. | `formatRawDataInPlaceSheet_`, `formatBannerSubReportViaTemplate_`, `formatCarePlanSubReportViaTemplate_`, `formatMonthlyDashboardSheetFromSource_`, and `copyRawBannerDataToOutput_` are absent. | **Addressed** | Complete an external/dynamic callback scan before treating deletion as permanently safe. |
| FM-10 | Restrict output polish to row height, governed hidden columns, visibility, and CP metadata merge. | The unified formatter performs those operations. `createOutputSheetFromDashboardTemplate_` also sets title/date cells and may expand row capacity, which is necessary output construction rather than source mutation. | **Addressed** | Confirm filters and any required Row 4 behavior in live outputs; the common function does not explicitly create a filter. |

## C. Refined Data / Demo P corrections

| ID | Correction/update | v1.8.9.8.2 evidence | Status | Required follow-up |
|---|---|---|---|---|
| RD-01 | Make Refined Data the canonical internal engine while retaining approved public Demo P compatibility names. | Canonical public Refined Data entry points exist, and `buildDemoPFromScratch`/`updateDemoPMonthlySync` are one-line compatibility aliases. | **Addressed** | Confirm all external consumers use only preserved public names. |
| RD-02 | Use separate source gathering for scratch and monthly update, but one shared transformation engine. | Scratch and monthly paths gather data differently and both reach `processRefinedDataUnified_` through active build helpers. | **Addressed** | Runtime-compare transformed output for identical input rows. |
| RD-03 | Flatten contacts first, then transform fields, then stamp metadata. | `processRefinedDataUnified_` calls safe flattening, participant transformations, update metadata, and universal metadata in that order. | **Addressed** | Test zero, one, eight, and more-than-eight contacts per PMR. |
| RD-04 | Collapse contact rows to one participant row per PMR and populate Contact 1–8 plus summary in memory. | `flattenDemoPContactRowsInMemory_` groups by normalized PMR, chooses a primary/first row, fills available contact targets, creates a summary, and sorts the flat rows. | **Addressed** | Confirm handling of blank PMRs and duplicate primary flags. |
| RD-05 | Provide a fail-safe parser fallback. | `safeFlattenAndProcessContacts_` catches a whole flattening failure and returns the existing row count. It does not implement the correction's requested per-PMR fallback and cannot guarantee one row per PMR after a global failure. | **Partially addressed** | Add per-PMR isolation or fail closed before writing duplicate participant rows. |
| RD-06 | Preallocate fixed-width arrays and avoid dynamic growth in transformation loops. | Target mapping creates fixed-width rows, but contact summaries and several transformation buffers still use `push`. The broad absolute requirement is not fully demonstrated. | **Partially addressed** | Profile the active transformation path and limit preallocation requirements to measured hotspots. |
| RD-07 | Use one bulk output write and template-inherited presentation; remove per-cell repaint behavior. | Shared processed rows reach bulk writes, and named legacy alternating-color helpers are absent. Other active formatting and format-extension operations remain in related output paths. | **Partially addressed** | Confirm the exact scratch and delta write counts with execution telemetry. |
| RD-08 | Preserve targeted monthly delta archive/merge behavior and existing disenrollment stamps. | The monthly path computes changed PMRs, archives prior rows, processes replacements through the shared engine, and preserves governed data during merge. | **Addressed** | Regression-test unchanged, changed, newly enrolled, and newly disenrolled PMRs. |
| RD-09 | Remove legacy duplicate Demo P processing branches. | `processDemoPAsWorkingSource_` and `getOrCreateDemoPProcessingSheet_` remain declared and referenced by the active `processDemoP` path. | **Not addressed** | Decide whether `processDemoP` is a protected public compatibility workflow; if so, route it to the canonical engine before deleting internal legacy helpers. |
| RD-10 | Preserve workflow ordering through Refined Data, Disenrolled Exclusion, Monthly Change, and Master List. | Monthly batch drivers call the governed child workflows in dependency order and defer Index refresh until completion. | **Addressed** | Confirm order and fail-fast behavior from timing logs. |

## D. Disenrolled Exclusion corrections

| ID | Correction/update | v1.8.9.8.2 evidence | Status | Required follow-up |
|---|---|---|---|---|
| DE-01 | Use pre-flattened Refined Data as the source; remove Raw Data re-flattening paths. | The public aliases route to `buildDisenrolledExclusionFromRefinedData`; named Raw Data/multi-pass legacy builders are absent. | **Addressed** | Confirm no external consumer expects a removed Raw Data entry point. |
| DE-02 | Identify disenrolled PMRs in memory. | The engine reads the Refined Data body once and builds Sets for disenrolled and active re-enrolled PMRs. | **Addressed** | Test date-only, status-only, date-of-death, and contradictory status/date rows. |
| DE-03 | Purge re-enrolled participants with O(1) membership checks. | Existing exclusion rows are compared against `activeReEnrolledPMRs`, and deletions are batched. | **Addressed** | Verify duplicate historical records for the same PMR. |
| DE-04 | Stamp first-seen disenrollment information without overwriting established history. | New append payloads receive the governed added label; existing historical rows are retained unless re-enrollment removes them. | **Partially addressed** | The corrections describe a report-date stamp, while production writes a text label (`Demo P MM.DD.YY`); confirm this is the approved data contract. |
| DE-05 | Hide records older than 365 days using batched run-length calls. | Batched row-hiding helpers exist and issue grouped `hideRows` calls. | **Addressed** | Runtime-test boundary dates, blanks, and previously hidden rows. |
| DE-06 | Handle missing/empty source safely. | Public workflow and child helpers contain source guards, but full behavior depends on workbook state and prompts. | **Runtime verification required** | Test missing Refined Data, no disenrollments, and an empty existing exclusion sheet. |
| DE-07 | Use bulk append/write behavior without legacy multi-pass processing. | New rows are assembled in RAM and written with one `setValues` call; named legacy multi-pass functions are absent. A format-copy operation still runs after insertion. | **Partially addressed** | Remove the format brush only if template/native banding reliably extends after inserted rows. |

## E. Monthly Change corrections

| ID | Correction/update | v1.8.9.8.2 evidence | Status | Required follow-up |
|---|---|---|---|---|
| MC-01 | Pre-filter known disenrolled PMRs before continuing-record comparisons. | The engine builds `disenrolledPmrSet` and exits the comparison callback before primitive hash/deep comparisons. | **Addressed** | Verify routing semantics for PMRs newly disenrolled in the target month. |
| MC-02 | Skip deep field comparison when primitive participant hashes are equal. | Current and previous PMR signatures are built before field comparison; equal signatures bypass further work. | **Addressed** | Benchmark hash construction versus saved field comparisons on production-sized data. |
| MC-03 | Normalize comparable values to stable primitives outside expensive grid operations. | `normalizeCompareValue_` and primitive hash helpers operate on in-memory arrays. | **Addressed** | Add tests for dates, booleans, numbers, blanks, and locale-sensitive strings. |
| MC-04 | Preserve deterministic section routing and `Columns With Change`. | The production engine defines governed sections and populates the audit column for changed fields. | **Addressed** | Regression-test precedence where multiple category fields change. |
| MC-05 | Assemble and write section blocks in memory with the standardized five-row block. | Monthly Change has in-memory section assembly, but the new generic `applySubHeaderBlock_` and `replaceSectionDataInTemplate_` helpers have no callers. Existing report-specific writers remain. | **Partially addressed** | Route Monthly Change to the approved five-row helper or document why its report-specific implementation is equivalent. |
| MC-06 | Remove `buildRowsSignatureForCompare_` and regex-heavy inner comparison loops. | The named legacy function is absent and primitive hash skipping is active. | **Addressed** | Use timing evidence to verify the intended performance gain. |

## F. Master List corrections

| ID | Correction/update | v1.8.9.8.2 evidence | Status | Required follow-up |
|---|---|---|---|---|
| ML-01 | Use pre-flattened Refined Data as the primary driver. | Master List production functions consume Demo P/Refined Data rows as the base participant dataset. | **Addressed** | Verify one output row per active participant. |
| ML-02 | Copy Banner Summary directly from Refined Data; do not build an independent Banners lookup map. | `Banner Summary` is included in Refined Data mapping and `buildBannerLookupMap_` is absent. | **Addressed** | Confirm Banner Summary parity with the prior output. |
| ML-03 | Join Care Plan Due and Unlocked CP by normalized PMR maps in memory. | The Master List path builds auxiliary source mappings and mutates mapped rows in RAM before output. | **Addressed** | Test missing and duplicate PMRs in both auxiliary reports. |
| ML-04 | Flush the Master List body in one bulk write and sort alphabetically. | The active output path uses bulk body writes and calls alphabetical participant sorting. | **Addressed** | Measure write count and verify Last Name/First Name ordering. |
| ML-05 | Use one canonical public route and purge dangling wrappers. | Public routing is consolidated for current menus, and the independent Banner-map helper is removed. Some broad legacy helper inventory remains elsewhere in the script. | **Partially addressed** | Complete callback/dynamic-reference review before any further deletion. |

## G. Index, menu, and orchestration corrections

| ID | Correction/update | v1.8.9.8.2 evidence | Status | Required follow-up |
|---|---|---|---|---|
| IX-01 | Build Index from live workbook discovery and in-memory metadata. | `updateIndexSheet` scans current sheets and assembles the Index rather than relying on a fixed tab list. | **Addressed** | Test hidden, template, archive, and unknown sheet categories. |
| IX-02 | Generate live `#gid=` links. | The Index builder constructs sheet links from discovered sheet IDs. | **Addressed** | Click-test links in the live workbook and exported formats. |
| IX-03 | Force Index to workbook position 1. | `ss.moveActiveSheet(1)` is executed after activating the Index. | **Addressed** | Confirm the operation is not blocked by protected sheets. |
| IX-04 | Keep Index category dividers compact rather than applying the five-row report block. | Index-specific compact category/header construction remains separate from the generic multi-section helper. | **Addressed** | Visually compare with Section F governance. |
| MU-01 | Preserve public menu callback names while routing to canonical engines. | Public compatibility aliases and direct menu callbacks are present for template, formatter, Refined Data, Disenrolled, and core workflows. | **Addressed** | Execute a complete menu callback resolution smoke test. |
| MU-02 | Open the archive workbook once per monthly batch and pass the handle to child jobs. | Both `runMonthlyStart` and `runMonthlyUpdate` call `openArchiveSpreadsheetOnce_` once and pass `archiveSs` through child options. | **Addressed** | Runtime-count `openById` calls during both batches. |
| MU-03 | Defer Index refresh until all child processes complete. | Child options suppress intermediate refresh and each monthly driver performs the final Index update. | **Addressed** | Test failure behavior: Index should not imply successful completion after an earlier fatal error. |

## H. Five-row system-surface correction

| ID | Correction/update | v1.8.9.8.2 evidence | Status | Required follow-up |
|---|---|---|---|---|
| SH-01 | Implement Offset 0 blank buffer, Offset 1 title/last-updated bar, Offset 2 visual spacer, Offset 3 column headers, and Offset 4 blank insertion anchor. | `applySubHeaderBlock_` implements the requested offsets, heights, theme fills, and title text, but it is not connected to a production report builder. | **Partially addressed** | Connect the helper to governed report builders and visually verify output. |
| SH-02 | Insert/write section data from the blank anchor without inheriting header formatting. | `replaceSectionDataInTemplate_` locates a title and writes from `titleRow + 3`, but neither helper has an active caller. The anchor calculation also requires runtime confirmation against the requested offset model. | **Partially addressed** | Add integration tests for zero, one, and expanding section payloads before routing production reports. |
| SH-03 | Apply the five-row standard across Dashboard Quality, Framework Timing, Monthly Change, and Format Dashboard. | The generic helpers are unreferenced. Existing report-specific section engines remain active, so uniform adoption is not proven. | **Not addressed** | Integrate each listed surface or explicitly retire the generic helpers and document equivalent per-surface implementations. |

## I. Performance and legacy-purge corrections

| ID | Correction/update | v1.8.9.8.2 evidence | Status | Required follow-up |
|---|---|---|---|---|
| PF-01 | Remove `applyAlternatingColors_` and `reapplyDemoPColors_`. | Both declarations and references are absent. Some timing labels still say colors were reapplied even where no corresponding repaint call exists. | **Addressed** | Correct misleading timing labels so telemetry describes actual operations. |
| PF-02 | Remove `styleFrameworkTimingReport_`. | The named function and references are absent. | **Addressed** | Runtime-compare timing report visual parity. |
| PF-03 | Remove `buildRowsSignatureForCompare_` and `buildBannerLookupMap_`. | Both functions and references are absent. | **Addressed** | None beyond regression testing. |
| PF-04 | Enforce an absolute Zero-Repaint law: no runtime background/font/width work except CP merge, 25px row height, and Section G hiding. | Active output/system/template paths still contain background/font work, contiguous width application, format copying, and Index-specific width operations. | **Not addressed** | Narrow the rule to output hot paths and approved exceptions, or remove each remaining active operation after visual parity testing. |
| PF-05 | Pre-size output canvases and avoid repeated resizing. | Output creation calculates required capacity once and expands only when needed. Other system/report paths still insert/delete rows dynamically. | **Partially addressed** | Instrument grid mutations by workflow and remove repeated resizing only where measured. |
| PF-06 | Assemble Dashboard Quality in one master buffer and issue exactly one `setValues`. | Staged section buffers and combined replacement exist, but report construction still flushes sections and may perform anchored or fallback writes plus styling. | **Partially addressed** | Capture API-call telemetry and consolidate only if the one-write design preserves variable-section behavior. |
| PF-07 | Assemble Framework Timing in one eight-column master buffer and issue exactly one `setValues`. | Named legacy styling is removed and timing-buffer helpers exist, but static inspection shows multiple timing-report construction/write helpers; exact one-write behavior is not established. | **Partially addressed** | Record `setValues` count during a full timing report build. |
| PF-08 | Pool external archive connections. | Monthly batch and unified formatter paths accept and reuse `archiveSs`; safe standalone fallbacks remain. | **Addressed** | Runtime-count external opens across each public workflow. |
| PF-09 | Safely purge all named obsolete routines and dangling wrappers after direct/indirect reference review. | Most named obsolete routines are absent, but active legacy Demo P helpers and unused generic Wave 4.1 helpers remain. | **Partially addressed** | Complete the menu/trigger/dynamic/HTML/external API inventory before further deletion. |
| PF-10 | Demonstrate significant runtime gains and no functional regression. | Source changes cannot prove timing gains, workbook visual parity, archive safety, or business-rule equivalence. | **Runtime verification required** | Run the quality suite and compare monthly, template, Dashboard Quality, and Framework Timing telemetry with the v1.8.9.8.1 baseline. |

## Status summary

| Status | Count |
|---|---:|
| **Addressed** | 47 |
| **Partially addressed** | 16 |
| **Not addressed** | 3 |
| **Runtime verification required** | 3 |
| **Total distinct corrections reviewed** | **69** |

## Corrections still required for full closure

1. **Integrate or retire the five-row helpers.** They currently describe the approved architecture but do not govern Dashboard Quality, Framework Timing, Monthly Change, or Format Dashboard execution.
2. **Resolve the remaining template double-pass behavior.** Trace `applyGovernedTextAndNumberFormats_` and `enforceTemplateDateAndNumberFormats_`, then retain only the required governed pass.
3. **Resolve noncanonical Demo P processing.** Route `processDemoP` through the unified Refined Data engine before removing `processDemoPAsWorkingSource_` and `getOrCreateDemoPProcessingSheet_`, unless external compatibility requires their current behavior.
4. **Reconcile the Zero-Repaint statement with approved exceptions.** The absolute wording conflicts with active Index, system-surface, template-maintenance, and format-extension operations. Do not delete them solely to satisfy wording; first establish visual parity and performance evidence.
5. **Replace stale timing labels.** Messages stating alternating colors were reapplied should not remain when no repaint function executes.
6. **Confirm the Disenrolled first-seen data contract.** The corrections request a date stamp, while the implementation writes a `Demo P MM.DD.YY` text label.
7. **Complete runtime closure evidence.** Run compile/callback checks, template validation, all four formatter routes, scratch and monthly Refined Data, Disenrolled, Monthly Change, Master List, Index, Dashboard Quality, and Framework Timing against a privacy-safe workbook copy.

## Recommended runtime acceptance matrix

| Workflow | Minimum evidence required |
|---|---|
| Template build | All configured templates created/updated; 100-row baseline; flat grids; all columns visible when shown; templates hidden after build; validation results surfaced. |
| Monthly formatters | B, CD, UC, and RD each use the common output route; source remains unchanged until archive; archive copy verified before local deletion; leading zeros preserved. |
| Refined Data | One participant row per PMR; contact order and overflow behavior verified; scratch/monthly transformation parity; prior changed rows archived. |
| Disenrolled Exclusion | Re-enrollment purge, historical preservation, first-seen field, empty source, and 365-day hide boundary verified. |
| Monthly Change | Disenrolled prefilter, unchanged hash skip, deterministic category precedence, and `Columns With Change` verified. |
| Master List | Refined Data ownership, direct Banner Summary, PMR map joins, single participant output, and alphabetical ordering verified. |
| System surfaces | Five-row block visual parity or an approved equivalent; section expansion safety; write counts; no overwritten adjacent sections. |
| Performance | Compare v1.8.9.8.2 timing to the v1.8.9.8.1 baseline for Monthly Start, Monthly Update, template build, Dashboard Quality, and Framework Timing. |

## Closure determination

**Wave 4 correction implementation is materially advanced but not fully closed in v1.8.9.8.2.** The core business workflows requested by the corrections are present. Full closure should wait for the three source-level gaps to be resolved or formally accepted and for the runtime acceptance matrix to pass.
