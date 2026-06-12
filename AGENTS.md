# AGENTS.md

Guidance for coding agents working in this repository.

## Project commands

- Use `yarn` to install dependencies and run project scripts.
- Prefer `yarn <script>` commands defined in `package.json` over `npm` or `pnpm` equivalents.

## Styling

- Use Tailwind CSS utility classes for styling.
- Prefer existing Tailwind patterns in the codebase before adding new custom CSS.

## Validation

- When using `astro check` to validate files, do not include the Cesium static files in `public/`.
- The Cesium static fields/assets in `public/` can produce many linter warnings, so exclude them from Astro validation where possible.
