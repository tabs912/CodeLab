# Master List v1.9.7.4.3 — Exhaustive Review Remediation Plan

**Governing source:** `origin/main:Master_List/Current Production Script/v1.9.7.4.3`
**Review:** `Master_List/Audit Summary/v1.9.7.4.3/Exhaustive_Engineering_Code_Review.md`
**Prompt:** `prompts/Projects/Exhaustive_Review_Remediation`
**Change control:** Planning only; production code and public interfaces were not changed.

## 1. Executive Remediation Summary

| Measure | Count |
|---|---:|
| v1.9.74.1 findings reviewed | 9 |
| Already corrected | 7 |
| Partially corrected | 1 |
| Superseded by current detail | 1 |
| Current findings | 6 |
| Current Critical / High / Medium / Low | 0 / 1 / 3 / 2 |
| Requires runtime evidence | 1 performance/quality item |
| Requires user decision | 0 before Wave 1 |

**Highest priority:** Refined Data is not restored after a failed second-stage disenrollment write, despite the rollback message.

**Recommended first wave:** Complete and verify dual-sheet rollback.

**Recommended next version:** **v1.9.7.4.4** as a minor correction preserving all business logic and entry points.

## 2. Validated Findings Register

| Finding | Prior finding | Status | Severity | Confidence | Function | Evidence/impact | Action | Wave | Breaking risk | Tests |
|---|---|---|---|---|---|---|---|---:|---|---|
| ML19743-001 | ML19741-005 | PARTIALLY CORRECTED | High | Confirmed | `createDisenrolledListForMonth_` | Catch restores Exclusion only; Refined may remain cleared/partial | Snapshot and restore both matrices; verify recovery | 1 | Medium | Failure injection and dual restore |
| ML19743-002 | ML19741-002 follow-up | NEW DETAIL | Medium | Confirmed | `createGovernedSheet_` | Deterministic/truncated temp name; naming occurs outside cleanup try | Unique bounded temp name; protect copy/name cleanup | 2 | Low | Collision, max name, cleanup |
| ML19743-003 | Performance follow-up | CONFIRMED | Medium | Confirmed | Monthly Change / formatter | Out-of-grid row calculation and duplicate format/timing calls | Cap data rows and retain one call | 2 | Low | Grid boundary and formats |
| ML19743-004 | Wave 4/6 follow-up | REQUIRES RUNTIME EVIDENCE | Medium | High | Automated quality paths | Hidden quality work inside locks; possible latest-sheet mismatch | Pass exact output and measure explicit stage | 3 | Low-medium | Exact month and timing |
| ML19743-005 | Cleanup follow-up | CONFIRMED | Low | Confirmed | Three workflow bodies | Duplicate marks/returns/format calls; unreachable code | Retain one sequence | 5 | None | Return/timing invocation |
| ML19743-006 | ML19741-001 remainder | PARTIALLY CORRECTED | Low | Confirmed | Restore-button functions | Automatic helper idempotent; manual command still inserts duplicates | Delegate manual command to helper | 5 | None | Repeated manual/automatic calls |

## 3. Findings Rejected or Closed

| v1.9.74.1 finding | Status | Current evidence |
|---|---|---|
| ML19741-001 invalid image getter | ALREADY CORRECTED | Uses `getScript()` and logs best-effort setup failure. |
| ML19741-002 unsafe delete-before-rename | ALREADY CORRECTED for data safety | Backup rename/swap/restore prevents the previous loss path; ML19743-002 covers a non-destructive temp-name edge. |
| ML19741-003 Refined matrix width | ALREADY CORRECTED | Refined rows are normalized to `refinedWidth`. |
| ML19741-004 missing exclusion PMR | ALREADY CORRECTED | Existing-data and target PMR checks fail before body mutation. |
| ML19741-005 non-atomic commit | PARTIALLY CORRECTED | Exclusion rollback added, but Refined recovery remains missing (ML19743-001). |
| ML19741-006 shallow smoke validation | ALREADY CORRECTED | Adds image-method and configured PMR schema probes. |
| ML19741-007 simple-trigger archive sync | ALREADY CORRECTED | Cross-file sync removed from `onOpen`. |
| ML19741-008 legacy no-op stubs | ALREADY CORRECTED | Both private stubs removed. |
| ML19741-009 unused Index parameter | ALREADY CORRECTED | `updateIndexSheet` is zero-argument. |

## 4. Consolidated Root-Cause Register

| Root cause | Findings | Affected workflow | Correction | Risk | Tests |
|---|---|---|---|---|---|
| RC-19743-A incomplete recovery | ML19743-001 | Disenrollment, Refined, Monthly Start/Update | Restore and verify both pre-write matrices | Medium | Failure at every write boundary |
| RC-19743-B imprecise range/lifecycle state | ML19743-002, -003 | Factory and Monthly Change | Unique bounded names; exact bounded data ranges | Low | Collision/grid boundaries |
| RC-19743-C hidden post-workflow work | ML19743-004 | All primary outputs/quality report | Exact target, visible warning, measured post-commit stage | Low-medium | Older/current month and timing |
| RC-19743-D patch duplication | ML19743-005, -006 | Workflow returns/timing/manual Index | Consolidate authoritative statements/helpers | Low | Invocation counts/idempotence |

## 5. Prioritized Remediation Waves

### Wave 1 — Complete data recovery

- **Findings:** ML19743-001.
- **Objective:** Guarantee truthful dual-sheet rollback.
- **Functions:** `createDisenrolledListForMonth_` and existing matrix helpers.
- **Changes:** Preserve exact pre-write Refined/Exclusion matrices and widths; restore both on either write failure; verify both restorations; distinguish original and recovery errors.
- **Business logic:** Unchanged.
- **Data risk:** High before correction; low after verified recovery.
- **Tests:** Failure before/after each clear/write, partial set failure, recovery failure, zero rows, idempotent repeat.
- **Version:** v1.9.7.4.4.
- **Independent:** Yes.
- **Decision:** None.

### Wave 2 — Lifecycle and formatting correctness

- **Findings:** ML19743-002, ML19743-003.
- **Objective:** Make factory setup clean and Monthly Change formatting exact.
- **Functions:** `createGovernedSheet_`, `applyGovernedNumberFormatsFromDashboard_`, `buildMonthlyChangeReportForMonth_`.
- **Changes:** Unique bounded temp/backup names; move copy/name into protected cleanup; cap formatted end row; pass data-row count; remove duplicate calls/steps.
- **Business logic:** Unchanged.
- **Risk:** Low.
- **Tests:** Name collisions, 100-character names, copy/name failures, empty/full Monthly Change, date/text formats.
- **Version:** v1.9.7.4.4.
- **Independent:** Yes after Wave 1 review.
- **Decision:** None.

### Wave 3 — Exact and observable automated quality

- **Finding:** ML19743-004.
- **Objective:** Validate the exact output without hidden failure or unnecessary lock time.
- **Functions:** workflow completion paths and `runDashboardQualityProcessValidationSections_`.
- **Changes:** Pass output sheet/name and month explicitly; emit contextual nonfatal warning; run once post-commit; record stage timing.
- **Business logic:** Unchanged.
- **Risk:** Low-medium.
- **Tests:** Older/current month, exact sheet, quality failure, lock duration.
- **Version:** v1.9.7.4.4 or later if timing evidence requires design choice.
- **Independent:** Yes.
- **Decision:** Defer automatic checks if measured cost is not proportionate.

### Wave 4 — Evidence-based performance

- **Objective:** Measure corrected workflows before further optimization.
- **Changes:** Capture stage timing for all primary workflows; compare identical outputs; optimize only material service-call costs.
- **Tests:** Monthly Start/Update, formatting, templates, Index, quality.
- **Version:** Later minor version only if justified.
- **Independent:** After Waves 1–3.

### Wave 5 — Duplicate and manual-helper cleanup

- **Findings:** ML19743-005, ML19743-006.
- **Changes:** Remove unreachable duplicate statements; route manual restore-button command through the idempotent helper.
- **Risk:** None/low.
- **Tests:** Return object, timing/format/quality invocation count, repeated manual button command.
- **Version:** v1.9.7.4.4.
- **Independent:** Yes.

### Wave 6 — Diagnostics and documentation

- **Objective:** Ensure warnings and comments match final behavior.
- **Changes:** Remove stale patch comments; replace relevant empty catches with contextual warnings; retain nonfatal optional behavior; update release notes/checklist.
- **Risk:** None.
- **Tests:** Smoke PASS/failure, warning context, no excess logging.
- **Version:** Same correction release.

## 6. User Decision Register

| Decision | Recommendation | Blocks |
|---|---|---|
| Keep automatic quality checks after every output? | Retain only if exact-target timing shows proportionate cost; otherwise make them an explicit post-workflow/quality action | Wave 3 only |
| Additional performance optimization? | Require corrected-release timing evidence first | Wave 4 only |

No decision blocks Wave 1 or Wave 2.

## 7. Test Plan

- **Unit-like:** matrix restoration, width normalization, unique bounded names, format-range end rows.
- **Spreadsheet integration:** dual-sheet commit/recovery, governed replacements, exact-month quality, number formats, restore button.
- **Regression:** Monthly Start/Update, individual formatters, Refined, Disenrollment, Monthly Change, Master List, Index, quality, smoke.
- **Destructive operations:** inject errors at every clear/write/rename/delete and verify recoverability.
- **Triggers:** simple `onOpen`, scheduled/manual archive sync, `onEdit` warnings.
- **Compatibility:** all 39 menu callbacks, assigned image script, web restore, zero-argument Index update.
- **Performance:** stage timing with identical input/output.
- **Reports:** Dashboard Quality exact target and Framework Timing error/recovery rows.

## 8. Implementation Recommendation

**Ready to implement Wave 1.** All required artifacts are visible, the High finding has direct current-code evidence, and no business-rule, architecture, or public-interface decision is required. Wait for approval before changing production code.
