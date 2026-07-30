// ============================================================================
// WORKFLOW_MONTHLYCHANGE.GS
// Raw Data Diff Engine, Field-Level Delta Tracking & Report Generation
// ============================================================================

// --- MAIN WORKFLOW & REPORT BUILDER ----------------------------------------

/**
 * Builds the Monthly Change Report by comparing current and previous Raw Data sheets.
 */
function buildMonthlyChangeReportForMonth_(monthParts, timing, options) {
  if (!monthParts) return null;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const currentDemo = getCurrentRawDataSheet_(monthParts);
  const previousDemo = getPreviousRawDataSheet_(monthParts);

  if (!currentDemo || !previousDemo) {
    notify_("Monthly Change Report could not find required Raw Data source sheets for comparison.");
    return null;
  }

  markRuntimeStep_(timing, "Monthly Change source sheets located | Current: " + currentDemo.getName() + "; Previous: " + previousDemo.getName());
  const sectionData = compareRawDataForMonthlyChange_(previousDemo, currentDemo, monthParts);
  
  const totalPMRs = sectionData.enrollmentPMRs.size + sectionData.disenrollmentPMRs.size + 
                    sectionData.demographicPMRs.size + sectionData.caseloadPMRs.size + 
                    sectionData.contactPMRs.size + sectionData.bannerPMRs.size + sectionData.otherPMRs.size;
                    
  if (totalPMRs === 0) {
    notify_("No Raw Data changes found. Monthly Change Report was not created.");
    return null;
  }

  const reportName = buildMonthlySheetName_(MONTHLY_CHANGE_REPORT_PREFIX, monthParts.firstDay, monthParts.lastDay);
  let reportSheet = ss.getSheetByName(reportName);
  if (reportSheet) throw new Error("Monthly Change report already exists: " + reportName + ". Delete or rename the existing report first.");

  const dashboard = loadDashboardConfig_();
  const sheetDef = getSheetDefinitionByType_(dashboard, SHEET_TYPE.MONTHLY_CHANGE);
  const template = ss.getSheetByName(sheetDef.templateName);
  if (!template) throw new Error("Template not found: " + sheetDef.templateName + ". Run Build All Templates first.");

  reportSheet = template.copyTo(ss);
  setRequiredSheetName_(reportSheet, reportName);
  placeCreatedSheetInConfiguredOrder_(reportSheet);
  showSheetIfNeeded_(reportSheet, timing, "Monthly Change report sheet shown");

  buildMonthlyChangeReportSectionLayout_(reportSheet, currentDemo, sectionData.currentData.headers, monthParts);
  populateMonthlyChangeReportSections_(reportSheet, sectionData, monthParts);
  formatMonthlyChangeReportSectionSheet_(reportSheet, sectionData.currentData.headers);
  setRequiredSheetName_(reportSheet, reportName);

  if (options && options.skipIndexRefresh) {
    markRuntimeStep_(timing, "Monthly Change index refresh deferred");
  } else {
    updateIndexSheet();
  }

  if (!(options && options.skipNotification)) {
    notify_(`Monthly Change Report created.\n\nEnrollments: ${sectionData.enrollmentPMRs.size}\nDisenrollments: ${sectionData.disenrollmentPMRs.size}`);
  }

  return reportSheet;
}

function buildMonthlyChangeReport() {
  const monthParts = promptForLockedYearReportMonth_("Build Monthly Change Report");
  if (!monthParts) return null;
  return runFrameworkTimed_("Build Monthly Change Report " + formatReportDateLabel_(monthParts.firstDay), function(timing) {
    return buildMonthlyChangeReportForMonth_(monthParts, timing, null);
  });
}

// --- COMPARISON ENGINE & DELTA COMPILATION ----------------------------------

function compareRawDataForMonthlyChange_(previousDemo, currentDemo, monthParts) {
  const previousData = getRawDemoPDataForCompare_(previousDemo);
  const currentData = getRawDemoPDataForCompare_(currentDemo);
  
  const enrollmentPMRs = new Set();
  const disenrollmentPMRs = new Set();
  const demographicPMRs = new Set();
  const caseloadPMRs = new Set();
  const contactPMRs = new Set();
  const bannerPMRs = new Set();
  const otherPMRs = new Set();
  
  const demographicChangedColumnsByPMR = new Map();
  const caseloadChangedColumnsByPMR = new Map();
  const contactChangedColumnsByPMR = new Map();
  const bannerChangedColumnsByPMR = new Map();
  const otherChangedColumnsByPMR = new Map();

  const trackedFields = new Set([].concat(
    RAW_DEMO_P_DEMOGRAPHIC_FIELDS, RAW_DEMO_P_CONTACT_FIELDS, 
    RAW_DEMO_P_CASELOAD_FIELDS, RAW_DEMO_P_BANNER_FIELDS, 
    RAW_DEMO_P_ENROLLMENT_FIELDS, RAW_DEMO_P_DISENROLLMENT_FIELDS
  ));
  
  const systemFields = new Set(["", "Primary PMR Row", "Sort Order", "Update Status", "Update Month", "Source Sheet", "Columns Updated", "Last Updated At", "Source Hash", "Previous Source Hash", "Source Workflow", "Demo P Update Status", "Demo P Update Month", "Demo P Source Sheet"]);
  const otherFields = currentData.headers.filter(header => {
    const clean = String(header || "").trim();
    return clean && !trackedFields.has(clean) && !systemFields.has(clean);
  });
  
  const allCompareFields = Array.from(new Set([].concat(Array.from(trackedFields), otherFields)));

  const disenrolledPmrSet = new Set();
  const exclusionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DISENROLLED_EXCLUSION_SHEET);
  if (exclusionSheet) {
    const exclusionData = getDataValues_(exclusionSheet, HEADER_ROW, DATA_START_ROW);
    const exclusionPmrIndex = getPMRIndex_(exclusionData.headerMap);
    if (exclusionPmrIndex !== -1) {
      exclusionData.values.forEach(row => {
        const excludedPmr = normalizePMR_(row[exclusionPmrIndex]);
        if (excludedPmr) disenrolledPmrSet.add(excludedPmr);
      });
    }
  }

  currentData.rowsByPMR.forEach((currentRows, pmr) => {
    if (disenrolledPmrSet.has(pmr)) return;
    const previousRows = previousData.rowsByPMR.get(pmr) || [];

    const mostRecentCapitationDate = getMostRecentDateFromRowsByHeader_(currentRows, currentData.headerMap, "Capitation Date");
    const isEnrollmentPMR = isSameDate_(mostRecentCapitationDate, monthParts.firstDay);
    const isDisenrollmentPMR = currentRows.some(item => {
      const effectiveDate = getFieldValueFromRow_(item.values, currentData.headerMap, "Disenrollment Effective Date");
      return isMonthlyChangeDisenrollmentEffectiveDate_(effectiveDate, monthParts);
    });

    if (isEnrollmentPMR) enrollmentPMRs.add(pmr);
    if (isDisenrollmentPMR) disenrollmentPMRs.add(pmr);
    if (isEnrollmentPMR || isDisenrollmentPMR) return;
    if (isParticipantEnrollmentStatusDisenrolled_(currentRows, currentData.headerMap)) return;

    const currentPMRSignature = buildPrimitiveRowsHash_(currentRows, currentData.headerMap, allCompareFields);
    const previousPMRSignature = buildPrimitiveRowsHash_(previousRows, previousData.headerMap, allCompareFields);
    if (currentPMRSignature && previousPMRSignature && currentPMRSignature === previousPMRSignature) return;

    const currentDobRows = rowsWithDOBOnlyForSection_(currentRows, currentData.headerMap);
    const previousDobRows = rowsWithDOBOnlyForSection_(previousRows, previousData.headerMap);

    const demographicChangedColumns = getChangedColumnsForSectionRows_(currentDobRows, previousDobRows, currentData.headers, previousData.headers, RAW_DEMO_P_DEMOGRAPHIC_FIELDS, currentData.headerMap, previousData.headerMap);
    if (demographicChangedColumns.size > 0) { demographicPMRs.add(pmr); demographicChangedColumnsByPMR.set(pmr, demographicChangedColumns); }

    const caseloadChangedColumns = getChangedColumnsForSectionRows_(currentDobRows, previousDobRows, currentData.headers, previousData.headers, RAW_DEMO_P_CASELOAD_FIELDS, currentData.headerMap, previousData.headerMap);
    if (caseloadChangedColumns.size > 0) { caseloadPMRs.add(pmr); caseloadChangedColumnsByPMR.set(pmr, caseloadChangedColumns); }

    const contactChangedColumns = getChangedColumnsForSectionRows_(currentRows, previousRows, currentData.headers, previousData.headers, RAW_DEMO_P_CONTACT_FIELDS, currentData.headerMap, previousData.headerMap);
    if (contactChangedColumns.size > 0) { contactPMRs.add(pmr); contactChangedColumnsByPMR.set(pmr, contactChangedColumns); }

    const bannerChangedColumns = getChangedColumnsForSectionRows_(currentRows, previousRows, currentData.headers, previousData.headers, RAW_DEMO_P_BANNER_FIELDS, currentData.headerMap, previousData.headerMap);
    if (bannerChangedColumns.size > 0) { bannerPMRs.add(pmr); bannerChangedColumnsByPMR.set(pmr, bannerChangedColumns); }

    const otherChangedColumns = getChangedColumnsForSectionRows_(currentRows, previousRows, currentData.headers, previousData.headers, otherFields, currentData.headerMap, previousData.headerMap);
    if (otherChangedColumns.size > 0) { otherPMRs.add(pmr); otherChangedColumnsByPMR.set(pmr, otherChangedColumns); }
  });

  enrollmentPMRs.forEach(pmr => { demographicPMRs.delete(pmr); caseloadPMRs.delete(pmr); contactPMRs.delete(pmr); bannerPMRs.delete(pmr); otherPMRs.delete(pmr); });
  disenrollmentPMRs.forEach(pmr => { demographicPMRs.delete(pmr); caseloadPMRs.delete(pmr); contactPMRs.delete(pmr); bannerPMRs.delete(pmr); otherPMRs.delete(pmr); });

  return {
    previousData: previousData, currentData: currentData, enrollmentPMRs: enrollmentPMRs, disenrollmentPMRs: disenrollmentPMRs,
    demographicPMRs: demographicPMRs, caseloadPMRs: caseloadPMRs, contactPMRs: contactPMRs, bannerPMRs: bannerPMRs, otherPMRs: otherPMRs,
    demographicChangedColumnsByPMR: demographicChangedColumnsByPMR, caseloadChangedColumnsByPMR: caseloadChangedColumnsByPMR,
    contactChangedColumnsByPMR: contactChangedColumnsByPMR, bannerChangedColumnsByPMR: bannerChangedColumnsByPMR, otherChangedColumnsByPMR: otherChangedColumnsByPMR
  };
}

function getRawDemoPDataForCompare_(sheet) {
  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  const headers = data.headers;
  const headerMap = data.headerMap;
  const pmrIdx = getPMRIndex_(headerMap);
  const dobIdx = getDOBIndex_(headerMap);

  if (pmrIdx === -1) throw new Error(`${sheet.getName()} is missing Participant PMR# column.`);

  const rowsByPMR = new Map();
  const participantRows = new Map();
  const allPMRs = new Set();

  data.values.forEach((row, idx) => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr) return;
    allPMRs.add(pmr);

    const item = { rowNumber: DATA_START_ROW + idx, values: row };
    if (!rowsByPMR.has(pmr)) rowsByPMR.set(pmr, []);
    rowsByPMR.get(pmr).push(item);

    if (!participantRows.has(pmr) && (dobIdx === -1 || normalizeCompareValue_(row[dobIdx]) !== "")) {
      participantRows.set(pmr, item);
    }
  });

  rowsByPMR.forEach((items, pmr) => {
    if (!participantRows.has(pmr) && items.length > 0) participantRows.set(pmr, items[0]);
  });

  return { sheet: sheet, sheetName: sheet.getName(), headers: headers, headerMap: headerMap, values: data.values, rowsByPMR: rowsByPMR, participantRows: participantRows, allPMRs: allPMRs };
}

// --- FIELD & ROW COMPARISON UTILITIES --------------------------------------

function rowsWithDOBOnlyForSection_(items, headerMap) {
  const dobIdx = getDOBIndex_(headerMap);
  if (dobIdx === -1) return [];
  return (items || []).filter(item => normalizeCompareValue_(item.values[dobIdx]) !== "");
}

function buildPrimitiveRowsHash_(items, headerMap, columnsToCompare) {
  const columnIndexes = (columnsToCompare || []).map(header => headerMap[header]).filter(idx => idx !== undefined && idx !== -1);
  if (!items || items.length === 0 || columnIndexes.length === 0) return "";
  return items.map(item => columnIndexes.map(idx => normalizeCompareValue_(item.values[idx])).join("|~|")).sort().join("|~~|");
}

function getChangedColumnsForSectionRows_(currentItems, previousItems, currentHeaders, previousHeaders, columnsToCompare, currentHeaderMap, previousHeaderMap) {
  const changed = new Set();
  if (!currentItems || currentItems.length === 0 || !previousItems || previousItems.length === 0) return changed;
  const currentSignatures = buildColumnSignaturesForSection_(currentItems, currentHeaderMap, columnsToCompare);
  const previousSignatures = buildColumnSignaturesForSection_(previousItems, previousHeaderMap, columnsToCompare);

  columnsToCompare.forEach(header => {
    if (currentHeaderMap[header] === undefined || previousHeaderMap[header] === undefined) return;
    if ((currentSignatures[header] || "") !== (previousSignatures[header] || "")) changed.add(header);
  });
  return changed;
}

function buildColumnSignaturesForSection_(items, headerMap, columnsToCompare) {
  const signatures = {};
  (columnsToCompare || []).forEach(header => {
    const idx = headerMap[header];
    if (idx === undefined || idx === -1) return;
    signatures[header] = (items || []).map(item => normalizeCompareValue_(item.values[idx])).sort().join("||");
  });
  return signatures;
}

function isMonthlyChangeDisenrollmentEffectiveDate_(effectiveDate, monthParts) {
  return !!(monthParts && isSameDate_(effectiveDate, monthParts.firstDay));
}

function compareSingleFieldAndAdd_(outputRows, changedPMRs, section, pmr, previousItem, currentItem, previousData, currentData, field, monthParts, skipIfCurrentDOBBlank) {
  if (!previousItem || !currentItem) return;

  if (skipIfCurrentDOBBlank) {
    const currentDOBIdx = getDOBIndex_(currentData.headerMap);
    if (currentDOBIdx !== -1 && normalizeCompareValue_(currentItem.values[currentDOBIdx]) === "") return;
  }

  if (field !== "Participant PMR#" && currentData.headerMap[field] === undefined && previousData.headerMap[field] === undefined) {
    return;
  }

  const previousValue = getFieldValueFromRow_(previousItem.values, previousData.headerMap, field);
  const currentValue = getFieldValueFromRow_(currentItem.values, currentData.headerMap, field);

  if (!valuesAreEqual_(previousValue, currentValue)) {
    addMCRRow_(outputRows, changedPMRs, section, pmr, currentItem, previousItem, currentData, previousData, field, previousValue, currentValue, monthParts);
  }
}

function addMCRRow_(outputRows, changedPMRs, section, pmr, currentItem, previousItem, currentData, previousData, field, previousValue, currentValue, monthParts) {
  const mainItem = currentItem || previousItem;
  const currentValues = mainItem ? mainItem.values : [];
  const currentMap = currentData.headerMap;

  const lastName = getFieldValueFromRow_(currentValues, currentMap, "Last Name");
  const firstName = getFieldValueFromRow_(currentValues, currentMap, "First Name");
  const participantName = buildParticipantName_(currentValues, currentMap);

  outputRows.push([
    section, pmr, participantName, lastName, firstName, field,
    displayValueForReport_(previousValue), displayValueForReport_(currentValue),
    previousItem ? previousItem.rowNumber : "", currentItem ? currentItem.rowNumber : "", monthParts.firstDay
  ]);

  if (!changedPMRs.has(pmr)) changedPMRs.set(pmr, new Set());
  changedPMRs.get(pmr).add(section);
}

function getFieldValueFromRow_(row, headerMap, field) {
  const idx = headerMap[field];
  return (idx === undefined || idx < 0) ? "" : row[idx];
}

function buildParticipantName_(row, headerMap) {
  const participantName = getFieldValueFromRow_(row, headerMap, "Participant Name");
  if (normalizeCompareValue_(participantName) !== "") return participantName;

  const lastText = String(getFieldValueFromRow_(row, headerMap, "Last Name") || "").trim();
  const firstText = String(getFieldValueFromRow_(row, headerMap, "First Name") || "").trim();

  if (firstText && lastText) return `${firstText} ${lastText}`;
  return firstText || lastText || "";
}

function displayValueForReport_(value) {
  if (value instanceof Date && !isNaN(value.getTime())) return formatDateDisplay_(value);
  return value === null || value === undefined ? "" : String(value);
}

function formatDateDisplay_(date) {
  const d = normalizeToDateObject_(date);
  return d ? Utilities.formatDate(d, Session.getScriptTimeZone(), DATE_DISPLAY_FORMAT) : "";
}

// --- REPORT SECTION & MATRIX ASSEMBLY ---------------------------------------

function getMonthlyChangeSectionSpecs_(sectionData) {
  return [
    { title: "Enrollments", pmrSet: sectionData.enrollmentPMRs, rowMode: "dobOnly", changedColumnsByPMR: new Map() },
    { title: "Disenrollments", pmrSet: sectionData.disenrollmentPMRs, rowMode: "strictDisenrollmentEffectiveDate", changedColumnsByPMR: new Map() },
    { title: "Demographic Changes", pmrSet: sectionData.demographicPMRs, rowMode: "dobOnly", changedColumnsByPMR: sectionData.demographicChangedColumnsByPMR },
    { title: "Caseload Changes", pmrSet: sectionData.caseloadPMRs, rowMode: "dobOnly", changedColumnsByPMR: sectionData.caseloadChangedColumnsByPMR },
    { title: "Contact Changes", pmrSet: sectionData.contactPMRs, rowMode: "allRows", changedColumnsByPMR: sectionData.contactChangedColumnsByPMR },
    { title: "Banner Summary Changes", pmrSet: sectionData.bannerPMRs, rowMode: "allRows", changedColumnsByPMR: sectionData.bannerChangedColumnsByPMR },
    { title: "Other Changes", pmrSet: sectionData.otherPMRs, rowMode: "dobOnly", changedColumnsByPMR: sectionData.otherChangedColumnsByPMR }
  ];
}

function buildMonthlyChangeSectionRows_(currentData, previousData, pmrSet, sectionTitle, rowMode, changedColumnsByPMR, monthParts) {
  if (!currentData || !pmrSet || pmrSet.size === 0) return [];

  const reportHeaders = getMonthlyChangeReportHeaders_(currentData.headers || []);
  const dobIdx = getDOBIndex_(currentData.headerMap || {});
  const disenrollEffectiveIdx = findHeaderIndex_(currentData.headerMap || {}, ["Disenrollment Effective Date", "Disenrollment Date"]);
  const reportDisenrollEffectiveIdx = findHeaderIndex_(buildHeaderIndexMap_(reportHeaders), ["Disenrollment Effective Date", "Disenrollment Date"]);
  const allowDuplicateRowsForPMR = sectionTitle === "Contact Changes" || sectionTitle === "Banner Summary Changes";
  const rowsToInsert = [];

  Array.from(pmrSet).sort().forEach(pmr => {
    const items = currentData.rowsByPMR.get(pmr) || [];
    let insertedForThisPMR = false;
    items.forEach(item => {
      if (!allowDuplicateRowsForPMR && insertedForThisPMR) return;
      if (rowMode === "dobOnly" && (dobIdx === -1 || normalizeCompareValue_(item.values[dobIdx]) === "")) return;
      if (rowMode === "strictDisenrollmentEffectiveDate" || rowMode === "disenrollmentEffectiveRange") {
        if (disenrollEffectiveIdx === -1 || !monthParts) return;
        const effectiveDate = item.values[disenrollEffectiveIdx];
        if (!isMonthlyChangeDisenrollmentEffectiveDate_(effectiveDate, monthParts)) return;
      }
      const changedColumns = changedColumnsByPMR && changedColumnsByPMR.has(pmr) ? changedColumnsByPMR.get(pmr) : new Set();
      const previousItems = previousData && previousData.rowsByPMR ? (previousData.rowsByPMR.get(pmr) || []) : [];
      const previousItem = previousItems.length ? previousItems[0] : null;
      
      rowsToInsert.push({
        values: buildMonthlyChangeReportRow_(item.values, currentData.headers, reportHeaders, changedColumns, null, previousItem, previousData ? previousData.headerMap : null),
        changedColumns: changedColumns
      });
      if (!allowDuplicateRowsForPMR) insertedForThisPMR = true;
    });
  });

  if (sectionTitle === "Disenrollments" && reportDisenrollEffectiveIdx !== -1) {
    rowsToInsert.sort((a, b) => {
      const dateA = a.values[reportDisenrollEffectiveIdx] ? new Date(a.values[reportDisenrollEffectiveIdx]) : new Date(0);
      const dateB = b.values[reportDisenrollEffectiveIdx] ? new Date(b.values[reportDisenrollEffectiveIdx]) : new Date(0);
      return dateB - dateA;
    });
  }
  return rowsToInsert;
}

function appendMonthlyChangeCompiledRow_(matrix, rowValues, backgroundColor, fontWeight, fontSize, lastCol) {
  matrix.values.push(padRowToWidth_(rowValues || [], lastCol));
  matrix.backgrounds.push(new Array(lastCol).fill(backgroundColor || "#FFFFFF"));
  matrix.fontWeights.push(new Array(lastCol).fill(fontWeight || "normal"));
  matrix.fontSizes.push(new Array(lastCol).fill(fontSize || 10));
}

function appendMonthlyChangeSectionBlock_(matrix, spec, dataRows, reportHeaders, theme, lastCol, globals) {
  globals = globals || {};
  const titleFontSize = Number(globals.titleFontSize || 14);
  const standardFontSize = Number(globals.standardFontSize || 10);
  
  appendMonthlyChangeCompiledRow_(matrix, [], "#FFFFFF", "normal", standardFontSize, lastCol);
  
  const sectionTitleRow = new Array(lastCol).fill("");
  sectionTitleRow[0] = spec.title;
  
  appendMonthlyChangeCompiledRow_(matrix, sectionTitleRow, theme.level5, "bold", titleFontSize, lastCol);
  appendMonthlyChangeCompiledRow_(matrix, [], "#FFFFFF", "normal", standardFontSize, lastCol);
  appendMonthlyChangeCompiledRow_(matrix, reportHeaders, theme.level2, "bold", standardFontSize, lastCol);
  appendMonthlyChangeCompiledRow_(matrix, [], "#FFFFFF", "normal", standardFontSize, lastCol);

  const activeRows = dataRows && dataRows.length ? dataRows : [{ values: new Array(lastCol).fill(""), changedColumns: new Set() }];
  activeRows.forEach(rowInfo => {
    const row = padRowToWidth_(rowInfo.values || [], lastCol);
    const backgrounds = new Array(lastCol).fill("#FFFFFF");
    if (rowInfo.changedColumns && rowInfo.changedColumns.size > 0) {
      reportHeaders.forEach((header, index) => {
        if (rowInfo.changedColumns.has(header)) backgrounds[index] = "#f3ffc7";
      });
    }
    matrix.values.push(row);
    matrix.backgrounds.push(backgrounds);
    matrix.fontWeights.push(new Array(lastCol).fill("normal"));
    matrix.fontSizes.push(new Array(lastCol).fill(standardFontSize));
  });

  appendMonthlyChangeCompiledRow_(matrix, [], "#FFFFFF", "normal", standardFontSize, lastCol);
}

function populateMonthlyChangeReportSections_(reportSheet, sectionData, monthParts) {
  if (!reportSheet || !sectionData || !sectionData.currentData) return;
  const dashboard = loadDashboardConfig_();
  const globals = dashboard.globals || {};
  const sheetDef = getSheetDefinitionByType_(dashboard, SHEET_TYPE.MONTHLY_CHANGE);
  const currentData = sectionData.currentData;
  const reportHeaders = getMonthlyChangeReportHeaders_(currentData.headers || []);
  const lastCol = Math.max(reportHeaders.length, 1);
  const theme = getThemeColorsFromBase_((sheetDef && sheetDef.baseColor) || "#A165CC", globals);
  const matrix = { values: [], backgrounds: [], fontWeights: [], fontSizes: [] };
  const sectionBlocks = [];

  getMonthlyChangeSectionSpecs_(sectionData).forEach(spec => {
    const dataRows = buildMonthlyChangeSectionRows_(currentData, sectionData.previousData, spec.pmrSet, spec.title, spec.rowMode, spec.changedColumnsByPMR, monthParts);
    sectionBlocks.push({ startOffset: matrix.values.length, spec: spec });
    appendMonthlyChangeSectionBlock_(matrix, spec, dataRows, reportHeaders, theme, lastCol, globals);
  });

  const requiredRows = Math.max(HEADER_ROW + matrix.values.length, 1);
  resizeSheetGrid_(reportSheet, requiredRows, lastCol);
  
  const existingRows = Math.max(reportSheet.getMaxRows() - HEADER_ROW, matrix.values.length, 1);
  reportSheet.getRange(HEADER_ROW + 1, 1, existingRows, lastCol).clear();

  if (matrix.values.length > 0) {
    const targetRange = reportSheet.getRange(HEADER_ROW + 1, 1, matrix.values.length, lastCol);
    targetRange.setValues(matrix.values);
    sectionBlocks.forEach(block => {
      applySubHeaderBlock_(reportSheet, HEADER_ROW + 1 + block.startOffset, block.spec.title, null, reportHeaders, dashboard, sheetDef, { valuesAlreadyWritten: true });
    });
  }
}

function buildMonthlyChangeReportRow_(sourceRow, sourceHeaders, reportHeaders, changedColumns, dateIndexes, previousItem, previousHeaderMap) {
  const output = sourceRow.slice(0, sourceHeaders.length);
  while (output.length < reportHeaders.length) output.push("");

  const changeIdx = reportHeaders.indexOf("Columns With Change");
  if (changeIdx !== -1) {
    if (changedColumns && changedColumns.size > 0) {
      const detailedChangeStrings = [];
      const previousValues = previousItem && previousItem.values ? previousItem.values : [];
      const caseloadFilter = ["Caseload - Social Work", "Caseload - RN", "Caseload - PCP", "Caseload - HCC", "Caseload - Activities", "Caseload - OT", "Caseload - PT", "Caseload - RD", "Caseload - Supervising MD"];

      Array.from(changedColumns).sort().forEach(columnName => {
        if (caseloadFilter.indexOf(columnName) !== -1) {
          const previousColIdx = previousHeaderMap ? previousHeaderMap[columnName] : undefined;
          let previousValueDisplay = "";
          if (previousColIdx !== undefined && previousColIdx !== -1 && previousValues.length > 0) {
            previousValueDisplay = displayValueForReport_(previousValues[previousColIdx]);
          }
          detailedChangeStrings.push(columnName + " -- " + (previousValueDisplay !== "" ? previousValueDisplay : "(blank)"));
        } else {
          detailedChangeStrings.push(columnName);
        }
      });
      output[changeIdx] = detailedChangeStrings.join(", ");
    } else {
      output[changeIdx] = "";
    }
  }
  return convertMonthlyChangeReportDateValues_(output, reportHeaders, dateIndexes);
}

function convertMonthlyChangeReportDateValues_(rowValues, reportHeaders, dateIndexes) {
  const output = rowValues.slice();
  const indexes = dateIndexes || getMonthlyChangeReportDateIndexes_(reportHeaders || []);
  indexes.forEach(idx => {
    if (idx >= output.length) return;
    const value = output[idx];
    if (value instanceof Date && !isNaN(value.getTime())) return;
    const parsed = normalizeToDateObject_(value);
    if (parsed) output[idx] = parsed;
  });
  return output;
}

function getMonthlyChangeReportHeaders_(sourceHeaders) {
  const headers = (sourceHeaders || []).slice();
  if (headers.indexOf("Columns With Change") === -1) headers.push("Columns With Change");
  return headers;
}

function getMonthlyChangeReportDateIndexes_(headers) {
  const indexes = [];
  (headers || []).forEach((header, idx) => {
    if (isDateLikeHeader_(header)) indexes.push(idx);
  });
  return indexes;
}

function buildMonthlyChangeReportSectionLayout_(reportSheet, sourceSheet, headers, monthParts) {
  const reportHeaders = getMonthlyChangeReportHeaders_(headers || []);
  const lastCol = Math.max(reportHeaders.length, 1);

  resizeSheetGrid_(reportSheet, Math.max(reportSheet.getMaxRows(), 10), lastCol);

  reportSheet.getRange("A1").setValue("Monthly Change Report");
  reportSheet.getRange("A2").setValue("Date");
  if (monthParts) {
    reportSheet.getRange("B2").setValue(monthParts.firstDay);
    reportSheet.getRange("C2").setValue("to");
    reportSheet.getRange("D2").setValue(monthParts.lastDay);
  }
  if (reportHeaders.length) {
    reportSheet.getRange(HEADER_ROW, 1, 1, lastCol).setValues([padRowToWidth_(reportHeaders, lastCol)]);
  }

  reportSheet.setFrozenRows(4);
  reportSheet.setFrozenColumns(2);
}

function formatMonthlyChangeReportSectionSheet_(reportSheet, sourceHeaders) {
  if (!reportSheet) return;
  const dashboard = loadDashboardConfig_();
  const reportHeaders = getMonthlyChangeReportHeaders_(sourceHeaders || []);
  applyColumnWidths_(reportSheet, dashboard, reportHeaders);
  applyColumnHidingFromDashboard_(reportSheet, dashboard, reportHeaders);
  reportSheet.setFrozenRows(4);
  reportSheet.setFrozenColumns(2);
}

function getPreviousRawDataSheet_(monthParts) {
  if (!monthParts || !monthParts.previousMonthFirstDay) return null;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return getMonthlySheetByPrefixAndDate_(ss, "Raw Data", monthParts.previousMonthFirstDay, monthParts.previousMonthLastDay);
}
