# DatePicker / DateTimePicker

Calendar popover pickers. No external date library required.

---

## DatePicker

Value is a `"YYYY-MM-DD"` string.

```tsx
import { DatePicker } from "@fgd/ui";

// Uncontrolled
<DatePicker label="Start date" />

// Controlled
const [date, setDate] = React.useState<string | null>(null);
<DatePicker label="Start date" value={date ?? undefined} onChange={setDate} />

// With min/max
<DatePicker
  label="Appointment"
  min={new Date().toISOString().slice(0, 10)}
  max="2025-12-31"
/>

// With error
<DatePicker label="Due date" error="A due date is required." />
```

## Props — DatePicker
| Prop | Type | Default |
|---|---|---|
| `value` | `string` | — |
| `onChange` | `(value: string \| null) => void` | — |
| `label` | `string` | — |
| `error` | `string` | — |
| `hint` | `string` | — |
| `placeholder` | `string` | `Select date…` |
| `min` | `string` (YYYY-MM-DD) | — |
| `max` | `string` (YYYY-MM-DD) | — |
| `disabled` | `boolean` | `false` |

---

## DateTimePicker

Value is a `"YYYY-MM-DDTHH:mm"` string (local time, no seconds).

```tsx
import { DateTimePicker } from "@fgd/ui";

const [dt, setDt] = React.useState<string | null>(null);
<DateTimePicker label="Scheduled at" value={dt ?? undefined} onChange={setDt} />
```

## Props — DateTimePicker
Same as `DatePicker` minus `min`/`max`. No range constraints on time.

## Notes
- `onChange` receives `null` when the user clears the value
- The clear (×) button appears on the trigger when a value is selected
- Today's date is highlighted in accent color
- Selected date is filled accent-500
- Time columns auto-scroll to the current hour/minute when the popover opens
