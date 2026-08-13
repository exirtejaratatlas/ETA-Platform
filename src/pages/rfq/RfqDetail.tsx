import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Info, ShieldAlert, Users } from "lucide-react";
import { getRfqById, getRfqLines, getRfqResponses } from "../../lib/data";
import type { Rfq, RfqLine, RfqSupplierResponse } from "../../lib/supabase";
import { RFQ_LIFECYCLE, currentStageIndex } from "../../lib/rfqLifecycle";
import { formatCurrency, formatDate, formatNumber } from "../../lib/format";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Alert } from "../../components/ui/Alert";
import { Spinner } from "../../components/ui/Spinner";
import { Tabs, TabPanel } from "../../components/ui/Tabs";
import { EmptyState } from "../../components/ui/EmptyState";
import { RfqWorkflowGuide } from "../../components/rfq/RfqWorkflowGuide";

// RFQ detail — fields map to ETA-ENT-RFQ-002 (Approved); the stage tracker is
// ETA-ENT-RFQ-005; the workflow guide evaluates ETA-ENT-RFQ-004.
//
// Deliberately absent: evaluation scores, supplier ranking, award recommendation
// and every AI attribute in ETA-ENT-RFQ-002's "AI Procurement" group. No approved
// evaluation methodology exists (PHASE6-PLATFORM-EXECUTION-STRATEGY.md §6 Q9) and
// AI automation is forbidden without a Change Request.

function Field({ label, value, mono = false }: { label: string; value: ReactNode; mono?: boolean }) {
  const empty = value === null || value === undefined || value === "";
  return (
    <div className="py-2">
      <dt className="text-xs text-surface-400">{label}</dt>
      <dd className={`text-sm mt-0.5 ${empty ? "text-surface-300" : "text-surface-900"} ${mono ? "font-mono" : ""}`}>
        {empty ? "—" : value}
      </dd>
    </div>
  );
}

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-2">{title}</h3>
      <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">{children}</dl>
    </Card>
  );
}

function YesNo({ value }: { value: boolean }) {
  return <span className={value ? "text-surface-900" : "text-surface-400"}>{value ? "Yes" : "No"}</span>;
}

const responseTone: Record<RfqSupplierResponse["response_status"], "success" | "warning" | "error" | "neutral" | "copper"> = {
  invited: "neutral",
  responding: "copper",
  quoted: "success",
  declined: "error",
  no_response: "warning",
};

const complianceTone: Record<RfqSupplierResponse["technical_compliance"], "success" | "warning" | "error" | "neutral"> = {
  not_evaluated: "neutral",
  compliant: "success",
  deviation: "warning",
  non_compliant: "error",
};

export default function RfqDetail() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [rfq, setRfq] = useState<Rfq | null>(null);
  const [lines, setLines] = useState<RfqLine[]>([]);
  const [responses, setResponses] = useState<RfqSupplierResponse[]>([]);
  const [tab, setTab] = useState("lines");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      const [r, l, resp] = await Promise.all([getRfqById(id), getRfqLines(id), getRfqResponses(id)]);
      if (cancelled) return;
      setRfq(r);
      setLines(l);
      setResponses(resp);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!rfq) {
    return (
      <EmptyState
        icon={<FileText size={20} />}
        title="RFQ not found"
        description="This RFQ number does not exist."
        action={
          <Link to="/rfq" className="text-sm font-medium text-copper-700 hover:text-copper-800">
            Back to RFQs
          </Link>
        }
      />
    );
  }

  const stageIndex = currentStageIndex(rfq);
  const quoted = responses.filter((r) => r.response_status === "quoted" && r.quoted_total != null);
  const lowestTotal = quoted.length > 0 ? Math.min(...quoted.map((r) => r.quoted_total as number)) : null;
  const linesBudget = lines.reduce((sum, l) => sum + (l.estimated_budget ?? 0), 0);

  return (
    <div>
      <Link
        to="/rfq"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-900 transition-colors"
      >
        <ArrowLeft size={15} className="rtl:rotate-180" />
        RFQ Workflow
      </Link>

      <PageHeader
        title={rfq.rfq_title}
        description={`${rfq.rfq_number}${rfq.customer_rfq_number ? ` · customer ref ${rfq.customer_rfq_number}` : ""} · ${rfq.customer_name}`}
        icon={<FileText size={20} />}
        actions={
          <div className="flex items-center gap-2">
            <Badge tone="neutral">{rfq.rfq_type}</Badge>
            <Badge tone={rfq.rfq_status === "Cancelled" ? "error" : rfq.rfq_status === "Awarded" ? "success" : "copper"} dot>
              {rfq.rfq_status}
            </Badge>
          </div>
        }
      />

      {rfq.rfq_status === "Cancelled" && (
        <Alert tone="warning" title="RFQ cancelled" className="mb-4">
          {rfq.engineering_notes ?? "This RFQ was cancelled and accepts no further quotations."}
        </Alert>
      )}
      {(rfq.export_control || rfq.sanction_screening) && (
        <Alert tone="info" title="Compliance screening applies" className="mb-4">
          {rfq.export_control && "Export control in scope. "}
          {rfq.sanction_screening && "Sanction screening required. "}
          Status: {rfq.compliance_status.replace(/_/g, " ")}.
        </Alert>
      )}

      {/* Lifecycle tracker — ETA-ENT-RFQ-005 stages 1-14 */}
      <Card className="p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-surface-900">Procurement lifecycle</h3>
          <span className="text-xs text-surface-400">ETA-ENT-RFQ-005</span>
        </div>
        <ol className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4 lg:grid-cols-7">
          {RFQ_LIFECYCLE.map((stage, i) => {
            const done = i < stageIndex;
            const active = i === stageIndex;
            return (
              <li key={stage.stage} title={stage.validates}>
                <div
                  className={`h-1 rounded-full mb-1.5 ${
                    active ? "bg-copper-600" : done ? "bg-copper-300" : "bg-surface-200"
                  }`}
                />
                <p
                  className={`text-[11px] font-medium leading-tight ${
                    active ? "text-copper-700" : done ? "text-surface-700" : "text-surface-400"
                  }`}
                >
                  {stage.stage}. {stage.name}
                </p>
                <p className="text-[10px] text-surface-400 mt-0.5 leading-tight">{stage.owner}</p>
              </li>
            );
          })}
        </ol>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2">
          <Tabs
            value={tab}
            onChange={setTab}
            className="mb-4"
            tabs={[
              { value: "lines", label: `Lines (${lines.length})` },
              { value: "suppliers", label: `Suppliers (${responses.length})` },
              { value: "commercial", label: "Commercial" },
              { value: "details", label: "Details" },
            ]}
          >
            <TabPanel value="lines">
              <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-surface-50 text-xs uppercase tracking-wider text-surface-500">
                      <tr>
                        <th className="px-4 py-2.5 text-start font-medium">#</th>
                        <th className="px-4 py-2.5 text-start font-medium">Product</th>
                        <th className="px-4 py-2.5 text-end font-medium">Qty</th>
                        <th className="px-4 py-2.5 text-start font-medium">UoM</th>
                        <th className="px-4 py-2.5 text-right font-medium">Est. budget</th>
                        <th className="px-4 py-2.5 text-start font-medium">Datasheet</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100">
                      {lines.map((l) => (
                        <tr key={l.id} className="align-top">
                          <td className="px-4 py-3 font-mono text-xs text-surface-400">{l.line_number}</td>
                          <td className="px-4 py-3">
                            {l.product_id ? (
                              <Link
                                to={`/products/${l.product_id}`}
                                className="font-medium text-surface-900 hover:text-copper-700 transition-colors"
                              >
                                {l.product_name}
                              </Link>
                            ) : (
                              <span className="font-medium text-surface-900">{l.product_name}</span>
                            )}
                            <p className="text-xs text-surface-400 font-mono">{l.product_code ?? "Unlinked line"}</p>
                            <p className="text-xs text-surface-500 mt-1 max-w-md">
                              {l.technical_specification ?? (
                                <span className="text-error-dark">No technical specification (BR-014)</span>
                              )}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-end font-mono">
                            {l.quantity == null ? (
                              <span className="text-error-dark">Missing</span>
                            ) : (
                              formatNumber(l.quantity)
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {l.uom ?? <span className="text-error-dark">Missing</span>}
                          </td>
                          <td className="px-4 py-3 text-right font-mono">
                            {l.estimated_budget == null
                              ? "—"
                              : formatCurrency(l.estimated_budget, l.currency ?? "USD")}
                          </td>
                          <td className="px-4 py-3">
                            <Badge tone={l.datasheet_attached ? "success" : "warning"}>
                              {l.datasheet_attached ? "Attached" : "Missing"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-surface-50 text-sm">
                      <tr>
                        <td colSpan={4} className="px-4 py-2.5 text-end font-medium text-surface-600">
                          Estimated line budget
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono font-semibold text-surface-900">
                          {formatCurrency(linesBudget, rfq.currency ?? "USD")}
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </Card>
            </TabPanel>

            <TabPanel value="suppliers">
              {responses.length === 0 ? (
                <Card className="p-5">
                  <EmptyState
                    icon={<Users size={20} />}
                    title="No suppliers invited yet"
                    description="BR-017 — RFQs may only be sent to approved suppliers. Invitations open at lifecycle stage 7."
                  />
                </Card>
              ) : (
                <>
                  <Card className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-surface-50 text-xs uppercase tracking-wider text-surface-500">
                          <tr>
                            <th className="px-4 py-2.5 text-start font-medium">Supplier</th>
                            <th className="px-4 py-2.5 text-start font-medium">Response</th>
                            <th className="px-4 py-2.5 text-right font-medium">Quoted total</th>
                            <th className="px-4 py-2.5 text-end font-medium">Delivery</th>
                            <th className="px-4 py-2.5 text-start font-medium">Terms</th>
                            <th className="px-4 py-2.5 text-start font-medium">Technical</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-100">
                          {responses.map((r) => (
                            <tr key={r.id} className="align-top">
                              <td className="px-4 py-3">
                                <Link
                                  to={`/suppliers/${r.supplier_id}`}
                                  className="font-medium text-surface-900 hover:text-copper-700 transition-colors"
                                >
                                  {r.supplier_name}
                                </Link>
                                <p className="text-xs text-surface-400 font-mono">{r.quote_number ?? r.supplier_id}</p>
                              </td>
                              <td className="px-4 py-3">
                                <Badge tone={responseTone[r.response_status]} dot>
                                  {r.response_status.replace(/_/g, " ")}
                                </Badge>
                                {r.submitted_at && (
                                  <p className="text-xs text-surface-400 mt-1">{formatDate(r.submitted_at)}</p>
                                )}
                              </td>
                              <td className="px-4 py-3 text-right">
                                {r.quoted_total == null ? (
                                  <span className="text-surface-300">—</span>
                                ) : (
                                  <>
                                    <span className="font-mono font-medium text-surface-900">
                                      {formatCurrency(r.quoted_total, r.currency ?? "USD")}
                                    </span>
                                    {lowestTotal != null && r.quoted_total === lowestTotal && quoted.length > 1 && (
                                      <p className="text-[10px] uppercase tracking-wide text-surface-400 mt-0.5">
                                        Lowest quoted
                                      </p>
                                    )}
                                  </>
                                )}
                              </td>
                              <td className="px-4 py-3 text-end">
                                {r.delivery_days == null ? "—" : `${r.delivery_days} d`}
                              </td>
                              <td className="px-4 py-3 text-xs text-surface-600">
                                {[r.incoterm, r.payment_terms].filter(Boolean).join(" · ") || "—"}
                                {r.warranty_months != null && (
                                  <p className="text-surface-400">{r.warranty_months} mo warranty</p>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <Badge tone={complianceTone[r.technical_compliance]}>
                                  {r.technical_compliance.replace(/_/g, " ")}
                                </Badge>
                                {r.deviation_notes && (
                                  <p className="text-xs text-surface-500 mt-1 max-w-xs">{r.deviation_notes}</p>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                  <p className="mt-3 flex items-start gap-1.5 text-xs text-surface-400">
                    <Info size={13} className="mt-0.5 shrink-0" />
                    Quotations are shown side by side for human comparison (ETA-ENT-RFQ-005 stage 10). No score, ranking or
                    award recommendation is produced — “lowest quoted” is the arithmetic minimum of submitted totals
                    (ETA-ENT-RFQ-002 <span className="font-mono">lowest_price</span>), not an evaluation outcome.
                  </p>
                </>
              )}
            </TabPanel>

            <TabPanel value="commercial">
              <div className="space-y-4">
                <FieldGroup title="Commercial terms">
                  <Field label="Incoterm" value={rfq.incoterm} />
                  <Field label="Payment terms" value={rfq.payment_terms} />
                  <Field label="Currency" value={rfq.currency} />
                  <Field label="Delivery location" value={rfq.delivery_location} />
                  <Field
                    label="Validity period"
                    value={rfq.validity_period == null ? null : `${rfq.validity_period} days`}
                  />
                  <Field label="Partial delivery allowed" value={<YesNo value={rfq.partial_delivery_allowed} />} />
                  <Field label="Split award allowed" value={<YesNo value={rfq.split_award_allowed} />} />
                </FieldGroup>

                <FieldGroup title="Procurement">
                  <Field label="Procurement category" value={rfq.procurement_category} />
                  <Field label="Buyer" value={rfq.buyer} />
                  <Field label="Procurement owner" value={rfq.procurement_owner} />
                  <Field
                    label="Budget amount"
                    value={rfq.budget_amount == null ? null : formatCurrency(rfq.budget_amount, rfq.currency ?? "USD")}
                    mono
                  />
                  <Field label="Budget approved" value={<YesNo value={rfq.budget_approved} />} />
                  <Field label="Competitive bidding" value={<YesNo value={rfq.competitive_bidding} />} />
                  <Field label="Single source" value={<YesNo value={rfq.single_source} />} />
                  <Field label="Strategic procurement" value={<YesNo value={rfq.strategic_procurement} />} />
                  <Field label="Emergency procurement" value={<YesNo value={rfq.emergency_procurement} />} />
                </FieldGroup>

                <FieldGroup title="Compliance">
                  <Field label="Compliance review" value={<YesNo value={rfq.compliance_review} />} />
                  <Field label="Compliance status" value={rfq.compliance_status.replace(/_/g, " ")} />
                  <Field label="Export control" value={<YesNo value={rfq.export_control} />} />
                  <Field label="Sanction screening" value={<YesNo value={rfq.sanction_screening} />} />
                </FieldGroup>
              </div>
            </TabPanel>

            <TabPanel value="details">
              <div className="space-y-4">
                <FieldGroup title="Customer">
                  <Field
                    label="Customer"
                    value={
                      rfq.company_id ? (
                        <Link to="/crm/companies" className="text-copper-700 hover:text-copper-800">
                          {rfq.customer_name}
                        </Link>
                      ) : (
                        rfq.customer_name
                      )
                    }
                  />
                  <Field label="Customer contact" value={rfq.customer_contact_name} />
                  <Field label="Customer email" value={rfq.customer_email} />
                  <Field label="End user" value={rfq.end_user} />
                  <Field label="EPC contractor" value={rfq.epc_contractor} />
                  <Field label="Customer RFQ number" value={rfq.customer_rfq_number} mono />
                </FieldGroup>

                <FieldGroup title="Schedule">
                  <Field label="RFQ date" value={formatDate(rfq.rfq_date)} />
                  <Field
                    label="Supplier submission deadline"
                    value={rfq.submission_deadline ? formatDate(rfq.submission_deadline) : null}
                  />
                  <Field label="Customer deadline" value={rfq.customer_deadline ? formatDate(rfq.customer_deadline) : null} />
                  <Field
                    label="Required delivery"
                    value={rfq.required_delivery_date ? formatDate(rfq.required_delivery_date) : null}
                  />
                  <Field
                    label="Expected award"
                    value={rfq.expected_award_date ? formatDate(rfq.expected_award_date) : null}
                  />
                  <Field label="Valid until" value={rfq.valid_until ? formatDate(rfq.valid_until) : null} />
                </FieldGroup>

                <FieldGroup title="Engineering">
                  <Field label="Engineering owner" value={rfq.engineering_owner} />
                  <Field label="Review status" value={rfq.engineering_review_status.replace(/_/g, " ")} />
                  <Field label="Engineering approval" value={<YesNo value={rfq.engineering_approval} />} />
                  <Field label="Technical risk level" value={rfq.technical_risk_level} />
                  <Field label="Revision" value={rfq.revision} mono />
                  <Field label="Priority" value={rfq.priority} />
                </FieldGroup>

                <Card className="p-5">
                  <h3 className="text-sm font-semibold text-surface-900 mb-2">Scope of supply</h3>
                  <p className="text-sm text-surface-700">{rfq.scope_of_supply ?? "—"}</p>
                  {rfq.engineering_notes && (
                    <>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-400 mt-4 mb-1">
                        Engineering notes
                      </h4>
                      <p className="text-sm text-surface-600">{rfq.engineering_notes}</p>
                    </>
                  )}
                </Card>
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* Side column */}
        <div className="space-y-4">
          <RfqWorkflowGuide rfq={rfq} lines={lines} responses={responses} />

          <p className="flex items-start gap-2 text-xs text-surface-400">
            <ShieldAlert size={13} className="mt-0.5 shrink-0" />
            Evaluation scores, supplier ranking and award recommendation are intentionally not implemented — no approved
            scoring methodology exists, and AI-assisted sourcing requires a Change Request.
          </p>
        </div>
      </div>
    </div>
  );
}
