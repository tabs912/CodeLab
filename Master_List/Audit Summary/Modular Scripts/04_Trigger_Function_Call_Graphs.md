# Script 04 — Trigger Function Call Graphs

**Status:** COMPLETE (static-source audit)
**Governing prompt:** `Master_List/Prompts/Menu_Trigger_and_Function_Execution_Trace_Review_Prompt (1).docx.md`, Sections 1–12 and modular protocol
**Production source:** the ten `.gs` files in `Master_List/Current Production Script/Modules`
**Declared source version:** `1.8.9.8.4.0` (`MASTER_LIST_MERGE_ML_VERSION`)
**Source fingerprint (SHA-256, filename-sorted concatenation):** `5ee0461c0e722ac55304df8187ff10998b109eda2167306f63cdd4f54af559ab`
**Method:** exhaustive static parsing of named declarations, menu callback strings, and named call occurrences. Google service dispatch, deployed trigger state, workbook contents, permissions, quotas, and runtime-selected data paths are **NOT VERIFIED** without the live Apps Script container.

## Trigger catalog

| ID | Entry | Type | Activation | Evidence | Event object | Status |
|---|---|---|---|---|---|---|
| TRG-001 | `onOpen` | simple open trigger | reserved-name automatic activation | `1_Config.gs:8–69` | Not declared | PASS (existence); deployed inventory NOT VERIFIED |
| TRG-002 | `doGet` | web-app GET entry | deployment HTTP routing | `4_System_Index.gs:388–424` | Declared/used | PASS (existence); deployed inventory NOT VERIFIED |

## Complete trigger call graphs

## TRG-001 — `onOpen`

- `onOpen` [FN-001] (1_Config.gs:8–69)

## TRG-002 — `doGet`

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

## Trigger call-edge register

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
| EDGE-0092 | `normalizeKey_` | `normalizeText_` | `3_Core_Helpers.gs:32` | direct lexical |
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
| EDGE-0145 | `restoreSheetFromActiveIndexRow` | `restoreSheetFromArchiveWorkbook` | `4_System_Index.gs:323` | direct lexical |
| EDGE-0146 | `restoreSheetFromArchiveWorkbook` | `getArchiveSpreadsheetId_` | `4_System_Index.gs:336` | direct lexical |
| EDGE-0147 | `restoreSheetFromArchiveWorkbook` | `updateIndexSheet` | `4_System_Index.gs:348` | direct lexical |
| EDGE-0148 | `buildIndexRestoreHyperlinkFormula_` | `getIndexRestoreWebAppUrl_` | `4_System_Index.gs:357` | direct lexical |
| EDGE-0149 | `doGet` | `escapeHtml_` | `4_System_Index.gs:392` | direct lexical |
| EDGE-0150 | `doGet` | `restoreSheetFromArchiveWorkbook` | `4_System_Index.gs:404` | conditional/loop |
| EDGE-0151 | `doGet` | `restoreSheetFromActiveIndexRow` | `4_System_Index.gs:405` | direct lexical |
| EDGE-0152 | `doGet` | `escapeHtml_` | `4_System_Index.gs:418` | direct lexical |

## Duplicate or obsolete trigger-risk register

| Risk | Status | Evidence |
|---|---|---|
| Duplicate source handlers | PASS | One declaration per runtime entry |
| Installable/container triggers | NOT VERIFIED | Apps Script Triggers UI export absent |
| Obsolete deployed web versions | NOT VERIFIED | Deployment inventory absent |

## Reconciliation

- Triggers/runtime entries: **2**
- Trigger graphs: **2**
