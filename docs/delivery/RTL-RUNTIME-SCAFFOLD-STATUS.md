---
title: RTL Runtime Scaffold Status
document_id: ETA-RTL-RUNTIME-STATUS-001
status: Current
date: 2026-08-09
authority: Read directly against the live `src/main.tsx`, `src/i18n/*`, and `src/components/site/SiteHeader.tsx` working-tree state; supersedes only the "nothing is mounted" claim in `RTL-READINESS-NOTE.md` (2026-08-07) — that document's technical description of the `src/i18n/` scaffold itself is otherwise still accurate and not restated here.
purpose: >
  Record the actual current runtime status of the RTL/i18n scaffold, corrected against the
  live code, so this doesn't have to be re-derived from a diff every session. Raised as a
  finding in `REPOSITORY-HYGIENE-AUDIT.md` §"Key Findings" #1 (`src/main.tsx` mounts
  `LanguageProvider`, contradicting `RTL-READINESS-NOTE.md`'s "nothing mounted" claim).
---

# RTL Runtime Scaffold Status

## Current state

- **`LanguageProvider` is mounted in `src/main.tsx`.** It wraps `<BrowserRouter><App /></BrowserRouter>`
  with `<LanguageProvider defaultLanguage="en">`. This is a change from what
  `RTL-READINESS-NOTE.md` (2026-08-07) describes — that document states the provider is "not
  imported by `main.tsx`... The app's runtime behavior is unchanged today." That claim is no
  longer accurate; this document is the current source of truth for mount status.
- **English remains the default language and the only language rendered.** `defaultLanguage="en"`
  is hardcoded at the mount site. `LanguageContext.tsx`'s own default (absent an explicit prop)
  is also `en`/`ltr`. No user-facing control changes this at runtime.
- **Persian translation has not started.** `src/i18n/fa.ts` remains 100% placeholder — every key
  resolves to the literal string `"Open Decision Required"`, exactly as `RTL-READINESS-NOTE.md`
  originally documented. No Persian marketing copy has been authored anywhere in the codebase.
- **RTL migration has not started.** `<html dir>` only flips if `LanguageProvider`'s language
  state changes to `"fa"`, which nothing in the app currently triggers —
  `LanguageSwitcher.tsx` (the only UI that could trigger it) is not imported or rendered
  anywhere (confirmed by repo-wide grep). The 9 files identified in `RTL-READINESS-NOTE.md`'s
  CSS audit as using physical-direction Tailwind utilities (`ml-`, `mr-`, `pl-`, `pr-`, `left-`,
  `right-`, etc.) have not been converted to logical properties.
- **All 6 RTL open decisions logged in `RTL-READINESS-NOTE.md` remain open**: numeral system,
  calendar system, icon-mirroring policy, nav order under RTL, per-component RTL behavior for
  data-dense components, and Vazirmatn self-hosting. None has been answered by this or any
  other document since.

## Net effect / risk assessment

Mounting `LanguageProvider` with a hardcoded `en` default is, in isolation, a zero-visual-diff
change — `RTL-READINESS-NOTE.md`'s own "Next steps" section lists this exact step as "safe
anytime." The issue is not runtime risk; it's that the step was taken without updating the
document that describes it, so the written record no longer matches the code. This document
corrects that.

This mount does **not** constitute starting Track B (Persian translation) or RTL implementation
under standing governance ("do not start Persian translation without RTL/content decisions
resolved first") — no translated content is live, no RTL layout is reachable, and no decision
has been presumed or acted on. It is inert scaffolding wiring, one step ahead of where the
written record said it was.

## What this document does not do

- Does not resolve any of the 6 open RTL decisions.
- Does not mount `LanguageSwitcher` or expose any user-facing language control.
- Does not begin logical-property conversion of the 9 flagged files.
- Does not author any Persian content.

## Recommended follow-up (not executed here)

- Update `RTL-READINESS-NOTE.md`'s "What was intentionally NOT done" table to reflect that the
  `main.tsx` mount step has, in fact, been done — or explicitly revert the mount if it was
  unintentional. Whichever is chosen, the two documents should agree with each other and with
  the code afterward. This document does not decide which outcome is correct; it only records
  the discrepancy so a decision can be made deliberately.
