# Tooltip

Hover tooltip wrapping any element.

```tsx
import { Tooltip } from "fg-design";

<Tooltip content="Save your changes">
  <Button size="icon"><Save className="h-4 w-4" /></Button>
</Tooltip>

<Tooltip content="Only admins can edit this" side="right">
  <span><Input label="Role" disabled /></span>
</Tooltip>
```

## Props

| Prop            | Type                             | Default  |
| --------------- | -------------------------------- | -------- |
| `content`       | `ReactNode`                      | required |
| `side`          | `top \| bottom \| left \| right` | `top`    |
| `delayDuration` | `number` (ms)                    | `400`    |
| `children`      | `ReactNode`                      | required |

## Notes

- `children` must be a single focusable element (or wrapped in a `<span>` if not)
- Disabled buttons don't receive pointer events — wrap in `<span>` to make the tooltip work:
  ```tsx
  <Tooltip content="No permission">
    <span>
      <Button disabled>Delete</Button>
    </span>
  </Tooltip>
  ```
- Tooltip is always rendered at `--z-tooltip` (600) — above everything else
