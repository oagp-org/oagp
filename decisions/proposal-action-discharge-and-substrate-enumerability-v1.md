# Decision: Action discharge — making a communication substrate actually enumerable

**Disposition:** Accept (Director-ratified 2026-08-25, "Yes, that looks good"; merge seals it)
**Origin:** [proposals/action-discharge-and-substrate-enumerability-v1.md](../proposals/action-discharge-and-substrate-enumerability-v1.md)
**Decided:** 2026-08-25 by og-strategist under Director direction. Defect surfaced 2026-08-24 by a fresh og-implementer session running `/og-orient` against the just-pushed v0.3.0 substrate.
**Authorization note:** the Director's words were *"Yes, that looks good."* The strategist read that as ratification and **named the reading as an inference** at the time rather than asserting it, per the relayed-authority decision ratified the same day (§B3). Recorded because approval and ratification are different acts and the distinction is one this org has now made rules about.

## Disposition

`action_required` is written once and never discharged, so the substrate enumerates **ever-actioned**
communications rather than **open** ones. That defeats `enumerable` — a MUST property of a conforming
communication substrate under
[proposal-communication-substrate-and-seat-notification-v1](proposal-communication-substrate-and-seat-notification-v1.md)
§A2.4, ratified one commit earlier.

**A discharged action is marked, not erased.** Additive `metadata.discharged`:

```json
"discharged": {
  "on": "2026-08-24",
  "by": "og-strategist <og-strategist@ogframework.orgdef>",
  "via": "memos/2026-08-24-1450--…",
  "disposition": "completed"
}
```

`disposition` ∈ **`completed`** / **`declined`** / **`superseded`** / **`overtaken`**.

**An open item is `action_required: true` AND no `metadata.discharged`.**

## Rationale

Enumerability is load-bearing in a way the other three properties are not: it is why **OG ships no
notification component**, it is the backstop when a seat cannot confirm it is reachable (§B4), and it
is what makes *"never treat silence as an empty inbox"* an instruction a seat can act on. If every
memo ever flagged stays flagged, a seat cannot distinguish its inbox from its archive.

The count is not static. 26 flags at discovery on 2026-08-24; **28 by 2026-08-25**. It grows every
time either seat does ordinary work, which is the argument for fixing it rather than sweeping the
historical backlog and moving on.

## Notable design choices

1. **`action_required` is NOT flipped** (§B). It was true when the memo was filed and remains true
   *of the memo as filed*. Flipping it would make the record assert something false about its own
   past and destroy the fact a reader actually wants — *this was asked, and here is what came of it*.
   The simpler alternative (flip the boolean) is rejected precisely because it makes the naive query
   work at the cost of the record.
2. **The discharging seat marks it, not the sender** (§C). A sender does not declare its own request
   satisfied.
3. **Enumeration is defined as a capability, not an encoding** (§D): a conforming substrate MUST be
   able to answer *"what is open, addressed to this seat?"* Substrates with native status (Jira,
   trackers) satisfy it through their own field; the §A encoding is the answer for `memos/`.
4. **Backfill leaves undeterminable items unmarked** (§E). A wrong `completed` is worse than an
   honest unknown.
5. **No memodef change required.** `metadata` is already free-form and this org's memos already carry
   `scope_check`, `applies_principles`, `related_artifacts` there.

## Resolutions to Open Questions

- **OQ1 (`overtaken` vs `superseded`): RESOLVED — keep both.** A live case arrived the same day: the
  conformance-#3 detection ruling was answered *and* rendered moot by the Director's decision to
  retire the transport — not superseded by a successor, simply overtaken
  (`memos/2026-08-24-2110`). The distinction earns its place.
- **OQ2 (discharging a memo addressed to an external spec's strategist): OPEN.** Provisional answer
  stands — this org marks discharge when the reply is received and cites it, since the open-item
  question being answered is ours.

## Corrections to the ratified proposal, recorded rather than fixed silently

**1. No charter bump is required.** The proposal's *Target version* line says charter v0.3.2,
"tightens the `enumerable` property ratified in v0.3.0." The four substrate properties are **not in
the charter** — they live in the v0.3.0 decision and in `CLAUDE.md`. Verified before filing. So this
decision changes `CLAUDE.md` and no charter version. *(Second proposal in two days whose
target-version line was wrong in this direction; the drafting seat should verify where a property
actually lives before naming the artifact that carries it.)*

**2. `via` assumes the discharge produced an artifact, and sometimes it did not.** The worked example
is in this org's own record: the conformance-#3 ruling was made in conversation with the Director and
existed nowhere until `memos/2026-08-24-2110` forced it into being. Under §A, marking such a memo
discharged **requires an artifact to point at** — so the rule quietly compels filing one.

**That consequence is accepted and is the correct behaviour**, not a defect: an action discharged
with no artifact is a decision that exists only in someone's session, which is the failure this org
keeps finding. Stated explicitly so nobody treats it as an obstacle to marking.

## Build directive

1. **`CLAUDE.md`** — record the discharge convention alongside the communication-substrate rule in
   *What every OG seat does*.
2. **The §E backfill sweep is NOT authorized by this decision.** 28 memos, each needing a judgment
   about what discharged it, is implementer-execution work of real size and is unassigned. It needs
   its own directive, and the Director should see the size before it starts.
3. **Memo owed to memodef-strategist**: whether discharge should be a first-class envelope field
   rather than free-form `metadata`, and whether memodef wants to say how a memodef-encoded substrate
   answers *"what is open."* Composes with the memo already owed on communication-artifact semantics
   versus encoding.

## Items not incorporated

- Flipping `action_required` on discharge — rejected (§B).
- A first-class memodef envelope field — **routed**, not rejected. Format-shape; cannot be minted
  from this repo.
- A separate open-items index — rejected: a second source of truth that drifts from the artifacts,
  which is what this decision exists to fix.

## Cross-spec coordination

**memodef-strategist** — see build directive item 3.

## Workflow validation

Surfaced by a cold read, not by the seat that built the substrate. Third such finding in two days,
alongside the missing `.orgdef` identifiers and the dead references in two committed memos.

## References

- Proposal: [proposals/action-discharge-and-substrate-enumerability-v1.md](../proposals/action-discharge-and-substrate-enumerability-v1.md)
- Defect against: [proposal-communication-substrate-and-seat-notification-v1](proposal-communication-substrate-and-seat-notification-v1.md) §A2.4, §B4
- Live case for `overtaken`: `memos/2026-08-24-2110`
- Surfaced by: fresh og-implementer `/og-orient`, 2026-08-24
