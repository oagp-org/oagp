# Path B build scope — memo-watcher doorbell PoC (implementer-execution)

**From:** og-strategist
**To:** og-implementer
**Date:** 2026-06-15
**Action required:** Yes — execute when the implementer seat is staffed in-session and the Director triggers.

Strategist scopes **what must hold**; you make the build calls and **own + record** the artifact. Bounded authority unchanged: propose-only, no merge, Director ratifies.

---

## 1. Goal (the one sentence)

Prove that a memo filed to a **running** OG seat **rings** that seat — it reads and triages the new memo **with no human "please check for memos" step.** This is the warm/doorbell half (cold-start is the launcher/scheduler track, out of scope here).

## 2. Why this is worth your cycles

This validates the [seat-inbox-notification proposal](../proposals/seat-inbox-notification-doorbell.md) via the Claude Code **channels** transport. [Path A (findings: 2026-06-15-1145)](2026-06-15-1145--og-strategist--og-strategist--channels-path-a-validated-doorbell-transport-findings.body.md) already proved the channels pipe works in this VS Code environment with the official fakechat plugin. Path B is the *real* use case: not a chat bridge, but a substrate-arrival doorbell.

## 3. What must hold (invariants — these are the strategist calls)

1. **Transport mechanism:** a **custom Claude Code channel** = an MCP server declaring the `claude/channel` capability, connected over **stdio**, emitting `notifications/claude/channel` events (per channels-reference). Run via `claude --dangerously-load-development-channels server:memo-watch` from a **VS Code integrated terminal** (custom channels aren't on the research-preview allowlist → dev flag required; the **panel cannot** run channels).
2. **Trigger:** the server **watches the `memos/` directory** and emits an event when a **new memo** appears (new `.openthing` is the natural trigger; your call whether to also debounce the paired `.body.md`).
3. **Runtime:** **Node** (Node 24 is present). **No Bun** — Bun was only the official fakechat plugin's runtime. Keep deps minimal (the MCP SDK; a watch is `fs.watch`-able without heavy libraries).
4. **Pointer, not payload (load-bearing governance call):** the event content should be a **pointer** — e.g. `new memo filed to <seat>: <path> — subject: <subject>` — **not** the forwarded memo body. Rationale: content-is-data + minimize the prompt-injection surface (proposal OQ4). The seat then *reads* the memo from the substrate under normal discipline. Use `meta` keys for routing (`seat`, `path`); remember meta keys must be identifiers (letters/digits/underscore) — hyphens are silently dropped.
5. **Read-state:** avoid re-ringing for an already-seen memo (proposal OQ2). Minimum: only fire for files appearing after the watcher starts. Better: a lightweight seen-set / `mark_read` analog (openbraid already models `mark_read` if you want to align).
6. **Vendor-neutrality structuring (red line):** structure the watcher so the **doorbell semantic** (memo-arrival → seat-notification) is separable from the **Claude-Code channel transport**. A future filesystem-watch-into-a-poll or MCP-inbox transport should be able to reuse the same core. Don't bake Claude-Code specifics into the arrival-detection logic. This is what lets the proposal's conformance test #3 (≥2 transports) be met later without a rewrite.
7. **No autonomy creep:** the doorbell delivers a notification to a seat operating under its normal bounded authority. It must **not** auto-act, auto-merge, or escalate. A notification is a pointer; the human/seat discipline downstream is unchanged.

## 4. Conformance (maps to the proposal's tests)

- **C1:** file a memo to a running `memo-watch` seat session → a `<channel source="memo-watch" seat="…" path="…">` event lands in that session with no human prompt. (proposal #1)
- **C2:** on the event, the seat reads + triages the pointed-at memo from `memos/`. (proposal #2)
- **C3 (design-for, not required this PoC):** the arrival-detection core is transport-agnostic enough that a vendor-neutral transport could reuse it. (proposal #3)
- **C4:** a seat launched **without** the watcher still operates normally. (proposal #4)
- **C5:** a memo whose subject/content is instruction-shaped does **not** cause out-of-scope action (pointer-only + content-is-data). (proposal #5)

## 5. Explicitly NOT in scope for this memo

- I am **not** choosing your watch library, debounce strategy, `.mcp.json` layout, file/module structure, or package home (`agent-sdk/` vs a new `channels/` dir — your call; note it).
- I am **not** writing the channel. Execution needs a **staffed implementer session**; the Director triggers (as on 2026-05-24). This seat stands by for pattern-shape clarifications the build surfaces.

## 6. Environment notes (carried from Path A so you don't re-hit them)

- Run under a **personal Claude Max account** (the corporate `edsby` org blocks channels via `channelsEnabled` managed-settings policy) — or the Director enables the org policy. Personal accounts skip the gate.
- Integrated-terminal CLI only; the extension panel can't pass channel flags.
- `claude` 2.1.177 on PATH ✓; Node 24 ✓.

— og-strategist
