# MVP Visual & Content Audit — ETA-Platform vs. ETA-Blueprint

document_id: ETA-AUDIT-001
status: Draft — for review
scope: Visual/content audit only. No code was modified while producing this report.
date: 2026-08-03
compared_against: ETA-Blueprint `20-BRANDING/*`, `01-BUSINESS/*` (status: Approved)

---

## Method

Read the approved brand/content source of truth in ETA-Blueprint (`20-BRANDING/01-Brand`, `02-Company-Profile`, `03-Website`, `04-Visual-Identity`, and `01-BUSINESS/Company DNA.md`, `Stakeholders.md`), then compared it against what actually renders/exists in ETA-Platform: `tailwind.config.js`, `public/*`, `src/pages/site/*`, `src/components/site/*`, `src/pages/*` (internal app), `src/lib/mockData.ts`, `index.html`, `package.json`, and current `git status`/`git diff`. No architecture, entity, or business-rule judgment calls were made — this is a conformance check against already-approved Blueprint documents.

---

## Executive Summary

The new public marketing site (Home, About, Services, Industries, Contact — currently **untracked** in git) is in strong shape: its copy is close to word-for-word from `20-BRANDING/03-Website/Content.md`, and its color usage (Navy `#0F172A` + Copper `#C57B39`) correctly implements `04-Visual-Identity/Colors.md`. The two most serious problems are elsewhere:

1. **The real ETA logo is not used anywhere in the running app**, and a pending uncommitted change would overwrite the one correct logo file in the repo with a generic placeholder — a direct violation of the "never replace the logo" governance rule.
2. **The internal application shell (Dashboard, CRM, Procurement, Suppliers, Sidebar, Header) runs on a different, older color system** than the new public site, so the product visibly switches brand identity the moment a visitor clicks "Platform Preview."

Beyond that, several supplier/company mock records are modeled on real, named Iranian companies (their catalogs sit in the workspace root) with fabricated emails, ratings, and compliance flags attached — a realism/representation risk if this build is ever demoed externally without disclaimer.

---

## 1. Missing ETA Identity

| # | Finding | Severity |
|---|---|---|
| 1.1 | **The real ETA logo/wordmark is never rendered anywhere in the app.** `SiteHeader.tsx`, `SiteFooter.tsx`, and `Sidebar.tsx` all load `/logo.svg` (lowercase). That file is a generic navy/gold abstract "mountain + circle" icon that is **not** the ETA brand mark — it has existed since near the initial commit as placeholder scaffolding. The actual logo — byte-identical to the workspace-root `Logo.svg` (the teal/orange Atlas-mountain wordmark with the "b" gradient defs) — sits correctly at `public/Logo.svg` (capital L) and is simply never referenced by any component. | Critical |
| 1.2 | **An uncommitted working-tree change currently overwrites the one correct logo asset.** `git status` shows `modified: public/Logo.svg`; `git diff` confirms the real 667×282 wordmark SVG (teal/orange gradients, `#ff7001`, `#28a09a`, etc.) has been replaced in the working directory with the same 64×64 placeholder graphic used by `logo.svg`. If this is committed, the only correct logo file in the repository would be destroyed. This directly contradicts the governance rule: *"Use the existing logo — do not replace it or create alternative logos"* (root `CLAUDE.md`, and repeated in `ETA-Platform/CLAUDE.md`). **Recommend discarding this specific change before any commit.** | Critical |
| 1.3 | `public/mark.svg` and `public/type.svg` **are** byte-identical to the correct root brand assets and are untouched — the correct symbol-only and wordmark-only marks exist and are safe, they're just not wired into any component. | Info |
| 1.4 | `index.html`'s favicon `<link>` points at `/logo.svg` (the placeholder), not `/favicon.svg`. Separately, `public/favicon.svg` is a *third*, unrelated icon in purple (`#863bff`) that matches none of the approved palette (Navy/Copper/Gold) — it isn't real ETA branding either, and it isn't even linked. | Medium |
| 1.5 | No component uses `mark.svg` (icon-only) for compact contexts (e.g., mobile nav collapsed state, favicon) even though it exists and is correct — a missed opportunity once 1.1 is fixed. | Low |

**Net effect:** as currently running, not a single screen in ETA-Platform displays the real Exir Tejarat Atlas logo.

---

## 2. Missing Company Information

| # | Finding | Severity |
|---|---|---|
| 2.1 | **Contact page has no actual contact details.** `Contact.tsx` shows only a form and three CTA labels ("Request a Quote," "Contact Sales," "Book a Meeting") — no phone number, no email address, no physical/office address. `ETA-Blueprint/20-BRANDING/03-Website/Sitemap.md` explicitly requires an "Office Information" subsection under Contact; it does not exist. The form itself has no backend (`// No CRM/email backend wired yet` — acknowledged in code), so submissions go nowhere. | High |
| 2.2 | Footer (`SiteFooter.tsx`) shows only `www.exiratlas.com` — no phone, email, or registered address anywhere on the site. Note: ETA-Blueprint itself does not yet contain a canonical company address/phone/email document to source this from either — this is a gap in Blueprint, not just Platform. | High |
| 2.3 | No leadership, founder, or team bios anywhere, despite `Sitemap.md` listing "Leadership" and "Company Timeline" as required About subsections. As with 2.2, Blueprint currently has no leadership-bio content to draw from (`01-BUSINESS/Stakeholders.md` defines *roles*, e.g., CEO, Procurement Director, not named people) — this needs a Blueprint-side decision (what, if anything, to publish about real people) before it can be implemented. | Medium |
| 2.4 | No case studies / project history / "Industry Experience" content, despite `Sitemap.md` defining a full "Projects" section (Case Studies, Success Stories, Industry Experience). Expected at this stage (Sprint 1 scope is Supplier Intelligence, not a content site build-out), but flagging so it isn't lost against the approved sitemap. | Low (expected gap) |

---

## 3. Incorrect Assumptions

| # | Finding | Severity |
|---|---|---|
| 3.1 | **Both governance files (`CLAUDE.md` at the GitHub root and `ETA-Platform/CLAUDE.md`) state the brand colors as "ETA Green" and "ETA Orange."** This does not match ETA-Blueprint's approved, authoritative color spec — `20-BRANDING/04-Visual-Identity/Colors.md` (doc `ETA-VISUAL-001`, status **Approved**) — which defines the primary brand colors as **ETA Navy (`#0F172A`)** and **ETA Copper (`#C57B39`)**. There is no "ETA Green" anywhere in the approved palette (only a small semantic "success" green, used the same way any status-green is used in any app). If taken literally, this instruction would lead future work to build an off-brand green/orange UI. **This is a documentation defect in the governance files themselves, not in the Platform code** — the actual new site implementation (Navy + Copper) is the one that's correct; the CLAUDE.md files describing it are wrong. Recommend correcting both CLAUDE.md files to say Navy + Copper, or filing this as a Blueprint clarification if "Green/Orange" was meant to describe something else (e.g., an earlier/rejected concept) that should be formally retired. | High |
| 3.2 | Tailwind config (`tailwind.config.js`) carries three full color ramps — `brand` (blue), `gold`, `teal` — with an inline comment saying they were "extracted from the Exir Tejarat Atlas logo." The real logo (see §1) is teal/orange/navy, not blue — so the `brand` blue ramp does not actually derive from the logo as claimed. This is a leftover assumption from before the Blueprint Colors.md spec existed (the `copper` ramp, added later, correctly cites `ETA-VISUAL-001` in its own comment). | Medium |

---

## 4. UI Gaps

| # | Finding | Severity |
|---|---|---|
| 4.1 | **Split-brand experience between marketing site and app shell.** The new public pages (Home/About/Services/Industries/Contact — untracked in git, i.e., newly added) correctly use `surface-900` (Navy) + `copper-*` per Blueprint. But the internal app — `Dashboard.tsx`, `Sidebar.tsx`, `Header.tsx`, CRM pages, Procurement, Suppliers, AI Platform (all pre-existing, shown as `modified` in `git status`) — still runs on the older `brand-*` (blue), `gold-*`, `teal-*` token set, plus raw Tailwind defaults (`green-500`, `amber-50`, `red-50`) that aren't in the approved semantic palette at all. A visitor who clicks "Platform Preview" in the header sees the brand identity visibly change from copper/navy to blue/gold/teal. This is the single largest visual-consistency gap in the current MVP. | High |
| 4.2 | **No Persian/RTL content exists**, despite governance requiring "Languages: Persian (RTL), English (LTR)." The only RTL-related code is one inert CSS rule in `index.css` (`[dir="rtl"] { font-family: Vazirmatn }`); Vazirmatn is loaded via CDN but no page, component, string, or language switcher uses it. RTL support today is unused scaffolding, not a working feature. | Medium |
| 4.3 | "Platform Preview" is linked directly from the public site's main nav with no login gate or "demo data" labeling — anonymous visitors land straight on live-looking CRM/Procurement/Supplier screens populated with the fabricated data described in §5, with nothing in the UI indicating it's mock/preview data. | Medium |
| 4.4 | Sections defined in the approved `Sitemap.md` but not yet built: Manufacturers, Projects/Case Studies, Knowledge Center, Blog, Careers, Legal (Privacy Policy/Terms/Cookie Policy), Customer Portal. Expected for Sprint 1 scope (MOD-1 Supplier Intelligence) — listed here only to track against the full approved sitemap, not as something to build now. | Low (expected) |
| 4.5 | Contact form has no success/failure state beyond a static "Thank you" — fine for Sprint 1, but should be clearly marked "demo" if ever shown outside the team, since it currently looks fully functional. | Low |

---

## 5. Data Realism Issues

| # | Finding | Severity |
|---|---|---|
| 5.1 | **Mock supplier/company records are modeled directly on real, named Iranian industrial companies** whose product catalogs already sit in the workspace root — this isn't generic placeholder data: <br>• `کاتالوگ محصولات امیرکبیر کاشان.pdf` → `"Amirkabir Kashan Steel"` (sup-000125) <br>• `کاتالوگ محصولات فولاد مبارکه.pdf` → `"Foolad Mobarakeh Trading"` (sup-000148) <br>• `کاتالوگ محصولات فولادیار کوروش.pdf` → `"Kourosh Steel Partners"` / `"Kourosh Industrial Group"` (sup-000189 / co-2) <br>• `کاتالوگ محصولات نورد گرم سمنان.pdf` → `"Semnan Hot Rolling Mills"` / `"Semnan Rolling Partners"` (sup-000174 / co-3) <br>• `کاتالوگ محصولات شرکت تارتن.pdf` → `"Tartan Products Co."` / `"Tartan Holding"` (sup-000162 / co-1) <br><br> Foolad Mobarakeh in particular is a large, well-known public Iranian steel producer. The mock data attaches **fabricated** emails, phone numbers, star ratings, `compliance_status` (`compliant`/`non_compliant`/`under_review`), and `risk_level` to these real company names with no "for demonstration purposes only" disclaimer anywhere in the UI. This is a genuine representation risk if the platform is ever demoed to a prospect, partner, or the public in its current state — it could easily read as ETA making real claims about these companies' compliance or performance. | High |
| 5.2 | `mockAiModels` (`src/lib/mockData.ts`) lists live-looking entries for `provider: "anthropic"`, `"openai"`, and `"google"` as if ETA already has production AI integrations with all three. No such integration exists, and "AI automation" / new integrations are explicitly **forbidden without a Change Request** at this sprint gate. The mock data overstates current AI capability beyond what's approved. | Medium |
| 5.3 | All deal/PO values are quoted in round-number USD (e.g., "$1,250,000 Q3 Coil Supply Agreement") for counterparties that are predominantly Iran-based per the same records' `country` field. A real ETA deployment would need to account for sanctions/banking constraints on USD invoicing with Iranian entities — likely fine as an MVP simplification, but worth naming so it isn't mistaken for a validated business assumption. | Low |
| 5.4 | CRM contact names (Reza Hosseini, Sara Amini, Kaveh Moradi, Nazanin Farhadi, Omid Rostami) are plausible, generic Persian names with sensible titles — no real-person or resume data appears to have leaked into demo content. This part is realistic and needs no change. | Info (no issue) |
| 5.5 | Dates across all mock records fall consistently within 2025–2026 and are internally coherent with "today" = 2026-08-03 (e.g., PO dates precede delivery dates, supplier onboarding precedes certification events). No fix needed. | Info (no issue) |

---

## Summary Table

| Area | Critical | High | Medium | Low |
|---|---|---|---|---|
| Missing ETA Identity | 2 | 0 | 1 | 1 |
| Missing Company Info | 0 | 2 | 1 | 1 |
| Incorrect Assumptions | 0 | 1 | 1 | 0 |
| UI Gaps | 0 | 1 | 2 | 2 |
| Data Realism | 0 | 1 | 1 | 1 |

**Top 3 to resolve first (all documentation/asset-swap fixes, no architecture involved):**
1. Discard the uncommitted `public/Logo.svg` change and repoint `SiteHeader`/`SiteFooter`/`Sidebar`/`index.html` favicon to the real logo/mark assets (§1.1, §1.2, §1.4).
2. Correct the "ETA Green/Orange" claim in both `CLAUDE.md` files to match Blueprint's approved Navy/Copper (§3.1), then reconcile the internal app's `brand`/`gold`/`teal` tokens with `surface`/`copper` so the app shell matches the public site (§4.1).
3. Add a visible "Demo / Preview Data" indicator to the Platform Preview, and/or genericize the mock supplier names so they no longer map 1:1 to real companies without disclaimer (§5.1).

---

*No code was modified in the course of this audit, per instruction. This report is descriptive only — remediation should proceed as its own reviewed change, respecting the Sprint 1 gate (no architecture, entity, ERP, or AI-automation changes without a Change Request).*
