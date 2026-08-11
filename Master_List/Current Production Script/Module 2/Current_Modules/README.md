# Current Module 2 Production Set

This directory contains the single current deployable version of each Module 2 script.

## Deployment set

1. `MODULE 1 v1.94.12: CORE SYSTEM, MENUS, TIMING & SHARED UTILITIES (DISENROLLMENT SAFETY RETRY)`
2. `MODULE 2 v2.18.14: DATA PROCESSING & OUTPUT ENGINE (THREE-GROUP ENROLLMENT HISTORY)`
3. `MODULE 3 v2.0.18: LAYOUT MANAGEMENT & TEMPLATES (DYNAMIC MONTHLY TAB RANKS)`
4. `MODULE 4 v2.1.7: SYSTEM INDEX & QUALITY ASSURANCE (TEMPLATE DIVIDERS ONLY)`
5. `MODULE 5 v3.25.5: FORMAT DASHBOARD & CONFIGURATION LOGIC (MONTHLY CHANGE SECTION ORDER)`

Deploy only these current versions together. Older sibling files in `Module 2/` are retained release snapshots and must not be loaded into the same Apps Script project with this set.

## Default-data ownership

Module 5 contains the only literal Format Dashboard default-data declaration. Module 1 no longer declares a second `GLOBAL_DEFAULTS` copy. Module 3 obtains all template defaults through `loadDashboardConfig_()`.

Build `Default - Format Dashboard` with `BuildDefaultFormatDashboard()`. The legacy `buildFormatDashboardTemplate_()` entry point remains available as a compatibility wrapper.
