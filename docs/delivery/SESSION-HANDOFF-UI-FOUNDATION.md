# Session Handoff — UI Foundation + Component Inventory

document_id: ETA-SESSION-HANDOFF-001
status: Closed
date: 2026-08-07
authority: `ETA-Blueprint/20-BRANDING/04-Visual-Identity/Colors.md` (ETA-VISUAL-001), `Typography.md` (ETA-VISUAL-002), `Components.md` (ETA-VISUAL-005) — all Approved. `ETA-DESIGN-SYSTEM.md` (Draft, this repo) was not used as authority for any decision in this session.

---

## Session Objective

UI Foundation + Component Inventory

---

## Completed Work

### New components (`src/components/ui/`)
`Select.tsx`, `Drawer.tsx`, `Tabs.tsx` (+ `TabPanel`), `Alert.tsx`, `Toast.tsx` (+ `ToastProvider`/`useToast`), `EmptyState.tsx`, `Skeleton.tsx` (+ `SkeletonText`/`SkeletonAvatar`/`SkeletonCard`/`SkeletonRows`).

### Updated components (additive, non-breaking — verified in browser, no visual/behavioral change for existing callers)
- `Input.tsx` — success/helper-text validation states, `required` asterisk, RTL logical properties.
- `DataTable.tsx` — opt-in `sortable` / `paginated` / `stickyHeader` / `selectable` / `mono` props, all default-off; loading/empty states now use `Skeleton`/`EmptyState`.
- `StatCard.tsx` — optional `comparison` / `period` fields (Components.md's six-field KPI spec).
- `Button.tsx` — `primary` variant recolored Copper → Navy; new `accent` variant added (Copper) for premium/important actions.
- `Badge.tsx`, `Avatar.tsx`, `Progress.tsx`, `AppLayout.tsx` (demo-data banner) — raw Tailwind status colors replaced with semantic tokens (`success`/`warning`/`error`/`info`).
- `Card.tsx`, `StatCard.tsx`, `SiteUI.tsx`'s `Pillar` — radius corrected from `rounded-2xl` (20px) to `rounded-xl` (14px), bringing cards inside Components.md's approved 12–16px range.
- `SiteHeader.tsx` — added a "Demo data" badge next to the "Platform Preview" nav link so visitors are told before they click through to mock data.
- Page-level status-color cleanups (raw → semantic tokens, no structural change): `Dashboard.tsx`, `AiPlatform.tsx`, `SupplierPortal.tsx`, `SupplierDetail.tsx`, `Settings.tsx`.

### RTL improvements
- `Input.tsx`: `left-3`/`pl-9` → `start-3`/`ps-9`.
- `DataTable.tsx`: default column alignment `text-left` → `text-start`; pagination chevrons flip (`rtl:-scale-x-100`).
- All seven new components use logical-property utilities exclusively (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`, `gap-`) — none introduce physical-direction classes.
- `Drawer` anchors via `flex justify-end`, which is direction-aware by default in CSS — opens from the correct side in LTR and RTL with no `rtl:` override.
- `Tabs` keyboard navigation (Arrow Left/Right) reads `document.documentElement.dir` so "next tab" always maps to the reading-order-forward key.
- `LanguageProvider` mounted in `main.tsx` (default `en`/`ltr`, confirmed zero visual diff). `LanguageSwitcher.tsx` re-verified as already RTL-safe; left unmounted (rationale unchanged from `RTL-READINESS-NOTE.md`: `fa.ts` is 100% placeholder text).

### Design token alignment
- Color: `success`/`warning`/`error`/`info`/`copper`/`surface` tokens (from Colors.md) now used exclusively for status representation — zero raw `bg-green-*`/`bg-blue-*`/`bg-amber-*`/`bg-red-*` remaining in status-bearing code (AI-provider brand badges in `AiPlatform.tsx` intentionally excluded — categorical, not status).
- Typography: `display`/`h1`–`h4`/`body-lg`/`body`/`body-sm`/`caption` font-size tokens added to `tailwind.config.js`, transcribed verbatim from Typography.md. **Definitions only** — not yet applied to any existing page's rendered text (see Open Decisions).
- Radius: Card-class components corrected to the approved 12–16px range.
- Spacing: no Approved Blueprint document defines a numeric spacing scale; existing Tailwind default (4px grid) continues as-is — not replaced with an invented scale.

### Validation results
```
npm run typecheck   → clean, no errors
npm run build        → clean; dist/index.html 1.02 kB, index.css 29.41 kB (gzip 6.39 kB), index.js 579.14 kB (gzip 157.72 kB)
                        (pre-existing chunk-size advisory only, unrelated to this session's changes)
```
Browser spot-checks (Dashboard, Purchase Orders, Companies, marketing Home/header): no console errors, no visual regressions, Card radius and DataTable behavior confirmed correct for existing pages.

---

## Design Decisions Applied

- Button primary = ETA Navy; Copper reserved for the new `accent` variant (premium/important actions), per Components.md: "Primary buttons use ETA Navy. Important actions may use ETA Copper."
- Semantic color tokens (`success`/`warning`/`error`/`info`) used for all status representation — no raw Tailwind palette classes.
- Card radius = 12–16px range (`rounded-xl`, 14px), per Components.md's explicit card-radius rule.
- RTL logical properties (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`, `gap-`) preferred over physical-direction utilities in all new/touched components.
- Inter / Vazirmatn / JetBrains Mono remain the sole typeface authority (Typography.md) — no third typeface introduced.

---

## Open Decisions Required

- Persian translations (`fa.ts` is 100% placeholder text)
- Numeral system for Persian (Eastern Arabic vs. Western digits)
- Date/calendar format for Persian (Jalali vs. Gregorian)
- Icon-mirroring policy under RTL (which `lucide-react` icons should flip)
- Per-component RTL behavior not yet addressed: `Progress` bar fill direction, `DataTable`'s numeric-column align policy (`"right"` physical vs. `"end"` logical), 9 pre-existing files still on physical-direction utilities (`Header.tsx`, `MobileNav.tsx`, `SiteHeader.tsx` body, `Dashboard.tsx`, `SupplierPortal.tsx`, `SupplierDetail.tsx`, `SupplierList.tsx`)
- Table export (CSV/Excel) and bulk-action bar (selection state is exposed via `onSelectionChange`; the bar itself is page-level, out of scope)
- Multi-Select control (Select.tsx is single-choice only)
- Date Picker control (not built)
- Button loading/spinner state (not built)
- PageHeader typography (`text-2xl`/24px is ad hoc; Typography.md's H1 token is the literal match by description but applying it resizes every page title app-wide — left as an explicit decision rather than silently applied)

Full per-component detail: [UI-COMPONENT-INVENTORY.md](UI-COMPONENT-INVENTORY.md).

---

## Confirmed Guardrails Held

- No approved pages were redesigned — all page-level edits were raw-color-class swaps or a single additive nav badge, no layout/structure/copy changes.
- No product screens (Dashboard/CRM/Supplier/Finance) were created.
- No Figma dependency was introduced — all work done directly in code against Approved Blueprint docs.
- No undocumented design decisions — everything not sourced from an Approved doc is marked `Open Decision Required` above and in `UI-COMPONENT-INVENTORY.md`, none were silently decided.
