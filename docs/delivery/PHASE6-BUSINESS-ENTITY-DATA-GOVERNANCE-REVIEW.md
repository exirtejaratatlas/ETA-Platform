---
title: Phase 6 — Business Entity & Data Governance Review
document_id: ETA-PHASE6-ENTITY-001
status: Review — read-only audit; not a Blueprint decision and not an implementation plan
date: 2026-08-11
authority: >
  ETA-Blueprint/04-DATA/Entities/ (12 Approved entity document sets),
  ETA-Blueprint/04-DATA/Enterprise-Data-Model.md, ETA-Blueprint/04-DATA/ER-Diagram.md,
  ETA-Blueprint/04-DATA/Reference-Data.md, ETA-Blueprint/02-BLUEPRINT/Domains/,
  ETA-Blueprint/13-DECISIONS/ (D5, D6 — Approved),
  ETA-Platform/docs/delivery/PHASE6-CURRENT-STATE-AUDIT.md,
  ETA-Platform/docs/delivery/PHASE6-PLATFORM-EXECUTION-STRATEGY.md
scope: >
  Read-only audit of the relationship between Blueprint business entities, ETA-Platform code
  entities, TypeScript types, mock data models, and Supabase migration tables. No code, schema,
  migration, API, or UI was created or modified. Contains no recommendations and no
  implementation plan — findings and unresolved decisions only.
verification: >
  Every claim below was verified against live repository state on 2026-08-11: Blueprint entity
  document frontmatter (status fields), src/lib/supabase.ts (TypeScript types), src/lib/mockData.ts
  (mock models), src/lib/data.ts (access layer), supabase/migrations/20260710212509_create_eta_
  platform_schema.sql (tables), and grep across src/ for entity references.
---

# Phase 6 — Business Entity & Data Governance Review

## 0. Purpose and Method

Step 3 of the approved Phase 6 preparation workflow. This document audits the relationship between five layers for every entity ETA's future workflows depend on:

1. **Blueprint Business Entities** — `ETA-Blueprint/04-DATA/Entities/` and the domain/data-model documents
2. **ETA-Platform code entities** — what actually exists in `src/`
3. **TypeScript types** — `src/lib/supabase.ts`
4. **Mock data models** — `src/lib/mockData.ts`
5. **Supabase migration tables** — `supabase/migrations/20260710212509_create_eta_platform_schema.sql`

Per D5/D6 and the Phase 6 governance sequence, this is a **read-only audit**. No schema, API, or UI was created. No recommendations are offered — where a question is unresolved it is recorded in §Open Decisions and nowhere else.

### 0.1 Blueprint Entity Inventory (verified)

Twelve entity document sets exist under `04-DATA/Entities/`, **all with `status: Approved`**:

| Entity folder | Document ID | Status |
|---|---|---|
| Contract | ETA-ENT-CON-001 | Approved |
| Customer | ETA-ENT-CUSTOMER-001 | Approved |
| Inventory | ETA-ENT-INV-001 | Approved |
| Invoice | ETA-ENT-INVC-001 | Approved |
| Manufacturer | ETA-ENT-MANUFACTURER-001 | Approved |
| Payment | ETA-ENT-PAY-001 | Approved |
| Product | ETA-ENT-PRODUCT-001 | Approved |
| PurchaseOrder | (Purchase Order Entity.md) | Approved |
| Quotation | ETA-ENT-QTN-001 | Approved |
| RFQ | ETA-ENT-RFQ-001 | Approved |
| Shipment | ETA-ENT-SHP-001 | Approved |
| Supplier | ETA-ENT-SUPPLIER-001 | Approved |

**No entity folder exists for:** Company, Contact, Opportunity, Tender, Equipment, Purchase Request, Lead. Some of these are named at *domain* level (see §0.2) without an entity document; others do not appear as entities at all.

### 0.2 Domain-Level Entity Naming (verified from `Enterprise-Data-Model.md`)

- **CRM Domain entities:** Lead, Customer, Contact, **Opportunity**, Activity, Meeting, Note
- **Procurement Domain entities:** RFQ, Supplier, Manufacturer, Vendor Qualification, Quotation, Purchase Order, Contract, **Purchase Request**, Supplier Evaluation
- **Product Domain entities:** Product, Product Category, Material, Brand, Technical Datasheet, Certificate, Product Revision

"Company" and "Tender" appear in **neither** domain entity list. "Equipment" appears in neither.

### 0.3 Supabase Table Inventory (verified, 10 tables)

`companies`, `contacts`, `deals`, `suppliers`, `purchase_orders`, `po_items`, `supplier_profiles`, `supplier_quotes`, `ai_models`, `ai_tasks`.

**No table exists for:** Customer, Manufacturer, Product, Equipment, Tender, RFQ, Purchase Request, Opportunity, customer_inquiries, or supplier relationship history.

---

# Commercial Entities

## Company

### Blueprint Status
- **Missing as an entity.** No `04-DATA/Entities/Company/` folder exists. "Company" does not appear in the CRM Domain, Procurement Domain, or Product Domain entity lists in `Enterprise-Data-Model.md`.
- The Blueprint's equivalent commercial-identity concept is **Customer** (ETA-ENT-CUSTOMER-001, Approved), which explicitly states: *"Every customer has one enterprise profile regardless of how many projects or contracts exist."*
- "Company" appears in the Supplier attribute set only as a field (`company_name`, `company_size`, `parent_company`, `company`), not as a standalone entity.

### Code Status
- Fully implemented as the primary CRM organization record.
- Files: `src/lib/supabase.ts` (`Company` type), `src/lib/mockData.ts` (`mockCompanies`), `src/lib/data.ts` (`getCompanies()`), `src/pages/crm/Companies.tsx`, referenced by `Contacts.tsx`, `Deals.tsx`, `Inquiries.tsx`.

### Data Status
- **TypeScript model:** `Company` — `id`, `name`, `industry`, `website`, `email`, `phone`, `status` (`active`/`inactive`/`prospect`), `employees`, `revenue`, `created_at`, `updated_at`.
- **Mock data:** `mockCompanies` — 3+ records (Simorgh Holding, Cyrus Industrial Group, Alborz Rolling Partners).
- **Supabase table:** `companies` exists in the migration, with matching columns, RLS enabled, `idx_companies_status` index. Not confirmed applied to a live project.

### Business Role
Serves today as the organization record CRM contacts, deals, and inquiries attach to. It is the *de facto* customer record in the running application.

### AI Relevance
Would be the anchor for customer-side AI (opportunity prediction, customer insights, revenue forecasting — all named in `CRM Domain.md`), if and only if its relationship to the approved Customer entity is settled.

### Gaps
- **Entity-identity gap:** `Company` is a platform-invented entity with no Blueprint authority. Per `CLAUDE.md`'s standing rule "Never invent entities," this is the most significant naming divergence found in this audit.
- Missing every Customer-entity attribute category (commercial information, credit/financial, compliance, AI metadata, audit metadata).
- No defined relationship to Supplier — an organization that is both customer and supplier has no modeled representation.
- No `customer_code`/business-key equivalent; no `country`, `registration_number`, or `tax_number`.

---

## Contact

### Blueprint Status
- **Named at domain level, no entity document.** "Contact" appears in the CRM Domain entity list in `Enterprise-Data-Model.md`, but no `04-DATA/Entities/Contact/` folder exists.
- Contact-type fields are defined *inside* other Approved entities: Supplier Attributes defines `primary_contact`, `procurement_contact`, `technical_contact`, `finance_contact`; Customer Relationships names Contact as a related entity.

### Code Status
- Fully implemented. Files: `src/lib/supabase.ts` (`Contact` type), `src/lib/mockData.ts` (`mockContacts`), `src/lib/data.ts` (`getContacts()`), `src/pages/crm/Contacts.tsx`.

### Data Status
- **TypeScript model:** `Contact` — `id`, `company_id` (FK), `first_name`, `last_name`, `email`, `phone`, `title`, `status`, `created_at`.
- **Mock data:** `mockContacts` present.
- **Supabase table:** `contacts` exists, FK to `companies(id) ON DELETE CASCADE`, RLS enabled, `idx_contacts_company_id`.

### Business Role
Person-level record for customer and prospect organizations; the human counterpart to the organization record.

### AI Relevance
Relationship-graph node for communication history and stakeholder mapping; `Knowledge-Graph.md` and `AI-Memory-Model.md` both assume person-level nodes.

### Gaps
- No Blueprint entity document to validate the attribute set against.
- Contact attaches only to `companies` — cannot attach to a Supplier or Manufacturer, though Supplier Attributes defines four distinct supplier-side contact roles.
- No contact-role enumeration (procurement / technical / finance / commercial), which the Supplier entity requires.
- No language/preferred-channel fields despite Persian/English operating reality.

---

## Customer

### Blueprint Status
- **Approved.** `ETA-ENT-CUSTOMER-001` (Customer Entity), plus Customer Attributes, Customer Lifecycle, Customer Relationships, Customer API, Customer Odoo Mapping.
- Defined as Master Data, business owner CRM Department, **ERP owner: Odoo CRM**.
- Customer types enumerated: Industrial Company, EPC Contractor, Government Organization, Oil & Gas, Petrochemical, Steel Manufacturer, Mining, Cement, Power Plant, Water Company, Distributor, Trading Company.

### Code Status
- **Not implemented as an entity.** No `Customer` TypeScript type, no customer page, no customer route.
- The only customer-shaped data in code is the free-text `customer_name: string` field on `CustomerInquiry` (`src/lib/supabase.ts:184`) and the `mockCustomerInquiries` records — a string, not a relational reference.
- `src/pages/crm/Companies.tsx` occupies the role Customer would occupy.

### Data Status
- **TypeScript model:** none.
- **Mock data:** none as a distinct entity; customer identity is denormalized into `CustomerInquiry.customer_name` and partially into `mockCompanies`.
- **Supabase table:** none.

### Business Role
Per the Approved entity: the commercial identity of every buyer, shared across CRM, Sales, Procurement, Contracts, Projects, Finance, AI, Reporting, and Customer Portal. It is the intended single organizational record for the buy side.

### AI Relevance
`CRM Domain.md` names Opportunity Prediction, Customer Insights, Revenue Forecasting, and Recommendation Engine as AI capabilities that operate on this entity. `Customer Attributes.md` includes a `tender_participant` boolean — relevant to any future tender intelligence.

### Gaps
- The approved Customer entity has **no implementation of any kind**; `Company` occupies its functional slot under a different name and a much smaller attribute set.
- Customer↔Company relationship is undefined: same concept renamed, parent/child, or genuinely distinct records.
- `CustomerInquiry.company_id` is nullable and 2 of 8 mock inquiries have `company_id: null` with only a `customer_name` string — inquiries can exist with no resolvable organization.
- No customer lifecycle states implemented despite `Customer Lifecycle.md` defining them.

---

## Opportunity

### Blueprint Status
- **Named at domain and business-rule level, no entity document.** Listed in the CRM Domain entity list (`Enterprise-Data-Model.md`) and in `02-BLUEPRINT/Domains/CRM Domain.md` under Opportunity Management, the sales stage sequence (Lead → Customer → **Opportunity** → Quotation → Negotiation → Contract), and AI capabilities (Opportunity Prediction).
- `CRM Domain.md` states binding business rules: *"Every Opportunity belongs to exactly one Customer,"* *"A Lead may create one or more Opportunities,"* *"Every Quotation belongs to one Opportunity,"* *"Closed Opportunities cannot return to Active."*
- `Customer Relationships.md` records Customer → Opportunity as **1:N**.
- No `04-DATA/Entities/Opportunity/` folder exists.

### Code Status
- Implemented under the name **Deal**, not Opportunity. Files: `src/lib/supabase.ts` (`Deal` type), `src/lib/mockData.ts` (`mockDeals`), `src/lib/data.ts` (`getDeals()`), `src/pages/crm/Deals.tsx`.
- `Deals.tsx:53` describes itself as *"Sales pipeline and opportunity tracking"* — the code acknowledges the concept while using the other name.
- A second overlapping concept, `CustomerInquiry`, is annotated in `src/lib/supabase.ts:166` as *"Customer Inquiry / Opportunity — first MVP concept."*

### Data Status
- **TypeScript model:** `Deal` — `id`, `company_id`, `contact_id`, `title`, `value`, `currency`, `stage` (`lead`/`qualified`/`proposal`/`negotiation`/`won`/`lost`), `probability`, `expected_close`, `created_at`.
- **Mock data:** `mockDeals` present; `mockCustomerInquiries` (8 records) covers an overlapping lifecycle with a different 8-state enum.
- **Supabase table:** `deals` exists (FKs to `companies`, `contacts`; `idx_deals_stage`, `idx_deals_company_id`). No `opportunities` table. No `customer_inquiries` table.

### Business Role
The revenue-pipeline record linking a buyer to a potential transaction; per Blueprint, the mandatory parent of every Quotation.

### AI Relevance
Named directly in `CRM Domain.md` AI capabilities (Opportunity Prediction, Revenue Forecasting). `AI-Memory-Model.md` references "Lost tenders" as retained memory, which would attach here or to a Tender entity.

### Gaps
- **Three overlapping concepts for one business idea:** Blueprint `Opportunity`, code `Deal`, and code `CustomerInquiry` — with two different lifecycle enums (`Deal.stage` 6 states vs. `InquiryStatus` 8 states) and no defined relationship between them.
- `Deal` attaches to `company_id`, but the Blueprint rule requires every Opportunity to belong to exactly one **Customer** — an entity that does not exist in code.
- The Blueprint rule "Every Quotation belongs to one Opportunity" is unenforceable: `supplier_quotes` links to `supplier_id` and `po_id`, never to `deals`.
- "Closed Opportunities cannot return to Active" is not implemented as a constraint.
- No `Lead` entity exists in code, though `Deal.stage` includes a `lead` value and the Blueprint models Lead as a separate CRM entity.

---

## Tender

### Blueprint Status
- **Explicitly deferred.** `04-DATA/ER-Diagram.md` lists Tender under **"Future Extensions — Future entities"**, alongside Risk, Compliance, BOM, Digital Twin, IoT Device, Predictive Maintenance, Supply Chain Graph, Workflow Engine, Marketplace. This is the clearest Blueprint statement on Tender's status: acknowledged, named, and not yet an entity.
- Tender exists elsewhere only as an **attribute or reference value**, never an entity: `Reference-Data.md` lists "Tender" as a **Lead Source**; `Customer Attributes.md` defines `tender_participant` (Boolean); `Customer Lifecycle.md` names tenders as a lead-origination channel.
- Substantial *business* documentation exists without entity backing: `ETA-Procurement-Playbook-v1.md` §10 ("Two Operating Models: Domestic Steel vs. Industrial Equipment/Tenders") and §11 ("Tender-Specific Mechanics" — quotation validity across multi-month timelines, staged budgetary→critical pricing, bid bonds and tender guarantees via Parsian Bank, price-escalation exposure on government/EPC tenders). `Vision.md` names "Tender Intelligence"; `Business Model.md` names "Tender Support"; `SOP-001` and `RB-001` both list Tender as an inbound entry channel.
- No `04-DATA/Entities/Tender/` folder. Tender appears in **neither** the CRM nor the Procurement domain entity list.

### Code Status
- **Zero implementation.** A case-insensitive grep for "tender" across all of `src/` returns **0 files**. No type, no route, no page, no mock data, no table, no UI reference.

### Data Status
- **TypeScript model:** none.
- **Mock data:** none.
- **Supabase table:** none.

### Business Role
Per the Procurement Playbook, tender-based supply is one of ETA's two operating models — the higher-complexity, higher-margin, longer-cycle side of the business, carrying bid-bond and price-escalation risk that domestic steel trading does not.

### AI Relevance
"Tender Analysis" is one of the three AI capability areas explicitly permitted for Google AI Studio **exploration only** under **D6.3**. `Vision.md`'s "Tender Intelligence" and `AI-Memory-Model.md`'s "Lost tenders" / "Tender process" references indicate intended AI relevance.

### Gaps
- The gap between business reality (extensively documented in the Playbook) and data model (explicitly a future extension) is the widest of any entity in this review.
- No entity, attributes, lifecycle, or relationships defined — nothing exists to design or build against.
- Its relationship to RFQ, Opportunity, and Customer is undefined: whether a Tender is a type of Opportunity, a parent of multiple RFQs, or an independent entity is unrecorded.
- Tender-specific concepts with no modeled home: bid bond / guarantee tracking, submission deadline, quotation validity windows, price-escalation clause status, award/loss outcome.
- **D6.3 boundary note:** AI Studio exploration of "Tender document analysis" is permitted, but any resulting implementation is blocked twice over — once by D6.3's BR→FR→API→UI→CMP→TEST gate, and again by Tender having no approved entity to trace a Business Requirement to.

---

## RFQ

### Blueprint Status
- **Approved.** `ETA-ENT-RFQ-001` (RFQ Entity), plus RFQ Attributes, RFQ API, RFQ Odoo Mapping, README.
- Defined as *"the formal procurement request issued by ETA to one or more suppliers"* and *"the primary transaction that initiates the enterprise sourcing process."*
- Manages: Customer Requirements, Product Requirements, Technical Specifications, Supplier Invitations, Manufacturer References, Engineering Documents, Commercial Conditions, Procurement Workflow, Approval Process, AI Recommendations.
- Supported by operational documentation: `RB-001 Handling an Inbound RFQ.md`, `KPI-001 RFQ and Sales KPIs.md`.

### Code Status
- **Not implemented.** No `RFQ` type, table, route, or page.
- The nearest implemented concept is `CustomerInquiry`, annotated in `src/lib/supabase.ts:167-168` as sitting *"upstream of ETA-Blueprint's approved RFQ entity (04-DATA/Entities/RFQ)"* — an acknowledged precursor, not the RFQ itself.

### Data Status
- **TypeScript model:** none. (`CustomerInquiry` carries `product_equipment`, `technical_specification`, `quantity`, `required_delivery_date` as free text — RFQ-adjacent fields without RFQ structure.)
- **Mock data:** none for RFQ; `mockCustomerInquiries` holds 8 upstream records.
- **Supabase table:** none.

### Business Role
The pivot of ETA's entire sourcing process — converts a customer requirement into supplier-facing solicitations, and is the parent of Quotations.

### AI Relevance
The RFQ entity's own responsibilities include "AI Recommendations." Supplier Intelligence's value depends on RFQ history: `Supplier Attributes.md` defines `total_rfqs` as a commercial-performance attribute, which cannot be computed without RFQ records.

### Gaps
- Approved entity with a full document set and zero implementation.
- `supplier_quotes` exists but links to `purchase_orders`, not to any RFQ — inverting the Blueprint sequence, where quotations answer RFQs and precede POs.
- The `CustomerInquiry` → RFQ transition is undefined: whether an inquiry becomes an RFQ, spawns one or many, or is a separate record is unrecorded.
- No supplier-invitation model (which suppliers were invited, who responded, who declined).
- No technical/commercial evaluation structure, consistent with `PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §3 Phase 6.2's finding that evaluation is net-new scope.

---

## Purchase Request

### Blueprint Status
- **Named at domain level, no entity document.** Listed in the Procurement Domain entity list in `Enterprise-Data-Model.md`. Appears in `Customer Relationships.md` (as N-cardinality), `Domain Interactions.md`, and multiple Finance documents (`Financial Approval Matrix.md`, `Accounting Processes.md`, `Financial Policies.md`, `Audit & Internal Control.md`) — i.e. it is assumed by the approval and accounting models.
- No `04-DATA/Entities/PurchaseRequest/` folder exists (the `PurchaseOrder` folder is a distinct entity).

### Code Status
- **Zero implementation.** Grep for "PurchaseRequest" and "purchase_request" across `src/` returns **0 files**.

### Data Status
- **TypeScript model:** none.
- **Mock data:** none.
- **Supabase table:** none. (`purchase_orders` is the downstream entity, and is implemented.)

### Business Role
The internal demand/requisition record that precedes and authorizes procurement activity — the approval-gated input to the RFQ/PO chain, per the Finance documents that reference it.

### AI Relevance
Not named in any AI capability list reviewed. Would be relevant to demand-pattern analysis and approval-routing automation, neither of which is an approved AI scope item.

### Gaps
- Referenced by approved Finance documents (including the Financial Approval Matrix) but has no entity definition of its own.
- Its relationship to RFQ and Purchase Order is undefined — whether PR → RFQ → PO is the mandatory chain, or PR → PO directly for known-source purchases, is unrecorded.
- No approval-threshold or authorization model in code, despite `Financial Approval Matrix.md` existing.
- Whether ETA-Platform or Odoo owns the Purchase Request record is undetermined (see §Odoo Boundary).

---

# Supply Chain Entities

## Supplier

### Blueprint Status
- **Approved.** `ETA-ENT-SUPPLIER-001` (Supplier Entity) + `ETA-ENT-SUPPLIER-002` (Supplier Attributes) + Supplier API, Supplier Odoo Mapping, README.
- The most thoroughly specified entity in the Blueprint: **~116 enterprise attributes** across 12 categories — Company Information (20), Contact Information (9), Commercial Information (10), Financial Information (10), Banking Information (9), Commercial Performance (10), Compliance Information (8), Certifications (10), Procurement Capabilities (10), AI Metadata (8), Enterprise Search (5), Audit Metadata (11), Integration Metadata (6).
- Approved enumerations: 8 supplier categories (Manufacturer, Distributor, Trading Company, Service Provider, Logistics Provider, OEM, EPC Contractor, Consultant); 7 lifecycle states (Draft, Under Review, Approved, Active, Suspended, Inactive, Archived).
- Stated long-term vision: *"the enterprise supplier intelligence hub."*

### Code Status
- The most developed module in the platform. Files: `src/lib/supabase.ts` (`Supplier`, `SupplierCategory`, `SupplierLifecycleStatus`, `SupplierClassification`, `SupplierRelationshipEvent`, `SupplierProfile`, `SupplierQuote` types), `src/lib/mockData.ts` (`mockSuppliers`, `mockSupplierRelationshipEvents`, `mockSupplierProfiles`, `mockSupplierQuotes`), `src/lib/data.ts` (`getSuppliers()`, `getSupplierById()`, `getSupplierRelationshipHistory()`, `getSupplierProfiles()`, `getSupplierQuotes()`), `src/pages/suppliers/SupplierList.tsx`, `SupplierDetail.tsx`, `src/pages/SupplierPortal.tsx`.

### Data Status
- **TypeScript model:** `Supplier` — 17 fields: `id`, `supplier_code`, `name`, `category`, `email`, `phone`, `website`, `country`, `rating`, `status`, `payment_terms`, `created_at`, plus 5 MOD-1 intelligence fields explicitly annotated *"Supplier Intelligence (MOD-1) — ETA-Blueprint ENT-SUPPLIER-001"*: `lifecycle_status`, `classification`, `certifications[]`, `compliance_status`, `risk_level`.
- **Mock data:** `mockSuppliers` — records carry all 17 fields including the MOD-1 five.
- **Supabase table:** `suppliers` — **10 columns only**: `id`, `name`, `category`, `email`, `phone`, `website`, `rating`, `status`, `payment_terms`, `created_at`.

### Business Role
Foundation of all procurement operations; per the Blueprint, one of the core master data entities and the intended supplier intelligence hub.

### AI Relevance
The Supplier Entity names AI usage directly: Supplier Ranking, Vendor Recommendation, Risk Assessment, Procurement Optimization, Lead Time Prediction, Price Analysis, Supplier Scoring. Supplier Attributes defines a dedicated **AI Metadata** block: `ai_summary`, `ai_risk_score`, `ai_supplier_score`, `ai_recommendation`, `ai_classification`, `ai_confidence`, `embedding_id`, `knowledge_graph_node`. Supplier Intelligence is the sole approved AI module candidate under D6.3.

### Gaps — MOD-1 three-layer comparison (special attention item 1)

**Layer drift is the headline finding of this review.** Comparing Blueprint attributes → TypeScript type → Supabase table:

| Field | Blueprint (~116 attrs) | TypeScript `Supplier` | Supabase `suppliers` |
|---|---|---|---|
| `supplier_code` | Defined (business key) | Present | **Missing** |
| `country` | Defined (Reference) | Present | **Missing** |
| `lifecycle_status` | Defined (7 states) | Present | **Missing** |
| `classification` | Implied (preferred/strategic flags) | Present (4 values) | **Missing** |
| `certifications` | 10 explicit boolean fields | Present (string array) | **Missing** |
| `compliance_status` | Defined (Enum) | Present | **Missing** |
| `risk_level` | Defined (+ `ai_risk_score`) | Present | **Missing** |
| `name`, `category`, `email`, `phone`, `website`, `rating`, `status`, `payment_terms` | Defined | Present | Present |
| ~99 further attributes (financial, banking, performance, capabilities, AI metadata, audit, integration) | Defined | **Absent** | **Absent** |

- **7 of 17 TypeScript fields have no column in the migration.** If Supabase were configured today, `getSuppliers()` would return records missing `supplier_code`, `country`, and all five MOD-1 intelligence fields — the exact fields the Supplier Intelligence module is built to display. The mock fallback currently masks this.
- The `suppliers.category` column is free `text DEFAULT 'General'` with no CHECK constraint, while TypeScript enumerates 8 approved categories — the DB cannot enforce the approved enumeration.
- `suppliers.status` CHECK allows only `active`/`inactive`/`pending`, which is **not** the approved 7-state lifecycle; the platform carries lifecycle separately in a column that does not exist.
- **Required AI intelligence fields entirely absent from both code and DB:** the whole AI Metadata block (`ai_summary`, `ai_risk_score`, `ai_supplier_score`, `ai_recommendation`, `ai_classification`, `ai_confidence`, `embedding_id`, `knowledge_graph_node`), plus the Commercial Performance block (`total_rfqs`, `total_quotations`, `total_purchase_orders`, `on_time_delivery_rate`, `quality_score`, `overall_supplier_score`) that any scoring capability would consume.
- **Supplier relationship history has no table at all** — `getSupplierRelationshipHistory()` is hard-coded to mock, per its own code comment.
- Banking, financial, and compliance-review attribute categories (28 attributes combined) are absent from both layers despite being Approved.

---

## Manufacturer (special attention item 2)

### Blueprint Status
- **Approved as an independent master data entity.** `ETA-ENT-MANUFACTURER-001` (Manufacturer Entity), plus Manufacturer Attributes, Manufacturer API, Manufacturer Odoo Mapping, README.
- Explicitly stated: *"Manufacturers are independent enterprise master data entities responsible for designing and producing products that are supplied either directly to ETA or indirectly through suppliers and distributors."*
- Own identifier scheme: `MFG-000078`. Business owner Procurement, **technical owner Engineering** (distinct from Supplier, whose technical owner is Enterprise Architecture).
- Manages: Manufacturer Master Data, Production Facilities, Engineering Capabilities, Product Portfolio, Certifications, Manufacturing Standards, Lead Times, OEM Documentation, AI Metadata.
- Also listed in the Procurement Domain entity list in `Enterprise-Data-Model.md`.

### Code Status
- **Not implemented as an entity.** Manufacturer exists in code in exactly two forms:
  1. **A string literal in an enum** — `SupplierCategory` includes `"Manufacturer"` (`src/lib/supabase.ts:60`); `mockData.ts:29` and `:86` set `category: "Manufacturer"`; `SupplierList.tsx:14` uses it as a filter value.
  2. **Website marketing copy** — `Home.tsx:43` and `PlatformOverview.tsx:17` both advertise a **"Manufacturer Portal"** as a platform capability; `Home.tsx:157` and `PlatformOverview.tsx:33` list it among planned platform modules. `About.tsx`, `Services.tsx`, and `SupplierNetwork.tsx` reference manufacturers in prose.
- No `Manufacturer` type, no route, no page, no mock dataset, no table.

### Data Status
- **TypeScript model:** none (only a union-member string).
- **Mock data:** none as an entity; two supplier records are *categorized* as manufacturers.
- **Supabase table:** none.

### Business Role
Per the Approved entity: the OEM/factory record that carries engineering capability, product portfolio, manufacturing standards, and OEM documentation — the technical counterpart to Supplier's commercial record. ETA's own website states the company is *"a sourcing house, not a manufacturer"* whose value is *"knowing which mill or maker to"* approach — making manufacturer knowledge a stated core asset.

### AI Relevance
The Manufacturer entity names "AI-assisted manufacturer recommendations" among its business objectives. `Supplier Attributes.md` defines `supported_brands` and `manufacturer_authorization` — supplier-to-manufacturer links that cannot be modeled without a Manufacturer entity.

### Gaps
- **Approved independent master-data entity collapsed into a Supplier category string.** A distributor supplying Siemens equipment cannot be linked to Siemens; the manufacturer is unrepresentable except as a category label on the supplier itself.
- **Website-to-platform promise gap:** "Manufacturer Portal" is advertised on two public pages with zero underlying entity, table, or route. (Note: this sits inside D4's future-vision framing for platform capability, so it is recorded here as an entity gap, not as a D4 compliance finding.)
- Supplier↔Manufacturer relationship (authorized distributor, agent, direct OEM) is undefined and unmodeled.
- Product↔Manufacturer relationship undefined, though `Product Entity.md` names "Manufacturer Information" and "manufacturer traceability" among its responsibilities.
- `Supplier Attributes.md`'s `manufacturer_authorization` (Boolean) and `supported_brands` (Array) exist in the Blueprint with no code counterpart.
- Engineering-owned attributes (production facilities, manufacturing standards, engineering capabilities, OEM documentation) have no home in the current data model.

---

## Product

### Blueprint Status
- **Approved.** `ETA-ENT-PRODUCT-001` (Product Entity), plus Product Attributes, Product API, Product Odoo Mapping, README.
- Defined as *"every physical item, engineered equipment, spare part, material, service, software product, and procurement item"* and as *"the central business entity connecting customers, suppliers, manufacturers, procurement, contracts, inventory, logistics, finance, projects, and AI."*
- Manages: Product Master Data, Engineering Specifications, Technical Documents, Product Classification, Manufacturer Information, Supplier Information.
- Product Domain (`Enterprise-Data-Model.md`) additionally names: Product Category, Material, Brand, Technical Datasheet, Certificate, Product Revision.

### Code Status
- **Not implemented.** No `Product` type, table, route, or page.
- Product-shaped data exists only as free text: `PoItem.description` (`src/lib/supabase.ts:125`) and `CustomerInquiry.product_equipment` + `technical_specification` (`:186-187`).
- Website product content (`Services.tsx`, `SteelTrading.tsx`, `EquipmentSupply.tsx`) is static marketing copy, not catalog data.

### Data Status
- **TypeScript model:** none.
- **Mock data:** none as an entity. Product identity is denormalized into strings — e.g. `product_equipment: "Centrifugal pump"` with `technical_specification: "API 610, 150 m3/h, carbon steel casing"` (`mockData.ts:366`).
- **Supabase table:** none. `po_items.description text NOT NULL` is the only product-adjacent column.

### Business Role
The Blueprint's designated central connector entity. In ETA's actual operation (per the Procurement Playbook), the product/specification is what suppliers are matched against — making it structurally central to sourcing.

### AI Relevance
Product Entity names "support procurement automation," "enable AI-assisted sourcing," and "support technical comparison" as objectives. Specification-matching AI (the core of supplier recommendation) requires structured product data; free-text `technical_specification` cannot support it.

### Gaps
- Approved central entity with zero implementation.
- No product classification/category taxonomy, despite ETA's stated core product list (steel sheets, rotating equipment, pumps, compressors, motors, gearboxes, valves, instrumentation, electrical equipment) in both `CLAUDE.md` files.
- Technical specifications are unstructured free text — not comparable, filterable, or matchable.
- No Product↔Supplier or Product↔Manufacturer link, though `Supplier Attributes.md` defines `product_categories` (Array) and both entities claim product relationships.
- Technical Datasheet, Certificate, Material, Brand, and Product Revision (all named in the Product Domain) are entirely unmodeled.
- Connects to the document-management gap recorded in `PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §3 Phase 6.1: datasheets and certificates have no entity.

---

## Equipment

### Blueprint Status
- **Not a distinct entity — subsumed under Product.** No `04-DATA/Entities/Equipment/` folder; a search for "Equipment Entity" across the Blueprint returns **0 results**; "Equipment" does not appear in any domain entity list.
- `Product Entity.md` explicitly includes *"engineered equipment"* within the Product entity's own definition, which is the Blueprint's answer to where equipment lives.
- "Industrial Equipment" appears throughout the Blueprint as an **industry/category label** (`Reference-Data.md`, `Business Model.md`, both `CLAUDE.md` files), not an entity.

### Code Status
- Exists as **website surface and free-text field**, never as an entity. Files: `src/App.tsx` (`/equipment-supply` route), `src/pages/site/EquipmentSupply.tsx`, `SiteHeader.tsx`/`SiteFooter.tsx` (nav links), `src/lib/supabase.ts:186` (`product_equipment: string`), `mockData.ts` (equipment values inside inquiry records), `Inquiries.tsx` (displays the field).

### Data Status
- **TypeScript model:** none. The field `CustomerInquiry.product_equipment` is a `string`.
- **Mock data:** equipment appears as free-text values — "Centrifugal pump", "Control valves package", "Gearbox & motor set", "Pressure transmitters", "Heat exchanger".
- **Supabase table:** none.

### Business Role
Industrial equipment supply is one of ETA's two operating models (per Procurement Playbook §10) and a standalone public capability page (per CR-001/D2). Whether it warrants an entity separate from Product is a modeling question, not a business one.

### AI Relevance
Equipment specification matching would be a core Supplier Intelligence input; the field name `product_equipment` merging two concepts into one free-text string is the current obstacle to any structured use.

### Gaps
- The code field `product_equipment` conflates Product and Equipment in a single free-text column, with no Blueprint basis for the pairing.
- No decision recorded on whether Equipment is (a) Product with a category, (b) a Product subtype, or (c) a distinct entity — the Blueprint implies (a)/(b), the code field name implies something else.
- Equipment-specific attributes (tag number, service conditions, design standard, datasheet reference) have no home in any layer.
- The `/equipment-supply` public page exists with no corresponding platform data model — consistent with all other website capability pages, and not a defect on its own.

---

# Entity Dependency Map

Relationships **required for future ETA workflows**, as derived from Approved Blueprint documents. Status markers reflect what exists in ETA-Platform today.

```
                          ┌──────────────┐
                          │   CUSTOMER   │  Approved · NOT implemented
                          │ ETA-ENT-     │  (code uses "Company" instead)
                          │ CUSTOMER-001 │
                          └──────┬───────┘
                                 │ 1:N  (Customer Relationships.md)
                                 ▼
                          ┌──────────────┐
                          │ OPPORTUNITY  │  Domain-named · no entity doc
                          │              │  (code implements "Deal";
                          │              │   "CustomerInquiry" overlaps)
                          └──────┬───────┘
              CRM Domain rule:   │  "Every Quotation belongs to one Opportunity"
                                 ▼
                          ┌──────────────┐
              ┌───────────│     RFQ      │  Approved · NOT implemented
              │           │ ETA-ENT-     │
              │           │ RFQ-001      │
              │           └──────┬───────┘
              │                  │ invites (N:M)
              │                  ▼
     specifies│           ┌──────────────┐        supplies /
              │           │   SUPPLIER   │◄───────authorized-by
              │           │ ETA-ENT-     │        (N:M) ── UNMODELED
              │           │ SUPPLIER-001 │              │
              │           │ IMPLEMENTED  │              │
              │           │ (partial —   │              ▼
              │           │  7 fields    │       ┌──────────────┐
              │           │  missing     │       │ MANUFACTURER │  Approved ·
              │           │  from DB)    │       │ ETA-ENT-     │  NOT implemented
              │           └──────┬───────┘       │ MANUFACTURER │  (exists only as a
              │                  │               │ -001         │   Supplier category
              ▼                  │ quotes        └──────┬───────┘   string)
       ┌──────────────┐          │                      │
       │   PRODUCT    │          ▼                      │ produces (1:N)
       │ ETA-ENT-     │   ┌──────────────┐              │      UNMODELED
       │ PRODUCT-001  │   │  QUOTATION   │              │
       │ NOT          │   │  Approved ·  │◄─────────────┘
       │ implemented  │   │  code has    │
       │              │   │ SupplierQuote│
       │ (includes    │   │ (links to PO,│
       │  "engineered │   │  not to RFQ) │
       │  equipment"  │   └──────┬───────┘
       │  → EQUIPMENT │          │
       │  is NOT a    │          ▼
       │  separate    │   ┌──────────────┐      ┌──────────────────┐
       │  entity)     │   │  PURCHASE    │◄─────│ PURCHASE REQUEST │
       └──────┬───────┘   │    ORDER     │      │ Domain-named ·   │
              │           │  Approved ·  │      │ no entity doc ·  │
              └──────────►│  IMPLEMENTED │      │ NOT implemented  │
                po_items  └──────────────┘      └──────────────────┘
                          (free-text desc,
                           no Product FK)

     ┌──────────────┐
     │    TENDER    │  ER-Diagram.md: "Future Extensions — Future entities"
     │              │  0 code references · relationship to RFQ / Opportunity /
     │              │  Customer UNDEFINED · D6.3 permits AI Studio exploration only
     └──────────────┘
```

### Required relationships not currently modeled in any layer

| Relationship | Blueprint basis | Status |
|---|---|---|
| Customer → Opportunity (1:N) | `Customer Relationships.md`, `CRM Domain.md` | Neither entity implemented as named |
| Opportunity → Quotation (1:N, mandatory) | `CRM Domain.md` business rule | Quotation links to PO instead |
| RFQ → Supplier (N:M invitations) | `RFQ Entity.md` "Supplier Invitations" | No RFQ entity |
| RFQ → Quotation (1:N) | `RFQ Entity.md`, `Quotation Entity.md` | `supplier_quotes.po_id` inverts the chain |
| Supplier → Manufacturer (N:M, authorization) | `Supplier Attributes.md` `manufacturer_authorization`, `supported_brands` | Manufacturer not an entity |
| Manufacturer → Product (1:N) | `Product Entity.md` "Manufacturer Information" | Neither implemented |
| Product → RFQ / PO line (1:N) | `Product Entity.md`, `Purchase Order Attributes.md` | `po_items.description` is free text |
| Purchase Request → RFQ / PO | `Enterprise-Data-Model.md` Procurement Domain, Finance approval docs | Not implemented |
| Supplier → Relationship History (1:N) | MOD-1 scope | UI-only mock, no table |
| Tender → (any) | Undefined | Entity deferred to Future Extensions |

---

# Open Decisions

Unresolved items only. No recommendations, no sequencing, no implementation plan.

### Entity identity and naming
1. Is the code entity `Company` the same as the Approved `Customer` entity under a different name, a parent/child of it, or a genuinely distinct entity?
2. Is `Deal` the same as the Blueprint's `Opportunity`, and does `CustomerInquiry` represent a third concept, a precursor to Opportunity, or a precursor to RFQ?
3. Should `Contact` receive its own Blueprint entity document, given it is domain-named but has no entity definition and is already fully implemented?
4. Is `Equipment` (a) Product with a category value, (b) a Product subtype, or (c) a distinct entity — and does the code field `product_equipment` conflating both need to resolve to one of these?
5. Does `Lead` (named in CRM Domain, and present as a `Deal.stage` value) require a distinct entity, or is it a state of Opportunity?

### Blueprint gaps requiring Blueprint-side authoring
6. Do `Opportunity` and `Purchase Request` require full entity documents in ETA-Blueprint, given both are named in `Enterprise-Data-Model.md` domain lists and referenced by Approved Finance/CRM documents but have no entity definition?
7. Does document management (technical datasheets, certificates, compliance artifacts) require a Blueprint entity, given `Product Entity.md` and `Supplier Attributes.md` both assume documents that have no entity? (Carried from `PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §3 Phase 6.1.)
8. Is `Tender` to remain in `ER-Diagram.md`'s "Future Extensions" list, or does the operational reality documented in `ETA-Procurement-Playbook-v1.md` §10–11 warrant promoting it to an entity?
9. If Tender is promoted, what is its relationship to RFQ, Opportunity, and Customer?

### Supplier / MOD-1 (special attention item 1)
10. The `suppliers` table is missing 7 of the 17 fields the `Supplier` TypeScript type declares — including all 5 MOD-1 intelligence fields, `supplier_code`, and `country`. Which layer is authoritative for reconciliation?
11. Which of the Blueprint's ~116 approved Supplier attributes are in scope for MOD-1, and which are deferred?
12. Should the `suppliers.status` CHECK constraint (`active`/`inactive`/`pending`) be reconciled with the Approved 7-state lifecycle, and should `lifecycle_status` and `status` coexist as separate concepts?
13. Should `suppliers.category` enforce the 8 approved category values, currently free text with no constraint?
14. Are the Blueprint's AI Metadata attributes (`ai_summary`, `ai_risk_score`, `ai_supplier_score`, `ai_recommendation`, `ai_classification`, `ai_confidence`, `embedding_id`, `knowledge_graph_node`) in scope for Supplier Intelligence, or deferred behind the AI Change Request?
15. Are the Commercial Performance attributes (`total_rfqs`, `total_quotations`, `on_time_delivery_rate`, `quality_score`, `overall_supplier_score`) stored, or computed from transactional records that do not yet exist?
16. Does supplier relationship history become a real table, and under which entity's document is it defined?

### Manufacturer (special attention item 2)
17. Does Manufacturer become an implemented independent entity per `ETA-ENT-MANUFACTURER-001`, or does it remain a Supplier category value?
18. How is the Supplier↔Manufacturer relationship modeled (authorized distributor, agent, direct OEM), and does `manufacturer_authorization` / `supported_brands` from `Supplier Attributes.md` depend on it?
19. The public website advertises a "Manufacturer Portal" (`Home.tsx`, `PlatformOverview.tsx`) with no underlying entity — is that surface in scope for any Phase 6 subphase, or does it remain future-vision-only under D4?

### Product / catalog
20. Is a structured product catalog in scope, or does product identity remain free text on line items and inquiries?
21. Do Product Category, Material, Brand, Technical Datasheet, Certificate, and Product Revision (Product Domain) require entity definitions before any product work?
22. Can specification matching function on free-text `technical_specification`, or does it require structured attributes?

### Procurement chain integrity
23. `supplier_quotes` currently links to `purchase_orders`, inverting the Blueprint chain in which Quotations answer RFQs and precede POs. Which chain is authoritative?
24. Is the mandatory chain Purchase Request → RFQ → Quotation → PO, or are direct paths (PR → PO for known sources) permitted?
25. Does the Blueprint rule "Every Quotation belongs to one Opportunity" apply to supplier quotations, customer quotations, or both?
26. Where do technical and commercial evaluation records attach — to RFQ, to Quotation, or to a distinct evaluation entity? (Carried from `PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §3 Phase 6.2.)

### Odoo boundary (special attention item 4 — boundary only, no integration work)
27. `Customer Entity.md` names **Odoo CRM** as ERP owner, and `Supplier Entity.md` maps Supplier to Odoo `res.partner` (Vendor). For each entity in this review, which system is system-of-record once integration exists — ETA-Platform, Odoo, or bidirectional?
28. Are the twelve `[Entity] Odoo Mapping.md` documents the binding integration contract, and what is each one's own approval status? (Carried from `PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §6 Q13.)
29. Does the ETA-Platform schema need to accommodate Odoo identifiers now — `Supplier Attributes.md` defines `erp_id`, `external_id`, `source_system`, `last_sync`, `sync_status`, none of which exist in the `suppliers` table — or is that deferred until integration is approved?
30. Which entities does Odoo own outright such that ETA-Platform should not model them at all?

### AI relevance (exploration boundary per D6.3)
31. Supplier Intelligence, Tender Analysis, and AI Procurement Assistant are approved for AI Studio **exploration only**. Tender and Product have no approved entity to trace a Business Requirement to — does exploration proceed regardless, or does entity resolution gate it?
32. Do `ai_models` / `ai_tasks` (tables and types that already exist) remain in the schema given no approved AI implementation scope, and does `mockAiModels`' overstatement of live provider integrations get corrected? (Carried from `PHASE6-CURRENT-STATE-AUDIT.md`.)

---

*Read-only audit. No code, schema, migration, API, or UI was created or modified. Contains no recommendations and no implementation plan, per Step 3 instructions. Every finding is traceable to a named file verified on 2026-08-11. Governed by D5 (Claude Code as sole implementation agent) and D6 (exploration-tool boundaries); implementation of anything in this document remains blocked behind BR → FR → API → UI → CMP → TEST per `PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §5 and Founder approval per Step 7 of the Phase 6 workflow.*
