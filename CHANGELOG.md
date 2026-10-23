# Changelog

All notable changes to @ncco/ui will be documented here.
Versioning follows [Semantic Versioning](https://semver.org/).

## [0.3.3] - 2026-10-23

### Added
- `Checkbox` — Radix-based, NCCO tokens. Checked, disabled, and `aria-invalid`
  states; compose inside `Field`/`FieldLabel` for the bordered selection layout.
- `Select` — Radix-based. `default`/`sm` trigger sizes, placeholder, groups,
  labels, separators, and all trigger states (focus, disabled, invalid).
- `DropdownMenu` — Radix-based. Items, checkbox/radio items, labels, separators,
  shortcuts, submenus, and a `destructive` item variant.

### Notes
- `Select` and `DropdownMenu` portal their content to `document.body`.
  Consumers coexisting with global CSS should portal into a `.ncco-ui`-scoped
  container so scoped styles reach the floating panel.

## [0.3.2] - 2026-10-21

### Fixed

- Border radius not rendering on components that use arbitrary radius values
  (e.g. Button's `rounded-[min(var(--radius-md),8px)]`). Under `prefix(tw)`,
  variables declared in `@theme` are emitted as `--tw-*`, so the unprefixed
  `--radius-*` names referenced literally in component class strings never
  resolved. Fixed by declaring the `--radius-*` scale in the `:root` block
  (literal, unaffected by the prefix) rather than in `@theme`.


## [0.3.1] - 2026-10-20

### Fixed

- Border radius not rendering on components that use arbitrary radius values
  (e.g. Button). Moved the `--radius-*` scale out of `@theme inline` into a
  plain `@theme` block so the variables are emitted to `:root` and resolve at
  runtime.

## [0.3.0] - 2026-10-20

### Changed

- **BREAKING:** The library now ships its own compiled CSS. Consumers must
  `import "@ncco/ui-alpha/css"` once at their app root; previously the library
  relied on the consuming app's Tailwind to generate component styles. See
  [Migrating to 0.3.0](./README.md#migrating-to-030-breaking).
- **BREAKING:** All component utilities are now namespaced with a `tw:` prefix,
  so they cannot collide with host CSS (e.g. Bootstrap/Argon). Components
  rendered without the compiled stylesheet appear unstyled (no build error).
- Scoped the base layer (`background`, `text`, `font`, default `border`/`outline`
  color) under `.ncco-ui` so the library's reset stops at the boundary and never
  touches the host's `body`/`html`.
- `cn()` now uses a prefix-aware `tailwind-merge` so conflicting `tw:`-prefixed
  classes merge correctly.

### Added

- `./css` package export — the full compiled stylesheet (tokens + prefixed
  utilities + component base).
- Components: Badge, Card, Chart, Field, Input, Label, MetricCard, Progress,
  Separator, Table.

### Removed

- The Bootstrap/Argon CSS compatibility shim is no longer required and has been
  removed from the docs. The `tw:` prefix makes collisions impossible, so the
  per-element `!important` overrides are obsolete. Consumers should delete the
  shim, the token redefinition block, and any Tailwind `@source` pointing at the
  library when upgrading.

### Migration

1. Add `import "@ncco/ui-alpha/css";` at your app root.
2. Render components inside a `.ncco-ui` element.
3. Remove any Tailwind `@source`/`content` entry for `@ncco/ui-alpha`, any
   redefinition of design tokens, and the Bootstrap/Argon shim.

[0.3.0]: https://nccoit.visualstudio.com/Department%20Planning/_artifacts/feed/xperimental.ncco-ui/Npm/@ncco%2Fui-alpha/overview/

## [0.2.5] - 2026-06-02

### Added
- `Table` component family — `Table`, `TableHeader`, `TableBody`,
  `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`
- No dark mode classes — token-ready out of the box
- Storybook stories: Default, WithCaption, WithFooter,
  DevicesTable, AgreementsTable
- Note: dark table header treatment (as seen in dashboard design)
  is applied at the consuming app level via className passthrough

## [0.2.4] - 2026-06-02

### Added
- `MetricCard` component — composes Card, ChartContainer, PieChart
- Supports title, value, donut percentages, trend indicator, icon, size
- `MetricCardProps` and `MetricCardTrend` types exported
- Storybook stories including DashboardRow dashboard composition

## [0.2.3] - 2026-06-02

### Added
- `Chart` component infrastructure — `ChartContainer`, `ChartTooltip`,
  `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle`
- Built on Recharts via shadcn/ui, dark mode stripped
- Exports `ChartConfig` type
- Storybook stories including DonutMetricCard dashboard composition

## [0.2.2] - 2026-06-02

### Added
- `Progress` component — Radix UI primitive with primary and destructive variants
- Storybook stories including DashboardUsage showing subscription renewal states

## [0.2.1] - 2026-05-29

### Added
- `Badge` component with 6 variants: default, secondary,
  destructive, outline, ghost, link
- `badgeVariants` exported from `badge.variants.ts`
- Storybook stories including AllVariants and DashboardUsage

## [0.2.0] - 2026-05-29

### Added
- `Card` component family — `Card`, `CardHeader`, `CardTitle`,
  `CardDescription`, `CardAction`, `CardContent`, `CardFooter`
- Storybook stories for all Card variants including DashboardCard

### Changed
- Cleaned up `App.css` — removed Vite starter boilerplate

## [0.1.9] - 2026-05-13

### Added
- `Input` component — text, password, and file variants with full state
  support (default, filled, disabled, invalid)
- `Field` component family — `Field`, `FieldLabel`, `FieldDescription`,
  `FieldError`, `FieldGroup`, `FieldLegend`, `FieldSeparator`,
  `FieldSet`, `FieldContent`, `FieldTitle`
- `Label` and `Separator` as supporting primitives
- Storybook stories for `Input` and `Field` covering all states
- NCCO brand theming in Storybook (sidebar logo, favicon, primary color)

### Changed
- Stripped dark mode classes from `Input`, `Field`, and `Button`
- Updated `index.ts` with all new component exports

### Fixed
- `buttonVariants` Fast Refresh incompatibility — moved to `button.variants.ts`

## [0.1.8] - 2026-05-10

### Changed
- Changed outline Button from ring to --primary
- Updated outline Button hover state to fill --primary and text to --background

## [0.1.7] - 2026-05-08

### Fixed
- destructive-foreground-light updated from blushed-brick/50 to base/white (#ffffff)
- destructive-foreground-dark updated from neutral/50 to base/white (#ffffff)
- Resolves WCAG AA contrast violation on Destructive button variant (4.43 → 4.56 ratio)
- Fix applied via Figma token update → Style Dictionary pipeline → published package
- Button destructive variant now uses text-destructive-foreground instead of text-primary-foreground
- Added --destructive-foreground to :root and @theme inline in index.css
- Full token chain now resolves: text-destructive-foreground → base/white (#ffffff)
- Resolves WCAG AA contrast violation on Destructive variant — 0 violations across all variants

## [0.1.6] - 2026-05-07

### Added
- Published to Azure Artifacts — xperimental.ncco-ui feed (nccoit organization)
- publishConfig added to package.json pointing to Azure Artifacts registry
- .npmrc configured for Azure Artifacts authentication (gitignored)
- CRA + Bootstrap/Argon compatibility shim documented in README
- Full CRA legacy setup section added to README including .ncco-ui wrapper strategy
- Dark mode :root.dark variable block added to Vite setup in README
- Azure Artifacts install instructions added to README consuming guide

### Changed
- README fully rewritten to reflect current project state
- Token file names updated in README: ncco-primitives.json and ncco-semantic.json
- CSS variable names corrected throughout README to match generated --ncco-colors-* format
- Component status table updated to v0.1.5 with full test coverage documented
- Project structure in README updated to reflect current file layout
- Destructive background active state modified (distructive/90)
- Secondary background active state modified (secondary/90)

### Fixed
- copy:styles script rewritten using Node.js fs module for cross-platform compatibility
- Replaces Unix cp command which fails on Windows

### Notes
- Destructive foreground contrast fix (neutral.50 → base.white) intentionally held for pipeline demo
- CRA compatibility shim is documented technical debt — removed entirely on Vite migration

## [0.1.5] - 2026-04-22

### Changed
- Modified peerDependencies react and react-dom to accept ^18.0.0

### Notes
- Known risk documented: accepting v18 could risk compatibility issues
- Potentially will change back to requiring v19 in the future if consuming projects upgrade to vite/react 19+

## [0.1.4] - 2026-04-21

### Added
- Interaction tests for all Button variants: Default, Secondary, Destructive, Disabled
- data-variant attribute assertions confirming correct variant prop applied to DOM
- Accessibility audit complete — 0 violations across all variants except Destructive
- Destructive contrast violation (4.43 ratio, requires 4.5) intentionally retained for demo purposes
- Known issue documented: destructive-foreground-light should reference base.white not neutral.50

## [0.1.3] - 2026-04-17

### Changed
- Migrated token pipeline to new NCCO design system structure
- Replaced primitive.json and semantic.json with ncco-primitives.json and ncco-semantic.json
- New primitive palette: charcoal-blue, blushed-brick, soft-green, emerald, teal, neutral, base
- New semantic layer mirrors Figma NCCO Semantic collection with light/dark aliases
- Removed redundant font-weight group from ncco-semantic.json to resolve Style Dictionary collisions
- Token pipeline now resolves three-layer chain: primitives → semantic → CSS variables
- Light and dark mode CSS variables fully wired to ncco-semantic tokens
- @theme inline references :root variables for correct dark mode switching
- Font variable updated to ncco-font-font-sans-condensed
- Circular font reference resolved
- All sidebar, chart, and component tokens wired

### Notes
- spacing.json, radius.json, and typography.json retained as separate files
- Figma number tokens (unitless) will be handled via custom Style Dictionary transform in a future optimization pass

## [0.1.1] - 2026-04-06

### Fixed
- TypeScript declaration files now correctly export Button and buttonVariants
- Added styles.d.ts declaration for @ncco/ui-alpha/styles side-effect import
- Resolved vite-plugin-dts path alias resolution issue via tsconfigPath option
- types condition moved before import/require in package.json exports field

### Added
- Consumption setup documented in README
- @source directive guidance for Tailwind v4 consuming projects

## [0.1.0] - 2026-03-18

### Added
- Button component: Default, Secondary, Outline, Ghost, Destructive, Link variants
- Button sizes: xs, sm, default, lg, icon, icon-xs, icon-sm, icon-lg
- NCCO design token pipeline: Tokens Studio → Style Dictionary → CSS variables
- Color tokens: Jungle, Charcoal, Tomato, Neutral primitive and semantic scales
- Open Sans as primary typeface
- shadcn/ui as component base with Radix UI primitives
- Lucide React as icon library

#### Infrastructure
- Vite + React + TypeScript project scaffold
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- shadcn/ui initialized with Radix UI base and custom preset
- Path alias configured (`@/` → `src/`)
- Vite library mode configured via `vite.lib.config.ts` (separate from dev/test config)
- Dual module output: ES (`ncco-ui.es.js`) and CJS (`ncco-ui.cjs.js`)
- Storybook 10 configured with `@storybook/react-vite`, a11y, docs, and Vitest addons
- Vitest + Playwright browser testing configured

#### Token Pipeline
- Style Dictionary v5 configured via `sd.config.js`
- Token source files: `primitive.json`, `semantic.json`, `spacing.json`, `radius.json`, `typography.json`
- Full primitive token set: Jungle, Charcoal, Tomato, Neutral color palettes
- Full semantic token set: base colors, focus states, spacing scale, border radius, typography
- Token output: `src/styles/tokens.css` (auto-generated, do not edit directly)
- All tokens prefixed with `--ncco-*` for namespace safety
- `npm run tokens` script to regenerate token output from source files
- `npm run build:lib` script to produce distributable `dist/` output including `tokens.css`

#### Typography
- Barlow Semi Condensed loaded via `@fontsource/barlow-semi-condensed` (weights: 400, 500, 600, 700)
- Font family token: `--ncco-font-family-sans: 'Barlow Semi Condensed'`
- Applied globally via `@layer base`

#### Components
- `Button` component — shadcn/ui base with Radix UI Slot primitive
  - Variants: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`
  - Sizes: `xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`
  - All styles reference NCCO design tokens via CSS custom properties
  - Fully typed with TypeScript and CVA (class-variance-authority)

#### Storybook Stories
- `button.stories.tsx` — individual stories for all variants and states
- Stories: Default, Secondary, Outline, Ghost, Destructive, Link, Disabled, Sizes, AllVariants
- `tags: ['autodocs']` enabled for auto-generated documentation page
- Background presets configured: light, subtle, dark

#### Package Configuration
- Package name: `@ncco/ui-alpha`
- Version: `0.1.0`
- `react` and `react-dom` set as peer dependencies
- `exports` field configured for ES and CJS consumption
- `files` field scoped to `dist/` only