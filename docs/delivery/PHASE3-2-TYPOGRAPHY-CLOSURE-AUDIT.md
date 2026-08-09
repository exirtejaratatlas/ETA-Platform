# ETA Website Phase 3.2 — Typography Final Closure Audit

document_id: ETA-PHASE3-2-CLOSURE-001
status: Audit only — no code changed
date: 2026-08-08
authority: `SESSION-HANDOFF-WEBSITE-PHASE3-2F.md`, all files in `ETA-Blueprint/13-DECISIONS/`, `Typography.md` (ETA-VISUAL-002, Approved)

Mandatory reading completed, including every decision record in `ETA-Blueprint/13-DECISIONS/` (T1–T14 across 4 files, plus the pre-existing `DECISIONS.md` and architecture-record). **No file was modified in this session.** `npm run typecheck` and `npm run build` were run as read-only verification only — neither changes any file.

---

## 1. Token usage compliance

`tailwind.config.js`'s `fontSize` scale now holds 12 tokens: `display-sm` (36px), `display` (48px), `display-lg` (56px), `h1` (40px), `h2` (32px), `h3` (24px), `h4` (20px), `component-title` (18px), `body-lg` (18px), `body` (16px), `body-sm` (14px), `caption` (12px) — each with the correct heading (120%/−1%) or body (150%/0%) or caption (140%/+1%) line-height/letter-spacing bundled, verified by reading the file directly.

Live usage counts, verified by grep across `src/pages/site` and `src/components/site`:

| Token | Sitewide instances | Expected | Match |
|---|---|---|---|
| `display-sm`/`display`/`display-lg` | 1 call site (`Home.tsx`, all three in one `<h1>`) | 1 (Home is the only Hero/Display instance) | ✓ |
| `h1` (Page Title desktop step) | 8 | 8 inner pages | ✓ |
| `h2` (Section Heading desktop step + Page Title mobile step) | 1 source instance (`SiteUI.tsx`) + 8 (Page Title) | 1 centralized + 8 | ✓ |
| `h3` (Section Heading mobile step) | 1 source instance (`SiteUI.tsx`) | 1 centralized | ✓ |
| `h4` (Component Title desktop step) | 22 | 22 | ✓ |
| `component-title` | 22 | 22 | ✓ |
| `body-lg` | 13 | — | consistent with Low-risk tier migration |
| `body` | 59 | — | consistent |
| `body-sm` | 44 | — | consistent |
| `caption` | 25 | — | consistent |

All counts match the migration record exactly — no under- or over-application found.

---

## 2. Remaining raw Tailwind typography classes

A full sweep of `src/pages/site` and `src/components/site` for raw `text-xs`/`text-sm`/`text-base`/`text-lg`/`text-xl`/`text-2xl`/`text-3xl`/`text-4xl`/`text-5xl`/`text-6xl` and arbitrary `text-[...]` values returns exactly **6 instances**, all previously identified and documented — none are new or unaccounted for:

| File | Line | Class | Status |
|---|---|---|---|
| `Home.tsx` | 98 | `text-2xl font-semibold text-copper-400 sm:text-3xl` | Intentional exception — T5 (KPI numbers), explicitly Open Decision Required |
| `SiteFooter.tsx` | 36 | `text-sm font-semibold text-white` | Intentional exception — brand wordmark, not one of the 7 typography roles |
| `SiteHeader.tsx` | 26 | `text-sm font-semibold text-surface-900` | Intentional exception — brand wordmark, same reasoning |
| `SiteHeader.tsx` | 27 | `text-[10px] text-surface-400 font-medium tracking-wide uppercase` | Intentional exception — sub-caption micro-text, Open Decision #4 |
| `EquipmentSupply.tsx` | 78 | `text-[10px] font-semibold text-white` | Intentional exception — sub-caption step-badge number, Open Decision #4 |
| `CTABand.tsx` | 37 | `text-2xl sm:text-3xl font-semibold text-white` | Intentional exception — T11, `CTABand` is explicitly independent of the token system |

Zero unexplained or leftover raw classes exist. Every survivor traces to a specific, already-documented decision or open item.

---

## 3. Hero Display compliance (T13/T14)

**Compliant.** `Home.tsx`'s hero: `text-display-sm sm:text-display lg:text-display-lg font-semibold text-white` — exact token names per T14, exact three-tier responsive structure per T13. The old `tracking-tight` and custom `leading-[1.1]` override are both gone (confirmed by grep — zero `leading-[` instances remain anywhere in `src/pages/site` or `src/components/site`), so the tokens' bundled −1%/120% values apply cleanly with no conflicting declaration.

---

## 4. Page Title compliance (T12)

**Compliant.** All 8 inner-page `<h1>`s (`About`, `Contact`, `EquipmentSupply`, `Industries`, `PlatformOverview`, `Services`, `SteelTrading`, `SupplierNetwork`) read identically: `text-h2 sm:text-h1 font-semibold text-white` — exact match to T12, byte-identical across all 8 files (verified by grep, not sampled). No shared component was created, per T12's explicit scope. All 8 remain semantic `<h1>` tags.

---

## 5. Section Heading compliance (T10)

**Compliant.** `SiteUI.tsx`'s `SectionHeading`: `text-h3 sm:text-h2 font-semibold` — exact match to T10. Centralized in one component, so all 23 rendered call sites across every page inherit it automatically; no page-level drift is possible by construction.

---

## 6. Component Title compliance (T6)

**Compliant.** `grep -c "text-component-title"` across `src/` returns exactly 22, matching the full instance count from `PHASE3-2C-COMPONENT-TITLE-MIGRATION-REPORT.md`'s mapping precisely — no more, no fewer. Pattern confirmed: `text-component-title sm:text-h4 font-semibold` at every one of the 22 sites (`SiteUI.tsx`'s `Pillar`, and the 21 scattered page-level instances). The 8 non-semantic elements (styled `<p>`/`<span>` rather than actual heading tags) remain exactly that — a known, previously-flagged gap, not a new one.

---

## 7. Button typography scope compliance (T9)

**Compliant.** `Button.tsx`'s `sm`/`md`/`lg`/`icon` sizes remain untouched — still `font-medium`, still raw `text-xs`/`text-sm`/`text-base` (not migrated to `body-sm`/`caption` tokens), confirming the internal CRM/Dashboard app was never reached by this workstream. `Button.tsx`'s `cta` size is `body-sm` + `font-semibold`, applying only where `CTABand` uses it. `SiteHeader.tsx`'s two nav-CTA pills (the only public-site button instances that needed a weight correction) both read `text-body-sm font-semibold`, confirming T4/T9 were applied exactly at their intended, narrow scope — public-site buttons only, nothing shared with internal screens.

---

## 8. CTABand independence (T11)

**Compliant.** `CTABand.tsx`'s heading is `text-2xl sm:text-3xl font-semibold text-white` — this is its **original, pre-migration** class string, unchanged since Phase 3.1. `git diff` confirms zero modifications to this file across the entire T1–T14 workstream. T11's independence is not just declared in a decision document — it is verifiably true in the code: `CTABand` was never touched by any of the 8 execution sessions that migrated every other heading role sitewide.

---

## Summary

### Compliant areas
All 8 checked items (1–8 above) are fully compliant with their respective decisions. Token definitions, usage counts, and every migrated instance match the decision records exactly.

### Remaining violations
**None.** Every raw Tailwind typography class remaining in the codebase (6 total, listed in §2) is a documented, intentional exception — not an unaddressed compliance gap.

### Intentional exceptions (carried forward, not resolved by this workstream)
- KPI/stat-number typography (`Home.tsx:98`) — T5, Open Decision Required.
- Two brand-wordmark text spans (`SiteHeader.tsx:26`, `SiteFooter.tsx:36`) — never assigned to any of the 7 typography roles.
- Two sub-caption micro-text instances (`SiteHeader.tsx:27`, `EquipmentSupply.tsx:78`) — Open Decision #4, below the approved scale's floor.
- `CTABand`'s entire heading/button typography — T11, deliberately independent by design, not a gap.
- 8 non-semantic "component title" elements (`<p>`/`<span>` styled as titles) — flagged during Component Title execution, a semantic-HTML observation outside this workstream's mandate, not a typography-token gap.
- Icon-scale outliers (14px/18px vs. `Icons.md`'s 16/20/24/32/48 grid) — noted in the original Phase 3 audit, never part of the typography-token workstream.

### Files affected by this audit
None — read-only. Files inspected: `tailwind.config.js`; all 9 `src/pages/site/*.tsx`; `src/components/site/SiteUI.tsx`, `CTABand.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`; `src/components/ui/Button.tsx`; all 7 decision records in `ETA-Blueprint/13-DECISIONS/`.

### Recommendation for next phase

Phase 3.2 (Typography) is substantively closed — every decision from T1 through T14 is either fully implemented and verified, or stands as a deliberately-scoped, documented exception. Two paths are reasonable next steps, and this audit does not pick between them:

1. **Close remaining typography exceptions first** (small, bounded): resolve T5 (KPI numbers) and Open Decision #4 (sub-caption micro-text) — both are narrow, well-understood gaps that would bring the typography system to 100% coverage with zero open items.
2. **Move to the next Phase 3 track**: per the original `PHASE3-2-TYPOGRAPHY-AUDIT.md`'s recommended order, the workstream after typography was Component Polish / Premium Visual Refinement (spacing rationale, imagery, art direction) — none of which depends on the two remaining typography exceptions being closed first.

Either is defensible; this audit surfaces the choice rather than making it.

---

STOP after this audit, per instruction. No code, Tailwind config, component, or page was changed.
