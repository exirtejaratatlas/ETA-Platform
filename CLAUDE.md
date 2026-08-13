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

Milestone 2026-08-13 (see docs/delivery/SESSION-HANDOFF-MVP-PRODUCT-RFQ.md):
- Decisions respected: CR-001, D1-D6; IMPLEMENTATION-GATE; CODING-RULES.
- AI automation NOT implemented — still forbidden without a Change Request (D4, D6).
- Product/RFQ Supabase migration authored but NOT applied — database work remains gated.
- Open Decisions Required raised: Product status domain conflict (ETA-ENT-PRODUCT-001 vs
  -005), RFQ status domain conflict (ETA-ENT-RFQ-001 vs -005), undefined enum domains
  (criticality, priority, technical_risk_level), Supabase provisioning, AI assistant scope,
  and ETA-Platform missing from the Claude Project's synced GitHub sources.
- Next step: close those decisions in ETA-Blueprint before opening Phase 6.1.

Milestone 2026-08-13b — MVP workflow chain wired end to end:
- Dashboard now operational, not decorative: KPI tiles are Open RFQs / budgeted value of
  open RFQs / open POs / active suppliers, and the fabricated "AI Task Activity" panel is
  replaced by "RFQ Requiring Attention" (RFQs with open blocker rules or a deadline inside
  14 days, ranked by deterministic ETA-ENT-RFQ-004 evaluation — not AI).
- Chain Customer Inquiry -> RFQ -> Award -> Purchase Order is now navigable in the UI.
  PurchaseOrder gained `rfq_id` (ETA-ENT-RFQ-005 stage 12: awarded quotations generate POs);
  Inquiries link to their RFQ via `internal_reference`.
- Supplier profile gained "Products Supplied" and "RFQ Participation". Facts and links only —
  no supplier scoring, ranking or performance rating (still out of scope).
- Data-honesty correction (closes PHASE6-PLATFORM-EXECUTION-STRATEGY.md §2.4, answers §6 Q16):
  `mockAiModels` and `mockAiTasks` are now empty. They previously advertised live
  anthropic/openai/google integrations and completed supplier-scoring / price-analysis /
  risk-assessment runs — none existed. `/ai-platform` is now a future-vision capability shell
  stating plainly that nothing is implemented and that AI needs a Change Request (D4).
- Decisions respected: D4, D6, IMPLEMENTATION-GATE, CODING-RULES. No architecture change, no
  new entity, no new component, no new dependency, no AI implementation, migration still not applied.
- Validation: typecheck clean, oxlint clean (3 pre-existing warnings only), build succeeds,
  19 routes + 4 RTL sweeps pass headless Chromium with zero console/page errors and 0px overflow.


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
