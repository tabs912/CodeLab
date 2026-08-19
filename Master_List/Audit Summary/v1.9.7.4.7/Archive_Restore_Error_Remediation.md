# Master List v1.9.7.4.7 — Archive Restore Error Remediation

**Governing source:** `origin/main:Master_List/Current Production Script/v1.9.7.4.7`
**Evidence:** final Framework Timing and Dashboard Quality reports in this directory
**Scope:** diagnosis and remediation plan only; production source is not changed by this document.

## Executive finding

The Index restore checkbox is routed through the reserved simple trigger `onEdit(e)`. That trigger calls `handleIndexRestoreCheckbox_(e)`, which then calls `restoreSheetFromArchiveWorkbook()`. Restoration opens another spreadsheet with `SpreadsheetApp.openById()` and copies a sheet from that archive.

This is an invalid authorization boundary for a simple trigger. Simple triggers run without the authorization required to access another spreadsheet, so an Index checkbox edit can reach the confirmation path but fail when the restore path opens or copies from the archive. The observed restore error is therefore consistent with the current implementation, even when the archive ID and the user's direct file permissions are correct.

**Severity:** High — the documented restore interface cannot reliably perform its core operation.

## Evidence path

1. `onEdit(e)` intercepts every edit on the Index and immediately delegates to `handleIndexRestoreCheckbox_(e)`.
2. A checked Restore cell calls `restoreSheetFromArchiveWorkbook(sheetName)`.
3. Restoration calls `openArchiveSpreadsheetOnce_()`.
4. `openArchiveSpreadsheetOnce_()` calls `SpreadsheetApp.openById(archiveId)`.
5. The same path uses `archiveSheet.copyTo(mainSpreadsheet)` through the governed factory.

No restore execution appears in the supplied Framework Timing report, and Dashboard Quality does not test cross-workbook restore authorization. Consequently, the existing quality PASS results do not validate archive restoration.

## Required correction

### Recommended design: authorized menu command

1. Keep checkboxes as selection state only; the simple `onEdit(e)` must not open the archive, copy sheets, acquire a long-running restore lock, or display a restore confirmation dialog.
2. Add or retain a user-invoked menu command such as **Index → Restore Selected Archive Sheet(s)**. A menu invocation runs in an authorized user context.
3. The menu handler must:
   - read checked Index rows in one batch;
   - validate exactly which archive sheet names are requested;
   - request one confirmation before mutation;
   - acquire the document lock;
   - open the archive once;
   - preflight local-name collisions and archive-sheet existence;
   - restore through the governed factory;
   - clear successful selections and retain failed selections;
   - refresh the Index once after the batch;
   - report per-sheet success/failure accurately.
4. Keep `onEdit(e)` limited to authorized-local formatting/highlighting behavior.

This is preferred over an installable edit trigger because an edit-trigger execution is a poor place for modal confirmation, and installing both a simple and installable handler can create duplicate/racing executions unless routing is redesigned carefully.

### Alternative: deployed web app

The existing `doGet(e)` route can perform authorized restoration only if the web app is deployed with the correct execution identity and access policy. If retained, generate signed or otherwise integrity-protected restore requests rather than trusting a bare `restoreTarget` parameter, and do not expose restoration to unauthorized callers. The deployment identity must have access to both workbooks.

## Additional restore defects to correct

- The Index handler finds the first header containing `sheet name` across the entire row. It should resolve the governed **Archive Sheet Name** column explicitly so a layout/header change cannot select the active-side sheet name.
- The checkbox is cleared before confirmation and before restore success. For batch-safe recovery, clear it only on success or restore its checked state on cancellation/failure.
- `onEdit(e)` catches outer errors and only logs them. Preserve user-visible failure reporting in the authorized command and include the failed sheet name and authorization/configuration category.
- Validate `RFF_ARCHIVE_SPREADSHEET_ID`, caller/archive permissions, archive sheet existence, local collision, governed sheet-type resolution, and template/config availability before copying.
- Do not claim restore success until the copied sheet is committed, visible as governed, and the Index refresh completes or reports a non-destructive warning.

## Acceptance tests

### Authorization and routing

- Checkbox edits never call `openById()`, `copyTo()`, or the governed factory.
- Authorized menu restore succeeds for a user with access to both workbooks.
- A user without archive permission receives an actionable permission error and no local mutation.
- Missing/invalid archive ID produces an actionable configuration error.
- If a web-app route remains, test owner/user execution identities, access policy, tampered target, and unauthenticated access.

### Data safety

- Existing local-name collision aborts before copying.
- Missing archive sheet aborts before local mutation.
- Failure after copy, rename, formatting, visibility, or Index refresh leaves one valid local target and accurate selection state.
- Single and multiple selections restore the intended archive-side names only.
- Divider rows cannot be selected or restored.
- Repeated invocation is idempotent and does not create duplicate targets.

### Regression

- Format Dashboard `onEdit` highlighting still works.
- Archive sync still writes archive rows and checkbox validations correctly.
- Menu callbacks, simple triggers, installable triggers, and web-app routes have one documented owner each.
- Framework Timing records restore duration and outcome without recording sensitive identifiers.

## Timing and quality disposition

The final quality report shows governed output health checks passing and zero failed quality items in the reported summary, but it is not a restore test. Timing evidence still contains material bottlenecks, including Quick Build Templates at 153.373 seconds, Create Monthly Update runs up to 200.183 seconds, and Archive Monthly Sub-Reports at 140.031 seconds. These remain performance work; the authorization correction is the blocking functional priority.

## Release recommendation

Correct the authorization/routing design in a new production version (recommended `v1.9.7.4.8`). Do not mark Restore or final regression waves complete until a real archive-to-active restore succeeds through the supported authorized entry point and all negative authorization/data-safety tests pass.
