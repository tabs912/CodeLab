# Script 09 — Post-Upgrade Integrity and Delta Verification

**Status:** COMPLETE (static-source audit)
**Governing prompt:** `Master_List/Prompts/Menu_Trigger_and_Function_Execution_Trace_Review_Prompt (1).docx.md`, Sections 1–12 and modular protocol
**Production source:** the ten `.gs` files in `Master_List/Current Production Script/Modules`
**Declared source version:** `1.8.9.8.4.0` (`MASTER_LIST_MERGE_ML_VERSION`)
**Source fingerprint (SHA-256, filename-sorted concatenation):** `5ee0461c0e722ac55304df8187ff10998b109eda2167306f63cdd4f54af559ab`
**Method:** exhaustive static parsing of named declarations, menu callback strings, and named call occurrences. Google service dispatch, deployed trigger state, workbook contents, permissions, quotas, and runtime-selected data paths are **NOT VERIFIED** without the live Apps Script container.

## Post-Upgrade Integrity Verification Report

| Check | Classification | Evidence / rationale |
|---|---|---|
| Callback existence | FAIL | 10/38 unique callback names resolve; 31 registration paths target missing functions. |
| Trigger-handler existence | PASS | 2/2 source-defined runtime handlers resolve. |
| Wrapper target validation | PASS | 27 static short-wrapper candidates have named targets. |
| Renamed/deleted references | FAIL | 28 registered unique callback names are absent; named calls within parsed bodies resolve. |
| Argument/return compatibility | WARNING | JavaScript permits dynamic arguments; static arity does not prove runtime semantic compatibility. |
| Unexpected termination | WARNING | Service exceptions and explicit throws can terminate paths; see branch/failure catalog. |
| Public/internal exposure | WARNING | Callbacks ending in underscore are registered and therefore intentionally runtime-addressable. |
| Duplicate menu paths | PASS | No duplicated full display path in registration catalog. |
| Duplicate/obsolete triggers | NOT VERIFIED | Container trigger and deployment inventory not supplied. |
| Orphaned wrappers/callbacks/handlers | FAIL | 28 unique registered callbacks cannot be rooted because their declarations are absent. |
| Circular dependency risk | PASS | No direct self-recursion detected; graph expansion marks shared/cyclic revisits. |
| Worksheet/dashboard/template validity | NOT VERIFIED | Live workbook contents and names were not supplied as machine-readable runtime evidence. |
| Validation order | WARNING | Static ordering recorded; runtime branch selection not executed. |
| Timing balance | WARNING | Static timing occurrences recorded; service-exception balance requires injected runtime tests. |
| Lock handling | WARNING | Source lock/busy paths are cataloged; concurrent live execution not tested. |
| Cache invalidation | WARNING | Source property/cache mutations cataloged; live multi-execution behavior not tested. |
| User-notification accuracy | WARNING | Messages are source-recorded but workbook-dependent values were not executed. |

## Upgrade Delta Report

**NOT APPLICABLE.** No prior approved modular baseline was supplied. The earlier monolithic audit in the governing prompt targets source version 1.8.9.8.1 and is not treated as an approved like-for-like modular baseline.

## Defect and Risk Register

| ID | Severity | Classification | Finding | Required verification/remediation |
|---|---|---|---|---|
| MTF-000 | Critical | FAIL | 28 unique registered menu callback declarations are absent from the modular source (31 registration paths). | Restore/export the missing production modules or correct registrations, then repeat the audit. |
| MTF-001 | High | NOT VERIFIED | Live workbook schema, Dashboard, Format Dashboard, templates, named sheets, permissions, and archive destination were not executed. | Run all traces on a disposable workbook copy and reconcile results. |
| MTF-002 | Medium | NOT VERIFIED | Container trigger and deployment inventories are absent. | Export Apps Script triggers and deployments; reconcile owners, handlers, and versions. |
| MTF-003 | Medium | WARNING | Workflows can partially complete after writes if a later service call throws; Apps Script provides no automatic transaction rollback. | Use a disposable copy, inject failures, and verify recovery/idempotency. |
| MTF-004 | Medium | WARNING | Dynamic JavaScript argument semantics cannot be fully certified by static arity checks. | Exercise every callback with representative and boundary data. |
| MTF-005 | Low | WARNING | Timing, cache, lock, and notification behavior remains runtime-dependent. | Run concurrent and failure-injection tests and reconcile logs. |

## Reconciliation

- PASS: **4**
- WARNING: **8**
- FAIL: **3**
- NOT APPLICABLE: **1**
- NOT VERIFIED: **4** (including risk-register external-evidence items)
