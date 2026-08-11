---
title: Phase 6 — Platform Execution Strategy
document_id: ETA-PHASE6-STRATEGY-001
status: Proposal — not a Blueprint decision; requires Decision Owner ratification before binding
date: 2026-08-11
authority: >
  ETA-Blueprint/13-DECISIONS/DECISIONS.md, ETA-Blueprint/13-DECISIONS/
  ETA-PLATFORM-IDENTITY-AI-WORKFLOW-DECISION-D5.md (Approved), ETA-Blueprint/13-DECISIONS/
  ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md (D1-D4, Approved),
  ETA-Platform/docs/delivery/IMPLEMENTATION-GATE.md, ETA-Platform/docs/delivery/CODING-RULES.md,
  ETA-Platform/docs/delivery/sprints/Sprint-01/MOD-1-Supplier-Intelligence.md,
  ETA-Platform/docs/delivery/PHASE5-2-AI-DESIGN-WORKFLOW-STRATEGY.md, master governance
  (~/Documents/GitHub/CLAUDE.md), ETA-Platform/CLAUDE.md
scope: >
  Strategy and planning only. No code, schema, migration, API, UI, component, or automation
  change was made in producing this document. This report exists to be read and, where it
  proposes something new (phase scope, sequencing, governance gate), ratified or rejected via
  the normal ETA-Blueprint decision-record process before any implementation task is created
  against it.
purpose: >
  Defines the Phase 6 objective, audits current ETA-Platform state against approved decisions,
  scopes Phase 6.1-6.5 at a strategy level only, states explicit exclusions, restates the
  required implementation governance sequence, and lists every open question that needs
  Founder ratification before Phase 6 execution can begin.
---

# Phase 6 — Platform Execution Strategy

## 0. Role and How to Read This Document

This document was produced in a **Documentation Architect / Product Strategy** capacity: research and planning only. No source file, schema, route, component, or configuration was created or modified in producing it, and none should be inferred as authorized by it. It follows the same standing as `PHASE5-2-AI-DESIGN-WORKFLOW-STRATEGY.md` before it: a reasoned proposal, citing the authority documents that would need to ratify it, non-binding until a corresponding decision record is written in `ETA-Blueprint/13-DECISIONS/`.

**Tool governance note:** `ETA-PLATFORM-IDENTITY-AI-WORKFLOW-DECISION-D5.md` is **Approved** (ratified 2026-08-11), and `ETA-AI-TOOLING-WORKFLOW-EXPANSION-DECISION-D6.md` (Approved, 2026-08-11) extends it. Together they bind all Phase 6 execution — once approved — as follows:

- **Claude Code** — sole production implementation agent; ETA-Platform remains the single implementation source. No other AI builder may write directly to it (D5.2, D6.1).
- **Figma** — design authority when available; not yet active (D5.2).
- **Google Stitch** — temporary UI/UX exploration tool while Figma is unavailable; exploration material only, never production code, never copied directly into ETA-Platform (D6.2).
- **Lovable / v0** — exploration-only tools, no production authority (D5.2).
- **Google AI Studio** — prototype exploration only, limited to Supplier Intelligence, Tender Analysis, and AI Procurement Assistant concepts (D6.3) — directly relevant to this document's §3 Phase 6.5 scope. Implementation stays blocked until this document's §5 BR → FR → API → UI → CMP → TEST sequence is satisfied for each capability.
- **Firebase** — isolated disposable prototypes only; never replaces ETA backend architecture or becomes the production database without a separate approved decision (D6.4).
- **Antigravity** — research and experimentation only; no production implementation (D6.5).
- **Standing workflow** (D6.6): Undefined Requirement → Google Stitch / AI Studio Exploration → Founder Review → ETA-Blueprint Decision Record (if required) → Claude Code Implementation → Validation → Delivery Closure.

This supersedes `PHASE5-2-AI-DESIGN-WORKFLOW-STRATEGY.md`'s "awaiting ratification" status on the tool-role question — now settled by D5 and D6.

---

## 1. Phase 6 Objective

Transform ETA-Platform from its current state — a brand-compliant public website plus a set of mock-data-driven internal UI shells — into an **operational industrial procurement platform**: real data, real workflows, and a defined (not yet built) boundary toward ERP/Odoo and AI capability.

Phase 6 is a **strategy phase**. It defines what must be true before implementation tasks are opened, and in what order. It does not itself implement anything, per the exclusions in §4.

---

## 2. Current State Audit

Compiled from direct inspection of `ETA-Platform/package.json`, `src/App.tsx`, `src/lib/supabase.ts`, `src/lib/data.ts`, `src/lib/mockData.ts`, `supabase/migrations/`, and every file under `ETA-Platform/docs/delivery/` (including `sprints/Sprint-01/`). Where docs disagree, the most recently dated document is treated as current; all cited docs below are dated 2026-08-09 unless noted.

### 2.1 Technology Stack

- **Frontend:** React `19.2.7`, TypeScript `~6.0.2` (strict — `noUnusedLocals`/`noUnusedParameters` on)
- **Build tool:** Vite `8.1.1` — a single Vite app, not Next.js, not a monorepo/Turborepo (an earlier task-brief assumption to the contrary was corrected against actual repo state)
- **Styling:** Tailwind CSS `3.4.15`; no external UI kit — 18 hand-built primitives in `src/components/ui/` (Button, Card, Input, Badge, Avatar, DataTable, Modal, Progress, Spinner, StatCard, PageHeader, Alert, Drawer, EmptyState, Select, Skeleton, Tabs, Toast)
- **Routing:** `react-router-dom` `^7.0.0`
- **Data/backend client:** `@supabase/supabase-js` `^2.45.0` — see §2.5, integration-only today
- **State management:** none dedicated (no Redux/Zustand/etc.); data access is plain async functions in `src/lib/data.ts`
- **Icons:** Lucide (`lucide-react`), matching the Approved `Icons.md`
- **Charting:** none installed
- **i18n/RTL:** `src/i18n/` scaffold exists and is mounted (`LanguageProvider` in `main.tsx`), but hardcoded to `en`/`ltr`; `fa.ts` is 100% placeholder; `LanguageSwitcher` built but not mounted anywhere; not functionally live
- **3D / motion-graphics tooling:** none present anywhere in the dependency tree

### 2.2 Existing Routes

**Public website (9 routes, `SiteLayout`) — built, functional, brand-compliant, no imagery:**
`/`, `/about`, `/industries`, `/products-capabilities` (with `/services` redirecting to it), `/equipment-supply`, `/steel-trading`, `/supplier-network` (all three added per CR-001), `/platform` (explicitly future-vision framing only, per D4), `/contact` (form UI built, **no backend wired** — submissions go nowhere).

**Internal/platform surfaces (`AppLayout`) — built UI, mock-data-only:**
`/dashboard`, `/crm/companies`, `/crm/contacts`, `/crm/deals`, `/crm/inquiries`, `/procurement/orders` (with `/procurement/suppliers` redirecting to `/suppliers`), `/suppliers`, `/suppliers/:id` (MOD-1), `/supplier-portal`, `/ai-platform` (static cards only — no chat/prompt/workflow-timeline UI), `/settings`.

**Not built:** Manufacturers, Projects/Case Studies, Knowledge Center, Blog, Careers, Legal pages, Customer Portal, Suppliers "Become a Supplier"/Registration — all present in the Approved `Sitemap.md` but not yet built. `Sitemap.md` itself has never been reconciled with CR-001/D1–D4 and currently disagrees with the live site structure — a standing documentation debt, not a Phase 6 blocker per se, but relevant to §6.

### 2.3 Existing Modules

- **MOD-1 Supplier Intelligence** — the only formally scoped Sprint 1 module (`sprints/Sprint-01/MOD-1-Supplier-Intelligence.md`). Approved scope: supplier master entity, profile, qualification data, classification, relationship history. Its own Definition of Done (DB entity created, API endpoints implemented, UI connected, CRUD complete, tests added) is **not confirmed complete anywhere** — `ETA-Platform/CLAUDE.md` lists only "Dashboard, Supplier List, Supplier Detail, Mock Data Layer" as implemented.
- **CRM (Companies/Contacts/Deals/Inquiries)** — UI exists, mock-data-driven, not formally scoped as a numbered Blueprint module beyond CRM Domain/Customer Domain references.
- **Procurement (Purchase Orders)** — UI exists, mock-data-driven, not separately scoped as a numbered module.
- **Supplier Portal, AI Platform** — UI shells exist, mock-data-driven; AI Platform is the largest gap between brand promise and implementation (no chat/suggestions/workflow-timeline components).
- **Tender management** — referenced in UI concepts but **not traceable to any Approved Blueprint domain/entity document**; flagged `Open Decision Required` at the entity-model level before any further design or implementation.
- **Customers / Products / Finance** (as distinct product surfaces) — wireframe-level only, pending domain confirmation; whether "Customer" is distinct from "Company"/"Contact" in the approved domain model is unconfirmed.

All of the above run entirely on the mock-data fallback described in §2.4/§2.5 — none is confirmed real-DB-backed today.

### 2.4 Existing Mock Data

`src/lib/mockData.ts` exports 12 datasets: `mockSuppliers`, `mockSupplierRelationshipEvents`, `mockCompanies`, `mockDeals`, `mockPurchaseOrders`, `mockAiTasks`, `mockContacts`, `mockPoItems`, `mockSupplierProfiles`, `mockSupplierQuotes`, `mockAiModels`, `mockCustomerInquiries`.

Two known issues, unresolved as of the most recent audits:
- Several mock supplier records are modeled on real, named Iranian industrial companies with fabricated emails, ratings, and compliance flags, with no "demo data" disclaimer currently surfaced anywhere in the UI (a badge that once existed was removed when "Platform Preview" was dropped from public nav in Phase 2).
- `mockAiModels` lists production-looking `anthropic`/`openai`/`google` provider entries as if live AI integrations exist — none do; this overstates approved AI scope (AI automation remains forbidden without a Change Request per Sprint 1 rules).

### 2.5 Current Database Status

**Integration-only — the running application is driven entirely by mock data today.**

- `src/lib/supabase.ts` creates a Supabase client but falls back to a placeholder URL/key when `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` aren't set and exports `isSupabaseConfigured`. No `.env` file exists in this checkout, so `isSupabaseConfigured` is currently `false`.
- `src/lib/data.ts`'s own code comment states the design explicitly: *"Backend-optional data access. No ERP/DB integration yet... every getter falls back to mock data when Supabase isn't configured or the query fails."* Every getter (`getCompanies`, `getSuppliers`, `getPurchaseOrders`, etc.) follows this pattern.
- A real Postgres schema **does exist** at `supabase/migrations/20260710212509_create_eta_platform_schema.sql` (10 tables: `companies`, `contacts`, `deals`, `suppliers`, `purchase_orders`, `po_items`, `supplier_profiles`, `supplier_quotes`, `ai_models`, `ai_tasks`) — but no document confirms this migration has been applied to a live, provisioned Supabase project, or that it's been populated with real data.
- Two entities used in the UI have **no table at all**: `customer_inquiries` (code comment: "UI/mock-data only, no backend table yet") and supplier relationship history (code comment: "No relationship-history table yet — UI-only mock until the entity is implemented").
- `ETA-Platform/CLAUDE.md` lists "Supplier Intelligence database" as a **future** Next Priority item (priority 3, after Website and Platform UI completion) — consistent with the code.

### 2.6 Current ERP/Odoo Relationship

No document under `ETA-Platform/docs/delivery/` discusses Odoo integration status, timeline, or mapping. The only references are scope-exclusion mentions:
- `IMPLEMENTATION-GATE.md` and `CODING-RULES.md` both list "ERP Integration" under **Forbidden without a Change Request**.
- `sprints/Sprint-01/MOD-1-Supplier-Intelligence.md` and `CLAUDE.md` both list ERP integration as explicitly forbidden for Sprint 1.

Separately, `ETA-Blueprint/04-DATA/Entities/*/[Entity] Odoo Mapping.md` files exist (Contract, Customer, Inventory, Invoice, Manufacturer, Payment, Product, PurchaseOrder, Quotation, RFQ, Shipment, Supplier) — these are Blueprint-tier reference mappings, not yet wired into ETA-Platform in any way, and their own approval/draft status was out of scope for this audit.

**Conclusion:** Odoo/ERP integration is currently a purely forbidden/gated future item in ETA-Platform's own governance — no timeline or integration decision exists yet to build against.

### 2.7 Component Library and Inherited Limitations (supporting context)

- The shared component library (18 primitives) is built and extended but **has not gone through formal sign-off against `Components.md`**. Per `PHASE5-2-AI-DESIGN-WORKFLOW-STRATEGY.md`: until that sign-off happens, Dashboard/CRM/Supplier-management/Tender/AI-assistant surfaces stay in a "define workflow, do not build" posture. This directly affects how much of Phase 6.1–6.3's eventual UI work can proceed once ratified.
- An "ETA UX Architecture Phase" (Information Architecture, Navigation Model, User Journeys, Screen Inventory, Component Mapping) was flagged as a prerequisite for further Dashboard/CRM/Supplier/Finance UI work; no document confirms it has run.
- Known unresolved items carried into this audit (full list in §6): V4 hero strategy, V5 accent-token cleanup remainder, imagery sourcing path, motion graphics sourcing, 3D visualization scope, RTL's 6 open sub-decisions, Sitemap.md/CR-001 reconciliation, Tender entity confirmation, CTA-band radius token, Lovable hosting status discrepancy against `Technical.md`.

---

## 3. Phase 6 Scope

**Strategy only.** Every subsection below defines objective, entities/dependencies, and open questions — none authorizes schema, API, UI, or automation work. Each requires its own Blueprint decision record (per §5 governance) before implementation tasks are opened.

### Phase 6.1 — Operational Data Foundation

**Objective:** Establish the real, DB-backed system of record replacing the current mock-data fallback, for the entities Phase 6.2/6.3 depend on.

- **Supplier master data** — MOD-1's already-approved scope (supplier entity, profile, classification, qualification, relationship history) is the natural first target; its DoD was never confirmed met, so Phase 6.1 should first close that gap before extending scope, not restart it.
- **Customer master data** — depends on resolving whether "Customer" is a distinct Blueprint entity from "Company"/"Contact" (open, §6).
- **Product master data** — Blueprint `04-DATA/Entities/Product/` (Entity, Attributes, API, Odoo Mapping) exists as reference; needs confirmation these are the binding attribute set for ETA-Platform's schema.
- **Document management** — no Blueprint entity for documents (contracts, certificates, compliance artifacts) was found in this audit; likely needs a new Blueprint entity definition before schema work, not just an implementation task.
- **Data ownership** — which entities are ETA-Platform system-of-record vs. eventually Odoo system-of-record (relevant now, even pre-integration, so schema decisions in 6.1 don't require rework later — see §6).

### Phase 6.2 — Procurement Workflow

**Objective:** Move the Purchase Orders / Supplier Quotes UI from mock-data display to a real workflow engine.

- **RFQ lifecycle** — Blueprint `04-DATA/Entities/RFQ/` exists (Entity, Attributes, API, Odoo Mapping); "Customer Inquiries" mock data is already positioned as upstream of RFQ per `CONTENT-SOURCE-MAP.md`.
- **Supplier quotation** — `mockSupplierQuotes`/`supplier_quotes` table already exist as a starting shape; needs validation against Blueprint Quotation entity docs.
- **Technical evaluation / Commercial evaluation** — no existing UI, mock data, or Blueprint workflow document was found covering evaluation criteria or scoring; this is new scope, not an extension of something already approved.
- **Approval workflow** — Blueprint Finance domain has a `Financial Approval Matrix.md`; whether procurement approval routes through that matrix or needs its own model is open (§6).
- **Tender vs. RFQ** — must be resolved before this phase's entity model is finalized (carried from §2.7/§2.3).

### Phase 6.3 — CRM Workflow

**Objective:** Move Companies/Contacts/Deals from mock display to a real CRM data layer and pipeline logic.

- **Customer management** — depends on the Customer/Company/Contact entity-boundary question (§6).
- **Opportunity tracking** — `mockDeals`/`deals` table exist as a starting shape; no Blueprint "Opportunity" entity was found distinct from "Deal" — needs confirmation these are the same concept before schema work.
- **Sales pipeline** — Dashboard's current "Sales Pipeline" is custom progress bars over mock data, not a real pipeline engine; stage definitions need an approved source before being encoded.

### Phase 6.4 — ERP/Odoo Integration Strategy

**Objective:** Define the boundary between ETA-Platform and Odoo — strategy only, **no coding, no schema migration, no API implementation**.

- Confirm which entities are ETA-Platform-authoritative vs. Odoo-authoritative once integration exists, so Phase 6.1's schema work doesn't have to be redone.
- Confirm whether the existing `ETA-Blueprint/04-DATA/Entities/*/[Entity] Odoo Mapping.md` documents are intended as the binding integration contract, and their own approval status.
- Confirm sequencing: `ETA-Platform/CLAUDE.md`'s stated Next Priority order places ERP integration after Procurement and CRM module work — Phase 6.4 should validate that ordering still holds or propose a revision, not silently assume it.
- This phase produces a **boundary document and sequencing recommendation only** — the ERP integration itself remains forbidden without its own Change Request, unchanged by this strategy document.

### Phase 6.5 — AI Layer Preparation

**Objective:** Prepare data structures and interface points for future AI capability — **no AI implementation, no automation workflow**.

- **Supplier intelligence** — data shape needed for future scoring/classification, building on Phase 6.1's supplier master data; no algorithm or model work.
- **Document extraction** — depends on Phase 6.1's document management entity existing first.
- **Tender analysis** — depends on the Tender entity question (§2.3/§2.7/§6) being resolved first.
- **Recommendation engine** — data/interface preparation only; `mockAiModels`' current overstatement of live AI provider integration (§2.4) should be corrected as part of this phase's data-honesty cleanup, independent of whether AI implementation itself is approved.
- Per Sprint 1 Coding Rules, AI automation remains forbidden without a Change Request; this phase stays at the "vision-shell" level consistent with D4's future-vision framing for `/ai-platform`, unless and until that Change Request is separately approved.

---

## 4. Explicit Exclusions

The following are **out of scope for Phase 6 as a strategy phase**, regardless of how compelling they may seem while scoping 6.1–6.5, until a separate execution approval exists for each:

- AI implementation (models, scoring, generation, chat)
- Automation workflows
- Odoo coding (API calls, sync jobs, field mapping code)
- Database migration (running or altering schema against a live environment)
- UI redesign (of already-Approved website or platform screens)
- New components (beyond what's already in `src/components/ui/`)

This document does not authorize any of the above. Producing it involved no code, schema, route, or component change.

---

## 5. Required Implementation Governance

Every future Phase 6 implementation task — once separately approved — must follow this sequence, with no stage skipped:

**BR → FR → API → UI → CMP → TEST**

| Stage | Meaning in ETA's context |
|---|---|
| **BR** (Business Rule) | Traced to an Approved ETA-Blueprint domain/entity document. Never invented — if no Blueprint document defines it, it's `Open Decision Required`, not a judgment call. |
| **FR** (Functional Requirement) | Translates the BR into platform behavior — what the system must do, not how it looks or is coded. |
| **API** | Contract defined and approved before UI work starts, per Sprint 1's "Implement approved API Contracts" rule. |
| **UI** | Built against Approved `Colors.md`/`Typography.md`/`Components.md` — no invented color, spacing, or component pattern. |
| **CMP** (Component) | Implemented using the existing signed-off shared component library (`src/components/ui/`) — new components require their own approval per §4. |
| **TEST** | Typecheck, build, and browser/console validation with no regressions — the same closure standard already applied to every completed website phase, extended to platform modules. |

No Phase 6 implementation work should be opened as a task without first identifying which BR it traces to. Where §6 lists an entity or workflow as unresolved, no FR/API/UI/CMP/TEST work may proceed on it until that open question is closed.

---

## 6. Open Questions (Founder Approval Required)

### General / sequencing
1. Is Phase 6.1 (Data Foundation) a hard prerequisite for 6.2 and 6.3, or can parallel tracks start once their specific entity dependencies are individually resolved?
2. Should MOD-1 Supplier Intelligence's original, already-approved Sprint 1 Definition of Done be completed first as the concrete opening target of Phase 6.1, rather than Phase 6.1 being scoped as new/parallel work?
3. Supabase environment: is a dedicated project already provisioned for real data, or does provisioning itself need a decision (environment, access control, secrets handling)?
4. Data ownership boundary: which entities are ETA-Platform system-of-record vs. (eventually) Odoo system-of-record? Needed before 6.1 schema work to avoid rework.

### Phase 6.1 — Data Foundation
5. Is there an approved Blueprint entity for document management, or does one need to be authored first (in ETA-Blueprint, not here)?
6. Should the existing `supabase/migrations/20260710212509_create_eta_platform_schema.sql` be treated as the authoritative starting schema, or does it need re-validation against Blueprint entity-attribute documents before being trusted?

### Phase 6.2 — Procurement Workflow
7. Is "Tender" a Blueprint entity distinct from RFQ? (Carried forward, previously unresolved.)
8. Should procurement approval workflow route through the existing Blueprint `Financial Approval Matrix.md`, or does it need its own approval model?
9. Are technical and commercial evaluation criteria/scoring defined anywhere in ETA-Blueprint, or is this net-new scope requiring its own Blueprint spec before any FR work?

### Phase 6.3 — CRM Workflow
10. Is "Customer" formally distinct from "Company"/"Contact" in the approved domain model?
11. Is "Opportunity" the same concept as the existing "Deal" entity, or a distinct one?
12. Is there an approved Blueprint definition of sales-pipeline stages, or does Phase 6.3 need to propose one for ratification?

### Phase 6.4 — ERP/Odoo Boundary
13. Are the existing `ETA-Blueprint/04-DATA/Entities/*/[Entity] Odoo Mapping.md` documents intended as the binding integration contract once ERP integration is approved, and what is their own current approval status?
14. Does `ETA-Platform/CLAUDE.md`'s stated priority order (Website → Platform UI → Supplier DB → API → Procurement → CRM → AI, with ERP unplaced in that list but forbidden until a Change Request) still hold, or should Phase 6.4 propose a revised sequencing recommendation?

### Phase 6.5 — AI Layer
15. Should Phase 6.5 remain strictly data/interface preparation with zero AI-facing UI change, or is a vision-only shell extension of the existing `/ai-platform` placeholder acceptable under D4's future-vision framing?
16. Should the mock AI-provider overstatement in `mockAiModels` (§2.4) be corrected as a data-honesty fix now, independent of whether/when AI implementation itself is approved?

### Carried-forward items relevant to Phase 6 approval context (not new, listed for visibility — all remain open per D5's Non-Decisions and prior audits)
17. Odoo Website strategy
18. `eta-digital-hub` disposition
19. Industrial imagery sourcing path, motion graphics production, 3D visualization scope
20. RTL implementation (6 sub-decisions: numeral system, calendar system, icon-mirroring policy, nav order under RTL, per-component RTL behavior, Vazirmatn self-hosting)
21. Component library formal sign-off against `Components.md`, and whether the "ETA UX Architecture Phase" prerequisite has been or needs to be run before Phase 6's own UI work
22. `Sitemap.md` reconciliation with CR-001/D1–D4 (documentation debt, not a Phase 6 blocker, but should be closed before it compounds further)

---

*Companion sources: `ETA-Blueprint/13-DECISIONS/ETA-PLATFORM-IDENTITY-AI-WORKFLOW-DECISION-D5.md` (Approved, governs tool roles for any future Phase 6 implementation), `ETA-Platform/docs/delivery/PHASE5-2-AI-DESIGN-WORKFLOW-STRATEGY.md` (Proposal, precedent for this document's format). No code, schema, route, component, or automation change was made in producing this document. Recommended next step, if this strategy's direction is agreeable: a Blueprint decision record ratifying the Phase 6 scope and answering the Open Questions in §6, before any implementation task is created.*
