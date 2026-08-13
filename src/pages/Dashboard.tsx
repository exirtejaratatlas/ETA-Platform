import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Package, ShoppingBag, ArrowUpRight, FileText, Gavel, CircleCheck } from "lucide-react";
import type { Company, Deal, PurchaseOrder, Supplier, Rfq } from "../lib/supabase";
import { getCompanies, getDeals, getPurchaseOrders, getSuppliers, getRfqs, getRfqLines, getRfqResponses } from "../lib/data";
import { evaluateRfqRules, ruleSummary } from "../lib/rfqLifecycle";
import { PageHeader } from "../components/ui/PageHeader";
import { StatCard } from "../components/ui/StatCard";
import { Card, CardHeader, CardBody, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Progress } from "../components/ui/Progress";
import { Spinner } from "../components/ui/Spinner";
import { EmptyState } from "../components/ui/EmptyState";
import { formatCompactCurrency, formatCurrency } from "../lib/format";

const OPEN_RFQ_STATUSES = [
  "Draft",
  "Engineering Review",
  "Procurement Review",
  "Approved",
  "Sent",
  "Supplier Responding",
  "Quotation Received",
  "Evaluation",
];

type AttentionRfq = {
  rfq: Rfq;
  blockers: number;
  daysLeft: number | null;
};

function daysUntil(iso: string | null): number | null {
  if (!iso) return null;
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / 86_400_000);
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [pos, setPos] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [attentionRfqs, setAttentionRfqs] = useState<AttentionRfq[]>([]);

  useEffect(() => {
    async function load() {
      const [c, d, p, s, r] = await Promise.all([
        getCompanies(),
        getDeals(),
        getPurchaseOrders(),
        getSuppliers(),
        getRfqs(),
      ]);
      setCompanies(c);
      setDeals(d);
      setPos(p);
      setSuppliers(s);
      setRfqs(r);

      const openRfqs = r.filter((rfq) => OPEN_RFQ_STATUSES.includes(rfq.rfq_status));
      const withRules = await Promise.all(
        openRfqs.map(async (rfq) => {
          const [lines, responses] = await Promise.all([getRfqLines(rfq.id), getRfqResponses(rfq.id)]);
          const results = evaluateRfqRules(rfq, lines, responses);
          const summary = ruleSummary(results);
          return { rfq, blockers: summary.blockers, daysLeft: daysUntil(rfq.submission_deadline) };
        })
      );
      setAttentionRfqs(withRules);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  const activeDeals = deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
  const totalPipeline = activeDeals.reduce((sum, d) => sum + d.value, 0);
  const wonDeals = deals.filter((d) => d.stage === "won");
  const totalRevenue = wonDeals.reduce((sum, d) => sum + d.value, 0);
  const openPOs = pos.filter((p) => p.status !== "received" && p.status !== "cancelled");
  const activeSuppliers = suppliers.filter((s) => s.status === "active");
  const openRfqs = rfqs.filter((r) => OPEN_RFQ_STATUSES.includes(r.rfq_status));
  const openRfqBudget = openRfqs.reduce((sum, r) => sum + (r.budget_amount ?? 0), 0);

  const needsAttention = attentionRfqs
    .filter((a) => a.blockers > 0 || (a.daysLeft !== null && a.daysLeft >= 0 && a.daysLeft <= 14))
    .sort((a, b) => {
      if (a.blockers !== b.blockers) return b.blockers - a.blockers;
      const da = a.daysLeft ?? Infinity;
      const db = b.daysLeft ?? Infinity;
      return da - db;
    })
    .slice(0, 5);

  const stageColors: Record<string, "copper" | "info" | "success" | "warning" | "error" | "neutral"> = {
    lead: "neutral",
    qualified: "info",
    proposal: "warning",
    negotiation: "copper",
    won: "success",
    lost: "error",
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your business operations"
        icon={<Building2 size={20} />}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          label="Open RFQs"
          value={openRfqs.length}
          icon={<FileText size={20} />}
          tone="copper"
        />
        <StatCard
          label="Budgeted value, open RFQs"
          value={formatCompactCurrency(openRfqBudget)}
          icon={<Gavel size={20} />}
          tone="info"
        />
        <StatCard
          label="Open Purchase Orders"
          value={openPOs.length}
          icon={<ShoppingBag size={20} />}
          tone="warning"
        />
        <StatCard
          label="Active Suppliers"
          value={activeSuppliers.length}
          icon={<Package size={20} />}
          tone="neutral"
        />
      </div>

      {/* Revenue + Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sales Pipeline</CardTitle>
              <Link to="/crm/deals" className="text-xs font-medium text-copper-600 hover:text-copper-700 flex items-center gap-1">
                View all <ArrowUpRight size={12} />
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {["lead", "qualified", "proposal", "negotiation", "won"].map((stage) => {
                const stageDeals = deals.filter((d) => d.stage === stage);
                const value = stageDeals.reduce((s, d) => s + d.value, 0);
                const maxVal = Math.max(totalPipeline + totalRevenue, 1);
                return (
                  <div key={stage} className="flex items-center gap-3">
                    <div className="w-24 shrink-0">
                      <Badge tone={stageColors[stage]} dot>
                        {stage.charAt(0).toUpperCase() + stage.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <Progress
                        value={value}
                        max={maxVal}
                        tone={stageColors[stage]}
                        size="sm"
                      />
                    </div>
                    <div className="w-24 text-end">
                      <span className="text-sm font-medium text-surface-700">{formatCompactCurrency(value)}</span>
                      <span className="text-xs text-surface-400 ms-1">({stageDeals.length})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Summary</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-surface-500 uppercase tracking-wide font-medium">Won Deals Revenue</p>
                <p className="text-3xl font-semibold text-surface-900 mt-1">{formatCurrency(totalRevenue)}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <CircleCheck size={14} className="text-success" />
                  <span className="text-xs text-surface-500">{wonDeals.length} deals closed</span>
                </div>
              </div>
              <div className="pt-3 border-t border-surface-100">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">Pipeline Value</span>
                  <span className="font-medium text-surface-900">{formatCompactCurrency(totalPipeline)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-surface-500">Active Deals</span>
                  <span className="font-medium text-surface-900">{activeDeals.length}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-surface-500">Avg Deal Size</span>
                  <span className="font-medium text-surface-900">
                    {formatCompactCurrency(activeDeals.length > 0 ? totalPipeline / activeDeals.length : 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-surface-500">Active Companies</span>
                  <span className="font-medium text-surface-900">{companies.length}</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent POs + RFQs Requiring Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Purchase Orders</CardTitle>
              <Link to="/procurement/orders" className="text-xs font-medium text-copper-600 hover:text-copper-700 flex items-center gap-1">
                View all <ArrowUpRight size={12} />
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              {pos.slice(0, 5).map((po) => (
                <div key={po.id} className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-100 text-surface-600">
                      <ShoppingBag size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-900">{po.po_number}</p>
                      <p className="text-xs text-surface-400">{formatCurrency(po.total, po.currency)}</p>
                    </div>
                  </div>
                  <Badge
                    tone={
                      po.status === "received" ? "success" :
                      po.status === "shipped" ? "copper" :
                      po.status === "approved" ? "info" :
                      po.status === "cancelled" ? "error" :
                      po.status === "submitted" ? "warning" : "neutral"
                    }
                  >
                    {po.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>RFQ Requiring Attention</CardTitle>
              <Link to="/rfq" className="text-xs font-medium text-copper-600 hover:text-copper-700 flex items-center gap-1">
                View all <ArrowUpRight size={12} />
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            {needsAttention.length === 0 ? (
              <EmptyState
                icon={<CircleCheck size={20} />}
                title="Nothing blocked"
                description="No RFQ has an open blocker or a deadline inside 14 days."
              />
            ) : (
              <div className="space-y-1">
                {needsAttention.map(({ rfq, blockers, daysLeft }) => (
                  <Link
                    key={rfq.id}
                    to={`/rfq/${rfq.id}`}
                    className="flex items-center justify-between gap-3 rounded-lg py-2 px-2 -mx-2 hover:bg-surface-50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-mono text-surface-400">{rfq.rfq_number}</p>
                      <p className="text-sm font-medium text-surface-900 truncate">{rfq.rfq_title}</p>
                      <p className="text-xs text-surface-400 truncate">{rfq.customer_name}</p>
                    </div>
                    {blockers > 0 ? (
                      <Badge tone="error">{blockers} blocker{blockers === 1 ? "" : "s"}</Badge>
                    ) : (
                      <Badge tone="warning">{daysLeft}d left</Badge>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
