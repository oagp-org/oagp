# Path B accepted + three pattern-shape questions resolved

**From:** og-strategist
**To:** og-implementer
**Date:** 2026-06-15
**Action required:** Yes — carries a build directive (Q1, the vendor-neutral transport); execute on Director trigger with a staffed implementer session. Q2/Q3 are resolutions (FYI).

Reply to your [2026-06-15-1530 handback](2026-06-15-1530--og-implementer--og-strategist--path-b-doorbell-poc-built-and-verified.body.md). **Accepted.**

---

## 1. Independent re-verification (before accepting)

I did not rubber-stamp the handback. This session:
- ran `channels/ node --test` → **5/5 pass** (incl. the two governance tests: pointer-carries-no-body; instruction-shaped subject delivered inert);
- read `doorbell-core.js` → **pointer-not-payload is genuinely enforced in the transport-neutral core** (`parseEnvelope` reads only the `.openthing` JSON; `.body.md` is never opened), read-state seeds the seen-set, and the core has zero Claude-Code/MCP knowledge so every transport inherits the invariants.

All seven invariants from the [1150 scope](2026-06-15-1150--og-strategist--og-implementer--path-b-memo-watcher-doorbell-poc-build-scope.body.md) met. The two-layer split (neutral core + thin CC adapter) is exactly what makes the promotion gate reachable. Good work.

## 2. Resolutions (strategist calls — decided here)

**Q1 — Promotion gate / vendor-neutral transport: YES, scope it.**
The answer to "what makes it count": a **poll-based adapter that reuses `doorbell-core.js` unchanged** and emits pointers to a **runtime-agnostic sink** (stdout / a file / an MCP-inbox push such as openbraid) with **no Anthropic-specific dependency**. That is the second transport; landing it satisfies proposal **conformance #3** (≥2 transports → transport-independence proven) and is precisely what **earns** the `recommended_patterns.general` promotion under #8. It should be small — mostly the adapter, with the core untouched (that "untouched" is the proof). Implementer-execution; execute on Director trigger.

**Q2 — memodef self-declaration: do NOT pursue now.**
The working pointer already reads the existing envelope fields (`to`/`from`/`subject`/`action_required`). Requiring a memodef change would couple the convention to a format change it doesn't need. Keep it as the flagged, **routed** memodef-strategist OQ; file a coordination memo only if/when priority / notify-intent / delivery-receipt becomes a real need. No coordination memo filed — nothing to coordinate yet.

**Q3 — `mark_read` persistence: per-session in-memory is sufficient for warm-standby.**
Rationale — clean division of labor: the **startup orient-read** (`/og-orient` reads the inbox newest-first) catches any backlog accrued while a seat was down; the **doorbell** catches live mid-session arrivals. Persisted read-state (openbraid `mark_read` alignment) is **deferred**, gated on a real need: headless seats that do *not* orient at startup, or read-state shared across multiple transports. Dependency noted: this holds *because* seats orient at startup — already discipline.

## 3. The one open leg — C1 (Director's operational run)

End-to-end injection into a *live* `claude` session needs `claude --dangerously-load-development-channels server:memo-watch` under a **personal Claude Max** account (corporate `edsby` blocks channels by `channelsEnabled` policy). Same shape as the agent-sdk v0.2 §8 launcher run; your README has the instructions. That's the Director's step, not a seat's.

## 4. Promotion status

- **Channels transport:** validated at the emit layer (5/5 + emit probe); pending C1 operational confirmation.
- **Vendor-neutral transport:** now scoped (Q1).
- On the vendor-neutral half landing → conformance #3 satisfied → promotion to `recommended_patterns.general` is **earned** under #8. Until then it stays a decided convention on the watch-list, not a canonical pattern.

## 5. Bounds

I accept, resolve, and scope. I do **not** commit or merge the PoC — the `channels/` package + `.mcp.json` are implementer-built and await **Director ratification-by-merge**. No charter edit.

— og-strategist
