// ============================================================================
// 8_WORKFLOW_MASTERLIST.GS
// Master List Roster Engine: Active Roster Filtering, Care Plan Sync,
// Unlocked Care Plan Integration, & Sheet Formatting
// ============================================================================

/**
 * Menu Callback: Create / Update Master List
 * Synthesizes active Refined Data participants with CP Due and Unlocked CP sheets.
 */
function createMasterList() {
  runWithWorkflowBusyFlag_("Create Master List", () => {
    logFrameworkTiming_("MASTER_LIST_BUILD", "Start Master List Build", "INFO", "Initializing Master List creation");
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const monthParts = getMonthDateParts_(new Date());
    const demoSheet = ss.getSheetByName("Refined Data") || getLatestSheetByPrefix_("Refined Data");

    if (!demoSheet) {
      const msg = "Cannot build Master List: Refined Data (Demo P) sheet not found. Build Refined Data first.";
      ss.toast(msg, "Error", 5);
      logFrameworkTiming_("MASTER_LIST_BUILD", "Refined Data Missing", "ERROR", msg);
      flushFrameworkTimingReport_();
      return;
    }

    const dashboard = loadDashboardConfig_();
    const cpDueSheet = getCurrentCarePlanDueSheet_(monthParts);
    const unlockCpSheet = getCurrentUnlockedCarePlanSheet_(monthParts);

    // Process and filter active roster
    const masterRows = processMasterListRows_(demoSheet, cpDueSheet, unlockCpSheet, dashboard);

    if (!masterRows || masterRows.length === 0) {
      ss.toast("Zero active participants qualified for the Master List.", "Master List Engine", 5);
      logFrameworkTiming_("MASTER_LIST_BUILD", "Zero Active Records", "WARN", "No active records after filtering disenrollments");
      flushFrameworkTimingReport_();
      return;
    }

    // Determine target sheet name
    const targetName = `Master List ${monthParts.mm}.${monthParts.yy}`;
    let targetSheet = ss.getSheetByName(targetName);

    if (!targetSheet) {
      const template = ss.getSheetByName("Template - Master List") || ss.getSheetByName("RFF_BASE_TEMPLATE");
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
    const targetHeaders = getHeadersForSheetType_(dashboard, SHEET_TYPE.MASTER_LIST);
    const timestampStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss");

    const fullMatrix = [
      [`Master List - ${monthParts.label}`, "- v1.8.9.8.4 -", "", ""],
      ["Date Created", timestampStr, "", ""],
      ["", "", "", ""],
      targetHeaders
    ];

    masterRows.forEach(rowObj => {
      const rowArr = targetHeaders.map(h => rowObj[h] !== undefined ? rowObj[h] : "");
      fullMatrix.push(rowArr);
    });

    // Write data matrix & paint structural theme
    applySystemStructure_(targetSheet, targetHeaders.length, fullMatrix, "Master List", timestampStr);

    targetSheet.setFrozenRows(HEADER_ROW);
    targetSheet.setFrozenColumns(2);

    logFrameworkTiming_("MASTER_LIST_BUILD", "Complete Master List Build", "INFO", `Successfully generated ${targetName} with ${masterRows.length} active profiles`);
    flushFrameworkTimingReport_();

    ss.toast(`Master List (${targetName}) created with ${masterRows.length} active participants!`, "Complete", 5);
  });
}

// ============================================================================
// MASTER LIST SYNTHESIS & SYNC ENGINE
// ============================================================================

/**
 * Builds active Master List profile objects from Demo P and sync sources.
 */
function processMasterListRows_(demoSheet, cpDueSheet, unlockCpSheet, dashboard) {
  logFrameworkTiming_("MASTER_LIST_SYNC", "Start Roster Processing", "INFO", "Reading Refined Data records");

  const demoData = getDataValues_(demoSheet, HEADER_ROW, DATA_START_ROW);
  if (!demoData.values.length) return [];

  const statusIdx = demoData.headerMap["Enrollment Status"];
  const nameIdx = demoData.headerMap["Participant Name"];

  // 1. Build Care Plan Due Date Lookup Map
  const cpDueMap = cpDueSheet
    ? buildSourceMapByCompositeKeyForDemoPBanner_(cpDueSheet, HEADER_ROW, DATA_START_ROW, ["Participant Name"])
    : new Map();

  // 2. Build Unlocked Care Plan Lookup Map
  const unlockMap = unlockCpSheet
    ? buildSourceMapByCompositeKeyForDemoPBanner_(unlockCpSheet, HEADER_ROW, DATA_START_ROW, ["Participant Name"])
    : new Map();

  const activeMasterRows = [];

  demoData.values.forEach(row => {
    // Active Roster Filter: Skip Disenrolled and Deceased participants
    if (statusIdx !== undefined) {
      const status = String(row[statusIdx] || "").trim().toLowerCase();
      if (status.includes("disenrolled") || status.includes("deceased")) {
        return;
      }
    }

    const rowObj = {};
    demoData.headers.forEach((h, idx) => {
      rowObj[h] = row[idx];
    });

    const pNameKey = nameIdx !== undefined ? normalizeKeyPart_(row[nameIdx]) : "";

    // Sync CP Due Date Fields (Last Care Plan, Next Care Plan Due, CP Type)
    if (pNameKey && cpDueMap.has(pNameKey)) {
      const cpMatch = cpDueMap.get(pNameKey);
      CARE_PLAN_DUE_SYNC_FIELDS.forEach(field => {
        if (cpMatch[field] !== undefined && cpMatch[field] !== "") {
          rowObj[field] = cpMatch[field];
        }
      });
    }

    // Sync Unlocked Care Plan Fields (IDT Meeting Date, Care Plan Start Date)
    if (pNameKey && unlockMap.has(pNameKey)) {
      const unlockMatch = unlockMap.get(pNameKey);
      UNLOCKED_SYNC_FIELDS.forEach(field => {
        if (unlockMatch[field] !== undefined && unlockMatch[field] !== "") {
          rowObj[field] = unlockMatch[field];
        }
      });
    }

    activeMasterRows.push(rowObj);
  });

  logFrameworkTiming_("MASTER_LIST_SYNC", "Roster Synced", "INFO", `Filtered ${demoData.values.length} records down to ${activeMasterRows.length} active profiles`);

  // Sort Master List Alphabetically by Participant Name
  activeMasterRows.sort((a, b) => {
    const nameA = String(a["Participant Name"] || a["Last Name"] || "").toLowerCase();
    const nameB = String(b["Participant Name"] || b["Last Name"] || "").toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return activeMasterRows;
}
