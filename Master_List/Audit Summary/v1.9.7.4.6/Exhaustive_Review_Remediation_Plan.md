# Master List v1.9.7.4.6 — Evidence-Based Remediation Plan

**Governing source:** `origin/main:Master_List/Current Production Script/v1.9.7.4.6`
**Runtime evidence:** the three timing/quality PDF reports in this directory
**Prompt:** `prompts/Projects/Exhaustive_Review_Remediation`
**Change control:** planning only; no production source or public interface is changed here.

## 1. Executive disposition

The v1.9.7.4.6 runtime evidence is materially better than the earlier static-only record: the governed sheets that exist pass header and format validation, the quality summary contains **zero failures**, and the two warnings are expected missing-sheet warnings for CP Due Date and Unlock CP outputs that had not been built. The earlier dual-sheet rollback, collision-proof factory naming, and post-commit cleanup blockers are statically corrected.

Release remediation is still required before declaring the wave program complete. The current script has four duplicate top-level function names, one duplicate archive-trigger installation, a shadowed rich-text totals implementation, redundant lock releases, and measured performance bottlenecks. These are correction/optimization issues rather than evidence of current data corruption.

**Recommended correction version:** `v1.9.7.4.7`.

## 2. Evidence summary

### Quality report

- Format Dashboard Sections B–H pass.
- All ten governed templates are present and governed date formats pass.
- Raw Data, Refined Data, Disenrolled Exclusion, Monthly Change, and Master List health sections pass.
- The summary reports seven sections, zero failures, and two warnings. Both warnings are active-sheet-presence warnings for CP Due Date and Unlock CP sheets that were not yet built; they are not schema or formatting failures.

### Timing reports

| Workflow/stage | Observed duration | Disposition |
|---|---:|---|
| Quick System Setup Phase 1 | 135.217 s | Bottleneck; optimize template/system-sheet construction |
| Quick Build Templates Phase 1 | 105.257–112.072 s | Slow; batch subheader writes and formatting |
| Format Monthly Sheets 08.26 | 114.408 s | Bottleneck |
| Raw Data source-only verification | 33.880 s | Primary formatter bottleneck |
| Monthly Change 08.26 | 41.207 s | Slow; comparison/count stage was 20.390 s |
| Create Monthly Update 08.26 | 134.985 s | Bottleneck |
| Monthly Update Index refresh | 21.597 s | Slow |
| Dashboard Quality Sections C–J | 16.665 s | Slow but produced valid evidence |
| Targeted quality checks | about 1.8–3.2 s each | Proportionate and now post-lock |

The report also shows Disenrolled Exclusion running twice during Monthly Update. The second run produced the same participant totals, but it added about 13 seconds plus orchestration delay; retain it only if the safety notice is an approved business requirement.

## 3. Current findings register

| ID | Severity | Confidence | Status/evidence | Required correction |
|---|---|---|---|---|
| ML19746-001 | Medium | Confirmed | Four duplicate top-level names: `isPrimaryPMRRowValue_`, `writeUniqueParticipantTotalToG1_`, `hideReportTemplates_`, and `runDashboardQualityValidateTemplates`. Apps Script uses the last declaration, making earlier bodies unreachable. | Consolidate each name to one governed implementation and rerun callback/inventory checks. |
| ML19746-002 | Medium | Confirmed | The later `writeUniqueParticipantTotalToG1_` shadows the new rich-text implementation, so the intended bold-label totals behavior is not the active implementation. | Keep one implementation with the approved rich-text behavior and verify G1/G2 values and formatting. |
| ML19746-003 | Medium | Confirmed | `quickSystemSetup()` invokes `setupArchiveSyncTrigger()` twice consecutively. This repeats trigger deletion/recreation and user feedback without benefit. | Install the trigger once and verify exactly one owned trigger remains. |
| ML19746-004 | Medium (performance) | Runtime-confirmed | Template building takes roughly 105–112 seconds; operational subheader construction performs repeated range writes/format calls. | Build value/format plans in memory and apply bounded batch operations without changing layout. |
| ML19746-005 | Medium (performance) | Runtime-confirmed | Raw Data source-only verification takes 33.880 seconds even when no source-only columns require preservation. | Short-circuit the empty preservation case and avoid redundant full-grid verification reads. |
| ML19746-006 | Medium (performance) | Runtime-confirmed | Monthly Update takes 134.985 seconds; Index refresh costs 21.597 seconds and disenrollment is intentionally repeated. | Profile Index service calls; decide/document whether the second disenrollment pass is required. |
| ML19746-007 | Low | Confirmed | Formatter and other completion paths call `releaseLock()` explicitly and again in `finally`; successful timing runs show this is not currently fatal, but ownership is unclear. | Use one guarded release in `finally`; run quality after the protected commit using explicit scope. |
| ML19746-008 | Low | Confirmed | Image-button auto-setup was removed in favor of Index restore checkboxes, but legacy button/manual functions remain without a normal menu path. | Formally retire the button path or restore and test it; do not maintain two ambiguous restore interfaces. |

## 4. Prior findings disposition

| Earlier issue | v1.9.7.4.6 status |
|---|---|
| Dual-sheet disenrollment rollback | **Statically corrected; destructive failure-injection still required.** Both pre-write matrices are retained and recovery distinguishes complete from failed rollback. |
| Governed-factory temporary-name collision | **Corrected.** Candidate names are checked and incremented. |
| Governed-factory post-commit deletion risk | **Corrected.** Lifecycle state prevents outer cleanup from deleting a committed final sheet. Test failure after final rename and backup deletion. |
| Quality checks executed while holding document lock | **Corrected and runtime-supported.** Targeted checks execute after explicit release and take about 1.8–3.2 seconds. Consolidate redundant releases without moving quality back inside the lock. |
| Invalid restore-image getter | **Superseded by checkbox restore design.** Confirm retirement of the legacy image path. |
| Quality target ambiguity | **Corrected.** Current reports identify and pass the exact active sheets. |

## 5. Remediation waves

### Wave 1 — Deterministic declarations and setup

1. Remove the four duplicate declarations after selecting the authoritative body.
2. Preserve the rich-text participant-total implementation.
3. Remove the second archive-trigger setup call.
4. Reduce every workflow to one lock release in `finally`; keep quality post-lock.
5. Re-run syntax, duplicate-name, menu-callback, and trigger inventories.

**Acceptance:** zero duplicate top-level function names; one archive trigger; exact G1/G2 total values and approved styling; no quality stage under a document lock.

### Wave 2 — Data-safety runtime verification

Inject failures before and after each clear, write, rename, delete, and flush in the governed factory and dual-sheet disenrollment commit. At every boundary, prove that one valid governed target survives and that Refined Data and Disenrolled Exclusion are either both committed or both restored.

**Acceptance:** no partial dual-sheet state and no loss of the prior or committed governed target.

### Wave 3 — Template/setup performance

Batch `buildOperationalReportSubheaders_` value writes and formatting, cache dashboard/theme inputs, and avoid repeated single-range formatting. Compare every resulting template value, merge, format, dimension, and visibility property to the v1.9.7.4.6 baseline.

**Acceptance:** identical template outputs; materially lower Quick Build Templates and Quick System Setup timings.

### Wave 4 — Monthly workflow performance

Short-circuit the zero-source-only-column verification path, reuse already-read matrices, profile Monthly Change comparison, and batch Index refresh operations. Confirm with the owner whether the second disenrollment pass is mandatory; remove it only with business approval and an idempotence regression test.

**Acceptance:** identical participant/output matrices and a measured reduction in Format Monthly Sheets and Create Monthly Update time.

### Wave 5 — Restore/interface cleanup

Treat checkbox restore as the governing interface unless the image button is explicitly retained. Remove only after checking menus, triggers, assigned scripts, `onEdit`, function-name strings, and external consumers.

**Acceptance:** one documented restore path, successful checkbox restore, cancellation/error handling, and no stale public callback.

### Wave 6 — Final evidence and release

Run the full quality workflow after all required active outputs exist, repeat timing on equivalent data, run smoke validation, document deltas, prepare the PR, and release as a new version without overwriting v1.9.7.4.6.

## 6. Required regression matrix

- Monthly Start and Monthly Update, including exact output matrices and ordering.
- Individual formatter paths and source-preservation guarantees.
- Refined sync, re-enrollment, disenrollment twice, zero changes, and rollback injection.
- Governed factory collision and every lifecycle failure boundary.
- Index build, archive sync, checkbox restore, deletion refresh, and inaccessible archive.
- Simple open, manual sync, scheduled sync, trigger ownership, and concurrent execution.
- Dashboard Quality with outputs absent (expected warning) and present (expected pass).
- Before/after timings using equivalent workbook state and row counts.

## 7. Release gate

Do not mark all waves complete until Wave 1 declaration/setup corrections and Wave 2 destructive tests pass. Performance waves may be released separately if their output-equivalence checks pass. The current quality report supports correctness of the observed workbook state, but it does not replace failure-injection, trigger, concurrency, or restore testing.
