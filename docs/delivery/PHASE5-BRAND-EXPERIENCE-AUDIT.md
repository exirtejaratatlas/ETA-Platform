# ETA Website Phase 5 — Brand Experience Audit

document_id: ETA-PHASE5-AUDIT-001
status: Audit only — no code changed
date: 2026-08-09
authority: `NEXT-SESSION-WEBSITE-PHASE4-START.md`, `SESSION-HANDOFF-WEBSITE-PHASE4-1.md`, `SESSION-HANDOFF-WEBSITE-PHASE4-2.md`, `ETA-Blueprint/13-DECISIONS/ETA-Website-Visual-Refinement-Decision-Resolution-V1-V5.md`, `ETA-Blueprint/13-DECISIONS/DECISIONS.md` (CR-001, D1–D4), `Colors.md`/`Components.md`/`Imagery.md` (ETA-VISUAL-001/005/004, all Approved), `ETA-Blueprint/20-BRANDING/03-Website/Technical.md` (ETA-TECH-001, Approved), `ETA-Blueprint/03-ARCHITECTURE/Technology-Stack.md`

Mandatory reading completed (Phase 4 handoffs, Blueprint decision records, Visual Identity docs). **No file was modified in this session** — every finding below was checked against the live `ETA-Platform` repository (`grep`/`git log`, not memory of prior sessions) before being recorded, per the standing "verify claims against actual repo state" rule. No architecture change, new route, Dashboard/CRM/Portal surface, or new product claim is proposed anywhere in this document. Per instruction: **stop after this audit — nothing here is authorized for implementation.**

---

## Part A — Analysis

### 1. V4 — Inner Page Hero Strategy

**Current state:** V4 has been an open Blueprint decision since 2026-08-08 (`ETA-Website-Visual-Refinement-Decision-Resolution-V1-V5.md`). Verified directly in code: `About.tsx` and `Industries.tsx` (and, per the Phase 3.3 audit, all 8 inner pages) open with the identical shell — `<section className="bg-surface-900 py-20">` → centered `max-w-4xl` → copper eyebrow label → H1 → subtext. Phase 4 governance explicitly blocks building a shared `PageHero` component until V4 resolves, and no session since has touched it.

### 2. V5 — Copper System

**Current state:** Broader than the logged decision text describes. The V5 record (2026-08-08) names exactly two conflicting patterns (hero/`CTABand` `copper-500→600` vs. `SiteHeader` nav `copper-600→700`). A direct repo grep across `src/pages/site` + `src/components/site` today shows **six** copper shades in active use: `copper-600` (38 instances), `copper-50` (16), `copper-400` (16), `copper-700` (11), `copper-500` (8), `copper-300` (3). All are within the approved ramp — nothing is off-palette — but the actual footprint is materially larger than what the open question describes, and it has had two more phases (4.1, 4.2) to compound while V5 sat open.

### 3. Industrial Imagery Strategy

**Current state:** `Imagery.md` (Approved) fully specifies photography/illustration/AI-image style rules, but no sourcing or acquisition path has ever been decided, and — confirmed by direct inspection of all 9 public routes' source — **the live site contains zero images of any kind**: no photography, no illustration, no AI-generated visual. It is 100% text, icon, and flat color today.

### 4. 3D Visualization Opportunities

**Current state:** No 3D dependency exists anywhere in `package.json` (checked directly — no `three`, `@react-three/*`, `babylon`, `model-viewer`, or `spline`). No ETA-Blueprint document — not `Technology-Stack.md`, not `Technical.md`, not any Visual-Identity doc — mentions 3D visualization as a requirement, target, or stated aspiration. This is not an "open decision" like V4/V5/imagery; it isn't scoped at all.

### 5. Motion Graphics Opportunities

**Current state:** Two distinct things are both called "motion" across the doc set and should not be conflated. (a) V3's Tailwind CSS animation tokens (`fade-in`, `fade-in-up`, `slide-in-right`, `scale-in`, `shimmer`, `pulse-soft`) are Approved and **fully executed** — confirmed by grep: `animate-fade-in-up` sits on all 9 hero wrappers plus 12 card-grid wrappers, and zero individual card elements, exactly matching Phase 4.1/4.2's handoff claims. (b) `Imagery.md`'s "Motion Graphics" section describes produced motion content ("communicate Process, Data Flow, AI Intelligence, Procurement Journey, Enterprise Connectivity") — this is a video/motion-graphics production question, unrelated to V3's CSS tokens, and is entirely unstarted.

### 6. Lovable / Figma / Claude Code Workflow

**Current state:** Inconsistent across documentation and reality.
- `Technology-Stack.md` lists "UI Design: Figma."
- `Technical.md` (Approved, ETA-TECH-001) lists "Hosting: Lovable, GitHub, Vercel (Future), Cloudflare."
- The actual repo shows **zero Lovable fingerprint** — no `lovable-tagger` plugin, no Lovable-specific config in `vite.config.ts` or `package.json`. It is a plain Vite + React + TypeScript project with no evidence a Lovable project has ever been wired to it.
- `FIGMA-DESIGN-PLAN.md` and `FIGMA-BUILD-SPEC.md` (both `status: Draft — for review`, dated 2026-08-04) describe a full Figma file structure, written explicitly under the stated constraint that "this environment has no live Figma connection." That constraint appears stale in the current session, which has both Figma and Lovable tool access available — a capability that did not exist when those two Draft docs were written.

---

## Part B — Risks

| # | Topic | Risk |
|---|---|---|
| 1 | V4 | 8 independently-maintained copies of the same hero markup already required repeated fixes across the T1–T14 typography workstream; every future polish pass repeats 8×. Visual monotony across capability pages may also under-differentiate ETA's distinct business lines to a buyer comparing pages back to back. |
| 2 | V5 | Six-shade sprawl for what reads as one "primary action" role risks undermining `Colors.md`'s own "accent used sparingly, ~10%" discipline — not a palette violation, but a shade-role consistency gap that reads as sloppy at the premium-B2B distance-viewing `Components.md` explicitly targets ("communicate confidence before the first interaction"). |
| 3 | Imagery | Likely the single largest gap between the live site and `Imagery.md`'s stated ambition. A text/icon-only enterprise site reads as MVP, not premium industrial B2B, at first-impression speed. It's also a blocking dependency for V4 option (c) and for any future motion-graphics work — resolving it late delays multiple other items, not just its own. |
| 4 | 3D | No Blueprint scoping exists at all for this — pursuing it without first establishing whether it belongs on the roadmap risks pure scope invention, the clearest CLAUDE.md Change-Request trigger in this audit. It also trades directly against `Technical.md`'s "Lighthouse Score >95" performance target, and nobody has weighed that tradeoff. |
| 5 | Motion graphics (produced) | Easy to conflate with V3 in conversation ("we already did motion in Phase 4"), risking either under-scoping (assuming CSS polish satisfies the Imagery.md motion vision — it doesn't) or over-scoping (jumping into video production without a sourcing/approval gate analogous to imagery's). |
| 6 | Lovable/Figma/Claude Code | The real risk is workflow ambiguity, not tool choice. Lovable's own MCP tooling description states its agent "reads your project's code, makes edits, and rebuilds the preview automatically" — a second, independent code-writing agent against the same repo, with no built-in visibility into this CLAUDE.md's approval gates, is a realistic drift vector if Lovable is used without an explicit handoff protocol. Figma used upstream-of-code (rather than downstream/documentation) risks recreating the exact "two design truths" conflict `DECISIONS.md`'s D1 already had to resolve once (the Teal/Orange baseline-doc conflict). |

---

## Part C — Recommendations

- **V4:** Do not decide unilaterally. When brought to the decision owner, frame it as three options — (a) keep unified (zero risk, lowest cost), (b) subtle per-page token-level differentiation (icon/eyebrow-color coding by business line — still no imagery, still within existing tokens), (c) imagery-differentiated heroes. Recommend sequencing this decision *after* imagery sourcing (Topic 3), since option (c) is dependent on it and deciding V4 first risks picking an option the imagery decision can't actually support.
- **V5:** Treat as the cheapest, most overdue open item — it blocks nothing else and has already sat open two full phases. Suggest a concrete role→shade table for the decision owner to approve or amend, rather than requesting a decision in the abstract: `50/100` tint backgrounds & icon badges, `400` on-dark accent/eyebrow text, `500` default interactive fill, `600` hover/primary-CTA emphasis, `700` nav-persistent/high-emphasis state, `300` decorative/border-only. This is a proposal to shortcut review, not a decision made in code.
- **Imagery:** Present three sourcing paths for decision, each with its real tradeoff — (a) licensed stock curated tightly against `Imagery.md`'s style rules (fastest, cheapest, carries the "generic stock" risk `Imagery.md` itself warns against), (b) commissioned photography of ETA's actual facilities/team (highest authenticity, slowest, a budget/logistics decision outside Claude Code's scope), (c) AI-generated imagery meeting `Imagery.md`'s "realistic lighting, engineering accuracy" bar (fast, but needs a per-image human review gate — `Imagery.md` explicitly rules out "unrealistic machinery or technically impossible industrial environments," which is a judgment call, not a filter). Recommend the decision owner also name a review authority as part of this decision, not as a follow-up question.
- **3D:** Do not add to any near-term scope. If there's founder interest, route it through a Change Request asking a narrower question first — *which specific use case* (e.g., a rotating-equipment product visualizer) would justify the performance/cost tradeoff — since `Imagery.md`'s actual Motion Graphics guidance is fully achievable in 2D (already-approved V3 tokens, or SVG/Lottie-style animation) without touching 3D at all.
- **Motion graphics (produced):** Keep strictly separate from V3 in planning language to avoid the conflation risk in Part B. Sequence after imagery sourcing is resolved and at least partially executed — a static-image credibility gap is cheaper to close per hour than early video investment, and video without settled imagery direction risks needing rework.
- **Lovable/Figma/Claude Code:** Resolve roles explicitly before operational use of either tool. Figma should most plausibly stay downstream/documentation-of-record (matching `FIGMA-BUILD-SPEC.md`'s own framing), not upstream-of-code, since `ETA-Blueprint` is already the design source of truth. For Lovable, first confirm whether `Technical.md`'s hosting listing is still current intent at all — given zero repo evidence, it may simply be stale and should be corrected in that Approved document rather than left drifted. If Lovable is intentionally revived, it needs an explicit rule that it never writes to a repo Claude Code is concurrently working unless routed through the same Change-Request gate as any other implementation change.

---

## Part D — Required Decisions (Open Decision Required)

In recommended resolution order — cheapest/least-dependent first:

1. **V5 — Copper shade role mapping.** Blocks nothing else; already overdue two phases.
2. **Lovable hosting status** — confirm current vs. stale in `Technical.md`; correct the Approved doc if stale.
3. **Figma workflow role** — upstream-of-code vs. downstream/documentation-of-record.
4. **Industrial imagery sourcing path** — stock vs. commissioned vs. AI-generated, plus review authority.
5. **V4 — Inner-page hero strategy** — recommend deciding after #4, since one option depends on it.
6. **Motion graphics (produced) sourcing** — recommend deciding after #4.
7. **3D visualization** — not yet decision-ready; needs a Change Request narrowing it to a specific use case before it's even a "should we" question.

None of these is decided by this document. All require the Blueprint decision owner, per standing Change Request governance.

---

## Part E — Execution Roadmap

- **Phase 5.0 (this audit)** — Complete. No code changed.
- **Phase 5.1 — Cheap decision round.** Take V5 (copper mapping) and the Lovable/Figma workflow questions to the decision owner. Low cost, unblocks doc/reality drift, does not depend on anything else in this list.
- **Phase 5.2 — Imagery sourcing decision + initial batch.** Gated on decision owner choosing a sourcing path and review authority. Likely the largest-effort item in this roadmap.
- **Phase 5.3 — V4 hero strategy decision + execution.** Run after 5.2 if an imagery-dependent option is chosen; can run in parallel with 5.1 if the decision owner picks the token-only option (b) instead.
- **Phase 5.4 — Motion graphics (produced), if approved.** Sequenced after 5.2.
- **Backlog, not scheduled** — 3D visualization, pending a Change-Request-level use case; not part of this roadmap until one exists.

---

## Implementation Guardrails

Explicitly stated, consistent with the V1–V5 decision record's own guardrails:

- Documentation only.
- No code changes.
- No Tailwind config changes.
- No component changes.
- No page changes.
- No route changes.
- No UI changes.
- No asset changes.
- No 3D library, dependency, or asset introduced.
- No imagery, photography, illustration, or AI-generated visual added.
- No video or motion-graphics asset produced or embedded.
- No Lovable or Figma write operation performed against the live repo or design files.

---

*Companion documents: `SESSION-HANDOFF-WEBSITE-PHASE4-2.md` (Phase 4 closure state this audit extends from), `ETA-Blueprint/13-DECISIONS/ETA-Website-Visual-Refinement-Decision-Resolution-V1-V5.md` (V4/V5 origin), `ETA-Blueprint/20-BRANDING/04-Visual-Identity/Imagery.md`, `Colors.md`, `Components.md` (all Approved), `ETA-Blueprint/20-BRANDING/03-Website/Technical.md`, `ETA-Platform/docs/delivery/FIGMA-DESIGN-PLAN.md` and `FIGMA-BUILD-SPEC.md` (both Draft).*

---

STOP after this audit, per instruction. No implementation begins until the decision owner resolves items in Part D.
