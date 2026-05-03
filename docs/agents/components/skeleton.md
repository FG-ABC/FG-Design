# Skeleton

Animated loading placeholder. Use during async data fetches.

```tsx
import { Skeleton } from "@fg-abc/ui";

// Rectangle (default) — for cards, images, boxes
<Skeleton className="h-32 w-full" />

// Text line
<Skeleton shape="text" className="w-48" />

// Circle — for avatars
<Skeleton shape="circle" className="h-9 w-9" />
```

## Common patterns

```tsx
// Card skeleton
<div className="flex flex-col gap-3 p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
  <Skeleton shape="text" className="w-32" />
  <Skeleton shape="text" className="w-full" />
  <Skeleton shape="text" className="w-3/4" />
</div>

// Table row skeleton (DataGrid handles this automatically — use loading prop instead)
<div className="flex items-center gap-3">
  <Skeleton shape="circle" className="h-8 w-8" />
  <div className="flex flex-col gap-1.5 flex-1">
    <Skeleton shape="text" className="w-32" />
    <Skeleton shape="text" className="w-48" />
  </div>
</div>
```

## Props
| Prop | Type | Default |
|---|---|---|
| `shape` | `rect \| text \| circle` | `rect` |
| `className` | `string` | — |

## Notes
- Size the skeleton to match the content it replaces — users get a realistic layout preview
- `DataGrid` has a built-in skeleton via its `loading` prop — don't manually render skeletons in table cells
- All shapes use `--color-overlay` with `animate-pulse`
