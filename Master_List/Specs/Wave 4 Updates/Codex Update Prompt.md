# **Codex Update Prompt**

Here is a production-ready instruction prompt designed to direct Codex (or your AI coding agent) to review all specification files in the designated directory and begin executing the refactoring steps according to `Update Guidelines.md`.

### **📜 Codex Master Prompt: Wave 4 Implementation & Codebase Refactoring**

```
TASK INSTRUCTION:
You are instructed to review all specification files located in the `Master_List/Specs/Wave 4 Updates` directory and begin refactoring the Google Apps Script codebase following the strict 6-phase sequence outlined in `Update Guidelines.md`.

SPECIFICATION FILE INVENTORY:
Read and reference the following specification files within `Master_List/Specs/Wave 4 Updates`:
1.  `Update Guidelines.md` (Master Roadmap & Execution Sequence)
2.  `Slow Process Updates .md` (Connection Pooling & Memory Buffers)
3.  `Menu Updates.md` / `Menu Updates_2.md` (UI Chaining & Route Abbreviation Fallbacks)
4.  `Base Template Updates .md` / `Base Template Updates _2.md` (Schema Sync & Golden Master Defaults)
5.  `Master List Updates .md` (O(1) Memory Mapping & Sub-Report Fusion)
6.  `Monthly Change Updates .md` (Primitive Array Differencing & Category Isolation)
7.  `Disenrolled Updates .md` (Set-Based Re-Enrollment Purge & Lookback Hiding)
8.  `Demo PRefined Data Updates.md` (2-Phase Contact Flattening & Unified Pipeline)
9.  `Format Monthly Sheets Updates.md` (Unified Sub-Report Template-Copy Engine)
10. `Templates Updates.md` (Single-Pass Template Build Pipeline)
11. `Index Updates.md` / `Index Updates_2.md` (Section E Surface Parsing & Dynamic Navigation)

--------------------------------------------------------------------------------
EXECUTION RULES & CONSTRAINTS:

1. STRICT SEQUENTIAL IMPLEMENTATION:
   Execute the updates phase-by-phase in the exact order prescribed by `Update Guidelines.md`:
   - Phase 1: Core Utilities, Primitive Normalizers, HSL Cache, & Section E Parsing
   - Phase 2: Master Base Templates, Plain Text Default (@), & Canvas Sync
   - Phase 3: Sub-Report Formatting Engine (`formatMonthlySubReportViaTemplate_`)
   - Phase 4: Core Data Processing Engines (Refined Data, Disenrolled, Monthly Change, Master List)
   - Phase 5: System Surfaces & Index Navigation
   - Phase 6: Menus, Batch Orchestration, Connection Pooling, & Dead Code Purge

2. TEMPLATE VISIBILITY LAW:
   - Base templates (`TEST Template - [SheetType]`) MUST ALWAYS remain 100% UNHIDDEN across all columns.
   - Column hiding (`hideColumn = true`) from Section G must ONLY be applied to active output sheets via `applyColumnHidingFromDashboard_`.

3. DEPRECATION & CLEANUP MANDATE:
   - Immediately upon replacing or updating a module, permanently delete superseded legacy routines, obsolete inner-loop Regex calls, redundant styling loops, and duplicate wrappers as specified in the "Codebase Deprecation & Dead Code Purge Engine" section of `Update Guidelines.md`.
   - Ensure no orphaned functions, broken bindings, or dangling variables remain.

BEGIN WORK:
Acknowledge receipt of these instructions, read the specification files in `Master_List/Specs/Wave 4 Updates`, and begin execution starting with PHASE 1.
```

