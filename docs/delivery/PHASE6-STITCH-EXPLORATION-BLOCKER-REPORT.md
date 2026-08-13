---
title: Phase 6 — Stitch Exploration Blocker Report
document_id: ETA-PHASE6-STITCH-003
status: Blocker report — record of a completed exploration attempt; not a decision record and not an implementation authorization
date: 2026-08-13
authority: >
  ETA-Blueprint/13-DECISIONS/ETA-AI-TOOLING-WORKFLOW-EXPANSION-DECISION-D6.md (D6, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-PROTOTYPE-DATA-GOVERNANCE-DECISION-D8-PROPOSAL.md (D8, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-BUSINESS-ENTITY-ALIGNMENT-DECISION-D7-PROPOSAL.md (D7, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-PLATFORM-IDENTITY-AI-WORKFLOW-DECISION-D5.md (D5, Approved),
  ETA-Blueprint/13-DECISIONS/ETA-STITCH-DESIGN-SYSTEM-LIMITATION-REPORT.md (analysis, 2026-08-13)
scope: >
  Documents the Stitch exploration attempt of 2026-08-13 — what was set up, what was found, and
  why screen generation is paused. No code, repository change, or commit. No screens exist.
companion_documents: >
  PHASE6-SUPPLIER-INTELLIGENCE-UX-DEFINITION.md (business UX definition),
  PHASE6-SUPPLIER-INTELLIGENCE-STITCH-BRIEF.md (governed specification, v2),
  PHASE6-SUPPLIER-INTELLIGENCE-STITCH-EXECUTION-PROMPT.md (manual execution package)
---

# Phase 6 — Stitch Exploration Blocker Report

Record of the Google Stitch exploration attempt for Supplier Intelligence Screen A (Supplier Directory), 2026-08-13. Written so the work done is not repeated and the reasons for pausing are not rediscovered.

---

## 1. Setup Completed

All three setup stages succeeded. The exploration is blocked at generation, not at configuration.

### 1.1 MCP connected

A Google Stitch MCP server became available in-session, resolving the blocker recorded in `PHASE6-SUPPLIER-INTELLIGENCE-STITCH-BRIEF.md` §10 (which documented that no Stitch connector existed and the session could not sign into `stitch.withgoogle.com`).

Tools exercised successfully: `create_project`, `get_project`, `list_projects`, `list_screens`, `create_design_system`, `update_design_system`, `list_design_systems`. All read and configuration operations behaved normally throughout.

### 1.2 Project created

| Field | Value |
|---|---|
| Project | `projects/15592083762115657427` |
| Title | ETA Supplier Intelligence MVP UX Exploration |
| Type | `PROJECT_DESIGN` |
| Visibility | `PRIVATE` |
| Device type | `DESKTOP` |
| Created | 2026-08-13T15:02:40Z |

No repository was connected. No code was exported.

### 1.3 Design system attached

| Field | Value |
|---|---|
| Asset | `assets/1832919173257955302` |
| Name | ETA Enterprise Procurement Digital Design System |
| Scope at creation | Global (no project association) |
| Attachment | Confirmed — `screenInstances` contains a `DESIGN_SYSTEM_INSTANCE` for the asset |

Every submitted token traced to an Approved ETA-Blueprint document: colours to `Colors.md` (ETA-VISUAL-001), the twelve-level type scale to `Typography.md` (ETA-VISUAL-002), and `ROUND_TWELVE` to `Components.md` (ETA-VISUAL-005), which specifies 12–16px card corners. The supplied `designMd` carried the full governance rule set — the 70/20/10 usage ratio, the forbidden-colour list, the Risk Level rule, the evidence-orientation rule, the AI proposes / human approves principle, and the three-part status rule.

**Attachment confirmation was delayed.** Immediately after `update_design_system`, both `get_project` (`designTheme: {}`) and `list_design_systems` returned empty, and this was reported at the time as unconfirmed rather than claimed as successful. A later read showed the instance present. The attachment worked; the read endpoints lagged.

---

## 2. Findings

### 2.1 Design system transformation limitation

Stitch does not store a supplied design system as given. It treats supplied colours as **seeds** for Material-style dynamic colour generation, discards fields it does not model, and replaces the supplied specification document with one of its own authorship.

Confirmed by direct read of the stored project theme:

| Approved value | Stored and rendering |
|---|---|
| Primary — ETA Navy `#0F172A` | `primary: #000000` |
| Accent — ETA Copper `#C57B39` | `secondary: #8e4e0d`, plus orange containers `#ffac65`, `#ffdcc3`, `#ffb77d` |
| Cards 12–16px corners (ETA-VISUAL-005) | `roundness` field absent; Stitch-authored text mandates **0px sharp** |
| Cards carry soft shadow (ETA-VISUAL-005) | Stitch-authored text: *"avoids shadows and blurs"* |
| H1 40 / H2 32 / H3 24 / Body 16 (ETA-VISUAL-002) | 30 / 24 / 18 / 14 — compressed roughly one step |
| Display, Heading 4, Caption levels | Absent |
| Success `#16A34A`, Warning `#F59E0B`, Information `#2563EB` | **No tokens exist** |

The approved hex values survive only in the `override*` seed fields, which are not what renders.

Two silent substitutions compounded this: `colorVariant` was changed from the submitted `NEUTRAL` to `FIDELITY`, and both `roundness` and the supplied `designMd` were discarded outright.

Full analysis: `ETA-Blueprint/13-DECISIONS/ETA-STITCH-DESIGN-SYSTEM-LIMITATION-REPORT.md`.

### 2.2 Material theme drift is not avoidable by parameter omission

A third generation attempt deliberately passed **no** `designSystem` parameter, to test whether Material theme generation could be bypassed. It cannot:

- The `generate_screen_from_text` contract states that when `designSystem` is omitted, *"a default design system will be used."* Omission selects a **different** theme; it does not disable theming.
- The project retains its stored `designTheme` at project level, independent of what any individual generation call passes.

Omitting the parameter therefore produces a theme-unspecified generation, not a theme-free one. **The drift in §2.1 cannot be escaped through the API surface.** Avoiding it requires either prompt-level colour control or a different tool.

### 2.3 Generation service timeout

Three attempts to generate Screen A, all failed:

| Attempt | Design system passed | Outcome |
|---|---|---|
| 1 | `assets/1832919173257955302` | Timeout, then `The service is currently unavailable` on two subsequent calls |
| 2 | `assets/1832919173257955302` | Timeout |
| 3 | **None** | Timeout |

`list_screens` returned `{}` after every attempt, including polls extending several minutes past each. Following Stitch's own guidance — that a timed-out generation may still be running and must be polled rather than retried — the project was polled repeatedly across roughly twenty-five minutes. No screen ever appeared.

Read and configuration endpoints (`get_project`, `list_screens`, `list_design_systems`, `create_project`, `update_design_system`) responded normally throughout. **Only `generate_screen_from_text` failed.** Attempt 3 removed the design system as a variable and behaved identically, which isolates the failure to the generation service rather than to the request, the design system, or the prompt.

No fourth attempt was made, to avoid duplicate screens from a generation that may yet complete server-side.

---

## 3. Governance Conclusion

**Stitch remains UX exploration only.** D6.2 (Approved) already designates Stitch a temporary UI/UX exploration tool while Figma is unavailable, with output that is never production code and never copied into ETA-Platform. Nothing observed changes that scope. §2.1 supplies technical confirmation that the boundary was necessary rather than merely prudent.

**No Stitch output has implementation authority.** This holds for tokens, generated theme documents, and any screen produced later. Stitch's self-authored design document is internally coherent and in parts a sharp reading of the brief, but it is the tool's design opinion — and on colour, corner radius, shadow, and type scale it contradicts Approved ETA documents. It is not an ETA specification.

**ETA-Blueprint remains design authority.** `Colors.md` (ETA-VISUAL-001), `Typography.md` (ETA-VISUAL-002), and `Components.md` (ETA-VISUAL-005), all Approved, remain the sole authority for ETA digital UI. D1 (Approved) is unaffected. Nothing encountered in Stitch amends, supersedes, or qualifies any of them.

**Data governance held.** Only synthetic `SYN-` records were used, per D8.1/D8.2. No real supplier names, no `mockData.ts` content, and no real company data was transmitted to Stitch at any point. `mockData.ts` remains unmodified.

**No repository exposure.** No repository was connected, no code exported, and ETA-Platform was not modified.

---

## 4. Current Status

**Screen generation is paused.**

**No UI artifact exists.** Project `projects/15592083762115657427` contains one `DESIGN_SYSTEM_INSTANCE` and **zero screens**. There is nothing to review, compare, or carry into Founder Review from this attempt.

Consequently, the questions this exploration was commissioned to answer remain **open**:

- Card-based discovery versus dense enterprise list — which suits an industrial procurement audience
- Information density
- Procurement usability
- Evidence visibility — how "certificate on file" / "document pending" / "expired certificate" read at a glance
- Scanning speed

**What is preserved and reusable.** The blocker is the service, not the preparation. All of the following remain valid and require no rework:

- The governed specification — `PHASE6-SUPPLIER-INTELLIGENCE-STITCH-BRIEF.md` (v2, Founder-confirmed)
- The paste-ready prompt package — `PHASE6-SUPPLIER-INTELLIGENCE-STITCH-EXECUTION-PROMPT.md`, usable for a manual Founder-run session in the Stitch web interface
- The synthetic dataset — SYN-0001 to SYN-0008, including the deliberately hard cases: SYN-0003 (expiring certificate, evidence missing), SYN-0005 (expired certificate), SYN-0006 (Suspended and Non-compliant yet Preferred and well-certified), SYN-0008 (Draft, no documents, no risk assessment yet)
- The Stitch project and design system asset, both in place

**Open decision, not resolved here.** The limitation report sets out three options for the theme-fidelity problem — prompt-only control, Figma restoration, or accepting the limitation and using Stitch for structure only. That report recommends none, and this one does not either. The generation-service failure is additional evidence bearing on that choice, since it is independent of it.

---

## 5. Next Phase

**Prepare the Google AI Studio prototype brief** — Step 6 of the Phase 6 preparation workflow.

Scope, per D6.3 (Approved): prototype exploration only, limited to Supplier Intelligence, Tender Analysis, and AI Procurement Assistant concepts. Implementation remains blocked until Business Requirement, Functional Requirement, API/Data decision, UI decision, Component decision, and Test criteria are all defined and approved.

The brief would follow the same controlled-input pattern already established for Stitch: objective, constraints, synthetic data per D8, explicit exclusions, and the human-decision points that keep AI advisory. The AI interaction points are already defined in `PHASE6-SUPPLIER-INTELLIGENCE-UX-DEFINITION.md` §5 — Supplier Analysis, Risk Explanation, Document Review, Qualification Assistance — each with its approval point and its blocking dependency recorded.

Three constraints carry into that phase unchanged:

1. **D8 applies identically.** Synthetic or anonymized data only. `mockData.ts` and real supplier names remain prohibited for any external tool.
2. **D7.2 bounds the scope.** AI Metadata and Advanced Supplier Scoring are outside MOD-1 MVP. Risk Level remains human-assigned; AI may explain a recorded risk level and its stated basis, never produce or adjust one.
3. **Execution route to be confirmed.** Whether AI Studio is drivable from this session, or requires a manual Founder-run session as the Stitch execution package assumed, is not yet established and should be checked before the brief is written rather than after.

Screen A remains outstanding and can be picked up either by retrying Stitch once the generation service recovers, or by running the existing manual execution package directly in the Stitch web interface — no new preparation is needed for either route.

---

*Record of a completed attempt. No code, repository change, or commit. No screens were generated and no UI artifact exists. Synthetic data only, per D8. D5, D6, D7, and D8 remain in force unchanged; ETA-Platform and ETA-Blueprint visual identity documents are unmodified.*
