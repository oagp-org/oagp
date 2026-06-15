# OG channels — memo-watch doorbell (Path B PoC)

The **seat doorbell**: rings a *running* OG seat session when a new memo lands in `memos/`,
ending the human "please check for memos" handoff. Implements the warm half of the
[seat-inbox-notification proposal](../proposals/seat-inbox-notification-doorbell.md) via the
Claude Code **channels** transport. Scoped by og-strategist in
[memos/2026-06-15-1150](../memos/2026-06-15-1150--og-strategist--og-implementer--path-b-memo-watcher-doorbell-poc-build-scope.body.md).

> Status: implementer PoC, **propose-only** (no merge; Director ratifies). Core logic + the
> channel emit are verified locally (`node --test`, plus a live initialize+emit probe). The
> final leg — events injected into a live `claude` session — is an operational run the Director
> performs (below), the same shape as the agent-sdk v0.2 §8 launcher run.

## Architecture — the doorbell semantic is separable from the Claude Code transport

This is invariant #6 (the no-vendor-capture red line) made structural, and it is what lets the
proposal's conformance #3 (≥2 transports) be met later without a rewrite:

```
src/doorbell-core.js      ← transport-NEUTRAL. Watches a memos/ dir, de-dups, parses the
                            .openthing envelope into a pointer {seat, from, path, subject}.
                            Knows nothing about Claude Code / MCP / channels.
src/memo-watch-channel.js ← thin Claude Code CHANNEL adapter. The ONLY file with MCP/CC
                            specifics. Forwards each pointer as notifications/claude/channel.
```

A future vendor-neutral transport (a poll loop, an `fs.watch`→queue, an MCP-inbox push such as
openbraid) reuses `doorbell-core.js` unchanged and replaces only the adapter.

## Governance invariants honored

- **Pointer, not payload** — the event carries addressing + subject only; the `.body.md` is
  never read. The seat reads the memo from the substrate under normal discipline. (proposal OQ4)
- **Read-state** — files present at startup are seeded as seen; only post-start arrivals ring,
  and each memo rings at most once. (proposal OQ2)
- **No autonomy creep** — the doorbell delivers an inert pointer; it takes no action, and an
  instruction-shaped subject confers no authority (content-is-data). (proposal C5)
- **Identifier-safe meta keys** — `seat`, `from`, `path`, `file`, `action_required` (channels
  silently drops hyphenated keys).

## Run (the Director's operational step)

Channels are a launch flag; the VS Code extension **panel cannot** pass it. Use a VS Code
**integrated terminal** (`` Ctrl+` ``), from the **repo root**, under a Claude account where
channels are permitted (the corporate `edsby` org blocks them via `channelsEnabled` managed
policy — use a **personal Claude Max** account, which skips the gate, or enable the org policy):

```bash
npm --prefix channels install          # one-time: installs @modelcontextprotocol/sdk
claude --dangerously-load-development-channels server:memo-watch
```

`server:memo-watch` resolves the `memo-watch` entry in the repo-root [`.mcp.json`](../.mcp.json)
(`node ./channels/src/memo-watch-channel.js`). Custom channels aren't on the research-preview
allowlist, so the `--dangerously-load-development-channels` dev flag is required. Node 24 is
sufficient — **no Bun** (Bun was only the Path A fakechat plugin's runtime).

The watcher targets `<repo>/memos` by default; override with `OG_MEMOS_DIR`.

Then, in another terminal, file any memo to a seat. The running session receives:

```xml
<channel source="memo-watch" seat="og-implementer" from="og-strategist"
         path="memos/…​.openthing" action_required="true">
New memo filed to og-implementer (from og-strategist) [action_required]: memos/…​.openthing — subject: …
</channel>
```

## Test

```bash
npm --prefix channels test     # node --test: arrival, read-state, de-dup, pointer-not-payload, C5
```

## Conformance (maps to the proposal's tests)

| Test | What | Status |
|---|---|---|
| **C1** | memo → running session gets a `<channel … >` event, no human prompt | mechanism verified (emit probe); **live session injection = Director's run** |
| **C2** | on the event, the seat reads + triages the pointed-at memo | demonstrated this session (the seat read & triaged 2026-06-15-1150 on arrival) |
| **C3** | arrival-detection core is transport-agnostic (≥2 transports possible) | **designed-for** — `doorbell-core.js` has zero CC deps |
| **C4** | a seat launched **without** the watcher still operates | inherent — the watcher is an optional launch flag; absence = today's behavior |
| **C5** | instruction-shaped content does not cause out-of-scope action | enforced (pointer-only) + covered by test |

## Files

- [`src/doorbell-core.js`](src/doorbell-core.js) — transport-neutral arrival detection + pointer.
- [`src/memo-watch-channel.js`](src/memo-watch-channel.js) — Claude Code channel adapter.
- [`test/doorbell-core.test.js`](test/doorbell-core.test.js) — core smoke tests.
- [`../.mcp.json`](../.mcp.json) — repo-root `memo-watch` server registration.
