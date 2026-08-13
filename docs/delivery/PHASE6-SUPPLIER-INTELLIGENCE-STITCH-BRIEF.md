---
title: Phase 6 — Supplier Intelligence Google Stitch Exploration Brief
document_id: ETA-PHASE6-SI-STITCH-001
status: Brief — controlled input specification; Founder-confirmed and execution-ready. Execution blocked in this session (see §10).
date: 2026-08-11
revision: >
  v1 (2026-08-11) — initial brief, two items flagged for Founder confirmation.
  v2 (2026-08-11) — Founder confirmations applied: brand palette confirmed Navy/Copper (§5.1);
  Risk Level confirmed IN scope as a human/manual qualification attribute (§4.2.6). Execution
  status and blocker documented (§10).
authority: >
  ETA-Blueprint/13-DECISIONS/ETA-AI-TOOLING-WORKFLOW-EXPANSION-DECISION-D6.md (D6, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-BUSINESS-ENTITY-ALIGNMENT-DECISION-D7-PROPOSAL.md (D7, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-PROTOTYPE-DATA-GOVERNANCE-DECISION-D8-PROPOSAL.md (D8, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-PLATFORM-IDENTITY-AI-WORKFLOW-DECISION-D5.md (D5, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md (D1, D4, Approved),
  ETA-Blueprint/20-BRANDING/04-Visual-Identity/Colors.md (ETA-VISUAL-001, Approved),
  ETA-Platform/docs/delivery/PHASE6-SUPPLIER-INTELLIGENCE-UX-DEFINITION.md,
  Founder confirmation, this session, 2026-08-11
scope: >
  Controlled input specification for a Google Stitch exploration session. No UI code, React,
  components, or Stitch execution. No Stitch session has been started — see §10 for execution
  status. This document defines what would be given to Stitch and what would be asked of it.
data_governance: >
  Per D8.1/D8.2 (Approved): this brief supplies synthetic fictional supplier examples only.
  No real supplier data, no real or real-resembling company names, and no content drawn from
  ETA-Platform/src/lib/mockData.ts in any form. mockData.ts is not referenced as a data source
  anywhere in this brief and remains unmodified.
---

# Phase 6 — Supplier Intelligence Google Stitch Exploration Brief

## 0. What This Document Is

Step 5 of the approved Phase 6 preparation workflow. This is the **controlled input specification** for a Google Stitch exploration session — the brief that would be handed to Stitch, plus the constraints and synthetic data that session must operate under.

It is not a design, not a specification for implementation, and not code. **No Stitch session has been started** — see §10 for execution status.

### 0.1 Governing constraints (restated so they are not rediscovered mid-session)

**From D6.2 (Approved):**
- Stitch is a **temporary UI/UX exploration tool** while Figma is unavailable.
- Stitch output is **exploration material only — never production code**.
- Stitch output may **never be copied or ported directly into ETA-Platform** in any form.
- Any Stitch exploration must be reviewed and approved before any implementation follows from it.

**From D8.1 / D8.2 (Approved):**
- Only **synthetic** or **anonymized** datasets may be given to Stitch. This brief uses synthetic.
- **Prohibited:** current `mockData.ts` records, real supplier names, and fabricated compliance/risk/rating values attached to a named or identifiable organization.
- The synthetic examples in §7 exist so that no one needs to reach for `mockData.ts`.

**From D7.2 (Approved) — MVP scope boundary:**
- In scope: Supplier Identity, Supplier Classification, Certifications, Compliance Status, **Risk Level**, Relationship History.
- Out of MVP scope: **Commercial Performance, AI Metadata, Advanced Supplier Scoring**.

**From D5.2 / D6.1 (Approved):**
- Claude Code is the sole production implementation agent. Nothing Stitch produces may be implemented by any other route.

**From `PHASE6-PLATFORM-EXECUTION-STRATEGY.md` §5:**
- Implementation requires BR → FR → API → UI → CMP → TEST. This brief feeds exploration, which feeds BR/FR. It does not shortcut either.

### 0.2 Founder confirmations — both resolved (2026-08-11)

**(a) Brand system — CONFIRMED.** The approved ETA **digital design system** applies:
- **Primary: ETA Navy `#0F172A`**
- **Accent: ETA Copper `#C57B39`**
- **Green and Orange are not UI system colors** and must not be used as such.
- **Logo colors remain limited to brand mark usage only** — consistent with D1's dual-layer identity, under which UI colors are never inferred from the logo mark.

This resolves the v1 flag. See §5.1.

**(b) Risk Level — CONFIRMED IN SCOPE.** Risk Level remains part of the Supplier Intelligence MVP and **is included in this exploration**. It is a **human/manual qualification attribute only**. It must never be presented as an AI score, a calculated ranking, or an automated judgment. The exploration must show its **value**, its **evidence/basis**, and **last review information**. AI may only *explain* the recorded information — it may never assign Risk Level.

This reverses the v1 exclusion. See §4.2.6.

---

## 1. Prototype Objective

**Answer one question: what should Supplier Intelligence feel like to use?**

Specifically, the exploration should produce enough visual material to judge:

- Does the Supplier Directory feel like a **decision tool** or like a database table? It must feel like the former.
- Can a user tell at a glance whether a supplier is **usable right now**, without navigating?
- Does the Supplier Profile read as **evidence** — showing the basis for each qualification state — or as an unsupported summary?
- Can a **human-assigned** Risk Level be presented so it reads unmistakably as a person's assessment rather than a computed score? (§4.2.6 — this is now one of the harder design questions in the brief.)
- Does the interface carry ETA's intended character: industrial, enterprise, trustworthy, data-driven — and not startup, consumer, or gaming?
- Where does an AI assistant belong in this workflow, and how does it stay visibly **advisory** rather than authoritative?

**What the exploration is explicitly not for:**
- Not for deciding how ETA-Platform is coded, structured, or built
- Not for producing components, tokens, or code to import
- Not for settling any open question recorded in the UX Definition §7 — exploration may inform those decisions, it cannot make them

**Success looks like:** several visual directions that can be compared and discussed at Founder Review, with a clear view of which layout and information hierarchy best serves the three roles in §2.

---

## 2. Target Users

Three roles, from `PHASE6-SUPPLIER-INTELLIGENCE-UX-DEFINITION.md` §1. These are **UX personas**, not an implemented permission model — ETA-Platform has no authentication and no role system today, and this exploration must not depict login, user switching, or permission states (§6).

### 2.1 Founder
Needs fast, trustworthy judgment support. Does not browse — confirms or challenges a supplier decision quickly, and needs to see **why** the system reached any conclusion. **Must never encounter a conclusion without a visible basis.** This is the single strongest design constraint in the brief, and it applies most sharply to Risk Level and Classification.

### 2.2 Procurement Manager
Requirement-first, supplier-second. Asks: *"Which suppliers can serve this requirement, and are they usable right now?"* Filters and shortlists; checks whether a candidate is currently usable; reviews relationship history before re-engaging. Their journey in this exploration **ends at "shortlist identified"** — RFQ, quotation, and PO belong to a chain that does not exist yet (D7.3) and must not appear.

### 2.3 Supplier Manager
Owns supplier master data quality, onboarding, and qualification. Maintains identity, classification, certification, compliance, and risk data; tracks expiry and review dates before they lapse; records relationship events as they occur.

---

## 3. Data To Use — Synthetic Only

Per **D8.1/D8.2 (Approved)**, this exploration uses **synthetic fictional suppliers only**. The examples in §7 are provided for exactly this purpose.

**Conventions that make the synthetic data unmistakable:**
- Supplier codes use a **`SYN-` prefix**, structurally distinct from ETA's real `SUP-` format (e.g. real: `SUP-000125`; synthetic: `SYN-0001`)
- Company names are invented and do not correspond to, or resemble, any real organization
- Every screen produced must carry a visible **"Synthetic prototype data"** label

**Absolutely prohibited as input (D8.2):**
- Any content from `ETA-Platform/src/lib/mockData.ts`, in whole or in part
- Any real supplier, manufacturer, customer, or competitor name — or any name close enough to be resolved to one
- Any fabricated compliance, risk, rating, or certification value attached to a named or identifiable real organization

---

## 4. Screens To Explore

Three screens. Nothing beyond them.

---

### 4.1 Screen A — Supplier Directory

**Question this screen answers:** *"Which suppliers exist, and which ones can I use?"*

**Primary user:** Procurement Manager. Secondary: Founder (portfolio scan), Supplier Manager (maintenance entry point).

#### Include

**Search**
- Search across supplier name, supplier code, and category
- Behavior when results are empty, and when a search is in progress

**Filtering**
- Category — one of 8 approved values: Manufacturer, Distributor, Trading Company, Service Provider, Logistics Provider, OEM, EPC Contractor, Consultant
- Classification — Strategic, Preferred, Approved, Conditional
- Lifecycle status — Draft, Under Review, Approved, Active, Suspended, Inactive, Archived
- Compliance state — compliant, under review, non-compliant
- Certification held — e.g. "has ISO 9001", "has API certification"
- Country
- How multiple active filters are shown, and how they are cleared

**Supplier cards / list**
- **Explore both a card layout and a dense list/table layout, and show them side by side.** Which suits an industrial procurement audience better is a genuine open question this exploration should help answer — the card form reads more scannable, the dense form more enterprise. Do not pre-commit to one.
- Per supplier: name, supplier code, category, country, classification, lifecycle status, compliance state
- How a **Suspended** or **non-compliant** supplier is visually distinguished from a usable one

**Qualification indicators**
- A clear, at-a-glance signal of whether a supplier is **currently usable**
- Certification presence (which certifications are held)
- **Expiry warning** — a certification or compliance review approaching or past its date must be visibly distinct. This is a real operational need, not decoration.
- Compliance state as a **hard gate** — a non-compliant supplier should read as unavailable, not merely as a lower-ranked option

**Risk Level in the Directory — explore, do not assume**
- The qualitative Risk Level (low / medium / high) is an approved MVP attribute and **may** appear as a recorded indicator here.
- **It must never appear as a number, a score, a grade, or a sort order.** No ordering suppliers by risk, no "riskiest first," no numeric badge.
- **Open exploration question:** does surfacing Risk Level in a list view help a Procurement Manager shortlist, or does it invite exactly the ranking behavior D7.2 excludes? Show a variant with it and a variant without, so the comparison can be judged rather than assumed.

**Evidence availability**
- Whether supporting evidence exists for a supplier's claims — e.g. "certificate on file" vs. "certification claimed, no document"
- This directly serves the Founder's constraint in §2.1. A supplier whose certifications are unevidenced should be visibly different from one whose are documented.
- **Note:** ETA has no document storage today and no document management entity (UX Definition §4.3). This explores *how evidence availability would be communicated*, not a working document system.

#### Do NOT include
- **AI score** — any AI-generated number, grade, or confidence value (D7.2 excludes AI Metadata)
- **Risk score** — any numeric risk value. The qualitative Risk *Level* is permitted per above; a risk *score* is not (D7.2 excludes Advanced Supplier Scoring)
- **Automatic ranking** — no "best match", no sorted-by-quality ordering, no recommended-supplier badge, no implied ordering by fitness or risk
- The existing 1–5 `rating` field — it is not an approved D7.2 MVP intelligence field, and displaying it risks reading as exactly the computed score D7.2 excludes
- Any count or metric derived from orders, RFQs, or delivery performance (Commercial Performance is out of MVP scope)

> **Design constraint worth stating plainly:** the Directory must help a person narrow a set using **recorded facts** — certifications held, compliance state, and classification and risk assigned by a human. It must never present a machine's opinion of which supplier is better.

---

### 4.2 Screen B — Supplier Profile

**Question this screen answers:** *"Everything ETA knows about this supplier — and why."*

**Primary user:** all three roles, for different reasons.

**Core principle for this screen:** every section shows its **basis**. A compliance state without a review date, a classification without a recorded reason, or a risk level without stated evidence fails the Founder's constraint in §2.1.

#### 4.2.1 Identity
- Supplier code, company name, category, country
- Contact points — email, phone, website
- Lifecycle status, and how a status change is surfaced
- Record provenance — when created, and by whom
- **Explore:** how much identity detail belongs on first view vs. secondary. ETA-Blueprint defines ~20 company-information attributes; which are primary is an open question (UX Definition §7-4).

#### 4.2.2 Classification
- Classification value — Strategic, Preferred, Approved, Conditional
- **The recorded basis for it** — why this standing was assigned
- Who assigned it, and when
- How classification history / change over time is represented
- **Explore:** how to present a human judgment so it reads as a deliberate decision, not a computed grade.

#### 4.2.3 Certifications
- Which certifications are held (e.g. ISO 9001, ISO 14001, ISO 45001, API, ASME, CE, ATEX, IECEx)
- Validity dates — and clear treatment of **expired vs. expiring vs. valid**
- Whether supporting evidence (the certificate document) is on file
- Manufacturer authorization, where the supplier distributes rather than manufactures
- **Explore:** how per-certificate expiry is shown when certifications have *different* expiry dates. The current data model cannot express this (UX Definition §7-1, an open D7 Non-Decision) — the exploration should show what the interface *would need*, which is useful input to that decision.

#### 4.2.4 Compliance Status
- Compliance state — compliant, under review, non-compliant
- When last reviewed; when next due or expiring
- Who approved the current state
- Recorded compliance notes
- **What is blocked while non-compliant** — this must be unambiguous
- **Explore:** how a hard gate reads without being alarmist. A non-compliant supplier is not a failure state to be shouted; it is a fact that blocks sourcing.

#### 4.2.5 Relationship History
- Chronological event record
- Event types: onboarded, order, review, certification, issue, note
- Date, title, description, and who recorded it
- **Visible distinction for events that affect qualification** — an unresolved issue is not a note
- **Explore:** how a long history stays scannable, and how the most consequential events surface without burying the chronology. This is the institutional-memory surface — the reason the module exists (UX Definition §2.2).

#### 4.2.6 Risk Level — human/manual qualification attribute

**Founder-confirmed in scope (§0.2b).** Risk Level is part of the Supplier Intelligence MVP and is explored on this screen.

**It is a human/manual qualification attribute only.**

**Must display:**
- **Risk Level value** — low, medium, or high
- **Evidence / basis** — the recorded reasoning for this level. What did the assessor observe or rely on? This is not optional garnish; without it the section fails §2.1.
- **Last review information** — when the level was last reviewed, and by whom

Also useful to explore: when the next review is due, and how a change in level over time is represented.

**Must NOT be presented as:**
- An **AI score** — no model-generated value, confidence figure, or machine grade
- A **calculated ranking** — no position relative to other suppliers, no ordering by risk
- An **automated judgment** — nothing that implies the system derived this level on its own

**The central design challenge of this section:** Risk Level is exactly the kind of value that interfaces habitually render as a computed metric — a gauge, a meter, a coloured numeric badge, a progress arc. Every one of those visual forms would misrepresent it. The exploration must find a treatment that reads unmistakably as **a person's recorded assessment, with its reasoning attached**.

A useful test: a viewer who has never used the system should be able to tell, from the interface alone, that a human wrote this down and why — not that a machine calculated it.

---

### 4.3 Screen C — AI Assistant Concept Area

**Strictly conceptual.** This screen explores **where an assistant would sit and how it would behave** — it is not a working assistant, not connected to any model, and not an approved feature.

**Governing boundary:** D6.3 permits AI *exploration* only. D7.2 excludes AI Metadata and Advanced Supplier Scoring from MVP. Nothing explored here is approved for implementation.

#### Explore only these three capabilities

**1. Explain supplier information**
- The assistant summarizes and explains what is **already recorded** — identity, classification, certifications held and expiring, compliance state, the recorded risk basis, notable relationship events
- **Explore:** where this lives — a panel, a drawer, an inline element — and how it stays clearly secondary to the supplier record itself

**2. Summarize documents**
- The assistant extracts and summarizes content from an uploaded certificate or qualification document
- **Explore:** how an extracted value is presented as **proposed, awaiting confirmation** — visually distinct from a confirmed supplier attribute
- Every extracted field must read as something a human will confirm, never as something already committed

**3. Assist qualification review**
- The assistant surfaces what is missing or expiring before a supplier could advance in lifecycle
- **Explore:** an advisory checklist form — gaps identified, with the human deciding what to do about them

#### The assistant must NEVER appear to
- **Assign Risk Level** — Founder-confirmed (§0.2b). The assistant may *explain* a recorded risk level and its stated basis. It may never produce, propose, adjust, or imply a risk level of its own.
- **Approve a supplier** — no lifecycle advancement, no classification change, no compliance clearance
- **Modify supplier data** — no field written, updated, or committed by the assistant

#### Required design principle
**AI proposes, a human disposes.** Every assistant output in this exploration must have a visible human decision point attached. An assistant output with no confirm/reject/act-on affordance is a failed exploration, not a simplification.

Also explore: how the assistant conveys **uncertainty and its own basis** — since the Founder's stated need (§2.1) is to see *why*, an assistant that asserts without showing grounds is worse than no assistant.

---

## 5. Visual Direction

### 5.1 Brand colors — Approved palette (Founder-confirmed)

Per `20-BRANDING/04-Visual-Identity/Colors.md` (ETA-VISUAL-001, **Approved**), **D1 (Approved)**, and Founder confirmation 2026-08-11:

- **Primary — ETA Navy `#0F172A`**
- **Accent — ETA Copper `#C57B39`**, used **sparingly** (~10%) for CTAs, highlights, and premium elements
- Neutrals (Graphite / Slate / Steel Gray / Light Steel / Soft Gray / Background) and semantic Success / Warning / Error / Information colors complete the palette — see `Colors.md` for exact values

**Green and Orange are not UI system colors** and must not be used as such. **Logo colors remain limited to brand mark usage only** — per D1's dual-layer identity, the logo mark is a separate layer from the digital design system, and UI colors are never inferred from it.

**Semantic color usage in this exploration:** compliance state, certificate expiry, and Risk Level should use the approved **semantic** colors (Success / Warning / Error / Information), not Copper. Copper is a brand accent, not a status color — using it for "compliant" or for a risk level would both dilute the accent and misuse the token.

### 5.2 Character

**YES — the intended character:**
- **Industrial B2B** — built for petrochemical, oil & gas, steel, and procurement departments
- **Professional** — enterprise software an industrial buyer would trust with a sourcing decision
- **Trust-oriented** — every claim shows its basis; nothing asserted without support
- **Data-driven** — dense, legible, information-first; comfortable with detail

**NO — explicitly wrong for ETA:**
- Startup style — playful illustration, oversized type, marketing-led layout
- Consumer app style — gamified elements, avatars, social affordances, engagement patterns
- Gaming style — dramatic color, motion for its own sake

### 5.3 Typography and layout notes

- English/LTR uses **Inter**; Persian/RTL uses **Vazirmatn**; technical values (supplier codes, certificate numbers, dates) use **JetBrains Mono** and remain **LTR regardless of surrounding text direction**
- **RTL-readiness is a standing ETA requirement.** Layouts explored here must be direction-agnostic in structure — nothing that only works left-to-right. Persian content itself is not required for this exploration, but a layout that cannot mirror is incomplete.
- Density should suit an industrial audience reviewing many suppliers — closer to enterprise data tooling than to consumer dashboards

### 5.4 What must not be invented

Every color, type size, spacing value, radius, and component pattern in eventual **implementation** must resolve to an Approved Blueprint token. Stitch is exploring **feel and information hierarchy**, and is free to explore — but anything it produces that does not map to an approved token is exploration material only, and cannot be carried into implementation on the strength of looking good (D6.2).

---

## 6. Explicit Exclusions

None of the following may appear in any screen produced by this exploration:

| Excluded | Why |
|---|---|
| **Dashboard implementation** | Not in MOD-1 MVP scope; product screens remain gated pending component library sign-off |
| **CRM** | Companies, Contacts, Deals — separate module, and `Company` is alignment debt per D7.1 |
| **Tender module** | D7.1 classifies Tender as **Deferred**; it remains a Blueprint Future Extension with no entity |
| **Odoo** | ERP integration forbidden without a Change Request; boundary undeclared |
| **Supabase** | No database, schema, connection, or persistence concept — this is a UX exploration |
| **Authentication** | No login, sign-in, session, or user-switching screens |
| **Permissions** | No role-based access UI; §2 roles are personas, not an implemented model |
| **Production architecture** | No component specs, no code structure, no technical implementation concepts |

Additionally excluded, from the screen-level rules above:
- AI scores, risk **scores**, and automatic ranking (§4.1) — note the qualitative Risk **Level** is in scope per §4.2.6
- Commercial Performance metrics — order counts, delivery rates, quality scores (D7.2)
- The existing 1–5 `rating` field (§4.1)
- RFQ, Quotation, and Purchase Order surfaces (D7.3 — chain unimplemented)
- Supplier Portal / supplier-facing onboarding (separate concern, out of MOD-1 MVP)

---

## 7. Synthetic Supplier Examples

Provided per **D8.1** so that no one reaches for `mockData.ts`. These organizations are **invented**. Any resemblance to a real company is unintended — and if any name is found to resemble a real organization, it must be replaced before use under D8.2.

All records use the **`SYN-` prefix**, deliberately distinct from ETA's real `SUP-` format.

| Code | Name | Category | Country | Classification | Lifecycle | Compliance | Risk Level | Certifications | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| SYN-0001 | Northwind Valve Works | Manufacturer | Germany | Strategic | Active | Compliant | Low | ISO 9001, ISO 14001, API | On file |
| SYN-0002 | Kestrel Rotating Equipment | OEM | Italy | Preferred | Active | Compliant | Low | ISO 9001, ASME | On file |
| SYN-0003 | Arcadia Instrumentation | Distributor | Türkiye | Approved | Active | Under review | Medium | ISO 9001, ATEX *(expiring)* | Partial — ATEX certificate not on file |
| SYN-0004 | Vantage Sheet & Coil | Trading Company | UAE | Approved | Active | Compliant | Low | ISO 9001 | On file |
| SYN-0005 | Larkspur Flow Control | Manufacturer | India | Conditional | Under Review | Under review | High | ISO 9001 *(expired)* | Expired certificate on file |
| SYN-0006 | Thornbury Gearworks | Manufacturer | United Kingdom | Preferred | Suspended | Non-compliant | High | ISO 9001, ISO 45001 | On file |
| SYN-0007 | Fenwick Logistics Partners | Logistics Provider | Netherlands | Approved | Active | Compliant | Low | ISO 9001 | On file |
| SYN-0008 | Halcyon Engineering Services | Consultant | Spain | Conditional | Draft | Under review | *Not yet assessed* | — | None |

**These records deliberately include the hard cases the interface must handle:**
- **SYN-0003** — a valid supplier with one **expiring** certification and **missing evidence** for it
- **SYN-0005** — an **expired** certification on a Conditional supplier still Under Review
- **SYN-0006** — a **Suspended, non-compliant** supplier that is nonetheless Preferred and well-certified (the interface must make "not usable right now" unmistakable despite otherwise strong signals)
- **SYN-0008** — a **Draft** supplier with no certifications, no evidence, and **no risk assessment yet** (the "not yet assessed" state matters: a human-assigned attribute has a genuine empty state that a computed one would not)

**Synthetic Risk Level detail — for SYN-0003 (Arcadia Instrumentation):**

| Field | Value |
|---|---|
| Risk Level | Medium |
| Basis / evidence | Sole-source for two instrument families; ATEX certificate approaching expiry with no document on file; one documentation delay in the last 24 months, resolved |
| Assessed by | Supplier Manager |
| Last reviewed | 2026-01-15 |
| Next review due | 2027-01-15 |

**Synthetic relationship history — for SYN-0003 (Arcadia Instrumentation):**

| Date | Type | Title |
|---|---|---|
| 2024-03-12 | onboarded | Supplier onboarded and qualified |
| 2024-09-04 | order | First order completed |
| 2025-02-18 | certification | ATEX certification recorded |
| 2025-07-22 | issue | Documentation delay on shipment — resolved |
| 2026-01-15 | review | Annual qualification review completed; risk level set to Medium |
| 2026-06-30 | note | ATEX certificate approaching expiry; renewal requested |

Every screen must display a visible **"Synthetic prototype data"** label.

---

## 8. Stitch Handoff Instructions

### 8.1 The question Stitch is answering

> **"What should Supplier Intelligence feel like?"**

**Not:**

> ~~"How should ETA-Platform be coded?"~~

Everything produced is a **visual and structural proposal for discussion**. Nothing is a specification, a component, or a source of code.

### 8.2 What to produce

- Multiple visual directions for **Screen A**, including both the card and dense-list treatments side by side (§4.1), plus the with-Risk-Level and without-Risk-Level variants
- At least one full **Screen B** layout showing all **six** in-scope sections together, so section balance and hierarchy can be judged
- A dedicated treatment of **Risk Level** (§4.2.6) showing value + basis + last review, in a form that does not read as a computed score
- A **Screen C** concept showing assistant placement and the human decision points, not a working assistant
- Enough variation to make a real comparison possible at Founder Review — a single direction is not an exploration

### 8.3 What happens to the output

Per **D6.2 and D6.6 (Approved)**, the path is fixed:

```
Stitch exploration
        ↓
Founder Review
        ↓
ETA-Blueprint Decision Record (if required)
        ↓
Claude Code Implementation   ← BR → FR → API → UI → CMP → TEST
        ↓
Validation
        ↓
Delivery Closure
```

**Non-negotiable:**
- Stitch output is **never** copied, pasted, exported, or ported into ETA-Platform
- Stitch is **never** connected to the ETA-Platform GitHub repository
- Generated code from Stitch is **not read as a source** for implementation — if a direction is approved, Claude Code re-implements it from scratch against Approved Blueprint tokens
- Stitch output carries **no authority** — it informs a decision, it does not make one

### 8.4 Session readiness

| Item | Status |
|---|---|
| Brand palette (§5.1) | **Confirmed** — Navy `#0F172A` / Copper `#C57B39`; logo colors brand-mark only |
| Risk Level scope (§4.2.6) | **Confirmed** — in scope, human/manual attribute, AI never assigns |
| Synthetic data (§7) | **Ready** — 8 suppliers, risk detail, relationship history |
| Screens defined (§4) | **Ready** — A, B (six sections), C |
| Exclusions defined (§6) | **Ready** |
| D8 data governance | **Approved** — synthetic only |
| Founder authorization to explore | **Given** — 2026-08-11 |
| Execution | **Blocked in this session** — see §10 |

---

## 9. Open Questions This Exploration May Inform (But Cannot Decide)

From `PHASE6-SUPPLIER-INTELLIGENCE-UX-DEFINITION.md` §7. Exploration may produce useful evidence for these; only the Founder decides them.

| Open question | How exploration could inform it |
|---|---|
| **§7-1 Certification data model** (D7 Non-Decision) | Showing what per-certificate expiry actually requires from the interface demonstrates whether the Blueprint's 10-boolean model or the string array can serve the real need |
| **§7-2 Relationship History entity** (D7 Non-Decision) | Exploring how history is displayed clarifies what structure it needs — event-level records vs. a supplier attribute set |
| **§7-3 AI scoring methodology** (D7 Non-Decision) | Now partially informed: §4.2.6 requires Risk Level to display its **basis**, so the exploration surfaces what a human assessment actually needs to record — useful input to whether any methodology should ever be formalized. It does not answer whether AI scoring is adopted. |
| **§7-4 Identity attribute scope** | Laying out the Identity section shows which of ~20 attributes are genuinely primary |
| **§7-6 Whether `rating` appears at all** | Building the Directory without it tests whether anything is actually lost |
| **§7-15 Certificate document storage** | Showing evidence-availability states clarifies whether "on file / not on file" is sufficient, or whether documents must be viewable |

---

## 10. Execution Status — Blocker Documented

Step 5 of the Phase 6 workflow instructs: *"If Stitch is unavailable: document the blocker."* This section records it.

### 10.1 Status

**Google Stitch cannot be executed from this Claude Code session.** No Stitch session has been started, and none can be started from here.

### 10.2 Reason

1. **No Google Stitch connector is available.** The session's tool registry was searched; it exposes Figma, Lovable, Canva, and DesignSync design connectors, but **no Google Stitch integration**. Stitch cannot be driven through a tool interface here.
2. **Browser-driven operation is not viable.** Stitch (`stitch.withgoogle.com`) requires an authenticated Google account. Signing in on the Founder's behalf — entering credentials or completing an authentication flow — is outside what this agent may do, regardless of governance approval.
3. **Governance does not assign Stitch execution to this agent.** D6.2 authorizes Stitch as an exploration tool; D5.2 and D6.1 assign Claude Code the **production implementation** role. Nothing in D5–D8 makes Claude Code the operator of an exploration tool, and §8.3 requires Stitch output to remain isolated from ETA-Platform in any case.

### 10.3 What this means in practice

**The brief is complete and execution-ready.** It is written to be handed directly to Stitch by the Founder — §1 states the objective, §4 defines the screens, §5 the visual direction, §6 the exclusions, §7 supplies compliant synthetic data, and §8 states what to produce and what happens to it.

**Running the session is a Founder action.** This is consistent with how D6 frames exploration tools throughout: they are used, reviewed, and approved by the Founder, and their output enters ETA-Platform only via Claude Code re-implementation after a decision record.

### 10.4 What this agent can do instead, if wanted

None of the following is started, and each would need its own instruction:

- **Package the brief as a Stitch-ready prompt** — condense §1–§7 into paste-ready prompt text sized for Stitch's input, one per screen
- **Prepare the Founder Review structure** — the comparison criteria and review record for evaluating whatever Stitch returns, so review is against stated criteria rather than impression
- **Proceed to Step 6** — the Google AI Studio prototype brief, which is the same kind of controlled input specification for the AI capability exploration (and carries the same execution constraint)
- **Assemble the Step 7 approval package** — current state audit, entity review, UX definition, this brief, and the AI Studio brief, collected for the Founder Approval Gate

---

*Controlled input specification only. No UI code, React, components, or Stitch execution — and no Stitch session has been started (§10). Synthetic data supplied per D8.1; `mockData.ts` is not used as a source and remains unmodified. Governed by D5, D6, D7, and D8 (all Approved). Both v1 flags resolved by Founder confirmation 2026-08-11 and applied in §5.1 and §4.2.6.*
