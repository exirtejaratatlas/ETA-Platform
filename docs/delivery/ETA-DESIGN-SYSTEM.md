# ETA Design System — Enterprise Platform

document_id: ETA-DESIGN-SYSTEM-001
status: Superseded — not used as authority; retained for historical record only
version: 1.0 (proposed)
date: 2026-08-04
authority: This document implements, and never overrides, `ETA-Blueprint/20-BRANDING/04-Visual-Identity/*` (Colors `ETA-VISUAL-001`, Typography `ETA-VISUAL-002`, Icons `ETA-VISUAL-003`, Imagery `ETA-VISUAL-004`, Components `ETA-VISUAL-005` — all status Approved). Where anything below appears to conflict with those documents, the Blueprint documents win and this file must be corrected.
source of truth for logo: `public/Logo.svg` (do not replace or recreate; symbol-only mark at `public/mark.svg`, wordmark-only at `public/type.svg`)
findings addressed: `docs/delivery/UI-DESIGN-AUDIT.md`

---

> **SUPERSEDED NOTICE (added 2026-08-09, per `REPOSITORY-HYGIENE-AUDIT.md`):** This proposed
> design system was never approved and was explicitly **not** used as authority for any
> decision in later sessions — see `SESSION-HANDOFF-UI-FOUNDATION.md` (2026-08-07): *"`ETA-DESIGN-SYSTEM.md`
> (Draft, this repo) was not used as authority for any decision in this session."* All UI/UX
> work since has drawn directly from the Approved `ETA-Blueprint/20-BRANDING/04-Visual-Identity/*`
> documents instead. This file is kept for historical record only — do not treat it as current
> or pending guidance. Content below is unchanged from its original 2026-08-04 draft.

---

## 0. Design Principles

From `Components.md`: every ETA interface must be **Simple, Consistent, Accessible, Responsive, Reusable, Enterprise Grade** — and must "communicate confidence before the first interaction." From `Colors.md` and `Typography.md`: the overall experience should feel **calm, professional, enterprise-grade**; typography must "support information, not compete with it."

Three rules govern every decision in this document:

1. **Navy leads, Copper punctuates.** Primary color dominance is 70% Navy/neutral-adjacent, 20% neutral, 10% Copper accent (`Colors.md`, "Usage Rules"). Copper is reserved for CTAs, active/selected states, and premium highlights — not for default UI chrome.
2. **Never guess a token.** Every color, size, radius, and shadow used in product code must resolve to a name defined in this document (or Tailwind config, once implemented) — never a raw hex or an un-namespaced Tailwind palette class (`bg-blue-50` is forbidden; `bg-info-50` is required).
3. **Status is never color-only.** Every status indicator pairs color + icon + text label (`Colors.md` Accessibility section; `Icons.md` Accessibility section).

---

## 1. Colors

Authority: `Colors.md` (`ETA-VISUAL-001`). Values below are copied verbatim; do not introduce new hexes without a Blueprint Change Request.

### 1.1 Primary Brand Colors

| Token | Hex | Purpose |
|---|---|---|
| `navy` (maps to existing `surface-900`) | `#0F172A` | Primary brand color — trust, engineering excellence, professionalism. Dominant color across the UI. |
| `copper-500` | `#C57B39` | Accent — innovation, energy, premium quality. Used sparingly (~10%). |
| `white` | `#FFFFFF` | Clean interfaces, generous whitespace. |

### 1.2 Neutral Palette

| Token | Hex |
|---|---|
| Graphite | `#1E293B` |
| Slate | `#475569` |
| Steel Gray | `#64748B` |
| Light Steel | `#CBD5E1` |
| Soft Gray | `#E2E8F0` |
| Background | `#F8FAFC` |

These map 1:1 onto the existing `surface` scale already in `tailwind.config.js` (`surface-800`≈Graphite, `surface-600`≈Slate, `surface-500`≈Steel Gray, `surface-300`≈Light Steel, `surface-200`≈Soft Gray, `surface-50`≈Background). No new neutral ramp is introduced — this section documents the existing `surface-*` tokens against their approved Blueprint names so components can be reviewed against a named spec instead of a bare hex.

### 1.3 Semantic Colors

| Token | Hex | Used for |
|---|---|---|
| `success` | `#16A34A` | Success states, completed workflows, positive KPIs |
| `warning` | `#F59E0B` | Pending approvals, warnings, attention indicators |
| `error` | `#DC2626` | Errors, critical alerts, validation failures |
| `info` | `#2563EB` | Links, information panels, active elements |

**Enforcement rule (closes UI-DESIGN-AUDIT §2.2, §3.4):** `success`/`warning`/`error`/`info` token families already exist in `tailwind.config.js` with `DEFAULT`/`light`/`dark` values matching this table. No component may use raw Tailwind palette classes (`green-*`, `blue-*`, `amber-*`, `red-*`, `emerald-*`, `orange-*`) for status representation. `Badge`, `StatCard`, `Dashboard`, and `AiPlatform` must be migrated to reference `success-*`/`warning-*`/`error-*`/`info-*`/`copper-*` exclusively. This includes adding `50`/`100`/`700` steps to each semantic family in Tailwind config (currently only `DEFAULT`/`light`/`dark` exist, which is insufficient for the light-background + dark-text badge pattern already in use).

### 1.4 Usage Rules

- **Primary dominance: 70%.** Navy and neutral surfaces should visually anchor every screen — page backgrounds, headers, primary text, sidebar chrome.
- **Neutral: 20%.** Card surfaces, borders, secondary text, dividers.
- **Accent (Copper): 10%.** Reserved for: primary CTA buttons on marketing/conversion surfaces, active nav/tab state, key data highlights (e.g., the single most important stat on a page), premium/AI-related visual accents. **Correction from current implementation:** the in-app `Button` `primary` variant currently defaults every primary action to Copper; per `Components.md` ("Primary buttons use ETA Navy. Important actions may use ETA Copper"), the redesign must introduce a Navy-primary button as the default `primary` variant, with Copper reserved for a distinct "important/premium" variant (e.g., `accent`) used only where genuinely warranted (upgrade prompts, AI actions, high-value CTAs).
- Copper should never be the default color of icons, links, or repeated UI chrome (nav items, table headers) — see UI-DESIGN-AUDIT §2.3.
- All color combinations must meet WCAG AA contrast. Verify `copper-500` on white (current accent-on-white pairings) meets 4.5:1 for body text; if not, restrict `copper-500` text usage to large text/UI labels (≥18px or bold ≥14px) and use `copper-700` for small copper-on-white text.

---

## 2. Typography

Authority: `Typography.md` (`ETA-VISUAL-002`).

### 2.1 Typefaces

| Role | Typeface | Usage |
|---|---|---|
| Primary (Latin) | **Inter** | Website, Dashboard, Enterprise Platform, UI Components, Presentations |
| Persian | **Vazirmatn** | Persian website, dashboards, mobile apps, company documents. **Must be self-hosted** (bundled as a local font asset), not loaded from a public CDN — see UI-DESIGN-AUDIT §4.3. |
| Monospace | **JetBrains Mono** | Code, IDs, technical values, logs, AI output |

**Rule:** never use more than two font families on a single screen (Blueprint "Usage Rules"). In practice: Inter/Vazirmatn for all copy, JetBrains Mono only for the specific technical-value cases below — never a third display face.

### 2.2 Type Scale

This is the authoritative scale. It must be implemented as named Tailwind theme entries (e.g., `text-display`, `text-h1` … `text-caption`) so every component references a role, not a raw pixel size.

| Role | Size | Line height | Letter spacing | Weight | Usage |
|---|---|---|---|---|---|
| Display | 48–64px | 120% | -1% | 700 (Bold) | Hero sections (marketing site only) |
| H1 | 40px | 120% | -1% | 600–700 | Major page titles |
| H2 | 32px | 120% | -1% | 600 | Section titles |
| H3 | 24px | 120% | -1% | 600 | Subsections |
| H4 | 20px | 120% | -1% | 600 | Component titles |
| Body Large | 18px | 150% | 0% | 400–500 | Highlighted paragraphs |
| Body | 16px | 150% | 0% | 400 | Default content |
| Body Small | 14px | 150% | 0% | 400–500 | Secondary information |
| Caption | 12px | 140% | +1% | 500 | Metadata, timestamps, helper text |

**Application to current components (redesign targets):**
- `PageHeader` title → H2 (32px), not the current 24px — page titles inside the app shell are one step down from a marketing H1, but should read more authoritatively than the current size.
- `CardTitle` → H4 (20px) for primary cards, Body Small + SemiBold for dense/compact card contexts (e.g., list-item-style cards) — the current flat `text-sm` for all card titles regardless of hierarchy is the drift this scale fixes.
- Table headers → Caption (12px, +1% tracking, uppercase — already directionally correct in `DataTable.tsx`, just needs to move onto the named token).
- StatCard value → H2/H3 scale depending on card size, not an ad hoc `text-2xl`.

### 2.3 Monospace Usage (new — closes UI-DESIGN-AUDIT §4.4)

Apply `font-mono` (JetBrains Mono, already declared in `tailwind.config.js` but unused) to:
- PO numbers (`po.po_number`), supplier/company/contact record IDs
- AI task IDs, model version strings, timestamps in logs
- Any tabular numeric column where digit alignment matters (monetary values in dense tables benefit from tabular-nums even in Inter, but IDs specifically should be full monospace)

### 2.4 Weights

Regular 400 · Medium 500 · SemiBold 600 · Bold 700. Avoid excessive bold text (Blueprint "Usage Rules") — reserve 700 for Display/H1 only; H2–H4 use 600; body text never exceeds 500 except for short inline emphasis.

---

## 3. Spacing

No Blueprint document currently defines a spacing scale numerically — this section is the redesign's proposal, built on the existing Tailwind 4px base grid already in use, and should be ratified alongside this document.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Icon-to-text gaps, tight inline spacing |
| `space-2` | 8px | Compact component internal padding |
| `space-3` | 12px | Default gap between related inline elements |
| `space-4` | 16px | Standard component padding (buttons, inputs) |
| `space-5` | 20px | Card internal padding (compact) |
| `space-6` | 24px | Card internal padding (standard), section gaps |
| `space-8` | 32px | Between major page sections |
| `space-12` | 48px | Page-level top/bottom margins |
| `space-16` | 64px | Marketing-site section spacing |

Keep the existing custom steps (`4.5`, `13`, `18`, `22`, `30`, `38`) only where a specific component measurement requires them (e.g., the 64px/`h-16` header height uses `18`≈4.5rem indirectly via `h-16`); do not use custom steps as general-purpose spacing — prefer the named scale above.

**Density modes:** enterprise data tools need a compact mode for power users. Define two spacing densities for `DataTable` row height and `Card` padding — `comfortable` (default, current spacing) and `compact` (approx. 75% of comfortable) — selectable per view, not globally, since Dashboard/CRM benefit from comfortable while Supplier/PO lists with many columns benefit from compact.

---

## 4. Elevation & Radius

| Token | Value | Usage |
|---|---|---|
| `radius-md` | 8px (`rounded-lg`) | Buttons, inputs, nav items, badges |
| `radius-lg` | 14px (`rounded-xl`) | Icon containers, compact cards |
| `radius-xl` | 20px (`rounded-2xl`) | Standard cards, modals |
| `radius-2xl` | 24px (`rounded-3xl`) | Hero/marketing containers only |

Matches Blueprint's Component rule of "rounded corners 12–16px" for cards (current `rounded-2xl` = 16px on `Card` is compliant; keep it as the card default).

| Shadow token | Usage rule (new — closes UI-DESIGN-AUDIT §2.4) |
|---|---|
| `shadow-soft` | Rest state for all cards and static containers |
| `shadow-card` | Hover state for interactive/clickable cards |
| `shadow-elevated` | Overlays: modals, drawers, command palette, dropdowns |
| `shadow-glow-copper` | Reserved exclusively for Copper-accented premium/AI elements (e.g., an active AI suggestion card) — never for standard hover states |

---

## 5. Iconography

Authority: `Icons.md` (`ETA-VISUAL-003`).

- **Library:** Lucide (primary, already in use — correct). Phosphor Icons as secondary/fallback only if Lucide lacks a needed icon; custom icons must match: outline, minimal, geometric, 2px stroke, round cap/join, 24×24 base grid.
- **Sizes:** 16 / 20 / 24 / 32 / 48px only — matches current usage (`size={16}`, `size={20}` seen throughout).
- **Color mapping (enforce — closes UI-DESIGN-AUDIT §2.5):**

| Context | Color |
|---|---|
| Default | Graphite (`surface-800`, `#1E293B`) |
| Primary actions | Navy (`surface-900`) |
| Highlights | Copper (`copper-500`) |
| Success / Warning / Error / Info | matching semantic token, never raw palette |

- Icons change only in color/opacity across states (default/hover/active/disabled/selected) — no icon animation except where it communicates a state change (e.g., the existing `Sparkles` pulse on running AI tasks is an acceptable, Blueprint-compliant exception).
- Icons are never the sole indicator of status — always pair with text label (already mostly followed via `Badge`; must extend to icon-only buttons, which need `aria-label` + tooltip).

---

## 6. Components

Authority: `Components.md` (`ETA-VISUAL-005`). This section defines the target component library — current state vs. required state, per the audit.

### 6.1 Buttons

| Variant | Color | When to use |
|---|---|---|
| Primary | Navy | Default primary action on every screen (redesign correction — see §1.4) |
| Accent | Copper | Single most important / premium / AI-related action per screen, used sparingly |
| Secondary | Neutral surface | Secondary actions |
| Outline | Neutral border | Tertiary actions, toolbar buttons |
| Ghost | Transparent | Low-emphasis actions, icon buttons |
| Danger | Error | Destructive actions (always paired with a Confirmation Dialog, §6.4) |
| Success | Success | Confirm/approve actions (new — Blueprint lists "Success" as a required button type; does not exist in current `Button.tsx`) |

States required for every variant: Default, Hover, Focus (visible focus ring — already implemented via `.focus-ring`), Active, Disabled, **Loading** (new — no button in the current codebase has a loading/spinner state; required for async actions like PO submission).

### 6.2 Cards

- Large internal spacing (`space-6`/24px standard, `space-5`/20px compact density).
- Rounded corners 16px (`rounded-2xl`, current default — keep).
- Soft shadow at rest (`shadow-soft`), `shadow-card` on hover only when interactive.
- Clear hierarchy: optional icon slot (top-left, 40×40px container, current `StatCard`/`PageHeader` pattern — keep and standardize across all card types).
- Optional KPI slot: value (H2/H3) + label (Body Small) + trend (Caption, colored by direction using semantic tokens, paired with an up/down icon — never color alone).

### 6.3 Tables (target spec — closes UI-DESIGN-AUDIT §3.1, §3.7)

Required capabilities for the redesigned `DataTable`:
- **Sorting** — clickable column headers with sort direction indicator
- **Filtering** — per-column filter affordance or a unified filter bar above the table
- **Pagination** — page-size selector + page navigation, default 25/50/100 rows
- **Sticky header** — header row remains visible on vertical scroll within the table container
- **Row selection** — checkbox column, header "select all," visible selection count
- **Bulk actions** — contextual action bar appears when ≥1 row selected
- **Export** — CSV/Excel export of current view (filtered/sorted state)
- **Density toggle** — comfortable/compact (§3)
- **Responsive fallback** — below a defined breakpoint (proposed: `md`, 768px), switch from table layout to stacked card-per-row layout instead of relying solely on horizontal scroll (closes UI-DESIGN-AUDIT §6.3)

### 6.4 Forms

Controls: Text Input, Search, Select, Multi-Select, Date Picker, Upload, Checkbox, Radio, Toggle, Text Area — per `Components.md`. Every control needs four visual states beyond default/focus/disabled: **neutral, error (red border + icon + inline message), success (green border + icon), and helper text (gray, always visible when present)**. This is new relative to current `Input.tsx`, which has no documented validation states (UI-DESIGN-AUDIT §3.5).

### 6.5 Navigation

- **Sidebar** — current implementation is structurally sound (sectioned, icon+label, active state); redesign adds collapsed/icon-only mode for power users and ultra-wide layouts.
- **Top navigation / Header** — keep command palette (`⌘K`), redesign search trigger sizing for narrow mobile widths (UI-DESIGN-AUDIT §6.4).
- **Breadcrumb** — new. Required on all Level-2+ pages (e.g., Supplier Detail, PO Detail) to orient users navigating deep records.
- **Tabs** — new. Required for record detail pages with multiple sub-views (e.g., Supplier Detail: Overview / Documents / Performance / Contacts).
- **Context menu** — new. Required for row-level actions in tables (right-click or "⋯" trigger) instead of navigating away for simple actions.
- **Command palette** — exists (`Header.tsx`), keep and extend with recent items / fuzzy search.

### 6.6 Status Components

Every status = color + icon + text label, no exceptions (already true for `Badge` usage in `Dashboard`/`AiPlatform` — keep this pattern, just migrate the color source to semantic tokens per §1.3).

Required statuses: Success, Warning, Error, Info, Pending — `Badge` component already supports all five tones; extend `toneClasses` to reference semantic tokens.

### 6.7 Feedback Components (new — closes UI-DESIGN-AUDIT §3.2)

| Component | Current state | Target |
|---|---|---|
| Toast | Missing | Transient, corner-anchored, auto-dismiss, 4 tones (success/warning/error/info) |
| Alert | Missing | Inline, persistent, dismissible, same 4 tones |
| Modal | Exists (`Modal.tsx`) | Keep, verify focus-trap + Escape-to-close |
| Drawer | Missing | Side-anchored panel for record quick-view/edit without full navigation |
| Confirmation Dialog | Missing | Required before every destructive action (cancel PO, deactivate supplier, delete contact) |
| Empty State | Ad hoc (`DataTable`'s inline fallback) | Standardized component: icon + message + optional CTA, reused everywhere data can be empty |
| Skeleton Loader | Partial (`DataTable` shimmer only) | Extend to Card, StatCard, Detail-page skeletons matching final layout shape |
| Progress Indicator | Exists (`Progress.tsx`) | Keep, extend with indeterminate variant for unknown-duration AI tasks |

### 6.8 KPI Components

Value + Label + Trend + Comparison + Icon + Time Period — current `StatCard` has Value/Label/Icon/Trend; **Comparison** (vs. prior period, e.g., "vs. last quarter") and **Time Period** (explicit label, e.g., "Last 30 days") are missing and required per `Components.md`.

### 6.9 AI Components (new — closes UI-DESIGN-AUDIT §3.3, highest-priority gap)

This is the category with the largest gap between brand promise ("AI-native Enterprise Procurement Ecosystem" — Brand Story) and current implementation (a static list of model cards).

| Component | Purpose |
|---|---|
| AI Chat | Conversational interface for the AI Assistant module (Figma page 12) |
| Prompt Input | Multi-line input with attach/context controls, consistent across Chat and inline AI actions |
| AI Suggestions | Inline, dismissible suggestion cards surfaced contextually (e.g., on a Supplier record, "3 similar suppliers found") |
| AI Actions | Discrete, named actions the AI can take on a record (with explicit confirm step — ties to §6.7 Confirmation Dialog) |
| AI Recommendations | Ranked list pattern, reused across Supplier matching, RFQ routing |
| Knowledge Results | Search-result-style card for the Enterprise Knowledge Base / document intelligence |
| Workflow Timeline | Vertical stepped timeline showing an AI task's stages (queued → running → completed), extending the existing `AiTask` status pattern already in `Dashboard`/`AiPlatform` into a visual timeline rather than a flat list |

Visual treatment: Copper accent + `shadow-glow-copper` reserved specifically for active/highlighted AI elements, reinforcing "AI-native" as the one place Copper concentrates beyond CTAs (ties back to §1.4's 10% rule — AI surfaces are one of the few areas where slightly higher Copper density is intentional and on-brand).

### 6.10 Charts (new — closes UI-DESIGN-AUDIT §3.3/§6, no library currently installed)

No chart library exists in `package.json` today. Recommend a lightweight, tree-shakeable library (final selection is an implementation-phase decision, not a Phase 1 commitment) that supports:

- **Line/Area** — pipeline value over time, PO volume trends (Reports, Finance pages)
- **Bar** — comparative values (deals by stage, POs by supplier)
- **Donut/Pie** — compositional breakdowns (supplier status distribution) — used sparingly, enterprise dashboards generally favor bar/line for precision
- **Sparkline** — compact inline trend indicator for KPI cards (extends §6.8's missing "Comparison" need)

Chart color rule: series colors draw from a defined categorical palette derived from Navy/Copper/semantic tokens — never arbitrary chart-library defaults. Axes, gridlines, and labels use neutral `surface-*` tokens at low opacity so data, not chrome, carries visual weight (per Typography.md: "must support information, not compete with it").

---

## 7. Navigation & Layout Grid

- **Sidebar width:** 240px expanded (current), 64px collapsed (new).
- **Content max-width:** introduce a `max-w-[1600px]` container on ultra-wide displays (closes UI-DESIGN-AUDIT §6.2) — content centers with neutral-background gutters beyond that width rather than stretching indefinitely.
- **Breakpoints:** `sm` 640px, `md` 768px (new tablet-aware breakpoint, closes UI-DESIGN-AUDIT §6.1), `lg` 1024px (current sidebar/mobile-nav switch point, keep), `xl` 1280px, `2xl` 1536px, and a proposed `3xl` 1920px for ultra-wide container behavior.
- **Tablet-specific rule:** between `md` and `lg`, use collapsed (icon-only) sidebar rather than falling through to the mobile hamburger+drawer pattern — recovers usable width without sacrificing persistent navigation.

---

## 8. RTL & Internationalization

Ties directly to UI-DESIGN-AUDIT §5. Two independent tracks, sequenced separately:

**Track A — Technical RTL readiness:**
- Replace all physical-direction utilities (`ml-`, `pl-`, `left-`, `text-right`, etc.) with logical-property equivalents (`ms-`, `ps-`, `start-`, `text-start`) across every component in `src/components/`.
- Add a language switcher to `Header.tsx`/`SiteHeader.tsx` that toggles `<html dir lang>` and a persisted locale preference.
- Self-host Vazirmatn (closes UI-DESIGN-AUDIT §4.3) instead of the current CDN `@import`.
- Locale-aware number/currency/date formatting in `src/lib/format.ts` (Eastern Arabic numerals + Jalali calendar support for `fa` locale).

**Track B — Persian content:**
- Translate approved English source strings (per `CONTENT-SOURCE-MAP.md`) using the existing Persian catalogue (S9) as the verified source — no new Persian copy invented outside approved sources.
- Scope is content-team/translation work, not a design-system deliverable; this document only guarantees the UI can *render* correct RTL Persian once content exists.

---

## 9. Accessibility

- All color combinations meet WCAG AA (§1.4).
- Status = color + icon + label, always (§0, §6.6).
- All interactive elements have visible focus states (`.focus-ring` utility already exists — extend its use to every custom interactive element, not just `Button`).
- Icon-only controls require `aria-label`.
- Modals/Drawers/Command Palette must trap focus and support Escape-to-close.

---

## 10. What This Document Does Not Do

Per the Sprint 1 gate and this task's explicit scope: this document defines visual/component standards only. It does not change architecture, domain model, entity model, or API contracts; does not add AI automation or ERP integration; and does not itself constitute implementation approval. Component code changes wait for sign-off on this document and the accompanying Figma plan (`docs/delivery/FIGMA-DESIGN-PLAN.md`).
