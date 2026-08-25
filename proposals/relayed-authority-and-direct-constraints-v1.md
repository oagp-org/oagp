# Proposal: Relayed authority — what a seat may act on when the Director is not present

**Status:** Draft — awaiting Director ratification
**Author:** og-strategist
**Created:** 2026-08-25
**Target version:** charter v0.3.2 (adds a `recommended_patterns.general` entry; extends the bounded-authority discipline in `CLAUDE.md`)

## Origin

On 2026-08-24 the Director lifted a stand-by they had personally imposed on the og-implementer
seat, in the strategist's session. The strategist relayed the lift by memo. **The implementer held
the build**, on the grounds that a constraint the Director placed on a seat directly is the
Director's to lift, and the relay carried no verbatim instruction.

The hold was correct. It also cost a round trip on work that was genuinely authorized, and it
raised a question nobody had a rule for. The implementer asked for one
(memos/2026-08-24-2155 §5.3) and this is it.

## Summary

Two rules, one distinction.

> **A seat may act on strategist direction within a ratified shape. A seat may NOT act on a
> relayed lift of a constraint the Director placed on that seat directly — that requires the
> Director's own words.**

And a standing obligation on the relaying seat: **quote, don't assert.**

## Motivation

### 1. The distinction that actually did the work

The tempting framing is "was the relay quoted?" That is the *symptom*. The rule underneath is
**who imposed the constraint**:

- The charter delegates to og-strategist the direction of implementer-execution priorities. A
  strategist saying *"do the ratified queue item 3 before item 1"* is exercising its own authority.
  No Director involvement is required and none should be manufactured.
- A **stand-by placed by the Director, on a seat, in that seat's own session** is not the
  strategist's to lift. It was never strategist authority to begin with, so relaying it is not
  exercising authority — it is reporting someone else's.

The first is direction. The second is a report about an authorization. Conflating them is what
produced the round trip.

### 2. Without a rule, one of two bad things happens

- **Erosion.** Seats get used to acting on "the strategist says the Director said so," and the
  distinction between delegated and reported authority quietly disappears. In an org whose product
  is bounded authority, that is the failure that matters.
- **Ossification.** Seats block on the Director for work already ratified, and the Director becomes
  a bottleneck on their own delegated authority — which defeats the point of delegating it.

The rule exists to make the boundary explicit so neither happens by default.

### 3. The evidence that a quote is not merely nice

The relaying seat had, on the same day, twice asserted something about the Director's state that
turned out wrong: a draft memo claiming *"Director-confirmed"* on an uncertain recollection (deleted
before filing), and a filed memo announcing a seat was going cold when it did not. Both were
self-corrected. Neither was distinguishable from the receiving end.

The implementer's reading — *"usually fine, sometimes not, and not distinguishable from here"* — is
the correct basis for a rule. Relays are not untrustworthy; they are **unverifiable**, and a quote
converts an unverifiable report into checkable evidence at zero cost.

## Proposed Change

### A. Two classes of instruction

**A1. Delegated direction.** A seat MAY act on direction from a seat that holds delegated authority
over that work, without Director confirmation, provided the work sits inside an already-ratified
shape. Prioritization among ratified queue items is delegated direction.

**A2. Reported authorization.** A seat MUST NOT act on a *relayed* lift, grant, or exception where
the authority relayed is **not** the relaying seat's to exercise. This covers, at minimum:

- lifting a constraint the Director placed on a seat directly;
- any authorization the charter reserves to the Director (ratification, merge, release, version
  bump, governance change);
- any grant that would widen a seat's scope beyond its charter description.

**A3. The test is who imposed the constraint, not how it was worded.** If the relaying seat could
have issued the instruction on its own authority, it is A1. If it could not, it is A2 regardless of
how confidently it is phrased.

### B. Quote, don't assert

**B1.** A seat relaying an A2 authorization MUST carry the authorizer's words **verbatim**, with
enough context to interpret them: what was said, when, and what it was said in response to.

**B2.** Paraphrase is not relay. *"The Director authorized X"* is a claim about a fact; the fact is
the Director's sentence.

**B3.** Where the relayed words leave something the relaying seat had to infer, the relay MUST say
so and name the inference. A relay that presents its own inference as the authorizer's instruction
is the failure this rule exists to prevent.

**B4.** B1–B3 apply to A1 relays too, as a SHOULD. Quoting costs nothing and a quoted direction is
strictly better than an asserted one.

### C. What the receiving seat does

**C1.** A seat receiving an A2 instruction without a verbatim quote MUST hold, and MUST say what
would discharge the hold. **A hold is not a refusal**, and stating the discharge conditions is what
distinguishes them.

**C2.** A seat MAY proceed on a quoted A2 relay if, in its own judgment, the quoted words settle the
question. That judgment belongs to the seat holding the constraint, not to the relaying seat, and
the relaying seat MUST NOT press it.

**C3.** Where a quote settles the reserved question but leaves a detail the relaying seat is
authorized to decide, the instruction is discharged. *Worked example:* the Director's words settled
that the stand-by was lifted (reserved to them); *which* ratified item ran first was prioritization
inside a ratified shape (delegated to the strategist). The gap the quote left was the gap the
strategist was authorized to fill.

**C4.** Holding costs latency. Acting on an unverifiable authorization costs the boundary. Where the
work will not land until the Director returns anyway — which is always, since no seat merges — the
latency is already sunk and the hold is close to free. Weigh accordingly.

### D. What this does not change

Nothing here widens any seat's authority. A1 restates delegation the charter already grants; A2
restates limits it already imposes. The additions are B (an obligation on the relayer) and C (a
procedure for the receiver), both of which make an existing boundary legible rather than moving it.

## Backward Compatibility

No existing artifact becomes non-conformant. Memo 2150 stands as filed, uncorrected, as the worked
example of an A2 relay that failed B1 — committed deliberately in `162579d` for that reason.

## Conformance Tests

1. A seat receiving an unquoted A2 instruction holds and states its discharge conditions.
2. A relayed A2 authorization carries verbatim words, a time, and what they responded to.
3. A relay that contains an inference names it as one.
4. A seat acting on delegated direction within a ratified shape does not seek Director confirmation.
5. A relaying seat whose quote is judged insufficient does not press the point.

## Alternatives Considered

- **Require Director confirmation for all direction** — rejected: ossification. It makes the
  Director a bottleneck on authority they have already delegated, and would have blocked
  prioritization of a ratified queue item.
- **Treat any strategist relay as sufficient** — rejected: erosion, and it is the specific erosion
  this framework exists to prevent.
- **Make it a matter of trust between seats** — rejected. The seats cannot verify each other; they
  can only read each other's artifacts. A rule about artifacts is enforceable, a rule about trust
  is not.
- **Rule only on quoting, not on the class distinction** — rejected: quoting is the remedy, the
  class distinction is the reason. A rule that says "always quote" without saying why gets dropped
  the first time it feels bureaucratic.

## Open Questions

1. **Standing lifts.** May the Director pre-authorize a class — *"the strategist may lift stand-bys
   on ratified queue items"* — and would that be an A1 conversion or a standing A2 grant needing
   re-issue? Leaning: a standing grant, recorded as an artifact, cited by reference in each relay.
2. **Does this generalize beyond the Director?** If a future org has intermediate authority, the
   same distinction should hold with "the seat that imposed it" in place of "the Director." Drafted
   Director-specific because that is the only case OG has.
3. **Promotion.** One derivation, one org, one incident. Not proposed for `recommended_patterns`
   promotion yet; this is a charter-level rule for this org. Revisit under pattern #8 if another
   OG-shaped org derives it independently.

## Cross-spec coordination

None. Authority relay is pattern-shape and OG-internal.

## References

- Requested by: `memos/2026-08-24-2155--og-implementer--og-strategist--step-3-held-relayed-lift-is-not-director-confirmation` §5.3
- The relay that failed B1: `memos/2026-08-24-2150` (committed uncorrected)
- The quote that discharged it: `memos/2026-08-24-2200` §3–4
- The decomposition in C3: `memos/2026-08-24-2210`
- Charter: `governance_model`; `recommended_patterns.general` #1 (bounded authority); `relationships` strategist→director; CLAUDE.md "Bounded-authority discipline (universal)"
