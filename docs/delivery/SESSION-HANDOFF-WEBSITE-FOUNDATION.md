# Session Handoff — ETA Website Foundation

document_id: ETA-SESSION-HANDOFF-002
status: Closed
date: 2026-08-08
authority: `ETA-Blueprint/20-BRANDING/*` (Colors `ETA-VISUAL-001`, Typography `ETA-VISUAL-002`, Components `ETA-VISUAL-005`, Imagery `ETA-VISUAL-004`, Sitemap `ETA-SITEMAP-001`) — all Approved.
related: `SESSION-HANDOFF-UI-FOUNDATION.md` + `NEXT-SESSION-TASK.md` cover a parallel, more recent track (component library + RTL work inside `src/components/`) that landed in this same working tree during this session. This document covers the public-website-specific track; see "Cross-reference" below for how the two relate.

---

## Session Objective

Stand up the ETA public website foundation per the branding docs, verify it against ETA-Blueprint, and add the technical (non-content) groundwork for future Persian/RTL support — without redesigning anything already approved.

---

## Completed

### Repository stack verification

The task brief referenced Next.js/Turborepo. That does not match this repository. Verified from `package.json`, `vite.config.ts`, `tsconfig.json`:

- **React 19.2.7**
- **Vite 8.1.1** (not Next.js)
- **Tailwind CSS 3.4.15**
- **Supabase** (`@supabase/supabase-js`) for backend integration
- **React Router 7** (`react-router-dom`) for routing
- Single package, no monorepo/Turborepo — one Vite app at the ETA-Platform root.

### Existing website status (verified, not newly built)

The landing page and site shell already existed in this repo before this session (commit `5a52bdf`, "ETA MVP foundation: branding, website content, inquiry module, and UI stabilization") and were re-verified against the Approved Blueprint docs rather than rebuilt:

- **Landing page** (`src/pages/site/Home.tsx`): Hero, About ETA, What We Do (Core Services), Industries, ETA Platform, Why ETA, Mission/Vision, Contact CTA — matches `20-BRANDING/03-Website/Sitemap.md`'s approved Home structure exactly.
- **Site shell**: `SiteLayout.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx` wired into routing (`App.tsx`) for `/`, `/about`, `/industries`, `/services`, `/platform`, `/contact`.
- **Logo integrated**: real `public/Logo.svg` (+ `mark.svg`/`type.svg`) rendered in header and footer — the placeholder-logo defect noted in `MVP-VISUAL-AUDIT.md` §1.1 is resolved.
- **Navy/Copper palette applied**: `tailwind.config.js` `surface` (Navy family, `surface-900` = `#0F172A`) and `copper` (`copper-500` = `#C57B39`) tokens match `Colors.md` exactly; no stray `brand`/`gold`/`teal` ramps present.
- **Typography applied**: Inter (Latin) + Vazirmatn (Persian, CDN-loaded) + JetBrains Mono, per `Typography.md`, wired in `tailwind.config.js` and `src/index.css`.
- **Content traced to verified sources** — see `CONTENT-SOURCE-MAP.md` for the full source-to-component mapping (no invented company facts).

Other pages already exist too: `About.tsx` (227 lines), `Services.tsx` (101 lines), `Industries.tsx` (80 lines), `PlatformOverview.tsx` (106 lines), `Contact.tsx` (134 lines). Not modified this session — see `NEXT-WEBSITE-TASK.md`.

### RTL Foundation

Created `src/i18n/` — additive-only, no existing page visually modified when first added:

| File | Purpose |
|---|---|
| `types.ts` | `LanguageCode` (`"en"\|"fa"`), `Direction`, `Translations` interface (site-chrome keys only — nav/footer/common CTAs) |
| `en.ts` | English dictionary — real, already-approved chrome copy, not new content |
| `fa.ts` | Same key shape, every value literally `"Open Decision Required"` — no Persian invented |
| `LanguageContext.tsx` | `LanguageProvider` + `useLanguage()` hook; toggles `<html lang dir>`, persists to `localStorage`, defaults to `en`/`ltr` |
| `LanguageSwitcher.tsx` | Standalone EN/FA toggle component |
| `localeFormat.ts` | Formatting stubs — explicitly does **not** implement Jalali calendar or Eastern Arabic numerals (both flagged `Open Decision Required`, falls back to existing Gregorian/Western behavior) |
| `index.ts` | Barrel export |

**Status as of this handoff**: `LanguageProvider` is now mounted in `main.tsx` (`defaultLanguage="en"`, confirmed zero visual diff) — done during the parallel UI Foundation session, not this one; see Cross-reference. `LanguageSwitcher` remains intentionally **unmounted** (not wired into `SiteHeader.tsx`) — a switcher with only placeholder Persian behind it would visibly break the moment it's used.

- English/LTR: ready (this is simply current production behavior).
- Persian/RTL structure: technical scaffolding ready (`lang`/`dir` plumbing, Vazirmatn font cascade, `[dir="rtl"]` CSS rule, translation-key structure).
- Persian translation: **intentionally not created**. `fa.ts` is 100% placeholder. Real translation requires mapping the approved `Exir-Tejarat-Atlas-Catalogue-FA.pdf` (source S9 in `CONTENT-SOURCE-MAP.md`) string-by-string — not attempted.
- Undefined items are explicitly marked `Open Decision Required` in `RTL-READINESS-NOTE.md`: numeral system (Eastern Arabic vs. Western digits), calendar system (Jalali vs. Gregorian), icon-mirroring policy, nav-order-under-RTL, per-component RTL behavior, Vazirmatn self-hosting.

Full detail: [RTL-READINESS-NOTE.md](RTL-READINESS-NOTE.md).

### Cross-reference — parallel UI Foundation session

While this website-foundation work was in progress, a separate/parallel session ran a broader **UI Foundation + Component Inventory** pass in the same working tree (now closed — see [SESSION-HANDOFF-UI-FOUNDATION.md](SESSION-HANDOFF-UI-FOUNDATION.md)). It:

- Mounted `LanguageProvider` in `main.tsx` (building on this session's `src/i18n/` module).
- Added 7 new shared components (`Select`, `Drawer`, `Tabs`, `Alert`, `Toast`, `EmptyState`, `Skeleton`) and extended several existing ones.
- Converted more components to RTL logical properties and fixed color-token/radius drift against `Components.md`.
- Produced its own `NEXT-SESSION-TASK.md`, gating Dashboard/CRM/Supplier/Finance UI work behind an "ETA UX Architecture Phase."

That gate applies to **internal product screens**, not the public marketing website — see `NEXT-WEBSITE-TASK.md` for this track's own next steps, which don't conflict with it.

---

## Final Validation

```
npm run typecheck   → clean, no errors (exit 0)
npm run build        → clean (exit 0)
                        dist/index.html   1.02 kB
                        dist/assets/index.css   29.41 kB (gzip 6.39 kB)
                        dist/assets/index.js    579.14 kB (gzip 157.72 kB)
                        (pre-existing chunk-size advisory only, not a new regression)
```

Browser check (`http://localhost:5173`, dev server): landing page renders correctly (Hero through Contact CTA, all copy present), no console errors, no network failures.

No existing page regression — confirmed by running validation against the full current working tree (including the parallel session's changes), not in isolation.

---

## Open Decisions Required (carried forward)

- Persian translations (`fa.ts` is placeholder)
- Numeral system for Persian (Eastern Arabic vs. Western digits)
- Calendar system for Persian (Jalali vs. Gregorian)
- Icon-mirroring policy under RTL
- Nav-order-under-RTL
- Per-component RTL behavior for data-dense components
- Vazirmatn self-hosting (source/license for a local font asset)
- Whether "Industrial Equipment Supply," "Steel Sheet Trading," and "Supplier Network" should become explicit Home-page sections (currently: approved as Services-page subsections per `Sitemap.md`; user decision this session was to leave Home as-is and not restructure without a Change Request)

---

## Confirmed Guardrails Held

- No approved page was redesigned or restructured — Home's section order/content matches the Approved Sitemap unchanged.
- No architecture, entity, or business-rule change made.
- No fake or invented brand assets — only the existing `public/Logo.svg`/`mark.svg`/`type.svg`.
- No Persian marketing copy invented — `fa.ts` is placeholder-only, explicitly marked.
- Stack-mismatch in the original brief (Next.js/Turborepo) was corrected against actual repo state rather than silently followed.
