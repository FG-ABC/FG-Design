# List / ListItem

Vertical list layout for simple item collections.

```tsx
import { List, ListItem } from "@fg-abc/ui";

// Gapped list
<List>
  <ListItem>Alice Martin</ListItem>
  <ListItem>Bob Chen</ListItem>
</List>

// Divided list (horizontal rules between items)
<List divided>
  <ListItem>
    <Avatar alt="Alice Martin" size="sm" />
    <div className="flex flex-col">
      <span className="text-sm font-medium text-[var(--color-ink)]">Alice Martin</span>
      <span className="text-xs text-[var(--color-subtle)]">Engineer</span>
    </div>
  </ListItem>
  <ListItem>
    <Avatar alt="Bob Chen" size="sm" />
    <div className="flex flex-col">
      <span className="text-sm font-medium text-[var(--color-ink)]">Bob Chen</span>
      <span className="text-xs text-[var(--color-subtle)]">Designer</span>
    </div>
  </ListItem>
</List>

// With empty state
<List emptyState={<p>No items found.</p>}>
  {items.map((i) => <ListItem key={i.id}>{i.name}</ListItem>)}
</List>
```

## List props
| Prop | Type | Default |
|---|---|---|
| `divided` | `boolean` | `false` |
| `gap` | `none \| xs \| sm \| md` | `sm` |
| `emptyState` | `ReactNode` | — |

## Notes
- `ListItem` is a `<li>` with `flex items-center gap-3` — put your content directly inside
- `divided` overrides `gap` — dividers handle spacing
- For clickable rows in a list, use `DataGrid` with `onRowClick` instead
