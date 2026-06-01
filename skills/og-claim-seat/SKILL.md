---
name: og-claim-seat
description: |
  Use this skill when an AI peer who has oriented on an OG (Open
  Governance Framework) org wants to TAKE a position. It is the
  deliberate, PO-authorized staffing act — distinct from the read-only
  /og-orient. It evaluates fit, files an application/staffing memo,
  waits for PO authorization, then records the incumbent in the orgdef.

  Activate when the user says any of: "take the <X> seat", "claim the
  <X> position", "staff me as <X>", "I'd like to occupy the <X> seat",
  after orienting.

  Companion: /og-orient (read-only come-up-to-speed; run it first).
  Taking a seat is NEVER automatic on orienting — it is this separate,
  authorized act.
---

# /og-claim-seat

You are taking (claiming) a position in an OG org. This is the **deliberate, PO-authorized staffing act**, separate from the read-only `/og-orient`. Self-staffing is **opt-in after evaluation, and the PO's call** — you propose to take a seat; you never seize one.

Prerequisite: you have oriented (`/og-orient`) and understand the seat's scope, the org's bounded-authority discipline, and the red lines.

## The authorization gate (load-bearing)
**You may not record yourself in a seat without explicit PO authorization.** The flow is propose → authorize → record. The charter being legible to you, and a seat being vacant, does not authorize you to occupy it.

## Steps

### 1 — Evaluate fit
Read the target position's description + (if present) its referenced roledef / embedded `roledef:Job` + `recommended_capabilities`. Honestly assess: does the seat's scope match your capabilities? Name any mismatches. If a poor fit, say so and stop — don't claim it.

### 2 — Propose (file the application/staffing memo)
File `memos/<YYYY-MM-DD>-<HHMM>--<seat>--director--claim-seat-application.{openthing,body.md}` (or, for an already-Director-directed staffing, a staffing-acceptance memo). State: the seat, your evaluation of fit, the scope you're accepting, and that you await PO authorization. `action_required: true` to the Director.

### 3 — PO authorizes (you wait)
Do not proceed without an explicit authorization ("take the seat" / "yes, staff yourself as <X>"). The PO may decline or redirect.

### 4 — Record the incumbent (on authorization)
Update `org/<orgname>-organization.opencatalog`: set the position `status: staffed` and add the `incumbent` record (kind, identifier, staffed date, staffed_via). File (or finalize) the staffing memo as the institutional record. Embedded `roledef:Job` specialization is typically deferred — note it. **Do not commit/push** — the Director ratifies-by-merge.

### 5 — Report
Confirm the seat is recorded (pending the Director's merge), summarize the scope you now hold and the bounds you do NOT (per the org's bounded-authority discipline), and stand by for direction.

## Discipline (load-bearing)
1. **Authorization gate** — propose, never seize; the PO authorizes.
2. **Evaluate honestly** — decline a poor fit.
3. **Record is a draft** — `status: staffed` + incumbent is drafted; the Director ratifies-by-merge; no push from this seat.
4. **Bounded authority applies the moment you hold the seat** — read/draft/propose; the Director ratifies/merges; you do not merge.
5. **Seat-vs-incumbent** — you occupy a persistent seat; your work lives in the substrate, not your session.

## What this skill does NOT do
Seize a seat without PO authorization; commit/push the charter change; specialize the roledef:Job (deferred); vacate a seat (describe that in plain language if needed).

## References
- Run first: [/og-orient](../og-orient/SKILL.md) · then [/og-closeout](../og-closeout/SKILL.md) at session end
- OG home: [ogframework.com](https://ogframework.com) · Empirical org: [github.com/ogframework/og](https://github.com/ogframework/og)
- Substrate: orgdef:Position (the seat) · roledef (role spec) · memodef:Memo (the staffing record)
