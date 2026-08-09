# UI Component Inventory — ETA Platform

document_id: ETA-UI-INVENTORY-001
status: Draft — for review
date: 2026-08-07
scope: `src/components/ui/` foundation component library only. No product screens (Dashboard/CRM/Supplier/Finance) were created or redesigned in this pass.
authority: `ETA-Blueprint/20-BRANDING/04-Visual-Identity/Colors.md` (ETA-VISUAL-001), `Typography.md` (ETA-VISUAL-002), `Components.md` (ETA-VISUAL-005) — all Approved. `ETA-DESIGN-SYSTEM.md` (Draft, this repo) was **not** used as authority for any decision below.
requested-but-mapped: "KPI Card" = `StatCard.tsx` (existing component, extended this pass). "Loading State" = `Skeleton.tsx` (new, content placeholders) + `Spinner.tsx` (existing, indeterminate spinner) — two distinct patterns per Components.md's own Feedback Components list ("Skeleton Loader" and "Progress Indicator" are separate line items), not one component.

---

## How to read this table

- **RTL status**: `Ready` = uses only logical-property utilities (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`, `gap-`), mirrors correctly the moment `dir="rtl"` is set. `Partial` = mostly logical, one or more noted exceptions. `Not evaluated` = pre-existing component untouched this pass.
- **Missing decisions** use the literal string `Open Decision Required` per governance — nothing below was inferred.

---

## Components

### Button — `Button.tsx`
Purpose: primary interactive action trigger.
Variants: `primary` (Navy), `accent` (Copper), `secondary`, `ghost`, `danger`, `outline`.
Sizes: `sm`, `md`, `lg`, `icon`.
States: default, hover, active, focus (`.focus-ring`), disabled. **Loading state not implemented** — Components.md requires it (async actions like PO submission); no spinner-in-button variant exists yet.
RTL status: Ready (icon+label is `gap-`-based, no physical margins).
Missing decisions: `Open Decision Required` — Components.md also lists a `Success` button type (distinct from `primary`/`accent`); not built this pass, no existing usage needed it.

### Badge — `Badge.tsx`
Purpose: compact status/category label.
Variants (tone): `neutral`, `copper`, `info`, `success`, `warning`, `error`.
States: with/without leading dot indicator.
RTL status: Ready.
Missing decisions: none — fully spec-compliant against Colors.md semantic tokens.

### Card — `Card.tsx` (+ `CardHeader`, `CardBody`, `CardTitle`, `CardDescription`)
Purpose: primary content container.
Variants: static or `hover` (interactive elevation).
States: rest (`shadow-soft`), hover (`shadow-card`) when `hover` is set.
RTL status: Ready (padding is symmetric, no physical utilities).
Fixed this pass: radius was `rounded-2xl` (20px), outside Components.md's approved "12–16px" card-radius rule — corrected to `rounded-xl` (14px). Same fix applied to `StatCard.tsx` and the marketing site's `Pillar` card (`SiteUI.tsx`).
Missing decisions: none.

### Input — `Input.tsx`
Purpose: single-line text entry.
Variants: with/without label, with/without leading icon.
States: default, focus, **error** (existing), **success** (new), **helper text** (new), disabled (native), required (new, shows asterisk). This closes the "no validation visual language" gap Components.md flags — error/success both exist now; a third "neutral-but-has-helper-text" state also exists.
RTL status: Fixed this pass — was `left-3`/`pl-9` (physical), now `start-3`/`ps-9` (logical). Ready.
Missing decisions: none.

### Select — `Select.tsx` (new)
Purpose: single-choice dropdown, native `<select>`-based for built-in accessibility/keyboard support rather than a custom listbox.
Variants: with/without label, with/without placeholder option.
States: default, focus, error, disabled.
RTL status: Ready (`ps-3`/`pe-9`/`end-3` throughout).
Missing decisions: `Open Decision Required` — Components.md also lists Multi-Select and Date Picker as required form controls; neither exists yet (Select here is single-choice only).

### Modal — `Modal.tsx`
Purpose: centered overlay dialog.
Variants: sizes `sm`/`md`/`lg`/`xl`.
States: open/closed, with/without title bar.
Behavior: focus stays trapped by virtue of `overflow-hidden` body scroll lock; Escape-to-close implemented; click-outside-to-close implemented.
RTL status: Not evaluated this pass (untouched) — centered layout has no left/right dependency, so it's very likely already RTL-safe, but wasn't formally re-audited.
Missing decisions: `Open Decision Required` — no explicit programmatic focus-trap (first-focusable-element autofocus) confirmed; Components.md requires modals to "trap focus."

### Drawer — `Drawer.tsx` (new)
Purpose: side-anchored panel for record quick-view/edit (Components.md Feedback Components).
Variants: sizes `sm`/`md`/`lg`.
States: open/closed, with/without title bar.
RTL status: Ready — anchored via `flex justify-end` on the outer container, which is direction-aware by default in CSS (opens right in LTR, left in RTL automatically, no `rtl:` override needed). Entrance uses a direction-neutral fade (not a physical slide) for the same reason.
Missing decisions: none for the anchoring behavior itself.

### Tabs — `Tabs.tsx` + `TabPanel` (new)
Purpose: in-page view switching for record detail pages (Components.md Navigation: Tabs).
Variants: any number of tabs, per-tab `disabled`.
States: active/inactive, disabled, keyboard focus.
Behavior: Arrow Left/Right, Home/End keyboard navigation per WAI-ARIA tabs pattern; `role="tablist"/"tab"/"tabpanel"` wired via `TabPanel` reading the active tab from context (no manual id-matching required from the consumer).
RTL status: Ready — Arrow Left/Right step direction is flipped based on `document.documentElement.dir` so "next tab" is always the reading-order-forward key.
Missing decisions: none.

### Table — `DataTable.tsx` (upgraded)
Purpose: enterprise data table.
New capabilities this pass (all opt-in, default-off, **zero visual/behavioral change for existing callers** that don't pass the new props):
- `sortable` per column (click header to sort, ascending/descending indicator)
- `paginated` + `pageSize` (footer with page count, Previous/Next)
- `stickyHeader` (sticky `<thead>` on vertical scroll)
- `selectable` + `selectedIds`/`onSelectionChange` (checkbox column, header select-all with indeterminate state)
- `mono` per column (JetBrains Mono for ID/technical-value columns, per Typography.md §Monospace Usage)
- Loading state now uses the shared `Skeleton` component instead of a one-off shimmer bar; empty state uses the new shared `EmptyState` component when no custom `emptyState` is supplied.
RTL status: Ready — default text alignment is now logical (`text-start`) instead of the previous hardcoded `text-left`; pagination chevrons flip (`rtl:-scale-x-100`).
Missing decisions: `Open Decision Required` — (1) **Bulk actions bar and CSV/Excel export** are listed in Components.md's Table spec but were not built: selection state is exposed via `onSelectionChange` so a consuming page can build its own bulk-action bar, but the bar itself is a page-level/product-screen concern, out of scope for this foundation pass. (2) The existing `align: "right"` usage (`PurchaseOrders.tsx` PO total column) was left as physical `text-right` to avoid changing rendered behavior; whether numeric columns should mirror to `text-end` under RTL or always stay visually right-aligned is unresolved — new `"start"/"end"` logical align options were added alongside the old `"left"/"right"/"center"` ones so either policy can be adopted later without another migration. (3) No responsive card-per-row fallback below `md` breakpoint yet (still horizontal-scroll only).

### KPI Card — `StatCard.tsx` (extended)
Purpose: dashboard metric card. Maps to Components.md's "KPI Card" requirement.
Fields: Value, Label, Icon, Trend (existing) + **Comparison** and **Time Period** (new, optional — Components.md requires all six; the two new fields render nothing when unset, so every existing Dashboard usage is visually unchanged).
Variants (tone): `copper`, `info`, `neutral`, `success`, `warning`.
RTL status: Ready (no physical utilities).
Missing decisions: none for the field set; sparkline/inline-trend-chart visualization (mentioned in the broader Charts discussion) is out of scope — no charting library exists in this project yet.

### Alert — `Alert.tsx` (new)
Purpose: inline, persistent, dismissible status message (Components.md Feedback Components).
Variants (tone): `success`, `warning`, `error`, `info` — always color + icon + text label together, never color alone.
States: with/without title, dismissible or not.
RTL status: Ready (`gap-`-based layout, no physical utilities).
Missing decisions: none.

### Toast — `Toast.tsx` + `ToastProvider`/`useToast` (new)
Purpose: transient, corner-anchored, auto-dismissing status message (Components.md Feedback Components).
Variants (tone): `success`, `warning`, `error`, `info` — icon + logical start-edge accent border (`border-s-4`), not a full-tint background (toasts float over arbitrary page content, unlike inline `Alert`).
Behavior: auto-dismiss default 4s (configurable per call), manual dismiss, `aria-live="polite"` region so screen readers announce without stealing focus (per the accessibility rules the ui-ux-pro-max skill flagged for toasts).
RTL status: Ready — anchored via `end-4` (logical), renders bottom-right in LTR / bottom-left in RTL automatically.
Missing decisions: `Open Decision Required` — **not mounted into `main.tsx`**. Wiring `ToastProvider` app-wide is zero-visual-diff (nothing calls `useToast()` yet) but was left out of this pass since it's the first piece of global provider wiring beyond `LanguageProvider`, and "do not create product screens" made it unclear whether any page should be the first `useToast()` call site yet.

### Empty State — `EmptyState.tsx` (new)
Purpose: standardized "nothing here" pattern (Components.md Feedback Components) — icon + message + optional CTA.
Used by: `DataTable.tsx`'s default empty state (replacing its previous ad hoc "No data available" text).
RTL status: Ready.
Missing decisions: none.

### Skeleton / Loading State — `Skeleton.tsx` (new)
Purpose: content-placeholder shimmer, replacing one-off shimmer implementations.
Presets: `Skeleton` (raw block), `SkeletonText` (n lines), `SkeletonAvatar`, `SkeletonCard`, `SkeletonRows` (used by `DataTable`'s loading state).
RTL status: Ready (no directional dependency).
Missing decisions: none. (See `Spinner.tsx` below for the separate indeterminate-spinner pattern.)

### Spinner — `Spinner.tsx` (pre-existing, unchanged)
Purpose: indeterminate loading spinner (`Spinner`, `FullPageSpinner`).
RTL status: Not evaluated — spinner is a rotating circle, no directional dependency expected.
Missing decisions: none.

### Progress — `Progress.tsx` (token fix only)
Purpose: determinate progress bar.
Variants (tone): `copper`, `info`, `success`, `warning`, `error`, `neutral`.
Fixed this pass: raw Tailwind colors (`bg-blue-500` etc.) replaced with semantic tokens.
RTL status: Not evaluated — bar fill uses `width` percentage, not a physical-direction utility, but whether the fill should visually grow from the logical start or end under RTL was not addressed.
Missing decisions: `Open Decision Required` — progress-bar fill direction under RTL.

### Avatar — `Avatar.tsx` (token fix only)
Purpose: initials-based user/entity avatar chip.
Variants (tone): `copper`, `info`, `neutral`.
Fixed this pass: `info` tone's raw `bg-blue-50 text-blue-700` replaced with semantic tokens.
RTL status: Not evaluated — circular chip, no directional dependency expected.
Missing decisions: none.

### PageHeader — `PageHeader.tsx` (unchanged)
Purpose: page-level title/description/actions bar.
RTL status: Not evaluated — already `flex`/`gap-`-based, no physical utilities observed, but not formally re-audited this pass.
Missing decisions: `Open Decision Required` — title currently renders at an ad hoc `text-2xl` (24px). Typography.md's H1 token (40px, "major page titles" — now defined in `tailwind.config.js` as `text-h1`) is the literal match by description, but applying it would visibly resize every page title app-wide. That's a page-visual change, not a token-naming change, so it was **not applied** this pass per "do not redesign approved pages randomly" — left as an explicit open decision for the next design review rather than silently resized.

---

## Design tokens (prerequisite work, prior session — listed here for completeness)

- **Color**: `success`/`warning`/`error`/`info`/`copper`/`surface` in `tailwind.config.js`, sourced from Colors.md. All raw Tailwind status colors (`bg-green-*` etc.) removed from every status-bearing component and page.
- **Typography**: `display`/`h1`–`h4`/`body-lg`/`body`/`body-sm`/`caption` font-size tokens added to `tailwind.config.js`, transcribed verbatim from Typography.md. **Not yet applied to any existing page or component's rendered text** (see PageHeader entry above) — token definitions only, per this pass's scope.
- **Radius**: Card-class components corrected to the approved 12–16px range (see Card entry above). No other radius changes made.
- **Spacing**: No Approved Blueprint document defines a numeric spacing scale. `Open Decision Required` — this inventory does not invent one; existing Tailwind default spacing (4px grid) continues to be used as-is.

---

## RTL & Persian readiness (Track A / Track B per `RTL-READINESS-NOTE.md`)

- `LanguageProvider` is mounted in `main.tsx` (default `en`/`ltr`, confirmed zero visual diff).
- `LanguageSwitcher.tsx` (existing) re-verified this pass: already fully logical-property-based, no fix needed. **Still not mounted** into `SiteHeader.tsx` — `fa.ts` is 100% `"Open Decision Required"` placeholder text, so exposing the switcher now would let a user select Persian and see literal "Open Decision Required" strings across the site. This is a deliberate carry-forward of the prior session's documented decision, not an oversight.
- No Persian translation content was added or invented this pass, per instruction.
- Every new component in this inventory uses logical-property Tailwind utilities (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`, `gap-`) exclusively — none introduce new physical-direction classes.
- The 9 pre-existing files with physical-direction utilities identified in `RTL-READINESS-NOTE.md` (`Header.tsx`, `MobileNav.tsx`, `SiteHeader.tsx`, `DataTable.tsx` [now partially addressed via the `text-start` default — header/cell alignment specifically], `Input.tsx` [now fixed], `Dashboard.tsx`, `SupplierPortal.tsx`, `SupplierDetail.tsx`, `SupplierList.tsx`) — remaining unconverted files are unchanged this pass; still `Open Decision Required` / scoped follow-up.
- Numeral system, calendar system, icon-mirroring policy, and nav-order-under-RTL remain exactly as documented in `RTL-READINESS-NOTE.md` — `Open Decision Required`, untouched.

---

## Summary — what's genuinely new vs. fixed vs. still open

| | |
|---|---|
| **New components** | Select, Drawer, Tabs, Alert, Toast (+provider), EmptyState, Skeleton |
| **Extended (additive, non-breaking)** | Input (validation states), DataTable (sort/paginate/sticky/select), StatCard (Comparison/Time Period) |
| **Token/compliance fixes only** | Card, Progress, Avatar, SiteUI's `Pillar` |
| **Unchanged, not re-audited** | Modal, Spinner, PageHeader |
| **Explicitly not built** (flagged `Open Decision Required` above, not silently skipped) | Multi-Select, Date Picker, Button loading state, Table export/bulk-action bar, Modal focus-trap confirmation, Progress RTL fill-direction policy, PageHeader typography resize |
