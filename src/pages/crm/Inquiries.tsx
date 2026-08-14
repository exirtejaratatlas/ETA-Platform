import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, Plus, FileText } from "lucide-react";
import type { CustomerInquiry, InquiryStatus, Rfq, RfqStatus } from "../../lib/supabase";
import { getCustomerInquiries, getRfqs } from "../../lib/data";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { StatCard } from "../../components/ui/StatCard";
import { Spinner } from "../../components/ui/Spinner";
import { formatDate } from "../../lib/format";

// Customer Inquiry / Opportunity — first MVP workflow concept per delivery instructions.
// Sits upstream of ETA-Blueprint's approved RFQ entity (04-DATA/Entities/RFQ) — this captures
// the customer request before it becomes a formal RFQ. UI/mock-data only, no backend table yet.
// See docs/delivery/CONTENT-SOURCE-MAP.md.

const stages: { key: InquiryStatus; label: string }[] = [
  { key: "new", label: "New" },
  { key: "technical_review", label: "Technical Review" },
  { key: "supplier_search", label: "Supplier Search" },
  { key: "quotation_preparation", label: "Quotation Preparation" },
  { key: "customer_offer_sent", label: "Customer Offer Sent" },
  { key: "negotiation", label: "Negotiation" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
];

// Copper is accent-only (Colors.md; CR-004 V3) — not used here to represent stage.
const stageTones: Record<InquiryStatus, "neutral" | "info" | "warning" | "success" | "error"> = {
  new: "neutral",
  technical_review: "info",
  supplier_search: "warning",
  quotation_preparation: "warning",
  customer_offer_sent: "info",
  negotiation: "warning",
  won: "success",
  lost: "error",
};

// Same tone map as src/pages/rfq/RfqList.tsx statusTone — reused so an RFQ chip
// reads the same way here as it does on the RFQ Workflow board.
// Copper is accent-only (Colors.md; CR-004 V3) — not used here to represent status.
const rfqStatusTone: Record<RfqStatus, "success" | "warning" | "error" | "neutral" | "info"> = {
  Idea: "neutral",
  Draft: "neutral",
  "Engineering Review": "warning",
  "Procurement Review": "warning",
  "Compliance Review": "warning",
  Approved: "info",
  Sent: "info",
  "Supplier Responding": "warning",
  "Technical Evaluation": "warning",
  "Commercial Evaluation": "warning",
  Awarded: "success",
  "PO Created": "success",
  Closed: "neutral",
  Archived: "neutral",
  Cancelled: "error",
};

export default function Inquiries() {
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [rfqByInquiry, setRfqByInquiry] = useState<Map<string, Rfq>>(new Map());

  useEffect(() => {
    async function load() {
      const [data, rfqs] = await Promise.all([getCustomerInquiries(), getRfqs()]);
      setInquiries(data);
      const byInquiry = new Map<string, Rfq>();
      rfqs.forEach((r) => {
        if (r.internal_reference) byInquiry.set(r.internal_reference, r);
      });
      setRfqByInquiry(byInquiry);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="flex h-full items-center justify-center py-20"><Spinner size="lg" /></div>;
  }

  const openInquiries = inquiries.filter((i) => i.status !== "won" && i.status !== "lost");
  const won = inquiries.filter((i) => i.status === "won");
  const lost = inquiries.filter((i) => i.status === "lost");
  const winRate = won.length + lost.length > 0 ? Math.round((won.length / (won.length + lost.length)) * 100) : 0;
  const convertedToRfq = inquiries.filter((i) => rfqByInquiry.has(i.inquiry_number)).length;

  return (
    <div>
      <PageHeader
        title="Customer Inquiries"
        description="Customer requests moving toward a formal RFQ — first MVP workflow concept"
        icon={<Inbox size={20} />}
        actions={<Button size="sm"><Plus size={15} /> Log Inquiry</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Open Inquiries" value={openInquiries.length} icon={<Inbox size={20} />} tone="copper" />
        <StatCard label="Converted to RFQ" value={convertedToRfq} icon={<FileText size={20} />} tone="info" />
        <StatCard label="Won" value={won.length} icon={<Inbox size={20} />} tone="success" />
        <StatCard label="Win Rate" value={`${winRate}%`} icon={<Inbox size={20} />} tone="neutral" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage) => {
          const stageInquiries = inquiries.filter((i) => i.status === stage.key);
          return (
            <div key={stage.key} className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1 mb-1">
                <Badge tone={stageTones[stage.key]} dot>{stage.label}</Badge>
                <span className="text-xs text-surface-400">{stageInquiries.length}</span>
              </div>
              <div className="space-y-2 min-h-[100px]">
                {stageInquiries.map((inq, i) => {
                  const rfq = rfqByInquiry.get(inq.inquiry_number);
                  return (
                    <Card
                      key={inq.id}
                      hover
                      className="p-3 animate-fade-in-up cursor-pointer"
                      style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}
                    >
                      <p className="text-[11px] font-medium text-surface-400 tracking-wide">{inq.inquiry_number}</p>
                      <p className="text-sm font-medium text-surface-900 mt-0.5">{inq.customer_name}</p>
                      <p className="text-xs text-surface-500 mt-1">{inq.product_equipment}</p>
                      <p className="text-xs text-surface-400 mt-1.5 line-clamp-2">{inq.technical_specification}</p>
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-surface-100">
                        <span className="text-xs text-surface-500">{inq.quantity}</span>
                        <span className="text-xs text-surface-400">
                          {inq.required_delivery_date ? formatDate(inq.required_delivery_date) : "—"}
                        </span>
                      </div>
                      {rfq && (
                        <Link
                          to={`/rfq/${rfq.id}`}
                          className="flex items-center justify-between mt-2 pt-2 border-t border-surface-100"
                        >
                          <span className="font-mono text-xs text-surface-600">{rfq.rfq_number}</span>
                          <Badge tone={rfqStatusTone[rfq.rfq_status]} dot>
                            {rfq.rfq_status}
                          </Badge>
                        </Link>
                      )}
                    </Card>
                  );
                })}
                {stageInquiries.length === 0 && (
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
