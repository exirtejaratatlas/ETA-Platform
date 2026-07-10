import { useEffect, useState } from "react";
import { TrendingUp, Plus } from "lucide-react";
import { supabase, type Deal } from "../../lib/supabase";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Progress } from "../../components/ui/Progress";
import { Spinner } from "../../components/ui/Spinner";
import { formatCurrency, formatDate } from "../../lib/format";

const stages = ["lead", "qualified", "proposal", "negotiation", "won", "lost"] as const;
const stageTones: Record<string, "neutral" | "brand" | "teal" | "gold" | "success" | "error"> = {
  lead: "neutral",
  qualified: "brand",
  proposal: "teal",
  negotiation: "gold",
  won: "success",
  lost: "error",
};

export default function Deals() {
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState<(Deal & { company_name?: string; contact_name?: string })[]>([]);

  useEffect(() => {
    async function load() {
      const { data: dealData } = await supabase.from("deals").select("*").order("created_at", { ascending: false });
      const { data: companies } = await supabase.from("companies").select("id, name");
      const { data: contacts } = await supabase.from("contacts").select("id, first_name, last_name");

      const companyMap = new Map((companies ?? []).map((c) => [c.id, c.name] as [string, string]));
      const contactMap = new Map((contacts ?? []).map((c) => [c.id, `${c.first_name} ${c.last_name}`] as [string, string]));

      const enriched = (dealData ?? []).map((d) => ({
        ...d,
        company_name: d.company_id ? companyMap.get(d.company_id) : undefined,
        contact_name: d.contact_id ? contactMap.get(d.contact_id) : undefined,
      }));
      setDeals(enriched);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="flex h-full items-center justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div>
      <PageHeader
        title="Deals"
        description="Sales pipeline and opportunity tracking"
        icon={<TrendingUp size={20} />}
        actions={<Button size="sm"><Plus size={15} /> New Deal</Button>}
      />

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
        {stages.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
          return (
            <div key={stage} className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1 mb-1">
                <div className="flex items-center gap-2">
                  <Badge tone={stageTones[stage]} dot>{stage}</Badge>
                  <span className="text-xs text-surface-400">{stageDeals.length}</span>
                </div>
                <span className="text-xs font-medium text-surface-500">{formatCurrency(stageValue)}</span>
              </div>
              <div className="space-y-2 min-h-[100px]">
                {stageDeals.map((deal, i) => (
                  <Card
                    key={deal.id}
                    hover
                    className="p-3 animate-fade-in-up cursor-pointer"
                    style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}
                  >
                    <p className="text-sm font-medium text-surface-900 mb-1">{deal.title}</p>
                    {deal.company_name && <p className="text-xs text-surface-500 mb-2">{deal.company_name}</p>}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-surface-900">{formatCurrency(deal.value, deal.currency)}</span>
                      <span className="text-xs text-surface-400">{deal.probability}%</span>
                    </div>
                    <Progress value={deal.probability} tone={stageTones[stage]} size="sm" />
                    {deal.expected_close && (
                      <p className="text-xs text-surface-400 mt-2">Close: {formatDate(deal.expected_close)}</p>
                    )}
                  </Card>
                ))}
                {stageDeals.length === 0 && (
                  <div className="rounded-xl border border-dashed border-surface-200 py-8 text-center">
                    <p className="text-xs text-surface-300">Empty</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
