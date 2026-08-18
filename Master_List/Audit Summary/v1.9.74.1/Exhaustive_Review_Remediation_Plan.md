# Master List v1.9.74.1 — Exhaustive Review Remediation Plan

**Date:** 2026-08-18
**Governing source:** `origin/main:Master_List/Current Production Script/v1.9.74.1`
**Review being remediated:** `Master_List/Audit Summary/v1.9.74.1/Exhaustive_Engineering_Code_Review.md`
**Prompt:** `prompts/Projects/Exhaustive_Review_Remediation`
**Change control:** Planning only. No production code, public API, function name, or architecture was changed.

## 1. Executive Remediation Summary

### Validation counts

| Measure | Count |
|---|---:|
| Prior v1.9.74 findings reviewed | 8 |
| Prior findings confirmed | 1 |
| Prior findings partially confirmed | 3 |
| Prior findings already corrected | 4 |
| Prior findings outdated | 0 |
| Prior findings not confirmed | 0 |
| Current v1.9.74.1 findings | 9 |
| Current Critical / High / Medium / Low | 0 / 4 / 3 / 2 |
| Current findings requiring runtime evidence before closure | 1 (`ML19741-007`, trigger behavior) |
| Current findings requiring user decisions | 2 cleanup/trigger decisions; neither blocks Wave 1 |

### Highest-priority risks

1. Missing exclusion PMR schema can clear durable historical exclusion rows.
2. A Refined Data range-width mismatch can fail after Disenrolled Exclusion is committed.
3. The two-sheet workflow has no recovery boundary.
4. The factory's intended safe swap still contains a delete-before-final-rename loss window.
5. The Index restore-button helper calls an unsupported Apps Script method.

### Recommended first wave

**Wave 1 — Disenrollment correctness and data safety.** Validate every participating schema/dimension before mutation, correct Refined Data write width, and add narrow two-sheet recovery using pre-read matrices.

### Recommended next production version

**v1.9.74.2** for the coordinated correctness patch. This is a minor correction release that preserves approved business logic and public menu/workflow names.

## 2. Validated Findings Register

| Finding ID | Original severity | Validated status | Current severity | Confidence | File | Function | Current evidence | Impact | Recommended action | Wave | Breaking risk | Required tests |
|---|---|---|---|---|---|---|---|---|---|---:|---|---|
| ML19741-001 / prior ML1974-008 | High | CONFIRMED | High | Confirmed | v1.9.74.1 | `ensureRestoreButtonOnIndex_` | Calls nonexistent `getAssignScript()` before Index matrix work | Repeat Index refresh failure/stale Index | Use `getScript`; isolate/log optional image work; consolidate manual helper | 2 | Low | Image/no-image/fetch/repeat/monthly finalization |
| ML19741-002 / prior ML1974-002 | High | PARTIALLY CONFIRMED | High | High | v1.9.74.1 | `createGovernedSheet_` | Temporary build added, but old sheet is deleted before final rename | Last valid output can be lost on rename failure | Backup-name → final-name → validate → delete-backup swap | 3 | Low-medium | Failure injection and max-length names |
| ML19741-003 / prior ML1974-003 | High | NEW DETAIL / CONFIRMED | High | Confirmed | v1.9.74.1 | `createDisenrolledListForMonth_` | `refinedWidth` may exceed row width passed to `setValues` | Second write fails after first sheet commit | Normalize rows or write governed width; validate before clear | 1 | Low | Width less/equal/greater; zero rows |
| ML19741-004 / prior ML1974-003 | High | NEW DETAIL / CONFIRMED | High | High | v1.9.74.1 | `createDisenrolledListForMonth_` | Exclusion PMR index `-1` leaves retained rows empty; body is cleared | Durable exclusion history can be erased | Require all PMR indexes and fail closed | 1 | None | Missing/renamed/duplicate PMR headers |
| ML19741-005 / prior ML1974-003 | High | PARTIALLY CONFIRMED | Medium | Confirmed | v1.9.74.1 | `createDisenrolledListForMonth_` | In-memory staging added; two persistent writes still lack recovery | Cross-sheet partial completion | Snapshot and restore first sheet if second write fails | 1 | Medium | Failure before/after each write and recovery |
| ML19741-006 / prior ML1974-006 | Medium | PARTIALLY CONFIRMED | Medium | Confirmed | v1.9.74.1 | `runFrameworkSmokeValidation` | Checks more symbols but executes no dependency/schema probes | Misleading PASS possible | Add side-effect-free dependency/schema checks | 6 | None | Bad API, missing header, valid state |
| ML19741-007 | Medium | REQUIRES RUNTIME EVIDENCE | Medium | High | v1.9.74.1 | `onOpen`, `syncArchiveIndexToActiveIndex_` | Simple open path calls cross-file `openById` | Automatic archive sync may not run on open | Remove cross-file call from simple trigger or approve installable open trigger | 3 | Low | Simple vs installed trigger logs |
| ML19741-008 | Low | CONFIRMED | Low | Confirmed | v1.9.74.1 | Two private legacy helpers | No-op, no static callers, private, replaced inline | Silent future misuse/maintenance confusion | Remove after final dynamic reference search | 5 | Low | Reference search + disenrollment regression |
| ML19741-009 | Low | REQUIRES USER DECISION | Low | Confirmed | v1.9.74.1 | `updateIndexSheet` | `archiveSs` parameter is unused | Interface ambiguity only | Remove parameter if no external usage, otherwise honor/document it | 5 | Low | Menu/direct/manual caller compatibility |

## 3. Findings Rejected or Closed

| Prior finding | Status | Current evidence and closure reason |
|---|---|---|
| ML1974-001 — stray startup identifier | ALREADY CORRECTED | The bare `JavaScript` token is removed; `onOpen` reaches guarded startup hooks. |
| ML1974-004 — row-by-row re-enrollment deletion | ALREADY CORRECTED | Re-enrollment filtering is performed in memory and exclusion data is batch-rewritten. |
| ML1974-005 — silent `onEdit` catch | ALREADY CORRECTED | `onEdit` now sends contextual failure text to `logBestEffortWarning_`. |
| ML1974-007 — duplicate declarations | ALREADY CORRECTED | AST inventory reports 290 declarations and 290 unique names; no duplicate declaration remains. |
| ML1974-002 — destructive factory preflight | PARTIALLY CORRECTED, NOT CLOSED | Preflight no longer deletes the target and the temporary sheet is built first; final swap still deletes before rename. Superseded by ML19741-002. |
| ML1974-003 — incremental disenrollment mutation | PARTIALLY CORRECTED, NOT CLOSED | Calculation is now in memory and row deletion is removed; commit/recovery and new width/schema defects remain. Superseded by ML19741-003/004/005. |
| ML1974-006 — shallow smoke validation | PARTIALLY CORRECTED, NOT CLOSED | Symbol coverage expanded from 11 to 19 functions but still cannot detect executable dependency defects. Superseded by ML19741-006. |
| ML1974-008 — invalid image getter | CONFIRMED, NOT CLOSED | Unchanged in v1.9.74.1. Renumbered ML19741-001 for the current review. |

No prior finding was rejected as incorrect, documentation-only, or unsupported by current evidence.

## 4. Consolidated Root-Cause Register

| Root cause | Related finding IDs | Root cause | Affected workflows | Coordinated correction | Risk | Test requirements |
|---|---|---|---|---|---|---|
| RC-19741-A | ML19741-003, -004, -005 | Commit occurs before all schema/dimension checks and without recovery | Disenrolled Exclusion, Refined Data, Monthly Start/Update | Validate matrices and PMR schemas; snapshot both bodies; commit with restoration | Medium | Schema, dimensions, failure injection, idempotence |
| RC-19741-B | ML19741-001, -006 | Symbol checks do not validate service-object methods/dependencies | Index, smoke validation, monthly finalization | Correct getter; add safe capability/schema probes | Low | Images, missing methods, valid/invalid sheets |
| RC-19741-C | ML19741-002 | Sheet replacement lacks a reversible final swap | All governed outputs/templates | Backup-name swap with restoration and name-length control | Low-medium | Every swap failure boundary |
| RC-19741-D | ML19741-007 | Simple trigger is assigned authorized cross-file work | Startup/archive Index | Scheduled/manual sync or approved installable open trigger | Low | Trigger execution ownership/auth |
| RC-19741-E | ML19741-008, -009 | Obsolete/ambiguous compatibility surfaces retained | Maintenance/admin | Remove confirmed private stubs; decide public parameter contract | Low | Dynamic reference and menu/manual compatibility |

## 5. Prioritized Remediation Plan

### Wave 1 — Critical correctness and data safety

- **Objective:** Make disenrollment fail closed and recoverable.
- **Findings resolved:** ML19741-003, ML19741-004, ML19741-005.
- **File:** New version derived from `Master_List/Current Production Script/v1.9.74.1`.
- **Functions:** `createDisenrolledListForMonth_`; existing row/header mapping and trim helpers.
- **Dependencies:** Refined Data and Disenrolled Exclusion headers/body matrices; Dashboard Section H; totals/historical hiding.
- **Exact proposed changes:**
  1. Require PMR indexes in source, existing exclusion, target exclusion, and refined target headers.
  2. Compute and validate exact matrix widths before any clear.
  3. Normalize output rows to their write ranges.
  4. Capture both pre-write body matrices and visibility state.
  5. Write/verify Exclusion, then write/verify Refined; restore Exclusion if Refined fails.
  6. Run totals/hiding only after both writes verify.
- **Business logic:** Unchanged participant classification, deduplication, sorting, and Primary PMR ownership.
- **Breaking risk:** Medium implementation risk, no intended interface change.
- **Data-integrity risk:** High before correction; low after verified recovery.
- **Tests:** All schema/width/failure/idempotence cases in Section 7.
- **Version:** v1.9.74.2.
- **Independent:** Yes; must precede other waves.
- **User decisions:** None.

### Wave 2 — Runtime stability and missing dependencies

- **Objective:** Prevent restore-button setup from blocking Index refresh.
- **Findings resolved:** ML19741-001; part of ML19741-006.
- **Functions:** `ensureRestoreButtonOnIndex_`, `populateIndexData`, `buildRestoreButtonIcon`.
- **Exact changes:** Replace `getAssignScript` with `getScript`; catch/log optional inspection and fetch errors; continue Index matrix processing; make manual command delegate to the idempotent helper.
- **Business logic:** Restore button remains at H2 and invokes the same public restore callback.
- **Breaking/data risk:** Low / none.
- **Tests:** Image and repeat-refresh matrix.
- **Version:** Same v1.9.74.2 coordinated release.
- **Independent:** Yes after Wave 1 review; may be implemented in the same patch.
- **User decisions:** None.

### Wave 3 — Trigger, concurrency, and replacement safety

- **Objective:** Complete reversible governed replacement and align archive sync with authorization.
- **Findings resolved:** ML19741-002, ML19741-007.
- **Functions:** `createGovernedSheet_`, `resolveSheetGovernance_`, `onOpen`, trigger setup/sync functions.
- **Exact changes:** Use backup-name swap/restore; cap temp/backup names; make swap failures fatal and coherent; remove cross-file sync from simple `onOpen` unless an installable open trigger is approved.
- **Business logic:** Final governed names/ranks/visibility and scheduled archive sync remain unchanged.
- **Breaking risk:** Low-medium.
- **Data risk:** High before factory correction; low after verified restoration.
- **Tests:** Swap failure injection and simple/installed trigger tests.
- **Version:** v1.9.74.2 if coordinated; otherwise v1.9.74.3.
- **Independent:** Factory work is independent; trigger change needs user choice.
- **User decision:** Scheduled/manual-only archive sync versus installable open trigger.

### Wave 4 — Performance improvements

- **Objective:** Optimize only bottlenecks demonstrated by corrected v1.9.74.2 timing.
- **Findings:** No correctness finding; performance follow-up.
- **Functions:** Workflow finalizers, Index refresh, timing report, template refresh as evidence dictates.
- **Exact changes:** Collect corrected process/stage timing; consolidate redundant Index/config/timing calls only where material.
- **Business logic/breaking/data risk:** Unchanged / low / low.
- **Tests:** Identical-input output comparison plus stage timing.
- **Version:** v1.9.74.3 if code changes are justified.
- **Independent:** Yes, after correctness waves.
- **User decisions:** Approve only optimizations with material measured benefit.

### Wave 5 — Duplicate, dead, and orphan cleanup

- **Objective:** Remove confirmed private stubs and clarify the Index interface.
- **Findings resolved:** ML19741-008, ML19741-009.
- **Functions:** `removeReenrolledRowsFromExclusion_`, `appendDisenrolledRowsAtBottom_`, `updateIndexSheet`.
- **Exact changes:** Final dynamic search; remove private stubs; remove or honor/document `archiveSs` after external usage decision.
- **Business logic:** Unchanged.
- **Breaking risk:** Low; public parameter decision requires care.
- **Tests:** Menu, manual, trigger, and disenrollment regression.
- **Version:** v1.9.74.3.
- **Independent:** Yes after Wave 1.
- **User decision:** Whether any external/manual caller passes `archiveSs`.

### Wave 6 — Maintainability, diagnostics, and documentation

- **Objective:** Make diagnostics accurately describe executable readiness.
- **Findings resolved:** ML19741-006 remainder.
- **Functions:** `runFrameworkSmokeValidation` and touched catches/comments.
- **Exact changes:** Add safe method/header/template probes; replace empty catches with contextual warnings where operationally useful; avoid evidence-only logging.
- **Business logic/breaking/data risk:** None / none / none.
- **Tests:** PASS and each focused failure mode.
- **Version:** Same cleanup release as Wave 5.
- **Independent:** Yes.
- **User decisions:** None.

## 6. User Decision Register

| Decision | Why needed | Options | Recommendation | Blocks |
|---|---|---|---|---|
| Archive sync on open | Simple trigger cannot reliably perform cross-file authorized work | Scheduled/manual only; installable on-open trigger | Keep scheduled 15-minute and manual sync; remove cross-file work from simple `onOpen` | Wave 3 trigger portion only |
| `updateIndexSheet(archiveSs)` contract | Parameter is unused but top-level functions may be invoked manually/externally | Remove parameter; honor parameter; retain/document deprecated parameter | Confirm no external caller, then remove while preserving zero-argument menu call | Wave 5 only |
| Legacy private stubs | Removal is low risk but prompt requires final dynamic-consumer verification | Remove; retain throwing deprecation wrapper | Remove after search because underscore-private no-op wrappers are dangerous | Wave 5 only |
| Performance work | Current timing predates release | Defer; optimize speculatively; measure corrected version | Measure after Waves 1–3 and implement only material improvements | Wave 4 only |

No architecture or business-rule decision blocks Wave 1 or Wave 2.

## 7. Test Plan

### Unit-like tests

- PMR/header normalization and index resolution for valid, missing, renamed, and duplicate headers.
- Row normalization for every width relationship.
- Factory temporary/backup name generation at 100-character limits.
- Image callback getter/setter capability checks.

### Spreadsheet integration tests

- Complete Index rebuild with zero, one matching, and one unrelated image.
- Disenrollment with new, existing, re-enrolled, mixed, and empty participant sets.
- Factory creation/replacement for each governed sheet family.
- Totals, hidden historical rows, ranks, notes, visibility, and final names.

### Regression tests

- Monthly Start and Monthly Update end-to-end with identical expected workflow order.
- Individual formatter, Refined sync/build, Monthly Change, Master List, template refresh, and Index menu callbacks.
- Existing archive/manual restore paths.

### Destructive-operation tests

- Inject service errors before/after each clear, write, rename, and deletion.
- Verify old governed target or backup always remains recoverable.
- Verify both disenrollment-related sheets are restored after second-stage failure.
- Verify missing PMR schema causes zero mutation.

### Trigger tests

- Simple `onOpen` execution with no authorization prompt/failure.
- Scheduled archive sync ownership and duplicate prevention.
- Manual sync and inaccessible archive behavior.
- `onEdit` warning behavior without blocking edits.

### Library/host compatibility tests

Not applicable as a reusable library. For this container-bound application, verify menu strings, assigned image callback, installed handler names, web restore entry point, and any external/manual `updateIndexSheet` usage.

### Performance tests

- Capture process and stage timing for Monthly Start, Monthly Update, Format Monthly Sheets, template refresh, disenrollment, and Index.
- Use identical workbook input and compare output matrices, not only elapsed time.
- Confirm no regression from recovery snapshots or safe swap.

### Report-validation tests

- Smoke validation must fail for each intentionally removed required dependency/header and pass for valid state.
- Dashboard Quality sections must reflect resulting Refined/Exclusion/Master List state.
- Timing report must record terminal errors and successful recovery context without excessive rows.

## 8. Implementation Recommendation

**Ready to implement Wave 1.**

The governing source, prior review, current review, specifications, prompts, and historical timing evidence are visible. All current Critical/High findings have static code evidence. Wave 1 requires no business-rule, architecture, public-interface, or trigger decision. Wait for user approval before implementing any remediation wave.
