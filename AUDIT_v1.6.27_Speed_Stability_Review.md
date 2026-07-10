# AUDIT v1.6.27 Speed and Stability Static Review

Source reviewed: `Current_Production Script/v.1.6.27_Production_Script`. Declared version: `1.6.27`. Source size: 15529 lines, 666 named `function` declarations.

## Methodology

* Ran `node --check` against a copied monolith to confirm V8/JavaScript parse stability.
* Performed targeted static scans for Spreadsheet API hotspots, trigger behavior, logging/catch surfaces, no-data guards, row/column batch helpers, Monthly Change comparison helpers, and retained retired-artifact tokens.
* Built the named-function inventory at the end of this document so reviewers can navigate line-by-line through the monolith without rebuilding the script.

## Static Metrics

* **`getRange(` occurrences:** 308
* **`setValues(` occurrences:** 59
* **`getValues(` occurrences:** 50
* **`Logger.log(` occurrences:** 4
* **`logBestEffortWarning_(` occurrences:** 97
* **`catch (` occurrences:** 138
* **`SpreadsheetApp.flush` occurrences:** 1
* **`getDataRange()` occurrences:** 3
* **`getLastRow()` occurrences:** 63
* **`setColumnWidth(` occurrences:** 6
* **`setRowHeight(` occurrences:** 2
* **`insertSheet(` occurrences:** 13
* **`deleteSheet(` occurrences:** 14
* **`ScriptApp.newTrigger` occurrences:** 1
* **`LockService` occurrences:** 1
* **`PropertiesService` occurrences:** 10
* **`JSON.stringify` occurrences:** 5
* **`sort(` occurrences:** 26
* **`forEach(` occurrences:** 234
* **`map(` occurrences:** 100
* **`getA1Notation(` occurrences:** 0
* **`MASTER_LIST_CHANGE_LOG` occurrences:** 0
* **`appendMasterListChangeLog_` occurrences:** 0
* **Total source lines:** 15529
* **Named function declarations:** 666

## Executive Summary

The v1.6.27 artifact is syntactically stable and contains the major speed/stability hardening expected from the recent patch series: direct `Logger.log` usage is centralized in runtime logging helpers, retired Master List Change Log tokens are absent, loop-time `getA1Notation()` is absent, row deletions are batched, Monthly Change contact comparison uses deterministic keys, and Quick System Setup now runs the Quality Smokescreen and installs the Index auto-refresh trigger.

The remaining speed/stability risks are operational rather than syntactic. The most important is that the new on-change trigger calls the full `createIndexSheet()` path, which also opens the archive spreadsheet and redraws the full Index; this is acceptable for low-frequency sheet add/remove events but can be expensive if automated workflows create many sheets in a burst. A debounce/property guard or local-only index refresh mode would reduce trigger pressure.

## High-Value Stability Passes

### PASS: Versioned v1.6.27 artifact is parseable

The script declares `MASTER_LIST_MERGE_ML_VERSION = "1.6.27"` at line 32, and `node --check` passed on `/tmp/v1627.js`.

### PASS: Quality Smokescreen is wired into Quick System Setup

`quickSystemSetup()` now runs Dashboard Quality start-up and then calls `runFrameworkSmokeValidation()` at lines 812-823.

### PASS: Runtime smoke rows cover critical guard rails

`collectFrameworkSmokeValidationRows_()` validates zero-row guards, fatal title-write behavior, Demo P delete/trim behavior, duplicate contact keys, Monthly Change menu availability, and the Index trigger path around lines 6363-6405.

### PASS: Index auto-refresh trigger is present and lock-guarded

`setupIndexRefreshOnSheetAddedTrigger_()` installs one `onChange` trigger and `handleSpreadsheetChangeForIndex(e)` refreshes Index for `INSERT_GRID` / `REMOVE_GRID` events under a document lock at lines 11480-11510.

### PASS: Direct Logger usage remains centralized

There are four direct `Logger.log(` calls, all in runtime logging helpers near lines 1824-1843. Non-fatal warning paths route through `logBestEffortWarning_`.

### PASS: Date serial conversion avoids fractional millisecond drift

`spreadsheetSerialDateToLocalDate_()` uses whole-day/fractional-day separation and strips milliseconds after applying fractional days at lines 894-911.

## Speed and Stability Findings

### MEDIUM: Index trigger uses the full Index redraw and archive open path

`handleSpreadsheetChangeForIndex(e)` calls `createIndexSheet()` for sheet-grid changes. `createIndexSheet()` rebuilds the full matrix, opens the archive spreadsheet, sorts archive tabs, and repaints the Index. This is stable for occasional tab additions/removals but can be slow under bulk sheet creation or if archive access is delayed. Evidence: trigger lines 11497-11510; archive/open and redraw lines 11321-11475.

**Recommendation:** Add a 10-30 second debounce using `PropertiesService` in the trigger handler, or add a local-only `createIndexSheet_({ skipArchive: true })` mode for trigger refreshes while preserving the full archive refresh for manual Index builds.

### LOW: Quick System Setup is intentionally comprehensive and may approach runtime ceilings

`quickSystemSetup()` rebuilds dashboard defaults, sets up system sheets/triggers, builds Index, runs Dashboard Quality start-up, and runs the smoke harness. This is convenient and stable after the latest patches, but it is a heavy single-click path. Evidence lines 812-823.

**Recommendation:** Keep the current all-in-one flow, but consider adding a separate lightweight `quickSystemSetupCore_()` for trigger/index bootstrap only if real users hit Apps Script execution-time limits.

### LOW: Toast helper forces a Spreadsheet flush for every setup status message

`showQuickStartToast_()` calls `SpreadsheetApp.flush()` after every toast. The call count is low, but flushes can force pending Spreadsheet operations earlier than necessary during heavy setup. Evidence lines 807-811.

**Recommendation:** If setup latency becomes visible, allow `showQuickStartToast_(message, { flush: false })` and flush only at major phase boundaries.

### LOW: Health-check function existence uses `eval`

`existsFunctionByName_(name)` uses `eval("typeof " + name)`. Input is controlled by internal arrays, so this is not an immediate safety issue, but `globalThis[name]` is simpler and avoids dynamic evaluation. Evidence lines 15153-15167.

**Recommendation:** Replace with `return typeof globalThis[name] === "function";` in a future cleanup pass if Apps Script V8 global binding behavior is confirmed in the bound project.

### LOW: Header drift in Demo P is best-effort logged, not fatal

Demo P header drift detection emits `logBestEffortWarning_` and continues. That protects runtime continuity, but if upstream header drift becomes a data-governance risk, this should become a hard failure before transformations. Evidence lines 7261-7270.

**Recommendation:** Keep warning behavior for now; escalate to throw only if smoke/validation results show recurring header mismatches.

## Suggested Remediation Queue

1. Add a debounce or local-only refresh mode for the on-change Index trigger if users add sheets in bursts.
2. Consider replacing `eval` in `existsFunctionByName_()` with a V8-safe global lookup.
3. Watch Quick System Setup runtime after the Smokescreen addition; split into core/full variants only if execution time becomes a real issue.
4. Keep Demo P header drift as warning unless production data shows drift should halt processing.

## Named Function Line Inventory

Current v1.6.27 named function map for line-by-line navigation:

* Lines 236-242: `h_`.
* Lines 243-356: `getDefaultColumnDefinitionRows_`.
* Lines 357-375: `getAllUniqueHeaders_`.
* Lines 376-475: `getColumnStandards_`.
* Lines 476-489: `c_`.
* Lines 490-503: `writeDashboardTitle_`.
* Lines 504-538: `writeDashboardSection_`.
* Lines 539-570: `styleDashboard_`.
* Lines 571-574: `setupReportFormattingDashboard`.
* Lines 575-583: `appendDashboardSectionRows_`.
* Lines 584-617: `getResolvedDefaultColumnDefinitionRows_`.
* Lines 618-692: `writeDashboardDefaultsFast_`.
* Lines 693-696: `rebuildFormatDashboardDefaults`.
* Lines 697-711: `setupReportFormattingDashboardFromScriptDefaults_`.
* Lines 712-729: `normalizeDashboardSheetTypeKey_`.
* Lines 730-736: `getSheetDefinitionByTypeOrNull_`.
* Lines 737-742: `getSheetDefinitionByType_`.
* Lines 743-756: `sortSheetDefinitionsByProductionOrder_`.
* Lines 757-764: `notify_`.
* Lines 765-776: `trimExcessRows_`.
* Lines 777-806: `hideOldDisenrolledRows_`.
* Lines 807-811: `showQuickStartToast_`.
* Lines 812-825: `quickSystemSetup`.
* Lines 826-833: `quickBuildAllTemplates`.
* Lines 834-838: `notifyErrorWithTiming_`.
* Lines 839-843: `isBlankCell_`.
* Lines 844-893: `coerceToValidDate_`.
* Lines 894-913: `spreadsheetSerialDateToLocalDate_`.
* Lines 914-918: `isReasonableReportDate_`.
* Lines 919-922: `createLocalDateOnly_`.
* Lines 923-927: `getTodayLocalDate_`.
* Lines 928-952: `getMonthDateParts_`.
* Lines 953-956: `formatDateForSheetName_`.
* Lines 957-961: `formatDateDisplay_`.
* Lines 962-966: `dateKey_`.
* Lines 967-970: `isSameDate_`.
* Lines 971-975: `isSameMonth_`.
* Lines 976-980: `buildMonthlySheetName_`.
* Lines 981-986: `buildStandardMonthlySheetName_`.
* Lines 987-1017: `getNewestFormattedMonthlySheetByPrefix_`.
* Lines 1018-1051: `getMonthlySheetByPrefixAndDate_`.
* Lines 1052-1084: `setUniqueSheetName_`.
* Lines 1085-1104: `getHeaders_`.
* Lines 1105-1119: `getHeaderMap_`.
* Lines 1120-1128: `buildHeaderIndexMap_`.
* Lines 1129-1135: `findHeaderIndex_`.
* Lines 1136-1143: `normalizeHeader_`.
* Lines 1144-1150: `normalizePMR_`.
* Lines 1151-1154: `getPMRIndex_`.
* Lines 1155-1158: `getDOBIndex_`.
* Lines 1159-1177: `normalizeKeyPart_`.
* Lines 1178-1217: `getDataValues_`.
* Lines 1218-1251: `getRawDataSourceDataForOutput_`.
* Lines 1252-1266: `rawDataSourceHeaderRow_`.
* Lines 1267-1283: `ensurePrimaryPMRRowColumn_`.
* Lines 1284-1310: `assignPrimaryRowForBlock_`.
* Lines 1311-1344: `deleteRowNumberBatches_`.
* Lines 1345-1354: `buildMasterListHeadersBeforeDataCopy_`.
* Lines 1355-1381: `ensureHeaders_`.
* Lines 1382-1385: `ensureBannerSummaryOutputHeaders_`.
* Lines 1386-1399: `ensureContactOutputHeaders_`.
* Lines 1400-1409: `trimOutputSheetToDataSize_`.
* Lines 1410-1444: `copyChangedPMRsFromDemoPToMasterList_`.
* Lines 1445-1450: `applyFinalRowHeightLock_`.
* Lines 1451-1480: `normalizeCompareValue_`.
* Lines 1481-1484: `valuesAreEqual_`.
* Lines 1485-1488: `normalizeText_`.
* Lines 1489-1492: `normalizeKey_`.
* Lines 1493-1497: `numberOrDefault_`.
* Lines 1498-1507: `parseBoolean_`.
* Lines 1508-1522: `clearHeaderCacheForSheet_`.
* Lines 1523-1527: `clearSheetRuntimeCachesForSheet_`.
* Lines 1528-1534: `getHeaderCacheKey_`.
* Lines 1535-1540: `clearMonthlySheetLookupCache_`.
* Lines 1541-1547: `getMonthlySheetLookupCacheKey_`.
* Lines 1548-1551: `getSheetDimensionCacheKey_`.
* Lines 1552-1557: `clearSheetDimensionCacheForSheet_`.
* Lines 1558-1577: `getSheetDimensions_`.
* Lines 1578-1583: `dateOnlyLocalClone_`.
* Lines 1584-1588: `monthKey_`.
* Lines 1589-1608: `parseStandardMonthlySheetDateFromName_`.
* Lines 1609-1643: `buildRowsByPMR_`.
* Lines 1644-1650: `safeSheetName_`.
* Lines 1651-1654: `compareValues_`.
* Lines 1655-1658: `toBool_`.
* Lines 1659-1662: `truthy_`.
* Lines 1663-1666: `toNumber_`.
* Lines 1667-1682: `resizeSheetMinimum_`.
* Lines 1683-1693: `getThemeColorsFromBase_`.
* Lines 1694-1698: `getGlobalBorderStyle_`.
* Lines 1699-1709: `normalizeHex_`.
* Lines 1710-1716: `hexWithHslLightness_`.
* Lines 1717-1725: `hexToRgb_`.
* Lines 1726-1733: `rgbToHex_`.
* Lines 1734-1755: `rgbToHsl_`.
* Lines 1756-1778: `hslToRgb_`.
* Lines 1779-1791: `startRuntimeTiming_`.
* Lines 1792-1818: `markRuntimeStep_`.
* Lines 1819-1823: `addRuntimeCounter_`.
* Lines 1824-1828: `logRuntimeInfo_`.
* Lines 1829-1833: `logRuntimeWarning_`.
* Lines 1834-1838: `logRuntimeError_`.
* Lines 1839-1842: `logBestEffortWarning_`.
* Lines 1843-1859: `logRuntimeTiming_`.
* Lines 1860-1867: `getRuntimeTimingSeverity_`.
* Lines 1868-1871: `getRuntimeTimingReportName_`.
* Lines 1872-1877: `writeRuntimeTimingReport_`.
* Lines 1878-1881: `writeConsolidatedTimingSummaryReport_`.
* Lines 1882-1899: `writeCombinedFrameworkTimingReport_`.
* Lines 1900-1903: `getFrameworkTimingRetentionLimit_`.
* Lines 1904-1907: `getFrameworkTimingReportSheetName_`.
* Lines 1908-1932: `getFrameworkTimingSectionRegistry_`.
* Lines 1933-1945: `findFrameworkTimingSectionRow_`.
* Lines 1946-1958: `findNextFrameworkTimingSectionRow_`.
* Lines 1959-1977: `collectExistingFrameworkTimingSectionBlocks_`.
* Lines 1978-1989: `buildDefaultFrameworkTimingSectionBlock_`.
* Lines 1990-2019: `normalizeFrameworkTimingSectionBlock_`.
* Lines 2020-2061: `rebuildFrameworkTimingReportShellCompact_`.
* Lines 2062-2087: `hasFrameworkTimingReportShell_`.
* Lines 2088-2106: `initializeFrameworkTimingSheet_`.
* Lines 2107-2110: `ensureFrameworkTimingReport_`.
* Lines 2111-2124: `trimSheetToColumnCount_`.
* Lines 2125-2227: `styleFrameworkTimingReport_`.
* Lines 2228-2235: `getFrameworkTimingSectionForId_`.
* Lines 2236-2280: `replaceFrameworkTimingSectionRows_`.
* Lines 2281-2298: `getFrameworkTimingBenchmarkForProcess_`.
* Lines 2299-2306: `getFrameworkTimingThresholdForSeverity_`.
* Lines 2307-2315: `ensureFrameworkTimingReportShell_`.
* Lines 2316-2322: `getFrameworkTimingDetailStartRow_`.
* Lines 2323-2346: `getFrameworkTimingDetailRows_`.
* Lines 2347-2367: `getLatestFrameworkTimingRowsByProcess_`.
* Lines 2368-2377: `getFrameworkTimingBenchmarkSeverity_`.
* Lines 2378-2386: `getFrameworkTimingModeForStep_`.
* Lines 2387-2391: `mergeFrameworkTimingModes_`.
* Lines 2392-2469: `buildFrameworkTimingProcessSummaryRows_`.
* Lines 2470-2479: `formatTimingTimestampForSummary_`.
* Lines 2480-2509: `buildFrameworkTimingIssueRows_`.
* Lines 2510-2526: `buildFrameworkTimingRecommendationRows_`.
* Lines 2527-2530: `writeFrameworkPerformanceRecommendationsSheet_`.
* Lines 2531-2570: `getPerformanceRecommendationForTimingStep_`.
* Lines 2571-2577: `worseTimingSeverity_`.
* Lines 2578-2603: `appendRuntimeTimingToFrameworkTimingReport_`.
* Lines 2604-2612: `formatSeconds_`.
* Lines 2613-2616: `refreshFrameworkTimingReport`.
* Lines 2617-2672: `writeFrameworkTimingPerformanceRecommendations`.
* Lines 2673-2750: `onOpen`.
* Lines 2751-2759: `isFrameworkTimingEnabled_`.
* Lines 2760-2767: `toggleFrameworkTiming`.
* Lines 2768-2771: `hideTemplates_`.
* Lines 2772-2775: `showTemplates_`.
* Lines 2776-2779: `hideSystemSheets_`.
* Lines 2780-2783: `showSystemSheets_`.
* Lines 2784-2787: `formatDashboard`.
* Lines 2788-2829: `saveActiveLayoutToDashboardSettings`.
* Lines 2830-2842: `saveFormatDashboardConfigChanges_`.
* Lines 2843-2861: `resolveSheetDefinitionForLayoutSnapshot_`.
* Lines 2862-2914: `captureActiveSheetLayoutSnapshot_`.
* Lines 2915-2922: `getHiddenColumnFlags_`.
* Lines 2923-2927: `isDateNumberFormat_`.
* Lines 2928-2940: `getDefaultLayoutSnapshotBorderConfig_`.
* Lines 2941-2964: `upsertDashboardSheetDefinitionBaseColor_`.
* Lines 2965-3001: `upsertDashboardColumnDefinitionRows_`.
* Lines 3002-3029: `getDashboardSectionBounds_`.
* Lines 3030-3045: `ensureDashboardSectionDataCapacity_`.
* Lines 3046-3086: `writeDashboardLayoutSnapshotSection_`.
* Lines 3087-3100: `applyLayoutSnapshotBorder_`.
* Lines 3101-3206: `clearDiagnosticsAndTimingLogs`.
* Lines 3207-3211: `clearDashboardConfigCache_`.
* Lines 3212-3228: `getDashboardConfigCacheKey_`.
* Lines 3229-3240: `getFormatDashboardSectionNames_`.
* Lines 3241-3254: `getRequiredFrameworkSheetTypes_`.
* Lines 3255-3319: `getDefaultGlobalSettingsRows_`.
* Lines 3320-3328: `getDefaultTitleRowRows_`.
* Lines 3329-3341: `getDefaultSheetDefinitionRows_`.
* Lines 3342-3356: `getDefaultSheetDefinitionRowsWithColumnCounts_`.
* Lines 3357-3369: `getDefaultBehaviorRows_`.
* Lines 3370-3379: `getDefaultSystemSurfaceRows_`.
* Lines 3380-3394: `getDefaultSheetHeaderRows_`.
* Lines 3395-3731: `getDefaultHeaderSets_`.
* Lines 3732-3771: `createOrRefreshAllReportTemplates`.
* Lines 3772-3810: `ensureGoldenMasterTemplate_`.
* Lines 3811-3821: `summarizeTemplateRefreshModes_`.
* Lines 3822-3828: `hideReportTemplates`.
* Lines 3829-3835: `showReportTemplates`.
* Lines 3836-3868: `setReportTemplateVisibility_`.
* Lines 3869-3876: `validateReportTemplates`.
* Lines 3877-3886: `validateReportTemplatesCore_`.
* Lines 3887-3931: `loadDashboardConfig_`.
* Lines 3932-3953: `buildDashboardSectionIndex_`.
* Lines 3954-3998: `loadGlobalSettings_`.
* Lines 3999-4033: `loadTitleRows_`.
* Lines 4034-4059: `parseTitleRowConfigRow_`.
* Lines 4060-4065: `normalizeTitleTargetCell_`.
* Lines 4066-4073: `getTitleRowConfigForSheet_`.
* Lines 4074-4081: `getThemeFillForTitleRow_`.
* Lines 4082-4088: `toWrapStrategy_`.
* Lines 4089-4116: `loadSheetDefinitions_`.
* Lines 4117-4150: `loadSheetHeaders_`.
* Lines 4151-4177: `loadColumnDefinitions_`.
* Lines 4178-4201: `loadSheetBehaviors_`.
* Lines 4202-4209: `normalizeDashboardSectionTitle_`.
* Lines 4210-4254: `readDashboardSectionRows_`.
* Lines 4255-4260: `getBehaviorForSheetType_`.
* Lines 4261-4332: `createOrRefreshTemplateFromDashboard_`.
* Lines 4333-4339: `shouldUseStagedTemplateBuild_`.
* Lines 4340-4350: `shouldRefreshTemplateMetadataOnly_`.
* Lines 4351-4368: `buildTemplateRefreshDecisionMessage_`.
* Lines 4369-4381: `refreshTemplateMetadataOnly_`.
* Lines 4382-4410: `buildTemplateFromDashboardSafely_`.
* Lines 4411-4414: `getTemplateBuildSheetName_`.
* Lines 4415-4426: `promoteStagedTemplateBuild_`.
* Lines 4427-4444: `validateBuiltTemplateMinimumStructure_`.
* Lines 4445-4494: `buildTemplateFromDashboard_`.
* Lines 4495-4499: `shouldSkipTemplateResize_`.
* Lines 4500-4508: `ensureSheetMinimumColumns_`.
* Lines 4509-4533: `clearTemplateForFullBuild_`.
* Lines 4534-4539: `applyTemplateRowHeights_`.
* Lines 4540-4543: `applyFinalRowHeightLockForSheetType_`.
* Lines 4544-4571: `lockFinalOutputRowHeights_`.
* Lines 4572-4582: `applyGlobalDefaultRowHeightsToSheet_`.
* Lines 4583-4618: `safeSetRowHeights_`.
* Lines 4619-4625: `applyRowHeightRuns_`.
* Lines 4626-4640: `hideTemplateIfNeeded_`.
* Lines 4641-4664: `resolveTemplateRowCount_`.
* Lines 4665-4713: `applyTemplateBaseFormatting_`.
* Lines 4714-4726: `ensureTitleRowConfig_`.
* Lines 4727-4779: `applyTitleRows_`.
* Lines 4780-4790: `rowColToA1_`.
* Lines 4791-4831: `applyHeaderRow_`.
* Lines 4832-4842: `applyColumnWidths_`.
* Lines 4843-4878: `applyColumnWidthsInRuns_`.
* Lines 4879-4882: `applyDateAndNumberFormats_`.
* Lines 4883-4887: `enforceTemplateDateAndNumberFormats_`.
* Lines 4888-4944: `enforceDateAndNumberFormatsForHeaders_`.
* Lines 4945-4951: `getExpectedNumberFormat_`.
* Lines 4952-4970: `getGoogleSheetsNumberFormat_`.
* Lines 4971-4975: `isDateFormatText_`.
* Lines 4976-4985: `applyHiddenColumnSettings_`.
* Lines 4986-5021: `applyHiddenColumnSettingsInRuns_`.
* Lines 5022-5047: `applyDataRows_`.
* Lines 5048-5074: `applyAlternatingColorRules_`.
* Lines 5075-5104: `applyMonthlyChangeSpacerRow3Format_`.
* Lines 5105-5150: `formatMonthlyChangeSubsectionBlock_`.
* Lines 5151-5168: `writeTemplateMetadata_`.
* Lines 5169-5201: `buildTemplateFormatSignature_`.
* Lines 5202-5215: `compactTemplateFormatSignature_`.
* Lines 5216-5224: `normalizeTemplateFormatSignature_`.
* Lines 5225-5230: `getTemplateFormatSignatureKey_`.
* Lines 5231-5239: `getStoredTemplateFormatSignature_`.
* Lines 5240-5259: `getStoredTemplateFormatSignatureFromSheet_`.
* Lines 5260-5267: `storeTemplateFormatSignature_`.
* Lines 5268-5316: `ensureTemplateFilter_`.
* Lines 5317-5354: `applyTemplateFreezeAndTabColor_`.
* Lines 5355-5379: `resizeSheet_`.
* Lines 5380-5412: `resizeSheetGrid_`.
* Lines 5413-5417: `resizeSheetRows_`.
* Lines 5418-5421: `resizeSheetColumns_`.
* Lines 5422-5429: `getHeadersForSheetType_`.
* Lines 5430-5439: `getDefaultBehavior_`.
* Lines 5440-5451: `showSheetIfNeeded_`.
* Lines 5452-5465: `hideSheetIfNeeded_`.
* Lines 5466-5504: `formatMonthlySheets`.
* Lines 5505-5513: `buildPromptedMonthContext_`.
* Lines 5514-5535: `formatMonthlyBannerSheet_`.
* Lines 5536-5569: `formatMonthlyDashboardSheetFromSource_`.
* Lines 5570-5597: `formatMonthlyRawDataSheetFromSource_`.
* Lines 5598-5665: `formatBannerReport`.
* Lines 5666-5687: `validateActiveBannerFormatterOutput`.
* Lines 5688-5705: `archiveActiveRawDataSheet`.
* Lines 5706-5738: `parseReportMonthInput_`.
* Lines 5739-5782: `promptForLockedYearReportMonth_`.
* Lines 5783-5786: `boolText_`.
* Lines 5787-5791: `isPrimaryPMRRowValue_`.
* Lines 5792-5819: `assignPrimaryPMRRows_`.
* Lines 5820-5831: `getCurrentBannersSheet_`.
* Lines 5832-5840: `getCurrentUnlockedCarePlanSheet_`.
* Lines 5841-5852: `getCurrentCarePlanDueSheet_`.
* Lines 5853-5858: `getPreviousMasterListSheet_`.
* Lines 5859-5864: `getCurrentMasterListSheet_`.
* Lines 5865-5907: `applyStandardFormatting_`.
* Lines 5908-5917: `applyStandardFormattingAfterHeadersAndData_`.
* Lines 5918-5926: `forceStandardTitleCellAlignment_`.
* Lines 5927-5935: `captureHiddenSheetNames_`.
* Lines 5936-5952: `restorePreviouslyHiddenSheets_`.
* Lines 5953-5960: `finalizeWorkflowAfterCreateOrUpdate_`.
* Lines 5961-5964: `hidePreviousMonthSheets_`.
* Lines 5965-5979: `autoHidePreviousMonthSheetsAfterWorkflow_`.
* Lines 5980-6000: `applyIndexSheetRowFills_`.
* Lines 6001-6023: `applyCurrentVsOlderTabColors_`.
* Lines 6024-6027: `organizeSheetTabs_`.
* Lines 6028-6046: `formatDateColumnsByHeader_`.
* Lines 6047-6056: `rowObjectFromHeaders_`.
* Lines 6057-6060: `getLiveDashboardAuditStatus_`.
* Lines 6061-6064: `getLiveTemplateValidationStatus_`.
* Lines 6065-6068: `getLiveFrameworkHealthStatus_`.
* Lines 6069-6074: `getLiveSheetStatus_`.
* Lines 6075-6080: `setMonthlySheetNameFast_`.
* Lines 6081-6236: `writePMRContactsToParticipantRows_`.
* Lines 6237-6245: `buildParticipantContactKey_`.
* Lines 6246-6252: `isExpiredContactPhoneDate_`.
* Lines 6253-6259: `capitalizeContactPart_`.
* Lines 6260-6275: `formatRankedContact_`.
* Lines 6276-6287: `getMostRecentDateFromRowsByHeader_`.
* Lines 6288-6298: `isDateInStrictLocalRangeInclusive_`.
* Lines 6299-6302: `isDateDisplayInReportWindow_`.
* Lines 6303-6312: `isParticipantEnrollmentStatusDisenrolled_`.
* Lines 6313-6326: `getSheetTypeForOrganization_`.
* Lines 6327-6338: `collectFrameworkHealthCheckRows_`.
* Lines 6339-6346: `collectWorkflowSyncVerificationRows_`.
* Lines 6347-6362: `runFrameworkSmokeValidation`.
* Lines 6363-6405: `collectFrameworkSmokeValidationRows_`.
* Lines 6406-6409: `appendFrameworkSmokeValidationRow_`.
* Lines 6410-6416: `functionSourceContainsAll_`.
* Lines 6417-6425: `runDashboardQualityMasterListHealthCheck_`.
* Lines 6426-6436: `buildCombinedFrameworkTestDashboardRows_`.
* Lines 6437-6447: `applyDashboardTemplateFormattingToActiveReportSheet_`.
* Lines 6448-6489: `applyDashboardSortOrderAlternatingColors_`.
* Lines 6490-6507: `ensureStandardTitleRows_`.
* Lines 6508-6516: `isDateLikeHeader_`.
* Lines 6517-6520: `buildMonthlySheetNameNoDashAfterPrefix_`.
* Lines 6521-6527: `formatReportDateLabel_`.
* Lines 6528-6532: `buildBannerReportOutputName_`.
* Lines 6533-6546: `renameSheetSafely_`.
* Lines 6547-6570: `deleteSheetIfExists_`.
* Lines 6571-6579: `writeBannerReportDates_`.
* Lines 6580-6630: `copyRawBannerDataToOutput_`.
* Lines 6631-6637: `ensureSheetHasAtLeastRows_`.
* Lines 6638-6665: `validateBannerFormatterOutput_`.
* Lines 6666-6689: `archiveRawSourceAndDeleteLocal_`.
* Lines 6690-6712: `archiveRawDataSheet_`.
* Lines 6713-6724: `hideMonthlyImportSheets`.
* Lines 6725-6735: `hideMonthlyActiveSheets`.
* Lines 6736-6760: `hideMonthlySheetsBySpecs_`.
* Lines 6761-6777: `archiveMonthlyImportSheets`.
* Lines 6778-6794: `archiveMonthlyActiveSheets`.
* Lines 6795-6833: `archiveMonthlySheetsBySpecs_`.
* Lines 6834-6857: `findArchiveMonthlyCandidateSheets_`.
* Lines 6858-6882: `copySheetToArchiveAndDeleteLocal_`.
* Lines 6883-6891: `notifyArchiveMonthlySheetsResult_`.
* Lines 6892-6908: `deleteArchiveSheetIfExists_`.
* Lines 6909-6912: `formatMonthlyChangeSubheaderRow`.
* Lines 6913-6924: `formatMonthlyChangeSubsectionBlock`.
* Lines 6925-6929: `getMonthlyChangeSubsectionLabels`.
* Lines 6930-6949: `normalizeNumberFormatForCompare_`.
* Lines 6950-6955: `numberFormatsMatch_`.
* Lines 6956-7101: `validateTemplateFromDashboard_`.
* Lines 7102-7107: `writeTemplateValidationReport_`.
* Lines 7108-7194: `formatRawData`.
* Lines 7195-7212: `ensureRawDataHeaderRows_`.
* Lines 7213-7222: `rowLooksLikeParticipantHeader_`.
* Lines 7223-7229: `getRawDataCurrentHeadersOrDefaults_`.
* Lines 7230-7273: `enforceDemoPStrictDashboardSchema_`.
* Lines 7274-7285: `buildRawDataSourceArchiveName_`.
* Lines 7286-7297: `mapRowsToHeaders_`.
* Lines 7298-7315: `applyUniversalFastCanvasFormatting_`.
* Lines 7316-7347: `applyGovernedTextAndNumberFormats_`.
* Lines 7348-7359: `applyOutputVisibilityPolicy_`.
* Lines 7360-7433: `createOutputSheetFromDashboardTemplate_`.
* Lines 7434-7511: `createRawDataOutputSheetFromTemplateFast_`.
* Lines 7512-7544: `ensureOutputSheetHasFormattedRows_`.
* Lines 7545-7626: `syncRawDataBannerColumns_`.
* Lines 7627-7668: `buildSourceMapByCompositeKeyForDemoPBanner_`.
* Lines 7669-7677: `formatCarePlanDueReport`.
* Lines 7678-7686: `formatUnlockedCarePlanReport`.
* Lines 7687-7781: `formatCarePlanDueOrUnlockedFromDashboard_`.
* Lines 7782-7808: `buildRawArchiveNameForSheetType_`.
* Lines 7809-7835: `collectAndClearMovedTitleInfoCells_`.
* Lines 7836-7842: `prepareCarePlanSourceSheetForDashboardFormat_`.
* Lines 7843-7856: `prepareRawDataSourceSheetForDashboardFormat_`.
* Lines 7857-7867: `buildRawDataHeadersForFormatting_`.
* Lines 7868-7873: `getRawDataApprovedAddedColumns_`.
* Lines 7874-7897: `processRawDataApprovedSyncColumns_`.
* Lines 7898-7939: `writeChangedColumnsOnly_`.
* Lines 7940-7998: `getRawDataDemoPSourceHeaders_`.
* Lines 7999-8049: `getRawDataDisallowedWorkingColumns_`.
* Lines 8050-8057: `isOngoingOutputSheetType_`.
* Lines 8058-8092: `buildDashboardOutputSheetName_`.
* Lines 8093-8098: `syncMasterListMonthlySourcesIntoData_`.
* Lines 8099-8127: `syncBannerSourceIntoData_`.
* Lines 8128-8162: `syncUnlockedCarePlanSourceIntoData_`.
* Lines 8163-8196: `syncCarePlanDueSourceIntoData_`.
* Lines 8197-8236: `syncRowsFromSourceMapData_`.
* Lines 8237-8274: `buildSourceMapBySingleKeyForPart5_`.
* Lines 8275-8316: `buildSourceMapByCompositeKeyForPart5_`.
* Lines 8317-8341: `shouldProcessRowByPMR_`.
* Lines 8342-8349: `normalizeSyncFieldPairs_`.
* Lines 8350-8379: `syncMasterListFromBanners_`.
* Lines 8380-8415: `syncMasterListFromUnlockedCarePlan_`.
* Lines 8416-8449: `syncMasterListFromCarePlanDue_`.
* Lines 8450-8612: `syncRowsFromSourceMap_`.
* Lines 8613-8630: `getDefaultDemoPMetadataHeaderRows_v155_`.
* Lines 8631-8655: `buildDemoPFromScratch`.
* Lines 8656-8695: `updateDemoPMonthlySync`.
* Lines 8696-8714: `enforceDemoPPostFlattenFormatting_`.
* Lines 8715-8736: `sortSheetAlphabeticallyByParticipantName_`.
* Lines 8737-8792: `getDemoPMonthlySyncChangedPMRs_`.
* Lines 8793-8828: `processDemoPDataWithFillBlankMask_`.
* Lines 8829-8850: `buildDemoPFreshRowsForPMRs_`.
* Lines 8851-8861: `processDemoPFreshRowsInMemory_`.
* Lines 8862-8922: `flattenDemoPContactsToPrimaryRows_`.
* Lines 8923-8941: `buildDemoPContactSummaryForFlatRecord_`.
* Lines 8942-8955: `sortDemoPFlatRows_`.
* Lines 8956-9035: `processDemoP`.
* Lines 9036-9083: `processDemoPAsWorkingSource_`.
* Lines 9084-9113: `markPrimaryPMRRowsForSequentialData_`.
* Lines 9114-9134: `assignPrimaryPMRRowsInData_`.
* Lines 9135-9138: `formatDemoPStructure`.
* Lines 9139-9142: `buildRawDataSheetName_`.
* Lines 9143-9217: `getOrCreateDemoPProcessingSheet_`.
* Lines 9218-9231: `deleteSheetIfExistsForDemoPProcess_`.
* Lines 9232-9239: `getLastRawDataDisenrolledBuildResult_`.
* Lines 9240-9246: `setLastRawDataDisenrolledBuildResult_`.
* Lines 9247-9306: `updateExistingDemoPFromRawData_`.
* Lines 9307-9414: `createActiveDemoPFromRawData_`.
* Lines 9415-9432: `populateDemoPUpdateColumns_`.
* Lines 9433-9475: `populateUniversalMetadataColumns_`.
* Lines 9476-9493: `buildSourceHashByPMR_`.
* Lines 9494-9516: `buildSourceHashForRows_`.
* Lines 9517-9520: `buildSourceHashForRow_`.
* Lines 9521-9536: `buildColumnsUpdatedText_`.
* Lines 9537-9544: `normalizeHashValue_`.
* Lines 9545-9552: `computeStableHash_`.
* Lines 9553-9561: `verifyPrimaryPMRColumnFromRawData_`.
* Lines 9562-9569: `createOrRefreshDemoPTemplate_`.
* Lines 9570-9576: `getOrCreateDemoPTemplate_`.
* Lines 9577-9592: `initializeDemoPTemplateTitleRows_`.
* Lines 9593-9614: `applyDemoPTemplateFormatting_`.
* Lines 9615-9650: `applyDemoPTemplateToSheet_`.
* Lines 9651-9704: `applyDemoPDateFormattingByHeader_`.
* Lines 9705-9722: `buildMonthlyChangeReport`.
* Lines 9723-9832: `buildMonthlyChangeReportForMonth_`.
* Lines 9833-9889: `getOrBuildMonthlyChangeReport_`.
* Lines 9890-10082: `compareRawDemoPForSectionReport_`.
* Lines 10083-10088: `rowsWithDOBOnlyForSection_`.
* Lines 10089-10104: `getChangedColumnsForSectionRows_`.
* Lines 10105-10117: `buildColumnSignaturesForSection_`.
* Lines 10118-10280: `compareRawDemoPForChanges_`.
* Lines 10281-10348: `getRawDemoPDataForCompare_`.
* Lines 10349-10397: `compareSingleFieldAndAdd_`.
* Lines 10398-10440: `addMCRRow_`.
* Lines 10441-10459: `buildContactCompareMap_`.
* Lines 10460-10465: `getFieldValueFromRow_`.
* Lines 10466-10482: `buildParticipantName_`.
* Lines 10483-10490: `displayValueForReport_`.
* Lines 10491-10514: `buildMonthlyChangeReportSectionLayout_`.
* Lines 10515-10520: `padRowToWidth_`.
* Lines 10521-10530: `stripMonthlyChangeNativeBandings_`.
* Lines 10531-10577: `getMonthlyChangeSectionSpecs_`.
* Lines 10578-10624: `buildMonthlyChangeSectionRows_`.
* Lines 10625-10632: `appendMonthlyChangeCompiledRow_`.
* Lines 10633-10662: `appendMonthlyChangeSectionBlock_`.
* Lines 10663-10715: `populateMonthlyChangeReportSections_`.
* Lines 10716-10731: `findMonthlyChangeSectionTitleRow_`.
* Lines 10732-10752: `findNextMonthlyChangeSectionTitleRow_`.
* Lines 10753-10846: `getChangedPMRsFromMonthlyChangeReport_`.
* Lines 10847-10886: `writeDiagnosticReport_`.
* Lines 10887-10913: `runMonthlyUpdate`.
* Lines 10914-10919: `updateMasterList`.
* Lines 10920-11013: `updateMasterListForMonth_`.
* Lines 11014-11086: `createMasterList`.
* Lines 11087-11153: `copyPrimaryDemoPRowsToMasterListByHeader_`.
* Lines 11154-11160: `getMasterListTemplateHeaders_`.
* Lines 11161-11168: `createOrRefreshMasterListTemplate_`.
* Lines 11169-11175: `getOrCreateMasterListTemplate_`.
* Lines 11176-11232: `createMasterListSheetFromTemplate_`.
* Lines 11233-11239: `writeMasterListTitleDateBlock_`.
* Lines 11240-11248: `initializeMasterListTitleRows_`.
* Lines 11249-11266: `copyDemoPHeaderRowsToMasterList_`.
* Lines 11267-11292: `copyQualifyingDemoPRowsToMasterList_`.
* Lines 11293-11300: `formatMasterListSheet_`.
* Lines 11301-11312: `getMonthPartsFromTitleRows_`.
* Lines 11313-11320: `updateCopiedMasterListHeader_`.
* Lines 11321-11475: `createIndexSheet`.
* Lines 11476-11479: `generateArchiveFileIndex_`.
* Lines 11480-11496: `setupIndexRefreshOnSheetAddedTrigger_`.
* Lines 11497-11510: `handleSpreadsheetChangeForIndex`.
* Lines 11511-11593: `enforceGlobalSheetSortOrder_`.
* Lines 11594-11612: `extractFirstDateFromSheetName_`.
* Lines 11613-11636: `parseIndexMonthDate_`.
* Lines 11637-11683: `organizeWorkbookTabs_`.
* Lines 11684-11701: `hideSystemAndTestingSheets_`.
* Lines 11702-11717: `getSystemAndTestingSheetNames_`.
* Lines 11718-11736: `isSystemOrTestingSheet_`.
* Lines 11737-11743: `assignSortOrderAndHideExtraRows`.
* Lines 11744-11749: `applySortOrderDisplayForMasterList_`.
* Lines 11750-11776: `buildParticipantBlocksForSortOrder_`.
* Lines 11777-11784: `showAllMasterListRows`.
* Lines 11785-11789: `groupMasterListRowsByPMR_`.
* Lines 11790-11793: `hideRowsWithBlankDOB_`.
* Lines 11794-11853: `sortMasterListByParticipantNameAndPMR_`.
* Lines 11854-11872: `getPrimaryRowScore_`.
* Lines 11873-11897: `hideNonPrimaryPMRRows_`.
* Lines 11898-11915: `hideRowNumberBatches_`.
* Lines 11916-11927: `clearAllRowGroupsIfPossible_`.
* Lines 11928-11934: `prepareMasterListSortOrderBeforeFormatting_`.
* Lines 11935-11940: `applyFinalMasterListColorAndDisplay_`.
* Lines 11941-11944: `applyMasterListDisplaySettings_`.
* Lines 11945-11952: `processMasterListFull_`.
* Lines 11953-11956: `processMasterListDataOnly_`.
* Lines 11957-11991: `processMasterListSingleDataPass_`.
* Lines 11992-12010: `populateParticipantNameData_`.
* Lines 12011-12027: `populateDemoPNameData_`.
* Lines 12028-12052: `updateBannerColumnData_`.
* Lines 12053-12066: `combineAddressesData_`.
* Lines 12067-12088: `handleLanguageData_`.
* Lines 12089-12115: `splitPhoneNumbersData_`.
* Lines 12116-12120: `runMasterContactProcessData_`.
* Lines 12121-12147: `combineNotesSummaryData_`.
* Lines 12148-12157: `rebuildChangedPMRsFromDemoP_`.
* Lines 12158-12183: `copyPreviousMasterListToCurrentMonth_`.
* Lines 12184-12210: `rebuildChangedPMRsOnExistingMaster_`.
* Lines 12211-12240: `updateMasterListFromMonthlyChangeActions_`.
* Lines 12241-12251: `getPMRsForMonthlyChangeSections_`.
* Lines 12252-12266: `deletePMRBlocksFromMasterListBySet_`.
* Lines 12267-12314: `updatePrimaryRowsFromDemoPForPMRs_`.
* Lines 12315-12386: `mergeSecondaryRowsFromDemoPForPMRs_`.
* Lines 12387-12396: `buildMappedMasterRowFromDemoRow_`.
* Lines 12397-12406: `mutateMasterRowColumnsFromDemoRow_`.
* Lines 12407-12414: `hideSystemSheetsNow`.
* Lines 12415-12447: `showSystemSheetsNow`.
* Lines 12448-12466: `getPrimaryMergeRowItem_`.
* Lines 12467-12536: `getPrimaryRowChangedColumnDetails_`.
* Lines 12537-12546: `formatMergeAuditValueForDisplay_`.
* Lines 12547-12552: `getMergeAuditParticipantName_`.
* Lines 12553-12573: `getMergeAuditParticipantNameFromRows_`.
* Lines 12574-12597: `buildMergeAuditContactSummary_`.
* Lines 12598-12630: `getMergeAuditChangedFields_`.
* Lines 12631-12654: `buildMergeRowsByPMRFromData_`.
* Lines 12655-12684: `buildSecondaryMergeKeyMapForRows_`.
* Lines 12685-12714: `buildMergeKeyMapForRows_`.
* Lines 12715-12738: `buildContactMergeRowKey_`.
* Lines 12739-12753: `getMergeRowValue_`.
* Lines 12754-12784: `createDisenrolledList`.
* Lines 12785-12805: `processBlankContactSummariesOnDemoP_`.
* Lines 12806-12857: `splitRawDataRowsIntoActiveAndDisenrolled_`.
* Lines 12858-12875: `buildDisenrolledPMRSetFromDemoPValues_`.
* Lines 12876-12893: `loadDisenrolledPMRSetForMonth_`.
* Lines 12894-12898: `appendDisenrolledRowsFromRawDataToExclusion_`.
* Lines 12899-12987: `moveDisenrolledPMRsFromDemoPToExclusion_`.
* Lines 12988-13055: `appendDisenrolledDeltasToExclusionSheet_`.
* Lines 13056-13067: `appendDisenrolledPMRBlocksToExclusion_`.
* Lines 13068-13109: `createDisenrolledExclusionSheetFromDashboardTemplate_`.
* Lines 13110-13129: `loadDisenrolledExclusionPMRsForPart3_`.
* Lines 13130-13169: `removeDisenrolledPMRBlocksFromMasterUsingDemoP_`.
* Lines 13170-13282: `applyDisenrolledExclusionCreateFormattingOnly_`.
* Lines 13283-13287: `getCurrentRawDataSheet_`.
* Lines 13288-13292: `getPreviousRawDataSheet_`.
* Lines 13293-13300: `getCurrentDemoPSheet_`.
* Lines 13301-13306: `getPreviousDemoPSheet_`.
* Lines 13307-13318: `getMonthlyChangeReportHeaders_`.
* Lines 13319-13324: `getMonthlyChangeReportDateIndexes_`.
* Lines 13325-13354: `convertMonthlyChangeReportDateValues_`.
* Lines 13355-13375: `buildMonthlyChangeReportRow_`.
* Lines 13376-13395: `formatMonthlyChangeReportSectionSheet_`.
* Lines 13396-13402: `runDashboardQualityStartUp`.
* Lines 13403-13456: `runDashboardQualityDashboardVerificationSections_`.
* Lines 13457-13466: `getDashboardVerificationPassRow_`.
* Lines 13467-13471: `appendDashboardVerificationPassIfNoIssues_`.
* Lines 13472-13477: `getDashboardSectionHeaderWidth_`.
* Lines 13478-13487: `collectBlankDashboardCells_`.
* Lines 13488-13519: `collectFormatDashboardGlobalInputVerificationRows_`.
* Lines 13520-13556: `collectFormatDashboardTitleRowsVerificationRows_`.
* Lines 13557-13585: `collectFormatDashboardSheetDefinitionVerificationRows_`.
* Lines 13586-13622: `collectFormatDashboardSheetHeaderVerificationRows_`.
* Lines 13623-13652: `collectFormatDashboardColumnDefinitionVerificationRows_`.
* Lines 13653-13681: `collectFormatDashboardSheetBehaviorVerificationRows_`.
* Lines 13682-13691: `getDashboardQualitySectionLastRunMillis_`.
* Lines 13692-13696: `dashboardQualitySectionRanWithinLastHour_`.
* Lines 13697-13704: `runDashboardQualitySectionIfDue_`.
* Lines 13705-13708: `runDashboardQualityQuick`.
* Lines 13709-13716: `runDashboardQualityValidateTemplates`.
* Lines 13717-13748: `runDashboardQualityTemplateAndFormatSections_`.
* Lines 13749-13760: `getDashboardQualitySectionRegistry_`.
* Lines 13761-13810: `collectDashboardQualityPerformanceSummaryRows_`.
* Lines 13811-13817: `runDashboardQualityPerformanceSummary_`.
* Lines 13818-13838: `runDashboardQualityCarePlanSyncDiagnostics_`.
* Lines 13839-13891: `runDashboardQualityFull`.
* Lines 13892-13900: `runAllFrameworkTestsAndBuildDashboard`.
* Lines 13901-13973: `repairAllTemplateDateFormats`.
* Lines 13974-13979: `normalizeSectionRowForWidth_`.
* Lines 13980-13985: `rowHasAnyValue_`.
* Lines 13986-13991: `trimTrailingBlankRows_`.
* Lines 13992-14013: `getDefaultDashboardQualityDetailHeader_`.
* Lines 14014-14031: `collectExistingDashboardQualitySectionBlocks_`.
* Lines 14032-14039: `getDashboardQualityNotRunMessage_`.
* Lines 14040-14055: `buildDefaultDashboardQualitySectionBlock_`.
* Lines 14056-14095: `normalizeDashboardQualitySectionBlock_`.
* Lines 14096-14138: `rebuildDashboardQualityReportShellCompact_`.
* Lines 14139-14146: `getDashboardQualitySectionTitleForKey_`.
* Lines 14147-14154: `getDashboardQualitySectionKeyForTitle_`.
* Lines 14155-14171: `hasDashboardQualityTemplateShell_`.
* Lines 14172-14190: `initializeDashboardQualitySheet_`.
* Lines 14191-14208: `initializeSystemSheets_`.
* Lines 14209-14212: `deleteLegacyOperationalAndDiagnosticSheets_`.
* Lines 14213-14216: `ensureDashboardQualityReportSheet_`.
* Lines 14217-14225: `ensureDashboardQualityTemplateShell_`.
* Lines 14226-14230: `ensureDashboardQualitySectionShells_`.
* Lines 14231-14236: `getDashboardQualityFixedSectionStartRow_`.
* Lines 14237-14284: `applyDashboardQualityReportColumnSettings_`.
* Lines 14285-14295: `styleDashboardQualityReport_`.
* Lines 14296-14299: `normalizeDashboardQualityHeaderLabels_`.
* Lines 14300-14304: `isDashboardQualityNotesLabel_`.
* Lines 14305-14335: `normalizeDashboardQualityOutputRow_`.
* Lines 14336-14340: `getDashboardQualitySectionLetter_`.
* Lines 14341-14346: `normalizeDashboardQualityIssueValue_`.
* Lines 14347-14379: `normalizeDashboardQualityRowsForSection_`.
* Lines 14380-14387: `normalizeDashboardQualityDataRows_`.
* Lines 14388-14410: `buildTimestampedDashboardQualitySectionRows_`.
* Lines 14411-14429: `getStatusFromDashboardQualityRows_`.
* Lines 14430-14451: `getMostRecentTimingDurationForSectionKey_`.
* Lines 14452-14471: `getTimingProcessNameForDashboardQualitySection_`.
* Lines 14472-14479: `dashboardQualityRowsEqualValues_`.
* Lines 14480-14509: `saveDashboardQualitySectionRows_`.
* Lines 14510-14521: `getDashboardQualitySectionRows_`.
* Lines 14522-14532: `deleteLegacyQualityReportSheet_`.
* Lines 14533-14539: `deleteLegacyStandaloneQualityReports_`.
* Lines 14540-14547: `saveDashboardQualityRowsForTemplateValidation_`.
* Lines 14548-14560: `saveDashboardQualityRowsForHealthCheck_`.
* Lines 14561-14569: `getStoredDashboardQualityOverallStatus_`.
* Lines 14570-14581: `getStoredDashboardQualityFailureNotes_`.
* Lines 14582-14587: `buildDatedDisenrolledOutputName_`.
* Lines 14588-14598: `forceSheetRowCount_`.
* Lines 14599-14632: `buildCombinedFrameworkTestDashboard`.
* Lines 14633-14638: `updateDashboardQualitySummaryTimingAndSignoffSections_`.
* Lines 14639-14650: `updateDashboardQualitySignoffSection_`.
* Lines 14651-14661: `updateDashboardQualitySummarySection_`.
* Lines 14662-14665: `updateDashboardQualityTimingSummarySection_`.
* Lines 14666-14694: `getDashboardQualitySectionBoundsMap_`.
* Lines 14695-14755: `replaceDashboardQualitySectionsRows_`.
* Lines 14756-14772: `tryDashboardQualityAnchoredColumnWrite_`.
* Lines 14773-14846: `replaceDashboardQualitySectionRows_`.
* Lines 14847-14861: `findDashboardQualitySectionRow_`.
* Lines 14862-14872: `findNextDashboardQualitySectionRow_`.
* Lines 14873-14892: `dashboardQualitySectionContentMatches_`.
* Lines 14893-14910: `mergeDashboardQualityStyleRanges_`.
* Lines 14911-15000: `styleDashboardQualityUpdatedSections_`.
* Lines 15001-15020: `appendCombinedDashboardSignOffRows_`.
* Lines 15021-15051: `buildFrameworkSummaryRows_`.
* Lines 15052-15071: `getStoredSectionStatusAndNotes_`.
* Lines 15072-15087: `getReportOverallStatus_`.
* Lines 15088-15107: `getReportFailureNotes_`.
* Lines 15108-15134: `runFrameworkHealthCheck`.
* Lines 15135-15140: `getFrameworkHealthCheckIssueRows_`.
* Lines 15141-15152: `formatFrameworkHealthCheckIssuesForTiming_`.
* Lines 15153-15159: `appendRequiredFunctionChecks_`.
* Lines 15160-15167: `existsFunctionByName_`.
* Lines 15168-15172: `writeFrameworkHealthCheckReport_`.
* Lines 15173-15184: `normalizeFrameworkHealthCheckRows_`.
* Lines 15185-15200: `getRequiredHelperFunctionNames_`.
* Lines 15201-15242: `getRequiredMenuFunctionNames_`.
* Lines 15243-15252: `getRequiredDashboardFunctionNames_`.
* Lines 15253-15261: `getRequiredTemplateFunctionNames_`.
* Lines 15262-15269: `getRequiredValidationFunctionNames_`.
* Lines 15270-15278: `getRequiredTimingFunctionNames_`.
* Lines 15279-15291: `getRequiredFrameworkDashboardFunctionNames_`.
* Lines 15292-15295: `runWorkflowSyncVerification`.
* Lines 15296-15303: `runDashboardQualityWorkflowSyncVerification_`.
* Lines 15304-15310: `setupSystemSheets`.
* Lines 15311-15366: `verifyFrameworkConfiguration`.
* Lines 15367-15386: `runFrameworkTimed_`.
* Lines 15387-15397: `startFrameworkTiming_`.
* Lines 15398-15422: `markFrameworkStep_`.
* Lines 15423-15428: `writeFrameworkTimingReport_`.
* Lines 15429-15432: `writeTimingReport_`.
* Lines 15433-15449: `trimTimingReportRows_`.
* Lines 15450-15529: `rebuildProductionMonthlyChangeTemplate`.
