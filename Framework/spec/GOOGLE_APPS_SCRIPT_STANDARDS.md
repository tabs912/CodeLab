# Google Apps Script Standards

Prefer:

- Batch reads and writes
- In-memory transforms
- Cached spreadsheet, sheet, header, and configuration references
- Maps and Sets for repeated lookups
- Batch formatting
- Batch deletion
- Minimal `SpreadsheetApp.flush()`
- Validation before destructive actions

Avoid:

- `getValue()` in loops
- `setValue()` in loops
- `getRange()` in loops
- Row-by-row deletion
- Cell-by-cell updates
- Repeated full-sheet reads
- Repeated sheet lookups
- Silent error suppression
