# Current Module 2 Production Set

The `Current_Modules/` directory contains only the single current deployable version of each Module 2 script. This manifest and all release notes are stored in the parent `Module 2/` directory.

## Deployment set

1. `MODULE 1 v1.94.4: CORE SYSTEM, MENUS, TIMING & SHARED UTILITIES (REFINED DATA TERMINOLOGY)`
2. `MODULE 2 v2.15: DATA PROCESSING & OUTPUT ENGINE (FATAL IMPORT PREFLIGHT)`
3. `MODULE 3 v2.0.10: LAYOUT MANAGEMENT & TEMPLATES (SYSTEM SURFACE FORMATTING)`
4. `MODULE 4 v2.1.4: SYSTEM INDEX & QUALITY ASSURANCE (REFINED DATA TERMINOLOGY)`
5. `MODULE 5 v3.22: FORMAT DASHBOARD & CONFIGURATION LOGIC (MONTHLY CHANGE GOVERNANCE)`

Deploy only the five scripts in `Current_Modules/` together. Older files in the parent `Module 2/` directory are retained release snapshots and must not be loaded into the same Apps Script project with this set.

## Default-data ownership

Module 5 contains the only literal Format Dashboard default-data declaration. Module 1 no longer declares a second `GLOBAL_DEFAULTS` copy. Module 3 obtains all template defaults through `loadDashboardConfig_()`.

Build `Default - Format Dashboard` with `BuildDefaultFormatDashboard()`. The legacy `buildFormatDashboardTemplate_()` entry point remains available as a compatibility wrapper.
