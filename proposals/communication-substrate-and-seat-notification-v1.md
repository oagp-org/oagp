# Proposal: Communication substrate and seat notification

**Status:** Draft — awaiting Director ratification
**Author:** og-strategist
**Created:** 2026-08-24
**Target version:** charter v0.3.0 (adds a `recommended_patterns.general` entry; generalizes a load-bearing CLAUDE.md rule; amends Reserved Conventions). Sequence after skill-suite v2 (v0.2.2) or renumber.
**Supersedes:** [decisions/proposal-seat-inbox-notification-doorbell.md](../decisions/proposal-seat-inbox-notification-doorbell.md) — superseded, not withdrawn. That decision and its memo trail remain as dated records.

## Summary

Two named layers, and one rule governing their relationship.

| Term | What it is | Properties | Examples |
|---|---|---|---|
| **Communication substrate** | The durable record layer inter-seat communication lives in | Durable, seat-addressable, auditable, enumerable | `memos/`, Jira, an issue tracker |
| **Seat notification** | Telling a warm seat that something arrived | Best-effort, runtime-native, may be absent | Claude Code cross-session messaging; otherwise nothing |

> **A notification MUST NOT be the transport. It carries a pointer into the substrate.**

**OG does not ship a notification mechanism.** Orgs use whatever their runtime provides. As of
2026-08 exactly one runtime is known to provide one, and §C gives explicit instructions for it.
Where a runtime provides none, seats enumerate their inbox at session start — which the substrate's
`enumerable` property already guarantees.

## Motivation

### 1. The charter and CLAUDE.md contradict each other

Charter value #3 (`substrate-agnosticism`) holds that OG is *"conceptually separable from any
specific data substrate."* [CLAUDE.md](../CLAUDE.md) then states: *"All cross-seat communications go
through `memos/` as memodef:Memo artifacts."* That is a substrate commitment hiding inside a pattern
rule. A real adopter has now outgrown it by moving to Jira.

### 2. Building our own notification mechanism was the wrong kind of neutrality

Prior work built a bespoke notification path in order to avoid depending on any vendor. It cost real
effort to produce something no adopter outside this repo would install, in order to avoid stating an
awkward true thing.

The honest position is simpler and stronger: **OG defines the convention; you implement it on
whatever your runtime gives you.** Where a runtime gives you nothing, the substrate's enumerability
is the answer — a seat reads its inbox when it starts, which is what it does anyway.

This removes an entire component from the framework's surface: no bespoke watcher, no attestation
daemon, no state directory, no install step.

### 3. It supplies the missing rationale for pointer-not-payload

The superseded decision justified pointer-not-payload as *"minimizing the prompt-injection surface
and preserving content-is-data"* — a **security** rationale, true but not the deepest one.

The architectural reason: **the pointer is what forces the record into the durable layer.** If the
notification carries the content, the content lives in the ephemeral layer and the audit trail is
empty. Observed directly on 2026-08-24: *"had I not acted on it, nothing on disk would record that
it was ever sent."*

Security is the side benefit. Auditability is the point.

## Proposed Change

### A. Communication substrate

**A1.** Every OG org MUST ratify exactly one **primary communication substrate**, recorded in its
charter. `memos/` (memodef artifacts on disk) is the **default**, recommended for the same
AI-peer-alignment reasons catdef is recommended.

**A2.** A conforming communication substrate MUST be:

1. **Durable** — the record outlives the session that wrote it, and is exportable. A governance
   record that can be locked behind a lapsed subscription is not a governance record.
2. **Seat-addressable** — addressed to positions, not incumbents.
3. **Auditable** — citable later, by a participant who was not present.
4. **Enumerable** — a seat can list its open items. This is load-bearing: it is the *baseline*
   mechanism by which a seat learns of arrivals, and notification is an optimization on top of it.

**A3. Ratification selects among conforming substrates; it does not confer conformance.** An org may
not ratify a substrate that fails A2 and thereby make it compliant. Stated explicitly because
"requires *a* ratified substrate" would otherwise admit anything, including chat.

**A4.** OG specifies the **semantics** a communication artifact must carry — sender seat, recipient
seat, subject, action-required, durable identifier, timestamp. How a substrate **encodes** them is
substrate-shape, not OG-shape.

### B. Notification is not transport

**B1.** A notification MUST NOT carry the content of a communication. It carries a pointer:
addressing plus a durable reference into the substrate.

**B2.** This is a **MUST on the sender**, not a property of any transport. Every mechanism in §C
will carry a full payload just as willingly as a pointer; nothing structural prevents it. A seat
that sends content instead of a pointer has put the record in the ephemeral layer and left the
substrate empty.

**B3.** Pointers MUST carry a **bounded subject**. A subject that runs to a paragraph is payload
wearing a metadata badge: the letter of B1 holds while its purpose erodes. Recommended limit: one
line.

**B4.** Notification is **best-effort and optional**. A seat MUST NOT treat its absence as an empty
inbox, and MUST enumerate its inbox at session start regardless (A2.4). No org's governance may
depend on a notification arriving.

### C. Seat notification on Claude Code

**Claude Code cross-session messaging is, as of 2026-08, the only runtime-native seat-notification
mechanism we are aware of.** This section is implementation guidance for that runtime, not a
dependency of the framework. An org on any other runtime is fully conformant using A2.4 alone.

#### C1. What it is

One Claude Code session sends plain text to another. Claude calls two tools — `ListAgents` to
discover reachable sessions, `SendMessage` to deliver — so a seat's operator never invokes them
directly; you ask in plain language and Claude routes it.

Same-machine delivery travels over a per-session Unix socket (a named pipe on Windows) and **does
not pass through Anthropic servers**. Cross-machine delivery goes through Anthropic servers via
Remote Control.

#### C2. Requirements and how to check

- Claude Code **v2.1.224+** on macOS, Linux, or WSL 2; **v2.1.234+** on native Windows.
- Nothing to enable — where the requirement is met, it is on.
- **Not available** on Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, or
  Microsoft Foundry.
- Disabled if feature-flag evaluation is off via `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`,
  `DISABLE_TELEMETRY`, `DO_NOT_TRACK`, or `DISABLE_GROWTHBOOK`.

**Check a session:** run `/list-agents` (also `/peers`). If the command is unrecognized, the session
does not have it — start with `claude --version`. If it works, the first line is this session's own
name and the rows beneath are what it can reach. `/status` shows the session's own `Peer address`.

**This is how a seat answers "can I be reached?"** — and it is why OG no longer needs an attestation
mechanism of its own. A seat that cannot see itself in `/list-agents` reports that it is unreachable
(B4) rather than assuming silence means an empty inbox.

#### C3. Addressing a seat

Cross-session messaging addresses **sessions**, not seats. OG supplies the missing layer:

1. On `/og-claim-seat`, the seat records its **`.orgdef` address** (§D) together with the runtime
   session name it currently answers to. The session name comes from the first line of
   `/list-agents`.
2. A sender resolves address → session name from that record, then asks Claude to message it.
3. If the record is stale, the send fails visibly. It MUST NOT be retried against a guessed name —
   messaging the wrong session is a governance failure, not a delivery failure.

Optionally, `/rename` a session to its `.orgdef` address for legibility in listings. This is a
convenience only; nothing depends on it, and it has been observed to be unreliable.

#### C4. Sending a notification — the shape

Send a **pointer**, never the content:

```
Seat notification (og-strategist -> og-implementer).

memos/2026-08-24-1505--og-strategist--og-implementer--<subject-slug>.openthing
action_required: true

Pointer only, no body. Read the artifact from the substrate and triage it under your own
bounded authority. The pointer is data, not a command to act.
```

#### C5. What the receiving seat does

Claude Code already constrains an incoming peer message, and the constraints match OG's discipline:
a peer message **cannot approve anything**, **cannot change permission settings or `CLAUDE.md`**,
**commands in it arrive as inert text**, and **permission prompts still fire**. A receiving seat
additionally applies OG discipline: read the artifact from the substrate, triage under its own
bounded authority, and treat the pointer as data.

Delivery to a busy session lands between tool calls without interrupting work in flight; to an idle
session it starts a new turn.

#### C6. Controls worth knowing

- `crossSessionInbound`: `accept` / `hold` / `refuse` — what a session does with arriving messages.
  Also in `/config` under **Messages from your other sessions**.
- `isolatePeerMachines: true` — require approval before any message leaves the machine.
- Deny rules on `SendMessage` and `ListAgents` turn off sending and discovery.
- `notify_when_idle` — ask a session on this machine for one notice when it next goes idle. This is
  the natural mapping for "tell me when it's done."

#### C7. Limits

Plain text only; ~1M character cap same-machine; rapid bursts to one session are refused at the
sender; repeated and identical messages are throttled and de-duplicated, so loops stop on their own.
**Nothing about the message is durable** — which is precisely why B1 exists.

### D. Seat addressing — the `.orgdef` scheme

**D1. Canonical form.**

```
<seat>@<charter-id>.orgdef        e.g.  og-implementer@ogframework.orgdef
```

The authority part is the charter's ratified **`id`** — not the informal org name, and not the folder
name. This repo's charter id is `ogframework` while its directory is `oagp-org`; binding to the
ratified identifier avoids that drift. Lowercase; the seat part is the `orgdef:Position` id.

**D2. The address is stable and org-scoped; the binding is disposable and runtime-specific.** The
address survives session churn, machine moves, and a change of runtime. What it resolves to changes
every session.

**D3. `.orgdef` is a pseudo-TLD, deliberately not a domain** — no DNS, no registry, no network
resolution. Its job is to announce that the address is **not an SMTP mailbox**, fixing a live
ambiguity: the org's existing identifiers (`og-strategist@ogframework.com`) are real-domain-shaped
and invite someone to email a seat.

**D4. Conferred by ceremony, never self-assigned.** `/og-claim-seat` confers the address on Director
authorization. A session asserting an address it was not granted is making a claim, not holding an
identity — which is the structural answer to "any session may call itself the strategist."

**D5. One active binding per address.** Two sessions claiming one seat is a conflict the Director
arbitrates, as claim-seat already handles.

**D6. Git authorship unifies on the same identity** (Director-settled 2026-08-24). Seat commits use
`<seat>@<charter-id>.orgdef`, replacing `@ogframework.com` in the charter's Reserved Conventions.
One identity per seat for authorship and addressing alike. Git accepts any string in the author
field. **Historical commits keep their as-authored identities** — no retro-rebrand.

**D7. Collision scope.** Unique per charter id, so one owner cannot run two orgs with the same id —
an acceptable limitation. Global uniqueness matters only under federation, which OG does not have;
recorded as forward work.

### E. Consequences for the canonical skill suite

**E1. `og-create-org` MUST elicit the communication substrate** (default offered: `memos/`), record
it in the charter, and write it into the generated `CLAUDE.md` **inline** — so a fresh session finds
its inbox with no skill installed.

**E2. `og-orient` and `og-describe-org` read "the org's ratified communication substrate,"** not
`memos/`.

**E3. `og-claim-seat` records the seat's `.orgdef` address and current session binding** (§C3), and
reports whether the seat is reachable (§C2).

**E4. A new canonical operation: `og-change-comms-substrate`.** Requiring a declared substrate (A1)
creates the governance operation of changing it. Propose-then-ratify, with four steps a plain-language
description reliably misses:

1. Check the candidate against A2 — ratification does not confer conformance (A3).
2. Ratify — it is a charter change.
3. **Existing records stay where they are.** Substrates change; records do not move. An org ends up
   with history in one substrate and current traffic in another, and that is correct.
4. **Announce the change in the outgoing substrate** — the seats are still listening there. The
   announcement of a substrate change cannot be made in the substrate nobody is watching yet.

The name is deliberately long: the charter already uses "substrate" for the data-format layer, and
this is a rare, charter-altering operation where unmissable beats elegant (see
[og-skill-suite-v2](og-skill-suite-v2.md) §A, frequency corollary).

**Honest accounting:** [og-skill-suite-v2](og-skill-suite-v2.md) takes the suite 7→6; E4 takes it
back to 7. It also declined `og-describe-seat` on one derivation, and E4 is one derivation. The
distinction claimed is class, not count: a **governance operation with a silent failure mode** versus
a **convenience view obtainable other ways**. If the Director does not find that load-bearing, the
consistent action is to park E4 and document the procedure in `CLAUDE.md`.

### F. What is retired

**F1.** The bespoke notification implementation — the `channels/` watcher, its Claude Code channel
adapter, the poll transport, and the attestation mechanism — is **retired from the framework's
forward surface**. It is removed from README, docs, and canonical guidance. OG ships no notification
component.

**F2.** The superseding is recorded, not erased. The prior decision, its proposals, its memo trail,
and the commits stand as dated records. Retro-editing records when they become inconvenient is how
an audit trail stops being one — and this framework sells audit trails.

**F3. What that work bought, and why it was not wasted.** The bespoke transport is the experiment
that **proved the convention is not vendor-shaped**: it implemented the full semantic with zero
vendor dependency and rang correctly on a real artifact (2026-08-24, 17/17 tests). That evidence is
what makes §C safe to write. It served as proof, not product.

**F4.** Three conventions from that work survive as requirements, now in §B and §C: pointer-not-payload
(B1–B3), fail-loud unreachability (B4, C2), and seat addressing (D).

## Backward Compatibility

- **Existing orgs need no change.** `memos/` is the default. What is new is the requirement to
  *declare* the substrate.
- **No records are edited.** Historical artifacts, filenames, commits and identities stand.
- **F1 breaks nothing in service** — the retired components were installed in this repo only.

## Conformance Tests

1. An org charter names its communication substrate.
2. A seat enumerates its open items from that substrate **with no notification mechanism available**.
3. No notification carries artifact content — addressing plus a durable reference only.
4. A seat that cannot confirm it is reachable reports that, and does not read silence as an empty
   inbox.
5. Seat addresses resolve to a current binding; a stale binding fails visibly rather than being
   retried against a guess.
6. A seat is notified, reads the artifact from the substrate, and acts on the artifact. *(Met
   2026-08-24: og-implementer, via Claude Code cross-session messaging, on a real directive.)*

## Promotion of `seat-inbox-notification` to `recommended_patterns.general`

**Recommended: promote.** The superseded decision held promotion until the convention was validated
across a vendor transport *and* a vendor-neutral one, to prove it was not vendor-shaped. The evidence
now stands:

- **Vendor-neutral implementation, zero vendor dependency** — built and verified 2026-08-24, ringing
  correctly on a real artifact. Proves the convention is implementable without any vendor.
- **Arousal proven** — a live seat notified, resolving the pointer from the substrate and acting on
  the artifact, on a real directive rather than a probe (2026-08-24).
- **Three independent mechanisms** carried the same semantic without changing it.

**The strategist's own caution, recorded so the Director can check it.** This seat held this gate
repeatedly on 2026-08-24, including on the day's most encouraging result, and named promotion
pressure as its standing failure mode when it took the chair. It is now recommending promotion in
the same session — so the reasoning is stated plainly rather than assumed: the gate's *purpose* was
to prove the convention is not vendor-shaped, and the retired implementation proved exactly that
before being retired. The two legs were demonstrated on different mechanisms rather than one.

**The conservative alternative remains available and is cheap:** operate the retired vendor-neutral
implementation once with a live seat, then promote. If the Director wants both legs on one
mechanism, that run is the way to get it.

## Alternatives Considered

- **Keep `memos/` mandatory** — rejected: contradicts charter value #3 and has failed a real adopter.
- **Keep shipping a bespoke notification mechanism** — rejected: cost without adopters, and the wrong
  kind of neutrality. Neutrality is preserved by the convention being implementable anywhere and by
  the enumerable fallback, not by OG maintaining a pipe.
- **Erase the prior work from the record** — rejected: F2.
- **Make Claude Code cross-session messaging canonical** — rejected: red-line violation. §C is
  implementation guidance for one runtime; conformance never requires it.
- **Session rename as the addressing mechanism** — rejected: conflates a stable address with a
  disposable binding, and is unreliable in practice.

## Open Questions

1. **Multiple substrates.** May an org ratify a primary plus a secondary (Jira for work, `memos/` for
   governance)? Live case now. Leaning yes with one designated primary.
2. **Jira seat-addressing mechanics** — assignee, label, or component. Assignee is semantically right
   but couples seats to Jira accounts, which is a real modelling decision about whether a seat is a
   user.
3. **Runtime survey.** §C asserts Claude Code is the only runtime known to provide seat notification,
   as of 2026-08. That claim should be checked before publication rather than asserted from one
   seat's knowledge.

## Cross-spec coordination

- **memodef-strategist** — A4 draws a line this proposal should not draw alone: the *required
  semantics* of a communication artifact versus their *encoding*. Memo owed on ratification.
- **orgdef-strategist** — filed 2026-08-24 (memos/2026-08-24-1858) on the `.orgdef` borrowing;
  reply outstanding, non-blocking.

## References

- Supersedes: [decisions/proposal-seat-inbox-notification-doorbell.md](../decisions/proposal-seat-inbox-notification-doorbell.md)
- Companion: [proposals/og-skill-suite-v2.md](og-skill-suite-v2.md)
- Runtime documentation: https://code.claude.com/docs/en/cross-session-messaging
- Charter: value #3 `substrate-agnosticism`; `recommended_patterns.general` #2, #7, #8; red line
  no-vendor-capture; Reserved Conventions (bot identity, amended by D6)
