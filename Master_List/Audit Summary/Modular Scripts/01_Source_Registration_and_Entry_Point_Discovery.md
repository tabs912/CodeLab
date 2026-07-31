# Script 01 — Source, Registration, and Entry-Point Discovery

**Status:** COMPLETE (static-source audit)
**Governing prompt:** `Master_List/Prompts/Menu_Trigger_and_Function_Execution_Trace_Review_Prompt (1).docx.md`, Sections 1–12 and modular protocol
**Production source:** the ten `.gs` files in `Master_List/Current Production Script/Modules`
**Declared source version:** `1.8.9.8.4.0` (`MASTER_LIST_MERGE_ML_VERSION`)
**Source fingerprint (SHA-256, filename-sorted concatenation):** `5ee0461c0e722ac55304df8187ff10998b109eda2167306f63cdd4f54af559ab`
**Method:** exhaustive static parsing of named declarations, menu callback strings, and named call occurrences. Google service dispatch, deployed trigger state, workbook contents, permissions, quotas, and runtime-selected data paths are **NOT VERIFIED** without the live Apps Script container.

## Production-source inventory

| File | Lines | Functions | SHA-256 |
|---|---:|---:|---|
| `1_Config.gs` | 220 | 9 | `0123861f4ff6fa6091129f39429c876615815550c7ebb9be8e9ad2c72cf85e6e` |
| `2_Dashboard_Loaders.gs` | 556 | 31 | `0a63c4ab5a83a92e36fae387eb8230de083e69259c74f063b199859586a4d7c5` |
| `3_Core_Helpers.gs` | 314 | 36 | `5d1a467b482a824a6da8ea4c862905f16fb29e3d4878628e7b06be408aa4256d` |
| `4_System_Index.gs` | 424 | 18 | `21ca1b782d05d6e24f727a296b5f0b97453c60bd4c7a0a9f3f02976770b5ae16` |
| `5_System_Templates.gs` | 415 | 26 | `da57e470353fdd1afb477c02d1a40d0e7af47bfb0974e0e593b177a8226a823d` |
| `6_System_Quality.gs` | 231 | 2 | `9a93f07656e1b0d99572b05ae4e17fe361ec5d93de0c8fa7e0cb87e3ae45ef70` |
| `7_Workflow_DemoP.gs` | 680 | 30 | `77e6912f5ec01617be10d80de55f80a3a8b7d1b28490f3125766844212b4ac76` |
| `8_Workflow_MasterList.gs` | 531 | 27 | `c163937dd684370b190e2ebd6672d752dfdb33ddc81b95a7ed238c354f2381db` |
| `9_Workflow_MonthlyChange.gs` | 534 | 27 | `a74e8783d6ec77da93abd77503ae38b9664c19e4bf4d68b4db1d2db5eb73af22` |
| `_10_Workflow_Disenrolled.gs` | 259 | 6 | `01a5ba1efc25951ff94ce5ba8ed171c0b5a10aaa7d157ad5cddb2e5180cf29bf` |

## Complete Menu Registration Catalog

| ID | Order | Menu path | Callback | Registration evidence | Callback evidence | Status |
|---|---:|---|---|---|---|---|
| MENU-001 | 1 | Master List › 📊 Data & Processing Engine › 📚 Format Monthly Sheets | `formatMonthlySheets` | `1_Config.gs:12` | — | FAIL |
| MENU-002 | 2 | Master List › 📊 Data & Processing Engine › 🔁 Create Monthly Update | `runMonthlyUpdate` | `1_Config.gs:13` | — | FAIL |
| MENU-003 | 3 | Master List › 📊 Data & Processing Engine › 🏁 Create Monthly Start | `runMonthlyStart` | `1_Config.gs:14` | — | FAIL |
| MENU-004 | 4 | Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Sub-Reports › 🗂️ Hide Monthly Sub-Reports | `hideMonthlyImportSheets` | `1_Config.gs:17` | — | FAIL |
| MENU-005 | 5 | Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Sub-Reports › 🗃️ Archive Monthly Sub-Reports | `archiveMonthlyImportSheets` | `1_Config.gs:18` | — | FAIL |
| MENU-006 | 6 | Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Active Sheets › 🗂️ Hide Monthly Active Sheets | `hideMonthlyActiveSheets` | `1_Config.gs:20` | — | FAIL |
| MENU-007 | 7 | Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Active Sheets › 🗃️ Archive Monthly Active Sheets | `archiveMonthlyActiveSheets` | `1_Config.gs:21` | — | FAIL |
| MENU-008 | 8 | Master List › ⚙️ Sheet & Layout Management › 🙈 Templates › Build All Templates + Validate | `buildAllTemplatesAndValidate` | `1_Config.gs:23` | `5_System_Templates.gs:287–314` | PASS |
| MENU-009 | 9 | Master List › ⚙️ Sheet & Layout Management › 🙈 Templates › Show Templates | `showReportTemplates` | `1_Config.gs:24` | — | FAIL |
| MENU-010 | 10 | Master List › ⚙️ Sheet & Layout Management › 🙈 Templates › Hide Templates | `hideReportTemplates` | `1_Config.gs:25` | — | FAIL |
| MENU-011 | 11 | Master List › ⚙️ Sheet & Layout Management › 😎 System Sheets › Hide System Sheets | `hideSystemSheets_` | `1_Config.gs:27` | — | FAIL |
| MENU-012 | 12 | Master List › ⚙️ Sheet & Layout Management › 😎 System Sheets › Show System Sheets | `showSystemSheets_` | `1_Config.gs:28` | — | FAIL |
| MENU-013 | 13 | Master List › 🚀 Quick Start-up › 🏗️ System Set up | `quickSystemSetup` | `1_Config.gs:30` | — | FAIL |
| MENU-014 | 14 | Master List › 🚀 Quick Start-up › Build System Sheets | `buildSystemSheets` | `1_Config.gs:31` | — | FAIL |
| MENU-015 | 15 | Master List › 🚀 Quick Start-up › Set up System Sheets | `setupSystemSheets` | `1_Config.gs:32` | — | FAIL |
| MENU-016 | 16 | Master List › 🚀 Quick Start-up › 🖼️ Build Templates + Validate Templates | `quickBuildAllTemplates` | `1_Config.gs:33` | `5_System_Templates.gs:316–320` | PASS |
| MENU-017 | 17 | Master List › 🚀 Quick Start-up › ✅ Dashboard Quality Workflow | `runDashboardQualityWorkflow` | `1_Config.gs:34` | — | FAIL |
| MENU-018 | 18 | Master List › 🛠️ Maintenance/Rebuild › 👌 Quality › Dashboard Quality Start up | `runDashboardQualityStartUp` | `1_Config.gs:37` | — | FAIL |
| MENU-019 | 19 | Master List › 🛠️ Maintenance/Rebuild › 👌 Quality › Dashboard Quality Validate Templates | `runDashboardQualityValidateTemplates` | `1_Config.gs:38` | — | FAIL |
| MENU-020 | 20 | Master List › 🛠️ Maintenance/Rebuild › 👌 Quality › Dashboard Quality Workflow | `runDashboardQualityWorkflow` | `1_Config.gs:39` | — | FAIL |
| MENU-021 | 21 | Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › Banner | `formatBannerReport` | `1_Config.gs:41` | — | FAIL |
| MENU-022 | 22 | Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › CP Due Date | `formatCarePlanDueReport` | `1_Config.gs:42` | — | FAIL |
| MENU-023 | 23 | Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › Unlocked CP | `formatUnlockedCarePlanReport` | `1_Config.gs:43` | — | FAIL |
| MENU-024 | 24 | Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › Raw Data | `formatRawData` | `1_Config.gs:44` | — | FAIL |
| MENU-025 | 25 | Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 📁 Refined Data › 🔄 Update Refined Data | `updateRefinedDataMonthlySync` | `1_Config.gs:47` | — | FAIL |
| MENU-026 | 26 | Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 📁 Refined Data › 🛠️ Build Refined Data | `buildRefinedDataFromScratch` | `1_Config.gs:48` | `7_Workflow_DemoP.gs:11–30` | PASS |
| MENU-027 | 27 | Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › ⛔ Create / Update Disenrolled List | `createDisenrolledList` | `1_Config.gs:49` | `_10_Workflow_Disenrolled.gs:11–23` | PASS |
| MENU-028 | 28 | Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 🗓️ Monthly Change Report | `buildMonthlyChangeReport` | `1_Config.gs:50` | `9_Workflow_MonthlyChange.gs:66–72` | PASS |
| MENU-029 | 29 | Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 💡 Create Master List | `createMasterList` | `1_Config.gs:51` | `8_Workflow_MasterList.gs:120–124` | PASS |
| MENU-030 | 30 | Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › 🏗️ Rebuild System Templates | `createSystemTemplates` | `1_Config.gs:53` | — | FAIL |
| MENU-031 | 31 | Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › 🪄 Clear Diagnostics & Timing | `clearDiagnosticsAndTimingLogs` | `1_Config.gs:54` | — | FAIL |
| MENU-032 | 32 | Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › ⏱️ Framework Timing on/off | `toggleFrameworkTiming` | `1_Config.gs:55` | — | FAIL |
| MENU-033 | 33 | Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › 🧭 Organize Tabs | `enforceGlobalSheetSortOrder` | `1_Config.gs:56` | — | FAIL |
| MENU-034 | 34 | Master List › 🧩 Start - up › Build System Sheets | `buildSystemSheets` | `1_Config.gs:58` | — | FAIL |
| MENU-035 | 35 | Master List › 🧩 Start - up › 📜 Set up System Sheets | `setupSystemSheets` | `1_Config.gs:59` | — | FAIL |
| MENU-036 | 36 | Master List › 🧩 Start - up › 🎨 Format Dashboard | `rebuildFormatDashboardDefaults` | `1_Config.gs:60` | — | FAIL |
| MENU-037 | 37 | Master List › 🧩 Start - up › 💾 Save Active Layout as Rebuild Default | `saveActiveLayoutToDashboardSettings` | `1_Config.gs:61` | — | FAIL |
| MENU-038 | 38 | Master List › 🧩 Start - up › 🖼️ Build All Templates + Validate | `buildAllTemplatesAndValidate` | `1_Config.gs:62` | `5_System_Templates.gs:287–314` | PASS |
| MENU-039 | 39 | Master List › 📇 Index › 📇 Build / Update Index | `updateIndexSheet` | `1_Config.gs:64` | `4_System_Index.gs:225–257` | PASS |
| MENU-040 | 40 | Master List › 📇 Index › ↩️ Restore Selected Archive Row | `restoreSheetFromActiveIndexRow` | `1_Config.gs:65` | `4_System_Index.gs:280–327` | PASS |
| MENU-041 | 41 | Master List › 📇 Index › 🌐 Configure Index Restore Web App URL | `configureIndexRestoreWebAppUrl` | `1_Config.gs:66` | `4_System_Index.gs:34–50` | PASS |
| MENU-042 | 42 | Master List › 📇 Index › 🔗 Configure Archive Spreadsheet ID | `configureArchiveSpreadsheetId` | `1_Config.gs:67` | `4_System_Index.gs:15–32` | PASS |

## Complete Trigger Registration Catalog

| ID | Entry | Type | Activation | Evidence | Event object | Status |
|---|---|---|---|---|---|---|
| TRG-001 | `onOpen` | simple open trigger | reserved-name automatic activation | `1_Config.gs:8–69` | Not declared | PASS (existence); deployed inventory NOT VERIFIED |
| TRG-002 | `doGet` | web-app GET entry | deployment HTTP routing | `4_System_Index.gs:388–424` | Declared/used | PASS (existence); deployed inventory NOT VERIFIED |

No `ScriptApp.newTrigger` occurrence exists in the audited modules. Container-configured installable triggers are NOT VERIFIED. Menu order above preserves exact registration order.

## Public Entry-Point Register

| ID | Entry | Type | Activation | Evidence | Event object | Status |
|---|---|---|---|---|---|---|
| TRG-001 | `onOpen` | simple open trigger | reserved-name automatic activation | `1_Config.gs:8–69` | Not declared | PASS (existence); deployed inventory NOT VERIFIED |
| TRG-002 | `doGet` | web-app GET entry | deployment HTTP routing | `4_System_Index.gs:388–424` | Declared/used | PASS (existence); deployed inventory NOT VERIFIED |

## Callback and Wrapper Register

### Callbacks

| ID | Callback | Menu IDs | Evidence | Status |
|---|---|---|---|---|
| CB-001 | `formatMonthlySheets` | MENU-001 | — | FAIL |
| CB-002 | `runMonthlyUpdate` | MENU-002 | — | FAIL |
| CB-003 | `runMonthlyStart` | MENU-003 | — | FAIL |
| CB-004 | `hideMonthlyImportSheets` | MENU-004 | — | FAIL |
| CB-005 | `archiveMonthlyImportSheets` | MENU-005 | — | FAIL |
| CB-006 | `hideMonthlyActiveSheets` | MENU-006 | — | FAIL |
| CB-007 | `archiveMonthlyActiveSheets` | MENU-007 | — | FAIL |
| CB-008 | `buildAllTemplatesAndValidate` | MENU-008, MENU-038 | `5_System_Templates.gs:287–314` | PASS |
| CB-009 | `showReportTemplates` | MENU-009 | — | FAIL |
| CB-010 | `hideReportTemplates` | MENU-010 | — | FAIL |
| CB-011 | `hideSystemSheets_` | MENU-011 | — | FAIL |
| CB-012 | `showSystemSheets_` | MENU-012 | — | FAIL |
| CB-013 | `quickSystemSetup` | MENU-013 | — | FAIL |
| CB-014 | `buildSystemSheets` | MENU-014, MENU-034 | — | FAIL |
| CB-015 | `setupSystemSheets` | MENU-015, MENU-035 | — | FAIL |
| CB-016 | `quickBuildAllTemplates` | MENU-016 | `5_System_Templates.gs:316–320` | PASS |
| CB-017 | `runDashboardQualityWorkflow` | MENU-017, MENU-020 | — | FAIL |
| CB-018 | `runDashboardQualityStartUp` | MENU-018 | — | FAIL |
| CB-019 | `runDashboardQualityValidateTemplates` | MENU-019 | — | FAIL |
| CB-020 | `formatBannerReport` | MENU-021 | — | FAIL |
| CB-021 | `formatCarePlanDueReport` | MENU-022 | — | FAIL |
| CB-022 | `formatUnlockedCarePlanReport` | MENU-023 | — | FAIL |
| CB-023 | `formatRawData` | MENU-024 | — | FAIL |
| CB-024 | `updateRefinedDataMonthlySync` | MENU-025 | — | FAIL |
| CB-025 | `buildRefinedDataFromScratch` | MENU-026 | `7_Workflow_DemoP.gs:11–30` | PASS |
| CB-026 | `createDisenrolledList` | MENU-027 | `_10_Workflow_Disenrolled.gs:11–23` | PASS |
| CB-027 | `buildMonthlyChangeReport` | MENU-028 | `9_Workflow_MonthlyChange.gs:66–72` | PASS |
| CB-028 | `createMasterList` | MENU-029 | `8_Workflow_MasterList.gs:120–124` | PASS |
| CB-029 | `createSystemTemplates` | MENU-030 | — | FAIL |
| CB-030 | `clearDiagnosticsAndTimingLogs` | MENU-031 | — | FAIL |
| CB-031 | `toggleFrameworkTiming` | MENU-032 | — | FAIL |
| CB-032 | `enforceGlobalSheetSortOrder` | MENU-033 | — | FAIL |
| CB-033 | `rebuildFormatDashboardDefaults` | MENU-036 | — | FAIL |
| CB-034 | `saveActiveLayoutToDashboardSettings` | MENU-037 | — | FAIL |
| CB-035 | `updateIndexSheet` | MENU-039 | `4_System_Index.gs:225–257` | PASS |
| CB-036 | `restoreSheetFromActiveIndexRow` | MENU-040 | `4_System_Index.gs:280–327` | PASS |
| CB-037 | `configureIndexRestoreWebAppUrl` | MENU-041 | `4_System_Index.gs:34–50` | PASS |
| CB-038 | `configureArchiveSpreadsheetId` | MENU-042 | `4_System_Index.gs:15–32` | PASS |

### Static short-wrapper candidates

| ID | Function | Target | Evidence | Classification |
|---|---|---|---|---|
| WRAP-001 | `getDocumentPropertiesCached_` | `getRuntimeCache_` | `1_Config.gs:170–174` | wrapper candidate; target resolves |
| WRAP-002 | `getArchiveSpreadsheetId_` | `getDocumentPropertiesCached_` | `1_Config.gs:176–178` | wrapper candidate; target resolves |
| WRAP-003 | `getTabOrganizationProfilesForSort_` | `loadDashboardConfig_` | `2_Dashboard_Loaders.gs:268–271` | wrapper candidate; target resolves |
| WRAP-004 | `getSheetDefinitionByType_` | `getSheetDefinitionByTypeOrNull_` | `2_Dashboard_Loaders.gs:334–338` | wrapper candidate; target resolves |
| WRAP-005 | `getHeadersForSheetType_` | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:379–383` | wrapper candidate; target resolves |
| WRAP-006 | `normalizeKey_` | `normalizeText_` | `3_Core_Helpers.gs:31–33` | wrapper candidate; target resolves |
| WRAP-007 | `safeSheetName_` | `normalizeText_` | `3_Core_Helpers.gs:77–79` | wrapper candidate; target resolves |
| WRAP-008 | `normalizeRowsToWidth_` | `padRowToWidth_` | `3_Core_Helpers.gs:89–91` | wrapper candidate; target resolves |
| WRAP-009 | `isDateLikeHeader_` | `normalizeHeader_` | `3_Core_Helpers.gs:150–155` | wrapper candidate; target resolves |
| WRAP-010 | `getPMRIndex_` | `findHeaderIndex_` | `3_Core_Helpers.gs:209–211` | wrapper candidate; target resolves |
| WRAP-011 | `getDOBIndex_` | `findHeaderIndex_` | `3_Core_Helpers.gs:213–215` | wrapper candidate; target resolves |
| WRAP-012 | `markRuntimeStep_` | `markFrameworkStep_` | `3_Core_Helpers.gs:279–281` | wrapper candidate; target resolves |
| WRAP-013 | `writeRuntimeTimingReport_` | `writeFrameworkTimingReport_` | `3_Core_Helpers.gs:300–302` | wrapper candidate; target resolves |
| WRAP-014 | `buildIndexRestoreHyperlinkFormula_` | `getIndexRestoreWebAppUrl_` | `4_System_Index.gs:356–362` | wrapper candidate; target resolves |
| WRAP-015 | `forceBaseTemplateHidden_` | `logBestEffortWarning_` | `5_System_Templates.gs:145–152` | wrapper candidate; target resolves |
| WRAP-016 | `quickBuildAllTemplates` | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:316–320` | wrapper candidate; target resolves |
| WRAP-017 | `createMasterList` | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:120–124` | wrapper candidate; target resolves |
| WRAP-018 | `runMasterContactProcessData_` | `writePMRContactsToParticipantRows_` | `8_Workflow_MasterList.gs:291–294` | wrapper candidate; target resolves |
| WRAP-019 | `buildStagedMasterListSheetName_` | `safeSheetName_` | `8_Workflow_MasterList.gs:421–424` | wrapper candidate; target resolves |
| WRAP-020 | `validateStagedMasterListBeforeSwap_` | `isStagedMasterListSheet_` | `8_Workflow_MasterList.gs:431–435` | wrapper candidate; target resolves |
| WRAP-021 | `buildMonthlyChangeReport` | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:66–72` | wrapper candidate; target resolves |
| WRAP-022 | `buildPrimitiveRowsHash_` | `normalizeCompareValue_` | `9_Workflow_MonthlyChange.gs:213–217` | wrapper candidate; target resolves |
| WRAP-023 | `isMonthlyChangeDisenrollmentEffectiveDate_` | `isSameDate_` | `9_Workflow_MonthlyChange.gs:242–244` | wrapper candidate; target resolves |
| WRAP-024 | `displayValueForReport_` | `formatDateDisplay_` | `9_Workflow_MonthlyChange.gs:301–304` | wrapper candidate; target resolves |
| WRAP-025 | `formatDateDisplay_` | `normalizeToDateObject_` | `9_Workflow_MonthlyChange.gs:306–309` | wrapper candidate; target resolves |
| WRAP-026 | `appendMonthlyChangeCompiledRow_` | `padRowToWidth_` | `9_Workflow_MonthlyChange.gs:368–373` | wrapper candidate; target resolves |
| WRAP-027 | `getMonthlyChangeReportDateIndexes_` | `isDateLikeHeader_` | `9_Workflow_MonthlyChange.gs:491–497` | wrapper candidate; target resolves |

## Registration Defect Register

| Finding | Classification | Evidence |
|---|---|---|
| Registered callback-string resolution | FAIL | 28 of 38 unique callbacks are absent; 31 of 42 registration paths target missing declarations. |
| Duplicate callback registrations | WARNING | Shared callbacks are retained as distinct menu paths; see catalog |
| Installable/deployed trigger inventory | NOT VERIFIED | No container/deployment export supplied |

## Script 01 reconciliation counts

- Source files: **10**
- Top-level menus: **1**
- Submenus (unique menu containers excluding root): **15**
- Menu commands: **42**
- Callback registrations: **42**
- Unique callbacks: **38**
- Runtime entries/triggers: **2**
- Static wrapper candidates: **27**
- Missing callbacks: **28**
