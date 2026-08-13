---
title: Phase 6 — Supplier Intelligence UX Definition
document_id: ETA-PHASE6-SI-UX-001
status: Definition — business UX only; not a Blueprint decision and not an implementation authorization
date: 2026-08-11
authority: >
  ETA-Blueprint/13-DECISIONS/ETA-BUSINESS-ENTITY-ALIGNMENT-DECISION-D7-PROPOSAL.md (D7, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-AI-TOOLING-WORKFLOW-EXPANSION-DECISION-D6.md (Approved),
  ETA-Blueprint/13-DECISIONS/ETA-PLATFORM-IDENTITY-AI-WORKFLOW-DECISION-D5.md (Approved),
  ETA-Blueprint/04-DATA/Entities/Supplier/Supplier Entity.md (ETA-ENT-SUPPLIER-001, Approved),
  ETA-Blueprint/04-DATA/Entities/Supplier/Supplier Attributes.md (ETA-ENT-SUPPLIER-002, Approved),
  ETA-Platform/docs/delivery/sprints/Sprint-01/MOD-1-Supplier-Intelligence.md,
  ETA-Platform/docs/delivery/PHASE6-PLATFORM-EXECUTION-STRATEGY.md,
  ETA-Platform/docs/delivery/PHASE6-BUSINESS-ENTITY-DATA-GOVERNANCE-REVIEW.md
scope: >
  Business UX definition only. No UI component, React code, Supabase change, database schema,
  Stitch file, or AI Studio prototype was created. Defines user roles, purpose, information
  architecture, profile sections, AI interaction points, data traceability, and open questions
  for MOD-1 Supplier Intelligence within the MVP scope approved by D7.2.
mvp_boundary: >
  Per D7.2 (Approved): in scope — Supplier Identity, Supplier Classification, Certifications,
  Compliance Status, Risk Level, Relationship History. Out of MVP scope — Commercial Performance,
  AI Metadata, Advanced Supplier Scoring. Nothing in this document extends that boundary.
---

# Phase 6 — Supplier Intelligence UX Definition

## 0. Purpose and How to Read This Document

Step 4 of the approved Phase 6 preparation workflow. This document defines **what Supplier Intelligence must do for its users and what information it must present** — the business UX layer that a future Functional Requirement would be written from.

It is deliberately **not** a design document. It contains no layouts, no component specifications, no colors, no spacing, no screen mockups, and no code. Those follow later, and only after the gates in §8 are cleared.

**What governs this document:**
- **D7.2 (Approved)** sets the MVP boundary. Six information areas are in scope; three are explicitly excluded. This document does not extend that boundary anywhere.
- **D6.3 (Approved)** permits Google AI Studio (Gemini) exploration of Supplier Intelligence concepts. §5 defines *where* AI could assist. It authorizes no AI implementation, and no prototype has been created.
- **D5.2 / D6.1 (Approved)** make Claude Code the sole implementation agent. Nothing here may be implemented by any other tool.
- **`PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §5** requires BR → FR → API → UI → CMP → TEST. This document is input to **BR/FR**, not a substitute for either.

**Standing constraints that apply to every section below** (from existing governance, restated so they are not rediscovered later):
- **RTL-ready by default.** Every section defined here must work in English/LTR (Inter), Persian/RTL (Vazirmatn), and with technical values (supplier codes, certificate numbers, dates) that remain LTR regardless of surrounding direction. A section that only works in one direction is incomplete.
- **No invented UI vocabulary.** Every eventual color, type size, spacing value, radius, and component pattern must resolve to an Approved Blueprint token. This document names *information*, never presentation.
- **Product screens remain gated.** The shared component library has not been formally signed off against `Components.md`. Defining this workflow is permitted; building it is not, until that sign-off and Founder approval (Step 7).

---

## 1. User Roles

Three roles are defined for MOD-1. These are **UX personas describing who uses the module and why** — they are not an authorization model, not permissions, and not an implemented role system.

> **Dependency note:** ETA-Blueprint defines an Identity Domain (`02-BLUEPRINT/Domains/Identity Domain.md`), but ETA-Platform has **no authentication and no role system today** — the Supabase schema is explicitly single-tenant with `TO anon, authenticated` policies and no sign-in. Every role distinction below is therefore a UX-intent statement, not an access control claim. Whether MOD-1 requires real role separation is recorded in §7.

### 1.1 Founder

**Who:** Ali Hejazi, Founder & CEO. Decision Owner for every ETA-Blueprint decision, and the person carrying the supplier knowledge the platform is being built to preserve.

**Primary need:** Fast, trustworthy judgment support. The Founder does not need to browse — they need to confirm or challenge a supplier decision quickly, and to see *why* the system reached a conclusion.

**What the Founder does in Supplier Intelligence:**
- Scans supplier standing at a glance — who is Strategic, who is at risk, what changed recently
- Reviews and approves supplier classification and lifecycle transitions
- Interrogates the basis of any risk or compliance signal before relying on it
- Retains institutional knowledge that currently lives outside any system (per `ETA-Procurement-Playbook-v1.md`: over a decade of personal experience, prior quotations, WhatsApp/Telegram/email history, internal Excel lists)

**What the Founder must never encounter:** a conclusion without a traceable basis. Per D4's positioning discipline and this module's purpose, an unexplained score is worse than no score.

### 1.2 Procurement Manager

**Who:** The operational buyer running live sourcing against real requirements.

**Primary need:** "Which suppliers can serve this requirement, and are they usable right now?" Their question is always requirement-first, supplier-second.

**What the Procurement Manager does in Supplier Intelligence:**
- Filters and shortlists suppliers by category, classification, certification, and compliance standing
- Checks whether a candidate supplier is currently usable — lifecycle status, compliance state, open risk
- Reviews relationship history before re-engaging a supplier (past issues, past performance, prior orders)
- Escalates to the Founder or Supplier Manager when a supplier is not qualified but is commercially attractive

**Boundary:** RFQ issuance, quotation comparison, and PO creation are **not** part of MOD-1 — they belong to the D7.3 chain (`Opportunity → RFQ → Quotation → Purchase Order`), none of which is implemented. This role's MOD-1 journey ends at "shortlist identified."

### 1.3 Supplier Manager

**Who:** The owner of supplier master data quality, onboarding, and qualification.

**Primary need:** Keep the supplier record accurate, current, and defensible.

**What the Supplier Manager does in Supplier Intelligence:**
- Onboards new suppliers and advances them through the lifecycle (Draft → Under Review → Approved → Active)
- Maintains identity, classification, certification, and compliance data
- Tracks certificate expiry and compliance review dates before they lapse
- Records relationship events (reviews, issues, certifications, notes) as they occur
- Flags suppliers requiring re-qualification or suspension

**Boundary:** The Supplier Manager maintains the record; the Founder approves classification and lifecycle changes that carry commercial weight. Where that approval line sits precisely is recorded in §7.

### 1.4 Role Interaction Summary

| Activity | Founder | Procurement Manager | Supplier Manager |
|---|---|---|---|
| Scan supplier portfolio standing | Primary | Secondary | Secondary |
| Shortlist suppliers for a requirement | Occasional | **Primary** | Supporting |
| Maintain supplier master data | — | — | **Primary** |
| Advance supplier lifecycle | **Approves** | — | Initiates |
| Set / change classification | **Approves** | Recommends | Recommends |
| Record relationship events | Occasional | Occasional | **Primary** |
| Interrogate a risk or compliance signal | **Primary** | Primary | Primary |

---

## 2. Supplier Intelligence Purpose

### 2.1 Why the module exists

Per `Supplier Entity.md` (ETA-ENT-SUPPLIER-001, Approved), the Supplier entity exists to centralize supplier information, support strategic sourcing, evaluate supplier performance, manage procurement relationships, reduce supplier risks, **preserve supplier knowledge**, and eventually enable AI-assisted supplier recommendations. Its stated long-term vision is to become *"the enterprise supplier intelligence hub."*

Per `MOD-1-Supplier-Intelligence.md`, MOD-1 was sequenced first because it is the closest module to ETA's real business operation, creates the foundational supplier data other modules depend on, and creates immediate commercial value.

### 2.2 The business problem, stated plainly

`ETA-Procurement-Playbook-v1.md` §2 describes how supplier shortlists are actually built today: *"simultaneously from over a decade of personal experience, previous quotations and POs, previously successful suppliers, existing contacts, manufacturers, authorized distributors, international trading companies, LinkedIn, Google, Alibaba, Made-in-China, trade fairs, industry references, customer recommendations, previous tender documents, internal Excel lists, WhatsApp/Telegram/email history, and eventually CRM/Odoo records."*

That knowledge is real, valuable, and almost entirely **outside any system**. Supplier Intelligence's purpose in MVP form is to give that knowledge a structured, queryable, durable home.

### 2.3 What MOD-1 MVP is

**A trustworthy supplier record and a defensible qualification state.** Specifically, per D7.2: who the supplier is (Identity), what standing ETA assigns them (Classification), what they are certified to do (Certifications), whether they are cleared to trade (Compliance Status), what exposure they carry (Risk Level), and what has happened between ETA and them over time (Relationship History).

### 2.4 What MOD-1 MVP is explicitly not

Per D7.2, the following are **outside MVP scope** and must not appear in this module's UX, data, or interface:

- **Commercial Performance** — `total_rfqs`, `total_quotations`, `total_purchase_orders`, `on_time_delivery_rate`, `quality_score`, `overall_supplier_score`, and the rest of that 10-field block. These derive from RFQ, Quotation, PO, and Shipment records that do not exist.
- **AI Metadata** — `ai_summary`, `ai_risk_score`, `ai_supplier_score`, `ai_recommendation`, `ai_classification`, `ai_confidence`, `embedding_id`, `knowledge_graph_node`. Behind the standing AI automation Change Request gate.
- **Advanced Supplier Scoring** — any computed composite score, ranking, or automated recommendation.

Each requires a future Change Request or later Phase approval.

> **Naming discipline:** because scoring is out of scope, the MVP must not present *any* number that reads as a computed judgment. The existing `rating` field (1–5) predates this scope and is **not** an approved MVP intelligence field — whether it appears at all is recorded in §7.

### 2.5 Success criteria (business, not technical)

MOD-1 MVP succeeds if:
1. A Procurement Manager can answer "can I use this supplier for this requirement, right now?" without leaving the module.
2. A Supplier Manager can bring a new supplier from first contact to Active with every qualification step recorded.
3. The Founder can challenge any classification, compliance state, or risk level and immediately see what it is based on.
4. Supplier knowledge that currently exists only in personal memory and message history has a structured place to live.
5. No screen presents a conclusion the underlying data cannot support.

---

## 3. MVP Information Architecture

Two surfaces. Nothing more is in MOD-1 MVP scope.

```
┌──────────────────────────────────────────────────────────────────┐
│  SUPPLIER DIRECTORY                          (list surface)      │
│  "Which suppliers exist, and which ones can I use?"              │
│                                                                  │
│  · Identity summary per supplier                                 │
│  · Classification + Lifecycle standing                           │
│  · Compliance state + Risk level (at-a-glance)                   │
│  · Filter / search: category, classification, lifecycle,         │
│    compliance, risk, certification held, country                 │
│  · Entry point to a single supplier                              │
└───────────────────────────┬──────────────────────────────────────┘
                            │  select a supplier
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│  SUPPLIER PROFILE                            (detail surface)    │
│  "Everything ETA knows about this supplier, and why."            │
│                                                                  │
│  4.1  Identity            — who they are                         │
│  4.2  Classification      — what standing ETA assigns            │
│  4.3  Certifications      — what they are certified to do        │
│  4.4  Compliance Status   — whether they are cleared to trade    │
│  4.5  Risk Level          — what exposure they carry             │
│  4.6  Relationship History— what has happened over time          │
└──────────────────────────────────────────────────────────────────┘
```

### 3.1 Architecture principles

1. **Two surfaces only.** Directory answers "which supplier"; Profile answers "what about this supplier." No third surface is in MVP scope.
2. **The Directory is a decision tool, not a table dump.** Its job is narrowing a set to a shortlist. Every column and filter must earn its place against that job.
3. **The Profile is evidence, not summary.** Each section must show its basis. A compliance state without a review date, or a risk level without a stated reason, fails §2.5 criterion 5.
4. **Qualification state is always visible.** Whether a supplier is currently usable must never require navigation to discover.
5. **Nothing computed.** Every value displayed in MVP is recorded by a person or derived directly from a recorded fact — never calculated into a judgment.
6. **Relationship History is chronological and append-only in intent.** It is a record of what happened, not an editable summary of what someone currently believes.

### 3.2 Existing surfaces (context, not authorization)

`src/pages/suppliers/SupplierList.tsx` and `SupplierDetail.tsx` already exist, mock-data-driven, from earlier work. `SupplierPortal.tsx` also exists and is a **separate concern** — supplier-facing onboarding, not ETA-facing intelligence — and is out of MOD-1 MVP scope. This document defines the target UX independently; how much of the existing implementation satisfies it is an implementation-time question, not settled here.

---

## 4. Supplier Profile UX Sections

Six sections, one per D7.2 in-scope item. For each: purpose, information required, role relevance, and known constraint.

---

### 4.1 Identity

**Purpose:** Establish unambiguously who this supplier is, as a legal and commercial entity.

**Information required:**
- Supplier code — the human-facing business key (existing format: `SUP-000125`)
- Company name
- Supplier category — one of the 8 Approved values: Manufacturer, Distributor, Trading Company, Service Provider, Logistics Provider, OEM, EPC Contractor, Consultant
- Country
- Contact points — email, phone, website
- Lifecycle status — one of the 7 Approved values: Draft, Under Review, Approved, Active, Suspended, Inactive, Archived
- Record provenance — when created, and (per §7) by whom

**Role relevance:** All three roles. This is the section every other section hangs from.

**Known constraint:** `supplier_code` and `country` exist in the TypeScript type and mock data but have **no column** in the Supabase migration (verified). Both are MVP-critical identity fields. This is recorded alignment debt from `PHASE6-BUSINESS-ENTITY-DATA-GOVERNANCE-REVIEW.md`, resolved under D7.2's rule that `Supplier Attributes.md` is the authoritative field set.

**Boundary:** Blueprint defines ~20 Company Information attributes (legal name, trade name, registration number, tax number, VAT number, parent company, establishment year, address, province, city, postal code). Which of these are MVP identity is recorded in §7 — this document does not silently select a subset.

---

### 4.2 Classification

**Purpose:** Record the standing ETA assigns this supplier — a deliberate commercial judgment, not a computed rating.

**Information required:**
- Classification value — Strategic, Preferred, Approved, or Conditional
- Basis for the classification — why this standing was assigned
- Who assigned it, and when
- Change history — classification is a decision, and decisions have provenance

**Role relevance:** Founder approves. Supplier Manager and Procurement Manager may recommend. Procurement Manager consumes it as a primary shortlist filter.

**Known constraint:** Classification is a **judgment**, and the MVP has no scoring to justify it (D7.2 excludes Advanced Supplier Scoring). The UX must therefore make the *human basis* explicit — a classification with no recorded reason is exactly the "conclusion without traceable basis" §1.1 prohibits.

**Boundary:** `Supplier Attributes.md` also defines `preferred_supplier` and `strategic_supplier` as separate booleans, alongside `supplier_rating` (Decimal). Whether the 4-value classification enum supersedes those booleans, or coexists with them, is recorded in §7.

---

### 4.3 Certifications

**Purpose:** Record what this supplier is independently certified to do — the technical qualification evidence behind any sourcing decision.

**Information required:**
- Which certifications are held
- Validity — issue and expiry dates
- Expiry visibility — an expired certification must be visibly distinct from a held one
- Supporting evidence — the certificate document itself
- Manufacturer authorization, where the supplier is an authorized distributor rather than the maker

**Role relevance:** Supplier Manager maintains and monitors expiry. Procurement Manager filters by certification held (an ASME requirement disqualifies uncertified suppliers immediately). Founder reviews at qualification.

**Known constraint — unresolved:** The Blueprint defines certifications as **10 discrete fields** (`iso_9001`, `iso_14001`, `iso_45001`, `api_certification`, `asme_certification`, `ce_certification`, `atex_certification`, `iecex_certification`, `manufacturer_authorization` as booleans, plus `certificate_expiry` as a single date). The implementation uses a **string array** (`certifications: string[]`). These are materially different models: a boolean set cannot carry per-certificate expiry; a single shared `certificate_expiry` cannot express that ISO 9001 expires in March and API in November. Neither form is decided — recorded in §7 and carried from D7's Non-Decisions.

**Boundary — document storage:** Certificates are documents. ETA-Blueprint has **no document management entity** (carried gap from `PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §3 Phase 6.1). Whether MVP stores certificate files, or only records that a certification is held, is recorded in §7.

---

### 4.4 Compliance Status

**Purpose:** Answer one question definitively — is this supplier cleared for ETA to trade with?

**Information required:**
- Compliance state — compliant, under review, or non-compliant
- When the state was last reviewed
- When it next expires or requires re-review
- Who approved the current state
- Compliance notes — the recorded reasoning
- What is blocked while non-compliant

**Role relevance:** Procurement Manager treats this as a **hard gate** — a non-compliant supplier cannot be shortlisted regardless of how attractive they are commercially. Supplier Manager maintains. Founder approves exceptions, if exceptions are permitted at all (§7).

**Known constraint:** `compliance_status` exists in the TypeScript type and mock data but has **no column** in the Supabase migration (verified). The Blueprint's fuller compliance block (`kyc_status`, `aml_status`, `sanction_status`, `compliance_review_date`, `compliance_expiry_date`, `approved_by`, `compliance_notes`) is absent from every implemented layer.

**Boundary:** Which compliance sub-states are MVP is recorded in §7. Sanction screening in particular has real operational weight for ETA's international sourcing and is not something to infer into scope silently.

---

### 4.5 Risk Level

**Purpose:** Communicate exposure — what could go wrong in relying on this supplier.

**Information required:**
- Risk level — low, medium, or high
- **Stated reason** — what drives this level
- Who assessed it, and when
- When it was last reviewed
- Change history

**Role relevance:** Founder interrogates it most. Procurement Manager weighs it against commercial upside. Supplier Manager maintains it.

**Known constraint — this is the section most vulnerable to overclaiming.** D7.2 excludes AI Metadata (including `ai_risk_score`) and Advanced Supplier Scoring from MVP. Risk Level in MVP is therefore an **explicit human assessment**, and the UX must make that unmistakable. Presenting a human-entered risk level in a way that implies computation would violate §2.5 criterion 5 and the Founder's stated need in §1.1.

**Boundary:** The Blueprint's `financial_risk_score`, `credit_rating`, and `financial_rating` sit in the Financial Information block — not in MVP scope. Risk Level in MVP is a single qualitative assessment, not a financial risk model.

---

### 4.6 Relationship History

**Purpose:** Preserve what has actually happened between ETA and this supplier over time — the institutional memory §2.2 identifies as the core problem.

**Information required:**
- Chronological event record
- Event type — the existing mock model uses: onboarded, order, review, certification, issue, note
- Event date, title, and description
- Who recorded it
- Visible distinction for events that matter to qualification (an unresolved issue is not a note)

**Role relevance:** Procurement Manager checks it before re-engaging a supplier — past issues are the highest-value content here. Supplier Manager records events as they occur. Founder uses it as the memory layer that currently lives in personal recall and message history.

**Known constraint — unresolved:** Relationship History is **in MVP scope per D7.2** but has **no entity definition and no table** anywhere. `getSupplierRelationshipHistory()` is hard-coded to return mock data, with an in-code comment stating no relationship-history table exists. Whether it is an attribute set of Supplier or a distinct entity is undecided — recorded in §7 and carried from D7's Non-Decisions.

**Boundary:** Relationship History records **events**, not performance metrics. Counting orders to derive an on-time-delivery rate would cross into Commercial Performance, which D7.2 excludes.

---

## 5. AI Assistant Interaction Points

### 5.1 Governing boundary — read before this section

Per **D6.3 (Approved)**: Google AI Studio may be used **only for prototype exploration** of Supplier Intelligence, Tender Analysis, and AI Procurement Assistant concepts. Implementation remains blocked until Business Requirement, Functional Requirement, API/Data decision, UI decision, Component decision, and Test criteria are **all** defined and approved.

Per **D7.2 (Approved)**: AI Metadata and Advanced Supplier Scoring are **outside MOD-1 MVP scope**.

Therefore, everything in §5 defines **where AI could assist and what it would need** — nothing more. This section:
- Authorizes no AI implementation
- Creates no prototype (none has been created; **no AI Studio work has been started**)
- Adds no AI feature to MOD-1 MVP
- Introduces no API key, endpoint, or model configuration into ETA-Platform (prohibited by D6.3/D6.4)

Each interaction point below is a **candidate for Gemini-based exploration**, sequenced behind its own approval.

### 5.2 Candidate interaction points

#### A. Supplier Analysis

**Where:** Supplier Profile — a summarizing assist across sections.

**What it could do:** Produce a plain-language summary of a supplier's current standing from data already recorded — identity, classification, certifications held and expiring, compliance state, open risk, and notable relationship events.

**Human approval point:** The summary is **advisory and never persisted as a supplier attribute** in MVP. Persisting it would create `ai_summary`, which D7.2 excludes.

**Dependency:** Requires §4.1–§4.6 to hold real data. Against mock data it would summarize fiction.

#### B. Risk Explanation

**Where:** Supplier Profile → Risk Level (§4.5).

**What it could do:** Explain *why* a recorded risk level is plausible, given certifications, compliance state, country, and relationship history — surfacing the factors a human assessor would weigh.

**Human approval point:** **Explanation only — never assignment.** The risk level remains a human assessment (§4.5). An AI that sets or adjusts risk level is `ai_risk_score` plus Advanced Supplier Scoring — both excluded by D7.2, both requiring a Change Request.

**Dependency:** Requires the scoring methodology question in §7 to be resolved first — an explanation of an undefined methodology explains nothing.

#### C. Document Review

**Where:** Supplier Profile → Certifications (§4.3), and any future qualification document flow.

**What it could do:** Extract structured fields from uploaded certificates and qualification documents — certificate type, issuing body, issue and expiry dates, scope of certification — to reduce manual entry and catch lapsing certificates.

**Human approval point:** **Every extracted value is proposed, never committed.** A Supplier Manager confirms each field before it becomes supplier data. Certificate expiry drives compliance gating; a silently wrong extraction would gate real sourcing decisions incorrectly.

**Dependency:** Blocked twice over. First, MVP has no document storage (§4.3 boundary). Second, ETA-Blueprint has no document management entity — a carried gap from Phase 6.1. Neither is resolved by this document.

#### D. Qualification Assistance

**Where:** Supplier lifecycle progression (Draft → Under Review → Approved → Active), primarily Supplier Manager workflow.

**What it could do:** Identify what is missing or expiring before a supplier can advance — absent certifications for a claimed category, lapsed compliance review, incomplete identity fields, unresolved relationship issues.

**Human approval point:** **Advisory checklist only.** Lifecycle advancement stays a human decision with Founder approval where classification carries commercial weight (§1.4). AI may surface the gap; it may not clear it.

**Dependency:** Requires the qualification rules themselves to be defined — what "complete" means per category. No Approved Blueprint document currently specifies this. Recorded in §7.

### 5.3 Interaction-point summary

| # | Interaction point | AI role | Human approval point | Status |
|---|---|---|---|---|
| A | Supplier Analysis | Summarize recorded data | Advisory; never persisted | Exploration candidate |
| B | Risk Explanation | Explain a human-assigned level | Never assigns or adjusts risk | Exploration candidate — blocked on §7 methodology |
| C | Document Review | Extract fields from certificates | Every field confirmed before commit | Exploration candidate — blocked on document storage + entity |
| D | Qualification Assistance | Surface gaps before advancement | Advisory; human advances lifecycle | Exploration candidate — blocked on undefined qualification rules |

**Common principle across all four: AI proposes, a human disposes.** Every point produces something a person confirms, and no point writes a supplier attribute autonomously in MVP.

---

## 6. Data Traceability

Each UX section mapped to its Blueprint entity basis, governing approved decision, and future implementation dependency.

| UX Section | Blueprint Entity | Approved Decision | Future Implementation Dependency |
|---|---|---|---|
| **4.1 Identity** | `Supplier Entity.md` (ETA-ENT-SUPPLIER-001) — Supplier Master Data; `Supplier Attributes.md` (ETA-ENT-SUPPLIER-002) — Company Information (~20 attrs), Contact Information (9 attrs) | **D7.1** — Supplier is Canonical. **D7.2** — Supplier Identity in MVP scope | `supplier_code` and `country` have no DB column. Blueprint attribute subset undefined (§7-1). Requires API + data decision before UI |
| **4.2 Classification** | `Supplier Entity.md` — Supplier Categories (8 values), Supplier Status (7 lifecycle states); `Supplier Attributes.md` — Commercial Information (`preferred_supplier`, `strategic_supplier`, `supplier_rating`) | **D7.2** — Supplier Classification in MVP scope; Advanced Supplier Scoring excluded. **D7.2 rules 2–3** — Approved 7-state lifecycle and 8-category enum are authoritative | `classification` and `lifecycle_status` have no DB column. `suppliers.status` CHECK permits only 3 values vs. Approved 7. Enum-vs-boolean overlap unresolved (§7-2) |
| **4.3 Certifications** | `Supplier Attributes.md` — Certifications block (10 fields); `Supplier Entity.md` — Certifications responsibility | **D7.2** — Certifications in MVP scope. **D7 Non-Decisions** — Certifications representation explicitly left open | Blueprint 10-boolean model vs. implemented string array unresolved (§7-3). No document management entity. Per-certificate expiry unsupported by either current form |
| **4.4 Compliance Status** | `Supplier Attributes.md` — Compliance Information block (8 fields); `Supplier Entity.md` — Compliance Information responsibility; `02-BLUEPRINT/Domains/Compliance Domain.md` | **D7.2** — Compliance Status in MVP scope | `compliance_status` has no DB column. KYC/AML/sanction sub-states absent from all layers. Sub-state MVP scope undefined (§7-4) |
| **4.5 Risk Level** | `Supplier Entity.md` — Risk Assessment responsibility; `Supplier Attributes.md` — `financial_risk_score` (Financial block, out of scope), `ai_risk_score` (AI Metadata, excluded) | **D7.2** — Risk Level in MVP scope; **AI Metadata and Advanced Supplier Scoring excluded**. **D6.3** — AI exploration only | `risk_level` has no DB column. Assessment methodology undefined (§7-5). Must remain human-assessed — any computation crosses into excluded scope |
| **4.6 Relationship History** | **No entity definition exists.** `Supplier Entity.md` names "Supplier Performance" and relationship management as responsibilities, but no relationship-history entity or attribute set is defined | **D7.2** — Relationship History in MVP scope; **D7.2 rule 4** — entity home must be declared before implementation. **D7 Non-Decisions** — entity home explicitly left open | No entity, no table, no attribute definition. `getSupplierRelationshipHistory()` hard-coded to mock. Blocks implementation until §7-6 resolved |
| **§5 AI Interaction Points** | `Supplier Entity.md` — AI Integration section (Supplier Ranking, Vendor Recommendation, Risk Assessment, Supplier Scoring); `Supplier Attributes.md` — AI Metadata block (8 fields); `02-BLUEPRINT/Domains/AI Domain.md` | **D6.3** — AI Studio exploration permitted for Supplier Intelligence. **D7.2** — AI Metadata and Advanced Supplier Scoring **excluded from MVP** | Exploration only. Implementation requires BR + FR + API/Data + UI + Component + Test decisions (D6.3), plus AI automation Change Request. No API keys in ETA-Platform (D6.3/D6.4) |

### 6.1 Cross-cutting dependencies

| Dependency | Affects | Status |
|---|---|---|
| Supabase provisioning + migration reconciliation | All six sections (7 of 17 type fields have no column) | Unresolved — carried from `PHASE6-CURRENT-STATE-AUDIT.md`; migration explicitly not authorized by D7 |
| Component library formal sign-off against `Components.md` | All UI work | Unresolved — product screens remain "define workflow, do not build" |
| Role / authorization model | §1 role distinctions | Not implemented — schema is single-tenant, no auth (§7-7) |
| Document management entity | §4.3 certificates, §5 point C | Unresolved — carried gap from Phase 6.1 |
| RTL readiness | All sections | Standing requirement; 6 open RTL sub-decisions carried from prior phases |
| D7.3 procurement chain | Procurement Manager journey boundary | RFQ/Quotation/PO unimplemented; alignment debt not to be corrected now |

---

## 7. Open Questions

Unresolved items requiring decision before or during implementation. No recommendations offered.

### Explicitly carried from D7 Non-Decisions (unchanged)

1. **Certification data model** — Is the target form the Blueprint's 10 discrete boolean fields plus a single `certificate_expiry`, the implemented `certifications: string[]`, or a third structure supporting per-certificate issue/expiry dates and evidence? None is decided. *(D7 Non-Decision — carried verbatim.)*
2. **Relationship History entity** — Is it an attribute set of Supplier, or a distinct entity with its own definition? It is in MVP scope with no entity, no table, and no attribute definition anywhere. *(D7 Non-Decision — carried verbatim.)*
3. **AI scoring methodology** — What methodology, if any, underlies Risk Level? MVP treats it as a human assessment, and D7.2 excludes computed scoring — but §5 point B (Risk Explanation) cannot be explored coherently until the basis being explained is defined. *(D7 Non-Decision — carried verbatim.)*

### Identity and attribute scope

4. Which of the Blueprint's ~20 Company Information and 9 Contact Information attributes constitute MVP Identity (§4.1)? D7.2 approved "Supplier Identity" as a scope item without enumerating its fields.
5. Does the 4-value `classification` enum (Strategic / Preferred / Approved / Conditional) supersede the Blueprint's separate `preferred_supplier` and `strategic_supplier` booleans, or coexist with them (§4.2)?
6. Does the existing `rating` (1–5) field appear in MVP at all? It is not an approved D7.2 intelligence field, and displaying it risks reading as the computed score D7.2 excludes (§2.4).

### Compliance and qualification

7. Which compliance sub-states are MVP — `compliance_status` alone, or also `kyc_status`, `aml_status`, `sanction_status` (§4.4)? Sanction screening carries real operational weight for international sourcing.
8. Can a non-compliant supplier ever be shortlisted by exception, and if so who authorizes the exception (§4.4)?
9. What defines "qualified" per supplier category? No Approved document specifies qualification completeness rules, which §5 point D depends on.
10. Where exactly is the Founder-approval line for lifecycle advancement and classification change (§1.4)?

### Lifecycle and state

11. Do `lifecycle_status` (7 Approved states) and `status` (3 current values) coexist as distinct concepts, or does one supersede the other? *(D7.2 rule 2 requires this be declared explicitly at implementation time.)*
12. Are lifecycle transitions constrained (e.g. may an Archived supplier return to Active), and is transition history retained?

### Access and roles

13. Does MOD-1 require a real role/authorization model, or do the three §1 roles remain UX personas against a single-tenant, no-auth system? The current schema has no auth and no roles.
14. If roles become real, does Relationship History record the acting user, and does that dependency block §4.6?

### Documents and evidence

15. Does MVP store certificate documents, or only record that a certification is held (§4.3)? Storage requires the unresolved document management entity.
16. What is the retention and supersession model for an expired certificate — retained as history, or replaced?

### AI exploration boundary

17. Does AI Studio exploration of §5 proceed now, or wait until §4.1–§4.6 hold real data? Exploration against mock data would explore fiction. *(D6.3 permits exploration; it does not require it to start immediately.)*
18. Do §5's four interaction points require individual Founder approval to explore, or does D6.3's blanket Supplier Intelligence permission cover all four?
19. If a Gemini prototype produces a genuinely useful output form, what is the review path from exploration to Business Requirement? D6.6 defines the pipeline; the evidence standard for passing Founder Review is not specified.

---

## 8. What Must Happen Before Any Implementation

Stated as gates, not as a plan. This document authorizes none of them.

1. **Founder approval of this UX definition** — Step 7 of the Phase 6 workflow (approval package).
2. **Open Questions §7-1, §7-2 resolved at minimum** — Certifications and Relationship History are both in MVP scope with no decided data model; neither can be implemented as-is.
3. **Component library sign-off against `Components.md`** — product screens remain gated until this happens.
4. **Supabase provisioning and migration reconciliation decision** — 7 of 17 Supplier type fields have no column, including 5 of the 6 MVP intelligence items. Not authorized by D7.
5. **BR → FR → API → UI → CMP → TEST** — per `PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §5. This document is input to BR/FR only.
6. **Claude Code as sole implementation agent** — per D5.2 / D6.1.

---

*Business UX definition only. No UI component, React code, Supabase change, database schema, Stitch file, or AI Studio prototype was created — and no Stitch or AI Studio session was started. Every factual claim about current platform state was verified in `PHASE6-BUSINESS-ENTITY-DATA-GOVERNANCE-REVIEW.md` and `PHASE6-CURRENT-STATE-AUDIT.md` (both 2026-08-11). MVP boundary set by D7.2 (Approved) and not extended anywhere in this document. AI interaction points defined under D6.3's exploration-only permission and authorize no implementation.*
