---
name: import-building-energy
description: Import separate ClimateStudio energy use and energy use intensity CSVs with the nus-digital-twin-scripts cleaner, copy and rename an IDF into public, and update the matching buildings.json references.
---

# Import Building Energy

Update `src/content/buildings/buildings.json` fields `energyUse`, `energyUseIntensity`, and `idfDownload` from two separate CSV files and one IDF. Use the upstream `nus-digital-twin-scripts/clean-energy-use/clean-energy-use.py` conversion function. Upload here means copying the renamed IDF into this site's `public/` assets; deployment is separate unless requested.

## Identify inputs and target

Read the current `src/content.config.ts`, target building in `src/content/buildings/buildings.json`, and relevant existing files in `src/content/energy` and `public`. Identify the entry by name and `elementId`; for duplicate names, wings, or shared entries, clarify which entry represents the simulation. Do not create building entries or apply whole-building data to every wing automatically.

Locate the user-specified Energy Use CSV, Energy Use Intensity CSV, and matching Export IDF. Example source root: `~/Downloads/2026sims/**/Thermal Simulation`. Filenames vary in spacing, hyphens, spelling, and numbered suffixes. Match by folder, CSV headers, simulation scope, and the user's selection rather than filename alone. `Export Data.csv` and `Export Reports.csv` are not the monthly energy inputs. Some groups have no Thermal Simulation folder; YIH has multiple numbered EU/EUI files. Ask for the intended pair if ambiguous; do not pick the largest number or import all groups just because they exist.

EU headers normally end in `[kWh]`; EUI headers end in `[kWhm2]`, representing kWh/m². Require Jan–Dec rows and finite numeric end-use values. Use the supplied EUI directly; do not derive it from EU or infer a floor area. If headers use different units or structure, resolve the meaning before adapting the helper. Reject unexplained negatives or missing monthly values rather than filling them with zero. Entirely blank lines may be removed.

## Naming and destinations

Reuse the target's existing slug and asset directory where available unless the user requests a rename. For new slugs, use the full building name in lowercase kebab-case for one or two words, and lowercase initials for names with three or more words. Examples: University Hall → `university-hall`, Ventus → `ventus`, Shaw Foundation Alumni House → `sfah`. Retain block/wing qualifiers, for example Ridge View Residential College Block E → `rvrc-e`. Use the canonical building name rather than a source filename's abbreviation. Inspect existing paths for collisions; distinguish Shaw Foundation Alumni House from AS7 - Shaw Foundation Building. Do not include team names, spaces, `Export IDF`, run numbers, or dates for the single current simulation.

| Artifact             | Repository destination               | Value in buildings.json                  |
| -------------------- | ------------------------------------ | ---------------------------------------- |
| Energy use           | `src/content/energy/<slug>-eu.json`  | `energyUse: "<slug>-eu"`                 |
| Energy use intensity | `src/content/energy/<slug>-eui.json` | `energyUseIntensity: "<slug>-eui"`       |
| IDF                  | `public/<directory>/<slug>.idf`      | `idfDownload: "/<directory>/<slug>.idf"` |

For a new standalone building, `<directory>` normally equals `<slug>`. Established grouped folders take precedence, for example `public/rvrc/rvrc-g.idf` or `public/sheares-hall/sheares-a.idf`. Energy references are extensionless collection IDs, not file paths. New IDF URLs start with `/` and omit `public`. Preserve source files: rename the destination copy, without changing IDF contents. Never silently replace another building's artifacts. A request to update the selected building's simulation authorizes replacing its existing artifacts; clarify conflicts in building identity or simulation version.

## Convert and apply

Use [scripts/prepare_energy.py](scripts/prepare_energy.py) to stage the artifacts. It extracts the upstream conversion function without executing its hard-coded `helix-house` conversions or changing its repository. The cleaner detects EUI from the input path containing `eui`; the helper normalizes temporary filenames to `input-eu.csv` and `input-eui.csv`, trims whitespace/BOM and blank lines, validates source values, and preserves the cleaner's two-decimal rounding and column mapping.

From the project root, with a new staging directory:

```sh
python3 .agents/skills/import-building-energy/scripts/prepare_energy.py \
  --eu "/path/to/Building - Energy Use.csv" \
  --eui "/path/to/Building - Energy Use Intensity.csv" \
  --idf "/path/to/Building - Export IDF.idf" \
  --slug university-hall \
  --output-dir /tmp/university-hall-energy-stage
```

The default cleaner path is `~/Desktop/nus-digital-twin-scripts/clean-energy-use/clean-energy-use.py`; use `--cleaner` for another checkout. Locate it if the default is missing. Do not substitute a different conversion without explaining why. The helper executes trusted local Python from that script's function, so inspect an unfamiliar cleaner first.

Compare staged JSON with the current energy schema before copying. Required row fields currently are `month`, `equipment`, `lighting`, `heating`, `cooling`; optional numeric fields are `fans`, `pumps`, `humid`, `heatReject`, `hotWater`. Preserve all supplied supported end uses and zero values. Unknown or duplicate mapped columns require investigation; the upstream cleaner can silently collapse duplicate columns. Inspect the raw headers for one-to-one mapping as well as the resulting JSON. Adjust the helper if the schema or upstream script has changed.

After validation, copy both JSON files into `src/content/energy` and the renamed IDF into its chosen `public` directory, then update only the three reference fields on the selected building. Preserve other properties and entries. Do not change chart styling, schema, credits, or unrelated building data. Use targeted formatting with `yarn prettier` if needed.

## Verify and report

- Confirm both JSONs parse, each has exactly twelve ordered months, every row matches the current schema, and the end-use columns agree across the pair. Compare converted numbers to source values rounded to two decimals.
- Confirm each reference resolves to the corresponding JSON file and the IDF URL maps to an existing file under `public`. Compare the copied IDF bytes or hash against the original.
- Inspect the diff for preservation of unrelated entries and unintended replacements. For these data-only edits, parsing, schema/source checks, and reference/file checks are appropriate. If Astro validation is needed, exclude Cesium static files in `public` as required by AGENTS.md; use project commands with `yarn`.
- Report target name and `elementId`, the three selected source files, resulting reference values and destination paths, validation results, and any skipped/ambiguous inputs. Distinguish adding the downloadable asset locally from publishing it online.
