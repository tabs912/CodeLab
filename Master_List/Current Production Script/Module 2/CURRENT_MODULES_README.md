# Current Module 2 Production Set

The `Current_Modules/` directory contains only the single current deployable version of each Module 2 script. This manifest and all release notes are stored in the parent `Module 2/` directory.

## Deployment set

1. `MODULE 1 v1.94.2: CORE SYSTEM, MENUS, TIMING & SHARED UTILITIES`
2. `MODULE 2 v2.9: DATA PROCESSING & OUTPUT ENGINE (DASHBOARD-GOVERNED NUMBER FORMATS)`
3. `MODULE 3 v2.0.9: LAYOUT MANAGEMENT & TEMPLATES (SECTION G DATE FORMATS)`
4. `MODULE 4 v2.1.2: SYSTEM INDEX & QUALITY ASSURANCE (HEADER-MAPPED RESULTS)`
5. `MODULE 5 v3.19: FORMAT DASHBOARD & CONFIGURATION LOGIC (UPDATED DASHBOARD DEFAULTS)`

Deploy only the five scripts in `Current_Modules/` together. Older files in the parent `Module 2/` directory are retained release snapshots and must not be loaded into the same Apps Script project with this set.

## Default-data ownership

Module 5 contains the only literal Format Dashboard default-data declaration. Module 1 no longer declares a second `GLOBAL_DEFAULTS` copy. Module 3 obtains all template defaults through `loadDashboardConfig_()`.

Build `Default - Format Dashboard` with `BuildDefaultFormatDashboard()`. The legacy `buildFormatDashboardTemplate_()` entry point remains available as a compatibility wrapper.
