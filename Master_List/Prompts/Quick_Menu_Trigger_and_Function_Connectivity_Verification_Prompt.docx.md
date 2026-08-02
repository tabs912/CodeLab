# Quick Menu, Trigger, and Function Connectivity Verification

**Review type:** focused, exception-only static connectivity verification

**Authoritative review input:** the Section 6 script supplied with the request

**Baseline input:** `Menu_Trigger_and_Function_Execution_Trace_Review_Prompt (1).docx.md`

**Prompt fingerprint (SHA-256):** `b4920709f00aacd7b555c5ff02cbc7b20bceb2853050e094a0022e682f25b934`

**Execution limit:** no live Apps Script project, spreadsheet, deployed-trigger inventory, or complete assembled source was supplied. Runtime-only facts are therefore **NOT VERIFIED**.

> **Authoritative-source note.** The supplied text contains two consecutive, identical copies of Section 6. This report evaluates that text exactly as supplied. Repository production snapshots were not substituted for it. The existing exhaustive report is used only to identify previously registered menu callbacks relevant to this section.

## 1. Baseline and Source Register

| ID | File or Report | Type | Version | Baseline/Current | Scope Used | Status |
|---|---|---|---|---|---|---|
| SRC-001 | User-supplied Section 6 text | Script fragment | Not stated | Current | All 34 declarations (17 unique names, each declared twice) | **FAIL** — duplicate block |
| BASE-001 | `Menu_Trigger_and_Function_Execution_Trace_Review_Prompt (1).docx.md` | Completed audit | 1.8.9.8.1 | Baseline | Relevant menu registrations and prior callback mappings | **PASS WITH WARNING** — older than supplied unversioned fragment |
| PROMPT-001 | `Quick_Menu_Trigger_and_Function_Connectivity_Verification_Prompt.docx` | Verification instructions | Not stated | Method | Required report structure and classifications | **PASS** |

Only a script fragment was supplied. It contains no menu builder, manifest, trigger installer/remover, HTML, or deployed-trigger inventory. Accordingly, current registration order and runtime trigger state cannot be certified from SRC-001.

## 2. Menu and Trigger Entry-Point Inventory

The baseline identifies six menu registrations whose callbacks occur in the supplied section. No trigger entry point occurs in the supplied section.

| ID | Baseline menu item | Type | Registered callback | Callback exists in supplied text | Wrapper | Implementation | Final status |
|---|---|---|---|---|---|---|---|
| MT-001 | Hide Monthly Sub-Reports | Menu | `hideMonthlyImportSheets` | Yes, twice | None | `hideMonthlySheetsBySpecs_` | **FAIL** |
| MT-002 | Archive Monthly Sub-Reports | Menu | `archiveMonthlyImportSheets` | Yes, twice | None | `archiveMonthlySheetsBySpecs_` | **FAIL** |
| MT-003 | Hide Monthly Active Sheets | Menu | `hideMonthlyActiveSheets` | Yes, twice | None | `hideMonthlySheetsBySpecs_` | **FAIL** |
| MT-004 | Archive Monthly Active Sheets | Menu | `archiveMonthlyActiveSheets` | Yes, twice | None | `archiveMonthlySheetsBySpecs_` | **FAIL** |
| MT-005 | Hide System Sheets | Menu | `hideSystemSheets_` | Yes, twice | `hideSystemSheetsNow` | `runFrameworkTimed_` callback | **FAIL** |
| MT-006 | Show System Sheets | Menu | `showSystemSheets_` | Yes, twice | `showSystemSheetsNow` | `runFrameworkTimed_` callback | **FAIL** |
| MT-007 | Current template visibility registration | Menu | Not present in supplied text | Not verifiable | `hideTemplates_` / `showTemplates_` exist twice | `hideReportTemplates` / `showReportTemplates` | **NOT VERIFIED** |
| TR-001 | Current triggers | Trigger | No trigger definition or installer supplied | Not verifiable | N/A | N/A | **NOT VERIFIED** |

The six baseline-connected menu paths fail the prompt's duplicate-global-definition rule. Even though the duplicate bodies are textually identical, relying on the runtime's later-declaration replacement behavior leaves an ambiguous assembled source and can conceal future divergence.

## 3. Compact Connectivity Verification

| Entry ID | Compact function chain | Direct dependencies valid | Arguments valid | Cross-module valid | Completion valid | Status |
|---|---|---|---|---|---|---|
| MT-001 | `hideMonthlyImportSheets` → prompt/context → `hideMonthlySheetsBySpecs_` → candidate lookup → hide/notify | Not fully verifiable | Yes statically | Not verified | Controlled cancel exists; success runtime not verified | **FAIL** |
| MT-002 | `archiveMonthlyImportSheets` → prompt/context/timing → `archiveMonthlySheetsBySpecs_` → copy/delete → index refresh/result notice | Not fully verifiable | Yes statically | Not verified | Controlled cancel exists; success runtime not verified | **FAIL** |
| MT-003 | `hideMonthlyActiveSheets` → prompt/context → `hideMonthlySheetsBySpecs_` → candidate lookup → hide/notify | Not fully verifiable | Yes statically | Not verified | Controlled cancel exists; success runtime not verified | **FAIL** |
| MT-004 | `archiveMonthlyActiveSheets` → prompt/context/timing → `archiveMonthlySheetsBySpecs_` → copy/delete → optional archive index → index refresh/result notice | Not fully verifiable | Yes statically | Not verified | Controlled cancel exists; success runtime not verified | **FAIL** |
| MT-005 | `hideSystemSheets_` → `hideSystemSheetsNow` → timing → `hideSheetIfNeeded_` → notify | Not fully verifiable | Yes statically | Not verified | Runtime not verified | **FAIL** |
| MT-006 | `showSystemSheets_` → `showSystemSheetsNow` → timing → `showSheetIfNeeded_` → notify | Not fully verifiable | Yes statically | Not verified | Runtime not verified | **FAIL** |
| MT-007 | `hideTemplates_`/`showTemplates_` → report-template wrapper → config → `setReportTemplateVisibility_` → hide/show helpers | Not fully verifiable | Yes statically | Not verified | Runtime not verified | **NOT VERIFIED** |

All supplied call sites use compatible argument counts and ordering relative to the supplied function declarations. Return propagation is coherent for the monthly public callbacks and visibility wrappers. `hideSystemSheetsNow`, `showSystemSheetsNow`, and `setReportTemplateVisibility_` intentionally return `undefined` after their side effects.

## 4. Shared Dependency Register

| Dependency ID | Function or service | Type | Used by | Exists in supplied text | Compatibility | Status |
|---|---|---|---|---|---|---|
| DEP-001 | `promptForLockedYearReportMonth_` | Prompt helper | MT-001–MT-004 | No | Call shape plausible | **NOT VERIFIED** |
| DEP-002 | `buildPromptedMonthContext_` | Date-context helper | MT-001–MT-004 | No | Must return `monthLabel` and valid `reportDate` | **NOT VERIFIED** |
| DEP-003 | `runFrameworkTimed_` | Timing/workflow wrapper | MT-001–MT-006, MT-007 | No | Must invoke callback with timing object and return callback result | **NOT VERIFIED** |
| DEP-004 | `refreshIndexAfterSheetWorkflow_` | Index helper | MT-002, MT-004 | No | Call shape plausible | **NOT VERIFIED** |
| DEP-005 | `notifyArchiveMonthlySheetsResult_` | Result notifier | MT-002, MT-004 | No | Must accept process, period, and result object | **NOT VERIFIED** |
| DEP-006 | `findArchiveMonthlyCandidateSheetsUpToDate_` | Candidate selector | MT-001–MT-004 | Yes, twice | Parameter use is compatible | **FAIL** — duplicate definition |
| DEP-007 | `activateVisibleSheetBeforeHiding_` | Visibility guard | MT-001, MT-003 | No | Required to avoid hiding the active/last visible sheet | **NOT VERIFIED** |
| DEP-008 | `getDocumentPropertiesCached_` / `getArchiveSpreadsheetId_` | Configuration helpers | MT-002, MT-004 | No | Conditional selection is valid; returned archive ID is runtime data | **NOT VERIFIED** |
| DEP-009 | `copySheetToArchiveAndDeleteLocal_` | Destructive archive helper | MT-002, MT-004 | No | Must return an object with `localAction` | **NOT VERIFIED** |
| DEP-010 | `loadDashboardConfig_` | Configuration loader | MT-007 | No | Failure has a prefix-scan fallback | **NOT VERIFIED** |
| DEP-011 | `hideSheetIfNeeded_` / `showSheetIfNeeded_` | Visibility helpers | MT-005–MT-007 | No | Call shape plausible | **NOT VERIFIED** |
| DEP-012 | `markFrameworkStep_` | Timing logger | MT-002, MT-004, MT-007 | No | Call shape plausible | **NOT VERIFIED** |
| DEP-013 | `notify_` / `logBestEffortWarning_` | User/log output | All groups | No | Call shape plausible | **NOT VERIFIED** |
| DEP-014 | `generateArchiveFileIndex_` | Optional dynamic helper | MT-004 | Conditional only | Existence is checked dynamically | **PASS WITH WARNING** |
| DEP-015 | `extractFirstDateFromSheetName_` | Date parser | MT-001–MT-004 | No | Must return a valid `Date` or falsey value | **NOT VERIFIED** |
| DEP-016 | `SpreadsheetApp`, `Utilities`, `Session` | Apps Script services | All groups | Platform-provided | Requires Apps Script runtime and authorization | **NOT VERIFIED** |

No absent helper is classified as missing from the assembled project because only Section 6 was supplied. The complete source must be searched before any orphan or missing-reference conclusion is made.

## 5. Exception and Broken-Connection Register

| Finding ID | Severity | Entry ID | Function | Location | Issue | Runtime impact | Required correction |
|---|---|---|---|---|---|---|---|
| EX-001 | High | MT-001–MT-007 | All 17 unique supplied functions | Entire supplied fragment; second Section 6 copy | Every function is globally declared twice | Later declarations replace earlier ones; connectivity is ambiguous and future edits can silently activate the wrong body | Remove one complete duplicate Section 6 block from the assembled source, then rerun duplicate-name validation |
| EX-002 | High | MT-001–MT-007, TR-001 | Menu builder and trigger inventory | Not supplied | Current registrations and deployed triggers cannot be checked against callbacks | Renamed, removed, or stale callback strings may remain undetected | Supply and verify the complete assembled script plus deployed trigger inventory |
| EX-003 | High | MT-002, MT-004 | `copySheetToArchiveAndDeleteLocal_` | External dependency not supplied | Destructive archive dependency and return contract are unverified | Copy/delete ordering, collision handling, and local deletion safety cannot be certified | Verify helper source, authorization, archive ID validation, copy confirmation, and deletion guard before production use |
| EX-004 | Medium | MT-004 | `archiveMonthlyActiveSheets` | Active-sheet archive specification | Comment promises Disenrolled Exclusion processing, but archive specs include only Raw Data, Master List, and Monthly Change | Disenrolled Exclusion sheets are left local while the UI/comment implies they are archived | Confirm intended behavior; if archiving is required, add the same Disenrolled Exclusion route used by the hide workflow |
| EX-005 | Medium | MT-004 | `generateArchiveFileIndex_` | Optional call in archive completion path | Empty `catch` suppresses every indexing failure | Archive can report completion while the archive file index remains stale | Log the caught error and expose a warning in the result notification without failing a completed archive |
| EX-006 | Low | MT-001, MT-003 | `hideMonthlySheetsBySpecs_` | Per-sheet loop | A sheet already hidden is still appended to `result.hidden` | Completion counts can overstate newly hidden sheets | Track already-hidden sheets separately or rename the result field to indicate matched/ensured-hidden sheets |

### Expanded failure chain for EX-001

`baseline menu registration` → `first callback declaration` → `first implementation/helper declaration` → **second identical callback declaration replaces the first** → `second implementation/helper declaration replaces the first` → runtime dispatch uses only the last declaration.

The first uncertain point for every affected path is the duplicated global callback name, before business logic begins.

### Expanded warning chain for EX-004 and EX-005

`archiveMonthlyActiveSheets` → `archiveMonthlySheetsBySpecs_` with only Raw Data/Master List/Monthly Change specs → Disenrolled Exclusion never becomes a candidate → optional `generateArchiveFileIndex_` → any thrown error is swallowed → index refresh/result notification continues.

## 6. Targeted Orphan and Duplicate Register

| Function/group | Type | Confirmed callers in supplied text | Dynamic references checked | Classification | Status |
|---|---|---|---|---|---|
| All 17 unique names | Callback/wrapper/helper | See Sections 2–4 | Supplied text only | Duplicate global definitions | **FAIL** |
| `hideTemplates_`, `showTemplates_` | Wrapper | No caller in supplied text | No complete menu source | Potential external menu callbacks; not orphaned | **NOT VERIFIED** |
| `hideReportTemplates`, `showReportTemplates` | Public workflow | Template wrappers | Supplied text only | Active in fragment | **PASS WITH WARNING** |
| `getDashboardConfigForTemplateVisibility_`, `setReportTemplateVisibility_` | Helpers | Template workflows | Supplied text only | Active in fragment | **PASS WITH WARNING** |
| `hideSystemSheetsNow`, `showSystemSheetsNow` | Implementations | System wrappers | Supplied text only | Active in fragment | **PASS WITH WARNING** |
| Monthly workflow helpers defined in the fragment | Helpers | Monthly callbacks | Supplied text only | Active in fragment | **FAIL** — each is duplicated |

No function is certified orphaned. The fragment does not include all modules, menus, QA entry points, public consumers, HTML calls, or dynamic function-name references required for that determination.

## 7. Baseline Delta and Count Reconciliation

| Metric | Completed audit total | Current verified total | Difference | Explanation | Reconciled |
|---|---:|---:|---:|---|---|
| Full-project executable menu items | 41 | Not verified | N/A | Current menu builder was not supplied | No |
| Baseline menu items relevant to supplied Section 6 | 6 | 6 located by callback name | 0 | Four monthly and two system-sheet callbacks are present | Yes, scope only |
| Full-project runtime entry points | 3 | 0 in fragment | -3 apparent | Fragment contains no trigger section; this is not evidence of removal | No |
| Unique function names in supplied fragment | N/A | 17 | N/A | Fragment-only measure | Yes |
| Function declarations in supplied fragment | N/A | 34 | N/A | The entire 17-function block is repeated | Yes |
| Duplicate global names in supplied fragment | Baseline reported 0 missing registered callbacks; duplicate total not used here | 17 | N/A | New supplied-text defect | Yes |
| Missing supplied-fragment helper definitions | N/A | 16 dependency groups not locally defined | N/A | Expected cross-module references cannot be resolved without full source | Yes as NOT VERIFIED |

The baseline and current totals cannot be globally reconciled because the supplied material is intentionally narrower than the completed full-project audit and has no version identifier.

## 8. Final Connectivity Certification

| Entry ID | Menu/Trigger | Callback valid | Wrapper valid | Implementation valid | Dependencies valid | Complete path | Final status |
|---|---|---|---|---|---|---|---|
| MT-001 | Hide Monthly Sub-Reports | No — duplicate | N/A | No — duplicate | Not verified | No | **FAIL** |
| MT-002 | Archive Monthly Sub-Reports | No — duplicate | N/A | No — duplicate | Not verified | No | **FAIL** |
| MT-003 | Hide Monthly Active Sheets | No — duplicate | N/A | No — duplicate | Not verified | No | **FAIL** |
| MT-004 | Archive Monthly Active Sheets | No — duplicate | N/A | No — duplicate | Not verified | No | **FAIL** |
| MT-005 | Hide System Sheets | No — duplicate | No — duplicate | Not verified | Not verified | No | **FAIL** |
| MT-006 | Show System Sheets | No — duplicate | No — duplicate | Not verified | Not verified | No | **FAIL** |
| MT-007 | Template visibility menu connectivity | Not verified | No — duplicate | No — duplicate | Not verified | No | **NOT VERIFIED** |
| TR-001 | Current triggers | Not verified | N/A | Not verified | Not verified | Not verified | **NOT VERIFIED** |

### Overall certification: **FAIL**

The supplied script cannot receive a passing connectivity certification because every declared function is duplicated. Remove the second Section 6 copy and verify the deduplicated fragment in the complete assembled project. Before production use, also resolve or explicitly accept EX-004, replace the silent catch described in EX-005, and perform live authorization and workbook tests for archive copy/delete behavior, sheet visibility, date parsing, index refresh, and deployed triggers.
