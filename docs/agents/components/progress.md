# Progress

Horizontal progress bar.

```tsx
import { Progress } from "fg-design";

<Progress value={65} />
<Progress value={100} color="success" />
<Progress value={30} color="warning" />
<Progress value={10} color="danger" />
<Progress value={50} size="sm" />
<Progress value={50} size="lg" />
```

## Props

| Prop    | Type                                     | Default  |
| ------- | ---------------------------------------- | -------- |
| `value` | `number` (0–100)                         | `0`      |
| `color` | `accent \| success \| warning \| danger` | `accent` |
| `size`  | `sm \| md \| lg`                         | `md`     |

## Notes

- `value` is a percentage (0–100), not a fraction
- Use `color="success"` at 100%, `color="warning"` for near-limit states, `color="danger"` for over-limit
- For a labeled progress use `StatCard` with a `Progress` inside `value`:
  ```tsx
  <StatCard
    label="Storage used"
    value={
      <div className="flex flex-col gap-2">
        <span>6.4 GB / 10 GB</span>
        <Progress value={64} color="warning" size="sm" />
      </div>
    }
  />
  ```
