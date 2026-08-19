# Master List Remediation — All-Waves Correction Checklist

**Current reviewed script:** `Master_List/Current Production Script/v1.9.7.4.7`
**Current evidence:** final timing and Dashboard Quality reports in `Master_List/Audit Summary/v1.9.7.4.7/`
**Legend:** `[x]` statically implemented or demonstrated by supplied evidence; `[ ]` still required.

## Release preparation

- [x] Review v1.9.7.4.7 as the governing source.
- [x] Incorporate the supplied final timing and quality evidence.
- [x] Identify the restore authorization/routing defect.
- [ ] Create a new versioned production script; do not overwrite v1.9.7.4.7.
- [ ] Use `v1.9.7.4.8` for the restore correction.

## Wave 1 — Deterministic declarations and setup

- [x] Consolidate the previously duplicated top-level declarations.
- [x] Remove the duplicate archive-trigger setup call.
- [x] Keep quality outside the document-lock commit scope.
- [ ] Runtime-confirm one owned archive-sync trigger and every menu/trigger callback.

## Wave 2 — Data safety and recovery

- [x] Preserve dual-sheet pre-write matrices and implement recovery paths.
- [x] Use collision-checked governed-factory temporary and backup names.
- [x] Track governed-factory lifecycle state.
- [ ] Execute and retain evidence for failure injection at every clear, write, rename, delete, and flush boundary.
- [ ] Prove dual-sheet operations fully commit or fully restore.
- [ ] Prove one valid governed target survives every factory failure boundary.

## Wave 3 — Template and setup performance

- [x] Supply a final timing report.
- [x] Record Quick System Setup Phase 1 at 84.263 seconds.
- [x] Record Quick Build Templates at 153.373 seconds.
- [ ] Demonstrate equivalent values, merges, formats, dimensions, visibility, and ordering after batching changes.
- [ ] Reduce the measured template-build regression on equivalent data.

## Wave 4 — Monthly and archive performance

- [x] Record Format Monthly Sheets runs up to 180.711 seconds.
- [x] Record Create Monthly Update runs up to 200.183 seconds.
- [x] Record Archive Monthly Sub-Reports at 140.031 seconds.
- [ ] Optimize only with equivalent workbook state, row counts, and output matrices.
- [ ] Resolve repeated disenrollment only after business approval.
- [ ] Profile Index refresh, source-only verification, sheet visibility, and archive copy calls.

## Wave 5 — Archive restore — blocking

- [x] Reproduce/report an error when restoring from the Archive.
- [x] Confirm checkbox restoration is invoked from reserved `onEdit(e)`.
- [x] Confirm that path requires cross-workbook `openById()` and `copyTo()` authorization.
- [ ] Remove cross-workbook restoration from the simple-trigger execution path.
- [ ] Implement an authorized **Restore Selected Archive Sheet(s)** menu command, or securely deploy and validate the web-app route.
- [ ] Resolve the governed **Archive Sheet Name** header explicitly rather than the first generic `sheet name` header.
- [ ] Clear a checkbox only after successful restoration; preserve/reinstate selection on cancellation or failure.
- [ ] Open the archive once per authorized batch and refresh the Index once.
- [ ] Provide accurate per-sheet success, collision, missing-sheet, configuration, and permission messages.
- [ ] Runtime-test success, cancellation, divider rows, local collision, missing archive sheet, invalid archive ID, denied permission, copy/rename failure, and repeat restore.
- [ ] Confirm no duplicate/racing simple and installable edit handlers.

## Wave 6 — Quality, diagnostics, and release evidence

- [x] Supplied Dashboard Quality output reports no failed quality items in its summary.
- [x] Active CP Due Date, Unlock CP, Raw Data, Refined Data, Disenrolled Exclusion, Monthly Change, and Master List checks pass in the supplied report.
- [ ] Add restore timing/outcome evidence; current reports do not validate restoration.
- [ ] Run Framework Smoke Validation after the restore correction.
- [ ] Repeat timing and quality on equivalent workbook state.
- [ ] Update release notes, change log, known issues, and authorization/deployment requirements.

## Final regression and PR checks

- [ ] Successfully restore at least one archived sheet through the supported authorized entry point.
- [ ] Run the complete restore negative-test matrix.
- [ ] Run Monthly Start, Monthly Update, individual formatters, Refined sync, disenrollment, Monthly Change, and Master List.
- [ ] Run Index build/update, archive sync, restore, deletion refresh, and inaccessible-archive tests.
- [ ] Test simple open/edit, manual and scheduled sync, web app if retained, and concurrent execution.
- [ ] Confirm names, ranks, visibility, headers, formats, totals, and Primary PMR behavior.
- [ ] Run `./Framework/tools/prepare_pr.sh`.
- [ ] Confirm only intended text/source artifacts and no binary or excluded files are staged.

## Wave status

- [ ] **Wave 1:** Static corrections present; runtime callback/trigger ownership evidence remains.
- [ ] **Wave 2:** Static safeguards present; destructive runtime evidence remains.
- [ ] **Wave 3:** Timing regressed; equivalence and performance acceptance remain.
- [ ] **Wave 4:** Significant monthly/archive bottlenecks remain.
- [ ] **Wave 5:** **Blocked/failed — simple-trigger restore crosses an authorization boundary.**
- [ ] **Wave 6:** Quality evidence is positive, but restore and full release gates remain.
