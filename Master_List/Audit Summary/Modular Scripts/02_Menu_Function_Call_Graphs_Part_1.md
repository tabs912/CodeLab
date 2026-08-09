# Script 02 — Menu Function Call Graphs, Part 1

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

## Complete hierarchical call graphs

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

## Call-edge register

| Edge ID | Caller | Callee | Evidence | Context |
|---|---|---|---|---|
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
| EDGE-0177 | `quickBuildAllTemplates` | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:318` | direct lexical |
| EDGE-0178 | `setReportTemplateVisibility_` | `forceBaseTemplateHidden_` | `5_System_Templates.gs:341` | direct lexical |

## Shared downstream-function register

| Function | Assigned roots reaching it | Evidence |
|---|---:|---|
| `getRuntimeCache_` | 2 | `1_Config.gs:155–164` |
| `loadDashboardConfig_` | 2 | `2_Dashboard_Loaders.gs:22–43` |
| `readDashboardSectionRows_` | 2 | `2_Dashboard_Loaders.gs:53–77` |
| `normalizeDashboardSheetTypeKey_` | 2 | `2_Dashboard_Loaders.gs:79–90` |
| `loadGlobalSettings_` | 2 | `2_Dashboard_Loaders.gs:97–126` |
| `loadTitleRows_` | 2 | `2_Dashboard_Loaders.gs:131–144` |
| `parseTitleRowConfigRow_` | 2 | `2_Dashboard_Loaders.gs:146–164` |
| `normalizeTitleTargetCell_` | 2 | `2_Dashboard_Loaders.gs:166–170` |
| `loadSheetDefinitions_` | 2 | `2_Dashboard_Loaders.gs:175–195` |
| `loadSheetBehaviors_` | 2 | `2_Dashboard_Loaders.gs:200–218` |
| `loadSystemSurfaces_` | 2 | `2_Dashboard_Loaders.gs:223–245` |
| `loadTabOrganization_` | 2 | `2_Dashboard_Loaders.gs:250–266` |
| `loadColumnDefinitions_` | 2 | `2_Dashboard_Loaders.gs:276–297` |
| `loadSheetHeaders_` | 2 | `2_Dashboard_Loaders.gs:302–323` |
| `getBehaviorForSheetType_` | 2 | `2_Dashboard_Loaders.gs:358–362` |
| `getDefaultBehavior_` | 2 | `2_Dashboard_Loaders.gs:368–377` |
| `getHeadersForSheetType_` | 2 | `2_Dashboard_Loaders.gs:379–383` |
| `normalizeHex_` | 2 | `2_Dashboard_Loaders.gs:395–399` |
| `getThemeColorsFromBase_` | 2 | `2_Dashboard_Loaders.gs:401–426` |
| `hexToHsl_` | 2 | `2_Dashboard_Loaders.gs:511–533` |
| `hslToHex_` | 2 | `2_Dashboard_Loaders.gs:535–544` |
| `normalizeHeader_` | 2 | `3_Core_Helpers.gs:8–10` |
| `normalizeText_` | 2 | `3_Core_Helpers.gs:27–29` |
| `normalizeKey_` | 2 | `3_Core_Helpers.gs:31–33` |
| `parseBoolean_` | 2 | `3_Core_Helpers.gs:62–66` |
| `numberOrDefault_` | 2 | `3_Core_Helpers.gs:68–71` |
| `isBlankCell_` | 2 | `3_Core_Helpers.gs:73–75` |
| `markFrameworkStep_` | 2 | `3_Core_Helpers.gs:261–277` |
| `logBestEffortWarning_` | 2 | `3_Core_Helpers.gs:304–307` |
| `ensureGoldenMasterTemplate_` | 2 | `5_System_Templates.gs:48–71` |
| `forceBaseTemplateHidden_` | 2 | `5_System_Templates.gs:145–152` |
| `createOrRefreshTemplateFromDashboard_` | 2 | `5_System_Templates.gs:156–177` |
| `buildTemplateFromDashboard_` | 2 | `5_System_Templates.gs:179–191` |
| `clearTemplateForFullBuild_` | 2 | `5_System_Templates.gs:193–209` |
| `applyTemplateBaseFormatting_` | 2 | `5_System_Templates.gs:211–236` |
| `ensureTemplateFilter_` | 2 | `5_System_Templates.gs:238–259` |
| `applyTemplateFreezeAndTabColor_` | 2 | `5_System_Templates.gs:261–270` |
| `writeTemplateMetadata_` | 2 | `5_System_Templates.gs:272–283` |
| `buildAllTemplatesAndValidate` | 2 | `5_System_Templates.gs:287–314` |
| `setReportTemplateVisibility_` | 2 | `5_System_Templates.gs:322–342` |

## Unresolved-call register

All named calls made from parsed function bodies resolve, but missing registered callback roots above are **FAIL** defects. Runtime-selected Google service methods, data-dependent branches, and container/deployment state remain **NOT VERIFIED**.

## Reconciliation

- Assigned menu commands: **17**
- Graphs: **17**
- Missing assigned callbacks: **15**
- Assignment overlap with other part: **0**
