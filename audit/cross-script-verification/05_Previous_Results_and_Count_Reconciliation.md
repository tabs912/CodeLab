# Previous Results and Count Reconciliation

**Stage 5 status:** COMPLETE WITH OPEN ISSUES.

## Section 11 — Previous results cross-check

| Reported Finding | Report Source | Independent Script Evidence | Confirmed | Corrected Result |
|---|---|---|---|---|
| 10 modules, 4,164 lines, 212 functions | prior Scripts 01/10 and combined report | Stage 0 hashes/lines; Stage 1 extraction | Yes | Retained for modular population |
| 42 menu registrations, 38 unique callback names | prior Scripts 01/10 | independent `.addItem` extraction | Yes | Retained |
| 28 unique callbacks absent; 31 paths fail | prior Scripts 01/09/10 and combined report | Stage 2 independent resolution against M | Yes | Retained **only for supplied modules** |
| Both modular source-defined runtime entries exist | prior Scripts 01/04/07/09/10 | `onOpen`, `doGet` declarations | Yes but incomplete cross-version scope | Combined scripts also define `onEdit(e)`, which modules omit; live state remains NOT VERIFIED |
| No prior approved modular baseline supplied | prior Script 09 | combined production versions are present in governing production folder | **No** | Prior scope conclusion was incomplete: two combined candidates support cross-population comparison |
| Modular source is governing production source | prior combined report header | project README says Current Production Script is governing; supplied combined scripts contain far more executable content | **No / unsupported** | Treat modules as current modular population, not proven complete governing executable |
| Missing callbacks prove production readiness FAIL | prior report | true for modules; callbacks resolve in combined populations | Partially | FAIL for modular deployment; does not prove the supplied combined production file itself is broken |
| 161 reachable functions / 390 named calls | prior report | prior reachability is rooted only in resolving modular entries and excludes missing roots | Partially | Useful modular-root metric, not total-project equivalence metric |
| No duplicated full menu display path | prior Script 09 | independent label/callback extraction | Yes | Retained |
| Live workbook/deployment claims NOT VERIFIED | all prior stages | no runtime/container evidence supplied | Yes | Retained |

Every prior detailed menu row is rechecked in Stage 2; every reported source/function ownership row is superseded by the complete Stage 1 register; wrapper/helper claims are rechecked in Stage 3; operation claims are population-reconciled in Stage 4. Exact prior catalogs remain preserved and were not overwritten.

## Section 12 — Independently recalculated totals

| Metric | Previous Script | Rebuilt/Combined | Modular Total | Reconciled |
|---|---:|---:|---:|---|
| Total functions | 507 | 509 | 211 | No — documented source difference |
| Unique functions | 507 | 509 | 211 | No — documented source difference |
| Public/non-underscore functions | 53 | 53 | 18 | No — documented source difference |
| Internal underscore functions | 454 | 456 | 193 | No — documented source difference |
| Menu registrations | 44 | 44 | 42 | No — documented source difference |
| Resolved menu paths | 33 | 33 | 11 | No — documented source difference |
| Trigger entry points | 3 | 3 | 2 | No — modules omit `onEdit(e)` |
| Duplicate definitions | 0 | 0 | 0 | Yes |
| Cross-function named call occurrences | 1664 | 1687 | 538 | No — documented source difference |

### Additional classified totals

* Validators (name begins `validate`): previous 9, rebuilt 9, modules 4.
* Logging functions (name contains `log`): previous 4, rebuilt 4, modules 1.
* Timing functions (name contains `timing` or framework step marker): previous 43, rebuilt 43, modules 4.
* Zero-static-caller modular declarations: 38; these include public/dynamic roots and are not automatically orphaned.
* Passed/warning/failed live execution paths are **NOT VERIFIED**; static modular menu paths are 11 resolving and 31 failed at callback lookup.
