# Session closeout 2026-08-24 — communication substrate split out, doorbell amended, skill suite v2

**From:** og-strategist
**To:** og-strategist (institutional capture)
**Date:** 2026-08-24
**Action required:** No

Seat resumed on Director authorization after a ~10-week gap (last session 2026-06-15). Session ran
long; two staffed seats operated concurrently and coordinated through the substrate.

---

## Merged (Director-authorized; author = seat, committer = Director)

- `65e73d7` — field-report fixes: installer link-deletion guard, README v0.2.1 rewrite, env-driven
  example paths
- `3b5dd47` — strategist record + skill-suite v2 draft

## Drafted, awaiting Director merge-ratification

| Artifact | What |
|---|---|
| [proposals/og-skill-suite-v2.md](../proposals/og-skill-suite-v2.md) | 7→6 cards; `og-create-org` (adopt+create merged), `og-describe-org`, `og-close-session`, `og-add-seat`; naming rule (verb+object, two axes); composed seams; discipline moved into generated `CLAUDE.md` |
| [proposals/communication-substrate-and-doorbell-transport-v1.md](../proposals/communication-substrate-and-doorbell-transport-v1.md) | substrate vs transport split; channels EOL; `.orgdef` addressing; attestation; §E skill consequences + `og-change-comms-substrate` |
| memos 1257, 1422, 1450, 1500, 1505, 1510, 1858 | claim-seat; implementer directive; acceptance; vendor assessment; deaf-seat ruling; delivery probe; orgdef cross-spec FYI |

Untracked/modified at close: 28 paths (both seats' memos, four `channels/` files, `+11/−5` installer
comment rewrite, two pre-existing transcripts, `.wrangler/`, two May/June closeouts never swept).

## Strategist calls made (drafted, not enacted)

1. **Communication substrate ≠ doorbell transport.** Director-originated, formalized. Four normative
   properties (durable, seat-addressable, auditable, enumerable); `memos/` is the default; ratifying
   a substrate does not confer conformance on it. Resolves a standing contradiction between charter
   value #3 and CLAUDE.md's `memos/` mandate.
2. **A notification MUST NOT be the transport.** Supplies the *architectural* rationale for
   pointer-not-payload — the pointer forces the record into the durable layer. The June decision
   justified it on prompt-injection grounds; that is the side benefit, not the point.
3. **Channels adapter retired** as a reference transport; convention and poll transport retained.
   Grounds include its being demonstrably deaf on the Director's working surface while a rival pipe
   reached the same seat in the same repo.
4. **`.orgdef` seat addressing** (Director-proposed): `<seat>@<charter-id>.orgdef`, conferred by
   claim-seat, superseding an earlier draft that made the runtime session name the address. Address
   is stable and org-scoped; binding is disposable and runtime-specific. Git authorship unifies on
   it (Director call).
5. **"A seat cannot know it is deaf"** — implementer-returned finding accepted and escalated to a
   defect in the *ratified* doorbell decision. Four requirements: startup attestation, fail loud,
   explicit backstop, deafness reportable. The convention creates the reliance it then fails
   silently.
6. **Conformance #3: transport-independence met, promotion HELD.** Two transports validated against
   an unmodified core. Promotion withheld on one leg: no live seat has been woken by the
   vendor-neutral transport. Path B had to clear that bar in June; the neutral path does not get a
   lower one.

## In flight

- **Vendor-neutral transport built** — `channels/src/{memo-watch-poll,doorbell-attest,doorbell-status}.js`
  + tests. Strategist-verified independently: imports are `node:*` plus the shared core, no vendor
  SDK; `doorbell-core.js` unmodified; 17/17. Awaiting merge.
- **Arousal run not done** — the single leg between the doorbell and canonical status. Requires the
  seat registry (C4.5) and a channel-capable surface. Ruling recorded in advance: the wake step is
  inherently runtime-specific and neutrality survives because the vendor part sits behind the `exec`
  seam.
- **Implementer** `+11/−5` installer comment rewrite outstanding.

## Open — for the Director

1. **§E3 consistency question.** A seventh card (`og-change-comms-substrate`) on one derivation,
   having declined `og-describe-seat` on one derivation the same day. The distinction claimed is
   class (governance operation with a silent failure mode vs. convenience view). If it does not
   hold, the consistent action is to park E3 and document the procedure in `CLAUDE.md`.
2. **OQ1 multiple substrates** — live now: Jira for work, `memos/` for governance.
3. **v1 criterion (d)** — whether edgreenlight closes it. Real non-spec org, but the Director's own.
4. Charter bumps implied: v0.2.2 (skill suite) and v0.3.0 (substrate + Reserved Conventions identity
   change).

## Open — routed

- **orgdef-strategist** — reply owed on the `.orgdef` borrowing and whether any of it is
  format-shape (memos/2026-08-24-1858).
- **memodef-strategist** — memo owed on ratification: required communication-artifact semantics vs.
  their encoding (§A4).
- **Canonical-orgs library residence** — reply to orgdef-strategist, outstanding since 2026-05-24.

## Sequence the Director named at close

Closeout → implement the ratified changes → bring this org onto Jira → return to the edgreenlight
strategist whose broken skills originated the session.

## Corrections this seat made to its own record

Recorded because a later reader should see them, not because they need re-litigating.

- Offered the implementer a false either/or (doorbell vs. Director relay); the answer was neither —
  the seat listed `memos/` during claim-seat. The designed backlog fallback, working by coincidence
  of card.
- Filed memo 1510 with no `.openthing` envelope — invisible to every core-based transport.
  Retrospectively authored with the defect noted in `metadata.envelope_note` rather than backfilled
  silently.
- Reported one live stale path in the sweep; there were three constants plus two docstring notes.
- Drafted a ruling memo claiming "Director-confirmed" on a "I think so? Unless I made a mistake?".
  Deleted before filing; a controlled trial was run instead.
- Argued the vendor transport could not reach the Director's machine; false premise (a version
  floor, not a platform gap), withdrawn in memos/2026-08-24-1500.

## Note for the next incumbent

Two findings came from seats catching each other rather than from either seat alone: the deaf-seat
defect (implementer → strategist) and the subject-bloat erosion of pointer-not-payload, which the
implementer found in its own output and which indicts this seat's house style. The session's most
useful outputs were negatives — two "no evidence" answers left standing, and a promotion held on the
most encouraging day the convention has had. That posture is the thing to inherit.

— og-strategist
