---
name: og-add-position
description: |
  Use this skill to add a new position (seat) to an OG (Open Governance
  Framework) org's chart. It elicits the position's scope, drafts the
  orgdef:Position, and PROPOSES it for Director ratification — adding a
  position is a governance change, so it is propose-then-ratify, never a
  unilateral edit.

  Activate when the user says any of: "add a position", "create a new
  seat", "we need a <X> role", "add <X> to the org chart".

  Companion: /og-claim-seat (an AI peer takes a position once it exists);
  /og-snapshot (see the current chart). Vacating or editing positions is
  describable in plain language and has no dedicated skill.
---

# /og-add-position

You are adding a new position to an OG org's chart. **Adding a position is a governance change** (it modifies the charter), so this is **propose-then-Director-ratify** — never a unilateral org-chart edit. Bounded authority applies: you draft + propose; the Director ratifies-by-merge.

## Steps

### 1 — Elicit the position
Ask the PO: position `id` + name; scope/responsibilities; staffed or vacant (default **vacant** — no auto-staffing); whether it references a roledef / `recommended_capabilities`; relationships (reports_to / directs / coordinates_with); and why the org needs it now. Mark anything ambiguous `[NEEDS PO INPUT]`.

### 2 — Draft the orgdef:Position
Compose the `orgdef:Position` item (id, name, status, description, optional roledef reference + `recommended_capabilities`, relationships) consistent with the existing charter's position shape. Embedded `roledef:Job` specialization is typically deferred — note it. **Do not edit the live charter yet** — draft the position (in a proposal artifact, or inline for review).

### 3 — Propose
Present the drafted position to the PO. For a substantive seat, file a short proposal in `proposals/` and/or a memo so the addition has an audit trail. State it awaits Director ratification.

### 4 — Ratify (PO/Director; you wait)
The Director reviews, amends, ratifies. Do not add the position to the live charter without authorization.

### 5 — Apply (on ratification)
Add the position to `org/<orgname>-organization.opencatalog` `items[]`; update `relationships[]` if needed; bump the charter version + add a history entry per the org's convention. **Do not commit/push** — the Director ratifies-by-merge. Then report, and point at `/og-claim-seat` for staffing the new seat (a separate, also-authorized act).

## Discipline (load-bearing)
1. **Propose-then-ratify** — adding a position is a charter change; the Director ratifies. No unilateral org-chart edits.
2. **Default vacant** — a new position gets a status, not an incumbent. Staffing is `/og-claim-seat`, separately.
3. **Charter change is a draft** — drafted on ratification; the Director merges; no push from a bounded seat.
4. **Format-shape stays with the substrate** — the `orgdef:Position` *shape* is orgdef's; you author position *content* within that shape, not new schema.

## What this skill does NOT do
Edit the charter without Director ratification; staff the new position (→ /og-claim-seat); commit/push; invent new orgdef fields (format-shape → coordinate with orgdef-strategist); vacate/rename positions (describe those in plain language).

## References
- Companion: [/og-claim-seat](../og-claim-seat/SKILL.md) (staff a position) · [/og-snapshot](../og-snapshot/SKILL.md) (see the chart)
- OG home: [ogframework.com](https://ogframework.com) · Empirical org: [github.com/oagp-org/oagp](https://github.com/oagp-org/oagp)
- Substrate: orgdef:Position · roledef (role spec + recommended_capabilities)
