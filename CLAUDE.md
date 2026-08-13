# ETA Platform — Claude Code Operating Context

## Company Identity

Company:
Exir Tejarat Atlas (ETA)

Website:
www.exiratlas.com

Business:
Industrial procurement, supply chain management, specialized trading and AI-assisted procurement platform.

Main Industries:
- Oil & Gas
- Petrochemical
- Steel
- Industrial Equipment

Core Products:
- Steel Sheets
- Rotating Equipment
- Pumps
- Compressors
- Motors
- Gearboxes
- Valves
- Instrumentation
- Electrical Equipment


---

# Repository Governance

## Development Repository

ETA-Platform

Purpose:
Production software repository.

Contains:
- Frontend
- Backend
- Database integrations
- Website
- Platform modules


## Source of Truth Repository

ETA-Blueprint

Purpose:
Business memory, architecture reference, documentation governance.

Rules:
- Never redesign architecture.
- Never invent entities.
- Never change business rules.
- Never create new API philosophy.
- Any deviation requires Change Request.


## Memory Layer

Obsidian Vault:

Purpose:
Long-term project memory.

Contains:
- Decisions
- Knowledge graph
- Business context
- Architecture history
- Documentation relationships


Priority:

1. ETA-Blueprint = Authority
2. ETA-Platform = Implementation
3. Obsidian = Memory Graph


---

# Branding Rules

All UI and website work MUST follow ETA branding.

Brand:
Exir Tejarat Atlas

Logo:
Use existing:

public/Logo.svg


Never replace logo.
Never create alternative logos.

Brand Colors (ETA-Blueprint is authority — 20-BRANDING/04-Visual-Identity/Colors.md, doc ETA-VISUAL-001, status Approved):
- ETA Navy #0F172A — primary brand color
- ETA Copper #C57B39 — accent color, used sparingly for CTAs, highlights, and premium elements
- Neutrals + semantic Success/Warning/Error/Information colors round out the palette; see Colors.md for exact hex values.
- There is no "ETA Green" or "ETA Orange" in the approved palette.
- Implementation: tailwind.config.js `surface` (Navy family) and `copper` tokens. Do not reintroduce standalone "brand"/"gold"/"teal" color ramps — use `copper` for accent/highlight and `info`/`success`/`warning`/`error` for semantic states.

Maintain:
- professional industrial identity
- premium B2B appearance
- enterprise style


---

# Design Direction

Target audience:

Industrial companies:
- Petrochemical
- Oil & Gas
- Steel manufacturers
- Procurement departments


Design style:

NOT:
- Startup style
- Consumer app style
- Gaming style

YES:
- Enterprise
- Industrial
- Professional
- Trustworthy
- Data-driven


---

# Website Requirements

Website is part of ETA Platform.

Expected sections:

- Home
- About ETA
- Industrial Procurement
- Steel Trading
- Equipment Supply
- Supplier Network
- AI Procurement Platform
- Contact


Languages:

- Persian (RTL)
- English (LTR)


---

# Development Rules

Before coding:

Read:
- docs/delivery/IMPLEMENTATION-GATE.md
- docs/delivery/CODING-RULES.md
- docs/delivery/sprints/


Current Sprint:

Sprint 1

Module:

MOD-1 Supplier Intelligence


Allowed:
- Implement approved documents
- Build UI
- Build database layer
- Build APIs


Forbidden:
- Architecture changes
- ERP integration
- AI automation redesign
- Deployment decisions


---

# Current Status

Completed:

Documentation:
- ETA-Blueprint completed
- Procurement Playbook v1 completed
- Implementation Gate created
- Coding Rules created


Platform:

Existing:
- React 19
- Vite
- Tailwind
- Supabase integration
- Routing
- Layout


Current Module:
MOD-1 Supplier Intelligence


Implemented:
- Dashboard
- Supplier List
- Supplier Detail
- Mock Data Layer
- Product Management (List + Detail) — implements Approved ETA-ENT-PRODUCT-001/002/004/005
- RFQ Workflow (List + Detail, 14-stage lifecycle tracker, quotation comparison)
  — implements Approved ETA-ENT-RFQ-001/002/004/005
- RFQ Workflow Guide — deterministic business-rule evaluation against ETA-ENT-RFQ-004.
  NOT an AI feature: no model call, no score, no ranking, no recommendation.

---

# Execution Log

Single source of execution status. One entry per accepted task. Failed or unverified
work is never recorded here.

## EXEC-001 — Product Management module
Completed: Product list + detail on Approved ETA-ENT-PRODUCT-001/002/004/005.
Files: `src/pages/products/ProductList.tsx`, `src/pages/products/ProductDetail.tsx`,
`src/lib/supabase.ts`, `src/lib/mockData.ts`, `src/lib/data.ts`, `src/App.tsx`,
`src/components/layout/Sidebar.tsx`, `src/components/layout/MobileNav.tsx`.
Validation: typecheck PASS, build PASS, lint PASS, browser sweep PASS (0 console errors).
Known issues: implements an attribute subset of ETA-ENT-PRODUCT-002; inventory, warehouse,
logistics, quality and AI-metadata groups deliberately not modelled.
Next step: none — accepted.

## EXEC-002 — RFQ Workflow module
Completed: RFQ list + detail, 14-stage lifecycle tracker, side-by-side quotation comparison,
and a deterministic Workflow Guide evaluating 19 rules from Approved ETA-ENT-RFQ-004.
Files: `src/pages/rfq/RfqList.tsx`, `src/pages/rfq/RfqDetail.tsx`,
`src/components/rfq/RfqWorkflowGuide.tsx`, `src/lib/rfqLifecycle.ts`,
`supabase/migrations/20260813193000_create_product_and_rfq_schema.sql`.
Validation: typecheck PASS, build PASS, lint PASS, browser sweep PASS, RTL 0px overflow.
Known issues: no evaluation score, supplier ranking or award recommendation — no approved
methodology exists. Migration authored but NOT applied.
Next step: none — accepted.

## EXEC-003 — Dashboard operational integration (Agent 1)
Completed: KPI tiles replaced with Open RFQs / budgeted value of open RFQs / open POs /
active suppliers. Fabricated "AI Task Activity" panel removed and replaced by
"RFQ Requiring Attention" — open RFQs carrying a failed blocker rule or a supplier deadline
inside 14 days, ordered by deterministic ETA-ENT-RFQ-004 evaluation. Not an AI feature.
Files: `src/pages/Dashboard.tsx`.
Validation: typecheck PASS, build PASS, lint PASS, route + RTL sweep PASS.
Known issues: two pre-existing RTL violations in the Sales Pipeline card were corrected in
the same pass.
Next step: none — accepted.

## EXEC-004 — CRM Inquiry to RFQ workflow (Agent 2)
Completed: inquiry cards link through to their RFQ via `internal_reference`; a
"Converted to RFQ" tile reports conversion count. Chain Customer Inquiry -> RFQ -> Award ->
Purchase Order is now navigable. `PurchaseOrder` gained `rfq_id` per ETA-ENT-RFQ-005 stage 12.
Files: `src/pages/crm/Inquiries.tsx`, `src/lib/data.ts`, `src/lib/supabase.ts`,
`src/lib/mockData.ts`.
Validation: typecheck PASS, build PASS, lint PASS, route + RTL sweep PASS.
Known issues: `customer_inquiries` still has no backend table — UI and mock data only.
Next step: none — accepted.

## EXEC-005 — Supplier commercial footprint (Agent 3)
Completed: supplier profile gained "Products Supplied" (primary vs alternate source) and
"RFQ Participation" (invited / responded / awarded). Facts and links only.
Files: `src/pages/suppliers/SupplierDetail.tsx`, `src/lib/data.ts`.
Validation: typecheck PASS, build PASS, lint PASS, route + RTL sweep PASS.
Known issues: no supplier scoring, ranking or performance rating — remains out of scope.
Next step: none — accepted.

## EXEC-006 — AI Platform governance correction (Agent 4)
Completed: `mockAiModels` and `mockAiTasks` emptied. They previously advertised live
anthropic/openai/google integrations and completed supplier-scoring, price-analysis and
risk-assessment runs; none existed. `/ai-platform` rebuilt as a future-vision capability
shell per D4, stating plainly that nothing is implemented and that AI capability requires an
approved Change Request. Off-palette provider colours removed.
Files: `src/pages/AiPlatform.tsx`, `src/lib/mockData.ts`.
Validation: typecheck PASS, build PASS, lint PASS, route + RTL sweep PASS.
Known issues: closes the defect recorded in PHASE6-PLATFORM-EXECUTION-STRATEGY.md 2.4 and
answers its 6 Q16 in the affirmative.
Next step: none — accepted.

## Standing constraints observed across EXEC-001..006
- No architecture change, no new entity, no new component, no new dependency.
- No AI implementation. AI automation remains forbidden without a Change Request (D4, D6).
- IMPLEMENTATION-GATE.md, CODING-RULES.md and sprint documents were NOT modified.
- Supabase migration authored, NOT applied. No `.env` present; mock fallback active.
- All UI built RTL-ready against Approved Colors.md / Typography.md tokens.

## Open Decisions Required (Founder)
1. AI assistant scope — Change Request needed before any AI implementation.
2. Product status domain conflict: ETA-ENT-PRODUCT-001 (7 states) vs -005 (11 stages).
3. RFQ status domain conflict: ETA-ENT-RFQ-001 (11 statuses) vs -005 (14 stages).
4. Undefined enum domains: `criticality`, `priority`, `technical_risk_level`.
5. Supabase provisioning — environment, access control, secrets handling.
6. Component-library sign-off against Components.md, and whether the UX Architecture Phase
   prerequisite still applies to already-built product screens.

## Next execution step
Wire Purchase Orders to display the originating RFQ and awarded supplier. This is the last
unwired node in the Inquiry -> RFQ -> Award -> PO chain; `rfq_id` already exists on the entity.

---

Next Priority:

Build visible MVP.

Order:

1. Website / Corporate Identity
2. Platform UI completion
3. Supplier Intelligence database
4. API implementation
5. Procurement module
6. CRM module
7. AI integration later


---

# Important Instruction

Do not ask again about:
- Company profile
- Logo
- Brand colors
- Website identity
- Business activity
- Repository structure

All information exists in:
- ETA-Blueprint
- ETA-Platform
- Obsidian memory
- GitHub repositories


Always inspect existing files before creating new ones.
