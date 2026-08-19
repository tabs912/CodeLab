# **Master List Remediation — All-Waves Correction Checklist**

**Current reviewed script:** `Master_List/Current Production Script/v1.9.7.4.6` **Current evidence:** timing and Dashboard Quality reports in `Master_List/Audit Summary/v1.9.7.4.6/` **Legend:** `[x]` statically implemented or demonstrated by supplied evidence; `[ ]` still required.

## **Release preparation**

- [x] Review v1.9.7.4.6 as the governing source.  
- [x] Incorporate the supplied timing and quality evidence.  
- [ ] Create a new versioned production script; do not overwrite v1.9.7.4.6.  
- [ ] Use `v1.9.7.4.7` for the next correction.

## **Wave 1 — Deterministic declarations and setup**

- [x] Consolidate `isPrimaryPMRRowValue_` to one declaration.  
- [x] Consolidate `writeUniqueParticipantTotalToG1_` and retain the approved rich-text totals behavior.  
- [x] Consolidate `hideReportTemplates_` to one declaration.  
- [x] Consolidate `runDashboardQualityValidateTemplates` to one declaration and one row schema.  
- [x] Remove the duplicate `setupArchiveSyncTrigger()` call from `quickSystemSetup()`.  
- [x] Leave exactly one owned 15-minute archive trigger after setup.  
- [x] Use one guarded lock release per workflow; keep quality outside the lock.  
- [x] Confirm zero duplicate top-level function names and all menu/trigger callbacks resolve.

## **Wave 2 — Data safety and recovery**

- [x] Preserve both Refined Data and Disenrolled Exclusion pre-write matrices.  
- [x] Restore both matrices after a dual-sheet commit failure.  
- [x] Use collision-checked bounded temporary and backup names.  
- [x] Track governed-factory lifecycle state and protect committed final sheets from outer cleanup.  
- [x] Inject failures before/after every clear, write, rename, delete, and flush.  
- [x] Prove one valid governed target survives every factory failure boundary.  
- [x] Prove dual-sheet operations either fully commit or fully restore.  
- [x] Test zero rows, mixed changes, re-enrollment, and idempotent repeat.

## **Wave 3 — Template and setup performance**

- [x] Record Quick System Setup Phase 1 at 135.217 seconds.  
- [x] Record Quick Build Templates at 105.257–112.072 seconds.  
- [x] Batch operational subheader values and formatting.  
- [ ] Cache dashboard/theme/configuration inputs reused by template builders.  
- [x] Eliminate avoidable range/service calls inside template row loops.  
- [ ] Compare values, merges, formats, dimensions, visibility, and ordering to the baseline.  
- [ ] Demonstrate a material timing improvement on equivalent data.

## **Wave 4 — Monthly workflow performance**

- [x] Record Format Monthly Sheets 08.26 at 114.408 seconds.  
- [x] Identify Raw Data source-only verification at 33.880 seconds.  
- [x] Record Monthly Change 08.26 at 41.207 seconds.  
- [x] Record Create Monthly Update 08.26 at 134.985 seconds.  
- [x] Identify Monthly Update Index refresh at 21.597 seconds.  
- [x] Short-circuit verification when no source-only columns require preservation.  
- [x] Reuse already-read matrices and avoid redundant full-grid comparisons.  
- [x] Profile and batch Index refresh calls.  
- [ ] Obtain business approval before removing the repeated disenrollment safety pass.  
- [ ] Prove output matrices and participant totals are identical before accepting optimizations.

## **Wave 5 — Restore and interface cleanup**

- [x] Use Index checkboxes as the current restore interaction.  
- [x] Decide whether the legacy image-button path is retired or supported.  
- [x] Before removal, check menus, triggers, assigned scripts, `onEdit`, strings, and external consumers.  
- [ ] Runtime-test checkbox selection, divider rows, cancellation, success, archive failure, and repeat sync.  
- [x] Retain one documented, unambiguous restore interface.

## **Wave 6 — Quality, diagnostics, and release evidence**

- [x] Dashboard sections B–H pass.  
- [x] All ten governed templates and governed date formats pass.  
- [x] Supplied quality summary has zero failures and two expected missing-active-sheet warnings.  
- [x] Raw Data, Refined Data, Disenrolled Exclusion, Monthly Change, and Master List health checks pass.  
- [x] Targeted quality checks run post-lock and take about 1.8–3.2 seconds each.  
- [ ] Build CP Due Date and Unlock CP active outputs and rerun quality to clear expected presence warnings.  
- [x] Run Framework Smoke Validation and all focused failure cases.  
- [ ] Repeat timing on equivalent workbook state and row counts.  
- [ ] Update release notes, change log, known issues, and dependency/performance impacts.

## **Final regression and PR checks**

- [ ] Run Monthly Start and Monthly Update end to end.  
- [ ] Run individual formatters, Refined build/sync, disenrollment twice, Monthly Change, and Master List.  
- [ ] Run Index build/update, archive sync, checkbox restore, and deletion refresh.  
- [ ] Test simple open, manual/scheduled sync, inaccessible archive, and concurrent execution.  
- [ ] Confirm names, ranks, visibility, headers, formats, totals, and Primary PMR behavior.  
- [ ] Run `./Framework/tools/prepare_pr.sh`.  
- [ ] Confirm only intended text/source artifacts and no binaries or excluded files are staged.

## **Wave status**

- [ ] **Wave 1:** Required — duplicate declarations/setup and lock cleanup remain.  
- [ ] **Wave 2:** Statically implemented; destructive runtime verification remains.  
- [ ] **Wave 3:** Required — setup/template timing is a measured bottleneck.  
- [ ] **Wave 4:** Required — monthly workflow bottlenecks are measured; changes require equivalence tests.  
- [ ] **Wave 5:** Decision and runtime restore testing remain.  
- [ ] **Wave 6:** Quality evidence is strong; missing-output, smoke, timing, and release gates remain.

