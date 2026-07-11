# EXHAUSTIVE GOOGLE APPS SCRIPT CODE REVIEW

You are acting as the Lead Google Apps Script Engineer and Code Auditor.

Perform a complete, exhaustive review of the Google Apps Script code in this repository.

## PRIMARY OBJECTIVE

Review the entire script or library for:

* Runtime errors
* Logic errors
* Missing dependencies
* Undefined functions, variables, constants, or configuration values
* Duplicate functions
* Orphaned functions
* Dead code
* Unreachable code
* Obsolete compatibility code
* Performance bottlenecks
* Excessive Spreadsheet service calls
* Incorrect Google Apps Script API usage
* Incorrect array indexing
* Incorrect row or column calculations
* Data-loss risks
* Concurrency risks
* Trigger risks
* Library compatibility risks
* Maintainability problems
* Inconsistent naming
* Incomplete error handling
* Incomplete validation
* Security or authorization concerns
* Logging and diagnostic weaknesses

Do not make assumptions based only on function names or comments. Trace the actual execution paths and dependencies.

---

# REQUIRED STARTUP REVIEW

Before reviewing code:

1. Determine the repository root.
2. Read `README.md`.
3. Read `AGENTS.md`, `AGENT.md`, or other repository instructions if present.
4. Read all specification, governance, architecture, mapping, and configuration documents.
5. Identify the current approved production script or library entry point.
6. Identify all supporting `.gs`, `.js`, `.html`, `.json`, `.txt`, and configuration files.
7. Identify the Apps Script manifest, including `appsscript.json`, if present.
8. Report any missing files required for a complete review.

Do not begin modifying code during the audit phase.

---

# PHASE 1 — REPOSITORY AND FILE INVENTORY

Create a complete inventory showing:

* File name
* File type
* Purpose
* Approximate responsibility
* Whether it is production code, testing code, configuration, documentation, archived code, or unknown
* Whether it appears to be loaded or referenced
* Whether it contains global declarations
* Whether it contains public library functions
* Whether it contains triggers or menu entry points

Identify:

* Duplicate files
* Outdated versions
* Archived scripts located in production folders
* Test code mixed into production code
* Files that are not referenced
* Conflicting copies of the same function

---

# PHASE 2 — FUNCTION INVENTORY

Build a complete function inventory.

For every function, document:

* Function name
* File name
* Parameters
* Return value
* Direct callers
* Direct dependencies
* Google Apps Script services used
* Spreadsheet sheets or ranges accessed
* Global variables or constants used
* Side effects
* Whether it reads data
* Whether it writes data
* Whether it deletes data
* Whether it creates or removes sheets
* Whether it is public, private, helper, trigger, menu function, test function, or library entry point
* Whether it is reachable
* Whether it appears duplicated
* Whether it appears obsolete
* Risk level

Create a call graph from public entry points down through all helper functions.

Do not classify a function as orphaned until all of the following have been checked:

* Direct calls
* Indirect calls
* Trigger execution
* Menu execution
* Dynamic invocation
* Function-name strings
* `google.script.run`
* Library consumers
* Apps Script API execution
* Time-driven triggers
* Spreadsheet triggers
* Form triggers
* Web app handlers
* HTML service callbacks

---

# PHASE 3 — STATIC ERROR REVIEW

Inspect all code for syntax and runtime risks, including:

* Missing braces, parentheses, commas, or quotes
* Incorrect object or array syntax
* Invalid Apps Script methods
* Misspelled service methods
* Undefined functions
* Undefined constants
* Undefined configuration keys
* Scope errors
* Shadowed variables
* Accidental globals
* Incorrect `this` usage
* Incorrect callback scope
* Incorrect use of arrow functions where Apps Script compatibility may matter
* Missing return statements
* Functions returning inconsistent data types
* Incorrect default values
* Null or undefined dereferencing
* Incorrect date parsing
* Incorrect comparison operators
* Assignment used instead of comparison
* Incorrect truthiness checks
* Case-sensitive string comparison problems
* Incorrect use of `getLastRow()` or `getLastColumn()`
* Off-by-one row or column errors
* Zero-based versus one-based indexing errors
* Incorrect range dimensions
* Mismatched array and range dimensions
* Empty-array writes
* Invalid sheet references
* Invalid named-range references
* Incorrect use of active spreadsheet, active sheet, or active range
* Implicit dependence on user selection
* Incorrect assumptions about headers or title rows
* Missing sheet-existence checks
* Missing data-existence checks

For each issue, identify:

* Severity
* File
* Function
* Relevant line or code block
* Why it is a problem
* Likely failure behavior
* Recommended correction

---

# PHASE 4 — EXECUTION PATH REVIEW

Trace every major workflow from its entry point to completion.

For each workflow, document:

1. Entry function
2. Validation steps
3. Sheets accessed
4. Data read
5. In-memory transformations
6. Data written
7. Formatting applied
8. Sheets created, copied, renamed, hidden, or deleted
9. Rows deleted or filtered
10. Logging performed
11. Error handling
12. Cleanup steps
13. Final expected result

Identify any workflow that:

* Can partially complete and leave corrupted output
* Deletes data before validating inputs
* Writes data before confirming range size
* Creates duplicate sheets
* Renames a sheet to an existing name
* Depends on the active spreadsheet or active sheet
* Continues after validation failure
* Suppresses errors
* Produces inconsistent output
* Leaves temporary sheets, properties, locks, or triggers behind

---

# PHASE 5 — DEPENDENCY AUDIT

Perform a full dependency audit.

Identify:

* Missing helper functions
* Missing constants
* Missing configuration objects
* Missing named ranges
* Missing sheets
* Missing library references
* Missing OAuth scopes
* Missing advanced services
* Missing external API dependencies
* Missing HTML files
* Missing trigger installation functions
* Missing manifest configuration
* Circular dependencies
* Hidden dependencies on execution order
* Hidden dependencies on file load order
* Hidden dependencies on prior function execution
* Hidden dependencies on script properties, document properties, or user properties

Determine whether every referenced dependency is:

* Defined
* Reachable
* Correctly scoped
* Initialized before use
* Compatible with library use
* Documented

---

# PHASE 6 — GOOGLE APPS SCRIPT LIBRARY REVIEW

Because this code may be used as an Apps Script library, specifically review:

* Which functions are intentionally public
* Which functions unintentionally become public
* Whether public function names are stable
* Whether consumers rely on global variables
* Whether private helpers are properly isolated
* Whether library functions depend on the active spreadsheet
* Whether the library incorrectly assumes container-bound execution
* Whether consumer spreadsheets must pass spreadsheet IDs, sheet objects, ranges, or configuration
* Whether mutable global state is used
* Whether cache, properties, or locks are scoped correctly
* Whether return values are serializable and appropriate for library consumers
* Whether errors are meaningful to calling scripts
* Whether library versioning is documented
* Whether breaking changes exist
* Whether deprecated functions need compatibility wrappers
* Whether internal functions could conflict with consumer functions
* Whether required OAuth scopes are documented
* Whether installable triggers can safely call library functions
* Whether trigger event objects are validated
* Whether the library can be executed concurrently by multiple consumer spreadsheets

Recommend a clear public API boundary.

Separate functions into:

* Public supported API
* Internal helpers
* Trigger handlers
* Administrative functions
* Diagnostic functions
* Test-only functions
* Deprecated functions
* Removal candidates

---

# PHASE 7 — PERFORMANCE REVIEW

Inspect performance at the workflow, function, and loop level.

Identify:

* `getValue()` or `setValue()` calls inside loops
* `getRange()` calls inside loops
* Repeated `getLastRow()` or `getLastColumn()` calls
* Repeated sheet lookups
* Repeated header lookups
* Repeated calls to `SpreadsheetApp.flush()`
* Repeated formatting calls
* Row-by-row deletion
* Column-by-column deletion
* Cell-by-cell formatting
* Repeated full-sheet reads
* Repeated full-sheet writes
* Unnecessary sorting
* Unnecessary sheet copies
* Excessive logging
* Inefficient use of filters
* Inefficient use of text finder
* Inefficient use of `appendRow()`
* Inefficient use of Maps, Sets, arrays, or object lookups
* Repeated parsing of dates, headers, or identifiers
* Algorithms with avoidable O(n²) behavior
* Quota risks
* Execution-time risks
* Memory risks
* Large-spreadsheet risks

For each major workflow, estimate:

* Number of spreadsheet reads
* Number of spreadsheet writes
* Number of formatting operations
* Number of delete operations
* Number of service calls inside loops
* Approximate time complexity
* Primary bottleneck

Recommend optimizations based on:

* One read
* In-memory processing
* One write
* Batch formatting
* Batch deletion
* Cached header maps
* Cached sheet references
* Map or Set lookups
* Reduced flush calls
* Buffered logging
* Locking only where needed

Do not recommend changes that alter business logic unless explicitly identified.

---

# PHASE 8 — DATA INTEGRITY AND DELETION REVIEW

Treat all deletion, replacement, clearing, filtering, and sheet-removal code as high risk.

Review every use of:

* `clear()`
* `clearContent()`
* `clearFormat()`
* `deleteRow()`
* `deleteRows()`
* `deleteColumn()`
* `deleteColumns()`
* `deleteSheet()`
* `removeDuplicates()`
* Filters
* Sorting
* Overwriting ranges
* Replacing sheet contents
* Copying templates over existing sheets

For each destructive operation, verify:

* The target sheet is correct
* Header rows are protected
* Title rows are protected
* Data start row is correct
* The range does not exceed actual data
* Empty datasets are handled
* The operation cannot affect unrelated sheets
* The operation cannot delete the wrong reporting period
* The operation cannot run before validation
* The operation can recover or fail safely

Identify every possible data-loss scenario.

---

# PHASE 9 — CONCURRENCY, LOCKING, AND TRIGGER REVIEW

Review:

* Simple triggers
* Installable triggers
* Time-driven triggers
* Edit triggers
* Open triggers
* Form-submit triggers
* Web app handlers
* Menu functions
* Manual execution entry points

Determine whether workflows could overlap.

Inspect use of:

* `LockService`
* Script locks
* Document locks
* User locks
* Properties used as busy flags
* Temporary state
* Cache
* Trigger creation and deletion

Identify:

* Duplicate execution risks
* Race conditions
* Concurrent writes
* Duplicate sheet creation
* Partial output caused by overlapping executions
* Stale lock or busy-state risks
* Triggers calling functions with incompatible arguments
* Trigger functions that depend on active user context

Recommend the minimum safe locking strategy.

---

# PHASE 10 — ERROR HANDLING AND LOGGING REVIEW

Inspect all:

* `try/catch/finally` blocks
* Silent catches
* Rethrown errors
* Custom error messages
* Logger calls
* Console calls
* Spreadsheet logging
* Timing reports
* Validation reports
* Toasts and UI alerts
* Email notifications

Identify:

* Errors that are hidden
* Errors that lose stack context
* Errors that continue execution incorrectly
* Errors that are too vague
* Logging that exposes sensitive information
* Logging that creates excessive spreadsheet growth
* Logging that slows execution
* Missing workflow start and completion records
* Missing failure records
* Missing row counts
* Missing timing records

Recommend a consistent error and diagnostic structure.

---

# PHASE 11 — SECURITY AND AUTHORIZATION REVIEW

Review:

* OAuth scopes
* External requests
* API keys
* Tokens
* Credentials
* Spreadsheet IDs
* Drive file IDs
* Email addresses
* Personally identifiable information
* Logs containing protected data
* Script, user, and document properties
* Web app access settings
* HTML output
* User-provided data
* Formula injection
* Spreadsheet formula creation
* URL fetching
* Email sending
* Drive permissions

Identify any hard-coded secrets or sensitive identifiers.

Do not expose secret values in the report. Report only their location and risk.

---

# PHASE 12 — CODE QUALITY AND MAINTAINABILITY REVIEW

Review consistency of:

* Naming
* Function size
* File organization
* Constants
* Configuration
* Comments
* JSDoc
* Return types
* Parameter validation
* Error messages
* Logging
* Header handling
* Date handling
* Sheet naming
* Range handling
* Service wrappers
* Public API design

Identify:

* Functions with too many responsibilities
* Repeated logic
* Copy-and-paste variants
* Magic numbers
* Magic strings
* Inconsistent naming
* Stale comments
* Comments that describe old behavior
* Excessive explanatory text inside production code
* Complex functions that should be decomposed
* Functions that should remain combined for performance
* Premature abstractions
* Over-engineered code

Do not recommend splitting code solely for style. Consider execution speed, traceability, and Apps Script file-loading behavior.

---

# PHASE 13 — DUPLICATE, DEAD, AND ORPHAN CODE AUDIT

Identify:

* Exact duplicate functions
* Near-duplicate functions
* Functions replaced by newer versions
* Helpers used only by obsolete workflows
* Constants with no references
* Configuration keys with no references
* Menus pointing to missing functions
* Functions not reachable from any supported entry point
* Test functions mixed into production
* Commented-out code
* Compatibility wrappers
* Deprecated entry points

For every removal candidate, provide:

* Function or declaration name
* File
* Evidence that it is unused
* Dependencies that would also become unused
* Risk of removal
* Whether removal is safe now or requires consumer verification

Do not delete any suspected public library function without explicitly flagging the potential breaking change.

---

# PHASE 14 — TESTABILITY REVIEW

Determine whether the code can be safely tested.

Identify tests needed for:

* Empty sheets
* Missing sheets
* Missing headers
* Duplicate headers
* Renamed headers
* Zero data rows
* One data row
* Large datasets
* Duplicate identifiers
* Blank identifiers
* Invalid dates
* Mixed date formats
* Invalid configuration
* Existing destination sheet
* Template mismatch
* Partial prior execution
* Concurrent execution
* API failure
* Trigger execution
* Library consumer execution
* Authorization failure

Separate proposed tests into:

* Unit-like pure-function tests
* Spreadsheet integration tests
* Destructive workflow tests
* Regression tests
* Performance tests
* Library compatibility tests

Do not run destructive tests against production data.

---

# PHASE 15 — SEVERITY CLASSIFICATION

Classify every finding as:

## CRITICAL

Likely to cause:

* Data loss
* Corruption
* Security exposure
* Wrong reporting output
* Complete workflow failure
* Destructive action on the wrong sheet or range

## HIGH

Likely to cause:

* Frequent runtime failure
* Missing dependencies
* Incorrect results
* Trigger conflicts
* Severe performance degradation
* Library consumer failures

## MEDIUM

Likely to cause:

* Edge-case failures
* Maintainability problems
* Inconsistent behavior
* Difficult troubleshooting
* Unnecessary service calls

## LOW

Includes:

* Naming problems
* Documentation gaps
* Minor duplication
* Nonessential cleanup
* Style inconsistencies

Separate confirmed defects from suspected risks.

Use these labels:

* Confirmed defect
* Probable defect
* Conditional risk
* Optimization opportunity
* Maintainability issue
* Documentation issue

---

# REQUIRED DELIVERABLES

Produce the following files or report sections.

## 1. Executive Review Summary

Include:

* Overall health rating
* Production readiness
* Library readiness
* Number of critical findings
* Number of high findings
* Number of medium findings
* Number of low findings
* Highest-risk workflows
* Primary performance bottlenecks
* Primary maintainability concerns
* Recommended next action

## 2. Complete Findings Register

Use a table with:

* Finding ID
* Severity
* Confidence
* Category
* File
* Function
* Description
* Evidence
* Impact
* Recommended correction
* Breaking-change risk
* Testing required

## 3. Function and Dependency Inventory

Include every function, caller, dependency, side effect, and status.

## 4. Public Library API Report

Include:

* Supported public functions
* Suspected accidental public functions
* Deprecated functions
* Breaking-change risks
* Required consumer inputs
* Recommended API boundary

## 5. Orphan and Duplicate Code Report

Include evidence for every removal candidate.

## 6. Performance Report

Include:

* Bottlenecks by workflow
* Spreadsheet service call risks
* Loop-level inefficiencies
* Batch-processing opportunities
* Quota and runtime risks
* Prioritized optimization recommendations

## 7. Data Integrity Risk Report

Include every destructive operation and possible data-loss scenario.

## 8. Trigger and Concurrency Report

Include trigger inventory, overlap risks, and locking recommendations.

## 9. Remediation Plan

Organize fixes into:

### Phase A — Critical correctness and data safety

### Phase B — Missing dependencies and runtime stability

### Phase C — Performance improvements

### Phase D — Duplicate and orphan cleanup

### Phase E — Public library API cleanup

### Phase F — Maintainability and documentation

For each phase include:

* Exact scope
* Files affected
* Functions affected
* Risk
* Required tests
* Expected benefit

## 10. Test Plan

Provide exact manual and automated tests required before release.

---

# CHANGE CONTROL RULES

During the initial review:

* Do not modify code.
* Do not rename functions.
* Do not delete functions.
* Do not change public APIs.
* Do not rewrite working logic.
* Do not create a new architecture.
* Do not make speculative corrections.
* Do not assume an unused-looking library function is safe to remove.

After completing the audit, propose changes separately.

If later instructed to repair the code:

1. Preserve confirmed working business logic.
2. Correct critical defects first.
3. Avoid unrelated changes.
4. Remove orphaned dependencies only after proving they are unused.
5. Update every affected caller.
6. Preserve public library compatibility unless a breaking change is approved.
7. Add defensive validation.
8. Use batch operations where practical.
9. Return complete replacement files, not partial snippets.
10. Include a complete change log and test plan.
11. Identify every intentionally unchanged known issue.
12. Ensure no placeholder functions, TODOs, stubs, or incomplete code remain.

---

# FINAL REVIEW REQUIREMENT

Before completing the report, perform a second-pass verification.

Confirm that:

* Every source file was reviewed.
* Every function was inventoried.
* Every entry point was traced.
* Every referenced helper was located.
* Every destructive operation was reviewed.
* Every trigger was reviewed.
* Every suspected orphan was checked for dynamic or external use.
* Every critical and high finding includes evidence.
* Recommendations do not unintentionally alter business logic.
* Library consumers and public API compatibility were considered.

End with one of these conclusions:

* Approved for production
* Approved with documented low-risk issues
* Not approved until critical findings are corrected
* Review incomplete because required artifacts are missing

Do not state that the code is safe or production-ready unless the evidence supports that conclusion.
