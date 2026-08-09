# ETA Website Phase 3.2E — Section Heading Migration Preparation Audit

document_id: ETA-PHASE3-2E-AUDIT-001
status: Audit only — no code changed
date: 2026-08-08
authority: `SESSION-HANDOFF-WEBSITE-PHASE3-2D.md`, `ETA-Blueprint/13-DECISIONS/ETA-Website-Typography-Execution-Decision-Resolution.md` (T1–T9), `PHASE3-2B-TYPOGRAPHY-MIGRATION-PLAN.md`, `Typography.md` (ETA-VISUAL-002, Approved)

Mandatory reading completed. **No file was modified in this session** — audit only, per instruction. No pages, components, `tailwind.config.js`, routes, colors, or spacing were touched.

---

## 1. Headline finding: Section Heading typography is fully centralized in 2 files

Every "Section heading" role instance sitewide renders through exactly one of two shared components — `SectionHeading` (`SiteUI.tsx`) or `CTABand` (`CTABand.tsx`). A repo-wide search for raw `<h2>` tags outside these two components returns **zero results**: no page has a manual, inline section heading that bypasses the shared components.

Practical consequence: although there are **27 rendered instances** sitewide (23 `SectionHeading` call sites + 4 `CTABand` call sites), the actual code-edit surface for this migration is just **2 files, 2 lines** — `SiteUI.tsx:23` and `CTABand.tsx:37`. This is a much smaller edit surface than Component Title's (22 separate call sites, each with its own class string) or Page Title's (8 separate identical-but-duplicated `<h1>` blocks) — because, unlike those two, Section Heading was never duplicated per-page; it was already componentized before this typography workstream began.

---

## 2. Current state, both component definitions

**`SiteUI.tsx`'s `SectionHeading`** (line 23):
```
<h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${light ? "text-white" : "text-surface-900"}`}>
```
`text-2xl sm:text-3xl` = 24px mobile → 30px desktop (sm:+). `tracking-tight` = Tailwind's −2.5% (not the approved heading −1%, per the original audit's §2/§3.3 finding — unresolved by any of T1–T9, carried forward here since Section Heading's `tracking-tight` issue was never assigned its own decision).

**`CTABand.tsx`'s heading** (line 37):
```
<h2 className="text-2xl sm:text-3xl font-semibold text-white">{heading}</h2>
```
Identical size (`text-2xl sm:text-3xl`, 24→30px) but **no `tracking-tight`** — a pre-existing inconsistency between the two H2 sources, already flagged as Open Decision #5 in `ETA-Website-Typography-Execution-Decision-Resolution.md`'s "Still open" section and never resolved.

Both are semantically `<h2>` tags — no tag-level change is needed for either, only class changes, when migration executes.

---

## 3. Every call site, mapped

**`SectionHeading` — 23 call sites, all resolving to the one definition above:**

| File | Location (line) | Props relevant to typography | Element |
|---|---|---|---|
| `Home.tsx` | 110 | default (left, dark-on-light) | `<h2>` via `SectionHeading` |
| `Home.tsx` | 134 | `align="center"` | `<h2>` via `SectionHeading` |
| `Home.tsx` | 144 | default | `<h2>` via `SectionHeading` |
| `Home.tsx` | 157 | `light`, `description` | `<h2>` via `SectionHeading` |
| `Home.tsx` | 173 | `align="center"` | `<h2>` via `SectionHeading` |
| `About.tsx` | 52 | default | `<h2>` via `SectionHeading` |
| `About.tsx` | 105 | default | `<h2>` via `SectionHeading` |
| `About.tsx` | 124 | default | `<h2>` via `SectionHeading` |
| `About.tsx` | 153 | `align="center"` | `<h2>` via `SectionHeading` |
| `About.tsx` | 192 | default | `<h2>` via `SectionHeading` |
| `About.tsx` | 201 | default | `<h2>` via `SectionHeading` |
| `Industries.tsx` | 71 | `align="center"` | `<h2>` via `SectionHeading` |
| `Services.tsx` | 93 | `light`, `align="center"` | `<h2>` via `SectionHeading` |
| `EquipmentSupply.tsx` | 57 | `align="center"` | `<h2>` via `SectionHeading` |
| `EquipmentSupply.tsx` | 72 | `align="center"` | `<h2>` via `SectionHeading` |
| `EquipmentSupply.tsx` | 89 | default | `<h2>` via `SectionHeading` |
| `EquipmentSupply.tsx` | 101 | `light`, `align="center"` | `<h2>` via `SectionHeading` |
| `SteelTrading.tsx` | 39 | default | `<h2>` via `SectionHeading` |
| `SteelTrading.tsx` | 62 | `align="center"` | `<h2>` via `SectionHeading` |
| `SupplierNetwork.tsx` | 34 | `align="center"` | `<h2>` via `SectionHeading` |
| `PlatformOverview.tsx` | 52 | `description` | `<h2>` via `SectionHeading` |
| `PlatformOverview.tsx` | 67 | `description` | `<h2>` via `SectionHeading` |
| `Contact.tsx` | 53 | default | `<h2>` via `SectionHeading` |

(3 use `light`, 3 use `description`, 10 use `align="center"` — none of these props affect font-size/weight/tracking, only color, text-alignment, and whether a description paragraph renders.)

**`CTABand` — 4 call sites, all resolving to the `CTABand.tsx` definition:**

| File | Location (line) | Element |
|---|---|---|
| `Home.tsx` | ~205 (via `<CTABand fullWidth ... />`) | `<h2>` via `CTABand` |
| `About.tsx` | ~213 (via `<CTABand ... />`) | `<h2>` via `CTABand` |
| `SteelTrading.tsx` | ~89 (via `<CTABand ... />`) | `<h2>` via `CTABand` |
| `SupplierNetwork.tsx` | ~80 (via `<CTABand ... />`) | `<h2>` via `CTABand` |

**Current class → target token, for the 2 real edit points:**

| File | Line | Current class | Element | Target token (proposed — see §4/§5, not yet ratified) |
|---|---|---|---|---|
| `SiteUI.tsx` | 23 | `text-2xl sm:text-3xl font-semibold tracking-tight` | `<h2>` | `text-h3 sm:text-h2 font-semibold` |
| `CTABand.tsx` | 37 | `text-2xl sm:text-3xl font-semibold` | `<h2>` | `text-h3 sm:text-h2 font-semibold` — **or** kept distinct from `SectionHeading`, see §5 Open Decision |

---

## 4. Comparison against Typography.md

`Typography.md`'s Heading 2 entry is explicit: **"32px — Section titles."** This is the single strongest, most literal doc-match found anywhere in this entire typography workstream — the doc names this exact role by name. `h2` in `tailwind.config.js` is already `2rem` (32px) with the correct heading-style line-height (120%) and letter-spacing (−1%) baked in.

The gap is the same one already hit for Page Title and Hero: **Typography.md's H2 entry is a single fixed value, with no stated mobile/responsive variant**, and current implementation is responsive (24px mobile → 30px desktop). Per T1 ("responsive variants are allowed, do not flatten"), a two-step pairing is expected — but T1 only established the *principle*; it didn't pick Section Heading's specific pairing, the way T7 explicitly picked Page Title's (`h2`→`h1`) and T8 explicitly picked Hero's (36/48/56px).

The Migration Plan (`PHASE3-2B-TYPOGRAPHY-MIGRATION-PLAN.md` §1) proposed `h3` (24px, exact match to today's mobile size) → `h2` (32px, close to today's 30px desktop) as "the cleanest mapping in this plan, minimal delta" — and labeled it "Ready" rather than flagging it for confirmation, unlike the Page Title and Hero rows in that same table. In hindsight, against the pattern this workstream has since established (T6/T7/T8 each formally ratifying a proposed pairing before execution), that "Ready" label undersold the gap: **no numbered decision has actually ratified this pairing.** It is flagged as a missing decision in §5 below, not assumed settled here.

---

## 5. Missing decisions before implementation

**5.1 — Section Heading's responsive pairing has never been formally ratified.** Unlike Component Title (T6), Page Title (T7), and Hero (T8), Section Heading's `h3`→`h2` pairing exists only as a Migration Plan recommendation. Given `Typography.md` names H2 "Section titles" explicitly, the desktop value (32px, `h2`) is about as strong a doc-match as this workstream has found — but the mobile value (`h3`, 24px) is an inference, not a documented decision, exactly parallel to what T7 had to resolve for Page Title. Recommend a T10 (or equivalent) decision explicitly ratifying `h3 sm:h2` (or an alternative) before any code changes.

**5.2 — `CTABand`'s H2 vs. `SectionHeading`'s H2 tracking mismatch (Open Decision #5) is now directly load-bearing for this migration, not just a cosmetic footnote.** If both get the *same* target token (`text-h3 sm:text-h2`) with `font-semibold` and the token's own bundled letter-spacing (−1%), the two H2 sources become visually identical for the first time — likely a good outcome, but it is itself a decision (unifying two previously-distinct patterns), not a mechanical token swap. Alternatively, Blueprint may want them to stay visually distinct (band vs. body-section), in which case `CTABand`'s heading needs its own, different target — undefined today. This needs an explicit answer, not an assumption either way.

**5.3 — `tracking-tight` removal, mechanically.** `SectionHeading`'s current `tracking-tight` (−2.5%) must be dropped in the same edit that applies `text-h3 sm:text-h2` (whose bundled `letterSpacing` is −1%), or the two conflicting letter-spacing declarations coexist — the same class of execution note already handled correctly for Caption migration in the Low-risk tier (`SESSION-HANDOFF-WEBSITE-PHASE3-2.md`). Not a decision gap, just a required execution step once migration is approved — flagged here so it isn't missed.

**5.4 — `description` paragraph's target token was already resolved in the Low-risk tier** (`text-base` → `text-body`, done in `SiteUI.tsx` and `CTABand.tsx` in the prior Low-risk session) — not part of this Medium-risk item, listed here only to confirm it isn't accidentally re-touched or overlooked as "still open." It is not open; it is already migrated.

---

## 6. Explicitly not done in this session

No file was modified. No `tailwind.config.js` change was made (none is needed for Section Heading migration — `h2` and `h3` already exist as tokens; only the class strings at the 2 definition sites would need to change, and only once §5.1/§5.2 are resolved). No page, component, route, color, or spacing was touched.

---

STOP after this audit, per instruction. Waiting on resolution of §5.1 (responsive pairing ratification) and §5.2 (`CTABand` vs. `SectionHeading` unification) before this migration can proceed — both are decision gaps, not implementation tasks.
