---
title: ETA Platform — Repository Hygiene Audit
document_id: ETA-REPO-HYGIENE-AUDIT-001
status: Audit only — no file staged, committed, reset, or modified
date: 2026-08-09
scope: Full `git status` working-tree audit of ETA-Platform (branch `main`). Every modified
  and untracked file is read and classified below. No `git add`, `git commit`, `git reset`,
  or `git checkout` was run. No source file was edited.
method: >
  `git status --short` for the full change set; `git diff` / `git diff --stat` per modified
  file to determine actual content changed (not assumed from filename); file mtimes for
  untracked files; frontmatter/header of every untracked `.md` file; cross-reference against
  the five Phase 3–5.1 session handoffs and the `ETA-WEBSITE-PHASE-STATE-SNAPSHOT.md` already
  committed at `54fde39`.
---

# Repository Hygiene Audit

`git status` at time of audit: **27 modified files, 47 untracked paths** (36 docs, 11 source
files/dirs — `src/i18n/` counted per-file below, 7 files). Nothing has been staged. This
document only records findings — no cleanup action was taken.

---

## Classification legend

- **Category 1 — Completed Phase work**: content matches a closed, documented phase
  (Foundation, Phase 1, Phase 2, Phase 3.1–3.3, Phase 4.1–4.2, Phase 5.1) with a traceable
  handoff or audit document as authority.
- **Category 2 — Documentation only**: `.md` file, no code impact either way.
- **Category 3 — Tooling changes**: local dev/build configuration, not product code.
- **Category 4 — Unknown / requires review**: content that doesn't cleanly map to a closed,
  approved phase, or where the file's own status/content conflicts with what governing
  documents claim.

Most files fall into Category 1 *and* one of 2/3 simultaneously (e.g. a closed-phase doc is
both "Completed Phase work" and "Documentation only"). Where that overlap exists, both are
named; "Category" below states the primary one for triage purposes.

---

## A. Untracked documentation files (`docs/delivery/*.md`)

| File | Doc's own status field | Likely source phase | Category | Safe to commit | Requires manual review |
|---|---|---|---|---|---|
| `ETA-DESIGN-SYSTEM.md` | Draft — for review | Pre-Phase-1 "Figma redesign" track (2026-08-04) | 4 — Unknown/requires review | Technically yes (doc-only) | **Yes** — never resolved to Approved/Rejected; later sessions explicitly state it "was not used as authority for any decision" (`SESSION-HANDOFF-UI-FOUNDATION.md`). Committing it silently could read as live guidance when it's an abandoned parallel track. |
| `FIGMA-BUILD-SPEC.md` | Draft — for review | Same Figma track, 2026-08-04 | 4 | Yes | **Yes** — same reason; depends on `ETA-DESIGN-SYSTEM.md`, inherits its unresolved status. |
| `FIGMA-DESIGN-PLAN.md` | Draft — for review | Same Figma track, 2026-08-04 | 4 | Yes | **Yes** — same reason. No Figma file was ever confirmed created against this plan. |
| `UI-DESIGN-AUDIT.md` | Draft — for review | Pre-Phase-1 audit feeding the Figma track, 2026-08-04 | 2 — Documentation only | Yes | Minor — audit findings are descriptive and largely superseded by later, more current audits (`PHASE3-3-VISUAL-REFINEMENT-AUDIT.md`, `PHASE5-BRAND-EXPERIENCE-AUDIT.md`); low risk to commit as historical record. |
| `NEXT-SESSION-TASK.md` | Queued | Foundation, 2026-08-07 | 4 | Yes | **Yes — stale.** Points to "ETA UX Architecture Phase" (Dashboard/CRM IA) as the next task; actual work instead went to the Website Phase 1–5 track. This queued pointer was never executed or superseded in writing. |
| `SESSION-HANDOFF-UI-FOUNDATION.md` | Closed | Foundation (UI Foundation + Component Inventory), 2026-08-07 | 1 — Completed Phase work | Yes | No |
| `UI-COMPONENT-INVENTORY.md` | Draft — for review | Foundation, 2026-08-07 | 1 / 2 | Yes | Minor — status field says "Draft" though its own companion handoff is "Closed"; harmless inconsistency, not a content problem. |
| `SESSION-HANDOFF-WEBSITE-FOUNDATION.md` | Closed | Foundation (Website), 2026-08-08 | 1 | Yes | No |
| `NEXT-WEBSITE-TASK.md` | Queued | Foundation→Phase 2 planning, 2026-08-08 09:29 | 4 | Yes | **Yes — stale.** Superseded by Phase 2's actual execution (`SESSION-HANDOFF-WEBSITE-PHASE2*.md`); its own header says it "supersedes" an even earlier version. Safe as historical record but should not be read as current next-steps. |
| `SESSION-HANDOFF-WEBSITE-PHASE1.md` | Closed | Phase 1, 2026-08-08 | 1 | Yes | No |
| `SESSION-HANDOFF-WEBSITE-PHASE1-FINAL.md` | Closed | Phase 1 (final), 2026-08-08 | 1 | Yes | No |
| `WEBSITE-ARCHITECTURE-CONFLICT-REPORT.md` | **Open** — "no conflict resolved" | Pre-Phase-2, 2026-08-08 10:23 | 4 | Yes (doc-only) | **Yes — stale status field.** Its own metadata says `status: Open`, but the conflicts it raised (visual authority, page-structure) were resolved the same day via D1–D4 (`ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md`) and executed in Phase 2. Nobody went back and flipped this file's status to Resolved — a future session grepping for "Open" conflicts would get a false positive. |
| `PHASE2_IMPLEMENTATION_PLAN.md` | Draft — awaiting review | Phase 2 planning, 2026-08-08 11:01 | 1 / 2 | Yes | Minor — status field never updated to reflect it was approved and executed (per `SESSION-HANDOFF-WEBSITE-PHASE2.md`). |
| `SESSION-HANDOFF-WEBSITE-PHASE2.md` | Closed | Phase 2, 2026-08-08 | 1 | Yes | No |
| `SESSION-HANDOFF-WEBSITE-PHASE2-FINAL.md` | Closed | Phase 2 (consolidated), 2026-08-08 | 1 | Yes | No |
| `NEXT-SESSION-WEBSITE-PHASE3-START.md` | Queued | Phase 3 planning, 2026-08-08 11:32 | 4 | Yes | Minor — stale now that Phase 3.1–3.3 are closed; harmless as historical record. |
| `SESSION-HANDOFF-WEBSITE-PHASE3-1.md` | Closed | Phase 3.1, 2026-08-08 | 1 | Yes | No |
| `PHASE3-2-TYPOGRAPHY-AUDIT.md` | Audit complete — no code changed | Phase 3.2, 2026-08-08 | 1 | Yes | No |
| `PHASE3-2B-TYPOGRAPHY-MIGRATION-PLAN.md` | Plan only — no code changed | Phase 3.2, 2026-08-08 | 1 | Yes | No |
| `PHASE3-2-EXECUTION-REPORT.md` | Pre-execution report | Phase 3.2 (low-risk tier), 2026-08-08 | 1 | Yes | No |
| `SESSION-HANDOFF-WEBSITE-PHASE3-2.md` | Closed | Phase 3.2 (low-risk tier), 2026-08-08 | 1 | Yes | No |
| `PHASE3-2C-COMPONENT-TITLE-MIGRATION-REPORT.md` | Preparation only | Phase 3.2C, 2026-08-08 | 1 | Yes | No |
| `SESSION-HANDOFF-WEBSITE-PHASE3-2D.md` | Closed | Phase 3.2D, 2026-08-08 | 1 | Yes | No |
| `PHASE3-2E-SECTION-HEADING-AUDIT.md` | Audit only | Phase 3.2E, 2026-08-08 | 1 | Yes | No |
| `SESSION-HANDOFF-WEBSITE-PHASE3-2E.md` | Closed | Phase 3.2E, 2026-08-08 | 1 | Yes | No |
| `PHASE3-2F-PAGE-TITLE-HERO-AUDIT.md` | Audit only | Phase 3.2F, 2026-08-08 | 1 | Yes | No |
| `SESSION-HANDOFF-WEBSITE-PHASE3-2F.md` | Closed | Phase 3.2F, 2026-08-08 | 1 | Yes | No |
| `PHASE3-2-TYPOGRAPHY-CLOSURE-AUDIT.md` | Audit only | Phase 3.2 closure, 2026-08-08 | 1 | Yes | No |
| `PHASE3-3-VISUAL-REFINEMENT-AUDIT.md` | Audit only | Phase 3.3, 2026-08-08 | 1 | Yes | No |
| `NEXT-SESSION-WEBSITE-PHASE3-3-START.md` | Queued | Phase 3.3 planning, 2026-08-08 | 4 | Yes | Minor — stale now that 3.3 is closed. |
| `SESSION-HANDOFF-WEBSITE-PHASE3-3-FINAL.md` | Closed | Phase 3.3 (final), 2026-08-08 | 1 | Yes | No |
| `NEXT-SESSION-WEBSITE-PHASE4-START.md` | Queued | Phase 4 planning, 2026-08-08 | 4 | Yes | Minor — stale now that 4.1/4.2 are closed. |
| `SESSION-HANDOFF-WEBSITE-PHASE4-1.md` | Closed | Phase 4.1, 2026-08-08 | 1 | Yes | No |
| `SESSION-HANDOFF-WEBSITE-PHASE4-2.md` | Closed | Phase 4.2, 2026-08-08 | 1 | Yes | No |
| `PHASE5-BRAND-EXPERIENCE-AUDIT.md` | Audit | Phase 5, 2026-08-09 | 1 | Yes | No |
| `RTL-READINESS-NOTE.md` | Draft — foundation only | Foundation (RTL scaffold), 2026-08-07 | 1 | Yes | **Yes — see finding below.** Its own text states `LanguageProvider` is "not imported by `main.tsx` ... [t]he app's runtime behavior is unchanged today." That is no longer true in the current working tree — see `src/main.tsx` in section C. |
| `SESSION-HANDOFF-WEBSITE-PHASE5-1.md` | Closed | Phase 5.1, 2026-08-09 | 1 | Yes | No |

`ETA-WEBSITE-PHASE-STATE-SNAPSHOT.md` is **not** listed above — it was created and committed
(`54fde39`) in the prior session and no longer appears in `git status`.

---

## B. Untracked source files

| Path | Likely source phase | Category | Safe to commit | Requires manual review |
|---|---|---|---|---|
| `src/components/site/CTABand.tsx` | Phase 3.1 (CTA-band pattern extracted from 4 duplicated pages) + Phase 3.2 typography | 1 | Yes | No — matches `SESSION-HANDOFF-WEBSITE-PHASE3-1.md` and T11's description exactly. |
| `src/components/ui/Alert.tsx` | Foundation (UI Component Inventory), 2026-08-07 | 1 | Yes | No |
| `src/components/ui/Drawer.tsx` | Foundation, 2026-08-07 | 1 | Yes | No |
| `src/components/ui/EmptyState.tsx` | Foundation, 2026-08-07 | 1 | Yes | No |
| `src/components/ui/Select.tsx` | Foundation, 2026-08-07 | 1 | Yes | No |
| `src/components/ui/Skeleton.tsx` | Foundation, 2026-08-07 | 1 | Yes | No |
| `src/components/ui/Tabs.tsx` | Foundation, 2026-08-07 | 1 | Yes | No |
| `src/components/ui/Toast.tsx` | Foundation, 2026-08-07 | 1 | Yes | No |
| `src/i18n/types.ts` | Foundation (RTL scaffold), 2026-08-07 | 1 | Yes | No — additive, inert type defs. |
| `src/i18n/en.ts` | Foundation, 2026-08-07 | 1 | Yes | No — English chrome strings only, copied verbatim from already-approved copy. |
| `src/i18n/fa.ts` | Foundation, 2026-08-07 | 1 | Yes | No — 100% `"Open Decision Required"` placeholder values, no invented Persian content. |
| `src/i18n/localeFormat.ts` | Foundation, 2026-08-07 | 1 | Yes | No — explicit stub, no Jalali/numeral logic implemented. |
| `src/i18n/index.ts` | Foundation, 2026-08-07 | 1 | Yes | No — barrel export. |
| `src/i18n/LanguageSwitcher.tsx` | Foundation, 2026-08-07 | 1 | Yes | No — confirmed by grep: not imported/mounted anywhere in `src/`. |
| `src/i18n/LanguageContext.tsx` | Foundation, 2026-08-07 | 1 | Yes | **Yes, in conjunction with `src/main.tsx`** — this file itself is inert, but see the `main.tsx` finding: the provider it exports is now mounted, which the module's own governing note says shouldn't happen until later. |
| `src/pages/site/EquipmentSupply.tsx` | Phase 1 (creation) → 3.2 (typography) → 4.1/4.2 (shadow/icon/motion) → 5.1 (copper CTA) | 1 | Yes | Light — never committed before, so this is a first-time add of the whole file rather than an incremental diff; worth a one-time full read before commit (not because anything looks wrong, just because there's no prior committed baseline to diff against). |
| `src/pages/site/SteelTrading.tsx` | Phase 1 → 3.2 → 4.1/4.2 (not touched by 5.1 per that phase's file list) | 1 | Yes | Light — same reason as above. |
| `src/pages/site/SupplierNetwork.tsx` | Phase 1 → 3.2 → 4.1/4.2 (not touched by 5.1) | 1 | Yes | Light — same reason as above. |

---

## C. Modified (tracked) source files

Every file below combines edits from more than one phase — none is cleanly attributable to a
single session — because none has been committed since before Phase 3 began. Classification
reflects the union of phases whose documented "files changed" list names the file, cross-checked
against the actual diff content.

| Path | Diff size | Likely source phase(s) | Category | Safe to commit | Requires manual review |
|---|---|---|---|---|---|
| `.claude/launch.json` | 5 lines | Phase 4.1 (dev-server convenience: renamed config, port 5173→5182, `autoPort: true`) | 3 — Tooling | Technically yes | **Yes** — this changes the team-shared default dev port, done for one session's local convenience (`SESSION-HANDOFF-WEBSITE-PHASE4-1.md` explains why). Confirm intent before committing rather than carrying a one-off convenience tweak into the shared config. |
| `src/App.tsx` | 21 lines | Phase 2 (D1–D4/CR-001: `/products-capabilities` rename + 3 new child routes) | 1 | Yes | No — matches `SESSION-HANDOFF-WEBSITE-PHASE2.md` exactly, comments cite the authorizing decision record. |
| `src/components/layout/AppLayout.tsx` | 2 lines | Foundation (raw-color → semantic-token normalization: `amber-*` → `warning`) | 1 | Yes | No |
| `src/components/site/SiteFooter.tsx` | 30 lines | Foundation + Phase 3.1/3.2 (component reuse, typography) | 1 | Yes | No |
| `src/components/site/SiteHeader.tsx` | 35 lines | Foundation + Phase 3.1/3.2 (typography) + Phase 5.1 (V5 nav active-state → `copper-500`) | 1 | Yes | No — the copper changes match Phase 5.1's documented before/after (`text-copper-600→500`, `text-copper-700→500`) exactly. |
| `src/components/site/SiteUI.tsx` | 14 lines | Phase 3.2 (T10 `SectionHeading` responsive pairing) + Phase 5.1 (V5 eyebrow `copper-600→400`) | 1 | Yes | No — matches T10 and Phase 5.1's `SiteUI.tsx:19` note exactly. |
| `src/components/ui/Avatar.tsx` | 2 lines | Foundation (semantic-token normalization: `blue-*` → `info`) | 1 | Yes | No |
| `src/components/ui/Badge.tsx` | 16 lines | Foundation (semantic-token normalization across all 5 tones) | 1 | Yes | No |
| `src/components/ui/Button.tsx` | 43 lines | Foundation (new `accent`/`cta`/`cta-outline` variants, `cta` size, `to`-as-Link prop) | 1 | Yes | No — purely additive; existing variants/sizes unchanged in behavior. |
| `src/components/ui/Card.tsx` | 2 lines | Phase 3.1 (radius-compliance: `rounded-2xl` → `rounded-xl`, i.e. 16px→14px, both inside `Components.md`'s approved 12–16px range) | 1 | Yes | No |
| `src/components/ui/DataTable.tsx` | 246 lines | Foundation (adds sorting, pagination, row selection, sticky header, RTL-aware `align`, JetBrains Mono `mono` column option) | 1 | Yes | No — by far the largest diff in the tree; matches `UI-COMPONENT-INVENTORY.md`'s scope, but its size alone warrants a normal code-review pass (not a hygiene flag, just due diligence given the diff is ~4x the size of the next-largest file). |
| `src/components/ui/Input.tsx` | 51 lines | Foundation (`success`/`helperText` states, `aria-*` attributes, logical-property `ps-`/`start-`) | 1 | Yes | No |
| `src/components/ui/Progress.tsx` | 8 lines | Foundation (semantic-token normalization) | 1 | Yes | No |
| `src/components/ui/StatCard.tsx` | 23 lines | Phase 3.1 (radius fix) + Foundation (token normalization, `comparison`/`period` props) | 1 | Yes | No |
| `src/main.tsx` | 9 lines | Foundation (RTL scaffold) | 4 — Unknown/requires review | **No, not without confirming intent** | **Yes — flagged finding.** See "Key Findings" below: mounts `LanguageProvider` into the render tree, contradicting `RTL-READINESS-NOTE.md`'s explicit claim that nothing is mounted and the app's runtime is unchanged. |
| `src/pages/AiPlatform.tsx` | 6 lines | Foundation (semantic-token normalization) | 1 | Yes | No |
| `src/pages/Dashboard.tsx` | 8 lines | Foundation (semantic-token normalization) | 1 | Yes | No |
| `src/pages/Settings.tsx` | 2 lines | Foundation (semantic-token normalization) | 1 | Yes | No |
| `src/pages/SupplierPortal.tsx` | 4 lines | Foundation (semantic-token normalization) | 1 | Yes | No |
| `src/pages/site/About.tsx` | 91 lines | Phase 1 (content) + 3.1/3.2 (component reuse, typography) + 4.1/4.2 (shadow/icon/motion) + 5.1 (copper eyebrows) | 1 | Yes | No — matches all five phases' documented file lists. |
| `src/pages/site/Contact.tsx` | 36 lines | Phase 1 + 3.1/3.2 + 4.1 (not touched by 4.2 card-grid motion or 5.1, per those phases' explicit scope notes) | 1 | Yes | No |
| `src/pages/site/Home.tsx` | 84 lines | Phase 1 + 2 (CTABand import) + 3.2 (T13/T14 display tokens) + 4.1/4.2 (shadow/icon/motion) + 5.1 (copper CTA + eyebrows) | 1 | Yes | No |
| `src/pages/site/Industries.tsx` | 16 lines | Phase 1 + 3.1/3.2 + 4.1/4.2 (not touched by 5.1) | 1 | Yes | No |
| `src/pages/site/PlatformOverview.tsx` | 79 lines | Phase 1 + 2 (D4 CTA closure) + 3.1/3.2 + 4.1/4.2 + 5.1 (copper CTA) | 1 | Yes | No |
| `src/pages/site/Services.tsx` | 33 lines | Phase 1 + 2 (renamed to Products & Capabilities hub) + 3.1/3.2 + 4.1/4.2 (not touched by 5.1) | 1 | Yes | No |
| `src/pages/suppliers/SupplierDetail.tsx` | 8 lines | Foundation (semantic-token normalization) | 1 | Yes | No |
| `tailwind.config.js` | 34 lines (additions only) | Phase 3.2 (`fontSize` 12-token scale) | 1 | Yes | No — diff confirmed to be exactly the `fontSize` block; `colors`/`boxShadow`/`animation`/`keyframes` sections are unchanged (already in the last commit, `5a52bdf`). |

---

## Key Findings

1. **`src/main.tsx` mounts `LanguageProvider`, contradicting `RTL-READINESS-NOTE.md`.**
   The note (untracked, Foundation-dated 2026-08-07) states in its own words: *"Nothing above
   is imported by `main.tsx`... The app's runtime behavior is unchanged today."* The current
   working tree's `src/main.tsx` diff shows `LanguageProvider defaultLanguage="en"` now wraps
   `<App />`. The note's own "Next steps" section lists this as step 2, sequenced *after* step 1
   ("Decide the six open items") — so this appears to be a step taken out of its documented
   order. Practically low-risk (default is `en`/`ltr`, so no visible change per the note's own
   "zero visual diff" characterization of this exact step), but it is a real documentation/code
   mismatch and, per standing governance ("do not start Persian translation without RTL/content
   decisions resolved first"), the kind of thing that should be either reverted, or explicitly
   confirmed and then have `RTL-READINESS-NOTE.md` updated to match — not committed silently as
   though it were still inert.

2. **`WEBSITE-ARCHITECTURE-CONFLICT-REPORT.md` carries a stale `status: Open`.** The four
   conflicts it raised (visual authority, page-structure, and two others per its own count) were
   resolved the same day via the D1–D4 decision record and executed in Phase 2, per
   `SESSION-HANDOFF-WEBSITE-PHASE2.md` and `PHASE2_IMPLEMENTATION_PLAN.md`. The conflict-report
   file itself was never updated to reflect that. A future session searching for open governance
   conflicts would get a false positive from this file's frontmatter alone.

3. **An earlier, abandoned design-direction track exists but was never marked superseded.**
   `ETA-DESIGN-SYSTEM.md`, `FIGMA-DESIGN-PLAN.md`, `FIGMA-BUILD-SPEC.md` (all dated 2026-08-04,
   all still `status: Draft — for review`) proposed an independent design system and Figma
   workflow. `SESSION-HANDOFF-UI-FOUNDATION.md` (2026-08-07) explicitly states this track "was
   not used as authority for any decision" — the project instead worked directly from
   `ETA-Blueprint`'s Approved Visual Identity docs. These three files were never deleted,
   archived, or annotated as superseded; they remain committable as-is but could mislead a
   future reader into treating them as live design direction.

4. **Several `NEXT-SESSION-*` / `NEXT-*-TASK.md` "Queued" docs are stale pointers to work that
   has since happened differently or already completed** (`NEXT-SESSION-TASK.md`,
   `NEXT-WEBSITE-TASK.md`, `NEXT-SESSION-WEBSITE-PHASE3-START.md`,
   `NEXT-SESSION-WEBSITE-PHASE3-3-START.md`, `NEXT-SESSION-WEBSITE-PHASE4-START.md`). This is
   expected churn for a fast-moving delivery log, not a defect, but future sessions should treat
   `ETA-WEBSITE-PHASE-STATE-SNAPSHOT.md` (already committed, `54fde39`) as the authoritative
   "what's next," not any of these superseded queue files.

5. **`.claude/launch.json`'s dev-server port change (5173→5182) is a one-session convenience,
   not a deliverable.** Safe to commit, but worth a deliberate yes/no rather than folding it in
   with unrelated work, since it changes the shared default port config.

6. **Three site pages (`EquipmentSupply.tsx`, `SteelTrading.tsx`, `SupplierNetwork.tsx`) have
   never been committed at all.** Everything about them checks out against the phase record, but
   because there is no prior committed version, the first commit will be a full-file add rather
   than an incremental diff — flagged for a one-time full read, not because anything specific
   looks wrong.

---

## Summary counts

| Category | Count |
|---|---|
| Completed Phase work (Category 1) | 55 |
| Documentation only, no phase-execution content (Category 2, standalone) | 1 (`UI-DESIGN-AUDIT.md`) |
| Tooling changes (Category 3) | 1 (`.claude/launch.json`) |
| Unknown / requires review (Category 4) | 7 (`ETA-DESIGN-SYSTEM.md`, `FIGMA-BUILD-SPEC.md`, `FIGMA-DESIGN-PLAN.md`, `NEXT-SESSION-TASK.md`, `WEBSITE-ARCHITECTURE-CONFLICT-REPORT.md`, `src/main.tsx`, `src/i18n/LanguageContext.tsx` in conjunction with `main.tsx`) |
| **Total tracked+untracked items audited** | **64** |

(Counts overlap by design — e.g. a stale "Queued" doc is still Category 1 content wearing a
Category 4 staleness flag; the table above assigns each file's *primary* triage category.)

---

## No action taken

Per instruction: nothing was staged, committed, reset, or modified during this audit. This
report is the only file this pass created.

STOP after report creation.
