# Next Session Task

document_id: ETA-NEXT-SESSION-001
status: Queued
date: 2026-08-07
depends_on: `SESSION-HANDOFF-UI-FOUNDATION.md`, `UI-COMPONENT-INVENTORY.md` (both this repo, `docs/delivery/`)

---

## Next recommended task

**ETA UX Architecture Phase**

Before Dashboard/CRM/Supplier/Finance screens are built or redesigned, produce:

- Information Architecture
- Navigation Model
- User Journeys
- Screen Inventory
- Component Mapping (which screens consume which components from `src/components/ui/`, and which required components — Multi-Select, Date Picker, Table export/bulk-action bar, Button loading state — still need to be built to support them)

Source of truth for this phase: ETA-Blueprint's approved UI Map and `ETA-Platform/docs/delivery/UI-COMPONENT-INVENTORY.md` (component capabilities and open decisions as of this handoff).

## Do NOT start

- Dashboard UI
- CRM UI
- Supplier UI
- Finance UI

until UX Architecture approval.
