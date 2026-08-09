# Phase 2 Implementation Plan — Products & Capabilities Hub, Navigation, Platform Positioning

document_id: ETA-PHASE2-PLAN-001
status: Draft — awaiting review, no code written
date: 2026-08-08
authority: `ETA-Blueprint/13-DECISIONS/DECISIONS.md` (D1–D4), `ETA-Blueprint/13-DECISIONS/ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md`, this session's Decision Confirmation message
scope: Public website layer only — `App.tsx` routes, `SiteHeader`, `SiteFooter`, `Services.tsx`, `Home.tsx` Platform section, `PlatformOverview.tsx` wording

---

## Open items requiring confirmation before I write any code

D1–D4 resolve the architecture questions, but four implementation-level details aren't specified by any source document. Flagging per the resolution record's own rule ("if an implementer hits a choice not covered by this document, it is not theirs to decide — stop, log it"), not deciding these myself.

1. **New hub route slug.** D2 says Services "becomes" the Products & Capabilities hub but doesn't specify whether the URL changes. I'm proposing `/products-capabilities` (better SEO match to the page's actual name) with `/services` kept as a redirect for backward compatibility — see §3. **Confirm this slug, or tell me to keep `/services` as the URL with only the on-page label/content changing.**
2. **Replacement for the "Explore ETA Platform" CTA.** D4 requires removing it (present-tense/exploreable framing) but no source specifies replacement copy, and I don't want to invent marketing copy. Proposing to point the same button position to the new Products & Capabilities hub, labeled **"See Our Capabilities"** — a factual, already-real destination, not a claim. **Confirm this label or provide the one you want.**
3. **"Platform Preview" nav link and footer Dashboard/Supplier Portal links.** D3's "final navigation" list doesn't include "Platform Preview," and D4's no-present-tense-claims rule arguably extends to footer links that invite clicking into `/dashboard`, `/suppliers`, `/supplier-portal` from the public site. Proposing to **remove "Platform Preview" from the header** and **remove the internal-route links from the footer's "ETA Platform" column** (keep only `/platform` — the vision page). **Confirm, or tell me to leave these as-is.**
4. **File rename.** Proposing to rename `src/pages/site/Services.tsx` → `src/pages/site/ProductsCapabilities.tsx` so the filename matches what the page now is, rather than leaving a file called "Services" holding the Products & Capabilities hub. **Confirm, or tell me to keep the filename and only change route/content.**

The plan below assumes my proposed defaults (1–4) so it's concrete and reviewable — nothing executes until you respond.

---

## 1. Files to modify

| File | Change |
|---|---|
| `src/App.tsx` | Rename import `Services` → `ProductsCapabilities` (per open item 4); change its route from `/services` to `/products-capabilities` (open item 1); add a `<Navigate>` redirect from `/services` → `/products-capabilities` for backward compatibility. |
| `src/pages/site/Services.tsx` → `src/pages/site/ProductsCapabilities.tsx` | Reframe hero eyebrow/heading from "Services" / "Engineering-driven procurement, end to end" to Products & Capabilities framing. **No change to the 5 existing service cards' content** (Industrial Procurement, Equipment Supply, Steel Trading, Supplier Network, Supply Chain Support) or their data — only the page-level framing copy around them. The existing "Learn more" links to `/equipment-supply`, `/steel-trading`, `/supplier-network` are unchanged (already exactly the "children accessed from hub page" pattern D3 asks for). |
| `src/components/site/SiteHeader.tsx` | Nav array becomes 6 items: Home (`/`), About (`/about`), Products & Capabilities (`/products-capabilities`), Industries (`/industries`), Platform Vision (`/platform`), Contact (`/contact`). Remove "Platform Preview" link (open item 3). "Request a Quote" CTA button unchanged — it's a CTA, not a nav link, and isn't addressed by D3. |
| `src/components/site/SiteFooter.tsx` | "Company" column: relabel "Services" → "Products & Capabilities" (same 3 child-page links unchanged, plus About/Industries/Contact unchanged). "ETA Platform" column: relabel "Platform Overview" → "Platform Vision"; remove `/dashboard`, `/suppliers`, `/supplier-portal` links (open item 3), leaving only the `/platform` link in that column. |
| `src/pages/site/Home.tsx` | Rewrite the present-tense "The ETA Platform integrates: CRM, Procurement, Supplier Portal, Manufacturer Portal, AI Assistant, Dashboard, Analytics, Document Intelligence, Knowledge Base" section to future-vision framing, reusing the same verified module names (no new capability claims invented) but reframed as planned, per your example direction ("ETA Platform Vision," "Future digital procurement ecosystem"). Replace the hero's secondary "Explore ETA Platform" CTA per open item 2. |
| `src/pages/site/PlatformOverview.tsx` | Small wording-only tweak: hero paragraph "...integrated into a single platform" → future-tense phrasing consistent with D4. The existing "Available Now" / "Coming Next" structure is **not** restructured — it already discloses "Sprint 1 — MOD-1 Supplier Intelligence, running on mock data pending backend integration," which is the honest framing D4 asks for; only the one present-tense sentence in the hero needs adjustment. |

## 2. Files not touched

Everything else in the repository, explicitly including:
- All internal product screens: `Dashboard.tsx`, `crm/*`, `procurement/*`, `suppliers/*`, `SupplierPortal.tsx`, `AiPlatform.tsx`, `Settings.tsx`
- All shared UI components in `src/components/ui/*`
- `src/components/layout/*` (internal app shell — separate from `SiteHeader`/`SiteFooter`)
- `src/pages/site/About.tsx`, `Industries.tsx`, `Contact.tsx` — no changes required by D1–D4
- `src/components/site/SiteLayout.tsx`, `SiteUI.tsx`
- `src/i18n/*` — unrelated to this phase
- `tailwind.config.js`, `src/index.css`, `index.html`
- `src/lib/*`, `supabase/*` — no backend/data-layer work in scope
- Any authentication, API Gateway, or database code — none exists to touch

## 3. Route changes

| Before | After |
|---|---|
| `/services` → `Services` | `/products-capabilities` → `ProductsCapabilities` (renamed component) |
| — | `/services` → `<Navigate to="/products-capabilities" replace />` (new, backward-compat redirect) |
| `/equipment-supply`, `/steel-trading`, `/supplier-network` | Unchanged |
| `/`, `/about`, `/industries`, `/platform`, `/contact` | Unchanged |
| All internal-app routes (`/dashboard`, `/crm/*`, etc.) | Unchanged — out of scope |

## 4. Navigation changes

**Header — before:** About · Industries · Services · ETA Platform · Contact — plus "Platform Preview" link and "Request a Quote" CTA.

**Header — after:** Home · About · Products & Capabilities · Industries · Platform Vision · Contact — plus "Request a Quote" CTA. ("Platform Preview" removed per open item 3.)

**Footer — before:** Company (About, Industries, Services, Equipment Supply, Steel Trading, Supplier Network, Contact) · ETA Platform (Platform Overview, Dashboard, Supplier Intelligence, Supplier Portal) · Offices.

**Footer — after:** Company (About, Industries, Products & Capabilities, Equipment Supply, Steel Trading, Supplier Network, Contact) · ETA Platform (Platform Vision only) · Offices.

No dropdown/mega-menu introduced — flat links only, per D3.

## 5. CTA changes

| Location | Before | After |
|---|---|---|
| Home hero, secondary CTA | "Explore ETA Platform" → `/platform` | "See Our Capabilities" → `/products-capabilities` (open item 2 — pending your confirmation) |
| Home hero, primary CTA | "Request a Quote" → `/contact` | Unchanged |
| Home "ETA Platform" section | (implicit, via section framing) "integrates" present-tense | Future-vision framing; no CTA wording invented beyond your example direction |
| Products & Capabilities hub (formerly Services) | "Talk to our team" → `/contact` | Unchanged |
| Contact page CTA block (Request a Quote / Contact Sales / Book a Meeting) | — | **Not touched** — D1–D4 don't address this; the earlier superseded baseline's CTA-consolidation idea is out of scope for this phase |

## 6. Validation checklist

- [ ] `npm run typecheck` — clean
- [ ] `npm run build` — clean, no new regressions
- [ ] Every route loads with no console errors: `/`, `/about`, `/industries`, `/products-capabilities`, `/services` (redirects correctly), `/equipment-supply`, `/steel-trading`, `/supplier-network`, `/platform`, `/contact`
- [ ] Header shows exactly 6 nav items in the specified order, no mega-menu
- [ ] Footer mirrors the relabeled structure, no dead links
- [ ] No occurrence of "Explore ETA Platform," "log in to," or "access" language about the Platform anywhere in the public site
- [ ] Home's Platform section copy contains no present-tense capability claims
- [ ] `PlatformOverview.tsx`'s "Available Now"/"Coming Next" disclosure structure still present and unchanged
- [ ] No file outside §1's list was modified (`git status` diff matches this plan exactly)
- [ ] No internal-app route, component, or backend file touched
- [ ] Every changed string traces to already-verified content (`Services.tsx`'s existing card data, `CONTENT-SOURCE-MAP.md`, or your explicit example direction for D4 wording) — nothing newly invented beyond the two labels flagged as open items 2

---

**Stopping here per instruction — no code written.** Waiting on your answers to the 4 open items above (or approval of the proposed defaults) before implementing.
