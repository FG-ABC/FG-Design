# SearchBar

Search input with debounce or explicit submit button mode.

```tsx
import { SearchBar } from "@fgd/ui";

// Debounce mode (default) — fires onSearch 300ms after typing stops
<SearchBar onSearch={(q) => setQuery(q)} placeholder="Search…" />

// Button mode — fires onSearch on button click or Enter
<SearchBar mode="button" onSearch={(q) => setQuery(q)} buttonLabel="Search" />

// Custom debounce
<SearchBar onSearch={search} debounceMs={500} />

// Loading spinner
<SearchBar onSearch={search} loading={isFetching} />
```

## Props
| Prop | Type | Default |
|---|---|---|
| `onSearch` | `(value: string) => void` | required |
| `mode` | `debounce \| button` | `debounce` |
| `debounceMs` | `number` | `300` |
| `loading` | `boolean` | `false` |
| `buttonLabel` | `string` | `Search` |
| `onClear` | `() => void` | — |

Extends `HTMLInputElement` attributes (`placeholder`, `disabled`, `value`, etc.).

## Notes
- Has a built-in clear (×) button that appears when input is non-empty
- In `debounce` mode, pressing Enter fires `onSearch` immediately (skips remaining debounce)
- `value` + no `onChange` = controlled display but `onSearch` is still your source of truth
- For filtering local data, combine with `DataGrid` — see [patterns.md](../patterns.md)
