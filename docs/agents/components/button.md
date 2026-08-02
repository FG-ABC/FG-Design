# Button

General-purpose action trigger.

```tsx
import { Button } from "fg-design";

<Button>Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Close</Button>
<Button variant="danger">Delete</Button>
<Button variant="link">Learn more</Button>
```

## Variants

| `variant`           | When to use                          |
| ------------------- | ------------------------------------ |
| `primary` (default) | Main CTA on a surface                |
| `outline`           | Secondary action alongside a primary |
| `ghost`             | Tertiary, icon-only, toolbar buttons |
| `danger`            | Destructive actions                  |
| `link`              | Inline text links                    |

## Sizes

`sm` / `md` (default) / `lg` / `icon`

```tsx
<Button size="sm">Compact</Button>
<Button size="icon"><Trash2 className="h-4 w-4" /></Button>
```

## Loading state

Disables the button and shows a spinner. Keep `children` — it's used for accessible label.

```tsx
<Button loading>Saving…</Button>
```

## Polymorphic (`asChild`)

Renders as whatever child you pass. Use for router links. Pass exactly one child element — `asChild` delegates to Radix `Slot`, which requires a single React element child.

```tsx
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>

// Next.js
<Button asChild size="sm">
  <Link href="/dashboard">Dashboard</Link>
</Button>
```

`loading` is ignored when `asChild` is true — the child element manages its own layout.

## Props

| Prop       | Type                                            | Default   |
| ---------- | ----------------------------------------------- | --------- |
| `variant`  | `primary \| outline \| ghost \| danger \| link` | `primary` |
| `size`     | `sm \| md \| lg \| icon`                        | `md`      |
| `loading`  | `boolean`                                       | `false`   |
| `asChild`  | `boolean`                                       | `false`   |
| `disabled` | `boolean`                                       | —         |
