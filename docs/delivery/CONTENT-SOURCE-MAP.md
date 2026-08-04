# Content Source Map — ETA Platform MVP

document_id: ETA-CONTENT-MAP-001
status: Draft — governance artifact, created before any component changes per task instruction
date: 2026-08-04

---

## Purpose

Every content claim added to the public website or platform in this pass must trace to one of the verified sources below. This document records that trace **before** the corresponding React component is touched. No content in Task 2 was written without a row in this table.

---

## Source inventory

| ID | Document | Location | Nature |
|---|---|---|---|
| S1 | `ETA-Platform/CLAUDE.md` | this repo | Governance / company identity capsule |
| S2 | `docs/delivery/MVP-VISUAL-AUDIT.md` | this repo | Prior audit — confirms what's already correct vs. gaps |
| S3 | Mission.md, Vision.md, Value Proposition.md, Company DNA.md, Stakeholders.md | `ETA-Blueprint/01-BUSINESS/` | Approved (status: Approved) business strategy docs |
| S4 | Brand-Story.md, Company-Profile.md, Industries.md, Services.md, Content.md, Sitemap.md, Colors.md | `ETA-Blueprint/20-BRANDING/` | Approved branding & website copy master |
| S5 | CRM Domain.md, Customer Domain.md | `ETA-Blueprint/02-BLUEPRINT/Domains/` | Approved domain model (Opportunity/Lead/Quotation entities) |
| S6 | RFQ Entity.md, RFQ Attributes.md, RFQ Lifecycle.md | `ETA-Blueprint/04-DATA/Entities/RFQ/` | Approved RFQ entity — the full procurement-request model that the new Task 6 module sits *upstream* of |
| S7 | `Resume.pdf` (workspace root) | `~/Documents/GitHub/Resume.pdf` | **Not a personal résumé.** A 9-page ETA corporate capability brochure (EN cover + FA body). No individual name, career history, or personal credentials appear anywhere in it. |
| S8 | `Exir-Tejarat-Atlas-Catalogue-EN.pdf` | `~/Documents/ETA/01_Company/Catalog/` | 8-page "Edition 2026" corporate catalogue — the most current, most specific, and most self-audited source (see S10) |
| S9 | `Exir-Tejarat-Atlas-Catalogue-FA.pdf` | `~/Documents/ETA/01_Company/Catalog/` | Approved Persian counterpart of S8 — not yet mapped string-by-string (see Task 5 notes at bottom) |
| S10 | `NOTES.md` | `~/Documents/ETA/01_Company/Catalog/` | Build notes for S8/S9 — explicitly states "nothing was invented" and lists exactly which fields are still `to be completed` |

**Not found / not used:** `docs/company/Founder-Resume.pdf` and `docs/company/Company-Profile.pdf` do not exist at those paths anywhere in the workspace. S7 was checked first as the literal "Resume" file and ruled out as a personal résumé (see above). Per explicit user decision on 2026-08-04, **no named founder, title, or personal biography is published** — only ETA's own company-level experience claim is used.

---

## Mapping table

```
Source Document
        ↓
Verified Information Extracted
        ↓
Website Section
        ↓
React Component
```

| Source | Verified information extracted | Website section | React component |
|---|---|---|---|
| S8 p.2 | "Exir Tejarat Atlas is an industrial sourcing and supply company serving the oil, gas, petrochemical and steel sectors." + "more than 12 years of experience" (S7 p.2, company-level, not individual) | Home hero subhead; About → Company Background | `src/pages/site/Home.tsx`, `src/pages/site/About.tsx` |
| S8 p.2 | "We operate as two separate desks under one company" — Business Line 01 Industrial Equipment, Business Line 02 Steel Sheet; "2 offices — Tehran & U.A.E." | About → Company Background; Home → What We Do | `About.tsx`, `Home.tsx` |
| S8 p.2, p.7 | Payment instruments "Letter of Credit (LC) & Cash"; delivery window "10 days – 3 months, confirmed per order" | Services → Industrial Supply capability notes | `src/pages/site/Services.tsx` |
| S8 p.5 "Six reasons buyers keep the file with us" | 6 verbatim competitive-advantage statements (two channels one enquiry; positioned on both sides of the corridor; specification handled properly; payment terms that fit the order; lead times stated in writing; two desks that stay separate) | About → Engineering & Commercial Capability | `About.tsx` |
| S8 p.5 | Pull quote: "We would rather lose an enquiry than win it on a specification we cannot honour. That is the whole basis of the relationship." | About → Engineering & Commercial Capability (verbatim quote) | `About.tsx` |
| S8 p.7 "Company Record" | Registered name, Tehran head office (Dastgardi Street, Building 70, Unit 5) and UAE office (No. 104, Al Makhazan Stores, Investment Park 2) with phone numbers; sourcing markets "Iran · China" | Contact page office info; Footer | `src/pages/site/Contact.tsx`, `src/components/site/SiteFooter.tsx` |
| S3 Mission.md, Vision.md | "Help customers reduce procurement time, improve supplier quality, increase transparency" / "leading AI-native Enterprise Procurement Ecosystem... across the Middle East" | Home → Mission/Vision cards (already present, left as-is — verified, no change needed) | `Home.tsx`, `About.tsx` |
| S3 Value Proposition.md | "Faster RFQ processing," "supplier qualification," "reduced procurement lead time" — used only as *vision* framing for the Platform page, not as a claimed operating capability | Platform → vision copy | `src/pages/site/PlatformOverview.tsx` |
| S6 RFQ Lifecycle.md Stage 1 | "Idea" stage explicitly lists "Customer Request" as a valid sourcing-requirement origin, upstream of RFQ Draft | Frames Task 6's new Inquiry module as pre-RFQ intake, not a competing entity | `src/pages/crm/Inquiries.tsx` (new) |
| S5 CRM Domain.md | "Opportunity" and "Lead → Qualified Lead → Opportunity → Quotation → Negotiation" already an approved CRM vocabulary | Confirms "Customer Inquiry / Opportunity" naming in Task 6 doesn't invent new domain terms | `Inquiries.tsx` |
| S1 CLAUDE.md, S8 p.7 | Verified industries: **Oil & Gas, Petrochemical, Steel, Industrial Equipment** (narrower than Blueprint's Company-Profile.md list — S8 is the more current, self-audited source and matches CLAUDE.md exactly) | Industries page — trimmed to the 4 verified sectors per Task 2 instruction | `src/pages/site/Industries.tsx` |
| S1, S4 Content.md/Colors.md | Company name, website, tagline "Precision Supply · Global Reach" (S8 p.1 cover), ETA Navy/Copper palette | Global — unchanged, already correct | — |
| S8 p.3 "Business Line 01" | Product categories: rotating equipment, flow control, control & automation, instrumentation, static equipment, handling & process media | Services → Industrial Supply items | `Services.tsx` |
| S8 p.4 "Business Line 02" | Steel sheet grades/coatings; two sourcing channels (commodity exchange, open market) | Services → Steel Trading capability | `Services.tsx` |

---

## Explicitly NOT invented (per Task 3)

The following are marked `to be completed` in S10/S8 and therefore **do not appear anywhere in the updated content**:

- Year established
- Registration number / national-economic code
- Certifications held, memberships & licences (no ISO or similar claim added to marketing copy)
- Named founder, personal title, career history, education
- Customer names, project references, revenue figures, supplier counts, awards, partnership claims

Equipment brand names in S8 (KSB, Sulzer, Siemens Energy, Emerson, ABB, etc.) are used only as "brands ETA sources from," never phrased as certifications, partnerships, or endorsements — that distinction is not evidenced in any source.

---

## Task 5 (RTL) note

S9 (`Exir-Tejarat-Atlas-Catalogue-FA.pdf`) is a real, approved Persian-language document — the first one available in this workspace. It has **not** been mapped string-by-string against the new English copy in this pass; doing so is a follow-up translation task, not "preparation." This pass only ensures the technical scaffolding (`lang`/`dir`, Vazirmatn font cascade, `[dir="rtl"]` CSS) is production-ready — see `index.html` and `src/index.css`. No new Persian marketing strings were authored.
