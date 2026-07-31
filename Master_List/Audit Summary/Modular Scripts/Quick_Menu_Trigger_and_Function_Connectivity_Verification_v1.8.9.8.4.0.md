# Quick Menu, Trigger, and Function Connectivity Verification

**Verification status:** COMPLETE — exception-focused static review
**Overall certification:** **FAIL**
**Authoritative source snapshot:** `origin/main` commit `6548643ec8b9db77d808c64d7a4177d45d97df2c`
**Reason snapshot was used:** the active `work` branch has one unique local audit commit and is 14 commits behind `origin/main`; repository policy prohibits automatic merge/rebase. The current modules were read directly from the fetched `origin/main` tree without modifying production code.
**Scope:** eleven current `.gs` modules, the ten baseline cross-reference reports, and their combined baseline report. Passing paths are compact; only exceptions are expanded.

## Executive result

The rebuild improves callback resolution from **11/42** baseline menu paths to **17/42**, but connectivity still fails. **25 menu paths reference 24 absent callback names**, nine additional resolving menu paths encounter missing, duplicated, or placeholder downstream implementations, and only five menu paths have statically complete chains (with runtime warnings). Twelve duplicate global function names create Apps Script namespace ambiguity. `onOpen` exists but registers broken paths; `doGet(e)` is statically connected but deployment/runtime state is not verified.

## Section 1 — Baseline and source register

| ID | File or Report | Type | Version | Baseline/Current | Scope Used | Lines | SHA-256 | Status |
|---|---|---|---|---|---|---:|---|---|
| SRC-001 | `0_Orchestration.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 451 | `1a1a69babe51121b2f3eb5af34e30831dc92a77bb291e25bf3c5c974cafb938f` | Included |
| SRC-002 | `1_Config.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 220 | `0123861f4ff6fa6091129f39429c876615815550c7ebb9be8e9ad2c72cf85e6e` | Included |
| SRC-003 | `2_Dashboard_Loaders.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 555 | `cd22282ffd85c2c0f288ec109752e1c529d0a3ea2617b9ddae32972c15d308e9` | Included |
| SRC-004 | `3_Core_Helpers.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 1015 | `f48292e53cb939c703eb765de87152e4a024026623eb2396231bbbae85ac60dd` | Included |
| SRC-005 | `4_System_Index.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 424 | `21ca1b782d05d6e24f727a296b5f0b97453c60bd4c7a0a9f3f02976770b5ae16` | Included |
| SRC-006 | `5_System_Templates.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 233 | `fce638d51513f00a96b6e03e6f6748509b8b66219fbc8d274384e7b280bf49ad` | Included |
| SRC-007 | `6_System_Quality.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 231 | `9a93f07656e1b0d99572b05ae4e17fe361ec5d93de0c8fa7e0cb87e3ae45ef70` | Included |
| SRC-008 | `7_Workflow_DemoP.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 682 | `9950030e9298f1013cb88c3b6aa3b0294f4e6a529cc3c4e5b98cebc69fb1f54c` | Included |
| SRC-009 | `8_Workflow_MasterList.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 533 | `fbe34669aef8d9f44aef2d124eada2e41d757783efed4a277c65ae649a09aa95` | Included |
| SRC-010 | `9_Workflow_MonthlyChange.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 536 | `84ccd4ffecd957968f5e44e8a51f304df63af69af67eca1697edf5e0795af539` | Included |
| SRC-011 | `_10_Workflow_Disenrolled.gs` | Module | 1.8.9.8.4.0 project | Current (`origin/main`) | menu/trigger connectivity | 261 | `416e4fe6b8a8ea86a0c0e4a893cd91545d49f56970b342c7913d14bb039ee866` | Included |
| SRC-012 | `01_Source_Registration_and_Entry_Point_Discovery.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 183 | `07ecf5d070cb25f3035921466926ca4c0b74001c6d3b8b8462d5d77b8bcd79af` | Used |
| SRC-013 | `02_Menu_Function_Call_Graphs_Part_1.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 721 | `56b509c277cb72758318c7ddaa2b9cba1ea672fd89e4778bc317f069a8c15cfb` | Used |
| SRC-014 | `03_Menu_Function_Call_Graphs_Part_2.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 2522 | `d5f2a1ea00bcda8a9b109a9171b3b7f9dc7612f3ce35d812feaaa7acb479e91f` | Used |
| SRC-015 | `04_Trigger_Function_Call_Graphs.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 325 | `0fe9926c12566934bd0fb7f3caac6edbea7bd09396156bc76854a86b593c2a69` | Used |
| SRC-016 | `05_Reachable_Function_Dependency_Catalog.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 656 | `1eac82c09dc63432c65c3747b4faa9a9b976f1475c5433b3aa9096bb5ee3e988` | Used |
| SRC-017 | `06_Numbered_Menu_Execution_Traces.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 4874 | `1ce6259daa6e38435213ef5f925c3d510a273eb36aafb1ae5771da0c76bbd58f` | Used |
| SRC-018 | `07_Numbered_Trigger_Execution_Traces.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 343 | `522a9b032ab12eb77076e6517a9fa543e0d5f419bc79fb82501a79c8b88e41aa` | Used |
| SRC-019 | `08_Read_Write_Branch_Failure_and_Recovery_Review.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 544 | `fdf4133aff917af7ef6a83f275c07983858c3b39448ca9c98752520d3e5c3e11` | Used |
| SRC-020 | `09_Post_Upgrade_Integrity_and_Delta_Verification.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 53 | `c3955b72a38a001cbeb025882b0361b67e49ae98c8aff229d11857965b4d91b2` | Used |
| SRC-021 | `10_Final_Consolidated_Execution_Trace_Audit.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 7960 | `5cdd015db649d102c2a00cc7f688e0e20280a756ab625865d6eabdceece036e1` | Used |
| SRC-022 | `Master_List_Modular_Execution_Trace_Audit_v1.8.9.8.4.0.md` | Baseline audit | 1.8.9.8.4.0 | Baseline | indexes, totals, affected entries | 18279 | `f971f2d038dea1ed71512e83348685ad6fa5504636359f27c472288e1b919857` | Used |

No source was skipped. No file is byte-truncated. `0_Orchestration.gs` is newly present relative to the baseline source population. Several changed modules intentionally have new hashes; the delta findings below show that the rebuilt population remains incomplete and contains duplicate global declarations.

## Sections 2–3 — Menu and trigger inventory with compact connectivity

| ID | Menu/Trigger | Type | Registered Callback | Callback Exists | Wrapper | Implementation Evidence | Final Status |
|---|---|---|---|---|---|---|---|
| MT-001 | 📚 Format Monthly Sheets | Menu | `formatMonthlySheets` | No | N/A | — | **FAIL** |
| MT-002 | 🔁 Create Monthly Update | Menu | `runMonthlyUpdate` | No | N/A | — | **FAIL** |
| MT-003 | 🏁 Create Monthly Start | Menu | `runMonthlyStart` | No | N/A | — | **FAIL** |
| MT-004 | 🗂️ Hide Monthly Sub-Reports | Menu | `hideMonthlyImportSheets` | No | N/A | — | **FAIL** |
| MT-005 | 🗃️ Archive Monthly Sub-Reports | Menu | `archiveMonthlyImportSheets` | No | N/A | — | **FAIL** |
| MT-006 | 🗂️ Hide Monthly Active Sheets | Menu | `hideMonthlyActiveSheets` | No | N/A | — | **FAIL** |
| MT-007 | 🗃️ Archive Monthly Active Sheets | Menu | `archiveMonthlyActiveSheets` | No | N/A | — | **FAIL** |
| MT-008 | Build All Templates + Validate | Menu | `buildAllTemplatesAndValidate` | Yes | Yes/N/A | `3_Core_Helpers.gs:976` | **FAIL** |
| MT-009 | Show Templates | Menu | `showReportTemplates` | No | N/A | — | **FAIL** |
| MT-010 | Hide Templates | Menu | `hideReportTemplates` | No | N/A | — | **FAIL** |
| MT-011 | Hide System Sheets | Menu | `hideSystemSheets_` | No | N/A | — | **FAIL** |
| MT-012 | Show System Sheets | Menu | `showSystemSheets_` | No | N/A | — | **FAIL** |
| MT-013 | 🏗️ System Set up | Menu | `quickSystemSetup` | Yes | Yes/N/A | `0_Orchestration.gs:254` | **FAIL** |
| MT-014 | Build System Sheets | Menu | `buildSystemSheets` | Yes | Yes/N/A | `0_Orchestration.gs:160` | **FAIL** |
| MT-015 | Set up System Sheets | Menu | `setupSystemSheets` | Yes | Yes/N/A | `0_Orchestration.gs:185` | **FAIL** |
| MT-016 | 🖼️ Build Templates + Validate Templates | Menu | `quickBuildAllTemplates` | No | N/A | — | **FAIL** |
| MT-017 | ✅ Dashboard Quality Workflow | Menu | `runDashboardQualityWorkflow` | No | N/A | — | **FAIL** |
| MT-018 | Dashboard Quality Start up | Menu | `runDashboardQualityStartUp` | Yes | Yes/N/A | `3_Core_Helpers.gs:657` | **FAIL** |
| MT-019 | Dashboard Quality Validate Templates | Menu | `runDashboardQualityValidateTemplates` | No | N/A | — | **FAIL** |
| MT-020 | Dashboard Quality Workflow | Menu | `runDashboardQualityWorkflow` | No | N/A | — | **FAIL** |
| MT-021 | Banner | Menu | `formatBannerReport` | No | N/A | — | **FAIL** |
| MT-022 | CP Due Date | Menu | `formatCarePlanDueReport` | No | N/A | — | **FAIL** |
| MT-023 | Unlocked CP | Menu | `formatUnlockedCarePlanReport` | No | N/A | — | **FAIL** |
| MT-024 | Raw Data | Menu | `formatRawData` | No | N/A | — | **FAIL** |
| MT-025 | 🔄 Update Refined Data | Menu | `updateRefinedDataMonthlySync` | No | N/A | — | **FAIL** |
| MT-026 | 🛠️ Build Refined Data | Menu | `buildRefinedDataFromScratch` | Yes | Yes/N/A | `7_Workflow_DemoP.gs:11` | **FAIL** |
| MT-027 | ⛔ Create / Update Disenrolled List | Menu | `createDisenrolledList` | Yes | Yes/N/A | `_10_Workflow_Disenrolled.gs:11` | **FAIL** |
| MT-028 | 🗓️ Monthly Change Report | Menu | `buildMonthlyChangeReport` | Yes | Yes/N/A | `9_Workflow_MonthlyChange.gs:66` | **FAIL** |
| MT-029 | 💡 Create Master List | Menu | `createMasterList` | Yes | Yes/N/A | `8_Workflow_MasterList.gs:120` | **PASS WITH WARNING** |
| MT-030 | 🏗️ Rebuild System Templates | Menu | `createSystemTemplates` | Yes | Yes/N/A | `0_Orchestration.gs:238` | **FAIL** |
| MT-031 | 🪄 Clear Diagnostics & Timing | Menu | `clearDiagnosticsAndTimingLogs` | No | N/A | — | **FAIL** |
| MT-032 | ⏱️ Framework Timing on/off | Menu | `toggleFrameworkTiming` | No | N/A | — | **FAIL** |
| MT-033 | 🧭 Organize Tabs | Menu | `enforceGlobalSheetSortOrder` | No | N/A | — | **FAIL** |
| MT-034 | Build System Sheets | Menu | `buildSystemSheets` | Yes | Yes/N/A | `0_Orchestration.gs:160` | **FAIL** |
| MT-035 | 📜 Set up System Sheets | Menu | `setupSystemSheets` | Yes | Yes/N/A | `0_Orchestration.gs:185` | **FAIL** |
| MT-036 | 🎨 Format Dashboard | Menu | `rebuildFormatDashboardDefaults` | No | N/A | — | **FAIL** |
| MT-037 | 💾 Save Active Layout as Rebuild Default | Menu | `saveActiveLayoutToDashboardSettings` | No | N/A | — | **FAIL** |
| MT-038 | 🖼️ Build All Templates + Validate | Menu | `buildAllTemplatesAndValidate` | Yes | Yes/N/A | `3_Core_Helpers.gs:976` | **FAIL** |
| MT-039 | 📇 Build / Update Index | Menu | `updateIndexSheet` | Yes | Yes/N/A | `4_System_Index.gs:225` | **PASS WITH WARNING** |
| MT-040 | ↩️ Restore Selected Archive Row | Menu | `restoreSheetFromActiveIndexRow` | Yes | Yes/N/A | `4_System_Index.gs:280` | **PASS WITH WARNING** |
| MT-041 | 🌐 Configure Index Restore Web App URL | Menu | `configureIndexRestoreWebAppUrl` | Yes | Yes/N/A | `4_System_Index.gs:34` | **PASS WITH WARNING** |
| MT-042 | 🔗 Configure Archive Spreadsheet ID | Menu | `configureArchiveSpreadsheetId` | Yes | Yes/N/A | `4_System_Index.gs:15` | **PASS WITH WARNING** |
| MT-043 | Spreadsheet open | Simple trigger | `onOpen` | Yes | N/A | `1_Config.gs:8` | **FAIL** |
| MT-044 | Index restore web request | Web-app GET entry | `doGet(e)` | Yes | N/A | `4_System_Index.gs:388` | **PASS WITH WARNING** |

### Compact execution chains

| Entry ID | Compact Function Chain | Direct Dependencies Valid | Arguments Valid | Cross-Module Valid | Completion Valid | Status |
|---|---|---|---|---|---|---|
| MT-001 | formatMonthlySheets [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-002 | runMonthlyUpdate [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-003 | runMonthlyStart [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-004 | hideMonthlyImportSheets [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-005 | archiveMonthlyImportSheets [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-006 | hideMonthlyActiveSheets [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-007 | archiveMonthlyActiveSheets [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-008 | buildAllTemplatesAndValidate → notify_ → return true (stub; no build/validation) | No | Static only | Yes | No | **FAIL** |
| MT-009 | showReportTemplates [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-010 | hideReportTemplates [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-011 | hideSystemSheets_ [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-012 | showSystemSheets_ [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-013 | quickSystemSetup → runFrameworkTimed_ → ensureFormatDashboardShell_ / loadDashboardConfig_ / ensureGoldenMasterTemplate_ / buildFormattedDashboardSheet_ / ensureFrameworkTimingReportSheet_ [missing] / ensureDashboardQualityReportSheet_ [missing] / runDashboardQualityStartUp / buildAllTemplatesAndValidate [stub] / setupSystemSheets | No | Static only | Yes | No | **FAIL** |
| MT-014 | buildSystemSheets → runFrameworkTimed_ → loadDashboardConfig_ → ensureGoldenMasterTemplate_ → ensureFrameworkTimingReportSheet_ [missing] / ensureDashboardQualityReportSheet_ [missing] / updateIndexSheet → notify_ | No | Static only | Yes | No | **FAIL** |
| MT-015 | setupSystemSheets → runFrameworkTimed_ → loadDashboardConfig_ → getThemeColorsFromBase_ [duplicate] / placement & visibility helpers / forceBaseTemplateHidden_ / syncBaseTemplateWithDashboard → notify_ | No | Static only | Yes | No | **FAIL** |
| MT-016 | quickBuildAllTemplates [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-017 | runDashboardQualityWorkflow [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-018 | runDashboardQualityStartUp → runDashboardQualityConfigVerificationSections_ → duplicated Raw Data and Demo P validation globals | No | Static only | Yes | No | **FAIL** |
| MT-019 | runDashboardQualityValidateTemplates [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-020 | runDashboardQualityWorkflow [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-021 | formatBannerReport [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-022 | formatCarePlanDueReport [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-023 | formatUnlockedCarePlanReport [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-024 | formatRawData [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-025 | updateRefinedDataMonthlySync [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-026 | buildRefinedDataFromScratch → promptForLockedYearReportMonth_ → runFrameworkTimed_ → formatReportDateLabel_ [missing] → build/format/index helpers | No | Static only | Yes | No | **FAIL** |
| MT-027 | createDisenrolledList → promptForLockedYearReportMonth_ → runFrameworkTimed_ → formatReportDateLabel_ [missing] → createDisenrolledListForMonth_ | No | Static only | Yes | No | **FAIL** |
| MT-028 | buildMonthlyChangeReport → promptForLockedYearReportMonth_ → runFrameworkTimed_ → formatReportDateLabel_ [missing] → buildMonthlyChangeReportForMonth_ | No | Static only | Yes | No | **FAIL** |
| MT-029 | createMasterList → promptForLockedYearReportMonth_ → createMasterListForMonth_ → direct workflow helpers | Yes (static) | Static only | Yes | Static only | **PASS WITH WARNING** |
| MT-030 | createSystemTemplates → notify_ → buildAllTemplatesAndValidate [stub] | No | Static only | Yes | No | **FAIL** |
| MT-031 | clearDiagnosticsAndTimingLogs [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-032 | toggleFrameworkTiming [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-033 | enforceGlobalSheetSortOrder [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-034 | buildSystemSheets → runFrameworkTimed_ → loadDashboardConfig_ → ensureGoldenMasterTemplate_ → ensureFrameworkTimingReportSheet_ [missing] / ensureDashboardQualityReportSheet_ [missing] / updateIndexSheet → notify_ | No | Static only | Yes | No | **FAIL** |
| MT-035 | setupSystemSheets → runFrameworkTimed_ → loadDashboardConfig_ → getThemeColorsFromBase_ [duplicate] / placement & visibility helpers / forceBaseTemplateHidden_ / syncBaseTemplateWithDashboard → notify_ | No | Static only | Yes | No | **FAIL** |
| MT-036 | rebuildFormatDashboardDefaults [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-037 | saveActiveLayoutToDashboardSettings [missing callback: chain stops at registration] | No | N/A | No | No | **FAIL** |
| MT-038 | buildAllTemplatesAndValidate → notify_ → return true (stub; no build/validation) | No | Static only | Yes | No | **FAIL** |
| MT-039 | updateIndexSheet → index shell/local/archive helpers → forceSheetRowCount_ | Yes (static) | Static only | Yes | Static only | **PASS WITH WARNING** |
| MT-040 | restoreSheetFromActiveIndexRow → restoreSheetFromArchiveWorkbook | Yes (static) | Static only | Yes | Static only | **PASS WITH WARNING** |
| MT-041 | configureIndexRestoreWebAppUrl → property/UI helpers → updateIndexSheet | Yes (static) | Static only | Yes | Static only | **PASS WITH WARNING** |
| MT-042 | configureArchiveSpreadsheetId → archive-property/UI helpers → notify_ | Yes (static) | Static only | Yes | Static only | **PASS WITH WARNING** |
| MT-043 | onOpen → build Master List menus → 42 registrations (25 broken callback paths) | No | N/A | Yes | No (registered paths broken) | **FAIL** |
| MT-044 | doGet(e) → lock → restoreSheetFromArchiveWorkbook or restoreSheetFromActiveIndexRow → HtmlOutput / controlled error | Yes (static) | Static only | Yes | Static only | **PASS WITH WARNING** |

`PASS WITH WARNING` means the named static chain resolves, but live Sheets, Drive, deployment, permissions, prompts, locks, and data-dependent branches were not executed. It is not a release-readiness PASS.

## Section 4 — Shared dependency register

| Dependency ID | Function | Type | Module | Used By Entry IDs | Exists | Compatibility/Status |
|---|---|---|---|---|---|---|
| DEP-001 | `runFrameworkTimed_` | Timing wrapper | 3_Core_Helpers.gs | MT-013–015, MT-026–028 | Yes | **Pass statically** |
| DEP-002 | `notify_` | Logger/UI notifier | 3_Core_Helpers.gs | MT-008, MT-013–015, MT-030, MT-042 | Yes | **Pass statically** |
| DEP-003 | `markFrameworkStep_` | Timing | 3_Core_Helpers.gs | MT-013 and workflows | Duplicate global | **FAIL: ambiguous definitions** |
| DEP-004 | `getThemeColorsFromBase_` | Theme helper | 2_Dashboard_Loaders.gs; 3_Core_Helpers.gs | MT-015 and shared formatting | Duplicate global | **FAIL: ambiguous implementations** |
| DEP-005 | `ensureFrameworkTimingReportSheet_` | System-sheet helper | — | MT-013, MT-014, MT-034 | No | **FAIL: missing** |
| DEP-006 | `ensureDashboardQualityReportSheet_` | System-sheet helper | — | MT-013, MT-014, MT-034 | No | **FAIL: missing** |
| DEP-007 | `formatReportDateLabel_` | Date/label helper | — | MT-026–028 | No | **FAIL: missing** |
| DEP-008 | `buildAllTemplatesAndValidate` | Primary implementation | 3_Core_Helpers.gs | MT-008, MT-013, MT-030, MT-038 | Yes | **FAIL: placeholder behavior only** |
| DEP-009 | `updateIndexSheet` | Implementation | 4_System_Index.gs | MT-014, MT-034, MT-039, MT-041 | Yes | **Pass statically** |
| DEP-010 | `restoreSheetFromArchiveWorkbook` | Implementation | 4_System_Index.gs | MT-040, MT-044 | Yes | **Pass statically** |

## Section 5 — Exception-only expansion

| Finding ID | Severity | Entry IDs | First Failing/Uncertain Function | Module/Line | Issue | Runtime Impact | Required Correction |
|---|---|---|---|---|---|---|---|
| EX-001 | Critical | 25 menu paths listed as missing above; MT-043 | 24 absent callback names | `1_Config.gs:12–67` vs complete global declaration inventory | Registrations point to undeclared callbacks. | Selecting those commands cannot start; `onOpen` installs a materially broken menu. | Restore the callback module(s) or correct/remove registrations, then rerun this verification. |
| EX-002 | Critical | MT-008, MT-013, MT-030, MT-038 | `buildAllTemplatesAndValidate` | `3_Core_Helpers.gs:976–979` | Implementation only notifies and returns `true`; it performs no template build or validation. | Commands report success without doing their advertised work. | Restore the production implementation and verification result contract. |
| EX-003 | Critical | MT-013, MT-014, MT-034 | `ensureFrameworkTimingReportSheet_`; `ensureDashboardQualityReportSheet_` | calls in `0_Orchestration.gs:169,172,281–282`; no declarations | Direct dependencies are missing. | System setup terminates with `ReferenceError`. | Restore both helpers or route to approved existing implementations. |
| EX-004 | High | MT-026–028 | `formatReportDateLabel_` | `7_Workflow_DemoP.gs:15,411`; `9_Workflow_MonthlyChange.gs:69`; `_10_Workflow_Disenrolled.gs:15`; no declaration | Direct helper is missing. | Three data workflows terminate after prompting, before primary implementation. | Restore helper with compatible date input/output contract. |
| EX-005 | High | MT-013, MT-015, MT-018 and shared downstream paths | twelve duplicate global names | exact locations in Section 6 | Duplicate definitions include incompatible arities/bodies. Apps Script exposes one project-global namespace. | Effective implementation can be ambiguous or overwrite another declaration. | Reconcile each pair to one approved global definition; update consumers and rerun. |
| EX-006 | Medium | MT-044 | deployed web app | container/deployment | Source entry resolves, but deployment version, URL, owner, permissions, and live lock behavior are unavailable. | Static success may not match deployed behavior. | Export deployment/trigger inventory and test a disposable restore target. |

## Section 6 — Targeted orphan and duplicate register

| Function | Type | Module | Confirmed Callers | Dynamic References Checked | Classification | Status |
|---|---|---|---|---|---|---|
| `ensureFormatDashboardShell_` | Helper/validator/global | `0_Orchestration.gs:318; 3_Core_Helpers.gs:678` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `openArchiveSpreadsheetOnce_` | Helper/validator/global | `1_Config.gs:180; 3_Core_Helpers.gs:531` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `getThemeColorsFromBase_` | Helper/validator/global | `2_Dashboard_Loaders.gs:400; 3_Core_Helpers.gs:945` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `recalculateDashboardHexCodes_` | Helper/validator/global | `2_Dashboard_Loaders.gs:467; 3_Core_Helpers.gs:650` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `padRowToWidth_` | Helper/validator/global | `3_Core_Helpers.gs:83,122` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `getHeaders_` | Helper/validator/global | `3_Core_Helpers.gs:215,984` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `startFrameworkTiming_` | Helper/validator/global | `3_Core_Helpers.gs:298,874` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `markFrameworkStep_` | Helper/validator/global | `3_Core_Helpers.gs:325,885` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `writeRuntimeTimingReport_` | Helper/validator/global | `3_Core_Helpers.gs:364,897` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `insertGovernedOutputSheet_` | Helper/validator/global | `3_Core_Helpers.gs:391,828` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `runDashboardQualityRawDataValidation_` | Helper/validator/global | `5_System_Templates.gs:5; 6_System_Quality.gs:5` | project call sites | Yes | Duplicate global definition | **FAIL** |
| `runDashboardQualityDemoPValidation_` | Helper/validator/global | `5_System_Templates.gs:129; 6_System_Quality.gs:129` | project call sites | Yes | Duplicate global definition | **FAIL** |
| 24 missing callback names | Registered callbacks | `1_Config.gs:12–67` | 25 menu registrations | Menu strings checked project-wide | Missing, not orphaned | **FAIL** |
| `doGet` | Web entry | `4_System_Index.gs:388` | deployment routing | Deployment unavailable | Active source entry; deployed state NOT VERIFIED | **PASS WITH WARNING** |

No function is classified as a confirmed orphan solely from zero static callers. External Apps Script invocation and unavailable deployment state prevent that conclusion.

## Section 7 — Baseline delta and count reconciliation

| Metric | Completed Audit Total | Current Verified Total | Difference | Explanation | Reconciled |
|---|---:|---:|---:|---|---|
| Module files | 10 | 11 | +1 | Added `0_Orchestration.gs` | Yes |
| Executable menu items | 42 | 42 | 0 | Registration list unchanged | Yes |
| Unique callback names | 38 | 38 | 0 | Names unchanged | Yes |
| Resolving menu paths | 11 | 17 | +6 | Seven paths gained declarations; `quickBuildAllTemplates` regressed to missing | Yes |
| Missing menu paths | 31 | 25 | -6 | Net improvement, still execution-blocking | Yes |
| Unique missing callback names | 28 | 24 | -4 | Five names restored; `quickBuildAllTemplates` lost | Yes |
| Source runtime entries | 2 | 2 | 0 | `onOpen`, `doGet` | Yes |
| Global function declarations | 212 | 229 | +17 | Rebuild additions/removals plus orchestration | Yes |
| Unique global function names | 212 | 217 | +5 | Twelve names now have duplicate declarations | Yes |
| Duplicate global names | 0 | 12 | +12 | Listed in Section 6 | Yes |
| Statically complete menu paths | baseline not certified against rebuild | 5 | — | MT-029 and MT-039–042; runtime remains unverified | Yes |

## Section 9 — Final connectivity certification

| Entry population | Callback Valid | Wrapper Valid | Implementation Valid | Dependencies Valid | Complete Path | Final Status |
|---|---|---|---|---|---|---|
| 25 missing-callback menu paths | No | N/A | No | No | No | **FAIL** |
| 9 resolving but broken/ambiguous menu paths | Yes | Mixed | No | No | No | **FAIL** |
| 5 statically complete menu paths | Yes | Yes/N/A | Yes | Yes statically | Static only | **PASS WITH WARNING** |
| MT-043 `onOpen` | Yes | N/A | Yes | Registers broken callbacks | No | **FAIL** |
| MT-044 `doGet(e)` | Yes | N/A | Yes | Yes statically | Static only | **PASS WITH WARNING** |

# Overall certification: FAIL

This result is a **confirmed static FAIL**, not merely NOT VERIFIED: missing registered callbacks, missing direct helpers, a placeholder template implementation, and duplicate global declarations can prevent or misdirect execution. Runtime-only behavior remains NOT VERIFIED in addition to those confirmed defects.

## Required next action

Restore/reconcile the missing callback and helper population, replace the template stub with the approved implementation, collapse all duplicate globals to one compatible definition each, and rerun this compact verification. After static PASS, execute menu and deployment smoke tests on a disposable workbook copy.
