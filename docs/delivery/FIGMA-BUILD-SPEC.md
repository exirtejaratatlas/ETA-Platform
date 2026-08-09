# Figma Build Specification — Pages 01–03

document_id: ETA-FIGMA-BUILD-001
status: Superseded — not used as authority; retained for historical record only
date: 2026-08-04
phase: Phase 2 (Pages 01–03 only, per `FIGMA-DESIGN-PLAN.md` sequencing — Page 03 must be complete and approved before any product screen, Page 04 onward, begins)
source of truth: `docs/delivery/ETA-DESIGN-SYSTEM.md` (all values below are transcribed from it, not invented — if anything here appears to diverge, the design-system doc wins and this spec must be corrected)
logo assets (use as-is, do not recreate/recolor): `public/Logo.svg` (full lockup, 667.2×282.08 viewBox, teal/orange gradient wordmark), `public/mark.svg` (symbol only), `public/type.svg` (wordmark only)

---

> **SUPERSEDED NOTICE (added 2026-08-09, per `REPOSITORY-HYGIENE-AUDIT.md`):** This spec's
> source of truth, `ETA-DESIGN-SYSTEM.md`, was never approved and was explicitly not used as
> authority for any subsequent decision (see that file's own superseded notice and
> `SESSION-HANDOFF-UI-FOUNDATION.md`, 2026-08-07). No Figma file was ever built from this spec.
> Kept for historical record only — do not treat it as current or pending guidance. Content
> below is unchanged from its original 2026-08-04 draft. Note also: the logo description here
> ("teal/orange gradient wordmark") does not match the logo actually in use — see
> `WEBSITE-ARCHITECTURE-CONFLICT-REPORT.md` D1 for how that color-authority question was
> resolved (Navy/Copper governs the digital layer; the logo/brand-mark layer is separate).

---

## How to use this document

This is a construction spec, not a design proposal — every value is pulled directly from `ETA-DESIGN-SYSTEM.md`. It exists because this environment has no live Figma connection; a human (or a future session with Figma access) builds the actual `.fig` file from these instructions. Follow the sections in order — Figma Variables and Styles (this doc's §1) must exist before Page 02 is laid out, and Page 02 must exist before Page 03's components are built, since every component instances the styles rather than hardcoding values.

No React code is referenced or modified by this spec. No implementation tasks are implied — this describes Figma artifacts only.

---

## 1. Figma Variables & Styles (build first, referenced by Pages 01–03)

### 1.1 Variable Collection: `Color`

One collection, one mode (**Light** only — `ETA-DESIGN-SYSTEM.md` §0/Audit §1.4 note dark mode is unimplemented dead config in the codebase and explicitly out of scope for this redesign; do not create a Dark mode in Figma until that's a ratified decision).

| Variable name | Type | Value | Design-system source |
|---|---|---|---|
| `color/navy` | Color | `#0F172A` | §1.1 Primary — Navy |
| `color/copper/500` | Color | `#C57B39` | §1.1 Primary — Copper |
| `color/copper/50` | Color | `#FDF6EF` | existing Tailwind `copper.50` |
| `color/copper/100` | Color | `#FAEBD9` | existing Tailwind `copper.100` |
| `color/copper/200` | Color | `#F3D3AE` | existing Tailwind `copper.200` |
| `color/copper/300` | Color | `#E9B378` | existing Tailwind `copper.300` |
| `color/copper/400` | Color | `#DC9855` | existing Tailwind `copper.400` |
| `color/copper/600` | Color | `#A8632C` | existing Tailwind `copper.600` |
| `color/copper/700` | Color | `#874F25` | existing Tailwind `copper.700` |
| `color/copper/800` | Color | `#6D4122` | existing Tailwind `copper.800` |
| `color/copper/900` | Color | `#5A371F` | existing Tailwind `copper.900` |
| `color/copper/950` | Color | `#301B0F` | existing Tailwind `copper.950` |
| `color/white` | Color | `#FFFFFF` | §1.1 |
| `color/neutral/graphite` | Color | `#1E293B` | §1.2 |
| `color/neutral/slate` | Color | `#475569` | §1.2 |
| `color/neutral/steel-gray` | Color | `#64748B` | §1.2 |
| `color/neutral/light-steel` | Color | `#CBD5E1` | §1.2 |
| `color/neutral/soft-gray` | Color | `#E2E8F0` | §1.2 |
| `color/neutral/background` | Color | `#F8FAFC` | §1.2 |
| `color/surface/0` | Color | `#FFFFFF` | existing `surface` scale |
| `color/surface/50` | Color | `#F8FAFC` | " |
| `color/surface/100` | Color | `#F1F5F9` | " |
| `color/surface/200` | Color | `#E2E8F0` | " |
| `color/surface/300` | Color | `#CBD5E1` | " |
| `color/surface/400` | Color | `#94A3B8` | " |
| `color/surface/500` | Color | `#64748B` | " |
| `color/surface/600` | Color | `#475569` | " |
| `color/surface/700` | Color | `#334155` | " |
| `color/surface/800` | Color | `#1E293B` | " |
| `color/surface/900` | Color | `#0F172A` | " |
| `color/surface/950` | Color | `#020617` | " |
| `color/success/default` | Color | `#16A34A` | §1.3 |
| `color/success/light` | Color | `#22C55E` | existing Tailwind config |
| `color/success/dark` | Color | `#15803D` | " |
| `color/success/50` (new — required by §1.3 enforcement rule) | Color | `#F0FDF4` | derive from Tailwind `green-50` equivalent, ratify in Figma review |
| `color/success/100` (new) | Color | `#DCFCE7` | derive, ratify |
| `color/success/700` (new) | Color | `#15803D` | matches `dark` |
| `color/warning/default` | Color | `#F59E0B` | §1.3 |
| `color/warning/light` | Color | `#FBBF24` | existing Tailwind config |
| `color/warning/dark` | Color | `#D97706` | " |
| `color/warning/50` (new) | Color | `#FFFBEB` | derive, ratify |
| `color/warning/100` (new) | Color | `#FEF3C7` | derive, ratify |
| `color/warning/700` (new) | Color | `#B45309` | derive, ratify |
| `color/error/default` | Color | `#DC2626` | §1.3 |
| `color/error/light` | Color | `#EF4444` | existing Tailwind config |
| `color/error/dark` | Color | `#B91C1C` | " |
| `color/error/50` (new) | Color | `#FEF2F2` | derive, ratify |
| `color/error/100` (new) | Color | `#FEE2E2` | derive, ratify |
| `color/error/700` (new) | Color | `#B91C1C` | matches `dark` |
| `color/info/default` | Color | `#2563EB` | §1.3 |
| `color/info/light` | Color | `#3B82F6` | existing Tailwind config |
| `color/info/dark` | Color | `#1D4ED8` | " |
| `color/info/50` (new) | Color | `#EFF6FF` | derive, ratify |
| `color/info/100` (new) | Color | `#DBEAFE` | derive, ratify |
| `color/info/700` (new) | Color | `#1D4ED8` | matches `dark` |

**Flag for the reviewer:** the rows marked "(new)" don't exist yet in `tailwind.config.js` — `ETA-DESIGN-SYSTEM.md` §1.3 calls out that the semantic families need `50`/`100`/`700` steps added to support the light-background/dark-text badge pattern already in use. Build these into Figma now (values above are a reasonable derivation, consistent with how `copper` and `surface` are structured), but treat them as provisional until the Tailwind config is actually updated in a later implementation phase — flag this explicitly on the Page 02 Colors frame so no reviewer mistakes a Figma-only value for an already-shipped token.

### 1.2 Variable Collection: `Spacing`

| Variable name | Value | Source |
|---|---|---|
| `spacing/1` | 4 | §3 |
| `spacing/2` | 8 | §3 |
| `spacing/3` | 12 | §3 |
| `spacing/4` | 16 | §3 |
| `spacing/5` | 20 | §3 |
| `spacing/6` | 24 | §3 |
| `spacing/8` | 32 | §3 |
| `spacing/12` | 48 | §3 |
| `spacing/16` | 64 | §3 |

### 1.3 Variable Collection: `Radius`

| Variable name | Value | Source |
|---|---|---|
| `radius/md` | 8 | §4 |
| `radius/lg` | 14 | §4 |
| `radius/xl` | 20 | §4 |
| `radius/2xl` | 24 | §4 |

### 1.4 Text Styles (Figma Text Styles, not Variables — typography is applied as styles per Figma convention)

Font families: **Inter** (Latin), **Vazirmatn** (Persian, install both in the Figma team library fonts), **JetBrains Mono** (technical values). Per §2.1, no more than 2 families on one screen — Text Styles below default to Inter; a parallel Vazirmatn set is only used on Page 02's typography-comparison frame and any future Persian-content page.

| Style name | Size | Line height | Letter spacing | Weight | Source |
|---|---|---|---|---|---|
| `Display` | 56px (mid of 48–64 range; note both extremes on the frame) | 120% | -1% | 700 Bold | §2.2 |
| `Heading/H1` | 40px | 120% | -1% | 600–700 (build as 700, note 600 as alt) | §2.2 |
| `Heading/H2` | 32px | 120% | -1% | 600 | §2.2 |
| `Heading/H3` | 24px | 120% | -1% | 600 | §2.2 |
| `Heading/H4` | 20px | 120% | -1% | 600 | §2.2 |
| `Body/Large` | 18px | 150% | 0% | 500 | §2.2 |
| `Body/Default` | 16px | 150% | 0% | 400 | §2.2 |
| `Body/Small` | 14px | 150% | 0% | 400–500 (build as 400, note 500 as alt for emphasis) | §2.2 |
| `Caption` | 12px | 140% | +1% | 500 | §2.2 |
| `Mono/Technical` | 14px (matches Body/Small size; JetBrains Mono family) | 150% | 0% | 400 | §2.3 — IDs, PO numbers, technical values |

### 1.5 Effect Styles (shadows)

| Style name | Value | Usage rule | Source |
|---|---|---|---|
| `Shadow/Soft` | `0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)` | Rest state, all cards/static containers | §4 |
| `Shadow/Card` | `0 2px 8px -2px rgba(0,0,0,0.06), 0 4px 16px -4px rgba(0,0,0,0.08)` | Hover state, interactive cards only | §4 |
| `Shadow/Elevated` | `0 4px 16px -2px rgba(0,0,0,0.08), 0 8px 32px -4px rgba(0,0,0,0.12)` | Overlays: modals, drawers, command palette, dropdowns | §4 |
| `Shadow/Glow-Copper` | `0 0 0 1px rgba(197,123,57,0.1), 0 4px 24px -4px rgba(197,123,57,0.25)` | Copper-accented premium/AI elements ONLY — never a default hover | §4, §6.9 |

### 1.6 Grid Styles

| Style name | Columns | Margin | Gutter | Breakpoint | Source |
|---|---|---|---|---|---|
| `Grid/Mobile` | 4 | 16 | 16 | up to 640 (`sm`) | §7 |
| `Grid/Tablet` | 8 | 24 | 20 | 641–1023 (`md`) | §7 |
| `Grid/Desktop` | 12 | 32 | 24 | 1024–1535 (`lg`/`xl`) | §7 |
| `Grid/Wide` | 12, max-width 1600 container | 40 | 24 | ≥1536 (`2xl`/`3xl`) | §7 |

---

## 2. Page 01 — Cover (frame-by-frame)

**Frame: `01 Cover / Main`** — 1920×1080 (desktop reference size, not a responsive frame).

- **Background:** `color/navy` full-bleed (this is the one frame in the file allowed to be Navy-dominant at near-100%, establishing brand authority before any UI chrome appears).
- **Logo lockup, centered upper-third:** place `public/Logo.svg` at ~480px width (scales proportionally, 667.2:282.08 aspect ratio preserved — do not stretch). Add a second, smaller instance of `public/mark.svg` alone in the frame corner (e.g., 32px, bottom-right) to additionally prove the symbol-only mark reads correctly at small scale, directly on Navy.
- **Title block, centered, below logo:** "ETA Platform — Design System & Component Library" in `Heading/H1`, `color/white`. Subtitle: "Enterprise Procurement Platform Redesign — Phase 2" in `Body/Large`, `color/copper/300` (light copper reads on Navy at sufficient contrast — verify AA before finalizing per §1.4's contrast rule).
- **Metadata row** (Caption style, `color/surface/400`): Version, Date, Status (build as a small `Status` badge component once Page 03 exists — for now, a plain Caption-styled label reading "Status: Draft — In Review").
- **Scope statement block:** two short columns, `Body/Small`, `color/surface/300` on Navy —
  - **In scope:** "Colors, typography, spacing, components — Pages 01–03 only, per `FIGMA-DESIGN-PLAN.md`."
  - **Out of scope:** "Architecture, entity model, ERP integration, AI automation, production screens (Pages 04+, pending separate review)." — this directly mirrors the Sprint 1 gate language so a reviewer never mistakes this file for an implementation proposal.
- **Table of Contents, lower half:** 14-row list (one per Figma page, matching `FIGMA-DESIGN-PLAN.md` exactly): row = page number (`Mono/Technical` style, `color/copper/400`) + page name (`Body/Default`, `color/white`) + one-line scope note (`Caption`, `color/surface/400`). Rows for Pages 04–14 should visually indicate "Pending Phase 1 approval — not yet started" (e.g., 40% opacity) since only 01–03 exist at this stage.

**Do not** add photography/illustration to this frame yet — per `ETA-DESIGN-SYSTEM.md` §0 and the Imagery authority doc, any photography must be "authentic, industrial, premium" sourced imagery, not a placeholder; leave this frame typographic/logo-only until real imagery is sourced in a later phase.

---

## 3. Page 02 — Design System (frame-by-frame)

Seven frames, left to right on the canvas, each 1920px wide (scroll-length height as needed). Every swatch/sample on this page must be built as a **live instance of the Variable/Style**, not a manually color-picked rectangle — this page is the proof that the Variables in §1 exist and are correctly named, not just a picture of them.

### Frame `02 Design System / 01 Colors`

- **Primary section:** two large swatches (Navy, Copper/500) at 320×200px each, with overlaid label: token name (`Mono/Technical`), hex (`Mono/Technical`), usage description (`Caption`) pulled verbatim from §1.1's table.
- **70/20/10 proportion diagram:** a single horizontal bar, 1600px wide, segmented 70% `color/navy`-tinted-neutral / 20% `color/surface/200` / 10% `color/copper/500`, labeled above each segment with the percentage and role ("Primary dominance," "Neutral," "Accent — CTAs, highlights, premium elements only"). This is the literal visualization called for in `FIGMA-DESIGN-PLAN.md` Page 02 spec — make it impossible to misread the accent color as anything but a minority proportion.
- **Neutral ramp row:** 6 swatches (Graphite → Background) at 160×120px, labeled name + hex, per §1.2.
- **Semantic row:** 4 groups (Success/Warning/Error/Info), each showing `default`/`light`/`dark`/`50`/`100`/`700` as a small swatch strip — visually flag the "(new)" provisional tokens from §1.1 with a small dotted border or "provisional" tag so this frame doubles as the review artifact for that open question.
- **Accessibility note block** (`Body/Small`): transcribe §1.4's AA contrast rule and the specific `copper-500`-on-white caution verbatim — this frame is also where a reviewer checks that rule before any component uses copper text.

### Frame `02 Design System / 02 Typography`

- **Full scale, actual size, top to bottom:** Display, H1, H2, H3, H4, Body Large, Body, Body Small, Caption — each row shows the style applied to real sample text ("Enterprise Procurement, Engineered."), with an adjacent annotation strip (`Mono/Technical`, small) listing size/line-height/letter-spacing/weight exactly as tabulated in §2.2.
- **Inter/Vazirmatn parity row:** the same sample sentence set in both typefaces side by side at Body size, to visually verify weight/x-height parity (§2.1's two-typeface rule) — flag if Vazirmatn needs its own size adjustment to read as visually equivalent (a common issue with Latin/Arabic-script pairing) rather than assuming 1:1 size parity is correct without checking.
- **JetBrains Mono sample:** one row showing a fabricated example PO number / ID string (e.g., `PO-2026-000482`) in `Mono/Technical`, directly next to the same string in `Body/Small` (Inter) — makes the §2.3 usage rule (IDs/technical values use Mono) visually self-evident.
- **Weight reference strip:** Regular/Medium/SemiBold/Bold shown on one word ("Atlas") for quick visual weight comparison, per §2.4.

### Frame `02 Design System / 03 Spacing`

- **Visual ruler:** horizontal stacked bars at each `spacing/*` value (4 → 64px), each labeled with token name + px value, `color/copper/200` fill on `color/surface/50` background — a literal ruler a designer can eyeball-reference while laying out Page 03 components.
- **Density note:** short callout block (`Body/Small`) transcribing §3's Comfortable/Compact density-mode rule, flagged as "applies to DataTable and Card components — build both density variants in Page 03."

### Frame `02 Design System / 04 Elevation & Radius`

- **Radius row:** 4 identical 120×120 squares at `radius/md`/`lg`/`xl`/`2xl`, labeled px + intended usage (Buttons/inputs; Icon containers; Standard cards; Hero containers only) per §4's table.
- **Shadow row:** 4 identical white cards (200×140px) on `color/surface/50` background, each with one Effect Style applied (`Shadow/Soft`, `/Card`, `/Elevated`, `/Glow-Copper`), labeled with the usage rule from §1.5's table verbatim — especially flag `Glow-Copper`'s "never a default hover" restriction directly on the swatch, since this is the rule most likely to be violated by a future contributor copying the wrong shadow.

### Frame `02 Design System / 05 Iconography`

- **Size grid:** one representative Lucide icon (e.g., `Package`, matching the platform's Suppliers nav icon) rendered at all 5 approved sizes (16/20/24/32/48px) in a row, per §5.
- **Color-mapping table, rendered as live swatches:** 4 rows (Default/Primary/Highlight/Semantic), each showing the same icon recolored per §5's table (Graphite/Navy/Copper/semantic-token), with the token name labeled — this is the frame that prevents the audit's §2.5 finding (icons defaulting to the wrong gray) from recurring.
- **Interaction states row:** one icon shown across Default/Hover/Active/Disabled/Selected, opacity/color-only changes annotated, no animation — per §5's state rule.
- **Library note:** `Body/Small` callout: "Primary: Lucide. Secondary/fallback: Phosphor Icons, only if Lucide lacks a needed icon. Custom icons must match: outline, 2px stroke, round cap/join, 24×24 base grid."

### Frame `02 Design System / 06 Logo Usage`

Built entirely from the three existing asset files — **do not** recolor, re-export, or redraw any part of the logo.

- **Primary lockup:** `public/Logo.svg` on white background, with minimum clear-space guide (use the mark's own internal proportions — e.g., clear space = height of the "b" symbol element within the lockup — as the spacing unit on all four sides) and a minimum-size annotation (below a stated px width, switch to `mark.svg` alone rather than shrinking the full lockup illegibly).
- **On-Navy variant:** `public/Logo.svg` placed on a `color/navy` swatch — confirm current asset (it has its own internal dark/gradient fills, not a flat recolor) reads correctly at this contrast; if it doesn't read cleanly on Navy, flag this as an open question for the brand owner rather than creating a new recolored variant unilaterally (recoloring the logo is explicitly forbidden by governance).
- **Symbol-only usage:** `public/mark.svg` shown at favicon/avatar scale (32px, 16px) — this is the asset that should be wired into `index.html`'s favicon and compact nav contexts per the original `MVP-VISUAL-AUDIT.md` §1.5 recommendation (a Figma reference only; the actual favicon wiring is a code change, out of scope here).
- **"Never" row — explicit incorrect-usage examples, each crossed out with a red diagonal bar:** recolored logo, stretched/distorted logo, logo with a drop shadow added, logo placed on a low-contrast background, logo redrawn/simplified. Label each: "Never — do not create alternative logos" (verbatim governance language from `CLAUDE.md`).

### Frame `02 Design System / 07 Grid & Breakpoints`

- **Breakpoint diagram:** 6 stacked horizontal bars representing `sm`(640)/`md`(768)/`lg`(1024)/`xl`(1280)/`2xl`(1536)/`3xl`(1920), each bar's width proportional to its px value, labeled with the token name and the layout behavior that changes at that point (per §7 — e.g., "`lg` 1024px — Sidebar/Header replace MobileNav hamburger+drawer"; "`md` 768px — new tablet rule: collapsed icon-only sidebar instead of falling through to mobile pattern").
- **Container max-width note:** callout showing the `max-w-[1600px]` ultra-wide container rule from §7, with a simple before/after diagram (content stretching full-bleed vs. centered with neutral gutters) so the rule is unambiguous to whoever builds Page 04+'s ultra-wide frames later.

---

## 4. Page 03 — Components (frame-by-frame)

Build every item below as a true Figma **component** (or component set with variant properties), never a detached one-off frame — Pages 04+ will instance from here exclusively. Organize as rows/sections in the order below, matching `ETA-DESIGN-SYSTEM.md` §6.

### 4.1 Buttons

**Component set `Button`**, variant properties: `Variant` (Primary / Accent / Secondary / Outline / Ghost / Danger / Success), `Size` (sm / md / lg / icon), `State` (Default / Hover / Focus / Active / Disabled / Loading).

- 7 variants × 4 sizes × 6 states = 168 combinations — build via Figma's variant grid (not 168 hand-drawn frames); use auto-layout so `Size` changes padding/height consistently (sm: 32px height / 12px horizontal padding; md: 36px / 16px; lg: 44px / 24px; icon: 36×36px, no label).
- **Primary = Navy fill, white text** (redesign correction from current Copper-default — §1.4/§6.1). **Accent = Copper fill, white text**, used only where the design-system explicitly calls for it. Secondary = `surface/100` fill, `surface/700` text. Outline = transparent fill, `surface/300` border, `surface/700` text. Ghost = transparent, `surface/600` text, `surface/100` on hover. Danger = `color/error/default` fill, white text. **Success (new variant, does not exist in current code)** = `color/success/default` fill, white text.
- `Loading` state (new — no current implementation): replace label with a spinner glyph, same footprint as `Default`, `Disabled` opacity (~50%) but not click-disabled styling — visually distinct from `Disabled`.
- `Focus` state: 2px `color/copper/500` ring at 40% opacity + 2px offset, matching the existing `.focus-ring` utility behavior — apply consistently across every variant, not just Primary.

### 4.2 Cards

**Component `Card/Standard`** — auto-layout, `radius/2xl` (24px — note: §4 lists `radius-xl`=20px as "Standard cards, modals"; reconcile against Blueprint's 16px card guidance from `Components.md` before finalizing — flag as an open rounding question between the two source docs rather than silently picking one), `Shadow/Soft` at rest, `Shadow/Card` on a `Hover` boolean variant, `spacing/6` (24px) internal padding — `Density` variant property (Comfortable / Compact, per §3) swaps padding to `spacing/5` (20px) in Compact.

**Component `Card/KPI`** (StatCard redesign) — slots: Icon container (40×40, `radius/lg`, tinted background per tone), Value (`Heading/H2` or `/H3` depending on a `Size` variant), Label (`Body/Small`), **Trend** (Caption + directional icon, color from semantic token — never color alone), **Comparison** (new slot, e.g., "vs. last 30 days," `Caption`, `surface/400`), **Time Period** (new slot, same style) — the last two close §6.8's gap versus current `StatCard.tsx`.

### 4.3 Tables

**Component `Table/Header`** — `Caption` style, +1% tracking, uppercase, `surface/500`, with a `Sortable` boolean variant that adds a directional chevron.
**Component `Table/Row`** — `Default` / `Hover` / `Selected` states; `Selected` includes a leading checkbox (per §6.3 row-selection requirement) and a subtle `copper/50` background tint.
**Component `Table/Pagination`** — page-size select + prev/next + page indicator, per §6.3.
**Component `Table/BulkActionBar`** — contextual bar, appears as an overlay/replacement for the table header when ≥1 row selected, showing selection count + action buttons (instances of `Button/Secondary` and `Button/Danger`).
**Component `Table/EmptyState`** — icon + message + optional CTA button instance, per §6.7.
**Component `Table/Skeleton`** — shimmer placeholder rows matching final row height, per §6.7.
**Component `Table/ResponsiveCard`** — the mobile/`md`-breakpoint fallback: a `Card/Standard` instance styled as one table row's data stacked vertically (label/value pairs), per §6.3's responsive requirement — build this now even though it's not exercised until Page 13 (Mobile), since it's a Page-03-owned component.

### 4.4 Forms

One component per control (`Input/Text`, `Input/Search`, `Select`, `Select/Multi`, `DatePicker`, `Upload`, `Checkbox`, `Radio`, `Toggle`, `TextArea`), each with a `State` variant property: Neutral / Focus / Error / Success / Disabled — Error and Success states include a colored border (`error/default` / `success/default`), a leading/trailing status icon, and an inline message slot (`Caption`, colored to match). A shared `HelperText` slot (`Caption`, `surface/500`) is always available regardless of state, per §6.4.

### 4.5 Navigation

- **`Nav/Sidebar`** — `Expanded` (240px) / `Collapsed` (64px, icon-only) variant, per §7's new tablet rule.
- **`Nav/Header`** — includes the existing command-palette trigger; note in the component description that mobile-width crowding (audit §6.4) should be checked when this is placed in a `Grid/Mobile` frame later.
- **`Nav/Breadcrumb`** (new) — chevron-separated `Body/Small` links, current page in `surface/900`, ancestors in `surface/500`.
- **`Nav/Tabs`** (new) — underline-style, active tab in `copper/500` underline + `surface/900` text, inactive in `surface/500`.
- **`Nav/ContextMenu`** (new) — small elevated popover (`Shadow/Elevated`), list of `Body/Small` actions, optional icon per row.
- **`Nav/CommandPalette`** — matches existing `⌘K` behavior; build as a component now so Page 04+ can instance it rather than redrawing.

### 4.6 Status

**Component `Badge`** — `Tone` variant (Success/Warning/Error/Info/Copper/Neutral — 6 total, matching current `Badge.tsx`'s tone union plus Copper), each combining a tinted background (`{tone}/50` or `{tone}/100`), text (`{tone}/700` or `{tone}/default`), and a `Dot` boolean variant. Every non-Neutral tone's usage note must state "always pair with icon + label in actual usage" per §0/§6.6 — the Badge component itself is color+text; the surrounding usage (e.g., in a table cell) is responsible for adding the icon.

### 4.7 Feedback

`Toast` (4 tones, corner-anchored, auto-layout with icon + message + dismiss), `Alert` (4 tones, inline/persistent, dismissible), `Modal` (header/body/footer slots, `Shadow/Elevated`), `Drawer` (new — side-anchored, same elevation), `ConfirmationDialog` (new — title/body/Cancel+Danger-button footer, explicitly required before destructive actions per §6.7), `EmptyState` (icon/message/CTA, reusable beyond tables), `Skeleton` (Card/StatCard/Table/Detail-page shape variants), `ProgressIndicator` (`Determinate` / `Indeterminate` variant, extending existing `Progress.tsx` behavior).

### 4.8 AI Components

Per §6.9 — the highest-priority new category. Build: `AI/ChatBubble` (user/assistant variant), `AI/PromptInput` (multi-line, attach-control slot), `AI/SuggestionCard` (dismissible, `Shadow/Glow-Copper` on the card edge), `AI/ActionCard` (named action + confirm-step affordance, links conceptually to `ConfirmationDialog`), `AI/RecommendationListItem`, `AI/KnowledgeResultCard`, `AI/WorkflowTimelineStep` (Queued/Running/Completed/Failed state variant, vertical-timeline-ready with connector line). Apply `Shadow/Glow-Copper` and slightly higher Copper density here specifically, per §6.9's explicit exception to the 10%-accent rule.

### 4.9 Charts

Build as component frames (not literal charting logic — Figma has no live-data binding) with representative sample data: `Chart/Line`, `Chart/Area`, `Chart/Bar`, `Chart/Donut`, `Chart/Sparkline` — each with a defined categorical color sequence (start from `copper/500`, `info/default`, `success/default`, `surface/400`, `warning/default`, in that priority order, per §6.10's "never arbitrary chart-library defaults" rule), gridlines/axis labels at low-opacity `surface/300`, and both a compact "mark only" mobile form and full-axes desktop form per the design-system's requirement.

---

## 5. Review Checklist Before Requesting Sign-off

- [ ] Every color used anywhere on Pages 01–03 resolves to a `color/*` Variable — zero raw hex fills.
- [ ] Every text layer uses a named Text Style from §1.4 — zero manually-sized text.
- [ ] Every card/overlay shadow uses a named Effect Style from §1.5 — zero manual shadow values.
- [ ] Logo appears only via the three existing asset files, unmodified — zero recolored/redrawn/distorted instances.
- [ ] The provisional semantic-color steps (§1.1 "(new)" rows) are visibly flagged as provisional on the Colors frame.
- [ ] The Card corner-radius discrepancy between this doc's §4 (20px) and `Components.md`'s stated 12–16px is flagged as an open question on the Cards component, not silently resolved.
- [ ] Every component in Page 03 is a true Figma component/component set — nothing is a detached, un-instanceable frame.

---

## Next Step

Per the task instruction, **stop here and request review.** Page 04 (Dashboard) and all subsequent product screens do not begin until Pages 01–03 (as built from this spec) are reviewed and approved — consistent with `FIGMA-DESIGN-PLAN.md`'s sequencing rule that Page 03 must be complete before any product screen begins.
