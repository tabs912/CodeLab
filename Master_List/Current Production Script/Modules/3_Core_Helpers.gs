// ============================================================================
// 3_CORE_HELPERS.GS
// Data Normalization, Caching, Array Utilities, and Telemetry Engine
// ============================================================================

// --- TYPE COERCION & STRING NORMALIZATION -----------------------------------

function normalizeHeader_(value) {
  return String(value || "").trim().replace(/[–—]/g, "-").replace(/\s+/g, " ");
}

function normalizePMR_(value) {
  return String(value === null || value === undefined ? "" : value).trim().replace(/\s+/g, "").replace(/\.0$/, "");
}

function normalizeKeyPart_(value) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date && !isNaN(value.getTime())) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return String(year) + month + day;
  }
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizeText_(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function normalizeKey_(value) {
  return normalizeText_(value).toLowerCase();
}

function normalizeCompareValue_(value) {
  if (value === null || value === undefined || value === "") return "";
  if (value instanceof Date) return isNaN(value.getTime()) ? "" : value.getTime();
  if (typeof value === "number" || typeof value === "boolean") return value;
  
  const text = String(value).trim().toLowerCase();
  if (!text) return "";
  
  let output = "";
  let previousWasSpace = false;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    const isSpace = code === 32 || code === 9 || code === 10 || code === 13;
    if (isSpace) {
      if (!previousWasSpace) output += " ";
    } else {
      output += text.charAt(i);
    }
    previousWasSpace = isSpace;
  }
  return output;
}

function valuesAreEqual_(a, b) {
  return normalizeCompareValue_(a) === normalizeCompareValue_(b);
}

function parseBoolean_(value) {
  if (value === true || value === false) return value;
  const text = String(value || "").trim().toLowerCase();
  return ["true", "yes", "y", "1", "x"].indexOf(text) !== -1;
}

function numberOrDefault_(value, fallback) {
  const n = Number(value);
  return isNaN(n) ? fallback : n;
}

function isBlankCell_(value) {
  return value === null || value === undefined || String(value).trim() === "";
}

function safeSheetName_(value) {
  return normalizeText_(value).replace(/[\\\/\?\*\[\]:]/g, "-").substring(0, 99);
}

// --- ARRAY & RANGE UTILITIES ------------------------------------------------

function padRowToWidth_(rowValues, width) {
  const output = (rowValues || []).slice(0, width);
  if (output.length < width) Array.prototype.push.apply(output, new Array(width - output.length).fill(""));
  return output;
}

function normalizeRowsToWidth_(rows, width) {
  return (rows || []).map(row => padRowToWidth_(row, width));
}

// --- DATE & TIME UTILITIES --------------------------------------------------

function normalizeToDateObject_(value) {
  if (value instanceof Date) {
    const time = value.getTime();
    return isNaN(time) || !isReasonableReportDate_(value) ? null : new Date(time);
  }
  if (typeof value === "number" && isFinite(value)) {
    if (value < 30000) return null; // Ignore non-serial numbers
    const serialDate = new Date(Date.UTC(1899, 11, 30));
    serialDate.setUTCDate(serialDate.getUTCDate() + Math.floor(value));
    const localDate = new Date(serialDate.getUTCFullYear(), serialDate.getUTCMonth(), serialDate.getUTCDate());
    return isReasonableReportDate_(localDate) ? localDate : null;
  }
  if (value === null || value === undefined) return null;
  
  const text = String(value).trim();
  if (!text) return null;

  const delimiter = text.indexOf("/") !== -1 ? "/" : (text.indexOf(".") !== -1 ? "." : (text.indexOf("-") !== -1 ? "-" : ""));
  if (delimiter) {
    const parts = text.split(delimiter);
    if (parts.length === 2) {
      let year = Number(parts[1]);
      if (year < 100) year += 2000;
      const monthDate = new Date(year, Number(parts[0]) - 1, 1);
      if (monthDate.getFullYear() === year && monthDate.getMonth() === Number(parts[0]) - 1 && isReasonableReportDate_(monthDate)) return monthDate;
    }
    if (parts.length === 3) {
      let year = Number(parts[2]);
      if (parts[0].length === 4) { year = Number(parts[0]); parts[0] = parts[1]; parts[1] = parts[2]; }
      else if (year < 100) year += year >= 70 ? 1900 : 2000;
      const parsed = new Date(year, Number(parts[0]) - 1, Number(parts[1]));
      if (parsed.getFullYear() === year && parsed.getMonth() === Number(parts[0]) - 1 && parsed.getDate() === Number(parts[1]) && isReasonableReportDate_(parsed)) return parsed;
    }
  }
  
  const timestamp = Date.parse(text);
  const parsedDate = isNaN(timestamp) ? null : new Date(timestamp);
  return parsedDate && isReasonableReportDate_(parsedDate) ? parsedDate : null;
}

function isReasonableReportDate_(date) {
  const year = date.getFullYear();
  return year >= 2000 && year <= 2099;
}

function createLocalDateOnly_(year, month, day) {
  return new Date(year, month, day, 12, 0, 0, 0);
}

function isSameDate_(a, b) {
  const d1 = normalizeToDateObject_(a);
  const d2 = normalizeToDateObject_(b);
  return d1 && d2 && d1.getTime() === d2.getTime();
}

function isDateLikeHeader_(header) {
  const clean = normalizeHeader_(header);
  if (!clean) return false;
  if (clean.toLowerCase().includes("date") || clean.toLowerCase().includes("dob") || clean.toLowerCase().endsWith(" due")) return true;
  return false;
}

function normalizeNumberFormatForCompare_(format) {
  let text = String(format || "").trim().toLowerCase().replace(/\s+/g, "");
  text = text.replace(/\[\$-[^\]]+\]/g, "").replace(/\[[^\]]+\]/g, "").split(";")[0];
  if (/^m{1,2}\/d{1,2}\/yyyy$/.test(text)) return "date:mm/dd/yyyy";
  if (/^m{1,2}\/d{1,2}\/yy$/.test(text)) return "date:mm/dd/yy";
  if (/^m{1,2}\.d{1,2}\.yyyy$/.test(text)) return "date:mm.dd.yyyy";
  if (/^m{1,2}\.d{1,2}\.yy$/.test(text)) return "date:mm.dd.yy";
  return text;
}

function numberFormatsMatch_(actual, expected) {
  return normalizeNumberFormatForCompare_(actual) === normalizeNumberFormatForCompare_(expected);
}

// --- SHEET DATA & HEADER CACHING ENGINE -------------------------------------

function getHeaders_(sheet, headerRow) {
  const key = sheet.getSheetId() + ":" + (headerRow || 4);
  if (getRuntimeCache_().headers[key]) return getRuntimeCache_().headers[key].slice();

  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(headerRow || 4, 1, 1, lastCol).getValues()[0].map(h => String(h || "").trim());

  getRuntimeCache_().headers[key] = headers.slice();
  return headers;
}

function getHeaderMap_(sheet, headerRow) {
  const key = sheet.getSheetId() + ":" + (headerRow || 4);
  if (getRuntimeCache_().headerMaps[key]) return Object.assign({}, getRuntimeCache_().headerMaps[key]);

  const map = buildHeaderIndexMap_(getHeaders_(sheet, headerRow));
  getRuntimeCache_().headerMaps[key] = Object.assign({}, map);
  return map;
}

function buildHeaderIndexMap_(headers) {
  const map = {};
  headers.forEach((header, idx) => {
    const clean = String(header || "").trim();
    if (clean && map[clean] === undefined) map[clean] = idx;
  });
  return map;
}

function findHeaderIndex_(headerMap, possibleNames) {
  for (let i = 0; i < possibleNames.length; i++) {
    if (headerMap[possibleNames[i]] !== undefined) return headerMap[possibleNames[i]];
  }
  return -1;
}

function getPMRIndex_(headerMap) {
  return findHeaderIndex_(headerMap, ["Participant PMR#", "PMR #", "PMR#", "Participant PMR"]);
}

function getDOBIndex_(headerMap) {
  return findHeaderIndex_(headerMap, ["Date of Birth", "DOB", "Participant DOB"]);
}

function getDataValues_(sheet, headerRow, dataStartRow) {
  headerRow = headerRow || 4;
  dataStartRow = dataStartRow || 5;

  const dimensions = getSheetDimensions_(sheet);
  const headers = getHeaders_(sheet, headerRow);
  const headerMap = getHeaderMap_(sheet, headerRow);

  if (dimensions.lastRow < dataStartRow || dimensions.lastCol < 1) {
    return { headers, headerMap, values: [], range: null, lastRow: dimensions.lastRow, lastCol: dimensions.lastCol };
  }

  const range = sheet.getRange(dataStartRow, 1, dimensions.lastRow - dataStartRow + 1, headers.length);
  return { headers, headerMap, values: range.getValues(), range, lastRow: dimensions.lastRow, lastCol: dimensions.lastCol };
}

function getSheetDimensions_(sheet) {
  const key = String(sheet.getSheetId());
  if (getRuntimeCache_().dimensions[key]) return Object.assign({}, getRuntimeCache_().dimensions[key]);

  const dimensions = {
    lastRow: sheet.getLastRow(), lastCol: sheet.getLastColumn(),
    maxRows: sheet.getMaxRows(), maxCols: sheet.getMaxColumns()
  };

  getRuntimeCache_().dimensions[key] = Object.assign({}, dimensions);
  return dimensions;
}

function clearSheetRuntimeCachesForSheet_(sheet) {
  if (!sheet) return;
  const prefix = sheet.getSheetId() + ":";
  Object.keys(getRuntimeCache_().headers).forEach(key => { if (key.indexOf(prefix) === 0) delete getRuntimeCache_().headers[key]; });
  Object.keys(getRuntimeCache_().headerMaps).forEach(key => { if (key.indexOf(prefix) === 0) delete getRuntimeCache_().headerMaps[key]; });
  delete getRuntimeCache_().dimensions[String(sheet.getSheetId())];
}

// --- TELEMETRY & TIMING LOGGERS ---------------------------------------------

function startFrameworkTiming_(processName, monthParts) {
  const now = new Date().getTime();
  return { processName: processName || "Workflow", monthParts: monthParts || null, startMs: now, lastMs: now, steps: [] };
}

function markFrameworkStep_(timing, stepName, details) {
  if (!timing) return;
  const now = new Date().getTime();
  const stepSeconds = (now - timing.lastMs) / 1000;
  const totalSeconds = (now - timing.startMs) / 1000;
  
  let severity = "OK";
  if (/^ERROR\b/i.test(stepName)) severity = "CRITICAL";
  else if (stepSeconds >= 60) severity = "CRITICAL";
  else if (stepSeconds >= 30) severity = "BOTTLENECK";
  else if (stepSeconds >= 10) severity = "SLOW";

  timing.steps.push([
    new Date(), timing.processName, stepName || "Step", Number(stepSeconds.toFixed(3)), Number(totalSeconds.toFixed(3)), severity, details || ""
  ]);
  timing.lastMs = now;
}

function markRuntimeStep_(timing, label, details) {
  markFrameworkStep_(timing, label, details); // Alias routed to central timing logger
}

function writeFrameworkTimingReport_(timing) {
  if (!timing || !timing.steps || timing.steps.length === 0) return;
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Framework Timing Report");
    if (!sheet) return;
    
    const lastRow = Math.max(sheet.getLastRow(), 20);
    const logs = timing.steps.map(row => padRowToWidth_(row, 8));
    
    if (sheet.getMaxRows() < lastRow + logs.length + 5) sheet.insertRowsAfter(sheet.getMaxRows(), logs.length + 10);
    sheet.getRange(lastRow + 1, 1, logs.length, 8).setValues(logs);
    refreshFrameworkTimingSummaries_(sheet);
  } catch (err) {
    Logger.log("Timing telemetry write skipped: " + err.message);
  }
}

function writeRuntimeTimingReport_(timing) {
  writeFrameworkTimingReport_(timing);
}

function logBestEffortWarning_(message, details) {
  const suffix = details ? " | " + details : "";
  Logger.log("[SWALLOWED EXCEPTION - BEST EFFORT] " + String(message || "") + suffix);
}

function formatSeconds_(seconds) {
  const value = Number(seconds || 0);
  if (value < 60) return value.toFixed(2) + " sec";
  const minutes = Math.floor(value / 60);
  return minutes + " min " + (value - (minutes * 60)).toFixed(1) + " sec";
}
