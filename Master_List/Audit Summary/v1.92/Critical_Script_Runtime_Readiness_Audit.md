# Critical Script Runtime Readiness Audit — v1.92

**Authoritative source:** `Master_List/Current Production Script/v1.92 Module.txt`
**Source fingerprint:** SHA-256 `4e1c371e82a4f30ad3cad98f349496d657e8e905b3ccdbf4052f9cfe1635e145`
**Scope:** the 4,295-line combined production source, its seven labeled modules, and `Master_List/appsscript.json`, reviewed as one Apps Script project.
**Method:** parse validation, exact function/callback reconciliation, duplicate-global comparison, unresolved-reference analysis, targeted entry-point tracing, and manifest/resource review. Runtime workbook contents, deployed trigger inventory, permissions, properties, and quotas were not available.
**Overall result:** **FAIL**.

## 1. Project Load Readiness

| Check | Reviewed | Pass | Warning | Fail | Not Verified |
|---|---:|---:|---:|---:|---:|
| Source files and modules | 1 combined source / 7 labeled modules | 6 | 0 | 1 | 0 |
| Syntax and parsing | 1 complete source | 1 | 0 | 0 | 0 |
| Global definitions | 182 declarations / 176 unique names | 170 | 4 | 2 | 0 |
| Project configuration | 1 manifest plus runtime properties | 1 | 0 | 0 | 3 |

The source parses under the V8 JavaScript grammar and contains no merge markers, empty labeled module, or unterminated construct. It is not load-ready: lines 2434–2436 declare `BANNER_PREFIX`, `CARE_PLAN_DUE_PREFIX`, and `UNLOCKED_PREFIX` as `const` values while reading the same lexical binding in each initializer. The temporal-dead-zone `ReferenceError` occurs during global evaluation, before `onOpen` or any callback can execute.

Module 1 is also functionally incomplete. The combined source omits the shared data/date/header helper block required throughout Modules 5–7. Static reconciliation found 45 unique unresolved identifiers: two optional configuration symbols and 43 function names. Twenty-five missing function names are reached by at least one unguarded production path. Of the 18 names referenced only behind `typeof` guards, two are nevertheless required by menu registrations; the other 16 represent unavailable optional behavior.

Six function names are declared twice. Four pairs (`hideSheetIfNeeded_`, `showSheetIfNeeded_`, `activateVisibleSheetBeforeHiding_`, and `extractFirstDateFromSheetName_`) are textually duplicative cleanup risks. The two month API pairs are behaviorally conflicting and are reported in RR-005.

## 2. Menu and Trigger Readiness

The table evaluates each entry's first local blocker; **RR-001 currently blocks the entire project before all entries**. “Pass after load fix” does not override the overall failure.

| Menu/Trigger | Callback or Handler | Wrapper/Implementation | Dependencies Present | Blocking Issue | Status |
|---|---|---|---|---|---|
| Format Monthly Sheets | `menuFormatMonthlySheets` | `runFormatterPipeline_` | No | RR-003, RR-006 | **FAIL** |
| Hide Monthly Sub-Reports | `hideMonthlyImportSheets` | `hideMonthlySheetsBySpecs_` | Yes | Global RR-001 only | Pass after load fix |
| Archive Monthly Sub-Reports | `archiveMonthlyImportSheets` | `archiveMonthlySheetsBySpecs_` | Runtime-dependent | Archive ID/access not verified | **NOT VERIFIED** |
| Hide Monthly Active Sheets | `hideMonthlyActiveSheets` | `hideMonthlySheetsBySpecs_` | Yes | Global RR-001 only | Pass after load fix |
| Archive Monthly Active Sheets | `archiveMonthlyActiveSheets` | `archiveMonthlySheetsBySpecs_` | Runtime-dependent | Archive ID/access not verified | **NOT VERIFIED** |
| Hide Templates | `hideTemplates_` | `hideReportTemplates` | Yes | Global RR-001 only | Pass after load fix |
| Show Templates | `showTemplates_` | `showReportTemplates` | Yes | Global RR-001 only | Pass after load fix |
| Hide System Sheets | `hideSystemSheets_` | `hideSystemSheetsNow` | Yes | Global RR-001 only | Pass after load fix |
| Show System Sheets | `showSystemSheets_` | `showSystemSheetsNow` | Yes | Global RR-001 only | Pass after load fix |
| System Set up | `quickSystemSetup` | Four-step wrapper | No | RR-002, RR-007 | **FAIL** |
| Build Templates + Validate | `quickBuildAllTemplates` | Build/validate wrapper | No | RR-004, RR-007 | **FAIL** |
| Dashboard Quality Workflow (Quick) | `runDashboardQualityWorkflow` | Missing | No | RR-002 | **FAIL** |
| Dashboard Quality Start up | `runDashboardQualityStartUp` | Missing | No | RR-002 | **FAIL** |
| Dashboard Quality Workflow (Maintenance) | `runDashboardQualityWorkflow` | Missing | No | RR-002 | **FAIL** |
| Update Refined Data | `updateRefinedDataMonthlySync` | Refined-data workflow | No | RR-003, RR-005 | **FAIL** |
| Build Refined Data | `buildRefinedDataFromScratch` | Refined-data workflow | No | RR-003, RR-005 | **FAIL** |
| Create / Update Disenrolled List | `createDisenrolledList` | Disenrollment workflow | No | RR-003 | **FAIL** |
| Monthly Change Report | `buildMonthlyChangeReport` | Monthly-change workflow | No | RR-003, RR-005 | **FAIL** |
| Create Master List | `createMasterList` | Master-list workflow | No | RR-003, RR-005 | **FAIL** |
| Clear Timing Log | `clearDiagnosticsAndTimingLogs` | Direct implementation | Yes | Global RR-001 only | Pass after load fix |
| Framework Timing on/off | `toggleFrameworkTiming` | Direct toast-only implementation | Partial | Does not persist a timing state | **WARNING** |
| Organize Tabs | `organizeTabs` | Section-F rules | Yes | Global RR-001 only | Pass after load fix |
| Set up System Sheets | `createActiveSystemSheets` | Template promotion | Runtime-dependent | Required templates not verified | **NOT VERIFIED** |
| Format Dashboard | `menuBuildDashboardTemplate` | `buildFormatDashboardTemplate_` | No | RR-004 | **FAIL** |
| Save Active Layout as Rebuild Default | `saveActiveLayoutAsRebuildDefault` | Toast only | No | RR-008 | **FAIL** |
| Create / Refresh All Templates | `createAllReportTemplates` | Operational builders | No | RR-004 | **FAIL** |
| Build Index | `populateActiveIndex` | `populateIndexData` | Partial | Optional grid/banding/width helpers absent | **WARNING** |
| Restore Selected Archive Row | `restoreSheetFromActiveIndexRow` | Local navigation only | Yes | Archive restore is not implemented by this callback | **WARNING** |
| Configure Restore Web App URL | `configureIndexRestoreWebAppUrl` | Property prompt | Runtime-dependent | Deployment URL validity not checked | **NOT VERIFIED** |
| Configure Archive Spreadsheet ID | `configureArchiveSpreadsheetId` | Property prompt/access check | Runtime-dependent | Permission and target correctness require live check | **NOT VERIFIED** |
| Simple open trigger | `onOpen` | Menu builder | No | RR-001 prevents handler execution | **FAIL** |
| Simple edit trigger | `onEdit` | Dashboard recalc/highlight | No | RR-001 prevents handler execution | **FAIL** |

There are 30 menu registrations, 29 unique menu callback names, and two source-defined simple-trigger handlers. No installable-trigger creator, resetter, remover, time-driven handler, web handler, or manifest-declared advanced service is present. Deployed installable triggers are **NOT VERIFIED**.

Failed paths stop at these first components:

- Dashboard Quality menu → `runDashboardQualityWorkflow` / `runDashboardQualityStartUp` → **missing callback**.
- Template menus → `createAllReportTemplates` / `buildFormatDashboardTemplate_` → `getTemplateConfigFromDashboard_` or `writeTemplateMetadata_` → **missing helper**.
- Refined/Master List/Monthly Change menus → implementation → shared data/date/header helper → **missing helper block**.

## 3. Required Code Dependencies

| Severity | Caller | Required Component | Type | Module | Problem | Runtime Impact |
|---|---|---|---|---|---|---|
| **Critical** | Three menu registrations | `runDashboardQualityWorkflow`, `runDashboardQualityStartUp` | Global callbacks | Module 1, lines 59, 62–63 | Exact registered callback names are absent | Three menu selections cannot start |
| **High** | Modules 5–7 production workflows | Shared data/date/header helper block | 23 unguarded helper names | Modules 1, 5–7 | Functions including `getDataValues_`, `getPMRIndex_`, `normalizePMR_`, `buildHeaderIndexMap_`, `formatReportDateLabel_`, `getCurrentRawDataSheet_`, and `buildMonthlySheetName_` are called but absent | Refined Data, Disenrollment, Master List, Monthly Change, and formatting paths halt with `ReferenceError` |
| **High** | General/system/operational template builders | `getTemplateConfigFromDashboard_`, `writeTemplateMetadata_` | Configuration/metadata helpers | Module 3, lines 1225 and 1478–1494 | Both helpers are unguarded and undefined | Template workflows stop after no build or a partial build |
| **High** | Quick setup/build wrappers | Dashboard quality start-up and validation implementations | Validator/workflow functions | Module 1, lines 119–135 | Missing functions are hidden behind `typeof`; wrappers continue and announce completion | Users receive false success while required quality validation never runs |
| **Medium** | Index and formatting surfaces | Grid, banding, widths, ordering, and visibility helpers | Optional helpers | Modules 3–6 | Multiple `typeof`-guarded helpers are absent | Execution may continue with incomplete layout, formatting, placement, or visibility enforcement |

The missing 23-function shared block is consolidated rather than repeated. Its affected direct names are: `getDataValues_`, `getPMRIndex_`, `findHeaderIndex_`, `normalizePMR_`, `isPrimaryPMRRowValue_`, `normalizeCompareValue_`, `normalizeToDateObject_`, `valuesAreEqual_`, `mapRowsToHeaders_`, `buildHeaderIndexMap_`, `getHeaders_`, `padRowToWidth_`, `normalizeRowsToWidth_`, `formatReportDateLabel_`, `buildMonthlySheetName_`, `getLatestSheetByPrefix_`, `getCurrentRawDataSheet_`, `getCurrentDemoPSheet_`, `getCurrentCarePlanDueSheet_`, `getCurrentUnlockedCarePlanSheet_`, `safeSheetName_`, `setRequiredSheetName_`, and `ensureOutputSheetHasFormattedRows_`.

## 4. Constants, Configuration, and Required Resources

| Required Item | Type | Required By | Problem | Fallback Available | Status |
|---|---|---|---|---|---|
| Three formatter prefixes | Global constants | `FORMATTER_ROUTES` | Self-referential initialization throws | No | **MISSING/INVALID** |
| `GLOBAL_DEFAULTS`, `HEADER_ROW`, `DATA_START_ROW`, formatter and workflow enums | Constants/configuration | All modules | Present before use | Yes where coded | Confirmed present |
| `RFF_ARCHIVE_SPREADSHEET_ID` | Document property | Archive workflows | Runtime value/access unavailable; one workflow uses a hard-coded fallback | Partial | **NOT VERIFIED** |
| `INDEX_RESTORE_WEB_APP_URL` | Document property | Restore-link configuration | Setter exists; deployment and consumer path are not proven | No | **NOT VERIFIED** |
| Format Dashboard and dashboard definitions | Worksheet/configuration | Template and formatting engines | Loader has fallback, but workbook content and required definitions are unavailable | Partial | **NOT VERIFIED** |
| `RFF_BASE_TEMPLATE` and `Template - …` sheets | Worksheets/templates | Formatting, system setup, report creation | Creation paths are broken by RR-004; live sheets are unknown | Partial | **NOT VERIFIED** |
| Source report sheets and governed headers | Worksheets/headers | Monthly and roster workflows | Names and headers are runtime data; missing shared resolvers prevent normal validation | Partial | **NOT VERIFIED** |
| Apps Script services/scopes | Manifest authorization | Spreadsheet, UI, properties | Spreadsheet/UI/storage scopes are declared; no advanced service is referenced | N/A | Confirmed present statically |
| Locks and caches | Concurrency/runtime state | Destructive and multi-step workflows | No lock service protects archive/delete or staged workbook workflows | No | **WARNING** |

## 5. Initialization, Halt, and Failure Risks

| ID | Severity | Entry Point | Function/Module | Halt or Corruption Risk | Evidence | Required Correction |
|---|---|---|---|---|---|---|
| RR-001 | **Critical** | Entire project | Module 5 globals, lines 2434–2436 | Project can fail before initialization | Each `const` reads itself in its temporal dead zone | Replace self-references with direct defaults or differently named configuration inputs |
| RR-002 | **Critical** | Three Dashboard Quality menu registrations | Module 1 menu/wrappers | Registered entry points are absent | No definitions for `runDashboardQualityWorkflow` or `runDashboardQualityStartUp` | Restore exact global callbacks and their approved implementations |
| RR-003 | **High** | Format, Refined, Disenrollment, Master List, Monthly Change | Modules 5–7 | Workflows halt at missing core helpers | Twenty-three unguarded shared helper names have callers but no definitions | Restore the complete shared helper module and rerun exact unresolved-reference validation |
| RR-004 | **High** | Dashboard and all template builds | Module 3 | Template creation halts or leaves partial sheets | `getTemplateConfigFromDashboard_` and `writeTemplateMetadata_` are absent | Implement both contracts and add failure cleanup around partial template creation |
| RR-005 | **High** | Month-driven workflows | Duplicate functions, lines 391–419 and 1025–1053 | Wrong month, undefined fields, or misnamed outputs | Later prompt returns raw text instead of the earlier context object; later context omits `label`, `mm`, and `yy` | Retain one prompt/context API with one object contract and update all callers |
| RR-006 | **High** | Format Monthly Sheets | Module 5, lines 2463–2466 and 2594–2603 | Imported source can be deleted without confirmed archive copy | Missing `openArchiveSpreadsheetOnce_` yields `null`; archive is skipped but `deleteSheetSafely_` still runs for three routes | Require confirmed archive success before local deletion when auto-archive is enabled |
| RR-007 | **High** | Quick System Setup / Quick Build | Module 1, lines 111–139 | Required quality work is silently skipped while success is reported | `typeof` guards suppress absent start-up/validation functions | Treat missing required steps as errors; notify success only after verified completion |
| RR-008 | **High** | Save Active Layout as Rebuild Default | Module 2, lines 1104–1106 | User is told configuration was saved when no persistence occurs | Function contains only a toast | Implement the required persistence and verification, or remove/rename the misleading menu item |
| RR-009 | **Medium** | Archive/delete and staged workflows | Modules 2, 5–7 | Concurrent runs can race during sheet copy, rename, delete, and staged promotion | No `LockService` use is present | Add document-lock acquisition and release in `finally` around destructive critical sections |
| RR-010 | **Not Verified** | Resource-dependent workflows | Workbook/properties/deployment | Missing sheets, IDs, access, or deployment can halt execution | Runtime resources were unavailable | Run preflight validation in the target workbook and record deployed trigger/property/resource evidence |

## 6. Final Readiness Certification

| Category | Pass | Warning | Fail | Not Verified |
|---|---:|---:|---:|---:|
| Project files and syntax | 1 | 0 | 1 | 0 |
| Menus and callbacks | 27 | 0 | 3 registrations | 0 |
| Triggers and handlers | 0 | 0 | 2 | Deployed inventory |
| Functions and dependencies | 176 declared | 16 optional missing | 27 required missing | 0 |
| Wrappers and helpers | 0 | 1 consolidated optional group | 4 consolidated required groups | 0 |
| Constants and configuration | 5 groups | 0 | 1 group | 2 properties |
| Worksheets and templates | 0 | 0 | Creation paths | 3 resource groups |
| Services and permissions | 1 manifest | 0 | 0 | Runtime grants/access |
| Initialization and cleanup | 0 | 1 | 3 root causes | 0 |
| Error and halt handling | 0 | 1 | 8 blocking root causes | 1 runtime group |

- **Total menu items reviewed:** 30
- **Total triggers reviewed:** 2 source-defined simple triggers; deployed trigger inventory not verified
- **Total production entry points reviewed:** 32
- **Missing functions:** 43 referenced function names (25 reached unguarded, 2 additional registered callbacks, and 16 guarded/optional)
- **Missing wrappers:** 0 separately confirmed; wrapper behavior failures are consolidated in RR-007 and RR-008
- **Missing helpers:** 41 referenced helper/implementation names after excluding the two missing menu callbacks
- **Missing constants or configuration values:** 0 required symbols confirmed absent; 3 constants are invalidly initialized and 2 runtime properties are not verified
- **Broken cross-module references:** 25 unique unguarded function names, consolidated into required helper groups
- **Conflicting global definitions:** 2 behaviorally conflicting month API names; 4 additional identical duplicate names
- **Confirmed blocking defects:** 8 consolidated Critical/High root causes
- **Conditional runtime risks:** archive access, workbook surfaces, deployment/property state, permissions, concurrency, and quotas
- **Items not verifiable from source:** deployed triggers, live sheets/templates/headers, document-property values, archive ownership/access, web-app deployment, effective authorization grants, and production quotas

### Certification: **FAIL**

The current v1.92 combined source is not runtime-ready. RR-001 can prevent the project from loading at all. After that is corrected, missing callbacks, an omitted shared-helper population, broken template dependencies, incompatible duplicate month APIs, and unsafe archive/delete sequencing can still prevent or corrupt primary workflows. Correct RR-001 through RR-008, rerun static reconciliation against the exact assembled release, then complete live workbook and trigger preflight before deployment.
