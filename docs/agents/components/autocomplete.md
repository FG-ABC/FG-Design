# Autocomplete variants

Four searchable picker components for different selection needs.

| Component | Selection | Create new? |
|---|---|---|
| `Autocomplete` | Single | No |
| `MultiAutocomplete` | Multiple (tags) | No |
| `CreatableAutocomplete` | Single | Yes |
| `CreatableMultiAutocomplete` | Multiple (tags) | Yes |

All accept `{ label: string; value: string }[]` as `options`.

---

## Autocomplete (single)

```tsx
import { Autocomplete } from "@fgd/ui";

const OPTIONS = [
  { label: "Engineering", value: "eng" },
  { label: "Design", value: "design" },
];

// Uncontrolled
<Autocomplete label="Department" options={OPTIONS} />

// Controlled
const [value, setValue] = React.useState<string | null>(null);
<Autocomplete label="Department" options={OPTIONS} value={value} onChange={setValue} />

// Async — caller controls options, component skips client filtering
<Autocomplete
  label="User"
  options={options}
  onSearch={async (q) => {
    const results = await searchUsers(q);
    setOptions(results.map((u) => ({ label: u.name, value: u.id })));
  }}
/>
```

---

## MultiAutocomplete

`value` is `string[]`. Supports paste (splits on comma/newline/tab).

```tsx
import { MultiAutocomplete } from "@fgd/ui";

const [values, setValues] = React.useState<string[]>([]);
<MultiAutocomplete label="Tags" options={OPTIONS} value={values} onChange={setValues} />
```

---

## CreatableAutocomplete

Shows a "Create '…'" option when the typed query doesn't match. `value` is the raw string (either an option value or a freeform string).

```tsx
import { CreatableAutocomplete } from "@fgd/ui";

const [value, setValue] = React.useState<string | null>(null);
<CreatableAutocomplete label="Category" options={OPTIONS} value={value} onChange={setValue} />
```

---

## CreatableMultiAutocomplete

Combines multi-select with creation. Deduplicates case-insensitively.

```tsx
import { CreatableMultiAutocomplete } from "@fgd/ui";

const [values, setValues] = React.useState<string[]>([]);
<CreatableMultiAutocomplete label="Labels" options={OPTIONS} value={values} onChange={setValues} />
```

---

## Shared props
| Prop | Type | Default |
|---|---|---|
| `options` | `{ label: string; value: string }[]` | required |
| `value` | `string \| null` or `string[]` | — |
| `onChange` | `(value) => void` | — |
| `onSearch` | `(query: string) => void` | — |
| `label` | `string` | — |
| `error` | `string` | — |
| `hint` | `string` | — |
| `placeholder` | `string` | `Search…` |
| `disabled` | `boolean` | `false` |

## Notes
- When `onSearch` is provided, client-side filtering is disabled — you own the `options` array
- `onChange` fires with `null` (single) or `[]` (multi) when cleared
- The clear (×) icon appears when a value is selected
