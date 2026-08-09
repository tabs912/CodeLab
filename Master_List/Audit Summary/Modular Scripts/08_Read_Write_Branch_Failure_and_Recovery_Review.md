# Script 08 — Read, Write, Side-Effect, Branch, Failure, and Recovery Review

**Status:** COMPLETE (static-source audit)
**Governing prompt:** `Master_List/Prompts/Menu_Trigger_and_Function_Execution_Trace_Review_Prompt (1).docx.md`, Sections 1–12 and modular protocol
**Production source:** the ten `.gs` files in `Master_List/Current Production Script/Modules`
**Declared source version:** `1.8.9.8.4.0` (`MASTER_LIST_MERGE_ML_VERSION`)
**Source fingerprint (SHA-256, filename-sorted concatenation):** `5ee0461c0e722ac55304df8187ff10998b109eda2167306f63cdd4f54af559ab`
**Method:** exhaustive static parsing of named declarations, menu callback strings, and named call occurrences. Google service dispatch, deployed trigger state, workbook contents, permissions, quotas, and runtime-selected data paths are **NOT VERIFIED** without the live Apps Script container.

## Consolidated Read/Write and Side-Effect Matrix

| Effect ID | Function | Category | Evidence | Source expression |
|---|---|---|---|---|
| EFFECT-0001 | `onOpen` | Archival/external workbook | `1_Config.gs:18` | `.addItem("🗃️ Archive Monthly Sub-Reports", "archiveMonthlyImportSheets"))` |
| EFFECT-0002 | `onOpen` | Archival/external workbook | `1_Config.gs:21` | `.addItem("🗃️ Archive Monthly Active Sheets", "archiveMonthlyActiveSheets"))` |
| EFFECT-0003 | `onOpen` | Timing/logging | `1_Config.gs:55` | `.addItem("⏱️ Framework Timing on/off", "toggleFrameworkTiming")` |
| EFFECT-0004 | `onOpen` | Archival/external workbook | `1_Config.gs:65` | `.addItem("↩️ Restore Selected Archive Row", "restoreSheetFromActiveIndexRow")` |
| EFFECT-0005 | `onOpen` | Archival/external workbook | `1_Config.gs:67` | `.addItem("🔗 Configure Archive Spreadsheet ID", "configureArchiveSpreadsheetId"))` |
| EFFECT-0006 | `getRuntimeCache_` | Properties/runtime state | `1_Config.gs:156` | `if (!ML_RUNTIME_CACHE_STORE_) {` |
| EFFECT-0007 | `getRuntimeCache_` | Properties/runtime state | `1_Config.gs:157` | `ML_RUNTIME_CACHE_STORE_ = {` |
| EFFECT-0008 | `getRuntimeCache_` | Properties/runtime state | `1_Config.gs:163` | `return ML_RUNTIME_CACHE_STORE_;` |
| EFFECT-0009 | `getDocumentPropertiesCached_` | Properties/runtime state | `1_Config.gs:172` | `if (!cache.docProps) cache.docProps = PropertiesService.getDocumentProperties();` |
| EFFECT-0010 | `getArchiveSpreadsheetId_` | Archival/external workbook | `1_Config.gs:176` | `function getArchiveSpreadsheetId_() {` |
| EFFECT-0011 | `getArchiveSpreadsheetId_` | Archival/external workbook | `1_Config.gs:177` | `return getDocumentPropertiesCached_().getProperty("RFF_ARCHIVE_SPREADSHEET_ID") \|\| RFF_ARCHIVE_SPREADSHEET_ID;` |
| EFFECT-0012 | `loadDashboardConfig_` | Worksheet read | `2_Dashboard_Loaders.gs:27` | `const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);` |
| EFFECT-0013 | `readDashboardSectionRows_` | Worksheet read | `2_Dashboard_Loaders.gs:55` | `const data = sheet.getDataRange().getValues();` |
| EFFECT-0014 | `getSectionEThemeForSheet_` | Worksheet read | `2_Dashboard_Loaders.gs:439` | `const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);` |
| EFFECT-0015 | `getSectionEThemeForSheet_` | Worksheet read | `2_Dashboard_Loaders.gs:442` | `const dashMatrix = dashboardSheet.getDataRange().getValues();` |
| EFFECT-0016 | `getHeaders_` | Worksheet read | `3_Core_Helpers.gs:177` | `const lastCol = Math.max(sheet.getLastColumn(), 1);` |
| EFFECT-0017 | `getHeaders_` | Worksheet read | `3_Core_Helpers.gs:178` | `const headers = sheet.getRange(headerRow \|\| 4, 1, 1, lastCol).getValues()[0].map(h => String(h \|\| "").trim());` |
| EFFECT-0018 | `getDataValues_` | Worksheet read | `3_Core_Helpers.gs:229` | `const range = sheet.getRange(dataStartRow, 1, dimensions.lastRow - dataStartRow + 1, headers.length);` |
| EFFECT-0019 | `getDataValues_` | Worksheet read | `3_Core_Helpers.gs:230` | `return { headers, headerMap, values: range.getValues(), range, lastRow: dimensions.lastRow, lastCol: dimensions.lastCol };` |
| EFFECT-0020 | `getSheetDimensions_` | Worksheet read | `3_Core_Helpers.gs:238` | `lastRow: sheet.getLastRow(), lastCol: sheet.getLastColumn(),` |
| EFFECT-0021 | `startFrameworkTiming_` | Timing/logging | `3_Core_Helpers.gs:256` | `function startFrameworkTiming_(processName, monthParts) {` |
| EFFECT-0022 | `markFrameworkStep_` | Timing/logging | `3_Core_Helpers.gs:261` | `function markFrameworkStep_(timing, stepName, details) {` |
| EFFECT-0023 | `markRuntimeStep_` | Timing/logging | `3_Core_Helpers.gs:279` | `function markRuntimeStep_(timing, label, details) {` |
| EFFECT-0024 | `markRuntimeStep_` | Timing/logging | `3_Core_Helpers.gs:280` | `markFrameworkStep_(timing, label, details); // Alias routed to central timing logger` |
| EFFECT-0025 | `writeFrameworkTimingReport_` | Timing/logging | `3_Core_Helpers.gs:283` | `function writeFrameworkTimingReport_(timing) {` |
| EFFECT-0026 | `writeFrameworkTimingReport_` | Worksheet read | `3_Core_Helpers.gs:286` | `const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Framework Timing Report");` |
| EFFECT-0027 | `writeFrameworkTimingReport_` | Worksheet read | `3_Core_Helpers.gs:289` | `const lastRow = Math.max(sheet.getLastRow(), 20);` |
| EFFECT-0028 | `writeFrameworkTimingReport_` | Worksheet read | `3_Core_Helpers.gs:293` | `sheet.getRange(lastRow + 1, 1, logs.length, 8).setValues(logs);` |
| EFFECT-0029 | `writeFrameworkTimingReport_` | Worksheet write | `3_Core_Helpers.gs:293` | `sheet.getRange(lastRow + 1, 1, logs.length, 8).setValues(logs);` |
| EFFECT-0030 | `writeFrameworkTimingReport_` | Timing/logging | `3_Core_Helpers.gs:294` | `refreshFrameworkTimingSummaries_(sheet);` |
| EFFECT-0031 | `writeFrameworkTimingReport_` | Timing/logging | `3_Core_Helpers.gs:296` | `Logger.log("Timing telemetry write skipped: " + err.message);` |
| EFFECT-0032 | `writeRuntimeTimingReport_` | Timing/logging | `3_Core_Helpers.gs:301` | `writeFrameworkTimingReport_(timing);` |
| EFFECT-0033 | `logBestEffortWarning_` | Timing/logging | `3_Core_Helpers.gs:306` | `Logger.log("[SWALLOWED EXCEPTION - BEST EFFORT] " + String(message \|\| "") + suffix);` |
| EFFECT-0034 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:15` | `function configureArchiveSpreadsheetId() {` |
| EFFECT-0035 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:17` | `const currentId = getArchiveSpreadsheetId_();` |
| EFFECT-0036 | `configureArchiveSpreadsheetId` | UI/notification | `4_System_Index.gs:18` | `const response = ui.prompt(` |
| EFFECT-0037 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:19` | `"Configure Archive Spreadsheet",` |
| EFFECT-0038 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:20` | `"Enter the Google Sheets ID for the Archive workbook.\n\nCurrent ID: " + currentId,` |
| EFFECT-0039 | `configureArchiveSpreadsheetId` | UI/notification | `4_System_Index.gs:25` | `if (!newId) return notify_("Configuration cancelled: ID cannot be blank.");` |
| EFFECT-0040 | `configureArchiveSpreadsheetId` | UI/notification | `4_System_Index.gs:27` | `ui.alert("Invalid ID", "That does not appear to be a valid Google Sheets ID.", ui.ButtonSet.OK);` |
| EFFECT-0041 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:30` | `PropertiesService.getDocumentProperties().setProperty("RFF_ARCHIVE_SPREADSHEET_ID", newId);` |
| EFFECT-0042 | `configureArchiveSpreadsheetId` | Properties/runtime state | `4_System_Index.gs:30` | `PropertiesService.getDocumentProperties().setProperty("RFF_ARCHIVE_SPREADSHEET_ID", newId);` |
| EFFECT-0043 | `configureArchiveSpreadsheetId` | Archival/external workbook | `4_System_Index.gs:31` | `notify_("Archive Spreadsheet ID successfully updated.");` |
| EFFECT-0044 | `configureArchiveSpreadsheetId` | UI/notification | `4_System_Index.gs:31` | `notify_("Archive Spreadsheet ID successfully updated.");` |
| EFFECT-0045 | `configureIndexRestoreWebAppUrl` | Properties/runtime state | `4_System_Index.gs:36` | `const props = PropertiesService.getDocumentProperties();` |
| EFFECT-0046 | `configureIndexRestoreWebAppUrl` | UI/notification | `4_System_Index.gs:38` | `const response = ui.prompt(` |
| EFFECT-0047 | `configureIndexRestoreWebAppUrl` | Properties/runtime state | `4_System_Index.gs:45` | `if (value) props.setProperty("ML_INDEX_RESTORE_WEB_APP_URL", value);` |
| EFFECT-0048 | `configureIndexRestoreWebAppUrl` | Properties/runtime state | `4_System_Index.gs:46` | `else props.deleteProperty("ML_INDEX_RESTORE_WEB_APP_URL");` |
| EFFECT-0049 | `configureIndexRestoreWebAppUrl` | UI/notification | `4_System_Index.gs:49` | `ui.alert("Index Restore Web App URL", value ? "Index restore hyperlinks enabled and Index rebuilt!" : "Configured URL cleared. Web App auto-detection active.", ui.ButtonSet.OK);` |
| EFFECT-0050 | `hasIndexSheetShell_` | Worksheet read | `4_System_Index.gs:55` | `if (!sheet \|\| sheet.getLastRow() < INDEX_HEADER_ROW_COUNT) return false;` |
| EFFECT-0051 | `hasIndexSheetShell_` | Worksheet read | `4_System_Index.gs:57` | `const titleLeft = String(sheet.getRange("A1").getValue() \|\| "").trim();` |
| EFFECT-0052 | `hasIndexSheetShell_` | Worksheet read | `4_System_Index.gs:58` | `const titleRight = String(sheet.getRange("F1").getValue() \|\| "").trim();` |
| EFFECT-0053 | `hasIndexSheetShell_` | Archival/external workbook | `4_System_Index.gs:59` | `return titleLeft === "Active Operational Sheets Workspace" && titleRight === "External Drive Cold-Storage Archives";` |
| EFFECT-0054 | `buildIndexSheetShell_` | Archival/external workbook | `4_System_Index.gs:68` | `const archiveId = getArchiveSpreadsheetId_();` |
| EFFECT-0055 | `buildIndexSheetShell_` | Worksheet write | `4_System_Index.gs:70` | `sheet.clear(); // One-time structural wipe` |
| EFFECT-0056 | `buildIndexSheetShell_` | Archival/external workbook | `4_System_Index.gs:73` | `["Active Operational Sheets Workspace", "", "", "", "", "External Drive Cold-Storage Archives", "", "", "", ""],` |
| EFFECT-0057 | `buildIndexSheetShell_` | Archival/external workbook | `4_System_Index.gs:74` | `["Last Updated", new Date(), "", "", "", "Archive File ID", archiveId, "", "", ""],` |
| EFFECT-0058 | `buildIndexSheetShell_` | Archival/external workbook | `4_System_Index.gs:76` | `["Section / Group", "Sheet Tab Name", "Workspace Link", "Visibility", "", "Archive Month", "Archive Sheet Name", "Link to Sheet", "Status", "Restore Action"]` |
| EFFECT-0059 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:79` | `sheet.getRange(1, 1, 4, INDEX_TOTAL_COLUMNS).setValues(headerMatrix);` |
| EFFECT-0060 | `buildIndexSheetShell_` | Worksheet write | `4_System_Index.gs:79` | `sheet.getRange(1, 1, 4, INDEX_TOTAL_COLUMNS).setValues(headerMatrix);` |
| EFFECT-0061 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:82` | `sheet.getRange("A1:D1").merge().setBackground(theme.level3).setFontWeight("bold").setFontColor("#000000").setFontSize(12);` |
| EFFECT-0062 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:82` | `sheet.getRange("A1:D1").merge().setBackground(theme.level3).setFontWeight("bold").setFontColor("#000000").setFontSize(12);` |
| EFFECT-0063 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:83` | `sheet.getRange("F1:J1").merge().setBackground(theme.level2).setFontWeight("bold").setFontColor("#000000").setFontSize(12);` |
| EFFECT-0064 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:83` | `sheet.getRange("F1:J1").merge().setBackground(theme.level2).setFontWeight("bold").setFontColor("#000000").setFontSize(12);` |
| EFFECT-0065 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:85` | `sheet.getRange("A2:D2").setBackground(theme.level4);` |
| EFFECT-0066 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:85` | `sheet.getRange("A2:D2").setBackground(theme.level4);` |
| EFFECT-0067 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:86` | `sheet.getRange("F2:J2").setBackground(theme.level5);` |
| EFFECT-0068 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:86` | `sheet.getRange("F2:J2").setBackground(theme.level5);` |
| EFFECT-0069 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:88` | `sheet.getRange("A4:D4").setBackground(theme.level2).setFontWeight("bold");` |
| EFFECT-0070 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:88` | `sheet.getRange("A4:D4").setBackground(theme.level2).setFontWeight("bold");` |
| EFFECT-0071 | `buildIndexSheetShell_` | Worksheet read | `4_System_Index.gs:89` | `sheet.getRange("F4:J4").setBackground(theme.level3).setFontWeight("bold");` |
| EFFECT-0072 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:89` | `sheet.getRange("F4:J4").setBackground(theme.level3).setFontWeight("bold");` |
| EFFECT-0073 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:96` | `sheet.setColumnWidth(col, customWidths[col - 1] \|\| (col === 5 ? 30 : 150));` |
| EFFECT-0074 | `buildIndexSheetShell_` | Formatting | `4_System_Index.gs:99` | `sheet.setFrozenRows(INDEX_HEADER_ROW_COUNT);` |
| EFFECT-0075 | `updateIndexLocalWorkspace_` | Worksheet read | `4_System_Index.gs:118` | `const sh = ss.getSheetByName(sheetName);` |
| EFFECT-0076 | `updateIndexLocalWorkspace_` | Worksheet read | `4_System_Index.gs:166` | `const oldLastRow = Math.max(sheet.getLastRow(), startRow);` |
| EFFECT-0077 | `updateIndexLocalWorkspace_` | Worksheet read | `4_System_Index.gs:169` | `sheet.getRange(startRow, 1, clearRows, 4).clearContent().setBackground("#FFFFFF").setFontWeight("normal");` |
| EFFECT-0078 | `updateIndexLocalWorkspace_` | Worksheet write | `4_System_Index.gs:169` | `sheet.getRange(startRow, 1, clearRows, 4).clearContent().setBackground("#FFFFFF").setFontWeight("normal");` |
| EFFECT-0079 | `updateIndexLocalWorkspace_` | Formatting | `4_System_Index.gs:169` | `sheet.getRange(startRow, 1, clearRows, 4).clearContent().setBackground("#FFFFFF").setFontWeight("normal");` |
| EFFECT-0080 | `updateIndexLocalWorkspace_` | Worksheet read | `4_System_Index.gs:172` | `sheet.getRange(startRow, 1, localRows.length, 4).setValues(localRows);` |
| EFFECT-0081 | `updateIndexLocalWorkspace_` | Worksheet write | `4_System_Index.gs:172` | `sheet.getRange(startRow, 1, localRows.length, 4).setValues(localRows);` |
| EFFECT-0082 | `updateIndexLocalWorkspace_` | Worksheet read | `4_System_Index.gs:175` | `sheet.getRangeList(headerA1s).setBackground(theme.level3).setFontWeight("bold");` |
| EFFECT-0083 | `updateIndexLocalWorkspace_` | Formatting | `4_System_Index.gs:175` | `sheet.getRangeList(headerA1s).setBackground(theme.level3).setFontWeight("bold");` |
| EFFECT-0084 | `localSheetRow_` | Worksheet read | `4_System_Index.gs:118` | `const sh = ss.getSheetByName(sheetName);` |
| EFFECT-0085 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:185` | `function updateIndexArchiveWorkspace_(sheet, theme, preOpenedArchiveSs) {` |
| EFFECT-0086 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:186` | `const archiveRows = [];` |
| EFFECT-0087 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:187` | `const archiveId = getArchiveSpreadsheetId_();` |
| EFFECT-0088 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:190` | `const archiveSs = preOpenedArchiveSs \|\| SpreadsheetApp.openById(archiveId);` |
| EFFECT-0089 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:191` | `archiveSs.getSheets().forEach(function(ash) {` |
| EFFECT-0090 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:194` | `const archiveMonthDisplay = ashDate ? Utilities.formatDate(ashDate, Session.getScriptTimeZone(), "MMMM yyyy") : "Cold Storage";` |
| EFFECT-0091 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:196` | `archiveRows.push([` |
| EFFECT-0092 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:197` | `archiveMonthDisplay,` |
| EFFECT-0093 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:199` | `'=HYPERLINK("https://docs.google.com/spreadsheets/d/' + archiveId + '/edit#gid=' + ash.getSheetId() + '","Open Archive Tab")',` |
| EFFECT-0094 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:200` | `ash.isSheetHidden() ? "Archived (Hidden)" : "Visible in Archive",` |
| EFFECT-0095 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:201` | `buildIndexRestoreHyperlinkFormula_(ashName, "demo_p_archive")` |
| EFFECT-0096 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:204` | `archiveRows.sort((a, b) => String(a[0]).localeCompare(String(b[0])));` |
| EFFECT-0097 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:206` | `archiveRows.push(["", "Archive Spreadsheet Unreachable", "", "Verify permissions/ID", ""]);` |
| EFFECT-0098 | `updateIndexArchiveWorkspace_` | Worksheet read | `4_System_Index.gs:210` | `const oldLastRow = Math.max(sheet.getLastRow(), startRow);` |
| EFFECT-0099 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:211` | `const clearRows = Math.max(oldLastRow - startRow + 1, archiveRows.length, 1);` |
| EFFECT-0100 | `updateIndexArchiveWorkspace_` | Worksheet read | `4_System_Index.gs:213` | `sheet.getRange(startRow, 6, clearRows, 5).clearContent().setBackground("#FFFFFF");` |
| EFFECT-0101 | `updateIndexArchiveWorkspace_` | Worksheet write | `4_System_Index.gs:213` | `sheet.getRange(startRow, 6, clearRows, 5).clearContent().setBackground("#FFFFFF");` |
| EFFECT-0102 | `updateIndexArchiveWorkspace_` | Formatting | `4_System_Index.gs:213` | `sheet.getRange(startRow, 6, clearRows, 5).clearContent().setBackground("#FFFFFF");` |
| EFFECT-0103 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:215` | `if (archiveRows.length > 0) {` |
| EFFECT-0104 | `updateIndexArchiveWorkspace_` | Worksheet read | `4_System_Index.gs:216` | `sheet.getRange(startRow, 6, archiveRows.length, 5).setValues(archiveRows);` |
| EFFECT-0105 | `updateIndexArchiveWorkspace_` | Worksheet write | `4_System_Index.gs:216` | `sheet.getRange(startRow, 6, archiveRows.length, 5).setValues(archiveRows);` |
| EFFECT-0106 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:216` | `sheet.getRange(startRow, 6, archiveRows.length, 5).setValues(archiveRows);` |
| EFFECT-0107 | `updateIndexArchiveWorkspace_` | Archival/external workbook | `4_System_Index.gs:219` | `return archiveRows.length;` |
| EFFECT-0108 | `updateIndexSheet` | Worksheet read | `4_System_Index.gs:227` | `let sheet = ss.getSheetByName(INDEX_SHEET);` |
| EFFECT-0109 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:229` | `let preOpenedArchiveSs = null;` |
| EFFECT-0110 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:231` | `let archiveOnly = false;` |
| EFFECT-0111 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:235` | `preOpenedArchiveSs = options;` |
| EFFECT-0112 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:237` | `preOpenedArchiveSs = options.archiveSs \|\| options.preOpenedArchiveSs \|\| null;` |
| EFFECT-0113 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:239` | `archiveOnly = !!options.archiveOnly;` |
| EFFECT-0114 | `updateIndexSheet` | Sheet creation/copy | `4_System_Index.gs:244` | `sheet = buildIndexSheetShell_(sheet \|\| ss.insertSheet(INDEX_SHEET, 0));` |
| EFFECT-0115 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:248` | `let localCount = 0, archiveCount = 0;` |
| EFFECT-0116 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:250` | `if (!archiveOnly) localCount = updateIndexLocalWorkspace_(sheet, theme);` |
| EFFECT-0117 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:251` | `if (!activeOnly) archiveCount = updateIndexArchiveWorkspace_(sheet, theme, preOpenedArchiveSs);` |
| EFFECT-0118 | `updateIndexSheet` | Worksheet read | `4_System_Index.gs:253` | `sheet.getRange("B2").setValue(new Date()).setNumberFormat("mm/dd/yyyy hh:mm:ss");` |
| EFFECT-0119 | `updateIndexSheet` | Worksheet write | `4_System_Index.gs:253` | `sheet.getRange("B2").setValue(new Date()).setNumberFormat("mm/dd/yyyy hh:mm:ss");` |
| EFFECT-0120 | `updateIndexSheet` | Formatting | `4_System_Index.gs:253` | `sheet.getRange("B2").setValue(new Date()).setNumberFormat("mm/dd/yyyy hh:mm:ss");` |
| EFFECT-0121 | `updateIndexSheet` | Archival/external workbook | `4_System_Index.gs:254` | `forceSheetRowCount_(sheet, Math.max(INDEX_FIXED_ROW_COUNT, INDEX_DATA_START_ROW + Math.max(localCount, archiveCount)));` |
| EFFECT-0122 | `restoreSheetFromActiveIndexRow` | Worksheet read | `4_System_Index.gs:283` | `const indexSheet = mainSs.getSheetByName(INDEX_SHEET);` |
| EFFECT-0123 | `restoreSheetFromActiveIndexRow` | Archival/external workbook | `4_System_Index.gs:289` | `ui.alert("Selection Required", "Please click on a row within the 'External Drive Cold-Storage Archives' grid selection table first.", ui.ButtonSet.OK);` |
| EFFECT-0124 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:289` | `ui.alert("Selection Required", "Please click on a row within the 'External Drive Cold-Storage Archives' grid selection table first.", ui.ButtonSet.OK);` |
| EFFECT-0125 | `restoreSheetFromActiveIndexRow` | Archival/external workbook | `4_System_Index.gs:297` | `ui.alert("Invalid Selection", "Please click anywhere on an Archive entry row (Columns F through J) before requesting a restore.", ui.ButtonSet.OK);` |
| EFFECT-0126 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:297` | `ui.alert("Invalid Selection", "Please click anywhere on an Archive entry row (Columns F through J) before requesting a restore.", ui.ButtonSet.OK);` |
| EFFECT-0127 | `restoreSheetFromActiveIndexRow` | Worksheet read | `4_System_Index.gs:301` | `targetSheetName = String(indexSheet.getRange(row, 7).getValue() \|\| "").trim();` |
| EFFECT-0128 | `restoreSheetFromActiveIndexRow` | Archival/external workbook | `4_System_Index.gs:304` | `if (!targetSheetName \|\| targetSheetName.indexOf("Open Archive") === 0 \|\| targetSheetName.indexOf("Archive Sheet") === 0) {` |
| EFFECT-0129 | `restoreSheetFromActiveIndexRow` | Archival/external workbook | `4_System_Index.gs:305` | `ui.alert("Empty Selection", "The chosen row index coordinate does not contain a valid archived sheet identifier.", ui.ButtonSet.OK);` |
| EFFECT-0130 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:305` | `ui.alert("Empty Selection", "The chosen row index coordinate does not contain a valid archived sheet identifier.", ui.ButtonSet.OK);` |
| EFFECT-0131 | `restoreSheetFromActiveIndexRow` | Worksheet read | `4_System_Index.gs:309` | `if (mainSs.getSheetByName(targetSheetName)) {` |
| EFFECT-0132 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:310` | `ui.alert("Conflict Detected", "The sheet '" + targetSheetName + "' already exists locally in this workbook. Please rename or delete the local copy first.", ui.ButtonSet.OK);` |
| EFFECT-0133 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:315` | `const confirmation = ui.alert(` |
| EFFECT-0134 | `restoreSheetFromActiveIndexRow` | Archival/external workbook | `4_System_Index.gs:323` | `restoreSheetFromArchiveWorkbook(targetSheetName);` |
| EFFECT-0135 | `restoreSheetFromActiveIndexRow` | UI/notification | `4_System_Index.gs:325` | `ui.alert("Success", "The sheet '" + targetSheetName + "' has been successfully restored from cold storage.", ui.ButtonSet.OK);` |
| EFFECT-0136 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:329` | `function restoreSheetFromArchiveWorkbook(targetSheetName) {` |
| EFFECT-0137 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:333` | `if (!targetSheetName) throw new Error("Missing archive sheet name to restore.");` |
| EFFECT-0138 | `restoreSheetFromArchiveWorkbook` | Worksheet read | `4_System_Index.gs:334` | `if (mainSs.getSheetByName(targetSheetName)) throw new Error("The sheet '" + targetSheetName + "' already exists locally in this workbook.");` |
| EFFECT-0139 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:336` | `const archiveId = getArchiveSpreadsheetId_();` |
| EFFECT-0140 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:337` | `const archiveSs = SpreadsheetApp.openById(archiveId);` |
| EFFECT-0141 | `restoreSheetFromArchiveWorkbook` | Worksheet read | `4_System_Index.gs:338` | `const archiveSourceSheet = archiveSs.getSheetByName(targetSheetName);` |
| EFFECT-0142 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:338` | `const archiveSourceSheet = archiveSs.getSheetByName(targetSheetName);` |
| EFFECT-0143 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:340` | `if (!archiveSourceSheet) throw new Error("The sheet '" + targetSheetName + "' was not found inside the external archive database.");` |
| EFFECT-0144 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:342` | `mainSs.toast("Retrieving '" + targetSheetName + "' from archive drive...", "Data Transfer Running", 5);` |
| EFFECT-0145 | `restoreSheetFromArchiveWorkbook` | UI/notification | `4_System_Index.gs:342` | `mainSs.toast("Retrieving '" + targetSheetName + "' from archive drive...", "Data Transfer Running", 5);` |
| EFFECT-0146 | `restoreSheetFromArchiveWorkbook` | Worksheet write | `4_System_Index.gs:343` | `const restoredSheet = archiveSourceSheet.copyTo(mainSs);` |
| EFFECT-0147 | `restoreSheetFromArchiveWorkbook` | Sheet creation/copy | `4_System_Index.gs:343` | `const restoredSheet = archiveSourceSheet.copyTo(mainSs);` |
| EFFECT-0148 | `restoreSheetFromArchiveWorkbook` | Archival/external workbook | `4_System_Index.gs:343` | `const restoredSheet = archiveSourceSheet.copyTo(mainSs);` |
| EFFECT-0149 | `restoreSheetFromArchiveWorkbook` | Sheet visibility | `4_System_Index.gs:347` | `if (typeof restoredSheet.showSheet === "function") restoredSheet.showSheet();` |
| EFFECT-0150 | `buildIndexRestoreHyperlinkFormula_` | Archival/external workbook | `4_System_Index.gs:359` | `const restoreAction = String(actionType \|\| "demo_p_archive").trim();` |
| EFFECT-0151 | `getIndexRestoreWebAppUrl_` | Properties/runtime state | `4_System_Index.gs:366` | `const configuredUrl = String(PropertiesService.getDocumentProperties().getProperty("ML_INDEX_RESTORE_WEB_APP_URL") \|\| "").trim();` |
| EFFECT-0152 | `doGet` | Lock/concurrency | `4_System_Index.gs:398` | `const lock = LockService.getDocumentLock();` |
| EFFECT-0153 | `doGet` | Lock/concurrency | `4_System_Index.gs:402` | `if (lock.tryLock(15000)) {` |
| EFFECT-0154 | `doGet` | Archival/external workbook | `4_System_Index.gs:404` | `if (actionType === "demo_p_archive") restoreSheetFromArchiveWorkbook(targetSheetName);` |
| EFFECT-0155 | `doGet` | Lock/concurrency | `4_System_Index.gs:416` | `return HtmlService.createHtmlOutput("<p>⚠️ Server busy processing another execution string. Click the hyperlink tab again.</p>");` |
| EFFECT-0156 | `doGet` | Lock/concurrency | `4_System_Index.gs:421` | `try { lock.releaseLock(); } catch (rErr) {}` |
| EFFECT-0157 | `ensureGoldenMasterTemplate_` | Worksheet read | `5_System_Templates.gs:50` | `let baseSheet = ss.getSheetByName(RFF_BASE_TEMPLATE_NAME);` |
| EFFECT-0158 | `ensureGoldenMasterTemplate_` | Worksheet read | `5_System_Templates.gs:56` | `const canvas = baseSheet.getRange(1, 1, baseSheet.getMaxRows(), baseSheet.getMaxColumns());` |
| EFFECT-0159 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:58` | `.setNumberFormat("@")` |
| EFFECT-0160 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:59` | `.setFontFamily(globals.standardFont \|\| "Arial")` |
| EFFECT-0161 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:60` | `.setFontColor(globals.standardFontColor \|\| "#000000")` |
| EFFECT-0162 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:61` | `.setFontSize(globals.standardFontSize \|\| 10)` |
| EFFECT-0163 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:62` | `.setHorizontalAlignment(globals.defaultHorizontalAlignment \|\| "left")` |
| EFFECT-0164 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:63` | `.setVerticalAlignment(globals.defaultVerticalAlignment \|\| "middle")` |
| EFFECT-0165 | `ensureGoldenMasterTemplate_` | Formatting | `5_System_Templates.gs:66` | `safeSetRowHeights_(baseSheet, 1, baseSheet.getMaxRows(), globals.dataRowHeight \|\| 25, "Golden Master Base");` |
| EFFECT-0166 | `ensureGoldenMasterTemplate_` | Sheet visibility | `5_System_Templates.gs:67` | `hideSheetIfNeeded_(baseSheet, timing, "Golden Master base template hidden");` |
| EFFECT-0167 | `ensureGoldenMasterTemplate_` | Timing/logging | `5_System_Templates.gs:69` | `if (timing) markFrameworkStep_(timing, "Golden Master prepared with plain-text canvas");` |
| EFFECT-0168 | `forceBaseTemplateHidden_` | Worksheet read | `5_System_Templates.gs:147` | `const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RFF_BASE_TEMPLATE_NAME);` |
| EFFECT-0169 | `forceBaseTemplateHidden_` | Sheet visibility | `5_System_Templates.gs:148` | `if (sheet && !sheet.isSheetHidden()) sheet.hideSheet();` |
| EFFECT-0170 | `createOrRefreshTemplateFromDashboard_` | Worksheet read | `5_System_Templates.gs:158` | `let sheet = ss.getSheetByName(sheetDef.templateName);` |
| EFFECT-0171 | `createOrRefreshTemplateFromDashboard_` | Worksheet read | `5_System_Templates.gs:162` | `const base = ss.getSheetByName(RFF_BASE_TEMPLATE_NAME) \|\| ensureGoldenMasterTemplate_(dashboard, timing);` |
| EFFECT-0172 | `createOrRefreshTemplateFromDashboard_` | Worksheet write | `5_System_Templates.gs:163` | `sheet = base.copyTo(ss).setName(sheetDef.templateName);` |
| EFFECT-0173 | `createOrRefreshTemplateFromDashboard_` | Sheet creation/copy | `5_System_Templates.gs:163` | `sheet = base.copyTo(ss).setName(sheetDef.templateName);` |
| EFFECT-0174 | `createOrRefreshTemplateFromDashboard_` | Sheet visibility | `5_System_Templates.gs:175` | `hideSheetIfNeeded_(sheet, timing, "Hide built template: " + sheetDef.templateName);` |
| EFFECT-0175 | `buildTemplateFromDashboard_` | Timing/logging | `5_System_Templates.gs:180` | `markFrameworkStep_(timing, "Full template build required: " + sheetDef.templateName);` |
| EFFECT-0176 | `buildTemplateFromDashboard_` | Timing/logging | `5_System_Templates.gs:189` | `markFrameworkStep_(timing, "Complete full template build: " + sheetDef.templateName);` |
| EFFECT-0177 | `clearTemplateForFullBuild_` | Worksheet read | `5_System_Templates.gs:199` | `sheet.getRange(1, 1, clearRows, clearCols).clearContent().clearFormat().breakApart();` |
| EFFECT-0178 | `clearTemplateForFullBuild_` | Worksheet write | `5_System_Templates.gs:199` | `sheet.getRange(1, 1, clearRows, clearCols).clearContent().clearFormat().breakApart();` |
| EFFECT-0179 | `clearTemplateForFullBuild_` | Worksheet write | `5_System_Templates.gs:203` | `sheet.clearContents();` |
| EFFECT-0180 | `clearTemplateForFullBuild_` | Timing/logging | `5_System_Templates.gs:208` | `markFrameworkStep_(timing, "Clear governed template range: " + sheetDef.templateName);` |
| EFFECT-0181 | `applyTemplateBaseFormatting_` | Worksheet read | `5_System_Templates.gs:216` | `sheet.getRange(1, 1, rowCount, colCount)` |
| EFFECT-0182 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:217` | `.setFontFamily(globals.standardFont)` |
| EFFECT-0183 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:218` | `.setFontColor(globals.standardFontColor)` |
| EFFECT-0184 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:219` | `.setFontSize(globals.standardFontSize)` |
| EFFECT-0185 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:220` | `.setHorizontalAlignment(globals.defaultHorizontalAlignment \|\| "left")` |
| EFFECT-0186 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:221` | `.setVerticalAlignment(globals.defaultVerticalAlignment \|\| "middle")` |
| EFFECT-0187 | `applyTemplateBaseFormatting_` | Formatting | `5_System_Templates.gs:223` | `.setBorder(true, true, true, true, true, true, globals.globalBorderColor \|\| "#CCCCCC", getGlobalBorderStyle_(globals));` |
| EFFECT-0188 | `ensureTemplateFilter_` | Worksheet read | `5_System_Templates.gs:246` | `const range = existing.getRange();` |
| EFFECT-0189 | `ensureTemplateFilter_` | Timing/logging | `5_System_Templates.gs:248` | `if (timing) markFrameworkStep_(timing, "Filter already correct: " + sheetDef.templateName);` |
| EFFECT-0190 | `ensureTemplateFilter_` | Worksheet read | `5_System_Templates.gs:256` | `sheet.getRange(headerRow, 1, expectedRows, colCount).createFilter();` |
| EFFECT-0191 | `ensureTemplateFilter_` | Timing/logging | `5_System_Templates.gs:257` | `if (timing) markFrameworkStep_(timing, "Create filter: " + sheetDef.templateName);` |
| EFFECT-0192 | `applyTemplateFreezeAndTabColor_` | Formatting | `5_System_Templates.gs:267` | `try { if (sheet.getFrozenRows() !== expectedFrozenRows) sheet.setFrozenRows(expectedFrozenRows); } catch (err) {}` |
| EFFECT-0193 | `applyTemplateFreezeAndTabColor_` | Formatting | `5_System_Templates.gs:268` | `try { if (sheet.getFrozenColumns() !== expectedFrozenCols) sheet.setFrozenColumns(expectedFrozenCols); } catch (err) {}` |
| EFFECT-0194 | `writeTemplateMetadata_` | Worksheet read | `5_System_Templates.gs:281` | `sheet.getRange(1, Math.max(colCount, 1)).setNote(note);` |
| EFFECT-0195 | `quickBuildAllTemplates` | UI/notification | `5_System_Templates.gs:317` | `notify_("Quick Build All Templates: building hidden templates and validating...");` |
| EFFECT-0196 | `quickBuildAllTemplates` | UI/notification | `5_System_Templates.gs:319` | `notify_("Quick Build All Templates complete.");` |
| EFFECT-0197 | `setReportTemplateVisibility_` | Sheet visibility | `5_System_Templates.gs:330` | `if (hidden) hideSheetIfNeeded_(sheet, timing, "Hide template sheet: " + sheetDef.templateName);` |
| EFFECT-0198 | `setReportTemplateVisibility_` | Sheet visibility | `5_System_Templates.gs:331` | `else showSheetIfNeeded_(sheet, timing, "Show template sheet: " + sheetDef.templateName);` |
| EFFECT-0199 | `setReportTemplateVisibility_` | Sheet visibility | `5_System_Templates.gs:337` | `if (hidden) hideSheetIfNeeded_(sheet, timing, "Hide orphan template sheet: " + sheetName);` |
| EFFECT-0200 | `setReportTemplateVisibility_` | Sheet visibility | `5_System_Templates.gs:338` | `else showSheetIfNeeded_(sheet, timing, "Show orphan template sheet: " + sheetName);` |
| EFFECT-0201 | `buildRefinedDataFromScratch` | Timing/logging | `7_Workflow_DemoP.gs:17` | `markFrameworkStep_(timing, "Locate validated Raw Data source: " + rawSheet.getName());` |
| EFFECT-0202 | `buildRefinedDataFromScratch` | Worksheet read | `7_Workflow_DemoP.gs:21` | `const flatCount = buildResult.flatCount \|\| Math.max(demoSheet.getLastRow() - DATA_START_ROW + 1, 0);` |
| EFFECT-0203 | `buildRefinedDataFromScratch` | Timing/logging | `7_Workflow_DemoP.gs:26` | `markFrameworkStep_(timing, "Demo P flat-record contact compression complete \| Retained: " + flatCount);` |
| EFFECT-0204 | `buildRefinedDataFromScratch` | UI/notification | `7_Workflow_DemoP.gs:27` | `notify_("Build Demo P (Initialization) complete. Flat primary records retained: " + flatCount);` |
| EFFECT-0205 | `getValidatedRawDataSheetForDemoPBuild_` | Timing/logging | `7_Workflow_DemoP.gs:36` | `if (timing) markRuntimeStep_(timing, "Validated Raw Data sheet: " + currentRawSheet.getName());` |
| EFFECT-0206 | `getValidatedRawDataSheetForDemoPBuild_` | Timing/logging | `7_Workflow_DemoP.gs:44` | `if (timing) markRuntimeStep_(timing, "Validated active sheet fallback: " + activeSheet.getName());` |
| EFFECT-0207 | `processRefinedDataUnified_` | Timing/logging | `7_Workflow_DemoP.gs:121` | `if (timing) markFrameworkStep_(timing, "Refined Data unified transform complete \| Rows: " + flattenedCount);` |
| EFFECT-0208 | `updateDemoPReportDates_` | Worksheet read | `7_Workflow_DemoP.gs:511` | `demoSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat("m/d/yyyy");` |
| EFFECT-0209 | `updateDemoPReportDates_` | Worksheet write | `7_Workflow_DemoP.gs:511` | `demoSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat("m/d/yyyy");` |
| EFFECT-0210 | `updateDemoPReportDates_` | Formatting | `7_Workflow_DemoP.gs:511` | `demoSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat("m/d/yyyy");` |
| EFFECT-0211 | `updateDemoPReportDates_` | Worksheet read | `7_Workflow_DemoP.gs:512` | `demoSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat("m/d/yyyy");` |
| EFFECT-0212 | `updateDemoPReportDates_` | Worksheet write | `7_Workflow_DemoP.gs:512` | `demoSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat("m/d/yyyy");` |
| EFFECT-0213 | `updateDemoPReportDates_` | Formatting | `7_Workflow_DemoP.gs:512` | `demoSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat("m/d/yyyy");` |
| EFFECT-0214 | `updateDemoPReportDates_` | Worksheet read | `7_Workflow_DemoP.gs:513` | `demoSheet.getRange("E2").setValue("Last Updated").setFontFamily("Arial").setFontSize(10).setFontStyle("italic").setHorizontalAlignment("left");` |
| EFFECT-0215 | `updateDemoPReportDates_` | Worksheet write | `7_Workflow_DemoP.gs:513` | `demoSheet.getRange("E2").setValue("Last Updated").setFontFamily("Arial").setFontSize(10).setFontStyle("italic").setHorizontalAlignment("left");` |
| EFFECT-0216 | `updateDemoPReportDates_` | Formatting | `7_Workflow_DemoP.gs:513` | `demoSheet.getRange("E2").setValue("Last Updated").setFontFamily("Arial").setFontSize(10).setFontStyle("italic").setHorizontalAlignment("left");` |
| EFFECT-0217 | `enforceDemoPPostFlattenFormatting_` | Worksheet read | `7_Workflow_DemoP.gs:525` | `const lastRow = demoSheet.getLastRow();` |
| EFFECT-0218 | `enforceDemoPPostFlattenFormatting_` | Worksheet read | `7_Workflow_DemoP.gs:526` | `const lastCol = Math.max(demoSheet.getLastColumn(), 1);` |
| EFFECT-0219 | `enforceDemoPPostFlattenFormatting_` | Worksheet read | `7_Workflow_DemoP.gs:528` | `demoSheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);` |
| EFFECT-0220 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:536` | `const exclusionSheet = ss.getSheetByName(DISENROLLED_EXCLUSION_SHEET);` |
| EFFECT-0221 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:537` | `if (!exclusionSheet \|\| exclusionSheet.getLastRow() < DATA_START_ROW) return 0;` |
| EFFECT-0222 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:539` | `const demoLastRow = demoSheet.getLastRow();` |
| EFFECT-0223 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:540` | `const demoLastCol = demoSheet.getLastColumn();` |
| EFFECT-0224 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:561` | `const demoValues = demoSheet.getRange(DATA_START_ROW, 1, demoLastRow - DATA_START_ROW + 1, demoLastCol).getValues();` |
| EFFECT-0225 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:590` | `const width = Math.max(exclusionSheet.getLastColumn(), 1);` |
| EFFECT-0226 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:591` | `exclusionSheet.getRange(DATA_START_ROW, 1, exclusionData.values.length, width).clearContent();` |
| EFFECT-0227 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet write | `7_Workflow_DemoP.gs:591` | `exclusionSheet.getRange(DATA_START_ROW, 1, exclusionData.values.length, width).clearContent();` |
| EFFECT-0228 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet read | `7_Workflow_DemoP.gs:594` | `exclusionSheet.getRange(DATA_START_ROW, 1, normalizedRows.length, width).setValues(normalizedRows);` |
| EFFECT-0229 | `removeActiveDemoPPMRsFromDisenrolledExclusion_` | Worksheet write | `7_Workflow_DemoP.gs:594` | `exclusionSheet.getRange(DATA_START_ROW, 1, normalizedRows.length, width).setValues(normalizedRows);` |
| EFFECT-0230 | `createMasterListForMonth_` | Timing/logging | `8_Workflow_MasterList.gs:14` | `const timing = parentTiming \|\| startFrameworkTiming_("Create Master List", monthParts);` |
| EFFECT-0231 | `createMasterListForMonth_` | Timing/logging | `8_Workflow_MasterList.gs:16` | `if (parentTiming) markFrameworkStep_(timing, "Create Monthly Update - Create Master List - " + label, details \|\| "");` |
| EFFECT-0232 | `createMasterListForMonth_` | Timing/logging | `8_Workflow_MasterList.gs:17` | `else markRuntimeStep_(timing, label, details);` |
| EFFECT-0233 | `createMasterListForMonth_` | UI/notification | `8_Workflow_MasterList.gs:27` | `notify_("Refined Data sheet for that month was not found. Build Refined Data first.");` |
| EFFECT-0234 | `createMasterListForMonth_` | Worksheet read | `8_Workflow_MasterList.gs:34` | `const existingMasterSheet = ss.getSheetByName(masterName);` |
| EFFECT-0235 | `createMasterListForMonth_` | UI/notification | `8_Workflow_MasterList.gs:40` | `const response = ui.alert("Master List Exists", `${masterName} already exists. Replace it?`, ui.ButtonSet.YES_NO);` |
| EFFECT-0236 | `createMasterListForMonth_` | UI/notification | `8_Workflow_MasterList.gs:42` | `notify_("Create Master List cancelled.");` |
| EFFECT-0237 | `createMasterListForMonth_` | Sheet visibility | `8_Workflow_MasterList.gs:56` | `hideSheetIfNeeded_(masterSheet, timing, "Master List staged build hidden until validation: " + masterBuildName);` |
| EFFECT-0238 | `createMasterListForMonth_` | Worksheet read | `8_Workflow_MasterList.gs:85` | `masterSheet.getRange(DATA_START_ROW, 1, copiedRowCount, masterHeaders.length).setValues(inMemoryData.values);` |
| EFFECT-0239 | `createMasterListForMonth_` | Worksheet write | `8_Workflow_MasterList.gs:85` | `masterSheet.getRange(DATA_START_ROW, 1, copiedRowCount, masterHeaders.length).setValues(inMemoryData.values);` |
| EFFECT-0240 | `createMasterListForMonth_` | UI/notification | `8_Workflow_MasterList.gs:101` | `notify_(`Master List created. Copied ${copiedRowCount} Primary PMR row(s) from processed Refined Data.\n\nRuntime: ${formatSeconds_((new Date().getTime() - timing.startMs) / 1000)}`);` |
| EFFECT-0241 | `createMasterListForMonth_` | Timing/logging | `8_Workflow_MasterList.gs:111` | `if (parentTiming) markFrameworkStep_(timing, "ERROR - Create Master List - " + err.message, err.stack \|\| "");` |
| EFFECT-0242 | `createMasterListForMonth_` | Timing/logging | `8_Workflow_MasterList.gs:113` | `markRuntimeStep_(timing, "ERROR - " + err.message);` |
| EFFECT-0243 | `syncUnlockedCarePlanSourceIntoData_` | UI/notification | `8_Workflow_MasterList.gs:208` | `if (!sourceSheet) { notify_("Unlocked Care Plan Report was not found. Unlocked sync skipped."); return; }` |
| EFFECT-0244 | `syncCarePlanDueSourceIntoData_` | UI/notification | `8_Workflow_MasterList.gs:219` | `if (!sourceSheet) { notify_("Care Plan Due Report was not found. Care Plan Due sync skipped."); return; }` |
| EFFECT-0245 | `validateStagedMasterListBeforeSwap_` | Worksheet read | `8_Workflow_MasterList.gs:433` | `if (sheet.getLastRow() < HEADER_ROW \|\| sheet.getLastColumn() < 1) throw new Error("Staged Master List is missing required title/header structure.");` |
| EFFECT-0246 | `validateStagedMasterListBeforeSwap_` | Worksheet read | `8_Workflow_MasterList.gs:434` | `if (Number(copiedRowCount \|\| 0) > 0 && sheet.getLastRow() < DATA_START_ROW) throw new Error("Staged Master List copied rows but has no data area.");` |
| EFFECT-0247 | `promoteStagedMasterListSheet_` | Sheet deletion | `8_Workflow_MasterList.gs:440` | `deleteSheetSafely_(ss, existingSheet, "Master List staged swap", [stagedSheet.getName()]);` |
| EFFECT-0248 | `promoteStagedMasterListSheet_` | Sheet visibility | `8_Workflow_MasterList.gs:444` | `showSheetIfNeeded_(stagedSheet, timing, "Master List staged swap promoted: " + masterName);` |
| EFFECT-0249 | `cleanupFailedStagedMasterListSheet_` | Sheet deletion | `8_Workflow_MasterList.gs:455` | `deleteSheetSafely_(ss, sheet, "failed Master List staged build cleanup", [masterName]);` |
| EFFECT-0250 | `buildMasterListHeadersBeforeDataCopy_` | Worksheet read | `8_Workflow_MasterList.gs:465` | `const template = ss.getSheetByName("Template - Master List");` |
| EFFECT-0251 | `buildMasterListHeadersBeforeDataCopy_` | Worksheet read | `8_Workflow_MasterList.gs:472` | `masterSheet.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);` |
| EFFECT-0252 | `buildMasterListHeadersBeforeDataCopy_` | Worksheet write | `8_Workflow_MasterList.gs:472` | `masterSheet.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);` |
| EFFECT-0253 | `buildMonthlyChangeReportForMonth_` | UI/notification | `9_Workflow_MonthlyChange.gs:18` | `notify_("Monthly Change Report could not find required Raw Data source sheets for comparison.");` |
| EFFECT-0254 | `buildMonthlyChangeReportForMonth_` | Timing/logging | `9_Workflow_MonthlyChange.gs:22` | `markRuntimeStep_(timing, "Monthly Change source sheets located \| Current: " + currentDemo.getName() + "; Previous: " + previousDemo.getName());` |
| EFFECT-0255 | `buildMonthlyChangeReportForMonth_` | UI/notification | `9_Workflow_MonthlyChange.gs:30` | `notify_("No Raw Data changes found. Monthly Change Report was not created.");` |
| EFFECT-0256 | `buildMonthlyChangeReportForMonth_` | Worksheet read | `9_Workflow_MonthlyChange.gs:35` | `let reportSheet = ss.getSheetByName(reportName);` |
| EFFECT-0257 | `buildMonthlyChangeReportForMonth_` | Worksheet read | `9_Workflow_MonthlyChange.gs:40` | `const template = ss.getSheetByName(sheetDef.templateName);` |
| EFFECT-0258 | `buildMonthlyChangeReportForMonth_` | Worksheet write | `9_Workflow_MonthlyChange.gs:43` | `reportSheet = template.copyTo(ss);` |
| EFFECT-0259 | `buildMonthlyChangeReportForMonth_` | Sheet creation/copy | `9_Workflow_MonthlyChange.gs:43` | `reportSheet = template.copyTo(ss);` |
| EFFECT-0260 | `buildMonthlyChangeReportForMonth_` | Sheet visibility | `9_Workflow_MonthlyChange.gs:46` | `showSheetIfNeeded_(reportSheet, timing, "Monthly Change report sheet shown");` |
| EFFECT-0261 | `buildMonthlyChangeReportForMonth_` | Timing/logging | `9_Workflow_MonthlyChange.gs:54` | `markRuntimeStep_(timing, "Monthly Change index refresh deferred");` |
| EFFECT-0262 | `buildMonthlyChangeReportForMonth_` | UI/notification | `9_Workflow_MonthlyChange.gs:60` | `notify_(`Monthly Change Report created.\n\nEnrollments: ${sectionData.enrollmentPMRs.size}\nDisenrollments: ${sectionData.disenrollmentPMRs.size}`);` |
| EFFECT-0263 | `compareRawDataForMonthlyChange_` | Worksheet read | `9_Workflow_MonthlyChange.gs:109` | `const exclusionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DISENROLLED_EXCLUSION_SHEET);` |
| EFFECT-0264 | `populateMonthlyChangeReportSections_` | Worksheet read | `9_Workflow_MonthlyChange.gs:430` | `reportSheet.getRange(HEADER_ROW + 1, 1, existingRows, lastCol).clear();` |
| EFFECT-0265 | `populateMonthlyChangeReportSections_` | Worksheet write | `9_Workflow_MonthlyChange.gs:430` | `reportSheet.getRange(HEADER_ROW + 1, 1, existingRows, lastCol).clear();` |
| EFFECT-0266 | `populateMonthlyChangeReportSections_` | Worksheet read | `9_Workflow_MonthlyChange.gs:433` | `const targetRange = reportSheet.getRange(HEADER_ROW + 1, 1, matrix.values.length, lastCol);` |
| EFFECT-0267 | `populateMonthlyChangeReportSections_` | Worksheet read | `9_Workflow_MonthlyChange.gs:434` | `targetRange.setValues(matrix.values);` |
| EFFECT-0268 | `populateMonthlyChangeReportSections_` | Worksheet write | `9_Workflow_MonthlyChange.gs:434` | `targetRange.setValues(matrix.values);` |
| EFFECT-0269 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:505` | `reportSheet.getRange("A1").setValue("Monthly Change Report");` |
| EFFECT-0270 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:505` | `reportSheet.getRange("A1").setValue("Monthly Change Report");` |
| EFFECT-0271 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:506` | `reportSheet.getRange("A2").setValue("Date");` |
| EFFECT-0272 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:506` | `reportSheet.getRange("A2").setValue("Date");` |
| EFFECT-0273 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:508` | `reportSheet.getRange("B2").setValue(monthParts.firstDay);` |
| EFFECT-0274 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:508` | `reportSheet.getRange("B2").setValue(monthParts.firstDay);` |
| EFFECT-0275 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:509` | `reportSheet.getRange("C2").setValue("to");` |
| EFFECT-0276 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:509` | `reportSheet.getRange("C2").setValue("to");` |
| EFFECT-0277 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:510` | `reportSheet.getRange("D2").setValue(monthParts.lastDay);` |
| EFFECT-0278 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:510` | `reportSheet.getRange("D2").setValue(monthParts.lastDay);` |
| EFFECT-0279 | `buildMonthlyChangeReportSectionLayout_` | Worksheet read | `9_Workflow_MonthlyChange.gs:513` | `reportSheet.getRange(HEADER_ROW, 1, 1, lastCol).setValues([padRowToWidth_(reportHeaders, lastCol)]);` |
| EFFECT-0280 | `buildMonthlyChangeReportSectionLayout_` | Worksheet write | `9_Workflow_MonthlyChange.gs:513` | `reportSheet.getRange(HEADER_ROW, 1, 1, lastCol).setValues([padRowToWidth_(reportHeaders, lastCol)]);` |
| EFFECT-0281 | `buildMonthlyChangeReportSectionLayout_` | Formatting | `9_Workflow_MonthlyChange.gs:516` | `reportSheet.setFrozenRows(4);` |
| EFFECT-0282 | `buildMonthlyChangeReportSectionLayout_` | Formatting | `9_Workflow_MonthlyChange.gs:517` | `reportSheet.setFrozenColumns(2);` |
| EFFECT-0283 | `formatMonthlyChangeReportSectionSheet_` | Formatting | `9_Workflow_MonthlyChange.gs:526` | `reportSheet.setFrozenRows(4);` |
| EFFECT-0284 | `formatMonthlyChangeReportSectionSheet_` | Formatting | `9_Workflow_MonthlyChange.gs:527` | `reportSheet.setFrozenColumns(2);` |
| EFFECT-0285 | `createDisenrolledListForMonth_` | Timing/logging | `_10_Workflow_Disenrolled.gs:30` | `if (timing) markFrameworkStep_(timing, prefix + label, details \|\| "");` |
| EFFECT-0286 | `createDisenrolledListForMonth_` | UI/notification | `_10_Workflow_Disenrolled.gs:57` | `notify_(`Disenrolled Exclusion list updated.\n\nNew records added: ${result.rowsCopied}\nRe-enrolled records purged: ${result.rowsRemoved}`);` |
| EFFECT-0287 | `syncDisenrolledExclusionFromRawData_` | Timing/logging | `_10_Workflow_Disenrolled.gs:68` | `if (timing) markFrameworkStep_(timing, prefix + label, details \|\| "");` |
| EFFECT-0288 | `syncDisenrolledExclusionFromRawData_` | Worksheet read | `_10_Workflow_Disenrolled.gs:139` | `const startRow = Math.max(exclusionSheet.getLastRow() + 1, DATA_START_ROW);` |
| EFFECT-0289 | `syncDisenrolledExclusionFromRawData_` | Worksheet read | `_10_Workflow_Disenrolled.gs:141` | `exclusionSheet.getRange(startRow, 1, mappedNewRows.length, exclusionHeaders.length).setValues(mappedNewRows);` |
| EFFECT-0290 | `syncDisenrolledExclusionFromRawData_` | Worksheet write | `_10_Workflow_Disenrolled.gs:141` | `exclusionSheet.getRange(startRow, 1, mappedNewRows.length, exclusionHeaders.length).setValues(mappedNewRows);` |
| EFFECT-0291 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet read | `_10_Workflow_Disenrolled.gs:225` | `let sheet = ss.getSheetByName(DISENROLLED_EXCLUSION_SHEET);` |
| EFFECT-0292 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet read | `_10_Workflow_Disenrolled.gs:231` | `const template = ss.getSheetByName(sheetDef.templateName);` |
| EFFECT-0293 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet write | `_10_Workflow_Disenrolled.gs:233` | `sheet = template.copyTo(ss);` |
| EFFECT-0294 | `getOrCreateDisenrolledExclusionSheet_` | Sheet creation/copy | `_10_Workflow_Disenrolled.gs:233` | `sheet = template.copyTo(ss);` |
| EFFECT-0295 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet read | `_10_Workflow_Disenrolled.gs:242` | `sheet.getRange("A1").setValue(sheetDef.reportTitle \|\| DISENROLLED_EXCLUSION_SHEET);` |
| EFFECT-0296 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet write | `_10_Workflow_Disenrolled.gs:242` | `sheet.getRange("A1").setValue(sheetDef.reportTitle \|\| DISENROLLED_EXCLUSION_SHEET);` |
| EFFECT-0297 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet read | `_10_Workflow_Disenrolled.gs:248` | `sheet.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);` |
| EFFECT-0298 | `getOrCreateDisenrolledExclusionSheet_` | Worksheet write | `_10_Workflow_Disenrolled.gs:248` | `sheet.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);` |
| EFFECT-0299 | `getOrCreateDisenrolledExclusionSheet_` | Formatting | `_10_Workflow_Disenrolled.gs:254` | `try { sheet.setFrozenRows(HEADER_ROW); } catch (err) {}` |
| EFFECT-0300 | `getOrCreateDisenrolledExclusionSheet_` | Formatting | `_10_Workflow_Disenrolled.gs:255` | `try { sheet.setFrozenColumns(2); } catch (err) {}` |
| EFFECT-0301 | `getOrCreateDisenrolledExclusionSheet_` | Sheet visibility | `_10_Workflow_Disenrolled.gs:257` | `showSheetIfNeeded_(sheet, timing, (timingPrefix \|\| "") + "Disenrolled Exclusion sheet shown");` |

## Menu/Trigger-to-Worksheet Impact Matrix

| Entry | Root | Static effect categories reachable |
|---|---|---|
| MENU-001 | `formatMonthlySheets` | none detected |
| MENU-002 | `runMonthlyUpdate` | none detected |
| MENU-003 | `runMonthlyStart` | none detected |
| MENU-004 | `hideMonthlyImportSheets` | none detected |
| MENU-005 | `archiveMonthlyImportSheets` | none detected |
| MENU-006 | `hideMonthlyActiveSheets` | none detected |
| MENU-007 | `archiveMonthlyActiveSheets` | none detected |
| MENU-008 | `buildAllTemplatesAndValidate` | Formatting, Properties/runtime state, Sheet creation/copy, Sheet visibility, Timing/logging, Worksheet read, Worksheet write |
| MENU-009 | `showReportTemplates` | none detected |
| MENU-010 | `hideReportTemplates` | none detected |
| MENU-011 | `hideSystemSheets_` | none detected |
| MENU-012 | `showSystemSheets_` | none detected |
| MENU-013 | `quickSystemSetup` | none detected |
| MENU-014 | `buildSystemSheets` | none detected |
| MENU-015 | `setupSystemSheets` | none detected |
| MENU-016 | `quickBuildAllTemplates` | Formatting, Properties/runtime state, Sheet creation/copy, Sheet visibility, Timing/logging, UI/notification, Worksheet read, Worksheet write |
| MENU-017 | `runDashboardQualityWorkflow` | none detected |
| MENU-018 | `runDashboardQualityStartUp` | none detected |
| MENU-019 | `runDashboardQualityValidateTemplates` | none detected |
| MENU-020 | `runDashboardQualityWorkflow` | none detected |
| MENU-021 | `formatBannerReport` | none detected |
| MENU-022 | `formatCarePlanDueReport` | none detected |
| MENU-023 | `formatUnlockedCarePlanReport` | none detected |
| MENU-024 | `formatRawData` | none detected |
| MENU-025 | `updateRefinedDataMonthlySync` | none detected |
| MENU-026 | `buildRefinedDataFromScratch` | Archival/external workbook, Formatting, Properties/runtime state, Sheet creation/copy, Timing/logging, UI/notification, Worksheet read, Worksheet write |
| MENU-027 | `createDisenrolledList` | Archival/external workbook, Formatting, Properties/runtime state, Sheet creation/copy, Sheet visibility, Timing/logging, UI/notification, Worksheet read, Worksheet write |
| MENU-028 | `buildMonthlyChangeReport` | Archival/external workbook, Formatting, Properties/runtime state, Sheet creation/copy, Sheet visibility, Timing/logging, UI/notification, Worksheet read, Worksheet write |
| MENU-029 | `createMasterList` | Properties/runtime state, Sheet deletion, Sheet visibility, Timing/logging, UI/notification, Worksheet read, Worksheet write |
| MENU-030 | `createSystemTemplates` | none detected |
| MENU-031 | `clearDiagnosticsAndTimingLogs` | none detected |
| MENU-032 | `toggleFrameworkTiming` | none detected |
| MENU-033 | `enforceGlobalSheetSortOrder` | none detected |
| MENU-034 | `buildSystemSheets` | none detected |
| MENU-035 | `setupSystemSheets` | none detected |
| MENU-036 | `rebuildFormatDashboardDefaults` | none detected |
| MENU-037 | `saveActiveLayoutToDashboardSettings` | none detected |
| MENU-038 | `buildAllTemplatesAndValidate` | Formatting, Properties/runtime state, Sheet creation/copy, Sheet visibility, Timing/logging, Worksheet read, Worksheet write |
| MENU-039 | `updateIndexSheet` | Archival/external workbook, Formatting, Properties/runtime state, Sheet creation/copy, Worksheet read, Worksheet write |
| MENU-040 | `restoreSheetFromActiveIndexRow` | Archival/external workbook, Formatting, Properties/runtime state, Sheet creation/copy, Sheet visibility, UI/notification, Worksheet read, Worksheet write |
| MENU-041 | `configureIndexRestoreWebAppUrl` | Archival/external workbook, Formatting, Properties/runtime state, Sheet creation/copy, UI/notification, Worksheet read, Worksheet write |
| MENU-042 | `configureArchiveSpreadsheetId` | Archival/external workbook, Properties/runtime state, UI/notification |
| TRG-001 | `onOpen` | Archival/external workbook, Timing/logging |
| TRG-002 | `doGet` | Archival/external workbook, Formatting, Lock/concurrency, Properties/runtime state, Sheet creation/copy, Sheet visibility, UI/notification, Worksheet read, Worksheet write |

## Branch, Validation, Failure, and Recovery Catalog

### Validation register

| ID | Function | Evidence | Source |
|---|---|---|---|
| VAL-0001 | `onOpen` | `1_Config.gs:23` | `.addItem("Build All Templates + Validate", "buildAllTemplatesAndValidate")` |
| VAL-0002 | `onOpen` | `1_Config.gs:33` | `.addItem("🖼️ Build Templates + Validate Templates", "quickBuildAllTemplates")` |
| VAL-0003 | `onOpen` | `1_Config.gs:38` | `.addItem("Dashboard Quality Validate Templates", "runDashboardQualityValidateTemplates")` |
| VAL-0004 | `onOpen` | `1_Config.gs:62` | `.addItem("🖼️ Build All Templates + Validate", "buildAllTemplatesAndValidate"))` |
| VAL-0005 | `configureArchiveSpreadsheetId` | `4_System_Index.gs:27` | `ui.alert("Invalid ID", "That does not appear to be a valid Google Sheets ID.", ui.ButtonSet.OK);` |
| VAL-0006 | `restoreSheetFromActiveIndexRow` | `4_System_Index.gs:289` | `ui.alert("Selection Required", "Please click on a row within the 'External Drive Cold-Storage Archives' grid selection table first.", ui.ButtonSet.OK);` |
| VAL-0007 | `restoreSheetFromActiveIndexRow` | `4_System_Index.gs:297` | `ui.alert("Invalid Selection", "Please click anywhere on an Archive entry row (Columns F through J) before requesting a restore.", ui.ButtonSet.OK);` |
| VAL-0008 | `restoreSheetFromActiveIndexRow` | `4_System_Index.gs:305` | `ui.alert("Empty Selection", "The chosen row index coordinate does not contain a valid archived sheet identifier.", ui.ButtonSet.OK);` |
| VAL-0009 | `buildTemplateFromDashboard_` | `5_System_Templates.gs:180` | `markFrameworkStep_(timing, "Full template build required: " + sheetDef.templateName);` |
| VAL-0010 | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:287` | `function buildAllTemplatesAndValidate() {` |
| VAL-0011 | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:288` | `const buildResult = runFrameworkTimed_("Build All Templates And Validate", function(timing) {` |
| VAL-0012 | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:312` | `runDashboardQualityValidateTemplates();` |
| VAL-0013 | `quickBuildAllTemplates` | `5_System_Templates.gs:317` | `notify_("Quick Build All Templates: building hidden templates and validating...");` |
| VAL-0014 | `quickBuildAllTemplates` | `5_System_Templates.gs:318` | `buildAllTemplatesAndValidate();` |
| VAL-0015 | `buildRefinedDataFromScratch` | `7_Workflow_DemoP.gs:16` | `const rawSheet = getValidatedRawDataSheetForDemoPBuild_(monthParts, timing);` |
| VAL-0016 | `buildRefinedDataFromScratch` | `7_Workflow_DemoP.gs:17` | `markFrameworkStep_(timing, "Locate validated Raw Data source: " + rawSheet.getName());` |
| VAL-0017 | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:32` | `function getValidatedRawDataSheetForDemoPBuild_(monthParts, timing) {` |
| VAL-0018 | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:35` | `validateRawDataPreflightForDemoP_(currentRawSheet, null, "Build Demo P current Raw Data preflight");` |
| VAL-0019 | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:36` | `if (timing) markRuntimeStep_(timing, "Validated Raw Data sheet: " + currentRawSheet.getName());` |
| VAL-0020 | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:43` | `validateRawDataPreflightForDemoP_(activeSheet, null, "Build Demo P active-sheet Raw Data preflight");` |
| VAL-0021 | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:44` | `if (timing) markRuntimeStep_(timing, "Validated active sheet fallback: " + activeSheet.getName());` |
| VAL-0022 | `createActiveDemoPFromRawData_` | `7_Workflow_DemoP.gs:59` | `const preflight = validateRawDataPreflightForDemoP_(rawSheet, null, "Build Demo P from Raw Data");` |
| VAL-0023 | `createActiveDemoPFromRawData_` | `7_Workflow_DemoP.gs:60` | `const rawData = preflight.rawData;` |
| VAL-0024 | `flattenDemoPContactRowsInMemory_` | `7_Workflow_DemoP.gs:148` | `function flattenDemoPContactRowsInMemory_(data, requireIntegrity) {` |
| VAL-0025 | `flattenDemoPContactRowsInMemory_` | `7_Workflow_DemoP.gs:154` | `if (pmrIdx === -1 \|\| primaryIdx === undefined) throw new Error("Refined Data contact compression requires PMR and Primary PMR Row headers.");` |
| VAL-0026 | `flattenDemoPContactRowsInMemory_` | `7_Workflow_DemoP.gs:197` | `if (requireIntegrity && assignedContacts > 0 && contactTargetIndexes.length === 0) throw new Error("Contact flattening integrity check failed: no Contact target columns available.");` |
| VAL-0027 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:11` | `function createMasterListForMonth_(monthParts, parentTiming, preflight) {` |
| VAL-0028 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:37` | `const replacementAlreadyConfirmed = !!(preflight && preflight.masterListExistsAndReplaceConfirmed && preflight.masterListName === masterName);` |
| VAL-0029 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:48` | `markStep("Existing Master List replacement confirmed during preflight");` |
| VAL-0030 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:56` | `hideSheetIfNeeded_(masterSheet, timing, "Master List staged build hidden until validation: " + masterBuildName);` |
| VAL-0031 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:81` | `const requiredMasterRows = DATA_START_ROW + copiedRowCount - 1;` |
| VAL-0032 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:82` | `if (masterSheet.getMaxRows() < requiredMasterRows) {` |
| VAL-0033 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:83` | `masterSheet.insertRowsAfter(masterSheet.getMaxRows(), requiredMasterRows - masterSheet.getMaxRows());` |
| VAL-0034 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:91` | `setRequiredSheetName_(masterSheet, masterName);` |
| VAL-0035 | `validateStagedMasterListBeforeSwap_` | `8_Workflow_MasterList.gs:431` | `function validateStagedMasterListBeforeSwap_(sheet, masterName, copiedRowCount) {` |
| VAL-0036 | `validateStagedMasterListBeforeSwap_` | `8_Workflow_MasterList.gs:433` | `if (sheet.getLastRow() < HEADER_ROW \|\| sheet.getLastColumn() < 1) throw new Error("Staged Master List is missing required title/header structure.");` |
| VAL-0037 | `promoteStagedMasterListSheet_` | `8_Workflow_MasterList.gs:438` | `validateStagedMasterListBeforeSwap_(stagedSheet, masterName, copiedRowCount);` |
| VAL-0038 | `promoteStagedMasterListSheet_` | `8_Workflow_MasterList.gs:441` | `if (markStep) markStep("Delete previous Master List after staged replacement validation");` |
| VAL-0039 | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:18` | `notify_("Monthly Change Report could not find required Raw Data source sheets for comparison.");` |
| VAL-0040 | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:44` | `setRequiredSheetName_(reportSheet, reportName);` |
| VAL-0041 | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:51` | `setRequiredSheetName_(reportSheet, reportName);` |
| VAL-0042 | `populateMonthlyChangeReportSections_` | `9_Workflow_MonthlyChange.gs:426` | `const requiredRows = Math.max(HEADER_ROW + matrix.values.length, 1);` |
| VAL-0043 | `populateMonthlyChangeReportSections_` | `9_Workflow_MonthlyChange.gs:427` | `resizeSheetGrid_(reportSheet, requiredRows, lastCol);` |
| VAL-0044 | `syncDisenrolledExclusionFromRawData_` | `_10_Workflow_Disenrolled.gs:83` | `throw new Error("Raw Data requires Enrollment Status or Disenrollment Effective Date columns to identify disenrolled participants.");` |

### Timing register

| ID | Function | Evidence | Source |
|---|---|---|---|
| TIME-0001 | `onOpen` | `1_Config.gs:54` | `.addItem("🪄 Clear Diagnostics & Timing", "clearDiagnosticsAndTimingLogs")` |
| TIME-0002 | `onOpen` | `1_Config.gs:55` | `.addItem("⏱️ Framework Timing on/off", "toggleFrameworkTiming")` |
| TIME-0003 | `startFrameworkTiming_` | `3_Core_Helpers.gs:256` | `function startFrameworkTiming_(processName, monthParts) {` |
| TIME-0004 | `markFrameworkStep_` | `3_Core_Helpers.gs:261` | `function markFrameworkStep_(timing, stepName, details) {` |
| TIME-0005 | `markFrameworkStep_` | `3_Core_Helpers.gs:262` | `if (!timing) return;` |
| TIME-0006 | `markFrameworkStep_` | `3_Core_Helpers.gs:264` | `const stepSeconds = (now - timing.lastMs) / 1000;` |
| TIME-0007 | `markFrameworkStep_` | `3_Core_Helpers.gs:265` | `const totalSeconds = (now - timing.startMs) / 1000;` |
| TIME-0008 | `markFrameworkStep_` | `3_Core_Helpers.gs:273` | `timing.steps.push([` |
| TIME-0009 | `markFrameworkStep_` | `3_Core_Helpers.gs:274` | `new Date(), timing.processName, stepName \|\| "Step", Number(stepSeconds.toFixed(3)), Number(totalSeconds.toFixed(3)), severity, details \|\| ""` |
| TIME-0010 | `markFrameworkStep_` | `3_Core_Helpers.gs:276` | `timing.lastMs = now;` |
| TIME-0011 | `markRuntimeStep_` | `3_Core_Helpers.gs:279` | `function markRuntimeStep_(timing, label, details) {` |
| TIME-0012 | `markRuntimeStep_` | `3_Core_Helpers.gs:280` | `markFrameworkStep_(timing, label, details); // Alias routed to central timing logger` |
| TIME-0013 | `writeFrameworkTimingReport_` | `3_Core_Helpers.gs:283` | `function writeFrameworkTimingReport_(timing) {` |
| TIME-0014 | `writeFrameworkTimingReport_` | `3_Core_Helpers.gs:284` | `if (!timing \|\| !timing.steps \|\| timing.steps.length === 0) return;` |
| TIME-0015 | `writeFrameworkTimingReport_` | `3_Core_Helpers.gs:286` | `const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Framework Timing Report");` |
| TIME-0016 | `writeFrameworkTimingReport_` | `3_Core_Helpers.gs:290` | `const logs = timing.steps.map(row => padRowToWidth_(row, 8));` |
| TIME-0017 | `writeFrameworkTimingReport_` | `3_Core_Helpers.gs:294` | `refreshFrameworkTimingSummaries_(sheet);` |
| TIME-0018 | `writeFrameworkTimingReport_` | `3_Core_Helpers.gs:296` | `Logger.log("Timing telemetry write skipped: " + err.message);` |
| TIME-0019 | `writeRuntimeTimingReport_` | `3_Core_Helpers.gs:300` | `function writeRuntimeTimingReport_(timing) {` |
| TIME-0020 | `writeRuntimeTimingReport_` | `3_Core_Helpers.gs:301` | `writeFrameworkTimingReport_(timing);` |
| TIME-0021 | `ensureGoldenMasterTemplate_` | `5_System_Templates.gs:48` | `function ensureGoldenMasterTemplate_(dashboard, timing) {` |
| TIME-0022 | `ensureGoldenMasterTemplate_` | `5_System_Templates.gs:67` | `hideSheetIfNeeded_(baseSheet, timing, "Golden Master base template hidden");` |
| TIME-0023 | `ensureGoldenMasterTemplate_` | `5_System_Templates.gs:69` | `if (timing) markFrameworkStep_(timing, "Golden Master prepared with plain-text canvas");` |
| TIME-0024 | `createOrRefreshTemplateFromDashboard_` | `5_System_Templates.gs:156` | `function createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, timing) {` |
| TIME-0025 | `createOrRefreshTemplateFromDashboard_` | `5_System_Templates.gs:162` | `const base = ss.getSheetByName(RFF_BASE_TEMPLATE_NAME) \|\| ensureGoldenMasterTemplate_(dashboard, timing);` |
| TIME-0026 | `createOrRefreshTemplateFromDashboard_` | `5_System_Templates.gs:172` | `buildTemplateFromDashboard_(sheet, dashboard, sheetDef, headers, baselineRows, columns, behavior, timing, existed);` |
| TIME-0027 | `createOrRefreshTemplateFromDashboard_` | `5_System_Templates.gs:175` | `hideSheetIfNeeded_(sheet, timing, "Hide built template: " + sheetDef.templateName);` |
| TIME-0028 | `buildTemplateFromDashboard_` | `5_System_Templates.gs:179` | `function buildTemplateFromDashboard_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing, templateExisted) {` |
| TIME-0029 | `buildTemplateFromDashboard_` | `5_System_Templates.gs:180` | `markFrameworkStep_(timing, "Full template build required: " + sheetDef.templateName);` |
| TIME-0030 | `buildTemplateFromDashboard_` | `5_System_Templates.gs:183` | `clearTemplateForFullBuild_(sheet, sheetDef, timing, templateExisted);` |
| TIME-0031 | `buildTemplateFromDashboard_` | `5_System_Templates.gs:185` | `applyTemplateBaseFormatting_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing);` |
| TIME-0032 | `buildTemplateFromDashboard_` | `5_System_Templates.gs:187` | `applyTemplateFreezeAndTabColor_(sheet, dashboard, sheetDef, colCount, timing);` |
| TIME-0033 | `buildTemplateFromDashboard_` | `5_System_Templates.gs:189` | `markFrameworkStep_(timing, "Complete full template build: " + sheetDef.templateName);` |
| TIME-0034 | `clearTemplateForFullBuild_` | `5_System_Templates.gs:193` | `function clearTemplateForFullBuild_(sheet, sheetDef, timing, templateExisted) {` |
| TIME-0035 | `clearTemplateForFullBuild_` | `5_System_Templates.gs:208` | `markFrameworkStep_(timing, "Clear governed template range: " + sheetDef.templateName);` |
| TIME-0036 | `applyTemplateBaseFormatting_` | `5_System_Templates.gs:211` | `function applyTemplateBaseFormatting_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing) {` |
| TIME-0037 | `applyTemplateBaseFormatting_` | `5_System_Templates.gs:227` | `applyDataRows_(sheet, dashboard, sheetDef, headers, rowCount, colCount, behavior, timing);` |
| TIME-0038 | `applyTemplateBaseFormatting_` | `5_System_Templates.gs:234` | `ensureTemplateFilter_(sheet, globals.headerRow, rowCount, colCount, sheetDef, timing);` |
| TIME-0039 | `ensureTemplateFilter_` | `5_System_Templates.gs:238` | `function ensureTemplateFilter_(sheet, headerRow, rowCount, colCount, sheetDef, timing) {` |
| TIME-0040 | `ensureTemplateFilter_` | `5_System_Templates.gs:248` | `if (timing) markFrameworkStep_(timing, "Filter already correct: " + sheetDef.templateName);` |
| TIME-0041 | `ensureTemplateFilter_` | `5_System_Templates.gs:257` | `if (timing) markFrameworkStep_(timing, "Create filter: " + sheetDef.templateName);` |
| TIME-0042 | `applyTemplateFreezeAndTabColor_` | `5_System_Templates.gs:261` | `function applyTemplateFreezeAndTabColor_(sheet, dashboard, sheetDef, colCount, timing) {` |
| TIME-0043 | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:288` | `const buildResult = runFrameworkTimed_("Build All Templates And Validate", function(timing) {` |
| TIME-0044 | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:290` | `ensureGoldenMasterTemplate_(dashboard, timing);` |
| TIME-0045 | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:297` | `const template = createOrRefreshTemplateFromDashboard_(dashboard, sheetDef, timing);` |
| TIME-0046 | `buildAllTemplatesAndValidate` | `5_System_Templates.gs:306` | `setReportTemplateVisibility_(dashboard, true, timing);` |
| TIME-0047 | `setReportTemplateVisibility_` | `5_System_Templates.gs:322` | `function setReportTemplateVisibility_(dashboard, hidden, timing) {` |
| TIME-0048 | `setReportTemplateVisibility_` | `5_System_Templates.gs:330` | `if (hidden) hideSheetIfNeeded_(sheet, timing, "Hide template sheet: " + sheetDef.templateName);` |
| TIME-0049 | `setReportTemplateVisibility_` | `5_System_Templates.gs:331` | `else showSheetIfNeeded_(sheet, timing, "Show template sheet: " + sheetDef.templateName);` |
| TIME-0050 | `setReportTemplateVisibility_` | `5_System_Templates.gs:337` | `if (hidden) hideSheetIfNeeded_(sheet, timing, "Hide orphan template sheet: " + sheetName);` |
| TIME-0051 | `setReportTemplateVisibility_` | `5_System_Templates.gs:338` | `else showSheetIfNeeded_(sheet, timing, "Show orphan template sheet: " + sheetName);` |
| TIME-0052 | `createMasterListSheetFromTemplate_` | `5_System_Templates.gs:411` | `function createMasterListSheetFromTemplate_(ss, targetName, monthParts, timing, timingLabel) {` |
| TIME-0053 | `createMasterListSheetFromTemplate_` | `5_System_Templates.gs:413` | `SHEET_TYPE.MASTER_LIST, targetName, [], monthParts.firstDay, monthParts.lastDay, timing, timingLabel \|\| "Master List template copy"` |
| TIME-0054 | `buildRefinedDataFromScratch` | `7_Workflow_DemoP.gs:15` | `return runFrameworkTimed_("Build Demo P (Initialization) " + formatReportDateLabel_(monthParts.firstDay), function(timing) {` |
| TIME-0055 | `buildRefinedDataFromScratch` | `7_Workflow_DemoP.gs:16` | `const rawSheet = getValidatedRawDataSheetForDemoPBuild_(monthParts, timing);` |
| TIME-0056 | `buildRefinedDataFromScratch` | `7_Workflow_DemoP.gs:17` | `markFrameworkStep_(timing, "Locate validated Raw Data source: " + rawSheet.getName());` |
| TIME-0057 | `buildRefinedDataFromScratch` | `7_Workflow_DemoP.gs:19` | `const buildResult = createActiveDemoPFromRawData_(rawSheet, DEMO_P_PREFIX, monthParts, timing);` |
| TIME-0058 | `buildRefinedDataFromScratch` | `7_Workflow_DemoP.gs:26` | `markFrameworkStep_(timing, "Demo P flat-record contact compression complete \| Retained: " + flatCount);` |
| TIME-0059 | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:32` | `function getValidatedRawDataSheetForDemoPBuild_(monthParts, timing) {` |
| TIME-0060 | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:36` | `if (timing) markRuntimeStep_(timing, "Validated Raw Data sheet: " + currentRawSheet.getName());` |
| TIME-0061 | `getValidatedRawDataSheetForDemoPBuild_` | `7_Workflow_DemoP.gs:44` | `if (timing) markRuntimeStep_(timing, "Validated active sheet fallback: " + activeSheet.getName());` |
| TIME-0062 | `createActiveDemoPFromRawData_` | `7_Workflow_DemoP.gs:58` | `function createActiveDemoPFromRawData_(rawSheet, targetName, monthParts, timing) {` |
| TIME-0063 | `createActiveDemoPFromRawData_` | `7_Workflow_DemoP.gs:71` | `processRefinedDataUnified_(workingData, monthParts, rawSheet.getName(), "Created", timing);` |
| TIME-0064 | `createActiveDemoPFromRawData_` | `7_Workflow_DemoP.gs:75` | `SHEET_TYPE.DEMO_P, targetName, workingData.values, monthParts.firstDay, monthParts.lastDay, timing, "Refined Data unified template write"` |
| TIME-0065 | `createActiveDemoPFromRawData_` | `7_Workflow_DemoP.gs:81` | `applyOutputVisibilityPolicy_(demoSheet, dashboard, SHEET_TYPE.DEMO_P, timing);` |
| TIME-0066 | `processRefinedDataUnified_` | `7_Workflow_DemoP.gs:115` | `function processRefinedDataUnified_(workingData, monthParts, sourceSheetName, updateStatus, timing) {` |
| TIME-0067 | `processRefinedDataUnified_` | `7_Workflow_DemoP.gs:121` | `if (timing) markFrameworkStep_(timing, "Refined Data unified transform complete \| Rows: " + flattenedCount);` |
| TIME-0068 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:11` | `function createMasterListForMonth_(monthParts, parentTiming, preflight) {` |
| TIME-0069 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:14` | `const timing = parentTiming \|\| startFrameworkTiming_("Create Master List", monthParts);` |
| TIME-0070 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:16` | `if (parentTiming) markFrameworkStep_(timing, "Create Monthly Update - Create Master List - " + label, details \|\| "");` |
| TIME-0071 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:17` | `else markRuntimeStep_(timing, label, details);` |
| TIME-0072 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:29` | `if (!parentTiming) writeRuntimeTimingReport_(timing);` |
| TIME-0073 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:44` | `if (!parentTiming) writeRuntimeTimingReport_(timing);` |
| TIME-0074 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:53` | `masterSheet = createMasterListSheetFromTemplate_(ss, masterBuildName, monthParts, timing, parentTiming ? "Create Monthly Update - Create Master List - Canvas detail" : "Create Master List canvas detail");` |
| TIME-0075 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:56` | `hideSheetIfNeeded_(masterSheet, timing, "Master List staged build hidden until validation: " + masterBuildName);` |
| TIME-0076 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:89` | `masterSheet = promoteStagedMasterListSheet_(ss, masterSheet, existingMasterSheet, masterName, copiedRowCount, timing, markStep);` |
| TIME-0077 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:97` | `hideReportTemplates(null, timing);` |
| TIME-0078 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:99` | `if (!parentTiming) {` |
| TIME-0079 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:100` | `writeRuntimeTimingReport_(timing);` |
| TIME-0080 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:101` | `notify_(`Master List created. Copied ${copiedRowCount} Primary PMR row(s) from processed Refined Data.\n\nRuntime: ${formatSeconds_((new Date().getTime() - timing.startMs) / 1000)}`);` |
| TIME-0081 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:107` | `cleanupFailedStagedMasterListSheet_(ss, masterSheet, failedMasterName, timing, markStep);` |
| TIME-0082 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:111` | `if (parentTiming) markFrameworkStep_(timing, "ERROR - Create Master List - " + err.message, err.stack \|\| "");` |
| TIME-0083 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:113` | `markRuntimeStep_(timing, "ERROR - " + err.message);` |
| TIME-0084 | `createMasterListForMonth_` | `8_Workflow_MasterList.gs:114` | `try { writeRuntimeTimingReport_(timing); } catch (reportErr) {}` |
| TIME-0085 | `promoteStagedMasterListSheet_` | `8_Workflow_MasterList.gs:437` | `function promoteStagedMasterListSheet_(ss, stagedSheet, existingSheet, masterName, copiedRowCount, timing, markStep) {` |
| TIME-0086 | `promoteStagedMasterListSheet_` | `8_Workflow_MasterList.gs:444` | `showSheetIfNeeded_(stagedSheet, timing, "Master List staged swap promoted: " + masterName);` |
| TIME-0087 | `cleanupFailedStagedMasterListSheet_` | `8_Workflow_MasterList.gs:452` | `function cleanupFailedStagedMasterListSheet_(ss, sheet, masterName, timing, markStep) {` |
| TIME-0088 | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:11` | `function buildMonthlyChangeReportForMonth_(monthParts, timing, options) {` |
| TIME-0089 | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:22` | `markRuntimeStep_(timing, "Monthly Change source sheets located \| Current: " + currentDemo.getName() + "; Previous: " + previousDemo.getName());` |
| TIME-0090 | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:46` | `showSheetIfNeeded_(reportSheet, timing, "Monthly Change report sheet shown");` |
| TIME-0091 | `buildMonthlyChangeReportForMonth_` | `9_Workflow_MonthlyChange.gs:54` | `markRuntimeStep_(timing, "Monthly Change index refresh deferred");` |
| TIME-0092 | `buildMonthlyChangeReport` | `9_Workflow_MonthlyChange.gs:69` | `return runFrameworkTimed_("Build Monthly Change Report " + formatReportDateLabel_(monthParts.firstDay), function(timing) {` |
| TIME-0093 | `buildMonthlyChangeReport` | `9_Workflow_MonthlyChange.gs:70` | `return buildMonthlyChangeReportForMonth_(monthParts, timing, null);` |
| TIME-0094 | `createDisenrolledList` | `_10_Workflow_Disenrolled.gs:15` | `return runFrameworkTimed_("Create / Update Disenrolled List " + formatReportDateLabel_(monthParts.firstDay), function(timing) {` |
| TIME-0095 | `createDisenrolledList` | `_10_Workflow_Disenrolled.gs:16` | `return createDisenrolledListForMonth_(monthParts, timing, {` |
| TIME-0096 | `createDisenrolledList` | `_10_Workflow_Disenrolled.gs:17` | `timingPrefix: "Create / Update Disenrolled - ",` |
| TIME-0097 | `createDisenrolledListForMonth_` | `_10_Workflow_Disenrolled.gs:25` | `function createDisenrolledListForMonth_(monthParts, timing, options) {` |
| TIME-0098 | `createDisenrolledListForMonth_` | `_10_Workflow_Disenrolled.gs:28` | `const prefix = String(options.timingPrefix \|\| "");` |
| TIME-0099 | `createDisenrolledListForMonth_` | `_10_Workflow_Disenrolled.gs:30` | `if (timing) markFrameworkStep_(timing, prefix + label, details \|\| "");` |
| TIME-0100 | `createDisenrolledListForMonth_` | `_10_Workflow_Disenrolled.gs:39` | `const exclusionSheet = getOrCreateDisenrolledExclusionSheet_(ss, timing, prefix);` |
| TIME-0101 | `createDisenrolledListForMonth_` | `_10_Workflow_Disenrolled.gs:42` | `const result = syncDisenrolledExclusionFromRawData_(exclusionSheet, rawSheet, monthParts, timing, prefix);` |
| TIME-0102 | `syncDisenrolledExclusionFromRawData_` | `_10_Workflow_Disenrolled.gs:65` | `function syncDisenrolledExclusionFromRawData_(exclusionSheet, rawSheet, monthParts, timing, timingPrefix) {` |
| TIME-0103 | `syncDisenrolledExclusionFromRawData_` | `_10_Workflow_Disenrolled.gs:66` | `const prefix = String(timingPrefix \|\| "");` |
| TIME-0104 | `syncDisenrolledExclusionFromRawData_` | `_10_Workflow_Disenrolled.gs:68` | `if (timing) markFrameworkStep_(timing, prefix + label, details \|\| "");` |
| TIME-0105 | `getOrCreateDisenrolledExclusionSheet_` | `_10_Workflow_Disenrolled.gs:224` | `function getOrCreateDisenrolledExclusionSheet_(ss, timing, timingPrefix) {` |
| TIME-0106 | `getOrCreateDisenrolledExclusionSheet_` | `_10_Workflow_Disenrolled.gs:257` | `showSheetIfNeeded_(sheet, timing, (timingPrefix \|\| "") + "Disenrolled Exclusion sheet shown");` |

### Destructive-operation register

All `deleteSheet`, clearing, archive, and external-workbook source occurrences are classified in the effect matrix. Destructive outcomes are data-dependent; partial completion is possible where writes precede later exceptions. Transactional rollback is not provided by Apps Script and is therefore a WARNING.

### Partial-completion register

| Condition | Classification | Recovery |
|---|---|---|
| Service exception after an earlier write | WARNING | Local `catch` where present; otherwise caller/runtime receives exception; no general rollback |
| Best-effort logging/notification exception | WARNING | Caught paths continue where source provides catches |
| User cancellation or failed validation | PASS/WARNING | Early return prevents later work; exact workbook state depends on prior operations |

## Reconciliation

- Effect occurrences: **301**
- Validation-related occurrences: **44**
- Timing-related occurrences: **106**
- Branch source rows: **560**
