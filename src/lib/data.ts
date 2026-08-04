import { supabase, isSupabaseConfigured, type Supplier, type SupplierRelationshipEvent } from "./supabase";
import {
  mockAiModels,
  mockAiTasks,
  mockCompanies,
  mockContacts,
  mockCustomerInquiries,
  mockDeals,
  mockPoItems,
  mockPurchaseOrders,
  mockSupplierProfiles,
  mockSupplierQuotes,
  mockSupplierRelationshipEvents,
  mockSuppliers,
} from "./mockData";

// Backend-optional data access. No ERP/DB integration yet (per IMPLEMENTATION-GATE.md) —
// every getter falls back to mock data when Supabase isn't configured or the query fails.

export async function getCompanies() {
  if (!isSupabaseConfigured) return mockCompanies;
  const { data, error } = await supabase.from("companies").select("*").order("created_at", { ascending: false });
  return error || !data ? mockCompanies : data;
}

export async function getDeals() {
  if (!isSupabaseConfigured) return mockDeals;
  const { data, error } = await supabase.from("deals").select("*").order("created_at", { ascending: false });
  return error || !data ? mockDeals : data;
}

export async function getPurchaseOrders() {
  if (!isSupabaseConfigured) return mockPurchaseOrders;
  const { data, error } = await supabase.from("purchase_orders").select("*").order("created_at", { ascending: false });
  return error || !data ? mockPurchaseOrders : data;
}

export async function getSuppliers(): Promise<Supplier[]> {
  if (!isSupabaseConfigured) return mockSuppliers;
  const { data, error } = await supabase.from("suppliers").select("*").order("name");
  return error || !data || data.length === 0 ? mockSuppliers : data;
}

export async function getSupplierById(id: string): Promise<Supplier | null> {
  const suppliers = await getSuppliers();
  return suppliers.find((s) => s.id === id) ?? null;
}

export async function getSupplierRelationshipHistory(supplierId: string): Promise<SupplierRelationshipEvent[]> {
  // No relationship-history table yet — UI-only mock until the entity is implemented.
  return mockSupplierRelationshipEvents[supplierId] ?? [];
}

export async function getAiTasks(limit = 5) {
  if (!isSupabaseConfigured) return mockAiTasks.slice(0, limit);
  const { data, error } = await supabase
    .from("ai_tasks")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return error || !data ? mockAiTasks.slice(0, limit) : data;
}

export async function getContacts() {
  if (!isSupabaseConfigured) return mockContacts;
  const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
  return error || !data ? mockContacts : data;
}

export async function getPoItems(poId: string) {
  if (!isSupabaseConfigured) return mockPoItems[poId] ?? [];
  const { data, error } = await supabase.from("po_items").select("*").eq("po_id", poId);
  return error || !data ? mockPoItems[poId] ?? [] : data;
}

export async function getSupplierProfiles() {
  if (!isSupabaseConfigured) return mockSupplierProfiles;
  const { data, error } = await supabase.from("supplier_profiles").select("*").order("created_at", { ascending: false });
  return error || !data ? mockSupplierProfiles : data;
}

export async function getSupplierQuotes() {
  if (!isSupabaseConfigured) return mockSupplierQuotes;
  const { data, error } = await supabase.from("supplier_quotes").select("*").order("created_at", { ascending: false });
  return error || !data ? mockSupplierQuotes : data;
}

export async function getAiModels() {
  if (!isSupabaseConfigured) return mockAiModels;
  const { data, error } = await supabase.from("ai_models").select("*").order("created_at", { ascending: false });
  return error || !data ? mockAiModels : data;
}

export async function getCustomerInquiries() {
  if (!isSupabaseConfigured) return mockCustomerInquiries;
  const { data, error } = await supabase.from("customer_inquiries").select("*").order("created_at", { ascending: false });
  return error || !data ? mockCustomerInquiries : data;
}
