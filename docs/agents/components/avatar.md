# Avatar

User avatar with image and fallback initials.

```tsx
import { Avatar } from "fg-design";

// Image with fallback
<Avatar src="https://…/photo.jpg" alt="Alice Martin" />

// Initials fallback (auto-derived from alt)
<Avatar alt="Alice Martin" />

// Explicit fallback
<Avatar fallback="AM" />

// Sizes
<Avatar src="…" size="xs" />  // 24px
<Avatar src="…" size="sm" />  // 32px
<Avatar src="…" size="md" />  // 36px — default
<Avatar src="…" size="lg" />  // 44px
<Avatar src="…" size="xl" />  // 56px
```

## In a table cell

```tsx
const columns: ColumnDef<User>[] = [
  {
    key: "user",
    header: "User",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Avatar src={row.avatarUrl} alt={row.name} size="sm" />
        <span>{row.name}</span>
      </div>
    ),
  },
];
```

## Props

| Prop       | Type                         | Default                |
| ---------- | ---------------------------- | ---------------------- |
| `src`      | `string`                     | —                      |
| `alt`      | `string`                     | —                      |
| `fallback` | `string`                     | first 2 chars of `alt` |
| `size`     | `xs \| sm \| md \| lg \| xl` | `md`                   |

## Notes

- Fallback background is `--color-accent-100` with `--color-accent-700` text
- `fallback` takes precedence over `alt`-derived initials when both are set
