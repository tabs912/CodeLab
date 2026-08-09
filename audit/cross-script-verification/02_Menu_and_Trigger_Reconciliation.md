# Menu and Trigger Reconciliation

**Stage 2 status:** COMPLETE WITH OPEN ISSUES.

## Section 4 — Menu cross-verification

| ID | Display/Menu Path Leaf | Previous Callback | Current Modular Callback | Wrapper | Implementation Evidence | Status |
|---|---|---|---|---|---|---|
| MENU-0001 | 📚 Format Monthly Sheets | `formatMonthlySheets` | `formatMonthlySheets` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0002 | 🔁 Create Monthly Update | `runMonthlyUpdate` | `runMonthlyUpdate` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0003 | 🏁 Create Monthly Start | `runMonthlyStart` | `runMonthlyStart` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0004 | 🗂️ Hide Monthly Sub-Reports | `hideMonthlyImportSheets` | `hideMonthlyImportSheets` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0005 | 🗃️ Archive Monthly Sub-Reports | `archiveMonthlyImportSheets` | `archiveMonthlyImportSheets` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0006 | 🗂️ Hide Monthly Active Sheets | `hideMonthlyActiveSheets` | `hideMonthlyActiveSheets` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0007 | 🗃️ Archive Monthly Active Sheets | `archiveMonthlyActiveSheets` | `archiveMonthlyActiveSheets` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0008 | Build All Templates + Validate | `buildAllTemplatesAndValidate` | `buildAllTemplatesAndValidate` | No/implementation entry | `Master_List/Current Production Script/Modules/5_System_Templates.gs`:287–314 | PASS |
| MENU-0009 | Show Templates | `showReportTemplates` | `showReportTemplates` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0010 | Hide Templates | `hideReportTemplates` | `hideReportTemplates` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0011 | Hide System Sheets | `hideSystemSheets_` | `hideSystemSheets_` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0012 | Show System Sheets | `showSystemSheets_` | `showSystemSheets_` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0013 | 🏗️ System Set up | `quickSystemSetup` | `quickSystemSetup` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0014 | Build System Sheets | `buildSystemSheets` | `buildSystemSheets` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0015 | Set up System Sheets | `setupSystemSheets` | `setupSystemSheets` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0016 | 🖼️ Build Templates + Validate Templates | `quickBuildAllTemplates` | `quickBuildAllTemplates` | No/implementation entry | `Master_List/Current Production Script/Modules/5_System_Templates.gs`:316–320 | PASS |
| MENU-0017 | ✅ Dashboard Quality Workflow | `runDashboardQualityWorkflow` | `runDashboardQualityWorkflow` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0018 | Dashboard Quality Start up | `runDashboardQualityStartUp` | `runDashboardQualityStartUp` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0019 | Dashboard Quality Validate Templates | `runDashboardQualityValidateTemplates` | `runDashboardQualityValidateTemplates` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0020 | Dashboard Quality Workflow | `runDashboardQualityWorkflow` | `runDashboardQualityWorkflow` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0021 | Banner | `formatBannerReport` | `formatBannerReport` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0022 | CP Due Date | `formatCarePlanDueReport` | `formatCarePlanDueReport` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0023 | Unlocked CP | `formatUnlockedCarePlanReport` | `formatUnlockedCarePlanReport` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0024 | Raw Data | `formatRawData` | `formatRawData` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0025 | 🔄 Update Refined Data | `updateRefinedDataMonthlySync` | `updateRefinedDataMonthlySync` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0026 | 🛠️ Build Refined Data | `buildRefinedDataFromScratch` | `buildRefinedDataFromScratch` | No/implementation entry | `Master_List/Current Production Script/Modules/7_Workflow_DemoP.gs`:11–30 | PASS |
| MENU-0027 | ⛔ Create / Update Disenrolled List | `createDisenrolledList` | `createDisenrolledList` | No/implementation entry | `Master_List/Current Production Script/Modules/_10_Workflow_Disenrolled.gs`:11–23 | PASS |
| MENU-0028 | 🗓️ Monthly Change Report | `buildMonthlyChangeReport` | `buildMonthlyChangeReport` | No/implementation entry | `Master_List/Current Production Script/Modules/9_Workflow_MonthlyChange.gs`:66–72 | PASS |
| MENU-0029 | 💡 Create Master List | `createMasterList` | `createMasterList` | Yes | `Master_List/Current Production Script/Modules/8_Workflow_MasterList.gs`:120–124 | PASS |
| MENU-0030 | 🏗️ Rebuild System Templates | `—` | `createSystemTemplates` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0031 | 🪄 Clear Diagnostics & Timing | `—` | `clearDiagnosticsAndTimingLogs` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0032 | ⏱️ Framework Timing on/off | `toggleFrameworkTiming` | `toggleFrameworkTiming` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0033 | 🧭 Organize Tabs | `enforceGlobalSheetSortOrder` | `enforceGlobalSheetSortOrder` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0034 | Build System Sheets | `buildSystemSheets` | `buildSystemSheets` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0035 | 📜 Set up System Sheets | `setupSystemSheets` | `setupSystemSheets` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0036 | 🎨 Format Dashboard | `rebuildFormatDashboardDefaults` | `rebuildFormatDashboardDefaults` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0037 | 💾 Save Active Layout as Rebuild Default | `saveActiveLayoutToDashboardSettings` | `saveActiveLayoutToDashboardSettings` | No/implementation entry | — | FAIL — callback absent from modules |
| MENU-0038 | 🖼️ Build All Templates + Validate | `buildAllTemplatesAndValidate` | `buildAllTemplatesAndValidate` | No/implementation entry | `Master_List/Current Production Script/Modules/5_System_Templates.gs`:287–314 | PASS |
| MENU-0039 | 📇 Build / Update Index | `updateIndexSheet` | `updateIndexSheet` | No/implementation entry | `Master_List/Current Production Script/Modules/4_System_Index.gs`:225–257 | PASS |
| MENU-0040 | ↩️ Restore Selected Archive Row | `restoreSheetFromActiveIndexRow` | `restoreSheetFromActiveIndexRow` | No/implementation entry | `Master_List/Current Production Script/Modules/4_System_Index.gs`:280–327 | PASS |
| MENU-0041 | 🌐 Configure Index Restore Web App URL | `configureIndexRestoreWebAppUrl` | `configureIndexRestoreWebAppUrl` | No/implementation entry | `Master_List/Current Production Script/Modules/4_System_Index.gs`:34–50 | PASS |
| MENU-0042 | 🔗 Configure Archive Spreadsheet ID | `configureArchiveSpreadsheetId` | `configureArchiveSpreadsheetId` | No/implementation entry | `Master_List/Current Production Script/Modules/4_System_Index.gs`:15–32 | PASS |

### Complete path disposition

* All 42 `.addItem()` registrations were extracted in source order. Separators are non-executable and excluded from this executable-item total.
* 11 modular registration paths resolve; 31 do not. The absent callback set contains 28 unique names.
* For a resolving item, its path is: menu registration → callback declaration shown above → named calls in Stage 1 → child/helper/validator/logging/timing leaves. For an absent callback, execution stops at callback resolution and is **FAIL**.
* Previous and rebuilt combined scripts each contain 44 and 44 executable registrations respectively; callback resolution is 33/44 and 33/44.

## Section 5 — Trigger cross-verification

| ID | Trigger | Type | Previous Entry | Current Entry | Installer | Wrapper/Implementation | Status |
|---|---|---|---|---|---|---|---|
| TRG-0001 | `onOpen` | Simple spreadsheet open | present | `1_Config.gs:8` declaration | none required | builds menu | PASS static; deployed state NOT VERIFIED |
| TRG-0002 | `doGet(e)` | Web-app GET | present | `4_System_Index.gs:388` declaration | deployment-bound | restore dispatcher and HTML response | PASS static; deployment NOT VERIFIED |
| TRG-0003 | `onEdit(e)` | Simple spreadsheet edit | present | absent from modules | none required | no modular path | **FAIL for modular equivalence** |

**Confirmed cross-version difference:** `onEdit(e)` exists at `v1.8.9.8.4_Current_Script:2959` and `v1.8.9.8.4.4_Current_Script.gs:2981` but is absent from the modules. No `ScriptApp.newTrigger` registration occurs in the modules. Therefore no source-defined installable/time-driven trigger can be certified. `onOpen` accepts no event parameter (valid because it does not use one); `doGet(e)` accepts and uses its event object. Trigger paths resolve through Stage 1 calls, but permissions, owners, duplicate deployed triggers, deployment URL/version, logging, and live error behavior are **NOT VERIFIED** without container exports and execution.
