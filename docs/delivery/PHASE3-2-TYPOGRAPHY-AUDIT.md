# ETA Website Phase 3.2 — Typography System Audit & Migration Plan

document_id: ETA-PHASE3-2-TYPOGRAPHY-AUDIT-001
status: Audit complete — no code changed
date: 2026-08-08
authority: `ETA-Blueprint/20-BRANDING/04-Visual-Identity/Typography.md` (ETA-VISUAL-002, Approved), `Components.md` (ETA-VISUAL-005, Approved)
depends_on: `ETA-Platform/docs/delivery/SESSION-HANDOFF-WEBSITE-PHASE3-1.md`

Mandatory reading completed: `SESSION-HANDOFF-WEBSITE-PHASE3-1.md`, `Typography.md`, `Components.md`. Current repo state re-verified by grep/read against the live files (not assumed from the prior session). **No code was modified in this session** — audit and planning only, per instruction.

---

## 0. Headline finding

The type-scale tokens defined in `tailwind.config.js` (`display`/`h1`–`h4`/`body-lg`/`body`/`body-sm`/`caption`) are **single fixed pixel values with no responsive variants**, matching `Typography.md`'s scale exactly. The current site, however, uses Tailwind's raw scale (`text-xs`…`text-6xl`) **responsively** (different class at different breakpoints) and, critically, **the same raw class is reused for two different semantic roles in several places**:

- `text-3xl` is simultaneously: the **desktop** size of every `SectionHeading`/`CTABand` H2, *and* the **mobile/base** size of every inner-page hero H1.
- `text-4xl` is simultaneously: the **desktop** size of every inner-page hero H1, *and* the **mobile/base** size of Home's hero H1.

A mechanical "replace every `text-3xl` with `h2`" or "every `text-4xl` with `h1`" pass would therefore **misclassify roughly half of these instances** — silently turning some H1s into H2-sized text or vice versa. Migration must be done by **JSX role** (which tag, which component, which breakpoint position) not by **current class name**. This is the single most important constraint on execution order below.

Second headline finding: the approved tokens carry **zero responsive variants**, but `Typography.md` and the hero/section patterns currently in production are inherently responsive (smaller on mobile, larger on desktop). Applying a token literally and uniformly across all breakpoints is a real behavior change, not a pure rename — flagged as Open Decision Required in §6, not resolved here.

---

## 1. Current typography usage, by role

| Role | Current implementation | Where |
|---|---|---|
| **Home hero H1** | `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]` (36→48→60px, 3 breakpoints, custom `leading-[1.1]` override) | `Home.tsx` only |
| **Inner-page hero H1** | `text-3xl sm:text-4xl font-semibold tracking-tight` (30→36px, 2 breakpoints) — identical markup on all 8 inner pages | About, Contact, EquipmentSupply, Services, Industries, SupplierNetwork, PlatformOverview, SteelTrading |
| **Section H2** (`SectionHeading`) | `text-2xl sm:text-3xl font-semibold tracking-tight` (24→30px) | `SiteUI.tsx`, used on nearly every page |
| **CTA-band H2** (`CTABand`) | `text-2xl sm:text-3xl font-semibold` (24→30px) — **no `tracking-tight`**, unlike `SectionHeading`'s H2 (pre-existing inconsistency, not introduced in Phase 3.1 — verified against the pre-consolidation markup) | `CTABand.tsx` |
| **Card/component titles** (h3 tags) | Inconsistent: `text-lg` (18px) ×7, `text-base` (16px) ×7, `text-sm` (14px) ×1 — **three different sizes for the same semantic role**, split almost evenly, no dominant convention | About, Contact, Industries, Services (18px); SteelTrading, EquipmentSupply, PlatformOverview, SupplierNetwork, SiteUI's `Pillar` (16px); About's capability cards (14px) |
| **Hero subtext / body-lg copy** | `text-lg` (18px) | Every hero subhead, Mission/Vision card text, About's pull-quote |
| **Section descriptions** (`SectionHeading`'s `description` prop) | `text-base` (16px) | Wherever `SectionHeading` is passed a `description` |
| **Card body text** | `text-sm` (14px) | Nearly every card's description paragraph, sitewide |
| **Chips** (`ChipList`) | `text-sm font-medium` (14px) | Every page using `ChipList` |
| **Eyebrow / kicker labels** | `text-xs font-semibold uppercase tracking-wider` (12px, +5% tracking) — identical pattern on every page | All 9 pages |
| **Footer text** | `text-sm` / `text-xs` | `SiteFooter.tsx` |
| **Nav links / header CTA** | `text-sm font-medium` (14px) | `SiteHeader.tsx` |
| **CTA-band / hero primary buttons** | `text-sm font-semibold` (14px) | `CTABand.tsx` (via `Button`'s `cta` size), `Home.tsx` hero |
| **Inline "Learn more"-style arrow links** | `text-sm font-semibold` (14px) | Most pages |
| **Form labels** (Contact page) | `text-sm font-medium` (14px) | `Contact.tsx` |
| **KPI / stat numbers** (Home hero credentials) | `text-2xl sm:text-3xl font-semibold` (24→30px), not inside a heading tag (`<p>`) | `Home.tsx` only |
| **Sub-caption micro-labels** | Arbitrary `text-[10px]` (below the approved scale's floor) | `EquipmentSupply.tsx` step-badge number, `SiteHeader.tsx` tagline |

Sitewide raw-class instance counts (`src/pages/site` + `src/components/site`, current state after Phase 3.1):

| Class | Count | Closest approved token | Px match? |
|---|---|---|---|
| `text-xs` | 25 | `caption` (12px) | Exact |
| `text-sm` | 55 | `body-sm` (14px) | Exact |
| `text-base` | 7 | `body` (16px) | Exact |
| `text-lg` | 20 | `body-lg` (18px) | Exact |
| `text-xl` | 0 | `h4` (20px) | N/A — unused; card titles that semantically belong here currently use text-base/lg instead |
| `text-2xl` | 3 | `h3` (24px) | Exact |
| `text-3xl` | 11 | `h2` (32px) for H2-role instances; **not** h2 for H1-role instances (see §0) | Close (30 vs 32px) for H2 role; wrong token entirely for H1-role instances |
| `text-4xl` | 9 | `h1` (40px) for H1-role instances; **not** h1 for Home-hero-mobile instance | Close (36 vs 40px) for H1 role; wrong token for the one Home-hero instance |
| `text-5xl` | 1 | `display` (48–64px) | Exact (48px = display's lower bound) |
| `text-6xl` | 1 | `display` (48–64px) | Within range (60px) |

---

## 2. Line-height & letter-spacing — a second, independent axis of drift

The approved tokens in `tailwind.config.js` bundle **line-height and letter-spacing together with font-size** (confirmed by reading the token definitions: e.g. `h1: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }]`), exactly matching `Typography.md`'s "Headings 120% / −1%", "Body 150% / 0%", "Captions 140% / +1%" rules. **None of the current raw Tailwind classes apply these values** — they get Tailwind's own per-size defaults instead, and any letter-spacing is separately hand-applied via `tracking-*` utilities that don't match the approved percentages:

- Headings currently use `tracking-tight` (**−2.5%**) where applied at all, vs. approved **−1%**.
- Eyebrows currently use `tracking-wider` (**+5%**) vs. approved caption tracking of **+1%**.
- `Home.tsx`'s hero H1 has an explicit `leading-[1.1]` override, vs. approved heading line-height of **120% (1.2)**.
- Body-role text (`text-sm`/`text-base`/`text-lg`) has no explicit `tracking-*` today, which already coincidentally matches approved body letter-spacing (0%) — this axis is only a real problem for headings/captions, not body copy.

**Practical consequence for migration:** swapping a class name (e.g. `text-2xl` → `text-h3`) is not visually neutral even when the px size already matches — it also silently changes leading and tracking to the approved values. This is correct and intended, but must be treated as a real, visible delta to QA, not assumed to be a no-op. It also means **any co-located manual `tracking-*` class must be removed at the same time as the swap** — leaving `tracking-wider` next to `text-caption` (which bundles its own `letterSpacing: 0.01em`) would produce two conflicting letter-spacing declarations, the same class of bug fixed for `font-medium`/`font-semibold` on `Button.tsx` in Phase 3.1.

---

## 3. Violations, by category

**3.1 — Card/component-title sizing is internally inconsistent, and none of the three sizes in use matches its own documented token.** `Typography.md`'s H4 definition literally reads "Component titles — 20px." Current card titles use 18px, 16px, or 14px — never 20px — split almost evenly across 7 files with no dominant convention. This is a pre-existing inconsistency independent of Blueprint compliance; fixing it is both a compliance fix and a genuine consistency bug-fix.

**3.2 — Eyebrow letter-spacing (+5%) is 5× the approved caption value (+1%).** Sitewide, identical pattern, 9 pages. Purely typographic (no font-size delta, since 12px already matches caption exactly) but visually appears on literally every page as the first thing read below the hero.

**3.3 — Heading letter-spacing (−2.5% via `tracking-tight`) doesn't match approved (−1%).** Applies to both hero H1s (9 files) and `SectionHeading`'s H2 (used nearly everywhere) — `CTABand`'s H2 doesn't use `tracking-tight` at all today (0%), so its drift is actually larger relative to the approved value, not smaller.

**3.4 — Two sub-caption arbitrary values exist below the approved scale's floor.** `text-[10px]` on `EquipmentSupply.tsx`'s step-badge number and `SiteHeader.tsx`'s tagline. `Typography.md`'s smallest defined size is `caption` (12px) — nothing in the approved scale covers 10px. Not necessarily wrong (a tiny numbered badge or a micro-tagline may legitimately need to be smaller than body caption text) but currently undocumented as an intentional exception.

**3.5 — KPI/stat numbers (Home hero credentials) have no corresponding token.** `text-2xl sm:text-3xl font-semibold text-copper-400` on a `<p>`, not a heading — `Typography.md`'s scale covers headings, body, and captions, not large decorative statistic figures.

**3.6 — Button/label text has no defined token.** Neither `Typography.md` nor `Components.md`'s Buttons section specifies a button text size. The de facto sitewide standard is `text-sm` (14px, i.e. exactly `body-sm`) at two different weights (`font-medium` for nav/outline, `font-semibold` for primary/CTA) — consistent in size, inconsistent in weight for what's arguably the same role.

---

## 4. Migration strategy — risk tiers

### Low risk — direct token replacements (size unchanged, role unambiguous)

These raw classes are used **only** in their body/caption role in every instance found — no dual-role ambiguity, no size change, only leading/tracking corrections as described in §2:

- `text-sm` → `body-sm` (55 instances: card body text, chips, footer, form labels, nav links) — largest volume, safest starting point.
- `text-base` → `body` (7 instances: `SectionHeading` descriptions) — Tailwind's `text-base` default line-height (150%) already matches approved exactly, so this is the single lowest-risk swap on the list.
- `text-xs` → `caption`, **combined with removing any co-located `tracking-wider`/`tracking-wide`** (25 instances: eyebrows, metadata, footer fine print) — bucketed here because the px size is exact, but flagged that the tracking-class removal must happen in the same edit (see §2) or it isn't actually low risk.

**Not included in this tier despite matching by class name:** the `text-lg` instances that are secretly playing a card-title role (see §3.1) — those belong in Medium risk, not here, because fixing them is a real size change, not a rename. The genuinely-body-role `text-lg` instances (hero subtext, Mission/Vision card copy, the About pull-quote) are Low risk on their own.

### Medium risk — role-scoped adjustments with bounded but real visual/layout change

- **Card/component-title consistency fix** (§3.1): migrate all h3 card titles (18px/16px/14px instances, ~15 total across 7 files) to `h4` (20px). Real size increase on the 16px/14px instances, mild on the 18px ones. Card headers will be marginally taller; spot-check each card grid (`grid grid-cols-*`) for wrapping/alignment, but these grids already have generous padding (`p-6`/`p-8`) and no fixed heights, so structural breakage is unlikely.
- **`SectionHeading` H2** (`SiteUI.tsx`, one file, sitewide fan-out since nearly every page renders it): needs the responsive-strategy question (§6) resolved first, since the token has no built-in mobile/desktop split.
- **Eyebrow tracking correction** (§3.2): pure letter-spacing change, sitewide, uniform — bucketed Medium rather than Low only because of its visibility (appears on every single page) and because it must be executed correctly per §2, not because the change itself is large.

### High risk — layout changes caused by typography

- **Home hero H1** (`text-4xl sm:text-5xl lg:text-6xl` → `display`): 3 responsive breakpoints collapsing into one fixed token size, on the single most prominent, most multi-line piece of text on the site, with an existing custom `leading-[1.1]` override that has no defined interaction with the token's own 120% line-height. Needs the responsive-strategy decision resolved and a dedicated mobile-width visual QA pass (375px and 320px) before touching.
- **Inner-page hero H1** (`text-3xl sm:text-4xl` → `h1`, 8 files): same responsive-flattening concern as above, somewhat lower risk since this text is generally a single short line rather than Home's 3-line stacked headline, but still the top-of-page, most-visible element on every one of the 8 pages.
- **Any remaining `text-3xl`/`text-4xl` instance not yet triaged by role**: per §0, must be individually confirmed as H1-role or H2-role by reading the surrounding JSX (tag + component), never batch-replaced by class name alone.

### Explicitly out of scope for any tier (no token exists — see §6)

- KPI/stat numbers (§3.5)
- Button/label text (§3.6)
- Sub-caption micro-text (§3.4)

---

## 5. Affected files

| File | Roles present | Risk tier(s) touching it |
|---|---|---|
| `src/components/site/SiteUI.tsx` | Section H2, section description, card title (`Pillar`), chips | Low (description), Medium (H2, card title) |
| `src/components/site/CTABand.tsx` | CTA-band H2, button text | Medium (H2), out-of-scope (button) |
| `src/components/site/SiteHeader.tsx` | Nav links, header CTA, sub-caption tagline | Low (nav/CTA text), out-of-scope (tagline) |
| `src/components/site/SiteFooter.tsx` | Footer text | Low |
| `src/pages/site/Home.tsx` | Hero H1 (unique 3-breakpoint pattern), hero subtext, eyebrow, credentials/KPI numbers, section headings, card titles, chips | High (hero H1), Low (subtext/body), Medium (eyebrow, section H2, KPI open decision) |
| `src/pages/site/About.tsx` | Hero H1, card titles (18px ×2, 14px ×1), body text, pull-quote (body-lg), eyebrow | High (hero H1), Medium (card titles) |
| `src/pages/site/Contact.tsx` | Hero H1, card title (18px), form labels, body | High (hero H1), Medium (card title) |
| `src/pages/site/Industries.tsx` | Hero H1, card titles (18px) | High (hero H1), Medium (card title) |
| `src/pages/site/Services.tsx` | Hero H1, card titles (18px) | High (hero H1), Medium (card title) |
| `src/pages/site/EquipmentSupply.tsx` | Hero H1, card titles (16px), sub-caption badge | High (hero H1), Medium (card title), out-of-scope (badge) |
| `src/pages/site/SteelTrading.tsx` | Hero H1, card titles (16px ×2, 18px ×1) | High (hero H1), Medium (card titles) |
| `src/pages/site/SupplierNetwork.tsx` | Hero H1, card titles (16px ×1, 18px ×1) | High (hero H1), Medium (card titles) |
| `src/pages/site/PlatformOverview.tsx` | Hero H1, card titles (16px) | High (hero H1), Medium (card title) |

Every public site file is touched by at least one tier — there is no file that can be fully migrated without also crossing into the Medium or High tier somewhere in it, since the hero-H1 pattern is universal.

---

## 6. Open Decisions Required

1. **Responsive strategy for token application.** The approved tokens are single fixed values; the current site is responsive at every heading level. Options observed (not chosen here): (a) apply the token uniformly at all breakpoints, accepting a documented mobile-legibility/wrapping change; (b) pair two existing tokens across breakpoints (e.g. `text-h3 sm:text-h1` for hero H1s) to approximate current behavior, though no Approved doc explicitly sanctions combining named tokens this way; (c) something else Blueprint specifies. This blocks all High-risk items and the `SectionHeading` H2 Medium-risk item.
2. **KPI/stat-number typography** (Home hero credentials) has no defined token in `Typography.md`. Needs either a new named token or an explicit statement that it's intentionally outside the type scale.
3. **Button/label typography** has no defined token in `Typography.md` or `Components.md`. The de facto sitewide size (`body-sm`, 14px) could be formally adopted, or Blueprint may want a dedicated button-text spec (including resolving the `font-medium` vs. `font-semibold` split noted in §3.6).
4. **Sub-caption micro-text** (`text-[10px]` ×2 instances) — no token exists below `caption` (12px). Needs either a documented exception or a new micro/overline token.
5. **`CTABand`'s H2 tracking mismatch vs. `SectionHeading`'s H2** (§1 table) — both are H2-role; should they be unified (and if so, to which value) as part of this migration, or is this considered acceptable pre-existing variance between a promotional band and a body section heading?

None of the above were inferred or decided in this session, per instruction.

---

## 7. Recommended execution order (for a future coding session — not started here)

1. Low-risk `body-sm`/`body`/`caption` swaps (§4, Low tier) — highest volume, zero role ambiguity, builds a clean baseline.
2. Resolve Open Decisions #2–#5 (KPI numbers, button text, micro-text, CTABand/SectionHeading H2 unification) — small scope, unblocks nothing else, but cheap to close out early.
3. Card/component-title consistency fix to `h4` (Medium tier) — single well-defined size change, bounded per-file.
4. Resolve Open Decision #1 (responsive strategy) — required before step 5.
5. `SectionHeading` H2 migration (Medium tier, one file, sitewide visual effect) — do this before the High-risk hero work so the section-level rhythm is already correct when hero headings are evaluated against it.
6. Inner-page hero H1 migration (High tier, 8 files) — lower risk than Home's hero, do first within this tier.
7. Home hero H1 migration (High tier, 1 file, highest visibility) — do last, with dedicated mobile-width (320–375px) visual QA before and after.

---

STOP after this audit, per instruction. No code was changed. Waiting for direction on the Open Decisions in §6 and/or approval to begin execution at step 1.
