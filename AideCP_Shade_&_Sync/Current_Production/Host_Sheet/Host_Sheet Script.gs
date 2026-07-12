// ==========================================
// =        🚀 PUBLIC QUICK START           =
// ==========================================

/**
 * Main automated workspace macro chain.
 * Removed trailing underscore to make this public and accessible to Host Sheets.
 */
function quickStartSequence() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Initializing Automated Sequence...", "🚀 Quick Start", 3);
  
  removeCopyOfPrefixAllSheets(true);
  runStandardizeDatesAndFormat_(true);
  sortSheetsByB4DateDescending_();
  validateMappingsAllSheets_(true); 
  applyGrayShadingAllSheets_(true);
  
  ss.toast("Quick Start Setup complete! System optimized.", "🚀 Quick Start", 5);
}

// ==========================================
// =          INTERFACE TRIGGERS            =
// ==========================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  const syncMenu = ui.createMenu('🔄Sync')
    .addItem('Push Sync to Service Log (Current Sheet)', 'syncCurrentSheetToHomeCareServices')
    .addItem('Pull Updates to Current Sheet', 'pullUpdatesToCurrentSheet')
    .addItem('Create New Sheet from Master', 'createNewSheetFromMaster');

  const maintMenu = ui.createMenu('🛠️ Maintenance')
    .addItem('Organize Tabs by Date', 'sortSheetsByB4DateDescending_')
    .addItem('Remove "Copy of" (all sheets)', 'removeCopyOfPrefixAllSheets')
    .addItem('Validate Configuration (Current Tab)', 'validateMappingsCurrentSheet_')
    .addItem('Validate Configuration (All Tabs)', 'validateMappingsAllSheets_')
    .addItem('Create onEdit trigger', 'createOnEditTrigger_')
    .addItem('Validate Current Sheet', 'validateMappingsCurrentSheet_');

  const setupMenu = ui.createMenu('🏗️Setup')
    .addItem('Validate All Sheets', 'validateMappingsAllSheets_')
    .addItem('sheets Remove "Copy of"', 'removeCopyOfPrefixAllSheets')
    .addItem('Standardize Dates use mm/dd/yy', 'runStandardizeDatesAndFormat_')
    .addItem('Organize Tabs by date', 'sortSheetsByB4DateDescending_')
    .addItem('Apply Shade (all sheets)', 'applyGrayShadingAllSheets_');

  ui.createMenu('🏥 AideCP Shade & Sync')
    .addItem('😎 Apply (current sheet)', 'applyGrayShadingCurrentSheet_')
    .addItem('Rename Drive File (B5 + Date)', 'renameDriveFileFromB5AndTab')
    .addSubMenu(syncMenu)
    .addSubMenu(maintMenu)
    .addItem('🚀 Quick Start -  includes all of the Set Up functions in order', 'quickStartSequence_') // Points to Host wrapper
    .addSubMenu(setupMenu)
    .addToUi();

  try { runStandardizeDatesAndFormat_(true); } catch(e) { console.error("Startup alignment bypassed: " + e.message); }
}
