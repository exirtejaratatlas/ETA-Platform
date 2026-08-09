---
title: ETA Website — Phase State Snapshot (Post Phase 5.1)
document_id: ETA-WEBSITE-PHASE-STATE-SNAPSHOT-001
status: Closed
date: 2026-08-09
authority: >
  SESSION-HANDOFF-WEBSITE-PHASE3-3-FINAL.md, NEXT-SESSION-WEBSITE-PHASE4-START.md,
  SESSION-HANDOFF-WEBSITE-PHASE4-1.md, SESSION-HANDOFF-WEBSITE-PHASE4-2.md,
  SESSION-HANDOFF-WEBSITE-PHASE5-1.md, ETA-Blueprint/13-DECISIONS/ETA-Website-Typography-
  Decision-Resolution-T10-T11.md, .../T12-T13.md, .../ETA-Website-Brand-Experience-Decision-
  Resolution-V1.md, ETA-Blueprint/20-BRANDING/04-Visual-Identity/{Typography,Components,Icons,
  Imagery}.md (all Approved), RTL-READINESS-NOTE.md, CONTENT-SOURCE-MAP.md
purpose: >
  Single frozen snapshot of ETA-Platform website state after Phase 5.1. Consolidates five
  session handoffs and the governing decision/branding records into one document so a future
  Claude Code session can resume without re-reading the full chain or losing context.
---

# ETA Website — Phase State Snapshot

This document is the mandatory starting point for any future session continuing website work.
It supersedes nothing — the five source handoffs and decision records it consolidates remain
the authoritative detail behind each line item — but it is the single file to read first.

---

## Current Completed Phases

### Phase 3 — Design System Alignment
- Typography migration **T1–T14** fully closed (`PHASE3-2-TYPOGRAPHY-CLOSURE-AUDIT.md`): every
  token usage count matches its migration record; 6 remaining raw Tailwind typography classes
  are documented intentional exceptions.
- Visual Refinement Governance — audit (`PHASE3-3-VISUAL-REFINEMENT-AUDIT.md`) swept hero
  composition, section rhythm, card quality, button hierarchy, icon consistency, enterprise
  language, imagery readiness, and motion opportunities across all 9 public routes. Decisions
  V1/V2/V3 resolved and approved; V4/V5 logged open (later resolved in Phase 5, see below).

### Phase 4 — Visual Refinement Execution
- **Card shadow compliance (V1)** — `shadow-soft` applied to 19 of 21 `rounded-xl border`
  cards across 9 public pages. 2 explicit exclusions: dashed-border "coming soon" placeholders
  (`SupplierNetwork.tsx:65`, `PlatformOverview.tsx:70`) and the dark-hero stat badge
  (`Home.tsx:160`, not a `Components.md`-style card).
- **Icon size compliance (V2)** — all 10 off-scale icons corrected: 9× `14px→16px`, 1×
  `18px→20px`, onto the approved 16/20/24/32/48 scale. Zero remaining off-scale icons confirmed
  by grep.
- **Motion token hero usage (V3, Phase 4.1)** — `animate-fade-in-up` applied to the hero content
  wrapper on all 9 public pages.
- **Card-grid motion usage (V3, Phase 4.2)** — `animate-fade-in-up` extended to 12 card-grid
  wrapper `<div>`s (never on individual cards). One flagged deviation: `SupplierNetwork.tsx`'s
  dashed placeholder is a single standalone card with no separate grid wrapper, so it was left
  unanimated rather than animating the card directly (conflicts with the "no individual card
  animation" rule).
- V1/V2/V3 are now **fully executed** — no approved-but-unexecuted Phase 4 candidate remains.

### Phase 5 — Brand Experience
- **Copper semantic migration completed (Phase 5.1)** — V5's canonical role mapping
  (`copper-50/100`=surfaces/badges, `copper-300`=decorative/non-interactive, `copper-400`=
  eyebrow/secondary accent, `copper-500`=interactive highlight/selected state, `copper-600`=
  primary action/CTA, `copper-700`=high-emphasis hover/active) applied to 3 mismatch categories:
  - 3 CTA buttons normalized `copper-500→copper-600` (`Home.tsx`, `EquipmentSupply.tsx`,
    `PlatformOverview.tsx`) to match `SiteHeader.tsx`'s already-correct pattern.
  - 7 eyebrow captions normalized `copper-600→copper-400` (6 page-level + `SiteUI.tsx`'s
    `SectionHeading` default branch).
  - 2 nav active-states normalized to `copper-500` (desktop `text-copper-600→500`, mobile
    `text-copper-700→500`, background kept).
  - Left unchanged, explicitly deferred: ~16 icon-badge instances (`bg-copper-50 text-copper-600`)
    and 3 `copper-300` uses — pending a broader accent-token cleanup decision.
  - **V4 (Hero Strategy)** resolved same date: inner-page heroes stay **unified**; differentiation
    only via future approved imagery/content/product-specific experience; no `PageHero`
    extraction (that remains a separate, independent architecture decision).

All three phases closed with clean `npm run typecheck` / `npm run build` and full 9-route
browser/console validation (0 console errors on every route each pass).

---

## Current Website State

**Technology stack:** React `^19.2.7`, Vite `^8.1.1`, TypeScript `~6.0.2`, Tailwind CSS
`^3.4.15`, `@supabase/supabase-js` `^2.45.0`.

**Implemented routes** (`src/App.tsx`):
- Public website (9): `/`, `/about`, `/industries`, `/products-capabilities` (`/services`
  redirects here), `/equipment-supply`, `/steel-trading`, `/supplier-network`, `/platform`,
  `/contact`.
- Platform/product surfaces (pre-existing, outside website workstream scope): `/dashboard`,
  `/crm/companies`, `/crm/contacts`, `/crm/deals`, `/crm/inquiries`,
  `/procurement/orders`, `/suppliers`, `/suppliers/:id` (`/procurement/suppliers` redirects
  here), `/supplier-portal`, `/ai-platform`, `/settings`.

**Design system status:** Typography (T1–T14) and Visual Refinement (V1–V3) fully migrated and
executed. Brand Experience (V4 unified-hero, V5 copper roles) resolved and V5 substantially
executed (3 of the identified mismatch categories migrated; icon badges and `copper-300` remain
open by explicit deferral, not oversight).

**Tailwind token status** (`tailwind.config.js`):
- `fontSize`: 12-token scale live — `display-sm/display/display-lg`, `h1–h4`,
  `component-title`, `body-lg/body/body-sm`, `caption`.
- `colors.copper`: 50–950 ramp, canonical role mapping per V5 (see above).
- `colors.surface`: 0–950 Navy-family neutral ramp (`surface-900` = ETA Navy `#0f172a`).
- `boxShadow`: `soft`, `card`, `elevated`, `glow-copper` all defined; `soft` is the one in
  active use per V1.
- `animation`/`keyframes`: 6 tokens defined (`fade-in`, `fade-in-up`, `slide-in-right`,
  `scale-in`, `shimmer`, `pulse-soft`); only `fade-in-up` is currently used sitewide (hero +
  card-grid wrappers per V3). The other 5 remain defined but unused.

**Animation token status:** See above — `fade-in-up` only, applied per V3's approved scope
(hero content + card-grid wrappers, never individual cards, no stagger/delay).

**Typography status:** Complete per `PHASE3-2-TYPOGRAPHY-CLOSURE-AUDIT.md` — every token usage
count matches its migration record; 6 raw Tailwind typography classes remain as documented
intentional exceptions.

**Color system status:** `Colors.md` (ETA-VISUAL-001) fully compliant for Navy/surface tokens;
Copper role-mapping (V5) largely migrated with two explicitly-deferred exception categories
(icon badges, `copper-300`) awaiting a future, separately-scoped decision to close out.

**Repository/git state at time of this snapshot:** `ETA-Platform` is on `main`, not yet
committed for this pass. Working tree has both modified tracked files (component/page files
across the phases above, `tailwind.config.js`, `.claude/launch.json`) and numerous untracked
`docs/delivery/*.md` files (phase audits, session handoffs, design-system drafts) accumulated
across Phases 3–5. This snapshot's own commit covers **only** the new file listed under
"What this snapshot changed" below — none of the pre-existing uncommitted source or doc changes
are staged or committed by this pass.

---

## Confirmed Not Implemented

- **Industrial imagery** — zero photography/illustration exists on the public site. Correctly
  absent (not faked); `Imagery.md` specifies style/subject but not an acquisition path.
- **3D visualization** — no 3D tooling, dependency, or asset exists anywhere in the repo; no
  Blueprint document specifies a use case.
- **Produced motion graphics/video** — distinct from V3's CSS animation tokens; no
  motion-graphics or video asset, format, or production path exists.
- **Persian/RTL implementation** — technical scaffold exists (`src/i18n/`: `LanguageProvider`,
  `LanguageSwitcher`, `en.ts`, `fa.ts` placeholders, `localeFormat.ts` stubs; `index.html`/
  `index.css` already RTL-flip-ready) but **nothing is mounted** — not imported by `main.tsx`,
  `App.tsx`, or any page. 6 open decisions block progress (numeral system, calendar system,
  icon-mirroring policy, nav order under RTL, per-component RTL behavior for data-dense
  components, Vazirmatn self-hosting). 9 files still use physical-direction Tailwind utilities
  needing logical-property conversion before RTL can be safely enabled (see
  `RTL-READINESS-NOTE.md`).
- **Shared PageHero architecture** — explicitly declined for Phase 3.2 (T12) and reaffirmed by
  V4: each of the 8 inner pages keeps individual hero markup. Component extraction remains a
  separate, independent architecture decision, not implied by any current resolution.
- **Hero differentiation strategy** — V4 resolved: heroes stay **unified** for now: page-specific
  differentiation is explicitly deferred until imagery/content/product-experience decisions are
  made — this is a resolved "stay unified" outcome, not an unresolved open item.

---

## Current Open Decisions

- **Imagery sourcing strategy** — no acquisition path (photography commission, stock license, AI
  generation under `Imagery.md`'s constraints) has been decided. Blocks all industrial imagery.
- **Lovable role** — hosting/deployment role status not addressed in any session covered by this
  snapshot; flagged in Phase 5.1's closing note as a remaining Phase 5 open item.
- **Figma workflow** — role in the design pipeline (source-of-truth vs. downstream reconciliation)
  not addressed in any session covered by this snapshot; flagged in Phase 5.1's closing note.
- **3D scope** — not scoped at Blueprint level; likely Change Request territory if ever proposed.
- **Motion graphics production** — sourcing/production path for produced (non-CSS-token) motion
  content undecided; flagged in Phase 5.1's closing note.
- **Icon-badge copper-600 usage and `copper-300` usage** — explicitly deferred pieces of the V5
  migration; need their own scoped decision/pass to close out fully.
- **RTL's 6 logged open items** (numeral system, calendar system, icon-mirroring policy, nav
  order under RTL, per-component RTL behavior, Vazirmatn self-hosting) — unresolved, blocking
  Track A completion and all of Track B (Persian translation).

---

## Rules For Future Sessions

Future agents must:

- **Read this snapshot first**, before any other website-workstream action.
- **Respect approved decisions** — T1–T14 (typography), V1–V3 (visual refinement, executed),
  V4 (unified heroes, resolved), V5 (copper role mapping, resolved and partially executed) are
  not open questions; do not re-litigate them.
- **Never redesign approved UI without approval** — token-level fixes conforming existing UI to
  an already-Approved Blueprint doc are implementation, not redesign; changing how an approved
  page looks or is structured is redesign and needs approval.
- **Never modify blocked areas without a decision record**: no imagery without a sourcing
  decision, no 3D library/dependency, no motion-graphics/video production, no Persian
  translation or RTL wiring before the 6 logged items are resolved, no shared `PageHero`/
  `PageHeader` component without an explicit architecture decision superseding V4/T12.
- Treat `ETA-Blueprint` as authority per the top-level governance file
  (`~/Documents/GitHub/CLAUDE.md`); any deviation from approved architecture, domain model,
  entity model, UI map, or API contracts requires a Change Request there first.

---

## What this snapshot changed

- **Added:** `ETA-Platform/docs/delivery/ETA-WEBSITE-PHASE-STATE-SNAPSHOT.md` (this file).
- **Not modified:** source code, `tailwind.config.js`, components, pages, assets. Consistent
  with the audit-and-record nature of this task, no other file in the working tree was touched
  by this pass — the pre-existing uncommitted changes noted under "Repository/git state" above
  were not created by, and are not part of, this snapshot.

STOP after this snapshot. Documentation only.
