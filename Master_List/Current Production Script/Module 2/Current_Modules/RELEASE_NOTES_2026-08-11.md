# Module 2 Production Set Release Notes — 2026-08-11

## Functional summary

This coordinated five-module release improves monthly report correctness, source-sheet durability, Index grouping, governed dashboard defaults, and Quick Build template performance.

## Change log

- **Module 1 v1.94.10:** Initializes the supplied archive spreadsheet ID and URL during Quick System Setup when either document property is not configured.
- **Module 2 v2.18.8:** Batches governed number formats into one write; lets monthly formatting continue past missing inputs and reports skipped sheets at completion; writes source governance rank notes to B1; preserves the Raw Data source and archives Banner, CP Due Date, and Unlock CP inputs; records and highlights only changed Monthly Change fields; and trims Disenrolled Exclusion only after processing completes.
- **Module 3 v2.0.15:** Loads the Format Dashboard once for Quick Build report templates, passes the cached configuration through all builders, and groups unformatted tabs by month with RD, B, CD, UC ordering.
- **Module 4 v2.1.6:** Applies Level 2 conditional divider fills to Index group rows, uses the governed group sequence, and applies the same month/report ordering to unformatted Index entries.
- **Module 5 v3.25.2:** Changes the default column width to 110, removes redundant Section G widths and CLIP overrides, moves Raw Data `#` to the final governed position, adds Monthly Change `Columns With Change`, and consumes cached dashboard data while building template configuration.

## Dependency and performance impact

- The five current modules must be deployed together because the cached builder argument, Monthly Change schema, Index helper, and archive defaults cross module boundaries.
- Quick Build performs one dashboard configuration load for its report-template builder chain.
- Governed data number formats are written through one `setNumberFormats()` call rather than one API call per formatted column.

## Test plan

1. Run Quick System Setup in a workbook without archive properties and confirm the supplied archive ID and URL are stored.
2. Run Quick Build All Templates and confirm a single dashboard configuration read supplies all report templates.
3. Format a monthly batch with one missing input and confirm remaining inputs complete and the final notice names the skipped report.
4. Run each individual formatter and confirm Raw Data retains a hidden `Source - Raw Data` sheet while Banner, CP Due Date, and Unlock CP sources exist in the archive with a B1 rank note.
5. Build Monthly Change and confirm `Columns With Change` is last and only corresponding changed cells are highlighted.
6. Build and refresh Index; confirm group divider rows use Index Level 2 fill and unformatted names sort by month, then RD, B, CD, UC.
7. Build Disenrolled Exclusion and confirm final rows and columns remain after end-of-workflow trimming.

## Known issues intentionally unchanged

- Google Apps Script and Spreadsheet service integration behavior requires validation in the bound workbook; this repository has no local Spreadsheet service emulator.

## Follow-up correction — unified monthly formatter entry and totals

- **Module 1 v1.94.11:** Routes the batch Format Monthly Sheets trigger and every individual format trigger through `executeMonthlyFormatterWorkflow_`, which is the sole menu-entry adapter to the monthly formatter pipeline.
- **Module 2 v2.18.9:** Uses an immutable per-route options object and shared route completion plus a single pipeline-level `finalizeMonthlyParticipantTotals_` path. Raw Data participant, enrolled, and disenrolled totals are now written by the same finalizer whether formatting runs through Format Monthly Sheets or any individual format trigger.

### Follow-up validation

1. Run Format Monthly Sheets and confirm Raw Data G1 contains Total Participants, Total Enrolled Participants, and Total Disenrolled Participants.
2. Select an unformatted Raw Data source, run the individual Format Raw Data trigger, and confirm the same three G1 totals and G2 timestamp are written.
3. Run each Banners, CP Due Date, and Unlock CP individual trigger and confirm it uses the shared pipeline while retaining its route-specific source/archive behavior.

## Follow-up correction — template themes, sources, ranks, and titles

- **Module 2 v2.18.10:** Defers initial Disenrolled Exclusion trimming, preserves and hides the individual Raw Data source before output collision handling, applies dynamic source ranks with December as offset month zero, and writes Raw Data totals as a dash-separated overflow title.
- **Module 3 v2.0.16:** Allows title rows 1 and 2 to inherit standard font size and style when Section E overrides are blank.
- **Module 4 v2.1.7:** Keeps Index group-divider conditional formatting on the Index template only; active Index refreshes no longer rebuild those rules.
- **Module 5 v3.25.3:** Supplies `titleFontColor` to cached template themes, makes title font overrides optional, governs G1 overflow, retains `#` as the last Raw Data column, and retains `Columns With Change` as the last Monthly Change column.

## Final optimization — batched column widths

- **Module 3 v2.0.17:** Replaces uniform per-column width loops with `setColumnWidths()` batch calls. Operational templates now receive the governed default width in one call and issue individual width calls only for Section G overrides that differ from the default.

## Final correction — Section E, dynamic ranks, and Refined Data safety

- **Module 2 v2.18.11:** Excludes Disenrolled Exclusion from factory-time trimming, writes Refined Data dates to B2/D2 for scratch and unchanged builds, and converts enrollment/disenrollment total mismatches into end-of-process notices instead of stopping processing.
- **Module 3 v2.0.18:** Removes `Last Updated` from Monthly Change subheaders and calculates monthly/source tab positions from the dynamic rank table (`base + ((12 - month) × 22)`).
- **Module 5 v3.25.4:** Restores the requested Section E row 1 and row 2 font-size/weight specifications while retaining G1 overflow.

## Monthly Change and safety retry correction

- **Module 1 v1.94.12:** Automatically repeats the Disenrolled Exclusion update once when either enrollment or disenrollment safety notices are returned during Create Monthly Update.
- **Module 2 v2.18.12:** Processes all enrollment/disenrollment rows across the six governed status fields, excludes `#` and `Oxygen` from change tracking, removes generic Other Changes processing, and restricts Level of Care output to approved Residence Type destinations.
- **Module 5 v3.25.5:** Removes the duplicate Other Changes block and orders Level of Care before Contact Changes in the Monthly Change template.

## Data-engine batch optimization

- **Module 2 v2.18.13:** Caches dashboard governance configuration once per sheet-resolution pass, batches Refined Data added/updated processing, prunes disenrolled rows in place, and carries oldest historical enrollment values into governed ` 2` columns without changing the imported `#` value.

## Three-group enrollment history

- **Module 2 v2.18.14:** Adds the requested ` 3` enrollment-history columns. The oldest non-primary enrollment dataset is stored in group 3, the next-oldest historical dataset is stored in group 2 when present, and imported `#` values remain unchanged.
