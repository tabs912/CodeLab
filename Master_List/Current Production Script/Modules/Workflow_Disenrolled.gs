// ============================================================================
// WORKFLOW_DISENROLLED.GS
// Disenrolled Exclusion Processing, Historical Audit & Reactivation Engine
// ============================================================================

// --- MAIN WORKFLOW ENTRY POINTS --------------------------------------------

/**
 * Menu Callback / Workflow Orchestrator: Creates or updates the Disenrolled Exclusion list.
 */
function createDisenrolledList() {
  const monthParts = promptForLockedYearReportMonth_("Create / Update Disenrolled List");
  if (!monthParts) return null;

  return runFrameworkTimed_("Create / Update Disenrolled List " + formatReportDateLabel_(monthParts.firstDay), function(timing) {
    return createDisenrolledListForMonth_(monthParts, timing, {
      timingPrefix: "Create / Update Disenrolled - ",
      refreshIndex: true,
      notify: true,
      workflowName: "Create / Update Disenrolled List"
    });
  });
}

function createDisenrolledListForMonth_(monthParts, timing, options) {
  if (!monthParts) return { rowsCopied: 0, rowsRemoved: 0 };
  options = options || {};
  const prefix = String(options.timingPrefix || "");
  const markStep = function(label, details) {
    if (timing) markFrameworkStep_(timing, prefix + label, details || "");
  };

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rawSheet = getCurrentRawDataSheet_(monthParts);
  if (!rawSheet) throw new Error("Raw Data sheet was not found for the selected month. Format Raw Data first.");

  markStep("Locate Raw Data source sheet: " + rawSheet.getName());

  const exclusionSheet = getOrCreateDisenrolledExclusionSheet_(ss, timing, prefix);
  markStep("Disenrolled Exclusion sheet ready: " + exclusionSheet.getName());

  const result = syncDisenrolledExclusionFromRawData_(exclusionSheet, rawSheet, monthParts, timing, prefix);
  markStep("Disenrolled Exclusion sync complete | Rows copied: " + result.rowsCopied + "; rows purged: " + result.rowsRemoved);

  const hiddenOldCount = hideOldDisenrolledRows_(exclusionSheet);
  if (hiddenOldCount > 0) {
    markStep("Historical cutoff sweep hidden stale disenrolled rows | Rows hidden: " + hiddenOldCount);
  }

  lockFinalOutputRowHeights_(exclusionSheet, DISENROLLED_EXCLUSION_SHEET);
  
  if (options.refreshIndex !== false) {
    refreshIndexAfterSheetWorkflow_("Create Disenrolled List");
  }

  if (options.notify !== false) {
    notify_(`Disenrolled Exclusion list updated.\n\nNew records added: ${result.rowsCopied}\nRe-enrolled records purged: ${result.rowsRemoved}`);
  }

  return result;
}

// --- CORE DISENROLLMENT SYNC & EXTRACTION ENGINE ---------------------------

function syncDisenrolledExclusionFromRawData_(exclusionSheet, rawSheet, monthParts, timing, timingPrefix) {
  const prefix = String(timingPrefix || "");
  const markStep = function(label, details) {
    if (timing) markFrameworkStep_(timing, prefix + label, details || "");
  };

  const dashboard = loadDashboardConfig_();
  const exclusionHeaders = getHeadersForSheetType_(dashboard, SHEET_TYPE.DISENROLLED_EXCLUSION);
  const exclusionHeaderMap = buildHeaderIndexMap_(exclusionHeaders);
  
  const rawData = getDataValues_(rawSheet, HEADER_ROW, DATA_START_ROW);
  const rawPmrIdx = getPMRIndex_(rawData.headerMap);
  if (rawPmrIdx === -1) throw new Error("Raw Data is missing Participant PMR# column.");

  const statusIdx = rawData.headerMap["Enrollment Status"];
  const disenrollEffectiveIdx = findHeaderIndex_(rawData.headerMap, ["Disenrollment Effective Date", "Disenrollment Date", "Date of Death"]);
  
  if (statusIdx === undefined && disenrollEffectiveIdx === -1) {
    throw new Error("Raw Data requires Enrollment Status or Disenrollment Effective Date columns to identify disenrolled participants.");
  }

  // 1. Identify Disenrolled Participants in Raw Data
  const disenrolledRows = [];
  const rawDisenrolledPMRs = new Set();

  rawData.values.forEach(row => {
    const pmr = normalizePMR_(row[rawPmrIdx]);
    if (!pmr) return;

    const statusText = statusIdx !== undefined ? String(row[statusIdx] || "").trim().toLowerCase() : "";
    const effectiveDate = disenrollEffectiveIdx !== -1 ? row[disenrollEffectiveIdx] : null;
    const isDisenrolledStatus = statusText === "disenrolled";
    const hasDisenrollmentDate = normalizeCompareValue_(effectiveDate) !== "";

    if (isDisenrolledStatus || hasDisenrollmentDate) {
      disenrolledRows.push(row);
      rawDisenrolledPMRs.add(pmr);
    }
  });

  markStep("Extracted disenrolled rows from Raw Data | Disenrolled PMRs found: " + rawDisenrolledPMRs.size);

  // 2. Read Existing Exclusion Sheet Data for Deduplication & Re-Enrollment Sweeps
  const existingExclusionData = getDataValues_(exclusionSheet, HEADER_ROW, DATA_START_ROW);
  const existingPmrIdx = existingExclusionData.headerMap ? getPMRIndex_(existingExclusionData.headerMap) : -1;
  const existingPMSet = new Set();

  if (existingPmrIdx !== -1 && existingExclusionData.values.length) {
    existingExclusionData.values.forEach(row => {
      const pmr = normalizePMR_(row[existingPmrIdx]);
      if (pmr) existingPMSet.add(pmr);
    });
  }

  // 3. Filter Out Already Existing Records
  const newDisenrolledRows = disenrolledRows.filter(row => {
    const pmr = normalizePMR_(row[rawPmrIdx]);
    return pmr && !existingPMSet.has(pmr);
  });

  // 4. Map New Rows to Governed Exclusion Headers
  const mappedNewRows = mapRowsToHeaders_(newDisenrolledRows, rawData.headers, exclusionHeaders);
  const auditDateIdx = exclusionHeaderMap[DISENROLLED_EXCLUSION_ADDED_HEADER];
  const auditDate = monthParts && monthParts.firstDay ? monthParts.firstDay : new Date();

  mappedNewRows.forEach(row => {
    if (auditDateIdx !== undefined && normalizeCompareValue_(row[auditDateIdx]) === "") {
      row[auditDateIdx] = auditDate;
    }
  });

  // 5. Append New Rows to Exclusion Sheet
  let rowsCopied = 0;
  if (mappedNewRows.length > 0) {
    const startRow = Math.max(exclusionSheet.getLastRow() + 1, DATA_START_ROW);
    ensureOutputSheetHasFormattedRows_(exclusionSheet, startRow + mappedNewRows.length - 1, exclusionHeaders.length);
    exclusionSheet.getRange(startRow, 1, mappedNewRows.length, exclusionHeaders.length).setValues(mappedNewRows);
    rowsCopied = mappedNewRows.length;
    markStep("Appended new disenrolled records to Exclusion sheet | Rows written: " + rowsCopied);
  } else {
    markStep("No new disenrolled records to append");
  }

  // 6. Run Reactivation Sweep (Purge records if participant became Active again)
  const demoSheet = getCurrentDemoPSheet_(monthParts);
  let rowsRemoved = 0;
  if (demoSheet) {
    rowsRemoved = removeActiveDemoPPMRsFromDisenrolledExclusion_(demoSheet);
    markStep("Active participant reactivation sweep complete | Purged from Exclusion: " + rowsRemoved);
  }

  clearSheetRuntimeCachesForSheet_(exclusionSheet);
  return { rowsCopied: rowsCopied, rowsRemoved: rowsRemoved };
}

// --- REACTIVATION & HISTORICAL SWEEPS --------------------------------------

/**
 * Hides historical disenrolled rows older than 365 days to keep active views clean.
 */
function hideOldDisenrolledRows_(sheet) {
  if (!sheet) return 0;
  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) return 0;

  const dateHeaders = ["Disenrollment Effective Date", "Disenrollment Date", "Date of Death"];
  const dateIndexes = dateHeaders.map(header => data.headerMap[header]).filter(idx => idx !== undefined);
  if (!dateIndexes.length) return 0;

  try { sheet.showRows(DATA_START_ROW, data.values.length); } catch (err) {}

  const cutoff = createLocalDateOnly_(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  cutoff.setDate(cutoff.getDate() - 365);
  const rowsToHide = [];

  data.values.forEach((row, index) => {
    const matchedDate = dateIndexes
      .map(dateIdx => normalizeToDateObject_(row[dateIdx]))
      .filter(date => date && !isNaN(date.getTime()))
      .sort((a, b) => b.getTime() - a.getTime())[0];

    if (matchedDate && matchedDate.getTime() < cutoff.getTime()) {
      rowsToHide.push(DATA_START_ROW + index);
    }
  });

  if (rowsToHide.length > 0) {
    hideRowNumberBatches_(sheet, rowsToHide);
  }
  return rowsToHide.length;
}

function hideRowNumberBatches_(sheet, rowNumbers) {
  if (!sheet || !rowNumbers || rowNumbers.length === 0) return 0;
  const uniqueRows = Array.from(new Set(rowNumbers))
    .map(Number)
    .filter(row => !isNaN(row) && row >= DATA_START_ROW)
    .sort((a, b) => a - b);

  if (!uniqueRows.length) return 0;

  let startRow = uniqueRows[0];
  let runLength = 1;

  for (let i = 1; i < uniqueRows.length; i++) {
    if (uniqueRows[i] === startRow + runLength) {
      runLength++;
    } else {
      sheet.hideRows(startRow, runLength);
      startRow = uniqueRows[i];
      runLength = 1;
    }
  }
  sheet.hideRows(startRow, runLength);
  return uniqueRows.length;
}

// --- EXCLUSION SHEET CREATION & TEMPLATE STAMPING --------------------------

function getOrCreateDisenrolledExclusionSheet_(ss, timing, timingPrefix) {
  let sheet = ss.getSheetByName(DISENROLLED_EXCLUSION_SHEET);
  const dashboard = loadDashboardConfig_();
  const sheetDef = getSheetDefinitionByType_(dashboard, SHEET_TYPE.DISENROLLED_EXCLUSION);
  const headers = getHeadersForSheetType_(dashboard, SHEET_TYPE.DISENROLLED_EXCLUSION);

  if (!sheet) {
    const template = ss.getSheetByName(sheetDef.templateName);
    if (template) {
      sheet = template.copyTo(ss);
      setUniqueSheetName_(sheet, DISENROLLED_EXCLUSION_SHEET);
      placeCreatedSheetInConfiguredOrder_(sheet);
    } else {
      sheet = insertGovernedOutputSheet_(ss, DISENROLLED_EXCLUSION_SHEET);
    }
  }

  ensureStandardTitleRows_(sheet);
  sheet.getRange("A1").setValue(sheetDef.reportTitle || DISENROLLED_EXCLUSION_SHEET);
  
  if (headers.length > 0) {
    if (sheet.getMaxColumns() < headers.length) {
      sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
    }
    sheet.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);
  }

  applyColumnWidths_(sheet, dashboard, headers);
  applyColumnHidingFromDashboard_(sheet, dashboard, headers);
  
  try { sheet.setFrozenRows(HEADER_ROW); } catch (err) {}
  try { sheet.setFrozenColumns(2); } catch (err) {}
  
  showSheetIfNeeded_(sheet, timing, (timingPrefix || "") + "Disenrolled Exclusion sheet shown");
  return sheet;
}
