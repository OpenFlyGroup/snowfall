# AGENTS.md

This repository is `@openflygroup/snowfall`, a React + TypeScript canvas snowfall library published to npm.

## Build, typecheck, lint

- `npm run ci` runs the full gate in order: `type-check` → `lint` → `build`. This is what CI enforces and must pass before publishing.
- `npm run type-check` uses `tsc --noEmit` (strict). `tsconfig.app.json` uses `verbatimModuleSyntax` and stricter modern TS settings; `tsconfig.json` is the main config used by build tooling.
- `npm run lint` runs `eslint . --max-warnings=0`. Rules enforce no unused vars (underscored allowed), inline-type-imports, and react-hooks/react-refresh.
- `npm run build` uses tsup (see `tsup.config.ts`). Outputs CJS+ESM with DTS to `dist/`, emits sourcemaps, minifies, marks as external `react`, `react-dom`, `zustand`, preserves the `"use client"` banner (treeshake disabled to avoid stripping directive prologues). The entry file imports `./index.css`, so both `dist/index.js` and `dist/index.cjs` also `require/import "./index.css"`; the separate `dist/index.css` asset remains for `./styles` export.
- `npm run dev` watches via `tsup --watch` for library development.

## Package exports and public API

- `package.json#exports`: `.` maps to `./dist/index.d.ts`, `./dist/index.js` (import), `./dist/index.cjs` (require). `./styles` maps to `./dist/index.css`. `./package.json` also exported.
- `src/index.ts` is the public entry. Exports components (`SnowCanvas`, `SnowAccumulation`, `SnowControls`), hooks (`useSnow`), store accessor (`useSnowStore`), types (e.g. `SnowConfig`, `SnowflakeConfig`, `StuckSnowflake`, `SnowPreset`, `SnowIntensity`, `SnowTheme`), `presets` (intensity/themes), and `createSnowConfig()`. Styles are imported via `import "./index.css"` in the entry.

## Demo, Storybook, docs

- Demo uses Vite: `npm run demo` (dev on port 3000), `npm run build:demo` writes `dist-demo/`, `npm run preview:demo`. `vite.demo.config.ts` sets `base: "/snowfall/"` for GitHub Pages. Demo source is in `demo/` (imports from `../src`).
- Storybook: `npm run storybook` (port 6006), `npm run build-storybook`. Stories live under `src/**/*.stories.*` and `docs/**/*.mdx`. Vitest/browser integration configured via `@storybook/addon-vitest` (`.storybook/vitest.setup.ts`, vitest a11y test currently set to `todo`).
- Docs deployment (`.github/workflows/deploy-docs.yml`): on push to `master`, builds demo + Storybook, moves `storybook-static` to `dist-demo/storybook/`, deploys `dist-demo` to `gh-pages`.

## Code architecture (high-signal)

- `src/lib/snow-engine.ts` (canvas particle engine) + `src/lib/collision-detector.ts` (DOM element collision for accumulation).
- `src/stores/snow-store.ts` (Zustand) manages state (flakes, stuck flakes, config). `src/hooks/useSnow.ts` wraps store access.
- `src/components/`: `SnowCanvas.tsx` renders the canvas overlay and drives the engine; `SnowAccumulation.tsx` marks elements for accumulation; `SnowControls.tsx` provides runtime UI controls. Stories co-located with components.
- Tailwind v4 is used (`tailwind.config.ts` scans src/demo/docs/storybook; PostCSS via `@tailwindcss/postcss`). `src/index.css` imports Tailwind.

## Testing & release

- Tests are currently disabled (scripts echo stubs). Vitest + `@vitest/browser` + Playwright are installed but no actual test files exist in src; build excludes `*.test.*`/`*.spec.*`. Do not assume running `npm test` executes real tests.
- Releases use Changesets (`.changeset/config.json`, changelog via `@changesets/changelog-github`, base branch `master`, publishes to public npm registry). Publishing happens on tag push (`v*`) via `.github/workflows/publish.yml`, or via manual release workflow which bumps version, commits, tags, then publishes. `.npmignore` excludes source, configs, stories, docs, etc (only `dist/`, `README.md`, `LICENSE` ship).
- CI validates on push/PR to `master` (Node 20). CodeQL runs on `master` and schedule.

## Practical notes

- CSS is a separate build artifact; consumers can import `@openflygroup/snowfall/styles` (or rely on the entry importing CSS). The library is designed as ESM-first with dual CJS/ESM.
- Peer deps: `react >=18.0.0`, `react-dom >=18.0.0`, `zustand >=4.0.0`. Externalized in build.
- When editing, prefer reading the engine/store/components to understand wiring rather than guessing; trust executable config (tsup/vite/eslint/tsconfig/package.json) over prose if conflicting. Keep changes minimal and pass `npm run ci` before committing.
