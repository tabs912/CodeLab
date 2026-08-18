# Master List v1.9.7.4.4 — Exhaustive Review Remediation Plan

**Governing source:** `origin/main:Master_List/Current Production Script/v1.9.7.4.4`
**Review:** `Master_List/Audit Summary/v1.9.7.4.4/Exhaustive_Engineering_Code_Review.md`
**Prompt:** `prompts/Projects/Exhaustive_Review_Remediation`
**Change control:** Planning only; production code and public interfaces were not changed.

## 1. Executive Remediation Summary

| Measure | Count |
|---|---:|
| v1.9.7.4.3 findings reviewed | 6 |
| Already corrected | 4 |
| Partially corrected | 2 |
| Current findings | 4 |
| Current Critical / High / Medium / Low | 0 / 1 / 1 / 2 |
| Requires runtime evidence | 1 |
| Requires user decision before Wave 1 | 0 |

**Highest priority:** prevent post-commit factory cleanup from deleting the only completed final target.

**Recommended next version:** **v1.9.7.4.5**.

## 2. Validated Findings Register

| Finding | Prior finding | Status | Severity | Confidence | Function | Current evidence/impact | Action | Wave | Breaking risk | Tests |
|---|---|---|---|---|---|---|---|---:|---|---|
| ML19744-001 | ML19743-002 follow-up | NEW DETAIL | High | High | `createGovernedSheet_` | Outer catch deletes final sheet after backup deletion if later flush fails | State-aware cleanup; retain backup through verification | 1 | Low-medium | Every lifecycle failure boundary |
| ML19744-002 | ML19743-004 | PARTIALLY CORRECTED | Medium | High | Automated quality paths | Exact target/warnings/timing added, but quality still runs inside locks | Measure and decide one post-commit stage | 2 | Low | Timing, exact output, concurrent user |
| ML19744-003 | ML19743-002 remainder | PARTIALLY CORRECTED | Low | Confirmed | `createGovernedSheet_` | Six-digit suffix can collide | Resolve unique bounded name against workbook | 3 | None | Existing/same-time/repeating suffix |
| ML19744-004 | ML19743-006 remainder | PARTIALLY CORRECTED | Low | Confirmed | Restore-button functions | Manual delegation fixed, but toast always says success | Return and display setup result | 3 | None | Existing/add/failure feedback |

## 3. Findings Rejected or Closed

| v1.9.7.4.3 finding | Status | Evidence |
|---|---|---|
| ML19743-001 incomplete dual rollback | ALREADY CORRECTED | Catch restores both pre-write matrices and distinguishes complete/failed recovery. |
| ML19743-002 deterministic setup outside protection | PARTIALLY CORRECTED | Copy/name moved inside try and bounded suffix added; collision and post-commit cleanup details remain ML19744-001/-003. |
| ML19743-003 Monthly Change format bounds/duplication | ALREADY CORRECTED | Uses bounded data-row count and one format/timing/return sequence. |
| ML19743-004 hidden/wrong-target quality | PARTIALLY CORRECTED | Exact sheet, warning, and stage timing added; lock/runtime decision remains ML19744-002. |
| ML19743-005 duplicate/unreachable statements | ALREADY CORRECTED | Duplicate marks, formatting calls, and returns removed. |
| ML19743-006 non-idempotent manual button | PARTIALLY CORRECTED | Manual command delegates to helper; truthful result remains ML19744-004. |

## 4. Consolidated Root-Cause Register

| Root cause | Findings | Workflow | Correction | Risk | Tests |
|---|---|---|---|---|---|
| RC-19744-A build and commit cleanup share one catch | ML19744-001 | All governed replacements | Explicit lifecycle state and backup retention | Medium | Failure injection |
| RC-19744-B post-workflow diagnostics remain inside locks | ML19744-002 | Monthly/quality workflows | Measure; move to one explicit post-commit stage if material | Low | Timing/concurrency |
| RC-19744-C helpers do not fully express uniqueness/result | ML19744-003, -004 | Factory/Index admin | Workbook-checked names and structured helper result | Low | Collision/feedback |

## 5. Prioritized Remediation Waves

### Wave 1 — Factory commit-state safety

- **Finding:** ML19744-001.
- **Objective:** Guarantee one valid governed target survives every error.
- **Functions:** `createGovernedSheet_`; optional bounded-name helper.
- **Changes:** Track lifecycle state; delete only uncommitted temp sheets; retain backup until final rename/verification/flush succeeds; restore backup when available; never delete committed final output after backup removal.
- **Business logic:** Unchanged.
- **Data risk:** High before correction, low after verified failure tests.
- **Tests:** Failure before/after copy, temp name, data write, backup rename, final rename, backup deletion, flush, and Index refresh.
- **Version:** v1.9.7.4.5.
- **Independent:** Yes.
- **Decision:** None.

### Wave 2 — Quality-stage placement and performance

- **Finding:** ML19744-002.
- **Objective:** Keep exact-target quality without disproportionate lock/runtime cost.
- **Functions:** completion paths and `runDashboardQualityProcessValidationSections_`.
- **Changes:** Use recorded stage timing; if material, invoke quality once after core commit/lock or through explicit quality workflow; retain exact sheet and contextual warning.
- **Business logic:** Unchanged.
- **Tests:** Monthly Start/Update timing, exact older/current month, quality failure, second-user lock behavior.
- **Version:** v1.9.7.4.5 only if a change is evidence-supported.
- **Independent:** Yes after Wave 1.
- **Decision:** Inline exact-target quality versus explicit post-commit quality based on timing.

### Wave 3 — Naming and manual feedback cleanup

- **Findings:** ML19744-003, ML19744-004.
- **Changes:** Check workbook for temp/backup collision and increment within 100 characters; return structured restore-button status and display accurate toast/alert.
- **Risk:** Low.
- **Tests:** Name collisions/repeat cycle/max length; button existing/added/failure.
- **Version:** v1.9.7.4.5.
- **Independent:** Yes.

### Wave 4 — Evidence-based performance

- Capture corrected workflow and quality-stage timing.
- Compare identical inputs/outputs.
- Optimize only measured material calls.
- Defer code changes if no material bottleneck is shown.

### Wave 5 — Orphan and duplicate cleanup

- No confirmed orphan or duplicate declaration remains.
- Recheck dynamic/manual surfaces only if touched by Waves 1–3.

### Wave 6 — Diagnostics and documentation

- Remove stale patch comments in touched functions.
- Ensure factory/recovery messages reflect actual state.
- Update checklist, release notes, and final version log.

## 6. User Decision Register

| Decision | Recommendation | Blocks |
|---|---|---|
| Automatic quality placement | Keep exact-target inline behavior only if current timing is proportionate; otherwise use one explicit post-commit quality stage | Wave 2 only |
| Additional optimization | Require corrected-release evidence | Wave 4 only |

No decision blocks Wave 1 or Wave 3.

## 7. Test Plan

- **Unit-like:** lifecycle-state transitions, unique bounded name, button result status.
- **Spreadsheet integration:** governed replacements for each family, exact quality target, Index button.
- **Regression:** all 39 menu callbacks and primary monthly workflows.
- **Destructive-operation:** errors at every copy/write/rename/delete/flush boundary; one valid target must survive.
- **Trigger/concurrency:** simple open, scheduled/manual sync, second-user lock during quality.
- **Performance:** quality stage and total workflow timings with identical outputs.
- **Report validation:** Dashboard Quality exact sheet and Framework Timing stage/error records.

## 8. Implementation Recommendation

**Ready to implement Wave 1.** The remaining High finding has direct current-code evidence and requires no business-rule, architecture, or public-interface decision. Wait for approval before modifying production code.
