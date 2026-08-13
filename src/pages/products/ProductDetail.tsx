import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Boxes, ShieldAlert, FileText } from "lucide-react";
import { getProductById, getRfqs, getRfqLines } from "../../lib/data";
import type { Product, ProductLifecycleStatus, Rfq } from "../../lib/supabase";
import { formatCurrency, formatDate, formatNumber } from "../../lib/format";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { Tabs, TabPanel } from "../../components/ui/Tabs";
import { EmptyState } from "../../components/ui/EmptyState";

// Product detail — every field below maps to an attribute defined in
// ETA-Blueprint ETA-ENT-PRODUCT-002 (Approved). Lifecycle stages are
// ETA-ENT-PRODUCT-005. No AI metadata is shown: AI implementation is not
// approved (CODING-RULES.md "Forbidden without a Change Request").

/** ETA-ENT-PRODUCT-005 §"Lifecycle Overview" — the linear governance path. */
const LIFECYCLE_PATH: ProductLifecycleStatus[] = [
  "Idea",
  "Draft",
  "Engineering Review",
  "Procurement Review",
  "Compliance Review",
  "Approved",
  "Active",
];

const TERMINAL: ProductLifecycleStatus[] = ["Revision", "Obsolete", "Archived"];

function Field({ label, value, mono = false }: { label: string; value: ReactNode; mono?: boolean }) {
  const empty = value === null || value === undefined || value === "";
  return (
    <div className="py-2">
      <dt className="text-xs text-surface-400">{label}</dt>
      <dd
        className={`text-sm mt-0.5 ${empty ? "text-surface-300" : "text-surface-900"} ${
          mono ? "font-mono" : ""
        }`}
      >
        {empty ? "—" : value}
      </dd>
    </div>
  );
}

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-2">{title}</h3>
      <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 divide-y divide-surface-100 sm:divide-y-0">
        {children}
      </dl>
    </Card>
  );
}

function YesNo({ value }: { value: boolean }) {
  return <span className={value ? "text-surface-900" : "text-surface-400"}>{value ? "Yes" : "No"}</span>;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedRfqs, setRelatedRfqs] = useState<Array<{ rfq: Rfq; quantity: number | null; uom: string | null }>>([]);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      const p = await getProductById(id);
      if (cancelled) return;
      setProduct(p);

      const rfqs = await getRfqs();
      const matches: Array<{ rfq: Rfq; quantity: number | null; uom: string | null }> = [];
      for (const rfq of rfqs) {
        const lines = await getRfqLines(rfq.id);
        const line = lines.find((l) => l.product_id === id);
        if (line) matches.push({ rfq, quantity: line.quantity, uom: line.uom });
      }
      if (cancelled) return;
      setRelatedRfqs(matches);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const [tab, setTab] = useState("overview");

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <EmptyState
        icon={<Boxes size={20} />}
        title="Product not found"
        description="This product code does not exist in the catalogue."
        action={
          <Link to="/products" className="text-sm font-medium text-copper-700 hover:text-copper-800">
            Back to products
          </Link>
        }
      />
    );
  }

  const isTerminal = TERMINAL.includes(product.lifecycle_status);
  const currentIndex = LIFECYCLE_PATH.indexOf(product.lifecycle_status);

  return (
    <div>
      <Link
        to="/products"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-900 transition-colors"
      >
        <ArrowLeft size={15} className="rtl:rotate-180" />
        Products
      </Link>

      <PageHeader
        title={product.product_name}
        description={`${product.product_code}${product.sku ? ` · ${product.sku}` : ""} · ${product.category} · ${product.product_type}`}
        icon={<Boxes size={20} />}
        actions={<Badge tone={product.lifecycle_status === "Active" ? "success" : "neutral"} dot>{product.lifecycle_status}</Badge>}
      />

      {product.lifecycle_status === "Obsolete" && (
        <Alert tone="warning" title="Obsolete product" className="mb-4">
          BR-012 — obsolete products cannot be assigned to new projects. Historical transactions remain unchanged.
        </Alert>
      )}
      {(product.export_control || product.sanction_sensitive) && (
        <Alert tone="info" title="Compliance flags set" className="mb-4">
          {product.export_control && "Export-controlled. "}
          {product.sanction_sensitive && "Sanction-sensitive. "}
          BR-031 — compliance approval is required before this item is procured.
        </Alert>
      )}

      {/* Lifecycle — ETA-ENT-PRODUCT-005 */}
      <Card className="p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-surface-900">Lifecycle</h3>
          <span className="text-xs text-surface-400">ETA-ENT-PRODUCT-005</span>
        </div>
        <ol className="flex flex-wrap items-center gap-y-2">
          {LIFECYCLE_PATH.map((stage, i) => {
            const done = !isTerminal && currentIndex >= 0 && i < currentIndex;
            const active = !isTerminal && i === currentIndex;
            return (
              <li key={stage} className="flex items-center">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    active
                      ? "bg-copper-600 text-white"
                      : done
                      ? "bg-copper-50 text-copper-700"
                      : "bg-surface-100 text-surface-400"
                  }`}
                >
                  {stage}
                </span>
                {i < LIFECYCLE_PATH.length - 1 && (
                  <span className={`mx-1.5 h-px w-4 ${done ? "bg-copper-300" : "bg-surface-200"}`} />
                )}
              </li>
            );
          })}
        </ol>
        {isTerminal && (
          <p className="mt-3 text-xs text-surface-500">
            Current status <span className="font-medium text-surface-700">{product.lifecycle_status}</span> sits
            outside the linear path (ETA-ENT-PRODUCT-005 stages 9–11).
          </p>
        )}
      </Card>

      <Tabs
        value={tab}
        onChange={setTab}
        className="mb-4"
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "technical", label: "Technical" },
          { value: "sourcing", label: "Sourcing & Commercial" },
          { value: "rfqs", label: `RFQs (${relatedRfqs.length})` },
        ]}
      >
        <TabPanel value="overview">
          <div className="space-y-4">
            <FieldGroup title="Identity">
              <Field label="Product code" value={product.product_code} mono />
              <Field label="Internal SKU" value={product.sku} mono />
              <Field label="Short name" value={product.short_name} />
              <Field label="Technical name" value={product.technical_name} />
              <Field label="Brand" value={product.brand} />
              <Field label="Model" value={product.model} />
              <Field label="Revision" value={product.revision} mono />
              <Field label="Subcategory" value={product.subcategory} />
              <Field label="Active" value={<YesNo value={product.active} />} />
            </FieldGroup>

            <FieldGroup title="Classification">
              <Field label="Industry" value={product.industry} />
              <Field label="UNSPSC" value={product.unspsc_code} mono />
              <Field label="HS code" value={product.hs_code} mono />
              <Field label="Criticality" value={product.criticality} />
              <Field label="Strategic item" value={<YesNo value={product.strategic_item} />} />
              <Field label="Spare part" value={<YesNo value={product.spare_part} />} />
            </FieldGroup>

            <Card className="p-5">
              <h3 className="text-sm font-semibold text-surface-900 mb-2">Description</h3>
              <p className="text-sm text-surface-700">{product.description ?? "—"}</p>
              {product.technical_description && (
                <p className="mt-2 text-sm text-surface-500">{product.technical_description}</p>
              )}
            </Card>
          </div>
        </TabPanel>

        <TabPanel value="technical">
          <div className="space-y-4">
            <FieldGroup title="Specification">
              <Field label="Specification" value={product.specification} />
              <Field label="Technical standard" value={product.technical_standard} />
              <Field label="Material" value={product.material} />
              <Field label="Grade" value={product.grade} />
              <Field label="Size" value={product.size} />
              <Field label="Unit of measure" value={product.uom} />
              <Field
                label="Weight"
                value={product.weight == null ? null : `${formatNumber(product.weight)} ${product.weight_unit ?? ""}`}
              />
              <Field label="Pressure rating" value={product.pressure_rating} />
              <Field label="Temperature rating" value={product.temperature_rating} />
            </FieldGroup>

            <FieldGroup title="Manufacturer">
              <Field label="Primary manufacturer" value={product.manufacturer_name} />
              <Field label="Manufacturer part number" value={product.manufacturer_part_number} mono />
              <Field label="Country of origin" value={product.country_of_origin} />
              <Field
                label="Warranty"
                value={product.warranty_months == null ? null : `${product.warranty_months} months`}
              />
              <Field
                label="Manufacturer lead time"
                value={product.lead_time_days == null ? null : `${product.lead_time_days} days`}
              />
              <Field label="Preferred manufacturer" value={<YesNo value={product.preferred_manufacturer} />} />
            </FieldGroup>
          </div>
        </TabPanel>

        <TabPanel value="sourcing">
          <div className="space-y-4">
            <FieldGroup title="Supplier">
              <Field
                label="Primary supplier"
                value={
                  product.supplier_id ? (
                    <Link to={`/suppliers/${product.supplier_id}`} className="text-copper-700 hover:text-copper-800">
                      {product.supplier_id}
                    </Link>
                  ) : null
                }
              />
              <Field
                label="Alternate suppliers"
                value={
                  product.alternate_supplier_ids.length === 0 ? null : (
                    <span className="flex flex-wrap gap-1">
                      {product.alternate_supplier_ids.map((s) => (
                        <Link key={s} to={`/suppliers/${s}`}>
                          <Badge tone="neutral">{s}</Badge>
                        </Link>
                      ))}
                    </span>
                  )
                }
              />
              <Field label="Supplier part number" value={product.supplier_part_number} mono />
              <Field label="Minimum order quantity" value={product.moq == null ? null : `${product.moq} ${product.uom}`} />
              <Field
                label="Supplier lead time"
                value={product.supplier_lead_time == null ? null : `${product.supplier_lead_time} days`}
              />
              <Field label="Preferred supplier" value={<YesNo value={product.preferred_supplier} />} />
            </FieldGroup>

            <FieldGroup title="Procurement">
              <Field label="Procurement category" value={product.procurement_category} />
              <Field label="Procurement method" value={product.procurement_method} />
              <Field label="Preferred incoterm" value={product.preferred_incoterm} />
              <Field label="Payment term" value={product.payment_term} />
              <Field
                label="Standard delivery"
                value={product.standard_delivery_days == null ? null : `${product.standard_delivery_days} days`}
              />
              <Field label="Availability" value={product.availability} />
            </FieldGroup>

            <FieldGroup title="Pricing">
              <Field
                label="Standard cost"
                value={product.standard_cost == null ? null : formatCurrency(product.standard_cost, product.currency)}
                mono
              />
              <Field
                label="Target purchase price"
                value={
                  product.target_purchase_price == null
                    ? null
                    : formatCurrency(product.target_purchase_price, product.currency)
                }
                mono
              />
              <Field
                label="Last purchase price"
                value={
                  product.last_purchase_price == null
                    ? null
                    : formatCurrency(product.last_purchase_price, product.currency)
                }
                mono
              />
              <Field label="Currency" value={product.currency} />
              <Field label="Price valid until" value={product.price_valid_until ? formatDate(product.price_valid_until) : null} />
            </FieldGroup>

            <FieldGroup title="Commercial & compliance">
              <Field label="Export control" value={<YesNo value={product.export_control} />} />
              <Field label="Sanction sensitive" value={<YesNo value={product.sanction_sensitive} />} />
              <Field label="Last updated" value={formatDate(product.updated_at)} />
            </FieldGroup>
          </div>
        </TabPanel>

        <TabPanel value="rfqs">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-surface-900 mb-3">RFQs referencing this product</h3>
            {relatedRfqs.length === 0 ? (
              <EmptyState
                icon={<FileText size={20} />}
                title="Not yet requested"
                description="No RFQ line currently references this product."
              />
            ) : (
              <ul className="divide-y divide-surface-100">
                {relatedRfqs.map(({ rfq, quantity, uom }) => (
                  <li key={rfq.id}>
                    <Link
                      to={`/rfq/${rfq.id}`}
                      className="flex items-center justify-between gap-4 py-3 hover:bg-surface-50 -mx-2 px-2 rounded-lg transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-xs text-surface-400">{rfq.rfq_number}</p>
                        <p className="text-sm font-medium text-surface-900 truncate">{rfq.rfq_title}</p>
                        <p className="text-xs text-surface-500">{rfq.customer_name}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm text-surface-600">
                          {quantity == null ? "—" : `${formatNumber(quantity)} ${uom ?? ""}`}
                        </span>
                        <Badge tone="neutral">{rfq.rfq_status}</Badge>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </TabPanel>
      </Tabs>

      <p className="mt-6 flex items-start gap-2 text-xs text-surface-400">
        <ShieldAlert size={13} className="mt-0.5 shrink-0" />
        Fields shown implement a subset of ETA-ENT-PRODUCT-002. Inventory, warehouse, logistics, quality and AI-metadata
        attribute groups are not modelled in this module — see the subset notice in <code className="font-mono">src/lib/supabase.ts</code>.
      </p>
    </div>
  );
}
