---
title: Phase 6 — Current State Audit
document_id: ETA-PHASE6-AUDIT-001
status: Audit — read-only factual record; not a decision document
date: 2026-08-11
authority: >
  ETA-Blueprint/13-DECISIONS/ETA-PLATFORM-IDENTITY-AI-WORKFLOW-DECISION-D5.md (Approved),
  ETA-Blueprint/13-DECISIONS/ETA-AI-TOOLING-WORKFLOW-EXPANSION-DECISION-D6.md (Approved),
  ETA-Blueprint/13-DECISIONS/DECISIONS.md (CR-001, D1-D6),
  ETA-Platform/docs/delivery/PHASE6-PLATFORM-EXECUTION-STRATEGY.md,
  ETA-Platform/docs/delivery/IMPLEMENTATION-GATE.md,
  ETA-Platform/docs/delivery/CODING-RULES.md,
  ETA-Platform/docs/delivery/sprints/Sprint-01/MOD-1-Supplier-Intelligence.md
method: >
  Direct read-only inspection of ETA-Platform source (src/, supabase/migrations/,
  package.json, App.tsx, lib/), all files under docs/delivery/, and relevant
  ETA-Blueprint 04-DATA entity documents and 13-DECISIONS records. Claims below are
  stated from verified file contents, not from prior-session memory.
scope: >
  Read-only audit. No code, schema, route, component, configuration, or architecture
  change was made. This document records state; it proposes nothing and decides nothing.
---

# Phase 6 — Current State Audit

**Step 2 of the approved Phase 6 preparation workflow.** Read-only. Records what exists today so that Steps 3–7 (Business Entity Review, Supplier Intelligence UX Requirements, exploration gates, Founder approval package) work from verified facts rather than assumption.

Where this audit contradicts or extends `PHASE6-PLATFORM-EXECUTION-STRATEGY.md`, the differences are called out explicitly — that document was written from a research pass; this one adds direct source-file verification and surfaces several items it did not capture.

---

## 1. Repository Status

### 1.1 Current Stack (verified from `package.json`)

| Layer | Actual |
|---|---|
| Framework | React `^19.2.7` + React DOM `^19.2.7` |
| Build | Vite `^8.1.1` (single app — not Next.js, not a monorepo) |
| Language | TypeScript `~6.0.2` |
| Styling | Tailwind CSS `^3.4.15` + PostCSS + Autoprefixer |
| Routing | `react-router-dom` `^7.0.0` |
| Backend client | `@supabase/supabase-js` `^2.45.0` |
| Icons | `lucide-react` `^0.460.0` |
| Lint | `oxlint` `^1.71.0` |
| Scripts | `dev`, `build` (`tsc -b && vite build`), `typecheck`, `lint`, `preview` |

**Not present** (verified by absence from dependency tree): any charting library, any state-management library, any test runner or testing framework, any 3D/motion library, any AI SDK, any Odoo/ERP client.

**Note on `TEST` in the governance sequence:** `package.json` has no test script and no test framework installed. The `BR → FR → API → UI → CMP → TEST` sequence required by `PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §5 and by MOD-1's Definition of Done currently has no tooling behind its final stage. Recorded as a fact here; resolving it is not in this audit's scope.

### 1.2 Repository Structure

```
src/
  App.tsx                    — all routing, single file
  components/
    ui/        (18 primitives)
    layout/    (AppLayout — internal platform shell)
    site/      (SiteLayout — public website shell)
  pages/
    site/      (9 public website pages)
    crm/       (4 pages)
    procurement/ (1 page)
    suppliers/ (2 pages)
    (root: Dashboard, AiPlatform, SupplierPortal, Settings)
  lib/         (data.ts, mockData.ts, supabase.ts, format.ts)
  i18n/        (scaffold — see 2.3)
  assets/
supabase/
  migrations/20260710212509_create_eta_platform_schema.sql
docs/delivery/  (~48 governance/audit/handoff documents)
```

### 1.3 Implementation Maturity

- **Public website:** production-quality — built, styled, brand-compliant, routed, validated across multiple completed phases.
- **Internal platform:** UI-complete shells, **zero real data** — every screen renders from `src/lib/mockData.ts`.
- **Backend:** client wired, schema file authored, **not provisioned or connected** in this checkout.
- **Testing:** none.
- **Overall:** the repository is a mature front-end with a demonstration data layer, not yet an operational system.

---

## 2. Website Status

### 2.1 Completed Routes (verified from `src/App.tsx`)

Nine public routes under `SiteLayout`, plus one redirect:

| Route | Component | Governance origin |
|---|---|---|
| `/` | `site/Home.tsx` | — |
| `/about` | `site/About.tsx` | — |
| `/industries` | `site/Industries.tsx` | D3 |
| `/products-capabilities` | `site/Services.tsx` | D1/D3 — component renamed on import; **file still named `Services.tsx`**, rename deliberately deferred (documented inline in `App.tsx`) |
| `/services` | → redirect to `/products-capabilities` | D1 |
| `/equipment-supply` | `site/EquipmentSupply.tsx` | CR-001 / D2 |
| `/steel-trading` | `site/SteelTrading.tsx` | CR-001 / D2 |
| `/supplier-network` | `site/SupplierNetwork.tsx` | CR-001 / D2 |
| `/platform` | `site/PlatformOverview.tsx` | D4 — future-vision framing only |
| `/contact` | `site/Contact.tsx` | — form UI only, **no backend wired** |

`App.tsx` carries inline comments citing the governing decision records for the routing structure — routing is traceable to D1–D4.

### 2.2 Completed Phases

Per the session-handoff series in `docs/delivery/`: Website Foundation → Phase 1 → Phase 2 → Phase 3.1 → Phase 3.2 (typography, sub-phases 3.2B–3.2F) → Phase 3.3 (visual refinement) → Phase 4.1 → Phase 4.2 → Phase 5.1 (V5 copper-shade migration). Each closed with typecheck + build + browser validation and a handoff document, per the standing three-part closure rule.

Phase 5.2 was produced as a **strategy proposal only** (`PHASE5-2-AI-DESIGN-WORKFLOW-STRATEGY.md`); its tool-governance question has since been settled by D5 and D6.

### 2.3 Remaining Website Decisions

Unresolved and carried into Phase 6 (none blocking platform work, but all still open):

- **V4** — inner-page hero strategy (unified vs. differentiated); recommended to follow imagery sourcing.
- **V5 remainder** — `copper-600` icon-badge usage (~16 instances) and `copper-300` usage, deferred pending broader accent-token cleanup.
- **Imagery sourcing** — zero photography/illustration exists anywhere on the site; no sourcing path or review authority decided.
- **Motion graphics (produced)** and **3D visualization** — no tooling, no assets, no approved scope.
- **Persian / RTL** — `src/i18n/` scaffold exists and `LanguageProvider` is mounted, but hardcoded `en`/`ltr`; `fa.ts` entirely placeholder; `LanguageSwitcher` built but not mounted; 6 sub-decisions open (numerals, calendar, icon mirroring, RTL nav order, per-component RTL behavior, Vazirmatn self-hosting).
- **Header nav for the three CR-001 pages** — still reachable only via hub page and footer.
- **`Sitemap.md` reconciliation** — the Approved Blueprint sitemap still does not reflect CR-001/D1–D4; the two documents disagree.
- **Unbuilt pages present in the Approved sitemap:** Manufacturers, Projects/Case Studies, Knowledge Center, Blog, Careers, Legal (Privacy/Terms/Cookie), Customer Portal, Become-a-Supplier/Registration.

---

## 3. Platform Status

All internal routes render under `AppLayout`. **Every module below is mock-data-driven** — verified in `src/lib/data.ts`, where each getter returns mock data when Supabase is unconfigured, on query error, or (for suppliers) on empty result.

### 3.1 Dashboard (`/dashboard`)

- **Existing state:** built. Renders KPI stat cards, a "Sales Pipeline" visualization implemented as custom progress bars (no chart library installed), and recent-activity surfaces.
- **Data:** mock only — composed from `mockCompanies`, `mockDeals`, `mockPurchaseOrders`, `mockSuppliers`, `mockAiTasks`.
- **Missing dependencies:** real data layer; approved KPI definitions (which metrics are authoritative and how computed); charting capability if real analytics are intended.

### 3.2 CRM (`/crm/companies`, `/crm/contacts`, `/crm/deals`, `/crm/inquiries`)

- **Existing state:** four built list/table screens.
- **Data:** mock only — `mockCompanies`, `mockContacts`, `mockDeals`, `mockCustomerInquiries`.
- **Schema coverage:** `companies`, `contacts`, `deals` tables exist in the migration file. **`customer_inquiries` has no table at all** — confirmed by the type comment in `src/lib/supabase.ts:166-168`: *"UI/mock-data only, no backend table yet."*
- **Missing dependencies:** Customer-vs-Company entity boundary unresolved; Opportunity-vs-Deal equivalence unresolved; no approved pipeline-stage definition (the `Deal.stage` union — `lead | qualified | proposal | negotiation | won | lost` — is a code-level invention with no cited Blueprint source); `customer_inquiries` table and its Blueprint entity basis.

### 3.3 Supplier Network / Supplier Intelligence (`/suppliers`, `/suppliers/:id`, `/supplier-portal`, public `/supplier-network`)

- **Existing state:** the most developed platform area. `SupplierList.tsx` (filterable list), `SupplierDetail.tsx` (profile view), `SupplierPortal.tsx` (portal shell). Public `/supplier-network` is a separate marketing page, not the internal module.
- **Data:** mock only. `getSuppliers()` falls back to `mockSuppliers` on unconfigured/error/**empty result**; `getSupplierById()` reads from that same set.
- **Type maturity:** the `Supplier` type in `src/lib/supabase.ts:80-99` is the richest in the codebase and explicitly cites its Blueprint source (`// Supplier Intelligence (MOD-1) — ETA-Blueprint ENT-SUPPLIER-001`), carrying `lifecycle_status` (7 states), `classification` (4 tiers), `certifications[]`, `compliance_status`, `risk_level`.
- **Critical gap — relationship history:** `getSupplierRelationshipHistory()` in `src/lib/data.ts:49-52` is **hardcoded to always return mock data regardless of Supabase state**, with the comment *"No relationship-history table yet — UI-only mock until the entity is implemented."* This is the one getter with no real-data path at all. Relationship history is named in MOD-1's approved scope.
- **Schema drift:** the `suppliers` table in the migration file does **not** contain the MOD-1 intelligence columns (`lifecycle_status`, `classification`, `certifications`, `compliance_status`, `risk_level`) that the TypeScript type declares. The type is ahead of the schema. Any real-data connection would fail to populate exactly the fields MOD-1 exists to deliver.
- **Missing dependencies:** schema alignment to the declared type; relationship-history table and entity; MOD-1 Definition of Done (DB entity, API, UI connection, CRUD, tests) — none of which is confirmed complete.

### 3.4 Procurement (`/procurement/orders`, `/procurement/suppliers` → redirect)

- **Existing state:** one built screen — Purchase Orders list with PO items.
- **Data:** mock only — `mockPurchaseOrders`, `mockPoItems`, `mockSupplierQuotes`.
- **Schema coverage:** `purchase_orders`, `po_items`, `supplier_quotes` tables exist in the migration.
- **Missing dependencies:** no RFQ screen, no quotation-comparison screen, no technical evaluation, no commercial evaluation, no approval workflow — none of these exist in code in any form. Blueprint has Approved `RFQ` and `Quotation` entity documents; neither is implemented.

### 3.5 Tender Areas

- **Existing state: nothing.** A `grep -rn -i "tender"` across all of `src/` returns **zero matches** — no route, no page, no component, no type, no mock data.
- **Blueprint status:** `ETA-Blueprint/04-DATA/Entities/` contains exactly 12 entity folders — Contract, Customer, Inventory, Invoice, Manufacturer, Payment, Product, PurchaseOrder, Quotation, RFQ, Shipment, Supplier. **There is no Tender entity folder.** "Tender" appears only incidentally in catalog/diagram-level documents.
- **Assessment:** Tender is not merely undesigned — it has no entity definition and no code. Any Tender work (including the Tender Analysis AI concept sanctioned for exploration under D6.3) is entity-model-blocked, not merely design-blocked.

### 3.6 Other Built Surfaces

- **`/ai-platform`** — static card grid listing AI models and tasks from `mockAiModels`/`mockAiTasks`. No chat, prompt input, suggestion, or workflow-timeline UI exists.
- **`/settings`** — built shell.

### 3.7 Module Gap Not Previously Recorded: Manufacturer

`ETA-Blueprint/04-DATA/Entities/Manufacturer/` exists with an **Approved** entity, attributes, API, and Odoo mapping (`ETA-ENT-MANUFACTURER-006`). Both `Home.tsx:43` and `PlatformOverview.tsx:17` advertise a **"Manufacturer Portal"** as part of the platform vision. In the platform itself, "Manufacturer" exists only as one value in the `SupplierCategory` union — there is no Manufacturer module, route, table, or mock dataset. An Approved Blueprint entity with public-facing commitment and zero implementation presence is not represented anywhere in the Phase 6 strategy's scope sections.

---

## 4. Data Foundation

### 4.1 Supabase Status

- **Client:** `src/lib/supabase.ts` constructs a client from `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, falling back to `https://placeholder.supabase.co` / `placeholder-anon-key` when unset. Exports `isSupabaseConfigured` as `Boolean(url && key)`.
- **Auth configuration:** `persistSession: false`, `autoRefreshToken: false`, `detectSessionInUrl: false` — i.e. no session handling; there is no authentication implementation in the platform at all.
- **Environment:** **no `.env` file exists** in the repository root (verified). In this checkout `isSupabaseConfigured === false`, so 100% of application data is mock.
- **Provisioning:** no document in `docs/delivery/` confirms a Supabase project has been provisioned, or that the migration has ever been applied.

### 4.2 Current Entities

**Migration file** (`supabase/migrations/20260710212509_create_eta_platform_schema.sql`) creates **10 tables**: `companies`, `contacts`, `deals`, `suppliers`, `purchase_orders`, `po_items`, `supplier_profiles`, `supplier_quotes`, `ai_models`, `ai_tasks` — each with RLS enabled, four policies, and supporting indexes.

**TypeScript types** (`src/lib/supabase.ts`) define **12 entities** — the 10 above plus `SupplierRelationshipEvent` and `CustomerInquiry`, both of which have **no table**.

**Mock datasets** (`src/lib/mockData.ts`): 12 exports covering all of the above.

### 4.3 Mock Data Dependency

`src/lib/data.ts` exposes 12 getters. The fallback pattern is uniform and total:

- `getCompanies`, `getDeals`, `getPurchaseOrders`, `getContacts`, `getPoItems`, `getSupplierProfiles`, `getSupplierQuotes`, `getAiModels`, `getAiTasks`, `getCustomerInquiries` — return mock when unconfigured **or on any error**.
- `getSuppliers` — additionally returns mock when a real query succeeds but returns **zero rows**. A correctly-connected but empty `suppliers` table would silently display mock suppliers.
- `getSupplierRelationshipHistory` — **always** mock; no Supabase path exists.

**Consequence:** there is currently no way to distinguish "backend connected and working" from "backend absent" by looking at the UI. The failure mode is silent and indistinguishable from success.

### 4.4 Missing Integration Items

- No `.env` / provisioned Supabase project.
- Migration never confirmed applied.
- `customer_inquiries` and supplier relationship-history tables absent entirely.
- `suppliers` table lacks the five MOD-1 intelligence columns its TypeScript type declares.
- No authentication, no user model, no roles/permissions.
- No write path anywhere — all 12 getters are read-only; no create/update/delete exists in the codebase, despite MOD-1's Definition of Done requiring CRUD.
- No seed/reference data strategy.
- No test coverage of the data layer.

---

## 5. AI Readiness

### 5.1 Approved AI Scope

- **Sprint 1 governance** (`IMPLEMENTATION-GATE.md`, `CODING-RULES.md`, `MOD-1-Supplier-Intelligence.md`, `CLAUDE.md`): AI automation is **forbidden without a Change Request**. Unchanged.
- **D4:** public-facing surfaces must keep ETA Platform in future-vision framing — no present-tense claims of a live AI assistant.
- **D6.3:** Google AI Studio may be used for **prototype exploration only**, limited to Supplier Intelligence, Tender Analysis, and AI Procurement Assistant concepts. Implementation stays blocked until BR, FR, API/Data, UI, Component, and Test criteria are all defined and approved.
- **Net position:** exploration is permitted; implementation is not.

### 5.2 Supplier Intelligence Readiness

Supplier Intelligence is the only module with an approved Sprint 1 scope and the strongest existing foundation, but it is **not implementation-ready**:

**In place:** rich `Supplier` type traceable to `ENT-SUPPLIER-001` (Approved); list and detail UI; classification/lifecycle/risk/compliance vocabulary defined in code; `suppliers` table exists.

**Not in place:** the `suppliers` table lacks the intelligence columns (§3.3); relationship history has neither table nor real-data path; no write operations; no scoring or evaluation logic of any kind (nor is any approved); MOD-1's Definition of Done is unmet on every technical item; no tests or test tooling.

**Assessment:** the UX and vocabulary layer is genuinely ahead; the data layer is behind its own type definitions. Step 4 (UX requirements) can proceed on this foundation, but any implementation would hit the schema gap immediately.

### 5.3 AI Studio Prototype Boundary (per D6.3 / D6.4)

Permitted: concept prototyping in Google AI Studio for the three named areas. Prohibited without further approval: production integration, API keys added to ETA-Platform, backend changes, copying generated code into the repository, Firebase as anything other than an isolated disposable prototype backend.

**Blocking dependency worth recording:** of the three sanctioned exploration areas, **Tender Analysis has no Blueprint entity at all** (§3.5). Exploration may proceed under D6.3, but it cannot lead to implementation until the Tender entity question is resolved at Blueprint level.

---

## 6. Odoo Boundary

### 6.1 Current Status

- **In ETA-Platform:** zero Odoo presence — no client, no dependency, no configuration, no code reference, and no `docs/delivery/` document discussing integration status or timeline. Odoo appears only in scope-exclusion lists.
- **In ETA-Blueprint — a finding that materially updates the Phase 6 strategy document:** all **12** entity Odoo Mapping documents carry **`status: Approved`** (verified from frontmatter): Contract `ETA-ENT-CON-006`, Customer `ETA-ENT-CUSTOMER-006`, Inventory `ETA-ENT-INV-006`, Invoice `ETA-ENT-INVC-006`, Manufacturer `ETA-ENT-MANUFACTURER-006`, Payment `ETA-ENT-PAY-006`, Product `ETA-ENT-PRODUCT-006`, Purchase Order `ETA-ENT-PO-006`, Quotation `ETA-ENT-QTN-006`, RFQ `ETA-ENT-RFQ-006`, Shipment `ETA-ENT-SHP-006`, Supplier `ETA-ENT-SUPPLIER-006`.

`PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §6 Q13 asked whether these documents are the binding integration contract "and what is their own current approval status." **Their approval status is now verified as Approved.** Whether Approved status makes them the *binding integration contract* for ETA-Platform remains a separate question this audit does not answer.

### 6.2 What Is Allowed

- Reading and referencing the Approved Odoo Mapping documents as Blueprint reference material.
- Documenting and analyzing the ETA-Platform ↔ Odoo boundary at strategy level (Phase 6.4 as scoped — boundary definition and sequencing recommendation only).
- Considering Odoo field mappings when reasoning about entity design, so that Phase 6.1 schema decisions do not require rework later.

### 6.3 What Requires a Change Request

- Any ERP integration code: Odoo client, API calls, sync jobs, webhooks, field-mapping implementation.
- Any schema change made *for the purpose of* Odoo compatibility.
- Any decision designating Odoo as system-of-record for an entity.
- Any deployment or infrastructure change enabling ERP connectivity.

Governing sources: `IMPLEMENTATION-GATE.md` ("ERP Integration — NOT APPROVED"), `CODING-RULES.md`, `MOD-1-Supplier-Intelligence.md`, master `CLAUDE.md`, and `ETA-Platform/CLAUDE.md` (all list ERP integration as forbidden without a Change Request).

---

## 7. Risks

### 7.1 Technical Risks

1. **Silent mock fallback masks backend failure.** Every getter degrades to mock data on error; `getSuppliers` does so even on a successful-but-empty query. A misconfigured, unreachable, or empty backend is visually indistinguishable from a working one. This is the single highest-impact technical risk for Phase 6, because it will make the mock→real cutover unverifiable by inspection.
2. **Type/schema divergence in the flagship module.** The `Supplier` TypeScript type declares five MOD-1 intelligence fields that do not exist in the `suppliers` table. Connecting real data would silently yield `undefined` for exactly the fields MOD-1 exists to deliver.
3. **Two entities have types and UI but no tables** (`CustomerInquiry`, `SupplierRelationshipEvent`), and relationship history has no real-data code path whatsoever.
4. **No test tooling exists.** The mandated `TEST` stage and MOD-1's Definition of Done both require tests; there is no framework, no script, and no test file.
5. **No write path.** The entire data layer is read-only. CRUD is required by MOD-1's DoD and by any operational use, and does not exist.
6. **No authentication or authorization.** The Supabase client explicitly disables session handling. Any move to real data with real users requires an auth model that has not been designed.
7. **Migration never verified as applied** — the schema file's correctness has never been exercised against a live database.

### 7.2 Governance Risks

8. **MOD-1's Definition of Done is unmet but the module reads as "in progress."** `CLAUDE.md` lists Supplier List/Detail as "Implemented" while every DoD technical criterion is unmet — a documentation/reality gap that could cause Phase 6 to under-scope the work.
9. **Tender is sanctioned for AI exploration (D6.3) but has no Blueprint entity.** Exploration is permitted, implementation cannot follow, and the gap is one step removed from visibility.
10. **Manufacturer is Approved at Blueprint level and publicly advertised, with zero implementation and no Phase 6 scope line** (§3.7).
11. **`Sitemap.md` still contradicts CR-001/D1–D4** — an Approved document that disagrees with shipped reality; the longer it stands, the more it erodes "Blueprint is authority."
12. **Stale `NEXT-*` documents** in `docs/delivery/` read as live guidance but were superseded without being marked so (previously flagged in `REPOSITORY-HYGIENE-AUDIT.md`; still unresolved).
13. **`ETA-DESIGN-SYSTEM.md` / `FIGMA-*` docs** carry superseded notices but remain in the active delivery folder alongside current documents.
14. **Component library never formally signed off** against Approved `Components.md`, which by `PHASE5-2-AI-DESIGN-WORKFLOW-STRATEGY.md` keeps product screens in a "define workflow, do not build" posture — directly gating Phase 6.1–6.3 UI work.

### 7.3 Data Risks

15. **Mock supplier records are modeled on real, named Iranian industrial companies** with fabricated emails, ratings, compliance statuses, and risk levels. Fabricated compliance and risk attributes attached to identifiable real companies is the most serious item in this audit — a reputational and potentially legal exposure, not merely a data-quality issue.
16. **No demo-data disclaimer is surfaced anywhere in the UI.** A badge existed previously but was removed in Phase 2 when "Platform Preview" left the public nav.
17. **`mockAiModels` presents production-looking `anthropic` / `openai` / `google` provider entries** — including an `api_key_ref` field — implying live AI integrations that do not exist and are not approved.
18. **RLS policies grant unrestricted anonymous full CRUD.** Every one of the 10 tables has `anon_select` / `anon_insert` / `anon_update` / `anon_delete` policies `TO anon, authenticated USING (true)`. If this migration were applied to a live project with real data, any holder of the public anon key could read, modify, or delete every row in every table. Acceptable in a disconnected demo scaffold; unacceptable the moment real data exists. **This must be resolved before, not after, any Phase 6.1 data-foundation work goes live.**

---

## 8. Open Decisions

Unresolved items only. No solutions proposed.

### Data foundation
1. Is a Supabase project provisioned, and by whom — including environment strategy, secrets handling, and access control?
2. Has the existing migration ever been applied? Is it the authoritative starting schema, or must it be re-validated against Blueprint entity documents first?
3. How should the `suppliers` table reconcile with the MOD-1 intelligence fields its type already declares?
4. Do `customer_inquiries` and supplier relationship-history become real tables, and on what Blueprint entity basis?
5. What replaces the silent mock-fallback behavior once real data exists?
6. When and how are the anon-full-CRUD RLS policies replaced?
7. What is the authentication and authorization model?
8. Which entities are ETA-Platform system-of-record versus (eventually) Odoo system-of-record?

### Entities (feeds Step 3)
9. Is "Customer" distinct from "Company"/"Contact" in the approved domain model?
10. Is "Opportunity" the same concept as the existing "Deal"?
11. Is there an approved source for the `Deal.stage` pipeline values, or is the current union a code-level invention?
12. Is "Tender" a Blueprint entity distinct from RFQ — and if so, does it need authoring before D6.3's Tender Analysis exploration can lead anywhere?
13. Is "Equipment" a distinct entity, or a facet of Product?
14. What is Manufacturer's implementation status expectation, given an Approved Blueprint entity and a publicly advertised "Manufacturer Portal" with zero implementation?

### Procurement / CRM workflow
15. Are technical and commercial evaluation criteria defined anywhere in ETA-Blueprint, or is this net-new scope requiring its own Blueprint specification?
16. Does procurement approval route through the Blueprint `Financial Approval Matrix.md`, or need its own model?
17. What is the authoritative definition of sales-pipeline stages?

### Odoo
18. Does the verified **Approved** status of all 12 Odoo Mapping documents make them the binding integration contract for ETA-Platform, or are they reference-only until a separate integration decision?
19. Does the `CLAUDE.md` priority ordering (Website → Platform UI → Supplier DB → API → Procurement → CRM → AI) still hold for Phase 6?

### AI
20. Does Phase 6.5 remain strictly data/interface preparation, or is a vision-only extension of `/ai-platform` acceptable under D4?
21. Should the `mockAiModels` overstatement be corrected as a data-honesty fix independent of AI implementation approval?

### Data integrity / disclosure
22. How are the real-company-derived mock supplier records handled — replaced with fictional entities, or disclaimed?
23. Should a demo-data indicator be reinstated in the platform UI?

### Process / documentation
24. Does the component library get its formal sign-off against `Components.md` before Phase 6 UI work, and has the required "ETA UX Architecture Phase" been run or waived?
25. When is `Sitemap.md` reconciled with CR-001/D1–D4?
26. Are stale `NEXT-*` and superseded design-system documents archived out of the active delivery folder?
27. What testing framework and criteria satisfy the mandated `TEST` stage, given none exists today?

### Carried forward (unchanged, per D5/D6 Non-Decisions)
28. Odoo Website strategy; `eta-digital-hub` disposition; Figma reactivation timing; RTL implementation (6 sub-decisions); imagery sourcing; motion graphics; 3D visualization scope; V4 hero strategy; V5 accent-token remainder.

---

*Read-only audit. No code, schema, route, component, configuration, or architecture change was made in producing this document. Not committed. Step 2 of the approved Phase 6 preparation workflow; Step 3 (Business Entity Review) has not been started.*
