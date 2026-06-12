---
name: validate-building-data
description: Read-only validation of src/content/buildings/buildings.json entries against the project schema, expected building-data mappings, units, ranges, and related display logic; report suspected keyed-in mistakes without modifying files.
---

# Validate Building Data

Use this skill when the user asks you to check whether building data has been added correctly in `src/content/buildings/buildings.json`, compare a building entry against source input, or identify fields that may have been keyed in wrongly.

This skill is strictly read-only. Do not edit, write, delete, move, format, or otherwise modify any file. Provide findings and suggested corrections only.

## Primary Files

- Building data to validate: `src/content/buildings/buildings.json`
- Schema source of truth: `src/content.config.ts`
- Related display logic for ACH core outside air flow: `src/components/menu/building-info/BuildingInfo.tsx`
- Optional guide: `src/content/docs/dev-guide/buildings/update-building-data.mdx`
- Optional companion skill for mapping conventions: `.agents/skills/populate-building-data/SKILL.md`

Always inspect the current schema in `src/content.config.ts` if there is any uncertainty about allowed fields or types.

## Read-Only Rule

You must not modify files. Use only read/search/diagnostic/terminal commands that do not write to the repository. If you need to suggest a fix, present it in the final report as a recommendation, not as an applied change.

Safe examples:

- Read files.
- Search files.
- Run read-only JSON parsing or validation commands.
- Run project validation commands if they do not modify files.

Unsafe examples:

- `edit_file`, `write_file`, `delete_path`, `move_path`, or formatting commands that rewrite files.
- Commands that update lockfiles, generated files, caches, or source files.

## Workflow

1. Determine the validation target.
   - If the user provides a building name, `elementId`, or source input table, use it to identify the building entry.
   - If no target is provided, ask whether to validate a specific building or all entries.
2. Read `src/content.config.ts` to confirm the current building schema.
3. Read `src/content/buildings/buildings.json`.
4. Locate the building entry or entries.
   - Prefer exact `elementId` matches when provided.
   - For name matches, list all matching entries if duplicates exist.
   - If you cannot locate the correct building with confidence, stop and ask the user for the correct `elementId` or other identifying details.
5. If the user provides source input, map source labels to expected JSON fields using the mapping table below and compare expected stored values against actual values.
6. Validate the selected entry or entries for:
   - Schema field names and value types.
   - Required metadata presence.
   - Numeric value normalization and likely unit mistakes.
   - Blank, null, placeholder, or stringified numeric values where the schema expects numbers.
   - Suspect percentages stored as fractions.
   - ACH `coreOutsideAirFlowrate` consistency with `BuildingInfo.tsx`.
   - Possible source-data fields that have no schema representation.
7. Run a read-only JSON parse check at minimum. If useful, run a read-only project validation command using `yarn`, but avoid commands that modify files.
8. Produce a structured report of findings, including severity, field, current value, suspected issue, evidence, and suggested correction.

## Human-Readable Label to JSON Field Mapping

Use these mappings when comparing source input to `buildings.json`:

| Input label / meaning                                          | JSON field                    | Expected type / normalization                                                                                                |
| -------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Selected Building, Building Name                               | `name`                        | string; identifies target building                                                                                           |
| Building Type                                                  | no direct schema field        | should not appear unless schema has changed                                                                                  |
| Building Age                                                   | no direct schema field        | should not appear unless schema has changed                                                                                  |
| Building Gross Floor Area, GFA                                 | no direct schema field        | should not appear unless schema has changed                                                                                  |
| Floor-to-floor height, Floor-to-floor-height                   | `floorToFloorHeight`          | number, or array of `{ "label": string, "value": number }` for labelled multiple values                                      |
| Perimeter zone depth                                           | `perimeterZoneDepth`          | number                                                                                                                       |
| Wall construction                                              | `wallConstruction`            | number, normally U-value in W/m²K                                                                                            |
| Roof construction                                              | `roofConstruction`            | number, normally U-value in W/m²K                                                                                            |
| External wall type                                             | `externalWallType`            | string                                                                                                                       |
| Internal walls, Internal walls/partitions, Internal partitions | `internalWalls`               | string                                                                                                                       |
| Fenestration type                                              | `fenestrationType`            | string                                                                                                                       |
| Fenestration shading                                           | `fenestrationShading`         | string                                                                                                                       |
| North window-to-wall ratio, North WWR                          | `northWindowToWallRatio`      | number; percentages should be whole numbers, e.g. `50`, not `0.5`                                                            |
| South window-to-wall ratio, South WWR                          | `southWindowToWallRatio`      | number; percentages should be whole numbers, e.g. `60`, not `0.6`                                                            |
| East window-to-wall ratio, East WWR                            | `eastWindowToWallRatio`       | number; percentages should be whole numbers, e.g. `20`, not `0.2`                                                            |
| West window-to-wall ratio, West WWR                            | `westWindowToWallRatio`       | number; percentages should be whole numbers, e.g. `40`, not `0.4`                                                            |
| Window frame conductance                                       | `windowFrameConductance`      | number or string if qualifiers are necessary                                                                                 |
| Glazing type                                                   | `glazingType`                 | string                                                                                                                       |
| Window leakage                                                 | `windowLeakage`               | number, commonly ACH                                                                                                         |
| Natural ventilation                                            | `naturalVentilation`          | string                                                                                                                       |
| Daylight response                                              | `daylightResponse`            | string                                                                                                                       |
| Thermostat set-point, Thermostat setpoint                      | `thermostatSetPoint`          | number, or heating/cooling array when both are separately supplied                                                           |
| Core outside air flow rate                                     | `coreOutsideAirFlowrate`      | number; if source unit is ACH, `BuildingInfo.tsx` should include the building `elementId` in `isCoreOutsideAirFlowRateInACH` |
| Perimeter outside air flow rate                                | `perimeterOutsideAirFlowrate` | number                                                                                                                       |
| Core occupant density                                          | `coreOccupantDensity`         | number                                                                                                                       |
| Perimeter occupant density                                     | `perimeterOccupantDensity`    | number                                                                                                                       |
| Core equipment power                                           | `coreEquipmentPower`          | number                                                                                                                       |
| Perimeter equipment power                                      | `perimeterEquipmentPower`     | number                                                                                                                       |
| Core lighting power                                            | `coreLightingPower`           | number                                                                                                                       |
| Perimeter lighting power                                       | `perimeterLightingPower`      | number                                                                                                                       |
| Occupancy schedule                                             | `occupancySchedule`           | number, typically hours/week                                                                                                 |
| Equipment usage                                                | `equipmentUsage`              | number, typically hours/week                                                                                                 |
| Lighting usage                                                 | `lightingUsage`               | number, typically hours/week                                                                                                 |
| Core outside air schedule                                      | `coreOutsideAirSchedule`      | string or number                                                                                                             |
| Perimeter outside air schedule                                 | `perimeterOutsideAirSchedule` | string or number                                                                                                             |
| Exhaust air recovery                                           | `exhaustAirRecovery`          | string                                                                                                                       |
| Economizer cycle                                               | `economizerCycle`             | string                                                                                                                       |
| Building data credits, Credits                                 | `buildingDataCredits`         | string                                                                                                                       |
| Energy use reference                                           | `energyUse`                   | string reference to energy content                                                                                           |
| Energy use intensity reference, EUI reference                  | `energyUseIntensity`          | string reference to energy content                                                                                           |
| IDF download                                                   | `idfDownload`                 | string path                                                                                                                  |
| Images                                                         | `images`                      | array of `{ "src": imagePath, "author": string }`                                                                            |
| Downloads                                                      | `downloads`                   | array matching the schema                                                                                                    |

## Validation Checks

### 1. Schema and Unknown Fields

Check the entry against fields currently defined in `src/content.config.ts`.

Flag:

- Required metadata missing: `elementId`, `name`, `address`, `postal`, `latitude`, `longitude`.
- Unknown fields that do not appear in the schema.
- Values with the wrong type, e.g. numeric fields stored as strings like `"50%"`, `"25°C"`, or `"0.12 pp/m²"`.
- `floorToFloorHeight` or `thermostatSetPoint` arrays that do not match the allowed object shapes.
- `images` or `downloads` arrays that do not match the schema.

### 2. Source-to-JSON Comparison

When source input is provided, compare expected mapped values against actual stored values.

Flag:

- Missing mapped fields that should have been added.
- Stored values that differ from normalized source values.
- Source fields ignored without an obvious reason.
- Blank source values that were incorrectly written as empty strings, `null`, or placeholders.

Do not flag source labels with no direct schema field as errors if they are absent from JSON. Instead, list them under ignored/unrepresented fields.

### 3. Numeric Normalization and Units

Flag likely keyed-in unit mistakes:

- Numeric field stored as a string containing units when schema expects a number.
  - `"25°C"` should likely be `25`.
  - `"80.5h/wk"` should likely be `80.5`.
  - `"2.5W/m2K"` should likely be `2.5`.
- Percentage window-to-wall ratios stored as fractions.
  - Values between `0` and `1` for WWR fields are suspicious when source used percentages; `0.5` likely should be `50`.
- WWR values outside `0` to `100`.
- Schedules outside plausible weekly-hour range `0` to `168`.
- Negative values for physical quantities that should not be negative.
- Latitude/longitude outside plausible Singapore/NUS ranges, or non-numeric coordinates.

Use judgement and label range checks as `warning` when they are plausibility checks rather than definite schema errors.

### 4. ACH Core Outside Air Flow Consistency

For `coreOutsideAirFlowrate`:

- If source input is available and the source unit is ACH, confirm the building's `elementId` appears in the `isCoreOutsideAirFlowRateInACH` array in `src/components/menu/building-info/BuildingInfo.tsx`.
- If source input is available and the source unit is not ACH, confirm the building's `elementId` is not incorrectly listed there, unless there is another reason in the codebase.
- If source input is not available, do not assume the unit. You may report that ACH consistency cannot be verified without source units.
- If the entry has `coreOutsideAirFlowrate` and the value is unusually small, e.g. less than `2`, mention that it may be ACH and should be checked against `BuildingInfo.tsx`, but do not assert it is wrong without source evidence.

### 5. Duplicate Buildings and Target Identity

If multiple entries share the same `name`, do not assume which one is intended. Report all candidate entries with `elementId`, `address`, `postal`, `latitude`, and `longitude`, then ask the user to choose if a specific validation target is required.

If validating all duplicate entries, clearly separate findings per `elementId`.

### 6. Existing Data Preservation Concerns

When comparing against source input, flag cases where existing non-empty values appear to have been overwritten by blanks, placeholders, or unrelated values.

Examples to flag:

- `""`, `"N/A"`, `"-"`, `"nil"`, `"none"` in fields where absence would be better, except for legitimate string fields where `"None"` is meaningful such as `exhaustAirRecovery` or `economizerCycle`.
- Missing previous values cannot be verified unless provided by git diff/history or source context; be clear about the evidence used.

## Severity Labels

Use these severity labels in the final report:

- `error`: Violates the schema, breaks JSON parsing, missing required metadata, invalid field shape, or clear mismatch with provided source data.
- `warning`: Plausible keyed-in mistake, suspicious range/unit, duplicate target ambiguity, or ACH display logic uncertainty.
- `info`: Unrepresented source field, optional missing data, or manual verification note.

## Clarification Triggers

Stop and ask the user before completing validation when:

- The requested building cannot be located in `buildings.json`.
- Multiple matching buildings exist and the user asked to validate one specific building but did not provide `elementId` or another disambiguator.
- The validation depends on source input units or values that were not provided.

If you can still provide a partial read-only report without making assumptions, do so, but clearly mark unresolved items and ask for the missing information.

## Final Report Format

Provide a concise but complete report. Use this structure:

1. **Target**
   - Building `name`, `elementId`, and whether validation covered one entry or multiple entries.
2. **Validation performed**
   - Files read.
   - Commands/checks run, with results.
3. **Findings**
   - Table with columns: Severity, Field, Current value, Issue, Suggested correction/action.
   - If there are no issues, state that no keyed-in issues were found based on available data.
4. **Source mapping check** (only when source input is provided)
   - Table with columns: Input label, Input value, Expected JSON field, Expected stored value, Actual stored value, Status.
5. **Ignored / unrepresented source fields**
   - List fields from the source input that should not be in `buildings.json`, with reasons such as `no schema field`, `blank value`, or `ambiguous`.
6. **ACH display logic check**
   - State whether `BuildingInfo.tsx` contains the target `elementId` in `isCoreOutsideAirFlowRateInACH`, and whether that matches the source unit evidence.
7. **Manual verification notes**
   - Any remaining uncertainty, such as missing source units or duplicate entries requiring user confirmation.

Do not include a patch unless the user explicitly asks for one after reviewing the validation report. Even then, a patch should be presented as a suggestion, not applied under this skill.
