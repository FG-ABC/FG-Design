# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Storybook dev server at localhost:6006
npm run build        # tsup bundle → dist/ (+ postbuild copies CSS)
npm run lint         # TypeScript type-check (no emit)
npm run build:storybook  # Static Storybook build
npm publish --access public  # Publish to npm (run build first)
```

## Architecture

### Package identity

`@fgd/ui` is a pure component library — no app, no pages. Storybook is the only runtime environment during development. The build pipeline has two separate paths:

- **tsup** → publishable npm package (`dist/`)
- **Vite + @tailwindcss/vite** → Storybook dev server only (not used for the package build)

### Design token system

All visual decisions originate in `src/styles/tokens.css` as a Tailwind v4 `@theme` block. Token names (`--color-accent-500`, `--radius-md`, `--shadow-sm`, etc.) are used directly in component classes via Tailwind arbitrary values: `bg-[var(--color-accent-500)]`. Never hardcode hex values or raw pixel values in components — always reference a token.

`src/styles/globals.css` just imports `tokens.css`. Consumers do `@import "@fgd/ui/styles"` once in their app entry to get all tokens and base styles.

### Component pattern

Every component follows the same structure:
- **CVA** (`class-variance-authority`) for variant/size logic
- **`React.forwardRef`** on every component
- **Radix UI primitive** as the accessible base (where applicable)
- **`asChild` via `@radix-ui/react-slot`** for polymorphic usage
- **`cn()`** from `src/lib/utils.ts` for class merging

```
src/components/<category>/<name>/
├── <name>.tsx    ← component + CVA definition
└── index.ts      ← named re-exports
```

Category `index.ts` files re-export all components in that folder. `src/index.ts` re-exports all four categories plus `cn`.

### Path aliases

`@/lib/*`, `@/components/*`, `@/styles/*` resolve to `src/lib/`, `src/components/`, `src/styles/`. Configured in `tsconfig.json` (for editor/tsc) and in `vite.config.ts` (for Storybook). tsup resolves them via esbuild natively.

### Stories

`stories/` mirrors `src/components/` by category. Stories import directly from `@/components/<category>/<name>` (not from the barrel). Every story file should have `tags: ["autodocs"]` and at minimum a default story + an all-variants story.

### Publishing

The `"files"` field in `package.json` is the allowlist — only `dist/` ships. The `exports` map exposes two entry points:
- `"."` → JS components
- `"./styles"` → `dist/styles/globals.css`

React and Tailwind are peer deps. All Radix primitives, CVA, clsx, tailwind-merge, cmdk, sonner, lucide-react are bundled deps (consumers don't manage them).
