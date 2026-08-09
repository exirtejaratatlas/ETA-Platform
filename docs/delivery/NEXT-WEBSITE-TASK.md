# Next Website Execution Phase

document_id: ETA-NEXT-WEBSITE-002
status: Queued
date: 2026-08-08
supersedes: prior version of this file (Phase 1 page-build task — completed, see `SESSION-HANDOFF-WEBSITE-PHASE1-FINAL.md`)
depends_on: `SESSION-HANDOFF-WEBSITE-PHASE1-FINAL.md`, `SESSION-HANDOFF-WEBSITE-FOUNDATION.md`, `RTL-READINESS-NOTE.md`, `CONTENT-SOURCE-MAP.md`

---

## Next phase

**ETA Website UX Phase 2 — Content Architecture & Inner Page Planning**

---

## Before coding anything, review

- `ETA-Blueprint/20-BRANDING/03-Website/Sitemap.md` — note it currently disagrees with reality: it doesn't yet list `/equipment-supply`, `/steel-trading`, `/supplier-network` (added per CR-001, `ETA-Blueprint/13-DECISIONS/DECISIONS.md`), and it still lists several sections not yet built (Manufacturers, Projects/Case Studies, Knowledge Center, Blog, Careers, Legal, Suppliers/registration). Reconciling the document with reality should be part of this phase's planning output, not skipped.
- **User Journey documents** — `Open Decision Required`. Searched `ETA-Blueprint` for journey/customer-journey documentation; none exists at any path. This phase cannot "review" a document that hasn't been written — flag this explicitly rather than inferring a journey from the sitemap alone.
- **Services structure** — `src/pages/site/Services.tsx` and the three new detail pages (`EquipmentSupply.tsx`, `SteelTrading.tsx`, `SupplierNetwork.tsx`) it now links to; also `CONTENT-SOURCE-MAP.md` for what's verified vs. not yet mapped.
- **Customer journey** — same status as User Journey documents: `Open Decision Required`, not found in ETA-Blueprint.

Given both journey documents are missing, an early Phase 2 output should likely be producing them (Information Architecture / Navigation Model / User Journeys), the same pattern `NEXT-SESSION-TASK.md` already established for the internal-product-screen track ("ETA UX Architecture Phase"). Confirm with the workspace owner before assuming that's in scope here too, rather than starting to draft journeys unprompted.

---

## Carried-forward open items (not resolved by Phase 1)

- Header navigation placement for the 3 CR-001 pages (`Open Decision Required`)
- `Sitemap.md` text not yet reconciled with CR-001
- Persian translation, RTL visual verification, icon-mirroring policy, numeral system, calendar system — all `Open Decision Required`, see `SESSION-HANDOFF-WEBSITE-PHASE1-FINAL.md`
- Suppliers / Become-a-Supplier / Registration page (`Sitemap.md`'s "Suppliers" section) — still not built, distinct from the new public `/supplier-network` positioning page

---

## Rules

- Do not redesign architecture.
- Use approved branding docs only.
- No fake assets, no invented copy.
- No new top-level routes without a logged Change Request (per the CR-001 precedent).
- Close this phase the same way Phase 1 closed: validation → session handoff document → next-task document.

## Do NOT start

- Dashboard UI
- CRM UI
- Supplier Portal UI
- Finance UI
- AI Assistant UI

until UX Architecture approval (this applies to both the internal-product-screen track gated in `NEXT-SESSION-TASK.md` and, pending the workspace owner's confirmation above, potentially this website track too).
