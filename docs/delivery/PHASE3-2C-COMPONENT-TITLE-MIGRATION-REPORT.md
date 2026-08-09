# ETA Website Phase 3.2C — Component Title Migration Preparation Report

document_id: ETA-PHASE3-2C-PREP-001
status: Preparation only — token added, no pages modified
date: 2026-08-08
authority: `ETA-Blueprint/13-DECISIONS/ETA-Website-Typography-Execution-Decision-Resolution.md` (T6, Approved), `PHASE3-2B-TYPOGRAPHY-MIGRATION-PLAN.md`, `SESSION-HANDOFF-WEBSITE-PHASE3-2.md`

Mandatory reading completed. This session (1) added the T6 Component Title token to `tailwind.config.js`, and (2) mapped every current component-title usage sitewide. **No page file was modified.** Hero headings, layout, colors, routes, and RTL are untouched.

---

## 1. Token added

`tailwind.config.js`'s `fontSize` scale now includes:

```js
"component-title": ["1.125rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }], // 18px
```

placed directly after `h4` (20px), with an inline comment explaining the pairing. Per T6's specification:

- **Mobile/base**: 18px — the new `component-title` token.
- **Desktop (sm:+)**: 20px — the **existing** `h4` token, reused rather than duplicated, since a second 20px entry with identical line-height/letter-spacing would just be `h4` again. Usage at call sites is intended as `text-component-title sm:text-h4`.
- **Weight (600 / semibold)**: not stored in the token — Tailwind's `fontSize` theme entries only carry size/line-height/letter-spacing, never font-weight (confirmed by checking every existing token in this file — none of them bake in a weight either). Every call site will need a separate `font-semibold` class alongside `text-component-title sm:text-h4`, matching how every other heading token in this codebase is already used.
- **Not `body-lg`**: confirmed distinct — `component-title` carries heading-style treatment (120% line-height, −1% letter-spacing) as T6 requires; `body-lg` (also 18px) carries body-style treatment (150% / 0%) and remains reserved for actual body copy.

**Validation**: `npm run typecheck` — clean. `npm run build` — succeeds, and the compiled CSS bundle size is unchanged (29.54 kB, identical to the pre-change build) — confirming Tailwind's JIT scanner correctly found zero current usages of `component-title`, i.e. the token exists but nothing consumes it yet, exactly as intended for a preparation-only step.

---

## 2. Every current component-title usage, mapped

22 instances across 10 files. "Purpose" uses T6's own four named categories (card titles / capability titles / industry titles / component headers) as a classification aid — not a rule from any doc, just for readability.

| File | Line | Current class | Element | Purpose (T6 category) | Target |
|---|---|---|---|---|---|
| `src/components/site/SiteUI.tsx` (`Pillar`) | 63 | `text-base font-semibold text-surface-900` | `<h3>` | Card title (shared component — Home's "What We Do" cards) | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/Home.tsx` | 180 | `text-sm font-medium text-surface-800` | `<p>` | Component header ("Why ETA" item label) | `text-component-title sm:text-h4 font-semibold` — **weight change from medium to semibold, see §3** |
| `src/pages/site/About.tsx` | 77 | `text-sm font-medium text-surface-900` | `<p>` | Component header (Tehran office label) | `text-component-title sm:text-h4 font-semibold` — **weight change, see §3** |
| `src/pages/site/About.tsx` | 86 | `text-sm font-medium text-surface-900` | `<p>` | Component header (UAE office label) | `text-component-title sm:text-h4 font-semibold` — **weight change, see §3** |
| `src/pages/site/About.tsx` | 95 | `text-sm font-medium text-surface-800` | `<span>` | Component header (expertise-list item label) | `text-component-title sm:text-h4 font-semibold` — **weight change, see §3** |
| `src/pages/site/About.tsx` | 128 | `text-lg font-semibold text-surface-900` | `<h3>` | Capability title ("Industrial Equipment") | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/About.tsx` | 139 | `text-lg font-semibold text-surface-900` | `<h3>` | Capability title ("Steel Sheet") | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/About.tsx` | 157 | `text-sm font-semibold text-surface-900` | `<h3>` | Card title (capability/"six reasons" card) | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/Industries.tsx` | 58 | `text-lg font-semibold text-surface-900` | `<h3>` | Industry title | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/Services.tsx` | 74 | `text-lg font-semibold text-surface-900` | `<h3>` | Card title (service card) | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/Services.tsx` | 100 | `text-sm font-medium text-white` | `<p>` | Component header (commitment-item label) | `text-component-title sm:text-h4 font-semibold` — **weight change, see §3** |
| `src/pages/site/EquipmentSupply.tsx` | 64 | `text-base font-semibold text-surface-900` | `<h3>` | Card title (equipment-category card) | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/EquipmentSupply.tsx` | 108 | `text-sm font-medium text-white` | `<p>` | Component header (commitment-item label) | `text-component-title sm:text-h4 font-semibold` — **weight change, see §3** |
| `src/pages/site/SteelTrading.tsx` | 52 | `text-base font-semibold text-surface-900` | `<h3>` | Card title ("Two channels, one enquiry") | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/SteelTrading.tsx` | 69 | `text-base font-semibold text-surface-900` | `<h3>` | Card title (sourcing-channel card) | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/SteelTrading.tsx` | 81 | `text-lg font-semibold text-surface-900` | `<h3>` | Card title ("Two desks that stay separate") | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/SupplierNetwork.tsx` | 41 | `text-base font-semibold text-surface-900` | `<h3>` | Card title (positioning card) | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/SupplierNetwork.tsx` | 53 | `text-lg font-semibold text-surface-900` | `<h3>` | Card title ("A structured network, not a cold list") | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/SupplierNetwork.tsx` | 71 | `text-sm font-semibold text-surface-900` | `<p>` | Component header (vision-note label) | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/PlatformOverview.tsx` | 59 | `text-base font-semibold text-surface-900` | `<h3>` | Card title (vision-pillar card) | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/Contact.tsx` | 70 | `text-sm font-semibold text-surface-900` | `<p>` | Component header (office label) | `text-component-title sm:text-h4 font-semibold` |
| `src/pages/site/Contact.tsx` | 88 | `text-lg font-semibold text-surface-900` | `<h3>` | Component header ("Thank you" success-state title) | `text-component-title sm:text-h4 font-semibold` |

This list matches exactly the set of `text-xs`/`text-sm`/`text-base`/`text-lg` instances every file was grepped for and confirmed to still contain **after** the Low-risk tier's execution (`SESSION-HANDOFF-WEBSITE-PHASE3-2.md`) — i.e., these are precisely the instances that were deliberately left untouched in that session, now accounted for here.

**Not included** (different category, not component titles): `EquipmentSupply.tsx` line 78's `text-[10px]` step-badge number and `SiteHeader.tsx`'s `text-[10px]` tagline — both are sub-caption micro-text (Open Decision #4), never assigned to T6.

---

## 3. Cases requiring manual review before migration

**3.1 — Current sizes vary 14/16/18px; the new token normalizes all of them to 18px (mobile) / 20px (desktop).** This is the intended fix (the original audit's headline finding — §3.1 of `PHASE3-2-TYPOGRAPHY-AUDIT.md` — was that this inconsistency existed with no dominant convention). Concretely: 7 instances currently at 14px (`text-sm`) will grow by 4px at mobile / 6px at desktop; 8 instances currently at 16px (`text-base`) will grow by 2px/4px; 7 instances already at 18px (`text-lg`) will grow only at the desktop step (18→20px, mobile unchanged). No instance shrinks.

**3.2 — 6 of the 22 instances require a font-weight change, not just a size/token change.** T6 specifies weight 600 (semibold) for the entire role. The instances marked "weight change" in the table above are currently `font-medium` (500): `Home.tsx:180`, `About.tsx:77/86/95`, `Services.tsx:100`, `EquipmentSupply.tsx:108`. Every other instance, including the non-`<h3>` labels at `Contact.tsx:70` and `SupplierNetwork.tsx:71`, is already `font-semibold` and needs no weight change. These 6 `font-medium`→`font-semibold` instances are exclusively the non-`<h3>` "component header" label style (office labels, commitment-item labels, list-item labels) — none of the actual `<h3>` card/capability/industry titles need a weight change, since all `<h3>` instances in this list are already `font-semibold`.

**3.3 — Several "component title" instances aren't semantic headings.** 8 of the 22 rows are `<p>` or `<span>` elements styled to look like a title, not actual `<h3>`/`<h4>` tags (Home's Why-ETA labels, About's office/expertise labels, Services'/EquipmentSupply's commitment labels, SupplierNetwork's vision-note label, Contact's office label and "Thank you" state header). This is a pre-existing semantic-HTML inconsistency, not something T6 or this migration is scoped to fix — flagged for awareness, not for action here.

**3.4 — The `text-component-title sm:text-h4` responsive pairing needs the same execution-order care as every other Medium/High-risk item in the Migration Plan.** Each of the 22 sites currently has just one class (`text-lg`, `text-base`, or `text-sm`) with no responsive variant at all — migration adds a breakpoint step that doesn't exist today. Visual risk is low (cards have generous padding and no fixed heights, per the original Migration Plan §4), but every card grid should still get a quick visual pass at mobile/tablet/desktop widths once migration executes, per the Plan's existing validation pattern.

---

## 4. Explicitly not done in this session

- No page file (`.tsx`) was modified — all 22 instances above remain exactly as they were.
- No hero, section-heading, or KPI-number work — those remain separately blocked (T7/T8 for hero/page titles still need their own `tailwind.config.js` responsive-token work, not done here; T5/KPI numbers remain fully open).
- No layout, color, route, or RTL changes.

---

STOP after this preparation report, per instruction. The `component-title` token exists and is validated (typecheck/build clean, zero unintended CSS output); the 22-instance migration itself has not started. Waiting for approval to proceed with the actual page edits.
