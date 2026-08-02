# Missing Runtime Components Audit

Review all current script files and modules together as one executable project.

Identify only missing, undefined, inaccessible, conflicting, or incorrectly connected components that could prevent the script from loading, initializing, or completing a workflow.

Do not produce inventories of passing items.  
Do not produce complete call graphs.  
Do not produce detailed menu or trigger execution traces.  
Do not repeat previously completed audit information.

## Audit Scope

Check for missing or blocking issues involving:

- Script files or modules
- Menu callbacks
- Trigger handlers
- Trigger installers
- Functions
- Wrappers
- Helpers
- Validators
- Logging functions
- Timing functions
- Global variables
- Constants
- Configuration objects
- Required object properties
- Enumerations
- Script, user, or document properties
- Worksheets
- Templates
- Headers
- Column definitions
- Named ranges
- Folder or file IDs
- Cache functions
- Lock functions
- Google Apps Script services
- Advanced services
- Authorization scopes
- Cross-module references
- Required initialization steps

## Required Verification

Identify any instance where:

- A referenced function does not exist.
- A callback or trigger handler is missing.
- A callback is not globally accessible.
- A wrapper points to a missing or obsolete function.
- A helper or validator is missing.
- A function references an undefined constant or variable.
- A required configuration property is absent or blank.
- A required worksheet, template, header, or column is missing.
- A required property is never initialized.
- A required module is absent, empty, or truncated.
- Two global definitions conflict.
- A renamed or deleted function is still referenced.
- Function arguments are missing or incompatible.
- A required return value is unavailable or incorrectly handled.
- A cross-module call cannot resolve.
- A required service or authorization scope is absent.
- A trigger uses a service that is incompatible with its trigger type.
- Configuration, cache, worksheet, or template access occurs before initialization.
- A lock is not released after an error.
- An uncaught error, null reference, or invalid range can stop execution.
- A required cleanup or recovery function is missing.

## Required Output

Report only confirmed or realistically blocking missing items.

Use one table:

| ID | Severity | Missing or Invalid Item | Type | Referenced By | File/Module | Evidence | Runtime Impact | Recommended Fix |
|---|---|---|---|---|---|---|---|---|

Severity:

- **Critical** — the project cannot load, menus cannot initialize, or an entry point cannot begin.
- **High** — a workflow will stop or perform invalid or destructive processing.
- **Medium** — execution may fail under a realistic condition.
- **Not Verified** — source code indicates a dependency, but its runtime availability cannot be confirmed.

For every finding, provide:

- Exact missing or invalid component
- Exact function, menu, trigger, or module that requires it
- Source file and line number
- Why execution may stop
- Specific recommended correction
- Other affected entry points, when applicable

## Recommended Fix Requirements

The recommended fix must state the exact corrective action, such as:

- Add the missing function.
- Replace the obsolete function reference.
- Rename the callback registration.
- Move the callback to global scope.
- Restore the required module.
- Define the missing constant.
- Add the required configuration property.
- Initialize the required script property.
- Correct the wrapper target.
- Correct function arguments or argument order.
- Add validation before resource access.
- Create or validate the required worksheet or template.
- Add the required authorization scope.
- Enable the required advanced service.
- Add lock release to a `finally` block.
- Add controlled error handling or fallback behavior.

Do not rewrite production code unless explicitly instructed.

## Final Summary

Provide only:

- Total Critical findings
- Total High findings
- Total Medium findings
- Total Not Verified findings
- Overall status:
  - `PASS` — no missing or blocking components found
  - `PASS WITH WARNINGS` — no confirmed blocking defects, but conditional risks remain
  - `FAIL` — one or more missing or invalid components can halt execution
  - `NOT VERIFIED` — required source or runtime information was unavailable

Keep the complete report concise. Do not exceed seven pages.
