import { useEffect, useState } from "react";
import { Globe, FileCheck, Clock, TrendingUp, Package } from "lucide-react";
import type { SupplierProfile, SupplierQuote } from "../lib/supabase";
import { getSupplierProfiles, getSuppliers, getSupplierQuotes, getPurchaseOrders } from "../lib/data";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader, CardBody, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Progress } from "../components/ui/Progress";
import { StatCard } from "../components/ui/StatCard";
import { Spinner } from "../components/ui/Spinner";
import { formatCurrency, formatRelativeTime } from "../lib/format";

const portalStatusTones: Record<string, "neutral" | "info" | "warning" | "success" | "error"> = {
  pending: "neutral",
  onboarding: "warning",
  active: "success",
  suspended: "error",
};

const quoteStatusTones: Record<string, "neutral" | "info" | "warning" | "success" | "error"> = {
  submitted: "warning",
  under_review: "info",
  accepted: "success",
  rejected: "error",
};

export default function SupplierPortal() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<(SupplierProfile & { supplier_name?: string; supplier_category?: string })[]>([]);
  const [quotes, setQuotes] = useState<(SupplierQuote & { supplier_name?: string; po_number?: string })[]>([]);

  useEffect(() => {
    async function load() {
      const [profileData, suppliers, quoteData, pos] = await Promise.all([
        getSupplierProfiles(),
        getSuppliers(),
        getSupplierQuotes(),
        getPurchaseOrders(),
      ]);

      const supplierMap = new Map(suppliers.map((s) => [s.id, s] as [string, { name: string; category: string }]));
      const poMap = new Map(pos.map((p) => [p.id, p.po_number]));

      const enrichedProfiles = profileData.map((p) => {
        const supplier = p.supplier_id ? supplierMap.get(p.supplier_id) : undefined;
        return { ...p, supplier_name: supplier?.name, supplier_category: supplier?.category };
      });
      const enrichedQuotes = quoteData.map((q) => {
        const supplier = q.supplier_id ? supplierMap.get(q.supplier_id) : undefined;
        return { ...q, supplier_name: supplier?.name, po_number: q.po_id ? poMap.get(q.po_id) : undefined };
      });

      setProfiles(enrichedProfiles);
      setQuotes(enrichedQuotes);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="flex h-full items-center justify-center py-20"><Spinner size="lg" /></div>;
  }

  const activeCount = profiles.filter((p) => p.portal_status === "active").length;
  const onboardingCount = profiles.filter((p) => p.portal_status === "onboarding").length;
  const pendingQuotes = quotes.filter((q) => q.status === "submitted" || q.status === "under_review").length;
  const totalQuoteValue = quotes.reduce((s, q) => s + q.total, 0);

  return (
    <div>
      <PageHeader
        title="Supplier Portal"
        description="Manage supplier onboarding, profiles, and quotes"
        icon={<Globe size={20} />}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Active Suppliers" value={activeCount} icon={<Globe size={20} />} tone="success" />
        <StatCard label="Onboarding" value={onboardingCount} icon={<Clock size={20} />} tone="warning" />
        <StatCard label="Pending Quotes" value={pendingQuotes} icon={<Package size={20} />} tone="copper" />
        <StatCard label="Total Quote Value" value={formatCurrency(totalQuoteValue)} icon={<TrendingUp size={20} />} tone="info" />
      </div>

      {/* Onboarding Pipeline */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Supplier Onboarding Pipeline</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {profiles.map((profile, i) => (
              <div
                key={profile.id}
                className="flex items-center gap-4 py-3 border-b border-surface-100 last:border-0 animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-copper-500 to-copper-700 text-white text-xs font-semibold shrink-0">
                  {(profile.supplier_name ?? "S").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-surface-900">{profile.supplier_name}</p>
                    <Badge tone={portalStatusTones[profile.portal_status]} dot>
                      {profile.portal_status}
                    </Badge>
                  </div>
                  <p className="text-xs text-surface-400 mt-0.5">{profile.supplier_category}</p>
                </div>
                <div className="hidden sm:block w-32">
                  <p className="text-xs text-surface-400 mb-1">Onboarding Step {profile.onboarding_step}/5</p>
                  <Progress value={profile.onboarding_step} max={5} tone={profile.portal_status === "active" ? "success" : "warning"} size="sm" />
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs text-surface-500">
                  {profile.documents_submitted ? (
                    <><FileCheck size={14} className="text-success" /> Docs submitted</>
                  ) : (
                    <><Clock size={14} className="text-warning" /> Awaiting docs</>
                  )}
                </div>
                <div className="text-xs text-surface-400 hidden lg:block w-20 text-right">
                  {formatRelativeTime(profile.last_login)}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Recent Quotes */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Quotes</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {quotes.map((quote, i) => (
              <div
                key={quote.id}
                className="flex items-center justify-between py-2.5 border-b border-surface-100 last:border-0 animate-fade-in"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-100 text-surface-600">
                    <Package size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900">{quote.quote_number}</p>
                    <p className="text-xs text-surface-400">{quote.supplier_name} {quote.po_number && `· ${quote.po_number}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-surface-900">{formatCurrency(quote.total, quote.currency)}</span>
                  <Badge tone={quoteStatusTones[quote.status]} dot>{quote.status.replace(/_/g, " ")}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
