# RC-002 Shared Helper Function Map — v1.92

**Parent recommendation:** `Critical_Script_Runtime_Readiness_Recommended_Corrections.md`, RC-002
**Audited source:** `Master_List/Current Production Script/v1.92 Module.txt`
**Source fingerprint:** SHA-256 `4e1c371e82a4f30ad3cad98f349496d657e8e905b3ccdbf4052f9cfe1635e145`
**Scope:** all direct call sites for the 23 missing required shared helpers identified by RR-003/RC-002.

## 1. Coverage Summary

| Measure | Verified Total |
|---|---:|
| Missing required shared helpers | 23 |
| Direct call sites | 92 |
| Distinct direct caller functions | 37 |
| Affected public/menu entry points | 6 |
| Affected production modules | 5, 6, and 7 |

The map is source-static. A caller appearing under multiple entry points is intentionally repeated in the entry-point view but appears once in the direct-caller register. Line numbers refer to the audited source fingerprint above.

## 2. Entry-Point Impact Map

| Entry Point | First Path to Missing Helper | Reachable Missing Helpers | Direct Callers Within Reachable Path | Result |
|---|---|---:|---:|---|
| `menuFormatMonthlySheets` | `menuFormatMonthlySheets` → `runFormatterPipeline_` → `processSingleSubReport_` → `mapRowsToHeaders_` | 2 | 1 | Formatting cannot complete reliably |
| `buildRefinedDataFromScratch` | `buildRefinedDataFromScratch` → `formatReportDateLabel_` | 10 | 12 | Stops before timed build begins |
| `updateRefinedDataMonthlySync` | `updateRefinedDataMonthlySync` → `formatReportDateLabel_` | 14 | 16 | Stops before monthly synchronization begins |
| `createDisenrolledList` | `createDisenrolledList` → `formatReportDateLabel_` | 11 | 4 | Stops before disenrollment processing begins |
| `createMasterList` | `createMasterList` → `formatReportDateLabel_` | 12 | 8 | Stops before Master List creation begins |
| `buildMonthlyChangeReport` | `buildMonthlyChangeReport` → `formatReportDateLabel_` | 8 | 5 | Stops before comparison/report creation begins |

### Reachable helper sets

- **Format Monthly Sheets (2):** `mapRowsToHeaders_`, `ensureOutputSheetHasFormattedRows_`.
- **Build Refined Data (10):** `buildHeaderIndexMap_`, `formatReportDateLabel_`, `getCurrentRawDataSheet_`, `getDataValues_`, `getPMRIndex_`, `isPrimaryPMRRowValue_`, `mapRowsToHeaders_`, `normalizeCompareValue_`, `normalizePMR_`, `normalizeRowsToWidth_`.
- **Update Refined Data (14):** `buildHeaderIndexMap_`, `ensureOutputSheetHasFormattedRows_`, `formatReportDateLabel_`, `getCurrentRawDataSheet_`, `getDataValues_`, `getHeaders_`, `getLatestSheetByPrefix_`, `getPMRIndex_`, `isPrimaryPMRRowValue_`, `mapRowsToHeaders_`, `normalizeCompareValue_`, `normalizePMR_`, `normalizeRowsToWidth_`, `padRowToWidth_`.
- **Create Disenrolled List (11):** `buildHeaderIndexMap_`, `ensureOutputSheetHasFormattedRows_`, `findHeaderIndex_`, `formatReportDateLabel_`, `getCurrentRawDataSheet_`, `getDataValues_`, `getPMRIndex_`, `mapRowsToHeaders_`, `normalizeCompareValue_`, `normalizePMR_`, `normalizeToDateObject_`.
- **Create Master List (12):** `buildHeaderIndexMap_`, `buildMonthlySheetName_`, `formatReportDateLabel_`, `getCurrentCarePlanDueSheet_`, `getCurrentDemoPSheet_`, `getCurrentUnlockedCarePlanSheet_`, `getDataValues_`, `getHeaders_`, `getPMRIndex_`, `normalizePMR_`, `safeSheetName_`, `setRequiredSheetName_`.
- **Build Monthly Change Report (8):** `buildMonthlySheetName_`, `formatReportDateLabel_`, `getCurrentRawDataSheet_`, `getDataValues_`, `getLatestSheetByPrefix_`, `getPMRIndex_`, `normalizePMR_`, `valuesAreEqual_`.

## 3. Missing Helper-to-Caller Map

| Missing Helper | Sites | Direct Callers and Source Lines | Primary Contract Needed |
|---|---:|---|---|
| `getDataValues_` | 12 | `createActiveDemoPFromRawData_` L2772; `updateDemoPMonthlySyncForMonth_` L3198; `getDemoPMonthlySyncChangedPMRs_` L3225; `buildDemoPFreshRowsForPMRs_` L3237; `syncDisenrolledExclusionFromRawData_` L3341, L3370; `removeActiveDemoPPMRsFromDisenrolledExclusion_` L3419, L3424; `hideOldDisenrolledRows_` L3465; `buildPrimaryDemoPRowsInMemory_` L3821; `buildSourceMapBySingleKey_` L3909; `getRawDataForCompare_` L4132 | Read a governed data body without invalid/negative ranges; return the shape expected by all callers |
| `getPMRIndex_` | 11 | `flattenDemoPContactRowsInMemory_` L2865; `populateUniversalMetadataColumns_` L3101; `getDemoPMonthlySyncChangedPMRs_` L3226; `buildDemoPFreshRowsForPMRs_` L3238; `buildDemoPMonthlySyncRetainedRows_` L3248; `syncDisenrolledExclusionFromRawData_` L3342, L3371; `removeActiveDemoPPMRsFromDisenrolledExclusion_` L3420, L3425; `buildPrimaryDemoPRowsInMemory_` L3824; `getRawDataForCompare_` L4133 | Resolve the approved PMR header to one zero-based index; fail clearly when absent |
| `findHeaderIndex_` | 1 | `syncDisenrolledExclusionFromRawData_` L3346 | Resolve approved aliases case-insensitively and return a documented missing sentinel |
| `normalizePMR_` | 13 | `flattenDemoPContactRowsInMemory_` L2875; `populateUniversalMetadataColumns_` L3112; `buildSourceHashByPMR_` L3133; `getDemoPMonthlySyncChangedPMRs_` L3230; `buildDemoPFreshRowsForPMRs_` L3241; `buildDemoPMonthlySyncRetainedRows_` L3254; `syncDisenrolledExclusionFromRawData_` L3356, L3376, L3382; `removeActiveDemoPPMRsFromDisenrolledExclusion_` L3430, L3443; `buildPrimaryDemoPRowsInMemory_` L3832; `getRawDataForCompare_` L4138 | Produce one stable, non-lossy comparison key for participant identifiers |
| `isPrimaryPMRRowValue_` | 2 | `flattenDemoPContactRowsInMemory_` L2885; `buildDemoPMonthlySyncRetainedRows_` L3256 | Distinguish primary participant rows from secondary/contact rows using approved rules |
| `normalizeCompareValue_` | 9 | `flattenDemoPContactRowsInMemory_` L2898, L2900; `populateParticipantNameData_` L2962; `populateDemoPNameData_` L2979; `updateBannerColumnDataInMemory_` L3000; `combineAddressesDataInMemory_` L3013; `combineNotesSummaryDataInMemory_` L3053; `syncDisenrolledExclusionFromRawData_` L3362, L3391 | Normalize values consistently without erasing meaningful type/date differences |
| `normalizeToDateObject_` | 1 | `hideOldDisenrolledRows_` L3481 | Return a valid local `Date` or a documented failure value; reject ambiguous input |
| `valuesAreEqual_` | 1 | `getChangedColumnsForSectionRows_` L4159 | Compare governed values consistently across blanks, dates, numbers, and strings |
| `mapRowsToHeaders_` | 4 | `processSingleSubReport_` L2547; `createActiveDemoPFromRawData_` L2780; `buildDemoPFreshRowsForPMRs_` L3242; `syncDisenrolledExclusionFromRawData_` L3386 | Map source rows to governed target headers with stable width and missing-column behavior |
| `buildHeaderIndexMap_` | 7 | `createActiveDemoPFromRawData_` L2782; `flattenDemoPContactRowsInMemory_` L2863; `buildDemoPFreshRowsForPMRs_` L3243; `syncDisenrolledExclusionFromRawData_` L3339; `appendDemoPArchiveRows_` L3534; `createMasterListForMonth_` L3770; `sortMasterListByParticipantNameAndPMR_` L3948 | Return a normalized header-to-zero-based-index map and define duplicate-header handling |
| `getHeaders_` | 2 | `appendDemoPArchiveRows_` L3530; `sortMasterListByParticipantNameAndPMR_` L3948 | Read the configured header row at current sheet width; reject an empty header surface |
| `padRowToWidth_` | 2 | `buildDemoPMonthlySyncRetainedRows_` L3257, L3261 | Return exactly the requested width without mutating the caller's source row |
| `normalizeRowsToWidth_` | 3 | `updateDemoPMonthlySyncForMonth_` L3203; `writeDemoPMonthlySyncBody_` L3268; `removeActiveDemoPPMRsFromDisenrolledExclusion_` L3455 | Apply row-width normalization consistently to a matrix |
| `formatReportDateLabel_` | 5 | `buildRefinedDataFromScratch` L2675; `updateRefinedDataMonthlySync` L2711; `createDisenrolledList` L2730; `createMasterList` L3698; `buildMonthlyChangeReport` L3714 | Format a validated selected-month date using the script time zone |
| `buildMonthlySheetName_` | 3 | `createMasterListForMonth_` L3746, L3811; `buildMonthlyChangeReportForMonth_` L4054 | Build the approved prefix/month sheet name from the supplied month context |
| `getLatestSheetByPrefix_` | 3 | `updateDemoPMonthlySyncForMonth_` L3184; `getDemoPMonthlySyncChangedPMRs_` L3222; `getPreviousRawDataSheet_` L4294 | Resolve dated non-template sheets deterministically; never substitute the current sheet for a required previous month |
| `getCurrentRawDataSheet_` | 4 | `getValidatedRawDataSheetForDemoPBuild_` L2744; `updateDemoPMonthlySyncForMonth_` L3193; `createDisenrolledListForMonth_` L3313; `buildMonthlyChangeReportForMonth_` L4035 | Resolve Raw Data for the exact prompted month and reject templates/ambiguous matches |
| `getCurrentDemoPSheet_` | 1 | `createMasterListForMonth_` L3739 | Resolve Refined Data for the exact prompted month |
| `getCurrentCarePlanDueSheet_` | 1 | `syncCarePlanDueSourceIntoData_` L3871 | Resolve CP Due Date source for the exact prompted month |
| `getCurrentUnlockedCarePlanSheet_` | 1 | `syncUnlockedCarePlanSourceIntoData_` L3858 | Resolve Unlocked CP source for the exact prompted month |
| `safeSheetName_` | 1 | `buildStagedMasterListSheetName_` L3966 | Produce a legal, length-bounded sheet name without collision ambiguity |
| `setRequiredSheetName_` | 1 | `createMasterListForMonth_` L3801 | Validate collisions and set the exact required final sheet name safely |
| `ensureOutputSheetHasFormattedRows_` | 4 | `processSingleSubReport_` L2561; `writeDemoPMonthlySyncBody_` L3273; `syncDisenrolledExclusionFromRawData_` L3400; `appendDemoPArchiveRows_` L3552 | Expand and format the output grid before writes; validate positive row/column bounds |

## 4. Direct Caller Register

This register reverses the map so each of the 37 affected functions has one remediation checklist row.

| Direct Caller Function | Missing Helper Calls and Lines | Affected Entry Point(s) |
|---|---|---|
| `processSingleSubReport_` | `mapRowsToHeaders_` L2547; `ensureOutputSheetHasFormattedRows_` L2561 | Format Monthly Sheets |
| `buildRefinedDataFromScratch` | `formatReportDateLabel_` L2675 | Build Refined Data |
| `updateRefinedDataMonthlySync` | `formatReportDateLabel_` L2711 | Update Refined Data |
| `createDisenrolledList` | `formatReportDateLabel_` L2730 | Create Disenrolled List |
| `getValidatedRawDataSheetForDemoPBuild_` | `getCurrentRawDataSheet_` L2744 | Build Refined Data |
| `createActiveDemoPFromRawData_` | `getDataValues_` L2772; `mapRowsToHeaders_` L2780; `buildHeaderIndexMap_` L2782 | Build Refined Data |
| `flattenDemoPContactRowsInMemory_` | `buildHeaderIndexMap_` L2863; `getPMRIndex_` L2865; `normalizePMR_` L2875; `isPrimaryPMRRowValue_` L2885; `normalizeCompareValue_` L2898, L2900 | Build/Update Refined Data |
| `populateParticipantNameData_` | `normalizeCompareValue_` L2962 | Build/Update Refined Data |
| `populateDemoPNameData_` | `normalizeCompareValue_` L2979 | Build/Update Refined Data |
| `updateBannerColumnDataInMemory_` | `normalizeCompareValue_` L3000 | Build/Update Refined Data |
| `combineAddressesDataInMemory_` | `normalizeCompareValue_` L3013 | Build/Update Refined Data |
| `combineNotesSummaryDataInMemory_` | `normalizeCompareValue_` L3053 | Build/Update Refined Data |
| `populateUniversalMetadataColumns_` | `getPMRIndex_` L3101; `normalizePMR_` L3112 | Build/Update Refined Data |
| `buildSourceHashByPMR_` | `normalizePMR_` L3133 | Build/Update Refined Data |
| `updateDemoPMonthlySyncForMonth_` | `getLatestSheetByPrefix_` L3184; `getCurrentRawDataSheet_` L3193; `getDataValues_` L3198; `normalizeRowsToWidth_` L3203 | Update Refined Data |
| `getDemoPMonthlySyncChangedPMRs_` | `getLatestSheetByPrefix_` L3222; `getDataValues_` L3225; `getPMRIndex_` L3226; `normalizePMR_` L3230 | Update Refined Data |
| `buildDemoPFreshRowsForPMRs_` | `getDataValues_` L3237; `getPMRIndex_` L3238; `normalizePMR_` L3241; `mapRowsToHeaders_` L3242; `buildHeaderIndexMap_` L3243 | Update Refined Data |
| `buildDemoPMonthlySyncRetainedRows_` | `getPMRIndex_` L3248; `normalizePMR_` L3254; `isPrimaryPMRRowValue_` L3256; `padRowToWidth_` L3257, L3261 | Update Refined Data |
| `writeDemoPMonthlySyncBody_` | `normalizeRowsToWidth_` L3268; `ensureOutputSheetHasFormattedRows_` L3273 | Update Refined Data |
| `createDisenrolledListForMonth_` | `getCurrentRawDataSheet_` L3313 | Create Disenrolled List |
| `syncDisenrolledExclusionFromRawData_` | `buildHeaderIndexMap_` L3339; `getDataValues_` L3341, L3370; `getPMRIndex_` L3342, L3371; `findHeaderIndex_` L3346; `normalizePMR_` L3356, L3376, L3382; `normalizeCompareValue_` L3362, L3391; `mapRowsToHeaders_` L3386; `ensureOutputSheetHasFormattedRows_` L3400 | Create Disenrolled List |
| `removeActiveDemoPPMRsFromDisenrolledExclusion_` | `getDataValues_` L3419, L3424; `getPMRIndex_` L3420, L3425; `normalizePMR_` L3430, L3443; `normalizeRowsToWidth_` L3455 | Build/Update Refined Data cleanup |
| `hideOldDisenrolledRows_` | `getDataValues_` L3465; `normalizeToDateObject_` L3481 | Create Disenrolled List |
| `appendDemoPArchiveRows_` | `getHeaders_` L3530; `buildHeaderIndexMap_` L3534; `ensureOutputSheetHasFormattedRows_` L3552 | Update Refined Data |
| `createMasterList` | `formatReportDateLabel_` L3698 | Create Master List |
| `buildMonthlyChangeReport` | `formatReportDateLabel_` L3714 | Build Monthly Change Report |
| `createMasterListForMonth_` | `getCurrentDemoPSheet_` L3739; `buildMonthlySheetName_` L3746, L3811; `buildHeaderIndexMap_` L3770; `setRequiredSheetName_` L3801 | Create Master List |
| `buildPrimaryDemoPRowsInMemory_` | `getDataValues_` L3821; `getPMRIndex_` L3824; `normalizePMR_` L3832 | Create Master List |
| `syncUnlockedCarePlanSourceIntoData_` | `getCurrentUnlockedCarePlanSheet_` L3858 | Create Master List |
| `syncCarePlanDueSourceIntoData_` | `getCurrentCarePlanDueSheet_` L3871 | Create Master List |
| `buildSourceMapBySingleKey_` | `getDataValues_` L3909 | Create Master List |
| `sortMasterListByParticipantNameAndPMR_` | `buildHeaderIndexMap_` and `getHeaders_` L3948 | Create Master List |
| `buildStagedMasterListSheetName_` | `safeSheetName_` L3966 | Create Master List |
| `buildMonthlyChangeReportForMonth_` | `getCurrentRawDataSheet_` L4035; `buildMonthlySheetName_` L4054 | Build Monthly Change Report |
| `getRawDataForCompare_` | `getDataValues_` L4132; `getPMRIndex_` L4133; `normalizePMR_` L4138 | Build Monthly Change Report |
| `getChangedColumnsForSectionRows_` | `valuesAreEqual_` L4159 | Build Monthly Change Report |
| `getPreviousRawDataSheet_` | `getLatestSheetByPrefix_` L4294 | Build Monthly Change Report |

## 5. Restoration and Verification Order

Restore helpers in dependency layers so failures are attributable and testing remains bounded:

1. **Pure normalization:** `normalizePMR_`, `normalizeCompareValue_`, `normalizeToDateObject_`, `valuesAreEqual_`, `isPrimaryPMRRowValue_`.
2. **Matrix/header primitives:** `padRowToWidth_`, `normalizeRowsToWidth_`, `buildHeaderIndexMap_`, `findHeaderIndex_`, `getPMRIndex_`, `mapRowsToHeaders_`.
3. **Sheet read/write primitives:** `getHeaders_`, `getDataValues_`, `ensureOutputSheetHasFormattedRows_`, `safeSheetName_`, `setRequiredSheetName_`.
4. **Date/name helpers:** `formatReportDateLabel_`, `buildMonthlySheetName_`.
5. **Sheet resolvers:** `getLatestSheetByPrefix_`, `getCurrentRawDataSheet_`, `getCurrentDemoPSheet_`, `getCurrentCarePlanDueSheet_`, `getCurrentUnlockedCarePlanSheet_`.
6. **Entry-point retest:** Format Monthly Sheets, Build Refined Data, Update Refined Data, Create Disenrolled List, Create Master List, and Build Monthly Change Report.

For each layer, require unit-level tests before enabling the next layer. After all layers are restored, rerun exact declaration/call reconciliation and require zero missing RC-002 helper names and zero incompatible caller signatures.

## 6. Closure Checklist

- All 23 helpers exist exactly once in the assembled candidate.
- All 92 direct call sites resolve to the governed implementations.
- All 37 caller functions pass their normal, cancellation, missing-input, and controlled-failure paths.
- The six affected entry points preserve their approved public names and behavior.
- Sheet resolvers use the prompted month, exclude templates, and reject ambiguous matches.
- PMR/header normalization tests prove stable identifiers and zero-based index contracts.
- Range helpers prevent zero-width, negative-size, and out-of-grid writes.
- No helper restoration introduces a duplicate global or obsolete compatibility alias.
- The new production candidate receives a new version and source fingerprint before the readiness audit is rerun.
