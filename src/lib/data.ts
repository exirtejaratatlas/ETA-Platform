import {
  supabase,
  isSupabaseConfigured,
  type Product,
  type Rfq,
  type RfqLine,
  type RfqSupplierResponse,
  type Supplier,
  type SupplierRelationshipEvent,
} from "./supabase";
import {
  mockAiModels,
  mockAiTasks,
  mockCompanies,
  mockContacts,
  mockCustomerInquiries,
  mockDeals,
  mockPoItems,
  mockProducts,
  mockRfqLines,
  mockRfqResponses,
  mockRfqs,
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

// ---------------------------------------------------------------------------
// Product master data — ETA-Blueprint ETA-ENT-PRODUCT-001/002 (Approved).
// Same backend-optional pattern as everything above: the `products` table is
// defined in supabase/migrations/ but not confirmed applied to any environment,
// so these fall back to mock data.
// ---------------------------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return mockProducts;
  const { data, error } = await supabase.from("products").select("*").order("product_code");
  return error || !data || data.length === 0 ? mockProducts : data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) ?? null;
}

// ---------------------------------------------------------------------------
// RFQ — ETA-Blueprint ETA-ENT-RFQ-001/002 (Approved).
// ---------------------------------------------------------------------------

export async function getRfqs(): Promise<Rfq[]> {
  if (!isSupabaseConfigured) return mockRfqs;
  const { data, error } = await supabase.from("rfqs").select("*").order("rfq_date", { ascending: false });
  return error || !data || data.length === 0 ? mockRfqs : data;
}

export async function getRfqById(id: string): Promise<Rfq | null> {
  const rfqs = await getRfqs();
  return rfqs.find((r) => r.id === id) ?? null;
}

export async function getRfqLines(rfqId: string): Promise<RfqLine[]> {
  if (!isSupabaseConfigured) return mockRfqLines[rfqId] ?? [];
  const { data, error } = await supabase.from("rfq_lines").select("*").eq("rfq_id", rfqId).order("line_number");
  return error || !data || data.length === 0 ? mockRfqLines[rfqId] ?? [] : data;
}

export async function getRfqResponses(rfqId: string): Promise<RfqSupplierResponse[]> {
  if (!isSupabaseConfigured) return mockRfqResponses[rfqId] ?? [];
  const { data, error } = await supabase.from("rfq_supplier_responses").select("*").eq("rfq_id", rfqId);
  return error || !data || data.length === 0 ? mockRfqResponses[rfqId] ?? [] : data;
}

// ---------------------------------------------------------------------------
// Cross-module lookups — wire the approved workflow chain end to end:
//   Customer Inquiry -> RFQ -> Award -> Purchase Order
// (ETA-Blueprint ETA-ENT-RFQ-005 stages 1-12; Inquiry sits upstream of RFQ per
// docs/delivery/CONTENT-SOURCE-MAP.md.)
// ---------------------------------------------------------------------------

/** RFQ raised from a customer inquiry, matched on `internal_reference`. */
export async function getRfqByInquiryNumber(inquiryNumber: string): Promise<Rfq | null> {
  const rfqs = await getRfqs();
  return rfqs.find((r) => r.internal_reference === inquiryNumber) ?? null;
}

/** Purchase orders raised from an RFQ award (ETA-ENT-RFQ-005 stage 12). */
export async function getPurchaseOrdersByRfq(rfqId: string) {
  const pos = await getPurchaseOrders();
  return pos.filter((p) => p.rfq_id === rfqId);
}

/** Every RFQ a supplier was invited to, responded to, or won. */
export async function getRfqsBySupplier(supplierId: string): Promise<Rfq[]> {
  const rfqs = await getRfqs();
  const matched: Rfq[] = [];
  for (const rfq of rfqs) {
    if (rfq.invited_supplier_ids.includes(supplierId) || rfq.winning_supplier_id === supplierId) {
      matched.push(rfq);
      continue;
    }
    const responses = await getRfqResponses(rfq.id);
    if (responses.some((r) => r.supplier_id === supplierId)) matched.push(rfq);
  }
  return matched;
}

/** Products for which a supplier is primary or alternate source. */
export async function getProductsBySupplier(supplierId: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(
    (p) => p.supplier_id === supplierId || p.alternate_supplier_ids.includes(supplierId)
  );
}
