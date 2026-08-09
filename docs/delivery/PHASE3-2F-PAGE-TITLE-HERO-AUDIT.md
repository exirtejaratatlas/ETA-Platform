# ETA Website Phase 3.2F — Page Title & Hero Execution Audit (T7/T8)

document_id: ETA-PHASE3-2F-AUDIT-001
status: Audit only — no code changed
date: 2026-08-08
authority: `ETA-Blueprint/13-DECISIONS/ETA-Website-Typography-Decision-Resolution-T10-T11.md`, `.../ETA-Website-Typography-Execution-Decision-Resolution.md` (T7, T8), `PHASE3-2B-TYPOGRAPHY-MIGRATION-PLAN.md`

Mandatory reading completed. **No file was modified in this session.** No `tailwind.config.js`, page, route, color, or component change was made — audit only, per instruction.

---

## 1. Current implementation

### T7 — Page Title

Page Title is **not centralized**. Unlike Section Heading (`SectionHeading`, one shared component) or Component Title (22 scattered call sites that were individually migrated), Page Title has **no shared component at all** in the public website. A `PageHeader` component exists at `src/components/ui/PageHeader.tsx`, but it is used exclusively by the **internal** app (`Dashboard.tsx`, `Settings.tsx`, `AiPlatform.tsx`, `SupplierPortal.tsx`, and the CRM/supplier/procurement pages) — a grep confirms zero imports of it anywhere under `src/pages/site/`.

Instead, all 8 inner public pages hardcode an identical `<h1>` block inline:
```
<h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
```
30px mobile → 36px desktop (`sm:`, 640px breakpoint). All 8 instances are **byte-identical** in class string, differing only in their text content and, in 2 cases, whether the heading text is on one line in JSX or wraps across two source lines (no functional difference). All 8 are correctly semantic `<h1>` tags — one per page, no heading-level violations.

### T8 — Hero / Display

Only **one page** — `Home.tsx` — uses the Display role. This is a distinct finding worth stating plainly: the other 8 pages' `<h1>`s are Page Title role (T7, above), not Display role. `Typography.md`'s Display entry ("48–64px, Hero sections") and T8 apply to exactly one component instance sitewide.

Home's hero:
```
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
  Engineering Intelligence.
  <br />
  Enterprise Procurement.
  <br />
  <span className="text-copper-400">Powered by AI.</span>
</h1>
```
Three responsive steps: `text-4xl` (36px, base/mobile) → `sm:text-5xl` (48px, ≥640px) → `lg:text-6xl` (60px, ≥1024px). Line breaks are **manual** (`<br />` tags, not organic wrapping) — the heading always renders as exactly 3 lines regardless of viewport width. A custom `leading-[1.1]` (110% line-height) overrides Tailwind's default, and `tracking-tight` (−2.5%) is applied, same as the Page Title pattern.

---

## 2. Violations (against Typography.md / current tokens)

Both T7 and T8 share the same two violation types already documented for every other heading migrated so far in this workstream:

- **Letter-spacing**: `tracking-tight` = Tailwind's −2.5%, vs. the approved heading value of −1% (baked into the `h1`/`h2`/`display` tokens already in `tailwind.config.js`).
- **Line-height**: Page Title instances get Tailwind's default per-size line-height (not the approved 120%); Home's hero explicitly overrides to `leading-[1.1]` (110%), vs. the approved 120%.

No new violation types were found beyond these two recurring ones.

---

## 3. Files affected

### T7 — 8 files, all with the identical single-instance change

`About.tsx`, `Contact.tsx`, `EquipmentSupply.tsx`, `Industries.tsx`, `PlatformOverview.tsx`, `Services.tsx`, `SteelTrading.tsx`, `SupplierNetwork.tsx` — one `<h1>` per file, all currently identical class strings, all requiring the identical edit. Because the string is duplicated verbatim 8 times rather than centralized, this migration is 8 separate edits, not 1 — the opposite of Section Heading's situation. (A shared `PageHero`-style component, analogous to `CTABand`'s Phase 3.1 extraction, would reduce this to one edit — flagged as a possible future component-reuse improvement, **not recommended within this typography-only workstream**, since extracting a new shared component is an architecture change requiring its own approval, not a class-swap.)

### T8 — 1 file

`Home.tsx` only.

---

## 4. Migration strategy

### T7 — target and risk

T10's precedent (mobile `h3`/desktop `h2` for Section Heading) and T7's own decision (mobile `h2`/desktop `h1`) both already exist as ratified decisions — no new decision is needed for the *values*; this section audits *execution*, not policy.

Target: `text-h2 sm:text-h1 font-semibold` (dropping `tracking-tight`, same mechanical note as every prior migration in this workstream — the `h1`/`h2` tokens already bundle the correct −1% letter-spacing and 120% line-height).

**Size delta**: 30px→32px mobile (+2px, negligible), 36px→40px desktop (+4px, ~11% larger). **Layout risk is not uniform across the 8 instances** — it depends on each page's actual heading text length relative to the `max-w-4xl` (896px) centered container:

| File | Heading text | Approx. length | Wrap risk at larger size |
|---|---|---|---|
| `Contact.tsx` | "Exir Tejarat Atlas" | 19 chars | None — short, single line regardless |
| `About.tsx` | "Exir Tejarat Atlas (ETA)" | 24 chars | None — short |
| `Industries.tsx` | "Mission-critical industries we serve" | 37 chars | Low |
| `Services.tsx` | "Engineering-driven procurement, end to end" | 43 chars | Low–Medium |
| `SupplierNetwork.tsx` | "Positioned on both sides of the supply corridor" | 49 chars | Medium |
| `EquipmentSupply.tsx` | "From rotating machinery to the final control element" | 53 chars | Medium |
| `PlatformOverview.tsx` | "One enterprise ecosystem for industrial procurement" | 52 chars | Medium |
| `SteelTrading.tsx` | "Sheet and coil in the grade a production line calls for" | 57 chars | Medium–High — longest headline, most likely to shift from 2 lines to 3, or re-break mid-phrase awkwardly |

None of these risk a broken layout (the container has no fixed height, text wraps freely) — the risk is purely visual rhythm (line-count changes, different break points) and needs a per-page visual check at mobile/tablet/desktop widths after migration, not a blocking concern before it.

### T8 — target and risk

Target per T8: Mobile 36px / Tablet 48px / Desktop 56px.

**This is the most important finding of this audit**: mapped onto Tailwind's existing `base`/`sm:`/`lg:` breakpoints (the same three breakpoints Home's hero already uses today), **two of the three values are already exactly what's live**:

| Step | Current | T8 target | Delta |
|---|---|---|---|
| Mobile (base) | 36px (`text-4xl`) | 36px | **None — already exact** |
| Tablet (`sm:`, ≥640px) | 48px (`text-5xl`) | 48px | **None — already exact** |
| Desktop (`lg:`, ≥1024px) | 60px (`text-6xl`) | 56px | **−4px, a reduction** |

Only the desktop step changes, and it changes *downward* — a lower-risk direction than the original audit's earlier framing (which treated the whole 3-step scale as unresolved) suggested. Combined with the fact that line breaks are manual (not organic), **T8's layout risk is substantially lower than initially scoped** — the only real visual delta is the desktop heading rendering 4px smaller than it does now, plus the line-height/tracking correction (110%→120%, −2.5%→−1%) common to every heading migration in this workstream, which will make the 3-line block modestly taller.

**Tailwind token requirement**: the existing `display` token (`3rem` = 48px) already matches T8's Tablet value exactly and can be reused as-is for the `sm:` step, the same reuse pattern already established for `component-title`/`h4` (T6). Two new values are needed for the other two steps, since neither 36px nor 56px matches any current token: a Mobile/base value (36px = `2.25rem`) and a Desktop value (56px = `3.5rem`). Suggested naming — `display-sm` (36px) and `display-lg` (56px) — is offered as a proposal only; T8 didn't specify token names, so this is flagged for confirmation in §5, not decided here.

---

## 5. Open decisions

**5.1 — T8's token names.** T8 fixed the three pixel values but not what the new tokens should be called in `tailwind.config.js`. Proposed: `display-sm` (36px) and `display-lg` (56px), reusing `display` (48px) unchanged for the middle step — consistent with how `h4` was reused for Component Title's desktop step. Needs confirmation, not assumed here.

**5.2 — "Tablet" breakpoint mapping.** T8 names three tiers as Mobile/Tablet/Desktop, which aren't literal Tailwind breakpoint names. This audit assumed Tablet = `sm:` (640px), matching Home's *already-live* markup (`text-5xl` currently applies at `sm:`, not `md:`). An alternative reading — Tablet = `md:` (768px) — is possible but would require restructuring Home's hero to a `base`/`md:`/`lg:` pattern instead of its current `base`/`sm:`/`lg:` one, a bigger and unnecessary change given the current markup already aligns with the `sm:` reading. Flagged for explicit confirmation since it wasn't stated numerically in T8, even though the low-friction reading is strongly preferred.

**5.3 — Should Page Title be extracted into a shared component before or during migration?** Not required — the 8-file edit is mechanical and identical across files — but flagged as a legitimate future component-reuse improvement (analogous to `CTABand`'s Phase 3.1 extraction), explicitly **out of scope** for this typography-only workstream per governance (component/architecture changes need separate approval). Recommend proceeding with the 8 individual edits now and treating extraction as a separate future decision if wanted.

**5.4 — `tracking-tight`/`leading-[1.1]` removal on Home's hero is a visual change, not just a cleanup.** Migrating to token classes will loosen both the letter-spacing and line-height slightly (as with every other heading in this workstream), making the 3-line hero block modestly taller. Not a decision gap — it's the intended, approved outcome — but flagged so the eventual execution session's visual QA specifically checks the hero's vertical rhythm against the section's `py-24 sm:py-32` padding, not just horizontal wrap.

---

## 6. Explicitly not done in this session

No file was modified — no `tailwind.config.js` token was added, no page's `<h1>` was changed, no component was extracted or touched.

---

STOP after this audit, per instruction. Waiting on §5.1 and §5.2 (token naming, breakpoint-tier confirmation) before T7/T8 can execute — both are small, low-controversy confirmations given the low-risk findings above, not open design questions.
