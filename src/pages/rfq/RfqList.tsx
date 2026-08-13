import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Search, Send, Gavel, Clock } from "lucide-react";
import { getRfqs } from "../../lib/data";
import type { Rfq, RfqStatus } from "../../lib/supabase";
import { formatCurrency, formatDate } from "../../lib/format";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { DataTable } from "../../components/ui/DataTable";
import { EmptyState } from "../../components/ui/EmptyState";

// RFQ workflow — implements the Approved RFQ entity
// (ETA-Blueprint 04-DATA/Entities/RFQ: ETA-ENT-RFQ-001/002/004/005).

const STATUSES: RfqStatus[] = [
  "Draft",
  "Engineering Review",
  "Procurement Review",
  "Approved",
  "Sent",
  "Supplier Responding",
  "Quotation Received",
  "Evaluation",
  "Awarded",
  "Closed",
  "Cancelled",
];

const statusTone: Record<RfqStatus, "success" | "warning" | "error" | "neutral" | "info" | "copper"> = {
  Draft: "neutral",
  "Engineering Review": "warning",
  "Procurement Review": "warning",
  Approved: "info",
  Sent: "info",
  "Supplier Responding": "copper",
  "Quotation Received": "copper",
  Evaluation: "copper",
  Awarded: "success",
  Closed: "neutral",
  Cancelled: "error",
};

const OPEN_STATUSES: RfqStatus[] = [
  "Draft",
  "Engineering Review",
  "Procurement Review",
  "Approved",
  "Sent",
  "Supplier Responding",
  "Quotation Received",
  "Evaluation",
];

function daysUntil(iso: string | null): number | null {
  if (!iso) return null;
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / 86_400_000);
}

export default function RfqList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("open");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    getRfqs().then((data) => {
      setRfqs(data);
      setLoading(false);
    });
  }, []);

  const types = useMemo(() => Array.from(new Set(rfqs.map((r) => r.rfq_type))).sort(), [rfqs]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rfqs.filter((r) => {
      const matchesSearch =
        !q ||
        r.rfq_number.toLowerCase().includes(q) ||
        r.rfq_title.toLowerCase().includes(q) ||
        r.customer_name.toLowerCase().includes(q) ||
        (r.customer_rfq_number ?? "").toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "open" ? OPEN_STATUSES.includes(r.rfq_status) : r.rfq_status === statusFilter);
      return matchesSearch && matchesStatus && (typeFilter === "all" || r.rfq_type === typeFilter);
    });
  }, [rfqs, search, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const open = rfqs.filter((r) => OPEN_STATUSES.includes(r.rfq_status));
    const awaitingSuppliers = rfqs.filter((r) =>
      ["Sent", "Supplier Responding", "Quotation Received"].includes(r.rfq_status)
    ).length;
    const awarded = rfqs.filter((r) => r.rfq_status === "Awarded").length;
    const dueSoon = open.filter((r) => {
      const d = daysUntil(r.submission_deadline);
      return d !== null && d >= 0 && d <= 14;
    }).length;
    const pipelineValue = open.reduce((sum, r) => sum + (r.budget_amount ?? 0), 0);
    return { open: open.length, awaitingSuppliers, awarded, dueSoon, pipelineValue };
  }, [rfqs]);

  return (
    <div>
      <PageHeader
        title="RFQ Workflow"
        description="Request for Quotation — ETA-Blueprint ETA-ENT-RFQ-001 (Approved)"
        icon={<FileText size={20} />}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open RFQs" value={stats.open} icon={<FileText size={18} />} tone="copper" />
        <StatCard label="Awaiting supplier response" value={stats.awaitingSuppliers} icon={<Send size={18} />} tone="info" />
        <StatCard label="Deadline within 14 days" value={stats.dueSoon} icon={<Clock size={18} />} tone="warning" />
        <StatCard
          label="Budgeted value, open RFQs"
          value={formatCurrency(stats.pipelineValue)}
          icon={<Gavel size={18} />}
          tone="neutral"
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Input
          placeholder="Search RFQ number, title, customer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={15} />}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: "open", label: "Open RFQs" },
            { value: "all", label: "All statuses" },
            ...STATUSES.map((s) => ({ value: s, label: s })),
          ]}
        />
        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          options={[{ value: "all", label: "All RFQ types" }, ...types.map((t) => ({ value: t, label: t }))]}
        />
      </div>

      <DataTable
        data={filtered}
        loading={loading}
        onRowClick={(row) => navigate(`/rfq/${row.id}`)}
        paginated
        pageSize={12}
        emptyState={
          <EmptyState
            icon={<FileText size={20} />}
            title="No RFQs match these filters"
            description="Switch the status filter to “All statuses” to include closed and cancelled RFQs."
          />
        }
        columns={[
          { key: "rfq_number", label: "RFQ", mono: true, sortable: true },
          {
            key: "rfq_title",
            label: "Title",
            sortable: true,
            render: (r) => (
              <div className="min-w-0">
                <p className="font-medium text-surface-900 truncate">{r.rfq_title}</p>
                <p className="text-xs text-surface-400 truncate">
                  {r.customer_name}
                  {r.customer_rfq_number ? ` · ${r.customer_rfq_number}` : ""}
                </p>
              </div>
            ),
          },
          { key: "rfq_type", label: "Type", sortable: true },
          { key: "industry", label: "Industry", sortable: true },
          {
            key: "submission_deadline",
            label: "Supplier deadline",
            sortable: true,
            render: (r) => {
              if (!r.submission_deadline) {
                return <span className="text-error-dark">Not set</span>;
              }
              const d = daysUntil(r.submission_deadline);
              const urgent = d !== null && d >= 0 && d <= 7 && OPEN_STATUSES.includes(r.rfq_status);
              return (
                <span className={urgent ? "text-warning-dark font-medium" : "text-surface-600"}>
                  {formatDate(r.submission_deadline)}
                  {urgent && d !== null ? ` · ${d}d` : ""}
                </span>
              );
            },
          },
          {
            key: "supplier_response_count",
            label: "Responses",
            align: "end",
            sortable: true,
            render: (r) => (
              <span className="text-surface-600">
                {r.supplier_response_count}/{r.invited_supplier_ids.length}
              </span>
            ),
          },
          {
            key: "budget_amount",
            label: "Budget",
            align: "right",
            sortable: true,
            mono: true,
            render: (r) => (r.budget_amount == null ? "—" : formatCurrency(r.budget_amount, r.currency ?? "USD")),
          },
          {
            key: "rfq_status",
            label: "Status",
            sortable: true,
            render: (r) => (
              <Badge tone={statusTone[r.rfq_status]} dot>
                {r.rfq_status}
              </Badge>
            ),
          },
        ]}
      />
    </div>
  );
}
