# Master List v1.9.74.1 — All-Waves Correction Checklist

Use this checklist with the exhaustive review and remediation plan. Complete waves in order. Create a new versioned production script; do not overwrite v1.9.74.1.

## Before Starting

- [ ] Confirm `Master_List/Current Production Script/v1.9.74.1` is the governing baseline.
- [ ] Create the next version as **v1.9.74.2**.
- [ ] Preserve menu names, workflow entry points, dashboard rules, Primary PMR logic, and template-first behavior.
- [ ] Confirm no binary or `Archive_To_Move` files are included.

## Wave 1 — Disenrollment Correctness and Data Safety

**Findings:** ML19741-003, ML19741-004, ML19741-005

- [ ] Require valid PMR columns in Refined Data, existing Disenrolled Exclusion, and target headers.
- [ ] Stop before any write when a required PMR column is missing or ambiguous.
- [ ] Calculate and validate every output matrix width before clearing either sheet.
- [ ] Normalize Refined Data rows to the exact write-range width.
- [ ] Normalize Disenrolled Exclusion rows to the exact write-range width.
- [ ] Capture pre-write Refined Data and Disenrolled Exclusion matrices.
- [ ] Write and verify Disenrolled Exclusion.
- [ ] Write and verify Refined Data.
- [ ] Restore the first sheet if the second sheet write fails.
- [ ] Update totals and historical-row visibility only after both writes succeed.
- [ ] Test missing/renamed PMR headers, extra physical columns, zero retained rows, re-enrollments, new disenrollments, mixed changes, and injected write failures.

## Wave 2 — Index Restore-Button Stability

**Findings:** ML19741-001 and part of ML19741-006

- [ ] Replace `getAssignScript()` with `getScript()`.
- [ ] Keep `assignScript("restoreSheetFromActiveIndexRow")` as the setter.
- [ ] Ensure image inspection or download failure cannot stop Index data refresh.
- [ ] Log one contextual best-effort warning when image setup fails.
- [ ] Make `buildRestoreButtonIcon()` call the same idempotent helper.
- [ ] Prevent duplicate restore buttons.
- [ ] Test no image, matching image, unrelated image, failed download, repeated refresh, menu refresh, and Monthly Start/Update finalization.

## Wave 3 — Governed Replacement and Trigger Safety

**Findings:** ML19741-002, ML19741-007

### Governed replacement

- [ ] Generate temporary and backup names within the 100-character Sheets limit.
- [ ] Build and validate the new sheet before touching the prior target.
- [ ] Rename the prior target to a backup name.
- [ ] Rename the completed new sheet to the governed final name.
- [ ] Verify the final sheet before deleting the backup.
- [ ] Restore the backup name if the final rename or validation fails.
- [ ] Test failures at copy, write, old-target rename, new-target rename, verification, and backup deletion.

### Trigger decision

- [ ] Choose archive synchronization behavior:
  - [ ] **Recommended:** scheduled 15-minute trigger plus manual sync; remove cross-file sync from simple `onOpen`.
  - [ ] Alternative: create and document an authorized installable open trigger.
- [ ] Confirm trigger duplicate prevention and owner authorization.
- [ ] Test simple open, scheduled sync, manual sync, and inaccessible archive behavior.

## Wave 4 — Evidence-Based Performance Improvements

- [ ] Run corrected v1.9.74.2 timing for Monthly Start, Monthly Update, Format Monthly Sheets, template refresh, disenrollment, and Index refresh.
- [ ] Compare identical-input output matrices before comparing elapsed time.
- [ ] Identify only measured, material bottlenecks.
- [ ] Consolidate redundant Index, configuration, timing, or flush operations only when evidence supports the change.
- [ ] Confirm no performance change alters output, workflow order, or error handling.
- [ ] Use **v1.9.74.3** only if code changes are justified.

## Wave 5 — Orphan and Interface Cleanup

**Findings:** ML19741-008, ML19741-009

- [ ] Search direct, indirect, dynamic, trigger, menu, image-script, and external references.
- [ ] Remove `removeReenrolledRowsFromExclusion_` if no dynamic consumer exists.
- [ ] Remove `appendDisenrolledRowsAtBottom_` if no dynamic consumer exists.
- [ ] Decide the `updateIndexSheet(archiveSs)` contract:
  - [ ] Remove the unused parameter after confirming no external caller uses it; or
  - [ ] Honor and document the parameter consistently.
- [ ] Preserve the zero-argument menu callback.
- [ ] Rerun complete disenrollment and Index regression tests.

## Wave 6 — Diagnostics and Maintainability

**Finding:** remaining ML19741-006 work

- [ ] Add side-effect-free smoke checks for required headers and supported image methods.
- [ ] Ensure smoke validation fails for an invalid Index dependency or missing required PMR schema.
- [ ] Replace operationally relevant empty catches with contextual best-effort warnings.
- [ ] Keep optional formatting/index warnings nonfatal.
- [ ] Remove stale “FIX” or historical comments in functions touched by remediation.
- [ ] Do not add evidence-only logging or redesign the single-file architecture.
- [ ] Test smoke PASS plus each focused failure condition.

## Final Regression and Release Checks

- [ ] Run Monthly Start end to end.
- [ ] Run Monthly Update end to end.
- [ ] Run individual formatter workflows.
- [ ] Run Refined Data build and monthly sync.
- [ ] Run Disenrolled Exclusion update and repeat it to verify idempotence.
- [ ] Run Monthly Change and Master List creation.
- [ ] Run Index build/update, archive sync, and restore.
- [ ] Run Dashboard Quality and Framework Smoke Validation.
- [ ] Confirm all menu callbacks and trigger handler names remain valid.
- [ ] Confirm final sheet names, ranks, visibility, headers, totals, and Primary PMR behavior.
- [ ] Review timing results for regressions.
- [ ] Run `./Framework/tools/prepare_pr.sh`.
- [ ] Confirm only intended text/source artifacts are staged.
- [ ] Confirm no binary or excluded-area files are staged.

## Completion

- [ ] Wave 1 approved and complete.
- [ ] Wave 2 approved and complete.
- [ ] Wave 3 approved and complete.
- [ ] Wave 4 measured and either completed or documented as unnecessary.
- [ ] Wave 5 approved and complete.
- [ ] Wave 6 approved and complete.
- [ ] Release notes and change log completed for the final version.
