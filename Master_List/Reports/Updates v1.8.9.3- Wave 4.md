# **Updates v1.8.9.3- Wave 4**

### 

You are an expert Google Apps Script developer. I need you to refactor the "Dashboard Quality" reporting architecture in the provided script. 

Currently, the script uses monolithic helper functions (\`runDashboardQualityTemplateAndFormatSections\_\` and \`runDashboardQualityDashboardVerificationSections\_\`) to execute quality checks. I need to break these down into modular runners so I can control the exact execution order of specific sections (Sections A through R) across 6 distinct menu triggers.

Here are the requirements based on the release plan "WAVE\_4\_RELEASE\_PLAN\_AND\_TODO\_CHECKLIST\_v1.8.9.3.md.pdf":

\#\#\# STEP 1: Rename and Clean Up  
1\. Rename all instances of \`runDashboardQualityFull\` to \`runDashboardQualityWorkflow\` across the entire script (including menu arrays, \`onOpen\`, and wrapper functions like \`runAllFrameworkTestsAndBuildDashboard\`).  
2\. Delete the old monolithic helper functions: \`runDashboardQualityTemplateAndFormatSections\_\` and \`runDashboardQualityDashboardVerificationSections\_\`.

\#\#\# STEP 2: Update the Menu UI  
Update the \`qualityMenu\` inside the \`onOpen()\` function to include the following triggers:  
\* "Dashboard Quality Start up" \-\> \`runDashboardQualityStartUp\`  
\* "Dashboard Quality Validate Templates" \-\> \`runDashboardQualityValidateTemplates\`  
\* "Dashboard Quality Workflow" \-\> \`runDashboardQualityWorkflow\`  
\* "Framework Smoke Validation" \-\> \`runFrameworkSmokeValidation\`  
\* "Full Quality Check" \-\> \`runFullQualityCheck\`  
\* "Format Dashboard Updates" \-\> \`runFormatDashboardUpdates\`

\#\#\# STEP 3: Create Modular Helper Functions  
Create new helper functions that batch write to the Dashboard Quality Report.   
1\. \`runDashboardQualityConfigVerificationSections\_(timing, qualitySheet)\`: Executes and stages Sections A, B, C, F, D, E (in that exact order), then flushes them to the sheet.  
2\. \`runDashboardQualityTemplateValidationSection\_(timing, qualitySheet, dashboard)\`: Executes Section G and flushes to the sheet.  
3\. \`runDashboardQualityChangelogSection\_(timing, qualitySheet, dashboardSheet)\`: Executes Section H and flushes to the sheet.

\#\#\# STEP 4: Implement the 6 Main Triggers  
Implement the core trigger functions to execute the modular helpers and specific sections in the exact order requested below. Always use \`flushStagedDashboardQualitySectionsRows\_(qualitySheet, timing);\` at the end of the workflows (except for Smoke Validation).

\*\*1. runDashboardQualityStartUp()\*\*  
\* Order: Sections A, B, C, F, D, E (via config helper)  
\* Order: Section I (Framework Health Check)

\*\*2. runDashboardQualityValidateTemplates()\*\*  
\* Order: Section G (Template Validation helper)

\*\*3. runDashboardQualityWorkflow()\*\*  
\* Order: Section H (Changelog helper)  
\* Order: Section I (Framework Health Check)  
\* Order: Sections J, K, L, M, N, O, P (via existing \`runOperationalDataPipelineValidations\_\`)  
\* Order: Section Q (Summary)  
\* Order: Section R (Signoff)

\*\*4. runFrameworkSmokeValidation()\*\*  
\* Keep this exactly as it is (it acts as an isolated architectural guard and writes to Section I, throwing a fatal error if guards fail).

\*\*5. runFullQualityCheck()\*\*  
\* Order: Sections A, B, C, F, D, E (via config helper)  
\* Order: Section G (Template Validation helper)  
\* Order: Section H (Changelog helper)  
\* Order: Section I (Framework Health Check)  
\* Order: Sections J, K, L, M, N, O, P (via existing \`runOperationalDataPipelineValidations\_\`)  
\* Order: Section Q (Summary)  
\* Order: Section R (Signoff)

\*\*6. runFormatDashboardUpdates()\*\*  
\* Order: Section H (Changelog helper)

Please output the fully refactored script blocks replacing the old quality functions. Do not alter any unrelated operational logic, variables, or constants outside of the Dashboard Quality functions.

### 

### **Step 1: Update the Menu Triggers**

Replace your existing qualityMenu block inside the onOpen() function with the updated version below to add the new triggers:

JavaScript

```
  // 4. Maintenance/Rebuild Menu
  const qualityMenu = ui.createMenu("👌 Quality")
    .addItem("Dashboard Quality Start up", "runDashboardQualityStartUp")
    .addItem("Dashboard Quality Validate Templates", "runDashboardQualityValidateTemplates")
    .addItem("Dashboard Quality Workflow", "runDashboardQualityWorkflow")
    .addItem("Framework Smoke Validation", "runFrameworkSmokeValidation")
    .addItem("Full Quality Check", "runFullQualityCheck")
    .addItem("Format Dashboard Updates", "runFormatDashboardUpdates");
```

*(Note: If you have a Quick Start menu pointing to "runDashboardQualityFull", update it to point to "runDashboardQualityWorkflow").*

### **Step 2: Add the Modular Section Helpers**

Add these three helper functions to your script. They break the monolithic quality checks into specific chunks so they can be arranged in the exact order requested.

JavaScript

```
// ============================================================================
// MODULAR DASHBOARD QUALITY RUNNERS
// ============================================================================

function runDashboardQualityConfigVerificationSections_(timing, qualitySheet) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboard = ss.getSheetByName(RFF_DASHBOARD_SHEET);
  if (!dashboard) return;

  repairFormatDashboardSectionHeaders_(dashboard, timing);
  const dashboardIndex = buildDashboardSectionIndex_(dashboard);

  // NOTE: Section F is explicitly evaluated before D and E in the payload array
  const sectionPayloads = [
    { key: RFF_DASHBOARD_VERIFY_GLOBAL_KEY, rows: collectFormatDashboardGlobalInputVerificationRows_(dashboardIndex), label: "Section A Global Inputs verified" },
    { key: RFF_DASHBOARD_VERIFY_SHEETS_KEY, rows: collectFormatDashboardSheetDefinitionVerificationRows_(dashboardIndex), label: "Section B Sheet Definitions verified" },
    { key: RFF_DASHBOARD_VERIFY_BEHAVIORS_KEY, rows: collectFormatDashboardSheetBehaviorVerificationRows_(dashboardIndex), label: "Section C Sheet Behaviors verified" },
    { key: RFF_DASHBOARD_VERIFY_TAB_ORGANIZATION_KEY, rows: collectFormatDashboardTabOrganizationVerificationRows_(dashboardIndex), label: "Section F Tab Organization verified" },
    { key: RFF_DASHBOARD_VERIFY_COLUMNS_KEY, rows: collectFormatDashboardColumnDefinitionVerificationRows_(dashboardIndex), label: "Section D Column Definitions verified" },
    { key: RFF_DASHBOARD_VERIFY_HEADERS_KEY, rows: collectFormatDashboardSheetHeaderVerificationRows_(dashboardIndex), label: "Section E Sheet Headers verified" }
  ];

  const sectionWrites = [];
  sectionPayloads.forEach(function(item) {
    const previousRows = getDashboardQualitySectionRows_(item.key);
    const changed = !dashboardQualityRowsEqualValues_(previousRows, item.rows);
    saveDashboardQualitySectionRows_(item.key, item.rows, { deferSheetWrite: true });
    markFrameworkStep_(timing, item.label + (changed ? "" : " skipped - unchanged"));
    
    if (changed) {
      sectionWrites.push({
        title: getDashboardQualitySectionTitleForKey_(item.key),
        rows: buildTimestampedDashboardQualitySectionRows_(item.key, item.rows)
      });
    }
  });

  if (sectionWrites.length) {
    replaceDashboardQualitySectionsRows_(qualitySheet, sectionWrites);
    markFrameworkStep_(timing, "Dashboard Quality Config Sections (A-F) batch written");
  }
}

function runDashboardQualityTemplateValidationSection_(timing, qualitySheet, dashboard) {
  const previousValidationRows = getDashboardQualitySectionRows_(RFF_VALIDATION_SHEET);
  validateReportTemplatesCore_(dashboard, timing, { deferDashboardWrite: true });
  const validationRows = getDashboardQualitySectionRows_(RFF_VALIDATION_SHEET);

  if (!dashboardQualityRowsEqualValues_(previousValidationRows, validationRows)) {
    replaceDashboardQualitySectionsRows_(qualitySheet, [{
      title: getDashboardQualitySectionTitleForKey_(RFF_VALIDATION_SHEET),
      rows: buildTimestampedDashboardQualitySectionRows_(RFF_VALIDATION_SHEET, validationRows)
    }]);
    markFrameworkStep_(timing, "Dashboard Quality Section G written");
  }
}

function runDashboardQualityChangelogSection_(timing, qualitySheet, dashboardSheet) {
  if (!dashboardSheet) return;
  const previousChangelogRows = getDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY);
  const changelogUpdated = updateFormatDashboardChangelog_(dashboardSheet, timing);
  const changelogRows = getDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY);

  if (!dashboardQualityRowsEqualValues_(previousChangelogRows, changelogRows) || changelogUpdated) {
    replaceDashboardQualitySectionsRows_(qualitySheet, [{
      title: getDashboardQualitySectionTitleForKey_(RFF_DASHBOARD_CHANGELOG_KEY),
      rows: buildTimestampedDashboardQualitySectionRows_(RFF_DASHBOARD_CHANGELOG_KEY, changelogRows)
    }]);
    markFrameworkStep_(timing, "Dashboard Quality Section H written");
  }
  highlightFormatDashboardChangesFromChangelog_(dashboardSheet, timing);
}
```

### **Step 3: Replace the Core Trigger Workflows**

Replace your existing runDashboardQualityStartUp, runDashboardQualityValidateTemplates, and runDashboardQualityFull functions with these explicit workflow configurations:

JavaScript

```
// 1. Dashboard Quality Start up
function runDashboardQualityStartUp() {
  return runFrameworkTimed_("Dashboard Quality Start Up", function(timing) {
    clearDashboardConfigCache_();
    const qualitySheet = ensureDashboardQualityReportSheet_();
    ensureDashboardQualitySheetShellForWorkflow_(qualitySheet, loadDashboardConfig_(true), timing);

    // Order: 1-6 (A, B, C, F, D, E)
    runDashboardQualityConfigVerificationSections_(timing, qualitySheet);

    // Order: 7 (I)
    runDashboardQualitySectionIfDue_(RFF_HEALTH_CHECK_SHEET, "Section I Framework Health Check", runFrameworkHealthCheck, timing);

    flushStagedDashboardQualitySectionsRows_(qualitySheet, timing);
    return true;
  });
}

// 2. Dashboard Quality Validate Templates
function runDashboardQualityValidateTemplates() {
  return runFrameworkTimed_("Dashboard Quality Validate Templates", function(timing) {
    const dashboard = loadDashboardConfig_(true);
    const qualitySheet = ensureDashboardQualityReportSheet_();
    ensureDashboardQualitySheetShellForWorkflow_(qualitySheet, dashboard, timing);

    // Order: 1 (G)
    runDashboardQualityTemplateValidationSection_(timing, qualitySheet, dashboard);

    flushStagedDashboardQualitySectionsRows_(qualitySheet, timing);
    return true;
  });
}

// 3. Dashboard Quality Workflow
function runDashboardQualityWorkflow() {
  return runFrameworkTimed_("Dashboard Quality Workflow", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
    const qualitySheet = ensureDashboardQualityReportSheet_();

    // Order: 1 (H)
    runDashboardQualityChangelogSection_(timing, qualitySheet, dashboardSheet);

    // Order: 2 (I)
    runDashboardQualitySectionIfDue_(RFF_HEALTH_CHECK_SHEET, "Section I Framework Health Check", runFrameworkHealthCheck, timing);

    // Order: 3-9 (J, K, L, M, N, O, P)
    runOperationalDataPipelineValidations_(timing, qualitySheet);

    // Order: 10-11 (Q, R - Deferred until all prior audits conclude)
    runDashboardQualitySectionIfDue_("Summary", "Section Q Summary", updateDashboardQualitySummarySection_, timing);
    runDashboardQualitySectionIfDue_("Signoff", "Section R Signoff", updateDashboardQualitySignoffSection_, timing);

    // Order: 12 (Batch write flush)
    flushStagedDashboardQualitySectionsRows_(qualitySheet, timing);
    writeCombinedFrameworkTimingReport_();
    return true;
  });
}

// 5. Full Quality Check
function runFullQualityCheck() {
  return runFrameworkTimed_("Full Quality Check", function(timing) {
    clearDashboardConfigCache_();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
    const dashboard = loadDashboardConfig_(true);
    const qualitySheet = ensureDashboardQualityReportSheet_();
    ensureDashboardQualitySheetShellForWorkflow_(qualitySheet, dashboard, timing);

    // Order: 1-6 (A, B, C, F, D, E)
    runDashboardQualityConfigVerificationSections_(timing, qualitySheet);

    // Order: 7 (G)
    runDashboardQualityTemplateValidationSection_(timing, qualitySheet, dashboard);

    // Order: 8 (H)
    runDashboardQualityChangelogSection_(timing, qualitySheet, dashboardSheet);

    // Order: 9 (I)
    runDashboardQualitySectionIfDue_(RFF_HEALTH_CHECK_SHEET, "Section I Framework Health Check", runFrameworkHealthCheck, timing);

    // Order: 10-16 (J, K, L, M, N, O, P)
    runOperationalDataPipelineValidations_(timing, qualitySheet);

    // Order: 17-18 (Q, R)
    runDashboardQualitySectionIfDue_("Summary", "Section Q Summary", updateDashboardQualitySummarySection_, timing);
    runDashboardQualitySectionIfDue_("Signoff", "Section R Signoff", updateDashboardQualitySignoffSection_, timing);

    flushStagedDashboardQualitySectionsRows_(qualitySheet, timing);
    writeCombinedFrameworkTimingReport_();
    return true;
  });
}

// 6. Format Dashboard Updates
function runFormatDashboardUpdates() {
  return runFrameworkTimed_("Format Dashboard Updates", function(timing) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashboardSheet = ss.getSheetByName(RFF_DASHBOARD_SHEET);
    const qualitySheet = ensureDashboardQualityReportSheet_();

    // Order: 1 (H)
    runDashboardQualityChangelogSection_(timing, qualitySheet, dashboardSheet);

    flushStagedDashboardQualitySectionsRows_(qualitySheet, timing);
    return true;
  });
}
```

(Note: You can safely delete `runDashboardQualityTemplateAndFormatSections_` and `runDashboardQualityDashboardVerificationSections_` from your old script, as the logic is now fully managed by the explicit sequencing above). 

### **1 & 2\. The Menu Callback Arrays**

Near the top of your menu configurations, you have two arrays mapping out the callbacks. Update the string in both lists.

**Change from:**

JavaScript

```
  quickStart: Object.freeze([
    "quickSystemSetup",
    "quickBuildAllTemplates",
    "runDashboardQualityFull",
    "runFrameworkSmokeValidation"
  ]),
  maintenanceRebuild: Object.freeze([
    "runDashboardQualityStartUp",
    "runDashboardQualityValidateTemplates",
    "runDashboardQualityFull",
    "formatBannerReport",
//...
```

**Change to:**

JavaScript

```
  quickStart: Object.freeze([
    "quickSystemSetup",
    "quickBuildAllTemplates",
    "runDashboardQualityWorkflow",
    "runFrameworkSmokeValidation"
  ]),
  maintenanceRebuild: Object.freeze([
    "runDashboardQualityStartUp",
    "runDashboardQualityValidateTemplates",
    "runDashboardQualityWorkflow",
    "formatBannerReport",
//...
```

### **3 & 4\. The Menu UI Items**

Inside the `onOpen()` function, update the actual menu items for the Quick Start and Quality menus.

**Change from:**

JavaScript

```
  // 3. Quick Start-up Menu
  const quickStartMenu = ui.createMenu("🚀 Quick Start-up")
    .addItem("🏗️ System Set up", "quickSystemSetup")
    .addItem("🖼️ Build Templates + Validate Templates", "quickBuildAllTemplates")
    .addItem("✅ Dashboard Quality Workflow", "runDashboardQualityFull");

  // 4. Maintenance/Rebuild Menu
  const qualityMenu = ui.createMenu("👌 Quality")
    .addItem("Dashboard Quality Start up", "runDashboardQualityStartUp")
    .addItem("Dashboard Quality Validate Templates", "runDashboardQualityValidateTemplates")
    .addItem("Dashboard Quality Workflow", "runDashboardQualityFull")
//...
```

**Change to:**

JavaScript

```
  // 3. Quick Start-up Menu
  const quickStartMenu = ui.createMenu("🚀 Quick Start-up")
    .addItem("🏗️ System Set up", "quickSystemSetup")
    .addItem("🖼️ Build Templates + Validate Templates", "quickBuildAllTemplates")
    .addItem("✅ Dashboard Quality Workflow", "runDashboardQualityWorkflow");

  // 4. Maintenance/Rebuild Menu
  const qualityMenu = ui.createMenu("👌 Quality")
    .addItem("Dashboard Quality Start up", "runDashboardQualityStartUp")
    .addItem("Dashboard Quality Validate Templates", "runDashboardQualityValidateTemplates")
    .addItem("Dashboard Quality Workflow", "runDashboardQualityWorkflow")
//...
```

### **5\. The Function Definition**

If you haven't already replaced the core function, make sure the old `function runDashboardQualityFull()` block is entirely deleted and replaced by the new `function runDashboardQualityWorkflow()` from the previous snippet.

### **6\. The "Run All" Wrapper Function**

Down near the bottom of your script, there is a wrapper function called `runAllFrameworkTestsAndBuildDashboard()`. Update the call inside it.

**Change from:**

JavaScript

```
function runAllFrameworkTestsAndBuildDashboard() {
  return runFrameworkTimed_("Run All Framework Tests + Dashboard", function(timing) {
    runDashboardQualityQuick();
    markFrameworkStep_(timing, "Dashboard Quality Quick complete");
    runDashboardQualityFull();
    markFrameworkStep_(timing, "Dashboard Quality Workflow complete");
  });
}
```

**Change to:**

JavaScript

```
function runAllFrameworkTestsAndBuildDashboard() {
  return runFrameworkTimed_("Run All Framework Tests + Dashboard", function(timing) {
    runDashboardQualityQuick();
    markFrameworkStep_(timing, "Dashboard Quality Quick complete");
    runDashboardQualityWorkflow();
    markFrameworkStep_(timing, "Dashboard Quality Workflow complete");
  });
}
```

Once you run a quick Find/Replace for `runDashboardQualityFull` \-\> `runDashboardQualityWorkflow`, your menus and wrappers will properly point to the refactored modular pipeline.

