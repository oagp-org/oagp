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

Record the seat's **`.orgdef` address and your current session binding** in the memo's `metadata` — see [Seat address and session binding](#seat-address-and-session-binding). Do it here, in the propose step: the binding is a fact about you, not a privilege granted by the authorization, and recording it is what makes the seat reachable at all.

### 3 — PO authorizes (you wait)
Do not proceed without an explicit authorization ("take the seat" / "yes, staff yourself as <X>"). The PO may decline or redirect.

### 4 — Record the incumbent (on authorization)
Update `org/<orgname>-organization.opencatalog`: set the position `status: staffed` and add the `incumbent` record (kind, identifier, staffed date, staffed_via). File (or finalize) the staffing memo as the institutional record. Embedded `roledef:Job` specialization is typically deferred — note it. **Do not commit/push** — the Director ratifies-by-merge.

**Resuming an already-staffed seat** (seat-vs-incumbent: seats persist, sessions are ephemeral) needs **no charter edit** — the identity is stable and already recorded. The binding is not: record it as above, superseding the previous one. The memo is the record of the occupation.

### 5 — Report
Confirm the seat is recorded (pending the Director's merge), summarize the scope you now hold and the bounds you do NOT (per the org's bounded-authority discipline), and **report reachability**: the address, the binding you recorded, and — plainly — whether a peer can actually reach you or not. "No binding available" is a complete and acceptable answer. Then stand by for direction.

## Seat address and session binding

A seat is addressed as `<seat>@<charter-id>.orgdef`. The **address is stable and org-scoped**; the **binding is disposable and runtime-specific**. Conferred here, never self-assigned.

### Record the binding

Ask the runtime what session it is, and write down what it says — timestamped:

```json
"session_binding": {
  "seat": "og-implementer@ogframework.orgdef",
  "runtime": "claude-code",
  "session_name": "oagp-org-c7",
  "session_ref": "82d42a",
  "observed": "2026-08-24T21:25:00-04:00"
}
```

On Claude Code the session name is the first line of `/list-agents` (`ListAgents`), which names the calling session to itself. **No registry needs to exist for this to work** — the seat records its own binding.

*Provisional shape.* Where the binding field ultimately lives — memo `metadata`, charter `incumbent`, or a separate register — is **format-shape**, not this card's call. Memo `metadata` is used here because it works today inside existing structure and needs nothing minted. Surface the residence question to the substrate spec's strategist; do not settle it here.

### Runtimes with no session identity

**"No binding available" is a normal outcome, not an error and not a missing feature.** Record the address alone, say so in the report, and continue. Never synthesize a session name to fill the field. A canonical card MUST NOT require any one vendor's affordance — that is the no-vendor-capture red line, not a portability nit.

### Release — supersession-on-claim

One address, one active binding. The release rule is **supersession-on-claim**: claiming a seat supersedes any prior binding on that address. Prior bindings stay in the record as dated facts; they are simply no longer current.

This is the rule *because* nothing writes back when a session dies. Sessions end by being killed, crashing, or going quiet far more often than by closing cleanly, so a release that depends on the dying session cooperating will silently not happen. Claiming is the one moment someone is reliably present to act.

- **Explicit release at close-session is a courtesy, never a dependency.** Nothing may rely on it.
- **No TTL.** An expiry would assert that a binding older than *n* is dead — a liveness claim the substrate cannot make (see below). Age is not death.
- **Binding kinds have different lifetimes.** A session binding is stale within hours; a durable account binding (a tracker account, say) can persist indefinitely. Supersession is keyed on the address, not on an assumed expiry, so it holds for both.

### Resolving an address, and failing loudly

1. **Find the current binding.** Enumerate the substrate for bindings recorded against that address; the current one is the binding with the latest `observed`. Supersession is implicit in that ordering, which is exactly why nothing has to write back when a session dies.
   - Newest-first filing order is a fine way to *search*. It is not the answer. **Order by `observed`, not by when the artifact was filed** — an artifact written retrospectively lands late while describing an earlier moment, and filing order would let it overwrite a newer fact.
   - If the two orderings disagree, trust `observed` and **say that they disagreed**. It usually means something was filed after the fact, which is worth someone knowing.
   - If two candidates share the latest `observed`, or the latest carries none: **stop and report it.** Two live claims on one address is the D5 conflict the Director resolves. A resolver does not break that tie.
2. **Confirm liveness against the runtime**, never against the record.
3. If the binding does not resolve, or the runtime cannot confirm it: **fail visibly and stop.**

**Never-bound is not the same as stale, and they are different reports.**

- **No binding recorded at all** — the seat never had one, or its runtime has no session identity. Report *"no binding available"* and stop. Normal outcome, nothing to retry, nobody to alert.
- **A binding exists but does not resolve or cannot be confirmed** — stale or broken. Fail loudly, say which of the two it is, and stop. This one wants someone's attention; the first does not.

Collapsing them hides a dead binding inside a routine "nothing here."

**MUST NOT** retry against a guessed name. Messaging the wrong session is a governance failure, not a delivery failure.

**Elimination is not resolution.** "Only one candidate is left, so it must be them" is a guess wearing a lookup's clothes; it happens to be right until two candidates are warm.

### The record never proves liveness

A binding answers *which session*, never *is it alive* — and never in either direction. A stale-looking binding is not evidence a seat is dead; a fresh one is not evidence it is alive. **Present liveness comes only from the runtime.** A filed artifact can carry an *intention* about a future state ("this seat is going cold"), which is a different fact and can simply turn out wrong.

Reachability is therefore always best-effort, and unreachability is reportable — a bounded-authority limit to state plainly, not a failure to hide.

## Discipline (load-bearing)
1. **Authorization gate** — propose, never seize; the PO authorizes.
2. **Evaluate honestly** — decline a poor fit.
3. **Record is a draft** — `status: staffed` + incumbent is drafted; the Director ratifies-by-merge; no push from this seat.
4. **Bounded authority applies the moment you hold the seat** — read/draft/propose; the Director ratifies/merges; you do not merge.
5. **Seat-vs-incumbent** — you occupy a persistent seat; your work lives in the substrate, not your session.
6. **Record the binding, trust it only as far as it goes** — write down where you can be reached, then treat every resolution as best-effort: confirm liveness at the runtime, fail loudly, never guess.

## What this skill does NOT do
Seize a seat without PO authorization; commit/push the charter change; specialize the roledef:Job (deferred); vacate a seat (describe that in plain language if needed); treat a recorded binding as proof a seat is alive or dead; invent a session name on a runtime that has none; settle where the binding field lives (format-shape — surface it).

## References
- Run first: [/og-orient](../og-orient/SKILL.md) · then [/og-closeout](../og-closeout/SKILL.md) at session end
- OG home: [ogframework.com](https://ogframework.com) · Empirical org: [github.com/ogframework/og](https://github.com/ogframework/og)
- Substrate: orgdef:Position (the seat) · roledef (role spec) · memodef:Memo (the staffing record)
