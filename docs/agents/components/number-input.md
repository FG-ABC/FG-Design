# NumberInput / MoneyInput

Formatted number fields built on top of `Input`.

## NumberInput

Three modes controlled by `numberMode`:

```tsx
import { NumberInput } from "@fg-abc/ui";

// Positive integers only (default)
<NumberInput label="Quantity" numberMode="POSITIVE_INTEGERS" />

// Any integer (negative allowed)
<NumberInput label="Offset" numberMode="INTEGERS" />

// Decimals
<NumberInput label="Rate" numberMode="FLOATS" maxDecimals={2} />
```

## Props — NumberInput
| Prop | Type | Default |
|---|---|---|
| `numberMode` | `POSITIVE_INTEGERS \| INTEGERS \| FLOATS` | `POSITIVE_INTEGERS` |
| `maxDecimals` | `number` | `2` |
| `label` | `string` | — |
| `error` | `string` | — |
| `hint` | `string` | — |

Controlled via `value` (string) + `onChange`.

---

## MoneyInput

Currency input with a `$` prefix adornment. Always decimal.

```tsx
import { MoneyInput } from "@fg-abc/ui";

<MoneyInput label="Amount" />
<MoneyInput label="Amount" currencySymbol="€" />
```

## Props — MoneyInput
| Prop | Type | Default |
|---|---|---|
| `currencySymbol` | `string` | `$` |
| `maxDecimals` | `number` | `2` |
| `label` | `string` | — |
| `error` | `string` | — |
| `hint` | `string` | — |

## Notes
- Both format numbers with `toLocaleString` on blur
- On focus the raw number is shown for editing
- Don't use `Input type="number"` — use these components instead
