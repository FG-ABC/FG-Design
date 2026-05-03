# FormRadio

Radio group for mutually exclusive options. Use when there are 2–5 choices that should all be visible at once.

```tsx
import { FormRadio } from "@fg-abc/ui";

const OPTIONS = [
  { label: "Public", value: "public", description: "Anyone can view this." },
  { label: "Private", value: "private", description: "Only you can view this." },
  { label: "Team", value: "team" },
];

// Vertical (default)
<FormRadio label="Visibility" options={OPTIONS} value={value} onValueChange={setValue} />

// Horizontal
<FormRadio label="Size" options={[
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
]} orientation="horizontal" />

// With error
<FormRadio label="Role" options={OPTIONS} error="Please select a role." />
```

## Props
| Prop | Type | Default |
|---|---|---|
| `options` | `{ label: string; value: string; description?: string; disabled?: boolean }[]` | required |
| `value` | `string` | — |
| `onValueChange` | `(value: string) => void` | — |
| `label` | `string` | — |
| `error` | `string` | — |
| `hint` | `string` | — |
| `orientation` | `vertical \| horizontal` | `vertical` |
| `disabled` | `boolean` | `false` |

## Notes
- Use `FormSelect` or `Autocomplete` when there are more than ~5 options
- `description` renders below the label in smaller text — good for explaining the difference between options
