# Checkbox / Toggle / FormCheckbox

Boolean input controls.

---

## Checkbox

```tsx
import { Checkbox } from "fg-design";

// With label (auto-generates matching id)
<Checkbox label="Accept terms" />

// Controlled
<Checkbox label="Notify me" checked={notify} onCheckedChange={setNotify} />

// Indeterminate (e.g. "select all" with partial selection)
<Checkbox label="Select all" indeterminate={someSelected} checked={allSelected} onCheckedChange={toggleAll} />
```

## FormCheckbox

Adds `error` and `hint` support to `Checkbox`.

```tsx
import { FormCheckbox } from "fg-design";

<FormCheckbox label="I agree to the terms" error="You must accept the terms." />
<FormCheckbox label="Subscribe to updates" hint="You can unsubscribe at any time." />
```

## Checkbox Props

| Prop              | Type                         | Default |
| ----------------- | ---------------------------- | ------- |
| `label`           | `string`                     | —       |
| `indeterminate`   | `boolean`                    | `false` |
| `checked`         | `boolean \| "indeterminate"` | —       |
| `onCheckedChange` | `(checked: boolean) => void` | —       |
| `disabled`        | `boolean`                    | `false` |

---

## Toggle

On/off switch. Use instead of `Checkbox` when the action takes immediate effect (e.g. enable notifications) rather than being part of a form submit.

```tsx
import { Toggle } from "fg-design";

<Toggle label="Dark mode" />
<Toggle label="Notifications" checked={enabled} onCheckedChange={setEnabled} />
<Toggle size="sm" label="Compact" />
```

## Toggle Props

| Prop              | Type                         | Default |
| ----------------- | ---------------------------- | ------- |
| `label`           | `string`                     | —       |
| `size`            | `sm \| md`                   | `md`    |
| `checked`         | `boolean`                    | —       |
| `onCheckedChange` | `(checked: boolean) => void` | —       |
| `disabled`        | `boolean`                    | `false` |
