# Script 07 — Numbered Trigger Execution Traces

**Status:** COMPLETE (static-source audit)
**Governing prompt:** `Master_List/Prompts/Menu_Trigger_and_Function_Execution_Trace_Review_Prompt (1).docx.md`, Sections 1–12 and modular protocol
**Production source:** the ten `.gs` files in `Master_List/Current Production Script/Modules`
**Declared source version:** `1.8.9.8.4.0` (`MASTER_LIST_MERGE_ML_VERSION`)
**Source fingerprint (SHA-256, filename-sorted concatenation):** `5ee0461c0e722ac55304df8187ff10998b109eda2167306f63cdd4f54af559ab`
**Method:** exhaustive static parsing of named declarations, menu callback strings, and named call occurrences. Google service dispatch, deployed trigger state, workbook contents, permissions, quotas, and runtime-selected data paths are **NOT VERIFIED** without the live Apps Script container.

## Trigger traces

## TRACE-TRG-001 — onOpen — simple open trigger

1. Enter `onOpen` (1_Config.gs:8); parameters: `none`.
2. Return/terminate `onOpen` according to its source branches; service exceptions propagate unless caught locally.

## TRACE-TRG-002 — doGet — web-app GET entry

1. Enter `doGet` (4_System_Index.gs:388); parameters: `e`.
2. ↳ At `4_System_Index.gs:392`, invoke `escapeHtml_` (lexically unconditional at this line).
3. ↳ ↳ Enter `escapeHtml_` (4_System_Index.gs:378); parameters: `text`.
4. ↳ ↳ Return/terminate `escapeHtml_` according to its source branches; service exceptions propagate unless caught locally.
5. ↳ At `4_System_Index.gs:404`, invoke `restoreSheetFromArchiveWorkbook` (branch/loop-dependent).
6. ↳ ↳ Enter `restoreSheetFromArchiveWorkbook` (4_System_Index.gs:329); parameters: `targetSheetName`.
7. ↳ ↳ ↳ At `4_System_Index.gs:336`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
8. ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
9. ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
10. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getDocumentPropertiesCached_` (1_Config.gs:170); parameters: `none`.
11. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:171`, invoke `getRuntimeCache_` (lexically unconditional at this line).
12. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
13. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
14. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getDocumentPropertiesCached_` according to its source branches; service exceptions propagate unless caught locally.
15. ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
16. ↳ ↳ ↳ At `4_System_Index.gs:348`, invoke `updateIndexSheet` (lexically unconditional at this line).
17. ↳ ↳ ↳ ↳ Enter `updateIndexSheet` (4_System_Index.gs:225); parameters: `options`.
18. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:243`, invoke `hasIndexSheetShell_` (branch/loop-dependent).
19. ↳ ↳ ↳ ↳ ↳ ↳ Enter `hasIndexSheetShell_` (4_System_Index.gs:54); parameters: `sheet`.
20. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `hasIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
21. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:244`, invoke `buildIndexSheetShell_` (lexically unconditional at this line).
22. ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexSheetShell_` (4_System_Index.gs:65); parameters: `sheet`.
23. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:66`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
24. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
25. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
26. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getRuntimeCache_` (1_Config.gs:155); parameters: `none`.
27. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getRuntimeCache_` according to its source branches; service exceptions propagate unless caught locally.
28. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
29. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadGlobalSettings_` (2_Dashboard_Loaders.gs:97); parameters: `sheet`.
30. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:98`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
31. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
32. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
33. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:110`, invoke `numberOrDefault_` (branch/loop-dependent).
34. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
35. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
36. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:111`, invoke `numberOrDefault_` (branch/loop-dependent).
37. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
38. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
39. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:112`, invoke `numberOrDefault_` (branch/loop-dependent).
40. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
41. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
42. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:113`, invoke `numberOrDefault_` (branch/loop-dependent).
43. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
44. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
45. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:114`, invoke `numberOrDefault_` (branch/loop-dependent).
46. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
47. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
48. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:117`, invoke `numberOrDefault_` (branch/loop-dependent).
49. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
50. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
51. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:118`, invoke `numberOrDefault_` (branch/loop-dependent).
52. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
53. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
54. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:119`, invoke `numberOrDefault_` (branch/loop-dependent).
55. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
56. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
57. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:120`, invoke `numberOrDefault_` (branch/loop-dependent).
58. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
59. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
60. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:121`, invoke `numberOrDefault_` (branch/loop-dependent).
61. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
62. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
63. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:122`, invoke `numberOrDefault_` (branch/loop-dependent).
64. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
65. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
66. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadGlobalSettings_` according to its source branches; service exceptions propagate unless caught locally.
67. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
68. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTitleRows_` (2_Dashboard_Loaders.gs:131); parameters: `sheet`.
69. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:132`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
70. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
71. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
72. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:136`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
73. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
74. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
75. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeKey_` (3_Core_Helpers.gs:31); parameters: `value`.
76. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `3_Core_Helpers.gs:32`, invoke `normalizeText_` (lexically unconditional at this line).
77. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeText_` (3_Core_Helpers.gs:27); parameters: `value`.
78. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeText_` according to its source branches; service exceptions propagate unless caught locally.
79. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeKey_` according to its source branches; service exceptions propagate unless caught locally.
80. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
81. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:137`, invoke `numberOrDefault_` (lexically unconditional at this line).
82. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
83. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
84. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:140`, invoke `parseTitleRowConfigRow_` (lexically unconditional at this line).
85. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseTitleRowConfigRow_` (2_Dashboard_Loaders.gs:146); parameters: `row, globals, base`.
86. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:149`, invoke `numberOrDefault_` (lexically unconditional at this line).
87. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
88. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
89. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:156`, invoke `normalizeTitleTargetCell_` (lexically unconditional at this line).
90. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeTitleTargetCell_` (2_Dashboard_Loaders.gs:166); parameters: `value, rowNumber`.
91. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeTitleTargetCell_` according to its source branches; service exceptions propagate unless caught locally.
92. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:157`, invoke `numberOrDefault_` (lexically unconditional at this line).
93. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
94. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
95. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:158`, invoke `numberOrDefault_` (lexically unconditional at this line).
96. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
97. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
98. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseTitleRowConfigRow_` according to its source branches; service exceptions propagate unless caught locally.
99. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTitleRows_` according to its source branches; service exceptions propagate unless caught locally.
100. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
101. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetDefinitions_` (2_Dashboard_Loaders.gs:175); parameters: `sheet`.
102. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:176`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
103. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
104. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
105. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:178`, invoke `isBlankCell_` (lexically unconditional at this line).
106. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
107. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
108. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:181`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
109. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
110. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
111. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
112. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
113. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:185`, invoke `normalizeHex_` (lexically unconditional at this line).
114. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
115. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
116. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:186`, invoke `parseBoolean_` (lexically unconditional at this line).
117. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
118. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
119. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:188`, invoke `numberOrDefault_` (lexically unconditional at this line).
120. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
121. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
122. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:189`, invoke `numberOrDefault_` (branch/loop-dependent).
123. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
124. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
125. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
126. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
127. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
128. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:191`, invoke `numberOrDefault_` (lexically unconditional at this line).
129. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
130. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:192`, invoke `numberOrDefault_` (lexically unconditional at this line).
131. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
132. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
133. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
134. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
135. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetBehaviors_` (2_Dashboard_Loaders.gs:200); parameters: `sheet`.
136. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:201`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
137. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
138. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
139. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:205`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
140. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
141. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
142. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
143. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
144. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:208`, invoke `parseBoolean_` (lexically unconditional at this line).
145. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
146. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
147. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:209`, invoke `parseBoolean_` (lexically unconditional at this line).
148. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
149. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
150. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:210`, invoke `parseBoolean_` (lexically unconditional at this line).
151. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
152. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
153. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:211`, invoke `parseBoolean_` (lexically unconditional at this line).
154. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
155. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
156. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:212`, invoke `parseBoolean_` (lexically unconditional at this line).
157. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
158. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
159. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetBehaviors_` according to its source branches; service exceptions propagate unless caught locally.
160. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
161. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSystemSurfaces_` (2_Dashboard_Loaders.gs:223); parameters: `sheet`.
162. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:224`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
163. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
164. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
165. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:233`, invoke `numberOrDefault_` (lexically unconditional at this line).
166. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
167. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
168. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:234`, invoke `parseBoolean_` (lexically unconditional at this line).
169. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
170. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
171. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:235`, invoke `parseBoolean_` (lexically unconditional at this line).
172. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
173. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
174. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:236`, invoke `parseBoolean_` (lexically unconditional at this line).
175. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
176. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
177. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:237`, invoke `parseBoolean_` (lexically unconditional at this line).
178. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
179. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
180. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:238`, invoke `parseBoolean_` (lexically unconditional at this line).
181. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
182. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
183. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:240`, invoke `normalizeHex_` (lexically unconditional at this line).
184. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHex_` (2_Dashboard_Loaders.gs:395); parameters: `color`.
185. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHex_` according to its source branches; service exceptions propagate unless caught locally.
186. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSystemSurfaces_` according to its source branches; service exceptions propagate unless caught locally.
187. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
188. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadTabOrganization_` (2_Dashboard_Loaders.gs:250); parameters: `sheet`.
189. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:251`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
190. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
191. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
192. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:260`, invoke `numberOrDefault_` (lexically unconditional at this line).
193. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
194. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
195. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadTabOrganization_` according to its source branches; service exceptions propagate unless caught locally.
196. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
197. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadColumnDefinitions_` (2_Dashboard_Loaders.gs:276); parameters: `sheet`.
198. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:277`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
199. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
200. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
201. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:281`, invoke `normalizeHeader_` (lexically unconditional at this line).
202. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
203. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
204. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `isBlankCell_` (lexically unconditional at this line).
205. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
206. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
207. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:285`, invoke `numberOrDefault_` (branch/loop-dependent).
208. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
209. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
210. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `isBlankCell_` (lexically unconditional at this line).
211. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `isBlankCell_` (3_Core_Helpers.gs:73); parameters: `value`.
212. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `isBlankCell_` according to its source branches; service exceptions propagate unless caught locally.
213. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:286`, invoke `numberOrDefault_` (branch/loop-dependent).
214. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
215. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
216. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:287`, invoke `parseBoolean_` (lexically unconditional at this line).
217. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
218. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
219. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:288`, invoke `parseBoolean_` (lexically unconditional at this line).
220. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `parseBoolean_` (3_Core_Helpers.gs:62); parameters: `value`.
221. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `parseBoolean_` according to its source branches; service exceptions propagate unless caught locally.
222. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadColumnDefinitions_` according to its source branches; service exceptions propagate unless caught locally.
223. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
224. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadSheetHeaders_` (2_Dashboard_Loaders.gs:302); parameters: `sheet`.
225. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:303`, invoke `readDashboardSectionRows_` (lexically unconditional at this line).
226. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `readDashboardSectionRows_` (2_Dashboard_Loaders.gs:53); parameters: `sheet, sectionMarker`.
227. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `readDashboardSectionRows_` according to its source branches; service exceptions propagate unless caught locally.
228. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:307`, invoke `normalizeDashboardSheetTypeKey_` (lexically unconditional at this line).
229. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeDashboardSheetTypeKey_` (2_Dashboard_Loaders.gs:79); parameters: `sheetType`.
230. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:80`, invoke `normalizeKey_` (lexically unconditional at this line).
231. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
232. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeDashboardSheetTypeKey_` according to its source branches; service exceptions propagate unless caught locally.
233. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:308`, invoke `numberOrDefault_` (lexically unconditional at this line).
234. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `numberOrDefault_` (3_Core_Helpers.gs:68); parameters: `value, fallback`.
235. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `numberOrDefault_` according to its source branches; service exceptions propagate unless caught locally.
236. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:309`, invoke `normalizeHeader_` (lexically unconditional at this line).
237. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `normalizeHeader_` (3_Core_Helpers.gs:8); parameters: `value`.
238. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `normalizeHeader_` according to its source branches; service exceptions propagate unless caught locally.
239. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadSheetHeaders_` according to its source branches; service exceptions propagate unless caught locally.
240. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
241. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:67`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
242. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
243. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
244. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:68`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
245. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
246. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
247. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
248. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
249. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexSheetShell_` according to its source branches; service exceptions propagate unless caught locally.
250. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:247`, invoke `getSectionEThemeForSheet_` (lexically unconditional at this line).
251. ↳ ↳ ↳ ↳ ↳ ↳ Enter `getSectionEThemeForSheet_` (2_Dashboard_Loaders.gs:437); parameters: `targetSheetName`.
252. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getSectionEThemeForSheet_` according to its source branches; service exceptions propagate unless caught locally.
253. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:250`, invoke `updateIndexLocalWorkspace_` (branch/loop-dependent).
254. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexLocalWorkspace_` (4_System_Index.gs:111); parameters: `sheet, theme`.
255. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:117`, invoke `localSheetRow_` (lexically unconditional at this line).
256. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
257. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
258. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:130`, invoke `getTabOrganizationProfilesForSort_` (lexically unconditional at this line).
259. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getTabOrganizationProfilesForSort_` (2_Dashboard_Loaders.gs:268); parameters: `none`.
260. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:269`, invoke `loadDashboardConfig_` (lexically unconditional at this line).
261. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `loadDashboardConfig_` (2_Dashboard_Loaders.gs:22); parameters: `forceRefresh`.
262. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:23`, invoke `getRuntimeCache_` (lexically unconditional at this line).
263. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
264. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:31`, invoke `loadGlobalSettings_` (lexically unconditional at this line).
265. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
266. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:32`, invoke `loadTitleRows_` (lexically unconditional at this line).
267. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
268. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:33`, invoke `loadSheetDefinitions_` (lexically unconditional at this line).
269. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
270. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:34`, invoke `loadSheetBehaviors_` (lexically unconditional at this line).
271. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
272. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:35`, invoke `loadSystemSurfaces_` (lexically unconditional at this line).
273. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
274. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:36`, invoke `loadTabOrganization_` (lexically unconditional at this line).
275. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
276. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:37`, invoke `loadColumnDefinitions_` (lexically unconditional at this line).
277. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
278. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `2_Dashboard_Loaders.gs:38`, invoke `loadSheetHeaders_` (lexically unconditional at this line).
279. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
280. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `loadDashboardConfig_` according to its source branches; service exceptions propagate unless caught locally.
281. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getTabOrganizationProfilesForSort_` according to its source branches; service exceptions propagate unless caught locally.
282. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:157`, invoke `localSheetRow_` (lexically unconditional at this line).
283. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `localSheetRow_` (4_System_Index.gs:117); parameters: `sheetName`.
284. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `localSheetRow_` according to its source branches; service exceptions propagate unless caught locally.
285. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexLocalWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
286. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:251`, invoke `updateIndexArchiveWorkspace_` (branch/loop-dependent).
287. ↳ ↳ ↳ ↳ ↳ ↳ Enter `updateIndexArchiveWorkspace_` (4_System_Index.gs:185); parameters: `sheet, theme, preOpenedArchiveSs`.
288. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:187`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
289. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getArchiveSpreadsheetId_` (1_Config.gs:176); parameters: `none`.
290. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `1_Config.gs:177`, invoke `getDocumentPropertiesCached_` (lexically unconditional at this line).
291. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
292. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getArchiveSpreadsheetId_` according to its source branches; service exceptions propagate unless caught locally.
293. ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:201`, invoke `buildIndexRestoreHyperlinkFormula_` (lexically unconditional at this line).
294. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `buildIndexRestoreHyperlinkFormula_` (4_System_Index.gs:356); parameters: `targetSheetName, actionType`.
295. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:357`, invoke `getIndexRestoreWebAppUrl_` (lexically unconditional at this line).
296. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Enter `getIndexRestoreWebAppUrl_` (4_System_Index.gs:364); parameters: `none`.
297. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `getIndexRestoreWebAppUrl_` according to its source branches; service exceptions propagate unless caught locally.
298. ↳ ↳ ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `buildIndexRestoreHyperlinkFormula_` according to its source branches; service exceptions propagate unless caught locally.
299. ↳ ↳ ↳ ↳ ↳ ↳ Return/terminate `updateIndexArchiveWorkspace_` according to its source branches; service exceptions propagate unless caught locally.
300. ↳ ↳ ↳ ↳ Return/terminate `updateIndexSheet` according to its source branches; service exceptions propagate unless caught locally.
301. ↳ ↳ Return/terminate `restoreSheetFromArchiveWorkbook` according to its source branches; service exceptions propagate unless caught locally.
302. ↳ At `4_System_Index.gs:405`, invoke `restoreSheetFromActiveIndexRow` (lexically unconditional at this line).
303. ↳ ↳ Enter `restoreSheetFromActiveIndexRow` (4_System_Index.gs:280); parameters: `optionalTargetSheetName`.
304. ↳ ↳ ↳ At `4_System_Index.gs:323`, invoke `restoreSheetFromArchiveWorkbook` (lexically unconditional at this line).
305. ↳ ↳ ↳ ↳ Enter `restoreSheetFromArchiveWorkbook` (4_System_Index.gs:329); parameters: `targetSheetName`.
306. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:336`, invoke `getArchiveSpreadsheetId_` (lexically unconditional at this line).
307. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
308. ↳ ↳ ↳ ↳ ↳ At `4_System_Index.gs:348`, invoke `updateIndexSheet` (lexically unconditional at this line).
309. ↳ ↳ ↳ ↳ ↳ ↳ Repeated call occurrence cross-references the already expanded function path.
310. ↳ ↳ ↳ ↳ Return/terminate `restoreSheetFromArchiveWorkbook` according to its source branches; service exceptions propagate unless caught locally.
311. ↳ ↳ Return/terminate `restoreSheetFromActiveIndexRow` according to its source branches; service exceptions propagate unless caught locally.
312. ↳ At `4_System_Index.gs:418`, invoke `escapeHtml_` (lexically unconditional at this line).
313. ↳ ↳ Enter `escapeHtml_` (4_System_Index.gs:378); parameters: `text`.
314. ↳ ↳ Return/terminate `escapeHtml_` according to its source branches; service exceptions propagate unless caught locally.
315. Return/terminate `doGet` according to its source branches; service exceptions propagate unless caught locally.


## Trigger branch-path and early-exit register

The complete stable branch register is in Script 06 and consolidated in Script 10. Trigger-reachable branches are represented in these traces; runtime-selected paths and deployment activation are NOT VERIFIED.

## Reconciliation

- Trigger entries: **2**
- Trigger traces: **2**
