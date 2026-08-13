---
title: Phase 5.2 Strategic Planning Report — AI-Assisted Design & Production Workflow
document_id: ETA-PHASE5-2-STRATEGY-001
status: Proposal — not a Blueprint decision; requires Decision Owner ratification before binding
date: 2026-08-09
authority: >
  ETA-WEBSITE-PHASE-STATE-SNAPSHOT.md, SESSION-HANDOFF-WEBSITE-PHASE5-1.md,
  SESSION-HANDOFF-WEBSITE-PHASE4-2.md, ETA-Blueprint/13-DECISIONS/ETA-Website-Brand-
  Experience-Decision-Resolution-V1.md, master governance (~/Documents/GitHub/CLAUDE.md),
  ETA-Platform/CLAUDE.md
scope: >
  Planning only. No code, route, component, Tailwind config, asset, or documentation-status
  change was made. This report exists to be read and, where it proposes something new
  (tool-boundary rules, workflow sequencing), ratified or rejected via the normal
  ETA-Blueprint decision-record process before anyone treats it as binding.
purpose: >
  Directly addresses two open items carried forward from Phase 5.1's closing note and restated
  in the Phase State Snapshot's "Current Open Decisions": "Lovable role" and "Figma workflow."
  This report proposes an answer to both, plus the surrounding tool-governance and visual-
  production strategy the objective asks for.
---

# Phase 5.2 — AI-Assisted Design & Production Workflow Strategy

## 0. Purpose and how to read this document

ETA now runs four connected surfaces — the public website, the enterprise procurement platform,
the supplier/customer ecosystem, and (future) AI-assisted procurement intelligence — with an
expanding set of AI design/build tools available: Claude Pro, Claude Code with GitHub access, a
Figma connector, and free tiers of Lovable, v0, Bolt, Replit Agent, Cursor, and similar builders.
Nothing in this list is new work — this document defines **which tool does what**, and why,
before any Phase 5.2 implementation starts.

This is a **planning report**, not an implementation. Every recommendation below is written the
same way Phase 3–5.1's audits and plans were written before their corresponding decision records
existed: as a reasoned proposal, citing the same authority documents that would need to ratify it.
Nothing here is self-executing. Section 7 states explicitly what would need to happen in
`ETA-Blueprint/13-DECISIONS/` before any rule proposed here is treated as binding.

---

## 1. Design Workflow — Tool Comparison

### 1.1 Tool profiles

**Figma (+ Figma AI, connected via MCP in this environment)**
Strength: the correct place to *define and check* a visual system — styles/variables that mirror
`Colors.md`/`Typography.md`/`Components.md` token-for-token, high-fidelity static mockups,
stakeholder review, handoff annotation. Figma AI's generative layout features are useful for
divergent visual exploration.
Weakness: its AI code-export tends to invent markup, spacing, and even color values that don't
trace to an Approved token — exactly the failure mode this workspace already lived through once
(see below). No live Figma file currently exists for ETA-Platform's website; the earlier attempt
(`FIGMA-DESIGN-PLAN.md`/`FIGMA-BUILD-SPEC.md`) was never executed and has since been marked
Superseded, precisely because it proposed a design system that bypassed Blueprint authority.

**Lovable**
Strength: fastest path from an idea to a full-stack, live-preview prototype (including a working
backend) — genuinely useful for spiking "what would a Tender Management screen feel like" in
total isolation.
Risk: Lovable defaults to its *own* stack decisions (shadcn/ui, its own Supabase project), which
diverge from ETA-Platform's hand-built `src/components/ui/` library and existing Supabase
instance. This is not hypothetical — a separate Lovable/TanStack Start scaffold
(`eta-digital-hub`) already exists in this workspace, and its design system (`docs/12-VISUAL_DIRECTION.md`,
Teal/Orange "Dark Luxury Industrial") is the exact source of the "visual authority conflict"
documented in `WEBSITE-ARCHITECTURE-CONFLICT-REPORT.md` and resolved by D1. That resolution is
the precedent this report generalizes: a Lovable-originated artifact's decisions must never leak
into ETA-Platform without passing through a Blueprint decision record first.

**v0 (Vercel)**
Strength: fast, narrow component/layout generation from a prompt or screenshot — good for
divergent component exploration ("five ways to lay out a KPI row"). Not MCP-connected in this
workspace; used as a standalone web tool.
Weakness: no awareness of ETA's actual tokens unless manually fed the Blueprint docs each time;
output needs the same reconciliation discipline as Figma AI's code-gen, every time, with no
persistent memory of having done so before.

**Claude Code**
The only tool in this list with direct write access to the ETA-Platform GitHub repository, full
working context of the Approved Blueprint documents, and a proven track record of implementing
token-level changes against those documents without drift — T1–T14 (typography), V1–V3 (visual
refinement), V5 (copper roles), D1–D4 (architecture) were all implemented this way, each verified
against the live code before being called closed. This is the production implementation agent,
per both the master `CLAUDE.md` and `ETA-Platform/CLAUDE.md`.

**Bolt / Replit Agent / Cursor / other AI builders**
Same category and risk profile as Lovable/v0 — fast, sandboxed, disconnected from ETA's actual
tokens unless manually supplied. Cursor is the one exception worth naming specifically: as an
IDE, it is technically *capable* of being pointed at a local clone of ETA-Platform and editing it
directly. That would make it "another uncontrolled agent modifying production code" — the
restriction here is a governance one, not a capability gap. None of these tools should ever push
to, or edit a live checkout of, the ETA-Platform repository.

### 1.2 Recommended tool per use case

| Use case | Recommended tool | Why |
|---|---|---|
| Website visual exploration (new hero treatments, page concepts) | **Figma** (+ Figma AI for divergent options) | Needs visual comparison against Approved `Colors.md`/`Typography.md`/`Components.md` before anything is built — Figma is the system-of-record tool for that comparison. |
| Platform dashboard design | **Figma** first; **Lovable or v0** for a throwaway interactive spike only if needed | Blocked today regardless of tool — see §4. Once unblocked: static layout and data-density study in Figma; an optional disposable interactive prototype in Lovable/v0 to test interaction patterns, never wired to real data or the real repo. |
| CRM interface design | Same pattern as dashboard | Same blocked status, same reasoning — see §4. |
| Component exploration ("what should a Tabs/DataTable variant look like") | **v0 or Lovable**, sandboxed | Their strength is fast divergent generation. Output is reference material only — re-implemented by hand in Claude Code against `Components.md`, never imported as-generated. |
| Prototype creation (click-through demos for stakeholder buy-in) | **Lovable or Bolt** | Purpose-built for this; demo speed matters more than token-exact compliance at this stage. |
| Production implementation | **Claude Code only** | Sole tool with ETA-Platform write access, Approved-doc context, and the audit trail proving the pattern works. |

---

## 2. Repository Governance — AI Tool Boundaries

Restating and operationalizing the master `CLAUDE.md` rule ("No uncontrolled AI agent can modify
ETA-Platform") against the specific tool list in scope:

**Sandbox / prototype only — must never touch the ETA-Platform repository:**
- Lovable (all projects, including any future exploratory one — keep entirely separate from,
  and never merged into, ETA-Platform)
- v0
- Bolt
- Replit Agent
- Cursor, or any other AI-assisted IDE, *if* ever pointed at a checkout of ETA-Platform — the
  restriction is on unreviewed direct edits landing in the repo, not on using Cursor as a plain
  read-only reference tool
- Any other free-tier AI builder not named above

**Reference / design-system authority tool — not a code-push tool for this repo:**
- Figma. The Figma MCP server in this environment can technically create files and push content
  *into Figma* — that is in scope (design-system authoring, diagrams). It is not, and should
  never become, a path for AI-generated code to land in ETA-Platform without passing through
  Claude Code's implementation step.

**Production-touching — the only agent authorized to write to ETA-Platform:**
- Claude Code, and only for changes traceable to either an Approved Blueprint document directly
  (token-level compliance fixes) or a specific decision record in `ETA-Blueprint/13-DECISIONS/`
  (anything that isn't already covered by an Approved doc).

**GitHub access note:** several of the sandbox tools above (Lovable, Bolt, Replit Agent) offer a
one-click "push to GitHub" feature. That feature must never be pointed at
`exirtejaratatlas/ETA-Platform`. If a sandbox experiment is worth preserving, its *learnings* get
written up as a Blueprint decision input — its *code* does not get pushed anywhere near the
production repository.

---

## 3. Industrial Visual Strategy

Per `Imagery.md` (ETA-VISUAL-004, Approved) and the "Confirmed Not Implemented" list in
`ETA-WEBSITE-PHASE-STATE-SNAPSHOT.md`. No implementation proposed here — purpose, priority,
recommended tool given the current toolset, and blocking dependency only.

| Visual type | Purpose | Priority | Recommended tool (within the named toolset) | Dependency |
|---|---|---|---|---|
| Industrial photography | Hero/section imagery per `Imagery.md`'s preferred subjects (steel production, plants, engineering teams, procurement operations) | **High** — top item on the "not implemented" list; most visually load-bearing gap | None of the currently available free tools produce authentic industrial photography. This is a sourcing/licensing/commissioning decision, not a generation task. | Blocked on the open "Imagery sourcing strategy" decision (commission vs. stock license vs. AI-generated path) |
| AI-generated visuals | Interim imagery, or backdrop/texture elements, within `Imagery.md`'s realism and engineering-accuracy constraints | **Medium** — only relevant if the sourcing decision names AI generation as the chosen path | Not present among the free tools named for this report. Separate creative-generation connectors exist elsewhere in this Claude environment but are outside the tool list this report was scoped against — evaluate them only once AI-generation is the confirmed path, not before. | Same imagery-sourcing decision, plus operationalizing `Imagery.md`'s "AI Generated Images" constraints into a concrete review checklist |
| 3D product visualization | Equipment/valve/pump visualization (Equipment Supply page, future platform use) | **Low** — no Blueprint document specifies a use case yet | Figma for early *illustrated* concept only (not true 3D); no tool in the current set produces real 3D assets | Blocked — "not scoped at Blueprint level," already flagged in `SESSION-HANDOFF-WEBSITE-PHASE5-1.md` as Change Request territory |
| Motion graphics (produced) | Explainer/process visualization per `Imagery.md`'s Motion Graphics section | **Low** | No current free tool is fit for produced motion-graphics output | Blocked on the open "Motion graphics production" decision (sourcing/production path undecided) |
| Video | Product/company video content | **Low** | Same as motion graphics — no current tool fits | Same blocker family; note this is distinct from CSS `animation` tokens |

**Important distinction, carried forward from Phase 4.1/4.2 and restated here so it isn't
re-litigated:** the sitewide `animate-fade-in-up` CSS token usage (V3, already implemented) is
**not** "motion graphics." It is a subtle, already-approved micro-interaction, unrelated to the
produced motion-graphics/video row above. Nothing in this section revisits V3.

---

## 4. Platform Design Workflow

Every surface below is a "product screen" under the master `CLAUDE.md`'s standing rule: **"Product
screens require component library approval first. Don't build or redesign Dashboard/CRM/Supplier/
Finance/other product screens until the shared component library (`src/components/ui/`) they'd
be built from is reviewed and signed off."** The Foundation-phase component library expansion
(Alert, Drawer, EmptyState, Select, Skeleton, Tabs, Toast, plus the extended `DataTable`/`Button`/
`Input`) is implemented and committed, but has **not** gone through a formal review/sign-off
against `Components.md` as a completed library. Until that sign-off happens, all five surfaces
below stay in the same "define workflow, do not build" posture as this report.

Once that sign-off happens, the workflow for each surface follows the same Figma → Blueprint
decision → Claude Code → Validation loop (§5), specialized as:

- **Dashboard** — KPI/analytics-heavy. Explore layout in Figma against `Components.md`'s "KPI
  Components" spec (value/label/trend/comparison/icon/time-period). Validate density against the
  existing mock data layer before any real-data wiring. Implement by reusing/extending
  `StatCard`/`DataTable`, not by inventing new patterns.
- **CRM** — entity-heavy (Companies/Contacts/Deals/Inquiries). Every field shown must trace to an
  Approved entity in `ETA-Blueprint/02-BLUEPRINT/Domains/` (CRM Domain.md, Customer Domain.md) —
  per the standing rule "never invent entities." Design exploration should start from the entity
  model, not from a generic CRM template.
- **Supplier management** — already live (MOD-1 Supplier Intelligence: Dashboard, Supplier List,
  Supplier Detail, mock data). Per `CLAUDE.md`'s stated next-priority order, this surface's real
  backend integration (Supabase) is the next priority *ahead of* new product-screen design work,
  not a parallel design-exploration track.
- **Tender management** — **not currently traceable to an Approved domain/entity document** in
  what this report's authority list covers. Flagging as `Open Decision Required` at the
  entity-model level, not just the design-workflow level: confirm whether "Tender" is a Blueprint
  entity (distinct from RFQ) before any design exploration starts, let alone implementation.
- **AI assistant UI** — a shell already exists (`/ai-platform`, `AiPlatform.tsx`), but per D4 the
  public website must keep ETA Platform framing future-vision, and per the Sprint 1 Coding Rules,
  **AI automation is explicitly forbidden without a Change Request**. Design work on this surface
  should stay at the visual-shell / vision-framing level — exploring what an AI assistant *panel*
  could look like — not functional AI automation, until a Change Request is approved.

---

## 5. Recommended ETA AI Workflow

This generalizes the pattern already validated by T1–T14, V1–V5, and D1–D4 — every one of those
went through research/audit, a written decision record, then Claude Code implementation, then
validation, then a closure document. Proposed as the standing pipeline for all future ETA design
work, website or platform:

```
1. Research / Audit           →  2. Exploration              →  3. Blueprint Decision
   (Claude Code or human;         (Figma / Figma AI; Lovable/     (ETA-Blueprint/13-DECISIONS/,
   establish current state         v0/Bolt for interactive         Decision Owner: Ali Hejazi —
   against Approved docs,          spikes only — sandboxed,        converts a chosen direction
   find the actual gap)            never touches ETA-Platform)     into something implementable)
                                                                            │
        ┌───────────────────────────────────────────────────────────────┘
        ▼
4. Claude Code Implementation  →  5. Validation                →  6. Documentation Closure
   (token-level, traceable to      (typecheck, build, browser/     (session handoff + next-task
   the decision record, no          console check across            doc — per the standing
   invention, checked against       affected routes — the           "every major UI/UX phase
   Approved docs live)              pattern every phase in this      must close with three
                                     repo has already followed)       things" rule)
```

**Proposed answers to the two open items this report was written to address:**

- **Figma's role:** stage 2 (Exploration) and, ongoing, as the design-system reference tool kept
  in sync with `Colors.md`/`Typography.md`/`Components.md`. Never stage 4.
- **Lovable's role:** stage 2 (Exploration) only, strictly for disposable interactive spikes, in
  its own isolated project, never merged, imported, or pushed toward ETA-Platform. Never stage 4.

Both proposed answers are consistent with, and do not attempt to override, D1's existing
resolution that visual/UI authority for ETA-Platform routes through `Colors.md` and the Blueprint
digital-layer decision — this section operationalizes *how tools are used* within that already-
settled authority question, it does not reopen it.

---

## 6. Summary — What This Report Does and Does Not Decide

**Proposes (pending ratification, see §7):**
- The tool-to-use-case mapping in §1.2.
- The sandbox-vs-production tool boundary rules in §2.
- The visual-strategy priority ordering in §3.
- The workflow pipeline in §5, including the proposed Figma/Lovable role answers.

**Does not decide:**
- Which imagery-sourcing path, 3D scope, or motion-graphics/video production path ETA takes —
  those remain `Open Decision Required`, unchanged by this report.
- Whether "Tender" is an approved Blueprint entity — flagged in §4, not resolved here.
- Anything about AI automation scope — remains blocked behind a Change Request per standing
  Sprint 1 rules.

---

## 7. Governance and Approval Note

Per the master `CLAUDE.md`'s Change Request Governance: this report is a **proposal**, written in
`ETA-Platform/docs/delivery/` — an implementation-repo planning artifact, not an
`ETA-Blueprint`-authority document. It has the same standing as `PHASE2_IMPLEMENTATION_PLAN.md`
or any other pre-decision plan in this repo's history: informative, not binding, until a
corresponding decision record is written in `ETA-Blueprint/13-DECISIONS/` by the Decision Owner
(Ali Hejazi, Founder & CEO) — following the exact pattern already used for D1–D4, T1–T14, and
V1–V5. Recommended next step, if this report's direction is agreeable: a single Blueprint decision
record (e.g. `ETA-AI-Design-Workflow-Decision-Resolution-V1.md`) ratifying §1.2, §2, and §5's
proposed tool roles, the same way `ETA-Website-Brand-Experience-Decision-Resolution-V1.md`
ratified V4/V5.

---

STOP after report. No code, route, component, Tailwind config, asset, or existing-document
status was changed in producing this report.
