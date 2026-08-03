You are an expert Google Apps Script architect. Your task is to refactor the provided v1.93.1 unified production script to optimize concurrency, performance, and maintainability. You must preserve all existing business logic, formatting engine rules, and telemetry integrations.

Implement the following five architectural improvements:

**1\. Refine Concurrency (Locking) Strategy**

* **Remove** the `LockService.getDocumentLock()` acquisition and release logic from the global `runFrameworkTimed_` wrapper. This wrapper must execute without blocking concurrent read-only tasks.  
* **Apply** `LockService` explicitly to write-heavy, destructive, or layout-altering functions.  
* **Target Functions:** Add a 30,000ms `.tryLock()` and a `finally { lock.releaseLock(); }` block directly inside:  
  * `archiveMonthlySheetsBySpecs_`  
  * `createMasterListForMonth_`  
  * `createDisenrolledListForMonth_`  
  * `processSingleSubReport_`  
  * `updateDemoPMonthlySyncForMonth_`  
  * `buildMonthlyChangeReportForMonth_`  
  * `buildRefinedDataFromScratch`

**2\. Centralize "Magic Strings" into a Configuration Object**

* Create a global constant at the top of the file to manage system sheet names and prefixes:  
* JavaScript

```
const SYSTEM_SHEETS = Object.freeze({
  DASHBOARD: "Format Dashboard",
  DASHBOARD_DEFAULT: "Default - Format Dashboard",
  INDEX: "Index",
  TIMING: "Framework Timing Report",
  QUALITY: "Dashboard Quality Report",
  BASE_TEMPLATE: "RFF_BASE_TEMPLATE",
  TEMPLATE_PREFIX: "Template - ",
  SOURCE_PREFIX: "Source - "
});
```

*   
* Scan the codebase and replace all hardcoded inline string literals matching these names with their corresponding `SYSTEM_SHEETS` property.

**3\. Eliminate Silent "Swallowed" Exceptions**

* Locate all `try...catch` blocks that currently have empty catch statements (e.g., `catch (e) {}` or `catch (err) {}`).  
* Inject the framework's native warning logger into these blocks to ensure failures are tracked in the telemetry engine without halting execution.  
* **Implementation:** `catch (e) { logBestEffortWarning_("Non-fatal operation failed: " + e.message); }`

**4\. Optimize Google Sheets API Calls**

* Identify functions that repeatedly call `SpreadsheetApp.getActiveSpreadsheet()` within loops or sequential lines (e.g., `hideSystemSheetsNow`, `showSystemSheetsNow`, `organizeTabs`).  
* Refactor these functions to declare `const ss = SpreadsheetApp.getActiveSpreadsheet();` exactly once at the top of the execution block.  
* Pass the `ss` variable down as an argument to any nested helper functions to minimize expensive external API requests.  
  