# ETA Website Phase 3.3 — Premium Visual Refinement Audit

document_id: ETA-PHASE3-3-AUDIT-001
status: Audit only — no code changed
date: 2026-08-08
authority: `SESSION-HANDOFF-WEBSITE-PHASE3-2F.md`, `PHASE3-2-TYPOGRAPHY-CLOSURE-AUDIT.md`, all `ETA-Blueprint/13-DECISIONS/` records, `Colors.md`/`Typography.md`/`Components.md`/`Icons.md`/`Imagery.md` (all ETA-VISUAL-00x, Approved)

Mandatory reading completed. **No file was modified in this session.** This audit does not propose architecture changes, new routes, Dashboard/CRM/Portal surfaces, or new product claims — none were found and none are recommended below.

---

## 1. Hero visual composition

Home's hero: solid `bg-surface-900` with a subtle `bg-grid-pattern` overlay (`opacity-40`) — the only texture element found anywhere on the site. Left-aligned within `max-w-3xl`, generous vertical padding (`py-24 sm:py-32`). Since Phase 3.2F, typography is now correctly scaled (36/48/56px responsive) with proper heading tracking/leading.

All **8 inner-page heroes are structurally and visually identical**: same `bg-surface-900 py-20`, same centered `max-w-4xl` layout, same eyebrow-label-then-H1-then-subtext pattern, no per-page visual differentiation whatsoever beyond the text content itself. Equipment Supply, Steel Trading, Supplier Network, Platform Vision, About, Industries, Products & Capabilities, and Contact all open with the identical visual "shell."

## 2. Section rhythm and spacing

The shared `Section` component defaults to `py-16 sm:py-20`; heroes use `py-20`–`py-32`. This produces a **consistent baseline**, and background alternation (`bg-surface-900` dark / white / `bg-surface-50` light gray) does real work as an implicit section-to-section rhythm device — sections read as distinct blocks without needing dividers.

What's missing: no deliberate spacing *scale* beyond Tailwind's default 4px grid — every prior audit in this workstream has flagged this same gap ("no spacing rationale has ever been decided"), and it remains true. This isn't a violation (no Approved doc defines one), just an unresolved open item carried forward again.

## 3. Card visual quality

21 card-style containers across the site use `rounded-xl border border-surface-200`. **Only 1 of the 21 (`Pillar`, in `SiteUI.tsx`) has a shadow** (`shadow-soft`) — the other 20 are a flat white rectangle with a 1px gray border and nothing else. `Components.md`'s own Cards section explicitly lists "Soft shadow" as a defining characteristic, alongside "Large spacing, Rounded corners, Clear hierarchy." 20 of 21 cards don't meet that spec today. None of the 21 have any hover state (no `hover:shadow`, no `hover:border-color`, no lift/scale) — cards read as static, even the ones that function as clickable links to other pages (e.g., the Products & Capabilities service cards).

The icon-badge motif inside cards (small `rounded-lg`/`rounded-xl` square, `bg-copper-50` background, `text-copper-600` icon) is consistent and well-executed across every card type — a genuine strength, not a gap.

## 4. Button hierarchy

Three tiers are visually distinct and functioning correctly: solid copper primary/CTA, white/10-bordered outline secondary, and colored inline arrow-links as a tertiary "learn more" pattern. This reads clearly as intended hierarchy.

One pre-existing inconsistency, never resolved by any decision in this workstream (it's a color question, not typography): the hero CTA and `CTABand` buttons use `copper-500`→`copper-600` on hover, while `SiteHeader`'s persistent nav CTA uses `copper-600`→`copper-700`. Both are within the approved Copper ramp — nothing is off-palette — but it's two different shades for what a visitor would read as the same "primary action," first flagged during Phase 3.1 and still open.

## 5. Icon consistency

Library choice (Lucide) matches `Icons.md`'s "Primary: Lucide" exactly. The icon-badge color pairing (Graphite/Navy default, Copper for highlights) is applied consistently everywhere. Sizing is mostly compliant with the approved 16/20/24/32/48 grid (17× 20px, 10× 16px, 1× 32px) but **10 instances remain off-scale** — 9 at 14px, 1 at 18px — the same specific instances flagged in the very first Phase 3 audit and never touched since; typography work never overlapped with this.

## 6. Enterprise B2B visual language

At the token level (color, type, spacing baseline, absence of gradients/glassmorphism/playful motion) the site reads as calm and professional — it does not read as a consumer app or startup landing page, matching `CLAUDE.md`'s explicit design direction. This is a genuine, verified strength carried through the entire typography workstream.

## 7. Industrial procurement positioning (visual)

Content positioning (what the site *says*) was already audited and approved in earlier phases and is out of scope here. Visually, though, nothing on the site signals "industrial procurement" specifically — the palette, icon set, and card patterns would look identical on almost any generic enterprise-SaaS marketing site. `Imagery.md` explicitly names the subject matter that would fix this (steel production, manufacturing facilities, oil & gas plants, engineering teams, industrial inspections) — none of it exists yet. This is the single largest gap between "correctly on-brand" and "visually identifiable as an industrial procurement company."

## 8. Imagery readiness

Confirmed: zero photography or illustration anywhere on the public site except the logo (`Logo.svg`, used twice — header and footer). This is **correctly absent rather than faked** — no stock photos, no AI-generated placeholders standing in — which is the right discipline per `Imagery.md`'s "avoid generic stock photos" guidance and the site's prior "no fake assets" governance. But it remains a real, large, and highly visible gap, not a stylistic nice-to-have.

## 9. Motion/interaction opportunities

`tailwind.config.js` defines 6 ready-to-use animations (`fade-in`, `fade-in-up`, `slide-in-right`, `scale-in`, `shimmer`, `pulse-soft`). **A sitewide grep confirms zero usages of any of them anywhere in `src/pages/site` or `src/components/site`.** This infrastructure has existed since before this typography workstream began and has never been applied once. Beyond that, there are no hover micro-interactions on cards or CTAs beyond plain color transitions — no scale, shadow-lift, or translate on hover anywhere.

## 10. Premium refinement opportunities (synthesis)

Ranked by effort-to-impact, not yet prioritized into an execution order (see §5 of the Report below):

- **Card elevation + hover state** — apply `shadow-soft` (or `shadow-card`, already defined) to the 20 cards missing it, plus a `hover:shadow-elevated` transition. Directly closes the `Components.md` "soft shadow" gap.
- **Apply the dormant animation tokens** — e.g., `animate-fade-in-up` on hero content and card grids. Zero new design work — the tokens already exist and are already approved; they've just never been wired to any element.
- **Icon-scale cleanup** — normalize the 10 off-scale instances (14px→16px, 18px→20px) to close the last `Icons.md` compliance gap.
- **Subtle per-page hero differentiation** — some visual signal (an icon, an accent shape, a varied grid-pattern density) distinguishing Equipment Supply's hero from Steel Trading's from Contact's, without touching content or structure.
- **Button shade unification** — pick one copper hover-shade pairing for "primary action" sitewide.
- **Imagery** — the largest lift; blocked on sourcing (unchanged status from every prior audit).

---

## Report

### Current strengths
- Enterprise B2B visual language (color/type/absence-of-consumer-flourishes) is genuinely well-executed and consistent.
- Icon-badge motif inside cards is a strong, consistent repeated pattern.
- Section-to-section background alternation provides real visual rhythm without extra markup.
- Button hierarchy (primary/secondary/tertiary) is clear and functional.
- Typography (per `PHASE3-2-TYPOGRAPHY-CLOSURE-AUDIT.md`) is now fully compliant and closed.

### Visual weaknesses
- 20 of 21 cards lack the "soft shadow" `Components.md` specifies — flat, static appearance.
- No hover/interaction feedback anywhere beyond plain color transitions.
- All 8 inner-page heroes are visually identical to each other.
- 6 defined, approved animation tokens have zero real-world usage.
- 10 icon instances remain off the approved 16/20/24/32/48 scale.
- Two different copper shades used for the same "primary button" role.

### Branding compliance status
| Doc | Status |
|---|---|
| `Colors.md` | Compliant — no off-palette or raw-hex color anywhere (verified repeatedly across this workstream) |
| `Typography.md` | Compliant — closed per `PHASE3-2-TYPOGRAPHY-CLOSURE-AUDIT.md` |
| `Components.md` | Partially compliant — buttons/badges/inputs match spec; **Cards do not** (missing shadow on 20/21 instances) |
| `Icons.md` | Mostly compliant — correct library, correct highlight-color pairing; sizing scale violated by 10 instances |
| `Imagery.md` | Not yet implementable — correctly absent, not a violation, but the largest open content gap |

### Premium improvement opportunities
See §10 above — ranked informally by effort/impact, not yet sequenced.

### Recommended execution order
1. **Card elevation + hover state** — token-level fix, `Components.md` already specifies this exactly; lowest effort, closes a real compliance gap, affects every page.
2. **Icon-scale cleanup** — small, mechanical, closes the last `Icons.md` gap.
3. **Apply existing animation tokens** — no new tokens needed, moderate effort (touching most page files to add classes), meaningful perceived-quality lift.
4. **Button shade unification** — small, but touches multiple files (`Home.tsx`, `SiteHeader.tsx`, `CTABand.tsx`/`Button.tsx`); needs the decision in §5 below first.
5. **Per-page hero differentiation** — needs a design decision first (see §5); larger effort, touches all 8 inner-page hero sections.
6. **Imagery** — blocked on sourcing; largest scope; should follow, not precede, the above since it doesn't depend on them.

### Required decisions before implementation
- **Card shadow addition and icon-scale cleanup are arguably direct compliance fixes** — `Components.md` and `Icons.md` already specify these exactly, and the tokens (`shadow-soft`/`shadow-card`, the 16/20/24/32/48 icon grid) are already Approved. Per the UI/UX Implementation Governance precedent already established in this workspace ("token-level fixes that make existing UI conform to an already-Approved Blueprint doc... are implementation, not redesign"), these two items may not need a fresh decision — flagged for confirmation, not assumed.
- **Applying the existing animation tokens** is the same category — the tokens are already approved and defined; wiring them up is arguably implementation, not redesign. Flagged for the same confirmation.
- **Per-page hero differentiation is a genuine design decision**, not a compliance fix — no Approved doc mandates or describes it. `Open Decision Required` before any work starts here: what form should the differentiation take (icon, accent shape, imagery placeholder, pattern density), and does Blueprint want to specify it centrally or leave it to per-page judgment?
- **Button shade unification** is a small color-consistency question (`copper-500` vs. `copper-600` for "primary") — both are within the approved ramp, so this is low-stakes, but which shade becomes canonical is a real choice, not automatically derivable from `Colors.md` alone.
- **Imagery** remains blocked exactly as every prior audit found — needs a sourced, licensed, `Imagery.md`-compliant photography set before any implementation can start; this audit does not resolve that.

---

STOP after this audit, per instruction. No code, Tailwind config, component, page, route, or content was changed.
