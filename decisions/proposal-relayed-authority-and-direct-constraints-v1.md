# Decision: Relayed authority and directly-imposed constraints

**Disposition:** Accept (Director-ratified 2026-08-25, "Yes, I ratify this"; merge seals it)
**Origin:** [proposals/relayed-authority-and-direct-constraints-v1.md](../proposals/relayed-authority-and-direct-constraints-v1.md)
**Decided:** 2026-08-25 by og-strategist under Director direction, from a governance question raised by the og-implementer seat during the 2026-08-24 build of step 3.
**Authorization:** Requested by og-implementer (memos/2026-08-24-2155 §5.3); drafted by og-strategist as pattern-shape; ratified by the Director.

## Disposition

Two rules and one distinction govern what a seat may act on when the authorizer is not present.

> **A seat may act on strategist direction within a ratified shape. A seat may NOT act on a relayed
> lift of a constraint the Director placed on that seat directly — that requires the Director's own
> words.**

Plus a standing obligation on the relaying seat: **quote, don't assert.**

## Rationale

Captured in the proposal. The load-bearing point is that the test is **who imposed the constraint**,
not whether the relay happened to be quoted:

- Directing implementer-execution priorities is authority the charter already delegates to
  og-strategist. Requiring Director confirmation for it would make the Director a bottleneck on
  authority they have already delegated.
- A stand-by placed by the Director, on a seat, in that seat's own session was never strategist
  authority. Relaying it is reporting someone else's authorization, not exercising one's own.

Without the rule the org drifts into one of two failures: **erosion**, where seats normalize acting
on "the strategist says the Director said so"; or **ossification**, where seats block on the
Director for work already ratified.

Quoting is the remedy; the class distinction is the reason. A rule that said only "always quote"
would be discarded the first time it felt bureaucratic.

## Resolutions to Open Questions

- **OQ1 (standing lifts): OPEN.** Whether the Director may pre-authorize a class — e.g. "the
  strategist may lift stand-bys on ratified queue items" — and whether that converts the case to A1
  or is a standing A2 grant needing citation. The strategist declined to resolve this in a proposal
  that would have granted itself the power. Directors's call when it matters.
- **OQ2 (generalization beyond the Director): OPEN.** The distinction should hold with "the seat
  that imposed the constraint" substituted for "the Director" in any org with intermediate
  authority. Drafted Director-specific because that is the only case OG has.
- **OQ3 (promotion): RESOLVED — no promotion.** One derivation, one org, one incident. This is
  recorded as charter-level governance for this org, **not** as a `recommended_patterns.general`
  entry. Revisit under pattern #8 only if another OG-shaped org derives it independently.

## Notable design choices

1. **The rule is about artifacts, not trust.** Seats cannot verify each other; they can only read
   each other's filings. A rule about what a filing must carry is enforceable; a rule about
   inter-seat trust is not.
2. **A hold is not a refusal.** §C1 requires a holding seat to state what would discharge the hold.
   That is the difference between a governance gate and an obstruction, and it is what let the
   2026-08-24 hold resolve in fifteen minutes rather than waiting for the Director.
3. **§C3 keeps the rule from causing the round trip it prevents.** Where a quote settles the
   reserved question but leaves a detail the relaying seat is authorized to decide, the instruction
   is discharged. The worked example is the incident itself: the Director's words settled that the
   stand-by was lifted; *which* ratified item ran first was delegated prioritization.
4. **The relaying seat MUST NOT press a judgment that is not its own** (§C2). The seat holding the
   constraint decides whether a quote suffices.
5. **Inferences must be named** (§B3). A relay that presents its own inference as the authorizer's
   instruction is the precise failure the rule prevents — and is what happened on 2026-08-24.

## Items not incorporated

- Requiring Director confirmation for all direction — rejected: ossification.
- Treating any strategist relay as sufficient — rejected: erosion, and the specific erosion this
  framework exists to prevent.
- Promotion to `recommended_patterns.general` — held under pattern #8 (OQ3).

## Build directive

1. Charter → **v0.3.2**: record the rule in `governance_model`, following the v0.3.0 precedent of
   using an existing orgdef field rather than minting one (format-shape restraint).
2. `CLAUDE.md` → extend "Bounded-authority discipline (universal)" with the two classes, the
   quote-don't-assert obligation, and the hold-with-discharge-conditions procedure.
3. No skill change required. `og-claim-seat` already models the shape: authorization gate, propose →
   authorize → operate.

## Defect in the ratified proposal, corrected here

The proposal's **Target version** line states that it adds a `recommended_patterns.general` entry,
while its own **OQ3** states it is not proposed for promotion. Direct contradiction, present in the
document at ratification and surfaced by the strategist rather than silently resolved.

**Resolved in favour of OQ3** — the considered position, consistent with pattern #8 and with the
v0.3.0 precedent for recording org-specific governance in `governance_model`. The header line was
careless drafting. Recorded rather than quietly fixed, since the Director ratified the document
containing it.

## Cross-spec coordination

None. Authority relay is pattern-shape and OG-internal.

## Workflow validation

The rule's first live test was its own ratification: the strategist declined to treat *"Sure, that
looks fine"* as ratification of a governance rule, and asked for the Director's explicit word before
triggering a charter bump. §B2 in practice — paraphrase is not relay, and approval is not
ratification.

## References

- Proposal: [proposals/relayed-authority-and-direct-constraints-v1.md](../proposals/relayed-authority-and-direct-constraints-v1.md)
- Requested by: `memos/2026-08-24-2155` §5.3
- The relay that failed §B1: `memos/2026-08-24-2150` (committed uncorrected in `162579d`)
- The quote that discharged it: `memos/2026-08-24-2200` §3–4
- The §C3 decomposition: `memos/2026-08-24-2210`
- Charter: `governance_model`; `recommended_patterns.general` #1; CLAUDE.md "Bounded-authority discipline (universal)"
