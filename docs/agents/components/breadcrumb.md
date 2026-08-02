# Breadcrumb

Navigation trail showing the user's location in a hierarchy.

```tsx
import { Breadcrumb } from "fg-design";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Settings", href: "/settings" },
    { label: "Profile" },
  ]}
/>;
```

## Collapsing long trails

Pass `maxItems` to cap visible crumbs. The first item is always shown; intermediate items collapse into a `…` indicator. The last `maxItems - 1` crumbs are shown after it.

```tsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Org", href: "/org" },
    { label: "Team", href: "/org/team" },
    { label: "Project", href: "/org/team/project" },
    { label: "Settings" },
  ]}
  maxItems={3}
/>
// renders: Home › … › Project › Settings
```

## Custom separator

```tsx
<Breadcrumb
  items={[{ label: "Home", href: "/" }, { label: "Page" }]}
  separator={<span>/</span>}
/>
```

## Decision rules

- Items without `href` render as plain text (no link). Use this for the current page — it gets `aria-current="page"` automatically.
- The last item is always rendered as plain text regardless of whether `href` is provided.
- Use `maxItems` when the trail can grow beyond 4–5 items (e.g. deeply nested file trees).
- In Next.js, use `asChild`-style composition isn't needed here — pass `href` directly; for client-side routing swap to a custom `separator` or wrap items at the callsite if your router requires `<Link>`.

## Props

| Prop        | Type               | Default            |
| ----------- | ------------------ | ------------------ |
| `items`     | `BreadcrumbItem[]` | — (required)       |
| `maxItems`  | `number`           | — (no limit)       |
| `separator` | `ReactNode`        | `<ChevronRight />` |

### BreadcrumbItem

| Field   | Type     | Notes                                |
| ------- | -------- | ------------------------------------ |
| `label` | `string` | Display text                         |
| `href`  | `string` | Optional. Omit for non-linked crumbs |
