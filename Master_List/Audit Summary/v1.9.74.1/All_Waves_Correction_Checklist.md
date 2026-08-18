# Master List Remediation — All-Waves Correction Checklist

**Current reviewed script:** `Master_List/Current Production Script/v1.9.7.4.4`

**Legend:** `[x]` statically implemented; `[ ]` still required or requires runtime verification.

## Before the Next Correction

- [x] Preserve approved menu, workflow, dashboard, Primary PMR, and template-first behavior.
- [x] Keep simple `onOpen` free of cross-file archive access.
- [ ] Create a new versioned production script; do not overwrite v1.9.7.4.4.
- [ ] Use **v1.9.7.4.5** for the next correction.

## Wave 1 — Disenrollment Correctness and Data Safety

- [x] Require valid existing and target Disenrolled Exclusion PMR columns.
- [x] Normalize Refined and Exclusion matrices to their write widths.
- [x] Preserve both pre-write matrices.
- [x] Restore Disenrolled Exclusion after a commit failure.
- [x] Restore Refined Data after a commit failure.
- [x] Distinguish complete rollback from failed recovery.
- [ ] Runtime-test failure before/after every clear/write, zero rows, mixed changes, re-enrollment, and idempotent repeat.

## Wave 2 — Index Restore-Button Stability

- [x] Use `getScript()` as the image callback getter.
- [x] Keep `assignScript("restoreSheetFromActiveIndexRow")` as the setter.
- [x] Catch and log automatic button setup failures.
- [x] Keep Index matrix refresh nonblocking.
- [x] Make the manual button command delegate to the idempotent helper.
- [ ] Return setup status from the helper.
- [ ] Show accurate manual feedback for existing, added, or failed button setup.
- [ ] Runtime-test no image, matching image, unrelated image, failed download, repeated automatic refresh, and repeated manual invocation.

## Wave 3 — Governed Replacement and Trigger Safety

### Governed replacement

- [x] Build the replacement before touching the prior target.
- [x] Rename the prior target to a backup before assigning the final name.
- [x] Restore the backup when the swap itself fails.
- [x] Move copy and initial naming inside cleanup protection.
- [x] Bound temporary and backup names below the Sheets limit.
- [ ] Make temp/backup names collision-proof against existing workbook sheets.
- [ ] Track pre-commit and post-commit lifecycle state explicitly.
- [ ] Delete only uncommitted temporary sheets in the outer catch.
- [ ] Retain the backup until final verification/flush succeeds.
- [ ] Never delete the committed final sheet after the backup is gone.
- [ ] Test errors at every copy, write, rename, delete, flush, and Index boundary.

### Trigger behavior

- [x] Remove archive sync from simple `onOpen`.
- [x] Retain scheduled/manual archive sync.
- [ ] Runtime-test simple open, scheduled sync, manual sync, trigger ownership, and inaccessible archive behavior.

## Wave 4 — Evidence-Based Performance Improvements

- [x] Remove row-by-row re-enrollment deletion.
- [x] Apply number formats through range lists.
- [x] Correct Monthly Change formatting to a bounded data-row count.
- [x] Remove duplicate Monthly Change formatting/timing calls.
- [x] Pass the exact output sheet to automated quality validation.
- [x] Log automated-quality failures contextually.
- [x] Record automated-quality stage duration.
- [ ] Measure total Monthly Start/Update and per-output quality duration.
- [ ] Test a second user while quality runs inside the document lock.
- [ ] Keep inline quality only if measured cost is proportionate; otherwise use one explicit post-commit quality stage.
- [ ] Compare identical-input output matrices before accepting performance changes.

## Wave 5 — Orphan, Duplicate, and Interface Cleanup

- [x] Remove both legacy disenrollment stubs.
- [x] Remove the unused `archiveSs` parameter from `updateIndexSheet()`.
- [x] Preserve the zero-argument Index menu callback.
- [x] Remove duplicate/unreachable Refined, Master List, and Monthly Change statements.
- [x] Confirm one format/timing/return sequence statically in each corrected workflow.
- [ ] Runtime-confirm one quality/format/timing invocation per completed workflow.

## Wave 6 — Diagnostics and Maintainability

- [x] Add smoke checks for image methods and configured PMR schemas.
- [x] Log `onEdit`, button, and automated-quality failures contextually.
- [x] Pass exact sheet names to targeted quality validation.
- [x] Make dual rollback messages distinguish success from recovery failure.
- [ ] Make manual button success messages reflect actual helper status.
- [ ] Make factory cleanup/error messages reflect pre-commit versus committed state.
- [ ] Remove stale patch comments and duplicate JSDoc in functions touched by the final correction.
- [ ] Runtime-test smoke PASS and focused failures.

## Final Regression and Release Checks

- [ ] Run Monthly Start and Monthly Update end to end.
- [ ] Run individual formatters and Refined build/sync.
- [ ] Run Disenrolled Exclusion twice to verify idempotence.
- [ ] Run Monthly Change and Master List creation.
- [ ] Run Index build/update, archive sync, and restore.
- [ ] Run Dashboard Quality and Framework Smoke Validation.
- [ ] Confirm all 39 menu callbacks and trigger handlers.
- [ ] Confirm names, ranks, visibility, headers, formats, totals, and Primary PMR behavior.
- [ ] Review current timing and recovery results.
- [ ] Run `./Framework/tools/prepare_pr.sh`.
- [ ] Confirm only intended text/source artifacts and no binaries/excluded files are staged.

## Wave Status

- [ ] **Wave 1:** Statically implemented; runtime destructive-operation tests remain.
- [ ] **Wave 2:** Functionally implemented; truthful manual feedback and runtime tests remain.
- [ ] **Wave 3:** Partially complete — post-commit factory cleanup remains a High blocker.
- [ ] **Wave 4:** Instrumented and partially complete — current timing/concurrency evidence remains.
- [ ] **Wave 5:** Statically complete; runtime invocation checks remain.
- [ ] **Wave 6:** Partially complete — final state-aware messages/comments/tests remain.
- [ ] Release notes and final change log completed.
