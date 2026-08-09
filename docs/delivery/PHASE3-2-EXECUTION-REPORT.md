# ETA Website Phase 3.2 — Low-Risk Tier Execution Report

document_id: ETA-PHASE3-2-EXECUTION-001
status: Pre-execution report — written before any edit, per instruction
date: 2026-08-08
authority: `PHASE3-2B-TYPOGRAPHY-MIGRATION-PLAN.md`, `ETA-Website-Typography-Decision-Resolution.md` (T1–T5), `ETA-Website-Typography-Execution-Decision-Resolution.md` (T6–T9)

Scope: Low-risk tier only — Body text, Caption, Button labels (public website only, per T9). **Not touched**: hero headings, page titles, component titles, layout spacing, card structure, colors, routes, Persian/RTL. Tokens required for this tier (`body-lg`, `body`, `body-sm`, `caption`) already exist in `tailwind.config.js` from prior work — **no Tailwind config change is needed for this tier.**

---

## Files planned to change (14)

`src/components/site/SiteUI.tsx`, `src/components/site/CTABand.tsx`, `src/components/ui/Button.tsx`, `src/components/site/SiteHeader.tsx`, `src/components/site/SiteFooter.tsx`, `src/pages/site/Home.tsx`, `About.tsx`, `Industries.tsx`, `Services.tsx`, `EquipmentSupply.tsx`, `SteelTrading.tsx`, `SupplierNetwork.tsx`, `PlatformOverview.tsx`, `Contact.tsx`.

---

## Current class → target token mapping

### Shared components

| File | Line(s) | Current | Role | Target | Risk |
|---|---|---|---|---|---|
| `SiteUI.tsx` | 19 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrow) | `text-caption font-semibold uppercase` (drop tracking-wider) | Low |
| `SiteUI.tsx` | 23 | `text-2xl sm:text-3xl ...` | Section heading | **Excluded — Medium tier** | — |
| `SiteUI.tsx` | 27 | `text-base` | Body (description) | `text-body` | Low |
| `SiteUI.tsx` | 63 | `text-base font-semibold` (`<h3>`) | Component title | **Excluded — Medium tier** | — |
| `SiteUI.tsx` | 64 | `text-sm` | Body (card description) | `text-body-sm` | Low |
| `SiteUI.tsx` | 75 | `text-sm font-medium` | Body (chips) | `text-body-sm font-medium` | Low |
| `CTABand.tsx` | 37 | `text-2xl sm:text-3xl ...` (`<h2>`) | Section heading | **Excluded — Medium tier** | — |
| `CTABand.tsx` | 38 | *(no explicit size class — inherits 16px)* | Body (description) | `text-body` made explicit | Low |
| `Button.tsx` | 44 | `cta` size: `...text-sm...font-semibold` | Button label (public-only via `CTABand`/`Contact` — see below) | `text-body-sm` (weight unchanged, already semibold) | Low |
| `Button.tsx` | 37–40 | `sm`/`md`/`lg`/`icon` sizes | Button label — shared with internal app | **Excluded per T9** — internal-app-shared sizes stay untouched | — |
| `SiteHeader.tsx` | 26 | `text-sm font-semibold` (brand wordmark) | Not one of the 7 roles (brand identity text) | **Excluded — flagged, not silently left out** | — |
| `SiteHeader.tsx` | 27 | `text-[10px] ... tracking-wide` | Sub-caption | **Excluded — Open Decision #4** | — |
| `SiteHeader.tsx` | 40, 77 | `text-sm font-medium` (nav links) | Body | `text-body-sm font-medium` (no weight change — plain nav links, not buttons) | Low |
| `SiteHeader.tsx` | 53, 88 | `text-sm font-medium` (nav CTA pill) | Button label (public-site) | `text-body-sm font-semibold` per T4/T9 | Low |
| `SiteFooter.tsx` | 36 | `text-sm font-semibold` (brand wordmark) | Not one of the 7 roles | **Excluded — flagged** | — |
| `SiteFooter.tsx` | 38, 41, 50, 72 | `text-sm` | Body | `text-body-sm` | Low |
| `SiteFooter.tsx` | 47, 66 | `text-xs font-semibold uppercase tracking-wider` | Caption (column headings) | `text-caption font-semibold uppercase` | Low |
| `SiteFooter.tsx` | 83, 86 | `text-xs` | Caption (copyright, URL) | `text-caption` | Low |

### Public pages

Every row below is Body/Caption/Button-label. Hero title, Page title, Component title, and KPI-number rows for these same files are **excluded** and listed in the "Explicitly not touched" section further down — they are not omitted silently.

| Page | Lines | Current | Role | Target |
|---|---|---|---|---|
| Home | 75 | `text-lg` | Body (hero subtext) | `text-body-lg` |
| Home | 82, 88 | `text-sm font-semibold` | Button label (hero CTAs) | `text-body-sm font-semibold` |
| Home | 99 | `text-sm` | Body (KPI label) | `text-body-sm` |
| Home | 121, 148, 166 | `text-sm font-semibold` | Button-label-equivalent (arrow-links, §4.6) | `text-body-sm font-semibold` |
| Home | 126, 190, 196 | `text-xs font-semibold uppercase tracking-wider` | Caption (eyebrows) | `text-caption font-semibold uppercase` |
| Home | 162 | `text-xs font-medium` | Caption | `text-caption font-medium` |
| Home | 191, 197 | `text-lg` | Body (Mission/Vision text) | `text-body-lg` |
| About | 37, 127, 138, 173, 180 | `text-xs font-semibold uppercase tracking-wider` | Caption | `text-caption font-semibold uppercase` |
| About | 41 | `text-lg` | Body (hero subtext) | `text-body-lg` |
| About | 78, 87 | `text-xs` | Caption (address lines) | `text-caption` |
| About | 129, 140, 158 | `text-sm` | Body | `text-body-sm` |
| About | 163 | `text-lg` | Body (pull-quote) | `text-body-lg` |
| About | 174, 181 | `text-lg` | Body (Mission/Vision) | `text-body-lg` |
| About | 196, 205 | `text-sm font-semibold` | Button-label-equivalent | `text-body-sm font-semibold` |
| Industries | 40 | `text-xs font-semibold uppercase tracking-wider` | Caption | `text-caption font-semibold uppercase` |
| Industries | 44 | `text-lg` | Body | `text-body-lg` |
| Industries | 59 | `text-sm` | Body | `text-body-sm` |
| Products & Capabilities (`Services.tsx`) | 60 | `text-xs font-semibold uppercase tracking-wider` | Caption | `text-caption font-semibold uppercase` |
| Products & Capabilities | 75 | `text-sm` | Body | `text-body-sm` |
| Products & Capabilities | 82, 105 | `text-sm font-semibold` | Button-label-equivalent | `text-body-sm font-semibold` |
| Equipment Supply | 43 | `text-xs font-semibold uppercase tracking-wider` | Caption | `text-caption font-semibold uppercase` |
| Equipment Supply | 49 | `text-lg` | Body | `text-body-lg` |
| Equipment Supply | 65 | `text-sm` | Body | `text-body-sm` |
| Equipment Supply | 82 | `text-xs font-medium` | Caption | `text-caption font-medium` |
| Equipment Supply | 113 | `text-sm font-semibold` | Button label | `text-body-sm font-semibold` |
| Steel Trading | 24 | `text-xs font-semibold uppercase tracking-wider` | Caption | `text-caption font-semibold uppercase` |
| Steel Trading | 30 | `text-lg` | Body | `text-body-lg` |
| Steel Trading | 53, 70, 82 | `text-sm` | Body | `text-body-sm` |
| Supplier Network | 23 | `text-xs font-semibold uppercase tracking-wider` | Caption | `text-caption font-semibold uppercase` |
| Supplier Network | 27 | `text-lg` | Body | `text-body-lg` |
| Supplier Network | 42, 54, 72 | `text-sm` | Body | `text-body-sm` |
| Platform Vision | 28 | `text-xs font-semibold uppercase tracking-wider` | Caption | `text-caption font-semibold uppercase` |
| Platform Vision | 32 | `text-lg` | Body | `text-body-lg` |
| Platform Vision | 37, 43 | `text-sm font-semibold` | Button label (badge + CTA) | `text-body-sm font-semibold` |
| Platform Vision | 60 | `text-sm` | Body | `text-body-sm` |
| Platform Vision | 72 | `text-xs font-medium` | Caption | `text-caption font-medium` |
| Contact | 42 | `text-xs font-semibold uppercase tracking-wider` | Caption | `text-caption font-semibold uppercase` |
| Contact | 44 | `text-lg` | Body | `text-body-lg` |
| Contact | 60, 71, 75, 89 | `text-sm` | Body | `text-body-sm` |
| Contact | 104, 115 | `text-sm font-medium` | Body (form labels — not buttons, no weight change) | `text-body-sm font-medium` |
| Contact | 107, 121 | `text-sm` | Body (select/textarea) | `text-body-sm` |

---

## Explicitly not touched in this tier (flagged, not silently skipped)

- **Hero titles / Page titles** — every `<h1>` on all 9 pages. Blocked by T7/T8's targets requiring `tailwind.config.js` changes (responsive breakpoints for `h1`/`display`) not yet implemented — that's the High-risk tier.
- **Component titles** — every `<h3>` and title-role label identified in the Migration Plan (~15 instances across 7 pages + `Pillar`). Blocked by T6's new token not yet added to `tailwind.config.js` — that's the Medium-risk tier.
- **KPI/stat numbers** (`Home.tsx` line 98) — T5, remains Open Decision Required.
- **Sub-caption micro-text** (`EquipmentSupply.tsx` line 78, `SiteHeader.tsx` line 27) — Open Decision #4, not assigned to any T-decision.
- **Brand wordmark text** (`SiteHeader.tsx` line 26, `SiteFooter.tsx` line 36) — not cleanly one of the 7 requested roles; left as raw Tailwind classes rather than guessed into a role.
- **`Button.tsx`'s `sm`/`md`/`lg`/`icon` sizes**, and therefore `Contact.tsx`'s "Send Message" submit button (which uses the default `md` size) — per T9, these are shared with the internal CRM/Dashboard app and stay unchanged. This is a deliberate, known consequence: Contact's submit button, despite being on a public page, keeps its current styling because migrating it would require touching shared internal-app infrastructure that T9 explicitly excluded.
- Layout spacing, card structure, colors, routes, content, Persian/RTL — untouched, per instruction.

---

## Risk assessment

All items in this tier are **Low risk** per the Migration Plan's own tiering: exact or near-exact px matches (`text-sm`→`body-sm` etc. are identical pixel sizes; the only rendering delta is line-height/letter-spacing moving from Tailwind's per-size defaults to the approved 150%/0% body values and 140%/+1% caption values, which is the intended compliance fix, not a bug). No font-size numerically changes in this tier. The two font-*weight* changes (`SiteHeader.tsx`'s two nav-CTA pills, `font-medium`→`font-semibold`, per T4/T9) are the only visually-detectable change beyond the leading/tracking correction, and are explicitly authorized by T4/T9.

---

Execution begins after this report, per instruction.
