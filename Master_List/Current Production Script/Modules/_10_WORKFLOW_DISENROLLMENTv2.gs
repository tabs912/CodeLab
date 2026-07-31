// ============================================================================
// _10_WORKFLOW_DISENROLLMENT.GS
// Disenrolled Exclusion Roster Engine: Historical Disenrollment Auditing,
// Top-Down Row Injections, & 12-Month Visibility Sweep
// ============================================================================

/**
 * Menu Callback: Create / Update Disenrolled List
 * Audits active Refined Data / Monthly Change records for disenrolled/deceased
 * participants and injects them into the Disenrolled Exclusion workspace.
 */
function createDisenrolledList() {
  runWithWorkflowBusyFlag_("Create / Update Disenrolled List", () => {
    logFrameworkTiming_("DISENROLLED_BUILD", "Start Disenrolled Audit", "INFO", "Initializing Disenrolled Exclusion workflow");
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const monthParts = getMonthDateParts_(new Date());
    const demoSheet = ss.getSheetByName("Refined Data") || getLatestSheetByPrefix_("Refined Data");

    if (!demoSheet) {
      const msg = "Cannot update Disenrolled Exclusion: Refined Data (Demo P) sheet not found.";
      ss.toast(msg, "Error", 5);
      logFrameworkTiming_("DISENROLLED_BUILD", "Refined Data Missing", "ERROR", msg);
      flushFrameworkTimingReport_();
      return;
    }

    const dashboard = loadDashboardConfig_();
    let disSheet = ss.getSheetByName("Disenrolled Exclusion");

    if (!disSheet) {
      const template = ss.getSheetByName("Template - Disenrolled Exclusion") || ss.getSheetByName("RFF_BASE_TEMPLATE");
      if (template) {
        disSheet = template.copyTo(ss);
        disSheet.setName("Disenrolled Exclusion");
      } else {
        disSheet = ss.insertSheet("Disenrolled Exclusion");
      }
    }

    disSheet.showSheet();

    // Process disenrollment candidates
    const disRows = processDisenrolledExclusionRows_(demoSheet, disSheet, dashboard);

    const targetHeaders = getHeadersForSheetType_(dashboard, SHEET_TYPE.DISENROLLED_EXCLUSION);
    const timestampStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss");

    // Write full matrix if fresh sheet, or insert top-down at Row 5
    if (disSheet.getLastRow() < DATA_START_ROW) {
      const fullMatrix = [
        ["Disenrolled Exclusion", "- v1.8.9.8.4 -", "", ""],
        ["Date Created", timestampStr, "", ""],
        ["", "", "", ""],
        targetHeaders
      ];

      disRows.forEach(rowObj => {
        const rowArr = targetHeaders.map(h => rowObj[h] !== undefined ? rowObj[h] : "");
        fullMatrix.push(rowArr);
      });

      applySystemStructure_(disSheet, targetHeaders.length, fullMatrix, "Disenrolled Exclusion", timestampStr);
    } else if (disRows.length > 0) {
      // Top-Down Injection (Newest Records Injected at Row 5)
      disSheet.insertRowsBefore(DATA_START_ROW, disRows.length);
      const injectMatrix = disRows.map(rowObj => targetHeaders.map(h => rowObj[h] !== undefined ? rowObj[h] : ""));
      disSheet.getRange(DATA_START_ROW, 1, injectMatrix.length, targetHeaders.length).setValues(injectMatrix);
      
      // Re-apply structure and row heights to maintain system theme
      applySystemStructure_(disSheet, targetHeaders.length, [], "Disenrolled Exclusion", timestampStr);
    }

    disSheet.setFrozenRows(HEADER_ROW);
    disSheet.setFrozenColumns(2);

    // Run 12-Month (365 Days) Visibility Sweep
    const sweptHiddenCount = applyDisenrolled12MonthVisibilitySweep_(disSheet, targetHeaders);

    logFrameworkTiming_("DISENROLLED_BUILD", "Complete Disenrolled Audit", "INFO", `Processed ${disRows.length} new records; ${sweptHiddenCount} older records hidden`);
    flushFrameworkTimingReport_();

    ss.toast(`Disenrolled Exclusion updated: ${disRows.length} injected, ${sweptHiddenCount} stale records hidden.`, "Complete", 5);
  });
}

// ============================================================================
// CORE AUDIT & VISIBILITY ENGINE
// ============================================================================

/**
 * Identifies disenrolled or deceased participant records in Demo P and builds disenrollment profile objects.
 */
function processDisenrolledExclusionRows_(demoSheet, existingDisSheet, dashboard) {
  logFrameworkTiming_("DISENROLLED_AUDIT", "Start Candidate Audit", "INFO", "Reading Refined Data values");

  const demoData = getDataValues_(demoSheet, HEADER_ROW, DATA_START_ROW);
  if (!demoData.values.length) return [];

  const statusIdx = demoData.headerMap["Enrollment Status"];
  const pmrIdx = getPMRIndex_(demoData.headerMap);

  if (statusIdx === undefined || pmrIdx === -1) {
    logFrameworkTiming_("DISENROLLED_AUDIT", "Schema Missing", "WARN", "Enrollment Status or PMR header not found");
    return [];
  }

  // Map existing PMRs already present on the Disenrolled Exclusion sheet
  const existingData = getDataValues_(existingDisSheet, HEADER_ROW, DATA_START_ROW);
  const existingPmrSet = new Set();

  if (existingData.values.length) {
    const exPmrIdx = getPMRIndex_(existingData.headerMap);
    if (exPmrIdx !== -1) {
      existingData.values.forEach(r => {
        const pmr = normalizePMR_(r[exPmrIdx]);
        if (pmr) existingPmrSet.add(pmr);
      });
    }
  }

  const disenrollmentCandidates = [];
  const todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy");

  demoData.values.forEach(row => {
    const status = String(row[statusIdx] || "").trim().toLowerCase();
    const pmr = normalizePMR_(row[pmrIdx]);

    if (!pmr) return;

    // Filter to Disenrolled or Deceased status
    if (status.includes("disenrolled") || status.includes("deceased")) {
      if (!existingPmrSet.has(pmr)) {
        const rowObj = {};
        demoData.headers.forEach((h, idx) => {
          rowObj[h] = row[idx];
        });

        // Stamp system audit metadata
        rowObj["Added to Disenrolled Exclusion"] = todayStr;
        rowObj["PMR #"] = pmr;

        disenrollmentCandidates.push(rowObj);
        existingPmrSet.add(pmr);
      }
    }
  });

  logFrameworkTiming_("DISENROLLED_AUDIT", "Candidates Identified", "INFO", `Identified ${disenrollmentCandidates.length} new disenrollments`);
  return disenrollmentCandidates;
}

/**
 * Hides records where effective disenrollment / death date is older than 365 days.
 */
function applyDisenrolled12MonthVisibilitySweep_(disSheet, headers) {
  const data = getDataValues_(disSheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) return 0;

  const headerMap = data.headerMap;
  const effIdx = headerMap["Disenrollment Effective Date"];
  const disIdx = headerMap["Disenrollment Date"];
  const dodIdx = headerMap["Date of Death"];

  const today = new Date();
  const cutoff = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  cutoff.setDate(cutoff.getDate() - 365);

  let hiddenCount = 0;

  data.values.forEach((row, idx) => {
    const sheetRow = DATA_START_ROW + idx;

    const dates = [
      effIdx !== undefined ? row[effIdx] : null,
      disIdx !== undefined ? row[disIdx] : null,
      dodIdx !== undefined ? row[dodIdx] : null
    ]
      .map(d => normalizeToDateObject_(d))
      .filter(d => d && !isNaN(d.getTime()))
      .sort((a, b) => b.getTime() - a.getTime());

    const effectiveDate = dates[0];

    if (effectiveDate && effectiveDate.getTime() < cutoff.getTime()) {
      if (!disSheet.isRowHiddenByUser(sheetRow)) {
        disSheet.hideRows(sheetRow);
        hiddenCount++;
      }
    } else {
      if (disSheet.isRowHiddenByUser(sheetRow)) {
        disSheet.showRows(sheetRow);
      }
    }
  });

  logFrameworkTiming_("DISENROLLED_SWEEP", "Visibility Sweep Complete", "INFO", `Automated 365-day sweep hidden ${hiddenCount} stale records`);
  return hiddenCount;
}
