"use client";
import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
  Plus,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/core/button";
import { Checkbox } from "@/components/core/checkbox";
import { Skeleton } from "@/components/data/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/select";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDir = "asc" | "desc";

export interface SortState {
  columnKey: string;
  dir: SortDir;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export type Density = "compact" | "default" | "comfortable";

export interface ColumnDef<TRow> {
  key: string;
  header: string;
  /** Custom cell renderer. Receives the row and row index. */
  cell?: (row: TRow, rowIndex: number) => React.ReactNode;
  /** Column is sortable — clicking header fires onSort. */
  sortable?: boolean;
  /** px width for this column. Omit for auto. */
  width?: number;
  /** Min px width when resizing. Default 60. */
  minWidth?: number;
  /** Align cell content. */
  align?: "left" | "center" | "right";
  /** Grand-total footer value for this column. */
  footer?: React.ReactNode;
  /** Whether this column is collapsible (hidden when collapsed). */
  collapsible?: boolean;
}

export interface RowAction<TRow> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: TRow, rowIndex: number) => void;
  /** Show action only when condition is true. */
  show?: (row: TRow) => boolean;
  variant?: "default" | "danger";
}

export interface BulkAction<TRow> {
  label: string;
  icon?: React.ReactNode;
  onClick: (selectedRows: TRow[]) => void;
}

export interface DataGridProps<TRow> {
  // ── Data
  columns: ColumnDef<TRow>[];
  rows: TRow[];
  /** Key accessor for row identity (used for selection). */
  rowKey: (row: TRow) => string | number;

  // ── Loading / empty
  loading?: boolean;
  emptyState?: React.ReactNode;

  // ── Sorting (controlled — consumer owns state)
  sort?: SortState | null;
  onSort?: (sort: SortState | null) => void;

  // ── Pagination (controlled — consumer owns state)
  pagination?: PaginationState;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];

  // ── Refetch
  onRefetch?: () => void;

  // ── Row selection
  selectedKeys?: Set<string | number>;
  onSelectionChange?: (keys: Set<string | number>) => void;
  bulkActions?: BulkAction<TRow>[];

  // ── Per-row actions
  rowActions?: RowAction<TRow>[];

  // ── Row click
  onRowClick?: (row: TRow, rowIndex: number) => void;

  // ── Grand total footer
  showFooter?: boolean;

  // ── Column resizing
  resizable?: boolean;

  // ── Collapsible columns
  collapsedColumns?: Set<string>;
  onCollapsedColumnsChange?: (cols: Set<string>) => void;

  // ── Density
  density?: Density;

  // ── Datagrid mode (inline editable rows)
  datagrid?: boolean;
  /** Called when user clicks "Add row". Return value is the new row draft. */
  onAddRow?: () => void;
  /** Label for the add-row button. Defaults to "Add row". */
  addRowLabel?: React.ReactNode;
  /** Called when user clicks the delete button on a row in datagrid mode. */
  onDeleteRow?: (row: TRow, rowIndex: number) => void;
  /** Validation errors keyed by rowKey → columnKey → error string. */
  cellErrors?: Record<string | number, Record<string, string>>;

  /** Minimum height of the table body in px. Empty space is shown below rows when they don't fill it. */
  minHeight?: number;

  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DENSITY_ROW: Record<Density, string> = {
  compact: "h-8",
  default: "h-11",
  comfortable: "h-14",
};

const DENSITY_CELL: Record<Density, string> = {
  compact: "px-3 py-1",
  default: "px-4 py-2.5",
  comfortable: "px-4 py-4",
};

const DENSITY_HEAD: Record<Density, string> = {
  compact: "h-8 px-3",
  default: "h-10 px-4",
  comfortable: "h-12 px-4",
};

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SortIcon({ dir }: { dir?: SortDir | null }) {
  if (dir === "asc") return <ChevronUp className="h-3.5 w-3.5 shrink-0" />;
  if (dir === "desc") return <ChevronDown className="h-3.5 w-3.5 shrink-0" />;
  return <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-40" />;
}

function CollapseToggle({
  collapsed,
  onClick,
}: {
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      title={collapsed ? "Expand column" : "Collapse column"}
      className={cn(
        "ml-1 p-0.5 rounded text-[var(--color-muted)]",
        "hover:text-[var(--color-subtle)] transition-colors"
      )}
    >
      {collapsed ? (
        <ChevronRight className="h-3 w-3" />
      ) : (
        <MoreHorizontal className="h-3 w-3" />
      )}
    </button>
  );
}

function SkeletonRows({
  columns,
  count,
  density,
  hasSelection,
  hasActions,
}: {
  columns: number;
  count: number;
  density: Density;
  hasSelection: boolean;
  hasActions: boolean;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, ri) => (
        <tr key={ri} className={DENSITY_ROW[density]}>
          {hasSelection && (
            <td className={cn(DENSITY_CELL[density], "w-10")}>
              <Skeleton shape="rect" className="h-4 w-4" />
            </td>
          )}
          {Array.from({ length: columns }).map((_, ci) => (
            <td key={ci} className={DENSITY_CELL[density]}>
              <Skeleton shape="text" className="w-3/4" />
            </td>
          ))}
          {hasActions && (
            <td className={cn(DENSITY_CELL[density], "w-10")} />
          )}
        </tr>
      ))}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DataGrid<TRow>({
  columns,
  rows,
  rowKey,
  loading = false,
  emptyState,
  sort,
  onSort,
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onRefetch,
  selectedKeys,
  onSelectionChange,
  bulkActions,
  rowActions,
  onRowClick,
  showFooter = false,
  resizable = false,
  collapsedColumns: collapsedColumnsProp,
  onCollapsedColumnsChange,
  density = "default",
  datagrid = false,
  onAddRow,
  addRowLabel = "Add row",
  onDeleteRow,
  cellErrors,
  minHeight,
  className,
}: DataGridProps<TRow>) {
  // ── Column widths (resizing)
  const [colWidths, setColWidths] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(columns.filter((c) => c.width).map((c) => [c.key, c.width!]))
  );

  // ── Collapsed columns (uncontrolled fallback)
  const [internalCollapsed, setInternalCollapsed] = React.useState<Set<string>>(new Set());
  const collapsedColumns = collapsedColumnsProp ?? internalCollapsed;
  const setCollapsedColumns = (next: Set<string>) => {
    setInternalCollapsed(next);
    onCollapsedColumnsChange?.(next);
  };

  const toggleCollapse = (key: string) => {
    const next = new Set(collapsedColumns);
    next.has(key) ? next.delete(key) : next.add(key);
    setCollapsedColumns(next);
  };

  // ── Selection (uncontrolled fallback)
  const [internalSelected, setInternalSelected] = React.useState<Set<string | number>>(new Set());
  const selection = selectedKeys ?? internalSelected;
  const setSelection = (next: Set<string | number>) => {
    setInternalSelected(next);
    onSelectionChange?.(next);
  };

  const hasSelection = !!onSelectionChange || !!bulkActions;
  const allKeys = rows.map(rowKey);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selection.has(k));
  const someSelected = !allSelected && allKeys.some((k) => selection.has(k));

  const toggleAll = () => {
    if (allSelected) setSelection(new Set());
    else setSelection(new Set(allKeys));
  };

  const toggleRow = (key: string | number) => {
    const next = new Set(selection);
    next.has(key) ? next.delete(key) : next.add(key);
    setSelection(next);
  };

  const selectedRows = rows.filter((r) => selection.has(rowKey(r)));

  // ── Sorting
  const handleSort = (col: ColumnDef<TRow>) => {
    if (!col.sortable || !onSort) return;
    if (sort?.columnKey === col.key) {
      if (sort.dir === "asc") onSort({ columnKey: col.key, dir: "desc" });
      else onSort(null);
    } else {
      onSort({ columnKey: col.key, dir: "asc" });
    }
  };

  // ── Column resize
  const resizingRef = React.useRef<{ key: string; startX: number; startWidth: number } | null>(null);

  const startResize = (e: React.MouseEvent, col: ColumnDef<TRow>) => {
    e.preventDefault();
    const startWidth = colWidths[col.key] ?? col.width ?? 120;
    resizingRef.current = { key: col.key, startX: e.clientX, startWidth };

    const onMouseMove = (ev: MouseEvent) => {
      if (!resizingRef.current) return;
      const delta = ev.clientX - resizingRef.current.startX;
      const minW = col.minWidth ?? 60;
      const nextWidth = Math.max(minW, resizingRef.current.startWidth + delta);
      setColWidths((prev) => ({ ...prev, [resizingRef.current!.key]: nextWidth }));
    };

    const onMouseUp = () => {
      resizingRef.current = null;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // ── Pagination helpers
  const totalPages = pagination ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize)) : 1;

  // ── Visible columns (collapsed ones shrink to a narrow stub)
  const hasFooter = showFooter && columns.some((c) => c.footer !== undefined);
  const hasActions = !!rowActions?.length || (datagrid && !!onDeleteRow);

  // ── Bulk action bar
  const showBulkBar = hasSelection && selection.size > 0 && bulkActions && bulkActions.length > 0;

  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 px-1 pb-2 flex-wrap">
        {/* Bulk action bar */}
        {showBulkBar ? (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-[var(--color-ink)]">
              {selection.size} selected
            </span>
            {bulkActions!.map((action, i) => (
              <Button
                key={i}
                size="sm"
                variant="outline"
                onClick={() => action.onClick(selectedRows)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
            <Button size="sm" variant="ghost" onClick={() => setSelection(new Set())}>
              Clear
            </Button>
          </div>
        ) : (
          <div />
        )}

        {/* Right toolbar */}
        <div className="flex items-center gap-2 ml-auto">
          {onRefetch && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onRefetch}
              disabled={loading}
              title="Refetch"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </Button>
          )}
          {datagrid && onAddRow && (
            <Button type="button" size="sm" variant="outline" onClick={onAddRow}>
              <Plus className="h-4 w-4" />
              {addRowLabel}
            </Button>
          )}
        </div>
      </div>

      {/* ── Table wrapper ── */}
      <div
        className="w-full overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)]"
        style={minHeight ? { minHeight } : undefined}
      >
        <table className={cn("w-full caption-bottom text-sm border-collapse", minHeight && "h-full")}>
          {/* ── Colgroup for resizing ── */}
          <colgroup>
            {hasSelection && <col style={{ width: 40 }} />}
            {columns.map((col) => {
              const collapsed = collapsedColumns.has(col.key);
              const w = collapsed ? 36 : colWidths[col.key] ?? col.width;
              return <col key={col.key} style={w ? { width: w } : undefined} />;
            })}
            {hasActions && <col style={{ width: datagrid ? 80 : 48 }} />}
          </colgroup>

          {/* ── Header ── */}
          <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
            <tr>
              {hasSelection && (
                <th className={cn(DENSITY_HEAD[density], "w-10")}>
                  <Checkbox
                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                    onCheckedChange={toggleAll}
                  />
                </th>
              )}

              {columns.map((col) => {
                const collapsed = collapsedColumns.has(col.key);
                const sortDir = sort?.columnKey === col.key ? sort.dir : null;
                const isCollapsible = col.collapsible !== false;
                const w = colWidths[col.key] ?? col.width;
                const align = col.align ?? "left";

                return (
                  <th
                    key={col.key}
                    style={w && !collapsed ? { width: w } : collapsed ? { width: 36 } : undefined}
                    onClick={() => !collapsed && handleSort(col)}
                    className={cn(
                      DENSITY_HEAD[density],
                      "relative select-none whitespace-nowrap overflow-hidden",
                      "text-xs font-medium text-[var(--color-ink)] uppercase tracking-wide",
                      "border-r border-[var(--color-border)] last:border-r-0",
                      align === "center" && "text-center",
                      align === "right" && "text-right",
                      col.sortable && !collapsed && "cursor-pointer hover:text-[var(--color-ink)] hover:bg-[var(--color-overlay)] transition-colors",
                    )}
                  >
                    {collapsed ? (
                      <div className="flex justify-center">
                        <CollapseToggle collapsed={true} onClick={() => toggleCollapse(col.key)} />
                      </div>
                    ) : (
                      <div className={cn(
                        "flex items-center gap-1",
                        align === "center" && "justify-center",
                        align === "right" && "justify-end",
                      )}>
                        <span className="truncate">{col.header}</span>
                        {col.sortable && <SortIcon dir={sortDir} />}
                        {isCollapsible && (
                          <CollapseToggle collapsed={false} onClick={() => toggleCollapse(col.key)} />
                        )}
                      </div>
                    )}

                    {/* Resize handle */}
                    {resizable && !collapsed && (
                      <div
                        onMouseDown={(e) => startResize(e, col)}
                        className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize hover:bg-[var(--color-accent-300)] transition-colors"
                      />
                    )}
                  </th>
                );
              })}

              {hasActions && (
                <th className={cn(DENSITY_HEAD[density], "w-10 text-center")} />
              )}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-elevated)]">
            {loading ? (
              <SkeletonRows
                columns={columns.filter((c) => !collapsedColumns.has(c.key)).length}
                count={pagination?.pageSize ?? 5}
                density={density}
                hasSelection={hasSelection}
                hasActions={hasActions}
              />
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (hasSelection ? 1 : 0) +
                    (hasActions ? 1 : 0)
                  }
                  className="py-16 text-center text-sm text-[var(--color-ink)]"
                >
                  {emptyState ?? "No results found."}
                </td>
              </tr>
            ) : (
              rows.map((row, ri) => {
                const key = rowKey(row);
                const isSelected = selection.has(key);
                const rowErrors = cellErrors?.[key];

                return (
                  <tr
                    key={key}
                    onClick={onRowClick ? () => onRowClick(row, ri) : undefined}
                    className={cn(
                      DENSITY_ROW[density],
                      "transition-colors duration-[var(--duration-fast)]",
                      onRowClick && "cursor-pointer",
                      isSelected
                        ? "bg-[var(--color-accent-50)] hover:bg-[var(--color-accent-100)]/60"
                        : "hover:bg-[var(--color-surface)]"
                    )}
                  >
                    {hasSelection && (
                      <td
                        className={cn(DENSITY_CELL[density], "w-10")}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(key)}
                        />
                      </td>
                    )}

                    {columns.map((col) => {
                      const collapsed = collapsedColumns.has(col.key);
                      const cellErr = rowErrors?.[col.key];
                      const align = col.align ?? "left";

                      return (
                        <td
                          key={col.key}
                          className={cn(
                            DENSITY_CELL[density],
                            "align-middle border-r border-[var(--color-border)] last:border-r-0",
                            "overflow-hidden",
                            align === "center" && "text-center",
                            align === "right" && "text-right",
                            collapsed && "w-9 p-0",
                            cellErr && "bg-[var(--color-danger-surface)]"
                          )}
                          title={cellErr}
                        >
                          {collapsed ? null : (
                            <div className="relative">
                              {col.cell ? col.cell(row, ri) : null}
                              {cellErr && (
                                <p className="absolute -bottom-4 left-0 text-xs text-[var(--color-danger)] whitespace-nowrap z-10">
                                  {cellErr}
                                </p>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}

                    {hasActions && (
                      <td
                        className={cn(DENSITY_CELL[density], "text-right")}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          {rowActions?.map((action, ai) => {
                            if (action.show && !action.show(row)) return null;
                            return (
                              <button
                                key={ai}
                                type="button"
                                title={action.label}
                                onClick={() => action.onClick(row, ri)}
                                className={cn(
                                  "p-1.5 rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-fast)]",
                                  action.variant === "danger"
                                    ? "text-[var(--color-danger)] hover:bg-[var(--color-danger-surface)]"
                                    : "text-[var(--color-subtle)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
                                )}
                              >
                                {action.icon ?? <span className="text-xs">{action.label}</span>}
                              </button>
                            );
                          })}
                          {datagrid && onDeleteRow && (
                            <button
                              type="button"
                              title="Delete row"
                              onClick={() => onDeleteRow(row, ri)}
                              className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger-surface)] transition-colors duration-[var(--duration-fast)]"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
            {/* Spacer row — absorbs leftover height when minHeight is set */}
            {minHeight && !loading && (
              <tr className="h-full">
                <td
                  colSpan={
                    columns.length +
                    (hasSelection ? 1 : 0) +
                    (hasActions ? 1 : 0)
                  }
                />
              </tr>
            )}
          </tbody>

          {/* ── Footer (grand totals) ── */}
          {hasFooter && !loading && rows.length > 0 && (
            <tfoot className="border-t-2 border-[var(--color-border)] bg-[var(--color-surface)]">
              <tr>
                {hasSelection && <td className={DENSITY_CELL[density]} />}
                {columns.map((col) => {
                  const collapsed = collapsedColumns.has(col.key);
                  const align = col.align ?? "left";
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        DENSITY_CELL[density],
                        "font-semibold text-[var(--color-ink)] border-r border-[var(--color-border)] last:border-r-0",
                        align === "center" && "text-center",
                        align === "right" && "text-right",
                        collapsed && "w-9 p-0"
                      )}
                    >
                      {collapsed ? null : col.footer}
                    </td>
                  );
                })}
                {hasActions && <td className={DENSITY_CELL[density]} />}
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* ── Pagination ── */}
      {pagination && (
        <div className="flex items-center justify-between gap-4 pt-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
            <span>Rows per page</span>
            <Select
              value={String(pagination.pageSize)}
              onValueChange={(v) => onPageSizeChange?.(Number(v))}
            >
              <SelectTrigger className="h-8 w-20 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((s) => (
                  <SelectItem key={s} value={String(s)}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1 text-sm text-[var(--color-ink)]">
            <span className="mr-2">
              {pagination.total === 0
                ? "0 rows"
                : `${(pagination.page - 1) * pagination.pageSize + 1}–${Math.min(
                    pagination.page * pagination.pageSize,
                    pagination.total
                  )} of ${pagination.total}`}
            </span>
            <button
              type="button"
              onClick={() => onPageChange?.(1)}
              disabled={pagination.page <= 1}
              className={cn(paginationBtn)}
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className={cn(paginationBtn)}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-[var(--color-ink)] font-medium tabular-nums">
              {pagination.page} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page >= totalPages}
              className={cn(paginationBtn)}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onPageChange?.(totalPages)}
              disabled={pagination.page >= totalPages}
              className={cn(paginationBtn)}
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const paginationBtn = [
  "p-1.5 rounded-[var(--radius-sm)]",
  "text-[var(--color-subtle)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]",
  "disabled:opacity-30 disabled:pointer-events-none",
  "transition-colors duration-[var(--duration-fast)]",
].join(" ");

DataGrid.displayName = "DataGrid";
