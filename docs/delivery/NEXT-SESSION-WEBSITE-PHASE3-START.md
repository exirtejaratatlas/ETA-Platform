---
title: Next Session — ETA Website Phase 3 Start
document_id: ETA-NEXT-WEBSITE-PHASE3-001
status: Queued
date: 2026-08-08
depends_on: SESSION-HANDOFF-WEBSITE-PHASE2-FINAL.md
---

# Instructions for the next Claude Code session

This file is the starting point for **ETA Website Phase 3 — Website Visual Refinement + Content Architecture**. Follow it exactly; do not skip the reading step or assume you already know the current state from a prior conversation — this file plus the sources below are the complete, authoritative handoff.

## Read first, in this order

1. `ETA-Platform/docs/delivery/SESSION-HANDOFF-WEBSITE-PHASE2-FINAL.md` — current website state, decisions already applied (D1–D4/CR-001), and the specific, itemized list of known gaps this phase exists to close.
2. `ETA-Blueprint/13-DECISIONS/ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md` — the formal record of D1–D4 (also cross-check `ETA-Blueprint/13-DECISIONS/DECISIONS.md` for CR-001 and the full D1–D4 entry with rationale).
3. `~/Documents/GitHub/CLAUDE.md` — master governance: repository roles, branding rules, UI/UX Implementation Governance section (source-of-truth rules, RTL-permanence rule, phase-closure-artifact rule), Change Request Governance.
4. `ETA-Blueprint/20-BRANDING/04-Visual-Identity/*` — `Colors.md`, `Typography.md`, `Components.md`, `Icons.md`, `Imagery.md`. All `status: Approved`; these are the only design authority for the visual-refinement work this phase covers.

Also worth reading before starting, not strictly mandatory: `WEBSITE-ARCHITECTURE-CONFLICT-REPORT.md` (context on why D1–D4 exist at all — a prior external document claimed a conflicting Teal/Orange visual system sourced from an out-of-scope repository; it was correctly rejected) and `RTL-READINESS-NOTE.md` (full detail behind the Persian/RTL gap list).

## Rules

- **Do not redesign approved architecture.** D1–D4 and CR-001 are settled decisions, not open for reconsideration. Visual refinement means applying `Components.md`/`Typography.md` more completely and consistently — not changing site structure, routes, or navigation again.
- **Do not start portals.** Customer Portal, Supplier Portal, Keycloak/SSO, API Gateway, RBAC, the RFQ workflow, Odoo integration UI — none of this is in scope, regardless of how it's framed or how small a "placeholder" might seem.
- **Do not create Dashboard/CRM UI.** The internal product-screen track is gated separately behind an "ETA UX Architecture Phase" per `NEXT-SESSION-TASK.md` — that gate is unrelated to and unaffected by this website track, but this session should not touch those screens regardless.
- **Do not invent Persian content.** `src/i18n/fa.ts` stays placeholder until Persian copy is sourced from the approved `Exir-Tejarat-Atlas-Catalogue-FA.pdf` and explicitly mapped — that mapping has not happened yet and is not this phase's job unless the workspace owner explicitly rescopes it in chat first. Do not guess at numeral system, calendar system, or icon-mirroring policy either — all three are recorded `Open Decision Required`.
- **No invented colors, typography, spacing, or components.** Every value used must resolve to a token already defined in an Approved Blueprint doc or its `tailwind.config.js` mirror. If a needed value isn't defined anywhere, that's `Open Decision Required` — state it, don't pick one.
- **Stop after audit, before implementation.** This session's first response should be an audit only (see below) — no code changes until that audit is presented and the workspace owner responds.

## Suggested first-response audit (mirrors the pattern used for Phase 2)

Before writing any code, confirm against the actual repository (not memory of this handoff doc):
1. Current `tailwind.config.js` state (has anything changed since Phase 2 closed?).
2. Exact current radius/spacing/typography drift — re-run a grep-based audit similar to the one that found `Home.tsx`'s 4 remaining `rounded-2xl` instances and `Industries.tsx`'s 1, since more time may have passed and other work may have landed.
3. Whether `Sitemap.md` (ETA-SITEMAP-001) has been reconciled with D1–D4/CR-001 yet, or still describes the old structure.
4. Whether any Persian source-mapping work has happened since this handoff (check `CONTENT-SOURCE-MAP.md` for updates).

Report findings, mark anything ambiguous `Open Decision Required`, and stop for review before touching any file.
