# MonthPicker

Month + year picker. No day selection. Use when you only care about the month granularity (e.g. billing period, report month, fiscal period).

Value format: `"YYYY-MM"` (e.g. `"2026-05"`).

## Minimal example

```tsx
import { MonthPicker } from "fg-design";

<MonthPicker
  label="Billing period"
  value={month}
  onChange={(v) => setMonth(v)}
/>;
```

## Props

| Prop          | Type                          | Default            | Description                                       |
| ------------- | ----------------------------- | ------------------ | ------------------------------------------------- |
| `value`       | `string \| undefined`         | —                  | Controlled value, `"YYYY-MM"`                     |
| `onChange`    | `(v: string \| null) => void` | —                  | Called with new value or `null` when cleared      |
| `label`       | `string`                      | —                  | Field label                                       |
| `placeholder` | `string`                      | `"Select month…"`  | Trigger button text when empty                    |
| `error`       | `string`                      | —                  | Error message shown below                         |
| `hint`        | `string`                      | —                  | Hint text shown below (hidden when error present) |
| `min`         | `string`                      | —                  | `"YYYY-MM"` — months before this are disabled     |
| `max`         | `string`                      | —                  | `"YYYY-MM"` — months after this are disabled      |
| `disabled`    | `boolean`                     | `false`            | Disables the trigger                              |
| `required`    | `boolean`                     | `false`            | Shows `*` after label                             |
| `modal`       | `boolean`                     | `false`            | Set `true` when inside a Modal                    |
| `id`          | `string`                      | derived from label | `id` on the trigger button                        |

## Decision rules

- Use `MonthPicker` when you need month + year only. For full date selection use `DatePicker`.
- `min`/`max` accept `"YYYY-MM"` strings — simple lexicographic comparison works correctly.
- Current month is highlighted in accent color (not bold selected style) to distinguish "today's month" from a chosen value.
