# Google Apps Script Standards

## Performance

Prefer one read, in-memory transformation, and one write whenever practical.

Use batch operations for:

- Values
- Formatting
- Row deletion
- Column deletion
- Validation
- Notes
- Formulas

Avoid service calls inside loops.

Cache:

- Spreadsheet references
- Sheet references
- Header maps
- Configuration
- Repeated lookup tables

## Reliability

Validate sheet existence, headers, dimensions, and data before destructive operations.

Use clear error messages.

Do not silently suppress errors.

Use `LockService` only when concurrent execution is a real risk.

## Maintainability

Use consistent naming, explicit constants, short focused helpers, and JSDoc for public APIs and complex functions.

Do not split functions solely for style when it would reduce performance or traceability.

## Safety

Treat clear, delete, overwrite, filter, sort, and sheet-removal operations as high risk.

Do not rely on the active sheet or active range unless the function is intentionally UI-bound.
