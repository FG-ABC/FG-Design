# DataGrid

Full-featured data table. Purely controlled — the component holds no data, sort, or page state itself.

```tsx
import { DataGrid, ColumnDef } from "fg-design";
```

## Minimal example

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const columns: ColumnDef<User>[] = [
  { key: "name", header: "Name", cell: (r) => r.name },
  { key: "email", header: "Email", cell: (r) => r.email },
];

<DataGrid columns={columns} rows={users} rowKey={(r) => r.id} />;
```

## Sorting (server-side)

```tsx
const [sort, setSort] = React.useState<SortState | null>(null);

// In columns, set sortable: true
const columns: ColumnDef<User>[] = [
  { key: "name", header: "Name", sortable: true, cell: (r) => r.name },
];

<DataGrid
  columns={columns}
  rows={rows} // already sorted by your server/query
  rowKey={(r) => r.id}
  sort={sort}
  onSort={(s) => {
    setSort(s);
    setPage(1);
  }}
/>;
```

Clicking a sortable header cycles: none → asc → desc → none.

## Pagination

```tsx
<DataGrid
  columns={columns}
  rows={pageRows} // current page only
  rowKey={(r) => r.id}
  pagination={{ page, pageSize, total }}
  onPageChange={setPage}
  onPageSizeChange={(s) => {
    setPageSize(s);
    setPage(1);
  }}
  pageSizeOptions={[10, 25, 50]}
/>
```

## Row selection + bulk actions

```tsx
const [selected, setSelected] = React.useState<Set<string | number>>(new Set());

<DataGrid
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  selectedKeys={selected}
  onSelectionChange={setSelected}
  bulkActions={[
    { label: "Export", onClick: (rows) => exportCSV(rows) },
    { label: "Delete", onClick: (rows) => deleteAll(rows) },
  ]}
/>;
```

## Per-row actions

```tsx
import { Pencil, Trash2 } from "lucide-react";

<DataGrid
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  rowActions={[
    {
      label: "Edit",
      icon: <Pencil className="h-3.5 w-3.5" />,
      onClick: (row) => openEditModal(row),
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-3.5 w-3.5" />,
      variant: "danger",
      onClick: (row) => deleteRow(row),
      show: (row) => row.deletable, // optional condition
    },
  ]}
/>;
```

## Grand total footer

Set `showFooter` and add `footer` to each column you want totalled.

```tsx
const columns: ColumnDef<Order>[] = [
  {
    key: "amount",
    header: "Amount",
    align: "right",
    cell: (r) => fmt.format(r.amount),
    footer: fmt.format(orders.reduce((s, o) => s + o.amount, 0)),
  },
];

<DataGrid columns={columns} rows={orders} rowKey={(r) => r.id} showFooter />;
```

## Column collapse

Any column with `collapsible: true` (default) shows a `⋯` icon in its header. Click it to collapse the column to a narrow stub; click the `›` stub to expand.

```tsx
const columns: ColumnDef<Row>[] = [
  { key: "notes", header: "Notes", collapsible: true, cell: (r) => r.notes },
];
```

## Column resizing

```tsx
<DataGrid columns={columns} rows={rows} rowKey={(r) => r.id} resizable />
```

Drag the right edge of any header to resize. Set `minWidth` on a column to cap how small it can go.

## Datagrid mode (inline editing)

Cell renderers return inputs. The component adds "Add row" and delete buttons.

```tsx
const columns: ColumnDef<LineItem>[] = [
  {
    key: "name",
    header: "Item",
    cell: (row) => (
      <input
        className="w-full bg-transparent text-sm outline-none focus:ring-1 focus:ring-[var(--color-accent-500)] rounded px-1 -mx-1"
        value={row.name}
        onChange={(e) => update(row.id, "name", e.target.value)}
      />
    ),
  },
];

<DataGrid
  columns={columns}
  rows={rows}
  rowKey={(r) => r.id}
  datagrid
  onAddRow={() => appendBlankRow()}
  onDeleteRow={(row) => removeRow(row.id)}
  cellErrors={{ [row.id]: { name: "Name is required" } }}
/>;
```

`onAddRow` can also open a modal — just call `setModalOpen(true)` instead of mutating rows.

## Loading / empty

```tsx
// Skeleton rows while fetching
<DataGrid columns={columns} rows={[]} rowKey={(r) => r.id} loading />

// Custom empty state
<DataGrid
  columns={columns}
  rows={[]}
  rowKey={(r) => r.id}
  emptyState={<p>No results. Try adjusting your filters.</p>}
/>
```

## Density

```tsx
<DataGrid columns={columns} rows={rows} rowKey={(r) => r.id} density="compact" />
<DataGrid columns={columns} rows={rows} rowKey={(r) => r.id} density="comfortable" />
```

## ColumnDef shape

```tsx
interface ColumnDef<TRow> {
  key: string;
  header: string;
  cell?: (row: TRow, rowIndex: number) => ReactNode;
  sortable?: boolean;
  width?: number; // px
  minWidth?: number; // px, for resizing
  align?: "left" | "center" | "right";
  footer?: ReactNode; // shown when showFooter=true
  collapsible?: boolean; // default true
}
```

## All props

| Prop                | Type                                    | Default               |
| ------------------- | --------------------------------------- | --------------------- |
| `columns`           | `ColumnDef<TRow>[]`                     | required              |
| `rows`              | `TRow[]`                                | required              |
| `rowKey`            | `(row: TRow) => string \| number`       | required              |
| `loading`           | `boolean`                               | `false`               |
| `emptyState`        | `ReactNode`                             | `"No results found."` |
| `sort`              | `SortState \| null`                     | —                     |
| `onSort`            | `(sort: SortState \| null) => void`     | —                     |
| `pagination`        | `PaginationState`                       | —                     |
| `onPageChange`      | `(page: number) => void`                | —                     |
| `onPageSizeChange`  | `(size: number) => void`                | —                     |
| `pageSizeOptions`   | `number[]`                              | `[10, 25, 50, 100]`   |
| `onRefetch`         | `() => void`                            | —                     |
| `selectedKeys`      | `Set<string \| number>`                 | —                     |
| `onSelectionChange` | `(keys: Set<string \| number>) => void` | —                     |
| `bulkActions`       | `BulkAction<TRow>[]`                    | —                     |
| `rowActions`        | `RowAction<TRow>[]`                     | —                     |
| `onRowClick`        | `(row: TRow, index: number) => void`    | —                     |
| `showFooter`        | `boolean`                               | `false`               |
| `resizable`         | `boolean`                               | `false`               |
| `density`           | `compact \| default \| comfortable`     | `default`             |
| `datagrid`          | `boolean`                               | `false`               |
| `onAddRow`          | `() => void`                            | —                     |
| `onDeleteRow`       | `(row: TRow, index: number) => void`    | —                     |
| `cellErrors`        | `Record<key, Record<colKey, string>>`   | —                     |

See [patterns.md](../patterns.md) for full server-side sort + pagination example.
