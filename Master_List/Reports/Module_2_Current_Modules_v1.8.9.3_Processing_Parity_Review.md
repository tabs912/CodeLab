# Module 2 Monthly Processing Parity Review

## Question

Does the manifest-selected script set in `Master_List/Current Production Script/Module 2/Current_Modules/` contain all processing performed by `v1.8.9.3` for:

- **Format Monthly Sheets**
- **Create Monthly Start**
- **Create Monthly Update**

## Answer

**No.** The modules contain all major workflow areas, but several processing rules and safety checks do not match `v1.8.9.3`.

This is a static source comparison. Workbook runtime and visual parity were not tested.

## Summary

| Sheet or workflow | Present in modules? | Match? | Main difference |
|---|---:|---:|---|
| Format Monthly Sheets | Yes | Partial | All four routes exist, but Raw Data has a different lifecycle. |
| Banners | Yes | Mostly | Header mapping, archive, output, visibility, and timing are present. |
| CP Due | Yes | Mostly | Valid source dates come from C3/E3; prompted dates are per-value fallbacks. |
| Unlock CP | Yes | Mostly | Valid source dates come from E2/G2; prompted dates are per-value fallbacks. |
| Raw Data | Yes | Partial | Source-only columns are preserved, but a new output is created instead of formatting RD in place. |
| Create Monthly Start | Yes | Approved | Standard sheet governance handles Master List replacement. |
| Refined Data build | Yes | Mostly | v1.8.9.3 phone and dedicated Notes combination rules are restored. |
| Disenrolled Exclusion | Yes | Mostly | History is retained, new rows prepend at row 5, and re-enrollment removal is targeted. |
| Master List | Yes | Approved | Refined Data is one row per PMR; no Primary PMR filter or staged replacement is required. |
| Create Monthly Update | Yes | No | Monthly Change does not control which PMRs are replaced in Refined Data. |
| Monthly Change | Yes | Partial | Date rules, categories, empty-report behavior, and highlighting differ. |
| Refined Data monthly sync | Yes | No | Existing PMRs are updated only for five address fields. |
| Archive - Refined Data | Yes | Partial | Archive coverage and metadata remain narrower than v1.8.9.3. |
| Index | Yes | Mostly | Final workflow refreshes are present. |
| Framework Timing Report | Yes | Mostly | Timed workflows and step logging are present. |

## What matches

The modular set includes:

- B, CD, UC, and RD formatting routes.
- Template-based governed outputs.
- External source archiving for B, CD, and UC.
- Raw Data `Primary PMR Row` assignment and Banner synchronization.
- Refined Data creation from Raw Data.
- Participant name, phone, address, language, notes, Banner Summary, contact, and tracking-field processing.
- Disenrolled Exclusion processing.
- Monthly Change comparison.
- Master List creation from Refined Data with CP Due and Unlock CP enrichment.
- Index refreshes and Framework Timing logging.

## What is missing or different

### 1. Raw Data processing

`v1.8.9.3` formats the RD import in place. The modules instead:

1. Map RD data to dashboard headers.
2. Create a new governed Raw Data output.
3. Rename the original import `Source - Raw Data mm.yy`.
4. Hide the preserved source.

Module 2 v2.10 preserves imported columns that are not listed in Dashboard Section H by appending them after the governed columns. The source/output lifecycle still differs from `v1.8.9.3`.

### 2. CP Due and Unlock CP dates

Module 2 v2.11 uses valid dates stored in CP Due `C3`/`E3` and Unlock CP `E2`/`G2`. An invalid individual source date falls back to the corresponding prompted-month date and records a warning.

### 3. Monthly Start replacement decision

Master List is an approved third-generation output. Standard sheet-creation governance handles its replacement; no separate preflight prompt or staged promotion is required.

### 4. Disenrolled Exclusion history

Module 2 v2.13 retains existing rows, inserts new disenrollments at row 5, removes rows only through the targeted Refined Data re-enrollment sweep, and asserts copied-or-verified row coverage before removing participants from Refined Data.

### 5. Master List safeguards

Refined Data contains one participant row per PMR. The approved Master List path therefore does not require an additional Primary PMR Row filter, replacement confirmation, or staged promotion. Banner values are sourced only from Refined Data because Raw Data formatting already performs Banner synchronization.

### 6. Monthly Update dependency

The visible order matches `v1.8.9.3`:

1. Monthly Change
2. Refined Data sync
3. Disenrolled Exclusion
4. Master List
5. Index

However, Monthly Change does not pass its changed-PMR set to Refined Data sync. The two processes run in sequence but are not connected by the required participant list.

### 7. Refined Data monthly sync

For an existing PMR, the modular merge detects changes only in:

- Address Line 1
- Address Line 2
- City
- State
- Zip

Only those fields are overwritten. Changes to phone, contacts, demographics, enrollment, disenrollment, caseload, Banner fields, language, and other source columns can remain stale.

The modules also lack changed-PMR replacement-coverage validation and do not archive every replaced primary record with reason, workflow, month, and source metadata.

### 8. Monthly Change

The modular Monthly Change process differs because it:

- Uses the prior calendar month for disenrollment selection rather than the `v1.8.9.3` report-date rule.
- Has no explicit Banner Summary Changes routing.
- Does not retain changed-column sets for cell highlighting.
- Creates a report even when there are no qualifying changes.
- Ignores changes to Preferred Name and Date of Birth in its generic comparison.
- Uses a one-row-per-PMR lookup, which can hide changes in additional contact rows.

### 9. Current module directory

The parent manifest selects Modules 1 v1.94.2, 2 v2.8, 3 v2.0.6, 4 v2.1.2, and 5 v3.18. However, `Current_Modules/` also contains older versions, and its local README lists an older deployment set.

Deploying every file in the directory can create duplicate global function declarations. Only the five parent-manifest versions should be treated as current until the directory is cleaned up.

## Required corrections

### Critical

1. Drive Refined Data replacement from Monthly Change PMRs.
2. Replace complete changed-PMR data, not only five address fields.

### High

3. Restore Monthly Change disenrollment rules.
4. Add Banner Summary Changes and changed-cell highlighting.
5. Do not create Monthly Change when there are no changes.
6. Preserve all contact rows during comparison and Refined Data sync.
7. Add complete replacement archive metadata.

### Cleanup

8. Decide whether the new Raw Data source/output lifecycle is approved.
9. Remove older module versions from the deployable directory.

## Final determination

The modular set provides **broad workflow coverage**, but it is not yet fully processing-equivalent to `v1.8.9.3`. The remaining material gaps are Refined Data monthly synchronization, Monthly Change rules, and replacement archive metadata.
