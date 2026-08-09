# ETA Website Phase 3.2B — Typography Migration Plan

document_id: ETA-PHASE3-2B-MIGRATION-PLAN-001
status: Plan only — no code changed
date: 2026-08-08
authority: `ETA-Blueprint/13-DECISIONS/ETA-Website-Typography-Decision-Resolution.md` (T1–T5, Approved/Open), `PHASE3-2-TYPOGRAPHY-AUDIT.md`, `Typography.md` (ETA-VISUAL-002, Approved)

Mandatory reading completed. **No files were modified in this session** — this is a migration plan only, per instruction. Content, colors, routes, components, Persian content, and RTL are untouched by this document and are not in scope for the migration it describes.

---

## 1. Role mapping

Seven roles, mapped to target tokens per the now-approved T1–T5 decisions. Where T1 ("responsive variants are allowed, do not flatten") applies but the exact breakpoint pairing wasn't specified by a numbered decision, this plan **proposes** a pairing derived from the closest-fit named tokens and flags it for confirmation rather than treating it as already decided — see §4 for each such case.

| Role | Current pattern(s) | Target (per T1–T5) | Responsive? | Status |
|---|---|---|---|---|
| **Hero title** (Home only) | `text-4xl sm:text-5xl lg:text-6xl` + `leading-[1.1]` override (36→48→60px) | Proposed: base `h1` (40px) → `sm:` `display` (48px). The existing `lg:text-6xl` (60px) third step has **no exact named-token equivalent** — `display` is a single 48px value in `tailwind.config.js`, not the full 48–64px range as multiple breakpoint steps. | Yes (T1) | **Needs confirmation — see §4.1** |
| **Page title** (8 inner-page hero H1s) | `text-3xl sm:text-4xl` (30→36px), identical markup on About/Contact/Industries/Services/EquipmentSupply/SteelTrading/SupplierNetwork/PlatformOverview | Proposed: base `h3` (24px, exact match to nothing current but closest clean step down) → `sm:` `h1` (40px). Alternative proposed pairing: base `h2` (32px) → `sm:` `h1` (40px), a smaller jump from current 30px. **Two viable pairings, not one — see §4.2.** | Yes (T1) | **Needs confirmation — see §4.2** |
| **Section heading** (`SectionHeading` H2, `CTABand` H2) | `text-2xl sm:text-3xl` (24→30px) | base `h3` (24px, **exact match, zero size change**) → `sm:` `h2` (32px, +2px from current 30px) | Yes (T1) | Ready — cleanest mapping in this plan, minimal delta |
| **Component title** | `text-lg`/`text-base`/`text-sm` (18/16/14px), inconsistent across 7 files | Per T2: mobile 18px, desktop 20px, "H4-equivalent" role | Yes (T2, explicit) | **Technical gap — see §4.3** (no existing named token expresses "18px with H4's heading-style line-height/letter-spacing") |
| **Body text** (hero subtext, section descriptions, card body, chips, form labels) | `text-lg` (18px) / `text-base` (16px) / `text-sm` (14px) | `body-lg` / `body` / `body-sm` respectively — exact px matches, no responsive variant (Typography.md's Body entries are flat values, not ranges) | No | Ready — see §2 Low-risk tier |
| **Caption** (eyebrow labels, footer fine print) | `text-xs font-semibold uppercase tracking-wider` (12px, +5% tracking) | `caption` (12px, LH140%, **+1%** tracking per T3) | No | Ready, **with mandatory removal of `tracking-wider`** — see §4.4 |
| **Button label** | `text-sm font-semibold` (CTA/hero buttons) or `text-sm font-medium` (nav/`Button.tsx` default sizes) | `body-sm` (14px) + **semibold**, per T4 | No | Ready for public-site instances; **scope-boundary flag for `Button.tsx`'s shared sizes — see §4.5** |

Two roles present in the underlying audit are **not** in this plan's 7-role list and are carried forward unresolved, matching the Decision Resolution's "Still open" section: KPI/stat numbers (T5, explicitly open) and sub-caption micro-text (`text-[10px]`, Open Decision #4, not assigned to T1–T5). Neither is touched by this plan.

---

## 2. Per-page breakdown

Shared components (`SectionHeading`, `Pillar`, `ChipList` in `SiteUI.tsx`; `CTABand.tsx`; `SiteHeader.tsx`; `SiteFooter.tsx`; `Button.tsx`) are edited once at their source file — each page table below lists **only the classes that live directly in that page's own file**, then notes which shared components it also renders (whose edit lives elsewhere, see §3).

### Home (`src/pages/site/Home.tsx`)

| Line | Current class | Current role | Target token | Visual risk |
|---|---|---|---|---|
| 68 | `text-4xl sm:text-5xl lg:text-6xl` + `leading-[1.1]` | Hero title | See §1 Hero title — **§4.1** | High |
| 75 | `text-lg` | Body (hero subtext) | `body-lg` | Low |
| 82, 88 | `text-sm font-semibold` | Button label | `body-sm` + semibold (already semibold — no weight change; size already matches) | Low |
| 98 | `text-2xl sm:text-3xl font-semibold text-copper-400` | KPI number | **T5 — remains Open, not migrated** | N/A |
| 99 | `text-sm` | Body (KPI label) | `body-sm` | Low |
| 121, 148, 166 | `text-sm font-semibold` | Inline arrow-link (button-adjacent) | `body-sm` + semibold — see §4.6 | Low |
| 126, 190, 196 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrow) | `caption` (drop `tracking-wider`) | Low–Medium (see §4.4) |
| 162 | `text-xs font-medium` | Caption (platform-module label) | `caption` | Low |
| 180 | `text-sm font-medium` | Component title (Why-ETA item label, not in an `<h*>` tag) | See §4.3 — treated as component-title role | Medium |
| 191, 197 | `text-lg` | Body (Mission/Vision text) | `body-lg` | Low |

Also renders: `SiteHeader`, `SiteFooter`, `SectionHeading` (×3 uses), `Pillar` (×4, "What We Do" cards), `ChipList` (×2), `CTABand` (full-width variant).

### About (`src/pages/site/About.tsx`)

| Line | Current class | Current role | Target token | Visual risk |
|---|---|---|---|---|
| 38 | `text-3xl sm:text-4xl` | Page title | See §1 Page title — **§4.2** | High |
| 37, 127, 138, 173, 180 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrow) | `caption` (drop `tracking-wider`) | Low–Medium |
| 41 | `text-lg` | Body (hero subtext) | `body-lg` | Low |
| 77, 86 | `text-sm font-medium` | Component title (office-card label, not in `<h*>` tag) | See §4.3 | Medium |
| 78, 87 | `text-xs` | Caption (address line) | `caption` | Low |
| 95 | `text-sm font-medium` | Component title (expertise-list label) | See §4.3 | Medium |
| 128, 139 | `text-lg font-semibold` | Component title (`<h3>`) | See §4.3 | Medium |
| 129, 140, 158 | `text-sm` | Body (card description) | `body-sm` | Low |
| 157 | `text-sm font-semibold` | Component title (`<h3>`, capability card) | See §4.3 | Medium |
| 163 | `text-lg` | Body (pull-quote) | `body-lg` | Low |
| 174, 181 | `text-lg` | Body (Mission/Vision text) | `body-lg` | Low |
| 196, 205 | `text-sm font-semibold` | Inline arrow-link | `body-sm` + semibold | Low |

Also renders: `SiteHeader`, `SiteFooter`, `SectionHeading` (×4), `ChipList` (×3), `CTABand`.

### Industries (`src/pages/site/Industries.tsx`)

| Line | Current class | Current role | Target token | Visual risk |
|---|---|---|---|---|
| 41 | `text-3xl sm:text-4xl` | Page title | See §4.2 | High |
| 40 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrow) | `caption` | Low–Medium |
| 44 | `text-lg` | Body (hero subtext) | `body-lg` | Low |
| 58 | `text-lg font-semibold` | Component title (`<h3>`) | See §4.3 | Medium |
| 59 | `text-sm` | Body (card intro text) | `body-sm` | Low |

Also renders: `SiteHeader`, `SiteFooter`, `SectionHeading`, `ChipList`. (No `CTABand` on this page — confirmed absent per Phase 3.1's page-by-page grep.)

### Products & Capabilities (`src/pages/site/Services.tsx`)

| Line | Current class | Current role | Target token | Visual risk |
|---|---|---|---|---|
| 61 | `text-3xl sm:text-4xl` | Page title | See §4.2 | High |
| 60 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrow) | `caption` | Low–Medium |
| 74 | `text-lg font-semibold` | Component title (`<h3>`) | See §4.3 | Medium |
| 75, 82 (link) | `text-sm` / `text-sm font-semibold` | Body / inline arrow-link | `body-sm` / `body-sm`+semibold | Low |
| 100 | `text-sm font-medium` | Component title (commitment-item label, not `<h*>`) | See §4.3 | Medium |
| 105 | `text-sm font-semibold` | Inline arrow-link | `body-sm` + semibold | Low |

Also renders: `SiteHeader`, `SiteFooter`, `SectionHeading` (×1), `ChipList` (per service card). No `CTABand` (confirmed).

### Equipment Supply (`src/pages/site/EquipmentSupply.tsx`)

| Line | Current class | Current role | Target token | Visual risk |
|---|---|---|---|---|
| 46 | `text-3xl sm:text-4xl` | Page title | See §4.2 | High |
| 43 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrow) | `caption` | Low–Medium |
| 49 | `text-lg` | Body (hero subtext) | `body-lg` | Low |
| 64 | `text-base font-semibold` | Component title (`<h3>`) | See §4.3 | Medium |
| 65 | `text-sm` | Body | `body-sm` | Low |
| 78 | `text-[10px] font-semibold` | Sub-caption (step-badge number) | **Not in T1–T5 scope — Open Decision #4, not migrated** | N/A |
| 82 | `text-xs font-medium` | Caption (process-step label) | `caption` | Low |
| 108 | `text-sm font-medium` | Component title (commitment-item label) | See §4.3 | Medium |
| 113 | `text-sm font-semibold` | Button label | `body-sm` + semibold | Low |

Also renders: `SiteHeader`, `SiteFooter`, `SectionHeading` (×3), `ChipList`. No `CTABand` (this page ends with a plain link, not the band pattern — see Phase 3.1 handoff).

### Steel Trading (`src/pages/site/SteelTrading.tsx`)

| Line | Current class | Current role | Target token | Visual risk |
|---|---|---|---|---|
| 27 | `text-3xl sm:text-4xl` | Page title | See §4.2 | High |
| 24 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrow) | `caption` | Low–Medium |
| 30 | `text-lg` | Body (hero subtext) | `body-lg` | Low |
| 52, 69 | `text-base font-semibold` | Component title (`<h3>`) | See §4.3 | Medium |
| 53, 70, 82 | `text-sm` | Body | `body-sm` | Low |
| 81 | `text-lg font-semibold` | Component title (`<h3>`) | See §4.3 | Medium |

Also renders: `SiteHeader`, `SiteFooter`, `SectionHeading` (×2), `ChipList`, `CTABand` (constrained variant).

### Supplier Network (`src/pages/site/SupplierNetwork.tsx`)

| Line | Current class | Current role | Target token | Visual risk |
|---|---|---|---|---|
| 24 | `text-3xl sm:text-4xl` | Page title | See §4.2 | High |
| 23 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrow) | `caption` | Low–Medium |
| 27 | `text-lg` | Body (hero subtext) | `body-lg` | Low |
| 41 | `text-base font-semibold` | Component title (`<h3>`) | See §4.3 | Medium |
| 42, 54, 72 | `text-sm` | Body | `body-sm` | Low |
| 53 | `text-lg font-semibold` | Component title (`<h3>`) | See §4.3 | Medium |
| 71 | `text-sm font-semibold` | Component title (vision-note label, not `<h*>`) | See §4.3 | Medium |

Also renders: `SiteHeader`, `SiteFooter`, `SectionHeading` (×1), `CTABand` (constrained variant).

### Platform Vision (`src/pages/site/PlatformOverview.tsx`)

| Line | Current class | Current role | Target token | Visual risk |
|---|---|---|---|---|
| 29 | `text-3xl sm:text-4xl` | Page title | See §4.2 | High |
| 28 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrow) | `caption` | Low–Medium |
| 32 | `text-lg` | Body (hero subtext) | `body-lg` | Low |
| 37, 43 | `text-sm font-semibold` | Button label / static badge | `body-sm` + semibold | Low |
| 59 | `text-base font-semibold` | Component title (`<h3>`) | See §4.3 | Medium |
| 60 | `text-sm` | Body | `body-sm` | Low |
| 72 | `text-xs font-medium` | Caption (upcoming-module label) | `caption` | Low |

Also renders: `SiteHeader`, `SiteFooter`, `SectionHeading` (×2). No `CTABand` (this page ends with a module grid, not the band pattern).

### Contact (`src/pages/site/Contact.tsx`)

| Line | Current class | Current role | Target token | Visual risk |
|---|---|---|---|---|
| 43 | `text-3xl sm:text-4xl` | Page title | See §4.2 | High |
| 42 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrow) | `caption` | Low–Medium |
| 44 | `text-lg` | Body (hero subtext) | `body-lg` | Low |
| 60, 71, 75, 104, 107, 115, 121 | `text-sm` (various weights) | Body / form labels | `body-sm` | Low |
| 70 | `text-sm font-semibold` | Component title (office label, not `<h*>`) | See §4.3 | Medium |
| 88 | `text-lg font-semibold` | Component title (`<h3>`, "Thank you") | See §4.3 | Medium |
| 89 | `text-sm` | Body | `body-sm` | Low |

Also renders: `SiteHeader`, `SiteFooter`. No `SectionHeading`/`CTABand` (Contact has its own hero + form layout). Uses `Button` (existing `primary`/`md` — unaffected unless §4.5 is resolved to include it).

---

## 3. Shared-component edit points (source of truth for the fan-out noted above)

| File | Role(s) | Instances | Pages affected (via reuse) |
|---|---|---|---|
| `src/components/site/SiteUI.tsx` | Section heading (`SectionHeading`), component title (`Pillar`), body (`ChipList`, description) | 1 file, ~4 relevant class strings | All 9 pages except Contact for `SectionHeading`; Home only for `Pillar` |
| `src/components/site/CTABand.tsx` | Section heading (H2), button label (×2 variants) | 1 file | Home, About, SteelTrading, SupplierNetwork |
| `src/components/site/SiteHeader.tsx` | Button label (nav CTA), body (nav links), sub-caption (tagline, `text-[10px]`) | 1 file | All 9 pages (site-wide header) |
| `src/components/site/SiteFooter.tsx` | Body / caption (footer text) | 1 file | All 9 pages (site-wide footer) |
| `src/components/ui/Button.tsx` | Button label (`sizeClasses`) | 1 file | Contact directly; indirectly every page via `CTABand` |

Editing these 5 files covers the shared-component portion of every per-page table above — the actual migration touches roughly **14 files total** (9 pages + 5 shared components), not 9.

---

## 4. Cases requiring manual review

**4.1 — Home hero title's third breakpoint has no named-token equivalent.** T1 approves responsive tokens in principle; `display` in `tailwind.config.js` is one fixed value (48px), not the 48–64px range as separate breakpoint steps. The current `lg:text-6xl` (60px) step cannot be expressed with an existing named class. Needs a decision: extend `display`'s token definition to carry per-breakpoint values, accept dropping the `lg:` step (display holds from `sm:` up), or use an arbitrary value within the approved 48–64 range for `lg:` specifically (technically compliant with the *range*, but not a named token, which conflicts with the general "no invented values" rule unless explicitly exempted here since it's within an already-approved range).

**4.2 — Page title has two viable responsive pairings, not one.** `h3→h1` (24→40px, a 16px jump) vs. `h2→h1` (32→40px, an 8px jump, closer to the current 30→36px delta). Recommend `h2→h1` as lower-risk given it's the smaller change from current behavior, but this wasn't specified by any of T1–T5 and needs explicit confirmation before touching any of the 8 files that share this exact pattern.

**4.3 — Component title's approved mobile value (18px) has no token carrying H4's heading treatment.** T2 states component titles are "H4-equivalent" at 18px mobile / 20px desktop. The `h4` token in `tailwind.config.js` is a single 20px value with heading-style line-height (120%) and letter-spacing (−1%) baked in — there is no "H4 at 18px" token. `body-lg` is 18px but carries *body* treatment (150% / 0%), not heading treatment. Implementing T2 exactly as decided requires either a new token/variant (e.g. an `h4-mobile` or a responsive `h4` definition) or accepting `text-lg` + manual `leading-[1.2] tracking-[-0.01em]` overrides at the mobile breakpoint. This affects the largest number of individual instances in the plan (~15 across 7 page files plus `SiteUI.tsx`'s `Pillar`) and should be resolved before starting the Medium-risk tier.

**4.4 — Caption migration must drop `tracking-wider` in the same edit.** Applying `caption` (which bundles `letterSpacing: 0.01em`) while leaving the existing manual `tracking-wider` (0.05em) class in place would leave two conflicting letter-spacing declarations on the same element — the same class of bug fixed for `font-medium`/`font-semibold` on `Button.tsx` in Phase 3.1. Every one of the ~13 eyebrow-label instances needs both classes changed together, not `text-xs`→`text-caption` alone.

**4.5 — T4 (button typography) reaches into `Button.tsx`, which is also used by the internal app.** `Button.tsx`'s `sm`/`md`/`lg`/`icon` sizes currently use `font-medium`; T4 specifies buttons should be semibold. But `Button.tsx` is shared with Settings, CRM, Supplier, and AI Platform screens — none of which have ever been in scope for any Blueprint typography audit or decision in this website-focused workstream. Needs a scope decision: does T4 apply only to the public-site button instances (in which case `CTABand`'s existing `cta`/`cta-outline` variants, already semibold, need no change, and the site's other button-styled elements — `SiteHeader`'s nav CTA, `Home.tsx`'s hero CTA — would need page/component-local semibold overrides rather than a `Button.tsx`-wide change), or does it extend to the shared component (affecting internal screens outside this workstream's mandate)?

**4.6 — Inline "arrow-link" text (`Learn more`, `View industries in detail`, etc.) isn't explicitly one of the 7 requested roles.** It's visually and dimensionally identical to Button label (`text-sm font-semibold`, i.e. already `body-sm` + semibold) but is semantically an inline text link, not a button. This plan treats it as button-label-equivalent for target-token purposes (since it already matches T4's target exactly, meaning **zero visual change** either way), but flags the categorization for confirmation since it wasn't named in the request's role list.

**4.7 — Two items outside T1–T5 remain unmigrated by design**, consistent with the Decision Resolution: KPI/stat numbers (`Home.tsx` line 98, T5 — explicitly Open) and sub-caption micro-text (`EquipmentSupply.tsx` line 78, `SiteHeader.tsx` tagline — Open Decision #4, never assigned to T1–T5). Both are called out in their respective per-page table rows above as "not migrated," not omitted silently.

---

## 5. Migration order

Per the requested Low → Medium → High sequencing, refined with the dependencies identified above:

**Low risk — captions, body text, buttons (no size ambiguity, single-breakpoint, exact or near-exact matches)**
1. Body text: all `text-lg`/`text-base`/`text-sm` body-role instances (hero subtext, section descriptions, card body copy, chips, form labels) across all 9 pages → `body-lg`/`body`/`body-sm`. Largest volume, zero role ambiguity, no dependency on any open item.
2. Caption: eyebrow labels + footer text + process-step labels → `caption`, **with `tracking-wider` removed in the same commit per §4.4**.
3. Button label: `CTABand`'s buttons (already semibold — a token-name-only swap, zero visual change) and inline arrow-links (§4.6) → `body-sm` + semibold.
4. **Pause here for §4.5's scope decision** before touching `SiteHeader.tsx`'s nav CTA, `Home.tsx`'s hero CTA, or `Button.tsx` itself — those are the only Button-label instances not already semibold today.

**Medium risk — component titles, section headings**
5. Section heading: `SectionHeading` and `CTABand` H2s → `h3`/`h2` responsive pair. Single shared-component edit (`SiteUI.tsx`, `CTABand.tsx`), sitewide visual effect, cleanest mapping in this plan (§1) — do this before component titles since it's lower-ambiguity.
6. **Resolve §4.3** (component-title mobile-value token gap) before proceeding.
7. Component title: all `<h3>` and title-role `<span>`/`<p>` instances (§1) across the 7 files + `Pillar` → resolved H4 treatment per §4.3's outcome.

**High risk — hero typography**
8. **Resolve §4.2** (page-title responsive pairing) before proceeding.
9. Page title: the 8 identical inner-page hero H1s → confirmed pairing from §4.2. Lower risk than Home's hero since this text is typically one short line, not three.
10. **Resolve §4.1** (Home hero's third breakpoint) before proceeding.
11. Hero title: `Home.tsx`'s unique 3-breakpoint H1 → confirmed pairing from §4.1. Do this last, with dedicated 320–375px-width visual QA before and after, per the original audit's recommendation.

---

## 6. Explicitly unchanged by this plan

Confirmed not touched by anything in this document or its future execution, per instruction: page content, brand colors, routes, component structure/props beyond typography classes, Persian content, RTL behavior. This plan only proposes class-level typography changes on the 9 public pages and 5 shared site components already covered by Phase 3's scope.

---

STOP after this plan, per instruction. No files were modified. Waiting for resolution of §4.1–§4.5 and/or approval to begin execution at Low-risk step 1.
