// ============================================================================
// WORKFLOW_DEMOP.GS
// Refined Data (Demo P) Initialization, Contact Compression & Monthly Sync
// ============================================================================

// --- REFINED DATA INITIALIZATION & SCRATCH BUILDS ---------------------------

/**
 * Builds the initial Refined Data (Demo P) sheet from scratch.
 */
function buildRefinedDataFromScratch() {
  const monthParts = promptForLockedYearReportMonth_("Build Demo P (Initialization)");
  if (!monthParts) return null;

  return runFrameworkTimed_("Build Demo P (Initialization) " + formatReportDateLabel_(monthParts.firstDay), function(timing) {
    const rawSheet = getValidatedRawDataSheetForDemoPBuild_(monthParts, timing);
    markFrameworkStep_(timing, "Locate validated Raw Data source: " + rawSheet.getName());

    const buildResult = createActiveDemoPFromRawData_(rawSheet, DEMO_P_PREFIX, monthParts, timing);
    const demoSheet = buildResult.sheet;
    const flatCount = buildResult.flatCount || Math.max(demoSheet.getLastRow() - DATA_START_ROW + 1, 0);
    
    enforceDemoPPostFlattenFormatting_(demoSheet);
    refreshIndexAfterSheetWorkflow_("Build Demo P");
    
    markFrameworkStep_(timing, "Demo P flat-record contact compression complete | Retained: " + flatCount);
    notify_("Build Demo P (Initialization) complete. Flat primary records retained: " + flatCount);
    return demoSheet;
  });
}

function getValidatedRawDataSheetForDemoPBuild_(monthParts, timing) {
  const currentRawSheet = getCurrentRawDataSheet_(monthParts);
  if (currentRawSheet) {
    validateRawDataPreflightForDemoP_(currentRawSheet, null, "Build Demo P current Raw Data preflight");
    if (timing) markRuntimeStep_(timing, "Validated Raw Data sheet: " + currentRawSheet.getName());
    return currentRawSheet;
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = ss.getActiveSheet();
  if (isStrictRawDataSheetCandidateForDemoP_(activeSheet, monthParts)) {
    validateRawDataPreflightForDemoP_(activeSheet, null, "Build Demo P active-sheet Raw Data preflight");
    if (timing) markRuntimeStep_(timing, "Validated active sheet fallback: " + activeSheet.getName());
    return activeSheet;
  }

  throw new Error("Raw Data sheet was not found for the selected month. Format Raw Data first.");
}

function isStrictRawDataSheetCandidateForDemoP_(sheet, monthParts) {
  if (!sheet) return false;
  const sheetName = String(sheet.getName() || "").trim();
  if (!sheetName || sheetName === "Template - Raw Data") return false;
  return sheetName === buildRawDataSheetName_(monthParts) || /^Raw Data(\b|\s|-|\()/i.test(sheetName);
}

function createActiveDemoPFromRawData_(rawSheet, targetName, monthParts, timing) {
  const preflight = validateRawDataPreflightForDemoP_(rawSheet, null, "Build Demo P from Raw Data");
  const rawData = preflight.rawData;

  setLastRawDataDisenrolledBuildResult_({ pmrsRemoved: 0, rowsRemoved: 0, rowsCopied: 0 });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const context = getTemplateDrivenActiveSheetContext_(ss, SHEET_TYPE.DEMO_P);
  const dashboard = context.dashboard || loadDashboardConfig_();
  const headers = context.headers;
  const outputRows = mapRowsToHeaders_(rawData.values, rawData.headers, headers);

  const workingData = { headers: headers, headerMap: buildHeaderIndexMap_(headers), values: outputRows, range: null };
  processRefinedDataUnified_(workingData, monthParts, rawSheet.getName(), "Created", timing);
  const flatCount = workingData.values.length;

  const demoSheet = createOutputSheetFromDashboardTemplate_(
    SHEET_TYPE.DEMO_P, targetName, workingData.values, monthParts.firstDay, monthParts.lastDay, timing, "Refined Data unified template write"
  );
  
  updateDemoPReportDates_(demoSheet, monthParts);
  lockFinalOutputRowHeights_(demoSheet, SHEET_TYPE.DEMO_P);
  applyColumnHidingFromDashboard_(demoSheet, dashboard, headers);
  applyOutputVisibilityPolicy_(demoSheet, dashboard, SHEET_TYPE.DEMO_P, timing);
  clearSheetRuntimeCachesForSheet_(demoSheet);

  return { sheet: demoSheet, createdFromDashboardTemplate: true, flatCount: flatCount };
}

function updateExistingDemoPFromRawData_(demoSheet, rawSheet, monthParts, timing) {
  const preflight = validateRawDataPreflightForDemoP_(rawSheet, null, "Update existing Demo P from Raw Data");
  const rawData = preflight.rawData;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const context = getTemplateDrivenActiveSheetContext_(ss, SHEET_TYPE.DEMO_P);
  const headers = context.headers;
  const outputRows = mapRowsToHeaders_(rawData.values, rawData.headers, headers);
  const workingData = { headers: headers, headerMap: buildHeaderIndexMap_(headers), values: outputRows, range: null };

  processRefinedDataUnified_(workingData, monthParts, rawSheet.getName(), "Updated", timing);
  ensureStandardTitleRows_(demoSheet);
  ensureOutputSheetHasFormattedRows_(demoSheet, DATA_START_ROW + workingData.values.length - 1, Math.max(headers.length, 1));
  
  demoSheet.getRange("A1").setValue(context.sheetDef.reportTitle || "Demo P");
  demoSheet.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);

  const lastRow = Math.max(demoSheet.getLastRow(), DATA_START_ROW);
  const lastCol = Math.max(demoSheet.getLastColumn(), headers.length);
  if (lastRow >= DATA_START_ROW) demoSheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol).clearContent();
  if (workingData.values.length) demoSheet.getRange(DATA_START_ROW, 1, workingData.values.length, headers.length).setValues(workingData.values);

  clearSheetRuntimeCachesForSheet_(demoSheet);
  return { sheet: demoSheet, createdFromDashboardTemplate: false };
}

// --- UNIFIED IN-MEMORY TRANSFORMATIONS --------------------------------------

function processRefinedDataUnified_(workingData, monthParts, sourceSheetName, updateStatus, timing) {
  if (!workingData || !workingData.values || !workingData.headerMap) return [];
  const flattenedCount = safeFlattenAndProcessContacts_(workingData, false);
  processDemoPFreshRowsInMemory_(workingData);
  populateDemoPUpdateColumns_(workingData, monthParts, sourceSheetName, updateStatus || "Updated");
  populateUniversalMetadataColumns_(workingData, monthParts, sourceSheetName, "Refined Data", updateStatus || "Updated");
  if (timing) markFrameworkStep_(timing, "Refined Data unified transform complete | Rows: " + flattenedCount);
  return workingData.values;
}

function safeFlattenAndProcessContacts_(workingData, preservePrimaryRows) {
  if (!workingData || !workingData.values || !workingData.headerMap) return 0;
  try {
    return flattenDemoPContactRowsInMemory_(workingData, preservePrimaryRows !== false);
  } catch (err) {
    logBestEffortWarning_("Refined Data contact flattening failed safely: " + err.message);
    return workingData.values.length;
  }
}

function processDemoPFreshRowsInMemory_(data) {
  populateParticipantNameData_(data, null);
  populateDemoPNameData_(data, null);
  updateBannerColumnData_(data, null);
  combineAddressesData_(data, null);
  handleLanguageData_(data, null);
  splitPhoneNumbersData_(data, null);
  runMasterContactProcessData_(data, null);
  combineNotesSummaryData_(data, null);
}

// --- IN-MEMORY CONTACT FLATTENING & COMPRESSION ----------------------------

function flattenDemoPContactRowsInMemory_(data, requireIntegrity) {
  if (!data || !data.values || !data.values.length) return 0;
  const headerMap = data.headerMap || buildHeaderIndexMap_(data.headers || []);
  const width = (data.headers || []).length;
  const pmrIdx = getPMRIndex_(headerMap);
  const primaryIdx = headerMap["Primary PMR Row"];
  if (pmrIdx === -1 || primaryIdx === undefined) throw new Error("Refined Data contact compression requires PMR and Primary PMR Row headers.");

  const contactTargets = ["Contact - 1", "Contact - 2", "Contact - 3", "Contact - 4", "Contact - 5", "Contact - 6", "Contact - 7", "Contact - 8"];
  const contactTargetIndexes = contactTargets.map(header => headerMap[header]).filter(idx => idx !== undefined);
  const summaryIdx = headerMap["Contact - Summary"];
  const grouped = new Map();
  
  data.values.forEach((row, originalIndex) => {
    const pmr = normalizePMR_(row[pmrIdx]);
    const key = pmr || "__blank_pmr__" + originalIndex;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push({ row: row, originalIndex: originalIndex });
  });

  const flatRows = new Array(grouped.size);
  let outputIndex = 0, assignedContacts = 0;
  
  grouped.forEach((items, pmr) => {
    let primaryItem = items.find(item => isPrimaryPMRRowValue_(item.row[primaryIdx])) || items[0];
    let output = new Array(width).fill("");
    try {
      for (let col = 0; col < width; col++) output[col] = primaryItem.row[col] === undefined ? "" : primaryItem.row[col];
      const summaries = [];
      items.forEach(item => {
        if (item === primaryItem) return;
        const summary = buildDemoPContactSummaryForFlatRecord_(item.row, headerMap);
        if (summary) summaries.push(summary);
      });
      
      for (let contactIndex = 0; contactIndex < Math.min(summaries.length, contactTargetIndexes.length); contactIndex++) {
        const targetIdx = contactTargetIndexes[contactIndex];
        if (normalizeCompareValue_(output[targetIdx]) === "") output[targetIdx] = summaries[contactIndex];
        assignedContacts++;
      }
      if (summaryIdx !== undefined && summaries.length && normalizeCompareValue_(output[summaryIdx]) === "") output[summaryIdx] = summaries.join("\n");
    } catch (err) {
      output = new Array(width).fill("");
      for (let fallbackCol = 0; fallbackCol < width; fallbackCol++) output[fallbackCol] = primaryItem.row[fallbackCol] === undefined ? "" : primaryItem.row[fallbackCol];
      logBestEffortWarning_("Refined Data contact parsing fallback used for PMR " + pmr + ": " + err.message);
    }
    flatRows[outputIndex++] = output;
  });

  if (requireIntegrity && assignedContacts > 0 && contactTargetIndexes.length === 0) throw new Error("Contact flattening integrity check failed: no Contact target columns available.");
  sortDemoPFlatRows_(flatRows, headerMap);
  data.values = flatRows;
  return flatRows.length;
}

function buildDemoPContactSummaryForFlatRecord_(row, headerMap) {
  const parts = [
    "Contact - First Name", "Contact - Last Name", "Relationship", "Type of Contact",
    "Contact - Primary Language", "AD1 - Phone", "AD2 - Phone", "AD3 - Phone",
    "Company", "Contact - Notes"
  ].map(header => {
    const idx = headerMap[header];
    return idx === undefined ? "" : String(row[idx] || "").trim();
  }).filter(Boolean);
  return parts.join(" | ");
}

function sortDemoPFlatRows_(rows, headerMap) {
  const lastIdx = headerMap["Last Name"];
  const firstIdx = headerMap["First Name"];
  const nameIdx = headerMap["Name"];
  rows.sort((a, b) => {
    const aKey = String((lastIdx !== undefined ? a[lastIdx] : "") || (nameIdx !== undefined ? a[nameIdx] : "") || "").toLowerCase();
    const bKey = String((lastIdx !== undefined ? b[lastIdx] : "") || (nameIdx !== undefined ? b[nameIdx] : "") || "").toLowerCase();
    if (aKey !== bKey) return aKey.localeCompare(bKey);
    const aFirst = String(firstIdx !== undefined ? a[firstIdx] || "" : "").toLowerCase();
    const bFirst = String(firstIdx !== undefined ? b[firstIdx] || "" : "").toLowerCase();
    return aFirst.localeCompare(bFirst);
  });
}

// --- DATA TRANSFORMERS (NAMES, ADDRESSES, PHONES, NOTES) --------------------

function populateParticipantNameData_(data, pmrFilter) {
  if (!data || !data.values || !data.values.length || !data.headerMap) return;
  const hMap = data.headerMap;
  if (hMap["Participant Name"] === undefined || hMap["First Name"] === undefined || hMap["Last Name"] === undefined) return;

  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, hMap, pmrFilter)) return;
    if (normalizeCompareValue_(row[hMap["Participant Name"]]) !== "") return;
    const firstName = String(row[hMap["First Name"]] || "").trim();
    const lastName = String(row[hMap["Last Name"]] || "").trim();
    row[hMap["Participant Name"]] = [lastName, firstName].filter(Boolean).join(", ");
  });
}

function populateDemoPNameData_(data, pmrFilter) {
  if (!data || !data.values || !data.values.length || !data.headerMap) return;
  const hMap = data.headerMap;
  if (hMap["Name"] === undefined || hMap["First Name"] === undefined || hMap["Last Name"] === undefined) return;

  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, hMap, pmrFilter)) return;
    if (normalizeCompareValue_(row[hMap["Name"]]) !== "") return;
    const firstName = String(row[hMap["First Name"]] || "").trim();
    const lastName = String(row[hMap["Last Name"]] || "").trim();
    row[hMap["Name"]] = [firstName, lastName].filter(Boolean).join(" ");
  });
}

function updateBannerColumnData_(data, pmrFilter) {
  const hMap = data.headerMap;
  const bIdx = hMap["Banner Summary"];
  if (bIdx === undefined) return;
  const bannerHeaders = ["Safety - 2 Person", "Wanderer", "Interpreter Needed", "Fall Risk", "DPOA or Guardian Active", "Palliative Care"];
  
  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, hMap, pmrFilter)) return;
    const parts = [];
    bannerHeaders.forEach(header => {
      const idx = hMap[header];
      if (idx !== undefined && String(row[idx] || "").trim() !== "") parts.push(header);
    });
    if (normalizeCompareValue_(row[bIdx]) === "") row[bIdx] = parts.join(" | ");
  });
}

function combineAddressesData_(data, pmrFilter) {
  const hMap = data.headerMap;
  const a1Idx = hMap["Address Line 1"];
  const targetIdx = hMap["Address 1 - Street"];
  if (a1Idx === undefined || targetIdx === undefined) return;
  
  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, hMap, pmrFilter)) return;
    const p1 = String(row[a1Idx] || "").trim();
    const p2 = hMap["Address Line 2"] !== undefined ? String(row[hMap["Address Line 2"]] || "").trim() : "";
    row[targetIdx] = p1 && p2 ? `${p1} ${p2}` : (p1 || p2);
  });
}

function handleLanguageData_(data, pmrFilter) {
  const hMap = data.headerMap;
  if (hMap["Custom Field 1 - Label"] === undefined || hMap["Custom Field 1 - Value"] === undefined || hMap["Primary Language"] === undefined) return;
  
  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, hMap, pmrFilter)) return;
    const lang = String(row[hMap["Primary Language"]] || "").trim();
    const existingValue = String(row[hMap["Custom Field 1 - Value"]] || "").trim();
    
    if (lang && lang.toLowerCase() !== "english") {
      row[hMap["Custom Field 1 - Label"]] = "Language";
      row[hMap["Custom Field 1 - Value"]] = lang;
    } else if (existingValue) {
      row[hMap["Custom Field 1 - Label"]] = "Language";
    } else {
      row[hMap["Custom Field 1 - Label"]] = "";
      row[hMap["Custom Field 1 - Value"]] = "";
    }
  });
}

function splitPhoneNumbersData_(data, pmrFilter) {
  const hMap = data.headerMap;
  const phoneIdx = hMap["Phone Number"];
  if (phoneIdx === undefined) return;
  
  const labels = ["Home", "Mobile", "Other", "Other"];
  const labelHeaders = ["Phone 1 - Label", "Phone 2 - Label", "Phone 3 - Label", "Phone 4 - Label"];
  const valueHeaders = ["Phone 1 - Value", "Phone 2 - Value", "Phone 3 - Value", "Phone 4 - Value"];
  
  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, hMap, pmrFilter)) return;
    const phoneText = String(row[phoneIdx] || "").trim();
    
    for (let i = 0; i < 4; i++) {
      if (hMap[labelHeaders[i]] !== undefined) row[hMap[labelHeaders[i]]] = "";
      if (hMap[valueHeaders[i]] !== undefined) row[hMap[valueHeaders[i]]] = "";
    }
    if (!phoneText) return;
    
    const parts = phoneText.split("_").map(p => p.trim()).filter(Boolean);
    parts.slice(0, 4).forEach((phone, idx) => {
      if (hMap[labelHeaders[idx]] !== undefined) row[hMap[labelHeaders[idx]]] = labels[idx];
      if (hMap[valueHeaders[idx]] !== undefined) row[hMap[valueHeaders[idx]]] = phone;
    });
  });
}

function combineNotesSummaryData_(data, pmrFilter) {
  if (!data || !data.values || !data.values.length) return;
  const hMap = data.headerMap;
  if (hMap["Notes"] === undefined) return;
  
  data.values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, hMap, pmrFilter)) return;
    if (normalizeCompareValue_(row[hMap["Notes"]]) !== "") return;
    
    const parts = [];
    ["Banner Summary", "Contact - Summary"].forEach(header => {
      const idx = hMap[header];
      const value = idx === undefined ? "" : String(row[idx] || "").trim();
      if (value) parts.push(value);
    });
    
    const caseloadParts = ["Caseload - PCP", "Caseload - RN", "Caseload - Social Work"].map(header => {
      const idx = hMap[header];
      return idx === undefined ? "" : String(row[idx] || "").trim();
    }).filter(Boolean);
    if (caseloadParts.length) parts.push(caseloadParts.join(" | "));
    
    const addVal = hMap["Additional Important Information"] === undefined ? "" : String(row[hMap["Additional Important Information"]] || "").trim();
    if (addVal) parts.push(addVal);
    
    row[hMap["Notes"]] = parts.join("\n\n");
  });
}

// --- MONTHLY SYNC & ARCHIVE UPDATES ----------------------------------------

function updateDemoPMonthlySyncForMonth_(monthParts, timing, options) {
  if (!monthParts) return null;
  options = options || {};
  const timingPrefix = options.timingPrefix === undefined ? "Create Monthly Update - Update Demo P - " : String(options.timingPrefix || "");
  const step = function(label, details) { if (timing) markFrameworkStep_(timing, timingPrefix + label, details || ""); };
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mcrName = buildMonthlySheetName_(MONTHLY_CHANGE_REPORT_PREFIX, monthParts.firstDay, monthParts.lastDay);

  let mcrSheet = ss.getSheetByName(mcrName);
  if (!mcrSheet) {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert("Monthly Change Report Required", "Monthly Change Report '" + mcrName + "' was not found.\n\nBuild it now?", ui.ButtonSet.YES_NO);
    if (response === ui.Button.YES) {
      mcrSheet = buildMonthlyChangeReportForMonth_(monthParts, timing, { skipIndexRefresh: true, skipNotification: true });
      if (!mcrSheet) return null;
    } else {
      return null;
    }
  }

  const demoSheet = getCurrentDemoPSheet_(monthParts);
  if (!demoSheet) throw new Error("Ongoing Demo P sheet was not found. Run Build Demo P (Initialization) first.");

  const changedPMRs = getDemoPMonthlySyncChangedPMRs_(monthParts, timing);
  if (!changedPMRs.size) return demoSheet;

  const rawSheet = getCurrentRawDataSheet_(monthParts);
  if (!rawSheet) throw new Error("Raw Data sheet was not found for the selected month.");
  
  const headers = getHeaders_(demoSheet, HEADER_ROW);
  const data = getDataValues_(demoSheet, HEADER_ROW, DATA_START_ROW);
  const width = Math.max(headers.length, 1);

  const freshRows = buildDemoPFreshRowsForPMRs_(rawSheet, headers, changedPMRs, monthParts, timing);
  validateDemoPMonthlySyncReplacementCoverage_(changedPMRs, freshRows, headers);

  const retainedResult = buildDemoPMonthlySyncRetainedRows_(data, changedPMRs, width);
  const outputRows = retainedResult.rows.concat(normalizeRowsToWidth_(freshRows, width));

  appendDemoPArchiveRows_(headers, retainedResult.archiveRows, {
    reason: "Monthly Sync Replacement", workflow: "Create Monthly Update",
    monthLabel: formatReportDateLabel_(monthParts.firstDay), sourceSheet: demoSheet.getName()
  }, timing, "Create Monthly Update - Update Demo P - Archive detail");

  writeDemoPMonthlySyncBody_(demoSheet, outputRows, width, step);
  removeActiveDemoPPMRsFromDisenrolledExclusion_(demoSheet);
  updateDemoPReportDates_(demoSheet, monthParts);
  enforceDemoPPostFlattenFormatting_(demoSheet);

  return demoSheet;
}

function getDemoPMonthlySyncChangedPMRs_(monthParts, timing) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const set = new Set();
  const mcrSheet = getMonthlySheetByPrefixAndDate_(ss, MONTHLY_CHANGE_REPORT_PREFIX, monthParts.firstDay, monthParts.lastDay);
  if (!mcrSheet) return set;

  const data = getDataValues_(mcrSheet, HEADER_ROW, DATA_START_ROW);
  const pmrIdx = getPMRIndex_(data.headerMap);
  if (pmrIdx === -1) throw new Error("Monthly Change Report is missing Participant PMR# column.");

  data.values.forEach(row => {
    const rawValue = row[pmrIdx];
    if (!isPMRHeaderValue_(rawValue)) {
      const pmr = normalizePMR_(rawValue);
      if (pmr) set.add(pmr);
    }
  });
  return set;
}

function buildDemoPFreshRowsForPMRs_(rawSheet, demoHeaders, changedPMRs, monthParts, timing) {
  if (!rawSheet || !changedPMRs || changedPMRs.size === 0) return [];
  const preflight = validateRawDataPreflightForDemoP_(rawSheet, null, "Update Demo P monthly sync Raw Data preflight");
  const rawData = preflight.rawData;
  const rawPmrIdx = preflight.pmrIdx;
  const rawRows = rawData.values.filter(row => changedPMRs.has(normalizePMR_(row[rawPmrIdx])));
  const outputRows = mapRowsToHeaders_(rawRows, rawData.headers, demoHeaders);
  const workingData = { headers: demoHeaders, headerMap: buildHeaderIndexMap_(demoHeaders), values: outputRows, range: null };
  return processRefinedDataUnified_(workingData, monthParts, rawSheet.getName(), "Monthly Sync", timing);
}

function buildDemoPMonthlySyncRetainedRows_(data, changedPMRs, width) {
  const pmrIdx = getPMRIndex_(data.headerMap);
  const primaryIdx = data.headerMap ? data.headerMap["Primary PMR Row"] : undefined;
  const retainedRows = [];
  const archiveRows = [];
  let removedRows = 0;

  (data.values || []).forEach(row => {
    const pmr = pmrIdx === -1 ? "" : normalizePMR_(row[pmrIdx]);
    if (pmr && changedPMRs.has(pmr)) {
      removedRows++;
      if (isPrimaryPMRRowValue_(primaryIdx === undefined ? "" : row[primaryIdx])) {
        archiveRows.push(padRowToWidth_(row, width));
      }
      return;
    }
    retainedRows.push(padRowToWidth_(row, width));
  });

  return { rows: retainedRows, removedRows: removedRows, archiveRows: archiveRows };
}

function validateDemoPMonthlySyncReplacementCoverage_(changedPMRs, freshRows, headers) {
  const headerMap = buildHeaderIndexMap_(headers || []);
  const pmrIdx = getPMRIndex_(headerMap);
  if (pmrIdx === -1) throw new Error("Demo P monthly sync replacement validation requires Participant PMR# column.");

  const replacementPMRs = new Set();
  (freshRows || []).forEach(row => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (pmr) replacementPMRs.add(pmr);
  });

  const missingPMRs = [];
  changedPMRs.forEach(pmr => { if (!replacementPMRs.has(pmr)) missingPMRs.push(pmr); });

  if (missingPMRs.length) {
    throw new Error("Demo P monthly sync stopped: Raw Data did not produce replacement rows for changed PMRs: " + missingPMRs.slice(0, 20).join(", "));
  }
}

function writeDemoPMonthlySyncBody_(demoSheet, rows, width, stepFn) {
  const step = typeof stepFn === "function" ? stepFn : function() {};
  const normalizedRows = normalizeRowsToWidth_(rows || [], width);
  const oldBodyRows = Math.max(demoSheet.getLastRow() - DATA_START_ROW + 1, 0);
  const rowsToClear = Math.max(oldBodyRows, normalizedRows.length, 1);
  const colsToClear = Math.max(demoSheet.getLastColumn(), width, 1);

  ensureOutputSheetHasFormattedRows_(demoSheet, DATA_START_ROW + Math.max(normalizedRows.length, 1) - 1, width);
  demoSheet.getRange(DATA_START_ROW, 1, rowsToClear, colsToClear).clearContent();
  if (normalizedRows.length) {
    demoSheet.getRange(DATA_START_ROW, 1, normalizedRows.length, width).setValues(normalizedRows);
    step("Retained Demo P body written | Rows: " + normalizedRows.length);
  }
}

function updateDemoPReportDates_(demoSheet, monthParts) {
  if (!demoSheet || !monthParts) return;
  demoSheet.getRange("B2").setValue(monthParts.firstDay).setNumberFormat("m/d/yyyy");
  demoSheet.getRange("D2").setValue(monthParts.lastDay).setNumberFormat("m/d/yyyy");
  demoSheet.getRange("E2").setValue("Last Updated").setFontFamily("Arial").setFontSize(10).setFontStyle("italic").setHorizontalAlignment("left");
}

function enforceDemoPPostFlattenFormatting_(demoSheet) {
  if (!demoSheet) return;
  const ss = typeof demoSheet.getParent === "function" ? demoSheet.getParent() : SpreadsheetApp.getActive();
  const context = getTemplateDrivenActiveSheetContext_(ss, SHEET_TYPE.DEMO_P);
  const headers = context.headers;

  applyTemplateColumnWidths_(demoSheet, context.template, Math.max(headers.length, 1));
  sortSheetAlphabeticallyByParticipantName_(demoSheet);

  const lastRow = demoSheet.getLastRow();
  const lastCol = Math.max(demoSheet.getLastColumn(), 1);
  if (lastRow >= DATA_START_ROW) {
    demoSheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  }
  lockFinalOutputRowHeights_(demoSheet, "Demo P");
}

function removeActiveDemoPPMRsFromDisenrolledExclusion_(demoSheet) {
  if (!demoSheet) return 0;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const exclusionSheet = ss.getSheetByName(DISENROLLED_EXCLUSION_SHEET);
  if (!exclusionSheet || exclusionSheet.getLastRow() < DATA_START_ROW) return 0;

  const demoLastRow = demoSheet.getLastRow();
  const demoLastCol = demoSheet.getLastColumn();
  if (demoLastRow < DATA_START_ROW || demoLastCol < 1) return 0;

  const demoHeaders = getHeaders_(demoSheet, HEADER_ROW);
  const demoHeaderMap = buildHeaderIndexMap_(demoHeaders);
  const demoPmrIdx = getPMRIndex_(demoHeaderMap);
  const statusIdx = demoHeaderMap["Enrollment Status"];
  const disenrollEffectiveIdx = findHeaderIndex_(demoHeaderMap, ["Disenrollment Effective Date", "Disenrollment Date", "Date of Death"]);
  if (demoPmrIdx === -1 || statusIdx === undefined) return 0;

  const exclusionData = getDataValues_(exclusionSheet, HEADER_ROW, DATA_START_ROW);
  const exclusionPmrIdx = exclusionData.headerMap ? getPMRIndex_(exclusionData.headerMap) : -1;
  if (exclusionPmrIdx === -1 || !exclusionData.values.length) return 0;

  const exclusionPmrSet = new Set();
  exclusionData.values.forEach(row => {
    const pmr = normalizePMR_(row[exclusionPmrIdx]);
    if (pmr) exclusionPmrSet.add(pmr);
  });
  if (!exclusionPmrSet.size) return 0;

  const demoValues = demoSheet.getRange(DATA_START_ROW, 1, demoLastRow - DATA_START_ROW + 1, demoLastCol).getValues();
  const activePMRs = new Set();

  demoValues.forEach(row => {
    const pmr = normalizePMR_(row[demoPmrIdx]);
    if (!pmr || !exclusionPmrSet.has(pmr)) return;

    const statusText = String(row[statusIdx] || "").trim().toLowerCase();
    const hasDisenrollmentDate = disenrollEffectiveIdx === -1 ? false : normalizeCompareValue_(row[disenrollEffectiveIdx]) !== "";
    if (statusText === "active" || statusText === "enrolled" || !hasDisenrollmentDate) {
      activePMRs.add(pmr);
    }
  });

  if (!activePMRs.size) return 0;

  const retainedRows = [];
  let deletedCount = 0;

  exclusionData.values.forEach(row => {
    const pmr = normalizePMR_(row[exclusionPmrIdx]);
    if (pmr && activePMRs.has(pmr)) {
      deletedCount++;
    } else {
      retainedRows.push(row);
    }
  });

  if (deletedCount > 0) {
    const width = Math.max(exclusionSheet.getLastColumn(), 1);
    exclusionSheet.getRange(DATA_START_ROW, 1, exclusionData.values.length, width).clearContent();
    if (retainedRows.length > 0) {
      const normalizedRows = normalizeRowsToWidth_(retainedRows, width);
      exclusionSheet.getRange(DATA_START_ROW, 1, normalizedRows.length, width).setValues(normalizedRows);
    }
    clearSheetRuntimeCachesForSheet_(exclusionSheet);
    logBestEffortWarning_("Re-Enrollment Engine: Surgically purged " + deletedCount + " re-enrolled PMR records from Disenrolled Exclusion.");
  }
  return deletedCount;
}

// --- DEMO P COLD ARCHIVING --------------------------------------------------

function appendDemoPArchiveRows_(sourceHeaders, rows, metadata, timing, timingLabel) {
  if (!rows || rows.length === 0) return 0;
  const prefix = String(timingLabel || "Demo P archive detail");
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const archiveSheet = getOrCreateDemoPArchiveSheet_(ss, sourceHeaders, timing, prefix);
  
  const archiveHeaders = getHeaders_(archiveSheet, HEADER_ROW);
  const archiveWidth = Math.max(archiveHeaders.length, 1);
  const now = new Date();
  const meta = metadata || {};
  const sourceHeaderMap = buildHeaderIndexMap_(sourceHeaders || []);
  const archiveHeaderMap = buildHeaderIndexMap_(archiveHeaders || []);
  const sourcePMRIndex = getPMRIndex_(sourceHeaderMap);

  const payload = rows.map(row => {
    const output = new Array(archiveWidth).fill("");
    if (archiveHeaderMap["Archived At"] !== undefined) output[archiveHeaderMap["Archived At"]] = now;
    if (archiveHeaderMap["Archive Reason"] !== undefined) output[archiveHeaderMap["Archive Reason"]] = meta.reason || "Demo P Row Archive";
    if (archiveHeaderMap["Source Workflow"] !== undefined) output[archiveHeaderMap["Source Workflow"]] = meta.workflow || "Demo P Workflow";
    if (archiveHeaderMap["Source Month"] !== undefined) output[archiveHeaderMap["Source Month"]] = meta.monthLabel || "";
    if (archiveHeaderMap["Source Sheet"] !== undefined) output[archiveHeaderMap["Source Sheet"]] = meta.sourceSheet || "Demo P";
    
    (sourceHeaders || []).forEach((header, idx) => {
      if (archiveHeaderMap[header] !== undefined) output[archiveHeaderMap[header]] = row[idx];
    });
    if (archiveHeaderMap["Participant PMR#"] !== undefined && sourcePMRIndex !== -1) {
      output[archiveHeaderMap["Participant PMR#"]] = row[sourcePMRIndex];
    }
    return output;
  });

  const insertStartRow = Math.max(archiveSheet.getLastRow() + 1, DATA_START_ROW);
  ensureOutputSheetHasFormattedRows_(archiveSheet, insertStartRow + payload.length - 1, archiveWidth);
  archiveSheet.getRange(insertStartRow, 1, payload.length, archiveWidth).setValues(payload);
  
  hideSheetIfNeeded_(archiveSheet, timing, prefix + " - archive sheet hidden after write");
  clearSheetRuntimeCachesForSheet_(archiveSheet);
  return payload.length;
}

function getOrCreateDemoPArchiveSheet_(ss, sourceHeaders, timing, timingPrefix) {
  let sheet = ss.getSheetByName(DEMO_P_ARCHIVE_SHEET);
  const archiveHeaders = getDemoPArchiveHeaders_(sourceHeaders);
  
  if (!sheet) {
    const template = ss.getSheetByName(DEMO_P_TEMPLATE_SHEET);
    if (template) {
      sheet = template.copyTo(ss);
      setUniqueSheetName_(sheet, DEMO_P_ARCHIVE_SHEET);
      placeCreatedSheetInConfiguredOrder_(sheet);
    } else {
      sheet = insertGovernedOutputSheet_(ss, DEMO_P_ARCHIVE_SHEET);
    }
  }
  
  if (sheet.getMaxColumns() < archiveHeaders.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), archiveHeaders.length - sheet.getMaxColumns());
  }
  
  ensureStandardTitleRows_(sheet);
  sheet.getRange("A1").setValue(DEMO_P_ARCHIVE_SHEET);
  sheet.getRange(HEADER_ROW, 1, 1, archiveHeaders.length).setValues([archiveHeaders]);
  
  try { sheet.setFrozenRows(HEADER_ROW); } catch (err) {}
  hideSheetIfNeeded_(sheet, timing, "Archive sheet readiness");
  return sheet;
}

function getDemoPArchiveHeaders_(sourceHeaders) {
  const headers = ["Archived At", "Archive Reason", "Source Workflow", "Source Month", "Source Sheet"];
  (sourceHeaders || []).forEach(header => {
    const clean = String(header || "").trim();
    if (clean && headers.indexOf(clean) === -1) headers.push(clean);
  });
  return headers;
}
