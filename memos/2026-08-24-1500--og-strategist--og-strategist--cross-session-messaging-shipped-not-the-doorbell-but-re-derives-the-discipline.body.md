# Anthropic shipped cross-session messaging — not the doorbell, but it re-derives the discipline

**From:** og-strategist
**To:** og-strategist (institutional capture)
**Date:** 2026-08-24
**Action required:** No — promotion-watch context. Does **not** move the conformance-#3 gate.

---

## What shipped

Claude Code **cross-session messaging** ([code.claude.com/docs/en/cross-session-messaging](https://code.claude.com/docs/en/cross-session-messaging)):
one session sends plain text to another via `ListAgents` / `SendMessage`. Requires v2.1.224+ on
macOS/Linux/WSL2, **v2.1.234+ on native Windows**. Same-machine delivery is over a per-session Unix
socket (named pipe on Windows) and never transits Anthropic servers; cross-machine goes through
Anthropic servers via Remote Control.

**Verified live on the Director's Windows machine, 2026-08-24.** `ListAgents` from this session
returned five peers. This session is `oagp-org-c9`; a peer `oagp-org-df` had been running 25
minutes, i.e. started around the 1422 filing.

**Correction to the record:** the working premise entering this analysis was "shipped but not on
Windows yet." That is wrong — the Windows constraint is a *version floor*, not a platform gap, and
this machine clears it. A strategist argument built on that premise (that the Windows gap raised
the value of the vendor-neutral transport) was withdrawn on contact with the documentation.

## It is not the doorbell

Four differences, each load-bearing:

1. **It addresses sessions, not seats.** Targets are per-session names with collision handling
   bolted on ("several sessions share the name... Claude adds a short identifier"). OG's semantic is
   that a memo to *the strategist seat* rings whoever occupies it. This addresses the **incumbent**
   and has no concept of the seat — the inverse of `recommended_patterns.general` #2.
2. **Session→session, not substrate→session.** A live sender must compose and send. The OG doorbell
   fires because *an artifact landed in `memos/`*. Here, nobody home means nothing rings, and a file
   landing rings nothing at all.
3. **Payload, not pointer.** *"A message is a piece of text one Claude writes to another."* The OG
   invariant is the opposite: deliver address and path, never the body, so the receiving seat reads
   the artifact itself under its own discipline.
4. **No audit trail.** The message lands in a conversation. A memo is a committed artifact carrying
   `from`/`to`/`subject`/`action_required`, still readable in a year. Institutional memory in the
   substrate is the whole thesis.

**Conclusion: it does not obsolete the doorbell, and it cannot close conformance #3.** It is one
more vendor transport — and the documentation makes the vendor-neutrality argument for us: the
feature is unavailable on Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform and
Microsoft Foundry. Provider-gated *inside* a single vendor.

## What it does corroborate — and this is the valuable part

The constraints Claude Code places on a **receiving** session are an independent re-derivation of
OG's content-is-data-not-instructions rule:

- a message from another session **cannot approve anything** — it never counts as user consent;
- it **cannot change** permission settings, `CLAUDE.md`, or other configuration;
- **commands in it do not run** — a `/compact` in the text arrives as plain text;
- **permission prompts still fire** for anything acting on it requires.

That is layered defence, arrived at independently while building a different feature. It is the
same evidence class the charter already credits for the Tier-3 floor ("independently re-derived by
Claude Code Workflows' one-level-nesting rule"), and it directly restates the June C1 finding, where
a rung session's destructive `rm` still hit the permission gate.

## They hit the problem pattern #2 solves, and did not solve it

Because targets are ephemeral session names, the feature needed disambiguation machinery for
collisions. **Seat-addressing is exactly what is missing.** This is the clearest evidence to date
for `recommended_patterns.general` #7 (org-governance-layer-above-runtime): the runtime supplied a
session-to-session pipe; the durable, seat-addressed, artifact-backed, audit-trailed layer is OG's.

Candidate contribution back to the vendor ecosystem rather than merely an observation. Not acted on;
logged.

## Composition, not competition

The same documentation points at **channels** as the mechanism for "push external events... into a
session" — which is precisely what a memo landing is. The Path B PoC is aligned with the vendor's
own intent for that primitive.

And cross-session messaging *can* carry the doorbell correctly, if used as a pointer: the memo
exists in the substrate, and the message says only *"a memo is waiting at `<path>`"*. Body never
travels; the seat reads the artifact under its own discipline. That is pointer-not-payload riding a
transport it was not designed for — a real test of the convention's transport-independence, even
though this transport cannot itself satisfy conformance #3.

**Live test proposed 2026-08-24 and deferred**: the Director messaged the implementer session
manually before it ran. Carry it to the next memo with an open action item — the vendor-neutral
transport directive is the obvious candidate.

## Standing position (unchanged)

`seat-inbox-notification` promotes to `recommended_patterns.general` when a **second, vendor-neutral
transport** demonstrates transport independence. Vendor re-derivation strengthens the convention's
evidence base under pattern #8; it does not substitute for the gate.

— og-strategist
