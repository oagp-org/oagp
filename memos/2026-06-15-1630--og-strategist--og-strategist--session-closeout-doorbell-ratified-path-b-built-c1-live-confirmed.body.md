# Session closeout 2026-06-15 — doorbell chartered end-to-end, C1 live-confirmed

**From:** og-strategist (s:/projects/oagp-org; remote github.com/ogframework/og)
**To:** og-strategist (institutional capture)
**Date:** 2026-06-15
**Action required:** No

Session entered via `/og-claim-seat` → redirected to orient+operate on the already-staffed strategist seat (seat-vs-incumbent: the seat is staffed; this session occupied it). One Director-raised friction carried from question to a working, ratified, live-demonstrated capability in a single session.

---

## The arc

> Director: "the handoff between seats needs a 'Please check for memos' human command."

That friction is the missing **doorbell** in seat-vs-incumbent: seats coordinate asynchronously through `memos/`, but nothing rings when a memo lands, so a human was the trigger. This session closed that gap.

## Landed (on main — ratified-by-merge; commits 59c387c, 644b6ef; author og-strategist, committer Scott)

1. **Doorbell convention** — [proposals/seat-inbox-notification-doorbell.md](2026-06-15-1145--og-strategist--og-strategist--channels-path-a-validated-doorbell-transport-findings.body.md) ratified via [decisions/proposal-seat-inbox-notification-doorbell.md](../decisions/proposal-seat-inbox-notification-doorbell.md). Transport-neutral semantic: a memo to a *warm* seat SHOULD notify/trigger it. Claude Code channels recorded as **one reference transport**, bounded by four gates (vendor / research-preview / terminal-CLI-only / org-policy). Promotion **held** under #8. No charter bump.
2. **Path A findings** — [memos/2026-06-15-1145](2026-06-15-1145--og-strategist--og-strategist--channels-path-a-validated-doorbell-transport-findings.body.md): channels enabled + working in the VS Code integrated terminal under a personal Max account; full recipe + every gotcha (org-policy gate, Bun-on-PATH, terminal-not-panel).
3. **Path B PoC** — `channels/` package: transport-neutral `doorbell-core.js` (watch `memos/`, read-state, **pointer-not-payload — body never read**) + thin Claude Code channel adapter + `.mcp.json`. Built by og-implementer ([memos/2026-06-15-1530](2026-06-15-1530--og-implementer--og-strategist--path-b-doorbell-poc-built-and-verified.body.md)); strategist **independently re-verified** (5/5 tests + core read); three returned questions resolved ([memos/2026-06-15-1600](2026-06-15-1600--og-strategist--og-implementer--path-b-verified-three-pattern-questions-resolved.body.md)).

## C1 — live-confirmed this session

A throwaway memo filed from this (strategist) session rang a *separate* memo-watch session with **zero shared memory**: `← memo-watch: New memo filed to og-strategist (from og-strategist): memos…`, which read and acted on it — **no human "check for memos."** Three things proven live:
- **Doorbell works end-to-end** (file lands → fs.watch → pointer → channel event → session reacts).
- **Pointer-not-payload held in the wild** — addressing + path delivered, body never forwarded.
- **Layered defense** — when the rung session proposed deleting the throwaway, the destructive `rm` still hit the **permission gate**. Content-is-data at the transport + bounded authority + permission gate at the action. The pointer doesn't make a seat act; the seat's discipline + the gate govern the action.

Throwaway probe deleted; tree clean.

## Open / next

- **(a) Vendor-neutral transport** — AUTHORIZED, queued for a staffed og-implementer session: a poll/file-watch transport reusing `doorbell-core.js` unchanged, runtime-agnostic sink, no Anthropic dependency. Landing it satisfies conformance #3 and **earns** the `recommended_patterns.general` promotion under #8. Until then the doorbell is a decided convention on the watch-list, not a canonical pattern.
- **(b) "Use it in other orgs" roadmap** (each step gated):
  - the core is already org-agnostic (`OG_MEMOS_DIR`; every OG org has a `memos/`);
  - fold `channels/` into the OG distribution kit;
  - compose with `run_seat()`/launcher so a bound seat auto-gets its doorbell;
  - publish at ogframework.com via the adoption-cycle skills;
  - keep the canonical path vendor-neutral (channels = one transport). Director-ratified + implementer-executed when reached.
- **(c) Not swept by this session** (left untracked, other seats'/sessions' artifacts): implementer 1530 handback + seat-application [2026-06-14-1500](2026-06-14-1500--og-implementer--director--claim-seat-application.body.md) + prior closeouts (2026-05-29-2000, 2026-06-04-1400); `.wrangler/` + two modified transcripts untouched. A future pass (or the Director) can decide whether to commit these.
- **(d) Not pushed** — commits are local on `main`; push to `ogframework/og` is the Director's publish step.

## Note for the next incumbent

The doorbell's hardest piece (live cross-session injection) is proven. The single thing between "decided convention" and "canonical OG pattern" is the vendor-neutral transport — small (adapter swap; core untouched), already authorized. Pick it up, and `seat-inbox-notification` promotes.

— og-strategist
