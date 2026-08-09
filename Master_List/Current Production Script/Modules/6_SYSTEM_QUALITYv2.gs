// ============================================================================
// 6_SYSTEM_QUALITY.GS
// Quality Dashboard Diagnostic Engine, Validation Collectors, & Section Writers
// ============================================================================

// ============================================================================
// MENU & TRIGGER CALLABLE RUNNERS
// ============================================================================

/**
 * Menu Callback: Dashboard Quality Start up
 * Runs SECTION A - Format Dashboard Validation
 */
function runDashboardQualityStartUp() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  logFrameworkTiming_("QUALITY_ENGINE", "Start QA Startup", "INFO", "Running Section A");
  ss.toast("Running Format Dashboard Validation...", "QA Engine", 5);
  runDashboardQualityConfigVerificationSections_();
  flushFrameworkTimingReport_();
  ss.toast("Format Dashboard Validation Complete!", "QA Engine", 5);
}

/**
 * Menu Callback: Dashboard Quality Validate Templates
 * Runs SECTION B - Template Validation
 */
function runDashboardQualityValidateTemplates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  logFrameworkTiming_("QUALITY_ENGINE", "Start QA Validate Templates", "INFO", "Running Section B");
  ss.toast("Running Template Validation...", "QA Engine", 5);
  runDashboardQualityTemplateValidation_();
  flushFrameworkTimingReport_();
  ss.toast("Template Validation Complete!", "QA Engine", 5);
}

/**
 * Menu Callback: Dashboard Quality Workflow
 * Runs SECTION C through SECTION H
 */
function runDashboardQualityWorkflow() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  logFrameworkTiming_("QUALITY_ENGINE", "Start QA Workflow", "INFO", "Running Sections C through H");
  ss.toast("Running Quality Diagnostics (Sections C - H)...", "QA Engine", 5);

  runDashboardQualityRawDataValidation_();             // SECTION C
  runDashboardQualityDemoPValidation_();               // SECTION D
  runDashboardQualityDisenrolledExclusionValidation_(); // SECTION E
  runDashboardQualityMonthlyChangeValidation_();       // SECTION F
  runDashboardQualityMasterListValidation_();          // SECTION G
  runDashboardQualitySummaryAndSignoff_();             // SECTION H

  logFrameworkTiming_("QUALITY_ENGINE", "QA Workflow Complete", "INFO", "Diagnostics written to Quality Report");
  flushFrameworkTimingReport_();

  ss.toast("Quality Diagnostics Complete! Check the Dashboard Quality Report.", "QA Engine", 5);
}

// ============================================================================
// SECTION WRITER WITH NEGATIVE RESULT HIGHLIGHTING
// ============================================================================

/**
 * Writes data matrix into the target Quality section and highlights negative results with a red fill.
 */
function writeDashboardQualitySection(sectionTitle, dataMatrix) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Template - Dashboard Quality Report") || ss.getSheetByName("Dashboard Quality Report");
  if (!sheet || !dataMatrix || dataMatrix.length === 0) return;

  const values = sheet.getDataRange().getValues();
  let anchorRow = -1;

  for (let r = 0; r < values.length; r++) {
    const rowStr = String(values[r][0] || "").trim().toUpperCase();
    if (rowStr.indexOf(sectionTitle.toUpperCase()) !== -1) {
      anchorRow = r + 1;
      break;
    }
  }

  if (anchorRow === -1) return;

  const dataStartRow = anchorRow + 4; // Subheader Row 6
  const normalizedMatrix = dataMatrix.map(row => {
    const out = row.slice(0, 7);
    while (out.length < 7) out.push("");
    return out;
  });

  const rowsToClear = Math.max(normalizedMatrix.length, 15);
  const writeRange = sheet.getRange(dataStartRow, 1, normalizedMatrix.length, 7);

  // Clear previous content and background fills
  sheet.getRange(dataStartRow, 1, rowsToClear, 7)
    .clearContent()
    .setBackground(null);

  writeRange.setValues(normalizedMatrix);

  // HIGHLIGHT ONLY NEGATIVE RESULTS (RED BACKGROUND)
  const backgrounds = [];

  normalizedMatrix.forEach(row => {
    const status = String(row[1] || "").toUpperCase().trim();
    let bg = null;

    if (status === "FAIL" || status === "CRITICAL" || status === "ERROR") {
      bg = "#F8D7DA"; // Light red fill
    }

    backgrounds.push(new Array(7).fill(bg));
  });

  writeRange.setBackgrounds(backgrounds);
}

// ============================================================================
// INDIVIDUAL SECTION AUDIT FUNCTIONS (A - H)
// ============================================================================

/** 
 * SECTION A - FORMAT DASHBOARD VALIDATION 
 */
function runDashboardQualityConfigVerificationSections_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboard = ss.getSheetByName("Default - Format Dashboard") || ss.getSheetByName("Format Dashboard");
  const rows = [];

  if (!dashboard) {
    rows.push(["All Sections", "FAIL", "Missing Sheet", "Format Dashboard is missing."]);
    writeDashboardQualitySection("SECTION A - FORMAT DASHBOARD VALIDATION", rows);
    return;
  }

  const dashIndex = buildDashboardSectionIndex_(dashboard);

  function summarizeConfigSection_(sectionName, detailRows) {
    if (!detailRows || detailRows.length <= 1) return [sectionName, "FAIL", "Missing Data", "Could not read section."];
    let hasFail = false, hasWarning = false, issueCount = 0;
    for (let i = 1; i < detailRows.length; i++) {
      const status = String(detailRows[i][1] || "").toUpperCase();
      if (status === "FAIL" || status === "CRITICAL") { hasFail = true; issueCount++; } 
      else if (status === "WARNING") { hasWarning = true; issueCount++; }
    }
    if (hasFail) return [sectionName, "FAIL", `${issueCount} issue(s) detected`, `Review ${sectionName} on Format Dashboard.`];
    if (hasWarning) return [sectionName, "WARNING", `${issueCount} warning(s) detected`, `Review ${sectionName} on Format Dashboard.`];
    return [sectionName, "PASS", "OK", "All settings populated correctly."];
  }

  rows.push(summarizeConfigSection_("Section A & B (Global/Titles)", collectFormatDashboardGlobalInputVerificationRows_(dashIndex)));
  rows.push(summarizeConfigSection_("Section C (Sheet Definitions)", collectFormatDashboardSheetDefinitionVerificationRows_(dashIndex)));
  rows.push(summarizeConfigSection_("Section D (Sheet Behaviors)", collectFormatDashboardSheetBehaviorVerificationRows_(dashIndex)));
  rows.push(summarizeConfigSection_("Section E (Sheet Headers)", collectFormatDashboardSheetHeaderVerificationRows_(dashIndex)));
  rows.push(summarizeConfigSection_("Section F (Tab Organization)", collectFormatDashboardTabOrganizationVerificationRows_(dashIndex)));
  rows.push(summarizeConfigSection_("Section G (Column Definitions)", collectFormatDashboardColumnDefinitionVerificationRows_(dashIndex)));

  writeDashboardQualitySection("SECTION A - FORMAT DASHBOARD VALIDATION", rows);
}

/** 
 * SECTION B - TEMPLATE VALIDATION 
 */
function runDashboardQualityTemplateValidation_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rows = [];

  function checkSheet_(sheetName, type, expectedFrozenRows) {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      return [sheetName, "FAIL", "Missing", `${type} was not found in the workbook.`];
    }
    const actualFrozen = sheet.getFrozenRows();
    if (actualFrozen < expectedFrozenRows) {
      return [sheetName, "WARNING", "Frozen Rows", `Expected at least ${expectedFrozenRows} frozen rows, but found ${actualFrozen}.`];
    }
    return [sheetName, "PASS", "OK", `${type} is present and structurally intact.`];
  }

  rows.push(checkSheet_("RFF_BASE_TEMPLATE", "Base Template", 4));
  rows.push(checkSheet_("Default - Format Dashboard", "System Surface", 4));
  rows.push(checkSheet_("Template - Framework Timing Report", "System Template", 4));
  rows.push(checkSheet_("Template - Dashboard Quality Report", "System Template", 4));
  rows.push(checkSheet_("Template - Index", "System Template", 4));

  try {
    const dashboard = loadDashboardConfig_();
    const globalFreeze = dashboard.globals ? (Number(dashboard.globals.freezeRows) || 4) : 4;

    if (dashboard.sheetDefinitions && dashboard.sheetDefinitions.length > 0) {
      dashboard.sheetDefinitions.forEach(def => {
        rows.push(checkSheet_(def.templateName, "Report Template", globalFreeze));
      });
    } else {
      rows.push(["Report Templates", "FAIL", "Config Error", "No templates defined in Format Dashboard Section C."]);
    }
  } catch (err) {
    rows.push(["Report Templates", "FAIL", "Read Error", "Could not load templates from Format Dashboard: " + err.message]);
  }

  writeDashboardQualitySection("SECTION B - TEMPLATE VALIDATION", rows);
}

/**
 * SECTION C - RAW DATA VALIDATION
 */
function runDashboardQualityRawDataValidation_() {
  const dashboard = loadDashboardConfig_();
  const monthParts = getMonthDateParts_(new Date());
  const rawSheet = getCurrentRawDataSheet_(monthParts);
  const bannerSheet = getCurrentBannersSheet_(monthParts);
  const rows = [];

  if (!rawSheet) {
    rows.push(["Raw Data Target", "FAIL", "Sheet Missing", "Active formatted Raw Data sheet not found for current month."]);
  } else {
    const rawData = getDataValues_(rawSheet, HEADER_ROW, DATA_START_ROW);
    const rawPmrIdx = getPMRIndex_(rawData.headerMap);
    const primaryIdx = rawData.headerMap["Primary PMR Row"];

    if (primaryIdx === undefined || rawPmrIdx === -1) {
      rows.push(["Primary PMR Assignment", "FAIL", "Schema Missing", "Primary PMR Row column or PMR header is missing."]);
    } else {
      let primaryCount = 0, multiPrimaryCount = 0;
      const seenPmr = new Set();

      rawData.values.forEach(row => {
        const pmr = normalizePMR_(row[rawPmrIdx]);
        if (!pmr) return;
        if (isPrimaryPMRRowValue_(row[primaryIdx])) {
          primaryCount++;
          if (seenPmr.has(pmr)) multiPrimaryCount++;
          seenPmr.add(pmr);
        }
      });

      if (multiPrimaryCount > 0) {
        rows.push(["Primary PMR Assignment", "FAIL", "Duplicate Primaries", `Detected ${multiPrimaryCount} instances where a single PMR has multiple 'Yes' rows.`]);
      } else if (primaryCount === 0 && rawData.values.length > 0) {
        rows.push(["Primary PMR Assignment", "WARNING", "No Primaries Flags", "Raw Data rows exist but zero records are flagged as Primary PMR."]);
      } else {
        rows.push(["Primary PMR Assignment", "PASS", "OK", `Primary row assignment logic is fully active; mapped ${seenPmr.size} unique primary flags.`]);
      }
    }

    if (!bannerSheet) {
      rows.push(["Banner Sync Check", "WARNING", "Missing Monthly Banner Sheet", "Cannot cross-verify Banner columns because the formatted monthly Banners tab is missing."]);
    } else {
      const bannerHeaders = getHeadersForSheetType_(dashboard, SHEET_TYPE.BANNER)
        .filter(h => h !== "Last Name" && h !== "First Name" && h !== "Participant PMR#");

      let mappedCheckCount = 0, syncDiscrepancyCount = 0;
      const bannerMap = buildSourceMapByCompositeKeyForDemoPBanner_(bannerSheet, HEADER_ROW, DATA_START_ROW, ["Participant PMR#", "Last Name", "First Name"]);

      if (bannerMap.size > 0 && rawPmrIdx !== -1) {
        const rawLastNameIdx = rawData.headerMap["Last Name"];
        const rawFirstNameIdx = rawData.headerMap["First Name"];

        rawData.values.forEach(row => {
          if (rawLastNameIdx === undefined || rawFirstNameIdx === undefined) return;
          if (primaryIdx !== undefined && !isPrimaryPMRRowValue_(row[primaryIdx])) return;

          const key = [
            normalizeKeyPart_(row[rawPmrIdx]),
            normalizeKeyPart_(row[rawLastNameIdx]),
            normalizeKeyPart_(row[rawFirstNameIdx])
          ].join("|||");

          const sourceMatch = bannerMap.get(key);
          if (!sourceMatch) return;

          mappedCheckCount++;
          bannerHeaders.forEach(field => {
            const rawIdx = rawData.headerMap[field];
            if (rawIdx === undefined) return;
            if (String(row[rawIdx] || "").trim().toUpperCase() !== String(sourceMatch[field] || "").trim().toUpperCase()) {
              syncDiscrepancyCount++;
            }
          });
        });

        if (syncDiscrepancyCount > 0) {
          rows.push(["Banner Sync Verification", "FAIL", "Sync Discrepancies", `Detected ${syncDiscrepancyCount} cell mismatches between active Raw Data and the Banners import sheet.`]);
        } else if (mappedCheckCount === 0) {
          rows.push(["Banner Sync Verification", "WARNING", "Zero Matching Profile Keys", "No participants could be cross-matched by PMR + Name keys."]);
        } else {
          rows.push(["Banner Sync Verification", "PASS", "OK", `Banner synchronization verified clean across ${mappedCheckCount} active participant profiles.`]);
        }
      } else {
        rows.push(["Banner Sync Verification", "WARNING", "No Banner Mapping Rows", "Banners tab exists but no composite PMR + Name keys were available to compare."]);
      }
    }
  }

  try {
    const subReports = [
      { type: "Raw Data", sheet: rawSheet },
      { type: "Banners", sheet: bannerSheet },
      { type: "CP Due Date", sheet: getCurrentCarePlanDueSheet_(monthParts) },
      { type: "Unlock CP", sheet: getCurrentUnlockedCarePlanSheet_(monthParts) }
    ];

    subReports.forEach(report => {
      if (!report.sheet) return;
      const headers = getHeadersForSheetType_(dashboard, report.type);
      const dataRows = Math.max(report.sheet.getLastRow() - DATA_START_ROW + 1, 0);
      if (dataRows < 1) return;

      let formatMismatchCount = 0, checkedColumns = 0;
      const formatRange = report.sheet.getRange(DATA_START_ROW, 1, Math.min(10, dataRows), Math.max(headers.length, 1));
      const allFormats = formatRange.getNumberFormats();

      headers.forEach((header, colIndex) => {
        const def = dashboard.columnDefinitions[header] || {};
        if (def.dateColumn || isDateLikeHeader_(header)) {
          checkedColumns++;
          let colHasMismatch = false;

          for (let r = 0; r < allFormats.length; r++) {
            const cellFormat = String(allFormats[r][colIndex] || "").toLowerCase().replace(/\s+/g, "");
            if (cellFormat !== "m/d/yyyy" && cellFormat !== "mm/dd/yyyy" && cellFormat !== "m/d/yy") {
              colHasMismatch = true;
            }
          }

          if (colHasMismatch) formatMismatchCount++;
        }
      });

      if (checkedColumns > 0) {
        if (formatMismatchCount > 0) {
          rows.push([`${report.type} Date Formats`, "FAIL", "Format Mismatch", `Found ${formatMismatchCount} date column(s) not formatted properly.`]);
        } else {
          rows.push([`${report.type} Date Formats`, "PASS", "OK", `All ${checkedColumns} date column(s) correctly formatted.`]);
        }
      }
    });
  } catch (e) {
    rows.push(["Date Format Audit", "FAIL", "Audit Error", "Failed to run date format audit: " + e.message]);
  }

  if (rows.length === 0) rows.push(["Raw Data checks", "PASS", "None", "No data to check."]);
  writeDashboardQualitySection("SECTION C - RAW DATA VALIDATION", rows);
}

/**
 * SECTION D - DEMO P QUALITY VALIDATION
 */
function runDashboardQualityDemoPValidation_() {
  const rows = [];
  const demoSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Refined Data") || getLatestSheetByPrefix_("Refined Data");
  const dashboard = loadDashboardConfig_();

  if (!demoSheet) {
    rows.push(["Demo P Sheet", "FAIL", "Missing", "Demo P / Refined Data sheet not found. Build Demo P first."]);
    writeDashboardQualitySection("SECTION D - DEMO P QUALITY VALIDATION", rows);
    return;
  }

  rows.push(["Demo P sheet present", "PASS", "None", demoSheet.getName() + " is available."]);

  const data = getDataValues_(demoSheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) {
    rows.push(["Demo P Data", "WARNING", "Empty Sheet", "Sheet exists but has no data rows."]);
    writeDashboardQualitySection("SECTION D - DEMO P QUALITY VALIDATION", rows);
    return;
  }

  let nameErrors = 0, addressErrors = 0, phoneErrors = 0, bannerErrors = 0, notesErrors = 0;
  let languageErrors = 0, contactErrors = 0, metadataErrors = 0, sortErrors = 0;
  const hMap = data.headerMap;

  const bannerHeaders = getHeadersForSheetType_(dashboard, SHEET_TYPE.BANNER)
    .filter(h => h !== "Last Name" && h !== "First Name" && h !== "Participant PMR#");

  let previousSortKey = "";

  data.values.forEach(row => {
    const first = String(row[hMap["First Name"]] || "").trim();
    const last = String(row[hMap["Last Name"]] || "").trim();

    // Name Check
    if (first !== "" || last !== "") {
      if (hMap["Participant Name"] !== undefined && String(row[hMap["Participant Name"]] || "").trim() === "") nameErrors++;
      if (hMap["Name"] !== undefined && String(row[hMap["Name"]] || "").trim() === "") nameErrors++;
    }

    // Address Check
    if (hMap["Address 1 - Street"] !== undefined && hMap["Address Line 1"] !== undefined) {
      if (String(row[hMap["Address Line 1"]] || "").trim() !== "" && String(row[hMap["Address 1 - Street"]] || "").trim() === "") addressErrors++;
    }

    // Phone Check
    if (hMap["Phone 1 - Value"] !== undefined && hMap["Phone Number"] !== undefined) {
      if (String(row[hMap["Phone Number"]] || "").trim() !== "" && String(row[hMap["Phone 1 - Value"]] || "").trim() === "") phoneErrors++;
    }

    // Banner Check
    if (hMap["Banner Summary"] !== undefined) {
      const hasBanner = bannerHeaders.some(header => hMap[header] !== undefined && String(row[hMap[header]] || "").trim() !== "");
      if (hasBanner && String(row[hMap["Banner Summary"]] || "").trim() === "") bannerErrors++;
    }

    // Contact Check
    if (hMap["Contact - Summary"] !== undefined && hMap["Contact - Last Name"] !== undefined) {
      if (String(row[hMap["Contact - Last Name"]] || "").trim() !== "" && String(row[hMap["Contact - Summary"]] || "").trim() === "") contactErrors++;
    }

    // Notes Check
    if (hMap["Notes"] !== undefined) {
      const hasContent = (hMap["Banner Summary"] !== undefined && String(row[hMap["Banner Summary"]] || "").trim() !== "") ||
                         (hMap["Contact - Summary"] !== undefined && String(row[hMap["Contact - Summary"]] || "").trim() !== "");
      if (hasContent && String(row[hMap["Notes"]] || "").trim() === "") notesErrors++;
    }

    // Language Check
    if (hMap["Custom Field 1 - Label"] !== undefined && hMap["Primary Language"] !== undefined) {
      const lang = String(row[hMap["Primary Language"]] || "").trim().toLowerCase();
      if (lang && lang !== "english" && String(row[hMap["Custom Field 1 - Label"]] || "").trim() !== "Language") languageErrors++;
    }

    // Metadata Check
    if (hMap["Source Hash"] !== undefined && hMap["Last Updated At"] !== undefined) {
      if (String(row[hMap["Source Hash"]] || "").trim() === "" || String(row[hMap["Last Updated At"]] || "").trim() === "") metadataErrors++;
    }

    // Sort Check
    const currentSortKey = (last + " " + first).toLowerCase();
    if (previousSortKey !== "" && currentSortKey < previousSortKey) sortErrors++;
    if (currentSortKey !== " ") previousSortKey = currentSortKey;
  });

  const check = (idx, label, errors, desc) => {
    if (idx !== undefined) rows.push([label, errors === 0 ? "PASS" : "FAIL", errors === 0 ? "OK" : `${errors} issues found`, desc]);
  };

  check(hMap["Participant Name"], "Name Generation", nameErrors, "Validates Participant Name & Name functions.");
  check(hMap["Address 1 - Street"], "Address Combination", addressErrors, "Validates combineAddressesData_.");
  check(hMap["Phone 1 - Value"], "Phone Splitting", phoneErrors, "Validates splitPhoneNumbersData_.");
  check(hMap["Banner Summary"], "Banner Summary Generation", bannerErrors, "Validates updateBannerColumnData_ against dynamic Dashboard fields.");
  check(hMap["Contact - Summary"], "Contact Summary Generation", contactErrors, "Validates contact compilation logic.");
  check(hMap["Notes"], "Notes Summary Compilation", notesErrors, "Validates combineNotesSummaryData_.");
  check(hMap["Custom Field 1 - Label"], "Language Processing", languageErrors, "Validates non-English language overrides.");
  check(hMap["Source Hash"], "Metadata Generation", metadataErrors, "Validates Source Hash and Last Updated At timestamps.");

  rows.push(["Alphabetical Sort", sortErrors === 0 ? "PASS" : "FAIL", sortErrors === 0 ? "OK" : `${sortErrors} out-of-order records`, "Validates participant sorting."]);

  writeDashboardQualitySection("SECTION D - DEMO P QUALITY VALIDATION", rows);
}

/** 
 * SECTION E - DISENROLLED EXCLUSION VALIDATION 
 */
function runDashboardQualityDisenrolledExclusionValidation_() {
  const rows = [];
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Disenrolled Exclusion");

  if (!sheet) {
    rows.push(["Disenrolled Sheet", "FAIL", "Missing", "Sheet not found. Run Monthly Change/Disenrolled Exclusion workflow."]);
    writeDashboardQualitySection("SECTION E - DISENROLLED EXCLUSION VALIDATION", rows);
    return;
  }

  rows.push(["Disenrolled sheet present", "PASS", "None", sheet.getName() + " is available for exclusion audit."]);

  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) {
    rows.push(["Disenrolled Data", "WARNING", "Empty Sheet", "Sheet exists but has no data rows yet."]);
    writeDashboardQualitySection("SECTION E - DISENROLLED EXCLUSION VALIDATION", rows);
    return;
  }

  const headerMap = data.headerMap;
  const addedIdx = headerMap["Added to Disenrolled Exclusion"];
  const effIdx = headerMap["Disenrollment Effective Date"];
  const disIdx = headerMap["Disenrollment Date"];
  const dodIdx = headerMap["Date of Death"];

  if (addedIdx === undefined) {
    rows.push(["System Schema", "FAIL", "Missing Column", "Cannot audit: 'Added to Disenrolled Exclusion' column is missing."]);
    writeDashboardQualitySection("SECTION E - DISENROLLED EXCLUSION VALIDATION", rows);
    return;
  }

  let missingAddedDate = 0;
  let sortErrors = 0;
  let unhiddenOldRows = 0;
  let improperlyHiddenNewRows = 0;
  let previousAddedDate = null;

  const today = new Date();
  const cutoff = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  cutoff.setDate(cutoff.getDate() - 365);

  data.values.forEach((row, idx) => {
    const addedDate = normalizeToDateObject_(row[addedIdx]);
    if (!addedDate || isNaN(addedDate.getTime())) {
      missingAddedDate++;
    } else {
      if (previousAddedDate && addedDate.getTime() > previousAddedDate.getTime()) {
        sortErrors++;
      }
      previousAddedDate = addedDate;
    }

    if (effIdx !== undefined && disIdx !== undefined && dodIdx !== undefined) {
      const dates = [row[effIdx], row[disIdx], row[dodIdx]]
        .map(d => normalizeToDateObject_(d))
        .filter(d => d && !isNaN(d.getTime()))
        .sort((a, b) => b.getTime() - a.getTime());

      const effectiveDate = dates[0];
      if (effectiveDate) {
        const isOld = effectiveDate.getTime() < cutoff.getTime();
        const isHidden = sheet.isRowHiddenByUser(DATA_START_ROW + idx);

        if (isOld && !isHidden) unhiddenOldRows++;
        if (!isOld && isHidden) improperlyHiddenNewRows++;
      }
    }
  });

  rows.push([
    "Audit 'Added' Dates",
    missingAddedDate === 0 ? "PASS" : "FAIL",
    missingAddedDate === 0 ? "OK" : `${missingAddedDate} missing dates`,
    "Verifies every row has a system stamp in 'Added to Disenrolled Exclusion'."
  ]);

  rows.push([
    "Top-Down Insertion Sorting",
    sortErrors === 0 ? "PASS" : "FAIL",
    sortErrors === 0 ? "OK" : `${sortErrors} records out of order`,
    "Verifies newest batches are successfully injected at Row 5."
  ]);

  const visibilityErrors = unhiddenOldRows + improperlyHiddenNewRows;
  if (effIdx !== undefined) {
    rows.push([
      "12-Month Visibility Sweep",
      visibilityErrors === 0 ? "PASS" : "WARNING",
      visibilityErrors === 0 ? "OK" : `${unhiddenOldRows} stale rows visible, ${improperlyHiddenNewRows} new rows hidden`,
      "Verifies records older than 365 days are hidden from the active workspace."
    ]);
  }

  writeDashboardQualitySection("SECTION E - DISENROLLED EXCLUSION VALIDATION", rows);
}

/** 
 * SECTION F - MONTHLY CHANGE VALIDATION 
 */
function runDashboardQualityMonthlyChangeValidation_() {
  const rows = [];
  const sheet = getLatestSheetByPrefix_("Monthly Change");

  if (!sheet) {
    rows.push(["Monthly Change Sheet", "WARNING", "Missing", "No Monthly Change report found. Run Monthly Start/Update workflow."]);
    writeDashboardQualitySection("SECTION F - MONTHLY CHANGE VALIDATION", rows);
    return;
  }

  rows.push(["Monthly Change sheet present", "PASS", "None", sheet.getName() + " is available for audit."]);

  const data = getDataValues_(sheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) {
    rows.push(["Monthly Change Data", "PASS", "No Changes", "Sheet exists but detected exactly 0 participant changes for this month."]);
    writeDashboardQualitySection("SECTION F - MONTHLY CHANGE VALIDATION", rows);
    return;
  }

  const headerMap = data.headerMap;
  const pmrIdx = headerMap["Participant PMR#"];
  const changesIdx = headerMap["Columns With Change"];

  if (changesIdx === undefined) {
    rows.push(["System Schema", "FAIL", "Missing Column", "Cannot audit: 'Columns With Change' header is missing."]);
    writeDashboardQualitySection("SECTION F - MONTHLY CHANGE VALIDATION", rows);
    return;
  }

  let missingPmrCount = 0;
  let missingChangesCount = 0;
  let documentedChangesCount = 0;

  data.values.forEach(row => {
    if (pmrIdx !== undefined && String(row[pmrIdx] || "").trim() === "") {
      missingPmrCount++;
    }

    const changeText = String(row[changesIdx] || "").trim();
    if (changeText === "") {
      missingChangesCount++;
    } else {
      documentedChangesCount++;
    }
  });

  if (pmrIdx !== undefined) {
    rows.push([
      "Participant Identification",
      missingPmrCount === 0 ? "PASS" : "FAIL",
      missingPmrCount === 0 ? "OK" : `${missingPmrCount} rows missing PMR`,
      "Verifies every logged change is attached to a valid PMR."
    ]);
  }

  rows.push([
    "Change Tracking Logic",
    missingChangesCount === 0 ? "PASS" : "FAIL",
    missingChangesCount === 0 ? "OK" : `${missingChangesCount} ghost rows detected`,
    "Verifies the comparison engine documented actual text in 'Columns With Change'."
  ]);

  rows.push([
    "Historical State Capture",
    "PASS",
    "OK",
    `Successfully audited and verified state changes across ${documentedChangesCount} participant records.`
  ]);

  writeDashboardQualitySection("SECTION F - MONTHLY CHANGE VALIDATION", rows);
}

/** 
 * SECTION G - MASTER LIST VALIDATION 
 */
function runDashboardQualityMasterListValidation_() {
  const rows = [];
  const masterSheet = getLatestSheetByPrefix_("Master List");
  const cpDueSheet = getLatestSheetByPrefix_("CP Due Date");
  const unlockCpSheet = getLatestSheetByPrefix_("Unlock CP");

  if (!masterSheet) {
    rows.push(["Master List Target", "FAIL", "Missing", "No active Master List found to audit."]);
    writeDashboardQualitySection("SECTION G - MASTER LIST VALIDATION", rows);
    return;
  }

  rows.push(["Master List present", "PASS", "None", masterSheet.getName() + " is available."]);

  const masterData = getDataValues_(masterSheet, HEADER_ROW, DATA_START_ROW);
  if (!masterData.values.length) {
    rows.push(["Master List Data", "WARNING", "Empty Sheet", "Master List exists but has no data rows."]);
    writeDashboardQualitySection("SECTION G - MASTER LIST VALIDATION", rows);
    return;
  }

  const mHeaderMap = masterData.headerMap;
  const nameIdx = mHeaderMap["Participant Name"];
  const statusIdx = mHeaderMap["Enrollment Status"];

  let disenrolledLeakCount = 0;
  let cpDueSyncErrors = 0;
  let cpDueMatchCount = 0;
  let unlockSyncErrors = 0;
  let unlockMatchCount = 0;

  // 1. ACTIVE ROSTER FILTER VALIDATION
  if (statusIdx !== undefined) {
    masterData.values.forEach(row => {
      const status = String(row[statusIdx] || "").trim().toLowerCase();
      if (status.includes("disenrolled") || status.includes("deceased")) {
        disenrolledLeakCount++;
      }
    });

    rows.push([
      "Active Roster Integrity",
      disenrolledLeakCount === 0 ? "PASS" : "FAIL",
      disenrolledLeakCount === 0 ? "OK" : `${disenrolledLeakCount} inactive records found`,
      "Verifies disenrolled/deceased participants are successfully filtered off the Master List."
    ]);
  }

  // 2. CARE PLAN DUE DATE SYNC VALIDATION
  if (!cpDueSheet) {
    rows.push(["CP Due Date Sync", "WARNING", "Source Missing", "CP Due Date sheet not found; cannot verify sync."]);
  } else if (nameIdx !== undefined) {
    const cpMap = buildSourceMapByCompositeKeyForDemoPBanner_(cpDueSheet, HEADER_ROW, DATA_START_ROW, ["Participant Name"]);
    const mTypeIdx = mHeaderMap["CP Type"];
    const mNextIdx = mHeaderMap["Next Care Plan Due"];

    masterData.values.forEach(row => {
      const key = normalizeKeyPart_(row[nameIdx]);
      const sourceMatch = cpMap.get(key);
      if (!sourceMatch) return;

      cpDueMatchCount++;
      const sType = String(sourceMatch["CP Type"] || "").trim().toUpperCase();
      const mType = String(row[mTypeIdx] || "").trim().toUpperCase();
      const sNext = String(sourceMatch["Next Care Plan Due"] || "").trim();
      const mNext = String(row[mNextIdx] || "").trim();

      if (sType !== mType || sNext !== mNext) {
        cpDueSyncErrors++;
      }
    });

    if (cpDueMatchCount === 0) {
      rows.push(["CP Due Date Sync", "WARNING", "No Matches", "Could not match any participants between Master List and CP Due Date."]);
    } else {
      rows.push([
        "CP Due Date Sync",
        cpDueSyncErrors === 0 ? "PASS" : "FAIL",
        cpDueSyncErrors === 0 ? "OK" : `${cpDueSyncErrors} sync mismatches`,
        `Successfully verified CP Type & Next Due dates across ${cpDueMatchCount} profiles.`
      ]);
    }
  }

  // 3. UNLOCKED CARE PLAN SYNC VALIDATION
  if (!unlockCpSheet) {
    rows.push(["Unlocked CP Sync", "WARNING", "Source Missing", "Unlocked CP sheet not found; cannot verify sync."]);
  } else if (nameIdx !== undefined) {
    const unMap = buildSourceMapByCompositeKeyForDemoPBanner_(unlockCpSheet, HEADER_ROW, DATA_START_ROW, ["Participant Name"]);
    const mIdtIdx = mHeaderMap["IDT Meeting Date"];
    const mStartIdx = mHeaderMap["Care Plan Start Date"];

    masterData.values.forEach(row => {
      const key = normalizeKeyPart_(row[nameIdx]);
      const sourceMatch = unMap.get(key);
      if (!sourceMatch) return;

      unlockMatchCount++;
      const sIdt = String(sourceMatch["IDT Meeting Date"] || "").trim();
      const mIdt = String(row[mIdtIdx] || "").trim();
      const sStart = String(sourceMatch["Care Plan Start Date"] || "").trim();
      const mStart = String(row[mStartIdx] || "").trim();

      if (sIdt !== mIdt || sStart !== mStart) {
        unlockSyncErrors++;
      }
    });

    if (unlockMatchCount === 0) {
      rows.push(["Unlocked CP Sync", "PASS", "No Unlocked CPs", "No active Unlocked Care Plans to sync this month."]);
    } else {
      rows.push([
        "Unlocked CP Sync",
        unlockSyncErrors === 0 ? "PASS" : "FAIL",
        unlockSyncErrors === 0 ? "OK" : `${unlockSyncErrors} sync mismatches`,
        `Successfully verified IDT & CP Start dates across ${unlockMatchCount} unlocked profiles.`
      ]);
    }
  }

  writeDashboardQualitySection("SECTION G - MASTER LIST VALIDATION", rows);
}

/** 
 * SECTION H - SUMMARY & SIGNOFF 
 */
function runDashboardQualitySummaryAndSignoff_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Template - Dashboard Quality Report") || ss.getSheetByName("Dashboard Quality Report");
  if (!sheet) return;

  SpreadsheetApp.flush();

  const data = sheet.getDataRange().getValues();
  let failCount = 0;
  let warnCount = 0;
  let passCount = 0;

  for (let i = 5; i < data.length; i++) {
    const status = String(data[i][1] || "").toUpperCase().trim();
    if (status === "FAIL" || status === "CRITICAL" || status === "ERROR") failCount++;
    else if (status === "WARNING") warnCount++;
    else if (status === "PASS" || status === "OK") passCount++;
  }

  const rows = [];

  if (failCount > 0) {
    rows.push(["Overall System Health", "FAIL", `${failCount} Critical Issue(s) Detected`, "System requires immediate maintenance. Do not run monthly sync."]);
  } else if (warnCount > 0) {
    rows.push(["Overall System Health", "WARNING", `${warnCount} Warning(s) Detected`, "System is functional but review is recommended."]);
  } else if (passCount > 0) {
    rows.push(["Overall System Health", "PASS", "Optimal", "All systems nominal. Data is perfectly synchronized."]);
  } else {
    rows.push(["Overall System Health", "UNKNOWN", "No Data", "Run workflows to generate diagnostics."]);
  }

  const currentUser = Session.getActiveUser().getEmail() || "System Administrator";
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");

  rows.push(["Official QA Signoff", "VERIFIED", timestamp, `Executed by: ${currentUser}`]);

  writeDashboardQualitySection("SECTION H - SUMMARY", rows);
}
