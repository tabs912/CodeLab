**Standard Script Review Prompt**

# **Menu, Trigger, and Function Execution Trace Review**

## *Consolidated post-upgrade verification prompt*

*Combines Review 4 — Function Call Graph with Review 5 — Sections 1, 3, 10, and 11\.*

| Purpose | Verify every menu item and trigger after a major script upgrade and trace every downstream function in exact runtime order. |
| :---- | :---- |
| **Required Input** | Current upgraded production script. Include the last approved pre-upgrade script when upgrade-delta verification is required. |
| **Coverage** | Function Call Graph; Function Dependency Catalog; Read/Write Matrix; Menu Catalog; Trigger Catalog. |
| **Required Output** | A complete standalone menu, trigger, and function execution trace report with one numbered execution path for every registered menu item and trigger. |
| **Execution Rule** | Do not summarize, sample, or stop at the callback. Follow every reachable call, branch, validation, read/write action, timing step, error path, and final result. |

**REVIEW PROMPT BEGINS ON THE NEXT PAGE**

# **COMPLETE MENU, TRIGGER, AND FUNCTION EXECUTION TRACE REVIEW**

Perform a complete post-upgrade review of every custom menu item, callback, wrapper, simple trigger, installable trigger, time-driven trigger, and every downstream function reached from those entry points.

Treat the current upgraded production script as the authoritative implementation.

When a last approved pre-upgrade script is provided, use it only as the comparison baseline and clearly distinguish current implementation findings from upgrade deltas.

Do not summarize.

Do not sample menu items or triggers.

Do not stop at the callback or primary implementation function.

Trace each execution path through every reachable child, grandchild, and deeper descendant function, including conditional branches, early exits, validation failures, recovery paths, timing/logging functions, and user notifications.

Use exact function names, exact menu labels, exact trigger names, exact worksheet names, and source line numbers when available.

Do not infer missing behavior. Mark unsupported or unresolved relationships as NOT VERIFIED and explain why.

# **SECTION 1 — ENTRY-POINT DISCOVERY AND REGISTRATION AUDIT**

Extract EVERY menu and trigger registration from the script.

## **1.1 Menu Registration Catalog**

For every top-level menu, submenu, separator, and menu command document:

* Top-Level Menu Name
* Submenu Name
* Displayed Menu Item
* Menu Path
* Registration Function
* Registration Line
* Assigned Callback
* Callback Line
* Public/Internal
* Production Section
* Duplicate Menu Path (Yes/No)
* Duplicate Callback Registration (Yes/No)
* Callback Exists (Yes/No)
* Callback Is Reachable (Yes/No)
* Notes

Preserve the exact order in which menu items are added to the user interface.

## **1.2 Trigger Registration Catalog**

For every trigger document:

* Trigger Name
* Trigger Type
* Simple / Installable / Time-Driven / Event-Driven
* Registration Method
* Registration Function
* Registration Line
* Entry-Point Function
* Entry-Point Line
* Event Object Used
* Schedule or Event Condition
* Public/Internal
* Production Section
* Dependencies
* Timing
* Duplicate Trigger Risk
* Trigger Exists in Code
* Trigger Is Installable or Automatically Active
* Notes

Include onOpen, onEdit, onChange, onFormSubmit, time-driven builders, installable trigger creation functions, and any other runtime trigger mechanism implemented by the script.

# **SECTION 2 — COMPLETE FUNCTION CALL GRAPH**

Identify EVERY function call reachable from each menu callback and trigger entry point.

Produce a separate hierarchical execution graph for every menu item and every trigger using this structure:

Menu or Trigger

↓

Registered Callback or Entry Point

↓

Wrapper, when present

↓

Primary Implementation

↓

Child Function

↓

Grandchild Function

↓

All Deeper Descendants

For every call edge include:

* Parent Function
* Child Function
* Call Depth
* Source Line of Call
* Direct / Conditional / Loop / Callback
* Arguments Passed
* Return Value Used
* Public/Internal
* Recursive (Yes/No)
* Cross-Section Call (Yes/No)
* Branch Condition
* Execution Order
* Reachability Status

Expand the graph until the path terminates. Do not limit the graph to parent, child, and grandchild when deeper calls exist.

Identify circular dependencies, recursion, shared downstream functions, dead-end calls, unresolved calls, dynamic calls, and calls made through string callback names.

# **SECTION 3 — FUNCTION DEPENDENCY CATALOG**

For EVERY function reachable from a menu item or trigger document:

* Function Name
* Production Section
* Public / Internal
* Purpose
* Called By
* Calls
* Dependencies
* Inputs
* Outputs / Return Value
* Reads Worksheets
* Writes Worksheets
* Deletes Worksheets
* Creates Worksheets
* Archives Worksheets
* Formats Worksheets
* Synchronizes Data
* Reads Dashboard
* Writes Dashboard
* Reads Format Dashboard
* Uses Templates
* Uses Configuration
* Uses Cache
* Uses Validation
* Uses Timing
* User Notification
* Error Handling
* Side Effects
* Runtime Classification
* Source Start Line
* Source End Line

Generate:

* Parent → Child Call Graph
* Menu/Trigger → Function Dependency Matrix
* Section Dependency Matrix
* Circular Dependency Report
* Shared Dependency Report
* Missing Dependency Report

# **SECTION 4 — NUMBERED EXECUTION TRACE FOR EACH MENU ITEM AND TRIGGER**

Create one independent, numbered execution trace for EVERY menu item and EVERY trigger.

Each trace must begin at registration and continue through the final user-visible or system result.

For every execution step document:

* Step Number
* Call Depth
* Menu or Trigger
* Current Function
* Production Section
* Function Role
* Called By
* Calls Next
* Source Line
* Arguments Received
* Arguments Passed
* Purpose of This Step
* Data Read
* Data Produced
* Worksheets Read
* Worksheets Written
* Worksheets Created
* Worksheets Deleted
* Worksheets Archived
* Formatting Applied
* Synchronization Performed
* Dashboard Settings Used
* Format Dashboard Settings Used
* Templates Used
* Configuration Constants Used
* Cache Read/Write/Invalidation
* Validation Performed
* Timing Started/Stopped
* Logging Performed
* User Prompt or Notification
* Conditional Branch
* Early Return Condition
* Error/Recovery Behavior
* Side Effects
* Return or Exit Result
* Next Step Number

Represent branches explicitly. When one function can follow multiple paths, number the paths using a clear branch convention such as 5A, 5B, and 5C.

Represent loops without inventing a separate row for every runtime iteration. Document the loop condition, repeated function calls, data unit processed, and exit condition.

Represent shared downstream functions in every applicable menu or trigger trace, while also identifying them as shared dependencies in the consolidated matrix.

# **SECTION 5 — READ / WRITE AND SIDE-EFFECT MATRIX**

For EVERY function reached from a menu item or trigger document:

* Reads Worksheets
* Writes Worksheets
* Creates Worksheets
* Deletes Worksheets
* Archives Worksheets
* Formats Worksheets
* Synchronizes Data
* Reads Dashboard
* Writes Dashboard
* Reads Format Dashboard
* Uses Templates
* Uses Configuration
* Uses Cache
* Invalidates Cache
* Uses Validation
* Uses Timing
* Displays User Interface
* Sends Notification
* Changes Properties or Runtime State
* Other Side Effects

Return grouped markdown tables and also provide a Menu/Trigger → Worksheet Impact Matrix.

Differentiate read-only access from data mutation, formatting-only changes, structural changes, deletion, archival, and synchronization.

# **SECTION 6 — BRANCH, VALIDATION, FAILURE, AND RECOVERY PATHS**

For every menu item and trigger, identify every alternate path that can change execution.

* User cancellation
* Missing worksheet
* Missing template
* Missing dashboard setting
* Missing Format Dashboard setting
* Invalid header
* Invalid column mapping
* Empty dataset
* Validation failure
* Permission failure
* Lock failure
* Cache miss
* Cache invalidation
* Time-limit or quota risk
* Early return
* Thrown error
* Caught error
* Retry
* Recovery
* Fail-safe behavior
* Blocking user notification
* Nonblocking warning
* Partial-completion behavior

For each branch document the condition, function where it occurs, functions skipped, recovery behavior, final state, and whether the user is clearly notified.

# **SECTION 7 — POST-UPGRADE INTEGRITY VERIFICATION**

Verify the upgraded script for menu, trigger, callback, and downstream execution integrity.

At minimum test and report:

* Every registered callback exists.
* Every trigger entry point exists.
* Every callback and trigger resolves to the intended implementation.
* Every wrapper calls the intended underlying function.
* No renamed function remains referenced by a menu, trigger, wrapper, or child function.
* No deleted function remains referenced.
* No function call has an incorrect argument count or incompatible parameters.
* No required return value is ignored or misused.
* No execution path terminates unexpectedly.
* No internal-only function is incorrectly exposed as a public menu or trigger entry point.
* No duplicate menu item or conflicting menu path exists.
* No duplicate or obsolete trigger registration exists.
* No orphaned wrapper exists.
* No unreachable menu callback exists.
* No orphaned trigger handler exists.
* No circular dependency creates unintended recursion.
* All worksheet names remain valid.
* All Dashboard references remain valid.
* All Format Dashboard references remain valid.
* All template references remain valid.
* All validation functions still run in the intended order.
* All timing start/stop pairs remain balanced.
* All locks are acquired and released correctly.
* All cache invalidation paths remain correct.
* All user notifications correspond to actual completion or failure states.

Classify every finding as PASS, WARNING, FAIL, NOT APPLICABLE, or NOT VERIFIED.

# **SECTION 8 — UPGRADE DELTA REVIEW**

Complete this section only when the last approved pre-upgrade script is provided.

Compare the pre-upgrade and upgraded scripts and document:

* Added menus
* Removed menus
* Renamed menus
* Reordered menus
* Changed callbacks
* Added triggers
* Removed triggers
* Changed trigger types or schedules
* Renamed trigger handlers
* Added wrappers
* Removed wrappers
* Changed wrapper targets
* Changed call order
* Added child functions
* Removed child functions
* Changed branch conditions
* Changed worksheet effects
* Changed validation order
* Changed timing instrumentation
* Changed error handling
* Changed user notifications
* Changed dependencies
* New orphan or dead-code risk

For every change identify the affected menu items and triggers and state whether the execution path remains functionally complete.

# **SECTION 9 — REQUIRED OUTPUTS**

Return the following deliverables in this order:

1. Executive Status Table — counts of menus, menu items, triggers, callbacks, wrappers, reachable functions, call edges, branches, and findings. Do not substitute this table for the required detailed review.
2. Complete Menu Registration Catalog.
3. Complete Trigger Registration Catalog.
4. One Complete Hierarchical Function Call Graph for Each Menu Item.
5. One Complete Hierarchical Function Call Graph for Each Trigger.
6. One Numbered Execution Trace for Each Menu Item.
7. One Numbered Execution Trace for Each Trigger.
8. Reachable Function Dependency Catalog.
9. Consolidated Read/Write and Side-Effect Matrix.
10. Menu/Trigger → Worksheet Impact Matrix.
11. Branch, Validation, Failure, and Recovery Catalog.
12. Post-Upgrade Integrity Verification Report.
13. Upgrade Delta Report, when a baseline script is provided.
14. Defect and Risk Register.
15. Completeness Reconciliation and Certification.

# **SECTION 10 — REQUIRED TABLE STRUCTURES**

## **10.1 Execution Trace Table**

| Step | Depth | Menu/Trigger | Function | Role | Called By | Calls Next | Reads/Writes | Validation/Timing | Branch/Result |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| 1 | 0 | \[Exact item\] | \[Exact callback\] | Entry point | \[Registration\] | \[Next function\] | \[Effects\] | \[Controls\] | \[Outcome\] |

*Expand the table as needed. Do not omit fields required in Section 4; use additional columns or a companion detail table when necessary.*

## **10.2 Menu and Trigger Status Table**

| Entry Point | Type | Registered | Callback Exists | Trace Complete | Validation | Timing | Final Status | Finding |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| \[Exact name\] | \[Menu/Trigger\] | \[Yes/No\] | \[Yes/No\] | \[Yes/No\] | \[Pass/Fail\] | \[Pass/Fail\] | \[Status\] | \[Details\] |

## **10.3 Defect and Risk Register**

| ID | Severity | Menu/Trigger | Function | Issue | Runtime Impact | Evidence | Recommended Correction |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| MTF-001 | \[Critical/High/Medium/Low\] | \[Exact item\] | \[Exact function\] | \[Finding\] | \[Impact\] | \[Line/call evidence\] | \[Correction\] |

# **SECTION 11 — COMPLETENESS RECONCILIATION**

Before finalizing, reconcile all catalogs and certify completeness.

* Every menu item in the registration catalog has exactly one execution trace.
* Every trigger in the trigger catalog has exactly one execution trace.
* Every callback and trigger handler appears in the function dependency catalog.
* Every reachable function appears in at least one call graph and in the read/write matrix.
* Every call edge in the call graph is represented in the applicable numbered trace.
* Every worksheet effect in an execution trace appears in the read/write matrix.
* Every validation and timing function reached by an entry point appears in the applicable trace.
* Every branch and failure path is linked to the function where it occurs.
* Every unresolved call or dynamic callback is listed in the defect and risk register.
* Counts reconcile across menus, triggers, callbacks, wrappers, functions, and call edges.

Conclude with a Completeness Certification containing:

* Total top-level menus
* Total submenus
* Total menu commands
* Total triggers
* Total unique callbacks
* Total wrappers
* Total reachable functions
* Total call edges
* Total execution traces
* Total branch paths
* Total PASS findings
* Total WARNING findings
* Total FAIL findings
* Total NOT VERIFIED findings
* Unresolved discrepancies
* Certification status

# **SECTION 12 — OUTPUT RULES**

* Return publication-quality markdown as a standalone standard script-review report.
* Do not reference or require any separate framework specification.
* Do not omit a menu item, trigger, callback, wrapper, or reachable function because it appears repetitive.
* Do not collapse distinct execution paths into a generic workflow.
* Do not claim that a path is verified unless the source code supports every call in that path.
* Use exact source evidence and line references when available.
* Clearly separate current-script facts from comparison-baseline findings.
* Be exhaustive.
