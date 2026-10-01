"""Stage two ClimateStudio CSV conversions and a renamed IDF without editing the repo."""

import argparse
import ast
import csv
import json
import math
from pathlib import Path
import re
import shutil
import tempfile

MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split()
REQUIRED = {'equipment', 'lighting', 'heating', 'cooling'}
OPTIONAL = {'fans', 'pumps', 'humid', 'heatReject', 'hotWater'}


def bundled_converter(csv_file_path, json_file_path):
    """Preserve the upstream clean-energy-use.py field mapping and rounding."""
    data = []
    is_intensity = 'eui' in csv_file_path
    with open(csv_file_path, newline='') as stream:
        reader = csv.reader(stream)
        headers = next(reader)
        for row in reader:
            renamed = {'month': row[0]}
            for index, value in enumerate(row[1:], start=1):
                header = headers[index][:-7 if is_intensity else -5]
                header = header[0].lower() + header[1:]
                if 'equip' in header:
                    header = 'equipment'
                elif 'cool' in header:
                    header = 'cooling'
                elif 'hReject' in header:
                    header = 'heatReject'
                elif 'light' in header:
                    header = 'lighting'
                elif 'heat' in header:
                    header = 'heating'
                renamed[header] = round(float(value), 2)
            data.append(renamed)
    with open(json_file_path, 'w') as stream:
        json.dump(data, stream, indent=2)


def convert(source, output, mode, converter):
    with source.open(newline='', encoding='utf-8-sig') as stream:
        rows = [row for row in csv.reader(stream) if any(cell.strip() for cell in row)]
    if not rows:
        raise ValueError(f'{source}: empty CSV')
    suffix = '[kWh]' if mode == 'eu' else '[kWhm2]'
    if len(rows[0]) < 2 or any(not h.strip().endswith(suffix) for h in rows[0][1:]):
        raise ValueError(f'{source}: expected {suffix} headers; confirm units before converting')
    if [row[0].strip() for row in rows[1:]] != MONTHS:
        raise ValueError(f'{source}: expected exactly Jan–Dec in order')
    for row in rows[1:]:
        if len(row) != len(rows[0]):
            raise ValueError(f'{source}: inconsistent column count')
        for value in row[1:]:
            number = float(value)
            if not math.isfinite(number) or number < 0:
                raise ValueError(f'{source}: invalid energy value {value!r}')
    # Filename is part of the upstream converter's EU/EUI detection contract.
    with tempfile.TemporaryDirectory(prefix='energy-stage-') as directory:
        normalized = Path(directory) / f'input-{mode}.csv'
        with normalized.open('w', newline='') as stream:
            csv.writer(stream).writerows([[cell.strip() for cell in row] for row in rows])
        converter(str(normalized), str(output))
    data = json.loads(output.read_text())
    for row in data:
        fields = set(row) - {'month'}
        if len(fields) != len(rows[0]) - 1:
            raise ValueError(f'{source}: duplicate mapped end-use columns')
        if not REQUIRED <= fields or not fields <= REQUIRED | OPTIONAL:
            raise ValueError(f'{source}: converted fields do not match energy schema: {fields}')
        if any(not isinstance(row[key], (int, float)) or not math.isfinite(row[key]) for key in fields):
            raise ValueError(f'{source}: non-finite converted number')
    return data


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    path_type = lambda value: Path(value).expanduser()
    parser.add_argument('--eu', type=path_type, required=True)
    parser.add_argument('--eui', type=path_type, required=True)
    parser.add_argument('--idf', type=path_type, required=True)
    parser.add_argument('--slug', required=True)
    parser.add_argument('--output-dir', type=path_type, required=True, help='New staging directory')
    parser.add_argument('--cleaner', type=path_type, help='Optional user-provided upstream cleaner path; defaults to bundled converter')
    args = parser.parse_args()
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', args.slug):
        parser.error('slug must use lowercase letters, digits, and single hyphens')
    if args.eu.resolve() == args.eui.resolve():
        parser.error('EU and EUI must be separate CSV files')
    sources = [args.eu, args.eui, args.idf]
    if args.cleaner is not None:
        sources.append(args.cleaner)
    for source in sources:
        if not source.is_file():
            parser.error(f'missing input: {source}')
    if args.idf.suffix.lower() != '.idf' or args.idf.stat().st_size == 0:
        parser.error('IDF must be a nonempty .idf file')
    converter = bundled_converter
    if args.cleaner is not None:
        # Extract only the function; importing the module would run hard-coded conversions.
        tree = ast.parse(args.cleaner.read_text())
        functions = [node for node in tree.body if isinstance(node, ast.FunctionDef)
                     and node.name == 'csv_to_json_with_column_number_rename']
        if len(functions) != 1:
            parser.error('upstream conversion function missing or ambiguous')
        namespace = {'csv': csv, 'json': json}
        exec(compile(ast.Module(body=functions, type_ignores=[]), str(args.cleaner), 'exec'), namespace)
        converter = namespace['csv_to_json_with_column_number_rename']
    print(f'Converter: {args.cleaner if args.cleaner is not None else "bundled"}')
    args.output_dir.mkdir(parents=True, exist_ok=False)
    try:
        eu = convert(args.eu, args.output_dir / f'{args.slug}-eu.json', 'eu', converter)
        eui = convert(args.eui, args.output_dir / f'{args.slug}-eui.json', 'eui', converter)
        if any(set(a) != set(b) for a, b in zip(eu, eui)):
            raise ValueError('EU and EUI end-use columns differ; confirm the simulation pair')
        shutil.copyfile(args.idf, args.output_dir / f'{args.slug}.idf')
    except Exception:
        shutil.rmtree(args.output_dir)
        raise
    print(f'Staged {args.slug}-eu.json, {args.slug}-eui.json, {args.slug}.idf in {args.output_dir}')


if __name__ == '__main__':
    main()
