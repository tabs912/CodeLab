// ============================================================================
// WORKFLOW_MASTERLIST.GS
// Master List Creation, Staging, In-Memory Mapping & Source Sync Engine
// ============================================================================

// --- MASTER LIST CREATION & WORKFLOW ORCHESTRATION -------------------------

/**
 * Main workflow entry point for building the Master List for a given month.
 */
function createMasterListForMonth_(monthParts, parentTiming, preflight) {
  if (!monthParts) return null;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const timing = parentTiming || startFrameworkTiming_("Create Master List", monthParts);
  const markStep = function(label, details) {
    if (parentTiming) markFrameworkStep_(timing, "Create Monthly Update - Create Master List - " + label, details || "");
    else markRuntimeStep_(timing, label, details);
  };
  
  let masterSheet = null;
  let copiedRowCount = 0;
  
  try {
    markStep("Start");
    const demoSheet = getCurrentDemoPSheet_(monthParts);
    if (!demoSheet) {
      notify_("Refined Data sheet for that month was not found. Build Refined Data first.");
      markStep("Stopped - missing Refined Data");
      if (!parentTiming) writeRuntimeTimingReport_(timing);
      return null;
    }
    
    const masterName = buildMonthlySheetName_(MASTER_LIST_PREFIX, monthParts.firstDay, monthParts.lastDay);
    const existingMasterSheet = ss.getSheetByName(masterName);
    
    if (existingMasterSheet) {
      const replacementAlreadyConfirmed = !!(preflight && preflight.masterListExistsAndReplaceConfirmed && preflight.masterListName === masterName);
      if (!replacementAlreadyConfirmed) {
        const ui = SpreadsheetApp.getUi();
        const response = ui.alert("Master List Exists", `${masterName} already exists. Replace it?`, ui.ButtonSet.YES_NO);
        if (response !== ui.Button.YES) {
          notify_("Create Master List cancelled.");
          markStep("Cancelled - existing Master List not replaced");
          if (!parentTiming) writeRuntimeTimingReport_(timing);
          return null;
        }
      } else {
        markStep("Existing Master List replacement confirmed during preflight");
      }
    }
    
    const masterBuildName = existingMasterSheet ? buildStagedMasterListSheetName_(masterName) : masterName;
    masterSheet = createMasterListSheetFromTemplate_(ss, masterBuildName, monthParts, timing, parentTiming ? "Create Monthly Update - Create Master List - Canvas detail" : "Create Master List canvas detail");
    
    if (existingMasterSheet) {
      hideSheetIfNeeded_(masterSheet, timing, "Master List staged build hidden until validation: " + masterBuildName);
    }

    buildMasterListHeadersBeforeDataCopy_(demoSheet, masterSheet);
    markStep("Build Master List headers");

    const masterHeaders = getHeaders_(masterSheet, HEADER_ROW);
    const masterHeaderMap = getHeaderMap_(masterSheet, HEADER_ROW);
    const mappedRows = buildPrimaryDemoPRowsInMemory_(demoSheet, masterHeaders, masterHeaderMap);
    copiedRowCount = mappedRows.length;
    markStep("Mapped pre-flattened Refined Data rows in memory | Rows: " + copiedRowCount);

    if (copiedRowCount === 0) {
      throw new Error("Cannot create Master List: Refined Data contains no participant rows.");
    }

    const inMemoryData = { headers: masterHeaders, headerMap: masterHeaderMap, values: mappedRows, range: null };

    // Sync sub-reports into memory before pushing to the grid
    syncUnlockedCarePlanSourceIntoData_(inMemoryData, monthParts, null);
    markStep("Sync Unlocked CP to Master List primary rows (in-memory)");

    syncCarePlanDueSourceIntoData_(inMemoryData, monthParts, null);
    markStep("Sync Care Plan Due to Master List primary rows (in-memory)");

    const requiredMasterRows = DATA_START_ROW + copiedRowCount - 1;
    if (masterSheet.getMaxRows() < requiredMasterRows) {
      masterSheet.insertRowsAfter(masterSheet.getMaxRows(), requiredMasterRows - masterSheet.getMaxRows());
    }
    masterSheet.getRange(DATA_START_ROW, 1, copiedRowCount, masterHeaders.length).setValues(inMemoryData.values);
    markStep("Single-pass write complete | Primary synced rows flushed: " + copiedRowCount);

    if (existingMasterSheet) {
      masterSheet = promoteStagedMasterListSheet_(ss, masterSheet, existingMasterSheet, masterName, copiedRowCount, timing, markStep);
    } else {
      setRequiredSheetName_(masterSheet, masterName);
      placeCreatedSheetInConfiguredOrder_(masterSheet);
      markStep("Set final Master List sheet name and place in configured creation order");
    }

    lockFinalOutputRowHeights_(masterSheet, "Master List");
    hideReportTemplates(null, timing);

    if (!parentTiming) {
      writeRuntimeTimingReport_(timing);
      notify_(`Master List created. Copied ${copiedRowCount} Primary PMR row(s) from processed Refined Data.\n\nRuntime: ${formatSeconds_((new Date().getTime() - timing.startMs) / 1000)}`);
    }
    return masterSheet;
  } catch (err) {
    try {
      const failedMasterName = monthParts ? buildMonthlySheetName_(MASTER_LIST_PREFIX, monthParts.firstDay, monthParts.lastDay) : "";
      cleanupFailedStagedMasterListSheet_(ss, masterSheet, failedMasterName, timing, markStep);
    } catch (cleanupErr) {
      logBestEffortWarning_("Master List staged cleanup failed: " + cleanupErr.message);
    }
    if (parentTiming) markFrameworkStep_(timing, "ERROR - Create Master List - " + err.message, err.stack || "");
    else {
      markRuntimeStep_(timing, "ERROR - " + err.message);
      try { writeRuntimeTimingReport_(timing); } catch (reportErr) {}
    }
    throw err;
  }
}

function createMasterList() {
  const monthParts = promptForLockedYearReportMonth_("Create Master List");
  if (!monthParts) return null;
  return createMasterListForMonth_(monthParts, null, null);
}

// --- IN-MEMORY MAPPING & DATA TRANSFORMS ------------------------------------

function buildPrimaryDemoPRowsInMemory_(demoSheet, masterHeaders, masterHeaderMap) {
  const demoData = getDataValues_(demoSheet, HEADER_ROW, DATA_START_ROW);
  const demoHeaders = demoData.headers;
  const demoHeaderMap = demoData.headerMap;
  const pmrIdx = getPMRIndex_(demoHeaderMap);
  if (pmrIdx === -1) throw new Error("Refined Data is missing Participant PMR# column.");

  const aliases = {
    "Participant PMR#": ["PMR #", "PMR#", "Participant PMR"],
    "PMR #": ["Participant PMR#", "PMR#", "Participant PMR"],
    "PMR#": ["Participant PMR#", "PMR #", "Participant PMR"],
    "Participant PMR": ["Participant PMR#", "PMR #", "PMR#"]
  };

  function getMasterTargetIndex_(header) {
    if (masterHeaderMap[header] !== undefined) return masterHeaderMap[header];
    const candidates = aliases[header] || [];
    for (let i = 0; i < candidates.length; i++) {
      if (masterHeaderMap[candidates[i]] !== undefined) return masterHeaderMap[candidates[i]];
    }
    return undefined;
  }

  const output = [];
  const seenPmrs = new Set();
  demoData.values.forEach(row => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr || seenPmrs.has(pmr)) return;
    seenPmrs.add(pmr);

    const out = new Array(masterHeaders.length).fill("");
    demoHeaders.forEach((header, sourceIdx) => {
      if (!header) return;
      const targetIdx = getMasterTargetIndex_(header);
      if (targetIdx !== undefined) out[targetIdx] = row[sourceIdx];
    });
    output.push(out);
  });

  return output;
}

function processMasterListSingleDataPass_(masterSheet, monthParts, pmrFilter, includeMonthlySyncs, timing) {
  assignPrimaryPMRRows_(masterSheet);
  const data = getDataValues_(masterSheet, HEADER_ROW, DATA_START_ROW);
  if (!data.values.length) return;
  
  if (includeMonthlySyncs && monthParts) {
    syncMasterListMonthlySourcesIntoData_(data, monthParts, pmrFilter || null);
  }
  
  populateParticipantNameData_(data, pmrFilter || null);
  updateBannerColumnData_(data, pmrFilter || null);
  combineAddressesData_(data, pmrFilter || null);
  handleLanguageData_(data, pmrFilter || null);
  splitPhoneNumbersData_(data, pmrFilter || null);
  runMasterContactProcessData_(data, pmrFilter || null);
  combineNotesSummaryData_(data, pmrFilter || null);
  
  if (data.range) data.range.setValues(data.values);
}

// --- SUB-REPORT SOURCE SYNCHRONIZATION --------------------------------------

function syncMasterListMonthlySourcesIntoData_(data, monthParts, pmrFilter) {
  syncBannerSourceIntoData_(data, monthParts, pmrFilter || null);
  syncUnlockedCarePlanSourceIntoData_(data, monthParts, pmrFilter || null);
  syncCarePlanDueSourceIntoData_(data, monthParts, pmrFilter || null);
}

function syncBannerSourceIntoData_(data, monthParts, pmrFilter) {
  const sourceSheet = getCurrentBannersSheet_(monthParts);
  if (!sourceSheet) { notify_("Newest Banners sheet was not found. Banner sync skipped."); return; }

  const sourceMap = buildSourceMapBySingleKeyForPart5_(sourceSheet, HEADER_ROW, DATA_START_ROW, "Participant PMR#");
  syncRowsFromSourceMapData_(data, sourceMap, { masterKeyHeaders: ["Participant PMR#"], fields: BANNER_SYNC_FIELDS }, pmrFilter || null);
}

function syncUnlockedCarePlanSourceIntoData_(data, monthParts, pmrFilter) {
  const sourceSheet = getCurrentUnlockedCarePlanSheet_(monthParts);
  if (!sourceSheet) { notify_("Unlocked Care Plan Report was not found. Unlocked sync skipped."); return; }

  const sourceMap = buildSourceMapBySingleKeyForPart5_(sourceSheet, HEADER_ROW, DATA_START_ROW, "PMR #");
  syncRowsFromSourceMapData_(data, sourceMap, {
    masterKeyHeaders: ["Participant PMR#"], sourceKeyHeaders: ["PMR #"],
    fields: [["IDT Meeting Date", "IDT Meeting Date"], ["Care Plan Start Date", "Care Plan Start Date"]]
  }, pmrFilter || null);
}

function syncCarePlanDueSourceIntoData_(data, monthParts, pmrFilter) {
  const sourceSheet = getCurrentCarePlanDueSheet_(monthParts);
  if (!sourceSheet) { notify_("Care Plan Due Report was not found. Care Plan Due sync skipped."); return; }

  const sourceMap = buildSourceMapBySingleKeyForPart5_(sourceSheet, HEADER_ROW, DATA_START_ROW, "Participant Name");
  syncRowsFromSourceMapData_(data, sourceMap, {
    masterKeyHeaders: ["Participant Name"],
    fields: [["Enrollment Date", "Enrollment Date"], ["Last Care Plan", "Last Care Plan"], ["Next Care Plan Due", "Next Care Plan Due"], ["CP Type", "CP Type"]]
  }, pmrFilter || null);
}

function syncRowsFromSourceMapData_(data, sourceMap, config, pmrFilter) {
  if (!data || !data.values || !data.values.length) return;
  const headerMap = data.headerMap;
  const fields = normalizeSyncFieldPairs_(config.fields);
  const targetKeyHeaders = config.sourceKeyHeaders || config.masterKeyHeaders;

  data.values.forEach(function(row) {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    const key = config.masterKeyHeaders.map((header, i) => normalizeSyncKey_(row[headerMap[header]], targetKeyHeaders[i])).join("|||");
    if (key.replace(/\|/g, "") === "" || !sourceMap.has(key)) return;

    const source = sourceMap.get(key);
    fields.forEach(pair => {
      const destIdx = headerMap[pair[0]];
      if (destIdx !== undefined && Object.prototype.hasOwnProperty.call(source, pair[1])) {
        row[destIdx] = source[pair[1]];
      }
    });
  });
}

function buildSourceMapBySingleKeyForPart5_(sheet, headerRow, dataStartRow, keyHeader) {
  const data = getDataValues_(sheet, headerRow || HEADER_ROW, dataStartRow || DATA_START_ROW);
  const map = new Map();
  if (!data.values.length) return map;

  const keyIdx = data.headerMap[keyHeader];
  if (keyIdx === undefined) return map;

  data.values.forEach(row => {
    const key = normalizeSyncKey_(row[keyIdx], keyHeader);
    if (!key) return;
    const record = {};
    data.headers.forEach((header, idx) => { if (header) record[header] = row[idx]; });
    map.set(key, record);
  });
  return map;
}

function normalizeSyncKey_(value, header) {
  if (value === null || value === undefined) return "";
  const text = String(value).trim().toLowerCase();
  const headerName = String(header || "");

  if (headerName.indexOf("PMR") !== -1) return text.replace(/\s+/g, "").replace(/\.0$/, "");
  if (headerName === "Participant Name" || headerName === "Name") {
    if (text.indexOf(",") !== -1) {
      const parts = text.split(",");
      const last = parts[0].trim().replace(/\s+/g, "");
      const first = (parts[1] || "").trim().split(/\s+/)[0].replace(/[^a-z0-9]/g, "");
      return last + first;
    }
    return text.replace(/\s+/g, "");
  }
  return text.replace(/\s+/g, " ");
}

function normalizeSyncFieldPairs_(fields) {
  return fields.map(item => Array.isArray(item) ? item : [item, item]);
}

// --- MASTER CONTACT PROCESSOR & AUDITING ------------------------------------

function runMasterContactProcessData_(data, pmrFilter) {
  if (!data || !data.values || !data.values.length) return;
  writePMRContactsToParticipantRows_(null, data.values, data.headers, data.headerMap, pmrFilter);
}

function writePMRContactsToParticipantRows_(targetSheet, values, headers, headerMap, pmrFilter) {
  if (!values || !values.length || !headers || !headerMap) return values || [];

  const contactTargets = [1, 2, 3, 4, 5, 6, 7, 8].map(n => "Contact - " + n);
  const targetIndexes = contactTargets.map(header => headerMap[header]);
  const summaryIdx = headerMap["Contact - Summary"];
  if (targetIndexes.every(idx => idx === undefined) && summaryIdx === undefined) return values;

  const firstIdx = headerMap["First Name"];
  const lastIdx = headerMap["Last Name"];
  const pmrIdx = getPMRIndex_(headerMap);
  const contactFirstIdx = headerMap["Contact - First Name"];
  const contactLastIdx = headerMap["Contact - Last Name"];
  const relationshipIdx = headerMap["Relationship"];
  const typeIdx = headerMap["Type of Contact"];
  const languageIdx = headerMap["Contact - Primary Language"];

  const contactsByParticipant = new Map();
  values.forEach(row => {
    if (pmrFilter && pmrFilter.size) {
      const pmr = pmrIdx === -1 ? "" : normalizePMR_(row[pmrIdx]);
      if (!pmr || !pmrFilter.has(pmr)) return;
    }
    const participantKey = buildParticipantContactKey_(row, headerMap, pmrIdx, firstIdx, lastIdx);
    if (!participantKey) return;

    const contactFirst = contactFirstIdx !== undefined ? String(row[contactFirstIdx] || "").trim() : "";
    const contactLast = contactLastIdx !== undefined ? String(row[contactLastIdx] || "").trim() : "";
    if (!contactFirst && !contactLast) return;

    if (!contactsByParticipant.has(participantKey)) contactsByParticipant.set(participantKey, new Map());
    const participantContacts = contactsByParticipant.get(participantKey);
    const contactKey = [contactFirst.toLowerCase(), contactLast.toLowerCase()].join("|");
    
    if (!participantContacts.has(contactKey)) {
      participantContacts.set(contactKey, {
        first: contactFirst, last: contactLast, types: new Set(),
        relationships: new Set(), phones: new Set(), language: "", rank: 99
      });
    }

    const entry = participantContacts.get(contactKey);
    const relationship = relationshipIdx !== undefined ? String(row[relationshipIdx] || "").trim() : "";
    const contactType = typeIdx !== undefined ? String(row[typeIdx] || "").trim() : "";
    if (relationship) entry.relationships.add(capitalizeContactPart_(relationship));
    if (contactType) entry.types.add(capitalizeContactPart_(contactType));

    const language = languageIdx !== undefined ? String(row[languageIdx] || "").trim() : "";
    if (language && language.toLowerCase() !== "english") entry.language = language;
  });

  values.forEach(row => {
    if (!shouldProcessRowByPMR_(row, headerMap, pmrFilter)) return;
    const participantKey = buildParticipantContactKey_(row, headerMap, pmrIdx, firstIdx, lastIdx);
    const contacts = participantKey && contactsByParticipant.has(participantKey)
      ? Array.from(contactsByParticipant.get(participantKey).values())
      : [];

    targetIndexes.forEach((targetIdx, idx) => {
      if (targetIdx === undefined) return;
      if (normalizeCompareValue_(row[targetIdx]) === "") {
        row[targetIdx] = contacts[idx] ? formatRankedContact_(contacts[idx]) : "";
      }
    });

    if (summaryIdx !== undefined && normalizeCompareValue_(row[summaryIdx]) === "") {
      row[summaryIdx] = contacts.slice(0, 8).map(formatRankedContact_).filter(Boolean).join("\n");
    }
  });

  return values;
}

function buildParticipantContactKey_(row, headerMap, pmrIdx, firstIdx, lastIdx) {
  const pmr = pmrIdx !== -1 ? normalizePMR_(row[pmrIdx]) : "";
  if (pmr) return "PMR|" + pmr;
  const first = firstIdx !== undefined ? normalizeKeyPart_(row[firstIdx]) : "";
  const last = lastIdx !== undefined ? normalizeKeyPart_(row[lastIdx]) : "";
  if (!first && !last) return "";
  return "NAME|" + first + "|" + last;
}

function capitalizeContactPart_(value) {
  return String(value || "").trim().toLowerCase().replace(/\b\w/g, m => m.toUpperCase());
}

function formatRankedContact_(contact) {
  if (!contact) return "";
  const name = [contact.first, contact.last].filter(Boolean).join(" ").trim();
  const relationshipText = Array.from(contact.relationships || []).join(", ");
  const typeText = Array.from(contact.types || []).join(", ");
  const parts = [name, relationshipText, typeText].filter(Boolean);
  let text = parts.join(" - ");
  if (contact.language) text += " Language--" + contact.language;
  return text;
}

function getPrimaryRowChangedColumnDetails_(masterRow, masterHeaderMap, demoRow, demoHeaderMap) {
  const changes = [];
  const specifics = ["Type of Contact", "Relationship", "Company", "Address 1 - Street", "Notes", "Primary PMR Row", "Sort Order"];

  const headers = Object.keys(demoHeaderMap || {}).filter(header => {
    if (!header || !masterHeaderMap || masterHeaderMap[header] === undefined) return false;
    if (/^(Contact -|Phone [1-4]|AD[1-3] -|Custom Field )/.test(header)) return false;
    return specifics.indexOf(header) === -1;
  });

  headers.forEach(header => {
    const masterValue = masterRow[masterHeaderMap[header]];
    const demoValue = demoRow[demoHeaderMap[header]];

    if (!valuesAreEqual_(masterValue, demoValue)) {
      changes.push({
        column: header,
        masterValue: displayValueForReport_(masterValue),
        demoValue: displayValueForReport_(demoValue)
      });
    }
  });

  return changes;
}

// --- MASTER LIST STAGING & PROMOTION HELPERS --------------------------------

function buildStagedMasterListSheetName_(masterName) {
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMddHHmmss");
  return safeSheetName_(masterName + " __STAGED " + timestamp);
}

function isStagedMasterListSheet_(sheet, masterName) {
  if (!sheet) return false;
  return String(sheet.getName() || "").indexOf(masterName + " __STAGED") === 0;
}

function validateStagedMasterListBeforeSwap_(sheet, masterName, copiedRowCount) {
  if (!sheet || !isStagedMasterListSheet_(sheet, masterName)) throw new Error("Refusing to promote unexpected staged Master List sheet.");
  if (sheet.getLastRow() < HEADER_ROW || sheet.getLastColumn() < 1) throw new Error("Staged Master List is missing required title/header structure.");
  if (Number(copiedRowCount || 0) > 0 && sheet.getLastRow() < DATA_START_ROW) throw new Error("Staged Master List copied rows but has no data area.");
}

function promoteStagedMasterListSheet_(ss, stagedSheet, existingSheet, masterName, copiedRowCount, timing, markStep) {
  validateStagedMasterListBeforeSwap_(stagedSheet, masterName, copiedRowCount);
  if (existingSheet) {
    deleteSheetSafely_(ss, existingSheet, "Master List staged swap", [stagedSheet.getName()]);
    if (markStep) markStep("Delete previous Master List after staged replacement validation");
    stagedSheet.setName(masterName);
    placeCreatedSheetInConfiguredOrder_(stagedSheet);
    showSheetIfNeeded_(stagedSheet, timing, "Master List staged swap promoted: " + masterName);
    clearSheetRuntimeCachesForSheet_(stagedSheet);
    clearMonthlySheetLookupCache_();
    if (markStep) markStep("Promote staged Master List sheet");
  }
  return stagedSheet;
}

function cleanupFailedStagedMasterListSheet_(ss, sheet, masterName, timing, markStep) {
  if (!isStagedMasterListSheet_(sheet, masterName)) return;
  try {
    deleteSheetSafely_(ss, sheet, "failed Master List staged build cleanup", [masterName]);
    if (markStep) markStep("Cleaned failed staged Master List sheet");
  } catch (cleanupErr) {
    logBestEffortWarning_("Failed staged Master List cleanup skipped: " + cleanupErr.message);
  }
}

function buildMasterListHeadersBeforeDataCopy_(demoSheet, masterSheet) {
  if (!masterSheet) return;
  const ss = masterSheet.getParent() || SpreadsheetApp.getActive();
  const template = ss.getSheetByName("Template - Master List");
  const headers = getHeaders_(template || masterSheet, HEADER_ROW);
  if (!headers.length || !headers.some(h => String(h || "").trim())) return;
  
  if (masterSheet.getMaxColumns() < headers.length) {
    masterSheet.insertColumnsAfter(masterSheet.getMaxColumns(), headers.length - masterSheet.getMaxColumns());
  }
  masterSheet.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);
  clearSheetRuntimeCachesForSheet_(masterSheet);
}

// --- MASTER LIST SORTING & DISPLAY ------------------------------------------

function sortMasterListByParticipantNameAndPMR_(sheet) {
  sheet = sheet || SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < DATA_START_ROW || lastCol < 1) return;
  
  sheet.showRows(DATA_START_ROW, lastRow - DATA_START_ROW + 1);
  const headerMap = buildHeaderIndexMap_(getHeaders_(sheet, HEADER_ROW));
  const pmrIdx = getPMRIndex_(headerMap);
  const lastNameIdx = headerMap["Last Name"];
  const firstNameIdx = headerMap["First Name"];
  
  if (pmrIdx === -1 || lastNameIdx === undefined || firstNameIdx === undefined) return;
  
  const range = sheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, lastCol);
  const values = range.getValues();
  const blocksByPMR = new Map();
  
  values.forEach((row, idx) => {
    const pmr = normalizePMR_(row[pmrIdx]);
    if (!pmr) return;
    if (!blocksByPMR.has(pmr)) {
      blocksByPMR.set(pmr, { pmr: pmr, lastName: row[lastNameIdx], firstName: row[firstNameIdx], rows: [] });
    }
    blocksByPMR.get(pmr).rows.push({ row: row, originalIndex: idx });
  });
  
  const blocks = Array.from(blocksByPMR.values());
  blocks.sort((a, b) => {
    const aLast = normalizeKeyPart_(a.lastName);
    const bLast = normalizeKeyPart_(b.lastName);
    if (aLast !== bLast) return aLast < bLast ? -1 : 1;
    const aFirst = normalizeKeyPart_(a.firstName);
    const bFirst = normalizeKeyPart_(b.firstName);
    if (aFirst !== bFirst) return aFirst < bFirst ? -1 : 1;
    return normalizePMR_(a.pmr) < normalizePMR_(b.pmr) ? -1 : 1;
  });
  
  const sortedRows = [];
  blocks.forEach(block => {
    block.rows.sort((a, b) => a.originalIndex - b.originalIndex);
    block.rows.forEach(item => sortedRows.push(item.row));
  });
  
  if (sortedRows.length > 0) range.setValues(sortedRows);
}

function showAllMasterListRows() {
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getMaxRows() >= DATA_START_ROW) {
    sheet.showRows(DATA_START_ROW, sheet.getMaxRows() - DATA_START_ROW + 1);
  }
  notify_("All rows shown.");
}

// =================================
