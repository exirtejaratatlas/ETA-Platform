# UI/UX Design Audit — ETA Platform

document_id: ETA-UI-AUDIT-001
status: Draft — for review
scope: Visual/UX audit only. No React files were modified while producing this report.
date: 2026-08-04
compared_against: `ETA-Blueprint/20-BRANDING/04-Visual-Identity/*` (Colors, Typography, Icons, Components, Imagery — all status Approved)
role: ETA Product Design Lead — Phase 1 (Redesign Plan)

---

## Method

Read `ETA-Platform/CLAUDE.md`, the prior `docs/delivery/MVP-VISUAL-AUDIT.md` and `CONTENT-SOURCE-MAP.md`, then the five ETA-Blueprint Visual Identity documents (`Colors.md` / `ETA-VISUAL-001`, `Typography.md` / `ETA-VISUAL-002`, `Icons.md` / `ETA-VISUAL-003`, `Imagery.md` / `ETA-VISUAL-004`, `Components.md` / `ETA-VISUAL-005`) and `Company-Profile.md` / `Brand-Story.md` / `Brand-Voice.md`. Compared those against the actual running code: `tailwind.config.js`, `src/index.css`, `index.html`, `src/components/ui/*`, `src/components/layout/*`, `src/pages/Dashboard.tsx`, `src/pages/AiPlatform.tsx`, `public/Logo.svg`, and `package.json`.

**Baseline note:** the prior `MVP-VISUAL-AUDIT.md` (2026-08-03) found the real logo unreferenced and the internal app shell running on a different color system than the public site. Both of those Critical/High findings from that audit **have since been fixed** — `Sidebar.tsx`, `Header.tsx`, `MobileNav.tsx`, and `index.html` now all load `/Logo.svg` (the correct teal/orange Atlas wordmark), and `tailwind.config.js` now defines a single `surface`/`copper`/semantic token set used consistently across Dashboard, Card, Button, Badge, and StatCard. This audit does not re-list those resolved items; it starts from the current, corrected baseline and finds the next layer of problems — the ones that block calling this a **premium enterprise procurement platform** rather than a functional MVP.

---

## Executive Summary

The MVP is functionally complete and brand-consistent at the token level (Navy/Copper is used correctly and uniformly). What is missing is everything that separates "correct colors" from "premium enterprise product": a documented, enforced design system; a real typographic scale; genuine data visualization; RTL that actually works; and component variants for the states an enterprise procurement tool needs (empty, loading, error, dense-data, multi-currency, long Persian company names). Five problems matter most:

1. **No design system exists as a document** — token values live only inside `tailwind.config.js` and are applied ad hoc per component, so nothing prevents the next screen from drifting (see §2).
2. **Typography has no enforced scale.** ETA-Blueprint's approved `Typography.md` defines eight sizes (Display 48–64px down to Caption 12px) with specific line-height/letter-spacing rules; the codebase uses none of it — headings are arbitrary Tailwind sizes chosen per screen (§4).
3. **RTL is inert scaffolding, not a feature.** `dir="ltr"` is hardcoded, no language switcher exists, and components are built with physical-direction utilities (`ml-`, `pl-`, `left-`, `text-right`) that will not mirror under `dir="rtl"` even if it were enabled (§5).
4. **There is no charting capability.** `package.json` has no chart library; "Sales Pipeline" on the Dashboard is a list of custom progress bars, not a chart. The design system deliverable (Charts) and Blueprint's KPI/Analytics component requirements (`Components.md`) have nothing to implement against yet (§3, §6).
5. **Components are functional but not enterprise-grade.** No sortable/filterable/paginated tables, no toast/alert/drawer system, no AI-specific components (chat, suggestions, workflow timeline) despite `Components.md` explicitly requiring them, and semantic states (success/warning/error/info) are implemented with raw Tailwind palette classes (`bg-green-50`, `bg-blue-50`, `bg-amber-50`, `bg-red-50`) instead of the semantic tokens already defined in `tailwind.config.js` (§3, §6).

---

## 1. Current UI Problems (Overview)

| # | Finding | Severity |
|---|---|---|
| 1.1 | The product reads as a well-executed **admin template**, not a premium enterprise procurement platform. Every screen follows the same pattern — `PageHeader` + 4 `StatCard`s + `Card` grid — with no visual differentiation between a Dashboard, a Supplier record, and an AI workspace. Enterprise buyers (Procurement Directors, plant engineers) expect density, data confidence, and domain-specific visual language (§ Imagery.md: "industrial," "engineering-driven," "premium"), not a generic SaaS shell. | High |
| 1.2 | No visual distinction between the **marketing site** (which now correctly uses editorial spacing, large type, imagery-led sections) and the **internal application** (dense, compact, componentized). This gap is expected and healthy — but nothing documents where the line is, so future screens risk pulling marketing-site patterns into the app or vice versa. | Medium |
| 1.3 | Zero photography or illustration anywhere in the internal app, despite `Imagery.md` (`ETA-VISUAL-004`, Approved) defining a full photography/illustration/motion system for exactly this kind of product. Empty states, onboarding, and the AI Platform page are pure text-and-icon with no visual reinforcement of "industrial," "AI-native," or "premium." | Medium |
| 1.4 | No dark mode implementation despite `tailwind.config.js` declaring `darkMode: "class"` — the toggle infrastructure exists but is unused and unstyled everywhere. Either commit to it (enterprise dashboards commonly need it for ops/monitoring contexts) or remove the dead config. | Low |

---

## 2. Design System Issues

| # | Finding | Severity |
|---|---|---|
| 2.1 | **No design system document exists.** All tokens (color, spacing, radius, shadow) live only as Tailwind config values with no rationale, usage rules, or do/don't guidance attached. `ETA-Blueprint/20-BRANDING/04-Visual-Identity/Components.md` (Approved) defines cross-product rules — e.g., "Cards: rounded corners 12–16px," "Primary buttons use ETA Navy, important actions may use Copper" — that the current `Card`/`Button` components do not fully follow (Card uses `rounded-2xl` = 16px, fine; but `Button`'s `primary` variant uses Copper for *all* primary actions, not Navy, contradicting Components.md's stated hierarchy). Without a written system, this kind of drift is invisible until an auditor cross-checks by hand, as done here. | High |
| 2.2 | **Semantic color tokens are defined but bypassed.** `tailwind.config.js` defines `success`, `warning`, `error`, `info` token families specifically so components reference them by *meaning*. In practice, `Badge.tsx`, `StatCard.tsx`, and `Dashboard.tsx` hardcode raw Tailwind palette classes instead (`bg-green-50 text-green-700`, `bg-blue-50 text-blue-600`, `bg-amber-50 text-amber-700`, `bg-red-50 text-red-700`). The values happen to numerically resemble the semantic tokens today, but there is no structural link — a future palette update to Colors.md would require hunting every raw color class across the codebase instead of editing one token. | High |
| 2.3 | **Copper (accent) usage is not governed by the approved 70/20/10 rule.** `Colors.md` (`ETA-VISUAL-001`) specifies Primary 70% / Neutral 20% / Accent (Copper) 10%, "used sparingly... for CTAs, highlights, and premium elements." The current `Button` primary variant, active nav state, focus rings, hover links, icons, and StatCard default tone all default to Copper — it is currently the *most* frequently occurring color after neutrals, not a 10% accent. This inverts the intended visual hierarchy (Navy should dominate as the primary/authoritative color; Copper should punctuate). | High |
| 2.4 | **No spacing/elevation rationale documented.** Custom spacing (`4.5`, `13`, `18`, `22`, `30`, `38`) and shadow tokens (`soft`, `card`, `elevated`, `glow-copper`) exist in Tailwind config with no stated usage rule (which shadow for which elevation level, which spacing step for which layout context). Components use them inconsistently — e.g., `Card` uses `shadow-soft` at rest, `StatCard` also uses `shadow-soft` at rest but `shadow-card` on hover, while `MobileNav`/command palette use `shadow-elevated` — with no documented reason for the different rest-state shadow choice between two visually similar card types. | Medium |
| 2.5 | **No icon-usage governance applied.** `Icons.md` (`ETA-VISUAL-003`) mandates 2px stroke, round caps/joins, outline-only style, and specific default/primary/highlight color mapping (Graphite default, Navy for primary actions, Copper for highlights). `lucide-react` is used throughout (correct library, matches Icons.md's "Primary: Lucide" recommendation) but icon color is applied ad hoc per component with no adherence to the default-Graphite / accent-Copper split — most icons default to `surface-600`/`surface-400`, not Graphite (`#1E293B`) as specified. | Low |

---

## 3. Component Issues

| # | Finding | Severity |
|---|---|---|
| 3.1 | **`DataTable` does not meet the Approved enterprise table spec.** `Components.md` requires: sorting, filtering, pagination, sticky header, row selection, bulk actions, export. The current `DataTable.tsx` (`src/components/ui/DataTable.tsx`) has none of these — it renders a static table with click-to-navigate rows only. For a Supplier Intelligence / Procurement platform where lists routinely run into hundreds of rows, this is a functional gap, not just a visual one. | High |
| 3.2 | **No feedback-component system.** `Components.md` requires Toast, Alert, Modal, Drawer, Confirmation Dialog, Empty State, Skeleton Loader, Progress Indicator. Today only `Modal.tsx`, `Progress.tsx`, and `Spinner.tsx` exist; there is no Toast, Alert, Drawer, Confirmation Dialog, or genuine Skeleton Loader (the one skeleton-like pattern in `DataTable.tsx`'s `loading` branch is a single shimmer bar repeated 5×, not a component). Every destructive/irreversible action in an enterprise procurement tool (cancel PO, deactivate supplier) needs a Confirmation Dialog that does not exist yet. | High |
| 3.3 | **No AI-specific components**, despite `Components.md` explicitly defining this category (AI Chat, AI Suggestions, AI Actions, AI Recommendations, Knowledge Results, Prompt Input, Workflow Timeline) as "the visual identity of ETA's AI-native experience." `AiPlatform.tsx` today only lists models/tasks in generic `Card`s — there is no chat surface, no prompt input, no workflow timeline. Given ETA's own Brand Story positions the company as "AI-native" first, this is the single largest gap between brand promise and current UI. | High |
| 3.4 | **`StatCard`'s `tone` prop hardcodes colors that don't match its own type union.** `tone?: "copper" \| "info" \| "neutral" \| "success" \| "warning"` implies use of the `info`/`success`/`warning` design tokens, but `toneClasses` inside the same file maps those tone names to raw `blue-50`/`green-50`/`amber-50` classes instead of `info-*`/`success-*`/`warning-*`. The prop name promises a semantic system; the implementation doesn't deliver one. Same root cause as §2.2, called out separately because it's a public component API problem, not just a styling one. | Medium |
| 3.5 | **No form-validation visual language.** `Input.tsx` exists but `Components.md` requires "clear visual feedback" for validation; no error/success/helper-text states are visible in the component (needs confirmation against full file, but no error-state styling appears in the components reviewed). Given Sprint 1 will need supplier onboarding and contact forms, this needs a defined pattern before those flows are built. | Medium |
| 3.6 | **Navigation is a single, undifferentiated flat list** — `Sidebar.tsx`/`MobileNav.tsx` render one nav tree with section labels but no breadcrumb, tabs, or context-menu components, all of which `Components.md` lists as required Navigation components. As the platform grows past 9 nav items into Finance/Reports/Products (per the requested Figma page set), a flat sidebar won't scale without breadcrumbs and in-page tabs. | Medium |
| 3.7 | **No pagination anywhere** — confirmed absent from `DataTable`, and no dedicated Pagination component exists in `src/components/ui/`. Every list page currently renders its full dataset in one pass. | Medium |

---

## 4. Typography Issues

| # | Finding | Severity |
|---|---|---|
| 4.1 | **The Approved 8-step type scale (`Typography.md`, `ETA-VISUAL-002`) is not implemented anywhere.** Blueprint defines Display (48–64px), H1 (40px), H2 (32px), H3 (24px), H4 (20px), Body Large (18px), Body (16px), Body Small (14px), Caption (12px) — with headings at 120% line-height / -1% letter-spacing, body at 150% / 0%, captions at 140% / +1%. None of this exists as Tailwind theme values or CSS classes. Current heading sizes are chosen ad hoc per component (`PageHeader` uses `text-2xl` = 24px for what is functionally an H1; `CardTitle` uses `text-sm` = 14px for all card titles regardless of context). | High |
| 4.2 | **No letter-spacing or line-height discipline.** Blueprint mandates -1% tracking on headings and specific line-heights per text role; the codebase uses Tailwind's default `tracking-tight` in a few places (`PageHeader`, `StatCard` value) and nothing elsewhere — not a systematic application of the approved values. | Medium |
| 4.3 | **Persian typeface is loaded from a public CDN at runtime** (`@import url("https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@...")` in `src/index.css`), not self-hosted/bundled. For an enterprise platform this is a reliability and performance risk (external dependency, FOUC/FOUT on slow or filtered networks, no offline/air-gapped-client support) and should be bundled as a local font asset instead. | Medium |
| 4.4 | **No monospace usage anywhere**, despite `Typography.md` defining JetBrains Mono specifically for "IDs, Technical Values, Logs, AI Output" — `tailwind.config.js` already declares the `font-mono` family but nothing in the codebase applies it. PO numbers, supplier IDs, and AI task metadata (all visible on the current Dashboard) are exactly the content Blueprint says should use it, and currently render in the default sans font indistinguishable from prose. | Low |
| 4.5 | **No defined heading hierarchy component set** (`H1`–`H4`, `Body`, `Caption` as reusable primitives) — every screen composes raw Tailwind text utilities inline, which is how 4.1's drift happens and will keep happening without a shared typography component layer. | Medium |

---

## 5. RTL Requirements

| # | Finding | Severity |
|---|---|---|
| 5.1 | **RTL is entirely unimplemented as a working feature**, confirmed unchanged since the prior audit. `index.html` hardcodes `dir="ltr"`; there is no language switcher UI anywhere in `Header.tsx`, `Sidebar.tsx`, or `SiteHeader.tsx`; and no route or state exists for a `fa` locale. The only RTL-aware code is one CSS rule (`[dir="rtl"] { font-family: Vazirmatn... }`) that nothing ever triggers. | Critical |
| 5.2 | **Components are built with physical-direction Tailwind utilities that will not auto-mirror.** A repo-wide scan found 17 occurrences of physical-direction classes (`ml-`, `pl-`, `left-`, `text-right`, etc.) across component files — e.g., `Header.tsx`'s command palette (`pt-[15vh]`, absolute-positioned `X` close button), `MobileNav.tsx`'s `absolute left-0`, `Header.tsx`'s notification dot `absolute top-1.5 right-1.5`. Tailwind's RTL-safe logical-property utilities (`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`) are not used anywhere. Turning on `dir="rtl"` today would produce a broken, non-mirrored layout even with Vazirmatn loading correctly. | High |
| 5.3 | **No Persian content exists to render even if RTL worked.** Confirmed by `CONTENT-SOURCE-MAP.md` itself (Task 5 note): the Persian catalogue source (S9) has not been mapped string-by-string, and "no new Persian marketing strings were authored." RTL is therefore blocked on two independent tracks — technical (5.1, 5.2) and content/translation — that should be sequenced and scoped separately in the redesign plan rather than treated as one task. | High |
| 5.4 | **No numeral/date/currency locale handling.** `formatCurrency`/`formatCompactCurrency`/`formatRelativeTime` (used throughout Dashboard) are not verified to support Persian (Eastern Arabic) numeral rendering or Jalali calendar dates, both of which a genuine Persian-locale enterprise UI would need. Flagging as a requirement to capture in the design system, not a current defect since no Persian UI exists yet to test against. | Medium |

---

## 6. Responsive Issues

| # | Finding | Severity |
|---|---|---|
| 6.1 | **No tablet-specific layout consideration.** The breakpoint strategy is binary: `lg:` (1024px) switches between `Sidebar`/`Header` desktop chrome and `MobileNav`. Nothing addresses the 768–1023px tablet range specifically — `Components.md` explicitly lists Tablet as a required responsive target alongside Mobile/Laptop/Desktop/Ultra-wide. On a tablet, the app currently falls into the mobile pattern (hamburger + drawer) regardless of the extra available width. | Medium |
| 6.2 | **No ultra-wide/large-desktop consideration.** `Components.md` requires graceful adaptation up to Ultra-wide Displays. Page content (e.g., Dashboard's `grid-cols-4` stat row, `Card` grids) has no `max-width` container or `2xl:`/`3xl:` breakpoint handling — on very wide monitors, content will either stretch full-bleed with excessive line lengths/whitespace-per-card, or (if a container is later added ad hoc per page) do so inconsistently. | Low |
| 6.3 | **`DataTable` has no responsive strategy beyond horizontal scroll.** `overflow-x-auto` is applied, which is acceptable as a fallback, but for an enterprise data-density product, dense tables (e.g., Supplier list with 8+ columns) will require either a card-based mobile transform or column-priority/hide-below-breakpoint behavior — neither exists. | Medium |
| 6.4 | **Command palette / search modal is not verified mobile-safe.** `Header.tsx`'s `⌘K` search overlay uses `pt-[15vh] px-4` with a `max-w-xl` panel — likely fine on mobile widths, but the trigger button itself (`hidden` is not applied) sits inline in the sticky header at all breakpoints alongside the hamburger icon, which will crowd against `Bell`/avatar on narrow phone widths (no verified breakpoint testing was performed for widths below ~375px). | Low |

---

## Summary Table

| Area | Critical | High | Medium | Low |
|---|---|---|---|---|
| Current UI Problems | 0 | 1 | 2 | 1 |
| Design System Issues | 0 | 3 | 1 | 1 |
| Component Issues | 0 | 3 | 4 | 0 |
| Typography Issues | 0 | 1 | 3 | 1 |
| RTL Requirements | 1 | 2 | 1 | 0 |
| Responsive Issues | 0 | 0 | 2 | 2 |

**Top priorities for the redesign (feed directly into `ETA-DESIGN-SYSTEM.md` and the Figma plan):**
1. Codify the token system as a written design system with usage rules — colors (with the 70/20/10 rule actually enforced), the full 8-step type scale, spacing, and elevation (§2, §4).
2. Rebuild the semantic-state pattern (success/warning/error/info) to reference design tokens everywhere, closing the Badge/StatCard/Dashboard raw-color gap (§2.2, §3.4).
3. Design the missing enterprise component set: data table with sort/filter/pagination/bulk actions, feedback components (Toast/Alert/Drawer/Confirmation), and AI-native components (Chat/Prompt/Workflow Timeline/Recommendations) (§3).
4. Scope RTL as two separate tracks — technical (logical-property components, language switcher, locale-aware formatting) and content (Persian translation) — rather than one undifferentiated task (§5).
5. Add real charting capability and define Dashboard/Reports data-visualization patterns before the Reports/Finance Figma pages are designed (§3.3, tie to Charts section of the design system).

---

*No code was modified in the course of this audit. This is Phase 1 (audit + design system + Figma plan) of the redesign; implementation is explicitly out of scope until design approval per the task brief.*
