# Script 03 — Menu Function Call Graphs, Part 2

**Status:** COMPLETE (static-source audit)
**Governing prompt:** `Master_List/Prompts/Menu_Trigger_and_Function_Execution_Trace_Review_Prompt (1).docx.md`, Sections 1–12 and modular protocol
**Production source:** the ten `.gs` files in `Master_List/Current Production Script/Modules`
**Declared source version:** `1.8.9.8.4.0` (`MASTER_LIST_MERGE_ML_VERSION`)
**Source fingerprint (SHA-256, filename-sorted concatenation):** `5ee0461c0e722ac55304df8187ff10998b109eda2167306f63cdd4f54af559ab`
**Method:** exhaustive static parsing of named declarations, menu callback strings, and named call occurrences. Google service dispatch, deployed trigger state, workbook contents, permissions, quotas, and runtime-selected data paths are **NOT VERIFIED** without the live Apps Script container.

## Assignment register

This assignment was fixed before tracing. Each command appears exactly once across Scripts 02 and 03. Part 1 retains the first three top-level submenu groups; Part 2 retains Maintenance/Rebuild, Start-up, and Index.

| ID | Order | Menu path | Callback | Registration evidence | Callback evidence | Status |
|---|---:|---|---|---|---|---|
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

## Complete hierarchical call graphs

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

## Call-edge register

| Edge ID | Caller | Callee | Evidence | Context |
|---|---|---|---|---|
| EDGE-0001 | `getDocumentPropertiesCached_` | `getRuntimeCache_` | `1_Config.gs:171` | direct lexical |
| EDGE-0002 | `getArchiveSpreadsheetId_` | `getDocumentPropertiesCached_` | `1_Config.gs:177` | direct lexical |
| EDGE-0003 | `loadDashboardConfig_` | `getRuntimeCache_` | `2_Dashboard_Loaders.gs:23` | direct lexical |
| EDGE-0004 | `loadDashboardConfig_` | `loadGlobalSettings_` | `2_Dashboard_Loaders.gs:31` | direct lexical |
| EDGE-0005 | `loadDashboardConfig_` | `loadTitleRows_` | `2_Dashboard_Loaders.gs:32` | direct lexical |
| EDGE-0006 | `loadDashboardConfig_` | `loadSheetDefinitions_` | `2_Dashboard_Loaders.gs:33` | direct lexical |
| EDGE-0007 | `loadDashboardConfig_` | `loadSheetBehaviors_` | `2_Dashboard_Loaders.gs:34` | direct lexical |
| EDGE-0008 | `loadDashboardConfig_` | `loadSystemSurfaces_` | `2_Dashboard_Loaders.gs:35` | direct lexical |
| EDGE-0009 | `loadDashboardConfig_` | `loadTabOrganization_` | `2_Dashboard_Loaders.gs:36` | direct lexical |
| EDGE-0010 | `loadDashboardConfig_` | `loadColumnDefinitions_` | `2_Dashboard_Loaders.gs:37` | direct lexical |
| EDGE-0011 | `loadDashboardConfig_` | `loadSheetHeaders_` | `2_Dashboard_Loaders.gs:38` | direct lexical |
| EDGE-0012 | `normalizeDashboardSheetTypeKey_` | `normalizeKey_` | `2_Dashboard_Loaders.gs:80` | direct lexical |
| EDGE-0013 | `loadGlobalSettings_` | `readDashboardSectionRows_` | `2_Dashboard_Loaders.gs:98` | direct lexical |
| EDGE-0014 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:110` | conditional/loop |
| EDGE-0015 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:111` | conditional/loop |
| EDGE-0016 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:112` | conditional/loop |
| EDGE-0017 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:113` | conditional/loop |
| EDGE-0018 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:114` | conditional/loop |
| EDGE-0019 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:117` | conditional/loop |
| EDGE-0020 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:118` | conditional/loop |
| EDGE-0021 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:119` | conditional/loop |
| EDGE-0022 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:120` | conditional/loop |
| EDGE-0023 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:121` | conditional/loop |
| EDGE-0024 | `loadGlobalSettings_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:122` | conditional/loop |
| EDGE-0025 | `loadTitleRows_` | `readDashboardSectionRows_` | `2_Dashboard_Loaders.gs:132` | direct lexical |
| EDGE-0026 | `loadTitleRows_` | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:136` | direct lexical |
| EDGE-0027 | `loadTitleRows_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:137` | direct lexical |
| EDGE-0028 | `loadTitleRows_` | `parseTitleRowConfigRow_` | `2_Dashboard_Loaders.gs:140` | direct lexical |
| EDGE-0029 | `parseTitleRowConfigRow_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:149` | direct lexical |
| EDGE-0030 | `parseTitleRowConfigRow_` | `normalizeTitleTargetCell_` | `2_Dashboard_Loaders.gs:156` | direct lexical |
| EDGE-0031 | `parseTitleRowConfigRow_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:157` | direct lexical |
| EDGE-0032 | `parseTitleRowConfigRow_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:158` | direct lexical |
| EDGE-0033 | `loadSheetDefinitions_` | `readDashboardSectionRows_` | `2_Dashboard_Loaders.gs:176` | direct lexical |
| EDGE-0034 | `loadSheetDefinitions_` | `isBlankCell_` | `2_Dashboard_Loaders.gs:178` | direct lexical |
| EDGE-0035 | `loadSheetDefinitions_` | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:181` | direct lexical |
| EDGE-0036 | `loadSheetDefinitions_` | `normalizeHex_` | `2_Dashboard_Loaders.gs:185` | direct lexical |
| EDGE-0037 | `loadSheetDefinitions_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:186` | direct lexical |
| EDGE-0038 | `loadSheetDefinitions_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:188` | direct lexical |
| EDGE-0039 | `loadSheetDefinitions_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:189` | conditional/loop |
| EDGE-0040 | `loadSheetDefinitions_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:191` | direct lexical |
| EDGE-0041 | `loadSheetDefinitions_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:191` | direct lexical |
| EDGE-0042 | `loadSheetDefinitions_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:192` | direct lexical |
| EDGE-0043 | `loadSheetBehaviors_` | `readDashboardSectionRows_` | `2_Dashboard_Loaders.gs:201` | direct lexical |
| EDGE-0044 | `loadSheetBehaviors_` | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:205` | direct lexical |
| EDGE-0045 | `loadSheetBehaviors_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:208` | direct lexical |
| EDGE-0046 | `loadSheetBehaviors_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:209` | direct lexical |
| EDGE-0047 | `loadSheetBehaviors_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:210` | direct lexical |
| EDGE-0048 | `loadSheetBehaviors_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:211` | direct lexical |
| EDGE-0049 | `loadSheetBehaviors_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:212` | direct lexical |
| EDGE-0050 | `loadSystemSurfaces_` | `readDashboardSectionRows_` | `2_Dashboard_Loaders.gs:224` | direct lexical |
| EDGE-0051 | `loadSystemSurfaces_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:233` | direct lexical |
| EDGE-0052 | `loadSystemSurfaces_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:234` | direct lexical |
| EDGE-0053 | `loadSystemSurfaces_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:235` | direct lexical |
| EDGE-0054 | `loadSystemSurfaces_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:236` | direct lexical |
| EDGE-0055 | `loadSystemSurfaces_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:237` | direct lexical |
| EDGE-0056 | `loadSystemSurfaces_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:238` | direct lexical |
| EDGE-0057 | `loadSystemSurfaces_` | `normalizeHex_` | `2_Dashboard_Loaders.gs:240` | direct lexical |
| EDGE-0058 | `loadTabOrganization_` | `readDashboardSectionRows_` | `2_Dashboard_Loaders.gs:251` | direct lexical |
| EDGE-0059 | `loadTabOrganization_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:260` | direct lexical |
| EDGE-0060 | `getTabOrganizationProfilesForSort_` | `loadDashboardConfig_` | `2_Dashboard_Loaders.gs:269` | direct lexical |
| EDGE-0061 | `loadColumnDefinitions_` | `readDashboardSectionRows_` | `2_Dashboard_Loaders.gs:277` | direct lexical |
| EDGE-0062 | `loadColumnDefinitions_` | `normalizeHeader_` | `2_Dashboard_Loaders.gs:281` | direct lexical |
| EDGE-0063 | `loadColumnDefinitions_` | `isBlankCell_` | `2_Dashboard_Loaders.gs:285` | direct lexical |
| EDGE-0064 | `loadColumnDefinitions_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:285` | conditional/loop |
| EDGE-0065 | `loadColumnDefinitions_` | `isBlankCell_` | `2_Dashboard_Loaders.gs:286` | direct lexical |
| EDGE-0066 | `loadColumnDefinitions_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:286` | conditional/loop |
| EDGE-0067 | `loadColumnDefinitions_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:287` | direct lexical |
| EDGE-0068 | `loadColumnDefinitions_` | `parseBoolean_` | `2_Dashboard_Loaders.gs:288` | direct lexical |
| EDGE-0069 | `loadSheetHeaders_` | `readDashboardSectionRows_` | `2_Dashboard_Loaders.gs:303` | direct lexical |
| EDGE-0070 | `loadSheetHeaders_` | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:307` | direct lexical |
| EDGE-0071 | `loadSheetHeaders_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:308` | direct lexical |
| EDGE-0072 | `loadSheetHeaders_` | `normalizeHeader_` | `2_Dashboard_Loaders.gs:309` | direct lexical |
| EDGE-0073 | `getSheetDefinitionByTypeOrNull_` | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:328` | direct lexical |
| EDGE-0074 | `getSheetDefinitionByTypeOrNull_` | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:330` | conditional/loop |
| EDGE-0075 | `getSheetDefinitionByType_` | `getSheetDefinitionByTypeOrNull_` | `2_Dashboard_Loaders.gs:335` | direct lexical |
| EDGE-0076 | `getBehaviorForSheetType_` | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:359` | direct lexical |
| EDGE-0077 | `getBehaviorForSheetType_` | `getDefaultBehavior_` | `2_Dashboard_Loaders.gs:361` | conditional/loop |
| EDGE-0078 | `getHeadersForSheetType_` | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:380` | direct lexical |
| EDGE-0079 | `getThemeColorsFromBase_` | `getRuntimeCache_` | `2_Dashboard_Loaders.gs:403` | direct lexical |
| EDGE-0080 | `getThemeColorsFromBase_` | `normalizeHex_` | `2_Dashboard_Loaders.gs:404` | direct lexical |
| EDGE-0081 | `getThemeColorsFromBase_` | `hexToHsl_` | `2_Dashboard_Loaders.gs:408` | direct lexical |
| EDGE-0082 | `getThemeColorsFromBase_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:409` | direct lexical |
| EDGE-0083 | `getThemeColorsFromBase_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:410` | direct lexical |
| EDGE-0084 | `getThemeColorsFromBase_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:411` | direct lexical |
| EDGE-0085 | `getThemeColorsFromBase_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:412` | direct lexical |
| EDGE-0086 | `getThemeColorsFromBase_` | `numberOrDefault_` | `2_Dashboard_Loaders.gs:413` | direct lexical |
| EDGE-0087 | `getThemeColorsFromBase_` | `hslToHex_` | `2_Dashboard_Loaders.gs:417` | direct lexical |
| EDGE-0088 | `getThemeColorsFromBase_` | `hslToHex_` | `2_Dashboard_Loaders.gs:418` | direct lexical |
| EDGE-0089 | `getThemeColorsFromBase_` | `hslToHex_` | `2_Dashboard_Loaders.gs:419` | direct lexical |
| EDGE-0090 | `getThemeColorsFromBase_` | `hslToHex_` | `2_Dashboard_Loaders.gs:420` | direct lexical |
| EDGE-0091 | `getThemeColorsFromBase_` | `hslToHex_` | `2_Dashboard_Loaders.gs:421` | direct lexical |
| EDGE-0092 | `normalizeKey_` | `normalizeText_` | `3_Core_Helpers.gs:32` | direct lexical |
| EDGE-0093 | `safeSheetName_` | `normalizeText_` | `3_Core_Helpers.gs:78` | direct lexical |
| EDGE-0094 | `normalizeRowsToWidth_` | `padRowToWidth_` | `3_Core_Helpers.gs:90` | conditional/loop |
| EDGE-0095 | `normalizeToDateObject_` | `isReasonableReportDate_` | `3_Core_Helpers.gs:98` | conditional/loop |
| EDGE-0096 | `normalizeToDateObject_` | `isReasonableReportDate_` | `3_Core_Helpers.gs:105` | direct lexical |
| EDGE-0097 | `normalizeToDateObject_` | `isReasonableReportDate_` | `3_Core_Helpers.gs:119` | conditional/loop |
| EDGE-0098 | `normalizeToDateObject_` | `isReasonableReportDate_` | `3_Core_Helpers.gs:126` | conditional/loop |
| EDGE-0099 | `normalizeToDateObject_` | `isReasonableReportDate_` | `3_Core_Helpers.gs:132` | conditional/loop |
| EDGE-0100 | `isSameDate_` | `normalizeToDateObject_` | `3_Core_Helpers.gs:145` | direct lexical |
| EDGE-0101 | `isSameDate_` | `normalizeToDateObject_` | `3_Core_Helpers.gs:146` | direct lexical |
| EDGE-0102 | `isDateLikeHeader_` | `normalizeHeader_` | `3_Core_Helpers.gs:151` | direct lexical |
| EDGE-0103 | `getHeaders_` | `getRuntimeCache_` | `3_Core_Helpers.gs:175` | conditional/loop |
| EDGE-0104 | `getHeaders_` | `getRuntimeCache_` | `3_Core_Helpers.gs:175` | conditional/loop |
| EDGE-0105 | `getHeaders_` | `getRuntimeCache_` | `3_Core_Helpers.gs:180` | direct lexical |
| EDGE-0106 | `getHeaderMap_` | `getRuntimeCache_` | `3_Core_Helpers.gs:186` | conditional/loop |
| EDGE-0107 | `getHeaderMap_` | `getRuntimeCache_` | `3_Core_Helpers.gs:186` | conditional/loop |
| EDGE-0108 | `getHeaderMap_` | `buildHeaderIndexMap_` | `3_Core_Helpers.gs:188` | direct lexical |
| EDGE-0109 | `getHeaderMap_` | `getHeaders_` | `3_Core_Helpers.gs:188` | direct lexical |
| EDGE-0110 | `getHeaderMap_` | `getRuntimeCache_` | `3_Core_Helpers.gs:189` | direct lexical |
| EDGE-0111 | `getPMRIndex_` | `findHeaderIndex_` | `3_Core_Helpers.gs:210` | direct lexical |
| EDGE-0112 | `getDOBIndex_` | `findHeaderIndex_` | `3_Core_Helpers.gs:214` | direct lexical |
| EDGE-0113 | `getDataValues_` | `getSheetDimensions_` | `3_Core_Helpers.gs:221` | direct lexical |
| EDGE-0114 | `getDataValues_` | `getHeaders_` | `3_Core_Helpers.gs:222` | direct lexical |
| EDGE-0115 | `getDataValues_` | `getHeaderMap_` | `3_Core_Helpers.gs:223` | direct lexical |
| EDGE-0116 | `getSheetDimensions_` | `getRuntimeCache_` | `3_Core_Helpers.gs:235` | conditional/loop |
| EDGE-0117 | `getSheetDimensions_` | `getRuntimeCache_` | `3_Core_Helpers.gs:235` | conditional/loop |
| EDGE-0118 | `getSheetDimensions_` | `getRuntimeCache_` | `3_Core_Helpers.gs:242` | direct lexical |
| EDGE-0119 | `clearSheetRuntimeCachesForSheet_` | `getRuntimeCache_` | `3_Core_Helpers.gs:249` | direct lexical |
| EDGE-0120 | `clearSheetRuntimeCachesForSheet_` | `getRuntimeCache_` | `3_Core_Helpers.gs:249` | conditional/loop |
| EDGE-0121 | `clearSheetRuntimeCachesForSheet_` | `getRuntimeCache_` | `3_Core_Helpers.gs:250` | direct lexical |
| EDGE-0122 | `clearSheetRuntimeCachesForSheet_` | `getRuntimeCache_` | `3_Core_Helpers.gs:250` | conditional/loop |
| EDGE-0123 | `clearSheetRuntimeCachesForSheet_` | `getRuntimeCache_` | `3_Core_Helpers.gs:251` | direct lexical |
| EDGE-0124 | `markRuntimeStep_` | `markFrameworkStep_` | `3_Core_Helpers.gs:280` | direct lexical |
| EDGE-0125 | `writeFrameworkTimingReport_` | `padRowToWidth_` | `3_Core_Helpers.gs:290` | direct lexical |
| EDGE-0126 | `writeRuntimeTimingReport_` | `writeFrameworkTimingReport_` | `3_Core_Helpers.gs:301` | direct lexical |
| EDGE-0127 | `configureArchiveSpreadsheetId` | `getArchiveSpreadsheetId_` | `4_System_Index.gs:17` | direct lexical |
| EDGE-0128 | `configureIndexRestoreWebAppUrl` | `getIndexRestoreWebAppUrl_` | `4_System_Index.gs:37` | direct lexical |
| EDGE-0129 | `configureIndexRestoreWebAppUrl` | `updateIndexSheet` | `4_System_Index.gs:48` | direct lexical |
| EDGE-0130 | `buildIndexSheetShell_` | `loadDashboardConfig_` | `4_System_Index.gs:66` | direct lexical |
| EDGE-0131 | `buildIndexSheetShell_` | `getSectionEThemeForSheet_` | `4_System_Index.gs:67` | direct lexical |
| EDGE-0132 | `buildIndexSheetShell_` | `getArchiveSpreadsheetId_` | `4_System_Index.gs:68` | direct lexical |
| EDGE-0133 | `updateIndexLocalWorkspace_` | `localSheetRow_` | `4_System_Index.gs:117` | direct lexical |
| EDGE-0134 | `updateIndexLocalWorkspace_` | `getTabOrganizationProfilesForSort_` | `4_System_Index.gs:130` | direct lexical |
| EDGE-0135 | `updateIndexLocalWorkspace_` | `localSheetRow_` | `4_System_Index.gs:157` | direct lexical |
| EDGE-0136 | `updateIndexArchiveWorkspace_` | `getArchiveSpreadsheetId_` | `4_System_Index.gs:187` | direct lexical |
| EDGE-0137 | `updateIndexArchiveWorkspace_` | `buildIndexRestoreHyperlinkFormula_` | `4_System_Index.gs:201` | direct lexical |
| EDGE-0138 | `updateIndexSheet` | `hasIndexSheetShell_` | `4_System_Index.gs:243` | conditional/loop |
| EDGE-0139 | `updateIndexSheet` | `buildIndexSheetShell_` | `4_System_Index.gs:244` | direct lexical |
| EDGE-0140 | `updateIndexSheet` | `getSectionEThemeForSheet_` | `4_System_Index.gs:247` | direct lexical |
| EDGE-0141 | `updateIndexSheet` | `updateIndexLocalWorkspace_` | `4_System_Index.gs:250` | conditional/loop |
| EDGE-0142 | `updateIndexSheet` | `updateIndexArchiveWorkspace_` | `4_System_Index.gs:251` | conditional/loop |
| EDGE-0143 | `refreshIndexAfterSheetWorkflow_` | `updateIndexSheet` | `4_System_Index.gs:264` | direct lexical |
| EDGE-0144 | `refreshIndexAfterSheetWorkflow_` | `logBestEffortWarning_` | `4_System_Index.gs:266` | direct lexical |
| EDGE-0145 | `restoreSheetFromActiveIndexRow` | `restoreSheetFromArchiveWorkbook` | `4_System_Index.gs:323` | direct lexical |
| EDGE-0146 | `restoreSheetFromArchiveWorkbook` | `getArchiveSpreadsheetId_` | `4_System_Index.gs:336` | direct lexical |
| EDGE-0147 | `restoreSheetFromArchiveWorkbook` | `updateIndexSheet` | `4_System_Index.gs:348` | direct lexical |
| EDGE-0148 | `buildIndexRestoreHyperlinkFormula_` | `getIndexRestoreWebAppUrl_` | `4_System_Index.gs:357` | direct lexical |
| EDGE-0153 | `ensureGoldenMasterTemplate_` | `markFrameworkStep_` | `5_System_Templates.gs:69` | conditional/loop |
| EDGE-0154 | `forceBaseTemplateHidden_` | `logBestEffortWarning_` | `5_System_Templates.gs:150` | direct lexical |
| EDGE-0155 | `createOrRefreshTemplateFromDashboard_` | `ensureGoldenMasterTemplate_` | `5_System_Templates.gs:162` | conditional/loop |
| EDGE-0156 | `createOrRefreshTemplateFromDashboard_` | `getHeadersForSheetType_` | `5_System_Templates.gs:167` | direct lexical |
| EDGE-0157 | `createOrRefreshTemplateFromDashboard_` | `getBehaviorForSheetType_` | `5_System_Templates.gs:168` | direct lexical |
| EDGE-0158 | `createOrRefreshTemplateFromDashboard_` | `buildTemplateFromDashboard_` | `5_System_Templates.gs:172` | direct lexical |
| EDGE-0159 | `buildTemplateFromDashboard_` | `markFrameworkStep_` | `5_System_Templates.gs:180` | direct lexical |
| EDGE-0160 | `buildTemplateFromDashboard_` | `clearTemplateForFullBuild_` | `5_System_Templates.gs:183` | direct lexical |
| EDGE-0161 | `buildTemplateFromDashboard_` | `applyTemplateBaseFormatting_` | `5_System_Templates.gs:185` | direct lexical |
| EDGE-0162 | `buildTemplateFromDashboard_` | `writeTemplateMetadata_` | `5_System_Templates.gs:186` | direct lexical |
| EDGE-0163 | `buildTemplateFromDashboard_` | `applyTemplateFreezeAndTabColor_` | `5_System_Templates.gs:187` | direct lexical |
| EDGE-0164 | `buildTemplateFromDashboard_` | `markFrameworkStep_` | `5_System_Templates.gs:189` | direct lexical |
| EDGE-0165 | `clearTemplateForFullBuild_` | `markFrameworkStep_` | `5_System_Templates.gs:208` | direct lexical |
| EDGE-0166 | `applyTemplateBaseFormatting_` | `getThemeColorsFromBase_` | `5_System_Templates.gs:213` | direct lexical |
| EDGE-0167 | `applyTemplateBaseFormatting_` | `ensureTemplateFilter_` | `5_System_Templates.gs:234` | direct lexical |
| EDGE-0168 | `ensureTemplateFilter_` | `markFrameworkStep_` | `5_System_Templates.gs:248` | conditional/loop |
| EDGE-0169 | `ensureTemplateFilter_` | `markFrameworkStep_` | `5_System_Templates.gs:257` | conditional/loop |
| EDGE-0170 | `applyTemplateFreezeAndTabColor_` | `getThemeColorsFromBase_` | `5_System_Templates.gs:265` | direct lexical |
| EDGE-0171 | `buildAllTemplatesAndValidate` | `loadDashboardConfig_` | `5_System_Templates.gs:289` | direct lexical |
| EDGE-0172 | `buildAllTemplatesAndValidate` | `ensureGoldenMasterTemplate_` | `5_System_Templates.gs:290` | direct lexical |
| EDGE-0173 | `buildAllTemplatesAndValidate` | `createOrRefreshTemplateFromDashboard_` | `5_System_Templates.gs:297` | direct lexical |
| EDGE-0174 | `buildAllTemplatesAndValidate` | `logBestEffortWarning_` | `5_System_Templates.gs:301` | direct lexical |
| EDGE-0175 | `buildAllTemplatesAndValidate` | `setReportTemplateVisibility_` | `5_System_Templates.gs:306` | direct lexical |
| EDGE-0176 | `buildAllTemplatesAndValidate` | `forceBaseTemplateHidden_` | `5_System_Templates.gs:307` | direct lexical |
| EDGE-0178 | `setReportTemplateVisibility_` | `forceBaseTemplateHidden_` | `5_System_Templates.gs:341` | direct lexical |
| EDGE-0179 | `buildRefinedDataFromScratch` | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:16` | direct lexical |
| EDGE-0180 | `buildRefinedDataFromScratch` | `markFrameworkStep_` | `7_Workflow_DemoP.gs:17` | direct lexical |
| EDGE-0181 | `buildRefinedDataFromScratch` | `createActiveDemoPFromRawData_` | `7_Workflow_DemoP.gs:19` | direct lexical |
| EDGE-0182 | `buildRefinedDataFromScratch` | `enforceDemoPPostFlattenFormatting_` | `7_Workflow_DemoP.gs:23` | direct lexical |
| EDGE-0183 | `buildRefinedDataFromScratch` | `refreshIndexAfterSheetWorkflow_` | `7_Workflow_DemoP.gs:24` | direct lexical |
| EDGE-0184 | `buildRefinedDataFromScratch` | `markFrameworkStep_` | `7_Workflow_DemoP.gs:26` | direct lexical |
| EDGE-0185 | `getValidatedRawDataSheetForDemoPBuild_` | `markRuntimeStep_` | `7_Workflow_DemoP.gs:36` | conditional/loop |
| EDGE-0186 | `getValidatedRawDataSheetForDemoPBuild_` | `isStrictRawDataSheetCandidateForDemoP_` | `7_Workflow_DemoP.gs:42` | conditional/loop |
| EDGE-0187 | `getValidatedRawDataSheetForDemoPBuild_` | `markRuntimeStep_` | `7_Workflow_DemoP.gs:44` | conditional/loop |
| EDGE-0188 | `createActiveDemoPFromRawData_` | `loadDashboardConfig_` | `7_Workflow_DemoP.gs:66` | conditional/loop |
| EDGE-0189 | `createActiveDemoPFromRawData_` | `buildHeaderIndexMap_` | `7_Workflow_DemoP.gs:70` | direct lexical |
| EDGE-0190 | `createActiveDemoPFromRawData_` | `processRefinedDataUnified_` | `7_Workflow_DemoP.gs:71` | direct lexical |
| EDGE-0191 | `createActiveDemoPFromRawData_` | `updateDemoPReportDates_` | `7_Workflow_DemoP.gs:78` | direct lexical |
| EDGE-0192 | `createActiveDemoPFromRawData_` | `clearSheetRuntimeCachesForSheet_` | `7_Workflow_DemoP.gs:82` | direct lexical |
| EDGE-0193 | `processRefinedDataUnified_` | `safeFlattenAndProcessContacts_` | `7_Workflow_DemoP.gs:117` | direct lexical |
| EDGE-0194 | `processRefinedDataUnified_` | `processDemoPFreshRowsInMemory_` | `7_Workflow_DemoP.gs:118` | direct lexical |
| EDGE-0195 | `processRefinedDataUnified_` | `markFrameworkStep_` | `7_Workflow_DemoP.gs:121` | conditional/loop |
| EDGE-0196 | `safeFlattenAndProcessContacts_` | `flattenDemoPContactRowsInMemory_` | `7_Workflow_DemoP.gs:128` | direct lexical |
| EDGE-0197 | `safeFlattenAndProcessContacts_` | `logBestEffortWarning_` | `7_Workflow_DemoP.gs:130` | direct lexical |
| EDGE-0198 | `processDemoPFreshRowsInMemory_` | `populateParticipantNameData_` | `7_Workflow_DemoP.gs:136` | direct lexical |
| EDGE-0199 | `processDemoPFreshRowsInMemory_` | `populateDemoPNameData_` | `7_Workflow_DemoP.gs:137` | direct lexical |
| EDGE-0200 | `processDemoPFreshRowsInMemory_` | `updateBannerColumnData_` | `7_Workflow_DemoP.gs:138` | direct lexical |
| EDGE-0201 | `processDemoPFreshRowsInMemory_` | `combineAddressesData_` | `7_Workflow_DemoP.gs:139` | direct lexical |
| EDGE-0202 | `processDemoPFreshRowsInMemory_` | `handleLanguageData_` | `7_Workflow_DemoP.gs:140` | direct lexical |
| EDGE-0203 | `processDemoPFreshRowsInMemory_` | `splitPhoneNumbersData_` | `7_Workflow_DemoP.gs:141` | direct lexical |
| EDGE-0204 | `processDemoPFreshRowsInMemory_` | `runMasterContactProcessData_` | `7_Workflow_DemoP.gs:142` | direct lexical |
| EDGE-0205 | `processDemoPFreshRowsInMemory_` | `combineNotesSummaryData_` | `7_Workflow_DemoP.gs:143` | direct lexical |
| EDGE-0206 | `flattenDemoPContactRowsInMemory_` | `buildHeaderIndexMap_` | `7_Workflow_DemoP.gs:150` | conditional/loop |
| EDGE-0207 | `flattenDemoPContactRowsInMemory_` | `getPMRIndex_` | `7_Workflow_DemoP.gs:152` | direct lexical |
| EDGE-0208 | `flattenDemoPContactRowsInMemory_` | `normalizePMR_` | `7_Workflow_DemoP.gs:162` | direct lexical |
| EDGE-0209 | `flattenDemoPContactRowsInMemory_` | `buildDemoPContactSummaryForFlatRecord_` | `7_Workflow_DemoP.gs:179` | direct lexical |
| EDGE-0210 | `flattenDemoPContactRowsInMemory_` | `normalizeCompareValue_` | `7_Workflow_DemoP.gs:185` | conditional/loop |
| EDGE-0211 | `flattenDemoPContactRowsInMemory_` | `normalizeCompareValue_` | `7_Workflow_DemoP.gs:188` | conditional/loop |
| EDGE-0212 | `flattenDemoPContactRowsInMemory_` | `logBestEffortWarning_` | `7_Workflow_DemoP.gs:192` | direct lexical |
| EDGE-0213 | `flattenDemoPContactRowsInMemory_` | `sortDemoPFlatRows_` | `7_Workflow_DemoP.gs:198` | direct lexical |
| EDGE-0214 | `populateParticipantNameData_` | `normalizeCompareValue_` | `7_Workflow_DemoP.gs:238` | conditional/loop |
| EDGE-0215 | `populateDemoPNameData_` | `normalizeCompareValue_` | `7_Workflow_DemoP.gs:252` | conditional/loop |
| EDGE-0216 | `updateBannerColumnData_` | `normalizeCompareValue_` | `7_Workflow_DemoP.gs:272` | conditional/loop |
| EDGE-0217 | `combineNotesSummaryData_` | `normalizeCompareValue_` | `7_Workflow_DemoP.gs:345` | conditional/loop |
| EDGE-0218 | `enforceDemoPPostFlattenFormatting_` | `applyTemplateColumnWidths_` | `7_Workflow_DemoP.gs:522` | direct lexical |
| EDGE-0219 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `getHeaders_` | `7_Workflow_DemoP.gs:543` | direct lexical |
| EDGE-0220 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `buildHeaderIndexMap_` | `7_Workflow_DemoP.gs:544` | direct lexical |
| EDGE-0221 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `getPMRIndex_` | `7_Workflow_DemoP.gs:545` | direct lexical |
| EDGE-0222 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `findHeaderIndex_` | `7_Workflow_DemoP.gs:547` | direct lexical |
| EDGE-0223 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `getDataValues_` | `7_Workflow_DemoP.gs:550` | direct lexical |
| EDGE-0224 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `getPMRIndex_` | `7_Workflow_DemoP.gs:551` | conditional/loop |
| EDGE-0225 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `normalizePMR_` | `7_Workflow_DemoP.gs:556` | direct lexical |
| EDGE-0226 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `normalizePMR_` | `7_Workflow_DemoP.gs:565` | direct lexical |
| EDGE-0227 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `normalizeCompareValue_` | `7_Workflow_DemoP.gs:569` | conditional/loop |
| EDGE-0228 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `normalizePMR_` | `7_Workflow_DemoP.gs:581` | direct lexical |
| EDGE-0229 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `normalizeRowsToWidth_` | `7_Workflow_DemoP.gs:593` | direct lexical |
| EDGE-0230 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `clearSheetRuntimeCachesForSheet_` | `7_Workflow_DemoP.gs:596` | direct lexical |
| EDGE-0231 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `logBestEffortWarning_` | `7_Workflow_DemoP.gs:597` | direct lexical |
| EDGE-0232 | `createMasterListForMonth_` | `startFrameworkTiming_` | `8_Workflow_MasterList.gs:14` | conditional/loop |
| EDGE-0233 | `createMasterListForMonth_` | `markFrameworkStep_` | `8_Workflow_MasterList.gs:16` | conditional/loop |
| EDGE-0234 | `createMasterListForMonth_` | `markRuntimeStep_` | `8_Workflow_MasterList.gs:17` | direct lexical |
| EDGE-0235 | `createMasterListForMonth_` | `writeRuntimeTimingReport_` | `8_Workflow_MasterList.gs:29` | conditional/loop |
| EDGE-0236 | `createMasterListForMonth_` | `writeRuntimeTimingReport_` | `8_Workflow_MasterList.gs:44` | conditional/loop |
| EDGE-0237 | `createMasterListForMonth_` | `buildStagedMasterListSheetName_` | `8_Workflow_MasterList.gs:52` | conditional/loop |
| EDGE-0238 | `createMasterListForMonth_` | `createMasterListSheetFromTemplate_` | `8_Workflow_MasterList.gs:53` | direct lexical |
| EDGE-0239 | `createMasterListForMonth_` | `buildMasterListHeadersBeforeDataCopy_` | `8_Workflow_MasterList.gs:59` | direct lexical |
| EDGE-0240 | `createMasterListForMonth_` | `getHeaders_` | `8_Workflow_MasterList.gs:62` | direct lexical |
| EDGE-0241 | `createMasterListForMonth_` | `getHeaderMap_` | `8_Workflow_MasterList.gs:63` | direct lexical |
| EDGE-0242 | `createMasterListForMonth_` | `buildPrimaryDemoPRowsInMemory_` | `8_Workflow_MasterList.gs:64` | direct lexical |
| EDGE-0243 | `createMasterListForMonth_` | `syncUnlockedCarePlanSourceIntoData_` | `8_Workflow_MasterList.gs:75` | direct lexical |
| EDGE-0244 | `createMasterListForMonth_` | `syncCarePlanDueSourceIntoData_` | `8_Workflow_MasterList.gs:78` | direct lexical |
| EDGE-0245 | `createMasterListForMonth_` | `promoteStagedMasterListSheet_` | `8_Workflow_MasterList.gs:89` | direct lexical |
| EDGE-0246 | `createMasterListForMonth_` | `writeRuntimeTimingReport_` | `8_Workflow_MasterList.gs:100` | direct lexical |
| EDGE-0247 | `createMasterListForMonth_` | `formatSeconds_` | `8_Workflow_MasterList.gs:101` | direct lexical |
| EDGE-0248 | `createMasterListForMonth_` | `cleanupFailedStagedMasterListSheet_` | `8_Workflow_MasterList.gs:107` | direct lexical |
| EDGE-0249 | `createMasterListForMonth_` | `logBestEffortWarning_` | `8_Workflow_MasterList.gs:109` | direct lexical |
| EDGE-0250 | `createMasterListForMonth_` | `markFrameworkStep_` | `8_Workflow_MasterList.gs:111` | conditional/loop |
| EDGE-0251 | `createMasterListForMonth_` | `markRuntimeStep_` | `8_Workflow_MasterList.gs:113` | direct lexical |
| EDGE-0252 | `createMasterListForMonth_` | `writeRuntimeTimingReport_` | `8_Workflow_MasterList.gs:114` | direct lexical |
| EDGE-0253 | `createMasterList` | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:123` | direct lexical |
| EDGE-0254 | `buildPrimaryDemoPRowsInMemory_` | `getDataValues_` | `8_Workflow_MasterList.gs:129` | direct lexical |
| EDGE-0255 | `buildPrimaryDemoPRowsInMemory_` | `getPMRIndex_` | `8_Workflow_MasterList.gs:132` | direct lexical |
| EDGE-0256 | `buildPrimaryDemoPRowsInMemory_` | `getMasterTargetIndex_` | `8_Workflow_MasterList.gs:142` | direct lexical |
| EDGE-0257 | `buildPrimaryDemoPRowsInMemory_` | `normalizePMR_` | `8_Workflow_MasterList.gs:154` | direct lexical |
| EDGE-0258 | `buildPrimaryDemoPRowsInMemory_` | `getMasterTargetIndex_` | `8_Workflow_MasterList.gs:161` | direct lexical |
| EDGE-0259 | `syncUnlockedCarePlanSourceIntoData_` | `buildSourceMapBySingleKeyForPart5_` | `8_Workflow_MasterList.gs:210` | direct lexical |
| EDGE-0260 | `syncUnlockedCarePlanSourceIntoData_` | `syncRowsFromSourceMapData_` | `8_Workflow_MasterList.gs:211` | direct lexical |
| EDGE-0261 | `syncCarePlanDueSourceIntoData_` | `buildSourceMapBySingleKeyForPart5_` | `8_Workflow_MasterList.gs:221` | direct lexical |
| EDGE-0262 | `syncCarePlanDueSourceIntoData_` | `syncRowsFromSourceMapData_` | `8_Workflow_MasterList.gs:222` | direct lexical |
| EDGE-0263 | `syncRowsFromSourceMapData_` | `normalizeSyncFieldPairs_` | `8_Workflow_MasterList.gs:231` | direct lexical |
| EDGE-0264 | `syncRowsFromSourceMapData_` | `normalizeSyncKey_` | `8_Workflow_MasterList.gs:236` | direct lexical |
| EDGE-0265 | `buildSourceMapBySingleKeyForPart5_` | `getDataValues_` | `8_Workflow_MasterList.gs:250` | direct lexical |
| EDGE-0266 | `buildSourceMapBySingleKeyForPart5_` | `normalizeSyncKey_` | `8_Workflow_MasterList.gs:258` | direct lexical |
| EDGE-0267 | `runMasterContactProcessData_` | `writePMRContactsToParticipantRows_` | `8_Workflow_MasterList.gs:293` | direct lexical |
| EDGE-0268 | `writePMRContactsToParticipantRows_` | `getPMRIndex_` | `8_Workflow_MasterList.gs:306` | direct lexical |
| EDGE-0269 | `writePMRContactsToParticipantRows_` | `normalizePMR_` | `8_Workflow_MasterList.gs:316` | conditional/loop |
| EDGE-0270 | `writePMRContactsToParticipantRows_` | `buildParticipantContactKey_` | `8_Workflow_MasterList.gs:319` | direct lexical |
| EDGE-0271 | `writePMRContactsToParticipantRows_` | `capitalizeContactPart_` | `8_Workflow_MasterList.gs:340` | conditional/loop |
| EDGE-0272 | `writePMRContactsToParticipantRows_` | `capitalizeContactPart_` | `8_Workflow_MasterList.gs:341` | conditional/loop |
| EDGE-0273 | `writePMRContactsToParticipantRows_` | `buildParticipantContactKey_` | `8_Workflow_MasterList.gs:349` | direct lexical |
| EDGE-0274 | `writePMRContactsToParticipantRows_` | `normalizeCompareValue_` | `8_Workflow_MasterList.gs:356` | conditional/loop |
| EDGE-0275 | `writePMRContactsToParticipantRows_` | `formatRankedContact_` | `8_Workflow_MasterList.gs:357` | conditional/loop |
| EDGE-0276 | `writePMRContactsToParticipantRows_` | `normalizeCompareValue_` | `8_Workflow_MasterList.gs:361` | conditional/loop |
| EDGE-0277 | `buildParticipantContactKey_` | `normalizePMR_` | `8_Workflow_MasterList.gs:370` | conditional/loop |
| EDGE-0278 | `buildParticipantContactKey_` | `normalizeKeyPart_` | `8_Workflow_MasterList.gs:372` | conditional/loop |
| EDGE-0279 | `buildParticipantContactKey_` | `normalizeKeyPart_` | `8_Workflow_MasterList.gs:373` | conditional/loop |
| EDGE-0280 | `buildStagedMasterListSheetName_` | `safeSheetName_` | `8_Workflow_MasterList.gs:423` | direct lexical |
| EDGE-0281 | `validateStagedMasterListBeforeSwap_` | `isStagedMasterListSheet_` | `8_Workflow_MasterList.gs:432` | conditional/loop |
| EDGE-0282 | `promoteStagedMasterListSheet_` | `validateStagedMasterListBeforeSwap_` | `8_Workflow_MasterList.gs:438` | direct lexical |
| EDGE-0283 | `promoteStagedMasterListSheet_` | `clearSheetRuntimeCachesForSheet_` | `8_Workflow_MasterList.gs:445` | direct lexical |
| EDGE-0284 | `cleanupFailedStagedMasterListSheet_` | `isStagedMasterListSheet_` | `8_Workflow_MasterList.gs:453` | conditional/loop |
| EDGE-0285 | `cleanupFailedStagedMasterListSheet_` | `logBestEffortWarning_` | `8_Workflow_MasterList.gs:458` | direct lexical |
| EDGE-0286 | `buildMasterListHeadersBeforeDataCopy_` | `getHeaders_` | `8_Workflow_MasterList.gs:466` | direct lexical |
| EDGE-0287 | `buildMasterListHeadersBeforeDataCopy_` | `clearSheetRuntimeCachesForSheet_` | `8_Workflow_MasterList.gs:473` | direct lexical |
| EDGE-0288 | `buildMonthlyChangeReportForMonth_` | `getPreviousRawDataSheet_` | `9_Workflow_MonthlyChange.gs:15` | direct lexical |
| EDGE-0289 | `buildMonthlyChangeReportForMonth_` | `markRuntimeStep_` | `9_Workflow_MonthlyChange.gs:22` | direct lexical |
| EDGE-0290 | `buildMonthlyChangeReportForMonth_` | `compareRawDataForMonthlyChange_` | `9_Workflow_MonthlyChange.gs:23` | direct lexical |
| EDGE-0291 | `buildMonthlyChangeReportForMonth_` | `loadDashboardConfig_` | `9_Workflow_MonthlyChange.gs:38` | direct lexical |
| EDGE-0292 | `buildMonthlyChangeReportForMonth_` | `getSheetDefinitionByType_` | `9_Workflow_MonthlyChange.gs:39` | direct lexical |
| EDGE-0293 | `buildMonthlyChangeReportForMonth_` | `buildMonthlyChangeReportSectionLayout_` | `9_Workflow_MonthlyChange.gs:48` | direct lexical |
| EDGE-0294 | `buildMonthlyChangeReportForMonth_` | `populateMonthlyChangeReportSections_` | `9_Workflow_MonthlyChange.gs:49` | direct lexical |
| EDGE-0295 | `buildMonthlyChangeReportForMonth_` | `formatMonthlyChangeReportSectionSheet_` | `9_Workflow_MonthlyChange.gs:50` | direct lexical |
| EDGE-0296 | `buildMonthlyChangeReportForMonth_` | `markRuntimeStep_` | `9_Workflow_MonthlyChange.gs:54` | direct lexical |
| EDGE-0297 | `buildMonthlyChangeReportForMonth_` | `updateIndexSheet` | `9_Workflow_MonthlyChange.gs:56` | direct lexical |
| EDGE-0298 | `buildMonthlyChangeReport` | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:70` | direct lexical |
| EDGE-0299 | `compareRawDataForMonthlyChange_` | `getRawDemoPDataForCompare_` | `9_Workflow_MonthlyChange.gs:77` | direct lexical |
| EDGE-0300 | `compareRawDataForMonthlyChange_` | `getRawDemoPDataForCompare_` | `9_Workflow_MonthlyChange.gs:78` | direct lexical |
| EDGE-0301 | `compareRawDataForMonthlyChange_` | `getDataValues_` | `9_Workflow_MonthlyChange.gs:111` | direct lexical |
| EDGE-0302 | `compareRawDataForMonthlyChange_` | `getPMRIndex_` | `9_Workflow_MonthlyChange.gs:112` | direct lexical |
| EDGE-0303 | `compareRawDataForMonthlyChange_` | `normalizePMR_` | `9_Workflow_MonthlyChange.gs:115` | direct lexical |
| EDGE-0304 | `compareRawDataForMonthlyChange_` | `isSameDate_` | `9_Workflow_MonthlyChange.gs:126` | direct lexical |
| EDGE-0305 | `compareRawDataForMonthlyChange_` | `getFieldValueFromRow_` | `9_Workflow_MonthlyChange.gs:128` | direct lexical |
| EDGE-0306 | `compareRawDataForMonthlyChange_` | `isMonthlyChangeDisenrollmentEffectiveDate_` | `9_Workflow_MonthlyChange.gs:129` | direct lexical |
| EDGE-0307 | `compareRawDataForMonthlyChange_` | `buildPrimitiveRowsHash_` | `9_Workflow_MonthlyChange.gs:137` | direct lexical |
| EDGE-0308 | `compareRawDataForMonthlyChange_` | `buildPrimitiveRowsHash_` | `9_Workflow_MonthlyChange.gs:138` | direct lexical |
| EDGE-0309 | `compareRawDataForMonthlyChange_` | `rowsWithDOBOnlyForSection_` | `9_Workflow_MonthlyChange.gs:141` | direct lexical |
| EDGE-0310 | `compareRawDataForMonthlyChange_` | `rowsWithDOBOnlyForSection_` | `9_Workflow_MonthlyChange.gs:142` | direct lexical |
| EDGE-0311 | `compareRawDataForMonthlyChange_` | `getChangedColumnsForSectionRows_` | `9_Workflow_MonthlyChange.gs:144` | direct lexical |
| EDGE-0312 | `compareRawDataForMonthlyChange_` | `getChangedColumnsForSectionRows_` | `9_Workflow_MonthlyChange.gs:147` | direct lexical |
| EDGE-0313 | `compareRawDataForMonthlyChange_` | `getChangedColumnsForSectionRows_` | `9_Workflow_MonthlyChange.gs:150` | direct lexical |
| EDGE-0314 | `compareRawDataForMonthlyChange_` | `getChangedColumnsForSectionRows_` | `9_Workflow_MonthlyChange.gs:153` | direct lexical |
| EDGE-0315 | `compareRawDataForMonthlyChange_` | `getChangedColumnsForSectionRows_` | `9_Workflow_MonthlyChange.gs:156` | direct lexical |
| EDGE-0316 | `getRawDemoPDataForCompare_` | `getDataValues_` | `9_Workflow_MonthlyChange.gs:172` | direct lexical |
| EDGE-0317 | `getRawDemoPDataForCompare_` | `getPMRIndex_` | `9_Workflow_MonthlyChange.gs:175` | direct lexical |
| EDGE-0318 | `getRawDemoPDataForCompare_` | `getDOBIndex_` | `9_Workflow_MonthlyChange.gs:176` | direct lexical |
| EDGE-0319 | `getRawDemoPDataForCompare_` | `normalizePMR_` | `9_Workflow_MonthlyChange.gs:185` | direct lexical |
| EDGE-0320 | `getRawDemoPDataForCompare_` | `normalizeCompareValue_` | `9_Workflow_MonthlyChange.gs:193` | conditional/loop |
| EDGE-0321 | `rowsWithDOBOnlyForSection_` | `getDOBIndex_` | `9_Workflow_MonthlyChange.gs:208` | direct lexical |
| EDGE-0322 | `rowsWithDOBOnlyForSection_` | `normalizeCompareValue_` | `9_Workflow_MonthlyChange.gs:210` | conditional/loop |
| EDGE-0323 | `buildPrimitiveRowsHash_` | `normalizeCompareValue_` | `9_Workflow_MonthlyChange.gs:216` | direct lexical |
| EDGE-0324 | `getChangedColumnsForSectionRows_` | `buildColumnSignaturesForSection_` | `9_Workflow_MonthlyChange.gs:222` | direct lexical |
| EDGE-0325 | `getChangedColumnsForSectionRows_` | `buildColumnSignaturesForSection_` | `9_Workflow_MonthlyChange.gs:223` | direct lexical |
| EDGE-0326 | `buildColumnSignaturesForSection_` | `normalizeCompareValue_` | `9_Workflow_MonthlyChange.gs:237` | conditional/loop |
| EDGE-0327 | `isMonthlyChangeDisenrollmentEffectiveDate_` | `isSameDate_` | `9_Workflow_MonthlyChange.gs:243` | conditional/loop |
| EDGE-0328 | `displayValueForReport_` | `formatDateDisplay_` | `9_Workflow_MonthlyChange.gs:302` | conditional/loop |
| EDGE-0329 | `formatDateDisplay_` | `normalizeToDateObject_` | `9_Workflow_MonthlyChange.gs:307` | direct lexical |
| EDGE-0330 | `buildMonthlyChangeSectionRows_` | `getMonthlyChangeReportHeaders_` | `9_Workflow_MonthlyChange.gs:328` | direct lexical |
| EDGE-0331 | `buildMonthlyChangeSectionRows_` | `getDOBIndex_` | `9_Workflow_MonthlyChange.gs:329` | direct lexical |
| EDGE-0332 | `buildMonthlyChangeSectionRows_` | `findHeaderIndex_` | `9_Workflow_MonthlyChange.gs:330` | direct lexical |
| EDGE-0333 | `buildMonthlyChangeSectionRows_` | `buildHeaderIndexMap_` | `9_Workflow_MonthlyChange.gs:331` | direct lexical |
| EDGE-0334 | `buildMonthlyChangeSectionRows_` | `findHeaderIndex_` | `9_Workflow_MonthlyChange.gs:331` | direct lexical |
| EDGE-0335 | `buildMonthlyChangeSectionRows_` | `normalizeCompareValue_` | `9_Workflow_MonthlyChange.gs:340` | conditional/loop |
| EDGE-0336 | `buildMonthlyChangeSectionRows_` | `isMonthlyChangeDisenrollmentEffectiveDate_` | `9_Workflow_MonthlyChange.gs:344` | conditional/loop |
| EDGE-0337 | `buildMonthlyChangeSectionRows_` | `buildMonthlyChangeReportRow_` | `9_Workflow_MonthlyChange.gs:351` | direct lexical |
| EDGE-0338 | `appendMonthlyChangeCompiledRow_` | `padRowToWidth_` | `9_Workflow_MonthlyChange.gs:369` | direct lexical |
| EDGE-0339 | `appendMonthlyChangeSectionBlock_` | `appendMonthlyChangeCompiledRow_` | `9_Workflow_MonthlyChange.gs:380` | direct lexical |
| EDGE-0340 | `appendMonthlyChangeSectionBlock_` | `appendMonthlyChangeCompiledRow_` | `9_Workflow_MonthlyChange.gs:385` | direct lexical |
| EDGE-0341 | `appendMonthlyChangeSectionBlock_` | `appendMonthlyChangeCompiledRow_` | `9_Workflow_MonthlyChange.gs:386` | direct lexical |
| EDGE-0342 | `appendMonthlyChangeSectionBlock_` | `appendMonthlyChangeCompiledRow_` | `9_Workflow_MonthlyChange.gs:387` | direct lexical |
| EDGE-0343 | `appendMonthlyChangeSectionBlock_` | `appendMonthlyChangeCompiledRow_` | `9_Workflow_MonthlyChange.gs:388` | direct lexical |
| EDGE-0344 | `appendMonthlyChangeSectionBlock_` | `padRowToWidth_` | `9_Workflow_MonthlyChange.gs:392` | direct lexical |
| EDGE-0345 | `appendMonthlyChangeSectionBlock_` | `appendMonthlyChangeCompiledRow_` | `9_Workflow_MonthlyChange.gs:405` | direct lexical |
| EDGE-0346 | `populateMonthlyChangeReportSections_` | `loadDashboardConfig_` | `9_Workflow_MonthlyChange.gs:410` | direct lexical |
| EDGE-0347 | `populateMonthlyChangeReportSections_` | `getSheetDefinitionByType_` | `9_Workflow_MonthlyChange.gs:412` | direct lexical |
| EDGE-0348 | `populateMonthlyChangeReportSections_` | `getMonthlyChangeReportHeaders_` | `9_Workflow_MonthlyChange.gs:414` | direct lexical |
| EDGE-0349 | `populateMonthlyChangeReportSections_` | `getThemeColorsFromBase_` | `9_Workflow_MonthlyChange.gs:416` | direct lexical |
| EDGE-0350 | `populateMonthlyChangeReportSections_` | `getMonthlyChangeSectionSpecs_` | `9_Workflow_MonthlyChange.gs:420` | direct lexical |
| EDGE-0351 | `populateMonthlyChangeReportSections_` | `buildMonthlyChangeSectionRows_` | `9_Workflow_MonthlyChange.gs:421` | direct lexical |
| EDGE-0352 | `populateMonthlyChangeReportSections_` | `appendMonthlyChangeSectionBlock_` | `9_Workflow_MonthlyChange.gs:423` | direct lexical |
| EDGE-0353 | `buildMonthlyChangeReportRow_` | `displayValueForReport_` | `9_Workflow_MonthlyChange.gs:457` | direct lexical |
| EDGE-0354 | `buildMonthlyChangeReportRow_` | `convertMonthlyChangeReportDateValues_` | `9_Workflow_MonthlyChange.gs:469` | direct lexical |
| EDGE-0355 | `convertMonthlyChangeReportDateValues_` | `getMonthlyChangeReportDateIndexes_` | `9_Workflow_MonthlyChange.gs:474` | conditional/loop |
| EDGE-0356 | `convertMonthlyChangeReportDateValues_` | `normalizeToDateObject_` | `9_Workflow_MonthlyChange.gs:479` | direct lexical |
| EDGE-0357 | `getMonthlyChangeReportDateIndexes_` | `isDateLikeHeader_` | `9_Workflow_MonthlyChange.gs:494` | conditional/loop |
| EDGE-0358 | `buildMonthlyChangeReportSectionLayout_` | `getMonthlyChangeReportHeaders_` | `9_Workflow_MonthlyChange.gs:500` | direct lexical |
| EDGE-0359 | `buildMonthlyChangeReportSectionLayout_` | `padRowToWidth_` | `9_Workflow_MonthlyChange.gs:513` | direct lexical |
| EDGE-0360 | `formatMonthlyChangeReportSectionSheet_` | `loadDashboardConfig_` | `9_Workflow_MonthlyChange.gs:522` | direct lexical |
| EDGE-0361 | `formatMonthlyChangeReportSectionSheet_` | `getMonthlyChangeReportHeaders_` | `9_Workflow_MonthlyChange.gs:523` | direct lexical |
| EDGE-0362 | `createDisenrolledList` | `createDisenrolledListForMonth_` | `_10_Workflow_Disenrolled.gs:16` | direct lexical |
| EDGE-0363 | `createDisenrolledListForMonth_` | `markFrameworkStep_` | `_10_Workflow_Disenrolled.gs:30` | conditional/loop |
| EDGE-0364 | `createDisenrolledListForMonth_` | `getOrCreateDisenrolledExclusionSheet_` | `_10_Workflow_Disenrolled.gs:39` | direct lexical |
| EDGE-0365 | `createDisenrolledListForMonth_` | `syncDisenrolledExclusionFromRawData_` | `_10_Workflow_Disenrolled.gs:42` | direct lexical |
| EDGE-0366 | `createDisenrolledListForMonth_` | `hideOldDisenrolledRows_` | `_10_Workflow_Disenrolled.gs:45` | direct lexical |
| EDGE-0367 | `createDisenrolledListForMonth_` | `refreshIndexAfterSheetWorkflow_` | `_10_Workflow_Disenrolled.gs:53` | direct lexical |
| EDGE-0368 | `syncDisenrolledExclusionFromRawData_` | `markFrameworkStep_` | `_10_Workflow_Disenrolled.gs:68` | conditional/loop |
| EDGE-0369 | `syncDisenrolledExclusionFromRawData_` | `loadDashboardConfig_` | `_10_Workflow_Disenrolled.gs:71` | direct lexical |
| EDGE-0370 | `syncDisenrolledExclusionFromRawData_` | `getHeadersForSheetType_` | `_10_Workflow_Disenrolled.gs:72` | direct lexical |
| EDGE-0371 | `syncDisenrolledExclusionFromRawData_` | `buildHeaderIndexMap_` | `_10_Workflow_Disenrolled.gs:73` | direct lexical |
| EDGE-0372 | `syncDisenrolledExclusionFromRawData_` | `getDataValues_` | `_10_Workflow_Disenrolled.gs:75` | direct lexical |
| EDGE-0373 | `syncDisenrolledExclusionFromRawData_` | `getPMRIndex_` | `_10_Workflow_Disenrolled.gs:76` | direct lexical |
| EDGE-0374 | `syncDisenrolledExclusionFromRawData_` | `findHeaderIndex_` | `_10_Workflow_Disenrolled.gs:80` | direct lexical |
| EDGE-0375 | `syncDisenrolledExclusionFromRawData_` | `normalizePMR_` | `_10_Workflow_Disenrolled.gs:91` | direct lexical |
| EDGE-0376 | `syncDisenrolledExclusionFromRawData_` | `normalizeCompareValue_` | `_10_Workflow_Disenrolled.gs:97` | direct lexical |
| EDGE-0377 | `syncDisenrolledExclusionFromRawData_` | `getDataValues_` | `_10_Workflow_Disenrolled.gs:108` | direct lexical |
| EDGE-0378 | `syncDisenrolledExclusionFromRawData_` | `getPMRIndex_` | `_10_Workflow_Disenrolled.gs:109` | conditional/loop |
| EDGE-0379 | `syncDisenrolledExclusionFromRawData_` | `normalizePMR_` | `_10_Workflow_Disenrolled.gs:114` | direct lexical |
| EDGE-0380 | `syncDisenrolledExclusionFromRawData_` | `normalizePMR_` | `_10_Workflow_Disenrolled.gs:121` | direct lexical |
| EDGE-0381 | `syncDisenrolledExclusionFromRawData_` | `normalizeCompareValue_` | `_10_Workflow_Disenrolled.gs:131` | conditional/loop |
| EDGE-0382 | `syncDisenrolledExclusionFromRawData_` | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `_10_Workflow_Disenrolled.gs:152` | direct lexical |
| EDGE-0383 | `syncDisenrolledExclusionFromRawData_` | `clearSheetRuntimeCachesForSheet_` | `_10_Workflow_Disenrolled.gs:156` | direct lexical |
| EDGE-0384 | `hideOldDisenrolledRows_` | `getDataValues_` | `_10_Workflow_Disenrolled.gs:167` | direct lexical |
| EDGE-0385 | `hideOldDisenrolledRows_` | `createLocalDateOnly_` | `_10_Workflow_Disenrolled.gs:176` | direct lexical |
| EDGE-0386 | `hideOldDisenrolledRows_` | `normalizeToDateObject_` | `_10_Workflow_Disenrolled.gs:182` | direct lexical |
| EDGE-0387 | `hideOldDisenrolledRows_` | `hideRowNumberBatches_` | `_10_Workflow_Disenrolled.gs:192` | direct lexical |
| EDGE-0388 | `getOrCreateDisenrolledExclusionSheet_` | `loadDashboardConfig_` | `_10_Workflow_Disenrolled.gs:226` | direct lexical |
| EDGE-0389 | `getOrCreateDisenrolledExclusionSheet_` | `getSheetDefinitionByType_` | `_10_Workflow_Disenrolled.gs:227` | direct lexical |
| EDGE-0390 | `getOrCreateDisenrolledExclusionSheet_` | `getHeadersForSheetType_` | `_10_Workflow_Disenrolled.gs:228` | direct lexical |

## Shared downstream-function register

| Function | Assigned roots reaching it | Evidence |
|---|---:|---|
| `getRuntimeCache_` | 9 | `1_Config.gs:155–164` |
| `getDocumentPropertiesCached_` | 7 | `1_Config.gs:170–174` |
| `getArchiveSpreadsheetId_` | 7 | `1_Config.gs:176–178` |
| `loadDashboardConfig_` | 7 | `2_Dashboard_Loaders.gs:22–43` |
| `readDashboardSectionRows_` | 7 | `2_Dashboard_Loaders.gs:53–77` |
| `normalizeDashboardSheetTypeKey_` | 7 | `2_Dashboard_Loaders.gs:79–90` |
| `loadGlobalSettings_` | 7 | `2_Dashboard_Loaders.gs:97–126` |
| `loadTitleRows_` | 7 | `2_Dashboard_Loaders.gs:131–144` |
| `parseTitleRowConfigRow_` | 7 | `2_Dashboard_Loaders.gs:146–164` |
| `normalizeTitleTargetCell_` | 7 | `2_Dashboard_Loaders.gs:166–170` |
| `loadSheetDefinitions_` | 7 | `2_Dashboard_Loaders.gs:175–195` |
| `loadSheetBehaviors_` | 7 | `2_Dashboard_Loaders.gs:200–218` |
| `loadSystemSurfaces_` | 7 | `2_Dashboard_Loaders.gs:223–245` |
| `loadTabOrganization_` | 7 | `2_Dashboard_Loaders.gs:250–266` |
| `getTabOrganizationProfilesForSort_` | 6 | `2_Dashboard_Loaders.gs:268–271` |
| `loadColumnDefinitions_` | 7 | `2_Dashboard_Loaders.gs:276–297` |
| `loadSheetHeaders_` | 7 | `2_Dashboard_Loaders.gs:302–323` |
| `getSheetDefinitionByTypeOrNull_` | 2 | `2_Dashboard_Loaders.gs:327–332` |
| `getSheetDefinitionByType_` | 2 | `2_Dashboard_Loaders.gs:334–338` |
| `getHeadersForSheetType_` | 2 | `2_Dashboard_Loaders.gs:379–383` |
| `normalizeHex_` | 7 | `2_Dashboard_Loaders.gs:395–399` |
| `getThemeColorsFromBase_` | 2 | `2_Dashboard_Loaders.gs:401–426` |
| `getSectionEThemeForSheet_` | 6 | `2_Dashboard_Loaders.gs:437–466` |
| `hexToHsl_` | 2 | `2_Dashboard_Loaders.gs:511–533` |
| `hslToHex_` | 2 | `2_Dashboard_Loaders.gs:535–544` |
| `normalizeHeader_` | 7 | `3_Core_Helpers.gs:8–10` |
| `normalizePMR_` | 4 | `3_Core_Helpers.gs:12–14` |
| `normalizeText_` | 8 | `3_Core_Helpers.gs:27–29` |
| `normalizeKey_` | 7 | `3_Core_Helpers.gs:31–33` |
| `normalizeCompareValue_` | 3 | `3_Core_Helpers.gs:35–56` |
| `parseBoolean_` | 7 | `3_Core_Helpers.gs:62–66` |
| `numberOrDefault_` | 7 | `3_Core_Helpers.gs:68–71` |
| `isBlankCell_` | 7 | `3_Core_Helpers.gs:73–75` |
| `padRowToWidth_` | 3 | `3_Core_Helpers.gs:83–87` |
| `normalizeToDateObject_` | 2 | `3_Core_Helpers.gs:95–133` |
| `isReasonableReportDate_` | 2 | `3_Core_Helpers.gs:135–138` |
| `getHeaders_` | 3 | `3_Core_Helpers.gs:173–182` |
| `getHeaderMap_` | 3 | `3_Core_Helpers.gs:184–191` |
| `buildHeaderIndexMap_` | 4 | `3_Core_Helpers.gs:193–200` |
| `findHeaderIndex_` | 4 | `3_Core_Helpers.gs:202–207` |
| `getPMRIndex_` | 4 | `3_Core_Helpers.gs:209–211` |
| `getDataValues_` | 3 | `3_Core_Helpers.gs:217–231` |
| `getSheetDimensions_` | 3 | `3_Core_Helpers.gs:233–244` |
| `clearSheetRuntimeCachesForSheet_` | 3 | `3_Core_Helpers.gs:246–252` |
| `markFrameworkStep_` | 5 | `3_Core_Helpers.gs:261–277` |
| `markRuntimeStep_` | 3 | `3_Core_Helpers.gs:279–281` |
| `logBestEffortWarning_` | 4 | `3_Core_Helpers.gs:304–307` |
| `hasIndexSheetShell_` | 6 | `4_System_Index.gs:54–63` |
| `buildIndexSheetShell_` | 6 | `4_System_Index.gs:65–103` |
| `updateIndexLocalWorkspace_` | 6 | `4_System_Index.gs:111–180` |
| `localSheetRow_` | 6 | `4_System_Index.gs:117–127` |
| `updateIndexArchiveWorkspace_` | 6 | `4_System_Index.gs:185–220` |
| `updateIndexSheet` | 6 | `4_System_Index.gs:225–257` |
| `refreshIndexAfterSheetWorkflow_` | 2 | `4_System_Index.gs:262–268` |
| `buildIndexRestoreHyperlinkFormula_` | 6 | `4_System_Index.gs:356–362` |
| `getIndexRestoreWebAppUrl_` | 6 | `4_System_Index.gs:364–376` |

## Unresolved-call register

All named calls made from parsed function bodies resolve, but missing registered callback roots above are **FAIL** defects. Runtime-selected Google service methods, data-dependent branches, and container/deployment state remain **NOT VERIFIED**.

## Reconciliation

- Assigned menu commands: **25**
- Graphs: **25**
- Missing assigned callbacks: **16**
- Assignment overlap with other part: **0**
