# Input

Single-line text field with optional label, error, hint, and adornments.

```tsx
import { Input } from "@fg-abc/ui";

<Input label="Email" placeholder="you@example.com" />
<Input label="Email" error="Invalid email address." />
<Input label="Email" hint="We'll never share your email." />
```

## With adornments
```tsx
import { Mail } from "lucide-react";

<Input
  label="Email"
  leftAdornment={<Mail className="h-4 w-4" />}
  placeholder="you@example.com"
/>
<Input
  label="Price"
  rightAdornment={<span className="text-xs">USD</span>}
/>
```

## Controlled
```tsx
const [value, setValue] = React.useState("");
<Input value={value} onChange={(e) => setValue(e.target.value)} label="Name" />
```

## Props
| Prop | Type | Default |
|---|---|---|
| `label` | `string` | — |
| `error` | `string` | — |
| `hint` | `string` | — |
| `leftAdornment` | `ReactNode` | — |
| `rightAdornment` | `ReactNode` | — |

Extends all `HTMLInputElement` attributes (`type`, `placeholder`, `disabled`, `value`, `onChange`, etc.).

## Notes
- `id` is auto-derived from `label` if not provided
- Error state applies danger ring and border automatically
- For numbers use `NumberInput`; for currency use `MoneyInput`
