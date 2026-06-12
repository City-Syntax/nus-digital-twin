---
name: populate-building-data
description: Populate or update entries in src/content/buildings/buildings.json from user-provided building parameter tables or files, mapping human-readable labels to the repository's building JSON schema and stopping to clarify uncertain fields.
---

# Populate Building Data

Use this skill when the user provides a table, spreadsheet export, document, or pasted data containing building parameters and asks you to add or update building information in `src/content/buildings/buildings.json`.

The goal is to map human-readable input labels to the correct JSON fields defined in `src/content.config.ts`, update the matching building entry, preserve unrelated existing data, and clarify ambiguous or missing information before making risky assumptions.

## Primary Files

- Data file to update: `src/content/buildings/buildings.json`
- Schema source of truth: `src/content.config.ts`
- User-facing guide: `src/content/docs/dev-guide/buildings/update-building-data.mdx`
- Related display logic: `src/components/menu/building-info/BuildingInfo.tsx`

Always inspect the current `src/content.config.ts` schema if you are unsure whether a field exists or what type it accepts.

## Workflow

1. Read or locate the user-provided input data.
   - If the user pasted the data, parse it directly.
   - If the user references a file, locate and read that file first.
   - If no input data is provided, ask the user to provide a table/file and stop.
2. Read `src/content/buildings/buildings.json` and find the intended building entry.
   - Use the selected building name from the input, if present.
   - Match against the existing `name` field.
   - If there are multiple entries with the same `name`, ask which entry to update using distinguishing fields such as `elementId`, `address`, `postal`, `latitude`, and `longitude`.
   - If you cannot locate the correct building entry with confidence, stop and ask the user to identify the building, preferably by `elementId`.
   - If no matching building exists, ask whether to add a new entry and request required metadata (`elementId`, `name`, `address`, `postal`, `latitude`, `longitude`) unless already available.
3. Convert input labels and values to schema-compatible JSON fields using the mapping table below.
4. Preserve all existing fields not mentioned by the input.
5. Omit fields with blank, unknown, or unavailable values unless the user explicitly asks to set them to a placeholder.
6. Before editing, stop and ask clarifying questions for any ambiguous field mapping, uncertain unit conversion, conflicting value, or target-building ambiguity.
7. Edit `src/content/buildings/buildings.json` with minimal changes.
8. If `coreOutsideAirFlowrate` is provided in ACH, also update `src/components/menu/building-info/BuildingInfo.tsx` by adding the building's `elementId` string to the `isCoreOutsideAirFlowRateInACH` array, unless it is already present.
9. Validate JSON syntax after editing. Prefer project commands using `yarn` if broader validation is needed.
10. End with a manual-verification summary that lists the target building, every input label mapped to a JSON field, every ignored input label/value, any related `BuildingInfo.tsx` update, and the validation performed.

## Required JSON Shape

`buildings.json` is an array of building objects. The required metadata fields are:

- `elementId`: string
- `name`: string
- `address`: string
- `postal`: string
- `latitude`: number
- `longitude`: number

Most building performance fields are optional. Do not remove required metadata from existing entries.

## Human-Readable Label to JSON Field Mapping

Use these exact JSON field names when the corresponding human-readable label appears in the input:

| Input label / meaning                                          | JSON field                    | Type / conversion                                                                                                                                            |
| -------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Selected Building, Building Name                               | `name`                        | string; use to identify the target building unless adding a new entry                                                                                        |
| Building Type                                                  | no direct schema field        | Do not add unless the schema has been updated; mention it is not currently represented                                                                       |
| Building Age                                                   | no direct schema field        | Do not add unless the schema has been updated                                                                                                                |
| Building Gross Floor Area, GFA                                 | no direct schema field        | Do not add unless the schema has been updated                                                                                                                |
| Floor-to-floor height, Floor-to-floor-height                   | `floorToFloorHeight`          | number when there is one value; array of `{ "label": string, "value": number }` only if labels are supplied or multiple distinct heights must be represented |
| Perimeter zone depth                                           | `perimeterZoneDepth`          | number                                                                                                                                                       |
| Wall construction                                              | `wallConstruction`            | number, normally U-value in W/m²K                                                                                                                            |
| Roof construction                                              | `roofConstruction`            | number, normally U-value in W/m²K                                                                                                                            |
| External wall type                                             | `externalWallType`            | string                                                                                                                                                       |
| Internal walls, Internal walls/partitions, Internal partitions | `internalWalls`               | string                                                                                                                                                       |
| Fenestration type                                              | `fenestrationType`            | string                                                                                                                                                       |
| Fenestration shading                                           | `fenestrationShading`         | string                                                                                                                                                       |
| North window-to-wall ratio, North WWR                          | `northWindowToWallRatio`      | number; convert percentages like `50%` to `50`, not `0.5`                                                                                                    |
| South window-to-wall ratio, South WWR                          | `southWindowToWallRatio`      | number; convert percentages like `60%` to `60`, not `0.6`                                                                                                    |
| East window-to-wall ratio, East WWR                            | `eastWindowToWallRatio`       | number; convert percentages like `20%` to `20`, not `0.2`                                                                                                    |
| West window-to-wall ratio, West WWR                            | `westWindowToWallRatio`       | number; convert percentages like `40%` to `40`, not `0.4`                                                                                                    |
| Window frame conductance                                       | `windowFrameConductance`      | number if clean numeric value; string if the value includes important qualifiers that cannot be reduced safely                                               |
| Glazing type                                                   | `glazingType`                 | string                                                                                                                                                       |
| Window leakage                                                 | `windowLeakage`               | number, commonly ACH                                                                                                                                         |
| Natural ventilation                                            | `naturalVentilation`          | string                                                                                                                                                       |
| Daylight response                                              | `daylightResponse`            | string                                                                                                                                                       |
| Thermostat set-point, Thermostat setpoint                      | `thermostatSetPoint`          | number when one value; array of `{ "label": "Heating"                                                                                                        | "Cooling", "value": number }` only when heating/cooling values are separately supplied |
| Core outside air flow rate                                     | `coreOutsideAirFlowrate`      | number; if the input unit is ACH, also update `BuildingInfo.tsx` as described below                                                                          |
| Perimeter outside air flow rate                                | `perimeterOutsideAirFlowrate` | number                                                                                                                                                       |
| Core occupant density                                          | `coreOccupantDensity`         | number                                                                                                                                                       |
| Perimeter occupant density                                     | `perimeterOccupantDensity`    | number                                                                                                                                                       |
| Core equipment power                                           | `coreEquipmentPower`          | number                                                                                                                                                       |
| Perimeter equipment power                                      | `perimeterEquipmentPower`     | number                                                                                                                                                       |
| Core lighting power                                            | `coreLightingPower`           | number                                                                                                                                                       |
| Perimeter lighting power                                       | `perimeterLightingPower`      | number                                                                                                                                                       |
| Occupancy schedule                                             | `occupancySchedule`           | number, typically hours/week                                                                                                                                 |
| Equipment usage                                                | `equipmentUsage`              | number, typically hours/week                                                                                                                                 |
| Lighting usage                                                 | `lightingUsage`               | number, typically hours/week                                                                                                                                 |
| Core outside air schedule                                      | `coreOutsideAirSchedule`      | string or number                                                                                                                                             |
| Perimeter outside air schedule                                 | `perimeterOutsideAirSchedule` | string or number                                                                                                                                             |
| Exhaust air recovery                                           | `exhaustAirRecovery`          | string                                                                                                                                                       |
| Economizer cycle                                               | `economizerCycle`             | string                                                                                                                                                       |
| Building data credits, Credits                                 | `buildingDataCredits`         | string                                                                                                                                                       |
| Energy use reference                                           | `energyUse`                   | string reference to an entry in `src/content/energy`                                                                                                         |
| Energy use intensity reference, EUI reference                  | `energyUseIntensity`          | string reference to an entry in `src/content/energy`                                                                                                         |
| IDF download                                                   | `idfDownload`                 | string path                                                                                                                                                  |
| Images                                                         | `images`                      | array of `{ "src": imagePath, "author": string }`; only add when valid asset paths are provided                                                              |
| Downloads                                                      | `downloads`                   | array matching the schema; only add when file type and URL/path are provided                                                                                 |

## Value Normalization Rules

- Strip units from numeric fields after confirming the unit matches the expected meaning.
  - `25°C` -> `25`
  - `0.12 pp/m²` -> `0.12`
  - `28.01 W/m²` -> `28.01`
  - `80.5h/wk` -> `80.5`
  - `2.5W/m2K` -> `2.5`
- Preserve meaningful descriptive text for string fields.
  - Multiline values should usually become a concise single string unless the field expects a number.
- For WWR fields, store the percent value as a whole number.
  - `50%` -> `50`
- For `coreOutsideAirFlowrate`, preserve the numeric value in `buildings.json` regardless of the source unit, but if the source unit is ACH, update the `isCoreOutsideAirFlowRateInACH` array in `src/components/menu/building-info/BuildingInfo.tsx` with the target building's `elementId` string. This lets the UI display the correct unit.
- For blank values, do not add or overwrite the field.
- If an existing field has a value and the input provides a blank value, keep the existing value unless the user explicitly asks to clear it.
- If input contains a combined expression, evaluate it only when unambiguous.
  - Example: `4m + 1m = 5m` can be stored as `5` for `floorToFloorHeight`.
  - If the expression's meaning is unclear, ask before editing.
- Do not invent fields that are not in `src/content.config.ts`.

## Clarification Triggers

Stop and ask the user before editing when:

- The target building cannot be uniquely identified, cannot be located in `buildings.json`, or cannot be matched with high confidence. Ask the user for a distinguishing identifier such as `elementId`.
- The input includes fields with no direct schema mapping and the user appears to expect them to be stored.
- A value has an unclear unit or cannot be converted safely.
- A single label could map to multiple schema fields.
- The input conflicts with existing non-empty data and it is not clear whether to overwrite it.
- Required metadata is missing for a new building.
- The user asks to add images, downloads, or energy references but does not provide valid paths/references.
- `coreOutsideAirFlowrate` is provided but the unit is unclear, because ACH values require a related `BuildingInfo.tsx` update.

## Example: HSSML Mapping

For an input table headed `Selected Building: Hon Sui Sen Memorial Library`, locate the existing building whose `name` is `Hon Sui Sen Memorial Library`. From the sample values:

```json
{
  "floorToFloorHeight": 5,
  "perimeterZoneDepth": 4.5,
  "wallConstruction": 2.5,
  "roofConstruction": 1.2,
  "externalWallType": "Stone cladding with reinforced concrete for external walls",
  "internalWalls": "White plaster wall",
  "fenestrationType": "Fixed curtain wall (Glazing) (Windows and one skylight)",
  "fenestrationShading": "Exterior sunshade; Interior louvres",
  "northWindowToWallRatio": 50,
  "southWindowToWallRatio": 60,
  "eastWindowToWallRatio": 20,
  "westWindowToWallRatio": 40,
  "windowFrameConductance": 5.2,
  "glazingType": "Double pane",
  "windowLeakage": 0.3,
  "naturalVentilation": "Yes (All hours)",
  "daylightResponse": "Continuous",
  "thermostatSetPoint": 25,
  "coreOutsideAirFlowrate": 0.65,
  "coreOccupantDensity": 0.12,
  "coreEquipmentPower": 28.01,
  "coreLightingPower": 11,
  "occupancySchedule": 80.5,
  "equipmentUsage": 50,
  "lightingUsage": 80.5,
  "coreOutsideAirSchedule": "Always on",
  "exhaustAirRecovery": "None",
  "economizerCycle": "None"
}
```

Do not add `Building Type`, `Building Age`, or `Building Gross Floor Area` unless the schema has been updated to include them. Do not add blank perimeter density/power/schedule fields from the sample.

Because the sample gives `Core outside air flow rate` as `0.65 ACH`, also add the Hon Sui Sen Memorial Library building `elementId` to `isCoreOutsideAirFlowRateInACH` in `src/components/menu/building-info/BuildingInfo.tsx` if it is not already listed.

## Validation

After editing, at minimum verify the JSON parses. For example, use an available JSON parser or project validation command. If running Astro validation, follow the repository rule: avoid including Cesium static files in `public/` where possible.

Report exactly what was changed and which validation command was run. If validation was not run, state why.

## Final Response Requirements

Always finish with a concise manual-verification summary. Include:

- Target building: `name` and `elementId`.
- Updated fields: a mapping table with columns for input label, input value, JSON field, and stored value.
- Ignored fields: a list or table of input labels/values that were not written, with the reason, such as `no schema field`, `blank value`, `ambiguous`, or `not provided`.
- Related code updates: mention whether `src/components/menu/building-info/BuildingInfo.tsx` was updated for ACH `coreOutsideAirFlowrate`, or state that it was not needed.
- Validation: the exact command/check run and result.

If no edit was made because the building could not be identified, do not provide a guessed mapping as if it was applied. Instead, summarize what could be parsed and ask the user for the correct `elementId` or other identifying details.
