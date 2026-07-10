import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

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

export type Supplier = {
  id: string;
  name: string;
  category: string;
  email: string | null;
  phone: string | null;
  website: string | null;
  rating: number;
  status: "active" | "inactive" | "pending";
  payment_terms: string;
  created_at: string;
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
