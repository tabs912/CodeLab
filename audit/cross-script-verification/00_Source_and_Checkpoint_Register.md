# Source and Checkpoint Register

**Audit start / last checkpoint:** 2026-07-31 00:20 UTC
**Current script version:** 1.8.9.8.4 (combined header); 1.8.9.8.4.0 (modular declaration)
**Previous approved script version:** 1.8.9.8.4
**Number of modular files:** 10
**Combined script present:** Yes (both previous and rebuilt candidates)
**Previous review results present:** Yes (11 files)
**Required source files missing:** No for the expressly identified population; live container/deployment evidence is absent
**Audit folder:** `audit/cross-script-verification/`
**Production code modified:** No
**Current active stage:** Stage 7 complete

| Stage | Sections | Status | Sources Completed | Last Completed Item | Open Issues | Next Action |
|---:|---|---|---|---|---|---|
| 0 | Source preparation | COMPLETE | 23/23 | SRC-0023 | Live runtime evidence absent | Preserve register |
| 1 | Sections 1–3 | COMPLETE WITH OPEN ISSUES | all code sources | FN-0548 | modular omissions | Stage 2 |
| 2 | Sections 4–5 | COMPLETE WITH OPEN ISSUES | all code sources | TRG-0003 | missing modular callbacks; deployed state unknown | Stage 3 |
| 3 | Sections 6–7 | COMPLETE WITH OPEN ISSUES | all code sources | all 548 functions | modular population incomplete | Stage 4 |
| 4 | Sections 8–10 | COMPLETE WITH OPEN ISSUES | all code sources | modular/combined comparison | content not equivalent | Stage 5 |
| 5 | Sections 11–12 | COMPLETE WITH OPEN ISSUES | 11 reports + code | independent totals | prior scope conclusion incorrect | Stage 6 |
| 6 | Section 13 | COMPLETE | all stage reports | DISC-0006 | six consolidated discrepancies | Stage 7 |
| 7 | Section 14 | COMPLETE | all required static sources | final certification | runtime checks remain | Remediate and rerun |

## Source population

| Source ID | Path | Declared/inferred version | Classification | Lines | SHA-256 |
|---|---|---|---|---:|---|
| SRC-0001 | `Master_List/Current Production Script/v1.8.9.8.4_Current_Script` | 1.8.9.8.4 | Previous approved combined production | 15614 | `3346002882c357245cbe1eda1042aef7aa6a74c85fb283c71cca126448590297` |
| SRC-0002 | `Master_List/Current Production Script/v1.8.9.8.4.4_Current_Script.gs` | 1.8.9.8.4 | Current rebuilt combined production | 15821 | `933d568002211879a44db8a8327091db36e34298550b9ee92d63160a175358fa` |
| SRC-0003 | `Master_List/Current Production Script/Modules/1_Config.gs` | not declared | Current modular production | 220 | `0123861f4ff6fa6091129f39429c876615815550c7ebb9be8e9ad2c72cf85e6e` |
| SRC-0004 | `Master_List/Current Production Script/Modules/2_Dashboard_Loaders.gs` | not declared | Current modular production | 556 | `0a63c4ab5a83a92e36fae387eb8230de083e69259c74f063b199859586a4d7c5` |
| SRC-0005 | `Master_List/Current Production Script/Modules/3_Core_Helpers.gs` | not declared | Current modular production | 314 | `5d1a467b482a824a6da8ea4c862905f16fb29e3d4878628e7b06be408aa4256d` |
| SRC-0006 | `Master_List/Current Production Script/Modules/4_System_Index.gs` | not declared | Current modular production | 424 | `21ca1b782d05d6e24f727a296b5f0b97453c60bd4c7a0a9f3f02976770b5ae16` |
| SRC-0007 | `Master_List/Current Production Script/Modules/5_System_Templates.gs` | not declared | Current modular production | 415 | `da57e470353fdd1afb477c02d1a40d0e7af47bfb0974e0e593b177a8226a823d` |
| SRC-0008 | `Master_List/Current Production Script/Modules/6_System_Quality.gs` | not declared | Current modular production | 231 | `9a93f07656e1b0d99572b05ae4e17fe361ec5d93de0c8fa7e0cb87e3ae45ef70` |
| SRC-0009 | `Master_List/Current Production Script/Modules/7_Workflow_DemoP.gs` | not declared | Current modular production | 680 | `77e6912f5ec01617be10d80de55f80a3a8b7d1b28490f3125766844212b4ac76` |
| SRC-0010 | `Master_List/Current Production Script/Modules/8_Workflow_MasterList.gs` | not declared | Current modular production | 531 | `c163937dd684370b190e2ebd6672d752dfdb33ddc81b95a7ed238c354f2381db` |
| SRC-0011 | `Master_List/Current Production Script/Modules/9_Workflow_MonthlyChange.gs` | not declared | Current modular production | 534 | `a74e8783d6ec77da93abd77503ae38b9664c19e4bf4d68b4db1d2db5eb73af22` |
| SRC-0012 | `Master_List/Current Production Script/Modules/_10_Workflow_Disenrolled.gs` | not declared | Current modular production | 259 | `01a5ba1efc25951ff94ce5ba8ed171c0b5a10aaa7d157ad5cddb2e5180cf29bf` |
| SRC-0013 | `Master_List/Audit Summary/Modular Scripts/01_Source_Registration_and_Entry_Point_Discovery.md` | not declared | Previous audit result | 183 | `07ecf5d070cb25f3035921466926ca4c0b74001c6d3b8b8462d5d77b8bcd79af` |
| SRC-0014 | `Master_List/Audit Summary/Modular Scripts/02_Menu_Function_Call_Graphs_Part_1.md` | not declared | Previous audit result | 721 | `56b509c277cb72758318c7ddaa2b9cba1ea672fd89e4778bc317f069a8c15cfb` |
| SRC-0015 | `Master_List/Audit Summary/Modular Scripts/03_Menu_Function_Call_Graphs_Part_2.md` | not declared | Previous audit result | 2522 | `d5f2a1ea00bcda8a9b109a9171b3b7f9dc7612f3ce35d812feaaa7acb479e91f` |
| SRC-0016 | `Master_List/Audit Summary/Modular Scripts/04_Trigger_Function_Call_Graphs.md` | not declared | Previous audit result | 325 | `0fe9926c12566934bd0fb7f3caac6edbea7bd09396156bc76854a86b593c2a69` |
| SRC-0017 | `Master_List/Audit Summary/Modular Scripts/05_Reachable_Function_Dependency_Catalog.md` | not declared | Previous audit result | 656 | `1eac82c09dc63432c65c3747b4faa9a9b976f1475c5433b3aa9096bb5ee3e988` |
| SRC-0018 | `Master_List/Audit Summary/Modular Scripts/06_Numbered_Menu_Execution_Traces.md` | not declared | Previous audit result | 4874 | `1ce6259daa6e38435213ef5f925c3d510a273eb36aafb1ae5771da0c76bbd58f` |
| SRC-0019 | `Master_List/Audit Summary/Modular Scripts/07_Numbered_Trigger_Execution_Traces.md` | not declared | Previous audit result | 343 | `522a9b032ab12eb77076e6517a9fa543e0d5f419bc79fb82501a79c8b88e41aa` |
| SRC-0020 | `Master_List/Audit Summary/Modular Scripts/08_Read_Write_Branch_Failure_and_Recovery_Review.md` | not declared | Previous audit result | 544 | `fdf4133aff917af7ef6a83f275c07983858c3b39448ca9c98752520d3e5c3e11` |
| SRC-0021 | `Master_List/Audit Summary/Modular Scripts/09_Post_Upgrade_Integrity_and_Delta_Verification.md` | not declared | Previous audit result | 53 | `c3955b72a38a001cbeb025882b0361b67e49ae98c8aff229d11857965b4d91b2` |
| SRC-0022 | `Master_List/Audit Summary/Modular Scripts/10_Final_Consolidated_Execution_Trace_Audit.md` | not declared | Previous audit result | 7960 | `5cdd015db649d102c2a00cc7f688e0e20280a756ab625865d6eabdceece036e1` |
| SRC-0023 | `Master_List/Audit Summary/Modular Scripts/Master_List_Modular_Execution_Trace_Audit_v1.8.9.8.4.0.md` | 1.8.9.8.4.0 | Previous audit result | 18279 | `f971f2d038dea1ed71512e83348685ad6fa5504636359f27c472288e1b919857` |

## Population findings

* **Confirmed fact:** The ten modules hash to the exact per-file hashes recorded by the prior report; they are not truncated at the byte level relative to what that report audited.
* **Confirmed fact:** Their combined executable population is nevertheless substantially smaller than either supplied combined production script. This is a source-population/content omission, not proof of file-transfer truncation.
* **Confirmed fact:** The two combined files declare the same `1.8.9.8.4` version but differ in bytes and line counts; this is an ambiguous duplicate-version condition.
* **Missing evidence:** No live Apps Script container trigger/deployment export or disposable workbook runtime results were supplied.
* Files under `Archive_To_Move/` and binary artifacts were excluded as required.
