# Figma Design Plan — ETA Platform Redesign

document_id: ETA-FIGMA-PLAN-001
status: Superseded — not used as authority; retained for historical record only
date: 2026-08-04
depends_on: `docs/delivery/UI-DESIGN-AUDIT.md`, `docs/delivery/ETA-DESIGN-SYSTEM.md`
purpose: Define the Figma file structure so design work has a single, governed home before any high-fidelity screen is drawn. This is a structural plan only — no Figma file has been created yet; creation happens after this plan and the design system document are approved.

---

> **SUPERSEDED NOTICE (added 2026-08-09, per `REPOSITORY-HYGIENE-AUDIT.md`):** This plan
> depends on `ETA-DESIGN-SYSTEM.md`, which was never approved and was explicitly not used as
> authority for any subsequent decision (see that file's own superseded notice and
> `SESSION-HANDOFF-UI-FOUNDATION.md`, 2026-08-07). No Figma file was ever created against this
> plan. Kept for historical record only — do not treat it as current or pending guidance.
> Content below is unchanged from its original 2026-08-04 draft.

---

## File Setup

- **One Figma file**, "ETA Platform — Design System & Product," containing all 14 pages listed below (not 14 separate files) — keeps components, styles, and screens cross-referenceable via one shared library.
- **Figma Styles/Variables** (colors, text styles, effects) are created directly from `ETA-DESIGN-SYSTEM.md` §1–4 as the first task on Page 02, before any component or screen work begins on later pages — every subsequent page consumes these, none redefines them locally.
- **Naming convention:** `[Page#] Section` for top-level frames (e.g., `04 Dashboard / Desktop / Default`), `Component/Variant/State` for component instances (e.g., `Button/Primary/Hover`) — matches how `ETA-DESIGN-SYSTEM.md` names variants so a reviewer can trace a frame back to its spec section.
- **Branch/review workflow:** each page owner works in a Figma branch for anything beyond a minor edit; merges to main require one reviewer sign-off, consistent with the "wait for approval after documentation" instruction governing this whole redesign.

---

## Page 01 — Cover

- Redesign title, scope statement, version/date, status (Draft/In Review/Approved) tracker.
- Logo lockup using `public/Logo.svg` (embedded, not recreated) in both light and dark contexts to prove it reads correctly at cover scale.
- One-paragraph summary linking to `UI-DESIGN-AUDIT.md` findings this redesign resolves, and explicit list of what's **out of scope** (architecture, entity model, ERP, AI automation — per Sprint 1 gate) so reviewers don't flag scope creep against the wrong deliverable.
- Table of contents mapping each Figma page to its governing document section (audit finding # or design-system section #).

---

## Page 02 — Design System

Direct visual translation of `ETA-DESIGN-SYSTEM.md`. Sub-sections as separate frames, left to right:

1. **Colors** — Navy/Copper/neutral/semantic swatches with hex, name, and usage % annotation (70/20/10 rule visualized as a literal proportion diagram, not just swatches).
2. **Typography** — full 8-step scale (Display → Caption) rendered at actual size with line-height/letter-spacing annotated per row; Inter + Vazirmatn side by side on the same sample sentence to verify visual parity; JetBrains Mono sample for ID/technical-value usage.
3. **Spacing** — the `space-1`…`space-16` scale as a visual ruler.
4. **Elevation & Radius** — shadow tokens (`soft`/`card`/`elevated`/`glow-copper`) shown on identical card shapes side by side; radius tokens likewise.
5. **Iconography** — Lucide icon grid at all 5 approved sizes, color-mapping table (Default/Primary/Highlight/Semantic) rendered as live icon swatches, not just text.
6. **Logo Usage** — correct/incorrect usage examples (minimum clear space, minimum size, color variants on Navy vs. white background, and explicit "never" row: no recoloring, no distortion, no drop shadows) — this is the section most directly protecting the "never replace the logo" governance rule.
7. **Grid & Breakpoints** — the `sm`/`md`/`lg`/`xl`/`2xl`/`3xl` breakpoint set from design-system §7, shown as a responsive frame-width diagram.

Every Figma Style (color, text, effect) created on this page becomes the shared library other pages consume — nothing on Pages 04–13 should use a raw hex or ad hoc text size.

---

## Page 03 — Components

Component library, built as Figma components with variants (not one-off frames), organized in rows matching `ETA-DESIGN-SYSTEM.md` §6:

- **Buttons** — all 7 variants (Primary/Navy, Accent/Copper, Secondary, Outline, Ghost, Danger, Success) × all states (Default/Hover/Focus/Active/Disabled/Loading) × 4 sizes.
- **Cards** — standard, compact-density, KPI/stat card (with Value/Label/Trend/Comparison/Icon/Time Period slots per design-system §6.8), interactive (hover) variants.
- **Tables** — header row, data row, sortable-header state, row-selected state, sticky-header behavior note, pagination bar, bulk-action contextual bar, empty state, loading/skeleton state, responsive card-per-row fallback (design-system §6.3).
- **Forms** — every control (Text Input, Search, Select, Multi-Select, Date Picker, Upload, Checkbox, Radio, Toggle, Text Area) × every validation state (neutral/focus/error/success/disabled/helper-text).
- **Navigation** — Sidebar (expanded + collapsed), Top Nav/Header, Breadcrumb, Tabs, Context Menu, Command Palette.
- **Status** — Badge in all 5 tones (success/warning/error/info/pending/neutral — 6 incl. neutral), each with icon+label pairing shown explicitly.
- **Feedback** — Toast (4 tones), Alert (4 tones), Modal, Drawer, Confirmation Dialog, Empty State, Skeleton Loader (per-component: Card/StatCard/Table/Detail-page shapes), Progress Indicator (determinate + indeterminate).
- **AI Components** — AI Chat bubble/panel, Prompt Input, AI Suggestion card, AI Action (with confirm step), AI Recommendation list item, Knowledge Result card, Workflow Timeline step (queued/running/completed/failed states).
- **Charts** — Line, Area, Bar, Donut, Sparkline — each in a light "just the mark" mobile-KPI form and a full-axes desktop form.

This page is the single library other product pages instance from — Pages 04–13 must not contain a single detached/un-linked component.

---

## Page 04 — Dashboard

Maps to current `src/pages/Dashboard.tsx`, redesigned per audit findings §1.1 (differentiate from generic admin template) and §3.3/§6.9 (real AI surface, not a static list).

- Desktop frame: redesigned stat row (with Comparison + Time Period per §6.8), Sales Pipeline as an actual chart (§6.10) replacing the current progress-bar list, Revenue Summary card, Recent POs, **AI Task Activity reframed using the Workflow Timeline component** (§6.9) instead of the current flat list.
- Tablet frame (768–1023px) — proves the new `md` breakpoint collapsed-sidebar behavior (design-system §7).
- Mobile frame — stat cards stack, charts simplify to sparkline form.
- Empty-state and loading-state frames (first-run / no data yet — relevant since this is a new company's first login).

---

## Page 05 — CRM

Maps to `src/pages/crm/{Companies,Contacts,Inquiries,Deals}.tsx`.

- Companies list (DataTable full spec: sort/filter/pagination/bulk actions).
- Contacts list.
- Inquiries — pipeline/kanban-style view option alongside list view (Inquiries sit pre-RFQ per `CONTENT-SOURCE-MAP.md`'s RFQ Lifecycle reference — worth a visual status flow, not just a table).
- Deals — pipeline stage visualization (redesign of the current Dashboard progress-bar pattern, reused here as the canonical Deals-by-stage view) using the Chart components from Page 03.
- Company/Contact/Deal detail frames using the new Breadcrumb + Tabs navigation pattern (design-system §6.5).

---

## Page 06 — Procurement

Maps to `src/pages/procurement/PurchaseOrders.tsx`.

- PO list (DataTable spec, PO numbers in JetBrains Mono per typography §2.3).
- PO detail with status Workflow Timeline (draft → submitted → approved → shipped → received), reusing the AI-component Workflow Timeline visual pattern from §6.9 for consistency even though this flow isn't AI-driven — same visual language for "staged process," different content.
- Approval flow frame with Confirmation Dialog for approve/reject actions (§6.7).

---

## Page 07 — Suppliers

Maps to `src/pages/suppliers/{SupplierList,SupplierDetail}.tsx`.

- Supplier list (DataTable spec; compact density option given typical column count — country, category, rating, compliance status, risk level).
- Supplier detail — Tabs pattern (Overview / Documents / Performance / Contacts), Badge-based compliance/risk status (color+icon+label per §6.6).
- **Explicit "Demo Data" indicator frame** — addresses the still-open data-realism concern from the prior `MVP-VISUAL-AUDIT.md` §5.1 (mock suppliers modeled on real named companies); this redesign should design the visible "Preview/Demo Data" badge called for in that audit's recommendation, even though fixing the underlying mock data itself is a content/data task, not a Figma task.

---

## Page 08 — Customers

New page relative to current code (no dedicated Customers module exists yet distinct from CRM Companies/Contacts) — scope this page as **wireframe-level only** in Phase 1, flagged for confirmation against ETA-Blueprint's CRM/Customer Domain model (`ETA-Blueprint/02-BLUEPRINT/Domains/Customer Domain.md`, referenced in `CONTENT-SOURCE-MAP.md` as S5) before high-fidelity design, since "Customer" as an entity distinct from "Company"/"Contact" needs to be confirmed against the approved domain model first — building high-fidelity screens for an unconfirmed entity would risk the "never invent entities" governance rule.

---

## Page 09 — Products

Similarly **wireframe-level only** pending domain confirmation — no `src/pages/products/*` exists in the current codebase, and Sprint 1 scope is MOD-1 Supplier Intelligence, not a Product catalog module. Include a placeholder frame referencing the Blueprint entity/domain doc this should trace to, once identified, rather than designing speculative high-fidelity screens ahead of approved scope.

---

## Page 10 — Finance

Same treatment as Products: **wireframe-level only**, out of current Sprint 1 scope. Sketch only what's directly implied by existing data already in the platform (PO totals/currency, deal values) — e.g., a Finance rollup view built from PO + Deal data that already exists — rather than inventing new financial entities (invoicing, ledgers) not yet defined in ETA-Blueprint.

---

## Page 11 — Reports

- Report/Analytics dashboard using the Chart component library from Page 03 — this is where Line/Area/Bar chart types get their primary real usage (pipeline trends over time, PO volume, supplier performance trends).
- Filter/date-range control frame.
- Export frame (ties to DataTable's Export capability, §6.3, generalized to report-level export).

---

## Page 12 — AI Assistant

The highest-priority new surface per audit §3.3 — first place the AI Components library (§6.9) gets a full, dedicated screen rather than being scattered as small cards.

- Full AI Chat panel frame (Prompt Input, message history, AI Suggestions inline).
- AI Recommendations view (e.g., supplier-matching recommendations list).
- Knowledge Results view (document/knowledge-base search results).
- Workflow Timeline for a multi-step AI task, expanded from the compact Dashboard version on Page 04.
- Explicit visual note reinforcing design-system §6.9's rule: Copper + `glow-copper` shadow concentrate here more than anywhere else in the product, by design.
- **Scope guardrail frame:** a visible annotation noting that this page designs the *interface* for AI features already represented in the data model (`AiModel`/`AiTask` — confirmed existing in `src/lib/supabase` types), not new AI automation capability — per the Sprint 1 gate, AI automation itself remains forbidden without a Change Request; this page is UI/UX for the existing AI Platform module, not a proposal to expand its backend scope.

---

## Page 13 — Mobile

Cross-cutting mobile frames for the highest-traffic flows, at standard mobile viewport (390×844, iPhone-class):

- Mobile Dashboard (from Page 04's mobile frame, expanded).
- Mobile Sidebar/MobileNav — redesigned drawer matching new navigation components (Breadcrumb collapses to a back-arrow + current-page title pattern on mobile).
- Mobile DataTable → card-per-row fallback (design-system §6.3), shown for Suppliers list specifically since it has the most columns.
- Mobile AI Chat — full-screen takeover pattern.
- Mobile form flow (e.g., a PO approval) showing Confirmation Dialog at mobile scale.

---

## Page 14 — Prototype

- Click-through prototype wiring: Dashboard → Supplier List → Supplier Detail → AI Recommendation → Confirmation Dialog, and Dashboard → PO List → PO Detail → Approval flow — the two flows that most directly exercise the new component set (Tables, Tabs, Confirmation Dialog, AI components) in one continuous path.
- Include the RTL toggle as a prototype state if Track A (design-system §8) technical RTL frames are far enough along by the time this page is built — otherwise, note it as a follow-up prototype once Persian content (Track B) exists.
- This page is explicitly the **last** one built, after Pages 04–13 have stable frames — prototyping against unstable screens produces throwaway wiring work.

---

## Sequencing & Dependencies

1. **Page 02 (Design System)** must be complete and approved before Page 03 begins — components can't be built without finished styles.
2. **Page 03 (Components)** must be complete before any of Pages 04–13 begin — product screens instance components, they don't define them.
3. **Pages 08, 09, 10** (Customers, Products, Finance) are gated on confirming their underlying entities exist in ETA-Blueprint's approved domain model before going past wireframe — flag to the user/Blueprint owner explicitly rather than assuming scope.
4. **Page 12 (AI Assistant)** and **Page 09/10** both touch AI/Finance-adjacent territory — Page 12 is safe (designing UI for already-existing `AiModel`/`AiTask` data), Pages 09/10 are not yet confirmed — keep these two categories of "AI-adjacent" work clearly separated in review so approval of one doesn't accidentally imply approval of the other.
5. **Page 14 (Prototype)** is last, per its own section above.
6. **Page 01 (Cover)** is created first as a shell (title/TOC) and finished last (once the TOC can accurately reference completed pages).

---

## Handoff Criteria (Phase 1 exit)

This Figma plan, `UI-DESIGN-AUDIT.md`, and `ETA-DESIGN-SYSTEM.md` together constitute the Phase 1 deliverable. Per the task brief: **no React files are modified and no Figma file is created until these three documents are reviewed and approved.** Once approved, Phase 2 (Figma file creation, starting at Page 02) can begin as its own scoped, reviewed effort — implementation into `ETA-Platform` React code follows only after the Figma design itself is signed off, consistent with the "wait for approval after documentation" instruction governing this task.
