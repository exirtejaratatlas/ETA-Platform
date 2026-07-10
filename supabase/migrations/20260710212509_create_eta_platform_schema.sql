/*
# ETA Platform — Core Schema

## Overview
Creates the complete database schema for the Exir Tejarat Atlas (ETA) enterprise platform.
This is a single-tenant application (no sign-in) so all policies use `TO anon, authenticated`.

## New Tables

### CRM Module
1. `companies` — Organizations/customers in the CRM
   - id (uuid PK), name, industry, website, email, phone, status, employees, revenue, created_at, updated_at
2. `contacts` — People at companies
   - id (uuid PK), company_id (FK), first_name, last_name, email, phone, title, status, created_at
3. `deals` — Sales pipeline opportunities
   - id (uuid PK), company_id (FK), contact_id (FK), title, value, currency, stage, probability, expected_close, created_at

### Procurement Module
4. `suppliers` — Vendor/supplier organizations
   - id (uuid PK), name, category, email, phone, website, rating, status, payment_terms, created_at
5. `purchase_orders` — POs issued to suppliers
   - id (uuid PK), po_number, supplier_id (FK), status, total, currency, order_date, expected_delivery, created_at
6. `po_items` — Line items on purchase orders
   - id (uuid PK), po_id (FK), description, quantity, unit, unit_price, total, created_at

### Supplier Portal
7. `supplier_profiles` — Extended supplier portal data
   - id (uuid PK), supplier_id (FK), portal_status, onboarding_step, documents_submitted, last_login, created_at
8. `supplier_quotes` — Quotes submitted by suppliers via portal
   - id (uuid PK), supplier_id (FK), po_id (FK), quote_number, total, currency, status, valid_until, created_at

### AI Platform
9. `ai_models` — Registered AI model configurations
   - id (uuid PK), name, provider, model_type, status, endpoint, api_key_ref, created_at
10. `ai_tasks` — AI processing tasks/jobs
    - id (uuid PK), model_id (FK), task_type, status, input_summary, output_summary, created_at, completed_at

## Security
- RLS enabled on ALL tables.
- All policies use `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)` — single-tenant, no auth.
*/

-- ============ CRM MODULE ============

CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text DEFAULT 'Other',
  website text,
  email text,
  phone text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'prospect')),
  employees int DEFAULT 0,
  revenue numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_companies" ON companies;
CREATE POLICY "anon_select_companies" ON companies FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_companies" ON companies;
CREATE POLICY "anon_insert_companies" ON companies FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_companies" ON companies;
CREATE POLICY "anon_update_companies" ON companies FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_companies" ON companies;
CREATE POLICY "anon_delete_companies" ON companies FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  title text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_contacts" ON contacts;
CREATE POLICY "anon_select_contacts" ON contacts FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_contacts" ON contacts;
CREATE POLICY "anon_insert_contacts" ON contacts FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_contacts" ON contacts;
CREATE POLICY "anon_update_contacts" ON contacts FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_contacts" ON contacts;
CREATE POLICY "anon_delete_contacts" ON contacts FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE SET NULL,
  contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  title text NOT NULL,
  value numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  stage text NOT NULL DEFAULT 'lead' CHECK (stage IN ('lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost')),
  probability int NOT NULL DEFAULT 10 CHECK (probability >= 0 AND probability <= 100),
  expected_close date,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_deals" ON deals;
CREATE POLICY "anon_select_deals" ON deals FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_deals" ON deals;
CREATE POLICY "anon_insert_deals" ON deals FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_deals" ON deals;
CREATE POLICY "anon_update_deals" ON deals FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_deals" ON deals;
CREATE POLICY "anon_delete_deals" ON deals FOR DELETE TO anon, authenticated USING (true);

-- ============ PROCUREMENT MODULE ============

CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text DEFAULT 'General',
  email text,
  phone text,
  website text,
  rating int DEFAULT 3 CHECK (rating >= 1 AND rating <= 5),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  payment_terms text DEFAULT 'Net 30',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_suppliers" ON suppliers;
CREATE POLICY "anon_select_suppliers" ON suppliers FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_suppliers" ON suppliers;
CREATE POLICY "anon_insert_suppliers" ON suppliers FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_suppliers" ON suppliers;
CREATE POLICY "anon_update_suppliers" ON suppliers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_suppliers" ON suppliers;
CREATE POLICY "anon_delete_suppliers" ON suppliers FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number text NOT NULL UNIQUE,
  supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'shipped', 'received', 'cancelled')),
  total numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  order_date date NOT NULL DEFAULT CURRENT_DATE,
  expected_delivery date,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_purchase_orders" ON purchase_orders;
CREATE POLICY "anon_select_purchase_orders" ON purchase_orders FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_purchase_orders" ON purchase_orders;
CREATE POLICY "anon_insert_purchase_orders" ON purchase_orders FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_purchase_orders" ON purchase_orders;
CREATE POLICY "anon_update_purchase_orders" ON purchase_orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_purchase_orders" ON purchase_orders;
CREATE POLICY "anon_delete_purchase_orders" ON purchase_orders FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS po_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_id uuid REFERENCES purchase_orders(id) ON DELETE CASCADE,
  description text NOT NULL,
  quantity numeric NOT NULL DEFAULT 1,
  unit text DEFAULT 'pcs',
  unit_price numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE po_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_po_items" ON po_items;
CREATE POLICY "anon_select_po_items" ON po_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_po_items" ON po_items;
CREATE POLICY "anon_insert_po_items" ON po_items FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_po_items" ON po_items;
CREATE POLICY "anon_update_po_items" ON po_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_po_items" ON po_items;
CREATE POLICY "anon_delete_po_items" ON po_items FOR DELETE TO anon, authenticated USING (true);

-- ============ SUPPLIER PORTAL ============

CREATE TABLE IF NOT EXISTS supplier_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES suppliers(id) ON DELETE CASCADE,
  portal_status text NOT NULL DEFAULT 'pending' CHECK (portal_status IN ('pending', 'onboarding', 'active', 'suspended')),
  onboarding_step int NOT NULL DEFAULT 1,
  documents_submitted boolean NOT NULL DEFAULT false,
  last_login timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE supplier_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_supplier_profiles" ON supplier_profiles;
CREATE POLICY "anon_select_supplier_profiles" ON supplier_profiles FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_supplier_profiles" ON supplier_profiles;
CREATE POLICY "anon_insert_supplier_profiles" ON supplier_profiles FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_supplier_profiles" ON supplier_profiles;
CREATE POLICY "anon_update_supplier_profiles" ON supplier_profiles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_supplier_profiles" ON supplier_profiles;
CREATE POLICY "anon_delete_supplier_profiles" ON supplier_profiles FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS supplier_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES suppliers(id) ON DELETE CASCADE,
  po_id uuid REFERENCES purchase_orders(id) ON DELETE SET NULL,
  quote_number text NOT NULL,
  total numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'accepted', 'rejected')),
  valid_until date,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE supplier_quotes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_supplier_quotes" ON supplier_quotes;
CREATE POLICY "anon_select_supplier_quotes" ON supplier_quotes FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_supplier_quotes" ON supplier_quotes;
CREATE POLICY "anon_insert_supplier_quotes" ON supplier_quotes FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_supplier_quotes" ON supplier_quotes;
CREATE POLICY "anon_update_supplier_quotes" ON supplier_quotes FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_supplier_quotes" ON supplier_quotes;
CREATE POLICY "anon_delete_supplier_quotes" ON supplier_quotes FOR DELETE TO anon, authenticated USING (true);

-- ============ AI PLATFORM ============

CREATE TABLE IF NOT EXISTS ai_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  provider text NOT NULL DEFAULT 'openai',
  model_type text NOT NULL DEFAULT 'llm',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'training')),
  endpoint text,
  api_key_ref text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_ai_models" ON ai_models;
CREATE POLICY "anon_select_ai_models" ON ai_models FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_ai_models" ON ai_models;
CREATE POLICY "anon_insert_ai_models" ON ai_models FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_ai_models" ON ai_models;
CREATE POLICY "anon_update_ai_models" ON ai_models FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_ai_models" ON ai_models;
CREATE POLICY "anon_delete_ai_models" ON ai_models FOR DELETE TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS ai_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid REFERENCES ai_models(id) ON DELETE SET NULL,
  task_type text NOT NULL DEFAULT 'analysis',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  input_summary text,
  output_summary text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);
ALTER TABLE ai_tasks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_ai_tasks" ON ai_tasks;
CREATE POLICY "anon_select_ai_tasks" ON ai_tasks FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_ai_tasks" ON ai_tasks;
CREATE POLICY "anon_insert_ai_tasks" ON ai_tasks FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_ai_tasks" ON ai_tasks;
CREATE POLICY "anon_update_ai_tasks" ON ai_tasks FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_ai_tasks" ON ai_tasks;
CREATE POLICY "anon_delete_ai_tasks" ON ai_tasks FOR DELETE TO anon, authenticated USING (true);

-- ============ INDEXES ============
CREATE INDEX IF NOT EXISTS idx_companies_status ON companies(status);
CREATE INDEX IF NOT EXISTS idx_contacts_company_id ON contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);
CREATE INDEX IF NOT EXISTS idx_deals_company_id ON deals(company_id);
CREATE INDEX IF NOT EXISTS idx_suppliers_status ON suppliers(status);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_supplier_id ON purchase_orders(supplier_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_status ON purchase_orders(status);
CREATE INDEX IF NOT EXISTS idx_po_items_po_id ON po_items(po_id);
CREATE INDEX IF NOT EXISTS idx_supplier_profiles_supplier_id ON supplier_profiles(supplier_id);
CREATE INDEX IF NOT EXISTS idx_supplier_quotes_supplier_id ON supplier_quotes(supplier_id);
CREATE INDEX IF NOT EXISTS idx_ai_tasks_status ON ai_tasks(status);
CREATE INDEX IF NOT EXISTS idx_ai_tasks_model_id ON ai_tasks(model_id);
