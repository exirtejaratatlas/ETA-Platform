import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Plus, Search, Star, Mail, Phone, Globe } from "lucide-react";
import { getSuppliers } from "../../lib/data";
import type { Supplier, SupplierCategory, SupplierLifecycleStatus } from "../../lib/supabase";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";

const CATEGORIES: SupplierCategory[] = [
  "Manufacturer",
  "Distributor",
  "Trading Company",
  "Service Provider",
  "Logistics Provider",
  "OEM",
  "EPC Contractor",
  "Consultant",
];

const LIFECYCLE_STATUSES: SupplierLifecycleStatus[] = [
  "Draft",
  "Under Review",
  "Approved",
  "Active",
  "Suspended",
  "Inactive",
  "Archived",
];

const lifecycleTone: Record<SupplierLifecycleStatus, "success" | "warning" | "error" | "neutral" | "info"> = {
  Draft: "neutral",
  "Under Review": "warning",
  Approved: "info",
  Active: "success",
  Suspended: "error",
  Inactive: "neutral",
  Archived: "neutral",
};

export default function SupplierList() {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    async function load() {
      const data = await getSuppliers();
      setSuppliers(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = suppliers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.supplier_code.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || s.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || s.lifecycle_status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return <div className="flex h-full items-center justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div>
      <PageHeader
        title="Suppliers"
        description={`${suppliers.length} vendors in your network`}
        icon={<Package size={20} />}
        actions={<Button size="sm"><Plus size={15} /> Add Supplier</Button>}
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="max-w-sm flex-1">
          <Input
            placeholder="Search by name, code or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={15} />}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-9 rounded-lg border border-surface-300 bg-white px-3 text-sm text-surface-700 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/20 focus:outline-none"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-lg border border-surface-300 bg-white px-3 text-sm text-surface-700 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/20 focus:outline-none"
        >
          <option value="all">All statuses</option>
          {LIFECYCLE_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((supplier, i) => (
          <Link key={supplier.id} to={`/suppliers/${supplier.id}`}>
            <Card hover className="p-5 h-full animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-copper-500 to-copper-700 text-white font-semibold">
                  {supplier.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={12}
                        className={n <= supplier.rating ? "text-copper-500 fill-copper-500" : "text-surface-200"}
                      />
                    ))}
                  </div>
                  <Badge tone={lifecycleTone[supplier.lifecycle_status]} dot>
                    {supplier.lifecycle_status}
                  </Badge>
                </div>
              </div>

              <p className="text-[11px] font-medium text-surface-400 tracking-wide">{supplier.supplier_code}</p>
              <h3 className="text-base font-semibold text-surface-900">{supplier.name}</h3>
              <p className="text-sm text-surface-500 mb-3">{supplier.category} · {supplier.country}</p>

              <div className="space-y-1.5 text-sm text-surface-600">
                {supplier.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-surface-400" />
                    <span className="truncate">{supplier.email}</span>
                  </div>
                )}
                {supplier.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-surface-400" />
                    <span>{supplier.phone}</span>
                  </div>
                )}
                {supplier.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-surface-400" />
                    <span className="truncate">{supplier.website}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-100">
                <div>
                  <p className="text-xs text-surface-400">Classification</p>
                  <p className="text-sm font-medium text-surface-900">{supplier.classification}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-surface-400">Payment Terms</p>
                  <p className="text-sm font-medium text-surface-900">{supplier.payment_terms}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <Package size={32} className="mx-auto text-surface-300 mb-3" />
          <p className="text-sm text-surface-400">No suppliers found</p>
        </div>
      )}
    </div>
  );
}
