# FormSelect

Dropdown select for short, fixed option lists. Built on Radix Select.

```tsx
import { FormSelect } from "@fgd/ui";

const OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

<FormSelect label="Status" options={OPTIONS} />
<FormSelect label="Status" options={OPTIONS} value="active" onValueChange={setStatus} />
<FormSelect label="Status" options={OPTIONS} error="Status is required." />
<FormSelect label="Status" options={OPTIONS} hint="This controls account access." />
<FormSelect label="Status" options={OPTIONS} disabled />
```

## Props
| Prop | Type | Default |
|---|---|---|
| `options` | `{ label: string; value: string }[]` | required |
| `value` | `string` | — |
| `onValueChange` | `(value: string) => void` | — |
| `label` | `string` | — |
| `error` | `string` | — |
| `hint` | `string` | — |
| `placeholder` | `string` | `Select an option…` |
| `disabled` | `boolean` | `false` |

## Notes
- Use `FormSelect` (not raw `Select`) in forms — it handles label/error/hint
- For searchable or long lists, use `Autocomplete` instead
- `onValueChange` never fires with an empty string — clear is not supported (use `Autocomplete` if you need clearable)
