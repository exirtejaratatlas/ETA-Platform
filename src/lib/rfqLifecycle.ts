import type { Rfq, RfqLine, RfqStatus, RfqSupplierResponse } from "./supabase";

// ---------------------------------------------------------------------------
// RFQ lifecycle + business-rule evaluation.
//
// Every stage and every check below is transcribed from an Approved ETA-Blueprint
// document. Nothing here is inferred, scored, weighted, or predicted:
//
//   ETA-ENT-RFQ-005  RFQ Lifecycle      — the 14 stages
//   ETA-ENT-RFQ-004  RFQ Business Rules — BR-001 .. BR-040
//
// This is deterministic rule evaluation, NOT an AI feature. It calls no model,
// makes no recommendation, and produces no score or ranking. AI automation
// remains forbidden without a Change Request (CODING-RULES.md), and D4 forbids
// present-tense AI claims on any ETA surface.
// ---------------------------------------------------------------------------

export type LifecycleStage = {
  /** Stage number as printed in ETA-ENT-RFQ-005. */
  stage: number;
  name: string;
  owner: string;
  /**
   * The `rfq_status` value ETA-ENT-RFQ-005 prints for this stage, when that value
   * also exists in ETA-ENT-RFQ-001's declared status domain. `null` where the
   * lifecycle document names a stage the entity document has no status for —
   * see the OPEN DECISION note on `RfqStatus` in supabase.ts.
   */
  status: RfqStatus | null;
  /** Verbatim summary of what the stage validates, per ETA-ENT-RFQ-005. */
  validates: string;
};

/** ETA-ENT-RFQ-005 §"Lifecycle Overview", Stages 1–14. */
export const RFQ_LIFECYCLE: LifecycleStage[] = [
  { stage: 1, name: "Idea", owner: "Procurement", status: null, validates: "Sourcing requirement originates from customer request, opportunity, project, maintenance, inventory replenishment." },
  { stage: 2, name: "Draft", owner: "Procurement", status: "Draft", validates: "Customer, product lines, quantities, scope." },
  { stage: 3, name: "Engineering Review", owner: "Engineering", status: "Engineering Review", validates: "Technical specifications, drawings, datasheets, standards, material requirements." },
  { stage: 4, name: "Procurement Review", owner: "Procurement", status: "Procurement Review", validates: "Supplier list, manufacturer, procurement strategy, budget, lead time." },
  { stage: 5, name: "Compliance Review", owner: "Compliance", status: null, validates: "Export control, sanctions, certifications, country restrictions." },
  { stage: 6, name: "Approved", owner: "Engineering + Procurement + Compliance", status: "Approved", validates: "Formal approval. High-value RFQs may also require Executive approval." },
  { stage: 7, name: "Supplier Invitation", owner: "Procurement", status: "Sent", validates: "Approved suppliers receive invitations via email, supplier portal, API or EDI." },
  { stage: 8, name: "Supplier Responses", owner: "Suppliers", status: "Supplier Responding", validates: "Commercial proposal, technical proposal, attachments, delivery schedule." },
  { stage: 9, name: "Technical Evaluation", owner: "Engineering", status: null, validates: "Compliance, technical match, deviations, alternatives." },
  { stage: 10, name: "Commercial Evaluation", owner: "Procurement", status: null, validates: "Price, delivery, payment terms, warranty, incoterms, supplier performance." },
  { stage: 11, name: "Award Decision", owner: "Procurement", status: "Awarded", validates: "Single award, split award, rejected or cancelled." },
  { stage: 12, name: "Purchase Order Creation", owner: "Procurement", status: null, validates: "Awarded quotations generate purchase orders, contract references, supplier commitments." },
  { stage: 13, name: "Closed", owner: "Procurement", status: "Closed", validates: "RFQ completed. No further quotations accepted." },
  { stage: 14, name: "Archived", owner: "Procurement", status: null, validates: "Retained for audit, analytics and procurement benchmarking." },
];

/**
 * Index of the stage an RFQ is currently sitting at, derived from its persisted
 * `rfq_status`. Statuses the lifecycle document has no stage for (`Quotation
 * Received`, `Evaluation`, `Cancelled`) are mapped to the nearest stage the two
 * documents agree on, and flagged below.
 */
export function currentStageIndex(rfq: Rfq): number {
  const direct = RFQ_LIFECYCLE.findIndex((s) => s.status === rfq.rfq_status);
  if (direct !== -1) return direct;
  // Entity-doc statuses with no lifecycle-doc stage — see OPEN DECISION on RfqStatus.
  switch (rfq.rfq_status) {
    case "Quotation Received":
      return 7; // between Supplier Responses and Technical Evaluation
    case "Evaluation":
      return 8; // Technical Evaluation
    case "Cancelled":
      return 12; // terminal, shown alongside Closed
    default:
      return 0;
  }
}

// ---------------------------------------------------------------------------
// Business-rule checks
// ---------------------------------------------------------------------------

export type RuleSeverity = "blocker" | "required" | "advisory";

export type RuleResult = {
  /** Business rule ID exactly as printed in ETA-ENT-RFQ-004. */
  id: string;
  /** The rule text, quoted. */
  rule: string;
  /** Which lifecycle stage this gate belongs to (ETA-ENT-RFQ-005 stage number). */
  gate: string;
  severity: RuleSeverity;
  status: "pass" | "fail" | "not_applicable";
  /** What was actually observed on this record. Never a recommendation. */
  detail: string;
};

/**
 * Evaluates the Approved RFQ business rules that can be checked against the data
 * this platform holds today. Rules that depend on entities not yet implemented
 * (blacklist, budget authority matrix, audit trail, embeddings) are omitted
 * rather than guessed at.
 */
export function evaluateRfqRules(
  rfq: Rfq,
  lines: RfqLine[],
  responses: RfqSupplierResponse[]
): RuleResult[] {
  const results: RuleResult[] = [];
  const quoted = responses.filter((r) => r.response_status === "quoted");

  const push = (
    id: string,
    rule: string,
    gate: string,
    severity: RuleSeverity,
    ok: boolean,
    detail: string,
    applicable = true
  ) =>
    results.push({
      id,
      rule,
      gate,
      severity,
      status: !applicable ? "not_applicable" : ok ? "pass" : "fail",
      detail,
    });

  // --- Identity -----------------------------------------------------------
  push(
    "BR-004",
    "RFQ Type is mandatory.",
    "Stage 2 — Draft",
    "blocker",
    Boolean(rfq.rfq_type),
    rfq.rfq_type ? `Type: ${rfq.rfq_type}` : "No RFQ type set."
  );

  // --- Customer -----------------------------------------------------------
  push(
    "BR-006",
    "An RFQ must belong to exactly one Customer.",
    "Stage 2 — Draft",
    "blocker",
    Boolean(rfq.customer_name),
    rfq.customer_name ? `Customer: ${rfq.customer_name}` : "No customer assigned."
  );
  push(
    "BR-008",
    "Customer Contact must be assigned before RFQ submission.",
    "Stage 2 — Draft",
    "required",
    Boolean(rfq.customer_contact_name),
    rfq.customer_contact_name
      ? `Contact: ${rfq.customer_contact_name}`
      : "No customer contact recorded."
  );

  // --- Product lines ------------------------------------------------------
  push(
    "BR-009",
    "Every RFQ must contain at least one Product Line.",
    "Stage 2 — Draft",
    "blocker",
    lines.length > 0,
    `${lines.length} product line${lines.length === 1 ? "" : "s"}.`
  );
  const missingQty = lines.filter((l) => l.quantity == null || l.quantity <= 0);
  push(
    "BR-010",
    "Every Product Line requires Quantity.",
    "Stage 2 — Draft",
    "blocker",
    missingQty.length === 0,
    missingQty.length === 0
      ? "All lines carry a quantity."
      : `Missing on line${missingQty.length === 1 ? "" : "s"} ${missingQty.map((l) => l.line_number).join(", ")}.`
  );
  const missingUom = lines.filter((l) => !l.uom);
  push(
    "BR-011",
    "Every Product Line requires Unit of Measure.",
    "Stage 2 — Draft",
    "blocker",
    missingUom.length === 0,
    missingUom.length === 0
      ? "All lines carry a unit of measure."
      : `Missing on line${missingUom.length === 1 ? "" : "s"} ${missingUom.map((l) => l.line_number).join(", ")}.`
  );

  // --- Engineering --------------------------------------------------------
  push(
    "BR-013",
    "Engineering Review is mandatory before supplier invitation.",
    "Stage 3 — Engineering Review",
    "blocker",
    rfq.engineering_approval,
    rfq.engineering_approval
      ? "Engineering approval recorded."
      : `Engineering review status: ${rfq.engineering_review_status.replace(/_/g, " ")}.`
  );
  const missingSpec = lines.filter((l) => !l.technical_specification);
  push(
    "BR-014",
    "Incomplete technical specifications prevent RFQ approval.",
    "Stage 3 — Engineering Review",
    "blocker",
    missingSpec.length === 0,
    missingSpec.length === 0
      ? "All lines carry a technical specification."
      : `No specification on line${missingSpec.length === 1 ? "" : "s"} ${missingSpec.map((l) => l.line_number).join(", ")}.`
  );
  const missingDatasheet = lines.filter((l) => !l.datasheet_attached);
  push(
    "BR-015",
    "Mandatory datasheets must be attached before submission.",
    "Stage 3 — Engineering Review",
    "required",
    missingDatasheet.length === 0,
    missingDatasheet.length === 0
      ? "Datasheet attached on every line."
      : `No datasheet on line${missingDatasheet.length === 1 ? "" : "s"} ${missingDatasheet.map((l) => l.line_number).join(", ")}.`
  );

  // --- Compliance ---------------------------------------------------------
  push(
    "BR-035",
    "AI Risk Score cannot override Compliance decisions.",
    "Stage 5 — Compliance Review",
    "blocker",
    rfq.compliance_status === "cleared",
    `Compliance status: ${rfq.compliance_status.replace(/_/g, " ")}${
      rfq.export_control ? " · export-controlled" : ""
    }${rfq.sanction_screening ? " · sanction screening required" : ""}.`
  );

  // --- Supplier -----------------------------------------------------------
  push(
    "BR-020",
    "Supplier response deadlines are mandatory.",
    "Stage 7 — Supplier Invitation",
    "blocker",
    Boolean(rfq.submission_deadline),
    rfq.submission_deadline
      ? `Submission deadline set.`
      : "No submission deadline set."
  );
  push(
    "BR-023",
    "Competitive RFQs should invite at least three suppliers.",
    "Stage 7 — Supplier Invitation",
    "advisory",
    rfq.invited_supplier_ids.length >= 3,
    `${rfq.invited_supplier_ids.length} supplier${rfq.invited_supplier_ids.length === 1 ? "" : "s"} invited.`,
    rfq.competitive_bidding
  );

  // --- Procurement --------------------------------------------------------
  push(
    "BR-021",
    "Strategic RFQs require Procurement Manager approval.",
    "Stage 4 — Procurement Review",
    "required",
    Boolean(rfq.procurement_owner),
    rfq.procurement_owner
      ? `Procurement owner: ${rfq.procurement_owner}`
      : "No procurement owner assigned.",
    rfq.strategic_procurement
  );
  push(
    "BR-022",
    "Emergency RFQs bypass competitive bidding only with approval.",
    "Stage 4 — Procurement Review",
    "required",
    rfq.competitive_bidding || Boolean(rfq.procurement_owner),
    rfq.competitive_bidding
      ? "Competitive bidding retained."
      : `Competitive bidding waived — approver of record: ${rfq.procurement_owner ?? "none"}.`,
    rfq.emergency_procurement
  );
  push(
    "BR-024",
    "Budget approval is required before issuing high-value RFQs.",
    "Stage 4 — Procurement Review",
    "required",
    rfq.budget_approved,
    rfq.budget_approved ? "Budget approved." : "Budget not approved.",
    rfq.budget_amount != null
  );

  // --- Commercial ---------------------------------------------------------
  push(
    "BR-026",
    "Currency must be specified before supplier invitation.",
    "Stage 7 — Supplier Invitation",
    "blocker",
    Boolean(rfq.currency),
    rfq.currency ? `Currency: ${rfq.currency}` : "No currency set."
  );
  push(
    "BR-027",
    "Payment Terms must be defined.",
    "Stage 7 — Supplier Invitation",
    "blocker",
    Boolean(rfq.payment_terms),
    rfq.payment_terms ? `Payment terms: ${rfq.payment_terms}` : "No payment terms set."
  );
  push(
    "BR-028",
    "Incoterm must be specified.",
    "Stage 7 — Supplier Invitation",
    "blocker",
    Boolean(rfq.incoterm),
    rfq.incoterm ? `Incoterm: ${rfq.incoterm}` : "No incoterm set."
  );

  // --- Evaluation ---------------------------------------------------------
  const allTechnicallyEvaluated =
    quoted.length > 0 && quoted.every((r) => r.technical_compliance !== "not_evaluated");
  push(
    "BR-030",
    "Technical evaluation precedes commercial evaluation.",
    "Stage 9 — Technical Evaluation",
    "blocker",
    allTechnicallyEvaluated,
    quoted.length === 0
      ? "No quotations received yet."
      : `${quoted.filter((r) => r.technical_compliance !== "not_evaluated").length} of ${quoted.length} quotation${quoted.length === 1 ? "" : "s"} technically evaluated.`,
    quoted.length > 0
  );
  push(
    "BR-032",
    "Award recommendation requires evaluation completion.",
    "Stage 11 — Award Decision",
    "blocker",
    allTechnicallyEvaluated && quoted.length > 0,
    rfq.winning_supplier_id
      ? "Award recorded."
      : "No award recorded — evaluation must complete first.",
    rfq.rfq_status === "Awarded" || quoted.length > 0
  );

  return results;
}

export function ruleSummary(results: RuleResult[]) {
  const applicable = results.filter((r) => r.status !== "not_applicable");
  return {
    total: applicable.length,
    passed: applicable.filter((r) => r.status === "pass").length,
    failed: applicable.filter((r) => r.status === "fail").length,
    blockers: applicable.filter((r) => r.status === "fail" && r.severity === "blocker").length,
    skipped: results.length - applicable.length,
  };
}
