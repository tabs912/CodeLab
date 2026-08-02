# Recommended Corrections — v1.92 Critical Script Runtime Readiness

**Source audit:** `Critical_Script_Runtime_Readiness_Audit.md`
**Applicable production source:** `Master_List/Current Production Script/v1.92 Module.txt`
**Audit source fingerprint:** SHA-256 `4e1c371e82a4f30ad3cad98f349496d657e8e905b3ccdbf4052f9cfe1635e145`
**Purpose:** convert RR-001 through RR-010 into an ordered, minimal-diff remediation plan. This document recommends corrections only; it does not authorize overwriting v1.92 or changing approved business logic.

## 1. Release Strategy

Create a new versioned production candidate from v1.92. Do not edit the existing release in place. Apply corrections in the dependency order below because later workflows cannot be meaningfully validated until project loading and shared dependencies are restored.

| Wave | Audit IDs | Objective | Release Gate |
|---|---|---|---|
| 1 | RR-001 | Restore project loading | Complete source evaluates; `onOpen` builds the menu |
| 2 | RR-003, RR-004 | Restore required shared/template dependencies | No required unresolved references remain |
| 3 | RR-002, RR-007, RR-008 | Restore truthful public/menu entry points | Every registered callback exists and reports real outcomes |
| 4 | RR-005 | Establish one month-context contract | All month workflows use the prompted month consistently |
| 5 | RR-006, RR-009 | Protect archive, delete, rename, and staged operations | No deletion without confirmed archive; concurrency controls pass |
| 6 | RR-010 | Validate live resources and deployment | Workbook, properties, scopes, and triggers pass preflight |

## 2. Required Source Corrections

### RC-001 — Replace the self-referential formatter constants

**Addresses:** RR-001.
**Location:** Module 5, audited lines 2434–2436.

Replace each temporal-dead-zone initializer with a direct default or a differently named configuration lookup. Do not read a `const` from its own initializer.

Recommended design:

```javascript
const BANNER_PREFIX = "Banners";
const CARE_PLAN_DUE_PREFIX = "CP Due Date";
const UNLOCKED_PREFIX = "Unlock CP";
```

If runtime overrides are required, load them into a separate object first, validate them, and then initialize the constants from that object. Do not use undeclared globals as an override mechanism.

**Acceptance criteria:** the complete combined source evaluates without `ReferenceError`; both `onOpen` and `onEdit` are discoverable; the menu is created in a clean workbook session.

### RC-002 — Restore the shared helper population as one governed module

**Addresses:** RR-003.
**Affected modules:** 5–7.

Restore the 23 required helpers as complete, tested implementations—not placeholders. Use the last approved production implementations only after comparing signatures and callers against v1.92:

`getDataValues_`, `getPMRIndex_`, `findHeaderIndex_`, `normalizePMR_`, `isPrimaryPMRRowValue_`, `normalizeCompareValue_`, `normalizeToDateObject_`, `valuesAreEqual_`, `mapRowsToHeaders_`, `buildHeaderIndexMap_`, `getHeaders_`, `padRowToWidth_`, `normalizeRowsToWidth_`, `formatReportDateLabel_`, `buildMonthlySheetName_`, `getLatestSheetByPrefix_`, `getCurrentRawDataSheet_`, `getCurrentDemoPSheet_`, `getCurrentCarePlanDueSheet_`, `getCurrentUnlockedCarePlanSheet_`, `safeSheetName_`, `setRequiredSheetName_`, and `ensureOutputSheetHasFormattedRows_`.

Before insertion, verify for every helper:

1. Parameter count, order, optional values, and default behavior match every v1.92 caller.
2. Return shapes match consumer expectations, especially `{ values, headers, headerMap }`, zero-based column indexes, and `Date` values.
3. Sheet resolvers reject templates and select the prompted month rather than merely the latest matching sheet.
4. PMR normalization preserves the approved identifier format and does not coerce distinct identifiers into one key.
5. Range helpers validate positive dimensions and expand the grid before writes.

Keep these helpers in one shared module loaded before workflow modules. Do not duplicate them inside Modules 5, 6, and 7.

**Acceptance criteria:** an exact unresolved-reference scan reports none of these names missing; focused tests pass for empty sheets, missing headers, duplicate PMRs, invalid dates, narrow rows, and prompted-month selection.

### RC-003 — Restore dashboard template configuration and metadata contracts

**Addresses:** RR-004.
**Location:** Module 3.

Implement `getTemplateConfigFromDashboard_` as an adapter over the existing dashboard loader. It must return a validated configuration containing, at minimum, the fields consumed by `buildGeneralTemplate_`: `systemSheetName`, `templateName`, `reportTitle`, `sheetType`, headers/column count, minimum rows, theme, rank, subheader behavior, column definitions, and alternating-color behavior.

Implement `writeTemplateMetadata_` with the currently called signature `(templateSheet, config, targetCols)`. It must validate the sheet and configuration before writing. If metadata is no longer governed, remove the call only after documenting and approving that behavior change.

Wrap template construction so a failure after sheet creation either restores the previous template or deletes the incomplete replacement. Do not delete a working template before the replacement is fully built and validated.

**Acceptance criteria:** Format Dashboard, all system templates, and all eight operational templates build successfully; each output has governed metadata, headers, dimensions, visibility, and tab placement; injected failures leave the prior template intact.

### RC-004 — Restore exact Dashboard Quality callbacks

**Addresses:** RR-002 and part of RR-007.
**Registered names:** `runDashboardQualityWorkflow` and `runDashboardQualityStartUp`.

Add globally accessible callbacks using these exact names, or change every registration to exact approved replacement names. Preserve any existing external/API compatibility wrappers. Each callback must call a real implementation and return or report a structured result; it must not be a toast-only placeholder.

Also implement or intentionally replace `runDashboardQualityValidateTemplates`, which `quickBuildAllTemplates` currently treats as optional even though validation is part of the displayed command.

**Acceptance criteria:** all three Dashboard Quality menu registrations resolve; start-up and validation failures propagate to their callers; a failing quality step prevents a success notification.

### RC-005 — Make Quick Start-up wrappers fail closed

**Addresses:** RR-007.

Replace `typeof`-and-skip behavior for required steps with explicit dependency validation at the start of each wrapper. Collect results from every step and notify success only when every required step succeeds. On cancellation, return a cancellation result. On failure, identify the failed step, preserve the original error, and stop dependent steps.

Recommended result contract:

```javascript
{
  status: "SUCCESS" | "CANCELLED" | "FAILED",
  completedSteps: [],
  failedStep: "",
  warnings: []
}
```

**Acceptance criteria:** removing any required dependency produces a controlled failure, not “complete”; step order is deterministic; timing completion is written for success, cancellation, and failure.

### RC-006 — Replace the layout-save placeholder with persistence

**Addresses:** RR-008.
**Function:** `saveActiveLayoutAsRebuildDefault`.

Implement the approved persistence behavior: read the active governed layout, validate supported settings, write them to the designated dashboard/default configuration surface in a batch, reload configuration, and compare persisted values to the captured values. Notify success only after verification.

If layout persistence is not approved for v1.92, remove the menu item or rename it to state that it is unavailable. A toast claiming the layout was saved is not an acceptable implementation.

**Acceptance criteria:** a saved setting survives cache clearing and a new execution; unsupported values are rejected without partial writes; failed verification reports failure.

### RC-007 — Consolidate the month prompt and context API

**Addresses:** RR-005.
**Duplicated names:** `promptForLockedYearReportMonth_` and `buildPromptedMonthContext_`.

Retain one definition of each function. The prompt must return either `null` on cancellation or one validated context object with this stable shape:

```javascript
{
  month: 1,
  year: 2026,
  mm: "01",
  yy: "26",
  label: "01.26",
  monthLabel: "01.26",
  reportDate: new Date(2026, 0, 1),
  firstDay: new Date(2026, 0, 1),
  lastDay: new Date(2026, 1, 0)
}
```

Reject invalid month values and unsupported years rather than silently defaulting to January 2026. Update callers so none reparses an already-built context object. Remove the four other identical duplicate helper definitions after confirming all dynamic references and callers.

**Acceptance criteria:** inputs `01.26`, `12/26`, cancellation, month `00`, month `13`, blank input, and malformed text have explicit expected outcomes; every monthly output and resolver uses the selected month.

### RC-008 — Require confirmed archive success before deletion

**Addresses:** RR-006.

Implement `openArchiveSpreadsheetOnce_` using the validated document property. Do not silently convert connection failure to `null` when archiving is required. Make the archive helper return a structured confirmation containing destination spreadsheet ID, copied sheet ID/name, and verification status.

Change the sequence to:

1. Validate archive configuration and access.
2. Copy the source sheet.
3. Resolve destination-name collisions deterministically.
4. Verify the copied sheet exists and has expected dimensions.
5. Record successful archive confirmation.
6. Only then delete the local source when the route permits deletion.

If auto-archive is disabled, require an explicit approved policy for whether local deletion is allowed. The default must be non-destructive.

**Acceptance criteria:** invalid ID, permission denial, copy failure, rename collision, verification failure, and quota error all preserve the local source sheet; only a verified copy permits deletion.

### RC-009 — Add concurrency protection and guaranteed cleanup

**Addresses:** RR-009.

Use a document lock for archive/delete, template replacement, staged Master List promotion, and other shared-sheet mutations. Acquire the lock before the first mutation, use a bounded wait, and release it in `finally`. Do not hold the lock during user prompts.

For staged replacements, retain the previous production sheet until the new sheet has passed validation. On failure, delete only the staged artifact and preserve the prior sheet. Clear workflow-busy state and runtime caches in guaranteed cleanup paths.

**Acceptance criteria:** concurrent invocation is rejected or serialized cleanly; forced exceptions release the lock; no staged sheet or busy flag remains after failure.

## 3. Runtime and Deployment Corrections

### RC-010 — Add a production preflight

**Addresses:** RR-010.

Create one read-only preflight used before setup and destructive workflows. It should validate:

- Archive spreadsheet property, file identity, and executing-user access.
- Format Dashboard structure and all required configuration sections.
- `RFF_BASE_TEMPLATE`, system templates, and operational templates.
- Required source sheets, headers, and column definitions for the selected workflow.
- Manifest scopes and the absence of undeclared advanced-service requirements.
- Current deployed trigger inventory and handler names.
- Restore web-app URL format and deployment availability, when restore links are enabled.

Return a structured report and block only the workflows affected by failed requirements. Do not create or delete resources during preflight.

### RC-011 — Complete conditional behavior cleanup

After required corrections pass, review the 16 remaining `typeof`-guarded missing helpers. For each one, choose exactly one outcome:

1. Restore it because the behavior is required.
2. Replace it with an approved in-module implementation.
3. Remove the call and document that the behavior is intentionally unsupported.

Do not retain silent optional calls for governed formatting, output visibility, tab placement, archive indexing, or quality validation. These omissions currently allow incomplete results to appear successful.

## 4. Verification Matrix

| Gate | Exact Verification | Required Result |
|---|---|---|
| Static parse | Parse the complete new version under V8 syntax | No syntax error |
| Global load | Evaluate global initializers in an Apps Script test container | No initialization exception |
| Reference reconciliation | Compare direct calls, callback strings, triggers, and dynamic references with declarations | Zero required unresolved references |
| Duplicate check | Compare all global declarations | No conflicting duplicate; approved compatibility aliases only |
| Menu check | Open workbook and invoke all 30 menu registrations in a test copy | Every callback resolves; cancellation and preflight paths behave correctly |
| Trigger check | Exercise `onOpen` and `onEdit`; inspect deployed triggers | Correct handler, event compatibility, no duplicate deployment |
| Month contract | Run all month-driven workflows for boundary and invalid inputs | Selected month is preserved throughout |
| Template check | Build dashboard, system, and eight operational templates | Governed metadata/layout present; no partial replacement |
| Archive safety | Inject connection, copy, rename, permission, and quota failures | Local source is never deleted without verified archive |
| Concurrency | Start overlapping destructive workflows | Serialized/rejected safely; locks always released |
| Recovery | Inject failures after staging and before promotion | Prior production sheet survives; staged artifacts cleaned |
| Resource preflight | Run against the production-configured test workbook | All required sheets, headers, IDs, properties, scopes, and deployments verified |

## 5. Closure Criteria

The readiness audit may be closed only when all of the following are true:

- RR-001 through RR-008 have code corrections in a new versioned production candidate.
- RR-009 concurrency controls have passed forced-error testing.
- RR-010 runtime evidence is captured from the target workbook and deployment.
- No required menu callback, trigger handler, helper, wrapper, validator, logger, timing function, configuration resolver, or resource resolver is unresolved.
- All success messages are conditioned on verified completion.
- Destructive operations validate inputs, destination access, and successful predecessor steps.
- The complete static readiness audit is rerun against the final candidate's new SHA-256 fingerprint and returns `PASS` or an explicitly approved `PASS WITH WARNINGS`.

## Recommended Implementation Order

1. RC-001 — project load.
2. RC-002 and RC-003 — required dependency restoration.
3. RC-004 through RC-006 — callback and public-contract integrity.
4. RC-007 — month API consolidation.
5. RC-008 and RC-009 — destructive-operation safety.
6. RC-010 and RC-011 — live preflight and conditional cleanup.
7. Execute the verification matrix, issue a new source fingerprint, and rerun the readiness audit.
