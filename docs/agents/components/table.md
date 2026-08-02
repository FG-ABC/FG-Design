# Table (primitives)

Low-level table building blocks. Use `DataGrid` for real data tables.

Only reach for these when you need complete structural control — e.g. a summary layout that doesn't fit the DataGrid's column model.

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "fg-design";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead sortable sortDir="asc" onClick={handleSort}>
        Email
      </TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.id} selected={row.id === selected}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>
          <Badge variant="success">{row.status}</Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell>42</TableCell>
    </TableRow>
  </TableFooter>
</Table>;
```

## TableHead props

| Prop       | Type                  | Use for                         |
| ---------- | --------------------- | ------------------------------- |
| `sortable` | `boolean`             | Adds cursor-pointer + sort icon |
| `sortDir`  | `asc \| desc \| null` | Which icon to show              |

## TableRow props

| Prop       | Type      | Use for              |
| ---------- | --------- | -------------------- |
| `selected` | `boolean` | Accent-50 background |

## Notes

- The `Table` component wraps in a scrollable `overflow-auto` div automatically
- For anything beyond a simple list, use `DataGrid` — it handles sort, pagination, selection, and row actions
