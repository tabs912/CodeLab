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
| CP Due | Yes | Partial | Source report dates are replaced by prompted-month dates. |
| Unlock CP | Yes | Partial | Source report dates are replaced by prompted-month dates. |
| Raw Data | Yes | Partial | Source-only columns are preserved, but a new output is created instead of formatting RD in place. |
| Create Monthly Start | Yes | Partial | No Master List replacement preflight or staged replacement. |
| Demo P / Refined Data build | Yes | Partial | Most transformations exist, but some phone, contact, and notes logic differs. |
| Disenrolled Exclusion | Yes | No | Rebuilding from current Refined Data can remove historical exclusion rows. |
| Master List | Yes | Partial | No explicit `Primary PMR Row` filter or staged replacement. |
| Create Monthly Update | Yes | No | Monthly Change does not control which PMRs are replaced in Refined Data. |
| Monthly Change | Yes | Partial | Date rules, categories, empty-report behavior, and highlighting differ. |
| Refined Data monthly sync | Yes | No | Existing PMRs are updated only for five address fields. |
| Archive - Demo P | Renamed | Partial | `Archive - Refined Data` has narrower coverage and less metadata. |
| Index | Yes | Mostly | Final workflow refreshes are present. |
| Framework Timing Report | Yes | Mostly | Timed workflows and step logging are present. |

## What matches

The modular set includes:

- B, CD, UC, and RD formatting routes.
- Template-based governed outputs.
- External source archiving for B, CD, and UC.
- Raw Data `Primary PMR Row` assignment and Banner synchronization.
- Refined Data/Demo P creation from Raw Data.
- Participant name, phone, address, language, notes, Banner Summary, contact, and tracking-field processing.
- Disenrolled Exclusion processing.
- Monthly Change comparison.
- Master List creation with Banners, CP Due, and Unlock CP enrichment.
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

`v1.8.9.3` uses dates stored in the source reports when valid. The modular governed-sheet factory writes the prompted month’s first and last day to `B2` and `D2` instead.

### 3. Monthly Start replacement safety

`v1.8.9.3` asks whether an existing Master List may be replaced **before** changing Demo P or Disenrolled Exclusion.

The modules do not perform that preflight. They also delete an existing Master List before its replacement has been successfully completed instead of using a hidden staged replacement.

### 4. Disenrolled Exclusion history

The modular process reads the existing exclusion sheet only to preserve the `Added to Disenrolled Exclusion` date. It then overwrites the sheet using only participants currently marked disenrolled in Refined Data.

Because previously disenrolled participants are removed from active Refined Data, they can disappear from the next exclusion rebuild. The modules also lack the `v1.8.9.3` assertion that copied rows must equal rows removed from Demo P.

### 5. Master List safeguards

The modular Master List merge uses all Refined Data rows and deduplicates them by PMR. It does not independently require `Primary PMR Row`, and it does not use a staged replacement.

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

1. Add fail-closed Monthly Start and Monthly Update preflight.
2. Add staged Master List replacement.
3. Drive Refined Data replacement from Monthly Change PMRs.
4. Replace complete changed-PMR data, not only five address fields.
5. Preserve existing Disenrolled Exclusion history.
6. Verify exclusion rows copied equal Demo P rows removed.

### High

7. Restore Monthly Change disenrollment rules.
8. Add Banner Summary Changes and changed-cell highlighting.
9. Do not create Monthly Change when there are no changes.
10. Preserve all contact rows during comparison and Refined Data sync.
11. Restore explicit `Primary PMR Row` enforcement in Master List.
12. Add complete replacement archive metadata.

### Cleanup

13. Decide whether the new Raw Data source/output lifecycle is approved.
14. Update `Current_Modules/README.md` and remove older module versions from the deployable directory.

## Final determination

The modular set provides **broad workflow coverage**, but it is **not processing-equivalent to `v1.8.9.3`**. The most important gaps are replacement safety, Refined Data monthly synchronization, Disenrolled Exclusion history, Monthly Change rules, and Master List safeguards.
