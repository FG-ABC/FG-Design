# fg-design — Agent Context

This is the `fg-design` component library. It exports a set of React components built on Radix UI primitives, styled with Tailwind v4 design tokens.

**Start here:** [`docs/agents/index.md`](docs/agents/index.md) — tells you which component to reach for given a use case.

**When adding or modifying a component:**

1. Update `docs/agents/index.md` — add or revise the component's entry under the correct use-case heading (add a new heading if none fits).
2. Update or create `docs/agents/components/<component-slug>.md` — keep the minimal working example, props table, and any decision rules current.
3. If the component introduces new design tokens, update `docs/agents/tokens.md`.
4. Make a story in the storybook

**Rules that apply everywhere:**

- Never hardcode hex colors or raw pixel values. Use design tokens. See [`docs/agents/tokens.md`](docs/agents/tokens.md).
- Import directly from the component path, not the barrel, when inside this repo: `@/components/core/button`
- Consumers import from the package: `import { Button } from "fg-design`
