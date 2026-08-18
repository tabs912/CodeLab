# Master List Remediation — All-Waves Correction Checklist

**Current reviewed script:** `Master_List/Current Production Script/v1.9.7.4.3`

**Legend:** `[x]` statically implemented in v1.9.7.4.3; `[ ]` still required or requires runtime verification.

## Before the Next Correction

- [x] Preserve menu names, workflow entry points, dashboard rules, Primary PMR logic, and template-first behavior.
- [x] Remove the simple-`onOpen` cross-file archive sync.
- [ ] Create a new versioned production script; do not overwrite v1.9.7.4.3.
- [ ] Use **v1.9.7.4.4** for the next coordinated correction.

## Wave 1 — Disenrollment Correctness and Data Safety

- [x] Require a valid existing Disenrolled Exclusion PMR column when data exists.
- [x] Require a valid target Disenrolled Exclusion PMR column.
- [x] Normalize Refined Data rows to the write-range width.
- [x] Normalize Disenrolled Exclusion rows to the write-range width.
- [x] Preserve the pre-write Disenrolled Exclusion matrix.
- [x] Restore Disenrolled Exclusion if the Refined Data write fails.
- [ ] Preserve the exact pre-write Refined Data matrix and width.
- [ ] Restore Refined Data as well as Exclusion after any second-stage clear/write failure.
- [ ] Verify both restorations before reporting that rollback succeeded.
- [ ] Distinguish the original write error from any recovery error.
- [ ] Test failure before and after every clear/write, zero rows, mixed changes, re-enrollment, and repeated execution.

## Wave 2 — Index Restore-Button Stability

- [x] Replace `getAssignScript()` with `getScript()`.
- [x] Keep `assignScript("restoreSheetFromActiveIndexRow")` as the setter.
- [x] Catch and log automatic restore-button inspection/download errors.
- [x] Ensure automatic button failure does not stop Index matrix refresh.
- [x] Prevent duplicates through `ensureRestoreButtonOnIndex_`.
- [ ] Make `buildRestoreButtonIcon()` delegate to the idempotent helper.
- [ ] Test no image, matching image, unrelated image, failed download, repeated automatic refresh, and repeated manual invocation.

## Wave 3 — Governed Replacement and Trigger Safety

### Governed replacement

- [x] Build the new governed sheet before replacing the prior target.
- [x] Rename the prior target to a backup before assigning the final name.
- [x] Restore the backup if the final swap fails.
- [x] Cap temporary and backup names at the Sheets name limit.
- [ ] Generate unique temporary and backup names rather than deterministic names.
- [ ] Move copy and initial temporary naming inside cleanup protection.
- [ ] Test existing temp/backup collisions, two rapid calls, 100-character names, and every swap failure boundary.

### Trigger behavior

- [x] Remove cross-file archive synchronization from simple `onOpen`.
- [x] Retain scheduled and manual archive synchronization paths.
- [ ] Runtime-test simple open, scheduled sync, manual sync, trigger ownership, and inaccessible archive behavior.

## Wave 4 — Evidence-Based Performance Improvements

- [x] Remove row-by-row re-enrollment deletion.
- [x] Add batched number-format application.
- [ ] Correct Monthly Change formatting row count so ranges never exceed the grid.
- [ ] Remove the duplicate Monthly Change format call and completion timing step.
- [ ] Measure automatic quality checks added to formatter, Refined, Disenrollment, Master List, and Monthly Change workflows.
- [ ] Pass the exact output sheet/month to automatic quality validation.
- [ ] Avoid running hidden quality work inside a core lock when measured cost is material.
- [ ] Compare identical-input outputs before accepting performance changes.

## Wave 5 — Orphan, Duplicate, and Interface Cleanup

- [x] Remove `removeReenrolledRowsFromExclusion_`.
- [x] Remove `appendDisenrolledRowsAtBottom_`.
- [x] Remove the unused `archiveSs` parameter from `updateIndexSheet()`.
- [x] Preserve the zero-argument Index menu callback.
- [ ] Remove the duplicate/unreachable Refined Data return.
- [ ] Remove the duplicate Master List timing mark and return.
- [ ] Remove duplicate Monthly Change formatting, timing, and return statements.
- [ ] Confirm one quality/format/timing invocation per completed workflow.

## Wave 6 — Diagnostics and Maintainability

- [x] Add smoke checks for the image getter and configured PMR schemas.
- [x] Log `onEdit` failures contextually.
- [x] Log automatic restore-button failures contextually.
- [ ] Replace silent automatic-quality catches with contextual nonfatal warnings.
- [ ] Ensure automatic quality validates the exact output just created.
- [ ] Remove stale `FIX`/`NEW` comments and duplicated JSDoc in touched functions.
- [ ] Ensure rollback messages do not claim success unless both sheets are restored.
- [ ] Runtime-test smoke PASS and each focused failure condition.

## Final Regression and Release Checks

- [ ] Run Monthly Start end to end.
- [ ] Run Monthly Update end to end.
- [ ] Run individual formatter workflows.
- [ ] Run Refined Data build and monthly sync.
- [ ] Run Disenrolled Exclusion update and repeat it for idempotence.
- [ ] Run Monthly Change and Master List creation.
- [ ] Run Index build/update, archive sync, and restore.
- [ ] Run Dashboard Quality and Framework Smoke Validation.
- [ ] Confirm all 39 menu callbacks and trigger handlers remain valid.
- [ ] Confirm final names, ranks, visibility, headers, formats, totals, and Primary PMR behavior.
- [ ] Review current timing results for regressions.
- [ ] Run `./Framework/tools/prepare_pr.sh`.
- [ ] Confirm only intended text/source artifacts are staged.
- [ ] Confirm no binary or excluded-area files are staged.

## Wave Status

- [ ] **Wave 1:** Partially complete — dual-sheet rollback is not complete.
- [ ] **Wave 2:** Partially complete — manual restore-button command is not idempotent.
- [ ] **Wave 3:** Partially complete — core safety is improved; uniqueness/cleanup and runtime trigger tests remain.
- [ ] **Wave 4:** Partially complete — changes were added without corrected-release timing and include duplicate/out-of-grid formatting.
- [ ] **Wave 5:** Partially complete — stubs/parameter are corrected; unreachable duplicates remain.
- [ ] **Wave 6:** Partially complete — smoke checks improved; exact-target quality and warning cleanup remain.
- [ ] Release notes and final change log completed.
