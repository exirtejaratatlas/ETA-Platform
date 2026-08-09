# Website Architecture Conflict Report

document_id: ETA-WEBSITE-CONFLICT-001
status: Resolved — see "Resolution" section below
date: 2026-08-08
resolved_date: 2026-08-08
resolved_by: `ETA-Blueprint/13-DECISIONS/ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md` (D1–D4, Decision Owner: Ali Hejazi, Founder & CEO, Status: Approved)
scope: Document/architecture conflict review only. No code, route, color, component, page, or navigation change was made in the course of producing this report.
trigger: Pre-implementation audit of ETA-Platform requested ahead of "ETA Website Phase 2 — Implementation Start," per instruction to stop before coding once conflicts were found.

---

## Resolution

All four conflicts logged in §6 were resolved the same day this report was written, via
`ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md` (Approved). Each of that record's D1–D4
entries answers the corresponding "Open Decision Required" item below one-to-one:

| This report's conflict | Resolved by | Outcome |
|---|---|---|
| D1 — Visual authority (Colors.md Navy/Copper vs. `eta-digital-hub`'s Teal/Orange "ADR-018") | Resolution Record D1 | Dual-layer system: `Colors.md` (Navy/Copper) governs the digital/UI layer; the logo/brand-mark layer stays separate and unchanged. `eta-digital-hub` is **not** an authority source for ETA-Platform. |
| D2 — Products & Capabilities structure (CR-001's 3 standalone pages vs. the baseline's 1 page/2 anchors) | Resolution Record D2 | CR-001 stands: three standalone top-level pages (Industrial Equipment Supply, Steel Sheet Trading, Supplier Network). |
| D3 — Navigation (5-item current vs. baseline's flat 4-item) | Resolution Record D3 | Neither prior option — new 6-item primary nav (Home / About / Products & Capabilities / Industries / Platform Vision / Contact), executed in Phase 2. |
| D4 — ETA Platform positioning/CTA (present-tense claims vs. baseline's forbid) | Resolution Record D4 | Future-vision positioning only, no present-tense capability claims — executed in Phase 2 (`PlatformOverview.tsx` CTA closure). |

Implementation of this resolution is documented in `SESSION-HANDOFF-WEBSITE-PHASE2.md` and
`SESSION-HANDOFF-WEBSITE-PHASE2-FINAL.md`. This status field was not updated at the time —
corrected here per `REPOSITORY-HYGIENE-AUDIT.md`'s finding that it had gone stale. The
conflict analysis below (§1–§6) is left as-written, as the historical record of what was found;
only the status metadata and this Resolution section are new.

---

## 1. Conflicts Found

Four distinct, unresolved conflicts exist between documents that each claim authority over the same public-website surface. None are cosmetic — each would materially change what gets built if acted on without resolution.

1. **Visual authority conflict** — two different, mutually exclusive color/typography systems are each asserted as "the" brand authority for the same website (§6, D1).
2. **Page-structure conflict** — the number and shape of the "Products & Capabilities" surface is defined two incompatible ways by two different approved-sounding documents (§6, D2).
3. **Navigation conflict** — the live site's navigation does not match the structure a newer document claims is frozen and authoritative (§6, D3).
4. **ETA Platform positioning/CTA conflict** — the live site presents the ETA Platform in present-tense, exploreable language that a newer document explicitly forbids (§6, D4).

Underlying all four: the newer document set (`ETA-WEBSITE-ARCHITECTURE-BASELINE.md` and its supporting Phase 2 documents) draws its visual and UX authority from a source repository that is explicitly excluded from consideration by governance — a provenance problem, not just a content disagreement. See §4.

---

## 2. Evidence Sources

All claims below were verified directly against the filesystem during the audit (file existence, file contents, `git remote`, `package.json`), not assumed from memory of any prior session.

| Source | Location | Verified status |
|---|---|---|
| Master governance | `~/Documents/GitHub/CLAUDE.md` | Read directly this session |
| ETA-Platform (implementation repo) | `~/Documents/GitHub/ETA-Platform/` | Audited directly: `package.json`, `tailwind.config.js`, `src/App.tsx`, `src/components/`, `src/pages/` |
| ETA-Blueprint (documentation authority, per `CLAUDE.md`) | `~/Documents/GitHub/ETA-Blueprint/20-BRANDING/` | `Colors.md` (ETA-VISUAL-001), `Services.md`, `Industries.md`, `Content.md`, `SEO.md`, `Sitemap.md` (ETA-SITEMAP-001) all confirmed to exist at the paths the baseline cites |
| CR-001 decision record | `~/Documents/GitHub/ETA-Blueprint/13-DECISIONS/DECISIONS.md` | Written in a prior phase of this same engagement; confirmed still present |
| Website Architecture Baseline | `/Users/ali/Documents/ETA/ETA-WEBSITE-ARCHITECTURE-BASELINE.md` | Located by filesystem search (not at the path implied when first requested); read in full |
| Phase 2 Implementation Handoff | `/Users/ali/Documents/ETA/ETA_Website_Phase2_Implementation_Handoff.md` | Located and read in full |
| Phase 2 Decision Log | `/Users/ali/Documents/ETA/ETA_Website_Phase2_Decision_Log.md` | Located and read in full (referenced by the baseline as superseded rationale record) |
| `docs/12-VISUAL_DIRECTION.md` (baseline's cited visual authority, "ADR-018") | `~/Documents/GitHub/eta-digital-hub/docs/12-VISUAL_DIRECTION.md` | Located and read. **Only exists inside `eta-digital-hub`** — not in ETA-Blueprint, not in ETA-Platform. |
| `docs/07-SITEMAP.md`, `docs/08-USER_JOURNEY.md` (baseline's cited persona/journey rationale) | `~/Documents/GitHub/eta-digital-hub/docs/` | Located. **Only exist inside `eta-digital-hub`.** No equivalent found in ETA-Blueprint or anywhere else searched. |
| "ADR-018" itself | Searched `eta-digital-hub`, `ETA-Blueprint` (both copies — see below), and system-wide via `mdfind` | **Not found as a standalone document anywhere.** Only appears as an in-text citation inside the three Phase 2 documents themselves. |
| `eta-digital-hub` identity | `package.json` (`"name": "tanstack_start_ts"`), `.lovable/config` (`"template": "tanstack_start_ts_current"`), `git remote -v` (`github.com/exirtejaratatlas/eta-digital-hub`) | Confirmed this is a Lovable-managed TanStack Start scaffold — a real, separate repository, not a documentation folder |
| Second "ETA-Blueprint"-named tree | `/Users/ali/Documents/ETA/ETA-Blueprint/` | Exists, but has an entirely different folder taxonomy (`00-VISION`, `01-BUSINESS`, `02-BLUEPRINT`, `03-ARCHITECTURE`, `50-KNOWLEDGE`, etc.) from `~/Documents/GitHub/ETA-Blueprint/`'s `20-BRANDING/`-style structure, and has **no `20-BRANDING` folder at all**. Flagged for awareness — not resolved here (see §6). |

---

## 3. Current ETA-Platform Reality

Verified directly from the repository, not inferred from any handoff document.

**Stack:** React 19.2.7, Vite 8.1.1, Tailwind CSS 3.4.15, React Router 7, Supabase client. Single package, no monorepo. No Next.js, Turborepo, TanStack, Lovable, or Radix present anywhere in `package.json` or `node_modules`.

**UI library:** None external — hand-built component set at `src/components/ui/` (Button, Card, Input, Badge, Avatar, DataTable, Modal, Progress, Spinner, StatCard, PageHeader, Alert, Drawer, EmptyState, Select, Skeleton, Tabs, Toast).

**Design tokens (`tailwind.config.js`):** `surface` (Navy family, `surface-900 = #0F172A`), `copper` (`copper-500 = #C57B39`), semantic `success/warning/error/info`, fonts Inter / Vazirmatn / JetBrains Mono. Matches `ETA-Blueprint/20-BRANDING/04-Visual-Identity/Colors.md` (ETA-VISUAL-001, status Approved) exactly.

**Public pages (9), all live in `src/pages/site/` and routed in `src/App.tsx`:** Home, About, Industries, Services, Equipment Supply, Steel Trading, Supplier Network, Platform Overview, Contact. The last three (`/equipment-supply`, `/steel-trading`, `/supplier-network`) were added per **CR-001**, logged in `ETA-Blueprint/13-DECISIONS/DECISIONS.md` before they were coded.

**Navigation (`SiteHeader.tsx`):** 5 primary items — About, Industries, Services, ETA Platform, Contact — plus a "Platform Preview" link and a "Request a Quote" CTA.

**Footer (`SiteFooter.tsx`):** Two link columns (Company: 7 links including the 3 CR-001 pages; ETA Platform: 4 links) plus an Offices column.

**Home page CTA/Platform section:** Hero has a primary "Request a Quote" and a secondary "Explore ETA Platform" CTA. A dedicated section reads, present-tense: *"The ETA Platform integrates: CRM, Procurement, Supplier Portal, Manufacturer Portal, AI Assistant, Dashboard, Analytics, Document Intelligence, Knowledge Base."*

---

## 4. Conflicting Documents

| Document | Where it lives | What it claims |
|---|---|---|
| `ETA-Blueprint/20-BRANDING/04-Visual-Identity/Colors.md` (ETA-VISUAL-001) | `~/Documents/GitHub/ETA-Blueprint/` | Status: **Approved**. Navy `#0F172A` / Copper `#C57B39` is the ETA brand palette. No mention of any deprecation. |
| `ETA-Blueprint/20-BRANDING/03-Website/Sitemap.md` (ETA-SITEMAP-001) | `~/Documents/GitHub/ETA-Blueprint/` | Status: **Approved**. Full multi-section sitemap (Home, About, Industries, Services, ETA Platform, Manufacturers, Suppliers, Projects, Knowledge Center, Blog, Careers, Contact, Legal, plus Customer/Supplier Portals). |
| `ETA-Blueprint/13-DECISIONS/DECISIONS.md` — CR-001 | `~/Documents/GitHub/ETA-Blueprint/` | Approved (this engagement, prior phase). Adds Industrial Equipment Supply, Steel Sheet Trading, and Supplier Network as three **standalone top-level pages**. |
| `ETA-WEBSITE-ARCHITECTURE-BASELINE.md` | `/Users/ali/Documents/ETA/` | Status: **"v1.0 (FROZEN), APPROVED FOR IMPLEMENTATION," approved_by: Ali Hejazi (Founder & CEO).** Declares Colors.md "deprecated per ADR-018" in favor of Teal/Orange; defines exactly 4 pages with Products & Capabilities as **one page, two anchor sections**; mandates flat 4-item nav/footer; forbids present-tense Platform language and the "Explore ETA Platform" CTA. Does not mention or reconcile with CR-001. |
| `ETA_Website_Phase2_Implementation_Handoff.md` | `/Users/ali/Documents/ETA/` | Restates the baseline as execution instructions for "Claude Code" against "ETA-Platform." Explicitly excludes the "ETA-System" monorepo and a "Lovable/TanStack Start scaffold... found in project knowledge in the prior session" as architecture references — but does not identify that scaffold as `eta-digital-hub` by name, and does not flag that the baseline's own visual-authority citation (`docs/12-VISUAL_DIRECTION.md`) lives inside that same excluded scaffold. |
| `ETA_Website_Phase2_Decision_Log.md` | `/Users/ali/Documents/ETA/` | Rationale record (D1–D4 in that document, not to be confused with this report's D1–D4) for the baseline's page-structure and CTA decisions, citing `docs/08-USER_JOURNEY.md` personas ("Kambiz," "Ramin") as justification — that document exists only inside `eta-digital-hub`. |
| `eta-digital-hub/docs/12-VISUAL_DIRECTION.md` | `~/Documents/GitHub/eta-digital-hub/` (confirmed Lovable/TanStack Start scaffold) | Status: **"v1.0 (FROZEN), Approved," owner: "Creative Director, Exir Tejarat Atlas."** Defines a "Dark Luxury Industrial" visual language (Teal `#04403F→#28A09A` / Orange `#FF7001→#FEA808` on near-black) for "Corporate Website, Customer Portal, Supplier Portal, and ETA Platform." This is the document the website baseline cites as deprecating Navy/Copper. |

---

## 5. Impact if Implemented

Stated neutrally, without recommending a resolution — for illustration only:

- **If the baseline were implemented as written:** the entire live color system (Navy/Copper, matching the Approved `Colors.md`) would be replaced with Teal/Orange sourced from a different, non-ETA-Platform, non-ETA-Blueprint repository. The three CR-001 pages would be deleted or merged away, reversing an already-approved, already-coded decision. Primary navigation would shrink from 5 items to 4, and the footer would lose 2 of its 3 columns. The Home page's Platform section and its "Explore ETA Platform" CTA would need to be rewritten.
- **If the baseline is disregarded and current ETA-Platform state is kept as-is:** the founder-approved-sounding baseline document (if genuinely authorized) would go unimplemented, and its stated rationale — B2B credibility risk from present-tense Platform overclaiming, buyer-persona-driven page splitting — would go unaddressed, if that rationale is itself sound independent of its flawed sourcing.
- **Either direction taken unilaterally right now would be a guess**, given the sourcing problem in §4: it isn't possible to tell, from the documents alone, whether the baseline reflects a genuine, informed founder decision that happens to cite the wrong file paths, or whether an prior agent session conflated `eta-digital-hub`'s design system with ETA-Platform's and produced a "frozen, approved" document on that mistaken basis.

---

## 6. Open Decisions Required

**D1 — Visual authority**
- `ETA-Blueprint/20-BRANDING/04-Visual-Identity/Colors.md` (ETA-VISUAL-001, Approved): **Navy `#0F172A` / Copper `#C57B39`** — currently implemented throughout ETA-Platform.
- vs. `eta-digital-hub/docs/12-VISUAL_DIRECTION.md` ("ADR-018", cited by the baseline as superseding authority): **Teal `#04403F→#28A09A` / Orange `#FF7001→#FEA808` on near-black.**
- `Open Decision Required` — which palette governs the public website going forward, and whether `eta-digital-hub` is meant to be an authority source for ETA-Platform at all (this is not established anywhere in `CLAUDE.md`'s repository governance table).

**D2 — Products & Capabilities structure**
- CR-001 (`ETA-Blueprint/13-DECISIONS/DECISIONS.md`, Approved): **three standalone pages** — Industrial Equipment Supply, Steel Sheet Trading, Supplier Network — already coded and live at `/equipment-supply`, `/steel-trading`, `/supplier-network`.
- vs. `ETA-WEBSITE-ARCHITECTURE-BASELINE.md` §2–§3: **one page** ("Products & Capabilities") with **two in-page anchor sections** (Domestic Steel Trading, Industrial Equipment & Procurement), no separate Supplier Network page implied.
- `Open Decision Required` — whether CR-001 stands, is superseded by the baseline, or needs its own explicit reconciliation decision.

**D3 — Navigation**
- Current implementation (`SiteHeader.tsx`/`SiteFooter.tsx`): 5-item primary nav (About, Industries, Services, ETA Platform, Contact) + Platform Preview + Request a Quote; 2-column footer with 11 total links.
- vs. `ETA-WEBSITE-ARCHITECTURE-BASELINE.md` §1: flat 4-item nav (Home | About | Products & Capabilities | Contact), footer mirrors the same 4 items + copyright only, no Portals/Legal/Sitemap columns.
- `Open Decision Required` — which navigation model is authoritative.

**D4 — ETA Platform wording and CTA behavior**
- Current implementation (`Home.tsx`): present-tense hero CTA "Explore ETA Platform"; a section stating "The ETA Platform integrates: CRM, Procurement, Supplier Portal, Manufacturer Portal, AI Assistant, Dashboard, Analytics, Document Intelligence, Knowledge Base."
- vs. `ETA-WEBSITE-ARCHITECTURE-BASELINE.md` §5 and §4: "Explore ETA Platform" CTA **retired entirely**; all Platform-related copy must use forward-looking vision framing only, never present-tense capability claims; no CTA may use "explore," "log in to," or "access" language about the Platform.
- `Open Decision Required` — which wording/CTA policy governs.

---

**At the time this report was written, no conflict above had been resolved, and no code, route, color, component, page, or navigation change was made in producing it.** All four were subsequently resolved the same day — see "Resolution" section near the top of this document.
