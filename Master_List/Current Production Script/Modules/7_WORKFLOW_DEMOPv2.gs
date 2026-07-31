// ============================================================================
// 7_WORKFLOW_DEMOP.GS
// Refined Data (Demo P) Pipeline: Raw Data Synthesis, Contact Compilation,
// Banner Summaries, Phone/Address Processing, & Alphabetical Sorting
// ============================================================================

/**
 * Menu Callback: Build Refined Data From Scratch
 * Reads active Raw Data & Banner import tabs and generates a fresh Refined Data sheet.
 */
function buildRefinedDataFromScratch() {
  runWithWorkflowBusyFlag_("Build Refined Data From Scratch", () => {
    logFrameworkTiming_("DEMO_P_BUILD", "Start Demo P Build", "INFO", "Beginning full Refined Data build");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    const monthParts = getMonthDateParts_(new Date());
    const rawSheet = getCurrentRawDataSheet_(monthParts);
    const bannerSheet = getCurrentBannersSheet_(monthParts);

    if (!rawSheet) {
      const msg = "Cannot build Refined Data: Active Raw Data sheet not found.";
      ss.toast(msg, "Error", 5);
      logFrameworkTiming_("DEMO_P_BUILD", "Raw Data Missing", "ERROR", msg);
      flushFrameworkTimingReport_();
      return;
    }

    const dashboard = loadDashboardConfig_();
    const demoPRows = processDemoPRows_(rawSheet, bannerSheet, dashboard);

    if (!demoPRows || demoPRows.length === 0) {
      ss.toast("No active primary participant records found to process.", "Demo P Engine", 5);
      logFrameworkTiming_("DEMO_P_BUILD", "Zero Records Processed", "WARN", "No primary PMR rows identified");
      flushFrameworkTimingReport_();
      return;
    }

    // Locate or create target Refined Data sheet
    let targetSheet = ss.getSheetByName("Refined Data");
    if (!targetSheet) {
      const template = ss.getSheetByName("Template - Refined Data") || ss.getSheetByName("RFF_BASE_TEMPLATE");
      if (template) {
        targetSheet = template.copyTo(ss);
        targetSheet.setName("Refined Data");
      } else {
        targetSheet = ss.insertSheet("Refined Data");
      }
    } else {
      targetSheet.clear();
    }

    targetSheet.showSheet();

    // Headers & Output Matrix Assembly
    const targetHeaders = getHeadersForSheetType_(dashboard, SHEET_TYPE.REFINED_DATA);
    const timestampStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "MM/dd/yyyy HH:mm:ss");

    const fullMatrix = [
      ["Refined Data", "- v1.8.9.8.4 -", "", ""],
      ["Date Created", timestampStr, "", ""],
      ["", "", "", ""],
      targetHeaders
    ];

    demoPRows.forEach(rowObj => {
      const rowArr = targetHeaders.map(h => rowObj[h] !== undefined ? rowObj[h] : "");
      fullMatrix.push(rowArr);
    });

    // Write data & apply structure painter
    applySystemStructure_(targetSheet, targetHeaders.length, fullMatrix, "Refined Data", timestampStr);
    
    targetSheet.setFrozenRows(HEADER_ROW);
    targetSheet.setFrozenColumns(2);

    logFrameworkTiming_("DEMO_P_BUILD", "Complete Demo P Build", "INFO", `Successfully built Refined Data with ${demoPRows.length} participant profiles`);
    flushFrameworkTimingReport_();

    ss.toast(`Refined Data generated cleanly with ${demoPRows.length} participants!`, "Complete", 5);
  });
}

/**
 * Menu Callback: Update Refined Data Monthly Sync
 * Incremental workflow runner to update active Demo P roster.
 */
function updateRefinedDataMonthlySync() {
  buildRefinedDataFromScratch();
}

// ============================================================================
// CORE DATA PROCESSING & TRANSFORMATION ENGINE
// ============================================================================

/**
 * Transforms Raw Data rows into compiled Demo P profile objects.
 */
function processDemoPRows_(rawSheet, bannerSheet, dashboard) {
  logFrameworkTiming_("DEMO_P_TRANSFORM", "Start Transformation", "INFO", "Reading raw values");

  const rawData = getDataValues_(rawSheet, HEADER_ROW, DATA_START_ROW);
  if (!rawData.values.length) return [];

  const rawPmrIdx = getPMRIndex_(rawData.headerMap);
  const primaryIdx = rawData.headerMap["Primary PMR Row"];
  const hMap = rawData.headerMap;

  // Build Banner cross-verification map
  const bannerMap = bannerSheet 
    ? buildSourceMapByCompositeKeyForDemoPBanner_(bannerSheet, HEADER_ROW, DATA_START_ROW, ["Participant PMR#", "Last Name", "First Name"])
    : new Map();

  const bannerHeaders = getHeadersForSheetType_(dashboard, SHEET_TYPE.BANNER)
    .filter(h => h !== "Last Name" && h !== "First Name" && h !== "Participant PMR#");

  const processedRows = [];

  rawData.values.forEach(row => {
    // Filter to primary PMR rows if flag column exists
    if (primaryIdx !== undefined && !isPrimaryPMRRowValue_(row[primaryIdx])) return;

    const pmr = rawPmrIdx !== -1 ? normalizePMR_(row[rawPmrIdx]) : "";
    if (!pmr) return;

    const rowObj = {};
    rawData.headers.forEach((h, idx) => {
      rowObj[h] = row[idx];
    });

    // 1. Cross-sync Banner indicators if available
    const last = String(rowObj["Last Name"] || "").trim();
    const first = String(rowObj["First Name"] || "").trim();
    const compKey = [normalizeKeyPart_(pmr), normalizeKeyPart_(last), normalizeKeyPart_(first)].join("|||");

    const bannerMatch = bannerMap.get(compKey);
    if (bannerMatch) {
      bannerHeaders.forEach(field => {
        if (bannerMatch[field] !== undefined) {
          rowObj[field] = bannerMatch[field];
        }
      });
    }

    // 2. Synthesize Composite Names
    const preferred = String(rowObj["Preferred Name"] || "").trim();
    const nameFormatted = preferred ? `${last}, ${first} (${preferred})` : `${last}, ${first}`;
    rowObj["Participant Name"] = nameFormatted;
    rowObj["Name"] = `${first} ${last}`.trim();

    // 3. Combine Address Fields
    rowObj["Address 1 - Street"] = combineAddressesData_(rowObj);

    // 4. Split Phone Numbers
    splitPhoneNumbersData_(rowObj);

    // 5. Compile Banner Summary Text
    rowObj["Banner Summary"] = updateBannerColumnData_(rowObj, bannerHeaders);

    // 6. Compile Contact Summary Text
    rowObj["Contact - Summary"] = formatContactSummary_(rowObj);

    // 7. Compile Notes Summary
    rowObj["Notes"] = combineNotesSummaryData_(rowObj);

    // 8. Custom Field 1 Language Overrides
    const lang = String(rowObj["Primary Language"] || "").trim().toLowerCase();
    if (lang && lang !== "english") {
      rowObj["Custom Field 1 - Label"] = "Language";
      rowObj["Custom Field 1 - Value"] = rowObj["Primary Language"];
    } else {
      rowObj["Custom Field 1 - Label"] = "";
      rowObj["Custom Field 1 - Value"] = "";
    }

    // 9. Source Hashes & Audit Metadata
    rowObj["Demo P Update Status"] = "ACTIVE";
    rowObj["Demo P Update Month"] = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy");
    rowObj["Demo P Source Sheet"] = rawSheet.getName();

    processedRows.push(rowObj);
  });

  logFrameworkTiming_("DEMO_P_TRANSFORM", "Rows Transformed", "INFO", `Mapped ${processedRows.length} raw records`);

  // Sort Roster Alphabetically by Last Name, then First Name
  processedRows.sort((a, b) => {
    const keyA = `${String(a["Last Name"] || "").toLowerCase()} ${String(a["First Name"] || "").toLowerCase()}`;
    const keyB = `${String(b["Last Name"] || "").toLowerCase()} ${String(b["First Name"] || "").toLowerCase()}`;
    return keyA.localeCompare(keyB);
  });

  return processedRows;
}

// ============================================================================
// TRANSFORMATION HELPERS
// ============================================================================

/**
 * Combines Street, Line 1, Line 2 into a clean single-line address.
 */
function combineAddressesData_(rowObj) {
  const line1 = String(rowObj["Address Line 1"] || "").trim();
  const line2 = String(rowObj["Address Line 2"] || "").trim();
  if (line1 && line2) return `${line1}, ${line2}`;
  return line1 || line2 || "";
}

/**
 * Normalizes phone fields into structured Phone 1..4 Values.
 */
function splitPhoneNumbersData_(rowObj) {
  const primaryPhone = String(rowObj["Phone Number"] || "").trim();
  const ad1 = String(rowObj["AD1 - Phone"] || "").trim();
  const ad2 = String(rowObj["AD2 - Phone"] || "").trim();
  const ad3 = String(rowObj["AD3 - Phone"] || "").trim();

  rowObj["Phone 1 - Label"] = primaryPhone ? "Primary Phone" : "";
  rowObj["Phone 1 - Value"] = primaryPhone;

  rowObj["Phone 2 - Label"] = ad1 ? "Contact AD1 Phone" : "";
  rowObj["Phone 2 - Value"] = ad1;

  rowObj["Phone 3 - Label"] = ad2 ? "Contact AD2 Phone" : "";
  rowObj["Phone 3 - Value"] = ad2;

  rowObj["Phone 4 - Label"] = ad3 ? "Contact AD3 Phone" : "";
  rowObj["Phone 4 - Value"] = ad3;
}

/**
 * Compiles dynamic active Banner headers into a single text summary.
 */
function updateBannerColumnData_(rowObj, bannerHeaders) {
  const activeBanners = [];
  bannerHeaders.forEach(header => {
    const val = String(rowObj[header] || "").trim().toUpperCase();
    if (val === "YES" || val === "TRUE" || val === "Y") {
      activeBanners.push(header);
    }
  });
  return activeBanners.join(" | ");
}

/**
 * Compiles emergency/contact information into a single text block.
 */
function formatContactSummary_(rowObj) {
  const cLast = String(rowObj["Contact - Last Name"] || "").trim();
  const cFirst = String(rowObj["Contact - First Name"] || "").trim();
  const rel = String(rowObj["Relationship"] || "").trim();
  const phone = String(rowObj["AD1 - Phone"] || "").trim();

  if (!cLast && !cFirst) return "";
  
  let summary = `${cLast}, ${cFirst}`.replace(/^,\s*/, "").replace(/,\s*$/, "");
  if (rel) summary += ` (${rel})`;
  if (phone) summary += ` - ${phone}`;

  return summary;
}

/**
 * Combines Banner Summary and Contact Summary into the master Notes field.
 */
function combineNotesSummaryData_(rowObj) {
  const parts = [];
  const bannerSum = String(rowObj["Banner Summary"] || "").trim();
  const contactSum = String(rowObj["Contact - Summary"] || "").trim();
  const addlInfo = String(rowObj["Additional Important Information"] || "").trim();

  if (bannerSum) parts.push(`Banners: ${bannerSum}`);
  if (contactSum) parts.push(`Contact: ${contactSum}`);
  if (addlInfo) parts.push(`Info: ${addlInfo}`);

  return parts.join("\n");
}
