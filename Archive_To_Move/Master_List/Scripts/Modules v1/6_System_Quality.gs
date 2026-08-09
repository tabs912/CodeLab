/**
 * SECTION C - RAW DATA VALIDATION
 * Refactored to dynamically pull Banner fields from the Format Dashboard.
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

      if (multiPrimaryCount > 0) rows.push(["Primary PMR Assignment", "FAIL", "Duplicate Primaries", `Detected ${multiPrimaryCount} instances where a single PMR has multiple 'Yes' rows.`]);
      else if (primaryCount === 0 && rawData.values.length > 0) rows.push(["Primary PMR Assignment", "WARNING", "No Primaries Flags", "Raw Data rows exist but zero records are flagged as Primary PMR."]);
      else rows.push(["Primary PMR Assignment", "PASS", "OK", `Primary row assignment logic is fully active; mapped ${seenPmr.size} unique primary flags.`]);
    }

    if (!bannerSheet) {
      rows.push(["Banner Sync Check", "WARNING", "Missing Monthly Banner Sheet", "Cannot cross-verify Banner columns because the formatted monthly Banners tab is missing."]);
    } else {
      // DYNAMIC: Pull governed Banner fields directly from the Format Dashboard
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

          const key = [normalizeKeyPart_(row[rawPmrIdx]), normalizeKeyPart_(row[rawLastNameIdx]), normalizeKeyPart_(row[rawFirstNameIdx])].join("|||");
          const sourceMatch = bannerMap.get(key);
          if (!sourceMatch) return;
          mappedCheckCount++;

          bannerHeaders.forEach(field => {
            const rawIdx = rawData.headerMap[field];
            if (rawIdx === undefined) return;
            if (String(row[rawIdx] || "").trim().toUpperCase() !== String(sourceMatch[field] || "").trim().toUpperCase()) syncDiscrepancyCount++;
          });
        });

        if (syncDiscrepancyCount > 0) rows.push(["Banner Sync Verification", "FAIL", "Sync Discrepancies", `Detected ${syncDiscrepancyCount} cell mismatches between active Raw Data and the Banners import sheet.`]);
        else if (mappedCheckCount === 0) rows.push(["Banner Sync Verification", "WARNING", "Zero Matching Profile Keys", "No participants could be cross-matched by PMR + Name keys."]);
        else rows.push(["Banner Sync Verification", "PASS", "OK", `Banner synchronization verified clean across ${mappedCheckCount} active participant profiles.`]);
      } else {
        rows.push(["Banner Sync Verification", "WARNING", "No Banner Mapping Rows", "Banners tab exists but no composite PMR + Name keys were available to compare."]);
      }
    }
  }

  // --- Date Format Audit ---
  try {
    const dashboard = loadDashboardConfig_();
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
            if (cellFormat !== "m/d/yyyy" && cellFormat !== "mm/dd/yyyy" && cellFormat !== "m/d/yy") colHasMismatch = true;
          }
          if (colHasMismatch) formatMismatchCount++;
        }
      });

      if (checkedColumns > 0) {
        if (formatMismatchCount > 0) rows.push([`${report.type} Date Formats`, "FAIL", "Format Mismatch", `Found ${formatMismatchCount} date column(s) not formatted properly.`]);
        else rows.push([`${report.type} Date Formats`, "PASS", "OK", `All ${checkedColumns} date column(s) correctly formatted.`]);
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
 * Refactored to dynamically pull Banner fields from the Format Dashboard.
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
  
  // DYNAMIC: Pull governed Banner fields directly from the Format Dashboard
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

    // Banner Check (Dynamic)
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
