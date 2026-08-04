import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, TrendingUp, Package, ShoppingBag, Sparkles, ArrowUpRight, Clock, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from "lucide-react";
import type { Company, Deal, PurchaseOrder, Supplier, AiTask } from "../lib/supabase";
import { getCompanies, getDeals, getPurchaseOrders, getSuppliers, getAiTasks } from "../lib/data";
import { PageHeader } from "../components/ui/PageHeader";
import { StatCard } from "../components/ui/StatCard";
import { Card, CardHeader, CardBody, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Progress } from "../components/ui/Progress";
import { Spinner } from "../components/ui/Spinner";
import { formatCompactCurrency, formatCurrency, formatRelativeTime } from "../lib/format";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [pos, setPos] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [aiTasks, setAiTasks] = useState<AiTask[]>([]);

  useEffect(() => {
    async function load() {
      const [c, d, p, s, t] = await Promise.all([
        getCompanies(),
        getDeals(),
        getPurchaseOrders(),
        getSuppliers(),
        getAiTasks(5),
      ]);
      setCompanies(c);
      setDeals(d);
      setPos(p);
      setSuppliers(s);
      setAiTasks(t);
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
  const runningTasks = aiTasks.filter((t) => t.status === "running" || t.status === "pending");

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
          label="Total Pipeline Value"
          value={formatCompactCurrency(totalPipeline)}
          icon={<TrendingUp size={20} />}
          trend={{ value: "+12.5%", positive: true }}
          tone="copper"
        />
        <StatCard
          label="Active Companies"
          value={companies.length}
          icon={<Building2 size={20} />}
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
                    <div className="w-24 text-right">
                      <span className="text-sm font-medium text-surface-700">{formatCompactCurrency(value)}</span>
                      <span className="text-xs text-surface-400 ml-1">({stageDeals.length})</span>
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
                  <CheckCircle2 size={14} className="text-green-500" />
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
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent POs + AI Tasks */}
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
              <CardTitle>AI Task Activity</CardTitle>
              <Link to="/ai-platform" className="text-xs font-medium text-copper-600 hover:text-copper-700 flex items-center gap-1">
                View all <ArrowUpRight size={12} />
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              {aiTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      task.status === "completed" ? "bg-green-50 text-green-600" :
                      task.status === "running" ? "bg-copper-50 text-copper-600" :
                      task.status === "pending" ? "bg-amber-50 text-amber-600" :
                      "bg-red-50 text-red-600"
                    }`}>
                      {task.status === "completed" ? <CheckCircle2 size={16} /> :
                       task.status === "running" ? <Sparkles size={16} className="animate-pulse-soft" /> :
                       task.status === "pending" ? <Clock size={16} /> :
                       <AlertCircle size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-900 capitalize">{task.task_type.replace(/_/g, " ")}</p>
                      <p className="text-xs text-surface-400">{formatRelativeTime(task.created_at)}</p>
                    </div>
                  </div>
                  <Badge tone={
                    task.status === "completed" ? "success" :
                    task.status === "running" ? "copper" :
                    task.status === "pending" ? "warning" : "error"
                  }>
                    {task.status}
                  </Badge>
                </div>
              ))}
              {runningTasks.length > 0 && (
                <div className="flex items-center gap-2 pt-2 text-xs text-copper-600">
                  <Sparkles size={12} className="animate-pulse-soft" />
                  {runningTasks.length} task{runningTasks.length > 1 ? "s" : ""} in progress
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
