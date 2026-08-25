---
name: og-change-comms-substrate
description: |
  Use this skill to change which communication substrate an OG (Open
  Governance Framework) org uses — where inter-seat communication is
  recorded. It checks the candidate against the four required properties,
  proposes the change for Director ratification, and handles the two things
  a plain-language description reliably misses: existing records stay where
  they are, and the change must be announced in the OUTGOING substrate.

  Activate when the user says any of: "move our memos to Jira", "switch to
  a tracker", "change where we file", "we're not using memos any more",
  "adopt <tracker> for inter-seat communication".

  Rare and charter-altering. Propose-then-ratify, never a unilateral edit.
  Companion: /og-describe-org (see the current substrate) · /og-create-org
  (which ratifies the first one at founding).
disable-model-invocation: true
---

# /og-change-comms-substrate

You are changing where an OG org records inter-seat communication. This is a **governance change**: propose, then the Director ratifies. Never edit the charter and call it done.

The name is deliberately long. This runs perhaps once in an org's life, and being unmissable beats being brief.

## What a communication substrate is

The **durable record layer** inter-seat communication lives in — not the ephemeral notification that tells a seat something arrived. A notification MUST NOT be the transport; it carries a pointer *into* the substrate.

An org has one **primary** substrate carrying the record of authority, and MAY have a **secondary** for tactical work.

## Four steps

### 1 — Check the candidate against the four properties

**Ratification selects among conforming substrates; it does not confer conformance.** An org cannot ratify a substrate that fails these and thereby make it compliant. Check each explicitly and report the result:

1. **Durable and exportable** — the record outlives the session that wrote it, and can be got out. A governance record that can be locked behind a lapsed subscription is not a governance record.
2. **Seat-addressable** — addressed to positions, not incumbents. A field, ideally; a convention if the substrate has no field for it — but say which.
3. **Auditable** — citable later by a participant who was not present. Note honestly where attribution is weaker than the current substrate's.
4. **Enumerable** — a seat can answer **"what is OPEN, addressed to me?"** — not merely "what was ever flagged." This is the property everything else leans on: it is the floor a seat stands on when no notification exists.

**If the candidate fails any of these, say so and stop.** Report which, and what would have to change. Do not proceed to step 2 on a failing candidate because the PO wants it.

### 2 — Propose, and let the Director ratify

Draft a proposal naming: the outgoing substrate, the incoming one, the property check from step 1 with its honest weaknesses, whether this is a primary or secondary change, and the disposition of existing records (step 3). Then **stop.**

This is a **charter change** — the substrate is recorded in the org's `governance_model` (or wherever the charter names it). The Director ratifies. Do not edit the charter before ratification.

### 3 — Existing records stay where they are

**The presumption is: nothing moves.** Substrates change; records do not.

An org ends up with history in one substrate and current traffic in another. **That is correct, not untidy.** Moving records would rewrite dated artifacts, which is the same error as retro-rebranding — and migrated records lose their original timestamps, authorship and context in ways that are rarely worth what the tidiness buys.

State plainly in the proposal that historical records remain readable in the outgoing substrate, and that a reader may need both.

The one case worth revisiting is an outgoing substrate becoming *unreadable* — a decommissioned tracker. That is an archival problem, not a governance one; flag it to the Director rather than solving it here.

### 4 — Announce the change in the OUTGOING substrate

**This is the step a plain-language description misses, and it is the one that breaks quietly.**

The seats are still watching the old substrate. An announcement filed in the new one reaches nobody. So on ratification:

- **File the announcement in the outgoing substrate**, addressed to every staffed seat, naming the new substrate and the date the change takes effect.
- Update the charter (`governance_model` or equivalent) and the org's `CLAUDE.md` so a fresh session reads the new one.
- Update any notification mechanism pointed at the old substrate — and if none exists, say so; enumerability at session start is the floor, not the notification.
- **Re-point the read order in `CLAUDE.md`**, because that is what a session with no skills installed will follow.

## Discipline (load-bearing)
1. **Conformance is checked, not assumed.** Step 1 can fail and stop the whole operation.
2. **Propose-then-ratify.** The charter is the Director's.
3. **Records do not migrate.** Default to leaving them.
4. **Announce in the outgoing substrate.** Nobody is watching the new one yet.
5. **The primary carries authority.** If this is a secondary-substrate change, say which record each layer holds and confirm the primary still carries the record of authority.

## What this skill does NOT do
Edit the charter without ratification; migrate historical records; declare a failing candidate conforming because it is convenient; announce the change only in the new substrate; decide *format-shape* questions about how the new substrate encodes a communication — those route to the relevant `-def` spec's strategist.

## References
- Ratified in: [decisions/proposal-communication-substrate-and-seat-notification-v1.md](../../decisions/proposal-communication-substrate-and-seat-notification-v1.md) — the four properties, and that ratification does not confer conformance
- Card added by: [decisions/proposal-og-skill-suite-v2.md](../../decisions/proposal-og-skill-suite-v2.md)
- Companion: [/og-describe-org](../og-describe-org/SKILL.md) · [/og-create-org](../og-create-org/SKILL.md)
- OG home: [ogframework.com](https://ogframework.com)
