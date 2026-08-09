---
title: Next Session — ETA Website Phase 4 Start
document_id: ETA-NEXT-WEBSITE-PHASE4-001
status: Queued
date: 2026-08-08
depends_on: SESSION-HANDOFF-WEBSITE-PHASE3-3-FINAL.md, ETA-Blueprint/13-DECISIONS/ETA-Website-Visual-Refinement-Decision-Resolution-V1-V5.md, ETA-Blueprint/13-DECISIONS/ETA-Website-Typography-Decision-Resolution*.md (T1–T14)
---

# Instructions for the next Claude Code session

This file is the mandatory starting point for continuing **ETA Website Phase 4 — Visual Refinement Execution**. Follow it exactly; do not assume prior conversation context — this file plus the sources below are the complete, authoritative handoff.

## Mandatory reading order

1. `ETA-Platform/docs/delivery/SESSION-HANDOFF-WEBSITE-PHASE3-3-FINAL.md` — Phase 3.3 closure state, remaining open decisions (V4/V5), Phase 4 entry state table, approved execution candidates, governance rules.
2. This file (`NEXT-SESSION-WEBSITE-PHASE4-START.md`).
3. Website decision records — `ETA-Blueprint/13-DECISIONS/ETA-Website-Visual-Refinement-Decision-Resolution-V1-V5.md` and the full typography chain (`ETA-Website-Typography-Decision-Resolution*.md`, T1–T14).
4. Branding authority documents — `ETA-Blueprint/20-BRANDING/04-Visual-Identity/Colors.md`, `Typography.md`, `Components.md`, `Icons.md`, `Imagery.md` (all status: Approved).

Do not start implementation before completing this reading order.

---

## What's authorized this phase

Only the three Priority items from `SESSION-HANDOFF-WEBSITE-PHASE3-3-FINAL.md`'s "Approved Phase 4 Execution Candidates" section:

1. **V1 — Card Shadow Compliance.** Apply `Components.md`'s soft-shadow spec to the 20 of 21 cards currently missing it.
2. **V2 — Icon Size Compliance.** Normalize the 10 off-scale icon instances (9 at 14px, 1 at 18px) to `Icons.md`'s approved 16/20/24/32/48 scale.
3. **V3 — Subtle Motion Token Usage.** Apply the 6 existing Tailwind animation tokens (`fade-in`, `fade-in-up`, `slide-in-right`, `scale-in`, `shimmer`, `pulse-soft`) to hero content and card grids — subtle enterprise usage only, no excessive animation, no layout movement, no performance impact.

Each of these is a token-level compliance fix against an already-Approved Blueprint document — no fresh decision is required to begin, per the UI/UX Implementation Governance precedent (token-level fixes that make existing UI conform to an already-Approved doc are implementation, not redesign).

## What remains blocked — do not start

- **V4 (Hero Strategy)** and **V5 (Copper System)** — both explicitly open; do not implement anything that presumes an answer to either. If you believe either should be resolved, raise it as a question for the Blueprint decision owner — do not decide it unilaterally in code.
- **Imagery** — sourcing/acquisition path undecided. Do not add any photography, illustration, stock image, or AI-generated image to the site.
- **3D visualization** — not scoped at Blueprint level, no tooling exists in the repo. Do not add any 3D library, dependency, or asset.
- **Motion graphics/video** — separate from V3's CSS-token usage. Do not produce or embed any video or motion-graphics asset.
- **Persian/RTL implementation** — technical scaffold exists (`src/i18n/`) but is unmounted; do not wire it in, do not begin Persian translation, until the 6 logged RTL open decisions are resolved.

## Governance rules (carried forward)

- Do not redesign architecture, add new routes, or add Dashboard/CRM/Portal surfaces or new product claims.
- Do not create a shared `PageHero`/`PageHeader` component — each of the 8 inner pages keeps its individual hero markup until V4 is resolved and explicitly authorizes consolidation.
- Do not introduce 3D libraries.
- Do not add imagery without an approved source strategy.
- Do not start Persian translation without RTL/content decisions resolved first.
- Any deviation from approved architecture, domain model, entity model, UI map, or API contracts requires a Change Request through `ETA-Blueprint` before any code is written.

## Suggested execution order for this session

1. V1 (card shadow) — lowest risk, affects every page, closes a real `Components.md` compliance gap.
2. V2 (icon-scale cleanup) — small, mechanical, closes the last `Icons.md` compliance gap.
3. V3 (motion tokens) — apply within stated limits; verify no layout shift or performance regression (browser check on all 9 public routes, `npm run typecheck` / `npm run build` clean).

Close this phase the same way Phase 3.3 was closed: validation (typecheck, build, browser/console check, no regressions) + a session handoff document + a next-task document naming what remains out of scope until approved.

---

STOP after recording this handoff, per instruction.
