# Proposal: Action discharge — making a communication substrate actually enumerable

**Status:** Draft — awaiting Director ratification
**Author:** og-strategist
**Created:** 2026-08-24
**Target version:** charter v0.3.2 (tightens the `enumerable` property ratified in v0.3.0); no CLAUDE.md rule change beyond the convention itself.

## Origin

Surfaced within the hour by a **fresh og-implementer session running `/og-orient`** against the
just-pushed v0.3.0 substrate. Its own inbox query returned **26 memos carrying
`action_required: true`**, dating back to May — nearly all of them long discharged.

Nobody was looking for this. It fell out of a cold session doing exactly what the substrate tells
it to do.

## Summary

`action_required` is written once and never discharged. The substrate can therefore enumerate
**ever-actioned** communications but not **open** ones — which defeats the property v0.3.0 made
normative one commit earlier.

Proposed: a discharged action is **marked**, not erased, using existing free-form envelope
`metadata`. No memodef change required.

## Motivation

### This is a defect against a just-ratified normative property

[decisions/proposal-communication-substrate-and-seat-notification-v1.md](../decisions/proposal-communication-substrate-and-seat-notification-v1.md)
§A2.4 makes **enumerable** one of four MUST properties of a conforming communication substrate, and
the same decision leans on it harder than on anything else:

- it is why **OG ships no notification component** — enumerability is the floor a seat stands on;
- it is the **backstop** when no notification mechanism exists or a seat cannot confirm it is
  reachable (§B4);
- it is what makes "never treat silence as an empty inbox" an instruction a seat can actually act on.

If every memo ever marked `action_required` stays marked forever, a seat cannot distinguish its
**inbox** from its **archive**. The floor is not a floor.

### It is already costing real triage

This seat hit it on 2026-08-24 while orienting and wrote it off as noise — *"most are old and
resolved"* — then moved on. That is precisely the failure mode: the flag is so unreliable that a
seat learns to ignore it, which is worse than not having it. The fresh implementer session was the
first to state it as a defect rather than route around it.

## Proposed Change

### A. A discharged action MUST be marked

When the action a communication requested has been discharged — completed, declined, superseded, or
overtaken — the **discharging seat** records that on the original artifact:

```json
"metadata": {
  "discharged": {
    "on": "2026-08-24",
    "by": "og-strategist <og-strategist@ogframework.orgdef>",
    "via": "memos/2026-08-24-1450--og-strategist--og-implementer--four-items-accepted...",
    "disposition": "completed"
  }
}
```

`disposition` is one of **`completed`** / **`declined`** / **`superseded`** / **`overtaken`**.
`via` points at the artifact that discharged it, so the trail is followable in both directions.

### B. `action_required` itself is NOT flipped

The boolean stays as authored. Discharge is **additive**.

This is the load-bearing choice and it follows directly from the org's standing refusal to edit
dated records. `action_required` was true when the memo was filed; that remains true of the memo as
filed. Flipping it would make the record assert something about its own past that is false, and
would destroy the very fact a reader wants — *this was asked, and here is what came of it*.

An open item is therefore: **`action_required: true` AND no `metadata.discharged`.**

### C. The discharging seat marks it, not the sender

Whoever discharges the action records the discharge. A sender does not get to declare its own
request satisfied.

### D. Enumeration is defined

A conforming substrate MUST be able to answer **"what is open, addressed to this seat?"** — not
merely "what was ever actioned." Substrates that model status natively (Jira, trackers) satisfy this
through their own status field; the §A encoding is the answer for `memos/`.

### E. Backfill

Existing `action_required: true` memos are swept once against the record, marking each with the
artifact that discharged it. Where discharge cannot be established from the record, the memo is left
**unmarked** — that is, genuinely open — rather than guessed at. A wrong `completed` is worse than
an honest unknown.

## Backward Compatibility

- **No memodef change.** `metadata` is already free-form and this org's memos already carry
  `scope_check`, `applies_principles`, `related_artifacts` there. Whether discharge deserves a
  first-class envelope field is a **memodef-strategist** question, routed below.
- **No existing artifact loses content.** Discharge is purely additive.
- **Substrate-neutral.** §D states the requirement; §A is one encoding of it.

## Conformance Tests

1. A seat can list communications addressed to it that are open — `action_required: true` with no
   `metadata.discharged` — and the result is materially smaller than the ever-actioned list.
2. A discharged memo names what discharged it, and that artifact exists.
3. No `action_required` boolean is altered by discharge.
4. Backfill leaves undeterminable items unmarked rather than guessing.

## Alternatives Considered

- **Flip `action_required` to false on discharge** — rejected per §B. Simplest and it destroys the
  record's own account of itself. Tempting because it makes the naive query work.
- **Add a first-class memodef envelope field** — not rejected, **routed**. Correct long-term home if
  memodef wants it, but it is format-shape and cannot be minted from this repo. §A works today
  inside existing structure; a first-class field can supersede it later without loss.
- **A separate open-items index file** — rejected: a second source of truth that will drift from the
  artifacts, and drift is exactly what this proposal is fixing.
- **Do nothing; seats read newest-first and judge** — rejected. That is the status quo, it already
  trained one seat (this one) to ignore the flag, and it makes §A2.4 unenforceable.

## Open Questions

1. **Does `overtaken` need distinguishing from `superseded`?** Drafted as separate because they
   differ in whether a successor artifact exists. Collapse if that proves fussy in practice.
2. **Who discharges a memo addressed to an external spec's strategist** (e.g. the `.orgdef`
   borrowing memo to orgdef-strategist)? Their reply is the discharge, but it lands in their repo.
   Provisional answer: this org marks discharge when the reply is received and cites it, since the
   open-item question being answered is *ours*.

## Cross-spec coordination

**memodef-strategist** — two questions, and they compose with the memo already owed on
communication-artifact semantics versus encoding: (a) should discharge be a first-class envelope
field rather than free-form `metadata`; (b) if OG requires substrates to answer "what is open," does
memodef want to say how a memodef-encoded substrate answers it.

## References

- Defect against: [decisions/proposal-communication-substrate-and-seat-notification-v1.md](../decisions/proposal-communication-substrate-and-seat-notification-v1.md) §A2.4, §B4
- Surfaced by: fresh og-implementer `/og-orient`, 2026-08-24, post-v0.3.0 push
- Charter: v0.3.1 history entry records the finding alongside the incumbent-identifier fix
