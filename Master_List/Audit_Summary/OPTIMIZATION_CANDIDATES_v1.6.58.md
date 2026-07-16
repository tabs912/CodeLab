# Master List v1.6.58 Optimization Candidates

## Purpose

This audit note records optimization candidates identified from the v1.6.58 live timing reports for template creation, monthly formatting, individual formatting, Raw Data formatting, and Demo P initialization.

These items are not release blockers unless they begin causing Apps Script timeouts, incorrect sheet state, failed archive copies, or user-facing workflow failures. They are prioritized candidates for a future performance pass after the current release behavior is validated.

## Evidence Reviewed

- Create / Refresh All Templates timing after template-hide deferral and template-block placement changes.
- Format Monthly Sheets 04.26 timing covering Banner, CP Due, Unlock CP, and Raw Data routes.
- Individual Format Banner, Format Care Plan Due, Format Unlocked Care Plan, and Format Raw Data timing.
- Build Demo P initialization timing.
- Current production source: `Master_List/Current Production Script/v.1.6.58_Current_Production_Script`.

## Current Performance Assessment

- Template creation is materially improved. Template hiding is deferred during the batch and performed once at the end, and the prior global tab-sort bottleneck is avoided.
- Format Monthly Sheets completes successfully and provides useful timing detail for each route.
- Individual formatters complete successfully and validate the separate menu entry points.
- Raw Data formatting is acceptable for roughly 6,000 rows, with no current blocker identified.
- Remaining slow points are concentrated in Google Sheets sheet-copy/sheet-insert operations, external archive copying, Demo P canvas/contact work, and Dashboard Quality batch output.

## Priority 1 — Blank Output Sheet Insertion for Dashboard Fast Canvas

### Observed timing

- Monthly CP Due blank output sheet inserted: about 23.5 seconds.
- Monthly Unlock CP blank output sheet inserted: about 22.0 seconds.
- Individual CP Due blank output sheet inserted: about 27.0 seconds.
- Individual Unlock CP blank output sheet inserted: about 26.6 seconds.

### Current implementation area

- `createOutputSheetFromDashboardTemplate_()` inserts a governed output sheet, shows it, activates it, resizes the grid, writes values, copies template formatting, applies filter/freeze/tab color, and clears runtime caches.
- Both monthly CP/Unlock and individual CP/Unlock routes use this shared fast-canvas helper.

### Optimization candidates

1. Test whether creating the new sheet at the intended final tab position reduces later sheet-management overhead.
2. Reduce or defer `setActiveSheet()` calls where Apps Script allows the operation without activating the sheet.
3. Compare current blank-sheet insertion against copying a lightweight blank canvas template.
4. Avoid unnecessary `showSheet()` calls when the sheet is already visible.
5. If multiple output sheets are created in a batch, defer final tab positioning and visibility policy until the batch completes.

### Risk notes

- Sheet creation and sheet activation can be dominated by Google Sheets service latency, so improvements may vary by workbook size.
- Any change must preserve output tab order, Index grouping, visibility policy, filters, frozen rows/columns, and template formatting.

## Priority 2 — External Archive Copy Cost

### Observed timing

- Monthly Banner raw archive copy: about 19.9 seconds.
- Individual archive copies were lower but still several seconds each.

### Current implementation area

- `archiveRawSourceAndDeleteLocal_()` calls `archiveRawDataSheet_()` before deleting local raw imports.
- `archiveRawDataSheet_()` opens the external archive spreadsheet, deletes any existing archive sheet with the target name, and copies the full source sheet to the archive spreadsheet.

### Optimization candidates

1. Evaluate value-only archive copies for raw import sheets where formatting is not required.
2. Evaluate copying only the used range instead of copying the full sheet object.
3. Add timing detail inside archive copy for open archive spreadsheet, delete existing archive sheet, copy sheet, and rename copied sheet.
4. Consider a configurable archive mode: full-sheet archive vs value-only archive.
5. Keep local raw deletion dependent on successful archive completion.

### Risk notes

- Archiving is a data-preservation step and must remain safe before local raw sheets are deleted.
- Value-only archive mode would be a behavior change if archived formatting is currently expected.

## Priority 3 — Demo P Initialization Canvas Write and Contact Compression

### Observed timing

- Demo P unified values flushed to spreadsheet canvas: about 15.9 seconds.
- Demo P in-memory flat-record contact compression complete: about 15.1 seconds.
- Total Build Demo P initialization: about 40.3 seconds.

### Current implementation area

- Demo P build creates the governed Demo P sheet, resizes the grid, applies governed formats, writes unified values, copies template title/header/data formatting, and applies post-flatten formatting and Index refresh.
- Contact flattening and compression are processed in memory before/around the final sheet output.

### Optimization candidates

1. Add more granular timing around Demo P post-flatten formatting, template formatting copy, filter creation, and Index refresh.
2. Confirm no repeated full-sheet reads occur after the unified values are written.
3. Review contact-compression loops for repeated header lookups, repeated normalization, or avoidable nested scans.
4. Cache header indexes and repeated source maps before compression loops.
5. Consider splitting Demo P timing into in-memory processing, write-to-sheet, style-copy, post-format, and Index refresh sections.

### Risk notes

- Demo P logic is business-critical; optimize only after preserving PMR grouping, Primary PMR Row assignment, contact flattening, metadata, and banner sync behavior.

## Priority 4 — Individual CP Due Title/Date Cell Move

### Observed timing

- Individual CP Due `Move source title/date cells into dashboard title info`: about 13.8 seconds.
- Individual Unlock CP same step was much lower in the supplied timing.

### Current implementation area

- `formatCarePlanDueOrUnlockedFromDashboard_()` collects and clears moved title/date information from the active source sheet before preparing source structure and creating the output sheet.

### Optimization candidates

1. Add granular timing inside title/date collection and clearing to identify whether the cost is reading cells, clearing cells, merged-cell handling, or formatting state.
2. Batch clear moved title/date cells where possible.
3. Avoid clearing source title/date cells when preserving the import sheet unchanged is acceptable.
4. Compare timing across multiple CP Due imports before changing behavior.

### Risk notes

- This may be source-sheet dependent. Do not optimize until repeated runs show the same cost.

## Priority 5 — Filter Creation and Universal Canvas Formatting

### Observed timing

- CP/Unlock filter creation: roughly 3.5 to 5.2 seconds.
- Universal canvas formatting: roughly 2.4 to 4.3 seconds.

### Current implementation area

- `createOutputSheetFromDashboardTemplate_()` creates filters and calls universal canvas formatting after values and template formatting are applied.

### Optimization candidates

1. Confirm filter range is no larger than the actual required output rows and columns.
2. Avoid recreating filters when output sheet is newly inserted and no filter exists.
3. Review universal canvas formatting for repeated range calls or formatting that is already inherited from the template data-row copy.
4. Consider a minimal formatting mode for generated dashboard outputs if template formatting already covers required visuals.

### Risk notes

- Filters and formatting are user-facing. Maintain output readability and dashboard standards.

## Priority 6 — Dashboard Quality Section F Batch Write

### Observed timing

- Dashboard Quality Section F batch written: about 13.2 seconds in the latest template validation timing.

### Current implementation area

- Dashboard Quality validation writes the Section F output after template validation rows are staged.

### Optimization candidates

1. Add row-count and column-count details to the Section F batch-write timing label.
2. Confirm Section F is writing only the populated validation range, not an oversized section range.
3. Compare startup vs full dashboard-quality validation timing.
4. Skip Section F rewrite when the generated validation payload is unchanged.
5. Keep Dashboard Quality timing separate from Create / Refresh All Templates so template performance is not misread.

### Risk notes

- This is diagnostic/reporting output, not a core data transformation path.
- Optimize after production workflow correctness is confirmed.

## Priority 7 — Raw Data Formatting Watch List

### Observed timing

- Raw Data formatting completed in roughly 34 seconds for about 5,977 rows.
- No current Raw Data blocker was identified in the supplied timing.

### Current implementation area

- Raw Data formatting reads the source in place, renames it, inserts title rows, appends approved/sync columns, creates filters, syncs approved/banner columns, locks row height, applies visibility policy, and keeps imported columns intact.

### Optimization candidates

1. Continue capturing row count, column count, changed column-group count, and updated-row count.
2. Watch for filter removal/creation growing beyond the current 2 to 4 second range.
3. Watch approved-sync and banner-sync bulk reads as row counts increase above 6,000.
4. Keep the in-place approach; avoid returning to copy/delete patterns for Raw Data.

### Risk notes

- Current Raw Data performance is acceptable. Treat this as monitoring, not a required optimization.

## Suggested Future Optimization Order

1. Dashboard fast-canvas blank sheet insertion.
2. Archive copy timing and optional value-only archive mode.
3. Demo P granular timing and contact compression review.
4. Individual CP Due title/date move timing detail.
5. Filter/universal-formatting reduction in dashboard outputs.
6. Dashboard Quality Section F write optimization.
7. Raw Data continued monitoring.

## Recommended Validation After Future Optimizations

- Run Create / Refresh All Templates twice: first build and smart refresh.
- Run Format Monthly Sheets with B, CD, UC, and RD imports present.
- Run individual Banner, CP Due, Unlock CP, and Raw Data formatters once each.
- Run Build Demo P initialization from the current Raw Data sheet.
- Run Create Monthly Update after the formatting workflows are validated.
- Confirm Index sections, tab order, sheet visibility, archive output, and Framework Timing Report output after each run.

## Current Release Recommendation

The supplied v1.6.58 timing supports proceeding with validation. The remaining items should be tracked as future optimization candidates rather than treated as immediate correctness defects.
