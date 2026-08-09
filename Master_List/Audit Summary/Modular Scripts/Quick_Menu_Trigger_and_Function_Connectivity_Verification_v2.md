# Quick Menu, Trigger, and Function Connectivity Verification — v2 Modules

**Verification status:** COMPLETE — compact exception-focused static review
**Overall certification:** **FAIL**
**Authoritative source snapshot:** fetched `origin/main` commit `273ab8fe77ecab6ec7633ea85d95e6d84847ca20`
**Current implementation:** eleven files ending in `v2.gs` under `Master_List/Current Production Script/Modules`
**Production code modified:** No
**Runtime/container verification:** NOT VERIFIED

## Executive result

All **42/42 menu registrations now resolve to declared callbacks**, correcting the v1 modular population's missing-callback defect. The v2 project is nevertheless not fully connected: eight menu paths share a lock wrapper whose contention branch calls missing `notify_`; Dashboard Quality Start Up calls six missing configuration collectors; `updateIndexSheet` is defined twice globally; and baseline web entry `doGet(e)` was removed while the menu still configures an Index Restore Web App URL. Twenty-nine menu paths are statically connected with runtime warnings; thirteen menu paths and both trigger/deployment rows fail certification.

## Section 1 — Baseline and source register

| ID | File or Report | Type | Version | Baseline/Current | Scope Used | Lines | SHA-256 | Status |
|---|---|---|---|---|---|---:|---|---|
| SRC-001 | `0_ORCHESTRATIONv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 214 | `14e6e39724592fdb113d747cdb524a7a84e939da6ec5a1e3655395ab818063a7` | Included |
| SRC-002 | `1_CONFIGv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 317 | `a6d04b83692c175d5da7f6d32684e5f8548786045d015be87c4385329a5d72f9` | Included |
| SRC-003 | `2_DASHBOARD_LOADERSv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 444 | `156e6c2658590f790ca437d296088dcfedd8bcf08f00900bb27f40f17280d9fb` | Included |
| SRC-004 | `3_CORE_HELPERSv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 241 | `52c8d1ebbe290b167b378ae6267c9c665b4fd5ba8dc41b37cc9c59f01c48278c` | Included |
| SRC-005 | `4_SYSTEM_INDEXv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 147 | `8373cbc65bfa490d1a2fbf8d8bdb1adf726b6255fb72875d7939322d8fcb3c59` | Included |
| SRC-006 | `5_SYSTEM_TEMPLATESv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 496 | `6c4e374850076ae068881d47160121a7c5676415da54d215d694c1faa775e7e8` | Included |
| SRC-007 | `6_SYSTEM_QUALITYv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 790 | `1550a598347f343206ce64e7267b4ab07c09db4a1c48b4c064ec6e192d1367b8` | Included |
| SRC-008 | `7_WORKFLOW_DEMOPv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 277 | `8a8a34329398686a19412470a55e98105679bd10c33a22cab97b40872aa88a65` | Included |
| SRC-009 | `8_WORKFLOW_MASTERLISTv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 165 | `2e9ad5012eccc23d70fd7033b4e8196ed8d1dee06a547fcd29197af469ad85e2` | Included |
| SRC-010 | `9_WORKFLOW_MONTHLYCHANGEv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 121 | `0b81c9bfe687119dba92bd84310a61d058da2bbdcdd268f87755c31544f7bc38` | Included |
| SRC-011 | `_10_WORKFLOW_DISENROLLMENTv2.gs` | Current v2 module | 1.8.9.8.4.0 | Current (`origin/main`) | connectivity | 199 | `3689b8ee01562e07afdec5763073cd70828418c4e598f8a2cfe77ebbdb8a7668` | Included |
| SRC-012 | `01_Source_Registration_and_Entry_Point_Discovery.md` | Baseline report | 1.8.9.8.4.0 | Baseline | indexes/totals/changed entries | 183 | `07ecf5d070cb25f3035921466926ca4c0b74001c6d3b8b8462d5d77b8bcd79af` | Used |
| SRC-013 | `02_Menu_Function_Call_Graphs_Part_1.md` | Baseline report | 1.8.9.8.4.0 | Baseline | indexes/totals/changed entries | 721 | `56b509c277cb72758318c7ddaa2b9cba1ea672fd89e4778bc317f069a8c15cfb` | Used |
| SRC-014 | `03_Menu_Function_Call_Graphs_Part_2.md` | Baseline report | 1.8.9.8.4.0 | Baseline | indexes/totals/changed entries | 2522 | `d5f2a1ea00bcda8a9b109a9171b3b7f9dc7612f3ce35d812feaaa7acb479e91f` | Used |
| SRC-015 | `04_Trigger_Function_Call_Graphs.md` | Baseline report | 1.8.9.8.4.0 | Baseline | indexes/totals/changed entries | 325 | `0fe9926c12566934bd0fb7f3caac6edbea7bd09396156bc76854a86b593c2a69` | Used |
| SRC-016 | `05_Reachable_Function_Dependency_Catalog.md` | Baseline report | 1.8.9.8.4.0 | Baseline | indexes/totals/changed entries | 656 | `1eac82c09dc63432c65c3747b4faa9a9b976f1475c5433b3aa9096bb5ee3e988` | Used |
| SRC-017 | `06_Numbered_Menu_Execution_Traces.md` | Baseline report | 1.8.9.8.4.0 | Baseline | indexes/totals/changed entries | 4874 | `1ce6259daa6e38435213ef5f925c3d510a273eb36aafb1ae5771da0c76bbd58f` | Used |
| SRC-018 | `07_Numbered_Trigger_Execution_Traces.md` | Baseline report | 1.8.9.8.4.0 | Baseline | indexes/totals/changed entries | 343 | `522a9b032ab12eb77076e6517a9fa543e0d5f419bc79fb82501a79c8b88e41aa` | Used |
| SRC-019 | `08_Read_Write_Branch_Failure_and_Recovery_Review.md` | Baseline report | 1.8.9.8.4.0 | Baseline | indexes/totals/changed entries | 544 | `fdf4133aff917af7ef6a83f275c07983858c3b39448ca9c98752520d3e5c3e11` | Used |
| SRC-020 | `09_Post_Upgrade_Integrity_and_Delta_Verification.md` | Baseline report | 1.8.9.8.4.0 | Baseline | indexes/totals/changed entries | 53 | `c3955b72a38a001cbeb025882b0361b67e49ae98c8aff229d11857965b4d91b2` | Used |
| SRC-021 | `10_Final_Consolidated_Execution_Trace_Audit.md` | Baseline report | 1.8.9.8.4.0 | Baseline | indexes/totals/changed entries | 7960 | `5cdd015db649d102c2a00cc7f688e0e20280a756ab625865d6eabdceece036e1` | Used |
| SRC-022 | `Master_List_Modular_Execution_Trace_Audit_v1.8.9.8.4.0.md` | Baseline report | 1.8.9.8.4.0 | Baseline | totals/exceptions | 18279 | `f971f2d038dea1ed71512e83348685ad6fa5504636359f27c472288e1b919857` | Used |
| SRC-023 | `Quick_Menu_Trigger_and_Function_Connectivity_Verification_v1.8.9.8.4.0.md` | Baseline report | 1.8.9.8.4.0 | Baseline | totals/exceptions | 221 | `86796c9f89b934872030b55a2d804f1ee5b9ff235b81f53f089857496e19c44a` | Used |

All eleven v2 modules and all ten numbered baseline reports were reviewed together. The combined baseline and prior quick verification were used for totals and changed exceptions. No production file was modified or committed.

## Sections 2–3 — Menu and trigger inventory with compact connectivity

| ID | Menu/Trigger | Type | Registered Callback | Callback Exists | Wrapper | Implementation Evidence | Final Status |
|---|---|---|---|---|---|---|---|
| MT-001 | 📚 Format Monthly Sheets | Menu | `formatMonthlySheets` | Yes | N/A | `0_ORCHESTRATIONv2.gs:86` | **PASS WITH WARNING** |
| MT-002 | 🔁 Create Monthly Update | Menu | `runMonthlyUpdate` | Yes | Yes | `0_ORCHESTRATIONv2.gs:50` | **FAIL** |
| MT-003 | 🏁 Create Monthly Start | Menu | `runMonthlyStart` | Yes | Yes | `0_ORCHESTRATIONv2.gs:16` | **FAIL** |
| MT-004 | 🗂️ Hide Monthly Sub-Reports | Menu | `hideMonthlyImportSheets` | Yes | N/A | `0_ORCHESTRATIONv2.gs:172` | **PASS WITH WARNING** |
| MT-005 | 🗃️ Archive Monthly Sub-Reports | Menu | `archiveMonthlyImportSheets` | Yes | N/A | `0_ORCHESTRATIONv2.gs:188` | **FAIL** |
| MT-006 | 🗂️ Hide Monthly Active Sheets | Menu | `hideMonthlyActiveSheets` | Yes | N/A | `0_ORCHESTRATIONv2.gs:193` | **PASS WITH WARNING** |
| MT-007 | 🗃️ Archive Monthly Active Sheets | Menu | `archiveMonthlyActiveSheets` | Yes | N/A | `0_ORCHESTRATIONv2.gs:206` | **FAIL** |
| MT-008 | Build All Templates + Validate | Menu | `buildAllTemplatesAndValidate` | Yes | Yes | `0_ORCHESTRATIONv2.gs:130` | **FAIL** |
| MT-009 | Show Templates | Menu | `showReportTemplates` | Yes | N/A | `3_CORE_HELPERSv2.gs:220` | **PASS WITH WARNING** |
| MT-010 | Hide Templates | Menu | `hideReportTemplates` | Yes | N/A | `3_CORE_HELPERSv2.gs:211` | **PASS WITH WARNING** |
| MT-011 | Hide System Sheets | Menu | `hideSystemSheets_` | Yes | N/A | `3_CORE_HELPERSv2.gs:195` | **PASS WITH WARNING** |
| MT-012 | Show System Sheets | Menu | `showSystemSheets_` | Yes | N/A | `3_CORE_HELPERSv2.gs:203` | **PASS WITH WARNING** |
| MT-013 | 🏗️ System Set up | Menu | `quickSystemSetup` | Yes | N/A | `1_CONFIGv2.gs:129` | **PASS WITH WARNING** |
| MT-014 | Build System Sheets | Menu | `buildSystemSheets` | Yes | N/A | `0_ORCHESTRATIONv2.gs:144` | **PASS WITH WARNING** |
| MT-015 | Set up System Sheets | Menu | `setupSystemSheets` | Yes | N/A | `0_ORCHESTRATIONv2.gs:148` | **PASS WITH WARNING** |
| MT-016 | 🖼️ Build Templates + Validate Templates | Menu | `quickBuildAllTemplates` | Yes | N/A | `0_ORCHESTRATIONv2.gs:140` | **PASS WITH WARNING** |
| MT-017 | ✅ Dashboard Quality Workflow | Menu | `runDashboardQualityWorkflow` | Yes | N/A | `6_SYSTEM_QUALITYv2.gs:40` | **PASS WITH WARNING** |
| MT-018 | Dashboard Quality Start up | Menu | `runDashboardQualityStartUp` | Yes | N/A | `6_SYSTEM_QUALITYv2.gs:14` | **FAIL** |
| MT-019 | Dashboard Quality Validate Templates | Menu | `runDashboardQualityValidateTemplates` | Yes | N/A | `6_SYSTEM_QUALITYv2.gs:27` | **PASS WITH WARNING** |
| MT-020 | Dashboard Quality Workflow | Menu | `runDashboardQualityWorkflow` | Yes | N/A | `6_SYSTEM_QUALITYv2.gs:40` | **PASS WITH WARNING** |
| MT-021 | Banner | Menu | `formatBannerReport` | Yes | N/A | `0_ORCHESTRATIONv2.gs:98` | **PASS WITH WARNING** |
| MT-022 | CP Due Date | Menu | `formatCarePlanDueReport` | Yes | N/A | `0_ORCHESTRATIONv2.gs:104` | **PASS WITH WARNING** |
| MT-023 | Unlocked CP | Menu | `formatUnlockedCarePlanReport` | Yes | N/A | `0_ORCHESTRATIONv2.gs:110` | **PASS WITH WARNING** |
| MT-024 | Raw Data | Menu | `formatRawData` | Yes | N/A | `0_ORCHESTRATIONv2.gs:116` | **PASS WITH WARNING** |
| MT-025 | 🔄 Update Refined Data | Menu | `updateRefinedDataMonthlySync` | Yes | N/A | `7_WORKFLOW_DEMOPv2.gs:87` | **PASS WITH WARNING** |
| MT-026 | 🛠️ Build Refined Data | Menu | `buildRefinedDataFromScratch` | Yes | Yes | `7_WORKFLOW_DEMOPv2.gs:11` | **FAIL** |
| MT-027 | ⛔ Create / Update Disenrolled List | Menu | `createDisenrolledList` | Yes | Yes | `_10_WORKFLOW_DISENROLLMENTv2.gs:12` | **FAIL** |
| MT-028 | 🗓️ Monthly Change Report | Menu | `buildMonthlyChangeReport` | Yes | Yes | `9_WORKFLOW_MONTHLYCHANGEv2.gs:11` | **FAIL** |
| MT-029 | 💡 Create Master List | Menu | `createMasterList` | Yes | Yes | `8_WORKFLOW_MASTERLISTv2.gs:11` | **FAIL** |
| MT-030 | 🏗️ Rebuild System Templates | Menu | `createSystemTemplates` | Yes | N/A | `5_SYSTEM_TEMPLATESv2.gs:111` | **PASS WITH WARNING** |
| MT-031 | 🪄 Clear Diagnostics & Timing | Menu | `clearDiagnosticsAndTimingLogs` | Yes | N/A | `5_SYSTEM_TEMPLATESv2.gs:77` | **PASS WITH WARNING** |
| MT-032 | ⏱️ Framework Timing on/off | Menu | `toggleFrameworkTiming` | Yes | N/A | `0_ORCHESTRATIONv2.gs:211` | **FAIL** |
| MT-033 | 🧭 Organize Tabs | Menu | `enforceGlobalSheetSortOrder` | Yes | N/A | `3_CORE_HELPERSv2.gs:176` | **PASS WITH WARNING** |
| MT-034 | Build System Sheets | Menu | `buildSystemSheets` | Yes | N/A | `0_ORCHESTRATIONv2.gs:144` | **PASS WITH WARNING** |
| MT-035 | 📜 Set up System Sheets | Menu | `setupSystemSheets` | Yes | N/A | `0_ORCHESTRATIONv2.gs:148` | **PASS WITH WARNING** |
| MT-036 | 🎨 Format Dashboard | Menu | `rebuildFormatDashboardDefaults` | Yes | N/A | `0_ORCHESTRATIONv2.gs:153` | **PASS WITH WARNING** |
| MT-037 | 💾 Save Active Layout as Dashboard Settings | Menu | `saveActiveLayoutToDashboardSettings` | Yes | N/A | `0_ORCHESTRATIONv2.gs:163` | **FAIL** |
| MT-038 | 🖼️ Build All Templates + Validate | Menu | `buildAllTemplatesAndValidate` | Yes | Yes | `0_ORCHESTRATIONv2.gs:130` | **FAIL** |
| MT-039 | 📇 Build / Update Index | Menu | `updateIndexSheet` | Yes | N/A | `1_CONFIGv2.gs:151`<br>`4_SYSTEM_INDEXv2.gs:12` | **PASS WITH WARNING** |
| MT-040 | ↩️ Restore Selected Archive Row | Menu | `restoreSheetFromActiveIndexRow` | Yes | N/A | `4_SYSTEM_INDEXv2.gs:118` | **PASS WITH WARNING** |
| MT-041 | 🌐 Configure Index Restore Web App URL | Menu | `configureIndexRestoreWebAppUrl` | Yes | N/A | `4_SYSTEM_INDEXv2.gs:74` | **PASS WITH WARNING** |
| MT-042 | 🔗 Configure Archive Spreadsheet ID | Menu | `configureArchiveSpreadsheetId` | Yes | N/A | `4_SYSTEM_INDEXv2.gs:95` | **PASS WITH WARNING** |
| MT-043 | Spreadsheet open | Simple trigger | `onOpen` | Yes | N/A | `1_CONFIGv2.gs:8` | **FAIL** |
| MT-044 | Index restore web request (baseline) | Removed web-app GET entry | `doGet(e)` | No | N/A | — | **FAIL** |

### Compact connectivity chains

| Entry ID | Compact Function Chain | Direct Dependencies Valid | Arguments Valid | Cross-Module Valid | Completion Valid | Status |
|---|---|---|---|---|---|---|
| MT-001 | formatMonthlySheets → four formatter callbacks → current-sheet resolvers → applySystemStructure_ | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-002 | runMonthlyUpdate → runWithWorkflowBusyFlag_ → format/sync/change/master/disenrollment workflows → timing flush | No | Yes | No | No | **FAIL** |
| MT-003 | runMonthlyStart → runWithWorkflowBusyFlag_ → format/build/master/disenrollment workflows → timing flush | No | Yes | No | No | **FAIL** |
| MT-004 | hideMonthlyImportSheets → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-005 | archiveMonthlyImportSheets → direct helpers/services → completion or controlled notification | No | Yes | No | No | **FAIL** |
| MT-006 | hideMonthlyActiveSheets → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-007 | archiveMonthlyActiveSheets → direct helpers/services → completion or controlled notification | No | Yes | No | No | **FAIL** |
| MT-008 | buildAllTemplatesAndValidate → runWithWorkflowBusyFlag_ → createSystemTemplates → runDashboardQualityTemplateValidation_ → timing flush | No | Yes | No | No | **FAIL** |
| MT-009 | showReportTemplates → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-010 | hideReportTemplates → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-011 | hideSystemSheets_ → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-012 | showSystemSheets_ → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-013 | quickSystemSetup → createSystemTemplates → updateIndexSheet → timing flush | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-014 | buildSystemSheets → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-015 | setupSystemSheets → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-016 | quickBuildAllTemplates → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-017 | runDashboardQualityWorkflow → Sections C–H validators → quality writer → timing flush | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-018 | runDashboardQualityStartUp → runDashboardQualityConfigVerificationSections_ → six missing collectors | No | Yes | No | No | **FAIL** |
| MT-019 | runDashboardQualityValidateTemplates → runDashboardQualityTemplateValidation_ → quality writer | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-020 | runDashboardQualityWorkflow → Sections C–H validators → quality writer → timing flush | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-021 | formatBannerReport → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-022 | formatCarePlanDueReport → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-023 | formatUnlockedCarePlanReport → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-024 | formatRawData → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-025 | updateRefinedDataMonthlySync → source/load/merge helpers → write/update metadata | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-026 | buildRefinedDataFromScratch → runWithWorkflowBusyFlag_ → raw-data read/transform/write → timing | No | Yes | No | No | **FAIL** |
| MT-027 | createDisenrolledList → runWithWorkflowBusyFlag_ → source/filter/write helpers | No | Yes | No | No | **FAIL** |
| MT-028 | buildMonthlyChangeReport → runWithWorkflowBusyFlag_ → compare/write helpers | No | Yes | No | No | **FAIL** |
| MT-029 | createMasterList → runWithWorkflowBusyFlag_ → refined-data mapping/write helpers | No | Yes | No | No | **FAIL** |
| MT-030 | createSystemTemplates → nested template factories → applySystemStructure_ → updateIndexSheet | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-031 | clearDiagnosticsAndTimingLogs → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-032 | toggleFrameworkTiming → direct helpers/services → completion or controlled notification | No | Yes | No | No | **FAIL** |
| MT-033 | enforceGlobalSheetSortOrder → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-034 | buildSystemSheets → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-035 | setupSystemSheets → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-036 | rebuildFormatDashboardDefaults → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-037 | saveActiveLayoutToDashboardSettings → direct helpers/services → completion or controlled notification | No | Yes | No | No | **FAIL** |
| MT-038 | buildAllTemplatesAndValidate → runWithWorkflowBusyFlag_ → createSystemTemplates → runDashboardQualityTemplateValidation_ → timing flush | No | Yes | No | No | **FAIL** |
| MT-039 | updateIndexSheet [duplicate, equivalent bodies] → enumerate sheets → applySystemStructure_ | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-040 | restoreSheetFromActiveIndexRow → selected-row validation → show/navigate or controlled alert | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-041 | configureIndexRestoreWebAppUrl → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-042 | configureArchiveSpreadsheetId → direct helpers/services → completion or controlled notification | Yes (static) | Yes | Yes | Static only | **PASS WITH WARNING** |
| MT-043 | onOpen → register 42 menu commands → nine paths have confirmed dependency failures | No | Yes | Yes | No | **FAIL** |
| MT-044 | deployment GET → `doGet(e)` [missing from v2] | No | N/A | No | No | **FAIL** |

For passing rows, `PASS WITH WARNING` reflects static connectivity only. Google Sheets/Drive state, prompts, permissions, concurrency, deployment state, quotas, and data-dependent branches were not executed.

## Section 4 — Shared dependency register

| Dependency ID | Function | Type | Module | Used By | Exists | Compatibility | Status |
|---|---|---|---|---|---|---|---|
| DEP-001 | `runWithWorkflowBusyFlag_` | Lock/wrapper | `1_CONFIGv2.gs:214–235` | MT-002, MT-003, MT-008, MT-026–029, MT-038 | Yes | Normal path valid; contention path calls missing `notify_` | **FAIL** |
| DEP-002 | `notify_` | Notification helper | — | DEP-001 contention branch | No | Required call cannot resolve | **FAIL** |
| DEP-003 | six `collectFormatDashboard*VerificationRows_` functions | Validators | — | MT-018 | No | Required calls cannot resolve | **FAIL** |
| DEP-004 | `updateIndexSheet` | Index implementation | `1_CONFIGv2.gs:151`; `4_SYSTEM_INDEXv2.gs:12` | MT-013–015, MT-030, MT-035, MT-039 | Duplicate | Bodies are operationally equivalent except comments | **PASS WITH WARNING** |
| DEP-005 | `applySystemStructure_` | Shared formatter | `3_CORE_HELPERSv2.gs` | formatter/template/index paths | Yes | Static calls resolve | **PASS WITH WARNING** |
| DEP-006 | timing logger/flush helpers | Logging/timing | `5_SYSTEM_TEMPLATESv2.gs` | workflow and QA entries | Yes | Static calls resolve | **PASS WITH WARNING** |
| DEP-007 | `doGet(e)` | Web entry | — | baseline deployment; configured by MT-041 | No | Removed without supplied approval/deployment evidence | **FAIL** |

## Section 5 — Exception-only expansion

| Finding ID | Severity | Entry IDs | Function | Module/Line | Issue | Runtime Impact | Required Correction |
|---|---|---|---|---|---|---|---|
| EX-001 | High | MT-002, MT-003, MT-008, MT-026–029, MT-038 | `notify_` through `runWithWorkflowBusyFlag_` | call at `1_CONFIGv2.gs:219`; no declaration | Lock-contention failure branch references a missing helper. | A busy workbook throws `ReferenceError` instead of the intended controlled notification/error. | Restore `notify_` or replace it with an existing UI notifier and retest contention. |
| EX-002 | High | MT-003 and MT-002 | nested lock-wrapped workflows | `0_ORCHESTRATIONv2.gs:16–80` and child entry points | Monthly pipelines acquire the document lock and then invoke functions that acquire the same lock again. Re-entrant behavior is not established by source. | Pipelines may block/fail during nested `tryLock`, depending on Apps Script lock semantics. | Refactor to one top-level lock or add internal non-locking implementations; run concurrency tests. |
| EX-003 | Critical | MT-018, MT-043 | six configuration collectors | calls at `6_SYSTEM_QUALITYv2.gs:150–155`; no declarations | Dashboard startup has six unresolved direct calls. | The menu command terminates at the first collector with `ReferenceError`. | Restore all six collectors or replace the startup implementation with supported validators. |
| EX-004 | Medium | MT-039 and every index consumer | `updateIndexSheet` | `1_CONFIGv2.gs:151–210`; `4_SYSTEM_INDEXv2.gs:12–72` | Duplicate global definition. Bodies currently match except comments, but global ownership is ambiguous. | Future edits can silently diverge; Apps Script global resolution is unclear. | Retain one governed definition and update ownership documentation. |
| EX-005 | High | MT-044; MT-041 feature chain | `doGet(e)` | absent from all v2 modules | Baseline web entry is removed, although the menu still configures a restore web-app URL. | Published restore links cannot route through the v2 source. | Restore the approved web entry or remove/deprecate the configuration menu with approval. |
| EX-006 | Medium | MT-005, MT-007, MT-032, MT-037 | advertised implementations | `0_ORCHESTRATIONv2.gs:163–214` | Archive, timing-toggle, and save-layout callbacks currently display success toasts without substantive archive/toggle/persistence operations. | Users can receive false success messages while no requested state change occurs. | Implement the advertised operations or relabel/disable the commands until implemented. |

## Section 6 — Targeted orphan and duplicate register

| Function | Type | Module | Confirmed Consumers | Dynamic References Checked | Classification | Status |
|---|---|---|---|---|---|---|
| `updateIndexSheet` | Duplicate global | `1_CONFIGv2.gs:151`; `4_SYSTEM_INDEXv2.gs:12` | six menu/workflow paths | Yes | Active duplicate, equivalent today | **PASS WITH WARNING** |
| `doGet` | Baseline web entry | absent | baseline deployment/configuration | Deployment unavailable | Missing entry point | **FAIL** |
| `notify_` | Helper | absent | lock contention branch | Project-wide names checked | Missing helper | **FAIL** |
| six configuration collectors | Validators | absent | `runDashboardQualityConfigVerificationSections_` | Project-wide names checked | Missing validators | **FAIL** |

No zero-caller declaration is classified as confirmed orphaned without deployment, dynamic invocation, QA, and public-entry evidence.

## Section 7 — Baseline delta and count reconciliation

| Metric | Prior Quick Verification | Current v2 | Difference | Explanation | Reconciled |
|---|---:|---:|---:|---|---|
| Module files | 11 | 11 | 0 | v2 replaces the prior module population | Yes |
| Executable menu items | 42 | 42 | 0 | Same registration count; one label changed to “Dashboard Settings” | Yes |
| Unique menu callback names | 38 | 38 | 0 | Callback surface retained | Yes |
| Resolving menu paths | 17 | 42 | +25 | All callbacks now declared | Yes |
| Missing callback names | 24 | 0 | -24 | Callback declarations restored | Yes |
| Source trigger/web entries | 2 | 1 | -1 | `doGet(e)` removed; only `onOpen` remains | Yes |
| Top-level function declarations | 229 | 106 | -123 | v2 is substantially streamlined | Yes |
| Unique top-level function names | 217 | 105 | -112 | v2 is substantially streamlined | Yes |
| Duplicate global names | 12 | 1 | -11 | Only `updateIndexSheet` remains duplicated | Yes |
| Confirmed missing non-callback dependencies | 3 names | 7 names | +4 | `notify_` plus six quality collectors | Yes |
| Statically connected menu paths | 5 | 29 | +24 | Runtime/deployment warnings remain | Yes |
| Failed menu paths | 37 | 13 | -24 | Dependency failures remain | Yes |

## Section 9 — Final connectivity certification

| Population | Callback Valid | Wrapper Valid | Implementation Valid | Dependencies Valid | Complete Path | Final Status |
|---|---|---|---|---|---|---|
| 29 statically connected menu paths | Yes | Yes/N/A | Yes | Yes statically | Static only | **PASS WITH WARNING** |
| 8 lock-wrapper affected menu paths | Yes | No on contention path | Mixed | No | No | **FAIL** |
| 4 toast-only implementation menu paths | Yes | N/A | No substantive operation | No | No | **FAIL** |
| MT-018 Dashboard Quality Start Up | Yes | N/A | No | No | No | **FAIL** |
| MT-043 `onOpen` | Yes | N/A | Yes | Registers thirteen failed paths | No project-wide complete menu | **FAIL** |
| MT-044 baseline `doGet(e)` | No | N/A | No | No | No | **FAIL** |

# Overall certification: FAIL

The v2 rebuild resolves every menu callback and removes eleven of twelve duplicate global names, but it cannot receive PASS or PASS WITH WARNING while direct dependencies and a baseline web entry remain missing. The result is a confirmed static **FAIL**. Runtime-only behavior remains **NOT VERIFIED**.

## Required next action

Restore or replace `notify_`, restore the six Dashboard configuration collectors, reconcile nested locking, collapse `updateIndexSheet` to one owner, decide and document the `doGet(e)` deployment path, and implement or relabel toast-only commands. Then rerun this compact static verification and execute disposable-workbook concurrency, menu, and web-deployment smoke tests.
