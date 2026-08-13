---
title: Phase 6 — Supplier Intelligence Stitch Manual Execution Package
document_id: ETA-PHASE6-SI-STITCH-002
status: Execution package — paste-ready prompts for manual Founder-run Stitch session
date: 2026-08-11
authority: >
  ETA-Blueprint/13-DECISIONS/ETA-AI-TOOLING-WORKFLOW-EXPANSION-DECISION-D6.md (D6, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-PROTOTYPE-DATA-GOVERNANCE-DECISION-D8-PROPOSAL.md (D8, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-BUSINESS-ENTITY-ALIGNMENT-DECISION-D7-PROPOSAL.md (D7, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-PLATFORM-IDENTITY-AI-WORKFLOW-DECISION-D5.md (D5, Approved),
  ETA-Blueprint/20-BRANDING/04-Visual-Identity/Colors.md (ETA-VISUAL-001, Approved),
  ETA-Platform/docs/delivery/PHASE6-SUPPLIER-INTELLIGENCE-STITCH-BRIEF.md (v2, Founder-confirmed)
scope: >
  Manual execution package only. Companion to the Stitch Brief — the Brief is the governed
  specification, this document is the paste-ready prompt text derived from it. No architecture
  change, no React code, no UI implementation, no Stitch execution from this session.
how_to_use: >
  Sections 1-9 are the governance record. The fenced blocks marked PASTE BLOCK are the only
  parts intended for copying into Google Stitch. Run them in order: Block 0 (context), then
  Block A, B, C. Block D holds the synthetic dataset if Stitch asks for sample content.
---

# Phase 6 — Supplier Intelligence Stitch Manual Execution Package

> **How to use this document.** Sections 1–9 below are the governance record and the reasoning behind each instruction. The **PASTE BLOCKS** in §10 are the only parts meant to be copied into Google Stitch. Everything else is context for you, not for the tool.
>
> **Why this is manual:** no Google Stitch connector exists in this Claude Code session, and Stitch requires an authenticated Google account that this agent cannot sign into. Blocker recorded in `PHASE6-SUPPLIER-INTELLIGENCE-STITCH-BRIEF.md` §10.

---

# 1. Stitch Mission

**Design exploration only.**

This session exists to answer one question: **what should Supplier Intelligence feel like to use?** Not how it should be built.

| This session IS | This session IS NOT |
|---|---|
| Visual and structural exploration | Production design |
| Material for Founder Review discussion | An ETA-Platform implementation |
| Input to a future Business Requirement | A specification |
| Disposable | A source of code |

**Governing rules (D6.2, Approved):**

- Stitch is a **temporary UI/UX exploration tool** while Figma is unavailable.
- Stitch output is **exploration material only — never production code**.
- Stitch output may **never be copied or ported directly into ETA-Platform**.
- **Stitch is never connected to the ETA-Platform GitHub repository.**
- Any exploration must be reviewed and approved before any implementation follows from it.

**No generated code authority.** Stitch will likely emit HTML/CSS regardless of what it is asked for — that is how the tool works. That code carries **zero authority**. It is not read as an implementation source, not adapted, and not referenced during implementation. If a visual direction is approved, Claude Code re-implements it from scratch against Approved Blueprint tokens (D5.2 / D6.1).

**The path after this session is fixed (D6.6):**

```
Stitch exploration → Founder Review → Blueprint Decision Record (if required)
   → Claude Code Implementation (BR → FR → API → UI → CMP → TEST)
   → Validation → Delivery Closure
```

---

# 2. Design System

The **approved ETA digital design system** applies (`Colors.md` / ETA-VISUAL-001, Approved; D1, Approved; Founder-confirmed 2026-08-11).

| Role | Color | Usage |
|---|---|---|
| **Primary** | ETA Navy `#0F172A` | Primary brand color — surfaces, headers, primary text |
| **Accent** | ETA Copper `#C57B39` | Used **sparingly** (~10%) — CTAs, highlights, premium emphasis |
| Neutrals | Graphite / Slate / Steel Gray / Light Steel / Soft Gray / Background | Structure, borders, secondary text |
| Semantic | Success / Warning / Error / Information | Compliance state, certificate expiry, risk level |

**Rules:**

- **Do not use Green or Orange as UI colors.** They are not in the approved palette.
- **Logo colors are brand-mark only.** The ETA logo mark carries its own colors; per D1's dual-layer identity, **UI colors are never inferred from the logo**.
- **Copper is a brand accent, not a status color.** Compliance, expiry, and risk states use semantic colors — never Copper.
- **Industrial B2B identity.** Built for petrochemical, oil & gas, steel, and procurement departments.
- **Professional procurement platform feeling.** Enterprise software an industrial buyer would trust with a sourcing decision.

**Explicitly wrong for ETA:** startup style (playful illustration, oversized type, marketing-led layout), consumer app style (gamification, avatars, social affordances), gaming style (dramatic color, decorative motion).

**Typography:** Inter for English/LTR; Vazirmatn for Persian/RTL; JetBrains Mono for technical values (supplier codes, certificate numbers, dates), always LTR. Layouts must be structurally direction-agnostic — RTL readiness is a standing ETA requirement.

---

# 3. Prototype Scope

Create **only** these three screens:

| Screen | Name | Question it answers |
|---|---|---|
| **A** | Supplier Directory | "Which suppliers exist, and which can I use?" |
| **B** | Supplier Profile | "Everything ETA knows about this supplier — and why." |
| **C** | AI Assistant Concept Panel | "Where does an assistant belong, and how does it stay advisory?" |

Nothing beyond these three. No dashboard, no CRM, no tender module, no settings, no navigation shell beyond what the three screens need.

---

# 4. Supplier Directory Requirements

## Explore

- **Search** — across supplier name, supplier code, category
- **Filters** — category, classification, lifecycle status, compliance state, certification held, country
- **Supplier cards** — a scannable card treatment
- **Dense industrial list** — a compact table/list treatment
- **Show both card and dense-list side by side.** Which suits an industrial procurement audience is a genuine open question this exploration should answer, not assume.
- **Classification** — Strategic, Preferred, Approved, Conditional
- **Lifecycle Status** — Draft, Under Review, Approved, Active, Suspended, Inactive, Archived
- **Compliance Status** — compliant, under review, non-compliant — treated as a **hard gate**, not a soft signal
- **Risk Level** — human assigned only (rules below)
- **Evidence availability** — "certificate on file" vs. "claimed, no document"
- **Expiry warning** — a certification or review approaching or past its date must be visibly distinct

## Risk Level rules

**Allowed — exactly this character of presentation:**

```
Risk Level: Medium
Basis: Manual qualification review
Last reviewed: 2026-01-15
```

**Forbidden:**

- AI Score
- Risk percentage
- Ranking (no ordering or sorting by risk, no "riskiest first")
- Gauge
- Meter
- Automated recommendation

**Why this matters:** Risk Level is a **human judgment recorded by a person**, not a computed metric. Gauges, meters, percentages, and numeric badges all visually assert that a machine calculated it. A viewer should be able to tell from the interface alone that a person wrote this down, and why.

**Also excluded from the Directory:** any AI score, the legacy 1–5 star rating, and any metric derived from orders, RFQs, or delivery performance (Commercial Performance is outside MVP scope per D7.2).

---

# 5. Supplier Profile Requirements

Six sections:

| # | Section | Must show |
|---|---|---|
| 1 | **Identity** | Supplier code, name, category, country, contacts, lifecycle status, record provenance |
| 2 | **Classification** | Value (Strategic / Preferred / Approved / Conditional), recorded basis, who assigned it, when |
| 3 | **Certifications** | Which held, validity dates, expired vs. expiring vs. valid, whether evidence is on file |
| 4 | **Compliance Status** | State, last reviewed, next due, who approved, notes, what is blocked while non-compliant |
| 5 | **Risk Level** | Value, **basis/evidence**, last reviewed, by whom |
| 6 | **Relationship History** | Chronological events (onboarded, order, review, certification, issue, note) with dates and who recorded them |

## Every section must show evidence basis

This is the strongest constraint in the brief. The Founder's stated need is to **see why** — a conclusion without a visible basis is worse than no conclusion.

Concretely:
- A classification with no recorded reason **fails**
- A compliance state with no review date **fails**
- A risk level with no basis **fails**
- A certification claim with no evidence indicator **fails**

The interface must make the difference between *"this is recorded and supported"* and *"this is asserted"* visible at a glance.

---

# 6. Synthetic Prototype Data

Per **D8.1 / D8.2 (Approved)** — synthetic fictional suppliers only.

**Never use:**
- Real company names
- Anything from `ETA-Platform/src/lib/mockData.ts`
- Iranian supplier names
- Fabricated compliance claims attached to a real or identifiable organization

**Use:** the `SYN-` coded fictional suppliers in Block D (§10.5) — `SYN-0001`, `SYN-0002`, and so on. The `SYN-` prefix is deliberately distinct from ETA's real `SUP-000125` format so synthetic records can never be mistaken for real ones.

**Every screen must display a visible label:**

```
Synthetic Prototype Data
```

> **Why this rule exists:** ETA-Platform's current mock records pair real or real-resembling company names with fabricated compliance verdicts, risk levels, and ratings. Sending those to an external service would transmit invented compliance failures about identifiable real companies to a third party. D8 closed that risk; Block D exists so nobody needs to reach for `mockData.ts`.

---

# 7. AI Concept Area

Explore three capabilities — **conceptually only**. Not a working assistant, not connected to a model, not an approved feature.

| Capability | What it does |
|---|---|
| **Supplier Explanation Assistant** | Explains what is already recorded — identity, classification, certifications, compliance state, the recorded risk basis, notable events |
| **Document Review Assistant** | Extracts and summarizes fields from an uploaded certificate — presented as **proposed, awaiting confirmation** |
| **Qualification Assistance** | Surfaces what is missing or expiring before a supplier could advance in lifecycle — an advisory checklist |

## Principle

> **AI proposes. Human decides.**

Every assistant output must have a **visible human decision point** attached — confirm, reject, or act on. An assistant output with no such affordance is a failed exploration, not a simplification.

## AI must never

- **Assign risk** — it may *explain* a recorded risk level and its stated basis; it may never produce, propose, adjust, or imply one
- **Approve a supplier** — no lifecycle advancement, no classification change, no compliance clearance
- **Modify supplier master data** — no field written, updated, or committed by the assistant

Also explore: how the assistant shows **its own basis and uncertainty**. An assistant that asserts without showing grounds is worse than no assistant.

---

# 8. Required Output

## Generate

- **Supplier Directory concept** — both card and dense-list treatments, plus with/without Risk Level variants
- **Supplier Profile concept** — all six sections in one layout, so balance and hierarchy can be judged
- **AI assistant concept** — placement and human decision points

Enough variation to make a real comparison possible at Founder Review. A single direction is not an exploration.

## Do not generate

- React
- Tailwind
- Components
- Database
- API
- Backend

> **Practical note:** Stitch emits HTML/CSS by design and may produce code regardless of instruction. That is acceptable and expected — **it simply carries no authority**. It is not read, adapted, or referenced during implementation. The instruction above tells Stitch what to *focus* on; D6.2 governs what happens to whatever it emits.

---

# 9. Founder Review Criteria

The prototype will be judged on five questions:

| # | Criterion | What a pass looks like |
|---|---|---|
| 1 | **Does it support procurement decisions?** | A Procurement Manager can narrow a set to a shortlist and tell who is usable right now |
| 2 | **Does it show evidence?** | Every qualification state displays its basis — no unsupported assertions |
| 3 | **Does it avoid fake intelligence?** | No scores, gauges, percentages, rankings, or computed-looking judgments anywhere |
| 4 | **Does it preserve human responsibility?** | Risk and classification read as human decisions; every AI output has a human decision point |
| 5 | **Does it fit industrial B2B procurement?** | Reads as enterprise industrial software, not a startup or consumer product |

Any direction failing #3 or #4 is rejected regardless of how good it looks — those two encode D7.2's scope boundary and the Founder's core requirement.

---

# 10. PASTE BLOCKS

**These are the only parts to copy into Google Stitch.** Run in order: Block 0 first to establish context, then A, B, C. Block D supplies sample data if Stitch asks for content.

---

## 10.1 — PASTE BLOCK 0 · Context & Design System

*Paste this first, to establish the design system and constraints for the session.*

```
I'm designing an enterprise supplier intelligence module for an industrial
procurement company. This is visual exploration only — I want to see how it
should look and feel, not production code.

CONTEXT
The company supplies industrial equipment and steel to petrochemical, oil & gas,
and steel manufacturers. Users are procurement professionals evaluating suppliers
for real sourcing decisions. This is serious enterprise software, not a consumer app.

DESIGN SYSTEM — use exactly these
Primary color:  Navy #0F172A
Accent color:   Copper #C57B39 — use sparingly, roughly 10%, for calls to action
                and premium emphasis only
Neutrals:       Graphite, slate, steel gray, light steel, soft gray backgrounds
Status colors:  Standard semantic success / warning / error / information

Typography: Inter for text. Monospace for codes, dates, and reference numbers.

COLOR RULES
- Do NOT use green or orange as interface colors.
- Copper is a brand accent, never a status color. Never use copper to mean
  "compliant" or "low risk" — use semantic status colors for those.
- Keep copper rare. If it's everywhere, it's wrong.

CHARACTER
YES: industrial, enterprise, professional, trustworthy, data-driven, dense and
     legible, comfortable with detail
NO:  startup style, playful illustration, oversized marketing type, gamification,
     avatars, social features, decorative animation

Layouts must be structurally symmetric enough to mirror for right-to-left
languages later.

All sample data is fictional. Every screen must display a small visible label
reading "Synthetic Prototype Data".

I'll describe three screens next. Confirm you have the design system, then wait.
```

---

## 10.2 — PASTE BLOCK A · Supplier Directory

```
SCREEN A — SUPPLIER DIRECTORY

Purpose: a procurement manager answering "which suppliers exist, and which ones
can I actually use right now?"

This must feel like a decision tool, not a database table.

INCLUDE
- Search across supplier name, supplier code, and category
- Filters: category, classification, lifecycle status, compliance status,
  certification held, country. Show how active filters appear and clear.
- Per supplier: name, supplier code, category, country, classification,
  lifecycle status, compliance status
- Certification badges showing which certifications are held
- Evidence indicator: whether a certificate document is on file, versus claimed
  with no document
- Expiry warning: certifications or reviews approaching or past their date must
  look visibly different from valid ones
- Compliance status as a HARD GATE — a non-compliant supplier must read as
  "cannot use", not as a lower-ranked option

VALUES
Category:       Manufacturer, Distributor, Trading Company, Service Provider,
                Logistics Provider, OEM, EPC Contractor, Consultant
Classification: Strategic, Preferred, Approved, Conditional
Lifecycle:      Draft, Under Review, Approved, Active, Suspended, Inactive, Archived
Compliance:     Compliant, Under Review, Non-compliant

GIVE ME TWO LAYOUTS SIDE BY SIDE
1. A card-based layout — more scannable
2. A dense industrial list/table layout — more enterprise
I genuinely don't know which suits this audience. Show both so I can compare.

RISK LEVEL — read carefully
Risk Level is a HUMAN judgment written down by a person. It is NOT calculated.
Show it as plain recorded information, like this:

    Risk Level: Medium
    Basis: Manual qualification review
    Last reviewed: 2026-01-15

NEVER show risk as: a score, a percentage, a gauge, a meter, a dial, a progress
arc, a numeric badge, a letter grade, or a sort order. Never rank or order
suppliers by risk. Never add a "recommended" or "best match" badge.

Also give me one variant WITH risk level in the list and one WITHOUT, so I can
judge whether showing it there invites ranking behaviour I don't want.

DO NOT INCLUDE
- Any AI score or confidence value
- Star ratings
- Order counts, delivery rates, or performance metrics of any kind
- Automatic ranking or "top supplier" treatment
```

---

## 10.3 — PASTE BLOCK B · Supplier Profile

```
SCREEN B — SUPPLIER PROFILE

Purpose: everything the company knows about one supplier — AND WHY.

The governing rule: every section must show its EVIDENCE BASIS. A conclusion with
no visible basis is worse than no conclusion. Someone must be able to challenge
any value on this screen and immediately see what it rests on.

SIX SECTIONS, all in one layout so I can judge balance and hierarchy:

1. IDENTITY
   Supplier code, company name, category, country, email, phone, website,
   lifecycle status, when the record was created and by whom.

2. CLASSIFICATION
   Value (Strategic / Preferred / Approved / Conditional), the recorded reason it
   was assigned, who assigned it, when. Show how it changed over time.
   Make it read as a deliberate human decision, not a computed grade.

3. CERTIFICATIONS
   Which are held (ISO 9001, ISO 14001, ISO 45001, API, ASME, CE, ATEX, IECEx),
   each with its own validity dates. Clearly distinguish valid / expiring / expired.
   Show whether the certificate document is on file or missing.
   Important: different certifications expire on DIFFERENT dates — show how that
   is handled, don't collapse it to one shared expiry.

4. COMPLIANCE STATUS
   State, when last reviewed, when next due, who approved it, compliance notes,
   and explicitly what is blocked while non-compliant.
   A hard gate, but stated factually — not alarming or shouty.

5. RISK LEVEL
   Value (Low / Medium / High), the BASIS and evidence for it, when last reviewed,
   and by whom. Also show when the next review is due.

   This is a HUMAN assessment. Never render it as a gauge, meter, dial, percentage,
   score, progress arc, or numeric badge — all of those falsely imply a machine
   calculated it. Find a treatment that reads unmistakably as "a person assessed
   this, and here is their reasoning."

   Note: a supplier can have NO risk assessment yet. Show that empty state.

6. RELATIONSHIP HISTORY
   Chronological event timeline. Event types: onboarded, order, review,
   certification, issue, note. Each with date, title, description, and who
   recorded it.
   Events affecting qualification (an unresolved issue) must look different from
   an ordinary note. Show how a long history stays scannable.

DO NOT INCLUDE
Order counts, delivery performance, quality scores, star ratings, AI-generated
summaries, or any computed composite score.
```

---

## 10.4 — PASTE BLOCK C · AI Assistant Concept Panel

```
SCREEN C — AI ASSISTANT CONCEPT PANEL

Purpose: explore WHERE an AI assistant would sit in this supplier workflow and
HOW it stays visibly advisory. This is a concept only — not a working assistant.

The governing principle, which must be visible in the design itself:

    AI PROPOSES. HUMAN DECIDES.

Every single assistant output must have a visible human decision point attached —
confirm, reject, or act on. An assistant output with no such control is wrong.

EXPLORE THREE CAPABILITIES

1. SUPPLIER EXPLANATION ASSISTANT
   Explains information that is already recorded — certifications held and
   expiring, compliance state, the recorded risk basis, notable relationship
   events. It summarizes existing facts; it does not produce new judgments.
   Show where this lives: side panel, drawer, or inline. It must stay clearly
   secondary to the supplier record itself.

2. DOCUMENT REVIEW ASSISTANT
   Reads an uploaded certificate and extracts fields — certificate type, issuing
   body, issue date, expiry date, scope.
   CRITICAL: every extracted value must be visually marked as PROPOSED, AWAITING
   CONFIRMATION — clearly distinct from a confirmed supplier attribute. Nothing
   is committed until a person confirms it.

3. QUALIFICATION ASSISTANCE
   An advisory checklist showing what is missing or expiring before a supplier
   could move forward in its lifecycle. It identifies gaps; the human decides
   what to do about them.

THE ASSISTANT MUST NEVER APPEAR TO
- Assign or adjust a risk level. It may EXPLAIN a risk level a human recorded,
  and repeat that person's stated basis. It must never generate one.
- Approve a supplier, advance its lifecycle, change its classification, or clear
  its compliance status.
- Write, update, or commit any supplier data.

ALSO EXPLORE
How the assistant shows its own basis and its uncertainty. An assistant that
states things confidently without showing what it relied on is worse than no
assistant at all.
```

---

## 10.5 — PASTE BLOCK D · Synthetic Supplier Data

*Use if Stitch asks for sample content, or paste alongside Block A.*

```
SAMPLE DATA — all fictional. Label every screen "Synthetic Prototype Data".

Code      Name                          Category            Country  Classification  Lifecycle      Compliance     Risk           Certifications              Evidence
SYN-0001  Northwind Valve Works         Manufacturer        Germany  Strategic       Active         Compliant      Low            ISO 9001, ISO 14001, API    On file
SYN-0002  Kestrel Rotating Equipment    OEM                 Italy    Preferred       Active         Compliant      Low            ISO 9001, ASME              On file
SYN-0003  Arcadia Instrumentation       Distributor         Türkiye  Approved        Active         Under review   Medium         ISO 9001, ATEX (expiring)   Partial — ATEX cert missing
SYN-0004  Vantage Sheet & Coil          Trading Company     UAE      Approved        Active         Compliant      Low            ISO 9001                    On file
SYN-0005  Larkspur Flow Control         Manufacturer        India    Conditional     Under Review   Under review   High           ISO 9001 (EXPIRED)          Expired cert on file
SYN-0006  Thornbury Gearworks           Manufacturer        UK       Preferred       Suspended      Non-compliant  High           ISO 9001, ISO 45001         On file
SYN-0007  Fenwick Logistics Partners    Logistics Provider  Netherl. Approved        Active         Compliant      Low            ISO 9001                    On file
SYN-0008  Halcyon Engineering Services  Consultant          Spain    Conditional     Draft          Under review   Not assessed   —                           None

These records deliberately include the hard cases:
- SYN-0003: valid supplier, one EXPIRING certification, evidence MISSING for it
- SYN-0005: EXPIRED certification, still under review
- SYN-0006: SUSPENDED and NON-COMPLIANT, yet Preferred and well-certified —
  the interface must make "cannot use right now" unmistakable despite the
  otherwise strong signals
- SYN-0008: Draft supplier, no certifications, no evidence, NO RISK ASSESSMENT YET

RISK DETAIL for SYN-0003 (use for the Risk Level section on Screen B):
  Risk Level:    Medium
  Basis:         Sole-source for two instrument families; ATEX certificate
                 approaching expiry with no document on file; one documentation
                 delay in the last 24 months, resolved
  Assessed by:   Supplier Manager
  Last reviewed: 2026-01-15
  Next review:   2027-01-15

RELATIONSHIP HISTORY for SYN-0003 (use for Screen B section 6):
  2024-03-12  onboarded      Supplier onboarded and qualified
  2024-09-04  order          First order completed
  2025-02-18  certification  ATEX certification recorded
  2025-07-22  issue          Documentation delay on shipment — resolved
  2026-01-15  review         Annual qualification review; risk set to Medium
  2026-06-30  note           ATEX certificate approaching expiry; renewal requested
```

---

# 11. After the Session

1. **Save the output** outside ETA-Platform. Do not place Stitch output in the repository — D6.2 prohibits it, and D8.3 keeps exploration artifacts separate.
2. **Review against §9's five criteria.** Judge against the stated criteria rather than first impression; #3 (avoids fake intelligence) and #4 (preserves human responsibility) are pass/fail.
3. **Record what was learned**, including which open questions from the Stitch Brief §9 the exploration actually informed — certification data model, relationship history structure, identity attribute priority, whether `rating` is missed, and certificate document storage.
4. **Decide the direction** at Founder Review. If it changes anything approved, it needs a Blueprint decision record.
5. **Then, and only then**, implementation may be scoped — by Claude Code, from scratch, against Approved Blueprint tokens, following BR → FR → API → UI → CMP → TEST.

**Reminder:** nothing Stitch produces enters ETA-Platform. Not the code, not the assets, not the markup. The output is a picture of a direction, and the direction is the only thing that carries forward.

---

*Manual execution package. No architecture change, no React code, no UI implementation, and no Stitch execution from this session. Synthetic data only, per D8.1/D8.2 — `mockData.ts` is not used as a source and remains unmodified. Companion to `PHASE6-SUPPLIER-INTELLIGENCE-STITCH-BRIEF.md` (v2), which is the governed specification this package is derived from.*
