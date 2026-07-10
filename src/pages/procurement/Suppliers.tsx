import { useEffect, useState } from "react";
import { Package, Plus, Search, Star, Mail, Phone, Globe } from "lucide-react";
import { supabase, type Supplier } from "../../lib/supabase";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";

export default function Suppliers() {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("suppliers").select("*").order("name");
      setSuppliers(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

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

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={15} />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((supplier, i) => (
          <Card key={supplier.id} hover className="p-5 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 text-white font-semibold">
                {supplier.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={12}
                      className={n <= supplier.rating ? "text-gold-500 fill-gold-500" : "text-surface-200"}
                    />
                  ))}
                </div>
                <Badge
                  tone={supplier.status === "active" ? "success" : supplier.status === "pending" ? "warning" : "neutral"}
                  dot
                >
                  {supplier.status}
                </Badge>
              </div>
            </div>

            <h3 className="text-base font-semibold text-surface-900">{supplier.name}</h3>
            <p className="text-sm text-surface-500 mb-3">{supplier.category}</p>

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
                <p className="text-xs text-surface-400">Payment Terms</p>
                <p className="text-sm font-medium text-surface-900">{supplier.payment_terms}</p>
              </div>
            </div>
          </Card>
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
