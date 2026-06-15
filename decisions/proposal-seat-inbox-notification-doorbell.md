# Decision: Seat-inbox-notification (the "doorbell")

**Disposition:** Accept the pattern-shape convention (transport-neutral seat doorbell); record Claude Code channels as one bounded reference transport; hold promotion (ratified by Director merge 2026-06-15)
**Origin:** [proposals/seat-inbox-notification-doorbell.md](../proposals/seat-inbox-notification-doorbell.md)
**Decided:** Drafted 2026-06-15 by og-strategist; Director ratified on merge.
**Authorization:** Director direction 2026-06-15 ("the handoff between seats needs a 'Please check for memos' human command"; then "Yes, ratify"). Adoption-cycle architecture + cross-runtime delivery prioritization are delegated strategist authority; Director ratifies-by-merge.

## Rationale

Real friction, correctly surfaced. Seat-vs-incumbent persistence (#2) makes OG coordination asynchronous via `memos/` addressed to seats — a strength — but the substrate is a mailbox with no doorbell, so today the human Director is the trigger for every inter-seat handoff. The fix is to name a **transport-neutral seat-inbox-notification semantic**: a memo filed to a running seat SHOULD be able to notify/trigger it, with no human "check for memos" step. OG owns the semantic; runtimes provide transports (org-governance-layer-above-runtime, #7).

A live experiment this session ([findings: memos/2026-06-15-1145](../memos/2026-06-15-1145--og-strategist--og-strategist--channels-path-a-validated-doorbell-transport-findings.body.md)) validated Claude Code **channels** as a *working* transport in this VS Code environment — and in doing so confirmed four independent reasons it can only ever be **one reference transport**, never the canonical mechanism: vendor (Anthropic-only), maturity (research preview), surface (terminal-CLI only, not the panel), and adoption friction (org-admin `channelsEnabled` gate). The vendor-neutral transports (filesystem watch, poll, MCP inbox) carry none of these.

Split by layer: the **convention** (seats SHOULD have a transport-neutral doorbell) is pattern-shape and decided here; any **memo-envelope self-declaration of notification intent** is substrate format-shape and routed to memodef-strategist (and is explicitly *not required* — the directory-watch/poll transports need no envelope change).

## Resolutions to Open Questions

- **OQ1 (granularity) / OQ2 (read-state)** — operational/transport-specific; strategist lean: per-memo, in-order, with a `mark_read`-style read-state (openbraid already models `mark_read`). Settled in the PoC, not mandated here.
- **OQ3 (cold-start boundary)** — RESOLVED: the doorbell is scoped to **warm** seats; cold-start (waking a non-existent session) stays with the launcher/scheduler track (agent-sdk v0.2 `run_seat()` + launcher). No overlap, no double-ownership.
- **OQ4 (injection surface)** — RESOLVED (lean): the doorbell delivers a **pointer** ("new memo at <path> for <seat>"), not forwarded memo content; content-is-data downstream. Encoded as a governance invariant in the Path B build scope.

## Build directive

On Director ratification (merge):

1. **Decision recorded** (this artifact) — the transport-neutral seat-doorbell convention is the OG pattern-shape position; channels is one reference transport.
2. **Path B PoC scoped** to og-implementer ([memos/2026-06-15-1150](../memos/2026-06-15-1150--og-strategist--og-implementer--path-b-memo-watcher-doorbell-poc-build-scope.openthing)): a Node `memos/`-watcher custom channel. Implementer-execution; awaits a staffed implementer session + Director trigger.
3. **Watch-item** added to CLAUDE.md known-work-items (active strategist): seat-inbox-notification doorbell — convention decided; channels-transport validated (Path A); Path B PoC scoped; promotion held pending validation.
4. **Forward (not now):** promotion to `recommended_patterns.general` is earned once the semantic is validated by **both** the Path B PoC (channels transport) **and** at least one vendor-neutral transport (filesystem watch or poll) — proving transport-independence (conformance test #3).

## Cross-spec coordination

- **memodef-strategist** — only if/when the memo-envelope self-declaration option (OQ) is pursued; the base convention requires no memodef change. No memo filed yet (nothing to coordinate until that option is taken up).
- No charter edit now (convention decided; promotion held under #8).

## Notable design choices

1. **Decide the semantic, list the transports, hold the promotion** — three-way split respecting org-governance-layer-above-runtime (#7), no-vendor-capture (red line), and promotion-follows-adoption (#8).
2. **Channels recorded as a transport, not the mechanism** — success at enabling it did not elevate it; the four gates fix it as one optional Claude-Code path.
3. **Pointer-not-payload** — the doorbell carries a pointer, not memo content, minimizing the prompt-injection surface and preserving content-is-data.
4. **Scoped to the warm half** — the doorbell deliberately does not claim cold-start, which belongs to the launcher/scheduler track.

## Items not incorporated

- Promotion to `recommended_patterns.general` now — held per #8 (one transport validated; a vendor-neutral one still owed).
- A memodef envelope field for notification — routed/optional; not taken, to keep the convention shippable transport-first.
- Channels as canonical doorbell — rejected (four gates).

## Workflow validation

No charter edit (no version bump): this decides a convention and scopes a PoC; the charter changes only when the pattern earns promotion. Consistent with the seat-capability-manifest precedent (convention decided, dependency routed, promotion held).

## Forward-reference resolution

- Path B PoC (og-implementer) → validates the channels transport against conformance tests C1–C2/C5.
- A vendor-neutral transport (filesystem watch / poll) → the second validation, satisfying conformance #3 (≥2 transports).
- Both landed → promotion to canonical recommended-pattern is earned under #8.

## References

- Proposal: [proposals/seat-inbox-notification-doorbell.md](../proposals/seat-inbox-notification-doorbell.md)
- Findings: [memos/2026-06-15-1145](../memos/2026-06-15-1145--og-strategist--og-strategist--channels-path-a-validated-doorbell-transport-findings.body.md)
- Path B scope: [memos/2026-06-15-1150](../memos/2026-06-15-1150--og-strategist--og-implementer--path-b-memo-watcher-doorbell-poc-build-scope.openthing)
- Composes with: recommended_patterns.general #2 (seat-vs-incumbent), #7 (org-governance-layer-above-runtime), #8 (promotion-follows-adoption); red_lines (no-vendor-capture); agent-sdk v0.2 run_seat()/launcher
- Feature verified: https://code.claude.com/docs/en/channels + /channels-reference
