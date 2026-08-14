import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Mail,
  Phone,
  Globe,
  MapPin,
  Star,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  BadgeCheck,
  CircleDot,
  Boxes,
  FileText,
} from "lucide-react";
import {
  getSupplierById,
  getSupplierRelationshipHistory,
  getProductsBySupplier,
  getRfqsBySupplier,
} from "../../lib/data";
import type { Supplier, SupplierRelationshipEvent, Product, Rfq, RfqStatus } from "../../lib/supabase";
import { Card, CardHeader, CardBody, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { formatDate } from "../../lib/format";

// Status tone map copied from src/pages/rfq/RfqList.tsx to keep RFQ status
// colours consistent across the app.
// Copper is accent-only (Colors.md; CR-004 V3) — not used here to represent status.
const statusTone: Record<RfqStatus, "success" | "warning" | "error" | "neutral" | "info"> = {
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

const lifecycleTone: Record<string, "success" | "warning" | "error" | "neutral" | "info"> = {
  Draft: "neutral",
  "Under Review": "warning",
  Approved: "info",
  Active: "success",
  Suspended: "error",
  Inactive: "neutral",
  Archived: "neutral",
};

const complianceMeta = {
  compliant: { label: "Compliant", tone: "success" as const, icon: ShieldCheck },
  under_review: { label: "Under Review", tone: "warning" as const, icon: ShieldQuestion },
  non_compliant: { label: "Non-Compliant", tone: "error" as const, icon: ShieldAlert },
};

const riskTone: Record<string, "success" | "warning" | "error"> = {
  low: "success",
  medium: "warning",
  high: "error",
};

// Copper is accent-only (Colors.md; CR-004 V3) — not used here to represent event type.
const eventTone: Record<SupplierRelationshipEvent["type"], "success" | "warning" | "error" | "neutral" | "info"> = {
  onboarded: "info",
  order: "success",
  review: "warning",
  certification: "success",
  issue: "error",
  note: "neutral",
};

const eventIconColor: Record<SupplierRelationshipEvent["type"], string> = {
  onboarded: "text-info",
  order: "text-success",
  review: "text-warning",
  certification: "text-success",
  issue: "text-error",
  note: "text-surface-400",
};

export default function SupplierDetail() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [history, setHistory] = useState<SupplierRelationshipEvent[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [rfqs, setRfqs] = useState<Rfq[]>([]);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const [s, h, p, r] = await Promise.all([
        getSupplierById(id),
        getSupplierRelationshipHistory(id),
        getProductsBySupplier(id),
        getRfqsBySupplier(id),
      ]);
      setSupplier(s);
      setHistory(h);
      setProducts(p);
      setRfqs(r);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="flex h-full items-center justify-center py-20"><Spinner size="lg" /></div>;
  }

  if (!supplier) {
    return (
      <div className="py-20 text-center">
        <Package size={32} className="mx-auto text-surface-300 mb-3" />
        <p className="text-sm text-surface-400 mb-4">Supplier not found</p>
        <Link to="/suppliers" className="text-sm font-medium text-copper-600 hover:text-copper-700">
          Back to Suppliers
        </Link>
      </div>
    );
  }

  const compliance = complianceMeta[supplier.compliance_status];
  const ComplianceIcon = compliance.icon;

  return (
    <div>
      <Link
        to="/suppliers"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 hover:text-surface-900 mb-4"
      >
        <ArrowLeft size={14} /> Back to Suppliers
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6 animate-fade-in-up">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-copper-500 to-copper-700 text-white text-lg font-semibold shrink-0">
            {supplier.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-medium text-surface-400 tracking-wide">{supplier.supplier_code}</p>
            <h1 className="text-2xl font-semibold text-surface-900 tracking-tight">{supplier.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <Badge tone={lifecycleTone[supplier.lifecycle_status]} dot>{supplier.lifecycle_status}</Badge>
              <Badge tone="neutral">{supplier.category}</Badge>
              <Badge tone="copper">{supplier.classification}</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} size={16} className={n <= supplier.rating ? "text-copper-500 fill-copper-500" : "text-surface-200"} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader><CardTitle>Contact & Commercial</CardTitle></CardHeader>
          <CardBody className="space-y-3 text-sm">
            {supplier.email && (
              <div className="flex items-center gap-2 text-surface-600">
                <Mail size={14} className="text-surface-400" /> {supplier.email}
              </div>
            )}
            {supplier.phone && (
              <div className="flex items-center gap-2 text-surface-600">
                <Phone size={14} className="text-surface-400" /> {supplier.phone}
              </div>
            )}
            {supplier.website && (
              <div className="flex items-center gap-2 text-surface-600">
                <Globe size={14} className="text-surface-400" /> {supplier.website}
              </div>
            )}
            <div className="flex items-center gap-2 text-surface-600">
              <MapPin size={14} className="text-surface-400" /> {supplier.country}
            </div>
            <div className="pt-3 border-t border-surface-100 flex justify-between">
              <span className="text-surface-500">Payment Terms</span>
              <span className="font-medium text-surface-900">{supplier.payment_terms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Onboarded</span>
              <span className="font-medium text-surface-900">{formatDate(supplier.created_at)}</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Qualification & Compliance</CardTitle></CardHeader>
          <CardBody className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-surface-500 flex items-center gap-1.5"><ComplianceIcon size={14} /> Compliance Status</span>
              <Badge tone={compliance.tone}>{compliance.label}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-surface-500">Risk Level</span>
              <Badge tone={riskTone[supplier.risk_level]} className="capitalize">{supplier.risk_level}</Badge>
            </div>
            <div>
              <p className="text-surface-500 mb-2">Certifications</p>
              {supplier.certifications.length === 0 ? (
                <p className="text-xs text-surface-400">None on file</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {supplier.certifications.map((cert) => (
                    <span key={cert} className="inline-flex items-center gap-1 rounded-full bg-surface-100 px-2.5 py-1 text-xs font-medium text-surface-600">
                      <BadgeCheck size={12} className="text-copper-500" /> {cert}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Classification</CardTitle></CardHeader>
          <CardBody className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-surface-500">Tier</span>
              <span className="font-medium text-surface-900">{supplier.classification}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Category</span>
              <span className="font-medium text-surface-900">{supplier.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Lifecycle Status</span>
              <span className="font-medium text-surface-900">{supplier.lifecycle_status}</span>
            </div>
            <p className="text-xs text-surface-400 pt-3 border-t border-surface-100">
              Scoring and AI-assisted supplier recommendations are not yet enabled for this module (Sprint 1 scope, per MOD-1).
            </p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Relationship History</CardTitle></CardHeader>
        <CardBody>
          {history.length === 0 ? (
            <p className="text-sm text-surface-400 py-6 text-center">No relationship history recorded yet</p>
          ) : (
            <ol className="space-y-0">
              {history.map((event, i) => (
                <li key={event.id} className="relative flex gap-3 pb-6 last:pb-0">
                  {i < history.length - 1 && (
                    <span className="absolute left-[7px] top-4 bottom-0 w-px bg-surface-200" />
                  )}
                  <CircleDot size={16} className={`shrink-0 mt-0.5 ${eventIconColor[event.type]}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-surface-900">{event.title}</p>
                      <span className="text-xs text-surface-400 shrink-0">{formatDate(event.date)}</span>
                    </div>
                    <p className="text-sm text-surface-500 mt-0.5">{event.description}</p>
                    <Badge tone={eventTone[event.type]} className="mt-1.5 capitalize">{event.type}</Badge>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader><CardTitle>Products Supplied</CardTitle></CardHeader>
          <CardBody className={products.length === 0 ? "" : "p-0"}>
            {products.length === 0 ? (
              <EmptyState
                icon={<Boxes size={20} />}
                title="No products sourced"
                description="No catalogue item lists this supplier as a source."
              />
            ) : (
              <div className="divide-y divide-surface-100">
                {products.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.id}`}
                    className="flex items-center justify-between gap-3 px-6 py-3 rounded-lg hover:bg-surface-50"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-surface-400">{p.product_code}</p>
                      <p className="text-sm font-medium text-surface-900 truncate">{p.product_name}</p>
                      <p className="text-xs text-surface-500">{p.category}</p>
                    </div>
                    {p.supplier_id === id ? (
                      <Badge tone="copper" className="shrink-0">Primary</Badge>
                    ) : (
                      <Badge tone="neutral" className="shrink-0">Alternate</Badge>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>RFQ Participation</CardTitle></CardHeader>
          <CardBody className={rfqs.length === 0 ? "" : "p-0"}>
            {rfqs.length === 0 ? (
              <EmptyState
                icon={<FileText size={20} />}
                title="No RFQ activity"
                description="This supplier has not been invited to an RFQ yet."
              />
            ) : (
              <div className="divide-y divide-surface-100">
                {rfqs.map((r) => (
                  <Link
                    key={r.id}
                    to={`/rfq/${r.id}`}
                    className="flex items-center justify-between gap-3 px-6 py-3 rounded-lg hover:bg-surface-50"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-surface-400">{r.rfq_number}</p>
                      <p className="text-sm font-medium text-surface-900 truncate">{r.rfq_title}</p>
                      <p className="text-xs text-surface-500">{r.customer_name}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge tone={statusTone[r.rfq_status]}>{r.rfq_status}</Badge>
                      {r.winning_supplier_id === id && <Badge tone="success">Awarded</Badge>}
                    </div>
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
