# StatCard

KPI / metric display with optional trend delta and icon.

```tsx
import { StatCard } from "@fg-abc/ui";
import { Users, DollarSign } from "lucide-react";

// Basic
<StatCard label="Total users" value="12,430" />

// With positive delta
<StatCard label="Revenue" value="$84,200" delta={8.2} deltaLabel="vs last month" />

// With negative delta
<StatCard label="Churn" value="3.1%" delta={-0.4} deltaLabel="vs last month" />

// With icon
<StatCard label="Active users" value="8,291" icon={<Users className="h-5 w-5" />} />

// All together
<StatCard
  label="MRR"
  value="$12,400"
  delta={5.3}
  deltaLabel="vs last month"
  icon={<DollarSign className="h-5 w-5" />}
/>
```

## In a grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <StatCard label="Users" value="12,430" delta={8.2} />
  <StatCard label="Revenue" value="$84,200" delta={-2.1} />
  <StatCard label="Churn" value="1.4%" delta={-0.3} />
  <StatCard label="NPS" value="72" delta={4} />
</div>
```

## Props
| Prop | Type | Default |
|---|---|---|
| `label` | `string` | required |
| `value` | `ReactNode` | required |
| `delta` | `number` | — |
| `deltaLabel` | `string` | — |
| `icon` | `ReactNode` | — |

## Notes
- Positive `delta` → green with TrendingUp icon
- Negative `delta` → red with TrendingDown icon
- Icon is displayed in a small `--color-accent-50` box — use a 20px Lucide icon
- `value` accepts `ReactNode` — you can pass a `Badge` or formatted number
