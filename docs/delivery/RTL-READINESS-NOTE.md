# RTL & Internationalization Readiness — Technical Foundation

document_id: ETA-RTL-READINESS-001
status: Draft — foundation only, no existing approved page modified
date: 2026-08-07
scope: Implements ETA-DESIGN-SYSTEM.md §8 "Track A" (technical RTL readiness) at a
reduced, foundation-only scope per explicit instruction: no wiring into existing
approved pages, no Persian translation, no invented locale behavior.

---

## What was added

New, additive-only module — no existing file was modified:

```
src/i18n/
  types.ts             — LanguageCode ("en"|"fa"), Direction, Translations interface
  en.ts                — English dictionary (site chrome only — nav/footer/common CTAs,
                          copied verbatim from already-approved SiteHeader/SiteFooter copy)
  fa.ts                — Same key structure, every value = "Open Decision Required"
  LanguageContext.tsx  — LanguageProvider + useLanguage() hook; toggles <html lang dir>
                          and persists choice to localStorage; defaults to en/ltr
  LanguageSwitcher.tsx — Standalone EN/FA toggle component; not mounted anywhere
  localeFormat.ts      — Stubs for locale-aware number/date formatting; explicitly
                          does not implement Jalali calendar or Eastern Arabic numerals
  index.ts             — barrel export
docs/delivery/RTL-READINESS-NOTE.md — this file
```

Nothing above is imported by `main.tsx`, `App.tsx`, `SiteHeader.tsx`, or any existing
page. The app's runtime behavior is unchanged today.

## Why the key set is scoped to "chrome" only

`en.ts` covers navigation, footer, and shared CTA strings — not full per-page
marketing body copy (Home/About/Industries/Services/Platform/Contact). Extracting
every page's body copy into keys now, with nowhere to wire it, would be a large diff
against files CONTENT-SOURCE-MAP.md already traced and verified, for no functional
gain. Recommend doing that page-by-page once Track B (Persian content) is scoped.

## What was intentionally NOT done, and why

| Item | ETA-DESIGN-SYSTEM.md §8 reference | Why deferred |
|---|---|---|
| Mount `LanguageProvider` in `main.tsx` | Track A | Would be zero-visual-diff (default is en/ltr) but instruction was to not touch existing approved files this pass. Ready to wire in — see "Next steps." |
| Mount `LanguageSwitcher` in `SiteHeader.tsx` | Track A, explicit | Same reason, plus: a switcher with only placeholder Persian behind it would visibly break as soon as it's clicked. |
| Convert physical-direction Tailwind utilities to logical properties across existing components | Track A, explicit | Touches 8 existing files (list below) — out of scope for an additive-only foundation pass. Listed here as a scoped follow-up. |
| Self-host Vazirmatn instead of CDN `@import` | Track A | Requires acquiring/licensing a local font asset; no such asset exists in the workspace yet. Flagged, not attempted. |
| Persian translation content | Track B | Explicitly out of scope this pass — no FA copy invented; `fa.ts` is 100% placeholder. |
| Numeral system, calendar system, icon-mirroring policy, nav order under RTL | — | Explicitly flagged as "Open Decision Required" per instruction — see below. |

---

## RTL CSS audit (descriptive only — no files changed)

Grep for physical-direction Tailwind utilities (`ml-`, `mr-`, `pl-`, `pr-`, `left-`,
`right-`, `text-left`, `text-right`, `rounded-l-`, `rounded-r-`, `border-l-`,
`border-r-`) across `src/` found matches in:

- `src/components/layout/Header.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/site/SiteHeader.tsx`
- `src/components/ui/DataTable.tsx`
- `src/components/ui/Input.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/SupplierPortal.tsx`
- `src/pages/suppliers/SupplierDetail.tsx`
- `src/pages/suppliers/SupplierList.tsx`

Each of these would need its physical-direction utilities (`ml-4` → `ms-4`, `text-left`
→ `text-start`, etc.) converted to logical-property equivalents before RTL could be
safely enabled without visual breakage. This list is the concrete scope of the
"Track A, logical-property conversion" line item — not yet executed.

New code added in this pass (`LanguageSwitcher.tsx`) uses only direction-neutral
utilities (`gap-`, `p-`, `rounded-md`) so it doesn't add to this list.

---

## Open Decisions Required

Per instruction, none of the following were inferred or decided. Each needs an
explicit answer (and, where it affects `ETA-Blueprint`, a Blueprint-side decision)
before Track A can be completed or Track B can start:

1. **Numeral system for Persian** — Eastern Arabic digits (۰۱۲۳...) vs. Western
   digits kept for consistency with technical/JetBrains Mono values.
2. **Calendar system for Persian** — Jalali (Persian) calendar vs. Gregorian for
   any user-facing dates.
3. **Icon mirroring policy** — which `lucide-react` icons (e.g. `ArrowRight`) should
   flip horizontally under `dir="rtl"` and which must never flip (logo, brand marks,
   media/play controls). No policy exists yet.
4. **Navigation order under RTL** — whether nav links reorder (mirror) or keep
   left-to-right reading order visually while the rest of the layout flips.
5. **Per-component RTL behavior** for data-dense components (`DataTable`, sidebar,
   forms) — not addressed by this foundation pass.
6. **Vazirmatn self-hosting** — source/license for a local font asset (currently
   CDN-loaded per `src/index.css`).

---

## Next steps (sequenced, none executed in this pass)

1. Decide the six open items above (Blueprint-side where applicable).
2. Wire `LanguageProvider` into `main.tsx` (zero visual diff — safe anytime).
3. Convert the 9 files listed in the CSS audit to logical-property utilities.
4. Once Persian content (Track B) is translated from the approved FA catalogue
   (`CONTENT-SOURCE-MAP.md` source S9), populate `fa.ts` for real and mount
   `LanguageSwitcher` in `SiteHeader.tsx`.
5. Self-host Vazirmatn; implement `localeFormat.ts` per the decided numeral/calendar
   policy.
