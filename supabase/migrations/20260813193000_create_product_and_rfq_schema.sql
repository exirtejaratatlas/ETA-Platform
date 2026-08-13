/*
# ETA Platform — Product & RFQ Schema

## Status
NOT APPLIED. This file is authored only. `IMPLEMENTATION-GATE.md` and
`CODING-RULES.md` place "Database redesign" and "Production deployment
decisions" under Forbidden-without-a-Change-Request, and
`PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §6 Q3/Q6 records that no Supabase
project is confirmed provisioned and that the existing baseline schema has not
been re-validated against Blueprint entity documents. Do not run this migration
against any environment until those questions are closed by the Decision Owner.

## Authority
- `ETA-Blueprint/04-DATA/Entities/Product/Product Attributes.md`  (ETA-ENT-PRODUCT-002, Approved)
- `ETA-Blueprint/04-DATA/Entities/Product/Product Business Rules.md` (ETA-ENT-PRODUCT-004, Approved)
- `ETA-Blueprint/04-DATA/Entities/Product/Product Lifecycle.md`   (ETA-ENT-PRODUCT-005, Approved)
- `ETA-Blueprint/04-DATA/Entities/RFQ/RFQ Attributes.md`          (ETA-ENT-RFQ-002, Approved)
- `ETA-Blueprint/04-DATA/Entities/RFQ/RFQ Business Rules.md`      (ETA-ENT-RFQ-004, Approved)
- `ETA-Blueprint/04-DATA/Entities/RFQ/RFQ Lifecycle.md`           (ETA-ENT-RFQ-005, Approved)

## Scope
Mirrors exactly the attribute subset modelled in `src/lib/supabase.ts`.
Deliberately NOT included:
- Product inventory / warehouse / logistics / quality attribute groups (belong to
  modules that are not in scope).
- Every AI attribute group on both entities (ai_summary, ai_*_score,
  embedding_id, knowledge_graph_node, ...) — AI automation is forbidden without
  a Change Request.
- RFQ evaluation scores (commercial_score, technical_score, final_score) — no
  approved evaluation methodology exists (PHASE6 §6 Q9, open).

## Business rules encoded as constraints
- BR-002 / BR-003 (Product) — product_code is UNIQUE.
- BR-004 (Product) — lifecycle_status NOT NULL with a CHECK over ETA-ENT-PRODUCT-005 stages.
- BR-006 (Product) — category NOT NULL.
- BR-028 (Product) — reorder point vs. maximum stock is an Inventory-module rule; not modelled here.
- BR-037 (Product) / BR-039 (RFQ) — soft delete only: `deleted_flag`, no physical delete path.
- BR-001 / BR-002 (RFQ) — rfq_number is UNIQUE.
- BR-004 / BR-005 (RFQ) — rfq_type and rfq_status NOT NULL with CHECKs over ETA-ENT-RFQ-001.
- BR-010 / BR-011 (RFQ) — quantity and uom on rfq_lines are enforced at approval time in
  application logic (`src/lib/rfqLifecycle.ts`), NOT as NOT NULL columns, because a Draft RFQ is
  explicitly allowed to be incomplete (ETA-ENT-RFQ-005 stage 2).

## Security
RLS enabled on all tables; policies follow the existing single-tenant pattern
(`TO anon, authenticated`, `USING (true)`), consistent with
`20260710212509_create_eta_platform_schema.sql`. Revisit when authentication is
introduced — that is its own decision, not part of this migration.
*/

-- ============ PRODUCT MASTER DATA ============

CREATE TABLE IF NOT EXISTS products (
  -- Identity (ETA-ENT-PRODUCT-002 §Product Identity)
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_code text NOT NULL UNIQUE,                 -- BR-002, BR-003
  sku text,
  product_name text NOT NULL,
  short_name text,
  technical_name text,
  category text NOT NULL,                            -- BR-006
  subcategory text,
  product_type text NOT NULL DEFAULT 'Physical Product' CHECK (product_type IN (
    'Physical Product','Spare Part','Raw Material','Semi-Finished Product','Finished Product',
    'Service','Software','Engineering Item','Fabricated Item','Rental Equipment')),
  brand text,
  model text,
  revision text,
  lifecycle_status text NOT NULL DEFAULT 'Draft' CHECK (lifecycle_status IN (
    'Idea','Draft','Engineering Review','Procurement Review','Compliance Review',
    'Approved','Active','Revision','Obsolete','Archived')),   -- BR-004
  active boolean NOT NULL DEFAULT true,

  -- Classification (§Classification)
  unspsc_code text,
  hs_code text,
  industry text NOT NULL DEFAULT 'Industrial Equipment',
  criticality text,                                  -- enum domain undefined in ETA-ENT-PRODUCT-002
  strategic_item boolean NOT NULL DEFAULT false,
  spare_part boolean NOT NULL DEFAULT false,

  -- Manufacturer (§Manufacturer Information) — BR-007 enforced at approval, not creation
  manufacturer_name text,
  manufacturer_part_number text,
  country_of_origin text,
  warranty_months int,
  lead_time_days int,
  preferred_manufacturer boolean NOT NULL DEFAULT false,

  -- Technical specification (§Technical Specifications)
  description text,
  technical_description text,
  specification text,
  technical_standard text,
  material text,
  grade text,
  size text,
  weight numeric,
  weight_unit text,
  uom text NOT NULL DEFAULT 'unit',
  pressure_rating text,
  temperature_rating text,

  -- Supplier (§Supplier Information)
  supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,
  alternate_supplier_ids uuid[] NOT NULL DEFAULT '{}',
  supplier_part_number text,
  moq numeric,
  supplier_lead_time int,
  preferred_supplier boolean NOT NULL DEFAULT false,

  -- Procurement (§Procurement Information)
  procurement_category text,
  procurement_method text,
  preferred_incoterm text,
  payment_term text,
  standard_delivery_days int,

  -- Pricing (§Pricing Information) — BR-029: currency required for commercial pricing
  standard_cost numeric,
  currency text NOT NULL DEFAULT 'USD',
  target_purchase_price numeric,
  last_purchase_price numeric,
  price_valid_until date,

  -- Commercial (§Commercial Information)
  export_control boolean NOT NULL DEFAULT false,
  sanction_sensitive boolean NOT NULL DEFAULT false,
  availability text,

  -- Audit (§Audit Metadata) — BR-036, BR-037
  deleted_flag boolean NOT NULL DEFAULT false,
  row_version int NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_lifecycle_status ON products(lifecycle_status);
CREATE INDEX IF NOT EXISTS idx_products_supplier_id ON products(supplier_id);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
-- No DELETE policy: BR-037 — soft delete only, physical deletion is prohibited.

-- ============ RFQ ============

CREATE TABLE IF NOT EXISTS rfqs (
  -- Identity (ETA-ENT-RFQ-002 §RFQ Identity)
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rfq_number text NOT NULL UNIQUE,                   -- BR-001, BR-002
  customer_rfq_number text,
  internal_reference text,
  rfq_type text NOT NULL CHECK (rfq_type IN (
    'Customer RFQ','Internal RFQ','Strategic RFQ','Budgetary RFQ','Competitive RFQ',
    'Emergency RFQ','Repeat RFQ','Project RFQ')),    -- BR-004
  rfq_status text NOT NULL DEFAULT 'Draft' CHECK (rfq_status IN (
    'Draft','Engineering Review','Procurement Review','Approved','Sent','Supplier Responding',
    'Quotation Received','Evaluation','Awarded','Closed','Cancelled')),  -- BR-005
  priority text,
  revision int NOT NULL DEFAULT 0,                   -- BR-025
  active boolean NOT NULL DEFAULT true,

  -- Customer (§Customer Information) — BR-006: exactly one customer
  company_id uuid REFERENCES companies(id) ON DELETE SET NULL,
  customer_name text NOT NULL,
  end_user text,
  epc_contractor text,
  customer_contact_name text,
  customer_email text,

  -- General (§General Information)
  rfq_title text NOT NULL,
  description text,
  scope_of_supply text,
  industry text NOT NULL DEFAULT 'Industrial Equipment',
  procurement_owner text,
  engineering_owner text,

  -- Schedule (§Schedule) — BR-020: deadline mandatory before invitation
  rfq_date date NOT NULL DEFAULT CURRENT_DATE,
  submission_deadline timestamptz,
  customer_deadline timestamptz,
  required_delivery_date date,
  expected_award_date date,
  valid_until date,

  -- Engineering (§Engineering Information) — BR-013
  engineering_review_status text NOT NULL DEFAULT 'not_started'
    CHECK (engineering_review_status IN ('not_started','in_review','approved','rejected')),
  engineering_approval boolean NOT NULL DEFAULT false,
  engineering_notes text,
  technical_risk_level text,

  -- Supplier selection (§Supplier Selection) — BR-017, BR-019 enforced upstream
  invited_supplier_ids uuid[] NOT NULL DEFAULT '{}',
  supplier_response_count int NOT NULL DEFAULT 0,
  winning_supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,

  -- Commercial terms (§Commercial Terms) — BR-026, BR-027, BR-028
  incoterm text,
  delivery_location text,
  payment_terms text,
  currency text,
  validity_period int,
  partial_delivery_allowed boolean NOT NULL DEFAULT false,
  split_award_allowed boolean NOT NULL DEFAULT false,

  -- Procurement (§Procurement Information) — BR-021, BR-022, BR-024
  procurement_category text,
  strategic_procurement boolean NOT NULL DEFAULT false,
  emergency_procurement boolean NOT NULL DEFAULT false,
  competitive_bidding boolean NOT NULL DEFAULT true,
  single_source boolean NOT NULL DEFAULT false,
  budget_approved boolean NOT NULL DEFAULT false,
  budget_amount numeric,
  buyer text,

  -- Compliance (§Compliance)
  compliance_review boolean NOT NULL DEFAULT false,
  export_control boolean NOT NULL DEFAULT false,
  sanction_screening boolean NOT NULL DEFAULT false,
  compliance_status text NOT NULL DEFAULT 'not_started'
    CHECK (compliance_status IN ('not_started','in_review','cleared','blocked')),

  -- Audit (§Audit Metadata) — BR-038, BR-039
  deleted_flag boolean NOT NULL DEFAULT false,
  row_version int NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rfqs_status ON rfqs(rfq_status);
CREATE INDEX IF NOT EXISTS idx_rfqs_company_id ON rfqs(company_id);
CREATE INDEX IF NOT EXISTS idx_rfqs_rfq_date ON rfqs(rfq_date DESC);

ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_rfqs" ON rfqs;
CREATE POLICY "anon_select_rfqs" ON rfqs FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_rfqs" ON rfqs;
CREATE POLICY "anon_insert_rfqs" ON rfqs FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_rfqs" ON rfqs;
CREATE POLICY "anon_update_rfqs" ON rfqs FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
-- No DELETE policy: BR-039 — soft delete only.

-- ============ RFQ PRODUCT LINES ============
-- ETA-ENT-RFQ-002 §Product Lines. BR-009 (at least one line) and BR-010/BR-011
-- (quantity, UoM) are approval-time gates, evaluated in application logic —
-- a Draft RFQ is allowed to be incomplete per ETA-ENT-RFQ-005 stage 2.

CREATE TABLE IF NOT EXISTS rfq_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rfq_id uuid NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  line_number int NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_code text,
  product_name text NOT NULL,
  quantity numeric,
  uom text,
  estimated_budget numeric,
  currency text,
  preferred_manufacturer text,
  preferred_supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,
  technical_specification text,
  datasheet_attached boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE (rfq_id, line_number)                       -- BR-012, structural half
);

CREATE INDEX IF NOT EXISTS idx_rfq_lines_rfq_id ON rfq_lines(rfq_id);
CREATE INDEX IF NOT EXISTS idx_rfq_lines_product_id ON rfq_lines(product_id);

ALTER TABLE rfq_lines ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_rfq_lines" ON rfq_lines;
CREATE POLICY "anon_select_rfq_lines" ON rfq_lines FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_rfq_lines" ON rfq_lines;
CREATE POLICY "anon_insert_rfq_lines" ON rfq_lines FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_rfq_lines" ON rfq_lines;
CREATE POLICY "anon_update_rfq_lines" ON rfq_lines FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_rfq_lines" ON rfq_lines;
CREATE POLICY "anon_delete_rfq_lines" ON rfq_lines FOR DELETE TO anon, authenticated USING (true);

-- ============ RFQ SUPPLIER RESPONSES ============
-- ETA-ENT-RFQ-002 §Supplier Selection + §Quotation Information.
-- No score, rank or recommendation column exists by design.
-- BR-031: supplier quotations cannot be modified after submission — enforce in
-- application logic / a future trigger once an audit-trail entity is approved.

CREATE TABLE IF NOT EXISTS rfq_supplier_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rfq_id uuid NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  supplier_name text NOT NULL,
  response_status text NOT NULL DEFAULT 'invited'
    CHECK (response_status IN ('invited','responding','quoted','declined','no_response')),
  quote_number text,
  quoted_total numeric,
  currency text,
  delivery_days int,
  payment_terms text,
  incoterm text,
  warranty_months int,
  validity_days int,
  technical_compliance text NOT NULL DEFAULT 'not_evaluated'
    CHECK (technical_compliance IN ('not_evaluated','compliant','deviation','non_compliant')),
  deviation_notes text,
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE (rfq_id, supplier_id)
);

CREATE INDEX IF NOT EXISTS idx_rfq_responses_rfq_id ON rfq_supplier_responses(rfq_id);
CREATE INDEX IF NOT EXISTS idx_rfq_responses_supplier_id ON rfq_supplier_responses(supplier_id);

ALTER TABLE rfq_supplier_responses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_rfq_responses" ON rfq_supplier_responses;
CREATE POLICY "anon_select_rfq_responses" ON rfq_supplier_responses FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_rfq_responses" ON rfq_supplier_responses;
CREATE POLICY "anon_insert_rfq_responses" ON rfq_supplier_responses FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_rfq_responses" ON rfq_supplier_responses;
CREATE POLICY "anon_update_rfq_responses" ON rfq_supplier_responses FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_rfq_responses" ON rfq_supplier_responses;
CREATE POLICY "anon_delete_rfq_responses" ON rfq_supplier_responses FOR DELETE TO anon, authenticated USING (true);
