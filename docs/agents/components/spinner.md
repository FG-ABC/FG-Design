# Spinner

Circular indeterminate loading indicator. Use for full-area loading states while data fetches.

## Minimal example

```tsx
import { Spinner } from "@fg-abc/ui";

<Spinner size="lg" label="Loading..." />
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `size` | `sm \| md \| lg` | `md` | sm=16px, md=32px, lg=48px |
| `label` | `string` | — | Rendered below spinner; sr-only if omitted |

## Decision rules

- Use `size="lg"` for full-page loading states.
- Use `size="sm"` for inline / card loading, or inside a `Button`.
- For skeleton-shaped placeholders prefer `Skeleton` instead.
- For background refetch indicators (e.g. above a table) prefer `LinearProgress`.
