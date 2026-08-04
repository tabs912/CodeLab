# Critical Script Runtime Readiness Audit — Corrected v1.93

**Authoritative source:** `Master_List/Current Production Script/v1.93`
**Current source SHA-256:** `536afc22a2e6a0fbcd6a8ca3b2210d44a1f848e8a0c59551357622c9ba03a15e`
**Comparison source:** `Master_List/Current Production Script/v1.8_Prior`
**Comparison SHA-256:** `0264e58b81bcde4f77a1d8319b0e91451d2e74f5da6d6b1adb6a420fe8cc0b89`
**Scope:** corrected v1.93 as one Apps Script project, plus process parity against every v1.8 registered menu command and runtime entry point.
**Method:** V8 parse, exact declaration/callback reconciliation, unresolved-reference linting, duplicate-global review, compact entry-point tracing, destructive-order review, and source-static v1.8 process mapping. Live spreadsheet state, properties, permissions, deployments, quotas, and trigger inventory were unavailable.
**Overall result:** **PASS WITH WARNINGS**.

## 1. Project Load Readiness

| Check | Reviewed | Pass | Warning | Fail | Not Verified |
|---|---:|---:|---:|---:|---:|
| Source files/modules | 1 combined source / 7 modules | 7 | 0 | 0 | 0 |
| Syntax and parsing | 4,903 lines | 1 | 0 | 0 | 0 |
| Global functions | 242 declarations | 242 unique | 0 | 0 | 0 |
| Menu callbacks | 41 registrations / 40 unique names | 41 | 0 | 0 | 0 |
| Runtime entry points | `onOpen`, `onEdit`, `doGet` | 3 | 0 | 0 | Deployed state |
| Project configuration | Manifest plus runtime resources | Manifest | Runtime preflight | 0 | 5 resource groups |

The corrected v1.93 parses under V8 and has no unresolved identifier, missing registered callback, conflicting function definition, duplicate lexical constant, merge marker, or truncated function. Static initializer, menu, timing, archive, dashboard backup/restore, quality, Refined Data, Disenrollment, Master List, Monthly Change, and web restore paths are present.

The comparison definition of a **process** is intentionally bounded to the 40 v1.8 menu registrations and the three v1.8 runtime entry points. v1.8 contains 684 internal functions, many of which are implementation helpers rather than independent production processes. v1.93 consolidates helpers; this audit certifies entry-process coverage, not one-for-one private-helper retention.

## 2. Current Menu and Trigger Readiness

| Category | Registered/Defined | Callback Resolution | Dependency Status | Result |
|---|---:|---|---|---|
| Data & Processing Engine | 3 | Complete | Static dependencies present | **PASS** |
| Sheet & Layout Management | 8 | Complete | Archive resources runtime-dependent | **PASS WITH WARNING** |
| Quick Start-up | 3 | Complete | Fail-closed quality dependencies present | **PASS** |
| Maintenance Quality | 6 | Complete | Dashboard/report sheets runtime-dependent | **PASS WITH WARNING** |
| Individual Format Sheets | 4 | Complete | Source/templates/archive runtime-dependent | **PASS WITH WARNING** |
| Data Processing | 5 | Complete | Source sheets/headers runtime-dependent | **PASS WITH WARNING** |
| System Maintenance | 3 | Complete | Timing property defaults safely | **PASS** |
| Start-up | 6 | Complete | Saved dashboard property may not exist initially | **PASS WITH WARNING** |
| Index | 4 | Complete | Archive ID/web deployment runtime-dependent | **PASS WITH WARNING** |
| Simple/web entry points | 3 | Complete | Deployment/event state not source-verifiable | **NOT VERIFIED** |

All menu callback strings resolve exactly. Quick Start-up throws when required quality functions are absent. Timed workflows acquire a document lock after user prompting and release it in `finally`. The formatter deletes imported source sheets only after explicit archive verification. Dashboard backup and restore callbacks are both registered.

## 3. v1.8 Process-to-v1.93 Comparison

| # | v1.8 Process/Menu | v1.8 Function | Included in v1.93 | v1.93 Function | Mapping Note |
|---:|---|---|---|---|---|
| 1 | Format Monthly Sheets | `formatMonthlySheets` | Yes | `formatMonthlySheets` → `menuFormatMonthlySheets` → `runFormatterPipeline_` | Full multi-route formatter retained |
| 2 | Create Monthly Update | `runMonthlyUpdate` | Yes | `runMonthlyUpdate` | Restored orchestration: Monthly Change, Refined sync, Disenrollment, Master List, Index |
| 3 | Create Monthly Start | `runMonthlyStart` | Yes | `runMonthlyStart` | Restored orchestration: Refined build, Disenrollment, Master List, Index |
| 4 | Hide Monthly Sub-Reports | `hideMonthlyImportSheets` | Yes | `hideMonthlyImportSheets` | Exact callback |
| 5 | Archive Monthly Sub-Reports | `archiveMonthlyImportSheets` | Yes | `archiveMonthlyImportSheets` | Exact callback; configured archive required |
| 6 | Hide Monthly Active Sheets | `hideMonthlyActiveSheets` | Yes | `hideMonthlyActiveSheets` | v1.8 registered this name without a declaration; corrected in v1.93 |
| 7 | Archive Monthly Active Sheets | `archiveMonthlyActiveSheets` | Yes | `archiveMonthlyActiveSheets` | Exact callback |
| 8 | Hide Templates | `hideTemplates` | Yes | `hideTemplates` → `hideTemplates_` | Compatibility wrapper plus current callback |
| 9 | Show Templates | `showTemplates` | Yes | `showTemplates` → `showTemplates_` | Compatibility wrapper plus current callback |
| 10 | Hide System Sheets | `hideSystemSheets_` | Yes | `hideSystemSheets_` | Exact callback |
| 11 | Show System Sheets | `showSystemSheets_` | Yes | `showSystemSheets_` | Exact callback |
| 12 | System Set up | `quickSystemSetup` | Yes | `quickSystemSetup` | Fail-closed replacement |
| 13 | Build Templates + Validate | `quickBuildAllTemplates` | Yes | `quickBuildAllTemplates` | Fail-closed replacement |
| 14 | Dashboard Quality Workflow (Quick) | `runDashboardQualityWorkflow` | Yes | `runDashboardQualityWorkflow` | Exact callback |
| 15 | Dashboard Quality Start up | `runDashboardQualityStartUp` | Yes | `runDashboardQualityStartUp` | Exact callback |
| 16 | Dashboard Quality Validate Templates | `runDashboardQualityValidateTemplates` | Yes | `runDashboardQualityValidateTemplates` | Exact callback |
| 17 | Dashboard Quality Workflow (Maintenance) | `runDashboardQualityWorkflow` | Yes | `runDashboardQualityWorkflow` | Intentional shared callback |
| 18 | Framework Smoke Validation | `runFrameworkSmokeValidation` | Yes | `runFrameworkSmokeValidation` | Restored static/runtime smoke process |
| 19 | Full Quality Check | `runFullQualityCheck` | Yes | `runFullQualityCheck` | Smoke plus Dashboard Quality workflow |
| 20 | Format Dashboard Updates | `runFormatDashboardUpdates` | Yes | `runFormatDashboardUpdates` | Dynamic Section B–H validation |
| 21 | Format Banner | `formatBannerReport` | Yes | `formatBannerReport` | Single-route formatter wrapper |
| 22 | Format CP Due Date | `formatCarePlanDueReport` | Yes | `formatCarePlanDueReport` | Single-route formatter wrapper |
| 23 | Format Unlocked CP | `formatUnlockedCarePlanReport` | Yes | `formatUnlockedCarePlanReport` | Single-route formatter wrapper |
| 24 | Format Raw Data | `formatRawData` | Yes | `formatRawData` | Single-route formatter wrapper |
| 25 | Update Demo P Monthly Sync | `updateDemoPMonthlySync` | Yes | `updateDemoPMonthlySync` → `updateRefinedDataMonthlySync` | Demo P renamed Refined Data; compatibility wrapper retained |
| 26 | Build Demo P From Scratch | `buildDemoPFromScratch` | Yes | `buildDemoPFromScratch` → `buildRefinedDataFromScratch` | Demo P renamed Refined Data; compatibility wrapper retained |
| 27 | Create / Update Disenrolled List | `createDisenrolledList` | Yes | `createDisenrolledList` | Exact callback and full month engine |
| 28 | Monthly Change Report | `buildMonthlyChangeReport` | Yes | `buildMonthlyChangeReport` | Exact callback and full comparison engine |
| 29 | Create Master List | `createMasterList` | Yes | `createMasterList` | Exact callback and full synthesis engine |
| 30 | Clear Timing Log | `clearDiagnosticsAndTimingLogs` | Yes | `clearDiagnosticsAndTimingLogs` | Exact callback |
| 31 | Framework Timing On/Off | `toggleFrameworkTiming` | Yes | `toggleFrameworkTiming` | Exact callback with persistent property |
| 32 | Organize Tabs | `enforceGlobalSheetSortOrder` | Yes | `enforceGlobalSheetSortOrder` → `organizeTabs` | Compatibility wrapper over v1.93 ordering |
| 33 | Set up System Sheets | `setupSystemSheets` | Yes | `setupSystemSheets` → `createActiveSystemSheets` | Compatibility wrapper |
| 34 | Format Dashboard | `rebuildFormatDashboardDefaults` | Yes | `rebuildFormatDashboardDefaults` → `menuBuildDashboardTemplate` | Compatibility wrapper |
| 35 | Save Active Layout | `saveActiveLayoutToDashboardSettings` | Yes, governed replacement | `saveActiveLayoutToDashboardSettings` → `saveActiveLayoutAsRebuildDefault` | Approved v1.93 behavior backs up Format Dashboard JSON/backgrounds |
| 36 | Create / Refresh All Templates | `createOrRefreshAllReportTemplates` | Yes | `createOrRefreshAllReportTemplates` → `createAllReportTemplates` | Compatibility wrapper |
| 37 | Build Index | `createIndexSheet` | Yes | `createIndexSheet` → `populateActiveIndex` | Compatibility wrapper |
| 38 | Restore Selected Archive Row | `restoreSheetFromActiveIndexRow` | Yes | `restoreSheetFromActiveIndexRow`; `restoreSheetFromArchiveWorkbook` | Local navigation plus archive/web restore path |
| 39 | Configure Restore Web App URL | `configureIndexRestoreWebAppUrl` | Yes | `configureIndexRestoreWebAppUrl` | Exact callback |
| 40 | Configure Archive Spreadsheet ID | `configureArchiveSpreadsheetId` | Yes | `configureArchiveSpreadsheetId` | Exact callback |
| 41 | Spreadsheet open | `onOpen` | Yes | `onOpen` | Exact simple trigger |
| 42 | Dashboard edit highlighting | `onEdit` | Yes | `onEdit` | Exact simple trigger |
| 43 | Archive restore web request | `doGet` | Yes | `doGet` → `restoreSheetFromArchiveWorkbook` | Restored web entry and locking |

**Process parity result:** 43 of 43 compared v1.8 processes/runtime entry points have a v1.93 implementation or explicit compatibility mapping. Thirty-two use the direct v1.93 implementation; eleven route through a compatibility wrapper or governed replacement while retaining the v1.8 public name. No v1.8 registered process is omitted.

## 4. Required Code Dependencies

| Dependency Group | Current Status | Evidence/Limit |
|---|---|---|
| Timing/logging/locks | Present | Persistent toggle, init/flush, document lock, guaranteed release |
| Dashboard loaders/config | Present | Section A–G loading; dynamic quality review covers B–H |
| Template/grid/widths | Present | Section C defaults and Section F operational overrides |
| Data/header mapping | Present | Batched reads, header maps, PMR index, row mapping, width normalization |
| Month context/sheet finders | Present | Validated 2026 context; exact prompted-month CP/Unlocked resolution |
| Archive copy/delete/restore | Present | Configured archive required; verified copy gates delete; web restore restored |
| Refined/Disenrolled/Master/Change engines | Present | Complete internal month engines retained from v1.92 baseline |
| Runtime resources | Not verified | Live sheets, properties, archive access, deployment, authorizations, quotas |

No global `normalizePMR_`, `normalizeCompareValue_`, `normalizeToDateObject_`, or `safeSheetName_` function was reintroduced; approved direct workflow-local normalization remains in place.

## 5. Initialization, Halt, and Failure Risks

| ID | Severity | Area | Current Assessment | Required Verification |
|---|---|---|---|---|
| V193-R01 | **Not Verified** | Archive workbook | ID, access, destination collisions, and quotas require live execution | Exercise success and all archive failure modes; confirm local source preservation |
| V193-R02 | **Not Verified** | Workbook schemas | Format Dashboard, templates, headers, and source tabs are runtime data | Run read-only preflight in production-configured test copy |
| V193-R03 | **Medium** | Process equivalence | Compatibility wrappers preserve entry access but some v1.8 internals are consolidated | Execute result-based regression fixtures, not function-count comparison |
| V193-R04 | **Medium** | Monthly orchestration | Restored Start/Update chains mutate several sheets under one lock | Inject failure at each stage and verify rollback/preserved prior outputs |
| V193-R05 | **Not Verified** | Web restore | `doGet` exists; deployment URL, execute-as identity, and permissions are external | Deploy test version and restore a controlled archive sheet |
| V193-R06 | **Not Verified** | Triggers | Source handlers exist; deployed trigger inventory is unavailable | Inspect Apps Script trigger list and exercise `onOpen`/`onEdit` events |

No source-confirmed Critical or High blocking defect remains. The warnings are conditional or require behavior-level parity testing in the Google Apps Script container.

## 6. Final Readiness Certification

| Category | Pass | Warning | Fail | Not Verified |
|---|---:|---:|---:|---:|
| Project files/syntax | 1 | 0 | 0 | 0 |
| Menus/callbacks | 41 | 0 | 0 | 0 |
| v1.8 process parity | 43 | 11 compatibility mappings | 0 | 0 |
| Triggers/web entry | 3 source-defined | 0 | 0 | Deployment state |
| Functions/dependencies | 242 | 0 | 0 | Runtime services |
| Constants/configuration | Static/source config present | 0 | 0 | Live properties |
| Worksheets/templates | Builders/resolvers present | 0 | 0 | Live workbook |
| Archive/restore | Guarded implementations present | 0 | 0 | Access/deployment |
| Initialization/cleanup | Locks and `finally` cleanup present | Multi-stage rollback testing | 0 | 0 |
| Error/halt handling | Fail-closed source paths present | Runtime failure injection | 0 | 0 |

- **v1.8 menu processes reviewed:** 40 registrations / 39 unique callback names
- **v1.8 source defect noted:** `hideMonthlyActiveSheets` was registered but not declared
- **v1.8 runtime entry points reviewed:** 3
- **v1.93 menu registrations:** 41 / 40 unique callback names
- **v1.93 unique functions:** 242
- **Missing v1.93 registered callbacks:** 0
- **Unresolved v1.93 identifiers:** 0
- **Conflicting v1.93 globals:** 0
- **v1.8 process mappings included in v1.93:** 43 of 43
- **Source-confirmed blocking defects:** 0
- **Runtime-dependent risks:** archive, workbook schemas, deployment, permissions, triggers, quotas, and multi-stage rollback behavior

### Certification: **PASS WITH WARNINGS**

Corrected v1.93 is source-statically loadable and contains every registered v1.8 process through an exact function, compatibility wrapper, or approved governed replacement. Final production certification still requires result-based regression testing in a Google Apps Script test workbook, archive failure injection, trigger/deployment inspection, and comparison of workflow outputs—not merely callback presence.
