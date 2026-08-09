# Module 2 Current Modules — v1.8.9.3 Monthly Processing Parity Review

## Review question

Does the deployable script set in `Master_List/Current Production Script/Module 2/Current_Modules/` contain all sheet processing performed by `Master_List/Current Production Script/v1.8.9.3` for:

- **Format Monthly Sheets**
- **Create Monthly Start**
- **Create Monthly Update**

## Executive answer

**No.** The modular set contains implementations for all of the major sheet categories, but it does **not** preserve all v1.8.9.3 processing rules or safeguards.

The modules implement the broad pipeline—monthly sub-report formatting, Refined Data/Demo P processing, Disenrolled Exclusion, Monthly Change, Master List, Index, archive, and timing—but several workflows are materially different. The highest-risk gaps are:

1. Create Monthly Start and Create Monthly Update lack the v1.8.9.3 fail-closed Master List replacement preflight.
2. Monthly Update does not use Monthly Change PMRs to drive selective full-row Demo P replacement.
3. Refined Data monthly sync only considers five address fields when deciding whether an existing participant changed.
4. Disenrolled Exclusion is overwritten from the current Refined Data disenrollment set, so previously retained historical rows can be lost.
5. Monthly Change uses a different disenrollment-month rule, has no explicit Banner Summary Changes route, always creates a report, and does not highlight individual changed cells.
6. The Raw Data formatter no longer formats the imported RD sheet in place; it creates a governed output and hides a separate preserved source.
7. Master List does not explicitly require `Primary PMR Row`; it relies on Refined Data having already collapsed to one row per PMR.
8. `Current_Modules/` contains multiple versions of Modules 1, 3, 4, and 5 even though the manifest says only one version of each should be deployed. Loading every file in the directory would create duplicate global function declarations and an ambiguous runtime.

This is a static source-parity review. It does not claim workbook runtime or visual validation.

## Baseline and reviewed deployment set

### Comparison baseline

The required processing baseline is the monolithic production script `v1.8.9.3`, summarized in:

- `v1.8.9.3_Monthly_Workflow_Sheet_Processing.csv`
- `v1.8.9.3_Monthly_Workflow_Processing_Maps.md`

### Intended current modular deployment

The parent manifest identifies these five active versions:

1. Module 1 v1.94.2
2. Module 2 v2.8
3. Module 3 v2.0.6
4. Module 4 v2.1.2
5. Module 5 v3.18

The review uses that manifest-selected set. Older sibling versions were treated as release remnants, not as additional required runtime files.

### Directory integrity finding

`Current_Modules/README.md` is stale: it names Module 1 v1.94.1, Module 3 v2.0.5, Module 4 v2.1.1, and Module 5 v3.16. The parent `CURRENT_MODULES_README.md` names newer versions. In addition, both old and new versions physically remain in `Current_Modules/`.

**Impact:** The folder is not a safe “deploy everything in this directory” package. The operator must manually follow the parent manifest, and deploying all files can cause later-loaded duplicate functions to override earlier versions unpredictably.

## Overall parity matrix

| Workflow/sheet | Modular implementation present? | v1.8.9.3 processing match | Verdict |
|---|---:|---:|---|
| Format Monthly Sheets orchestration | Yes | Partial | Four routes and timing exist, but source/output lifecycle and failure reporting differ. |
| Banners | Yes | Substantial | Header mapping, template output, source archive, deletion, visibility, and timing are present. |
| CP Due | Yes | Partial | Header mapping/title info/archive are present, but report dates come from the prompt rather than the source date cells. |
| Unlock CP | Yes | Partial | Header mapping/title info/archive are present, but report dates come from the prompt rather than the source date cells. |
| Raw Data | Yes | No | Modular processing creates a new output and hides a preserved source instead of formatting RD in place. |
| Create Monthly Start orchestration | Yes | Partial | Governing order exists, but replacement preflight and staged-safe replacement are missing. |
| Demo P / Refined Data initial build | Yes | Partial | Most derived fields exist, but the output identity changed and contact/name logic is not identical. |
| Disenrolled Exclusion | Yes | No | Current-set rebuild can discard historical exclusion rows; v1.8.9.3 performs incremental append/purge behavior. |
| Master List | Yes | Partial | Multi-source merge exists, but Primary PMR filtering and safe staged replacement are missing. |
| Create Monthly Update orchestration | Yes | No | Correct high-level order exists, but required preflight and Monthly Change-driven selective replacement are absent. |
| Monthly Change | Yes | Partial/No | Comparison exists, but several category, date-rule, no-change, and highlighting behaviors differ. |
| Demo P monthly sync | Yes | No | Sync is not driven by Monthly Change and only updates five address fields on existing PMRs. |
| Archive - Demo P | Renamed implementation | Partial/No | `Archive - Refined Data` exists, but archival scope and metadata differ. |
| Index | Yes | Substantial | Final refresh is present; the governed factory can also refresh per output. |
| Framework Timing Report | Yes | Substantial | Timed wrappers and step logging are present, although nested timings differ from v1.8.9.3. |

## Detailed findings by workflow

## 1. Format Monthly Sheets

### What matches

- Module 1 retains the public `formatMonthlySheets()` wrapper.
- The wrapper routes `B`, `CD`, `UC`, and `RD` through one formatter pipeline.
- The pipeline prompts once, acquires a document lock, loads dashboard configuration once, tracks each route, applies visibility, refreshes Index, and records timing.
- B, CD, and UC map source rows into governed target headers.
- B, CD, and UC are copied to the external archive before the local import is deleted.
- Raw Data receives `Primary PMR Row` assignment and Banner-field synchronization.

### Missing or different processing

#### FM-01 — Raw Data is not formatted in place

**v1.8.9.3:** the RD import itself becomes the formatted monthly Raw Data sheet. Imported columns are retained, title rows are inserted, and the sheet is renamed in place.

**Modules:** data is mapped to the dashboard target headers, a new governed `Raw Data mm.yy` output is created, and the original import is renamed `Source - Raw Data mm.yy` and hidden.

**Impact:** This is a different sheet lifecycle and can drop imported columns that are not declared in Dashboard Section H. It also changes downstream assumptions about the identity of the original RD sheet.

#### FM-02 — CP Due and Unlock CP source dates are not preserved

**v1.8.9.3:** CP Due reads its dates from `C3`/`E3`, and Unlock CP reads `E2`/`G2`, falling back to the prompted month only if the source dates are invalid.

**Modules:** title information is collected from those areas, but the governed sheet factory always writes the prompted month’s first/last day into `B2`/`D2`.

**Impact:** Source-specific reporting periods can be replaced by the prompt period.

#### FM-03 — Missing sources are classified as failures, not clean skips

Each route exception is caught so the batch continues, which is operationally similar to v1.8.9.3. However, a missing import is returned as `{success: false}` and logged as a failed sub-report rather than recorded in the explicit `skipped` result list used by v1.8.9.3.

#### FM-04 — Output creation is destructive before replacement validation

The governed factory deletes an existing target sheet before copying and populating the replacement. v1.8.9.3 contains more specialized output handling, including staged replacement for Master List and route-specific guards.

### Format Monthly Sheets conclusion

**The modules contain the four processing routes, but they do not fully match the v1.8.9.3 sheet lifecycle or date-source behavior.**

## 2. Create Monthly Start

### What matches

- The implemented order is Refined Data build → Disenrolled Exclusion → Master List → Index.
- Refined Data is sourced from current Raw Data.
- Raw fields are header-mapped to the governed Refined Data schema.
- Derived processing includes participant names, phone splitting, address combination, non-English language fields, notes, Banner Summary, contact compression, update status/month/source, and PMR flattening.
- Master List is enriched from Banners, CP Due, and Unlock CP.
- Index and timing processing are present.

### Missing or different processing

#### MS-01 — No fail-closed Master List replacement preflight

**v1.8.9.3:** if the monthly Master List exists, the user must confirm replacement before Demo P is changed. Cancellation stops the workflow before any monthly output mutation.

**Modules:** Create Monthly Start immediately builds/replaces Refined Data, updates Disenrolled Exclusion, and then creates Master List. There is no preflight check or replacement confirmation in `runMonthlyStart()`.

**Impact:** A pre-existing Master List can be overwritten without confirmation, and upstream operational sheets can already be mutated if Master List creation later fails.

#### MS-02 — No staged Master List replacement

The modular `createGovernedSheet_()` deletes the existing target before building its replacement. It does not create a hidden staged Master List and promote it only after a successful population.

**Impact:** A failed replacement can remove the last valid monthly Master List.

#### MS-03 — Demo P name/identity changed to Refined Data

The modules consistently use `Refined Data`, with compatibility helpers still named `getCurrentDemoPSheet_`. This is a deliberate architecture change, but it is not name-compatible with a workbook or external consumer expecting an active sheet named `Demo P`.

#### MS-04 — Derived Demo P processing is similar but not identical

- Phone parsing is a simple underscore split with fixed labels; it does not demonstrate all v1.8.9.3 phone-processing rules.
- Contact compression creates summaries only from non-primary rows. Primary-row contact information is not explicitly included in `Contact - 1` through `Contact - 8`.
- `Notes` is assigned only from `Additional Important Information`; the v1.8.9.3 pipeline uses its dedicated notes-combination helper.

These differences require workbook parity tests before the modular transformations can be called equivalent.

## 3. Disenrolled Exclusion

### What matches

- Reads Refined Data/Demo P.
- Detects disenrollment from status or a disenrollment date.
- Maps rows into governed exclusion headers.
- Sorts new output by disenrollment date.
- Preserves an existing `Added to Disenrolled Exclusion` value for PMRs still present.
- Removes disenrolled rows from the active Refined Data output.
- Hides older rows rather than deleting them from the newly created result.

### Missing or incorrect processing

#### DE-01 — Historical exclusion rows are not retained in the rebuilt data set

The code reads the existing Disenrolled Exclusion only to build an `Added`-date lookup. It does **not** merge existing historical rows into `finalRows`. It then overwrites the entire Disenrolled Exclusion sheet using only the disenrolled rows currently present in Refined Data.

Because prior runs remove disenrolled rows from active Refined Data, those participants will normally be absent from the next run and can disappear from Disenrolled Exclusion.

**Impact:** Historical disenrollment records can be lost even though the timing message states “Retain complete disenrollment history.” This is a critical data-integrity mismatch.

#### DE-02 — No copied-row versus removed-row safety assertion

v1.8.9.3 verifies that the number of exclusion rows successfully written equals the number selected for removal before rewriting Demo P. The modular pipeline builds a new exclusion sheet and then rewrites Refined Data, but does not perform the same explicit equality assertion.

#### DE-03 — Re-enrollment behavior is implicit and destructive

Old exclusions absent from the current Refined Data disenrollment set are dropped as a side effect of full-sheet overwrite. That can remove legitimate historical records as well as re-enrolled records; it is not the targeted reactivation sweep used in v1.8.9.3.

### Disenrolled Exclusion conclusion

**The modules contain a disenrollment pipeline, but it does not match the v1.8.9.3 incremental history-preserving behavior and presents a critical history-loss risk.**

## 4. Master List

### What matches

- Reads active Refined Data as the governing participant source.
- Reads Banners, CP Due, and Unlock CP as enrichment sources.
- Maps values by governed target header.
- Uses PMR for Banners and Unlock CP matching.
- Uses participant name as the effective CP Due fallback key.
- Writes a governed monthly Master List, applies formats, trims it, and refreshes Index.

### Missing or different processing

#### ML-01 — No explicit Primary PMR Row filter

v1.8.9.3 fails closed unless it finds rows explicitly marked `Primary PMR Row` and copies only those rows. The modular merge iterates every Refined Data row and deduplicates with a PMR-keyed map.

The current Refined Data transform normally flattens to one row per PMR, so results may often look similar. However, Master List no longer independently enforces the approved Primary PMR rule.

#### ML-02 — No replacement confirmation or staged promotion

Existing Master List output is overwritten through the generic governed factory. The modular path lacks both user confirmation and hidden staged replacement.

#### ML-03 — Banner source differs

The modular Master List reads the latest `Source - Banners` archive tab, while v1.8.9.3 primarily expects Banner values to have already synchronized through Raw Data/Demo P. This may produce equivalent values, but it adds a different source-of-truth path.

### Master List conclusion

**Core synthesis exists, but the independent Primary PMR safety rule and safe replacement protocol are missing.**

## 5. Create Monthly Update

### What matches

The high-level order is present:

1. Monthly Change
2. Refined Data/Demo P sync
3. Disenrolled Exclusion
4. Master List
5. Index

### Missing or different processing

#### MU-01 — Required preflight is absent

The modular workflow does not verify all required dependencies and Master List replacement approval before mutation. Monthly Change may run first, and there is no consolidated fail-closed check for current Raw Data, previous Raw Data, Refined Data, and existing Master List replacement.

#### MU-02 — Monthly Change does not drive Refined Data replacement

v1.8.9.3 reads the PMR set from Monthly Change and rebuilds complete rows only for those PMRs. The modular workflow creates Monthly Change and then independently calls `processRefinedDataUpdate_()`. No Monthly Change result or changed-PMR set is passed into Refined Data sync.

**Impact:** The stated dependency order exists, but the critical data dependency does not.

#### MU-03 — Existing PMRs update only when five address fields change

`mergeRefinedData_()` determines `changed` using only:

- Address Line 1
- Address Line 2
- City
- State
- Zip

When those fields change, only those five fields are overwritten. Demographic, phone, contact, enrollment, disenrollment, caseload, Banner, language, and other changed source fields are not refreshed for an existing PMR.

**Impact:** Monthly Change may report a change while Refined Data and Master List retain stale values.

#### MU-04 — Replacement coverage validation is missing

v1.8.9.3 validates that every changed PMR has fresh replacement rows before changing Demo P. The modular merge has no equivalent Monthly Change-to-replacement coverage assertion.

#### MU-05 — Archive processing is incomplete

The modular code writes `Archive - Refined Data` only when one of the five address fields changes. It does not archive every Monthly Change-driven replaced primary row and does not add the v1.8.9.3 reason/workflow/month/source metadata.

#### MU-06 — Duplicate Raw Data rows can be collapsed before full contact preservation

The monthly merge stores incoming records in a PMR-keyed map. Multiple current Raw Data rows for the same PMR are not merged as a complete group during the existing-PMR update path. This can prevent contact-row changes from reaching the later flattening process.

### Create Monthly Update conclusion

**The modular workflow has the same visible sequence but not the same update semantics. It is not processing-equivalent to v1.8.9.3.**

## 6. Monthly Change

### What matches

- Requires current and previous Raw Data.
- Builds PMR-keyed comparison maps.
- Supports enrollment, disenrollment, demographic, caseload, contact, other, and an added Level of Care category when configured.
- Maps current rows into governed Monthly Change headers and section blocks.

### Missing or different processing

#### MC-01 — Disenrollment date rule differs

v1.8.9.3 treats a Monthly Change disenrollment as qualifying when the effective date equals the prompted report month’s first day. The modular calculation tests whether the date falls in the **prior calendar month**.

**Impact:** Different participants can be included or excluded.

#### MC-02 — No explicit Banner Summary Changes mapping

The modular title router recognizes enrollment, disenrollment, demographic, caseload, contact, other, and Level of Care titles. It does not recognize a Banner Summary Changes title or invoke a Banner-field delta comparison.

#### MC-03 — No changed-cell highlighting

The modular result contains mapped rows only. It does not retain a changed-column set per PMR and therefore cannot apply the v1.8.9.3 per-cell highlight to changed fields.

#### MC-04 — Empty reports are still created

v1.8.9.3 does not create Monthly Change when no qualifying changes exist. The modular workflow always creates the governed Monthly Change sheet and appends only nonempty blocks.

#### MC-05 — Comparison ignores selected identity columns

The generic delta helper ignores `Participant Name`, `Name`, `Preferred Name`, and `Date of Birth`. v1.8.9.3 includes Preferred Name and Date of Birth in the demographic tracked-field set.

#### MC-06 — One-row-per-PMR lookup can hide multi-row differences

`buildLookupMap_()` retains one row per key. Raw Data can contain multiple contact rows per PMR, so contact-level differences can be lost before comparison.

### Monthly Change conclusion

**The comparison engine is present, but the report population rules do not fully match v1.8.9.3.**

## 7. Index and Framework Timing Report

### Index

Index refresh is implemented at the end of all three top-level workflows. The governed factory can also refresh Index when the relevant creation rule enables registration. This substantially covers the required navigation refresh, though it may perform more refreshes than v1.8.9.3.

### Framework Timing Report

The workflows use timed wrappers and record major processing steps. Coverage is broadly present. Exact step names and nested timing boundaries differ because several child functions start their own timed runs rather than sharing only the parent timing context.

## Required remediation for processing parity

### Critical

1. Add a shared Monthly Start/Update preflight that validates all dependencies and confirms Master List replacement before any mutation.
2. Implement hidden staged Master List replacement and promote only after successful population/validation.
3. Change Monthly Update so Monthly Change produces a changed-PMR set that directly controls complete Refined Data row replacement.
4. Restore replacement-coverage validation before changing Refined Data.
5. Merge existing Disenrolled Exclusion history with new deltas; do not rebuild solely from active Refined Data.
6. Assert copied exclusion rows equal rows selected for removal before rewriting Refined Data.

### High

7. Restore the approved Monthly Change disenrollment-date rule.
8. Add Banner Summary Changes classification and Banner-field comparison.
9. Preserve changed-column sets and apply changed-cell highlighting.
10. Suppress Monthly Change creation when no qualifying changes exist.
11. Update all governed changed fields for an existing Refined Data PMR, not only five address fields.
12. Preserve all Raw Data rows for each PMR through merge/contact flattening.
13. Restore explicit `Primary PMR Row` enforcement in Master List creation.
14. Add archive reason/workflow/month/source metadata for replaced Refined Data rows.

### Medium

15. Decide and document whether Raw Data must remain in-place or whether the new output-plus-preserved-source design is approved; do not describe it as parity until approved.
16. Preserve CP Due and Unlock CP source report dates when valid.
17. Align missing-import results with explicit skipped-route reporting.
18. Reconcile `Current_Modules/README.md` with the parent manifest.
19. Remove older module versions from `Current_Modules/` or move them to a clearly non-deployable release-snapshot directory.

## Recommended runtime tests

1. Format B, CD, UC, and RD together and verify source/output/archive identity and dates.
2. Add an extra RD column not present in Dashboard Section H and verify whether preservation is required.
3. Cancel an existing Master List replacement during Monthly Start and confirm no sheet changed.
4. Cancel an existing Master List replacement during Monthly Update and confirm no sheet changed.
5. Change only phone, caseload, enrollment status, language, Banner flag, and contact data for existing PMRs; verify every field reaches Refined Data and Master List.
6. Use multiple Raw Data contact rows for one PMR and verify all contact summaries survive monthly sync.
7. Retain a participant in Disenrolled Exclusion across two later monthly runs where the participant is absent from Refined Data.
8. Re-enroll one historically disenrolled PMR and verify only that PMR is purged while unrelated history remains.
9. Force an exclusion write failure and verify no corresponding Refined Data row is removed.
10. Test a report-month-first-day disenrollment and compare v1.8.9.3 versus modular classification.
11. Change only a Banner flag and confirm Banner Summary Changes is populated and the changed cell is highlighted.
12. Run a no-change month and verify no Monthly Change sheet is created if parity is restored.
13. Force staged Master List build failure and verify the previous final Master List remains intact.
14. Deploy only the five manifest-selected modules and run duplicate-global/function connectivity validation.

## Final determination

The modules contain **broad functional coverage**, but they do not contain **all v1.8.9.3 sheet processing with equivalent rules and protections**. Format Monthly Sheets is partially equivalent; Monthly Start is missing replacement safety; and Monthly Update, Disenrolled Exclusion, Monthly Change, and Refined Data synchronization contain material business-rule and data-integrity gaps.

The modular set should not be declared processing-equivalent to v1.8.9.3 until the critical and high-priority items above are implemented and verified in a representative workbook.
