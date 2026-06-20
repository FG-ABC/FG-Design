# Tabs

Tabbed navigation for switching between related panels.

```tsx
import { Tabs } from "@fg-abc/ui";

<Tabs
  defaultValue="overview"
  items={[
    { value: "overview", label: "Overview", content: <p>Overview panel</p> },
    { value: "activity", label: "Activity", content: <p>Activity panel</p> },
    { value: "settings", label: "Settings", content: <p>Settings panel</p> },
  ]}
/>
```

## Variants

### `line` (default)
Underline indicator on the active tab. Use inside cards, page headers, or any surface where a border-based nav feels at home.

```tsx
<Tabs variant="line" defaultValue="a" items={items} />
```

### `pill`
Rounded pill buttons on a tinted background. Use for compact in-page toggles or filter-style navigation.

```tsx
<Tabs variant="pill" defaultValue="a" items={items} />
```

### `box`
Solid accent-filled box covering the active tab. High-contrast selection indicator; works in dark mode. Use when you want a bolder, more prominent active state than `line` or `pill`.

```tsx
<Tabs variant="box" defaultValue="a" items={items} />
```

## Controlled

Pass `value` + `onValueChange` to control the active tab from outside.

```tsx
const [tab, setTab] = React.useState("overview");

<Tabs value={tab} onValueChange={setTab} items={items} />
```

## Disabled tabs

Set `disabled: true` on any item.

```tsx
items={[
  { value: "active", label: "Active", content: <p>…</p> },
  { value: "locked", label: "Locked", content: <p>…</p>, disabled: true },
]}
```

## Icons in labels

Pass any `ReactNode` as `label`.

```tsx
import { Settings } from "lucide-react";

items={[
  {
    value: "settings",
    label: (
      <>
        <Settings className="h-3.5 w-3.5" />
        Settings
      </>
    ),
    content: <p>…</p>,
  },
]}
```

## Props

| Prop | Type | Default |
|---|---|---|
| `items` | `TabItem[]` | — (required) |
| `variant` | `line \| pill \| box` | `line` |
| `defaultValue` | `string` | first item's value |
| `value` | `string` | — (controlled) |
| `onValueChange` | `(value: string) => void` | — |
| `listClassName` | `string` | — |

### TabItem

| Field | Type | Notes |
|---|---|---|
| `value` | `string` | Unique key |
| `label` | `ReactNode` | Trigger text or element |
| `content` | `ReactNode` | Panel content |
| `disabled` | `boolean` | Optional |
