# Textarea

Multi-line text input. Same label/error/hint pattern as `Input`.

```tsx
import { Textarea } from "fg-design";

<Textarea label="Bio" placeholder="Tell us about yourself…" />
<Textarea label="Notes" hint="Max 500 characters." />
<Textarea label="Description" error="Description is required." />
<Textarea label="Fixed height" resize="none" rows={4} />
```

## Props

| Prop     | Type                                     | Default    |
| -------- | ---------------------------------------- | ---------- |
| `label`  | `string`                                 | —          |
| `error`  | `string`                                 | —          |
| `hint`   | `string`                                 | —          |
| `resize` | `none \| vertical \| horizontal \| both` | `vertical` |

Extends all `HTMLTextareaElement` attributes (`rows`, `placeholder`, `disabled`, `value`, `onChange`, etc.).

## Notes

- `FormTextarea` is an alias exported from `fg-design/form` — same component
- Default `min-height` is `96px`; override with `className="min-h-48"` etc.
