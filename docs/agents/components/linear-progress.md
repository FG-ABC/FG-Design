# LinearProgress

Horizontal indeterminate progress bar. Use above data tables or content areas to indicate background refetching — less disruptive than a spinner overlay.

## Minimal example

```tsx
import { LinearProgress } from "fg-design";

<LinearProgress visible={isFetching} />
<DataGrid ... />
```

## Props

| Prop      | Type      | Default | Notes                                            |
| --------- | --------- | ------- | ------------------------------------------------ |
| `visible` | `boolean` | `true`  | Renders nothing when false — layout stays stable |

## Decision rules

- Use above tables/lists when data is refetching in the background.
- Use `Spinner` when the whole area is blocked waiting for initial data.
- Use `Progress` (the determinate bar) when you have a known completion value.
