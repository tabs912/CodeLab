// ============================================================================
// 9_WORKFLOW_MONTHLYCHANGE.GS
// Monthly Change Report Compiler: Month-over-Month Delta Processing,
// Participant Attribute Tracking, & Structural Formatting
// ============================================================================

/**
 * Menu Callback: Monthly Change Report
 * Compares active participant records and logs month-over-month modifications.
 */
function buildMonthlyChangeReport() {
  runWithWorkflowBusyFlag_("Build Monthly Change Report", () => {
    logFrameworkTiming_("MONTHLY_CHANGE_BUILD", "Start Change Report Build", "INFO", "Initializing Monthly Change processing");
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const monthParts = getMonthDateParts_(new Date());
    const currentRefined = ss.getSheetByName("Refined Data") || getLatestSheetByPrefix_("Refined Data");

    if (!currentRefined) {
      const msg = "Cannot build Monthly Change Report: Active Refined Data (Demo P) sheet not found.";
      ss.toast(msg, "Error", 5);
      logFrameworkTiming_("MONTHLY_CHANGE_BUILD", "Refined Data Missing", "ERROR", msg);
      flushFrameworkTimingReport_();
      return;
    }

    const dashboard = loadDashboardConfig_();
    const changeRows = processMonthlyChangeRows_(currentRefined, dashboard);

    const targetName = `Monthly Change ${monthParts.mm}.${monthParts.yy}`;
    let targetSheet = ss.getSheetByName(targetName);

    if (!targetSheet) {
      const template = ss.getSheetByName("Template - Monthly Change") || ss.getSheetByName("RFF_BASE_TEMPLATE");
      if (template) {
        targetSheet = template.copyTo(ss);
        targetSheet.setName(targetName);
      } else {
        targetSheet = ss.insertSheet(targetName);
      }
    } else {
      targetSheet.clear();
    }

    targetSheet.showSheet();

    // Headers & Output Matrix Assembly
    const targetHeaders = getHeadersForSheetType_(dashboard, SHEET_TYPE.MONTHLY_CHANGE);
    const timestampStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss");

    const fullMatrix = [
      [`Monthly Change Report - ${monthParts.label}`, "- v1.8.9.8.4 -", "", ""],
      ["Date Created", timestampStr, "", ""],
      ["", "", "", ""],
      targetHeaders
    ];

    (changeRows || []).forEach(rowObj => {
      const rowArr = targetHeaders.map(h => rowObj[h] !== undefined ? rowObj[h] : "");
      fullMatrix.push(rowArr);
    });

    // Write matrix & paint structural theme
    applySystemStructure_(targetSheet, targetHeaders.length, fullMatrix, "Monthly Change", timestampStr);

    targetSheet.setFrozenRows(HEADER_ROW);
    targetSheet.setFrozenColumns(2);

    logFrameworkTiming_("MONTHLY_CHANGE_BUILD", "Complete Change Report", "INFO", `Generated ${targetName} with ${changeRows.length} recorded changes`);
    flushFrameworkTimingReport_();

    ss.toast(`Monthly Change Report (${targetName}) created with ${changeRows.length} detected changes!`, "Complete", 5);
  });
}

// ============================================================================
// CORE DELTA PROCESSING ENGINE
// ============================================================================

/**
 * Delta comparison engine: Identifies modified attributes across active records.
 */
function processMonthlyChangeRows_(refinedSheet, dashboard) {
  logFrameworkTiming_("MONTHLY_CHANGE_COMPARE", "Start Delta Processing", "INFO", "Reading Refined Data values");

  const refinedData = getDataValues_(refinedSheet, HEADER_ROW, DATA_START_ROW);
  if (!refinedData.values.length) return [];

  const pmrIdx = getPMRIndex_(refinedData.headerMap);
  const changesIdx = refinedData.headerMap["Columns With Change"];

  const changeRecords = [];

  refinedData.values.forEach(row => {
    const pmr = pmrIdx !== -1 ? normalizePMR_(row[pmrIdx]) : "";
    if (!pmr) return;

    const rowObj = {};
    refinedData.headers.forEach((h, idx) => {
      rowObj[h] = row[idx];
    });

    // Extract documented changes column or capture active audit records
    const changeText = changesIdx !== undefined ? String(row[changesIdx] || "").trim() : "";
    
    if (changeText || changesIdx === undefined) {
      changeRecords.push(rowObj);
    }
  });

  logFrameworkTiming_("MONTHLY_CHANGE_COMPARE", "Delta Processing Complete", "INFO", `Identified ${changeRecords.length} records with changes`);

  // Sort records alphabetically
  changeRecords.sort((a, b) => {
    const nameA = `${String(a["Last Name"] || "").toLowerCase()} ${String(a["First Name"] || "").toLowerCase()}`;
    const nameB = `${String(b["Last Name"] || "").toLowerCase()} ${String(b["First Name"] || "").toLowerCase()}`;
    return nameA.localeCompare(nameB);
  });

  return changeRecords;
}
