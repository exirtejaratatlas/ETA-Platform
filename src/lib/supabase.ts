import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

export type Company = {
  id: string;
  name: string;
  industry: string;
  website: string | null;
  email: string | null;
  phone: string | null;
  status: "active" | "inactive" | "prospect";
  employees: number;
  revenue: number;
  created_at: string;
  updated_at: string;
};

export type Contact = {
  id: string;
  company_id: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  title: string | null;
  status: "active" | "inactive";
  created_at: string;
};

export type Deal = {
  id: string;
  company_id: string | null;
  contact_id: string | null;
  title: string;
  value: number;
  currency: string;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
  probability: number;
  expected_close: string | null;
  created_at: string;
};

export type SupplierCategory =
  | "Manufacturer"
  | "Distributor"
  | "Trading Company"
  | "Service Provider"
  | "Logistics Provider"
  | "OEM"
  | "EPC Contractor"
  | "Consultant";

export type SupplierLifecycleStatus =
  | "Draft"
  | "Under Review"
  | "Approved"
  | "Active"
  | "Suspended"
  | "Inactive"
  | "Archived";

export type SupplierClassification = "Strategic" | "Preferred" | "Approved" | "Conditional";

export type Supplier = {
  id: string;
  supplier_code: string;
  name: string;
  category: string;
  email: string | null;
  phone: string | null;
  website: string | null;
  country: string;
  rating: number;
  status: "active" | "inactive" | "pending";
  payment_terms: string;
  created_at: string;
  // Supplier Intelligence (MOD-1) — ETA-Blueprint ENT-SUPPLIER-001
  lifecycle_status: SupplierLifecycleStatus;
  classification: SupplierClassification;
  certifications: string[];
  compliance_status: "compliant" | "under_review" | "non_compliant";
  risk_level: "low" | "medium" | "high";
};

export type SupplierRelationshipEvent = {
  id: string;
  supplier_id: string;
  date: string;
  type: "onboarded" | "order" | "review" | "certification" | "issue" | "note";
  title: string;
  description: string;
};

export type PurchaseOrder = {
  id: string;
  po_number: string;
  supplier_id: string | null;
  status: "draft" | "submitted" | "approved" | "shipped" | "received" | "cancelled";
  total: number;
  currency: string;
  order_date: string;
  expected_delivery: string | null;
  created_at: string;
};

export type PoItem = {
  id: string;
  po_id: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total: number;
  created_at: string;
};

export type SupplierProfile = {
  id: string;
  supplier_id: string;
  portal_status: "pending" | "onboarding" | "active" | "suspended";
  onboarding_step: number;
  documents_submitted: boolean;
  last_login: string | null;
  created_at: string;
};

export type SupplierQuote = {
  id: string;
  supplier_id: string;
  po_id: string | null;
  quote_number: string;
  total: number;
  currency: string;
  status: "submitted" | "under_review" | "accepted" | "rejected";
  valid_until: string | null;
  created_at: string;
};

export type AiModel = {
  id: string;
  name: string;
  provider: string;
  model_type: string;
  status: "active" | "inactive" | "training";
  endpoint: string | null;
  api_key_ref: string | null;
  created_at: string;
};

// Customer Inquiry / Opportunity — first MVP concept for capturing a customer request ahead of
// a formal RFQ. Sits upstream of ETA-Blueprint's approved RFQ entity (04-DATA/Entities/RFQ) —
// see docs/delivery/CONTENT-SOURCE-MAP.md. UI/mock-data only, no backend table yet.
export type InquiryStatus =
  | "new"
  | "technical_review"
  | "supplier_search"
  | "quotation_preparation"
  | "customer_offer_sent"
  | "negotiation"
  | "won"
  | "lost";

export type CustomerInquiry = {
  id: string;
  inquiry_number: string;
  company_id: string | null;
  customer_name: string;
  industry: string;
  request_date: string;
  product_equipment: string;
  technical_specification: string;
  quantity: string;
  required_delivery_date: string | null;
  status: InquiryStatus;
  created_at: string;
};

export type AiTask = {
  id: string;
  model_id: string | null;
  task_type: string;
  status: "pending" | "running" | "completed" | "failed";
  input_summary: string | null;
  output_summary: string | null;
  created_at: string;
  completed_at: string | null;
};

// ---------------------------------------------------------------------------
// Product — ETA-Blueprint 04-DATA/Entities/Product
//   ETA-ENT-PRODUCT-001 (Entity, Approved)
//   ETA-ENT-PRODUCT-002 (Attributes, Approved)  — ~177 enterprise attributes
//   ETA-ENT-PRODUCT-004 (Business Rules, Approved)
//   ETA-ENT-PRODUCT-005 (Lifecycle, Approved)
//
// SUBSET NOTICE: ETA-ENT-PRODUCT-002 remains the authority for the full attribute
// set. The type below implements the identity / classification / manufacturer /
// technical / supplier / procurement / pricing / commercial groups needed by the
// Product Management screens. Inventory, warehouse, logistics, quality, AI-metadata,
// enterprise-search and integration groups are deliberately NOT modelled here —
// they belong to modules that are not in scope (Inventory, Logistics, QA, AI).
// AI metadata in particular stays out until AI implementation is approved via a
// Change Request (CODING-RULES.md "Forbidden without a Change Request").
// ---------------------------------------------------------------------------

/**
 * Lifecycle status.
 *
 * OPEN DECISION REQUIRED — ETA-ENT-PRODUCT-001 §"Product Status" lists 7 states
 * (Draft, Engineering Review, Procurement Review, Approved, Active, Obsolete,
 * Archived) while ETA-ENT-PRODUCT-005 §"Lifecycle Overview" defines 11 stages,
 * adding Idea, Compliance Review and Revision. The union below follows the
 * Lifecycle document (the superset) so no approved stage is unrepresentable.
 * The two documents need reconciling in ETA-Blueprint.
 */
export type ProductLifecycleStatus =
  | "Idea"
  | "Draft"
  | "Engineering Review"
  | "Procurement Review"
  | "Compliance Review"
  | "Approved"
  | "Active"
  | "Revision"
  | "Obsolete"
  | "Archived";

/** ETA-ENT-PRODUCT-001 §"Product Types". */
export type ProductType =
  | "Physical Product"
  | "Spare Part"
  | "Raw Material"
  | "Semi-Finished Product"
  | "Finished Product"
  | "Service"
  | "Software"
  | "Engineering Item"
  | "Fabricated Item"
  | "Rental Equipment";

/** ETA-ENT-PRODUCT-001 §"Product Categories" (examples list, non-exhaustive). */
export type ProductCategory =
  | "Pumps"
  | "Compressors"
  | "Gearboxes"
  | "Electric Motors"
  | "Valves"
  | "Bearings"
  | "Instruments"
  | "Steel Products"
  | "Pipes"
  | "Flanges"
  | "Fittings"
  | "Gaskets"
  | "Spare Parts"
  | "Electrical Equipment"
  | "Automation Equipment"
  | "EPC Materials"
  | "Services";

export type Product = {
  // Identity
  id: string;
  product_code: string;
  sku: string | null;
  product_name: string;
  short_name: string | null;
  technical_name: string | null;
  category: ProductCategory;
  subcategory: string | null;
  product_type: ProductType;
  brand: string | null;
  model: string | null;
  revision: string | null;
  lifecycle_status: ProductLifecycleStatus;
  active: boolean;

  // Classification
  unspsc_code: string | null;
  hs_code: string | null;
  industry: string;
  /**
   * OPEN DECISION REQUIRED — ETA-ENT-PRODUCT-002 types `criticality` as Enum but
   * never defines its value domain. Typed as a free string here rather than
   * inventing a scale; the UI renders the raw value.
   */
  criticality: string | null;
  strategic_item: boolean;
  spare_part: boolean;

  // Manufacturer
  manufacturer_name: string | null;
  manufacturer_part_number: string | null;
  country_of_origin: string | null;
  warranty_months: number | null;
  lead_time_days: number | null;
  preferred_manufacturer: boolean;

  // Technical specification
  description: string | null;
  technical_description: string | null;
  specification: string | null;
  technical_standard: string | null;
  material: string | null;
  grade: string | null;
  size: string | null;
  weight: number | null;
  weight_unit: string | null;
  uom: string;
  pressure_rating: string | null;
  temperature_rating: string | null;

  // Supplier
  supplier_id: string | null;
  alternate_supplier_ids: string[];
  supplier_part_number: string | null;
  moq: number | null;
  supplier_lead_time: number | null;
  preferred_supplier: boolean;

  // Procurement
  procurement_category: string | null;
  procurement_method: string | null;
  preferred_incoterm: string | null;
  payment_term: string | null;
  standard_delivery_days: number | null;

  // Pricing
  standard_cost: number | null;
  currency: string;
  target_purchase_price: number | null;
  last_purchase_price: number | null;
  price_valid_until: string | null;

  // Commercial
  export_control: boolean;
  sanction_sensitive: boolean;
  availability: string | null;

  // Audit
  created_at: string;
  updated_at: string;
};

// ---------------------------------------------------------------------------
// RFQ — ETA-Blueprint 04-DATA/Entities/RFQ
//   ETA-ENT-RFQ-001 (Entity, Approved)
//   ETA-ENT-RFQ-002 (Attributes, Approved)
//   ETA-ENT-RFQ-004 (Business Rules, Approved)
//   ETA-ENT-RFQ-005 (Lifecycle, Approved)
//
// SUBSET NOTICE: as with Product, the AI Procurement attribute group of
// ETA-ENT-RFQ-002 (ai_supplier_recommendation, ai_risk_score, ai_procurement_score,
// embedding_id, ...) is deliberately NOT modelled — AI automation is forbidden
// without a Change Request. Evaluation *scores* (commercial_score, technical_score,
// final_score) are likewise omitted: no approved scoring methodology exists
// (PHASE6-PLATFORM-EXECUTION-STRATEGY.md §6 Q9, still open).
// ---------------------------------------------------------------------------

/**
 * Persisted RFQ status field.
 *
 * OPEN DECISION REQUIRED — ETA-ENT-RFQ-001 §"RFQ Status" lists these 11 values;
 * ETA-ENT-RFQ-005 §"Lifecycle Overview" walks 14 stages and names statuses the
 * entity document does not carry (Idea, Compliance Review, Technical Evaluation,
 * Commercial Evaluation, PO Created, Archived). This type follows the ENTITY
 * document because that is where the field's domain is declared; the lifecycle
 * document drives the stage tracker in `rfqLifecycle.ts`. The two need
 * reconciling in ETA-Blueprint.
 */
export type RfqStatus =
  | "Draft"
  | "Engineering Review"
  | "Procurement Review"
  | "Approved"
  | "Sent"
  | "Supplier Responding"
  | "Quotation Received"
  | "Evaluation"
  | "Awarded"
  | "Closed"
  | "Cancelled";

/** ETA-ENT-RFQ-001 §"RFQ Types". */
export type RfqType =
  | "Customer RFQ"
  | "Internal RFQ"
  | "Strategic RFQ"
  | "Budgetary RFQ"
  | "Competitive RFQ"
  | "Emergency RFQ"
  | "Repeat RFQ"
  | "Project RFQ";

/**
 * OPEN DECISION REQUIRED — ETA-ENT-RFQ-002 types `priority` and
 * `technical_risk_level` as Enum without defining their value domains.
 * Typed as free strings rather than inventing scales.
 */
export type Rfq = {
  // Identity
  id: string;
  rfq_number: string;
  customer_rfq_number: string | null;
  internal_reference: string | null;
  rfq_type: RfqType;
  rfq_status: RfqStatus;
  priority: string | null;
  revision: number;
  active: boolean;

  // Customer
  company_id: string | null;
  customer_name: string;
  end_user: string | null;
  epc_contractor: string | null;
  customer_contact_name: string | null;
  customer_email: string | null;

  // General
  rfq_title: string;
  description: string | null;
  scope_of_supply: string | null;
  industry: string;
  procurement_owner: string | null;
  engineering_owner: string | null;

  // Schedule
  rfq_date: string;
  submission_deadline: string | null;
  customer_deadline: string | null;
  required_delivery_date: string | null;
  expected_award_date: string | null;
  valid_until: string | null;

  // Engineering
  engineering_review_status: "not_started" | "in_review" | "approved" | "rejected";
  engineering_approval: boolean;
  engineering_notes: string | null;
  technical_risk_level: string | null;

  // Supplier selection
  invited_supplier_ids: string[];
  supplier_response_count: number;
  winning_supplier_id: string | null;

  // Commercial terms
  incoterm: string | null;
  delivery_location: string | null;
  payment_terms: string | null;
  currency: string | null;
  validity_period: number | null;
  partial_delivery_allowed: boolean;
  split_award_allowed: boolean;

  // Procurement
  procurement_category: string | null;
  strategic_procurement: boolean;
  emergency_procurement: boolean;
  competitive_bidding: boolean;
  single_source: boolean;
  budget_approved: boolean;
  budget_amount: number | null;
  buyer: string | null;

  // Compliance
  compliance_review: boolean;
  export_control: boolean;
  sanction_screening: boolean;
  compliance_status: "not_started" | "in_review" | "cleared" | "blocked";

  // Audit
  created_at: string;
};

/** ETA-ENT-RFQ-002 §"Product Lines". */
export type RfqLine = {
  id: string;
  rfq_id: string;
  line_number: number;
  product_id: string | null;
  product_code: string | null;
  product_name: string;
  quantity: number | null;
  uom: string | null;
  estimated_budget: number | null;
  currency: string | null;
  preferred_manufacturer: string | null;
  preferred_supplier_id: string | null;
  technical_specification: string | null;
  datasheet_attached: boolean;
};

/**
 * Supplier response to an RFQ — the record behind ETA-ENT-RFQ-002's
 * §"Supplier Selection" and §"Quotation Information" groups.
 *
 * Deliberately carries NO score, rank, or recommendation field: no approved
 * evaluation methodology exists, and supplier scoring/ranking is out of scope.
 * Technical compliance is a recorded engineering judgement (ETA-ENT-RFQ-005
 * Stage 9), not a computed value.
 */
export type RfqSupplierResponse = {
  id: string;
  rfq_id: string;
  supplier_id: string;
  supplier_name: string;
  response_status: "invited" | "responding" | "quoted" | "declined" | "no_response";
  quote_number: string | null;
  quoted_total: number | null;
  currency: string | null;
  delivery_days: number | null;
  payment_terms: string | null;
  incoterm: string | null;
  warranty_months: number | null;
  validity_days: number | null;
  technical_compliance: "not_evaluated" | "compliant" | "deviation" | "non_compliant";
  deviation_notes: string | null;
  submitted_at: string | null;
};
