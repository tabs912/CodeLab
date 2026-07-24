# Timing Log Average Runtime Review

Source folder reviewed: `Master_List/Reports/Timing Log for Review` from `origin/main`.

Scope: Section A / Process Summary rows for `Format Monthly Sheets`, `Create Monthly Start`, and `Create Monthly Update` only. All matching rows from all available timing-log PDFs are included; duplicated/copy reports are counted as separate submitted timing logs because the request was to review all logs in the folder.

## Executive Summary

| Workflow | Timing Rows | Average Seconds | Average Minutes | Median Seconds | Minimum Seconds | Maximum Seconds | PASS | SLOW | BOTTLENECK | CRITICAL |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Format Monthly Sheets | 25 | 104.567 | 1.74 | 95.205 | 34.696 | 267.257 | 6 | 16 | 3 | 0 |
| Create Monthly Start | 6 | 123.196 | 2.05 | 119.594 | 95.672 | 148.866 | 0 | 3 | 3 | 0 |
| Create Monthly Update | 11 | 146.598 | 2.44 | 124.273 | 87.237 | 303.289 | 0 | 10 | 1 | 0 |

## Interpretation

| Workflow | Average Runtime Assessment | Notes |
|---|---|---|
| Format Monthly Sheets | 104.567 sec average (1.74 min) across 25 rows | Wide variance: 34.696 sec minimum to 267.257 sec maximum. Later v1.8.9.4.2 rows remain SLOW at 97.510-139.516 sec. |
| Create Monthly Start | 123.196 sec average (2.05 min) across 6 rows | All observed rows are SLOW or BOTTLENECK; no PASS rows were present for this workflow. |
| Create Monthly Update | 146.598 sec average (2.44 min) across 11 rows | All observed rows are SLOW or BOTTLENECK; v1.8.9.4.2 includes the maximum observed runtime at 303.289 sec. |

## Files Reviewed

| Timing Log PDF | Pages | Extracted Text Characters | Matching Target Rows |
|---|---:|---:|---:|
| TEST v1.7.7 - Framework Timing Report.pdf | 15 | 91458 | 3 |
| testv1.8.9.8 - Framework Timing Report.pdf | 16 | 101093 | 6 |
| v1.8.6 - Framework Timing Report.pdf | 11 | 108345 | 4 |
| v1.8.8 - Framework Timing Report.pdf | 1 | 2947 | 0 |
| v1.8.9.1 - Framework Timing Report.pdf | 18 | 107509 | 6 |
| v1.8.9.3 - Framework Timing Report.pdf | 19 | 110254 | 5 |
| v1.8.9.3 - Wave 4 - Framework Timing Report.pdf | 13 | 68785 | 3 |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report (1).pdf | 21 | 116303 | 5 |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report.pdf | 19 | 108306 | 4 |
| v1.8.9.4.2 - Framework Timing Report.pdf | 19 | 112881 | 6 |

## Detailed Rows Used in the Averages

### Format Monthly Sheets

| Timing Log PDF | Process Row | Runtime Seconds | Runtime Minutes | Status |
|---|---|---:|---:|---|
| TEST v1.7.7 - Framework Timing Report.pdf | Format Monthly Sheets 05.26 | 55.243 | 0.92 | PASS |
| TEST v1.7.7 - Framework Timing Report.pdf | Format Monthly Sheets 06.26 | 70.332 | 1.17 | PASS |
| testv1.8.9.8 - Framework Timing Report.pdf | Format Monthly Sheets 04.26 | 38.339 | 0.64 | PASS |
| testv1.8.9.8 - Framework Timing Report.pdf | Format Monthly Sheets 05.26 | 34.696 | 0.58 | PASS |
| testv1.8.9.8 - Framework Timing Report.pdf | Format Monthly Sheets 06.26 | 39.312 | 0.66 | PASS |
| v1.8.6 - Framework Timing Report.pdf | Format Monthly Sheets 04.26 | 98.990 | 1.65 | SLOW |
| v1.8.6 - Framework Timing Report.pdf | Format Monthly Sheets 05.26 | 84.066 | 1.40 | SLOW |
| v1.8.6 - Framework Timing Report.pdf | Format Monthly Sheets 07.26 | 189.312 | 3.16 | BOTTLENECK |
| v1.8.9.1 - Framework Timing Report.pdf | Format Monthly Sheets 05.26 | 68.326 | 1.14 | PASS |
| v1.8.9.1 - Framework Timing Report.pdf | Format Monthly Sheets 06.26 | 95.253 | 1.59 | SLOW |
| v1.8.9.1 - Framework Timing Report.pdf | Format Monthly Sheets 07.26 | 107.402 | 1.79 | SLOW |
| v1.8.9.3 - Framework Timing Report.pdf | Format Monthly Sheets 04.26 | 94.496 | 1.57 | SLOW |
| v1.8.9.3 - Framework Timing Report.pdf | Format Monthly Sheets 05.26 | 112.027 | 1.87 | SLOW |
| v1.8.9.3 - Framework Timing Report.pdf | Format Monthly Sheets 06.26 | 112.427 | 1.87 | SLOW |
| v1.8.9.3 - Wave 4 - Framework Timing Report.pdf | Format Monthly Sheets 04.26 | 242.432 | 4.04 | BOTTLENECK |
| v1.8.9.3 - Wave 4 - Framework Timing Report.pdf | Format Monthly Sheets 05.26 | 267.257 | 4.45 | BOTTLENECK |
| v1.8.9.3 - Wave 4 - Framework Timing Report.pdf | Format Monthly Sheets 06.26 | 158.060 | 2.63 | SLOW |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report (1).pdf | Format Monthly Sheets 04.26 | 44.076 | 0.73 | SLOW |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report (1).pdf | Format Monthly Sheets 05.26 | 85.843 | 1.43 | SLOW |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report (1).pdf | Format Monthly Sheets 07.26 | 95.205 | 1.59 | SLOW |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report.pdf | Format Monthly Sheets 04.26 | 82.883 | 1.38 | SLOW |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report.pdf | Format Monthly Sheets 05.26 | 85.843 | 1.43 | SLOW |
| v1.8.9.4.2 - Framework Timing Report.pdf | Format Monthly Sheets 04.26 | 115.330 | 1.92 | SLOW |
| v1.8.9.4.2 - Framework Timing Report.pdf | Format Monthly Sheets 05.26 | 97.510 | 1.63 | SLOW |
| v1.8.9.4.2 - Framework Timing Report.pdf | Format Monthly Sheets 06.26 | 139.516 | 2.33 | SLOW |

### Create Monthly Start

| Timing Log PDF | Process Row | Runtime Seconds | Runtime Minutes | Status |
|---|---|---:|---:|---|
| testv1.8.9.8 - Framework Timing Report.pdf | Create Monthly Start 04.01.26 | 109.982 | 1.83 | SLOW |
| v1.8.9.1 - Framework Timing Report.pdf | Create Monthly Start 04.01.26 | 106.585 | 1.78 | SLOW |
| v1.8.9.3 - Framework Timing Report.pdf | Create Monthly Start 04.01.26 | 95.672 | 1.59 | SLOW |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report (1).pdf | Create Monthly Start 04.01.26 | 148.866 | 2.48 | BOTTLENECK |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report.pdf | Create Monthly Start 04.01.26 | 148.866 | 2.48 | BOTTLENECK |
| v1.8.9.4.2 - Framework Timing Report.pdf | Create Monthly Start 04.01.26 | 129.205 | 2.15 | BOTTLENECK |

### Create Monthly Update

| Timing Log PDF | Process Row | Runtime Seconds | Runtime Minutes | Status |
|---|---|---:|---:|---|
| TEST v1.7.7 - Framework Timing Report.pdf | Create Monthly Update 06.01.26 | 153.958 | 2.57 | SLOW |
| testv1.8.9.8 - Framework Timing Report.pdf | Create Monthly Update 05.01.26 | 99.611 | 1.66 | SLOW |
| testv1.8.9.8 - Framework Timing Report.pdf | Create Monthly Update 06.01.26 | 87.237 | 1.45 | SLOW |
| v1.8.6 - Framework Timing Report.pdf | Create Monthly Update 05.01.26 | 200.141 | 3.34 | SLOW |
| v1.8.9.1 - Framework Timing Report.pdf | Create Monthly Update 05.01.26 | 124.273 | 2.07 | SLOW |
| v1.8.9.1 - Framework Timing Report.pdf | Create Monthly Update 06.01.26 | 121.075 | 2.02 | SLOW |
| v1.8.9.3 - Framework Timing Report.pdf | Create Monthly Update 05.01.26 | 148.971 | 2.48 | SLOW |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report (1).pdf | Create Monthly Update 05.01.26 | 111.838 | 1.86 | SLOW |
| v1.8.9.3 - Wave 4.1 - Framework Timing Report.pdf | Create Monthly Update 05.01.26 | 111.838 | 1.86 | SLOW |
| v1.8.9.4.2 - Framework Timing Report.pdf | Create Monthly Update 05.01.26 | 150.343 | 2.51 | SLOW |
| v1.8.9.4.2 - Framework Timing Report.pdf | Create Monthly Update 06.01.26 | 303.289 | 5.05 | BOTTLENECK |

## Method

| Step | Detail |
|---|---|
| Source acquisition | Exported all PDFs from `origin/main:Master_List/Reports/Timing Log for Review` to `/tmp/timing_pdfs` without modifying or staging binary report files. |
| Text extraction | Used `pypdf` to extract PDF text into `/tmp/timing_txt`. |
| Row selection | Parsed only text between `SECTION A - PROCESS SUMMARY` and `SECTION B - PERFORMANCE ISSUES` to avoid counting detailed step rows. |
| Runtime patterns | Matched `Format Monthly Sheets MM.YY`, `Create Monthly Start MM.DD.YY`, and `Create Monthly Update MM.DD.YY`, followed by runtime seconds and status. |
| Averaging | Used arithmetic mean of every matching Section A process-summary runtime row in the reviewed folder. |
