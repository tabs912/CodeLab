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
