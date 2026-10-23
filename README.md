# @ncco/ui-alpha

NCCO's internal React component library. Built on [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/), styled with NCCO design tokens, and distributed as a private package via Azure Artifacts.

> **Alpha** — This library is under active development. APIs may change before `v1.0.0`.

---

## Stack

- **React 18/19** + **TypeScript**
- **Vite** — development and library build
- **Tailwind CSS v4** — utilities namespaced with a `tw:` prefix, shipped as compiled CSS
- **shadcn/ui** — component base (copy-paste model)
- **Radix UI** — accessible primitives
- **Style Dictionary v5** — design token pipeline
- **Storybook 10** — component development and documentation
- **Barlow Semi Condensed** — primary typeface
- **Azure Artifacts** — private package registry (`xperimental.ncco-ui` feed)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Azure DevOps access to `nccoit` organization

### Install dependencies

```bash
npm install
```

### Run Storybook

```bash
npm run storybook
```

### Run dev app

```bash
npm run dev
```

---

## Styling model

As of `0.3.0`, the library is **self-contained**: it ships its own compiled CSS. You do **not** configure Tailwind, scan `node_modules`, or redefine any design tokens in your app.

- **Compiled CSS** — `@ncco/ui-alpha/css` contains the design tokens, all component styles, and the base layer. Import it once at your app root.
- **`tw:` prefix** — every Tailwind utility the components use is namespaced `tw:` (`tw:flex`, `tw:p-4`, `tw:bg-primary`). This makes collisions with other global CSS on the page (e.g. Bootstrap/Argon) impossible rather than merely unlikely — prefixed class names don't overlap, so there's no cascade fight, not even against `!important` utilities.
- **`.ncco-ui` boundary** — the base reset (background, text color, font, default border/outline color) is scoped under `.ncco-ui`. Render components inside an element carrying that class so they pick up the design-system base and so the reset never leaks into the host.
- **Tokens-only** — `@ncco/ui-alpha/styles` exposes just the CSS variables (no utilities, no base layer) for consumers who want the palette without the component styles.

---

## Token Pipeline

Design tokens flow from Figma through Style Dictionary into CSS custom properties consumed by all components. Tokens are the single source of truth — no hardcoded color, spacing, or radius values exist anywhere in the component code.

```
Figma Variables (Tokens Studio) → JSON Export → Style Dictionary → tokens.css → Components
```

### Token collections (Figma)

| Collection      | Purpose                                                                                |
| --------------- | -------------------------------------------------------------------------------------- |
| NCCO Primitives | Raw palette values — charcoal-blue, blushed-brick, soft-green, emerald, teal, neutral  |
| NCCO Semantic   | Contextual aliases — primary-light/dark, destructive-light/dark, sidebar, chart tokens |

### Regenerate tokens

```bash
npm run tokens
```

Token source files live in `tokens/`. The output file `src/styles/tokens.css` is auto-generated — do not edit it directly.

### Token files

| File                          | Contents                                                          |
| ----------------------------- | ----------------------------------------------------------------- |
| `tokens/ncco-primitives.json` | Raw NCCO color palette exported from Figma Tokens Studio          |
| `tokens/ncco-semantic.json`   | Semantic aliases with light and dark variants exported from Figma |
| `tokens/spacing.json`         | Spacing scale primitives (dimension-typed with px units)          |
| `tokens/radius.json`          | Border radius primitives (dimension-typed with px units)          |
| `tokens/typography.json`      | Font family, size, weight, and line height primitives             |

### Token naming convention

All generated CSS variables are prefixed with `--ncco-` for namespace safety:

```css
/* Primitives */
--ncco-colors-charcoal-blue-800: #133341;
--ncco-colors-blushed-brick-800: #cb4749;

/* Semantics */
--ncco-colors-primary-light: var(--ncco-colors-charcoal-blue-800);
--ncco-colors-destructive-light: var(--ncco-colors-blushed-brick-800);

/* Spacing / Radius / Typography */
--ncco-spacing-4: 16px;
--ncco-radius-6: 6px;
--ncco-font-font-sans-condensed: Barlow Semi Condensed;
```

---

## Building the Library

```bash
npm run build:lib
```

Outputs to `dist/`:

| File             | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `ncco-ui.es.js`  | ES module build                                                                                                     |
| `ncco-ui.cjs.js` | CommonJS build                                                                                                      |
| `ncco-ui.css`    | **Full compiled stylesheet** — tokens + prefixed utilities + component base. Self-contained; consumers import this. |
| `index.d.ts`     | TypeScript declarations                                                                                             |
| `styles.d.ts`    | TypeScript declaration for the styles side-effect import                                                            |
| `tokens.css`     | Design token CSS variables only (no utilities)                                                                      |

---

## Publishing to Azure Artifacts

### Setup

Create a `.npmrc` file in the project root (gitignored):

```
registry=https://nccoit.pkgs.visualstudio.com/23fa59eb-54d0-4673-a6bc-c9bbe129f41b/_packaging/xperimental.ncco-ui/npm/registry/
always-auth=true
```

Authenticate using a Personal Access Token with Packaging Read & Write scope:

```bash
npm install -g vsts-npm-auth
vsts-npm-auth -config .npmrc
```

> If `vsts-npm-auth` is unavailable (non-Windows, or not installed), add the token directly to your **user** `~/.npmrc` as a base64-encoded `_password` for the feed — never commit a token to the project `.npmrc`.

### Publish

```bash
npm run build:lib
npm publish
```

---

## Consuming This Package

### 1. Point `@ncco` at the feed

Add a `.npmrc` to your consuming project root:

```
@ncco:registry=https://nccoit.pkgs.visualstudio.com/23fa59eb-54d0-4673-a6bc-c9bbe129f41b/_packaging/xperimental.ncco-ui/npm/registry/
always-auth=true
```

### 2. Install

```bash
npm install @ncco/ui-alpha
```

### 3. Import the stylesheet once, at your app root

```ts
import "@ncco/ui-alpha/css";
```

This is the full compiled stylesheet — tokens, component styles, and base layer. No Tailwind setup, no `@source`, no token redefinition required.

### 4. Render components inside `.ncco-ui`

```tsx
import { Button } from "@ncco/ui-alpha";

<div className="ncco-ui">
  <Button variant="default">Add New User</Button>
  <Button variant="destructive">Remove Users</Button>
</div>;
```

That's the entire integration. If you hand-write your own Tailwind utilities intended to match the library, prefix them with `tw:` as well.

---

### Coexisting with legacy global CSS (Bootstrap / Argon)

Because every library utility is `tw:`-prefixed and the base reset is scoped under `.ncco-ui`, the library can run alongside Bootstrap/Argon with **no shim and no per-element overrides**. There are no shared class names to collide, so Bootstrap's `!important` utilities are irrelevant to the library's styles.

Recommended host setup when a global framework is still present:

1. Import `@ncco/ui-alpha/css` at the app root.
2. If you author your own utilities in converted markup, give your host Tailwind a `tw:` prefix too, so host and library share one namespace and neither collides with Bootstrap.
3. Render library components (and any converted markup) inside `.ncco-ui`.
4. For modals/portals that render to `document.body` (outside `.ncco-ui`), portal into a container that itself carries `.ncco-ui`, so scoped styles still reach them.

> **Removed in 0.3.0:** earlier versions required a CSS compatibility shim — a block of `.ncco-ui .bg-primary { … !important }` overrides — to beat Bootstrap's `!important` utilities, plus a full redefinition of design tokens and a Tailwind `@source` pointing at the library bundle. None of that is needed anymore. Delete the shim and the token/`@source` block when upgrading.

---

### Migrating to 0.3.0 (breaking)

`0.3.0` changes how styles are delivered. Previously the library relied on the consuming app's Tailwind to generate component styles from scanned class names. It now ships its own compiled, `tw:`-prefixed CSS.

**To upgrade:**

1. Add `import "@ncco/ui-alpha/css";` once at your app root.
2. Render components inside a `.ncco-ui` element.
3. Remove any Tailwind `@source`/`content` entry pointing at `@ncco/ui-alpha`.
4. Remove any redefinition of `--primary`, `--background`, etc. and any `@theme inline` block you added for the library — the compiled CSS carries its own tokens.
5. Remove the Bootstrap/Argon compatibility shim if you had one.

Without step 1, components render **unstyled** (no build error — the old class names no longer match, and the new ones aren't present until the stylesheet is imported).

---

## Components

```tsx
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  Input,
  Label,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
  Separator,
  Progress,
  MetricCard,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  Checkbox,
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel,
  SelectSeparator, 
  SelectTrigger, 
  SelectValue,
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuCheckboxItem,
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent, 
  DropdownMenuSubTrigger, 
  DropdownMenuTrigger,
} from "@ncco/ui-alpha";
```

### Button

```tsx
import { Button } from '@ncco/ui-alpha'

<Button variant="default">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Link</Button>
```

#### Props

| Prop       | Type                                                                 | Default   | Description                             |
| ---------- | -------------------------------------------------------------------- | --------- | --------------------------------------- |
| `variant`  | `default \| secondary \| outline \| ghost \| destructive \| link`    | `default` | Visual style                            |
| `size`     | `xs \| sm \| default \| lg \| icon \| icon-xs \| icon-sm \| icon-lg` | `default` | Button size                             |
| `disabled` | `boolean`                                                            | `false`   | Disables the button                     |
| `asChild`  | `boolean`                                                            | `false`   | Renders as child element via Radix Slot |

---

## Project Structure

```
ncco-ui/
├── .storybook/               # Storybook configuration
├── dist/                     # Built library output (generated)
├── src/
│   ├── components/
│   │   └── ui/               # Components + their .stories.tsx
│   ├── lib/
│   │   └── utils.ts          # cn() — prefix-aware tailwind-merge
│   ├── styles/
│   │   └── tokens.css        # Auto-generated — do not edit
│   ├── index.css             # Tailwind entry (prefix(tw)), :root/@theme, base layer
│   ├── styles.d.ts           # Type declaration for styles import
│   └── index.ts              # Public API exports (imports index.css)
├── tokens/
│   ├── ncco-primitives.json  # NCCO color primitives (Figma export)
│   ├── ncco-semantic.json    # NCCO semantic tokens (Figma export)
│   ├── spacing.json          # Spacing scale
│   ├── radius.json           # Border radius scale
│   └── typography.json       # Typography scale
├── CHANGELOG.md
├── sd.config.js              # Style Dictionary configuration
├── vite.config.ts            # Dev + Storybook + test config
└── vite.lib.config.ts        # Library build config (separate to avoid conflicts)
```

---

## Versioning

This library follows [Semantic Versioning](https://semver.org/). While pre-`1.0.0`, the **minor** slot carries breaking changes (per the SemVer `0.y.z` convention):

- **PATCH** `0.x.Y` — backwards-compatible changes: bug fixes, new components, new variants
- **MINOR** `0.X.0` — **breaking changes** (integration, styling model, or component API)
- **MAJOR** `X.0.0` — reserved for the first stable release and breaking changes thereafter

> `0.3.0` was a breaking change: the library moved to compiled, `tw:`-prefixed CSS and a required `@ncco/ui-alpha/css` import. See [Migrating to 0.3.0](#migrating-to-030-breaking).

See [CHANGELOG.md](./CHANGELOG.md) for full version history.

---

## Contributing

This library follows the NCCO Design–Development Process Standard. All component work requires:

1. **Gate 1A** — Complete requirements brief approved by PM and PO
2. **Gate 1B** — Figma component approved by stakeholders before handoff
3. **Gate 2** — Inspectable Figma link with Dev Mode enabled, token export confirmed
4. **Gate 3** — UX Review catches implementation drift only — scope changes become new tickets

---

## Component Status

| Component  | Status      | Storybook | A11y              | Interaction Tests | Version |
| ---------- | ----------- | --------- | ----------------- | ----------------- | ------- |
| Button     | ✅ Complete | ✅        | ✅ 0 violations\* | ✅ All variants   | 0.1.6   |
| Badge      | ✅ Complete | ✅        | —                 | —                 | 0.3.0   |
| Card       | ✅ Complete | ✅        | —                 | —                 | 0.3.0   |
| Chart      | ✅ Complete | ✅        | —                 | —                 | 0.3.0   |
| Field      | ✅ Complete | ✅        | —                 | —                 | 0.3.0   |
| Input      | ✅ Complete | ✅        | —                 | —                 | 0.3.0   |
| Label      | ✅ Complete | ✅        | —                 | —                 | 0.3.0   |
| MetricCard | ✅ Complete | ✅        | —                 | —                 | 0.3.0   |
| Progress   | ✅ Complete | ✅        | —                 | —                 | 0.3.0   |
| Separator  | ✅ Complete | ✅        | —                 | —                 | 0.3.0   |
| Table      | ✅ Complete | ✅        | —                 | —                 | 0.3.0   |
| Checkbox   | ✅ Complete | ✅        | ✅               | ✅ Core (toggle/disabled) | 0.3.2 |
| Select     | ✅ Complete | ✅        | ✅                | ✅ Core (select option) | 0.3.2 |
| DropdownMenu | ✅ Complete | ✅      | ✅               | ✅ Core (opens)   | 0.3.2   |

\*Destructive variant has 1 known contrast violation (4.43 ratio, requires 4.5:1). Fix: update `destructive-foreground-light` from `neutral.50` to `base.white` in `ncco-semantic.json`.

> A11y and interaction-test columns for components added in `0.3.0` are pending audit — fill in as each is reviewed.

---

_Internal use only — NCCO / National Checking Company_
