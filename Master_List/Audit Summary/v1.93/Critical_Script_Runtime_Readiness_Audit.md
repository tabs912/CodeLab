# Critical Script Runtime Readiness Audit — v1.93

**Authoritative source:** `Master_List/Current Production Script/v1.93`
**Source fingerprint:** SHA-256 `a5fcaff0533c6e5094fea8c1d59593f9309badb9263ea0ac8986c89e2dcc012c`
**Scope:** the 4,008-line combined production source, its seven labeled modules, and `Master_List/appsscript.json`, reviewed as one Apps Script project.
**Method:** full-source parse, global-declaration comparison, menu/trigger reconciliation, unresolved-reference analysis after isolating the first parse defect, targeted entry-point tracing, and manifest/resource review. Live workbook contents, deployed triggers, permissions, properties, quotas, and web-app deployment were unavailable.
**Overall result:** **FAIL**.

## 1. Project Load Readiness

| Check | Reviewed | Pass | Warning | Fail | Not Verified |
|---|---:|---:|---:|---:|---:|
| Source files and modules | 1 combined source / 7 labeled modules | 7 present | 0 | 0 | 0 |
| Syntax and parsing | 1 complete source | 0 | 0 | 1 | 0 |
| Global function definitions | 174 declarations / 171 unique names | 168 | 0 | 3 conflicting names | 0 |
| Menu callback definitions | 30 registrations / 29 unique names | 25 registrations | 0 | 5 registrations | 0 |
| Project configuration | 1 manifest plus runtime resources | 1 manifest | 0 | 0 | 4 runtime groups |

The source cannot parse. Module 1 declares `BANNER_PREFIX`, `CARE_PLAN_DUE_PREFIX`, and `UNLOCKED_PREFIX` at lines 31–33. Module 5 declares the same three lexical constants again at lines 2147–2149. V8 stops at line 2147 with `SyntaxError: Identifier 'BANNER_PREFIX' has already been declared`; no global initialization, menu, or trigger can run.

After commenting only the three Module 5 redeclarations in an audit copy, static analysis exposed 39 additional unresolved identifiers: two optional configuration symbols and 37 function names. Menu strings add three more function names not otherwise referenced as executable identifiers, producing **40 unique missing function/callback names** in the assembled project.

Three function names are behaviorally duplicated: `promptForLockedYearReportMonth_`, `buildPromptedMonthContext_`, and `saveActiveLayoutAsRebuildDefault`. The later declarations replace the corrected Module 1 implementations with incompatible or placeholder behavior.

No merge marker, empty labeled module, truncated final function, or malformed string/comment was found before the duplicate-constant parser failure.

## 2. Menu and Trigger Readiness

Every entry below is currently blocked by CRR93-001. The status column records the first additional entry-local defect that remains after removing the duplicate Module 5 constants.

| Menu/Trigger | Callback or Handler | Wrapper/Implementation | Dependencies Present | Blocking Issue | Status |
|---|---|---|---|---|---|
| Format Monthly Sheets | `menuFormatMonthlySheets` | `runFormatterPipeline_` | No | CRR93-003, CRR93-007 | **FAIL** |
| Hide Monthly Sub-Reports | `hideMonthlyImportSheets` | `hideMonthlySheetsBySpecs_` | No | `runFrameworkTimed_` missing | **FAIL** |
| Archive Monthly Sub-Reports | `archiveMonthlyImportSheets` | `archiveMonthlySheetsBySpecs_` | No/runtime | Timing/logging missing; archive access unverified | **FAIL** |
| Hide Monthly Active Sheets | `hideMonthlyActiveSheets` | `hideMonthlySheetsBySpecs_` | No | `runFrameworkTimed_` missing | **FAIL** |
| Archive Monthly Active Sheets | `archiveMonthlyActiveSheets` | `archiveMonthlySheetsBySpecs_` | No/runtime | Timing/logging missing; archive access unverified | **FAIL** |
| Hide Templates | `hideTemplates_` | `hideReportTemplates` | No | Config/timing/logging dependencies missing | **FAIL** |
| Show Templates | `showTemplates_` | `showReportTemplates` | No | Config/timing/logging dependencies missing | **FAIL** |
| Hide System Sheets | `hideSystemSheets_` | `hideSystemSheetsNow` | No | `runFrameworkTimed_` missing | **FAIL** |
| Show System Sheets | `showSystemSheets_` | `showSystemSheetsNow` | No | `runFrameworkTimed_` missing | **FAIL** |
| System Set up | `quickSystemSetup` | Four-step fail-closed wrapper | No | Quality start-up/timing/config dependencies missing | **FAIL** |
| Build Templates + Validate | `quickBuildAllTemplates` | Build/validate wrapper | No | Validation and template dependencies missing | **FAIL** |
| Dashboard Quality Workflow (Quick) | `runDashboardQualityWorkflow` | Missing | No | Registered callback absent | **FAIL** |
| Dashboard Quality Start up | `runDashboardQualityStartUp` | Missing | No | Registered callback absent | **FAIL** |
| Dashboard Quality Workflow (Maintenance) | `runDashboardQualityWorkflow` | Missing | No | Registered callback absent | **FAIL** |
| Update Refined Data | `updateRefinedDataMonthlySync` | Refined-data workflow | No | Runtime/config/logging/normalization dependencies missing | **FAIL** |
| Build Refined Data | `buildRefinedDataFromScratch` | Refined-data workflow | No | Runtime/config/logging/normalization dependencies missing | **FAIL** |
| Create / Update Disenrolled List | `createDisenrolledList` | Disenrollment workflow | No | Runtime/config/logging/normalization dependencies missing | **FAIL** |
| Monthly Change Report | `buildMonthlyChangeReport` | Monthly-change workflow | No | Runtime/config/normalization dependencies missing | **FAIL** |
| Create Master List | `createMasterList` | Master-list workflow | No | Runtime/config/normalization dependencies missing | **FAIL** |
| Clear Timing Log | `clearDiagnosticsAndTimingLogs` | Missing | No | Registered callback absent | **FAIL** |
| Framework Timing on/off | `toggleFrameworkTiming` | Missing | No | Registered callback absent | **FAIL** |
| Organize Tabs | `organizeTabs` | Section-F rules | Yes locally | Global CRR93-001 | Blocked by project load |
| Set up System Sheets | `createActiveSystemSheets` | Template promotion | Runtime-dependent | Required templates and builders unresolved | **NOT VERIFIED** |
| Format Dashboard | `menuBuildDashboardTemplate` | `buildFormatDashboardTemplate_` | No | CRR93-004 | **FAIL** |
| Save Active Layout as Rebuild Default | `saveActiveLayoutAsRebuildDefault` | Later toast-only declaration | No | CRR93-006 | **FAIL** |
| Create / Refresh All Templates | `createAllReportTemplates` | Operational builders | No | CRR93-004 | **FAIL** |
| Build Index | `populateActiveIndex` | `populateIndexData` | Partial | Theme/grid/banding/width dependencies missing | **WARNING** |
| Restore Selected Archive Row | `restoreSheetFromActiveIndexRow` | Local navigation | Yes locally | Archive restore not implemented by callback | **WARNING** |
| Configure Restore Web App URL | `configureIndexRestoreWebAppUrl` | Property setter | Runtime-dependent | URL/deployment not validated | **NOT VERIFIED** |
| Configure Archive Spreadsheet ID | `configureArchiveSpreadsheetId` | Property setter/access check | Runtime-dependent | Target identity and production access unverified | **NOT VERIFIED** |
| Simple open trigger | `onOpen` | Menu builder | No | Parser failure prevents handler load | **FAIL** |
| Simple edit trigger | `onEdit` | Dashboard recalc/highlight | No | Parser failure; optional recalc helper absent | **FAIL** |

There are 30 menu registrations, 29 unique menu callback names, and two source-defined simple triggers. Four callback names are absent: `runDashboardQualityWorkflow` (registered twice), `runDashboardQualityStartUp`, `clearDiagnosticsAndTimingLogs`, and `toggleFrameworkTiming`. No installable-trigger builder/reset/removal path, web handler, or time-driven handler appears in source. Deployed trigger state is **NOT VERIFIED**.

Failed callback paths stop at:

- Dashboard Quality menu → missing `runDashboardQualityWorkflow` / `runDashboardQualityStartUp`.
- Clear/toggle timing menu → missing `clearDiagnosticsAndTimingLogs` / `toggleFrameworkTiming`.
- Template entry → builder → missing dashboard config/theme/metadata dependency.
- Data entry → timed wrapper/config loader → missing runtime infrastructure or normalization helper.

## 3. Required Code Dependencies

| Severity | Caller Group | Required Component | Type | Module(s) | Problem | Runtime Impact |
|---|---|---|---|---|---|---|
| **Critical** | Five menu registrations | Four exact callback names | Public callbacks | Module 1 menu | Callback strings do not resolve globally | Five menu items cannot start after parsing is repaired |
| **High** | Most menu workflows | `runFrameworkTimed_`, timing init/flush/log/step helpers | Runtime/timing infrastructure | Modules 1, 2, 5–7 | Core timing wrapper and supporting functions are absent | Hide/show, archive, formatting, Refined, Disenrollment, Master List, and Monthly Change paths stop |
| **High** | Template, index, and data workflows | `loadDashboardConfig_`, `getDashboardSetting_`, `getTemplateTheme_`, `getHeadersForSheetType_` | Configuration resolvers | Modules 2–7 | Governed configuration APIs are absent | Template creation and data mapping cannot obtain required settings or headers |
| **High** | Template builders | `getTemplateConfigFromDashboard_`, `writeTemplateMetadata_` | Template helpers | Module 3 | Unguarded required helpers are absent | Dashboard, system, and operational template builds halt or remain partial |
| **High** | Refined, Disenrollment, Master List, Monthly Change | `normalizePMR_`, `normalizeCompareValue_`, `normalizeToDateObject_`, `safeSheetName_` | Data-integrity helpers | Modules 6–7 | Restored workflows call normalization functions that are not present | Participant matching, change detection, date handling, and staged naming halt |
| **High** | Quick workflows | Quality start-up and template validation implementations | Validators/workflows | Module 1 | Fail-closed wrappers correctly throw because required modules are missing | Setup and template validation cannot complete |
| **Medium** | Formatting/index/template surfaces | Grid, banding, widths, placement, output-visibility, recalculation helpers | Optional/conditional helpers | Modules 1, 3–6 | Several missing calls are guarded, allowing execution to continue without governed behavior | Outputs can be incomplete while appearing successful |

Static reconciliation found **37 unresolved function identifiers** after isolating the parser defect. Three additional menu-only callback names bring the project total to **40 missing function/callback names**. A `typeof` guard prevents a `ReferenceError` only on that branch; it does not prove that the governed behavior is optional or that the workflow is complete.

## 4. Constants, Configuration, and Required Resources

| Required Item | Type | Required By | Problem | Fallback Available | Status |
|---|---|---|---|---|---|
| Formatter prefix constants | Global constants | `FORMATTER_ROUTES` | Declared twice; second declarations are also self-referential | No | **INVALID** |
| `GLOBAL_DEFAULTS`, row constants, version, workflow enums | Global configuration | All modules | Initial definitions are present before parser failure | N/A | Confirmed present statically |
| Timing and dashboard runtime APIs | Configuration/runtime functions | Most workflows | Required functions are absent | No reliable fallback | **MISSING** |
| `RFF_ARCHIVE_SPREADSHEET_ID` | Document property | Monthly archives and formatter archive | Live value/access unavailable; hard-coded fallback remains in monthly archive | Partial | **NOT VERIFIED** |
| `INDEX_RESTORE_WEB_APP_URL` | Document property/deployment | Restore configuration | Setter exists; deployment and consuming restore path are not proven | No | **NOT VERIFIED** |
| Format Dashboard and definitions | Worksheet/configuration | Templates/data mapping | Live content unknown; loader is missing | No | **NOT VERIFIED** |
| Base, system, and operational templates | Worksheets | Setup and format workflows | Live sheets unknown; template builders have missing dependencies | Partial | **NOT VERIFIED** |
| Source sheets, governed headers, and column definitions | Worksheets/schema | Monthly and roster workflows | Runtime contents unavailable | Partial | **NOT VERIFIED** |
| Apps Script services/scopes | Manifest | Spreadsheet/UI/property operations | Required base scopes are declared; no advanced service is referenced | N/A | Confirmed present statically |
| Locks | Concurrency control | Archive/delete, template replacement, staged promotion | No `LockService` use appears | No | **WARNING** |

## 5. Initialization, Halt, and Failure Risks

| ID | Severity | Entry Point | Function/Module | Halt or Corruption Risk | Evidence | Required Correction |
|---|---|---|---|---|---|---|
| CRR93-001 | **Critical** | Entire project | Module 1 lines 31–33; Module 5 lines 2147–2149 | Source does not parse | Duplicate lexical constants; Node/V8 stops at line 2147 | Delete Module 5 redeclarations and use the single Module 1 constants |
| CRR93-002 | **Critical** | Five menu registrations | Module 1 menu | Entry points cannot start | Four exact callback names are absent | Restore approved global callbacks or update every registration to exact implemented names |
| CRR93-003 | **High** | Most production workflows | Shared runtime/config/logging infrastructure | Workflows halt on missing wrappers/resolvers/loggers | `runFrameworkTimed_`, dashboard loaders, timing/logging helpers, and governed header resolvers are absent | Restore one governed shared infrastructure module with signature-compatible implementations |
| CRR93-004 | **High** | Dashboard and template workflows | Module 3 | Builds halt or leave partial templates | Template config, theme, metadata, resizing, and related helpers are missing | Restore required template contracts and transactional replacement/cleanup |
| CRR93-005 | **High** | Month-driven workflows | Duplicate month APIs at lines 195–236 and 738–765 | Selected month fields become incompatible | Later prompt returns raw text; later context omits `label`, `mm`, and `yy` | Retain the Module 1 object contract and remove later duplicates after caller verification |
| CRR93-006 | **High** | Save Active Layout | Duplicate definitions at lines 380–390 and 817–819 | Working persistence is silently replaced by toast-only behavior | Later declaration wins globally | Remove the placeholder duplicate and add read-back verification to the persisting implementation |
| CRR93-007 | **High** | Format Monthly Sheets | Module 5 archive/output path | Workflow skips required archive/format/governance behaviors | Archive connection/copy, output visibility, governed insert, raw sync, and delete helpers are absent or guarded | Define required policy; fail closed when required behavior is unavailable; never report full success for skipped governed steps |
| CRR93-008 | **High** | Refined, Disenrollment, Master List, Monthly Change | Modules 6–7 | Matching and comparison halt or can be invalid | PMR/value/date/name normalization helpers are absent | Restore approved non-lossy normalization contracts and test duplicate/blank/date cases |
| CRR93-009 | **Medium** | Destructive shared-sheet workflows | Modules 2, 3, 5–7 | Concurrent runs can race during copy, delete, rename, and promotion | No document lock and guaranteed release path | Add bounded document locks outside prompts and release them in `finally` |
| CRR93-010 | **Not Verified** | Resource-dependent workflows | Workbook/properties/deployment | IDs, sheets, schemas, permissions, triggers, and deployments may block execution | Runtime environment unavailable | Run a read-only production preflight and capture evidence before release |

## 6. Final Readiness Certification

| Category | Pass | Warning | Fail | Not Verified |
|---|---:|---:|---:|---:|
| Project files and syntax | 7 modules present | 0 | 1 parser failure | 0 |
| Menus and callbacks | 25 registrations resolve | 0 | 5 registrations | 0 |
| Triggers and handlers | 0 runnable | 0 | 2 blocked | Deployed inventory |
| Functions and dependencies | 171 unique declared | Conditional missing group | 40 missing names | 0 |
| Wrappers and helpers | Restored data primitives | Optional guarded group | 5 required groups | 0 |
| Constants and configuration | Initial globals present | 0 | Duplicate formatter constants | 4 runtime groups |
| Worksheets and templates | 0 live-verified | 0 | Build paths unresolved | 3 resource groups |
| Services and permissions | Manifest present | 0 | 0 | Effective grants/access |
| Initialization and cleanup | 0 | No-lock risk | 3 root causes | 0 |
| Error and halt handling | Fail-closed quick wrappers | Guarded-skip risk | 8 Critical/High causes | 1 runtime group |

- **Total menu items reviewed:** 30
- **Total triggers reviewed:** 2 source-defined simple triggers; deployed inventory not verified
- **Total production entry points reviewed:** 32
- **Missing functions/callbacks:** 40 unique names
- **Missing registered callback names:** 4 names affecting 5 menu registrations
- **Conflicting global function names:** 3
- **Duplicate invalid global constants:** 3
- **Broken required dependency groups:** timing/runtime/logging, dashboard configuration, template construction, data normalization, and formatter governance
- **Confirmed blocking defects:** 8 consolidated Critical/High root causes
- **Conditional runtime risks:** sheets/templates/schema, properties/IDs, access, deployment, trigger state, locks, quotas, and skipped guarded behavior
- **Items not verifiable from source:** live workbook resources, property values, archive identity/access, web-app deployment, deployed triggers, effective grants, and production quotas

### Certification: **FAIL**

v1.93 is not runtime-ready. The duplicate formatter constants prevent parsing, so no menu or trigger can load. Removing only that parser defect is insufficient: five menu registrations remain unresolved, shared timing/configuration/template infrastructure is missing, three corrected functions are overwritten by later conflicting declarations, and core data workflows still lack normalization/governance dependencies. Correct CRR93-001 through CRR93-008, rerun full-source parse and exact reference reconciliation on a new versioned candidate, then complete live workbook/deployment preflight before release.
