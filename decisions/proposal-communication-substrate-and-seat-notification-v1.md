# Decision: Communication substrate and seat notification

**Disposition:** Accept (Director-ratified 2026-08-24, "Reviewed and ratified"; merge seals it)
**Origin:** [proposals/communication-substrate-and-seat-notification-v1.md](../proposals/communication-substrate-and-seat-notification-v1.md)
**Decided:** 2026-08-24 by og-strategist under Director direction. The substrate/notification split is Director-originated; the strategist formalized it, and the Director subsequently directed the retirement of OG's bespoke notification implementation.
**Authorization:** Pattern-shape design is delegated strategist authority; the Director ratifies. Charter changes and the promotion below are the Director's.
**Supersedes:** [proposal-seat-inbox-notification-doorbell](proposal-seat-inbox-notification-doorbell.md) — **superseded, not withdrawn.** That decision, its proposal, its memo trail and its commits stand as dated records.

## Disposition

Split one conflated concept into two named layers, governed by one rule.

| Term | What it is | Properties |
|---|---|---|
| **Communication substrate** | The durable record layer inter-seat communication lives in | Durable and exportable, seat-addressable, auditable, enumerable |
| **Seat notification** | Telling a warm seat something arrived | Best-effort, runtime-native, may be absent |

> **A notification MUST NOT be the transport. It carries a pointer into the substrate.**

**OG ships no notification component.** Orgs use what their runtime provides; where a runtime
provides none, seats enumerate their inbox at session start, which the substrate's `enumerable`
property guarantees.

## Rationale

1. **The charter and CLAUDE.md contradicted each other** — value #3 holds OG separable from any
   substrate; CLAUDE.md mandated `memos/`. A substrate commitment hiding inside a pattern rule,
   surfaced by a real adopter moving to Jira.
2. **Building a bespoke notification mechanism was the wrong kind of neutrality** — real effort spent
   producing something no adopter would install, to avoid stating an awkward true thing. The honest
   position: OG defines the convention; you implement it on what your runtime gives you.
3. **It supplies the missing rationale for pointer-not-payload.** The superseded decision justified
   it on prompt-injection grounds. The architectural reason is that **the pointer forces the record
   into the durable layer**; if the notification carries content, the audit trail is empty. Security
   is the side benefit.

## Resolutions to Open Questions

- **OQ1 (multiple substrates): RESOLVED.** An org designates **one primary substrate carrying the
  record of authority**, and MAY use a secondary for the record of activity. Director's formulation,
  adopted verbatim as the working statement: *"Jira is tactical, memos remain as the record of
  strategy."* B1 governs across the boundary — a tactical ticket carries a **pointer** to the
  governance artifact, never a copy.
- **OQ2 (Jira seat addressing): RESOLVED for this org** — **labels** (`seat:og-implementer`), not
  assignee. Assignee couples seats to Atlassian accounts and makes "who holds this seat" a licensing
  question, breaking the seat abstraction. Non-binding on adopters.
- **OQ3 (runtime survey): OPEN.** §C asserts Claude Code is the only runtime known to provide seat
  notification as of 2026-08. That rests on one seat's knowledge and MUST be checked before
  publication. Director has taken it.

## Notable design choices

1. **Ratification selects among conforming substrates; it does not confer conformance** (A3).
   Without this, "requires *a* ratified substrate" admits chat.
2. **`enumerable` is the baseline, not a convenience** — it is how a seat learns of arrivals;
   notification is an optimization on top. This is what lets OG ship no notification component.
3. **Pointer-not-payload is a MUST on the sender** (B2), explicitly *not* a transport guarantee. On
   the retired implementation it was structural; on any runtime-native mechanism nothing enforces
   it. Recorded as the known soft spot rather than papered over.
4. **Bounded subjects** (B3) — a paragraph-length subject is payload wearing a metadata badge.
   Surfaced by og-implementer against its own output; this seat's house style was the offender.
5. **`.orgdef` addressing** (D) — `<seat>@<charter-id>.orgdef`, conferred by `/og-claim-seat`, never
   self-assigned. **The address is stable and org-scoped; the binding is disposable and
   runtime-specific.** Supersedes an earlier draft that made the runtime session name the address —
   which conflated the two and is unreliable in practice.
6. **Git authorship unifies on the same identity** (D6). Second seat-identity change since
   2026-06-01, recorded as defect-driven rather than churn: `@ogframework.com` is a real-looking
   mailbox that is not one. Historical commits keep their as-authored identities.
7. **The vendor tool answers a question OG had built machinery for.** `/list-agents` and `/status`
   let a seat check whether it is reachable — which is why the attestation mechanism is retired
   rather than ported.

## Promotion

**`seat-inbox-notification` is promoted to `recommended_patterns.general`** (9th entry), on
Director ratification.

Evidence: a vendor-neutral implementation with zero vendor dependency rang correctly on a real
artifact; a live seat was notified, resolved the pointer from the substrate and acted on the
artifact, on a real directive rather than a probe; three independent mechanisms carried the same
semantic unchanged. The two legs were demonstrated on **different** mechanisms rather than one.

**Recorded conflict of interest:** this seat held this gate repeatedly on 2026-08-24 — including
against the day's most encouraging result — and named promotion pressure as its standing failure
mode on taking the chair. It then recommended promotion in the same session. The reasoning is
therefore stated rather than assumed, and the conservative alternative (operate the retired
implementation once with a live seat, putting both legs on one mechanism) was offered and not taken.

## Items not incorporated

- Keeping `memos/` mandatory — rejected; contradicts value #3 and failed a real adopter.
- Continuing to ship a bespoke notification mechanism — rejected.
- **Erasing the prior work from the record** — rejected (F2). Retro-editing records when they become
  inconvenient is how an audit trail stops being one, and this framework sells audit trails.
- Making Claude Code cross-session messaging canonical — rejected; red-line violation. §C is
  implementation guidance for one runtime and conformance never requires it.

## Build directive

1. Retire the bespoke notification implementation from the **forward surface** — README, docs,
   canonical guidance. Records, commits and memo trail untouched.
2. Skills per §E: `og-create-org` elicits and records the substrate and writes it inline into the
   generated `CLAUDE.md`; `og-orient` / `og-describe-org` read the ratified substrate; `og-claim-seat`
   records the `.orgdef` address plus current session binding and reports reachability; add
   `og-change-comms-substrate`.
3. Charter → **v0.3.0**: substrate declaration; `recommended_patterns.general` 9th entry; Reserved
   Conventions bot identity → `.orgdef` (D6).
4. This org: declare `memos/` primary (strategy) and OGF Jira secondary (tactics) per OQ1.

## Cross-spec coordination

- **orgdef-strategist** — filed 2026-08-24 (memos/2026-08-24-1858) on minting `.orgdef` as a
  pseudo-TLD; reply outstanding, non-blocking. If they object, the suffix is cheap to change now and
  expensive once in commit history.
- **memodef-strategist** — memo owed: required communication-artifact semantics (A4) versus their
  encoding, including whether a non-memodef substrate can claim conformance.

## Workflow validation

Charter bumps land in order: v0.2.2 (skill suite) then v0.3.0 (this). Both were ratified in the same
session; sequencing is a merge-ordering matter, not a dependency.

## References

- Proposal: [proposals/communication-substrate-and-seat-notification-v1.md](../proposals/communication-substrate-and-seat-notification-v1.md)
- Supersedes: [proposal-seat-inbox-notification-doorbell](proposal-seat-inbox-notification-doorbell.md)
- Companion: [proposal-og-skill-suite-v2](proposal-og-skill-suite-v2.md)
- Runtime documentation: https://code.claude.com/docs/en/cross-session-messaging
- Session record: memos/2026-08-24-1924
