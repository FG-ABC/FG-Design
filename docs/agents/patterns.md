# Common Patterns

Reusable compositions from @fg-abc/ui components. Copy and adapt.

---

## Form layout

Stack fields with a consistent gap. The submit row always goes last with right-aligned actions.

```tsx
import { Input, Textarea, FormSelect, Button } from "@fg-abc/ui";

function UserForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [bio, setBio] = React.useState("");

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(new FormData(e.currentTarget)); }}
      className="flex flex-col gap-4"
    >
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!name ? "Name is required" : undefined}
      />
      <FormSelect
        label="Role"
        value={role}
        onValueChange={setRole}
        options={[
          { label: "Engineer", value: "engineer" },
          { label: "Designer", value: "designer" },
        ]}
      />
      <Textarea
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        hint="Max 200 characters."
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
```

---

## Table with server-side sort + pagination

The DataGrid is purely controlled — you own sort, page, and data state.

```tsx
import { DataGrid, ColumnDef, SortState, PaginationState } from "@fg-abc/ui";

interface Row { id: number; name: string; status: string; }

function MyTable() {
  const [sort, setSort] = React.useState<SortState | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);
  const [rows, setRows] = React.useState<Row[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetchRows({ sort, page, pageSize }).then(({ data, total }) => {
      setRows(data);
      setTotal(total);
      setLoading(false);
    });
  }, [sort, page, pageSize]);

  const columns: ColumnDef<Row>[] = [
    { key: "name", header: "Name", sortable: true, cell: (r) => r.name },
    { key: "status", header: "Status", cell: (r) => r.status },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKey={(r) => r.id}
      loading={loading}
      sort={sort}
      onSort={(s) => { setSort(s); setPage(1); }}
      pagination={{ page, pageSize, total }}
      onPageChange={setPage}
      onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
      onRefetch={() => setPage((p) => p)} // re-trigger effect
    />
  );
}
```

---

## Inline editable datagrid

Use `datagrid` mode when rows contain editable cells. Cell renderers return inputs; the DataGrid handles add/delete.

```tsx
import { DataGrid, ColumnDef } from "@fg-abc/ui";

interface LineItem { id: number; name: string; qty: number; }

function LineItemGrid() {
  const [rows, setRows] = React.useState<LineItem[]>([
    { id: 1, name: "Widget", qty: 10 },
  ]);
  const nextId = React.useRef(2);

  const update = (id: number, field: keyof LineItem, val: string) =>
    setRows((prev) =>
      prev.map((r) => r.id === id ? { ...r, [field]: field === "name" ? val : Number(val) } : r)
    );

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
    {
      key: "qty",
      header: "Qty",
      align: "right",
      width: 80,
      cell: (row) => (
        <input
          type="number"
          className="w-full bg-transparent text-sm text-right outline-none focus:ring-1 focus:ring-[var(--color-accent-500)] rounded px-1 -mx-1"
          value={row.qty}
          onChange={(e) => update(row.id, "qty", e.target.value)}
        />
      ),
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKey={(r) => r.id}
      datagrid
      onAddRow={() => setRows((prev) => [...prev, { id: nextId.current++, name: "", qty: 1 }])}
      onDeleteRow={(row) => setRows((prev) => prev.filter((r) => r.id !== row.id))}
    />
  );
}
```

---

## Confirmation modal

```tsx
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, Button } from "@fg-abc/ui";

function DeleteButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="danger">Delete</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Delete item?</ModalTitle>
          <ModalDescription>This action cannot be undone.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Modal.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Modal.Close>
          <Button variant="danger" onClick={onConfirm}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
```

---

## Toast notifications

Mount `Toaster` once at your app root, then call `toast()` anywhere.

```tsx
// app root
import { Toaster } from "@fg-abc/ui";
<Toaster position="bottom-right" />

// anywhere
import { toast } from "@fg-abc/ui";
toast.success("Saved successfully");
toast.error("Something went wrong");
toast("Info message");
toast("With action", {
  action: { label: "Undo", onClick: () => undo() },
});
```

---

## Async autocomplete

When options come from an API, pass `onSearch` and control the `options` array yourself.

```tsx
import { Autocomplete } from "@fg-abc/ui";

function UserPicker() {
  const [value, setValue] = React.useState<string | null>(null);
  const [options, setOptions] = React.useState<{ label: string; value: string }[]>([]);

  const search = React.useCallback(async (query: string) => {
    const results = await api.searchUsers(query);
    setOptions(results.map((u) => ({ label: u.name, value: u.id })));
  }, []);

  return (
    <Autocomplete
      label="Assign to"
      options={options}
      value={value}
      onChange={setValue}
      onSearch={search}
      placeholder="Search users…"
    />
  );
}
```

---

## Stat card row

```tsx
import { StatCard } from "@fg-abc/ui";
import { Users } from "lucide-react";

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <StatCard label="Total users" value="12,430" delta={8.2} deltaLabel="vs last month" icon={<Users className="h-5 w-5" />} />
  <StatCard label="Revenue" value="$84,200" delta={-2.1} deltaLabel="vs last month" />
  <StatCard label="Churn" value="1.4%" delta={-0.3} deltaLabel="vs last month" />
</div>
```

---

## Search + table

```tsx
import { SearchBar, DataGrid } from "@fg-abc/ui";

function SearchableTable() {
  const [query, setQuery] = React.useState("");
  const filtered = rows.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-3">
      <SearchBar onSearch={setQuery} placeholder="Search…" className="max-w-xs" />
      <DataGrid columns={columns} rows={filtered} rowKey={(r) => r.id} />
    </div>
  );
}
```
