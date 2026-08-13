import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Boxes, Search, ShieldAlert, Star, Layers, CircleCheck } from "lucide-react";
import { getProducts } from "../../lib/data";
import type { Product, ProductLifecycleStatus } from "../../lib/supabase";
import { formatCurrency, formatNumber } from "../../lib/format";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { DataTable } from "../../components/ui/DataTable";
import { EmptyState } from "../../components/ui/EmptyState";

// Product Management — implements the Approved Product entity
// (ETA-Blueprint 04-DATA/Entities/Product: ETA-ENT-PRODUCT-001/002/004/005).
// Lifecycle values come from ETA-ENT-PRODUCT-005; categories and types from
// ETA-ENT-PRODUCT-001. Nothing on this screen is scored, ranked or predicted.

const LIFECYCLE_ORDER: ProductLifecycleStatus[] = [
  "Idea",
  "Draft",
  "Engineering Review",
  "Procurement Review",
  "Compliance Review",
  "Approved",
  "Active",
  "Revision",
  "Obsolete",
  "Archived",
];

const lifecycleTone: Record<ProductLifecycleStatus, "success" | "warning" | "error" | "neutral" | "info" | "copper"> = {
  Idea: "neutral",
  Draft: "neutral",
  "Engineering Review": "warning",
  "Procurement Review": "warning",
  "Compliance Review": "warning",
  Approved: "info",
  Active: "success",
  Revision: "copper",
  Obsolete: "error",
  Archived: "neutral",
};

export default function ProductList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products]
  );
  const types = useMemo(
    () => Array.from(new Set(products.map((p) => p.product_type))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        !q ||
        p.product_name.toLowerCase().includes(q) ||
        p.product_code.toLowerCase().includes(q) ||
        (p.sku ?? "").toLowerCase().includes(q) ||
        (p.manufacturer_part_number ?? "").toLowerCase().includes(q) ||
        (p.manufacturer_name ?? "").toLowerCase().includes(q) ||
        (p.grade ?? "").toLowerCase().includes(q);
      return (
        matchesSearch &&
        (categoryFilter === "all" || p.category === categoryFilter) &&
        (statusFilter === "all" || p.lifecycle_status === statusFilter) &&
        (typeFilter === "all" || p.product_type === typeFilter)
      );
    });
  }, [products, search, categoryFilter, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const active = products.filter((p) => p.lifecycle_status === "Active").length;
    const inReview = products.filter((p) =>
      ["Engineering Review", "Procurement Review", "Compliance Review"].includes(p.lifecycle_status)
    ).length;
    const strategic = products.filter((p) => p.strategic_item).length;
    const restricted = products.filter((p) => p.export_control || p.sanction_sensitive).length;
    return { active, inReview, strategic, restricted };
  }, [products]);

  return (
    <div>
      <PageHeader
        title="Products"
        description="Product master data — ETA-Blueprint ETA-ENT-PRODUCT-001 (Approved)"
        icon={<Boxes size={20} />}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active products" value={stats.active} icon={<CircleCheck size={18} />} tone="success" />
        <StatCard label="In review" value={stats.inReview} icon={<Layers size={18} />} tone="warning" />
        <StatCard label="Strategic items" value={stats.strategic} icon={<Star size={18} />} tone="copper" />
        <StatCard
          label="Export / sanction flagged"
          value={stats.restricted}
          icon={<ShieldAlert size={18} />}
          tone="info"
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder="Search name, code, SKU, MPN, grade…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={15} />}
        />
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          options={[{ value: "all", label: "All categories" }, ...categories.map((c) => ({ value: c, label: c }))]}
        />
        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          options={[{ value: "all", label: "All types" }, ...types.map((t) => ({ value: t, label: t }))]}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: "all", label: "All lifecycle statuses" },
            ...LIFECYCLE_ORDER.map((s) => ({ value: s, label: s })),
          ]}
        />
      </div>

      <DataTable
        data={filtered}
        loading={loading}
        onRowClick={(row) => navigate(`/products/${row.id}`)}
        paginated
        pageSize={12}
        emptyState={
          <EmptyState
            icon={<Boxes size={20} />}
            title="No products match these filters"
            description="Clear the search or filter selection to see the full catalogue."
          />
        }
        columns={[
          { key: "product_code", label: "Code", mono: true, sortable: true },
          {
            key: "product_name",
            label: "Product",
            sortable: true,
            render: (p) => (
              <div className="min-w-0">
                <p className="font-medium text-surface-900 truncate">{p.product_name}</p>
                <p className="text-xs text-surface-400 truncate">
                  {p.manufacturer_name ?? "No manufacturer"}
                  {p.manufacturer_part_number ? ` · ${p.manufacturer_part_number}` : ""}
                </p>
              </div>
            ),
          },
          { key: "category", label: "Category", sortable: true },
          { key: "product_type", label: "Type", sortable: true },
          {
            key: "specification",
            label: "Key spec",
            render: (p) => (
              <span className="text-surface-600">
                {[p.grade, p.size].filter(Boolean).join(" · ") || p.technical_standard || "—"}
              </span>
            ),
          },
          {
            key: "lead_time_days",
            label: "Lead time",
            align: "end",
            sortable: true,
            render: (p) => (p.lead_time_days == null ? "—" : `${formatNumber(p.lead_time_days)} d`),
          },
          {
            key: "standard_cost",
            label: "Standard cost",
            align: "right",
            sortable: true,
            mono: true,
            render: (p) =>
              p.standard_cost == null ? "—" : `${formatCurrency(p.standard_cost, p.currency)} / ${p.uom}`,
          },
          {
            key: "lifecycle_status",
            label: "Lifecycle",
            sortable: true,
            render: (p) => (
              <div className="flex items-center gap-1.5">
                <Badge tone={lifecycleTone[p.lifecycle_status]} dot>
                  {p.lifecycle_status}
                </Badge>
                {(p.export_control || p.sanction_sensitive) && (
                  <span title="Export-controlled or sanction-sensitive — compliance review required (BR-031)">
                    <ShieldAlert size={14} className="text-warning-dark" />
                  </span>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
