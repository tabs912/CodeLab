# Script 05 — Reachable Function Dependency Catalog

**Status:** COMPLETE (static-source audit)
**Governing prompt:** `Master_List/Prompts/Menu_Trigger_and_Function_Execution_Trace_Review_Prompt (1).docx.md`, Sections 1–12 and modular protocol
**Production source:** the ten `.gs` files in `Master_List/Current Production Script/Modules`
**Declared source version:** `1.8.9.8.4.0` (`MASTER_LIST_MERGE_ML_VERSION`)
**Source fingerprint (SHA-256, filename-sorted concatenation):** `5ee0461c0e722ac55304df8187ff10998b109eda2167306f63cdd4f54af559ab`
**Method:** exhaustive static parsing of named declarations, menu callback strings, and named call occurrences. Google service dispatch, deployed trigger state, workbook contents, permissions, quotas, and runtime-selected data paths are **NOT VERIFIED** without the live Apps Script container.

## Complete Reachable Function Dependency Catalog

| ID | Function | Location | Inputs | Callers | Callees | Runtime/side-effect classification |
|---|---|---|---|---|---|---|
| FN-001 | `onOpen` | `1_Config.gs:8–69` | `none` | entry only | none | Archival/external workbook, Timing/logging |
| FN-005 | `getRuntimeCache_` | `1_Config.gs:155–164` | `none` | `clearSheetRuntimeCachesForSheet_`, `getDocumentPropertiesCached_`, `getHeaderMap_`, `getHeaders_`, `getSheetDimensions_`, `getThemeColorsFromBase_`, `loadDashboardConfig_` | none | Properties/runtime state |
| FN-007 | `getDocumentPropertiesCached_` | `1_Config.gs:170–174` | `none` | `getArchiveSpreadsheetId_` | `getRuntimeCache_` | Properties/runtime state |
| FN-008 | `getArchiveSpreadsheetId_` | `1_Config.gs:176–178` | `none` | `buildIndexSheetShell_`, `configureArchiveSpreadsheetId`, `restoreSheetFromArchiveWorkbook`, `updateIndexArchiveWorkspace_` | `getDocumentPropertiesCached_` | Archival/external workbook |
| FN-010 | `loadDashboardConfig_` | `2_Dashboard_Loaders.gs:22–43` | `forceRefresh` | `buildAllTemplatesAndValidate`, `buildIndexSheetShell_`, `buildMonthlyChangeReportForMonth_`, `createActiveDemoPFromRawData_`, `formatMonthlyChangeReportSectionSheet_`, `getOrCreateDisenrolledExclusionSheet_`, `getTabOrganizationProfilesForSort_`, `populateMonthlyChangeReportSections_`, `syncDisenrolledExclusionFromRawData_` | `getRuntimeCache_`, `loadColumnDefinitions_`, `loadGlobalSettings_`, `loadSheetBehaviors_`, `loadSheetDefinitions_`, `loadSheetHeaders_`, `loadSystemSurfaces_`, `loadTabOrganization_`, `loadTitleRows_` | Worksheet read |
| FN-012 | `readDashboardSectionRows_` | `2_Dashboard_Loaders.gs:53–77` | `sheet, sectionMarker` | `loadColumnDefinitions_`, `loadGlobalSettings_`, `loadSheetBehaviors_`, `loadSheetDefinitions_`, `loadSheetHeaders_`, `loadSystemSurfaces_`, `loadTabOrganization_`, `loadTitleRows_` | none | Worksheet read |
| FN-013 | `normalizeDashboardSheetTypeKey_` | `2_Dashboard_Loaders.gs:79–90` | `sheetType` | `getBehaviorForSheetType_`, `getHeadersForSheetType_`, `getSheetDefinitionByTypeOrNull_`, `loadSheetBehaviors_`, `loadSheetDefinitions_`, `loadSheetHeaders_`, `loadTitleRows_` | `normalizeKey_` | in-memory/pure by static signature |
| FN-014 | `loadGlobalSettings_` | `2_Dashboard_Loaders.gs:97–126` | `sheet` | `loadDashboardConfig_` | `numberOrDefault_`, `readDashboardSectionRows_` | in-memory/pure by static signature |
| FN-015 | `loadTitleRows_` | `2_Dashboard_Loaders.gs:131–144` | `sheet` | `loadDashboardConfig_` | `normalizeDashboardSheetTypeKey_`, `numberOrDefault_`, `parseTitleRowConfigRow_`, `readDashboardSectionRows_` | in-memory/pure by static signature |
| FN-016 | `parseTitleRowConfigRow_` | `2_Dashboard_Loaders.gs:146–164` | `row, globals, base` | `loadTitleRows_` | `normalizeTitleTargetCell_`, `numberOrDefault_` | in-memory/pure by static signature |
| FN-017 | `normalizeTitleTargetCell_` | `2_Dashboard_Loaders.gs:166–170` | `value, rowNumber` | `parseTitleRowConfigRow_` | none | in-memory/pure by static signature |
| FN-018 | `loadSheetDefinitions_` | `2_Dashboard_Loaders.gs:175–195` | `sheet` | `loadDashboardConfig_` | `isBlankCell_`, `normalizeDashboardSheetTypeKey_`, `normalizeHex_`, `numberOrDefault_`, `parseBoolean_`, `readDashboardSectionRows_` | in-memory/pure by static signature |
| FN-019 | `loadSheetBehaviors_` | `2_Dashboard_Loaders.gs:200–218` | `sheet` | `loadDashboardConfig_` | `normalizeDashboardSheetTypeKey_`, `parseBoolean_`, `readDashboardSectionRows_` | in-memory/pure by static signature |
| FN-020 | `loadSystemSurfaces_` | `2_Dashboard_Loaders.gs:223–245` | `sheet` | `loadDashboardConfig_` | `normalizeHex_`, `numberOrDefault_`, `parseBoolean_`, `readDashboardSectionRows_` | in-memory/pure by static signature |
| FN-021 | `loadTabOrganization_` | `2_Dashboard_Loaders.gs:250–266` | `sheet` | `loadDashboardConfig_` | `numberOrDefault_`, `readDashboardSectionRows_` | in-memory/pure by static signature |
| FN-022 | `getTabOrganizationProfilesForSort_` | `2_Dashboard_Loaders.gs:268–271` | `none` | `updateIndexLocalWorkspace_` | `loadDashboardConfig_` | in-memory/pure by static signature |
| FN-023 | `loadColumnDefinitions_` | `2_Dashboard_Loaders.gs:276–297` | `sheet` | `loadDashboardConfig_` | `isBlankCell_`, `normalizeHeader_`, `numberOrDefault_`, `parseBoolean_`, `readDashboardSectionRows_` | in-memory/pure by static signature |
| FN-024 | `loadSheetHeaders_` | `2_Dashboard_Loaders.gs:302–323` | `sheet` | `loadDashboardConfig_` | `normalizeDashboardSheetTypeKey_`, `normalizeHeader_`, `numberOrDefault_`, `readDashboardSectionRows_` | in-memory/pure by static signature |
| FN-025 | `getSheetDefinitionByTypeOrNull_` | `2_Dashboard_Loaders.gs:327–332` | `dashboard, sheetType` | `getSheetDefinitionByType_` | `normalizeDashboardSheetTypeKey_` | in-memory/pure by static signature |
| FN-026 | `getSheetDefinitionByType_` | `2_Dashboard_Loaders.gs:334–338` | `dashboard, sheetType` | `buildMonthlyChangeReportForMonth_`, `getOrCreateDisenrolledExclusionSheet_`, `populateMonthlyChangeReportSections_` | `getSheetDefinitionByTypeOrNull_` | in-memory/pure by static signature |
| FN-028 | `getBehaviorForSheetType_` | `2_Dashboard_Loaders.gs:358–362` | `dashboard, sheetType` | `createOrRefreshTemplateFromDashboard_` | `getDefaultBehavior_`, `normalizeDashboardSheetTypeKey_` | in-memory/pure by static signature |
| FN-030 | `getDefaultBehavior_` | `2_Dashboard_Loaders.gs:368–377` | `none` | `getBehaviorForSheetType_` | none | in-memory/pure by static signature |
| FN-031 | `getHeadersForSheetType_` | `2_Dashboard_Loaders.gs:379–383` | `dashboard, sheetType` | `createOrRefreshTemplateFromDashboard_`, `getOrCreateDisenrolledExclusionSheet_`, `syncDisenrolledExclusionFromRawData_` | `normalizeDashboardSheetTypeKey_` | in-memory/pure by static signature |
| FN-033 | `normalizeHex_` | `2_Dashboard_Loaders.gs:395–399` | `color` | `getThemeColorsFromBase_`, `loadSheetDefinitions_`, `loadSystemSurfaces_` | none | in-memory/pure by static signature |
| FN-034 | `getThemeColorsFromBase_` | `2_Dashboard_Loaders.gs:401–426` | `baseHex, globals` | `applyTemplateBaseFormatting_`, `applyTemplateFreezeAndTabColor_`, `populateMonthlyChangeReportSections_` | `getRuntimeCache_`, `hexToHsl_`, `hslToHex_`, `normalizeHex_`, `numberOrDefault_` | in-memory/pure by static signature |
| FN-036 | `getSectionEThemeForSheet_` | `2_Dashboard_Loaders.gs:437–466` | `targetSheetName` | `buildIndexSheetShell_`, `updateIndexSheet` | none | Worksheet read |
| FN-038 | `hexToHsl_` | `2_Dashboard_Loaders.gs:511–533` | `hex` | `getThemeColorsFromBase_` | none | in-memory/pure by static signature |
| FN-039 | `hslToHex_` | `2_Dashboard_Loaders.gs:535–544` | `h, s, l` | `getThemeColorsFromBase_` | none | in-memory/pure by static signature |
| FN-041 | `normalizeHeader_` | `3_Core_Helpers.gs:8–10` | `value` | `isDateLikeHeader_`, `loadColumnDefinitions_`, `loadSheetHeaders_` | none | in-memory/pure by static signature |
| FN-042 | `normalizePMR_` | `3_Core_Helpers.gs:12–14` | `value` | `buildParticipantContactKey_`, `buildPrimaryDemoPRowsInMemory_`, `compareRawDataForMonthlyChange_`, `flattenDemoPContactRowsInMemory_`, `getRawDemoPDataForCompare_`, `removeActiveDemoPPMRsFromDisenrolledExclusion_`, `syncDisenrolledExclusionFromRawData_`, `writePMRContactsToParticipantRows_` | none | in-memory/pure by static signature |
| FN-043 | `normalizeKeyPart_` | `3_Core_Helpers.gs:16–25` | `value` | `buildParticipantContactKey_` | none | in-memory/pure by static signature |
| FN-044 | `normalizeText_` | `3_Core_Helpers.gs:27–29` | `value` | `normalizeKey_`, `safeSheetName_` | none | in-memory/pure by static signature |
| FN-045 | `normalizeKey_` | `3_Core_Helpers.gs:31–33` | `value` | `normalizeDashboardSheetTypeKey_` | `normalizeText_` | in-memory/pure by static signature |
| FN-046 | `normalizeCompareValue_` | `3_Core_Helpers.gs:35–56` | `value` | `buildColumnSignaturesForSection_`, `buildMonthlyChangeSectionRows_`, `buildPrimitiveRowsHash_`, `combineNotesSummaryData_`, `flattenDemoPContactRowsInMemory_`, `getRawDemoPDataForCompare_`, `populateDemoPNameData_`, `populateParticipantNameData_`, `removeActiveDemoPPMRsFromDisenrolledExclusion_`, `rowsWithDOBOnlyForSection_`, `syncDisenrolledExclusionFromRawData_`, `updateBannerColumnData_`, `writePMRContactsToParticipantRows_` | none | in-memory/pure by static signature |
| FN-048 | `parseBoolean_` | `3_Core_Helpers.gs:62–66` | `value` | `loadColumnDefinitions_`, `loadSheetBehaviors_`, `loadSheetDefinitions_`, `loadSystemSurfaces_` | none | in-memory/pure by static signature |
| FN-049 | `numberOrDefault_` | `3_Core_Helpers.gs:68–71` | `value, fallback` | `getThemeColorsFromBase_`, `loadColumnDefinitions_`, `loadGlobalSettings_`, `loadSheetDefinitions_`, `loadSheetHeaders_`, `loadSystemSurfaces_`, `loadTabOrganization_`, `loadTitleRows_`, `parseTitleRowConfigRow_` | none | in-memory/pure by static signature |
| FN-050 | `isBlankCell_` | `3_Core_Helpers.gs:73–75` | `value` | `loadColumnDefinitions_`, `loadSheetDefinitions_` | none | in-memory/pure by static signature |
| FN-051 | `safeSheetName_` | `3_Core_Helpers.gs:77–79` | `value` | `buildStagedMasterListSheetName_` | `normalizeText_` | in-memory/pure by static signature |
| FN-052 | `padRowToWidth_` | `3_Core_Helpers.gs:83–87` | `rowValues, width` | `appendMonthlyChangeCompiledRow_`, `appendMonthlyChangeSectionBlock_`, `buildMonthlyChangeReportSectionLayout_`, `normalizeRowsToWidth_`, `writeFrameworkTimingReport_` | none | in-memory/pure by static signature |
| FN-053 | `normalizeRowsToWidth_` | `3_Core_Helpers.gs:89–91` | `rows, width` | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `padRowToWidth_` | in-memory/pure by static signature |
| FN-054 | `normalizeToDateObject_` | `3_Core_Helpers.gs:95–133` | `value` | `convertMonthlyChangeReportDateValues_`, `formatDateDisplay_`, `hideOldDisenrolledRows_`, `isSameDate_` | `isReasonableReportDate_` | in-memory/pure by static signature |
| FN-055 | `isReasonableReportDate_` | `3_Core_Helpers.gs:135–138` | `date` | `normalizeToDateObject_` | none | in-memory/pure by static signature |
| FN-056 | `createLocalDateOnly_` | `3_Core_Helpers.gs:140–142` | `year, month, day` | `hideOldDisenrolledRows_` | none | in-memory/pure by static signature |
| FN-057 | `isSameDate_` | `3_Core_Helpers.gs:144–148` | `a, b` | `compareRawDataForMonthlyChange_`, `isMonthlyChangeDisenrollmentEffectiveDate_` | `normalizeToDateObject_` | in-memory/pure by static signature |
| FN-058 | `isDateLikeHeader_` | `3_Core_Helpers.gs:150–155` | `header` | `getMonthlyChangeReportDateIndexes_` | `normalizeHeader_` | in-memory/pure by static signature |
| FN-061 | `getHeaders_` | `3_Core_Helpers.gs:173–182` | `sheet, headerRow` | `buildMasterListHeadersBeforeDataCopy_`, `createMasterListForMonth_`, `getDataValues_`, `getHeaderMap_`, `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `getRuntimeCache_` | Worksheet read |
| FN-062 | `getHeaderMap_` | `3_Core_Helpers.gs:184–191` | `sheet, headerRow` | `createMasterListForMonth_`, `getDataValues_` | `buildHeaderIndexMap_`, `getHeaders_`, `getRuntimeCache_` | in-memory/pure by static signature |
| FN-063 | `buildHeaderIndexMap_` | `3_Core_Helpers.gs:193–200` | `headers` | `buildMonthlyChangeSectionRows_`, `createActiveDemoPFromRawData_`, `flattenDemoPContactRowsInMemory_`, `getHeaderMap_`, `removeActiveDemoPPMRsFromDisenrolledExclusion_`, `syncDisenrolledExclusionFromRawData_` | none | in-memory/pure by static signature |
| FN-064 | `findHeaderIndex_` | `3_Core_Helpers.gs:202–207` | `headerMap, possibleNames` | `buildMonthlyChangeSectionRows_`, `getDOBIndex_`, `getPMRIndex_`, `removeActiveDemoPPMRsFromDisenrolledExclusion_`, `syncDisenrolledExclusionFromRawData_` | none | in-memory/pure by static signature |
| FN-065 | `getPMRIndex_` | `3_Core_Helpers.gs:209–211` | `headerMap` | `buildPrimaryDemoPRowsInMemory_`, `compareRawDataForMonthlyChange_`, `flattenDemoPContactRowsInMemory_`, `getRawDemoPDataForCompare_`, `removeActiveDemoPPMRsFromDisenrolledExclusion_`, `syncDisenrolledExclusionFromRawData_`, `writePMRContactsToParticipantRows_` | `findHeaderIndex_` | in-memory/pure by static signature |
| FN-066 | `getDOBIndex_` | `3_Core_Helpers.gs:213–215` | `headerMap` | `buildMonthlyChangeSectionRows_`, `getRawDemoPDataForCompare_`, `rowsWithDOBOnlyForSection_` | `findHeaderIndex_` | in-memory/pure by static signature |
| FN-067 | `getDataValues_` | `3_Core_Helpers.gs:217–231` | `sheet, headerRow, dataStartRow` | `buildPrimaryDemoPRowsInMemory_`, `buildSourceMapBySingleKeyForPart5_`, `compareRawDataForMonthlyChange_`, `getRawDemoPDataForCompare_`, `hideOldDisenrolledRows_`, `removeActiveDemoPPMRsFromDisenrolledExclusion_`, `syncDisenrolledExclusionFromRawData_` | `getHeaderMap_`, `getHeaders_`, `getSheetDimensions_` | Worksheet read |
| FN-068 | `getSheetDimensions_` | `3_Core_Helpers.gs:233–244` | `sheet` | `getDataValues_` | `getRuntimeCache_` | Worksheet read |
| FN-069 | `clearSheetRuntimeCachesForSheet_` | `3_Core_Helpers.gs:246–252` | `sheet` | `buildMasterListHeadersBeforeDataCopy_`, `createActiveDemoPFromRawData_`, `promoteStagedMasterListSheet_`, `removeActiveDemoPPMRsFromDisenrolledExclusion_`, `syncDisenrolledExclusionFromRawData_` | `getRuntimeCache_` | in-memory/pure by static signature |
| FN-070 | `startFrameworkTiming_` | `3_Core_Helpers.gs:256–259` | `processName, monthParts` | `createMasterListForMonth_` | none | Timing/logging |
| FN-071 | `markFrameworkStep_` | `3_Core_Helpers.gs:261–277` | `timing, stepName, details` | `buildRefinedDataFromScratch`, `buildTemplateFromDashboard_`, `clearTemplateForFullBuild_`, `createDisenrolledListForMonth_`, `createMasterListForMonth_`, `ensureGoldenMasterTemplate_`, `ensureTemplateFilter_`, `markRuntimeStep_`, `processRefinedDataUnified_`, `syncDisenrolledExclusionFromRawData_` | none | Timing/logging |
| FN-072 | `markRuntimeStep_` | `3_Core_Helpers.gs:279–281` | `timing, label, details` | `buildMonthlyChangeReportForMonth_`, `createMasterListForMonth_`, `getValidatedRawDataSheetForDemoPBuild_` | `markFrameworkStep_` | Timing/logging |
| FN-073 | `writeFrameworkTimingReport_` | `3_Core_Helpers.gs:283–298` | `timing` | `writeRuntimeTimingReport_` | `padRowToWidth_` | Timing/logging, Worksheet read, Worksheet write |
| FN-074 | `writeRuntimeTimingReport_` | `3_Core_Helpers.gs:300–302` | `timing` | `createMasterListForMonth_` | `writeFrameworkTimingReport_` | Timing/logging |
| FN-075 | `logBestEffortWarning_` | `3_Core_Helpers.gs:304–307` | `message, details` | `buildAllTemplatesAndValidate`, `cleanupFailedStagedMasterListSheet_`, `createMasterListForMonth_`, `flattenDemoPContactRowsInMemory_`, `forceBaseTemplateHidden_`, `refreshIndexAfterSheetWorkflow_`, `removeActiveDemoPPMRsFromDisenrolledExclusion_`, `safeFlattenAndProcessContacts_` | none | Timing/logging |
| FN-076 | `formatSeconds_` | `3_Core_Helpers.gs:309–314` | `seconds` | `createMasterListForMonth_` | none | in-memory/pure by static signature |
| FN-077 | `configureArchiveSpreadsheetId` | `4_System_Index.gs:15–32` | `none` | entry only | `getArchiveSpreadsheetId_` | Archival/external workbook, Properties/runtime state, UI/notification |
| FN-078 | `configureIndexRestoreWebAppUrl` | `4_System_Index.gs:34–50` | `none` | entry only | `getIndexRestoreWebAppUrl_`, `updateIndexSheet` | Properties/runtime state, UI/notification |
| FN-079 | `hasIndexSheetShell_` | `4_System_Index.gs:54–63` | `sheet` | `updateIndexSheet` | none | Archival/external workbook, Worksheet read |
| FN-080 | `buildIndexSheetShell_` | `4_System_Index.gs:65–103` | `sheet` | `updateIndexSheet` | `getArchiveSpreadsheetId_`, `getSectionEThemeForSheet_`, `loadDashboardConfig_` | Archival/external workbook, Formatting, Worksheet read, Worksheet write |
| FN-081 | `updateIndexLocalWorkspace_` | `4_System_Index.gs:111–180` | `sheet, theme` | `updateIndexSheet` | `getTabOrganizationProfilesForSort_`, `localSheetRow_` | Formatting, Worksheet read, Worksheet write |
| FN-082 | `localSheetRow_` | `4_System_Index.gs:117–127` | `sheetName` | `updateIndexLocalWorkspace_` | none | Worksheet read |
| FN-083 | `updateIndexArchiveWorkspace_` | `4_System_Index.gs:185–220` | `sheet, theme, preOpenedArchiveSs` | `updateIndexSheet` | `buildIndexRestoreHyperlinkFormula_`, `getArchiveSpreadsheetId_` | Archival/external workbook, Formatting, Worksheet read, Worksheet write |
| FN-084 | `updateIndexSheet` | `4_System_Index.gs:225–257` | `options` | `buildMonthlyChangeReportForMonth_`, `configureIndexRestoreWebAppUrl`, `refreshIndexAfterSheetWorkflow_`, `restoreSheetFromArchiveWorkbook` | `buildIndexSheetShell_`, `getSectionEThemeForSheet_`, `hasIndexSheetShell_`, `updateIndexArchiveWorkspace_`, `updateIndexLocalWorkspace_` | Archival/external workbook, Formatting, Sheet creation/copy, Worksheet read, Worksheet write |
| FN-087 | `refreshIndexAfterSheetWorkflow_` | `4_System_Index.gs:262–268` | `workflowName, options` | `buildRefinedDataFromScratch`, `createDisenrolledListForMonth_` | `logBestEffortWarning_`, `updateIndexSheet` | in-memory/pure by static signature |
| FN-089 | `restoreSheetFromActiveIndexRow` | `4_System_Index.gs:280–327` | `optionalTargetSheetName` | `doGet` | `restoreSheetFromArchiveWorkbook` | Archival/external workbook, UI/notification, Worksheet read |
| FN-090 | `restoreSheetFromArchiveWorkbook` | `4_System_Index.gs:329–352` | `targetSheetName` | `doGet`, `restoreSheetFromActiveIndexRow` | `getArchiveSpreadsheetId_`, `updateIndexSheet` | Archival/external workbook, Sheet creation/copy, Sheet visibility, UI/notification, Worksheet read, Worksheet write |
| FN-091 | `buildIndexRestoreHyperlinkFormula_` | `4_System_Index.gs:356–362` | `targetSheetName, actionType` | `updateIndexArchiveWorkspace_` | `getIndexRestoreWebAppUrl_` | Archival/external workbook |
| FN-092 | `getIndexRestoreWebAppUrl_` | `4_System_Index.gs:364–376` | `none` | `buildIndexRestoreHyperlinkFormula_`, `configureIndexRestoreWebAppUrl` | none | Properties/runtime state |
| FN-093 | `escapeHtml_` | `4_System_Index.gs:378–386` | `text` | `doGet` | none | in-memory/pure by static signature |
| FN-094 | `doGet` | `4_System_Index.gs:388–424` | `e` | entry only | `escapeHtml_`, `restoreSheetFromActiveIndexRow`, `restoreSheetFromArchiveWorkbook` | Archival/external workbook, Lock/concurrency |
| FN-096 | `applyTemplateColumnWidths_` | `5_System_Templates.gs:14–18` | `sheet, template, width` | `enforceDemoPPostFlattenFormatting_` | none | in-memory/pure by static signature |
| FN-099 | `ensureGoldenMasterTemplate_` | `5_System_Templates.gs:48–71` | `dashboard, timing` | `buildAllTemplatesAndValidate`, `createOrRefreshTemplateFromDashboard_` | `markFrameworkStep_` | Formatting, Sheet visibility, Timing/logging, Worksheet read |
| FN-102 | `forceBaseTemplateHidden_` | `5_System_Templates.gs:145–152` | `none` | `buildAllTemplatesAndValidate`, `setReportTemplateVisibility_` | `logBestEffortWarning_` | Sheet visibility, Worksheet read |
| FN-103 | `createOrRefreshTemplateFromDashboard_` | `5_System_Templates.gs:156–177` | `dashboard, sheetDef, timing` | `buildAllTemplatesAndValidate` | `buildTemplateFromDashboard_`, `ensureGoldenMasterTemplate_`, `getBehaviorForSheetType_`, `getHeadersForSheetType_` | Sheet creation/copy, Sheet visibility, Worksheet read, Worksheet write |
| FN-104 | `buildTemplateFromDashboard_` | `5_System_Templates.gs:179–191` | `sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing, templateExisted` | `createOrRefreshTemplateFromDashboard_` | `applyTemplateBaseFormatting_`, `applyTemplateFreezeAndTabColor_`, `clearTemplateForFullBuild_`, `markFrameworkStep_`, `writeTemplateMetadata_` | Timing/logging |
| FN-105 | `clearTemplateForFullBuild_` | `5_System_Templates.gs:193–209` | `sheet, sheetDef, timing, templateExisted` | `buildTemplateFromDashboard_` | `markFrameworkStep_` | Timing/logging, Worksheet read, Worksheet write |
| FN-106 | `applyTemplateBaseFormatting_` | `5_System_Templates.gs:211–236` | `sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing` | `buildTemplateFromDashboard_` | `ensureTemplateFilter_`, `getThemeColorsFromBase_` | Formatting, Worksheet read |
| FN-107 | `ensureTemplateFilter_` | `5_System_Templates.gs:238–259` | `sheet, headerRow, rowCount, colCount, sheetDef, timing` | `applyTemplateBaseFormatting_` | `markFrameworkStep_` | Timing/logging, Worksheet read |
| FN-108 | `applyTemplateFreezeAndTabColor_` | `5_System_Templates.gs:261–270` | `sheet, dashboard, sheetDef, colCount, timing` | `buildTemplateFromDashboard_` | `getThemeColorsFromBase_` | Formatting |
| FN-109 | `writeTemplateMetadata_` | `5_System_Templates.gs:272–283` | `sheet, dashboard, sheetDef, colCount` | `buildTemplateFromDashboard_` | none | Worksheet read |
| FN-110 | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:287–314` | `none` | `quickBuildAllTemplates` | `createOrRefreshTemplateFromDashboard_`, `ensureGoldenMasterTemplate_`, `forceBaseTemplateHidden_`, `loadDashboardConfig_`, `logBestEffortWarning_`, `setReportTemplateVisibility_` | in-memory/pure by static signature |
| FN-111 | `quickBuildAllTemplates` | `5_System_Templates.gs:316–320` | `none` | entry only | `buildAllTemplatesAndValidate` | UI/notification |
| FN-112 | `setReportTemplateVisibility_` | `5_System_Templates.gs:322–342` | `dashboard, hidden, timing` | `buildAllTemplatesAndValidate` | `forceBaseTemplateHidden_` | Sheet visibility |
| FN-120 | `createMasterListSheetFromTemplate_` | `5_System_Templates.gs:411–415` | `ss, targetName, monthParts, timing, timingLabel` | `createMasterListForMonth_` | none | in-memory/pure by static signature |
| FN-123 | `buildRefinedDataFromScratch` | `7_Workflow_DemoP.gs:11–30` | `none` | entry only | `createActiveDemoPFromRawData_`, `enforceDemoPPostFlattenFormatting_`, `getValidatedRawDataSheetForDemoPBuild_`, `markFrameworkStep_`, `refreshIndexAfterSheetWorkflow_` | Timing/logging, UI/notification, Worksheet read |
| FN-124 | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:32–49` | `monthParts, timing` | `buildRefinedDataFromScratch` | `isStrictRawDataSheetCandidateForDemoP_`, `markRuntimeStep_` | Timing/logging |
| FN-125 | `isStrictRawDataSheetCandidateForDemoP_` | `7_Workflow_DemoP.gs:51–56` | `sheet, monthParts` | `getValidatedRawDataSheetForDemoPBuild_` | none | in-memory/pure by static signature |
| FN-126 | `createActiveDemoPFromRawData_` | `7_Workflow_DemoP.gs:58–85` | `rawSheet, targetName, monthParts, timing` | `buildRefinedDataFromScratch` | `buildHeaderIndexMap_`, `clearSheetRuntimeCachesForSheet_`, `loadDashboardConfig_`, `processRefinedDataUnified_`, `updateDemoPReportDates_` | in-memory/pure by static signature |
| FN-128 | `processRefinedDataUnified_` | `7_Workflow_DemoP.gs:115–123` | `workingData, monthParts, sourceSheetName, updateStatus, timing` | `createActiveDemoPFromRawData_` | `markFrameworkStep_`, `processDemoPFreshRowsInMemory_`, `safeFlattenAndProcessContacts_` | Timing/logging |
| FN-129 | `safeFlattenAndProcessContacts_` | `7_Workflow_DemoP.gs:125–133` | `workingData, preservePrimaryRows` | `processRefinedDataUnified_` | `flattenDemoPContactRowsInMemory_`, `logBestEffortWarning_` | in-memory/pure by static signature |
| FN-130 | `processDemoPFreshRowsInMemory_` | `7_Workflow_DemoP.gs:135–144` | `data` | `processRefinedDataUnified_` | `combineAddressesData_`, `combineNotesSummaryData_`, `handleLanguageData_`, `populateDemoPNameData_`, `populateParticipantNameData_`, `runMasterContactProcessData_`, `splitPhoneNumbersData_`, `updateBannerColumnData_` | in-memory/pure by static signature |
| FN-131 | `flattenDemoPContactRowsInMemory_` | `7_Workflow_DemoP.gs:148–201` | `data, requireIntegrity` | `safeFlattenAndProcessContacts_` | `buildDemoPContactSummaryForFlatRecord_`, `buildHeaderIndexMap_`, `getPMRIndex_`, `logBestEffortWarning_`, `normalizeCompareValue_`, `normalizePMR_`, `sortDemoPFlatRows_` | in-memory/pure by static signature |
| FN-132 | `buildDemoPContactSummaryForFlatRecord_` | `7_Workflow_DemoP.gs:203–213` | `row, headerMap` | `flattenDemoPContactRowsInMemory_` | none | in-memory/pure by static signature |
| FN-133 | `sortDemoPFlatRows_` | `7_Workflow_DemoP.gs:215–227` | `rows, headerMap` | `flattenDemoPContactRowsInMemory_` | none | in-memory/pure by static signature |
| FN-134 | `populateParticipantNameData_` | `7_Workflow_DemoP.gs:231–243` | `data, pmrFilter` | `processDemoPFreshRowsInMemory_` | `normalizeCompareValue_` | in-memory/pure by static signature |
| FN-135 | `populateDemoPNameData_` | `7_Workflow_DemoP.gs:245–257` | `data, pmrFilter` | `processDemoPFreshRowsInMemory_` | `normalizeCompareValue_` | in-memory/pure by static signature |
| FN-136 | `updateBannerColumnData_` | `7_Workflow_DemoP.gs:259–274` | `data, pmrFilter` | `processDemoPFreshRowsInMemory_` | `normalizeCompareValue_` | in-memory/pure by static signature |
| FN-137 | `combineAddressesData_` | `7_Workflow_DemoP.gs:276–288` | `data, pmrFilter` | `processDemoPFreshRowsInMemory_` | none | in-memory/pure by static signature |
| FN-138 | `handleLanguageData_` | `7_Workflow_DemoP.gs:290–309` | `data, pmrFilter` | `processDemoPFreshRowsInMemory_` | none | in-memory/pure by static signature |
| FN-139 | `splitPhoneNumbersData_` | `7_Workflow_DemoP.gs:311–336` | `data, pmrFilter` | `processDemoPFreshRowsInMemory_` | none | in-memory/pure by static signature |
| FN-140 | `combineNotesSummaryData_` | `7_Workflow_DemoP.gs:338–365` | `data, pmrFilter` | `processDemoPFreshRowsInMemory_` | `normalizeCompareValue_` | in-memory/pure by static signature |
| FN-147 | `updateDemoPReportDates_` | `7_Workflow_DemoP.gs:509–514` | `demoSheet, monthParts` | `createActiveDemoPFromRawData_` | none | Formatting, Worksheet read, Worksheet write |
| FN-148 | `enforceDemoPPostFlattenFormatting_` | `7_Workflow_DemoP.gs:516–531` | `demoSheet` | `buildRefinedDataFromScratch` | `applyTemplateColumnWidths_` | Worksheet read |
| FN-149 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `7_Workflow_DemoP.gs:533–600` | `demoSheet` | `syncDisenrolledExclusionFromRawData_` | `buildHeaderIndexMap_`, `clearSheetRuntimeCachesForSheet_`, `findHeaderIndex_`, `getDataValues_`, `getHeaders_`, `getPMRIndex_`, `logBestEffortWarning_`, `normalizeCompareValue_`, `normalizePMR_`, `normalizeRowsToWidth_` | Worksheet read, Worksheet write |
| FN-153 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:11–118` | `monthParts, parentTiming, preflight` | `createMasterList` | `buildMasterListHeadersBeforeDataCopy_`, `buildPrimaryDemoPRowsInMemory_`, `buildStagedMasterListSheetName_`, `cleanupFailedStagedMasterListSheet_`, `createMasterListSheetFromTemplate_`, `formatSeconds_`, `getHeaderMap_`, `getHeaders_`, `logBestEffortWarning_`, `markFrameworkStep_`, `markRuntimeStep_`, `promoteStagedMasterListSheet_`, `startFrameworkTiming_`, `syncCarePlanDueSourceIntoData_`, `syncUnlockedCarePlanSourceIntoData_`, `writeRuntimeTimingReport_` | Sheet visibility, Timing/logging, UI/notification, Worksheet read, Worksheet write |
| FN-154 | `createMasterList` | `8_Workflow_MasterList.gs:120–124` | `none` | entry only | `createMasterListForMonth_` | in-memory/pure by static signature |
| FN-155 | `buildPrimaryDemoPRowsInMemory_` | `8_Workflow_MasterList.gs:128–168` | `demoSheet, masterHeaders, masterHeaderMap` | `createMasterListForMonth_` | `getDataValues_`, `getMasterTargetIndex_`, `getPMRIndex_`, `normalizePMR_` | in-memory/pure by static signature |
| FN-156 | `getMasterTargetIndex_` | `8_Workflow_MasterList.gs:142–149` | `header` | `buildPrimaryDemoPRowsInMemory_` | none | in-memory/pure by static signature |
| FN-160 | `syncUnlockedCarePlanSourceIntoData_` | `8_Workflow_MasterList.gs:206–215` | `data, monthParts, pmrFilter` | `createMasterListForMonth_` | `buildSourceMapBySingleKeyForPart5_`, `syncRowsFromSourceMapData_` | UI/notification |
| FN-161 | `syncCarePlanDueSourceIntoData_` | `8_Workflow_MasterList.gs:217–226` | `data, monthParts, pmrFilter` | `createMasterListForMonth_` | `buildSourceMapBySingleKeyForPart5_`, `syncRowsFromSourceMapData_` | UI/notification |
| FN-162 | `syncRowsFromSourceMapData_` | `8_Workflow_MasterList.gs:228–247` | `data, sourceMap, config, pmrFilter` | `syncCarePlanDueSourceIntoData_`, `syncUnlockedCarePlanSourceIntoData_` | `normalizeSyncFieldPairs_`, `normalizeSyncKey_` | in-memory/pure by static signature |
| FN-163 | `buildSourceMapBySingleKeyForPart5_` | `8_Workflow_MasterList.gs:249–265` | `sheet, headerRow, dataStartRow, keyHeader` | `syncCarePlanDueSourceIntoData_`, `syncUnlockedCarePlanSourceIntoData_` | `getDataValues_`, `normalizeSyncKey_` | in-memory/pure by static signature |
| FN-164 | `normalizeSyncKey_` | `8_Workflow_MasterList.gs:267–283` | `value, header` | `buildSourceMapBySingleKeyForPart5_`, `syncRowsFromSourceMapData_` | none | in-memory/pure by static signature |
| FN-165 | `normalizeSyncFieldPairs_` | `8_Workflow_MasterList.gs:285–287` | `fields` | `syncRowsFromSourceMapData_` | none | in-memory/pure by static signature |
| FN-166 | `runMasterContactProcessData_` | `8_Workflow_MasterList.gs:291–294` | `data, pmrFilter` | `processDemoPFreshRowsInMemory_` | `writePMRContactsToParticipantRows_` | in-memory/pure by static signature |
| FN-167 | `writePMRContactsToParticipantRows_` | `8_Workflow_MasterList.gs:296–367` | `targetSheet, values, headers, headerMap, pmrFilter` | `runMasterContactProcessData_` | `buildParticipantContactKey_`, `capitalizeContactPart_`, `formatRankedContact_`, `getPMRIndex_`, `normalizeCompareValue_`, `normalizePMR_` | in-memory/pure by static signature |
| FN-168 | `buildParticipantContactKey_` | `8_Workflow_MasterList.gs:369–376` | `row, headerMap, pmrIdx, firstIdx, lastIdx` | `writePMRContactsToParticipantRows_` | `normalizeKeyPart_`, `normalizePMR_` | in-memory/pure by static signature |
| FN-169 | `capitalizeContactPart_` | `8_Workflow_MasterList.gs:378–380` | `value` | `writePMRContactsToParticipantRows_` | none | in-memory/pure by static signature |
| FN-170 | `formatRankedContact_` | `8_Workflow_MasterList.gs:382–391` | `contact` | `writePMRContactsToParticipantRows_` | none | in-memory/pure by static signature |
| FN-172 | `buildStagedMasterListSheetName_` | `8_Workflow_MasterList.gs:421–424` | `masterName` | `createMasterListForMonth_` | `safeSheetName_` | in-memory/pure by static signature |
| FN-173 | `isStagedMasterListSheet_` | `8_Workflow_MasterList.gs:426–429` | `sheet, masterName` | `cleanupFailedStagedMasterListSheet_`, `validateStagedMasterListBeforeSwap_` | none | in-memory/pure by static signature |
| FN-174 | `validateStagedMasterListBeforeSwap_` | `8_Workflow_MasterList.gs:431–435` | `sheet, masterName, copiedRowCount` | `promoteStagedMasterListSheet_` | `isStagedMasterListSheet_` | Worksheet read |
| FN-175 | `promoteStagedMasterListSheet_` | `8_Workflow_MasterList.gs:437–450` | `ss, stagedSheet, existingSheet, masterName, copiedRowCount, timing, markStep` | `createMasterListForMonth_` | `clearSheetRuntimeCachesForSheet_`, `validateStagedMasterListBeforeSwap_` | Sheet deletion, Sheet visibility |
| FN-176 | `cleanupFailedStagedMasterListSheet_` | `8_Workflow_MasterList.gs:452–460` | `ss, sheet, masterName, timing, markStep` | `createMasterListForMonth_` | `isStagedMasterListSheet_`, `logBestEffortWarning_` | Sheet deletion |
| FN-177 | `buildMasterListHeadersBeforeDataCopy_` | `8_Workflow_MasterList.gs:462–474` | `demoSheet, masterSheet` | `createMasterListForMonth_` | `clearSheetRuntimeCachesForSheet_`, `getHeaders_` | Worksheet read, Worksheet write |
| FN-180 | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:11–64` | `monthParts, timing, options` | `buildMonthlyChangeReport` | `buildMonthlyChangeReportSectionLayout_`, `compareRawDataForMonthlyChange_`, `formatMonthlyChangeReportSectionSheet_`, `getPreviousRawDataSheet_`, `getSheetDefinitionByType_`, `loadDashboardConfig_`, `markRuntimeStep_`, `populateMonthlyChangeReportSections_`, `updateIndexSheet` | Sheet creation/copy, Sheet visibility, Timing/logging, UI/notification, Worksheet read, Worksheet write |
| FN-181 | `buildMonthlyChangeReport` | `9_Workflow_MonthlyChange.gs:66–72` | `none` | entry only | `buildMonthlyChangeReportForMonth_` | in-memory/pure by static signature |
| FN-182 | `compareRawDataForMonthlyChange_` | `9_Workflow_MonthlyChange.gs:76–169` | `previousDemo, currentDemo, monthParts` | `buildMonthlyChangeReportForMonth_` | `buildPrimitiveRowsHash_`, `getChangedColumnsForSectionRows_`, `getDataValues_`, `getFieldValueFromRow_`, `getPMRIndex_`, `getRawDemoPDataForCompare_`, `isMonthlyChangeDisenrollmentEffectiveDate_`, `isSameDate_`, `normalizePMR_`, `rowsWithDOBOnlyForSection_` | Worksheet read |
| FN-183 | `getRawDemoPDataForCompare_` | `9_Workflow_MonthlyChange.gs:171–203` | `sheet` | `compareRawDataForMonthlyChange_` | `getDOBIndex_`, `getDataValues_`, `getPMRIndex_`, `normalizeCompareValue_`, `normalizePMR_` | in-memory/pure by static signature |
| FN-184 | `rowsWithDOBOnlyForSection_` | `9_Workflow_MonthlyChange.gs:207–211` | `items, headerMap` | `compareRawDataForMonthlyChange_` | `getDOBIndex_`, `normalizeCompareValue_` | in-memory/pure by static signature |
| FN-185 | `buildPrimitiveRowsHash_` | `9_Workflow_MonthlyChange.gs:213–217` | `items, headerMap, columnsToCompare` | `compareRawDataForMonthlyChange_` | `normalizeCompareValue_` | in-memory/pure by static signature |
| FN-186 | `getChangedColumnsForSectionRows_` | `9_Workflow_MonthlyChange.gs:219–230` | `currentItems, previousItems, currentHeaders, previousHeaders, columnsToCompare, currentHeaderMap, previousHeaderMap` | `compareRawDataForMonthlyChange_` | `buildColumnSignaturesForSection_` | in-memory/pure by static signature |
| FN-187 | `buildColumnSignaturesForSection_` | `9_Workflow_MonthlyChange.gs:232–240` | `items, headerMap, columnsToCompare` | `getChangedColumnsForSectionRows_` | `normalizeCompareValue_` | in-memory/pure by static signature |
| FN-188 | `isMonthlyChangeDisenrollmentEffectiveDate_` | `9_Workflow_MonthlyChange.gs:242–244` | `effectiveDate, monthParts` | `buildMonthlyChangeSectionRows_`, `compareRawDataForMonthlyChange_` | `isSameDate_` | in-memory/pure by static signature |
| FN-191 | `getFieldValueFromRow_` | `9_Workflow_MonthlyChange.gs:285–288` | `row, headerMap, field` | `compareRawDataForMonthlyChange_` | none | in-memory/pure by static signature |
| FN-193 | `displayValueForReport_` | `9_Workflow_MonthlyChange.gs:301–304` | `value` | `buildMonthlyChangeReportRow_` | `formatDateDisplay_` | in-memory/pure by static signature |
| FN-194 | `formatDateDisplay_` | `9_Workflow_MonthlyChange.gs:306–309` | `date` | `displayValueForReport_` | `normalizeToDateObject_` | in-memory/pure by static signature |
| FN-195 | `getMonthlyChangeSectionSpecs_` | `9_Workflow_MonthlyChange.gs:313–323` | `sectionData` | `populateMonthlyChangeReportSections_` | none | in-memory/pure by static signature |
| FN-196 | `buildMonthlyChangeSectionRows_` | `9_Workflow_MonthlyChange.gs:325–366` | `currentData, previousData, pmrSet, sectionTitle, rowMode, changedColumnsByPMR, monthParts` | `populateMonthlyChangeReportSections_` | `buildHeaderIndexMap_`, `buildMonthlyChangeReportRow_`, `findHeaderIndex_`, `getDOBIndex_`, `getMonthlyChangeReportHeaders_`, `isMonthlyChangeDisenrollmentEffectiveDate_`, `normalizeCompareValue_` | in-memory/pure by static signature |
| FN-197 | `appendMonthlyChangeCompiledRow_` | `9_Workflow_MonthlyChange.gs:368–373` | `matrix, rowValues, backgroundColor, fontWeight, fontSize, lastCol` | `appendMonthlyChangeSectionBlock_` | `padRowToWidth_` | in-memory/pure by static signature |
| FN-198 | `appendMonthlyChangeSectionBlock_` | `9_Workflow_MonthlyChange.gs:375–406` | `matrix, spec, dataRows, reportHeaders, theme, lastCol, globals` | `populateMonthlyChangeReportSections_` | `appendMonthlyChangeCompiledRow_`, `padRowToWidth_` | in-memory/pure by static signature |
| FN-199 | `populateMonthlyChangeReportSections_` | `9_Workflow_MonthlyChange.gs:408–439` | `reportSheet, sectionData, monthParts` | `buildMonthlyChangeReportForMonth_` | `appendMonthlyChangeSectionBlock_`, `buildMonthlyChangeSectionRows_`, `getMonthlyChangeReportHeaders_`, `getMonthlyChangeSectionSpecs_`, `getSheetDefinitionByType_`, `getThemeColorsFromBase_`, `loadDashboardConfig_` | Worksheet read, Worksheet write |
| FN-200 | `buildMonthlyChangeReportRow_` | `9_Workflow_MonthlyChange.gs:441–470` | `sourceRow, sourceHeaders, reportHeaders, changedColumns, dateIndexes, previousItem, previousHeaderMap` | `buildMonthlyChangeSectionRows_` | `convertMonthlyChangeReportDateValues_`, `displayValueForReport_` | in-memory/pure by static signature |
| FN-201 | `convertMonthlyChangeReportDateValues_` | `9_Workflow_MonthlyChange.gs:472–483` | `rowValues, reportHeaders, dateIndexes` | `buildMonthlyChangeReportRow_` | `getMonthlyChangeReportDateIndexes_`, `normalizeToDateObject_` | in-memory/pure by static signature |
| FN-202 | `getMonthlyChangeReportHeaders_` | `9_Workflow_MonthlyChange.gs:485–489` | `sourceHeaders` | `buildMonthlyChangeReportSectionLayout_`, `buildMonthlyChangeSectionRows_`, `formatMonthlyChangeReportSectionSheet_`, `populateMonthlyChangeReportSections_` | none | in-memory/pure by static signature |
| FN-203 | `getMonthlyChangeReportDateIndexes_` | `9_Workflow_MonthlyChange.gs:491–497` | `headers` | `convertMonthlyChangeReportDateValues_` | `isDateLikeHeader_` | in-memory/pure by static signature |
| FN-204 | `buildMonthlyChangeReportSectionLayout_` | `9_Workflow_MonthlyChange.gs:499–518` | `reportSheet, sourceSheet, headers, monthParts` | `buildMonthlyChangeReportForMonth_` | `getMonthlyChangeReportHeaders_`, `padRowToWidth_` | Formatting, Worksheet read, Worksheet write |
| FN-205 | `formatMonthlyChangeReportSectionSheet_` | `9_Workflow_MonthlyChange.gs:520–528` | `reportSheet, sourceHeaders` | `buildMonthlyChangeReportForMonth_` | `getMonthlyChangeReportHeaders_`, `loadDashboardConfig_` | Formatting |
| FN-206 | `getPreviousRawDataSheet_` | `9_Workflow_MonthlyChange.gs:530–534` | `monthParts` | `buildMonthlyChangeReportForMonth_` | none | in-memory/pure by static signature |
| FN-207 | `createDisenrolledList` | `_10_Workflow_Disenrolled.gs:11–23` | `none` | entry only | `createDisenrolledListForMonth_` | in-memory/pure by static signature |
| FN-208 | `createDisenrolledListForMonth_` | `_10_Workflow_Disenrolled.gs:25–61` | `monthParts, timing, options` | `createDisenrolledList` | `getOrCreateDisenrolledExclusionSheet_`, `hideOldDisenrolledRows_`, `markFrameworkStep_`, `refreshIndexAfterSheetWorkflow_`, `syncDisenrolledExclusionFromRawData_` | Timing/logging, UI/notification |
| FN-209 | `syncDisenrolledExclusionFromRawData_` | `_10_Workflow_Disenrolled.gs:65–158` | `exclusionSheet, rawSheet, monthParts, timing, timingPrefix` | `createDisenrolledListForMonth_` | `buildHeaderIndexMap_`, `clearSheetRuntimeCachesForSheet_`, `findHeaderIndex_`, `getDataValues_`, `getHeadersForSheetType_`, `getPMRIndex_`, `loadDashboardConfig_`, `markFrameworkStep_`, `normalizeCompareValue_`, `normalizePMR_`, `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Timing/logging, Worksheet read, Worksheet write |
| FN-210 | `hideOldDisenrolledRows_` | `_10_Workflow_Disenrolled.gs:165–195` | `sheet` | `createDisenrolledListForMonth_` | `createLocalDateOnly_`, `getDataValues_`, `hideRowNumberBatches_`, `normalizeToDateObject_` | in-memory/pure by static signature |
| FN-211 | `hideRowNumberBatches_` | `_10_Workflow_Disenrolled.gs:197–220` | `sheet, rowNumbers` | `hideOldDisenrolledRows_` | none | in-memory/pure by static signature |
| FN-212 | `getOrCreateDisenrolledExclusionSheet_` | `_10_Workflow_Disenrolled.gs:224–259` | `ss, timing, timingPrefix` | `createDisenrolledListForMonth_` | `getHeadersForSheetType_`, `getSheetDefinitionByType_`, `loadDashboardConfig_` | Formatting, Sheet creation/copy, Sheet visibility, Worksheet read, Worksheet write |

## Parent-to-Child Call Graph / Call-edge register

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
| EDGE-0149 | `doGet` | `escapeHtml_` | `4_System_Index.gs:392` | direct lexical |
| EDGE-0150 | `doGet` | `restoreSheetFromArchiveWorkbook` | `4_System_Index.gs:404` | conditional/loop |
| EDGE-0151 | `doGet` | `restoreSheetFromActiveIndexRow` | `4_System_Index.gs:405` | direct lexical |
| EDGE-0152 | `doGet` | `escapeHtml_` | `4_System_Index.gs:418` | direct lexical |
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

## Menu/Trigger-to-Function Dependency Matrix

| Entry ID | Root | Reachable function count |
|---|---|---:|
| MENU-001 | `formatMonthlySheets` | 0 |
| MENU-002 | `runMonthlyUpdate` | 0 |
| MENU-003 | `runMonthlyStart` | 0 |
| MENU-004 | `hideMonthlyImportSheets` | 0 |
| MENU-005 | `archiveMonthlyImportSheets` | 0 |
| MENU-006 | `hideMonthlyActiveSheets` | 0 |
| MENU-007 | `archiveMonthlyActiveSheets` | 0 |
| MENU-008 | `buildAllTemplatesAndValidate` | 40 |
| MENU-009 | `showReportTemplates` | 0 |
| MENU-010 | `hideReportTemplates` | 0 |
| MENU-011 | `hideSystemSheets_` | 0 |
| MENU-012 | `showSystemSheets_` | 0 |
| MENU-013 | `quickSystemSetup` | 0 |
| MENU-014 | `buildSystemSheets` | 0 |
| MENU-015 | `setupSystemSheets` | 0 |
| MENU-016 | `quickBuildAllTemplates` | 41 |
| MENU-017 | `runDashboardQualityWorkflow` | 0 |
| MENU-018 | `runDashboardQualityStartUp` | 0 |
| MENU-019 | `runDashboardQualityValidateTemplates` | 0 |
| MENU-020 | `runDashboardQualityWorkflow` | 0 |
| MENU-021 | `formatBannerReport` | 0 |
| MENU-022 | `formatCarePlanDueReport` | 0 |
| MENU-023 | `formatUnlockedCarePlanReport` | 0 |
| MENU-024 | `formatRawData` | 0 |
| MENU-025 | `updateRefinedDataMonthlySync` | 0 |
| MENU-026 | `buildRefinedDataFromScratch` | 69 |
| MENU-027 | `createDisenrolledList` | 61 |
| MENU-028 | `buildMonthlyChangeReport` | 79 |
| MENU-029 | `createMasterList` | 37 |
| MENU-030 | `createSystemTemplates` | 0 |
| MENU-031 | `clearDiagnosticsAndTimingLogs` | 0 |
| MENU-032 | `toggleFrameworkTiming` | 0 |
| MENU-033 | `enforceGlobalSheetSortOrder` | 0 |
| MENU-034 | `buildSystemSheets` | 0 |
| MENU-035 | `setupSystemSheets` | 0 |
| MENU-036 | `rebuildFormatDashboardDefaults` | 0 |
| MENU-037 | `saveActiveLayoutToDashboardSettings` | 0 |
| MENU-038 | `buildAllTemplatesAndValidate` | 40 |
| MENU-039 | `updateIndexSheet` | 33 |
| MENU-040 | `restoreSheetFromActiveIndexRow` | 35 |
| MENU-041 | `configureIndexRestoreWebAppUrl` | 34 |
| MENU-042 | `configureArchiveSpreadsheetId` | 4 |
| TRG-001 | `onOpen` | 1 |
| TRG-002 | `doGet` | 37 |

## Section Dependency Matrix

| Source module | Reachable functions | Outgoing internal call occurrences |
|---|---:|---:|
| `1_Config.gs` | 4 | 2 |
| `2_Dashboard_Loaders.gs` | 24 | 89 |
| `3_Core_Helpers.gs` | 33 | 35 |
| `4_System_Index.gs` | 15 | 26 |
| `5_System_Templates.gs` | 14 | 26 |
| `6_System_Quality.gs` | 0 | 0 |
| `7_Workflow_DemoP.gs` | 20 | 53 |
| `8_Workflow_MasterList.gs` | 21 | 56 |
| `9_Workflow_MonthlyChange.gs` | 24 | 74 |
| `_10_Workflow_Disenrolled.gs` | 6 | 29 |

## Circular Dependency Report

Cycles are guarded in per-entry graph expansion. Direct self-recursive edges, if any, follow.

| Caller | Line |
|---|---|
| — | No direct self-recursion detected |

## Shared Dependency Report

Shared functions are explicitly represented by repeated caller rows in the catalog and edge register; no expansion is inferred from naming.

## Missing Dependency Report

- Missing named internal callees: **0**.
- Dynamic/runtime-selected service calls: **NOT VERIFIED** outside static source.

## Reconciliation

- Reachable functions: **161**
- Named call occurrences: **390**
- Unique caller/callee pairs: **299**
