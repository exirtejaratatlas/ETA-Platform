import { type ReactNode, useMemo, useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "./Skeleton";
import { EmptyState } from "./EmptyState";

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
  /**
   * "left"/"right" are physical and always render that way regardless of dir
   * (matches pre-existing behavior for e.g. monetary columns). "start"/"end"
   * are logical and mirror under dir="rtl". Which one numeric columns should
   * use under RTL is undecided -- see UI-COMPONENT-INVENTORY.md.
   */
  align?: "left" | "right" | "center" | "start" | "end";
  sortable?: boolean;
  /** Typography.md: IDs/technical values use JetBrains Mono. */
  mono?: boolean;
}

type SortDirection = "asc" | "desc";

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyState?: ReactNode;
  loading?: boolean;
  /** Sticky header on vertical scroll -- opt-in, off by default. */
  stickyHeader?: boolean;
  /** Page-size pagination footer -- opt-in, off by default (renders full list otherwise). */
  paginated?: boolean;
  pageSize?: number;
  /** Row selection via checkbox column -- opt-in, controlled by the caller. */
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

const alignClass: Record<NonNullable<Column<unknown>["align"]>, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
  start: "text-start",
  end: "text-end",
};

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  emptyState,
  loading = false,
  stickyHeader = false,
  paginated = false,
  pageSize = 25,
  selectable = false,
  selectedIds,
  onSelectionChange,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return -1;
      if (bv == null) return 1;
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortDirection === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [data, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const visible = paginated ? sorted.slice((pageSafe - 1) * pageSize, pageSafe * pageSize) : sorted;

  const selected = selectedIds ?? [];
  const allVisibleSelected = visible.length > 0 && visible.every((row) => selected.includes(row.id));
  const someVisibleSelected = visible.some((row) => selected.includes(row.id));

  const toggleRow = (id: string) => {
    if (!onSelectionChange) return;
    onSelectionChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  const toggleAllVisible = () => {
    if (!onSelectionChange) return;
    if (allVisibleSelected) {
      const visibleIds = new Set(visible.map((r) => r.id));
      onSelectionChange(selected.filter((id) => !visibleIds.has(id)));
    } else {
      const merged = new Set([...selected, ...visible.map((r) => r.id)]);
      onSelectionChange([...merged]);
    }
  };

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.key);
      setSortDirection("asc");
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return emptyState ? (
      <div className="py-16 text-center">{emptyState}</div>
    ) : (
      <EmptyState title="No data available" />
    );
  }

  return (
    <div>
      <div className={`overflow-x-auto ${stickyHeader ? "max-h-[28rem] overflow-y-auto" : ""}`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b border-surface-200 ${stickyHeader ? "sticky top-0 bg-white z-10" : ""}`}>
              {selectable && (
                <th className="w-10 ps-4 py-2.5">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = !allVisibleSelected && someVisibleSelected;
                    }}
                    onChange={toggleAllVisible}
                    aria-label="Select all rows"
                    className="h-4 w-4 rounded border-surface-300 text-copper-600 focus-ring"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-2.5 text-xs font-medium text-surface-500 uppercase tracking-wider ${
                    col.align ? alignClass[col.align] : "text-start"
                  } ${col.className || ""}`}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col)}
                      className="inline-flex items-center gap-1 hover:text-surface-700 transition-colors focus-ring rounded"
                    >
                      {col.label}
                      {sortKey === col.key ? (
                        sortDirection === "asc" ? (
                          <ChevronUp size={12} />
                        ) : (
                          <ChevronDown size={12} />
                        )
                      ) : (
                        <ChevronsUpDown size={12} className="text-surface-300" />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-surface-100 transition-colors ${
                  onRowClick ? "cursor-pointer hover:bg-surface-50" : ""
                } animate-fade-in`}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {selectable && (
                  <td className="ps-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                      aria-label="Select row"
                      className="h-4 w-4 rounded border-surface-300 text-copper-600 focus-ring"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-sm text-surface-700 ${col.align ? alignClass[col.align] : "text-start"} ${
                      col.mono ? "font-mono" : ""
                    } ${col.className || ""}`}
                  >
                    {col.render ? col.render(row) : ((row as Record<string, unknown>)[col.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-surface-100 px-1 pt-3 mt-1">
          <p className="text-xs text-surface-500">
            Page {pageSafe} of {totalPages} &middot; {sorted.length} rows
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pageSafe === 1}
              aria-label="Previous page"
              className="rounded-lg p-1.5 text-surface-500 hover:bg-surface-100 disabled:opacity-40 disabled:pointer-events-none focus-ring"
            >
              <ChevronLeft size={16} className="rtl:-scale-x-100" />
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={pageSafe === totalPages}
              aria-label="Next page"
              className="rounded-lg p-1.5 text-surface-500 hover:bg-surface-100 disabled:opacity-40 disabled:pointer-events-none focus-ring"
            >
              <ChevronRight size={16} className="rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
