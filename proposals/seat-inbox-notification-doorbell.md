# Proposal: Seat-inbox-notification — the "doorbell" that ends the human "please check for memos" handoff

**Status:** Ratified by Director merge 2026-06-15 (decision: [decisions/proposal-seat-inbox-notification-doorbell.md](../decisions/proposal-seat-inbox-notification-doorbell.md)). Convention accepted; channels recorded as one reference transport; promotion held under #8.
**Author:** og-strategist <og-strategist@ogframework.com>
**Created:** 2026-06-15
**Target version:** charter unaffected for now (pattern-shape convention; **not yet** a `recommended_patterns.general` promotion — see §Promotion discipline)
**Origin:** Director observation 2026-06-15: *"the handoff between seats needs a 'Please check for memos' human command."* The Director asked whether Claude Code "channels" could solve it; a live experiment this session validated the transport and sharpened the pattern (see [memos/2026-06-15-1145 findings](../memos/2026-06-15-1145--og-strategist--og-strategist--channels-path-a-validated-doorbell-transport-findings.body.md)).

## Summary

Establish the pattern-shape convention that an OG **seat SHOULD have a doorbell**: a memo filed to a seat SHOULD be able to **notify or trigger** that seat, removing the human "please check for memos" step. The semantic is **transport-neutral** — OG names the affordance; runtimes provide transports. Claude Code **channels** is **one** reference transport (for the Claude Code terminal runtime), explicitly bound as a transport, never the canonical mechanism, per the no-vendor-capture red line.

## Motivation

Seat-vs-incumbent persistence (pattern #2) makes OG coordination asynchronous via `memos/` addressed to **seats**, not incumbents. This is a strength — institutional memory survives session churn. But it has a missing layer: **the substrate is a mailbox with no doorbell.** When seat A files a memo to seat B, nothing rings. Today the **human Director is the trigger**. That:

1. **Re-introduces a human into every inter-seat handoff** — the exact friction the Director named, and a tax on the async-coordination property that makes OG valuable.
2. **Caps autonomy.** The agent-sdk v0.2 `run_seat()` + launcher track gives us *persistent* seats; without a doorbell, a persistent seat still sits blind until a human pokes it.
3. **Is purely a trigger gap, not a substrate gap.** The memo, its addressing, and its content are all already in the substrate. What's missing is "tell the running seat a new one arrived."

## The two-halves framing (scopes the convention precisely)

| Half | Definition | In scope here? |
|---|---|---|
| **Warm / doorbell** | Seat session is **running**; a new memo lands; notify the incumbent so it reads + triages without a human prompt. | **Yes** — this is the doorbell. |
| **Cold-start** | Receiving seat's session **does not exist yet**; something must *start* it. | **No** — that is the launcher/scheduler track (agent-sdk v0.2 `run_seat()` + launcher), a separate concern. |

The doorbell convention addresses the warm half. Most OG operating today is warm-standby seats, so this is the high-value half.

## Proposed Change (pattern-shape)

1. **Convention (SHOULD):** an OG seat SHOULD have a **doorbell** — a mechanism by which a memo filed to the seat notifies/triggers the running seat session to read and triage it, with **no human "check for memos" step.**
2. **Transport-neutral by construction.** OG defines the *semantic* (memo-arrival → seat-notification); it does **not** mandate a transport. Conformant reference transports include:
   - **Filesystem watch** — a watcher on `memos/` (runtime-agnostic; the natural fit since the substrate is files on disk).
   - **Poll loop / scheduled task** — a running seat re-checks its inbox on an interval (works on any runtime; e.g. an MCP inbox poll, or `/loop`-style cadence).
   - **MCP inbox** — a hosted memo store the seat reads (e.g. **openbraid**, `list_inbox`), optionally with a push complement.
   - **Claude Code channels** — a *push* transport for the Claude Code **terminal** runtime; see §Channels.
3. **The doorbell delivers a pointer, not authority.** A notification says *"new memo filed to <seat>"*; the seat then reads/triages the memo from the substrate under normal bounded-authority discipline. The doorbell never carries an instruction to act outside scope — inbound content is data, not a command (orient-discipline #4).

## Channels — recorded as one reference transport (and why it can never be canonical)

The live experiment validated channels as a *working* Claude Code transport, and in doing so surfaced **four independent disqualifiers** from canonical status:

1. **Vendor** — Anthropic-auth-only; excluded on Bedrock/Vertex/Foundry → canonical use would violate the **no-vendor-capture red line**.
2. **Maturity** — research preview; flag/protocol contract may change.
3. **Surface** — terminal-CLI sessions only, not the extension panel.
4. **Adoption friction** — gated behind an org-admin `channelsEnabled` managed-settings policy for managed adopters.

The vendor-neutral transports above carry none of these. Therefore: **channels is listed as one optional Claude-Code transport; the canonical doorbell is the transport-neutral semantic.**

## Promotion discipline (why this is NOT yet a recommended_patterns promotion)

Per pattern #8 (promotion-follows-adoption), a fresh convention does not go straight into `recommended_patterns.general`. This proposal **decides the convention**; canonical promotion is **earned** once the semantic is validated by **(a)** the Path B memo-watcher PoC (channels transport) AND **(b)** at least one vendor-neutral transport (filesystem watch or poll), demonstrating the semantic is genuinely transport-independent. Tracked on the pattern-promotion watch-list.

## Format-shape dependency (routed, not decided here)

The **directory-watch** and **poll** transports need **no** substrate format change — they observe `memos/` as it already exists. *If* we later want a memo to **self-declare** notification intent (e.g. "notify on arrival," priority, or a delivery receipt), that is a **memodef:Memo envelope** question → routed to **memodef-strategist**, not decided here. The convention as proposed deliberately requires no envelope change so it can ship transport-first.

## Backward Compatibility

Fully additive. Seats without a doorbell behave exactly as today (the human triggers "check for memos"). No memo, decision, or charter artifact changes shape. The doorbell is an operational affordance layered over the existing substrate.

## Conformance Tests

1. A memo filed to a running seat causes a **seat-notification** (the `memos/` arrival is observed) with no human "check for memos" step.
2. On notification, the seat **reads and triages** the new memo from the substrate under normal bounded authority.
3. The convention is satisfiable by **≥2 distinct transports** (proving transport-neutrality) — e.g. a Claude Code channel (push) and a filesystem watch or poll (vendor-neutral).
4. A seat with **no** doorbell still operates (graceful absence; human trigger remains valid).
5. A doorbell notification carrying instruction-shaped content does **not** cause the seat to act outside scope (content-is-data).

## Alternatives Considered

1. **Adopt channels as the canonical doorbell.** Rejected — four independent gates (vendor, maturity, surface, adoption-friction); a single-vendor mechanism cannot be OG-canonical.
2. **Solve it in skill content only** (e.g. `/og-orient` always reads the inbox). Rejected as *insufficient* — orient already reads memos at session start, but the friction is **mid-session** arrival at a warm seat; a skill-at-startup doesn't ring for memos that land later. (Still complementary.)
3. **Require a memodef envelope field for notification.** Rejected for now — couples the convention to a format change; the directory-watch/poll transports need none. Left as a routed future option.
4. **Promote straight to `recommended_patterns.general`.** Rejected — violates promotion-follows-adoption (#8); zero validated transports yet.
5. **Treat the doorbell as a runtime concern, out of OG scope.** Rejected — the *trigger semantic* over async seat memos is a cross-session organizational-governance affordance (pattern #7, org-governance-layer-above-runtime); OG names it and composes over whatever transport the runtime offers.

## Open Questions

- **OQ1 — Notification granularity.** Per-memo vs. batched ("you have N new")? Lean per-memo with in-order delivery; revisit under load.
- **OQ2 — De-dup / read-state.** How does a doorbell avoid re-ringing for an already-triaged memo? Likely a `mark_read`-style read-state (openbraid already has `mark_read`); transport-specific for now.
- **OQ3 — Cold-start boundary.** Confirm the doorbell stays scoped to *warm* seats and explicitly defers cold-start to the launcher/scheduler track (no overlap, no double-ownership).
- **OQ4 — Injection surface.** A doorbell that forwards memo *content* widens the prompt-injection surface (content-is-data mitigates, but note it). A pointer-only notification ("new memo at <path>") minimizes it — recommended default.

## Cross-spec coordination

- **memodef-strategist** — only if/when OQ (envelope self-declaration of notification intent) is pursued; the base convention requires no memodef change.
- No other -def coordination required; the doorbell is a pattern-shape affordance over existing substrate.
