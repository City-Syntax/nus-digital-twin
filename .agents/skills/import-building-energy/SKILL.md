---
name: import-building-energy
description: Import separate ClimateStudio energy use and energy use intensity CSVs from user-provided paths using the bundled converter or a supplied nus-digital-twin-scripts cleaner, copy and rename an IDF into public, and update the matching buildings.json references.
---

# Import Building Energy

Update `src/content/buildings/buildings.json` fields `energyUse`, `energyUseIntensity`, and `idfDownload` from two separate CSV files and one IDF. Use the bundled converter, based on the upstream `nus-digital-twin-scripts/clean-energy-use/clean-energy-use.py` column mapping and rounding, or that upstream function when the user supplies its path. The separate scripts repository is optional. Upload here means copying the renamed IDF into this site's `public/` assets; deployment is separate unless requested.

## Identify inputs and target

Before reading simulation inputs, ask the user to provide the correct paths to the Energy Use CSV, Energy Use Intensity CSV, and IDF, or the source directory to search. If the user already supplied those paths for this import, use them without asking again. Never assume a Downloads folder, a dataset name, a Desktop checkout, or a directory from a previous import. Resolve relative paths against the current working directory and expand `~`; if a supplied path is missing or ambiguous, ask for the corrected path instead of searching unrelated locations. Repository-relative schema and destination paths below still apply.

Read the current `src/content.config.ts`, target building in `src/content/buildings/buildings.json`, and relevant existing files in `src/content/energy` and `public`. Identify the entry by name and `elementId`, using existing shared-building handling and user-confirmed mappings from the current task. Folder labels can differ from canonical names or refer to only one block, wing, or shared entry. Existing building parameters and credits can help identify a candidate but do not establish simulation scope on their own. Clarify only mappings that remain uncertain; do not ask again for a mapping already confirmed. Do not create building entries or apply whole-building data to every wing automatically.

Locate the inputs only within the user-provided paths. When the user provides a source directory, search recursively within it instead of requiring an exact `Thermal Simulation` directory name: valid exports also occur under `Thermal Simualtion` and `Thermal Simulaiton`. Filenames vary in spacing, hyphens, spelling, capitalization, and numbered suffixes. Match by folder, CSV headers, simulation scope, and the user's selection rather than filename alone. `Export Data.csv` and `Export Reports.csv` are not the monthly energy inputs; solar and daylight outputs cannot substitute for energy CSVs.

If multiple candidate exports exist, compare their contents before asking which to use. Compare EU candidates with EU candidates and EUI candidates with EUI candidates. Byte-identical copies are interchangeable; prefer the unnumbered pair when available and report which files were selected. If bytes differ only in formatting, compare parsed CSV headers, units, ordered months, and every numeric value at full source precision, ignoring BOM, line endings, surrounding whitespace, and entirely blank lines. Do not compare only rounded JSON or annual totals, which can hide differences. If the monthly data and units are identical and the simulation scope is the same, select one equivalent pair without clarification. Compare duplicate IDFs byte-for-byte separately; identical CSVs do not establish that different IDFs are equivalent. For genuinely different candidate runs without a clear user selection or pairing, clarify rather than choosing the largest numbered suffix.

Check input availability separately from building identity. If either CSV or the IDF is missing after recursive discovery, report the missing artifact and source folder; a confirmed target mapping does not supply the missing data. Do not fabricate inputs or partially import a complete simulation without the user's direction. Follow the user's requested scope, batching, and commit cadence. When asked to skip uncertainties and continue, finish the clear imports and collect unresolved mappings, differing exports, and missing inputs into one end-of-run list. Otherwise ask for the information needed to resolve the affected import. Do not import additional groups merely because they exist.

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

Use [scripts/prepare_energy.py](scripts/prepare_energy.py) to stage the artifacts. By default it uses its bundled converter and needs no external checkout. It trims whitespace/BOM and blank lines, validates source values, and applies the upstream cleaner's column mapping and two-decimal rounding. If given `--cleaner`, it extracts the upstream conversion function without executing the module's hard-coded conversions or changing its repository. The upstream cleaner detects EUI from the input path containing `eui`; the helper normalizes temporary filenames to `input-eu.csv` and `input-eui.csv` for either mode.

From the project root, with a new staging directory:

```sh
python3 .agents/skills/import-building-energy/scripts/prepare_energy.py \
  --eu "/path/to/Building - Energy Use.csv" \
  --eui "/path/to/Building - Energy Use Intensity.csv" \
  --idf "/path/to/Building - Export IDF.idf" \
  --slug university-hall \
  --output-dir /tmp/university-hall-energy-stage
```

To use a separate `nus-digital-twin-scripts` cleaner, ask the user for its correct file path unless already supplied, then pass `--cleaner "/path/to/clean-energy-use.py"`. Do not guess its location or require the repository to be installed. An explicitly supplied missing cleaner path is an error: obtain the corrected path or explain that the bundled converter can be used instead. Report which converter was used. The external-cleaner mode executes local Python from that function, so inspect an unfamiliar cleaner first.

Compare staged JSON with the current energy schema before copying. Required row fields currently are `month`, `equipment`, `lighting`, `heating`, `cooling`; optional numeric fields are `fans`, `pumps`, `humid`, `heatReject`, `hotWater`. Preserve all supplied supported end uses and zero values; leave absent optional end uses absent rather than adding fabricated zeros. Unknown or duplicate mapped columns require investigation; the upstream cleaner can silently collapse duplicate columns. Inspect the raw headers for one-to-one mapping as well as the resulting JSON. Adjust the helper if the schema or upstream script has changed.

After validation, copy both JSON files into `src/content/energy` and the renamed IDF into its chosen `public` directory, then update only the three reference fields on the selected building. Preserve other properties and entries. Do not change chart styling, schema, credits, or unrelated building data. Use targeted formatting with `yarn prettier` if needed.

## Verify and report

- Confirm both JSONs parse, each has exactly twelve ordered months, every row matches the current schema, and the end-use columns agree across the pair. Compare converted numbers to source values rounded to two decimals.
- Confirm each reference resolves to the corresponding JSON file and the IDF URL maps to an existing file under `public`. Compare the copied IDF bytes or hash against the original.
- Keep IDFs byte-identical, including original line endings, trailing spaces, and blank lines. Restrict formatting and whitespace checks to edited JSON/instructions; for example, `git diff --check -- src/content/buildings/buildings.json src/content/energy` checks uncommitted JSON edits. Use the appropriate staged or commit-range diff when applicable. Original IDF whitespace may trigger Git warnings; do not normalize the file to silence them.
- Inspect the diff for preservation of unrelated entries and unintended replacements. For these data-only edits, parsing, schema/source checks, and reference/file checks are appropriate. If Astro validation is needed, exclude Cesium static files in `public` as required by AGENTS.md; use project commands with `yarn`.
- Report target name and `elementId`, the three selected source files, resulting reference values and destination paths, validation results, and any skipped/ambiguous inputs. Distinguish adding the downloadable asset locally from publishing it online.
