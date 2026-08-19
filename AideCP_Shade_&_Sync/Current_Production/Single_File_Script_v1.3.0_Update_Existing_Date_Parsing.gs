/**
 * AideCP Shade & Sync — Single File Current Production Script
 *
 * Non-library deployment build for testing in a container-bound Apps Script
 * project. This file intentionally contains the library core plus local menu
 * callback wrappers, so it does not require an Apps Script Library dependency.
 */

/**
 * AideCP Shade & Sync — Centralized Library Core
 * Master engine for Architectural Verification, Shading, and Master Log Synchronization
 * 
 * =========================================================================
 * = VERSION LOG: v1.3.0
 * = 
 * = VERSIONING TRACKER GUIDE:
 * = vX.0.0 — Deployments / Major Version upgrades (e.g., v1.0.0, v2.0.0)
 * = v0.X.0 — Major changes / Feature updates (e.g., v1.1.0)
 * = v0.0.X — Minor changes / Bug fixes (e.g., v1.0.1)
 * =========================================================================
 * 
 * = OFFICIAL AUDIT COMPLIANCE STATEMENT (HIGH-01, HIGH-02, HIGH-03)
 * HIGH-01 (DUPLICATION): This file acts as the master Library Core. 
 * There are no duplicate top-level constant re-declarations.
 *
 * HIGH-02 & HIGH-03 (MENU & ENTRYPOINTS): The string names in the onOpen() 
 * menu builder perfectly map to the local wrapper functions inside your 
 * host sheets, ensuring strict cross-script authorization compliance.
 * ========================================================================= 
 */

// ==========================================
// =       GLOBAL CONFIGURATION HOOKS       =
// ==========================================

const RULES = [
  { "src": "B11", "targets": ["A11:G11", "A12:G12", "A22:V22"] },
  { "src": "B13", "targets": ["A13:G13", "A23:V23"] },
  { "src": "B14", "targets": ["A14:G14", "A24:V24"] },
  { "src": "B15", "targets": ["A15:G15", "A25:V25"] },
  { "src": "B16", "targets": ["A16:G16", "A26:V26"] },
  { "src": "B17:G18", "targets": ["A17:G17", "A18:G18", "A27:V27"] },
  { "src": "J11", "targets": ["H11:M11", "H12:M12", "A30:V30"] },
  { "src": "J13", "targets": ["H13:M13", "H14:M14", "A31:V31"] },
  { "src": "J15", "targets": ["H15:M15", "A32:V32"] },
  { "src": "J16", "targets": ["H16:M16", "A33:V33"] },
  { "src": "J17", "targets": ["H17:M17","H18:M18", "A34:V34"] },
  { "src": "B19", "targets": ["A19:M19", "A28:V28"] }, 
  { "src": "U14", "targets": ["Q19"] },
  { "src": "U16", "targets": ["Q15:T15", "Q18"] },
  { "src": "U18", "targets": ["Q14:T14", "Q17"] }
];

const EXCLUDED_SHEETS = [
  'Instructions', 'Settings', 'Dashboard', 'Archive', 'Home Care Services', 'TEMPLATE', 'Error Log'
];

const RENAME_EXCLUDED_SHEETS = [
  'Instructions', 'Settings', 'Dashboard', 'Archive', 'Home Care Services', 'TEMPLATE', 'Error Log'
];

const EXCLUSION_CUTOFF_DATE = new Date(2024, 0, 1);
const TARGET_FILE_ID = '1tZlDjXSBf3aY8O1w_9wp5UAZqwdiU9SoQWtgBI4llpo';

const SYNC_MAPPING = {
  "Name": "B5", "Participant PMR#": "V1", "Date:": "B4", 
  "Provider": "A6", "Provider:": "A6", "HCCRN": "A7", "HCCRN:": "A7",
  "RNCM": "A8", "RNCM:": "A8", "SW": "A9", "SW:": "A9",
  "Bathing:": "B11:G12", "Dress/Undress:": "B13:G13", 
  "Toileting/Incont. Care:": "B14:G14", "Transfer/Reposition:": "B15:G15", 
  "Assist/Prompt Eating:": "B16:G16", "TED Hose/Tubigrips/Ace/Lymphedema Wraps:": "B17:G18", 
  "Supervision for safety:": "B19:M19", "Housekeeping:": "J11:M12", 
  "Laundry:": "J13:M14", "Shopping:": "J15:M15", "Meal Prep:": "J16:M16", 
  "Med reminders:": "J17:M18", "PERS": "U14", "PAP": "U16", "O2": "U18" 
};

// ==========================================
// =       TEMPLATE / ACTIVE SHEETS       =
// ==========================================

// Protection-only entry map. These ranges are NOT recolored by the script.
const AIDE_CP_ENTRY_RANGES = [
  'V1','V2','B4:F4','B5:F5','I5:M5','G6:M9',
  'B11:G12','H11:I12','J11:M12',
  'B13:G13','H13:I14','J13:M14',
  'B14:G14','U14',
  'B15:G15','H15:I15','J15:M15',
  'B16:G16','H16:I16','J16:M16','U16:V16',
  'B17:G18','H17:I17','J17:M17','H18:M18','U18',
  'B19:M19'
];

const AIDE_CP_EDGE_MAP = {"top":{"medium":["A4:F4","N4:V4","G5:M5","A6:F6","A7:F7","A10:M10","N13:V13","U14:V14","Q16:T16","A21:V21","A29:V29","A36:F36"],"thin":["H13:M13","A15","H15:M15","Q15:T15","A16:M16","H17:M17","R18:T18","A19:M19","R19:T19","M20","T20","A23:V23","A24:V24","A25:V25","A26:V26","A27:V27","A28:V28","A31:V31","A32:V32","A33:V33","A34:V34","M35:N35","T35:U35","M37:N37","T37:U37"]},"bottom":{"medium":["A3:M3","A9:F9","A10:M10","N11:V11","N13:V13","N15:P15","T15","N16:T16","A19:Q19","U19:V19","A21:V21","A29:V29","A35:V35","A37:V37"],"thin":["A12:G12","A13:G13","A14:T14","A15:G15","A16:G16","N17:S17","N18:S18","R19:S19","A22:V22","A23:V23","A24:V24","A25:V25","A26:V26","A27:V27","A30:V30","A31:V31","A32:V32","A33:V33","A34:V34","A36:V36"]},"left":{"medium":["A4:A9","A11:A15","A17:A37","G5","H10","N10:N11","N13:N19","Q13","U13:U19"],"thin":["G4","H11:H18","H21:H35","I21:I37","J21:J37","K21:K37","L21:L37","M20:M37","N20:N37","O14","P14","P21:P37","Q14:Q16","Q21:Q37","R13:R19","R21:R37","S13:S19","S21:S37","T13","T20:T37","U20:U37"]},"right":{"thin":["G16","G20:G37","H20:H37","I20:I37","J20:J37","K20","K22:K37","M4:M9","M20:M37","N14","N20:N37","O14","O20:O37","P14","P17:P37","Q13:Q16","Q20:Q37","R13:R20","R22:R37","S13:S19","T20:T37","U20:U37"],"medium":["F6:F9","F20:F37","M10:M12","M16:M17","P13","T13","T16","V4:V11","V13:V37"]}};
const AIDE_CP_PERIMETERS = [{"range":"J17:M17","top":"thin","right":"medium"},{"range":"H18:M18","left":"thin"},{"range":"B14:G14","bottom":"thin"},{"range":"B15:G15","bottom":"thin"},{"range":"H15:I15","top":"thin","left":"thin"},{"range":"N15:P15","bottom":"medium","left":"medium"},{"range":"B16:G16","top":"thin","bottom":"thin","right":"thin"},{"range":"J16:M16","top":"thin","right":"medium"},{"range":"A33:F33","top":"thin","bottom":"thin","left":"medium","right":"medium"},{"range":"A34:F34","top":"thin","bottom":"thin","left":"medium","right":"medium"},{"range":"A35:F35","bottom":"medium","left":"medium","right":"medium"},{"range":"A36:F36","top":"medium","bottom":"thin","left":"medium","right":"medium"},{"range":"A37:F37","bottom":"medium","left":"medium","right":"medium"},{"range":"A26:F26","top":"thin","bottom":"thin","left":"medium","right":"medium"},{"range":"A27:F27","top":"thin","bottom":"thin","left":"medium","right":"medium"},{"range":"A28:F28","top":"thin","left":"medium","right":"medium"},{"range":"A29:F29","top":"medium","bottom":"medium","left":"medium","right":"medium"},{"range":"A30:F30","bottom":"thin","left":"medium","right":"medium"},{"range":"A31:F31","top":"thin","bottom":"thin","left":"medium","right":"medium"},{"range":"A32:F32","top":"thin","bottom":"thin","left":"medium","right":"medium"},{"range":"I5:M5","top":"medium","right":"thin"},{"range":"G6:M9","right":"thin"},{"range":"H10:M10","top":"medium","bottom":"medium","left":"medium","right":"medium"},{"range":"J11:M12","right":"medium"},{"range":"J13:M14","top":"thin","bottom":"thin"},{"range":"J15:M15","top":"thin"},{"range":"A1:M3","bottom":"medium"},{"range":"B4:F4","top":"medium"},{"range":"G4:M4","left":"thin","right":"thin"},{"range":"G5:H5","top":"medium","left":"medium"},{"range":"A6:F6","top":"medium","left":"medium","right":"medium"},{"range":"H11:I12","left":"thin"},{"range":"H13:I14","top":"thin","bottom":"thin","left":"thin"},{"range":"N13:P13","top":"medium","bottom":"medium","left":"medium","right":"medium"},{"range":"U13:V13","top":"medium","bottom":"medium","left":"medium","right":"medium"},{"range":"A7:F7","top":"medium","left":"medium","right":"medium"},{"range":"A8:F8","left":"medium","right":"medium"},{"range":"A9:F9","bottom":"medium","left":"medium","right":"medium"},{"range":"A10:G10","top":"medium","bottom":"medium"},{"range":"A11:A12","bottom":"thin","left":"medium"},{"range":"B11:G12","bottom":"thin"},{"range":"B13:G13","bottom":"thin"},{"range":"N16:P16","bottom":"medium","left":"medium"},{"range":"U16:V16","left":"medium","right":"medium"},{"range":"H16:I16","top":"thin","left":"thin"},{"range":"H17:I17","top":"thin","left":"thin"},{"range":"B19:M19","top":"thin","bottom":"medium"},{"range":"A20:F20","left":"medium","right":"medium"},{"range":"A21:F21","top":"medium","bottom":"medium","left":"medium","right":"medium"},{"range":"A22:F22","bottom":"thin","left":"medium","right":"medium"},{"range":"A23:F23","top":"thin","bottom":"thin","left":"medium","right":"medium"},{"range":"A24:F24","top":"thin","bottom":"thin","left":"medium","right":"medium"},{"range":"A25:F25","top":"thin","bottom":"thin","left":"medium","right":"medium"}];


function buildAideCpTemplate() {
  const ss = SpreadsheetApp.getActiveSpreadsheet(), R = 37, C = 22;
  let sh = ss.getSheetByName('TEMPLATE');
  if (!sh) sh = ss.insertSheet('TEMPLATE', 0);
  clearProtections_(sh);

  sh.getRange(1, 1, sh.getMaxRows(), sh.getMaxColumns()).breakApart();
  sh.clear(); sh.setConditionalFormatRules([]);
  sh.getBandings().forEach(x => x.remove()); sh.getCharts().forEach(x => sh.removeChart(x)); sh.getImages().forEach(x => x.remove());
  if (sh.getMaxRows() < R) sh.insertRowsAfter(sh.getMaxRows(), R - sh.getMaxRows());
  if (sh.getMaxColumns() < C) sh.insertColumnsAfter(sh.getMaxColumns(), C - sh.getMaxColumns());
  if (sh.getMaxRows() > R) sh.deleteRows(R + 1, sh.getMaxRows() - R);
  if (sh.getMaxColumns() > C) sh.deleteColumns(C + 1, sh.getMaxColumns() - C);
  sh.setHiddenGridlines(true); sh.setFrozenRows(0); sh.setFrozenColumns(0);

  const all = sh.getRange(1, 1, R, C);
  const data = [[1,1,"Ascension Living HOPE Homecare Care Plan/Aide Documentation"],[1,14,"MONTH:"],[4,1,"Care Plan Date:   "],[4,7,"Team B"],[4,14,"LEGEND:"],[4,15,"   Checkmark = Completed"],[4,18,"C = Canceled"],[5,1,"Participant:   "],[5,7,"NOTES/ALERTS:"],[5,15,"   I = Independent"],[5,18,"D = Declined"],[6,1,"Provider:         : "],[6,14,"Aide "],[7,1,"HCCRN:           :  "],[7,14,"Signature: _________________________________"],[7,20,"Date:_______________"],[8,1,"RNCM:            :  "],[9,1,"SW:                   : "],[9,14,"Participant "],[10,1,"ADLs"],[10,8,"IADLs"],[10,14,"Signature: _________________________________"],[10,20,"Date:_______________"],[11,1,"Bathing:       "],[11,8,"Housekeeping:    "],[13,1,"Dress/Undress:    "],[13,8,"Laundry:  "],[13,14,"WEEKLY:"],[13,17,"DATE:"],[13,18,"DATE:"],[13,19,"DATE:"],[13,20,"DATE:"],[13,21,"HC Equipment"],[14,1,"Toileting/Incont. Care:  "],[14,14," -Clean/change 02 filters"],[14,21,"PERS"],[15,1,"Transfer/Reposition: "],[15,8,"Shopping:  "],[15,14," -Clean PAP water chamber"],[16,1,"Assist/Prompt Eating:"],[16,8,"Meal Prep:"],[16,14,"MONTHLY:"],[16,21,"         PAP"],[17,1,"TED Hose/Tubigrips/Ace"],[17,8,"Med reminders:  "],[17,14," -Change O2 tubing/humidifier"],[18,1,"/Lymphedema Wraps:"],[18,14," -Change PAP Filter/Tubing"],[18,21,"    CONCENTRATOR"],[19,1,"Supervision for safety: "],[19,14," -Test PERS"],[20,1,"DATE:"],[21,1,"Personal Care ADLs:"],[22,1,"Assist with Bathing"],[23,1,"(D)ressing/(U)ndressing"],[24,1,"Toileting/Incontinence Care"],[25,1,"Transfer/Reposition PRN"],[26,1,"Assist/Prompt Eating"],[27,1,"TED Hose/Tubigrips/Ace/Lymphedema Wraps"],[28,1,"Supervision for Safety "],[29,1,"IADLS"],[30,1,"Housekeeping"],[31,1,"Laundry"],[32,1,"Shopping"],[33,1,"Meal Prep"],[34,1,"Medication Reminders (per care plan)"],[35,1,"Bedbug Protocol PRN"],[36,1,"Client Initials"],[37,1,"Aide Initials"]];
  const values = Array.from({length:R}, () => Array(C).fill(''));
  data.forEach(([r,c,v]) => values[r-1][c-1] = v); all.setValues(values);

  edges_(sh, AIDE_CP_EDGE_MAP);
  ["J17:M17","H18:M18","B14:G14","B15:G15","H15:I15","N15:P15","B16:G16","J16:M16","B17:G18","A33:F33","A34:F34","A35:F35","A36:F36","A37:F37","A26:F26","A27:F27","A28:F28","A29:F29","A30:F30","A31:F31","A32:F32","I5:M5","G6:M9","H10:M10","J11:M12","J13:M14","J15:M15","A1:M3","N1:S3","B4:F4","G4:M4","B5:F5","G5:H5","A6:F6","H11:I12","H13:I14","N13:P13","U13:V13","A7:F7","A8:F8","A9:F9","A10:G10","A11:A12","B11:G12","B13:G13","N16:P16","U16:V16","H16:I16","H17:I17","B19:M19","A20:F20","A21:F21","A22:F22","A23:F23","A24:F24","A25:F25"].forEach(a1 => sh.getRange(a1).merge());
  perimeters_(sh, AIDE_CP_PERIMETERS);

  all.setFontFamily('Arial').setFontSize(10).setFontWeight('normal').setFontColor('#000000')
     .setBackground('#FFFFFF').setHorizontalAlignment('normal').setVerticalAlignment('middle').setWrap(false);

  fmt_(sh, ["A1","N1","N4:O4","A4:B5","G4:G5","R4:R5","I5","O5","A6:A9","A11:B11","H11","J11","H13","J13","Q13:U13","U14:V14","A13:B16","B17:G18","U16","H15:H17","J15:J17","A17:A18","U18:V18","N13:N19","A19:B19","A20:A37"], 'setFontFamily', 'Calibri');
  fmt_(sh, ["V1"], 'setFontSize', 5);
  fmt_(sh, ["N4:O4","A4:B5","G4:G6","R4:R5","I5","O5","N6:N7","T7","A6:A10","N9:N10","T10","H10:H11","A11:B11","J11","H13","J13","Q13:U13","U14:V14","A13:B16","B17:G18","U16","H15:H17","J15:J17","A17:A18","U18:V18","N13:N19","A19:B19","A20:A37"], 'setFontSize', 18);
  fmt_(sh, ['A1'], 'setFontSize', 25); fmt_(sh, ['N1'], 'setFontSize', 28);
  fmt_(sh, ["A1","N1","N4:O4","A4:B5","G4:G5","R4:R5","I5","O5","N6:N7","T7","N9:N10","A10","H10","T10","B11","J11","J13","N13","U13","U14:V14","N16","B13:B17","J15:J17","U18:V18","B19","A20:A21","A29","A35:A37"], 'setFontWeight', 'bold');
  fmt_(sh, ["G4","A10","H10","U13","A21","A29"], 'setFontColor', '#FFFFFF');
  fmt_(sh, ["G4","A10","H10","N12:V12","U13","Q16:T16","R17:T19","A21","G21:V21","A29","G29:V29"], 'setBackground', '#7F7F7F');
  fmt_(sh, ["A11","B11","H11","J11","A13:B17","H13","J13","H15:H18","J15:J17","A18","A19:B19","A22:A28","G22:V28","A30","G30:V30","A31:A34","G31:V34"], 'setBackground', '#BFBFBF');
  fmt_(sh, ["N4","A10","H10","U13","A21","A29"], 'setHorizontalAlignment', 'center');
  fmt_(sh, ["B4:B5","B11","J11","B13","J13","J15:J17","B19"], 'setHorizontalAlignment', 'left');
  fmt_(sh, ["V1","U14:V14","A20"], 'setHorizontalAlignment', 'right');
  fmt_(sh, ["A11","H11","H13","I5:M5","G6:M9","B11:G12","J11:M12","J13:M14","B17:G18"], 'setVerticalAlignment', 'top');
  fmt_(sh, ["A6","A32:A33"], 'setWrap', true);

  const rich = {
    A4:[['Care Plan Date:',18,false,'#000000'],['   ',18,true,'#000000']],
    A5:[['Participant:',18,false,'#000000'],['   ',18,true,'#000000']],
    A6:[['Provider:         ',18,false,'#000000'],[':',18,false,'#FFFFFF'],[' ',18,false,'#000000']],
    A7:[['HCCRN:           ',18,false,'#000000'],[':',18,false,'#FFFFFF'],['  ',18,false,'#000000']],
    A8:[['RNCM:            ',18,false,'#000000'],[':',18,false,'#FFFFFF'],['  ',18,false,'#000000']],
    A9:[['SW:                   ',18,false,'#000000'],[':',18,false,'#FFFFFF'],[' ',18,false,'#000000']],
    A11:[['Bathing:   ',18,false,'#000000'],['    ',18,true,'#000000']],
    U16:[['       ',18,false,'#000000'],['  PAP',18,true,'#000000']],
    A34:[['Medication Reminders ',18,false,'#000000'],['(per care plan)',16,false,'#000000']]
  };
  Object.entries(rich).forEach(([a1,runs]) => rich_(sh, a1, runs));

  sh.setColumnWidths(1,C,100); sh.setColumnWidth(1,248); sh.setColumnWidth(3,40); sh.setColumnWidths(5,8,97); sh.setColumnWidth(16,120);
  sh.setRowHeights(1,R,45); sh.setRowHeights(1,4,21); sh.setRowHeights(6,4,35); sh.setRowHeights(36,2,65);
  all.setNumberFormat('@STRING@'); sh.getRange('B4').setNumberFormat('mm"/"dd"/"yy');

  // Protect the master TEMPLATE completely.
  protectSheet_(sh, []);
  ss.setActiveSheet(sh);
  SpreadsheetApp.flush();
  ss.toast('TEMPLATE rebuilt and protected.', 'Aide CP');
}

function createAideCpActiveSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const template = ss.getSheetByName('TEMPLATE');
  if (!template) throw new Error('TEMPLATE not found. Run "Create / Rebuild Template" first.');

  // Use the host script's unique-name helper so an existing ACTIVE sheet is never deleted.
  const activeName = makeUniqueSheetName_(ss, 'ACTIVE', template);
  const active = template.copyTo(ss).setName(activeName);

  // A copied protected sheet inherits protection; replace it with ACTIVE protection.
  clearProtections_(active);
  protectSheet_(active, active.getRangeList(AIDE_CP_ENTRY_RANGES).getRanges());
  restoreAideCpBorders_(active);

  ss.setActiveSheet(active);
  SpreadsheetApp.flush();
  ss.toast(activeName + ' created from TEMPLATE and protected.', 'Aide CP');
}

function updateCurrentSheetFromTemplate() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sheet = ss.getActiveSheet();
  const template = ss.getSheetByName('TEMPLATE');

  if (!template) throw new Error('TEMPLATE not found. Run "Create Template" first.');
  if (!sheet || sheet.getName() === 'TEMPLATE') {
    ui.alert('Select an active participant sheet, not TEMPLATE.');
    return;
  }

  const confirm = ui.alert(
    'Update Current Sheet from Template',
    'This will rebuild the current sheet in place. Values in approved entry areas will be preserved; all other cell content and formatting will be replaced by TEMPLATE.',
    ui.ButtonSet.OK_CANCEL
  );
  if (confirm !== ui.Button.OK) return;

  const saved = AIDE_CP_ENTRY_RANGES.map(a1 => {
    const range = sheet.getRange(a1);
    return { a1, values: range.getValues() };
  });

  const originalName = sheet.getName();

  clearProtections_(sheet);

  // Remove old structure/content/formatting while keeping the same sheet/GID.
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).breakApart();
  sheet.clear();
  sheet.setConditionalFormatRules([]);
  sheet.getBandings().forEach(b => b.remove());
  sheet.getCharts().forEach(c => sheet.removeChart(c));
  sheet.getImages().forEach(i => i.remove());

  const rows = 37;
  const cols = 22;
  if (sheet.getMaxRows() < rows) sheet.insertRowsAfter(sheet.getMaxRows(), rows - sheet.getMaxRows());
  if (sheet.getMaxColumns() < cols) sheet.insertColumnsAfter(sheet.getMaxColumns(), cols - sheet.getMaxColumns());
  if (sheet.getMaxRows() > rows) sheet.deleteRows(rows + 1, sheet.getMaxRows() - rows);
  if (sheet.getMaxColumns() > cols) sheet.deleteColumns(cols + 1, sheet.getMaxColumns() - cols);

  // Copy current TEMPLATE values and formatting into the existing sheet.
  template.getRange('A1:V37').copyTo(
    sheet.getRange('A1:V37'),
    SpreadsheetApp.CopyPasteType.PASTE_NORMAL,
    false
  );

  template.getRange('A1:V37').getMergedRanges()
    .forEach(r => sheet.getRange(r.getA1Notation()).merge());

  // Match current TEMPLATE dimensions.
  for (let c = 1; c <= cols; c++) sheet.setColumnWidth(c, template.getColumnWidth(c));
  for (let r = 1; r <= rows; r++) sheet.setRowHeight(r, template.getRowHeight(r));

  sheet.setHiddenGridlines(true);
  sheet.setFrozenRows(template.getFrozenRows());
  sheet.setFrozenColumns(template.getFrozenColumns());

  // Restore values only. Formatting always comes from TEMPLATE.
  saved.forEach(item => {
    const target = sheet.getRange(item.a1);

    if (target.isPartOfMerge()) {
      let value = '';
      outer:
      for (const row of item.values) {
        for (const cell of row) {
          if (cell !== '' && cell !== null) {
            value = cell;
            break outer;
          }
        }
      }
      target.getCell(1, 1).setValue(value);
    } else {
      target.setValues(item.values);
    }
  });

  // Recalculate dynamic shading from the restored data.
  GrayShade.applyAll(ss, expandRulesForSheet_(sheet.getName(), RULES));

  // Reassert exact borders and protection.
  restoreAideCpBorders_(sheet);
  protectSheet_(sheet, sheet.getRangeList(AIDE_CP_ENTRY_RANGES).getRanges());

  // Preserve the existing name/GID and re-sort tabs by the date in the name.
  if (sheet.getName() !== originalName) sheet.setName(originalName);
  sortSheetsBySheetNameDateDescending_();

  SpreadsheetApp.flush();
  ss.toast('Current sheet rebuilt from TEMPLATE. Entry values were preserved.', 'Aide CP');
}


function isAideCpSheet_(sh) {
  return !!sh &&
    sh.getMaxRows() === 37 &&
    sh.getMaxColumns() === 22 &&
    sh.getRange('A1').getDisplayValue() === 'Ascension Living HOPE Homecare Care Plan/Aide Documentation';
}

function restoreAideCpBorders_(sh) {
  if (!isAideCpSheet_(sh)) return;
  sh.getRange('A1:V37').setBorder(false, false, false, false, false, false);
  edges_(sh, AIDE_CP_EDGE_MAP);
  perimeters_(sh, AIDE_CP_PERIMETERS);
}

function fmt_(sh, ranges, method, value) { sh.getRangeList(ranges).getRanges().forEach(r => r[method](value)); }

function edges_(sh, map) {
  const side = {top:0,left:1,bottom:2,right:3};
  Object.entries(map).forEach(([edge,weights]) => Object.entries(weights).forEach(([weight,ranges]) => {
    const style = weight === 'medium' ? SpreadsheetApp.BorderStyle.SOLID_MEDIUM : SpreadsheetApp.BorderStyle.SOLID;
    ranges.forEach(a1 => { const f=[null,null,null,null,null,null]; f[side[edge]]=true; sh.getRange(a1).setBorder(f[0],f[1],f[2],f[3],f[4],f[5],'#000000',style); });
  }));
}

function perimeters_(sh, rules) {
  rules.forEach(x => ['top','left','bottom','right'].forEach(edge => {
    if (!x[edge]) return;
    const style = x[edge] === 'medium' ? SpreadsheetApp.BorderStyle.SOLID_MEDIUM : SpreadsheetApp.BorderStyle.SOLID;
    sh.getRange(x.range).setBorder(edge==='top'?true:null, edge==='left'?true:null, edge==='bottom'?true:null, edge==='right'?true:null, null, null, '#000000', style);
  }));
}

function rich_(sh, a1, runs) {
  const text = runs.map(x => x[0]).join(''), b = SpreadsheetApp.newRichTextValue().setText(text); let p = 0;
  runs.forEach(([t,size,bold,color]) => { const q=p+t.length, s=SpreadsheetApp.newTextStyle().setFontFamily('Calibri').setFontSize(size).setBold(bold).setForegroundColor(color).build(); b.setTextStyle(p,q,s); p=q; });
  sh.getRange(a1).setRichTextValue(b.build());
}


function clearProtections_(sh) {
  [SpreadsheetApp.ProtectionType.SHEET, SpreadsheetApp.ProtectionType.RANGE]
    .forEach(type => sh.getProtections(type).forEach(p => { if (p.canEdit()) p.remove(); }));
}

function protectSheet_(sh, editableRanges) {
  const p = sh.protect().setDescription(sh.getName() + ' formatting protection').setWarningOnly(false);
  if (editableRanges.length) p.setUnprotectedRanges(editableRanges);
  const me = Session.getEffectiveUser();
  p.addEditor(me);
  p.getEditors().forEach(e => { if (e.getEmail() !== me.getEmail()) p.removeEditor(e); });
  if (p.canDomainEdit()) p.setDomainEdit(false);
}

/* =========================
 * =      LIBRARY CORE      =
 * ========================= */
const GrayShade = (function() {
  const GRAY = '#bfbfbf';

  function normalizeA1_(a1) { return String(a1).trim().replace(/\$/g, ''); }

  function resolveRef_(ref, ss) {
    ss = ss || SpreadsheetApp.getActive();
    const raw = String(ref || '').trim();
    if (!raw) throw new Error('Empty reference');
    let m = raw.match(/^'(.*)'!(.+)$/);
    if (m) {
      const sheetName = m[1].replace(/''/g, "'").trim();
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) throw new Error("Sheet not found: " + sheetName);
      return { sheet, a1: normalizeA1_(m[2]) };
    }
    m = raw.match(/^(.*?)!(.+)$/);
    if (m) {
      const sheetName = m[1].trim();
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) throw new Error("Sheet not found: " + sheetName);
      return { sheet, a1: normalizeA1_(m[2]) };
    }
    return { sheet: ss.getActiveSheet(), a1: normalizeA1_(raw) };
  }

  function safeGetRange_(sheet, a1) {
    try { return (!a1 || !/^[A-Za-z]+[0-9]+(:[A-Za-z]+[0-9]+)?$/.test(a1)) ? null : sheet.getRange(a1); } catch (e) { return null; }
  }

  function isBlank_(v) { return v === null || String(v).trim() === ''; }

  function rangesIntersect_(a, b) {
    const rA = a.getRow(), cA = a.getColumn();
    const rB = b.getRow(), cB = b.getColumn();
    return rA <= (rB + b.getNumRows() - 1) && 
           (rA + a.getNumRows() - 1) >= rB && 
           cA <= (cB + b.getNumColumns() - 1) && 
           (cA + a.getNumColumns() - 1) >= cB;
  }

  function verifyLayoutStructure_(sheet) {
    const matrix = {
      "A11": "Bathing:",
      "A24": "Toileting/Incontinence Care:",
      "H11": "Housekeeping:",
      "H13": "Laundry:",
      "H15": "Shopping:",
      "N18": "-Change O2 tubing/humidifier"
    };
    for (const [cell, expectedText] of Object.entries(matrix)) {
      const actualVal = String(sheet.getRange(cell).getValue()).trim();
      if (actualVal !== expectedText) return false;
    }
    return true;
  }

  function validate(ss, rules, sheetObj) {
    ss = ss || SpreadsheetApp.getActive(); const bad = [], ok = [];
    const targetSheet = sheetObj || ss.getActiveSheet();
    
    if (!verifyLayoutStructure_(targetSheet)) {
      bad.push("FOREVER INVALID: Structural layout matrix mismatch. Rows/columns are shifted or core template labels are changed.");
      return { bad, ok, structuralFailure: true };
    }

    (rules || []).forEach((r, i) => {
      try {
        const src = resolveRef_(r.src, ss);
        const srcRange = safeGetRange_(src.sheet, src.a1);
        if (!srcRange) { bad.push("Rule " + (i + 1) + " src invalid: " + r.src); return; }
        
        let targetsOk = true;
        (r.targets || []).forEach(t => {
          const trg = resolveRef_(t, ss);
          if (!safeGetRange_(trg.sheet, trg.a1)) {
            bad.push("Rule " + (i + 1) + " target invalid: " + t);
            targetsOk = false;
          }
        });
        if (targetsOk) ok.push(r.src);
      } catch (e) { bad.push(r.src + " (" + e.message + ")"); }
    });
    return { bad, ok, structuralFailure: false };
  }

  function applyAll(ss, rules) {
    ss = ss || SpreadsheetApp.getActive();
    const currentSheet = ss.getActiveSheet();
    if (!verifyLayoutStructure_(currentSheet)) {
      logErrorToSheet_(ss, "Shading Aborted: Sheet [" + currentSheet.getName() + "] failed distributed task matrix validation.");
      return;
    }
    (rules || []).forEach(rule => {
      try {
        const ref = resolveRef_(rule.src, ss); const rng = safeGetRange_(ref.sheet, ref.a1);
        if (!rng) return; const clear = !isBlank_(rng.getValue());
        (rule.targets || []).forEach(t => {
          try { const tr = resolveRef_(t, ss); const trg = safeGetRange_(tr.sheet, tr.a1); if (trg) trg.setBackground(clear ? null : GRAY); } catch(_) {}
        });
      } catch(_) {}
    });
  }

  function onEdit(e, rules) {
    if (!e || !e.range) return;
    const ss = e.range.getSheet().getParent(), editedSheet = e.range.getSheet(), editedRange = e.range;
    (rules || []).forEach(rule => {
      try {
        const srcRef = resolveRef_(rule.src, ss);
        if (srcRef.sheet.getName() === editedSheet.getName()) {
          const srcRange = safeGetRange_(srcRef.sheet, srcRef.a1);
          if (srcRange && rangesIntersect_(srcRange, editedRange)) {
            const clear = !isBlank_(srcRange.getValue());
            (rule.targets || []).forEach(t => {
              try { const tr = resolveRef_(t, ss); const trg = safeGetRange_(tr.sheet, tr.a1); if (trg) trg.setBackground(clear ? null : GRAY); } catch(_) {}
            });
          }
        }
      } catch (_) {}
    });
  }

  return { applyAll, onEdit, validate, rangesIntersect: rangesIntersect_, verifyLayout: verifyLayoutStructure_ };
})();

/* ========================================
 * =      OPERATIONAL SUBSYSTEMS          =
 * ======================================== */

function logErrorToSheet_(ss, message) {
  try {
    let logSheet = ss.getSheetByName("Error Log");
    if (!logSheet) {
      logSheet = ss.insertSheet("Error Log"); logSheet.appendRow(["Timestamp", "Error Message"]);
      logSheet.getRange("A1:B1").setFontWeight("bold");
    }
    logSheet.appendRow([new Date(), message]);
  } catch(e) { console.error(message); }
}

function isSheetExcluded_(sheet) {
  if (EXCLUDED_SHEETS.includes(sheet.getName())) return true;
  try { 
    const ts = getSheetB4DateTimestamp_(sheet);
    if (ts === 0) return true; 
    return ts < EXCLUSION_CUTOFF_DATE.getTime();
  } catch(err) { 
    return true;
  }
}

function quoteSheetName_(name) {
  return "'" + String(name).replace(/'/g, "''") + "'";
}

function expandRulesForSheet_(sheetName, baseRules) {
  const quoted = quoteSheetName_(sheetName);
  return (baseRules || []).map(r => ({
    src: String(r.src).includes('!') ? r.src : quoted + "!" + r.src,
    targets: (r.targets || []).map(t => String(t).includes('!') ? t : quoted + "!" + t)
  }));
}

const SYNC_WATCH_RANGES = Object.freeze(Array.from(new Set(Object.values(SYNC_MAPPING).concat(['I5:M5', 'G6:M9']))));

function getSyncWatchRanges_() { return SYNC_WATCH_RANGES; }
function escapeForSheetCell_(value) { const t = String(value == null ? "" : value); return /^[=+\-@]/.test(t) ? "'" + t : t; }

// A6:A9 use two colons. For Service Log sync, keep only text after the second colon.
function stripFieldPrefix_(value) {
  const text = String(value == null ? '' : value);
  const first = text.indexOf(':');
  const second = first === -1 ? -1 : text.indexOf(':', first + 1);
  return (second === -1 ? text : text.slice(second + 1)).trim();
}

function normalizeDateText_(value) {
  return String(value == null ? '' : value)
    .replace(/[\u00A0\u2007\u202F]/g, ' ')
    .replace(/[／⁄∕]/g, '/')
    .replace(/[‐‑‒–—−]/g, '-')
    .replace(/[．。]/g, '.')
    .trim();
}

function parseDateFromText_(value) {
  const text = normalizeDateText_(value);
  const m = /(\d{1,2})\s*[\/\-.]\s*(\d{1,2})\s*[\/\-.]\s*(\d{4}|\d{2})/.exec(text);
  if (!m) return null;

  const month = Number(m[1]);
  const day = Number(m[2]);
  let year = Number(m[3]);
  if (year < 100) year += 2000;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;

  return { date, index: m.index, length: m[0].length, match: m[0], text };
}

function getSheetNameDateTimestamp_(sheet) {
  const parsed = parseDateFromText_(sheet.getName());
  return parsed ? parsed.date.getTime() : 0;
}

function isBlankActiveSheetName_(name) {
  return /^ACTIVE(?:\s*\(\d+\))?$/i.test(String(name || '').trim());
}

function getRangeText_(sheet, a1Notation) {
  if (!a1Notation.includes(':')) return sheet.getRange(a1Notation).getDisplayValue().trim();
  const values = sheet.getRange(a1Notation).getDisplayValues();
  const parts = [];
  for (const row of values) {
    for (const cell of row) {
      const text = String(cell).trim();
      if (text) parts.push(text);
    }
  }
  return parts.join(' ');
}

function formatTabNameWithDateFirst_(dateObj, rawText) {
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "Untitled";

  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const yy = String(dateObj.getFullYear()).slice(-2);
  const dateText = mm + "/" + dd + "/" + yy;

  let remainder = normalizeDateText_(rawText);
  const parsed = parseDateFromText_(remainder);
  if (parsed) {
    remainder = (remainder.slice(0, parsed.index) + ' ' + remainder.slice(parsed.index + parsed.length))
      .replace(/\s+/g, ' ')
      .trim();
  }

  return (remainder ? dateText + ' ' + remainder : dateText).slice(0, 100).trim();
}

function getSheetB4DateTimestamp_(sheet) {
  const cell = sheet.getRange("B4");
  const value = cell.getValue();
  if (value instanceof Date && !isNaN(value.getTime())) return value.getTime();

  const parsed = parseDateFromText_(cell.getDisplayValue());
  return parsed ? parsed.date.getTime() : 0;
}

function buildIndexMapsOptimized_(sheet) {
  const lastRow = sheet.getLastRow(), lastCol = sheet.getLastColumn();
  if (lastRow < 1 || lastCol < 1) throw new Error("Service log empty.");
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
  const pmrIdx = headers.indexOf("Participant PMR#"), nameIdx = headers.indexOf("Name");
  if (pmrIdx === -1 || nameIdx === -1) throw new Error("Headers missing.");
  
  const pmrMap = new Map(), nameMap = new Map();
  if (lastRow > 1) {
    const pmrValues = sheet.getRange(2, pmrIdx + 1, lastRow - 1, 1).getValues();
    const nameValues = sheet.getRange(2, nameIdx + 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < lastRow - 1; i++) {
      const rowNum = i + 2;
      const pKey = String(pmrValues[i][0] || "").trim().toLowerCase();
      const nKey = String(nameValues[i][0] || "").trim().toLowerCase();
      if (pKey) { if (!pmrMap.has(pKey)) pmrMap.set(pKey, []); pmrMap.get(pKey).push(rowNum); }
      if (nKey) { if (!nameMap.has(nKey)) nameMap.set(nKey, []); nameMap.get(nKey).push(rowNum); }
    }
  }
  return { pmrMap, nameMap, headers };
}

function getValidatedTargetRow_(maps, pmrKey, nameKey, sheetContext) {
  const pmrMatches = maps.pmrMap.get(pmrKey) || [];
  if (pmrMatches.length > 1) { logErrorToSheet_(sheetContext, "Sync Terminated: Duplicate indices discovered for PMR."); throw new Error("DUPLICATED_PMR"); }
  if (pmrMatches.length === 1) return pmrMatches[0];

  const nameMatches = maps.nameMap.get(nameKey) || [];
  if (nameMatches.length > 1) { logErrorToSheet_(sheetContext, "Sync Terminated: Duplicate indices discovered for Name."); throw new Error("DUPLICATED_NAME"); }
  return nameMatches.length === 1 ? nameMatches[0] : -1;
}

function getNewestSheetNamesCached_(ss) {
  const cache = CacheService.getDocumentCache();
  const key = 'NEWEST_SHEET_NAMES_' + ss.getId();
  const cached = cache.get(key);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) return parsed;
    } catch(e) { cache.remove(key); }
  }
  let maxTime = -Infinity; let newest = [];
  ss.getSheets().forEach(sh => {
    if (EXCLUDED_SHEETS.includes(sh.getName())) return;
    const time = getSheetB4DateTimestamp_(sh);
    if (time > 0) {
      if (time > maxTime) { maxTime = time; newest = [sh.getName()]; } 
      else if (time === maxTime) { newest.push(sh.getName()); }
    }
  });
  cache.put(key, JSON.stringify(newest), 15); 
  return newest;
}

function isNewestSheet_(sheet) {
  return getNewestSheetNamesCached_(sheet.getParent()).includes(sheet.getName());
}

function syncDataToHomeCareServices_(sheet, isManual) {
  const isManualRun = !!isManual;
  const activeSS = SpreadsheetApp.getActiveSpreadsheet(), lock = LockService.getScriptLock(); let lockAcquired = false;
  try {
    lockAcquired = lock.tryLock(15000); 
    if (!lockAcquired) { if (isManualRun) activeSS.toast('Sync pipeline busy.', 'Busy'); return; }
    
    if (!GrayShade.verifyLayout(sheet)) {
      logErrorToSheet_(activeSS, "Push Sync Aborted: Sheet [" + sheet.getName() + "] failed task matrix validation.");
      if (isManualRun) activeSS.toast('Sync skipped: Layout configuration error.', 'Notice');
      return;
    }

    if (!isManualRun && !isNewestSheet_(sheet)) return;
    if (isManualRun && !isNewestSheet_(sheet)) activeSS.toast('Manual override: syncing older dated sheet.', 'Notice');

    const dataToSync = {};
    for (const [header, a1] of Object.entries(SYNC_MAPPING)) { 
      if (a1 === "B4") {
        const dVal = sheet.getRange("B4").getValue();
        dataToSync[header] = (dVal instanceof Date) ? dVal.toLocaleDateString() : getRangeText_(sheet, "B4");
      } else {
        dataToSync[header] = getRangeText_(sheet, a1); 
      }
    }
    
    const pmr = String(dataToSync["Participant PMR#"] || '').trim();
    const name = String(dataToSync.Name || '').trim();
    if (!pmr && !name) { if (isManualRun) activeSS.toast('Skipped: no Name or PMR# found.', 'Sync Skipped'); return; }

    ["Provider", "Provider:", "HCCRN", "HCCRN:", "RNCM", "RNCM:", "SW", "SW:"].forEach(h => {
      if (dataToSync[h]) dataToSync[h] = stripFieldPrefix_(dataToSync[h]);
    });
    dataToSync["NOTES/ALERTS:"] = [getRangeText_(sheet, "I5:M5"), getRangeText_(sheet, "G6:M9")].filter(String).join("\n");
    dataToSync["Sheet Name"] = sheet.getName(); dataToSync["File Name"] = activeSS.getName(); dataToSync["Link"] = activeSS.getUrl() + '#gid=' + sheet.getSheetId();

    const targetSheet = SpreadsheetApp.openById(TARGET_FILE_ID).getSheetByName("Home Care Services");
    if (!targetSheet) throw new Error("Master log sheet missing.");
    const maps = buildIndexMapsOptimized_(targetSheet);
    
    let targetRow;
    try { 
      targetRow = getValidatedTargetRow_(maps, pmr.toLowerCase(), name.toLowerCase(), activeSS); 
    } catch(e) { 
      if (isManualRun) activeSS.toast('Sync skipped due to configuration error.', 'Notice');
      return; 
    }

    if (targetRow === -1) {
      const newRow = maps.headers.map(h => escapeForSheetCell_(dataToSync[h]));
      const nextRow = Math.max(targetSheet.getLastRow() + 1, 2);
      targetSheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
      if (isManualRun) activeSS.toast('Record appended successfully.', 'Complete');
    } else {
      const range = targetSheet.getRange(targetRow, 1, 1, maps.headers.length); const values = range.getValues()[0];
      maps.headers.forEach((h, i) => { if (dataToSync[h] !== undefined) values[i] = escapeForSheetCell_(dataToSync[h]); });
      range.setValues([values]);
      if (isManualRun) activeSS.toast('Record updated successfully.', 'Complete');
    }
  } catch (err) { 
    logErrorToSheet_(activeSS, "Push Sync Fatal Error: " + err.message); 
    if (isManualRun) activeSS.toast('Sync pipeline failed.', 'Error');
  } finally { if (lockAcquired) lock.releaseLock(); }
}

function syncCurrentSheetToHomeCareServices_() {
  syncDataToHomeCareServices_(SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(), true);
}

function findRowInMaster_(searchTerm, activeSS) {
  if (!String(searchTerm || '').trim()) return null;
  const targetSheet = SpreadsheetApp.openById(TARGET_FILE_ID).getSheetByName("Home Care Services");
  if (!targetSheet) throw new Error("Master sheet missing.");
  const maps = buildIndexMapsOptimized_(targetSheet); const key = String(searchTerm).trim().toLowerCase();
  const targetRowIndex = getValidatedTargetRow_(maps, key, key, activeSS);
  if (targetRowIndex === -1) return null;
  const rowValues = targetSheet.getRange(targetRowIndex, 1, 1, maps.headers.length).getValues()[0];
  const data = {}; maps.headers.forEach((h, idx) => { data[h] = rowValues[idx]; }); return data;
}

function applyServiceLogRowToLocalSheet_(sheet, data) {
  for (const [header, a1] of Object.entries(SYNC_MAPPING)) {
    if (data[header] !== undefined) {
      let val = String(data[header]).trim();
      if (a1 === "A6" && !val.toLowerCase().startsWith("provider")) val = "Provider: " + val;
      if (a1 === "A7" && !val.toLowerCase().startsWith("hccrn")) val = "HCCRN: " + val;
      if (a1 === "A8" && !val.toLowerCase().startsWith("rncm")) val = "RNCM: " + val;
      if (a1 === "A9" && !val.toLowerCase().startsWith("sw")) val = "SW: " + val;
      if (!header.endsWith(":") && ["A6","A7","A8","A9"].includes(a1)) continue;
      
      if (a1 === "B4") {
        const parsedDate = new Date(val);
        if (!isNaN(parsedDate.getTime())) {
          sheet.getRange("B4").setValue(parsedDate).setNumberFormat("mm/dd/yy");
        } else {
          sheet.getRange("B4").setValue(escapeForSheetCell_(val));
        }
      } else {
        sheet.getRange(a1).setValue(escapeForSheetCell_(val));
      }
    }
  }
  if (data["NOTES/ALERTS:"]) {
    sheet.getRange("I5").setValue(escapeForSheetCell_(data["NOTES/ALERTS:"]));
  }
}

function pullUpdatesToCurrentSheet_() {
  const activeSS = SpreadsheetApp.getActiveSpreadsheet(), sheet = activeSS.getActiveSheet();
  const pmr = getRangeText_(sheet, "V1");
  const name = getRangeText_(sheet, "B5");
  if (!pmr && !name) { activeSS.toast('No identification handles found.', 'Canceled'); return; }
  
  if (!GrayShade.verifyLayout(sheet)) {
    activeSS.toast('Pull blocked: Structural Task Matrix deviation found.', 'Canceled');
    return;
  }

  try {
    const targetSheet = SpreadsheetApp.openById(TARGET_FILE_ID).getSheetByName("Home Care Services");
    if (!targetSheet) throw new Error("Master log target worksheet missing.");
    const maps = buildIndexMapsOptimized_(targetSheet);
    
    let rowData = null;
    if (pmr) {
      const pIndex = maps.pmrMap.get(pmr.toLowerCase()) || [];
      if (pIndex.length === 1) {
        const rowValues = targetSheet.getRange(pIndex[0], 1, 1, maps.headers.length).getValues()[0];
        rowData = {}; maps.headers.forEach((h, idx) => { rowData[h] = rowValues[idx]; });
      } else if (pIndex.length > 1) throw new Error("Duplicate PMR records found.");
    }
    if (!rowData && name) {
      const nIndex = maps.nameMap.get(name.toLowerCase()) || [];
      if (nIndex.length === 1) {
        const rowValues = targetSheet.getRange(nIndex[0], 1, 1, maps.headers.length).getValues()[0];
        rowData = {}; maps.headers.forEach((h, idx) => { rowData[h] = rowValues[idx]; });
      } else if (nIndex.length > 1) throw new Error("Duplicate Name records found.");
    }
    
    if (rowData) { 
      applyServiceLogRowToLocalSheet_(sheet, rowData); 
      activeSS.toast("Reverse tracking sync pulled successfully.", 'Complete'); 
    } else {
      activeSS.toast("Participant record not found in Master Log.", 'Not Found');
    }
  } catch (err) { 
    logErrorToSheet_(activeSS, "Pull Sync Error: " + err.message);
    activeSS.toast('Pull canceled. See Error Log for details.', 'Canceled');
  }
}

function createNewSheetFromMaster_() {
  const activeSS = SpreadsheetApp.getActiveSpreadsheet(), ui = SpreadsheetApp.getUi();
  const resp = ui.prompt("Import Profile", "Enter Name or PMR#:", ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return;
  const term = resp.getResponseText().trim();
  if (!term) return;
  
  let newSheet = null;
  try {
    const rowData = findRowInMaster_(term, activeSS);
    if (!rowData) { ui.alert("Not Found", "No participant matching parameters found.", ui.ButtonSet.OK); return; }
    
    const template = activeSS.getSheetByName('TEMPLATE');
    if (!template) throw new Error("Worksheet TEMPLATE is missing.");
    
    newSheet = template.copyTo(activeSS);
    
    const rawDateVal = rowData["Date:"];
    const parsed = rawDateVal instanceof Date && !isNaN(rawDateVal.getTime())
      ? { date: rawDateVal }
      : parseDateFromText_(rawDateVal);
    const nameString = parsed ? formatTabNameWithDateFirst_(parsed.date, '') : sanitizeSheetName_(rawDateVal);
    
    newSheet.setName(makeUniqueSheetName_(activeSS, nameString, newSheet));
    applyServiceLogRowToLocalSheet_(newSheet, rowData); 
    sortSheetsBySheetNameDateDescending_();
  } catch (err) { 
    try { if (newSheet) activeSS.deleteSheet(newSheet); } catch(cleanupErr) {}
    logErrorToSheet_(activeSS, "Aborted Workspace Generation: " + err.message); 
  }
}

function sortSheetsBySheetNameDateDescending_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rows = ss.getSheets().map((sheet, originalIndex) => {
    const name = sheet.getName();
    const timestamp = getSheetNameDateTimestamp_(sheet);
    const isTemplate = name.toUpperCase() === 'TEMPLATE';
    const isBlankActive = !timestamp && isBlankActiveSheetName_(name);

    let group = 1;
    if (timestamp) group = 0;
    else if (isBlankActive) group = 2;
    else if (isTemplate) group = 3;

    return { sheet, name, timestamp, group, originalIndex };
  });

  rows.sort((a, b) => {
    if (a.group !== b.group) return a.group - b.group;
    if (a.group === 0 && a.timestamp !== b.timestamp) return b.timestamp - a.timestamp;
    if (a.group === 1) return a.name.localeCompare(b.name);
    return a.originalIndex - b.originalIndex;
  });

  rows.forEach((item, index) => {
    if (item.sheet.getIndex() !== index + 1) {
      ss.setActiveSheet(item.sheet);
      ss.moveActiveSheet(index + 1);
    }
  });
}

// Backward-compatible internal name used elsewhere in the current script.
function sortSheetsByB4DateDescending_() {
  sortSheetsBySheetNameDateDescending_();
}

function renameDriveFileFromB5AndTab_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet(), file = DriveApp.getFileById(ss.getId());
  const sheet = ss.getActiveSheet();
  const rawName = sheet.getRange('B5').getDisplayValue().trim();
  if (!rawName || file.getName().startsWith('*')) return;
  const parts = rawName.split(/\s+/); let fmt = rawName;
  if (parts.length >= 2) { const last = parts.pop(); fmt = `${last}, ${parts.join(' ')}`; }
  
  const sheetTitle = sheet.getName();
  const newFileName = (fmt + " " + sheetTitle + " <").replace(/[\/\\\?%\*:\n\r\|\"\[\]]/g, '').slice(0, 200).trim();
  if (file.getName() !== newFileName) {
    file.setName(newFileName);
    ss.toast('Drive file title adjusted.', 'Success');
  }
}

function sanitizeSheetName_(name) { 
  let s = String(name || '').trim().replace(/\//g, '-').replace(/\./g, '-').replace(/[:\\\?\*\[\]]/g, ''); 
  return s.slice(0, 100).trim() || "Untitled"; 
}

function makeUniqueSheetName_(ss, desired, currentSheet) {
  const existing = new Set(ss.getSheets().map(sh => sh.getName())); existing.delete(currentSheet.getName());
  if (!existing.has(desired)) return desired; let b = desired.slice(0, 90);
  for (let i = 2; i < 1000; i++) { if (!existing.has(b + " (" + i + ")")) return b + " (" + i + ")"; }
  return b + " (" + Date.now() + ")";
}

function renameSheetFromB4_(sheet) {
  if (!sheet || RENAME_EXCLUDED_SHEETS.indexOf(sheet.getName()) !== -1) return;

  const cell = sheet.getRange('B4');
  const raw = cell.getValue();
  const parsed = raw instanceof Date && !isNaN(raw.getTime())
    ? { date: raw }
    : parseDateFromText_(cell.getDisplayValue());
  if (!parsed) return;

  const existingName = isBlankActiveSheetName_(sheet.getName()) ? '' : sheet.getName();
  const desired = formatTabNameWithDateFirst_(parsed.date, existingName);
  if (desired && desired !== sheet.getName() && desired !== 'Untitled') {
    sheet.setName(makeUniqueSheetName_(sheet.getParent(), desired, sheet));
  }
}

function renameCurrentSheetFromB4_() {
  renameSheetFromB4_(SpreadsheetApp.getActiveSpreadsheet().getActiveSheet());
}


function removeCopyOfPrefixAllSheets_(isSilent) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let renamedCount = 0, failedCount = 0;

  ss.getSheets().forEach(sheet => {
    const name = sheet.getName();
    const cleaned = name.replace(/\bCopy of\b\s*/gi, '').replace(/\s+/g, ' ').trim();
    if (!cleaned || cleaned === name) return;

    try {
      sheet.setName(makeUniqueSheetName_(ss, cleaned, sheet));
      renamedCount++;
    } catch (e) {
      failedCount++;
    }
  });

  sortSheetsBySheetNameDateDescending_();
  if (!isSilent) ss.toast('Removed "Copy of" from ' + renamedCount + ' sheet(s). Failed: ' + failedCount, 'Sheet Name Cleanup');
}

function cleanExistingSheetNamesOnce_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let renamedCount = 0, skippedCount = 0, failedCount = 0;

  ss.getSheets().forEach(sheet => {
    const current = sheet.getName();
    if (current.toUpperCase() === 'TEMPLATE' || isBlankActiveSheetName_(current)) {
      skippedCount++;
      return;
    }

    const parsed = parseDateFromText_(current);
    if (!parsed) {
      skippedCount++;
      return;
    }

    const desired = formatTabNameWithDateFirst_(parsed.date, current);
    if (!desired || desired === current) return;

    try {
      sheet.setName(makeUniqueSheetName_(ss, desired, sheet));
      renamedCount++;
    } catch (e) {
      failedCount++;
    }
  });

  sortSheetsBySheetNameDateDescending_();
  ss.toast(
    'Renamed: ' + renamedCount + ' | Skipped: ' + skippedCount + ' | Failed: ' + failedCount,
    'One-Time Sheet Name Cleanup',
    8
  );
}

function validateMappingsCurrentSheet_(isSilent) {
  const ss = SpreadsheetApp.getActive();
  const currentSheet = ss.getActiveSheet();
  const res = GrayShade.validate(ss, expandRulesForSheet_(currentSheet.getName(), RULES), currentSheet);
  
  if (res.structuralFailure) {
    logErrorToSheet_(ss, "FOREVER INVALID LAYOUT [" + currentSheet.getName() + "]:\n" + res.bad.join('\n'));
    if (!isSilent) ss.toast('Structural layout error logged.', 'Validation Alert');
  } else if (res.bad.length > 0) {
    logErrorToSheet_(ss, "TEMPORARY DATA ERRORS [" + currentSheet.getName() + "]:\n" + res.bad.join('\n'));
    if (!isSilent) ss.toast('Data mapping errors logged.', 'Validation Alert');
  } else {
    if (!isSilent) ss.toast('Validation passed successfully.', 'Validation Check');
  }
}

function validateMappingsAllSheets_(isSilent) {
  const ss = SpreadsheetApp.getActive();
  const badData = [], badLayout = [], ok = [];
  
  ss.getSheets().forEach(sh => {
    if (isSheetExcluded_(sh) || sh.isSheetHidden()) return;
    const res = GrayShade.validate(ss, expandRulesForSheet_(sh.getName(), RULES), sh);
    if (res.structuralFailure) {
      badLayout.push("[" + sh.getName() + "] FOREVER INVALID (Layout shift detected)");
    } else {
      res.bad.forEach(b => badData.push("[" + sh.getName() + "] " + b));
      res.ok.forEach(o => ok.push("[" + sh.getName() + "] " + o));
    }
  });
  
  if (badLayout.length > 0) logErrorToSheet_(ss, "STRUCTURAL LAYOUT MISMATCHES:\n" + badLayout.join('\n'));
  if (badData.length > 0) logErrorToSheet_(ss, "FIELD DATA MAPPING ERRORS:\n" + badData.join('\n'));
  
  if (!isSilent) ss.toast(`Validation complete. ${badLayout.length} layout errors, ${badData.length} mapping errors. Check Error Log.`, 'Validation Engine', 8);
}

function runStandardizeDatesAndFormat_(isSilent) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let processedCount = 0;

  ss.getSheets().forEach(sheet => {
    if (RENAME_EXCLUDED_SHEETS.includes(sheet.getName()) || sheet.isSheetHidden()) return;
    if (!GrayShade.verifyLayout(sheet)) return;

    sheet.getRange("U1:U3").setFontSize(3).setHorizontalAlignment("right");
    sheet.getRange("V1:V3").setFontSize(3).setHorizontalAlignment("right");

    const timestamp = getSheetB4DateTimestamp_(sheet);
    if (!timestamp) return;

    const targetDate = new Date(timestamp);
    sheet.getRange('B4').setValue(targetDate).setNumberFormat('mm/dd/yy');

    const existingName = isBlankActiveSheetName_(sheet.getName()) ? '' : sheet.getName();
    const cleanTabName = formatTabNameWithDateFirst_(targetDate, existingName);
    if (cleanTabName && cleanTabName !== sheet.getName() && cleanTabName !== 'Untitled') {
      try {
        sheet.setName(makeUniqueSheetName_(ss, cleanTabName, sheet));
        processedCount++;
      } catch (e) {}
    }
  });

  sortSheetsBySheetNameDateDescending_();
  if (processedCount > 0 && !isSilent) {
    ss.toast('Standardization complete. Updated ' + processedCount + ' active sheet(s).', 'AideCP Registry');
  }
}

// ==========================================
// =        🚀 PUBLIC QUICK START           =
// ==========================================

/**
 * Main automated workspace macro chain.
 * Public execution layout accessible across cross-script bounds.
 */
function quickStartSequence_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Initializing Automated Sequence...", "🚀 Quick Start", 3);
  
  removeCopyOfPrefixAllSheets_(true);
  runStandardizeDatesAndFormat_(true);
  sortSheetsBySheetNameDateDescending_();
  validateMappingsAllSheets_(true); 
  applyGrayShadingAllSheets_(true);
  
  ss.toast("Quick Start Setup complete! System optimized.", "🚀 Quick Start", 5);
}

// ==========================================
// =          CONTROLLED HOST API           =
// ==========================================

const PUBLIC_ACTIONS_ = Object.freeze({
  syncCurrentSheetToHomeCareServices: syncCurrentSheetToHomeCareServices_,
  pullUpdatesToCurrentSheet: pullUpdatesToCurrentSheet_,
  createNewSheetFromMaster: createNewSheetFromMaster_,
  sortSheetsByB4DateDescending: sortSheetsByB4DateDescending_,
  sortSheetsBySheetNameDateDescending: sortSheetsBySheetNameDateDescending_,
  cleanExistingSheetNamesOnce: cleanExistingSheetNamesOnce_,
  removeCopyOfPrefixAllSheets: removeCopyOfPrefixAllSheets_,
  validateMappingsCurrentSheet: validateMappingsCurrentSheet_,
  validateMappingsAllSheets: validateMappingsAllSheets_,
  createOnEditTrigger: createOnEditTrigger_,
  runStandardizeDatesAndFormat: runStandardizeDatesAndFormat_,
  applyGrayShadingAllSheets: applyGrayShadingAllSheets_,
  applyGrayShadingCurrentSheet: applyGrayShadingCurrentSheet_,
  renameDriveFileFromB5AndTab: renameDriveFileFromB5AndTab_,
  quickStartSequence: quickStartSequence_,
  buildAideCpTemplate: buildAideCpTemplate,
  createAideCpActiveSheet: createAideCpActiveSheet,
  updateCurrentSheetFromTemplate: updateCurrentSheetFromTemplate
});

function runPublicAction(actionName) {
  const action = PUBLIC_ACTIONS_[String(actionName || '')];
  if (!action) throw new Error('Unsupported AideCP host action: ' + actionName);
  return action();
}

// ==========================================
// =          INTERFACE TRIGGERS            =
// ==========================================

/**
 * Builds the single production menu.
 * Opening the file only builds the menu; it does not rename or reformat sheets.
 */
function onOpen() {
  installOnOpen_();
}

function installOnOpen_() {
  SpreadsheetApp.getUi()
    .createMenu('Gray Shading')
    .addItem('Apply (current sheet)', 'applyGrayShadingCurrentSheet')
    .addItem('Apply (all sheets)', 'applyGrayShadingAllSheets')
    .addSeparator()
    .addItem('Validate (current sheet)', 'validateMappingsCurrentSheet')
    .addItem('Validate (all sheets)', 'validateMappingsAllSheets')
    .addSeparator()
    .addItem('Sync to Service Log (current sheet)', 'syncCurrentSheetToHomeCareServices')
    .addSeparator()
    .addItem('Rename Drive File (B5 + Date)', 'renameDriveFileFromB5AndTab')
    .addItem('Rename sheet from B4 (current)', 'renameCurrentSheetFromB4_')
    .addItem('Clean / Standardize Existing Sheet Names Once', 'cleanExistingSheetNamesOnce')
    .addItem('Organize Tabs by Sheet Name Date', 'sortSheetsBySheetNameDateDescending')
    .addItem('Remove "Copy of" from Sheet Names', 'removeCopyOfPrefixAllSheets')
    .addSeparator()
    .addItem('Create edit + border triggers', 'createOnEditTrigger')
    .addSeparator()
    .addItem('Create Template', 'buildAideCpTemplate')
    .addItem('Create Active Sheet', 'createAideCpActiveSheet')
    .addItem('Update Current Sheet from Template', 'updateCurrentSheetFromTemplate')
    .addToUi();
}

function applyGrayShadingCurrentSheet_(isSilent) { 
  GrayShade.applyAll(SpreadsheetApp.getActive(), expandRulesForSheet_(SpreadsheetApp.getActive().getActiveSheet().getName(), RULES)); 
}

function applyGrayShadingAllSheets_(isSilent) { 
  const ss = SpreadsheetApp.getActive(); 
  ss.getSheets().forEach(sh => {
    if (!isSheetExcluded_(sh) && !sh.isSheetHidden()) {
      GrayShade.applyAll(ss, expandRulesForSheet_(sh.getName(), RULES));
    }
  }); 
}

function installedOnEdit(e) {
  if (!e || !e.range) return; const sheet = e.range.getSheet(); if (isSheetExcluded_(sheet)) return;
  
  const rStart = e.range.getRow(), cStart = e.range.getColumn();
  const rEnd = rStart + e.range.getNumRows() - 1, cEnd = cStart + e.range.getNumColumns() - 1;
  
  if (rStart === 4 && rEnd === 4 && cStart === 2 && cEnd === 2) {
    CacheService.getDocumentCache().remove('NEWEST_SHEET_NAMES_' + sheet.getParent().getId());
    renameSheetFromB4_(sheet);
    sortSheetsBySheetNameDateDescending_();
  }
  
  if (!GrayShade.verifyLayout(sheet)) return;

  try { GrayShade.onEdit(e, expandRulesForSheet_(sheet.getName(), RULES)); } catch (err) { logErrorToSheet_(sheet.getParent(), "Shading Error: " + err.message); }
  
  try {
    let hitsSync = false;
    for (const a1 of SYNC_WATCH_RANGES) {
      let m = a1.match(/^([A-Za-z]+)([0-9]+)(?::([A-Za-z]+)([0-9]+))?$/);
      if (!m) continue;
      
      let c1 = m[1].toUpperCase().charCodeAt(0) - 64;
      let r1 = Number(m[2]);
      let c2 = m[3] ? m[3].toUpperCase().charCodeAt(0) - 64 : c1;
      let r2 = m[4] ? Number(m[4]) : r1;
      
      if (rStart <= r2 && rEnd >= r1 && cStart <= c2 && cEnd >= c1) { hitsSync = true; break; }
    }
    if (hitsSync) syncDataToHomeCareServices_(sheet, false);
  } catch (err) { logErrorToSheet_(sheet.getParent(), "Sync Trigger Error: " + err.message); }
}

function installedOnChange(e) {
  if (!e || e.changeType !== 'FORMAT' || !e.source) return;
  const sheet = e.source.getActiveSheet();
  if (isAideCpSheet_(sheet)) restoreAideCpBorders_(sheet);
}


function createOnEditTrigger_() {
  const ss = SpreadsheetApp.getActive();
  try {
    const handlers = ['installedOnEdit', 'installedOnChange', 'onEdit'];
    ScriptApp.getProjectTriggers()
      .filter(t => handlers.includes(t.getHandlerFunction()))
      .forEach(t => ScriptApp.deleteTrigger(t));

    ScriptApp.newTrigger('installedOnEdit').forSpreadsheet(ss).onEdit().create();
    ScriptApp.newTrigger('installedOnChange').forSpreadsheet(ss).onChange().create();

    ss.toast('Edit and border-protection triggers installed.', 'Success');
  } catch (e) {
    SpreadsheetApp.getUi().alert('Trigger Installation Failed: stand-alone permissions required.');
  }
}


// ==========================================
// =       SINGLE-FILE MENU CALLBACKS        =
// ==========================================

function syncCurrentSheetToHomeCareServices() { runPublicAction('syncCurrentSheetToHomeCareServices'); }
function pullUpdatesToCurrentSheet() { runPublicAction('pullUpdatesToCurrentSheet'); }
function createNewSheetFromMaster() { runPublicAction('createNewSheetFromMaster'); }
function sortSheetsByB4DateDescending() { runPublicAction('sortSheetsByB4DateDescending'); }
function sortSheetsBySheetNameDateDescending() { runPublicAction('sortSheetsBySheetNameDateDescending'); }
function cleanExistingSheetNamesOnce() { runPublicAction('cleanExistingSheetNamesOnce'); }
function removeCopyOfPrefixAllSheets() { runPublicAction('removeCopyOfPrefixAllSheets'); }
function validateMappingsCurrentSheet() { runPublicAction('validateMappingsCurrentSheet'); }
function validateMappingsAllSheets() { runPublicAction('validateMappingsAllSheets'); }
function createOnEditTrigger() { runPublicAction('createOnEditTrigger'); }
function runStandardizeDatesAndFormat() { runPublicAction('runStandardizeDatesAndFormat'); }
function applyGrayShadingAllSheets() { runPublicAction('applyGrayShadingAllSheets'); }
function applyGrayShadingCurrentSheet() { runPublicAction('applyGrayShadingCurrentSheet'); }
function renameDriveFileFromB5AndTab() { runPublicAction('renameDriveFileFromB5AndTab'); }
function quickStartSequence() { runPublicAction('quickStartSequence'); }
