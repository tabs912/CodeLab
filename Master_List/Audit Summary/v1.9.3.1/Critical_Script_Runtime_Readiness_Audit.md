# Critical Script Runtime Readiness Audit — v1.9.3.1

**Authoritative source:** `Master_List/Current Production Script/v1.9.3.1`
**Source fingerprint:** SHA-256 `de1c1a0ede86eb0cc260d8df97aa97ff28bbd741fd1c1f3523a6a1a4578f3cdd`
**Scope:** the 1,069-line combined production source, seven labeled modules, merged quality/timing section, and `Master_List/appsscript.json`, reviewed as one Apps Script project.
**Method:** V8 parse validation, exact global/callback reconciliation, unresolved-reference analysis, compact entry-point tracing, destructive-order review, configuration/resource review, and targeted comparison of displayed workflow intent with executable bodies. Live workbook contents, properties, deployments, permissions, quotas, and trigger inventory were unavailable.
**Overall result:** **FAIL**.

## 1. Project Load Readiness

| Check | Reviewed | Pass | Warning | Fail | Not Verified |
|---|---:|---:|---:|---:|---:|
| Source files and modules | 1 combined source / 7 labeled modules | 7 present | 0 | 0 | 0 |
| Syntax and parsing | 1 complete source | 1 | 0 | 0 | 0 |
| Global function definitions | 100 declarations / 100 unique names | 100 | 0 | 0 | 0 |
| Menu callback definitions | 30 registrations / 29 unique names | 28 registrations | 0 | 2 registrations | 0 |
| Project configuration | 1 manifest plus runtime resources | 1 manifest | 1 version mismatch | 0 | 4 runtime groups |

The complete source parses under V8, contains no duplicate function declaration, duplicate lexical constant, merge marker, or truncated final function, and includes all seven labeled modules. This closes the v1.93 duplicate-constant parser defect.

The project is still not runtime-ready. Static analysis found two missing function names, `initTimingClock_` and `flushFrameworkTimingReport_`, used by the timing wrapper, Quick Start-up workflows, and Dashboard Quality workflows. Two additional menu-only callback names—`clearDiagnosticsAndTimingLogs` and `toggleFrameworkTiming`—are registered but absent. Two executable references use undeclared variables: `headers` in `processSingleSubReport_` and `ss` in `buildRefinedDataFromScratch`.

The file is named v1.9.3.1, its banner says “v1.93 governed,” and `MASTER_LIST_MERGE_ML_VERSION` is set to `1.8.9.8.2`. Generated metadata therefore does not identify the reviewed source version correctly.

## 2. Menu and Trigger Readiness

| Menu/Trigger | Callback or Handler | Wrapper/Implementation | Dependencies Present | Blocking Issue | Status |
|---|---|---|---|---|---|
| Format Monthly Sheets | `menuFormatMonthlySheets` | `runFormatterPipeline_` | No | Missing timing initialization/flush; CRR931-005/006 | **FAIL** |
| Hide Monthly Sub-Reports | `hideMonthlyImportSheets` | `hideMonthlySheetsBySpecs_` | No | Missing timing initialization/flush | **FAIL** |
| Archive Monthly Sub-Reports | `archiveMonthlyImportSheets` | `archiveMonthlySheetsBySpecs_` | No/runtime | Missing timing functions; archive access not verified | **FAIL** |
| Hide Monthly Active Sheets | `hideMonthlyActiveSheets` | `hideMonthlySheetsBySpecs_` | No | Missing timing initialization/flush | **FAIL** |
| Archive Monthly Active Sheets | `archiveMonthlyActiveSheets` | `archiveMonthlySheetsBySpecs_` | No/runtime | Missing timing functions; archive access not verified | **FAIL** |
| Hide Templates | `hideTemplates_` | `setReportTemplateVisibility_` | Yes locally | Live templates not verified | **NOT VERIFIED** |
| Show Templates | `showTemplates_` | `setReportTemplateVisibility_` | Yes locally | Live templates not verified | **NOT VERIFIED** |
| Hide System Sheets | `hideSystemSheets_` | Direct visibility loop | Yes locally | Workbook surfaces not verified | **NOT VERIFIED** |
| Show System Sheets | `showSystemSheets_` | Direct visibility loop | Yes locally | Workbook surfaces not verified | **NOT VERIFIED** |
| System Set up | `quickSystemSetup` | Four-step wrapper | No | `initTimingClock_` missing at first statement | **FAIL** |
| Build Templates + Validate | `quickBuildAllTemplates` | Build/validate wrapper | No | `initTimingClock_` missing at first statement | **FAIL** |
| Dashboard Quality Workflow (Quick) | `runDashboardQualityWorkflow` | Quality start-up + template validation | No | Missing timing init/flush | **FAIL** |
| Dashboard Quality Start up | `runDashboardQualityStartUp` | Config verification | No | `flushFrameworkTimingReport_` missing | **FAIL** |
| Dashboard Quality Workflow (Maintenance) | `runDashboardQualityWorkflow` | Quality start-up + template validation | No | Missing timing init/flush | **FAIL** |
| Update Refined Data | `updateRefinedDataMonthlySync` | Prompt + toast | No real implementation | CRR931-007 placeholder | **FAIL** |
| Build Refined Data | `buildRefinedDataFromScratch` | Timed mapping/build | No | Missing timing functions and undefined `ss` | **FAIL** |
| Create / Update Disenrolled List | `createDisenrolledList` | Prompt + success toast | No real implementation | CRR931-007 placeholder | **FAIL** |
| Monthly Change Report | `buildMonthlyChangeReport` | Prompt + success toast | No real implementation | CRR931-007 placeholder | **FAIL** |
| Create Master List | `createMasterList` | Timed mapping/build | No | Missing timing functions; destructive replacement order | **FAIL** |
| Clear Timing Log | `clearDiagnosticsAndTimingLogs` | Missing | No | Registered callback absent | **FAIL** |
| Framework Timing on/off | `toggleFrameworkTiming` | Missing | No | Registered callback absent | **FAIL** |
| Organize Tabs | `organizeTabs` | Rank-based ordering | Yes locally | Runtime sheet population not verified | **NOT VERIFIED** |
| Set up System Sheets | `createActiveSystemSheets` | Template promotion | Runtime-dependent | Required templates not verified | **NOT VERIFIED** |
| Format Dashboard | `menuBuildDashboardTemplate` | `buildFormatDashboardTemplate_` | Partial | Generated governing definitions are incomplete | **FAIL** |
| Save Active Layout as Rebuild Default | `saveActiveLayoutAsRebuildDefault` | Document-property persistence | Yes locally | No read-back verification or restore consumer proven | **WARNING** |
| Create / Refresh All Templates | `createAllReportTemplates` | Eight operational builders | Partial/runtime | Incomplete dashboard definitions can yield headerless templates | **FAIL** |
| Build Index | `populateActiveIndex` | Direct implementation | Yes locally | Archive workspace is not populated | **WARNING** |
| Restore Selected Archive Row | `restoreSheetFromActiveIndexRow` | Local navigation only | Partial | Cannot restore an archived sheet | **WARNING** |
| Configure Restore Web App URL | `configureIndexRestoreWebAppUrl` | Property setter | Runtime-dependent | Cancel selection and URL/deployment validity are not checked | **NOT VERIFIED** |
| Configure Archive Spreadsheet ID | `configureArchiveSpreadsheetId` | Property setter/access test | Runtime-dependent | Correct production target and access not verified | **NOT VERIFIED** |
| Simple open trigger | `onOpen` | Menu builder | Yes | Runtime UI execution not observed | **NOT VERIFIED** |
| Simple edit trigger | `onEdit` | Dashboard recalc/highlight | Yes | Errors are silently swallowed | **WARNING** |

There are 30 menu registrations, 29 unique menu callback names, and two source-defined simple triggers. The two missing registered callbacks are `clearDiagnosticsAndTimingLogs` and `toggleFrameworkTiming`. No installable-trigger builder, resetter, remover, time-driven handler, or web handler exists in source. Deployed trigger state is **NOT VERIFIED**.

First blocking paths:

- Timed workflow → `runFrameworkTimed_` → missing `initTimingClock_`.
- Quality start-up → `flushFrameworkTimingReport_` → missing function.
- Clear/toggle timing menu → missing callback.
- Build Refined Data → timed callback → `ss.getSheetByName` → undefined `ss`.
- Update Refined Data / Disenrolled / Monthly Change → displayed workflow callback → toast-only body → no production processing.

## 3. Required Code Dependencies

| Severity | Caller | Required Component | Type | Module | Problem | Runtime Impact |
|---|---|---|---|---|---|---|
| **Critical** | Two timing menu registrations | `clearDiagnosticsAndTimingLogs`, `toggleFrameworkTiming` | Global callbacks | Module 1 menu | Exact callback names are absent | Two menu items cannot start |
| **High** | `runFrameworkTimed_`, Quick wrappers, quality workflows | `initTimingClock_`, `flushFrameworkTimingReport_` | Timing helpers | Module 1 / quality engine | Both functions are called but undefined | Most destructive/data workflows and all quality workflows halt |
| **High** | `buildRefinedDataFromScratch` | `ss` | Local spreadsheet variable | Module 6, line 957 | No assignment exists in function or enclosing scope | Refined Data build stops after mapping and contact flattening, before sheet creation |
| **Medium** | `processSingleSubReport_` | `headers` | Local variable | Module 5, lines 915–916 | Assignment omits `const`/`let`; it creates or mutates implicit global state in non-strict execution | Cross-run/global contamination risk; strict execution would throw |

All other statically named internal function calls resolve. However, resolution does not establish behavioral completeness: three registered workflows contain only prompts/toasts, and several runtime resources/configuration sections remain unavailable for verification.

## 4. Constants, Configuration, and Required Resources

| Required Item | Type | Required By | Problem | Fallback Available | Status |
|---|---|---|---|---|---|
| Formatter constants and workflow enums | Globals | Formatting/data workflows | Declared once and initialized safely | N/A | Confirmed present |
| Version identifier | Global metadata | Template metadata and diagnostics | Value `1.8.9.8.2` does not match v1.9.3.1 | No | **INVALID** |
| Timing cache | Runtime state | Timed and quality workflows | Cache exists, but init/flush APIs are missing | Partial | **MISSING** |
| Format Dashboard definitions | Worksheet/configuration | Templates and data mapping | Generated default includes only sample Refined Data sheet/header definitions | Partial | **INCOMPLETE** |
| Operational template headers | Configuration/templates | Eight template builders | Header arrays can be empty; builders do not fail validation | No safe validation | **HIGH RISK** |
| `RFF_ARCHIVE_SPREADSHEET_ID` | Document property | Monthly formatter/archive | Hard-coded fallback exists; identity/access are unverified | Partial | **NOT VERIFIED** |
| `REBUILD_DEFAULT_LAYOUT` | Document property | Layout persistence | Writer exists; no restore/read-back consumer is present | No | **INCOMPLETE** |
| `INDEX_RESTORE_WEB_APP_URL` | Document property/deployment | Restore configuration | Writer exists; no restore-link consumer/deployment validation is present | No | **INCOMPLETE** |
| Base/system/operational templates | Worksheets | Setup and format workflows | Creation code exists; live workbook population is unknown | Yes, builder path | **NOT VERIFIED** |
| Source sheets and governed headers | Worksheets/schema | Monthly and roster workflows | Runtime contents unavailable; exact completeness cannot be proven | Partial | **NOT VERIFIED** |
| Apps Script services/scopes | Manifest | Spreadsheet/UI/property operations | Base scopes are declared; no advanced service is used | N/A | Confirmed present statically |
| Locks | Concurrency | Copy/delete, replacement, staged writes | No `LockService` use appears | No | **WARNING** |

## 5. Initialization, Halt, and Failure Risks

| ID | Severity | Entry Point | Function/Module | Halt or Corruption Risk | Evidence | Required Correction |
|---|---|---|---|---|---|---|
| CRR931-001 | **Critical** | Clear/toggle timing menus | Module 1 menu | Entry points cannot start | Two registered callback names are absent | Add exact global callbacks with real clear/toggle behavior or change registrations to approved implementations |
| CRR931-002 | **High** | Timed, Quick, and Quality workflows | Timing engine | Most production workflows halt immediately or on completion | `initTimingClock_` and `flushFrameworkTimingReport_` are undefined at 9 call sites | Implement both functions with cache reset, bounded report writes, and controlled missing-report handling |
| CRR931-003 | **High** | Build Refined Data | Module 6 | Partial in-memory processing precedes halt | `ss` is referenced at line 957 without declaration | Define `const ss = SpreadsheetApp.getActiveSpreadsheet()` before resource access and preserve old output until replacement validates |
| CRR931-004 | **High** | Update Refined, Disenrolled, Monthly Change | Modules 6–7 | Commands claim execution/success without doing required work | Each callback only prompts and toasts | Restore approved implementations or remove/rename menu items; never report success without processing and validation |
| CRR931-005 | **High** | Format Monthly Sheets | Module 5 | Existing output is deleted before replacement is proven | `deleteSheetIfExists_` precedes template copy, writes, date formatting, and archive verification | Build under a staged name; validate and archive; swap only after success; retain prior output on failure |
| CRR931-006 | **High** | Create Master List | Module 7 | Existing Master List is deleted before config, mapping, and replacement succeed | `deleteSheetIfExists_` precedes header load and sheet insertion | Use staged replacement and rollback; validate nonempty headers/data before deleting the prior sheet |
| CRR931-007 | **High** | Dashboard/template workflows | Module 3 | Governing dashboard/templates can be structurally incomplete | Default dashboard contains only Refined Data sample definitions; builders accept empty headers | Restore all governed sections/definitions and fail template creation when required definitions are absent |
| CRR931-008 | **Medium** | Format Monthly Sheets | `processSingleSubReport_` | Implicit global `headers` can leak across executions | Lines 915–916 assign/use `headers` without declaration | Replace with a local `const headers = targetHeaders` or use `targetHeaders` directly |
| CRR931-009 | **Medium** | Layout/restore/index surfaces | Modules 2 and 4 | Saved layout and configured web URL have no proven consumer; Index restore is local-only | Properties are written but not applied; archived rows are not populated/restored | Implement verified consumers or revise menu labels and success messages to reflect supported behavior |
| CRR931-010 | **Medium** | Destructive shared-sheet workflows | Modules 2, 3, 5–7 | Concurrent runs can race during copy, delete, rename, and writes | No document lock and guaranteed release path | Add bounded document locks outside prompts and release them in `finally` |
| CRR931-011 | **Not Verified** | Resource-dependent workflows | Workbook/properties/deployment | Archive target, sheets, schemas, permissions, deployments, and triggers may block execution | Runtime environment unavailable | Run a read-only production preflight and capture evidence before release |

## 6. Final Readiness Certification

| Category | Pass | Warning | Fail | Not Verified |
|---|---:|---:|---:|---:|
| Project files and syntax | 7 modules / parse pass | 0 | 0 | 0 |
| Menus and callbacks | 28 registrations resolve | 0 | 2 registrations | 0 |
| Triggers and handlers | 2 source handlers | Silent-error warning | 0 | Deployed inventory |
| Functions and dependencies | 100 unique declarations | 1 implicit-global issue | 2 missing helpers | 0 |
| Wrappers and helpers | Core shared helpers present | 0 | Timing engine incomplete | 0 |
| Constants and configuration | Core constants present | Version mismatch | Dashboard definition gap | 4 runtime groups |
| Worksheets and templates | Builder paths present | 0 | Validation gap | 3 resource groups |
| Services and permissions | Manifest present | 0 | 0 | Effective grants/access |
| Initialization and cleanup | Timing cache present | No-lock risk | Init/flush missing | 0 |
| Error and halt handling | Archive deletion is copy-gated | Silent catch/implicit global | 7 Critical/High causes | 1 runtime group |

- **Total menu items reviewed:** 30
- **Total triggers reviewed:** 2 source-defined simple triggers; deployed inventory not verified
- **Total production entry points reviewed:** 32
- **Missing function names:** 4 (`initTimingClock_`, `flushFrameworkTimingReport_`, `clearDiagnosticsAndTimingLogs`, `toggleFrameworkTiming`)
- **Undefined variables:** 2 (`ss`, `headers`)
- **Duplicate/conflicting global definitions:** 0
- **Placeholder production callbacks:** 3
- **Confirmed blocking defects:** 7 consolidated Critical/High root causes
- **Conditional runtime risks:** workbook schemas/templates, archive identity/access, properties/deployment, triggers, permissions, locks, quotas, and rollback behavior
- **Items not verifiable from source:** live sheets/headers, document-property values, archive ownership/access, web-app deployment, deployed triggers, effective grants, and production quotas

### Certification: **FAIL**

v1.9.3.1 is syntactically loadable and resolves most prior helper/callback defects, but it is not production-ready. Two missing timing helpers halt most real workflows, two menu callbacks are absent, Build Refined Data references an undefined spreadsheet variable, three displayed production workflows are toast-only placeholders, destructive replacement occurs before successful rebuild, and the generated dashboard lacks the governed definitions required by all workflows. Correct CRR931-001 through CRR931-007, rerun exact static reconciliation against a new versioned candidate, then complete live workbook/deployment preflight before release.
