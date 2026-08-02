# TextareaAuto

Auto-growing text field. Starts at a single line and expands as the user types. Enter always inserts a line break — it never submits a form.

Use this instead of `Textarea` when you want an input that looks like a text field at rest but can grow naturally with multi-line content (chat messages, notes, descriptions).

```tsx
import { TextareaAuto } from "fg-design";

<TextareaAuto label="Message" placeholder="Type something…" />
<TextareaAuto label="Notes" hint="Press Enter for a new line." />
<TextareaAuto label="Bio" error="Bio is required." />
<TextareaAuto label="Capped" maxRows={5} placeholder="Scrolls after 5 lines" />
```

## Props

| Prop       | Type      | Default       |
| ---------- | --------- | ------------- |
| `label`    | `string`  | —             |
| `error`    | `string`  | —             |
| `hint`     | `string`  | —             |
| `required` | `boolean` | —             |
| `minRows`  | `number`  | `1`           |
| `maxRows`  | `number`  | — (unlimited) |

Extends all `HTMLTextareaElement` attributes (`placeholder`, `disabled`, `value`, `onChange`, `onKeyDown`, etc.). The `rows` attribute is not available — use `minRows` instead.

## Decision rule

| Need                                | Component      |
| ----------------------------------- | -------------- |
| Fixed-height multi-line box         | `Textarea`     |
| Grows with content, Enter = newline | `TextareaAuto` |
