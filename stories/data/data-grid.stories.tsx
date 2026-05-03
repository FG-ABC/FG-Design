import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DataGrid, ColumnDef, SortState, PaginationState } from "@/components/data/data-grid";
import { Badge } from "@/components/core/badge";
import { Pencil, Trash2 } from "lucide-react";

// ─── Shared sample data ────────────────────────────────────────────────────

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  salary: number;
  status: "active" | "inactive" | "pending";
  joined: string;
}

const EMPLOYEES: Employee[] = [
  { id: 1, name: "Alice Martin", role: "Engineer", department: "Product", salary: 120000, status: "active", joined: "2021-03-12" },
  { id: 2, name: "Bob Chen", role: "Designer", department: "Design", salary: 98000, status: "active", joined: "2020-07-05" },
  { id: 3, name: "Carol White", role: "Manager", department: "Product", salary: 145000, status: "active", joined: "2019-01-22" },
  { id: 4, name: "David Kim", role: "Engineer", department: "Platform", salary: 135000, status: "pending", joined: "2023-09-01" },
  { id: 5, name: "Eve Patel", role: "Analyst", department: "Data", salary: 105000, status: "inactive", joined: "2022-04-18" },
  { id: 6, name: "Frank Torres", role: "Engineer", department: "Platform", salary: 128000, status: "active", joined: "2021-11-30" },
  { id: 7, name: "Grace Lee", role: "Designer", department: "Design", salary: 92000, status: "active", joined: "2023-02-14" },
  { id: 8, name: "Henry Brown", role: "Manager", department: "Data", salary: 150000, status: "active", joined: "2018-06-08" },
];

const STATUS_VARIANT: Record<Employee["status"], "success" | "warning" | "danger"> = {
  active: "success",
  pending: "warning",
  inactive: "danger",
};

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const BASE_COLUMNS: ColumnDef<Employee>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    width: 180,
    cell: (row) => <span className="font-medium text-[var(--color-ink)]">{row.name}</span>,
  },
  {
    key: "role",
    header: "Role",
    sortable: true,
    width: 120,
    collapsible: true,
    cell: (row) => row.role,
  },
  {
    key: "department",
    header: "Department",
    sortable: true,
    width: 130,
    collapsible: true,
    cell: (row) => row.department,
  },
  {
    key: "salary",
    header: "Salary",
    sortable: true,
    width: 110,
    align: "right",
    cell: (row) => fmt.format(row.salary),
    footer: fmt.format(EMPLOYEES.reduce((s, e) => s + e.salary, 0)),
  },
  {
    key: "status",
    header: "Status",
    width: 100,
    align: "center",
    cell: (row) => (
      <Badge variant={STATUS_VARIANT[row.status]} className="capitalize">
        {row.status}
      </Badge>
    ),
  },
  {
    key: "joined",
    header: "Joined",
    sortable: true,
    width: 110,
    collapsible: true,
    cell: (row) => new Date(row.joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  },
];

// ─── Meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof DataGrid> = {
  title: "Data/DataGrid",
  component: DataGrid,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// ─── Stories ───────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <DataGrid
      columns={BASE_COLUMNS}
      rows={EMPLOYEES}
      rowKey={(r) => r.id}
    />
  ),
};

export const WithSorting: Story = {
  render: () => {
    const [sort, setSort] = React.useState<SortState | null>(null);

    const sorted = React.useMemo(() => {
      if (!sort) return EMPLOYEES;
      return [...EMPLOYEES].sort((a, b) => {
        const va = a[sort.columnKey as keyof Employee];
        const vb = b[sort.columnKey as keyof Employee];
        const dir = sort.dir === "asc" ? 1 : -1;
        return va < vb ? -dir : va > vb ? dir : 0;
      });
    }, [sort]);

    return (
      <DataGrid
        columns={BASE_COLUMNS}
        rows={sorted}
        rowKey={(r) => r.id}
        sort={sort}
        onSort={setSort}
      />
    );
  },
};

export const WithPagination: Story = {
  render: () => {
    const PAGE_SIZE = 3;
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(PAGE_SIZE);

    const sliced = EMPLOYEES.slice((page - 1) * pageSize, page * pageSize);

    return (
      <DataGrid
        columns={BASE_COLUMNS}
        rows={sliced}
        rowKey={(r) => r.id}
        pagination={{ page, pageSize, total: EMPLOYEES.length }}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
      />
    );
  },
};

export const WithSelectionAndBulkActions: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Set<string | number>>(new Set());
    const [log, setLog] = React.useState<string[]>([]);

    return (
      <div className="flex flex-col gap-4">
        <DataGrid
          columns={BASE_COLUMNS}
          rows={EMPLOYEES}
          rowKey={(r) => r.id}
          selectedKeys={selected}
          onSelectionChange={setSelected}
          bulkActions={[
            {
              label: "Export",
              onClick: (rows) => setLog((l) => [...l, `Exported ${rows.length} rows`]),
            },
            {
              label: "Deactivate",
              onClick: (rows) => setLog((l) => [...l, `Deactivated: ${rows.map((r) => r.name).join(", ")}`]),
            },
          ]}
        />
        {log.length > 0 && (
          <div className="text-sm text-[var(--color-subtle)] space-y-1">
            {log.map((l, i) => <p key={i}>{l}</p>)}
          </div>
        )}
      </div>
    );
  },
};

export const WithRowActions: Story = {
  render: () => {
    const [log, setLog] = React.useState<string[]>([]);
    return (
      <div className="flex flex-col gap-4">
        <DataGrid
          columns={BASE_COLUMNS}
          rows={EMPLOYEES}
          rowKey={(r) => r.id}
          rowActions={[
            {
              label: "Edit",
              icon: <Pencil className="h-3.5 w-3.5" />,
              onClick: (row) => setLog((l) => [`Editing ${row.name}`, ...l]),
            },
            {
              label: "Delete",
              icon: <Trash2 className="h-3.5 w-3.5" />,
              variant: "danger",
              onClick: (row) => setLog((l) => [`Deleted ${row.name}`, ...l]),
            },
          ]}
        />
        {log.length > 0 && (
          <div className="text-sm text-[var(--color-subtle)] space-y-1">
            {log.slice(0, 5).map((l, i) => <p key={i}>{l}</p>)}
          </div>
        )}
      </div>
    );
  },
};

export const WithFooterTotals: Story = {
  render: () => (
    <DataGrid
      columns={BASE_COLUMNS}
      rows={EMPLOYEES}
      rowKey={(r) => r.id}
      showFooter
    />
  ),
};

export const WithResizableColumns: Story = {
  render: () => (
    <DataGrid
      columns={BASE_COLUMNS}
      rows={EMPLOYEES}
      rowKey={(r) => r.id}
      resizable
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <DataGrid
      columns={BASE_COLUMNS}
      rows={[]}
      rowKey={(r: Employee) => r.id}
      loading
      pagination={{ page: 1, pageSize: 5, total: 0 }}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataGrid
      columns={BASE_COLUMNS}
      rows={[]}
      rowKey={(r: Employee) => r.id}
      emptyState={
        <div className="flex flex-col items-center gap-2 py-4">
          <p className="text-[var(--color-ink)] font-medium">No employees found</p>
          <p className="text-xs text-[var(--color-muted)]">Try adjusting your filters.</p>
        </div>
      }
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <DataGrid
      columns={BASE_COLUMNS}
      rows={EMPLOYEES}
      rowKey={(r) => r.id}
      density="compact"
    />
  ),
};

export const Comfortable: Story = {
  render: () => (
    <DataGrid
      columns={BASE_COLUMNS}
      rows={EMPLOYEES}
      rowKey={(r) => r.id}
      density="comfortable"
    />
  ),
};

// ─── Datagrid (inline editing) ─────────────────────────────────────────────

interface ProductRow {
  id: number;
  name: string;
  qty: number;
  price: number;
}

const INITIAL_PRODUCTS: ProductRow[] = [
  { id: 1, name: "Widget A", qty: 10, price: 9.99 },
  { id: 2, name: "Widget B", qty: 5, price: 24.99 },
  { id: 3, name: "Gadget Pro", qty: 2, price: 149.0 },
];

export const Datagrid: Story = {
  render: () => {
    const [rows, setRows] = React.useState<ProductRow[]>(INITIAL_PRODUCTS);
    const [errors, setErrors] = React.useState<Record<number, Record<string, string>>>({});
    const nextId = React.useRef(INITIAL_PRODUCTS.length + 1);

    const updateCell = (id: number, field: keyof ProductRow, value: string) => {
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, [field]: field === "name" ? value : Number(value) } : r))
      );
      // Clear error on edit
      setErrors((prev) => {
        const next = { ...prev };
        if (next[id]) { delete next[id][field]; }
        return next;
      });
    };

    const validate = (): boolean => {
      const next: Record<number, Record<string, string>> = {};
      rows.forEach((r) => {
        const rowErr: Record<string, string> = {};
        if (!r.name.trim()) rowErr.name = "Name is required";
        if (r.qty < 0) rowErr.qty = "Must be ≥ 0";
        if (r.price <= 0) rowErr.price = "Must be > 0";
        if (Object.keys(rowErr).length) next[r.id] = rowErr;
      });
      setErrors(next);
      return Object.keys(next).length === 0;
    };

    const fmtPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    const totalValue = rows.reduce((s, r) => s + r.qty * r.price, 0);

    const columns: ColumnDef<ProductRow>[] = [
      {
        key: "name",
        header: "Product name",
        width: 220,
        cell: (row) => (
          <input
            className="w-full bg-transparent text-sm text-[var(--color-ink)] outline-none focus:ring-1 focus:ring-[var(--color-accent-500)] rounded px-1 -mx-1"
            value={row.name}
            onChange={(e) => updateCell(row.id, "name", e.target.value)}
            placeholder="Product name"
          />
        ),
        footer: <span className="text-xs text-[var(--color-subtle)]">Total value</span>,
      },
      {
        key: "qty",
        header: "Qty",
        width: 90,
        align: "right",
        cell: (row) => (
          <input
            type="number"
            className="w-full bg-transparent text-sm text-[var(--color-ink)] text-right outline-none focus:ring-1 focus:ring-[var(--color-accent-500)] rounded px-1 -mx-1"
            value={row.qty}
            onChange={(e) => updateCell(row.id, "qty", e.target.value)}
            min={0}
          />
        ),
        footer: rows.reduce((s, r) => s + r.qty, 0),
      },
      {
        key: "price",
        header: "Unit price",
        width: 110,
        align: "right",
        cell: (row) => (
          <input
            type="number"
            className="w-full bg-transparent text-sm text-[var(--color-ink)] text-right outline-none focus:ring-1 focus:ring-[var(--color-accent-500)] rounded px-1 -mx-1"
            value={row.price}
            onChange={(e) => updateCell(row.id, "price", e.target.value)}
            min={0}
            step={0.01}
          />
        ),
        footer: null,
      },
      {
        key: "total",
        header: "Line total",
        width: 110,
        align: "right",
        cell: (row) => (
          <span className="text-[var(--color-subtle)]">{fmtPrice.format(row.qty * row.price)}</span>
        ),
        footer: <span className="text-[var(--color-accent-600)]">{fmtPrice.format(totalValue)}</span>,
      },
    ];

    return (
      <div className="flex flex-col gap-3 max-w-2xl">
        <DataGrid
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          datagrid
          showFooter
          cellErrors={errors}
          onAddRow={() => {
            const id = nextId.current++;
            setRows((prev) => [...prev, { id, name: "", qty: 1, price: 0 }]);
          }}
          onDeleteRow={(row) => setRows((prev) => prev.filter((r) => r.id !== row.id))}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => { if (validate()) alert("Saved!"); }}
            className="px-4 h-9 rounded-[var(--radius-md)] bg-[var(--color-accent-500)] text-white text-sm font-medium hover:bg-[var(--color-accent-600)] transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    );
  },
};

export const KitchenSink: Story = {
  render: () => {
    const [sort, setSort] = React.useState<SortState | null>(null);
    const [selected, setSelected] = React.useState<Set<string | number>>(new Set());
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [log, setLog] = React.useState<string[]>([]);

    const sorted = React.useMemo(() => {
      if (!sort) return EMPLOYEES;
      return [...EMPLOYEES].sort((a, b) => {
        const va = a[sort.columnKey as keyof Employee];
        const vb = b[sort.columnKey as keyof Employee];
        const dir = sort.dir === "asc" ? 1 : -1;
        return va < vb ? -dir : va > vb ? dir : 0;
      });
    }, [sort]);

    const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

    return (
      <div className="flex flex-col gap-4">
        <DataGrid
          columns={BASE_COLUMNS}
          rows={paginated}
          rowKey={(r) => r.id}
          sort={sort}
          onSort={(s) => { setSort(s); setPage(1); }}
          pagination={{ page, pageSize, total: EMPLOYEES.length }}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          onRefetch={() => setLog((l) => [`Refetched at ${new Date().toLocaleTimeString()}`, ...l])}
          selectedKeys={selected}
          onSelectionChange={setSelected}
          bulkActions={[
            { label: "Export", onClick: (rows) => setLog((l) => [`Exported ${rows.length} rows`, ...l]) },
          ]}
          rowActions={[
            {
              label: "Edit",
              icon: <Pencil className="h-3.5 w-3.5" />,
              onClick: (row) => setLog((l) => [`Editing ${row.name}`, ...l]),
            },
            {
              label: "Delete",
              icon: <Trash2 className="h-3.5 w-3.5" />,
              variant: "danger",
              onClick: (row) => setLog((l) => [`Deleted ${row.name}`, ...l]),
            },
          ]}
          showFooter
          resizable
          density="default"
        />
        {log.length > 0 && (
          <div className="text-sm text-[var(--color-subtle)] space-y-1 border-t border-[var(--color-border)] pt-3">
            {log.slice(0, 5).map((l, i) => <p key={i}>{l}</p>)}
          </div>
        )}
      </div>
    );
  },
};
