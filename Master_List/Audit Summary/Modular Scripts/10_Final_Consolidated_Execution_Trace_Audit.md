# Script 10 — Final Consolidated Execution Trace Audit

**Status:** COMPLETE (static-source audit)
**Governing prompt:** `Master_List/Prompts/Menu_Trigger_and_Function_Execution_Trace_Review_Prompt (1).docx.md`, Sections 1–12 and modular protocol
**Production source:** the ten `.gs` files in `Master_List/Current Production Script/Modules`
**Declared source version:** `1.8.9.8.4.0` (`MASTER_LIST_MERGE_ML_VERSION`)
**Source fingerprint (SHA-256, filename-sorted concatenation):** `5ee0461c0e722ac55304df8187ff10998b109eda2167306f63cdd4f54af559ab`
**Method:** exhaustive static parsing of named declarations, menu callback strings, and named call occurrences. Google service dispatch, deployed trigger state, workbook contents, permissions, quotas, and runtime-selected data paths are **NOT VERIFIED** without the live Apps Script container.

## 1. Executive Status Table

| Measure | Value | Status |
|---|---:|---|
| Source modules | 10 | PASS |
| Menu commands | 42 | FAIL: 31 registrations target absent declarations |
| Runtime entries/triggers | 2 | PASS for source existence; deployed state NOT VERIFIED |
| Unique callbacks | 38 | FAIL: 28 declarations absent |
| Reachable functions | 161 | PASS |
| Named call occurrences | 390 | PASS |
| Execution traces | 44 | PASS |
| Branch source rows | 560 | PASS for static catalog |

## 2. Complete Menu Registration Catalog

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

## 3. Complete Trigger Registration Catalog

| ID | Entry | Type | Activation | Evidence | Event object | Status |
|---|---|---|---|---|---|---|
| TRG-001 | `onOpen` | simple open trigger | reserved-name automatic activation | `1_Config.gs:8–69` | Not declared | PASS (existence); deployed inventory NOT VERIFIED |
| TRG-002 | `doGet` | web-app GET entry | deployment HTTP routing | `4_System_Index.gs:388–424` | Declared/used | PASS (existence); deployed inventory NOT VERIFIED |

## 4. Complete Hierarchical Function Call Graphs for Menu Items

## MENU-001 — Master List › 📊 Data & Processing Engine › 📚 Format Monthly Sheets

- `formatMonthlySheets` — **MISSING**

## MENU-002 — Master List › 📊 Data & Processing Engine › 🔁 Create Monthly Update

- `runMonthlyUpdate` — **MISSING**

## MENU-003 — Master List › 📊 Data & Processing Engine › 🏁 Create Monthly Start

- `runMonthlyStart` — **MISSING**

## MENU-004 — Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Sub-Reports › 🗂️ Hide Monthly Sub-Reports

- `hideMonthlyImportSheets` — **MISSING**

## MENU-005 — Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Sub-Reports › 🗃️ Archive Monthly Sub-Reports

- `archiveMonthlyImportSheets` — **MISSING**

## MENU-006 — Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Active Sheets › 🗂️ Hide Monthly Active Sheets

- `hideMonthlyActiveSheets` — **MISSING**

## MENU-007 — Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Active Sheets › 🗃️ Archive Monthly Active Sheets

- `archiveMonthlyActiveSheets` — **MISSING**

## MENU-008 — Master List › ⚙️ Sheet & Layout Management › 🙈 Templates › Build All Templates + Validate

- `buildAllTemplatesAndValidate` [FN-110] (5_System_Templates.gs:287–314)
  - calls `loadDashboardConfig_` at 5_System_Templates.gs:289 (direct lexical context)
    - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43)
      - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:23 (direct lexical context)
        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
      - calls `loadGlobalSettings_` at 2_Dashboard_Loaders.gs:31 (direct lexical context)
        - `loadGlobalSettings_` [FN-014] (2_Dashboard_Loaders.gs:97–126)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:98 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77)
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:110 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71)
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:111 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:112 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:113 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:114 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:117 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:118 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:119 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:120 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:121 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:122 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
      - calls `loadTitleRows_` at 2_Dashboard_Loaders.gs:32 (direct lexical context)
        - `loadTitleRows_` [FN-015] (2_Dashboard_Loaders.gs:131–144)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:132 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:136 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90)
              - calls `normalizeKey_` at 2_Dashboard_Loaders.gs:80 (direct lexical context)
                - `normalizeKey_` [FN-045] (3_Core_Helpers.gs:31–33)
                  - calls `normalizeText_` at 3_Core_Helpers.gs:32 (direct lexical context)
                    - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:137 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `parseTitleRowConfigRow_` at 2_Dashboard_Loaders.gs:140 (direct lexical context)
            - `parseTitleRowConfigRow_` [FN-016] (2_Dashboard_Loaders.gs:146–164)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:149 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `normalizeTitleTargetCell_` at 2_Dashboard_Loaders.gs:156 (direct lexical context)
                - `normalizeTitleTargetCell_` [FN-017] (2_Dashboard_Loaders.gs:166–170)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:157 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:158 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
      - calls `loadSheetDefinitions_` at 2_Dashboard_Loaders.gs:33 (direct lexical context)
        - `loadSheetDefinitions_` [FN-018] (2_Dashboard_Loaders.gs:175–195)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:176 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:178 (direct lexical context)
            - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75)
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:181 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
          - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:185 (direct lexical context)
            - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399)
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:186 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66)
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:188 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:189 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:192 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
      - calls `loadSheetBehaviors_` at 2_Dashboard_Loaders.gs:34 (direct lexical context)
        - `loadSheetBehaviors_` [FN-019] (2_Dashboard_Loaders.gs:200–218)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:201 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:205 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:208 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:209 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:210 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:211 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:212 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
      - calls `loadSystemSurfaces_` at 2_Dashboard_Loaders.gs:35 (direct lexical context)
        - `loadSystemSurfaces_` [FN-020] (2_Dashboard_Loaders.gs:223–245)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:224 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:233 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:234 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:235 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:236 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:237 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:238 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:240 (direct lexical context)
            - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
      - calls `loadTabOrganization_` at 2_Dashboard_Loaders.gs:36 (direct lexical context)
        - `loadTabOrganization_` [FN-021] (2_Dashboard_Loaders.gs:250–266)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:251 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:260 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
      - calls `loadColumnDefinitions_` at 2_Dashboard_Loaders.gs:37 (direct lexical context)
        - `loadColumnDefinitions_` [FN-023] (2_Dashboard_Loaders.gs:276–297)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:277 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:281 (direct lexical context)
            - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10)
          - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:285 (direct lexical context)
            - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:285 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:286 (direct lexical context)
            - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:286 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:287 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:288 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
      - calls `loadSheetHeaders_` at 2_Dashboard_Loaders.gs:38 (direct lexical context)
        - `loadSheetHeaders_` [FN-024] (2_Dashboard_Loaders.gs:302–323)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:303 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:307 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:308 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:309 (direct lexical context)
            - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
  - calls `ensureGoldenMasterTemplate_` at 5_System_Templates.gs:290 (direct lexical context)
    - `ensureGoldenMasterTemplate_` [FN-099] (5_System_Templates.gs:48–71)
      - calls `markFrameworkStep_` at 5_System_Templates.gs:69 (conditional/loop context)
        - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277)
  - calls `createOrRefreshTemplateFromDashboard_` at 5_System_Templates.gs:297 (direct lexical context)
    - `createOrRefreshTemplateFromDashboard_` [FN-103] (5_System_Templates.gs:156–177)
      - calls `ensureGoldenMasterTemplate_` at 5_System_Templates.gs:162 (conditional/loop context)
        - `ensureGoldenMasterTemplate_` [FN-099] (5_System_Templates.gs:48–71) — shared/cycle expansion stopped
      - calls `getHeadersForSheetType_` at 5_System_Templates.gs:167 (direct lexical context)
        - `getHeadersForSheetType_` [FN-031] (2_Dashboard_Loaders.gs:379–383)
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:380 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
      - calls `getBehaviorForSheetType_` at 5_System_Templates.gs:168 (direct lexical context)
        - `getBehaviorForSheetType_` [FN-028] (2_Dashboard_Loaders.gs:358–362)
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:359 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
          - calls `getDefaultBehavior_` at 2_Dashboard_Loaders.gs:361 (conditional/loop context)
            - `getDefaultBehavior_` [FN-030] (2_Dashboard_Loaders.gs:368–377)
      - calls `buildTemplateFromDashboard_` at 5_System_Templates.gs:172 (direct lexical context)
        - `buildTemplateFromDashboard_` [FN-104] (5_System_Templates.gs:179–191)
          - calls `markFrameworkStep_` at 5_System_Templates.gs:180 (direct lexical context)
            - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
          - calls `clearTemplateForFullBuild_` at 5_System_Templates.gs:183 (direct lexical context)
            - `clearTemplateForFullBuild_` [FN-105] (5_System_Templates.gs:193–209)
              - calls `markFrameworkStep_` at 5_System_Templates.gs:208 (direct lexical context)
                - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
          - calls `applyTemplateBaseFormatting_` at 5_System_Templates.gs:185 (direct lexical context)
            - `applyTemplateBaseFormatting_` [FN-106] (5_System_Templates.gs:211–236)
              - calls `getThemeColorsFromBase_` at 5_System_Templates.gs:213 (direct lexical context)
                - `getThemeColorsFromBase_` [FN-034] (2_Dashboard_Loaders.gs:401–426)
                  - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:403 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:404 (direct lexical context)
                    - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
                  - calls `hexToHsl_` at 2_Dashboard_Loaders.gs:408 (direct lexical context)
                    - `hexToHsl_` [FN-038] (2_Dashboard_Loaders.gs:511–533)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:409 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:410 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:411 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:412 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:413 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `hslToHex_` at 2_Dashboard_Loaders.gs:417 (direct lexical context)
                    - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544)
                  - calls `hslToHex_` at 2_Dashboard_Loaders.gs:418 (direct lexical context)
                    - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
                  - calls `hslToHex_` at 2_Dashboard_Loaders.gs:419 (direct lexical context)
                    - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
                  - calls `hslToHex_` at 2_Dashboard_Loaders.gs:420 (direct lexical context)
                    - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
                  - calls `hslToHex_` at 2_Dashboard_Loaders.gs:421 (direct lexical context)
                    - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
              - calls `ensureTemplateFilter_` at 5_System_Templates.gs:234 (direct lexical context)
                - `ensureTemplateFilter_` [FN-107] (5_System_Templates.gs:238–259)
                  - calls `markFrameworkStep_` at 5_System_Templates.gs:248 (conditional/loop context)
                    - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
                  - calls `markFrameworkStep_` at 5_System_Templates.gs:257 (conditional/loop context)
                    - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
          - calls `writeTemplateMetadata_` at 5_System_Templates.gs:186 (direct lexical context)
            - `writeTemplateMetadata_` [FN-109] (5_System_Templates.gs:272–283)
          - calls `applyTemplateFreezeAndTabColor_` at 5_System_Templates.gs:187 (direct lexical context)
            - `applyTemplateFreezeAndTabColor_` [FN-108] (5_System_Templates.gs:261–270)
              - calls `getThemeColorsFromBase_` at 5_System_Templates.gs:265 (direct lexical context)
                - `getThemeColorsFromBase_` [FN-034] (2_Dashboard_Loaders.gs:401–426) — shared/cycle expansion stopped
          - calls `markFrameworkStep_` at 5_System_Templates.gs:189 (direct lexical context)
            - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
  - calls `logBestEffortWarning_` at 5_System_Templates.gs:301 (direct lexical context)
    - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307)
  - calls `setReportTemplateVisibility_` at 5_System_Templates.gs:306 (direct lexical context)
    - `setReportTemplateVisibility_` [FN-112] (5_System_Templates.gs:322–342)
      - calls `forceBaseTemplateHidden_` at 5_System_Templates.gs:341 (direct lexical context)
        - `forceBaseTemplateHidden_` [FN-102] (5_System_Templates.gs:145–152)
          - calls `logBestEffortWarning_` at 5_System_Templates.gs:150 (direct lexical context)
            - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307) — shared/cycle expansion stopped
  - calls `forceBaseTemplateHidden_` at 5_System_Templates.gs:307 (direct lexical context)
    - `forceBaseTemplateHidden_` [FN-102] (5_System_Templates.gs:145–152) — shared/cycle expansion stopped

## MENU-009 — Master List › ⚙️ Sheet & Layout Management › 🙈 Templates › Show Templates

- `showReportTemplates` — **MISSING**

## MENU-010 — Master List › ⚙️ Sheet & Layout Management › 🙈 Templates › Hide Templates

- `hideReportTemplates` — **MISSING**

## MENU-011 — Master List › ⚙️ Sheet & Layout Management › 😎 System Sheets › Hide System Sheets

- `hideSystemSheets_` — **MISSING**

## MENU-012 — Master List › ⚙️ Sheet & Layout Management › 😎 System Sheets › Show System Sheets

- `showSystemSheets_` — **MISSING**

## MENU-013 — Master List › 🚀 Quick Start-up › 🏗️ System Set up

- `quickSystemSetup` — **MISSING**

## MENU-014 — Master List › 🚀 Quick Start-up › Build System Sheets

- `buildSystemSheets` — **MISSING**

## MENU-015 — Master List › 🚀 Quick Start-up › Set up System Sheets

- `setupSystemSheets` — **MISSING**

## MENU-016 — Master List › 🚀 Quick Start-up › 🖼️ Build Templates + Validate Templates

- `quickBuildAllTemplates` [FN-111] (5_System_Templates.gs:316–320)
  - calls `buildAllTemplatesAndValidate` at 5_System_Templates.gs:318 (direct lexical context)
    - `buildAllTemplatesAndValidate` [FN-110] (5_System_Templates.gs:287–314)
      - calls `loadDashboardConfig_` at 5_System_Templates.gs:289 (direct lexical context)
        - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43)
          - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:23 (direct lexical context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
          - calls `loadGlobalSettings_` at 2_Dashboard_Loaders.gs:31 (direct lexical context)
            - `loadGlobalSettings_` [FN-014] (2_Dashboard_Loaders.gs:97–126)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:98 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:110 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:111 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:112 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:113 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:114 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:117 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:118 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:119 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:120 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:121 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:122 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadTitleRows_` at 2_Dashboard_Loaders.gs:32 (direct lexical context)
            - `loadTitleRows_` [FN-015] (2_Dashboard_Loaders.gs:131–144)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:132 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:136 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90)
                  - calls `normalizeKey_` at 2_Dashboard_Loaders.gs:80 (direct lexical context)
                    - `normalizeKey_` [FN-045] (3_Core_Helpers.gs:31–33)
                      - calls `normalizeText_` at 3_Core_Helpers.gs:32 (direct lexical context)
                        - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:137 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseTitleRowConfigRow_` at 2_Dashboard_Loaders.gs:140 (direct lexical context)
                - `parseTitleRowConfigRow_` [FN-016] (2_Dashboard_Loaders.gs:146–164)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:149 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `normalizeTitleTargetCell_` at 2_Dashboard_Loaders.gs:156 (direct lexical context)
                    - `normalizeTitleTargetCell_` [FN-017] (2_Dashboard_Loaders.gs:166–170)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:157 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:158 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadSheetDefinitions_` at 2_Dashboard_Loaders.gs:33 (direct lexical context)
            - `loadSheetDefinitions_` [FN-018] (2_Dashboard_Loaders.gs:175–195)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:176 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:178 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75)
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:181 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:185 (direct lexical context)
                - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399)
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:186 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:188 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:189 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:192 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadSheetBehaviors_` at 2_Dashboard_Loaders.gs:34 (direct lexical context)
            - `loadSheetBehaviors_` [FN-019] (2_Dashboard_Loaders.gs:200–218)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:201 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:205 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:208 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:209 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:210 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:211 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:212 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `loadSystemSurfaces_` at 2_Dashboard_Loaders.gs:35 (direct lexical context)
            - `loadSystemSurfaces_` [FN-020] (2_Dashboard_Loaders.gs:223–245)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:224 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:233 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:234 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:235 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:236 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:237 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:238 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:240 (direct lexical context)
                - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
          - calls `loadTabOrganization_` at 2_Dashboard_Loaders.gs:36 (direct lexical context)
            - `loadTabOrganization_` [FN-021] (2_Dashboard_Loaders.gs:250–266)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:251 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:260 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadColumnDefinitions_` at 2_Dashboard_Loaders.gs:37 (direct lexical context)
            - `loadColumnDefinitions_` [FN-023] (2_Dashboard_Loaders.gs:276–297)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:277 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:281 (direct lexical context)
                - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10)
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:285 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:285 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:286 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:286 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:287 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:288 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `loadSheetHeaders_` at 2_Dashboard_Loaders.gs:38 (direct lexical context)
            - `loadSheetHeaders_` [FN-024] (2_Dashboard_Loaders.gs:302–323)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:303 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:307 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:308 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:309 (direct lexical context)
                - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
      - calls `ensureGoldenMasterTemplate_` at 5_System_Templates.gs:290 (direct lexical context)
        - `ensureGoldenMasterTemplate_` [FN-099] (5_System_Templates.gs:48–71)
          - calls `markFrameworkStep_` at 5_System_Templates.gs:69 (conditional/loop context)
            - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277)
      - calls `createOrRefreshTemplateFromDashboard_` at 5_System_Templates.gs:297 (direct lexical context)
        - `createOrRefreshTemplateFromDashboard_` [FN-103] (5_System_Templates.gs:156–177)
          - calls `ensureGoldenMasterTemplate_` at 5_System_Templates.gs:162 (conditional/loop context)
            - `ensureGoldenMasterTemplate_` [FN-099] (5_System_Templates.gs:48–71) — shared/cycle expansion stopped
          - calls `getHeadersForSheetType_` at 5_System_Templates.gs:167 (direct lexical context)
            - `getHeadersForSheetType_` [FN-031] (2_Dashboard_Loaders.gs:379–383)
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:380 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
          - calls `getBehaviorForSheetType_` at 5_System_Templates.gs:168 (direct lexical context)
            - `getBehaviorForSheetType_` [FN-028] (2_Dashboard_Loaders.gs:358–362)
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:359 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `getDefaultBehavior_` at 2_Dashboard_Loaders.gs:361 (conditional/loop context)
                - `getDefaultBehavior_` [FN-030] (2_Dashboard_Loaders.gs:368–377)
          - calls `buildTemplateFromDashboard_` at 5_System_Templates.gs:172 (direct lexical context)
            - `buildTemplateFromDashboard_` [FN-104] (5_System_Templates.gs:179–191)
              - calls `markFrameworkStep_` at 5_System_Templates.gs:180 (direct lexical context)
                - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
              - calls `clearTemplateForFullBuild_` at 5_System_Templates.gs:183 (direct lexical context)
                - `clearTemplateForFullBuild_` [FN-105] (5_System_Templates.gs:193–209)
                  - calls `markFrameworkStep_` at 5_System_Templates.gs:208 (direct lexical context)
                    - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
              - calls `applyTemplateBaseFormatting_` at 5_System_Templates.gs:185 (direct lexical context)
                - `applyTemplateBaseFormatting_` [FN-106] (5_System_Templates.gs:211–236)
                  - calls `getThemeColorsFromBase_` at 5_System_Templates.gs:213 (direct lexical context)
                    - `getThemeColorsFromBase_` [FN-034] (2_Dashboard_Loaders.gs:401–426)
                      - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:403 (direct lexical context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                      - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:404 (direct lexical context)
                        - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
                      - calls `hexToHsl_` at 2_Dashboard_Loaders.gs:408 (direct lexical context)
                        - `hexToHsl_` [FN-038] (2_Dashboard_Loaders.gs:511–533)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:409 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:410 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:411 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:412 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:413 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `hslToHex_` at 2_Dashboard_Loaders.gs:417 (direct lexical context)
                        - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544)
                      - calls `hslToHex_` at 2_Dashboard_Loaders.gs:418 (direct lexical context)
                        - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
                      - calls `hslToHex_` at 2_Dashboard_Loaders.gs:419 (direct lexical context)
                        - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
                      - calls `hslToHex_` at 2_Dashboard_Loaders.gs:420 (direct lexical context)
                        - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
                      - calls `hslToHex_` at 2_Dashboard_Loaders.gs:421 (direct lexical context)
                        - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
                  - calls `ensureTemplateFilter_` at 5_System_Templates.gs:234 (direct lexical context)
                    - `ensureTemplateFilter_` [FN-107] (5_System_Templates.gs:238–259)
                      - calls `markFrameworkStep_` at 5_System_Templates.gs:248 (conditional/loop context)
                        - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
                      - calls `markFrameworkStep_` at 5_System_Templates.gs:257 (conditional/loop context)
                        - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
              - calls `writeTemplateMetadata_` at 5_System_Templates.gs:186 (direct lexical context)
                - `writeTemplateMetadata_` [FN-109] (5_System_Templates.gs:272–283)
              - calls `applyTemplateFreezeAndTabColor_` at 5_System_Templates.gs:187 (direct lexical context)
                - `applyTemplateFreezeAndTabColor_` [FN-108] (5_System_Templates.gs:261–270)
                  - calls `getThemeColorsFromBase_` at 5_System_Templates.gs:265 (direct lexical context)
                    - `getThemeColorsFromBase_` [FN-034] (2_Dashboard_Loaders.gs:401–426) — shared/cycle expansion stopped
              - calls `markFrameworkStep_` at 5_System_Templates.gs:189 (direct lexical context)
                - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
      - calls `logBestEffortWarning_` at 5_System_Templates.gs:301 (direct lexical context)
        - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307)
      - calls `setReportTemplateVisibility_` at 5_System_Templates.gs:306 (direct lexical context)
        - `setReportTemplateVisibility_` [FN-112] (5_System_Templates.gs:322–342)
          - calls `forceBaseTemplateHidden_` at 5_System_Templates.gs:341 (direct lexical context)
            - `forceBaseTemplateHidden_` [FN-102] (5_System_Templates.gs:145–152)
              - calls `logBestEffortWarning_` at 5_System_Templates.gs:150 (direct lexical context)
                - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307) — shared/cycle expansion stopped
      - calls `forceBaseTemplateHidden_` at 5_System_Templates.gs:307 (direct lexical context)
        - `forceBaseTemplateHidden_` [FN-102] (5_System_Templates.gs:145–152) — shared/cycle expansion stopped

## MENU-017 — Master List › 🚀 Quick Start-up › ✅ Dashboard Quality Workflow

- `runDashboardQualityWorkflow` — **MISSING**

## MENU-018 — Master List › 🛠️ Maintenance/Rebuild › 👌 Quality › Dashboard Quality Start up

- `runDashboardQualityStartUp` — **MISSING**

## MENU-019 — Master List › 🛠️ Maintenance/Rebuild › 👌 Quality › Dashboard Quality Validate Templates

- `runDashboardQualityValidateTemplates` — **MISSING**

## MENU-020 — Master List › 🛠️ Maintenance/Rebuild › 👌 Quality › Dashboard Quality Workflow

- `runDashboardQualityWorkflow` — **MISSING**

## MENU-021 — Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › Banner

- `formatBannerReport` — **MISSING**

## MENU-022 — Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › CP Due Date

- `formatCarePlanDueReport` — **MISSING**

## MENU-023 — Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › Unlocked CP

- `formatUnlockedCarePlanReport` — **MISSING**

## MENU-024 — Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › Raw Data

- `formatRawData` — **MISSING**

## MENU-025 — Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 📁 Refined Data › 🔄 Update Refined Data

- `updateRefinedDataMonthlySync` — **MISSING**

## MENU-026 — Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 📁 Refined Data › 🛠️ Build Refined Data

- `buildRefinedDataFromScratch` [FN-123] (7_Workflow_DemoP.gs:11–30)
  - calls `getValidatedRawDataSheetForDemoPBuild_` at 7_Workflow_DemoP.gs:16 (direct lexical context)
    - `getValidatedRawDataSheetForDemoPBuild_` [FN-124] (7_Workflow_DemoP.gs:32–49)
      - calls `markRuntimeStep_` at 7_Workflow_DemoP.gs:36 (conditional/loop context)
        - `markRuntimeStep_` [FN-072] (3_Core_Helpers.gs:279–281)
          - calls `markFrameworkStep_` at 3_Core_Helpers.gs:280 (direct lexical context)
            - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277)
      - calls `isStrictRawDataSheetCandidateForDemoP_` at 7_Workflow_DemoP.gs:42 (conditional/loop context)
        - `isStrictRawDataSheetCandidateForDemoP_` [FN-125] (7_Workflow_DemoP.gs:51–56)
      - calls `markRuntimeStep_` at 7_Workflow_DemoP.gs:44 (conditional/loop context)
        - `markRuntimeStep_` [FN-072] (3_Core_Helpers.gs:279–281) — shared/cycle expansion stopped
  - calls `markFrameworkStep_` at 7_Workflow_DemoP.gs:17 (direct lexical context)
    - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
  - calls `createActiveDemoPFromRawData_` at 7_Workflow_DemoP.gs:19 (direct lexical context)
    - `createActiveDemoPFromRawData_` [FN-126] (7_Workflow_DemoP.gs:58–85)
      - calls `loadDashboardConfig_` at 7_Workflow_DemoP.gs:66 (conditional/loop context)
        - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43)
          - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:23 (direct lexical context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
          - calls `loadGlobalSettings_` at 2_Dashboard_Loaders.gs:31 (direct lexical context)
            - `loadGlobalSettings_` [FN-014] (2_Dashboard_Loaders.gs:97–126)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:98 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:110 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:111 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:112 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:113 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:114 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:117 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:118 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:119 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:120 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:121 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:122 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadTitleRows_` at 2_Dashboard_Loaders.gs:32 (direct lexical context)
            - `loadTitleRows_` [FN-015] (2_Dashboard_Loaders.gs:131–144)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:132 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:136 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90)
                  - calls `normalizeKey_` at 2_Dashboard_Loaders.gs:80 (direct lexical context)
                    - `normalizeKey_` [FN-045] (3_Core_Helpers.gs:31–33)
                      - calls `normalizeText_` at 3_Core_Helpers.gs:32 (direct lexical context)
                        - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:137 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseTitleRowConfigRow_` at 2_Dashboard_Loaders.gs:140 (direct lexical context)
                - `parseTitleRowConfigRow_` [FN-016] (2_Dashboard_Loaders.gs:146–164)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:149 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `normalizeTitleTargetCell_` at 2_Dashboard_Loaders.gs:156 (direct lexical context)
                    - `normalizeTitleTargetCell_` [FN-017] (2_Dashboard_Loaders.gs:166–170)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:157 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:158 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadSheetDefinitions_` at 2_Dashboard_Loaders.gs:33 (direct lexical context)
            - `loadSheetDefinitions_` [FN-018] (2_Dashboard_Loaders.gs:175–195)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:176 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:178 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75)
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:181 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:185 (direct lexical context)
                - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399)
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:186 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:188 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:189 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:192 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadSheetBehaviors_` at 2_Dashboard_Loaders.gs:34 (direct lexical context)
            - `loadSheetBehaviors_` [FN-019] (2_Dashboard_Loaders.gs:200–218)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:201 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:205 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:208 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:209 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:210 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:211 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:212 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `loadSystemSurfaces_` at 2_Dashboard_Loaders.gs:35 (direct lexical context)
            - `loadSystemSurfaces_` [FN-020] (2_Dashboard_Loaders.gs:223–245)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:224 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:233 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:234 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:235 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:236 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:237 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:238 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:240 (direct lexical context)
                - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
          - calls `loadTabOrganization_` at 2_Dashboard_Loaders.gs:36 (direct lexical context)
            - `loadTabOrganization_` [FN-021] (2_Dashboard_Loaders.gs:250–266)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:251 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:260 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadColumnDefinitions_` at 2_Dashboard_Loaders.gs:37 (direct lexical context)
            - `loadColumnDefinitions_` [FN-023] (2_Dashboard_Loaders.gs:276–297)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:277 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:281 (direct lexical context)
                - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10)
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:285 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:285 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:286 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:286 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:287 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:288 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `loadSheetHeaders_` at 2_Dashboard_Loaders.gs:38 (direct lexical context)
            - `loadSheetHeaders_` [FN-024] (2_Dashboard_Loaders.gs:302–323)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:303 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:307 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:308 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:309 (direct lexical context)
                - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
      - calls `buildHeaderIndexMap_` at 7_Workflow_DemoP.gs:70 (direct lexical context)
        - `buildHeaderIndexMap_` [FN-063] (3_Core_Helpers.gs:193–200)
      - calls `processRefinedDataUnified_` at 7_Workflow_DemoP.gs:71 (direct lexical context)
        - `processRefinedDataUnified_` [FN-128] (7_Workflow_DemoP.gs:115–123)
          - calls `safeFlattenAndProcessContacts_` at 7_Workflow_DemoP.gs:117 (direct lexical context)
            - `safeFlattenAndProcessContacts_` [FN-129] (7_Workflow_DemoP.gs:125–133)
              - calls `flattenDemoPContactRowsInMemory_` at 7_Workflow_DemoP.gs:128 (direct lexical context)
                - `flattenDemoPContactRowsInMemory_` [FN-131] (7_Workflow_DemoP.gs:148–201)
                  - calls `buildHeaderIndexMap_` at 7_Workflow_DemoP.gs:150 (conditional/loop context)
                    - `buildHeaderIndexMap_` [FN-063] (3_Core_Helpers.gs:193–200) — shared/cycle expansion stopped
                  - calls `getPMRIndex_` at 7_Workflow_DemoP.gs:152 (direct lexical context)
                    - `getPMRIndex_` [FN-065] (3_Core_Helpers.gs:209–211)
                      - calls `findHeaderIndex_` at 3_Core_Helpers.gs:210 (direct lexical context)
                        - `findHeaderIndex_` [FN-064] (3_Core_Helpers.gs:202–207)
                  - calls `normalizePMR_` at 7_Workflow_DemoP.gs:162 (direct lexical context)
                    - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14)
                  - calls `buildDemoPContactSummaryForFlatRecord_` at 7_Workflow_DemoP.gs:179 (direct lexical context)
                    - `buildDemoPContactSummaryForFlatRecord_` [FN-132] (7_Workflow_DemoP.gs:203–213)
                  - calls `normalizeCompareValue_` at 7_Workflow_DemoP.gs:185 (conditional/loop context)
                    - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56)
                  - calls `normalizeCompareValue_` at 7_Workflow_DemoP.gs:188 (conditional/loop context)
                    - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
                  - calls `logBestEffortWarning_` at 7_Workflow_DemoP.gs:192 (direct lexical context)
                    - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307)
                  - calls `sortDemoPFlatRows_` at 7_Workflow_DemoP.gs:198 (direct lexical context)
                    - `sortDemoPFlatRows_` [FN-133] (7_Workflow_DemoP.gs:215–227)
              - calls `logBestEffortWarning_` at 7_Workflow_DemoP.gs:130 (direct lexical context)
                - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307) — shared/cycle expansion stopped
          - calls `processDemoPFreshRowsInMemory_` at 7_Workflow_DemoP.gs:118 (direct lexical context)
            - `processDemoPFreshRowsInMemory_` [FN-130] (7_Workflow_DemoP.gs:135–144)
              - calls `populateParticipantNameData_` at 7_Workflow_DemoP.gs:136 (direct lexical context)
                - `populateParticipantNameData_` [FN-134] (7_Workflow_DemoP.gs:231–243)
                  - calls `normalizeCompareValue_` at 7_Workflow_DemoP.gs:238 (conditional/loop context)
                    - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
              - calls `populateDemoPNameData_` at 7_Workflow_DemoP.gs:137 (direct lexical context)
                - `populateDemoPNameData_` [FN-135] (7_Workflow_DemoP.gs:245–257)
                  - calls `normalizeCompareValue_` at 7_Workflow_DemoP.gs:252 (conditional/loop context)
                    - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
              - calls `updateBannerColumnData_` at 7_Workflow_DemoP.gs:138 (direct lexical context)
                - `updateBannerColumnData_` [FN-136] (7_Workflow_DemoP.gs:259–274)
                  - calls `normalizeCompareValue_` at 7_Workflow_DemoP.gs:272 (conditional/loop context)
                    - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
              - calls `combineAddressesData_` at 7_Workflow_DemoP.gs:139 (direct lexical context)
                - `combineAddressesData_` [FN-137] (7_Workflow_DemoP.gs:276–288)
              - calls `handleLanguageData_` at 7_Workflow_DemoP.gs:140 (direct lexical context)
                - `handleLanguageData_` [FN-138] (7_Workflow_DemoP.gs:290–309)
              - calls `splitPhoneNumbersData_` at 7_Workflow_DemoP.gs:141 (direct lexical context)
                - `splitPhoneNumbersData_` [FN-139] (7_Workflow_DemoP.gs:311–336)
              - calls `runMasterContactProcessData_` at 7_Workflow_DemoP.gs:142 (direct lexical context)
                - `runMasterContactProcessData_` [FN-166] (8_Workflow_MasterList.gs:291–294)
                  - calls `writePMRContactsToParticipantRows_` at 8_Workflow_MasterList.gs:293 (direct lexical context)
                    - `writePMRContactsToParticipantRows_` [FN-167] (8_Workflow_MasterList.gs:296–367)
                      - calls `getPMRIndex_` at 8_Workflow_MasterList.gs:306 (direct lexical context)
                        - `getPMRIndex_` [FN-065] (3_Core_Helpers.gs:209–211) — shared/cycle expansion stopped
                      - calls `normalizePMR_` at 8_Workflow_MasterList.gs:316 (conditional/loop context)
                        - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14) — shared/cycle expansion stopped
                      - calls `buildParticipantContactKey_` at 8_Workflow_MasterList.gs:319 (direct lexical context)
                        - `buildParticipantContactKey_` [FN-168] (8_Workflow_MasterList.gs:369–376)
                          - calls `normalizePMR_` at 8_Workflow_MasterList.gs:370 (conditional/loop context)
                            - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14) — shared/cycle expansion stopped
                          - calls `normalizeKeyPart_` at 8_Workflow_MasterList.gs:372 (conditional/loop context)
                            - `normalizeKeyPart_` [FN-043] (3_Core_Helpers.gs:16–25)
                          - calls `normalizeKeyPart_` at 8_Workflow_MasterList.gs:373 (conditional/loop context)
                            - `normalizeKeyPart_` [FN-043] (3_Core_Helpers.gs:16–25) — shared/cycle expansion stopped
                      - calls `capitalizeContactPart_` at 8_Workflow_MasterList.gs:340 (conditional/loop context)
                        - `capitalizeContactPart_` [FN-169] (8_Workflow_MasterList.gs:378–380)
                      - calls `capitalizeContactPart_` at 8_Workflow_MasterList.gs:341 (conditional/loop context)
                        - `capitalizeContactPart_` [FN-169] (8_Workflow_MasterList.gs:378–380) — shared/cycle expansion stopped
                      - calls `buildParticipantContactKey_` at 8_Workflow_MasterList.gs:349 (direct lexical context)
                        - `buildParticipantContactKey_` [FN-168] (8_Workflow_MasterList.gs:369–376) — shared/cycle expansion stopped
                      - calls `normalizeCompareValue_` at 8_Workflow_MasterList.gs:356 (conditional/loop context)
                        - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
                      - calls `formatRankedContact_` at 8_Workflow_MasterList.gs:357 (conditional/loop context)
                        - `formatRankedContact_` [FN-170] (8_Workflow_MasterList.gs:382–391)
                      - calls `normalizeCompareValue_` at 8_Workflow_MasterList.gs:361 (conditional/loop context)
                        - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
              - calls `combineNotesSummaryData_` at 7_Workflow_DemoP.gs:143 (direct lexical context)
                - `combineNotesSummaryData_` [FN-140] (7_Workflow_DemoP.gs:338–365)
                  - calls `normalizeCompareValue_` at 7_Workflow_DemoP.gs:345 (conditional/loop context)
                    - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
          - calls `markFrameworkStep_` at 7_Workflow_DemoP.gs:121 (conditional/loop context)
            - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
      - calls `updateDemoPReportDates_` at 7_Workflow_DemoP.gs:78 (direct lexical context)
        - `updateDemoPReportDates_` [FN-147] (7_Workflow_DemoP.gs:509–514)
      - calls `clearSheetRuntimeCachesForSheet_` at 7_Workflow_DemoP.gs:82 (direct lexical context)
        - `clearSheetRuntimeCachesForSheet_` [FN-069] (3_Core_Helpers.gs:246–252)
          - calls `getRuntimeCache_` at 3_Core_Helpers.gs:249 (direct lexical context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `getRuntimeCache_` at 3_Core_Helpers.gs:249 (conditional/loop context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `getRuntimeCache_` at 3_Core_Helpers.gs:250 (direct lexical context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `getRuntimeCache_` at 3_Core_Helpers.gs:250 (conditional/loop context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `getRuntimeCache_` at 3_Core_Helpers.gs:251 (direct lexical context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
  - calls `enforceDemoPPostFlattenFormatting_` at 7_Workflow_DemoP.gs:23 (direct lexical context)
    - `enforceDemoPPostFlattenFormatting_` [FN-148] (7_Workflow_DemoP.gs:516–531)
      - calls `applyTemplateColumnWidths_` at 7_Workflow_DemoP.gs:522 (direct lexical context)
        - `applyTemplateColumnWidths_` [FN-096] (5_System_Templates.gs:14–18)
  - calls `refreshIndexAfterSheetWorkflow_` at 7_Workflow_DemoP.gs:24 (direct lexical context)
    - `refreshIndexAfterSheetWorkflow_` [FN-087] (4_System_Index.gs:262–268)
      - calls `updateIndexSheet` at 4_System_Index.gs:264 (direct lexical context)
        - `updateIndexSheet` [FN-084] (4_System_Index.gs:225–257)
          - calls `hasIndexSheetShell_` at 4_System_Index.gs:243 (conditional/loop context)
            - `hasIndexSheetShell_` [FN-079] (4_System_Index.gs:54–63)
          - calls `buildIndexSheetShell_` at 4_System_Index.gs:244 (direct lexical context)
            - `buildIndexSheetShell_` [FN-080] (4_System_Index.gs:65–103)
              - calls `loadDashboardConfig_` at 4_System_Index.gs:66 (direct lexical context)
                - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
              - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:67 (direct lexical context)
                - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466)
              - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:68 (direct lexical context)
                - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178)
                  - calls `getDocumentPropertiesCached_` at 1_Config.gs:177 (direct lexical context)
                    - `getDocumentPropertiesCached_` [FN-007] (1_Config.gs:170–174)
                      - calls `getRuntimeCache_` at 1_Config.gs:171 (direct lexical context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:247 (direct lexical context)
            - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466) — shared/cycle expansion stopped
          - calls `updateIndexLocalWorkspace_` at 4_System_Index.gs:250 (conditional/loop context)
            - `updateIndexLocalWorkspace_` [FN-081] (4_System_Index.gs:111–180)
              - calls `localSheetRow_` at 4_System_Index.gs:117 (direct lexical context)
                - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127)
              - calls `getTabOrganizationProfilesForSort_` at 4_System_Index.gs:130 (direct lexical context)
                - `getTabOrganizationProfilesForSort_` [FN-022] (2_Dashboard_Loaders.gs:268–271)
                  - calls `loadDashboardConfig_` at 2_Dashboard_Loaders.gs:269 (direct lexical context)
                    - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
              - calls `localSheetRow_` at 4_System_Index.gs:157 (direct lexical context)
                - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127) — shared/cycle expansion stopped
          - calls `updateIndexArchiveWorkspace_` at 4_System_Index.gs:251 (conditional/loop context)
            - `updateIndexArchiveWorkspace_` [FN-083] (4_System_Index.gs:185–220)
              - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:187 (direct lexical context)
                - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178) — shared/cycle expansion stopped
              - calls `buildIndexRestoreHyperlinkFormula_` at 4_System_Index.gs:201 (direct lexical context)
                - `buildIndexRestoreHyperlinkFormula_` [FN-091] (4_System_Index.gs:356–362)
                  - calls `getIndexRestoreWebAppUrl_` at 4_System_Index.gs:357 (direct lexical context)
                    - `getIndexRestoreWebAppUrl_` [FN-092] (4_System_Index.gs:364–376)
      - calls `logBestEffortWarning_` at 4_System_Index.gs:266 (direct lexical context)
        - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307) — shared/cycle expansion stopped
  - calls `markFrameworkStep_` at 7_Workflow_DemoP.gs:26 (direct lexical context)
    - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped

## MENU-027 — Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › ⛔ Create / Update Disenrolled List

- `createDisenrolledList` [FN-207] (_10_Workflow_Disenrolled.gs:11–23)
  - calls `createDisenrolledListForMonth_` at _10_Workflow_Disenrolled.gs:16 (direct lexical context)
    - `createDisenrolledListForMonth_` [FN-208] (_10_Workflow_Disenrolled.gs:25–61)
      - calls `markFrameworkStep_` at _10_Workflow_Disenrolled.gs:30 (conditional/loop context)
        - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277)
      - calls `getOrCreateDisenrolledExclusionSheet_` at _10_Workflow_Disenrolled.gs:39 (direct lexical context)
        - `getOrCreateDisenrolledExclusionSheet_` [FN-212] (_10_Workflow_Disenrolled.gs:224–259)
          - calls `loadDashboardConfig_` at _10_Workflow_Disenrolled.gs:226 (direct lexical context)
            - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43)
              - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:23 (direct lexical context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
              - calls `loadGlobalSettings_` at 2_Dashboard_Loaders.gs:31 (direct lexical context)
                - `loadGlobalSettings_` [FN-014] (2_Dashboard_Loaders.gs:97–126)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:98 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:110 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:111 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:112 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:113 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:114 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:117 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:118 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:119 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:120 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:121 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:122 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `loadTitleRows_` at 2_Dashboard_Loaders.gs:32 (direct lexical context)
                - `loadTitleRows_` [FN-015] (2_Dashboard_Loaders.gs:131–144)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:132 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:136 (direct lexical context)
                    - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90)
                      - calls `normalizeKey_` at 2_Dashboard_Loaders.gs:80 (direct lexical context)
                        - `normalizeKey_` [FN-045] (3_Core_Helpers.gs:31–33)
                          - calls `normalizeText_` at 3_Core_Helpers.gs:32 (direct lexical context)
                            - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:137 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `parseTitleRowConfigRow_` at 2_Dashboard_Loaders.gs:140 (direct lexical context)
                    - `parseTitleRowConfigRow_` [FN-016] (2_Dashboard_Loaders.gs:146–164)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:149 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `normalizeTitleTargetCell_` at 2_Dashboard_Loaders.gs:156 (direct lexical context)
                        - `normalizeTitleTargetCell_` [FN-017] (2_Dashboard_Loaders.gs:166–170)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:157 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:158 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `loadSheetDefinitions_` at 2_Dashboard_Loaders.gs:33 (direct lexical context)
                - `loadSheetDefinitions_` [FN-018] (2_Dashboard_Loaders.gs:175–195)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:176 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:178 (direct lexical context)
                    - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75)
                  - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:181 (direct lexical context)
                    - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                  - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:185 (direct lexical context)
                    - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399)
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:186 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:188 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:189 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:192 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `loadSheetBehaviors_` at 2_Dashboard_Loaders.gs:34 (direct lexical context)
                - `loadSheetBehaviors_` [FN-019] (2_Dashboard_Loaders.gs:200–218)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:201 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:205 (direct lexical context)
                    - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:208 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:209 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:210 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:211 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:212 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `loadSystemSurfaces_` at 2_Dashboard_Loaders.gs:35 (direct lexical context)
                - `loadSystemSurfaces_` [FN-020] (2_Dashboard_Loaders.gs:223–245)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:224 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:233 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:234 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:235 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:236 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:237 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:238 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:240 (direct lexical context)
                    - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
              - calls `loadTabOrganization_` at 2_Dashboard_Loaders.gs:36 (direct lexical context)
                - `loadTabOrganization_` [FN-021] (2_Dashboard_Loaders.gs:250–266)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:251 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:260 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `loadColumnDefinitions_` at 2_Dashboard_Loaders.gs:37 (direct lexical context)
                - `loadColumnDefinitions_` [FN-023] (2_Dashboard_Loaders.gs:276–297)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:277 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:281 (direct lexical context)
                    - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10)
                  - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:285 (direct lexical context)
                    - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:285 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:286 (direct lexical context)
                    - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:286 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:287 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:288 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `loadSheetHeaders_` at 2_Dashboard_Loaders.gs:38 (direct lexical context)
                - `loadSheetHeaders_` [FN-024] (2_Dashboard_Loaders.gs:302–323)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:303 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:307 (direct lexical context)
                    - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:308 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:309 (direct lexical context)
                    - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
          - calls `getSheetDefinitionByType_` at _10_Workflow_Disenrolled.gs:227 (direct lexical context)
            - `getSheetDefinitionByType_` [FN-026] (2_Dashboard_Loaders.gs:334–338)
              - calls `getSheetDefinitionByTypeOrNull_` at 2_Dashboard_Loaders.gs:335 (direct lexical context)
                - `getSheetDefinitionByTypeOrNull_` [FN-025] (2_Dashboard_Loaders.gs:327–332)
                  - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:328 (direct lexical context)
                    - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                  - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:330 (conditional/loop context)
                    - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
          - calls `getHeadersForSheetType_` at _10_Workflow_Disenrolled.gs:228 (direct lexical context)
            - `getHeadersForSheetType_` [FN-031] (2_Dashboard_Loaders.gs:379–383)
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:380 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
      - calls `syncDisenrolledExclusionFromRawData_` at _10_Workflow_Disenrolled.gs:42 (direct lexical context)
        - `syncDisenrolledExclusionFromRawData_` [FN-209] (_10_Workflow_Disenrolled.gs:65–158)
          - calls `markFrameworkStep_` at _10_Workflow_Disenrolled.gs:68 (conditional/loop context)
            - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
          - calls `loadDashboardConfig_` at _10_Workflow_Disenrolled.gs:71 (direct lexical context)
            - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
          - calls `getHeadersForSheetType_` at _10_Workflow_Disenrolled.gs:72 (direct lexical context)
            - `getHeadersForSheetType_` [FN-031] (2_Dashboard_Loaders.gs:379–383) — shared/cycle expansion stopped
          - calls `buildHeaderIndexMap_` at _10_Workflow_Disenrolled.gs:73 (direct lexical context)
            - `buildHeaderIndexMap_` [FN-063] (3_Core_Helpers.gs:193–200)
          - calls `getDataValues_` at _10_Workflow_Disenrolled.gs:75 (direct lexical context)
            - `getDataValues_` [FN-067] (3_Core_Helpers.gs:217–231)
              - calls `getSheetDimensions_` at 3_Core_Helpers.gs:221 (direct lexical context)
                - `getSheetDimensions_` [FN-068] (3_Core_Helpers.gs:233–244)
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:235 (conditional/loop context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:235 (conditional/loop context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:242 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `getHeaders_` at 3_Core_Helpers.gs:222 (direct lexical context)
                - `getHeaders_` [FN-061] (3_Core_Helpers.gs:173–182)
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:175 (conditional/loop context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:175 (conditional/loop context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:180 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `getHeaderMap_` at 3_Core_Helpers.gs:223 (direct lexical context)
                - `getHeaderMap_` [FN-062] (3_Core_Helpers.gs:184–191)
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:186 (conditional/loop context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:186 (conditional/loop context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `buildHeaderIndexMap_` at 3_Core_Helpers.gs:188 (direct lexical context)
                    - `buildHeaderIndexMap_` [FN-063] (3_Core_Helpers.gs:193–200) — shared/cycle expansion stopped
                  - calls `getHeaders_` at 3_Core_Helpers.gs:188 (direct lexical context)
                    - `getHeaders_` [FN-061] (3_Core_Helpers.gs:173–182) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:189 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `getPMRIndex_` at _10_Workflow_Disenrolled.gs:76 (direct lexical context)
            - `getPMRIndex_` [FN-065] (3_Core_Helpers.gs:209–211)
              - calls `findHeaderIndex_` at 3_Core_Helpers.gs:210 (direct lexical context)
                - `findHeaderIndex_` [FN-064] (3_Core_Helpers.gs:202–207)
          - calls `findHeaderIndex_` at _10_Workflow_Disenrolled.gs:80 (direct lexical context)
            - `findHeaderIndex_` [FN-064] (3_Core_Helpers.gs:202–207) — shared/cycle expansion stopped
          - calls `normalizePMR_` at _10_Workflow_Disenrolled.gs:91 (direct lexical context)
            - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14)
          - calls `normalizeCompareValue_` at _10_Workflow_Disenrolled.gs:97 (direct lexical context)
            - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56)
          - calls `getDataValues_` at _10_Workflow_Disenrolled.gs:108 (direct lexical context)
            - `getDataValues_` [FN-067] (3_Core_Helpers.gs:217–231) — shared/cycle expansion stopped
          - calls `getPMRIndex_` at _10_Workflow_Disenrolled.gs:109 (conditional/loop context)
            - `getPMRIndex_` [FN-065] (3_Core_Helpers.gs:209–211) — shared/cycle expansion stopped
          - calls `normalizePMR_` at _10_Workflow_Disenrolled.gs:114 (direct lexical context)
            - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14) — shared/cycle expansion stopped
          - calls `normalizePMR_` at _10_Workflow_Disenrolled.gs:121 (direct lexical context)
            - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14) — shared/cycle expansion stopped
          - calls `normalizeCompareValue_` at _10_Workflow_Disenrolled.gs:131 (conditional/loop context)
            - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
          - calls `removeActiveDemoPPMRsFromDisenrolledExclusion_` at _10_Workflow_Disenrolled.gs:152 (direct lexical context)
            - `removeActiveDemoPPMRsFromDisenrolledExclusion_` [FN-149] (7_Workflow_DemoP.gs:533–600)
              - calls `getHeaders_` at 7_Workflow_DemoP.gs:543 (direct lexical context)
                - `getHeaders_` [FN-061] (3_Core_Helpers.gs:173–182) — shared/cycle expansion stopped
              - calls `buildHeaderIndexMap_` at 7_Workflow_DemoP.gs:544 (direct lexical context)
                - `buildHeaderIndexMap_` [FN-063] (3_Core_Helpers.gs:193–200) — shared/cycle expansion stopped
              - calls `getPMRIndex_` at 7_Workflow_DemoP.gs:545 (direct lexical context)
                - `getPMRIndex_` [FN-065] (3_Core_Helpers.gs:209–211) — shared/cycle expansion stopped
              - calls `findHeaderIndex_` at 7_Workflow_DemoP.gs:547 (direct lexical context)
                - `findHeaderIndex_` [FN-064] (3_Core_Helpers.gs:202–207) — shared/cycle expansion stopped
              - calls `getDataValues_` at 7_Workflow_DemoP.gs:550 (direct lexical context)
                - `getDataValues_` [FN-067] (3_Core_Helpers.gs:217–231) — shared/cycle expansion stopped
              - calls `getPMRIndex_` at 7_Workflow_DemoP.gs:551 (conditional/loop context)
                - `getPMRIndex_` [FN-065] (3_Core_Helpers.gs:209–211) — shared/cycle expansion stopped
              - calls `normalizePMR_` at 7_Workflow_DemoP.gs:556 (direct lexical context)
                - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14) — shared/cycle expansion stopped
              - calls `normalizePMR_` at 7_Workflow_DemoP.gs:565 (direct lexical context)
                - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14) — shared/cycle expansion stopped
              - calls `normalizeCompareValue_` at 7_Workflow_DemoP.gs:569 (conditional/loop context)
                - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
              - calls `normalizePMR_` at 7_Workflow_DemoP.gs:581 (direct lexical context)
                - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14) — shared/cycle expansion stopped
              - calls `normalizeRowsToWidth_` at 7_Workflow_DemoP.gs:593 (direct lexical context)
                - `normalizeRowsToWidth_` [FN-053] (3_Core_Helpers.gs:89–91)
                  - calls `padRowToWidth_` at 3_Core_Helpers.gs:90 (conditional/loop context)
                    - `padRowToWidth_` [FN-052] (3_Core_Helpers.gs:83–87)
              - calls `clearSheetRuntimeCachesForSheet_` at 7_Workflow_DemoP.gs:596 (direct lexical context)
                - `clearSheetRuntimeCachesForSheet_` [FN-069] (3_Core_Helpers.gs:246–252)
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:249 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:249 (conditional/loop context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:250 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:250 (conditional/loop context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:251 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `logBestEffortWarning_` at 7_Workflow_DemoP.gs:597 (direct lexical context)
                - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307)
          - calls `clearSheetRuntimeCachesForSheet_` at _10_Workflow_Disenrolled.gs:156 (direct lexical context)
            - `clearSheetRuntimeCachesForSheet_` [FN-069] (3_Core_Helpers.gs:246–252) — shared/cycle expansion stopped
      - calls `hideOldDisenrolledRows_` at _10_Workflow_Disenrolled.gs:45 (direct lexical context)
        - `hideOldDisenrolledRows_` [FN-210] (_10_Workflow_Disenrolled.gs:165–195)
          - calls `getDataValues_` at _10_Workflow_Disenrolled.gs:167 (direct lexical context)
            - `getDataValues_` [FN-067] (3_Core_Helpers.gs:217–231) — shared/cycle expansion stopped
          - calls `createLocalDateOnly_` at _10_Workflow_Disenrolled.gs:176 (direct lexical context)
            - `createLocalDateOnly_` [FN-056] (3_Core_Helpers.gs:140–142)
          - calls `normalizeToDateObject_` at _10_Workflow_Disenrolled.gs:182 (direct lexical context)
            - `normalizeToDateObject_` [FN-054] (3_Core_Helpers.gs:95–133)
              - calls `isReasonableReportDate_` at 3_Core_Helpers.gs:98 (conditional/loop context)
                - `isReasonableReportDate_` [FN-055] (3_Core_Helpers.gs:135–138)
              - calls `isReasonableReportDate_` at 3_Core_Helpers.gs:105 (direct lexical context)
                - `isReasonableReportDate_` [FN-055] (3_Core_Helpers.gs:135–138) — shared/cycle expansion stopped
              - calls `isReasonableReportDate_` at 3_Core_Helpers.gs:119 (conditional/loop context)
                - `isReasonableReportDate_` [FN-055] (3_Core_Helpers.gs:135–138) — shared/cycle expansion stopped
              - calls `isReasonableReportDate_` at 3_Core_Helpers.gs:126 (conditional/loop context)
                - `isReasonableReportDate_` [FN-055] (3_Core_Helpers.gs:135–138) — shared/cycle expansion stopped
              - calls `isReasonableReportDate_` at 3_Core_Helpers.gs:132 (conditional/loop context)
                - `isReasonableReportDate_` [FN-055] (3_Core_Helpers.gs:135–138) — shared/cycle expansion stopped
          - calls `hideRowNumberBatches_` at _10_Workflow_Disenrolled.gs:192 (direct lexical context)
            - `hideRowNumberBatches_` [FN-211] (_10_Workflow_Disenrolled.gs:197–220)
      - calls `refreshIndexAfterSheetWorkflow_` at _10_Workflow_Disenrolled.gs:53 (direct lexical context)
        - `refreshIndexAfterSheetWorkflow_` [FN-087] (4_System_Index.gs:262–268)
          - calls `updateIndexSheet` at 4_System_Index.gs:264 (direct lexical context)
            - `updateIndexSheet` [FN-084] (4_System_Index.gs:225–257)
              - calls `hasIndexSheetShell_` at 4_System_Index.gs:243 (conditional/loop context)
                - `hasIndexSheetShell_` [FN-079] (4_System_Index.gs:54–63)
              - calls `buildIndexSheetShell_` at 4_System_Index.gs:244 (direct lexical context)
                - `buildIndexSheetShell_` [FN-080] (4_System_Index.gs:65–103)
                  - calls `loadDashboardConfig_` at 4_System_Index.gs:66 (direct lexical context)
                    - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
                  - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:67 (direct lexical context)
                    - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466)
                  - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:68 (direct lexical context)
                    - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178)
                      - calls `getDocumentPropertiesCached_` at 1_Config.gs:177 (direct lexical context)
                        - `getDocumentPropertiesCached_` [FN-007] (1_Config.gs:170–174)
                          - calls `getRuntimeCache_` at 1_Config.gs:171 (direct lexical context)
                            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:247 (direct lexical context)
                - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466) — shared/cycle expansion stopped
              - calls `updateIndexLocalWorkspace_` at 4_System_Index.gs:250 (conditional/loop context)
                - `updateIndexLocalWorkspace_` [FN-081] (4_System_Index.gs:111–180)
                  - calls `localSheetRow_` at 4_System_Index.gs:117 (direct lexical context)
                    - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127)
                  - calls `getTabOrganizationProfilesForSort_` at 4_System_Index.gs:130 (direct lexical context)
                    - `getTabOrganizationProfilesForSort_` [FN-022] (2_Dashboard_Loaders.gs:268–271)
                      - calls `loadDashboardConfig_` at 2_Dashboard_Loaders.gs:269 (direct lexical context)
                        - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
                  - calls `localSheetRow_` at 4_System_Index.gs:157 (direct lexical context)
                    - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127) — shared/cycle expansion stopped
              - calls `updateIndexArchiveWorkspace_` at 4_System_Index.gs:251 (conditional/loop context)
                - `updateIndexArchiveWorkspace_` [FN-083] (4_System_Index.gs:185–220)
                  - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:187 (direct lexical context)
                    - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178) — shared/cycle expansion stopped
                  - calls `buildIndexRestoreHyperlinkFormula_` at 4_System_Index.gs:201 (direct lexical context)
                    - `buildIndexRestoreHyperlinkFormula_` [FN-091] (4_System_Index.gs:356–362)
                      - calls `getIndexRestoreWebAppUrl_` at 4_System_Index.gs:357 (direct lexical context)
                        - `getIndexRestoreWebAppUrl_` [FN-092] (4_System_Index.gs:364–376)
          - calls `logBestEffortWarning_` at 4_System_Index.gs:266 (direct lexical context)
            - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307) — shared/cycle expansion stopped

## MENU-028 — Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 🗓️ Monthly Change Report

- `buildMonthlyChangeReport` [FN-181] (9_Workflow_MonthlyChange.gs:66–72)
  - calls `buildMonthlyChangeReportForMonth_` at 9_Workflow_MonthlyChange.gs:70 (direct lexical context)
    - `buildMonthlyChangeReportForMonth_` [FN-180] (9_Workflow_MonthlyChange.gs:11–64)
      - calls `getPreviousRawDataSheet_` at 9_Workflow_MonthlyChange.gs:15 (direct lexical context)
        - `getPreviousRawDataSheet_` [FN-206] (9_Workflow_MonthlyChange.gs:530–534)
      - calls `markRuntimeStep_` at 9_Workflow_MonthlyChange.gs:22 (direct lexical context)
        - `markRuntimeStep_` [FN-072] (3_Core_Helpers.gs:279–281)
          - calls `markFrameworkStep_` at 3_Core_Helpers.gs:280 (direct lexical context)
            - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277)
      - calls `compareRawDataForMonthlyChange_` at 9_Workflow_MonthlyChange.gs:23 (direct lexical context)
        - `compareRawDataForMonthlyChange_` [FN-182] (9_Workflow_MonthlyChange.gs:76–169)
          - calls `getRawDemoPDataForCompare_` at 9_Workflow_MonthlyChange.gs:77 (direct lexical context)
            - `getRawDemoPDataForCompare_` [FN-183] (9_Workflow_MonthlyChange.gs:171–203)
              - calls `getDataValues_` at 9_Workflow_MonthlyChange.gs:172 (direct lexical context)
                - `getDataValues_` [FN-067] (3_Core_Helpers.gs:217–231)
                  - calls `getSheetDimensions_` at 3_Core_Helpers.gs:221 (direct lexical context)
                    - `getSheetDimensions_` [FN-068] (3_Core_Helpers.gs:233–244)
                      - calls `getRuntimeCache_` at 3_Core_Helpers.gs:235 (conditional/loop context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
                      - calls `getRuntimeCache_` at 3_Core_Helpers.gs:235 (conditional/loop context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                      - calls `getRuntimeCache_` at 3_Core_Helpers.gs:242 (direct lexical context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getHeaders_` at 3_Core_Helpers.gs:222 (direct lexical context)
                    - `getHeaders_` [FN-061] (3_Core_Helpers.gs:173–182)
                      - calls `getRuntimeCache_` at 3_Core_Helpers.gs:175 (conditional/loop context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                      - calls `getRuntimeCache_` at 3_Core_Helpers.gs:175 (conditional/loop context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                      - calls `getRuntimeCache_` at 3_Core_Helpers.gs:180 (direct lexical context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getHeaderMap_` at 3_Core_Helpers.gs:223 (direct lexical context)
                    - `getHeaderMap_` [FN-062] (3_Core_Helpers.gs:184–191)
                      - calls `getRuntimeCache_` at 3_Core_Helpers.gs:186 (conditional/loop context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                      - calls `getRuntimeCache_` at 3_Core_Helpers.gs:186 (conditional/loop context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                      - calls `buildHeaderIndexMap_` at 3_Core_Helpers.gs:188 (direct lexical context)
                        - `buildHeaderIndexMap_` [FN-063] (3_Core_Helpers.gs:193–200)
                      - calls `getHeaders_` at 3_Core_Helpers.gs:188 (direct lexical context)
                        - `getHeaders_` [FN-061] (3_Core_Helpers.gs:173–182) — shared/cycle expansion stopped
                      - calls `getRuntimeCache_` at 3_Core_Helpers.gs:189 (direct lexical context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `getPMRIndex_` at 9_Workflow_MonthlyChange.gs:175 (direct lexical context)
                - `getPMRIndex_` [FN-065] (3_Core_Helpers.gs:209–211)
                  - calls `findHeaderIndex_` at 3_Core_Helpers.gs:210 (direct lexical context)
                    - `findHeaderIndex_` [FN-064] (3_Core_Helpers.gs:202–207)
              - calls `getDOBIndex_` at 9_Workflow_MonthlyChange.gs:176 (direct lexical context)
                - `getDOBIndex_` [FN-066] (3_Core_Helpers.gs:213–215)
                  - calls `findHeaderIndex_` at 3_Core_Helpers.gs:214 (direct lexical context)
                    - `findHeaderIndex_` [FN-064] (3_Core_Helpers.gs:202–207) — shared/cycle expansion stopped
              - calls `normalizePMR_` at 9_Workflow_MonthlyChange.gs:185 (direct lexical context)
                - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14)
              - calls `normalizeCompareValue_` at 9_Workflow_MonthlyChange.gs:193 (conditional/loop context)
                - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56)
          - calls `getRawDemoPDataForCompare_` at 9_Workflow_MonthlyChange.gs:78 (direct lexical context)
            - `getRawDemoPDataForCompare_` [FN-183] (9_Workflow_MonthlyChange.gs:171–203) — shared/cycle expansion stopped
          - calls `getDataValues_` at 9_Workflow_MonthlyChange.gs:111 (direct lexical context)
            - `getDataValues_` [FN-067] (3_Core_Helpers.gs:217–231) — shared/cycle expansion stopped
          - calls `getPMRIndex_` at 9_Workflow_MonthlyChange.gs:112 (direct lexical context)
            - `getPMRIndex_` [FN-065] (3_Core_Helpers.gs:209–211) — shared/cycle expansion stopped
          - calls `normalizePMR_` at 9_Workflow_MonthlyChange.gs:115 (direct lexical context)
            - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14) — shared/cycle expansion stopped
          - calls `isSameDate_` at 9_Workflow_MonthlyChange.gs:126 (direct lexical context)
            - `isSameDate_` [FN-057] (3_Core_Helpers.gs:144–148)
              - calls `normalizeToDateObject_` at 3_Core_Helpers.gs:145 (direct lexical context)
                - `normalizeToDateObject_` [FN-054] (3_Core_Helpers.gs:95–133)
                  - calls `isReasonableReportDate_` at 3_Core_Helpers.gs:98 (conditional/loop context)
                    - `isReasonableReportDate_` [FN-055] (3_Core_Helpers.gs:135–138)
                  - calls `isReasonableReportDate_` at 3_Core_Helpers.gs:105 (direct lexical context)
                    - `isReasonableReportDate_` [FN-055] (3_Core_Helpers.gs:135–138) — shared/cycle expansion stopped
                  - calls `isReasonableReportDate_` at 3_Core_Helpers.gs:119 (conditional/loop context)
                    - `isReasonableReportDate_` [FN-055] (3_Core_Helpers.gs:135–138) — shared/cycle expansion stopped
                  - calls `isReasonableReportDate_` at 3_Core_Helpers.gs:126 (conditional/loop context)
                    - `isReasonableReportDate_` [FN-055] (3_Core_Helpers.gs:135–138) — shared/cycle expansion stopped
                  - calls `isReasonableReportDate_` at 3_Core_Helpers.gs:132 (conditional/loop context)
                    - `isReasonableReportDate_` [FN-055] (3_Core_Helpers.gs:135–138) — shared/cycle expansion stopped
              - calls `normalizeToDateObject_` at 3_Core_Helpers.gs:146 (direct lexical context)
                - `normalizeToDateObject_` [FN-054] (3_Core_Helpers.gs:95–133) — shared/cycle expansion stopped
          - calls `getFieldValueFromRow_` at 9_Workflow_MonthlyChange.gs:128 (direct lexical context)
            - `getFieldValueFromRow_` [FN-191] (9_Workflow_MonthlyChange.gs:285–288)
          - calls `isMonthlyChangeDisenrollmentEffectiveDate_` at 9_Workflow_MonthlyChange.gs:129 (direct lexical context)
            - `isMonthlyChangeDisenrollmentEffectiveDate_` [FN-188] (9_Workflow_MonthlyChange.gs:242–244)
              - calls `isSameDate_` at 9_Workflow_MonthlyChange.gs:243 (conditional/loop context)
                - `isSameDate_` [FN-057] (3_Core_Helpers.gs:144–148) — shared/cycle expansion stopped
          - calls `buildPrimitiveRowsHash_` at 9_Workflow_MonthlyChange.gs:137 (direct lexical context)
            - `buildPrimitiveRowsHash_` [FN-185] (9_Workflow_MonthlyChange.gs:213–217)
              - calls `normalizeCompareValue_` at 9_Workflow_MonthlyChange.gs:216 (direct lexical context)
                - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
          - calls `buildPrimitiveRowsHash_` at 9_Workflow_MonthlyChange.gs:138 (direct lexical context)
            - `buildPrimitiveRowsHash_` [FN-185] (9_Workflow_MonthlyChange.gs:213–217) — shared/cycle expansion stopped
          - calls `rowsWithDOBOnlyForSection_` at 9_Workflow_MonthlyChange.gs:141 (direct lexical context)
            - `rowsWithDOBOnlyForSection_` [FN-184] (9_Workflow_MonthlyChange.gs:207–211)
              - calls `getDOBIndex_` at 9_Workflow_MonthlyChange.gs:208 (direct lexical context)
                - `getDOBIndex_` [FN-066] (3_Core_Helpers.gs:213–215) — shared/cycle expansion stopped
              - calls `normalizeCompareValue_` at 9_Workflow_MonthlyChange.gs:210 (conditional/loop context)
                - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
          - calls `rowsWithDOBOnlyForSection_` at 9_Workflow_MonthlyChange.gs:142 (direct lexical context)
            - `rowsWithDOBOnlyForSection_` [FN-184] (9_Workflow_MonthlyChange.gs:207–211) — shared/cycle expansion stopped
          - calls `getChangedColumnsForSectionRows_` at 9_Workflow_MonthlyChange.gs:144 (direct lexical context)
            - `getChangedColumnsForSectionRows_` [FN-186] (9_Workflow_MonthlyChange.gs:219–230)
              - calls `buildColumnSignaturesForSection_` at 9_Workflow_MonthlyChange.gs:222 (direct lexical context)
                - `buildColumnSignaturesForSection_` [FN-187] (9_Workflow_MonthlyChange.gs:232–240)
                  - calls `normalizeCompareValue_` at 9_Workflow_MonthlyChange.gs:237 (conditional/loop context)
                    - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
              - calls `buildColumnSignaturesForSection_` at 9_Workflow_MonthlyChange.gs:223 (direct lexical context)
                - `buildColumnSignaturesForSection_` [FN-187] (9_Workflow_MonthlyChange.gs:232–240) — shared/cycle expansion stopped
          - calls `getChangedColumnsForSectionRows_` at 9_Workflow_MonthlyChange.gs:147 (direct lexical context)
            - `getChangedColumnsForSectionRows_` [FN-186] (9_Workflow_MonthlyChange.gs:219–230) — shared/cycle expansion stopped
          - calls `getChangedColumnsForSectionRows_` at 9_Workflow_MonthlyChange.gs:150 (direct lexical context)
            - `getChangedColumnsForSectionRows_` [FN-186] (9_Workflow_MonthlyChange.gs:219–230) — shared/cycle expansion stopped
          - calls `getChangedColumnsForSectionRows_` at 9_Workflow_MonthlyChange.gs:153 (direct lexical context)
            - `getChangedColumnsForSectionRows_` [FN-186] (9_Workflow_MonthlyChange.gs:219–230) — shared/cycle expansion stopped
          - calls `getChangedColumnsForSectionRows_` at 9_Workflow_MonthlyChange.gs:156 (direct lexical context)
            - `getChangedColumnsForSectionRows_` [FN-186] (9_Workflow_MonthlyChange.gs:219–230) — shared/cycle expansion stopped
      - calls `loadDashboardConfig_` at 9_Workflow_MonthlyChange.gs:38 (direct lexical context)
        - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43)
          - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:23 (direct lexical context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `loadGlobalSettings_` at 2_Dashboard_Loaders.gs:31 (direct lexical context)
            - `loadGlobalSettings_` [FN-014] (2_Dashboard_Loaders.gs:97–126)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:98 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:110 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:111 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:112 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:113 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:114 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:117 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:118 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:119 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:120 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:121 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:122 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadTitleRows_` at 2_Dashboard_Loaders.gs:32 (direct lexical context)
            - `loadTitleRows_` [FN-015] (2_Dashboard_Loaders.gs:131–144)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:132 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:136 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90)
                  - calls `normalizeKey_` at 2_Dashboard_Loaders.gs:80 (direct lexical context)
                    - `normalizeKey_` [FN-045] (3_Core_Helpers.gs:31–33)
                      - calls `normalizeText_` at 3_Core_Helpers.gs:32 (direct lexical context)
                        - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:137 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseTitleRowConfigRow_` at 2_Dashboard_Loaders.gs:140 (direct lexical context)
                - `parseTitleRowConfigRow_` [FN-016] (2_Dashboard_Loaders.gs:146–164)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:149 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `normalizeTitleTargetCell_` at 2_Dashboard_Loaders.gs:156 (direct lexical context)
                    - `normalizeTitleTargetCell_` [FN-017] (2_Dashboard_Loaders.gs:166–170)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:157 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:158 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadSheetDefinitions_` at 2_Dashboard_Loaders.gs:33 (direct lexical context)
            - `loadSheetDefinitions_` [FN-018] (2_Dashboard_Loaders.gs:175–195)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:176 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:178 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75)
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:181 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:185 (direct lexical context)
                - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399)
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:186 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:188 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:189 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:192 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadSheetBehaviors_` at 2_Dashboard_Loaders.gs:34 (direct lexical context)
            - `loadSheetBehaviors_` [FN-019] (2_Dashboard_Loaders.gs:200–218)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:201 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:205 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:208 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:209 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:210 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:211 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:212 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `loadSystemSurfaces_` at 2_Dashboard_Loaders.gs:35 (direct lexical context)
            - `loadSystemSurfaces_` [FN-020] (2_Dashboard_Loaders.gs:223–245)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:224 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:233 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:234 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:235 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:236 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:237 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:238 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:240 (direct lexical context)
                - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
          - calls `loadTabOrganization_` at 2_Dashboard_Loaders.gs:36 (direct lexical context)
            - `loadTabOrganization_` [FN-021] (2_Dashboard_Loaders.gs:250–266)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:251 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:260 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadColumnDefinitions_` at 2_Dashboard_Loaders.gs:37 (direct lexical context)
            - `loadColumnDefinitions_` [FN-023] (2_Dashboard_Loaders.gs:276–297)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:277 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:281 (direct lexical context)
                - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10)
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:285 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:285 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:286 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:286 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:287 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:288 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `loadSheetHeaders_` at 2_Dashboard_Loaders.gs:38 (direct lexical context)
            - `loadSheetHeaders_` [FN-024] (2_Dashboard_Loaders.gs:302–323)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:303 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:307 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:308 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:309 (direct lexical context)
                - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
      - calls `getSheetDefinitionByType_` at 9_Workflow_MonthlyChange.gs:39 (direct lexical context)
        - `getSheetDefinitionByType_` [FN-026] (2_Dashboard_Loaders.gs:334–338)
          - calls `getSheetDefinitionByTypeOrNull_` at 2_Dashboard_Loaders.gs:335 (direct lexical context)
            - `getSheetDefinitionByTypeOrNull_` [FN-025] (2_Dashboard_Loaders.gs:327–332)
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:328 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:330 (conditional/loop context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
      - calls `buildMonthlyChangeReportSectionLayout_` at 9_Workflow_MonthlyChange.gs:48 (direct lexical context)
        - `buildMonthlyChangeReportSectionLayout_` [FN-204] (9_Workflow_MonthlyChange.gs:499–518)
          - calls `getMonthlyChangeReportHeaders_` at 9_Workflow_MonthlyChange.gs:500 (direct lexical context)
            - `getMonthlyChangeReportHeaders_` [FN-202] (9_Workflow_MonthlyChange.gs:485–489)
          - calls `padRowToWidth_` at 9_Workflow_MonthlyChange.gs:513 (direct lexical context)
            - `padRowToWidth_` [FN-052] (3_Core_Helpers.gs:83–87)
      - calls `populateMonthlyChangeReportSections_` at 9_Workflow_MonthlyChange.gs:49 (direct lexical context)
        - `populateMonthlyChangeReportSections_` [FN-199] (9_Workflow_MonthlyChange.gs:408–439)
          - calls `loadDashboardConfig_` at 9_Workflow_MonthlyChange.gs:410 (direct lexical context)
            - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
          - calls `getSheetDefinitionByType_` at 9_Workflow_MonthlyChange.gs:412 (direct lexical context)
            - `getSheetDefinitionByType_` [FN-026] (2_Dashboard_Loaders.gs:334–338) — shared/cycle expansion stopped
          - calls `getMonthlyChangeReportHeaders_` at 9_Workflow_MonthlyChange.gs:414 (direct lexical context)
            - `getMonthlyChangeReportHeaders_` [FN-202] (9_Workflow_MonthlyChange.gs:485–489) — shared/cycle expansion stopped
          - calls `getThemeColorsFromBase_` at 9_Workflow_MonthlyChange.gs:416 (direct lexical context)
            - `getThemeColorsFromBase_` [FN-034] (2_Dashboard_Loaders.gs:401–426)
              - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:403 (direct lexical context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:404 (direct lexical context)
                - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
              - calls `hexToHsl_` at 2_Dashboard_Loaders.gs:408 (direct lexical context)
                - `hexToHsl_` [FN-038] (2_Dashboard_Loaders.gs:511–533)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:409 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:410 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:411 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:412 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:413 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `hslToHex_` at 2_Dashboard_Loaders.gs:417 (direct lexical context)
                - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544)
              - calls `hslToHex_` at 2_Dashboard_Loaders.gs:418 (direct lexical context)
                - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
              - calls `hslToHex_` at 2_Dashboard_Loaders.gs:419 (direct lexical context)
                - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
              - calls `hslToHex_` at 2_Dashboard_Loaders.gs:420 (direct lexical context)
                - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
              - calls `hslToHex_` at 2_Dashboard_Loaders.gs:421 (direct lexical context)
                - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
          - calls `getMonthlyChangeSectionSpecs_` at 9_Workflow_MonthlyChange.gs:420 (direct lexical context)
            - `getMonthlyChangeSectionSpecs_` [FN-195] (9_Workflow_MonthlyChange.gs:313–323)
          - calls `buildMonthlyChangeSectionRows_` at 9_Workflow_MonthlyChange.gs:421 (direct lexical context)
            - `buildMonthlyChangeSectionRows_` [FN-196] (9_Workflow_MonthlyChange.gs:325–366)
              - calls `getMonthlyChangeReportHeaders_` at 9_Workflow_MonthlyChange.gs:328 (direct lexical context)
                - `getMonthlyChangeReportHeaders_` [FN-202] (9_Workflow_MonthlyChange.gs:485–489) — shared/cycle expansion stopped
              - calls `getDOBIndex_` at 9_Workflow_MonthlyChange.gs:329 (direct lexical context)
                - `getDOBIndex_` [FN-066] (3_Core_Helpers.gs:213–215) — shared/cycle expansion stopped
              - calls `findHeaderIndex_` at 9_Workflow_MonthlyChange.gs:330 (direct lexical context)
                - `findHeaderIndex_` [FN-064] (3_Core_Helpers.gs:202–207) — shared/cycle expansion stopped
              - calls `findHeaderIndex_` at 9_Workflow_MonthlyChange.gs:331 (direct lexical context)
                - `findHeaderIndex_` [FN-064] (3_Core_Helpers.gs:202–207) — shared/cycle expansion stopped
              - calls `buildHeaderIndexMap_` at 9_Workflow_MonthlyChange.gs:331 (direct lexical context)
                - `buildHeaderIndexMap_` [FN-063] (3_Core_Helpers.gs:193–200) — shared/cycle expansion stopped
              - calls `normalizeCompareValue_` at 9_Workflow_MonthlyChange.gs:340 (conditional/loop context)
                - `normalizeCompareValue_` [FN-046] (3_Core_Helpers.gs:35–56) — shared/cycle expansion stopped
              - calls `isMonthlyChangeDisenrollmentEffectiveDate_` at 9_Workflow_MonthlyChange.gs:344 (conditional/loop context)
                - `isMonthlyChangeDisenrollmentEffectiveDate_` [FN-188] (9_Workflow_MonthlyChange.gs:242–244) — shared/cycle expansion stopped
              - calls `buildMonthlyChangeReportRow_` at 9_Workflow_MonthlyChange.gs:351 (direct lexical context)
                - `buildMonthlyChangeReportRow_` [FN-200] (9_Workflow_MonthlyChange.gs:441–470)
                  - calls `displayValueForReport_` at 9_Workflow_MonthlyChange.gs:457 (direct lexical context)
                    - `displayValueForReport_` [FN-193] (9_Workflow_MonthlyChange.gs:301–304)
                      - calls `formatDateDisplay_` at 9_Workflow_MonthlyChange.gs:302 (conditional/loop context)
                        - `formatDateDisplay_` [FN-194] (9_Workflow_MonthlyChange.gs:306–309)
                          - calls `normalizeToDateObject_` at 9_Workflow_MonthlyChange.gs:307 (direct lexical context)
                            - `normalizeToDateObject_` [FN-054] (3_Core_Helpers.gs:95–133) — shared/cycle expansion stopped
                  - calls `convertMonthlyChangeReportDateValues_` at 9_Workflow_MonthlyChange.gs:469 (direct lexical context)
                    - `convertMonthlyChangeReportDateValues_` [FN-201] (9_Workflow_MonthlyChange.gs:472–483)
                      - calls `getMonthlyChangeReportDateIndexes_` at 9_Workflow_MonthlyChange.gs:474 (conditional/loop context)
                        - `getMonthlyChangeReportDateIndexes_` [FN-203] (9_Workflow_MonthlyChange.gs:491–497)
                          - calls `isDateLikeHeader_` at 9_Workflow_MonthlyChange.gs:494 (conditional/loop context)
                            - `isDateLikeHeader_` [FN-058] (3_Core_Helpers.gs:150–155)
                              - calls `normalizeHeader_` at 3_Core_Helpers.gs:151 (direct lexical context)
                                - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
                      - calls `normalizeToDateObject_` at 9_Workflow_MonthlyChange.gs:479 (direct lexical context)
                        - `normalizeToDateObject_` [FN-054] (3_Core_Helpers.gs:95–133) — shared/cycle expansion stopped
          - calls `appendMonthlyChangeSectionBlock_` at 9_Workflow_MonthlyChange.gs:423 (direct lexical context)
            - `appendMonthlyChangeSectionBlock_` [FN-198] (9_Workflow_MonthlyChange.gs:375–406)
              - calls `appendMonthlyChangeCompiledRow_` at 9_Workflow_MonthlyChange.gs:380 (direct lexical context)
                - `appendMonthlyChangeCompiledRow_` [FN-197] (9_Workflow_MonthlyChange.gs:368–373)
                  - calls `padRowToWidth_` at 9_Workflow_MonthlyChange.gs:369 (direct lexical context)
                    - `padRowToWidth_` [FN-052] (3_Core_Helpers.gs:83–87) — shared/cycle expansion stopped
              - calls `appendMonthlyChangeCompiledRow_` at 9_Workflow_MonthlyChange.gs:385 (direct lexical context)
                - `appendMonthlyChangeCompiledRow_` [FN-197] (9_Workflow_MonthlyChange.gs:368–373) — shared/cycle expansion stopped
              - calls `appendMonthlyChangeCompiledRow_` at 9_Workflow_MonthlyChange.gs:386 (direct lexical context)
                - `appendMonthlyChangeCompiledRow_` [FN-197] (9_Workflow_MonthlyChange.gs:368–373) — shared/cycle expansion stopped
              - calls `appendMonthlyChangeCompiledRow_` at 9_Workflow_MonthlyChange.gs:387 (direct lexical context)
                - `appendMonthlyChangeCompiledRow_` [FN-197] (9_Workflow_MonthlyChange.gs:368–373) — shared/cycle expansion stopped
              - calls `appendMonthlyChangeCompiledRow_` at 9_Workflow_MonthlyChange.gs:388 (direct lexical context)
                - `appendMonthlyChangeCompiledRow_` [FN-197] (9_Workflow_MonthlyChange.gs:368–373) — shared/cycle expansion stopped
              - calls `padRowToWidth_` at 9_Workflow_MonthlyChange.gs:392 (direct lexical context)
                - `padRowToWidth_` [FN-052] (3_Core_Helpers.gs:83–87) — shared/cycle expansion stopped
              - calls `appendMonthlyChangeCompiledRow_` at 9_Workflow_MonthlyChange.gs:405 (direct lexical context)
                - `appendMonthlyChangeCompiledRow_` [FN-197] (9_Workflow_MonthlyChange.gs:368–373) — shared/cycle expansion stopped
      - calls `formatMonthlyChangeReportSectionSheet_` at 9_Workflow_MonthlyChange.gs:50 (direct lexical context)
        - `formatMonthlyChangeReportSectionSheet_` [FN-205] (9_Workflow_MonthlyChange.gs:520–528)
          - calls `loadDashboardConfig_` at 9_Workflow_MonthlyChange.gs:522 (direct lexical context)
            - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
          - calls `getMonthlyChangeReportHeaders_` at 9_Workflow_MonthlyChange.gs:523 (direct lexical context)
            - `getMonthlyChangeReportHeaders_` [FN-202] (9_Workflow_MonthlyChange.gs:485–489) — shared/cycle expansion stopped
      - calls `markRuntimeStep_` at 9_Workflow_MonthlyChange.gs:54 (direct lexical context)
        - `markRuntimeStep_` [FN-072] (3_Core_Helpers.gs:279–281) — shared/cycle expansion stopped
      - calls `updateIndexSheet` at 9_Workflow_MonthlyChange.gs:56 (direct lexical context)
        - `updateIndexSheet` [FN-084] (4_System_Index.gs:225–257)
          - calls `hasIndexSheetShell_` at 4_System_Index.gs:243 (conditional/loop context)
            - `hasIndexSheetShell_` [FN-079] (4_System_Index.gs:54–63)
          - calls `buildIndexSheetShell_` at 4_System_Index.gs:244 (direct lexical context)
            - `buildIndexSheetShell_` [FN-080] (4_System_Index.gs:65–103)
              - calls `loadDashboardConfig_` at 4_System_Index.gs:66 (direct lexical context)
                - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
              - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:67 (direct lexical context)
                - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466)
              - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:68 (direct lexical context)
                - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178)
                  - calls `getDocumentPropertiesCached_` at 1_Config.gs:177 (direct lexical context)
                    - `getDocumentPropertiesCached_` [FN-007] (1_Config.gs:170–174)
                      - calls `getRuntimeCache_` at 1_Config.gs:171 (direct lexical context)
                        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:247 (direct lexical context)
            - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466) — shared/cycle expansion stopped
          - calls `updateIndexLocalWorkspace_` at 4_System_Index.gs:250 (conditional/loop context)
            - `updateIndexLocalWorkspace_` [FN-081] (4_System_Index.gs:111–180)
              - calls `localSheetRow_` at 4_System_Index.gs:117 (direct lexical context)
                - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127)
              - calls `getTabOrganizationProfilesForSort_` at 4_System_Index.gs:130 (direct lexical context)
                - `getTabOrganizationProfilesForSort_` [FN-022] (2_Dashboard_Loaders.gs:268–271)
                  - calls `loadDashboardConfig_` at 2_Dashboard_Loaders.gs:269 (direct lexical context)
                    - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
              - calls `localSheetRow_` at 4_System_Index.gs:157 (direct lexical context)
                - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127) — shared/cycle expansion stopped
          - calls `updateIndexArchiveWorkspace_` at 4_System_Index.gs:251 (conditional/loop context)
            - `updateIndexArchiveWorkspace_` [FN-083] (4_System_Index.gs:185–220)
              - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:187 (direct lexical context)
                - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178) — shared/cycle expansion stopped
              - calls `buildIndexRestoreHyperlinkFormula_` at 4_System_Index.gs:201 (direct lexical context)
                - `buildIndexRestoreHyperlinkFormula_` [FN-091] (4_System_Index.gs:356–362)
                  - calls `getIndexRestoreWebAppUrl_` at 4_System_Index.gs:357 (direct lexical context)
                    - `getIndexRestoreWebAppUrl_` [FN-092] (4_System_Index.gs:364–376)

## MENU-029 — Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 💡 Create Master List

- `createMasterList` [FN-154] (8_Workflow_MasterList.gs:120–124)
  - calls `createMasterListForMonth_` at 8_Workflow_MasterList.gs:123 (direct lexical context)
    - `createMasterListForMonth_` [FN-153] (8_Workflow_MasterList.gs:11–118)
      - calls `startFrameworkTiming_` at 8_Workflow_MasterList.gs:14 (conditional/loop context)
        - `startFrameworkTiming_` [FN-070] (3_Core_Helpers.gs:256–259)
      - calls `markFrameworkStep_` at 8_Workflow_MasterList.gs:16 (conditional/loop context)
        - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277)
      - calls `markRuntimeStep_` at 8_Workflow_MasterList.gs:17 (direct lexical context)
        - `markRuntimeStep_` [FN-072] (3_Core_Helpers.gs:279–281)
          - calls `markFrameworkStep_` at 3_Core_Helpers.gs:280 (direct lexical context)
            - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
      - calls `writeRuntimeTimingReport_` at 8_Workflow_MasterList.gs:29 (conditional/loop context)
        - `writeRuntimeTimingReport_` [FN-074] (3_Core_Helpers.gs:300–302)
          - calls `writeFrameworkTimingReport_` at 3_Core_Helpers.gs:301 (direct lexical context)
            - `writeFrameworkTimingReport_` [FN-073] (3_Core_Helpers.gs:283–298)
              - calls `padRowToWidth_` at 3_Core_Helpers.gs:290 (direct lexical context)
                - `padRowToWidth_` [FN-052] (3_Core_Helpers.gs:83–87)
      - calls `writeRuntimeTimingReport_` at 8_Workflow_MasterList.gs:44 (conditional/loop context)
        - `writeRuntimeTimingReport_` [FN-074] (3_Core_Helpers.gs:300–302) — shared/cycle expansion stopped
      - calls `buildStagedMasterListSheetName_` at 8_Workflow_MasterList.gs:52 (conditional/loop context)
        - `buildStagedMasterListSheetName_` [FN-172] (8_Workflow_MasterList.gs:421–424)
          - calls `safeSheetName_` at 8_Workflow_MasterList.gs:423 (direct lexical context)
            - `safeSheetName_` [FN-051] (3_Core_Helpers.gs:77–79)
              - calls `normalizeText_` at 3_Core_Helpers.gs:78 (direct lexical context)
                - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
      - calls `createMasterListSheetFromTemplate_` at 8_Workflow_MasterList.gs:53 (direct lexical context)
        - `createMasterListSheetFromTemplate_` [FN-120] (5_System_Templates.gs:411–415)
      - calls `buildMasterListHeadersBeforeDataCopy_` at 8_Workflow_MasterList.gs:59 (direct lexical context)
        - `buildMasterListHeadersBeforeDataCopy_` [FN-177] (8_Workflow_MasterList.gs:462–474)
          - calls `getHeaders_` at 8_Workflow_MasterList.gs:466 (direct lexical context)
            - `getHeaders_` [FN-061] (3_Core_Helpers.gs:173–182)
              - calls `getRuntimeCache_` at 3_Core_Helpers.gs:175 (conditional/loop context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
              - calls `getRuntimeCache_` at 3_Core_Helpers.gs:175 (conditional/loop context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `getRuntimeCache_` at 3_Core_Helpers.gs:180 (direct lexical context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `clearSheetRuntimeCachesForSheet_` at 8_Workflow_MasterList.gs:473 (direct lexical context)
            - `clearSheetRuntimeCachesForSheet_` [FN-069] (3_Core_Helpers.gs:246–252)
              - calls `getRuntimeCache_` at 3_Core_Helpers.gs:249 (direct lexical context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `getRuntimeCache_` at 3_Core_Helpers.gs:249 (conditional/loop context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `getRuntimeCache_` at 3_Core_Helpers.gs:250 (direct lexical context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `getRuntimeCache_` at 3_Core_Helpers.gs:250 (conditional/loop context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `getRuntimeCache_` at 3_Core_Helpers.gs:251 (direct lexical context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
      - calls `getHeaders_` at 8_Workflow_MasterList.gs:62 (direct lexical context)
        - `getHeaders_` [FN-061] (3_Core_Helpers.gs:173–182) — shared/cycle expansion stopped
      - calls `getHeaderMap_` at 8_Workflow_MasterList.gs:63 (direct lexical context)
        - `getHeaderMap_` [FN-062] (3_Core_Helpers.gs:184–191)
          - calls `getRuntimeCache_` at 3_Core_Helpers.gs:186 (conditional/loop context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `getRuntimeCache_` at 3_Core_Helpers.gs:186 (conditional/loop context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
          - calls `buildHeaderIndexMap_` at 3_Core_Helpers.gs:188 (direct lexical context)
            - `buildHeaderIndexMap_` [FN-063] (3_Core_Helpers.gs:193–200)
          - calls `getHeaders_` at 3_Core_Helpers.gs:188 (direct lexical context)
            - `getHeaders_` [FN-061] (3_Core_Helpers.gs:173–182) — shared/cycle expansion stopped
          - calls `getRuntimeCache_` at 3_Core_Helpers.gs:189 (direct lexical context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
      - calls `buildPrimaryDemoPRowsInMemory_` at 8_Workflow_MasterList.gs:64 (direct lexical context)
        - `buildPrimaryDemoPRowsInMemory_` [FN-155] (8_Workflow_MasterList.gs:128–168)
          - calls `getDataValues_` at 8_Workflow_MasterList.gs:129 (direct lexical context)
            - `getDataValues_` [FN-067] (3_Core_Helpers.gs:217–231)
              - calls `getSheetDimensions_` at 3_Core_Helpers.gs:221 (direct lexical context)
                - `getSheetDimensions_` [FN-068] (3_Core_Helpers.gs:233–244)
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:235 (conditional/loop context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:235 (conditional/loop context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `getRuntimeCache_` at 3_Core_Helpers.gs:242 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
              - calls `getHeaders_` at 3_Core_Helpers.gs:222 (direct lexical context)
                - `getHeaders_` [FN-061] (3_Core_Helpers.gs:173–182) — shared/cycle expansion stopped
              - calls `getHeaderMap_` at 3_Core_Helpers.gs:223 (direct lexical context)
                - `getHeaderMap_` [FN-062] (3_Core_Helpers.gs:184–191) — shared/cycle expansion stopped
          - calls `getPMRIndex_` at 8_Workflow_MasterList.gs:132 (direct lexical context)
            - `getPMRIndex_` [FN-065] (3_Core_Helpers.gs:209–211)
              - calls `findHeaderIndex_` at 3_Core_Helpers.gs:210 (direct lexical context)
                - `findHeaderIndex_` [FN-064] (3_Core_Helpers.gs:202–207)
          - calls `getMasterTargetIndex_` at 8_Workflow_MasterList.gs:142 (direct lexical context)
            - `getMasterTargetIndex_` [FN-156] (8_Workflow_MasterList.gs:142–149)
          - calls `normalizePMR_` at 8_Workflow_MasterList.gs:154 (direct lexical context)
            - `normalizePMR_` [FN-042] (3_Core_Helpers.gs:12–14)
          - calls `getMasterTargetIndex_` at 8_Workflow_MasterList.gs:161 (direct lexical context)
            - `getMasterTargetIndex_` [FN-156] (8_Workflow_MasterList.gs:142–149) — shared/cycle expansion stopped
      - calls `syncUnlockedCarePlanSourceIntoData_` at 8_Workflow_MasterList.gs:75 (direct lexical context)
        - `syncUnlockedCarePlanSourceIntoData_` [FN-160] (8_Workflow_MasterList.gs:206–215)
          - calls `buildSourceMapBySingleKeyForPart5_` at 8_Workflow_MasterList.gs:210 (direct lexical context)
            - `buildSourceMapBySingleKeyForPart5_` [FN-163] (8_Workflow_MasterList.gs:249–265)
              - calls `getDataValues_` at 8_Workflow_MasterList.gs:250 (direct lexical context)
                - `getDataValues_` [FN-067] (3_Core_Helpers.gs:217–231) — shared/cycle expansion stopped
              - calls `normalizeSyncKey_` at 8_Workflow_MasterList.gs:258 (direct lexical context)
                - `normalizeSyncKey_` [FN-164] (8_Workflow_MasterList.gs:267–283)
          - calls `syncRowsFromSourceMapData_` at 8_Workflow_MasterList.gs:211 (direct lexical context)
            - `syncRowsFromSourceMapData_` [FN-162] (8_Workflow_MasterList.gs:228–247)
              - calls `normalizeSyncFieldPairs_` at 8_Workflow_MasterList.gs:231 (direct lexical context)
                - `normalizeSyncFieldPairs_` [FN-165] (8_Workflow_MasterList.gs:285–287)
              - calls `normalizeSyncKey_` at 8_Workflow_MasterList.gs:236 (direct lexical context)
                - `normalizeSyncKey_` [FN-164] (8_Workflow_MasterList.gs:267–283) — shared/cycle expansion stopped
      - calls `syncCarePlanDueSourceIntoData_` at 8_Workflow_MasterList.gs:78 (direct lexical context)
        - `syncCarePlanDueSourceIntoData_` [FN-161] (8_Workflow_MasterList.gs:217–226)
          - calls `buildSourceMapBySingleKeyForPart5_` at 8_Workflow_MasterList.gs:221 (direct lexical context)
            - `buildSourceMapBySingleKeyForPart5_` [FN-163] (8_Workflow_MasterList.gs:249–265) — shared/cycle expansion stopped
          - calls `syncRowsFromSourceMapData_` at 8_Workflow_MasterList.gs:222 (direct lexical context)
            - `syncRowsFromSourceMapData_` [FN-162] (8_Workflow_MasterList.gs:228–247) — shared/cycle expansion stopped
      - calls `promoteStagedMasterListSheet_` at 8_Workflow_MasterList.gs:89 (direct lexical context)
        - `promoteStagedMasterListSheet_` [FN-175] (8_Workflow_MasterList.gs:437–450)
          - calls `validateStagedMasterListBeforeSwap_` at 8_Workflow_MasterList.gs:438 (direct lexical context)
            - `validateStagedMasterListBeforeSwap_` [FN-174] (8_Workflow_MasterList.gs:431–435)
              - calls `isStagedMasterListSheet_` at 8_Workflow_MasterList.gs:432 (conditional/loop context)
                - `isStagedMasterListSheet_` [FN-173] (8_Workflow_MasterList.gs:426–429)
          - calls `clearSheetRuntimeCachesForSheet_` at 8_Workflow_MasterList.gs:445 (direct lexical context)
            - `clearSheetRuntimeCachesForSheet_` [FN-069] (3_Core_Helpers.gs:246–252) — shared/cycle expansion stopped
      - calls `writeRuntimeTimingReport_` at 8_Workflow_MasterList.gs:100 (direct lexical context)
        - `writeRuntimeTimingReport_` [FN-074] (3_Core_Helpers.gs:300–302) — shared/cycle expansion stopped
      - calls `formatSeconds_` at 8_Workflow_MasterList.gs:101 (direct lexical context)
        - `formatSeconds_` [FN-076] (3_Core_Helpers.gs:309–314)
      - calls `cleanupFailedStagedMasterListSheet_` at 8_Workflow_MasterList.gs:107 (direct lexical context)
        - `cleanupFailedStagedMasterListSheet_` [FN-176] (8_Workflow_MasterList.gs:452–460)
          - calls `isStagedMasterListSheet_` at 8_Workflow_MasterList.gs:453 (conditional/loop context)
            - `isStagedMasterListSheet_` [FN-173] (8_Workflow_MasterList.gs:426–429) — shared/cycle expansion stopped
          - calls `logBestEffortWarning_` at 8_Workflow_MasterList.gs:458 (direct lexical context)
            - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307)
      - calls `logBestEffortWarning_` at 8_Workflow_MasterList.gs:109 (direct lexical context)
        - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307) — shared/cycle expansion stopped
      - calls `markFrameworkStep_` at 8_Workflow_MasterList.gs:111 (conditional/loop context)
        - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
      - calls `markRuntimeStep_` at 8_Workflow_MasterList.gs:113 (direct lexical context)
        - `markRuntimeStep_` [FN-072] (3_Core_Helpers.gs:279–281) — shared/cycle expansion stopped
      - calls `writeRuntimeTimingReport_` at 8_Workflow_MasterList.gs:114 (direct lexical context)
        - `writeRuntimeTimingReport_` [FN-074] (3_Core_Helpers.gs:300–302) — shared/cycle expansion stopped

## MENU-030 — Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › 🏗️ Rebuild System Templates

- `createSystemTemplates` — **MISSING**

## MENU-031 — Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › 🪄 Clear Diagnostics & Timing

- `clearDiagnosticsAndTimingLogs` — **MISSING**

## MENU-032 — Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › ⏱️ Framework Timing on/off

- `toggleFrameworkTiming` — **MISSING**

## MENU-033 — Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › 🧭 Organize Tabs

- `enforceGlobalSheetSortOrder` — **MISSING**

## MENU-034 — Master List › 🧩 Start - up › Build System Sheets

- `buildSystemSheets` — **MISSING**

## MENU-035 — Master List › 🧩 Start - up › 📜 Set up System Sheets

- `setupSystemSheets` — **MISSING**

## MENU-036 — Master List › 🧩 Start - up › 🎨 Format Dashboard

- `rebuildFormatDashboardDefaults` — **MISSING**

## MENU-037 — Master List › 🧩 Start - up › 💾 Save Active Layout as Rebuild Default

- `saveActiveLayoutToDashboardSettings` — **MISSING**

## MENU-038 — Master List › 🧩 Start - up › 🖼️ Build All Templates + Validate

- `buildAllTemplatesAndValidate` [FN-110] (5_System_Templates.gs:287–314)
  - calls `loadDashboardConfig_` at 5_System_Templates.gs:289 (direct lexical context)
    - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43)
      - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:23 (direct lexical context)
        - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
      - calls `loadGlobalSettings_` at 2_Dashboard_Loaders.gs:31 (direct lexical context)
        - `loadGlobalSettings_` [FN-014] (2_Dashboard_Loaders.gs:97–126)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:98 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77)
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:110 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71)
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:111 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:112 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:113 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:114 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:117 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:118 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:119 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:120 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:121 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:122 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
      - calls `loadTitleRows_` at 2_Dashboard_Loaders.gs:32 (direct lexical context)
        - `loadTitleRows_` [FN-015] (2_Dashboard_Loaders.gs:131–144)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:132 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:136 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90)
              - calls `normalizeKey_` at 2_Dashboard_Loaders.gs:80 (direct lexical context)
                - `normalizeKey_` [FN-045] (3_Core_Helpers.gs:31–33)
                  - calls `normalizeText_` at 3_Core_Helpers.gs:32 (direct lexical context)
                    - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:137 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `parseTitleRowConfigRow_` at 2_Dashboard_Loaders.gs:140 (direct lexical context)
            - `parseTitleRowConfigRow_` [FN-016] (2_Dashboard_Loaders.gs:146–164)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:149 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `normalizeTitleTargetCell_` at 2_Dashboard_Loaders.gs:156 (direct lexical context)
                - `normalizeTitleTargetCell_` [FN-017] (2_Dashboard_Loaders.gs:166–170)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:157 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:158 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
      - calls `loadSheetDefinitions_` at 2_Dashboard_Loaders.gs:33 (direct lexical context)
        - `loadSheetDefinitions_` [FN-018] (2_Dashboard_Loaders.gs:175–195)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:176 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:178 (direct lexical context)
            - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75)
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:181 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
          - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:185 (direct lexical context)
            - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399)
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:186 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66)
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:188 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:189 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:192 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
      - calls `loadSheetBehaviors_` at 2_Dashboard_Loaders.gs:34 (direct lexical context)
        - `loadSheetBehaviors_` [FN-019] (2_Dashboard_Loaders.gs:200–218)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:201 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:205 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:208 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:209 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:210 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:211 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:212 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
      - calls `loadSystemSurfaces_` at 2_Dashboard_Loaders.gs:35 (direct lexical context)
        - `loadSystemSurfaces_` [FN-020] (2_Dashboard_Loaders.gs:223–245)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:224 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:233 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:234 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:235 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:236 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:237 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:238 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:240 (direct lexical context)
            - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
      - calls `loadTabOrganization_` at 2_Dashboard_Loaders.gs:36 (direct lexical context)
        - `loadTabOrganization_` [FN-021] (2_Dashboard_Loaders.gs:250–266)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:251 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:260 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
      - calls `loadColumnDefinitions_` at 2_Dashboard_Loaders.gs:37 (direct lexical context)
        - `loadColumnDefinitions_` [FN-023] (2_Dashboard_Loaders.gs:276–297)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:277 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:281 (direct lexical context)
            - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10)
          - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:285 (direct lexical context)
            - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:285 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:286 (direct lexical context)
            - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:286 (conditional/loop context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:287 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:288 (direct lexical context)
            - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
      - calls `loadSheetHeaders_` at 2_Dashboard_Loaders.gs:38 (direct lexical context)
        - `loadSheetHeaders_` [FN-024] (2_Dashboard_Loaders.gs:302–323)
          - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:303 (direct lexical context)
            - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:307 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:308 (direct lexical context)
            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:309 (direct lexical context)
            - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
  - calls `ensureGoldenMasterTemplate_` at 5_System_Templates.gs:290 (direct lexical context)
    - `ensureGoldenMasterTemplate_` [FN-099] (5_System_Templates.gs:48–71)
      - calls `markFrameworkStep_` at 5_System_Templates.gs:69 (conditional/loop context)
        - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277)
  - calls `createOrRefreshTemplateFromDashboard_` at 5_System_Templates.gs:297 (direct lexical context)
    - `createOrRefreshTemplateFromDashboard_` [FN-103] (5_System_Templates.gs:156–177)
      - calls `ensureGoldenMasterTemplate_` at 5_System_Templates.gs:162 (conditional/loop context)
        - `ensureGoldenMasterTemplate_` [FN-099] (5_System_Templates.gs:48–71) — shared/cycle expansion stopped
      - calls `getHeadersForSheetType_` at 5_System_Templates.gs:167 (direct lexical context)
        - `getHeadersForSheetType_` [FN-031] (2_Dashboard_Loaders.gs:379–383)
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:380 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
      - calls `getBehaviorForSheetType_` at 5_System_Templates.gs:168 (direct lexical context)
        - `getBehaviorForSheetType_` [FN-028] (2_Dashboard_Loaders.gs:358–362)
          - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:359 (direct lexical context)
            - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
          - calls `getDefaultBehavior_` at 2_Dashboard_Loaders.gs:361 (conditional/loop context)
            - `getDefaultBehavior_` [FN-030] (2_Dashboard_Loaders.gs:368–377)
      - calls `buildTemplateFromDashboard_` at 5_System_Templates.gs:172 (direct lexical context)
        - `buildTemplateFromDashboard_` [FN-104] (5_System_Templates.gs:179–191)
          - calls `markFrameworkStep_` at 5_System_Templates.gs:180 (direct lexical context)
            - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
          - calls `clearTemplateForFullBuild_` at 5_System_Templates.gs:183 (direct lexical context)
            - `clearTemplateForFullBuild_` [FN-105] (5_System_Templates.gs:193–209)
              - calls `markFrameworkStep_` at 5_System_Templates.gs:208 (direct lexical context)
                - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
          - calls `applyTemplateBaseFormatting_` at 5_System_Templates.gs:185 (direct lexical context)
            - `applyTemplateBaseFormatting_` [FN-106] (5_System_Templates.gs:211–236)
              - calls `getThemeColorsFromBase_` at 5_System_Templates.gs:213 (direct lexical context)
                - `getThemeColorsFromBase_` [FN-034] (2_Dashboard_Loaders.gs:401–426)
                  - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:403 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:404 (direct lexical context)
                    - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
                  - calls `hexToHsl_` at 2_Dashboard_Loaders.gs:408 (direct lexical context)
                    - `hexToHsl_` [FN-038] (2_Dashboard_Loaders.gs:511–533)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:409 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:410 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:411 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:412 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:413 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `hslToHex_` at 2_Dashboard_Loaders.gs:417 (direct lexical context)
                    - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544)
                  - calls `hslToHex_` at 2_Dashboard_Loaders.gs:418 (direct lexical context)
                    - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
                  - calls `hslToHex_` at 2_Dashboard_Loaders.gs:419 (direct lexical context)
                    - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
                  - calls `hslToHex_` at 2_Dashboard_Loaders.gs:420 (direct lexical context)
                    - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
                  - calls `hslToHex_` at 2_Dashboard_Loaders.gs:421 (direct lexical context)
                    - `hslToHex_` [FN-039] (2_Dashboard_Loaders.gs:535–544) — shared/cycle expansion stopped
              - calls `ensureTemplateFilter_` at 5_System_Templates.gs:234 (direct lexical context)
                - `ensureTemplateFilter_` [FN-107] (5_System_Templates.gs:238–259)
                  - calls `markFrameworkStep_` at 5_System_Templates.gs:248 (conditional/loop context)
                    - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
                  - calls `markFrameworkStep_` at 5_System_Templates.gs:257 (conditional/loop context)
                    - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
          - calls `writeTemplateMetadata_` at 5_System_Templates.gs:186 (direct lexical context)
            - `writeTemplateMetadata_` [FN-109] (5_System_Templates.gs:272–283)
          - calls `applyTemplateFreezeAndTabColor_` at 5_System_Templates.gs:187 (direct lexical context)
            - `applyTemplateFreezeAndTabColor_` [FN-108] (5_System_Templates.gs:261–270)
              - calls `getThemeColorsFromBase_` at 5_System_Templates.gs:265 (direct lexical context)
                - `getThemeColorsFromBase_` [FN-034] (2_Dashboard_Loaders.gs:401–426) — shared/cycle expansion stopped
          - calls `markFrameworkStep_` at 5_System_Templates.gs:189 (direct lexical context)
            - `markFrameworkStep_` [FN-071] (3_Core_Helpers.gs:261–277) — shared/cycle expansion stopped
  - calls `logBestEffortWarning_` at 5_System_Templates.gs:301 (direct lexical context)
    - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307)
  - calls `setReportTemplateVisibility_` at 5_System_Templates.gs:306 (direct lexical context)
    - `setReportTemplateVisibility_` [FN-112] (5_System_Templates.gs:322–342)
      - calls `forceBaseTemplateHidden_` at 5_System_Templates.gs:341 (direct lexical context)
        - `forceBaseTemplateHidden_` [FN-102] (5_System_Templates.gs:145–152)
          - calls `logBestEffortWarning_` at 5_System_Templates.gs:150 (direct lexical context)
            - `logBestEffortWarning_` [FN-075] (3_Core_Helpers.gs:304–307) — shared/cycle expansion stopped
  - calls `forceBaseTemplateHidden_` at 5_System_Templates.gs:307 (direct lexical context)
    - `forceBaseTemplateHidden_` [FN-102] (5_System_Templates.gs:145–152) — shared/cycle expansion stopped

## MENU-039 — Master List › 📇 Index › 📇 Build / Update Index

- `updateIndexSheet` [FN-084] (4_System_Index.gs:225–257)
  - calls `hasIndexSheetShell_` at 4_System_Index.gs:243 (conditional/loop context)
    - `hasIndexSheetShell_` [FN-079] (4_System_Index.gs:54–63)
  - calls `buildIndexSheetShell_` at 4_System_Index.gs:244 (direct lexical context)
    - `buildIndexSheetShell_` [FN-080] (4_System_Index.gs:65–103)
      - calls `loadDashboardConfig_` at 4_System_Index.gs:66 (direct lexical context)
        - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43)
          - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:23 (direct lexical context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
          - calls `loadGlobalSettings_` at 2_Dashboard_Loaders.gs:31 (direct lexical context)
            - `loadGlobalSettings_` [FN-014] (2_Dashboard_Loaders.gs:97–126)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:98 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:110 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:111 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:112 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:113 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:114 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:117 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:118 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:119 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:120 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:121 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:122 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadTitleRows_` at 2_Dashboard_Loaders.gs:32 (direct lexical context)
            - `loadTitleRows_` [FN-015] (2_Dashboard_Loaders.gs:131–144)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:132 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:136 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90)
                  - calls `normalizeKey_` at 2_Dashboard_Loaders.gs:80 (direct lexical context)
                    - `normalizeKey_` [FN-045] (3_Core_Helpers.gs:31–33)
                      - calls `normalizeText_` at 3_Core_Helpers.gs:32 (direct lexical context)
                        - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:137 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseTitleRowConfigRow_` at 2_Dashboard_Loaders.gs:140 (direct lexical context)
                - `parseTitleRowConfigRow_` [FN-016] (2_Dashboard_Loaders.gs:146–164)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:149 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `normalizeTitleTargetCell_` at 2_Dashboard_Loaders.gs:156 (direct lexical context)
                    - `normalizeTitleTargetCell_` [FN-017] (2_Dashboard_Loaders.gs:166–170)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:157 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:158 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadSheetDefinitions_` at 2_Dashboard_Loaders.gs:33 (direct lexical context)
            - `loadSheetDefinitions_` [FN-018] (2_Dashboard_Loaders.gs:175–195)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:176 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:178 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75)
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:181 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:185 (direct lexical context)
                - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399)
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:186 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66)
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:188 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:189 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:192 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadSheetBehaviors_` at 2_Dashboard_Loaders.gs:34 (direct lexical context)
            - `loadSheetBehaviors_` [FN-019] (2_Dashboard_Loaders.gs:200–218)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:201 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:205 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:208 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:209 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:210 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:211 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:212 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `loadSystemSurfaces_` at 2_Dashboard_Loaders.gs:35 (direct lexical context)
            - `loadSystemSurfaces_` [FN-020] (2_Dashboard_Loaders.gs:223–245)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:224 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:233 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:234 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:235 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:236 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:237 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:238 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:240 (direct lexical context)
                - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
          - calls `loadTabOrganization_` at 2_Dashboard_Loaders.gs:36 (direct lexical context)
            - `loadTabOrganization_` [FN-021] (2_Dashboard_Loaders.gs:250–266)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:251 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:260 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
          - calls `loadColumnDefinitions_` at 2_Dashboard_Loaders.gs:37 (direct lexical context)
            - `loadColumnDefinitions_` [FN-023] (2_Dashboard_Loaders.gs:276–297)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:277 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:281 (direct lexical context)
                - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10)
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:285 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:285 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:286 (direct lexical context)
                - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:286 (conditional/loop context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:287 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:288 (direct lexical context)
                - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
          - calls `loadSheetHeaders_` at 2_Dashboard_Loaders.gs:38 (direct lexical context)
            - `loadSheetHeaders_` [FN-024] (2_Dashboard_Loaders.gs:302–323)
              - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:303 (direct lexical context)
                - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
              - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:307 (direct lexical context)
                - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
              - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:308 (direct lexical context)
                - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:309 (direct lexical context)
                - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
      - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:67 (direct lexical context)
        - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466)
      - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:68 (direct lexical context)
        - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178)
          - calls `getDocumentPropertiesCached_` at 1_Config.gs:177 (direct lexical context)
            - `getDocumentPropertiesCached_` [FN-007] (1_Config.gs:170–174)
              - calls `getRuntimeCache_` at 1_Config.gs:171 (direct lexical context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
  - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:247 (direct lexical context)
    - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466) — shared/cycle expansion stopped
  - calls `updateIndexLocalWorkspace_` at 4_System_Index.gs:250 (conditional/loop context)
    - `updateIndexLocalWorkspace_` [FN-081] (4_System_Index.gs:111–180)
      - calls `localSheetRow_` at 4_System_Index.gs:117 (direct lexical context)
        - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127)
      - calls `getTabOrganizationProfilesForSort_` at 4_System_Index.gs:130 (direct lexical context)
        - `getTabOrganizationProfilesForSort_` [FN-022] (2_Dashboard_Loaders.gs:268–271)
          - calls `loadDashboardConfig_` at 2_Dashboard_Loaders.gs:269 (direct lexical context)
            - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
      - calls `localSheetRow_` at 4_System_Index.gs:157 (direct lexical context)
        - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127) — shared/cycle expansion stopped
  - calls `updateIndexArchiveWorkspace_` at 4_System_Index.gs:251 (conditional/loop context)
    - `updateIndexArchiveWorkspace_` [FN-083] (4_System_Index.gs:185–220)
      - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:187 (direct lexical context)
        - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178) — shared/cycle expansion stopped
      - calls `buildIndexRestoreHyperlinkFormula_` at 4_System_Index.gs:201 (direct lexical context)
        - `buildIndexRestoreHyperlinkFormula_` [FN-091] (4_System_Index.gs:356–362)
          - calls `getIndexRestoreWebAppUrl_` at 4_System_Index.gs:357 (direct lexical context)
            - `getIndexRestoreWebAppUrl_` [FN-092] (4_System_Index.gs:364–376)

## MENU-040 — Master List › 📇 Index › ↩️ Restore Selected Archive Row

- `restoreSheetFromActiveIndexRow` [FN-089] (4_System_Index.gs:280–327)
  - calls `restoreSheetFromArchiveWorkbook` at 4_System_Index.gs:323 (direct lexical context)
    - `restoreSheetFromArchiveWorkbook` [FN-090] (4_System_Index.gs:329–352)
      - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:336 (direct lexical context)
        - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178)
          - calls `getDocumentPropertiesCached_` at 1_Config.gs:177 (direct lexical context)
            - `getDocumentPropertiesCached_` [FN-007] (1_Config.gs:170–174)
              - calls `getRuntimeCache_` at 1_Config.gs:171 (direct lexical context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
      - calls `updateIndexSheet` at 4_System_Index.gs:348 (direct lexical context)
        - `updateIndexSheet` [FN-084] (4_System_Index.gs:225–257)
          - calls `hasIndexSheetShell_` at 4_System_Index.gs:243 (conditional/loop context)
            - `hasIndexSheetShell_` [FN-079] (4_System_Index.gs:54–63)
          - calls `buildIndexSheetShell_` at 4_System_Index.gs:244 (direct lexical context)
            - `buildIndexSheetShell_` [FN-080] (4_System_Index.gs:65–103)
              - calls `loadDashboardConfig_` at 4_System_Index.gs:66 (direct lexical context)
                - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43)
                  - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:23 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `loadGlobalSettings_` at 2_Dashboard_Loaders.gs:31 (direct lexical context)
                    - `loadGlobalSettings_` [FN-014] (2_Dashboard_Loaders.gs:97–126)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:98 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:110 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:111 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:112 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:113 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:114 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:117 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:118 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:119 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:120 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:121 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:122 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `loadTitleRows_` at 2_Dashboard_Loaders.gs:32 (direct lexical context)
                    - `loadTitleRows_` [FN-015] (2_Dashboard_Loaders.gs:131–144)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:132 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:136 (direct lexical context)
                        - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90)
                          - calls `normalizeKey_` at 2_Dashboard_Loaders.gs:80 (direct lexical context)
                            - `normalizeKey_` [FN-045] (3_Core_Helpers.gs:31–33)
                              - calls `normalizeText_` at 3_Core_Helpers.gs:32 (direct lexical context)
                                - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:137 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `parseTitleRowConfigRow_` at 2_Dashboard_Loaders.gs:140 (direct lexical context)
                        - `parseTitleRowConfigRow_` [FN-016] (2_Dashboard_Loaders.gs:146–164)
                          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:149 (direct lexical context)
                            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                          - calls `normalizeTitleTargetCell_` at 2_Dashboard_Loaders.gs:156 (direct lexical context)
                            - `normalizeTitleTargetCell_` [FN-017] (2_Dashboard_Loaders.gs:166–170)
                          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:157 (direct lexical context)
                            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:158 (direct lexical context)
                            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `loadSheetDefinitions_` at 2_Dashboard_Loaders.gs:33 (direct lexical context)
                    - `loadSheetDefinitions_` [FN-018] (2_Dashboard_Loaders.gs:175–195)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:176 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:178 (direct lexical context)
                        - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75)
                      - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:181 (direct lexical context)
                        - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                      - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:185 (direct lexical context)
                        - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399)
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:186 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:188 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:189 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:192 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `loadSheetBehaviors_` at 2_Dashboard_Loaders.gs:34 (direct lexical context)
                    - `loadSheetBehaviors_` [FN-019] (2_Dashboard_Loaders.gs:200–218)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:201 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:205 (direct lexical context)
                        - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:208 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:209 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:210 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:211 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:212 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `loadSystemSurfaces_` at 2_Dashboard_Loaders.gs:35 (direct lexical context)
                    - `loadSystemSurfaces_` [FN-020] (2_Dashboard_Loaders.gs:223–245)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:224 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:233 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:234 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:235 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:236 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:237 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:238 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:240 (direct lexical context)
                        - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
                  - calls `loadTabOrganization_` at 2_Dashboard_Loaders.gs:36 (direct lexical context)
                    - `loadTabOrganization_` [FN-021] (2_Dashboard_Loaders.gs:250–266)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:251 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:260 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `loadColumnDefinitions_` at 2_Dashboard_Loaders.gs:37 (direct lexical context)
                    - `loadColumnDefinitions_` [FN-023] (2_Dashboard_Loaders.gs:276–297)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:277 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:281 (direct lexical context)
                        - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10)
                      - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:285 (direct lexical context)
                        - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:285 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:286 (direct lexical context)
                        - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:286 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:287 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:288 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `loadSheetHeaders_` at 2_Dashboard_Loaders.gs:38 (direct lexical context)
                    - `loadSheetHeaders_` [FN-024] (2_Dashboard_Loaders.gs:302–323)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:303 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:307 (direct lexical context)
                        - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:308 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:309 (direct lexical context)
                        - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
              - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:67 (direct lexical context)
                - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466)
              - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:68 (direct lexical context)
                - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178) — shared/cycle expansion stopped
          - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:247 (direct lexical context)
            - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466) — shared/cycle expansion stopped
          - calls `updateIndexLocalWorkspace_` at 4_System_Index.gs:250 (conditional/loop context)
            - `updateIndexLocalWorkspace_` [FN-081] (4_System_Index.gs:111–180)
              - calls `localSheetRow_` at 4_System_Index.gs:117 (direct lexical context)
                - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127)
              - calls `getTabOrganizationProfilesForSort_` at 4_System_Index.gs:130 (direct lexical context)
                - `getTabOrganizationProfilesForSort_` [FN-022] (2_Dashboard_Loaders.gs:268–271)
                  - calls `loadDashboardConfig_` at 2_Dashboard_Loaders.gs:269 (direct lexical context)
                    - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
              - calls `localSheetRow_` at 4_System_Index.gs:157 (direct lexical context)
                - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127) — shared/cycle expansion stopped
          - calls `updateIndexArchiveWorkspace_` at 4_System_Index.gs:251 (conditional/loop context)
            - `updateIndexArchiveWorkspace_` [FN-083] (4_System_Index.gs:185–220)
              - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:187 (direct lexical context)
                - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178) — shared/cycle expansion stopped
              - calls `buildIndexRestoreHyperlinkFormula_` at 4_System_Index.gs:201 (direct lexical context)
                - `buildIndexRestoreHyperlinkFormula_` [FN-091] (4_System_Index.gs:356–362)
                  - calls `getIndexRestoreWebAppUrl_` at 4_System_Index.gs:357 (direct lexical context)
                    - `getIndexRestoreWebAppUrl_` [FN-092] (4_System_Index.gs:364–376)

## MENU-041 — Master List › 📇 Index › 🌐 Configure Index Restore Web App URL

- `configureIndexRestoreWebAppUrl` [FN-078] (4_System_Index.gs:34–50)
  - calls `getIndexRestoreWebAppUrl_` at 4_System_Index.gs:37 (direct lexical context)
    - `getIndexRestoreWebAppUrl_` [FN-092] (4_System_Index.gs:364–376)
  - calls `updateIndexSheet` at 4_System_Index.gs:48 (direct lexical context)
    - `updateIndexSheet` [FN-084] (4_System_Index.gs:225–257)
      - calls `hasIndexSheetShell_` at 4_System_Index.gs:243 (conditional/loop context)
        - `hasIndexSheetShell_` [FN-079] (4_System_Index.gs:54–63)
      - calls `buildIndexSheetShell_` at 4_System_Index.gs:244 (direct lexical context)
        - `buildIndexSheetShell_` [FN-080] (4_System_Index.gs:65–103)
          - calls `loadDashboardConfig_` at 4_System_Index.gs:66 (direct lexical context)
            - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43)
              - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:23 (direct lexical context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
              - calls `loadGlobalSettings_` at 2_Dashboard_Loaders.gs:31 (direct lexical context)
                - `loadGlobalSettings_` [FN-014] (2_Dashboard_Loaders.gs:97–126)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:98 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:110 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:111 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:112 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:113 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:114 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:117 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:118 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:119 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:120 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:121 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:122 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `loadTitleRows_` at 2_Dashboard_Loaders.gs:32 (direct lexical context)
                - `loadTitleRows_` [FN-015] (2_Dashboard_Loaders.gs:131–144)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:132 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:136 (direct lexical context)
                    - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90)
                      - calls `normalizeKey_` at 2_Dashboard_Loaders.gs:80 (direct lexical context)
                        - `normalizeKey_` [FN-045] (3_Core_Helpers.gs:31–33)
                          - calls `normalizeText_` at 3_Core_Helpers.gs:32 (direct lexical context)
                            - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:137 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `parseTitleRowConfigRow_` at 2_Dashboard_Loaders.gs:140 (direct lexical context)
                    - `parseTitleRowConfigRow_` [FN-016] (2_Dashboard_Loaders.gs:146–164)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:149 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `normalizeTitleTargetCell_` at 2_Dashboard_Loaders.gs:156 (direct lexical context)
                        - `normalizeTitleTargetCell_` [FN-017] (2_Dashboard_Loaders.gs:166–170)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:157 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:158 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `loadSheetDefinitions_` at 2_Dashboard_Loaders.gs:33 (direct lexical context)
                - `loadSheetDefinitions_` [FN-018] (2_Dashboard_Loaders.gs:175–195)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:176 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:178 (direct lexical context)
                    - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75)
                  - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:181 (direct lexical context)
                    - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                  - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:185 (direct lexical context)
                    - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399)
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:186 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66)
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:188 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:189 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:192 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `loadSheetBehaviors_` at 2_Dashboard_Loaders.gs:34 (direct lexical context)
                - `loadSheetBehaviors_` [FN-019] (2_Dashboard_Loaders.gs:200–218)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:201 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:205 (direct lexical context)
                    - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:208 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:209 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:210 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:211 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:212 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `loadSystemSurfaces_` at 2_Dashboard_Loaders.gs:35 (direct lexical context)
                - `loadSystemSurfaces_` [FN-020] (2_Dashboard_Loaders.gs:223–245)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:224 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:233 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:234 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:235 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:236 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:237 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:238 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:240 (direct lexical context)
                    - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
              - calls `loadTabOrganization_` at 2_Dashboard_Loaders.gs:36 (direct lexical context)
                - `loadTabOrganization_` [FN-021] (2_Dashboard_Loaders.gs:250–266)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:251 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:260 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
              - calls `loadColumnDefinitions_` at 2_Dashboard_Loaders.gs:37 (direct lexical context)
                - `loadColumnDefinitions_` [FN-023] (2_Dashboard_Loaders.gs:276–297)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:277 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:281 (direct lexical context)
                    - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10)
                  - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:285 (direct lexical context)
                    - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:285 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:286 (direct lexical context)
                    - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:286 (conditional/loop context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:287 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:288 (direct lexical context)
                    - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
              - calls `loadSheetHeaders_` at 2_Dashboard_Loaders.gs:38 (direct lexical context)
                - `loadSheetHeaders_` [FN-024] (2_Dashboard_Loaders.gs:302–323)
                  - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:303 (direct lexical context)
                    - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                  - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:307 (direct lexical context)
                    - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                  - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:308 (direct lexical context)
                    - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:309 (direct lexical context)
                    - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
          - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:67 (direct lexical context)
            - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466)
          - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:68 (direct lexical context)
            - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178)
              - calls `getDocumentPropertiesCached_` at 1_Config.gs:177 (direct lexical context)
                - `getDocumentPropertiesCached_` [FN-007] (1_Config.gs:170–174)
                  - calls `getRuntimeCache_` at 1_Config.gs:171 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
      - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:247 (direct lexical context)
        - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466) — shared/cycle expansion stopped
      - calls `updateIndexLocalWorkspace_` at 4_System_Index.gs:250 (conditional/loop context)
        - `updateIndexLocalWorkspace_` [FN-081] (4_System_Index.gs:111–180)
          - calls `localSheetRow_` at 4_System_Index.gs:117 (direct lexical context)
            - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127)
          - calls `getTabOrganizationProfilesForSort_` at 4_System_Index.gs:130 (direct lexical context)
            - `getTabOrganizationProfilesForSort_` [FN-022] (2_Dashboard_Loaders.gs:268–271)
              - calls `loadDashboardConfig_` at 2_Dashboard_Loaders.gs:269 (direct lexical context)
                - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
          - calls `localSheetRow_` at 4_System_Index.gs:157 (direct lexical context)
            - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127) — shared/cycle expansion stopped
      - calls `updateIndexArchiveWorkspace_` at 4_System_Index.gs:251 (conditional/loop context)
        - `updateIndexArchiveWorkspace_` [FN-083] (4_System_Index.gs:185–220)
          - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:187 (direct lexical context)
            - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178) — shared/cycle expansion stopped
          - calls `buildIndexRestoreHyperlinkFormula_` at 4_System_Index.gs:201 (direct lexical context)
            - `buildIndexRestoreHyperlinkFormula_` [FN-091] (4_System_Index.gs:356–362)
              - calls `getIndexRestoreWebAppUrl_` at 4_System_Index.gs:357 (direct lexical context)
                - `getIndexRestoreWebAppUrl_` [FN-092] (4_System_Index.gs:364–376) — shared/cycle expansion stopped

## MENU-042 — Master List › 📇 Index › 🔗 Configure Archive Spreadsheet ID

- `configureArchiveSpreadsheetId` [FN-077] (4_System_Index.gs:15–32)
  - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:17 (direct lexical context)
    - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178)
      - calls `getDocumentPropertiesCached_` at 1_Config.gs:177 (direct lexical context)
        - `getDocumentPropertiesCached_` [FN-007] (1_Config.gs:170–174)
          - calls `getRuntimeCache_` at 1_Config.gs:171 (direct lexical context)
            - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)

## 5. Complete Hierarchical Function Call Graphs for Triggers

### TRG-001 — `onOpen`

- `onOpen` [FN-001] (1_Config.gs:8–69)

### TRG-002 — `doGet`

- `doGet` [FN-094] (4_System_Index.gs:388–424)
  - calls `escapeHtml_` at 4_System_Index.gs:392 (direct lexical context)
    - `escapeHtml_` [FN-093] (4_System_Index.gs:378–386)
  - calls `restoreSheetFromArchiveWorkbook` at 4_System_Index.gs:404 (conditional/loop context)
    - `restoreSheetFromArchiveWorkbook` [FN-090] (4_System_Index.gs:329–352)
      - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:336 (direct lexical context)
        - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178)
          - calls `getDocumentPropertiesCached_` at 1_Config.gs:177 (direct lexical context)
            - `getDocumentPropertiesCached_` [FN-007] (1_Config.gs:170–174)
              - calls `getRuntimeCache_` at 1_Config.gs:171 (direct lexical context)
                - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164)
      - calls `updateIndexSheet` at 4_System_Index.gs:348 (direct lexical context)
        - `updateIndexSheet` [FN-084] (4_System_Index.gs:225–257)
          - calls `hasIndexSheetShell_` at 4_System_Index.gs:243 (conditional/loop context)
            - `hasIndexSheetShell_` [FN-079] (4_System_Index.gs:54–63)
          - calls `buildIndexSheetShell_` at 4_System_Index.gs:244 (direct lexical context)
            - `buildIndexSheetShell_` [FN-080] (4_System_Index.gs:65–103)
              - calls `loadDashboardConfig_` at 4_System_Index.gs:66 (direct lexical context)
                - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43)
                  - calls `getRuntimeCache_` at 2_Dashboard_Loaders.gs:23 (direct lexical context)
                    - `getRuntimeCache_` [FN-005] (1_Config.gs:155–164) — shared/cycle expansion stopped
                  - calls `loadGlobalSettings_` at 2_Dashboard_Loaders.gs:31 (direct lexical context)
                    - `loadGlobalSettings_` [FN-014] (2_Dashboard_Loaders.gs:97–126)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:98 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:110 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:111 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:112 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:113 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:114 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:117 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:118 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:119 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:120 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:121 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:122 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `loadTitleRows_` at 2_Dashboard_Loaders.gs:32 (direct lexical context)
                    - `loadTitleRows_` [FN-015] (2_Dashboard_Loaders.gs:131–144)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:132 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:136 (direct lexical context)
                        - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90)
                          - calls `normalizeKey_` at 2_Dashboard_Loaders.gs:80 (direct lexical context)
                            - `normalizeKey_` [FN-045] (3_Core_Helpers.gs:31–33)
                              - calls `normalizeText_` at 3_Core_Helpers.gs:32 (direct lexical context)
                                - `normalizeText_` [FN-044] (3_Core_Helpers.gs:27–29)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:137 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `parseTitleRowConfigRow_` at 2_Dashboard_Loaders.gs:140 (direct lexical context)
                        - `parseTitleRowConfigRow_` [FN-016] (2_Dashboard_Loaders.gs:146–164)
                          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:149 (direct lexical context)
                            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                          - calls `normalizeTitleTargetCell_` at 2_Dashboard_Loaders.gs:156 (direct lexical context)
                            - `normalizeTitleTargetCell_` [FN-017] (2_Dashboard_Loaders.gs:166–170)
                          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:157 (direct lexical context)
                            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                          - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:158 (direct lexical context)
                            - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `loadSheetDefinitions_` at 2_Dashboard_Loaders.gs:33 (direct lexical context)
                    - `loadSheetDefinitions_` [FN-018] (2_Dashboard_Loaders.gs:175–195)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:176 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:178 (direct lexical context)
                        - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75)
                      - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:181 (direct lexical context)
                        - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                      - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:185 (direct lexical context)
                        - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399)
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:186 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66)
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:188 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:189 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:191 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:192 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `loadSheetBehaviors_` at 2_Dashboard_Loaders.gs:34 (direct lexical context)
                    - `loadSheetBehaviors_` [FN-019] (2_Dashboard_Loaders.gs:200–218)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:201 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:205 (direct lexical context)
                        - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:208 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:209 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:210 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:211 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:212 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `loadSystemSurfaces_` at 2_Dashboard_Loaders.gs:35 (direct lexical context)
                    - `loadSystemSurfaces_` [FN-020] (2_Dashboard_Loaders.gs:223–245)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:224 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:233 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:234 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:235 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:236 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:237 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:238 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `normalizeHex_` at 2_Dashboard_Loaders.gs:240 (direct lexical context)
                        - `normalizeHex_` [FN-033] (2_Dashboard_Loaders.gs:395–399) — shared/cycle expansion stopped
                  - calls `loadTabOrganization_` at 2_Dashboard_Loaders.gs:36 (direct lexical context)
                    - `loadTabOrganization_` [FN-021] (2_Dashboard_Loaders.gs:250–266)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:251 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:260 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                  - calls `loadColumnDefinitions_` at 2_Dashboard_Loaders.gs:37 (direct lexical context)
                    - `loadColumnDefinitions_` [FN-023] (2_Dashboard_Loaders.gs:276–297)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:277 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:281 (direct lexical context)
                        - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10)
                      - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:285 (direct lexical context)
                        - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:285 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `isBlankCell_` at 2_Dashboard_Loaders.gs:286 (direct lexical context)
                        - `isBlankCell_` [FN-050] (3_Core_Helpers.gs:73–75) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:286 (conditional/loop context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:287 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                      - calls `parseBoolean_` at 2_Dashboard_Loaders.gs:288 (direct lexical context)
                        - `parseBoolean_` [FN-048] (3_Core_Helpers.gs:62–66) — shared/cycle expansion stopped
                  - calls `loadSheetHeaders_` at 2_Dashboard_Loaders.gs:38 (direct lexical context)
                    - `loadSheetHeaders_` [FN-024] (2_Dashboard_Loaders.gs:302–323)
                      - calls `readDashboardSectionRows_` at 2_Dashboard_Loaders.gs:303 (direct lexical context)
                        - `readDashboardSectionRows_` [FN-012] (2_Dashboard_Loaders.gs:53–77) — shared/cycle expansion stopped
                      - calls `normalizeDashboardSheetTypeKey_` at 2_Dashboard_Loaders.gs:307 (direct lexical context)
                        - `normalizeDashboardSheetTypeKey_` [FN-013] (2_Dashboard_Loaders.gs:79–90) — shared/cycle expansion stopped
                      - calls `numberOrDefault_` at 2_Dashboard_Loaders.gs:308 (direct lexical context)
                        - `numberOrDefault_` [FN-049] (3_Core_Helpers.gs:68–71) — shared/cycle expansion stopped
                      - calls `normalizeHeader_` at 2_Dashboard_Loaders.gs:309 (direct lexical context)
                        - `normalizeHeader_` [FN-041] (3_Core_Helpers.gs:8–10) — shared/cycle expansion stopped
              - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:67 (direct lexical context)
                - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466)
              - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:68 (direct lexical context)
                - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178) — shared/cycle expansion stopped
          - calls `getSectionEThemeForSheet_` at 4_System_Index.gs:247 (direct lexical context)
            - `getSectionEThemeForSheet_` [FN-036] (2_Dashboard_Loaders.gs:437–466) — shared/cycle expansion stopped
          - calls `updateIndexLocalWorkspace_` at 4_System_Index.gs:250 (conditional/loop context)
            - `updateIndexLocalWorkspace_` [FN-081] (4_System_Index.gs:111–180)
              - calls `localSheetRow_` at 4_System_Index.gs:117 (direct lexical context)
                - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127)
              - calls `getTabOrganizationProfilesForSort_` at 4_System_Index.gs:130 (direct lexical context)
                - `getTabOrganizationProfilesForSort_` [FN-022] (2_Dashboard_Loaders.gs:268–271)
                  - calls `loadDashboardConfig_` at 2_Dashboard_Loaders.gs:269 (direct lexical context)
                    - `loadDashboardConfig_` [FN-010] (2_Dashboard_Loaders.gs:22–43) — shared/cycle expansion stopped
              - calls `localSheetRow_` at 4_System_Index.gs:157 (direct lexical context)
                - `localSheetRow_` [FN-082] (4_System_Index.gs:117–127) — shared/cycle expansion stopped
          - calls `updateIndexArchiveWorkspace_` at 4_System_Index.gs:251 (conditional/loop context)
            - `updateIndexArchiveWorkspace_` [FN-083] (4_System_Index.gs:185–220)
              - calls `getArchiveSpreadsheetId_` at 4_System_Index.gs:187 (direct lexical context)
                - `getArchiveSpreadsheetId_` [FN-008] (1_Config.gs:176–178) — shared/cycle expansion stopped
              - calls `buildIndexRestoreHyperlinkFormula_` at 4_System_Index.gs:201 (direct lexical context)
                - `buildIndexRestoreHyperlinkFormula_` [FN-091] (4_System_Index.gs:356–362)
                  - calls `getIndexRestoreWebAppUrl_` at 4_System_Index.gs:357 (direct lexical context)
                    - `getIndexRestoreWebAppUrl_` [FN-092] (4_System_Index.gs:364–376)
  - calls `restoreSheetFromActiveIndexRow` at 4_System_Index.gs:405 (direct lexical context)
    - `restoreSheetFromActiveIndexRow` [FN-089] (4_System_Index.gs:280–327)
      - calls `restoreSheetFromArchiveWorkbook` at 4_System_Index.gs:323 (direct lexical context)
        - `restoreSheetFromArchiveWorkbook` [FN-090] (4_System_Index.gs:329–352) — shared/cycle expansion stopped
  - calls `escapeHtml_` at 4_System_Index.gs:418 (direct lexical context)
    - `escapeHtml_` [FN-093] (4_System_Index.gs:378–386) — shared/cycle expansion stopped

## 6. Numbered Menu Execution Traces

## TRACE-MENU-001 — Master List › 📊 Data & Processing Engine › 📚 Format Monthly Sheets

1. Registration resolves to missing `formatMonthlySheets` (**FAIL**).
## TRACE-MENU-002 — Master List › 📊 Data & Processing Engine › 🔁 Create Monthly Update

1. Registration resolves to missing `runMonthlyUpdate` (**FAIL**).
## TRACE-MENU-003 — Master List › 📊 Data & Processing Engine › 🏁 Create Monthly Start

1. Registration resolves to missing `runMonthlyStart` (**FAIL**).
## TRACE-MENU-004 — Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Sub-Reports › 🗂️ Hide Monthly Sub-Reports

1. Registration resolves to missing `hideMonthlyImportSheets` (**FAIL**).
## TRACE-MENU-005 — Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Sub-Reports › 🗃️ Archive Monthly Sub-Reports

1. Registration resolves to missing `archiveMonthlyImportSheets` (**FAIL**).
## TRACE-MENU-006 — Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Active Sheets › 🗂️ Hide Monthly Active Sheets

1. Registration resolves to missing `hideMonthlyActiveSheets` (**FAIL**).
## TRACE-MENU-007 — Master List › ⚙️ Sheet & Layout Management › 🗄️ Monthly Active Sheets › 🗃️ Archive Monthly Active Sheets

1. Registration resolves to missing `archiveMonthlyActiveSheets` (**FAIL**).
## TRACE-MENU-008 — Master List › ⚙️ Sheet & Layout Management › 🙈 Templates › Build All Templates + Validate

1. Enter `buildAllTemplatesAndValidate` (5_System_Templates.gs:287); parameters: `none`.
2. ↳ At `5_System_Templates.gs:289`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
3. ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
4. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
5. ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
6. ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
7. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
8. ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
9. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
10. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
11. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
12. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
13. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
14. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
15. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
16. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
17. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
18. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
19. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
20. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
21. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
22. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
23. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
24. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
25. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
26. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
27. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
28. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
29. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
30. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
31. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
32. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
33. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
34. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
35. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
36. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
37. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
38. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
39. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
40. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
41. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
42. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
43. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
44. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
45. ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
46. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
47. ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
48. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
49. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
50. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
51. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
52. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
59. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
60. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
61. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
62. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
63. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
64. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
77. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
78. ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
79. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
80. ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
81. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
82. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
83. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
84. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
85. ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
86. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
87. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
88. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
91. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
92. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
93. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
94. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
95. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
96. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
97. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
98. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
99. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
100. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
101. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
102. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
103. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
104. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
105. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
106. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
107. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
108. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
109. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
110. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
111. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
112. ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
113. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
114. ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
115. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
116. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
117. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
118. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
119. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
122. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
123. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
124. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
125. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
126. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
127. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
128. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
129. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
130. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
131. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
132. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
133. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
134. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
135. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
136. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
137. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
138. ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
139. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
140. ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
141. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
142. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
143. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
144. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
145. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
146. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
147. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
148. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
149. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
150. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
151. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
152. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
153. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
154. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
155. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
156. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
157. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
158. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
159. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
160. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
161. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
162. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
163. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
164. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
165. ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
166. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
167. ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
168. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
169. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
170. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
171. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
172. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
173. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
174. ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
175. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
176. ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
177. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
178. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
179. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
180. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
181. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
182. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
183. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
184. ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
185. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
186. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
187. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
188. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
189. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
190. ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
191. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
192. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
193. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
194. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
195. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
196. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
197. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
198. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
199. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
200. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
201. ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
202. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
203. ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
204. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
205. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
206. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
207. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
208. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
210. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
211. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
212. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
213. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
214. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
215. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
216. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
217. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
218. ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
219. ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
220. ↳ At `5_System_Templates.gs:290`, invoke `ensureGoldenMasterTemplate_` (lexically unconditional at this line).
221. ↳ ↳ Enter `ensureGoldenMasterTemplate_` (5_System_Templates.gs:48); parameters: `dashboard, timing`.
222. ↳ ↳ ↳ At `5_System_Templates.gs:69`, invoke `markFrameworkStep_` (branch/loop-dependent).
223. ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
224. ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
225. ↳ ↳ Return/terminate `ensureGoldenMasterTemplate_` according to its source branches; service exceptions propagate unless caught locally.
226. ↳ At `5_System_Templates.gs:297`, invoke `createOrRefreshTemplateFromDashboard_` (lexically unconditional at this line).
227. ↳ ↳ Enter `createOrRefreshTemplateFromDashboard_` (5_System_Templates.gs:156); parameters: `dashboard, sheetDef, timing`.
228. ↳ ↳ ↳ At `5_System_Templates.gs:162`, invoke `ensureGoldenMasterTemplate_` (branch/loop-dependent).
229. ↳ ↳ ↳ ↳ Enter `ensureGoldenMasterTemplate_` (5_System_Templates.gs:48); parameters: `dashboard, timing`.
230. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:69`, invoke `markFrameworkStep_` (branch/loop-dependent).
231. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
232. ↳ ↳ ↳ ↳ Return/terminate `ensureGoldenMasterTemplate_` according to its source branches; service exceptions propagate unless caught locally.
233. ↳ ↳ ↳ At `5_System_Templates.gs:167`, invoke `getHeadersForSheetType_` (lexically unconditional at this line).
234. ↳ ↳ ↳ ↳ Enter `getHeadersForSheetType_` (2_Dashboard_Loaders.gs:379); parameters: `dashboard, sheetType`.
235. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:380`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
236. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
237. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
238. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
239. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
240. ↳ ↳ ↳ ↳ Return/terminate `getHeadersForSheetType_` according to its source branches; service exceptions propagate unless caught locally.
241. ↳ ↳ ↳ At `5_System_Templates.gs:168`, invoke `getBehaviorForSheetType_` (lexically unconditional at this line).
242. ↳ ↳ ↳ ↳ Enter `getBehaviorForSheetType_` (2_Dashboard_Loaders.gs:358); parameters: `dashboard, sheetType`.
243. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:359`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
244. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
245. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
246. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
247. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
248. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:361`, invoke `getDefaultBehavior_` (branch/loop-dependent).
249. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDefaultBehavior_` (2_Dashboard_Loaders.gs:368); parameters: `none`.
250. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDefaultBehavior_` according to its source branches; service exceptions propagate unless caught locally.
251. ↳ ↳ ↳ ↳ Return/terminate `getBehaviorForSheetType_` according to its source branches; service exceptions propagate unless caught locally.
252. ↳ ↳ ↳ At `5_System_Templates.gs:172`, invoke `buildTemplateFromDashboard_` (lexically unconditional at this line).
253. ↳ ↳ ↳ ↳ Enter `buildTemplateFromDashboard_` (5_System_Templates.gs:179); parameters: `sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing, templateExisted`.
254. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:180`, invoke `markFrameworkStep_` (lexically unconditional at this line).
255. ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
256. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
257. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:183`, invoke `clearTemplateForFullBuild_` (lexically unconditional at this line).
258. ↳ ↳ ↳ ↳ ↳ ↳ Enter `clearTemplateForFullBuild_` (5_System_Templates.gs:193); parameters: `sheet, sheetDef, timing, templateExisted`.
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:208`, invoke `markFrameworkStep_` (lexically unconditional at this line).
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
262. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `clearTemplateForFullBuild_` according to its source branches; service exceptions propagate unless caught locally.
263. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:185`, invoke `applyTemplateBaseFormatting_` (lexically unconditional at this line).
264. ↳ ↳ ↳ ↳ ↳ ↳ Enter `applyTemplateBaseFormatting_` (5_System_Templates.gs:211); parameters: `sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing`.
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:213`, invoke `getThemeColorsFromBase_` (lexically unconditional at this line).
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getThemeColorsFromBase_` (2_Dashboard_Loaders.gs:401); parameters: `baseHex, globals`.
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:403`, invoke `getRuntimeCache_` (lexically unconditional at this line).
268. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
269. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
270. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:404`, invoke `normalizeHex_` (lexically unconditional at this line).
271. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
272. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
273. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:408`, invoke `hexToHsl_` (lexically unconditional at this line).
274. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hexToHsl_` (2_Dashboard_Loaders.gs:511); parameters: `hex`.
275. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hexToHsl_` according to its source branches; service exceptions propagate unless caught locally.
276. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:409`, invoke `numberOrDefault_` (lexically unconditional at this line).
277. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
278. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
279. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:410`, invoke `numberOrDefault_` (lexically unconditional at this line).
280. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
281. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
282. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:411`, invoke `numberOrDefault_` (lexically unconditional at this line).
283. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
284. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
285. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:412`, invoke `numberOrDefault_` (lexically unconditional at this line).
286. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
287. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
288. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:413`, invoke `numberOrDefault_` (lexically unconditional at this line).
289. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
290. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
291. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:417`, invoke `hslToHex_` (lexically unconditional at this line).
292. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
293. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
294. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:418`, invoke `hslToHex_` (lexically unconditional at this line).
295. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
296. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
297. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:419`, invoke `hslToHex_` (lexically unconditional at this line).
298. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
299. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
300. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:420`, invoke `hslToHex_` (lexically unconditional at this line).
301. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
302. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
303. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:421`, invoke `hslToHex_` (lexically unconditional at this line).
304. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
305. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
306. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getThemeColorsFromBase_` according to its source branches; service exceptions propagate unless caught locally.
307. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:234`, invoke `ensureTemplateFilter_` (lexically unconditional at this line).
308. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `ensureTemplateFilter_` (5_System_Templates.gs:238); parameters: `sheet, headerRow, rowCount, colCount, sheetDef, timing`.
309. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:248`, invoke `markFrameworkStep_` (branch/loop-dependent).
310. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
311. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
312. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:257`, invoke `markFrameworkStep_` (branch/loop-dependent).
313. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
314. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
315. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `ensureTemplateFilter_` according to its source branches; service exceptions propagate unless caught locally.
316. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `applyTemplateBaseFormatting_` according to its source branches; service exceptions propagate unless caught locally.
317. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:186`, invoke `writeTemplateMetadata_` (lexically unconditional at this line).
318. ↳ ↳ ↳ ↳ ↳ ↳ Enter `writeTemplateMetadata_` (5_System_Templates.gs:272); parameters: `sheet, dashboard, sheetDef, colCount`.
319. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `writeTemplateMetadata_` according to its source branches; service exceptions propagate unless caught locally.
320. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:187`, invoke `applyTemplateFreezeAndTabColor_` (lexically unconditional at this line).
321. ↳ ↳ ↳ ↳ ↳ ↳ Enter `applyTemplateFreezeAndTabColor_` (5_System_Templates.gs:261); parameters: `sheet, dashboard, sheetDef, colCount, timing`.
322. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:265`, invoke `getThemeColorsFromBase_` (lexically unconditional at this line).
323. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getThemeColorsFromBase_` (2_Dashboard_Loaders.gs:401); parameters: `baseHex, globals`.
324. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:403`, invoke `getRuntimeCache_` (lexically unconditional at this line).
325. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
326. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:404`, invoke `normalizeHex_` (lexically unconditional at this line).
327. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
328. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:408`, invoke `hexToHsl_` (lexically unconditional at this line).
329. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
330. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:409`, invoke `numberOrDefault_` (lexically unconditional at this line).
331. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
332. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:410`, invoke `numberOrDefault_` (lexically unconditional at this line).
333. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
334. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:411`, invoke `numberOrDefault_` (lexically unconditional at this line).
335. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
336. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:412`, invoke `numberOrDefault_` (lexically unconditional at this line).
337. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
338. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:413`, invoke `numberOrDefault_` (lexically unconditional at this line).
339. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
340. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:417`, invoke `hslToHex_` (lexically unconditional at this line).
341. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
342. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:418`, invoke `hslToHex_` (lexically unconditional at this line).
343. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
344. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:419`, invoke `hslToHex_` (lexically unconditional at this line).
345. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
346. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:420`, invoke `hslToHex_` (lexically unconditional at this line).
347. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
348. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:421`, invoke `hslToHex_` (lexically unconditional at this line).
349. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
350. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getThemeColorsFromBase_` according to its source branches; service exceptions propagate unless caught locally.
351. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `applyTemplateFreezeAndTabColor_` according to its source branches; service exceptions propagate unless caught locally.
352. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:189`, invoke `markFrameworkStep_` (lexically unconditional at this line).
353. ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
354. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
355. ↳ ↳ ↳ ↳ Return/terminate `buildTemplateFromDashboard_` according to its source branches; service exceptions propagate unless caught locally.
356. ↳ ↳ Return/terminate `createOrRefreshTemplateFromDashboard_` according to its source branches; service exceptions propagate unless caught locally.
357. ↳ At `5_System_Templates.gs:301`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
358. ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
359. ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
360. ↳ At `5_System_Templates.gs:306`, invoke `setReportTemplateVisibility_` (lexically unconditional at this line).
361. ↳ ↳ Enter `setReportTemplateVisibility_` (5_System_Templates.gs:322); parameters: `dashboard, hidden, timing`.
362. ↳ ↳ ↳ At `5_System_Templates.gs:341`, invoke `forceBaseTemplateHidden_` (lexically unconditional at this line).
363. ↳ ↳ ↳ ↳ Enter `forceBaseTemplateHidden_` (5_System_Templates.gs:145); parameters: `none`.
364. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:150`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
365. ↳ ↳ ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
366. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
367. ↳ ↳ ↳ ↳ Return/terminate `forceBaseTemplateHidden_` according to its source branches; service exceptions propagate unless caught locally.
368. ↳ ↳ Return/terminate `setReportTemplateVisibility_` according to its source branches; service exceptions propagate unless caught locally.
369. ↳ At `5_System_Templates.gs:307`, invoke `forceBaseTemplateHidden_` (lexically unconditional at this line).
370. ↳ ↳ Enter `forceBaseTemplateHidden_` (5_System_Templates.gs:145); parameters: `none`.
371. ↳ ↳ ↳ At `5_System_Templates.gs:150`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
372. ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
373. ↳ ↳ Return/terminate `forceBaseTemplateHidden_` according to its source branches; service exceptions propagate unless caught locally.
374. Return/terminate `buildAllTemplatesAndValidate` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-MENU-009 — Master List › ⚙️ Sheet & Layout Management › 🙈 Templates › Show Templates

1. Registration resolves to missing `showReportTemplates` (**FAIL**).
## TRACE-MENU-010 — Master List › ⚙️ Sheet & Layout Management › 🙈 Templates › Hide Templates

1. Registration resolves to missing `hideReportTemplates` (**FAIL**).
## TRACE-MENU-011 — Master List › ⚙️ Sheet & Layout Management › 😎 System Sheets › Hide System Sheets

1. Registration resolves to missing `hideSystemSheets_` (**FAIL**).
## TRACE-MENU-012 — Master List › ⚙️ Sheet & Layout Management › 😎 System Sheets › Show System Sheets

1. Registration resolves to missing `showSystemSheets_` (**FAIL**).
## TRACE-MENU-013 — Master List › 🚀 Quick Start-up › 🏗️ System Set up

1. Registration resolves to missing `quickSystemSetup` (**FAIL**).
## TRACE-MENU-014 — Master List › 🚀 Quick Start-up › Build System Sheets

1. Registration resolves to missing `buildSystemSheets` (**FAIL**).
## TRACE-MENU-015 — Master List › 🚀 Quick Start-up › Set up System Sheets

1. Registration resolves to missing `setupSystemSheets` (**FAIL**).
## TRACE-MENU-016 — Master List › 🚀 Quick Start-up › 🖼️ Build Templates + Validate Templates

1. Enter `quickBuildAllTemplates` (5_System_Templates.gs:316); parameters: `none`.
2. ↳ At `5_System_Templates.gs:318`, invoke `buildAllTemplatesAndValidate` (lexically unconditional at this line).
3. ↳ ↳ Enter `buildAllTemplatesAndValidate` (5_System_Templates.gs:287); parameters: `none`.
4. ↳ ↳ ↳ At `5_System_Templates.gs:289`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
5. ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
6. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
7. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
8. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
9. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
10. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
11. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
12. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
13. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
14. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
15. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
16. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
17. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
18. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
19. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
20. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
21. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
22. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
23. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
24. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
25. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
26. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
27. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
28. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
29. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
30. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
31. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
32. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
33. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
34. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
35. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
36. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
37. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
38. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
39. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
40. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
41. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
42. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
43. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
44. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
45. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
46. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
47. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
48. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
49. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
50. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
51. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
52. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
59. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
60. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
61. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
62. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
63. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
64. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
77. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
78. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
79. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
80. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
81. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
82. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
83. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
84. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
85. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
86. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
87. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
88. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
91. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
92. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
93. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
94. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
95. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
96. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
97. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
98. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
99. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
100. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
101. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
102. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
103. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
104. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
105. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
106. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
107. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
108. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
109. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
110. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
111. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
112. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
113. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
114. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
115. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
116. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
117. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
118. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
119. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
122. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
123. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
124. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
125. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
126. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
127. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
128. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
129. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
130. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
131. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
132. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
133. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
134. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
135. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
136. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
137. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
138. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
139. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
140. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
141. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
142. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
143. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
144. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
145. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
146. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
147. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
148. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
149. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
150. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
151. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
152. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
153. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
154. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
155. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
156. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
157. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
158. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
159. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
160. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
161. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
162. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
163. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
164. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
165. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
166. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
167. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
168. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
169. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
170. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
171. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
172. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
173. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
174. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
175. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
176. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
177. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
178. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
179. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
180. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
181. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
182. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
183. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
184. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
185. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
186. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
187. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
188. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
189. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
190. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
191. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
192. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
193. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
194. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
195. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
196. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
197. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
198. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
199. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
200. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
201. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
202. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
203. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
204. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
205. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
206. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
207. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
208. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
210. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
211. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
212. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
213. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
214. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
215. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
216. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
217. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
218. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
219. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
220. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
221. ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
222. ↳ ↳ ↳ At `5_System_Templates.gs:290`, invoke `ensureGoldenMasterTemplate_` (lexically unconditional at this line).
223. ↳ ↳ ↳ ↳ Enter `ensureGoldenMasterTemplate_` (5_System_Templates.gs:48); parameters: `dashboard, timing`.
224. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:69`, invoke `markFrameworkStep_` (branch/loop-dependent).
225. ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
226. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
227. ↳ ↳ ↳ ↳ Return/terminate `ensureGoldenMasterTemplate_` according to its source branches; service exceptions propagate unless caught locally.
228. ↳ ↳ ↳ At `5_System_Templates.gs:297`, invoke `createOrRefreshTemplateFromDashboard_` (lexically unconditional at this line).
229. ↳ ↳ ↳ ↳ Enter `createOrRefreshTemplateFromDashboard_` (5_System_Templates.gs:156); parameters: `dashboard, sheetDef, timing`.
230. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:162`, invoke `ensureGoldenMasterTemplate_` (branch/loop-dependent).
231. ↳ ↳ ↳ ↳ ↳ ↳ Enter `ensureGoldenMasterTemplate_` (5_System_Templates.gs:48); parameters: `dashboard, timing`.
232. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:69`, invoke `markFrameworkStep_` (branch/loop-dependent).
233. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
234. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `ensureGoldenMasterTemplate_` according to its source branches; service exceptions propagate unless caught locally.
235. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:167`, invoke `getHeadersForSheetType_` (lexically unconditional at this line).
236. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeadersForSheetType_` (2_Dashboard_Loaders.gs:379); parameters: `dashboard, sheetType`.
237. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:380`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
238. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
239. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
240. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
241. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
242. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeadersForSheetType_` according to its source branches; service exceptions propagate unless caught locally.
243. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:168`, invoke `getBehaviorForSheetType_` (lexically unconditional at this line).
244. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getBehaviorForSheetType_` (2_Dashboard_Loaders.gs:358); parameters: `dashboard, sheetType`.
245. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:359`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
246. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
247. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
248. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
249. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
250. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:361`, invoke `getDefaultBehavior_` (branch/loop-dependent).
251. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDefaultBehavior_` (2_Dashboard_Loaders.gs:368); parameters: `none`.
252. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDefaultBehavior_` according to its source branches; service exceptions propagate unless caught locally.
253. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getBehaviorForSheetType_` according to its source branches; service exceptions propagate unless caught locally.
254. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:172`, invoke `buildTemplateFromDashboard_` (lexically unconditional at this line).
255. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildTemplateFromDashboard_` (5_System_Templates.gs:179); parameters: `sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing, templateExisted`.
256. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:180`, invoke `markFrameworkStep_` (lexically unconditional at this line).
257. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
258. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:183`, invoke `clearTemplateForFullBuild_` (lexically unconditional at this line).
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `clearTemplateForFullBuild_` (5_System_Templates.gs:193); parameters: `sheet, sheetDef, timing, templateExisted`.
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:208`, invoke `markFrameworkStep_` (lexically unconditional at this line).
262. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
263. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
264. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `clearTemplateForFullBuild_` according to its source branches; service exceptions propagate unless caught locally.
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:185`, invoke `applyTemplateBaseFormatting_` (lexically unconditional at this line).
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `applyTemplateBaseFormatting_` (5_System_Templates.gs:211); parameters: `sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing`.
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:213`, invoke `getThemeColorsFromBase_` (lexically unconditional at this line).
268. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getThemeColorsFromBase_` (2_Dashboard_Loaders.gs:401); parameters: `baseHex, globals`.
269. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:403`, invoke `getRuntimeCache_` (lexically unconditional at this line).
270. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
271. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
272. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:404`, invoke `normalizeHex_` (lexically unconditional at this line).
273. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
274. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
275. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:408`, invoke `hexToHsl_` (lexically unconditional at this line).
276. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hexToHsl_` (2_Dashboard_Loaders.gs:511); parameters: `hex`.
277. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hexToHsl_` according to its source branches; service exceptions propagate unless caught locally.
278. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:409`, invoke `numberOrDefault_` (lexically unconditional at this line).
279. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
280. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
281. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:410`, invoke `numberOrDefault_` (lexically unconditional at this line).
282. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
283. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
284. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:411`, invoke `numberOrDefault_` (lexically unconditional at this line).
285. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
286. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
287. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:412`, invoke `numberOrDefault_` (lexically unconditional at this line).
288. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
289. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
290. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:413`, invoke `numberOrDefault_` (lexically unconditional at this line).
291. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
292. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
293. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:417`, invoke `hslToHex_` (lexically unconditional at this line).
294. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
295. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
296. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:418`, invoke `hslToHex_` (lexically unconditional at this line).
297. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
298. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
299. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:419`, invoke `hslToHex_` (lexically unconditional at this line).
300. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
301. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
302. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:420`, invoke `hslToHex_` (lexically unconditional at this line).
303. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
304. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
305. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:421`, invoke `hslToHex_` (lexically unconditional at this line).
306. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
307. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
308. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getThemeColorsFromBase_` according to its source branches; service exceptions propagate unless caught locally.
309. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:234`, invoke `ensureTemplateFilter_` (lexically unconditional at this line).
310. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `ensureTemplateFilter_` (5_System_Templates.gs:238); parameters: `sheet, headerRow, rowCount, colCount, sheetDef, timing`.
311. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:248`, invoke `markFrameworkStep_` (branch/loop-dependent).
312. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
313. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
314. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:257`, invoke `markFrameworkStep_` (branch/loop-dependent).
315. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
316. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
317. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `ensureTemplateFilter_` according to its source branches; service exceptions propagate unless caught locally.
318. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `applyTemplateBaseFormatting_` according to its source branches; service exceptions propagate unless caught locally.
319. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:186`, invoke `writeTemplateMetadata_` (lexically unconditional at this line).
320. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `writeTemplateMetadata_` (5_System_Templates.gs:272); parameters: `sheet, dashboard, sheetDef, colCount`.
321. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `writeTemplateMetadata_` according to its source branches; service exceptions propagate unless caught locally.
322. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:187`, invoke `applyTemplateFreezeAndTabColor_` (lexically unconditional at this line).
323. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `applyTemplateFreezeAndTabColor_` (5_System_Templates.gs:261); parameters: `sheet, dashboard, sheetDef, colCount, timing`.
324. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:265`, invoke `getThemeColorsFromBase_` (lexically unconditional at this line).
325. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getThemeColorsFromBase_` (2_Dashboard_Loaders.gs:401); parameters: `baseHex, globals`.
326. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:403`, invoke `getRuntimeCache_` (lexically unconditional at this line).
327. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
328. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:404`, invoke `normalizeHex_` (lexically unconditional at this line).
329. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
330. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:408`, invoke `hexToHsl_` (lexically unconditional at this line).
331. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
332. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:409`, invoke `numberOrDefault_` (lexically unconditional at this line).
333. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
334. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:410`, invoke `numberOrDefault_` (lexically unconditional at this line).
335. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
336. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:411`, invoke `numberOrDefault_` (lexically unconditional at this line).
337. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
338. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:412`, invoke `numberOrDefault_` (lexically unconditional at this line).
339. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
340. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:413`, invoke `numberOrDefault_` (lexically unconditional at this line).
341. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
342. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:417`, invoke `hslToHex_` (lexically unconditional at this line).
343. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
344. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:418`, invoke `hslToHex_` (lexically unconditional at this line).
345. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
346. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:419`, invoke `hslToHex_` (lexically unconditional at this line).
347. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
348. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:420`, invoke `hslToHex_` (lexically unconditional at this line).
349. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
350. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:421`, invoke `hslToHex_` (lexically unconditional at this line).
351. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
352. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getThemeColorsFromBase_` according to its source branches; service exceptions propagate unless caught locally.
353. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `applyTemplateFreezeAndTabColor_` according to its source branches; service exceptions propagate unless caught locally.
354. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:189`, invoke `markFrameworkStep_` (lexically unconditional at this line).
355. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
356. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
357. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildTemplateFromDashboard_` according to its source branches; service exceptions propagate unless caught locally.
358. ↳ ↳ ↳ ↳ Return/terminate `createOrRefreshTemplateFromDashboard_` according to its source branches; service exceptions propagate unless caught locally.
359. ↳ ↳ ↳ At `5_System_Templates.gs:301`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
360. ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
361. ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
362. ↳ ↳ ↳ At `5_System_Templates.gs:306`, invoke `setReportTemplateVisibility_` (lexically unconditional at this line).
363. ↳ ↳ ↳ ↳ Enter `setReportTemplateVisibility_` (5_System_Templates.gs:322); parameters: `dashboard, hidden, timing`.
364. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:341`, invoke `forceBaseTemplateHidden_` (lexically unconditional at this line).
365. ↳ ↳ ↳ ↳ ↳ ↳ Enter `forceBaseTemplateHidden_` (5_System_Templates.gs:145); parameters: `none`.
366. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:150`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
367. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
368. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
369. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `forceBaseTemplateHidden_` according to its source branches; service exceptions propagate unless caught locally.
370. ↳ ↳ ↳ ↳ Return/terminate `setReportTemplateVisibility_` according to its source branches; service exceptions propagate unless caught locally.
371. ↳ ↳ ↳ At `5_System_Templates.gs:307`, invoke `forceBaseTemplateHidden_` (lexically unconditional at this line).
372. ↳ ↳ ↳ ↳ Enter `forceBaseTemplateHidden_` (5_System_Templates.gs:145); parameters: `none`.
373. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:150`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
374. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
375. ↳ ↳ ↳ ↳ Return/terminate `forceBaseTemplateHidden_` according to its source branches; service exceptions propagate unless caught locally.
376. ↳ ↳ Return/terminate `buildAllTemplatesAndValidate` according to its source branches; service exceptions propagate unless caught locally.
377. Return/terminate `quickBuildAllTemplates` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-MENU-017 — Master List › 🚀 Quick Start-up › ✅ Dashboard Quality Workflow

1. Registration resolves to missing `runDashboardQualityWorkflow` (**FAIL**).
## TRACE-MENU-018 — Master List › 🛠️ Maintenance/Rebuild › 👌 Quality › Dashboard Quality Start up

1. Registration resolves to missing `runDashboardQualityStartUp` (**FAIL**).
## TRACE-MENU-019 — Master List › 🛠️ Maintenance/Rebuild › 👌 Quality › Dashboard Quality Validate Templates

1. Registration resolves to missing `runDashboardQualityValidateTemplates` (**FAIL**).
## TRACE-MENU-020 — Master List › 🛠️ Maintenance/Rebuild › 👌 Quality › Dashboard Quality Workflow

1. Registration resolves to missing `runDashboardQualityWorkflow` (**FAIL**).
## TRACE-MENU-021 — Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › Banner

1. Registration resolves to missing `formatBannerReport` (**FAIL**).
## TRACE-MENU-022 — Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › CP Due Date

1. Registration resolves to missing `formatCarePlanDueReport` (**FAIL**).
## TRACE-MENU-023 — Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › Unlocked CP

1. Registration resolves to missing `formatUnlockedCarePlanReport` (**FAIL**).
## TRACE-MENU-024 — Master List › 🛠️ Maintenance/Rebuild › 📝 Format Sheets › Raw Data

1. Registration resolves to missing `formatRawData` (**FAIL**).
## TRACE-MENU-025 — Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 📁 Refined Data › 🔄 Update Refined Data

1. Registration resolves to missing `updateRefinedDataMonthlySync` (**FAIL**).
## TRACE-MENU-026 — Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 📁 Refined Data › 🛠️ Build Refined Data

1. Enter `buildRefinedDataFromScratch` (7_Workflow_DemoP.gs:11); parameters: `none`.
2. ↳ At `7_Workflow_DemoP.gs:16`, invoke `getValidatedRawDataSheetForDemoPBuild_` (lexically unconditional at this line).
3. ↳ ↳ Enter `getValidatedRawDataSheetForDemoPBuild_` (7_Workflow_DemoP.gs:32); parameters: `monthParts, timing`.
4. ↳ ↳ ↳ At `7_Workflow_DemoP.gs:36`, invoke `markRuntimeStep_` (branch/loop-dependent).
5. ↳ ↳ ↳ ↳ Enter `markRuntimeStep_` (3_Core_Helpers.gs:279); parameters: `timing, label, details`.
6. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:280`, invoke `markFrameworkStep_` (lexically unconditional at this line).
7. ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
8. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
9. ↳ ↳ ↳ ↳ Return/terminate `markRuntimeStep_` according to its source branches; service exceptions propagate unless caught locally.
10. ↳ ↳ ↳ At `7_Workflow_DemoP.gs:42`, invoke `isStrictRawDataSheetCandidateForDemoP_` (branch/loop-dependent).
11. ↳ ↳ ↳ ↳ Enter `isStrictRawDataSheetCandidateForDemoP_` (7_Workflow_DemoP.gs:51); parameters: `sheet, monthParts`.
12. ↳ ↳ ↳ ↳ Return/terminate `isStrictRawDataSheetCandidateForDemoP_` according to its source branches; service exceptions propagate unless caught locally.
13. ↳ ↳ ↳ At `7_Workflow_DemoP.gs:44`, invoke `markRuntimeStep_` (branch/loop-dependent).
14. ↳ ↳ ↳ ↳ Enter `markRuntimeStep_` (3_Core_Helpers.gs:279); parameters: `timing, label, details`.
15. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:280`, invoke `markFrameworkStep_` (lexically unconditional at this line).
16. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
17. ↳ ↳ ↳ ↳ Return/terminate `markRuntimeStep_` according to its source branches; service exceptions propagate unless caught locally.
18. ↳ ↳ Return/terminate `getValidatedRawDataSheetForDemoPBuild_` according to its source branches; service exceptions propagate unless caught locally.
19. ↳ At `7_Workflow_DemoP.gs:17`, invoke `markFrameworkStep_` (lexically unconditional at this line).
20. ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
21. ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
22. ↳ At `7_Workflow_DemoP.gs:19`, invoke `createActiveDemoPFromRawData_` (lexically unconditional at this line).
23. ↳ ↳ Enter `createActiveDemoPFromRawData_` (7_Workflow_DemoP.gs:58); parameters: `rawSheet, targetName, monthParts, timing`.
24. ↳ ↳ ↳ At `7_Workflow_DemoP.gs:66`, invoke `loadDashboardConfig_` (branch/loop-dependent).
25. ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
26. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
27. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
28. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
29. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
30. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
31. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
32. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
33. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
34. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
35. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
36. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
37. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
38. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
39. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
40. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
41. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
42. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
43. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
44. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
45. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
46. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
47. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
48. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
49. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
50. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
51. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
52. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
59. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
60. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
61. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
62. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
63. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
64. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
67. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
68. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
69. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
77. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
78. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
79. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
80. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
81. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
82. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
83. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
84. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
85. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
86. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
87. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
88. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
91. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
92. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
93. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
94. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
95. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
96. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
97. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
98. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
99. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
100. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
101. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
102. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
103. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
104. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
105. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
106. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
107. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
108. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
109. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
110. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
111. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
112. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
113. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
114. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
115. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
116. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
117. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
118. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
119. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
122. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
123. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
124. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
125. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
126. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
127. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
128. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
129. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
130. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
131. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
132. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
133. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
134. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
135. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
136. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
137. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
138. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
139. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
140. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
141. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
142. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
143. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
144. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
145. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
146. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
147. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
148. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
149. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
150. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
151. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
152. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
153. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
154. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
155. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
156. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
157. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
158. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
159. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
160. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
161. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
162. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
163. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
164. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
165. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
166. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
167. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
168. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
169. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
170. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
171. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
172. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
173. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
174. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
175. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
176. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
177. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
178. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
179. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
180. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
181. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
182. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
183. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
184. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
185. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
186. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
187. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
188. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
189. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
190. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
191. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
192. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
193. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
194. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
195. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
196. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
197. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
198. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
199. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
200. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
201. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
202. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
203. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
204. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
205. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
206. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
207. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
208. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
210. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
211. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
212. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
213. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
214. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
215. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
216. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
217. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
218. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
219. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
220. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
221. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
222. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
223. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
224. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
225. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
226. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
227. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
228. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
229. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
230. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
231. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
232. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
233. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
234. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
235. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
236. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
237. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
238. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
239. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
240. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
241. ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
242. ↳ ↳ ↳ At `7_Workflow_DemoP.gs:70`, invoke `buildHeaderIndexMap_` (lexically unconditional at this line).
243. ↳ ↳ ↳ ↳ Enter `buildHeaderIndexMap_` (3_Core_Helpers.gs:193); parameters: `headers`.
244. ↳ ↳ ↳ ↳ Return/terminate `buildHeaderIndexMap_` according to its source branches; service exceptions propagate unless caught locally.
245. ↳ ↳ ↳ At `7_Workflow_DemoP.gs:71`, invoke `processRefinedDataUnified_` (lexically unconditional at this line).
246. ↳ ↳ ↳ ↳ Enter `processRefinedDataUnified_` (7_Workflow_DemoP.gs:115); parameters: `workingData, monthParts, sourceSheetName, updateStatus, timing`.
247. ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:117`, invoke `safeFlattenAndProcessContacts_` (lexically unconditional at this line).
248. ↳ ↳ ↳ ↳ ↳ ↳ Enter `safeFlattenAndProcessContacts_` (7_Workflow_DemoP.gs:125); parameters: `workingData, preservePrimaryRows`.
249. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:128`, invoke `flattenDemoPContactRowsInMemory_` (lexically unconditional at this line).
250. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `flattenDemoPContactRowsInMemory_` (7_Workflow_DemoP.gs:148); parameters: `data, requireIntegrity`.
251. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:150`, invoke `buildHeaderIndexMap_` (branch/loop-dependent).
252. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildHeaderIndexMap_` (3_Core_Helpers.gs:193); parameters: `headers`.
253. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildHeaderIndexMap_` according to its source branches; service exceptions propagate unless caught locally.
254. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:152`, invoke `getPMRIndex_` (lexically unconditional at this line).
255. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getPMRIndex_` (3_Core_Helpers.gs:209); parameters: `headerMap`.
256. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:210`, invoke `findHeaderIndex_` (lexically unconditional at this line).
257. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `findHeaderIndex_` (3_Core_Helpers.gs:202); parameters: `headerMap, possibleNames`.
258. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `findHeaderIndex_` according to its source branches; service exceptions propagate unless caught locally.
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getPMRIndex_` according to its source branches; service exceptions propagate unless caught locally.
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:162`, invoke `normalizePMR_` (lexically unconditional at this line).
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
262. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
263. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:179`, invoke `buildDemoPContactSummaryForFlatRecord_` (lexically unconditional at this line).
264. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildDemoPContactSummaryForFlatRecord_` (7_Workflow_DemoP.gs:203); parameters: `row, headerMap`.
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildDemoPContactSummaryForFlatRecord_` according to its source branches; service exceptions propagate unless caught locally.
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:185`, invoke `normalizeCompareValue_` (branch/loop-dependent).
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
268. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
269. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:188`, invoke `normalizeCompareValue_` (branch/loop-dependent).
270. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
271. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
272. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:192`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
273. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
274. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
275. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:198`, invoke `sortDemoPFlatRows_` (lexically unconditional at this line).
276. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `sortDemoPFlatRows_` (7_Workflow_DemoP.gs:215); parameters: `rows, headerMap`.
277. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `sortDemoPFlatRows_` according to its source branches; service exceptions propagate unless caught locally.
278. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `flattenDemoPContactRowsInMemory_` according to its source branches; service exceptions propagate unless caught locally.
279. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:130`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
280. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
281. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
282. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `safeFlattenAndProcessContacts_` according to its source branches; service exceptions propagate unless caught locally.
283. ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:118`, invoke `processDemoPFreshRowsInMemory_` (lexically unconditional at this line).
284. ↳ ↳ ↳ ↳ ↳ ↳ Enter `processDemoPFreshRowsInMemory_` (7_Workflow_DemoP.gs:135); parameters: `data`.
285. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:136`, invoke `populateParticipantNameData_` (lexically unconditional at this line).
286. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `populateParticipantNameData_` (7_Workflow_DemoP.gs:231); parameters: `data, pmrFilter`.
287. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:238`, invoke `normalizeCompareValue_` (branch/loop-dependent).
288. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
289. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
290. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `populateParticipantNameData_` according to its source branches; service exceptions propagate unless caught locally.
291. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:137`, invoke `populateDemoPNameData_` (lexically unconditional at this line).
292. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `populateDemoPNameData_` (7_Workflow_DemoP.gs:245); parameters: `data, pmrFilter`.
293. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:252`, invoke `normalizeCompareValue_` (branch/loop-dependent).
294. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
295. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
296. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `populateDemoPNameData_` according to its source branches; service exceptions propagate unless caught locally.
297. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:138`, invoke `updateBannerColumnData_` (lexically unconditional at this line).
298. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateBannerColumnData_` (7_Workflow_DemoP.gs:259); parameters: `data, pmrFilter`.
299. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:272`, invoke `normalizeCompareValue_` (branch/loop-dependent).
300. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
301. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
302. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateBannerColumnData_` according to its source branches; service exceptions propagate unless caught locally.
303. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:139`, invoke `combineAddressesData_` (lexically unconditional at this line).
304. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `combineAddressesData_` (7_Workflow_DemoP.gs:276); parameters: `data, pmrFilter`.
305. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `combineAddressesData_` according to its source branches; service exceptions propagate unless caught locally.
306. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:140`, invoke `handleLanguageData_` (lexically unconditional at this line).
307. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `handleLanguageData_` (7_Workflow_DemoP.gs:290); parameters: `data, pmrFilter`.
308. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `handleLanguageData_` according to its source branches; service exceptions propagate unless caught locally.
309. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:141`, invoke `splitPhoneNumbersData_` (lexically unconditional at this line).
310. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `splitPhoneNumbersData_` (7_Workflow_DemoP.gs:311); parameters: `data, pmrFilter`.
311. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `splitPhoneNumbersData_` according to its source branches; service exceptions propagate unless caught locally.
312. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:142`, invoke `runMasterContactProcessData_` (lexically unconditional at this line).
313. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `runMasterContactProcessData_` (8_Workflow_MasterList.gs:291); parameters: `data, pmrFilter`.
314. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:293`, invoke `writePMRContactsToParticipantRows_` (lexically unconditional at this line).
315. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `writePMRContactsToParticipantRows_` (8_Workflow_MasterList.gs:296); parameters: `targetSheet, values, headers, headerMap, pmrFilter`.
316. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:306`, invoke `getPMRIndex_` (lexically unconditional at this line).
317. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getPMRIndex_` (3_Core_Helpers.gs:209); parameters: `headerMap`.
318. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:210`, invoke `findHeaderIndex_` (lexically unconditional at this line).
319. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
320. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getPMRIndex_` according to its source branches; service exceptions propagate unless caught locally.
321. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:316`, invoke `normalizePMR_` (branch/loop-dependent).
322. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
323. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
324. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:319`, invoke `buildParticipantContactKey_` (lexically unconditional at this line).
325. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildParticipantContactKey_` (8_Workflow_MasterList.gs:369); parameters: `row, headerMap, pmrIdx, firstIdx, lastIdx`.
326. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:370`, invoke `normalizePMR_` (branch/loop-dependent).
327. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
328. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
329. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:372`, invoke `normalizeKeyPart_` (branch/loop-dependent).
330. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKeyPart_` (3_Core_Helpers.gs:16); parameters: `value`.
331. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKeyPart_` according to its source branches; service exceptions propagate unless caught locally.
332. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:373`, invoke `normalizeKeyPart_` (branch/loop-dependent).
333. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKeyPart_` (3_Core_Helpers.gs:16); parameters: `value`.
334. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKeyPart_` according to its source branches; service exceptions propagate unless caught locally.
335. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildParticipantContactKey_` according to its source branches; service exceptions propagate unless caught locally.
336. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:340`, invoke `capitalizeContactPart_` (branch/loop-dependent).
337. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `capitalizeContactPart_` (8_Workflow_MasterList.gs:378); parameters: `value`.
338. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `capitalizeContactPart_` according to its source branches; service exceptions propagate unless caught locally.
339. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:341`, invoke `capitalizeContactPart_` (branch/loop-dependent).
340. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `capitalizeContactPart_` (8_Workflow_MasterList.gs:378); parameters: `value`.
341. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `capitalizeContactPart_` according to its source branches; service exceptions propagate unless caught locally.
342. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:349`, invoke `buildParticipantContactKey_` (lexically unconditional at this line).
343. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildParticipantContactKey_` (8_Workflow_MasterList.gs:369); parameters: `row, headerMap, pmrIdx, firstIdx, lastIdx`.
344. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:370`, invoke `normalizePMR_` (branch/loop-dependent).
345. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
346. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:372`, invoke `normalizeKeyPart_` (branch/loop-dependent).
347. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
348. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:373`, invoke `normalizeKeyPart_` (branch/loop-dependent).
349. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
350. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildParticipantContactKey_` according to its source branches; service exceptions propagate unless caught locally.
351. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:356`, invoke `normalizeCompareValue_` (branch/loop-dependent).
352. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
353. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
354. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:357`, invoke `formatRankedContact_` (branch/loop-dependent).
355. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `formatRankedContact_` (8_Workflow_MasterList.gs:382); parameters: `contact`.
356. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `formatRankedContact_` according to its source branches; service exceptions propagate unless caught locally.
357. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:361`, invoke `normalizeCompareValue_` (branch/loop-dependent).
358. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
359. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
360. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `writePMRContactsToParticipantRows_` according to its source branches; service exceptions propagate unless caught locally.
361. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `runMasterContactProcessData_` according to its source branches; service exceptions propagate unless caught locally.
362. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:143`, invoke `combineNotesSummaryData_` (lexically unconditional at this line).
363. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `combineNotesSummaryData_` (7_Workflow_DemoP.gs:338); parameters: `data, pmrFilter`.
364. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:345`, invoke `normalizeCompareValue_` (branch/loop-dependent).
365. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
366. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
367. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `combineNotesSummaryData_` according to its source branches; service exceptions propagate unless caught locally.
368. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `processDemoPFreshRowsInMemory_` according to its source branches; service exceptions propagate unless caught locally.
369. ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:121`, invoke `markFrameworkStep_` (branch/loop-dependent).
370. ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
371. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
372. ↳ ↳ ↳ ↳ Return/terminate `processRefinedDataUnified_` according to its source branches; service exceptions propagate unless caught locally.
373. ↳ ↳ ↳ At `7_Workflow_DemoP.gs:78`, invoke `updateDemoPReportDates_` (lexically unconditional at this line).
374. ↳ ↳ ↳ ↳ Enter `updateDemoPReportDates_` (7_Workflow_DemoP.gs:509); parameters: `demoSheet, monthParts`.
375. ↳ ↳ ↳ ↳ Return/terminate `updateDemoPReportDates_` according to its source branches; service exceptions propagate unless caught locally.
376. ↳ ↳ ↳ At `7_Workflow_DemoP.gs:82`, invoke `clearSheetRuntimeCachesForSheet_` (lexically unconditional at this line).
377. ↳ ↳ ↳ ↳ Enter `clearSheetRuntimeCachesForSheet_` (3_Core_Helpers.gs:246); parameters: `sheet`.
378. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:249`, invoke `getRuntimeCache_` (lexically unconditional at this line).
379. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
380. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
381. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:249`, invoke `getRuntimeCache_` (branch/loop-dependent).
382. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
383. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:250`, invoke `getRuntimeCache_` (lexically unconditional at this line).
384. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
385. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
386. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:250`, invoke `getRuntimeCache_` (branch/loop-dependent).
387. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
388. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:251`, invoke `getRuntimeCache_` (lexically unconditional at this line).
389. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
390. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
391. ↳ ↳ ↳ ↳ Return/terminate `clearSheetRuntimeCachesForSheet_` according to its source branches; service exceptions propagate unless caught locally.
392. ↳ ↳ Return/terminate `createActiveDemoPFromRawData_` according to its source branches; service exceptions propagate unless caught locally.
393. ↳ At `7_Workflow_DemoP.gs:23`, invoke `enforceDemoPPostFlattenFormatting_` (lexically unconditional at this line).
394. ↳ ↳ Enter `enforceDemoPPostFlattenFormatting_` (7_Workflow_DemoP.gs:516); parameters: `demoSheet`.
395. ↳ ↳ ↳ At `7_Workflow_DemoP.gs:522`, invoke `applyTemplateColumnWidths_` (lexically unconditional at this line).
396. ↳ ↳ ↳ ↳ Enter `applyTemplateColumnWidths_` (5_System_Templates.gs:14); parameters: `sheet, template, width`.
397. ↳ ↳ ↳ ↳ Return/terminate `applyTemplateColumnWidths_` according to its source branches; service exceptions propagate unless caught locally.
398. ↳ ↳ Return/terminate `enforceDemoPPostFlattenFormatting_` according to its source branches; service exceptions propagate unless caught locally.
399. ↳ At `7_Workflow_DemoP.gs:24`, invoke `refreshIndexAfterSheetWorkflow_` (lexically unconditional at this line).
400. ↳ ↳ Enter `refreshIndexAfterSheetWorkflow_` (4_System_Index.gs:262); parameters: `workflowName, options`.
401. ↳ ↳ ↳ At `4_System_Index.gs:264`, invoke `updateIndexSheet` (lexically unconditional at this line).
402. ↳ ↳ ↳ ↳ Enter `updateIndexSheet` (4_System_Index.gs:225); parameters: `options`.
403. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:243`, invoke `hasIndexSheetShell_` (branch/loop-dependent).
404. ↳ ↳ ↳ ↳ ↳ ↳ Enter `hasIndexSheetShell_` (4_System_Index.gs:54); parameters: `sheet`.
405. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hasIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
406. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:244`, invoke `buildIndexSheetShell_` (lexically unconditional at this line).
407. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexSheetShell_` (4_System_Index.gs:65); parameters: `sheet`.
408. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:66`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
409. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
410. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
411. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
412. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
413. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
414. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
415. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
416. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
417. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
418. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
419. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
420. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
421. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
422. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
423. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
424. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
425. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
426. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
427. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
428. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
429. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:67`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
430. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
431. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
432. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:68`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
433. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
434. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
435. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDocumentPropertiesCached_` (1_Config.gs:170); parameters: `none`.
436. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:171`, invoke `getRuntimeCache_` (lexically unconditional at this line).
437. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
438. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
439. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDocumentPropertiesCached_` according to its source branches; service exceptions propagate unless caught locally.
440. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
441. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
442. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:247`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
443. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
444. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
445. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:250`, invoke `updateIndexLocalWorkspace_` (branch/loop-dependent).
446. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexLocalWorkspace_` (4_System_Index.gs:111); parameters: `sheet, theme`.
447. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:117`, invoke `localSheetRow_` (lexically unconditional at this line).
448. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
449. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
450. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:130`, invoke `getTabOrganizationProfilesForSort_` (lexically unconditional at this line).
451. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getTabOrganizationProfilesForSort_` (2_Dashboard_Loaders.gs:268); parameters: `none`.
452. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:269`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
453. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
454. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
455. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
456. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
457. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
458. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
459. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
460. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
461. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
462. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
463. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
464. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
465. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
466. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
467. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
468. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
469. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
470. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
471. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
472. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
473. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getTabOrganizationProfilesForSort_` according to its source branches; service exceptions propagate unless caught locally.
474. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:157`, invoke `localSheetRow_` (lexically unconditional at this line).
475. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
476. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
477. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexLocalWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
478. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:251`, invoke `updateIndexArchiveWorkspace_` (branch/loop-dependent).
479. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexArchiveWorkspace_` (4_System_Index.gs:185); parameters: `sheet, theme, preOpenedArchiveSs`.
480. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:187`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
481. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
482. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
483. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
484. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
485. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:201`, invoke `buildIndexRestoreHyperlinkFormula_` (lexically unconditional at this line).
486. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexRestoreHyperlinkFormula_` (4_System_Index.gs:356); parameters: `targetSheetName, actionType`.
487. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:357`, invoke `getIndexRestoreWebAppUrl_` (lexically unconditional at this line).
488. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getIndexRestoreWebAppUrl_` (4_System_Index.gs:364); parameters: `none`.
489. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getIndexRestoreWebAppUrl_` according to its source branches; service exceptions propagate unless caught locally.
490. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexRestoreHyperlinkFormula_` according to its source branches; service exceptions propagate unless caught locally.
491. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexArchiveWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
492. ↳ ↳ ↳ ↳ Return/terminate `updateIndexSheet` according to its source branches; service exceptions propagate unless caught locally.
493. ↳ ↳ ↳ At `4_System_Index.gs:266`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
494. ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
495. ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
496. ↳ ↳ Return/terminate `refreshIndexAfterSheetWorkflow_` according to its source branches; service exceptions propagate unless caught locally.
497. ↳ At `7_Workflow_DemoP.gs:26`, invoke `markFrameworkStep_` (lexically unconditional at this line).
498. ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
499. ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
500. Return/terminate `buildRefinedDataFromScratch` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-MENU-027 — Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › ⛔ Create / Update Disenrolled List

1. Enter `createDisenrolledList` (_10_Workflow_Disenrolled.gs:11); parameters: `none`.
2. ↳ At `_10_Workflow_Disenrolled.gs:16`, invoke `createDisenrolledListForMonth_` (lexically unconditional at this line).
3. ↳ ↳ Enter `createDisenrolledListForMonth_` (_10_Workflow_Disenrolled.gs:25); parameters: `monthParts, timing, options`.
4. ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:30`, invoke `markFrameworkStep_` (branch/loop-dependent).
5. ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
6. ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
7. ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:39`, invoke `getOrCreateDisenrolledExclusionSheet_` (lexically unconditional at this line).
8. ↳ ↳ ↳ ↳ Enter `getOrCreateDisenrolledExclusionSheet_` (_10_Workflow_Disenrolled.gs:224); parameters: `ss, timing, timingPrefix`.
9. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:226`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
10. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
11. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
12. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
13. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
14. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
15. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
16. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
17. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
18. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
19. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
20. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
21. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
22. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
23. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
24. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
25. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
26. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
27. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
28. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
29. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
30. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
31. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
32. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
33. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
34. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
35. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
36. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
37. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
38. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
39. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
40. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
41. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
42. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
43. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
44. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
45. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
46. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
47. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
48. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
49. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
50. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
51. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
52. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
59. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
60. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
61. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
62. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
63. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
64. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
77. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
78. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
79. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
80. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
81. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
82. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
83. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
84. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
85. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
86. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
87. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
88. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
91. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
92. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
93. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
94. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
95. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
96. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
97. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
98. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
99. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
100. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
101. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
102. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
103. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
104. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
105. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
106. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
107. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
108. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
109. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
110. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
111. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
112. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
113. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
114. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
115. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
116. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
117. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
118. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
119. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
122. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
123. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
124. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
125. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
126. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
127. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
128. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
129. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
130. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
131. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
132. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
133. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
134. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
135. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
136. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
137. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
138. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
139. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
140. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
141. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
142. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
143. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
144. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
145. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
146. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
147. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
148. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
149. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
150. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
151. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
152. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
153. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
154. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
155. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
156. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
157. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
158. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
159. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
160. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
161. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
162. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
163. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
164. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
165. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
166. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
167. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
168. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
169. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
170. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
171. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
172. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
173. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
174. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
175. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
176. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
177. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
178. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
179. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
180. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
181. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
182. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
183. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
184. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
185. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
186. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
187. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
188. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
189. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
190. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
191. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
192. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
193. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
194. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
195. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
196. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
197. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
198. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
199. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
200. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
201. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
202. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
203. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
204. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
205. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
206. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
207. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
208. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
210. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
211. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
212. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
213. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
214. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
215. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
216. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
217. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
218. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
219. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
220. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
221. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
222. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
223. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
224. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
225. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
226. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
227. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:227`, invoke `getSheetDefinitionByType_` (lexically unconditional at this line).
228. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSheetDefinitionByType_` (2_Dashboard_Loaders.gs:334); parameters: `dashboard, sheetType`.
229. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:335`, invoke `getSheetDefinitionByTypeOrNull_` (lexically unconditional at this line).
230. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSheetDefinitionByTypeOrNull_` (2_Dashboard_Loaders.gs:327); parameters: `dashboard, sheetType`.
231. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:328`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
232. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
233. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
234. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
235. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
236. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:330`, invoke `normalizeDashboardSheetTypeKey_` (branch/loop-dependent).
237. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
238. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
239. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
240. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
241. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSheetDefinitionByTypeOrNull_` according to its source branches; service exceptions propagate unless caught locally.
242. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSheetDefinitionByType_` according to its source branches; service exceptions propagate unless caught locally.
243. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:228`, invoke `getHeadersForSheetType_` (lexically unconditional at this line).
244. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeadersForSheetType_` (2_Dashboard_Loaders.gs:379); parameters: `dashboard, sheetType`.
245. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:380`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
246. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
247. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
248. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
249. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
250. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeadersForSheetType_` according to its source branches; service exceptions propagate unless caught locally.
251. ↳ ↳ ↳ ↳ Return/terminate `getOrCreateDisenrolledExclusionSheet_` according to its source branches; service exceptions propagate unless caught locally.
252. ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:42`, invoke `syncDisenrolledExclusionFromRawData_` (lexically unconditional at this line).
253. ↳ ↳ ↳ ↳ Enter `syncDisenrolledExclusionFromRawData_` (_10_Workflow_Disenrolled.gs:65); parameters: `exclusionSheet, rawSheet, monthParts, timing, timingPrefix`.
254. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:68`, invoke `markFrameworkStep_` (branch/loop-dependent).
255. ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
256. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
257. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:71`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
258. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
262. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
263. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
264. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
268. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
269. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
270. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
271. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
272. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
273. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
274. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
275. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
276. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
277. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
278. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:72`, invoke `getHeadersForSheetType_` (lexically unconditional at this line).
279. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeadersForSheetType_` (2_Dashboard_Loaders.gs:379); parameters: `dashboard, sheetType`.
280. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:380`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
281. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
282. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeadersForSheetType_` according to its source branches; service exceptions propagate unless caught locally.
283. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:73`, invoke `buildHeaderIndexMap_` (lexically unconditional at this line).
284. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildHeaderIndexMap_` (3_Core_Helpers.gs:193); parameters: `headers`.
285. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildHeaderIndexMap_` according to its source branches; service exceptions propagate unless caught locally.
286. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:75`, invoke `getDataValues_` (lexically unconditional at this line).
287. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDataValues_` (3_Core_Helpers.gs:217); parameters: `sheet, headerRow, dataStartRow`.
288. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:221`, invoke `getSheetDimensions_` (lexically unconditional at this line).
289. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSheetDimensions_` (3_Core_Helpers.gs:233); parameters: `sheet`.
290. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:235`, invoke `getRuntimeCache_` (branch/loop-dependent).
291. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
292. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
293. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:235`, invoke `getRuntimeCache_` (branch/loop-dependent).
294. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
295. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:242`, invoke `getRuntimeCache_` (lexically unconditional at this line).
296. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
297. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
298. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSheetDimensions_` according to its source branches; service exceptions propagate unless caught locally.
299. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:222`, invoke `getHeaders_` (lexically unconditional at this line).
300. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaders_` (3_Core_Helpers.gs:173); parameters: `sheet, headerRow`.
301. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
302. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
303. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
304. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
305. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
306. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:180`, invoke `getRuntimeCache_` (lexically unconditional at this line).
307. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
308. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
309. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaders_` according to its source branches; service exceptions propagate unless caught locally.
310. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:223`, invoke `getHeaderMap_` (lexically unconditional at this line).
311. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaderMap_` (3_Core_Helpers.gs:184); parameters: `sheet, headerRow`.
312. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:186`, invoke `getRuntimeCache_` (branch/loop-dependent).
313. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
314. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
315. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:186`, invoke `getRuntimeCache_` (branch/loop-dependent).
316. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
317. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:188`, invoke `buildHeaderIndexMap_` (lexically unconditional at this line).
318. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildHeaderIndexMap_` (3_Core_Helpers.gs:193); parameters: `headers`.
319. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildHeaderIndexMap_` according to its source branches; service exceptions propagate unless caught locally.
320. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:188`, invoke `getHeaders_` (lexically unconditional at this line).
321. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaders_` (3_Core_Helpers.gs:173); parameters: `sheet, headerRow`.
322. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
323. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
324. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
325. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
326. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:180`, invoke `getRuntimeCache_` (lexically unconditional at this line).
327. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
328. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaders_` according to its source branches; service exceptions propagate unless caught locally.
329. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:189`, invoke `getRuntimeCache_` (lexically unconditional at this line).
330. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
331. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
332. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaderMap_` according to its source branches; service exceptions propagate unless caught locally.
333. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDataValues_` according to its source branches; service exceptions propagate unless caught locally.
334. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:76`, invoke `getPMRIndex_` (lexically unconditional at this line).
335. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getPMRIndex_` (3_Core_Helpers.gs:209); parameters: `headerMap`.
336. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:210`, invoke `findHeaderIndex_` (lexically unconditional at this line).
337. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `findHeaderIndex_` (3_Core_Helpers.gs:202); parameters: `headerMap, possibleNames`.
338. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `findHeaderIndex_` according to its source branches; service exceptions propagate unless caught locally.
339. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getPMRIndex_` according to its source branches; service exceptions propagate unless caught locally.
340. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:80`, invoke `findHeaderIndex_` (lexically unconditional at this line).
341. ↳ ↳ ↳ ↳ ↳ ↳ Enter `findHeaderIndex_` (3_Core_Helpers.gs:202); parameters: `headerMap, possibleNames`.
342. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `findHeaderIndex_` according to its source branches; service exceptions propagate unless caught locally.
343. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:91`, invoke `normalizePMR_` (lexically unconditional at this line).
344. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
345. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
346. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:97`, invoke `normalizeCompareValue_` (lexically unconditional at this line).
347. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
348. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
349. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:108`, invoke `getDataValues_` (lexically unconditional at this line).
350. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDataValues_` (3_Core_Helpers.gs:217); parameters: `sheet, headerRow, dataStartRow`.
351. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:221`, invoke `getSheetDimensions_` (lexically unconditional at this line).
352. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
353. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:222`, invoke `getHeaders_` (lexically unconditional at this line).
354. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
355. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:223`, invoke `getHeaderMap_` (lexically unconditional at this line).
356. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
357. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDataValues_` according to its source branches; service exceptions propagate unless caught locally.
358. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:109`, invoke `getPMRIndex_` (branch/loop-dependent).
359. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getPMRIndex_` (3_Core_Helpers.gs:209); parameters: `headerMap`.
360. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:210`, invoke `findHeaderIndex_` (lexically unconditional at this line).
361. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
362. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getPMRIndex_` according to its source branches; service exceptions propagate unless caught locally.
363. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:114`, invoke `normalizePMR_` (lexically unconditional at this line).
364. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
365. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
366. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:121`, invoke `normalizePMR_` (lexically unconditional at this line).
367. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
368. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
369. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:131`, invoke `normalizeCompareValue_` (branch/loop-dependent).
370. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
371. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
372. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:152`, invoke `removeActiveDemoPPMRsFromDisenrolledExclusion_` (lexically unconditional at this line).
373. ↳ ↳ ↳ ↳ ↳ ↳ Enter `removeActiveDemoPPMRsFromDisenrolledExclusion_` (7_Workflow_DemoP.gs:533); parameters: `demoSheet`.
374. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:543`, invoke `getHeaders_` (lexically unconditional at this line).
375. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaders_` (3_Core_Helpers.gs:173); parameters: `sheet, headerRow`.
376. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
377. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
378. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
379. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
380. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:180`, invoke `getRuntimeCache_` (lexically unconditional at this line).
381. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
382. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaders_` according to its source branches; service exceptions propagate unless caught locally.
383. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:544`, invoke `buildHeaderIndexMap_` (lexically unconditional at this line).
384. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildHeaderIndexMap_` (3_Core_Helpers.gs:193); parameters: `headers`.
385. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildHeaderIndexMap_` according to its source branches; service exceptions propagate unless caught locally.
386. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:545`, invoke `getPMRIndex_` (lexically unconditional at this line).
387. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getPMRIndex_` (3_Core_Helpers.gs:209); parameters: `headerMap`.
388. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:210`, invoke `findHeaderIndex_` (lexically unconditional at this line).
389. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
390. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getPMRIndex_` according to its source branches; service exceptions propagate unless caught locally.
391. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:547`, invoke `findHeaderIndex_` (lexically unconditional at this line).
392. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `findHeaderIndex_` (3_Core_Helpers.gs:202); parameters: `headerMap, possibleNames`.
393. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `findHeaderIndex_` according to its source branches; service exceptions propagate unless caught locally.
394. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:550`, invoke `getDataValues_` (lexically unconditional at this line).
395. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDataValues_` (3_Core_Helpers.gs:217); parameters: `sheet, headerRow, dataStartRow`.
396. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:221`, invoke `getSheetDimensions_` (lexically unconditional at this line).
397. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
398. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:222`, invoke `getHeaders_` (lexically unconditional at this line).
399. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
400. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:223`, invoke `getHeaderMap_` (lexically unconditional at this line).
401. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
402. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDataValues_` according to its source branches; service exceptions propagate unless caught locally.
403. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:551`, invoke `getPMRIndex_` (branch/loop-dependent).
404. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getPMRIndex_` (3_Core_Helpers.gs:209); parameters: `headerMap`.
405. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:210`, invoke `findHeaderIndex_` (lexically unconditional at this line).
406. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
407. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getPMRIndex_` according to its source branches; service exceptions propagate unless caught locally.
408. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:556`, invoke `normalizePMR_` (lexically unconditional at this line).
409. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
410. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
411. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:565`, invoke `normalizePMR_` (lexically unconditional at this line).
412. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
413. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
414. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:569`, invoke `normalizeCompareValue_` (branch/loop-dependent).
415. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
416. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
417. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:581`, invoke `normalizePMR_` (lexically unconditional at this line).
418. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
419. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
420. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:593`, invoke `normalizeRowsToWidth_` (lexically unconditional at this line).
421. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeRowsToWidth_` (3_Core_Helpers.gs:89); parameters: `rows, width`.
422. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:90`, invoke `padRowToWidth_` (branch/loop-dependent).
423. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `padRowToWidth_` (3_Core_Helpers.gs:83); parameters: `rowValues, width`.
424. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `padRowToWidth_` according to its source branches; service exceptions propagate unless caught locally.
425. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeRowsToWidth_` according to its source branches; service exceptions propagate unless caught locally.
426. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:596`, invoke `clearSheetRuntimeCachesForSheet_` (lexically unconditional at this line).
427. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `clearSheetRuntimeCachesForSheet_` (3_Core_Helpers.gs:246); parameters: `sheet`.
428. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:249`, invoke `getRuntimeCache_` (lexically unconditional at this line).
429. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
430. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
431. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:249`, invoke `getRuntimeCache_` (branch/loop-dependent).
432. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
433. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:250`, invoke `getRuntimeCache_` (lexically unconditional at this line).
434. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
435. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
436. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:250`, invoke `getRuntimeCache_` (branch/loop-dependent).
437. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
438. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:251`, invoke `getRuntimeCache_` (lexically unconditional at this line).
439. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
440. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
441. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `clearSheetRuntimeCachesForSheet_` according to its source branches; service exceptions propagate unless caught locally.
442. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `7_Workflow_DemoP.gs:597`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
443. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
444. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
445. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `removeActiveDemoPPMRsFromDisenrolledExclusion_` according to its source branches; service exceptions propagate unless caught locally.
446. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:156`, invoke `clearSheetRuntimeCachesForSheet_` (lexically unconditional at this line).
447. ↳ ↳ ↳ ↳ ↳ ↳ Enter `clearSheetRuntimeCachesForSheet_` (3_Core_Helpers.gs:246); parameters: `sheet`.
448. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:249`, invoke `getRuntimeCache_` (lexically unconditional at this line).
449. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
450. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:249`, invoke `getRuntimeCache_` (branch/loop-dependent).
451. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
452. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:250`, invoke `getRuntimeCache_` (lexically unconditional at this line).
453. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
454. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:250`, invoke `getRuntimeCache_` (branch/loop-dependent).
455. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
456. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:251`, invoke `getRuntimeCache_` (lexically unconditional at this line).
457. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
458. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `clearSheetRuntimeCachesForSheet_` according to its source branches; service exceptions propagate unless caught locally.
459. ↳ ↳ ↳ ↳ Return/terminate `syncDisenrolledExclusionFromRawData_` according to its source branches; service exceptions propagate unless caught locally.
460. ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:45`, invoke `hideOldDisenrolledRows_` (lexically unconditional at this line).
461. ↳ ↳ ↳ ↳ Enter `hideOldDisenrolledRows_` (_10_Workflow_Disenrolled.gs:165); parameters: `sheet`.
462. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:167`, invoke `getDataValues_` (lexically unconditional at this line).
463. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDataValues_` (3_Core_Helpers.gs:217); parameters: `sheet, headerRow, dataStartRow`.
464. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:221`, invoke `getSheetDimensions_` (lexically unconditional at this line).
465. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
466. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:222`, invoke `getHeaders_` (lexically unconditional at this line).
467. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
468. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:223`, invoke `getHeaderMap_` (lexically unconditional at this line).
469. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
470. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDataValues_` according to its source branches; service exceptions propagate unless caught locally.
471. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:176`, invoke `createLocalDateOnly_` (lexically unconditional at this line).
472. ↳ ↳ ↳ ↳ ↳ ↳ Enter `createLocalDateOnly_` (3_Core_Helpers.gs:140); parameters: `year, month, day`.
473. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `createLocalDateOnly_` according to its source branches; service exceptions propagate unless caught locally.
474. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:182`, invoke `normalizeToDateObject_` (lexically unconditional at this line).
475. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeToDateObject_` (3_Core_Helpers.gs:95); parameters: `value`.
476. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:98`, invoke `isReasonableReportDate_` (branch/loop-dependent).
477. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isReasonableReportDate_` (3_Core_Helpers.gs:135); parameters: `date`.
478. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isReasonableReportDate_` according to its source branches; service exceptions propagate unless caught locally.
479. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:105`, invoke `isReasonableReportDate_` (lexically unconditional at this line).
480. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isReasonableReportDate_` (3_Core_Helpers.gs:135); parameters: `date`.
481. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isReasonableReportDate_` according to its source branches; service exceptions propagate unless caught locally.
482. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:119`, invoke `isReasonableReportDate_` (branch/loop-dependent).
483. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isReasonableReportDate_` (3_Core_Helpers.gs:135); parameters: `date`.
484. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isReasonableReportDate_` according to its source branches; service exceptions propagate unless caught locally.
485. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:126`, invoke `isReasonableReportDate_` (branch/loop-dependent).
486. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isReasonableReportDate_` (3_Core_Helpers.gs:135); parameters: `date`.
487. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isReasonableReportDate_` according to its source branches; service exceptions propagate unless caught locally.
488. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:132`, invoke `isReasonableReportDate_` (branch/loop-dependent).
489. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isReasonableReportDate_` (3_Core_Helpers.gs:135); parameters: `date`.
490. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isReasonableReportDate_` according to its source branches; service exceptions propagate unless caught locally.
491. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeToDateObject_` according to its source branches; service exceptions propagate unless caught locally.
492. ↳ ↳ ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:192`, invoke `hideRowNumberBatches_` (lexically unconditional at this line).
493. ↳ ↳ ↳ ↳ ↳ ↳ Enter `hideRowNumberBatches_` (_10_Workflow_Disenrolled.gs:197); parameters: `sheet, rowNumbers`.
494. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hideRowNumberBatches_` according to its source branches; service exceptions propagate unless caught locally.
495. ↳ ↳ ↳ ↳ Return/terminate `hideOldDisenrolledRows_` according to its source branches; service exceptions propagate unless caught locally.
496. ↳ ↳ ↳ At `_10_Workflow_Disenrolled.gs:53`, invoke `refreshIndexAfterSheetWorkflow_` (lexically unconditional at this line).
497. ↳ ↳ ↳ ↳ Enter `refreshIndexAfterSheetWorkflow_` (4_System_Index.gs:262); parameters: `workflowName, options`.
498. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:264`, invoke `updateIndexSheet` (lexically unconditional at this line).
499. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexSheet` (4_System_Index.gs:225); parameters: `options`.
500. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:243`, invoke `hasIndexSheetShell_` (branch/loop-dependent).
501. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hasIndexSheetShell_` (4_System_Index.gs:54); parameters: `sheet`.
502. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hasIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
503. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:244`, invoke `buildIndexSheetShell_` (lexically unconditional at this line).
504. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexSheetShell_` (4_System_Index.gs:65); parameters: `sheet`.
505. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:66`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
506. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
507. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
508. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
509. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
510. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
511. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
512. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
513. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
514. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
515. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
516. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
517. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
518. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
519. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
520. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
521. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
522. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
523. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
524. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
525. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
526. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:67`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
527. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
528. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
529. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:68`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
530. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
531. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
532. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDocumentPropertiesCached_` (1_Config.gs:170); parameters: `none`.
533. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:171`, invoke `getRuntimeCache_` (lexically unconditional at this line).
534. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
535. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
536. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDocumentPropertiesCached_` according to its source branches; service exceptions propagate unless caught locally.
537. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
538. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
539. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:247`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
540. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
541. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
542. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:250`, invoke `updateIndexLocalWorkspace_` (branch/loop-dependent).
543. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexLocalWorkspace_` (4_System_Index.gs:111); parameters: `sheet, theme`.
544. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:117`, invoke `localSheetRow_` (lexically unconditional at this line).
545. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
546. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
547. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:130`, invoke `getTabOrganizationProfilesForSort_` (lexically unconditional at this line).
548. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getTabOrganizationProfilesForSort_` (2_Dashboard_Loaders.gs:268); parameters: `none`.
549. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:269`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
550. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
551. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
552. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
553. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
554. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
555. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
556. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
557. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
558. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
559. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
560. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
561. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
562. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
563. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
564. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
565. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
566. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
567. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
568. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
569. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
570. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getTabOrganizationProfilesForSort_` according to its source branches; service exceptions propagate unless caught locally.
571. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:157`, invoke `localSheetRow_` (lexically unconditional at this line).
572. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
573. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
574. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexLocalWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
575. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:251`, invoke `updateIndexArchiveWorkspace_` (branch/loop-dependent).
576. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexArchiveWorkspace_` (4_System_Index.gs:185); parameters: `sheet, theme, preOpenedArchiveSs`.
577. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:187`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
578. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
579. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
580. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
581. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
582. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:201`, invoke `buildIndexRestoreHyperlinkFormula_` (lexically unconditional at this line).
583. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexRestoreHyperlinkFormula_` (4_System_Index.gs:356); parameters: `targetSheetName, actionType`.
584. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:357`, invoke `getIndexRestoreWebAppUrl_` (lexically unconditional at this line).
585. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getIndexRestoreWebAppUrl_` (4_System_Index.gs:364); parameters: `none`.
586. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getIndexRestoreWebAppUrl_` according to its source branches; service exceptions propagate unless caught locally.
587. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexRestoreHyperlinkFormula_` according to its source branches; service exceptions propagate unless caught locally.
588. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexArchiveWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
589. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexSheet` according to its source branches; service exceptions propagate unless caught locally.
590. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:266`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
591. ↳ ↳ ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
592. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
593. ↳ ↳ ↳ ↳ Return/terminate `refreshIndexAfterSheetWorkflow_` according to its source branches; service exceptions propagate unless caught locally.
594. ↳ ↳ Return/terminate `createDisenrolledListForMonth_` according to its source branches; service exceptions propagate unless caught locally.
595. Return/terminate `createDisenrolledList` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-MENU-028 — Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 🗓️ Monthly Change Report

1. Enter `buildMonthlyChangeReport` (9_Workflow_MonthlyChange.gs:66); parameters: `none`.
2. ↳ At `9_Workflow_MonthlyChange.gs:70`, invoke `buildMonthlyChangeReportForMonth_` (lexically unconditional at this line).
3. ↳ ↳ Enter `buildMonthlyChangeReportForMonth_` (9_Workflow_MonthlyChange.gs:11); parameters: `monthParts, timing, options`.
4. ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:15`, invoke `getPreviousRawDataSheet_` (lexically unconditional at this line).
5. ↳ ↳ ↳ ↳ Enter `getPreviousRawDataSheet_` (9_Workflow_MonthlyChange.gs:530); parameters: `monthParts`.
6. ↳ ↳ ↳ ↳ Return/terminate `getPreviousRawDataSheet_` according to its source branches; service exceptions propagate unless caught locally.
7. ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:22`, invoke `markRuntimeStep_` (lexically unconditional at this line).
8. ↳ ↳ ↳ ↳ Enter `markRuntimeStep_` (3_Core_Helpers.gs:279); parameters: `timing, label, details`.
9. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:280`, invoke `markFrameworkStep_` (lexically unconditional at this line).
10. ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
11. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
12. ↳ ↳ ↳ ↳ Return/terminate `markRuntimeStep_` according to its source branches; service exceptions propagate unless caught locally.
13. ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:23`, invoke `compareRawDataForMonthlyChange_` (lexically unconditional at this line).
14. ↳ ↳ ↳ ↳ Enter `compareRawDataForMonthlyChange_` (9_Workflow_MonthlyChange.gs:76); parameters: `previousDemo, currentDemo, monthParts`.
15. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:77`, invoke `getRawDemoPDataForCompare_` (lexically unconditional at this line).
16. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRawDemoPDataForCompare_` (9_Workflow_MonthlyChange.gs:171); parameters: `sheet`.
17. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:172`, invoke `getDataValues_` (lexically unconditional at this line).
18. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDataValues_` (3_Core_Helpers.gs:217); parameters: `sheet, headerRow, dataStartRow`.
19. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:221`, invoke `getSheetDimensions_` (lexically unconditional at this line).
20. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSheetDimensions_` (3_Core_Helpers.gs:233); parameters: `sheet`.
21. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:235`, invoke `getRuntimeCache_` (branch/loop-dependent).
22. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
23. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
24. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:235`, invoke `getRuntimeCache_` (branch/loop-dependent).
25. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
26. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:242`, invoke `getRuntimeCache_` (lexically unconditional at this line).
27. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
28. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
29. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSheetDimensions_` according to its source branches; service exceptions propagate unless caught locally.
30. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:222`, invoke `getHeaders_` (lexically unconditional at this line).
31. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaders_` (3_Core_Helpers.gs:173); parameters: `sheet, headerRow`.
32. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
33. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
34. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
35. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
36. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
37. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:180`, invoke `getRuntimeCache_` (lexically unconditional at this line).
38. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
39. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
40. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaders_` according to its source branches; service exceptions propagate unless caught locally.
41. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:223`, invoke `getHeaderMap_` (lexically unconditional at this line).
42. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaderMap_` (3_Core_Helpers.gs:184); parameters: `sheet, headerRow`.
43. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:186`, invoke `getRuntimeCache_` (branch/loop-dependent).
44. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
45. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
46. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:186`, invoke `getRuntimeCache_` (branch/loop-dependent).
47. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
48. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:188`, invoke `buildHeaderIndexMap_` (lexically unconditional at this line).
49. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildHeaderIndexMap_` (3_Core_Helpers.gs:193); parameters: `headers`.
50. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildHeaderIndexMap_` according to its source branches; service exceptions propagate unless caught locally.
51. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:188`, invoke `getHeaders_` (lexically unconditional at this line).
52. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaders_` (3_Core_Helpers.gs:173); parameters: `sheet, headerRow`.
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:180`, invoke `getRuntimeCache_` (lexically unconditional at this line).
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
59. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaders_` according to its source branches; service exceptions propagate unless caught locally.
60. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:189`, invoke `getRuntimeCache_` (lexically unconditional at this line).
61. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
62. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
63. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaderMap_` according to its source branches; service exceptions propagate unless caught locally.
64. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDataValues_` according to its source branches; service exceptions propagate unless caught locally.
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:175`, invoke `getPMRIndex_` (lexically unconditional at this line).
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getPMRIndex_` (3_Core_Helpers.gs:209); parameters: `headerMap`.
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:210`, invoke `findHeaderIndex_` (lexically unconditional at this line).
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `findHeaderIndex_` (3_Core_Helpers.gs:202); parameters: `headerMap, possibleNames`.
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `findHeaderIndex_` according to its source branches; service exceptions propagate unless caught locally.
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getPMRIndex_` according to its source branches; service exceptions propagate unless caught locally.
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:176`, invoke `getDOBIndex_` (lexically unconditional at this line).
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDOBIndex_` (3_Core_Helpers.gs:213); parameters: `headerMap`.
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:214`, invoke `findHeaderIndex_` (lexically unconditional at this line).
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `findHeaderIndex_` (3_Core_Helpers.gs:202); parameters: `headerMap, possibleNames`.
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `findHeaderIndex_` according to its source branches; service exceptions propagate unless caught locally.
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDOBIndex_` according to its source branches; service exceptions propagate unless caught locally.
77. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:185`, invoke `normalizePMR_` (lexically unconditional at this line).
78. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
79. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
80. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:193`, invoke `normalizeCompareValue_` (branch/loop-dependent).
81. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
82. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
83. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRawDemoPDataForCompare_` according to its source branches; service exceptions propagate unless caught locally.
84. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:78`, invoke `getRawDemoPDataForCompare_` (lexically unconditional at this line).
85. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRawDemoPDataForCompare_` (9_Workflow_MonthlyChange.gs:171); parameters: `sheet`.
86. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:172`, invoke `getDataValues_` (lexically unconditional at this line).
87. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
88. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:175`, invoke `getPMRIndex_` (lexically unconditional at this line).
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:176`, invoke `getDOBIndex_` (lexically unconditional at this line).
91. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
92. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:185`, invoke `normalizePMR_` (lexically unconditional at this line).
93. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
94. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:193`, invoke `normalizeCompareValue_` (branch/loop-dependent).
95. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
96. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRawDemoPDataForCompare_` according to its source branches; service exceptions propagate unless caught locally.
97. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:111`, invoke `getDataValues_` (lexically unconditional at this line).
98. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDataValues_` (3_Core_Helpers.gs:217); parameters: `sheet, headerRow, dataStartRow`.
99. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:221`, invoke `getSheetDimensions_` (lexically unconditional at this line).
100. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
101. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:222`, invoke `getHeaders_` (lexically unconditional at this line).
102. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
103. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:223`, invoke `getHeaderMap_` (lexically unconditional at this line).
104. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
105. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDataValues_` according to its source branches; service exceptions propagate unless caught locally.
106. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:112`, invoke `getPMRIndex_` (lexically unconditional at this line).
107. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getPMRIndex_` (3_Core_Helpers.gs:209); parameters: `headerMap`.
108. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:210`, invoke `findHeaderIndex_` (lexically unconditional at this line).
109. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
110. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getPMRIndex_` according to its source branches; service exceptions propagate unless caught locally.
111. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:115`, invoke `normalizePMR_` (lexically unconditional at this line).
112. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
113. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
114. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:126`, invoke `isSameDate_` (lexically unconditional at this line).
115. ↳ ↳ ↳ ↳ ↳ ↳ Enter `isSameDate_` (3_Core_Helpers.gs:144); parameters: `a, b`.
116. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:145`, invoke `normalizeToDateObject_` (lexically unconditional at this line).
117. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeToDateObject_` (3_Core_Helpers.gs:95); parameters: `value`.
118. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:98`, invoke `isReasonableReportDate_` (branch/loop-dependent).
119. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isReasonableReportDate_` (3_Core_Helpers.gs:135); parameters: `date`.
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isReasonableReportDate_` according to its source branches; service exceptions propagate unless caught locally.
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:105`, invoke `isReasonableReportDate_` (lexically unconditional at this line).
122. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isReasonableReportDate_` (3_Core_Helpers.gs:135); parameters: `date`.
123. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isReasonableReportDate_` according to its source branches; service exceptions propagate unless caught locally.
124. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:119`, invoke `isReasonableReportDate_` (branch/loop-dependent).
125. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isReasonableReportDate_` (3_Core_Helpers.gs:135); parameters: `date`.
126. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isReasonableReportDate_` according to its source branches; service exceptions propagate unless caught locally.
127. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:126`, invoke `isReasonableReportDate_` (branch/loop-dependent).
128. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isReasonableReportDate_` (3_Core_Helpers.gs:135); parameters: `date`.
129. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isReasonableReportDate_` according to its source branches; service exceptions propagate unless caught locally.
130. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:132`, invoke `isReasonableReportDate_` (branch/loop-dependent).
131. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isReasonableReportDate_` (3_Core_Helpers.gs:135); parameters: `date`.
132. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isReasonableReportDate_` according to its source branches; service exceptions propagate unless caught locally.
133. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeToDateObject_` according to its source branches; service exceptions propagate unless caught locally.
134. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:146`, invoke `normalizeToDateObject_` (lexically unconditional at this line).
135. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeToDateObject_` (3_Core_Helpers.gs:95); parameters: `value`.
136. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:98`, invoke `isReasonableReportDate_` (branch/loop-dependent).
137. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
138. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:105`, invoke `isReasonableReportDate_` (lexically unconditional at this line).
139. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
140. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:119`, invoke `isReasonableReportDate_` (branch/loop-dependent).
141. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
142. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:126`, invoke `isReasonableReportDate_` (branch/loop-dependent).
143. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
144. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:132`, invoke `isReasonableReportDate_` (branch/loop-dependent).
145. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
146. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeToDateObject_` according to its source branches; service exceptions propagate unless caught locally.
147. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isSameDate_` according to its source branches; service exceptions propagate unless caught locally.
148. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:128`, invoke `getFieldValueFromRow_` (lexically unconditional at this line).
149. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getFieldValueFromRow_` (9_Workflow_MonthlyChange.gs:285); parameters: `row, headerMap, field`.
150. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getFieldValueFromRow_` according to its source branches; service exceptions propagate unless caught locally.
151. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:129`, invoke `isMonthlyChangeDisenrollmentEffectiveDate_` (lexically unconditional at this line).
152. ↳ ↳ ↳ ↳ ↳ ↳ Enter `isMonthlyChangeDisenrollmentEffectiveDate_` (9_Workflow_MonthlyChange.gs:242); parameters: `effectiveDate, monthParts`.
153. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:243`, invoke `isSameDate_` (branch/loop-dependent).
154. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isSameDate_` (3_Core_Helpers.gs:144); parameters: `a, b`.
155. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:145`, invoke `normalizeToDateObject_` (lexically unconditional at this line).
156. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
157. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:146`, invoke `normalizeToDateObject_` (lexically unconditional at this line).
158. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
159. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isSameDate_` according to its source branches; service exceptions propagate unless caught locally.
160. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isMonthlyChangeDisenrollmentEffectiveDate_` according to its source branches; service exceptions propagate unless caught locally.
161. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:137`, invoke `buildPrimitiveRowsHash_` (lexically unconditional at this line).
162. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildPrimitiveRowsHash_` (9_Workflow_MonthlyChange.gs:213); parameters: `items, headerMap, columnsToCompare`.
163. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:216`, invoke `normalizeCompareValue_` (lexically unconditional at this line).
164. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
165. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
166. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildPrimitiveRowsHash_` according to its source branches; service exceptions propagate unless caught locally.
167. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:138`, invoke `buildPrimitiveRowsHash_` (lexically unconditional at this line).
168. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildPrimitiveRowsHash_` (9_Workflow_MonthlyChange.gs:213); parameters: `items, headerMap, columnsToCompare`.
169. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:216`, invoke `normalizeCompareValue_` (lexically unconditional at this line).
170. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
171. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildPrimitiveRowsHash_` according to its source branches; service exceptions propagate unless caught locally.
172. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:141`, invoke `rowsWithDOBOnlyForSection_` (lexically unconditional at this line).
173. ↳ ↳ ↳ ↳ ↳ ↳ Enter `rowsWithDOBOnlyForSection_` (9_Workflow_MonthlyChange.gs:207); parameters: `items, headerMap`.
174. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:208`, invoke `getDOBIndex_` (lexically unconditional at this line).
175. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDOBIndex_` (3_Core_Helpers.gs:213); parameters: `headerMap`.
176. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:214`, invoke `findHeaderIndex_` (lexically unconditional at this line).
177. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
178. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDOBIndex_` according to its source branches; service exceptions propagate unless caught locally.
179. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:210`, invoke `normalizeCompareValue_` (branch/loop-dependent).
180. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
181. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
182. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `rowsWithDOBOnlyForSection_` according to its source branches; service exceptions propagate unless caught locally.
183. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:142`, invoke `rowsWithDOBOnlyForSection_` (lexically unconditional at this line).
184. ↳ ↳ ↳ ↳ ↳ ↳ Enter `rowsWithDOBOnlyForSection_` (9_Workflow_MonthlyChange.gs:207); parameters: `items, headerMap`.
185. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:208`, invoke `getDOBIndex_` (lexically unconditional at this line).
186. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
187. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:210`, invoke `normalizeCompareValue_` (branch/loop-dependent).
188. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
189. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `rowsWithDOBOnlyForSection_` according to its source branches; service exceptions propagate unless caught locally.
190. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:144`, invoke `getChangedColumnsForSectionRows_` (lexically unconditional at this line).
191. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getChangedColumnsForSectionRows_` (9_Workflow_MonthlyChange.gs:219); parameters: `currentItems, previousItems, currentHeaders, previousHeaders, columnsToCompare, currentHeaderMap, previousHeaderMap`.
192. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:222`, invoke `buildColumnSignaturesForSection_` (lexically unconditional at this line).
193. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildColumnSignaturesForSection_` (9_Workflow_MonthlyChange.gs:232); parameters: `items, headerMap, columnsToCompare`.
194. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:237`, invoke `normalizeCompareValue_` (branch/loop-dependent).
195. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
196. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
197. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildColumnSignaturesForSection_` according to its source branches; service exceptions propagate unless caught locally.
198. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:223`, invoke `buildColumnSignaturesForSection_` (lexically unconditional at this line).
199. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildColumnSignaturesForSection_` (9_Workflow_MonthlyChange.gs:232); parameters: `items, headerMap, columnsToCompare`.
200. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:237`, invoke `normalizeCompareValue_` (branch/loop-dependent).
201. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
202. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildColumnSignaturesForSection_` according to its source branches; service exceptions propagate unless caught locally.
203. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getChangedColumnsForSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
204. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:147`, invoke `getChangedColumnsForSectionRows_` (lexically unconditional at this line).
205. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getChangedColumnsForSectionRows_` (9_Workflow_MonthlyChange.gs:219); parameters: `currentItems, previousItems, currentHeaders, previousHeaders, columnsToCompare, currentHeaderMap, previousHeaderMap`.
206. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:222`, invoke `buildColumnSignaturesForSection_` (lexically unconditional at this line).
207. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
208. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:223`, invoke `buildColumnSignaturesForSection_` (lexically unconditional at this line).
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
210. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getChangedColumnsForSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
211. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:150`, invoke `getChangedColumnsForSectionRows_` (lexically unconditional at this line).
212. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getChangedColumnsForSectionRows_` (9_Workflow_MonthlyChange.gs:219); parameters: `currentItems, previousItems, currentHeaders, previousHeaders, columnsToCompare, currentHeaderMap, previousHeaderMap`.
213. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:222`, invoke `buildColumnSignaturesForSection_` (lexically unconditional at this line).
214. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
215. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:223`, invoke `buildColumnSignaturesForSection_` (lexically unconditional at this line).
216. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
217. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getChangedColumnsForSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
218. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:153`, invoke `getChangedColumnsForSectionRows_` (lexically unconditional at this line).
219. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getChangedColumnsForSectionRows_` (9_Workflow_MonthlyChange.gs:219); parameters: `currentItems, previousItems, currentHeaders, previousHeaders, columnsToCompare, currentHeaderMap, previousHeaderMap`.
220. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:222`, invoke `buildColumnSignaturesForSection_` (lexically unconditional at this line).
221. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
222. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:223`, invoke `buildColumnSignaturesForSection_` (lexically unconditional at this line).
223. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
224. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getChangedColumnsForSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
225. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:156`, invoke `getChangedColumnsForSectionRows_` (lexically unconditional at this line).
226. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getChangedColumnsForSectionRows_` (9_Workflow_MonthlyChange.gs:219); parameters: `currentItems, previousItems, currentHeaders, previousHeaders, columnsToCompare, currentHeaderMap, previousHeaderMap`.
227. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:222`, invoke `buildColumnSignaturesForSection_` (lexically unconditional at this line).
228. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
229. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:223`, invoke `buildColumnSignaturesForSection_` (lexically unconditional at this line).
230. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
231. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getChangedColumnsForSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
232. ↳ ↳ ↳ ↳ Return/terminate `compareRawDataForMonthlyChange_` according to its source branches; service exceptions propagate unless caught locally.
233. ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:38`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
234. ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
235. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
236. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
237. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
238. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
239. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
240. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
241. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
242. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
243. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
244. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
245. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
246. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
247. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
248. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
249. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
250. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
251. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
252. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
253. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
254. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
255. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
256. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
257. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
258. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
262. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
263. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
264. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
268. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
269. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
270. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
271. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
272. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
273. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
274. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
275. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
276. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
277. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
278. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
279. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
280. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
281. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
282. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
283. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
284. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
285. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
286. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
287. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
288. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
289. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
290. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
291. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
292. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
293. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
294. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
295. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
296. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
297. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
298. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
299. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
300. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
301. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
302. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
303. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
304. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
305. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
306. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
307. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
308. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
309. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
310. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
311. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
312. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
313. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
314. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
315. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
316. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
317. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
318. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
319. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
320. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
321. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
322. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
323. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
324. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
325. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
326. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
327. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
328. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
329. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
330. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
331. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
332. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
333. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
334. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
335. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
336. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
337. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
338. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
339. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
340. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
341. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
342. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
343. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
344. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
345. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
346. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
347. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
348. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
349. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
350. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
351. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
352. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
353. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
354. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
355. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
356. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
357. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
358. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
359. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
360. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
361. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
362. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
363. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
364. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
365. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
366. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
367. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
368. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
369. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
370. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
371. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
372. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
373. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
374. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
375. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
376. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
377. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
378. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
379. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
380. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
381. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
382. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
383. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
384. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
385. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
386. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
387. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
388. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
389. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
390. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
391. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
392. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
393. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
394. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
395. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
396. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
397. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
398. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
399. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
400. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
401. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
402. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
403. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
404. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
405. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
406. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
407. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
408. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
409. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
410. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
411. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
412. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
413. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
414. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
415. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
416. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
417. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
418. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
419. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
420. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
421. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
422. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
423. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
424. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
425. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
426. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
427. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
428. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
429. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
430. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
431. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
432. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
433. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
434. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
435. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
436. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
437. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
438. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
439. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
440. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
441. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
442. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
443. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
444. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
445. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
446. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
447. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
448. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
449. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
450. ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
451. ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:39`, invoke `getSheetDefinitionByType_` (lexically unconditional at this line).
452. ↳ ↳ ↳ ↳ Enter `getSheetDefinitionByType_` (2_Dashboard_Loaders.gs:334); parameters: `dashboard, sheetType`.
453. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:335`, invoke `getSheetDefinitionByTypeOrNull_` (lexically unconditional at this line).
454. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSheetDefinitionByTypeOrNull_` (2_Dashboard_Loaders.gs:327); parameters: `dashboard, sheetType`.
455. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:328`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
456. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
457. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
458. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
459. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
460. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:330`, invoke `normalizeDashboardSheetTypeKey_` (branch/loop-dependent).
461. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
462. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
463. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
464. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
465. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSheetDefinitionByTypeOrNull_` according to its source branches; service exceptions propagate unless caught locally.
466. ↳ ↳ ↳ ↳ Return/terminate `getSheetDefinitionByType_` according to its source branches; service exceptions propagate unless caught locally.
467. ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:48`, invoke `buildMonthlyChangeReportSectionLayout_` (lexically unconditional at this line).
468. ↳ ↳ ↳ ↳ Enter `buildMonthlyChangeReportSectionLayout_` (9_Workflow_MonthlyChange.gs:499); parameters: `reportSheet, sourceSheet, headers, monthParts`.
469. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:500`, invoke `getMonthlyChangeReportHeaders_` (lexically unconditional at this line).
470. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getMonthlyChangeReportHeaders_` (9_Workflow_MonthlyChange.gs:485); parameters: `sourceHeaders`.
471. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getMonthlyChangeReportHeaders_` according to its source branches; service exceptions propagate unless caught locally.
472. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:513`, invoke `padRowToWidth_` (lexically unconditional at this line).
473. ↳ ↳ ↳ ↳ ↳ ↳ Enter `padRowToWidth_` (3_Core_Helpers.gs:83); parameters: `rowValues, width`.
474. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `padRowToWidth_` according to its source branches; service exceptions propagate unless caught locally.
475. ↳ ↳ ↳ ↳ Return/terminate `buildMonthlyChangeReportSectionLayout_` according to its source branches; service exceptions propagate unless caught locally.
476. ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:49`, invoke `populateMonthlyChangeReportSections_` (lexically unconditional at this line).
477. ↳ ↳ ↳ ↳ Enter `populateMonthlyChangeReportSections_` (9_Workflow_MonthlyChange.gs:408); parameters: `reportSheet, sectionData, monthParts`.
478. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:410`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
479. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
480. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
481. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
482. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
483. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
484. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
485. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
486. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
487. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
488. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
489. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
490. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
491. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
492. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
493. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
494. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
495. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
496. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
497. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
498. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
499. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:412`, invoke `getSheetDefinitionByType_` (lexically unconditional at this line).
500. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSheetDefinitionByType_` (2_Dashboard_Loaders.gs:334); parameters: `dashboard, sheetType`.
501. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:335`, invoke `getSheetDefinitionByTypeOrNull_` (lexically unconditional at this line).
502. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
503. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSheetDefinitionByType_` according to its source branches; service exceptions propagate unless caught locally.
504. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:414`, invoke `getMonthlyChangeReportHeaders_` (lexically unconditional at this line).
505. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getMonthlyChangeReportHeaders_` (9_Workflow_MonthlyChange.gs:485); parameters: `sourceHeaders`.
506. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getMonthlyChangeReportHeaders_` according to its source branches; service exceptions propagate unless caught locally.
507. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:416`, invoke `getThemeColorsFromBase_` (lexically unconditional at this line).
508. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getThemeColorsFromBase_` (2_Dashboard_Loaders.gs:401); parameters: `baseHex, globals`.
509. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:403`, invoke `getRuntimeCache_` (lexically unconditional at this line).
510. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
511. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
512. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:404`, invoke `normalizeHex_` (lexically unconditional at this line).
513. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
514. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
515. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:408`, invoke `hexToHsl_` (lexically unconditional at this line).
516. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hexToHsl_` (2_Dashboard_Loaders.gs:511); parameters: `hex`.
517. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hexToHsl_` according to its source branches; service exceptions propagate unless caught locally.
518. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:409`, invoke `numberOrDefault_` (lexically unconditional at this line).
519. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
520. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
521. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:410`, invoke `numberOrDefault_` (lexically unconditional at this line).
522. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
523. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
524. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:411`, invoke `numberOrDefault_` (lexically unconditional at this line).
525. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
526. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
527. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:412`, invoke `numberOrDefault_` (lexically unconditional at this line).
528. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
529. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
530. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:413`, invoke `numberOrDefault_` (lexically unconditional at this line).
531. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
532. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
533. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:417`, invoke `hslToHex_` (lexically unconditional at this line).
534. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
535. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
536. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:418`, invoke `hslToHex_` (lexically unconditional at this line).
537. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
538. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
539. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:419`, invoke `hslToHex_` (lexically unconditional at this line).
540. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
541. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
542. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:420`, invoke `hslToHex_` (lexically unconditional at this line).
543. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
544. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
545. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:421`, invoke `hslToHex_` (lexically unconditional at this line).
546. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
547. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
548. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getThemeColorsFromBase_` according to its source branches; service exceptions propagate unless caught locally.
549. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:420`, invoke `getMonthlyChangeSectionSpecs_` (lexically unconditional at this line).
550. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getMonthlyChangeSectionSpecs_` (9_Workflow_MonthlyChange.gs:313); parameters: `sectionData`.
551. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getMonthlyChangeSectionSpecs_` according to its source branches; service exceptions propagate unless caught locally.
552. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:421`, invoke `buildMonthlyChangeSectionRows_` (lexically unconditional at this line).
553. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildMonthlyChangeSectionRows_` (9_Workflow_MonthlyChange.gs:325); parameters: `currentData, previousData, pmrSet, sectionTitle, rowMode, changedColumnsByPMR, monthParts`.
554. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:328`, invoke `getMonthlyChangeReportHeaders_` (lexically unconditional at this line).
555. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getMonthlyChangeReportHeaders_` (9_Workflow_MonthlyChange.gs:485); parameters: `sourceHeaders`.
556. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getMonthlyChangeReportHeaders_` according to its source branches; service exceptions propagate unless caught locally.
557. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:329`, invoke `getDOBIndex_` (lexically unconditional at this line).
558. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDOBIndex_` (3_Core_Helpers.gs:213); parameters: `headerMap`.
559. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:214`, invoke `findHeaderIndex_` (lexically unconditional at this line).
560. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
561. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDOBIndex_` according to its source branches; service exceptions propagate unless caught locally.
562. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:330`, invoke `findHeaderIndex_` (lexically unconditional at this line).
563. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `findHeaderIndex_` (3_Core_Helpers.gs:202); parameters: `headerMap, possibleNames`.
564. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `findHeaderIndex_` according to its source branches; service exceptions propagate unless caught locally.
565. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:331`, invoke `findHeaderIndex_` (lexically unconditional at this line).
566. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `findHeaderIndex_` (3_Core_Helpers.gs:202); parameters: `headerMap, possibleNames`.
567. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `findHeaderIndex_` according to its source branches; service exceptions propagate unless caught locally.
568. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:331`, invoke `buildHeaderIndexMap_` (lexically unconditional at this line).
569. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildHeaderIndexMap_` (3_Core_Helpers.gs:193); parameters: `headers`.
570. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildHeaderIndexMap_` according to its source branches; service exceptions propagate unless caught locally.
571. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:340`, invoke `normalizeCompareValue_` (branch/loop-dependent).
572. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeCompareValue_` (3_Core_Helpers.gs:35); parameters: `value`.
573. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeCompareValue_` according to its source branches; service exceptions propagate unless caught locally.
574. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:344`, invoke `isMonthlyChangeDisenrollmentEffectiveDate_` (branch/loop-dependent).
575. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isMonthlyChangeDisenrollmentEffectiveDate_` (9_Workflow_MonthlyChange.gs:242); parameters: `effectiveDate, monthParts`.
576. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:243`, invoke `isSameDate_` (branch/loop-dependent).
577. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
578. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isMonthlyChangeDisenrollmentEffectiveDate_` according to its source branches; service exceptions propagate unless caught locally.
579. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:351`, invoke `buildMonthlyChangeReportRow_` (lexically unconditional at this line).
580. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildMonthlyChangeReportRow_` (9_Workflow_MonthlyChange.gs:441); parameters: `sourceRow, sourceHeaders, reportHeaders, changedColumns, dateIndexes, previousItem, previousHeaderMap`.
581. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:457`, invoke `displayValueForReport_` (lexically unconditional at this line).
582. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `displayValueForReport_` (9_Workflow_MonthlyChange.gs:301); parameters: `value`.
583. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:302`, invoke `formatDateDisplay_` (branch/loop-dependent).
584. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `formatDateDisplay_` (9_Workflow_MonthlyChange.gs:306); parameters: `date`.
585. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:307`, invoke `normalizeToDateObject_` (lexically unconditional at this line).
586. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeToDateObject_` (3_Core_Helpers.gs:95); parameters: `value`.
587. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:98`, invoke `isReasonableReportDate_` (branch/loop-dependent).
588. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
589. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:105`, invoke `isReasonableReportDate_` (lexically unconditional at this line).
590. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
591. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:119`, invoke `isReasonableReportDate_` (branch/loop-dependent).
592. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
593. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:126`, invoke `isReasonableReportDate_` (branch/loop-dependent).
594. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
595. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:132`, invoke `isReasonableReportDate_` (branch/loop-dependent).
596. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
597. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeToDateObject_` according to its source branches; service exceptions propagate unless caught locally.
598. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `formatDateDisplay_` according to its source branches; service exceptions propagate unless caught locally.
599. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `displayValueForReport_` according to its source branches; service exceptions propagate unless caught locally.
600. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:469`, invoke `convertMonthlyChangeReportDateValues_` (lexically unconditional at this line).
601. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `convertMonthlyChangeReportDateValues_` (9_Workflow_MonthlyChange.gs:472); parameters: `rowValues, reportHeaders, dateIndexes`.
602. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:474`, invoke `getMonthlyChangeReportDateIndexes_` (branch/loop-dependent).
603. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getMonthlyChangeReportDateIndexes_` (9_Workflow_MonthlyChange.gs:491); parameters: `headers`.
604. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:494`, invoke `isDateLikeHeader_` (branch/loop-dependent).
605. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isDateLikeHeader_` (3_Core_Helpers.gs:150); parameters: `header`.
606. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:151`, invoke `normalizeHeader_` (lexically unconditional at this line).
607. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
608. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
609. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isDateLikeHeader_` according to its source branches; service exceptions propagate unless caught locally.
610. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getMonthlyChangeReportDateIndexes_` according to its source branches; service exceptions propagate unless caught locally.
611. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:479`, invoke `normalizeToDateObject_` (lexically unconditional at this line).
612. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeToDateObject_` (3_Core_Helpers.gs:95); parameters: `value`.
613. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:98`, invoke `isReasonableReportDate_` (branch/loop-dependent).
614. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
615. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:105`, invoke `isReasonableReportDate_` (lexically unconditional at this line).
616. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
617. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:119`, invoke `isReasonableReportDate_` (branch/loop-dependent).
618. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
619. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:126`, invoke `isReasonableReportDate_` (branch/loop-dependent).
620. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
621. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:132`, invoke `isReasonableReportDate_` (branch/loop-dependent).
622. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
623. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeToDateObject_` according to its source branches; service exceptions propagate unless caught locally.
624. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `convertMonthlyChangeReportDateValues_` according to its source branches; service exceptions propagate unless caught locally.
625. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildMonthlyChangeReportRow_` according to its source branches; service exceptions propagate unless caught locally.
626. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildMonthlyChangeSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
627. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:423`, invoke `appendMonthlyChangeSectionBlock_` (lexically unconditional at this line).
628. ↳ ↳ ↳ ↳ ↳ ↳ Enter `appendMonthlyChangeSectionBlock_` (9_Workflow_MonthlyChange.gs:375); parameters: `matrix, spec, dataRows, reportHeaders, theme, lastCol, globals`.
629. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:380`, invoke `appendMonthlyChangeCompiledRow_` (lexically unconditional at this line).
630. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `appendMonthlyChangeCompiledRow_` (9_Workflow_MonthlyChange.gs:368); parameters: `matrix, rowValues, backgroundColor, fontWeight, fontSize, lastCol`.
631. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:369`, invoke `padRowToWidth_` (lexically unconditional at this line).
632. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `padRowToWidth_` (3_Core_Helpers.gs:83); parameters: `rowValues, width`.
633. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `padRowToWidth_` according to its source branches; service exceptions propagate unless caught locally.
634. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `appendMonthlyChangeCompiledRow_` according to its source branches; service exceptions propagate unless caught locally.
635. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:385`, invoke `appendMonthlyChangeCompiledRow_` (lexically unconditional at this line).
636. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `appendMonthlyChangeCompiledRow_` (9_Workflow_MonthlyChange.gs:368); parameters: `matrix, rowValues, backgroundColor, fontWeight, fontSize, lastCol`.
637. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:369`, invoke `padRowToWidth_` (lexically unconditional at this line).
638. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
639. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `appendMonthlyChangeCompiledRow_` according to its source branches; service exceptions propagate unless caught locally.
640. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:386`, invoke `appendMonthlyChangeCompiledRow_` (lexically unconditional at this line).
641. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `appendMonthlyChangeCompiledRow_` (9_Workflow_MonthlyChange.gs:368); parameters: `matrix, rowValues, backgroundColor, fontWeight, fontSize, lastCol`.
642. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:369`, invoke `padRowToWidth_` (lexically unconditional at this line).
643. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
644. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `appendMonthlyChangeCompiledRow_` according to its source branches; service exceptions propagate unless caught locally.
645. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:387`, invoke `appendMonthlyChangeCompiledRow_` (lexically unconditional at this line).
646. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `appendMonthlyChangeCompiledRow_` (9_Workflow_MonthlyChange.gs:368); parameters: `matrix, rowValues, backgroundColor, fontWeight, fontSize, lastCol`.
647. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:369`, invoke `padRowToWidth_` (lexically unconditional at this line).
648. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
649. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `appendMonthlyChangeCompiledRow_` according to its source branches; service exceptions propagate unless caught locally.
650. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:388`, invoke `appendMonthlyChangeCompiledRow_` (lexically unconditional at this line).
651. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `appendMonthlyChangeCompiledRow_` (9_Workflow_MonthlyChange.gs:368); parameters: `matrix, rowValues, backgroundColor, fontWeight, fontSize, lastCol`.
652. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:369`, invoke `padRowToWidth_` (lexically unconditional at this line).
653. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
654. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `appendMonthlyChangeCompiledRow_` according to its source branches; service exceptions propagate unless caught locally.
655. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:392`, invoke `padRowToWidth_` (lexically unconditional at this line).
656. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `padRowToWidth_` (3_Core_Helpers.gs:83); parameters: `rowValues, width`.
657. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `padRowToWidth_` according to its source branches; service exceptions propagate unless caught locally.
658. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:405`, invoke `appendMonthlyChangeCompiledRow_` (lexically unconditional at this line).
659. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `appendMonthlyChangeCompiledRow_` (9_Workflow_MonthlyChange.gs:368); parameters: `matrix, rowValues, backgroundColor, fontWeight, fontSize, lastCol`.
660. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:369`, invoke `padRowToWidth_` (lexically unconditional at this line).
661. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
662. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `appendMonthlyChangeCompiledRow_` according to its source branches; service exceptions propagate unless caught locally.
663. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `appendMonthlyChangeSectionBlock_` according to its source branches; service exceptions propagate unless caught locally.
664. ↳ ↳ ↳ ↳ Return/terminate `populateMonthlyChangeReportSections_` according to its source branches; service exceptions propagate unless caught locally.
665. ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:50`, invoke `formatMonthlyChangeReportSectionSheet_` (lexically unconditional at this line).
666. ↳ ↳ ↳ ↳ Enter `formatMonthlyChangeReportSectionSheet_` (9_Workflow_MonthlyChange.gs:520); parameters: `reportSheet, sourceHeaders`.
667. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:522`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
668. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
669. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
670. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
671. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
672. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
673. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
674. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
675. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
676. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
677. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
678. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
679. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
680. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
681. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
682. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
683. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
684. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
685. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
686. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
687. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
688. ↳ ↳ ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:523`, invoke `getMonthlyChangeReportHeaders_` (lexically unconditional at this line).
689. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getMonthlyChangeReportHeaders_` (9_Workflow_MonthlyChange.gs:485); parameters: `sourceHeaders`.
690. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getMonthlyChangeReportHeaders_` according to its source branches; service exceptions propagate unless caught locally.
691. ↳ ↳ ↳ ↳ Return/terminate `formatMonthlyChangeReportSectionSheet_` according to its source branches; service exceptions propagate unless caught locally.
692. ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:54`, invoke `markRuntimeStep_` (lexically unconditional at this line).
693. ↳ ↳ ↳ ↳ Enter `markRuntimeStep_` (3_Core_Helpers.gs:279); parameters: `timing, label, details`.
694. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:280`, invoke `markFrameworkStep_` (lexically unconditional at this line).
695. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
696. ↳ ↳ ↳ ↳ Return/terminate `markRuntimeStep_` according to its source branches; service exceptions propagate unless caught locally.
697. ↳ ↳ ↳ At `9_Workflow_MonthlyChange.gs:56`, invoke `updateIndexSheet` (lexically unconditional at this line).
698. ↳ ↳ ↳ ↳ Enter `updateIndexSheet` (4_System_Index.gs:225); parameters: `options`.
699. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:243`, invoke `hasIndexSheetShell_` (branch/loop-dependent).
700. ↳ ↳ ↳ ↳ ↳ ↳ Enter `hasIndexSheetShell_` (4_System_Index.gs:54); parameters: `sheet`.
701. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hasIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
702. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:244`, invoke `buildIndexSheetShell_` (lexically unconditional at this line).
703. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexSheetShell_` (4_System_Index.gs:65); parameters: `sheet`.
704. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:66`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
705. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
706. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
707. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
708. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
709. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
710. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
711. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
712. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
713. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
714. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
715. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
716. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
717. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
718. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
719. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
720. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
721. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
722. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
723. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
724. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
725. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:67`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
726. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
727. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
728. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:68`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
729. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
730. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
731. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDocumentPropertiesCached_` (1_Config.gs:170); parameters: `none`.
732. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:171`, invoke `getRuntimeCache_` (lexically unconditional at this line).
733. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
734. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
735. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDocumentPropertiesCached_` according to its source branches; service exceptions propagate unless caught locally.
736. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
737. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
738. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:247`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
739. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
740. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
741. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:250`, invoke `updateIndexLocalWorkspace_` (branch/loop-dependent).
742. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexLocalWorkspace_` (4_System_Index.gs:111); parameters: `sheet, theme`.
743. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:117`, invoke `localSheetRow_` (lexically unconditional at this line).
744. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
745. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
746. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:130`, invoke `getTabOrganizationProfilesForSort_` (lexically unconditional at this line).
747. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getTabOrganizationProfilesForSort_` (2_Dashboard_Loaders.gs:268); parameters: `none`.
748. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:269`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
749. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
750. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
751. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
752. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
753. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
754. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
755. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
756. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
757. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
758. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
759. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
760. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
761. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
762. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
763. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
764. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
765. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
766. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
767. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
768. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
769. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getTabOrganizationProfilesForSort_` according to its source branches; service exceptions propagate unless caught locally.
770. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:157`, invoke `localSheetRow_` (lexically unconditional at this line).
771. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
772. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
773. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexLocalWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
774. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:251`, invoke `updateIndexArchiveWorkspace_` (branch/loop-dependent).
775. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexArchiveWorkspace_` (4_System_Index.gs:185); parameters: `sheet, theme, preOpenedArchiveSs`.
776. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:187`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
777. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
778. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
779. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
780. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
781. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:201`, invoke `buildIndexRestoreHyperlinkFormula_` (lexically unconditional at this line).
782. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexRestoreHyperlinkFormula_` (4_System_Index.gs:356); parameters: `targetSheetName, actionType`.
783. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:357`, invoke `getIndexRestoreWebAppUrl_` (lexically unconditional at this line).
784. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getIndexRestoreWebAppUrl_` (4_System_Index.gs:364); parameters: `none`.
785. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getIndexRestoreWebAppUrl_` according to its source branches; service exceptions propagate unless caught locally.
786. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexRestoreHyperlinkFormula_` according to its source branches; service exceptions propagate unless caught locally.
787. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexArchiveWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
788. ↳ ↳ ↳ ↳ Return/terminate `updateIndexSheet` according to its source branches; service exceptions propagate unless caught locally.
789. ↳ ↳ Return/terminate `buildMonthlyChangeReportForMonth_` according to its source branches; service exceptions propagate unless caught locally.
790. Return/terminate `buildMonthlyChangeReport` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-MENU-029 — Master List › 🛠️ Maintenance/Rebuild › 📊 Data Processing › 💡 Create Master List

1. Enter `createMasterList` (8_Workflow_MasterList.gs:120); parameters: `none`.
2. ↳ At `8_Workflow_MasterList.gs:123`, invoke `createMasterListForMonth_` (lexically unconditional at this line).
3. ↳ ↳ Enter `createMasterListForMonth_` (8_Workflow_MasterList.gs:11); parameters: `monthParts, parentTiming, preflight`.
4. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:14`, invoke `startFrameworkTiming_` (branch/loop-dependent).
5. ↳ ↳ ↳ ↳ Enter `startFrameworkTiming_` (3_Core_Helpers.gs:256); parameters: `processName, monthParts`.
6. ↳ ↳ ↳ ↳ Return/terminate `startFrameworkTiming_` according to its source branches; service exceptions propagate unless caught locally.
7. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:16`, invoke `markFrameworkStep_` (branch/loop-dependent).
8. ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
9. ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
10. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:17`, invoke `markRuntimeStep_` (lexically unconditional at this line).
11. ↳ ↳ ↳ ↳ Enter `markRuntimeStep_` (3_Core_Helpers.gs:279); parameters: `timing, label, details`.
12. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:280`, invoke `markFrameworkStep_` (lexically unconditional at this line).
13. ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
14. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
15. ↳ ↳ ↳ ↳ Return/terminate `markRuntimeStep_` according to its source branches; service exceptions propagate unless caught locally.
16. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:29`, invoke `writeRuntimeTimingReport_` (branch/loop-dependent).
17. ↳ ↳ ↳ ↳ Enter `writeRuntimeTimingReport_` (3_Core_Helpers.gs:300); parameters: `timing`.
18. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:301`, invoke `writeFrameworkTimingReport_` (lexically unconditional at this line).
19. ↳ ↳ ↳ ↳ ↳ ↳ Enter `writeFrameworkTimingReport_` (3_Core_Helpers.gs:283); parameters: `timing`.
20. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:290`, invoke `padRowToWidth_` (lexically unconditional at this line).
21. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `padRowToWidth_` (3_Core_Helpers.gs:83); parameters: `rowValues, width`.
22. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `padRowToWidth_` according to its source branches; service exceptions propagate unless caught locally.
23. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `writeFrameworkTimingReport_` according to its source branches; service exceptions propagate unless caught locally.
24. ↳ ↳ ↳ ↳ Return/terminate `writeRuntimeTimingReport_` according to its source branches; service exceptions propagate unless caught locally.
25. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:44`, invoke `writeRuntimeTimingReport_` (branch/loop-dependent).
26. ↳ ↳ ↳ ↳ Enter `writeRuntimeTimingReport_` (3_Core_Helpers.gs:300); parameters: `timing`.
27. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:301`, invoke `writeFrameworkTimingReport_` (lexically unconditional at this line).
28. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
29. ↳ ↳ ↳ ↳ Return/terminate `writeRuntimeTimingReport_` according to its source branches; service exceptions propagate unless caught locally.
30. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:52`, invoke `buildStagedMasterListSheetName_` (branch/loop-dependent).
31. ↳ ↳ ↳ ↳ Enter `buildStagedMasterListSheetName_` (8_Workflow_MasterList.gs:421); parameters: `masterName`.
32. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:423`, invoke `safeSheetName_` (lexically unconditional at this line).
33. ↳ ↳ ↳ ↳ ↳ ↳ Enter `safeSheetName_` (3_Core_Helpers.gs:77); parameters: `value`.
34. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:78`, invoke `normalizeText_` (lexically unconditional at this line).
35. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
36. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
37. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `safeSheetName_` according to its source branches; service exceptions propagate unless caught locally.
38. ↳ ↳ ↳ ↳ Return/terminate `buildStagedMasterListSheetName_` according to its source branches; service exceptions propagate unless caught locally.
39. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:53`, invoke `createMasterListSheetFromTemplate_` (lexically unconditional at this line).
40. ↳ ↳ ↳ ↳ Enter `createMasterListSheetFromTemplate_` (5_System_Templates.gs:411); parameters: `ss, targetName, monthParts, timing, timingLabel`.
41. ↳ ↳ ↳ ↳ Return/terminate `createMasterListSheetFromTemplate_` according to its source branches; service exceptions propagate unless caught locally.
42. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:59`, invoke `buildMasterListHeadersBeforeDataCopy_` (lexically unconditional at this line).
43. ↳ ↳ ↳ ↳ Enter `buildMasterListHeadersBeforeDataCopy_` (8_Workflow_MasterList.gs:462); parameters: `demoSheet, masterSheet`.
44. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:466`, invoke `getHeaders_` (lexically unconditional at this line).
45. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaders_` (3_Core_Helpers.gs:173); parameters: `sheet, headerRow`.
46. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
47. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
48. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
49. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
50. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
51. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:180`, invoke `getRuntimeCache_` (lexically unconditional at this line).
52. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
54. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaders_` according to its source branches; service exceptions propagate unless caught locally.
55. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:473`, invoke `clearSheetRuntimeCachesForSheet_` (lexically unconditional at this line).
56. ↳ ↳ ↳ ↳ ↳ ↳ Enter `clearSheetRuntimeCachesForSheet_` (3_Core_Helpers.gs:246); parameters: `sheet`.
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:249`, invoke `getRuntimeCache_` (lexically unconditional at this line).
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
59. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
60. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:249`, invoke `getRuntimeCache_` (branch/loop-dependent).
61. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
62. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:250`, invoke `getRuntimeCache_` (lexically unconditional at this line).
63. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
64. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:250`, invoke `getRuntimeCache_` (branch/loop-dependent).
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:251`, invoke `getRuntimeCache_` (lexically unconditional at this line).
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
70. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `clearSheetRuntimeCachesForSheet_` according to its source branches; service exceptions propagate unless caught locally.
71. ↳ ↳ ↳ ↳ Return/terminate `buildMasterListHeadersBeforeDataCopy_` according to its source branches; service exceptions propagate unless caught locally.
72. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:62`, invoke `getHeaders_` (lexically unconditional at this line).
73. ↳ ↳ ↳ ↳ Enter `getHeaders_` (3_Core_Helpers.gs:173); parameters: `sheet, headerRow`.
74. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
75. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
76. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
77. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
78. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:180`, invoke `getRuntimeCache_` (lexically unconditional at this line).
79. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
80. ↳ ↳ ↳ ↳ Return/terminate `getHeaders_` according to its source branches; service exceptions propagate unless caught locally.
81. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:63`, invoke `getHeaderMap_` (lexically unconditional at this line).
82. ↳ ↳ ↳ ↳ Enter `getHeaderMap_` (3_Core_Helpers.gs:184); parameters: `sheet, headerRow`.
83. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:186`, invoke `getRuntimeCache_` (branch/loop-dependent).
84. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
85. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
86. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:186`, invoke `getRuntimeCache_` (branch/loop-dependent).
87. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
88. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:188`, invoke `buildHeaderIndexMap_` (lexically unconditional at this line).
89. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildHeaderIndexMap_` (3_Core_Helpers.gs:193); parameters: `headers`.
90. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildHeaderIndexMap_` according to its source branches; service exceptions propagate unless caught locally.
91. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:188`, invoke `getHeaders_` (lexically unconditional at this line).
92. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaders_` (3_Core_Helpers.gs:173); parameters: `sheet, headerRow`.
93. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
94. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
95. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
96. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
97. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:180`, invoke `getRuntimeCache_` (lexically unconditional at this line).
98. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
99. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaders_` according to its source branches; service exceptions propagate unless caught locally.
100. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:189`, invoke `getRuntimeCache_` (lexically unconditional at this line).
101. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
102. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
103. ↳ ↳ ↳ ↳ Return/terminate `getHeaderMap_` according to its source branches; service exceptions propagate unless caught locally.
104. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:64`, invoke `buildPrimaryDemoPRowsInMemory_` (lexically unconditional at this line).
105. ↳ ↳ ↳ ↳ Enter `buildPrimaryDemoPRowsInMemory_` (8_Workflow_MasterList.gs:128); parameters: `demoSheet, masterHeaders, masterHeaderMap`.
106. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:129`, invoke `getDataValues_` (lexically unconditional at this line).
107. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDataValues_` (3_Core_Helpers.gs:217); parameters: `sheet, headerRow, dataStartRow`.
108. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:221`, invoke `getSheetDimensions_` (lexically unconditional at this line).
109. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSheetDimensions_` (3_Core_Helpers.gs:233); parameters: `sheet`.
110. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:235`, invoke `getRuntimeCache_` (branch/loop-dependent).
111. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
112. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
113. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:235`, invoke `getRuntimeCache_` (branch/loop-dependent).
114. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
115. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:242`, invoke `getRuntimeCache_` (lexically unconditional at this line).
116. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
117. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
118. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSheetDimensions_` according to its source branches; service exceptions propagate unless caught locally.
119. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:222`, invoke `getHeaders_` (lexically unconditional at this line).
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaders_` (3_Core_Helpers.gs:173); parameters: `sheet, headerRow`.
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
122. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
123. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:175`, invoke `getRuntimeCache_` (branch/loop-dependent).
124. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
125. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:180`, invoke `getRuntimeCache_` (lexically unconditional at this line).
126. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
127. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaders_` according to its source branches; service exceptions propagate unless caught locally.
128. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:223`, invoke `getHeaderMap_` (lexically unconditional at this line).
129. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getHeaderMap_` (3_Core_Helpers.gs:184); parameters: `sheet, headerRow`.
130. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:186`, invoke `getRuntimeCache_` (branch/loop-dependent).
131. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
132. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:186`, invoke `getRuntimeCache_` (branch/loop-dependent).
133. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
134. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:188`, invoke `buildHeaderIndexMap_` (lexically unconditional at this line).
135. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
136. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:188`, invoke `getHeaders_` (lexically unconditional at this line).
137. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
138. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:189`, invoke `getRuntimeCache_` (lexically unconditional at this line).
139. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
140. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getHeaderMap_` according to its source branches; service exceptions propagate unless caught locally.
141. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDataValues_` according to its source branches; service exceptions propagate unless caught locally.
142. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:132`, invoke `getPMRIndex_` (lexically unconditional at this line).
143. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getPMRIndex_` (3_Core_Helpers.gs:209); parameters: `headerMap`.
144. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:210`, invoke `findHeaderIndex_` (lexically unconditional at this line).
145. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `findHeaderIndex_` (3_Core_Helpers.gs:202); parameters: `headerMap, possibleNames`.
146. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `findHeaderIndex_` according to its source branches; service exceptions propagate unless caught locally.
147. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getPMRIndex_` according to its source branches; service exceptions propagate unless caught locally.
148. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:142`, invoke `getMasterTargetIndex_` (lexically unconditional at this line).
149. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getMasterTargetIndex_` (8_Workflow_MasterList.gs:142); parameters: `header`.
150. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getMasterTargetIndex_` according to its source branches; service exceptions propagate unless caught locally.
151. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:154`, invoke `normalizePMR_` (lexically unconditional at this line).
152. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizePMR_` (3_Core_Helpers.gs:12); parameters: `value`.
153. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizePMR_` according to its source branches; service exceptions propagate unless caught locally.
154. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:161`, invoke `getMasterTargetIndex_` (lexically unconditional at this line).
155. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getMasterTargetIndex_` (8_Workflow_MasterList.gs:142); parameters: `header`.
156. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getMasterTargetIndex_` according to its source branches; service exceptions propagate unless caught locally.
157. ↳ ↳ ↳ ↳ Return/terminate `buildPrimaryDemoPRowsInMemory_` according to its source branches; service exceptions propagate unless caught locally.
158. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:75`, invoke `syncUnlockedCarePlanSourceIntoData_` (lexically unconditional at this line).
159. ↳ ↳ ↳ ↳ Enter `syncUnlockedCarePlanSourceIntoData_` (8_Workflow_MasterList.gs:206); parameters: `data, monthParts, pmrFilter`.
160. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:210`, invoke `buildSourceMapBySingleKeyForPart5_` (lexically unconditional at this line).
161. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildSourceMapBySingleKeyForPart5_` (8_Workflow_MasterList.gs:249); parameters: `sheet, headerRow, dataStartRow, keyHeader`.
162. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:250`, invoke `getDataValues_` (lexically unconditional at this line).
163. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDataValues_` (3_Core_Helpers.gs:217); parameters: `sheet, headerRow, dataStartRow`.
164. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:221`, invoke `getSheetDimensions_` (lexically unconditional at this line).
165. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
166. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:222`, invoke `getHeaders_` (lexically unconditional at this line).
167. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
168. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:223`, invoke `getHeaderMap_` (lexically unconditional at this line).
169. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
170. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDataValues_` according to its source branches; service exceptions propagate unless caught locally.
171. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:258`, invoke `normalizeSyncKey_` (lexically unconditional at this line).
172. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeSyncKey_` (8_Workflow_MasterList.gs:267); parameters: `value, header`.
173. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeSyncKey_` according to its source branches; service exceptions propagate unless caught locally.
174. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildSourceMapBySingleKeyForPart5_` according to its source branches; service exceptions propagate unless caught locally.
175. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:211`, invoke `syncRowsFromSourceMapData_` (lexically unconditional at this line).
176. ↳ ↳ ↳ ↳ ↳ ↳ Enter `syncRowsFromSourceMapData_` (8_Workflow_MasterList.gs:228); parameters: `data, sourceMap, config, pmrFilter`.
177. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:231`, invoke `normalizeSyncFieldPairs_` (lexically unconditional at this line).
178. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeSyncFieldPairs_` (8_Workflow_MasterList.gs:285); parameters: `fields`.
179. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeSyncFieldPairs_` according to its source branches; service exceptions propagate unless caught locally.
180. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:236`, invoke `normalizeSyncKey_` (lexically unconditional at this line).
181. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeSyncKey_` (8_Workflow_MasterList.gs:267); parameters: `value, header`.
182. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeSyncKey_` according to its source branches; service exceptions propagate unless caught locally.
183. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `syncRowsFromSourceMapData_` according to its source branches; service exceptions propagate unless caught locally.
184. ↳ ↳ ↳ ↳ Return/terminate `syncUnlockedCarePlanSourceIntoData_` according to its source branches; service exceptions propagate unless caught locally.
185. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:78`, invoke `syncCarePlanDueSourceIntoData_` (lexically unconditional at this line).
186. ↳ ↳ ↳ ↳ Enter `syncCarePlanDueSourceIntoData_` (8_Workflow_MasterList.gs:217); parameters: `data, monthParts, pmrFilter`.
187. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:221`, invoke `buildSourceMapBySingleKeyForPart5_` (lexically unconditional at this line).
188. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildSourceMapBySingleKeyForPart5_` (8_Workflow_MasterList.gs:249); parameters: `sheet, headerRow, dataStartRow, keyHeader`.
189. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:250`, invoke `getDataValues_` (lexically unconditional at this line).
190. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
191. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:258`, invoke `normalizeSyncKey_` (lexically unconditional at this line).
192. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
193. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildSourceMapBySingleKeyForPart5_` according to its source branches; service exceptions propagate unless caught locally.
194. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:222`, invoke `syncRowsFromSourceMapData_` (lexically unconditional at this line).
195. ↳ ↳ ↳ ↳ ↳ ↳ Enter `syncRowsFromSourceMapData_` (8_Workflow_MasterList.gs:228); parameters: `data, sourceMap, config, pmrFilter`.
196. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:231`, invoke `normalizeSyncFieldPairs_` (lexically unconditional at this line).
197. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
198. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:236`, invoke `normalizeSyncKey_` (lexically unconditional at this line).
199. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
200. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `syncRowsFromSourceMapData_` according to its source branches; service exceptions propagate unless caught locally.
201. ↳ ↳ ↳ ↳ Return/terminate `syncCarePlanDueSourceIntoData_` according to its source branches; service exceptions propagate unless caught locally.
202. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:89`, invoke `promoteStagedMasterListSheet_` (lexically unconditional at this line).
203. ↳ ↳ ↳ ↳ Enter `promoteStagedMasterListSheet_` (8_Workflow_MasterList.gs:437); parameters: `ss, stagedSheet, existingSheet, masterName, copiedRowCount, timing, markStep`.
204. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:438`, invoke `validateStagedMasterListBeforeSwap_` (lexically unconditional at this line).
205. ↳ ↳ ↳ ↳ ↳ ↳ Enter `validateStagedMasterListBeforeSwap_` (8_Workflow_MasterList.gs:431); parameters: `sheet, masterName, copiedRowCount`.
206. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:432`, invoke `isStagedMasterListSheet_` (branch/loop-dependent).
207. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isStagedMasterListSheet_` (8_Workflow_MasterList.gs:426); parameters: `sheet, masterName`.
208. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isStagedMasterListSheet_` according to its source branches; service exceptions propagate unless caught locally.
209. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `validateStagedMasterListBeforeSwap_` according to its source branches; service exceptions propagate unless caught locally.
210. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:445`, invoke `clearSheetRuntimeCachesForSheet_` (lexically unconditional at this line).
211. ↳ ↳ ↳ ↳ ↳ ↳ Enter `clearSheetRuntimeCachesForSheet_` (3_Core_Helpers.gs:246); parameters: `sheet`.
212. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:249`, invoke `getRuntimeCache_` (lexically unconditional at this line).
213. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
214. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:249`, invoke `getRuntimeCache_` (branch/loop-dependent).
215. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
216. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:250`, invoke `getRuntimeCache_` (lexically unconditional at this line).
217. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
218. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:250`, invoke `getRuntimeCache_` (branch/loop-dependent).
219. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
220. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:251`, invoke `getRuntimeCache_` (lexically unconditional at this line).
221. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
222. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `clearSheetRuntimeCachesForSheet_` according to its source branches; service exceptions propagate unless caught locally.
223. ↳ ↳ ↳ ↳ Return/terminate `promoteStagedMasterListSheet_` according to its source branches; service exceptions propagate unless caught locally.
224. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:100`, invoke `writeRuntimeTimingReport_` (lexically unconditional at this line).
225. ↳ ↳ ↳ ↳ Enter `writeRuntimeTimingReport_` (3_Core_Helpers.gs:300); parameters: `timing`.
226. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:301`, invoke `writeFrameworkTimingReport_` (lexically unconditional at this line).
227. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
228. ↳ ↳ ↳ ↳ Return/terminate `writeRuntimeTimingReport_` according to its source branches; service exceptions propagate unless caught locally.
229. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:101`, invoke `formatSeconds_` (lexically unconditional at this line).
230. ↳ ↳ ↳ ↳ Enter `formatSeconds_` (3_Core_Helpers.gs:309); parameters: `seconds`.
231. ↳ ↳ ↳ ↳ Return/terminate `formatSeconds_` according to its source branches; service exceptions propagate unless caught locally.
232. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:107`, invoke `cleanupFailedStagedMasterListSheet_` (lexically unconditional at this line).
233. ↳ ↳ ↳ ↳ Enter `cleanupFailedStagedMasterListSheet_` (8_Workflow_MasterList.gs:452); parameters: `ss, sheet, masterName, timing, markStep`.
234. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:453`, invoke `isStagedMasterListSheet_` (branch/loop-dependent).
235. ↳ ↳ ↳ ↳ ↳ ↳ Enter `isStagedMasterListSheet_` (8_Workflow_MasterList.gs:426); parameters: `sheet, masterName`.
236. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isStagedMasterListSheet_` according to its source branches; service exceptions propagate unless caught locally.
237. ↳ ↳ ↳ ↳ ↳ At `8_Workflow_MasterList.gs:458`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
238. ↳ ↳ ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
239. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
240. ↳ ↳ ↳ ↳ Return/terminate `cleanupFailedStagedMasterListSheet_` according to its source branches; service exceptions propagate unless caught locally.
241. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:109`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
242. ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
243. ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
244. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:111`, invoke `markFrameworkStep_` (branch/loop-dependent).
245. ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
246. ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
247. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:113`, invoke `markRuntimeStep_` (lexically unconditional at this line).
248. ↳ ↳ ↳ ↳ Enter `markRuntimeStep_` (3_Core_Helpers.gs:279); parameters: `timing, label, details`.
249. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:280`, invoke `markFrameworkStep_` (lexically unconditional at this line).
250. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
251. ↳ ↳ ↳ ↳ Return/terminate `markRuntimeStep_` according to its source branches; service exceptions propagate unless caught locally.
252. ↳ ↳ ↳ At `8_Workflow_MasterList.gs:114`, invoke `writeRuntimeTimingReport_` (lexically unconditional at this line).
253. ↳ ↳ ↳ ↳ Enter `writeRuntimeTimingReport_` (3_Core_Helpers.gs:300); parameters: `timing`.
254. ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:301`, invoke `writeFrameworkTimingReport_` (lexically unconditional at this line).
255. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
256. ↳ ↳ ↳ ↳ Return/terminate `writeRuntimeTimingReport_` according to its source branches; service exceptions propagate unless caught locally.
257. ↳ ↳ Return/terminate `createMasterListForMonth_` according to its source branches; service exceptions propagate unless caught locally.
258. Return/terminate `createMasterList` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-MENU-030 — Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › 🏗️ Rebuild System Templates

1. Registration resolves to missing `createSystemTemplates` (**FAIL**).
## TRACE-MENU-031 — Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › 🪄 Clear Diagnostics & Timing

1. Registration resolves to missing `clearDiagnosticsAndTimingLogs` (**FAIL**).
## TRACE-MENU-032 — Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › ⏱️ Framework Timing on/off

1. Registration resolves to missing `toggleFrameworkTiming` (**FAIL**).
## TRACE-MENU-033 — Master List › 🛠️ Maintenance/Rebuild › ⚙️ System › 🧭 Organize Tabs

1. Registration resolves to missing `enforceGlobalSheetSortOrder` (**FAIL**).
## TRACE-MENU-034 — Master List › 🧩 Start - up › Build System Sheets

1. Registration resolves to missing `buildSystemSheets` (**FAIL**).
## TRACE-MENU-035 — Master List › 🧩 Start - up › 📜 Set up System Sheets

1. Registration resolves to missing `setupSystemSheets` (**FAIL**).
## TRACE-MENU-036 — Master List › 🧩 Start - up › 🎨 Format Dashboard

1. Registration resolves to missing `rebuildFormatDashboardDefaults` (**FAIL**).
## TRACE-MENU-037 — Master List › 🧩 Start - up › 💾 Save Active Layout as Rebuild Default

1. Registration resolves to missing `saveActiveLayoutToDashboardSettings` (**FAIL**).
## TRACE-MENU-038 — Master List › 🧩 Start - up › 🖼️ Build All Templates + Validate

1. Enter `buildAllTemplatesAndValidate` (5_System_Templates.gs:287); parameters: `none`.
2. ↳ At `5_System_Templates.gs:289`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
3. ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
4. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
5. ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
6. ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
7. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
8. ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
9. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
10. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
11. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
12. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
13. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
14. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
15. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
16. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
17. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
18. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
19. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
20. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
21. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
22. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
23. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
24. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
25. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
26. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
27. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
28. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
29. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
30. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
31. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
32. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
33. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
34. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
35. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
36. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
37. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
38. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
39. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
40. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
41. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
42. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
43. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
44. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
45. ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
46. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
47. ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
48. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
49. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
50. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
51. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
52. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
59. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
60. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
61. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
62. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
63. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
64. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
77. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
78. ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
79. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
80. ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
81. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
82. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
83. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
84. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
85. ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
86. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
87. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
88. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
91. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
92. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
93. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
94. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
95. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
96. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
97. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
98. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
99. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
100. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
101. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
102. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
103. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
104. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
105. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
106. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
107. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
108. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
109. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
110. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
111. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
112. ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
113. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
114. ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
115. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
116. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
117. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
118. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
119. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
122. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
123. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
124. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
125. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
126. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
127. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
128. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
129. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
130. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
131. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
132. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
133. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
134. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
135. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
136. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
137. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
138. ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
139. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
140. ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
141. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
142. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
143. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
144. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
145. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
146. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
147. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
148. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
149. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
150. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
151. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
152. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
153. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
154. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
155. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
156. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
157. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
158. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
159. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
160. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
161. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
162. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
163. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
164. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
165. ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
166. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
167. ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
168. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
169. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
170. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
171. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
172. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
173. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
174. ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
175. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
176. ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
177. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
178. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
179. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
180. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
181. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
182. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
183. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
184. ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
185. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
186. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
187. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
188. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
189. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
190. ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
191. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
192. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
193. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
194. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
195. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
196. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
197. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
198. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
199. ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
200. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
201. ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
202. ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
203. ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
204. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
205. ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
206. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
207. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
208. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
210. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
211. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
212. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
213. ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
214. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
215. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
216. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
217. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
218. ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
219. ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
220. ↳ At `5_System_Templates.gs:290`, invoke `ensureGoldenMasterTemplate_` (lexically unconditional at this line).
221. ↳ ↳ Enter `ensureGoldenMasterTemplate_` (5_System_Templates.gs:48); parameters: `dashboard, timing`.
222. ↳ ↳ ↳ At `5_System_Templates.gs:69`, invoke `markFrameworkStep_` (branch/loop-dependent).
223. ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
224. ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
225. ↳ ↳ Return/terminate `ensureGoldenMasterTemplate_` according to its source branches; service exceptions propagate unless caught locally.
226. ↳ At `5_System_Templates.gs:297`, invoke `createOrRefreshTemplateFromDashboard_` (lexically unconditional at this line).
227. ↳ ↳ Enter `createOrRefreshTemplateFromDashboard_` (5_System_Templates.gs:156); parameters: `dashboard, sheetDef, timing`.
228. ↳ ↳ ↳ At `5_System_Templates.gs:162`, invoke `ensureGoldenMasterTemplate_` (branch/loop-dependent).
229. ↳ ↳ ↳ ↳ Enter `ensureGoldenMasterTemplate_` (5_System_Templates.gs:48); parameters: `dashboard, timing`.
230. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:69`, invoke `markFrameworkStep_` (branch/loop-dependent).
231. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
232. ↳ ↳ ↳ ↳ Return/terminate `ensureGoldenMasterTemplate_` according to its source branches; service exceptions propagate unless caught locally.
233. ↳ ↳ ↳ At `5_System_Templates.gs:167`, invoke `getHeadersForSheetType_` (lexically unconditional at this line).
234. ↳ ↳ ↳ ↳ Enter `getHeadersForSheetType_` (2_Dashboard_Loaders.gs:379); parameters: `dashboard, sheetType`.
235. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:380`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
236. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
237. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
238. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
239. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
240. ↳ ↳ ↳ ↳ Return/terminate `getHeadersForSheetType_` according to its source branches; service exceptions propagate unless caught locally.
241. ↳ ↳ ↳ At `5_System_Templates.gs:168`, invoke `getBehaviorForSheetType_` (lexically unconditional at this line).
242. ↳ ↳ ↳ ↳ Enter `getBehaviorForSheetType_` (2_Dashboard_Loaders.gs:358); parameters: `dashboard, sheetType`.
243. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:359`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
244. ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
245. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
246. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
247. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
248. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:361`, invoke `getDefaultBehavior_` (branch/loop-dependent).
249. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDefaultBehavior_` (2_Dashboard_Loaders.gs:368); parameters: `none`.
250. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDefaultBehavior_` according to its source branches; service exceptions propagate unless caught locally.
251. ↳ ↳ ↳ ↳ Return/terminate `getBehaviorForSheetType_` according to its source branches; service exceptions propagate unless caught locally.
252. ↳ ↳ ↳ At `5_System_Templates.gs:172`, invoke `buildTemplateFromDashboard_` (lexically unconditional at this line).
253. ↳ ↳ ↳ ↳ Enter `buildTemplateFromDashboard_` (5_System_Templates.gs:179); parameters: `sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing, templateExisted`.
254. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:180`, invoke `markFrameworkStep_` (lexically unconditional at this line).
255. ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
256. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
257. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:183`, invoke `clearTemplateForFullBuild_` (lexically unconditional at this line).
258. ↳ ↳ ↳ ↳ ↳ ↳ Enter `clearTemplateForFullBuild_` (5_System_Templates.gs:193); parameters: `sheet, sheetDef, timing, templateExisted`.
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:208`, invoke `markFrameworkStep_` (lexically unconditional at this line).
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
262. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `clearTemplateForFullBuild_` according to its source branches; service exceptions propagate unless caught locally.
263. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:185`, invoke `applyTemplateBaseFormatting_` (lexically unconditional at this line).
264. ↳ ↳ ↳ ↳ ↳ ↳ Enter `applyTemplateBaseFormatting_` (5_System_Templates.gs:211); parameters: `sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing`.
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:213`, invoke `getThemeColorsFromBase_` (lexically unconditional at this line).
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getThemeColorsFromBase_` (2_Dashboard_Loaders.gs:401); parameters: `baseHex, globals`.
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:403`, invoke `getRuntimeCache_` (lexically unconditional at this line).
268. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
269. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
270. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:404`, invoke `normalizeHex_` (lexically unconditional at this line).
271. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
272. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
273. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:408`, invoke `hexToHsl_` (lexically unconditional at this line).
274. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hexToHsl_` (2_Dashboard_Loaders.gs:511); parameters: `hex`.
275. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hexToHsl_` according to its source branches; service exceptions propagate unless caught locally.
276. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:409`, invoke `numberOrDefault_` (lexically unconditional at this line).
277. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
278. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
279. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:410`, invoke `numberOrDefault_` (lexically unconditional at this line).
280. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
281. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
282. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:411`, invoke `numberOrDefault_` (lexically unconditional at this line).
283. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
284. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
285. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:412`, invoke `numberOrDefault_` (lexically unconditional at this line).
286. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
287. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
288. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:413`, invoke `numberOrDefault_` (lexically unconditional at this line).
289. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
290. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
291. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:417`, invoke `hslToHex_` (lexically unconditional at this line).
292. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
293. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
294. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:418`, invoke `hslToHex_` (lexically unconditional at this line).
295. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
296. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
297. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:419`, invoke `hslToHex_` (lexically unconditional at this line).
298. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
299. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
300. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:420`, invoke `hslToHex_` (lexically unconditional at this line).
301. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
302. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
303. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:421`, invoke `hslToHex_` (lexically unconditional at this line).
304. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `hslToHex_` (2_Dashboard_Loaders.gs:535); parameters: `h, s, l`.
305. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hslToHex_` according to its source branches; service exceptions propagate unless caught locally.
306. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getThemeColorsFromBase_` according to its source branches; service exceptions propagate unless caught locally.
307. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:234`, invoke `ensureTemplateFilter_` (lexically unconditional at this line).
308. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `ensureTemplateFilter_` (5_System_Templates.gs:238); parameters: `sheet, headerRow, rowCount, colCount, sheetDef, timing`.
309. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:248`, invoke `markFrameworkStep_` (branch/loop-dependent).
310. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
311. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
312. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:257`, invoke `markFrameworkStep_` (branch/loop-dependent).
313. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
314. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
315. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `ensureTemplateFilter_` according to its source branches; service exceptions propagate unless caught locally.
316. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `applyTemplateBaseFormatting_` according to its source branches; service exceptions propagate unless caught locally.
317. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:186`, invoke `writeTemplateMetadata_` (lexically unconditional at this line).
318. ↳ ↳ ↳ ↳ ↳ ↳ Enter `writeTemplateMetadata_` (5_System_Templates.gs:272); parameters: `sheet, dashboard, sheetDef, colCount`.
319. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `writeTemplateMetadata_` according to its source branches; service exceptions propagate unless caught locally.
320. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:187`, invoke `applyTemplateFreezeAndTabColor_` (lexically unconditional at this line).
321. ↳ ↳ ↳ ↳ ↳ ↳ Enter `applyTemplateFreezeAndTabColor_` (5_System_Templates.gs:261); parameters: `sheet, dashboard, sheetDef, colCount, timing`.
322. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:265`, invoke `getThemeColorsFromBase_` (lexically unconditional at this line).
323. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getThemeColorsFromBase_` (2_Dashboard_Loaders.gs:401); parameters: `baseHex, globals`.
324. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:403`, invoke `getRuntimeCache_` (lexically unconditional at this line).
325. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
326. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:404`, invoke `normalizeHex_` (lexically unconditional at this line).
327. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
328. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:408`, invoke `hexToHsl_` (lexically unconditional at this line).
329. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
330. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:409`, invoke `numberOrDefault_` (lexically unconditional at this line).
331. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
332. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:410`, invoke `numberOrDefault_` (lexically unconditional at this line).
333. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
334. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:411`, invoke `numberOrDefault_` (lexically unconditional at this line).
335. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
336. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:412`, invoke `numberOrDefault_` (lexically unconditional at this line).
337. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
338. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:413`, invoke `numberOrDefault_` (lexically unconditional at this line).
339. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
340. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:417`, invoke `hslToHex_` (lexically unconditional at this line).
341. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
342. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:418`, invoke `hslToHex_` (lexically unconditional at this line).
343. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
344. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:419`, invoke `hslToHex_` (lexically unconditional at this line).
345. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
346. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:420`, invoke `hslToHex_` (lexically unconditional at this line).
347. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
348. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:421`, invoke `hslToHex_` (lexically unconditional at this line).
349. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
350. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getThemeColorsFromBase_` according to its source branches; service exceptions propagate unless caught locally.
351. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `applyTemplateFreezeAndTabColor_` according to its source branches; service exceptions propagate unless caught locally.
352. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:189`, invoke `markFrameworkStep_` (lexically unconditional at this line).
353. ↳ ↳ ↳ ↳ ↳ ↳ Enter `markFrameworkStep_` (3_Core_Helpers.gs:261); parameters: `timing, stepName, details`.
354. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `markFrameworkStep_` according to its source branches; service exceptions propagate unless caught locally.
355. ↳ ↳ ↳ ↳ Return/terminate `buildTemplateFromDashboard_` according to its source branches; service exceptions propagate unless caught locally.
356. ↳ ↳ Return/terminate `createOrRefreshTemplateFromDashboard_` according to its source branches; service exceptions propagate unless caught locally.
357. ↳ At `5_System_Templates.gs:301`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
358. ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
359. ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
360. ↳ At `5_System_Templates.gs:306`, invoke `setReportTemplateVisibility_` (lexically unconditional at this line).
361. ↳ ↳ Enter `setReportTemplateVisibility_` (5_System_Templates.gs:322); parameters: `dashboard, hidden, timing`.
362. ↳ ↳ ↳ At `5_System_Templates.gs:341`, invoke `forceBaseTemplateHidden_` (lexically unconditional at this line).
363. ↳ ↳ ↳ ↳ Enter `forceBaseTemplateHidden_` (5_System_Templates.gs:145); parameters: `none`.
364. ↳ ↳ ↳ ↳ ↳ At `5_System_Templates.gs:150`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
365. ↳ ↳ ↳ ↳ ↳ ↳ Enter `logBestEffortWarning_` (3_Core_Helpers.gs:304); parameters: `message, details`.
366. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `logBestEffortWarning_` according to its source branches; service exceptions propagate unless caught locally.
367. ↳ ↳ ↳ ↳ Return/terminate `forceBaseTemplateHidden_` according to its source branches; service exceptions propagate unless caught locally.
368. ↳ ↳ Return/terminate `setReportTemplateVisibility_` according to its source branches; service exceptions propagate unless caught locally.
369. ↳ At `5_System_Templates.gs:307`, invoke `forceBaseTemplateHidden_` (lexically unconditional at this line).
370. ↳ ↳ Enter `forceBaseTemplateHidden_` (5_System_Templates.gs:145); parameters: `none`.
371. ↳ ↳ ↳ At `5_System_Templates.gs:150`, invoke `logBestEffortWarning_` (lexically unconditional at this line).
372. ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
373. ↳ ↳ Return/terminate `forceBaseTemplateHidden_` according to its source branches; service exceptions propagate unless caught locally.
374. Return/terminate `buildAllTemplatesAndValidate` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-MENU-039 — Master List › 📇 Index › 📇 Build / Update Index

1. Enter `updateIndexSheet` (4_System_Index.gs:225); parameters: `options`.
2. ↳ At `4_System_Index.gs:243`, invoke `hasIndexSheetShell_` (branch/loop-dependent).
3. ↳ ↳ Enter `hasIndexSheetShell_` (4_System_Index.gs:54); parameters: `sheet`.
4. ↳ ↳ Return/terminate `hasIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
5. ↳ At `4_System_Index.gs:244`, invoke `buildIndexSheetShell_` (lexically unconditional at this line).
6. ↳ ↳ Enter `buildIndexSheetShell_` (4_System_Index.gs:65); parameters: `sheet`.
7. ↳ ↳ ↳ At `4_System_Index.gs:66`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
8. ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
9. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
10. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
11. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
12. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
13. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
14. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
15. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
16. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
17. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
18. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
19. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
20. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
21. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
22. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
23. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
24. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
25. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
26. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
27. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
28. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
29. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
30. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
31. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
32. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
33. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
34. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
35. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
36. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
37. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
38. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
39. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
40. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
41. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
42. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
43. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
44. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
45. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
46. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
47. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
48. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
49. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
50. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
51. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
52. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
59. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
60. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
61. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
62. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
63. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
64. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
77. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
78. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
79. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
80. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
81. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
82. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
83. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
84. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
85. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
86. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
87. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
88. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
91. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
92. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
93. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
94. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
95. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
96. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
97. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
98. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
99. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
100. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
101. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
102. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
103. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
104. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
105. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
106. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
107. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
108. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
109. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
110. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
111. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
112. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
113. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
114. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
115. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
116. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
117. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
118. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
119. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
122. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
123. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
124. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
125. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
126. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
127. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
128. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
129. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
130. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
131. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
132. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
133. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
134. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
135. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
136. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
137. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
138. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
139. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
140. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
141. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
142. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
143. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
144. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
145. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
146. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
147. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
148. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
149. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
150. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
151. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
152. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
153. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
154. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
155. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
156. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
157. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
158. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
159. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
160. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
161. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
162. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
163. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
164. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
165. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
166. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
167. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
168. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
169. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
170. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
171. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
172. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
173. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
174. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
175. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
176. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
177. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
178. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
179. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
180. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
181. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
182. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
183. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
184. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
185. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
186. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
187. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
188. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
189. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
190. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
191. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
192. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
193. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
194. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
195. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
196. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
197. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
198. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
199. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
200. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
201. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
202. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
203. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
204. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
205. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
206. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
207. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
208. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
210. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
211. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
212. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
213. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
214. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
215. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
216. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
217. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
218. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
219. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
220. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
221. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
222. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
223. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
224. ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
225. ↳ ↳ ↳ At `4_System_Index.gs:67`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
226. ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
227. ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
228. ↳ ↳ ↳ At `4_System_Index.gs:68`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
229. ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
230. ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
231. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDocumentPropertiesCached_` (1_Config.gs:170); parameters: `none`.
232. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:171`, invoke `getRuntimeCache_` (lexically unconditional at this line).
233. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
234. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
235. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDocumentPropertiesCached_` according to its source branches; service exceptions propagate unless caught locally.
236. ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
237. ↳ ↳ Return/terminate `buildIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
238. ↳ At `4_System_Index.gs:247`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
239. ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
240. ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
241. ↳ At `4_System_Index.gs:250`, invoke `updateIndexLocalWorkspace_` (branch/loop-dependent).
242. ↳ ↳ Enter `updateIndexLocalWorkspace_` (4_System_Index.gs:111); parameters: `sheet, theme`.
243. ↳ ↳ ↳ At `4_System_Index.gs:117`, invoke `localSheetRow_` (lexically unconditional at this line).
244. ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
245. ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
246. ↳ ↳ ↳ At `4_System_Index.gs:130`, invoke `getTabOrganizationProfilesForSort_` (lexically unconditional at this line).
247. ↳ ↳ ↳ ↳ Enter `getTabOrganizationProfilesForSort_` (2_Dashboard_Loaders.gs:268); parameters: `none`.
248. ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:269`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
249. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
250. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
251. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
252. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
253. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
254. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
255. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
256. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
257. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
258. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
262. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
263. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
264. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
268. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
269. ↳ ↳ ↳ ↳ Return/terminate `getTabOrganizationProfilesForSort_` according to its source branches; service exceptions propagate unless caught locally.
270. ↳ ↳ ↳ At `4_System_Index.gs:157`, invoke `localSheetRow_` (lexically unconditional at this line).
271. ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
272. ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
273. ↳ ↳ Return/terminate `updateIndexLocalWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
274. ↳ At `4_System_Index.gs:251`, invoke `updateIndexArchiveWorkspace_` (branch/loop-dependent).
275. ↳ ↳ Enter `updateIndexArchiveWorkspace_` (4_System_Index.gs:185); parameters: `sheet, theme, preOpenedArchiveSs`.
276. ↳ ↳ ↳ At `4_System_Index.gs:187`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
277. ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
278. ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
279. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
280. ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
281. ↳ ↳ ↳ At `4_System_Index.gs:201`, invoke `buildIndexRestoreHyperlinkFormula_` (lexically unconditional at this line).
282. ↳ ↳ ↳ ↳ Enter `buildIndexRestoreHyperlinkFormula_` (4_System_Index.gs:356); parameters: `targetSheetName, actionType`.
283. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:357`, invoke `getIndexRestoreWebAppUrl_` (lexically unconditional at this line).
284. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getIndexRestoreWebAppUrl_` (4_System_Index.gs:364); parameters: `none`.
285. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getIndexRestoreWebAppUrl_` according to its source branches; service exceptions propagate unless caught locally.
286. ↳ ↳ ↳ ↳ Return/terminate `buildIndexRestoreHyperlinkFormula_` according to its source branches; service exceptions propagate unless caught locally.
287. ↳ ↳ Return/terminate `updateIndexArchiveWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
288. Return/terminate `updateIndexSheet` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-MENU-040 — Master List › 📇 Index › ↩️ Restore Selected Archive Row

1. Enter `restoreSheetFromActiveIndexRow` (4_System_Index.gs:280); parameters: `optionalTargetSheetName`.
2. ↳ At `4_System_Index.gs:323`, invoke `restoreSheetFromArchiveWorkbook` (lexically unconditional at this line).
3. ↳ ↳ Enter `restoreSheetFromArchiveWorkbook` (4_System_Index.gs:329); parameters: `targetSheetName`.
4. ↳ ↳ ↳ At `4_System_Index.gs:336`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
5. ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
6. ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
7. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDocumentPropertiesCached_` (1_Config.gs:170); parameters: `none`.
8. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:171`, invoke `getRuntimeCache_` (lexically unconditional at this line).
9. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
10. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
11. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDocumentPropertiesCached_` according to its source branches; service exceptions propagate unless caught locally.
12. ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
13. ↳ ↳ ↳ At `4_System_Index.gs:348`, invoke `updateIndexSheet` (lexically unconditional at this line).
14. ↳ ↳ ↳ ↳ Enter `updateIndexSheet` (4_System_Index.gs:225); parameters: `options`.
15. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:243`, invoke `hasIndexSheetShell_` (branch/loop-dependent).
16. ↳ ↳ ↳ ↳ ↳ ↳ Enter `hasIndexSheetShell_` (4_System_Index.gs:54); parameters: `sheet`.
17. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hasIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
18. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:244`, invoke `buildIndexSheetShell_` (lexically unconditional at this line).
19. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexSheetShell_` (4_System_Index.gs:65); parameters: `sheet`.
20. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:66`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
21. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
22. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
23. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
24. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
25. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
26. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
27. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
28. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
29. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
30. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
31. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
32. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
33. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
34. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
35. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
36. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
37. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
38. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
39. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
40. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
41. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
42. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
43. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
44. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
45. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
46. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
47. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
48. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
49. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
50. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
51. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
52. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
59. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
60. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
61. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
62. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
63. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
64. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
77. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
78. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
79. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
80. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
81. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
82. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
83. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
84. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
85. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
86. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
87. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
88. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
91. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
92. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
93. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
94. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
95. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
96. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
97. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
98. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
99. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
100. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
101. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
102. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
103. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
104. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
105. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
106. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
107. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
108. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
109. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
110. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
111. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
112. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
113. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
114. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
115. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
116. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
117. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
118. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
119. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
122. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
123. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
124. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
125. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
126. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
127. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
128. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
129. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
130. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
131. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
132. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
133. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
134. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
135. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
136. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
137. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
138. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
139. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
140. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
141. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
142. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
143. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
144. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
145. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
146. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
147. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
148. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
149. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
150. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
151. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
152. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
153. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
154. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
155. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
156. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
157. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
158. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
159. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
160. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
161. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
162. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
163. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
164. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
165. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
166. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
167. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
168. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
169. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
170. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
171. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
172. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
173. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
174. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
175. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
176. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
177. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
178. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
179. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
180. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
181. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
182. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
183. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
184. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
185. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
186. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
187. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
188. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
189. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
190. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
191. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
192. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
193. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
194. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
195. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
196. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
197. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
198. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
199. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
200. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
201. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
202. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
203. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
204. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
205. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
206. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
207. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
208. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
210. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
211. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
212. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
213. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
214. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
215. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
216. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
217. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
218. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
219. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
220. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
221. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
222. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
223. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
224. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
225. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
226. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
227. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
228. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
229. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
230. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
231. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
232. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
233. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
234. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
235. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
236. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
237. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
238. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:67`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
239. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
240. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
241. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:68`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
242. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
243. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
244. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
245. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
246. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
247. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:247`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
248. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
249. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
250. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:250`, invoke `updateIndexLocalWorkspace_` (branch/loop-dependent).
251. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexLocalWorkspace_` (4_System_Index.gs:111); parameters: `sheet, theme`.
252. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:117`, invoke `localSheetRow_` (lexically unconditional at this line).
253. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
254. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
255. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:130`, invoke `getTabOrganizationProfilesForSort_` (lexically unconditional at this line).
256. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getTabOrganizationProfilesForSort_` (2_Dashboard_Loaders.gs:268); parameters: `none`.
257. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:269`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
258. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
262. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
263. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
264. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
268. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
269. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
270. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
271. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
272. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
273. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
274. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
275. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
276. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
277. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
278. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getTabOrganizationProfilesForSort_` according to its source branches; service exceptions propagate unless caught locally.
279. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:157`, invoke `localSheetRow_` (lexically unconditional at this line).
280. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
281. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
282. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexLocalWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
283. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:251`, invoke `updateIndexArchiveWorkspace_` (branch/loop-dependent).
284. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexArchiveWorkspace_` (4_System_Index.gs:185); parameters: `sheet, theme, preOpenedArchiveSs`.
285. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:187`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
286. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
287. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
288. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
289. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
290. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:201`, invoke `buildIndexRestoreHyperlinkFormula_` (lexically unconditional at this line).
291. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexRestoreHyperlinkFormula_` (4_System_Index.gs:356); parameters: `targetSheetName, actionType`.
292. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:357`, invoke `getIndexRestoreWebAppUrl_` (lexically unconditional at this line).
293. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getIndexRestoreWebAppUrl_` (4_System_Index.gs:364); parameters: `none`.
294. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getIndexRestoreWebAppUrl_` according to its source branches; service exceptions propagate unless caught locally.
295. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexRestoreHyperlinkFormula_` according to its source branches; service exceptions propagate unless caught locally.
296. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexArchiveWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
297. ↳ ↳ ↳ ↳ Return/terminate `updateIndexSheet` according to its source branches; service exceptions propagate unless caught locally.
298. ↳ ↳ Return/terminate `restoreSheetFromArchiveWorkbook` according to its source branches; service exceptions propagate unless caught locally.
299. Return/terminate `restoreSheetFromActiveIndexRow` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-MENU-041 — Master List › 📇 Index › 🌐 Configure Index Restore Web App URL

1. Enter `configureIndexRestoreWebAppUrl` (4_System_Index.gs:34); parameters: `none`.
2. ↳ At `4_System_Index.gs:37`, invoke `getIndexRestoreWebAppUrl_` (lexically unconditional at this line).
3. ↳ ↳ Enter `getIndexRestoreWebAppUrl_` (4_System_Index.gs:364); parameters: `none`.
4. ↳ ↳ Return/terminate `getIndexRestoreWebAppUrl_` according to its source branches; service exceptions propagate unless caught locally.
5. ↳ At `4_System_Index.gs:48`, invoke `updateIndexSheet` (lexically unconditional at this line).
6. ↳ ↳ Enter `updateIndexSheet` (4_System_Index.gs:225); parameters: `options`.
7. ↳ ↳ ↳ At `4_System_Index.gs:243`, invoke `hasIndexSheetShell_` (branch/loop-dependent).
8. ↳ ↳ ↳ ↳ Enter `hasIndexSheetShell_` (4_System_Index.gs:54); parameters: `sheet`.
9. ↳ ↳ ↳ ↳ Return/terminate `hasIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
10. ↳ ↳ ↳ At `4_System_Index.gs:244`, invoke `buildIndexSheetShell_` (lexically unconditional at this line).
11. ↳ ↳ ↳ ↳ Enter `buildIndexSheetShell_` (4_System_Index.gs:65); parameters: `sheet`.
12. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:66`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
13. ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
14. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
15. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
16. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
17. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
18. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
19. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
20. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
21. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
22. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
23. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
24. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
25. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
26. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
27. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
28. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
29. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
30. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
31. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
32. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
33. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
34. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
35. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
36. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
37. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
38. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
39. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
40. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
41. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
42. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
43. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
44. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
45. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
46. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
47. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
48. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
49. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
50. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
51. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
52. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
59. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
60. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
61. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
62. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
63. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
64. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
77. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
78. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
79. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
80. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
81. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
82. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
83. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
84. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
85. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
86. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
87. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
88. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
91. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
92. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
93. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
94. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
95. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
96. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
97. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
98. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
99. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
100. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
101. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
102. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
103. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
104. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
105. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
106. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
107. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
108. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
109. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
110. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
111. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
112. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
113. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
114. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
115. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
116. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
117. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
118. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
119. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
122. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
123. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
124. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
125. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
126. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
127. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
128. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
129. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
130. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
131. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
132. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
133. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
134. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
135. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
136. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
137. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
138. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
139. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
140. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
141. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
142. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
143. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
144. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
145. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
146. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
147. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
148. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
149. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
150. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
151. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
152. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
153. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
154. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
155. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
156. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
157. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
158. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
159. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
160. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
161. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
162. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
163. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
164. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
165. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
166. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
167. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
168. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
169. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
170. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
171. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
172. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
173. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
174. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
175. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
176. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
177. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
178. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
179. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
180. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
181. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
182. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
183. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
184. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
185. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
186. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
187. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
188. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
189. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
190. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
191. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
192. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
193. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
194. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
195. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
196. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
197. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
198. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
199. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
200. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
201. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
202. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
203. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
204. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
205. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
206. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
207. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
208. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
210. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
211. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
212. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
213. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
214. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
215. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
216. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
217. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
218. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
219. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
220. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
221. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
222. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
223. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
224. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
225. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
226. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
227. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
228. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
229. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
230. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:67`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
231. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
232. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
233. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:68`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
234. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
235. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
236. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDocumentPropertiesCached_` (1_Config.gs:170); parameters: `none`.
237. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:171`, invoke `getRuntimeCache_` (lexically unconditional at this line).
238. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
239. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
240. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDocumentPropertiesCached_` according to its source branches; service exceptions propagate unless caught locally.
241. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
242. ↳ ↳ ↳ ↳ Return/terminate `buildIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
243. ↳ ↳ ↳ At `4_System_Index.gs:247`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
244. ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
245. ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
246. ↳ ↳ ↳ At `4_System_Index.gs:250`, invoke `updateIndexLocalWorkspace_` (branch/loop-dependent).
247. ↳ ↳ ↳ ↳ Enter `updateIndexLocalWorkspace_` (4_System_Index.gs:111); parameters: `sheet, theme`.
248. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:117`, invoke `localSheetRow_` (lexically unconditional at this line).
249. ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
250. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
251. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:130`, invoke `getTabOrganizationProfilesForSort_` (lexically unconditional at this line).
252. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getTabOrganizationProfilesForSort_` (2_Dashboard_Loaders.gs:268); parameters: `none`.
253. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:269`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
254. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
255. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
256. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
257. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
258. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
262. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
263. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
264. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
268. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
269. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
270. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
271. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
272. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
273. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
274. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getTabOrganizationProfilesForSort_` according to its source branches; service exceptions propagate unless caught locally.
275. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:157`, invoke `localSheetRow_` (lexically unconditional at this line).
276. ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
277. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
278. ↳ ↳ ↳ ↳ Return/terminate `updateIndexLocalWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
279. ↳ ↳ ↳ At `4_System_Index.gs:251`, invoke `updateIndexArchiveWorkspace_` (branch/loop-dependent).
280. ↳ ↳ ↳ ↳ Enter `updateIndexArchiveWorkspace_` (4_System_Index.gs:185); parameters: `sheet, theme, preOpenedArchiveSs`.
281. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:187`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
282. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
283. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
284. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
285. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
286. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:201`, invoke `buildIndexRestoreHyperlinkFormula_` (lexically unconditional at this line).
287. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexRestoreHyperlinkFormula_` (4_System_Index.gs:356); parameters: `targetSheetName, actionType`.
288. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:357`, invoke `getIndexRestoreWebAppUrl_` (lexically unconditional at this line).
289. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getIndexRestoreWebAppUrl_` (4_System_Index.gs:364); parameters: `none`.
290. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getIndexRestoreWebAppUrl_` according to its source branches; service exceptions propagate unless caught locally.
291. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexRestoreHyperlinkFormula_` according to its source branches; service exceptions propagate unless caught locally.
292. ↳ ↳ ↳ ↳ Return/terminate `updateIndexArchiveWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
293. ↳ ↳ Return/terminate `updateIndexSheet` according to its source branches; service exceptions propagate unless caught locally.
294. Return/terminate `configureIndexRestoreWebAppUrl` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-MENU-042 — Master List › 📇 Index › 🔗 Configure Archive Spreadsheet ID

1. Enter `configureArchiveSpreadsheetId` (4_System_Index.gs:15); parameters: `none`.
2. ↳ At `4_System_Index.gs:17`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
3. ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
4. ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
5. ↳ ↳ ↳ ↳ Enter `getDocumentPropertiesCached_` (1_Config.gs:170); parameters: `none`.
6. ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:171`, invoke `getRuntimeCache_` (lexically unconditional at this line).
7. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
8. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
9. ↳ ↳ ↳ ↳ Return/terminate `getDocumentPropertiesCached_` according to its source branches; service exceptions propagate unless caught locally.
10. ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
11. Return/terminate `configureArchiveSpreadsheetId` according to its source branches; service exceptions propagate unless caught locally.


## 7. Numbered Trigger Execution Traces

## TRACE-TRG-001 — onOpen

1. Enter `onOpen` (1_Config.gs:8); parameters: `none`.
2. Return/terminate `onOpen` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-TRG-002 — doGet

1. Enter `doGet` (4_System_Index.gs:388); parameters: `e`.
2. ↳ At `4_System_Index.gs:392`, invoke `escapeHtml_` (lexically unconditional at this line).
3. ↳ ↳ Enter `escapeHtml_` (4_System_Index.gs:378); parameters: `text`.
4. ↳ ↳ Return/terminate `escapeHtml_` according to its source branches; service exceptions propagate unless caught locally.
5. ↳ At `4_System_Index.gs:404`, invoke `restoreSheetFromArchiveWorkbook` (branch/loop-dependent).
6. ↳ ↳ Enter `restoreSheetFromArchiveWorkbook` (4_System_Index.gs:329); parameters: `targetSheetName`.
7. ↳ ↳ ↳ At `4_System_Index.gs:336`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
8. ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
9. ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
10. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDocumentPropertiesCached_` (1_Config.gs:170); parameters: `none`.
11. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:171`, invoke `getRuntimeCache_` (lexically unconditional at this line).
12. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
13. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
14. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDocumentPropertiesCached_` according to its source branches; service exceptions propagate unless caught locally.
15. ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
16. ↳ ↳ ↳ At `4_System_Index.gs:348`, invoke `updateIndexSheet` (lexically unconditional at this line).
17. ↳ ↳ ↳ ↳ Enter `updateIndexSheet` (4_System_Index.gs:225); parameters: `options`.
18. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:243`, invoke `hasIndexSheetShell_` (branch/loop-dependent).
19. ↳ ↳ ↳ ↳ ↳ ↳ Enter `hasIndexSheetShell_` (4_System_Index.gs:54); parameters: `sheet`.
20. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hasIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
21. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:244`, invoke `buildIndexSheetShell_` (lexically unconditional at this line).
22. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexSheetShell_` (4_System_Index.gs:65); parameters: `sheet`.
23. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:66`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
24. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
25. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
26. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
27. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
28. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
29. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
30. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
31. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
32. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
33. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
34. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
35. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
36. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
37. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
38. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
39. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
40. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
41. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
42. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
43. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
44. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
45. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
46. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
47. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
48. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
49. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
50. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
51. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
52. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
59. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
60. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
61. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
62. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
63. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
64. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
77. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
78. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
79. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
80. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
81. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
82. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
83. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
84. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
85. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
86. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
87. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
88. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
91. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
92. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
93. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
94. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
95. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
96. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
97. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
98. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
99. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
100. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
101. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
102. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
103. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
104. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
105. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
106. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
107. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
108. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
109. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
110. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
111. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
112. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
113. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
114. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
115. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
116. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
117. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
118. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
119. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
122. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
123. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
124. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
125. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
126. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
127. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
128. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
129. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
130. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
131. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
132. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
133. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
134. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
135. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
136. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
137. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
138. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
139. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
140. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
141. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
142. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
143. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
144. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
145. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
146. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
147. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
148. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
149. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
150. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
151. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
152. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
153. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
154. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
155. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
156. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
157. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
158. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
159. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
160. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
161. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
162. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
163. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
164. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
165. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
166. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
167. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
168. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
169. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
170. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
171. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
172. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
173. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
174. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
175. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
176. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
177. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
178. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
179. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
180. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
181. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
182. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
183. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
184. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
185. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
186. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
187. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
188. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
189. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
190. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
191. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
192. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
193. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
194. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
195. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
196. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
197. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
198. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
199. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
200. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
201. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
202. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
203. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
204. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
205. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
206. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
207. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
208. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
210. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
211. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
212. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
213. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
214. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
215. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
216. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
217. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
218. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
219. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
220. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
221. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
222. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
223. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
224. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
225. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
226. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
227. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
228. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
229. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
230. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
231. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
232. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
233. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
234. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
235. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
236. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
237. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
238. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
239. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
240. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
241. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:67`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
242. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
243. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
244. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:68`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
245. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
246. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
247. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
248. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
249. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
250. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:247`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
251. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
252. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
253. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:250`, invoke `updateIndexLocalWorkspace_` (branch/loop-dependent).
254. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexLocalWorkspace_` (4_System_Index.gs:111); parameters: `sheet, theme`.
255. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:117`, invoke `localSheetRow_` (lexically unconditional at this line).
256. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
257. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
258. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:130`, invoke `getTabOrganizationProfilesForSort_` (lexically unconditional at this line).
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getTabOrganizationProfilesForSort_` (2_Dashboard_Loaders.gs:268); parameters: `none`.
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:269`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
262. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
263. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
264. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
268. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
269. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
270. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
271. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
272. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
273. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
274. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
275. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
276. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
277. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
278. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
279. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
280. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
281. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getTabOrganizationProfilesForSort_` according to its source branches; service exceptions propagate unless caught locally.
282. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:157`, invoke `localSheetRow_` (lexically unconditional at this line).
283. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
284. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
285. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexLocalWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
286. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:251`, invoke `updateIndexArchiveWorkspace_` (branch/loop-dependent).
287. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexArchiveWorkspace_` (4_System_Index.gs:185); parameters: `sheet, theme, preOpenedArchiveSs`.
288. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:187`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
289. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
290. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
291. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
292. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
293. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:201`, invoke `buildIndexRestoreHyperlinkFormula_` (lexically unconditional at this line).
294. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexRestoreHyperlinkFormula_` (4_System_Index.gs:356); parameters: `targetSheetName, actionType`.
295. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:357`, invoke `getIndexRestoreWebAppUrl_` (lexically unconditional at this line).
296. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getIndexRestoreWebAppUrl_` (4_System_Index.gs:364); parameters: `none`.
297. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getIndexRestoreWebAppUrl_` according to its source branches; service exceptions propagate unless caught locally.
298. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexRestoreHyperlinkFormula_` according to its source branches; service exceptions propagate unless caught locally.
299. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexArchiveWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
300. ↳ ↳ ↳ ↳ Return/terminate `updateIndexSheet` according to its source branches; service exceptions propagate unless caught locally.
301. ↳ ↳ Return/terminate `restoreSheetFromArchiveWorkbook` according to its source branches; service exceptions propagate unless caught locally.
302. ↳ At `4_System_Index.gs:405`, invoke `restoreSheetFromActiveIndexRow` (lexically unconditional at this line).
303. ↳ ↳ Enter `restoreSheetFromActiveIndexRow` (4_System_Index.gs:280); parameters: `optionalTargetSheetName`.
304. ↳ ↳ ↳ At `4_System_Index.gs:323`, invoke `restoreSheetFromArchiveWorkbook` (lexically unconditional at this line).
305. ↳ ↳ ↳ ↳ Enter `restoreSheetFromArchiveWorkbook` (4_System_Index.gs:329); parameters: `targetSheetName`.
306. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:336`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
307. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
308. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:348`, invoke `updateIndexSheet` (lexically unconditional at this line).
309. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
310. ↳ ↳ ↳ ↳ Return/terminate `restoreSheetFromArchiveWorkbook` according to its source branches; service exceptions propagate unless caught locally.
311. ↳ ↳ Return/terminate `restoreSheetFromActiveIndexRow` according to its source branches; service exceptions propagate unless caught locally.
312. ↳ At `4_System_Index.gs:418`, invoke `escapeHtml_` (lexically unconditional at this line).
313. ↳ ↳ Enter `escapeHtml_` (4_System_Index.gs:378); parameters: `text`.
314. ↳ ↳ Return/terminate `escapeHtml_` according to its source branches; service exceptions propagate unless caught locally.
315. Return/terminate `doGet` according to its source branches; service exceptions propagate unless caught locally.


## 8. Reachable Function Dependency Catalog

The complete 210-function-row catalog is reproduced below for standalone use.

| ID | Function | Location | Inputs | Callers | Callees |
|---|---|---|---|---|---|
| FN-001 | `onOpen` | `1_Config.gs:8–69` | `none` | entry | none |
| FN-005 | `getRuntimeCache_` | `1_Config.gs:155–164` | `none` | clearSheetRuntimeCachesForSheet_, getDocumentPropertiesCached_, getHeaderMap_, getHeaders_, getSheetDimensions_, getThemeColorsFromBase_, loadDashboardConfig_ | none |
| FN-007 | `getDocumentPropertiesCached_` | `1_Config.gs:170–174` | `none` | getArchiveSpreadsheetId_ | getRuntimeCache_ |
| FN-008 | `getArchiveSpreadsheetId_` | `1_Config.gs:176–178` | `none` | buildIndexSheetShell_, configureArchiveSpreadsheetId, restoreSheetFromArchiveWorkbook, updateIndexArchiveWorkspace_ | getDocumentPropertiesCached_ |
| FN-010 | `loadDashboardConfig_` | `2_Dashboard_Loaders.gs:22–43` | `forceRefresh` | buildAllTemplatesAndValidate, buildIndexSheetShell_, buildMonthlyChangeReportForMonth_, createActiveDemoPFromRawData_, formatMonthlyChangeReportSectionSheet_, getOrCreateDisenrolledExclusionSheet_, getTabOrganizationProfilesForSort_, populateMonthlyChangeReportSections_, syncDisenrolledExclusionFromRawData_ | getRuntimeCache_, loadColumnDefinitions_, loadGlobalSettings_, loadSheetBehaviors_, loadSheetDefinitions_, loadSheetHeaders_, loadSystemSurfaces_, loadTabOrganization_, loadTitleRows_ |
| FN-012 | `readDashboardSectionRows_` | `2_Dashboard_Loaders.gs:53–77` | `sheet, sectionMarker` | loadColumnDefinitions_, loadGlobalSettings_, loadSheetBehaviors_, loadSheetDefinitions_, loadSheetHeaders_, loadSystemSurfaces_, loadTabOrganization_, loadTitleRows_ | none |
| FN-013 | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:79–90` | `sheetType` | getBehaviorForSheetType_, getHeadersForSheetType_, getSheetDefinitionByTypeOrNull_, loadSheetBehaviors_, loadSheetDefinitions_, loadSheetHeaders_, loadTitleRows_ | normalizeKey_ |
| FN-014 | `loadGlobalSettings_` | `2_Dashboard_Loaders.gs:97–126` | `sheet` | loadDashboardConfig_ | numberOrDefault_, readDashboardSectionRows_ |
| FN-015 | `loadTitleRows_` | `2_Dashboard_Loaders.gs:131–144` | `sheet` | loadDashboardConfig_ | normalizeDashboardSheetTypeKey_, numberOrDefault_, parseTitleRowConfigRow_, readDashboardSectionRows_ |
| FN-016 | `parseTitleRowConfigRow_` | `2_Dashboard_Loaders.gs:146–164` | `row, globals, base` | loadTitleRows_ | normalizeTitleTargetCell_, numberOrDefault_ |
| FN-017 | `normalizeTitleTargetCell_` | `2_Dashboard_Loaders.gs:166–170` | `value, rowNumber` | parseTitleRowConfigRow_ | none |
| FN-018 | `loadSheetDefinitions_` | `2_Dashboard_Loaders.gs:175–195` | `sheet` | loadDashboardConfig_ | isBlankCell_, normalizeDashboardSheetTypeKey_, normalizeHex_, numberOrDefault_, parseBoolean_, readDashboardSectionRows_ |
| FN-019 | `loadSheetBehaviors_` | `2_Dashboard_Loaders.gs:200–218` | `sheet` | loadDashboardConfig_ | normalizeDashboardSheetTypeKey_, parseBoolean_, readDashboardSectionRows_ |
| FN-020 | `loadSystemSurfaces_` | `2_Dashboard_Loaders.gs:223–245` | `sheet` | loadDashboardConfig_ | normalizeHex_, numberOrDefault_, parseBoolean_, readDashboardSectionRows_ |
| FN-021 | `loadTabOrganization_` | `2_Dashboard_Loaders.gs:250–266` | `sheet` | loadDashboardConfig_ | numberOrDefault_, readDashboardSectionRows_ |
| FN-022 | `getTabOrganizationProfilesForSort_` | `2_Dashboard_Loaders.gs:268–271` | `none` | updateIndexLocalWorkspace_ | loadDashboardConfig_ |
| FN-023 | `loadColumnDefinitions_` | `2_Dashboard_Loaders.gs:276–297` | `sheet` | loadDashboardConfig_ | isBlankCell_, normalizeHeader_, numberOrDefault_, parseBoolean_, readDashboardSectionRows_ |
| FN-024 | `loadSheetHeaders_` | `2_Dashboard_Loaders.gs:302–323` | `sheet` | loadDashboardConfig_ | normalizeDashboardSheetTypeKey_, normalizeHeader_, numberOrDefault_, readDashboardSectionRows_ |
| FN-025 | `getSheetDefinitionByTypeOrNull_` | `2_Dashboard_Loaders.gs:327–332` | `dashboard, sheetType` | getSheetDefinitionByType_ | normalizeDashboardSheetTypeKey_ |
| FN-026 | `getSheetDefinitionByType_` | `2_Dashboard_Loaders.gs:334–338` | `dashboard, sheetType` | buildMonthlyChangeReportForMonth_, getOrCreateDisenrolledExclusionSheet_, populateMonthlyChangeReportSections_ | getSheetDefinitionByTypeOrNull_ |
| FN-028 | `getBehaviorForSheetType_` | `2_Dashboard_Loaders.gs:358–362` | `dashboard, sheetType` | createOrRefreshTemplateFromDashboard_ | getDefaultBehavior_, normalizeDashboardSheetTypeKey_ |
| FN-030 | `getDefaultBehavior_` | `2_Dashboard_Loaders.gs:368–377` | `none` | getBehaviorForSheetType_ | none |
| FN-031 | `getHeadersForSheetType_` | `2_Dashboard_Loaders.gs:379–383` | `dashboard, sheetType` | createOrRefreshTemplateFromDashboard_, getOrCreateDisenrolledExclusionSheet_, syncDisenrolledExclusionFromRawData_ | normalizeDashboardSheetTypeKey_ |
| FN-033 | `normalizeHex_` | `2_Dashboard_Loaders.gs:395–399` | `color` | getThemeColorsFromBase_, loadSheetDefinitions_, loadSystemSurfaces_ | none |
| FN-034 | `getThemeColorsFromBase_` | `2_Dashboard_Loaders.gs:401–426` | `baseHex, globals` | applyTemplateBaseFormatting_, applyTemplateFreezeAndTabColor_, populateMonthlyChangeReportSections_ | getRuntimeCache_, hexToHsl_, hslToHex_, normalizeHex_, numberOrDefault_ |
| FN-036 | `getSectionEThemeForSheet_` | `2_Dashboard_Loaders.gs:437–466` | `targetSheetName` | buildIndexSheetShell_, updateIndexSheet | none |
| FN-038 | `hexToHsl_` | `2_Dashboard_Loaders.gs:511–533` | `hex` | getThemeColorsFromBase_ | none |
| FN-039 | `hslToHex_` | `2_Dashboard_Loaders.gs:535–544` | `h, s, l` | getThemeColorsFromBase_ | none |
| FN-041 | `normalizeHeader_` | `3_Core_Helpers.gs:8–10` | `value` | isDateLikeHeader_, loadColumnDefinitions_, loadSheetHeaders_ | none |
| FN-042 | `normalizePMR_` | `3_Core_Helpers.gs:12–14` | `value` | buildParticipantContactKey_, buildPrimaryDemoPRowsInMemory_, compareRawDataForMonthlyChange_, flattenDemoPContactRowsInMemory_, getRawDemoPDataForCompare_, removeActiveDemoPPMRsFromDisenrolledExclusion_, syncDisenrolledExclusionFromRawData_, writePMRContactsToParticipantRows_ | none |
| FN-043 | `normalizeKeyPart_` | `3_Core_Helpers.gs:16–25` | `value` | buildParticipantContactKey_ | none |
| FN-044 | `normalizeText_` | `3_Core_Helpers.gs:27–29` | `value` | normalizeKey_, safeSheetName_ | none |
| FN-045 | `normalizeKey_` | `3_Core_Helpers.gs:31–33` | `value` | normalizeDashboardSheetTypeKey_ | normalizeText_ |
| FN-046 | `normalizeCompareValue_` | `3_Core_Helpers.gs:35–56` | `value` | buildColumnSignaturesForSection_, buildMonthlyChangeSectionRows_, buildPrimitiveRowsHash_, combineNotesSummaryData_, flattenDemoPContactRowsInMemory_, getRawDemoPDataForCompare_, populateDemoPNameData_, populateParticipantNameData_, removeActiveDemoPPMRsFromDisenrolledExclusion_, rowsWithDOBOnlyForSection_, syncDisenrolledExclusionFromRawData_, updateBannerColumnData_, writePMRContactsToParticipantRows_ | none |
| FN-048 | `parseBoolean_` | `3_Core_Helpers.gs:62–66` | `value` | loadColumnDefinitions_, loadSheetBehaviors_, loadSheetDefinitions_, loadSystemSurfaces_ | none |
| FN-049 | `numberOrDefault_` | `3_Core_Helpers.gs:68–71` | `value, fallback` | getThemeColorsFromBase_, loadColumnDefinitions_, loadGlobalSettings_, loadSheetDefinitions_, loadSheetHeaders_, loadSystemSurfaces_, loadTabOrganization_, loadTitleRows_, parseTitleRowConfigRow_ | none |
| FN-050 | `isBlankCell_` | `3_Core_Helpers.gs:73–75` | `value` | loadColumnDefinitions_, loadSheetDefinitions_ | none |
| FN-051 | `safeSheetName_` | `3_Core_Helpers.gs:77–79` | `value` | buildStagedMasterListSheetName_ | normalizeText_ |
| FN-052 | `padRowToWidth_` | `3_Core_Helpers.gs:83–87` | `rowValues, width` | appendMonthlyChangeCompiledRow_, appendMonthlyChangeSectionBlock_, buildMonthlyChangeReportSectionLayout_, normalizeRowsToWidth_, writeFrameworkTimingReport_ | none |
| FN-053 | `normalizeRowsToWidth_` | `3_Core_Helpers.gs:89–91` | `rows, width` | removeActiveDemoPPMRsFromDisenrolledExclusion_ | padRowToWidth_ |
| FN-054 | `normalizeToDateObject_` | `3_Core_Helpers.gs:95–133` | `value` | convertMonthlyChangeReportDateValues_, formatDateDisplay_, hideOldDisenrolledRows_, isSameDate_ | isReasonableReportDate_ |
| FN-055 | `isReasonableReportDate_` | `3_Core_Helpers.gs:135–138` | `date` | normalizeToDateObject_ | none |
| FN-056 | `createLocalDateOnly_` | `3_Core_Helpers.gs:140–142` | `year, month, day` | hideOldDisenrolledRows_ | none |
| FN-057 | `isSameDate_` | `3_Core_Helpers.gs:144–148` | `a, b` | compareRawDataForMonthlyChange_, isMonthlyChangeDisenrollmentEffectiveDate_ | normalizeToDateObject_ |
| FN-058 | `isDateLikeHeader_` | `3_Core_Helpers.gs:150–155` | `header` | getMonthlyChangeReportDateIndexes_ | normalizeHeader_ |
| FN-061 | `getHeaders_` | `3_Core_Helpers.gs:173–182` | `sheet, headerRow` | buildMasterListHeadersBeforeDataCopy_, createMasterListForMonth_, getDataValues_, getHeaderMap_, removeActiveDemoPPMRsFromDisenrolledExclusion_ | getRuntimeCache_ |
| FN-062 | `getHeaderMap_` | `3_Core_Helpers.gs:184–191` | `sheet, headerRow` | createMasterListForMonth_, getDataValues_ | buildHeaderIndexMap_, getHeaders_, getRuntimeCache_ |
| FN-063 | `buildHeaderIndexMap_` | `3_Core_Helpers.gs:193–200` | `headers` | buildMonthlyChangeSectionRows_, createActiveDemoPFromRawData_, flattenDemoPContactRowsInMemory_, getHeaderMap_, removeActiveDemoPPMRsFromDisenrolledExclusion_, syncDisenrolledExclusionFromRawData_ | none |
| FN-064 | `findHeaderIndex_` | `3_Core_Helpers.gs:202–207` | `headerMap, possibleNames` | buildMonthlyChangeSectionRows_, getDOBIndex_, getPMRIndex_, removeActiveDemoPPMRsFromDisenrolledExclusion_, syncDisenrolledExclusionFromRawData_ | none |
| FN-065 | `getPMRIndex_` | `3_Core_Helpers.gs:209–211` | `headerMap` | buildPrimaryDemoPRowsInMemory_, compareRawDataForMonthlyChange_, flattenDemoPContactRowsInMemory_, getRawDemoPDataForCompare_, removeActiveDemoPPMRsFromDisenrolledExclusion_, syncDisenrolledExclusionFromRawData_, writePMRContactsToParticipantRows_ | findHeaderIndex_ |
| FN-066 | `getDOBIndex_` | `3_Core_Helpers.gs:213–215` | `headerMap` | buildMonthlyChangeSectionRows_, getRawDemoPDataForCompare_, rowsWithDOBOnlyForSection_ | findHeaderIndex_ |
| FN-067 | `getDataValues_` | `3_Core_Helpers.gs:217–231` | `sheet, headerRow, dataStartRow` | buildPrimaryDemoPRowsInMemory_, buildSourceMapBySingleKeyForPart5_, compareRawDataForMonthlyChange_, getRawDemoPDataForCompare_, hideOldDisenrolledRows_, removeActiveDemoPPMRsFromDisenrolledExclusion_, syncDisenrolledExclusionFromRawData_ | getHeaderMap_, getHeaders_, getSheetDimensions_ |
| FN-068 | `getSheetDimensions_` | `3_Core_Helpers.gs:233–244` | `sheet` | getDataValues_ | getRuntimeCache_ |
| FN-069 | `clearSheetRuntimeCachesForSheet_` | `3_Core_Helpers.gs:246–252` | `sheet` | buildMasterListHeadersBeforeDataCopy_, createActiveDemoPFromRawData_, promoteStagedMasterListSheet_, removeActiveDemoPPMRsFromDisenrolledExclusion_, syncDisenrolledExclusionFromRawData_ | getRuntimeCache_ |
| FN-070 | `startFrameworkTiming_` | `3_Core_Helpers.gs:256–259` | `processName, monthParts` | createMasterListForMonth_ | none |
| FN-071 | `markFrameworkStep_` | `3_Core_Helpers.gs:261–277` | `timing, stepName, details` | buildRefinedDataFromScratch, buildTemplateFromDashboard_, clearTemplateForFullBuild_, createDisenrolledListForMonth_, createMasterListForMonth_, ensureGoldenMasterTemplate_, ensureTemplateFilter_, markRuntimeStep_, processRefinedDataUnified_, syncDisenrolledExclusionFromRawData_ | none |
| FN-072 | `markRuntimeStep_` | `3_Core_Helpers.gs:279–281` | `timing, label, details` | buildMonthlyChangeReportForMonth_, createMasterListForMonth_, getValidatedRawDataSheetForDemoPBuild_ | markFrameworkStep_ |
| FN-073 | `writeFrameworkTimingReport_` | `3_Core_Helpers.gs:283–298` | `timing` | writeRuntimeTimingReport_ | padRowToWidth_ |
| FN-074 | `writeRuntimeTimingReport_` | `3_Core_Helpers.gs:300–302` | `timing` | createMasterListForMonth_ | writeFrameworkTimingReport_ |
| FN-075 | `logBestEffortWarning_` | `3_Core_Helpers.gs:304–307` | `message, details` | buildAllTemplatesAndValidate, cleanupFailedStagedMasterListSheet_, createMasterListForMonth_, flattenDemoPContactRowsInMemory_, forceBaseTemplateHidden_, refreshIndexAfterSheetWorkflow_, removeActiveDemoPPMRsFromDisenrolledExclusion_, safeFlattenAndProcessContacts_ | none |
| FN-076 | `formatSeconds_` | `3_Core_Helpers.gs:309–314` | `seconds` | createMasterListForMonth_ | none |
| FN-077 | `configureArchiveSpreadsheetId` | `4_System_Index.gs:15–32` | `none` | entry | getArchiveSpreadsheetId_ |
| FN-078 | `configureIndexRestoreWebAppUrl` | `4_System_Index.gs:34–50` | `none` | entry | getIndexRestoreWebAppUrl_, updateIndexSheet |
| FN-079 | `hasIndexSheetShell_` | `4_System_Index.gs:54–63` | `sheet` | updateIndexSheet | none |
| FN-080 | `buildIndexSheetShell_` | `4_System_Index.gs:65–103` | `sheet` | updateIndexSheet | getArchiveSpreadsheetId_, getSectionEThemeForSheet_, loadDashboardConfig_ |
| FN-081 | `updateIndexLocalWorkspace_` | `4_System_Index.gs:111–180` | `sheet, theme` | updateIndexSheet | getTabOrganizationProfilesForSort_, localSheetRow_ |
| FN-082 | `localSheetRow_` | `4_System_Index.gs:117–127` | `sheetName` | updateIndexLocalWorkspace_ | none |
| FN-083 | `updateIndexArchiveWorkspace_` | `4_System_Index.gs:185–220` | `sheet, theme, preOpenedArchiveSs` | updateIndexSheet | buildIndexRestoreHyperlinkFormula_, getArchiveSpreadsheetId_ |
| FN-084 | `updateIndexSheet` | `4_System_Index.gs:225–257` | `options` | buildMonthlyChangeReportForMonth_, configureIndexRestoreWebAppUrl, refreshIndexAfterSheetWorkflow_, restoreSheetFromArchiveWorkbook | buildIndexSheetShell_, getSectionEThemeForSheet_, hasIndexSheetShell_, updateIndexArchiveWorkspace_, updateIndexLocalWorkspace_ |
| FN-087 | `refreshIndexAfterSheetWorkflow_` | `4_System_Index.gs:262–268` | `workflowName, options` | buildRefinedDataFromScratch, createDisenrolledListForMonth_ | logBestEffortWarning_, updateIndexSheet |
| FN-089 | `restoreSheetFromActiveIndexRow` | `4_System_Index.gs:280–327` | `optionalTargetSheetName` | doGet | restoreSheetFromArchiveWorkbook |
| FN-090 | `restoreSheetFromArchiveWorkbook` | `4_System_Index.gs:329–352` | `targetSheetName` | doGet, restoreSheetFromActiveIndexRow | getArchiveSpreadsheetId_, updateIndexSheet |
| FN-091 | `buildIndexRestoreHyperlinkFormula_` | `4_System_Index.gs:356–362` | `targetSheetName, actionType` | updateIndexArchiveWorkspace_ | getIndexRestoreWebAppUrl_ |
| FN-092 | `getIndexRestoreWebAppUrl_` | `4_System_Index.gs:364–376` | `none` | buildIndexRestoreHyperlinkFormula_, configureIndexRestoreWebAppUrl | none |
| FN-093 | `escapeHtml_` | `4_System_Index.gs:378–386` | `text` | doGet | none |
| FN-094 | `doGet` | `4_System_Index.gs:388–424` | `e` | entry | escapeHtml_, restoreSheetFromActiveIndexRow, restoreSheetFromArchiveWorkbook |
| FN-096 | `applyTemplateColumnWidths_` | `5_System_Templates.gs:14–18` | `sheet, template, width` | enforceDemoPPostFlattenFormatting_ | none |
| FN-099 | `ensureGoldenMasterTemplate_` | `5_System_Templates.gs:48–71` | `dashboard, timing` | buildAllTemplatesAndValidate, createOrRefreshTemplateFromDashboard_ | markFrameworkStep_ |
| FN-102 | `forceBaseTemplateHidden_` | `5_System_Templates.gs:145–152` | `none` | buildAllTemplatesAndValidate, setReportTemplateVisibility_ | logBestEffortWarning_ |
| FN-103 | `createOrRefreshTemplateFromDashboard_` | `5_System_Templates.gs:156–177` | `dashboard, sheetDef, timing` | buildAllTemplatesAndValidate | buildTemplateFromDashboard_, ensureGoldenMasterTemplate_, getBehaviorForSheetType_, getHeadersForSheetType_ |
| FN-104 | `buildTemplateFromDashboard_` | `5_System_Templates.gs:179–191` | `sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing, templateExisted` | createOrRefreshTemplateFromDashboard_ | applyTemplateBaseFormatting_, applyTemplateFreezeAndTabColor_, clearTemplateForFullBuild_, markFrameworkStep_, writeTemplateMetadata_ |
| FN-105 | `clearTemplateForFullBuild_` | `5_System_Templates.gs:193–209` | `sheet, sheetDef, timing, templateExisted` | buildTemplateFromDashboard_ | markFrameworkStep_ |
| FN-106 | `applyTemplateBaseFormatting_` | `5_System_Templates.gs:211–236` | `sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing` | buildTemplateFromDashboard_ | ensureTemplateFilter_, getThemeColorsFromBase_ |
| FN-107 | `ensureTemplateFilter_` | `5_System_Templates.gs:238–259` | `sheet, headerRow, rowCount, colCount, sheetDef, timing` | applyTemplateBaseFormatting_ | markFrameworkStep_ |
| FN-108 | `applyTemplateFreezeAndTabColor_` | `5_System_Templates.gs:261–270` | `sheet, dashboard, sheetDef, colCount, timing` | buildTemplateFromDashboard_ | getThemeColorsFromBase_ |
| FN-109 | `writeTemplateMetadata_` | `5_System_Templates.gs:272–283` | `sheet, dashboard, sheetDef, colCount` | buildTemplateFromDashboard_ | none |
| FN-110 | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:287–314` | `none` | quickBuildAllTemplates | createOrRefreshTemplateFromDashboard_, ensureGoldenMasterTemplate_, forceBaseTemplateHidden_, loadDashboardConfig_, logBestEffortWarning_, setReportTemplateVisibility_ |
| FN-111 | `quickBuildAllTemplates` | `5_System_Templates.gs:316–320` | `none` | entry | buildAllTemplatesAndValidate |
| FN-112 | `setReportTemplateVisibility_` | `5_System_Templates.gs:322–342` | `dashboard, hidden, timing` | buildAllTemplatesAndValidate | forceBaseTemplateHidden_ |
| FN-120 | `createMasterListSheetFromTemplate_` | `5_System_Templates.gs:411–415` | `ss, targetName, monthParts, timing, timingLabel` | createMasterListForMonth_ | none |
| FN-123 | `buildRefinedDataFromScratch` | `7_Workflow_DemoP.gs:11–30` | `none` | entry | createActiveDemoPFromRawData_, enforceDemoPPostFlattenFormatting_, getValidatedRawDataSheetForDemoPBuild_, markFrameworkStep_, refreshIndexAfterSheetWorkflow_ |
| FN-124 | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:32–49` | `monthParts, timing` | buildRefinedDataFromScratch | isStrictRawDataSheetCandidateForDemoP_, markRuntimeStep_ |
| FN-125 | `isStrictRawDataSheetCandidateForDemoP_` | `7_Workflow_DemoP.gs:51–56` | `sheet, monthParts` | getValidatedRawDataSheetForDemoPBuild_ | none |
| FN-126 | `createActiveDemoPFromRawData_` | `7_Workflow_DemoP.gs:58–85` | `rawSheet, targetName, monthParts, timing` | buildRefinedDataFromScratch | buildHeaderIndexMap_, clearSheetRuntimeCachesForSheet_, loadDashboardConfig_, processRefinedDataUnified_, updateDemoPReportDates_ |
| FN-128 | `processRefinedDataUnified_` | `7_Workflow_DemoP.gs:115–123` | `workingData, monthParts, sourceSheetName, updateStatus, timing` | createActiveDemoPFromRawData_ | markFrameworkStep_, processDemoPFreshRowsInMemory_, safeFlattenAndProcessContacts_ |
| FN-129 | `safeFlattenAndProcessContacts_` | `7_Workflow_DemoP.gs:125–133` | `workingData, preservePrimaryRows` | processRefinedDataUnified_ | flattenDemoPContactRowsInMemory_, logBestEffortWarning_ |
| FN-130 | `processDemoPFreshRowsInMemory_` | `7_Workflow_DemoP.gs:135–144` | `data` | processRefinedDataUnified_ | combineAddressesData_, combineNotesSummaryData_, handleLanguageData_, populateDemoPNameData_, populateParticipantNameData_, runMasterContactProcessData_, splitPhoneNumbersData_, updateBannerColumnData_ |
| FN-131 | `flattenDemoPContactRowsInMemory_` | `7_Workflow_DemoP.gs:148–201` | `data, requireIntegrity` | safeFlattenAndProcessContacts_ | buildDemoPContactSummaryForFlatRecord_, buildHeaderIndexMap_, getPMRIndex_, logBestEffortWarning_, normalizeCompareValue_, normalizePMR_, sortDemoPFlatRows_ |
| FN-132 | `buildDemoPContactSummaryForFlatRecord_` | `7_Workflow_DemoP.gs:203–213` | `row, headerMap` | flattenDemoPContactRowsInMemory_ | none |
| FN-133 | `sortDemoPFlatRows_` | `7_Workflow_DemoP.gs:215–227` | `rows, headerMap` | flattenDemoPContactRowsInMemory_ | none |
| FN-134 | `populateParticipantNameData_` | `7_Workflow_DemoP.gs:231–243` | `data, pmrFilter` | processDemoPFreshRowsInMemory_ | normalizeCompareValue_ |
| FN-135 | `populateDemoPNameData_` | `7_Workflow_DemoP.gs:245–257` | `data, pmrFilter` | processDemoPFreshRowsInMemory_ | normalizeCompareValue_ |
| FN-136 | `updateBannerColumnData_` | `7_Workflow_DemoP.gs:259–274` | `data, pmrFilter` | processDemoPFreshRowsInMemory_ | normalizeCompareValue_ |
| FN-137 | `combineAddressesData_` | `7_Workflow_DemoP.gs:276–288` | `data, pmrFilter` | processDemoPFreshRowsInMemory_ | none |
| FN-138 | `handleLanguageData_` | `7_Workflow_DemoP.gs:290–309` | `data, pmrFilter` | processDemoPFreshRowsInMemory_ | none |
| FN-139 | `splitPhoneNumbersData_` | `7_Workflow_DemoP.gs:311–336` | `data, pmrFilter` | processDemoPFreshRowsInMemory_ | none |
| FN-140 | `combineNotesSummaryData_` | `7_Workflow_DemoP.gs:338–365` | `data, pmrFilter` | processDemoPFreshRowsInMemory_ | normalizeCompareValue_ |
| FN-147 | `updateDemoPReportDates_` | `7_Workflow_DemoP.gs:509–514` | `demoSheet, monthParts` | createActiveDemoPFromRawData_ | none |
| FN-148 | `enforceDemoPPostFlattenFormatting_` | `7_Workflow_DemoP.gs:516–531` | `demoSheet` | buildRefinedDataFromScratch | applyTemplateColumnWidths_ |
| FN-149 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `7_Workflow_DemoP.gs:533–600` | `demoSheet` | syncDisenrolledExclusionFromRawData_ | buildHeaderIndexMap_, clearSheetRuntimeCachesForSheet_, findHeaderIndex_, getDataValues_, getHeaders_, getPMRIndex_, logBestEffortWarning_, normalizeCompareValue_, normalizePMR_, normalizeRowsToWidth_ |
| FN-153 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:11–118` | `monthParts, parentTiming, preflight` | createMasterList | buildMasterListHeadersBeforeDataCopy_, buildPrimaryDemoPRowsInMemory_, buildStagedMasterListSheetName_, cleanupFailedStagedMasterListSheet_, createMasterListSheetFromTemplate_, formatSeconds_, getHeaderMap_, getHeaders_, logBestEffortWarning_, markFrameworkStep_, markRuntimeStep_, promoteStagedMasterListSheet_, startFrameworkTiming_, syncCarePlanDueSourceIntoData_, syncUnlockedCarePlanSourceIntoData_, writeRuntimeTimingReport_ |
| FN-154 | `createMasterList` | `8_Workflow_MasterList.gs:120–124` | `none` | entry | createMasterListForMonth_ |
| FN-155 | `buildPrimaryDemoPRowsInMemory_` | `8_Workflow_MasterList.gs:128–168` | `demoSheet, masterHeaders, masterHeaderMap` | createMasterListForMonth_ | getDataValues_, getMasterTargetIndex_, getPMRIndex_, normalizePMR_ |
| FN-156 | `getMasterTargetIndex_` | `8_Workflow_MasterList.gs:142–149` | `header` | buildPrimaryDemoPRowsInMemory_ | none |
| FN-160 | `syncUnlockedCarePlanSourceIntoData_` | `8_Workflow_MasterList.gs:206–215` | `data, monthParts, pmrFilter` | createMasterListForMonth_ | buildSourceMapBySingleKeyForPart5_, syncRowsFromSourceMapData_ |
| FN-161 | `syncCarePlanDueSourceIntoData_` | `8_Workflow_MasterList.gs:217–226` | `data, monthParts, pmrFilter` | createMasterListForMonth_ | buildSourceMapBySingleKeyForPart5_, syncRowsFromSourceMapData_ |
| FN-162 | `syncRowsFromSourceMapData_` | `8_Workflow_MasterList.gs:228–247` | `data, sourceMap, config, pmrFilter` | syncCarePlanDueSourceIntoData_, syncUnlockedCarePlanSourceIntoData_ | normalizeSyncFieldPairs_, normalizeSyncKey_ |
| FN-163 | `buildSourceMapBySingleKeyForPart5_` | `8_Workflow_MasterList.gs:249–265` | `sheet, headerRow, dataStartRow, keyHeader` | syncCarePlanDueSourceIntoData_, syncUnlockedCarePlanSourceIntoData_ | getDataValues_, normalizeSyncKey_ |
| FN-164 | `normalizeSyncKey_` | `8_Workflow_MasterList.gs:267–283` | `value, header` | buildSourceMapBySingleKeyForPart5_, syncRowsFromSourceMapData_ | none |
| FN-165 | `normalizeSyncFieldPairs_` | `8_Workflow_MasterList.gs:285–287` | `fields` | syncRowsFromSourceMapData_ | none |
| FN-166 | `runMasterContactProcessData_` | `8_Workflow_MasterList.gs:291–294` | `data, pmrFilter` | processDemoPFreshRowsInMemory_ | writePMRContactsToParticipantRows_ |
| FN-167 | `writePMRContactsToParticipantRows_` | `8_Workflow_MasterList.gs:296–367` | `targetSheet, values, headers, headerMap, pmrFilter` | runMasterContactProcessData_ | buildParticipantContactKey_, capitalizeContactPart_, formatRankedContact_, getPMRIndex_, normalizeCompareValue_, normalizePMR_ |
| FN-168 | `buildParticipantContactKey_` | `8_Workflow_MasterList.gs:369–376` | `row, headerMap, pmrIdx, firstIdx, lastIdx` | writePMRContactsToParticipantRows_ | normalizeKeyPart_, normalizePMR_ |
| FN-169 | `capitalizeContactPart_` | `8_Workflow_MasterList.gs:378–380` | `value` | writePMRContactsToParticipantRows_ | none |
| FN-170 | `formatRankedContact_` | `8_Workflow_MasterList.gs:382–391` | `contact` | writePMRContactsToParticipantRows_ | none |
| FN-172 | `buildStagedMasterListSheetName_` | `8_Workflow_MasterList.gs:421–424` | `masterName` | createMasterListForMonth_ | safeSheetName_ |
| FN-173 | `isStagedMasterListSheet_` | `8_Workflow_MasterList.gs:426–429` | `sheet, masterName` | cleanupFailedStagedMasterListSheet_, validateStagedMasterListBeforeSwap_ | none |
| FN-174 | `validateStagedMasterListBeforeSwap_` | `8_Workflow_MasterList.gs:431–435` | `sheet, masterName, copiedRowCount` | promoteStagedMasterListSheet_ | isStagedMasterListSheet_ |
| FN-175 | `promoteStagedMasterListSheet_` | `8_Workflow_MasterList.gs:437–450` | `ss, stagedSheet, existingSheet, masterName, copiedRowCount, timing, markStep` | createMasterListForMonth_ | clearSheetRuntimeCachesForSheet_, validateStagedMasterListBeforeSwap_ |
| FN-176 | `cleanupFailedStagedMasterListSheet_` | `8_Workflow_MasterList.gs:452–460` | `ss, sheet, masterName, timing, markStep` | createMasterListForMonth_ | isStagedMasterListSheet_, logBestEffortWarning_ |
| FN-177 | `buildMasterListHeadersBeforeDataCopy_` | `8_Workflow_MasterList.gs:462–474` | `demoSheet, masterSheet` | createMasterListForMonth_ | clearSheetRuntimeCachesForSheet_, getHeaders_ |
| FN-180 | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:11–64` | `monthParts, timing, options` | buildMonthlyChangeReport | buildMonthlyChangeReportSectionLayout_, compareRawDataForMonthlyChange_, formatMonthlyChangeReportSectionSheet_, getPreviousRawDataSheet_, getSheetDefinitionByType_, loadDashboardConfig_, markRuntimeStep_, populateMonthlyChangeReportSections_, updateIndexSheet |
| FN-181 | `buildMonthlyChangeReport` | `9_Workflow_MonthlyChange.gs:66–72` | `none` | entry | buildMonthlyChangeReportForMonth_ |
| FN-182 | `compareRawDataForMonthlyChange_` | `9_Workflow_MonthlyChange.gs:76–169` | `previousDemo, currentDemo, monthParts` | buildMonthlyChangeReportForMonth_ | buildPrimitiveRowsHash_, getChangedColumnsForSectionRows_, getDataValues_, getFieldValueFromRow_, getPMRIndex_, getRawDemoPDataForCompare_, isMonthlyChangeDisenrollmentEffectiveDate_, isSameDate_, normalizePMR_, rowsWithDOBOnlyForSection_ |
| FN-183 | `getRawDemoPDataForCompare_` | `9_Workflow_MonthlyChange.gs:171–203` | `sheet` | compareRawDataForMonthlyChange_ | getDOBIndex_, getDataValues_, getPMRIndex_, normalizeCompareValue_, normalizePMR_ |
| FN-184 | `rowsWithDOBOnlyForSection_` | `9_Workflow_MonthlyChange.gs:207–211` | `items, headerMap` | compareRawDataForMonthlyChange_ | getDOBIndex_, normalizeCompareValue_ |
| FN-185 | `buildPrimitiveRowsHash_` | `9_Workflow_MonthlyChange.gs:213–217` | `items, headerMap, columnsToCompare` | compareRawDataForMonthlyChange_ | normalizeCompareValue_ |
| FN-186 | `getChangedColumnsForSectionRows_` | `9_Workflow_MonthlyChange.gs:219–230` | `currentItems, previousItems, currentHeaders, previousHeaders, columnsToCompare, currentHeaderMap, previousHeaderMap` | compareRawDataForMonthlyChange_ | buildColumnSignaturesForSection_ |
| FN-187 | `buildColumnSignaturesForSection_` | `9_Workflow_MonthlyChange.gs:232–240` | `items, headerMap, columnsToCompare` | getChangedColumnsForSectionRows_ | normalizeCompareValue_ |
| FN-188 | `isMonthlyChangeDisenrollmentEffectiveDate_` | `9_Workflow_MonthlyChange.gs:242–244` | `effectiveDate, monthParts` | buildMonthlyChangeSectionRows_, compareRawDataForMonthlyChange_ | isSameDate_ |
| FN-191 | `getFieldValueFromRow_` | `9_Workflow_MonthlyChange.gs:285–288` | `row, headerMap, field` | compareRawDataForMonthlyChange_ | none |
| FN-193 | `displayValueForReport_` | `9_Workflow_MonthlyChange.gs:301–304` | `value` | buildMonthlyChangeReportRow_ | formatDateDisplay_ |
| FN-194 | `formatDateDisplay_` | `9_Workflow_MonthlyChange.gs:306–309` | `date` | displayValueForReport_ | normalizeToDateObject_ |
| FN-195 | `getMonthlyChangeSectionSpecs_` | `9_Workflow_MonthlyChange.gs:313–323` | `sectionData` | populateMonthlyChangeReportSections_ | none |
| FN-196 | `buildMonthlyChangeSectionRows_` | `9_Workflow_MonthlyChange.gs:325–366` | `currentData, previousData, pmrSet, sectionTitle, rowMode, changedColumnsByPMR, monthParts` | populateMonthlyChangeReportSections_ | buildHeaderIndexMap_, buildMonthlyChangeReportRow_, findHeaderIndex_, getDOBIndex_, getMonthlyChangeReportHeaders_, isMonthlyChangeDisenrollmentEffectiveDate_, normalizeCompareValue_ |
| FN-197 | `appendMonthlyChangeCompiledRow_` | `9_Workflow_MonthlyChange.gs:368–373` | `matrix, rowValues, backgroundColor, fontWeight, fontSize, lastCol` | appendMonthlyChangeSectionBlock_ | padRowToWidth_ |
| FN-198 | `appendMonthlyChangeSectionBlock_` | `9_Workflow_MonthlyChange.gs:375–406` | `matrix, spec, dataRows, reportHeaders, theme, lastCol, globals` | populateMonthlyChangeReportSections_ | appendMonthlyChangeCompiledRow_, padRowToWidth_ |
| FN-199 | `populateMonthlyChangeReportSections_` | `9_Workflow_MonthlyChange.gs:408–439` | `reportSheet, sectionData, monthParts` | buildMonthlyChangeReportForMonth_ | appendMonthlyChangeSectionBlock_, buildMonthlyChangeSectionRows_, getMonthlyChangeReportHeaders_, getMonthlyChangeSectionSpecs_, getSheetDefinitionByType_, getThemeColorsFromBase_, loadDashboardConfig_ |
| FN-200 | `buildMonthlyChangeReportRow_` | `9_Workflow_MonthlyChange.gs:441–470` | `sourceRow, sourceHeaders, reportHeaders, changedColumns, dateIndexes, previousItem, previousHeaderMap` | buildMonthlyChangeSectionRows_ | convertMonthlyChangeReportDateValues_, displayValueForReport_ |
| FN-201 | `convertMonthlyChangeReportDateValues_` | `9_Workflow_MonthlyChange.gs:472–483` | `rowValues, reportHeaders, dateIndexes` | buildMonthlyChangeReportRow_ | getMonthlyChangeReportDateIndexes_, normalizeToDateObject_ |
| FN-202 | `getMonthlyChangeReportHeaders_` | `9_Workflow_MonthlyChange.gs:485–489` | `sourceHeaders` | buildMonthlyChangeReportSectionLayout_, buildMonthlyChangeSectionRows_, formatMonthlyChangeReportSectionSheet_, populateMonthlyChangeReportSections_ | none |
| FN-203 | `getMonthlyChangeReportDateIndexes_` | `9_Workflow_MonthlyChange.gs:491–497` | `headers` | convertMonthlyChangeReportDateValues_ | isDateLikeHeader_ |
| FN-204 | `buildMonthlyChangeReportSectionLayout_` | `9_Workflow_MonthlyChange.gs:499–518` | `reportSheet, sourceSheet, headers, monthParts` | buildMonthlyChangeReportForMonth_ | getMonthlyChangeReportHeaders_, padRowToWidth_ |
| FN-205 | `formatMonthlyChangeReportSectionSheet_` | `9_Workflow_MonthlyChange.gs:520–528` | `reportSheet, sourceHeaders` | buildMonthlyChangeReportForMonth_ | getMonthlyChangeReportHeaders_, loadDashboardConfig_ |
| FN-206 | `getPreviousRawDataSheet_` | `9_Workflow_MonthlyChange.gs:530–534` | `monthParts` | buildMonthlyChangeReportForMonth_ | none |
| FN-207 | `createDisenrolledList` | `_10_Workflow_Disenrolled.gs:11–23` | `none` | entry | createDisenrolledListForMonth_ |
| FN-208 | `createDisenrolledListForMonth_` | `_10_Workflow_Disenrolled.gs:25–61` | `monthParts, timing, options` | createDisenrolledList | getOrCreateDisenrolledExclusionSheet_, hideOldDisenrolledRows_, markFrameworkStep_, refreshIndexAfterSheetWorkflow_, syncDisenrolledExclusionFromRawData_ |
| FN-209 | `syncDisenrolledExclusionFromRawData_` | `_10_Workflow_Disenrolled.gs:65–158` | `exclusionSheet, rawSheet, monthParts, timing, timingPrefix` | createDisenrolledListForMonth_ | buildHeaderIndexMap_, clearSheetRuntimeCachesForSheet_, findHeaderIndex_, getDataValues_, getHeadersForSheetType_, getPMRIndex_, loadDashboardConfig_, markFrameworkStep_, normalizeCompareValue_, normalizePMR_, removeActiveDemoPPMRsFromDisenrolledExclusion_ |
| FN-210 | `hideOldDisenrolledRows_` | `_10_Workflow_Disenrolled.gs:165–195` | `sheet` | createDisenrolledListForMonth_ | createLocalDateOnly_, getDataValues_, hideRowNumberBatches_, normalizeToDateObject_ |
| FN-211 | `hideRowNumberBatches_` | `_10_Workflow_Disenrolled.gs:197–220` | `sheet, rowNumbers` | hideOldDisenrolledRows_ | none |
| FN-212 | `getOrCreateDisenrolledExclusionSheet_` | `_10_Workflow_Disenrolled.gs:224–259` | `ss, timing, timingPrefix` | createDisenrolledListForMonth_ | getHeadersForSheetType_, getSheetDefinitionByType_, loadDashboardConfig_ |

## 9. Consolidated Read/Write and Side-Effect Matrix

See stable effect identifiers below; all rows retain exact source evidence.

| ID | Function | Category | Evidence |
|---|---|---|---|
| EFFECT-0001 | `onOpen` | Archival/external workbook | `1_Config.gs:18` |
| EFFECT-0002 | `onOpen` | Archival/external workbook | `1_Config.gs:21` |
| EFFECT-0003 | `onOpen` | Timing/logging | `1_Config.gs:55` |
| EFFECT-0004 | `onOpen` | Archival/external workbook | `1_Config.gs:65` |
| EFFECT-0005 | `onOpen` | Archival/external workbook | `1_Config.gs:67` |
| EFFECT-0006 | `getRuntimeCache_` | Properties/runtime state | `1_Config.gs:156` |
| EFFECT-0007 | `getRuntimeCache_` | Properties/runtime state | `1_Config.gs:157` |
| EFFECT-0008 | `getRuntimeCache_` | Properties/runtime state | `1_Config.gs:163` |
| EFFECT-0009 | `getDocumentPropertiesCached_` | Properties/runtime state | `1_Config.gs:172` |
| EFFECT-0010 | `getArchiveSpreadsheetId_` | Archival/external workbook | `1_Config.gs:176` |
| EFFECT-0011 | `getArchiveSpreadsheetId_` | Archival/external workbook | `1_Config.gs:177` |
| EFFECT-0012 | `loadDashboardConfig_` | Worksheet read | `2_Dashboard_Loaders.gs:27` |
| EFFECT-0013 | `readDashboardSectionRows_` | Worksheet read | `2_Dashboard_Loaders.gs:55` |
| EFFECT-0014 | `getSectionEThemeForSheet_` | Worksheet read | `2_Dashboard_Loaders.gs:439` |
| EFFECT-0015 | `getSectionEThemeForSheet_` | Worksheet read | `2_Dashboard_Loaders.gs:442` |
| EFFECT-0016 | `getHeaders_` | Worksheet read | `3_Core_Helpers.gs:177` |
| EFFECT-0017 | `getHeaders_` | Worksheet read | `3_Core_Helpers.gs:178` |
| EFFECT-0018 | `getDataValues_` | Worksheet read | `3_Core_Helpers.gs:229` |
| EFFECT-0019 | `getDataValues_` | Worksheet read | `3_Core_Helpers.gs:230` |
| EFFECT-0020 | `getSheetDimensions_` | Worksheet read | `3_Core_Helpers.gs:238` |
| EFFECT-0021 | `startFrameworkTiming_` | Timing/logging | `3_Core_Helpers.gs:256` |
| EFFECT-0022 | `markFrameworkStep_` | Timing/logging | `3_Core_Helpers.gs:261` |
| EFFECT-0023 | `markRuntimeStep_` | Timing/logging | `3_Core_Helpers.gs:279` |
| EFFECT-0024 | `markRuntimeStep_` | Timing/logging | `3_Core_Helpers.gs:280` |
| EFFECT-0025 | `writeFrameworkTimingReport_` | Timing/logging | `3_Core_Helpers.gs:283` |
| EFFECT-0026 | `writeFrameworkTimingReport_` | Worksheet read | `3_Core_Helpers.gs:286` |
| EFFECT-0027 | `writeFrameworkTimingReport_` | Worksheet read | `3_Core_Helpers.gs:289` |
| EFFECT-0028 | `writeFrameworkTimingReport_` | Worksheet read | `3_Core_Helpers.gs:293` |
| EFFECT-0029 | `writeFrameworkTimingReport_` | Worksheet write | `3_Core_Helpers.gs:293` |
| EFFECT-0030 | `writeFrameworkTimingReport_` | Timing/logging | `3_Core_Helpers.gs:294` |
| EFFECT-0031 | `writeFrameworkTimingReport_` | Timing/logging | `3_Core_Helpers.gs:296` |
| EFFECT-0032 | `writeRuntimeTimingReport_` | Timing/logging | `3_Core_Helpers.gs:301` |
| EFFECT-0033 | `logBestEffortWarning_` | Timing/logging | `3_Core_Helpers.gs:306` |
| EFFECT-0034 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:15` |
| EFFECT-0035 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:17` |
| EFFECT-0036 | `configureArchiveSpreadsheetId` | UI/notification | `4_System_Index.gs:18` |
| EFFECT-0037 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:19` |
| EFFECT-0038 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:20` |
| EFFECT-0039 | `configureArchiveSpreadsheetId` | UI/notification | `4_System_Index.gs:25` |
| EFFECT-0040 | `configureArchiveSpreadsheetId` | UI/notification | `4_System_Index.gs:27` |
| EFFECT-0041 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:30` |
| EFFECT-0042 | `configureArchiveSpreadsheetId` | Properties/runtime state | `4_System_Index.gs:30` |
| EFFECT-0043 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:31` |
| EFFECT-0044 | `configureArchiveSpreadsheetId` | UI/notification | `4_System_Index.gs:31` |
| EFFECT-0045 | `configureIndexRestoreWebAppUrl` | Properties/runtime state | `4_System_Index.gs:36` |
| EFFECT-0046 | `configureIndexRestoreWebAppUrl` | UI/notification | `4_System_Index.gs:38` |
| EFFECT-0047 | `configureIndexRestoreWebAppUrl` | Properties/runtime state | `4_System_Index.gs:45` |
| EFFECT-0048 | `configureIndexRestoreWebAppUrl` | Properties/runtime state | `4_System_Index.gs:46` |
| EFFECT-0049 | `configureIndexRestoreWebAppUrl` | UI/notification | `4_System_Index.gs:49` |
| EFFECT-0050 | `hasIndexSheetShell_` | Worksheet read | `4_System_Index.gs:55` |
| EFFECT-0051 | `hasIndexSheetShell_` | Worksheet read | `4_System_Index.gs:57` |
| EFFECT-0052 | `hasIndexSheetShell_` | Worksheet read | `4_System_Index.gs:58` |
| EFFECT-0053 | `hasIndexSheetShell_` | Archival/external workbook | `4_System_Index.gs:59` |
| EFFECT-0054 | `buildIndexSheetShell_` | Archival/external workbook | `4_System_Index.gs:68` |
| EFFECT-0055 | `buildIndexSheetShell_` | Worksheet write | `4_System_Index.gs:70` |
| EFFECT-0056 | `buildIndexSheetShell_` | Archival/external workbook | `4_System_Index.gs:73` |
| EFFECT-0057 | `buildIndexSheetShell_` | Archival/external workbook | `4_System_Index.gs:74` |
| EFFECT-0058 | `buildIndexSheetShell_` | Archival/external workbook | `4_System_Index.gs:76` |
| EFFECT-0059 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:79` |
| EFFECT-0060 | `buildIndexSheetShell_` | Worksheet write | `4_System_Index.gs:79` |
| EFFECT-0061 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:82` |
| EFFECT-0062 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:82` |
| EFFECT-0063 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:83` |
| EFFECT-0064 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:83` |
| EFFECT-0065 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:85` |
| EFFECT-0066 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:85` |
| EFFECT-0067 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:86` |
| EFFECT-0068 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:86` |
| EFFECT-0069 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:88` |
| EFFECT-0070 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:88` |
| EFFECT-0071 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:89` |
| EFFECT-0072 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:89` |
| EFFECT-0073 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:96` |
| EFFECT-0074 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:99` |
| EFFECT-0075 | `updateIndexLocalWorkspace_` | Worksheet read | `4_System_Index.gs:118` |
| EFFECT-0076 | `updateIndexLocalWorkspace_` | Worksheet read | `4_System_Index.gs:166` |
| EFFECT-0077 | `updateIndexLocalWorkspace_` | Worksheet read | `4_System_Index.gs:169` |
| EFFECT-0078 | `updateIndexLocalWorkspace_` | Worksheet write | `4_System_Index.gs:169` |
| EFFECT-0079 | `updateIndexLocalWorkspace_` | Formatting | `4_System_Index.gs:169` |
| EFFECT-0080 | `updateIndexLocalWorkspace_` | Worksheet read | `4_System_Index.gs:172` |
| EFFECT-0081 | `updateIndexLocalWorkspace_` | Worksheet write | `4_System_Index.gs:172` |
| EFFECT-0082 | `updateIndexLocalWorkspace_` | Worksheet read | `4_System_Index.gs:175` |
| EFFECT-0083 | `updateIndexLocalWorkspace_` | Formatting | `4_System_Index.gs:175` |
| EFFECT-0084 | `localSheetRow_` | Worksheet read | `4_System_Index.gs:118` |
| EFFECT-0085 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:185` |
| EFFECT-0086 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:186` |
| EFFECT-0087 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:187` |
| EFFECT-0088 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:190` |
| EFFECT-0089 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:191` |
| EFFECT-0090 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:194` |
| EFFECT-0091 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:196` |
| EFFECT-0092 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:197` |
| EFFECT-0093 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:199` |
| EFFECT-0094 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:200` |
| EFFECT-0095 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:201` |
| EFFECT-0096 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:204` |
| EFFECT-0097 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:206` |
| EFFECT-0098 | `updateIndexArchiveWorkspace_` | Worksheet read | `4_System_Index.gs:210` |
| EFFECT-0099 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:211` |
| EFFECT-0100 | `updateIndexArchiveWorkspace_` | Worksheet read | `4_System_Index.gs:213` |
| EFFECT-0101 | `updateIndexArchiveWorkspace_` | Worksheet write | `4_System_Index.gs:213` |
| EFFECT-0102 | `updateIndexArchiveWorkspace_` | Formatting | `4_System_Index.gs:213` |
| EFFECT-0103 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:215` |
| EFFECT-0104 | `updateIndexArchiveWorkspace_` | Worksheet read | `4_System_Index.gs:216` |
| EFFECT-0105 | `updateIndexArchiveWorkspace_` | Worksheet write | `4_System_Index.gs:216` |
| EFFECT-0106 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:216` |
| EFFECT-0107 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:219` |
| EFFECT-0108 | `updateIndexSheet` | Worksheet read | `4_System_Index.gs:227` |
| EFFECT-0109 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:229` |
| EFFECT-0110 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:231` |
| EFFECT-0111 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:235` |
| EFFECT-0112 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:237` |
| EFFECT-0113 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:239` |
| EFFECT-0114 | `updateIndexSheet` | Sheet creation/copy | `4_System_Index.gs:244` |
| EFFECT-0115 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:248` |
| EFFECT-0116 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:250` |
| EFFECT-0117 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:251` |
| EFFECT-0118 | `updateIndexSheet` | Worksheet read | `4_System_Index.gs:253` |
| EFFECT-0119 | `updateIndexSheet` | Worksheet write | `4_System_Index.gs:253` |
| EFFECT-0120 | `updateIndexSheet` | Formatting | `4_System_Index.gs:253` |
| EFFECT-0121 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:254` |
| EFFECT-0122 | `restoreSheetFromActiveIndexRow` | Worksheet read | `4_System_Index.gs:283` |
| EFFECT-0123 | `restoreSheetFromActiveIndexRow` | Archival/external workbook | `4_System_Index.gs:289` |
| EFFECT-0124 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:289` |
| EFFECT-0125 | `restoreSheetFromActiveIndexRow` | Archival/external workbook | `4_System_Index.gs:297` |
| EFFECT-0126 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:297` |
| EFFECT-0127 | `restoreSheetFromActiveIndexRow` | Worksheet read | `4_System_Index.gs:301` |
| EFFECT-0128 | `restoreSheetFromActiveIndexRow` | Archival/external workbook | `4_System_Index.gs:304` |
| EFFECT-0129 | `restoreSheetFromActiveIndexRow` | Archival/external workbook | `4_System_Index.gs:305` |
| EFFECT-0130 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:305` |
| EFFECT-0131 | `restoreSheetFromActiveIndexRow` | Worksheet read | `4_System_Index.gs:309` |
| EFFECT-0132 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:310` |
| EFFECT-0133 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:315` |
| EFFECT-0134 | `restoreSheetFromActiveIndexRow` | Archival/external workbook | `4_System_Index.gs:323` |
| EFFECT-0135 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:325` |
| EFFECT-0136 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:329` |
| EFFECT-0137 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:333` |
| EFFECT-0138 | `restoreSheetFromArchiveWorkbook` | Worksheet read | `4_System_Index.gs:334` |
| EFFECT-0139 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:336` |
| EFFECT-0140 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:337` |
| EFFECT-0141 | `restoreSheetFromArchiveWorkbook` | Worksheet read | `4_System_Index.gs:338` |
| EFFECT-0142 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:338` |
| EFFECT-0143 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:340` |
| EFFECT-0144 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:342` |
| EFFECT-0145 | `restoreSheetFromArchiveWorkbook` | UI/notification | `4_System_Index.gs:342` |
| EFFECT-0146 | `restoreSheetFromArchiveWorkbook` | Worksheet write | `4_System_Index.gs:343` |
| EFFECT-0147 | `restoreSheetFromArchiveWorkbook` | Sheet creation/copy | `4_System_Index.gs:343` |
| EFFECT-0148 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:343` |
| EFFECT-0149 | `restoreSheetFromArchiveWorkbook` | Sheet visibility | `4_System_Index.gs:347` |
| EFFECT-0150 | `buildIndexRestoreHyperlinkFormula_` | Archival/external workbook | `4_System_Index.gs:359` |
| EFFECT-0151 | `getIndexRestoreWebAppUrl_` | Properties/runtime state | `4_System_Index.gs:366` |
| EFFECT-0152 | `doGet` | Lock/concurrency | `4_System_Index.gs:398` |
| EFFECT-0153 | `doGet` | Lock/concurrency | `4_System_Index.gs:402` |
| EFFECT-0154 | `doGet` | Archival/external workbook | `4_System_Index.gs:404` |
| EFFECT-0155 | `doGet` | Lock/concurrency | `4_System_Index.gs:416` |
| EFFECT-0156 | `doGet` | Lock/concurrency | `4_System_Index.gs:421` |
| EFFECT-0157 | `ensureGoldenMasterTemplate_` | Worksheet read | `5_System_Templates.gs:50` |
| EFFECT-0158 | `ensureGoldenMasterTemplate_` | Worksheet read | `5_System_Templates.gs:56` |
| EFFECT-0159 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:58` |
| EFFECT-0160 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:59` |
| EFFECT-0161 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:60` |
| EFFECT-0162 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:61` |
| EFFECT-0163 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:62` |
| EFFECT-0164 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:63` |
| EFFECT-0165 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:66` |
| EFFECT-0166 | `ensureGoldenMasterTemplate_` | Sheet visibility | `5_System_Templates.gs:67` |
| EFFECT-0167 | `ensureGoldenMasterTemplate_` | Timing/logging | `5_System_Templates.gs:69` |
| EFFECT-0168 | `forceBaseTemplateHidden_` | Worksheet read | `5_System_Templates.gs:147` |
| EFFECT-0169 | `forceBaseTemplateHidden_` | Sheet visibility | `5_System_Templates.gs:148` |
| EFFECT-0170 | `createOrRefreshTemplateFromDashboard_` | Worksheet read | `5_System_Templates.gs:158` |
| EFFECT-0171 | `createOrRefreshTemplateFromDashboard_` | Worksheet read | `5_System_Templates.gs:162` |
| EFFECT-0172 | `createOrRefreshTemplateFromDashboard_` | Worksheet write | `5_System_Templates.gs:163` |
| EFFECT-0173 | `createOrRefreshTemplateFromDashboard_` | Sheet creation/copy | `5_System_Templates.gs:163` |
| EFFECT-0174 | `createOrRefreshTemplateFromDashboard_` | Sheet visibility | `5_System_Templates.gs:175` |
| EFFECT-0175 | `buildTemplateFromDashboard_` | Timing/logging | `5_System_Templates.gs:180` |
| EFFECT-0176 | `buildTemplateFromDashboard_` | Timing/logging | `5_System_Templates.gs:189` |
| EFFECT-0177 | `clearTemplateForFullBuild_` | Worksheet read | `5_System_Templates.gs:199` |
| EFFECT-0178 | `clearTemplateForFullBuild_` | Worksheet write | `5_System_Templates.gs:199` |
| EFFECT-0179 | `clearTemplateForFullBuild_` | Worksheet write | `5_System_Templates.gs:203` |
| EFFECT-0180 | `clearTemplateForFullBuild_` | Timing/logging | `5_System_Templates.gs:208` |
| EFFECT-0181 | `applyTemplateBaseFormatting_` | Worksheet read | `5_System_Templates.gs:216` |
| EFFECT-0182 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:217` |
| EFFECT-0183 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:218` |
| EFFECT-0184 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:219` |
| EFFECT-0185 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:220` |
| EFFECT-0186 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:221` |
| EFFECT-0187 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:223` |
| EFFECT-0188 | `ensureTemplateFilter_` | Worksheet read | `5_System_Templates.gs:246` |
| EFFECT-0189 | `ensureTemplateFilter_` | Timing/logging | `5_System_Templates.gs:248` |
| EFFECT-0190 | `ensureTemplateFilter_` | Worksheet read | `5_System_Templates.gs:256` |
| EFFECT-0191 | `ensureTemplateFilter_` | Timing/logging | `5_System_Templates.gs:257` |
| EFFECT-0192 | `applyTemplateFreezeAndTabColor_` | Formatting | `5_System_Templates.gs:267` |
| EFFECT-0193 | `applyTemplateFreezeAndTabColor_` | Formatting | `5_System_Templates.gs:268` |
| EFFECT-0194 | `writeTemplateMetadata_` | Worksheet read | `5_System_Templates.gs:281` |
| EFFECT-0195 | `quickBuildAllTemplates` | UI/notification | `5_System_Templates.gs:317` |
| EFFECT-0196 | `quickBuildAllTemplates` | UI/notification | `5_System_Templates.gs:319` |
| EFFECT-0197 | `setReportTemplateVisibility_` | Sheet visibility | `5_System_Templates.gs:330` |
| EFFECT-0198 | `setReportTemplateVisibility_` | Sheet visibility | `5_System_Templates.gs:331` |
| EFFECT-0199 | `setReportTemplateVisibility_` | Sheet visibility | `5_System_Templates.gs:337` |
| EFFECT-0200 | `setReportTemplateVisibility_` | Sheet visibility | `5_System_Templates.gs:338` |
| EFFECT-0201 | `buildRefinedDataFromScratch` | Timing/logging | `7_Workflow_DemoP.gs:17` |
| EFFECT-0202 | `buildRefinedDataFromScratch` | Worksheet read | `7_Workflow_DemoP.gs:21` |
| EFFECT-0203 | `buildRefinedDataFromScratch` | Timing/logging | `7_Workflow_DemoP.gs:26` |
| EFFECT-0204 | `buildRefinedDataFromScratch` | UI/notification | `7_Workflow_DemoP.gs:27` |
| EFFECT-0205 | `getValidatedRawDataSheetForDemoPBuild_` | Timing/logging | `7_Workflow_DemoP.gs:36` |
| EFFECT-0206 | `getValidatedRawDataSheetForDemoPBuild_` | Timing/logging | `7_Workflow_DemoP.gs:44` |
| EFFECT-0207 | `processRefinedDataUnified_` | Timing/logging | `7_Workflow_DemoP.gs:121` |
| EFFECT-0208 | `updateDemoPReportDates_` | Worksheet read | `7_Workflow_DemoP.gs:511` |
| EFFECT-0209 | `updateDemoPReportDates_` | Worksheet write | `7_Workflow_DemoP.gs:511` |
| EFFECT-0210 | `updateDemoPReportDates_` | Formatting | `7_Workflow_DemoP.gs:511` |
| EFFECT-0211 | `updateDemoPReportDates_` | Worksheet read | `7_Workflow_DemoP.gs:512` |
| EFFECT-0212 | `updateDemoPReportDates_` | Worksheet write | `7_Workflow_DemoP.gs:512` |
| EFFECT-0213 | `updateDemoPReportDates_` | Formatting | `7_Workflow_DemoP.gs:512` |
| EFFECT-0214 | `updateDemoPReportDates_` | Worksheet read | `7_Workflow_DemoP.gs:513` |
| EFFECT-0215 | `updateDemoPReportDates_` | Worksheet write | `7_Workflow_DemoP.gs:513` |
| EFFECT-0216 | `updateDemoPReportDates_` | Formatting | `7_Workflow_DemoP.gs:513` |
| EFFECT-0217 | `enforceDemoPPostFlattenFormatting_` | Worksheet read | `7_Workflow_DemoP.gs:525` |
| EFFECT-0218 | `enforceDemoPPostFlattenFormatting_` | Worksheet read | `7_Workflow_DemoP.gs:526` |
| EFFECT-0219 | `enforceDemoPPostFlattenFormatting_` | Worksheet read | `7_Workflow_DemoP.gs:528` |
| EFFECT-0220 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:536` |
| EFFECT-0221 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:537` |
| EFFECT-0222 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:539` |
| EFFECT-0223 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:540` |
| EFFECT-0224 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:561` |
| EFFECT-0225 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:590` |
| EFFECT-0226 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:591` |
| EFFECT-0227 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet write | `7_Workflow_DemoP.gs:591` |
| EFFECT-0228 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:594` |
| EFFECT-0229 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet write | `7_Workflow_DemoP.gs:594` |
| EFFECT-0230 | `createMasterListForMonth_` | Timing/logging | `8_Workflow_MasterList.gs:14` |
| EFFECT-0231 | `createMasterListForMonth_` | Timing/logging | `8_Workflow_MasterList.gs:16` |
| EFFECT-0232 | `createMasterListForMonth_` | Timing/logging | `8_Workflow_MasterList.gs:17` |
| EFFECT-0233 | `createMasterListForMonth_` | UI/notification | `8_Workflow_MasterList.gs:27` |
| EFFECT-0234 | `createMasterListForMonth_` | Worksheet read | `8_Workflow_MasterList.gs:34` |
| EFFECT-0235 | `createMasterListForMonth_` | UI/notification | `8_Workflow_MasterList.gs:40` |
| EFFECT-0236 | `createMasterListForMonth_` | UI/notification | `8_Workflow_MasterList.gs:42` |
| EFFECT-0237 | `createMasterListForMonth_` | Sheet visibility | `8_Workflow_MasterList.gs:56` |
| EFFECT-0238 | `createMasterListForMonth_` | Worksheet read | `8_Workflow_MasterList.gs:85` |
| EFFECT-0239 | `createMasterListForMonth_` | Worksheet write | `8_Workflow_MasterList.gs:85` |
| EFFECT-0240 | `createMasterListForMonth_` | UI/notification | `8_Workflow_MasterList.gs:101` |
| EFFECT-0241 | `createMasterListForMonth_` | Timing/logging | `8_Workflow_MasterList.gs:111` |
| EFFECT-0242 | `createMasterListForMonth_` | Timing/logging | `8_Workflow_MasterList.gs:113` |
| EFFECT-0243 | `syncUnlockedCarePlanSourceIntoData_` | UI/notification | `8_Workflow_MasterList.gs:208` |
| EFFECT-0244 | `syncCarePlanDueSourceIntoData_` | UI/notification | `8_Workflow_MasterList.gs:219` |
| EFFECT-0245 | `validateStagedMasterListBeforeSwap_` | Worksheet read | `8_Workflow_MasterList.gs:433` |
| EFFECT-0246 | `validateStagedMasterListBeforeSwap_` | Worksheet read | `8_Workflow_MasterList.gs:434` |
| EFFECT-0247 | `promoteStagedMasterListSheet_` | Sheet deletion | `8_Workflow_MasterList.gs:440` |
| EFFECT-0248 | `promoteStagedMasterListSheet_` | Sheet visibility | `8_Workflow_MasterList.gs:444` |
| EFFECT-0249 | `cleanupFailedStagedMasterListSheet_` | Sheet deletion | `8_Workflow_MasterList.gs:455` |
| EFFECT-0250 | `buildMasterListHeadersBeforeDataCopy_` | Worksheet read | `8_Workflow_MasterList.gs:465` |
| EFFECT-0251 | `buildMasterListHeadersBeforeDataCopy_` | Worksheet read | `8_Workflow_MasterList.gs:472` |
| EFFECT-0252 | `buildMasterListHeadersBeforeDataCopy_` | Worksheet write | `8_Workflow_MasterList.gs:472` |
| EFFECT-0253 | `buildMonthlyChangeReportForMonth_` | UI/notification | `9_Workflow_MonthlyChange.gs:18` |
| EFFECT-0254 | `buildMonthlyChangeReportForMonth_` | Timing/logging | `9_Workflow_MonthlyChange.gs:22` |
| EFFECT-0255 | `buildMonthlyChangeReportForMonth_` | UI/notification | `9_Workflow_MonthlyChange.gs:30` |
| EFFECT-0256 | `buildMonthlyChangeReportForMonth_` | Worksheet read | `9_Workflow_MonthlyChange.gs:35` |
| EFFECT-0257 | `buildMonthlyChangeReportForMonth_` | Worksheet read | `9_Workflow_MonthlyChange.gs:40` |
| EFFECT-0258 | `buildMonthlyChangeReportForMonth_` | Worksheet write | `9_Workflow_MonthlyChange.gs:43` |
| EFFECT-0259 | `buildMonthlyChangeReportForMonth_` | Sheet creation/copy | `9_Workflow_MonthlyChange.gs:43` |
| EFFECT-0260 | `buildMonthlyChangeReportForMonth_` | Sheet visibility | `9_Workflow_MonthlyChange.gs:46` |
| EFFECT-0261 | `buildMonthlyChangeReportForMonth_` | Timing/logging | `9_Workflow_MonthlyChange.gs:54` |
| EFFECT-0262 | `buildMonthlyChangeReportForMonth_` | UI/notification | `9_Workflow_MonthlyChange.gs:60` |
| EFFECT-0263 | `compareRawDataForMonthlyChange_` | Worksheet read | `9_Workflow_MonthlyChange.gs:109` |
| EFFECT-0264 | `populateMonthlyChangeReportSections_` | Worksheet read | `9_Workflow_MonthlyChange.gs:430` |
| EFFECT-0265 | `populateMonthlyChangeReportSections_` | Worksheet write | `9_Workflow_MonthlyChange.gs:430` |
| EFFECT-0266 | `populateMonthlyChangeReportSections_` | Worksheet read | `9_Workflow_MonthlyChange.gs:433` |
| EFFECT-0267 | `populateMonthlyChangeReportSections_` | Worksheet read | `9_Workflow_MonthlyChange.gs:434` |
| EFFECT-0268 | `populateMonthlyChangeReportSections_` | Worksheet write | `9_Workflow_MonthlyChange.gs:434` |
| EFFECT-0269 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:505` |
| EFFECT-0270 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:505` |
| EFFECT-0271 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:506` |
| EFFECT-0272 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:506` |
| EFFECT-0273 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:508` |
| EFFECT-0274 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:508` |
| EFFECT-0275 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:509` |
| EFFECT-0276 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:509` |
| EFFECT-0277 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:510` |
| EFFECT-0278 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:510` |
| EFFECT-0279 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:513` |
| EFFECT-0280 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:513` |
| EFFECT-0281 | `buildMonthlyChangeReportSectionLayout_` | Formatting | `9_Workflow_MonthlyChange.gs:516` |
| EFFECT-0282 | `buildMonthlyChangeReportSectionLayout_` | Formatting | `9_Workflow_MonthlyChange.gs:517` |
| EFFECT-0283 | `formatMonthlyChangeReportSectionSheet_` | Formatting | `9_Workflow_MonthlyChange.gs:526` |
| EFFECT-0284 | `formatMonthlyChangeReportSectionSheet_` | Formatting | `9_Workflow_MonthlyChange.gs:527` |
| EFFECT-0285 | `createDisenrolledListForMonth_` | Timing/logging | `_10_Workflow_Disenrolled.gs:30` |
| EFFECT-0286 | `createDisenrolledListForMonth_` | UI/notification | `_10_Workflow_Disenrolled.gs:57` |
| EFFECT-0287 | `syncDisenrolledExclusionFromRawData_` | Timing/logging | `_10_Workflow_Disenrolled.gs:68` |
| EFFECT-0288 | `syncDisenrolledExclusionFromRawData_` | Worksheet read | `_10_Workflow_Disenrolled.gs:139` |
| EFFECT-0289 | `syncDisenrolledExclusionFromRawData_` | Worksheet read | `_10_Workflow_Disenrolled.gs:141` |
| EFFECT-0290 | `syncDisenrolledExclusionFromRawData_` | Worksheet write | `_10_Workflow_Disenrolled.gs:141` |
| EFFECT-0291 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet read | `_10_Workflow_Disenrolled.gs:225` |
| EFFECT-0292 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet read | `_10_Workflow_Disenrolled.gs:231` |
| EFFECT-0293 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet write | `_10_Workflow_Disenrolled.gs:233` |
| EFFECT-0294 | `getOrCreateDisenrolledExclusionSheet_` | Sheet creation/copy | `_10_Workflow_Disenrolled.gs:233` |
| EFFECT-0295 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet read | `_10_Workflow_Disenrolled.gs:242` |
| EFFECT-0296 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet write | `_10_Workflow_Disenrolled.gs:242` |
| EFFECT-0297 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet read | `_10_Workflow_Disenrolled.gs:248` |
| EFFECT-0298 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet write | `_10_Workflow_Disenrolled.gs:248` |
| EFFECT-0299 | `getOrCreateDisenrolledExclusionSheet_` | Formatting | `_10_Workflow_Disenrolled.gs:254` |
| EFFECT-0300 | `getOrCreateDisenrolledExclusionSheet_` | Formatting | `_10_Workflow_Disenrolled.gs:255` |
| EFFECT-0301 | `getOrCreateDisenrolledExclusionSheet_` | Sheet visibility | `_10_Workflow_Disenrolled.gs:257` |

## 10. Menu/Trigger-to-Worksheet Impact Matrix

Script 08 contains the standalone per-entry category matrix. This consolidated artifact preserves it by reference to stable entry and effect IDs and includes all source effects above.

## 11. Branch, Validation, Failure, and Recovery Catalog

- Static branch source rows: **560** (`BRANCH-0001` through `BRANCH-0560`; complete expressions in Script 06).
- Validation occurrences: **44** (`VAL-0001` through `VAL-0044`; complete expressions in Script 08).
- Timing occurrences: **106** (`TIME-0001` through `TIME-0106`; complete expressions in Script 08).
- Failure/recovery: early returns, throws, and catches are retained in traces; service failures may cause partial completion and have no general rollback.

## 12. Post-Upgrade Integrity Verification Report

Named calls within parsed bodies resolve, but **28 unique registered menu callbacks are absent (31 registration paths), a FAIL**. Deployment, container triggers, permissions, live sheets, dashboard data, template content, quotas, and runtime branch outcomes remain NOT VERIFIED. Static review warns about partial completion, dynamic argument semantics, and failure-path timing/lock/cache behavior.

## 13. Upgrade Delta Report

**NOT APPLICABLE:** no prior approved like-for-like modular baseline was supplied.

## 14. Defect and Risk Register

| ID | Classification | Finding |
|---|---|---|
| MTF-000 | FAIL | 28 unique registered callbacks are absent from the modular source (31 registration paths). |
| MTF-001 | NOT VERIFIED | Live workbook schema and service outcomes not executed. |
| MTF-002 | NOT VERIFIED | Container trigger/deployment inventories absent. |
| MTF-003 | WARNING | Writes can precede later failure without transactional rollback. |
| MTF-004 | WARNING | Dynamic JavaScript argument and callback semantics require runtime tests. |
| MTF-005 | WARNING | Timing, locks, cache invalidation, and notifications need failure/concurrency tests. |

## 15. Completeness Reconciliation and Certification

| Gate | Expected | Actual | Status |
|---|---:|---:|---|
| Menu registration reviewed → graph or terminating missing-root defect | 42 | 42 | FAIL (31 missing roots) |
| Trigger → graph | 2 | 2 | PASS |
| Menu registration reviewed → trace or terminating missing-root defect | 42 | 42 | FAIL (31 missing roots) |
| Trigger → trace | 2 | 2 | PASS |
| Reachable function → catalog | 161 | 161 | PASS |
| Named call occurrence → trace/edge | 390 | 390 | PASS |
| Effect occurrence → matrix | 301 | 301 | PASS |

### Final counts and certification

- Total top-level menus: **1**
- Total submenus: **15**
- Total menu commands: **42**
- Total triggers/runtime entries: **2**
- Total unique callbacks: **38**
- Total wrappers (static short-wrapper candidates): **27**
- Total reachable functions: **161**
- Total call-edge occurrences: **390**
- Total execution traces: **44**
- Total branch source rows: **560**
- Total PASS findings: **4**
- Total WARNING findings: **8**
- Total FAIL findings: **3**
- Total NOT VERIFIED findings: **2**
- Total blocked items: **0**
- Unresolved discrepancies: **28 absent unique callback declarations across 31 menu registrations; external runtime/deployment evidence remains explicitly NOT VERIFIED**
- Certification status: **COMPLETE WITH DOCUMENTED NOT VERIFIED ITEMS** (the audit is complete; production readiness fails because callback declarations are missing)
